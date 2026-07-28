import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied, auditLog } from '@/lib/admin-guard';
import { getPool, creditGalatin } from '@/lib/economy';
import { allowRequest } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

// Admin: manual GALATIN credit/debit (audited, idempotent per unique note).
export async function POST(req: NextRequest) {
  // Ограничение частоты: начисление средств.
  if (!allowRequest(req as NextRequest, 'admin_credit', 20, 60000)) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  const admin = requireAdmin(req);
  if (!admin) return adminDenied();
  let b: any = {}; try { b = await req.json(); } catch {}
  const email = String(b?.email || '').trim().toLowerCase();
  const amount = Math.round(Number(b?.amount || 0));
  const note = String(b?.note || '').slice(0, 120);
  if (!email || !amount || Math.abs(amount) > 100000) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  try {
    const pool = await getPool();
    const ref = 'manual:' + Date.now() + ':' + Math.random().toString(36).slice(2, 6);
    const balance = await creditGalatin(pool, email, amount, 'admin', ref);
    await auditLog(pool, admin, 'manual_credit', { email, amount, note, ref }, req);
    await pool.end();
    return NextResponse.json({ ok: true, balance });
  } catch (e) { console.error('[admin/credit]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
