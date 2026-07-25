'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { useLiteMode } from '@/hooks/use-mobile';

export function VolumeVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const { isPlaying, currentStation } = usePlayerStore();
  const color = currentStation?.color || '#00F0FF';
  const lite = useLiteMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    let w = 0;
    let h = 0;
    let barW = 0;
    let safeRadius = 0;
    const barCount = 32;
    const gap = 1.5;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      barW = Math.max(1, (w - gap * (barCount - 1)) / barCount);
      safeRadius = Math.max(0, barW / 2);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let lastFrame = 0;
    const minDelta = lite ? 55 : 0; // ~18fps on lite/TV, uncapped on desktop
    const animate = (now = 0) => {
      animRef.current = requestAnimationFrame(animate);
      if (now - lastFrame < minDelta) return;
      lastFrame = now;
      if (w > 0 && h > 0) {
        ctx.clearRect(0, 0, w, h);
        const { audioData } = usePlayerStore.getState();

        for (let i = 0; i < barCount; i++) {
          const di = Math.floor((i / barCount) * (audioData ? audioData.length : 64));
          const v = audioData && audioData.length > 0
            ? audioData[di] / 255
            : isPlaying
              ? Math.sin(Date.now() / 400 + i * 0.2) * 0.2 + 0.25
              : 0.04;

          const barH = Math.max(1, v * h + 1);
          const x = i * (barW + gap);

          ctx.beginPath();
          ctx.roundRect(x, h - barH, barW, barH, [safeRadius, safeRadius, 0, 0]);

          const alpha = 0.3 + v * 0.7;
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    };

    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, color, lite]);

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      className="w-full h-3"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}