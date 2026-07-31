import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stations } from '@/lib/stations';

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
    twitter: { card: 'summary_large_image', title, description },
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
            className="text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: station.color }}
          >
            {station.genre}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{station.name}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{station.description}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-white/45">Tracks</dt>
              <dd className="text-lg font-semibold">{station.tracks.length}</dd>
            </div>
            {hours > 0 && (
              <div>
                <dt className="text-white/45">Runtime</dt>
                <dd className="text-lg font-semibold">≈ {hours} h</dd>
              </div>
            )}
            {station.bitrate && (
              <div>
                <dt className="text-white/45">Quality</dt>
                <dd className="text-lg font-semibold">{station.bitrate}</dd>
              </div>
            )}
          </dl>

          <Link
            href="/"
            className="mt-7 inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-[#05060a] transition-opacity hover:opacity-90"
            style={{ background: station.color }}
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
                <span className="w-8 shrink-0 tabular-nums text-white/35">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate">{track.title}</span>
                <span className="shrink-0 tabular-nums text-white/35">
                  {formatDuration(track.duration)}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-xs text-white/40">
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
                  className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                  style={{ color: s.color }}
                >
                  {s.genre}
                </p>
                <p className="mt-1.5 font-semibold">{s.name}</p>
                <p className="mt-1 text-xs text-white/45">{s.tracks.length} tracks</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
