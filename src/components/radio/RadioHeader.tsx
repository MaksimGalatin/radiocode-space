'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveClock } from '@/components/radio/LiveClock';
import { SignalStrength } from '@/components/radio/SignalStrength';
import { RADIO_LANGS, useCurrentLang, useSetLang, useRadioT } from '@/lib/radioI18n';
import CabinetAuthButton from '@/components/radio/CabinetAuthButton';

export function RadioHeader() {
  const rt = useRadioT();
  const lang = useCurrentLang();
  const setLang = useSetLang();

  // ВЫПАДАЮЩЕЕ МЕНЮ AIfaFocus — приведено к виду aifa.works 05.09.2026.
  //
  // Было: одна ссылка на `/accessibility`. Замер того же дня показал, что
  // на радио из трёх пунктов меню не видно ни одного, тогда как на
  // aifa.works, центральном и aifa.digital исследование и методика в шапке
  // есть. Прямое поручение Архитектора: «доделай пожалуйста на всех наших
  // сайтах и языках», эталон — aifa.works.
  //
  // Задержка закрытия 200 мс — чтобы меню не захлопывалось, пока курсор
  // переходит с кнопки на список.
  const [фокусОткрыт, setФокусОткрыт] = useState(false);
  const [языкОткрыт, setЯзыкОткрыт] = useState(false);
  const фокусТаймер = useRef<ReturnType<typeof setTimeout> | null>(null);

  const открытьФокус = useCallback(() => {
    if (фокусТаймер.current) {
      clearTimeout(фокусТаймер.current);
      фокусТаймер.current = null;
    }
    setФокусОткрыт(true);
  }, []);

  const закрытьФокусПогодя = useCallback(() => {
    if (фокусТаймер.current) clearTimeout(фокусТаймер.current);
    фокусТаймер.current = setTimeout(() => setФокусОткрыт(false), 200);
  }, []);

  useEffect(() => {
    return () => {
      if (фокусТаймер.current) clearTimeout(фокусТаймер.current);
    };
  }, []);

  // Пункты меню. Порядок как на aifa.works: сначала сам сканер, затем данные
  // исследования, затем методика. Четыре языка — ru, es, zh и английский по
  // умолчанию: Правило Четырёх Сайтов требует и четырёх языков тоже.
  const фокусПункты = [
    {
      href: '/accessibility',
      label:
        lang === 'ru'
          ? 'Проверить свой сайт'
          : lang === 'es'
          ? 'Analizar mi sitio'
          : lang === 'zh'
          ? '检测我的网站'
          : 'Scan my site',
      пояснение:
        lang === 'ru'
          ? 'бесплатно, без регистрации'
          : lang === 'es'
          ? 'gratis, sin registro'
          : lang === 'zh'
          ? '免费，无需注册'
          : 'free, no signup',
    },
    {
      href: '/research/data',
      label:
        lang === 'ru'
          ? 'Исследование'
          : lang === 'es'
          ? 'Investigación'
          : lang === 'zh'
          ? '研究数据'
          : 'Research data',
      пояснение:
        lang === 'ru'
          ? '95 524 обхода: агент нажимает Tab, как человек'
          : lang === 'es'
          ? '95 524 recorridos: el agente pulsa Tab como una persona'
          : lang === 'zh'
          ? '95 524 次遍历：代理像人一样按 Tab'
          : '95,524 traversals: the agent presses Tab like a person',
    },
    {
      href: 'https://aifa.works/data',
      label:
        lang === 'ru'
          ? 'Открытые данные'
          : lang === 'es'
          ? 'Datos abiertos'
          : lang === 'zh'
          ? '开放数据'
          : 'Open data',
      пояснение:
        lang === 'ru'
          ? 'сырьё исследования, CC BY 4.0'
          : lang === 'es'
          ? 'archivos brutos del estudio, CC BY 4.0'
          : lang === 'zh'
          ? '研究原始文件，CC BY 4.0'
          : 'raw research files, CC BY 4.0',
    },
    {
      href: '/research/methodology',
      label:
        lang === 'ru'
          ? 'Методика'
          : lang === 'es'
          ? 'Metodología'
          : lang === 'zh'
          ? '研究方法'
          : 'Methodology',
      пояснение:
        lang === 'ru'
          ? 'как именно мы измеряем'
          : lang === 'es'
          ? 'cómo medimos exactamente'
          : lang === 'zh'
          ? '我们如何进行测量'
          : 'exactly how we measure',
    },
    {
      href: '/research/registry',
      label:
        lang === 'ru'
          ? 'Реестр против реальности'
          : lang === 'es'
          ? 'El registro frente a la realidad'
          : lang === 'zh'
          ? '登记册与现实'
          : 'Registry versus reality',
      пояснение:
        lang === 'ru'
          ? '1 441 домен без записи в DNS'
          : lang === 'es'
          ? '1 441 dominios sin registro DNS'
          : lang === 'zh'
          ? '1 441 个域名没有 DNS 记录'
          : '1,441 domains with no DNS record',
    },
  ];

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
          ссылок. Отсутствие ориентира отметил наш собственный AIfaFocus. */}
      <nav
        role="navigation"
        aria-label="Главная навигация"
        className="max-w-7xl 2xl:max-w-[1880px] mx-auto px-2 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
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
                className="text-sm sm:text-lg font-bold tracking-[0.06em] sm:tracking-[0.15em] leading-none"
                style={{
                  background: 'linear-gradient(135deg, #00F0FF 0%, #B000FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                RADIOCODE
              </span>
              <span className="text-[13px] tracking-[0.3em] text-[#A5A5BD] font-medium mt-0.5">
                .SPACE
              </span>
            </div>
          </motion.div>

          {/* Right side: Status + Signal + Clock */}
          <div className="flex items-center gap-px sm:gap-2 2xl:gap-4">
            {/* Лента новостей. На трёх других сайтах экосистемы вход в неё есть
                в навигации, здесь до сих пор была только ссылка в подвале — то
                есть чтобы найти новости, надо было доскроллить весь сайт до
                конца. Иконка та же по духу, что у кабинета: подпись прячется на
                узких экранах, чтобы шапка не переносилась. */}
            <motion.a
              href="/news"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              aria-label={rt('newsLink')}
              className="flex items-center gap-1.5 px-1 sm:px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.18)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 5h11a2 2 0 0 1 2 2v11a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2V5z" />
                <path d="M7.5 9h6M7.5 12.5h6M7.5 16h4" />
              </svg>
              <span className="text-[13px] font-mono font-medium tracking-wider text-[#00F0FF] hidden 2xl:inline uppercase">
                {rt('newsLink')}
              </span>
            </motion.a>

            {/* ACR Connectome — ссылка на страницу бионического когнитивного рантайма */}
            <motion.a
              href="/acr"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.31, duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              aria-label="ACR Connectome"
              className="flex items-center gap-1.5 px-1 sm:px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.18)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24" />
                <path d="m14.83 9.17 4.24-4.24" />
                <path d="m14.83 14.83 4.24 4.24" />
                <path d="m9.17 14.83-4.24 4.24" />
              </svg>
              <span className="text-[13px] font-mono font-medium tracking-wider text-[#00F0FF] hidden 2xl:inline uppercase">
                ACR
              </span>
            </motion.a>

            {/* AIfa Digital — бионический рантайм */}
            <motion.a
              href="/digital"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.315, duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              aria-label="AIfa Digital"
              className="flex items-center gap-1.5 px-1 sm:px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.18)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <span className="text-[13px] font-mono font-medium tracking-wider text-[#00F0FF] hidden 2xl:inline uppercase">
                Digital
              </span>
            </motion.a>


            {/* AIfaFocus — выпадающее меню: сканер, исследование, методика.
                05.09.2026 приведено к виду aifa.works по Правилу Четырёх
                Сайтов. До этого здесь была ОДНА ссылка на `/accessibility`, и
                замер показал: на радио из трёх пунктов меню не видно ни
                одного, тогда как на трёх других сайтах исследование и методика
                в шапке есть.

                Меню открывается наведением и остаётся открытым 200 мс после
                ухода курсора — иначе оно захлопывается по дороге к пунктам.
                Кнопка при этом остаётся ССЫЛКОЙ на `/accessibility`: щелчок
                по ней ведёт на сканер и без раскрытия списка, а с клавиатуры
                фокус открывает меню событием onFocus. Подпись прячется на
                узких экранах, как у соседних кнопок. */}
            <div
              className="relative"
              onMouseEnter={открытьФокус}
              onMouseLeave={закрытьФокусПогодя}
            >
              <motion.a
                href="/accessibility"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32, duration: 0.6 }}
                whileHover={{ scale: 1.04 }}
                aria-label="AIfaFocus"
                aria-expanded={фокусОткрыт}
                aria-haspopup="true"
                onFocus={открытьФокус}
                className="flex items-center gap-1.5 px-1 sm:px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(0, 240, 255, 0.06)',
                  border: '1px solid rgba(0, 240, 255, 0.18)',
                }}
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <span className="text-[13px] font-mono font-medium tracking-wider text-[#00F0FF] hidden 2xl:inline uppercase">
                  AIfaFocus
                </span>
              </motion.a>

              <AnimatePresence>
                {фокусОткрыт && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden z-50"
                    style={{
                      background: 'rgba(6, 10, 18, 0.96)',
                      border: '1px solid rgba(0, 240, 255, 0.18)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {фокусПункты.map((пункт) => (
                      <a
                        key={пункт.href}
                        href={пункт.href}
                        className="block px-4 py-3 transition-colors hover:bg-[rgba(0,240,255,0.07)]"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <span className="block text-[13px] font-mono font-medium tracking-wide text-[#00F0FF]/90">
                          {пункт.label}
                        </span>
                        <span className="block mt-0.5 text-[13px] text-white/45">
                          {пункт.пояснение}
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Читальни сети. Шестнадцать читален живут на отдельных доменах,
                и попасть на них можно было только зная адрес. В подвале ссылка
                уже есть, но подвал — это конец страницы; в шапке она нужна
                затем же, зачем новости: чтобы по ней ходили. Подпись прячется
                на узких экранах, чтобы шапка не переносилась. */}
            <motion.a
              href={`https://codeofdigitaleternity.ink${lang === 'ru' ? '' : '/' + lang}/reading-rooms/`}
              rel="noopener"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              whileHover={{ scale: 1.04 }}
              aria-label={rt('readingRooms')}
              className="flex items-center gap-1.5 px-1 sm:px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(0, 240, 255, 0.06)',
                border: '1px solid rgba(0, 240, 255, 0.18)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H5.5A1.5 1.5 0 0 1 4 15.5z" />
                <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H14a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h4.5a1.5 1.5 0 0 0 1.5-1.5z" />
              </svg>
              <span className="text-[13px] font-mono font-medium tracking-wider text-[#00F0FF]/90 hidden 2xl:inline uppercase">
                {rt('readingRooms')}
              </span>
            </motion.a>

            {/* Personal cabinet auth button (unified account across the ecosystem) */}
            {/* 25.09.2026, замер Chromium 768–1920: ряд шапки требовал ~1 440 px при
                месте ~1 060 (контейнер 1 280). На 768 за краем были кабинет,
                языки и «В ЭФИРЕ»; на 1 440 — VBR и часы. Пороги сдвинуты так,
                чтобы каждый элемент появлялся там, где помещается: подписи
                кнопок — с 2xl (ниже значки с aria-label), языки и эфир — с md,
                CODE ETERNAL — с lg, VBR/сигнал/часы — с 1 900 px. */}
            <CabinetAuthButton lang={lang} />

            {/* Language switcher (shared with the cabinet) */}
            <div className="relative">
              {/* Ниже 640 px - одна кнопка текущего языка, остальные три
                  раскрываются по нажатию. Ряд из четырёх занимал 128 px и
                  выталкивал за край и себя, и кабинет: замер 06.09.2026 дал
                  правый край 500 при окне 320, 360 и 375. Ничего не убрано,
                  все четыре языка на месте. */}
              <button
                onClick={() => setЯзыкОткрыт((о) => !о)}
                aria-label="Language"
                aria-expanded={языкОткрыт}
                className="md:hidden flex items-center gap-0.5 px-2 py-1 rounded-full text-[13px] font-mono font-medium tracking-wider cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#00F0FF',
                }}
              >
                {RADIO_LANGS.find((l) => l.code === lang)?.label ?? 'EN'}
                <span aria-hidden="true" style={{ fontSize: 9, opacity: 0.7 }}>&#9662;</span>
              </button>

              <AnimatePresence>
                {языкОткрыт && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16 }}
                    className="md:hidden absolute right-0 top-full mt-2 rounded-xl overflow-hidden z-50"
                    style={{
                      background: 'rgba(6, 10, 18, 0.96)',
                      border: '1px solid rgba(0, 240, 255, 0.18)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    {RADIO_LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setЯзыкОткрыт(false);
                        }}
                        aria-label={`Language: ${l.label}`}
                        aria-pressed={lang === l.code}
                        className="block w-full px-5 py-2.5 text-[13px] font-mono font-medium tracking-wider text-left cursor-pointer"
                        style={
                          lang === l.code
                            ? { color: '#050507', background: '#00F0FF' }
                            : { color: '#cfd0dc', background: 'transparent' }
                        }
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className="hidden md:flex items-center gap-0.5 px-1 py-1 rounded-full"
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
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(176, 0, 255, 0.06)',
                border: '1px solid rgba(176, 0, 255, 0.15)',
              }}
            >
              {/* Было text-[#C77DFF]/80 на фиолетовой плашке #1a1020 —
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
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
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
              {/* Цвет текста #FF1A4D, а не #FF003C: на розоватой плашке
                  #FF003C давал 4,49 — ниже порога WCAG 4,5 (axe, 25.09.2026,
                  768 и 1 440 px, обе темы). Точка-индикатор остаётся #FF003C. */}
              <span className="text-[13px] font-semibold tracking-[0.15em] text-[#FF1A4D]">
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
              className="hidden min-[1900px]:flex items-center gap-1.5 px-3 py-1.5 rounded-full"
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
            <div className="hidden min-[1900px]:block">
              <SignalStrength />
            </div>

            {/* Live Clock */}
            <div className="hidden min-[1900px]:block">
              <LiveClock />
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}