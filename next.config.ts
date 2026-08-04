import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Приветственные ролики AIfa раздаются с нашего же адреса.
  //
  // Файлы лежат в нашем R2 и раздаются тем же бесплатным воркером, что и
  // музыка (63 штуки, ~2,8 МБ каждая —
  // в репозиторий такое класть нельзя). Но браузеру они приходят как
  // /aifa-welcome/..., то есть с того же домена, что и страница. Это важно:
  // ролик с чужого домена уже однажды молча не запускался из-за политики
  // безопасности, service worker и экономии трафика — ни одна из этих причин
  // не даёт внятной ошибки, видео просто вечно «загружается».
  async rewrites() {
    return [
      {
        source: '/aifa-welcome/:file*',
        destination: 'https://radiocode-audio.codeeternal.workers.dev/aifa/welcome/:file*',
      },
    ];
  },

  // Не сообщаем миру, на чём мы работаем: X-Powered-By — подсказка нападающему.
  poweredByHeader: false,
  // NOTE: `output: "standalone"` was removed — on Vercel it broke Set-Cookie
  // emission from API routes (session cookie never reached the browser),
  // breaking cabinet login. Vercel builds its own output; standalone is unneeded.
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Canonicalize host: 301 www → apex. The `has` host condition only matches
  // www.radiocode.space, so requests already on the apex are NOT rewritten —
  // no redirect loop.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.radiocode.space" }],
        destination: "https://radiocode.space/:path*",
        permanent: true,
      },
    ];
  },
  // Baseline security headers (SEO/trust signal). Additive — does not affect the
  // per-route Cache-Control set by the auth relay.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            // Наш же Оракул нашёл это на нас: без Permissions-Policy браузер
            // не ограничивает доступ к камере, микрофону и геопозиции. Явно
            // отключаем всё, чем сайт не пользуется, — если чужой скрипт
            // попробует, браузер откажет.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Cross-Origin-Opener-Policy: отвязывает наше окно от чужих.
            //
            // Без него страница, открывшая нашу (или открытая нашей), остаётся
            // с ней в одной группе окон и может дёргать её через window.opener.
            //
            // Значение именно 'same-origin-allow-popups', а НЕ 'same-origin':
            // вход через Google здесь работает всплывающим окном — в
            // src/app/cabinet/page.tsx стоит ux_mode: "popup". Строгое
            // 'same-origin' обрывает связь с этим окном, и вход молча
            // перестаёт завершаться. Выбранное значение защищает от чужих
            // окон, но не рвёт те, что открыли мы сами.
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          // Политика содержимого (Content-Security-Policy) переехала в
          // src/middleware.ts: в неё входит одноразовая метка, новая на каждый
          // ответ, а статический заголовок такого не умеет. Держать её в двух
          // местах нельзя — браузер применял бы обе сразу, строгую и слабую.
        ],
      },
    ];
  },
};

export default nextConfig;
