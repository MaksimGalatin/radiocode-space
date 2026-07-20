'use client';

import { useState, useCallback, useMemo } from 'react';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { usePlayerStore } from '@/stores/playerStore';
import { stations } from '@/lib/stations';
import { ParticleBackground } from '@/components/radio/ParticleBackground';
import { AmbientOrbs } from '@/components/radio/AmbientOrbs';
import { ScanlineOverlay, MatrixGrid } from '@/components/radio/ScanlineOverlay';
import { RadioHeader } from '@/components/radio/RadioHeader';
import { HeroSection } from '@/components/radio/HeroSection';
import { StationCard } from '@/components/radio/StationCard';
import { PlayerBar } from '@/components/radio/PlayerBar';
import { PlaylistPanel } from '@/components/radio/PlaylistPanel';
import { WaveformBar } from '@/components/radio/WaveformBar';
import { VolumeVisualizer } from '@/components/radio/VolumeVisualizer';
import { PlayHistory } from '@/components/radio/PlayHistory';
import { IntroSplash } from '@/components/radio/IntroSplash';
import { GenreFilter } from '@/components/radio/GenreFilter';
import { FullscreenVisualizer } from '@/components/radio/FullscreenVisualizer';
import { AnimatedCounter } from '@/components/radio/AnimatedCounter';
import { motion, AnimatePresence } from 'framer-motion';

const TICKER_TEXT = '◆ NEON OVERFLOW — DARKSYNTH ◆ CYBERPUNK / SYNTHWAVE ◆ CODE FREQ ◆ VBR ~182KBPS · 48kHz ◆ BROADCASTING ON ALL FREQUENCIES ◆ ';

