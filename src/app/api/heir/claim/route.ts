import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
import { getDbPool } from '@/lib/db-pool';
import { getUserKeyB64 } from '@/lib/user-key';
import { маскаПочты } from '@/lib/log-privacy';
import { подготовитьСхему, отпечатокТокена, отпечаткиСовпали, ОКНО_ПОВТОРА_МИНУТ, экран } from '@/lib/heir';

export const dynamic = 'force-dynamic';

/**
 * ПОЛУЧЕНИЕ АРХИВА НАСЛЕДНИКОМ.
 *
 * Сюда приходит человек по ссылке из письма — не вошедший в систему и, скорее
 * всего, вообще не имеющий у нас учётной записи. Поэтому единственный пропуск
 * здесь — сам токен из ссылки.
 *
 * ПОЧЕМУ ОТВЕТ — СТРАНИЦА, А НЕ JSON. По ссылке из письма человек кликает в
 * почтовом клиенте, и на той стороне обычный браузер. JSON-простыня с ключом в
 * поле объекта — это способ гарантировать, что ключ не сохранят. Страница
 * говорит словами, что это и что с этим делать.
 *
 * ЧТО ЗДЕСЬ ВЫДАЁТСЯ. Ключ вечной памяти владельца и список его записей в
 * Arweave. Ничего больше: ни пароля, ни возможности войти в учётную запись, ни
 * права что-либо изменить или удалить. Владелец, если он жив и просто был
 * занят, не теряет ничего — у него остаётся тот же ключ и та же память.
 */

