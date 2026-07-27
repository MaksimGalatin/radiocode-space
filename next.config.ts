import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
