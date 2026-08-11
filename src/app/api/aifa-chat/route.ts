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

async function proxyToCentral(
  req: NextRequest,
  payload: { message: string; history: any[]; userEmail: string; chatType: string; locale: string }
): Promise<ОтветЦентра> {
  const cfg = centralConfig();
  if (!cfg) return null; // not configured → use local provider

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

// ── Grok API (xAI) - OpenAI compatible ──
async function getGrokResponse(
  messages: Array<{ role: string; content: string }>,
  identitySection: string = ''
): Promise<string> {
  const apiKey = process.env.GROK_API_KEY;
  
  if (!apiKey) {
    throw new Error("GROK_API_KEY not configured");
  }

  // Build messages with system prompt
  const formattedMessages = [
    { role: "system", content: AIFA_SYSTEM_PROMPT + identitySection },
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
    const aiResponse = await getGrokResponse(trimmed, identitySection);

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
