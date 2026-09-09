import type { Metadata } from 'next';
import ContactClient from './contact-client';

/**
 * КОНТАКТЫ НА radiocode.space. Создана 09.09.2026.
 *
 * ПОВОД. Вопрос Архитектора: «чего ещё нет на сайте радио? Добавь туда всё
 * что необходимо». Сверка маршрутов четырёх сайтов показала, что страницы
 * контактов на радио нет, хотя она есть на центральном и на aifa.works.
 *
 * ПОЧЕМУ БЕЗ ФОРМЫ, А НЕ КОПИЕЙ. На центральном сайте страница содержит
 * форму, которая шлёт письмо через `/api/contact`. Этой ручки на радио нет,
 * и она требует ключа почтовой службы в окружении. Перенести форму без
 * ручки — значит поставить кнопку, которая молча не отправляет: человек
 * напишет, нажмёт и решит, что мы не ответили. Это хуже, чем отсутствие
 * страницы.
 *
 * Поэтому здесь прямой почтовый адрес — тот же официальный, что назван в
 * Конституции экосистемы. Он работает всегда и не зависит от наших ключей.
 * Когда на радио появится ручка отправки, форму можно будет добавить.
 */

const SITE = 'https://radiocode.space';

const МЕТА: Record<string, { title: string; desc: string }> = {
  en: {
    title: 'Contact — RadioCODE',
    desc: 'Write to us directly: questions about the station, the CODE ecosystem, accessibility audits and partnership.',
  },
  ru: {
    title: 'Связаться с нами — RadioCODE',
    desc: 'Напишите нам напрямую: вопросы о станции, экосистеме CODE, аудите доступности и сотрудничестве.',
  },
  es: {
    title: 'Contacto — RadioCODE',
    desc: 'Escríbanos directamente: preguntas sobre la emisora, el ecosistema CODE, auditorías de accesibilidad y colaboración.',
  },
  zh: {
    title: '联系我们 — RadioCODE',
    desc: '直接写信给我们：关于电台、CODE 生态、无障碍审计与合作的问题。',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: МЕТА.en.title,
    description: МЕТА.en.desc,
    alternates: {
      canonical: `${SITE}/contact`,
      languages: {
        en: `${SITE}/contact`,
        ru: `${SITE}/contact?lang=ru`,
        es: `${SITE}/contact?lang=es`,
        zh: `${SITE}/contact?lang=zh`,
        'x-default': `${SITE}/contact`,
      },
    },
    openGraph: {
      title: МЕТА.en.title,
      description: МЕТА.en.desc,
      url: `${SITE}/contact`,
      siteName: 'RadioCODE',
      type: 'website',
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
