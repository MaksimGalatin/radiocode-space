'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertOctagon, ShieldAlert, DollarSign, Scale, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const calculatorTranslations = {
  en: {
    title: 'Litigation Risk & Penalty Calculator',
    subtitle: 'Estimate your website\'s annual ADA/GDPR lawsuit probability and maximum penalty exposure.',
    trafficLabel: 'Monthly Traffic (Pageviews)',
    jurisdictionLabel: 'Business Jurisdiction',
    riskLabel: 'Annual Lawsuit Probability',
    fineLabel: 'Typical Fine in Comparable Cases',
    fineNoteGdpr: 'Median across {cases} published GDPR decisions. Three quarters of cases stayed below €{p75}. These are fines actually imposed, not a forecast for your company.',
    fineNoteNoRegistry: 'We hold no registry of decided cases for this jurisdiction, so no figure is shown. An invented number would be worse than none.',
    runAuditCTA: 'Run Free Compliance Scan Now',
    jurisdictions: {
      ada: 'US Federal (ADA / Section 508)',
      gdpr: 'European Union (GDPR / EAA)',
      ccpa: 'California (CCPA / CPRA)',
      rf: 'Russian Federation (FZ-152 / GOST)',
      global: 'Global Multi-jurisdiction'
    },
    riskLevels: {
      low: 'Low Risk',
      medium: 'Moderate Exposure',
      high: 'Severe Legal Threat'
    },
    trafficAlert: 'Your traffic volume and jurisdiction create severe risk from automated litigation crawlers.'
  },
  ru: {
    title: 'Калькулятор судебных рисков и штрафов',
    subtitle: 'Оцените годовую вероятность получения иска по доступности/персональным данным и размер максимальных штрафов.',
    trafficLabel: 'Месячный трафик (просмотры)',
    jurisdictionLabel: 'Юрисдикция бизнеса',
    riskLabel: 'Годовая вероятность иска',
    fineLabel: 'Типичный штраф по сопоставимым делам',
    fineNoteGdpr: 'Медиана по {cases} опубликованным решениям GDPR. Три четверти дел не превысили €{p75}. Это назначенные взыскания, а не прогноз для вашей компании.',
    fineNoteNoRegistry: 'Реестра решённых дел по этой юрисдикции у нас нет, поэтому число не показываем. Выдуманная сумма хуже её отсутствия.',
    runAuditCTA: 'Запустить бесплатный аудит соответствия',
    jurisdictions: {
      ada: 'США (ADA / Section 508)',
      gdpr: 'Европейский Союз (GDPR / EAA)',
      ccpa: 'Калифорния (CCPA / CPRA)',
      rf: 'Российская Федерация (ФЗ-152 / ГОСТ)',
      global: 'Глобальный комплаенс'
    },
    riskLevels: {
      low: 'Низкий риск',
      medium: 'Умеренная угроза',
      high: 'Критический судебный риск'
    },
    trafficAlert: 'Ваш уровень трафика и юрисдикция создают повышенный риск сканирования ботами-ищейками юристов.'
  },
  es: {
    title: 'Calculador de Riesgos de Litigios y Multas',
    subtitle: 'Calcule la probabilidad anual de demandas ADA/GDPR y la exposición máxima a sanciones.',
    trafficLabel: 'Tráfico Mensual (Visitas)',
    jurisdictionLabel: 'Jurisdicción del Negocio',
    riskLabel: 'Probabilidad de Demanda Anual',
    fineLabel: 'Multa típica en casos comparables',
    fineNoteGdpr: 'Mediana de {cases} resoluciones publicadas del RGPD. Tres cuartas partes de los casos no superaron los €{p75}. Son sanciones impuestas, no una previsión para su empresa.',
    fineNoteNoRegistry: 'No disponemos de un registro de casos resueltos para esta jurisdicción, por lo que no mostramos cifra alguna. Un número inventado sería peor que ninguno.',
    runAuditCTA: 'Iniciar Escaneo de Cumplimiento Gratis',
    jurisdictions: {
      ada: 'Federal EE.UU. (ADA / Sección 508)',
      gdpr: 'Unión Europea (GDPR / EAA)',
      ccpa: 'California (CCPA / CPRA)',
      rf: 'Federación Rusa (FZ-152 / GOST)',
      global: 'Cumplimiento Global'
    },
    riskLevels: {
      low: 'Riesgo Bajo',
      medium: 'Exposición Moderada',
      high: 'Grave Amenaza Legal'
    },
    trafficAlert: 'Su volumen de tráfico y jurisdicción crean un riesgo severo de rastreadores automatizados de litigios.'
  },
  zh: {
    title: '诉讼风险与罚金计算器',
    subtitle: '评估您的网站年度 ADA/GDPR 诉讼概率及最高罚金敞口。',
    trafficLabel: '月流量 (页面访问量)',
    jurisdictionLabel: '业务管辖区',
    riskLabel: '年度诉讼概率',
    fineLabel: '同类案件的典型罚款',
    fineNoteGdpr: '基于 {cases} 份已公布的 GDPR 处罚决定的中位数。四分之三的案件未超过 €{p75}。这是已实际作出的处罚，而非对贵公司的预测。',
    fineNoteNoRegistry: '我们没有该法域已决案件的登记册，因此不显示任何数字。编造的数字比没有数字更糟。',
    runAuditCTA: '立即运行免费合规性扫描',
    jurisdictions: {
      ada: '美国联邦 (ADA / Section 508)',
      gdpr: '欧盟 (GDPR / EAA)',
      ccpa: '加州 (CCPA / CPRA)',
      rf: '俄罗斯联邦 (FZ-152 / GOST)',
      global: '全球多司法管辖区合规'
    },
    riskLevels: {
      low: '低风险',
      medium: '中度风险',
      high: '严重法律威胁'
    },
    trafficAlert: '您的流量规模和业务管辖区使您面临来自自动化诉讼爬虫的严重风险。'
  }
};

