import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
import { сессияДействительна } from '@/lib/user-auth';
import { якорьПамяти } from '@/lib/user-key';
import { маскаПочты } from '@/lib/log-privacy';

export const dynamic = 'force-dynamic';

/**
 * Якорь вечной памяти в Solana — что из памяти ЭТОГО человека закреплено (30.09.2026).
 *
 * Отдаём только данные для проверки: номер сделки Arweave, отпечаток, путь до корня, корень и номер
 * транзакции Solana. Ключей здесь нет и быть не должно: проверка целостности не требует расшифровки.
 * Сама проверка идёт в браузере человека, мимо нас — запись он берёт из Arweave, транзакцию из Solana.
 * Эта ручка лишь подсказывает, ГДЕ искать; соврать она не может, потому что корень сверяется с цепью.
 *
 * Вход обязателен: связка «почта ↔ номера сделок» — личное, хоть сами сделки и публичны.
 */
export async function GET(req: NextRequest) {
  const ip = clientIp(req as never);
  if (ip !== 'unknown' && !(await dbRateLimit(`memory-anchor:${ip}`, 30, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const items = await якорьПамяти(email);
    return NextResponse.json({ items }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) {
    console.error('[memory/anchor] не удалось прочитать якорь для', маскаПочты(email), e);
    return NextResponse.json({ error: 'anchor_unavailable' }, { status: 503 });
  }
}
