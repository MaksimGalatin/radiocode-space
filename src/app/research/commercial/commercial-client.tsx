'use client';

import React from 'react';
import { useLanguageOptional } from '../../../lib/LanguageContext';
import { Ч, ИСХОДЫ, СОСЕДНИЕ_НАБОРЫ, СНИМОК, ОБХОД_ИДЁТ, ОЧЕРЕДЬ } from './данные';

/**
 * КОММЕРЧЕСКИЕ САЙТЫ США — отдельная страница раздела исследований.
 *
 * Раздел 20 Конституции: ни токена, ни тарифов, ни распределения средств, ни
 * призывов купить. Методология, данные, ограничения, подпись автора,
 * раскрытый конфликт интересов и ровно одна нейтральная ссылка на услуги в
 * самом конце.
 *
 * ГЛАВНОЕ В ЭТОЙ СТРАНИЦЕ — предупреждение, которое стоит ДО чисел: на сайте
 * лежат два разных измерения, и складывать их нельзя. Клавиатурный обход
 * говорит «человек не дошёл до цели»; axe-core говорит «в коде нарушено
 * правило». Расхождение между ними и есть главный результат американского
 * исследования, поэтому смешение здесь было бы не мелкой неточностью, а
 * разрушением смысла.
 *
 * Числа импортируются из `данные.ts` и не копируются в тексты: копия числа
 * на четырёх языках расходится при первом же новом замере.
 */

type Язык = 'ru' | 'en' | 'es' | 'zh';

const ЧИСЛО: Record<Язык, (n: number) => string> = {
  ru: (n) => n.toLocaleString('ru-RU').replace(/ /g, ' '),
  en: (n) => n.toLocaleString('en-US'),
  es: (n) => n.toLocaleString('es-ES'),
  zh: (n) => n.toLocaleString('en-US'),
};