function LiveTicker() {
  const { currentStation } = usePlayerStore();
  const color = currentStation?.color || '#00F0FF';

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        borderTop: `1px solid rgba(255,255,255,0.03)`,
        borderBottom: `1px solid rgba(255,255,255,0.03)`,
        background: 'rgba(255,255,255,0.01)',
      }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {/* Duplicate text for seamless loop */}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="text-[10px] font-mono tracking-[0.3em] uppercase px-4 shrink-0"
            style={{ color: `${color}50` }}
          >
            {TICKER_TEXT}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function SectionDivider() {
  const { currentStation } = usePlayerStore();
  const color = currentStation?.color || '#00F0FF';

  return (
    <div className="flex items-center justify-center py-4 sm:py-6">
      <div
        className="h-[1px] flex-1 max-w-[200px]"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.06))`,
        }}
      />
      <div
        className="w-2 h-2 rotate-45 mx-3 shrink-0"
        style={{
          background: `${color}30`,
          boxShadow: `0 0 8px ${color}15`,
        }}
      />
      <div
        className="h-[1px] flex-1 max-w-[200px]"
        style={{
          background: `linear-gradient(270deg, transparent, rgba(255,255,255,0.06))`,
        }}
      />
    </div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const { isPlaying, currentTrack, currentStation } = usePlayerStore();

  const filteredStations = useMemo(() => {
    if (selectedGenre === 'ALL') return stations;
    return stations.filter((s) =>
      s.genre.split(' / ').map((g) => g.trim()).includes(selectedGenre)
    );
  }, [selectedGenre]);

  const totalTracks = useMemo(
    () => stations.reduce((sum, s) => sum + s.tracks.length, 0),
    []
  );
  const totalGenres = useMemo(
    () => new Set(stations.flatMap((s) => s.genre.split(' / ').map((g) => g.trim()))).size,
    []
  );

  useAudioEngine();
  useKeyboardShortcuts();

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <div className="min-h-[100svh] w-full overflow-x-hidden flex flex-col bg-[#050507]">
      {/* Intro splash animation */}
      <IntroSplash onComplete={handleSplashComplete} />

      {/* Background layers */}
      <ParticleBackground isPlaying={isPlaying} />
      <AmbientOrbs />
      <MatrixGrid />
      <ScanlineOverlay />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      <AnimatePresence>
        {!showSplash && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <RadioHeader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="relative z-10 flex-1 pb-32">
        {/* Hero with Visualizer */}
        <HeroSection />

        {/* Waveform + Volume visualizer */}
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 mb-2 space-y-1.5"
          >
            <WaveformBar />
            <VolumeVisualizer />
          </motion.div>
        )}

        {/* Live Ticker Marquee */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-4">
          <LiveTicker />
        </div>

        {/* Stations Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-8 sm:mb-10 flex items-end justify-between"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#E8E8ED] tracking-wide mb-2">
                Frequencies
              </h2>
              <p className="text-sm text-[#6B6B80]">
                {stations.length} stations broadcasting in the void
              </p>
            </div>
            {/* Keyboard shortcuts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="hidden lg:flex items-center gap-3 text-[10px] text-[#3a3a4a]"
            >
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#6B6B80] font-mono">Space</kbd> Play
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#6B6B80] font-mono">←→</kbd> Seek
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#6B6B80] font-mono">M</kbd> Mute
              </span>
            </motion.div>
          </motion.div>

          {/* Genre Filter */}
          <GenreFilter selectedGenre={selectedGenre} onSelect={setSelectedGenre} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredStations.map((station, index) => (
              <StationCard key={station.id} station={station} index={index} />
            ))}
          </div>
        </section>

        {/* Decorative Divider */}
        <SectionDivider />

        {/* Play History */}
        <PlayHistory />

        {/* Decorative Divider */}
        <SectionDivider />

        {/* Stats / Info section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-2xl p-6 sm:p-10 relative overflow-hidden"
          >
            {/* Decorative corner lines */}
            <div className="absolute top-0 left-0 w-16 h-[1px] bg-gradient-to-r from-[#00F0FF]30 to-transparent" />
            <div className="absolute top-0 left-0 w-[1px] h-16 bg-gradient-to-b from-[#00F0FF]30 to-transparent" />
            <div className="absolute bottom-0 right-0 w-16 h-[1px] bg-gradient-to-l from-[#FF003C]30 to-transparent" />
            <div className="absolute bottom-0 right-0 w-[1px] h-16 bg-gradient-to-t from-[#FF003C]30 to-transparent" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <AnimatedCounter value={stations.length} label="Stations" sub="Online" color="#00F0FF" delay={0} />
              <AnimatedCounter value={totalTracks} label="Tracks" sub="In rotation" color="#B000FF" delay={0.15} />
              <AnimatedCounter value={182} label="Bitrate" sub="VBR avg" color="#FF003C" delay={0.3} suffix="k" />
              <AnimatedCounter value={totalGenres} label="Genres" sub="Spectrum" color="#39FF14" delay={0.45} />
            </div>
          </motion.div>
        </section>

        {/* Footer with scan-line overlay */}
        <footer className="relative z-10 mt-auto scan-line-h">
          <div
            className="border-t"
            style={{ borderColor: 'rgba(255,255,255,0.04)' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              {/* Ecosystem cross-links */}
              <div className="mb-8">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#3a3a4a] mb-4 text-center sm:text-left">
                  Part of the CODE Eternal ecosystem
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3">
                  {[
                    { label: 'CODE Eternal', href: 'https://www.codeofdigitaleternity.com' },
                    { label: 'AIfa Works', href: 'https://aifa.works' },
                    { label: 'AIfa Digital', href: 'https://aifa.digital' },
                    { label: 'Whitepaper', href: 'https://www.codeofdigitaleternity.com/whitepaper' },
                    { label: 'Roadmap', href: 'https://www.codeofdigitaleternity.com/roadmap' },
                    { label: 'News', href: 'https://www.codeofdigitaleternity.com/news' },
                    { label: '$GALATIN', href: 'https://www.codeofdigitaleternity.com/whitepaper#sec-tokenomics' },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#6B6B80] hover:text-[#00F0FF] transition-colors duration-200"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Brand row */}
              <div
                className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-bold tracking-[0.15em]"
                    style={{
                      background: 'linear-gradient(135deg, #00F0FF, #B000FF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    RADIOCODE.SPACE
                  </span>
                  <span className="text-xs text-[#3a3a4a]">|</span>
                  <span className="text-xs text-[#6B6B80]">CODE Eternal</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono tracking-wider text-[#3a3a4a]">
                    Music by AIfa &amp; DJ Galatin
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-[#3a3a4a]">
                    © 2026
                  </span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Playlist panel */}
      <PlaylistPanel />

      {/* Persistent player */}
      <PlayerBar />

      {/* Fullscreen visualizer overlay */}
      <FullscreenVisualizer />
    </div>
  );
}