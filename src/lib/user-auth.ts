/**
 * Per-user session auth for aifa.digital. IDENTICAL HMAC scheme + secret to the
 * central site, so a `user_session` cookie minted by central is valid here too
 * (one login → all three sites). Set AIFA_SESSION_SECRET identically everywhere.
 *
 * SECURITY: fail-closed. If no secret is configured, tokens can neither be
 * signed nor verified — never fall back to a hardcoded value.
 */

import crypto from 'crypto';
import type { NextRequest } from 'next/server';

const SECRET_KEY =
  process.env.AIFA_SESSION_SECRET ||
  process.env.NOWPAYMENTS_IPN_SECRET ||
  '';

export const USER_COOKIE = 'user_session';

export function signUserToken(email: string, ttlMs = 30 * 24 * 60 * 60 * 1000): string {
  if (!SECRET_KEY) throw new Error('AIFA_SESSION_SECRET is not configured');
  const e = (email || '').trim().toLowerCase();
  const exp = Date.now() + ttlMs;
  const data = `${e}:${exp}`;
  const hmac = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
  return `${data}:${hmac}`;
}

export function verifyUserToken(token: string | undefined | null): string | null {
  try {
    if (!token || !SECRET_KEY) return null;
    const idx = token.lastIndexOf(':');
    if (idx < 0) return null;
    const hmac = token.slice(idx + 1);
    const data = token.slice(0, idx);
    const sep = data.lastIndexOf(':');
    if (sep < 0) return null;
    const email = data.slice(0, sep);
    const expStr = data.slice(sep + 1);
    if (!/^\d+$/.test(expStr) || Date.now() > parseInt(expStr, 10)) return null;
    const expected = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('hex');
    if (hmac.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expected))) return null;
    return email;
  } catch {
    return null;
  }
}

export function getSessionEmail(req: NextRequest): string | null {
  return verifyUserToken(req.cookies.get(USER_COOKIE)?.value);
}

export function userCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  };
}
