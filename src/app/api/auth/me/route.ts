import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';

export const dynamic = 'force-dynamic';

// Returns the logged-in user's email from the shared user_session cookie, or
// null. Proves cross-domain SSO: a cookie minted by central verifies here too.
export async function GET(req: NextRequest) {
  const email = getSessionEmail(req);
  return NextResponse.json({ authenticated: !!email, email: email || null });
}
