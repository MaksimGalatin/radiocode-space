'use client';

/**
 * ТАРИФЫ НА radiocode.space — четвёртый и последний из основных сайтов.
 *
 * ЧЕТВЁРТАЯ РАЗМЕТКА ОДНОЙ СТРАНИЦЫ. Причина та же, что и на предыдущих трёх:
 * карта проектов запрещает переносить компоненты между сайтами. Здесь язык
 * берётся из `useCurrentLang` (`@/lib/radioI18n`), обёртки `LayoutWrapper`
 * нет вовсе, а фон задан жёстко — `bg-[#05060a]`, как на остальных страницах
 * радио. Ни один из трёх других вариантов сюда не встал бы.
 *
 * СЛОВАРЬ — ТОТ ЖЕ, дословно. Четыре сайта, один текст: человек, перешедший
 * с сайта на сайт, должен видеть один продукт, а не четыре описания одного
 * тарифа.
 *
 * Числа — из Конституции (разделы 3, 4, 5) и из замера 27.08.2026, 16:24.
 */

import React from 'react';
import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { useCurrentLang } from '@/lib/radioI18n';
import { ТЕКСТЫ, ДОЛИ } from './словарь';

export default function TariffsClient() {
  const lang = useCurrentLang() as Lang;
  const т = ТЕКСТЫ[lang] || ТЕКСТЫ.en;

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <div className="mx-auto w-full max-w-5xl px-5 py-12">

        <span className="mb-5 inline-block rounded-full border border-cyan-500/40 px-3.5 py-1.5 text-[13px] text-cyan-400">
          {т.метка}
        </span>

        <h1 className="mb-5 text-3xl font-black tracking-tight md:text-5xl">
          {т.заголовок}
        </h1>

        <p className="mb-3 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          {т.вступление1}
        </p>
        <p className="mb-12 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          {т.вступление2}
        </p>

        <div className="mb-16 grid gap-5 md:grid-cols-3">
          {т.тарифы.map((тариф) => (
            <div
              key={тариф.имя}
              className={`flex flex-col rounded-2xl border p-6 ${
                тариф.выделен
                  ? 'border-cyan-500/50 bg-cyan-500/5'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <div className="mb-2.5 text-[15px] font-semibold text-cyan-400">
                {тариф.имя}
              </div>
              <div className="text-4xl font-black leading-none">{тариф.цена}</div>
              <div className="mb-4 text-sm text-white/60">{тариф.подпись}</div>
              <p className="mb-4 text-sm leading-relaxed text-white/80">{тариф.для}</p>
              <ul className="m-0 mb-6 list-none space-y-2 p-0 flex-grow">
                {тариф.входит.map((пункт) => (
                  <li key={пункт} className="relative pl-5 text-sm leading-relaxed text-white/60">
                    <span className="absolute left-0 text-cyan-400">·</span>
                    {пункт}
                  </li>
                ))}
              </ul>
              <Link
                href="/cabinet"
                className={`block rounded-xl border border-cyan-500/50 px-4 py-2.5 text-center text-[15px] font-semibold transition-colors ${
                  тариф.выделен
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400'
                    : 'text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                {т.кнопкаТарифа}
              </Link>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-2xl font-bold md:text-3xl">{т.амбассадорыЗаголовок}</h2>
        <p className="mb-6 max-w-3xl leading-relaxed text-white/70">
          {т.амбассадорыВступление}
        </p>

        <div className="mb-5 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="text-left text-cyan-400">
                {т.столбцы.map((с) => (
                  <th key={с} className="border-b border-white/10 px-3.5 py-2.5 text-[15px] font-semibold">
                    {с}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-white/80">
              {т.строки.map((имя, н) => (
                <tr key={имя}>
                  <td className="border-b border-white/10 px-3.5 py-2.5 text-[15px]">{имя}</td>
                  {ДОЛИ[н].map((доля, м) => (
                    <td key={м} className="border-b border-white/10 px-3.5 py-2.5 text-[15px]">
                      {доля}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mb-4 max-w-3xl text-sm leading-relaxed text-white/50">
          {т.амбассадорыПояснение1}
        </p>
        <p className="mb-14 max-w-3xl text-sm leading-relaxed text-white/50">
          {т.амбассадорыПояснение2}
        </p>

        <h2 className="mb-4 text-2xl font-bold md:text-3xl">{т.оракулЗаголовок}</h2>
        <div className="mb-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="mb-1 text-3xl font-black">{т.оракулЦена}</div>
          <div className="mb-4 text-sm text-white/60">{т.оракулПодпись}</div>
          <p className="mb-4 max-w-3xl leading-relaxed text-white/80">{т.оракулЧто}</p>
          <p className="mb-5 max-w-3xl text-sm leading-relaxed text-white/60">
            {т.оракулЗамерНачало}
            <strong className="text-cyan-400">{т.оракулЗамерВыделено}</strong>
            {т.оракулЗамерКонец}
          </p>
          <a
            href="https://aifa.works/accessibility"
            className="text-[15px] text-cyan-400 underline"
            rel="noopener"
          >
            {т.оракулСсылка}
          </a>
        </div>

        <h2 className="mb-4 text-xl font-bold md:text-2xl">{т.оплатаЗаголовок}</h2>
        <p className="mb-2.5 max-w-3xl leading-relaxed text-white/70">{т.оплата1}</p>
        <p className="mb-10 max-w-3xl text-sm leading-relaxed text-white/50">{т.оплата2}</p>

        <div className="border-t border-white/10 pt-6">
          <Link href="/cabinet" className="text-base text-cyan-400 underline">
            {т.вКабинет}
          </Link>

          {/*
            СЕТКА ПРОВЕРОК И ПАРТНЁРСКИЙ ТАРИФ.
            Решение Архитектора 29.08.2026: «на максимальном тарифе — 100 в
            сутки, а сверх — отдельный партнёрский тариф», отдельной строкой
            под карточками, а не четвёртой карточкой. Числа те же, что стоят
            в app/api/scan/route.ts на aifa.works: расхождение витрины и кода
            человек обнаружил бы отказом, которого не ждал.
          */}
          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid rgba(148,163,184,0.15)' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginBottom: 10 }}>
              {т.лимитыЗаголовок}
            </div>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#94a3b8', fontSize: 14, lineHeight: 1.9 }}>
              {т.лимитыСтроки.map((с) => (
                <li key={с}>{с}</li>
              ))}
            </ul>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0', marginTop: 18, marginBottom: 8 }}>
              {т.партнёрскийЗаголовок}
            </div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0, maxWidth: 720 }}>
              {т.партнёрскийТекст}
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
