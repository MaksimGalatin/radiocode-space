/**
 * Shared, cross-instance rate limiter backed by Postgres (SUBMISSIONS_DB_URL).
 *
 * Unlike the in-memory limiter (per serverless instance), this is GLOBAL — the
 * same counter is enforced across every instance and every one of the three
 * sites, because they share one database. Fixed-window, atomic upsert.
 * Fail-OPEN: any DB error returns "allowed" so the limiter can never take the
 * site down.
 */
import type { NextRequest } from 'next/server';

export function clientIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

/** Returns true if allowed, false if the key exceeded `limit` within `windowMs`. */
export async function dbRateLimit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return true; // no DB configured → don't block
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const now = Date.now();
    const resetAt = now + windowMs;
    const r = await pool.query(
      `INSERT INTO rate_limits(k, count, reset_at) VALUES($1, 1, $2)
       ON CONFLICT (k) DO UPDATE SET
         count = CASE WHEN rate_limits.reset_at < $3 THEN 1 ELSE rate_limits.count + 1 END,
         reset_at = CASE WHEN rate_limits.reset_at < $3 THEN $2 ELSE rate_limits.reset_at END
       RETURNING count`,
      [key, resetAt, now]
    );
    await pool.end();
    return Number(r.rows[0].count) <= limit;
  } catch (e) {
    console.error('[dbRateLimit]', e);
    return true; // fail-open
  }
}

/** Convenience: limit an auth action by BOTH ip and email. Returns true if allowed. */
export async function limitAuth(
  req: NextRequest, bucket: string, email: string,
  ipLimit: number, emailLimit: number, windowMs: number
): Promise<boolean> {
  const ip = clientIp(req);
  const okIp = ip === 'unknown' ? true : await dbRateLimit(`${bucket}:ip:${ip}`, ipLimit, windowMs);
  if (!okIp) return false;
  const em = (email || '').trim().toLowerCase();
  const okEmail = em ? await dbRateLimit(`${bucket}:em:${em}`, emailLimit, windowMs) : true;
  return okEmail;
}

/** Simple honeypot check: reject if a hidden field was filled (bots fill everything). */
export function honeypotTriggered(body: any): boolean {
  const v = body && (body.website2 ?? body.hp ?? body.company_url);
  return typeof v === 'string' && v.trim().length > 0;
}
