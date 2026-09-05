/**
 * ОГЛАВЛЕНИЕ РАЗДЕЛА ИССЛЕДОВАНИЙ — ТЕКСТЫ НА ЧЕТЫРЁХ ЯЗЫКАХ.
 *
 * ПОВОД, 02.09.2026. Замер живыми запросами показал: три страницы раздела
 * открываются на всех четырёх языках (12 адресов из 12), а сам `/research`
 * отдаёт 404 — и тоже на всех четырёх. Причина найдена в дереве файлов:
 * подпапки `data`, `methodology`, `registry` есть, а `page.tsx` в корне
 * раздела нет.
 *
 * Чем это плохо. Человек, пришедший по ссылке на один материал, не может
 * перейти к двум другим: страницы связаны только через карту сайта, а её
 * читатель не открывает. Раздел существует для поисковика и не существует
 * для человека.
 *
 * ЧИСЛА СЮДА НЕ КОПИРУЮТСЯ. Они берутся из `data/данные.ts`, где лежат в
 * одном экземпляре, и приводятся к записи языка через `числа_на_языке`.
 * Копия числа на четырёх языках расходится при первом же новом замере —
 * это уже случалось на соседних страницах.
 *
 * РАЗДЕЛ 20 КОНСТИТУЦИИ. На страницах `/research/*` нет токена, тарифов,
 * распределения средств и призывов купить. Есть методология, данные,
 * ограничения, подпись автора, раскрытый конфликт интересов и РОВНО ОДНА
 * нейтральная ссылка на услуги — в самом конце.
 */

export type ЯзыкКод = 'ru' | 'en' | 'es' | 'zh';

export type ТекстыОглавления = {
  метка: string;
  заголовок: string;
  подзаголовок: (записей: string, доменов: string) => string;

  разделы: Array<{ путь: string; имя: string; описание: string }>;

  ограниченияЗаголовок: string;
  ограничения: string[];

  авторЗаголовок: string;
  автор: string;
  конфликт: string;

  обновлено: (дата: string) => string;
  услуги: string;
};

const ru: ТекстыОглавления = {
  метка: 'Открытое исследование',
  заголовок: 'Доступность муниципальных сайтов США',
  подзаголовок: (записей, доменов) =>
    `Программный агент проходил сайты клавиатурой в настоящем браузере: ` +
    `${записей} записей по ${доменов} муниципалитетам в 51 штате и ` +
    `территории. Пройден весь реестр .gov агентства CISA. Данные, код и ` +
    `метод открыты — любой замер здесь можно повторить.`,
  разделы: [
    {
      путь: 'data',
      имя: 'Данные',
      описание:
        'Что получилось: доли страниц с барьером, сравнение платформ, ' +
        'разбивка по штатам и типам страниц, доказательные скриншоты.',
    },
    {
      путь: 'methodology',
      имя: 'Методика',
      описание:
        'Как измеряли: что делает агент, что он может и чего не может, ' +
        'почему автоматическая проверка и обход клавиатурой расходятся.',
    },
    {
      путь: 'registry',
      имя: 'Реестр',
      описание:
        'Из чего составлена выборка: источник списка доменов, правила ' +
        'отбора, что исключено и по какой причине.',
    },
  ],
  ограниченияЗаголовок: 'Чего это исследование не говорит',
  ограничения: [
    'Барьер, найденный агентом, не равен барьеру для конкретного человека: ' +
      'люди пользуются разными вспомогательными технологиями.',
    'Проверены восемь типов страниц на сайт, а не весь сайт целиком.',
    'Отсутствие найденного нарушения не означает соответствия WCAG или ADA.',
  ],
  авторЗаголовок: 'Автор и конфликт интересов',
  автор: 'Максим Валентинович Галатин.',
  конфликт:
    'Автор оказывает услуги в области доступности. Исследование ' +
    'самофинансировано: за включение в выборку никто не платил и ' +
    'исключить себя из неё не мог.',
  обновлено: (дата) => `Данные на ${дата}.`,
  услуги: 'Услуги по доступности',
};

const en: ТекстыОглавления = {
  метка: 'Open research',
  заголовок: 'Accessibility of U.S. municipal websites',
  подзаголовок: (записей, доменов) =>
    `A software agent walked the sites by keyboard in a real browser: ` +
    `${записей} records across ${доменов} municipalities in 51 states and ` +
    `territories. The full CISA .gov registry was covered. Data, code and ` +
    `method are open — every figure here can be reproduced.`,
  разделы: [
    {
      путь: 'data',
      имя: 'Data',
      описание:
        'What we found: share of pages with a barrier, platform comparison, ' +
        'breakdown by state and page type, evidence screenshots.',
    },
    {
      путь: 'methodology',
      имя: 'Methodology',
      описание:
        'How it was measured: what the agent does, what it can and cannot ' +
        'detect, and why automated checks and keyboard walks disagree.',
    },
    {
      путь: 'registry',
      имя: 'Registry',
      описание:
        'How the sample was built: the source of the domain list, selection ' +
        'rules, what was excluded and why.',
    },
  ],
  ограниченияЗаголовок: 'What this research does not claim',
  ограничения: [
    'A barrier found by the agent is not the same as a barrier for a given ' +
      'person: people use different assistive technologies.',
    'Eight page types per site were checked, not the entire site.',
    'The absence of a detected failure does not mean WCAG or ADA compliance.',
  ],
  авторЗаголовок: 'Author and conflict of interest',
  автор: 'Maksim Valentinovich Galatin.',
  конфликт:
    'The author provides accessibility services. The research is ' +
    'self-funded: nobody paid to be included in the sample, and nobody ' +
    'could opt out of it.',
  обновлено: (дата) => `Data as of ${дата}.`,
  услуги: 'Accessibility services',
};

