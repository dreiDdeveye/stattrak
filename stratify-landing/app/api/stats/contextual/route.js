import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { cacheGet, cacheSet } from "@/lib/redis";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cached = await cacheGet(`stats:${user.id}:contextual`);
  if (cached) return NextResponse.json(cached);

  const stats = await prisma.playerStats.findUnique({ where: { userId: user.id } });
  const matches = await prisma.matchPlayer.findMany({
    where: { userId: user.id }, orderBy: { match: { date: "desc" } }, take: 30,
  });
  const n = matches.length || 1;
  const avg = (f) => matches.reduce((s, m) => s + (m[f] || 0), 0) / n;
  const sum = (f) => matches.reduce((s, m) => s + (m[f] || 0), 0);

  const result = {
    pistol: { winRate: stats?.pistolWinRate || 0, avgKills: avg("pistolKills"), avgDeaths: avg("pistolDeaths") },
    eco: { winRate: stats?.ecoWinRate || 0, avgKills: avg("ecoKills"), avgDeaths: avg("ecoDeaths") },
    forceBuy: { winRate: stats?.forceBuyWinRate || 0, avgKills: avg("forceBuyKills"), avgDeaths: avg("forceBuyDeaths") },
    fullBuy: { winRate: stats?.fullBuyWinRate || 0, avgKills: avg("fullBuyKills"), avgDeaths: avg("fullBuyDeaths") },
    entry: { attempts: sum("entryAttempts"), wins: sum("entryWins"), successRate: sum("entryAttempts") > 0 ? (sum("entryWins") / sum("entryAttempts")) * 100 : 0 },
    clutch: { attempts: sum("clutchAttempts"), wins: sum("clutchWins"), rate: stats?.clutchRate || 0 },
  };

  await cacheSet(`stats:${user.id}:contextual`, result);
  return NextResponse.json(result);
}
