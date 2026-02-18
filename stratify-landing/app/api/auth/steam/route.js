import { redirect } from "next/navigation";
import { getSteamLoginUrl } from "@/lib/steam";

export async function GET(request) {
  const url = new URL(request.url);
  const returnUrl = `${url.origin}/api/auth/steam/callback`;
  const steamUrl = getSteamLoginUrl(returnUrl);
  redirect(steamUrl);
}
