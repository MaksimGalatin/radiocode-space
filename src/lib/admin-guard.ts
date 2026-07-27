import { NextRequest, NextResponse } from 'next/server';
import { verifySession, isAdminEmail, ADMIN_COOKIE } from '@/lib/admin-session';
import { getClientIp } from '@/lib/rate-limit';

/** Server-side admin guard: valid admin cookie AND owner email. */
export function requireAdmin(req: NextRequest): string | null {
  const email = verifySession(req.cookies.get(ADMIN_COOKIE)?.value);
  return isAdminEmail(email) ? email : null;
}

export function adminDenied() {
  return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
}

/** Append to the admin audit log (best-effort, never throws). */
export async function auditLog(pool: any, admin: string, action: string, detail: any, req?: NextRequest) {
  try {
    await pool.query(
      `INSERT INTO admin_audit_log(admin_email, action, detail, ip) VALUES($1,$2,$3,$4)`,
      [admin, action, JSON.stringify(detail ?? {}), req ? getClientIp(req) : null]
    );
  } catch (e) { console.error('[audit]', e); }
}
