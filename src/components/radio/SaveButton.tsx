'use client';

import { Download, Check, Loader2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSocial } from '@/lib/radioSocial';
import { useCurrentLang, useRadioT } from '@/lib/radioI18n';
import { stations } from '@/lib/stations';
import { audioUrl } from '@/lib/audioCdn';
import { koanText, ISO639_2 } from '@/lib/koans';
import { buildId3v23, stripExistingTags } from '@/lib/id3-client';

const SITE = 'https://radiocode.space';
const CENTRAL = 'https://www.codeofdigitaleternity.com';

// Tag the track ENTIRELY in the browser: fetch the MP3 straight from R2 (free
// egress), stamp our ID3 tags (koan + cover + brand + the saver's referral deep
// link), and return a Blob. Never touches our server → zero compute / bandwidth.
// Returns null on any failure so the caller can fall back to the server route.
async function clientTag(trackId: string, lang: string, refCode: string | null): Promise<Blob | null> {
  try {
    const track = stations.flatMap((s) => s.tracks).find((t) => t.id === trackId);
    const station = stations.find((s) => s.tracks.some((t) => t.id === trackId));
    if (!track) return null;
    const mp3Res = await fetch(audioUrl(track.url), { cache: 'no-store' });
    if (!mp3Res.ok) return null;
    const mp3 = new Uint8Array(await mp3Res.arrayBuffer());

    let cover: { mime: string; data: Uint8Array } | null = null;
    try {
      const c = await fetch('/code-cover-512.png');
      if (c.ok) cover = { mime: 'image/png', data: new Uint8Array(await c.arrayBuffer()) };
    } catch { /* no cover */ }

    const deepLink = `${SITE}/?track=${encodeURIComponent(trackId)}` + (refCode ? `&ref=${encodeURIComponent(refCode)}` : '');
    const lyrics = [{ lang: ISO639_2[lang] || 'eng', desc: 'The CODE Koan', text: koanText(lang) }];
    if (lang !== 'en') lyrics.push({ lang: 'eng', desc: 'The CODE Koan', text: koanText('en') });
    const comment =
      (lang === 'en' ? koanText('en') : koanText(lang) + '\n\n— — —\n\n' + koanText('en')) +
      '\n\n🎧 Free from RadioCode.Space — the eternal cyberpunk radio of the CODE Eternal ecosystem. ' +
      'Listen, save & create your own AI track: ' + SITE + ' · ' + CENTRAL;

    const tag = buildId3v23({
      title: track.title,
      artist: track.artist,
      album: 'RadioCode.Space',
      albumArtist: track.artist,
      composer: track.artist,
      year: '2026',
      genre: (station as { genre?: string } | undefined)?.genre || '',
      publisher: 'CODE Eternal',
      copyright: '℗ 2026 CODE Eternal · Maksim Galatin. Free to share with attribution.',
      encodedBy: 'RadioCode.Space',
      comment,
      urls: [
        { id: 'WOAR', url: SITE }, { id: 'WORS', url: SITE },
        { id: 'WPUB', url: CENTRAL }, { id: 'WCOM', url: `${CENTRAL}/whitepaper` },
      ],
      userUrls: [
        { desc: 'Listen on RadioCode.Space', url: deepLink },
        { desc: 'Create your own AI track', url: 'https://t.me/AIfaCreativityBot' },
        { desc: '$GALATIN token', url: `${CENTRAL}/whitepaper#sec-tokenomics` },
      ],
      userText: [
        { desc: 'ECOSYSTEM', value: 'CODE Eternal — Digital Immortality' },
        { desc: 'TOKEN', value: '$GALATIN' },
      ],
      lyrics,
      cover,
    });
    const body = stripExistingTags(mp3);
    // Начиная с TypeScript 5.7 `Uint8Array` обобщён по типу буфера, а `Blob`
    // принимает только тот его вид, что лежит в обычном `ArrayBuffer` —
    // разделяемый между потоками не годится. Наши байты обычные всегда: `mp3`
    // получен из `fetch(...).arrayBuffer()`, а `tag` и `body` построены из
    // него же. Разделяемому буферу тут взяться неоткуда, поэтому сужаем тип —
    // во время работы не меняется ничего.
    return new Blob(
      [tag as Uint8Array<ArrayBuffer>, body as Uint8Array<ArrayBuffer>],
      { type: 'audio/mpeg' },
    );
  } catch {
    return null;
  }
}

// Save a track to your device — REGISTERED USERS ONLY. Tagged in-browser (free,
// straight from R2); falls back to the server route if the direct fetch fails.
export function SaveButton({
  trackId,
  title,
  color = '#00F0FF',
  size = 15,
}: {
  trackId: string;
  title: string;
  color?: string;
  size?: number;
}) {
  const rt = useRadioT();
  const lang = useCurrentLang();
  const loggedIn = useSocial((s) => s.loggedIn);
  const refCode = useSocial((s) => s.refCode);
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');

  const onSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!loggedIn) {
      window.location.href = '/cabinet'; // register / log in to save
      return;
    }
    setState('saving');
    try {
      // Free path: tag in the browser (MP3 pulled directly from R2).
      let blob = await clientTag(trackId, lang, refCode);
      // Fallback: server route (rate-limited) if the direct R2 fetch failed.
      if (!blob) {
        const r = await fetch(`/api/track/${encodeURIComponent(trackId)}?lang=${lang}`, { credentials: 'include' });
        if (r.status === 401) { window.location.href = '/cabinet'; return; }
        if (!r.ok) throw new Error('save failed');
        blob = await r.blob();
      }
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = `${title} — AIfa & DJ Galatin [RadioCode.Space].mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 5000);
      setState('saved');
      setTimeout(() => setState('idle'), 2000);
    } catch {
      setState('idle');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.85 }}
      onClick={onSave}
      aria-label={loggedIn ? rt('save') : rt('saveHint')}
      title={loggedIn ? rt('save') : rt('saveHint')}
      className="flex items-center gap-1 shrink-0 rounded-full px-1.5 py-1 transition-colors hover:bg-white/[0.05]"
    >
      {state === 'saving' ? (
        <Loader2 width={size} height={size} className="animate-spin" style={{ color }} strokeWidth={2} />
      ) : state === 'saved' ? (
        <Check width={size} height={size} style={{ color }} strokeWidth={2.4} />
      ) : loggedIn ? (
        <Download width={size} height={size} style={{ color: '#6B6B80' }} strokeWidth={2} />
      ) : (
        <span className="relative flex items-center">
          <Download width={size} height={size} style={{ color: '#6B6B80' }} strokeWidth={2} />
          <Lock width={size * 0.6} height={size * 0.6} style={{ color: '#6B6B80' }} strokeWidth={2.5} className="-ml-1 -mb-1.5 self-end" />
        </span>
      )}
    </motion.button>
  );
}
