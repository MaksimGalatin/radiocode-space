import crypto from 'crypto';
const SECRET = process.env.AIFA_SESSION_SECRET || process.env.AIFA_INTERNAL_SECRET || '';
const ADMIN_EMAILS = ['codeofdigitaleternity@gmail.com'];
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const ADMIN_COOKIE = 'aifa_admin_session';

export function signSession(email: string): string {
  const payload = `${email.trim().toLowerCase()}|${Date.now() + TTL_MS}`;
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  return Buffer.from(payload).toString('base64url') + '.' + sig;
}
export function verifySession(token?: string | null): string | null {
  if (!token || !SECRET) return null;
  const [b, sig] = token.split('.');
  if (!b || !sig) return null;
  try {
    const payload = Buffer.from(b, 'base64url').toString();
    const expect = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
    const a = Buffer.from(sig), e = Buffer.from(expect);
    if (a.length !== e.length || !crypto.timingSafeEqual(a, e)) return null;
    const [email, exp] = payload.split('|');
    if (Date.now() > Number(exp)) return null;
    return email;
  } catch { return null; }
}
export function isAdminEmail(email: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
