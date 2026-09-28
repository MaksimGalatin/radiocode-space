/**
 * ДЕТЕРМИНИРОВАННЫЙ СКАНЕР WCAG (AIfaFocus v2 Scanner Engine)
 *
 * Требования B1 и B2 задания AIfa от 28.09.2026:
 * - Каждая находка снабжается доказательством:
 *   * pageUrl: точный URL страницы
 *   * selector: устойчивый CSS-селектор элемента
 *   * outerHtml: фрагмент исходного HTML элемента (до 300 символов)
 * - 12 детерминированных проверок WCAG:
 *   1. img без alt (WCAG-1.1.1-IMG-ALT)
 *   2. Поле формы без подписи (WCAG-1.3.1-FORM-LABEL)
 *   3. Ссылка без доступного имени (WCAG-2.4.4-LINK-NAME) и кнопка (WCAG-4.1.2-BTN-NAME)
 *   4. Пустой заголовок (WCAG-1.3.1-EMPTY-HEADING)
 *   5. Пропуск уровня заголовка (WCAG-1.3.1-HEADING-ORDER)
 *   6. Повторяющийся id (WCAG-4.1.1-DUPLICATE-ID)
 *   7. Нет или пустой <title> (WCAG-2.4.2-PAGE-TITLE)
 *   8. iframe без title (WCAG-4.1.2-IFRAME-TITLE)
 *   9. tabindex > 0 (WCAG-2.4.3-POSITIVE-TABINDEX)
 *   10. autoplay у audio/video (WCAG-1.4.2-AUDIO-AUTOPLAY)
 *   11. aria-hidden на фокусируемом элементе (WCAG-4.1.2-ARIA-HIDDEN-FOCUS)
 *   12. Таблица данных без th (WCAG-1.3.1-TABLE-HEADERS)
 * - Тексты всех находок и рекомендаций на 4 языках (ru, en, es, zh).
 */

import * as cheerio from 'cheerio';
import { имеетДоступноеИмя } from './accessible-name';

export type A11ySeverity = 'critical' | 'serious' | 'moderate' | 'advisory';

export interface A11yPageFinding {
  id: number;
  code: string;
  title: string;
  description: string;
  severity: A11ySeverity;
  category: 'accessibility' | 'security' | 'compliance';
  evidence: string;
  pageUrl: string;
  selector: string;
  outerHtml: string;
  remedy: string;
  standard: string;
  lawName: string;
  lawUrl: string;
  fineAmount: string;
  consequence: string;
  proven: boolean;
}

export type ScannerLocale = 'ru' | 'en' | 'es' | 'zh';

/**
 * Построение устойчивого и наглядного CSS-селектора для элемента в Cheerio
 */
export function getElementSelector($: cheerio.CheerioAPI, el: any): string {
  if (!el || el.type !== 'tag') return '';
  const $el = $(el);
  const tag = el.tagName.toLowerCase();

  // 1. Уникальный ID
  const id = $el.attr('id');
  if (id && !/^\d/.test(id) && !/\s/.test(id)) {
    try {
      if ($(`[id="${id.replace(/"/g, '\\"')}"]`).length === 1) {
        return `${tag}#${id}`;
      }
    } catch {}
  }

  // 2. Атрибут name для элементов форм
  const name = $el.attr('name');
  if (name && ['input', 'select', 'textarea', 'button', 'form'].includes(tag)) {
    return `${tag}[name="${name.replace(/"/g, '\\"')}"]`;
  }

  // 3. Классы
  const classAttr = $el.attr('class') || '';
  const classes = classAttr
    .trim()
    .split(/\s+/)
    .filter((c) => c && !c.includes(':') && !c.includes('/') && !c.includes('[') && !c.includes(']'))
    .slice(0, 2);
  let base = classes.length > 0 ? `${tag}.${classes.join('.')}` : tag;

  // 4. Дополнение родителем для контекста
  const parent = $el.parent();
  if (parent && parent.length && parent[0].type === 'tag' && parent[0].tagName.toLowerCase() !== 'html') {
    const parentTag = parent[0].tagName.toLowerCase();
    const parentId = parent.attr('id');
    if (parentId && !/\s/.test(parentId)) {
      return `${parentTag}#${parentId} > ${base}`;
    }
    const idx = $el.index();
    if (idx >= 0) {
      base = `${base}:nth-child(${idx + 1})`;
    }
    if (parentTag !== 'body') {
      return `${parentTag} > ${base}`;
    }
  }

  return base;
}

/**
 * Извлечение фрагмента outerHTML (до maxLength знаков)
 */
