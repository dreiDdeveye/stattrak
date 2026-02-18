# StatTrak - Production Data Pipeline Architecture

## Overview

This document describes how to build the real data ingestion pipeline
for pulling CS2 match stats from player accounts in production.

---

## Data Sources

### 1. Steam Web API
- **URL**: https://api.steampowered.com
- **Auth**: Free API key from https://steamcommunity.com/dev/apikey
- **What you get**: Player profile, SteamID, avatar, friends, owned games
- **What you DON'T get**: Detailed match stats, demo files directly

### 2. Steam OpenID (Authentication)
- Players log in via Steam OpenID 2.0
- You receive their SteamID64 after successful auth
- No password ever touches your server

### 3. CS2 Match Sharecodes + Demo Downloads
- This is the core of the pipeline
- After each match, CS2 generates a sharecode
- Sharecodes can be fetched via the Steam API's `GetNextMatchSharingCode`
- Each sharecode maps to a demo file hosted on Valve's CDN
- The demo file (.dem) contains ALL match data at tick level

### 4. Faceit API (Optional)
- **URL**: https://open.faceit.com/data/v4
- **Auth**: API key from Faceit developer portal
- **What you get**: Match history, ELO, K/D, maps, detailed stats
- Easier than demo parsing but less granular

---

## Architecture Diagram

```
[Player Browser]
      |
      | Steam OpenID Login
      v
[Next.js Frontend] <---> [REST API / NestJS Backend]
                                |
                    +-----------+-----------+
                    |           |           |
                    v           v           v
             [Steam API]  [Faceit API]  [PostgreSQL]
                    |                      ^
                    v                      |
           [Match Sharecode]               |
                    |                      |
                    v                      |
           [Valve CDN: .dem file]          |
                    |                      |
                    v                      |
           [Demo Parser (Python/Rust)]     |
                    |                      |
                    v                      |
           [Structured Events JSON] -------+
                    |
                    v
           [Stats Calculator Engine]
                    |
                    v
           [Redis Cache] ---> [Dashboard API]
```

---

## Step-by-Step Implementation

### Step 1: Steam OAuth Login

```javascript
// backend/src/auth/steam.strategy.ts (NestJS + Passport)
import { Strategy } from 'passport-steam';

export class SteamStrategy extends Strategy {
  constructor() {
    super({
      returnURL: process.env.STEAM_RETURN_URL,     // https://stattrak.com/auth/steam/callback
      realm: process.env.STEAM_REALM,               // https://stattrak.com/
      apiKey: process.env.STEAM_API_KEY,             // From steamcommunity.com/dev/apikey
    });
  }

  async validate(identifier, profile) {
    // profile.id = SteamID64 (e.g., "76561198012345678")
    // profile.displayName = Steam username
    // profile.photos[0].value = Avatar URL
    
    // Upsert user in database
    const user = await prisma.user.upsert({
      where: { steamId: profile.id },
      update: { 
        username: profile.displayName,
        avatar: profile.photos[0]?.value,
        lastLogin: new Date(),
      },
      create: {
        steamId: profile.id,
        username: profile.displayName,
        avatar: profile.photos[0]?.value,
      },
    });

    return user;
  }
}
```

### Step 2: Fetch Match Sharecodes

