'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { TrackItem } from './TrackItem';

export function PlaylistPanel() {
  const {
    currentStation,
    showPlaylist,
    toggleShowPlaylist,
  } = usePlayerStore();

  if (!currentStation) return null;

  const color = currentStation.color;

  return (
    <AnimatePresence>
      {showPlaylist && (
        <motion.div
          initial={{ opacity: 0, y: 20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: 20, height: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-24 sm:bottom-28 left-0 right-0 z-40 overflow-hidden"
        >
          <div
            className="mx-4 sm:mx-8 max-w-7xl lg:mx-auto rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 10, 15, 0.92)',
              backdropFilter: 'blur(60px) saturate(180%)',
              WebkitBackdropFilter: 'blur(60px) saturate(180%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: `0 -20px 60px rgba(0,0,0,0.5), 0 0 60px ${color}05`,
              maxHeight: '50vh',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${color}10` }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}10`, border: `1px solid ${color}20` }}
                >
                  <span className="text-xs font-bold" style={{ color }}>
                    {currentStation.tracks.length}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#E8E8ED]">
                    {currentStation.name} — Queue
                  </div>
                  <div className="text-[10px] tracking-[0.15em] uppercase" style={{ color: `${color}70` }}>
                    {currentStation.genre}
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleShowPlaylist}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/[0.04] transition-colors"
              >
                <X className="w-4 h-4 text-[#6B6B80]" />
              </motion.button>
            </div>

            {/* Track list */}
            <div className="overflow-y-auto max-h-[35vh] p-2">
              {currentStation.tracks.map((track, index) => (
                <TrackItem
                  key={track.id}
                  stationId={currentStation.id}
                  trackIndex={index}
                  title={track.title}
                  artist={track.artist}
                  duration={track.duration}
                  color={color}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}