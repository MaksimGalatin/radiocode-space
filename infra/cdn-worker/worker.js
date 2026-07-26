/**
 * CODE Radio — бесплатный CDN-фронт к бакету R2 (Cloudflare Workers).
 *
 * Зачем: сейчас треки отдаются с публичного адреса *.r2.dev. Это уже сеть
 * Cloudflare (замер: 206 Partial Content, ~0.3 с, ~700 КБ/с), но у неё нет
 * ни заголовков кэширования, ни CORS. Из-за отсутствия CORS пришлось увести
 * плеер в «прямой» режим и потерять аудио-реактивный визуализатор и
 * авто-нормализацию громкости.
 *
 * Что даёт этот Worker (бесплатный тариф: 100 000 запросов в сутки, исходящий
 * трафик R2 бесплатен):
 *   • Cache-Control: public, max-age=1 год, immutable — повторные прослушивания
 *     берутся из кэша края сети, R2 не дёргается;
 *   • корректные CORS-заголовки для наших доменов → можно вернуть Web Audio;
 *   • поддержка Range-запросов (перемотка) и HEAD;
 *   • адрес вида https://<имя>.<аккаунт>.workers.dev — свой домен не нужен.
 *
 * Развёртывание (после того как появится API-токен с правом Workers Scripts:Edit):
 *   cd infra/cdn-worker && npx wrangler deploy
 * затем в Vercel-проекте radiocode задать NEXT_PUBLIC_AUDIO_CDN=<адрес воркера>
 * и передеплоить — код плеера уже умеет подменять адрес (lib/audioCdn.ts).
 */

const CACHE_VERSION = 'v2';

const ALLOWED_ORIGINS = new Set([
  'https://radiocode.space',
  'https://www.radiocode.space',
  'https://aifa.digital',
  'https://www.aifa.digital',
  'https://aifa.works',
  'https://www.codeofdigitaleternity.com',
]);

function corsHeaders(origin) {
  const h = new Headers();
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    h.set('Access-Control-Allow-Origin', origin);
    h.set('Vary', 'Origin');
  }
  h.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  h.set('Access-Control-Allow-Headers', 'range, content-type');
  h.set('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Accept-Ranges, Content-Type, ETag');
  h.set('Access-Control-Max-Age', '86400');
  return h;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders(origin) });
    }

    // Ключ объекта — путь без ведущего слэша. Защита от выхода за пределы бакета.
    const key = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
    if (!key || key.includes('..')) {
      return new Response('Not Found', { status: 404, headers: corsHeaders(origin) });
    }

    // Кэш края сети: Range-запросы кэшировать нельзя (ответ 206 непригоден для
    // cache.put), поэтому кэшируем только полные GET. На адресе *.workers.dev
    // кэш края может не работать — тогда выигрыш даёт браузерный кэш из
    // Cache-Control ниже, а при переезде на свой домен кэш включится сам.
    const range = request.headers.get('Range');
    const cacheable = !range && request.method === 'GET';
    const cache = caches.default;
    // Версия в ключе кэша: если поведение воркера меняется, достаточно поднять
    // CACHE_VERSION — старые записи осиротеют, чистить руками ничего не нужно.
    const cacheKey = new Request(`${url.origin}/__cache/${CACHE_VERSION}${url.pathname}${url.search}`, {
      method: 'GET',
    });
    if (cacheable) {
      const hit = await cache.match(cacheKey);
      if (hit) {
        const h = new Headers(hit.headers);
        corsHeaders(origin).forEach((v, k) => h.set(k, v));
        h.set('X-CODE-Cache', 'HIT');
        return new Response(hit.body, { status: hit.status, headers: h });
      }
    }

    const object = await env.AUDIO.get(key, range ? { range: request.headers } : undefined);
    if (!object) {
      return new Response('Not Found', { status: 404, headers: corsHeaders(origin) });
    }

    // Базовые заголовки — без CORS: именно они кладутся в кэш, чтобы запись
    // не привязывалась к Origin (иначе Vary: Origin режет кэш на куски).
    const base = new Headers();
    object.writeHttpMetadata(base);
    base.set('etag', object.httpEtag);
    base.set('Accept-Ranges', 'bytes');
    // Файлы неизменяемы (имя = версия трека), поэтому кэшируем надолго.
    base.set('Cache-Control', 'public, max-age=31536000, immutable');
    if (!base.get('content-type')) base.set('content-type', 'audio/mpeg');

    const withCors = () => {
      const h = new Headers(base);
      corsHeaders(origin).forEach((v, k) => h.set(k, v));
      return h;
    };

    // 206 отдаём только если клиент действительно просил диапазон: R2 заполняет
    // object.range и для обычного get(), а 206 на полный запрос ломает кэш.
    if (range && object.range) {
      const { offset = 0, length = object.size } = object.range;
      const h = withCors();
      h.set('Content-Range', `bytes ${offset}-${offset + length - 1}/${object.size}`);
      return new Response(request.method === 'HEAD' ? null : object.body, { status: 206, headers: h });
    }

    if (request.method === 'HEAD') {
      const h = withCors();
      h.set('Content-Length', String(object.size));
      return new Response(null, { status: 200, headers: h });
    }

    const stored = new Response(object.body, { status: 200, headers: base });
    if (cacheable) ctx.waitUntil(cache.put(cacheKey, stored.clone()));
    return new Response(stored.body, { status: 200, headers: withCors() });
  },
};
