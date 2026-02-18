import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySteamLogin, getPlayerSummary } from "@/lib/steam";
import { signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const url = new URL(request.url);
  const query = Object.fromEntries(url.searchParams.entries());

  // Verify Steam OpenID response
  const steamId = await verifySteamLogin(query);
  if (!steamId) {
    return NextResponse.redirect(new URL("/?error=auth_failed", url.origin));
  }

  // Get Steam profile
  const profile = await getPlayerSummary(steamId);

  // Upsert user
  const user = await prisma.user.upsert({
    where: { steamId },
    update: {
      username: profile?.personaname || `Player_${steamId.slice(-6)}`,
      avatar: profile?.avatarfull || profile?.avatar || null,
      profileUrl: profile?.profileurl || null,
      lastLogin: new Date(),
    },
    create: {
      steamId,
      username: profile?.personaname || `Player_${steamId.slice(-6)}`,
      avatar: profile?.avatarfull || profile?.avatar || null,
      profileUrl: profile?.profileurl || null,
    },
  });

  // Ensure PlayerStats exists
  await prisma.playerStats.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  // Sign JWT
  const token = signToken(user);

  // Set cookie and redirect
  const cookieStore = await cookies();
  cookieStore.set("stattrak_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return NextResponse.redirect(new URL("/dashboard", url.origin));
}
