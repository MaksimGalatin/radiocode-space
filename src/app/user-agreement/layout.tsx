import { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';

// Единое пользовательское соглашение экосистемы CODE. Один и тот же документ по
// одному и тому же адресу на четырёх сайтах; отличаются только заголовок вкладки
// и канонический адрес, чего требует разметка для поисковых систем.
/**
 * 🔴 КАНОН ПО ЯЗЫКУ, А НЕ ЛИТЕРАЛОМ. Правка 11.09.2026.
 *
 * Здесь стоял один жёсткий адрес на все языки, и русская версия объявляла
 * каноном английскую. Замер живьём показал, насколько это несправедливо:
 *
 *     /user-agreement            кириллицы    181, canonical /user-agreement
 *     /ru/user-agreement         кириллицы 74 003, canonical /user-agreement
 *
 * То есть русский документ ЕСТЬ, он полный, карта сайта ведёт именно на
 * `/ru/user-agreement` — а сам документ говорит поисковику «я копия
 * английского, не индексируй меня».
 *
 * Формы адресов в `languages` тоже приведены к префиксу: карта сайта
 * называет `/ru/...`, а не `?lang=ru` (проверено — метки в карте нет).
 * Прежний комментарий про `?lang=` устарел вместе с той формой.
 */
async function каноническийАдрес(): Promise<string> {
  const { headers } = await import('next/headers');
  const сырой = (await headers()).get('x-locale') || 'en';
  return ['ru', 'es', 'zh'].includes(сырой)
    ? `https://radiocode.space/${сырой}/user-agreement`
    : 'https://radiocode.space/user-agreement';
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'User Agreement | CODE Ecosystem',
    description:
      'The single user agreement governing the CODE ecosystem: cabinet, eternal memory, GALATIN points, subscription tiers and the ambassador programme. Identical on all four sites.',
    alternates: {
      canonical: await каноническийАдрес(),
      languages: {
        en: 'https://radiocode.space/user-agreement',
        ru: 'https://radiocode.space/ru/user-agreement',
        es: 'https://radiocode.space/es/user-agreement',
        zh: 'https://radiocode.space/zh/user-agreement',
        'x-default': 'https://radiocode.space/user-agreement',
      },
    },
  };
}

export default function UserAgreementLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
