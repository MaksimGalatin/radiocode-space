'use client';

/**
 * СТРАНИЦА ДАННЫХ — КЛИЕНТСКАЯ ЧАСТЬ.
 *
 * ПОЧЕМУ КЛИЕНТСКАЯ. Язык на этом сайте выбирается в шапке и живёт в
 * `LanguageContext` на стороне браузера, а не в адресе страницы. Пока
 * разметка лежала в серверном компоненте, страница оставалась РУССКОЙ при
 * любом переключении языка — ровно это Архитектор и увидел на боевом
 * сайте: испанская шапка и русский текст под ней.
 *
 * Метаданные остаются серверными (см. `page.tsx`): поисковому роботу
 * отдаётся одно описание, не зависящее от выбора человека.
 *
 * ТЕКСТЫ — в `словарь.ts`, ЧИСЛА — в `данные.ts`. Ни одного числа здесь
 * нет намеренно: иначе при следующем замере пришлось бы искать их по
 * разметке, а часть неизбежно осталась бы старой.
 */

import React from 'react';
import Link from 'next/link';
import { useLanguageOptional } from '../../../lib/LanguageContext';
import { ТЕКСТЫ, type ЯзыкКод } from './словарь';
import {
  СНИМОК, Ч as Ч_РУССКИЕ, РОСТ as РОСТ_РУССКИЙ, ВЕНДОРЫ, ШТАТЫ,
  ПО_ТИПАМ_СТРАНИЦ, МЁРТВЫЕ_ДОМЕНЫ, ПОД_СРОК_ADA, ФОКУС_ПО_ПЛАТФОРМАМ,
  ПРИЧИНЫ_ОБРЫВА, ЗАКРЫТЫЕ_ШТАТЫ, ВЕРДИКТЫ,
  МЕХАНИЗМ_РАСХОЖДЕНИЯ, МЕХАНИЗМ,
  КОГО_КАСАЕТСЯ as КОГО_КАСАЕТСЯ_РУССКИЕ, СЕМЕЙСТВО_НЕИЗМЕРИМО,
  ФАЗА2 as ФАЗА2_РУССКИЕ,
} from './данные';
import { числаНаЯзыке } from '../числа_на_языке';


const ЯЧЕЙКА: React.CSSProperties = {
  padding: '9px 12px',
  borderBottom: '1px solid rgba(148,163,184,0.12)',
  fontSize: 14,
};

const ШАПКА: React.CSSProperties = {
  textAlign: 'left',
  padding: '9px 12px',
  borderBottom: '1px solid rgba(148,163,184,0.3)',
  fontSize: 13,
  color: '#94a3b8',
  fontWeight: 600,
};

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

const ЧИСЛОВАЯ: React.CSSProperties = {
  padding: '7px 10px',
  borderBottom: '1px solid rgba(148,163,184,0.12)',
  textAlign: 'right',
};

const ШАПКА_ЧИСЛОВАЯ: React.CSSProperties = {
  textAlign: 'right',
  padding: '8px 10px',
  borderBottom: '1px solid rgba(148,163,184,0.3)',
  color: '#94a3b8',
};

const ШАПКА_ЛЕВАЯ: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 10px',
  borderBottom: '1px solid rgba(148,163,184,0.3)',
  color: '#94a3b8',
};

const КОД: React.CSSProperties = {
  background: 'rgba(148,163,184,0.15)',
  padding: '2px 6px',
  borderRadius: 4,
};

/**
 * Дата снимка на языке читателя. Русская запись «27 августа 2026, 20:20»
 * в китайской странице выглядит как чужеродная вставка, а формат
 * `toLocaleDateString` даёт каждому языку его собственный порядок частей.
 */
function датаСнимка(язык: ЯзыкКод): string {
  const карта: Record<ЯзыкКод, string> = {
    ru: 'ru-RU', en: 'en-US', es: 'es-ES', zh: 'zh-CN',
  };
  const д = new Date(Date.UTC(СНИМОК.год, СНИМОК.месяц - 1, СНИМОК.день, СНИМОК.часы, СНИМОК.минуты));
  const дата = д.toLocaleDateString(карта[язык], {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  });
  const время = String(СНИМОК.часы).padStart(2, '0') + ':' + String(СНИМОК.минуты).padStart(2, '0');
  return `${дата}, ${время}`;
}

