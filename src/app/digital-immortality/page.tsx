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
import type { Metadata } from 'next';
import { ТИПЫ_ЛЕНТ } from '@/lib/feedLinks';
import { headers } from 'next/headers';
import DigitalImmortalityClient from './digital-immortality-client';
import { ТАРИФЫ, type КодТарифа } from '@/lib/pricing';

// Locale-aware canonical + hreflang. Locale comes from the x-locale request
// header (middleware sets it from ?lang=). EN = bare /digital-immortality,
// others carry ?lang=. Mirrors src/app/news/[slug]/page.tsx.
type Loc = 'en' | 'ru' | 'es' | 'zh';
const LOCALES: Loc[] = ['en', 'ru', 'es', 'zh'];
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';
const PATH = '/digital-immortality';

function resolveLocale(v: string | null): Loc {
  return (LOCALES as string[]).includes(v || '') ? (v as Loc) : 'en';
}

export async function generateMetadata(): Promise<Metadata> {
  const loc = resolveLocale((await headers()).get('x-locale'));
  const canonical = loc === 'en' ? `${BASE}${PATH}` : `${BASE}${PATH}?lang=${loc}`;
  return {
    title: 'What Is Digital Immortality | CODE — Code Of Digital Eternity',
    description:
      'Digital immortality is the continuous preservation of a person’s dialogues, knowledge, and personality in a form an AI assistant can reactivate — realized through the PADAM memory framework, Arweave, Solana cNFT, and the $GALATIN token. A vision and direction of development, not a guarantee.',
    alternates: {
      canonical,
      languages: {
        en: `${BASE}${PATH}`,
        ru: `${BASE}${PATH}?lang=ru`,
        es: `${BASE}${PATH}?lang=es`,
        zh: `${BASE}${PATH}?lang=zh`,
        'x-default': `${BASE}${PATH}`,
      },
      // Ленты подписки. Свой блок alternates затирает корневой ЦЕЛИКОМ,
      // поэтому набор дописан и сюда — иначе на этой странице читалка
      // ленту не найдёт, и внешне это никак не проявится.
      types: ТИПЫ_ЛЕНТ,
    },
  };
}

/**
 * РАЗМЕТКА ТАРИФОВ ДЛЯ ПОИСКОВИКА (Product + Offer).
 *
 * ЗАЧЕМ. Три тарифа перечислены прямо на этой странице — и в разделе «Тарифы и
 * что они открывают», и в вопросах-ответах. Для человека это текст, для
 * поисковика — ничто: цены не были размечены нигде на сайте, и в выдаче они не
 * показывались. Product с Offer — единственный способ показать цену в сниппете.
 *
 * 🔴 ЦЕНЫ БЕРУТСЯ ИЗ lib/pricing.ts, а не вписываются сюда числами. Тарифы уже
 * однажды разошлись между кабинетом, офертой и Дополнением A4 именно потому,
 * что сумма жила в трёх местах. Четвёртым местом эта разметка не станет:
 * поменяется цена в pricing.ts — поменяется и здесь.
 *
 * Описания — дословно те, что человек видит на этой же странице (английский
 * блок в digital-immortality-client.tsx). Разметка обязана описывать то, что
 * на странице есть: обещание того, чего не видно, Google считает обманом.
 */
function разметкаТарифов(): string[] {
  const ОПИСАНИЯ: Record<КодТарифа, string> = {
    spark:
      "Base access to AIfa's AI assistants and memory preservation — the entry point for personal use.",
    family:
      'Extended limits, personalized knowledge bases, family access, and eternal memory — for those assembling a shared archive for several people.',
    dna:
      'The full digital-immortality complex — a personal secured circuit and long-term fixation of the personality in the blockchain.',
  };

  return ТАРИФЫ.map((т) => {
    // Ежемесячная часть есть у всех трёх тарифов.
    const заМесяц = {
      '@type': 'Offer',
      price: String(т.вМесяц),
      priceCurrency: 'USD',
      validFrom: '2026-08-11',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      url: `${BASE}${PATH}`,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: String(т.вМесяц),
        priceCurrency: 'USD',
        unitCode: 'MON',
        billingDuration: 1,
        billingIncrement: 1,
      },
    };

    // У Цифровой ДНК к подписке добавляется разовый платёж за устройство —
    // это второе предложение, а не другая цена того же самого.
    const разовый = т.разово
      ? {
          '@type': 'Offer',
        // 🔴 Google Search Console, письма 27.08.2026 по пяти сайтам:
        // «Данные о товарах продавца» и «Описания товара». У Offer не
        // было ни `description`, ни `seller` — без них карточка не
        // попадает в расширенные результаты поиска.
        seller: { '@type': 'Organization', name: 'CODE Eternal', url: 'https://codeofdigitaleternity.com' },
          price: String(т.разово),
          priceCurrency: 'USD',
          validFrom: '2026-08-11',
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          url: `${BASE}${PATH}`,
          description: т.разовоПояснение?.en ?? 'one-time per device',
        }
      : null;

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${BASE}${PATH}#tier-${т.код}`,
      name: т.название.en,
      alternateName: [т.название.ru, т.название.es, т.название.zh],
      description: ОПИСАНИЯ[т.код],
      image: `${BASE}/code-cover.png`,
      brand: { '@type': 'Brand', name: 'CODE Eternal' },
      category: 'AI memory subscription',
      offers: разовый ? [разовый, заМесяц] : заМесяц,
    });
  });
}

export default function DigitalImmortalityPage() {
  const тарифыJsonLd = разметкаТарифов();
  return (
    <>
      {тарифыJsonLd.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <DigitalImmortalityClient />
    </>
  );
}
