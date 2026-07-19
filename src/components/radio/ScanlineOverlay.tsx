'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export function ScanlineOverlay() {
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  // The static scanlines + vignette are cheap (rasterized once). Only the
  // full-width moving beam animates every frame — keep it desktop-only.
  const showBeam = !isMobile && !reduced;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 2px,
            rgba(0, 0, 0, 0.03) 4px
          )`,
          opacity: 0.4,
        }}
      />
      {/* Moving scanline beam (desktop only) */}
      {showBeam && (
        <motion.div
          className="absolute left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.04) 20%, rgba(0, 240, 255, 0.06) 50%, rgba(0, 240, 255, 0.04) 80%, transparent 100%)',
            top: 0,
          }}
          animate={{ translateY: ['0svh', '100svh'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </div>
  );
}

export function MatrixGrid() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  // Animating `background-position` repaints the whole full-screen layer every
  // frame — skip that layer on phones / reduced-motion, keep the static grid.
  const animateGrid = !isMobile && !reduced;

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Animated grid pulse (desktop only) */}
      {animateGrid && (
        <motion.div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}