```javascript
// backend/src/matches/sharecode.service.ts
import SteamUser from 'steam-user';
import GlobalOffensive from 'globaloffensive';

export class SharecodeService {
  private steamClient: SteamUser;
  private csClient: GlobalOffensive;

  constructor() {
    this.steamClient = new SteamUser();
    this.csClient = new GlobalOffensive(this.steamClient);
  }

  // Login with a dedicated bot Steam account
  async initialize() {
    this.steamClient.logOn({
      accountName: process.env.STEAM_BOT_USERNAME,
      password: process.env.STEAM_BOT_PASSWORD,
    });

    this.steamClient.on('loggedOn', () => {
      this.steamClient.setPersona(SteamUser.EPersonaState.Online);
      this.steamClient.gamesPlayed([730]); // CS2 app ID
    });
  }

  // Get the player's match history authentication code
  // Players need to share their auth code from:
  // steam://rungame/730/76561202255233023/+csgo_econ_action_preview
  // OR use the Steam API endpoint
  async getNextSharecode(steamId, knownCode, authCode) {
    const url = `https://api.steampowered.com/ICSGOPlayers_730/GetNextMatchSharingCode/v1`
      + `?key=${process.env.STEAM_API_KEY}`
      + `&steamid=${steamId}`
      + `&steamidkey=${authCode}`
      + `&knowncode=${knownCode}`;

    const response = await fetch(url);
    const data = await response.json();
    
    // Returns next sharecode or null if no new matches
    return data.result?.nextcode || null;
  }

  // Decode sharecode to get match ID and demo URL
  decodeSharecode(sharecode) {
    // Sharecodes encode: matchId, outcomeId, tokenId
    // Use the 'csgo-sharecode' npm package
    const { decode } = require('csgo-sharecode');
    return decode(sharecode);
    // Returns: { matchId: bigint, outcomeId: bigint, tokenId: bigint }
  }

  // Request demo download URL from Game Coordinator
  async requestDemoUrl(matchId) {
    return new Promise((resolve) => {
      this.csClient.requestGame(matchId);
      this.csClient.on('matchList', (matches) => {
        const match = matches[0];
        if (match?.roundstatsall?.length > 0) {
          const lastRound = match.roundstatsall[match.roundstatsall.length - 1];
          resolve(lastRound.map); // This is the demo download URL
        }
      });
    });
  }
}
```

### Step 3: Download and Parse Demo Files

```python
# parser/demo_parser.py
# Uses the 'demoparser2' Python library (Rust-based, very fast)
# Install: pip install demoparser2

from demoparser2 import DemoParser
import json
import sys

def parse_demo(demo_path):
    parser = DemoParser(demo_path)
    
    # ---- KILL EVENTS ----
    kills = parser.parse_events("player_death", 
        other=[
            "attacker_name", "attacker_steamid",
            "user_name", "user_steamid",
            "assister_name", "assister_steamid",
            "headshot", "weapon", "penetrated",
            "assistedflash", "noscope", "thrusmoke",
            "attackerblind",
        ]
    )
    
    # ---- ROUND EVENTS ----
    round_starts = parser.parse_events("round_start")
    round_ends = parser.parse_events("round_end", 
        other=["winner", "reason"]
    )
    
    # ---- PLAYER DAMAGE ----
    damage = parser.parse_events("player_hurt",
        other=[
            "attacker_name", "attacker_steamid",
            "user_name", "user_steamid",
            "dmg_health", "dmg_armor", "weapon", "hitgroup",
        ]
    )
    
    # ---- UTILITY EVENTS ----
    grenades = parser.parse_events("grenade_thrown",
        other=["user_name", "user_steamid", "weapon"]
    )
    
    flashes = parser.parse_events("player_blind",
        other=[
            "attacker_steamid", "user_steamid",
            "blind_duration",
        ]
    )
    
    # ---- BOMB EVENTS ----
    bomb_plants = parser.parse_events("bomb_planted",
        other=["user_steamid"]
    )
    bomb_defuses = parser.parse_events("bomb_defused",
        other=["user_steamid"]
    )
    
    # ---- PLAYER POSITIONS (tick-level for aim analysis) ----
    # Get player X, Y, Z + view angles every tick
    ticks = parser.parse_ticks([
        "X", "Y", "Z",
        "pitch", "yaw",
        "health", "armor_value",
        "active_weapon_name",
        "team_num",
        "is_alive",
    ])
    
    # ---- ECONOMY DATA ----
    # Player money at round start for eco/force/full classification
    economy = parser.parse_ticks([
        "current_equip_value",
        "total_cash_spent",
        "cash_spent_this_round",
    ], ticks=[r["tick"] for r in round_starts])  # Only at round starts
    
    return {
        "kills": kills.to_dict(orient="records"),
        "damage": damage.to_dict(orient="records"),
        "rounds": {
            "starts": round_starts.to_dict(orient="records"),
            "ends": round_ends.to_dict(orient="records"),
        },
        "grenades": grenades.to_dict(orient="records"),
        "flashes": flashes.to_dict(orient="records"),
        "bombs": {
            "plants": bomb_plants.to_dict(orient="records"),
            "defuses": bomb_defuses.to_dict(orient="records"),
        },
        "positions": ticks.to_dict(orient="records"),
        "economy": economy.to_dict(orient="records"),
    }


