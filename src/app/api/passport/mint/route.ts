import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { Readable } from 'stream';
import { getSessionEmail } from '@/lib/user-auth';
import { getPool } from '@/lib/economy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/**
 * Mint the eternal passport to Arweave (permanent on-chain identity).
 * - Idempotent: if arweave_tx already exists, returns it (never mints twice).
 * - The Arweave wallet key lives ONLY in env (ARWEAVE_WALLET_JSON), server-side.
 * - Upload via @ardrive/turbo-sdk (uploads under 100 KiB are free on Turbo).
 *
 * 🔴 ЗДЕСЬ ЖИВЁТ ВЕСЬ КРИПТОСТЕК ПРОЕКТА — И ПОЧЕМУ ЭТО ТЕРПИМО.
 *
 * `@ardrive/turbo-sdk` тянет за собой Solana и Ethereum целиком, и на неё
 * приходится ОДИННАДЦАТЬ из тринадцати тяжёлых предупреждений проверки
 * зависимостей: `elliptic`, `secp256k1`, `@ethersproject/*`, `@solana/*`,
 * `arbundles`, `ws`, `undici`, `axios`, `bigint-buffer`. Убрать библиотеку
 * нельзя — без неё паспорт не уедет в вечную память.
 *
 * Разобрано 05.08.2026 по существу, а не по числу находок:
 *
 *   • ДО БРАУЗЕРА НИЧЕГО ИЗ ЭТОГО НЕ ДОХОДИТ. Измерено на живом сайте: просмотрен
 *     мегабайт собранных скриптов во всех одиннадцати файлах страницы — ни одного
 *     упоминания `elliptic`, `secp256k1`, `ethersproject`, `@solana/`,
 *     `arbundles`, `turbo-sdk`, `bigint-buffer`. Библиотека грузится динамическим
 *     импортом ниже, то есть только на сервере и только в этой ручке.
 *
 *   • ПУТЬ ЗАКРЫТ ВХОДОМ И ПРЕДЕЛОМ, И ИМЕННО В ТАКОМ ПОРЯДКЕ: без сессии — 401,
 *     дальше не более трёх выпусков за десять минут, и лишь потом импорт.
 *
 *   • УЯЗВИМЫЕ ВЕТКИ НЕ НА НАШЕМ ПУТИ. `elliptic` и `secp256k1` опасны при
 *     подписи ECDSA; мы подписываем ключом Arweave, а это RSA. Код ECDSA здесь
 *     обслуживает способы оплаты (Ethereum, Solana), которыми мы не пользуемся:
 *     заливаем своим ключом, бесплатно до 100 КБ.
 *
 *   • ЧТО ОСТАЁТСЯ ЧЕСТНЫМ РИСКОМ. Предупреждения `axios` и `undici` касаются
 *     разбора ОТВЕТА. Теоретически их мог бы задействовать сам сервис Turbo,
 *     если бы его подменили. Это уже не наша зависимость, а чужая служба, и
 *     защита от этого одна — следить за обновлениями библиотеки.
 *
 * ⚠️ ЧТО ОТМЕНЯЕТ ЭТОТ ВЫВОД: любой импорт `@ardrive/turbo-sdk` (или его
 * зависимостей) вне серверной ручки, а также подключение оплаты через Ethereum
 * или Solana. Тогда разбор надо делать заново.
 */
