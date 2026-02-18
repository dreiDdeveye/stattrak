import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stats = await prisma.playerStats.findUnique({ where: { userId: user.id } });
  return NextResponse.json({
    flashSuccess: stats?.avgFlashSuccess || 0,
    flashAssists: stats?.avgFlashAssists || 0,
    utilityDamage: stats?.avgUtilDamage || 0,
    utilityScore: stats?.utilityScore || 0,
  });
}
