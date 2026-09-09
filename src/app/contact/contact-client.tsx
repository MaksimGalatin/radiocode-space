'use client';

import { useCurrentLang } from '@/lib/radioI18n';

/**
 * Тексты на четырёх языках. Язык берётся тем же способом, что на остальных
 * страницах радио — через `useCurrentLang` из собственного словаря сайта,
 * а не через LanguageProvider: в корневом макете радио его нет.
 */
const Т: Record<string, {
  заголовок: string;
  вступление: string;
  почтаПодпись: string;
  оЧёмПисать: string;
  пункты: string[];
  ответ: string;
}> = {
  ru: {
    заголовок: 'Связаться с нами',
    вступление:
      'Пишите напрямую на почту — это самый быстрый способ. Письмо читает человек, а не форма обратной связи.',
    почтаПодпись: 'Официальный адрес экосистемы CODE',
    оЧёмПисать: 'О чём пишут чаще всего',
    пункты: [
      'Вопросы о радиостанции и о том, как устроен эфир',
      'Аудит доступности сайта: сроки, цена, что входит',
      'Экосистема CODE: память, цифровой паспорт, тарифы',
      'Сотрудничество, пресса, запросы на данные исследования',
    ],
    ответ: 'Отвечаем на все письма. Обычно в течение суток.',
  },
  en: {
    заголовок: 'Contact us',
    вступление:
      'Write to us directly by e-mail — that is the fastest way. A person reads the letter, not a contact form.',
    почтаПодпись: 'Official address of the CODE ecosystem',
    оЧёмПисать: 'What people usually write about',
    пункты: [
      'Questions about the station and how the broadcast works',
      'Website accessibility audit: timing, price, what is included',
      'The CODE ecosystem: memory, digital passport, pricing',
      'Partnership, press, requests for the research data',
    ],
    ответ: 'We answer every letter. Usually within a day.',
  },
  es: {
    заголовок: 'Contacto',
    вступление:
      'Escríbanos directamente por correo: es la vía más rápida. La carta la lee una persona, no un formulario.',
    почтаПодпись: 'Dirección oficial del ecosistema CODE',
    оЧёмПисать: 'Sobre qué suelen escribir',
    пункты: [
      'Preguntas sobre la emisora y cómo funciona la transmisión',
      'Auditoría de accesibilidad: plazos, precio, qué incluye',
      'Ecosistema CODE: memoria, pasaporte digital, tarifas',
      'Colaboración, prensa, solicitudes de los datos de la investigación',
    ],
    ответ: 'Respondemos a todas las cartas. Normalmente en un día.',
  },
  zh: {
    заголовок: '联系我们',
    вступление:
      '请直接发邮件给我们——这是最快的方式。读信的是人，不是联系表单。',
    почтаПодпись: 'CODE 生态的官方邮箱',
    оЧёмПисать: '人们通常来信询问',
    пункты: [
      '关于电台以及广播如何运作的问题',
      '网站无障碍审计：周期、价格、包含哪些内容',
      'CODE 生态：记忆、数字护照、资费',
      '合作、媒体、研究数据的索取',
    ],
    ответ: '我们回复每一封来信，通常在一天之内。',
  },
};

const ПОЧТА = 'contact@codeofdigitaleternity.com';

export default function ContactClient() {
  const lang = useCurrentLang();
  const т = Т[lang] ?? Т.en;

  return (
    <main className="min-h-screen px-4 py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl">{т.заголовок}</h1>

        <p className="mb-10 text-base leading-relaxed opacity-80">
          {т.вступление}
        </p>

        <a
          href={`mailto:${ПОЧТА}`}
          className="mb-3 block rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-6 py-5 text-lg font-medium text-cyan-400 transition-colors hover:bg-cyan-400/10"
        >
          {ПОЧТА}
        </a>
        <p className="mb-12 text-sm opacity-60">{т.почтаПодпись}</p>

        <h2 className="mb-4 text-xl font-semibold">{т.оЧёмПисать}</h2>
        <ul className="mb-10 space-y-3">
          {т.пункты.map((п) => (
            <li key={п} className="flex gap-3 text-base leading-relaxed opacity-80">
              <span aria-hidden="true" className="text-cyan-400">
                —
              </span>
              <span>{п}</span>
            </li>
          ))}
        </ul>

        <p className="text-base opacity-70">{т.ответ}</p>
      </div>
    </main>
  );
}