export function getOuterHtmlSnippet($: cheerio.CheerioAPI, el: any, maxLength = 300): string {
  try {
    const html = $.html(el) || '';
    const clean = html.replace(/\s+/g, ' ').trim();
    return clean.length > maxLength ? clean.slice(0, maxLength) + '...' : clean;
  } catch {
    return '';
  }
}

const DICT = {
  imgAlt: {
    title: {
      ru: 'Изображение без атрибута alt',
      en: 'Image Missing alt Attribute',
      es: 'Imagen sin atributo alt',
      zh: '图片缺少 alt 属性',
    },
    desc: {
      ru: 'Тег <img> не содержит атрибута alt. Программы экранного доступа вынуждены зачитывать технический URL файла.',
      en: 'The <img> element has no alt attribute. Screen readers are forced to verbalize the technical file path.',
      es: 'La etiqueta <img> no tiene atributo alt. Los lectores de pantalla verbalizan la URL del archivo.',
      zh: '<img> 标签缺少 alt 属性。屏幕朗读软件将被迫朗读图片的技术文件路径。',
    },
    remedy: {
      ru: 'Добавьте alt="[описание изображения]" для смысловой графики или alt="" для декоративных картинок.',
      en: 'Add alt="[description]" for meaningful images or alt="" for decorative images.',
      es: 'Añada alt="[descripción]" para imágenes significativas o alt="" para decorativas.',
      zh: '为传意图片添加 alt="[图片说明]"，或为纯装饰性图片添加 alt=""。',
    },
  },
  formLabel: {
    title: {
      ru: 'Поле ввода без доступной подписи (label)',
      en: 'Form Control Missing Accessible Label',
      es: 'Campo de formulario sin etiqueta accesible',
      zh: '表单控件缺少无障碍标签',
    },
    desc: {
      ru: 'Элемент формы не связан с тегом <label>, не имеет aria-label или aria-labelledby. Незрячий пользователь не знает, что вводить.',
      en: 'Form control is not associated with a <label>, aria-label or aria-labelledby. Screen reader users cannot determine the expected input.',
      es: 'El campo de formulario no está asociado a <label>, aria-label o aria-labelledby.',
      zh: '表单控件未关联 <label>，且缺少 aria-label 或 aria-labelledby。视障用户无法知晓应输入什么内容。',
    },
    remedy: {
      ru: 'Свяжите поле с <label for="id">, оберните в <label> или добавьте атрибут aria-label.',
      en: 'Associate control with <label for="id">, wrap inside <label>, or provide an aria-label attribute.',
      es: 'Asocie el campo con <label for="id">, envuélvalo en <label> o añada aria-label.',
      zh: '使用 <label for="id"> 关联控件、用 <label> 包裹，或添加 aria-label 属性。',
    },
  },
  linkName: {
    title: {
      ru: 'Ссылка без доступного текстового имени',
      en: 'Link Missing Accessible Name',
      es: 'Enlace sin nombre accesible',
      zh: '链接缺少可访问的文本名称',
    },
    desc: {
      ru: 'Ссылка <a> не содержит текста, атрибута aria-label или изображения с alt. Навигация по ссылкам для скринридера становится невозможной.',
      en: 'The <a> link contains no text, aria-label, or image with alt. Screen reader users cannot discern the link destination.',
      es: 'El enlace <a> no contiene texto, aria-label ni imagen con alt.',
      zh: '<a> 链接不包含文本内容、aria-label 或带 alt 的图片。屏幕朗读用户无法获知跳转目的。',
    },
    remedy: {
      ru: 'Добавьте понятный текст внутри ссылки или укажите aria-label="[цель перехода]".',
      en: 'Add descriptive text inside the link or provide an aria-label="[destination]" attribute.',
      es: 'Añada texto descriptivo dentro del enlace o un atributo aria-label.',
      zh: '在链接内添加描述性文字，或指定 aria-label="[目标描述]"。',
    },
  },
  btnName: {
    title: {
      ru: 'Кнопка без доступного текстового имени',
      en: 'Button Missing Accessible Name',
      es: 'Botón sin nombre accesible',
      zh: '按钮缺少可访问的文本名称',
    },
    desc: {
      ru: 'Кнопка содержит только графическую иконку без текста и без aria-label. Скринридер объявляет её просто как «кнопка».',
      en: 'Button contains only icon graphics without text or aria-label. Screen readers announce it merely as "button".',
      es: 'El botón contiene solo un icono gráfico sin texto ni aria-label.',
      zh: '按钮仅包含图形图标，没有文本也没有 aria-label。屏幕朗读软件只能报出“按钮”。',
    },
    remedy: {
      ru: 'Укажите понятное действие в атрибуте aria-label="[действие]" (например: «Поиск», «Закрыть меню»).',
      en: 'Specify clear action in aria-label="[action]" (e.g. "Search", "Close menu").',
      es: 'Especifique la acción en el atributo aria-label="[acción]".',
      zh: '在 aria-label="[操作]" 属性中明确指定操作（例如：“搜索”、“关闭菜单”）。',
    },
  },
  emptyHeading: {
    title: {
      ru: 'Пустой заголовок',
      en: 'Empty Heading',
      es: 'Encabezado vacío',
      zh: '空标题',
    },
    desc: {
      ru: 'Тег заголовка (h1–h6) присутствует в коде, но не содержит видимого или доступного текста.',
      en: 'Heading tag (h1–h6) exists in markup but contains no visible or accessible text.',
      es: 'La etiqueta de encabezado (h1–h6) existe pero no contiene texto accesible.',
      zh: '标题标签（h1–h6）存在于代码中，但没有任何可见或可访问的文本内容。',
    },
    remedy: {
      ru: 'Удалите пустой тег заголовка либо наполните его содержательным текстом.',
      en: 'Remove the empty heading tag or add meaningful text.',
      es: 'Elimine la etiqueta vacía o añada texto significativo.',
      zh: '删除空标题标签，或填入具有实质意义的标题文字。',
    },
  },
  headingOrder: {
    title: {
      ru: 'Нарушение иерархии заголовков (пропущен уровень)',
      en: 'Heading Hierarchy Order Skipped',
      es: 'Nivel de jerarquía de encabezado omitido',
      zh: '标题层级顺序跳跃',
    },
    desc: {
      ru: 'Уровень заголовка увеличился более чем на 1 ступень (например, h1 сразу сменился на h3). Это ломает структуру оглавления для скринридеров.',
      en: 'Heading level increased by more than 1 step (e.g. h1 immediately followed by h3), breaking document navigation.',
      es: 'El nivel de encabezado aumentó en más de 1 paso (por ejemplo, h1 seguido de h3).',
      zh: '标题级别跨越了 1 级以上（例如 h1 直接跳到 h3），破坏了文档大纲导航。',
    },
    remedy: {
      ru: 'Соблюдайте последовательную вложенность уровней: h1 -> h2 -> h3.',
      en: 'Follow sequential heading nesting: h1 -> h2 -> h3.',
      es: 'Siga una anidación secuencial: h1 -> h2 -> h3.',
      zh: '遵循循序渐进的标题层级结构：h1 -> h2 -> h3。',
    },
  },
  duplicateId: {
    title: {
      ru: 'Повторяющийся идентификатор id',
      en: 'Duplicate Element id Attribute',
      es: 'Identificador id duplicado',
      zh: '重复的元素 id 属性',
    },
    desc: {
      ru: 'В DOM присутствует несколько элементов с одинаковым значением id. Это нарушает спецификацию HTML и ломает связь label/aria-labelledby.',
      en: 'Multiple elements share the same id attribute, breaking HTML specifications and label/aria associations.',
      es: 'Múltiples elementos comparten el mismo atributo id.',
      zh: 'DOM 中存在多个相同 id 的元素，这违反了 HTML 规范并会破坏 label/aria 关联。',
    },
    remedy: {
      ru: 'Сделайте значение id уникальным в пределах всей страницы.',
      en: 'Ensure every id attribute is unique within the entire document.',
      es: 'Asegúrese de que cada id sea único en la página.',
      zh: '确保整个网页中每个 id 属性的值都是全局唯一的。',
    },
  },
  pageTitle: {
    title: {
      ru: 'Отсутствует или пуст заголовок страницы <title>',
      en: 'Missing or Empty Document <title>',
      es: 'Elemento <title> ausente o vacío',
      zh: '缺少或为空的网页 <title>',
    },
    desc: {
      ru: 'В секции <head> отсутствует тег <title> или он пуст. Пользователь не может быстро идентифицировать вкладку.',
      en: 'The <head> element has no <title> or it is empty. Users cannot identify the page when switching tabs.',
      es: 'Falta la etiqueta <title> en <head> o está vacía.',
      zh: '<head> 中缺少 <title> 标签或其内容为空。用户在切换标签页时无法辨识网页内容。',
    },
    remedy: {
      ru: 'Добавьте в <head> информативный тег <title>Название страницы — Название сайта</title>.',
      en: 'Add a descriptive <title>Page Title — Site Name</title> inside <head>.',
      es: 'Añada un <title> descriptivo dentro de <head>.',
      zh: '在 <head> 中添加说明性的 <title>页面标题 — 网站名称</title>。',
    },
  },
  iframeTitle: {
    title: {
      ru: 'Фрейм iframe без атрибута title',
      en: 'Inline Frame (iframe) Missing title Attribute',
      es: 'Marco iframe sin atributo title',
      zh: 'iframe 框架缺少 title 属性',
    },
    desc: {
      ru: 'Тег <iframe> не имеет атрибута title. Скринридер не может сообщить пользователю назначение встроенного фрейма.',
      en: 'The <iframe> element lacks a title attribute. Screen readers cannot describe the purpose of embedded content.',
      es: 'El elemento <iframe> carece de atributo title.',
      zh: '<iframe> 标签缺少 title 属性。屏幕朗读软件无法向用户说明嵌入框架的作用。',
    },
    remedy: {
      ru: 'Укажите понятный атрибут title="[содержимое фрейма]" (например: «Виджет карты», «Видеоплеер»).',
      en: 'Add a descriptive title attribute, e.g. title="Interactive Map" or title="Video Player".',
      es: 'Añada un atributo title descriptivo al <iframe>.',
      zh: '添加清晰的 title 属性，例如 title="互动地图" 或 title="视频播放器"。',
    },
  },
  tabindex: {
    title: {
      ru: 'Положительный tabindex нарушает порядок обхода',
      en: 'Positive tabindex Disrupts Natural Focus Navigation',
      es: 'tabindex positivo interrumpe el orden de navegación',
      zh: '正数 tabindex 破坏键盘导航自然顺序',
    },
    desc: {
      ru: 'Атрибут tabindex > 0 принудительно ломает порядок обхода клавиатурой, заставляя фокус прыгать по странице.',
      en: 'tabindex > 0 forces focus out of natural DOM sequence, causing erratic keyboard jumps.',
      es: 'tabindex > 0 rompe el orden de navegación natural del teclado.',
      zh: 'tabindex > 0 强制改变了自然 DOM 顺序，导致键盘焦点发生突兀跳跃。',
    },
    remedy: {
      ru: 'Замените tabindex > 0 на естественный порядок элементов в DOM либо используйте tabindex="0".',
      en: 'Remove positive tabindex; rely on natural DOM order or tabindex="0".',
      es: 'Elimine el tabindex positivo y use el orden DOM natural o tabindex="0".',
      zh: '移除正数 tabindex；依赖自然 DOM 顺序或使用 tabindex="0"。',
    },
  },
  autoplay: {
    title: {
      ru: 'Автовоспроизведение аудио/видео без управления',
      en: 'Audio/Video Autoplay Without User Control',
      es: 'Reproducción automática de audio/video sin control',
      zh: '音视频自动播放且未经用户同意',
    },
    desc: {
      ru: 'Медиа-элемент воспроизводит звук автоматически при загрузке страницы, перебивая звук скринридера.',
      en: 'Media element plays audio automatically upon page load, drowning out screen reader output.',
      es: 'El elemento reproduce audio automáticamente, interfiriendo con el lector de pantalla.',
      zh: '媒体元素在网页加载时自动播放声音，干扰屏幕朗读软件的声音。',
    },
    remedy: {
      ru: 'Отключите атрибут autoplay, либо добавьте атрибут muted и кнопки ручного управления.',
      en: 'Disable autoplay attribute or add muted with explicit playback controls.',
      es: 'Desactive el atributo autoplay o añada muted y controles de reproducción.',
      zh: '移除 autoplay 属性，或添加 muted 并提供明确的播放控制按钮。',
    },
  },
  ariaHiddenFocus: {
    title: {
      ru: 'Фокусируемый элемент скрыт атрибутом aria-hidden',
      en: 'Focusable Element Hidden by aria-hidden="true"',
      es: 'Elemento enfocable oculto por aria-hidden="true"',
      zh: '可聚焦元素被 aria-hidden="true" 隐藏',
    },
    desc: {
      ru: 'Интерактивный элемент (ссылка, кнопка, инпут) доступен для клавиатуры, но помечен aria-hidden="true". Это создает ловушку-невидимку.',
      en: 'An interactive focusable element is navigable via keyboard but flagged aria-hidden="true", creating an invisible ghost trap.',
      es: 'Elemento enfocable oculto con aria-hidden="true", invisible para lectores de pantalla.',
      zh: '互动元素可通过键盘聚焦，却被标记了 aria-hidden="true"，形成了不可见的幽灵焦点陷阱。',
    },
    remedy: {
      ru: 'Удалите aria-hidden="true" с фокусируемого элемента или добавьте tabindex="-1", если элемент не предназначен для фокуса.',
      en: 'Remove aria-hidden="true" or set tabindex="-1" if the element is not interactive.',
      es: 'Elimine aria-hidden="true" o añada tabindex="-1".',
      zh: '从可聚焦元素上移除 aria-hidden="true"，或如果无需聚焦则设置 tabindex="-1"。',
    },
  },
  tableHeaders: {
    title: {
      ru: 'Таблица данных без ячеек заголовков <th>',
      en: 'Data Table Missing Header Cells (<th>)',
      es: 'Tabla de datos sin celdas de encabezado (<th>)',
      zh: '数据表格缺少表头单元格 (<th>)',
    },
    desc: {
      ru: 'Таблица содержит строки данных, но не имеет ни одной ячейки <th>. Программа экранного доступа не может связать данные со столбцами.',
      en: 'Table contains multiple data rows but lacks any <th> header cells. Screen readers cannot associate data cells with column names.',
      es: 'La tabla de datos no tiene celdas de encabezado <th>.',
      zh: '表格包含多行数据，但没有 <th> 表头单元格。屏幕朗读软件无法将单元格数据与列名关联。',
    },
    remedy: {
      ru: 'Добавьте теги <th scope="col"> в первой строке таблицы. Для чисто макетных таблиц укажите role="presentation".',
      en: 'Add <th scope="col"> to the header row, or add role="presentation" if the table is for layout only.',
      es: 'Añada <th scope="col"> en la primera fila o role="presentation" para tablas de diseño.',
      zh: '在表格首行添加 <th scope="col"> 标签；如为纯布局表格，请添加 role="presentation"。',
    },
  },
};

