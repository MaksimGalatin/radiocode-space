'use client';

import React from 'react';
import { useLanguageOptional } from '../../../lib/LanguageContext';
import {
  ЕВРОПА_ВСЕГО, ЕВРОПА_ДОМЕНОВ, ЕВРОПА_ИЗМЕРЕНО, ЕВРОПА_НЕ_ИЗМЕРЕНО,
  ЕВРОПА_ПО_СТРАНАМ, ЕВРОПА_ВЕРДИКТЫ, СРАВНЕНИЕ, ОТОЗВАНО,
} from './данные';

/**
 * ЕВРОПЕЙСКИЙ ОБХОД — отдельная страница раздела исследований.
 *
 * Раздел 20 Конституции: здесь нет токена, тарифов, распределения средств и
 * призывов купить. Есть методология, данные, ограничения, подпись автора,
 * раскрытый конфликт интересов и ровно одна нейтральная ссылка на услуги в
 * самом конце.
 *
 * Числа импортируются из `данные.ts` и не копируются в тексты: копия числа
 * на четырёх языках расходится при первом же новом замере — так уже было на
 * соседних страницах, три числа продержались устаревшими неделю.
 */

type Язык = 'ru' | 'en' | 'es' | 'zh';

const ЧИСЛО: Record<Язык, (n: number) => string> = {
  ru: (n) => n.toLocaleString('ru-RU').replace(/ /g, ' '),
  en: (n) => n.toLocaleString('en-US'),
  es: (n) => n.toLocaleString('es-ES'),
  zh: (n) => n.toLocaleString('en-US'),
};

