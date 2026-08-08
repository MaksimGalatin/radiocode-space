'use client';

import { motion } from 'framer-motion';
import { LiveClock } from '@/components/radio/LiveClock';
import { SignalStrength } from '@/components/radio/SignalStrength';
import { RADIO_LANGS, useCurrentLang, useSetLang, useRadioT } from '@/lib/radioI18n';

export function RadioHeader() {
  const rt = useRadioT();
  const lang = useCurrentLang();
  const setLang = useSetLang();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-heavy"
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* role="navigation" + подпись: программа экранного доступа объявляет
          этот блок как «главная навигация» и позволяет перепрыгнуть к нему
          одной командой. Без разметки шапка для неё — безымянная россыпь
          ссылок. Отсутствие ориентира отметил наш собственный Оракул. */}
      <nav
        role="navigation"
        aria-label="Главная навигация"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Animated radio icon */}
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF, #B000FF)',
                  opacity: 0.15,
                  filter: 'blur(8px)',
                }}
              />
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 sm:w-7 sm:h-7"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
                <circle cx="12" cy="12" r="2" fill="#00F0FF" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span
                className="text-base sm:text-lg font-bold tracking-[0.15em] leading-none"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF 0%, #B000FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                RADIOCODE
              </span>
              <span className="text-[13px] tracking-[0.3em] text-[#8B8BA8] font-medium mt-0.5">
                .SPACE
              </span>
            </div>
          </motion.div>

          {/* Right side: Status + Signal + Clock */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Personal cabinet (unified account across the ecosystem) */}
            <motion.a
              href="/cabinet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              aria-label={rt('cabinetAria')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.18)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="3.2" />
                <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
              </svg>
              <span className="text-[13px] font-mono font-medium tracking-wider text-[#00F0FF]/90 hidden sm:inline uppercase">
                {rt('cabinet')}
              </span>
            </motion.a>

            {/* Language switcher (shared with the cabinet) */}
            <div
              className="flex items-center gap-0.5 px-1 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {RADIO_LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  aria-label={`Language: ${l.label}`}
                  aria-pressed={lang === l.code}
                  className="text-[13px] font-mono font-medium tracking-wider px-1.5 py-0.5 rounded-full transition-colors cursor-pointer"
                  style={
                    lang === l.code
                      ? { color: '#050507', background: '#00F0FF' }
                      : { color: '#8a8a9a', background: 'transparent' }
                  }
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Ecosystem link */}
            <motion.a
              href="https://www.codeofdigitaleternity.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(176, 0, 255, 0.06)',
                border: '1px solid rgba(176, 0, 255, 0.15)',
              }}
            >
              {/* Было text-[#B000FF]/80 на фиолетовой плашке #1a1020 —
                  контраст 2.78 при норме 4.5: ссылка на головной сайт
                  экосистемы читалась хуже всего в шапке. Осветлённый
                  фиолетовый #C77DFF на том же фоне даёт 6.62. */}
              <span className="text-[13px] font-mono font-medium tracking-wider text-[#C77DFF]">
                CODE ETERNAL ↗
              </span>
            </motion.a>

            {/* ON AIR indicator */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(255, 0, 60, 0.08)',
                border: '1px solid rgba(255, 0, 60, 0.15)',
              }}
            >
              <div className="relative w-2 h-2">
                <div
                  className="absolute inset-0 rounded-full bg-[#FF003C] on-air-blink"
                  style={{ boxShadow: '0 0 8px rgba(255, 0, 60, 0.6)' }}
                />
              </div>
              <span className="text-[13px] font-semibold tracking-[0.15em] text-[#FF003C]">
                {rt('onAir')}
              </span>
            </motion.div>

            {/* HQ Badge */}
            {/* Порог показа поднят с md (768px) до lg (1024px). Причина: после
                подъёма подписей шапки с 10px до 13px правый блок в русской
                локали переставал влезать в окно 768px — замерено, правый край
                уходил на 853 при ширине окна 768. Страница не прокручивается по
                горизонтали (overflow-x: hidden), поэтому «СИГНАЛ» просто молча
                срезался бы за краем экрана: ошибки нет, всё «работает», а
                элемента не видно. Убран самый декоративный бейдж — запас стал
                +12px в русском и +35px в испанском. На 1024px он возвращается:
                там правый край 1010 при окне 1024. */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.1)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              <span className="text-[13px] font-mono font-medium tracking-wider text-[#00F0FF]/70">
                VBR ~182K
              </span>
            </motion.div>

            {/* Signal Strength */}
            <div className="hidden sm:block">
              <SignalStrength />
            </div>

            {/* Live Clock */}
            <div className="hidden lg:block">
              <LiveClock />
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}