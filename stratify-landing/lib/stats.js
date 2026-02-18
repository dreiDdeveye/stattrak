import { prisma } from "./prisma";

const round2 = (n) => Math.round(n * 100) / 100;

export async function recalculateUserStats(userId) {
  const recentMatches = await prisma.matchPlayer.findMany({
    where: { userId },
    include: { match: { include: { rounds: true } } },
    orderBy: { match: { date: "desc" } },
    take: 30,
  });

  if (recentMatches.length === 0) return;

  const allMatches = await prisma.matchPlayer.findMany({
    where: { userId },
    include: { match: true },
  });

  const totalMatches = allMatches.length;
  const wins = allMatches.filter((m) => {
    const ps = m.team === "CT" ? m.match.scoreCT : m.match.scoreT;
    const es = m.team === "CT" ? m.match.scoreT : m.match.scoreCT;
    return ps > es;
  }).length;
  const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0;

  const n = recentMatches.length;
  const avg = (fn) => recentMatches.reduce((s, m) => s + fn(m), 0) / n;

  const avgRating = avg((m) => m.rating);
  const avgAdr = avg((m) => m.adr);
  const avgKills = avg((m) => m.kills);
  const avgDeaths = avg((m) => m.deaths);
  const avgAssists = avg((m) => m.assists);
  const avgHsPct = avg((m) => m.headshotPct);

  const totalRounds = recentMatches.reduce((s, m) => s + (m.match.rounds?.length || 0), 0);
  const avgFirstDeathPct = totalRounds > 0
    ? (recentMatches.reduce((s, m) => s + m.firstDeaths, 0) / totalRounds) * 100 : 0;

  const totalDeaths30 = recentMatches.reduce((s, m) => s + m.deaths, 0);
  const totalTradesMade = recentMatches.reduce((s, m) => s + m.tradesMade, 0);
  const avgTradeEfficiency = totalDeaths30 > 0 ? (totalTradesMade / totalDeaths30) * 100 : 0;

  const totalEntryAttempts = recentMatches.reduce((s, m) => s + m.entryAttempts, 0);
  const totalEntryWins = recentMatches.reduce((s, m) => s + m.entryWins, 0);
  const duelFavorability = totalEntryAttempts > 0 ? totalEntryWins / totalEntryAttempts : 0.5;

  const totalOverpeeks = recentMatches.reduce((s, m) => s + m.overpeekDeaths, 0);
  const avgOverpeekRate = totalDeaths30 > 0 ? (totalOverpeeks / totalDeaths30) * 100 : 0;

  const totalFlashes = recentMatches.reduce((s, m) => s + m.flashesThrown, 0);
  const totalEnemiesFlashed = recentMatches.reduce((s, m) => s + m.enemiesFlashed, 0);
  const avgFlashSuccess = totalFlashes > 0 ? (totalEnemiesFlashed / totalFlashes) * 100 : 0;
  const avgFlashAssists = avg((m) => m.flashAssists);
  const avgUtilDamage = avg((m) => m.utilityDamage);
  const utilityScore = Math.min(100, avgFlashSuccess * 0.35 + avgUtilDamage * 0.15 + avgFlashAssists * 8 + (avgFlashSuccess > 50 ? 20 : 0));

  const totalClutchAttempts = recentMatches.reduce((s, m) => s + m.clutchAttempts, 0);
  const totalClutchWins = recentMatches.reduce((s, m) => s + m.clutchWins, 0);
  const clutchRate = totalClutchAttempts > 0 ? (totalClutchWins / totalClutchAttempts) * 100 : 0;

  // Risk profile
  const entryRate = totalEntryAttempts > 0 ? (totalEntryWins / totalEntryAttempts) * 100 : 0;
  const scores = {
    aggression: Math.min(100, entryRate * 0.4 + avgFirstDeathPct * 0.8 + avgOverpeekRate * 0.6 + (avgAdr / 100) * 30),
    clutch: Math.min(100, clutchRate * 1.2 + (100 - avgFirstDeathPct) * 0.3 + avgAdr * 0.2),
    support: Math.min(100, avgFlashSuccess * 0.5 + avgFlashAssists * 10 + avgTradeEfficiency * 0.3),
    entry: Math.min(100, entryRate * 0.8 + avgFirstDeathPct * 0.5 + avgAdr * 0.15),
    lurk: Math.min(100, (100 - entryRate) * 0.4 + (100 - avgFirstDeathPct) * 0.3 + clutchRate * 0.5),
    anchor: Math.min(100, (100 - entryRate) * 0.3 + avgTradeEfficiency * 0.3 + avgFlashSuccess * 0.3 + (100 - avgOverpeekRate) * 0.3),
  };
  const profiles = {
    "Hyper Aggressive": scores.aggression * 0.5 + scores.entry * 0.5,
    "Clutch Specialist": scores.clutch,
    "Support Anchor": scores.support * 0.5 + scores.anchor * 0.5,
    "Passive Lurker": scores.lurk,
    "Entry Fragger": scores.entry,
    "Site Anchor": scores.anchor,
  };
  const sorted = Object.entries(profiles).sort((a, b) => b[1] - a[1]);

  // Growth
  const ratings = recentMatches.map((m) => m.rating).reverse();
  const rn = ratings.length;
  const xM = (rn - 1) / 2;
  const yM = ratings.reduce((a, b) => a + b, 0) / rn;
  const num = ratings.reduce((s, y, i) => s + (i - xM) * (y - yM), 0);
  const den = ratings.reduce((s, _, i) => s + (i - xM) ** 2, 0);
  const slope = den !== 0 ? num / den : 0;
  const vol = Math.sqrt(ratings.reduce((s, v) => s + (v - yM) ** 2, 0) / rn);
  const stability = Math.max(0, Math.min(100, 100 - vol * 200));

  const performanceScore = Math.min(100, Math.max(0,
    avgRating * 25 + (avgAdr / 100) * 15 + (winRate / 100) * 15 +
    (avgHsPct / 100) * 5 + (clutchRate / 100) * 5 + (avgTradeEfficiency / 100) * 5 +
    (utilityScore / 100) * 5 + Math.max(0, slope * 100) * 2 - 15
  ));

  await prisma.playerStats.upsert({
    where: { userId },
    update: {
      totalMatches, totalWins: wins, totalLosses: totalMatches - wins,
      winRate: round2(winRate), performanceScore: round2(performanceScore),
      avgRating: round2(avgRating), avgAdr: round2(avgAdr),
      avgKills: round2(avgKills), avgDeaths: round2(avgDeaths), avgAssists: round2(avgAssists),
      avgHeadshotPct: round2(avgHsPct),
      avgOverpeekRate: round2(avgOverpeekRate), avgFirstDeathPct: round2(avgFirstDeathPct),
      avgTradeEfficiency: round2(avgTradeEfficiency), duelFavorability: round2(duelFavorability),
      avgFlashSuccess: round2(avgFlashSuccess), avgFlashAssists: round2(avgFlashAssists),
      avgUtilDamage: round2(avgUtilDamage), utilityScore: round2(utilityScore),
      clutchRate: round2(clutchRate),
      profilePrimary: sorted[0][0], profileSecondary: sorted[1][0],
      aggressionScore: round2(scores.aggression), clutchScore: round2(scores.clutch),
      supportScore: round2(scores.support), entryScore: round2(scores.entry),
      lurkScore: round2(scores.lurk), anchorScore: round2(scores.anchor),
      improvementSlope: round2(slope), volatility: round2(vol), stabilityScore: round2(stability),
    },
    create: { userId, totalMatches, totalWins: wins, totalLosses: totalMatches - wins, winRate: round2(winRate), performanceScore: round2(performanceScore) },
  });
}
