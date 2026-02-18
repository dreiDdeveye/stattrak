import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stats = await prisma.playerStats.findUnique({ where: { userId: user.id } });
  const matches = await prisma.matchPlayer.findMany({
    where: { userId: user.id },
    include: { match: { select: { date: true, map: true } } },
    orderBy: { match: { date: "asc" } },
    take: 50,
  });
  return NextResponse.json({
    matches: matches.map((m, i) => ({
      index: i + 1, date: m.match.date, map: m.match.map,
      rating: m.rating, adr: m.adr, kills: m.kills, deaths: m.deaths, headshotPct: m.headshotPct,
    })),
    improvementSlope: stats?.improvementSlope || 0,
    volatility: stats?.volatility || 0,
    stabilityScore: stats?.stabilityScore || 0,
  });
}
