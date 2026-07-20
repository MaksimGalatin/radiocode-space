'use client';

import { motion } from 'framer-motion';
import { LiveClock } from '@/components/radio/LiveClock';
import { SignalStrength } from '@/components/radio/SignalStrength';

export function RadioHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-heavy"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Animated radio icon */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF, #B000FF)',
                  opacity: 0.15,
                  filter: 'blur(8px)',
                }}
              />
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
                <circle cx="12" cy="12" r="2" fill="#00F0FF" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span
                className="text-base sm:text-lg font-bold tracking-[0.15em] leading-none"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF 0%, #B000FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                RADIOCODE
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#6B6B80] font-medium mt-0.5">
                .SPACE
              </span>
            </div>
          </motion.div>

          {/* Right side: Status + Signal + Clock */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Ecosystem link */}
            <motion.a
              href="https://www.codeofdigitaleternity.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(176, 0, 255, 0.06)',
                border: '1px solid rgba(176, 0, 255, 0.15)',
              }}
            >
              <span className="text-[10px] font-mono font-medium tracking-wider text-[#B000FF]/80">
                CODE ETERNAL ↗
              </span>
            </motion.a>

            {/* ON AIR indicator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255, 0, 60, 0.08)',
                border: '1px solid rgba(255, 0, 60, 0.15)',
              }}
            >
              <div className="relative w-2 h-2">
                <div
                  className="absolute inset-0 rounded-full bg-[#FF003C] on-air-blink"
                  style={{ boxShadow: '0 0 8px rgba(255, 0, 60, 0.6)' }}
                />
              </div>
              <span className="text-[11px] font-semibold tracking-[0.15em] text-[#FF003C]">
                ON AIR
              </span>
            </motion.div>

            {/* HQ Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.1)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              <span className="text-[10px] font-mono font-medium tracking-wider text-[#00F0FF]/70">
                VBR ~182K
              </span>
            </motion.div>

            {/* Signal Strength */}
            <div className="hidden sm:block">
              <SignalStrength />
            </div>

            {/* Live Clock */}
            <div className="hidden lg:block">
              <LiveClock />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}