'use client';

/**
 * РЕЕСТР ПРОТИВ РЕАЛЬНОСТИ — КЛИЕНТСКАЯ ЧАСТЬ.
 *
 * ПОЧЕМУ КЛИЕНТСКАЯ. Язык на сайте выбирается в шапке и живёт в
 * `LanguageContext` на стороне браузера, а не в адресе страницы. Серверный
 * компонент остался бы русским при любом переключении — ровно эту ошибку
 * Архитектор увидел на боевом сайте 29.08.2026 на странице `/research/data`.
 *
 * ЧИСЛА ЗДЕСЬ НЕ ПИШУТСЯ. Они берутся из `../data/данные.ts`, где лежат в
 * одном экземпляре и обновляются замером. Число, вписанное в разметку,
 * переживёт следующий замер и станет ложью, которую никто не заметит.
 *
 * РАЗДЕЛ 20 КОНСТИТУЦИИ. Страница раздела `/research/*`: ни слова о токене,
 * роутере, тарифах и инвестициях. Ссылка на услуги — ровно одна,
 * нейтральная, в самом конце.
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../lib/LanguageContext';
import { ТЕКСТЫ_РЕЕСТРА, type ЯзыкКод } from './словарь';
import { ЖИВЫЕ_ДОМЕНЫ } from '../data/данные';

const ТЕКСТ: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.75,
  color: '#cbd5e1',
  marginBottom: 18,
};

const ЗАГ2: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  marginTop: 44,
  marginBottom: 16,
  color: '#f1f5f9',
};

const ЯЧЕЙКА: React.CSSProperties = {
  padding: '9px 12px',
  borderBottom: '1px solid rgba(148,163,184,0.12)',
  fontSize: 14,
  color: '#cbd5e1',
  verticalAlign: 'top',
};

const ШАПКА: React.CSSProperties = {
  textAlign: 'left',
  padding: '9px 12px',
  borderBottom: '1px solid rgba(148,163,184,0.3)',
  fontSize: 13,
  color: '#94a3b8',
  fontWeight: 600,
};

/** Разряды пробелами: 8979 -> «8 979». Один вид числа на всех языках. */
function разряды(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function RegistryClient({ языкИзПути }: { языкИзПути?: string } = {}) {
  const { locale } = useLanguage();
  // 🔴 ЯЗЫК ИЗ ПУТИ СТАРШЕ КОНТЕКСТА (05.09.2026). На aifa.digital
  // серверная разметка всегда выходила английской: язык там живёт в
  // клиентском хранилище со значением `en` по умолчанию. Проп из
  // заголовка `x-locale` чинит это, не трогая контекст сайта.
  const _изПути = ['ru', 'en', 'es', 'zh'].includes(языкИзПути || '') ? языкИзПути : null;
  const язык = (['ru', 'en', 'es', 'zh'].includes(_изПути || locale) ? (_изПути || locale) : 'en') as ЯзыкКод;
  const т = ТЕКСТЫ_РЕЕСТРА[язык];
  const Д = ЖИВЫЕ_ДОМЕНЫ;

  const карточки = [
    { n: разряды(Д.доменовВсего), п: т.числаДоменов, цвет: '#94a3b8' },
    { n: разряды(Д.живых), п: т.числаЖивых, цвет: '#34d399' },
    { n: разряды(Д.мёртвых), п: т.числаМёртвых, цвет: '#f87171' },
    { n: разряды(Д.записейВсего), п: т.числаЗаписей, цвет: '#94a3b8' },
    { n: разряды(Д.записейУМёртвых), п: т.числаЗаписейМёртвых, цвет: '#f87171' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#030711] text-gray-900 dark:text-white">
      <main id="main-content" className="pt-24 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="text-sm uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3">
            {т.метка}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight mb-4">
            {т.заголовок}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
            {т.подпись(Д.снято)}
          </p>

          {/* ── что измерено ── */}
          <h2 style={ЗАГ2}>{т.сутьЗаголовок}</h2>
          <p style={ТЕКСТ}>
            {т.суть1(
              разряды(Д.мёртвых),
              разряды(Д.доменовВсего),
              String(Д.доляМёртвых).replace('.', язык === 'ru' || язык === 'es' ? ',' : '.'),
            )}
          </p>
          <p style={ТЕКСТ}>{т.суть2}</p>
          <p style={ТЕКСТ}>{т.суть3}</p>

          {/* ── числа ── */}
          <h2 style={ЗАГ2}>{т.числаЗаголовок}</h2>
          <div className="grid gap-3 sm:grid-cols-2 mb-6">
            {карточки.map((к) => (
              <div
                key={к.п}
                className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3"
              >
                <div className="text-2xl font-bold" style={{ color: к.цвет }}>
                  {к.n}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  {к.п}
                </div>
              </div>
            ))}
          </div>

          {/* ── чем отличается ── */}
          <h2 style={ЗАГ2}>{т.отличиеЗаголовок}</h2>
          <p style={ТЕКСТ}>{т.отличие1}</p>
          <p style={ТЕКСТ}>{т.отличие2}</p>

          <div style={{ overflowX: 'auto', marginBottom: 20 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={ШАПКА}>{т.отличиеТаблицаВопрос}</th>
                  <th style={ШАПКА}>{т.отличиеТаблицаОтвет}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={ЯЧЕЙКА}>{т.отличиеСтрока1Вопрос}</td>
                  <td style={ЯЧЕЙКА}>{т.отличиеСтрока1Ответ}</td>
                </tr>
                <tr>
                  <td style={ЯЧЕЙКА}>{т.отличиеСтрока2Вопрос}</td>
                  <td style={ЯЧЕЙКА}>{т.отличиеСтрока2Ответ}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── метод ── */}
          <h2 style={ЗАГ2}>{т.методЗаголовок}</h2>
          <p style={ТЕКСТ}>{т.метод1}</p>
          <p style={ТЕКСТ}>{т.метод2}</p>
          <p style={ТЕКСТ}>{т.метод3}</p>
          <p style={ТЕКСТ}>{т.метод4}</p>

          {/* ── следствия ── */}
          <h2 style={ЗАГ2}>{т.следствиеЗаголовок}</h2>
          <p style={ТЕКСТ}>{т.следствие1}</p>
          <p style={ТЕКСТ}>{т.следствие2}</p>
          <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50/60 dark:bg-amber-500/5 px-5 py-4 mb-5">
            <p style={{ ...ТЕКСТ, marginBottom: 0 }}>{т.следствие3}</p>
          </div>

          {/* ── ограничения ── */}
          <h2 style={ЗАГ2}>{т.ограниченияЗаголовок}</h2>
          <ul style={{ ...ТЕКСТ, paddingLeft: 22, listStyle: 'disc' }}>
            <li style={{ marginBottom: 10 }}>{т.ограничение1}</li>
            <li style={{ marginBottom: 10 }}>{т.ограничение2}</li>
            <li style={{ marginBottom: 10 }}>{т.ограничение3}</li>
            <li>{т.ограничение4}</li>
          </ul>

          {/* ── проверить самому ── */}
          <h2 style={ЗАГ2}>{т.проверитьЗаголовок}</h2>
          <p style={ТЕКСТ}>{т.проверить1}</p>
          <p style={ТЕКСТ}>{т.проверить2}</p>

          {/* ── сырые данные ── */}
          <h2 style={ЗАГ2}>{т.файлЗаголовок}</h2>
          <p style={ТЕКСТ}>{т.файлПояснение}</p>
          <div className="flex flex-col gap-2 mb-4">
            <a
              href="/data/dead-domains-2026-09-01.csv"
              className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm"
            >
              {т.файлСсылка} →
            </a>
            <a
              href="/data/dead-domains-README.txt"
              className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm"
            >
              {т.файлReadme} →
            </a>
          </div>

          {/* ── автор и раскрытие ── */}
          <h2 style={ЗАГ2}>{т.авторЗаголовок}</h2>
          <p style={ТЕКСТ}>{т.автор1}</p>
          <p style={{ ...ТЕКСТ, fontSize: 14, color: '#94a3b8' }}>{т.конфликт}</p>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/accessibility"
              className="text-cyan-600 dark:text-cyan-400 hover:underline text-sm"
            >
              {т.ссылкаТекст} →
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
