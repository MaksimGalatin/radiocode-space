/**
 * Шифрование серверным ключом — дословная копия `aifa.works/lib/encryption.ts`.
 *
 * ЗАЧЕМ ЗДЕСЬ. Общая база памяти (`chat_memory` в DATABASE_URL_VECTOR) хранит
 * реплики зашифрованными ЭТИМ ключом, одним на все сайты экосистемы. Чтобы
 * radiocode.space читал ту же память, что и остальные сайты, он обязан
 * расшифровывать её тем же способом — иначе вместо разговора вернётся столбик
 * base64, и это будет выглядеть не как ошибка настройки, а как «AIfa забыла».
 *
 * Не путать с `user-key.ts`: там личный ключ человека для его собственного
 * архива в кабинете. Здесь — серверный ключ общей базы памяти. Схемы разные,
 * и смешивать их нельзя.
 */

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// Строка, которой раньше «шифровали», если настоящего ключа не нашлось. Она
// лежит в открытом исходнике, то есть ключом не является: расшифровать таким
// может любой, кто видел этот файл. Оставлена ИСКЛЮЧИТЕЛЬНО для чтения того,
// что уже записано, — писать ею запрещено.
const LEGACY_SECRET = 'CODE-Eternal-Secret-Key-2026';

/** Ключи, которыми допустимо ЧИТАТЬ старые записи, но не создавать новые. */
function legacyKeys(): Buffer[] {
  return [crypto.createHash('sha256').update(LEGACY_SECRET).digest()];
}

// Получение мастер-ключа для шифрования
function getEncryptionKey(): Buffer {
  const secret = process.env.ARWEAVE_ENCRYPTION_SECRET;
  if (secret) {
    return crypto.createHash('sha256').update(secret).digest();
  }

  // На Vercel кошелёк живёт переменной окружения, а не файлом на диске.
  const walletEnv = process.env.ARWEAVE_WALLET_KEY;
  if (walletEnv && walletEnv.trim().length > 40) {
    return crypto.createHash('sha256').update(walletEnv.trim()).digest();
  }

  // Файл кошелька — путь для локальной работы. В сборке его нет.
  const fallbackPaths = [
    path.join(process.cwd(), 'data', 'arweave-wallet.json'),
    path.join('d:', 'Aifa', 'ХАКАТОН', 'ТОКЕНЫ и API', 'arweave-wallet.json'),
  ];
  for (const fp of fallbackPaths) {
    try {
      if (fs.existsSync(fp)) {
        const walletContent = fs.readFileSync(fp, 'utf8');
        return crypto.createHash('sha256').update(walletContent).digest();
      }
    } catch (e) {}
  }

  // ПАДАЕМ, А НЕ ШИФРУЕМ ИЗВЕСТНЫМ КЛЮЧОМ. Раньше здесь возвращался ключ,
  // выведенный из константы выше. Копии переписок уходят в Arweave, откуда
  // ничего нельзя изъять, — «зашифрованное» так становится общедоступным
  // навсегда. Громкий отказ чинится за минуту, тихая утечка не чинится вовсе.
  throw new Error(
    'encryption_key_missing: задайте ARWEAVE_ENCRYPTION_SECRET или ARWEAVE_WALLET_KEY — ' +
    'шифрование резервным ключом из исходников отключено'
  );
}

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const SALT_LENGTH = 16;
const TAG_LENGTH = 16;

/**
 * Зашифровывает строку текста с помощью алгоритма AES-256-GCM.
 * Возвращает строку в формате base64, содержащую соль, iv, тег аутентификации и шифротекст.
 */
export function encryptText(text: string, customKey?: string): string {
  const key = customKey
    ? crypto.createHash('sha256').update(customKey).digest()
    : getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(SALT_LENGTH);

  // Используем PBKDF2 для дополнительной защиты ключа с помощью соли
  const derivedKey = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');

  const cipher = crypto.createCipheriv(ALGORITHM, derivedKey, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  // Объединяем соль, iv, тег и зашифрованный текст в один буфер
  const combined = Buffer.concat([salt, iv, tag, encrypted]);
  return combined.toString('base64');
}

/**
 * Расшифровывает зашифрованный base64-текст.
 */
export function decryptText(encryptedBase64: string, customKey?: string): string {
  const combined = Buffer.from(encryptedBase64, 'base64');

  // Извлекаем компоненты из буфера
  const salt = combined.slice(0, SALT_LENGTH);
  const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const tag = combined.slice(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const encrypted = combined.slice(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);

  // Порядок ключей: свой (если передан) или настоящий, затем — прежние. Старые
  // записи сделаны слабым ключом из исходников; отказаться читать их значило бы
  // стереть человеку память за то, в чём виноваты мы. Писать ими уже нельзя.
  const candidates: Buffer[] = [];
  if (customKey) {
    candidates.push(crypto.createHash('sha256').update(customKey).digest());
  } else {
    try {
      candidates.push(getEncryptionKey());
    } catch (e) {
      // Настоящий ключ не настроен — остаются только прежние, для чтения.
    }
    candidates.push(...legacyKeys());
  }

  for (const key of candidates) {
    try {
      // Восстанавливаем производный ключ с помощью соли
      const derivedKey = crypto.pbkdf2Sync(key, salt, 100000, 32, 'sha256');

      const decipher = crypto.createDecipheriv(ALGORITHM, derivedKey, iv);
      decipher.setAuthTag(tag);

      const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
      return decrypted.toString('utf8');
    } catch (err) {
      // Тег аутентификации GCM не сошёлся — это не тот ключ. Пробуем следующий.
    }
  }

  console.error('[Encryption] Decryption failed: no key matched');
  throw new Error('Failed to decrypt data: invalid key or corrupted payload');
}
