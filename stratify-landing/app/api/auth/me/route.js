import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";

export async function GET() {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({
    id: user.id,
    steamId: user.steamId,
    username: user.username,
    avatar: user.avatar,
    profileUrl: user.profileUrl,
    stats: user.stats,
    lastSync: user.lastSync,
    createdAt: user.createdAt,
  });
}