const es: ТекстыОглавления = {
  метка: 'Investigación abierta',
  заголовок: 'Accesibilidad de los sitios municipales de EE. UU.',
  подзаголовок: (записей, доменов) =>
    `Un agente de software recorrió los sitios con el teclado en un ` +
    `navegador real: ${записей} registros en ${доменов} municipios de 51 ` +
    `estados y territorios. Se cubrió todo el registro .gov de CISA. Los ` +
    `datos, el código y el método son abiertos: cada cifra puede repetirse.`,
  разделы: [
    {
      путь: 'data',
      имя: 'Datos',
      описание:
        'Lo encontrado: proporción de páginas con barrera, comparación de ' +
        'plataformas, desglose por estado y tipo de página, capturas como ' +
        'evidencia.',
    },
    {
      путь: 'methodology',
      имя: 'Metodología',
      описание:
        'Cómo se midió: qué hace el agente, qué puede y qué no puede ' +
        'detectar, y por qué la revisión automática y el recorrido con ' +
        'teclado no coinciden.',
    },
    {
      путь: 'registry',
      имя: 'Registro',
      описание:
        'Cómo se formó la muestra: origen de la lista de dominios, reglas ' +
        'de selección, qué se excluyó y por qué.',
    },
  ],
  ограниченияЗаголовок: 'Lo que esta investigación no afirma',
  ограничения: [
    'Una barrera detectada por el agente no equivale a una barrera para una ' +
      'persona concreta: cada quien usa tecnologías de apoyo distintas.',
    'Se revisaron ocho tipos de página por sitio, no el sitio completo.',
    'La ausencia de un fallo detectado no significa cumplimiento de WCAG ni ' +
      'de la ADA.',
  ],
  авторЗаголовок: 'Autor y conflicto de intereses',
  автор: 'Maksim Valentinovich Galatin.',
  конфликт:
    'El autor presta servicios de accesibilidad. La investigación es ' +
    'autofinanciada: nadie pagó por ser incluido en la muestra y nadie ' +
    'pudo excluirse de ella.',
  обновлено: (дата) => `Datos al ${дата}.`,
  услуги: 'Servicios de accesibilidad',
};

const zh: ТекстыОглавления = {
  метка: '公开研究',
  заголовок: '美国市政网站的无障碍状况',
  подзаголовок: (записей, доменов) =>
    `软件代理在真实浏览器中用键盘遍历网站：覆盖 51 个州与地区的 ${доменов} ` +
    `个市政单位，共 ${записей} 条记录，完整走完 CISA 的 .gov 域名清单。` +
    `数据、代码与方法全部公开，这里的每一个数字都可以复现。`,
  разделы: [
    {
      путь: 'data',
      имя: '数据',
      описание:
        '测得的结果：存在障碍的页面比例、平台之间的对比、按州与页面类型的' +
        '拆分，以及作为证据的截图。',
    },
    {
      путь: 'methodology',
      имя: '方法',
      описание:
        '如何测量：代理做了什么、能发现什么、不能发现什么，以及自动检查与' +
        '键盘遍历为何会出现分歧。',
    },
    {
      путь: 'registry',
      имя: '样本清单',
      описание:
        '样本如何构成：域名清单的来源、筛选规则、剔除了什么以及为什么。',
    },
  ],
  ограниченияЗаголовок: '本研究没有断言什么',
  ограничения: [
    '代理发现的障碍，不等于某个具体的人遇到的障碍：每个人使用的辅助技术并' +
      '不相同。',
    '每个网站检查了八类页面，而不是整个网站。',
    '没有检出问题，并不代表符合 WCAG 或 ADA。',
  ],
  авторЗаголовок: '作者与利益冲突',
  автор: 'Maksim Valentinovich Galatin。',
  конфликт:
    '作者提供无障碍相关服务。本研究由作者自费完成：没有人付费进入样本，也' +
    '没有人能够要求退出样本。',
  обновлено: (дата) => `数据截至 ${дата}。`,
  услуги: '无障碍服务',
};

export const ТЕКСТЫ: Record<ЯзыкКод, ТекстыОглавления> = { ru, en, es, zh };
