'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';

const BAR_COUNT = 5;
const STATIC_HEIGHTS = [4, 6, 5, 3, 4]; // Low heights when not playing

export function SignalStrength() {
  const { isPlaying, audioData, currentStation } = usePlayerStore();
  const [randomHeights, setRandomHeights] = useState<number[]>(STATIC_HEIGHTS);

  // Generate random heights when playing without audioData
  useEffect(() => {
    if (!isPlaying) return;
    if (audioData) return;

    const interval = setInterval(() => {
      setRandomHeights(
        Array.from({ length: BAR_COUNT }, () =>
          Math.floor(Math.random() * 20) + 8
        )
      );
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying, audioData]);

  // Derive heights from audioData when available
  const barHeights = useMemo(() => {
    if (!isPlaying) return STATIC_HEIGHTS;

    if (audioData && audioData.length > 0) {
      // Sample frequency bands across the data
      const bandSize = Math.floor(audioData.length / BAR_COUNT);
      return Array.from({ length: BAR_COUNT }, (_, i) => {
        const start = i * bandSize;
        const end = start + bandSize;
        let sum = 0;
        for (let j = start; j < end && j < audioData.length; j++) {
          sum += audioData[j];
        }
        const avg = sum / (end - start);
        // Map 0-255 to 3-28px
        return Math.max(3, Math.min(28, (avg / 255) * 28));
      });
    }

    return randomHeights;
  }, [isPlaying, audioData, randomHeights]);

  const stationColor = currentStation?.color ?? '#00F0FF';

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      className="flex flex-col items-center select-none"
      style={{ width: 40 }}
    >
      {/* Label */}
      <span
        className="text-[8px] tracking-[0.2em] uppercase mb-1.5"
        style={{ color: '#3a3a4a' }}
      >
        SIGNAL
      </span>

      {/* Bars */}
      <div
        className="flex items-end gap-[3px]"
        style={{ height: 30 }}
      >
        {barHeights.map((h, i) => (
          <motion.div
            key={i}
            animate={{ height: h }}
            transition={{
              duration: isPlaying ? 0.12 : 0.4,
              ease: isPlaying ? 'easeOut' : 'easeInOut',
              delay: isPlaying ? i * 0.02 : 0,
            }}
            style={{
              width: 5,
              borderRadius: 1.5,
              background: isPlaying
                ? `linear-gradient(to top, #00F0FF, #B000FF)`
                : '#3a3a4a',
              boxShadow: isPlaying
                ? `0 0 6px ${stationColor}40`
                : 'none',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}