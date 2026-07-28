import { NextRequest, NextResponse } from 'next/server';
import { relayAuth } from '@/lib/auth-relay';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Ограничение частоты: рассылка писем за наш счёт.
  if (!allowRequest(req as NextRequest, 'auth_send_code', 5, 3600000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  return relayAuth(req, 'send-code');
}