const ТЕКСТЫ: Record<Язык, {
  метка: string; заголовок: string; лид: string;
  страны: Record<string, string>;
  вердикты: Record<string, string>;
  таблицаЗаг: [string, string, string];
  знаменательЗаг: string; знаменатель: string;
  сравнениеЗаг: string; сравнение: string;
  отозваноЗаг: string; отозвано: string;
  ограниченияЗаг: string; ограничения: string[];
  авторЗаг: string; автор: string; конфликт: string;
  услуги: string; услугиСсылка: string;
}> = {
  ru: {
    метка: 'ОТКРЫТОЕ ИССЛЕДОВАНИЕ',
    заголовок: 'Европа: муниципальные сайты Германии и Испании',
    лид: 'Что встречает человека, который пользуется только клавиатурой, на сайте своей мэрии. Обход выполнен той же методикой, что и американский: настоящее нажатие Tab через драйвер браузера, восемь страниц на сайт, снимок экрана как доказательство.',
    страны: { de: 'Германия', es: 'Испания' },
    вердикты: {
      barrier: 'Формально открыт, но барьер для человека',
      partial: 'Частичный барьер фокуса или меток',
      accessible: 'Доступен человеку',
      unmeasurable: 'Открылся, но проверить как человек не удалось',
      nodomain: 'Домена нет в DNS',
      silent: 'Сервер молчит',
      closed: 'Закрыт для проверки (403)',
      brokentls: 'Битое шифрование',
      servererror: 'Ошибка на стороне сервера',
    },
    таблицаЗаг: ['Что получилось', 'Записей', 'Доля от измеренных'],
    знаменательЗаг: 'От чего считаются доли',
    знаменатель: 'Доля считается от ИЗМЕРЕННЫХ записей, а не от всех. «Не удалось измерить» — это шесть разных исходов, при которых измерять было нечего: домена нет, сервер молчит, страница закрыта для роботов, битое шифрование, ошибка сервера, страница открылась но не поддалась проверке. Их здесь 27,2 % от всего собранного. Если считать доли от всех записей, любое число уменьшится примерно на четверть — и будет говорить не о доступности, а о доле мёртвых адресов.',
    сравнениеЗаг: 'Сравнение с США — по одному знаменателю',
    сравнение: 'Среди измеренных записей доступными для клавиатуры оказались 10,0 % европейских муниципальных сайтов против 25,4 % американских. Оба числа получены одинаково. Сравнивать иначе было бы подлогом: в США доля «не удалось измерить» вдвое выше (50,5 % против 27,2 %), и при подсчёте от всех записей Европа выглядела бы лучше не потому, что там доступнее, а потому, что там меньше мёртвых доменов.',
    отозваноЗаг: 'Что мы отозвали и почему',
    отозвано: 'У нас есть второй европейский набор — 71 065 записей по десяти странам. Он не опубликован. Движок, которым он снят, проверял клавиатуру синтетическим событием dispatchEvent: такое событие не перемещает фокус, потому что браузер выполняет действие по умолчанию только для настоящего нажатия. Значит фокус не двигался ни разу, а вердикт выносился по неподвижному состоянию. Проверено на нашем собственном сайте: этот метод объявил бы aifa.works недоступным. Набор из десяти стран выглядел бы внушительнее двух — но число, полученное сломанным прибором, не становится верным оттого, что оно большое.',
    ограниченияЗаг: 'Чего это исследование не говорит',
    ограничения: [
      'Две страны, а не Европа целиком. Германия и Испания — это то, что измерено настоящим нажатием; остальные страны переизмеряются.',
      'Клавиатура — не вся доступность. Человек, пользующийся экранным диктором или увеличением, встретит другие препятствия, и они здесь не измерены.',
      'Восемь страниц на сайт, а не весь сайт. Проверялись главная, оплата, контакты и ещё пять типовых — там, где чаще всего застревают.',
      'Автомат не заменяет человека. Он находит препятствие, но не говорит, можно ли его обойти иначе.',
    ],
    авторЗаг: 'Кто это сделал',
    автор: 'Максим Валентинович Галатин, самофинансируемое исследование. Сканер написан с нуля, сырые данные и методика опубликованы целиком.',
    конфликт: 'Раскрытие конфликта интересов: автор оказывает услуги по исправлению доступности. Исследование самофинансировано, никто не платил за включение в выборку и за исключение из неё.',
    услуги: 'Проверить свой сайт',
    услугиСсылка: '/accessibility',
  },
  en: {
    метка: 'OPEN RESEARCH',
    заголовок: 'Europe: municipal websites in Germany and Spain',
    лид: 'What a keyboard-only visitor meets on the website of their own town hall. Traversed with the same method as the U.S. study: a real Tab keypress through the browser driver, eight pages per site, a screenshot kept as evidence.',
    страны: { de: 'Germany', es: 'Spain' },
    вердикты: {
      barrier: 'Formally open, but a barrier in practice',
      partial: 'Partial focus or labelling barrier',
      accessible: 'Reachable by keyboard',
      unmeasurable: 'Opened, but could not be checked as a human would',
      nodomain: 'Domain does not exist',
      silent: 'Server does not answer',
      closed: 'Closed to checking (403)',
      brokentls: 'Broken encryption',
      servererror: 'Server-side error',
    },
    таблицаЗаг: ['Outcome', 'Records', 'Share of measured'],
    знаменательЗаг: 'What the shares are taken from',
    знаменатель: 'Shares are taken from MEASURED records, not from all of them. “Could not be measured” covers six different outcomes where there was nothing to measure: no domain, silent server, page closed to robots, broken encryption, server error, and a page that opened but resisted checking. Together they are 27.2 % of everything collected. Computed against all records, every figure would drop by roughly a quarter — and would describe the share of dead addresses rather than accessibility.',
    сравнениеЗаг: 'Compared with the U.S. — same denominator',
    сравнение: 'Among measured records, 10.0 % of European municipal sites were reachable by keyboard against 25.4 % of American ones. Both numbers are computed the same way. Any other comparison would be a substitution: in the U.S. the “could not be measured” share is twice as high (50.5 % against 27.2 %), so counting against all records would make Europe look better — not because it is more accessible, but because fewer of its domains are dead.',
    отозваноЗаг: 'What we withdrew, and why',
    отозвано: 'We hold a second European dataset — 71,065 records across ten countries. It is not published. The engine behind it tested the keyboard with a synthetic dispatchEvent: such an event does not move focus, because the browser performs the default action only for a real keypress. Focus therefore never moved, and the verdict was pronounced on a state that stood still. Verified on our own site: this method would have declared aifa.works inaccessible. Ten countries would look more impressive than two — but a figure produced by a broken instrument does not become true by being large.',
    ограниченияЗаг: 'What this study does not say',
    ограничения: [
      'Two countries, not Europe. Germany and Spain are what a real keypress measured; the rest are being re-measured.',
      'The keyboard is not all of accessibility. Someone using a screen reader or magnification will meet other obstacles, and those are not measured here.',
      'Eight pages per site, not the whole site. Home, payment, contact and five more common types — the places where people get stuck most often.',
      'A machine does not replace a person. It finds an obstacle; it does not say whether there is another way round it.',
    ],
    авторЗаг: 'Who did this',
    автор: 'Maksim Galatin, self-funded research. The scanner was written from scratch; raw data and methodology are published in full.',
    конфликт: 'Conflict of interest disclosed: the author sells accessibility remediation services. The research is self-funded; nobody paid to be included in the sample or excluded from it.',
    услуги: 'Check your own site',
    услугиСсылка: '/accessibility',
  },
  es: {
    метка: 'INVESTIGACIÓN ABIERTA',
    заголовок: 'Europa: webs municipales de Alemania y España',
    лид: 'Qué encuentra quien navega solo con teclado en la web de su propio ayuntamiento. Recorrido con el mismo método que el estudio estadounidense: pulsación real de Tab a través del controlador del navegador, ocho páginas por sitio y una captura como prueba.',
    страны: { de: 'Alemania', es: 'España' },
    вердикты: {
      barrier: 'Formalmente abierto, pero con barrera real',
      partial: 'Barrera parcial de foco o etiquetas',
      accessible: 'Accesible con teclado',
      unmeasurable: 'Abrió, pero no se pudo comprobar como una persona',
      nodomain: 'El dominio no existe',
      silent: 'El servidor no responde',
      closed: 'Cerrado a la comprobación (403)',
      brokentls: 'Cifrado roto',
      servererror: 'Error del servidor',
    },
    таблицаЗаг: ['Resultado', 'Registros', 'Porcentaje de lo medido'],
    знаменательЗаг: 'Sobre qué se calculan los porcentajes',
    знаменатель: 'Los porcentajes se calculan sobre los registros MEDIDOS, no sobre todos. «No se pudo medir» reúne seis resultados distintos en los que no había nada que medir: dominio inexistente, servidor mudo, página cerrada a robots, cifrado roto, error del servidor y página que abrió pero no se dejó comprobar. Suman el 27,2 % de todo lo recogido. Calculado sobre el total, cualquier cifra bajaría alrededor de un cuarto y hablaría de la proporción de direcciones muertas, no de accesibilidad.',
    сравнениеЗаг: 'Comparación con EE. UU., con el mismo denominador',
    сравнение: 'Entre los registros medidos, el 10,0 % de las webs municipales europeas resultó accesible con teclado, frente al 25,4 % de las estadounidenses. Ambas cifras se obtienen igual. Compararlas de otro modo sería una sustitución: en EE. UU. la proporción de «no se pudo medir» es el doble (50,5 % frente a 27,2 %), de modo que calcular sobre el total haría que Europa pareciera mejor, no por ser más accesible, sino por tener menos dominios muertos.',
    отозваноЗаг: 'Qué hemos retirado y por qué',
    отозвано: 'Tenemos un segundo conjunto europeo: 71 065 registros de diez países. No está publicado. El motor que lo obtuvo comprobaba el teclado con un dispatchEvent sintético: ese evento no mueve el foco, porque el navegador ejecuta la acción por defecto solo ante una pulsación real. El foco nunca se movió y el veredicto se dictó sobre un estado inmóvil. Comprobado en nuestro propio sitio: ese método habría declarado aifa.works inaccesible. Diez países lucirían más que dos, pero una cifra obtenida con un instrumento roto no se vuelve cierta por ser grande.',
    ограниченияЗаг: 'Lo que este estudio no dice',
    ограничения: [
      'Dos países, no Europa. Alemania y España es lo que midió una pulsación real; el resto se está volviendo a medir.',
      'El teclado no es toda la accesibilidad. Quien use lector de pantalla o ampliación encontrará otros obstáculos, aquí no medidos.',
      'Ocho páginas por sitio, no el sitio entero. Inicio, pago, contacto y cinco tipos más: donde la gente se atasca con más frecuencia.',
      'Una máquina no sustituye a una persona. Encuentra el obstáculo, pero no dice si hay otro camino.',
    ],
    авторЗаг: 'Quién lo ha hecho',
    автор: 'Maksim Galatin, investigación autofinanciada. El escáner se escribió desde cero; los datos brutos y la metodología se publican íntegros.',
    конфликт: 'Conflicto de interés declarado: el autor presta servicios de subsanación de accesibilidad. La investigación es autofinanciada; nadie pagó por entrar en la muestra ni por quedar fuera.',
    услуги: 'Comprobar su sitio',
    услугиСсылка: '/accessibility',
  },
  zh: {
    метка: '公开研究',
    заголовок: '欧洲：德国与西班牙的市政网站',
    лид: '只用键盘的人，在自己市政厅的网站上会遇到什么。采用与美国研究相同的方法：通过浏览器驱动真实按下 Tab 键，每站八个页面，并保留截图作为证据。',
    страны: { de: '德国', es: '西班牙' },
    вердикты: {
      barrier: '形式上可打开，实际存在障碍',
      partial: '焦点或标签的局部障碍',
      accessible: '键盘可达',
      unmeasurable: '已打开，但无法以人的方式完成检查',
      nodomain: '域名不存在',
      silent: '服务器没有响应',
      closed: '拒绝检查（403）',
      brokentls: '加密损坏',
      servererror: '服务器端错误',
    },
    таблицаЗаг: ['结果', '记录数', '占已测量的比例'],
    знаменательЗаг: '比例的分母是什么',
    знаменатель: '比例以「已测量」的记录为分母，而不是全部记录。「无法测量」包含六种根本无从测量的情形：域名不存在、服务器沉默、页面拒绝机器人、加密损坏、服务器报错，以及打开了却无法完成检查。它们合计占全部采集量的 27.2 %。若以全部记录为分母，任何数字都会下降约四分之一，而且描述的将是死链比例，而不是无障碍水平。',
    сравнениеЗаг: '与美国的比较——同一个分母',
    сравнение: '在已测量的记录中，欧洲市政网站有 10.0 % 可用键盘到达，美国为 25.4 %。两个数字的算法完全一致。换算法就是偷换：美国的「无法测量」比例高出一倍（50.5 % 对 27.2 %），若以全部记录为分母，欧洲会显得更好——不是因为更无障碍，而是因为死掉的域名更少。',
    отозваноЗаг: '我们撤下了什么，为什么',
    отозвано: '我们还有第二份欧洲数据：十个国家、71,065 条记录。它没有发布。采集它的引擎用合成的 dispatchEvent 检查键盘：这种事件不会移动焦点，因为浏览器只对真实按键执行默认动作。于是焦点始终未动，判定却建立在一个静止的状态之上。我们在自己的站点上验证过：这套方法会把 aifa.works 判为不可访问。十个国家看上去当然比两个气派，但用坏掉的仪器量出来的数字，不会因为大就变成真的。',
    ограниченияЗаг: '这项研究没有说什么',
    ограничения: [
      '是两个国家，不是整个欧洲。德国与西班牙是真实按键测出来的，其余国家正在重测。',
      '键盘不等于全部无障碍。使用读屏软件或放大功能的人会遇到别的障碍，本文并未测量。',
      '每站八个页面，不是整站。首页、支付、联系方式以及另外五类常见页面——人们最常卡住的地方。',
      '机器不能取代人。它能找出障碍，却说不出是否还有别的路可走。',
    ],
    авторЗаг: '谁做的',
    автор: 'Maksim Galatin，自筹经费的研究。扫描器从零写起；原始数据与方法论全部公开。',
    конфликт: '利益冲突声明：作者提供无障碍整改服务。本研究自筹经费；没有人为进入样本或被排除在外付过费。',
    услуги: '检测您自己的网站',
    услугиСсылка: '/accessibility',
  },
};

