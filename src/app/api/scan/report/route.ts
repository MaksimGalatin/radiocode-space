import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { getScanById, findPreviousScan } from '../../../../lib/oracle-scans';
import { jurisdictionOf } from '../../../../lib/jurisdiction';
import { applyProbeLaw } from '../../../../lib/probe-law';

export const dynamic = 'force-dynamic';

/**
 * Официальный печатный и PDF-отчёт по аудиту AIfaFocus.
 * 
 * Документ, который человек может приложить к переписке с юристом, банком или
 * страховщиком. Это НЕ сертификат и НЕ юридическое заключение — так же, как
 * пишет страница /audit-verify. Правка формулировок 28.09.2026: FTC в 2025 году
 * взыскала с accessiBe $1 млн за обещания соответствия, которых продукт не давал.
 * 
 * Включает:
 * - Динамический QR-код для моментальной проверки подлинности в реестре /audit-verify
 * - Расчёт совокупного правового риска и штрафных потолков
 * - Подробную таблицу доказанных нарушений и предположений
 * - Дорожную карту устранения нарушений (включая 1-Click фикс кода)
 * - Интерактивную панель управления с вызовом window.print() и автораспечаткой при ?print=1
 */

function esc(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export interface СловарьОтчёта {
  printHint: string;
  officialDocTag: string;
  savePdfBtn: string;
  downloadPatchBtn: string;
  verifyBtn: string;
  qrCaption: string;
  title: string;
  titleTag: string;
  object: string;
  scanNumber: string;
  scanDate: string;
  confirmation: string;
  score: string;
  totalFindings: string;
  proven: string;
  standardsHeader: string;
  standardsList: string;
  howToRead: string;
  howToReadBody: (n: number, plural: string) => string;
  whatChanged: string;
  prevScan: string;
  from: string;
  scoreWas: string;
  scoreBecame: string;
  noChange: string;
  fixed: string;
  appeared: string;
  noChangeInFindings: string;
  provenFindings: string;
  noProvenFindings: string;
  needsConfirmation: string;
  noAdditionalNotes: string;
  code: string;
  findingAndEvidence: string;
  finding: string;
  severity: string;
  jurisdiction: string;
  sevCritical: string;
  sevSerious: string;
  sevModerate: string;
  sevAdvisory: string;
  remediationTitle: string;
  remediationStep1: string;
  remediationStep2: string;
  remediationStep3: string;
  footerAudit: string;
  footerImmutable: string;
  footerExternal: string;
  footerContact: string;
  fixpackBtn: string;
  pageWord: (n?: number) => string;
}

const СЛОВАРЬ: Record<string, СловарьОтчёта> = {
  ru: {
    printHint: 'Нажмите Ctrl+P (⌘+P) или кнопку выше и выберите «Сохранить как PDF» — отчёт свёрстан под международный формат A4.',
    officialDocTag: 'Отчёт AIfaFocus о проверке доступности',
    savePdfBtn: 'Сохранить в PDF / Печать',
    downloadPatchBtn: 'Скачать 1-Click фикс кода',
    fixpackBtn: 'Превью пакета исправлений',
    verifyBtn: 'Проверить в реестре',
    qrCaption: 'Отсканируйте для мгновенной проверки подлинности',
    title: 'Отчёт о проверке соответствия',
    titleTag: 'Аудиторский отчёт',
    object: 'Проверяемый объект', scanNumber: 'Номер аудита', scanDate: 'Дата аудита',
    confirmation: 'Верификация',
    score: 'Оценка здоровья', totalFindings: 'Всего находок', proven: 'Из них доказано',
    standardsHeader: 'С какими требованиями сверялась проверка',
    standardsList: 'Автоматически проверяемая часть критериев W3C WCAG уровня AA и заголовки безопасности. Какая норма права относится к сайту (ADA Title III для бизнеса в США, ADA Title II для органов власти, Section 508, Директива ЕС 2019/882 и другие) — в колонке «Стандарт и норма права» у каждой находки.',
    howToRead: 'Методология и структура отчёта.',
    howToReadBody: (n: number, plural: string) =>
      `Находки разделены на две группы. <b>Доказанные</b> получены программным обходом клавиатурного доступа: рядом с каждой приведено точное значение с сервера объекта, доступное для независимой верификации. <b>Требующие подтверждения</b> выявлены анализом семантической структуры. Охват проверки: ${n} страниц${plural}, открытый доступ без авторизации.`,
    whatChanged: 'Динамика с момента предыдущей проверки', prevScan: 'Прошлая проверка', from: 'от',
    scoreWas: 'оценка была', scoreBecame: 'стала', noChange: '(без изменений)',
    fixed: 'Устранено', appeared: 'Появилось', noChangeInFindings: 'Состав находок не изменился.',
    provenFindings: 'Доказанные находки', noProvenFindings: 'Доказанных нарушений доступности не обнаружено.',
    needsConfirmation: 'Замечания, требующие подтверждения', noAdditionalNotes: 'Дополнительных замечаний нет.',
    code: 'Код', findingAndEvidence: 'Нарушение и доказательство из DOM', finding: 'Нарушение',
    severity: 'Критичность', jurisdiction: 'Стандарт и норма права',
    sevCritical: 'критическая', sevSerious: 'серьёзная', sevModerate: 'средняя', sevAdvisory: 'рекомендация',
    remediationTitle: 'Дорожная карта устранения барьеров',
    remediationStep1: '<b>Шаг 1. Временная мера для клавиатуры:</b> патч AIfaFocus (CSS/JS) делает видимым фокус клавиатуры и добавляет ссылку перехода к основному содержимому. Нарушения в коде сайта он не устраняет и соответствия стандартам не даёт.',
    remediationStep2: '<b>Шаг 2. Структурная доработка:</b> устраните коренные дефекты доступности в шаблонах CMS или компонентах фронтенда в соответствии с приведенным перечнем.',
    remediationStep3: '<b>Шаг 3. Исправление и повторная проверка:</b> инженеры проекта исправят нарушения в шаблонах и перепроверят сайт; по запросу — декларация VPAT (самооценка по форме ITI, не сертификат): aifa.works/compliance-audit.',
    footerAudit: 'Аудит выполнен сервисом цифровой доступности AIfaFocus экосистемы CODE Eternal (aifa.works).',
    footerImmutable: 'Отчёт сформирован из записи в базе по номеру проверки и не может быть изменён правкой ссылки.',
    footerExternal: 'Проверка выполнена снаружи, без доступа к внутренним системам объекта. Отсутствие находки не является гарантией отсутствия уязвимости.',
    footerContact: 'Техническая поддержка и заказ глубокого аудита',
    pageWord: (n?: number) => n === 1 ? 'а' : '',
  },
  en: {
    printHint: 'Press Ctrl+P (⌘+P) or click the button above and select "Save as PDF" — laid out for standard A4 document printing.',
    officialDocTag: 'AIfaFocus accessibility check report',
    savePdfBtn: 'Save as PDF / Print',
    downloadPatchBtn: 'Download 1-Click Patch',
    fixpackBtn: 'Fixpack Preview',
    verifyBtn: 'Verify in Registry',
    qrCaption: 'Scan to verify document authenticity',
    title: 'Compliance Audit Report',
    titleTag: 'Audit Report',
    object: 'Target Website', scanNumber: 'Audit ID', scanDate: 'Audit Timestamp',
    confirmation: 'Verification',
    score: 'Health Score', totalFindings: 'Total Findings', proven: 'Proven Violations',
    standardsHeader: 'What this check compares against',
    standardsList: 'The automatically testable part of the W3C WCAG Level AA success criteria, plus security headers. Which law applies to the site (ADA Title III for US businesses, ADA Title II for public entities, Section 508, EU Directive 2019/882 and others) is shown for each finding in the "Standard & Statutory Rule" column.',
    howToRead: 'Methodology and structure of this report.',
    howToReadBody: (n: number, _plural: string) =>
      `Findings are structured into two categories. <b>Proven</b> violations originate from automated keyboard traversal: each item includes the exact snippet extracted from the target server for independent verification. <b>Needs confirmation</b> items represent semantic analysis requiring contextual review. Coverage: ${n} page${n === 1 ? '' : 's'}, public access without authorization.`,
    whatChanged: 'Changes since previous audit', prevScan: 'Previous audit', from: 'from',
    scoreWas: 'score was', scoreBecame: 'now', noChange: '(no change)',
    fixed: 'Resolved', appeared: 'New', noChangeInFindings: 'Findings composition unchanged.',
    provenFindings: 'Proven findings', noProvenFindings: 'No proven accessibility violations detected.',
    needsConfirmation: 'Semantic Observations Requiring Review', noAdditionalNotes: 'No additional observations.',
    code: 'Code', findingAndEvidence: 'Violation & DOM Evidence', finding: 'Observation',
    severity: 'Severity', jurisdiction: 'Standard & Statutory Rule',
    sevCritical: 'critical', sevSerious: 'serious', sevModerate: 'moderate', sevAdvisory: 'advisory',
    remediationTitle: 'Remediation Roadmap',
    remediationStep1: '<b>Step 1. Temporary keyboard measure:</b> the AIfaFocus patch (CSS/JS) makes keyboard focus visible and adds a skip-to-main-content link. It does not fix the violations in the site\'s code and does not make the site conform to any standard.',
    remediationStep2: '<b>Step 2. Template Remediation:</b> fix root structural defects in CMS templates or frontend components according to the findings above.',
    remediationStep3: '<b>Step 3. Fix and re-scan:</b> our engineers fix the violations in your templates and re-check the site; on request, a VPAT (a self-assessment on the ITI form, not a certificate): aifa.works/compliance-audit.',
    footerAudit: 'Audit conducted by AIfaFocus — the accessibility audit service of CODE Eternal (aifa.works).',
    footerImmutable: 'This report is generated from the database record for this scan number and cannot be altered by editing the link.',
    footerExternal: 'The scan was performed externally, with no access to the target\'s internal systems. Absence of a finding is not a guarantee of no vulnerability.',
    footerContact: 'Technical inquiries & remediation support',
    pageWord: (_n?: number) => '',
  },
  es: {
    printHint: 'Presione Ctrl+P (⌘+P) o el botón superior y elija "Guardar como PDF" — optimizado para impresión en formato A4.',
    officialDocTag: 'Informe de verificación de accesibilidad AIfaFocus',
    savePdfBtn: 'Guardar como PDF / Imprimir',
    downloadPatchBtn: 'Descargar Parche 1-Clic',
    fixpackBtn: 'Vista previa del paquete de correcciones',
    verifyBtn: 'Verificar en el Registro',
    qrCaption: 'Escanear para verificar la autenticidad',
    title: 'Informe de Auditoría de Cumplimiento',
    titleTag: 'Informe de auditoría',
    object: 'Sitio Web Auditado', scanNumber: 'ID de Auditoría', scanDate: 'Fecha y Hora',
    confirmation: 'Verificación',
    score: 'Puntuación de Salud', totalFindings: 'Total de Hallazgos', proven: 'Infracciones Comprobadas',
    standardsHeader: 'Con qué requisitos se comparó la verificación',
    standardsList: 'La parte comprobable automáticamente de los criterios W3C WCAG nivel AA y las cabeceras de seguridad. Qué norma jurídica se aplica al sitio (ADA Título III para empresas en EE. UU., ADA Título II para organismos públicos, Sección 508, Directiva UE 2019/882 y otras) figura en la columna «Norma y Marco Legal» de cada hallazgo.',
    howToRead: 'Metodología y lectura del informe.',
    howToReadBody: (n: number, _plural: string) =>
      `Los hallazgos se dividen en dos categorías. Los <b>comprobados</b> provienen del recorrido automatizado de teclado: cada uno detalla el valor exacto extraído del servidor. Los que <b>requieren confirmación</b> se basan en análisis semántico. Cobertura: ${n} página${n === 1 ? '' : 's'}, acceso público.`,
    whatChanged: 'Evolución respecto a la auditoría anterior', prevScan: 'Auditoría anterior', from: 'del',
    scoreWas: 'puntuación anterior', scoreBecame: 'actual', noChange: '(sin cambios)',
    fixed: 'Corregido', appeared: 'Nuevo', noChangeInFindings: 'Sin cambios en los hallazgos.',
    provenFindings: 'Hallazgos comprobados', noProvenFindings: 'No se detectaron infracciones comprobadas.',
    needsConfirmation: 'Observaciones Semánticas para Revisión', noAdditionalNotes: 'Sin observaciones adicionales.',
    code: 'Código', findingAndEvidence: 'Infracción y Evidencia en DOM', finding: 'Observación',
    severity: 'Gravedad', jurisdiction: 'Norma y Marco Legal',
    sevCritical: 'crítica', sevSerious: 'grave', sevModerate: 'moderada', sevAdvisory: 'recomendación',
    remediationTitle: 'Hoja de Ruta de Corrección',
    remediationStep1: '<b>Paso 1. Medida temporal para el teclado:</b> el parche AIfaFocus (CSS/JS) hace visible el foco del teclado y añade un enlace para saltar al contenido principal. No corrige las infracciones del código del sitio ni aporta conformidad con ninguna norma.',
    remediationStep2: '<b>Paso 2. Corrección de Plantillas:</b> resuelva los defectos estructurales en el CMS según la tabla de hallazgos.',
    remediationStep3: '<b>Paso 3. Corrección y nuevo escaneo:</b> nuestros ingenieros corrigen las infracciones en sus plantillas y vuelven a verificar el sitio; a petición, un VPAT (autoevaluación en el formulario ITI, no un certificado): aifa.works/compliance-audit.',
    footerAudit: 'Auditoría realizada por AIfaFocus — servicio de accesibilidad de CODE Eternal (aifa.works).',
    footerImmutable: 'Este informe se genera a partir del registro de la base de datos para este número de escaneo y no puede alterarse editando el enlace.',
    footerExternal: 'El escaneo se realizó de forma externa, sin acceso a los sistemas internos del objetivo. La ausencia de un hallazgo no garantiza la ausencia de vulnerabilidades.',
    footerContact: 'Consultas y soporte técnico',
    pageWord: (_n?: number) => '',
  },
  zh: {
    printHint: '按 Ctrl+P (⌘+P) 或点击上方按钮并选择“另存为 PDF”——已按标准 A4 页面排版。',
    officialDocTag: 'AIfaFocus 无障碍检测报告',
    savePdfBtn: '另存为 PDF / 打印',
    downloadPatchBtn: '下载一键修复补丁',
    fixpackBtn: '修复包预览',
    verifyBtn: '在注册表中验证',
    qrCaption: '扫码验证文档真实性',
    title: '合规审计报告',
    titleTag: '审计报告',
    object: '审计目标网站', scanNumber: '审计编号', scanDate: '审计时间',
    confirmation: '查验核实',
    score: '健康度评分', totalFindings: '发现问题总数', proven: '已证实违规',
    standardsHeader: '本次检测对照的要求',
    standardsList: 'W3C WCAG AA 级成功标准中可自动检测的部分，以及安全响应头。哪项法律适用于该网站（美国企业适用 ADA 第三章，公共机构适用 ADA 第二章，以及 Section 508、欧盟指令 2019/882 等）见每项问题的「标准与法规」一栏。',
    howToRead: '报告方法论与解读指南。',
    howToReadBody: (n: number, _plural: string) =>
      `检测结果分为两类。<b>已证实</b>问题来自键盘可访问性自动化遍历：每一项均附带来自目标服务器的确切 DOM 代码片段，支持独立核验。<b>待确认</b>问题源自语义内容分析。覆盖范围：${n} 个页面，公开访问。`,
    whatChanged: '与上次审计对比的变化', prevScan: '上次审计', from: '于',
    scoreWas: '前次得分', scoreBecame: '当前得分', noChange: '（无变化）',
    fixed: '已修复', appeared: '新出现', noChangeInFindings: '问题列表未发生变动。',
    provenFindings: '已证实的问题', noProvenFindings: '未检测到已证实的无障碍违规。',
    needsConfirmation: '待复核的语义分析项', noAdditionalNotes: '无其他待复核项。',
    code: '代码', findingAndEvidence: '违规项与 DOM 证据', finding: '观察项',
    severity: '严重程度', jurisdiction: '法规与标准依据',
    sevCritical: '严重', sevSerious: '重大', sevModerate: '中等', sevAdvisory: '建议',
    remediationTitle: '修复路线图',
    remediationStep1: '<b>步骤 1. 键盘临时措施：</b>AIfaFocus 补丁 (CSS/JS) 让键盘焦点可见，并添加跳转到主要内容的链接。它不会修复网站代码中的问题，也不能使网站符合任何标准。',
    remediationStep2: '<b>步骤 2. 模板级根治：</b>依据上述问题清单彻底修复前端及 CMS 模板中的结构缺陷。',
    remediationStep3: '<b>步骤 3. 修复并重新检测：</b>我们的工程师在您的模板中修复问题并重新检测网站；如需，可提供 VPAT（按 ITI 表格的自我评估，不是证书）：aifa.works/compliance-audit。',
    footerAudit: '本审计由 CODE Eternal 旗下 AIfaFocus 无障碍合规服务执行 (aifa.works)。',
    footerImmutable: '本报告根据数据库中该扫描编号的记录生成，无法通过编辑链接进行更改。',
    footerExternal: '本次扫描从外部进行，未访问目标的内部系统。未发现问题不代表不存在漏洞。',
    footerContact: '技术咨询与深度修复支持',
    pageWord: (_n?: number) => '',
  },
};

function словарьДля(locale: string): СловарьОтчёта {
  return СЛОВАРЬ[locale] || СЛОВАРЬ.en;
}

export async function GET(req: NextRequest) {
  const { allowRequest } = await import('../../../../lib/rate-limit');
  const { общийЛимитЗапроса } = await import('../../../../lib/rate-limit-db');
  if (!allowRequest(req, 'scan-report', 30, 60_000)
      || !(await общийЛимитЗапроса(req, 'scan-report', 30, 60_000))) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 });
  }

  const id = (req.nextUrl.searchParams.get('id') || '').trim();
  if (!id) return NextResponse.json({ error: 'no_id' }, { status: 400 });

  const scan = await getScanById(id);
  if (!scan) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  const payload = scan.payload as {
    allThreats?: Array<{
      code: string; title: string; severity: string; evidence: string;
      lawName?: string; fineAmount?: string; description?: string;
      lawUrl?: string; lawKind?: string;
    }>;
    scannedPages?: string[];
    engine?: string;
    provenCount?: number;
  } | null;

  const threats = (payload?.allThreats || []).map((t) => applyProbeLaw(t, scan.locale));
  const proven = threats.filter((t) => /ДОКАЗАНО|PROVEN|PROBADO|已验证/.test(String(t.evidence || '')));
  const assumed = threats.filter((t) => !/ДОКАЗАНО|PROVEN|PROBADO|已验证/.test(String(t.evidence || '')));

  const prev = await findPreviousScan(scan.domain, scan.createdAt, scan.id);
  const prevPayload = prev?.payload as { allThreats?: Array<{ code: string; title: string }> } | null;
  const prevCodes = new Set((prevPayload?.allThreats || []).map((t) => t.code));
  const nowCodes = new Set(threats.map((t) => t.code));
  const fixed = [...prevCodes].filter((c) => !nowCodes.has(c));
  const appeared = [...nowCodes].filter((c) => !prevCodes.has(c));
  const titleOf = (code: string) =>
    threats.find((t) => t.code === code)?.title
    || (prevPayload?.allThreats || []).find((t) => t.code === code)?.title
    || code;

  const L = словарьДля(scan.locale);
  const SEV: Record<string, string> = {
    critical: L.sevCritical, serious: L.sevSerious, moderate: L.sevModerate, advisory: L.sevAdvisory,
  };
  const COLOR: Record<string, string> = {
    critical: '#b91c1c', serious: '#c2410c', moderate: '#a16207', advisory: '#4b5563',
  };

  const row = (t: typeof threats[number]) => {
    const j = jurisdictionOf(t.code);
    return `<tr>
      <td class="c">${esc(t.code)}</td>
      <td><b>${esc(t.title)}</b><div class="ev">${esc(t.evidence).slice(0, 400)}</div></td>
      <td class="s" style="color:${COLOR[t.severity] || '#4b5563'};font-weight:700">${SEV[t.severity] || esc(t.severity)}</td>
      <td class="j">${esc(j.region)}<div class="law">${t.lawKind && t.lawUrl
        ? `<a href="${esc(t.lawUrl)}" target="_blank" rel="noopener">${esc(t.lawName)}</a><div style="white-space:normal;max-width:62mm;font-weight:600;color:#b91c1c">${esc(t.fineAmount)}</div>`
        : esc(j.law)}</div></td>
    </tr>`;
  };

  const verifyUrl = `https://aifa.works/audit-verify?id=${encodeURIComponent(scan.id)}`;
  let qrDataUrl = '';
  try {
    qrDataUrl = await QRCode.toDataURL(verifyUrl, {
      width: 140,
      margin: 1,
      color: { dark: '#030711', light: '#ffffff' },
    });
  } catch (err) {
    console.warn('[report] QR Code generation fallback:', err);
  }

  const метка = req.headers.get('x-nonce') || '';
  const атрибутМетки = метка ? ` nonce="${метка.replace(/"/g, '')}"` : '';

  const autoPrint = req.nextUrl.searchParams.get('print') === '1';

  const html = `<!doctype html><html lang="${esc(scan.locale)}"><head><meta charset="utf-8">
<title>${esc(L.titleTag)} ${esc(scan.domain)} — ${esc(scan.id)}</title>
<style${атрибутМетки}>
  @page { size: A4; margin: 14mm 14mm 16mm 14mm; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #111827; font-size: 10pt; line-height: 1.45; background: #fff; margin: 0; padding: 10px; }
  .report-sheet { max-width: 210mm; margin: 0 auto; }
  h1 { font-size: 18pt; margin: 0 0 2mm; color: #030711; letter-spacing: -0.02em; }
  h2 { font-size: 12pt; margin: 6mm 0 2.5mm; border-bottom: 1.5px solid #06b6d4; padding-bottom: 1.5mm; text-transform: uppercase; letter-spacing: 0.05em; color: #0f172a; }
  .sub { color: #475569; font-size: 9.5pt; margin-bottom: 5mm; }
  .grid { display: flex; gap: 6mm; margin: 4mm 0 5mm; }
  .box { flex: 1; border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 3.5mm 4mm; background: #f8fafc; }
  .score { font-size: 24pt; font-weight: 800; line-height: 1; color: #0284c7; }
  .lbl { font-size: 7.5pt; text-transform: uppercase; letter-spacing: .08em; color: #64748b; font-weight: 700; margin-bottom: 1.5mm; }
  table { width: 100%; border-collapse: collapse; margin-top: 2.5mm; font-size: 9pt; }
  th { text-align: left; font-size: 8pt; text-transform: uppercase; letter-spacing: .06em; color: #475569; border-bottom: 1.5px solid #cbd5e1; padding: 2mm 2mm; background: #f1f5f9; }
  td { border-bottom: 1px solid #f1f5f9; padding: 2.5mm 2mm; vertical-align: top; }
  td.c { font-family: ui-monospace, Consolas, monospace; font-size: 8.5pt; white-space: nowrap; font-weight: 700; color: #0369a1; }
  td.s { white-space: nowrap; font-size: 8.5pt; text-transform: uppercase; }
  td.j { font-size: 8.5pt; color: #334155; }
  .law { color: #64748b; font-size: 8pt; margin-top: 1mm; }
  .ev { color: #334155; font-size: 8.5pt; margin-top: 1mm; font-family: ui-monospace, Consolas, monospace; background: #f8fafc; padding: 2px 4px; border-radius: 4px; border: 1px solid #e2e8f0; }
  .note { background: #f8fafc; border-left: 4px solid #06b6d4; padding: 3mm 4mm; font-size: 9pt; color: #334155; margin: 3.5mm 0; border-radius: 0 6px 6px 0; }
  .roadmap { background: #f0fdfa; border: 1.5px solid #99f6e4; border-radius: 8px; padding: 4mm 5mm; margin: 4mm 0; font-size: 9pt; }
  .roadmap-step { margin-bottom: 2mm; color: #134e4a; }
  .cert-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #030711; padding-bottom: 4mm; margin-bottom: 5mm; }
  .seal-card { display: flex; align-items: center; gap: 3mm; border: 1.5px solid #cbd5e1; padding: 2.5mm 3.5mm; border-radius: 8px; background: #ffffff; text-align: center; }
  .seal-badge { font-size: 7pt; font-weight: 800; text-transform: uppercase; color: #0284c7; letter-spacing: 0.05em; line-height: 1.3; }
  footer { margin-top: 8mm; border-top: 1.5px solid #e2e8f0; padding-top: 3mm; font-size: 8pt; color: #64748b; line-height: 1.4; }
  @media print { 
    .noprint { display: none !important; }
    body { padding: 0 !important; background: #fff !important; }
    .report-sheet { max-width: 100% !important; margin: 0 !important; }
  }
</style>
${autoPrint ? `<script${атрибутМетки}>window.addEventListener('load', function() { setTimeout(function() { window.print(); }, 400); });</script>` : ''}
</head><body>

<div class="report-sheet">

<!-- Interactive Top Toolbar (Screen Only) -->
<div class="noprint" style="background:#030711;color:#fff;padding:12px 18px;border-radius:10px;margin-bottom:20px;border:1px solid rgba(255,255,255,0.15);box-shadow:0 10px 25px rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
  <div style="display:flex;align-items:center;gap:10px;">
    <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:#00E5FF;box-shadow:0 0 10px #00E5FF"></span>
    <b style="font-size:11pt;color:#fff">${esc(L.officialDocTag)}</b>
    <span style="font-size:9.5pt;color:#9ca3af">· ${esc(L.printHint)}</span>
  </div>
  <div style="display:flex;align-items:center;gap:8px;">
    <button onclick="window.print()" style="background:linear-gradient(135deg,#06b6d4,#8b5cf6);color:#fff;border:none;padding:8px 16px;border-radius:6px;font-size:9.5pt;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 0 15px rgba(6,182,212,0.4)">
      🖨️ ${esc(L.savePdfBtn)}
    </button>
    <a href="/api/scan/patch?id=${esc(scan.id)}&type=css" download style="background:rgba(255,255,255,0.08);color:#00E5FF;border:1px solid rgba(0,229,255,0.3);padding:8px 14px;border-radius:6px;font-size:9.5pt;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:6px">
      ⚡ ${esc(L.downloadPatchBtn)}
    </a>
    <a href="/api/scan/fixpack?id=${esc(scan.id)}" target="_blank" rel="noopener" style="background:rgba(16,185,129,0.1);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:8px 14px;border-radius:6px;font-size:9.5pt;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:6px">
      📦 ${esc(L.fixpackBtn)}
    </a>
    <a href="${esc(verifyUrl)}" target="_blank" rel="noopener" style="background:rgba(255,255,255,0.05);color:#d1d5db;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:6px;font-size:9.5pt;text-decoration:none;display:inline-flex;align-items:center;gap:6px">
      🛡️ ${esc(L.verifyBtn)}
    </a>
  </div>
</div>

<!-- Header with Seal and QR -->
<div class="cert-header">
  <div style="max-width:68%">
    <div style="font-size:8.5pt;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:1mm">
      AIfaFocus · CODE Eternal Compliance Infrastructure
    </div>
    <h1>${esc(L.title)}</h1>
    <div class="sub" style="margin-bottom:0">
      ${esc(L.object)}: <b style="font-size:11pt;color:#0f172a">${esc(scan.domain)}</b><br>
      ${esc(L.scanNumber)}: <b style="font-family:ui-monospace,Consolas,monospace">${esc(scan.id)}</b> · 
      ${esc(L.scanDate)}: ${new Date(scan.createdAt).toLocaleString(scan.locale === 'ru' ? 'ru-RU' : scan.locale === 'es' ? 'es-ES' : scan.locale === 'zh' ? 'zh-CN' : 'en-US')}
    </div>
  </div>

  <div class="seal-card">
    ${qrDataUrl ? `<img src="${qrDataUrl}" width="80" height="80" alt="Verification QR Code" style="display:block;border-radius:4px" />` : ''}
    <div style="text-align:left">
      <div class="seal-badge">AUDIT<br>RECORD</div>
      <div style="font-size:7pt;color:#64748b;margin-top:2px">ID: ${esc(scan.id.slice(0, 12))}...</div>
      <div style="font-size:6.5pt;color:#059669;font-weight:700;margin-top:2px">● REGISTERED</div>
    </div>
  </div>
</div>

<!-- Key Metrics Grid -->
<div class="grid">
  <div class="box"><div class="lbl">${esc(L.score)}</div><div class="score">${scan.score}<span style="font-size:11pt;color:#64748b;font-weight:400">/100</span></div></div>
  <div class="box"><div class="lbl">${esc(L.totalFindings)}</div><div class="score" style="color:#b91c1c">${threats.length}</div></div>
  <div class="box"><div class="lbl">${esc(L.proven)}</div><div class="score" style="color:#dc2626">${proven.length}</div></div>
</div>

<!-- Scope & Regulatory Standards -->
<div class="note">
  <div style="font-size:8pt;font-weight:700;text-transform:uppercase;color:#0369a1;margin-bottom:1mm">${esc(L.standardsHeader)}</div>
  <div style="font-size:8.5pt;color:#334155;margin-bottom:1.5mm">${esc(L.standardsList)}</div>
  <b>${esc(L.howToRead)}</b> ${L.howToReadBody((payload?.scannedPages || []).length || 1, L.pageWord((payload?.scannedPages || []).length || 1))}
</div>

${prev ? `<h2>${esc(L.whatChanged)}</h2>
<div class="sub" style="margin-bottom:2mm">
  ${esc(L.prevScan)}: <b>${esc(prev.id)}</b> ${esc(L.from)} ${new Date(prev.createdAt).toLocaleString(scan.locale === 'ru' ? 'ru-RU' : scan.locale === 'es' ? 'es-ES' : scan.locale === 'zh' ? 'zh-CN' : 'en-US')} ·
  ${esc(L.scoreWas)} <b>${prev.score}</b>, ${esc(L.scoreBecame)} <b>${scan.score}</b>
  ${scan.score > prev.score ? `<span style="color:#047857;font-weight:700">(+${scan.score - prev.score})</span>`
    : scan.score < prev.score ? `<span style="color:#b91c1c;font-weight:700">(${scan.score - prev.score})</span>`
    : esc(L.noChange)}
