'use client';

import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { buildTrackShareUrl, useSocial } from '@/lib/radioSocial';
import { useRadioT } from '@/lib/radioI18n';
import { ShareMenu } from './ShareMenu';

// Share a deep link to a specific track. If the sharer is logged in, their referral
// code (passport username) rides along → whoever registers from the link joins their
// Ambassador Grid downline. Radio as a referral machine.
//
// 14.09.2026 — кнопка открывает НАСТОЯЩЕЕ меню со списком сетей.
// Раньше она звала `navigator.share`, то есть системное окно телефона.
// Замер на живом сайте: на компьютере `navigator.share` не существует
// (`undefined`), нажатие Enter открывало ноль диалогов, и код молча пробовал
// положить ссылку в буфер — а при отказе буфера не показывал даже этого.
// Со стороны человека кнопка выглядела мёртвой: «нажал — зависло».
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
  const [открыто, setОткрыто] = useState(false);
  const [done] = useState(false);
  const кнопка = useRef<HTMLButtonElement>(null);

  const url = buildTrackShareUrl(trackId, refCode);

  return (
    <>
      <motion.button
        ref={кнопка}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.85 }}
        onClick={(e) => { e.stopPropagation(); setОткрыто((в) => !в); }}
        aria-label={rt('shareTrack')}
        aria-haspopup="dialog"
        aria-expanded={открыто}
        title={rt('shareTrack')}
        className="flex items-center gap-1 shrink-0 rounded-full px-1.5 py-1 transition-colors hover:bg-white/[0.05] relative after:absolute after:content-[''] after:inset-[-10px]"
      >
        {done ? (
          <>
            <Check width={size} height={size} style={{ color }} strokeWidth={2.4} />
            <span className="text-[13px] font-mono hidden sm:inline" style={{ color }}>{rt('copied')}</span>
          </>
        ) : (
          <Share2
            width={size}
            height={size}
            style={{ color: открыто ? color : '#8B8BA8' }}
            strokeWidth={2}
          />
        )}
      </motion.button>

      <ShareMenu
        открыто={открыто}
        закрыть={() => setОткрыто(false)}
        url={url}
        трек={title}
        якорь={кнопка.current}
        color={color}
      />
    </>
  );
}
