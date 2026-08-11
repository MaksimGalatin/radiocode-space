import { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';

// Публичная оферта — один и тот же документ на всех четырёх сайтах экосистемы.
// Отличаются только заголовок вкладки и адрес: этого требует разметка для
// поисковых систем. Сам текст договора обязан совпадать побайтово.
export const metadata: Metadata = {
  title: 'Public Service Agreement (Offer)',
  description:
    'Public offer for professional services: website development, Oracle compliance remediation, AI integration and web design. Master Services Agreement with Statement-of-Work framework, consumer rights, taxes, sanctions and export-control provisions.',
  alternates: { canonical: 'https://radiocode.space/service-agreement' },
  openGraph: {
    title: 'Public Service Agreement (Offer) | RadioCODE',
    description:
      'Master Services Agreement & SOW framework for web, compliance-remediation, AI-integration and design services.',
    url: 'https://radiocode.space/service-agreement',
    siteName: 'RadioCODE',
    type: 'website',
  },
};

// 🔴 БЕЗ ЭТОЙ ОБЁРТКИ СТРАНИЦА ОТДАВАЛА 500.
//
// На трёх сайтах `LanguageProvider` смонтирован в корневом макете, и страница
// оферты берёт язык оттуда. На radiocode.space провайдер объявлен, но не
// используется НИГДЕ: сайт живёт на своём словаре `radioI18n`, а кабинет — на
// собственном. Поэтому `useLanguage()` внутри оферты падал с «must be used
// within a LanguageProvider», и весь маршрут отвечал 500.
//
// Провайдер поставлен точечно на этот маршрут, а не в корень: в корне он
// затронул бы каждую страницу сайта ради одной. Так текст самой оферты
// остаётся побайтово одинаковым на всех четырёх сайтах.
export default function ServiceAgreementLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
