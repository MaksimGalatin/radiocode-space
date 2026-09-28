import { NextRequest, NextResponse } from 'next/server';
import { getScanById } from '../../../../lib/oracle-scans';

export const dynamic = 'force-dynamic';

/**
 * Подтверждение отчёта по его номеру.
 *
 * Раньше страница «сертификата» верила адресной строке: `?domain=любой.com&
 * score=2000&issues=0` давало «A+, превосходное соответствие» с нашим брендом,
 * печатью и «хэшем квитанции». Подделать мог кто угодно за десять секунд, а
 * отвечали бы за это мы.
 *
 * Теперь сертификата без проверки не существует. Здесь отдаются только те
 * данные, которые сервер сохранил сам в момент реального скана.
 */
export async function GET(req: NextRequest) {
  const headers = { 'Access-Control-Allow-Origin': '*' };

  // Ограничение частоты. Роут открытый: без него по нему можно было бы
  // перебирать номера проверок и заодно нагружать базу. Шестьдесят обращений
  // в минуту с адреса — с запасом для живого человека, который открыл
  // сертификат и обновил страницу пару раз.
  const { allowRequest } = await import('../../../../lib/rate-limit');
const { общийЛимитЗапроса } = await import('../../../../lib/rate-limit-db');
  if (!allowRequest(req, 'scan-verify', 60, 60_000)
      || !(await общийЛимитЗапроса(req, 'scan-verify', 60, 60_000))) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429, headers });
  }

  const id = (req.nextUrl.searchParams.get('id') || '').trim();
  if (!id) {
    return NextResponse.json({ verified: false, reason: 'no_id' }, { status: 400, headers });
  }

  const scan = await getScanById(id);
  if (!scan) {
    return NextResponse.json({ verified: false, reason: 'not_found' }, { status: 404, headers });
  }

  // Наружу отдаём только сводку: полный отчёт с доказательствами принадлежит
  // владельцу сайта, а не любому, кто получил ссылку.
  return NextResponse.json({
    verified: true,
    id: scan.id,
    domain: scan.domain,
    score: scan.score,
    scoreScale: 100,
    totalIssues: scan.totalIssues,
    provenCount: scan.provenCount,
    checkedAt: scan.createdAt,
  }, { headers });
}
