'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { TrackMiniEqualizer } from './MiniEqualizer';

interface TrackItemProps {
  stationId: string;
  trackIndex: number;
  title: string;
  artist: string;
  duration?: number;
  color: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function TrackItem({
  stationId,
  trackIndex,
  title,
  artist,
  duration,
  color,
}: TrackItemProps) {
  const {
    currentTrack,
    currentStation,
    currentTrackIndex,
    isPlaying,
    playTrack,
    toggleFavorite,
    isFavorite,
  } = usePlayerStore();

  const trackId = `${stationId}-${trackIndex}`;
  const active = currentTrack?.id === trackId || (
    currentStation?.id === stationId && currentTrackIndex === trackIndex
  );
  const isCurrentlyPlaying = active && isPlaying;
  const favorited = isFavorite(trackId);

  const handleClick = () => {
    playTrack(stationId, trackIndex);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(trackId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: trackIndex * 0.05,
      }}
      onClick={handleClick}
      className="group relative flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/[0.03]"
    >
      {/* Active indicator */}
      {active && (
        <motion.div
          layoutId="track-active"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full"
          style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}60` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      {/* Track number / Equalizer */}
      <div className="w-8 sm:w-10 flex items-center justify-center flex-shrink-0">
        {isCurrentlyPlaying ? (
          <TrackMiniEqualizer color={color} isPlaying={true} />
        ) : (
          <span
            className="text-xs font-mono transition-colors duration-300"
            style={{
              color: active ? color : '#6B6B80',
            }}
          >
            {String(trackIndex + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <div
          className="text-sm font-medium truncate transition-colors duration-300"
          style={{
            color: active ? color : '#E8E8ED',
          }}
        >
          {title}
        </div>
        <div className="text-xs text-[#6B6B80] truncate mt-0.5">
          {artist}
        </div>
      </div>

      {/* Duration */}
      <div className="flex-shrink-0">
        <span className="text-xs font-mono text-[#6B6B80]">
          {duration ? formatTime(duration) : '--:--'}
        </span>
      </div>

      {/* Favorite heart button */}
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={handleFavorite}
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity duration-200 ${
          favorited ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        title={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <motion.div
          key={favorited ? 'filled' : 'outline'}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <Heart
            className="w-4 h-4 transition-colors duration-200"
            style={{
              color: favorited ? '#FF003C' : '#3a3a4a',
              fill: favorited ? '#FF003C' : 'none',
            }}
          />
        </motion.div>
      </motion.button>

      {/* Play button on hover */}
      <motion.div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: `${color}15`,
          border: `1px solid ${color}25`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isCurrentlyPlaying ? (
          <svg className="w-3 h-3" fill={color} viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-3 h-3 ml-0.5" fill={color} viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </motion.div>
    </motion.div>
  );
}