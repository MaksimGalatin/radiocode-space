'use client';

import { useEffect } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { seekAudio } from '@/lib/audioSingleton';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const { togglePlay, nextTrack, prevTrack, volume, setVolume, toggleMute } =
        usePlayerStore.getState();

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          if (e.shiftKey) {
            nextTrack();
          } else {
            const state = usePlayerStore.getState();
            seekAudio(Math.min(state.currentTime + 5, state.duration));
          }
          break;
        case 'ArrowLeft':
          if (e.shiftKey) {
            prevTrack();
          } else {
            const state = usePlayerStore.getState();
            seekAudio(Math.max(state.currentTime - 5, 0));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume(Math.min(volume + 0.05, 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume(Math.max(volume - 0.05, 0));
          break;
        case 'KeyM':
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}