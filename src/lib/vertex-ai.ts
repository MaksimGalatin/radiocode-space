import { oidcВходВозможен, пропускGoogleЧерезOidc } from './google-oidc';

/**
 * Доступ к Google Cloud по служебному ключу.
 *
 * Перенесено с эталона `aifa.works/lib/vertex-ai.ts` БЕЗ изменений логики.
 * Здесь он нужен ровно ради одной функции — `getGCPToken`: на ней держатся
 * эмбеддинги (`embeddings.ts`), а без эмбеддингов не работает семантический
 * поиск по памяти. Остальное скопировано как есть, чтобы файл оставался
 * дословной копией эталона и его можно было синкать между сайтами не сверяя
 * построчно.
 */

import crypto from 'crypto';

interface GCPCredentials {
  client_email: string;
  private_key: string;
  project_id: string;
}

/**
 * ПЛАТНЫЙ VERTEX ЗАКРЫТ ПО УМОЛЧАНИЮ (16.08.2026, требование Архитектора).
 *
 * Раздел 13 Конституции написан после того, как за сутки по платному ключу ушло
 * $43.35, которых никто не разрешал. Правило оттуда: платный путь закрыт
 * ФИЗИЧЕСКИ, а не «мы туда не ходим».
 *
 * Проверка стоит здесь, в одной точке, а не в каждом маршруте: Vertex зовут и
 * чат, и AIfaFocus, и озвучка, и сканер. Закрыть надо всё сразу, иначе завтра
 * появится новый маршрут и обойдёт запрет. Открывается только явной переменной
 * `РАЗРЕШЕНЫ_ПЛАТНЫЕ_МОДЕЛИ=1`.
 */
export function платныеРазрешены(): boolean {
  const р = process.env.РАЗРЕШЕНЫ_ПЛАТНЫЕ_МОДЕЛИ || process.env.ALLOW_PAID_MODELS || '';
  return р === '1' || р.toLowerCase() === 'true';
}

/**
 * VERTEX ОТКРЫТ: ОН ИДЁТ С ГРАНТА, А НЕ С КАРТЫ (замер 16.08.2026).
 *
 * Я закрыла его вместе с Grok и была неправа. Отчёт биллинга Google за
 * 1–16 августа: расход Vertex AI $11.62, к оплате $0.00 — всё покрыто
 * кредитами. Остаток гранта GenAI $1 000.00 (до 14.06.2027, израсходовано 0%)
 * плюс $89.35 от Free Trial (сгорает 06.09.2026). Закрытый Vertex ломает
 * озвучку и лестницу моделей, ничего при этом не экономя.
 *
 * Закрытым остаётся ТОЛЬКО `api.x.ai` (Grok): он платится картой Архитектора,
 * и 13.08.2026 по нему за сутки ушло $43.35 без разрешения.
 */
export function isVertexConfigured(): boolean {
  // Без ключа — вход через OIDC Vercel (26.09.2026, lib/google-oidc.ts).
  return !!(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY) || oidcВходВозможен();
}

