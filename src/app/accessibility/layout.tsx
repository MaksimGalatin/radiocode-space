import { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';
import { LanguageProvider } from '@/lib/LanguageContext';

// Per-locale self-canonical + reciprocal hreflang (was a static English-only
// canonical that deindexed /ru,/es,/zh). Only `alternates` becomes locale-aware;
// title/description/keywords/openGraph/twitter are preserved verbatim.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Free Web Accessibility Audit — WCAG 2.1 AA Compliance',
    description:
      'Scan your website for WCAG 2.1 AA accessibility issues in seconds. Get a free score, top violations, and expert remediation from AIfa Works. ADA compliant websites built fast.',
    keywords: [
      'web accessibility audit',
      'WCAG 2.1 AA compliance',
      'ADA website compliance',
      'accessibility checker free',
      'fix accessibility issues',
      'screen reader testing',
      'color contrast checker',
      'ARIA labels',
      'Section 508 compliance',
    ],
    alternates: await buildAlternates('/accessibility'),
    openGraph: {
      title: 'Free Web Accessibility Audit | AIfa Works',
      description: 'Scan your site for WCAG 2.1 AA issues — free. Get a score, top violations, and expert fixes.',
      url: 'https://aifa.works/accessibility',
      siteName: 'AIfa Works',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Free Web Accessibility Audit | AIfa Works',
      description: 'Is your site ADA compliant? Scan free and get expert WCAG 2.1 AA remediation.',
    },
  };
}

// 🔴 БЕЗ ЭТОЙ ОБЁРТКИ РУССКАЯ СТРАНИЦА ПОКАЗЫВАЛА АНГЛИЙСКИЙ ТЕКСТ.
//
// Замер 09.09.2026: `/ru/accessibility` и `/accessibility?lang=ru` отдавали
// `lang="ru"` в разметке и при этом заголовок «Is Your Website ADA Compliant?»,
// разделы «The Problem», «Our Solution» и тариф «Lite Audit» — весь текст
// английский. На трёх остальных сайтах та же страница по-русски.
//
// Причина. Страница берёт язык так:
//     const _ctx = useLanguageOptional();
//     const locale = _ctx?.locale ?? 'en';
// На radiocode.space `LanguageProvider` в корневом макете НЕ смонтирован —
// сайт живёт на своём словаре `radioI18n`. Контекст пуст, и запасное значение
// молча делает страницу английской. Ни типы, ни сборка этого не видят: с точки
// зрения кода всё верно, просто сработал `?? 'en'`.
//
// Провайдер ставится точечно на этот маршрут — тем же способом, каким он уже
// стоит у оферты (`service-agreement/layout.tsx`), и по той же причине: в
// корне он затронул бы каждую страницу сайта ради одной.
export default function AccessibilityLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
