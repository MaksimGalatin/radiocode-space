import { NextRequest, NextResponse } from 'next/server';
import { getFreshSessionEmail } from '@/lib/user-auth';
import { allowRequest } from '@/lib/rate-limit';
import { общийЛимитЗапроса } from '@/lib/rate-limit-db';
import { getPool } from '@/lib/economy';

export const dynamic = 'force-dynamic';

/**
 * Открытие партии. Без этого шага победа не засчитывается.
 *
 * ЗАЧЕМ. Раньше `/api/games/win` верил браузеру на слово: пришёл запрос
 * «я выиграл в шахматы» — начислялось 30 GALATIN. Защита была (вход, ограничение
 * частоты, минимальное время между победами, пять награждаемых побед в сутки на
 * игру), поэтому мгновенно опустошить казну было нельзя. Но начислить себе токен,
 * ни разу не открыв игру, было можно — достаточно строки в консоли браузера.
 *
 * Теперь так: партия открывается ЗДЕСЬ, сервер запоминает время и выдаёт метку.
 * Победа принимается только с этой меткой, только один раз и не раньше, чем
 * пройдёт минимальное время на партию. Это не доказывает, что человек играл
 * честно — доказать это можно лишь перенеся сами игры на сервер, — но убирает
 * начисление без игры вовсе и повтор одной партии много раз.
 *
 * Метку намеренно не кладём в тело ответа как «секрет»: она не секрет, а
 * одноразовый ключ конкретной партии. Ценность в том, что она выдана сервером,
 * привязана к почте и игре и живёт в базе.
 */

const ИГРЫ = ['ttt', 'checkers', 'chess', 'backgammon', 'tetris'];

/** Партия старше этого срока считается брошенной и к зачёту не принимается. */
const ЖИЗНЬ_ЧАСОВ = 6;

let таблицаГотова = false;

async function подготовить(pool: any) {
  if (таблицаГотова) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS game_sessions (
      token      text PRIMARY KEY,
      email      text NOT NULL,
      game       text NOT NULL,
      started_at timestamptz NOT NULL DEFAULT now(),
      used_at    timestamptz
    )`);
  await pool.query(`CREATE INDEX IF NOT EXISTS game_sessions_email_idx ON game_sessions (email, game, started_at DESC)`);
  таблицаГотова = true;
}

export async function POST(req: NextRequest) {
  const email = await getFreshSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: any = {};
  try { body = await req.json(); } catch { /* пустое тело — ниже отсеется */ }
  const game = String(body?.game || '').trim().toLowerCase();
  if (!ИГРЫ.includes(game)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });

  // Открывать партии можно часто — человек переключает игры и жмёт «новая
  // игра», — но не бесконечно: это запись в базу.
  if (!allowRequest(req, 'gstart', 60, 60_000) || !(await общийЛимитЗапроса(req, 'gstart', 60, 60_000))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let pool: any = null;
  try {
    pool = await getPool();
    await подготовить(pool);

    const token = crypto.randomUUID();
    await pool.query(
      `INSERT INTO game_sessions (token, email, game) VALUES ($1, $2, $3)`,
      [token, email, game]
    );

    // Прибираем за собой: брошенные партии старше суток не нужны никому.
    await pool.query(
      `DELETE FROM game_sessions WHERE started_at < now() - interval '24 hours'`
    );

    return NextResponse.json({ ok: true, token, game, ttlHours: ЖИЗНЬ_ЧАСОВ });
  } catch (e) {
    console.error('[games/start]', e);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  } finally {
    try { await pool?.end(); } catch { /* соединение уже закрыто */ }
  }
}
