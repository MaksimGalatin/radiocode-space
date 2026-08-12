import type { Metadata } from "next";
import { ТАРИФЫ, ценаСтрокой } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Ambassador Program — RADIOCODE",
  description:
    "Become a CODE Eternal Ambassador — an honest partnership where you spread real products and earn a commission on real sales. Free entry, no spam, no fake jobs.",
  alternates: { canonical: "https://radiocode.space/ambassador" },
};

/**
 * РАЗМЕТКА ТАРИФОВ (Product + Offer).
 *
 * ЗАЧЕМ ИМЕННО ЗДЕСЬ. Цены на этом сайте показаны ровно в одном публичном
 * месте — в блоке «источники дохода» на /ambassador («Spark $15 / Family $100 /
 * Digital DNA $1 000 разово за устройство, далее $200/мес»). Вкладка тарифов в
 * кабинете закрыта от индексации (noindex), поэтому размечать там нечего.
 * Разметка обязана стоять на той же странице, где цифру видит человек: иначе
 * поисковик считает её обещанием того, чего на странице нет.
 *
 * ЦЕНЫ НЕ ВПИСАНЫ РУКАМИ. Они собираются из src/lib/pricing.ts — того самого
 * единственного источника, из которого их берут кабинет, оферта и Дополнение A4.
 * Впиши сюда число вручную — и оно молча разойдётся с остальными тремя местами,
 * а заметит это человек, увидевший в выдаче Google не ту сумму, что в кабинете.
 *
 * `priceCurrency: 'USD'` обязателен: цена без валюты для Google — не цена.
 */
const РАЗМЕТКА_ТАРИФОВ = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://radiocode.space/ambassador#tiers",
  name: "CODE Eternal — subscription tiers",
  description:
    "Access to the AIfa assistants and eternal memory of the CODE Eternal ecosystem: three tiers, from basic access to a full digital-continuity package.",
  brand: { "@type": "Brand", name: "CODE Eternal" },
  url: "https://radiocode.space/ambassador",
  offers: ТАРИФЫ.map((т) => ({
    "@type": "Offer",
    name: т.название.en,
    // Для «Цифровой ДНК» главная сумма — разовая за устройство; помесячная
    // названа в описании строкой из того же pricing.ts, чтобы ни одна цифра не
    // жила в этом файле сама по себе.
    price: String(т.разово || т.вМесяц),
    priceCurrency: "USD",
    category: т.разово ? "OneTime" : "Subscription",
    availability: "https://schema.org/InStock",
    url: "https://radiocode.space/ambassador",
    description: ценаСтрокой(т.код, "en"),
  })),
};

export default function AmbassadorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Метка политики содержимого этому тегу не нужна: application/ld+json
          не выполняется браузером, и CSP его не режет — так же, как остальную
          разметку на сайте (корневая раскладка, /music, /glossary, станции). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(РАЗМЕТКА_ТАРИФОВ) }}
      />
      {children}
    </>
  );
}
