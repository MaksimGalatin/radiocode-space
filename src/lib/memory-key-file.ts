/**
 * ФАЙЛ КЛЮЧА ВЕЧНОЙ ПАМЯТИ — один текст для кабинета и для страницы наследника.
 *
 * ЗАЧЕМ ОТДЕЛЬНЫЙ ФАЙЛ. До 30.09.2026 кабинет собирал файл ключа у себя, а
 * страница наследника показывала ключ своей разметкой, и обе отдавали ТОЛЬКО
 * личный ключ. С 16.08.2026 у каждой записи в Arweave свой ключ (`user-key.ts`,
 * «конвертное шифрование»), и без этих ключей записи схемы `AIFA2:` человек без
 * нас не открывал — вопреки разделу 10.4 Конституции. Один текст в одном месте:
 * кабинет и наследник больше не могут разойтись, а проверить сборку можно
 * напрямую, без браузера.
 *
 * ЧТО В ФАЙЛЕ. Личный ключ, описание шифра и ВСЕ живые ключи записей — в том
 * виде, в каком они лежат у нас: завёрнутыми личным ключом. Уничтоженных
 * («забытых») ключей здесь нет и быть не может: их нет в выборке.
 */

export type КлючЗаписи = { id: string; label?: string | null; created?: string | null; wrappedKey: string };

export type СвязкаКлючей = {
  key: string;
  algorithm?: string;
  kdf?: string;
  envelope?: string;
  recordFormat?: string;
  recordKeys?: КлючЗаписи[];
};

/** Как открыть запись без нас — для файла, который человек хранит у себя. */
export const ОПИСАНИЕ_ФОРМАТА_ЗАПИСЕЙ =
  'Records sealed since 16 Aug 2026 look like "AIFA2:<id>:<envelope>". Find <id> in the list below and decrypt ' +
  'its wrapped key with your personal key (the same AES-256-GCM / PBKDF2 envelope): you get the 32-byte record ' +
  'key; decrypt <envelope> with that record key. Older records look like "AIFA-SRV1:<envelope>" and open with the ' +
  'personal key directly. Records you chose to forget are not listed: their keys were destroyed.';

/** Табуляция и перевод строки в подписи сломали бы строку файла — заменяем пробелом. */
const однаСтрока = (s: string | null | undefined) => String(s ?? '').replace(/[\t\r\n]+/g, ' ').trim();

/**
 * Собрать текст файла ключа.
 *
 * `шапка` и `пояснения` — строки на языке человека (кабинет берёт их из словаря,
 * наследник — свои). Всё, что нужно для расшифровки, написано по-английски и
 * одинаково везде: файл должен читаться и через десять лет, без нашего сайта.
 */
export function текстФайлаКлюча(д: СвязкаКлючей, шапка: string[], пояснения: string[]): string {
  const записи = д.recordKeys ?? [];
  return [
    ...шапка,
    '',
    'KEY (base64): ' + д.key,
    '',
    [д.algorithm, д.kdf, д.envelope].filter(Boolean).join('\n'),
    '',
    'RECORD KEYS: ' + записи.length,
    д.recordFormat || ОПИСАНИЕ_ФОРМАТА_ЗАПИСЕЙ,
    'BEGIN RECORD KEYS (id<TAB>wrapped key<TAB>label<TAB>created)',
    ...записи.map((з) => [однаСтрока(з.id), однаСтрока(з.wrappedKey), однаСтрока(з.label), однаСтрока(з.created)].join('\t')),
    'END RECORD KEYS',
    '',
    ...пояснения,
    '',
  ].join('\n');
}
