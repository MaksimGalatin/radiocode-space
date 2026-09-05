'use client';

/**
 * МЕТОДИКА — КЛИЕНТСКАЯ ЧАСТЬ.
 *
 * Причина выноса та же, что и у страницы данных: язык живёт в
 * `LanguageContext` на стороне браузера, и серверный компонент его не
 * видит. Пока разметка была серверной, страница оставалась русской при
 * любом переключении языка.
 *
 * ЧИСЛА СОСТОЯНИЯ РАБОТЫ берутся из `../data/данные`, а не дублируются
 * здесь: это ровно те же величины, что и на странице данных, и разойтись
 * они не должны ни при каком обновлении замера.
 *
 * ЧЕТЫРЕ СВОИХ САЙТА в разделе «Мы проверили и себя» — не текст, а замер,
 * поэтому лежат прямо здесь и на всех языках одинаковы.
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../lib/LanguageContext';
import { ТЕКСТЫ, type ЯзыкКод } from './словарь';
import { СНИМОК, Ч as Ч_РУССКИЕ } from '../data/данные';
import { числаНаЯзыке } from '../числа_на_языке';

const ТЕКСТ: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.75,
  color: '#cbd5e1',
  marginBottom: 18,
};

const ЗАГ2: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  marginTop: 44,
  marginBottom: 16,
  color: '#f1f5f9',
};

const ЗАГ3: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  marginTop: 28,
  marginBottom: 12,
  color: '#e2e8f0',
};

const ЯЧЕЙКА: React.CSSProperties = {
  padding: '9px 12px',
  borderBottom: '1px solid rgba(148,163,184,0.12)',
  fontSize: 14,
  color: '#cbd5e1',
};

const ШАПКА: React.CSSProperties = {
  textAlign: 'left',
  padding: '9px 12px',
  borderBottom: '1px solid rgba(148,163,184,0.3)',
  fontSize: 13,
  color: '#94a3b8',
  fontWeight: 600,
};

const КОД: React.CSSProperties = { color: '#22d3ee' };

/** Наши собственные сайты — замер 27.08.2026, одинаковый на всех языках. */
const СВОИ_САЙТЫ: Array<[string, string, number, number]> = [
  ['codeofdigitaleternity.com', 'solid 3px', 91, 0],
  ['aifa.works', 'solid 2px', 104, 0],
  ['aifa.digital', 'solid 3px', 67, 0],
  ['radiocode.space', 'auto 1px', 46, 0],
];

