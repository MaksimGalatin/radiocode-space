import type { Metadata } from 'next';
import Link from 'next/link';
import { stations } from '@/lib/stations';
import { readableAccent } from '@/lib/readableAccent';
import { перевестиМетаданные } from '@/lib/meta-i18n';
import { STATION_I18N } from '@/lib/station-i18n';

const SITE = 'https://radiocode.space';

/**
 * КАТАЛОГ ВСЕЙ МУЗЫКИ — одна страница на все станции.
 *
 * ЗАЧЕМ ОНА ПОЯВИЛАСЬ. В карте сайта были только станции, и музыка в поиск не
 * попадала вовсе: у треков нет собственных адресов, все 1024 живут внутри
 * страниц станций и в разметку не выносились.
 *
 * ПОЧЕМУ НЕ 1024 ОТДЕЛЬНЫХ СТРАНИЦЫ. Страница с одним названием, исполнителем и
 * плеером — это «тонкая» страница. Поисковики их не любят и наказывают ими
 * весь домен: шестьсот почти одинаковых адресов размыли бы вес самих станций,
 * которые сейчас ранжируются нормально. Один плотный каталог даёт то же
 * покрытие запросов без этого риска.
 *
 * ЧТО ЗДЕСЬ ЕСТЬ ДЛЯ ПОИСКОВИКА. Разметка MusicPlaylist на каждую станцию, а
 * внутри — MusicRecording на каждый трек, с длительностью в формате ISO 8601.
 * Так все 1024 названия становятся машиночитаемыми, а не просто строчками в
 * списке.
 *
 * Страница собирается из того же `stations`, что и всё остальное: добавится
 * новая станция — каталог обновится сам, без правок здесь.
 */

const title = 'All music — 530 original songs in 1024 versions · RadioCode.Space';
const description =
  'Full catalogue of every track on RadioCode.Space: 1024 original recordings ' +
  'across six stations, written by a human and an artificial intelligence ' +
  'together. Free to listen, no advertising, no sign-up.';

/**
 * Канон, зависящий от языка (16.08.2026).
 *
 * Карта сайта объявляет языковые версии `?lang=…` отдельными страницами, а
 * страница объявляла каноном адрес без метки — то есть «я копия английской».
 * Google верит канону: русская, испанская и китайская версии не индексировались
 * вовсе, о чём и пришло письмо Search Console. Канон должен ссылаться сам на
 * себя, тогда карта и страница говорят одно и то же.
 */
const ЯЗЫКИ_СТР = ['en', 'ru', 'es', 'zh'];
async function канонПоЯзыку(база: string): Promise<{ canonical: string; languages: Record<string, string> }> {
  const { headers } = await import('next/headers');
  const сырой = (await headers()).get('x-locale') || 'en';
  const яз = ЯЗЫКИ_СТР.includes(сырой) ? сырой : 'en';
  const адрес = (я: string) => (я === 'en' ? база : `${база}?lang=${я}`);
  return {
    canonical: адрес(яз),
    languages: { en: адрес('en'), ru: адрес('ru'), es: адрес('es'), zh: адрес('zh'), 'x-default': адрес('en') },
  };
}

async function генерацияМетаданныхИсходная(): Promise<Metadata> {
  return {
  title,
  description,
  alternates: await канонПоЯзыку(`${SITE}/music` + ''),
  openGraph: { title, description, url: `${SITE}/music`, type: 'website' },
  // Карточка объявлена «большой с картинкой», но самой картинки не было: Next
  // при слиянии заменяет поле `twitter` целиком, поэтому общая картинка из
  // корневой раскладки сюда не доходила и в ленте выходил пустой прямоугольник.
  // `alt` — подпись для экранного диктора, `creator` — авторская учётная запись.
  twitter: {
    card: 'summary_large_image',
    site: '@CODE_AIfa',
    creator: '@CODE_AIfa',
    title,
    description,
    images: [{ url: `${SITE}/twitter-image.png`, alt: 'RadioCode.Space — full catalogue of 530 original songs in 1024 versions' }],
  },
  };
}

/** Длительность в формате ISO 8601 — того, который понимают поисковики. */
function isoDuration(seconds?: number): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `PT${m}M${s}S`;
}

