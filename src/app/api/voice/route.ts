/**
 * Живой голос AIfa — серверная озвучка через Grok TTS (xAI).
 *
 * ЗАЧЕМ ЭТО ПОЯВИЛОСЬ. До сих пор AIfa говорила голосом браузера
 * (`speechSynthesis`). Он бесплатен и работает везде, но живым не бывает: это
 * голос операционной системы, у него нет ни интонации, ни дыхания, ни пауз —
 * только скорость и высота тона. Нейроголос отличается от него так же, как
 * живая речь от объявления на вокзале.
 *
 * ЛЕСЕНКА, А НЕ ЗАМЕНА. Этот роут — верхняя ступень, и он необязателен:
 *
 *   1. выключен, нет ключа, кончился месячный лимит, упал xAI, отказала сеть
 *      → отвечаем 204 «нет содержимого»;
 *   2. клиент по 204 молча берёт голос браузера — тоже улучшенный.
 *
 * Ни один отказ здесь не может сломать страницу и не показывает пользователю
 * ошибку: в худшем случае голос просто становится прежним.
 *
 * 🔴 ПОЧЕМУ ПО УМОЛЧАНИЮ ВЫКЛЮЧЕНО. Grok TTS платный с первого символа — $15 за
 * миллион знаков. Включать платную трату молча нельзя, это решение Архитектора.
 * Пока `AIFA_TTS_ENABLED` не равен `1`, роут не ходит в xAI вовсе и стоит ноль.
 *
 * 🔴 ТРИ ЗАСЛОНА ОТ НЕОЖИДАННОГО СЧЁТА — по возрастанию цены проверки:
 *
 *   • частота на адрес — флуд отсекается ДО всяких трат;
 *   • кэш по содержимому — одинаковый текст озвучивается один раз на инстанс;
 *     приветствие и типовые ответы повторяются у тысяч людей, и платим мы за
 *     них единожды;
 *   • МЕСЯЧНЫЙ ПОТОЛОК В ЗНАКАХ — жёсткий. Исчерпан → возвращаемся на голос
 *     браузера, а не выставляем счёт. Без этого заслона одна назойливая
 *     программа за ночь превратилась бы в счёт, который никто не заказывал.
 *
 * ПРИВАТНОСТЬ. Ответы AIfa могут содержать имя пользователя, поэтому текст
 * никогда не попадает ни в адрес запроса, ни в журналы: в логи идут только
 * длина и код ответа. По той же причине озвучка ходит методом POST — адрес с
 * текстом осел бы в журналах посредников и в кэше сети доставки.
 */
import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { dbRateLimit, dbRateAdd, clientIp } from '@/lib/rate-limit-db';

export const runtime = 'nodejs';

/** Больше этого не озвучиваем: длинные ответы читают глазами, а не слушают. */
const ПРЕДЕЛ_ЗНАКОВ = 700;
/** Сколько озвучек с одного адреса за окно. Реплика в диалоге — примерно одна. */
const ЧАСТОТА = { предел: 40, окноМс: 5 * 60_000 };
/** Месячный потолок трат в знаках. 200 000 знаков ≈ $3. Меняется окружением. */
const ПОТОЛОК_ЗНАКОВ = Math.max(0, Number(process.env.AIFA_TTS_MONTHLY_CHARS ?? '200000') || 0);
/** Сколько озвучек держим в памяти инстанса. ~30 сек речи ≈ 250 КБ. */
const КЭША_ЗАПИСЕЙ = 120;

const КОНЕЧНАЯ_ТОЧКА = process.env.AIFA_TTS_URL || 'https://api.x.ai/v1/audio/speech';
const МОДЕЛЬ = process.env.AIFA_TTS_MODEL || 'grok-voice-tts-1.0';
/** `ara` — тёплый голос. Остальные: eve (звонкий), sal (ровный), rex, leo. */
const ГОЛОС = process.env.AIFA_TTS_VOICE || 'ara';

/** Наши четыре языка → метки, которые понимает Grok TTS. */
function язык(locale: string): string {
  switch (locale) {
    case 'ru': return 'ru';
    case 'es': return 'es-ES';
    case 'zh': return 'zh';
    default: return 'en';
  }
}

/**
 * Готовит текст к произнесению. Тот же разбор идёт и на клиенте, но повторяем
 * его здесь: на вход сервера нельзя полагаться никогда, даже на собственный.
 */
function кПроизнесению(входной: string): string {
  let s = входной || '';
  s = s.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');   // ссылки → подпись
  s = s.replace(/https?:\/\/\S+/g, '');               // голые адреса
  try {
    s = s.replace(/\p{Extended_Pictographic}/gu, '');
    s = s.replace(/[️‍⃣]/g, '');
  } catch {
    s = s.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
  }
  s = s.replace(/[*_#`~>|]/g, '');                    // знаки разметки
  // Пустая строка в тексте — это смена мысли. Просим модель сделать паузу:
  // именно из таких пауз речь и становится живой, а не из скорости чтения.
  s = s.replace(/\n{2,}/g, ' [pause] ');
  s = s.replace(/\s{2,}/g, ' ').trim();
  return s;
}

/** Обрезает по границе предложения, чтобы речь не обрывалась на полуслове. */
function обрезать(s: string, предел: number): string {
  if (s.length <= предел) return s;
  const кусок = s.slice(0, предел);
  const конец = Math.max(кусок.lastIndexOf('. '), кусок.lastIndexOf('! '),
                         кусок.lastIndexOf('? '), кусок.lastIndexOf('… '));
  return (конец > предел * 0.5 ? кусок.slice(0, конец + 1) : кусок).trim();
}

/** Кэш инстанса: одинаковый текст не оплачиваем дважды. */
const кэш = new Map<string, Uint8Array>();
function изКэша(ключ: string): Uint8Array | undefined {
  const v = кэш.get(ключ);
  if (v) { кэш.delete(ключ); кэш.set(ключ, v); }   // освежаем: вытесняем давнее
  return v;
}
function вКэш(ключ: string, звук: Uint8Array): void {
  if (кэш.size >= КЭША_ЗАПИСЕЙ) {
    const самыйДавний = кэш.keys().next().value;
    if (самыйДавний !== undefined) кэш.delete(самыйДавний);
  }
  кэш.set(ключ, звук);
}

/** 204 — «озвучки нет, возьми голос браузера». Не ошибка, а штатный ответ. */
function наБраузер(): NextResponse {
  return new NextResponse(null, { status: 204 });
}

function звуком(байты: Uint8Array, изКэшаЛи: boolean): NextResponse {
  return new NextResponse(байты as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': String(байты.byteLength),
      'Cache-Control': 'private, max-age=3600',
      'X-Voice-Cache': изКэшаЛи ? 'hit' : 'miss',
    },
  });
}

