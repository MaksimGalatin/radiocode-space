/**
 * Якорь вечной памяти в Solana — общая математика для задачи закрепления и для браузера (30.09.2026).
 *
 * ЗАЧЕМ. Слово Архитектора 30.09.2026 про якорь: «сразу делай под ключ и доводи до идеала».
 * Человек сам, без доверия к нам, проверяет, что его записи в Arweave целы и не подменены и что
 * забытое действительно забыто. Раз в сутки задача собирает отпечатки новых записей и «квитанции
 * забвения» в дерево Меркла и пишет ОДИН корень в Solana заметкой (Memo). Браузер берёт запись из
 * Arweave сам, сводит отпечаток к корню по пути и сверяет корень с транзакцией через публичный узел.
 *
 * ПОЧЕМУ ОДИН ФАЙЛ НА ОБЕ СТОРОНЫ. Задача (Node) и кабинет (браузер) обязаны считать отпечатки одной
 * и той же математикой: разойдись они хоть в байте — проверка покажет «подмена» у честной записи.
 * Здесь только WebCrypto и fetch — они есть и в Node 24, и в браузере. Базы и ключей здесь нет.
 *
 * СХЕМА (менять нельзя: уже закреплённые корни считаются по ней):
 *   лист записи    = SHA-256( 0x00 ‖ байты записи из Arweave )
 *   лист забвения  = SHA-256( 0x02 ‖ UTF-8 "AIFA-FORGET|<номер ключа>|<время уничтожения>" )
 *   узел           = SHA-256( 0x01 ‖ левый ‖ правый )
 * Нечётный узел уровня поднимается выше без пары (не дублируется). Разные первые байты не дают
 * выдать узел за лист и лист забвения за лист записи.
 *
 * В цепь уходит только корень, число листьев и дата — ни почт, ни номеров сделок, ни содержимого.
 */

export const ПРЕФИКС_ЗАМЕТКИ = 'AIFA-ANCHOR v1';
export const ПРОГРАММА_ЗАМЕТОК = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';
/** Кошелёк проекта, которым подписываются якоря. Чужая заметка с тем же текстом проверку не пройдёт. */
export const КОШЕЛЁК_ЯКОРЯ = 'BHwXca9ALDFe38vWzqRGcXom6dEop2u6kWCMwZfQEmee';
/**
 * Публичные узлы для ЧТЕНИЯ цепи, по порядку. Официальный api.mainnet-beta.solana.com отвечает браузеру
 * 403 «Access forbidden» (замер 30.09.2026 с заголовком Origin; из Node без Origin — отвечает), поэтому
 * он последний. Два первых — бесплатные, без ключей, отдают CORS и вернули нашу транзакцию с корнем.
 * Узел, не нашедший транзакцию, — не приговор: спрашиваем следующий.
 */
export const УЗЛЫ_SOLANA: Record<string, string[]> = {
  'mainnet-beta': ['https://solana-rpc.publicnode.com', 'https://solana-mainnet.gateway.tatum.io', 'https://api.mainnet-beta.solana.com'],
  devnet: ['https://api.devnet.solana.com'],
};
export const ШЛЮЗ_ARWEAVE = 'https://arweave.net/raw/';

export type ШагПути = { h: string; слева: boolean };

function вHex(б: Uint8Array): string {
  let s = '';
  for (const x of б) s += x.toString(16).padStart(2, '0');
  return s;
}