</div>
${fixed.length ? `<div class="note" style="border-left-color:#059669;background:#f0fdf4">
  <b style="color:#047857">${esc(L.fixed)} (${fixed.length}):</b> ${fixed.map((c) => `${esc(c)} — ${esc(titleOf(c))}`).join('; ')}
</div>` : ''}
${appeared.length ? `<div class="note" style="border-left-color:#dc2626;background:#fef2f2">
  <b style="color:#b91c1c">${esc(L.appeared)} (${appeared.length}):</b> ${appeared.map((c) => `${esc(c)} — ${esc(titleOf(c))}`).join('; ')}
</div>` : ''}
${!fixed.length && !appeared.length ? `<p style="font-size:8.5pt;color:#64748b">${esc(L.noChangeInFindings)}</p>` : ''}
` : ''}

<!-- Proven Findings Table -->
<h2>${esc(L.provenFindings)} (${proven.length})</h2>
${proven.length ? `<table><thead><tr><th style="width:12%">${esc(L.code)}</th><th style="width:48%">${esc(L.findingAndEvidence)}</th><th style="width:14%">${esc(L.severity)}</th><th style="width:26%">${esc(L.jurisdiction)}</th></tr></thead>
<tbody>${proven.map(row).join('')}</tbody></table>` : `<p style="font-size:9pt;color:#047857">${esc(L.noProvenFindings)}</p>`}

<!-- Needs Confirmation Table -->
${assumed.length ? `<h2>${esc(L.needsConfirmation)} (${assumed.length})</h2>
<table><thead><tr><th style="width:12%">${esc(L.code)}</th><th style="width:48%">${esc(L.finding)}</th><th style="width:14%">${esc(L.severity)}</th><th style="width:26%">${esc(L.jurisdiction)}</th></tr></thead>
<tbody>${assumed.map(row).join('')}</tbody></table>` : ''}

<!-- Remediation Roadmap & Commercial Upsell -->
<h2>${esc(L.remediationTitle)}</h2>
<div class="roadmap">
  <div class="roadmap-step">${L.remediationStep1}</div>
  <div class="roadmap-step">${L.remediationStep2}</div>
  <div class="roadmap-step" style="margin-bottom:0">${L.remediationStep3}</div>
</div>

<!-- Document Footer with Attestation -->
<footer>
  <div style="display:flex;justify-content:space-between;align-items:flex-end">
    <div>
      ${esc(L.footerAudit)}<br>
      ${esc(L.footerImmutable)}<br>
      ${esc(L.footerExternal)}<br>
      ${esc(L.footerContact)}: contact@codeofdigitaleternity.com · https://aifa.works
    </div>
    <div style="text-align:right;font-family:ui-monospace,Consolas,monospace;font-size:7.5pt;color:#94a3b8">
      AIFA REPORT REGISTRY<br>
      VERIFY: aifa.works/audit-verify?id=${esc(scan.id)}
    </div>
  </div>
</footer>

</div>
</body></html>`;

  const wantDownload = req.nextUrl.searchParams.get('download') === '1';
  const headers: Record<string, string> = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'private, max-age=300',
  };
  if (wantDownload) {
    headers['Content-Disposition'] = `attachment; filename="aifa-audit-report-${id}.html"`;
  }

  return new NextResponse(html, { headers });
}
