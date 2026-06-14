import { NextResponse } from "next/server";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      remaining: limit - 1,
      retryAfterSeconds: 0,
    };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);

  return {
    allowed: true,
    remaining: limit - entry.count,
    retryAfterSeconds: 0,
  };
}

export function getRequestIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") || "unknown";
}

export function enforceRateLimit(
  request: Request,
  namespace: string,
  limit: number,
  windowMs: number
) {
  const ip = getRequestIp(request);
  const result = checkRateLimit(`${namespace}:${ip}`, limit, windowMs);

  if (result.allowed) {
    return null;
  }

  return NextResponse.json(
    {
      success: false,
      message: "Too many requests. Please try again later.",
    },
    {
      status: 429,
      headers: {
        "Retry-After": result.retryAfterSeconds.toString(),
      },
    }
  );
}
