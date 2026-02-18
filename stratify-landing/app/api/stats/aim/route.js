import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stats = await prisma.playerStats.findUnique({ where: { userId: user.id } });
  return NextResponse.json({
    headshotPct: stats?.avgHeadshotPct || 0,
    firstBulletAccuracy: stats?.avgFirstBulletAcc || 0,
    crosshairPlacement: stats?.avgCrosshairPlace || 0,
    avgTimeToKill: stats?.avgTimeToKill || 0,
  });
}
