import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

// Returns the logged-in user's email from the shared user_session cookie, or
// null. Proves cross-domain SSO: a cookie minted by central verifies here too.
export async function GET(req: NextRequest) {
  // Ограничение частоты: частый опрос состояния.
  if (!allowRequest(req as NextRequest, 'auth_me', 120, 60000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = getSessionEmail(req);
  return NextResponse.json({ authenticated: !!email, email: email || null });
}
