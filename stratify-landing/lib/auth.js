import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "stattrak-dev-secret";

export function signToken(user) {
  return jwt.sign(
    { sub: user.id, steamId: user.steamId, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Get current user from cookie. Use in API routes:
 *   const user = await getUser();
 *   if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
 */
export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("stattrak_token")?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    include: { stats: true },
  });

  return user;
}
