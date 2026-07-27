import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { signSession, ADMIN_COOKIE } from '@/lib/admin-session';
import { allowRequest } from '@/lib/rate-limit';
import { getPool } from '@/lib/economy';
import { auditLog } from '@/lib/admin-guard';

export const dynamic = 'force-dynamic';
const OWNER = 'codeofdigitaleternity@gmail.com';

export async function POST(req: NextRequest) {
  // Brute-force shield: 5 attempts / 15 min per IP.
  if (!allowRequest(req, 'admin_enter', 5, 900000)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }
  const { password } = await req.json().catch(() => ({}));
  const expected = process.env.ADMIN_PASSWORD || '';
  const given = String(password || '');
  let ok = !!expected && given.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  // Fallback: central is the auth hub — it also accepts the owner's account
  // password from users_auth. Relay the check there so one self-set password
  // opens the admin panel on every site; the cookie is signed locally (shared secret).
  if (!ok && given) {
    try {
      const r = await fetch('https://www.codeofdigitaleternity.com/api/admin/enter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: given }), signal: AbortSignal.timeout(15000),
      });
      ok = r.ok;
    } catch { /* keep ok=false */ }
  }
  if (!ok) {
    try { const pool = await getPool(); await auditLog(pool, 'unknown', 'admin_login_failed', {}, req); await pool.end(); } catch {}
    return NextResponse.json({ ok: false, error: 'wrong_password' }, { status: 401 });
  }
  try { const pool = await getPool(); await auditLog(pool, OWNER, 'admin_login', {}, req); await pool.end(); } catch {}
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, signSession(OWNER), { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 30 * 24 * 60 * 60 });
  return res;
}