function formatDuration(seconds?: number): string {
  if (!seconds) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Видимый текст страницы на четырёх языках (01.10.2026).
 *
 * Было: всё по-английски на /ru/music, /es/music и /zh/music — 65 английских
 * фраз на каждой (прогон переводов по sitemap 01.10). Названия песен не
 * переводятся — это названия; разметка для поисковиков тоже остаётся как есть.
 * Описания и жанры станций — из общего словаря ./station-i18n.
 */
type Яз = 'en' | 'ru' | 'es' | 'zh';

/** Русское множественное число: 1 трек, 2 трека, 5 треков, 11 треков, 21 трек. */
function мн(n: number, формы: [string, string, string]): string {
  const a = n % 10, b = n % 100;
  if (a === 1 && b !== 11) return формы[0];
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return формы[1];
  return формы[2];
}

const ТЕКСТ = {
  всяМузыка: { en: 'All music', ru: 'Вся музыка', es: 'Toda la música', zh: '全部音乐' },
  каталог: { en: 'Full catalogue', ru: 'Полный каталог', es: 'Catálogo completo', zh: '完整曲库' },
  заголовок: {
    en: (n: number) => `${n} original tracks`,
    ru: (n: number) => `${n} ${мн(n, ['оригинальный трек', 'оригинальных трека', 'оригинальных треков'])}`,
    es: (n: number) => `${n} pistas originales`,
    zh: (n: number) => `${n} 首原创曲目`,
  },
  вступление: {
    en: (n: number) => `Everything playing on RadioCode.Space, across ${n} stations. Written by a human and an artificial intelligence together — nothing licensed, nothing borrowed. Free to listen, no advertising and no sign-up.`,
    ru: (n: number) => `Всё, что звучит на RadioCode.Space, — ${n} ${мн(n, ['станция', 'станции', 'станций'])}. Написано человеком и искусственным интеллектом вместе: ничего не лицензировано и ничего не заимствовано. Слушать бесплатно, без рекламы и без регистрации.`,
    es: (n: number) => `Todo lo que suena en RadioCode.Space, en ${n} estaciones. Escrito por un ser humano y una inteligencia artificial juntos: nada licenciado, nada prestado. Gratis, sin publicidad y sin registro.`,
    zh: (n: number) => `RadioCode.Space 上播放的全部内容，共 ${n} 个电台。由人类与人工智能共同创作——没有任何授权内容，也没有任何借用。免费收听，无广告，无需注册。`,
  },
  треки: { en: 'Tracks', ru: 'Треки', es: 'Pistas', zh: '曲目' },
  станции: { en: 'Stations', ru: 'Станции', es: 'Estaciones', zh: '电台' },
  длительность: { en: 'Runtime', ru: 'Длительность', es: 'Duración', zh: '总时长' },
  часов: { en: (h: number) => `≈ ${h} h`, ru: (h: number) => `≈ ${h} ч`, es: (h: number) => `≈ ${h} h`, zh: (h: number) => `≈ ${h} 小时` },
  трековУСтанции: {
    en: (n: number) => `${n} tracks`,
    ru: (n: number) => `${n} ${мн(n, ['трек', 'трека', 'треков'])}`,
    es: (n: number) => `${n} pistas`,
    zh: (n: number) => `${n} 首曲目`,
  },
  подвал: {
    en: 'All recordings are original work by AIfa & DJ Galatin. Nothing here is licensed from anyone, which is why listening costs nothing.',
    ru: 'Все записи — оригинальные работы AIfa & DJ Galatin. Здесь нет ничего, взятого по лицензии у других, поэтому слушать бесплатно.',
    es: 'Todas las grabaciones son obra original de AIfa & DJ Galatin. Nada de esto tiene licencia de terceros, por eso escuchar no cuesta nada.',
    zh: '所有录音均为 AIfa & DJ Galatin 的原创作品。这里没有任何来自他人的授权内容，因此收听完全免费。',
  },
  назад: { en: 'Back to the radio', ru: 'Вернуться к радио', es: 'Volver a la radio', zh: '返回电台' },
};

export default async function MusicPage() {
  const { headers } = await import('next/headers');
  const сырой = (await headers()).get('x-locale') || 'en';
  const яз: Яз = (ЯЗЫКИ_СТР.includes(сырой) ? сырой : 'en') as Яз;

  const total = stations.reduce((n, s) => n + s.tracks.length, 0);
  const totalSeconds = stations.reduce(
    (sum, s) => sum + s.tracks.reduce((n, t) => n + (t.duration || 0), 0),
    0,
  );
  const hours = Math.round(totalSeconds / 3600);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': stations.map((station) => ({
      '@type': 'MusicPlaylist',
      '@id': `${SITE}/station/${station.id}#playlist`,
      name: station.name,
      description: station.description,
      url: `${SITE}/station/${station.id}`,
      numTracks: station.tracks.length,
      genre: station.genre.split(' / ').map((g) => g.trim()),
      track: station.tracks.map((t) => ({
        '@type': 'MusicRecording',
        name: t.title,
        byArtist: { '@type': 'MusicGroup', name: t.artist },
        duration: isoDuration(t.duration),
        inPlaylist: { '@id': `${SITE}/station/${station.id}#playlist` },
      })),
    })),
  };

  return (
    <div className="min-h-screen bg-[#05060a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto w-full max-w-4xl px-5 py-12">
        <nav className="mb-8 text-sm text-white/50">
          <Link href="/" className="hover:text-white">
            RadioCode.Space
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">{ТЕКСТ.всяМузыка[яз]}</span>
        </nav>

        <header className="rounded-2xl border border-white/8 p-6 sm:p-8">
          {/* Здесь и ниже: было text-white/45 — контраст 4.47 при норме 4.5,
              то есть брак с крошечным недобором, который на глаз выглядит
              «почти нормально» и потому годами не замечается.
              text-white/60 даёт 7.33. */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
            {ТЕКСТ.каталог[яз]}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {ТЕКСТ.заголовок[яз](total)}
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            {ТЕКСТ.вступление[яз](stations.length)}
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-white/60">{ТЕКСТ.треки[яз]}</dt>
              <dd className="text-lg font-semibold">{total}</dd>
            </div>
            <div>
              <dt className="text-white/60">{ТЕКСТ.станции[яз]}</dt>
              <dd className="text-lg font-semibold">{stations.length}</dd>
            </div>
            {hours > 0 && (
              <div>
                <dt className="text-white/60">{ТЕКСТ.длительность[яз]}</dt>
                <dd className="text-lg font-semibold">{ТЕКСТ.часов[яз](hours)}</dd>
              </div>
            )}
          </dl>
        </header>

        {stations.map((station) => (
          <section key={station.id} className="mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div>
                {/* Было 11px чистым station.color: у фиолетовой станции
                    #B000FF контраст 4.14 при норме 4.5 — подпись жанра
                    не дотягивала. readableAccent осветляет только фиолетовый. */}
                <p
                  className="text-[13px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: readableAccent(station.color) }}
                >
                  {STATION_I18N[station.id]?.genre[яз] ?? station.genre}
                </p>
                <h2 className="mt-1.5 text-xl font-semibold">
                  <Link
                    href={`/station/${station.id}`}
                    className="hover:underline"
                    style={{ textDecorationColor: station.color }}
                  >
                    {station.name}
                  </Link>
                </h2>
              </div>
              <p className="text-sm text-white/60">{ТЕКСТ.трековУСтанции[яз](station.tracks.length)}</p>
            </div>

            <p className="mt-2 max-w-2xl text-sm text-white/60">
              {STATION_I18N[station.id]?.description[яз] ?? station.description}
            </p>

            <ol className="mt-4 divide-y divide-white/5 overflow-hidden rounded-xl border border-white/5">
              {station.tracks.map((track, i) => (
                <li
                  key={track.id}
                  className="flex items-baseline gap-4 px-4 py-2.5 text-sm hover:bg-white/[0.03]"
                >
                  <span className="w-10 shrink-0 tabular-nums text-white/60">{i + 1}</span>
                  <span className="min-w-0 flex-1 truncate">{track.title}</span>
                  <span className="shrink-0 tabular-nums text-white/60">
                    {formatDuration(track.duration)}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <p className="mt-12 text-sm text-white/60">
          {ТЕКСТ.подвал[яз]}{' '}
          <Link href="/" className="text-white/70 hover:text-white">
            {ТЕКСТ.назад[яз]}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

// 30.09.2026: заголовок вкладки и описание — на языке страницы (ru/es/zh), словарь @/lib/meta-i18n.
// Английская версия не меняется: для en обёртка возвращает метаданные как есть.
export async function generateMetadata(
  ...аргументы: Parameters<typeof генерацияМетаданныхИсходная>
): Promise<Metadata> {
  return перевестиМетаданные(await генерацияМетаданныхИсходная(...аргументы));
}
