// RadioCode.Space service worker — app shell only.
// IMPORTANT:
//  - never cache audio (596 files × ~6 MB would blow the device quota);
//  - NEVER cache /api/* — these are per-user, auth-bearing and dynamic. Caching
//    /api/me & /api/auth/me made the SW serve a stale "not logged in" response
//    after login, so the cabinet never saw the session (login silently did nothing).
//    Bumping the cache name (v2 → v3) purges the old poisoned cache on activate.
const CACHE = 'radiocode-shell-v3';
const SHELL = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];

// Only genuinely-static assets are safe to cache-first.
const STATIC_RE = /\.(?:css|js|mjs|woff2?|ttf|otf|eot|png|jpg|jpeg|gif|webp|avif|svg|ico|webmanifest)$/i;

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

// Просьба со страницы «начинай работать сейчас».
//
// skipWaiting() при установке уже стоит, но он срабатывает только когда воркер
// ставится ВПЕРВЫЕ. Обновление встаёт в очередь и ждёт, пока закроются все
// вкладки сайта, — а радио держат открытым часами. Сообщение со страницы
// снимает ожидание, дальше controllerchange перезагружает вкладку один раз.
self.addEventListener('message', (e) => {
  if (e.data && e.data.тип === 'ВЗЯТЬ_УПРАВЛЕНИЕ') self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Bypass entirely for non-GET, audio / cross-origin media and range requests.
  if (
    e.request.method !== 'GET' ||
    url.pathname.endsWith('.mp3') ||
    url.hostname.includes('r2.dev') ||
    url.hostname.endsWith('.workers.dev') ||
    url.hostname.startsWith('cdn.') ||
    e.request.headers.has('range')
  ) {
    return; // let the network handle it
  }

  // NEVER touch API traffic — always straight to network, never cached.
  // (auth, /api/me, likes, leaderboards, chat … must be fresh & per-user.)
  if (url.origin === self.location.origin && url.pathname.startsWith('/api/')) {
    return; // let the network handle it
  }

  // Network-first for navigations (fresh content), cache fallback offline.
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('/')));
    return;
  }

  // Cache-first ONLY for same-origin static assets (never HTML/data/API).
  if (url.origin === self.location.origin && STATIC_RE.test(url.pathname)) {
    e.respondWith(
      caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => hit))
    );
    return;
  }

  // Everything else same-origin (dynamic HTML/data): network-first, cache fallback.
  if (url.origin === self.location.origin) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  }
});
