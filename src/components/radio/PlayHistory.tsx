'use client';

import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { useEffect, useRef, useState } from 'react';
import { LikeButton } from './LikeButton';
import { ShareButton } from './ShareButton';
import { SaveButton } from './SaveButton';
import { findTrackLocation } from '@/lib/radioSocial';
import { useRadioT } from '@/lib/radioI18n';
import { readableAccent } from '@/lib/readableAccent';

interface Entry {
  trackId: string;
  stationId: string;
  title: string;
  artist: string;
  stationName: string;
  color: string;
  at: number;
}

const MAX = 20;
const HKEY = 'radiocode:history:v1';

function loadHistory(): Entry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HKEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((e) => e && e.trackId) : [];
  } catch { return []; }
}
function saveHistory(h: Entry[]) {
  try { localStorage.setItem(HKEY, JSON.stringify(h)); } catch { /* full */ }
}

export function PlayHistory() {
  const rt = useRadioT();
  const cueTrack = usePlayerStore((s) => s.cueTrack);
  const [history, setHistory] = useState<Entry[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const prevRef = useRef<string>('');

  // Hydrate from storage on the client (last 20 survive reloads).
  useEffect(() => {
    const h = loadHistory();
    setHistory(h);
    prevRef.current = h[0]?.trackId || '';
    setHydrated(true);
  }, []);

  // Record every track change. The store fires on many updates (time/viz); we act
  // only when the track id actually changes.
  useEffect(() => {
    const unsub = usePlayerStore.subscribe((s) => {
      const t = s.currentTrack;
      const st = s.currentStation;
      if (!t || !st || prevRef.current === t.id) return;
      prevRef.current = t.id;
      setHistory((h) => {
        if (h[0]?.trackId === t.id) return h; // no dup on restore
        const next = [
          { trackId: t.id, stationId: st.id, title: t.title, artist: t.artist, stationName: st.name, color: st.color, at: Date.now() },
          ...h,
        ].slice(0, MAX);
        saveHistory(next);
        return next;
      });
    });
    return unsub;
  }, []);

  if (!hydrated || history.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1.5 h-5 rounded-full bg-[#B000FF]" />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#E8E8ED] leading-none">
              {rt('broadcastHist')}
            </h3>
            <p className="text-[13px] text-[#8B8BA8] mt-1">
              {rt('lastTracks')}
            </p>
          </div>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>

        <div className="space-y-1 max-h-[420px] overflow-y-auto pr-2">
          {history.map((entry, i) => (
            <motion.div
              key={`${entry.trackId}-${entry.at}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(i, 10) * 0.03, duration: 0.3 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.02] transition-colors group"
            >
              <button
                onClick={() => {
                  const loc = findTrackLocation(entry.trackId);
                  if (loc) cueTrack(loc.stationId, loc.index);
                }}
                className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
                aria-label={`${rt('cue')} ${entry.title}`}
              >
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-[#E8E8ED] truncate group-hover:text-white transition-colors">
                    {entry.title}
                  </div>
                  <div className="text-[13px] text-[#8B8BA8] truncate">
                    {entry.artist} · <span style={{ color: readableAccent(entry.color) }}>{entry.stationName}</span>
                  </div>
                </div>
              </button>
              <div className="flex items-center gap-0.5 shrink-0">
                <LikeButton trackId={entry.trackId} color="#FF003C" size={14} />
                <ShareButton trackId={entry.trackId} title={entry.title} color={entry.color} size={14} />
                <SaveButton trackId={entry.trackId} title={entry.title} color={entry.color} size={14} />
              </div>
              <span className="text-[13px] font-mono text-[#7E7E99] flex-shrink-0 w-8 text-right">
                {formatTimeAgo(entry.at)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function formatTimeAgo(at: number): string {
  const seconds = Math.floor((Date.now() - at) / 1000);
  if (seconds < 10) return 'now';
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h`;
}