if __name__ == "__main__":
    demo_path = sys.argv[1]
    output_path = sys.argv[2]
    
    result = parse_demo(demo_path)
    
    with open(output_path, "w") as f:
        json.dump(result, f)
    
    print(f"Parsed {len(result['kills'])} kills, {len(result['damage'])} damage events")
```

### Step 4: Calculate Advanced Statistics

```javascript
// backend/src/stats/calculator.service.ts

export class StatsCalculator {
  
  // ---- CONTEXTUAL STATS (by round economy) ----
  classifyRound(teamEquipValue) {
    // Pistol: round 1 or 16
    // Eco: < $5,000 team total
    // Force: $5,000 - $20,000
    // Full buy: > $20,000
    if (teamEquipValue < 5000) return 'eco';
    if (teamEquipValue < 20000) return 'force_buy';
    return 'full_buy';
  }

  calculateContextualStats(playerSteamId, matchData) {
    const rounds = matchData.rounds.ends;
    const kills = matchData.kills;
    const economy = matchData.economy;

    const statsByType = { pistol: [], eco: [], force_buy: [], full_buy: [] };
    
    rounds.forEach((round, i) => {
      const roundType = (i === 0 || i === 15) 
        ? 'pistol' 
        : this.classifyRound(economy[i]?.current_equip_value || 0);
      
      const roundKills = kills.filter(k => 
        k.round === i && k.attacker_steamid === playerSteamId
      );
      const roundDeaths = kills.filter(k => 
        k.round === i && k.user_steamid === playerSteamId
      );
      
      statsByType[roundType].push({
        kills: roundKills.length,
        deaths: roundDeaths.length,
        won: round.winner === playerTeam,
      });
    });

    return Object.fromEntries(
      Object.entries(statsByType).map(([type, rounds]) => [type, {
        kd: rounds.reduce((s, r) => s + r.kills, 0) / 
            Math.max(rounds.reduce((s, r) => s + r.deaths, 0), 1),
        winRate: rounds.filter(r => r.won).length / Math.max(rounds.length, 1) * 100,
        rounds: rounds.length,
      }])
    );
  }

  // ---- MICRO AIM ANALYTICS ----
  calculateAimStats(playerSteamId, matchData) {
    const kills = matchData.kills.filter(k => k.attacker_steamid === playerSteamId);
    const damage = matchData.damage.filter(d => d.attacker_steamid === playerSteamId);
    const positions = matchData.positions.filter(p => p.steamid === playerSteamId);

    // Time to Damage: ticks between first seeing enemy and first damage dealt
    // Requires calculating when enemy enters player's FOV from position data
    
    // First Bullet Accuracy: % of first shots that hit
    const firstShots = this.getFirstShotsPerEngagement(damage);
    const firstBulletAccuracy = firstShots.filter(s => s.hit).length / 
                                 Math.max(firstShots.length, 1) * 100;

    // Headshot %
    const headshotPct = kills.filter(k => k.headshot).length / 
                        Math.max(kills.length, 1) * 100;

    // Crosshair Placement: how close crosshair was to head level
    // Compare player's pitch angle to the angle needed for headshot
    // Lower correction = better crosshair placement
    const crosshairEfficiency = this.calculateCrosshairPlacement(
      positions, kills
    );

    return {
      firstBulletAccuracy,
      headshotPct,
      crosshairPlacement: crosshairEfficiency,
      // TTD calculated from tick-level data
    };
  }

