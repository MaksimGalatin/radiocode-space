'use client';

import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { useCallback, useRef, useState } from 'react';

interface PlayHistoryEntry {
  title: string;
  artist: string;
  stationName: string;
  color: string;
  time: Date;
}

export function PlayHistory() {
  const currentTrack = usePlayerStore((s) => s.currentTrack);
  const currentStation = usePlayerStore((s) => s.currentStation);
  const [history, setHistory] = useState<PlayHistoryEntry[]>([]);
  const prevTrackRef = useRef<string>('');
  const maxEntries = 8;

  const addEntry = useCallback(() => {
    if (!currentTrack || !currentStation) return;
    if (prevTrackRef.current === currentTrack.id) return;
    const prev = prevTrackRef.current;
    prevTrackRef.current = currentTrack.id;

    // Don't add the very first track to history (it's currently playing)
    if (prev) {
      setHistory((h) => [
        {
          title: currentTrack.title,
          artist: currentTrack.artist,
          stationName: currentStation.name,
          color: currentStation.color,
          time: new Date(),
        },
        ...h,
      ].slice(0, maxEntries));
    }
  }, [currentTrack, currentStation]);

  // Use subscription pattern instead of setState in effect
  const subscribeRef = useRef<ReturnType<typeof usePlayerStore.subscribe> | null>(null);
  if (!subscribeRef.current) {
    subscribeRef.current = usePlayerStore.subscribe(addEntry);
  }

  if (history.length === 0) return null;

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
          <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#E8E8ED]">
            Broadcast History
          </h3>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-white/[0.06] to-transparent" />
        </div>

        <div className="space-y-1 max-h-64 overflow-y-auto pr-2">
          {history.map((entry, i) => (
            <motion.div
              key={`${entry.title}-${entry.time.getTime()}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.02] transition-colors group cursor-default"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: entry.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[#E8E8ED] truncate group-hover:text-white transition-colors">
                  {entry.title}
                </div>
                <div className="text-[10px] text-[#6B6B80] truncate">
                  {entry.artist} · <span style={{ color: `${entry.color}80` }}>{entry.stationName}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#3a3a4a] flex-shrink-0">
                {formatTimeAgo(entry.time)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 10) return 'now';
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}