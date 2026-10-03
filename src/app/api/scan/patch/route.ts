import { NextRequest, NextResponse } from 'next/server';
import { getScanById } from '../../../../lib/oracle-scans';
import { generateAIfaFocusPatch, sanitizeDomainForComment } from '../../../../lib/aifafocus-patch';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
    !allowRequest(req, 'scan-patch', 60, 60_000) ||
    !(await общийЛимитЗапроса(req, 'scan-patch', 60, 60_000))
  ) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429, headers: CORS_HEADERS });
  }

  const id = (req.nextUrl.searchParams.get('id') || '').trim();
  const type = (req.nextUrl.searchParams.get('type') || 'bundle').toLowerCase();
  const locale = (req.nextUrl.searchParams.get('locale') || 'en').toLowerCase();

  let domain = 'example.com';
  let threats: any[] = [];
  let scanLocale = locale;

  if (id) {
    const scan = await getScanById(id);
    if (scan) {
      domain = scan.domain;
      scanLocale = scan.locale || locale;
      const payload = scan.payload as any;
      threats = payload?.allThreats || [];
    }
  }

  const safeDomain = sanitizeDomainForComment(domain);

  const patch = generateAIfaFocusPatch({
    domain: safeDomain,
    locale: scanLocale,
    threats,
  });

  if (type === 'css') {
    return new NextResponse(patch.css, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'text/css; charset=utf-8',
        'Content-Disposition': `attachment; filename="aifafocus-patch-${safeDomain}.css"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  if (type === 'js') {
    return new NextResponse(patch.js, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/javascript; charset=utf-8',
        'Content-Disposition': `attachment; filename="aifafocus-patch-${safeDomain}.js"`,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  return NextResponse.json(
    {
      success: true,
      domain,
      locale: scanLocale,
      patch,
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  // 03.10.2026: у GET выше ограничение частоты было, у POST — нет. Тело с тысячами
  // «находок» гоняло генератор патча на нашей функции сколько угодно раз за наш счёт.
  const { allowRequest } = await import('../../../../lib/rate-limit');
  const { общийЛимитЗапроса } = await import('../../../../lib/rate-limit-db');
  if (
    !allowRequest(req, 'scan-patch-post', 30, 60_000) ||
    !(await общийЛимитЗапроса(req, 'scan-patch-post', 30, 60_000))
  ) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429, headers: CORS_HEADERS });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const { domain = 'example.com', locale = 'en', threats = [] } = body;

    const patch = generateAIfaFocusPatch({
      domain,
      locale,
      threats,
    });

    return NextResponse.json(
      {
        success: true,
        domain,
        locale,
        patch,
      },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: 'INVALID_REQUEST', details: err?.message || 'Unknown error' },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}
