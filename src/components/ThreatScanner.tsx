'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanLine, Shield, AlertTriangle, CheckCircle2, Loader2,
  ExternalLink, ChevronDown, RotateCcw, DollarSign, Printer,
  FileText, ShieldCheck, Copy, Check, Download, Zap, ArrowRight, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useLanguageOptional } from '../lib/LanguageContext';
import { getLawMeta, CATEGORY_COLORS, type Category } from '../data/threatMatrix';
import { ТЕКСТЫ_УГРОЗ, НАДПИСЬ_РЕЕСТРА, type ЯзыкКодСканера } from '../app/accessibility/словарь';
import type { FoundThreat, ScanResponse } from '../app/api/scan/route';
import { statutoryCeiling } from '../lib/probe-law';
import { generateAIfaFocusPatch } from '../lib/aifafocus-patch';
import "./ThreatScanner.css";

type ScanState = 'idle' | 'scanning' | 'done';

// Версия поднята: старые сохранённые отчёты считали оценку по шкале 2000 и
// содержат находки прежнего формата — их нельзя показывать рядом с новыми.
const STORAGE_KEY = 'oracle_scan_v3';
const SCAN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shortenFine(fineAmount: string): string {
  const match = fineAmount.match(/[\$€]\S+/);
  return match ? match[0] : fineAmount.split(';')[0].split(',')[0];
}

function parseMaxFine(fineAmount: string): number {
  const pattern = /[\$€]([\d,]+(?:\.\d+)?)\s*([BMK])?/gi;
  let max = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(fineAmount)) !== null) {
    let num = parseFloat(m[1].replace(/,/g, ''));
    const suffix = (m[2] || '').toUpperCase();
    if (suffix === 'B') num *= 1_000_000_000;
    else if (suffix === 'M') num *= 1_000_000;
    else if (suffix === 'K') num *= 1_000;
    max = Math.max(max, num);
  }
  return max;
}

/**
 * Доказанные находки со своим законом (lib/probe-law.ts) идут отдельной
 * группой: общего закона у неё нет, и ярлык категории над ней был бы
 * неправдой — именно так до 25.09.2026 под «нет security.txt» вставали
 * пять иностранных законов.
 */
const ГРУППА_СВОЙ_ЗАКОН = '__own_law__';
const НАДПИСЬ_СВОЙ_ЗАКОН: Record<string, string> = {
  ru: 'ДОКАЗАНО — у каждой находки свой закон',
  en: 'PROVEN — each finding has its own law',
  es: 'PROBADO — cada hallazgo con su propia norma',
  zh: '已验证 — 每项发现对应其自身法规',
};

/**
 * Потолок по букве закона: каждый закон один раз, евро и доллары раздельно.
 * Складывать их между собой — значит придумать курс, которого в законе нет.
 */
function formatCeiling(c: { EUR: number; USD: number }, locale: string): string {
  const место = locale === 'ru' ? 'ru-RU' : locale === 'es' ? 'es-ES' : locale === 'zh' ? 'zh-CN' : 'en-US';
  const деньги = (n: number, валюта: string) =>
    new Intl.NumberFormat(место, { style: 'currency', currency: валюта, maximumFractionDigits: 0 }).format(n);
  const части: string[] = [];
  if (c.EUR > 0) части.push(деньги(c.EUR, 'EUR'));
  if (c.USD > 0) части.push(деньги(c.USD, 'USD'));
  return части.join(' + ');
}

function formatExposure(total: number): string {
  if (total >= 1_000_000_000) return `$${(total / 1_000_000_000).toFixed(1)}B+`;
  if (total >= 1_000_000) return `$${(total / 1_000_000).toFixed(1)}M+`;
  if (total >= 1_000) return `$${Math.round(total / 1_000)}K+`;
  return `$${total.toLocaleString()}`;
}

const CAT_TEXT: Record<string, string> = {
  cyan: 'text-cyan-400', blue: 'text-blue-400', purple: 'text-purple-400',
  indigo: 'text-indigo-400', amber: 'text-amber-400', emerald: 'text-emerald-400',
  rose: 'text-rose-400', violet: 'text-violet-400', teal: 'text-teal-400',
  orange: 'text-orange-400',
};
const CAT_BG: Record<string, string> = {
  cyan: 'bg-cyan-500/8 border-cyan-500/20', blue: 'bg-blue-500/8 border-blue-500/20',
  purple: 'bg-purple-500/8 border-purple-500/20', indigo: 'bg-indigo-500/8 border-indigo-500/20',
  amber: 'bg-amber-500/8 border-amber-500/20', emerald: 'bg-emerald-500/8 border-emerald-500/20',
  rose: 'bg-rose-500/8 border-rose-500/20', violet: 'bg-violet-500/8 border-violet-500/20',
  teal: 'bg-teal-500/8 border-teal-500/20', orange: 'bg-orange-500/8 border-orange-500/20',
};
const SEV_BADGE: Record<string, string> = {
  critical: 'bg-red-500/10 border-red-500/30 text-red-400',
  serious: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  moderate: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  advisory: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
};
const SEV_LABEL: Record<string, string> = {
  critical: 'CRITICAL', serious: 'SERIOUS', moderate: 'MODERATE', advisory: 'ADVISORY',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function TerminalLine({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15 }}
      className="leading-relaxed"
    >
      {children}
    </motion.div>
  );
}

function getFixAdvice(code: string, title: string, locale: string): { steps: string[]; codeFix?: string } {
  const isRu = locale === 'ru';
  const isEs = locale === 'es';
  const isZh = locale === 'zh';
  
  const codeLower = code.toLowerCase();
  
  if (codeLower.includes('alt') || code === 'ADA-001') {
    return {
      steps: isRu ? [
        'Найдите тег <img> в исходном коде сайта.',
        'Добавьте атрибут alt="..." с кратким, содержательным описанием изображения.',
        'Для декоративных изображений используйте пустой alt="" или удалите их из дерева доступности.'
      ] : isEs ? [
        'Busque la etiqueta <img> en el código fuente.',
        'Añada el atributo alt="..." con una descripción descriptiva de la imagen.',
        'Para imágenes decorativas, use un atributo alt="" vacío.'
      ] : isZh ? [
        '在网站源码中找到 <img> 标签。',
        '添加 alt="..." 属性，并包含对图像的简短描述。',
        '对于装饰性图像，请使用空的 alt=""。'
      ] : [
        'Locate the <img> tag in your website HTML code.',
        'Add the alt="..." attribute containing a clear, descriptive text of the image.',
        'For purely decorative images, use an empty alt="" attribute to hide it from screen readers.'
      ],
      codeFix: '<img src="banner.jpg" alt="Annual Corporate Summit Keynote Presentation 2026">'
    };
  }
  
  if (codeLower.includes('button') || code === 'ADA-002') {
    return {
      steps: isRu ? [
        'Для кнопок-иконок без текста добавьте атрибут aria-label="Описание действия".',
        'Убедитесь, что кнопка имеет фокус ввода и доступна с клавиатуры (клавишами Enter и Space).',
        'Не оставляйте кнопки пустыми.'
      ] : isEs ? [
        'Para botones con iconos sin texto, añada el atributo aria-label="Descripción".',
        'Asegúrese de que el botón sea accesible mediante teclado.',
        'No deje botones interactivos sin texto visible o etiqueta ARIA.'
      ] : isZh ? [
        '对于无文本的图标按钮，添加 aria-label="操作描述" 属性。',
        '确保按钮可通过键盘导航访问并激活（Enter / 空格键）。',
        '不要留空交互式按钮。'
      ] : [
        'For icon-only buttons without text, add an aria-label="Action Description" attribute.',
        'Ensure the button is focusable and keyboard-interactive (via Enter and Space keys).',
        'Do not leave interactive button controls empty.'
      ],
      codeFix: '<button aria-label="Close modal dialog" onClick={closeModal}>\n  <svg>...</svg>\n</button>'
    };
  }
  
  if (codeLower.includes('contrast') || code === 'ADA-003') {
    return {
      steps: isRu ? [
        'Проверьте текущие цвета текста и фона в инспекторе контрастности.',
        'Сделайте цвет текста темнее (для светлого фона) или светлее (для темного фона).',
        'Убедитесь, что соотношение контраста составляет не менее 4.5:1 (для обычного текста) или 3:1 (для крупного текста).',
        'Кого это отсекает: не только людей с нарушением зрения. Слабый контраст первым перестают читать люди старше сорока — возрастная дальнозоркость есть у 128 млн американцев.'
      ] : isEs ? [
        'Verifique el contraste actual entre el texto y el fondo.',
        'Ajuste el color de texto para lograr una relación de contraste mínima de 4.5:1.',
        'Use herramientas de selección de color para encontrar combinaciones de colores seguras.',
        'A quién excluye: no solo a personas con discapacidad visual. Un contraste bajo deja de leerse primero para mayores de cuarenta: 128 millones de estadounidenses tienen presbicia.'
      ] : isZh ? [
        '检查文本与背景色的对比度。',
        '调整文本颜色以达到至少 4.5:1 的最小对比度（大文本为 3:1）。',
        '使用在线对比度检查工具微调 Hex 代码。',
        '这会挡住谁：不只是视障人士。对比度不足时，最先看不清的是四十岁以上的人——美国有 1.28 亿人患有老视。'
      ] : [
        'Inspect foreground text color and background color using dev tools.',
        'Adjust the text color to be darker on light backgrounds, or lighter on dark backgrounds.',
        'Ensure a minimum contrast ratio of 4.5:1 for regular text, and 3:1 for large text (WCAG AA standard).',
        'Who this shuts out: not only people with visual impairments. Low contrast becomes unreadable first for people over forty — 128 million Americans have age-related farsightedness.'
      ],
      codeFix: '/* Compliant contrast example */\n.text-element {\n  color: #1e293b; /* Dark Slate */\n  background-color: #f8fafc; /* Ice White */\n}'
    };
  }
  
  if (codeLower.includes('label') || codeLower.includes('input') || codeLower.includes('form')) {
    return {
      steps: isRu ? [
        'Каждое поле ввода должно быть явно связано с тегом <label>.',
        'Свяжите их с помощью атрибутов id на input и for на label.',
        'Если визуальная подпись отсутствует, добавьте aria-label или placeholder.'
      ] : isEs ? [
        'Cada campo de entrada <input> debe estar enlazado con un <label>.',
        'Use el atributo for en la etiqueta label y el id correspondiente en el input.',
        'Use aria-label en entradas donde la etiqueta visible no sea posible.'
      ] : isZh ? [
        '每个输入框都必须与相应的 <label> 标签显式关联。',
        '使用 label 的 for 属性和 input 的 id 属性建立绑定。',
        '如果不需要可见的标签，请添加 aria-label 属性。'
      ] : [
        'Ensure every input field has a matching <label> element.',
        'Connect them by matching the id attribute of the input with the for attribute of the label.',
        'If a visual label is not possible, add an aria-label attribute to provide an accessible name.'
      ],
      codeFix: '<label htmlFor="user-email">Email Address</label>\n<input id="user-email" type="email" placeholder="name@company.com" />'
    };
  }
  
  if (codeLower.includes('link') || codeLower.includes('anchor')) {
    return {
      steps: isRu ? [
        'Убедитесь, что ссылка содержит осмысленный текст (избегайте "подробнее" или "нажмите сюда").',
        'Если ссылка содержит только иконку, добавьте aria-label со смысловым текстом.',
        'Убедитесь, что фокус ссылки визуально выделен при навигации.'
      ] : isEs ? [
        'Asegúrese de que el enlace contenga texto descriptivo.',
        'Si el enlace es una imagen o icono, añada un atributo aria-label con el destino del enlace.',
        'No deje enlaces vacíos en el documento HTML.'
      ] : isZh ? [
        '确保链接文本具有明确含义（避免使用“点击这里”或“阅读更多”）。',
        '如果链接仅包含图标，请在 <a> 标签上添加 aria-label 属性指定目的地。',
        '检查并移除空的 <a> 标签。'
      ] : [
        'Ensure every link contains descriptive visible text (avoid "click here" or "read more").',
        'If a link only wraps an icon, add an aria-label attribute describing the destination.',
        'Remove empty <a> tags without text or href from the document.'
      ],
      codeFix: '<a href="/services" aria-label="Learn more about our AI consulting services">\n  Discover Services\n</a>'
    };
  }

  return {
    steps: isRu ? [
      'Изучите законодательные требования для данного типа нарушений.',
      'Убедитесь, что техническая реализация соответствует WCAG 2.1 AA / GDPR.',
      'Используйте инспектор кода для верификации и отладки.'
    ] : isEs ? [
      'Revise los requisitos de cumplimiento relativos a esta regla.',
      'Asegúrese de que los elementos sigan los estándares establecidos.',
      'Utilice las herramientas de desarrollo para depurar.'
    ] : isZh ? [
      '查阅此合规准则的详细要求。',
      '确保前端/后端实现方式符合 WCAG 2.1 AA 或隐私保护规范。',
      '在开发者面板中审查相应节点以进行修复。'
    ] : [
      'Review compliance documentation and standard guidelines for this rule.',
      'Verify that your frontend/backend implementation conforms to WCAG 2.1 AA or data privacy requirements.',
      'Inspect the associated DOM nodes or headers in your browser developer tools to verify the fix.'
    ]
  };
}

