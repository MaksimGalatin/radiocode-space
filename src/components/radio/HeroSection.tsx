'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { CircularVisualizer } from './CircularVisualizer';
import { MiniEqualizer } from './MiniEqualizer';
import { ScrambleText, GlitchText } from './GlitchText';

const neonPalette = ['#00F0FF', '#FF003C', '#B000FF', '#39FF14'];

interface FloatingShape {
  id: number;
  type: 'hexagon' | 'circle' | 'triangle' | 'diamond' | 'ring';
  size: number;
  x: string;
  y: string;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

const floatingShapes: FloatingShape[] = [
  { id: 0, type: 'hexagon', size: 60, x: '8%', y: '15%', color: '#00F0FF', opacity: 0.06, duration: 8, delay: 0 },
  { id: 1, type: 'circle', size: 24, x: '85%', y: '12%', color: '#FF003C', opacity: 0.05, duration: 6, delay: 1.2 },
  { id: 2, type: 'triangle', size: 40, x: '15%', y: '75%', color: '#B000FF', opacity: 0.04, duration: 10, delay: 0.5 },
  { id: 3, type: 'diamond', size: 32, x: '78%', y: '80%', color: '#39FF14', opacity: 0.05, duration: 7, delay: 2 },
  { id: 4, type: 'ring', size: 70, x: '65%', y: '20%', color: '#00F0FF', opacity: 0.03, duration: 12, delay: 0.8 },
  { id: 5, type: 'hexagon', size: 20, x: '30%', y: '85%', color: '#FF003C', opacity: 0.07, duration: 5, delay: 1.5 },
  { id: 6, type: 'circle', size: 80, x: '90%', y: '50%', color: '#B000FF', opacity: 0.03, duration: 11, delay: 3 },
  { id: 7, type: 'triangle', size: 28, x: '5%', y: '45%', color: '#39FF14', opacity: 0.06, duration: 9, delay: 0.3 },
];

function ShapeSVG({ shape }: { shape: FloatingShape }) {
  const { type, size, color, opacity } = shape;
  const strokeColor = color;
  const fillColor = 'none';

  const pathMap: Record<string, string> = {
    hexagon: `M${size / 2},0 L${size},${size * 0.25} L${size},${size * 0.75} L${size / 2},${size} L0,${size * 0.75} L0,${size * 0.25} Z`,
    triangle: `M${size / 2},0 L${size},${size} L0,${size} Z`,
    diamond: `M${size / 2},0 L${size},${size / 2} L${size / 2},${size} L0,${size / 2} Z`,
  };

  return (
    <svg
      width={size}
      height={type === 'triangle' ? size * 0.87 : size}
      viewBox={type === 'triangle' ? `0 0 ${size} ${size * 0.87}` : `0 0 ${size} ${size}`}
      fill={fillColor}
      stroke={strokeColor}
      strokeWidth="1"
      style={{ opacity }}
    >
      {type === 'circle' ? (
        <circle cx={size / 2} cy={size / 2} r={size / 2} />
      ) : type === 'ring' ? (
        <>
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 2} strokeDasharray="4 6" />
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 10} strokeWidth="0.5" />
        </>
      ) : (
        <path d={pathMap[type]} />
      )}
    </svg>
  );
}

