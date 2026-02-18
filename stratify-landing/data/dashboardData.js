// ============================================================
// DASHBOARD SEED DATA
// All analytics data for the StatTrak dashboard
// ============================================================

export const PLAYER_DATA = {
  steamId: "76561198012345678",
  username: "fr0stbyte",
  rank: "Faceit Level 8",
  elo: 1847,
  totalMatches: 342,
  winRate: 54.7,
  performanceScore: 78.4,
  lastActive: "2h ago",
};

export const CONTEXTUAL_STATS = {
  pistol: { kd: 1.42, adr: 87.3, winRate: 58.2, matches: 342 },
  eco: { kd: 0.89, adr: 54.1, winRate: 31.4, matches: 198 },
  forceBuy: { kd: 1.11, adr: 72.8, winRate: 42.1, matches: 267 },
  fullBuy: { kd: 1.34, adr: 82.6, winRate: 56.8, matches: 342 },
  losing: { kd: 0.94, adr: 61.2, winRate: 28.7, clutchRate: 18.4 },
  entry: { successRate: 42.8, firstKillRate: 22.1, tradedRate: 68.4 },
  anchor: { holdRate: 71.2, retakeRate: 38.9, utilUsage: 84.2 },
};

export const AIM_ANALYTICS = {
  ttd: 0.287, ttdAvg: 0.312,
  crosshairPlacement: 72.4, crosshairAvg: 65.0,
  sprayTransfer: 34.8, sprayAvg: 28.5,
  preAim: 68.2, preAimAvg: 61.0,
  firstBulletAccuracy: 48.7,
  headshotPct: 52.3,
};

export const DECISION_METRICS = {
  overpeekRate: 28.4, overpeekAvg: 19.2,
  firstDeathPct: 18.7, firstDeathAvg: 20.0,
  tradeEfficiency: 72.8, tradeAvg: 65.0,
  duelFavorability: 1.24, duelAvg: 1.0,
  disadvantageDeaths: 14.2, disadvantageAvg: 18.0,
};

export const UTILITY_SCORES = {
  flashSuccess: 42.8, flashKill: 18.4,
  smokeEffectiveness: 67.2, utilityWaste: 12.8,
  grenadeImpact: 71.4, overallScore: 68.2,
};

export const GROWTH_DATA = Array.from({ length: 30 }, (_, i) => ({
  match: i + 1,
  rating: +(0.95 + Math.sin(i * 0.3) * 0.15 + i * 0.008).toFixed(3),
  adr: +(68 + Math.sin(i * 0.25) * 8 + i * 0.4).toFixed(1),
  impact: +(0.8 + Math.sin(i * 0.35) * 0.12 + i * 0.006).toFixed(3),
  kd: +(1.0 + Math.sin(i * 0.2) * 0.2 + i * 0.005).toFixed(3),
}));

export const WIN_PROB_EVENTS = [
  { round: 1, event: "Opening Kill", shift: +8.2, type: "positive" },
  { round: 3, event: "Trade Kill", shift: +4.1, type: "positive" },
  { round: 5, event: "Failed Retake", shift: -12.4, type: "negative" },
  { round: 7, event: "Ace Round", shift: +18.7, type: "positive" },
  { round: 8, event: "Utility Waste", shift: -3.2, type: "neutral" },
  { round: 10, event: "1v2 Clutch", shift: +22.1, type: "positive" },
  { round: 12, event: "Over-peek Death", shift: -8.9, type: "negative" },
  { round: 14, event: "Flash Assist Kill", shift: +5.4, type: "positive" },
  { round: 16, event: "Eco Frag", shift: +2.8, type: "positive" },
  { round: 18, event: "Caught Rotating", shift: -6.7, type: "negative" },
  { round: 20, event: "Bomb Plant", shift: +7.3, type: "positive" },
  { round: 22, event: "Anchor Hold", shift: +11.2, type: "positive" },
  { round: 24, event: "Whiff Spray", shift: -9.1, type: "negative" },
];

export const RISK_PROFILE = {
  primary: "Clutch Specialist",
  secondary: "Hyper Aggressive",
  traits: [
    { name: "Aggression", value: 72 },
    { name: "Clutch", value: 88 },
    { name: "Support", value: 45 },
    { name: "Entry", value: 64 },
    { name: "Lurk", value: 38 },
    { name: "Anchor", value: 52 },
  ],
};

export const AI_RECOMMENDATIONS = [
  {
    area: "Decision Making", severity: "high", metric: "Overpeek Rate",
    value: "28.4%", avg: "19.2%",
    insight: "Your Overpeek Rate is 48% above the average for Level 8. You're committing to duels after initial information is gathered instead of falling back. Focus on holding crossfires and using jiggle peeks to gather info without committing.",
    drills: [
      "Practice counter-strafing into cover after 1 second of exposure",
      "Run retake servers focusing on holding post-plant angles only",
      "Record 5 matches and timestamp every overpeek death",
    ],
  },
  {
    area: "Utility Usage", severity: "medium", metric: "Flash Success Rate",
    value: "42.8%", avg: "51.0%",
    insight: "Your flash timing is off by ~0.3s on average, causing teammates to turn or enemies to recover before you peek. Your pop-flashes specifically have a 31% success rate vs 48% average.",
    drills: [
      "Learn 3 pop-flash lineups per map in your pool",
      "Practice flash-peek timing in aim_botz with a partner",
      "Focus on right-click underhand flashes for close angles",
    ],
  },
  {
    area: "Economy", severity: "low", metric: "Eco Round K/D",
    value: "0.89", avg: "0.95",
    insight: "Your eco round impact is slightly below average. You're taking aim duels with pistols against rifles instead of playing for picks and exits. Eco rounds should focus on information and exit frags.",
    drills: [
      "Practice Desert Eagle headshot-only in deathmatch",
      "On eco rounds, play for flanks and info rather than site holds",
      "Study pro demos for eco round positioning on your main maps",
    ],
  },
];

export const MATCH_HISTORY = [
  { map: "Mirage", result: "W", score: "16-12", rating: 1.34, kills: 24, deaths: 16, adr: 87.2 },
  { map: "Inferno", result: "L", score: "11-16", rating: 0.89, kills: 15, deaths: 21, adr: 64.1 },
  { map: "Dust2", result: "W", score: "16-8", rating: 1.52, kills: 28, deaths: 11, adr: 94.7 },
  { map: "Anubis", result: "W", score: "16-14", rating: 1.18, kills: 22, deaths: 19, adr: 78.3 },
  { map: "Ancient", result: "L", score: "13-16", rating: 0.94, kills: 18, deaths: 20, adr: 68.9 },
  { map: "Nuke", result: "W", score: "16-10", rating: 1.41, kills: 26, deaths: 14, adr: 89.1 },
];

export const RADAR_DATA = RISK_PROFILE.traits.map(t => ({
  subject: t.name, value: t.value, fullMark: 100,
}));

export const NAV_ITEMS = [
  { key: "overview", label: "Overview", iconKey: "BarChart2" },
  { key: "context", label: "Contextual", iconKey: "Layers" },
  { key: "aim", label: "Aim Lab", iconKey: "Crosshair" },
  { key: "decisions", label: "Decisions", iconKey: "Brain" },
  { key: "utility", label: "Utility", iconKey: "Bomb" },
  { key: "winprob", label: "Win Prob", iconKey: "Activity" },
  { key: "growth", label: "Growth", iconKey: "TrendUp" },
  { key: "profile", label: "Profile", iconKey: "Flame" },
  { key: "coach", label: "AI Coach", iconKey: "Sparkles" },
];
