import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
import { getSessionEmail, сессияДействительна } from '@/lib/user-auth';
import { getDbPool } from '@/lib/db-pool';
import { маскаПочты } from '@/lib/log-privacy';
import {
  СРОКИ_МЕСЯЦЕВ, МИН_ТАРИФ, подготовитьСхему, похожеНаПочту, тариф,
  последняяАктивность, срокМолчания, языкПоСтране, отправитьПисьмо, письмоОбИзменении,
} from '@/lib/heir';

export const dynamic = 'force-dynamic';

/**
 * НАСЛЕДНИК ПАМЯТИ — состояние и управление.
 *
 * GET  — что сейчас назначено, когда истечёт срок, доступно ли по тарифу.
 * POST — назначить/изменить ({heirEmail, silenceMonths}) или отменить ({action:'clear'}).
 *
 * Проверка сессии — как в соседних ручках `account/` этого сайта:
 * `getSessionEmail`, то есть проверяется подпись токена.
 *
 * 🟡 РАЗНИЦА С ЦЕНТРАЛЬНЫМ САЙТОМ, О КОТОРОЙ НАДО ЗНАТЬ. На центральном сайте
 * та же ручка ходит через `getFreshSessionEmail` — там дополнительно сверяется
 * поколение сессии, и «выйти со всех устройств» действительно отзывает
 * украденный токен. На спутниках такой проверки нет ни в одной ручке `account/`
 * (функции `getFreshSessionEmail` в их `lib/user-auth.ts` попросту нет), и
 * заводить её только здесь означало бы сделать наследника строже, чем удаление
 * аккаунта по соседству. Держатель угнанного токена может вписать наследником
 * себя — но НЕ тихо: на каждое изменение владельцу уходит письмо.
 */

/** Отдаёт и текущее состояние, и всё, что нужно кабинету для показа. */
async function состояние(email: string) {
  const pool = await getDbPool();
  await подготовитьСхему(pool);

  const [строка, уровень, активность] = await Promise.all([
    pool.query<Record<string, unknown>>(
      `SELECT heir_email, silence_months, created_at, updated_at,
              warn30_at, warn7_at, handover_at, claimed_at
         FROM memory_heirs WHERE LOWER(email)=LOWER($1)`, [email]),
    тариф(pool, email),
    последняяАктивность(pool, email),
  ]);

  // 🔴 ОТМЕТКА «ВЛАДЕЛЕЦ ЗАХОДИЛ» СТАВИТСЯ ИМЕННО ЗДЕСЬ.
  // Открытая вкладка кабинета — это и есть «человек жив и пришёл», и она обязана
  // обнулять отсчёт молчания наравне с репликой в чате. Пишем только тем, у кого
  // наследник назначен: остальным строки в таблице нет и заводить её не за чем —
  // по умолчанию механизм не включён ни у кого.
  if (строка.rows[0]) {
    try {
      await pool.query(`UPDATE memory_heirs SET owner_seen_at = now() WHERE LOWER(email)=LOWER($1)`, [email]);
    } catch { /* отметка присутствия не должна ломать показ вкладки */ }
  }

  const р = строка.rows[0];
  const активенДо = р && активность.at
    ? срокМолчания(активность.at, Number(р.silence_months)).toISOString()
    : null;

  return {
    ok: true,
    // Доступно со второго уровня (Family Archive). На базовом раздел ВИДЕН, но
    // назначить нельзя — человек должен знать, что такая возможность есть.
    tier: уровень,
    minTier: МИН_ТАРИФ,
    allowed: уровень >= МИН_ТАРИФ,
    options: [...СРОКИ_МЕСЯЦЕВ],
    heir: р
      ? {
          heirEmail: String(р.heir_email),
          silenceMonths: Number(р.silence_months),
          updatedAt: р.updated_at ? String(р.updated_at) : null,
          warnedAt: р.warn30_at ? String(р.warn30_at) : null,
          handoverAt: р.handover_at ? String(р.handover_at) : null,
          claimedAt: р.claimed_at ? String(р.claimed_at) : null,
        }
      : null,
    lastSeenAt: активность.at ? активность.at.toISOString() : null,
    // Откуда взята активность — чтобы человек видел, что мы его действительно
    // замечаем, а не считаем молчанием любую паузу.
    lastSeenFrom: активность.откуда,
    handoverDueAt: активенДо,
  };
}

