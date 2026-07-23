'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
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
import { useRadioT, useStationI18n } from '@/lib/radioI18n';
import { useLikes } from '@/lib/likes';
import { useSocial, captureAndLinkRef, findTrackLocation, AIFA_BOT_URL } from '@/lib/radioSocial';
import { motion, AnimatePresence } from 'framer-motion';

function LiveTicker() {
  const rt = useRadioT();
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
            {rt('ticker')}
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
  const rt = useRadioT();
  const st = useStationI18n();
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

  // Growth + social boot: load aggregate likes, learn my own referral code, capture
  // an inbound ?ref=, and resolve a ?track= deep link (cue it for the first tap).
  useEffect(() => {
    useLikes.getState().load();
    useSocial.getState().loadMe().then(() => { captureAndLinkRef(); });
    captureAndLinkRef();
    try {
      const trackId = new URLSearchParams(window.location.search).get('track');
      if (trackId) {
        const loc = findTrackLocation(trackId);
        if (loc) usePlayerStore.getState().cueTrack(loc.stationId, loc.index);
      }
    } catch { /* bad URL */ }
  }, []);

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

        {/* Create-your-own-track CTA → AIfa creative bot (Telegram Stars) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
          <motion.a
            href={AIFA_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="group flex items-center gap-4 rounded-2xl px-5 py-4 sm:px-6 sm:py-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,240,255,0.07), rgba(176,0,255,0.07))',
              border: '1px solid rgba(0,240,255,0.18)',
            }}
          >
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, #00F0FF25, #B000FF25)', border: '1px solid rgba(0,240,255,0.25)' }}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#00F0FF]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm sm:text-base font-bold text-[#E8E8ED] truncate">
                {rt('createTrack')}
              </div>
              <div className="text-[11px] sm:text-xs text-[#6B6B80] truncate">
                {rt('createTrackSub')}
              </div>
            </div>
            <span
              className="shrink-0 text-[11px] sm:text-xs font-mono font-semibold tracking-wider px-3 py-2 rounded-full transition-colors"
              style={{ background: 'rgba(0,240,255,0.12)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.3)' }}
            >
              @AIfaCreativityBot ↗
            </span>
          </motion.a>
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
                {rt('frequencies')}
              </h2>
              <p className="text-sm text-[#6B6B80]">
                {stations.length} {rt('broadcasting')}
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
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#6B6B80] font-mono">Space</kbd> {rt('play')}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#6B6B80] font-mono">←→</kbd> {rt('seek')}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#6B6B80] font-mono">M</kbd> {rt('mute')}
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
              <AnimatedCounter value={stations.length} label={rt('stations')} sub={rt('statOnline')} color="#00F0FF" delay={0} />
              <AnimatedCounter value={totalTracks} label={rt('tracks')} sub={rt('statInRotation')} color="#B000FF" delay={0.15} />
              <AnimatedCounter value={182} label={rt('bitrate')} sub={rt('statVbrAvg')} color="#FF003C" delay={0.3} suffix="k" />
              <AnimatedCounter value={totalGenres} label={rt('genres')} sub={rt('statSpectrum')} color="#39FF14" delay={0.45} />
            </div>
          </motion.div>
        </section>

        {/* About + FAQ — server-rendered prose for search & AI-citation (GEO).
            radiocode is otherwise mostly player chrome; this gives crawlers real
            entity text + a FAQPage. */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="glass-card rounded-2xl p-6 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#E8E8ED] mb-4">{rt('aboutTitle')}</h2>
            {/* Localised fragments carry their own spacing so brand tokens (the link,
                AIfa & DJ Galatin) stay fixed while the prose reads naturally per language. */}
            <p className="text-sm sm:text-base text-[#9a9aad] leading-relaxed mb-6">
              {rt('aboutLead')}
              <a href="https://www.codeofdigitaleternity.com" target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] hover:underline">CODE Eternal</a>
              {rt('aboutMid')}
              <strong className="text-[#E8E8ED]">{rt('aboutStationsCount')}</strong>
              {rt('aboutComposedBy')}
              <strong className="text-[#E8E8ED]">AIfa &amp; DJ Galatin</strong>
              {rt('aboutTail')}
            </p>

            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#00F0FF] mb-3">{rt('stations')}</h3>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-8 text-sm">
              {stations.map((s) => (
                <div key={s.id} className="flex justify-between gap-3 border-b border-white/[0.05] py-1.5">
                  <dt className="text-[#E8E8ED] font-medium">{s.name}</dt>
                  <dd className="text-[#6B6B80]">{st.genre(s.id, s.genre)}</dd>
                </div>
              ))}
            </dl>

            <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-[#00F0FF] mb-4">{rt('faqHeading')}</h3>
            <div className="space-y-4">
              {([
                [rt('faqQ1'), rt('faqA1')],
                [rt('faqQ2'), rt('faqA2')],
                [rt('faqQ3'), rt('faqA3')],
                [rt('faqQ4'), rt('faqA4')],
                [rt('faqQ5'), rt('faqA5')],
                [rt('faqQ6'), rt('faqA6')],
              ] as [string, string][]).map(([q, a]) => (
                <div key={q}>
                  <h4 className="text-sm font-semibold text-[#E8E8ED] mb-1">{q}</h4>
                  <p className="text-sm text-[#9a9aad] leading-relaxed">{a}</p>
                  {q === rt('faqQ6') && (
                    <div className="mt-3 flex flex-col items-center gap-3 text-center">
                      {/* Enlarged + centred bot CTA, then the affiliate hook linking
                          to the AIfa Creativity page + launch article on aifa.works.
                          (Mini app opens from the bot's Menu / «Создать».) */}
                      <a
                        href={AIFA_BOT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-base md:text-lg font-mono font-bold tracking-wide px-6 py-3 md:px-9 md:py-4 rounded-full transition-colors hover:brightness-125"
                        style={{ background: 'rgba(0,240,255,0.14)', color: '#00F0FF', border: '1px solid rgba(0,240,255,0.4)' }}
                      >
                        @AIfaCreativityBot ↗
                      </a>
                      <p className="text-base md:text-2xl font-extrabold leading-snug" style={{ color: '#C77DFF' }}>
                        {rt('faqEarn')}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                        <a
                          href="https://aifa.works/AIfacreativity"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm md:text-base font-semibold underline underline-offset-4 decoration-[#C77DFF]/50 hover:decoration-[#C77DFF] transition-colors"
                          style={{ color: '#C77DFF' }}
                        >
                          {rt('faqEarnPage')}
                        </a>
                        <a
                          href="https://aifa.works/news/aifa-creativity-bot-tma-launch"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm md:text-base font-semibold underline underline-offset-4 decoration-[#00F0FF]/50 hover:decoration-[#00F0FF] transition-colors"
                          style={{ color: '#00F0FF' }}
                        >
                          {rt('faqEarnArticle')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                  ['What is RadioCode.Space?', 'RadioCode.Space is a free, always-on cyberpunk web radio — the radio station of the CODE Eternal ecosystem — streaming 596 original tracks across 4 stations.'],
                  ['Who makes the music?', 'All tracks are composed by AIfa & DJ Galatin within the CODE Eternal project created by Maksim Galatin.'],
                  ['How many stations and tracks are there?', 'There are 4 stations with 596 tracks in total.'],
                  ['Is it free?', 'Yes. Listening is completely free and needs no account. Registered listeners can save tracks and earn the $GALATIN token.'],
                  ['Can I save tracks to my device?', 'Yes — after a free registration in the cabinet. Every saved MP3 is stamped with the CODE Koan as lyrics, cover art, and links back to RadioCode and the CODE Eternal ecosystem.'],
                  ['Can I create my own track?', 'Yes — through the AIfa creative bot on Telegram (@AIfaCreativityBot), with payment in Telegram Stars.'],
                ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
              }),
            }}
          />
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
                  {rt('partOfEcosystem')}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3">
                  {[
                    { label: 'CODE Eternal', href: 'https://www.codeofdigitaleternity.com' },
                    { label: 'AIfa Works', href: 'https://aifa.works' },
                    { label: 'AIfa Digital', href: 'https://aifa.digital' },
                    { label: rt('linkWhitepaper'), href: 'https://www.codeofdigitaleternity.com/whitepaper' },
                    { label: rt('linkRoadmap'), href: 'https://www.codeofdigitaleternity.com/roadmap' },
                    { label: rt('linkNews'), href: 'https://www.codeofdigitaleternity.com/news' },
                    { label: '$GALATIN', href: 'https://www.codeofdigitaleternity.com/whitepaper#sec-tokenomics' },
                    { label: '🎓 Ambassadors', href: '/ambassador' },
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
                    {rt('musicBy')} AIfa &amp; DJ Galatin
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