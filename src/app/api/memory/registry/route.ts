import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
import { getSessionEmail } from '@/lib/user-auth';
import { getDbPool, type PoolLike } from '@/lib/db-pool';
import { маскаПочты } from '@/lib/log-privacy';

export const dynamic = 'force-dynamic';

/**
 * ЛИЧНЫЙ РЕЕСТР ЗАПИСЕЙ ПАМЯТИ. Только показ.
 *
 * ЗАЧЕМ. Вопрос Архитектора 18.08.2026: «почему у каждого пользователя, у
 * которого свой ключ, не вести также ЕГО ЛИЧНЫЙ реестр?» Ключ у человека
 * действительно свой, и каждая уходящая в Arweave запись шифруется отдельным
 * ключом записи (см. `record_keys` в lib/user-key.ts). Но увидеть этот перечень
 * человек не мог: механизм был, а окна в него не было. Реестр — это окно.
 *
 * ЧЕГО ЗДЕСЬ НЕТ И НЕ БУДЕТ БЕЗ ОТДЕЛЬНОГО РЕШЕНИЯ. Ни удаления, ни стирания
 * ключа записи, ни правки. Раздел 19 Конституции: на боевых сайтах разрешено
 * только добавлять и улучшать. Уничтожение ключа записи необратимо (раздел 18),
 * поэтому кнопка к нему появится лишь по прямому слову Архитектора.
 *
 * ПОЧЕМУ НЕ ОТДАЁМ САМИ ЗАПИСИ. Реестр — это опись, а не архив: номер, метка,
 * дата, адрес в блокчейне. Тексты уже отдаёт `/api/memory/archives`. Смешивать
 * их значило бы гонять мегабайты ради списка из тридцати строк.
 *
 * ПОЧЕМУ ТОЛЬКО СВОЁ. Почта берётся ИЗ СЕССИИ, а не из адресной строки. Ровно
 * на этом 12.08.2026 сгорела ручка `/api/cabinet/history` на aifa.works: она
 * брала почту из запроса и два месяца отдавала чужую переписку кому угодно.
 * Здесь параметра с почтой нет вообще — подставить чужую нечего.
 */
export async function GET(req: NextRequest) {
  const ip = clientIp(req as never);
  if (ip !== 'unknown' && !(await dbRateLimit(`memory-registry:${ip}`, 60, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // На центральном сайте здесь `getFreshSessionEmail` — он дополнительно
  // сверяет, не нажимал ли человек «выйти везде». В этом проекте такой
  // функции нет, соседние ручки кабинета (`account/delete`, `account/heir`)
  // ходят через `getSessionEmail`. Берём то же самое, чтобы поведение входа
  // в одном кабинете было единым, а не разным от ручки к ручке.
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const em = email.trim().toLowerCase();

  let pool: PoolLike;
  try {
    pool = await getDbPool();
  } catch {
    return NextResponse.json({ error: 'db_unavailable' }, { status: 503 });
  }

  try {
    // Таблицы может не быть, если человек ни разу не попал в почасовую заливку.
    // Пустой реестр — нормальное состояние, а не ошибка: у нового человека
    // записей ещё нет, и показать ему отказ было бы враньём.
    await pool.query(`CREATE TABLE IF NOT EXISTS record_keys(
      key_id      text PRIMARY KEY,
      email       text NOT NULL,
      ссылка      text,
      wrapped_key text NOT NULL,
      created_at  timestamptz DEFAULT now(),
      destroyed_at timestamptz)`);

    const ключи = await pool.query<{
      key_id: string; ссылка: string | null;
      created_at: string; destroyed_at: string | null;
    }>(
      `SELECT key_id, ссылка, created_at, destroyed_at
         FROM record_keys
        WHERE LOWER(email) = $1
        ORDER BY created_at DESC
        LIMIT 500`,
      [em],
    );

    // Куски переписки и их адреса в Arweave — чтобы человек видел не только
    // «запись есть», но и «она уже в вечности, вот её адрес».
    let куски: { chat_type: string; всего: number; в_arweave: number }[] = [];
    try {
      const r = await pool.query<{ chat_type: string; всего: string; в_arweave: string }>(
        `SELECT chat_type,
                COUNT(*)::text                                  AS всего,
                COUNT(arweave_tx)::text                         AS в_arweave
           FROM chat_memory_chunks
          WHERE LOWER(email) = $1
          GROUP BY chat_type
          ORDER BY chat_type`,
        [em],
      );
      куски = r.rows.map((x) => ({
        chat_type: x.chat_type,
        всего: Number(x.всего),
        в_arweave: Number(x.в_arweave),
      }));
    } catch {
      // Таблицы кусков может не быть — это не повод ронять весь реестр.
      куски = [];
    }

    const записи = ключи.rows.map((r) => ({
      номер: r.key_id,
      что: r.ссылка ?? null,
      создана: r.created_at,
      // Поле есть в таблице с самого начала; сейчас всегда null, потому что
      // уничтожать ключи пока некому. Показываем честно, чтобы человек видел
      // сам факт: механизм есть, но ничего не уничтожено.
      уничтожена: r.destroyed_at,
    }));

    console.info('[memory/registry] реестр показан', маскаПочты(email),
      'записей:', записи.length);

    return NextResponse.json({
      ok: true,
      всего: записи.length,
      уничтожено: записи.filter((z) => z.уничтожена).length,
      записи,
      каналы: куски,
      пояснение:
        'Каждая запись зашифрована отдельным ключом, привязанным лично к вам. ' +
        'Свой ключ вы можете забрать в разделе «Мой ключ памяти».',
    });
  } catch (e) {
    console.error('[memory/registry] не удалось собрать реестр для',
      маскаПочты(email), e);
    return NextResponse.json({ error: 'registry_unavailable' }, { status: 503 });
  } finally {
    try { await pool.end(); } catch { /* пул может быть общим и уже закрытым */ }
  }
}
