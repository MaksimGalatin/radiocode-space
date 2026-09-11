'use client';

import React from 'react';
import { CheckCircle, X, ArrowRight, Package, Users, GitCompare, Clock } from 'lucide-react';

/**
 * Окно подробностей тарифа доступности — и оплата прямо отсюда.
 *
 * ЗАЧЕМ. Поручение Архитектора 06.09.2026: «Каждый тариф — сделать
 * кликабельным, он должен открывать вылетающее подробное описание тарифа, где
 * чётко и детально видно, ЧТО КОНКРЕТНО получит клиент, оплатив именно этот
 * тариф. Должна быть видна КОНКРЕТНАЯ разница между тарифами».
 *
 * Раньше карточка показывала четыре-пять строк и кнопку, ведущую на форму
 * обратной связи. Разницу между «Профессиональным» за $750 и «С Усилением ИИ»
 * за $1200 человек должен был угадать сам, а оплатить не мог вовсе.
 *
 * УСТРОЙСТВО ОКНА. Четыре раздела в порядке, в котором человек принимает
 * решение: кому это подходит (узнаю ли я себя) → чем отличается от
 * предыдущего (за что доплачиваю) → что делается в работе → что получу на
 * руки. Последнее важнее всего для того, кто платит вперёд.
 *
 * ПОЧЕМУ ФОРМА ПРОСИТ ТОЛЬКО ПОЧТУ И АДРЕС САЙТА. Всё остальное мы узнаем из
 * самого сайта. Каждое лишнее поле здесь — это потерянный покупатель.
 */

export interface ТарифПодробно {
  name: string;
  timeline: string;
  features: string[];
  slug: string;
  price: number;
  who: string;
  diff: string;
  includes: string[];
  deliverables: string[];
}

export interface НадписиОкна {
  tierWho: string;
  tierDiff: string;
  tierIncludes: string;
  tierDeliverables: string;
  tierTimeline: string;
  tierPayNow: string;
  tierAskQuote: string;
  tierClose: string;
  emailPlaceholder: string;
  scanPlaceholder: string;
}

interface Свойства {
  тариф: ТарифПодробно | null;
  цена: string;
  надписи: НадписиОкна;
  /** Путь ручки оплаты: на разных сайтах он разный. */
  ручка: string;
  приЗакрытии: () => void;
}

export default function TierDetails({ тариф, цена, надписи, ручка, приЗакрытии }: Свойства) {
  const [почта, установитьПочту] = React.useState('');
  const [сайт, установитьСайт] = React.useState('');
  const [занято, установитьЗанято] = React.useState(false);
  const [ошибка, установитьОшибку] = React.useState('');

  // Закрытие по Escape и запрет прокрутки фона: без этого страница под окном
  // уезжает, и человек теряет место, на котором остановился.
  React.useEffect(() => {
    if (!тариф) return;
    const поКлавише = (е: KeyboardEvent) => { if (е.key === 'Escape') приЗакрытии(); };
    document.addEventListener('keydown', поКлавише);
    const прежний = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', поКлавише);
      document.body.style.overflow = прежний;
    };
  }, [тариф, приЗакрытии]);

  React.useEffect(() => {
    установитьОшибку('');
    установитьЗанято(false);
  }, [тариф?.slug]);

  if (!тариф) return null;

  // Цена 0 означает «по запросу»: сметы нет, платить нечего — ведём на разговор.
  const поЗапросу = !тариф.price;

  async function оплатить() {
    установитьОшибку('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(почта)) {
      установитьОшибку('email');
      return;
    }
    установитьЗанято(true);
    try {
      const о = await fetch(ручка, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: тариф!.slug, email: почта, website: сайт }),
      });
      const j = await о.json().catch(() => ({}));
      if (о.ok && j.invoice_url) {
        window.location.href = j.invoice_url;
        return;
      }
      установитьОшибку(j.error || 'failed');
    } catch {
      установитьОшибку('network');
    }
    установитьЗанято(false);
  }

  // `children` намеренно по-английски: это зарезервированное имя React, и
  // переименовать его нельзя — вложенная разметка попадает именно в него.
  // Проверка типов поймала это сразу, до выкладки.
  const Раздел = ({ значок: Значок, заголовок, children }: {
    значок: React.ElementType; заголовок: string; children: React.ReactNode;
  }) => (
    <section className="mb-6">
      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 mb-3">
        <Значок className="w-4 h-4" aria-hidden="true" />
        {заголовок}
      </h4>
      {children}
    </section>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm"
      onClick={приЗакрытии}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={тариф.name}
        onClick={(е) => е.stopPropagation()}
        className="relative w-full max-w-2xl my-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0b1020] shadow-2xl"
      >
        <button
          onClick={приЗакрытии}
          aria-label={надписи.tierClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white pr-10">{тариф.name}</h3>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mt-2 mb-6">
            <span className="text-3xl font-black gradient-text">{цена}</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {надписи.tierTimeline}: {тариф.timeline}
            </span>
          </div>

          <Раздел значок={Users} заголовок={надписи.tierWho}>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{тариф.who}</p>
          </Раздел>

          <Раздел значок={GitCompare} заголовок={надписи.tierDiff}>
            <p className="text-gray-900 dark:text-gray-100 leading-relaxed rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-4">
              {тариф.diff}
            </p>
          </Раздел>

          <Раздел значок={CheckCircle} заголовок={надписи.tierIncludes}>
            <ul className="space-y-2">
              {тариф.includes.map((с) => (
                <li key={с} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0 mt-1" aria-hidden="true" />
                  <span>{с}</span>
                </li>
              ))}
            </ul>
          </Раздел>

          <Раздел значок={Package} заголовок={надписи.tierDeliverables}>
            <ul className="space-y-2">
              {тариф.deliverables.map((с) => (
                <li key={с} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <Package className="w-4 h-4 text-purple-500 shrink-0 mt-1" aria-hidden="true" />
                  <span>{с}</span>
                </li>
              ))}
            </ul>
          </Раздел>

          {поЗапросу ? (
            <a
              href="/#contact"
              className="keep-dark btn-neon w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl font-semibold text-white text-center flex items-center justify-center gap-2"
            >
              {надписи.tierAskQuote}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          ) : (
            <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-white/10">
              <div className="grid sm:grid-cols-2 gap-3 pt-4">
                <label className="block">
                  <span className="sr-only">{надписи.emailPlaceholder}</span>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={почта}
                    onChange={(е) => установитьПочту(е.target.value)}
                    placeholder={надписи.emailPlaceholder}
                    aria-invalid={ошибка === 'email'}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">{надписи.scanPlaceholder}</span>
                  <input
                    type="text"
                    inputMode="url"
                    value={сайт}
                    onChange={(е) => установитьСайт(е.target.value)}
                    placeholder={надписи.scanPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </label>
              </div>

              {ошибка && (
                <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                  {ошибка === 'email'
                    ? надписи.emailPlaceholder
                    : ошибка === 'rate_limited'
                      ? '429'
                      : надписи.tierPayNow + ' — ' + ошибка}
                </p>
              )}

              <button
                onClick={оплатить}
                disabled={занято}
                className="keep-dark btn-neon w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {надписи.tierPayNow}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
