import crypto from 'crypto';
// Ключ подписи админских сессий — ТОЛЬКО AIFA_SESSION_SECRET.
//
// Запасной веткой стоял `AIFA_INTERNAL_SECRET`, но он по замыслу ПЕРЕДАЁТСЯ
// заголовком `x-aifa-internal` на родственные сайты, то есть покидает наш
// сервер. Всякий, кто увидел заголовок, подписал бы себе админский пропуск.
// Убрана 06.08.2026 после замера: `AIFA_SESSION_SECRET` задан во всех четырёх
// проектах. Три копии этого модуля обязаны совпадать, иначе кука, выданная
// одним сайтом, не подойдёт другому.
const SECRET = process.env.AIFA_SESSION_SECRET || '';
const ADMIN_EMAILS = ['codeofdigitaleternity@gmail.com'];
const TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const ADMIN_COOKIE = 'aifa_admin_session';

export function signSession(email: string): string {
  // Охрана как в двух других копиях этого модуля. Без неё при пустом ключе
  // подпись молча считалась от пустой строки: обхода это не давало (проверка
  // ниже возвращает null при пустом SECRET), но выдавало заведомо негодный
  // пропуск, и разбираться пришлось бы по симптому «вход не работает».
  if (!SECRET) throw new Error('AIFA_SESSION_SECRET is not configured');
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
