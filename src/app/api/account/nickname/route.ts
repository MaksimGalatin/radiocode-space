import { NextRequest, NextResponse } from 'next/server';
import { getFreshSessionEmail } from '@/lib/user-auth';
import { getPool } from '@/lib/economy';
import { validateNickname, nicknameErrorMessage } from '@/lib/nickname';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// POST /api/account/nickname { nickname, locale }
// Устанавливает никнейм залогиненного пользователя (session-гейт по httpOnly-куке).
// Нужен прежде всего для Google-входа, который обходит шаг set-password.
// Уникальность глобальная: уникальный индекс + SELECT-проверка занятости.
export async function POST(req: NextRequest) {
  // Ограничение частоты: перебор занятых имён.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_account_nickname = clientIp(req as never);
  if (адрес_account_nickname !== 'unknown' && !(await dbRateLimit(`account_nickname:${адрес_account_nickname}`, 10, 600000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const email = (await getFreshSessionEmail(req) || '').trim().toLowerCase();
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let nickname = '';
  let locale = 'en';
  try {
    const b = await req.json();
    nickname = String(b?.nickname || '');
    locale = String(b?.locale || 'en');
  } catch {}

  const check = validateNickname(nickname);
  if (!check.ok) {
    return NextResponse.json(
      { error: nicknameErrorMessage(check.reason, locale), code: check.reason },
      { status: 400 }
    );
  }
  const nick = check.nickname;

  // Таблица users_auth живёт в ДВУХ базах: кабинета (SUBMISSIONS_DB_URL) и входа (DATABASE_URL_VECTOR).
  // Регистрация пишет в обе (lib/db.ts, dbSaveUser на центральном). Здесь — то же для ника (30.09.2026):
  // раньше смена ника на всех четырёх сайтах писала только в базу кабинета.
  const адресБазыВхода = process.env.DATABASE_URL_VECTOR || process.env.VECTOR_DATABASE_URL || '';

  // Ник, закреплённый навсегда за другим человеком, занят даже если его учётной записи больше нет: имя
  // стоит в паспорте, а паспорт в блокчейне. Запрос тот же, что никЗанятНавсегда в lib/db.ts центрального.
  if (адресБазыВхода) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const r = await neon(адресБазыВхода)`SELECT email FROM nicknames_reserved WHERE nickname_lower = ${nick.toLowerCase()}`;
      const строка = (r as Array<{ email?: string }>)[0];
      if (строка && String(строка.email).toLowerCase() !== email) {
        return NextResponse.json({ error: nicknameErrorMessage('taken', locale), code: 'taken' }, { status: 409 });
      }
    } catch { /* таблицы ещё нет — значит никто не закреплён */ }
  }

  try {
    const pool = await getPool();
    try {
      // Таблица общая для трёх сайтов (Neon). IF NOT EXISTS — идемпотентно.
      try {
        await pool.query(`CREATE TABLE IF NOT EXISTS users_auth (
          email      text PRIMARY KEY,
          password   text,
          nickname   text,
          role       text DEFAULT 'user',
          created_at timestamptz DEFAULT now()
        )`);
      } catch {}

      // Глобальная уникальность на уровне БД. Может не создаться при
      // существующих дублях — тогда занятость ловит SELECT-проверка ниже.
      try {
        await pool.query(
          `CREATE UNIQUE INDEX IF NOT EXISTS users_nickname_unique
           ON users_auth (LOWER(nickname)) WHERE nickname IS NOT NULL`
        );
      } catch (idxErr) {
        console.warn('[account/nickname] unique index not created (duplicates?):', idxErr);
      }

      const taken = await pool.query(
        `SELECT 1 FROM users_auth WHERE LOWER(nickname) = $1 AND LOWER(email) <> $2 LIMIT 1`,
        [nick, email]
      );
      if (taken.rows.length > 0) {
        return NextResponse.json(
          { error: nicknameErrorMessage('taken', locale), code: 'taken' },
          { status: 409 }
        );
      }

      await pool.query(
        `INSERT INTO users_auth (email, nickname, role) VALUES ($1, $2, 'user')
         ON CONFLICT (email) DO UPDATE SET nickname = EXCLUDED.nickname`,
        [email, nick]
      );
      // И то же в базу ВХОДА. Неудача здесь не отменяет смену ника (кабинет записан), но идёт в журнал.
      if (адресБазыВхода) {
        try {
          const { neon } = await import('@neondatabase/serverless');
          await neon(адресБазыВхода)`INSERT INTO users_auth (email, nickname, role) VALUES (${email}, ${nick}, 'user')
            ON CONFLICT (email) DO UPDATE SET nickname = EXCLUDED.nickname`;
        } catch (e) {
          console.error('[account/nickname] ник записан в кабинет, но НЕ в базу входа:', String(e).slice(0, 200));
        }
      }
      return NextResponse.json({ success: true, nickname: nick });
    } finally {
      await pool.end().catch(() => {});
    }
  } catch (err: any) {
    // 23505 — гонка на уникальном индексе: кто-то занял ник между SELECT и INSERT
    if (err && err.code === '23505') {
      return NextResponse.json(
        { error: nicknameErrorMessage('taken', locale), code: 'taken' },
        { status: 409 }
      );
    }
    console.error('[account/nickname] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
