/**
 * AIfaFocus Personal Fixpack Engine (lib/aifafocus-fixpack.ts)
 * 
 * Персональный пакет исправлений для доказанных находок сайта:
 * 1. Карточка для каждого доказанного нарушения
 * 2. Код находки и критерий WCAG / технический стандарт
 * 3. Точный фрагмент из evidence (то, что сканер реально достал с сервера)
 * 4. «Что не так» — одной фразой
 * 5. Готовый исправленный фрагмент для шаблона (где исправление однозначно)
 * 6. Пометка «Впишите сами» без выдуманных текстов (где нужен человеческий смысл)
 * 7. Поддержка глубоких проверок до 25 страниц с указанием конкретной страницы
 * 8. Повторная проверка через 14 дней: сравнение с прошлой проверкой того же сайта
 *    (что исправлено, что осталось, что появилось нового)
 * 9. Представительский печатный HTML (A4 / PDF) и структурированный JSON на 4 языках (RU, EN, ES, ZH)
 * 10. Никаких цен в интерфейсе (ценовую политику решает Архитектор)
 */

function sanitizeDomainForComment(domain: string): string {
  const sanitized = String(domain || '')
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '');
  return sanitized || 'example.com';
}

export interface FixpackFindingInput {
  id?: number | string;
  code: string;
  title: string;
  evidence: string;
  proven?: boolean;
  isHypothesis?: boolean;
  severity?: string;
  violatingHtml?: string;
  lawName?: string;
  lawUrl?: string;
  page?: string;
  url?: string;
  pageUrl?: string;
  selector?: string;
  outerHtml?: string;
}

export interface FixpackItem {
  id: string;
  code: string;
  wcagOrStandard: string;
  title: string;
  issueSummary: string;
  evidenceFragment: string;
  fixType: 'code_snippet' | 'manual_input';
  targetLocation: string;
  fixedSnippet: string;
  explanation: string;
  manualGuidance?: string;
  page?: string;
  pageUrl?: string;
  selector?: string;
  outerHtml?: string;
  isHypothesis?: boolean;
  comparisonStatus?: 'new' | 'retained' | 'initial';
}

export interface FixpackComparison {
  previousScanId: string;
  previousScanDate: string;
  daysAgo: number;
  fixedCodes: Array<{ code: string; title: string }>;
  newCodes: Array<{ code: string; title: string }>;
  retainedCodes: Array<{ code: string; title: string }>;
}

export interface FixpackSummary {
  scanId: string;
  domain: string;
  locale: string;
  totalFindings: number;
  cardsCount: number;
  codeSnippetsCount: number;
  manualInputsCount: number;
  scannedPagesCount: number;
  scannedPages: string[];
  comparedToPrevious?: FixpackComparison | null;
  isPreview?: boolean;
  isFullPack?: boolean;
  lockedCount?: number;
  lockedTitles?: Array<{ code: string; title: string }>;
}

export interface GeneratedFixpack {
  summary: FixpackSummary;
  items: FixpackItem[];
  htmlView: string;
}

/**
 * Расчет относительной яркости по WCAG 2.1
 */
function srgbLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((c) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Расчет коэффициента контрастности WCAG 2.1
 */
export function calculateWcagContrast(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = srgbLuminance(...rgb1);
  const l2 = srgbLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Подбор ближайшего контрастного цвета (>= 4.5:1) к фону
 */
export function findAccessibleColor(
  fgHex: string,
  bgHex: string,
  targetContrast = 4.5
): { fgAdjusted: string; contrast: number } {
  const parseHex = (hex: string): [number, number, number] => {
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  const toHex = (rgb: [number, number, number]): string =>
    '#' + rgb.map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, '0')).join('').toUpperCase();

  const fgRgb = parseHex(fgHex);
  const bgRgb = parseHex(bgHex);
  const currentRatio = calculateWcagContrast(fgRgb, bgRgb);
  if (currentRatio >= targetContrast) {
    return { fgAdjusted: toHex(fgRgb), contrast: Math.round(currentRatio * 100) / 100 };
  }

  const bgLum = srgbLuminance(...bgRgb);
  const towardsBlack = bgLum > 0.4;
  let bestRgb: [number, number, number] = [...fgRgb];

  for (let step = 1; step <= 255; step++) {
    const factor = step / 255;
    const testRgb: [number, number, number] = [
      Math.max(0, Math.min(255, Math.round(towardsBlack ? fgRgb[0] * (1 - factor) : fgRgb[0] + (255 - fgRgb[0]) * factor))),
      Math.max(0, Math.min(255, Math.round(towardsBlack ? fgRgb[1] * (1 - factor) : fgRgb[1] + (255 - fgRgb[1]) * factor))),
      Math.max(0, Math.min(255, Math.round(towardsBlack ? fgRgb[2] * (1 - factor) : fgRgb[2] + (255 - fgRgb[2]) * factor))),
    ];
    const testRatio = calculateWcagContrast(testRgb, bgRgb);
    if (testRatio >= targetContrast) {
      bestRgb = testRgb;
      break;
    }
  }

  const finalHex = toHex(bestRgb);
  const finalRgb = parseHex(finalHex);
  const finalContrast = calculateWcagContrast(finalRgb, bgRgb);

  return { fgAdjusted: finalHex, contrast: Math.round(finalContrast * 100) / 100 };
}

/**
 * Локализованные словари для карточек и отчёта фикспака (4 языка)
 */
const I18N = {
  ru: {
    snippetBadge: 'ГОТОВЫЙ КОД',
    manualBadge: 'ТРЕБУЕТСЯ ВПИСАТЬ',
    copy: 'Копировать фрагмент',
    copied: 'Скопировано',
    target: 'Где применить:',
    evidence: 'Зафиксировано сканером (evidence):',
    explanation: 'Почему это исправляет проблему:',
    manualNote: 'Указание автору:',
    headerTitle: 'Персональный пакет исправлений для шаблонов',
    headerDesc: 'Точные фрагменты кода и предписания для устранения доказанных барьеров сайта. Без выдуманных текстов.',
    allTab: 'Все карточки',
    snippetsTab: 'Готовые фрагменты',
    manualTab: 'Требуют человеческого ввода',
    domainLabel: 'Домен:',
    scanIdLabel: 'ID проверки:',
    printBtn: 'Печать / Сохранить в PDF',
    printHint: 'Оптимизировано для печати на листах формата A4. Нажмите кнопку или Ctrl+P.',
    pagesCovered: 'Охват проверки:',
    pagesWord: (n: number) => `${n} ${n === 1 ? 'страница' : n < 5 ? 'страницы' : 'страниц'}`,
    comparisonTitle: 'Динамика устранения нарушений (Повторный аудит)',
    comparisonSubtitle: (d: number, id: string) => `Сравнение с аудитом № ${id} (${d} дн. назад):`,
    fixedHeader: 'Исправлено в коде шаблонов:',
    newHeader: 'Новые обнаруженные барьеры:',
    retainedHeader: 'Осталось исправить:',
    initialScanNotice: 'Первичный аудит сайта. При повторной проверке через 14 дней в этом блоке автоматически появится протокол динамики: какие барьеры устранены, какие остались и появились ли новые дефекты.',
    pageBadge: 'Страница:',
    newBadge: 'НОВОЕ',
    retainedBadge: 'ПОВТОРНОЕ',
    hypothesisBadge: 'предположение — требует подтверждения',
    verifyLinkText: 'Проверить в реестре проверок',
    totalCardsLabel: 'Всего карточек:',
    readySnippetsLabel: 'Готовых фрагментов:',
    manualInputsLabel: 'Требуют заполнения:',
    lockedTitle: (n: number) => `Ещё ${n} исправлений в полном пакете`,
    lockedDesc: 'В превью-версии показаны первые 2 решения. Полный пакет включает готовые сниппеты, конфигурации безопасности и персональные инструкции для всех найденных дефектов.',
    ctaBuyPack: 'Получить полный пакет — $99',
  },
  en: {
    snippetBadge: 'READY CODE SNIPPET',
    manualBadge: 'MANUAL INPUT NEEDED',
    copy: 'Copy Snippet',
    copied: 'Copied',
    target: 'Where to apply:',
    evidence: 'Detected by scanner (evidence):',
    explanation: 'Why this fixes the issue:',
    manualNote: 'Guidance for author:',
    headerTitle: 'Personal Template Fixpack',
    headerDesc: 'Exact template code snippets and remediation instructions for proven site findings. No invented texts.',
    allTab: 'All Cards',
    snippetsTab: 'Ready Code Snippets',
    manualTab: 'Requires Human Input',
    domainLabel: 'Domain:',
    scanIdLabel: 'Scan ID:',
    printBtn: 'Save as PDF / Print',
    printHint: 'Optimized for standard A4 document printing. Press Ctrl+P or click the button.',
    pagesCovered: 'Audit Coverage:',
    pagesWord: (n: number) => `${n} page${n === 1 ? '' : 's'}`,
    comparisonTitle: 'Re-Scan Remediation Dynamics (Progress Tracking)',
    comparisonSubtitle: (d: number, id: string) => `Compared to audit #${id} (${d} days ago):`,
    fixedHeader: 'Resolved in Template Code:',
    newHeader: 'New Barriers Detected:',
    retainedHeader: 'Still Pending Remediation:',
    initialScanNotice: 'Baseline site audit. Upon repeat audit in 14 days, this section will automatically display the remediation log: which barriers were resolved, which remain, and any new regressions.',
    pageBadge: 'Page:',
    newBadge: 'NEW',
    retainedBadge: 'PENDING',
    hypothesisBadge: 'hypothesis — requires confirmation',
    verifyLinkText: 'Verify in Registry',
    totalCardsLabel: 'Total Cards:',
    readySnippetsLabel: 'Ready Snippets:',
    manualInputsLabel: 'Requires Input:',
    lockedTitle: (n: number) => `${n} More Fixes in Full Pack`,
    lockedDesc: 'The preview edition includes the first 2 solutions. The full pack provides drop-in snippets, security headers, and personalized instructions for all detected issues.',
    ctaBuyPack: 'Get Full Pack — $99',
  },
  es: {
    snippetBadge: 'CÓDIGO LISTO',
    manualBadge: 'REQUIERE TEXTO MANUAL',
    copy: 'Copiar fragmento',
    copied: 'Copiado',
    target: 'Dónde aplicar:',
    evidence: 'Detectado por el escáner (evidencia):',
    explanation: 'Por qué corrige el problema:',
    manualNote: 'Indicación para el autor:',
    headerTitle: 'Paquete personal de correcciones de plantillas',
    headerDesc: 'Fragmentos de código directos y plantillas exactas para resolver las barreras detectadas. Sin textos inventados.',
    allTab: 'Todas las tarjetas',
    snippetsTab: 'Fragmentos listos',
    manualTab: 'Requiere entrada manual',
    domainLabel: 'Dominio:',
    scanIdLabel: 'ID de análisis:',
    printBtn: 'Guardar como PDF / Imprimir',
    printHint: 'Optimizado para impresión en formato A4. Presione Ctrl+P o use el botón superior.',
    pagesCovered: 'Cobertura de análisis:',
    pagesWord: (n: number) => `${n} página${n === 1 ? '' : 's'}`,
    comparisonTitle: 'Dinámica de remediación del re-análisis (progreso)',
    comparisonSubtitle: (d: number, id: string) => `En comparación con la auditoría #${id} (hace ${d} días):`,
    fixedHeader: 'Corregido en el código de plantillas:',
    newHeader: 'Nuevas barreras detectadas:',
    retainedHeader: 'Pendiente de corrección:',
    initialScanNotice: 'Auditoría inicial del sitio. Tras el re-análisis en 14 días, esta sección mostrará automáticamente el registro de remediación: qué barreras se resolvieron, cuáles quedan y si hay nuevas regresiones.',
    pageBadge: 'Página:',
    newBadge: 'NUEVO',
    retainedBadge: 'PENDIENTE',
    hypothesisBadge: 'suposición — requiere confirmación',
    verifyLinkText: 'Verificar en el registro',
    totalCardsLabel: 'Total de tarjetas:',
    readySnippetsLabel: 'Fragmentos listos:',
    manualInputsLabel: 'Requiere entrada:',
    lockedTitle: (n: number) => `Otras ${n} correcciones en el paquete completo`,
    lockedDesc: 'La vista previa muestra las 2 primeras soluciones. El paquete completo incluye fragmentos de código, encabezados de seguridad e instrucciones para todos los defectos.',
    ctaBuyPack: 'Obtener paquete completo — $99',
  },
  zh: {
    snippetBadge: '可直接使用的代码片段',
    manualBadge: '需人工填写内容',
    copy: '复制片段',
    copied: '已复制',
    target: '应用位置：',
    evidence: '扫描器捕获证据：',
    explanation: '修复原理：',
    manualNote: '作者填写说明：',
    headerTitle: '专属网站模板修复包',
    headerDesc: '为已验证的问题提供直接可用的模板代码片段与修复模板。严禁虚构内容。',
    allTab: '全部卡片',
    snippetsTab: '直接可用代码',
    manualTab: '需人工填写',
    domainLabel: '域名：',
    scanIdLabel: '检测编号：',
    printBtn: '保存为 PDF / 打印',
    printHint: '专为标准 A4 页面排版优化。按 Ctrl+P 或点击上方按钮。',
    pagesCovered: '检测覆盖范围：',
    pagesWord: (n: number) => `${n} 个页面`,
    comparisonTitle: '复测修复动态（进展跟踪）',
    comparisonSubtitle: (d: number, id: string) => `与审计编号 #${id}（${d} 天前）对比：`,
    fixedHeader: '已在模板代码中修复：',
    newHeader: '新发现的无障碍违规：',
    retainedHeader: '仍待修复的问题：',
    initialScanNotice: '网站首次基线审计。在 14 天后进行复测时，此处将自动呈现修复进展日志：哪些问题已解决、哪些仍待修复以及是否存在新增缺陷。',
    pageBadge: '页面：',
    newBadge: '新增',
    retainedBadge: '既有',
    hypothesisBadge: '推测 — 需人工复核',
    verifyLinkText: '在注册表中查验',
    totalCardsLabel: '卡片总数：',
    readySnippetsLabel: '直接可用代码：',
    manualInputsLabel: '需人工填写：',
    lockedTitle: (n: number) => `完整包中还有 ${n} 项修复`,
    lockedDesc: '预览版仅显示前 2 项解决方案。完整包包含针对所有已发现缺陷的即插即用代码片段、安全配置及专属修复指南。',
    ctaBuyPack: '获取完整修复包 — $99',
  },
};

/**
 * Создает персональный пакет исправлений на основе находок сканера.
 * Поддерживает проверки до 25 страниц и сравнение с прошлым аудитом (14-day re-scan).
 */
export function generateFixpack(
  findings: FixpackFindingInput[],
  domain: string,
  scanId: string,
  locale = 'en',
  options?: {
    scannedPages?: string[];
    comparedToPrevious?: FixpackComparison | null;
    isTestDemo?: boolean;
    isPreview?: boolean;
  }
): GeneratedFixpack {
  const safeDomain = sanitizeDomainForComment(domain);
  const lang = (locale in I18N ? locale : 'en') as keyof typeof I18N;
  const t = I18N[lang];

  const scannedPages = options?.scannedPages && options.scannedPages.length > 0
    ? options.scannedPages
    : [safeDomain];
  const comparedToPrevious = options?.comparedToPrevious || null;
  const isTestDemo = options?.isTestDemo === true;

  const items: FixpackItem[] = [];

  for (let i = 0; i < findings.length; i++) {
    const f = findings[i];
    const code = (f.code || '').toUpperCase().trim();
    const evidence = f.evidence || '';
    const title = f.title || code;

    // Определение страницы/пути дефекта
    let page = f.page || f.url || '';
    if (!page && evidence) {
      const matchPage = evidence.match(/\[(?:страница|page|página|页面):\s*([^\]]+)\]/i);
      if (matchPage) page = matchPage[1].trim();
    }

    // Определение статуса в сравнении с прошлой проверкой
    let comparisonStatus: 'new' | 'retained' | 'initial' = 'initial';
    if (comparedToPrevious) {
      const isNew = comparedToPrevious.newCodes.some((x) => x.code === code);
      const isRetained = comparedToPrevious.retainedCodes.some((x) => x.code === code);
      if (isNew) comparisonStatus = 'new';
      else if (isRetained) comparisonStatus = 'retained';
    }

    const pageLocationPrefix = page ? `${page} · ` : '';

    // ── 1. A11Y-VIEWPORT-001 / Viewport scale restriction ──────────────────
    if (
      code === 'A11Y-VIEWPORT-001' ||
      evidence.toLowerCase().includes('maximum-scale') ||
      evidence.toLowerCase().includes('user-scalable=no')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'A11Y-VIEWPORT-001',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 1.4.4 Resize Text (AA)',
        title: lang === 'ru' ? 'Снятие запрета на масштабирование страницы' : 'Allow Page Zooming in Viewport',
        issueSummary:
          lang === 'ru'
            ? 'Параметр maximum-scale=1 или user-scalable=no блокирует увеличение страницы пользователем.'
            : 'The maximum-scale=1 or user-scalable=no parameter prevents users from zooming the page.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}<head> HTML-шаблона сайта`,
        fixedSnippet: `<!-- Замените существующий тег meta viewport в секции <head>: -->\n<meta name="viewport" content="width=device-width, initial-scale=1">`,
        explanation:
          lang === 'ru'
            ? 'Удаление maximum-scale и user-scalable позволяет слабовидящим пользователям увеличивать текст жестом или средствами браузера до 200% без потери функциональности.'
            : 'Removing maximum-scale and user-scalable allows low-vision users to zoom text up to 200% as required by WCAG 1.4.4.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 2. SEC-CSP-001 / Missing CSP ─────────────────────────────────────────
    if (
      code === 'SEC-CSP-001' ||
      (code.startsWith('SEC-CSP') && evidence.toLowerCase().includes('content-security-policy'))
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'SEC-CSP-001',
        wcagOrStandard: 'W3C Content Security Policy Level 3 / OWASP A02',
        title:
          lang === 'ru'
            ? 'Внедрение Content-Security-Policy-Report-Only (тестовый режим)'
            : lang === 'es'
            ? 'Implementación de Content-Security-Policy-Report-Only (modo prueba)'
            : lang === 'zh'
            ? '部署 Content-Security-Policy-Report-Only（测试模式）'
            : 'Implement Content-Security-Policy-Report-Only (Testing Mode)',
        issueSummary:
          lang === 'ru'
            ? 'Сервер не передает заголовок Content-Security-Policy, допуская выполнение неавторизованных скриптов.'
            : lang === 'es'
            ? 'El servidor no envía el encabezado Content-Security-Policy, permitiendo la ejecución de scripts no autorizados.'
            : lang === 'zh'
            ? '服务器未发送 Content-Security-Policy 头，可能导致执行未经授权的脚本。'
            : 'Server does not send Content-Security-Policy header, leaving site vulnerable to script injection.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation:
          lang === 'ru'
            ? 'Конфигурация веб-сервера (Nginx / Vercel / Next.js / Apache)'
            : lang === 'es'
            ? 'Configuración del servidor web (Nginx / Vercel / Next.js / Apache)'
            : lang === 'zh'
            ? 'Web 服务器配置（Nginx / Vercel / Next.js / Apache）'
            : 'Web server configuration (Nginx / Vercel / Next.js / Apache)',
        fixedSnippet: `// Шаг 1 (Безопасное тестирование без поломки сайта клиента):
// next.config.js (в headers())
{
  key: 'Content-Security-Policy-Report-Only',
  value: "default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; report-uri /api/csp-report;"
}

# Или для Nginx:
add_header Content-Security-Policy-Report-Only "default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https:; frame-ancestors 'none'; report-uri /api/csp-report;" always;

// Шаг 2 (После недели без ошибок в отчётах — включение защиты):
// Замените заголовок с Content-Security-Policy-Report-Only на Content-Security-Policy`,
        explanation:
          lang === 'ru'
            ? 'Включите как Report-Only, посмотрите отчёты неделю, потом переключите. Общий заголовок с \'unsafe-inline\' без предварительного тестирования может сломать сторонние скрипты клиента (виджеты аналитики, чатов и оплаты).'
            : lang === 'es'
            ? 'Actívelo como Report-Only, revise los informes durante una semana, luego cámbielo a Content-Security-Policy. Un encabezado general con \'unsafe-inline\' puede romper scripts de terceros de clientes si no se prueba.'
            : lang === 'zh'
            ? '请先开启 Report-Only 模式，观察报告一周后再切换为正式策略。未测试直接部署带 \'unsafe-inline\' 的通用策略可能会破坏客户端的第三方脚本（如分析或聊天组件）。'
            : 'Enable as Report-Only first, inspect reports for a week, then switch to Content-Security-Policy. A generic header with \'unsafe-inline\' can break third-party client scripts if not tested first.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 3. SEC-CLICK-001 / Clickjacking ──────────────────────────────────────
    if (
      code === 'SEC-CLICK-001' ||
      evidence.toLowerCase().includes('x-frame-options') ||
      evidence.toLowerCase().includes('frame-ancestors')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'SEC-CLICK-001',
        wcagOrStandard: 'RFC 7034 (X-Frame-Options) / W3C CSP Level 3 frame-ancestors',
        title: lang === 'ru' ? 'Защита от подмены кликов (Clickjacking)' : 'Clickjacking Protection Header',
        issueSummary:
          lang === 'ru'
            ? 'Страницу разрешено открывать внутри чужого <iframe> без ограничений.'
            : 'The page can be embedded inside unauthorized third-party <iframe> elements.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: 'Заголовки ответа веб-сервера (Nginx / Cloudflare / Next.js)',
        fixedSnippet: `// next.config.js\n{ key: 'X-Frame-Options', value: 'DENY' }\n\n# Nginx\nadd_header X-Frame-Options "DENY" always;`,
        explanation:
          lang === 'ru'
            ? 'Заголовок запрещает встраивание интерфейса в скрытые рамки на чужих вредоносных ресурсах.'
            : 'Prevents fraudulent overlays and transparent clickjacking by refusing framing.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 4. SEC-MIME-001 / X-Content-Type-Options ────────────────────────────
    if (code === 'SEC-MIME-001' || evidence.toLowerCase().includes('x-content-type-options')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'SEC-MIME-001',
        wcagOrStandard: 'WHATWG Fetch / OWASP Security Headers',
        title: lang === 'ru' ? 'Запрет угадывания MIME-типов (nosniff)' : 'MIME Sniffing Prevention Header',
        issueSummary:
          lang === 'ru'
            ? 'Браузеру не запрещено исполнять файлы неверного типа под видом скриптов или стилей.'
            : 'Browser MIME sniffing is not disabled, posing executable payload risks.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: 'Заголовки ответа веб-сервера',
        fixedSnippet: `// next.config.js\n{ key: 'X-Content-Type-Options', value: 'nosniff' }\n\n# Nginx\nadd_header X-Content-Type-Options "nosniff" always;`,
        explanation:
          lang === 'ru'
            ? 'Заставляет браузер строго следовать объявленному Content-Type, предотвращая подмену типов файлов.'
            : 'Enforces strict MIME type adherence, eliminating malicious sniffing exploits.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 5. PRIV-REF-001 / Referrer-Policy ────────────────────────────────────
    if (code === 'PRIV-REF-001' || evidence.toLowerCase().includes('referrer-policy')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'PRIV-REF-001',
        wcagOrStandard: 'W3C Referrer Policy / GDPR Art. 25 Privacy by Default',
        title: lang === 'ru' ? 'Ограничение утечки адресов страниц (Referrer-Policy)' : 'Referrer-Policy Privacy Header',
        issueSummary:
          lang === 'ru'
            ? 'При переходе по внешним ссылкам сервер передает полный внутренний URL страницы.'
            : 'Outbound navigation leaks full URL paths containing potentially sensitive query params.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: 'Заголовки ответа веб-сервера или тег <head>',
        fixedSnippet: `// next.config.js\n{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }\n\n<!-- Или внутри <head>: -->\n<meta name="referrer" content="strict-origin-when-cross-origin">`,
        explanation:
          lang === 'ru'
            ? 'Передает сторонним сайтам только имя домена, скрывая внутренние пути и параметры запроса.'
            : 'Transmits only the origin domain across external boundaries, protecting private route parameters.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 6. PRIV-PERM-001 / Permissions-Policy ────────────────────────────────
    if (code === 'PRIV-PERM-001' || evidence.toLowerCase().includes('permissions-policy')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'PRIV-PERM-001',
        wcagOrStandard: 'W3C Permissions Policy / GDPR Art. 25',
        title: lang === 'ru' ? 'Ограничение доступа к аппаратуре (Permissions-Policy)' : 'Hardware Access Restriction Header',
        issueSummary:
          lang === 'ru'
            ? 'Не ограничен доступ сторонних скриптов к камере, микрофону и геолокации устройства.'
            : 'Third-party components have unrestricted access attempts to microphone, camera, and geolocation.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: 'Заголовки ответа веб-сервера',
        fixedSnippet: `// next.config.js\n{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }\n\n# Nginx\nadd_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;`,
        explanation:
          lang === 'ru'
            ? 'Блокирует несанкционированный запрос чувствительных датчиков и оборудования пользователя.'
            : 'Enforces principle of least privilege for browser device hardware APIs.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 7. OPS-SECTXT-001 / security.txt ────────────────────────────────────
    if (code === 'OPS-SECTXT-001' || evidence.toLowerCase().includes('security.txt')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'OPS-SECTXT-001',
        wcagOrStandard: 'RFC 9116 — A File Format to Aid in Security Vulnerability Disclosure',
        title:
          lang === 'ru'
            ? 'Создание файла /.well-known/security.txt (требуется указать контакты)'
            : lang === 'es'
            ? 'Crear /.well-known/security.txt (Contacto de seguridad requerido)'
            : lang === 'zh'
            ? '创建 /.well-known/security.txt 文件（需填写安全联系方式）'
            : 'Create /.well-known/security.txt (Security Contact Required)',
        issueSummary:
          lang === 'ru'
            ? 'На сайте отсутствует стандартный канал сообщения об уязвимостях по RFC 9116.'
            : lang === 'es'
            ? 'El sitio carece de un canal estándar de reporte de vulnerabilidades según RFC 9116.'
            : lang === 'zh'
            ? '网站缺少符合 RFC 9116 标准的安全漏洞披露联络文件。'
            : 'Missing standardized security disclosure file at /.well-known/security.txt.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation:
          lang === 'ru'
            ? 'Файл в каталоге public/.well-known/security.txt'
            : lang === 'es'
            ? 'Archivo en public/.well-known/security.txt'
            : lang === 'zh'
            ? '网站根目录 public/.well-known/security.txt 文件'
            : 'File at public/.well-known/security.txt',
        fixedSnippet: `# RFC 9116 — Security Vulnerability Disclosure
# Впишите реальный адрес вашей службы безопасности:
Contact: mailto:security-team@${safeDomain}
# Или ссылка на защищённую форму приёма обращений:
# Contact: https://${safeDomain}/security-report
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: ${lang === 'ru' ? 'ru, en' : lang === 'es' ? 'es, en' : lang === 'zh' ? 'zh, en' : 'en'}
Canonical: https://${safeDomain}/.well-known/security.txt`,
        manualGuidance:
          lang === 'ru'
            ? 'Впишите реальный действующий адрес электронной почты или URL страницы защищённой формы вашей службы безопасности. Не используйте автоматические догадки: исследователи безопасности должны иметь прямую связь с живым человеком из вашей команды.'
            : lang === 'es'
            ? 'Introduzca una dirección de correo real o la URL de un formulario de contacto de su equipo de seguridad. No use direcciones inventadas: los investigadores deben comunicarse con una persona real.'
            : lang === 'zh'
            ? '请填写真实有效的安全团队电子邮箱或漏洞提交页面 URL。严禁使用自动猜测的虚构地址：安全研究人员需要能直接联系到负责人。'
            : 'Enter a valid security contact email or secure reporting form URL. Do not use automated guesses: security researchers need direct access to a real human on your team.',
        explanation:
          lang === 'ru'
            ? 'Предоставляет исследователям безопасности легитимный адрес для ответственного сообщения об уязвимостях, предотвращая публичные утечки.'
            : lang === 'es'
            ? 'Proporciona a los investigadores de seguridad un canal legítimo para el reporte responsable de vulnerabilidades.'
            : lang === 'zh'
            ? '为合规安全研究人员提供负责任披露漏洞的标准化联络渠道。'
            : 'Provides ethical security researchers with a validated contact channel for vulnerability reports.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 8. ADA-004 / Skip link ───────────────────────────────────────────────
    if (
      code === 'ADA-004' ||
      code.includes('SKIP') ||
      code.includes('2.4.1') ||
      evidence.toLowerCase().includes('skiplink') ||
      evidence.toLowerCase().includes('skip link') ||
      evidence.toLowerCase().includes('пропуска навигации') ||
      title.toLowerCase().includes('перехода к основному') ||
      title.toLowerCase().includes('пропуска')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-2.4.1',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 2.4.1 Bypass Blocks (A)',
        title: lang === 'ru' ? 'Внедрение ссылки быстрого перехода к содержимому' : 'Add Skip-to-Content Navigation Link',
        issueSummary:
          lang === 'ru'
            ? 'Отсутствует механизм клавиатурного перехода сразу к основному содержимому в обход меню.'
            : 'Users navigating via keyboard cannot bypass repetitive navigation headers.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}Начало тега <body> и целевой контейнер контента`,
        fixedSnippet: `<!-- Вставьте ПЕРВЫМ элементом сразу после <body>: -->\n<a href="#main-content" class="skip-link">Skip to main content</a>\n\n<!-- Добавьте id и tabindex="-1" к основному блоку страницы: -->\n<main id="main-content" tabindex="-1">\n  <!-- содержимое страницы -->\n</main>\n\n/* Стили в CSS: */\n.skip-link {\n  position: absolute;\n  top: -9999px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: #0B1220;\n  color: #FFFFFF;\n  padding: 12px 24px;\n  font-weight: 700;\n  text-decoration: none;\n  border: 2px solid #FFFFFF;\n  border-radius: 0 0 8px 8px;\n  z-index: 999999;\n}\n.skip-link:focus {\n  top: 0;\n  outline: 3px solid #FFFFFF;\n}`,
        explanation:
          lang === 'ru'
            ? 'Позволяет пользователю с клавиатуры нажать Tab и сразу перейти к чтению статьи или страницы, не пролистывая десятки ссылок шапки.'
            : 'Enables keyboard users to bypass repetitive header navigation with a single keystroke.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 9. Missing html[lang] ────────────────────────────────────────────────
    if (
      code.includes('LANG') ||
      code.includes('3.1.1') ||
      evidence.toLowerCase().includes('html lang') ||
      evidence.toLowerCase().includes('атрибута lang') ||
      title.toLowerCase().includes('язык')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-3.1.1',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 3.1.1 Language of Page (A)',
        title: lang === 'ru' ? 'Указание языка страницы в теге <html>' : 'Declare Language on Root <html> Element',
        issueSummary:
          lang === 'ru'
            ? 'Тег <html> не содержит атрибута lang, скринридер не может определить язык озвучивания.'
            : 'The <html> element lacks a lang attribute, preventing screen readers from choosing the correct phonetics.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}Корневой тег <html> в шаблоне документа`,
        fixedSnippet: `<!-- Замените открывающий тег <html>: -->\n<html lang="${lang === 'ru' ? 'ru' : lang === 'es' ? 'es' : lang === 'zh' ? 'zh' : 'en'}">`,
        explanation:
          lang === 'ru'
            ? 'Атрибут lang позволяет скринридерам корректно произносить слова в соответствии с языковыми правилами.'
            : 'Identifies default document language for assistive speech synthesis engines.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 9b. Outline none / Focus Visible (WCAG 2.4.7) ────────────────────────
    if (
      code.includes('OUTLINE') ||
      code.includes('FOCUS') ||
      code.includes('2.4.7') ||
      evidence.toLowerCase().includes('outline: none') ||
      evidence.toLowerCase().includes('outline:none') ||
      evidence.toLowerCase().includes('outline: 0')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-2.4.7',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 2.4.7 Focus Visible (AA)',
        title: lang === 'ru' ? 'Восстановление видимого контура фокуса' : 'Restore Visible Focus Outline (:focus-visible)',
        issueSummary:
          lang === 'ru'
            ? 'Стили содержат outline: none без замены на видимый индикатор фокуса.'
            : 'Styles remove native focus outline without providing an accessible visible replacement.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}CSS-файлы стилей / глобальные стили шаблона`,
        fixedSnippet: `/* Замените outline: none или добавьте правило видимого двухцветного контура: */\n:focus-visible {\n  outline: 3px solid #0B1220 !important;\n  outline-offset: 2px !important;\n  box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 7px #FFFFFF !important;\n}\n\n/* Для интерактивных элементов: */\na:focus-visible,\nbutton:focus-visible,\ninput:focus-visible,\nselect:focus-visible,\ntextarea:focus-visible {\n  outline: 3px solid #0B1220 !important;\n  outline-offset: 2px !important;\n  box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 7px #FFFFFF !important;\n}`,
        explanation:
          lang === 'ru'
            ? 'Двухцветный контур (тёмная линия + белые кольца) гарантирует контрастность ≥ 3:1 на абсолютно любом фоне.'
            : 'Dual-color outline guarantees >= 3:1 contrast against any background color.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 9c. Positive tabindex / Focus Order (WCAG 2.4.3) ─────────────────────
    if (
      code.includes('TABINDEX') ||
      code.includes('2.4.3') ||
      evidence.toLowerCase().includes('tabindex="') ||
      evidence.toLowerCase().includes('tabindex=')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-2.4.3',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 2.4.3 Focus Order (A)',
        title: lang === 'ru' ? 'Устранение положительного tabindex' : 'Remove Positive tabindex Attributes',
        issueSummary:
          lang === 'ru'
            ? 'Использование tabindex больше 0 ломает естественный порядок клавиатурной навигации по странице.'
            : 'Positive tabindex (>0) disrupts logical document tab sequence.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}HTML-шаблоны компонентов со свойством tabindex`,
        fixedSnippet: `<!-- Замените положительный tabindex на 0 (или уберите атрибут, если элемент интерактивен): -->\n<!-- БЫЛО: <div tabindex="1"> или <button tabindex="5"> -->\n<!-- СТАЛО: -->\n<div tabindex="0">\n<!-- Для нативных кнопок и ссылок удалите tabindex: -->\n<button type="button">...</button>`,
        explanation:
          lang === 'ru'
            ? 'Порядок фокуса должен следовать естественному порядку элементов в DOM-дереве. Значение tabindex="0" включает элемент в естественный порядок, а значения > 0 создают скачки фокуса.'
            : 'Focus order must follow natural DOM reading sequence. Values > 0 create unexpected focus jumps.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 9d. Low Contrast / Contrast Minimum (WCAG 1.4.3) ─────────────────────
    if (
      code.includes('CONTRAST') ||
      code.includes('1.4.3') ||
      evidence.toLowerCase().includes('contrast') ||
      title.toLowerCase().includes('контраст')
    ) {
      const hexMatches = evidence.match(/#[0-9a-fA-F]{3,6}/g) || [];
      const fg = hexMatches[0] || '#777777';
      const bg = hexMatches[1] || '#FFFFFF';
      const adj = findAccessibleColor(fg, bg, 4.5);

      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-1.4.3',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 1.4.3 Contrast (Minimum) (AA)',
        title: lang === 'ru' ? 'Коррекция цветового контраста текста (≥ 4.5:1)' : 'Adjust Text Color Contrast (>= 4.5:1)',
        issueSummary:
          lang === 'ru'
            ? 'Коэффициент контрастности текста к фону ниже нормативного порога 4.5:1.'
            : 'Text contrast ratio is below the required 4.5:1 threshold.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}CSS-стили элемента / цветовая палитра темы`,
        fixedSnippet: `/* Рассчитанная математически доступная пара цветов (контраст ${adj.contrast.toFixed(2)}:1): */\ncolor: ${adj.fgAdjusted};\nbackground-color: ${bg};`,
        explanation:
          lang === 'ru'
            ? `Формула WCAG подобрала ближайший оттенок (${adj.fgAdjusted}) с гарантированным контрастом ${adj.contrast.toFixed(2)}:1 к фону ${bg}.`
            : `WCAG formula calculated closest accessible hue (${adj.fgAdjusted}) providing ${adj.contrast.toFixed(2)}:1 contrast against background ${bg}.`,
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 10. Form fields without labels ───────────────────────────────────────
    if (
      code.includes('LABEL') ||
      code.includes('FORM') ||
      code.includes('1.3.1') ||
      code.includes('3.3.2') ||
      evidence.toLowerCase().includes('inputs without label') ||
      evidence.toLowerCase().includes('label[for]') ||
      title.toLowerCase().includes('поля форм')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-1.3.1',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 1.3.1 Info and Relationships (A), SC 3.3.2 (A)',
        title: lang === 'ru' ? 'Связывание полей ввода с текстовыми подписями' : 'Associate Form Inputs with Accessible Labels',
        issueSummary:
          lang === 'ru'
            ? 'Поле ввода не связано с текстовым <label>, скринридер читает его как безымянное поле.'
            : 'Form control lacks programmatic association with an accessible label.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation: `${pageLocationPrefix}HTML-разметка формы / компонентов ввода`,
        fixedSnippet: `<!-- Вариант 1: Явная привязка через id и for (рекомендуется) -->\n<label for="field-id">Впишите сами: [название поля, например: Адрес электронной почты]</label>\n<input id="field-id" type="text" name="fieldname">\n\n<!-- Вариант 2: Оборачивание поля в тег <label> -->\n<label>\n  <span>Впишите сами: [название поля]</span>\n  <input type="text" name="fieldname">\n</label>`,
        explanation:
          lang === 'ru'
            ? 'Программная связь позволяет незрячему пользователю услышать назначение поля при переводе фокуса.'
            : 'Explicit label associations announce the purpose of the input control when focused.',
        manualGuidance:
          lang === 'ru'
            ? 'Впишите сами: укажите понятное человеческое название поля (что именно ожидается ввести).'
            : 'Manual action: provide a concise, descriptive title of what value is expected.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 11. Buttons without accessible names ─────────────────────────────────
    if (
      code.includes('BTN') ||
      code.includes('BUTTON') ||
      code.includes('4.1.2') ||
      evidence.toLowerCase().includes('unlabeled buttons') ||
      evidence.toLowerCase().includes('button') ||
      title.toLowerCase().includes('кнопк')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-4.1.2',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 4.1.2 Name, Role, Value (A)',
        title: lang === 'ru' ? 'Добавление доступного имени кнопочным элементам' : 'Add Accessible Names to Icon Buttons',
        issueSummary:
          lang === 'ru'
            ? 'Кнопка содержит иконку без текстовой подписи и без атрибута aria-label.'
            : 'Button contains only graphical icon without accessible text or aria-label.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation: `${pageLocationPrefix}Шаблон кнопки / иконки в компонентах`,
        fixedSnippet: `<button aria-label="Впишите сами: [что делает эта кнопка, например: Закрыть диалог / Поиск]">\n  <svg aria-hidden="true" focusable="false">...</svg>\n</button>`,
        explanation:
          lang === 'ru'
            ? 'Атрибут aria-label дает имя элементу для скринридеров, при этом графический вид кнопки не меняется.'
            : 'Provides an accessible accessible-name without altering visual design.',
        manualGuidance:
          lang === 'ru'
            ? 'Впишите сами: укажите действие кнопки (например: «Поиск по сайту», «Открыть меню», «Закрыть окно»). Без выдуманных названий.'
            : 'Manual action: state the exact action executed by the button (e.g., "Search site", "Close dialog").',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 12. Images without alt ───────────────────────────────────────────────
    if (
      code.includes('IMG') ||
      code.includes('IMAGE') ||
      code.includes('1.1.1') ||
      evidence.toLowerCase().includes('img[alt]') ||
      evidence.toLowerCase().includes('alt missing') ||
      evidence.toLowerCase().includes('атрибута alt') ||
      title.toLowerCase().includes('изображен') ||
      title.toLowerCase().includes('картинк') ||
      title.toLowerCase().includes('баннер')
    ) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-1.1.1',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 1.1.1 Non-text Content (A)',
        title: lang === 'ru' ? 'Добавление атрибута alt к изображениям' : 'Add Text Alternatives (alt) to Images',
        issueSummary:
          lang === 'ru'
            ? 'Изображение не имеет атрибута alt: скринридер читает технический путь к файлу.'
            : 'Image element has no alt attribute, causing screen readers to verbalize raw URL paths.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation: `${pageLocationPrefix}Теги <img> в шаблонах страниц`,
        fixedSnippet: `<!-- Для смыслового изображения: -->\n<img src="photo.jpg" alt="Впишите сами: [краткое описание того, что изображено]">\n\n<!-- Для чисто декоративного изображения (иконки, разделители): -->\n<img src="divider.svg" alt="" aria-hidden="true">`,
        explanation:
          lang === 'ru'
            ? 'Текстовый эквивалент передает смысл изображения незрячим пользователям.'
            : 'Provides functional equivalence for visual media.',
        manualGuidance:
          lang === 'ru'
            ? 'Впишите сами: кратко опишите суть изображения или поставьте alt="" если оно чисто декоративное.'
            : 'Manual action: provide descriptive text, or alt="" if purely decorative.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 13. Link without accessible text (WCAG-2.4.4-LINK-NAME) ────────────
    if (code.includes('LINK-NAME') || (code.includes('2.4.4') && evidence.toLowerCase().includes('<a>'))) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-2.4.4',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 2.4.4 Link Purpose (In Context) (A)',
        title: lang === 'ru' ? 'Добавление доступного текста ссылке' : 'Add Accessible Text to Link',
        issueSummary:
          lang === 'ru'
            ? 'Ссылка не содержит текста, aria-label или изображения с alt, скринридер не может определить цель перехода.'
            : 'Link contains no text, aria-label, or image with alt.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation: `${pageLocationPrefix}HTML-шаблон ссылки <a>`,
        fixedSnippet: `<!-- Вариант 1: Впишите понятный текст внутрь ссылки: -->\n<a href="...">Впишите сами: [название ссылки, например: Подробнее о компании]</a>\n\n<!-- Вариант 2: Для иконки без текста используйте aria-label: -->\n<a href="..." aria-label="Впишите сами: [назначение ссылки]">\n  <svg aria-hidden="true">...</svg>\n</a>`,
        explanation:
          lang === 'ru'
            ? 'Текст ссылки или aria-label позволяет пользователю скринридера понять назначение перехода.'
            : 'Provides clear accessible name for link navigation.',
        manualGuidance:
          lang === 'ru'
            ? 'Впишите сами: кратко и понятно укажите цель перехода (куда ведет ссылка).'
            : 'Manual action: state the exact destination of the link.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 14. Empty Heading (WCAG-1.3.1-EMPTY-HEADING) ────────────────────────
    if (code.includes('EMPTY-HEADING')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-1.3.1',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 1.3.1 Info and Relationships (A)',
        title: lang === 'ru' ? 'Удаление или заполнение пустого заголовка' : 'Fill or Remove Empty Heading Element',
        issueSummary:
          lang === 'ru'
            ? 'Тег заголовка присутствует в разметке, но не содержит видимого или доступного текста.'
            : 'Heading tag exists in markup but has no accessible text.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation: `${pageLocationPrefix}Теги заголовков (h1–h6) в шаблоне страницы`,
        fixedSnippet: `<!-- Удалите пустой тег либо впишите осмысленный заголовок: -->\n<h2>Впишите сами: [Название подраздела]</h2>`,
        explanation:
          lang === 'ru'
            ? 'Пустые заголовки засоряют оглавление страницы в скринридерах и мешают навигации.'
            : 'Empty headings clutter document outlines in screen readers.',
        manualGuidance:
          lang === 'ru'
            ? 'Впишите сами: укажите название раздела либо удалите пустой элемент заголовка.'
            : 'Manual action: provide heading text or remove the tag.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 15. Heading Order Skipped (WCAG-1.3.1-HEADING-ORDER) ────────────────
    if (code.includes('HEADING-ORDER')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-1.3.1',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 1.3.1 Info and Relationships (A) / G141',
        title: lang === 'ru' ? 'Восстановление последовательной иерархии заголовков' : 'Restore Sequential Heading Hierarchy',
        issueSummary:
          lang === 'ru'
            ? 'Уровень заголовка пропущен (например, после h1 сразу идет h3), нарушая логику оглавления.'
            : 'Heading level was skipped (e.g., h1 followed by h3), breaking document hierarchy.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}Структура заголовков в разметке страницы`,
        fixedSnippet: `<!-- Выстройте правильную последовательность уровней заголовков: -->\n<h1>Основной заголовок страницы</h1>\n  <h2>Раздел (h2, без пропуска уровней)</h2>\n    <h3>Подраздел (h3)</h3>`,
        explanation:
          lang === 'ru'
            ? 'Последовательная иерархия позволяет скринридерам строить правильное дерево навигации.'
            : 'Logical heading sequence ensures assistive technologies construct proper navigation trees.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 16. Duplicate id attribute (WCAG-4.1.1-DUPLICATE-ID) ────────────────
    if (code.includes('DUPLICATE-ID')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-4.1.1',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 4.1.1 Parsing (A)',
        title: lang === 'ru' ? 'Устранение дубликатов атрибута id' : 'Ensure Unique id Attributes in DOM',
        issueSummary:
          lang === 'ru'
            ? 'Несколько элементов имеют одинаковый id, нарушая спецификацию HTML и привязку label/aria.'
            : 'Multiple elements share the same id attribute, breaking HTML validity and label/aria associations.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}HTML-элементы с атрибутом id`,
        fixedSnippet: `<!-- Сделайте каждый атрибут id уникальным на странице: -->\n<!-- БЫЛО: <div id="dup">...</div> <div id="dup">...</div> -->\n<!-- СТАЛО: -->\n<div id="section-header">...</div>\n<div id="section-footer">...</div>`,
        explanation:
          lang === 'ru'
            ? 'Атрибут id обязан быть строго уникальным в пределах документа для корректной работы браузера и скринридера.'
            : 'Element ids must be unique across the DOM to ensure reliable referencing.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 17. Missing or Empty <title> (WCAG-2.4.2-PAGE-TITLE) ─────────────────
    if (code.includes('PAGE-TITLE') || (code.includes('2.4.2') && evidence.toLowerCase().includes('title'))) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-2.4.2',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 2.4.2 Page Titled (A)',
        title: lang === 'ru' ? 'Добавление информативного тега <title>' : 'Add Informative Document <title>',
        issueSummary:
          lang === 'ru'
            ? 'Секция <head> не содержит тега <title> или он пуст.'
            : 'Document <head> is missing a descriptive <title> element.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation: `${pageLocationPrefix}Секция <head> в шаблоне документа`,
        fixedSnippet: `<head>\n  <title>Впишите сами: [Название страницы] — ${safeDomain}</title>\n</head>`,
        explanation:
          lang === 'ru'
            ? 'Тег title зачитывается первым при переходе на страницу и отображается во вкладках браузера.'
            : 'Page titles allow users to identify current location and navigate browser tabs efficiently.',
        manualGuidance:
          lang === 'ru'
            ? 'Впишите сами: укажите название страницы и название компании/сайта.'
            : 'Manual action: provide a concise page title including site name.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 18. iframe without title (WCAG-4.1.2-IFRAME-TITLE) ───────────────────
    if (code.includes('IFRAME-TITLE')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-4.1.2',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 4.1.2 Name, Role, Value (A)',
        title: lang === 'ru' ? 'Добавление атрибута title к тегу <iframe>' : 'Add Accessible title to <iframe> Element',
        issueSummary:
          lang === 'ru'
            ? 'Тег <iframe> не имеет атрибута title, скринридер не может объяснить назначение встроенного контента.'
            : 'The <iframe> lacks an accessible title attribute.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation: `${pageLocationPrefix}Тег <iframe> в разметке страницы`,
        fixedSnippet: `<iframe src="..." title="Впишите сами: [назначение фрейма, например: Интерактивная карта филиалов]"></iframe>`,
        explanation:
          lang === 'ru'
            ? 'Атрибут title сообщает незрячим пользователям, что находится внутри встроенного фрейма.'
            : 'Identifies frame content for screen reader users before navigating into it.',
        manualGuidance:
          lang === 'ru'
            ? 'Впишите сами: кратко опишите содержимое фрейма (виджет, карта, видео). Без выдуманных текстов.'
            : 'Manual action: state the specific purpose of the embedded iframe.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 19. Audio/video autoplay (WCAG-1.4.2-AUDIO-AUTOPLAY) ─────────────────
    if (code.includes('AUDIO-AUTOPLAY') || (code.includes('1.4.2') && evidence.toLowerCase().includes('autoplay'))) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-1.4.2',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 1.4.2 Audio Control (A)',
        title: lang === 'ru' ? 'Отключение автоматического воспроизведения аудио' : 'Disable Autoplay or Mute Audio by Default',
        issueSummary:
          lang === 'ru'
            ? 'Медиа-элемент воспроизводит звук автоматически, заглушая голос скринридера.'
            : 'Media starts playing audio automatically upon page load, conflicting with screen readers.',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}Теги <audio> или <video> в шаблоне`,
        fixedSnippet: `<!-- Удалите атрибут autoplay или добавьте muted: -->\n<video controls muted preload="metadata">\n  <source src="..." type="...">\n</video>`,
        explanation:
          lang === 'ru'
            ? 'Пользователь должен сам решать, когда запускать звук. Автовоспроизведение звука блокирует восприятие информации незрячими.'
            : 'Users must have autonomous control over audio playback.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 20. aria-hidden on focusable (WCAG-4.1.2-ARIA-HIDDEN-FOCUS) ──────────
    if (code.includes('ARIA-HIDDEN-FOCUS')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-4.1.2',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 4.1.2 Name, Role, Value (A) / WAI-ARIA 1.2',
        title: lang === 'ru' ? 'Удаление aria-hidden с фокусируемых элементов' : 'Remove aria-hidden from Focusable Elements',
        issueSummary:
          lang === 'ru'
            ? 'Элемент доступен для фокуса с клавиатуры, но помечен aria-hidden="true", создавая невидимую ловушку.'
            : 'Interactive focusable element is hidden from assistive tech with aria-hidden="true".',
        evidenceFragment: evidence,
        fixType: 'code_snippet',
        targetLocation: `${pageLocationPrefix}Интерактивные элементы (кнопки, ссылки, поля ввода)`,
        fixedSnippet: `<!-- Вариант 1: Если элемент интерактивен, удалите aria-hidden: -->\n<button type="button">Действие</button>\n\n<!-- Вариант 2: Если элемент чисто декоративен, исключите его из табуляции: -->\n<span aria-hidden="true" tabindex="-1">...</span>`,
        explanation:
          lang === 'ru'
            ? 'Фокусируемый элемент с aria-hidden="true" получает фокус при нажатии Tab, но скринридер молчит — пользователь теряется.'
            : 'Prevents invisible focus traps where keyboard focus lands on elements silenced by aria-hidden.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── 21. Table without headers (WCAG-1.3.1-TABLE-HEADERS) ─────────────────
    if (code.includes('TABLE-HEADERS')) {
      items.push({
        id: `fix-${code}-${i}`,
        code: 'WCAG-1.3.1',
        wcagOrStandard: 'WCAG 2.1 / 2.2 SC 1.3.1 Info and Relationships (A)',
        title: lang === 'ru' ? 'Добавление ячеек заголовков <th> в таблицу данных' : 'Add Header Cells (<th>) to Data Table',
        issueSummary:
          lang === 'ru'
            ? 'Таблица содержит данные, но не имеет ни одной ячейки <th>, связывающей столбцы.'
            : 'Data table lacks <th> header cells to associate columns with data.',
        evidenceFragment: evidence,
        fixType: 'manual_input',
        targetLocation: `${pageLocationPrefix}Теги <table> в разметке страниц`,
        fixedSnippet: `<table>\n  <thead>\n    <tr>\n      <th scope="col">Впишите сами: [Заголовок столбца 1]</th>\n      <th scope="col">Впишите сами: [Заголовок столбца 2]</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Данные 1</td>\n      <td>Данные 2</td>\n    </tr>\n  </tbody>\n</table>`,
        explanation:
          lang === 'ru'
            ? 'Ячейки <th> со scope="col" позволяют скринридеру зачитывать название столбца при перемещении между ячейками данных.'
            : 'Header cells with scope="col" announce column titles as users navigate through table cells.',
        manualGuidance:
          lang === 'ru'
            ? 'Впишите сами: укажите понятные названия колонок таблицы. Для чисто макетных таблиц используйте role="presentation".'
            : 'Manual action: provide descriptive column headers or role="presentation" for layout tables.',
        page,
        comparisonStatus,
      });
      continue;
    }

    // ── Fallback for other proven findings ───────────────────────────────────
    items.push({
      id: `fix-${code}-${i}`,
      code,
      wcagOrStandard: f.lawName || 'WCAG / Baseline Security Standard',
      title,
      issueSummary: title,
      evidenceFragment: evidence,
      fixType: 'manual_input',
      targetLocation: `${pageLocationPrefix}Код шаблона или настройки веб-сервера`,
      fixedSnippet: `<!-- Устраните дефект по предписанию аудита: -->\n<!-- Зафиксированное значение: ${evidence.replace(/-->/g, '')} -->\n<!-- Впишите сами: выполните необходимые изменения в коде сайта -->`,
      explanation:
        lang === 'ru'
          ? 'Устранение данного дефекта восстанавливает соответствие стандарту и защищает сайт от замечаний.'
          : 'Remediating this violation restores baseline conformance.',
      manualGuidance:
        lang === 'ru'
          ? 'Впишите сами: обратитесь к веб-разработчику для корректировки указанного фрагмента разметки или конфигурации.'
          : 'Manual action: apply configuration adjustment according to evidence.',
      page,
      comparisonStatus,
    });
  }

  // Маркировка гипотез и проброс доказательств (селектор, outerHtml, pageUrl)
  items.forEach((item, idx) => {
    const f = findings[idx] || findings.find((x) => (x.code || '').toUpperCase().trim() === item.code);
    if (f) {
      if (!item.page && (f.page || f.url || f.pageUrl)) item.page = f.page || f.url || f.pageUrl;
      if (!item.pageUrl && (f.pageUrl || f.url || f.page)) item.pageUrl = f.pageUrl || f.url || f.page;
      if (!item.selector && f.selector) item.selector = f.selector;
      if (!item.outerHtml && (f.outerHtml || f.violatingHtml)) item.outerHtml = f.outerHtml || f.violatingHtml;
    }
    if (item.isHypothesis === undefined) {
      item.isHypothesis = f?.isHypothesis === true || (!f?.proven && !(typeof f?.id === 'number' && f.id >= 900000) && !/доказано|proven|probado|已验证/i.test(f?.evidence || ''));
    }
  });

  const isPreviewMode = options?.isPreview === true;
  const allItems = [...items];
  const lockedCount = isPreviewMode ? Math.max(0, allItems.length - 2) : 0;
  const lockedTitles = isPreviewMode && allItems.length > 2
    ? allItems.slice(2).map((x) => ({ code: x.code, title: x.title }))
    : [];

  const visibleItems = isPreviewMode ? allItems.slice(0, 2) : allItems;
  const codeSnippetsCount = visibleItems.filter((x) => x.fixType === 'code_snippet').length;
  const manualInputsCount = visibleItems.filter((x) => x.fixType === 'manual_input').length;

  const summary: FixpackSummary = {
    scanId,
    domain: safeDomain,
    locale: lang,
    totalFindings: findings.length,
    cardsCount: visibleItems.length,
    codeSnippetsCount,
    manualInputsCount,
    scannedPagesCount: scannedPages.length,
    scannedPages,
    comparedToPrevious,
    isPreview: isPreviewMode,
    isFullPack: !isPreviewMode,
    lockedCount,
    lockedTitles,
  };

  const htmlView = renderFixpackHtml(summary, visibleItems, t, isTestDemo);

  return {
    summary,
    items: visibleItems,
    htmlView,
  };
}

/**
 * Рендеринг чистого, строгого представительского HTML для фикспака (A4 / PDF print-ready)
 */
function renderFixpackHtml(
  summary: FixpackSummary,
  items: FixpackItem[],
  t: (typeof I18N)['en'],
  isTestDemo = false
): string {
  const testDemoBanner = isTestDemo
    ? `<div class="test-demo-banner" style="background:#451a03;border:1px solid #f59e0b;color:#fef3c7;padding:12px 18px;border-radius:8px;margin-bottom:18px;font-size:13px;line-height:1.5;">
        <strong>⚠️ ${
          summary.locale === 'ru'
            ? 'ДЕМОНСТРАЦИЯ НА ТЕСТОВЫХ ДАННЫХ (TEST HARNESS DEMO)'
            : summary.locale === 'es'
            ? 'DEMOSTRACIÓN CON DATOS DE PRUEBA (TEST HARNESS DEMO)'
            : summary.locale === 'zh'
            ? '测试数据演示（TEST HARNESS DEMO）'
            : 'DEMO ON SYNTHETIC TEST DATA (TEST HARNESS DEMO)'
        }</strong><br>
        <span>${
          summary.locale === 'ru'
            ? 'Файл сгенерирован на контрольных синтетических данных для проверки верстки динамики устранения за 14 дней на 4 языках. В продуктовой среде /api/scan/fixpack повторная проверка строится исключительно на реальных проверках из базы данных PostgreSQL через findPreviousScan.'
            : summary.locale === 'es'
            ? 'Archivo generado con datos sintéticos para verificar la plantilla de dinámica de remediación de 14 días en 4 idiomas. En producción, la verificación se basa exclusivamente en registros reales de la base de datos a través de findPreviousScan.'
            : summary.locale === 'zh'
            ? '本文件基于综合测试数据生成，用于验证 14 天复测修复动态在 4 种语言下的排版。在生产环境中，复测动态完全基于数据库中的真实检测记录通过 findPreviousScan 生成。'
            : 'File generated on synthetic test data to verify 14-day remediation dynamics layout across 4 languages. In production, repeat audits are strictly populated from real PostgreSQL scans via findPreviousScan.'
        }</span>
      </div>`
    : '';

  // Блок динамики повторной проверки (14-day re-scan)
  let comparisonHtml = '';
  if (summary.comparedToPrevious) {
    const cp = summary.comparedToPrevious;
    const fixedItemsHtml = cp.fixedCodes.length > 0
      ? `<div class="comp-col comp-fixed">
          <h4>✅ ${t.fixedHeader} (${cp.fixedCodes.length})</h4>
          <ul>${cp.fixedCodes.map((x) => `<li><strong>${escapeHtml(x.code)}</strong> — ${escapeHtml(x.title)}</li>`).join('')}</ul>
        </div>`
      : '';

    const newItemsHtml = cp.newCodes.length > 0
      ? `<div class="comp-col comp-new">
          <h4>⚠️ ${t.newHeader} (${cp.newCodes.length})</h4>
          <ul>${cp.newCodes.map((x) => `<li><strong>${escapeHtml(x.code)}</strong> — ${escapeHtml(x.title)}</li>`).join('')}</ul>
        </div>`
      : '';

    const retainedItemsHtml = cp.retainedCodes.length > 0
      ? `<div class="comp-col comp-retained">
          <h4>🔄 ${t.retainedHeader} (${cp.retainedCodes.length})</h4>
          <ul>${cp.retainedCodes.map((x) => `<li><strong>${escapeHtml(x.code)}</strong> — ${escapeHtml(x.title)}</li>`).join('')}</ul>
        </div>`
      : '';

    comparisonHtml = `
      <section class="comparison-box">
        <div class="comp-header">
          <h3>📊 ${t.comparisonTitle}</h3>
          <p class="comp-sub">${t.comparisonSubtitle(cp.daysAgo, cp.previousScanId)}</p>
        </div>
        <div class="comp-grid">
          ${fixedItemsHtml}
          ${retainedItemsHtml}
          ${newItemsHtml}
        </div>
      </section>
    `;
  } else {
    comparisonHtml = `
      <section class="comparison-box initial-box">
        <p>ℹ️ ${t.initialScanNotice}</p>
      </section>
    `;
  }

  // Генерация карточек
  const cardsHtml = items
    .map(
      (item) => `
    <div class="fix-card ${item.fixType === 'code_snippet' ? 'is-snippet' : 'is-manual'}" id="${item.id}">
      <div class="card-head">
        <div class="card-meta">
          <span class="code-badge">${escapeHtml(item.code)}</span>
          <span class="standard-label">${escapeHtml(item.wcagOrStandard)}</span>
          ${item.isHypothesis ? `<span class="status-badge status-hypothesis">⚠️ ${t.hypothesisBadge}</span>` : ''}
          ${item.comparisonStatus === 'new' ? `<span class="status-badge status-new">${t.newBadge}</span>` : ''}
          ${item.comparisonStatus === 'retained' ? `<span class="status-badge status-retained">${t.retainedBadge}</span>` : ''}
        </div>
        <span class="type-badge ${item.fixType === 'code_snippet' ? 'type-snippet' : 'type-manual'}">
          ${item.fixType === 'code_snippet' ? t.snippetBadge : t.manualBadge}
        </span>
      </div>

      <h3 class="card-title">${escapeHtml(item.title)}</h3>
      <p class="issue-summary"><strong>Проблема:</strong> ${escapeHtml(item.issueSummary)}</p>

      ${
        item.page
          ? `<div class="page-box">
              <span class="box-label">${t.pageBadge}</span>
              <code class="page-url">${escapeHtml(item.page)}</code>
            </div>`
          : ''
      }

      ${
        item.selector
          ? `<div class="selector-box">
              <span class="box-label">${summary.locale === 'ru' ? 'CSS-селектор элемента:' : summary.locale === 'es' ? 'Selector CSS del elemento:' : summary.locale === 'zh' ? '元素 CSS 选择器：' : 'Element CSS Selector:'}</span>
              <code class="element-selector">${escapeHtml(item.selector)}</code>
            </div>`
          : ''
      }

      ${
        item.outerHtml
          ? `<div class="outerhtml-box">
              <span class="box-label">${summary.locale === 'ru' ? 'Фрагмент разметки (outerHTML):' : summary.locale === 'es' ? 'Fragmento HTML (outerHTML):' : summary.locale === 'zh' ? '代码片段 (outerHTML)：' : 'HTML Snippet (outerHTML):'}</span>
              <pre class="element-outerhtml"><code>${escapeHtml(item.outerHtml)}</code></pre>
            </div>`
          : ''
      }

      <div class="evidence-box">
        <span class="box-label">${t.evidence}</span>
        <code>${escapeHtml(item.evidenceFragment)}</code>
      </div>

      <div class="target-location">
        <span class="box-label">${t.target}</span>
        <strong>${escapeHtml(item.targetLocation)}</strong>
      </div>

      <div class="snippet-box">
        <div class="snippet-header">
          <span>Исправленный фрагмент шаблона</span>
          <button class="copy-btn" onclick="copySnippet(this)">${t.copy}</button>
        </div>
        <pre><code>${escapeHtml(item.fixedSnippet)}</code></pre>
      </div>

      <div class="card-footer">
        <p class="explanation">💡 <em>${t.explanation}</em> ${escapeHtml(item.explanation)}</p>
        ${
          item.manualGuidance
            ? `<div class="manual-alert">⚠️ <strong>${t.manualNote}</strong> ${escapeHtml(item.manualGuidance)}</div>`
            : ''
        }
      </div>
    </div>
  `
    )
    .join('\n');

  // Блок заблокированных карточек для превью-версии
  const lockedBoxHtml =
    summary.isPreview && summary.lockedCount && summary.lockedCount > 0
      ? `
    <section class="preview-locked-box">
      <div class="locked-header">
        <div class="locked-icon">🔒</div>
        <div class="locked-info">
          <h3>${escapeHtml(t.lockedTitle(summary.lockedCount))}</h3>
          <p>${escapeHtml(t.lockedDesc)}</p>
        </div>
      </div>
      <div class="locked-list">
        <h4>${summary.locale === 'ru' ? 'Остальные исправления пакета:' : summary.locale === 'es' ? 'Otras correcciones del paquete:' : summary.locale === 'zh' ? '其他锁定的修复项目：' : 'Remaining Fixpack Items:'}</h4>
        <ul>
          ${(summary.lockedTitles || []).map((x) => `
            <li>
              <span class="locked-code">${escapeHtml(x.code)}</span>
              <span class="locked-title">${escapeHtml(x.title)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="locked-cta-row">
        <a href="/accessibility" class="btn-cta-buy">🎁 ${escapeHtml(t.ctaBuyPack)}</a>
      </div>
    </section>
  `
      : '';

  return `<!DOCTYPE html>
<html lang="${summary.locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AIfaFocus Fixpack · ${escapeHtml(summary.domain)}</title>
  <style>
    :root {
      --bg: #030712;
      --card-bg: #0B1220;
      --border: #1F2937;
      --text: #F3F4F6;
      --muted: #9CA3AF;
      --accent: #00E5FF;
      --code-bg: #050B14;
      --snippet-badge: #10B981;
      --manual-badge: #F59E0B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      padding: 24px 16px;
    }
    .container {
      max-width: 980px;
      margin: 0 auto;
    }

    /* Верхняя панель действий (кнопка печати, реестр) */
    .top-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #090E17;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 18px;
      margin-bottom: 20px;
    }
    .print-hint {
      color: var(--muted);
      font-size: 13px;
    }
    .actions-buttons {
      display: flex;
      gap: 10px;
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }
    .btn-print {
      background: var(--accent);
      color: #030712;
      border: 1px solid var(--accent);
    }
    .btn-print:hover {
      background: #38bdf8;
    }
    .btn-verify {
      background: #1F2937;
      color: #F3F4F6;
      border: 1px solid #374151;
    }
    .btn-verify:hover {
      background: #374151;
    }

    /* Шапка отчёта */
    .header {
      background: linear-gradient(135deg, #0B1220 0%, #111827 100%);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    .header p {
      color: var(--muted);
      font-size: 14px;
      margin-bottom: 16px;
    }
    .meta-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 13px;
      padding-top: 14px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .meta-item strong { color: #FFFFFF; }

    /* Блок динамики повторной проверки */
    .comparison-box {
      background: #090E17;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 24px;
    }
    .comp-header h3 {
      font-size: 16px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
    }
    .comp-sub {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .comp-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 14px;
    }
    .comp-col {
      background: #0B1220;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 14px;
      font-size: 13px;
    }
    .comp-col h4 {
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .comp-fixed h4 { color: #34D399; }
    .comp-retained h4 { color: #FBBF24; }
    .comp-new h4 { color: #F87171; }
    .comp-col ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .comp-col li {
      margin-bottom: 6px;
      color: #D1D5DB;
      font-size: 12px;
    }
    .initial-box {
      font-size: 13px;
      color: var(--muted);
      border-left: 3px solid var(--accent);
    }

    /* Табы фильтрации */
    .filter-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
    }
    .filter-btn {
      background: var(--card-bg);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s;
    }
    .filter-btn:hover, .filter-btn.active {
      border-color: var(--accent);
      background: rgba(0, 229, 255, 0.1);
      color: #FFFFFF;
    }

    /* Карточки */
    .fix-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      transition: border-color 0.2s;
    }
    .fix-card:hover {
      border-color: #374151;
    }
    .card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .card-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .code-badge {
      background: #1F2937;
      color: var(--accent);
      font-family: monospace;
      font-size: 12px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .standard-label {
      font-size: 12px;
      color: var(--muted);
    }
    .status-badge {
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.5px;
    }
    .status-new {
      background: rgba(248, 113, 113, 0.15);
      color: #F87171;
      border: 1px solid rgba(248, 113, 113, 0.3);
    }
    .status-retained {
      background: rgba(245, 158, 11, 0.15);
      color: #FBBF24;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }
    .status-hypothesis {
      background: rgba(245, 158, 11, 0.15);
      color: #FBBF24;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }
    .type-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .type-snippet { background: rgba(16, 185, 129, 0.15); color: #34D399; border: 1px solid rgba(16, 185, 129, 0.3); }
    .type-manual { background: rgba(245, 158, 11, 0.15); color: #FBBF24; border: 1px solid rgba(245, 158, 11, 0.3); }
    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    .issue-summary {
      font-size: 14px;
      color: #E5E7EB;
      margin-bottom: 12px;
    }
    .page-box, .evidence-box, .target-location, .selector-box, .outerhtml-box {
      background: rgba(0,0,0,0.3);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .box-label {
      display: block;
      color: var(--muted);
      font-size: 11px;
      margin-bottom: 2px;
    }
    .page-url {
      color: #67E8F9;
      font-family: monospace;
    }
    .element-selector {
      color: #FCD34D;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-weight: 600;
    }
    .evidence-box code {
      color: #F87171;
      word-break: break-all;
    }
    .element-outerhtml {
      background: rgba(0,0,0,0.4);
      padding: 6px 10px;
      border-radius: 4px;
      overflow-x: auto;
      font-size: 11.5px;
      color: #A7F3D0;
      line-height: 1.4;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .snippet-box {
      margin: 14px 0;
      background: var(--code-bg);
      border: 1px solid #1E293B;
      border-radius: 8px;
      overflow: hidden;
    }
    .snippet-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #090E17;
      padding: 6px 12px;
      font-size: 11px;
      color: var(--muted);
      border-bottom: 1px solid #1E293B;
    }
    .copy-btn {
      background: #1E293B;
      border: none;
      color: #E2E8F0;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    .copy-btn:hover { background: #334155; }
    pre {
      padding: 12px;
      overflow-x: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 12px;
      color: #A5F3FC;
      line-height: 1.5;
    }
    .card-footer {
      font-size: 13px;
      color: var(--muted);
      margin-top: 10px;
    }
    .explanation { margin-bottom: 6px; }
    .manual-alert {
      background: rgba(245, 158, 11, 0.1);
      border-left: 3px solid #F59E0B;
      padding: 8px 12px;
      border-radius: 0 4px 4px 0;
      color: #FDE68A;
      font-size: 12px;
      margin-top: 8px;
    }

    /* Превью-блок заблокированных карточек */
    .preview-locked-box {
      background: linear-gradient(135deg, #090E17 0%, #111827 100%);
      border: 2px dashed #374151;
      border-radius: 12px;
      padding: 24px;
      margin-top: 24px;
      margin-bottom: 24px;
    }
    .locked-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 18px;
    }
    .locked-icon {
      font-size: 32px;
      line-height: 1;
    }
    .locked-info h3 {
      font-size: 18px;
      font-weight: 700;
      color: #F3F4F6;
      margin-bottom: 4px;
    }
    .locked-info p {
      font-size: 13px;
      color: var(--muted);
      line-height: 1.5;
    }
    .locked-list {
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 20px;
    }
    .locked-list h4 {
      font-size: 12px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
    }
    .locked-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .locked-list li {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 13px;
      color: #E5E7EB;
    }
    .locked-code {
      font-family: monospace;
      font-size: 11px;
      font-weight: 700;
      color: #FBBF24;
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .locked-title {
      color: #D1D5DB;
    }
    .locked-cta-row {
      text-align: center;
      padding-top: 8px;
    }
    .btn-cta-buy {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
      color: #FFFFFF;
      font-size: 15px;
      font-weight: 700;
      padding: 12px 28px;
      border-radius: 8px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
      transition: all 0.2s;
    }
    .btn-cta-buy:hover {
      background: linear-gradient(135deg, #34D399 0%, #10B981 100%);
      transform: translateY(-1px);
    }

    /* ══════════════════════════════════════════════════════════════════════════
       СТИЛИ ПЕЧАТИ (A4 / PDF EXPORT)
       ══════════════════════════════════════════════════════════════════════════ */
    @media print {
      @page {
        size: A4 portrait;
        margin: 12mm 15mm;
      }
      body {
        background: #FFFFFF !important;
        color: #111827 !important;
        font-size: 10.5pt;
        line-height: 1.5;
        padding: 0 !important;
      }
      .container {
        max-width: 100% !important;
      }
      .top-actions, .filter-bar, .copy-btn {
        display: none !important;
      }
      .header {
        background: #FFFFFF !important;
        border: 2px solid #111827 !important;
        border-radius: 0 !important;
        color: #111827 !important;
        padding: 16px !important;
        margin-bottom: 16px !important;
        page-break-after: avoid;
      }
      .header h1 {
        color: #111827 !important;
        font-size: 18pt !important;
      }
      .header p {
        color: #4B5563 !important;
      }
      .meta-bar {
        border-top: 1px solid #E5E7EB !important;
        padding-top: 10px !important;
      }
      .meta-item strong {
        color: #111827 !important;
      }
      .comparison-box {
        background: #F9FAFB !important;
        border: 1px solid #D1D5DB !important;
        border-radius: 0 !important;
        color: #111827 !important;
        page-break-inside: avoid;
        break-inside: avoid;
        margin-bottom: 16px !important;
      }
      .comp-header h3 {
        color: #111827 !important;
      }
      .comp-col {
        background: #FFFFFF !important;
        border: 1px solid #E5E7EB !important;
      }
      .comp-fixed h4 { color: #059669 !important; }
      .comp-retained h4 { color: #D97706 !important; }
      .comp-new h4 { color: #DC2626 !important; }
      .comp-col li { color: #1F2937 !important; }
      .fix-card {
        background: #FFFFFF !important;
        border: 1px solid #D1D5DB !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        page-break-inside: avoid;
        break-inside: avoid;
        padding: 14px !important;
        margin-bottom: 16px !important;
      }
      .card-title {
        color: #111827 !important;
        font-size: 13pt !important;
      }
      .issue-summary {
        color: #1F2937 !important;
      }
      .code-badge {
        background: #F3F4F6 !important;
        color: #111827 !important;
        border: 1px solid #D1D5DB !important;
      }
      .status-hypothesis {
        border: 1px solid #D97706 !important;
        color: #B45309 !important;
        background: #FEF3C7 !important;
      }
      .type-badge {
        border: 1px solid #D1D5DB !important;
      }
      .type-snippet { background: #ECFDF5 !important; color: #065F46 !important; }
      .type-manual { background: #FFFBEB !important; color: #92400E !important; }
      .page-box, .evidence-box, .target-location, .selector-box, .outerhtml-box {
        background: #F9FAFB !important;
        border: 1px solid #E5E7EB !important;
        color: #111827 !important;
      }
      .page-url { color: #0369A1 !important; }
      .element-selector { color: #92400E !important; }
      .element-outerhtml {
        background: #F1F5F9 !important;
        color: #0F172A !important;
        border: 1px solid #CBD5E1 !important;
      }
      .evidence-box code { color: #991B1B !important; }
      .preview-locked-box {
        background: #F9FAFB !important;
        border: 2px dashed #9CA3AF !important;
        border-radius: 0 !important;
        page-break-inside: avoid;
        break-inside: avoid;
        padding: 16px !important;
        margin-top: 20px !important;
      }
      .locked-info h3, .locked-info p, .locked-title {
        color: #111827 !important;
      }
      .locked-code {
        background: #FEF3C7 !important;
        color: #92400E !important;
        border: 1px solid #FCD34D !important;
      }
      .btn-cta-buy {
        background: #111827 !important;
        color: #FFFFFF !important;
        box-shadow: none !important;
      }
      .snippet-box {
        background: #F8FAFC !important;
        border: 1px solid #CBD5E1 !important;
      }
      .snippet-header {
        background: #E2E8F0 !important;
        color: #1E293B !important;
        font-weight: 700 !important;
      }
      pre {
        color: #0F172A !important;
        background: #F8FAFC !important;
        white-space: pre-wrap !important;
      }
      .card-footer {
        color: #4B5563 !important;
      }
      .manual-alert {
        background: #FEF3C7 !important;
        border-left: 3px solid #D97706 !important;
        color: #78350F !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="top-actions">
      <span class="print-hint">${t.printHint}</span>
      <div class="actions-buttons">
        <a href="/audit-verify?id=${encodeURIComponent(summary.scanId)}" target="_blank" class="action-btn btn-verify">
          ${t.verifyLinkText}
        </a>
        <button class="action-btn btn-print" onclick="window.print()">
          🖨️ ${t.printBtn}
        </button>
      </div>
    </div>

    ${testDemoBanner}

    <header class="header">
      <h1>${t.headerTitle}</h1>
      <p>${t.headerDesc}</p>
      <div class="meta-bar">
        <span class="meta-item">${t.domainLabel} <strong>${escapeHtml(summary.domain)}</strong></span>
        <span class="meta-item">${t.scanIdLabel} <strong>${escapeHtml(summary.scanId)}</strong></span>
        <span class="meta-item">${t.pagesCovered} <strong>${t.pagesWord(summary.scannedPagesCount)}</strong></span>
        <span class="meta-item">${t.totalCardsLabel} <strong>${summary.cardsCount}</strong></span>
        <span class="meta-item">${t.readySnippetsLabel} <strong style="color:#34D399">${summary.codeSnippetsCount}</strong></span>
        <span class="meta-item">${t.manualInputsLabel} <strong style="color:#FBBF24">${summary.manualInputsCount}</strong></span>
      </div>
    </header>

    ${comparisonHtml}

    <div class="filter-bar">
      <button class="filter-btn active" onclick="filterCards('all')">${t.allTab} (${summary.cardsCount})</button>
      <button class="filter-btn" onclick="filterCards('snippet')">${t.snippetsTab} (${summary.codeSnippetsCount})</button>
      <button class="filter-btn" onclick="filterCards('manual')">${t.manualTab} (${summary.manualInputsCount})</button>
    </div>

    <main class="cards-list">
      ${cardsHtml}
      ${lockedBoxHtml}
    </main>
  </div>

  <script>
    function copySnippet(btn) {
      var pre = btn.closest('.snippet-box').querySelector('pre');
      if (!pre) return;
      var text = pre.innerText || pre.textContent;
      navigator.clipboard.writeText(text).then(function() {
        var original = btn.innerText;
        btn.innerText = '✓ ${t.copied}';
        setTimeout(function() { btn.innerText = original; }, 2000);
      });
    }

    function filterCards(type) {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      if (window.event && window.event.target) {
        window.event.target.classList.add('active');
      }
      var cards = document.querySelectorAll('.fix-card');
      cards.forEach(function(card) {
        if (type === 'all') {
          card.style.display = 'block';
        } else if (type === 'snippet') {
          card.style.display = card.classList.contains('is-snippet') ? 'block' : 'none';
        } else if (type === 'manual') {
          card.style.display = card.classList.contains('is-manual') ? 'block' : 'none';
        }
      });
    }
  </script>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
