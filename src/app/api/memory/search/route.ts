import { NextRequest, NextResponse } from 'next/server';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';
import { getFreshSessionEmail } from '@/lib/user-auth';
import { embedText } from '@/lib/embeddings';
import { searchMemory, isVectorStoreConfigured } from '@/lib/vector-store';
import { sanitizeEmail } from '@/lib/chat-logger';

/**
 * ПОИСК ПО СВОЕЙ ПЕРЕПИСКЕ В КАБИНЕТЕ — пункт 6 списка 27.09.2026 (слово
 * Архитектора: «делай ВСЁ это, без остановок»).
 *
 * Человек пишет «когда мы говорили о наследовании?» и получает найденные
 * реплики с датой и каналом — из СВОЕЙ памяти и только из своей.
 *
 * Почему на нашей базе, а не в поиске Google. Переписка людей живёт у нас;
 * копировать её в указатель Google — значит вывезти личную переписку в другое
 * хранилище. Здесь же у всех реплик уже есть отпечатки смысла (замер 27.09:
 * 2 134 реплики, без отпечатка 0), поэтому поиск стоит один бесплатный
 * отпечаток вопроса.
 *
 * Безопасность. Почта — только из подписанной сессии этого сайта; из тела
 * запроса не берётся никогда (иначе любой прочитал бы чужую память по адресу
 * жертвы — класс ошибки, закрытый на /api/cabinet/history). Без входа — 401.
 * Предел частоты — 30 поисков в минуту с адреса.
 */
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const ip = clientIp(req as never);
  if (ip !== 'unknown' && !(await dbRateLimit(`memory-search:${ip}`, 30, 60_000))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  const почта = ((await getFreshSessionEmail(req)) || '').trim().toLowerCase();
  if (!почта) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let вопрос = '';
  try {
    const тело = await req.json();
    вопрос = String(тело?.query || '').trim().slice(0, 300);
  } catch { /* пустое тело — ниже ответим 400 */ }
  if (вопрос.length < 2) return NextResponse.json({ error: 'empty query' }, { status: 400 });
  if (!isVectorStoreConfigured()) return NextResponse.json({ results: [], unavailable: true });

  const вектор = await embedText(вопрос, 'RETRIEVAL_QUERY');
  if (!вектор || !вектор.length) return NextResponse.json({ results: [], unavailable: true });

  const находки = await searchMemory(sanitizeEmail(почта), вектор, 12);
  const results = находки
    .filter((н) => н.score >= 0.45)
    .map((н) => ({
      text: String(н.content || '').slice(0, 700),
      role: н.role,
      channel: н.chat_type,
      date: н.msg_ts,
      site: н.source || '',
      score: Math.round(н.score * 100) / 100,
    }));
  return NextResponse.json({ results });
}
