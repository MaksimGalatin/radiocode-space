'use client';

// Кнопка «Сохранить в плейлист» у трека.
//
// Поручение Архитектора 14.09.2026: «у треков добавить кнопку Сохранить в
// плейлист и сделать у зарегистрированных пользователей опцию Мои Плейлисты».
//
// ПОЧЕМУ ОДНО НАЖАТИЕ, А НЕ ВЫБОР ПОДБОРКИ. Человек слушает радио; в момент,
// когда трек понравился, он не хочет открывать список и что-то выбирать — он
// хочет сохранить. Поэтому первое нажатие кладёт трек в первую подборку, а
// если её нет — заводит её сам. Разбираться по подборкам можно потом, в
// разделе «Мои Плейлисты», спокойно.
//
// Гостю кнопка видна, но приглушена и ведёт в кабинет: плейлист — личная вещь
// и должен находиться на любом устройстве, а к устройству его привязывать
// нечестно (лайк — другое дело, он общий голос).

import { ListPlus, Check, Loader2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSocial } from '@/lib/radioSocial';
import { useCurrentLang, useRadioT } from '@/lib/radioI18n';

export function PlaylistButton({
  trackId,
  color = '#00F0FF',
  size = 15,
}: {
  trackId: string;
  color?: string;
  size?: number;
}) {
  const rt = useRadioT();
  const lang = useCurrentLang();
  const вошёл = useSocial((s) => s.loggedIn);
  const [состояние, setСостояние] = useState<'покой' | 'идёт' | 'готово'>('покой');

  const сохранить = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!вошёл) {
      window.location.href = '/cabinet';
      return;
    }
    setСостояние('идёт');
    try {
      const о = await fetch('/api/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', trackId, locale: lang }),
      });
      if (о.status === 401) { window.location.href = '/cabinet'; return; }
      if (!о.ok) throw new Error('не сохранилось');
      setСостояние('готово');
      setTimeout(() => setСостояние('покой'), 2000);
    } catch {
      // Молчащая кнопка — худшее, что можно сделать: человек не поймёт,
      // сохранилось или нет. Возвращаем в покой, чтобы можно было нажать ещё.
      setСостояние('покой');
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.85 }}
      onClick={сохранить}
      aria-label={вошёл ? rt('toPlaylist') : rt('playlistLogin')}
      title={вошёл ? rt('toPlaylist') : rt('playlistLogin')}
      className="flex items-center gap-1 shrink-0 rounded-full px-1.5 py-1 transition-colors hover:bg-white/[0.05] relative after:absolute after:content-[''] after:inset-[-10px]"
    >
      {состояние === 'идёт' ? (
        <Loader2 width={size} height={size} className="animate-spin" style={{ color }} strokeWidth={2} />
      ) : состояние === 'готово' ? (
        <Check width={size} height={size} style={{ color }} strokeWidth={2.4} />
      ) : вошёл ? (
        <ListPlus width={size} height={size} style={{ color: '#8B8BA8' }} strokeWidth={2} />
      ) : (
        <span className="relative flex items-center">
          <ListPlus width={size} height={size} style={{ color: '#8B8BA8' }} strokeWidth={2} />
          <Lock width={size * 0.6} height={size * 0.6} style={{ color: '#8B8BA8' }} strokeWidth={2.5} className="-ml-1 -mb-1.5 self-end" />
        </span>
      )}
    </motion.button>
  );
}
