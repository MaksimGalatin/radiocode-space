/**
 * Разбор архивных файлов переписки — часть эталонного `aifa.works/lib/chat-logger.ts`.
 *
 * ПОЧЕМУ ЗДЕСЬ ТОЛЬКО ДВЕ ФУНКЦИИ, А НЕ ВЕСЬ ФАЙЛ.
 *
 * `memory.ts` и `vector-store.ts` берут отсюда ровно две вещи — `sanitizeEmail`
 * и `parseChunkContent`. Обе перенесены ДОСЛОВНО, без единой правки, потому что
 * от `sanitizeEmail` зависит ключ памяти: он считается как sha256 ИМЕННО от
 * такой строки. Отличие в один символ — и запрос к общей базе памяти вернёт
 * пусто при полной базе. Ту же копию, с тем же предупреждением, уже держит у
 * себя `heir.ts` (функция `почтаДляКлюча`).
 *
 * Остальное из эталона (запись и чтение .md-архива на диске) сюда НЕ перенесено
 * намеренно: на radiocode.space переписка человека хранится в базе, через
 * `memory-archive.ts` и личный ключ из `user-key.ts`, а не файлами. Перенести
 * файловую часть значило бы завести вторую, никем не вызываемую схему хранения
 * рядом с работающей — и следующий читатель принял бы её за настоящую.
 */

/**
 * Приводит адрес почты к безопасному виду имени файла и ключа памяти.
 * ДОСЛОВНАЯ копия эталона — менять нельзя, см. пояснение выше.
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase().replace(/[^a-z0-9_.-]/g, '_');
}

/**
 * Разбирает один markdown-кусок архива на список реплик.
 * ДОСЛОВНАЯ копия эталона.
 */
export function parseChunkContent(
  content: string
): Array<{ role: 'user' | 'assistant'; content: string; timestamp: string; name: string }> {
  // Speaker label is any text after the [timestamp]: "User", a nickname,
  // or "AIfa"/"assistant" for the AI side.
  // The timestamp group is constrained to the exact format the logger writes
  // ("YYYY-MM-DD HH:MM:SS") so bracketed markdown headings inside message
  // content are not mistaken for speaker headers.
  const headerRegex = /###\s*\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\]\s*([^\n\r]+)\r?\n/g;
  let match;
  const matches: Array<{ index: number; headerLength: number; timestamp: string; role: 'user' | 'assistant'; name: string }> = [];

  while ((match = headerRegex.exec(content)) !== null) {
    const timestamp = match[1];
    const name = match[2].trim();
    const role: 'user' | 'assistant' = (name === 'AIfa' || name === 'assistant') ? 'assistant' : 'user';
    matches.push({
      index: match.index,
      headerLength: match[0].length,
      timestamp,
      role,
      name
    });
  }

  const messages: Array<{ role: 'user' | 'assistant'; content: string; timestamp: string; name: string }> = [];

  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    const nextIndex = (i + 1 < matches.length) ? matches[i + 1].index : content.length;

    let msgContent = content.substring(current.index + current.headerLength, nextIndex);
    msgContent = msgContent.trim();
    if (msgContent.endsWith('---')) {
      msgContent = msgContent.slice(0, -3).trim();
    }

    messages.push({
      role: current.role,
      content: msgContent,
      timestamp: current.timestamp,
      name: current.name
    });
  }

  return messages;
}
