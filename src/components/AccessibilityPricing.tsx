'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useLanguageOptional } from '../lib/LanguageContext';
import { ТЕКСТЫ_СКАНЕРА, type ЯзыкКодСканера } from '../app/accessibility/словарь';
import TierDetails from './TierDetails';

/**
 * Витрина восьми уровней аудита доступности — с раскрытием и оплатой.
 *
 * ЗАЧЕМ ОТДЕЛЬНЫМ КОМПОНЕНТОМ. Поручение Архитектора 06.09.2026: «Вот эту
 * витрину нужно вынести на главную страницу. Каждый тариф — сделать
 * кликабельным… кнопка должна сразу отправлять на оплату через NowPayments».
 * Витрина уже жила внутри `/accessibility`, и простейший путь — скопировать
 * её на главную. Тогда их стало бы две: правка цены в одной оставляла бы
 * вторую со старой, и обнаружил бы это покупатель, а не мы.
 *
 * ЦЕНЫ ЗДЕСЬ ТОЛЬКО ДЛЯ ПОКАЗА. При оплате сумму берёт сервер из своей
 * таблицы; присланную с клиента он игнорирует — иначе покупатель назначит
 * цену сам.
 */

export const TIER_PRICES = ['$149', '$375', '$750', '$1,200', '$1,800', '$2,500', '$3,500', 'Custom'];
export const TIER_HIGHLIGHTS = [false, false, false, true, false, false, false, false];

interface Свойства {
  /** Показывать заголовок секции. На `/accessibility` он уже есть свой. */
  сЗаголовком?: boolean;
  /** Якорь для ссылок вида `/#a11y-pricing`. */
  id?: string;
}

export default function AccessibilityPricing({ сЗаголовком = true, id }: Свойства) {
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  // Способ взят из их же страницы `/accessibility`: `locale` объявлен шире
  // четырёх наших языков, поэтому приведение обязательно.
  const язык = (['ru', 'en', 'es', 'zh'].includes(locale) ? locale : 'en') as ЯзыкКодСканера;
  const a = ТЕКСТЫ_СКАНЕРА[язык];
  const [раскрыт, установитьРаскрытый] = React.useState<number | null>(null);

  if (!a?.tiers?.length) return null;

  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {сЗаголовком && (
          <>
            <h2
              id={id ? `${id}-heading` : undefined}
              className="text-3xl md:text-4xl font-black text-center mb-3 text-gray-900 dark:text-white"
            >
              {a.pricingTitle}<span className="gradient-text">{a.pricingHighlight}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-14 max-w-xl mx-auto">
              {a.pricingSubtitle}
            </p>
          </>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {a.tiers.map((tier, idx) => (
            <div
              key={tier.name}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              onClick={() => установитьРаскрытый(idx)}
              onKeyDown={(е) => {
                // Карточка кликабельна — значит должна открываться и с
                // клавиатуры. Мы продаём доступность: недоступная витрина
                // доступности опровергала бы сама себя.
                if (е.key === 'Enter' || е.key === ' ') {
                  е.preventDefault();
                  установитьРаскрытый(idx);
                }
              }}
              className={`glass rounded-2xl p-6 border flex flex-col cursor-pointer transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${
                TIER_HIGHLIGHTS[idx]
                  ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                  : 'border-gray-200 dark:border-white/8'
              }`}
            >
              {TIER_HIGHLIGHTS[idx] && (
                <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-3">
                  {a.mostPopular}
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{tier.name}</h3>
              <div className="text-2xl font-black gradient-text mb-1">{TIER_PRICES[idx]}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">{tier.timeline}</div>
              <ul className="space-y-2 flex-1 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={(е) => { е.stopPropagation(); установитьРаскрытый(idx); }}
                className="keep-dark btn-neon w-full py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl font-semibold text-sm text-white text-center block"
              >
                {a.getStarted}
              </button>
            </div>
          ))}
        </div>
      </div>

      <TierDetails
        тариф={раскрыт === null ? null : a.tiers[раскрыт]}
        цена={раскрыт === null ? '' : TIER_PRICES[раскрыт]}
        ручка="/api/pay/service"
        надписи={{
          tierWho: a.tierWho,
          tierDiff: a.tierDiff,
          tierIncludes: a.tierIncludes,
          tierDeliverables: a.tierDeliverables,
          tierTimeline: a.tierTimeline,
          tierPayNow: a.tierPayNow,
          tierAskQuote: a.tierAskQuote,
          tierClose: a.tierClose,
          emailPlaceholder: a.emailPlaceholder,
          scanPlaceholder: a.scanPlaceholder,
        }}
        приЗакрытии={() => установитьРаскрытый(null)}
      />
    </section>
  );
}
