import React from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Shared Markdown → React renderer for the /news list-page modal AND the
// per-article /news/[slug] server route. Pure functions (no browser APIs) so
// they render identically on the server and the client. Extracted verbatim
// from src/app/news/page.tsx — behaviour is unchanged.
// ─────────────────────────────────────────────────────────────────────────────

export function renderTextWithMarkdown(text: string) {
  const parts: (string | React.ReactNode)[] = [];
  let index = 0;
  const regex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > index) {
      parts.push(text.substring(index, matchIndex));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={matchIndex} className="font-semibold text-gray-900 dark:text-zinc-100">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={matchIndex} className="italic text-gray-700 dark:text-zinc-300">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        // Код внутри строки: cyan-700 на bg-gray-200 давал 4.26 при норме
        // 4.5 — недобор на каждом упоминании команды или адреса (28 штук в
        // одной статье). cyan-800 на том же фоне — 5.83. Размер поднят с
        // 12px (text-xs) до 13px: моноширинный шрифт и так мельче обычного.
        <code key={matchIndex} className="px-1.5 py-0.5 bg-gray-200 dark:bg-white/10 text-cyan-800 dark:text-cyan-300 font-mono text-[13px] rounded border border-gray-300 dark:border-white/5">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const closeBracket = token.indexOf(']');
      const label = token.slice(1, closeBracket);
      const url = token.slice(closeBracket + 2, -1);
      parts.push(
        <a
          key={matchIndex}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          /* Ссылки в тексте статьи: cyan-600 на белом — 3.62 при норме 4.5.
             cyan-700 даёт 5.28 на белом и 5.05 на светло-сером фоне статьи. */
          className="text-cyan-700 dark:text-cyan-400 hover:underline cursor-pointer"
        >
          {label}
        </a>
      );
    }

    index = regex.lastIndex;
  }

  if (index < text.length) {
    parts.push(text.substring(index));
  }

  return parts.length > 0 ? parts : text;
}

export interface Block {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote' | 'code' | 'ul' | 'ol' | 'table' | 'hr' | 'p';
  lines: string[];
  lang?: string;
}

export function parseMarkdownToBlocks(markdown: string): Block[] {
  const lines = markdown.split('\n');
  const blocks: Block[] = [];
  let currentBlock: Block | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if inside a code block
    if (currentBlock && currentBlock.type === 'code') {
      if (trimmed.startsWith('```')) {
        blocks.push(currentBlock);
        currentBlock = null;
      } else {
        currentBlock.lines.push(line);
      }
      continue;
    }

    // Start of code block
    if (trimmed.startsWith('```')) {
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      const lang = trimmed.substring(3).trim();
      currentBlock = { type: 'code', lines: [], lang };
      continue;
    }

    // Empty lines
    if (trimmed === '') {
      if (currentBlock) {
        blocks.push(currentBlock);
        currentBlock = null;
      }
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteContent = line.substring(1).replace(/^\s/, '');
      if (currentBlock && currentBlock.type === 'blockquote') {
        currentBlock.lines.push(quoteContent);
      } else {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'blockquote', lines: [quoteContent] };
      }
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---') {
      if (currentBlock) blocks.push(currentBlock);
      blocks.push({ type: 'hr', lines: [] });
      currentBlock = null;
      continue;
    }

    // Headings
    // Порядок важен: длинные образцы проверяются ПЕРВЫМИ. '#### X' не совпадает
    // с '# ', '## ' и '### ', и до появления этих трёх веток такая строка
    // падала в обычный абзац — читатель видел решётки прямо в тексте.
    // Замер 22.08.2026: 36 пар «статья+язык», девять статей, до 38 вхождений.
    if (trimmed.startsWith('###### ')) {
      if (currentBlock) blocks.push(currentBlock);
      blocks.push({ type: 'h6', lines: [trimmed.substring(7).trim()] });
      currentBlock = null;
      continue;
    }
    if (trimmed.startsWith('##### ')) {
      if (currentBlock) blocks.push(currentBlock);
      blocks.push({ type: 'h5', lines: [trimmed.substring(6).trim()] });
      currentBlock = null;
      continue;
    }
    if (trimmed.startsWith('#### ')) {
      if (currentBlock) blocks.push(currentBlock);
      blocks.push({ type: 'h4', lines: [trimmed.substring(5).trim()] });
      currentBlock = null;
      continue;
    }
    if (trimmed.startsWith('# ')) {
      if (currentBlock) blocks.push(currentBlock);
      blocks.push({ type: 'h1', lines: [trimmed.substring(2).trim()] });
      currentBlock = null;
      continue;
    }
    if (trimmed.startsWith('## ')) {
      if (currentBlock) blocks.push(currentBlock);
      blocks.push({ type: 'h2', lines: [trimmed.substring(3).trim()] });
      currentBlock = null;
      continue;
    }
    if (trimmed.startsWith('### ')) {
      if (currentBlock) blocks.push(currentBlock);
      blocks.push({ type: 'h3', lines: [trimmed.substring(4).trim()] });
      currentBlock = null;
      continue;
    }

    // Table Line
    if (trimmed.startsWith('|')) {
      if (currentBlock && currentBlock.type === 'table') {
        currentBlock.lines.push(line);
      } else {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'table', lines: [line] };
      }
      continue;
    }

    // List Items
    const isUlItem = trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ');
    const isOlItem = /^\d+\.\s/.test(trimmed);

    if (isUlItem) {
      const itemContent = trimmed.replace(/^([-*•])\s*/, '').trim();
      if (currentBlock && currentBlock.type === 'ul') {
        currentBlock.lines.push(itemContent);
      } else {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'ul', lines: [itemContent] };
      }
      continue;
    }

    if (isOlItem) {
      const itemContent = trimmed.replace(/^\d+\.\s*/, '').trim();
      if (currentBlock && currentBlock.type === 'ol') {
        currentBlock.lines.push(itemContent);
      } else {
        if (currentBlock) blocks.push(currentBlock);
        currentBlock = { type: 'ol', lines: [itemContent] };
      }
      continue;
    }

    // Paragraph
    if (currentBlock && currentBlock.type === 'p') {
      currentBlock.lines.push(line);
    } else {
      if (currentBlock) blocks.push(currentBlock);
      currentBlock = { type: 'p', lines: [line] };
    }
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks;
}

