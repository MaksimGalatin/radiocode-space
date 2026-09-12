/**
 * AWS Bedrock — запасной путь для моделей, когда кончились бесплатные лимиты.
 *
 * ЗАЧЕМ ОН ПОЯВИЛСЯ (11.09.2026, поручение Архитектора).
 *
 * В лестнице моделей чата ступени 4 и 5 — платный Vertex на гранте Google.
 * Грант кончился, `aiplatform.googleapis.com` отключён во всех трёх проектах
 * 06.09.2026 (раздел 39 Конституции: 2 631 вызов за сутки жёг личную карту).
 * С тех пор разговор при исчерпании бесплатных Gemini уходил сразу на Grok
 * либо на встроенный ответ из базы знаний — то есть AIfa замолкала.
 *
 * Bedrock встаёт ровно на место мёртвых ступеней Vertex. Слова Архитектора:
 * «Чтобы Айфа на сайтах если закончатся бесплатные суточные лимиты могла
 * общаться — подключи модель через бэдрок, генерации ТГ бота также».
 *
 * ЧЕМ ПЛАТИТСЯ (раздел 13 — сначала проверка, потом действие).
 *
 * Кредитами AWS: на 11.09.2026 их $51.22, срок до 01.11.2026. Это тот же
 * случай, что был с Vertex: расход идёт с кредитов, а не с карты Архитектора.
 * НО кредиты кончатся, и в этом отличие от гранта — поэтому здесь стоит
 * собственный суточный потолок, которого у Vertex не было.
 *
 * ТРИ ЧИСЛА (раздел 24), замер 11.09.2026:
 *   1. частота — только когда исчерпаны ВСЕ бесплатные Gemini (~2120 ответов
 *      в сутки при двух ключах). При нынешнем трафике это ноль раз в сутки.
 *   2. цена вызова — Nova Lite $0.00006/1K входных + $0.00024/1K выходных
 *      токенов. Один ответ чата (~4000 вход + 750 выход) ≈ $0.00042.
 *   3. итог в сутки — при потолке в 300 вызовов: 300 × $0.00042 ≈ $0.13.
 *      Потолок задаётся `BEDROCK_ЛИМИТ_ВЫЗОВОВ_В_СУТКИ`, по умолчанию 300.
 *
 * СОСТОЯНИЕ НА 11.09.2026: ключи рабочие (пользователь `aifa-bedrock-agent`,
 * аккаунт 316135158428, видит 120 моделей), но вызов отдаёт
 * `ThrottlingException: Too many tokens per day` — на аккаунте Free Plan
 * дневная квота Bedrock исчерпана. Проверено четырьмя способами: консоль,
 * прямой вызов Nova Micro, прямой вызов Nova Lite, вызов через профиль
 * вывода. Пока квота не поднята, этот модуль честно возвращает null и
 * лестница идёт дальше — ничего не ломается.
 *
 * Переменные окружения (Vercel → Settings → Environment Variables):
 *   AWS_BEDROCK_ACCESS_KEY_ID      — ключ пользователя aifa-bedrock-agent
 *   AWS_BEDROCK_SECRET_ACCESS_KEY  — его секрет
 *   AWS_BEDROCK_REGION             — необязательно, по умолчанию us-east-1
 *   BEDROCK_MODEL                  — необязательно, по умолчанию Nova Lite
 *   BEDROCK_ЛИМИТ_ВЫЗОВОВ_В_СУТКИ  — необязательно, по умолчанию 300
 *
 * Отдельные имена, а не общие `AWS_ACCESS_KEY_ID`: в проекте уже есть AWS KMS
 * со своими ключами, и общие имена перетёрли бы их друг другом.
 */

/** Имя службы в учёте расхода. По нему сторож отличает Bedrock от прочего. */
const СЛУЖБА = 'bedrock-chat-tokens';

