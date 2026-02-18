import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stats = await prisma.playerStats.findUnique({ where: { userId: user.id } });
  return NextResponse.json({
    overpeekRate: stats?.avgOverpeekRate || 0,
    firstDeathPct: stats?.avgFirstDeathPct || 0,
    tradeEfficiency: stats?.avgTradeEfficiency || 0,
    duelFavorability: stats?.duelFavorability || 0,
  });
}
