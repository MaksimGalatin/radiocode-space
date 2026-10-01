import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, adminDenied } from '@/lib/admin-guard';
import { readErrorLog } from '@/lib/error-log';

export const dynamic = 'force-dynamic';

/**
 * Журнал серверных ошибок для админки: что падало, где и когда.
 * Раньше об этом можно было узнать только из письма или из логов Vercel,
 * где нет ни истории по сайтам, ни картины «что происходит прямо сейчас».
 */
export async function GET(req: NextRequest) {
  const admin = requireAdmin(req);
  if (!admin) return adminDenied();

  const limit = Number(req.nextUrl.searchParams.get('limit') || 100);
  const rows = await readErrorLog(Number.isFinite(limit) ? limit : 100);

  // Сводка по «отпечаткам»: одинаковые сбои схлопываются, чтобы сразу было
  // видно, что повторяется чаще всего, а не только последнюю запись.
  const bySite = new Map<string, number>();
  const byMessage = new Map<string, number>();
  for (const r of rows) {
    bySite.set(r.site, (bySite.get(r.site) || 0) + 1);
    byMessage.set(r.message, (byMessage.get(r.message) || 0) + 1);
  }

  return NextResponse.json({
    total: rows.length,
    bySite: [...bySite.entries()].map(([site, count]) => ({ site, count })).sort((a, b) => b.count - a.count),
    top: [...byMessage.entries()].map(([message, count]) => ({ message, count }))
      .sort((a, b) => b.count - a.count).slice(0, 15),
    rows,
  });
}
