'use client';

/**
 * ОГЛАВЛЕНИЕ РАЗДЕЛА ИССЛЕДОВАНИЙ — КЛИЕНТСКАЯ ЧАСТЬ.
 *
 * ПОЧЕМУ КЛИЕНТСКАЯ. Язык на этом сайте выбирается в шапке и живёт в
 * `LanguageContext` на стороне браузера, а не в адресе страницы. Серверный
 * компонент остался бы русским при любом переключении — ровно это уже
 * случилось на `/research/data` 29.08.2026 и попало Архитектору на экран.
 *
 * ЧИСЛА БЕРУТСЯ ИЗ `data/данные.ts`, а не пишутся здесь. Их всего два —
 * записей и доменов, — и оба уже существуют в одном экземпляре рядом. Свои
 * копии разошлись бы с оригиналом при первом же новом замере, а заметил бы
 * это читатель, сверяющий оглавление с самой страницей данных.
 *
 * ЗАПИСЬ ЧИСЕЛ приводится к языку через общий `числа_на_языке`: в русском и
 * испанском «95 524» и «0,03», в английском и китайском «95,524» и «0.03».
 */

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../../lib/LanguageContext';
import { ТЕКСТЫ, type ЯзыкКод } from './словарь_оглавления';
import { Ч as Ч_РУССКИЕ, СНИМОК } from './data/данные';
import { числаНаЯзыке } from './числа_на_языке';

const ОБЁРТКА: React.CSSProperties = {
  maxWidth: 880,
  margin: '0 auto',
  padding: '48px 20px 96px',
  color: '#e2e8f0',
};

const МЕТКА: React.CSSProperties = {
  fontSize: 13,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#7dd3fc',
  marginBottom: 14,
};

const ЗАГ1: React.CSSProperties = {
  fontSize: 38,
  lineHeight: 1.2,
  fontWeight: 700,
  marginBottom: 20,
};

const ТЕКСТ: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.75,
  color: '#cbd5e1',
  marginBottom: 18,
};

const ЗАГ2: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  marginTop: 48,
  marginBottom: 16,
};

const КАРТОЧКА: React.CSSProperties = {
  display: 'block',
  padding: '20px 22px',
  marginBottom: 14,
  borderRadius: 14,
  border: '1px solid rgba(148,163,184,0.22)',
  background: 'rgba(15,23,42,0.5)',
  textDecoration: 'none',
  color: 'inherit',
};

const ИМЯ_РАЗДЕЛА: React.CSSProperties = {
  fontSize: 19,
  fontWeight: 700,
  marginBottom: 6,
  color: '#f1f5f9',
};

const ОПИСАНИЕ: React.CSSProperties = {
  fontSize: 15,
  lineHeight: 1.65,
  color: '#94a3b8',
};

const СНОСКА: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  color: '#94a3b8',
};

export default function ResearchClient() {
  const { locale } = useLanguage();
  // Незнакомый язык — не пустая страница, а английский: он понятен большему
  // числу людей, чем пустота. Так же поступают соседние страницы раздела.
  const язык: ЯзыкКод = (['ru', 'en', 'es', 'zh'] as const).includes(
    locale as ЯзыкКод,
  )
    ? (locale as ЯзыкКод)
    : 'en';
  const т = ТЕКСТЫ[язык];
  const Ч = числаНаЯзыке(Ч_РУССКИЕ, язык);

  const дата = `${String(СНИМОК.день).padStart(2, '0')}.${String(
    СНИМОК.месяц,
  ).padStart(2, '0')}.${СНИМОК.год}`;

  return (
    <main style={ОБЁРТКА}>
      <div style={МЕТКА}>{т.метка}</div>
      <h1 style={ЗАГ1}>{т.заголовок}</h1>
      <p style={ТЕКСТ}>{т.подзаголовок(Ч.записей, Ч.доменовВсегоDNS)}</p>

      <nav style={{ marginTop: 36 }}>
        {т.разделы.map((р) => (
          <Link key={р.путь} href={`/research/${р.путь}`} style={КАРТОЧКА}>
            <div style={ИМЯ_РАЗДЕЛА}>{р.имя}</div>
            <div style={ОПИСАНИЕ}>{р.описание}</div>
          </Link>
        ))}
      </nav>

      <h2 style={ЗАГ2}>{т.ограниченияЗаголовок}</h2>
      <ul style={{ ...ТЕКСТ, paddingLeft: 22 }}>
        {т.ограничения.map((о, н) => (
          <li key={н} style={{ marginBottom: 10 }}>
            {о}
          </li>
        ))}
      </ul>

      <h2 style={ЗАГ2}>{т.авторЗаголовок}</h2>
      <p style={ТЕКСТ}>{т.автор}</p>
      <p style={СНОСКА}>{т.конфликт}</p>

      <p style={{ ...СНОСКА, marginTop: 32 }}>{т.обновлено(дата)}</p>

      {/* Раздел 20 Конституции: ссылка на услуги ровно одна, нейтральная,
          в самом конце. Ни токена, ни тарифов, ни призывов на этой
          странице нет и быть не должно. */}
      <p style={{ ...СНОСКА, marginTop: 8 }}>
        <Link href="/" style={{ color: '#7dd3fc' }}>
          {т.услуги}
        </Link>
      </p>
    </main>
  );
}
