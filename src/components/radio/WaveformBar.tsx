'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { useLiteMode } from '@/hooks/use-mobile';

export function WaveformBar() {
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
    let barWidth = 0;
    const barCount = 64;
    const gap = 2;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      barWidth = (w - gap * (barCount - 1)) / barCount;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    let lastFrame = 0;
    const minDelta = lite ? 55 : 0; // ~18fps on lite/TV, uncapped on desktop
    const animate = (now = 0) => {
      // Keep the loop alive only while something is playing: when paused the
      // bars are a fixed low pattern, so one frame is drawn and the rAF chain
      // ends (it used to spin forever on TVs and idle tabs).
      if (isPlaying) animRef.current = requestAnimationFrame(animate);
      if (isPlaying && now - lastFrame < minDelta) return;
      lastFrame = now;
      if (w > 0 && h > 0) {
        ctx.clearRect(0, 0, w, h);
        
        // Read directly from store to avoid React re-renders at 60fps
        const { audioData } = usePlayerStore.getState();

        for (let i = 0; i < barCount; i++) {
          const dataIndex = Math.floor((i / barCount) * (audioData ? audioData.length : 64));
          const value = audioData && audioData.length > 0
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

          // Glow (desktop only — per-bar shadowBlur re-blurs every frame, deadly on TV GPUs)
          if (!lite && value > 0.4) {
            ctx.beginPath();
            ctx.roundRect(x, y, bw, barHeight, radius);
            ctx.fillStyle = color + '15';
            ctx.shadowColor = color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
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
      transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto h-8 sm:h-10"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
}