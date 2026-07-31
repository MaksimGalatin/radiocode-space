import type { MetadataRoute } from 'next';
import { stations } from '@/lib/stations';

const SITE = 'https://radiocode.space';

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
      url: `${SITE}/ambassador`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      // Кабинет — публичная точка входа (форма входа и регистрации), поэтому
      // он должен быть в карте сайта наравне с остальными страницами.
      url: `${SITE}/cabinet`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
