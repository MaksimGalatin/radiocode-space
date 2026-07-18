'use client';

import { motion } from 'framer-motion';
import { Radio, Waves, Zap, Skull } from 'lucide-react';
import { Station } from '@/lib/stations';
import { usePlayerStore } from '@/stores/playerStore';
import { TiltCard } from './TiltCard';

const iconMap: Record<string, React.ReactNode> = {
  Radio: <Radio className="w-5 h-5 sm:w-6 sm:h-6" />,
  Waves: <Waves className="w-5 h-5 sm:w-6 sm:h-6" />,
  Zap: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
  Skull: <Skull className="w-5 h-5 sm:w-6 sm:h-6" />,
};

interface StationCardProps {
  station: Station;
  index: number;
}

function WaveBars({ color, playing }: { color: string; playing: boolean }) {
  return (
    <div className="flex items-end gap-[2px] h-3 opacity-60">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{ backgroundColor: color, minHeight: '2px' }}
          animate={
            playing
              ? {
                  height: [3, 10 + i * 3, 5, 8 + i * 2, 3],
                }
              : { height: 3 }
          }
          transition={
            playing
              ? {
                  duration: 1.2 + i * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }
              : {}
          }
        />
      ))}
    </div>
  );
}

function CornerBracket({ position, color }: { position: 'tl' | 'br'; color: string }) {
  const isTopLeft = position === 'tl';
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        [isTopLeft ? 'top' : 'bottom']: '12px',
        [isTopLeft ? 'left' : 'right']: '12px',
        width: '20px',
        height: '20px',
        opacity: 0.25,
      }}
    >
      <div
        className="absolute h-[1px] w-full"
        style={{
          background: `linear-gradient(90deg, ${color}, transparent)`,
          ...(isTopLeft ? {} : { bottom: 0, left: 0, background: `linear-gradient(270deg, ${color}, transparent)` }),
        }}
      />
      <div
        className="absolute w-[1px] h-full"
        style={{
          background: `linear-gradient(180deg, ${color}, transparent)`,
          ...(isTopLeft ? {} : { right: 0, top: 0, background: `linear-gradient(0deg, ${color}, transparent)` }),
        }}
      />
    </div>
  );
}

