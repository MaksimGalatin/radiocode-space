import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
import { getFreshSessionEmail } from '@/lib/user-auth';

export const dynamic = 'force-dynamic';

// Returns the logged-in user's email from the shared user_session cookie, or
// null. Proves cross-domain SSO: a cookie minted by central verifies here too.
export async function GET(req: NextRequest) {
  const ip_get = clientIp(req as never);
  if (ip_get !== 'unknown' && !(await dbRateLimit(`auth-me:${ip_get}`, 120, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const email = await getFreshSessionEmail(req);
  return NextResponse.json({ authenticated: !!email, email: email || null });
}