const ТЕКСТЫ: Record<Язык, {
  метка: string; заголовок: string; лид: string;
  плитки: [string, string, string, string];
  разницаЗаг: string; разница: string;
  разницаТаблица: [string, string, string];
  разницаСтроки: [string, string][];
  ответыЗаг: string; ответы: Record<string, string>;
  ответыТаблица: [string, string, string];
  тяжестьЗаг: string; тяжесть: string; критических: string; серьёзных: string;
  идётЗаг: string; идёт: (пройдено: string, всего: string, процент: string) => string;
  знаменательЗаг: string; знаменатель: string;
  ограниченияЗаг: string; ограничения: string[];
  авторЗаг: string; автор: string; конфликт: string;
  снимокПодпись: string;
  услуги: string; услугиСсылка: string;
}> = {
  ru: {
    метка: 'ОТКРЫТОЕ ИССЛЕДОВАНИЕ',
    заголовок: 'Коммерческие сайты США: что находит автоматическая проверка',
    лид: 'Магазины, кафе, клиники, банки, библиотеки — сайты, которыми человек пользуется каждый день. Каждый открывается в настоящем браузере и проверяется движком axe-core: сколько формальных правил доступности нарушено в разметке и в стилях.',
    плитки: ['строк журнала', 'организаций', 'со снимком', 'нарушений'],
    разницаЗаг: 'Два разных прибора — и их числа не складываются',
    разница: 'На этом сайте лежит два измерения, и они отвечают на разные вопросы. Клавиатурный обход государственных сайтов проверяет, дойдёт ли человек до цели, нажимая только Tab. Эта страница — автоматическая проверка: машина считает нарушения правил в коде. Одно не выводится из другого; ровно поэтому расхождение между ними и оказалось главным результатом американского исследования. Общего числа у них не бывает.',
    разницаТаблица: ['', 'клавиатурный обход', 'эта страница'],
    разницаСтроки: [
      ['что за сайты', 'государственные, реестр CISA'],
      ['чем меряли', 'настоящее нажатие Tab'],
      ['что показывает', 'дошёл ли человек до цели'],
    ],
    ответыЗаг: 'Чем закончилась проверка',
    ответы: {
      measured: 'Измерено',
      botwall: 'Заслон от роботов',
      timeout: 'Не успел отрисоваться',
      soft404: 'Страницы нет, но сервер отвечает «есть»',
      empty: 'Пустая страница',
      silent: 'Сервер молчит',
      nodomain: 'Домена нет в DNS',
      brokentls: 'Битое шифрование',
    },
    ответыТаблица: ['Чем закончилось', 'Записей', 'Доля'],
    тяжестьЗаг: 'Насколько это тяжело',
    тяжесть: 'Шкала axe-core. «Критическое» — препятствие, из-за которого страницей нельзя пользоваться вовсе: кнопка без названия, форма без подписи. «Серьёзное» — то, что делает пользование мучительным: нечитаемый текст, ссылка, о которой не понять, куда ведёт.',
    критических: 'критических',
    серьёзных: 'серьёзных',
    идётЗаг: 'Обход ещё идёт',
    идёт: (пройдено, всего, процент) => `На момент этого снимка пройдено ${пройдено} организаций из ${всего} — ${процент} %. Числа вырастут: страница обновится, когда обход закончится. Мы говорим это прямо, потому что снимок незаконченной работы, поданный как итог, — это то же самое враньё, только вежливое.`,
    знаменательЗаг: 'От чего считаются доли',
    знаменатель: 'Доли считаются от СТРОК ЖУРНАЛА, а не от числа организаций и не от числа открывшихся сайтов. Одна организация даёт несколько строк: у неё проверяется несколько страниц. Поэтому фраза «столько-то процентов сайтов недоступны» из этих чисел не следует и здесь не произносится.',
    ограниченияЗаг: 'Чего это исследование не говорит',
    ограничения: [
      'Автоматическая проверка не заменяет человека. Она находит нарушение правила, но не говорит, помешает ли оно на деле — и не находит того, что мешает, не нарушая ни одного правила.',
      'Нарушение — не то же самое, что барьер. В американском исследовании 53,8 % страниц, которые машина назвала чистыми, оказались непроходимыми для человека с клавиатурой.',
      'Пятая часть сайтов не ответила вовсе, ещё почти десятая закрылась от проверки. Это не «доступные» и не «недоступные» — это неизмеренные, и они не участвуют в выводах.',
      'Считаются строки журнала, а не сайты. Один и тот же адрес может дать несколько записей.',
    ],
    авторЗаг: 'Кто это сделал',
    автор: 'Максим Валентинович Галатин, самофинансируемое исследование. Сканер написан с нуля, сырые данные и методика опубликованы целиком. Список организаций для обхода получен из OpenStreetMap, © участники OpenStreetMap.',
    конфликт: 'Раскрытие конфликта интересов: автор оказывает услуги по исправлению доступности. Исследование самофинансировано, никто не платил за включение в выборку и за исключение из неё.',
    снимокПодпись: 'Снимок данных на',
    услуги: 'Проверить свой сайт',
    услугиСсылка: '/accessibility',
  },
  en: {
    метка: 'OPEN RESEARCH',
    заголовок: 'US commercial websites: what the automated check finds',
    лид: 'Shops, cafés, clinics, banks, libraries — the sites a person uses every day. Each one is opened in a real browser and checked with the axe-core engine: how many formal accessibility rules are broken in the markup and the styles.',
    плитки: ['log records', 'organisations', 'with screenshot', 'violations'],
    разницаЗаг: 'Two different instruments — and their numbers do not add up',
    разница: 'This site carries two measurements, and they answer different questions. The keyboard traversal of government sites checks whether a person can reach the goal pressing only Tab. This page is an automated check: the machine counts rule violations in the code. Neither follows from the other — which is precisely why the gap between them became the main result of the U.S. study. There is no combined figure.',
    разницаТаблица: ['', 'keyboard traversal', 'this page'],
    разницаСтроки: [
      ['what sites', 'government, CISA registry'],
      ['how measured', 'a real Tab keypress'],
      ['what it shows', 'whether a person reached the goal'],
    ],
    ответыЗаг: 'How the check ended',
    ответы: {
      measured: 'Measured',
      botwall: 'Bot wall',
      timeout: 'Did not finish rendering',
      soft404: 'Page missing, server says otherwise',
      empty: 'Empty page',
      silent: 'Server silent',
      nodomain: 'Domain not in DNS',
      brokentls: 'Broken encryption',
    },
    ответыТаблица: ['Outcome', 'Records', 'Share'],
    тяжестьЗаг: 'How severe it is',
    тяжесть: 'The axe-core scale. «Critical» is an obstacle that makes the page unusable outright: a button with no name, a form field with no label. «Serious» is what makes using it painful: unreadable text, a link that gives no clue where it leads.',
    критических: 'critical',
    серьёзных: 'serious',
    идётЗаг: 'The sweep is still running',
    идёт: (пройдено, всего, процент) => `At the moment of this snapshot ${пройдено} organisations of ${всего} have been walked — ${процент} %. The numbers will grow; the page updates when the sweep completes. We say so plainly, because a snapshot of unfinished work presented as a result is the same lie, only a polite one.`,
    знаменательЗаг: 'What the shares are counted from',
    знаменатель: 'Shares are counted from LOG RECORDS, not from the number of organisations and not from the number of sites that opened. One organisation yields several records: several of its pages are checked. Therefore the phrase «N % of sites are inaccessible» does not follow from these numbers and is not said here.',
    ограниченияЗаг: 'What this study does not say',
    ограничения: [
      'An automated check does not replace a person. It finds a broken rule, but does not say whether it gets in the way in practice — and it misses what gets in the way while breaking no rule at all.',
      'A violation is not the same as a barrier. In the U.S. study, 53.8 % of the pages the machine called clean turned out to be impassable for a keyboard user.',
      'A fifth of the sites did not answer at all, and almost a tenth closed themselves to the check. These are neither «accessible» nor «inaccessible» — they are unmeasured, and they take no part in the conclusions.',
      'Log records are counted, not sites. The same address can yield several records.',
    ],
    авторЗаг: 'Who did this',
    автор: 'Maksim Galatin, self-funded research. The scanner was written from scratch; the raw data and the methodology are published in full. The list of organisations used for traversal comes from OpenStreetMap, © OpenStreetMap contributors.',
    конфликт: 'Conflict of interest disclosure: the author provides accessibility remediation services. The research is self-funded; nobody paid to be included in the sample or excluded from it.',
    снимокПодпись: 'Data snapshot as of',
    услуги: 'Check your own site',
    услугиСсылка: '/accessibility',
  },
  es: {
    метка: 'INVESTIGACIÓN ABIERTA',
    заголовок: 'Sitios comerciales de EE. UU.: lo que encuentra la comprobación automática',
    лид: 'Tiendas, cafeterías, clínicas, bancos, bibliotecas: los sitios que una persona usa cada día. Cada uno se abre en un navegador real y se comprueba con el motor axe-core: cuántas reglas formales de accesibilidad se incumplen en el marcado y en los estilos.',
    плитки: ['registros', 'organizaciones', 'con captura', 'infracciones'],
    разницаЗаг: 'Dos instrumentos distintos, y sus cifras no se suman',
    разница: 'Este sitio contiene dos mediciones que responden preguntas distintas. El recorrido de teclado por sitios gubernamentales comprueba si una persona llega al objetivo pulsando solo Tab. Esta página es una comprobación automática: la máquina cuenta infracciones de reglas en el código. Ninguna se deduce de la otra, y por eso justamente la diferencia entre ambas resultó ser el hallazgo principal del estudio estadounidense. No existe una cifra combinada.',
    разницаТаблица: ['', 'recorrido de teclado', 'esta página'],
    разницаСтроки: [
      ['qué sitios', 'gubernamentales, registro CISA'],
      ['cómo se midió', 'pulsación real de Tab'],
      ['qué muestra', 'si la persona llegó al objetivo'],
    ],
    ответыЗаг: 'Cómo terminó la comprobación',
    ответы: {
      measured: 'Medido',
      botwall: 'Barrera antirrobots',
      timeout: 'No llegó a renderizarse',
      soft404: 'La página no existe, pero el servidor dice que sí',
      empty: 'Página vacía',
      silent: 'El servidor calla',
      nodomain: 'El dominio no está en DNS',
      brokentls: 'Cifrado roto',
    },
    ответыТаблица: ['Resultado', 'Registros', 'Proporción'],
    тяжестьЗаг: 'Qué tan grave es',
    тяжесть: 'La escala de axe-core. «Crítico» es un obstáculo que impide usar la página por completo: un botón sin nombre, un campo sin etiqueta. «Grave» es lo que vuelve penoso su uso: texto ilegible, un enlace que no dice a dónde lleva.',
    критических: 'críticas',
    серьёзных: 'graves',
    идётЗаг: 'El recorrido sigue en marcha',
    идёт: (пройдено, всего, процент) => `En el momento de esta instantánea se han recorrido ${пройдено} organizaciones de ${всего}: el ${процент} %. Las cifras crecerán; la página se actualizará al terminar. Lo decimos claramente, porque presentar como resultado la instantánea de un trabajo inacabado es la misma mentira, solo que cortés.`,
    знаменательЗаг: 'Sobre qué se calculan las proporciones',
    знаменатель: 'Las proporciones se calculan sobre los REGISTROS del diario, no sobre el número de organizaciones ni sobre el de sitios que se abrieron. Una organización genera varios registros: se comprueban varias de sus páginas. Por eso la frase «el N % de los sitios son inaccesibles» no se deduce de estas cifras y aquí no se dice.',
    ограниченияЗаг: 'Lo que este estudio no dice',
    ограничения: [
      'Una comprobación automática no sustituye a una persona. Encuentra una regla incumplida, pero no dice si estorba en la práctica, y no ve lo que estorba sin incumplir ninguna regla.',
      'Una infracción no es lo mismo que una barrera. En el estudio estadounidense, el 53,8 % de las páginas que la máquina consideró limpias resultaron intransitables con teclado.',
      'Una quinta parte de los sitios no respondió y casi una décima se cerró a la comprobación. No son «accesibles» ni «inaccesibles»: no están medidos y no participan en las conclusiones.',
      'Se cuentan registros, no sitios. Una misma dirección puede generar varios registros.',
    ],
    авторЗаг: 'Quién lo hizo',
    автор: 'Maksim Galatin, investigación autofinanciada. El escáner se escribió desde cero; los datos brutos y la metodología están publicados íntegramente. La lista de organizaciones para el recorrido procede de OpenStreetMap, © colaboradores de OpenStreetMap.',
    конфликт: 'Declaración de conflicto de intereses: el autor presta servicios de corrección de accesibilidad. La investigación es autofinanciada; nadie pagó por entrar en la muestra ni por quedar fuera de ella.',
    снимокПодпись: 'Datos a fecha de',
    услуги: 'Comprobar su propio sitio',
    услугиСсылка: '/accessibility',
  },
  zh: {
    метка: '开放研究',
    заголовок: '美国商业网站：自动检测发现了什么',
    лид: '商店、咖啡馆、诊所、银行、图书馆——人们每天都在使用的网站。每一个都在真实浏览器中打开，并用 axe-core 引擎检测：标记与样式中违反了多少条无障碍规则。',
    плитки: ['日志记录', '机构', '含截图', '违规'],
    разницаЗаг: '两种不同的仪器——它们的数字不可相加',
    разница: '本站包含两种测量，它们回答不同的问题。政府网站的键盘遍历检验人能否仅靠 Tab 键到达目标。本页是自动检测：机器统计代码中的规则违规。二者互不推导——这正是它们之间的差距成为美国研究主要结论的原因。二者没有合并数字。',
    разницаТаблица: ['', '键盘遍历', '本页'],
    разницаСтроки: [
      ['网站类型', '政府网站，CISA 登记册'],
      ['测量方式', '真实按下 Tab 键'],
      ['显示什么', '人是否到达了目标'],
    ],
    ответыЗаг: '检测如何结束',
    ответы: {
      measured: '已测量',
      botwall: '机器人拦截',
      timeout: '未能完成渲染',
      soft404: '页面不存在，服务器却说存在',
      empty: '空白页面',
      silent: '服务器无响应',
      nodomain: '域名不在 DNS 中',
      brokentls: '加密损坏',
    },
    ответыТаблица: ['结果', '记录数', '占比'],
    тяжестьЗаг: '严重程度',
    тяжесть: 'axe-core 的分级。「严重（critical）」指使页面完全无法使用的障碍：没有名称的按钮，没有标签的表单。「重要（serious）」指让使用变得痛苦的问题：无法辨读的文字，看不出通向何处的链接。',
    критических: '严重',
    серьёзных: '重要',
    идётЗаг: '遍历仍在进行',
    идёт: (пройдено, всего, процент) => `截至本快照，已遍历 ${пройдено} 家机构，共 ${всего} 家——${процент} %。数字还会增长；遍历结束后本页将更新。我们直说这一点，因为把未完成工作的快照当作结论呈现，是同一种谎言，只是更礼貌。`,
    знаменательЗаг: '占比以什么为分母',
    знаменатель: '占比以日志记录为分母，而非机构数量，也非成功打开的网站数量。一个机构会产生多条记录：它的多个页面都会被检测。因此「N % 的网站不可访问」这句话无法由这些数字得出，本页也不会这样说。',
    ограниченияЗаг: '这项研究没有说什么',
    ограничения: [
      '自动检测不能取代人。它能找出被违反的规则，却说不出实际是否构成阻碍；也看不见那些不违反任何规则却确实阻碍人的东西。',
      '违规不等于障碍。在美国的研究中，机器判定为「干净」的页面里，有 53.8 % 对键盘用户来说根本走不通。',
      '五分之一的网站完全没有响应，近十分之一对检测关闭。它们既不是「可访问」也不是「不可访问」——它们未被测量，不参与结论。',
      '统计的是日志记录，不是网站。同一地址可能产生多条记录。',
    ],
    авторЗаг: '谁做的',
    автор: 'Maksim Galatin，自筹经费的研究。扫描器从零写起；原始数据与方法论全部公开。用于遍历的机构名单来自 OpenStreetMap，© OpenStreetMap 贡献者。',
    конфликт: '利益冲突声明：作者提供无障碍整改服务。本研究自筹经费；没有人为进入样本或被排除在外付过费。',
    снимокПодпись: '数据快照日期',
    услуги: '检测您自己的网站',
    услугиСсылка: '/accessibility',
  },
};

