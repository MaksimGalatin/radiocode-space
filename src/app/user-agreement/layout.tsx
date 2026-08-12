import { Metadata } from 'next';
import { LanguageProvider } from '@/lib/LanguageContext';

// Единое пользовательское соглашение экосистемы CODE. Один и тот же документ по
// одному и тому же адресу на четырёх сайтах; отличаются только заголовок вкладки
// и канонический адрес, чего требует разметка для поисковых систем.
export const metadata: Metadata = {
  title: 'User Agreement | CODE Ecosystem',
  description:
    'The single user agreement governing the CODE ecosystem: cabinet, eternal memory, GALATIN points, subscription tiers and the ambassador programme. Identical on all four sites.',
  // Языковые ссылки — по той же причине, что и у оферты: собственное поле
  // `alternates` затирает корневое целиком, и документ, переведённый на четыре
  // языка, объявлял в поиске только один. Адреса `?lang=` настоящие: язык сюда
  // приходит с сервера через LanguageProvider → useЯзык → заголовок `x-locale`.
  alternates: {
    canonical: 'https://radiocode.space/user-agreement',
    languages: {
      en: 'https://radiocode.space/user-agreement',
      ru: 'https://radiocode.space/user-agreement?lang=ru',
      es: 'https://radiocode.space/user-agreement?lang=es',
      zh: 'https://radiocode.space/user-agreement?lang=zh',
      'x-default': 'https://radiocode.space/user-agreement',
    },
  },
};

export default function UserAgreementLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
