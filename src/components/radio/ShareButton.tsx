'use client';

import { Share2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { buildTrackShareUrl, shareUrl, useSocial } from '@/lib/radioSocial';
import { useRadioT } from '@/lib/radioI18n';

// Share a deep link to a specific track. If the sharer is logged in, their referral
// code (passport username) rides along → whoever registers from the link joins their
// Ambassador Grid downline. Radio as a referral machine.
export function ShareButton({
  trackId,
  title,
  color = '#00F0FF',
  size = 16,
}: {
  trackId: string;
  title: string;
  color?: string;
  size?: number;
}) {
  const rt = useRadioT();
  const refCode = useSocial((s) => s.refCode);
  const [done, setDone] = useState(false);

  const onShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildTrackShareUrl(trackId, refCode);
    const res = await shareUrl(url, `${title} — RadioCode.Space`);
    if (res === 'copied' || res === 'shared') {
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.85 }}
      onClick={onShare}
      aria-label={rt('shareTrack')}
      title={done ? rt('copied') : rt('shareTrack')}
      className="flex items-center gap-1 shrink-0 rounded-full px-1.5 py-1 transition-colors hover:bg-white/[0.05]"
    >
      {done ? (
        <>
          <Check width={size} height={size} style={{ color }} strokeWidth={2.4} />
          <span className="text-[13px] font-mono hidden sm:inline" style={{ color }}>{rt('copied')}</span>
        </>
      ) : (
        <Share2 width={size} height={size} style={{ color: '#8B8BA8' }} strokeWidth={2} />
      )}
    </motion.button>
  );
}
