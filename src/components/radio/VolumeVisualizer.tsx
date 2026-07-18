'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';

export function VolumeVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const { audioData, isPlaying, currentStation } = usePlayerStore();
  const color = currentStation?.color || '#00F0FF';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const barCount = 32;
    const gap = 1.5;
    const barW = Math.max(1, (w - gap * (barCount - 1)) / barCount);
    const safeRadius = Math.max(0, barW / 2);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < barCount; i++) {
        const di = Math.floor((i / barCount) * (audioData ? audioData.length : 64));
        const v = audioData
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
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [audioData, isPlaying, color]);

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