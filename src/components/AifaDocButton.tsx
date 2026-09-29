'use client';

/**
 * СКРЕПКА ДЛЯ ДОКУМЕНТОВ В ЧАТЕ AIfa — 29.09.2026. Один файл на все 4 сайта, байт в байт.
 *
 * Слово Архитектора: «добавь в меню Айфы — рядом с микрофоном и динамиком — скрепку для загрузки
 * текста, картинок и PDF, чтобы она распознавала и читала их»; «кнопку везде добавь, для загрузки
 * документа. Поставь ограничение по типу файла и его размеру».
 *
 * Как работает: файл уходит на /api/documents этого же сайта (спутники пересылают в центр), там
 * проверяется, распознаётся и сохраняется в учётной записи человека. Чат получает номер документа
 * и отправляет его вместе с сообщением — центр сам подставляет AIfa текст файла.
 * Пределы проверяются дважды: здесь — чтобы не гнать лишнее по сети, и на сервере — по-настоящему.
 */
import { useRef, useState } from 'react';
import { Paperclip, Loader2, X, FileText } from 'lucide-react';

export type ПриложенныйДокумент = { id: string; name: string; chars: number; kind: string };
type Язык = 'ru' | 'en' | 'es' | 'zh';

export const ПРИНИМАЕМ_ФАЙЛЫ = '.txt,.md,.csv,.pdf,.png,.jpg,.jpeg,.webp';
const МАКС_БАЙТ = 4 * 1024 * 1024;

const Т: Record<string, Record<Язык, string>> = {
  прикрепить: {
    ru: 'Приложить документ: текст, PDF или картинку до 4 МБ',
    en: 'Attach a document: text, PDF or image up to 4 MB',
    es: 'Adjuntar un documento: texto, PDF o imagen de hasta 4 MB',
    zh: '添加文档：文本、PDF 或图片，最大 4 MB',
  },
  читаю: {
    ru: 'Читаю документ…',
    en: 'Reading the document…',
    es: 'Leyendo el documento…',
    zh: '正在读取文档…',
  },
  большой: {
    ru: 'Файл больше 4 МБ — такой я принять не могу. Раздели его или сожми.',
    en: 'The file is larger than 4 MB. Please split or compress it.',
    es: 'El archivo supera los 4 MB. Divídelo o comprímelo.',
    zh: '文件超过 4 MB，请拆分或压缩。',
  },
  тип: {
    ru: 'Такой файл я не читаю. Подходят: .txt, .md, .csv, .pdf, .png, .jpg, .webp.',
    en: 'I cannot read this file. Supported: .txt, .md, .csv, .pdf, .png, .jpg, .webp.',
    es: 'No puedo leer este archivo. Admitidos: .txt, .md, .csv, .pdf, .png, .jpg, .webp.',
    zh: '无法读取此文件。支持：.txt、.md、.csv、.pdf、.png、.jpg、.webp。',
  },
  ошибка: {
    ru: 'Документ не загрузился — попробуй ещё раз через минуту.',
    en: 'The document did not upload — please try again in a minute.',
    es: 'El documento no se subió; inténtalo de nuevo en un minuto.',
    zh: '文档上传失败，请一分钟后重试。',
  },
  готово: {
    ru: 'Документ прочитан. Задай вопрос о нём — или просто отправь сообщение.',
    en: 'Document read. Ask about it — or just send your message.',
    es: 'Documento leído. Pregunta sobre él o simplemente envía tu mensaje.',
    zh: '文档已读取。可以就它提问，或直接发送消息。',
  },
  безОригинала: {
    ru: 'Документ прочитан. Оригинал файла пока не сохранён: хранилище подключается.',
    en: 'Document read. The original file is not stored yet: storage is being connected.',
    es: 'Documento leído. El archivo original aún no se guarda: el almacenamiento se está conectando.',
    zh: '文档已读取。原始文件暂未保存：存储正在接入中。',
  },
  убрать: { ru: 'Убрать документ', en: 'Remove document', es: 'Quitar documento', zh: '移除文档' },
  подсказка: {
    ru: 'Прочитай приложенный документ и расскажи коротко, о чём он.',
    en: 'Read the attached document and briefly tell me what it is about.',
    es: 'Lee el documento adjunto y dime brevemente de qué trata.',
    zh: '请阅读附带的文档，并简要告诉我它的内容。',
  },
};

