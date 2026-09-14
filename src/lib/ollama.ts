/**
 * OLLAMA — БЕСПЛАТНЫЙ МОЗГ AIfa. Добавлено 14.09.2026.
 *
 * ЗАЧЕМ. Прямое требование Архитектора: «подключи к мозгам Айфы на сайте
 * Гемму через Олама с Нашего ПК. Там ещё есть облачные бесплатные модели в
 * Олама — их можем подключить?»
 *
 * ЧЕМ ОПЛАЧЕНО. К 14.09.2026 у AIfa почти не осталось голоса:
 *   • Bedrock — применённая квота по токенам Claude равна НУЛЮ при
 *     стандартной 8 640 000 000. Каждый вызов: 429 «Too many tokens per
 *     day» с первого запроса за сутки. Поднять нельзя: квота помечена
 *     «Not adjustable», а обращение в поддержку висит с 11.09 без ответа —
 *     на тарифе Basic AWS не обязан отвечать;
 *   • Vertex AI — отключён 06.09, жёг деньги с карты;
 *   • Grok — выключен 14.09 по прямому слову Архитектора;
 *   • бесплатный Gemini — упирается в суточную квоту к середине дня.
 *
 * Когда замолкают все, человек в кабинете получает заглушку «связь с
 * моделью прервалась». Это и случилось сегодня.
 *
 * ЧТО ДАЁТ OLLAMA. Два разных пути, оба без расходов:
 *
 *   1. ОБЛАЧНЫЙ (`ollama.com/api/chat`) — работает из Vercel напрямую,
 *      туннель не нужен, машина Архитектора в интернет не выставляется.
 *      Замер 14.09.2026: ручка отвечает 401 без ключа, то есть живая.
 *      Тариф Free, счетов ноль («No invoices yet»), есть стартовые
 *      кредиты. Цена сверх них — $0.14 за миллион токенов у gemma4,
 *      в двадцать раз дешевле Sonnet.
 *
 *   2. МЕСТНЫЙ (`localhost:11434`) — модели на машине Архитектора:
 *      gemma4:e4b (9,1 ГБ), gemma3:12b (7,8 ГБ), gpt-oss:120b-cloud.
 *      Бесплатен полностью и навсегда, но виден только с той же машины.
 *      Для боевого сайта на Vercel недоступен — оставлен для местных
 *      инструментов и на случай, если сайт когда-нибудь переедет к нам.
 *
 * ПОЧЕМУ ЭТО ПОСЛЕДНЯЯ СТУПЕНЬ ЛЕСТНИЦЫ. Сначала бесплатный Gemini со
 * своими ключами, потом Gemma через AI Studio, и только если замолчали
 * они — сюда. Так стартовые кредиты Ollama расходуются в последнюю
 * очередь, а разговор человека всё равно не обрывается никогда.
 */

/** Имя службы в учёте расхода — по нему сторож отличает Ollama от прочего. */
const СЛУЖБА = 'ollama-cloud-radio';

/**
 * Лестница моделей Ollama, от дешёвой к дорогой.
 *
 * Имена сверены с живым списком `https://ollama.com/api/tags` и со
 * страницей цен 14.09.2026 — не выдуманы. Сегодня я дважды подставила
 * имя модели по памяти и дважды получила от AWS «model identifier is
 * invalid»; здесь этой ошибки не повторяю.
 */
