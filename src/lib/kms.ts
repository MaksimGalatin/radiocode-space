/**
 * Optional KMS/HSM layer for wrapping the per-user data keys (bank-grade).
 *
 * DORMANT BY DEFAULT: if no KMS env is configured, `kmsEnabled()` is false and
 * the caller falls back to the local MEMORY_MASTER_KEY envelope (unchanged
 * behaviour). When configured, the per-user key is wrapped by the cloud KMS —
 * the master key material lives inside the provider's HSM and is never exported;
 * the server can only ask KMS to encrypt/decrypt. Stolen DB + stolen env are no
 * longer enough to read anything without also breaching the KMS.
 *
 * Activation (one of):
 *   AWS  : KMS_PROVIDER=aws  KMS_KEY_ID=<arn|keyId>  (+ AWS_REGION, AWS creds
 *          with kms:Encrypt/kms:Decrypt on that key)
 *   GCP  : KMS_PROVIDER=gcp  KMS_KEY_ID=projects/.../cryptoKeys/...  (+ a
 *          service-account JSON in GCP_SERVICE_ACCOUNT_KEY with
 *          roles/cloudkms.cryptoKeyEncrypterDecrypter)
 *
 * Wrapped blobs produced here are prefixed "kms1:" so unwrap can tell them apart
 * from legacy local-master blobs and stay backward compatible.
 */

export const KMS_PREFIX = 'kms1:';

/**
 * KMS СЧИТАЕТСЯ ВКЛЮЧЁННЫМ ТОЛЬКО ЕСЛИ ЕСТЬ И УЧЁТНЫЕ ДАННЫЕ (16.08.2026).
 *
 * Было: проверялись лишь `KMS_PROVIDER` и `KMS_KEY_ID`. Если при этом
 * `GCP_SERVICE_ACCOUNT_KEY` пуст — а такое бывает после переноса переменных, —
 * код шёл в KMS, там `JSON.parse('')` бросал «Unexpected end of JSON input», и
 * КАЖДАЯ запись памяти падала с HTTP 500. Проверено живым прогоном 16.08.2026:
 * три записи из трёх, `db_error`, память не сохранялась вовсе.
 *
 * Стало: нет учётных данных — KMS считается выключенным, в журнал уходит
 * громкое предупреждение, а ключ человека заворачивается мастер-ключом.
 * Память продолжает сохраняться. Смешанное хранение безопасно: развёртывание
 * различает конверты по метке (`isKmsBlob`), поэтому прежние KMS-конверты
 * читаются как читались.
 */
export function kmsEnabled(): boolean {
  const провайдер = process.env.KMS_PROVIDER;
  const ключ = process.env.KMS_KEY_ID;
  if (!провайдер || !ключ) return false;
  // ВАЖНО: перечень переменных должен ТОЧНО совпадать с тем, что читает сам
  // вызов KMS ниже (`GCP_KMS_SERVICE_ACCOUNT_KEY || GCP_SERVICE_ACCOUNT_KEY`).
  // Иначе проверка соврёт: 16.08.2026 я сверила боевые переменные четырёх
  // проектов Vercel и увидела, что на aifa.digital и radiocode.space задан
  // ТОЛЬКО `GCP_KMS_SERVICE_ACCOUNT_KEY`. Проверка по другому имени объявила бы
  // KMS выключенным, и прежние конверты перестали бы разворачиваться — то есть
  // память людей стала бы нечитаемой. Проверка обязана смотреть туда же, куда
  // смотрит рабочий код.
  const учётные = process.env.GCP_KMS_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY
    || process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.AWS_ACCESS_KEY_ID || '';
  if (!учётные.trim()) {
    console.error(
      '[KMS] ВЫКЛЮЧЕН: задан KMS_PROVIDER и KMS_KEY_ID, но учётных данных нет. ' +
      'Ключи людей заворачиваются мастер-ключом. Память сохраняется, но это НЕ ' +
      'та защита, которая настроена — проверь переменные окружения.');
    return false;
  }
  return true;
}

export function isKmsBlob(b64: string): boolean {
  return typeof b64 === 'string' && b64.startsWith(KMS_PREFIX);
}

// ── AWS KMS ──
async function awsEncrypt(plain: Buffer): Promise<string> {
  const { KMSClient, EncryptCommand } = await import('@aws-sdk/client-kms');
  const c = new KMSClient({ region: process.env.AWS_REGION || 'us-east-1' });
  const r = await c.send(new EncryptCommand({ KeyId: process.env.KMS_KEY_ID!, Plaintext: plain }));
  return KMS_PREFIX + Buffer.from(r.CiphertextBlob as Uint8Array).toString('base64');
}
async function awsDecrypt(b64: string): Promise<Buffer> {
  const { KMSClient, DecryptCommand } = await import('@aws-sdk/client-kms');
  const c = new KMSClient({ region: process.env.AWS_REGION || 'us-east-1' });
  const blob = Buffer.from(b64.slice(KMS_PREFIX.length), 'base64');
  const r = await c.send(new DecryptCommand({ CiphertextBlob: blob, KeyId: process.env.KMS_KEY_ID! }));
  return Buffer.from(r.Plaintext as Uint8Array);
}

// ── GCP KMS (REST, so no heavy SDK dependency) ──
async function gcpAccessToken(): Promise<string> {
  const raw = process.env.GCP_KMS_SERVICE_ACCOUNT_KEY || process.env.GCP_SERVICE_ACCOUNT_KEY || '';
  const sa = JSON.parse(raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8'));
  const crypto = await import('crypto');
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const claim = Buffer.from(JSON.stringify({
    iss: sa.client_email, scope: 'https://www.googleapis.com/auth/cloudkms',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })).toString('base64url');
  const signed = crypto.createSign('RSA-SHA256').update(`${header}.${claim}`).sign(sa.private_key).toString('base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${header}.${claim}.${signed}`,
  });
  const j = await res.json();
  if (!j.access_token) throw new Error('gcp_token_failed');
  return j.access_token;
}
async function gcpEncrypt(plain: Buffer): Promise<string> {
  const token = await gcpAccessToken();
  const r = await fetch(`https://cloudkms.googleapis.com/v1/${process.env.KMS_KEY_ID}:encrypt`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ plaintext: plain.toString('base64') }),
  });
  const j = await r.json();
  if (!j.ciphertext) throw new Error('gcp_encrypt_failed');
  return KMS_PREFIX + j.ciphertext;
}
async function gcpDecrypt(b64: string): Promise<Buffer> {
  const token = await gcpAccessToken();
  const r = await fetch(`https://cloudkms.googleapis.com/v1/${process.env.KMS_KEY_ID}:decrypt`, {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ciphertext: b64.slice(KMS_PREFIX.length) }),
  });
  const j = await r.json();
  if (!j.plaintext) throw new Error('gcp_decrypt_failed');
  return Buffer.from(j.plaintext, 'base64');
}

export async function kmsWrap(plain: Buffer): Promise<string> {
  const p = process.env.KMS_PROVIDER;
  if (p === 'aws') return awsEncrypt(plain);
  if (p === 'gcp') return gcpEncrypt(plain);
  throw new Error('kms_not_configured');
}
export async function kmsUnwrap(b64: string): Promise<Buffer> {
  const p = process.env.KMS_PROVIDER;
  if (p === 'aws') return awsDecrypt(b64);
  if (p === 'gcp') return gcpDecrypt(b64);
  throw new Error('kms_not_configured');
}
