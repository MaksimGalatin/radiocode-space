'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';

export function WaveformBar() {
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
    const barCount = 64;
    const gap = 2;
    const barWidth = (w - gap * (barCount - 1)) / barCount;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < barCount; i++) {
        const dataIndex = Math.floor((i / barCount) * (audioData ? audioData.length : 64));
        const value = audioData
          ? audioData[dataIndex] / 255
          : isPlaying
          ? Math.sin(Date.now() / 500 + i * 0.15) * 0.15 + 0.2
          : 0.03 + Math.sin(i * 0.3) * 0.01;

        const barHeight = Math.max(1, value * h * 0.9 + 1);
        const bw = Math.max(1, barWidth);
        const radius = Math.max(0, Math.min(bw / 2, barHeight / 2));
        const x = i * (bw + gap);
        const y = (h - barHeight) / 2;

        // Main bar
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, color + '90');
        gradient.addColorStop(0.5, color + '60');
        gradient.addColorStop(1, color + '30');

        ctx.beginPath();
        ctx.roundRect(x, y, bw, barHeight, radius);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Glow
        if (value > 0.4) {
          ctx.beginPath();
          ctx.roundRect(x, y, bw, barHeight, radius);
          ctx.fillStyle = color + '15';
          ctx.shadowColor = color;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animRef.current);
  }, [audioData, isPlaying, color]);

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto h-8 sm:h-10"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}