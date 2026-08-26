/**
 * Server-managed per-user encryption (the "just works" scheme).
 *
 * - Each user has a personal random 32-byte data key.
 * - That key is stored in `user_keys` WRAPPED by the project MEMORY_MASTER_KEY
 *   (which lives only in server env / KMS — never sent to the browser or git).
 * - Dialogs are encrypted with the user's data key; only the logged-in owner
 *   (via session cookie) gets plaintext back. Public blockchain/GitHub copies
 *   stay ciphertext. The user never types or remembers anything.
 */
import crypto from 'crypto';
import { kmsEnabled, isKmsBlob, kmsWrap, kmsUnwrap } from './kms';

function masterKey(): Buffer {
  const b64 = process.env.MEMORY_MASTER_KEY || '';
  if (!b64) throw new Error('MEMORY_MASTER_KEY not configured');
  const k = Buffer.from(b64, 'base64');
  if (k.length !== 32) throw new Error('MEMORY_MASTER_KEY must be 32 bytes base64');
  return k;
}

// AES-256-GCM envelope: salt(16) + iv(12) + tag(16) + ciphertext, base64.
function aeadEncrypt(key: Buffer, plain: Buffer): string {
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
  const dk = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
  const c = crypto.createCipheriv('aes-256-gcm', dk, iv);
  const ct = Buffer.concat([c.update(plain), c.final()]);
  return Buffer.concat([salt, iv, c.getAuthTag(), ct]).toString('base64');
}
function aeadDecrypt(key: Buffer, b64: string): Buffer {
  const raw = Buffer.from(b64, 'base64');
  const salt = raw.slice(0, 16), iv = raw.slice(16, 28), tag = raw.slice(28, 44), ct = raw.slice(44);
  const dk = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');
  const d = crypto.createDecipheriv('aes-256-gcm', dk, iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(ct), d.final()]);
}

async function pool() {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) throw new Error('no_db');
  const { Pool } = await import('@neondatabase/serverless');
  return new Pool({ connectionString: url });
}

/** Unwrap a stored key blob: KMS if it is a KMS blob, else local master. */
async function unwrapStored(b64: string): Promise<Buffer> {
  if (isKmsBlob(b64)) return kmsUnwrap(b64);
  return aeadDecrypt(masterKey(), b64);
}
/** Wrap a raw key: via KMS when enabled, else local master envelope. */
async function wrapNew(raw: Buffer): Promise<string> {
  if (kmsEnabled()) return kmsWrap(raw);
  return aeadEncrypt(masterKey(), raw);
}

/** Return the user's raw 32-byte data key, creating & storing it (wrapped) if absent. */
export async function getOrCreateUserKey(email: string): Promise<Buffer> {
  const em = email.trim().toLowerCase();
  const p = await pool();
  try {
    const r = await p.query(`SELECT wrapped_key FROM user_keys WHERE email=$1`, [em]);
    if (r.rows[0]) return await unwrapStored(r.rows[0].wrapped_key);
    const raw = crypto.randomBytes(32);
    const wrapped = await wrapNew(raw);
    await p.query(
      `INSERT INTO user_keys(email, wrapped_key) VALUES($1,$2) ON CONFLICT(email) DO NOTHING`,
      [em, wrapped]);
    // re-read (handles the race where another request inserted first)
    const r2 = await p.query(`SELECT wrapped_key FROM user_keys WHERE email=$1`, [em]);
    return await unwrapStored(r2.rows[0].wrapped_key);
  } finally { await p.end(); }
}

/** Encrypt text with the user's data key (for storing a dialog). */
export async function encryptForUser(email: string, text: string): Promise<string> {
  const key = await getOrCreateUserKey(email);
  return aeadEncrypt(key, Buffer.from(text, 'utf8'));
}

/** Decrypt a user-encrypted blob back to text. */
export async function decryptForUser(email: string, cipher: string): Promise<string> {
  const key = await getOrCreateUserKey(email);
  return aeadDecrypt(key, cipher).toString('utf8');
}

/**
 * Те же конверты, но ключ УЖЕ на руках.
 *
 * ЗАЧЕМ. `encryptForUser`/`decryptForUser` каждый раз добывают ключ заново, а
 * это запрос в базу, распаковка в KMS и стотысячная прокрутка pbkdf2. Там, где
 * за один заход надо расшифровать десятки блобов подряд (чтение всей переписки
 * человека админской ручкой), это умножалось на число блобов. Ключ добывается
 * один раз, конверт остаётся ровно тот же.
 */
