import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

// Track likes — the audience curates the debut album. A like is stored per
// (liker, track_id); liker is the logged-in email, else a device id ("dev:<id>").
// Aggregated counts = ready-made data for picking the 10–12 album tracks.

async function pool() {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return null;
  const { Pool } = await import('@neondatabase/serverless');
  return new Pool({ connectionString: url });
}

async function ensure(p: any) {
  await p.query(`CREATE TABLE IF NOT EXISTS track_likes (
    id SERIAL PRIMARY KEY,
    liker TEXT NOT NULL,
    track_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(liker, track_id)
  )`);
}

function likerOf(req: NextRequest, deviceId?: string | null): string | null {
  const email = getSessionEmail(req);
  if (email) return email;
  const d = (deviceId || '').trim().slice(0, 64);
  return d ? 'dev:' + d : null;
}

// POST { trackId, deviceId? } → toggle like. Returns { liked, count }.
export async function POST(req: NextRequest) {
  // Ограничение частоты: накрутка лайков.
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_likes = clientIp(req as never);
  if (адрес_likes !== 'unknown' && !(await dbRateLimit(`likes:${адрес_likes}`, 60, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const p = await pool();
  if (!p) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  let b: any = {};
  try { b = await req.json(); } catch {}
  const trackId = String(b?.trackId || '').trim().slice(0, 120);
  if (!trackId) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  const liker = likerOf(req, b?.deviceId);
  if (!liker) return NextResponse.json({ error: 'no_identity' }, { status: 400 });
  try {
    await ensure(p);
    const del = await p.query(`DELETE FROM track_likes WHERE liker=$1 AND track_id=$2`, [liker, trackId]);
    let liked = false;
    if (del.rowCount === 0) {
      await p.query(`INSERT INTO track_likes(liker, track_id) VALUES($1,$2) ON CONFLICT DO NOTHING`, [liker, trackId]);
      liked = true;
    }
    const c = await p.query(`SELECT COUNT(*)::int AS n FROM track_likes WHERE track_id=$1`, [trackId]);
    await p.end();
    return NextResponse.json({ ok: true, liked, count: c.rows[0]?.n || 0 });
  } catch (e) { console.error('[likes POST]', e); try { await p.end(); } catch {} return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}

// GET → counts for all tracks + this user's liked ids.
//   ?top=1 → the leaderboard (album shortlist): [{ track_id, count }] desc.
export async function GET(req: NextRequest) {
  // Ограничение частоты: накрутка лайков.
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_likes = clientIp(req as never);
  if (адрес_likes !== 'unknown' && !(await dbRateLimit(`likes:${адрес_likes}`, 60, 60000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const p = await pool();
  if (!p) return NextResponse.json({ counts: {}, mine: [] });
  const url = new URL(req.url);
  const deviceId = url.searchParams.get('deviceId');
  const liker = likerOf(req, deviceId);
  try {
    await ensure(p);
    if (url.searchParams.get('top')) {
      const t = await p.query(`SELECT track_id, COUNT(*)::int AS count FROM track_likes GROUP BY track_id ORDER BY count DESC, track_id LIMIT 30`);
      await p.end();
      return NextResponse.json({ top: t.rows });
    }
    const counts = await p.query(`SELECT track_id, COUNT(*)::int AS n FROM track_likes GROUP BY track_id`);
    const mine = liker
      ? await p.query(`SELECT track_id FROM track_likes WHERE liker=$1`, [liker])
      : { rows: [] as any[] };
    await p.end();
    const cmap: Record<string, number> = {};
    for (const r of counts.rows) cmap[r.track_id] = r.n;
    return NextResponse.json({ counts: cmap, mine: mine.rows.map((r: any) => r.track_id) });
  } catch (e) { console.error('[likes GET]', e); try { await p.end(); } catch {} return NextResponse.json({ counts: {}, mine: [] }); }
}
