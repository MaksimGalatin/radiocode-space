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
  type: 'h1' | 'h2' | 'h3' | 'blockquote' | 'code' | 'ul' | 'ol' | 'table' | 'hr' | 'p';
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

  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'h1':
        return (
          <h1 key={idx} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-zinc-100 mt-8 mb-4 border-b border-gray-200 dark:border-zinc-800/80 pb-2">
            {renderTextWithMarkdown(block.lines[0])}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={idx} className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-zinc-200 mt-6 mb-3">
            {renderTextWithMarkdown(block.lines[0])}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={idx} className="text-lg font-semibold text-gray-800 dark:text-zinc-300 mt-5 mb-2">
            {renderTextWithMarkdown(block.lines[0])}
          </h3>
        );
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
          <pre key={idx} className="bg-gray-100 dark:bg-[#080d1a] text-gray-800 dark:text-zinc-300 font-mono text-sm p-4 rounded-xl border border-gray-200 dark:border-white/5 my-4 overflow-x-auto">
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

        const rawHeaders = rows[0].split('|').slice(1, -1).map(h => h.trim());
        const isDividerRow = (cells: string[]) => cells.every(c => /^:?-+:?$/.test(c) || c === '');
        const bodyRows = rows.slice(1)
          .map(row => row.split('|').slice(1, -1).map(c => c.trim()))
          .filter(cells => !isDividerRow(cells));

        return (
          <div key={idx} className="overflow-x-auto my-6 rounded-xl border border-gray-200 dark:border-white/5">
            <table className="min-w-full border-collapse text-sm text-gray-600 dark:text-zinc-300 bg-white dark:bg-white/[0.01]">
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
