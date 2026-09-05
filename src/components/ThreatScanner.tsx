'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanLine, Shield, AlertTriangle, CheckCircle2, Loader2,
  ExternalLink, ChevronDown, RotateCcw, DollarSign, Printer,
  FileText, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { getLawMeta, CATEGORY_COLORS, type Category } from '../data/threatMatrix';
import { ТЕКСТЫ_УГРОЗ, НАДПИСЬ_РЕЕСТРА, type ЯзыкКодСканера } from '../app/accessibility/словарь';
import type { FoundThreat, ScanResponse } from '../app/api/scan/route';
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

function calculateGrade(score: number): { letter: string; color: string; bg: string } {
  if (score >= 1950) return { letter: 'A+', color: 'text-emerald-400 border-emerald-400/30', bg: 'bg-emerald-500/10' };
  if (score >= 1800) return { letter: 'A', color: 'text-teal-400 border-teal-400/30', bg: 'bg-teal-500/10' };
  if (score >= 1600) return { letter: 'B', color: 'text-cyan-400 border-cyan-400/30', bg: 'bg-cyan-500/10' };
  if (score >= 1400) return { letter: 'C', color: 'text-yellow-400 border-yellow-400/30', bg: 'bg-yellow-500/10' };
  if (score >= 1000) return { letter: 'D', color: 'text-orange-400 border-orange-400/30', bg: 'bg-orange-500/10' };
  return { letter: 'F', color: 'text-red-400 border-red-400/30', bg: 'bg-red-500/10' };
}

interface ThreatCardProps { threat: FoundThreat; }

function ThreatCard({ threat }: ThreatCardProps) {
  const { locale } = useLanguage();
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
              Добавлено 22.08.2026. Из 2000 правил 73 описывают то, чего в
              ответе сайта нет физически: «политика ИБ, ежегодно
              пересматриваемая руководством» (ISO27-001), «серверные журналы
              не показывают следов IDS» (SOC2P-001), процедуры найма, реестры
              инцидентов. Выдавать их за проверенные — значит обесценить
              остальные 1927, которые проверены по-настоящему.
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
        <span className="text-xs font-mono font-bold text-red-400 shrink-0">
          {shortenFine(threat.fineAmount)}
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
          <div className="overflow-x-auto rounded-lg bg-black/40 border border-white/5 p-2.5 font-mono text-[13px] text-cyan-300/90 leading-relaxed whitespace-pre-wrap break-all">
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
                <li key={idx} className="marker:text-cyan-500/70 marker:font-mono">
                  <span className="pl-1 text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
            {advice.codeFix && (
              <div className="mt-3 space-y-1">
                <p className="text-[13px] text-gray-400 uppercase tracking-widest font-semibold">Suggested Fix</p>
                <div className="overflow-x-auto rounded-lg bg-black/60 border border-white/5 p-2.5 font-mono text-[13px] text-emerald-400 leading-relaxed whitespace-pre-wrap">
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
  const { locale } = useLanguage();
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
  const totalExposure = useMemo(() => {
    if (!result?.allThreats) return 0;
    return result.allThreats.reduce((sum, t) => sum + parseMaxFine(t.fineAmount), 0);
  }, [result]);

  const threatsByCategory = useMemo(() => {
    if (!result?.allThreats) return {} as Record<string, FoundThreat[]>;
    return result.allThreats.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = [];
      acc[t.category].push(t);
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
    const checks = [
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
    ];
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
      addLine(`> AIFA АНАЛИЗИРУЕТ…`, 80);

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
            `  [${(SEV_LABEL[issue.severity] ?? issue.severity.toUpperCase())}]  ${issue.code}  |  ${issue.title}  |  Penalty: ${shortenFine(issue.fineAmount)}`,
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
      <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-[#0a0f1a] overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.06)]">

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
                    <div className="text-xl font-black text-red-400 tabular-nums">{formatExposure(totalExposure)}</div>
                    {/* Это сумма МАКСИМАЛЬНЫХ штрафов, предусмотренных законами,
                        а не прогноз наших потерь. Подавать её как «ваш риск в
                        долларах» было бы запугиванием — подписываем честно. */}
                    <div className="text-[13px] text-gray-400">
                      {locale === 'ru'
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

                  {/* Print to PDF */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-white/15 rounded-lg text-xs font-semibold text-gray-300 hover:border-white/30 hover:text-white transition-all cursor-pointer"
                      title={ts.downloadPdf}
                    >
                      <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                      {ts.downloadPdf}
                    </button>
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
                        href={`/api/scan/report?id=${result.scanId}`}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-cyan-400/40 bg-cyan-400/10 rounded-lg text-xs font-semibold text-cyan-300 hover:border-cyan-400/70 hover:text-cyan-200 transition-all cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                        {locale === 'ru'
                          ? 'Отчёт для аудитора'
                          : locale === 'es'
                            ? 'Informe para el auditor'
                            : locale === 'zh'
                              ? '审计报告'
                              : 'Auditor report'}
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
                        locale === 'ru'
                          ? 'Разобрать сайт заново, не дожидаясь суток'
                          : 'Re-analyse the site now, bypassing the 24-hour cache'
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
                    const color = CATEGORY_COLORS[cat as Category] ?? 'cyan';
                    const law = activeLawMeta[cat as Category];
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
                              {cat}
                            </span>
                            <div className="text-left min-w-0">
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
              <div className="bg-black/60 rounded-lg p-2.5 font-mono text-[13px] text-emerald-400 border border-white/5 overflow-x-auto whitespace-pre leading-relaxed">
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
