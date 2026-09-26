/**
 * ВХОД В GOOGLE БЕЗ КЛЮЧА — через OIDC Vercel (26.09.2026).
 *
 * Зачем. У aifa.digital и radiocode.space нет ключа служебного аккаунта Google,
 * а вписывать секретный ключ в настройки — лишняя копия секрета и лишний риск.
 * Поручение Архитектора 26.09.2026: Vertex — во всех чатах на 4 сайтах, после
 * Ollama и бесплатной Gemini.
 *
 * Как устроено. Vercel подписывает каждый запрос сайта своим токеном OIDC
 * (включено у всех 4 проектов: oidcTokenConfig.enabled = true, issuerMode team).
 * В Google Cloud (проект gen-lang-client-0910189597) заведены:
 *   пул `vercel` и провайдер `vercel` — доверяют издателю
 *   https://oidc.vercel.com/maksimgalatins-projects и только нашей команде
 *   (условие assertion.owner == 'maksimgalatins-projects');
 *   право roles/iam.workloadIdentityUser на аккаунт aifa-vertex — только для
 *   проектов aifa.digital и radiocode-space.
 * Токен Vercel меняется в STS на федеративный, тот — на токен aifa-vertex.
 * Ключей нет нигде: ни в коде, ни в настройках.
 *
 * Где используется. lib/vertex-ai.ts — ТОЛЬКО когда ключа служебного аккаунта
 * нет. Где ключ есть (aifa.works, центральный сайт), всё работает как раньше.
 *
 * Ничего секретного здесь нет: номер проекта, имя пула и адрес аккаунта —
 * это адреса, а не пропуска. Меняются переменными без правки кода.
 */

const WIF_ПРОЕКТ = process.env.GCP_WIF_PROJECT_ID || 'gen-lang-client-0910189597';
const WIF_АУДИТОРИЯ = process.env.GCP_WIF_AUDIENCE ||
  '//iam.googleapis.com/projects/167554402113/locations/global/workloadIdentityPools/vercel/providers/vercel';
const WIF_АККАУНТ = process.env.GCP_WIF_SERVICE_ACCOUNT ||
  'aifa-vertex@gen-lang-client-0910189597.iam.gserviceaccount.com';

/** Работаем на Vercel или есть токен OIDC локально — только тогда вход возможен. */
export function oidcВходВозможен(): boolean {
  return process.env.VERCEL === '1' || !!process.env.VERCEL_OIDC_TOKEN;
}

/**
 * Токен OIDC Vercel — так же, как getVercelOidcToken() из @vercel/functions:
 * заголовок x-vercel-oidc-token из контекста текущего запроса, а если его нет —
 * переменная VERCEL_OIDC_TOKEN (сборка, локальный запуск).
 */
function токенVercel(): string | null {
  try {
    const контекст = (globalThis as unknown as Record<symbol, { get?: () => { headers?: Record<string, string> } }>)
      [Symbol.for('@vercel/request-context')]?.get?.();
    const изЗаголовка = контекст?.headers?.['x-vercel-oidc-token'];
    if (изЗаголовка) return String(изЗаголовка);
  } catch {
    // контекста нет — не на Vercel; ниже запасной путь
  }
  return process.env.VERCEL_OIDC_TOKEN || null;
}

let кэш: { токен: string; до: number } | null = null;

/** Пропуск Google через OIDC: токен aifa-vertex и проект. null — если не вышло. */
export async function пропускGoogleЧерезOidc(): Promise<{ токен: string; проект: string } | null> {
  if (кэш && кэш.до > Date.now() + 60_000) return { токен: кэш.токен, проект: WIF_ПРОЕКТ };
  const oidc = токенVercel();
  if (!oidc) {
    console.warn('[GCP OIDC] нет токена OIDC Vercel — вход без ключа невозможен');
    return null;
  }
  try {
    const sts = await fetch('https://sts.googleapis.com/v1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grantType: 'urn:ietf:params:oauth:grant-type:token-exchange',
        audience: WIF_АУДИТОРИЯ,
        scope: 'https://www.googleapis.com/auth/cloud-platform',
        requestedTokenType: 'urn:ietf:params:oauth:token-type:access_token',
        subjectToken: oidc,
        subjectTokenType: 'urn:ietf:params:oauth:token-type:jwt',
      }),
    });
    if (!sts.ok) {
      console.warn('[GCP OIDC] обмен в STS не прошёл:', sts.status, (await sts.text()).slice(0, 300));
      return null;
    }
    const федеративный = (await sts.json())?.access_token;
    if (!федеративный) return null;

    const ответ = await fetch(
      `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${WIF_АККАУНТ}:generateAccessToken`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${федеративный}` },
        body: JSON.stringify({ scope: ['https://www.googleapis.com/auth/cloud-platform'], lifetime: '3600s' }),
      },
    );
    if (!ответ.ok) {
      console.warn('[GCP OIDC] токен aifa-vertex не выдан:', ответ.status, (await ответ.text()).slice(0, 300));
      return null;
    }
    const данные = await ответ.json();
    if (!данные?.accessToken) return null;
    кэш = { токен: данные.accessToken, до: Date.parse(данные.expireTime) || Date.now() + 50 * 60_000 };
    return { токен: данные.accessToken, проект: WIF_ПРОЕКТ };
  } catch (err) {
    console.warn('[GCP OIDC] сбой входа:', String(err).slice(0, 200));
    return null;
  }
}