// 🔴 ИСПРАВЛЕНО 17.09.2026 — ОБЪЕКТИВНАЯ ОШИБКА, класс «единица измерения не
// пересчитана при смене шкалы» (раздел 11 Конституции: единица должна быть
// объявлена и совпадать по всей цепочке). Пороги ниже были рассчитаны под
// СТАРУЮ шкалу очков 0–2000 (1950/2000=97.5% и т.д.), а вызывается функция
// с `result.score`, который везде рядом в UI показан как `{result.score}/100`
// — то есть уже НОРМАЛИЗОВАННЫЙ балл 0–100. Итог: собственный сайт со
// score=100/100 и 0 нарушений получал бейдж «F», прямо на глазах у
// посетителя сканера. Найдено при живой пересъёмке отчёта для демо-видео.
// Пороги пересчитаны пропорционально (разделены на 20): 1950→97.5≈98,
// 1800→90, 1600→80, 1400→70, 1000→50.
function calculateGrade(score: number): { letter: string; color: string; bg: string } {
  if (score >= 98) return { letter: 'A+', color: 'text-emerald-400 border-emerald-400/30', bg: 'bg-emerald-500/10' };
  if (score >= 90) return { letter: 'A', color: 'text-teal-400 border-teal-400/30', bg: 'bg-teal-500/10' };
  if (score >= 80) return { letter: 'B', color: 'text-cyan-400 border-cyan-400/30', bg: 'bg-cyan-500/10' };
  if (score >= 70) return { letter: 'C', color: 'text-yellow-400 border-yellow-400/30', bg: 'bg-yellow-500/10' };
  if (score >= 50) return { letter: 'D', color: 'text-orange-400 border-orange-400/30', bg: 'bg-orange-500/10' };
  return { letter: 'F', color: 'text-red-400 border-red-400/30', bg: 'bg-red-500/10' };
}

interface ThreatCardProps { threat: FoundThreat; }

