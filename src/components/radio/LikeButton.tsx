'use client';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLikes } from '@/lib/likes';
import { useRadioT } from '@/lib/radioI18n';

// ♥ a track. Aggregate likes across all listeners = the audience-curated shortlist
// for the debut album (10–12 tracks). Works for anonymous listeners too (device id).
export function LikeButton({
  trackId,
  color = '#FF003C',
  size = 16,
  showCount = true,
}: {
  trackId: string;
  color?: string;
  size?: number;
  showCount?: boolean;
}) {
  const rt = useRadioT();
  const liked = useLikes((s) => s.mine.has(trackId));
  const count = useLikes((s) => s.counts[trackId] || 0);
  const toggle = useLikes((s) => s.toggle);

  return (
    <motion.button
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.85 }}
      onClick={(e) => { e.stopPropagation(); toggle(trackId); }}
      aria-label={liked ? rt('unlike') : rt('like')}
      aria-pressed={liked}
      title={liked ? rt('unlike') : rt('like')}
      className="flex items-center gap-1 shrink-0 rounded-full px-1.5 py-1 transition-colors hover:bg-white/[0.05] relative after:absolute after:content-[''] after:inset-[-10px]"
    >
      <Heart
        width={size}
        height={size}
        style={{ color: liked ? color : '#8B8BA8' }}
        fill={liked ? color : 'none'}
        strokeWidth={2}
      />
      {showCount && count > 0 && (
        <span
          className="text-[13px] font-mono tabular-nums"
          style={{ color: liked ? color : '#8B8BA8' }}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}
