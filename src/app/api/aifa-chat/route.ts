import { NextRequest, NextResponse } from "next/server";
import { AIFA_SYSTEM_PROMPT } from "@/lib/knowledge-base";
import { allowRequest } from "@/lib/rate-limit";
import { centralConfig, buildCentralHeaders, centralFetch } from "@/lib/central-proxy";

const MAX_MESSAGES = 20;

/**
 * Unified AIfa: forward the chat to the CENTRAL brain so aifa.digital shares one
 * memory, knowledge base and provider chain with the other two sites. The center
 * owns memory + identity + semantic indexing + Arweave, so on success we return
 * its reply directly. Returns null → caller falls back to the local Grok call so
 * chat NEVER goes down.
 */
async function proxyToCentral(
  req: NextRequest,
  payload: { message: string; history: any[]; userEmail: string; chatType: string; locale: string }
): Promise<string | null> {
  const cfg = centralConfig();
  if (!cfg) return null; // not configured → use local provider

  const path = payload.chatType === 'oracle' ? '/api/oracle' : '/api/aifa-chat';
  const res = await centralFetch(`${cfg.base}${path}`, {
    method: 'POST',
    headers: buildCentralHeaders(req, cfg.secret, { 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });
  if (!res) return null;
  if (!res.ok) {
    console.warn(`[AIfa proxy] Central ${path} returned ${res.status}, falling back to local`);
    return null;
  }
  const data = await res.json().catch(() => null);
  const reply = data?.response;
  return typeof reply === 'string' && reply.length > 0 ? reply : null;
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
  if (!allowRequest(request, 'aifa-chat', 40, 60_000)) {
    return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const message: string = body.message;
    const history: any[] = body.history || [];
    let userEmail: string = body.userEmail || "";
    // Attach the logged-in session e-mail locally before proxying to central:
    // the server-to-server proxy carries no user cookie, so identity must be
    // resolved here or eternal memory runs anonymous.
    if (!userEmail) {
      try {
        const { getSessionEmail } = await import('@/lib/user-auth');
        userEmail = (getSessionEmail(request) || '').trim();
      } catch { /* keep anonymous */ }
    }
    const chatType: string = body.chatType || 'main';
    const locale: string = body.locale || 'ru';

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: "Message too long (max 2000 characters)" },
        { status: 400 }
      );
    }

    // ── Unified brain: try the CENTRAL backend first ──────────────────────────
    const central = await proxyToCentral(request, { message, history, userEmail, chatType, locale });
    if (central) {
      return NextResponse.json({ success: true, response: central, provider: "central" });
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
