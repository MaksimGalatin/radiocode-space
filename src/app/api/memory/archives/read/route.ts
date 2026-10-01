import { NextRequest, NextResponse } from 'next/server';
import { getFreshSessionEmail } from '@/lib/user-auth';
import { decryptForUserTagged, помеченЛичнымКлючом } from '@/lib/user-key';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

/**
 * Предел времени ответа — общий для всех ручек разговора
 * на четырёх сайтах (10.09.2026).
 *
 * Здесь его не было вовсе, и работало умолчание площадки —
 * короче, чем занимает ответ с полной памятью (замер: 29–42
 * секунды). Человек получал общую ошибку вместо ответа.
 *
 * Предел — потолок, а не расход: ответ, пришедший за
 * секунду, стоит секунду.
 */
export const maxDuration = 300;

export const dynamic = 'force-dynamic';

// Прочитать СВОЙ вечный архив: скачиваем шифротекст с Arweave на сервере и
// расшифровываем персональным ключом пользователя (KMS). Владелец сессии
// может читать только транзакции из СВОЕГО memory_arweave_log.
export async function GET(req: NextRequest) {
  const email = await getFreshSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе, а не в памяти процесса: счётчик в памяти обнуляется при
  // каждой выкладке и у каждого экземпляра свой, поэтому объявленный
  // предел на деле мягче во столько раз, сколько экземпляров поднято.
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
    // ЗАПАСНЫЕ ШЛЮЗЫ. Один шлюз — одна точка отказа для всего уже залитого.
    // Порядок не выдуман, а измерен 17.08.2026 на четырёх настоящих транзакциях
    // Мозга (проверка _sync/проверки/живость_шлюзов.py):
    //     arweave.net     4 из 4, среднее 1165 мс
    //     vilenarios.com  4 из 4, среднее 1164 мс
    //     frostor.xyz     4 из 4, среднее 4698 мс
    //     permagate.io    3 из 4, среднее 4290 мс
    // Отсюда порядок: первыми два быстрых, медленные — запасными.
    //
    // Хост ar-io.net, стоявший здесь раньше, УДАЛЁН: его имя не разрешается
    // даже внешним резолвером Cloudflare — SERVFAIL. Запасной шлюз, который не
    // может сработать, опаснее отсутствующего: на него надеются, и обнаружится
    // это в тот единственный день, когда упадёт основной.
    //
    // ПЕРВЫЙ ЗАМЕР БЫЛ НЕВЕРЕН, и это стоит помнить: проверка на urllib
    // показывала «arweave.net 0 из 4», потому что у Python свой набор корневых
    // сертификатов и он говорил «certificate has expired». По тем числам
    // рабочий шлюз выкинули бы из кода. Мерить надо тем же набором, каким
    // пользуется прод, — системным.
    //
    // ВРЕМЯ НА ШЛЮЗ — 8 с, А НЕ 20. Четыре шлюза по 20 секунд дают до 80 секунд
    // на один запрос, а функция столько не живёт: человек увидит обрыв вместо
    // ответа. Восемь секунд на шлюз держат худший случай в 32 секундах, при том
    // что успешное чтение с arweave.net занимало 1,4 секунды.
    for (const gw of ['https://arweave.net', 'https://vilenarios.com', 'https://frostor.xyz', 'https://permagate.io']) {
      try {
        const r = await fetch(`${gw}/${tx}`, { signal: AbortSignal.timeout(8000) });
        if (r.ok) { cipher = (await r.text()).trim(); break; }
      } catch { /* следующий шлюз */ }
    }
    if (!cipher) return NextResponse.json({ error: 'gateway_unavailable' }, { status: 502 });

    const { text, схема } = await расшифроватьЛюбуюСхему(email, cipher);
    return NextResponse.json({ ok: true, scheme: схема, text: text.slice(0, 200000) });
  } catch (e) {
    console.error('[archives/read]', e);
    return NextResponse.json({ error: 'decrypt_failed' }, { status: 500 });
  }
}

/**
 * Открывает сделку любой из двух схем.
 *
 * ПОЧЕМУ две. До 08.08.2026 всё уходило в Arweave под ОДНИМ ключом проекта, с
 * 08.08.2026 — под личным ключом каждого. Сеть неизменяема: переложить старые
 * сделки на новые ключи невозможно, они навсегда открываются только общим
 * ключом. Значит читалка обязана уметь оба вида, иначе вся память до этой даты
 * станет для человека нечитаемой — при том что она на месте.
 *
 * ПОРЯДОК. Метка `AIFA-SRV1:` однозначна — при ней пробуем только личный ключ и
 * при неудаче честно падаем: тихо перебирать ключи дальше значит выдавать
 * поломку за отсутствие данных. Без метки начинаем с личного ключа (новые
 * сделки `chat_memory` метки внутри не несут, она у них в теге) и только затем
 * пробуем общий. Перебор безопасен: AES-GCM с чужим ключом не «расшифровывает
 * мусор», а не проходит проверку подлинности.
 */
async function расшифроватьЛюбуюСхему(
  email: string,
  cipher: string
): Promise<{ text: string; схема: 'user-key' | 'project-key' }> {
  if (помеченЛичнымКлючом(cipher)) {
    return { text: await decryptForUserTagged(email, cipher), схема: 'user-key' };
  }
  try {
    return { text: await decryptForUserTagged(email, cipher), схема: 'user-key' };
  } catch (личный) {
    try {
      const { decryptText } = await import('@/lib/encryption');
      const text = await decryptText(cipher);
      console.log('[archives/read] сделка старой схемы — открыта общим ключом проекта');
      return { text, схема: 'project-key' };
    } catch (общий) {
      // Обе причины в журнал: иначе разбор упрётся в «не расшифровалось» без
      // подсказки, какой именно ключ отсутствует или испорчен.
      console.error('[archives/read] не открылась ни одна схема:',
        String((личный as Error)?.message).slice(0, 120), '|',
        String((общий as Error)?.message).slice(0, 120));
      throw личный;
    }
  }
}
