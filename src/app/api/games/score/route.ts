import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { getPool, weekKeyUTC, todayUTC, bumpQuest } from '@/lib/economy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Score-based games (tetris): record final lines/score, keep personal best for
// the leaderboard. Wins/GALATIN keep flowing through /api/games/win milestones.
const SCORE_GAMES = new Set(['tetris']);

export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_gscore = clientIp(req as never);
  if (адрес_gscore !== 'unknown' && !(await dbRateLimit(`gscore:${адрес_gscore}`, 12, 60_000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  let b: any = {}; try { b = await req.json(); } catch {}
  const game = String(b?.game || '').trim().toLowerCase();
  const lines = Math.floor(Number(b?.lines));
  const score = Math.floor(Number(b?.score));
  if (!SCORE_GAMES.has(game)) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  // sanity: непротиворечивые границы (антифарм; клиенту всё равно доверяем не больше, чем в /win)
  if (!Number.isFinite(lines) || !Number.isFinite(score) || lines < 0 || score < 0 ||
      lines > 2000 || score > 2_000_000 || score > lines * 800 + 4000) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }
  try {
    const pool = await getPool();
    await pool.query(`ALTER TABLE game_scores ADD COLUMN IF NOT EXISTS best_lines INT DEFAULT 0`);
    await pool.query(`ALTER TABLE game_scores ADD COLUMN IF NOT EXISTS best_score INT DEFAULT 0`);
    const r = await pool.query(
      `INSERT INTO game_scores(email,game,wins,galatin,best_lines,best_score) VALUES($1,$2,0,0,$3,$4)
       ON CONFLICT (email,game) DO UPDATE SET
         best_lines = GREATEST(game_scores.best_lines, $3),
         best_score = GREATEST(game_scores.best_score, $4),
         updated_at = now()
       RETURNING best_lines, best_score`,
      [email, game, lines, score]);
    // квесты: линии тетриса (дневной/недельный прогресс)
    if (lines > 0) {
      await bumpQuest(pool, email, 'tetris_lines_daily', todayUTC(), 40, lines);
      await bumpQuest(pool, email, 'tetris_lines_weekly', weekKeyUTC(), 200, lines);
    }
    const rank = await pool.query(
      `SELECT count(*)+1 AS rank FROM game_scores WHERE game=$1 AND best_lines > $2`, [game, r.rows[0].best_lines]);
    await pool.end();
    return NextResponse.json({ ok: true, bestLines: r.rows[0].best_lines, bestScore: r.rows[0].best_score, rank: Number(rank.rows[0].rank) });
  } catch (e) { console.error('[games/score]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