export function encryptWithUserKey(key: Buffer, text: string): string {
  return aeadEncrypt(key, Buffer.from(text, 'utf8'));
}
export function decryptWithUserKey(key: Buffer, cipher: string): string {
  return aeadDecrypt(key, cipher).toString('utf8');
}

/** Raw key as base64 (for showing the owner their recovery key). Use sparingly. */
export async function getUserKeyB64(email: string): Promise<string> {
  return (await getOrCreateUserKey(email)).toString('base64');
}
/* ────────────────────────────────────────────────────────────────────────────
 * ЛИЧНЫЙ КЛЮЧ ПРИ ЗАЛИВКЕ В ВЕЧНУЮ СЕТЬ
 *
 * До 08.08.2026 всё, что уходило в Arweave, закрывалось ОДНИМ ключом проекта.
 * Один утёкший секрет раскрывал бы переписку ВСЕХ людей сразу и навсегда: сеть
 * неизменяема, залитое не отзывается. Решение Архитектора: у каждого свой ключ,
 * потеря ключа стоит одному человеку, а не всем.
 *
 * Сама заливка живёт только в центральном репозитории (`api/cron/arweave-sync`),
 * поэтому здесь — общая часть: метка, названия схем и обёртки. Так читалка
 * этого сайта понимает конверт, собранный центральным.
 * ──────────────────────────────────────────────────────────────────────────── */

/**
 * Метка «закрыто личным ключом человека».
 *
 * ПОЧЕМУ метка нужна. Видов содержимого три, и по одному base64 они
 * неразличимы: открытый markdown (начинается с «#»), конверт браузерного ключа
 * (прежняя схема) и вот этот, серверный. Без метки читалка не знает, чем
 * пробовать, и либо отдаёт браузеру то, что он открыть не может, либо молча
 * возвращает мусор.
 */
export const МЕТКА_ЛИЧНОГО_КЛЮЧА = 'AIFA-SRV1:';

/**
 * Версии схем — уходят в теги сделки Arweave.
 *
 * ПОЧЕМУ в теги. Сделка живёт вечно, а код меняется. Через год читалка должна по
 * самой сделке понять, чем её открывать, а не гадать по дате заливки. Всё, что
 * залито ДО 08.08.2026, тега не имеет — отсутствие тега и означает «старая
 * схема, общий ключ проекта».
 */
export const СХЕМА_ЛИЧНОГО_КЛЮЧА = 'aifa-user-key-v1';
/** Прежняя схема: один общий ключ проекта. Только для чтения. */
export const СХЕМА_ОБЩЕГО_КЛЮЧА = 'project-key-v0';
/** Конверт, собранный ключом из браузера. Сервер его не открывает и не создаёт. */
export const СХЕМА_БРАУЗЕРНОГО_КЛЮЧА = 'client-key-v1';

/** Помечен ли шифротекст как закрытый личным ключом человека. */
export function помеченЛичнымКлючом(v: string): boolean {
  return typeof v === 'string' && v.startsWith(МЕТКА_ЛИЧНОГО_КЛЮЧА);
}

/**
 * Шифрует текст личным ключом человека и ставит метку схемы.
 *
 * Бросает исключение, если ключ не удалось ни найти, ни завести — и это
 * единственное правильное поведение перед заливкой в вечную сеть: вызывающий
 * обязан пропустить запись, а не подставлять запасной ключ.
 */
export async function encryptForUserTagged(email: string, text: string): Promise<string> {
  return МЕТКА_ЛИЧНОГО_КЛЮЧА + (await encryptForUser(email, text));
}

/** Снимает метку и расшифровывает личным ключом. Без метки — как есть. */
/**
 * Расшифровать что угодно из хранилищ памяти — какой бы меткой оно ни было
 * помечено.
 *
 * НАЙДЕНО ЗАМЕРОМ 26.08.2026, живым запросом в блокчейн. Четыре последних
 * архива (`j2Aph49…`, `cwOsejdZ…`, `RU_qrks7…`, `1J27kbAe…`) начинаются с
 * `AIFA2:` — это конверт с отдельным ключом записи, введённый 16.08.2026.
 * А эта функция знала только метку `AIFA-SRV1:` и всё остальное отдавала в
 * `decryptForUser`, который такой конверт разобрать не может.
 *
 * Следствие было тихим и оттого скверным: архивы в блокчейне лежали целые и
 * читаемые, но кабинет НИ НА ОДНОМ из четырёх сайтов не мог их открыть.
 * Снаружи это выглядит не как поломка, а как «вечная память пустая».
 *
 * Порядок разбора — от самой новой метки к самой старой, и ни одна ветка не
 * убрана: записи всех трёх поколений читаются как раньше.
 */
