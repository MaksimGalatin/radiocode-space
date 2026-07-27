import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied } from '@/lib/admin-guard';
import { getPool } from '@/lib/economy';

export const dynamic = 'force-dynamic';

// Admin: audit log of admin actions.
export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return adminDenied();
  try {
    const pool = await getPool();
    const r = await pool.query(`SELECT id, admin_email, action, detail, ip, created_at FROM admin_audit_log ORDER BY id DESC LIMIT 200`);
    await pool.end();
    return NextResponse.json({ ok: true, log: r.rows });
  } catch (e) { console.error('[admin/audit]', e); return NextResponse.json({ error: 'db_error' }, { status: 500 }); }
}
