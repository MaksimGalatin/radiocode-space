// RadioCode.Space service worker — app shell only.
// IMPORTANT: never cache audio (596 files × ~6 MB would blow the device quota).
const CACHE = 'radiocode-shell-v1';
const SHELL = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Bypass entirely for audio / cross-origin media and range requests.
  if (
    e.request.method !== 'GET' ||
    url.pathname.endsWith('.mp3') ||
    url.hostname.includes('r2.dev') ||
    url.hostname.startsWith('cdn.') ||
    e.request.headers.has('range')
  ) {
    return; // let the network handle it
  }
  // Network-first for navigations (fresh content), cache fallback offline.
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('/')));
    return;
  }
  // Cache-first for same-origin static shell assets.
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => hit))
    );
  }
});
