'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, AlertTriangle, Mail, Gauge } from 'lucide-react';
import { useLanguageOptional } from '../../lib/LanguageContext';
import { ЗАЯВЛЕНИЕ, ЧИСЛА_ЗАМЕРА, type ЯзыкЗаявления } from './словарь';

/**
 * ЗАЯВЛЕНИЕ О ДОСТУПНОСТИ.
 *
 * Ссылка на эту страницу стояла со страницы `/accessibility` и отдавала 404 —
 * заявления не было ни на одном из четырёх сайтов. Проверено сплошным обходом
 * внутренних ссылок 10.09.2026.
 *
 * Тексты и числа — в словаре рядом, по образцу страницы сканера: страница со
 * своим словарём переносится на любой сайт без правок кода.
 *
 * ЧИСЛА НЕ ВПИСАНЫ В РАЗМЕТКУ. Они лежат в `ЧИСЛА_ЗАМЕРА` одним объектом,
 * потому что число, вписанное в вёрстку руками, не пересчитывается вместе с
 * остальными и расходится молча — это уже случалось с числами исследования.
 */
export default function AccessibilityStatementPage() {
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  const язык = (['ru', 'en', 'es', 'zh'].includes(locale) ? locale : 'en') as ЯзыкЗаявления;
  const з = ЗАЯВЛЕНИЕ[язык];

  // Разделитель тысяч по языку: у английского запятая, у остальных пробел.
  const число = (n: number) =>
    язык === 'en' ? n.toLocaleString('en-US') : n.toLocaleString('ru-RU');

  const плитки = [
    { знач: число(ЧИСЛА_ЗАМЕРА.адресов), подпись: з.замерАдресов },
    { знач: число(ЧИСЛА_ЗАМЕРА.замеров), подпись: з.замерЗамеров },
    { знач: ЧИСЛА_ЗАМЕРА.чистыхДоля, подпись: з.замерЧистых },
    { знач: число(ЧИСЛА_ЗАМЕРА.нарушений), подпись: з.замерНарушений },
  ];

  const беды = [з.бедаКонтраст, з.бедаПрокрутка, з.бедаСсылки];

  return (
    <div className="min-h-screen bg-white dark:bg-[#05070d] text-gray-900 dark:text-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{з.обновлено}</p>
        <h1 className="text-4xl sm:text-5xl font-black mb-6">{з.заголовок}</h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-14 leading-relaxed">
          {з.подзаголовок}
        </p>

        {/* ── стандарт ─────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
            {з.стандартЗаголовок}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{з.стандартТекст}</p>
        </section>

        {/* ── наши числа ───────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Gauge className="w-6 h-6 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
            {з.замерЗаголовок}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {з.замерВступление}
          </p>

          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {плитки.map((п) => (
              <div
                key={п.подпись}
                className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5"
              >
                <dt className="text-sm text-gray-500 dark:text-gray-400 mb-2">{п.подпись}</dt>
                <dd className="text-2xl sm:text-3xl font-black tabular-nums">{п.знач}</dd>
              </div>
            ))}
          </dl>

          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {з.замерПояснение}
          </p>
        </section>

        {/* ── что не в порядке ─────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" aria-hidden="true" />
            {з.чтоНеТакЗаголовок}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
            {з.чтоНеТакВступление}
          </p>
          <ul className="space-y-3 mb-6">
            {беды.map((б) => (
              <li key={б} className="flex gap-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                <span>{б}</span>
              </li>
            ))}
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed border-l-2 border-amber-500/60 pl-4">
            {з.чтоНеТакЧестно}
          </p>
        </section>

        {/* ── как проверить нас ────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">{з.какМеряемЗаголовок}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{з.какМеряемТекст}</p>
        </section>

        {/* ── обратная связь ───────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-cyan-700 dark:text-cyan-400" aria-hidden="true" />
            {з.обратнаяСвязьЗаголовок}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            {з.обратнаяСвязьТекст}
          </p>
          <p className="mb-2">
            <a
              href={`mailto:${з.обратнаяСвязьПочта}`}
              className="underline font-semibold text-cyan-700 dark:text-cyan-300"
            >
              {з.обратнаяСвязьПочта}
            </a>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{з.срокОтвета}</p>
        </section>

        {/* ── оговорка ─────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">{з.оговоркаЗаголовок}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{з.оговоркаТекст}</p>
        </section>

        <Link
          href="/accessibility"
          className="inline-flex items-center gap-2 font-semibold text-cyan-700 dark:text-cyan-300 underline"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          {з.назад}
        </Link>

      </div>
    </div>
  );
}