  // ---- DECISION METRICS ----
  calculateDecisionStats(playerSteamId, matchData) {
    const kills = matchData.kills;
    
    // First deaths: how often this player dies first in a round
    const roundFirstDeaths = {};
    kills.forEach(k => {
      if (!roundFirstDeaths[k.round]) {
        roundFirstDeaths[k.round] = k.user_steamid;
      }
    });
    const firstDeathCount = Object.values(roundFirstDeaths)
      .filter(id => id === playerSteamId).length;
    const firstDeathPct = firstDeathCount / matchData.rounds.ends.length * 100;

    // Trade efficiency: when teammate dies, how often does player get trade kill
    // Trade = kill within 5 seconds of teammate death
    const TRADE_WINDOW_TICKS = 5 * 64; // 5 seconds * 64 tick
    let tradeOpportunities = 0;
    let tradesCompleted = 0;

    kills.forEach(death => {
      if (death.user_team === playerTeam && death.user_steamid !== playerSteamId) {
        tradeOpportunities++;
        const traded = kills.some(k =>
          k.attacker_steamid === playerSteamId &&
          k.user_steamid === death.attacker_steamid &&
          k.tick - death.tick > 0 &&
          k.tick - death.tick < TRADE_WINDOW_TICKS
        );
        if (traded) tradesCompleted++;
      }
    });

    // Overpeek detection: deaths where player was exposed for too long
    // Use position data to detect extended exposure without cover
    const overpeekDeaths = this.detectOverpeeks(playerSteamId, matchData);

    return {
      firstDeathPct,
      tradeEfficiency: tradesCompleted / Math.max(tradeOpportunities, 1) * 100,
      overpeekRate: overpeekDeaths / Math.max(kills.filter(
        k => k.user_steamid === playerSteamId
      ).length, 1) * 100,
    };
  }

  // ---- UTILITY INTELLIGENCE ----
  calculateUtilityStats(playerSteamId, matchData) {
    const flashes = matchData.flashes.filter(f => f.attacker_steamid === playerSteamId);
    const kills = matchData.kills;
    
    // Flash success: flashes that blinded at least one enemy
    const FLASH_WINDOW_TICKS = 3 * 64; // 3 second window
    const enemyFlashes = flashes.filter(f => f.user_team !== playerTeam);
    const flashSuccess = enemyFlashes.length / Math.max(flashes.length, 1) * 100;

    // Flash leading to kill: flash within 3s before a teammate kill
    let flashKills = 0;
    enemyFlashes.forEach(flash => {
      const hasKill = kills.some(k =>
        k.attacker_team === playerTeam &&
        k.tick - flash.tick > 0 &&
        k.tick - flash.tick < FLASH_WINDOW_TICKS
      );
      if (hasKill) flashKills++;
    });

    return {
      flashSuccess,
      flashKillPct: flashKills / Math.max(flashes.length, 1) * 100,
      totalFlashes: flashes.length,
      totalGrenades: matchData.grenades.filter(
        g => g.user_steamid === playerSteamId
      ).length,
    };
  }

  // ---- WIN PROBABILITY MODEL ----
  calculateWinProbability(event, gameState) {
    // Simplified logistic regression model
    // Features: alive_ct, alive_t, equipment_diff, bomb_planted, time_remaining
    
    const features = {
      aliveDiff: gameState.aliveCT - gameState.aliveT,
      equipDiff: (gameState.ctEquip - gameState.tEquip) / 10000,
      bombPlanted: gameState.bombPlanted ? 1 : 0,
      timeRemaining: gameState.roundTime / 115, // normalized
      round: gameState.round / 30,
    };

    // Pre-trained weights (would come from ML model trained on pro matches)
    const weights = {
      aliveDiff: 0.35,
      equipDiff: 0.12,
      bombPlanted: -0.25,
      timeRemaining: 0.08,
      round: 0.02,
      bias: 0.5,
    };

    const z = Object.entries(features).reduce(
      (sum, [key, val]) => sum + val * (weights[key] || 0), 
      weights.bias
    );

    // Sigmoid
    const probability = 1 / (1 + Math.exp(-z));
    return Math.round(probability * 1000) / 10; // e.g., 62.4%
  }