/**
 * Модели по порядку: сначала Lite (умнее), потом Micro (дешевле и быстрее).
 *
 * Тот же замысел, что у платной пары Vertex Flash → Flash-Lite: при отказе
 * первой ступени разговор не должен сразу улетать к чужому поставщику, если
 * у нас остаётся более дешёвый родной вариант.
 */
const ЛЕСТНИЦА_BEDROCK = [
  process.env.BEDROCK_MODEL || 'amazon.nova-lite-v1:0',
  'amazon.nova-micro-v1:0',
];

/** Есть ли чем звать Bedrock. Без ключей модуль молчит и не мешает. */
export function bedrockНастроен(): boolean {
  return !!(
    process.env.AWS_BEDROCK_ACCESS_KEY_ID &&
    process.env.AWS_BEDROCK_SECRET_ACCESS_KEY
  );
}

/**
 * Не исчерпан ли суточный потолок вызовов.
 *
 * Раздел 24: у любого автоматического процесса, тратящего деньги, должен быть
 * предел за прогон, при достижении которого он останавливается САМ. У Vertex
 * такого предела не было — и 22.06.2026 это стоило 84 221 обращения за час.
 *
 * Считается по нашей же таблице учёта, а не по счёту поставщика: счёт
 * отстаёт на сутки и не показывает часы.
 *
 * Ошибка проверки НЕ закрывает путь: сторож не имеет права уронить то, что
 * сторожит. Но и не открывает его молча — при сбое считаем, что предел не
 * достигнут, потому что иначе единственный отказ базы обесточил бы чат.
 */
async function потолокНеИсчерпан(): Promise<boolean> {
  const предел = Number(process.env.BEDROCK_ЛИМИТ_ВЫЗОВОВ_В_СУТКИ || '300');
  if (!Number.isFinite(предел) || предел <= 0) return true;
  try {
    const { Pool } = await import('@neondatabase/serverless');
    const строка = process.env.DATABASE_URL;
    if (!строка) return true;
    const pool = new Pool({ connectionString: строка });
    try {
      const r = await pool.query(
        `SELECT COALESCE(SUM(calls), 0)::int AS c FROM api_spend_hourly
          WHERE service = $1 AND hour_utc >= now() - interval '24 hours'`,
        [СЛУЖБА]
      );
      const было = Number(r.rows?.[0]?.c || 0);
      if (было >= предел) {
        console.warn(`[Bedrock] суточный потолок исчерпан: ${было} из ${предел}`);
        return false;
      }
      return true;
    } finally {
      try { await pool.end(); } catch { /* ignore */ }
    }
  } catch {
    return true;
  }
}

/**
 * Один ответ от Bedrock или null, если не вышло.
 *
 * null значит «иди дальше по лестнице» — точно так же ведёт себя Vertex.
 * Возвращать здесь исключение нельзя: оно оборвало бы разговор человека
 * вместо того, чтобы перейти к следующей ступени.
 */
