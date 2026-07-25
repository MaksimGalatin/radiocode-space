'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { useRadioT } from '@/lib/radioI18n';
import { useLiteMode } from '@/hooks/use-mobile';

const BAR_COUNT = 5;
const STATIC_HEIGHTS = [4, 6, 5, 3, 4]; // Low heights when not playing

export function SignalStrength() {
  const rt = useRadioT();
  const { isPlaying, currentStation } = usePlayerStore();
  const lite = useLiteMode();
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animRef = useRef<number>(0);

  const stationColor = currentStation?.color ?? '#00F0FF';

  useEffect(() => {
    let lastFrame = 0;
    const minDelta = lite ? 66 : 0; // ~15fps on lite/TV; when paused, one static frame (no rAF)
    const animate = (now = 0) => {
      if (isPlaying) animRef.current = requestAnimationFrame(animate);
      if (lite && isPlaying && now - lastFrame < minDelta) return;
      lastFrame = now;
      const { audioData } = usePlayerStore.getState();

      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barsRef.current[i];
        if (!bar) continue;

        let h = STATIC_HEIGHTS[i];

        if (isPlaying) {
          if (audioData && audioData.length > 0) {
            const bandSize = Math.floor(audioData.length / BAR_COUNT);
            const start = i * bandSize;
            const end = start + bandSize;
            let sum = 0;
            for (let j = start; j < end && j < audioData.length; j++) {
              sum += audioData[j];
            }
            const avg = sum / (end - start);
            h = Math.max(3, Math.min(28, (avg / 255) * 28));
          } else {
            // Random heights if playing but no audio data yet
            h = Math.floor(Math.random() * 20) + 8;
          }
        }

        bar.style.height = `${h}px`;
        bar.style.background = isPlaying
          ? `linear-gradient(to top, #00F0FF, #B000FF)`
          : '#3a3a4a';
        bar.style.boxShadow = isPlaying
          ? `0 0 6px ${stationColor}40`
          : 'none';
      }

    };

    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, stationColor, lite]);

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
        {rt('signal')}
      </span>

      {/* Bars */}
      <div
        className="flex items-end gap-[3px]"
        style={{ height: 30 }}
      >
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { barsRef.current[i] = el; }}
            style={{
              width: 5,
              height: STATIC_HEIGHTS[i],
              borderRadius: 1.5,
              background: '#3a3a4a',
              transition: isPlaying ? 'none' : 'height 0.4s ease-in-out',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}