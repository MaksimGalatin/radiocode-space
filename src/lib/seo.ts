import { headers, cookies } from 'next/headers';

// Shared locale-aware canonical/hreflang helper for static subpages.
//
// The problem it fixes: layouts/pages that exported a STATIC `metadata` with a
// hardcoded English `alternates.canonical` (and no hreflang) made every localized
// variant (/ru/PATH, /es/PATH, /zh/PATH) self-canonicalize to the ENGLISH URL,
// deindexing the translations even though they are in the sitemap and render
// localized content. This mirrors the already-working pattern in
// app/news/[slug]/page.tsx and app/page.tsx (read the middleware x-locale header,
// emit a per-locale self canonical + reciprocal hreflang alternates).
//
// URL scheme (matches middleware + sitemap): en at the root, other locales under
// /{loc}. e.g. path '/glossary' → en https://aifa.works/glossary,
// ru https://aifa.works/ru/glossary.

export type Locale = 'en' | 'ru' | 'es' | 'zh';

const LOCALES: Locale[] = ['en', 'ru', 'es', 'zh'];

// Fixed host — never derive from process.cwd() (on Vercel cwd is /var/task, which
// silently emits a cross-domain canonical). NEXT_PUBLIC_SITE_URL overrides.
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://aifa.works';

function normalize(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export async function resolveLocale(): Promise<Locale> {
  const h = await headers();
  const c = await cookies();
  const l = h.get('x-locale') || c.get('locale')?.value || 'en';
  return (LOCALES.includes(l as Locale) ? l : 'en') as Locale;
}

// Localized URL for a given locale, matching the middleware language-prefix
// scheme: en at the root, other locales under /{loc}.
export function localizedUrl(loc: Locale, path: string): string {
  const clean = normalize(path);
  return loc === 'en' ? `${BASE}${clean}` : `${BASE}/${loc}${clean}`;
}

// Reciprocal hreflang map (en/ru/es/zh + x-default → en), identical for every
// locale variant of the same page.
export function languageAlternates(path: string): Record<string, string> {
  const clean = normalize(path);
  return {
    en: `${BASE}${clean}`,
    ru: `${BASE}/ru${clean}`,
    es: `${BASE}/es${clean}`,
    zh: `${BASE}/zh${clean}`,
    'x-default': `${BASE}${clean}`,
  };
}

// Ссылки на ленты новостей. Лежат здесь, а не только в корневом макете, потому
// что Next НЕ сливает `alternates` по полям: страница, объявившая свой
// canonical, целиком заменяет корневой блок и вместе с ним теряет <link rel=
// "alternate" type="application/rss+xml">. Тег просто исчезал со всех страниц с
// собственным адресом. Отдаём его вместе с адресом — забыть теперь нечего.
export const FEED_TYPES: Record<string, string> = {
  'application/rss+xml': `${BASE}/feed.xml`,
  'application/atom+xml': `${BASE}/atom.xml`,
};

// Drop-in for `alternates`: per-locale SELF canonical + reciprocal hreflang.
export async function buildAlternates(
  path: string,
): Promise<{
  canonical: string;
  languages: Record<string, string>;
  types: Record<string, string>;
}> {
  const loc = await resolveLocale();
  return {
    canonical: localizedUrl(loc, path),
    languages: languageAlternates(path),
    types: FEED_TYPES,
  };
}
