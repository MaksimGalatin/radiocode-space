/**
 * РАЗМЕТКА ТАРИФОВ ДЛЯ ПОИСКОВИКОВ.
 *
 * Google и Bing показывают цену прямо в выдаче, если тариф размечен как Product
 * с Offer. Без разметки они цену не покажут, а человек не поймёт, сколько стоит,
 * пока не откроет страницу — и часто не откроет.
 *
 * Цены берутся из ТАРИФЫ (lib/pricing.ts), а не переписываются здесь руками.
 * Тарифы едины для четырёх сайтов; вторая копия чисел разошлась бы с первой при
 * первом же изменении, и в выдаче висела бы старая цена.
 *
 * Разметка ничего не рисует на странице: это <script type="application/ld+json">.
 */
import { ТАРИФЫ } from './pricing';

/** Продавец — обязательное поле для карточек товара в поиске Google. */
const ПРОДАВЕЦ = { '@type': 'Organization', name: 'CODE Eternal', url: 'https://codeofdigitaleternity.com' } as const;

/** Описание тарифа для разметки: берём пояснение, иначе собираем из названия и цены. */
function описаниеТарифа(т: { название: Record<string, string>; вМесяц: number; разово: number;
                            разовоПояснение?: Record<string, string> }, язык: string): string {
  const имя = т.название[язык] ?? т.название.en;
  const пояснение = т.разовоПояснение?.[язык] ?? т.разовоПояснение?.en;
  if (пояснение) return пояснение;
  return т.разово
    ? `${имя}: $${т.разово} единовременно, далее $${т.вМесяц} в месяц.`
    : `${имя}: $${т.вМесяц} в месяц.`;
}

export function разметкаТарифов(адресСайта: string, язык: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CODE Eternal — тарифы вечной памяти',
    url: `${адресСайта}/#pricing`,
    itemListElement: ТАРИФЫ.map((т, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: т.название[язык] ?? т.название.en,
        /**
         * ОПИСАНИЕ, АРТИКУЛ, КАРТИНКА И ПРОДАВЕЦ (16.08.2026).
         *
         * Google Search Console прислал два письма: «Описания товара» и
         * «Данные о товарах продавца». Причина простая — у товара не было
         * поля `description`, а у предложения не было `seller`. Без них
         * карточка товара в поиске не собирается, и в консоли это выглядит
         * как «обнаружены новые проблемы».
         */
        description: описаниеТарифа(т, язык),
        sku: `code-eternal-${т.код}`,
        image: `${адресСайта}/logo.png`,
        brand: { '@type': 'Brand', name: 'CODE Eternal' },
        offers: т.разово
          ? [
              {
                '@type': 'Offer',
                price: String(т.разово),
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                seller: ПРОДАВЕЦ,
                url: `${адресСайта}/#pricing`,
                description: т.разовоПояснение?.[язык] ?? т.разовоПояснение?.en,
              },
              {
                '@type': 'Offer',
                price: String(т.вМесяц),
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                seller: ПРОДАВЕЦ,
                url: `${адресСайта}/#pricing`,
                priceSpecification: {
                  '@type': 'UnitPriceSpecification',
                  price: String(т.вМесяц),
                  priceCurrency: 'USD',
                  billingDuration: 1,
                  billingIncrement: 1,
                  unitCode: 'MON',
                },
              },
            ]
          : {
              '@type': 'Offer',
              price: String(т.вМесяц),
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              seller: ПРОДАВЕЦ,
              url: `${адресСайта}/#pricing`,
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: String(т.вМесяц),
                priceCurrency: 'USD',
                billingDuration: 1,
                billingIncrement: 1,
                unitCode: 'MON',
              },
            },
      },
    })),
  };
}
