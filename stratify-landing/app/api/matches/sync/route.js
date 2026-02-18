import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchAllNewSharecodes } from "@/lib/steam";
import { cacheDel } from "@/lib/redis";

export async function POST() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!user.authCode) {
    return NextResponse.json({ synced: 0, message: "Set your auth code first in settings" });
  }

  const newCodes = await fetchAllNewSharecodes(user.steamId, user.authCode, user.lastSharecode);

  if (newCodes.length === 0) {
    return NextResponse.json({ synced: 0, message: "No new matches found" });
  }

  let synced = 0;
  for (const sharecode of newCodes) {
    try {
      const existing = await prisma.match.findUnique({ where: { sharecode } });
      if (existing) continue;

      const match = await prisma.match.create({
        data: {
          sharecode,
          map: "unknown",
          date: new Date(),
          scoreCT: 0,
          scoreT: 0,
        },
      });

      await prisma.matchPlayer.create({
        data: { matchId: match.id, userId: user.id, steamId: user.steamId, team: "CT" },
      });

      synced++;
    } catch (e) {
      console.error(`Error processing sharecode: ${e.message}`);
    }
  }

  if (newCodes.length > 0) {
    await prisma.user.update({
      where: { id: user.id },
      data: { lastSharecode: newCodes[newCodes.length - 1], lastSync: new Date() },
    });
  }

  await cacheDel(`stats:${user.id}:*`);

  return NextResponse.json({ synced, total: newCodes.length, message: `${synced} new matches synced` });
}
