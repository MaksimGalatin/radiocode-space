'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const day = time.getDate().toString().padStart(2, '0');
  const monthShort = time
    .toLocaleDateString('en-US', { month: 'short' })
    .toUpperCase();
  const year = time.getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="flex flex-col items-end select-none"
    >
      {/* Label */}
      <span
        className="text-[8px] tracking-[0.2em] uppercase mb-1"
        style={{ color: '#3a3a4a' }}
      >
        LOCAL TIME
      </span>

      {/* Time display */}
      <div className="font-mono text-sm sm:text-base leading-none flex items-baseline">
        <span
          className="tabular-nums"
          style={{
            color: '#E8E8ED',
            textShadow: '0 0 8px rgba(0, 240, 255, 0.15)',
          }}
        >
          {hours}
        </span>
        <ColonBlink />
        <span
          className="tabular-nums"
          style={{
            color: '#E8E8ED',
            textShadow: '0 0 8px rgba(0, 240, 255, 0.15)',
          }}
        >
          {minutes}
        </span>
        <ColonBlink />
        <span
          className="tabular-nums text-xs sm:text-sm"
          style={{
            color: '#6B6B80',
          }}
        >
          {seconds}
        </span>
      </div>

      {/* Date */}
      <span
        className="font-mono text-[10px] mt-0.5 tabular-nums"
        style={{ color: '#4a4a5a' }}
      >
        {day} {monthShort} {year}
      </span>
    </motion.div>
  );
}

function ColonBlink() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((v) => !v);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block mx-px"
      style={{
        color: '#6B6B80',
        opacity: visible ? 1 : 0.3,
        transition: 'opacity 0.2s ease',
        textShadow: '0 0 6px rgba(0, 240, 255, 0.1)',
      }}
    >
      :
    </span>
  );
}