export async function decryptForUserTagged(email: string, v: string): Promise<string> {
  // 1. Конверт с ключом записи (с 16.08.2026) — в нём номер ключа и шифр.
  if (сКлючомЗаписи(v)) return расшифроватьЗапись(email, v);
  // 2. Пометка личного ключа и 3. всё прежнее, без пометки.
  return decryptForUser(email, помеченЛичнымКлючом(v) ? v.slice(МЕТКА_ЛИЧНОГО_КЛЮЧА.length) : v);
}

// ─── ПЕРЕНЕСЕНО С ЦЕНТРАЛЬНОГО САЙТА 26.08.2026 ────────────────────────────
//
// Прямое слово Архитектора: «закончи, это очень важно». До этого дня слой
// ключей записи жил ТОЛЬКО в `codeofdigitaleternity.com` — один репозиторий
// из четырёх. Пока в блокчейн заливал только центральный, это не вредило.
// Но кабинет ЕДИНЫЙ, и стоило включить выгрузку с любого спутника — записи
// ушли бы туда БЕЗ отдельного ключа, и забыть один диалог стало бы нельзя
// уже никогда: из блокчейна не изымается ничего.
//
// Код скопирован С ЦЕНТРАЛЬНОГО ДОСЛОВНО, а не написан заново. Две разные
// реализации одного шифрования — это способ однажды получить конверт,
// который не читается второй стороной; здесь такая ошибка стоила бы памяти.
// ─── КОНВЕРТНОЕ ШИФРОВАНИЕ: СВОЙ КЛЮЧ НА КАЖДУЮ ЗАПИСЬ ──────────────────────
//
// ЗАЧЕМ. До 16.08.2026 у человека был ОДИН ключ на всю память. Из блокчейна
// запись изъять нельзя, поэтому «удаление» там одно — уничтожить ключ; но с
// одним ключом это всё или ничего: попросил убрать один разговор — теряешь всю
// память. Человек об этом даже не догадывался, пока мы не написали честную
// формулировку в согласии.
//
// КАК УСТРОЕНО ТЕПЕРЬ. У каждой записи, уходящей в цепь, свой одноразовый ключ:
//   1. на запись выпускается случайный ключ K на 32 байта;
//   2. содержимое шифруется этим K — в цепь уходит только шифротекст;
//   3. сам K заворачивается ЛИЧНЫМ ключом человека и хранится ТОЛЬКО у нас,
//      в таблице `record_keys`. В цепь он не попадает никогда.
// Уничтожили строку в `record_keys` — эта запись в цепи стала шумом навсегда,
// остальная память жива. Это и есть криптошреддинг одной записи.
//
// ПОЧЕМУ КЛЮЧ НЕ ВНУТРИ КОНВЕРТА. Иначе он ушёл бы в цепь вместе с
// шифротекстом, и уничтожать было бы нечего: копия ключа осталась бы там
// навсегда. Внутри конверта лежит только НОМЕР ключа — по номеру ничего не
// расшифровать, он не выдаёт ни содержания, ни владельца.
//
// СОВМЕСТИМОСТЬ. Старые записи читаются как раньше: у них нет метки `AIFA2:`,
// и разбор уходит по прежнему пути. Ни одна старая запись не теряется.

/** Метка конверта с ключом записи. Всё, что без неё, — прежняя схема. */
export const МЕТКА_КЛЮЧА_ЗАПИСИ = 'AIFA2:';
export const СХЕМА_КЛЮЧА_ЗАПИСИ = 'aifa-record-key-v1';

/** true, если это конверт с отдельным ключом записи. */
export function сКлючомЗаписи(v: string): boolean {
  return typeof v === 'string' && v.startsWith(МЕТКА_КЛЮЧА_ЗАПИСИ);
}

async function таблицаКлючейЗаписей(p: { query: (s: string, v?: unknown[]) => Promise<unknown> }) {
  await p.query(`CREATE TABLE IF NOT EXISTS record_keys(
    key_id      text PRIMARY KEY,
    email       text NOT NULL,
    ссылка      text,
    wrapped_key text NOT NULL,
    created_at  timestamptz DEFAULT now(),
    destroyed_at timestamptz)`);
  await p.query(`CREATE INDEX IF NOT EXISTS record_keys_email_idx ON record_keys(email)`);
}

/**
 * Зашифровать содержимое отдельным ключом записи.
 *
 * `ссылка` — человеко-понятная пометка, что это за запись (например,
 * `chat_memory:почта:main`). Нужна только для того, чтобы человек в кабинете
 * видел, что именно он собирается уничтожить.
 */