export async function POST(req: NextRequest) {
  const email = getSessionEmail(req);
  if (!email) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  // Счёт в базе: счётчик в памяти обнуляется при каждой выкладке и
  // у каждого экземпляра свой.
  const адрес_mint = clientIp(req as never);
  if (адрес_mint !== 'unknown' && !(await dbRateLimit(`mint:${адрес_mint}`, 3, 600000))) return NextResponse.json({ error: 'rate_limited' }, { status: 429 });

  // 🔴 ИМЯ ПЕРЕМЕННОЙ КОШЕЛЬКА РАЗЪЕХАЛОСЬ ПО САЙТАМ. СВЕДЕНО 11.08.2026.
  //
  // Замер по боевым проектам (перечислены ИМЕНА, значения не запрашивались):
  //   codeofdigitaleternity.com — ARWEAVE_WALLET_KEY
  //   code-eternal              — ARWEAVE_WALLET_JSON
  //   radiocode-space           — ARWEAVE_WALLET_JSON
  //   aifa.works                — НИ ОДНОЙ ИЗ ДВУХ
  //
  // Правку от 08.08 внесли только на центральный сайт, и три остальных читали
  // одно имя. Теперь все четыре принимают оба — расхождение имён больше не
  // решает, уедет паспорт в вечность или нет.
  //
  // Это НЕ запасной ключ из исходников: обе ветки читают окружение, и если
  // пусто в обеих — ручка отвечает 503 not_configured, как и раньше.
  const walletJson = process.env.ARWEAVE_WALLET_KEY || process.env.ARWEAVE_WALLET_JSON || '';
  try {
    const pool = await getPool();
    const p = await pool.query(`SELECT * FROM passports WHERE email=$1`, [email]);
    const row = p.rows[0];
    if (!row) { await pool.end(); return NextResponse.json({ error: 'no_passport' }, { status: 400 }); }
    if (row.arweave_tx) {
      await pool.end();
      return NextResponse.json({ ok: true, already: true, arweaveUrl: `https://arweave.net/${row.arweave_tx}` });
    }
    if (!walletJson) { await pool.end(); return NextResponse.json({ error: 'not_configured' }, { status: 503 }); }

    const t = await pool.query(`SELECT tier FROM user_tiers WHERE email=$1`, [email]);

    /**
     * ВЕЧНАЯ ЗАПИСЬ — ТОЛЬКО С ПЛАТНОГО ТАРИФА (16.08.2026).
     *
     * Тариф раньше лишь ВПИСЫВАЛСЯ в документ паспорта, но ничего не решал:
     * залить паспорт в Arweave мог кто угодно. Замер по боевой базе 16.08.2026:
     * из пяти паспортов четыре в цепи, и ОДИН из них принадлежит человеку на
     * бесплатном тарифе. Запись в Arweave необратима и стоит денег кошелька —
     * значит бесплатный тариф оплачивал бы себе вечность за наш счёт.
     *
     * Порог: тариф 1 и выше (Spark и старше). Ответ 402 — «нужна оплата», а не
     * «отказано»: человеку понятно, что делать.
     */
    const уровень = t.rows[0] ? Number(t.rows[0].tier) : 0;
    if (!(уровень >= 1)) {
      await pool.end();
      return NextResponse.json({
        error: 'paid_tier_required',
        сообщение: 'Вечная запись паспорта в блокчейн доступна с платного тарифа (Spark и выше).',
        tier: уровень,
      }, { status: 402 });
    }
    const doc = {
      protocol: 'CODE-ETERNAL-PASSPORT',
      version: 1,
      issuedAt: new Date().toISOString(),
      site: 'https://www.aifa.digital',
      identity: {
        username: row.username,
        displayName: row.display_name,
        bio: row.bio || '',
        manifesto: row.manifesto || '',
        telegram: row.telegram || '',
        twitter: row.twitter || '',
        website: row.website || '',
        avatarDataUrl: row.avatar_data_url || '',
        tier: t.rows[0] ? Number(t.rows[0].tier) : 0,
      },
      // 🔴 ПОЧТА БОЛЬШЕ НЕ УЧАСТВУЕТ В ВЕЧНОЙ ЗАПИСИ.
      //
      // Здесь стоял sha256 от адреса почты. Отпечаток называли односторонним, и
      // по механизму это верно — но адреса низкоэнтропийны: имея список
      // кандидатов, хеш подбирается перебором за копейки. А запись в Arweave
      // вечная и неотзывная, то есть связь с человеком сохранялась бы навсегда.
      // Юридически это псевдонимизация, а не обезличивание.
      //
      // Теперь тот же отпечаток считается от ПСЕВДОНИМА, который и так
      // публикуется на паспорте. В цепь не попадает ничего, чего там ещё нет, а
      // номер паспорта CE-XXXXXXXX и узор-идентикон, выводимые из этого поля,
      // остаются стабильными. Соль не нужна: солят то, что скрывают, а здесь
      // скрывать уже нечего.
      subject: crypto.createHash('sha256')
        .update('CODE-ETERNAL-PASSPORT:' + String(row.username))
        .digest('hex'),
    };
    const data = Buffer.from(JSON.stringify(doc, null, 2), 'utf8');

    const { TurboFactory } = await import('@ardrive/turbo-sdk');
    const jwk = JSON.parse(walletJson);
    const turbo = TurboFactory.authenticated({ privateKey: jwk });
    const result = await turbo.uploadFile({
      fileStreamFactory: () => Readable.from(data),
      fileSizeFactory: () => data.length,
      dataItemOpts: {
        tags: [
          { name: 'Content-Type', value: 'application/json' },
          { name: 'App-Name', value: 'CODE-Eternal' },
          { name: 'Type', value: 'eternal-passport' },
          { name: 'Username', value: String(row.username) },
        ],
      },
    });
    const txId = result.id;
    await pool.query(`UPDATE passports SET arweave_tx=$2, minted_at=now(), updated_at=now() WHERE email=$1 AND arweave_tx IS NULL`, [email, txId]);
    await pool.end();
    return NextResponse.json({ ok: true, arweaveUrl: `https://arweave.net/${txId}`, txId });
  } catch (e) {
    console.error('[passport/mint]', e);
    return NextResponse.json({ error: 'mint_failed' }, { status: 502 });
  }
}
