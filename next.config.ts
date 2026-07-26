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
          {
            // Defense-in-depth CSP. Deliberately permissive (unsafe-inline for Next's
            // inline hydration scripts; broad https: for the R2 audio CDN + Vercel
            // analytics) so it cannot break the SPA/audio, while still blocking plugins,
            // base-tag injection and framing, and forcing HTTPS subresources.
            // NOTE: Google Identity Services (Sign in with Google) needs
            // accounts.google.com in script-src (the gsi/client loader),
            // frame-src (the button iframe + one-tap) and style-src (its
            // injected styles). Without these the CSP silently blocks GSI and
            // the Google button never renders — matches the CSP on works/digital.
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; " +
              // GA4 грузится с googletagmanager.com — без него в script-src CSP
              // молча режет тег и сайт исчезает из аналитики (та же грабля, что
              // была с кнопкой Google).
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://apis.google.com https://www.googletagmanager.com https://va.vercel-scripts.com https://vercel.live; " +
              "style-src 'self' 'unsafe-inline' https://accounts.google.com; " +
              "img-src 'self' data: blob: https:; " +
              "media-src 'self' blob: https:; " +
              "connect-src 'self' https: wss:; " +
              "font-src 'self' data:; " +
              "worker-src 'self' blob:; " +
              "manifest-src 'self'; " +
              "frame-src 'self' https://accounts.google.com; " +
              "object-src 'none'; " +
              "base-uri 'self'; " +
              "frame-ancestors 'self'; " +
              "upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
