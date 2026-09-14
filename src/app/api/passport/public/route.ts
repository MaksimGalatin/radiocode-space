import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/economy';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

/**
 * ПУБЛИЧНАЯ ВИТРИНА ЦИФРОВОГО ПАСПОРТА.
 *
 * ЗАЧЕМ ОНА ПОЯВИЛАСЬ. С 14.09.2026 личная часть паспорта уходит в Arweave
 * ЗАШИФРОВАННОЙ своим ключом — по прямому поручению Архитектора, чтобы
 * уничтожение одного ключа отзывало один паспорт и ничего больше. Публичная
 * страница читала `identity` прямо из цепи и после этой правки показала бы
 * шифротекст вместо человека.
 *
 * Витрина берёт то же содержимое из нашей базы по псевдониму — он лежит в
 * цепи открыто и написан на самом паспорте. Цепь при этом остаётся тем, чем
 * и была: доказательством существования и даты выпуска.
 *
 * ПОЧЕМУ БЕЗ ВХОДА. Паспорт — публичный документ, его показывают людям по
 * ссылке. Отдаются РОВНО те поля, что человек сам вынес на паспорт; почты
 * здесь нет и не будет — её убрали из вечной записи ещё раньше, и
 * возвращать её через витрину было бы тем же самым разглашением.
 *
 * ПОЧЕМУ ЕСТЬ ЛИМИТ. Открытый адрес, по которому можно перебирать
 * псевдонимы, — это способ собрать список наших людей. Тридцать обращений в
 * минуту хватает читателю и не хватает сборщику.
 */
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const адрес = clientIp(req as never);
  if (адрес !== 'unknown' && !(await dbRateLimit(`passport_public:${адрес}`, 30, 60_000))) {
    return NextResponse.json({ error: 'too_many' }, { status: 429 });
  }

  const username = (req.nextUrl.searchParams.get('username') || '').trim().slice(0, 64);
  if (!username) return NextResponse.json({ error: 'username_required' }, { status: 400 });

  const pool = await getPool();
  try {
    const r = await pool.query(
      `SELECT username, display_name, bio, manifesto, telegram, twitter, website,
              avatar_data_url, arweave_tx, minted_at
         FROM passports WHERE lower(username) = lower($1)`, [username]);
    const row = r.rows[0];
    if (!row) {
      // Паспорта нет или он отозван владельцем. Это не ошибка сервера:
      // отозванный паспорт обязан выглядеть именно как отсутствующий.
      return NextResponse.json({ found: false }, { status: 404 });
    }
    return NextResponse.json({
      found: true,
      identity: {
        username: row.username,
        displayName: row.display_name,
        bio: row.bio || '',
        manifesto: row.manifesto || '',
        telegram: row.telegram || '',
        twitter: row.twitter || '',
        website: row.website || '',
        avatarDataUrl: row.avatar_data_url || '',
      },
      arweaveTx: row.arweave_tx || null,
      mintedAt: row.minted_at || null,
    });
  } finally {
    await pool.end();
  }
}
