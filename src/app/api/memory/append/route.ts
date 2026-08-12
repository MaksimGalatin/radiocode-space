import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { appendVerbatim } from '@/lib/memory-write';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

/** Какой ответ HTTP соответствует причине отказа. */
const КОД: Record<string, number> = { empty: 400, no_db: 500, prev_unreadable: 500, key_error: 500, db_error: 500 };

// Append one exchange (user + assistant) to the user's memory, encrypted with
// their server-managed key. Called by the cabinet after each AIfa turn.
//
// Сама запись живёт в `@/lib/memory-write` — тем же кодом её делает сервер
// внутри /api/aifa-chat, чтобы переписка сохранялась даже когда браузер этот
// запрос не отправил (закрыл вкладку, моргнула сеть). Здесь остались только
// вещи, свойственные ручке: проверка сессии, счёт обращений и коды ответов.
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_memappend = clientIp(req as never);
  if (адрес_memappend !== 'unknown' && !(await dbRateLimit(`memappend:${адрес_memappend}`, 60, 60_000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const r = await appendVerbatim(
    email,
    String(b?.chatType || 'terminal'),
    String(b?.userMessage || ''),
    String(b?.assistantMessage || ''),
    String(b?.at || ''),
  );
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: КОД[r.error] ?? 500 });
  return NextResponse.json({ ok: true });
}