function язык(x: unknown): Язык {
  return x === 'en' || x === 'es' || x === 'zh' ? x : 'ru';
}

/** Текст сообщения по умолчанию, если человек приложил файл и ничего не написал. */
export function подсказкаКДокументу(lang: unknown): string {
  return Т.подсказка[язык(lang)];
}

export function AifaDocButton({
  lang,
  disabled,
  onAttached,
  onMessage,
  className,
}: {
  lang: unknown;
  disabled?: boolean;
  onAttached: (документ: ПриложенныйДокумент) => void;
  onMessage?: (текст: string) => void;
  className?: string;
}) {
  const l = язык(lang);
  const поле = useRef<HTMLInputElement>(null);
  const [занята, setЗанята] = useState(false);

  async function загрузить(файл: File) {
    const расширение = (файл.name.split('.').pop() || '').toLowerCase();
    if (!ПРИНИМАЕМ_ФАЙЛЫ.split(',').includes('.' + расширение)) { onMessage?.(Т.тип[l]); return; }
    if (файл.size > МАКС_БАЙТ) { onMessage?.(Т.большой[l]); return; }
    setЗанята(true);
    onMessage?.(Т.читаю[l]);
    try {
      const форма = new FormData();
      форма.append('file', файл);
      форма.append('locale', l);
      const ответ = await fetch(`/api/documents?locale=${l}`, { method: 'POST', body: форма, credentials: 'include' });
      const данные = await ответ.json().catch(() => ({} as Record<string, unknown>));
      const д = (данные as { document?: ПриложенныйДокумент }).document;
      if (ответ.ok && (данные as { success?: boolean }).success && д) {
        onAttached({ id: д.id, name: д.name, chars: д.chars, kind: д.kind });
        onMessage?.((данные as { warning?: string }).warning ? Т.безОригинала[l] : Т.готово[l]);
      } else {
        onMessage?.(String((данные as { userMessage?: string }).userMessage || Т.ошибка[l]));
      }
    } catch {
      onMessage?.(Т.ошибка[l]);
    } finally {
      setЗанята(false);
      if (поле.current) поле.current.value = '';
    }
  }

  return (
    <>
      <input
        ref={поле}
        type="file"
        accept={ПРИНИМАЕМ_ФАЙЛЫ}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) void загрузить(f); }}
      />
      <button
        type="button"
        aria-label={Т.прикрепить[l]}
        title={Т.прикрепить[l]}
        disabled={disabled || занята}
        onClick={() => поле.current?.click()}
        className={className ?? 'px-3 py-2 sm:py-3 rounded-xl border border-border text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-400/30 transition-all shrink-0 disabled:opacity-50'}
      >
        {занята ? <Loader2 size={18} className="animate-spin" /> : <Paperclip size={18} />}
      </button>
    </>
  );
}

/** Плашки приложенных документов и строка состояния над полем ввода. */
export function AifaDocChips({
  docs,
  lang,
  message,
  onRemove,
  dark,
}: {
  docs: ПриложенныйДокумент[];
  lang: unknown;
  message?: string;
  onRemove: (id: string) => void;
  /** Виджет всегда на тёмном фоне, в любой теме сайта: светлый текст, чтобы плашка читалась. */
  dark?: boolean;
}) {
  const l = язык(lang);
  if (!docs.length && !message) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 px-2 pt-2 text-xs">
      {docs.map((д) => (
        <span key={д.id} className={`inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 ${dark ? 'text-cyan-200' : 'text-cyan-800 dark:text-cyan-200'}`}>
          <FileText size={14} aria-hidden="true" />
          <span className="max-w-[200px] truncate">{д.name}</span>
          <button type="button" aria-label={`${Т.убрать[l]}: ${д.name}`} onClick={() => onRemove(д.id)} className="rounded p-0.5 hover:bg-cyan-500/20">
            <X size={12} />
          </button>
        </span>
      ))}
      {message && <span role="status" aria-live="polite" className={dark ? 'text-gray-300' : 'text-muted-foreground'}>{message}</span>}
    </div>
  );
}
