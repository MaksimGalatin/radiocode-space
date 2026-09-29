/**
 * Ответ ручки чата AIfa — понятные отказы вместо «Извини, произошла ошибка». 28.09.2026.
 *
 * Слово Архитектора: «когда закончился лимит она НЕ ДОЛЖНА писать пользователю — Извини, произошла
 * ошибка… Она должна ОБЪЯСНЯТЬ». Центр при отказе присылает `userMessage` — лимит тарифа, время до
 * обновления и следующий тариф. Клиенты на трёх сайтах из четырёх его выбрасывали и показывали общее
 * «ошибка». Второй путь к той же фразе — ответ площадки не JSON: 504, когда функция не уложилась в
 * 300 с (так было 28.09 в 18:33 UTC при перегрузке Google). Для него — честное «перегружена, повтори».
 */
export class ОтказЧата extends Error {
  userMessage?: string;
  constructor(userMessage?: string, technical?: string) {
    super(technical || userMessage || 'chat refused');
    this.name = 'ОтказЧата';
    this.userMessage = typeof userMessage === 'string' && userMessage ? userMessage : undefined;
  }
}

const ПЕРЕГРУЗКА: Record<string, string> = {
  ru: 'Я сейчас перегружена и не успела ответить — все модели заняты. Повтори, пожалуйста, через минуту: я помню наш разговор.',
  en: 'I am overloaded right now and could not answer in time — all models are busy. Please try again in a minute: I remember our conversation.',
  es: 'Ahora mismo estoy sobrecargada y no pude responder a tiempo: todos los modelos están ocupados. Vuelve a intentarlo en un minuto: recuerdo nuestra conversación.',
  zh: '我现在负载过高，没来得及回答——所有模型都很忙。请一分钟后再试：我记得我们的对话。',
};

function языкСтраницы(): string {
  try {
    const l = (document.documentElement.lang || navigator.language || 'en').slice(0, 2).toLowerCase();
    return ПЕРЕГРУЗКА[l] ? l : 'en';
  } catch {
    return 'en';
  }
}

/** Читает ответ ручки чата. Не JSON (504, обрыв связи) — ОтказЧата с объяснением перегрузки. */
export async function прочитатьОтветЧата(res: Response): Promise<any> {
  const data = await res.json().catch(() => null);
  if (!data || typeof data !== 'object') {
    throw new ОтказЧата(ПЕРЕГРУЗКА[языкСтраницы()], `HTTP ${res.status}`);
  }
  return data;
}

/** Текст для человека: объяснение сервера, если оно есть, иначе запасной текст компонента. */
export function текстОтказа(err: unknown, запасной: string): string {
  const у = (err as { userMessage?: unknown } | null)?.userMessage;
  return typeof у === 'string' && у.trim() ? у : запасной;
}
