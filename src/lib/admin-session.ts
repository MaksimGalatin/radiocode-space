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

/**
 * Рубеж отзыва админских сессий — из окружения, без запросов к базе.
 *
 * Найдено 27.08.2026: отозвать выданный пропуск было НЕЧЕМ. Токен
 * самодостаточен, сервер не хранит список выданных. Утёкший пропуск
 * работал до 30 дней, «Выйти» стирало только свою куку, смена пароля
 * не отзывала ничего.
 *
 * Лечение: в пропуск пишется время выдачи, а здесь живёт рубеж. Всё,
 * что выдано раньше рубежа, недействительно. Сдвинул рубеж — умерли ВСЕ
 * пропуска, включая украденный.
 *
 * Почему через окружение, а не через базу: проверка синхронна и зовётся
 * из десятка ручек, а главное — отзыв обязан работать и тогда, когда
 * база недоступна, то есть в худший момент.
 *
 * Как отозвать: поставить ADMIN_SESSIONS_VALID_FROM в текущее время
 * (ISO-строка или миллисекунды) и передеплоить.
 */
export function рубежОтзыва(): number {
  const сырое = (process.env.ADMIN_SESSIONS_VALID_FROM || '').trim();
  if (!сырое) return 0;
  const какЧисло = Number(сырое);
  if (Number.isFinite(какЧисло) && какЧисло > 0) return какЧисло;
  const какДата = Date.parse(сырое);
  return Number.isFinite(какДата) ? какДата : 0;
}

export function signSession(email: string): string {
  // Охрана как в двух других копиях этого модуля. Без неё при пустом ключе
  // подпись молча считалась от пустой строки: обхода это не давало (проверка
  // ниже возвращает null при пустом SECRET), но выдавало заведомо негодный
  // пропуск, и разбираться пришлось бы по симптому «вход не работает».
  if (!SECRET) throw new Error('AIFA_SESSION_SECRET is not configured');
  // Время выдачи пишем в пропуск: без него отзыв «всё, что выдано до
  // такого-то момента» невозможен — не с чем сравнивать (30.08.2026).
  const iat = Date.now();
  const payload = `${email.trim().toLowerCase()}|${iat}|${iat + TTL_MS}`;
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
    // Две части — прежний формат `почта|срок`; три — нынешний
    // `почта|выдан|срок`. Принимаем оба, отзывом накрываем оба.
    const части = payload.split('|');
    if (части.length !== 2 && части.length !== 3) return null;
    const email = части[0];
    const три = части.length === 3;
    const exp = три ? части[2] : части[1];
    if (Date.now() > Number(exp)) return null;

    // ОТЗЫВ ВСЕХ СЕССИЙ РАЗОМ. У старых пропусков времени выдачи нет —
    // считаем его как срок минус TTL, иначе отзыв не накрыл бы ровно те,
    // что уже гуляют.
    const рубеж = рубежОтзыва();
    if (рубеж > 0) {
      const выдан = три ? Number(части[1]) : Number(exp) - TTL_MS;
      if (!Number.isFinite(выдан) || выдан < рубеж) return null;
    }
    return email;
  } catch { return null; }
}
export function isAdminEmail(email: string | null): boolean {
  return !!email && ADMIN_EMAILS.includes(email.trim().toLowerCase());
}
