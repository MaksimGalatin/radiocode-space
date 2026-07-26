/**
 * Отправка клиентской ошибки в наш собственный журнал.
 *
 * Зачем отдельно от аналитики. Существующий монитор шлёт ошибки в GA4 и только
 * при согласии на cookie. Значит у всех, кто отказался от аналитики (в Европе
 * это большинство), поломка на экране остаётся невидимой для нас: сервер
 * отвечает 200, а человек видит пустую страницу и уходит.
 *
 * Что здесь по данным. Пишем только техническое: текст ошибки, файл и строку,
 * путь страницы и обобщённую метку браузера («Chrome · mobile»). Ни полного
 * User-Agent, ни IP, ни идентификаторов — по ним нельзя узнать человека,
 * поэтому согласие на такую запись не требуется (законный интерес: техническая
 * работоспособность сервиса).
 *
 * Устойчивость: не более 5 сообщений на загрузку страницы, повторы гасятся,
 * отправка через sendBeacon (переживает уход со страницы), любые сбои — молча.
 */

const MAX_PER_PAGE = 5;
let sent = 0;
const seen = new Set<string>();

/** Обобщённая метка браузера без деталей, по которым узнают человека. */
function browserLabel(): string {
  try {
    const ua = navigator.userAgent;
    const engine = /Firefox\//.test(ua) ? 'Firefox'
      : /Edg\//.test(ua) ? 'Edge'
      : /OPR\//.test(ua) ? 'Opera'
      : /Chrome\//.test(ua) ? 'Chrome'
      : /Safari\//.test(ua) ? 'Safari'
      : 'other';
    const kind = /Android|iPhone|iPad|Mobile/.test(ua) ? 'mobile' : 'desktop';
    return `${engine} · ${kind}`;
  } catch {
    return 'unknown';
  }
}

export function reportClientError(message: string, source?: string, stack?: string): void {
  try {
    if (typeof window === 'undefined') return;
    const msg = String(message || '').trim();
    if (!msg) return;
    if (sent >= MAX_PER_PAGE) return;
    const key = msg.slice(0, 120);
    if (seen.has(key)) return;
    seen.add(key);
    sent += 1;

    const payload = JSON.stringify({
      message: msg.slice(0, 300),
      source: (source || '').slice(0, 300),
      stack: (stack || '').slice(0, 2000),
      path: location.pathname + location.search,
      ua: browserLabel(),
    });

    try {
      const blob = new Blob([payload], { type: 'application/json' });
      if (navigator.sendBeacon && navigator.sendBeacon('/api/client-error', blob)) return;
    } catch { /* ниже запасной путь */ }

    void fetch('/api/client-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* сообщение об ошибке не имеет права само стать ошибкой */
  }
}
