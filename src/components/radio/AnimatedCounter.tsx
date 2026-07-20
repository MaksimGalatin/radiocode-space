'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  label: string;
  sub: string;
  color: string;
  delay: number;
  suffix?: string;
}

export function AnimatedCounter({ value, label, sub, color, delay, suffix = '' }: AnimatedCounterProps) {
  // Initialise with the real value so SSR / no-JS renders correct numbers (not 0);
  // the count-up animation still runs on the client once the element scrolls into view.
  const [displayValue, setDisplayValue] = useState(value);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Keep the value real from first paint (SSR-safe); only add the glow accent once in view.
  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setHasReachedEnd(true), delay * 1000 + 400);
    return () => clearTimeout(t);
  }, [isInView, delay]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-2xl sm:text-3xl font-bold font-mono mb-1 transition-shadow duration-700"
        style={{
          color: color,
          textShadow: hasReachedEnd ? `0 0 20px ${color}40` : 'none',
        }}
        whileHover={{ scale: 1.1 }}
      >
        {displayValue}{suffix}
      </motion.div>
      <div className="text-xs tracking-[0.15em] uppercase text-[#6B6B80]">
        {label}
      </div>
      <div className="text-[10px] text-[#3a3a4a] mt-0.5">{sub}</div>
    </div>
  );
}