export async function зашифроватьЗапись(email: string, text: string, ссылка?: string): Promise<string> {
  const em = email.trim().toLowerCase();
  const личный = await getOrCreateUserKey(em);
  const ключЗаписи = crypto.randomBytes(32);
  const номер = crypto.randomBytes(16).toString('hex');
  const завёрнутый = aeadEncrypt(личный, ключЗаписи);

  const p = await pool();
  try {
    await таблицаКлючейЗаписей(p);
    await p.query(
      `INSERT INTO record_keys(key_id, email, ссылка, wrapped_key) VALUES($1,$2,$3,$4)`,
      [номер, em, ссылка ?? null, завёрнутый]);
  } finally { await p.end(); }

  return МЕТКА_КЛЮЧА_ЗАПИСИ + номер + ':' + aeadEncrypt(ключЗаписи, Buffer.from(text, 'utf8'));
}

/**
 * Расшифровать конверт с ключом записи. Если ключ уничтожен — честная ошибка,
 * а не пустая строка: молчание здесь неотличимо от «записи не было».
 */
export async function расшифроватьЗапись(email: string, конверт: string): Promise<string> {
  if (!сКлючомЗаписи(конверт)) return decryptForUser(email, конверт);
  const тело = конверт.slice(МЕТКА_КЛЮЧА_ЗАПИСИ.length);
  const раздел = тело.indexOf(':');
  if (раздел < 0) throw new Error('повреждённый конверт: нет номера ключа');
  const номер = тело.slice(0, раздел);
  const шифр = тело.slice(раздел + 1);

  const p = await pool();
  let завёрнутый: string | null = null;
  let уничтожен: string | null = null;
  try {
    await таблицаКлючейЗаписей(p);
    /**
     * Ключ ищется по номеру И ПО ВЛАДЕЛЬЦУ.
     *
     * Криптографически хватило бы и одного номера: чужой завёрнутый ключ не
     * разворачивается личным ключом другого человека — проверка подлинности
     * AES-GCM просто не сойдётся. Но полагаться на одну лишь математику здесь
     * неправильно: условие по почте делает границу видимой в самом запросе,
     * и её нельзя потерять при будущей правке, не заметив этого.
     */
    const r = await p.query<{ wrapped_key: string; destroyed_at: string | null }>(
      `SELECT wrapped_key, destroyed_at FROM record_keys WHERE key_id=$1 AND email=$2`,
      [номер, email.trim().toLowerCase()]);
    завёрнутый = r.rows[0]?.wrapped_key ?? null;
    уничтожен = r.rows[0]?.destroyed_at ?? null;
  } finally { await p.end(); }

  /**
   * Сообщение намеренно не различает «уничтожен» и «чужой».
   *
   * Проба 16.08.2026: чужому человеку показывалось «ключ уничтожен» — неправда,
   * ключ жив, просто не его. Но и говорить «эта запись принадлежит другому»
   * нельзя: так по номеру можно проверять чужие записи на существование.
   * Формулировка честная и ничего не выдаёт.
   */
  if (!завёрнутый || уничтожен)
    throw new Error('ключ этой записи недоступен: он либо уничтожен, либо принадлежит другому человеку — расшифровать её нельзя');

  const личный = await getOrCreateUserKey(email);
  const ключЗаписи = aeadDecrypt(личный, завёрнутый);
  return aeadDecrypt(ключЗаписи, шифр).toString('utf8');
}

/**
 * Уничтожить ключ одной записи — криптошреддинг ровно её.
 *
 * Строка не удаляется, а помечается: остаётся след, что запись была и когда её
 * закрыли. Сам ключ затирается, восстановить его нельзя.
 */
export async function уничтожитьКлючЗаписи(email: string, номер: string): Promise<boolean> {
  const em = email.trim().toLowerCase();
  const p = await pool();
  try {
    await таблицаКлючейЗаписей(p);
    /**
     * Отчитываемся по RETURNING, а не по rowCount.
     *
     * Проба 16.08.2026: ключ уничтожался, а функция возвращала false, потому
     * что драйвер не всегда заполняет rowCount. Врущий ответ здесь опаснее
     * самой ошибки: кабинет сказал бы человеку «не получилось», а запись уже
     * была бы нечитаемой навсегда.
     */
    const r = await p.query<{ key_id: string }>(
      `UPDATE record_keys SET wrapped_key='', destroyed_at=now()
        WHERE key_id=$1 AND email=$2 AND destroyed_at IS NULL
        RETURNING key_id`, [номер, em]);
    return (r.rows?.length ?? 0) === 1;
  } finally { await p.end(); }
}

