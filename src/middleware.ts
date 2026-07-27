import { NextRequest, NextResponse } from 'next/server';

/**
 * Политика содержимого с одноразовой меткой.
 *
 * ЗАЧЕМ ЭТОТ ФАЙЛ ПОЯВИЛСЯ. Политика лежала в next.config.ts и разрешала
 * выполнить ЛЮБОЙ встроенный скрипт ('unsafe-inline'). Это сводило её защиту
 * от подстановки чужого кода почти к нулю: скрипт, попавший в страницу через
 * форму, отзыв или чужой виджет, выполнялся бы наравне с нашим. Наш
 * собственный Оракул ставил за это замечание, и ставил справедливо.
 *
 * Статический заголовок из конфигурации метку выдавать не умеет — она обязана
 * быть новой на каждый ответ. Поэтому политика переехала сюда. Держать её в
 * двух местах нельзя: браузер получил бы два заголовка и применял бы оба
 * сразу — строгий и старый слабый.
 *
 * КАК РАБОТАЕТ. На каждый ответ выпускается случайная метка. Она объявляется
 * в политике и проставляется нашим скриптам в src/app/layout.tsx. Скрипт без
 * метки браузер не выполнит, а подставленному извне взять её неоткуда —
 * она новая каждый раз.
 *
 * 'unsafe-inline' оставлен НАМЕРЕННО и вреда не несёт: по стандарту CSP
 * уровня 3 браузер обязан игнорировать его при наличии метки. Он нужен лишь
 * очень старым браузерам, которые меток не понимают, — им достаётся прежний
 * уровень защиты вместо полностью сломанной страницы.
 *
 * Встроенные СТИЛИ остаются разрешёнными: их задают атрибутом style в сотнях
 * мест, а риск там другого порядка — подмена оформления, а не запуск кода.
 *
 * ВАЖНО про Google Sign-In: accounts.google.com обязан быть в script-src
 * (загрузчик gsi/client), frame-src (кнопка и всплывающее окно) и style-src
 * (внедряемые им стили). Без этого политика молча ломает кнопку Google —
 * на этом сайте так уже случалось.
 */
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    // GA4 грузится с googletagmanager.com — без него политика молча режет тег
    // и сайт исчезает из аналитики.
    `script-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://va.vercel-scripts.com https://vercel.live`,
    "style-src 'self' 'unsafe-inline' https://accounts.google.com",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob: https:",
    "connect-src 'self' https: wss:",
    "font-src 'self' data:",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "frame-src 'self' https://accounts.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
  ].join('; ') + ';';
}

export function middleware(req: NextRequest) {
  // Метка обязана быть непредсказуемой: угаданная метка обесценивает защиту.
  const nonce = btoa(crypto.randomUUID() + crypto.randomUUID()).replace(/=+$/, '');
  const csp = buildCsp(nonce);

  const headers = new Headers(req.headers);
  headers.set('x-nonce', nonce);
  // Next читает метку именно из этого заголовка запроса и сам проставляет её
  // своим служебным скриптам загрузки страницы. Без него страница осталась бы
  // белой: собственные скрипты Next оказались бы запрещены.
  headers.set('Content-Security-Policy', csp);

  const res = NextResponse.next({ request: { headers } });
  res.headers.set('Content-Security-Policy', csp);
  return res;
}

// Файлы с расширением и служебная папка _next исключены: политика им не нужна,
// а лишний проход через прослойку замедлил бы отдачу обложек и звука.
// Обработчики запросов (api) проходят здесь намеренно — их ответ тоже можно
// открыть в браузере напрямую.
export const config = { matcher: ['/((?!_next/|.*\\..*).*)'] };
