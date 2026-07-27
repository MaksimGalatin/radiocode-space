/**
 * Единый модуль никнеймов CODE Eternal.
 * ОДИНАКОВЫЙ файл в трёх репозиториях:
 *   ce      → web/src/lib/nickname.ts
 *   central → src/lib/nickname.ts
 *   works   → lib/nickname.ts
 * Правила: латиница/цифры/подчёркивание, 3–20 символов, lowercase-нормализация.
 * Запрещённые слова проверяются ПОДСТРОКОЙ после leet-фолдинга
 * (0→o, 1→i, 3→e, 4→a, 5→s, 7→t, @→a, $→s, "_" убирается).
 * Глобальная уникальность — уникальный индекс users_nickname_unique
 * на users_auth (LOWER(nickname)) в общей Neon-БД.
 */

export const NICKNAME_MIN = 3;
export const NICKNAME_MAX = 20;

/** Обсценная лексика EN + RU-транслит: матчится подстрокой. */
export const BANNED: string[] = [
  // EN
  'fuck', 'shit', 'cunt', 'bitch', 'nigger', 'nigga', 'faggot', 'whore',
  'slut', 'dick', 'cock', 'pussy', 'porn', 'hitler', 'nazi',
  // RU-транслит
  'blyad', 'blyat', 'suka', 'pizda', 'hui', 'xui', 'xyi',
  'ebat', 'ebal', 'yebat', 'mudak', 'gandon', 'shluha', 'dolboeb',
  'pidor', 'pidr', 'zaeb', 'mraz', 'ubludok', 'chmo',
];

/** Зарезервированные имена: матчится ЦЕЛИКОМ (после нормализации). */
export const RESERVED: string[] = [
  'admin', 'root', 'aifa', 'code_official', 'support', 'moderator',
];

/** Нормализация для хранения и сравнения: trim + lowercase. */
export function normalizeNickname(raw: string): string {
  return (raw || '').trim().toLowerCase();
}

/** Leet-фолдинг для поиска запрещённых слов. */
export function foldLeet(s: string): string {
  return s
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/@/g, 'a')
    .replace(/\$/g, 's')
    .replace(/_/g, '');
}

export type NickCheck =
  | { ok: true; nickname: string }
  | { ok: false; reason: 'format' | 'banned' };

/**
 * Полная валидация: формат (a-z, 0-9, _, 3–20) + резерв + запрещённые слова.
 * Возвращает нормализованный (lowercase) никнейм при успехе.
 */
export function validateNickname(raw: string): NickCheck {
  const nick = normalizeNickname(raw);
  if (!/^[a-z0-9_]{3,20}$/.test(nick)) return { ok: false, reason: 'format' };
  if (RESERVED.includes(nick)) return { ok: false, reason: 'banned' };
  const folded = foldLeet(nick);
  for (const bad of BANNED) {
    if (folded.includes(bad)) return { ok: false, reason: 'banned' };
  }
  return { ok: true, nickname: nick };
}

/** Локализованные сообщения об ошибках (ru/en/es/zh). */
export function nicknameErrorMessage(
  reason: 'format' | 'banned' | 'taken',
  locale: string = 'en'
): string {
  const L = locale === 'ru' || locale === 'es' || locale === 'zh' ? locale : 'en';
  const M: Record<'format' | 'banned' | 'taken', Record<string, string>> = {
    format: {
      ru: 'Недопустимый никнейм: латиница, цифры и _, 3–20 символов',
      en: 'Invalid nickname: Latin letters, digits and _, 3–20 characters',
      es: 'Apodo no válido: letras latinas, dígitos y _, 3–20 caracteres',
      zh: '昵称无效：仅限拉丁字母、数字和 _，3–20 个字符',
    },
    banned: {
      ru: 'Недопустимый никнейм',
      en: 'This nickname is not allowed',
      es: 'Este apodo no está permitido',
      zh: '此昵称不可用',
    },
    taken: {
      ru: 'Никнейм занят',
      en: 'Nickname already taken',
      es: 'El apodo ya está ocupado',
      zh: '昵称已被占用',
    },
  };
  return M[reason][L];
}
