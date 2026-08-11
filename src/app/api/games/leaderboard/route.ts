import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const ipL = clientIp(req);
  if (ipL !== 'unknown' && !(await dbRateLimit(`lb:${ipL}`, 120, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
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
      q = await pool.query(`SELECT g.email, g.wins, g.galatin, COALESCE(g.best_lines,0) AS lines, COALESCE(g.best_score,0) AS score, u.nickname
                            FROM game_scores g LEFT JOIN users_auth u ON LOWER(u.email)=LOWER(g.email)
                            WHERE g.game=$1 ORDER BY COALESCE(g.best_lines,0) DESC, COALESCE(g.best_score,0) DESC, g.updated_at ASC LIMIT 100`, [game]);
    } else {
      q = game
        ? await pool.query(`SELECT g.email, g.wins, g.galatin, u.nickname
                            FROM game_scores g LEFT JOIN users_auth u ON LOWER(u.email)=LOWER(g.email)
                            WHERE g.game=$1 ORDER BY g.wins DESC, g.updated_at ASC LIMIT 100`, [game])
        : await pool.query(`SELECT g.email, SUM(g.wins)::int wins, SUM(g.galatin)::int galatin, MAX(u.nickname) AS nickname
                            FROM game_scores g LEFT JOIN users_auth u ON LOWER(u.email)=LOWER(g.email)
                            GROUP BY g.email ORDER BY wins DESC LIMIT 100`);
    }
    await pool.end();
    // PRIVACY: never expose any form of the email on the public board — show the
    // user's chosen nickname, or an opaque rank label if they have none.
    const top = q.rows.map((r: any, i: number) => ({
      rank: i + 1,
      name: (r.nickname && String(r.nickname).trim()) ? String(r.nickname).trim() : `Player #${i + 1}`,
      wins: r.wins,
      galatin: r.galatin,
      ...(game === 'tetris' ? { lines: Number(r.lines) || 0, score: Number(r.score) || 0 } : {}),
    }));
    return NextResponse.json({ top });
  } catch (e) {
    console.error('[games/leaderboard]', e);
    return NextResponse.json({ top: [], error: 'db_error' }, { status: 500 });
  }
}
