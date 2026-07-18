'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';

export function CircularVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const { audioData, isPlaying, currentStation } = usePlayerStore();
  const color = currentStation?.color || '#00F0FF';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 280;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const baseRadius = 80;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      const data = audioData;
      const bars = data ? data.length / 2 : 64;

      // Draw outer frequency ring
      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
        const value = data ? data[i] / 255 : (isPlaying ? Math.sin(Date.now() / 300 + i * 0.3) * 0.3 + 0.3 : 0.05);
        const barHeight = value * 50 + 3;

        const x1 = centerX + Math.cos(angle) * (baseRadius + 20);
        const y1 = centerY + Math.sin(angle) * (baseRadius + 20);
        const x2 = centerX + Math.cos(angle) * (baseRadius + 20 + barHeight);
        const y2 = centerY + Math.sin(angle) * (baseRadius + 20 + barHeight);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.3 + value * 0.7;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Draw inner mirror ring (shorter)
      for (let i = 0; i < bars; i++) {
        const angle = (i / bars) * Math.PI * 2 - Math.PI / 2;
        const value = data ? data[i] / 255 : (isPlaying ? Math.sin(Date.now() / 400 + i * 0.2) * 0.2 + 0.2 : 0.03);
        const barHeight = value * 20 + 2;

        const x1 = centerX + Math.cos(angle) * (baseRadius + 8);
        const y1 = centerY + Math.sin(angle) * (baseRadius + 8);
        const x2 = centerX + Math.cos(angle) * (baseRadius + 8 - barHeight);
        const y2 = centerY + Math.sin(angle) * (baseRadius + 8 - barHeight);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.15 + value * 0.3;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Draw vinyl disc
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, baseRadius);
      gradient.addColorStop(0, '#1a1a2e');
      gradient.addColorStop(0.3, '#0f0f1a');
      gradient.addColorStop(0.5, '#16162a');
      gradient.addColorStop(0.7, '#0f0f1a');
      gradient.addColorStop(1, '#1a1a2e');

      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Vinyl grooves
      for (let r = 20; r < baseRadius; r += 8) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.02)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Center label glow
      const labelGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
      labelGlow.addColorStop(0, `${color}40`);
      labelGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      ctx.fillStyle = labelGlow;
      ctx.fill();

      // Center dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.8;
      ctx.fill();

      // Center ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Outer ring glow
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius + 18, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = isPlaying ? 0.08 : 0.03;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, [audioData, isPlaying, color]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isPlaying ? 360 : 0,
      }}
      transition={{
        opacity: { duration: 0.8 },
        scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        rotate: isPlaying ? { duration: 20, repeat: Infinity, ease: 'linear' } : { duration: 0 },
      }}
      className="relative"
    >
      <canvas
        ref={canvasRef}
        className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px]"
      />
    </motion.div>
  );
}