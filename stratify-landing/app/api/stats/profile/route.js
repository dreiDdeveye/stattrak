import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stats = await prisma.playerStats.findUnique({ where: { userId: user.id } });
  if (!stats) return NextResponse.json(null);
  return NextResponse.json({
    primary: stats.profilePrimary,
    secondary: stats.profileSecondary,
    traits: [
      { name: "Aggression", value: stats.aggressionScore },
      { name: "Clutch", value: stats.clutchScore },
      { name: "Support", value: stats.supportScore },
      { name: "Entry", value: stats.entryScore },
      { name: "Lurk", value: stats.lurkScore },
      { name: "Anchor", value: stats.anchorScore },
    ],
  });
}