export default function DataClient({ языкИзПути }: { языкИзПути?: string } = {}) {
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  // 🔴 ЯЗЫК ИЗ ПУТИ СТАРШЕ КОНТЕКСТА (05.09.2026). На aifa.digital
  // серверная разметка всегда выходила английской: язык там живёт в
  // клиентском хранилище со значением `en` по умолчанию. Проп из
  // заголовка `x-locale` чинит это, не трогая контекст сайта.
  const _изПути = ['ru', 'en', 'es', 'zh'].includes(языкИзПути || '') ? языкИзПути : null;
  // Незнакомый язык — не пустая страница, а английский: он понятен большему
  // числу людей, чем пустота.
  const язык = (['ru', 'en', 'es', 'zh'].includes(_изПути || locale) ? (_изПути || locale) : 'en') as ЯзыкКод;
  const т = ТЕКСТЫ[язык];
  // Разделитель тысяч тоже язык: 44 919 в русском, 44,919 в английском.
  const чис = (n: number) => n.toLocaleString(язык === 'ru' ? 'ru' : язык === 'zh' ? 'zh' : язык === 'es' ? 'es' : 'en');
  // Числа в записи языка читателя. См. `числаНаЯзыке` выше.
  //
  // Блоков три, а не один: замер после починки одного лишь `Ч` показал,
  // что восемь чисел с русской запятой пришли из `РОСТ`, а девять чисел
  // с пробелом в тысячах — из `КОГО_КАСАЕТСЯ`.
  const Ч = числаНаЯзыке(Ч_РУССКИЕ, язык);
  const РОСТ = числаНаЯзыке(РОСТ_РУССКИЙ, язык);
  const КОГО_КАСАЕТСЯ = числаНаЯзыке(КОГО_КАСАЕТСЯ_РУССКИЕ, язык);
  // Фаза 2 — числа промежуточные, подписаны датой снимка (03.09.2026).
  const Ф = числаНаЯзыке(ФАЗА2_РУССКИЕ, язык);

  return (
    <main style={{ minHeight: '100vh', background: '#05070d', color: '#e2e8f0', padding: '96px 24px 60px' }}>
      <article style={{ maxWidth: 900, margin: '0 auto' }}>

        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(6,182,212,0.4)', color: '#22d3ee', fontSize: 13, marginBottom: 18 }}>
          {т.метка}
        </div>

        <h1 style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.25, marginBottom: 14 }}>
          {т.заголовок}
        </h1>

        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 32 }}>
          {т.подпись(датаСнимка(язык))} · {т.проверкаИдёт} · Maksim Galatin &amp; Claude (Anthropic) · CC BY 4.0
        </p>


        {/* ВИТРИНА ЧИСЕЛ — 01.09.2026.
            Человек должен увидеть вес работы до того, как начнёт читать
            методику. Числа берутся из `данные.ts`, а не вписаны сюда:
            при следующем замере они обновятся сами. */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 14,
          margin: '4px 0 26px',
        }}>
          {[
            [Ч.записей, т.витринаОбходов],
            [Ч.муниципалитетов, т.витринаМуниципалитетов],
            [Ч.сСнимком, т.витринаСнимков],
            [Ч.расхождение + ' %', т.витринаРасхождение],
          ].map(([число, подпись]) => (
            <div key={подпись} style={{
              border: '1px solid rgba(148,163,184,0.18)',
              borderRadius: 12,
              padding: '16px 14px',
              background: 'rgba(15,23,42,0.5)',
            }}>
              <div style={{ fontSize: 27, fontWeight: 800, color: '#22d3ee',
                            lineHeight: 1.15, marginBottom: 6 }}>{число}</div>
              <div style={{ fontSize: 13, color: '#94a3b8',
                            lineHeight: 1.4 }}>{подпись}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10,
                      marginBottom: 34 }}>
          <a href="/data/traversal-log-2026-09-01.jsonl.gz"
             style={{ padding: '10px 18px', borderRadius: 999,
                      border: '1px solid rgba(6,182,212,0.5)', color: '#22d3ee',
                      fontSize: 14, textDecoration: 'none' }}>
            {т.витринаКнопкаДанные}
          </a>
          <a href="/data/traversal-log-SCHEMA.md"
             style={{ padding: '10px 18px', borderRadius: 999,
                      border: '1px solid rgba(148,163,184,0.3)', color: '#cbd5e1',
                      fontSize: 14, textDecoration: 'none' }}>
            {т.витринаКнопкаСхема}
          </a>
          <Link href="/research/methodology"
             style={{ padding: '10px 18px', borderRadius: 999,
                      border: '1px solid rgba(148,163,184,0.3)', color: '#cbd5e1',
                      fontSize: 14, textDecoration: 'none' }}>
            {т.витринаКнопкаМетод}
          </Link>
        </div>

        <p style={ТЕКСТ}>
          {т.методВступление1}
          <strong>{т.методВступление2}</strong>
          {т.методВступление3}
        </p>

        <p style={ТЕКСТ}>{т.методРядом}</p>

        <p style={{ ...ТЕКСТ, borderLeft: '3px solid #22d3ee', paddingLeft: 16 }}>
          <strong>{т.ключевоеЖирным}</strong>
          {т.ключевоеТекст(Ч.расхождение)}
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={ШАПКА_ЛЕВАЯ}>{т.ростШапкаЗаписей}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.ростШапкаРасхождение}</th>
              </tr>
            </thead>
            <tbody>
              {РОСТ.map(([з, р]) => (
                <tr key={з}>
                  <td style={{ padding: '7px 12px', borderBottom: '1px solid rgba(148,163,184,0.12)' }}>{з}</td>
                  <td style={{ ...ЧИСЛОВАЯ, color: '#22d3ee' }}>{р}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={ТЕКСТ}>{т.ростВывод}</p>

        <h2 style={ЗАГ2}>{т.сколькоСделано}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { ч: Ч.записей, п: т.карточкаЗаписи },
            { ч: Ч.муниципалитетов, п: т.карточкаМуниципалитетов },
            { ч: Ч.штатов, п: т.карточкаШтатов },
            { ч: Ч.сСнимком, п: т.карточкаСоСнимком },
          ].map((к) => (
            <div key={к.п} style={{ border: '1px solid rgba(148,163,184,0.18)', borderRadius: 12, padding: '18px 20px', background: 'rgba(148,163,184,0.03)' }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#22d3ee', lineHeight: 1.1 }}>{к.ч}</div>
              <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 6 }}>{к.п}</div>
            </div>
          ))}
        </div>

        <p style={{ ...ТЕКСТ, fontSize: 15, color: '#94a3b8' }}>
          {т.выборкаИзРеестра(Ч.вРеестре)}
        </p>

        <h2 style={ЗАГ2}>{т.результатОбхода}</h2>

        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
            <thead>
              <tr>
                <th style={ШАПКА}>{т.шапкаИтог}</th>
                <th style={ШАПКА}>{т.шапкаСтраниц}</th>
                <th style={ШАПКА}>{т.шапкаДоля}</th>
              </tr>
            </thead>
            <tbody>
              {ВЕРДИКТЫ.map((в) => (
                <tr key={в.ключ}>
                  <td style={ЯЧЕЙКА}>{т.вердикт[в.ключ]}</td>
                  <td style={ЯЧЕЙКА}>{чис(в.n)}</td>
                  <td style={{ ...ЯЧЕЙКА, color: в.ключ === 'accessible' ? '#22d3ee' : '#cbd5e1', fontWeight: в.ключ === 'accessible' ? 600 : 400 }}>
                    {в.доля} %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={ТЕКСТ}>{т.итогДошёл(Ч.дошёл, Ч.формальныйБарьер)}</p>

        {/*
          РАЗБИВКА «НЕИЗМЕРИМОГО». Стояла в данных, но в вёрстку не
          импортировалась — то есть была написана и не показана.

          Показана 30.08.2026, когда выполнилось условие, записанное в
          трекере при её создании: доля пяти «мёртвых» вердиктов в
          неизмеримом выросла с 3,0 % до 12,4 % (4 258 записей из 34 251).
          Пока доля была три процента, строка «домена нет — 0,5 %» рядом
          с «неизмеримо — 42,8 %» читалась бы как полная картина причин.
        */}
        <h2 style={ЗАГ2}>{т.причинаЗаголовок}</h2>

        <p style={ТЕКСТ}>
          {т.причинаВступление(Ч.доляМёртвыхВНеизмеримом, Ч.записейМёртвыхВНеизмеримом)}
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
            <thead>
              <tr>
                <th style={ШАПКА}>{т.шапкаИтог}</th>
                <th style={ШАПКА}>{т.шапкаСтраниц}</th>
                <th style={ШАПКА}>{т.шапкаДоля}</th>
              </tr>
            </thead>
            <tbody>
              {СЕМЕЙСТВО_НЕИЗМЕРИМО.map((п) => (
                <tr key={п.ключ}>
                  <td style={ЯЧЕЙКА}>{т.причина[п.ключ]}</td>
                  <td style={ЯЧЕЙКА}>{чис(п.n)}</td>
                  <td style={ЯЧЕЙКА}>{п.доля} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        <h2 style={ЗАГ2}>{т.сравнениеПлатформ}</h2>

        <p style={ТЕКСТ}>{т.платформыВступление}</p>

        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 560 }}>
            <thead>
              <tr>
                <th style={ШАПКА}>{т.шапкаПлатформа}</th>
                <th style={ШАПКА}>{т.шапкаСтраниц}</th>
                <th style={ШАПКА}>{т.шапкаОбходДошёл}</th>
                <th style={ШАПКА}>{т.шапкаБарьер}</th>
              </tr>
            </thead>
            <tbody>
              {ВЕНДОРЫ.map((в) => (
                <tr key={в.ключ}>
                  <td style={ЯЧЕЙКА}>
                    {в.имя ?? т.вендор[в.ключ]}
                    {в.мало && <span style={{ color: '#64748b', fontSize: 13 }}>{т.выборкаМала}</span>}
                  </td>
                  <td style={ЯЧЕЙКА}>{чис(в.страниц)}</td>
                  <td style={{ ...ЯЧЕЙКА, color: '#22d3ee' }}>{в.доступно} %</td>
                  <td style={ЯЧЕЙКА}>{в.барьер} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ border: '1px solid rgba(148,163,184,0.18)', borderRadius: 10, padding: '14px 16px', marginBottom: 18, background: 'rgba(148,163,184,0.03)' }}>
          <p style={{ ...ТЕКСТ, marginBottom: 0, fontSize: 15 }}>
            <strong>{т.осторожноЖирным}</strong>
            {т.осторожноТекст}
          </p>
        </div>

        <p style={ТЕКСТ}>{т.выводПлатформ}</p>

        <h2 style={ЗАГ2}>{т.охватШтатов}</h2>

        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 420 }}>
            <thead>
              <tr>
                <th style={ШАПКА}>{т.шапкаШтат}</th>
                <th style={ШАПКА}>{т.шапкаСтраницПроверено}</th>
                <th style={ШАПКА}>{т.шапкаГородов}</th>
              </tr>
            </thead>
            <tbody>
              {ШТАТЫ.map((ш) => (
                <tr key={ш.к}>
                  <td style={ЯЧЕЙКА}>{ш.к}</td>
                  <td style={ЯЧЕЙКА}>{чис(ш.страниц)}</td>
                  <td style={ЯЧЕЙКА}>{ш.городов}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ ...ТЕКСТ, fontSize: 15, color: '#94a3b8' }}>{т.охватПояснение}</p>

        <h2 style={ЗАГ2}>{т.чемНужнее}</h2>

        <p style={ТЕКСТ}>{т.чемНужнееВступление}</p>

        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520, fontSize: 14 }}>
            <thead>
              <tr>
                <th style={ШАПКА_ЛЕВАЯ}>{т.шапкаСтраница}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаДошёл}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаФокусСброшен}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаНажатий}</th>
              </tr>
            </thead>
            <tbody>
              {ПО_ТИПАМ_СТРАНИЦ.map((с) => (
                <tr key={с.ключ}>
                  <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(148,163,184,0.12)' }}>{т.типСтраницы[с.ключ]}</td>
                  <td style={{ ...ЧИСЛОВАЯ, color: с.дошёл < 21 ? '#f87171' : (с.дошёл > 35 ? '#22d3ee' : '#e2e8f0') }}>{с.дошёл} %</td>
                  <td style={ЧИСЛОВАЯ}>{с.фокус} %</td>
                  <td style={ЧИСЛОВАЯ}>{с.шагов}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={ТЕКСТ}>{т.оплатаПротивКалендаря}</p>
        <p style={ТЕКСТ}>{т.почемуТак}</p>
        <p style={ТЕКСТ}>{т.выводЧинить}</p>

        <h2 style={ЗАГ2}>{т.мёртвые}</h2>

        <p style={ТЕКСТ}>{т.мёртвыеВступление(Ч.неответивших)}</p>

        <div style={{ marginBottom: 20 }}>
          {МЁРТВЫЕ_ДОМЕНЫ.map((п) => (
            <div key={п.ключ} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
                <span>{т.мёртваяПричина[п.ключ]}</span>
                <span style={{ color: '#94a3b8' }}>{чис(п.n)} · {п.доля} %</span>
              </div>
              <div style={{ height: 6, background: 'rgba(148,163,184,0.12)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${п.доля}%`, height: '100%', background: п.доля > 50 ? '#f87171' : '#22d3ee' }} />
              </div>
            </div>
          ))}
        </div>

        <p style={ТЕКСТ}>{т.мёртвыеВывод(Ч.мёртвыхДоменов, Ч.долявМёртвых)}</p>
        <p style={ТЕКСТ}>{т.живыДляЧеловека}</p>

        {/* ВАРИАНТ «В»: ОБА СПОСОБА СЧЁТА РЯДОМ.
            Решение Архитектора 31.08.2026. Способ без мёртвых доменов
            даёт результат ХУЖЕ для проверяемых сайтов — и именно поэтому
            его нельзя было выбрать молча: это выглядело бы как подгонка.
            Показываем оба и называем разницу вслух. */}
        <h2 style={ЗАГ2}>{т.дваСпособаЗаголовок}</h2>
        {т.дваСпособа(
          Ч.записей,
          Ч.формальныйБарьер,
          Ч.знаменательБезМёртвых,
          Ч.формальныйБарьерБезМёртвых,
          Ч.разрывСпособов,
          Ч.барьеровНаМёртвых,
        ).split('\n\n').map((абзац, i) => (
          <p key={i} style={ТЕКСТ}>{абзац}</p>
        ))}

        <h2 style={ЗАГ2}>{т.подСрок}</h2>

        <p style={ТЕКСТ}>{т.подСрокВступление}</p>

        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 560, fontSize: 14 }}>
            <thead>
              <tr>
                <th style={ШАПКА_ЛЕВАЯ}>{т.шапкаГруппа}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаМуниципалитетов}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаДошёл}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаСканерОшибся}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаФокусСброшен}</th>
              </tr>
            </thead>
            <tbody>
              {ПОД_СРОК_ADA.map((г) => (
                <tr key={г.ключ}>
                  <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(148,163,184,0.12)' }}>{т.группаADA[г.ключ]}</td>
                  <td style={ЧИСЛОВАЯ}>{чис(г.муниципалитетов)}</td>
                  <td style={{ ...ЧИСЛОВАЯ, color: '#22d3ee' }}>{г.дошёл} %</td>
                  <td style={ЧИСЛОВАЯ}>{г.расхождение} %</td>
                  <td style={ЧИСЛОВАЯ}>{г.фокус} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={ТЕКСТ}>{т.крупныеЛучше}</p>
        <p style={ТЕКСТ}>{т.разрывФокуса}</p>

        <h2 style={ЗАГ2}>{т.чтоЧинить}</h2>

        <p style={ТЕКСТ}>{т.чтоЧинитьВступление(Ч.открылось, Ч.неДошёл)}</p>

        <div style={{ marginBottom: 20 }}>
          {ПРИЧИНЫ_ОБРЫВА.map((п) => (
            <div key={п.ключ} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
                <span>{т.причинаОбрыва[п.ключ]}</span>
                <span style={{ color: '#94a3b8' }}>{чис(п.n)} · {п.доля} %</span>
              </div>
              <div style={{ height: 6, background: 'rgba(148,163,184,0.12)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${п.доля}%`, height: '100%', background: '#22d3ee' }} />
              </div>
            </div>
          ))}
        </div>

        {/* МЕХАНИЗМ РАСХОЖДЕНИЯ — 01.09.2026.
            Найдено при разборе журнала по замечаниям научной рецензии.
            Знаменатель здесь УЖЕ, чем у блока выше: только страницы, где
            сканер молчал, а обход не дошёл. Это числитель главного числа. */}
        <h2 style={ЗАГ2}>{т.механизмЗаголовок}</h2>
        <p style={ТЕКСТ}>
          {т.механизмТекст(МЕХАНИЗМ.знаменатель, МЕХАНИЗМ.сайтов,
                           МЕХАНИЗМ.сайтовДоля)}
        </p>
        <div style={{ marginBottom: 20 }}>
          {МЕХАНИЗМ_РАСХОЖДЕНИЯ.map((п) => (
            <div key={п.ключ} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 4 }}>
                <span>{т.причинаОбрыва[п.ключ]}</span>
                <span style={{ color: '#94a3b8' }}>{чис(п.n)} · {п.доля} %</span>
              </div>
              <div style={{ height: 6, background: 'rgba(148,163,184,0.12)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${п.доля}%`, height: '100%', background: '#f59e0b' }} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ ...ТЕКСТ, borderLeft: '3px solid #f59e0b', paddingLeft: 16 }}>
          {т.механизмВывод}
        </p>

        <p style={ТЕКСТ}>{т.втораяСтрока(Ч.outlineNone)}</p>
        <p style={ТЕКСТ}>{т.малоШагов}</p>
        <p style={ТЕКСТ}>{т.дефектИлиПривычка}</p>

        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520, fontSize: 14 }}>
            <thead>
              <tr>
                <th style={ШАПКА_ЛЕВАЯ}>{т.шапкаПлатформа}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаИзмеримых}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаФокусСброшен}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаДоля}</th>
              </tr>
            </thead>
            <tbody>
              {ФОКУС_ПО_ПЛАТФОРМАМ.map((п) => (
                <tr key={п.ключ}>
                  <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(148,163,184,0.12)' }}>{п.имя ?? т.вендор[п.ключ]}</td>
                  <td style={ЧИСЛОВАЯ}>{чис(п.измеримых)}</td>
                  <td style={ЧИСЛОВАЯ}>{чис(п.сброшен)}</td>
                  <td style={{ ...ЧИСЛОВАЯ, color: п.доля >= 24 ? '#f87171' : '#e2e8f0' }}>{п.доля} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={ТЕКСТ}>{т.выводПеревернулся(Ч.записей)}</p>

        <p style={{ ...ТЕКСТ, borderLeft: '3px solid #f59e0b', paddingLeft: 16 }}>
          <strong>{т.wixЖирным}</strong>
          {т.wixТекст}
        </p>

        <p style={ТЕКСТ}>{т.wixОговорки}</p>

        <h2 style={ЗАГ2}>{т.сплошь(Ч.закрытыхШтатов)}</h2>

        <p style={ТЕКСТ}>{т.сплошьВступление(датаСнимка(язык))}</p>

        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 760, fontSize: 13 }}>
            <thead>
              <tr>
                <th style={ШАПКА_ЛЕВАЯ}>{т.шапкаШтат}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаВРеестре}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаПройдено}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаПокрытие}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаСтраниц}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаДоступно}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаЧастично}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаБарьер}</th>
                <th style={ШАПКА_ЧИСЛОВАЯ}>{т.шапкаНеизмеримо}</th>
              </tr>
            </thead>
            <tbody>
              {ЗАКРЫТЫЕ_ШТАТЫ.map((с) => (
                <tr key={с.к}>
                  <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(148,163,184,0.12)' }}>{с.к}</td>
                  <td style={ЧИСЛОВАЯ}>{с.всего}</td>
                  <td style={ЧИСЛОВАЯ}>{с.пройдено}</td>
                  <td style={{ ...ЧИСЛОВАЯ, color: с.доля >= 90 ? '#22d3ee' : '#e2e8f0' }}>{с.доля.toFixed(1)} %</td>
                  <td style={ЧИСЛОВАЯ}>{с.страниц}</td>
                  {/* Доступное — единственное, что здесь хорошая новость,
                      поэтому оно и подсвечено. Остальные доли нейтральны:
                      окрашивать «барьер» красным значило бы давить на
                      читателя цветом там, где хватает числа. */}
                  <td style={{ ...ЧИСЛОВАЯ, color: с.доступно >= 20 ? '#22d3ee' : '#e2e8f0' }}>{с.доступно.toFixed(1)} %</td>
                  <td style={ЧИСЛОВАЯ}>{с.частично.toFixed(1)} %</td>
                  <td style={ЧИСЛОВАЯ}>{с.барьер.toFixed(1)} %</td>
                  <td style={ЧИСЛОВАЯ}>{с.неизмеримо.toFixed(1)} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={ТЕКСТ}>{т.почемуВажнее}</p>
        <p style={ТЕКСТ}>{т.расхождениеЗакрытых(Ч.расхождениеЗакрытых, Ч.расхождениеОстальных,
          Ч.разрывПунктов, Ч.записейЗакрытых, Ч.записейОстальных)}</p>
        <p style={ТЕКСТ}>{т.историяРазрыва}</p>

        {/* ФАЗА 2 — добавлено 03.09.2026 по поручению Архитектора. Стоит ПЕРЕД
            ограничениями: это новые измерения поверх закрытого массива, и
            читатель должен увидеть их до оговорок к массиву. Раздел 20
            Конституции: ни токена, ни тарифов. */}
        <h2 style={ЗАГ2}>{т.фаза2Заголовок}</h2>
        <p style={ТЕКСТ}>{т.фаза2Вступление(Ф.файловБазы, Ф.реестр)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2НаселениеЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Население(Ф.реестр, Ф.насСопост, Ф.насДоля, Ф.насExact, Ф.насNorm, Ф.насFuzzy, Ф.насНесопост, Ф.насДоляНесопост, Ф.насВыборка, Ф.насТочность)}</p>
        <div style={{ border: '1px solid rgba(148,163,184,0.18)', borderRadius: 10, padding: '14px 16px', marginBottom: 18, background: 'rgba(148,163,184,0.03)' }}>
          <p style={{ ...ТЕКСТ, marginBottom: 0, fontSize: 15 }}>{т.фаза2НаселениеОговорка(Ф.насЖителей)}</p>
        </div>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2ОверлеиЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2ОверлеиЗачем}</p>
        <p style={ТЕКСТ}>{т.фаза2Оверлеи(Ф.реестр, Ф.живых, Ф.доляЖивых, Ф.неОткрылось, Ф.овНайдено, Ф.овДоля, Ф.овНиз, Ф.овВерх)}</p>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 360 }}>
            <thead>
              <tr>
                <th style={ШАПКА}>{т.шапкаПродукт}</th>
                <th style={ШАПКА}>{т.шапкаСайтовСНакладкой}</th>
                <th style={ШАПКА}>%</th>
              </tr>
            </thead>
            <tbody>
              {Ф.овПродукты.map(([п, н, д]) => (
                <tr key={п}>
                  <td style={ЯЧЕЙКА}>{п}</td>
                  <td style={{ ...ЯЧЕЙКА, color: '#22d3ee' }}>{н}</td>
                  <td style={ЯЧЕЙКА}>{д} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={ТЕКСТ}>{т.фаза2ОверлеиМетод(Ф.выборкаБраузер)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2СкипЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Скип(Ф.живых, Ф.скипЕсть, Ф.скипДоляЕсть, Ф.скипНет, Ф.скипДоляНет, Ф.скипНеизмер, Ф.скипНиз, Ф.скипВерх)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2ПочтаЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Почта}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2WixЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Wix(Ф.wixСайтов, Ф.wixБыло, Ф.wixВсего)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2PdfЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Pdf(Ф.pdfНаДомен, Ф.pdfДоказательств)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2СкринридерЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Скринридер(Ф.axВыборка, Ф.nvdaВыборка)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.журналЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.журналВступление}</p>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>{т.журналКолДата}</th>
                <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>{т.журналКолЧто}</th>
                <th style={{ textAlign: 'left', padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>{т.журналКолПочему}</th>
              </tr>
            </thead>
            <tbody>
              {Ф.журнал.map(([д, ч, п2], i) => (
                <tr key={i}>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap', opacity: 0.75 }}>{д}</td>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{ч}</td>
                  <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(255,255,255,0.07)', opacity: 0.8 }}>{п2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2ЛюдиЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Люди(Ф.насПодНакладками, Ф.насБезСкипа)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2СвязьЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Связь(Ф.коррНакладки, Ф.коррСкип, Ф.коррN)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2Pdf2Заголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Pdf2(Ф.pdfДоменов, Ф.pdfДоля, Ф.pdfБезРазметки, Ф.pdfБезДоля)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2ИнфрЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Инфр(Ф.инфрIpv6, Ф.инфрDnssec, Ф.инфрCaa, Ф.инфрDmarc, Ф.инфрDmarcЖёстко, Ф.инфрДоменов)}</p>

        <h3 style={{ ...ЗАГ2, fontSize: 20, marginTop: 28 }}>{т.фаза2ИнтервалыЗаголовок}</h3>
        <p style={ТЕКСТ}>{т.фаза2Интервалы(Ф.ди538, Ф.ди746, Ф.ди126)}</p>
        <p style={{ ...ТЕКСТ, fontSize: 15, opacity: 0.8 }}>{т.фаза2Этика}</p>
        <p style={{ ...ТЕКСТ, fontSize: 15, opacity: 0.8 }}>{т.фаза2Итог}</p>

        <h2 style={ЗАГ2}>{т.чтоНеТак}</h2>

        <p style={ТЕКСТ}>{т.ограничение1(Ч.изРеестраПройдено, Ч.вРеестре, Ч.сверхРеестра)}</p>
        <p style={ТЕКСТ}>{т.ограничение2(Ч.записей, Ч.сПутёмКСнимку, Ч.сСнимком)}</p>
        <p style={ТЕКСТ}>{т.ограничение2бис}</p>
        <p style={ТЕКСТ}>{т.ограничение2тер(Ч.уникальныхПроверок, Ч.повторныхЗаписей, Ч.доляПовторов)}</p>
        <p style={ТЕКСТ}>{т.вернойЧисло(Ч.снимковДоля, Ч.снимковИз)}</p>
        <p style={ТЕКСТ}>{т.проСчётчикСсылок}</p>
        <p style={ТЕКСТ}>{т.проПустыеФайлы}</p>
        <p style={ТЕКСТ}>{т.причинаПустых}</p>
        <p style={ТЕКСТ}>{т.ограничение3}</p>
        <p style={ТЕКСТ}>{т.ограничение4}</p>
        {/*
          Ограничение 5 добавлено 30.08.2026 по прямому слову Архитектора:
          «540 строк не измерено... это состояние сайтов, а не наша
          недоработка, но в публикации это надо назвать прямо».

          Доля неизмеренного — первое, к чему придерётся рецензент. Пока о
          ней молчишь, вывод звучит как «мы проверили США», а проверено то,
          что открылось. Названная слабость перестаёт быть уязвимостью.
        */}
        <p style={ТЕКСТ}>{т.ограничение5}</p>
        <p style={ТЕКСТ}>{т.ограничение6}</p>
        <p style={ТЕКСТ}>{т.ограничение7}</p>

        {/*
          ОГРАНИЧЕНИЕ 8 добавлено 30.08.2026 после свежей проверки DNS.
          Оно НЕ исправляет числа, а называет факт: в доле неизмеримого
          смешаны сайты, до цели которых не дошёл человек, и сайты,
          которых не существует.

          Исправление сдвинуло бы главное число В НАШУ ПОЛЬЗУ (без
          мёртвых доменов доля барьеров растёт с 25,8 до 29,8 %), и
          потому решение о нём принимает Архитектор, а не я.
        */}
        <p style={ТЕКСТ}>
          {т.ограничение8(Ч.доляДоменовМёртвых, Ч.доменовМёртвых,
            Ч.доменовВсегоDNS, Ч.записейУМёртвых,
            Ч.записейСНевернымВердиктом, Ч.доляНеверногоВердикта,
            Ч.умерлиПослеОбхода)}
        </p>


        {/*
          КОГО ЭТО КАСАЕТСЯ НА САМОМ ДЕЛЕ (30.08.2026).

          Мысль Архитектора: доступность помогает не только людям с
          инвалидностью — с возрастом зрение ухудшается у всех.

          Раздел стоит ПОСЛЕ ограничений и ПЕРЕД раскрытием намеренно:
          сначала мы честно говорим, чего наша работа не показывает, и
          только потом — кого она касается. Обратный порядок читался бы
          как реклама.
        */}
        <h2 style={ЗАГ2}>{т.когоЗаголовок}</h2>
        <p style={ТЕКСТ}>{т.когоЛид}</p>
        <p style={ТЕКСТ}>
          {т.когоЧисла(КОГО_КАСАЕТСЯ.сПресбиопиейСША, КОГО_КАСАЕТСЯ.долиКСорока)}
        </p>
        <p style={ТЕКСТ}>{т.когоНеТолькоЗрение}</p>
        <p style={{ ...ТЕКСТ, fontSize: 15, opacity: 0.75 }}>{т.когоИсточники}</p>

        <h2 style={ЗАГ2}>{т.раскрытие}</h2>

        <div style={{ border: '1px solid rgba(148,163,184,0.18)', borderRadius: 10, padding: '14px 16px', marginBottom: 22, background: 'rgba(148,163,184,0.03)' }}>
          <p style={{ ...ТЕКСТ, marginBottom: 0, fontSize: 15 }}>{т.раскрытиеТекст}</p>
        </div>

        <p style={ТЕКСТ}>
          {т.методикаЦеликом}
          <Link href="/research/methodology" style={{ color: '#22d3ee' }}>
            aifa.works/research/methodology
          </Link>
        </p>

        <p style={ТЕКСТ}>
          {т.нашлиОшибку}
          <a href="mailto:contact@codeofdigitaleternity.com" style={{ color: '#22d3ee' }}>
            contact@codeofdigitaleternity.com
          </a>
        </p>

        {/* Раздел 20 Конституции: ровно одна нейтральная ссылка на услуги, в конце. */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(148,163,184,0.15)' }}>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>
            {т.инструментОткрыт}
            <Link href="/accessibility" style={{ color: '#94a3b8', textDecoration: 'underline' }}>
              aifa.works/accessibility
            </Link>
          </p>
        </div>

      </article>
    </main>
  );
}
