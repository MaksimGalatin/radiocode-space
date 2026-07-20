'use client';

import { useEffect, useRef } from 'react';
import { usePlayerStore } from '@/stores/playerStore';
import { getAudioElement, seekAudio } from '@/lib/audioSingleton';
import { audioUrl } from '@/lib/audioCdn';
import { track } from '@vercel/analytics';

export function useAudioEngine() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number>(0);
  const prevTrackUrlRef = useRef<string>('');

  const {
    currentTrack,
    currentStation,
    isPlaying,
    volume,
    isMuted,
    nextTrack,
    setCurrentTime,
    setDuration,
    setLoading,
    setAudioData,
    favorites,
  } = usePlayerStore();

  // Hydrate favorites from localStorage on mount
  useEffect(() => {
    const store = usePlayerStore.getState();
    if (store.favorites.length === 0) {
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('radiocode-favorites');
          if (stored) {
            const parsed = JSON.parse(stored) as string[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              usePlayerStore.setState({ favorites: parsed });
            }
          }
        } catch {
          // silently fail
        }
      }
    }
  }, []);

  // Initialize audio element
  useEffect(() => {
    const audio = getAudioElement();

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (typeof navigator !== 'undefined' && 'mediaSession' in navigator && audio.duration && isFinite(audio.duration)) {
        try {
          navigator.mediaSession.setPositionState({
            duration: audio.duration,
            position: Math.min(audio.currentTime, audio.duration),
            playbackRate: audio.playbackRate || 1,
          });
        } catch {
          /* setPositionState unsupported */
        }
      }
    };

    const handleDurationChange = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      nextTrack();
    };

    const handleCanPlay = () => {
      setLoading(false);
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    const handlePlaying = () => {
      setLoading(false);
    };

    const handleError = () => {
      setLoading(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('error', handleError);
    };
  }, [nextTrack, setCurrentTime, setDuration, setLoading]);

  // Handle track changes
  useEffect(() => {
    const audio = getAudioElement();
    if (!currentTrack) return;

    if (prevTrackUrlRef.current !== currentTrack.url) {
      prevTrackUrlRef.current = currentTrack.url;
      audio.src = audioUrl(currentTrack.url);
      setLoading(true);
    }
  }, [currentTrack, setLoading]);

  // MediaSession — action handlers (lock screen / headset / car)
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    const store = () => usePlayerStore.getState();
    const ms = navigator.mediaSession;
    const set = (action: MediaSessionAction, handler: MediaSessionActionHandler | null) => {
      try { ms.setActionHandler(action, handler); } catch { /* unsupported action */ }
    };
    set('play', () => store().play());
    set('pause', () => store().pause());
    set('nexttrack', () => store().nextTrack());
    set('previoustrack', () => store().prevTrack());
    set('stop', () => store().pause());
    set('seekto', (d) => {
      if (d && typeof d.seekTime === 'number') { seekAudio(d.seekTime); store().setCurrentTime(d.seekTime); }
    });
    return () => {
      (['play', 'pause', 'nexttrack', 'previoustrack', 'stop', 'seekto'] as MediaSessionAction[]).forEach((a) => set(a, null));
    };
  }, []);

  // MediaSession — now-playing metadata
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator) || !currentTrack) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        album: currentStation?.name || 'RadioCode.Space',
        artwork: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      });
    } catch {
      /* MediaMetadata unsupported */
    }
  }, [currentTrack, currentStation]);

  // MediaSession — playback state
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    try { navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'; } catch { /* noop */ }
  }, [isPlaying]);

  // Analytics — station selection
  useEffect(() => {
    if (currentStation) track('station_selected', { station: currentStation.name });
  }, [currentStation]);

  // Analytics — play start + listening minutes (key radio metric)
  const wasPlayingRef = useRef(false);
  useEffect(() => {
    if (isPlaying && !wasPlayingRef.current) {
      track('play_started', { station: currentStation?.name || 'unknown' });
    }
    wasPlayingRef.current = isPlaying;
    if (!isPlaying) return;
    const id = setInterval(() => {
      track('listen_minute', { station: usePlayerStore.getState().currentStation?.name || 'unknown' });
    }, 60_000);
    return () => clearInterval(id);
  }, [isPlaying, currentStation]);

  // Handle play/pause
  useEffect(() => {
    const audio = getAudioElement();
    if (!currentTrack) return;

    if (isPlaying) {
      if (!contextRef.current) {
        try {
          const ctx = new AudioContext();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.8;
          const source = ctx.createMediaElementSource(audio);
          source.connect(analyser);
          analyser.connect(ctx.destination);
          contextRef.current = ctx;
          analyserRef.current = analyser;
        } catch {
          // AudioContext already created
        }
      }

      if (contextRef.current?.state === 'suspended') {
        contextRef.current.resume();
      }

      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Handle volume
  useEffect(() => {
    const audio = getAudioElement();
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Analyser loop
  useEffect(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateData = () => {
      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        setAudioData(new Uint8Array(dataArray));
      }
      animFrameRef.current = requestAnimationFrame(updateData);
    };

    animFrameRef.current = requestAnimationFrame(updateData);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [currentTrack, isPlaying, setAudioData]);
}