/**
 * Почтовые адреса сайта. Все три — реальные адреса на домене aifa.digital,
 * настроенные на пересылку в общий ящик OWNER_INBOX (contact@codeofdigitaleternity.com).
 * Письма, которые шлёт сайт, помечаются доменом и адресом — видно, откуда пришло.
 */
export const SITE_DOMAIN = 'aifa.digital';
export const EMAIL_CONTACT = 'contact@aifa.digital';
export const EMAIL_SUPPORT = 'support@aifa.digital';
export const EMAIL_SALES   = 'sales@aifa.digital';

/** Общий ящик владельца — сюда пересылаются письма со всех доменов. */
export const OWNER_INBOX = 'contact@codeofdigitaleternity.com';

/** Отправитель (единственный домен, подтверждённый в Resend). */
export const MAIL_FROM = 'CODE <noreply@codeofdigitaleternity.com>';

/** Тема письма с меткой сайта и адреса: [aifa.works · sales] ... */
export function taggedSubject(box: 'contact' | 'support' | 'sales', subject: string): string {
  return `[${SITE_DOMAIN} · ${box}] ${subject}`;
}

/** Строка-подпись для тела письма — на какой адрес написали. */
export function receivedVia(box: 'contact' | 'support' | 'sales'): string {
  const map = { contact: EMAIL_CONTACT, support: EMAIL_SUPPORT, sales: EMAIL_SALES };
  return `Написано на: ${map[box]} (сайт ${SITE_DOMAIN})`;
}