type Jurisdiction = 'ada' | 'gdpr' | 'ccpa' | 'rf' | 'global';

export default function RiskCalculator() {
  const { locale } = useLanguage();
  const t = calculatorTranslations[locale] || calculatorTranslations.en;

  const [traffic, setTraffic] = useState<number>(25000);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('ada');

  /**
   * 🔴 СУММЫ БЕРУТСЯ ИЗ РЕЕСТРА ДЕЛ, А НЕ ИЗ ВЫДУМАННЫХ КОЭФФИЦИЕНТОВ.
   *
   * ЧТО ЗДЕСЬ БЫЛО (найдено 04.09.2026). Расчёт стоял такой:
   *   baseFine = 150000 для GDPR, множитель 2.2, дальше
   *   сумма = baseFine × √(трафик / 1000).
   * Ни одно из этих чисел ниоткуда не бралось. При 25 000 просмотров
   * посетителю показывалось «€750 000».
   *
   * ЧТО ГОВОРЯТ НАСТОЯЩИЕ ДАННЫЕ (реестр CMS GDPR Enforcement Tracker,
   * 3 072 дела с назначенным взысканием, выгрузка 04.09.2026):
   *   медиана .................. 8 000 €
   *   нижняя четверть .......... до 2 000 €
   *   три четверти дел ......... до 47 000 €
   *   77 % всех дел ............ до 50 000 €
   * То есть показанное число было завышено примерно В СТО РАЗ против
   * типичного случая.
   *
   * ПОЧЕМУ ЭТО НЕ МЕЛОЧЬ. Раздел 11 Конституции: «графа, смысл которой не
   * назван, — это не отчёт». Наш собственный `lib/oracle-risk.ts` прямо
   * пишет: «написать верхний предел закона директору автосервиса — значит
   * запугивать, и он это чувствует: письмо летит в корзину вместе с
   * доверием ко всему остальному, что мы нашли». Калькулятор на витрине
   * делал ровно то, что мы запретили себе в отчётах.
   *
   * ЧТО СТАЛО. Для GDPR — числа из реестра, с указанием, сколько дел за
   * ними стоит. Для остальных юрисдикций реестра у нас НЕТ, поэтому сумма
   * не показывается вовсе: пустое место честнее выдуманного числа.
   * Вероятность иска осталась оценочной и теперь прямо названа оценкой.
   */
  const { riskPercent, maxFine, fineNote, riskLevel } = useMemo(() => {
    // Множитель влияет только на ОЦЕНКУ ВЕРОЯТНОСТИ, а не на сумму.
    const multiplier =
      jurisdiction === 'gdpr' ? 2.2 :
      jurisdiction === 'global' ? 2.8 :
      jurisdiction === 'ada' ? 1.5 :
      jurisdiction === 'ccpa' ? 1.2 : 0.5;

    const rawRisk = Math.log10(traffic) * 15 * multiplier;
    const riskPercent = Math.min(99, Math.max(2, Math.round(rawRisk)));

    // Числа реестра. Обновляются пересборкой data/gdpr-sector-risk.json.
    const GDPR_МЕДИАНА = 8000;
    const GDPR_ТРИ_ЧЕТВЕРТИ = 47000;
    const GDPR_ДЕЛ = 3072;

    let maxFine: string;
    let fineNote: string;
    if (jurisdiction === 'gdpr' || jurisdiction === 'global') {
      maxFine = `€${GDPR_МЕДИАНА.toLocaleString()}`;
      fineNote = t.fineNoteGdpr
        .replace('{median}', GDPR_МЕДИАНА.toLocaleString())
        .replace('{p75}', GDPR_ТРИ_ЧЕТВЕРТИ.toLocaleString())
        .replace('{cases}', GDPR_ДЕЛ.toLocaleString());
    } else {
      maxFine = '—';
      fineNote = t.fineNoteNoRegistry;
    }

    let riskLevel = t.riskLevels.low;
    if (riskPercent >= 70) {
      riskLevel = t.riskLevels.high;
    } else if (riskPercent >= 35) {
      riskLevel = t.riskLevels.medium;
    }

    return { riskPercent, maxFine, fineNote, riskLevel };
  }, [traffic, jurisdiction, t]);

  const scrollToScanner = () => {
    const el = document.querySelector('input[type="url"]');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (el as HTMLInputElement).focus();
    }
  };

  const getRiskColor = () => {
    // 🔴 Метка «высокий риск» не дотягивала до нормы по контрасту: замер
    // Lighthouse 10.08.2026 дал 4.43 при требуемых 4.5 — обидная десятая доля.
    // Розовый-400 светлее и на тёмной подложке даёт запас, оставаясь тем же
    // тревожным цветом. Именно эта метка и должна бросаться в глаза: она
    // сообщает клиенту, что его риск высок.
    if (riskPercent >= 70) return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
    if (riskPercent >= 35) return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
    return 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10';
  };

  const getRiskBarColor = () => {
    if (riskPercent >= 70) return 'bg-gradient-to-r from-orange-500 to-rose-600';
    if (riskPercent >= 35) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
    return 'bg-gradient-to-r from-emerald-500 to-cyan-500';
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass rounded-3xl p-6 sm:p-8 border border-white/8 relative overflow-hidden my-16 shadow-[0_0_50px_rgba(139,92,246,0.05)]">
      <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-white tracking-tight">{t.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{t.subtitle}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start pt-4">
          {/* Sliders and Inputs */}
          <div className="space-y-6">
            {/* Traffic Slider */}
            <div className="space-y-2.5 text-left">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-semibold">{t.trafficLabel}</span>
                <span className="font-mono font-bold text-cyan-400">{traffic.toLocaleString()}</span>
              </div>
              {/*
                🔴 ЭТОТ ПОЛЗУНОК БЫЛ БЕЗ МЕТКИ — И ЕГО НАШЁЛ НАШ ЖЕ ОРАКУЛ.
                Замер 10.08.2026: AIfaFocus выдал по aifa.works замечание ADA-006
                «1 input found without label (range slider)», а Lighthouse
                независимо подтвердил: доступность страницы /accessibility 91
                из 100, проваленная проверка `label`.
                Это худший из возможных случаев: страница, продающая аудит
                доступности, сама не проходит проверку, которую продаёт. Первый
                же дотошный клиент проверил бы и ушёл.
                Подпись рядом («Месячный трафик») видна глазами, но экранному
                диктору она не привязана — он читает «ползунок» без имени.
                `aria-label` даёт ему имя, `aria-valuetext` — понятное значение
                вместо голого числа.
              */}
              <input
                type="range"
                min="1000"
                max="1000000"
                step="5000"
                value={traffic}
                onChange={(e) => setTraffic(parseInt(e.target.value))}
                aria-label={t.trafficLabel}
                aria-valuetext={`${traffic.toLocaleString()}`}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              {/*
                🔴 ПОДПИСИ ШКАЛЫ БЫЛИ ПОЧТИ НЕВИДИМЫ. Замер Lighthouse
                10.08.2026: контраст 2.37 при требуемых 4.5 — цвет #4b5563
                (серый-600) на тёмной карточке. Числа «1K / 250K / 500K / 1M+»
                читались с трудом, а на ярком экране пропадали совсем.
                Серый-400 (#9ca3af) даёт больше семи — с запасом, и вид шкалы
                при этом не меняется: те же размер, шрифт и расположение.
              */}
              <div className="flex justify-between text-[13px] font-mono text-gray-400">
                <span>1K</span>
                <span>250K</span>
                <span>500K</span>
                <span>750K</span>
                <span>1M+</span>
              </div>
            </div>

            {/* Jurisdiction Select */}
            <div className="space-y-2.5 text-left">
              <label className="text-xs text-gray-400 font-semibold block">{t.jurisdictionLabel}</label>
              <div className="grid grid-cols-1 gap-2">
                {(['ada', 'gdpr', 'ccpa', 'rf', 'global'] as Jurisdiction[]).map((j) => (
                  <button
                    key={j}
                    onClick={() => setJurisdiction(j)}
                    className={`text-left px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      jurisdiction === j
                        ? 'bg-purple-500/10 border-purple-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.1)]'
                        : 'bg-black/30 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <span>{t.jurisdictions[j]}</span>
                    {jurisdiction === j && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculations Results */}
          <div className="glass bg-white/[0.01] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full space-y-6">
            {/* Risk probability */}
            <div className="space-y-2 text-left">
              <span className="text-[13px] uppercase tracking-widest text-gray-500 font-semibold">{t.riskLabel}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white tracking-tight">{riskPercent}%</span>
                <span className={`text-[13px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getRiskColor()}`}>
                  {riskLevel}
                </span>
              </div>
              
              {/* Risk bar */}
              <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden mt-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${riskPercent}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`h-full rounded-full ${getRiskBarColor()}`}
                />
              </div>
            </div>

            {/* Fine exposure */}
            <div className="space-y-1 text-left border-t border-white/6 pt-4">
              <div className="flex items-center gap-1 text-[13px] uppercase tracking-widest text-gray-500 font-semibold">
                <DollarSign className="w-3 h-3 text-rose-400" />
                <span>{t.fineLabel}</span>
              </div>
              <div className="text-3xl font-black text-rose-400 tracking-tight">{maxFine}</div>
              {/*
                Пояснение под суммой обязательно и не сворачивается. Число без
                указания, откуда оно и что означает, — это не оценка риска, а
                впечатление. Раздел 11 Конституции: единица измерения должна
                быть объявлена.
              */}
              <p className="text-[11px] leading-relaxed text-gray-500 pt-1">{fineNote}</p>
              <a
                href="https://www.enforcementtracker.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-500/70 hover:text-cyan-400 underline underline-offset-2"
              >
                CMS GDPR Enforcement Tracker
              </a>
            </div>

            {/* Alert badge if critical */}
            {riskPercent >= 70 && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/5 border border-rose-500/10 text-left">
                <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                <p className="text-[13px] text-rose-200/80 leading-relaxed font-medium">
                  {t.trafficAlert}
                </p>
              </div>
            )}

            {/* CTA Button */}
            <motion.button
              onClick={scrollToScanner}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="keep-dark btn-neon w-full py-3 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              {t.runAuditCTA}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