export async function getGCPToken(saKeyJson: string): Promise<string | null> {
  try {
    const creds: GCPCredentials = JSON.parse(saKeyJson);
    const header = { alg: 'RS256', typ: 'JWT' };
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 3600;
    const payload = {
      iss: creds.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: 'https://oauth2.googleapis.com/token',
      exp,
      iat,
    };

    const toSign = Buffer.from(JSON.stringify(header)).toString('base64url') + '.' +
                   Buffer.from(JSON.stringify(payload)).toString('base64url');

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(toSign);
    const signature = sign.sign(creds.private_key, 'base64url');
    const assertion = toSign + '.' + signature;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${assertion}`,
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.warn('[GCP OAuth] Token exchange failed:', tokenRes.status, errText);
      return null;
    }

    const tokenData = await tokenRes.json();
    return tokenData.access_token || null;
  } catch (err) {
    console.error('[GCP OAuth] Failed to generate token:', err);
    return null;
  }
}

export async function vertexChatCompletion(
  messages: Array<{ role: string; content: string }>,
  maxTokens: number = 8192,
  temperature: number = 0.8,
  /** Какую модель звать — нужно лестнице топовых моделей чата (24.09.2026). */
  modelOverride?: string
): Promise<string | null> {
  if (!isVertexConfigured()) return null;
  // Суточный потолок в долларах — до вызова, чтобы превышение не стоило ни цента.
  if (!(await потолокДолларовVertexНеИсчерпан())) return null;

  try {
    const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY;
    // Ключа нет — вход без ключа через OIDC Vercel (26.09.2026, lib/google-oidc.ts).
    const oidc = saKey ? null : await пропускGoogleЧерезOidc();
    if (!saKey && !oidc) return null;

    const projectId = saKey ? JSON.parse(saKey).project_id : oidc!.проект;
    const model = modelOverride || process.env.VERTEX_MODEL || 'google/gemini-2.5-flash';

    const accessToken = saKey ? await getGCPToken(saKey) : oidc!.токен;
    if (!accessToken) {
      console.warn('[Vertex AI] Could not obtain access token');
      return null;
    }

    // Модели Gemini 3 живут только в регионе global: замер 24.09.2026 — в
    // us-central1 gemini-3.1-pro-preview отвечает 404, в global — «ok».
    const location = /gemini-3/.test(model) ? 'global' : (process.env.GCP_LOCATION || 'us-central1');
    const хост = location === 'global' ? 'aiplatform.googleapis.com' : `${location}-aiplatform.googleapis.com`;
    const url = `https://${хост}/v1beta1/projects/${projectId}/locations/${location}/endpoints/openapi/chat/completions`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: maxTokens,
        temperature,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn(`[Vertex AI] Call failed: ${response.status} - ${errorText.slice(0, 500)}`);
      return null;
    }

    const data = await response.json();

    // УЧЁТ ОБЪЁМА — добавлено 21.08.2026.
    //
    // Замер того же дня: к платным ручкам ходят 22 файла на четырёх сайтах,
    // а расход пишут ПЯТЬ. Чинить их по одному значило бы чинить случай:
    // завтра появится новый маршрут и снова пройдёт мимо счёта. Учёт стоит
    // здесь, в общем посреднике, — через него идут и чат, и AIfaFocus, и
    // озвучка, и сканер, на всех четырёх сайтах сразу.
    //
    // Пишем то, что отдал сам Google в ответе: настоящие токены, а не нашу
    // оценку по длине строки. Если поля нет — считаем по символам запроса,
    // чтобы вызов не пропал из учёта вовсе.
    //
    // Никогда не роняем вызов: сторож не имеет права уронить то, что сторожит.
    try {
      const usage = data?.usage || {};
      const токены = Number(usage.total_tokens || 0)
        || Number(usage.prompt_tokens || 0) + Number(usage.completion_tokens || 0);
      const единиц = токены > 0
        ? токены
        : messages.reduce((s, m) => s + String(m?.content || '').length, 0);
      if (единиц > 0) {
        const { record } = await import('./cost-guard');
        await record(токены > 0 ? 'vertex-chat-tokens' : 'vertex-chat-chars', единиц, 1);
      }
    } catch { /* учёт не важнее самого ответа */ }

    // Стоимость вызова в микродолларах по цене модели — для суточного потолка.
    try { await учестьСтоимостьVertex(model, data?.usage); } catch { /* учёт не мешает ответу */ }

    const content = data.choices?.[0]?.message?.content;
    return typeof content === 'string' && content ? content : null;
  } catch (e) {
    console.warn('[Vertex AI] Request error:', e);
    return null;
  }
}

/**
 * ОТДЕЛЬНЫЙ ВЫКЛЮЧАТЕЛЬ VERTEX ДЛЯ ЧАТА — 24.09.2026.
 *
 * Поручение Архитектора: «Мозг Айфы должен быть подключён через Вертекс к
 * ТОПовой Гугл модели — когда заканчиваются бесплатные лимиты должна отвечать
 * она. Поставь лимиты». Платится грантом Google for Startups ($2000 до
 * 23.09.2027) на биллинге 01DAF7-8B0717-3B1694.
 *
 * ИМЕНА ПЕРЕМЕННЫХ — ЛАТИНИЦЕЙ. Vercel не принимает кириллицу в имени переменной
 * («Only letters, digits, and underscores», 24.09.2026), поэтому рабочие имена —
 * VERTEX_CHAT_ENABLED, VERTEX_DAILY_USD_CAP, VERTEX_CHAT_MODELS; русские
 * оставлены синонимами для окружений, которые их принимают.
 *
 * ПОЧЕМУ НЕ ОБЩИЙ РАЗРЕШЕНЫ_ПЛАТНЫЕ_МОДЕЛИ. Его читает и `lib/embeddings.ts`:
 * включение общего флага открыло бы платные эмбеддинги — тот самый путь, что
 * 18.08.2026 дал 84 221 обращение к платной модели за один час. Здесь
 * открывается ТОЛЬКО чат, отдельной переменной `VERTEX_ЧАТ_РАЗРЕШЁН=1`.
 *
 * ТРИ ЧИСЛА (раздел 24 Конституции):
 *   частота — ступень зовётся, только когда ВСЕ бесплатные ступени молчат;
 *   потолок — `VERTEX_ПОТОЛОК_USD_В_СУТКИ`, по умолчанию $100 за скользящие
 *             сутки (см. `потолокДолларовVertexНеИсчерпан` ниже);
 *   цена    — по прайсу Google для модели из лестницы ниже.
 *
 * ЛЕСТНИЦА МОДЕЛЕЙ — замер `GET /v1beta/models` 24.09.2026: старшая Pro у
 * Google — `gemini-3.1-pro-preview`, стабильная — `gemini-2.5-pro`. Меняется
 * переменной `VERTEX_ЛЕСТНИЦА_ЧАТА` без правки кода.
 */
