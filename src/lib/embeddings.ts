/**
 * Эмбеддинги — числовое представление смысла реплики.
 *
 * Дословная копия `aifa.works/lib/embeddings.ts`. Нужна семантическому поиску
 * по памяти: чтобы найти «о чём мы говорили похожего», сначала надо перевести
 * вопрос человека в тот же вектор, каким память записана.
 *
 * ВАЖНО: размерность `EMBED_DIM` обязана совпадать с той, которой заполнена
 * общая таблица `chat_memory` в базе памяти. Разойдётся — поиск не найдёт
 * ничего, и это будет выглядеть как «AIfa забыла», а не как ошибка настройки.
 */

import { getGCPToken } from './vertex-ai';

export const EMBED_DIM = 1536;
const EMBED_MODEL = process.env.EMBED_MODEL || 'gemini-embedding-001';

export type EmbedTask = 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY';

export function isEmbeddingConfigured(): boolean {
  return !!(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY || process.env.GEMINI_API_KEY);
}

function normalize(v: number[]): number[] {
  let sum = 0;
  for (const x of v) sum += x * x;
  const norm = Math.sqrt(sum);
  if (!norm || !isFinite(norm)) return v;
  return v.map((x) => x / norm);
}

function prepare(text: string): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, 8000);
}

async function embedVertex(text: string, task: EmbedTask): Promise<number[] | null> {
  try {
    const saKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY;
    if (!saKey) return null;
    const credentials = JSON.parse(saKey);
    const projectId = credentials.project_id;
    const location = process.env.GCP_LOCATION || 'us-central1';

    const accessToken = await getGCPToken(saKey);
    if (!accessToken) return null;

    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${EMBED_MODEL}:predict`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        instances: [{ task_type: task, content: text }],
        parameters: { outputDimensionality: EMBED_DIM },
      }),
    });
    if (!res.ok) {
      console.warn(`[Embeddings] Vertex failed: ${res.status} - ${(await res.text()).slice(0, 300)}`);
      return null;
    }
    const data = await res.json();
    const values = data?.predictions?.[0]?.embeddings?.values;
    return Array.isArray(values) ? values : null;
  } catch (err) {
    console.warn('[Embeddings] Vertex exception:', err);
    return null;
  }
}

async function embedGemini(text: string, task: EmbedTask): Promise<number[] | null> {
  const key = process.env.GEMINI_API_KEY as string;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${EMBED_MODEL}:embedContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      model: `models/${EMBED_MODEL}`,
      content: { parts: [{ text }] },
      taskType: task,
      outputDimensionality: EMBED_DIM,
    }),
  });
  if (!res.ok) {
    console.warn(`[Embeddings] Gemini failed: ${res.status} - ${(await res.text()).slice(0, 300)}`);
    return null;
  }
  const data = await res.json();
  const values = data?.embedding?.values;
  return Array.isArray(values) ? values : null;
}

export async function embedText(
  text: string,
  task: EmbedTask = 'RETRIEVAL_DOCUMENT'
): Promise<number[] | null> {
  const clean = prepare(text);
  if (!clean) return null;

  if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY) {
    try {
      const v = await embedVertex(clean, task);
      if (v && v.length) return normalize(v);
    } catch (e) {
      console.warn('[Embeddings] Vertex error:', e);
    }
  }
  if (process.env.GEMINI_API_KEY) {
    try {
      const v = await embedGemini(clean, task);
      if (v && v.length) return normalize(v);
    } catch (e) {
      console.warn('[Embeddings] Gemini error:', e);
    }
  }
  return null;
}

export async function embedBatch(
  texts: string[],
  task: EmbedTask = 'RETRIEVAL_DOCUMENT',
  concurrency = 4
): Promise<(number[] | null)[]> {
  const out: (number[] | null)[] = new Array(texts.length).fill(null);
  let cursor = 0;

  async function worker() {
    while (cursor < texts.length) {
      const i = cursor++;
      out[i] = await embedText(texts[i], task);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, texts.length) }, () => worker());
  await Promise.all(workers);
  return out;
}
