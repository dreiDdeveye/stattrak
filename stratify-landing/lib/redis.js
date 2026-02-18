import Redis from "ioredis";

let redis = null;

export function getRedis() {
  if (redis) return redis;

  const host = process.env.REDIS_HOST || "localhost";
  const port = parseInt(process.env.REDIS_PORT || "6379");
  const password = process.env.REDIS_PASSWORD || undefined;
  const useTls = host.includes("upstash");

  redis = new Redis({
    host,
    port,
    password,
    tls: useTls ? {} : undefined,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  });

  return redis;
}

export async function cacheGet(key) {
  try {
    const r = getRedis();
    const val = await r.get(key);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
}

export async function cacheSet(key, value, ttl = 300) {
  try {
    const r = getRedis();
    await r.setex(key, ttl, JSON.stringify(value));
  } catch {}
}

export async function cacheDel(pattern) {
  try {
    const r = getRedis();
    const keys = await r.keys(pattern);
    if (keys.length) await r.del(...keys);
  } catch {}
}