export async function GET(req: NextRequest) {
  const ip = clientIp(req as never);
  if (ip !== 'unknown' && !(await dbRateLimit(`account-heir:${ip}`, 120, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    return NextResponse.json(await состояние(email), {
      headers: { 'Cache-Control': 'no-store, private' },
    });
  } catch (e) {
    console.error('[account/heir] GET', маскаПочты(email), e);
    return NextResponse.json({ error: 'db_error' }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req as never);
  // Порог ниже, чем у GET: назначение наследника — редкое осознанное действие,
  // а частые POST'ы означают перебор адресов из угнанной сессии.
  if (ip !== 'unknown' && !(await dbRateLimit(`account-heir-write:${ip}`, 20, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let тело: Record<string, unknown> = {};
  try { тело = await req.json(); } catch { /* пустое тело разберём ниже */ }

  try {
    const pool = await getDbPool();
    await подготовитьСхему(pool);

    // Язык письма — по стране из учётной записи, как это делает aifa-outreach.
    let язык = языкПоСтране(null);
    try {
      const u = await pool.query<{ country: unknown }>(
        `SELECT country FROM users_auth WHERE LOWER(email)=LOWER($1)`, [email]);
      язык = языкПоСтране(u.rows[0]?.country);
    } catch { /* нет страны — пишем по умолчанию, это лучше, чем не писать */ }

    // ── отмена ──────────────────────────────────────────────────────────────
    // Отмена доступна ВСЕГДА и на любом тарифе. Забрать у человека возможность
    // отозвать наследника было бы прямо противоположно смыслу механизма: он
    // только даёт доступ и обязан слушаться владельца немедленно.
    if (тело.action === 'clear') {
      const было = await pool.query<{ heir_email: string }>(
        `DELETE FROM memory_heirs WHERE LOWER(email)=LOWER($1) RETURNING heir_email`, [email]);
      if (было.rows[0]) {
        const п = письмоОбИзменении(язык, 'отменён', String(было.rows[0].heir_email), 0);
        const итог = await отправитьПисьмо(email, п.тема, п.html);
        console.info('[account/heir] наследник отменён', маскаПочты(email), 'письмо:', итог.ok ? итог.id : итог.error);
      }
      return NextResponse.json(await состояние(email));
    }

    // ── назначение / изменение ──────────────────────────────────────────────
    const наследник = String(тело.heirEmail || '').trim().toLowerCase();
    const месяцев = Number(тело.silenceMonths);

    if (!похожеНаПочту(наследник)) {
      return NextResponse.json({ error: 'bad_heir_email' }, { status: 400 });
    }
    // Назначить наследником самого себя бессмысленно и опасно: механизм тогда
    // просто шлёт человеку его же ключ на его же адрес по истечении молчания —
    // то есть создаёт лишнюю копию секрета там, где её никто не ждёт.
    if (наследник === email.trim().toLowerCase()) {
      return NextResponse.json({ error: 'heir_is_self' }, { status: 400 });
    }
    if (!(СРОКИ_МЕСЯЦЕВ as readonly number[]).includes(месяцев)) {
      return NextResponse.json({ error: 'bad_period' }, { status: 400 });
    }

    const уровень = await тариф(pool, email);
    if (уровень < МИН_ТАРИФ) {
      return NextResponse.json({ error: 'tier_too_low', tier: уровень, minTier: МИН_ТАРИФ }, { status: 403 });
    }

    const прежний = await pool.query<{ heir_email: string }>(
      `SELECT heir_email FROM memory_heirs WHERE LOWER(email)=LOWER($1)`, [email]);

    // Новое назначение сбрасывает ВСЮ историю прошлого круга: и отметки о
    // предупреждениях, и уже выданную ссылку. Иначе смена наследника оставила бы
    // живым токен, выписанный на предыдущего.
    await pool.query(
      `INSERT INTO memory_heirs (email, heir_email, silence_months, owner_seen_at)
            VALUES (LOWER($1), $2, $3, now())
       ON CONFLICT (email) DO UPDATE
            SET heir_email = EXCLUDED.heir_email,
                silence_months = EXCLUDED.silence_months,
                updated_at = now(),
                owner_seen_at = now(),
                warn30_at = NULL, warn7_at = NULL, handover_at = NULL,
                token_hash = NULL, token_expires_at = NULL,
                claimed_at = NULL, claimed_ip = NULL`,
      [email, наследник, месяцев]);

    const п = письмоОбИзменении(язык, прежний.rows[0] ? 'изменён' : 'назначен', наследник, месяцев);
    const итог = await отправитьПисьмо(email, п.тема, п.html);
    console.info('[account/heir] наследник записан', маскаПочты(email), '→', маскаПочты(наследник),
      месяцев + 'мес, письмо:', итог.ok ? итог.id : итог.error);

    return NextResponse.json(await состояние(email));
  } catch (e) {
    console.error('[account/heir] POST', маскаПочты(email), e);
    return NextResponse.json({ error: 'db_error' }, { status: 503 });
  }
}
