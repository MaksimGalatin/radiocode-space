/**
 * Единая точка доступа к Postgres для серверного кода.
 *
 * Зачем. Раньше почти каждый модуль на КАЖДЫЙ вызов делал `new Pool(...)` и
 * затем `pool.end()`. При обычной посещаемости это незаметно, но под наплывом
 * пользователей (или под примитивным флудом) сайт открывал бы по соединению на
 * запрос и упёрся бы в лимит соединений базы — то есть падал бы именно тогда,
 * когда людей много.
 *
 * Что здесь. Драйвер `neon()` работает по HTTP: постоянного соединения нет
 * вовсе, а клиент создаётся один раз на инстанс. Наружу отдаётся объект с теми
 * же методами, что были у пула (`query`, `end`), поэтому вызывающий код менять
 * не нужно: `end()` стал безопасной пустышкой.
 *
 * Ограничение: HTTP-драйвер не держит сессию, поэтому многошаговые транзакции
 * (BEGIN … COMMIT отдельными вызовами) через него не работают. В нашем коде
 * таких нет; если появятся — для них берите `sql.transaction([...])`.
 */

export type QueryResult<T = Record<string, unknown>> = { rows: T[]; rowCount: number };

export type PoolLike = {
  query: <T = Record<string, unknown>>(text: string, params?: unknown[]) => Promise<QueryResult<T>>;
  end: () => Promise<void>;
};

type NeonSql = {
  query: (text: string, params?: unknown[]) => Promise<unknown>;
};

let cached: PoolLike | null = null;
let cachedUrl = '';

/** Пул поверх HTTP-драйвера. Бросает `no_db`, если строка подключения не задана. */
export async function getDbPool(envVar = 'SUBMISSIONS_DB_URL'): Promise<PoolLike> {
  const url = process.env[envVar] || process.env.SUBMISSIONS_DB_URL;
  if (!url) throw new Error('no_db');
  if (cached && cachedUrl === url) return cached;

  const { neon } = await import('@neondatabase/serverless');
  const sql = neon(url) as unknown as NeonSql;

  cached = {
    async query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<QueryResult<T>> {
      const res = (await sql.query(text, params ?? [])) as unknown;
      // Драйвер может отдать либо массив строк, либо объект с полем rows —
      // принимаем оба формата, чтобы не зависеть от версии пакета.
      const rows = (Array.isArray(res) ? res : ((res as { rows?: unknown[] })?.rows ?? [])) as T[];
      return { rows, rowCount: rows.length };
    },
    async end() { /* HTTP-драйверу нечего закрывать — намеренная пустышка */ },
  };
  cachedUrl = url;
  return cached;
}