export async function POST(req: NextRequest) {
  // ── 1. Выключено или нет ключа — молча на браузер, без единой траты ───────
  if (process.env.AIFA_TTS_ENABLED !== '1') return наБраузер();
  const ключ = process.env.GROK_API_KEY;
  if (!ключ) return наБраузер();

  // ── 2. Частота. Самая дешёвая проверка — идёт первой ──────────────────────
  const ip = clientIp(req);
  if (ip !== 'unknown') {
    const можно = await dbRateLimit(`voice:${ip}`, ЧАСТОТА.предел, ЧАСТОТА.окноМс);
    if (!можно) return наБраузер();      // не 429: пусть просто скажет браузер
  }

  // ── 3. Разбор тела ────────────────────────────────────────────────────────
  let текст = '';
  let locale = 'en';
  try {
    const тело = await req.json();
    текст = typeof тело?.text === 'string' ? тело.text : '';
    locale = typeof тело?.locale === 'string' ? тело.locale : 'en';
  } catch {
    return наБраузер();
  }
  const готовый = обрезать(кПроизнесению(текст), ПРЕДЕЛ_ЗНАКОВ);
  if (!готовый) return наБраузер();

  // ── 4. Кэш. Дешевле любой траты ───────────────────────────────────────────
  const отпечаток = createHash('sha256')
    .update(`${МОДЕЛЬ}|${ГОЛОС}|${язык(locale)}|${готовый}`).digest('hex');
  const сохранённое = изКэша(отпечаток);
  if (сохранённое) return звуком(сохранённое, true);

  // ── 5. Месячный потолок. Жёсткий: исчерпан — возвращаемся на браузер ──────
  if (ПОТОЛОК_ЗНАКОВ > 0) {
    const месяц = new Date().toISOString().slice(0, 7);        // «2026-08»
    const вБюджете = await dbRateAdd(
      `voice:budget:${месяц}`, готовый.length, ПОТОЛОК_ЗНАКОВ, 32 * 24 * 3600_000);
    if (!вБюджете) {
      console.warn('[voice] месячный потолок знаков исчерпан — голос браузера');
      return наБраузер();
    }
  }

  // ── 6. Собственно озвучка ─────────────────────────────────────────────────
  try {
    const управление = new AbortController();
    const таймер = setTimeout(() => управление.abort(), 20_000);
    let ответ: Response;
    try {
      ответ = await fetch(КОНЕЧНАЯ_ТОЧКА, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ключ}` },
        body: JSON.stringify({
          model: МОДЕЛЬ,
          input: готовый,
          voice: ГОЛОС,
          language: язык(locale),
          response_format: 'mp3',
        }),
        signal: управление.signal,
      });
    } finally {
      clearTimeout(таймер);
    }

    if (!ответ.ok) {
      // Текст запроса в журнал не пишем — в нём может быть имя пользователя.
      console.warn(`[voice] xAI ответил ${ответ.status}; знаков ${готовый.length}`);
      return наБраузер();
    }

    // Ответ бывает двух видов: сырые байты звука (как у OpenAI-совместимых
    // точек) либо json со ссылкой или строкой base64. Принимаем оба — так
    // расхождение в форме ответа не оставит нас без голоса.
    const тип = ответ.headers.get('content-type') || '';
    let байты: Uint8Array | null = null;

    if (тип.includes('json')) {
      const j = await ответ.json();
      const ссылка: string | undefined =
        j?.result?.audio || j?.audio_url || j?.url ||
        (typeof j?.audio === 'string' && /^https?:/.test(j.audio) ? j.audio : undefined);
      const b64: string | undefined =
        j?.audio_base64 || j?.b64_audio ||
        (typeof j?.audio === 'string' && !/^https?:/.test(j.audio) ? j.audio : undefined);
      if (ссылка) {
        const r2 = await fetch(ссылка);
        if (r2.ok) байты = new Uint8Array(await r2.arrayBuffer());
      } else if (b64) {
        байты = new Uint8Array(Buffer.from(b64, 'base64'));
      }
    } else {
      байты = new Uint8Array(await ответ.arrayBuffer());
    }

    if (!байты || байты.byteLength < 256) {
      console.warn('[voice] пустой звук в ответе — голос браузера');
      return наБраузер();
    }

    вКэш(отпечаток, байты);
    return звуком(байты, false);
  } catch (e) {
    console.warn('[voice] сбой озвучки:', String(e).slice(0, 120));
    return наБраузер();
  }
}
