import type { NextRequest } from 'next/server';

/**
 * Minimal in-process rate limiter — dependency-free and FAIL-OPEN.
 *
 * Edge shield for the AIfa chat endpoint on aifa.digital. The chat now proxies to
 * the central brain, so this is the *edge* per-IP limit the brief requires. Per-
 * serverless-instance (not globally shared), so a safety net rather than a hard
 * quota. Limits are generous; any internal error returns "allowed" so the limiter
 * can never take chat down.
 */

type Bucket = { count: number; resetAt: number };
const store = new Map<string, Bucket>();
const MAX_KEYS = 20000; // crude memory cap against key explosion

/** Best-effort client IP. Vercel/nginx set x-real-ip (not client-spoofable). */
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

/**
 * Returns true if the request is allowed, false if it exceeds `limit` within
 * `windowMs`. Never throws.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  try {
    const now = Date.now();
    const b = store.get(key);
    if (!b || now > b.resetAt) {
      if (store.size > MAX_KEYS) store.clear();
      store.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }
    b.count++;
    return b.count <= limit;
  } catch {
    return true; // fail-open
  }
}

/**
 * Convenience: rate-limit a request by IP under a named bucket. Returns true if
 * allowed. Unknown IPs are always allowed (avoids blocking everyone if the proxy
 * header is missing).
 */
export function allowRequest(req: NextRequest, bucket: string, limit: number, windowMs: number): boolean {
  const ip = getClientIp(req);
  if (ip === 'unknown') return true;
  return rateLimit(`${bucket}:${ip}`, limit, windowMs);
}
