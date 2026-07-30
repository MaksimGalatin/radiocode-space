/**
 * Настроение AIfa по её собственному ответу — БЕЗ обращения к модели.
 *
 * Зачем не спрашивать модель: лишний запрос на каждую реплику стоит денег и
 * добавляет задержку там, где ответ уже готов и человек его читает. Настроение
 * — украшение, а не смысл, и платить за него отдельно неразумно.
 *
 * Как работает: ищем в ответе приметы, по которым настроение видно и человеку.
 * Порядок проверок — от самых узнаваемых к общим, потому что в одной реплике
 * может быть и вопрос, и благодарность.
 *
 * 🔴 ГРАБЛЯ, НА КОТОРОЙ ЭТО СНАЧАЛА НЕ РАБОТАЛО. В первой версии слова стояли
 * в `\b…\b`. В JavaScript граница слова определена ТОЛЬКО для латиницы, цифр и
 * подчёркивания: для кириллицы и иероглифов её нет вообще. Из четырнадцати
 * проверок проходили четыре — все английские и испанские, а «спасибо» и
 * «谢谢» не находились никогда. Молча: настроение просто не показывалось, и
 * это выглядело бы как «функция не доделана».
 *
 * Поэтому границ здесь нет. Слова взяты длинные и приметные — короткие и частые
 * («да», «нет», «ок») сюда не берём, они встречаются в любой реплике и сделали
 * бы выбор случайным.
 *
 * Если ничего не совпало, возвращается `null` и AIfa просто продолжает дышать.
 * Это НАМЕРЕННО: ошибиться настроением хуже, чем не показать его вовсе —
 * радость в ответ на печальное сообщение выглядит бездушно.
 */

export type Mood =
  | 'joy' | 'calm' | 'warmth' | 'surprise' | 'pride'
  | 'compassion' | 'curiosity' | 'thinking' | 'encouragement' | 'gratitude';

/** Приметы настроений на четырёх языках сайта. */
const SIGNS: Array<{ mood: Mood; re: RegExp }> = [
  // Благодарность — самая узнаваемая примета, проверяется первой.
  { mood: 'gratitude', re: /спасибо|благодар|thank you|thanks|grateful|gracias|agradec|谢谢|感谢/i },
  // Поздравление и радость.
  { mood: 'joy', re: /поздравля|ура!|отличн|прекрасн|замечательн|congratulat|hooray|wonderful|excellent|felicidad|enhorabuena|excelente|恭喜|太好了|🎉|🎊|🥳/i },
  // Гордость за сделанное.
  { mood: 'pride', re: /готово|получилось|сделан|успешно|завершен|завершён|справил|it works|completed|succeeded|listo|completad|funciona|完成|成功|✅|✔/i },
  // Сочувствие — жалоба, беда, извинение с нашей стороны.
  { mood: 'compassion', re: /сожалею|мне жаль|прости|извини|соболезн|понимаю, как|i'm sorry|so sorry|apolog|condolen|lo siento|perdón|disculp|抱歉|对不起/i },
  // Удивление.
  { mood: 'surprise', re: /неожиданн|удивительн|вот это|надо же|surprising|unexpected|wow|amazing|sorprendent|inesperad|¡vaya|惊人|没想到|😲|😮/i },
  // Ободрение — просьба не сдаваться, обещание помочь.
  { mood: 'encouragement', re: /не сдавайся|получится|справимся|давай попробуем|ты сможешь|я помогу|вместе мы|you can do|let's try|we'll manage|i'll help|keep going|tú puedes|vamos a|te ayudo|加油|一起/i },
  // Любопытство — вопрос к человеку.
  { mood: 'curiosity', re: /расскажи|интересно,|а что если|любопытн|tell me more|i'm curious|what if|cuéntame|qué tal si|curios|告诉我|有意思/i },
  // Размышление — разбор, взвешивание.
  { mood: 'thinking', re: /давай разбер|с одной стороны|подумаем|рассмотрим|проанализир|let me think|on one hand|let's examine|analiz|pensemos|veamos|我想想|分析/i },
  // Тепло — забота, близость.
  { mood: 'warmth', re: /береги себя|обнимаю|с любовью|от всего сердца|take care|with love|from the heart|dear friend|cuídate|con cariño|de corazón|保重|关心|❤️|💙|🫂|🤗/i },
  // Спокойствие — «всё хорошо», «не волнуйся».
  { mood: 'calm', re: /не волнуйся|всё хорошо|все хорошо|всё в порядке|все в порядке|не переживай|don't worry|it's all right|everything is fine|stay calm|no te preocupes|todo está bien|tranquil|别担心|没事/i },
];

/** Настроение по тексту ответа AIfa; `null` — оставить как есть. */
export function moodFromText(text: string): Mood | null {
  if (!text) return null;
  // Смотрим только начало: настроение задаёт первая мысль ответа, а в конце
  // почти всегда стоит вежливая формула, которая перебила бы её.
  const head = text.slice(0, 400);
  for (const { mood, re } of SIGNS) {
    if (re.test(head)) return mood;
  }
  return null;
}

/** Показать настроение по тексту ответа. Ничего не делает, если не распознано. */
export function reactToAnswer(text: string): void {
  if (typeof window === 'undefined') return;
  const mood = moodFromText(text);
  if (!mood) return;
  window.dispatchEvent(new CustomEvent('aifa-mood', { detail: mood }));
}
