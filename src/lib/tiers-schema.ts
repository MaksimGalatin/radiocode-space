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
        brand: { '@type': 'Brand', name: 'CODE Eternal' },
        offers: т.разово
          ? [
              {
                '@type': 'Offer',
                price: String(т.разово),
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: `${адресСайта}/#pricing`,
                description: т.разовоПояснение?.[язык] ?? т.разовоПояснение?.en,
              },
              {
                '@type': 'Offer',
                price: String(т.вМесяц),
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
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
