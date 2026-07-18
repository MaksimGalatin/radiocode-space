'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, Volume1,
  ChevronUp, ChevronDown,
  Radio, ListMusic,
  Shuffle, Repeat, Repeat1,
} from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { seekAudio } from '@/lib/audioSingleton';
import { MiniEqualizer } from './MiniEqualizer';
import { VolumeVisualizer } from './VolumeVisualizer';
import { FullscreenVizToggle } from './FullscreenVisualizer';

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function PlayerBar() {
  const {
    isPlaying,
    currentTrack,
    currentStation,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    isPlayerExpanded,
    isShuffled,
    repeatMode,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    togglePlayerExpanded,
    toggleShuffle,
    cycleRepeat,
    showPlaylist,
    toggleShowPlaylist,
  } = usePlayerStore();

  const color = currentStation?.color || '#00F0FF';
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const VolumeIcon = isMuted || volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat;

  if (!currentTrack) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-0 left-0 right-0 z-50 glass-heavy"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-center h-20 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.1)',
              }}
            >
              <Play className="w-6 h-6 text-[#00F0FF] ml-1" fill="#00F0FF" />
            </motion.button>
            <span className="text-sm text-[#6B6B80]">Select a station to begin</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(5, 5, 7, 0.85)',
        backdropFilter: 'blur(60px) saturate(180%)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%)',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
      }}
    >
      {/* Station color accent line */}
      <div
        className="h-[2px] transition-all duration-1000"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)`,
          opacity: isPlaying ? 0.6 : 0.2,
        }}
      />

      {/* Volume visualizer strip inside player */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-[2px] left-0 right-0 pointer-events-none z-0"
        >
          <VolumeVisualizer />
        </motion.div>
      )}

      {/* Progress bar (thin line at top) */}
      <div
        className="relative h-[3px] w-full cursor-pointer group"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const pct = x / rect.width;
          const targetTime = pct * duration;
          seekAudio(targetTime);
        }}
      >
        <div className="absolute inset-0 bg-white/[0.04]" />
        <motion.div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
            boxShadow: `0 0 10px ${color}40`,
          }}
          transition={{ duration: 0.1 }}
        />
        {/* Scrub dot */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            left: `${progress}%`,
            marginLeft: '-6px',
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}80`,
          }}
        />
      </div>

      {/* Main player content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Left: Track info */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {/* Album art / Visual indicator */}
            <motion.div
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex-shrink-0 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}05)`,
                border: `1px solid ${color}20`,
              }}
              animate={isPlaying ? {
                boxShadow: [
                  `0 0 20px ${color}10`,
                  `0 0 35px ${color}20`,
                  `0 0 20px ${color}10`,
                ],
              } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {isPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <MiniEqualizer color={color} size="md" />
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Radio className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `${color}60` }} />
                </div>
              )}
            </motion.div>

            <div className="min-w-0">
              <motion.div
                key={currentTrack.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm sm:text-base font-semibold truncate"
                style={{ color: '#E8E8ED' }}
              >
                {currentTrack.title}
              </motion.div>
              <motion.div
                key={`artist-${currentTrack.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xs text-[#6B6B80] truncate mt-0.5"
              >
                {currentTrack.artist}
              </motion.div>
            </div>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Shuffle button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleShuffle}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/[0.04]"
              title={isShuffled ? 'Shuffle on' : 'Shuffle off'}
            >
              <Shuffle
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors duration-200"
                style={{ color: isShuffled ? color : '#6B6B80' }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTrack}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/[0.04]"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8E8ED]" fill="#E8E8ED" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={togglePlay}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 relative"
              style={{
                background: isPlaying
                  ? `linear-gradient(135deg, ${color}20, ${color}08)`
                  : `linear-gradient(135deg, ${color}30, ${color}15)`,
                border: `1px solid ${color}30`,
                boxShadow: isPlaying
                  ? `0 0 40px ${color}15, 0 0 80px ${color}08`
                  : `0 0 30px ${color}10`,
              }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 rounded-full"
                  style={{ borderColor: color, borderTopColor: 'transparent' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                />
              ) : isPlaying ? (
                <Pause className="w-6 h-6 sm:w-7 sm:h-7" style={{ color }} fill={color} />
              ) : (
                <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5" style={{ color }} fill={color} />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTrack}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/[0.04]"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8E8ED]" fill="#E8E8ED" />
            </motion.button>

            {/* Repeat button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={cycleRepeat}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/[0.04] relative"
              title={`Repeat: ${repeatMode}`}
            >
              <RepeatIcon
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-colors duration-200"
                style={{ color: repeatMode !== 'off' ? color : '#6B6B80' }}
              />
              {repeatMode === 'one' && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-0.5 -right-0.5 text-[9px] font-bold leading-none rounded-full w-3.5 h-3.5 flex items-center justify-center"
                  style={{
                    color: color,
                    background: `${color}20`,
                    border: `1px solid ${color}40`,
                  }}
                >
                  1
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Right: Time + Volume */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 justify-end">
            {/* Time */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#6B6B80]">
              <span>{formatTime(currentTime)}</span>
              <span className="text-[#3a3a4a]">/</span>
              <span>{formatTime(duration)}</span>
            </div>

            {/* Volume */}
            <div className="hidden md:flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="text-[#6B6B80] hover:text-[#E8E8ED] transition-colors"
              >
                <VolumeIcon className="w-4 h-4" />
              </motion.button>
              <div className="relative w-20 h-1.5 rounded-full overflow-hidden cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const pct = Math.max(0, Math.min(1, x / rect.width));
                  setVolume(pct);
                }}
              >
                <div className="absolute inset-0 bg-white/[0.06] rounded-full" />
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all duration-100"
                  style={{
                    width: `${(isMuted ? 0 : volume) * 100}%`,
                    background: color,
                    opacity: 0.6,
                  }}
                />
              </div>
            </div>

            {/* Fullscreen visualizer toggle */}
            <FullscreenVizToggle />

            {/* Playlist toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleShowPlaylist}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: showPlaylist ? `${color}15` : 'transparent',
                border: showPlaylist ? `1px solid ${color}25` : '1px solid transparent',
              }}
              title="Toggle playlist"
            >
              <ListMusic className="w-4 h-4" style={{ color: showPlaylist ? color : '#6B6B80' }} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}