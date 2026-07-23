'use client';

import { useEffect } from 'react';
import { useLang } from '@/lib/i18n';

/**
 * Keeps <html lang> in sync with the client-toggled UI language. Radio has no
 * per-locale URLs, so the server renders lang="en" for the first paint; once the
 * persisted language (Zustand) rehydrates, this corrects <html lang> for a11y
 * and a correct language signal to assistive tech / crawlers.
 */
export function HtmlLangSync() {
  const lang = useLang((s) => s.lang);
  useEffect(() => {
    if (typeof document !== 'undefined' && lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  return null;
}
