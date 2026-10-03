import { NextRequest, NextResponse } from 'next/server';
import { getScanById, findPreviousScan } from '../../../../lib/oracle-scans';
import { generateFixpack, type FixpackComparison } from '../../../../lib/aifafocus-fixpack';

export const dynamic = 'force-dynamic';

// Экранирование для вставки пользовательского ввода в HTML (02.10.2026).
// Было: ${id} из ?id= подставлялся в 404-страницу (Content-Type: text/html)
// без экранирования — отражённый XSS: ссылка вида ?id=<script>…</script>
// выполняла чужой скрипт в браузере жертвы на нашем домене.
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: NextRequest) {
  const { allowRequest } = await import('../../../../lib/rate-limit');
  const { общийЛимитЗапроса } = await import('../../../../lib/rate-limit-db');
  if (
    !allowRequest(req, 'scan-fixpack', 60, 60_000) ||
    !(await общийЛимитЗапроса(req, 'scan-fixpack', 60, 60_000))
  ) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429, headers: CORS_HEADERS });
  }

  const id = (req.nextUrl.searchParams.get('id') || '').trim();
  const format = (req.nextUrl.searchParams.get('format') || '').toLowerCase();
  const acceptHeader = req.headers.get('accept') || '';
  const isJson = format === 'json' || acceptHeader.includes('application/json');

  if (!id) {
    if (isJson) {
      return NextResponse.json({ error: 'MISSING_SCAN_ID' }, { status: 400, headers: CORS_HEADERS });
    }
    return new NextResponse('<h1>400 — Missing Scan ID</h1><p>Please specify ?id=... in the URL.</p>', {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const scan = await getScanById(id);
  if (!scan) {
    if (isJson) {
      return NextResponse.json({ error: 'SCAN_NOT_FOUND', id }, { status: 404, headers: CORS_HEADERS });
    }
    return new NextResponse(
      `<!DOCTYPE html><html><body style="font-family:sans-serif;background:#030712;color:#fff;padding:40px;text-align:center;">
        <h2>404 — Проверка не найдена</h2>
        <p style="color:#9ca3af;">Запись с номером ${escapeHtml(id)} не зарегистрирована в реестре проверок.</p>
        <p><a href="/" style="color:#00E5FF;">Вернуться на главную</a></p>
      </body></html>`,
      { status: 404, headers: { ...CORS_HEADERS, 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const domain = scan.domain || 'example.com';
  let payload = scan.payload as any;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (e) {}
  }
  const rawLocale = (req.nextUrl.searchParams.get('locale') || scan.locale || 'en').toLowerCase();
  const locale = ['ru', 'en', 'es', 'zh'].includes(rawLocale) ? rawLocale : 'en';

  // Собираем доказанные находки из payload (поддержка глубокого аудита до 25 страниц)
  const allThreats: any[] = payload?.allThreats || payload?.findings || payload?.threats || [];
  // Охват страниц = строго страницы, проверенные в реальном аудите.
  // Никаких искусственных списков ссылок без проверки.
  let scannedPages: string[] = Array.isArray(payload?.scannedPages) && payload.scannedPages.length > 0
    ? payload.scannedPages
    : [];
  if (scannedPages.length === 0) {
    const pageUrls = Array.from(new Set(allThreats.map((t: any) => t.pageUrl || t.url || t.page).filter(Boolean)));
    scannedPages = pageUrls.length > 0 ? (pageUrls as string[]) : [domain || 'example.com'];
  }

  // Фильтруем доказанные находки (proven: true, id >= 900000 или с пометкой ДОКАЗАНО)
  const provenFindings = allThreats.filter((t: any) => {
    if (t.proven === true) return true;
    if (typeof t.id === 'number' && t.id >= 900000) return true;
    const ev = (t.evidence || '').toLowerCase();
    return ev.includes('доказано') || ev.includes('proven') || ev.includes('probado') || ev.includes('已验证');
  });

  // Если доказанных находок нет — пакет строится из недоказанных, но они ОБЯЗАНЫ быть
  // помечены как «предположение — требует подтверждения», как в отчёте.
  let targetFindings: any[] = [];
  if (provenFindings.length > 0) {
    targetFindings = provenFindings.map((t: any) => ({ ...t, isHypothesis: false }));
  } else {
    targetFindings = allThreats.slice(0, 50).map((t: any) => ({ ...t, isHypothesis: true }));
  }

  // ── Повторная проверка через 14 дней: сравнение с прошлой проверкой того же сайта ──
  let comparedToPrevious: FixpackComparison | null = null;
  try {
    const prev = await findPreviousScan(scan.domain, scan.createdAt, scan.id);
    if (prev) {
      let prevPayload: any = prev.payload;
      if (typeof prevPayload === 'string') {
        try {
          prevPayload = JSON.parse(prevPayload);
        } catch (e) {}
      }
      const prevThreats: any[] = prevPayload?.allThreats || prevPayload?.findings || prevPayload?.threats || [];
      const prevCodesMap = new Map<string, string>();
      prevThreats.forEach((t) => {
        if (t.code) prevCodesMap.set(t.code, t.title || t.code);
      });

      const nowCodesMap = new Map<string, string>();
      targetFindings.forEach((t) => {
        if (t.code) nowCodesMap.set(t.code, t.title || t.code);
      });

      const fixedCodes: Array<{ code: string; title: string }> = [];
      prevCodesMap.forEach((title, code) => {
        if (!nowCodesMap.has(code)) fixedCodes.push({ code, title });
      });

      const newCodes: Array<{ code: string; title: string }> = [];
      nowCodesMap.forEach((title, code) => {
        if (!prevCodesMap.has(code)) newCodes.push({ code, title });
      });

      const retainedCodes: Array<{ code: string; title: string }> = [];
      nowCodesMap.forEach((title, code) => {
        if (prevCodesMap.has(code)) retainedCodes.push({ code, title });
      });

      const prevTime = new Date(prev.createdAt).getTime();
      const currTime = new Date(scan.createdAt).getTime();
      const diffMs = Math.abs(currTime - prevTime);
      const daysAgo = Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)));

      comparedToPrevious = {
        previousScanId: prev.id,
        previousScanDate: prev.createdAt,
        daysAgo,
        fixedCodes,
        newCodes,
        retainedCodes,
      };
    }
  } catch (err) {
    console.error('[scan-fixpack] findPreviousScan comparison error:', err);
  }

  // ── Проверка права на получение полного пакета исправлений ($99) ──
  // Требование A2:
  // Без оплаты: возвращать ПРЕВЬЮ (первые 2 карточки полностью + список заголовков остальных + кнопка $99)
  // Полный пакет: только владельцу (tier >= 99), по cron (isCron) или по оплаченному service_orders (fix-pack, quick-audit, starter-fix+)
  const orderId = (req.nextUrl.searchParams.get('orderId') || req.nextUrl.searchParams.get('order') || '').trim();
  const authHeader = req.headers.get('authorization') || '';
  const cronSecret = process.env.CRON_SECRET || '';
  let isCron = false;
  if (cronSecret) {
    if (authHeader === `Bearer ${cronSecret}` || req.nextUrl.searchParams.get('cron') === cronSecret) {
      isCron = true;
    }
  }

  let userTier = -1;
  try {
    const { getFreshSessionEmail } = await import('../../../../lib/user-auth');
    const email = (await getFreshSessionEmail(req) || '').trim().toLowerCase();
    if (email) {
      const url = process.env.SUBMISSIONS_DB_URL || process.env.DATABASE_URL || process.env.DATABASE_URL_VECTOR;
      if (url) {
        const { neon } = await import('@neondatabase/serverless');
        const sql = neon(url);
        const rows = await sql`SELECT tier FROM user_tiers WHERE LOWER(email)=LOWER(${email})`;
        const t = Number((rows?.[0] as { tier?: unknown } | undefined)?.tier ?? 0);
        if (Number.isFinite(t)) userTier = t;
      }
    }
  } catch {}

  const { checkFixpackPermission } = await import('../../../../lib/service-orders');
  const fixpackAuth = await checkFixpackPermission({
    orderId,
    targetHost: domain,
    isCron,
    userTier,
  });

  const isPreview = !fixpackAuth.hasFullAccess;

  const fixpack = generateFixpack(targetFindings, domain, scan.id, locale, {
    scannedPages,
    comparedToPrevious,
    isPreview,
  });

  if (isJson) {
    return NextResponse.json(
      {
        success: true,
        summary: fixpack.summary,
        coverage: {
          scannedPagesCount: scannedPages.length,
          pages: scannedPages,
        },
        comparedToPrevious: fixpack.summary.comparedToPrevious || null,
        items: fixpack.items,
        isPreview: fixpack.summary.isPreview ?? isPreview,
        lockedCount: fixpack.summary.lockedCount ?? 0,
        lockedTitles: fixpack.summary.lockedTitles ?? [],
        ctaBuyPackUrl: '/accessibility',
      },
      { headers: CORS_HEADERS }
    );
  }

  return new NextResponse(fixpack.htmlView, {
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'text/html; charset=utf-8',
      // 03.10.2026: ответ зависит от входа и заказа — полный пакет или превью. С
      // «public, max-age=3600» CDN Vercel час отдавал бы по той же ссылке ЧУЖОЙ вариант:
      // полный платный пакет, открытый владельцем, — любому. Замер того же дня на
      // /api/badge: ответ функции с «public, max-age» кэшируется (MISS, затем HIT).
      'Cache-Control': fixpackAuth.hasFullAccess ? 'private, no-store' : 'private, max-age=300',
    },
  });
}
