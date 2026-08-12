import { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';

// Публичная оферта — один и тот же документ на всех четырёх сайтах экосистемы.
// Отличаются только заголовок вкладки и адрес: этого требует разметка для
// поисковых систем. Сам текст договора обязан совпадать побайтово.
export const metadata: Metadata = {
  title: 'Public Service Agreement (Offer)',
  description:
    'Public offer for professional services: website development, Oracle compliance remediation, AI integration and web design. Master Services Agreement with Statement-of-Work framework, consumer rights, taxes, sanctions and export-control provisions.',
  /**
   * 🔴 ЯЗЫКОВЫЕ ССЫЛКИ У ОФЕРТЫ ОТСУТСТВОВАЛИ.
   *
   * Здесь стоял один `canonical`, а объявив своё поле `alternates`, страница
   * затирает корневое ЦЕЛИКОМ — вместе с четырьмя hreflang из раскладки. То
   * есть у самого главного документа сайта в поиске существовала одна языковая
   * версия из четырёх, хотя переведён он на все четыре.
   *
   * Адреса настоящие, а не выдуманные: обёртка LanguageProvider ниже берёт язык
   * из useЯзык, а тот — из заголовка `x-locale`, который middleware ставит по
   * метке `?lang=`. Значит `/service-agreement?lang=ru` отдаёт русский текст уже
   * с сервера, а не после оживления страницы в браузере.
   */
  alternates: {
    canonical: 'https://radiocode.space/service-agreement',
    languages: {
      en: 'https://radiocode.space/service-agreement',
      ru: 'https://radiocode.space/service-agreement?lang=ru',
      es: 'https://radiocode.space/service-agreement?lang=es',
      zh: 'https://radiocode.space/service-agreement?lang=zh',
      'x-default': 'https://radiocode.space/service-agreement',
    },
  },
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
