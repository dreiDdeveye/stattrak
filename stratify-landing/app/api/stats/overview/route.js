import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/redis";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cached = await cacheGet(`stats:${user.id}:overview`);
  if (cached) return NextResponse.json(cached);

  const stats = await prisma.playerStats.findUnique({ where: { userId: user.id } });

  const result = {
    username: user.username, avatar: user.avatar, steamId: user.steamId,
    performanceScore: stats?.performanceScore || 0,
    winRate: stats?.winRate || 0, totalMatches: stats?.totalMatches || 0,
    totalWins: stats?.totalWins || 0, totalLosses: stats?.totalLosses || 0,
    avgRating: stats?.avgRating || 0, avgAdr: stats?.avgAdr || 0,
    avgKills: stats?.avgKills || 0, avgDeaths: stats?.avgDeaths || 0,
    avgHeadshotPct: stats?.avgHeadshotPct || 0,
    improvementSlope: stats?.improvementSlope || 0,
  };

  await cacheSet(`stats:${user.id}:overview`, result);
  return NextResponse.json(result);
}
