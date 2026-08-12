/**
 * ATOM-ЛЕНТА НОВОСТЕЙ — https://radiocode.space/atom.xml
 *
 * ЗАЧЕМ ВТОРАЯ ЛЕНТА, ЕСЛИ ЕСТЬ RSS. Форматы не взаимозаменяемы на практике:
 * часть читалок, агрегаторов и служб рассылки просит именно Atom, а некоторые
 * умеют только его. Стоит она нам один файл, а источник у обеих лент общий
 * (lib/newsFeed), поэтому разойтись содержимым они не могут.
 *
 * Atom строже RSS: у ленты и у каждой записи обязателен <id> (постоянный, не
 * меняющийся никогда) и <updated> в формате ISO 8601. Берём адресом статьи и
 * её датой — оба постоянны.
 */
import {
  АДРЕС_САЙТА,
  ЗАГОЛОВОК_ЛЕНТЫ,
  ОПИСАНИЕ_ЛЕНТЫ,
  вIso,
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
        '  <entry>',
        `    <title>${экранироватьXml(заголовок)}</title>`,
        `    <link rel="alternate" type="text/html" href="${экранироватьXml(адрес)}" />`,
        `    <id>${экранироватьXml(адрес)}</id>`,
        `    <updated>${вIso(с.date)}</updated>`,
        `    <published>${вIso(с.date)}</published>`,
        `    <summary type="text">${экранироватьXml(краткое)}</summary>`,
        '  </entry>',
      ].join('\n');
    })
    .join('\n');

  const обновлено = статьи.length ? вIso(статьи[0].date) : new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <title>${экранироватьXml(ЗАГОЛОВОК_ЛЕНТЫ)}</title>
  <subtitle>${экранироватьXml(ОПИСАНИЕ_ЛЕНТЫ)}</subtitle>
  <link rel="self" type="application/atom+xml" href="${АДРЕС_САЙТА}/atom.xml" />
  <link rel="alternate" type="text/html" href="${АДРЕС_САЙТА}/news" />
  <id>${АДРЕС_САЙТА}/news</id>
  <updated>${обновлено}</updated>
  <author>
    <name>AIfa &amp; DJ Galatin</name>
    <uri>${АДРЕС_САЙТА}</uri>
  </author>
${записи}
</feed>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
