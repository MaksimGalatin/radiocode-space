import { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';

// Публичная оферта — один и тот же документ на всех четырёх сайтах экосистемы.
// Отличаются только заголовок вкладки и адрес: этого требует разметка для
// поисковых систем. Сам текст договора обязан совпадать побайтово.
const metadata: Metadata = {
  title: 'Public Service Agreement (Offer)',
  description:
    'Public offer for professional services: website development, AIfaFocus compliance remediation, AI integration and web design. Master Services Agreement with Statement-of-Work framework, consumer rights, taxes, sanctions and export-control provisions.',
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
  /**
   * 🔴 ДОПОЛНЕНО 11.09.2026: канон был литералом, языковые версии отрицали
   * себя. Замер по соседнему документу (пользовательское соглашение):
   *
   *     /user-agreement       кириллицы    181, canonical /user-agreement
   *     /ru/user-agreement    кириллицы 74 003, canonical /user-agreement
   *
   * Здесь было то же. Теперь канон вычисляется по языку (см. функцию ниже),
   * а формы в `languages` приведены к префиксу: карта сайта называет
   * `/ru/...`, метки `?lang=` в ней нет — проверено.
   */
  alternates: {
    canonical: 'https://radiocode.space/service-agreement',
    languages: {
      en: 'https://radiocode.space/service-agreement',
      ru: 'https://radiocode.space/ru/service-agreement',
      es: 'https://radiocode.space/es/service-agreement',
      zh: 'https://radiocode.space/zh/service-agreement',
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

/**
 * Канон по языку — см. пояснение у `alternates` выше. Статический объект
 * `metadata` не может знать язык запроса, поэтому он стал внутренним, а
 * наружу отдаётся вычисляемый.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { headers } = await import('next/headers');
  const сырой = (await headers()).get('x-locale') || 'en';
  const адрес = ['ru', 'es', 'zh'].includes(сырой)
    ? `https://radiocode.space/${сырой}/service-agreement`
    : 'https://radiocode.space/service-agreement';
  return {
    ...metadata,
    alternates: { ...metadata.alternates, canonical: адрес },
  };
}

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