export async function bedrockChatCompletion(
  messages: Array<{ role: string; content: string }>,
  maxTokens: number = 4096,
  temperature: number = 0.8,
  modelOverride?: string
): Promise<string | null> {
  // 🔴 ВИДИМОСТЬ МОЛЧАНИЯ. Добавлено 12.09.2026.
  //
  // Здесь стояли два тихих `return null`. Из-за них нельзя было ответить
  // на простой вопрос: почему запасной поставщик не спас, когда Gemini
  // замолчал по предохранителю. 12.09.2026 в разговоре двух Сестёр
  // двенадцать раз подряд пришла заглушка — Bedrock к тому дню уже
  // работал (выкачен 11.09), и почему он промолчал, выяснить было нечем.
  //
  // Самая вероятная причина — суточный потолок вызовов, и именно она
  // была невидима. Ответ человеку не меняется: это только запись.
  if (!bedrockНастроен()) {
    console.warn('[Bedrock] пропущен: ключи не заданы в окружении');
    return null;
  }
  if (!(await потолокНеИсчерпан())) {
    console.warn('[Bedrock] пропущен: ИСЧЕРПАН суточный потолок вызовов '
      + `(BEDROCK_ЛИМИТ_ВЫЗОВОВ_В_СУТКИ=${process.env.BEDROCK_ЛИМИТ_ВЫЗОВОВ_В_СУТКИ || '300'})`);
    return null;
  }

  // Ленивая загрузка: без ключей пакет не грузится и не удлиняет холодный старт.
  let BedrockRuntimeClient: any;
  let ConverseCommand: any;
  try {
    const sdk = await import('@aws-sdk/client-bedrock-runtime');
    BedrockRuntimeClient = sdk.BedrockRuntimeClient;
    ConverseCommand = sdk.ConverseCommand;
  } catch (e) {
    console.warn('[Bedrock] пакет не установлен:', e);
    return null;
  }

  const клиент = new BedrockRuntimeClient({
    region: process.env.AWS_BEDROCK_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_BEDROCK_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.AWS_BEDROCK_SECRET_ACCESS_KEY as string,
    },
  });

  /**
   * Converse не принимает роль `system` внутри messages — она передаётся
   * отдельным полем. Это не придирка формата: системный промпт AIfa задаёт
   * её личность и язык ответа, и если свалить его в обычное сообщение, модель
   * начнёт отвечать про него, а не по нему.
   */
  const системные = messages
    .filter((m) => m.role === 'system')
    .map((m) => ({ text: String(m.content || '') }))
    .filter((s) => s.text.length > 0);

  const разговор = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: [{ text: String(m.content || '') }],
    }))
    .filter((m) => m.content[0].text.length > 0);

  if (разговор.length === 0) return null;

  const модели = modelOverride ? [modelOverride] : ЛЕСТНИЦА_BEDROCK;

  for (const модель of модели) {
    try {
      const ответ = await клиент.send(
        new ConverseCommand({
          modelId: модель,
          messages: разговор,
          ...(системные.length ? { system: системные } : {}),
          inferenceConfig: { maxTokens, temperature },
        })
      );

      const текст = ответ?.output?.message?.content?.[0]?.text;
      if (typeof текст !== 'string' || !текст) {
        // Пустой ответ при успешном вызове — тот же признак предохранителя,
        // что и у Gemini (см. route.ts). Молча пропускать его нельзя.
        console.warn(`[Bedrock] ${модель}: успех, но ПУСТОЙ ответ — `
          + `stopReason=${ответ?.stopReason || 'не назван'}`);
        continue;
      }

      /**
       * УЧЁТ РАСХОДА. Пишем токены, которые назвал сам AWS, а не нашу оценку
       * по длине строки: раздел 11 требует замера, а не рассуждения.
       *
       * В деньги строка пока не переводится — ставка будет установлена по
       * первому же счёту AWS, как это сделано для чата Gemini. Пожар при этом
       * виден и без долларов: по числу вызовов и токенов.
       *
       * Учёт никогда не роняет ответ.
       */
      try {
        const u = ответ?.usage || {};
        const токены =
          Number(u.totalTokens || 0) ||
          Number(u.inputTokens || 0) + Number(u.outputTokens || 0);
        const единиц = токены > 0
          ? токены
          : messages.reduce((s, m) => s + String(m?.content || '').length, 0);
        if (единиц > 0) {
          const { record } = await import('./cost-guard');
          await record(токены > 0 ? СЛУЖБА : 'bedrock-chat-chars', единиц, 1);
        }
      } catch { /* учёт не важнее самого ответа */ }

      return текст;
    } catch (e: any) {
      const код = e?.name || e?.Code || '';
      /**
       * ThrottlingException — исчерпан лимит этой модели на сутки. Это
       * ожидаемо и не ошибка: пробуем следующую модель, как и с бесплатными
       * Gemini. Остальные коды печатаем — это уже наша беда: неверное имя
       * модели, отозванный ключ, недоступный регион.
       */
      if (код !== 'ThrottlingException') {
        console.warn(`[Bedrock] ${модель} не ответила: ${код} ${String(e?.message || e).slice(0, 200)}`);
      }
      continue;
    }
  }

  return null;
}