function изHex(s: string): Uint8Array {
  if (!/^[0-9a-f]*$/.test(s) || s.length % 2) throw new Error('не шестнадцатеричная строка');
  const б = new Uint8Array(s.length / 2);
  for (let i = 0; i < б.length; i++) б[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
  return б;
}

async function sha256(...части: Uint8Array[]): Promise<string> {
  const всего = части.reduce((n, ч) => n + ч.length, 0);
  const вход = new Uint8Array(всего);
  let сдвиг = 0;
  for (const ч of части) { вход.set(ч, сдвиг); сдвиг += ч.length; }
  const д = await globalThis.crypto.subtle.digest('SHA-256', вход as unknown as ArrayBuffer);
  return вHex(new Uint8Array(д));
}

export function листЗаписи(данные: Uint8Array): Promise<string> {
  return sha256(Uint8Array.of(0x00), данные);
}

export function листЗабвения(номерКлюча: string, уничтожен: string): Promise<string> {
  return sha256(Uint8Array.of(0x02), new TextEncoder().encode(`AIFA-FORGET|${номерКлюча}|${уничтожен}`));
}

function узел(левый: string, правый: string): Promise<string> {
  return sha256(Uint8Array.of(0x01), изHex(левый), изHex(правый));
}

/** Дерево по листьям в заданном порядке: корень и путь для каждого листа. */
export async function построитьДерево(листья: string[]): Promise<{ корень: string; пути: ШагПути[][] }> {
  if (!листья.length) throw new Error('пустое дерево не закрепляют');
  const пути: ШагПути[][] = листья.map(() => []);
  // где[i] — номер узла текущего уровня, в котором сейчас сидит лист i
  let где = листья.map((_, i) => i);
  let уровень = листья.slice();
  while (уровень.length > 1) {
    const выше: string[] = [];
    for (let j = 0; j < уровень.length; j += 2) {
      if (j + 1 < уровень.length) выше.push(await узел(уровень[j], уровень[j + 1]));
      else выше.push(уровень[j]);
    }
    for (let i = 0; i < листья.length; i++) {
      const j = где[i];
      const пара = j % 2 === 0 ? j + 1 : j - 1;
      if (пара < уровень.length) пути[i].push({ h: уровень[пара], слева: пара < j });
      где[i] = Math.floor(j / 2);
    }
    уровень = выше;
  }
  return { корень: уровень[0], пути };
}

/** Свести лист к корню по пути. */
export async function кореньПоПути(лист: string, путь: ШагПути[]): Promise<string> {
  let h = лист;
  for (const шаг of путь) h = шаг.слева ? await узел(шаг.h, h) : await узел(h, шаг.h);
  return h;
}

export function текстЗаметки(день: string, корень: string, листьев: number): string {
  return `${ПРЕФИКС_ЗАМЕТКИ} ${день} root=${корень} n=${листьев}`;
}

export function кореньИзЗаметки(текст: string): string | null {
  const м = текст.match(/AIFA-ANCHOR v1 \d{4}-\d{2}-\d{2} root=([0-9a-f]{64}) n=\d+/);
  return м ? м[1] : null;
}

/** То, что кабинет получает от сервера по каждой закреплённой единице памяти. */
export type ЭлементЯкоря = {
  вид: 'запись' | 'забвение';
  ссылка: string;            // номер сделки Arweave или номер уничтоженного ключа
  уничтожен?: string | null; // для забвения — время уничтожения ровно той строкой, что вошла в лист
  лист: string;
  путь: ШагПути[];
  корень: string;
  подпись: string;           // транзакция Solana
  сеть: string;              // 'mainnet-beta' | 'devnet'
  закреплён: string;
};

export type ИтогПроверки = { ок: boolean; этап: 'данные' | 'лист' | 'путь' | 'цепь' | 'готово'; подробно: string };

/**
 * Корень, который РЕАЛЬНО записан в Solana этой транзакцией нашим кошельком, — спрашиваем у узла сами.
 * Возвращает null, если транзакции нет, подписал не наш кошелёк или заметки нет.
 */
export async function кореньИзЦепи(подпись: string, сеть: string): Promise<string | null> {
  for (const узелRpc of УЗЛЫ_SOLANA[сеть] ?? []) {
    try {
      const о = await fetch(узелRpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getTransaction',
          params: [подпись, { encoding: 'json', commitment: 'confirmed', maxSupportedTransactionVersion: 0 }] }),
      });
      const т = (await о.json().catch(() => null))?.result;
      if (!т) continue;                       // узел молчит или не нашёл — спросить следующий
      if (т.meta?.err) return null;           // транзакция есть, но упала — корня в цепи нет
      const ключи: string[] = т.transaction?.message?.accountKeys ?? [];
      if (ключи[0] !== КОШЕЛЁК_ЯКОРЯ) return null;
      for (const строка of (т.meta?.logMessages ?? []) as string[]) {
        const к = кореньИзЗаметки(строка);
        if (к) return к;
      }
      return null;
    } catch { /* сеть или CORS — следующий узел */ }
  }
  return null;
}

/**
 * Полная проверка одной единицы памяти без доверия к нашему серверу: данные из Arweave → лист →
 * путь → корень → транзакция Solana. `цепь` — кэш корней по подписи, чтобы не спрашивать узел
 * о той же транзакции по разу на каждую запись.
 */
export async function проверитьЭлемент(э: ЭлементЯкоря, цепь: Map<string, Promise<string | null>>): Promise<ИтогПроверки> {
  let лист: string;
  if (э.вид === 'запись') {
    let байты: Uint8Array;
    try {
      const о = await fetch(ШЛЮЗ_ARWEAVE + encodeURIComponent(э.ссылка));
      if (!о.ok) return { ок: false, этап: 'данные', подробно: `Arweave ответил ${о.status}` };
      байты = new Uint8Array(await о.arrayBuffer());
    } catch (e) {
      return { ок: false, этап: 'данные', подробно: `Arweave недоступен: ${String(e).slice(0, 120)}` };
    }
    лист = await листЗаписи(байты);
  } else {
    if (!э.уничтожен) return { ок: false, этап: 'лист', подробно: 'нет времени уничтожения ключа' };
    лист = await листЗабвения(э.ссылка, э.уничтожен);
  }
  if (лист !== э.лист) return { ок: false, этап: 'лист', подробно: 'отпечаток не совпал с закреплённым' };
  if ((await кореньПоПути(лист, э.путь)) !== э.корень) return { ок: false, этап: 'путь', подробно: 'путь не сводится к корню' };
  if (!цепь.has(э.подпись)) цепь.set(э.подпись, кореньИзЦепи(э.подпись, э.сеть).catch(() => null));
  const вЦепи = await цепь.get(э.подпись)!;
  if (!вЦепи) return { ок: false, этап: 'цепь', подробно: 'узел Solana не подтвердил транзакцию нашего кошелька' };
  if (вЦепи !== э.корень) return { ок: false, этап: 'цепь', подробно: 'в цепи другой корень' };
  return { ок: true, этап: 'готово', подробно: 'цела и закреплена' };
}
