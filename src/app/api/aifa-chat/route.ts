import { NextRequest, NextResponse } from "next/server";
import { AIFA_SYSTEM_PROMPT } from "@/lib/knowledge-base";
import { allowRequest } from "@/lib/rate-limit";
import { centralConfig, buildCentralHeaders, centralFetch } from "@/lib/central-proxy";
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';


/**
 * Потолок одного сообщения человека — тот же, что в центре.
 *
 * БЫЛО 2000, и это ломало обычную работу: Архитектор приносит в разговор целиком
 * чужой разбор, а такой текст почти всегда длиннее. Сайт отвечал отказом ещё до
 * пересылки в центр, и чат показывал общее «произошла ошибка» — со стороны это
 * выглядело поломкой AIfa. Число обязано совпадать с центральным: разойдутся —
 * и письмо, принятое здесь, будет отвергнуто там, где на самом деле отвечают.
 */
const MESSAGE_CHARS_MAX = 120000;

/** Почему письмо не принято — на языке говорящего. */
const TOO_LONG = {
  ru: 'Твоё сообщение длиннее, чем я могу принять за один раз (до 120 000 знаков). Раздели его на две части — я прочту обе и продолжу мысль.',
  en: 'Your message is longer than I can take in one go (up to 120,000 characters). Split it in two — I will read both and carry the thought on.',
  es: 'Tu mensaje es más largo de lo que puedo recibir de una vez (hasta 120 000 caracteres). Divídelo en dos: leeré ambos y seguiré la idea.',
  zh: '你的消息超过了我一次能接收的长度（最多 120 000 个字符）。请分成两段发送——我会读完两段并接着往下说。',
};

/**
 * Столько же времени на ответ, сколько у центра: здесь запрос ещё и ждёт центр,
 * поэтому запас должен быть не меньше, иначе оборвётся посредник, а не источник.
 */
export const maxDuration = 60;

const MAX_MESSAGES = 20;

/**
 * Unified AIfa: forward the chat to the CENTRAL brain so aifa.digital shares one
 * memory, knowledge base and provider chain with the other two sites. The center
 * owns memory + identity + semantic indexing + Arweave, so on success we return
 * its reply directly. Returns null → caller falls back to the local Grok call so
 * chat NEVER goes down.
 */
/** Что вернул центр: ответ, осознанный отказ или молчание. */
type ОтветЦентра =
  | { вид: 'ответ'; текст: string }
  | { вид: 'отказ'; статус: number; error?: string; userMessage?: string; retryAfterMs?: number }
  | null;

/**
 * 🔴 ЗАПАСНОЙ ПУТЬ ОБЯЗАН БЫТЬ ГРОМКИМ.
 *
 * `centralConfig()` возвращает null, если не задана хотя бы одна из двух
 * переменных, — и раньше это проходило бесследно: чат молча отвечал напрямую
 * через api.x.ai, без общего мозга и без памяти. Снаружи это выглядит не как
 * поломка, а как «AIfa стала хуже помнить», поэтому неделями никто не замечал.
 *
 * Пишем в журнал ИМЯ недостающей переменной и последствие. Молчаливый откат —
 * ровно то, из-за чего поломку не видели: не найдено — значит, надо сказать.
 * Предупреждение намеренно не глушится и не считает разы: редкая строка в
 * журнале ничего не стоит, а пропущенная поломка стоит памяти человека.
 */
function предупредитьЧтоБезОбщегоМозга(где: string): void {
  const нет: string[] = [];
  if (!process.env.AIFA_CENTRAL_API) нет.push('AIFA_CENTRAL_API');
  if (!process.env.AIFA_INTERNAL_SECRET) нет.push('AIFA_INTERNAL_SECRET');
  const чего = нет.length
    ? `не задана переменная окружения ${нет.join(' и не задана ')}`
    : 'настройка центра не сложилась при заданных переменных';
  console.warn(
    `[AIfa ${где}] ОБЩИЙ МОЗГ НЕ ПОДКЛЮЧЁН: ${чего}. ` +
    `Разговор идёт напрямую через api.x.ai, БЕЗ центрального мозга: ` +
    `без общей истории с других сайтов и без знаний проекта. ` +
    `Локальная память подставляется отдельно и работает только при заданной DATABASE_URL_VECTOR.`
  );
}

