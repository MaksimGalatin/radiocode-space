import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail } from '@/lib/user-auth';
export const dynamic = 'force-dynamic';
const RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Record that the LOGGED-IN user was referred by `ref` (email or passport
// username). First referrer wins forever (ON CONFLICT DO NOTHING).
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  let b: any = {}; try { b = await req.json(); } catch {}
  let ref = String(b?.ref || '').trim().toLowerCase();
  if (!ref || ref.length > 120) return NextResponse.json({ ok: false, linked: false });
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: url });
    // ref may be a passport username → resolve to email
    if (!RE.test(ref)) {
      if (!/^[a-z0-9_-]{3,32}$/.test(ref)) { await pool.end(); return NextResponse.json({ ok: false, linked: false }); }
      const u = await pool.query(`SELECT email FROM passports WHERE username=$1`, [ref]);
      if (!u.rows[0]) { await pool.end(); return NextResponse.json({ ok: false, linked: false }); }
      ref = String(u.rows[0].email).toLowerCase();
    }
    if (ref === email) { await pool.end(); return NextResponse.json({ ok: false, linked: false }); }
    // Block a direct 2-cycle (ref is already referred by email).
    const cyc = await pool.query(`SELECT 1 FROM referrals WHERE user_email=$1 AND referrer_email=$2`, [ref, email]);
    if (cyc.rowCount && cyc.rowCount > 0) { await pool.end(); return NextResponse.json({ ok: false, linked: false }); }
    const r = await pool.query(
      `INSERT INTO referrals(user_email,referrer_email) VALUES($1,$2)
       ON CONFLICT(user_email) DO NOTHING RETURNING user_email`, [email, ref]);
    if ((r.rowCount || 0) > 0) {
      // недельный квест реферера «Пригласи друга»
      try {
        const { bumpQuest, weekKeyUTC } = await import('@/lib/economy');
        await bumpQuest(pool as any, ref, 'invite_weekly', weekKeyUTC(), 1);
      } catch {}
    }
    await pool.end();
    return NextResponse.json({ ok: true, linked: (r.rowCount || 0) > 0 });
  } catch (e) { console.error('[ref/link]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
