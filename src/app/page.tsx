'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useAudioEngine } from '@/hooks/useAudioEngine';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { usePlayerStore } from '@/stores/playerStore';
import { stations } from '@/lib/stations';
import { ScanlineOverlay, MatrixGrid } from '@/components/radio/ScanlineOverlay';
import { RadioHeader } from '@/components/radio/RadioHeader';
import { HeroSection } from '@/components/radio/HeroSection';
import { StationCard } from '@/components/radio/StationCard';
import { PlayerBar } from '@/components/radio/PlayerBar';
import { WaveformBar } from '@/components/radio/WaveformBar';
import { VolumeVisualizer } from '@/components/radio/VolumeVisualizer';
import { IntroSplash } from '@/components/radio/IntroSplash';
import { GenreFilter } from '@/components/radio/GenreFilter';
import { AnimatedCounter } from '@/components/radio/AnimatedCounter';
import { useRadioT, useStationI18n } from '@/lib/radioI18n';
import { useLikes } from '@/lib/likes';
import { useSocial, captureAndLinkRef, findTrackLocation, AIFA_BOT_URL } from '@/lib/radioSocial';
import { readableAccent } from '@/lib/readableAccent';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useЯзык } from '@/lib/server-locale';
import { строкаРеквизитов, type Язык } from '@/lib/requisites';

/* Украшения и закрытые панели не нужны для ПЕРВОЙ отрисовки.

   Фоновые слои позиционированы абсолютно и места в потоке не занимают,
   поэтому их появление тактом позже ничего не сдвигает. Панели закрыты до
   нажатия, история воспроизведения — далеко за первым экраном.

   Замер Lighthouse 10.08.2026 до правки: работа сценариев 884 мс, пересчёт
   стилей 793 мс, отрисовка крупнейшего элемента 4,5 с. Всё это грузилось
   одним куском, включая полноэкранный визуализатор, который человек может
   не открыть ни разу.

   НЕ откладываем: PlayerBar, HeroSection, RadioHeader, StationCard,
   GenreFilter, IntroSplash, VolumeVisualizer — они видны сразу или влияют
   на раскладку.

   Приём тот же, что давно применён на aifa.digital. */
