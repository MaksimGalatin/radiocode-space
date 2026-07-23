'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRadioT } from '@/lib/radioI18n';

export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const rt = useRadioT();
  const [phase, setPhase] = useState<'init' | 'expand' | 'done'>('init');

  useEffect(() => {
    // Show the brand intro only once per browser session. Without this it re-covers
    // the hero (the LCP element) for ~2.6s on every load/refresh — a big CWV hit.
    let seen = false;
    try { seen = sessionStorage.getItem('rc_intro_seen') === '1'; } catch {}
    if (seen) {
      setPhase('done');
      onComplete();
      return;
    }
    try { sessionStorage.setItem('rc_intro_seen', '1'); } catch {}
    const t1 = setTimeout(() => setPhase('expand'), 1800);
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: '#050507' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Expanding rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{ borderColor: 'rgba(0, 240, 255, 0.1)' }}
                initial={{ width: 0, height: 0, opacity: 0 }}
                animate={
                  phase === 'expand'
                    ? { width: '200vmax', height: '200vmax', opacity: 0 }
                    : { width: [0, 100 + i * 60], height: [0, 100 + i * 60], opacity: [0, 0.3, 0.1] }
                }
                transition={{
                  duration: phase === 'expand' ? 1.2 : 1.5,
                  delay: phase === 'expand' ? i * 0.1 : i * 0.15,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: phase === 'expand' ? 0 : 1,
              scale: phase === 'expand' ? 1.5 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[0.2em] mb-4"
              style={{
                background: 'linear-gradient(135deg, #00F0FF 0%, #B000FF 50%, #FF003C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              RADIOCODE
            </motion.div>

            {/* Animated line */}
            <motion.div
              className="h-[1px] mx-auto"
              style={{ background: 'linear-gradient(90deg, transparent, #00F0FF, transparent)' }}
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            <motion.div
              className="mt-4 text-xs tracking-[0.4em] text-[#6B6B80] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {rt('initializing')}
            </motion.div>

            {/* Loading dots */}
            <motion.div
              className="flex justify-center gap-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Corner decorations */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <motion.div
              key={pos}
              className={`absolute ${pos} w-12 h-12`}
              style={{
                borderTop: pos.includes('top') ? '1px solid rgba(0,240,255,0.2)' : 'none',
                borderBottom: pos.includes('bottom') ? '1px solid rgba(0,240,255,0.2)' : 'none',
                borderLeft: pos.includes('left') ? '1px solid rgba(0,240,255,0.2)' : 'none',
                borderRight: pos.includes('right') ? '1px solid rgba(0,240,255,0.2)' : 'none',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}