function ThreatCard({ threat }: ThreatCardProps) {
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  // Тексты — из словаря рядом со страницей сканера, а не из общего словаря
  // сайта: на четырёх сайтах он разной формы, и ключа `threatScanner` в нём
  // нет. Так компонент переносится куда угодно, завися только от `locale`.
  const язык_ = (['ru', 'en', 'es', 'zh'].includes(locale) ? locale : 'en') as ЯзыкКодСканера;
  const ts = ТЕКСТЫ_УГРОЗ[язык_];
  const [showFix, setShowFix] = useState(false);
  const advice = getFixAdvice(threat.code, threat.title, locale);

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 page-break-inside-avoid">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[13px] font-mono font-bold px-2 py-0.5 rounded border ${SEV_BADGE[threat.severity] ?? SEV_BADGE.advisory}`}>
            {SEV_LABEL[threat.severity] ?? threat.severity.toUpperCase()}
          </span>
          <span className="text-[13px] font-mono text-gray-400">{threat.code}</span>
          {/* 🔴 ЧЕМ ПОДТВЕРЖДАЕТСЯ ЭТА НАХОДКА.
              Добавлено 22.08.2026 (числа на 26.09.2026: 136 и 1864). Из 2000 правил 136 описывают то, чего в
              ответе сайта нет физически: «политика ИБ, ежегодно
              пересматриваемая руководством» (ISO27-001), «серверные журналы
              не показывают следов IDS» (SOC2P-001), процедуры найма, реестры
              инцидентов. Выдавать их за проверенные — значит обесценить
              остальные 1864, которые проверены по-настоящему.
              Здесь это сказано прямо, у самой находки: внешний признак,
              подтверждается аудитом. Человек из комплаенса видит, что автор
              понимает разницу между сканированием и аудитом. */}
          {(threat as unknown as { evidenceKind?: string }).evidenceKind === 'indicative' && (
            <span
              className="text-[13px] font-mono px-1.5 py-0.5 rounded border border-amber-500/30 text-amber-300/90"
              title={ts.indicativeHint}
            >
              {ts.indicativeBadge}
            </span>
          )}
          {/* Настоящая юрисдикция находки. В реестре категория часто не
              совпадает с содержимым: бразильский закон лежал в «GDPR», и
              клиент не понимал, что проверка вообще-то про его LGPD. */}
          {(threat as unknown as { jurisdiction?: string; jurisdictionFlag?: string; jurisdictionLaw?: string }).jurisdiction && (
            <span
              className="text-[13px] font-mono px-1.5 py-0.5 rounded border border-white/10 text-gray-300"
              title={(threat as unknown as { jurisdictionLaw?: string }).jurisdictionLaw}
            >
              {(threat as unknown as { jurisdictionFlag?: string }).jurisdictionFlag}{' '}
              {(threat as unknown as { jurisdiction?: string }).jurisdiction}
            </span>
          )}
        </div>
        <span className={`text-xs font-mono font-bold shrink-0 ${threat.lawKind && threat.lawKind !== 'law' ? 'text-gray-400' : 'text-red-400'}`}>
          {threat.fineShort ?? shortenFine(threat.fineAmount)}
        </span>
      </div>

      <p className="font-semibold text-white text-sm mb-1 leading-snug">{threat.title}</p>

      {/* Grok evidence */}
      <div className="mb-3 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/15">
        <p className="text-[13px] text-amber-500/80 uppercase tracking-widest font-semibold mb-0.5">AI Evidence</p>
        <p className="text-xs text-amber-200/70 leading-relaxed">{threat.evidence}</p>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed mb-3">{threat.description}</p>

      {/* Offending HTML snippet */}
      {threat.violatingHtml && (
        <div className="mb-3">
          <p className="text-[13px] text-gray-400 uppercase tracking-widest font-semibold mb-1">
            {ts.violatingCode}
          </p>
          <div className="overflow-x-auto rounded-lg bg-black/40 border border-white/5 p-2.5 font-mono text-[13px] text-cyan-300/90 leading-relaxed whitespace-pre-wrap break-all" tabIndex={0}>
            {threat.violatingHtml}
          </div>
        </div>
      )}

      {/* How to Fix Accordion */}
      <div className="mb-3 border-t border-white/6 pt-2">
        <button
          onClick={() => setShowFix(!showFix)}
          className="flex items-center justify-between w-full text-xs text-cyan-400 hover:text-cyan-300 font-medium py-1 transition-colors print:hidden"
        >
          <span>{ts.howToFix}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showFix ? 'rotate-180' : ''}`} />
        </button>
        
        {/* Hidden button for screen readers when printing or standard print block */}
        <div className="hidden print:block text-xs text-cyan-400 font-medium py-1">
          {ts.howToFix}
        </div>

        <div className={`overflow-hidden transition-all duration-200 ${showFix ? 'block' : 'hidden print:block'}`}>
          <div className="mt-2 pl-2 border-l border-cyan-500/30 space-y-2 text-xs text-gray-400">
            <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
              {advice.steps.map((step, idx) => (
                <li key={idx} className="marker:text-cyan-700 dark:text-cyan-400 marker:font-mono">
                  <span className="pl-1 text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
            {advice.codeFix && (
              <div className="mt-3 space-y-1">
                <p className="text-[13px] text-gray-400 uppercase tracking-widest font-semibold">Suggested Fix</p>
                <div className="overflow-x-auto rounded-lg bg-black/60 border border-white/5 p-2.5 font-mono text-[13px] text-emerald-400 leading-relaxed whitespace-pre-wrap" tabIndex={0}>
                  {advice.codeFix}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-white/6">
        <div>
          <p className="text-[13px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Regulation</p>
          <a
            href={threat.lawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 hover:underline underline-offset-2 transition-colors"
          >
            {threat.lawName.split('—')[0].trim()}
            <ExternalLink className="w-2.5 h-2.5 opacity-70 shrink-0 print:hidden" aria-hidden="true" />
          </a>
          {/* Остальные первоисточники по этой находке — каждый рабочей ссылкой. */}
          {(threat.lawSources?.length ?? 0) > 1 && (
            <ul className="mt-1 space-y-0.5">
              {threat.lawSources!.slice(1).map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-cyan-400/80 hover:text-cyan-300 hover:underline underline-offset-2">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <p className="text-[13px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Consequence</p>
          <p className="text-xs text-gray-400">{threat.consequence.split(';')[0]}</p>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-white/6">
        <p className="text-[13px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Maximum Penalty</p>
        <p className="text-xs font-mono text-red-400 font-bold">{threat.fineAmount}</p>
      </div>
    </div>
  );
}

const formTranslations: Record<string, {
  title: string;
  description: string;
  emailPlaceholder: string;
  buttonText: string;
  checkboxConsent: string;
  successMessage: string;
  sending: string;
}> = {
  ru: {
    title: 'Получить полный отчет об аудите',
    description: 'Мы вышлем вам подробный отчет с описанием всех нарушений и пошаговыми инструкциями по исправлению.',
    emailPlaceholder: 'Введите вашу почту',
    buttonText: 'Получить отчет',
    checkboxConsent: 'Я даю согласие на получение писем и сообщений. Мы вышлем вам полный отчет, но для этого нам нужна ваша электронная почта и ваше согласие на получение от нас писем и сообщений.',
    successMessage: 'Спасибо! Полный отчет отправлен на ваш email.',
    sending: 'Отправка...',
  },
  en: {
    title: 'Get Full Audit Report',
    description: 'We will send you a detailed report detailing all violations and step-by-step instructions to remediate.',
    emailPlaceholder: 'Enter your email',
    buttonText: 'Get Report',
    checkboxConsent: 'I consent to receiving emails and messages. We will send you a full report, but for this we need your email address and your consent to receive letters and messages from us.',
    successMessage: 'Thank you! The full report has been sent to your email.',
    sending: 'Sending...',
  },
  es: {
    title: 'Obtener el informe de auditoría completo',
    description: 'Le enviaremos un informe detallado con todas las infracciones y las instrucciones de solución paso a paso.',
    emailPlaceholder: 'Introduzca su correo electrónico',
    buttonText: 'Obtener informe',
    checkboxConsent: 'Doy mi consentimiento para recibir correos electrónicos y mensajes. Le enviaremos un informe completo, pero para ello necesitamos su dirección de correo electrónico y su consentimiento para recibir cartas y mensajes de nuestra parte.',
    successMessage: '¡Gracias! El informe completo ha sido enviado a su correo electrónico.',
    sending: 'Enviando...',
  },
  zh: {
    title: '获取完整审计报告',
    description: '我们将向您发送一份详细报告，列出所有违规行为以及逐步修复的说明。',
    emailPlaceholder: '输入您的电子邮件',
    buttonText: '获取报告',
    checkboxConsent: '我同意接收电子邮件和消息。我们将向您发送完整的报告，但为此我们需要您的电子邮件地址以及您同意接收我们的信件和消息。',
    successMessage: '谢谢！完整报告已发送至您的电子邮箱。',
    sending: '发送中...',
  }
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ThreatScanner() {
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  // Тексты — из словаря рядом со страницей сканера, а не из общего словаря
  // сайта: на четырёх сайтах он разной формы, и ключа `threatScanner` в нём
  // нет. Так компонент переносится куда угодно, завися только от `locale`.
  const язык_ = (['ru', 'en', 'es', 'zh'].includes(locale) ? locale : 'en') as ЯзыкКодСканера;
  const ts = ТЕКСТЫ_УГРОЗ[язык_];
  const activeLawMeta = useMemo(() => getLawMeta(locale), [locale]);

  const [url, setUrl] = useState('');
  const [scanSitemap, setScanSitemap] = useState(false);
  // Подтверждение права на проверку домена. Обязательно: запрос к чужому
  // сайту уходит с НАШЕГО сервера, и в журналах владельца записаны мы.
  // Ручка возвращает AUTHORIZATION_REQUIRED, пока признак не пришёл.
  const [подтвердилПраво, setПодтвердилПраво] = useState(false);
  const [showApiDocs, setShowApiDocs] = useState(false);
  const [state, setState] = useState<ScanState>('idle');
  const [result, setResult] = useState<ScanResponse | null>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const outputRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [leadState, setLeadState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const [activePatchTab, setActivePatchTab] = useState<'css' | 'js' | 'embed' | 'guide'>('css');
  const [copiedPatch, setCopiedPatch] = useState<string | null>(null);

  const generatedPatch = useMemo(() => {
    if (!result || !result.allThreats || result.allThreats.length === 0) return null;
    const domainName = (url || '').replace(/^https?:\/\//i, '').split('/')[0].split('?')[0] || 'target-site.com';
    return generateAIfaFocusPatch({
      domain: domainName,
      locale,
      threats: result.allThreats,
    });
  }, [result, url, locale]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setLeadState('sending');
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          url: url.trim(),
          score: result?.score || 0,
          source: 'accessibility-audit',
          threats: result?.allThreats || [],
          scanId: (result as any)?.scanId || '',
          provenCount: (result as any)?.provenCount || 0,
          totalIssues: result?.totalIssues || (result?.allThreats?.length || 0),
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      setLeadState('success');
    } catch (err) {
      console.error('Lead error:', err);
      setLeadState('error');
    }
  };

  // ── Restore from localStorage on mount ──────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const { result: saved, targetUrl, timestamp } = JSON.parse(raw) as {
        result: ScanResponse; targetUrl: string; timestamp: number;
      };
      if (Date.now() - timestamp > SCAN_TTL_MS) { localStorage.removeItem(STORAGE_KEY); return; }
      setResult(saved);
      setUrl(targetUrl);
      setLines([
        `> ORACLE v2.1 — SESSION RESTORED`,
        `> TARGET: ${targetUrl}`,
        `> SCORE: ${saved.score}/100  ·  ${saved.totalIssues} VIOLATIONS ON RECORD`,
        `> ─────────────────────────────────────────────────`,
      ]);
      setState('done');
      setOpenCategories(new Set(saved.allThreats.map((t) => t.category)));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  const addLine = (line: string, delay: number) => {
    setTimeout(() => setLines((prev) => [...prev, line]), delay);
  };

  // ── Derived values from result ───────────────────────────────────────────────
  // Новые отчёты несут у доказанных находок их закон (lawKind) — тогда потолок
  // считается по закону один раз (lib/probe-law.ts). У отчётов, сохранённых
  // в браузере до 25.09.2026, этого поля нет — для них прежний расчёт.
  const естьЗаконы = useMemo(() => Boolean(result?.allThreats?.some((t) => t.lawKind)), [result]);
  const потолок = useMemo(() => statutoryCeiling(result?.allThreats ?? []), [result]);
  const totalExposure = useMemo(() => {
    if (!result?.allThreats) return 0;
    if (естьЗаконы) return потолок.EUR + потолок.USD;
    return result.allThreats.reduce((sum, t) => sum + parseMaxFine(t.fineAmount), 0);
  }, [result, естьЗаконы, потолок]);

  const threatsByCategory = useMemo(() => {
    if (!result?.allThreats) return {} as Record<string, FoundThreat[]>;
    return result.allThreats.reduce((acc, t) => {
      const ключ = t.lawKind ? ГРУППА_СВОЙ_ЗАКОН : t.category;
      if (!acc[ключ]) acc[ключ] = [];
      acc[ключ].push(t);
      return acc;
    }, {} as Record<string, FoundThreat[]>);
  }, [result]);

  // Оценка теперь по шкале 0–100 и считается по весам серьёзности. Раньше было
  // «2000 минус число находок»: сайт с одной критической дырой получал 1999 и
  // выглядел почти идеальным.
  const scoreColor = result
    ? result.score >= 85 ? 'text-emerald-400' : result.score >= 60 ? 'text-yellow-400' : 'text-red-400'
    : 'text-gray-400';

  // ── Scan logic ───────────────────────────────────────────────────────────────
  /**
   * @param force — обойти суточный кэш и разобрать сайт заново.
   *
   * Зачем нужен обход. Результат проверки хранится сутки: один и тот же сайт в
   * пределах дня обязан давать один и тот же отчёт, иначе теряется
   * повторяемость, за которую платит клиент. Но человек, который ТОЛЬКО ЧТО
   * починил свой сайт, хочет увидеть результат немедленно, а не завтра. Раньше
   * обойти кэш можно было только обращением к API напрямую — то есть никак для
   * обычного человека.
   */
  const initiateScan = (force = false) => {
    const raw = url.trim();
    if (!raw) return;
    const target = raw.startsWith('http') ? raw : `https://${raw}`;

    setState('scanning');
    setResult(null);
    setLines([]);
    setOpenCategories(new Set());

    addLine(`> ORACLE v2.1 — THREAT SCANNER INITIALIZED`, 0);
    addLine(`> TARGET: ${target}`, 80);
    if (scanSitemap) {
      addLine(`> DETECTED MULTI-PAGE AUDIT MODE via Sitemap.xml`, 120);
    }
    addLine(`> PROBING WCAG 2.1 AA · ADA · GDPR · CCPA · PCI-DSS  +  EXTERNAL INDICATORS: SOC 2 · ISO 27001`, 200);
    addLine(`> ─────────────────────────────────────────────────`, 350);

    // Список шагов приведён к тому, что сервер ДЕЙСТВИТЕЛЬНО делает.
    // Раньше здесь бежали строки «Auditing color contrast ratios», «Testing
    // responsive reflow at 320px», «Verifying skip navigation links» — ни одна
    // из этих проверок не выполнялась: контрастность и поведение на 320px
    // требуют запуска браузера, а сканер делает обычный запрос страницы.
    // Показывать несуществующую работу нельзя: это ровно то, за что мы сами
    // выставляем клиентам замечания.
    // ЯЗЫК ЛОГА СЛЕДУЕТ ЗА ЯЗЫКОМ СТРАНИЦЫ.
    //
    // Найдено 11.09.2026: при выбранном английском интерфейс был английским,
    // а терминал сканера писал по-русски. Человек из США видел строки на
    // чужом языке в продукте, который ему продают. Ошибка, не вкусовщина.
    const ШАГИ_ПРОВЕРКИ: Record<string, string[]> = {
      ru: [
        'Запрашиваем страницу и снимаем заголовки ответа',
        'Проверяем шифрование канала и срок HSTS',
        'Разбираем политику безопасности содержимого (CSP)',
        'Смотрим защиту от встраивания в чужой сайт',
        'Читаем флаги cookie: Secure, HttpOnly, SameSite',
        'Ищем счётчики слежки и менеджер согласия',
        'Проверяем ссылку на политику конфиденциальности',
        'Ищем незащищённые ресурсы на защищённой странице',
        'Пробуем robots.txt, security.txt и открытые служебные файлы',
        'Разбираем разметку: alt, подписи полей, заголовки, ориентиры',
        'Сверяем находки с реестром из 2000 проверок',
      ],
      en: [
        'Requesting the page and reading response headers',
        'Checking channel encryption and HSTS lifetime',
        'Parsing the Content Security Policy',
        'Looking at clickjacking protection',
        'Reading cookie flags: Secure, HttpOnly, SameSite',
        'Looking for trackers and a consent manager',
        'Checking the privacy policy link',
        'Looking for insecure resources on a secure page',
        'Trying robots.txt, security.txt and open service files',
        'Parsing markup: alt text, field labels, headings, landmarks',
        'Matching findings against a registry of 2000 checks',
      ],
      es: [
        'Solicitando la página y leyendo las cabeceras de respuesta',
        'Comprobando el cifrado del canal y la vigencia de HSTS',
        'Analizando la política de seguridad de contenido (CSP)',
        'Revisando la protección contra incrustación en otros sitios',
        'Leyendo las marcas de cookies: Secure, HttpOnly, SameSite',
        'Buscando rastreadores y gestor de consentimiento',
        'Comprobando el enlace a la política de privacidad',
        'Buscando recursos inseguros en una página segura',
        'Probando robots.txt, security.txt y archivos de servicio abiertos',
        'Analizando el marcado: alt, etiquetas de campos, encabezados, puntos de referencia',
        'Contrastando los hallazgos con un registro de 2000 comprobaciones',
      ],
      zh: [
        '请求页面并读取响应头',
        '检查通道加密与 HSTS 有效期',
        '解析内容安全策略 (CSP)',
        '查看点击劫持防护',
        '读取 Cookie 标志：Secure、HttpOnly、SameSite',
        '查找跟踪器与同意管理工具',
        '检查隐私政策链接',
        '在安全页面上查找不安全资源',
        '尝试 robots.txt、security.txt 与开放的服务文件',
        '解析标记：alt、字段标签、标题、地标',
        '将发现与 2000 项检查的清单进行比对',
      ],
    };
    const checks = ШАГИ_ПРОВЕРКИ[locale] ?? ШАГИ_ПРОВЕРКИ.en;
    checks.forEach((c, i) => addLine(`  [SCAN]   ${c}`, 450 + i * 180));

    const animDone = 450 + checks.length * 180 + 200;

    // Start API call immediately in parallel with animation
    const apiPromise = fetch('/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: target, locale, scanSitemap, rescan: force, подтверждаюПраво: подтвердилПраво }),
    })
      .then(async (r) => {
        if (!r.ok) {
          const errData = await r.json().catch(() => ({}));
          const сбой = new Error(errData.error || 'SCAN_FAILED') as Error & { понятно?: string };
          // 🔴 ОБЪЯСНЕНИЕ ОТ СЕРВЕРА ТЕРЯЛОСЬ ПО ДОРОГЕ.
          // Ручка отдаёт поле userMessage — человеческий текст вроде «на сегодня
          // бесплатные проверки закончились, их пять в сутки». Сюда доезжал
          // только код ошибки, а внизу всё, кроме двух известных кодов,
          // печаталось как «Ошибка сканирования». То есть человек видел
          // поломку там, где поломки не было, и уходил.
          if (typeof errData.userMessage === 'string' && errData.userMessage.trim()) {
            сбой.понятно = errData.userMessage.trim();
          }
          throw сбой;
        }
        return r.json() as Promise<ScanResponse>;
      });

    setTimeout(async () => {
      addLine(`> ─────────────────────────────────────────────────`, 0);
      // Анализ ведёт AIfa. Раньше здесь стояло имя чужой модели — человек
      // читал, что его сайт разбирает кто-то посторонний.
      addLine(`> ${locale === 'ru' ? 'AIFA АНАЛИЗИРУЕТ…' : locale === 'es' ? 'AIFA ESTÁ ANALIZANDO…' : locale === 'zh' ? 'AIFA 正在分析…' : 'AIFA IS ANALYSING…'}`, 80);

      try {
        const finalData = await apiPromise;

        addLine(`> ─────────────────────────────────────────────────`, 100);
        addLine(`> SCAN COMPLETE  ·  COMPLIANCE SCORE: ${finalData.score}/100`, 200);
        // Номер проверки: по нему отчёт подтверждается на /audit-verify.
        // Без номера сертификата не существует — раньше его подделывали правкой
        // адресной строки.
        if ((finalData as { scanId?: string }).scanId) {
          addLine(`> REFERENCE: ${(finalData as { scanId?: string }).scanId}  ·  /audit-verify?id=${(finalData as { scanId?: string }).scanId}`, 240);
        }
        addLine(`> ${finalData.totalIssues} ACTIVE VIOLATIONS DETECTED ACROSS 7 FRAMEWORKS`, 280);
        addLine(`> ─────────────────────────────────────────────────`, 360);

        finalData.topIssues.forEach((issue, i) => {
          addLine(
            `  [${(SEV_LABEL[issue.severity] ?? issue.severity.toUpperCase())}]  ${issue.code}  |  ${issue.title}  |  Penalty: ${issue.fineShort ?? shortenFine(issue.fineAmount)}`,
            440 + i * 130
          );
        });

        const tail = 440 + (finalData.topIssues.length || 1) * 130 + 200;
        addLine(`> ─────────────────────────────────────────────────`, tail);
        let statusMsg = '';
        if (finalData.score === 100) {
          if (locale === 'ru') {
            statusMsg = '> СТАТУС: СООТВЕТСТВУЕТ  —  по проверенным правилам нарушений не найдено. Это не гарантия полной безопасности: проверяются конкретные правила WCAG 2.1 AA, GDPR и OWASP, а не все возможные риски. Рекомендуем делать проверку не реже 1 раза в месяц - законы меняются и дополняются постоянно.';
          } else if (locale === 'es') {
            statusMsg = '> ESTADO: CUMPLIDO  —  no se han encontrado infracciones entre las reglas comprobadas. Esto no garantiza la seguridad total: se comprueban reglas concretas de WCAG 2.1 AA, GDPR y OWASP, no todos los riesgos posibles. Recomendamos realizar esta auditoría al menos una vez al mes - las leyes cambian y se actualizan constantemente.';
          } else if (locale === 'zh') {
            statusMsg = '> 状态：合规  —  在已检查的规则中未发现违规。这并不保证整体安全：我们检查的是 WCAG 2.1 AA、GDPR 与 OWASP 的具体规则，而非所有可能的风险。我们建议每月至少运行一次此审计 - 法律法规在不断变化和更新。';
          } else {
            statusMsg = '> STATUS: COMPLIANT  —  no violations found among the rules we check. This is not a guarantee of overall security: we test specific WCAG 2.1 AA, GDPR and OWASP rules, not every possible risk. We recommend running this audit at least once a month - laws are constantly changing and being updated.';
          }
        } else if (finalData.score >= 85) {
          if (locale === 'ru') {
            statusMsg = '> СТАТУС: НИЗКИЙ РИСК  —  Рекомендуются незначительные исправления.';
          } else if (locale === 'es') {
            statusMsg = '> ESTADO: RIESGO BAJO  —  Se recomiendan correcciones menores.';
          } else if (locale === 'zh') {
            statusMsg = '> 状态：低风险  —  建议进行微调。';
          } else {
            statusMsg = '> STATUS: LOW RISK  —  Minor remediations recommended.';
          }
        } else if (finalData.score >= 55) {
          if (locale === 'ru') {
            statusMsg = '> СТАТУС: ПОВЫШЕННЫЙ РИСК  —  Немедленно устраните критические проблемы.';
          } else if (locale === 'es') {
            statusMsg = '> ESTADO: RIESGO ELEVADO  —  Aborde los problemas críticos de inmediato.';
          } else if (locale === 'zh') {
            statusMsg = '> 状态：中度风险  —  请立即解决关键问题。';
          } else {
            statusMsg = '> STATUS: ELEVATED RISK  —  Address critical issues immediately.';
          }
        } else {
          if (locale === 'ru') {
            statusMsg = '> СТАТУС: ВЫСОКИЙ РИСК  —  Прямая юридическая угроза. Срочно устраните нарушения.';
          } else if (locale === 'es') {
            statusMsg = '> ESTADO: RIESGO ALTO  —  Exposición legal inminente. Corrija los problemas ahora.';
          } else if (locale === 'zh') {
            statusMsg = '> 状态：高风险  —  即时法律风险。请立即整改。';
          } else {
            statusMsg = '> STATUS: HIGH RISK  —  Immediate legal exposure. Remediate now.';
          }
        }

        addLine(statusMsg, tail + 120);

        // Save to localStorage
        try {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ result: finalData, targetUrl: target, timestamp: Date.now() })
          );
        } catch { /* ignore quota */ }

        // Expand all categories by default
        setOpenCategories(new Set(finalData.allThreats.map((t) => t.category)));

        setTimeout(() => {
          setResult(finalData);
          setState('done');
        }, tail + 400);

      } catch (err: any) {
        addLine(`> ─────────────────────────────────────────────────`, 100);
        // Если сервер прислал человеческое объяснение — показываем ЕГО, а не
        // безликую «ошибку сканирования». Именно так выглядел исчерпанный
        // дневной лимит: проверок нет, поломки нет, а на экране «ОШИБКА».
        if (err.понятно) {
          for (const кусок of String(err.понятно).split(/(?<=\.)\s+/).filter(Boolean)) {
            addLine(`> ${кусок}`, 200);
          }
        } else if (err.message === 'INVALID_DOMAIN') {
          addLine(locale === 'ru' ? `> [ОШИБКА] Введите корректный домен.` : locale === 'es' ? `> [ERROR] ¡Ingrese un dominio válido!` : locale === 'zh' ? `> [错误] 请输入有效的域名！` : `> [ERROR] Enter a valid domain.`, 200);
        } else if (err.message === 'DOMAIN_UNREACHABLE') {
          addLine(locale === 'ru' ? `> [ОШИБКА] Сайт недоступен или домен не существует.` : locale === 'es' ? `> [ERROR] ¡El sitio no está disponible o el dominio no existe!` : locale === 'zh' ? `> [错误] 网站无法访问或域名不存在！` : `> [ERROR] Site unreachable or domain does not exist.`, 200);
        } else {
          addLine(
            locale === 'ru'
              ? `> [ОШИБКА] Ошибка сканирования.`
              : locale === 'es'
              ? `> [ERROR] ¡Error en la ejecución del escaneo!`
              : locale === 'zh'
              ? `> [错误] 扫描执行失败。`
              : `> [ERROR] Scan execution failed.`,
            200
          );
        }
        addLine(`> ─────────────────────────────────────────────────`, 300);
        setTimeout(() => {
          setState('idle');
        }, 1200);
      }
    }, animDone);
  };

  const reset = () => {
    setState('idle');
    setResult(null);
    setLines([]);
    setUrl('');
    setOpenCategories(new Set());
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      <div className="keep-dark w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#0a0f1a] overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.06)]">

      {/* Terminal header bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/8">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" aria-hidden="true" />
        <span className="ml-3 text-[13px] font-mono text-gray-400 tracking-widest uppercase select-none">
          oracle-threat-scanner — bash
        </span>
        <span className="ml-auto">
          <ScanLine className="w-3.5 h-3.5 text-cyan-500/50" aria-hidden="true" />
        </span>
      </div>

      {/* URL input */}
      <div className="px-4 py-3 border-b border-white/6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-cyan-500/60 select-none pointer-events-none">$</span>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && state === 'idle') initiateScan(); }}
              placeholder={ts.placeholder}
              aria-label="Domain or URL to scan"
              disabled={state === 'scanning'}
              className="w-full pl-7 pr-3 py-2.5 bg-transparent border border-white/10 rounded-lg text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 focus:border-cyan-500/30 transition-all disabled:opacity-50"
            />
          </div>
          {state === 'idle' && (
            <motion.button
              /* Обязательно через стрелку: если передать функцию напрямую,
                 React отдаст ей событие клика первым аргументом — и оно
                 попадёт в параметр «обойти кэш». Тогда КАЖДАЯ проверка шла бы
                 мимо кэша, то есть заново обращалась к модели за деньги. */
              onClick={() => initiateScan()}
              disabled={!url.trim()}
              whileHover={{ scale: url.trim() ? 1.04 : 1 }}
              whileTap={{ scale: url.trim() ? 0.96 : 1 }}
              className="keep-dark btn-neon px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {ts.initiate}
            </motion.button>
          )}
          {state === 'scanning' && (
            <div className="px-5 py-2.5 flex items-center gap-2 text-sm text-cyan-400 font-mono">
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              {ts.scanning}
            </div>
          )}
          {state === 'done' && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 px-4 py-2.5 border border-white/15 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:border-white/30 transition-all whitespace-nowrap"
              title="Clear and analyze another site"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              {ts.reset}
            </button>
          )}
        </div>
        
        {/* Подтверждение права на проверку домена — обязательное, см. route.ts */}
        {state === 'idle' && (
          <div className="mt-2.5 flex items-center gap-2">
            <label className="flex items-center gap-2 text-[13px] text-gray-400 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={подтвердилПраво}
                onChange={(e) => setПодтвердилПраво(e.target.checked)}
                className="rounded border-white/10 bg-black/40 text-cyan-500 focus:ring-cyan-500/30 focus:ring-offset-black"
              />
              <span className="group-hover:text-gray-300 transition-colors">
                {locale === 'ru'
                  ? 'Я владею этим сайтом или уполномочен его проверять'
                  : locale === 'es'
                    ? 'Soy propietario de este sitio o estoy autorizado a analizarlo'
                    : locale === 'zh'
                      ? '我拥有该网站，或已获授权对其进行检测'
                      : 'I own this website or am authorised to scan it'}
              </span>
            </label>
          </div>
        )}

        {/* Sitemap checkbox option */}
        {state === 'idle' && (
          <div className="mt-2.5 flex items-center gap-2">
            <label className="flex items-center gap-2 text-[13px] text-gray-400 cursor-pointer select-none group">
              <input
                type="checkbox"
                checked={scanSitemap}
                onChange={(e) => setScanSitemap(e.target.checked)}
                className="rounded border-white/10 bg-black/40 text-cyan-500 focus:ring-cyan-500/30 focus:ring-offset-black"
              />
              <span className="group-hover:text-gray-300 transition-colors">
                {locale === 'ru' ? 'Сканировать карту сайта (Мультистраничный аудит до 3-х страниц)' : locale === 'es' ? 'Escanear mapa del sitio (Auditoría multipágina de hasta 3 páginas)' : locale === 'zh' ? '扫描网站地图 (最多3页的多页面审计)' : 'Scan Sitemap (Multi-page audit up to 3 pages)'}
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Terminal output */}
      <div
        ref={outputRef}
        className="px-4 py-4 h-56 overflow-y-auto font-mono text-xs space-y-0.5 scroll-smooth"
        role="log"
        aria-live="polite"
        aria-label="Scanner output"
      >
        {lines.length === 0 && state === 'idle' && (
          <p className="text-gray-400">{ts.idlePrompt}</p>
        )}
        <AnimatePresence>
          {lines.map((line, i) => {
            const isCritical = line.includes('[CRITICAL]');
            const isSerious  = line.includes('[SERIOUS]');
            const isModerate = line.includes('[MODERATE]');
            const isOk       = line.includes('LOW RISK');
            const isWarn     = line.includes('ELEVATED RISK') || line.includes('HIGH RISK');
            return (
              <TerminalLine key={i}>
                <span className={
                  isCritical ? 'text-red-400' :
                  isSerious  ? 'text-orange-400' :
                  isModerate ? 'text-yellow-400' :
                  isOk       ? 'text-emerald-400' :
                  isWarn     ? 'text-red-400' :
                  line.startsWith('  ') ? 'text-gray-400' :
                  'text-cyan-300/80'
                }>
                  {line}
                </span>
              </TerminalLine>
            );
          })}
        </AnimatePresence>
        {state === 'scanning' && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            className="inline-block w-2 h-3.5 bg-cyan-400 ml-0.5 align-middle"
            aria-hidden="true"
          />
        )}
      </div>

      {/* ── Results panel (shown when done) ────────────────────────────────────── */}
      <AnimatePresence>
        {state === 'done' && result && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/8"
          >

            {/* Score + Exposure header */}
            <div className="px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.01]">
              {/* Та же болезнь, что и справа: три блока подряд — оценка, счёт и
                  потолок штрафов — на узком экране не переносились. */}
              <div className="flex flex-wrap items-center gap-5 min-w-0">
                {/* Circular Grade Badge */}
                <div className={`relative flex items-center justify-center w-14 h-14 rounded-full border-2 ${calculateGrade(result.score).color} ${calculateGrade(result.score).bg} shadow-[0_0_15px_rgba(6,182,212,0.15)] shrink-0 font-bold text-lg font-mono`}>
                  {calculateGrade(result.score).letter}
                </div>

                {/* Health score */}
                <div className="text-center">
                  <div className={`text-2xl font-black tabular-nums ${scoreColor}`}>
                    {result.score}
                    <span className="text-xs font-medium text-gray-400">/100</span>
                  </div>
                  <div className="text-[13px] uppercase tracking-widest text-gray-400">{ts.scoreLabel}</div>
                </div>

                {/* Financial exposure */}
                {totalExposure > 0 && (
                  <div className="border-l border-white/8 pl-5">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <DollarSign className="w-3 h-3 text-red-400" aria-hidden="true" />
                      <span className="text-[13px] uppercase tracking-widest text-gray-400">
                        {locale === 'ru' ? 'Потолок штрафов по букве закона' : locale === 'es' ? 'Techo de multas segun la ley' : locale === 'zh' ? '法律规定的罚款上限' : 'Statutory maximum, not a forecast'}
                      </span>
                    </div>
                    <div className="text-xl font-black text-red-400 tabular-nums">{естьЗаконы ? formatCeiling(потолок, locale) : formatExposure(totalExposure)}</div>
                    {/* Это сумма МАКСИМАЛЬНЫХ штрафов, предусмотренных законами,
                        а не прогноз наших потерь. Подавать её как «ваш риск в
                        долларах» было бы запугиванием — подписываем честно. */}
                    <div className="text-[13px] text-gray-400">
                      {естьЗаконы ? (
                        locale === 'ru'
                          ? `каждый закон учтён один раз (${потолок.laws.join(', ')}); не учтены пункты без отдельного штрафа и нормы, где штраф задаёт страна. Не прогноз.`
                          : locale === 'es'
                            ? `cada ley se cuenta una vez (${потолок.laws.join(', ')}); se excluyen los puntos sin multa específica y las sanciones que fija cada país. No es una previsión.`
                            : locale === 'zh'
                              ? `每部法律只计一次（${потолок.laws.join('、')}）；不含无单独罚款的项目及由各国规定的罚则。非预测。`
                              : `each law counted once (${потолок.laws.join(', ')}); items without a separate fine and nationally set penalties are excluded. Not a prediction.`
                      ) : locale === 'ru'
                        ? `теоретический максимум по ${result.totalIssues} пунктам, не прогноз`
                        : locale === 'es'
                          ? `maximo teorico en ${result.totalIssues} puntos, no una prevision`
                          : locale === 'zh'
                            ? `${result.totalIssues} 项的理论上限，非预测`
                            : `theoretical ceiling across ${result.totalIssues} findings, not a prediction`}
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              {/* На телефоне столбец занимает всю ширину и прижат влево:
                  прижатый вправо блок в 700 пикселей на экране в 375 просто
                  не помещается. `min-w-0` разрешает ему сжиматься — без него
                  flex-элемент отказывается быть уже своего содержимого. */}
              <div className="flex flex-col gap-2 items-start sm:items-end w-full sm:w-auto min-w-0 print:hidden">
                <div className="flex items-center gap-2">
                  {result.score >= 1800
                    ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    : <AlertTriangle className="w-3.5 h-3.5 text-red-400" aria-hidden="true" />
                  }
                  <span className={`text-xs font-semibold ${result.score < 1800 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {result.totalIssues} {ts.issuesDetected}
                  </span>
                </div>
                {/* ПЕРЕНОС ОБЯЗАТЕЛЕН. Кнопок здесь до пяти, и на узком экране
                    ряд без `flex-wrap` не переносится, а выталкивает содержимое
                    за правый край: замер 29.08.2026 по скриншоту Архитектора —
                    счётчик нарушений обрезан, последняя кнопка ушла под край.
                    Пятая кнопка появляется только у проверки с номером, поэтому
                    дефект не виден, пока не запустишь настоящее сканирование. */}
                <div className="flex flex-wrap items-center gap-2 justify-start sm:justify-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => {
                        const el = document.getElementById('lead-capture-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }}
                      className="keep-dark btn-neon inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg text-xs font-semibold text-white cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                      {ts.fullReport}
                    </button>
                  </motion.div>

                  {/* Download PDF — opens the server-rendered printable report in a new tab.
                      The report page has a print stylesheet so the user can Ctrl+P → Save as PDF.
                      If scanId is not yet available (scan not saved to DB), fall back to window.print(). */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {result.scanId ? (
                      <a
                        href={`/api/scan/report?id=${result.scanId}&download=1`}
                        rel="noopener"
                        download={`aifa-report-${result.scanId}.html`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/15 rounded-lg text-xs font-semibold text-gray-300 hover:border-white/30 hover:text-white transition-all cursor-pointer"
                        title={ts.downloadPdf}
                      >
                        <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                        {ts.downloadPdf}
                      </a>
                    ) : (
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/15 rounded-lg text-xs font-semibold text-gray-300 hover:border-white/30 hover:text-white transition-all cursor-pointer"
                        title={ts.downloadPdf}
                      >
                        <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                        {ts.downloadPdf}
                      </button>
                    )}
                  </motion.div>

                  {/* Печатный отчёт по номеру проверки.
                      Сам отчёт был готов давно, но попасть в него можно было
                      только вручную набрав адрес: номер проверки печатался
                      строкой в терминале, и никакой кнопки на экране не было.
                      Отчёт собирается сервером из сохранённой записи, поэтому
                      правкой адресной строки его не подделать. */}
                  {result.scanId && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <a
                        href={`/api/scan/report?id=${result.scanId}&print=1`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-400/60 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg text-xs font-bold text-white hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                      >
                        <FileText className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                        {locale === 'ru'
                          ? '📄 Официальный PDF-отчёт'
                          : locale === 'es'
                            ? '📄 Informe Oficial PDF'
                            : locale === 'zh'
                              ? '📄 官方 PDF 审计报告'
                              : '📄 Official PDF Audit Report'}
                      </a>
                    </motion.div>
                  )}

                  {/* Проверить заново, минуя суточный кэш.
                      Отчёт хранится сутки — это и есть повторяемость, за
                      которую платит клиент. Но человек, который ТОЛЬКО ЧТО
                      починил сайт, хочет увидеть результат сейчас, а не
                      завтра. Раньше обойти кэш можно было лишь обращением к
                      API напрямую, то есть никак для обычного человека. */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => initiateScan(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/15 rounded-lg text-xs font-semibold text-gray-300 hover:border-white/30 hover:text-white transition-all cursor-pointer"
                      title={
                        locale === 'ru' ? 'Разобрать сайт заново, не дожидаясь суток' : locale === 'es' ? 'Volver a analizar el sitio ahora, sin esperar a la caché de 24 horas' : locale === 'zh' ? '立即重新分析网站，无需等待 24 小时缓存' : 'Re-analyse the site now, bypassing the 24-hour cache'
                      }
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      {locale === 'ru'
                        ? 'Проверить заново'
                        : locale === 'es'
                          ? 'Volver a analizar'
                          : locale === 'zh'
                            ? '重新检测'
                            : 'Re-scan now'}
                    </button>
                  </motion.div>

                  {/* Подтверждение подлинности по номеру: то, что клиент
                      покажет партнёру или страховщику, если ему не поверят. */}
                  {result.scanId && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <a
                        href={`/audit-verify?id=${result.scanId}`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/15 rounded-lg text-xs font-semibold text-gray-300 hover:border-white/30 hover:text-white transition-all cursor-pointer"
                        title={result.scanId}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                        {locale === 'ru'
                          ? 'Подтвердить подлинность'
                          : locale === 'es'
                            ? 'Verificar autenticidad'
                            : locale === 'zh'
                              ? '验证真实性'
                              : 'Verify authenticity'}
                      </a>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Lead capture form */}
            <div
              id="lead-capture-form"
              className="px-5 py-6 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-black/30 border-t border-b border-white/6 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-white/[0.01] pointer-events-none" />
              <div className="max-w-md mx-auto relative z-10 text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {formTranslations[locale]?.title || formTranslations.en.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  {formTranslations[locale]?.description || formTranslations.en.description}
                </p>

                {leadState === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2 py-4 text-emerald-400"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    <p className="text-sm font-semibold">
                      {formTranslations[locale]?.successMessage || formTranslations.en.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={formTranslations[locale]?.emailPlaceholder || formTranslations.en.emailPlaceholder}
                        disabled={leadState === 'sending'}
                        className="flex-1 px-4 py-2.5 bg-black/40 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 focus:border-cyan-500/30 transition-all disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={leadState === 'sending'}
                        className="keep-dark btn-neon px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-bold rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer flex items-center justify-center min-w-[120px] disabled:opacity-50"
                      >
                        {leadState === 'sending' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          formTranslations[locale]?.buttonText || formTranslations.en.buttonText
                        )}
                      </button>
                    </div>

                    <label className="flex items-start gap-2.5 text-left text-[13px] text-gray-400 cursor-pointer select-none max-w-md mx-auto group">
                      <input
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 shrink-0 rounded border-white/10 bg-black/40 text-cyan-500 focus:ring-cyan-500/30 focus:ring-offset-black"
                      />
                      <span className="leading-snug group-hover:text-gray-300 transition-colors">
                        {formTranslations[locale]?.checkboxConsent || formTranslations.en.checkboxConsent}
                      </span>
                    </label>

                    {leadState === 'error' && (
                      <p className="text-xs text-red-400 mt-2">
                        {locale === 'ru'
                          ? 'Произошла ошибка при отправке. Пожалуйста, попробуйте снова.'
                          : locale === 'es'
                          ? 'Se ha producido un error al enviar el formulario. Por favor, inténtelo de nuevo.'
                          : locale === 'zh'
                          ? '提交时发生错误，请重试。'
                          : 'An error occurred. Please try again.'}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* ── 1-Click Accessibility Patch (CSS / JS) ─────────────────────────── */}
            {result && result.allThreats && result.allThreats.length > 0 && generatedPatch && (
              <div className="border-t border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 via-black/40 to-black/60 p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <Zap className="w-3.5 h-3.5" aria-hidden="true" />
                      {locale === 'ru' ? 'Временная мера' : locale === 'es' ? 'Medida temporal' : locale === 'zh' ? '临时措施' : 'Temporary measure'}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      {locale === 'ru' 
                        ? '⚡ 1-Click патч клавиатурного доступа (CSS / JS)' 
                        : locale === 'es'
                        ? '⚡ Parche 1-Clic de acceso por teclado (CSS / JS)'
                        : locale === 'zh'
                        ? '⚡ 一键键盘访问补丁 (CSS / JS)'
                        : '⚡ 1-Click Keyboard Access Patch (CSS / JS)'}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 max-w-xl leading-relaxed">
                      {locale === 'ru'
                        ? 'Делает видимым фокус клавиатуры (:focus-visible), добавляет ссылку «Перейти к основному содержимому» и закрывает открытое окно по Escape, если у окна есть кнопка «Закрыть». Это временная мера: найденные нарушения в коде сайта патч не устраняет и соответствия WCAG, ADA или EAA не даёт.'
                        : locale === 'es'
                        ? 'Hace visible el foco del teclado (:focus-visible), añade un enlace para saltar al contenido principal y cierra el diálogo abierto con Escape si tiene un botón «Cerrar». Es una medida temporal: no corrige las infracciones encontradas en el código del sitio ni aporta conformidad con WCAG, ADA o EAA.'
                        : locale === 'zh'
                        ? '让键盘焦点可见 (:focus-visible)，添加“跳转到主要内容”链接；已打开的对话框若有“关闭”按钮，按 Esc 即可关闭。这只是临时措施：补丁不会修复网站代码中发现的问题，也不能使网站符合 WCAG、ADA 或 EAA。'
                        : 'Makes keyboard focus visible (:focus-visible), adds a "Skip to main content" link and closes an open dialog on Escape if it has a Close button. It is a temporary measure: it does not fix the findings in your site\'s code and does not make the site conform to WCAG, the ADA or the EAA.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-400 mt-2 font-mono">
                      <span className="text-cyan-400">
                        CSS: {(generatedPatch.summary.cssBytes / 1024).toFixed(1)} КБ ({generatedPatch.summary.cssBytes} B)
                      </span>
                      <span>•</span>
                      <span className="text-purple-400">
                        JS: {(generatedPatch.summary.jsBytes / 1024).toFixed(1)} КБ ({generatedPatch.summary.jsBytes} B)
                      </span>
                      <span>•</span>
                      <span>
                        {locale === 'ru'
                          ? `Всего: ${(generatedPatch.summary.totalBytes / 1024).toFixed(1)} КБ (${generatedPatch.summary.techniquesCount} приёмов)`
                          : locale === 'es'
                          ? `Total: ${(generatedPatch.summary.totalBytes / 1024).toFixed(1)} KB (${generatedPatch.summary.techniquesCount} técnicas)`
                          : locale === 'zh'
                          ? `总大小：${(generatedPatch.summary.totalBytes / 1024).toFixed(1)} KB（${generatedPatch.summary.techniquesCount} 种技术）`
                          : `Total: ${(generatedPatch.summary.totalBytes / 1024).toFixed(1)} KB (${generatedPatch.summary.techniquesCount} techniques)`}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={`/api/scan/patch?id=${result.scanId || ''}&type=css`}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      .CSS
                    </a>
                    <a
                      href={`/api/scan/patch?id=${result.scanId || ''}&type=js`}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      .JS
                    </a>
                    <a
                      href={`/api/scan/fixpack?id=${result.scanId || ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:text-white transition-all cursor-pointer"
                    >
                      <span>📦</span>
                      <span>
                        {locale === 'ru'
                          ? 'Превью пакета исправлений'
                          : locale === 'es'
                          ? 'Vista previa del paquete de correcciones'
                          : locale === 'zh'
                          ? '修复包预览'
                          : 'Fixpack Preview'}
                      </span>
                    </a>
                  </div>
                </div>

                {/* Patch Tabs */}
                <div className="flex items-center gap-2 border-b border-white/10 mb-3 overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setActivePatchTab('css')}
                    className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activePatchTab === 'css' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                  >
                    CSS ({locale === 'ru' ? 'Фокус и стили' : locale === 'es' ? 'Foco y estilos' : locale === 'zh' ? '焦点与样式' : 'Focus & Styles'})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePatchTab('js')}
                    className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activePatchTab === 'js' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                  >
                    JS ({locale === 'ru' ? 'Инжектор skip-link' : locale === 'es' ? 'Inyector de salto' : locale === 'zh' ? '跳转注入器' : 'Skip-link injector'})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePatchTab('embed')}
                    className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activePatchTab === 'embed' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                  >
                    HTML Embed ({locale === 'ru' ? 'Всё в одном' : locale === 'es' ? 'Todo en uno' : locale === 'zh' ? '整合代码' : 'All-in-one'})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePatchTab('guide')}
                    className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${activePatchTab === 'guide' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                  >
                    {locale === 'ru' ? 'Инструкция по установке' : locale === 'es' ? 'Guía de instalación' : locale === 'zh' ? '部署指南' : 'Install Guide'}
                  </button>
                </div>

                {/* Tab Content */}
                {activePatchTab === 'guide' ? (
                  <div className="bg-black/60 rounded-xl p-4 border border-white/10 text-xs text-gray-300 space-y-3">
                    <div>
                      <b className="text-white block mb-1">WordPress / WooCommerce:</b>
                      <span className="text-gray-400">
                        {locale === 'ru' 
                          ? 'Вставьте CSS в раздел «Внешний вид → Настроить → Дополнительные стили», а JS добавьте в footer.php перед </body> или через плагин «Insert Headers and Footers».'
                          : locale === 'es'
                          ? 'Pegue el CSS en «Apariencia → Personalizar → CSS adicional» y agregue el JS a footer.php antes de </body> o mediante un plugin de encabezados y pies de página.'
                          : locale === 'zh'
                          ? '将 CSS 粘贴至“外观 → 自定义 → 额外 CSS”，并将 JS 片段添加至 footer.php 的 </body> 标签前或通过插件注入。'
                          : 'Paste the CSS into "Appearance → Customize → Additional CSS", and add JS snippet to footer.php before </body> or via a header/footer injection plugin.'}
                      </span>
                    </div>
                    <div>
                      <b className="text-white block mb-1">Shopify:</b>
                      <span className="text-gray-400">
                        {locale === 'ru'
                          ? 'Вставьте HTML Embed в theme.liquid перед тегом </head>.'
                          : locale === 'es'
                          ? 'Pegue el fragmento HTML Embed en theme.liquid antes de la etiqueta </head>.'
                          : locale === 'zh'
                          ? '将 HTML Embed 代码片段粘贴到 theme.liquid 中的 </head> 标签前。'
                          : 'Paste the HTML Embed snippet into theme.liquid before the </head> tag.'}
                      </span>
                    </div>
                    <div>
                      <b className="text-white block mb-1">Webflow / Custom HTML:</b>
                      <span className="text-gray-400">
                        {locale === 'ru'
                          ? 'Вставьте код во вкладку «Custom Code → Footer Code» в настройках проекта.'
                          : locale === 'es'
                          ? 'Pegue el código en la pestaña «Custom Code → Footer Code» en la configuración del proyecto.'
                          : locale === 'zh'
                          ? '将代码粘贴到项目设置中的“Custom Code → Footer Code”区域。'
                          : 'Paste code into "Project Settings → Custom Code → Footer Code".'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <pre className="bg-black/80 text-cyan-300 font-mono text-xs p-4 rounded-xl border border-white/10 overflow-x-auto max-h-56 leading-relaxed select-all">
                      {activePatchTab === 'css' ? generatedPatch.css : activePatchTab === 'js' ? generatedPatch.js : generatedPatch.embedHtml}
                    </pre>
                    <button
                      type="button"
                      onClick={() => {
                        const textToCopy = activePatchTab === 'css' ? generatedPatch.css : activePatchTab === 'js' ? generatedPatch.js : generatedPatch.embedHtml;
                        navigator.clipboard.writeText(textToCopy);
                        setCopiedPatch(activePatchTab);
                        setTimeout(() => setCopiedPatch(null), 2500);
                      }}
                      className="absolute top-3 right-3 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-all flex items-center gap-1.5 shadow-lg"
                    >
                      {copiedPatch === activePatchTab ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">
                            {locale === 'ru' ? 'Скопировано!' : locale === 'es' ? '¡Copiado!' : locale === 'zh' ? '已复制！' : 'Copied!'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>
                            {locale === 'ru' ? 'Копировать' : locale === 'es' ? 'Copiar' : locale === 'zh' ? '复制' : 'Copy'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Commercial Upsell Banner */}
                <div className="mt-4 p-3.5 rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 to-cyan-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-gray-300 leading-relaxed">
                    <b className="text-purple-300">
                      {locale === 'ru' ? '🛡️ Нужно исправить причины?' : locale === 'es' ? '🛡️ ¿Hay que corregir las causas?' : locale === 'zh' ? '🛡️ 需要修复根本原因？' : '🛡️ Need the causes fixed?'}
                    </b>{' '}
                    <span className="text-gray-400">
                      {locale === 'ru'
                        ? 'Патч помогает клавиатуре, но нарушения остаются в шаблонах сайта. Исправим их в коде и перепроверим:'
                        : locale === 'es'
                        ? 'El parche ayuda al teclado, pero las infracciones siguen en las plantillas del sitio. Las corregimos en el código y volvemos a verificar:'
                        : locale === 'zh'
                        ? '补丁有助于键盘用户，但问题仍在网站模板中。我们在代码中修复并重新检测：'
                        : 'The patch helps keyboard users, but the violations remain in your templates. We fix them in the code and re-scan:'}
                    </span>
                  </div>
                  <Link
                    href="/compliance-audit"
                    className="shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all flex items-center gap-1"
                  >
                    <span>{locale === 'ru' ? 'Заказать исправление' : locale === 'es' ? 'Solicitar corrección' : locale === 'zh' ? '预约修复' : 'Order the fix'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* ── Dossier — grouped by category ─────────────────────────────────── */}
            {Object.keys(threatsByCategory).length > 0 && (
              <div className="border-t border-white/6">
                {/* Dossier header */}
                <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/6">
                  <p className="text-[13px] font-mono font-semibold text-gray-400 uppercase tracking-widest">
                    <span className="text-red-400">▶</span> VIOLATION DOSSIER — {result.totalIssues} ACTIVE FAILURES
                    {result.fallback && (
                      <span className="ml-2 text-[13px] text-yellow-500/70 normal-case tracking-normal font-normal">
                        (эвристический режим — разбор AIfa недоступен)
                      </span>
                    )}
                  </p>
                </div>

                <div className="max-h-[700px] overflow-y-auto">
                  {Object.entries(threatsByCategory).map(([cat, threats]) => {
                    const своиЗаконы = cat === ГРУППА_СВОЙ_ЗАКОН;
                    const color = своиЗаконы ? 'emerald' : (CATEGORY_COLORS[cat as Category] ?? 'cyan');
                    const law = своиЗаконы ? undefined : activeLawMeta[cat as Category];
                    const isOpen = openCategories.has(cat);

                    return (
                      <div key={cat} className="border-b border-white/6 last:border-0">
                        {/* Category header — clickable */}
                        <button
                          onClick={() => toggleCategory(cat)}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${CAT_BG[color]} ${CAT_TEXT[color]}`}>
                              {своиЗаконы ? (НАДПИСЬ_СВОЙ_ЗАКОН[locale] ?? НАДПИСЬ_СВОЙ_ЗАКОН.en) : cat}
                            </span>
                            <div className="text-left min-w-0">
                              {law && (
                              <a
                                href={law?.lawUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`text-xs font-medium ${CAT_TEXT[color]} hover:underline underline-offset-2 inline-flex items-center gap-1 transition-colors`}
                              >
                                {law?.lawName.split('—')[0].trim()}
                                <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" aria-hidden="true" />
                              </a>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[13px] font-mono text-red-400 font-semibold">
                              {threats.length} violation{threats.length !== 1 ? 's' : ''}
                            </span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                              aria-hidden="true"
                            />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.18 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 space-y-3">
                                {/* Category fine summary */}
                                {law && (
                                  <div className={`rounded-lg px-3 py-2 border ${CAT_BG[color]}`}>
                                    <span className="text-[13px] text-gray-400 uppercase tracking-widest font-semibold">Max Penalty: </span>
                                    <span className={`text-xs font-mono font-bold ${CAT_TEXT[color]}`}>{law.fineAmount}</span>
                                  </div>
                                )}
                                {threats.map((threat) => (
                                  <ThreatCard key={threat.id} threat={threat} />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom CTA */}
                <div className="px-4 py-3 border-t border-white/6 text-center bg-white/[0.01]">
                  <Link
                    href="/compliance-audit"
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors hover:underline underline-offset-2"
                  >
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    {НАДПИСЬ_РЕЕСТРА[язык_]}
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      <p className="mt-4 text-[13px] text-gray-400 text-center leading-relaxed max-w-2xl mx-auto px-4 print:hidden">
        {ts.disclaimer}
      </p>

      {/* Developer API Documentation Accordion */}
      <div className="mt-6 w-full max-w-2xl mx-auto border border-white/8 bg-white/[0.01] rounded-xl p-4 print:hidden">
        <button
          onClick={() => setShowApiDocs(!showApiDocs)}
          className="flex items-center justify-between w-full text-xs text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider transition-colors"
        >
          <span>{locale === 'ru' ? '▶ API Разработчика (CORS-Интеграция)' : locale === 'es' ? '▶ API para Desarrolladores (CORS)' : locale === 'zh' ? '▶ 开发者 API (CORS集成)' : '▶ Developer API (CORS Integration)'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showApiDocs ? 'rotate-180' : ''}`} />
        </button>

        {showApiDocs && (
          <div className="mt-4 text-left space-y-3">
            <p className="text-xs text-gray-400 leading-relaxed">
              {locale === 'ru' 
                ? 'Наш сканер соответствия предоставляет открытый CORS-совместимый эндпоинт для автоматизации аудитов в CI/CD или интеграции в ваши панели управления.' 
                : locale === 'es' 
                ? 'Nuestra API proporciona un endpoint público con CORS habilitado para automatizar auditorías en CI/CD.' 
                : locale === 'zh' 
                ? '我们的合规性扫描器提供公共且支持 CORS 的端点，用于在 CI/CD 或您的仪表板中自动化审计。' 
                : 'Our compliance scanner provides a public, CORS-enabled endpoint for automating audits in CI/CD or integrating into your custom dashboards.'}
            </p>
            <div className="space-y-1">
              <span className="text-[13px] font-mono text-gray-400 uppercase tracking-widest font-semibold">Endpoint</span>
              <div className="bg-black/60 rounded-lg p-2 font-mono text-[13px] text-cyan-400 border border-white/5 break-all">
                POST https://aifa.works/api/scan
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[13px] font-mono text-gray-400 uppercase tracking-widest font-semibold">cURL Request</span>
              <div className="bg-black/60 rounded-lg p-2.5 font-mono text-[13px] text-emerald-400 border border-white/5 overflow-x-auto whitespace-pre leading-relaxed" tabIndex={0}>
{`curl -X POST https://aifa.works/api/scan \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "locale": "${locale}",
    "scanSitemap": false
  }'`}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[13px] font-mono text-gray-400 uppercase tracking-widest font-semibold">Response Payload</span>
              <div className="bg-black/60 rounded-lg p-2.5 font-mono text-[13px] text-gray-400 border border-white/5 overflow-x-auto whitespace-pre leading-relaxed">
{`{
  "score": 1950,
  "totalIssues": 2,
  "allThreats": [
    {
      "id": 1,
      "code": "ADA-001",
      "category": "WCAG 2.1 AA",
      "severity": "critical",
      "title": "Missing Image Alt Attributes",
      "evidence": "3 images found without alt...",
      "violatingHtml": "<img src=\\"banner.jpg\\">"
    }
  ]
}`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Оформление переехало в ThreatScanner.css */}
    </>
  );
}
