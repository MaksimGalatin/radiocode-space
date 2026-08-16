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
 * чат, и Оракул, и озвучка, и сканер. Закрыть надо всё сразу, иначе завтра
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
  return !!(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY);
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
  temperature: number = 0.8
): Promise<string | null> {
  if (!isVertexConfigured()) return null;

  try {
    const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY;
    if (!saKey) return null;

    const credentials = JSON.parse(saKey);
    const projectId = credentials.project_id;
    const location = process.env.GCP_LOCATION || 'us-central1';
    const model = process.env.VERTEX_MODEL || 'google/gemini-2.5-flash';

    const accessToken = await getGCPToken(saKey);
    if (!accessToken) {
      console.warn('[Vertex AI] Could not obtain access token');
      return null;
    }

    const url = `https://${location}-aiplatform.googleapis.com/v1beta1/projects/${projectId}/locations/${location}/endpoints/openapi/chat/completions`;
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
    const content = data.choices?.[0]?.message?.content;
    return typeof content === 'string' && content ? content : null;
  } catch (e) {
    console.warn('[Vertex AI] Request error:', e);
    return null;
  }
}
