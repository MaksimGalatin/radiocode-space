import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail, сессияДействительна } from '@/lib/user-auth';
import { decryptForUserTagged } from '@/lib/user-key';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Прочитать СВОЙ вечный архив: скачиваем шифротекст с Arweave на сервере и
// расшифровываем персональным ключом пользователя (KMS). Владелец сессии
// может читать только транзакции из СВОЕГО memory_arweave_log.
export async function GET(req: NextRequest) {
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_archread = clientIp(req as never);
  if (адрес_archread !== 'unknown' && !(await dbRateLimit(`archread:${адрес_archread}`, 10, 60_000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  const tx = (req.nextUrl.searchParams.get('tx') || '').trim();
  if (!/^[A-Za-z0-9_-]{43}$/.test(tx)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    const own = await pool.query(`SELECT 1 FROM memory_arweave_log WHERE email=$1 AND tx_id=$2 LIMIT 1`, [email.trim().toLowerCase(), tx]);
    await pool.end();
    if (!own.rowCount) return NextResponse.json({ error: 'not_yours' }, { status: 403 });

    let cipher = '';
    for (const gw of ['https://arweave.net', 'https://ar-io.net']) {
      try {
        const r = await fetch(`${gw}/${tx}`, { signal: AbortSignal.timeout(20000) });
        if (r.ok) { cipher = (await r.text()).trim(); break; }
      } catch { /* следующий шлюз */ }
    }
    if (!cipher) return NextResponse.json({ error: 'gateway_unavailable' }, { status: 502 });

    // Метку `AIFA-SRV1:` (конверт личного ключа) снимаем сами — с 08.08.2026
    // центральный сайт ставит её на то, что заливает в Arweave.
    //
    // 🔴 ЧЕГО ЗДЕСЬ НЕТ: разбора СТАРОЙ схемы, где всё закрывалось одним общим
    // ключом проекта. На этом сайте нет модуля `encryption.ts`, а значит и
    // общего ключа — открыть такие сделки отсюда нечем, и так было всегда.
    // Читаются они на центральном сайте, где разбор обеих схем есть.
    const text = await decryptForUserTagged(email, cipher);
    return NextResponse.json({ ok: true, scheme: 'user-key', text: text.slice(0, 200000) });
  } catch (e) {
    console.error('[archives/read]', e);
    return NextResponse.json({ error: 'decrypt_failed' }, { status: 500 });
  }
}
