import { NextRequest, NextResponse } from 'next/server';
import { getSessionEmail, сессияДействительна } from '@/lib/user-auth';
import { getUserKeyB64 } from '@/lib/user-key';
import { маскаПочты } from '@/lib/log-privacy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

/**
 * Выдача человеку ЕГО СОБСТВЕННОГО ключа памяти.
 *
 * ЗАЧЕМ ЭТА РУЧКА ВООБЩЕ ЕСТЬ. Решение Архитектора от 08.08.2026: каждый шифрует
 * своим ключом, «сам потерял — сам виноват». Слова «сам виноват» имеют смысл
 * только тогда, когда у человека БЫЛА возможность взять ключ себе. Пока ключ
 * лежит исключительно у нас, потеря — наша вина, а не его: исчезнет сервис,
 * сгорит база `user_keys` или уедет MEMORY_MASTER_KEY — и записи в Arweave
 * останутся вечными, но нечитаемыми навсегда. Отдать ключ владельцу — это не
 * удобство, это единственный способ, при котором вечная память переживёт нас.
 *
 * ПОЧЕМУ ОТДАЁМ ТОЛЬКО ПО ЗАПРОСУ И ТОЛЬКО СЮДА. Ключ не уходит письмом, не
 * пишется в журнал, не кладётся в куку и не попадает ни в какой кэш: письмо
 * оседает на чужих серверах, журнал уезжает к хостеру, кэш живёт у посредников.
 * Единственный канал — ответ на живой запрос вошедшего хозяина.
 *
 * ПОЧЕМУ ВМЕСТЕ С КЛЮЧОМ ИДЁТ ОПИСАНИЕ ФОРМАТА. 32 байта сами по себе — мусор.
 * Расшифровать архив можно, только зная схему конверта и вывод ключа; если мы
 * этого не скажем, «свой ключ» останется красивой строкой без применения. Схема
 * ниже описывает ровно то, что делает aeadEncrypt в lib/user-key.ts.
 */
export async function GET(req: NextRequest) {
  // Тот же ограничитель, что у соседней ручки account/pin на этом сайте
  // (in-memory allowRequest), и тот же порядок цифр. Свой ключ человек берёт раз
  // в жизни, так что низкий порог не мешает никому законному, зато ограничивает
  // ущерб от угнанной сессии: выкачать ключ тысячей запросов не выйдет.
  // Счёт ведётся в базе, а не в памяти процесса: счётчик в памяти
  // обнуляется при каждой выкладке и у каждого экземпляра свой,
  // поэтому заявленный предел на деле мягче объявленного.
  const адрес_account_memory_key = clientIp(req as never);
  if (адрес_account_memory_key !== 'unknown' && !(await dbRateLimit(`account_memory_key:${адрес_account_memory_key}`, 10, 900000))) {
    return NextResponse.json({ error: 'Слишком много запросов. Подождите немного.' }, { status: 429 });
  }

  // Гейт по httpOnly-куке входа — так же, как в соседних ручках этого сайта
  // (account/pin, account/nickname). Асинхронной проверки отзыва сессии на этом
  // сайте пока нет ни у одной ручки; заводить её только здесь смысла нет —
  // отозванный токен всё равно откроет соседние разделы кабинета.
  const email = await сессияДействительна(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let key: string;
  try {
    key = await getUserKeyB64(email);
  } catch (e) {
    // Ключ не достали (нет MEMORY_MASTER_KEY, недоступна БД, отказал KMS).
    // Отдаём отказ, а не заглушку: показать человеку «ключ», которым ничего не
    // расшифровывается, хуже, чем честно сказать, что сейчас не получилось.
    console.error('[account/memory-key] ключ недоступен для', маскаПочты(email), e);
    return NextResponse.json({ error: 'key_unavailable' }, { status: 503 });
  }

  // В журнал — только факт выдачи и маска адреса. Сам ключ в журнале означал бы,
  // что он уехал к хостеру и остался там на недели: журнал переживёт сессию.
  console.info('[account/memory-key] ключ выдан владельцу', маскаПочты(email));

  return NextResponse.json(
    {
      ok: true,
      key,
      keyBytes: 32,
      algorithm: 'AES-256-GCM',
      kdf: 'PBKDF2-HMAC-SHA256, 100000 iterations, 32-byte derived key, per-record salt',
      envelope: 'base64( salt[16] | iv[12] | tag[16] | ciphertext )',
      note:
        'This is your personal memory key. Records encrypted with it are stored on Arweave forever and cannot be rewritten or deleted. Keep your own copy: without this key nobody — including us — can decrypt them.',
    },
    {
      // Ответ несёт секрет: ни браузер, ни промежуточные узлы не должны
      // сохранить его на диск и отдать следующему, кто сядет за этот компьютер.
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
      },
    }
  );
}
