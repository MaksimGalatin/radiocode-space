import { NextRequest, NextResponse } from 'next/server';
import { logServerError } from '@/lib/error-log';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

/**
 * Приём ошибок, случившихся в браузере пользователя.
 *
 * Зачем. Журнал ошибок до сих пор видел только серверную часть. Но самые
 * обидные поломки — клиентские: не отрисовался кабинет, упал плеер, свалился
 * скрипт на конкретной версии браузера. Сервер при этом отвечает 200 и всё
 * выглядит здоровым, а человек видит пустой экран и уходит.
 *
 * Ограничения намеренно жёсткие: это открытый (без авторизации) эндпоинт, а
 * значит потенциальный канал для мусора. Поэтому — лимит по IP, обрезка полей,
 * отсев шума от расширений браузера и всегда 204 в ответ, чтобы отчёт об
 * ошибке никогда не превращался в ещё одну ошибку на странице.
 */

/** Шум, который приходит не из нашего кода и только засоряет журнал. */
const NOISE = [
  'ResizeObserver loop',            // безобидное предупреждение движка вёрстки
  'Script error.',                  // ошибка из чужого домена без деталей
  'chrome-extension://',
  'moz-extension://',
  'safari-extension://',
  'Non-Error promise rejection captured',
  'The play() request was interrupted', // обычное поведение при переключении трека
];

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    // 30 сообщений в минуту с адреса: реальному человеку хватит с запасом,
    // а зациклившийся скрипт или флудер дальше не пройдёт.
    if (ip !== 'unknown' && !(await dbRateLimit(`clienterr:${ip}`, 30, 60_000))) {
      return new NextResponse(null, { status: 204 });
    }

    const body = await req.json().catch(() => null) as
      | { message?: string; source?: string; line?: number; col?: number; stack?: string; path?: string; ua?: string }
      | null;
    if (!body || typeof body.message !== 'string' || !body.message.trim()) {
      return new NextResponse(null, { status: 204 });
    }

    const message = body.message.trim().slice(0, 300);
    const haystack = `${message} ${body.source || ''} ${body.stack || ''}`;
    if (NOISE.some((n) => haystack.includes(n))) return new NextResponse(null, { status: 204 });

    const detail = [
      body.source ? `source: ${String(body.source).slice(0, 300)}` : '',
      body.line !== undefined ? `line: ${body.line}:${body.col ?? 0}` : '',
      body.ua ? `ua: ${String(body.ua).slice(0, 200)}` : '',
      body.stack ? `\n${String(body.stack).slice(0, 2000)}` : '',
    ].filter(Boolean).join('  ');

    await logServerError({
      site: 'radio:client',
      path: (body.path || '').slice(0, 300),
      method: 'CLIENT',
      status: 0,
      message,
      detail,
    });
  } catch {
    /* приём ошибок не имеет права падать */
  }
  return new NextResponse(null, { status: 204 });
}
