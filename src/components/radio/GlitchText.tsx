'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function ScrambleText({ text, active = true, speed = 30 }: { text: string; active?: boolean; speed?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const [frame, setFrame] = useState(0);

  const stableText = text;
  const stableSpeed = speed;

  useEffect(() => {
    if (!active) {
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      const result = stableText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return stableText[index];
          return randomChar();
        })
        .join('');

      setDisplayText(result);

      iteration += 1 / 3;
      if (iteration >= stableText.length) {
        clearInterval(interval);
        setDisplayText(stableText);
      }
      setFrame(f => f + 1);
    }, stableSpeed);

    return () => clearInterval(interval);
  }, [stableText, active, stableSpeed]);

  return <span>{displayText}</span>;
}

export function GlitchText({
  children,
  className = '',
  style = {},
  glitchOnHover = true,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  glitchOnHover?: boolean;
}) {
  const [isGlitching, setIsGlitching] = useState(false);

  const triggerGlitch = () => {
    if (!glitchOnHover) return;
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  };

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={style}
      onMouseEnter={triggerGlitch}
      onClick={triggerGlitch}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers */}
      <AnimatePresence>
        {isGlitching && (
          <>
            <motion.span
              key="glitch-r"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], x: [0, 3, -2, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20"
              aria-hidden
              style={{
                color: '#FF003C',
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                transform: 'translateX(2px)',
              }}
            >
              {children}
            </motion.span>
            <motion.span
              key="glitch-b"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], x: [0, -3, 2, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="absolute inset-0 z-20"
              aria-hidden
              style={{
                color: '#00F0FF',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                transform: 'translateX(-2px)',
              }}
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </motion.span>
  );
}

export { ScrambleText };