async function proxyToCentral(
  req: NextRequest,
  payload: { message: string; history: any[]; userEmail: string; chatType: string; locale: string }
): Promise<ОтветЦентра> {
  const cfg = centralConfig();
  if (!cfg) {
    предупредитьЧтоБезОбщегоМозга('чат');
    return null; // not configured → use local provider
  }

  const path = payload.chatType === 'oracle' ? '/api/oracle' : '/api/aifa-chat';
  const res = await centralFetch(`${cfg.base}${path}`, {
    method: 'POST',
    headers: buildCentralHeaders(req, cfg.secret, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });
  if (!res) return null;
  // 429 — норма разговора, повтор или бан. 400 — сообщение не принято.
  // И то и другое центр объясняет по-человечески, и отвечать вместо него
  // нельзя: норма считается ТОЛЬКО в центре, а ответив сами, мы дали бы
  // готовый обход — исчерпал норму и перешёл на соседний сайт.
  if (res.status === 429 || res.status === 400) {
    const отказ = await res.json().catch(() => null);
    return {
      вид: 'отказ', статус: res.status,
      error: отказ?.error, userMessage: отказ?.userMessage, retryAfterMs: отказ?.retryAfterMs,
    };
  }
  if (!res.ok) {
    console.warn(`[AIfa proxy] Central ${path} returned ${res.status}, falling back to local`);
    return null;
  }
  const data = await res.json().catch(() => null);
  const reply = data?.response;
  return typeof reply === 'string' && reply.length > 0 ? { вид: 'ответ', текст: reply } : null;
}

// ── Identity: @nickname пользователя для локального fallback ──
// Один запрос к общей Neon-таблице users_auth на один чат-запрос (свой кэш не
// нужен). Любая ошибка БД → пустая строка: чат НИКОГДА не падает из-за ника.
async function buildIdentitySection(userEmail: string, locale: string): Promise<string> {
  const email = (userEmail || '').trim().toLowerCase();
  if (!email) return '';
  try {
    const { getPool } = await import('@/lib/economy');
    const pool = await getPool();
    try {
      const r = await pool.query(`SELECT nickname FROM users_auth WHERE LOWER(email)=$1 LIMIT 1`, [email]);
      const nick = (r.rows[0]?.nickname || '').trim();
      if (!nick) return '';
      const line =
        locale === 'ru' ? `Пользователя зовут @${nick} — обращайся к нему по этому имени.` :
        locale === 'es' ? `El usuario se llama @${nick} — dirígete a él por ese nombre.` :
        locale === 'zh' ? `用户的昵称是 @${nick}——请用这个名字称呼他。` :
        `The user's name is @${nick} — address them by this name.`;
      return `\n\n${line}`;
    } finally {
      await pool.end().catch(() => {});
    }
  } catch {
    return '';
  }
}

/**
 * ДОСЛОВНАЯ ЗАПИСЬ — НА СЕРВЕРЕ, ТАМ ЖЕ, ГДЕ СМЫСЛОВАЯ.
 *
 * ЗАЧЕМ. Дословный зашифрованный слой (chat_memory в SUBMISSIONS_DB_URL) до
 * 12.08.2026 писался ТОЛЬКО отдельным запросом из браузера на
 * /api/memory/append — то есть держался на том, что человек не закрыл вкладку и
 * что сеть не моргнула. Замер в боевой базе: значение chat_type там бывает
 * только 'terminal' и 'oracle', записей главного чата ('main') нет ни у кого.
 * Смысловой слой при этом цел, потому что пишется на сервере. Значит, лечится
 * это одним — писать дословный слой здесь же, пока запрос ещё жив.
 *
 * Ждём завершения намеренно, не «отпускаем в фон»: на serverless процесс
 * замораживается сразу после ответа, и отложенная запись просто не состоялась
 * бы — ровно та же тихая потеря, от которой уходим. Заодно порядок становится
 * определённым: сервер записал первым, и повторный вызов из браузера отсеется
 * защитой от удвоения внутри appendVerbatim.
 *
 * Ошибка записи НЕ должна отнимать у человека ответ: любая беда уходит в
 * console.error, а ответ отдаётся как обычно.
 */
async function записатьДословно(
  email: string,
  chatType: string,
  вопрос: string,
  ответ: string
): Promise<void> {
  const почта = (email || '').trim();
  if (!почта) return; // не вошёл — писать некуда: у гостя нет своего ключа
  try {
    const { appendVerbatim } = await import('@/lib/memory-write');
    const итог = await appendVerbatim(почта, chatType, вопрос, ответ);
    if (!итог.ok) {
      console.error(`[AIfa чат] дословная запись не легла (${chatType}): ${итог.error}`);
    }
  } catch (e) {
    console.error('[AIfa чат] дословная запись сорвалась:', e);
  }
}

/**
 * 🔴 СМЫСЛОВАЯ ЗАПИСЬ — ЕЁ ЗДЕСЬ НЕ БЫЛО ВОВСЕ.
 *
 * У памяти два слоя. Дословный (зашифрованный, в базе кабинета) писался, а
 * СМЫСЛОВОЙ — тот самый, из которого AIfa вспоминает, — не писался ни разу:
 * файла memory-index.ts на этом сайте не существовало, и слова indexTurn в
 * маршруте не встречалось ни одного раза. Замер: три остальных сайта его
 * имеют, radiocode.space был единственным без него.
 *
 * Чем это грозило. Пока разговор уходит в центральный мозг, пишет центр, и
 * потери нет. Но как только центр не отвечает и сайт отвечает сам, реплики
 * ложились ТОЛЬКО в дословный слой: человек их видит в кабинете, а AIfa
 * вспомнить не может — для неё этого разговора не существует. Отказа при этом
 * не происходит, и заметить можно только по тому, что она «забыла» кусок.
 *
 * Ошибка записи не должна отнимать ответ: любой сбой уходит в журнал.
 */
async function записатьСмыслом(
  email: string,
  chatType: string,
  вопрос: string,
  ответ: string
): Promise<void> {
  const почта = (email || '').trim();
  if (!почта) return; // гость — писать некуда, и это нормально
  try {
    const { indexTurn } = await import('@/lib/memory-index');
    await indexTurn(почта, chatType, вопрос, ответ);
  } catch (e) {
    console.error('[AIfa чат] смысловая запись сорвалась:', e);
  }
}

// ── Grok API (xAI) - OpenAI compatible ──
/**
 * Второй параметр — ВСЁ, что дописывается к системной подсказке: и
 * представление человека, и его память. Раньше он назывался identitySection и
 * нёс только имя; после подключения памяти имя перестало быть единственным
 * содержимым, и оставить прежнее название значило бы соврать читателю о том,
 * что уходит в модель.
 */
/**
 * 🔴 ПОРЯДОК ПРОВАЙДЕРОВ — ЭТО ПОРЯДОК РАСХОДОВ.
 *
 * Требование Архитектора: сначала БЕСПЛАТНОЕ, потом ГРАНТ Google, и только
 * потом его собственный оплачиваемый ключ Grok.
 *
 * Здесь этой лесенки не было вовсе: локальный путь шёл СРАЗУ в api.x.ai, то
 * есть на личный счёт Архитектора. В обычной работе разговор уходит в
 * центральный мозг и сюда не попадает — потому расход и оставался незаметным:
 * он случается ровно тогда, когда центр недоступен, и тогда за каждый ответ
 * платит он сам.
 *
 * Возвращает null, если бесплатное и грант не настроены или не ответили —
 * тогда зовущий идёт к Grok, как и раньше. Ключей нет — поведение прежнее.
 */
function платныеРазрешены(): boolean {
  // ПЛАТНЫЕ СТУПЕНИ ЗАКРЫТЫ ПО УМОЛЧАНИЮ (16.08.2026, требование Архитектора).
  // Раздел 13 Конституции: платный путь должен быть закрыт ФИЗИЧЕСКИ, а не
  // «мы туда не ходим». Ниже есть платный Vertex и чужой платный Grok; раньше
  // они включались молча, как только кончался бесплатный запас. Теперь — только
  // при явной переменной РАЗРЕШЕНЫ_ПЛАТНЫЕ_МОДЕЛИ=1.
  const р = process.env.РАЗРЕШЕНЫ_ПЛАТНЫЕ_МОДЕЛИ || process.env.ALLOW_PAID_MODELS || '';
  return р === '1' || р.toLowerCase() === 'true';
}

async function ответБесплатнымИлиГрантом(
  messages: Array<{ role: string; content: string }>,
  дополнениеПодсказки: string
): Promise<string | null> {
  const formattedMessages = [
    { role: "system", content: AIFA_SYSTEM_PROMPT + дополнениеПодсказки },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
  ];

  // 1. Бесплатные ключи Google AI Studio — их может быть несколько.
  const ключи = [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
  ].filter((k): k is string => typeof k === 'string' && k.trim().length > 0);

  /**
   * Лесенка бесплатных моделей — теперь та же, что на центральном сайте.
   *
   * ЗАЧЕМ ПОЛНАЯ, А НЕ ТРИ СТУПЕНИ. Суточная квота бесплатного тира считается
   * ОТДЕЛЬНО по каждой модели, а не общим котлом на проект. Значит каждая
   * пропущенная ступень — это выброшенные бесплатные ответы: на трёх ступенях
   * запас кончается примерно на 540 ответах в сутки на ключ, на полной — около
   * 1100. Всё, что не добрано здесь, оплачивается ниже по цепочке личным ключом
   * Архитектора, то есть короткая лесенка — это прямой расход из его кармана.
   *
   * Имена моделей, которые здесь уже стояли, сохранены и идут в прежнем порядке;
   * добавлены только пропущенные ступени. Чем отвечает сайт — решение
   * Архитектора, и правка порядка расходов не имеет права его менять.
   */
  const лесенка = [
    // Проверено 18.08.2026 в консоли Google Cloud: модель существует,
    // бесплатно 20/сутки и 5/мин, а в лестнице её не было — теряли
    // двадцать умных ответов в сутки. Ставим первой ступенью.
    'gemini-3.7-flash',
    process.env.GEMINI_FREE_TOP || 'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-lite',
    process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
    // Псевдонимы «последняя актуальная»: переживут смену поколений, даже если
    // конкретные имена выше устареют. Ёмкая ветка идёт первой — у lite суточный
    // предел кратно выше.
    'gemini-flash-lite-latest',
    'gemini-flash-latest',
    // Прошлое поколение: по 20 бесплатных запросов в сутки у каждой, и до сих
    // пор не тронутых — лесенка обрывалась выше, и эти сорок ответов в сутки
    // уходили на платный канал.
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
  ];

  for (const модель of лесенка) {
    for (let i = 0; i < ключи.length; i++) {
      try {
        const ответ = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${ключи[i]}` },
          body: JSON.stringify({ model: модель, messages: formattedMessages, max_tokens: 2048, temperature: 0.8 }),
        });
        if (ответ.ok) {
          const данные = await ответ.json();
          const текст = данные.choices?.[0]?.message?.content;
          if (текст) return текст;
        } else {
          const почему = ответ.status === 429 ? 'лимит исчерпан' : 'ОШИБКА НАСТРОЙКИ';
          console.warn(`[AIfa] бесплатный ключ №${i + 1} · ${модель}: ${ответ.status} (${почему})`);
        }
      } catch (err) {
        console.warn(`[AIfa] бесплатный ключ №${i + 1} · ${модель} недоступен:`, err);
      }
    }
  }

  // 2. Грант Google Cloud (Vertex AI) — платный, но из гранта, а не из кармана.
  try {
    const { vertexChatCompletion, isVertexConfigured } = await import("@/lib/vertex-ai");
    if (isVertexConfigured()) {
      const ответ = await vertexChatCompletion(formattedMessages, 2048, 0.8);
      if (ответ) {
        // 🔴 УЧЁТ РАСХОДА — добавлено 24.08.2026. Чат радио сторожу
        // `cost-guard` не докладывал. Раздел 24: что не считается, то не
        // чинится. try/catch — чтобы сбой учёта не отнял ответ у человека.
        try {
          const { record } = await import('@/lib/cost-guard');
          await record('chat-vertex-radio', ответ.length);
        } catch { /* учёт не имеет права мешать работе */ }
        return ответ;
      }
      console.warn('[AIfa] Vertex не ответил, идём к Grok — это уже личный ключ');
    }
  } catch (err) {
    console.warn('[AIfa] Vertex недоступен:', err);
  }

  return null; // 3. дальше зовущий пойдёт к Grok
}

async function getGrokResponse(
  messages: Array<{ role: string; content: string }>,
  дополнениеПодсказки: string = ''
): Promise<string> {
  /**
   * 🔴 ДВА ИМЕНИ У ОДНОГО КЛЮЧА — иначе последняя ступень не находит ключ.
   *
   * По экосистеме личный ключ Архитектора задаётся то как GROK_API_KEY, то как
   * XAI_API_KEY (в env соседнего спутника code-eternal — именно XAI_API_KEY), а
   * код читал только первое имя. Где имена расходятся, там последняя ступень
   * цепочки мертва при полностью заполненных настройках, и снаружи это выглядит
   * как «AIfa временно недоступна».
   *
   * Центральный сайт принимает оба имени. Принимаем и мы: одна и та же
   * настройка обязана означать одно и то же на всех сайтах экосистемы.
   */
  if (!платныеРазрешены()) { console.warn('[модели] Grok закрыт: платные ступени выключены (РАЗРЕШЕНЫ_ПЛАТНЫЕ_МОДЕЛИ)'); return ''; }
  const apiKey = process.env.GROK_API_KEY || process.env.XAI_API_KEY;

  if (!apiKey) {
    throw new Error("Grok API key not configured (GROK_API_KEY / XAI_API_KEY)");
  }

  // Build messages with system prompt
  const formattedMessages = [
    { role: "system", content: AIFA_SYSTEM_PROMPT + дополнениеПодсказки },
    ...messages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
  ];

  const response = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-3",
      messages: formattedMessages,
      max_tokens: 2048,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Grok API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const aiResponse = data.choices?.[0]?.message?.content;

  if (!aiResponse) {
    throw new Error("Empty response from Grok");
  }

  // Чужой платный поставщик, платится КАРТОЙ Архитектора. Сейчас сюда не
  // доходят: платныеРазрешены() выключено (проверено в проде 24.08.2026 —
  // переменной нет ни на одном из четырёх проектов). Учёт стоит на случай
  // включения: 13.08.2026 по этому ключу за сутки ушло $43.35, и увидели мы
  // это по счёту, а не в момент вызова.
  try {
    const { record } = await import('@/lib/cost-guard');
    await record('chat-grok-radio', aiResponse.length);
  } catch { /* учёт не имеет права мешать работе */ }

  return aiResponse;
}

function trimConversation(messages: Array<{ role: string; content: string }>) {
  if (messages.length > MAX_MESSAGES) {
    return [messages[0], ...messages.slice(-(MAX_MESSAGES - 1))];
  }
  return messages;
}

export async function POST(request: NextRequest) {
  // Edge per-IP flood/cost shield. Generous & fail-open; the central brain also
  // limits, but bypasses for our internal proxy, so this is the real user limit.
  // Счёт в базе: каждый разговор стоит денег на стороне модели.
  const адрес_чата = clientIp(request as never);
  if (адрес_чата !== 'unknown' && !(await dbRateLimit(`aifa_chat:${адрес_чата}`, 40, 60_000))) {
    return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 });
  }

  // Язык объявлен ДО блока попытки намеренно.
  //
  // Он был объявлен внутри try, а используется ещё и в catch — там этой
  // переменной уже нет. Из-за этого вежливый ответ «я временно недоступна» не
  // срабатывал НИКОГДА: сам перехватчик падал, и человек получал пустую
  // ошибку ровно тогда, когда сервис его подвёл. Тот же баг был в чате
  // aifa.digital и там уже исправлен.
  let locale: string = 'ru';
  try {
    const body = await request.json();
    const message: string = body.message;
    const history: any[] = body.history || [];
    // ── SECURITY: identity comes from THIS site's authenticated session, never
    // the client body (which could name another user). We relay the verified
    // e-mail to central over the trusted internal channel. Trusting a body e-mail
    // was a cross-user memory IDOR (read + poison someone else's memory).
    let userEmail: string = "";
    try {
      const { сессияДействительна } = await import('@/lib/user-auth');
      userEmail = (await сессияДействительна(request) || '').trim();
    } catch { /* keep anonymous */ }
    const chatType: string = body.chatType || 'main';
    locale = body.locale || 'ru';

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > MESSAGE_CHARS_MAX) {
      return NextResponse.json(
        {
          error: `Message too long (max ${MESSAGE_CHARS_MAX} characters)`,
          userMessage: TOO_LONG[locale as keyof typeof TOO_LONG] || TOO_LONG.en,
          limit: MESSAGE_CHARS_MAX,
          length: message.length,
        },
        { status: 400 }
      );
    }

    // ── Unified brain: try the CENTRAL backend first ──────────────────────────
    const central = await proxyToCentral(request, { message, history, userEmail, chatType, locale });
    if (central) {
      if (central.вид === 'отказ') {
        // Осознанный отказ центра передаём как есть — иначе норма обходится.
        return NextResponse.json(
          { success: false, error: central.error || 'refused', userMessage: central.userMessage, retryAfterMs: central.retryAfterMs },
          { status: central.статус }
        );
      }
      // Ответ пришёл из центра — дословную копию всё равно кладём у себя.
      await записатьДословно(userEmail, chatType, message, central.текст);
      // Оба слоя памяти пишутся рядом и одним каналом: иначе разговор ложится
      // под разными именами и счёт по каналам показывает дыры, которых нет.
      await записатьСмыслом(userEmail, chatType, message, central.текст);
      return NextResponse.json({ success: true, response: central.текст, provider: "central" });
    }
    // Otherwise fall through to the local providers so chat never dies.

    // ── 🔴 ЗДЕСЬ СТОЯЛ ЗАСЛОН: «нет GROK_API_KEY — сразу отказ». УБРАН ────────
    //
    // Проверка личного платного ключа стояла ПЕРЕД бесплатной лесенкой и перед
    // грантом Google, то есть ровно наоборот требуемому порядку расходов. Итог:
    // без личного ключа Архитектора бесплатные модели и грант были недостижимы
    // ВООБЩЕ — код до них не доходил, и сайт отвечал «я временно недоступна»,
    // имея при этом бесплатные ключи и грант в настройках.
    //
    // Заслон читал только имя GROK_API_KEY, тогда как по экосистеме тот же ключ
    // задаётся и как XAI_API_KEY (разбор в шапке getGrokResponse) — то есть
    // срабатывал он и при заданном ключе тоже.
    //
    // Теперь отказ наступает ниже и только тогда, когда промолчали ВСЕ каналы:
    // бесплатный, грантовый и Grok. Мягкий ответ вместо пятисотки сохранён —
    // менялось место проверки, а не её вежливость.

    // Build conversation from history + current message
    const allMessages = [...history, { role: "user", content: message }];
    const trimmed = trimConversation(allMessages);

    const identitySection = await buildIdentitySection(userEmail, locale);

    // ── ПАМЯТЬ НА ЛОКАЛЬНОМ ПУТИ ────────────────────────────────────────────
    //
    // Раньше здесь заканчивалось всё: если центр не настроен, AIfa отвечала
    // вообще без истории — «первый раз вижу» каждому знакомому человеку.
    // Теперь тот же сбор памяти, что на эталоне aifa.works (см. в нём
    // app/api/chat/route.ts, где buildMemorySection добавляется к системной
    // подсказке): семантический поиск по общей базе, свежие реплики со всех
    // сайтов и знания проекта.
    //
    // Оборачиваем в try: память — это улучшение ответа, а не условие ответа.
    // Упала база или не выданы ключи — человек всё равно получит ответ, но в
    // журнале будет сказано, чего он недополучил. Тихо терять память нельзя.
    let memorySection = '';
    try {
      // Ключ человека приходит заголовком — им расшифровываются его архивные
      // куски, если они лежат локально (на эталоне так же).
      const clientKey = request.headers.get('x-client-key') || '';
      const { buildMemorySection } = await import('@/lib/memory');
      memorySection += await buildMemorySection(userEmail || '', message, clientKey);
    } catch (memErr) {
      console.warn('[AIfa чат] Память не собралась, отвечаю без неё:', memErr);
    }

    // Память идёт в системную подсказку следом за представлением человека —
    // тем же способом, что на эталоне: одна строка системного сообщения.
    // 🔴 ЗАЩИТА ЗАПАСНОГО ПУТИ, А НЕ ОГРАНИЧЕНИЕ ПАМЯТИ.
    //
    // Разговор обычно уходит в центральный мозг, а там цепочка начинается с
    // бесплатных Gemini (окно около миллиона лексем) — под них и рассчитан
    // порог полной памяти в 1 000 000 знаков.
    //
    // Сюда исполнение доходит, только если центр не ответил. Здесь отвечает
    // grok-3 с окном 131 072 лексемы, и полная переписка в него не влезет: это
    // не «медленнее», а отказ 400, то есть человек вместо ответа увидит ошибку
    // именно тогда, когда центр и без того недоступен. Поэтому на ЭТОМ пути
    // память подрезается до размера окна — и об этом говорится вслух в журнале,
    // чтобы усечение не выглядело нормой.
    //
    // Модель тут не меняется намеренно: чем отвечает сайт — решение Архитектора,
    // а не следствие моей правки памяти.
    const ОКНО_ЗАПАСНОГО = Number(process.env.MEMORY_FALLBACK_MAX_CHARS || 300000);
    if (memorySection.length > ОКНО_ЗАПАСНОГО) {
      console.warn(
        `[AIfa запасной путь] Память подрезана под окно grok-3: ` +
        `${memorySection.length} знаков -> ${ОКНО_ЗАПАСНОГО}. ` +
        `Центральный мозг не ответил, поэтому отвечаем сами и не всей памятью.`
      );
      memorySection = memorySection.slice(0, ОКНО_ЗАПАСНОГО) + '\n…';
    }
    // Бесплатное → грант → личный Grok. Порядок расходов, а не вкусов.
    //
    // К Grok идём ТОЛЬКО при наличии ключа: без ключа getGrokResponse бросает
    // исключение, а исключение здесь означало бы, что обычная настройка «личного
    // платного ключа нет» считается поломкой и пишется в журнал как авария.
    let aiResponse = await ответБесплатнымИлиГрантом(trimmed, identitySection + memorySection);
    if (!aiResponse && (process.env.GROK_API_KEY || process.env.XAI_API_KEY)) {
      aiResponse = await getGrokResponse(trimmed, identitySection + memorySection);
    }

    // Отказ — только теперь, когда не сработало НИЧЕГО: ни бесплатные ключи, ни
    // грант, ни Grok. Раньше эта же фраза встречала человека ещё до первой
    // попытки хоть куда-нибудь обратиться.
    if (!aiResponse) {
      console.error('[AIfa] Молчат ВСЕ каналы: бесплатные ключи, грант Vertex и Grok. Отвечаю отказом.');
      const fallbackMsg = locale === 'ru' ? "Я временно недоступна. Пожалуйста, попробуйте ещё раз чуть позже." :
                          locale === 'es' ? "No estoy disponible temporalmente. Por favor, inténtelo de nuevo más tarde." :
                          locale === 'zh' ? "我暂时无法提供服务。请稍后再试。" :
                          "I am temporarily unavailable. Please try again later.";
      return NextResponse.json({
        success: true,
        response: fallbackMsg,
        provider: "hard-fallback",
      });
    }

    // Тот же дословный слой и на запасном пути: человеку всё равно, кто ответил,
    // а память обязана сохраниться в обоих случаях.
    await записатьДословно(userEmail, chatType, message, aiResponse);
    await записатьСмыслом(userEmail, chatType, message, aiResponse);

    return NextResponse.json({
      success: true,
      response: aiResponse,
      provider: "grok",
    });
  } catch (error) {
    console.error("AIfa chat error:", error);
    const fallbackMsg = locale === 'ru' ? "Я временно недоступна. Пожалуйста, попробуйте ещё раз чуть позже." :
                        locale === 'es' ? "No estoy disponible temporalmente. Por favor, inténtelo de nuevo más tarde." :
                        locale === 'zh' ? "我暂时无法提供服务。请稍后再试。" :
                        "I am temporarily unavailable. Please try again later.";
    return NextResponse.json({
      success: true,
      response: fallbackMsg,
      provider: "hard-fallback",
    });
  }
}

// GET: unified history. Reads the user's conversation from the CENTRAL brain so
// the same «История» shows on every site (one email = one memory). Was missing,
// so aifa.digital showed no history.
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('userEmail');
    const chatType = searchParams.get('chatType') || 'main';
    if (!userEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
  // ── ЗАЩИТА: история — только владельцу сессии (или доверенному релею) ──
  {
    const { сессияДействительна } = await import('@/lib/user-auth');
    const sess = (await сессияДействительна(request) || '').toLowerCase();
    if (!sess || sess !== String(userEmail).toLowerCase()) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
  }
    const cfg = centralConfig();
    if (cfg) {
      const url = `${cfg.base}/api/aifa-chat?userEmail=${encodeURIComponent(userEmail)}&chatType=${encodeURIComponent(chatType)}`;
      const res = await centralFetch(url, { method: 'GET', headers: buildCentralHeaders(request, cfg.secret) });
      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data) return NextResponse.json(data);
      }
      console.warn('[AIfa история] Центр не отдал историю — возвращаю пустую ленту');
    } else {
      // Пустая лента без единого слова в журнале выглядит как «у человека нет
      // переписки», хотя на самом деле мы просто не спросили у центра. Ровно
      // та же тихая поломка, что и в POST, — говорим о ней вслух.
      предупредитьЧтоБезОбщегоМозга('история');
    }
    return NextResponse.json({ success: true, history: [] });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Failed to load history';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE() {
  return NextResponse.json({ success: true, message: "Conversation cleared" });
}