const ParticleBackground = dynamic(() => import('@/components/radio/ParticleBackground').then(m => m.ParticleBackground), { ssr: false, loading: () => null });
const AmbientOrbs = dynamic(() => import('@/components/radio/AmbientOrbs').then(m => m.AmbientOrbs), { ssr: false, loading: () => null });
const PlaylistPanel = dynamic(() => import('@/components/radio/PlaylistPanel').then(m => m.PlaylistPanel), { ssr: false, loading: () => null });
const PlayHistory = dynamic(() => import('@/components/radio/PlayHistory').then(m => m.PlayHistory), { ssr: false, loading: () => null });
const FullscreenVisualizer = dynamic(() => import('@/components/radio/FullscreenVisualizer').then(m => m.FullscreenVisualizer), { ssr: false, loading: () => null });


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
            className="text-[13px] font-mono tracking-[0.3em] uppercase px-4 shrink-0"
            // Было `${color}50` — акцент на 31% прозрачности, контраст 2.16
            // при норме 4.5: бегущая строка на тёмной полосе почти сливалась
            // с фоном. Прозрачность убрана, фиолетовый акцент подменяется
            // осветлённым — см. readableAccent.
            style={{ color: readableAccent(color) }}
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
  const языкПодвала = useЯзык();
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
      {/* Ссылка для тех, кто ходит по сайту с клавиатуры или через программу
          экранного доступа: без неё, чтобы добраться до содержимого, надо
          протабать всю навигацию. Видимой она становится только при получении
          фокуса, поэтому на вид страницы не влияет. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#00F0FF] focus:text-black focus:font-semibold focus:text-sm"
      >
        Перейти к содержимому · Skip to main content
      </a>
      <main id="main-content" className="relative z-10 flex-1 pb-32">
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
              <div className="text-[13px] sm:text-xs text-[#8B8BA8] truncate">
                {rt('createTrackSub')}
              </div>
            </div>
            <span
              className="shrink-0 text-[13px] sm:text-xs font-mono font-semibold tracking-wider px-3 py-2 rounded-full transition-colors"
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
              <p className="text-sm text-[#8B8BA8]">
                {stations.length} {rt('broadcasting')}
              </p>
            </div>
            {/* Keyboard shortcuts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="hidden lg:flex items-center gap-3 text-[13px] text-[#7E7E99]"
            >
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#8B8BA8] font-mono">Space</kbd> {rt('play')}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#8B8BA8] font-mono">←→</kbd> {rt('seek')}
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[#8B8BA8] font-mono">M</kbd> {rt('mute')}
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
              {/*
                🔴 ССЫЛКА ОТЛИЧАЛАСЬ ОТ ТЕКСТА ТОЛЬКО ЦВЕТОМ. Замер Lighthouse
                10.08.2026: проверка link-in-text-block провалена, контраст
                ссылки с окружающим текстом 1.96 при требуемых 3.0. Человек, не
                различающий эти оттенки, вообще не видит, что здесь ссылка, —
                а таких людей около восьми процентов мужчин.
                Подчёркивание было только при наведении: мышью нашёл, глазами —
                нет, а с телефона наведения не существует вовсе. Делаем
                подчёркивание постоянным.
              */}
              <a href="https://www.codeofdigitaleternity.com" target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] underline underline-offset-2 decoration-[#00F0FF]/50 hover:decoration-[#00F0FF]">CODE Eternal</a>
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
                  {/* Ссылка на страницу станции: там полный список треков.
                      Без этой ссылки страницы станций остались бы сиротами
                      и поисковые системы их бы не обошли. */}
                  <dt className="text-[#E8E8ED] font-medium">
                    <a href={`/station/${s.id}`} className="hover:text-[#00F0FF] transition-colors">
                      {s.name}
                    </a>
                  </dt>
                  <dd className="text-[#8B8BA8]">{st.genre(s.id, s.genre)}</dd>
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
                  ['What is RadioCode.Space?', 'RadioCode.Space is a free, always-on cyberpunk web radio — the radio station of the CODE Eternal ecosystem — streaming 530 original songs in 1024 versions across 6 stations.'],
                  ['Who makes the music?', 'All tracks are composed by AIfa & DJ Galatin within the CODE Eternal project created by Maksim Galatin.'],
                  ['How many stations and tracks are there?', 'There are 6 stations — CODE Music, CODE Space, AIfa & DJ Galatin (Vol. 1), AIfa & DJ Galatin RADIO, CODE Stories and CODE Spectrum — with 530 original songs in 1024 versions in total.'],
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
                <p className="text-[13px] font-mono tracking-[0.3em] uppercase text-[#7E7E99] mb-4 text-center sm:text-left">
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
                      className="text-xs font-medium text-[#8B8BA8] hover:text-[#00F0FF] transition-colors duration-200"
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
                  <span className="text-xs text-[#7E7E99]">|</span>
                  <span className="text-xs text-[#8B8BA8]">CODE Eternal</span>
                </div>
                <div className="flex items-center gap-4">
                  {/* Ссылка на политику обязана быть на каждой странице: этого
                      требуют и GDPR, и здравый смысл. Наш же Оракул поймал её
                      отсутствие здесь — сайт собирает аналитику и данные
                      кабинета, а сказать, что мы с ними делаем, было негде. */}
                  {/* Юридические сведения обязаны быть доступны с любой
                      страницы: этого требует директива ЕС об электронной
                      торговле, и это же первое, что смотрит проверяющий.
                      Наш собственный Оракул отметил их отсутствие здесь. */}
                  {/* 🔴 ССЫЛКА ОБЕЩАЛА ОДНО, А ВЕЛА НА ДРУГОЕ.
                      Подпись гласила «Конфиденциальность · Privacy», а адрес
                      /legal переадресует на страницу УСЛОВИЙ, где политики
                      конфиденциальности нет. Человек, которому нужно узнать,
                      что мы делаем с его данными, попадал не туда.
                      Разделено на две ссылки, каждая ведёт куда обещает.
                      Подписи переведены: раньше они были прибиты по-русски и
                      показывались так же испанцу и китайцу. */}
                  <a
                    href="https://www.codeofdigitaleternity.com/privacy-policy"
                    className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                    rel="noopener"
                  >
                    {rt('privacy')}
                  </a>
                  <a
                    href="https://www.codeofdigitaleternity.com/legal"
                    className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                    rel="noopener"
                  >
                    {rt('legalInfo')}
                  </a>
                  {/* БИБЛИОТЕКА РАЗБОРОВ. 172 страницы на .ink не были связаны
                      ни с одним главным сайтом. Страница без входящих внутренних
                      ссылок для поисковика почти не существует. Адрес локализован:
                      русский в корне, остальные с префиксом языка. */}
                  <a
                    href={`https://codeofdigitaleternity.ink${языкПодвала === 'ru' ? '' : '/' + языкПодвала}/library/`}
                    className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                    rel="noopener"
                  >
                    {rt('libraryLink')}
                  </a>
                  <a
                    href={`https://codeofdigitaleternity.ink${языкПодвала === 'ru' ? '' : '/' + языкПодвала}/reading-rooms/`}
                    className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                    rel="noopener"
                  >
                    {rt('readingRooms')}
                  </a>
                  {/* Публичная оферта. Договор, который негде найти, юридически
                      равен ненаписанному: условия обязаны быть доступны ДО
                      заказа, а не только тому, кто знает точный адрес страницы.
                      Ссылка ведёт на СВОЮ копию — документ теперь одинаков на
                      всех четырёх сайтах. */}
                  <a
                    href="/service-agreement"
                    className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                  >
                    {rt('publicOffer')}
                  </a>
                  {/* 🔴 СОГЛАШЕНИЯ НА ЭТОМ САЙТЕ НЕ БЫЛО ВОВСЕ.
                      Замер: /terms здесь отвечал 404, тогда как на двух других
                      сайтах документ открывался. При этом кабинет, тарифы,
                      токены и вечная память у четырёх сайтов ОБЩИЕ — живая
                      проверка показала одну и ту же таблицу игроков и один
                      MEMORY_MASTER_KEY. То есть человек регистрировался здесь,
                      принимая условия, которых на этом сайте нельзя было найти
                      ни по какому адресу. Ссылка на чужой домен этого не
                      закрывает: условия должны быть на том сайте, где нажимают
                      кнопку. */}
                  <a
                    href="/user-agreement"
                    className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                  >
                    {rt('userAgreement')}
                  </a>
                  {/* 🔴 ЛЕНТЫ НОВОСТЕЙ НА ЭТОМ САЙТЕ НЕ БЫЛО ВОВСЕ.
                      Три сайта экосистемы отдавали статьи, radiocode.space —
                      нет: /news отвечал 404. При этом данные новостей, кабинет
                      и память у четырёх сайтов общие, и человек, пришедший с
                      радио, не видел ничего из того, что мы пишем. */}
                  <a
                    href="/news"
                    className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                  >
                    {rt('newsLink')}
                  </a>
                  {/* Возрастная маркировка. Наши же условия говорят: «Сайт не
                      предназначен для лиц младше 18 лет» (раздел 10.2). До сих
                      пор это было написано только внутри договора, который
                      никто не открывает, — а на самих страницах ни на одном из
                      четырёх сайтов возраста не стояло. */}
                  <span
                    className="text-[13px] font-mono tracking-wider text-[#7E7E99] border border-[#7E7E99]/40 rounded px-1.5"
                    title={rt('ageNote')}
                  >
                    18+
                  </span>
                  <a
                    href="mailto:contact@codeofdigitaleternity.com"
                    className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                  >
                    contact@codeofdigitaleternity.com
                  </a>
                  <span className="text-[13px] font-mono tracking-wider text-[#7E7E99]">
                    {rt('musicBy')} AIfa &amp; DJ Galatin
                  </span>
                  <span className="text-[13px] font-mono tracking-wider text-[#7E7E99]">
                    © 2026
                  </span>
                </div>
                {/* Реквизиты оператора. Ст. 5 Директивы 2000/31/EC: имя,
                    правовая форма, географический адрес и регистрационные
                    номера должны быть доступны постоянно и напрямую. До этой
                    правки их не было ни на одном из четырёх сайтов. Источник
                    один — lib/requisites.ts; незаполненные поля не выводятся. */}
                <p className="mt-6 pt-4 border-t border-[#8B8BA8]/20 text-[13px] font-mono text-[#7E7E99] leading-relaxed break-words">
                  {строкаРеквизитов((языкПодвала as Язык) || 'en')}
                </p>
                {/* ЗНАКИ: СВОИ С ™, ЧУЖИЕ — НАЗВАНЫ ЧУЖИМИ. Добавлено 22.08.2026.
                    ™ означает ПРИТЯЗАНИЕ, заявленное фактическим использованием,
                    и ставится законно без регистрации. ® означал бы состоявшуюся
                    регистрацию, которой у нас нет — его на четырёх сайтах ноль.
                    Вторая половина строки не менее важна первой: страница,
                    которая метит своё и молчит про чужое, выглядит хуже, чем
                    страница без ™ вовсе. */}
                <p className="mt-3 text-[12px] font-mono text-[#6A6A85] leading-relaxed break-words">
                  {rt('trademarks')}
                </p>
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