function датаСнимка(язык: ЯзыкКод): string {
  const карта: Record<ЯзыкКод, string> = {
    ru: 'ru-RU', en: 'en-US', es: 'es-ES', zh: 'zh-CN',
  };
  const д = new Date(Date.UTC(СНИМОК.год, СНИМОК.месяц - 1, СНИМОК.день));
  return д.toLocaleDateString(карта[язык], {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
}

export default function MethodologyClient({ языкИзПути }: { языкИзПути?: string } = {}) {
  const { locale } = useLanguage();
  // 🔴 ЯЗЫК ИЗ ПУТИ СТАРШЕ КОНТЕКСТА (05.09.2026). На aifa.digital
  // серверная разметка всегда выходила английской: язык там живёт в
  // клиентском хранилище со значением `en` по умолчанию. Проп из
  // заголовка `x-locale` чинит это, не трогая контекст сайта.
  const _изПути = ['ru', 'en', 'es', 'zh'].includes(языкИзПути || '') ? языкИзПути : null;
  const язык = (['ru', 'en', 'es', 'zh'].includes(_изПути || locale) ? (_изПути || locale) : 'en') as ЯзыкКод;
  const т = ТЕКСТЫ[язык];
  // Числа — в записи языка читателя. Без этого английская
  // методология показывала «53,8» и «11 902» (замер 01.09.2026).
  const Ч = числаНаЯзыке(Ч_РУССКИЕ, язык);
  const дата = датаСнимка(язык);

  const ПОКАЗАТЕЛИ: Array<[string, string]> = [
    [т.показатель.records, Ч.записей],
    [т.показатель.municipalities, Ч.муниципалитетов],
    [т.показатель.states, Ч.штатов],
    [т.показатель.screenshots, Ч.сСнимком],
    [т.показатель.gap, `${Ч.расхождение} %`],
  ];

  const ПОЛЯ = ['steps', 'seconds', 'brokeAt', 'reason', 'labels', 'contrast', 'screenshot', 'verdict', 'script'];
  const БАРЬЕРЫ = ['focus', 'trap', 'label', 'button', 'modal'];
  const ОГРАНИЧЕНИЯ = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  const ОТКРЫТОСТЬ = ['raw', 'code', 'shots', 'errors'];

  return (
    <main style={{ minHeight: '100vh', background: '#05070d', color: '#e2e8f0', padding: '96px 24px 60px' }}>
      <article style={{ maxWidth: 900, margin: '0 auto' }}>

        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(6,182,212,0.4)', color: '#22d3ee', fontSize: 13, marginBottom: 18 }}>
          {т.метка}
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.25, marginBottom: 14 }}>
          {т.заголовок}
        </h1>

        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>{т.версия(дата)}</p>

        <h2 style={ЗАГ2}>{т.зачемМетодика}</h2>
        <p style={ТЕКСТ}>{т.зачем1}</p>
        <p style={ТЕКСТ}>{т.зачем2}</p>
        <p style={ТЕКСТ}>{т.зачем3}</p>

        <h2 style={ЗАГ2}>{т.частьI}</h2>

        <h3 style={ЗАГ3}>{т.чтоБерём}</h3>
        <p style={ТЕКСТ}>{т.выборкаСША}</p>
        <p style={ТЕКСТ}>{т.отличиеОтПодборки}</p>
        <p style={ТЕКСТ}>{т.выборкаЕвропа}</p>

        <div style={{ border: '1px solid rgba(148,163,184,0.18)', borderRadius: 10, padding: '14px 16px', marginBottom: 20, background: 'rgba(148,163,184,0.03)' }}>
          <strong style={{ color: '#94a3b8', fontSize: 15 }}>{т.ограничениеВыборкиЗаголовок}</strong>
          <p style={{ ...ТЕКСТ, marginBottom: 0, marginTop: 8, fontSize: 15 }}>{т.ограничениеВыборкиТекст}</p>
        </div>

        <h3 style={ЗАГ3}>{т.какПроверяем}</h3>
        <p style={ТЕКСТ}>{т.браузерНеЗапрос}</p>
        <p style={ТЕКСТ}>{т.чтоДелаемНаСайте}</p>

        <h3 style={ЗАГ3}>{т.чтоСчитаем}</h3>
        <p style={ТЕКСТ}>{т.плотностьНарушений}</p>

        <h3 style={ЗАГ3}>{т.чегоНеДелаем}</h3>
        <p style={ТЕКСТ}>{т.неДелаемТекст}</p>

        <h2 style={ЗАГ2}>{т.частьII}</h2>
        <p style={ТЕКСТ}>{т.здесьНачинается}</p>

        <h3 style={ЗАГ3}>{т.задачаПроверяющего}</h3>
        <p style={ТЕКСТ}>{т.задачаТекст}</p>

        <h3 style={ЗАГ3}>{т.ктоПроверяющий}</h3>
        <p style={ТЕКСТ}><strong>{т.ктоПроверяющийГлавное}</strong></p>
        <p style={ТЕКСТ}>{т.ктоПроверяющийКак}</p>
        <p style={ТЕКСТ}>
          <strong>{т.чтоЭтоДаётЗаголовок}</strong>
          {т.чтоЭтоДаётТекст}
        </p>
        <p style={{ ...ТЕКСТ, borderLeft: '3px solid #f59e0b', paddingLeft: 16 }}>
          <strong>{т.чегоНеДаётЗаголовок}</strong>
          {т.чегоНеДаётТекст}
        </p>

        <h3 style={ЗАГ3}>{т.чтоЗаписывается}</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
            <thead>
              <tr>
                <th style={ШАПКА}>{т.шапкаПоле}</th>
                <th style={ШАПКА}>{т.шапкаЧтоОзначает}</th>
              </tr>
            </thead>
            <tbody>
              {ПОЛЯ.map((к) => (
                <tr key={к}>
                  <td style={ЯЧЕЙКА}>
                    {к === 'verdict'
                      ? <code style={{ color: '#94a3b8' }}>{т.поле[к]}</code>
                      : к === 'script'
                        ? <strong style={КОД}>{т.поле[к]}</strong>
                        : т.поле[к]}
                  </td>
                  <td style={ЯЧЕЙКА}>
                    {к === 'script' ? <strong>{т.полеЗначение[к]}</strong> : т.полеЗначение[к]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={ТЕКСТ}>{т.последнееПолеКлючевое}</p>

        <h3 style={ЗАГ3}>{т.чтоСчитаетсяБарьером}</h3>
        <ul style={{ ...ТЕКСТ, paddingLeft: 22 }}>
          {БАРЬЕРЫ.map((к) => (
            <li key={к} style={{ marginBottom: 8 }}>{т.барьер[к]}</li>
          ))}
        </ul>

        <h3 style={ЗАГ3}>{т.выборОбеихГрупп}</h3>
        <p style={ТЕКСТ}>{т.выборОбеихГруппТекст}</p>

        <h2 style={ЗАГ2}>{т.частьIII}</h2>
        <p style={ТЕКСТ}>{т.главнаяВеличина}</p>
        <p style={ТЕКСТ}>
          <strong style={КОД}>{т.ложноеСпокойствие}</strong>{т.ложноеСпокойствиеТекст}
          <br />
          <strong style={КОД}>{т.ложнаяТревога}</strong>{т.ложнаяТревогаТекст}
        </p>

        <h2 style={ЗАГ2}>{т.состояниеРаботы(дата)}</h2>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 420 }}>
            <thead>
              <tr>
                <th style={ШАПКА}>{т.шапкаПоказатель}</th>
                <th style={{ ...ШАПКА, textAlign: 'right' }}>{т.шапкаЗначение}</th>
              </tr>
            </thead>
            <tbody>
              {ПОКАЗАТЕЛИ.map(([имя, значение]) => (
                <tr key={имя}>
                  <td style={ЯЧЕЙКА}>{имя}</td>
                  <td style={{ ...ЯЧЕЙКА, textAlign: 'right', color: '#22d3ee', fontWeight: 600 }}>{значение}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={ЗАГ2}>{т.ограничения}</h2>
        {ОГРАНИЧЕНИЯ.map((к) => (
          <p key={к} style={ТЕКСТ}>{т.ограничение[к]}</p>
        ))}

        <h2 style={ЗАГ2}>{т.открытость}</h2>
        <ul style={{ ...ТЕКСТ, paddingLeft: 22 }}>
          {ОТКРЫТОСТЬ.map((к) => (
            <li key={к} style={{ marginBottom: 8 }}>{т.открытостьПункт[к]}</li>
          ))}
        </ul>

        <h2 style={ЗАГ2}>{т.проверилиСебя}</h2>
        <p style={ТЕКСТ}>{т.проверилиСебяТекст}</p>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
            <thead>
              <tr>
                <th style={ШАПКА}>{т.шапкаСайт}</th>
                <th style={ШАПКА}>{т.шапкаОбводка}</th>
                <th style={{ ...ШАПКА, textAlign: 'right' }}>{т.шапкаЭлементов}</th>
                <th style={{ ...ШАПКА, textAlign: 'right' }}>{т.шапкаБезИмени}</th>
              </tr>
            </thead>
            <tbody>
              {СВОИ_САЙТЫ.map(([с, о, э, б]) => (
                <tr key={с}>
                  <td style={ЯЧЕЙКА}><code style={КОД}>{с}</code></td>
                  <td style={ЯЧЕЙКА}>{о}</td>
                  <td style={{ ...ЯЧЕЙКА, textAlign: 'right' }}>{э}</td>
                  <td style={{ ...ЯЧЕЙКА, textAlign: 'right' }}>{б}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ ...ТЕКСТ, marginTop: 16 }}>{т.нашлиУСебя}</p>

        <h2 style={ЗАГ2}>{т.раскрытие}</h2>
        <div style={{ border: '1px solid rgba(148,163,184,0.18)', borderRadius: 10, padding: '14px 16px', marginBottom: 22, background: 'rgba(148,163,184,0.03)' }}>
          <p style={{ ...ТЕКСТ, marginBottom: 0, fontSize: 15 }}>{т.раскрытиеТекст}</p>
        </div>

        <h2 style={ЗАГ2}>{т.какСослаться}</h2>
        <p style={{ ...ТЕКСТ, fontSize: 15, color: '#94a3b8' }}>
          Maksim Galatin &amp; Claude (Anthropic). Municipal Website Accessibility: Automated Scan
          versus Keyboard Traversal. AIfa Works, 2026. CC BY 4.0. aifa.works/research/methodology
        </p>

        <h2 style={ЗАГ2}>{т.обратнаяСвязь}</h2>
        <p style={ТЕКСТ}>
          {т.обратнаяСвязьТекст}
          <a href="mailto:contact@codeofdigitaleternity.com" style={КОД}>
            contact@codeofdigitaleternity.com
          </a>
        </p>
        <p style={ТЕКСТ}>
          {т.данныеСсылка}
          <Link href="/research/data" style={КОД}>aifa.works/research/data</Link>
        </p>

      </article>
    </main>
  );
}
