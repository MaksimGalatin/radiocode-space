import type { Metadata } from 'next';
import Link from 'next/link';
import { stations } from '@/lib/stations';
import { readableAccent } from '@/lib/readableAccent';

const SITE = 'https://radiocode.space';

/**
 * КАТАЛОГ ВСЕЙ МУЗЫКИ — одна страница на все станции.
 *
 * ЗАЧЕМ ОНА ПОЯВИЛАСЬ. В карте сайта были только станции, и музыка в поиск не
 * попадала вовсе: у треков нет собственных адресов, все 596 живут внутри
 * страниц станций и в разметку не выносились.
 *
 * ПОЧЕМУ НЕ 596 ОТДЕЛЬНЫХ СТРАНИЦ. Страница с одним названием, исполнителем и
 * плеером — это «тонкая» страница. Поисковики их не любят и наказывают ими
 * весь домен: шестьсот почти одинаковых адресов размыли бы вес самих станций,
 * которые сейчас ранжируются нормально. Один плотный каталог даёт то же
 * покрытие запросов без этого риска.
 *
 * ЧТО ЗДЕСЬ ЕСТЬ ДЛЯ ПОИСКОВИКА. Разметка MusicPlaylist на каждую станцию, а
 * внутри — MusicRecording на каждый трек, с длительностью в формате ISO 8601.
 * Так все 596 названий становятся машиночитаемыми, а не просто строчками в
 * списке.
 *
 * Страница собирается из того же `stations`, что и всё остальное: добавится
 * новая станция — каталог обновится сам, без правок здесь.
 */

const title = 'All music — 162 original songs in 596 versions · RadioCode.Space';
const description =
  'Full catalogue of every track on RadioCode.Space: 596 original recordings ' +
  'across four stations, written by a human and an artificial intelligence ' +
  'together. Free to listen, no advertising, no sign-up.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE}/music` },
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
    images: [{ url: `${SITE}/twitter-image.png`, alt: 'RadioCode.Space — full catalogue of 162 original songs in 596 versions' }],
  },
};

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

export default function MusicPage() {
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
    <main className="min-h-screen bg-[#05060a] text-white">
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
          <span className="text-white/80">All music</span>
        </nav>

        <header className="rounded-2xl border border-white/8 p-6 sm:p-8">
          {/* Здесь и ниже: было text-white/45 — контраст 4.47 при норме 4.5,
              то есть брак с крошечным недобором, который на глаз выглядит
              «почти нормально» и потому годами не замечается.
              text-white/60 даёт 7.33. */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Full catalogue
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {total} original tracks
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Everything playing on RadioCode.Space, across {stations.length} stations.
            Written by a human and an artificial intelligence together — nothing
            licensed, nothing borrowed. Free to listen, no advertising and no sign-up.
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-white/60">Tracks</dt>
              <dd className="text-lg font-semibold">{total}</dd>
            </div>
            <div>
              <dt className="text-white/60">Stations</dt>
              <dd className="text-lg font-semibold">{stations.length}</dd>
            </div>
            {hours > 0 && (
              <div>
                <dt className="text-white/60">Runtime</dt>
                <dd className="text-lg font-semibold">≈ {hours} h</dd>
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
                  {station.genre}
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
              <p className="text-sm text-white/60">{station.tracks.length} tracks</p>
            </div>

            <p className="mt-2 max-w-2xl text-sm text-white/60">{station.description}</p>

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
          All recordings are original work by AIfa &amp; DJ Galatin. Nothing here is
          licensed from anyone, which is why listening costs nothing.{' '}
          <Link href="/" className="text-white/70 hover:text-white">
            Back to the radio
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
