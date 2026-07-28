import { NextRequest, NextResponse } from 'next/server';
import { relayAuth } from '@/lib/auth-relay';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Ограничение частоты: ПЕРЕБОР КОДА — на этом уже была дыра угона.
  if (!allowRequest(req as NextRequest, 'auth_verify_code', 10, 600000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  return relayAuth(req, 'verify-code');
}
