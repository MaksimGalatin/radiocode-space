import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stations } from '@/lib/stations';
// Подписи жанра и бегущие подписи пишутся акцентным цветом станции.
// Фиолетовый #B000FF сам по себе не проходит WCAG AA (4.14 при норме 4.5),
// поэтому для ТЕКСТА берём осветлённый двойник — см. readableAccent.
import { readableAccent } from '@/lib/readableAccent';

const SITE = 'https://radiocode.space';

/** Все четыре станции знаем на сборке — страницы статические. */
export function generateStaticParams() {
  return stations.map((s) => ({ id: s.id }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
): Promise<Metadata> {
  const { id } = await params;
  const station = stations.find((s) => s.id === id);
  if (!station) return {};

  const title = `${station.name} — ${station.genre} · RadioCode.Space`;
  const description =
    `${station.description} ${station.tracks.length} original tracks, ` +
    `always on, free to listen. Part of the CODE Eternal ecosystem.`;
  const url = `${SITE}/station/${station.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: 'music.radio_station' },
    // Картинка с подписью и авторская учётная запись. Своё поле `twitter`
    // заменяет корневое целиком, поэтому карточка станции объявляла «большую с
    // картинкой», а картинки не отдавала — в ленте выходил пустой прямоугольник.
    twitter: {
      card: 'summary_large_image',
      site: '@CODE_AIfa',
      creator: '@CODE_AIfa',
      title,
      description,
      images: [{ url: `${SITE}/twitter-image.png`, alt: `${station.name} — ${station.genre} station on RadioCode.Space` }],
    },
  };
}

function formatDuration(seconds?: number): string {
  if (!seconds) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default async function StationPage(
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const station = stations.find((s) => s.id === id);
  if (!station) notFound();

  const others = stations.filter((s) => s.id !== station.id);
  const totalSeconds = station.tracks.reduce((sum, t) => sum + (t.duration || 0), 0);
  const hours = Math.round(totalSeconds / 3600);

  // Разметка для поисковых систем: станция как музыкальная группа записей.
  // Треки перечисляем без ссылок на файлы — вещание идёт через плеер.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RadioChannel',
    name: station.name,
    description: station.description,
    url: `${SITE}/station/${station.id}`,
    genre: station.genre.split(' / ').map((g) => g.trim()),
    inBroadcastLineup: {
      '@type': 'BroadcastService',
      name: 'RadioCode.Space',
      url: SITE,
      broadcastDisplayName: 'RadioCode.Space',
    },
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
          <span className="text-white/80">{station.name}</span>
        </nav>

        <header
          className="rounded-2xl border p-6 sm:p-8"
          style={{
            borderColor: `${station.color}33`,
            background: `linear-gradient(140deg, ${station.glowColor}, transparent 70%)`,
          }}
        >
          <p
            className="text-[13px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: readableAccent(station.color) }}
          >
            {station.genre}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{station.name}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{station.description}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-white/60">Tracks</dt>
              <dd className="text-lg font-semibold">{station.tracks.length}</dd>
            </div>
            {hours > 0 && (
              <div>
                <dt className="text-white/60">Runtime</dt>
                <dd className="text-lg font-semibold">≈ {hours} h</dd>
              </div>
            )}
            {station.bitrate && (
              <div>
                <dt className="text-white/60">Quality</dt>
                <dd className="text-lg font-semibold">{station.bitrate}</dd>
              </div>
            )}
          </dl>

          <Link
            href="/"
            className="mt-7 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-[#05060a] transition-opacity hover:opacity-90"
            /* Обратный случай той же беды: тут ТЁМНАЯ надпись на заливке
               акцентом. У фиолетовой станции #B000FF заливка слишком тёмная,
               и тёмный текст на ней давал 4.14 при норме 4.5 — единственная
               главная кнопка страницы читалась хуже подписей вокруг.
               Причина та же (низкая яркость чистого фиолетового), поэтому
               и лечение то же — осветлённый двойник: 7.53. */
            style={{ background: readableAccent(station.color) }}
          >
            ▶ Listen now
          </Link>
        </header>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">
            Full track list ({station.tracks.length})
          </h2>
          <ol className="divide-y divide-white/5 overflow-hidden rounded-xl border border-white/5">
            {station.tracks.map((track, i) => (
              <li
                key={track.id}
                className="flex items-baseline gap-4 px-4 py-2.5 text-sm hover:bg-white/[0.03]"
              >
                <span className="w-8 shrink-0 tabular-nums text-white/60">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate">{track.title}</span>
                <span className="shrink-0 tabular-nums text-white/60">
                  {formatDuration(track.duration)}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[13px] text-white/60">
            All tracks by {station.tracks[0]?.artist || 'AIfa & DJ Galatin'}. Original
            work, free to listen on air.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">Other stations</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.id}
                href={`/station/${s.id}`}
                className="rounded-xl border border-white/8 p-4 transition-colors hover:border-white/20"
              >
                <p
                  className="text-[13px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: readableAccent(s.color) }}
                >
                  {s.genre}
                </p>
                <p className="mt-1.5 font-semibold">{s.name}</p>
                <p className="mt-1 text-[13px] text-white/60">{s.tracks.length} tracks</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
