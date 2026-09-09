import { Metadata } from 'next';
import { headers } from 'next/headers';
import { buildAlternates } from '@/lib/seo';
import { LanguageProvider } from '@/lib/LanguageContext';

// 🔴 ЗАГОЛОВОК И ОПИСАНИЕ — НА ЧЕТЫРЁХ ЯЗЫКАХ.
//
// Было: английский заголовок на русской, испанской и китайской версиях. В
// коде стоял комментарий «title/description preserved verbatim» — локализацию
// отложили и не вернулись. Заголовок и описание это то, что человек видит в
// выдаче поисковика ДО перехода: русскому человеку Google показывал
// английскую строку.
//
// Тексты не переведены машинно: у каждого языка свой заголовок, потому что
// дословный перевод продающей строки звучит как объявление, а не как
// обещание пользы. Смысл один, слова свои.
const МЕТА: Record<string, { title: string; desc: string }> = {
  en: {
    title: 'Free Web Accessibility Audit — WCAG 2.1 AA Compliance',
    desc:
      'Scan your website for WCAG 2.1 AA accessibility issues in seconds. Get a free score, the violations that matter, and expert remediation from AIfa Works.',
  },
  ru: {
    title: 'Проверка доступности сайта — WCAG 2.1 AA, бесплатно',
    desc:
      'Проверьте сайт на соответствие WCAG 2.1 AA за секунды: оценка, список нарушений с указанием страниц и цена исправления. Без регистрации.',
  },
  es: {
    title: 'Auditoría gratuita de accesibilidad web — WCAG 2.1 AA',
    desc:
      'Revise su sitio según WCAG 2.1 AA en segundos: puntuación, lista de incumplimientos con las páginas donde están y presupuesto de corrección. Sin registro.',
  },
  zh: {
    title: '免费网站无障碍检测 — 符合 WCAG 2.1 AA',
    desc:
      '数秒内按 WCAG 2.1 AA 标准检查您的网站：评分、按页面列出的违规项，以及修复报价。无需注册。',
  },
};

function язык(v: string | null | undefined): string {
  return ['en', 'ru', 'es', 'zh'].includes(v || '') ? (v as string) : 'en';
}

// Per-locale self-canonical + reciprocal hreflang (was a static English-only
// canonical that deindexed /ru,/es,/zh). Only `alternates` becomes locale-aware;
// title/description/keywords/openGraph/twitter are preserved verbatim.
export async function generateMetadata(): Promise<Metadata> {
  const л = язык((await headers()).get('x-locale'));
  const м = МЕТА[л];
  return {
    title: м.title,
    description: м.desc,
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