export function StationCard({ station, index }: StationCardProps) {
  const {
    currentStation,
    isPlaying,
    setStation,
    toggleShowPlaylist,
  } = usePlayerStore();

  const isActive = currentStation?.id === station.id;
  const isCurrentlyPlaying = isActive && isPlaying;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => {
        if (isActive) {
          toggleShowPlaylist();
        } else {
          setStation(station.id);
        }
      }}
      className="group relative cursor-pointer"
      style={{ perspective: '800px' }}
    >
      <TiltCard glowColor={station.color} intensity={8} className="relative">
        {/* Animated gradient border on hover/active with breathing */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl"
          animate={
            isCurrentlyPlaying
              ? {
                  opacity: [0.3, 0.7, 0.3],
                }
              : {
                  opacity: 0,
                }
          }
          transition={
            isCurrentlyPlaying
              ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
          style={{
            background: `linear-gradient(135deg, ${station.color}60, ${station.color}10, transparent 60%, ${station.color}30)`,
          }}
        />

        {/* Hover border */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.12), transparent 40%, rgba(255,255,255,0.06))`,
          }}
        />

        {/* Card body — holo shimmer on hover */}
        <div className="relative glass-card holo-shimmer-surface rounded-2xl p-5 sm:p-6 overflow-hidden transition-all duration-300 group-hover:scale-[1.03] group-hover:-translate-y-1 active:scale-[0.98]"
          style={{
            boxShadow: isActive
              ? `0 0 30px ${station.color}15, 0 8px 32px rgba(0,0,0,0.4), 0 0 60px ${station.color}08`
              : 'none',
            transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease',
          }}
        >
          {/* Active radial glow */}
          {isActive && (
            <motion.div
              layoutId="station-glow"
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${station.glowColor} 0%, transparent 70%)`,
              }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Hover glow with mouse follow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${station.glowColor.replace('0.3', '0.08')} 0%, transparent 60%)`,
            }}
          />

          {/* Corner brackets */}
          <CornerBracket position="tl" color={station.color} />
          <CornerBracket position="br" color={station.color} />

          {/* Animated scan line on active */}
          <motion.div
            className="absolute left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, transparent, ${station.color}40, transparent)`,
            }}
            animate={isActive ? {
              top: ['0%', '100%'],
              opacity: [0, 0.3, 0],
            } : {}}
            transition={isActive ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Top row: Icon + Bitrate */}
            <div className="flex items-start justify-between mb-4">
              {/* Station icon with GLOW and PULSE when active */}
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: isCurrentlyPlaying
                    ? `radial-gradient(circle, ${station.color}25, ${station.color}10)`
                    : `${station.color}10`,
                  border: `1px solid ${station.color}20`,
                  color: station.color,
                }}
                animate={isCurrentlyPlaying ? {
                  boxShadow: [
                    `0 0 20px ${station.color}20, 0 0 60px ${station.color}10`,
                    `0 0 40px ${station.color}40, 0 0 80px ${station.color}20`,
                    `0 0 20px ${station.color}20, 0 0 60px ${station.color}10`,
                  ],
                  borderColor: [
                    `${station.color}20`,
                    `${station.color}50`,
                    `${station.color}20`,
                  ],
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {iconMap[station.icon]}
              </motion.div>

              {/* Bitrate badge with gradient bg */}
              <motion.div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider"
                style={{
                  background: `linear-gradient(135deg, ${station.color}10, ${station.color}05)`,
                  border: `1px solid ${station.color}15`,
                  color: `${station.color}90`,
                }}
                whileHover={{ scale: 1.05, borderColor: `${station.color}30` }}
              >
                <motion.div
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: station.color }}
                  animate={isCurrentlyPlaying ? { opacity: [1, 0.3, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                {station.bitrate}
              </motion.div>
            </div>

            {/* Station name with glow */}
            <h3
              className="text-xl sm:text-2xl font-bold tracking-wide mb-1.5 transition-all duration-300"
              style={{
                color: isActive ? station.color : '#E8E8ED',
                textShadow: isActive
                  ? `0 0 40px ${station.color}40, 0 0 80px ${station.color}15, 0 0 120px ${station.color}08`
                  : 'none',
              }}
            >
              {station.name}
            </h3>

            {/* Genre tag with gradient background */}
            <div
              className="inline-block text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] mb-3 uppercase px-2 py-0.5 rounded-sm"
              style={{
                background: `linear-gradient(135deg, ${station.color}12, ${station.color}06)`,
                color: `${station.color}80`,
              }}
            >
              {station.genre}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#6B6B80] leading-relaxed line-clamp-2 mb-4">
              {station.description}
            </p>

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              {/* Track count */}
              <div className="flex items-center gap-2">
                <motion.span
                  className="text-xs font-mono text-[#6B6B80]"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {station.tracks.length}
                </motion.span>
                <span className="text-xs text-[#3a3a4a]">tracks</span>
              </div>

              {isCurrentlyPlaying ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{
                    background: `${station.color}15`,
                    border: `1px solid ${station.color}25`,
                    boxShadow: `0 0 15px ${station.color}10`,
                  }}
                >
                  <div className="relative flex items-end gap-[2px] h-3">
                    <div className="w-[2px] rounded-full eq-bar-1" style={{ backgroundColor: station.color, minHeight: '2px' }} />
                    <div className="w-[2px] rounded-full eq-bar-2" style={{ backgroundColor: station.color, minHeight: '2px' }} />
                    <div className="w-[2px] rounded-full eq-bar-3" style={{ backgroundColor: station.color, minHeight: '2px' }} />
                    <div className="w-[2px] rounded-full eq-bar-4" style={{ backgroundColor: station.color, minHeight: '2px' }} />
                  </div>
                  <span className="text-[10px] font-medium tracking-wider" style={{ color: station.color }}>
                    LIVE
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-70 transition-all duration-300"
                  style={{
                    border: `1px solid ${station.color}30`,
                    background: `${station.color}05`,
                  }}
                  whileHover={{ scale: 1.15, boxShadow: `0 0 20px ${station.color}20` }}
                >
                  <svg className="w-3 h-3 ml-0.5" fill={station.color} viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              )}
            </div>

            {/* Wave bars at bottom of card */}
            <div className="mt-3 pt-3 border-t border-white/[0.04]">
              <WaveBars color={station.color} playing={isCurrentlyPlaying} />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}