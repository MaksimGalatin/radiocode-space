import type { Metadata } from "next";

// Приватная зона: закрыта от индексации явным noindex (robots.txt только запрещает обход).
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  /**
   * 🔴 КАБИНЕТ ОБЪЯВЛЯЛ СЕБЯ КОПИЕЙ ГЛАВНОЙ СТРАНИЦЫ.
   *
   * Поля `alternates` здесь не было, а Next в таком случае подставляет значение
   * из корневой раскладки — там жёстко записан `canonical:
   * "https://radiocode.space"`, то есть адрес ГЛАВНОЙ. Кабинет отдавал
   * `<link rel="canonical" href="https://radiocode.space">` и одновременно
   * `noindex` — два взаимоисключающих указания на одной странице. Ровно эта же
   * поломка уже была найдена и починена на страницах цифрового паспорта
   * (см. src/app/passport/[id]/page.tsx), но кабинет тогда не тронули.
   *
   * Здесь она не стоила выдачи (страница и так закрыта), но оставлять её нельзя:
   * запись «эта страница — дубль главной» помогает склеивать адреса в поиске, и
   * поставлена она была не нами, а по недосмотру. Ссылка на себя — правда.
   *
   * Языковых ссылок сознательно нет: кабинет не индексируется, объявлять его
   * переводы поисковику незачем.
   */
  alternates: { canonical: 'https://radiocode.space/cabinet' },
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
