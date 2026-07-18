'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';
import { usePlayerStore } from '@/stores/playerStore';
import { create } from 'zustand';

// Shared state between visualizer and toggle button
const useVizOpenStore = create<{ isOpen: boolean; toggle: () => void; close: () => void }>((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  close: () => set({ isOpen: false }),
}));

const BAR_COUNT = 128;
const BAR_WIDTH = 3;
const MIN_BAR_HEIGHT = 3;
const CANVAS_SIZE = 500;

// Utility: hex to RGB
function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace('#', '');
  const num = parseInt(cleaned, 16);
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255,
  ];
}

export function FullscreenVisualizer() {
  const { isPlaying, currentTrack, currentStation, audioData } = usePlayerStore();
  const { isOpen, close } = useVizOpenStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  // Store latest reactive values in refs for the animation loop
  const stateRef = useRef({ isPlaying, audioData, r: 0, g: 0, b: 0 });

  const color = currentStation?.color || '#00F0FF';
  const [r, g, b] = hexToRgb(color);

  // Sync reactive state to refs so the animation loop always reads fresh values
  useEffect(() => {
    stateRef.current = { isPlaying, audioData, r, g, b };
  }, [isPlaying, audioData, r, g, b]);

  useEffect(() => {
    if (!isOpen) return;

    function drawFrame() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { isPlaying: playing, audioData: data, r: cr, g: cg, b: cb } = stateRef.current;

      const dpr = window.devicePixelRatio || 1;
      const displaySize = Math.max(100, Math.min(CANVAS_SIZE, window.innerWidth - 40, window.innerHeight - 200));
      canvas.style.width = `${displaySize}px`;
      canvas.style.height = `${displaySize}px`;
      canvas.width = Math.max(1, displaySize * dpr);
      canvas.height = Math.max(1, displaySize * dpr);
      ctx.scale(dpr, dpr);

      const cx = displaySize / 2;
      const cy = displaySize / 2;
      const innerRadius = Math.max(1, displaySize * 0.2);
      const maxBarLength = Math.max(1, displaySize * 0.28);

      ctx.clearRect(0, 0, displaySize, displaySize);

      const angleStep = (Math.PI * 2) / BAR_COUNT;

      for (let i = 0; i < BAR_COUNT; i++) {
        const angle = i * angleStep - Math.PI / 2;

        let value = 0;
        if (data && data.length > 0) {
          const dataIndex = Math.floor((i / BAR_COUNT) * data.length);
          value = data[Math.min(dataIndex, data.length - 1)] / 255;
        }

        const barHeight = playing
          ? Math.max(MIN_BAR_HEIGHT, value * maxBarLength)
          : MIN_BAR_HEIGHT;

        const x1 = cx + Math.cos(angle) * innerRadius;
        const y1 = cy + Math.sin(angle) * innerRadius;
        const x2 = cx + Math.cos(angle) * (innerRadius + barHeight);
        const y2 = cy + Math.sin(angle) * (innerRadius + barHeight);

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        const alpha = playing ? 0.9 : 0.15;
        gradient.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${cr}, ${cg}, ${cb}, 0)`);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.max(1, BAR_WIDTH);
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      // Inner circle subtle ring
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(1, innerRadius - 4), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${playing ? 0.12 : 0.04})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(drawFrame);
    }

    animFrameRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer"
          style={{ background: '#020204' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{
            initial: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            exit: { duration: 0.3, ease: 'easeIn' },
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Radial gradient background — station color at 5% opacity */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(${r}, ${g}, ${b}, 0.05) 0%, transparent 60%)`,
            }}
          />

          {/* Close button */}
          <motion.button
            className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-10 cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              opacity: 0.3,
            }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={close}
          >
            <X className="w-5 h-5 text-white/70" />
          </motion.button>

          {/* Canvas visualizer */}
          <canvas
            ref={canvasRef}
            className="relative z-[1]"
          />

          {/* Track info overlaid in center of circle */}
          <div className="absolute z-[2] flex flex-col items-center pointer-events-none" style={{ maxWidth: 240 }}>
            {currentTrack && (
              <>
                <motion.div
                  key={currentTrack.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl sm:text-2xl font-bold text-[#E8E8ED] text-center truncate max-w-full"
                >
                  {currentTrack.title}
                </motion.div>
                <motion.div
                  key={`fs-artist-${currentTrack.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.15 }}
                  className="text-sm text-[#6B6B80] text-center truncate max-w-full mt-1"
                >
                  {currentTrack.artist}
                </motion.div>
              </>
            )}
          </div>

          {/* Station name below the circle */}
          {currentStation && (
            <motion.div
              className="absolute z-[2] pointer-events-none"
              style={{
                color: `rgba(${r}, ${g}, ${b}, 0.4)`,
                top: 'calc(50% + 180px)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xs font-mono tracking-[0.2em] uppercase">
                {currentStation.name}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FullscreenVizToggle() {
  const { isPlaying, currentStation } = usePlayerStore();
  const toggle = useVizOpenStore((s) => s.toggle);
  const color = currentStation?.color || '#00F0FF';

  if (!isPlaying) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/[0.04] shrink-0 cursor-pointer"
      style={{
        boxShadow: `0 0 15px ${color}20`,
      }}
      title="Fullscreen visualizer"
    >
      <Maximize2 className="w-4 h-4 text-[#6B6B80] hover:text-[#E8E8ED] transition-colors" />
    </motion.button>
  );
}