  // ---- RISK PROFILE CLASSIFICATION ----
  classifyPlayer(allStats) {
    const scores = {
      'Hyper Aggressive': 
        allStats.entryRate * 0.3 + 
        allStats.firstKillRate * 0.3 + 
        (100 - allStats.survivalRate) * 0.2 +
        allStats.overpeekRate * 0.2,
      
      'Passive Lurker': 
        (100 - allStats.entryRate) * 0.3 + 
        allStats.lateRoundKills * 0.3 + 
        allStats.survivalRate * 0.2 +
        allStats.soloPositionTime * 0.2,
      
      'Support Anchor': 
        allStats.flashAssists * 0.3 + 
        allStats.utilityScore * 0.3 + 
        allStats.siteHoldRate * 0.2 +
        allStats.tradePct * 0.2,
      
      'Clutch Specialist': 
        allStats.clutchWinRate * 0.4 + 
        allStats.vsMultipleWinRate * 0.3 + 
        allStats.lowHPKills * 0.15 +
        allStats.postPlantKills * 0.15,
    };

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return {
      primary: sorted[0][0],
      secondary: sorted[1][0],
      scores,
    };
  }
}
```

### Step 5: Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  steamId   String   @unique
  username  String
  avatar    String?
  authCode  String?  // Steam match sharing auth code
  createdAt DateTime @default(now())
  lastLogin DateTime @default(now())
  
  matches   MatchPlayer[]
  stats     PlayerStats?
}

model Match {
  id            String   @id @default(cuid())
  sharecode     String   @unique
  map           String
  date          DateTime
  demoUrl       String?
  parsed        Boolean  @default(false)
  scoreCT       Int
  scoreT        Int
  duration      Int      // seconds
  
  players       MatchPlayer[]
  rounds        Round[]
  killEvents    KillEvent[]
  damageEvents  DamageEvent[]
  utilityEvents UtilityEvent[]
  
  createdAt     DateTime @default(now())
}

model MatchPlayer {
  id       String @id @default(cuid())
  userId   String
  matchId  String
  team     String // "CT" or "T"
  
  kills    Int
  deaths   Int
  assists  Int
  adr      Float
  rating   Float
  
  // Contextual
  pistolKills    Int @default(0)
  ecoKills       Int @default(0)
  fullBuyKills   Int @default(0)
  entryKills     Int @default(0)
  clutchWins     Int @default(0)
  clutchAttempts Int @default(0)
  
  // Aim
  headshotPct    Float @default(0)
  firstBulletAcc Float @default(0)
  
  // Decision
  firstDeaths    Int @default(0)
  trades         Int @default(0)
  overpeeks      Int @default(0)
  
  // Utility
  flashesThrown  Int @default(0)
  enemiesFlashed Int @default(0)
  flashAssistKills Int @default(0)
  
  user     User  @relation(fields: [userId], references: [id])
  match    Match @relation(fields: [matchId], references: [id])
  
  @@unique([userId, matchId])
}

model Round {
  id         String @id @default(cuid())
  matchId    String
  roundNum   Int
  winner     String // "CT" or "T"
  reason     String // "elimination", "bomb", "defuse", "time"
  roundType  String // "pistol", "eco", "force", "full_buy"
  
  // Win probability at key moments
  wpStart    Float  @default(50)
  wpEnd      Float  @default(50)
  
  match      Match  @relation(fields: [matchId], references: [id])
}

model KillEvent {
  id             String @id @default(cuid())
  matchId        String
  roundNum       Int
  tick           Int
  
  attackerSteam  String
  victimSteam    String
  assisterSteam  String?
  
  weapon         String
  headshot       Boolean
  wallbang       Boolean
  noscope        Boolean
  thrusmoke      Boolean
  attackerBlind  Boolean
  
  isEntry        Boolean @default(false)
  isTrade        Boolean @default(false)
  wpShift        Float   @default(0) // Win probability impact
  
  match          Match @relation(fields: [matchId], references: [id])
}

model DamageEvent {
  id            String @id @default(cuid())
  matchId       String
  roundNum      Int
  tick          Int
  attackerSteam String
  victimSteam   String
  damage        Int
  weapon        String
  hitgroup      Int    // 1=head, 2=chest, 3=stomach, etc.
  
  match         Match  @relation(fields: [matchId], references: [id])
}

model UtilityEvent {
  id          String @id @default(cuid())
  matchId     String
  roundNum    Int
  tick        Int
  playerSteam String
  type        String // "flash", "smoke", "he", "molotov"
  
  // Flash-specific
  enemiesHit  Int    @default(0)
  blindDuration Float @default(0)
  ledToKill   Boolean @default(false)
  
  match       Match  @relation(fields: [matchId], references: [id])
}

model PlayerStats {
  id       String @id @default(cuid())
  userId   String @unique
  
  // Aggregate stats (recalculated after each match)
  totalMatches     Int   @default(0)
  winRate          Float @default(0)
  performanceScore Float @default(0)
  
  // Risk profile
  profilePrimary   String @default("Unknown")
  profileSecondary String @default("Unknown")
  
  // Growth
  improvementSlope Float @default(0)
  volatility       Float @default(0)
  stabilityScore   Float @default(0)
  
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
}
```

