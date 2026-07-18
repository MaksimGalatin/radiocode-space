'use client';

import { motion } from 'framer-motion';

export function MiniEqualizer({ color = '#00F0FF', size = 'sm' }: { color?: string; size?: 'sm' | 'md' }) {
  const barSizes = size === 'sm'
    ? ['w-[3px]', 'w-[3px]', 'w-[3px]', 'w-[3px]', 'w-[3px]']
    : ['w-[4px]', 'w-[4px]', 'w-[4px]', 'w-[4px]', 'w-[4px]'];
  const h = size === 'sm' ? 'h-4' : 'h-6';

  return (
    <div className={`flex items-end gap-[2px] ${h}`}>
      <div className={`${barSizes[0]} rounded-full eq-bar-1`} style={{ backgroundColor: color, minHeight: '3px' }} />
      <div className={`${barSizes[1]} rounded-full eq-bar-2`} style={{ backgroundColor: color, minHeight: '3px' }} />
      <div className={`${barSizes[2]} rounded-full eq-bar-3`} style={{ backgroundColor: color, minHeight: '3px' }} />
      <div className={`${barSizes[3]} rounded-full eq-bar-4`} style={{ backgroundColor: color, minHeight: '3px' }} />
      <div className={`${barSizes[4]} rounded-full eq-bar-5`} style={{ backgroundColor: color, minHeight: '3px' }} />
    </div>
  );
}

export function TrackMiniEqualizer({ color, isPlaying }: { color: string; isPlaying: boolean }) {
  if (!isPlaying) return null;
  return <MiniEqualizer color={color} size="sm" />;
}