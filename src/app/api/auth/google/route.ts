import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE, signUserToken, userCookieOptions } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

const CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
  '';

/**
 * Real "Sign in with Google". The client sends the Google ID token (JWT
 * `credential` from Google Identity Services). We verify it against Google's
 * tokeninfo endpoint, check the audience == our OAuth client ID and that the
 * email is verified, then mint the standard `user_session` HMAC cookie — the
 * same cookie the email/password flow issues, valid across all three sites.
 */
export async function POST(req: NextRequest) {
  // Ограничение частоты: наплыв входов.
  if (!allowRequest(req as NextRequest, 'auth_google', 20, 600000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  let credential = '';
  try { const b = await req.json(); credential = (b && b.credential) || ''; } catch { /* noop */ }
  if (!credential) return NextResponse.json({ error: 'No credential' }, { status: 400 });

  let info: any;
  try {
    const r = await fetch(
      'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(credential),
      { cache: 'no-store' }
    );
    if (!r.ok) return NextResponse.json({ error: 'Invalid Google token' }, { status: 401 });
    info = await r.json();
  } catch {
    return NextResponse.json({ error: 'Google verification unavailable' }, { status: 502 });
  }

  if (!info || !info.email) return NextResponse.json({ error: 'No email in token' }, { status: 401 });
  if (CLIENT_ID && info.aud !== CLIENT_ID) return NextResponse.json({ error: 'Wrong audience' }, { status: 401 });
  const verified = info.email_verified === true || info.email_verified === 'true';
  if (!verified) return NextResponse.json({ error: 'Email not verified' }, { status: 401 });
  if (info.exp && Date.now() / 1000 > Number(info.exp)) return NextResponse.json({ error: 'Token expired' }, { status: 401 });

  const email = String(info.email).trim().toLowerCase();
  const res = NextResponse.json({ success: true, email });
  res.cookies.set(USER_COOKIE, signUserToken(email), userCookieOptions());
  return res;
}