export const ЛЕСТНИЦА_VERTEX_ЧАТА: string[] = (
  process.env.VERTEX_CHAT_MODELS || process.env.VERTEX_ЛЕСТНИЦА_ЧАТА ||
  'google/gemini-3.1-pro-preview,google/gemini-2.5-pro,google/gemini-2.5-flash'
).split(',').map((м) => м.trim()).filter(Boolean);

export async function vertexЧатОткрыт(): Promise<boolean> {
  const свой = (process.env.VERTEX_CHAT_ENABLED || process.env.VERTEX_ЧАТ_РАЗРЕШЁН || '').toLowerCase();
  if (!(свой === '1' || свой === 'true') && !платныеРазрешены()) return false;
  if (!isVertexConfigured()) return false;

  return await потолокДолларовVertexНеИсчерпан();
}

/** Первая модель лестницы, которая ответила; null — если не ответила ни одна. */
export async function vertexЧатПоЛестнице(
  messages: Array<{ role: string; content: string }>,
  maxTokens: number = 8192,
  temperature: number = 0.8
): Promise<string | null> {
  for (const модель of ЛЕСТНИЦА_VERTEX_ЧАТА) {
    const ответ = await vertexChatCompletion(messages, maxTokens, temperature, модель);
    if (ответ) return ответ;
    console.warn(`[Vertex] ${модель} не ответила — пробую следующую`);
  }
  return null;
}

/**
 * СУТОЧНЫЙ ПОТОЛОК VERTEX В ДОЛЛАРАХ — 24.09.2026, слово Архитектора: «поставь
 * 100 в сутки — вдруг будет скачок пользователей… Эти 100 нужны для защиты на
 * старте». Меняется переменной `VERTEX_ПОТОЛОК_USD_В_СУТКИ` без правки кода.
 *
 * Бюджеты Google только пишут письма и не останавливают расход, суточных
 * бюджетов у Google нет вовсе. Настоящая остановка — здесь: когда сумма за
 * скользящие 24 часа дошла до потолка, `vertexChatCompletion` возвращает null
 * ДО вызова, и разговор уходит к следующей ступени.
 *
 * ЦЕНЫ — из Cloud Billing Catalog API, сервис Vertex AI (C7E2-9256-1C43),
 * замер 24.09.2026, доллары за токен. Берутся цены ДЛИННОГО контекста (выше
 * 200 тыс. токенов) — они самые высокие, поэтому наш счёт скорее завышает
 * расход, чем занижает: потолок срабатывает раньше, а не позже.
 */
const ЦЕНЫ_VERTEX: Array<[RegExp, number, number]> = [
  [/gemini-3(\.\d)?-pro/, 0.000004, 0.000018],   // 3.0/3.1 Pro: ввод $4, вывод $18 за 1M (long)
  // Flash третьего поколения — Cloud Billing Catalog, сервис C7E2-9256-1C43,
  // регион global, обычные запросы, замер 26.09.2026. Нужны сканеру (его
  // лестница Vertex — ниже); без этих строк 3.x Flash считались бы по цене Pro,
  // и потолок срабатывал бы в два с половиной раза раньше настоящего расхода.
  [/gemini-3\.5-flash-lite/, 0.0000003, 0.0000025], // 3.5 Flash-Lite: $0,30 / $2,50
  [/gemini-3\.5-flash/, 0.0000015, 0.000009],       // 3.5 Flash: $1,50 / $9,00
  [/gemini-3\.[678]-flash/, 0.0000015, 0.0000075],  // 3.6/3.7/3.8 Flash: $1,50 / $7,50
  [/gemini-2\.5-pro/, 0.0000025, 0.000015],       // 2.5 Pro: $2,50 / $15 (long)
  [/gemini-2\.5-flash-lite/, 0.0000001, 0.0000004], // 2.5 Flash-Lite: $0,10 / $0,40
  [/gemini-2\.5-flash/, 0.0000003, 0.0000025],    // 2.5 Flash GA: $0,30 / $2,50
];
/** Неизвестная модель считается по самой дорогой цене — ошибка в сторону осторожности. */
const ЦЕНА_ПО_УМОЛЧАНИЮ: [number, number] = [0.000004, 0.000018];

