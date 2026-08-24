/**
 * `validFrom` В ПРЕДЛОЖЕНИЯХ (добавлено 24.08.2026).
 *
 * Письмо Search Console по codeofdigitaleternity.store: «Отсутствует поле
 * "validFrom" (в offers)». Проблема помечена как незначительная, но Google
 * прямо пишет, что такие со временем становятся критическими.
 *
 * Прочёсаны ВСЕ четыре сайта, а не только тот, о котором пришло письмо:
 * блоков Offer в исходниках 29, поле было у 0 из них.
 *
 * Даты не выдуманы и не берутся из текущего времени (иначе значение менялось
 * бы на каждой сборке и означало бы «действует с сегодня», что неправда).
 * Каждая измерена по истории репозитория — днём, когда цена начала
 * действовать. Меняешь цену — поменяй и дату.
 */
import type { Metadata } from "next";
import { ТАРИФЫ, ценаСтрокой } from "@/lib/pricing";

/**
 * Канон, зависящий от языка (16.08.2026).
 *
 * Карта сайта объявляет языковые версии `?lang=…` отдельными страницами, а
 * страница объявляла каноном адрес без метки — то есть «я копия английской».
 * Google верит канону: русская, испанская и китайская версии не индексировались
 * вовсе, о чём и пришло письмо Search Console. Канон должен ссылаться сам на
 * себя, тогда карта и страница говорят одно и то же.
 */
const ЯЗЫКИ_СТР = ['en', 'ru', 'es', 'zh'];
async function канонПоЯзыку(база: string): Promise<{ canonical: string; languages: Record<string, string> }> {
  const { headers } = await import('next/headers');
  const сырой = (await headers()).get('x-locale') || 'en';
  const яз = ЯЗЫКИ_СТР.includes(сырой) ? сырой : 'en';
  const адрес = (я: string) => (я === 'en' ? база : `${база}?lang=${я}`);
  return {
    canonical: адрес(яз),
    languages: { en: адрес('en'), ru: адрес('ru'), es: адрес('es'), zh: адрес('zh'), 'x-default': адрес('en') },
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: "Ambassador Program — RADIOCODE",
  description:
    "Become a CODE Eternal Ambassador — an honest partnership where you spread real products and earn a commission on real sales. Free entry, no spam, no fake jobs.",
  alternates: await канонПоЯзыку("https://radiocode.space/ambassador" + ''),
  };
}

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
    validFrom: "2026-08-11",
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
