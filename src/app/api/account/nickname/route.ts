import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail, сессияДействительна } from '@/lib/user-auth';
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

  const email = (await сессияДействительна(req) || '').trim().toLowerCase();
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