export function renderMarkdownToReact(content: string) {
  const blocks = parseMarkdownToBlocks(content);

  /**
   * РОВНАЯ ЛЕСТНИЦА ЗАГОЛОВКОВ.
   *
   * Уровни в текстах статей писали люди, и они перескакивают: в теле
   * встречается второй `#` (ещё один h1 на странице) и переходы вида h1 → h3.
   * По заголовкам незрячий человек ходит клавишей H как по оглавлению, и
   * пропущенный уровень читается как потерянный раздел.
   *
   * Здесь уровни ВЫВОДА выпрямляются: первый заголовок тела — h2 (h1 занят
   * заголовком страницы), дальше без пропусков. Оформление берётся по
   * ИСХОДНОМУ уровню, поэтому крупный заголовок остаётся крупным и читатель
   * разницы не видит.
   */
  const уровниТегов: number[] = [];
  {
    let прошлыйИсходный = 0;
    let прошлыйТег = 1;
    for (const блок of blocks) {
      const совпало = /^h([1-6])$/.exec(блок.type);
      if (!совпало) {
        уровниТегов.push(0);
        continue;
      }
      const исходный = Number(совпало[1]);
      let тег;
      if (прошлыйИсходный === 0) тег = 2;
      else if (исходный > прошлыйИсходный) тег = прошлыйТег + 1;
      else if (исходный === прошлыйИсходный) тег = прошлыйТег;
      else тег = прошлыйТег - (прошлыйИсходный - исходный);
      тег = Math.min(6, Math.max(2, тег));
      уровниТегов.push(тег);
      прошлыйИсходный = исходный;
      прошлыйТег = тег;
    }
  }

  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6': {
        const ОФОРМЛЕНИЕ: Record<string, string> = {
          h1: 'text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mt-8 mb-4 border-b border-gray-200 dark:border-zinc-800/80 pb-2',
          h2: 'text-xl md:text-2xl font-semibold text-gray-900 dark:text-zinc-200 mt-6 mb-3',
          h3: 'text-lg font-semibold text-gray-800 dark:text-zinc-300 mt-5 mb-2',
          h4: 'text-base font-semibold text-gray-800 dark:text-zinc-300 mt-4 mb-2',
          h5: 'text-base font-medium text-gray-700 dark:text-zinc-400 mt-4 mb-1',
          h6: 'text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-zinc-400 mt-4 mb-1',
        };
        const тег = 'h' + (уровниТегов[idx] || 2);
        return React.createElement(
          тег,
          { key: idx, className: ОФОРМЛЕНИЕ[block.type] },
          renderTextWithMarkdown(block.lines[0]),
        );
      }
      case 'hr':
        return <hr key={idx} className="border-gray-200 dark:border-white/5 my-6" />;
      case 'blockquote':
        return (
          <blockquote key={idx} className="border-l-2 border-cyan-500/40 pl-4 py-2 my-4 text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-white/[0.02] rounded-r-xl">
            {block.lines.map((line, lIdx) => (
              <p key={lIdx} className="mb-1 last:mb-0">
                {renderTextWithMarkdown(line)}
              </p>
            ))}
          </blockquote>
        );
      case 'code':
        return (
          <pre key={idx} className="bg-gray-100 dark:bg-[#080d1a] text-gray-800 dark:text-zinc-300 font-mono text-sm p-4 rounded-xl border border-gray-200 dark:border-white/5 my-4 overflow-x-auto" tabIndex={0}>
            <code>{block.lines.join('\n')}</code>
          </pre>
        );
      case 'ul':
        return (
          <ul key={idx} className="list-disc list-outside ml-6 space-y-2 mb-4 text-gray-700 dark:text-zinc-300 text-sm md:text-base font-normal">
            {block.lines.map((line, lIdx) => (
              <li key={lIdx} className="leading-relaxed">
                {renderTextWithMarkdown(line)}
              </li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={idx} className="list-decimal list-outside ml-6 space-y-2 mb-4 text-gray-700 dark:text-zinc-300 text-sm md:text-base font-normal">
            {block.lines.map((line, lIdx) => (
              <li key={lIdx} className="leading-relaxed">
                {renderTextWithMarkdown(line)}
              </li>
            ))}
          </ol>
        );
      case 'table': {
        const rows = block.lines
          .map(line => line.trim())
          .filter(line => line.startsWith('|') && line.endsWith('|'));

        if (rows.length === 0) return null;

        /**
         * ПОДПИСЬ ТАБЛИЦЫ ДЛЯ ПРОГРАММ ЧТЕНИЯ С ЭКРАНА.
         *
         * Без неё таблица объявляется как «таблица из двух столбцов» без темы.
         * Берём ближайший заголовок перед таблицей — тот, что человек видит
         * глазами; он уже на языке статьи, поэтому переводить нечего.
         * Заголовка нет — перечисляем столбцы: это хуже темы, но лучше тишины.
         */
        let темаТаблицы = '';
        for (let i = idx - 1; i >= 0; i--) {
          if (/^h[1-6]$/.test(blocks[i].type)) {
            темаТаблицы = blocks[i].lines.join(' ').replace(/[*_`]/g, '').trim();
            break;
          }
        }

        const rawHeaders = rows[0].split('|').slice(1, -1).map(h => h.trim());
        const isDividerRow = (cells: string[]) => cells.every(c => /^:?-+:?$/.test(c) || c === '');
        const bodyRows = rows.slice(1)
          .map(row => row.split('|').slice(1, -1).map(c => c.trim()))
          .filter(cells => !isDividerRow(cells));

        return (
          <div key={idx} className="overflow-x-auto my-6 rounded-xl border border-gray-200 dark:border-white/5" tabIndex={0}>
            <table className="min-w-full border-collapse text-sm text-gray-600 dark:text-zinc-300 bg-white dark:bg-white/[0.01]">
              <caption className="sr-only">
                {темаТаблицы || rawHeaders.join(', ')}
              </caption>
              <thead>
                <tr className="bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/5">
                  {rawHeaders.map((header, hIdx) => (
                    <th key={hIdx} className="px-4 py-3 text-left text-gray-800 dark:text-zinc-200 font-semibold">
                      {renderTextWithMarkdown(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3">
                        {renderTextWithMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      case 'p':
      default:
        return (
          <p key={idx} className="text-gray-700 dark:text-zinc-300 text-sm md:text-base font-normal leading-relaxed mb-4 whitespace-pre-line">
            {renderTextWithMarkdown(block.lines.join('\n'))}
          </p>
        );
    }
  });
}
