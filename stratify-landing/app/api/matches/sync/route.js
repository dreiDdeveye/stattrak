import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { fetchAllNewSharecodes } from "@/lib/steam";
import { cacheDel } from "@/lib/redis";

export const maxDuration = 60; // Allow up to 60s on Vercel

export async function POST() {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!user.authCode) {
      return NextResponse.json({ synced: 0, message: "Set your auth code first in Settings (/settings)" });
    }

    console.log(`[SYNC] Starting sync for ${user.username} (${user.steamId}), authCode: ${user.authCode?.slice(0,4)}...`);

    const newCodes = await fetchAllNewSharecodes(user.steamId, user.authCode, user.lastSharecode);

    console.log(`[SYNC] Found ${newCodes.length} new sharecodes`);

    if (newCodes.length === 0) {
      return NextResponse.json({ 
        synced: 0, 
        message: "No new matches found. Make sure your auth code is correct and you have recent competitive/premier matches.",
        debug: {
          steamId: user.steamId,
          authCodeSet: !!user.authCode,
          lastSharecode: user.lastSharecode || "none",
        }
      });
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
          data: { 
            matchId: match.id, 
            userId: user.id, 
            steamId: user.steamId, 
            team: "CT",
            kills: 0,
            deaths: 0,
            assists: 0,
            adr: 0,
            rating: 0,
            headshotPct: 0,
          },
        });

        synced++;
      } catch (e) {
        console.error(`[SYNC] Error processing sharecode ${sharecode}: ${e.message}`);
      }
    }

    if (newCodes.length > 0) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastSharecode: newCodes[newCodes.length - 1], lastSync: new Date() },
      });
    }

    try {
      await cacheDel(`stats:${user.id}:*`);
    } catch {}

    return NextResponse.json({ 
      synced, 
      total: newCodes.length, 
      message: synced > 0 
        ? `${synced} new matches synced! Note: Detailed stats require demo parsing which is coming soon.`
        : `Found ${newCodes.length} codes but all already existed.`
    });
  } catch (err) {
    console.error("[SYNC] Unexpected error:", err);
    return NextResponse.json({ error: "Sync failed: " + err.message }, { status: 500 });
  }
}