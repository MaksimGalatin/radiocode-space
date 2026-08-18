'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';
import { readableAccent } from '@/lib/readableAccent';

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
          // Крупная цифра (30px, жирная) формально проходит по порогу для
          // крупного текста — 3.0. Но фиолетовый #B000FF давал ровно 3.99 и был
          // самым слабым местом главной: цифра «1024 трека» — то, ради чего
          // сюда и заходят. Осветлённый двойник поднимает до 7.25, свечение
          // (textShadow) продолжает строиться на исходном фирменном цвете.
          color: readableAccent(color),
          textShadow: hasReachedEnd ? `0 0 20px ${color}40` : 'none',
        }}
        whileHover={{ scale: 1.1 }}
      >
        {displayValue}{suffix}
      </motion.div>
      <div className="text-xs tracking-[0.15em] uppercase text-[#8B8BA8]">
        {label}
      </div>
      <div className="text-[13px] text-[#7E7E99] mt-0.5">{sub}</div>
    </div>
  );
}