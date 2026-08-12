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

// ── Grok API (xAI) - OpenAI compatible ──
/**
 * Второй параметр — ВСЁ, что дописывается к системной подсказке: и
 * представление человека, и его память. Раньше он назывался identitySection и
 * нёс только имя; после подключения памяти имя перестало быть единственным
 * содержимым, и оставить прежнее название значило бы соврать читателю о том,
 * что уходит в модель.
 */
async function getGrokResponse(
  messages: Array<{ role: string; content: string }>,
  дополнениеПодсказки: string = ''
): Promise<string> {
  const apiKey = process.env.GROK_API_KEY;
  
  if (!apiKey) {
    throw new Error("GROK_API_KEY not configured");
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
      // Была grok-3 с окном 131 072 лексемы. Из-за узкого окна порог полной
      // памяти на этом сайте пришлось держать на 150 000 знаков — и двое самых
      // активных людей полной переписки здесь не получали, хотя на центральном
      // сайте получали. Один продукт не может помнить по-разному в зависимости
      // от того, на какую из наших дверей человек вошёл (Конституция, §9).
      // grok-4.3 — та же модель, что на центре и на aifa.works.
      model: "grok-4.3",
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
      const { getSessionEmail } = await import('@/lib/user-auth');
      userEmail = (getSessionEmail(request) || '').trim();
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
      return NextResponse.json({ success: true, response: central.текст, provider: "central" });
    }
    // Otherwise fall through to the local Grok call so chat never dies.

    // Local fallback requires Grok; if absent, return a soft message (never 500).
    if (!process.env.GROK_API_KEY) {
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
    const aiResponse = await getGrokResponse(trimmed, identitySection + memorySection);

    // Тот же дословный слой и на запасном пути: человеку всё равно, кто ответил,
    // а память обязана сохраниться в обоих случаях.
    await записатьДословно(userEmail, chatType, message, aiResponse);

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
    const { getSessionEmail } = await import('@/lib/user-auth');
    const sess = (getSessionEmail(request) || '').toLowerCase();
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
