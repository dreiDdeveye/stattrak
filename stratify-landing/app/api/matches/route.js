import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");
  const skip = (page - 1) * limit;

  const [matches, total] = await Promise.all([
    prisma.matchPlayer.findMany({
      where: { userId: user.id },
      include: { match: { select: { id: true, map: true, date: true, scoreCT: true, scoreT: true, demoParsed: true } } },
      orderBy: { match: { date: "desc" } },
      skip,
      take: limit,
    }),
    prisma.matchPlayer.count({ where: { userId: user.id } }),
  ]);

  return NextResponse.json({
    matches: matches.map((mp) => {
      const ps = mp.team === "CT" ? mp.match.scoreCT : mp.match.scoreT;
      const es = mp.team === "CT" ? mp.match.scoreT : mp.match.scoreCT;
      return {
        matchId: mp.match.id, map: mp.match.map, date: mp.match.date,
        score: `${mp.match.scoreCT}-${mp.match.scoreT}`,
        result: ps > es ? "W" : ps < es ? "L" : "D",
        kills: mp.kills, deaths: mp.deaths, assists: mp.assists,
        adr: mp.adr, rating: mp.rating, headshotPct: mp.headshotPct,
        parsed: mp.match.demoParsed,
      };
    }),
    total, page, pages: Math.ceil(total / limit),
  });
}
