import { after } from 'next/server';

/**
 * ВЕЧНАЯ ПАМЯТЬ СРАЗУ ПОСЛЕ ОПЛАТЫ — 29.09.2026. Один файл на все 4 сайта, байт в байт.
 *
 * Слово Архитектора: «Заливка в Arweave не активна — всё правильно, на днях включим. Если кто-то сделает
 * оплату — нужно подключать ему сразу». Зовётся из `setUserTier` (lib/referral.ts) — единственной точки,
 * где оплата выставляет тариф на любом из 4 сайтов, — и из ночной перепроверки оплат.
 *
 * Центр (/api/cron/arweave-sync с почтой в заголовке) делает ровно одно: заводит платному человеку личный
 * кошелёк Arweave и заливает ЕГО память. Работа идёт ПОСЛЕ ответа платёжной системе (`after`), чтобы
 * подтверждение оплаты не ждало блокчейна.
 *
 * ТРИ ЧИСЛА (раздел 24): частота — один раз на каждую успешную оплату (замер кабинета NOWPayments
 * 28.09.2026: оплат ноль); цена одного срабатывания — куски до 100 КБ бесплатно через Turbo с личного
 * кошелька, крупные — пополнением с кошелька проекта не больше потолка прогона 0,05 AR (~$0,21);
 * в сутки — не больше недельного потолка кошелька проекта 0,5 AR (~$2,1 в неделю).
 */
export function подключитьВечнуюПамятьПослеОплаты(email: string, tier: number): void {
  const почта = String(email || '').trim().toLowerCase();
  if (!почта || !(tier > 0)) return;
  const работа = async () => {
    const база = (process.env.AIFA_CENTRAL_API || 'https://www.codeofdigitaleternity.com').replace(/\/$/, '');
    const секрет = process.env.AIFA_INTERNAL_SECRET || '';
    if (!секрет) {
      console.warn('[оплата → вечная память] нет AIFA_INTERNAL_SECRET — подключение не отправлено');
      return;
    }
    try {
      const ответ = await fetch(`${база}/api/cron/arweave-sync`, {
        method: 'POST',
        headers: { 'x-aifa-internal': секрет, 'x-aifa-user-email': почта },
        cache: 'no-store',
        signal: AbortSignal.timeout(58_000),
      });
      console.log('[оплата → вечная память]', ответ.status, (await ответ.text()).slice(0, 240));
    } catch (e) {
      console.warn('[оплата → вечная память] не удалось:', String(e).slice(0, 200));
    }
  };
  try {
    after(работа);
  } catch {
    // Вне обработки запроса `after` недоступен — запускаем сразу.
    void работа();
  }
}