export default function CommercialClient({ языкИзПути }: { языкИзПути?: string }) {
  // 🔴 ЯЗЫК ИЗ ПУТИ СТАРШЕ КОНТЕКСТА — как на соседних страницах раздела.
  // Клиентский контекст языка стартует с английского, и без этого пропа
  // `/es/research/commercial` отдавал бы английский текст при верном
  // атрибуте `<html lang>` — расхождение, незаметное снаружи.
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  const изПути = ['ru', 'en', 'es', 'zh'].includes(языкИзПути || '') ? языкИзПути : null;
  const выбран = изПути || locale;
  const язык = (['ru', 'en', 'es', 'zh'].includes(выбран as string) ? выбран : 'en') as Язык;
  const t = ТЕКСТЫ[язык];
  const ч = ЧИСЛО[язык];

  const дата = new Date(Date.UTC(СНИМОК.год, СНИМОК.месяц - 1, СНИМОК.день, СНИМОК.часы, СНИМОК.минуты));
  const датаТекст = дата.toLocaleDateString(
    язык === 'ru' ? 'ru-RU' : язык === 'es' ? 'es-ES' : язык === 'zh' ? 'zh-CN' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' },
  );

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">{t.метка}</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t.заголовок}</h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-300">{t.лид}</p>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">{t.снимокПодпись} {датаТекст}</p>

        {/* Предупреждение стоит ДО чисел: прочитав числа первыми, читатель
            уже сложит несложимое, и оговорка внизу его не догонит. */}
        <section className="mt-10 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">{t.разницаЗаг}</h2>
          <p className="mt-3 leading-relaxed text-gray-300">{t.разница}</p>
          <div className="mt-5 overflow-x-auto" tabIndex={0}>
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">{t.разницаЗаг}</caption>
              {/* Подпись обязательна: без неё программа чтения с экрана
                  объявляет «таблица из трёх столбцов» и не говорит, о чём она.
                  Найдено проверкой собственной страницы 09.09.2026 — ровно то
                  нарушение, которое мы ищем у других (`caption` отсутствовал
                  только здесь, у двух соседних таблиц он был). Писать об
                  исследовании доступности со страницы с таким изъяном стыдно. */}
              <caption className="sr-only">{t.разницаЗаг}</caption>
              <thead>
                <tr className="border-b border-white/15">
                  {t.разницаТаблица.map((к, i) => (
                    <th key={i} scope="col" className="px-3 py-2 font-semibold text-white">{к}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.разницаСтроки.map(([подпись, слева], i) => (
                  <tr key={подпись} className="border-b border-white/8">
                    <th scope="row" className="px-3 py-2 font-normal text-gray-400">{подпись}</th>
                    <td className="px-3 py-2 text-gray-300">{слева}</td>
                    <td className="px-3 py-2 text-gray-300">
                      {i === 0
                        ? (язык === 'ru' ? 'коммерческие организации' : язык === 'es' ? 'organizaciones comerciales' : язык === 'zh' ? '商业机构' : 'commercial organisations')
                        : i === 1
                          ? 'axe-core'
                          : (язык === 'ru' ? 'сколько правил нарушено' : язык === 'es' ? 'cuántas reglas se incumplen' : язык === 'zh' ? '违反了多少规则' : 'how many rules are broken')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            {ч(СОСЕДНИЕ_НАБОРЫ.муниципалитетыЗаписей)} · {ч(СОСЕДНИЕ_НАБОРЫ.муниципалитетыСайтов)} ·{' '}
            <a href="/research/data" className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300">
              /research/data
            </a>
          </p>
        </section>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [ч(Ч.строк), t.плитки[0]],
            [ч(Ч.организаций), t.плитки[1]],
            [ч(Ч.соСнимком), t.плитки[2]],
            [ч(Ч.нарушений), t.плитки[3]],
          ].map(([n, п]) => (
            <div key={п} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <div className="text-2xl font-bold text-white">{n}</div>
              <div className="mt-1 text-xs text-gray-400">{п}</div>
            </div>
          ))}
        </div>

        {ОБХОД_ИДЁТ && (
          <section className="mt-8 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] p-6">
            <h2 className="text-lg font-semibold text-white">{t.идётЗаг}</h2>
            <p className="mt-3 leading-relaxed text-gray-300">
              {t.идёт(ч(ОЧЕРЕДЬ.пройдено), ч(ОЧЕРЕДЬ.всего), ОЧЕРЕДЬ.процент.toFixed(1))}
            </p>
          </section>
        )}

        <section className="mt-12 overflow-x-auto" tabIndex={0}>
          <h2 className="text-xl font-semibold text-white">{t.ответыЗаг}</h2>
          <table className="mt-4 w-full border-collapse text-left text-sm">
            <caption className="sr-only">{t.ответыЗаг}</caption>
            <thead>
              <tr className="border-b border-white/15">
                {t.ответыТаблица.map((к) => (
                  <th key={к} scope="col" className="px-3 py-3 font-semibold text-white">{к}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ИСХОДЫ.map((о) => (
                <tr key={о.ключ} className="border-b border-white/8">
                  <th scope="row" className="px-3 py-3 font-normal text-gray-200">
                    {t.ответы[о.ключ]}
                  </th>
                  <td className="px-3 py-3 tabular-nums text-gray-300">{ч(о.n)}</td>
                  {/* toFixed(1) обязателен: JS печатает 8.6 как «8.6», а 0.2
                      как «0.2», но 62.3 → «62.3» и 3.7 → «3.7» — без
                      приведения в столбце соседствуют разные точности. */}
                  <td className="px-3 py-3 tabular-nums text-gray-300">{о.доля.toFixed(1)} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-12 rounded-lg border border-white/10 bg-white/[0.02] p-6">
          <h2 className="text-xl font-semibold text-white">{t.тяжестьЗаг}</h2>
          <p className="mt-3 leading-relaxed text-gray-300">{t.тяжесть}</p>
          <div className="mt-5 flex flex-wrap gap-8">
            <div>
              <div className="text-3xl font-bold text-white">{ч(Ч.критических)}</div>
              <div className="mt-1 text-xs text-gray-400">{t.критических}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{ч(Ч.серьёзных)}</div>
              <div className="mt-1 text-xs text-gray-400">{t.серьёзных}</div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">{t.знаменательЗаг}</h2>
          <p className="mt-3 leading-relaxed text-gray-300">{t.знаменатель}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">{t.ограниченияЗаг}</h2>
          <ul className="mt-4 space-y-3">
            {t.ограничения.map((о) => (
              <li key={о} className="leading-relaxed text-gray-300">— {о}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-lg font-semibold text-white">{t.авторЗаг}</h2>
          <p className="mt-3 leading-relaxed text-gray-300">{t.автор}</p>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">{t.конфликт}</p>
          <p className="mt-6">
            <a href={t.услугиСсылка} className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300">
              {t.услуги}
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
