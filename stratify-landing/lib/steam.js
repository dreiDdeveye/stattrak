import axios from "axios";

const STEAM_API_KEY = process.env.STEAM_API_KEY;

export async function getNextSharecode(steamId, authCode, knownCode = "CSGO-00000-00000-00000-00000-00000") {
  try {
    const res = await axios.get(
      "https://api.steampowered.com/ICSGOPlayers_730/GetNextMatchSharingCode/v1",
      {
        params: { key: STEAM_API_KEY, steamid: steamId, steamidkey: authCode, knowncode: knownCode },
        timeout: 10000,
      }
    );
    const code = res.data?.result?.nextcode;
    return code && code !== "n/a" ? code : null;
  } catch {
    return null;
  }
}

export async function fetchAllNewSharecodes(steamId, authCode, lastKnown) {
  const codes = [];
  let current = lastKnown || "CSGO-00000-00000-00000-00000-00000";
  while (true) {
    const next = await getNextSharecode(steamId, authCode, current);
    if (!next) break;
    codes.push(next);
    current = next;
    await new Promise((r) => setTimeout(r, 1100));
  }
  return codes;
}

export async function getPlayerSummary(steamId) {
  try {
    const res = await axios.get(
      "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/",
      { params: { key: STEAM_API_KEY, steamids: steamId } }
    );
    return res.data?.response?.players?.[0] || null;
  } catch {
    return null;
  }
}

/**
 * Build Steam OpenID login URL.
 */
export function getSteamLoginUrl(returnUrl) {
  const params = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.return_to": returnUrl,
    "openid.realm": returnUrl.split("/api")[0] + "/",
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
  });
  return `https://steamcommunity.com/openid/login?${params.toString()}`;
}

/**
 * Verify Steam OpenID callback and extract SteamID.
 */
export async function verifySteamLogin(query) {
  try {
    const params = new URLSearchParams(query);
    params.set("openid.mode", "check_authentication");

    const res = await axios.post(
      "https://steamcommunity.com/openid/login",
      params.toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (!res.data.includes("is_valid:true")) return null;

    const claimedId = query["openid.claimed_id"] || query.get?.("openid.claimed_id");
    const match = claimedId?.match(/\/id\/(\d+)$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