/** Страница-ответ. Без внешних файлов: письмо могли открыть где угодно. */
function страница(заголовок: string, тело: string, статус = 200): NextResponse {
  const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${экран(заголовок)} — CODE Eternal</title></head>
<body style="margin:0;background:#030712;color:#e5e7eb;font-family:-apple-system,Segoe UI,sans-serif;line-height:1.6">
<div style="max-width:720px;margin:0 auto;padding:32px 20px">
  <h1 style="color:#22D3EE;font-size:22px;margin:0 0 20px">${экран(заголовок)}</h1>
  ${тело}
  <p style="margin-top:32px;color:#6b7280;font-size:13px">CODE Eternal — codeofdigitaleternity.com</p>
</div></body></html>`;
  return new NextResponse(html, {
    status: статус,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // Страница несёт ключ: ни браузер, ни посредники не должны положить её на
      // диск и показать следующему, кто сядет за этот компьютер.
      'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      'Referrer-Policy': 'no-referrer',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

export async function GET(req: NextRequest) {
  const ip = clientIp(req as never);
  // Токен — 32 случайных байта, перебрать его нельзя, но ограничитель здесь
  // всё равно нужен: он не даёт превратить эту ручку в бесплатный способ
  // нагружать базу и почту.
  if (ip !== 'unknown' && !(await dbRateLimit(`heir-claim:${ip}`, 30, 60_000))) {
    return страница('Слишком много запросов', '<p>Попробуй ещё раз через минуту.</p>', 429);
  }

  const токен = String(req.nextUrl.searchParams.get('t') || '');
  if (токен.length < 20) {
    return страница('Ссылка не подходит', '<p>В ссылке нет ключа доступа. Открой её из письма целиком, не обрезая адрес.</p>', 400);
  }

  try {
    const pool = await getDbPool();
    await подготовитьСхему(pool);

    const отпечаток = отпечатокТокена(токен);
    const r = await pool.query<Record<string, unknown>>(
      `SELECT email, heir_email, token_hash, token_expires_at, claimed_at
         FROM memory_heirs WHERE token_hash = $1`, [отпечаток]);
    const с = r.rows[0];

    // Сверяем ещё раз за постоянное время: сравнение в SQL — по индексу, и
    // теоретически различимо по времени ответа. Дешевле проверить, чем спорить.
    if (!с || !отпечаткиСовпали(String(с.token_hash || ''), отпечаток)) {
      return страница('Ссылка недействительна',
        '<p>Эта ссылка не найдена. Возможно, владелец вернулся и отменил передачу — тогда так и должно быть: механизм слушается владельца в любой момент.</p>', 404);
    }

    const годенДо = с.token_expires_at ? new Date(String(с.token_expires_at)).getTime() : 0;
    if (!годенДо || годенДо < Date.now()) {
      return страница('Срок ссылки истёк',
        '<p>У этой ссылки закончился срок годности. Напиши нам на contact@codeofdigitaleternity.com — разберёмся вручную.</p>', 410);
    }

    // Одноразовость с получасовым окном — см. ОКНО_ПОВТОРА_МИНУТ в lib/heir.ts:
    // предпросмотр ссылки почтовым клиентом не должен сжигать единственный шанс,
    // но и жить вечно ссылка не может.
    const открыта = с.claimed_at ? new Date(String(с.claimed_at)).getTime() : 0;
    const повтор = открыта > 0;
    if (повтор && Date.now() - открыта > ОКНО_ПОВТОРА_МИНУТ * 60_000) {
      return страница('Ссылка уже использована',
        `<p>Эта ссылка одноразовая и была открыта ${экран(new Date(открыта).toUTCString())}.</p>
         <p>Если ключ не сохранился — напиши на contact@codeofdigitaleternity.com.</p>`, 410);
    }

    const владелец = String(с.email);

    // Ключ достаём ДО того, как отметим ссылку использованной: если ключ сейчас
    // недоступен, сжечь единственную попытку было бы худшим из исходов.
    let ключ: string;
    try {
      ключ = await getUserKeyB64(владелец);
    } catch (e) {
      console.error('[heir/claim] ключ недоступен для', маскаПочты(владелец), e);
      return страница('Сейчас не получилось',
        '<p>Ключ временно недоступен. Ссылка НЕ потрачена — открой её ещё раз через несколько минут.</p>', 503);
    }

    let архивы: Array<{ tx: string; тип: string; когда: string }> = [];
    try {
      const a = await pool.query<Record<string, unknown>>(
        `SELECT * FROM memory_arweave_log WHERE LOWER(email)=LOWER($1)`, [владелец]);
      архивы = a.rows
        .map((x) => ({
          tx: String(x.tx_id || ''),
          тип: String(x.chat_type || ''),
          когда: x.created_at ? String(x.created_at).slice(0, 10) : '',
        }))
        .filter((x) => x.tx)
        .sort((p, q) => q.когда.localeCompare(p.когда));
    } catch { /* журнала может не быть — ключ важнее списка */ }

    // Фиксируем открытие. Только первое: повторный заход в течение получаса —
    // тот же человек, и переписывать отметку значило бы растягивать окно.
    if (!повтор) {
      await pool.query(
        `UPDATE memory_heirs SET claimed_at = now(), claimed_ip = $2 WHERE email = $1`,
        [владелец, ip === 'unknown' ? null : ip]);
      console.info('[heir/claim] архив выдан наследнику', маскаПочты(String(с.heir_email)),
        'владельца', маскаПочты(владелец));
    }

    const список = архивы.length
      ? `<ul style="padding-left:20px">${архивы.slice(0, 300).map((a) =>
          `<li style="margin:4px 0"><a href="https://arweave.net/${экран(a.tx)}" style="color:#22D3EE">${экран(a.tx)}</a>` +
          ` <span style="color:#6b7280">${экран(a.тип)} ${экран(a.когда)}</span></li>`).join('')}</ul>`
      : '<p style="color:#9ca3af">Записей в Arweave пока нет. Ключ сохрани всё равно: он понадобится для всего, что будет опубликовано позже.</p>';

    return страница('Архив памяти передан тебе', `
<p>Владелец: <b>${экран(владелец)}</b>. Ты указан наследником его памяти.</p>

<h2 style="color:#22D3EE;font-size:17px;margin:28px 0 8px">1. Ключ вечной памяти — сохрани прямо сейчас</h2>
<p style="color:#9ca3af;font-size:14px">Записи в Arweave вечные и публичные, но читаются только этим ключом. Ни у кого другого его нет — включая нас, если мы однажды исчезнем.</p>
<div style="background:#0B0F1A;border:1px solid rgba(42,42,58,0.6);border-radius:10px;padding:14px;margin:12px 0">
  <code style="color:#22D3EE;word-break:break-all;user-select:all;font-size:14px">${экран(ключ)}</code>
</div>
<p style="color:#9ca3af;font-size:14px">AES-256-GCM · PBKDF2-HMAC-SHA256, 100000 итераций, ключ 32 байта, соль на запись · конверт: base64( salt[16] | iv[12] | tag[16] | ciphertext )</p>

<h2 style="color:#22D3EE;font-size:17px;margin:28px 0 8px">2. Записи в Arweave (${архивы.length})</h2>
${список}

<h2 style="color:#22D3EE;font-size:17px;margin:28px 0 8px">Что здесь НЕ передаётся</h2>
<p>Пароль владельца и вход в его учётную запись. Их не получает никто и никогда — ни ты, ни мы. Всё, что даёт эта страница, — возможность ПРОЧИТАТЬ уже написанное.</p>
<p style="color:#9ca3af;font-size:14px">Мы не знаем и не проверяем, что случилось с человеком: механизм сработал только потому, что он долго не заходил и дважды не ответил на наши письма. Если он вернётся, он останется полным хозяином своей памяти — у него ничего не отобрано.</p>
<p style="color:#9ca3af;font-size:14px">Ссылка одноразовая. Эта страница больше не откроется — сохрани ключ до того, как закроешь вкладку.</p>`);
  } catch (e) {
    console.error('[heir/claim]', e);
    return страница('Сейчас не получилось',
      '<p>Техническая ошибка. Ссылка не потрачена — попробуй ещё раз позже.</p>', 503);
  }
}
