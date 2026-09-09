import { LanguageProvider } from '@/lib/LanguageContext';

// 🔴 БЕЗ ЭТОЙ ОБЁРТКИ СТРАНИЦА ОТДАЁТ 500.
//
// На radiocode.space `LanguageProvider` не смонтирован в корневом макете:
// сайт живёт на своём словаре `radioI18n`. Юридические страницы взяты с
// aifa.digital, где провайдер стоит в корне, и без обёртки их обращение к
// контексту падает.
//
// Провайдер ставится точечно на маршрут, а не в корень: в корне он затронул
// бы каждую страницу сайта ради трёх. Тем же способом это сделано у оферты
// (`service-agreement/layout.tsx`) и у страницы доступности.
export default function ЮридическийМакет({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