/**
 * Запуск 12 детерминированных проверок WCAG по HTML конкретной страницы
 */
export function runA11yPageScan(
  html: string,
  pageUrl: string,
  locale: string = 'en'
): A11yPageFinding[] {
  if (!html || typeof html !== 'string') return [];
  const lang: ScannerLocale = (['ru', 'en', 'es', 'zh'].includes(locale.toLowerCase())
    ? locale.toLowerCase()
    : 'en') as ScannerLocale;

  const $ = cheerio.load(html);
  const findings: A11yPageFinding[] = [];
  let baseId = 910000;

  // ── 1. img без alt (WCAG-1.1.1-IMG-ALT) ──────────────────────────────────
  $('img:not([alt])').each((_, el) => {
    const selector = getElementSelector($, el);
    const outerHtml = getOuterHtmlSnippet($, el);
    findings.push({
      id: baseId++,
      code: 'WCAG-1.1.1-IMG-ALT',
      title: DICT.imgAlt.title[lang],
      description: DICT.imgAlt.desc[lang],
      severity: 'serious',
      category: 'accessibility',
      evidence: `Селектор: ${selector} | outerHTML: ${outerHtml}`,
      pageUrl,
      selector,
      outerHtml,
      remedy: DICT.imgAlt.remedy[lang],
      standard: 'WCAG 2.1 SC 1.1.1 Non-text Content (A)',
      lawName: 'ADA Title III / Section 508 / EAA',
      lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
      fineAmount: '$75,000 / €100,000',
      consequence: 'Нарушение доступности графического контента',
      proven: true,
    });
  });

  // ── 2. Поле формы без подписи (WCAG-1.3.1-FORM-LABEL) ────────────────────
  $('input:not([type="hidden"]):not([type="submit"]):not([type="reset"]):not([type="button"]):not([type="image"]), select, textarea').each((_, el) => {
    const $el = $(el);
    if ($el.attr('aria-hidden') === 'true' || $el.closest('[aria-hidden="true"]').length > 0) return;
    if ($el.attr('tabindex') === '-1' && /display\s*:\s*none|visibility\s*:\s*hidden/i.test($el.attr('style') || '')) return;

    const wrapped = $el.closest('label').length > 0;
    const ariaLabel = ($el.attr('aria-label') || '').trim();
    const ariaLabelledby = ($el.attr('aria-labelledby') || '').trim();
    const id = ($el.attr('id') || '').trim();
    const hasForLabel = id && $(`label[for="${id.replace(/"/g, '\\"')}"]`).text().trim().length > 0;
    const title = ($el.attr('title') || '').trim();

    if (!wrapped && !ariaLabel && !ariaLabelledby && !hasForLabel && !title) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-1.3.1-FORM-LABEL',
        title: DICT.formLabel.title[lang],
        description: DICT.formLabel.desc[lang],
        severity: 'critical',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.formLabel.remedy[lang],
        standard: 'WCAG 2.1 SC 1.3.1 Info & Relationships (A) / SC 4.1.2 (A)',
        lawName: 'ADA Title III / Section 508 / EAA',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
        fineAmount: '$75,000 / €100,000',
        consequence: 'Недоступность формы для скринридеров',
        proven: true,
      });
    }
  });

  // ── 3. Ссылки и кнопки без доступного имени ──────────────────────────────
  // Ссылки: только <a> с href (HTML-AAM), проверка через W3C accname 1.2
  $('a[href]').each((_, el) => {
    if (!имеетДоступноеИмя($, el)) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-2.4.4-LINK-NAME',
        title: DICT.linkName.title[lang],
        description: DICT.linkName.desc[lang],
        severity: 'serious',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.linkName.remedy[lang],
        standard: 'WCAG 2.1 SC 2.4.4 Link Purpose (In Context) (A)',
        lawName: 'ADA Title III / Section 508',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html',
        fineAmount: '$75,000 / €100,000',
        consequence: 'Пустая интерактивная ссылка',
        proven: true,
      });
    }
  });

  // Кнопки: проверка через W3C accname 1.2
  $('button, [role="button"]').each((_, el) => {
    if (!имеетДоступноеИмя($, el)) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-4.1.2-BTN-NAME',
        title: DICT.btnName.title[lang],
        description: DICT.btnName.desc[lang],
        severity: 'serious',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.btnName.remedy[lang],
        standard: 'WCAG 2.1 SC 4.1.2 Name, Role, Value (A)',
        lawName: 'ADA Title III / Section 508 / EAA',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
        fineAmount: '$75,000 / €100,000',
        consequence: 'Безымянный интерактивный элемент',
        proven: true,
      });
    }
  });

  // ── 4. Пустой заголовок (WCAG-1.3.1-EMPTY-HEADING) ─────────────────────────
  $('h1, h2, h3, h4, h5, h6, [role="heading"]').each((_, el) => {
    const $el = $(el);
    const text = $el.text().trim();
    const ariaLabel = ($el.attr('aria-label') || '').trim();
    const hasImgAlt = $el.find('img[alt]').filter((__, img) => Boolean($(img).attr('alt')?.trim())).length > 0;

    if (!text && !ariaLabel && !hasImgAlt) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-1.3.1-EMPTY-HEADING',
        title: DICT.emptyHeading.title[lang],
        description: DICT.emptyHeading.desc[lang],
        severity: 'moderate',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.emptyHeading.remedy[lang],
        standard: 'WCAG 2.1 SC 1.3.1 Info and Relationships (A)',
        lawName: 'Section 508 / ADA Title III',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
        fineAmount: '$50,000 / €60,000',
        consequence: 'Пустой заголовок ломает навигацию скринридера',
        proven: true,
      });
    }
  });

  // ── 5. Пропуск уровня заголовка (WCAG-1.3.1-HEADING-ORDER) ────────────────
  let prevHeadingLevel = 0;
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    const levelMatch = el.tagName.match(/^h([1-6])$/i);
    if (!levelMatch) return;
    const currentLevel = parseInt(levelMatch[1], 10);
    if (prevHeadingLevel > 0 && currentLevel > prevHeadingLevel + 1) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-1.3.1-HEADING-ORDER',
        title: DICT.headingOrder.title[lang],
        description: `${DICT.headingOrder.desc[lang]} (h${prevHeadingLevel} -> h${currentLevel})`,
        severity: 'moderate',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | Пропущен уровень: h${prevHeadingLevel + 1} | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.headingOrder.remedy[lang],
        standard: 'WCAG 2.1 SC 1.3.1 Info and Relationships (A) / G141',
        lawName: 'Section 508 / Best Practice',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/general/G141.html',
        fineAmount: '$50,000 / €60,000',
        consequence: 'Нарушение логической иерархии документа',
        proven: true,
      });
    }
    prevHeadingLevel = currentLevel;
  });

  // ── 6. Повторяющийся id (WCAG-4.1.1-DUPLICATE-ID) ─────────────────────────
  // Игнорируем внутренние графические определения SVG (<defs>), не попадающие в accessibility tree (SVG-AAM)
  const idCounts = new Map<string, any[]>();
  $('[id]').not('defs [id], svg defs [id]').each((_, el) => {
    const rawId = ($(el).attr('id') || '').trim();
    if (!rawId) return;
    const list = idCounts.get(rawId) || [];
    list.push(el);
    idCounts.set(rawId, list);
  });

  idCounts.forEach((elements, idVal) => {
    if (elements.length > 1) {
      // Регистрируем нарушения для повторяющихся элементов начиная со второго
      for (let i = 1; i < elements.length; i++) {
        const el = elements[i];
        const selector = getElementSelector($, el);
        const outerHtml = getOuterHtmlSnippet($, el);
        findings.push({
          id: baseId++,
          code: 'WCAG-4.1.1-DUPLICATE-ID',
          title: DICT.duplicateId.title[lang],
          description: `${DICT.duplicateId.desc[lang]} (id="${idVal}", повторов: ${elements.length})`,
          severity: 'serious',
          category: 'accessibility',
          evidence: `Селектор: ${selector} | Дубликат id="${idVal}" (всего ${elements.length}) | outerHTML: ${outerHtml}`,
          pageUrl,
          selector,
          outerHtml,
          remedy: DICT.duplicateId.remedy[lang],
          standard: 'WCAG 2.1 SC 4.1.1 Parsing (A)',
          lawName: 'Section 508 / ADA Title III',
          lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
          fineAmount: '$50,000 / €60,000',
          consequence: 'Сбой привязки элементов интерфейса и форм',
          proven: true,
        });
      }
    }
  });

  // ── 7. Отсутствие или пустой <title> (WCAG-2.4.2-PAGE-TITLE) ───────────────
  const $title = $('title').first();
  if ($title.length === 0 || !$title.text().trim()) {
    findings.push({
      id: baseId++,
      code: 'WCAG-2.4.2-PAGE-TITLE',
      title: DICT.pageTitle.title[lang],
      description: DICT.pageTitle.desc[lang],
      severity: 'serious',
      category: 'accessibility',
      evidence: `Селектор: head > title | Значение: ${$title.length === 0 ? 'тег отсутствует' : 'тег пуст'}`,
      pageUrl,
      selector: 'head > title',
      outerHtml: $title.length > 0 ? getOuterHtmlSnippet($, $title[0]) : '<head></head>',
      remedy: DICT.pageTitle.remedy[lang],
      standard: 'WCAG 2.1 SC 2.4.2 Page Titled (A)',
      lawName: 'ADA Title III / Section 508 / EAA',
      lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html',
      fineAmount: '$75,000 / €100,000',
      consequence: 'Невозможность идентификации вкладки',
      proven: true,
    });
  }

  // ── 8. iframe без title (WCAG-4.1.2-IFRAME-TITLE) ──────────────────────────
  $('iframe').each((_, el) => {
    const $el = $(el);
    const title = ($el.attr('title') || '').trim();
    const ariaLabel = ($el.attr('aria-label') || '').trim();

    if (!title && !ariaLabel) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-4.1.2-IFRAME-TITLE',
        title: DICT.iframeTitle.title[lang],
        description: DICT.iframeTitle.desc[lang],
        severity: 'serious',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.iframeTitle.remedy[lang],
        standard: 'WCAG 2.1 SC 4.1.2 Name, Role, Value (A)',
        lawName: 'Section 508 / ADA Title III',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
        fineAmount: '$75,000 / €100,000',
        consequence: 'Встроенный фрейм без доступного описания',
        proven: true,
      });
    }
  });

  // ── 9. tabindex > 0 (WCAG-2.4.3-POSITIVE-TABINDEX) ────────────────────────
  $('[tabindex]').each((_, el) => {
    const raw = ($(el).attr('tabindex') || '').trim();
    const val = parseInt(raw, 10);
    if (!isNaN(val) && val > 0) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-2.4.3-POSITIVE-TABINDEX',
        title: DICT.tabindex.title[lang],
        description: `${DICT.tabindex.desc[lang]} (tabindex="${val}")`,
        severity: 'moderate',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | tabindex="${val}" | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.tabindex.remedy[lang],
        standard: 'WCAG 2.1 SC 2.4.3 Focus Order (A)',
        lawName: 'Section 508 / ADA Title III',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html',
        fineAmount: '$50,000 / €60,000',
        consequence: 'Нарушение предсказуемого порядка фокуса клавиатуры',
        proven: true,
      });
    }
  });

  // ── 10. autoplay у audio/video (WCAG-1.4.2-AUDIO-AUTOPLAY) ────────────────
  $('audio[autoplay], video[autoplay]').each((_, el) => {
    const $el = $(el);
    const isMuted = $el.attr('muted') !== undefined || Boolean($el.prop('muted'));
    if (el.tagName.toLowerCase() === 'audio' || !isMuted) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-1.4.2-AUDIO-AUTOPLAY',
        title: DICT.autoplay.title[lang],
        description: DICT.autoplay.desc[lang],
        severity: 'serious',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.autoplay.remedy[lang],
        standard: 'WCAG 2.1 SC 1.4.2 Audio Control (A)',
        lawName: 'ADA Title III / Section 508',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-control.html',
        fineAmount: '$75,000 / €100,000',
        consequence: 'Автовоспроизведение аудио мешает скринридерам',
        proven: true,
      });
    }
  });

  // ── 11. aria-hidden на клавиатурно-фокусируемом элементе (WCAG-4.1.2-ARIA-HIDDEN-FOCUS)
  // Проверяем элементы, реально доступные для фокуса с клавиатуры:
  // a[href], button, input (кроме type=hidden), select, textarea, [contenteditable], [tabindex] >= 0
  // Исключаем: disabled и tabindex < 0 (например, tabindex="-1")
  // Проверяем как сам элемент с aria-hidden="true", так и фокусируемых потомков внутри [aria-hidden="true"]
  const focusableCandidates = $('a[href], button, input:not([type="hidden"]), select, textarea, [contenteditable], [tabindex]');
  focusableCandidates.each((_, el) => {
    const $el = $(el);

    // Игнорируем шаблоны, скрипты и стили
    if ($el.closest('template, script, style').length > 0) return;

    // Исключаем отключенные элементы
    if ($el.attr('disabled') !== undefined || Boolean($el.prop('disabled'))) return;

    // Проверяем tabindex: отрицательные значения (например, tabindex="-1") исключают элемент из порядка обхода Tab
    const tabAttr = $el.attr('tabindex');
    if (tabAttr !== undefined) {
      const tabVal = parseInt(tabAttr.trim(), 10);
      if (isNaN(tabVal) || tabVal < 0) return;
    }

    // Если элемент не относится к стандартно фокусируемым тегам, проверяем contenteditable
    const tagName = (el.tagName || '').toLowerCase();
    const isStandardFocusable = ['a', 'button', 'input', 'select', 'textarea'].includes(tagName);
    if (!isStandardFocusable && tabAttr === undefined) {
      if ($el.attr('contenteditable') === 'false') return;
    }

    // Исключаем элементы, скрытые стилями/атрибутами от рендера (display: none, visibility: hidden, [hidden], классы hidden/invisible/isHidden)
    const hiddenClassRegex = /(?:^|[\s\-_])(?:is-?hidden|hidden|invisible|d-none|hide)(?:[\s\-_]|$)/i;
    const isRenderHidden = $el.is('[hidden]') ||
      $el.parents('[hidden]').length > 0 ||
      /display\s*:\s*none|visibility\s*:\s*hidden/i.test($el.attr('style') || '') ||
      $el.parents().filter((_, p) => /display\s*:\s*none|visibility\s*:\s*hidden/i.test($(p).attr('style') || '')).length > 0 ||
      hiddenClassRegex.test($el.attr('class') || '') ||
      $el.parents().filter((_, p) => hiddenClassRegex.test($(p).attr('class') || '')).length > 0;
    if (isRenderHidden) return;

    // Проверяем, скрыт ли элемент от скринридеров (сам элемент или любой его предок имеет aria-hidden="true")
    const isSelfHidden = ($el.attr('aria-hidden') || '').trim().toLowerCase() === 'true';
    const isAncestorHidden = $el.parents().filter((_, p) => ($(p).attr('aria-hidden') || '').trim().toLowerCase() === 'true').length > 0;

    if (isSelfHidden || isAncestorHidden) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-4.1.2-ARIA-HIDDEN-FOCUS',
        title: DICT.ariaHiddenFocus.title[lang],
        description: DICT.ariaHiddenFocus.desc[lang],
        severity: 'critical',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.ariaHiddenFocus.remedy[lang],
        standard: 'WCAG 2.1 SC 4.1.2 Name, Role, Value (A) / WAI-ARIA 1.2',
        lawName: 'ADA Title III / Section 508 / EAA',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
        fineAmount: '$75,000 / €100,000',
        consequence: 'Ловушка невидимого фокуса для незрячих',
        proven: true,
      });
    }
  });

  // ── 12. Таблица данных без th (WCAG-1.3.1-TABLE-HEADERS) ──────────────────
  $('table').each((_, el) => {
    const $el = $(el);
    const role = ($el.attr('role') || '').toLowerCase();
    const datatable = $el.attr('datatable');
    if (role === 'presentation' || role === 'none' || datatable === '0') return;

    const rowCount = $el.find('tr').length;
    const tdCount = $el.find('td').length;
    const thCount = $el.find('th, [role="columnheader"], [role="rowheader"]').length;

    if (rowCount >= 1 && tdCount >= 1 && thCount === 0) {
      const selector = getElementSelector($, el);
      const outerHtml = getOuterHtmlSnippet($, el);
      findings.push({
        id: baseId++,
        code: 'WCAG-1.3.1-TABLE-HEADERS',
        title: DICT.tableHeaders.title[lang],
        description: DICT.tableHeaders.desc[lang],
        severity: 'moderate',
        category: 'accessibility',
        evidence: `Селектор: ${selector} | Строк: ${rowCount}, ячеек <td>: ${tdCount}, ячеек <th>: 0 | outerHTML: ${outerHtml}`,
        pageUrl,
        selector,
        outerHtml,
        remedy: DICT.tableHeaders.remedy[lang],
        standard: 'WCAG 2.1 SC 1.3.1 Info and Relationships (A)',
        lawName: 'Section 508 / ADA Title III',
        lawUrl: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
        fineAmount: '$50,000 / €60,000',
        consequence: 'Данные таблицы не связаны с заголовками столбцов',
        proven: true,
      });
    }
  });

  return findings;
}
