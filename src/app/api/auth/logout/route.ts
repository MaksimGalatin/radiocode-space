import { NextRequest, NextResponse } from 'next/server';
import { USER_COOKIE } from '@/lib/user-auth';

export const dynamic = 'force-dynamic';

export async function POST(_req: NextRequest) {
  const res = NextResponse.json({ success: true });
  res.cookies.set(USER_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
