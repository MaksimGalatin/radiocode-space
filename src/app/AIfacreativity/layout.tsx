import { LanguageProvider } from '@/lib/LanguageContext';

// На radiocode.space `LanguageProvider` в корневом макете НЕ смонтирован — сайт живёт на своём
// словаре radioI18n. Страница творчества взята с aifa.works, её клиентский компонент зовёт
// `useLanguage()` и без обёртки отдавал 500 (замер 30.09.2026 на локальном сервере). Провайдер
// ставится точечно на маршрут — как у книги, оферты и страницы доступности.
export default function МакетТворчества({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
