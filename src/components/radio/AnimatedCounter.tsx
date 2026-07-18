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

function easeOutExpo(t: number): number {
  return 1 - Math.pow(2, -10 * t);
}

export function AnimatedCounter({ value, label, sub, color, delay, suffix = '' }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1500; // 1.5 seconds
    const startTime = performance.now() + delay * 1000;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentValue = Math.round(easedProgress * value);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
        setHasReachedEnd(true);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, value, delay]);

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