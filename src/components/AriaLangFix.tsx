'use client';

/**
 * ПЕРЕВОД ПОДПИСЕЙ ДЛЯ ЭКРАННОГО ДИКТОРА. Создано 30.09.2026.
 *
 * Переводит aria-label, alt, title и placeholder на язык страницы (<html lang>) по словарю
 * `@/lib/aria-i18n`. Работает после загрузки, поэтому гидратацию не задевает, и следит за
 * изменениями страницы: новые узлы, смена подписи, смена языка без перезагрузки.
 *
 * Исходная строка каждого атрибута запоминается: при смене языка перевод строится от неё,
 * а не от уже переведённой. Свою же запись отличаем от записи React по значению.
 *
 * Файл один и тот же на четырёх сайтах. Ничего не отображает (возвращает null).
 */
import { useEffect } from 'react';
import { перевестиПодпись } from '@/lib/aria-i18n';

const АТРИБУТЫ = ['aria-label', 'alt', 'title', 'placeholder'];

export default function AriaLangFix() {
  useEffect(() => {
    const память = new WeakMap<Element, Map<string, { источник: string; выставлено: string }>>();
    let язык = document.documentElement.lang || 'en';

    const перевести = (эл: Element, имя: string) => {
      const сейчас = эл.getAttribute(имя);
      if (сейчас === null) return;
      let карта = память.get(эл);
      if (!карта) {
        карта = new Map();
        память.set(эл, карта);
      }
      const было = карта.get(имя);
      // значение поменял не я (React, скрипт страницы) — это новый источник
      const источник = было && было.выставлено === сейчас ? было.источник : сейчас;
      const перевод = перевестиПодпись(источник, язык);
      карта.set(имя, { источник, выставлено: перевод });
      if (перевод !== сейчас) эл.setAttribute(имя, перевод);
    };

    const пройти = (корень: ParentNode) => {
      for (const имя of АТРИБУТЫ) {
        корень.querySelectorAll(`[${имя}]`).forEach((эл) => перевести(эл, имя));
      }
    };

    пройти(document);

    const наблюдатель = new MutationObserver((записи) => {
      for (const з of записи) {
        if (з.type === 'attributes' && з.target === document.documentElement && з.attributeName === 'lang') {
          const новый = document.documentElement.lang || 'en';
          if (новый !== язык) {
            язык = новый;
            пройти(document);
          }
          continue;
        }
        if (з.type === 'attributes' && з.target instanceof Element && з.attributeName) {
          перевести(з.target, з.attributeName);
          continue;
        }
        з.addedNodes.forEach((узел) => {
          if (!(узел instanceof Element)) return;
          for (const имя of АТРИБУТЫ) if (узел.hasAttribute(имя)) перевести(узел, имя);
          пройти(узел);
        });
      }
    });
    наблюдатель.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [...АТРИБУТЫ, 'lang'],
    });
    return () => наблюдатель.disconnect();
  }, []);

  return null;
}
