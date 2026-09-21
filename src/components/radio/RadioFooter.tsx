'use client';

import React from 'react';
import { useRadioT } from '@/lib/radioI18n';
import { useЯзык } from '@/lib/server-locale';
import { строкаРеквизитов, type Язык } from '@/lib/requisites';

export function RadioFooter() {
  const rt = useRadioT();
  const языкПодвала = useЯзык();

  return (
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
              <a
                href="/privacy-policy"
                className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
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
              <a
                href="https://aifa.works/bot"
                className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
                rel="noopener"
              >
                {языкПодвала === 'ru' ? 'Наш краулер AIfaWorksBot' : языкПодвала === 'es' ? 'Nuestro rastreador AIfaWorksBot' : языкПодвала === 'zh' ? '我们的爬虫 AIfaWorksBot' : 'Our crawler AIfaWorksBot'}
              </a>
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
              <a
                href="/service-agreement"
                className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
              >
                {rt('publicOffer')}
              </a>
              <a
                href="/user-agreement"
                className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
              >
                {rt('userAgreement')}
              </a>
              <a
                href="/news"
                className="text-[13px] font-mono tracking-wider text-[#8B8BA8] hover:text-[#00F0FF] transition-colors"
              >
                {rt('newsLink')}
              </a>
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
            <p className="mt-6 pt-4 border-t border-[#8B8BA8]/20 text-[13px] font-mono text-[#7E7E99] leading-relaxed break-words">
              {строкаРеквизитов((языкПодвала as Язык) || 'en')}
            </p>
            <p className="mt-3 text-[12px] font-mono text-[#8A8AA0] leading-relaxed break-words">
              {rt('trademarks')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default RadioFooter;
