/**
 * ССЫЛКИ НА ЛЕНТЫ ПОДПИСКИ ДЛЯ <head>.
 *
 * 🔴 ПОЧЕМУ ОДИН НАБОР НА ВЕСЬ САЙТ. Next при слиянии метаданных заменяет блок
 * `alternates` ЦЕЛИКОМ, а не по полям (см. resolve-metadata.js, ветка
 * case 'alternates'). Значит любая страница, объявившая свой canonical или
 * hreflang, стирает ленты, объявленные в корневой раскладке. Мы уже наступали
 * на это с hreflang на /passport/[id].
 *
 * Поэтому набор живёт здесь и дописывается в КАЖДУЮ страницу, у которой есть
 * свой `alternates`. Забыл дописать — на этой странице читалка ленту не найдёт,
 * и внешне это никак не проявится.
 */
import type { Metadata } from 'next';

const САЙТ = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';

type ТипыЛент = NonNullable<NonNullable<Metadata['alternates']>['types']>;

export const ТИПЫ_ЛЕНТ: ТипыЛент = {
  'application/rss+xml': [{ url: `${САЙТ}/feed.xml`, title: 'CODE Eternal — News (RSS)' }],
  'application/atom+xml': [{ url: `${САЙТ}/atom.xml`, title: 'CODE Eternal — News (Atom)' }],
};