### Step 6: API Endpoints

```
Auth:
  GET  /auth/steam              -> Redirect to Steam OpenID
  GET  /auth/steam/callback     -> Handle callback, create session
  POST /auth/logout             -> Clear session

User:
  GET  /api/user/me             -> Current user profile + stats
  PUT  /api/user/authcode       -> Set match sharing auth code

Matches:
  GET  /api/matches             -> List user's matches (paginated)
  GET  /api/matches/:id         -> Single match detail
  POST /api/matches/sync        -> Trigger sharecode fetch + parse
  POST /api/matches/upload      -> Manual demo upload

Stats:
  GET  /api/stats/overview      -> Performance score, win rate, basic stats
  GET  /api/stats/contextual    -> Stats by round type
  GET  /api/stats/aim           -> Aim analytics
  GET  /api/stats/decisions     -> Decision metrics
  GET  /api/stats/utility       -> Utility intelligence
  GET  /api/stats/winprob/:matchId -> Win probability timeline
  GET  /api/stats/growth        -> 30-match trend data
  GET  /api/stats/profile       -> Risk profile classification

AI:
  GET  /api/ai/recommendations  -> Personalized training suggestions
```

### Step 7: Background Job Pipeline

```
1. Cron job runs every 5 minutes
2. For each user with an auth code:
   a. Call GetNextMatchSharingCode
   b. If new sharecode found:
      - Decode sharecode to get match ID
      - Request demo URL from Game Coordinator
      - Download .dem file to temp storage
      - Queue demo parse job in Redis/Bull
3. Demo parser worker:
   a. Pick job from queue
   b. Run Python parser on .dem file
   c. Store structured events in PostgreSQL
   d. Run stats calculator
   e. Update PlayerStats aggregate
   f. Invalidate Redis cache
   g. Delete temp .dem file
```

### Step 8: Environment Variables

```env
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/stattrak
REDIS_URL=redis://localhost:6379

# Steam
STEAM_API_KEY=your_steam_web_api_key
STEAM_RETURN_URL=http://localhost:3000/auth/steam/callback
STEAM_REALM=http://localhost:3000/

# Steam Bot (for Game Coordinator access)
STEAM_BOT_USERNAME=your_bot_account
STEAM_BOT_PASSWORD=your_bot_password

# App
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
NODE_ENV=development
```

---

## Key Libraries

| Purpose             | Library                    | Language |
|---------------------|----------------------------|----------|
| Steam Auth          | passport-steam             | Node.js  |
| Steam Client        | steam-user                 | Node.js  |
| CS2 Game Coordinator| globaloffensive            | Node.js  |
| Sharecode decode    | csgo-sharecode             | Node.js  |
| Demo parsing        | demoparser2                | Python   |
| ORM                 | Prisma                     | Node.js  |
| Job queue           | BullMQ                     | Node.js  |
| Caching             | ioredis                    | Node.js  |
| API framework       | NestJS                     | Node.js  |

---

## Alternative: Faceit-Only Mode

If you want to skip demo parsing entirely for an MVP:

1. Use Faceit OAuth for login
2. Pull stats from Faceit Data API (free tier: 10 req/min)
3. Faceit already provides: K/D, ADR, HS%, win rate, ELO, map stats
4. You lose: tick-level aim data, utility tracking, win probability, crosshair placement
5. You gain: much simpler architecture, no demo parsing needed

This is a viable "Phase 1" approach before investing in the full pipeline.

---

## Deployment

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports: ["3000:3000"]
    env_file: .env
    depends_on: [postgres, redis]

  parser:
    build: ./parser
    env_file: .env
    depends_on: [postgres, redis]

  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: stattrak
      POSTGRES_USER: stattrak
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes: ["pgdata:/var/lib/postgresql/data"]

  redis:
    image: redis:7-alpine
    volumes: ["redisdata:/data"]

volumes:
  pgdata:
  redisdata:
```
