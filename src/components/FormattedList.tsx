'use client';

import React from 'react';

interface FormattedListProps {
  text: string;
  className?: string;
}

export function FormattedList({ text, className = '' }: FormattedListProps) {
  // Find all occurrences of ✅ and ❌ with their indices
  const matches: { icon: '✅' | '❌'; index: number }[] = [];
  const regex = /[✅❌]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push({
      icon: match[0] as '✅' | '❌',
      index: match.index,
    });
  }

  // If there are no emojis in the text, render it as a standard paragraph
  if (matches.length === 0) {
    return <p className={`text-inherit leading-relaxed ${className}`}>{text}</p>;
  }

  const prefix = text.substring(0, matches[0].index).trim();
  const items: { icon: '✅' | '❌'; text: string }[] = [];
  let suffix = '';

  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const nextIndex = i + 1 < matches.length ? matches[i + 1].index : text.length;
    const itemStart = currentMatch.index + currentMatch.icon.length;
    let itemText = text.substring(itemStart, nextIndex).trim();

    // Separate suffix on the last item if there's any sentence termination punctuation (. or 。)
    if (i === matches.length - 1) {
      let splitIndex = -1;
      const cnDot = itemText.indexOf('。');
      const enDot = itemText.indexOf('. ');

      if (cnDot !== -1 && (enDot === -1 || cnDot < enDot)) {
        splitIndex = cnDot;
      } else if (enDot !== -1) {
        splitIndex = enDot;
      }

      if (splitIndex !== -1) {
        const dotChar = itemText[splitIndex];
        const itemPart = itemText.substring(0, splitIndex).trim() + (dotChar === '。' ? '。' : '.');
        const suffixPart = itemText.substring(splitIndex + (dotChar === '。' ? 1 : 2)).trim();
        itemText = itemPart;
        suffix = suffixPart;
      }
    }

    items.push({ icon: currentMatch.icon, text: itemText });
  }

  return (
    <div className={`space-y-4 text-inherit ${className}`}>
      {prefix && <p className="text-inherit leading-relaxed">{prefix}</p>}
      <ul className="space-y-2.5 pl-1 md:pl-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start text-inherit leading-relaxed group hover:text-foreground transition-colors duration-200">
            <span className="mr-3 flex-shrink-0 select-none text-base md:text-lg">
              {item.icon}
            </span>
            <span className="text-sm md:text-base text-inherit">{item.text}</span>
          </li>
        ))}
      </ul>
      {suffix && <p className="text-inherit leading-relaxed mt-4 pt-1">{suffix}</p>}
    </div>
  );
}