export default function EuropeClient({ языкИзПути }: { языкИзПути?: string }) {
  // 🔴 ЯЗЫК ИЗ ПУТИ СТАРШЕ КОНТЕКСТА — как на соседней странице данных.
  // На этом сайте клиентский контекст языка стартует с английского, и
  // серверная разметка всегда выходила бы английской: /es/... и /zh/...
  // отдавали бы английский текст при верном атрибуте <html lang>, отчего
  // расхождение снаружи незаметно. Правка повторяет ту, что сделана
  // 05.09.2026 для /research/data.
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  const изПути = ['ru', 'en', 'es', 'zh'].includes(языкИзПути || '') ? языкИзПути : null;
  const выбран = изПути || locale;
  const язык = (['ru', 'en', 'es', 'zh'].includes(выбран as string) ? выбран : 'en') as Язык;
  const t = ТЕКСТЫ[язык];
  const ч = ЧИСЛО[язык];

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">{t.метка}</p>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">{t.заголовок}</h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-300">{t.лид}</p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [ч(ЕВРОПА_ВСЕГО), t.таблицаЗаг[1]],
            [ч(ЕВРОПА_ДОМЕНОВ), язык === 'ru' ? 'доменов' : язык === 'es' ? 'dominios' : язык === 'zh' ? '个域名' : 'domains'],
            [ч(ЕВРОПА_ИЗМЕРЕНО), язык === 'ru' ? 'измерено' : язык === 'es' ? 'medidos' : язык === 'zh' ? '已测量' : 'measured'],
            [ч(ЕВРОПА_НЕ_ИЗМЕРЕНО), язык === 'ru' ? 'не измерено' : язык === 'es' ? 'no medidos' : язык === 'zh' ? '未测量' : 'not measured'],
          ].map(([n, п]) => (
            <div key={п} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <div className="text-2xl font-bold text-white">{n}</div>
              <div className="mt-1 text-xs text-gray-400">{п}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {ЕВРОПА_ПО_СТРАНАМ.map((с) => (
            <span key={с.ключ} className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-gray-300">
              {t.страны[с.ключ]} — {ч(с.n)}
            </span>
          ))}
        </div>

        <section className="mt-12 overflow-x-auto" tabIndex={0}>
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">{t.заголовок}</caption>
            <thead>
              <tr className="border-b border-white/15">
                {t.таблицаЗаг.map((к) => (
                  <th key={к} scope="col" className="px-3 py-3 font-semibold text-white">{к}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ЕВРОПА_ВЕРДИКТЫ.map((в) => (
                <tr key={в.ключ} className="border-b border-white/8">
                  <th scope="row" className="px-3 py-3 font-normal text-gray-200">{t.вердикты[в.ключ]}</th>
                  <td className="px-3 py-3 tabular-nums text-gray-300">{ч(в.n)}</td>
                  <td className="px-3 py-3 tabular-nums text-gray-300">
                    {/* toFixed(1) обязателен: JS печатает 10.0 как «10», и в
                        таблице появлялась строка «10 %» рядом с «77.8 %» —
                        разная точность в одном столбце читается как небрежность */}
                    {в.долиОтИзмеренных === null ? '—' : `${в.долиОтИзмеренных.toFixed(1)} %`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">{t.знаменательЗаг}</h2>
          <p className="mt-3 leading-relaxed text-gray-300">{t.знаменатель}</p>
        </section>

        <section className="mt-10 rounded-lg border border-cyan-500/20 bg-cyan-500/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">{t.сравнениеЗаг}</h2>
          <p className="mt-3 leading-relaxed text-gray-300">{t.сравнение}</p>
          <div className="mt-5 flex flex-wrap gap-6">
            <div>
              <div className="text-3xl font-bold text-white">{СРАВНЕНИЕ.европаДоступно} %</div>
              <div className="mt-1 text-xs text-gray-400">{t.страны.de} + {t.страны.es}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{СРАВНЕНИЕ.сшаДоступно} %</div>
              <div className="mt-1 text-xs text-gray-400">USA</div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-amber-500/20 bg-amber-500/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">{t.отозваноЗаг}</h2>
          <p className="mt-3 leading-relaxed text-gray-300">{t.отозвано}</p>
          <p className="mt-3 text-sm text-gray-400">
            {ч(ОТОЗВАНО.записей)} · {ОТОЗВАНО.стран} · dispatchEvent
          </p>
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
