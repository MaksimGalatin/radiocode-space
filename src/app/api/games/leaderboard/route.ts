import { NextRequest, NextResponse } from 'next/server';
import { allowRequest } from '@/lib/rate-limit';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  // Ограничение частоты: частый опрос таблицы.
  if (!allowRequest(req as NextRequest, 'games_leaderboard', 60, 60000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const game = (req.nextUrl.searchParams.get('game') || '').trim().toLowerCase();
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ top: [] });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    let q;
    if (game === 'tetris') {
      // score-based board: personal best lines/score
      try { await pool.query(`ALTER TABLE game_scores ADD COLUMN IF NOT EXISTS best_lines INT DEFAULT 0`); await pool.query(`ALTER TABLE game_scores ADD COLUMN IF NOT EXISTS best_score INT DEFAULT 0`); } catch {}
      q = await pool.query(`SELECT email, wins, galatin, COALESCE(best_lines,0) AS lines, COALESCE(best_score,0) AS score FROM game_scores WHERE game=$1 ORDER BY COALESCE(best_lines,0) DESC, COALESCE(best_score,0) DESC, updated_at ASC LIMIT 100`, [game]);
    } else {
      q = game
        ? await pool.query(`SELECT email, wins, galatin FROM game_scores WHERE game=$1 ORDER BY wins DESC, updated_at ASC LIMIT 100`, [game])
        : await pool.query(`SELECT email, SUM(wins)::int wins, SUM(galatin)::int galatin FROM game_scores GROUP BY email ORDER BY wins DESC LIMIT 100`);
    }
    await pool.end();
    // mask emails for privacy on the public board
    const top = q.rows.map((r: any, i: number) => ({ rank: i + 1, name: maskEmail(r.email), wins: r.wins, galatin: r.galatin, ...(game === 'tetris' ? { lines: Number(r.lines) || 0, score: Number(r.score) || 0 } : {}) }));
    return NextResponse.json({ top });
  } catch (e) {
    console.error('[games/leaderboard]', e);
    return NextResponse.json({ top: [], error: 'db_error' }, { status: 500 });
  }
}
function maskEmail(e: string): string {
  const [u, d] = String(e).split('@'); if (!d) return e;
  return (u.length <= 2 ? u : u.slice(0, 2) + '***') + '@' + d;
}
