import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

/**
 * Публичная проба здоровья: доступность базы и наличие настроенного KMS.
 * По ней внешний монитор (UptimeRobot) отличает «сайт отвечает» от «сайт жив».
 * Страница может отдавать 200 и выглядеть нормально, когда база уже отвалилась
 * — тогда логин и кабинет не работают, а обычный HTTP-монитор молчит.
 * Ключевое слово для монитора: "db":true,"kms":true
 */
export async function GET() {
  const out: { ok: boolean; ts: string; db: boolean; kms: boolean } = {
    ok: true,
    ts: new Date().toISOString(),
    db: false,
    kms: !!process.env.KMS_PROVIDER,
  };
  const url = process.env.SUBMISSIONS_DB_URL;
  if (url) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(url);
      await sql`SELECT 1`;
      out.db = true;
    } catch {
      out.ok = false;
      out.db = false;
    }
  }
  return NextResponse.json(out, { status: out.ok ? 200 : 503 });
}
