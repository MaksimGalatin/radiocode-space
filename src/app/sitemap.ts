import type { MetadataRoute } from 'next';
import { stations } from '@/lib/stations';
import newsDataВесь from '@/data/news.json';
import { тольковышедшие } from '@/lib/newsSchedule';

const SITE = 'https://radiocode.space';

/** «12.08.2026» → Date. Непонятная дата даёт сегодняшний день. */
function датаСтатьи(д: string): Date {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(д || ''));
  return m ? new Date(`${m[3]}-${m[2]}-${m[1]}T00:00:00Z`) : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Страницы станций: у каждой свой полный список треков и своя разметка.
    // Это единственные страницы сайта с уникальным текстовым содержимым в
    // объёме, поэтому приоритет у них высокий.
    ...stations.map((s) => ({
      url: `${SITE}/station/${s.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    {
      // Каталог всей музыки. До него музыка в карту сайта не попадала вовсе:
      // у треков нет собственных адресов, все 596 живут внутри страниц
      // станций. Одна плотная страница с разметкой MusicPlaylist делает их
      // машиночитаемыми — в отличие от шестисот «тонких» страниц, которые
      // размыли бы вес самих станций.
      url: `${SITE}/music`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE}/ambassador`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      // Глоссарий на 28 терминов. Страница /glossary есть на всех четырёх
      // сайтах и на всех трёх остальных стоит в карте сайта
      // (codeofdigitaleternity.com, aifa.digital, aifa.works) — здесь её не
      // было вместе с самой страницей. Текст плотный и уникальный, меняется
      // редко, отсюда monthly.
      url: `${SITE}/glossary`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Лента новостей и все вышедшие статьи. До появления раздела на этом сайте
    // новостей не было вовсе — /news отвечал 404, — и в карте их, разумеется,
    // тоже не было. Отсечка `тольковышедшие` здесь обязательна: без неё карта
    // сайта выдала бы поисковику подготовленный заранее материал раньше его
    // даты, то есть отменила бы отложенную публикацию с другой стороны.
    {
      url: `${SITE}/news`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...(тольковышедшие(newsDataВесь as Array<{ date?: string }>) as Array<{ id: string; date: string }>).map((с) => ({
      url: `${SITE}/news/${с.id}`,
      lastModified: датаСтатьи(с.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // 🔴 КАБИНЕТ ИЗ КАРТЫ САЙТА УБРАН.
    //
    // Здесь стояла запись `${SITE}/cabinet` с пояснением «кабинет — публичная
    // точка входа, поэтому он должен быть в карте наравне с остальными».
    // Пояснение противоречило самому кабинету: src/app/cabinet/layout.tsx
    // задаёт `robots: { index: false, follow: false }`. Замерено на живом сайте
    // 08.08.2026 — https://radiocode.space/cabinet отдаёт
    // `<meta name="robots" content="noindex, nofollow">` и при этом лежит в
    // карте сайта.
    //
    // Карта сайта — это список «вот что индексируй». Указывать в ней страницу,
    // которая тут же просит себя не индексировать, — прямое противоречие: в
    // Search Console оно всплывает как ошибка «Отправленный URL помечен
    // noindex», и такие записи снижают доверие ко всей карте. Из четырёх наших
    // сайтов /cabinet в карте был только здесь — на трёх остальных его нет.
  ];
}