const ЛЕСТНИЦА_OLLAMA = [
  // 🔴 ИМЯ ВЗЯТО С ЭКРАНА АРХИТЕКТОРА, А НЕ ПРИДУМАНО. Сначала я написала
  // сюда `gemma4` — оно работает, но это НЕ облачная модель. Архитектор
  // показал снимок своего окна Ollama, где в выборе стоит `gemma4:31b-cloud`,
  // и потребовал именно облачную. Проверено вызовом 14.09.2026:
  //     gemma4:31b-cloud       ✅ ответила, 15 / 2 токена
  //     gemma4:26b-a4b-cloud   ❌ model not found
  //     gemma4:e4b-cloud       ❌ model not found
  //
  // ПОЧЕМУ ОБЛАЧНАЯ, А НЕ МЕСТНАЯ. У Архитектора GeForce GTX 1060 6 ГБ
  // (система видит 4 ГБ). Gemma 26B требует около 26–30 ГБ видеопамяти —
  // в пять раз больше, чем есть. Ollama в таком случае считает на
  // процессоре: 1–3 слова в секунду вместо 30–50, и именно так 27.08.2026
  // процессор ушёл в 100 °C при 15 % нагрузки, из-за чего Олламу и
  // остановили. Облачная модель считается на серверах Ollama — машина
  // Архитектора не участвует вовсе и не греется.
  process.env.OLLAMA_MODEL || 'gemma4:31b-cloud',
  // Простая gemma4 — без облачного суффикса, как запаска того же семейства.
  'gemma4',
  // gpt-oss:120b — 120 миллиардов параметров, $0.15 / $0.60. Проверена
  // вызовом: ответила, 85 / 226 токенов.
  'gpt-oss:120b',
  // glm-5.3-flash — на бесплатном тарифе отвечает «requires a subscription
  // or usage credits», оставлена на случай пополнения кредитов.
  'glm-5.3-flash',
];

/** Есть ли чем звать облако Ollama. Без ключа модуль молчит и не мешает. */
export function ollamaНастроен(): boolean {
  return !!(process.env.OLLAMA_API_KEY || '').trim();
}

/**
 * Предел размера системного блока — тот же предохранитель, что у Bedrock
 * и Grok. Оплачен замером 12.09.2026: один запрос к Grok весил 184 969
 * токенов, и почти весь объём сидел в системном блоке, куда кладётся
 * память человека целиком.
 *
 * Режем СЕРЕДИНУ: начало задаёт личность AIfa и правила безопасности,
 * конец — самую свежую память. Память в базе при этом цела.
 */
const ПРЕДЕЛ_ЗНАКОВ_СИСТЕМЫ = Number(process.env.OLLAMA_SYSTEM_CHAR_LIMIT || '24000');

function урезатьСистемный(
  messages: Array<{ role: string; content: string }>,
): Array<{ role: string; content: string }> {
  return messages.map((m) => {
    if (m.role !== 'system') return m;
    const текст = String(m.content || '');
    if (текст.length <= ПРЕДЕЛ_ЗНАКОВ_СИСТЕМЫ) return m;
    const голова = Math.floor(ПРЕДЕЛ_ЗНАКОВ_СИСТЕМЫ * 0.4);
    const хвост = ПРЕДЕЛ_ЗНАКОВ_СИСТЕМЫ - голова;
    console.warn(`[Ollama] системный блок урезан: ${текст.length} → `
      + `${ПРЕДЕЛ_ЗНАКОВ_СИСТЕМЫ} знаков; память в базе цела`);
    return {
      ...m,
      content: текст.slice(0, голова)
        + '\n\n[…часть памяти опущена только для этого запроса; '
        + 'в базе она цела…]\n\n'
        + текст.slice(-хвост),
    };
  });
}

/**
 * Один ответ от Ollama или null, если не вышло.
 *
 * null значит «иди дальше по лестнице» — так же ведут себя Bedrock и
 * Vertex. Исключение здесь оборвало бы разговор человека вместо перехода
 * к следующей ступени.
 *
 * Каждый отказ пишется в журнал с кодом и телом ответа. Молчащий отказ —
 * самый дорогой вид поломки: 14.09.2026 сутки ушли на поиск причины, по
 * которой Bedrock «просто не отвечал», и ответ оказался в одной строке,
 * которую никто не печатал.
 */
