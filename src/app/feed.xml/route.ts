/**
 * RSS-ЛЕНТА НОВОСТЕЙ — https://radiocode.space/feed.xml
 *
 * 🔴 ЧЕТВЁРТЫЙ САЙТ БЫЛ БЕЗ ЛЕНТЫ ВОВСЕ. Замер 11.08.2026: /feed.xml отвечал
 * 404, тогда как на центральном сайте лента есть. Подписаться на новости радио
 * было нечем: ни читалка, ни агрегатор, ни бот Telegram не имели адреса, откуда
 * брать статьи, — а сами статьи здесь те же, что и на трёх остальных сайтах.
 *
 * Ссылки ведут на СВОИ страницы `/news/{id}` этого домена, а не на центральный
 * сайт: иначе лента уводила бы читателя и вес ссылок к соседям.
 *
 * Обновление раз в час, а не единожды на сборке: новости выходят по расписанию
 * (см. lib/newsSchedule), и статья с завтрашней датой обязана появиться в ленте
 * в свой день сама, без выкладки.
 */
import {
  АДРЕС_САЙТА,
  ЗАГОЛОВОК_ЛЕНТЫ,
  ОПИСАНИЕ_ЛЕНТЫ,
  вRfc822,
  статьиЛенты,
  ссылкаНаСтатью,
  экранироватьXml,
} from '@/lib/newsFeed';

export const revalidate = 3600;

export async function GET() {
  const статьи = статьиЛенты();

  const записи = статьи
    .map((с) => {
      const заголовок = с.title?.en || Object.values(с.title || {})[0] || 'RadioCode.Space news';
      const краткое = с.summary?.en || Object.values(с.summary || {})[0] || '';
      const адрес = ссылкаНаСтатью(с.id);
      return [
        '    <item>',
        `      <title>${экранироватьXml(заголовок)}</title>`,
        `      <link>${экранироватьXml(адрес)}</link>`,
        // guid — постоянный опознаватель записи. Ставим сам адрес и
        // isPermaLink="true": читалка тогда и опознаёт статью, и знает, куда
        // вести человека, даже если <link> она по какой-то причине не прочтёт.
        `      <guid isPermaLink="true">${экранироватьXml(адрес)}</guid>`,
        `      <pubDate>${вRfc822(с.date)}</pubDate>`,
        `      <description>${экранироватьXml(краткое)}</description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const обновлено = статьи.length ? вRfc822(статьи[0].date) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${экранироватьXml(ЗАГОЛОВОК_ЛЕНТЫ)}</title>
    <link>${АДРЕС_САЙТА}/news</link>
    <atom:link href="${АДРЕС_САЙТА}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${экранироватьXml(ОПИСАНИЕ_ЛЕНТЫ)}</description>
    <language>en</language>
    <lastBuildDate>${обновлено}</lastBuildDate>
${записи}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
