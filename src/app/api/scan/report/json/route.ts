import { NextRequest, NextResponse } from 'next/server';
import { getScanById, findPreviousScan } from '../../../../../lib/oracle-scans';
import { jurisdictionOf } from '../../../../../lib/jurisdiction';
import { applyProbeLaw } from '../../../../../lib/probe-law';

export const dynamic = 'force-dynamic';

/**
 * Тот же отчёт, но в машиночитаемом виде — чтобы клиент вставил его в свою
 * систему, а не переписывал руками.
 *
 * ЗАЧЕМ. Печатная страница хороша для человека и для аудитора, но бесполезна
 * для того, кто хочет видеть состояние своих сайтов у себя: в панели
 * мониторинга, в таблице, в собственном отчёте перед руководством. Пока такой
 * выдачи нет, наш отчёт остаётся тупиком — его можно только прочитать.
 * С ней он становится частью чужого рабочего процесса, а сервис, встроенный в
 * рабочий процесс, не отменяют.
 *
 * ЧТО ОТДАЁМ. Ровно то же, что и на печатной странице: находки с разделением
 * на доказанные и требующие подтверждения, юрисдикцию по каждой, охват
 * проверки и сравнение с предыдущей проверкой того же сайта. Ничего сверх
 * того, что видит сам клиент, — иначе выдача превратилась бы в утечку.
 *
 * ПОЧЕМУ ЭТО БЕЗОПАСНО. Данные берутся ТОЛЬКО из сохранённой записи по номеру
 * проверки. Сочинить отчёт правкой адресной строки нельзя — именно так когда-то
 * подделывался наш «сертификат».
 */
export async function GET(req: NextRequest) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'private, max-age=300',
  };

  const { allowRequest } = await import('../../../../../lib/rate-limit');
const { общийЛимитЗапроса } = await import('../../../../../lib/rate-limit-db');
  if (!allowRequest(req, 'scan-report-json', 30, 60_000)
      || !(await общийЛимитЗапроса(req, 'scan-report-json', 30, 60_000))) {
    return NextResponse.json({ error: 'RATE_LIMITED' }, { status: 429, headers });
  }

  const id = (req.nextUrl.searchParams.get('id') || '').trim();
  if (!id) return NextResponse.json({ error: 'no_id' }, { status: 400, headers });

  const scan = await getScanById(id);
  if (!scan) return NextResponse.json({ error: 'not_found' }, { status: 404, headers });

  const payload = scan.payload as {
    allThreats?: Array<{
      code: string; title: string; severity: string; evidence: string;
      lawName?: string; fineAmount?: string;
    }>;
    scannedPages?: string[];
    engine?: string;
  } | null;

  type Threat = {
    code: string; title: string; severity: string; evidence: string;
    lawName?: string; fineAmount?: string;
    lawUrl?: string; lawKind?: string; lawSources?: Array<{ name: string; url: string }>;
  };
  // Закон у доказанных находок ставится при выдаче (lib/probe-law.ts).
  const threats: Threat[] = (payload?.allThreats || []).map((t) => applyProbeLaw(t, scan.locale));
  const isProven = (t: { evidence?: string }) => /ДОКАЗАНО|PROVEN|PROBADO|已验证/.test(String(t.evidence || ''));

  const shape = (t: Threat) => {
    const j = jurisdictionOf(t.code);
    return {
      code: t.code,
      title: t.title,
      severity: t.severity,
      proven: isProven(t),
      evidence: t.evidence,
      law: t.lawName || j.law,
      jurisdiction: { region: j.region, flag: j.flag },
      statutoryMaxFine: t.fineAmount || null,
      lawUrl: t.lawUrl || null,
      lawKind: t.lawKind || null,
      ...(t.lawSources ? { lawSources: t.lawSources } : {}),
    };
  };

  const prev = await findPreviousScan(scan.domain, scan.createdAt, scan.id);
  const prevCodes = new Set(
    ((prev?.payload as { allThreats?: Array<{ code: string }> } | null)?.allThreats || []).map((t) => t.code)
  );
  const nowCodes = new Set(threats.map((t) => t.code));

  return NextResponse.json({
    schemaVersion: 1,
    scanId: scan.id,
    domain: scan.domain,
    checkedAt: scan.createdAt,
    score: scan.score,
    scoreScale: 100,
    engine: payload?.engine || scan.engine || null,
    coverage: {
      pages: payload?.scannedPages || [scan.domain],
      // Проверка идёт снаружи и без авторизации — говорим это прямо, чтобы
      // никто не принял отсутствие находки за гарантию отсутствия проблемы.
      method: 'external-unauthenticated',
    },
    counts: {
      total: threats.length,
      proven: threats.filter(isProven).length,
      assumed: threats.filter((t) => !isProven(t)).length,
    },
    findings: threats.map(shape),
    comparedToPrevious: prev
      ? {
          previousScanId: prev.id,
          previousCheckedAt: prev.createdAt,
          previousScore: prev.score,
          scoreDelta: scan.score - prev.score,
          fixed: [...prevCodes].filter((c) => !nowCodes.has(c)),
          appeared: [...nowCodes].filter((c) => !prevCodes.has(c)),
        }
      : null,
    verifyUrl: `https://aifa.works/audit-verify?id=${scan.id}`,
    printableReportUrl: `https://aifa.works/api/scan/report?id=${scan.id}`,
    disclaimer:
      'Проверка выполнена снаружи, без доступа к внутренним системам объекта. Отсутствие находки не является гарантией отсутствия уязвимости.',
  }, { headers });
}