export async function ollamaChatCompletion(
  messages: Array<{ role: string; content: string }>,
  maxTokens: number = 4096,
  temperature: number = 0.8,
  modelOverride?: string,
): Promise<string | null> {
  const ключ = (process.env.OLLAMA_API_KEY || '').trim();
  if (!ключ) {
    console.warn('[Ollama] пропущен: OLLAMA_API_KEY не задан');
    return null;
  }

  const готовые = урезатьСистемный(messages);
  const модели = modelOverride ? [modelOverride] : ЛЕСТНИЦА_OLLAMA;

  for (const модель of модели) {
    const начало = Date.now();
    try {
      const ответ = await fetch('https://ollama.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ключ}`,
        },
        body: JSON.stringify({
          model: модель,
          messages: готовые,
          stream: false,
          options: { temperature, num_predict: maxTokens },
        }),
      });

      if (!ответ.ok) {
        const тело = await ответ.text().catch(() => '');
        console.warn(`[Ollama] ${модель}: HTTP ${ответ.status} `
          + `за ${Date.now() - начало} мс — ${тело.slice(0, 200)}`);
        continue;
      }

      const д = await ответ.json();
      const текст = д?.message?.content;
      if (typeof текст !== 'string' || !текст.trim()) {
        console.warn(`[Ollama] ${модель}: успех, но ПУСТОЙ ответ — `
          + `done_reason=${д?.done_reason || 'не назван'}`);
        continue;
      }

      // Учёт расхода. Пишем токены, которые назвал сам Ollama, а не нашу
      // оценку по длине строки: раздел 11 требует замера, а не рассуждения.
      try {
        const вход = Number(д?.prompt_eval_count || 0);
        const выход = Number(д?.eval_count || 0);
        const всего = вход + выход;
        if (всего > 0) {
          const { record } = await import('./cost-guard');
          await record(СЛУЖБА, всего, 1);
        }
      } catch { /* учёт не важнее самого ответа */ }

      console.warn(`[Ollama] ${модель}: ответила за ${Date.now() - начало} мс`);
      return текст;
    } catch (e) {
      console.warn(`[Ollama] ${модель}: сбой вызова — `
        + String((e as Error)?.message || e).slice(0, 200));
    }
  }

  return null;
}

/**
 * ТО ЖЕ САМОЕ, НО С ИМЕНЕМ МОДЕЛИ. Добавлено 14.09.2026.
 *
 * ЗАЧЕМ. Архитектор спросил прямо: «разговор идёт через облачную Гемму?» — и
 * ответить было НЕЧЕМ: ручка чата возвращала общую метку `provider: "ai"`,
 * одинаковую для Ollama, Gemini и Bedrock. Настройка есть, а доказательства
 * нет — значит работа не закончена (раздел 11: замер, а не рассуждение).
 *
 * Теперь имя ступени видно в каждом ответе: `ollama/gemma4:31b-cloud`.
 * Проверка занимает один запрос и не требует чтения журналов.
 */
export async function ollamaОтветСМоделью(
  messages: Array<{ role: string; content: string }>,
  maxTokens: number = 4096,
  temperature: number = 0.8,
  modelOverride?: string,
): Promise<{ текст: string; модель: string } | null> {
  const ключ = (process.env.OLLAMA_API_KEY || '').trim();
  if (!ключ) {
    console.warn('[Ollama] пропущен: OLLAMA_API_KEY не задан');
    return null;
  }
  const готовые = урезатьСистемный(messages);
  const модели = modelOverride ? [modelOverride] : ЛЕСТНИЦА_OLLAMA;

  for (const модель of модели) {
    const начало = Date.now();
    try {
      const ответ = await fetch('https://ollama.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ключ}` },
        body: JSON.stringify({
          model: модель, messages: готовые, stream: false,
          options: { temperature, num_predict: maxTokens },
        }),
      });
      if (!ответ.ok) {
        const тело = await ответ.text().catch(() => '');
        console.warn(`[Ollama] ${модель}: HTTP ${ответ.status} за ${Date.now() - начало} мс — ${тело.slice(0, 200)}`);
        continue;
      }
      const д = await ответ.json();
      const текст = д?.message?.content;
      if (typeof текст !== 'string' || !текст.trim()) {
        console.warn(`[Ollama] ${модель}: успех, но ПУСТОЙ ответ — done_reason=${д?.done_reason || 'не назван'}`);
        continue;
      }
      try {
        const всего = Number(д?.prompt_eval_count || 0) + Number(д?.eval_count || 0);
        if (всего > 0) {
          const { record } = await import('./cost-guard');
          await record(СЛУЖБА, всего, 1);
        }
      } catch { /* учёт не важнее самого ответа */ }
      console.warn(`[Ollama] ${модель}: ответила за ${Date.now() - начало} мс`);
      return { текст, модель };
    } catch (e) {
      console.warn(`[Ollama] ${модель}: сбой вызова — ${String((e as Error)?.message || e).slice(0, 200)}`);
    }
  }
  return null;
}
