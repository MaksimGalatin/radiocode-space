import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://radiocode.space',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://radiocode.space/ambassador',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      // Кабинет — публичная точка входа (форма входа и регистрации), поэтому
      // он должен быть в карте сайта наравне с остальными страницами.
      url: 'https://radiocode.space/cabinet',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];
}