async function учестьСтоимостьVertex(модель: string, usage: any): Promise<void> {
  const вход = Number(usage?.prompt_tokens || 0);
  const всего = Number(usage?.total_tokens || 0);
  // В выход входят и «мысли» модели: берём всё, что не вход.
  const выход = Math.max(Number(usage?.completion_tokens || 0), всего - вход, 0);
  const цена = ЦЕНЫ_VERTEX.find(([шаблон]) => шаблон.test(модель));
  const [цВход, цВыход] = цена ? [цена[1], цена[2]] : ЦЕНА_ПО_УМОЛЧАНИЮ;
  const микро = Math.ceil((вход * цВход + выход * цВыход) * 1e6);
  if (микро <= 0) return;
  const { record } = await import('./cost-guard');
  await record('vertex-usd-micro', микро, 1);
}

async function потолокДолларовVertexНеИсчерпан(): Promise<boolean> {
  const потолок = Number(process.env.VERTEX_DAILY_USD_CAP || process.env.VERTEX_ПОТОЛОК_USD_В_СУТКИ || '100');
  // Ноль и мусор закрывают путь: ошибка настройки стоит молчания модели, а не денег.
  if (!Number.isFinite(потолок) || потолок <= 0) return false;
  try {
    const строка = process.env.SUBMISSIONS_DB_URL || process.env.DATABASE_URL;
    if (!строка) return true;
    const { Pool } = await import('@neondatabase/serverless');
    const pool = new Pool({ connectionString: строка });
    try {
      const r = await pool.query(
        `SELECT COALESCE(SUM(units), 0)::bigint AS u FROM api_spend_hourly
          WHERE service = 'vertex-usd-micro' AND hour_utc >= now() - interval '24 hours'`
      );
      const доллары = Number(r.rows?.[0]?.u || 0) / 1e6;
      if (доллары >= потолок) {
        console.warn(`[Vertex] СУТОЧНЫЙ ПОТОЛОК: $${доллары.toFixed(2)} из $${потолок} — платные вызовы остановлены`);
        return false;
      }
      return true;
    } finally {
      try { await pool.end(); } catch { /* ignore */ }
    }
  } catch (e) {
    console.warn('[Vertex] потолок проверить не удалось, считаю не достигнутым:', String(e).slice(0, 160));
    return true;
  }
}

/**
 * VERTEX ДЛЯ ОНЛАЙН-СКАНЕРА — 26.09.2026.
 *
 * Поручение Архитектора: «ВЕРТЕКС подключи после бесплатной Джемини». Порядок в
 * `app/api/scan/route.ts`: сначала вся бесплатная лестница Gemini на всех
 * ключах, и только если не ответила ни одна модель — эта ступень. Платит тот же
 * грант Google for Startups, что и чат: проект gen-lang-client-0910189597, счёт
 * 01DAF7-8B0717-3B1694 (замер `gcloud billing projects describe` 26.09.2026).
 *
 * ПЕРВАЯ МОДЕЛЬ — ТА ЖЕ, ЧТО НА ВЕРШИНЕ БЕСПЛАТНОЙ ЛЕСТНИЦЫ: gemini-3.7-flash.
 * Отчёт сканера должен быть воспроизводимым; когда бесплатный лимит кончился,
 * вердикт пишет тот же «мозг», а не другой. Модели Vertex — замер
 * `GET /v1beta1/publishers/google/models` 26.09.2026: 3.7-flash, 3.5-flash-lite
 * и 2.5-flash — GA (не preview).
 *
 * ТРИ ЧИСЛА (раздел 24 Конституции), замер 26.09.2026:
 *   частота — только когда молчат ВСЕ бесплатные ступени; за 19–26.09 сканер
 *             звали 12 раз на трёх сайтах (журналы Vercel), и отвечала
 *             бесплатная Gemini;
 *   цена    — запрос 37 868 токенов (журнал aifa.works 25.09) × $1,50 за млн
 *             плюс до 4 096 токенов ответа × $7,50 за млн ≈ $0,09 за страницу,
 *             до трёх страниц на одну проверку;
 *   потолок — общий с чатом `VERTEX_DAILY_USD_CAP` ($100 за скользящие сутки),
 *             проверяется внутри `vertexChatCompletion` ДО вызова.
 *
 * ВЫКЛЮЧАТЕЛЬ: `VERTEX_SCAN_ENABLED=0` закрывает ступень без правки кода.
 * Лестница меняется переменной `VERTEX_SCAN_MODELS`.
 */
export const ЛЕСТНИЦА_VERTEX_СКАНЕРА: string[] = (
  process.env.VERTEX_SCAN_MODELS ||
  'google/gemini-3.7-flash,google/gemini-3.5-flash-lite,google/gemini-2.5-flash'
).split(',').map((м) => м.trim()).filter(Boolean);

export function vertexСканераОткрыт(): boolean {
  const выключатель = (process.env.VERTEX_SCAN_ENABLED || '').trim().toLowerCase();
  if (выключатель === '0' || выключатель === 'false') return false;
  return isVertexConfigured();
}
