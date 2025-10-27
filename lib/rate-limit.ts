import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Singleton to avoid creating multiple instances
let ratelimit: Ratelimit | null = null;

export function getRateLimiter() {
  if (!ratelimit) {
    // Check if environment variables are set
    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      throw new Error(
        "Missing Upstash Redis credentials. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your environment variables."
      );
    }

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    // Sliding window: 3 orders per 60 minutes (1 hour)
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "60 m"),
      analytics: true,
      prefix: "ratelimit:order",
    });
  }

  return ratelimit;
}

/**
 * Extract client IP from request headers
 * Works with Vercel, Cloudflare, and other hosting providers
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const cfConnectingIp = req.headers.get("cf-connecting-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  if (realIp) {
    return realIp.trim();
  }
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  return "unknown";
}