export function HeroSection() {
  const { isPlaying, currentTrack, currentStation, togglePlay, setStation } = usePlayerStore();

  const color = currentStation?.color || '#00F0FF';

  return (
    <section className="relative z-10 flex flex-col items-center justify-center pt-28 sm:pt-36 pb-8 sm:pb-12 px-4 overflow-hidden">
      {/* Animated background mesh — morphing radial gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          isPlaying
            ? {
                background: [
                  `radial-gradient(ellipse 60% 50% at 50% 45%, ${color}12 0%, transparent 70%)`,
                  `radial-gradient(ellipse 70% 60% at 40% 50%, ${color}0A 0%, transparent 65%)`,
                  `radial-gradient(ellipse 50% 70% at 60% 40%, ${color}10 0%, transparent 75%)`,
                  `radial-gradient(ellipse 60% 50% at 50% 45%, ${color}12 0%, transparent 70%)`,
                ],
              }
            : {
                background: [
                  `radial-gradient(ellipse 80% 60% at 30% 40%, rgba(0,240,255,0.06) 0%, transparent 70%)`,
                  `radial-gradient(ellipse 60% 80% at 70% 50%, rgba(176,0,255,0.05) 0%, transparent 65%)`,
                  `radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,0,60,0.04) 0%, transparent 75%)`,
                  `radial-gradient(ellipse 80% 60% at 30% 40%, rgba(0,240,255,0.06) 0%, transparent 70%)`,
                ],
              }
        }
        transition={{ duration: isPlaying ? 4 : 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Screen-edge vignette glow when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              boxShadow: `inset 0 0 150px 40px ${color}08, inset 0 0 300px 80px ${color}04`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{ left: shape.x, top: shape.y }}
            animate={
              isPlaying
                ? {
                    y: [0, -20, 10, -15, 0],
                    x: [0, 8, -5, 12, 0],
                    rotate: [0, 45, -30, 60, 0],
                    opacity: [shape.opacity, shape.opacity * 2, shape.opacity],
                    scale: [1, 1.1, 0.95, 1.05, 1],
                  }
                : {
                    y: [0, -12, 0],
                    x: [0, 5, 0],
                    rotate: [0, 15, 0],
                    opacity: [shape.opacity * 0.7, shape.opacity, shape.opacity * 0.7],
                  }
            }
            transition={{
              duration: isPlaying ? shape.duration * 0.6 : shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          >
            <ShapeSVG shape={shape} />
          </motion.div>
        ))}
      </div>

      {/* Visualizer */}
      <motion.div
        className="mb-8 sm:mb-10 relative"
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer glow ring */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 -m-8 rounded-full"
            style={{
              background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.9, 0.5],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <CircularVisualizer />
      </motion.div>

      {/* Content */}
      <motion.div
        className="text-center max-w-3xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {currentTrack ? (
          <>
            {/* NOW PLAYING state */}
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              {isPlaying && (
                <MiniEqualizer color={color} size="md" />
              )}
              <motion.span
                className="text-xs font-semibold tracking-[0.25em] uppercase"
                style={{ color: `${color}90` }}
                animate={isPlaying ? { opacity: [0.6, 1, 0.6] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isPlaying ? 'NOW PLAYING' : 'PAUSED'}
              </motion.span>
            </motion.div>

            <motion.h1
              key={`title-${currentTrack.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              aria-live="polite"
              aria-atomic="true"
              aria-label={`${isPlaying ? 'Now playing' : 'Paused'}: ${currentTrack.title} by ${currentTrack.artist}`}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3"
              style={{
                color: '#E8E8ED',
                textShadow: isPlaying
                  ? `0 0 80px ${color}30, 0 0 160px ${color}10, 0 4px 30px rgba(0,0,0,0.8)`
                  : '0 4px 30px rgba(0,0,0,0.8)',
              }}
            >
              <ScrambleText text={currentTrack.title} active={isPlaying} speed={40} />
            </motion.h1>

            <motion.p
              key={`artist-${currentTrack.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-[#6B6B80] mb-8"
            >
              {currentTrack.artist}
              <span className="mx-2 text-[#3a3a4a]">—</span>
              <span style={{ color: `${color}90` }}>{currentStation?.name}</span>
            </motion.p>
          </>
        ) : (
          <>
            {/* ENORMOUS RADIOCODE title */}
            <motion.h1
              className="text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-6 break-words"
              style={{
                background: 'linear-gradient(135deg, #00F0FF 0%, #B000FF 35%, #FF003C 65%, #39FF14 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '300% 300%',
                filter: 'drop-shadow(0 0 40px rgba(0,240,255,0.15)) drop-shadow(0 0 80px rgba(176,0,255,0.08))',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <GlitchText>RADIOCODE</GlitchText>
            </motion.h1>

            {/* Animated divider line */}
            <motion.div
              className="h-[1px] mx-auto mb-6"
              style={{
                background: 'linear-gradient(90deg, transparent, #00F0FF40, #B000FF40, #FF003C30, transparent)',
              }}
              initial={{ width: 0 }}
              animate={{ width: '400px' }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Subtitle with typing cursor */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-xl text-[#6B6B80] mb-10 tracking-wide"
            >
              Select a frequency.{' '}
              <span className="text-[#E8E8ED]">Enter the void.</span>
              <span className="typing-cursor" />
            </motion.p>

            {/* PREMIUM TUNE IN button */}
            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: `0 0 60px ${color}40, 0 0 120px ${color}15, 0 0 200px ${color}08`,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStation('code-freq')}
              className="group relative px-10 py-4 rounded-full text-sm font-bold tracking-[0.3em] uppercase overflow-hidden"
              style={{
                border: `1.5px solid ${color}40`,
                color,
              }}
            >
              {/* Pulsing outer glow */}
              <motion.div
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Rotating border glow (using conic gradient via inline style) */}
              <motion.div
                className="absolute -inset-[2px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  background: `conic-gradient(from 0deg, ${color}60, transparent 25%, transparent 50%, ${color}30 75%, transparent)`,
                }}
              />
              <div
                className="absolute inset-[2px] rounded-full"
                style={{ background: '#050507' }}
              />

              {/* Background fill on hover */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${color}20, ${color}08)`,
                }}
              />

              {/* Shine sweep */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(105deg, transparent 35%, ${color}25 45%, ${color}25 55%, transparent 65%)`,
                }}
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />

              <span className="relative z-10 flex items-center gap-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                </svg>
                TUNE IN
              </span>
            </motion.button>
          </>
        )}
      </motion.div>
    </section>
  );
}