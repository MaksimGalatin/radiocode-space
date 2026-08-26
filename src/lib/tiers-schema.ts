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
        image: `${адресСайта}/code-cover-512.png`,
        brand: { '@type': 'Brand', name: 'CODE Eternal' },
        offers: т.разово
          ? [
              {
                '@type': 'Offer',
                price: String(т.разово),
                priceCurrency: 'USD',
                validFrom: '2026-08-11',
                priceValidUntil: '2026-12-31',
                availability: 'https://schema.org/InStock',
                seller: ПРОДАВЕЦ,
                url: `${адресСайта}/#pricing`,
                description: т.разовоПояснение?.[язык] ?? т.разовоПояснение?.en,
              },
              {
                '@type': 'Offer',
                price: String(т.вМесяц),
                priceCurrency: 'USD',
                validFrom: '2026-08-11',
                priceValidUntil: '2026-12-31',
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
              validFrom: '2026-08-11',
              priceValidUntil: '2026-12-31',
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