/** Номер ключа из конверта — чтобы показать человеку, что он уничтожает. */
export function номерКлюча(конверт: string): string | null {
  if (!сКлючомЗаписи(конверт)) return null;
  const тело = конверт.slice(МЕТКА_КЛЮЧА_ЗАПИСИ.length);
  const i = тело.indexOf(':');
  return i > 0 ? тело.slice(0, i) : null;
}

/**
 * УНИЧТОЖИТЬ ЦЕЛЫЙ ДИАЛОГ ОДНИМ ДЕЙСТВИЕМ.
 *
 * ЗАЧЕМ. Требование Архитектора 25.08.2026: «ключ один, но каждый диалог
 * шифруется отдельно при выгрузке в блокчейн, чтобы можно было удалить ОДИН
 * диалог стерев его ключ, а не всю память. И мы это должны были уже давно
 * доделать».
 *
 * Механизм крипто-шреддинга был, а действия «забудь этот разговор» не было:
 * `уничтожитьКлючЗаписи` бьёт по ОДНОМУ ключу, а у одного диалога их сотни —
 * замер 25.08.2026 дал 222 ключа на диалог. Человек физически не мог пройти
 * их по одному, и обещанная возможность оставалась на бумаге.
 *
 * ПОЧЕМУ КЛЮЧЕЙ СОТНИ, И ЭТО НЕ ОШИБКА. Ключ выпускается на КАЖДУЮ выгрузку.
 * В блокчейне лежит не одна запись диалога, а все его прежние состояния —
 * оттуда ничего не изымается. Уничтожить надо ВСЕ ключи диалога: оставишь
 * один — соответствующий ему старый слепок разговора останется читаемым.
 * Поэтому здесь именно `ссылка`, а не `key_id`.
 *
 * НЕОБРАТИМОСТЬ. Ключи затираются насовсем; шифротекст в блокчейне становится
 * шумом навсегда. Раздел 18 Конституции: вызывать только по явному действию
 * человека, никогда — фоном, никогда — «заодно».
 *
 * ПОЧЕМУ НЕ ТРОГАЕМ САМУ ЗАПИСЬ В БАЗЕ. В базе переписка лежит открытым
 * текстом (раздел 10), и её удаление — отдельный разговор с человеком.
 * Здесь закрывается ровно вечная копия, изъять которую иначе нельзя.
 *
 * @returns сколько ключей затёрто. Ноль значит «такого диалога нет или он
 *          уже закрыт» — и это честный ответ, а не ошибка.
 */
export async function уничтожитьДиалог(email: string, ссылка: string): Promise<number> {
  const em = email.trim().toLowerCase();
  const метка = (ссылка ?? '').trim();
  // Пустая метка снесла бы ВСЕ ключи человека — это «удалить всю память»,
  // а просят обратное. Отказ громкий: молчаливый ноль тут неотличим от беды.
  if (!метка) throw new Error('уничтожитьДиалог: пустая ссылка на диалог');

  const p = await pool();
  try {
    await таблицаКлючейЗаписей(p);
    const r = await p.query<{ key_id: string }>(
      `UPDATE record_keys SET wrapped_key='', destroyed_at=now()
        WHERE email=$1 AND ссылка=$2 AND destroyed_at IS NULL
        RETURNING key_id`, [em, метка]);
    return r.rows?.length ?? 0;
  } finally { await p.end(); }
}

/**
 * Перечень диалогов человека: что можно забыть и сколько там ключей.
 *
 * Нужен, чтобы кабинет показывал выбор ДО необратимого действия. Без него
 * человеку пришлось бы называть метку наизусть.
 */
export async function диалогиЧеловека(email: string): Promise<
  Array<{ ссылка: string; ключей: number; закрытых: number; последняя: string | null }>
> {
  const em = email.trim().toLowerCase();
  const p = await pool();
  try {
    await таблицаКлючейЗаписей(p);
    const r = await p.query<{
      ссылка: string; ключей: string; закрытых: string; последняя: string | null;
    }>(
      `SELECT ссылка,
              COUNT(*) FILTER (WHERE destroyed_at IS NULL)     AS ключей,
              COUNT(*) FILTER (WHERE destroyed_at IS NOT NULL) AS закрытых,
              MAX(created_at)::text                            AS последняя
         FROM record_keys
        WHERE email=$1 AND ссылка IS NOT NULL AND ссылка <> ''
        GROUP BY ссылка
        ORDER BY MAX(created_at) DESC`, [em]);
    return (r.rows ?? []).map((x) => ({
      ссылка: x.ссылка,
      ключей: Number(x.ключей),
      закрытых: Number(x.закрытых),
      последняя: x.последняя,
    }));
  } finally { await p.end(); }
}
