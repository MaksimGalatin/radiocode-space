/**
 * ПОЛКИ МОЗГА В NEON — 27.09.2026, решение Архитектора «Да, делаем» (две полки) и «делай» на отпечатки.
 *
 * Копия `codeofdigitaleternity.com/src/lib/brain-shelf.ts`, перенесена на сайт-спутник 29.09.2026.
 * Зачем она здесь: сайт отвечает сам, только когда центральный мозг не ответил (запасная ветка). До
 * переноса в этой ветке посетитель получал до 60 кусков НЕПРОВЕРЕННОГО индекса `__brain__` (перебор
 * 27.09: 1 747 кусков с почтами) — решение «две полки» было применено на одном сайте из четырёх.
 * Теперь посетитель и здесь получает только открытую полку, как на центральном.
 *
 * Таблица brain_shelf базы aifa-memory (DATABASE_URL_VECTOR):
 *   • shelf = 'public' — открытая полка: только уже опубликованное на наших сайтах (новости 4 языков,
 *     llms 24 сайтов), каждый кусок прошёл проверки сборщика `_агент/поиск_грант/собрать_полку_открытую.py`.
 *     Её получает любой собеседник. Замер 29.09.2026: 8 466 кусков, у всех есть отпечаток.
 *   • shelf = 'full' — весь Мозг, ТОЛЬКО Архитектору. Флаг `архитектор` вычисляет вызывающий по
 *     подписанной сессии; слова «я Архитектор» в чате пропуском не являются (раздел 48).
 *
 * Поиск по смыслу: отпечаток вопроса делает lib/embeddings (бесплатный ключ первым; модель и размерность
 * те же, что у центрального, — gemini-embedding-001, 1536), сравнение — HNSW по косинусу. Если отпечатка
 * вопроса нет (бесплатная квота кончилась) — поиск по словам через встроенный полнотекстовый поиск
 * Postgres с формами слов (русский и английский).
 */
import { neon } from '@neondatabase/serverless';
import { embedText } from './embeddings';

export type КусокПолки = { title: string | null; url: string | null; content: string; score: number };

function база() {
  const url = process.env.DATABASE_URL_VECTOR || process.env.VECTOR_DATABASE_URL || '';
  return url ? neon(url) : null;
}

export async function искатьНаПолкеNeon(полка: 'public' | 'full', вопрос: string, k = 5): Promise<КусокПолки[]> {
  const q = (вопрос || '').trim();
  const sql = база();
  if (!sql || q.length < 3) return [];
  try {
    const вектор = await embedText(q, 'RETRIEVAL_QUERY');
    if (вектор && вектор.length) {
      const лит = '[' + вектор.join(',') + ']';
      const строки = await sql`
        SELECT title, url, content, 1 - (embedding <=> ${лит}::halfvec) AS score
          FROM brain_shelf
         WHERE shelf = ${полка} AND embedding IS NOT NULL
         ORDER BY embedding <=> ${лит}::halfvec
         LIMIT ${k}`;
      return (строки as КусокПолки[]).filter((с) => с.score > 0.55);
    }
    // Запасной путь: по словам, с формами слов («книга — книги — книгой»). Любое из слов вопроса
    // («|», а не «&»): требование всех слов сразу для длинного вопроса почти всегда давало ноль.
    const строки = await sql`
      WITH q AS (
        SELECT (to_tsquery('russian', coalesce(nullif(replace(plainto_tsquery('russian', ${q})::text, ' & ', ' | '), ''), 'пусто'))
             || to_tsquery('english', coalesce(nullif(replace(plainto_tsquery('english', ${q})::text, ' & ', ' | '), ''), 'empty'))) AS запрос)
      SELECT title, url, content, ts_rank(tsv, q.запрос) AS score
        FROM brain_shelf, q
       WHERE shelf = ${полка} AND tsv @@ q.запрос
       ORDER BY score DESC
       LIMIT ${k}`;
    return строки as КусокПолки[];
  } catch (e) {
    console.warn(`[полка ${полка}] поиск в Neon не удался:`, String(e).slice(0, 200));
    return [];
  }
}

/**
 * Открытая полка готовым блоком для системного контекста — тот же текст, что у центрального
 * `найтиНаОткрытойПолке`. Пустая строка, если ничего не нашлось или база недоступна: ответ
 * не должен падать из-за полки.
 */
export async function открытаяПолкаБлоком(вопрос: string, k = 5): Promise<string> {
  const доки = await искатьНаПолкеNeon('public', вопрос, k);
  if (!доки.length) return '';
  return '\n\n=== ЗНАНИЯ С НАШИХ ОПУБЛИКОВАННЫХ СТРАНИЦ ===\n'
    + 'Это тексты, которые уже открыто лежат на наших сайтах. Отвечай по ним и давай ссылку на\n'
    + 'страницу-источник. Числа бери дословно. Чего здесь нет — не придумывай, скажи прямо.\n\n'
    + доки.map((д, i) => `[${i + 1}] ${д.title || 'страница'} — ${д.url || ''}\n${(д.content || '').slice(0, 1600)}`).join('\n\n')
    + '\n=== КОНЕЦ ===\n';
}
