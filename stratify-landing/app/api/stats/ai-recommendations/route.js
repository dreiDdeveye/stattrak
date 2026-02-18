import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const stats = await prisma.playerStats.findUnique({ where: { userId: user.id } });
  if (!stats) return NextResponse.json([]);

  const recs = [];
  if (stats.avgOverpeekRate > 20) recs.push({ area: "Decision Making", severity: stats.avgOverpeekRate > 30 ? "high" : "medium", metric: "Overpeek Rate", value: `${stats.avgOverpeekRate}%`, avg: "19.2%", insight: "You're committing to duels after info is gathered instead of falling back.", drills: ["Practice counter-strafing into cover after 1s exposure", "Run retake servers focusing on post-plant angles", "Record 5 matches and timestamp every overpeek death"] });
  if (stats.avgFlashSuccess < 45) recs.push({ area: "Utility Usage", severity: stats.avgFlashSuccess < 30 ? "high" : "medium", metric: "Flash Success", value: `${stats.avgFlashSuccess}%`, avg: "51.0%", insight: "Your flash timing needs work. Focus on pop-flashes.", drills: ["Learn 3 pop-flash lineups per map", "Practice flash-peek timing with a partner", "Focus on right-click underhand flashes"] });
  if (stats.avgTradeEfficiency < 55) recs.push({ area: "Teamplay", severity: "medium", metric: "Trade Efficiency", value: `${stats.avgTradeEfficiency}%`, avg: "65.0%", insight: "Stay closer to teammates and be ready to refrag.", drills: ["Practice buddy system positioning", "Focus on crossfire setups in retakes", "Watch pro demos for 2-man peek timing"] });
  if (stats.avgHeadshotPct < 40) recs.push({ area: "Aim Mechanics", severity: "low", metric: "Headshot %", value: `${stats.avgHeadshotPct}%`, avg: "48.0%", insight: "Focus on pre-aiming head level at common angles.", drills: ["Play aim_botz headshot-only for 15 min daily", "Use Yprac maps for crosshair placement", "DM with AK focusing on first-bullet headshots"] });
  if (stats.avgFirstDeathPct > 25) recs.push({ area: "Positioning", severity: "medium", metric: "First Death %", value: `${stats.avgFirstDeathPct}%`, avg: "20.0%", insight: "You're dying first too often, removing your round impact.", drills: ["Use off-angles and one-and-done positions", "Practice falling back after initial contact", "Review T-side positioning"] });

  recs.sort((a, b) => ({ high: 0, medium: 1, low: 2 }[a.severity] || 2) - ({ high: 0, medium: 1, low: 2 }[b.severity] || 2));
  return NextResponse.json(recs.slice(0, 5));
}
