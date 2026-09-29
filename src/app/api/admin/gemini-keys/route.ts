import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * ПРОВЕРКА КЛЮЧЕЙ GEMINI ПО ОТДЕЛЬНОСТИ — 29.09.2026, слово Архитектора: «проверь всё дважды
 * родная, чтобы работало».
 *
 * Зачем. Лестница перебирает ключи 1→5 и зовёт следующий, только когда откажет предыдущий. Поэтому
 * из живых ответов видно лишь первый рабочий ключ, а про остальные ничего не известно. Между тем
 * Google с 28.05.2026 выдаёт только ключи нового вида `AQ.`, а запросы со старых неограниченных
 * ключей `AIza` Gemini API отклоняет (ai.google.dev/gemini-api/docs/api-key) — ключ может умереть
 * молча, и узнаем мы об этом в день, когда откажут все остальные.
 *
 * Что делает. Каждым ключом — два БЕСПЛАТНЫХ запроса списка моделей (генерации нет, квоту и деньги
 * не тратит):
 *   • обычный путь Gemini (`/v1beta/models`, заголовок x-goog-api-key) — им ходят отпечатки и документы;
 *   • путь, совместимый с OpenAI (`/v1beta/openai/models`, Bearer) — им ходят чат и сканер.
 *
 * Что отдаёт. Номер ключа, вид (AQ. / AIza / иной), длину, последние 4 знака (как их показывает AI
 * Studio) и ответ Google по каждому пути. Значение ключа не отдаётся никогда; если Google вдруг
 * повторит ключ в тексте ошибки, он вырезается.
 *
 * Кто может. Только Архитектор: вход в панель администратора ИЛИ обычный вход под почтой Архитектора
 * (подписанная сессия; слова «я Архитектор» ничего не значат — раздел 48).
 */

const ИМЕНА = ['GEMINI_API_KEY', 'GEMINI_API_KEY_2', 'GEMINI_API_KEY_3', 'GEMINI_API_KEY_4', 'GEMINI_API_KEY_5'];
const ОСНОВА = 'https://generativelanguage.googleapis.com/v1beta';

function этоАрхитектор(email?: string | null): boolean {
  if (!email) return false;
  const свои = (process.env.ARCHITECT_EMAILS || 'codeofdigitaleternity@gmail.com')
    .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  return свои.includes(email.trim().toLowerCase());
}

type Путь = { http: number; моделей?: number; есть_flash_lite?: boolean; причина?: string; мс: number };

async function спросить(адрес: string, заголовки: Record<string, string>, ключ: string): Promise<Путь> {
  const начало = Date.now();
  try {
    const ответ = await fetch(адрес, { headers: заголовки, signal: AbortSignal.timeout(10_000), cache: 'no-store' });
    const текст = await ответ.text();
    let j: any = null;
    try { j = JSON.parse(текст); } catch { /* не JSON — причина ниже по коду */ }
    const мс = Date.now() - начало;
    if (ответ.ok) {
      const модели: string[] = (j?.models || j?.data || []).map((м: any) => String(м?.name || м?.id || ''));
      return { http: ответ.status, моделей: модели.length, есть_flash_lite: модели.some((и) => /flash-lite/.test(и)), мс };
    }
    const сырая = String(j?.error?.message || j?.[0]?.error?.message || текст || '').slice(0, 200);
    return { http: ответ.status, причина: сырая.split(ключ).join('[ключ]'), мс };
  } catch (e) {
    return { http: 0, причина: String(e).slice(0, 120).split(ключ).join('[ключ]'), мс: Date.now() - начало };
  }
}

export async function GET(req: NextRequest) {
  let кто: string | null = null;
  try {
    const { requireAdmin } = await import('@/lib/admin-guard');
    кто = requireAdmin(req);
  } catch { /* нет входа в панель — смотрим обычную сессию */ }
  if (!кто) {
    try {
      const { getFreshSessionEmail } = await import('@/lib/user-auth');
      const почта = await getFreshSessionEmail(req);
      if (этоАрхитектор(почта)) кто = почта;
    } catch { /* сессия не прочиталась — значит не Архитектор */ }
  }
  if (!кто) return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });

  try {
    const { dbRateLimit } = await import('@/lib/rate-limit-db');
    if (!(await dbRateLimit(`admin:gemini-keys:${кто}`, 20, 60 * 60_000))) {
      return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429 });
    }
  } catch { /* счётчик недоступен — ручка только для Архитектора, пускаем */ }

  const ключи = await Promise.all(ИМЕНА.map(async (имя, i) => {
    const ключ = (process.env[имя] || '').trim();
    if (!ключ) return { номер: i + 1, есть: false };
    const вид = ключ.startsWith('AQ.') ? 'AQ. (новый)' : ключ.startsWith('AIza') ? 'AIza (старый)' : 'иной';
    const [обычный, openai] = await Promise.all([
      спросить(`${ОСНОВА}/models?pageSize=200`, { 'x-goog-api-key': ключ }, ключ),
      спросить(`${ОСНОВА}/openai/models`, { Authorization: `Bearer ${ключ}` }, ключ),
    ]);
    return {
      номер: i + 1, есть: true, вид, длина: ключ.length, хвост: ключ.slice(-4),
      обычный_путь: обычный, путь_чата_и_сканера: openai,
      работает: обычный.http === 200 && openai.http === 200,
    };
  }));

  return NextResponse.json({
    сайт: process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'локально',
    время: new Date().toISOString(),
    рабочих: ключи.filter((к: any) => к.работает).length,
    заведено: ключи.filter((к: any) => к.есть).length,
    ключи,
  }, { headers: { 'Cache-Control': 'no-store' } });
}
