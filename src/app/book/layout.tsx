import { LanguageProvider } from '@/lib/LanguageContext';

// 🔴 БЕЗ ЭТОЙ ОБЁРТКИ СТРАНИЦА ОТДАВАЛА 500 НА БОЕВОМ.
//
// Книга взята с aifa.digital, где `LanguageProvider` смонтирован в корневом
// макете. На radiocode.space его там нет: сайт живёт на своём словаре
// radioI18n. Клиентский компонент книги зовёт `useLanguage()`, тот не
// находит контекст и падает уже в браузере.
//
// Ни типы, ни сборка этого не видят: `tsc --noEmit` дал 0, `next build`
// собрал маршрут, и только живой запрос вернул 500. Поэтому проверка
// боевого запросом обязательна — сборка не заменяет её.
//
// Провайдер ставится точечно на маршрут, как у оферты, страницы доступности
// и трёх юридических страниц.
export default function МакетКниги({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
