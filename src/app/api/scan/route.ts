import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';
import { getThreatMatrix, getLawMeta, type Category } from '../../../data/threatMatrix';
import { localizeFindings } from '@/lib/oracle-probe-i18n';
import { guessSector, riskForSector } from '@/lib/oracle-risk';
import { peerComparison } from '@/lib/oracle-peers';
import { хостБезопасен, ссылкаБезопасна } from '@/lib/ssrf-guard';

/**
 * ПЛАТНЫЙ GROK ЗАКРЫТ ПО УМОЛЧАНИЮ (16.08.2026, требование Архитектора).
 * `api.x.ai` — чужой платный поставщик; 13.08.2026 по этому ключу за сутки ушло
 * $43.35, которых никто не разрешал. Раздел 13 Конституции: платный путь закрыт
 * ФИЗИЧЕСКИ. Открывается только переменной `РАЗРЕШЕНЫ_ПЛАТНЫЕ_МОДЕЛИ=1`.
 */
function ключГрока(): string {
  const р = process.env.РАЗРЕШЕНЫ_ПЛАТНЫЕ_МОДЕЛИ || process.env.ALLOW_PAID_MODELS || '';
  if (!(р === '1' || р.toLowerCase() === 'true')) {
    console.warn('[модели] Grok (api.x.ai) закрыт: платные ступени выключены');
    return '';
  }
  return process.env.GROK_API_KEY || process.env.XAI_API_KEY || '';
}



export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * CORS-ОТКЛИК НА ПРЕДПОЛЁТНЫЙ ЗАПРОС. Добавлен 27.08.2026.
 *
 * 🔴 ЧТО БЫЛО СЛОМАНО. На странице `/accessibility` раскрывается блок
 * «Developer API (CORS Integration)» и обещает публичный эндпоинт, который
 * можно звать из чужого браузера — из CI/CD и из панелей партнёров.
 *
 * Обещание не работало. Заголовки CORS в этом файле были написаны (внутри
 * `POST`, вместе с проверкой `if (req.method === 'OPTIONS')`), но проверка
 * НЕ ВЫЗЫВАЛАСЬ НИКОГДА: Next.js App Router маршрутизирует по ИМЕНИ
 * экспортированной функции, а экспортировался только `POST`. Запрос OPTIONS
 * до кода вообще не доходил — фреймворк отвечал 405 сам.
 *
 * Замер 27.08.2026, предполётный запрос с чужим Origin:
 *     access-control-allow-origin   — НЕТ
 *     access-control-allow-methods  — НЕТ
 *     access-control-allow-headers  — НЕТ
 *
 * То есть разработчик, поверивший странице, встраивал вызов к нам, получал
 * от браузера отказ CORS и делал вывод обо всём продукте. Ложное обещание на
 * боевом сайте хуже отсутствия обещания.
 *
 * Класс ошибки тот же, что у заглушки «не понял вопрос», найденной в тот же
 * день: код написан, выглядит правильно и не вызывается ни разу.
 */
const CORS_ЗАГОЛОВКИ = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_ЗАГОЛОВКИ });
}

/**
 * Вердикт выносит ОДНА модель, всегда одна и та же.
 *
 * Раньше здесь сначала пробовался Grok, а при сбое — Gemini. Это два разных
 * «мозга»: один и тот же сайт получал два разных списка нарушений, и клиент
 * не знал, какой ему достался. Для платного аудита это недопустимо: отчёт
 * должен быть воспроизводимым.
 *
 * Поэтому вердикт всегда пишет Gemini при temperature 0. Grok остаётся только
 * запасным каналом на случай, когда Gemini недоступен целиком — и в этом
 * случае в ответе честно проставляется, какой моделью получен результат.
 */
/**
 * 🔴 ИМЯ МОДЕЛИ — НЕ КОНСТАНТА, А ДОГОВОРЁННОСТЬ, КОТОРУЮ GOOGLE МЕНЯЕТ БЕЗ НАС.
 *
 * Замер 10.08.2026 на боевом сайте: обе ступени Gemini отвечали `404 (no body)`,
 * и КАЖДАЯ проверка втихую уходила на платный Grok. Снаружи это выглядело
 * исправной работой — отчёт приходил, счёт рос. Ошибка была не в квоте и не в
 * ключе: столько же стоит неверное имя модели, сколько отсутствующий доступ.
 *
 * Отсюда правило: одно вписанное имя — это точка отказа. Держим короткий список
 * в порядке предпочтения и берём первое, которое ответит. Порядок фиксированный,
 * поэтому вердикт остаётся воспроизводимым: пока первая модель жива, отвечает
 * всегда она, а не «какая подвернулась».
 *
 * Стабильные идут раньше экспериментальных: ветки с пометкой preview/exp Google
 * убирает без предупреждения, и ставить на них платный аудит нельзя.
 */
/**
 * 🔴 ТУТ ОРАКУЛ ОТСТАЛ ОТ ОСТАЛЬНОЙ ЭКОСИСТЕМЫ НА ЦЕЛОЕ ПОКОЛЕНИЕ.
 *
 * Замер 10.08.2026, журнал боевого сервера — что отвечали прежние имена:
 *
 *   gemini-2.5-flash       → 404  (числится доступной, но по этому пути её нет)
 *   gemini-2.5-flash-lite  → 404
 *   gemini-1.5-flash       → 404  (снята Google, в списке отсутствует)
 *   gemini-2.0-flash       → 429  (существует, суточная квота выбрана)
 *   gemini-flash-latest    → 429
 *
 * То есть бесплатный канал не работал ВООБЩЕ, и каждая проверка молча уходила
 * на платный Grok. Снаружи это выглядело исправной работой: отчёт приходит,
 * растёт только счёт.
 *
 * ТОЧНЫЕ КВОТЫ БЕСПЛАТНОГО ТАРИФА — снято глазами в консоли Google Cloud
 * 10.08.2026, проект aifa-free-gemini-33231, вкладка «Quotas & System Limits»
 * службы generativelanguage.googleapis.com, фильтр «per day for a project in
 * the free tier» (всего 76 строк). Это не документация и не форум, а наши
 * собственные строки квот:
 *
 *   модель                  в сутки
 *   gemini-3.6-flash             20
 *   gemini-3.5-flash             20
 *   gemini-3-flash               20
 *   gemini-3.5-flash-lite       500
 *   gemini-3.1-flash-lite       500
 *   gemini-2.5-flash             20
 *   gemini-2.5-flash-lite        20
 *   ────────────────────────────────
 *   ИТОГО на один ключ         1100
 *
 * 🔴 ЧЕГО В ЭТОЙ ТАБЛИЦЕ НЕТ — И ЭТО ВАЖНО:
 *
 * Числа 1500 в бесплатном тире нашего проекта НЕТ НИ У ОДНОЙ модели. Ходовое
 * правило «если у модели нет своей строки, действует общий предел 1500» к нам
 * не применимо: строки есть у всех моделей, которыми мы пользуемся. Проверять
 * это надо в своей консоли, а не по общим статьям.
 *
 * У `gemini-2.0-flash` бесплатный предел равен НУЛЮ — она отвечает 429 всегда,
 * сколько её ни зови. В лестнице ей делать нечего, и здесь её нет. То же у
 * pro-моделей (2.5-pro, 3-pro, 3.1-pro) — ноль в бесплатном тире.
 *
 * Главный вывод: суточный предел считается ОТДЕЛЬНО ДЛЯ КАЖДОЙ МОДЕЛИ. Значит
 * задача не «найти одну модель пожирнее», а пройти ВСЕ бесплатные сверху вниз.
 * Умные (по 20 в сутки) выбираются за первые же часы — на них приходится начало
 * дня, а дальше нагрузку принимают модели lite с их пятьюстами.
 *
 * Порядок: сначала самые умные, ниже — самые ёмкие, в самом низу прошлое
 * поколение 2.5. Оно тоже бесплатное и раньше НЕ ИСПОЛЬЗОВАЛОСЬ вовсе: сорок
 * запросов в сутки просто уходили на платный Grok. Пусть невелико, но платить
 * за то, что уже оплачено, незачем.
 *
 * Ветки с пометкой preview не берём: Google убирает их без предупреждения, а на
 * них стоит платный аудит. Image/tts/robotics/deep-research решают не нашу задачу.
 *
 * Та же лестница живёт в кабинете центрального сайта (aifa-chat) — держать её
 * здесь другой значило бы, что один и тот же вопрос на двух сайтах разбирают
 * разные модели.
 */
const МОДЕЛИ_GEMINI = [
  // Проверено 18.08.2026 в консоли: модель существует, бесплатная квота
  // 20/сутки и 5/мин, и в лестнице её не было. Ставим первой ступенью.
  'gemini-3.7-flash',
  'gemini-3.6-flash',        //  20/сутки — самая умная
  'gemini-3.5-flash',        //  20/сутки
  'gemini-3.5-flash-lite',   // 500/сутки — основная рабочая лошадь
  'gemini-3.1-flash-lite',   // 500/сутки — вторая рабочая лошадь
  'gemini-flash-lite-latest',// псевдоним ёмкой ветки: переживёт смену поколений
  'gemini-flash-latest',     // псевдоним умной ветки
  'gemini-2.5-flash',        //  20/сутки — прошлое поколение, но бесплатное
  'gemini-2.5-flash-lite',   //  20/сутки — последний бесплатный рубеж перед Grok
];

/**
 * Ключей бесплатного тира может быть несколько. Суточная квота считается НА
 * ПРОЕКТ, стоящий за ключом, — значит второй ключ это не запасной вариант на
 * случай поломки, а ОТДЕЛЬНЫЙ ЗАПАС той же величины. Два ключа удваивают
 * бесплатный дневной потолок, четыре — учетверяют.
 *
 * В кабинете центрального сайта это работает давно (там перебираются четыре
 * ключа), а AIfaFocus на aifa.works ходил с одним. Держать по-разному незачем:
 * лишние переменные просто не заданы, и тогда список схлопывается до одного
 * ключа — ровно как было.
 */
function ключиGemini(): string[] {
  return [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
    process.env.GEMINI_API_KEY_4,
  ].filter((к): к is string => typeof к === 'string' && к.trim().length > 0);
}

/**
 * Спрашивает у Google, какие модели вообще доступны нашему ключу, и пишет их в
 * журнал. Нужно ровно для одного случая: когда не подошло ни одно имя из списка.
 * Без этого «404» остаётся загадкой — ключ просрочен? модель переименована? нет
 * доступа? — а с этим ответ виден прямо в журнале боевого сервера, и подобрать
 * верное имя можно за одну минуту, не имея ключа на руках.
 */
async function перечислитьМоделиGemini(): Promise<string[]> {
  try {
    const ответ = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}&pageSize=200`,
      { signal: AbortSignal.timeout(10_000) },
    );
    if (!ответ.ok) return [`не удалось получить список: HTTP ${ответ.status}`];
    const данные = await ответ.json() as {
      models?: { name?: string; supportedGenerationMethods?: string[] }[];
      error?: { message?: string };
    };
    if (данные.error) return [`отказ: ${данные.error.message ?? 'без пояснения'}`];
    return (данные.models ?? [])
      .filter(м => (м.supportedGenerationMethods ?? []).includes('generateContent'))
      .map(м => (м.name ?? '').replace(/^models\//, ''))
      .filter(Boolean);
  } catch (сбой) {
    return [`список не запросился: ${String(сбой)}`];
  }
}

async function createChatCompletionWithFallback(
  messages: any[],
  temperature: number = 0,
  max_tokens: number = 4096
): Promise<{ completion: any; engine: string }> {
  let lastError: any = null;

  const ключи = ключиGemini();

  // Порядок перебора: СНАЧАЛА все ключи на одной модели, потом следующая модель.
  // Не наоборот. Замысел лестницы — сперва самая умная модель, потом попроще.
  // Если пройти первым ключом всю лестницу до конца, отчёты станут проще уже
  // после двадцати проверок, хотя наверху лежит нетронутый умный лимит второго
  // ключа. При чередовании ключей на одной ступени умных отчётов выходит вдвое
  // больше подряд — при том же числе ключей.
  for (const имяМодели of ключи.length ? МОДЕЛИ_GEMINI : []) {
   for (let н = 0; н < ключи.length; н++) {
    try {
      const client = new OpenAI({
        apiKey: ключи[н],
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
      });
      const completion = await client.chat.completions.create({
        model: имяМодели, messages, temperature, max_tokens,
      });
      // Замер экономии на кэше. Gemini сам кэширует НАЧАЛО запроса и берёт за
      // повторную часть десятую долю цены — но проверить, что это реально
      // происходит, можно только по числу засчитанных из кэша токенов.
      // Без этой строки «кэширование настроено» оставалось бы предположением.
      try {
        const u = (completion as { usage?: Record<string, unknown> }).usage;
        const cachedTok = Number(
          (u?.prompt_tokens_details as { cached_tokens?: number } | undefined)?.cached_tokens ?? 0,
        );
        const promptTok = Number(u?.prompt_tokens ?? 0);
        if (promptTok) {
          const pct = Math.round((cachedTok / promptTok) * 100);
          console.log(`[scan] токенов запроса ${promptTok}, из кэша ${cachedTok} (${pct}%)`);
        }
      } catch { /* замер не должен ломать проверку */ }
      console.log(`[scan] вердикт вынесла ${имяМодели} (ключ №${н + 1})`);
      return { completion, engine: имяМодели };
    } catch (err) {
      // Пишем ИМЯ модели и НОМЕР ключа рядом с ошибкой. Раньше в журнале было
      // безымянное «основная модель недоступна», и по нему нельзя было понять,
      // что именно сломалось — квота, ключ или само название.
      const текст = String(err);
      const род = текст.includes('429') ? 'суточный предел выбран'
        : текст.includes('404') ? 'нет такой модели у этого ключа'
        : 'иная причина';
      console.warn(`[scan] ключ №${н + 1} · ${имяМодели}: ${род} — ${текст.slice(0, 160)}`);
      lastError = err;
    }
   }
  }

  /**
   * Ни одно имя не подошло. Это тот самый случай, ради которого написан
   * `перечислитьМоделиGemini`: без списка доступных моделей «404» остаётся
   * загадкой и молча переводит платный аудит на другого поставщика.
   *
   * Список пишем в журнал ОДИН раз на такой сбой и не чаще: запрос дешёвый, но
   * дёргать его на каждую проверку незачем.
   */
  if (ключи.length) {
    const доступные = await перечислитьМоделиGemini();
    console.warn(
      `[scan] ни одна модель не ответила ни на одном из ${ключи.length} ключей `
      + `(список: ${МОДЕЛИ_GEMINI.join(', ')}). `
      + `Первому ключу доступны: ${доступные.join(', ') || 'ни одной'}`,
    );
  }

  if (ключГрока()) {
    try {
      const client = new OpenAI({
        apiKey: ключГрока(),
        baseURL: 'https://api.x.ai/v1',
      });
      const completion = await client.chat.completions.create({
        model: 'grok-4.3', messages, temperature, max_tokens,
      });
      // Раздел 24 Конституции: собственный счётчик обязан видеть расход в
      // момент вызова, а не через сутки по счёту поставщика. Сканер был
      // единственным платным путём, который сторожу не докладывал.
      try {
        const { record } = await import('@/lib/cost-guard');
        const текст = completion.choices?.[0]?.message?.content || '';
        await record('scan-grok-works', текст.length);
      } catch (е) {
        console.warn('[scan] сторож расходов не принял запись:', String(е));
      }
      return { completion, engine: 'grok-4.3' };
    } catch (err) {
      console.warn('[scan] запасная модель тоже недоступна:', String(err));
      lastError = err;
    }
  }

  throw lastError || new Error('No API keys configured');
}

export interface FoundThreat {
  id: number;
  code: string;
  title: string;
  description: string;
  severity: string;
  category: Category;
  evidence: string;
  /** Чем подтверждается: observable — из ответа сайта; indicative — внешний
      признак организационного контроля, подтверждается только аудитом. */
  evidenceKind?: 'observable' | 'indicative';
  lawName: string;
  lawUrl: string;
  fineAmount: string;
  consequence: string;
  violatingHtml?: string;
}

export interface ScanResponse {
  score: number;
  totalIssues: number;
  topIssues: FoundThreat[];
  allThreats: FoundThreat[];
  targetUrl: string;
  fallback?: boolean;
  /**
   * Номер сохранённой проверки. По нему открывается печатный отчёт и
   * подтверждается его подлинность. Раньше поле возвращалось сервером, но в
   * типе объявлено не было, и интерфейсу приходилось приводить объект вручную —
   * из-за этого кнопки «открыть отчёт» на экране просто не было.
   */
  scanId?: string;
}

interface GrokViolation {
  id: number;
  evidence: string;
  category: string;
}

// ─── Sitemap Scraper Helper ───────────────────────────────────────────────────

async function fetchSitemapUrls(rootUrl: string): Promise<string[]> {
  try {
    const parsed = new URL(rootUrl);
    const sitemapUrl = new URL('/sitemap.xml', parsed.origin).toString();
    const res = await fetch(sitemapUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [rootUrl];
    const xml = await res.text();
    const $ = cheerio.load(xml, { xmlMode: true });
    const urls: string[] = [];
    $('loc').each((_, el) => {
      const locText = $(el).text().trim();
      if (locText && locText.startsWith('http') && !urls.includes(locText)) {
        urls.push(locText);
      }
    });
    if (urls.length === 0) return [rootUrl];
    
    // Выбор дополнительных страниц ДЕТЕРМИНИРОВАННЫЙ.
    //
    // Здесь стояло `sort(() => 0.5 - Math.random()).slice(0, 2)` — то есть при
    // каждом запуске AIfaFocus смотрел РАЗНЫЕ страницы одного и того же сайта и,
    // естественно, находил разное. Это и была главная причина «модель даёт
    // разные ответы»: дело было не в модели, а в случайной выборке.
    //
    // Теперь порядок задан: сортируем по алфавиту и берём первые две. Один
    // сайт — всегда один и тот же набор страниц, отчёт воспроизводим.
    /**
     * 🔴 АДРЕСА ИЗ ЧУЖОЙ КАРТЫ САЙТА РАНЬШЕ ОТКРЫВАЛИСЬ БЕЗ ЕДИНОЙ ПРОВЕРКИ.
     *
     * Список <loc> берётся у ПРОВЕРЯЕМОГО сайта, то есть его пишет чужой
     * человек. Достаточно было положить в свой sitemap.xml строку
     * http://169.254.169.254/ — и мы шли туда сами, своим сервером, со своими
     * правами. Проверка введённого адреса на это не распространялась: она
     * отработала выше и к этим ссылкам отношения не имела.
     *
     * Теперь каждая ссылка проходит тот же заслон и обязана быть С ТОГО ЖЕ
     * САЙТА. Второе — не только про безопасность: AIfaFocus обещает проверить один
     * сайт, а не тот, на который его владелец решил нас увести.
     */
    const происхождение = parsed.origin;
    const проверенные: string[] = [];
    for (const u of urls) {
      if (u === rootUrl || u === rootUrl + '/') continue;
      if (проверенные.length >= 8) break;   // дальше всё равно берём две
      if (await ссылкаБезопасна(u, происхождение)) проверенные.push(u);
    }
    const filtered = проверенные.sort((a, b) => a.localeCompare(b));
    return [rootUrl, ...filtered.slice(0, 2)];
  } catch (err) {
    console.warn('[sitemap] Failed to fetch sitemap, using root URL:', String(err));
    return [rootUrl];
  }
}

// ─── HTML Scraper ─────────────────────────────────────────────────────────────

async function scrapePageBlueprint(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: AbortSignal.timeout(14000),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);

  const hasHsts = res.headers.get('strict-transport-security') ? true : false;
  const hasCsp = res.headers.get('content-security-policy') ? true : false;

  const html = await res.text();
  const $ = cheerio.load(html);

  const missingAltImagesHtml: string[] = [];
  $('img:not([alt])').slice(0, 5).each((_, el) => {
    missingAltImagesHtml.push($.html(el).slice(0, 250));
  });

  // Поля, намеренно спрятанные от программ экранного доступа, из подсчёта
  // исключены. Это приманки для роботов-заполнителей: их выносят за пределы
  // экрана и помечают aria-hidden именно для того, чтобы живой человек их не
  // видел и не слышал. Подписать такое поле — значит сломать защиту от спама
  // и одновременно сообщить незрячему о поле, которого для него нет.
  // Проверено на своём сайте: раньше приманка попадала в обвинение.
  const inputs = $('input:not([type="hidden"])').filter((_, el) => {
    const $el = $(el);
    if ($el.attr('aria-hidden') === 'true') return false;
    if ($el.attr('tabindex') === '-1' && /-9999|display\s*:\s*none|visibility\s*:\s*hidden/i.test($el.attr('style') || '')) return false;
    return $el.closest('[aria-hidden="true"]').length === 0;
  });
  let inputsWithoutLabel = 0;
  const inputsWithoutLabelHtml: string[] = [];
  inputs.each((_, el) => {
    const id = $(el).attr('id');
    const ariaLabel = $(el).attr('aria-label');
    const ariaLabelledby = $(el).attr('aria-labelledby');
    // Поле внутри <label> подписано самим этим label — атрибут for тогда не нужен.
    const wrapped = $(el).closest('label').length > 0;
    if (!wrapped && !ariaLabel && !ariaLabelledby && (!id || $(`label[for="${id}"]`).length === 0)) {
      inputsWithoutLabel++;
      if (inputsWithoutLabelHtml.length < 5) {
        inputsWithoutLabelHtml.push($.html(el).slice(0, 250));
      }
    }
  });

  const buttons = $('button, [role="button"]');
  let unlabeledButtons = 0;
  const unlabeledButtonsHtml: string[] = [];
  buttons.each((_, el) => {
    if (!$(el).attr('aria-label') && !$(el).text().trim()) {
      unlabeledButtons++;
      if (unlabeledButtonsHtml.length < 5) {
        unlabeledButtonsHtml.push($.html(el).slice(0, 250));
      }
    }
  });

  const links = $('a');
  let emptyLinks = 0;
  const emptyLinksHtml: string[] = [];
  const legalLinks: { text: string; href: string }[] = [];

  links.each((_, el) => {
    const text = $(el).text().trim();
    const textLower = text.toLowerCase();
    const href = $(el).attr('href') || '';
    
    if (!$(el).attr('aria-label') && !text && !$(el).find('img[alt]').length) {
      emptyLinks++;
      if (emptyLinksHtml.length < 5) {
        emptyLinksHtml.push($.html(el).slice(0, 250));
      }
    }

    if (
      textLower.includes('privacy') ||
      textLower.includes('confidentiality') ||
      textLower.includes('cookie') ||
      textLower.includes('terms') ||
      textLower.includes('legal') ||
      textLower.includes('sell') ||
      textLower.includes('share') ||
      textLower.includes('ccpa') ||
      textLower.includes('gdpr') ||
      textLower.includes('accessibility') ||
      textLower.includes('политика') ||
      textLower.includes('конфиденциально') ||
      textLower.includes('согласие') ||
      textLower.includes('пользователь') ||
      textLower.includes('privacidad') ||
      textLower.includes('términos') ||
      textLower.includes('cookies') ||
      textLower.includes('隐私') ||
      textLower.includes('条款')
    ) {
      legalLinks.push({ text, href });
    }
  });

  const headings: string[] = [];
  $('h1, h2, h3, h4, h5, h6').each((_, el) => {
    headings.push(`${el.tagName.toUpperCase()}: ${$(el).text().trim().slice(0, 80)}`);
  });

  $('script, style, noscript, svg').remove();

  const blueprint = {
    url,
    title: $('title').text().trim(),
    lang: $('html').attr('lang') || 'MISSING',
    metaDescription: $('meta[name="description"]').attr('content') || 'MISSING',
    viewport: $('meta[name="viewport"]').attr('content') || 'MISSING',
    charset: $('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type"]').attr('content') || 'MISSING',
    images: { total: $('img').length, missingAlt: missingAltImagesHtml.length, emptyAlt: $('img[alt=""]').length },
    forms: { totalInputs: inputs.length, inputsWithoutLabel },
    buttons: { total: buttons.length, unlabeled: unlabeledButtons },
    links: { total: links.length, emptyText: emptyLinks },
    headings: { h1Count: $('h1').length, structure: headings.slice(0, 20) },
    aria: {
      // Ссылку «перейти к содержимому» ищем не по трём заранее угаданным
      // адресам, а по смыслу: любая внутренняя ссылка, чей текст говорит о
      // переходе к содержимому, либо ведущая на распространённые якоря.
      // Прежний вариант объявлял её отсутствующей на наших же сайтах, где
      // она есть, — и точно так же оболгал бы клиента.
      skipLink:
        $('[href="#main"],[href="#content"],[href="#main-content"],[href="#maincontent"],[href="#skip"],[href="#start-of-content"]').length > 0 ||
        $('a[href^="#"]').toArray().some((el) => {
          const t = ($(el).text() || '').toLowerCase();
          const c = ($(el).attr('class') || '').toLowerCase();
          return /skip\s*(to|link)?|перейти\s+к|к\s+содержим|saltar\s+al|跳(到|转)/.test(t) || /skip-link|skip-nav|skip-to/.test(c);
        }),
      mainLandmark: $('main,[role="main"]').length,
      navLandmark: $('nav,[role="navigation"]').length,
      tabindexAbove0: $('[tabindex]').filter((_, el) => parseInt($(el).attr('tabindex') || '0') > 0).length,
    },
    gdpr: {
      cookieMention: html.toLowerCase().includes('cookie') || html.toLowerCase().includes('куки') || html.toLowerCase().includes('galletas'),
      // Раньше искалась ровно фраза «privacy policy» / «политика
      // конфиденциальности». Сайт, у которого ссылка называется просто
      // «Конфиденциальность» или «Privacy», объявлялся не имеющим политики
      // вовсе — а это обвинение критической важности. Поймано на своём же
      // сайте. Теперь засчитывается и короткая форма, и ссылка, ведущая на
      // страницу с соответствующим адресом.
      privacyPolicy:
        /privacy\s*(policy|notice|statement)|политик\w*\s+конфиденциальност|datenschutz(erkl[äa]rung)?|pol[íi]tica\s+de\s+privacidad|隐私(政策|权政策|声明)|个人信息保护/i.test(html) ||
        /(^|[>\s"'])(privacy|конфиденциальност\w*|privacidad|隐私)([<\s"'.,·|]|$)/i.test(html) ||
        /href=["'][^"']*\/(privacy|privacy-policy|konfidencialnost|privacidad|legal|datenschutz)\b/i.test(html),
      // Менеджер согласия — это не обязательно покупной сервис. Раньше здесь
      // перечислялись пять известных марок, и любой самописный баннер, включая
      // наш собственный, объявлялся отсутствующим. Признавать нарушением то,
      // что человек сделал своими руками вместо покупки чужого виджета, —
      // это ровно то враньё, за которое клиент перестаёт нам верить.
      consentManager:
        html.includes('cookiebot') ||
        html.includes('onetrust') ||
        html.includes('cookiepro') ||
        html.includes('usercentrics') ||
        html.includes('consentmanager') ||
        html.includes('klaro') ||
        html.includes('cookieyes') ||
        html.includes('termly') ||
        html.includes('iubenda') ||
        html.includes('axeptio') ||
        html.includes('didomi') ||
        html.includes('quantcast') ||
        html.includes('borlabs') ||
        // Consent Mode v2 — официальный механизм Google: если он объявлен,
        // согласием на сайте управляют, чем бы ни был нарисован сам баннер.
        /gtag\s*\(\s*['"]consent['"]/.test(html) ||
        /window\.__tcfapi|__gpp\b|dataLayer.*consent/i.test(html) ||
        // Самописный баннер: элемент, который одновременно упоминает cookie и
        // предлагает выбор «принять/отклонить» на одном из наших языков.
        (/cookie|куки|galletas|cookie[-_]?consent/i.test(html) &&
          /(accept|allow|принять|разрешить|aceptar|同意)[^<]{0,30}(all|cookies|все|todo)?|(decline|reject|отклонить|отказат|rechazar|拒绝)/i.test(html)),
      gtag: html.includes('gtag') || html.includes('google-analytics'),
      metaPixel: html.includes('fbq(') || html.includes('facebook.net/en_US/fbevents'),
    },
    focus: {
      // Стили фокуса почти никогда не лежат в самой странице — они во внешнем
      // файле стилей, которого мы здесь не видим. Прежняя проверка смотрела
      // только в HTML и потому отвечала «нет» практически всегда, а модель
      // превращала это в обвинение. Теперь учитываем и служебные классы вида
      // focus:… и focus-visible:…, которыми стили задаются прямо в разметке.
      focusStylesPresent:
        html.includes(':focus') ||
        html.includes('focus-visible') ||
        /\bfocus:[a-z-]/.test(html) ||
        /\bfocus-within:[a-z-]/.test(html),
      outlineNone: (html.match(/outline\s*:\s*0|outline\s*:\s*none/gi) || []).length,
    },
    security: {
      https: url.startsWith('https://'),
      hsts: hasHsts,
      csp: hasCsp,
    },
    legalLinks,
    imagesHtml: { missingAlt: missingAltImagesHtml },
    formsHtml: { inputsWithoutLabel: inputsWithoutLabelHtml },
    buttonsHtml: { unlabeled: unlabeledButtonsHtml },
    linksHtml: { emptyLinks: emptyLinksHtml },
    bodyText: $('body').text().replace(/\s+/g, ' ').trim().slice(0, 1200),
  };

  return JSON.stringify(blueprint, null, 2);
}

// ─── Grok Analysis ───────────────────────────────────────────────────────────

/**
 * Пункты реестра, которые модель ФИЗИЧЕСКИ способна подтвердить.
 *
 * Модель видит не сайт, а разбор страницы — ограниченный набор полей: картинки
 * и их подписи, поля форм, кнопки, ссылки, заголовки, признаки согласия, стили
 * фокуса, заголовки безопасности, юридические ссылки и первые 1200 символов
 * текста. Пункт, который нельзя подтвердить ни одним из этих полей, модель
 * подтвердить не может в принципе — она может только его сочинить.
 *
 * Раньше в запрос уходили все 2000 пунктов: 236 КБ, около 60 тысяч входных
 * токенов НА КАЖДУЮ страницу. При этом за 51 настоящую проверку модель
 * использовала ровно 13 пунктов, и все они из первой сотни. Остальное —
 * требования к внутренним процессам компании («зарегистрироваться в органе
 * Бенина», «вести журнал обработки», «назначить ответственного»), которые
 * снаружи не проверяются ничем, плюс машинная набивка реестра до круглой
 * цифры с заголовками вроде «Missing Digital Sustainability Disclosures
 * Administrative Key Credenti».
 *
 * Список получен разбором реестра (scripts/analyze-observable.js) и проверен
 * контрольной сверкой: все 13 пунктов, которые модель использовала
 * добросовестно, в нём остались. Намеренно убран пункт про назначение
 * ответственного за данные — модель выдавала его, ссылаясь на отсутствие
 * стилей фокуса, то есть на пустом месте.
 *
 * Итог: 107 КБ вместо 236, около 27 тысяч токенов вместо 60 тысяч. Расход
 * падает на 55%, а вместе с ним падает и соблазн сочинить.
 */
let observableIds: Set<number> | null = null;
async function getObservableIds(): Promise<Set<number>> {
  if (observableIds) return observableIds;
  try {
    const list = (await import('../../../lib/observable-ids.json')).default as number[];
    observableIds = new Set(list);
  } catch {
    // Файла нет — работаем как раньше, на всём реестре. Лучше дороже, чем никак.
    observableIds = new Set<number>();
  }
  return observableIds;
}

async function analyzeWithGrok(blueprint: string, locale: string): Promise<{ violations: GrokViolation[]; engine: string }> {
  const activeThreatMatrix = getThreatMatrix(locale);
  const allowed = await getObservableIds();
  const shortlist = allowed.size > 0
    ? activeThreatMatrix.filter((c) => allowed.has(c.id))
    : activeThreatMatrix;
  const matrixSummary = shortlist
    .map((c) => `{"id":${c.id},"code":"${c.code}","cat":"${c.category}","title":"${c.title}"}`)
    .join(',');

  const userLanguage = locale || 'en';

  // ПОРЯДОК ЧАСТЕЙ ЗАПРОСА ВАЖЕН ДЛЯ ДЕНЕГ.
  //
  // Gemini сам кэширует НАЧАЛО запроса: если несколько обращений подряд имеют
  // одинаковое начало, за повторную часть берётся десятая доля цены
  // ($0,03 против $0,30 за миллион токенов). Включать это не нужно, оно
  // работает само — но только по совпадающему НАЧАЛУ.
  //
  // Раньше первым шёл разбор страницы, который у каждого сайта свой. Начало
  // запроса не совпадало никогда, и кэш не срабатывал ни разу: перечень правил
  // весом в 27 тысяч токенов оплачивался по полной цене на каждой странице
  // каждого скана.
  //
  // Теперь неизменная часть — инструкции и перечень правил — идёт ПЕРВОЙ, а
  // разбор конкретной страницы последним. Начало совпадает у всех обращений,
  // и перечень попадает в кэш.
  const prompt = `You are a strict legal compliance auditor. Analyze a scraped website blueprint against ${shortlist.length} compliance checks.

COMPLIANCE CHECK LIST (${shortlist.length} items):
[${matrixSummary}]

INSTRUCTIONS:
- Identify which checks this site is ACTIVELY FAILING based on concrete evidence in the blueprint data.
- Only flag violations where the blueprint data provides clear supporting evidence.
- Return ONLY actual violations. If the website is fully compliant and passes all checks, return an empty JSON array []. Do NOT hallucinate, invent, or force-include violations if the evidence does not support it.
- Maximum 12 violations, sorted by severity (critical first).
- Be specific in the evidence field — cite exact values from the blueprint (e.g., "images.missingAlt: 7 images found without alt attributes").
- IMPORTANT: You MUST write the "evidence" field description in the language corresponding to locale: "${userLanguage}".

Return ONLY a raw JSON array. No markdown. No explanation. No code fences. Strict format:
[{"id":<number>,"evidence":"<specific evidence from the blueprint in the user's language>","category":"<category string>"}]

WEBSITE BLUEPRINT:
${blueprint}`;

  const { completion, engine } = await createChatCompletionWithFallback(
    [{ role: 'user', content: prompt }],
    0,
    4096
  );

  const raw = completion.choices[0]?.message?.content ?? '[]';
  const cleaned = raw.replace(/^```json\s*/m, '').replace(/^```\s*/m, '').replace(/```$/m, '').trim();
  let parsed: unknown;
  try { parsed = JSON.parse(cleaned); } catch { return { violations: [], engine }; }
  if (!Array.isArray(parsed)) return { violations: [], engine };
  return { violations: parsed as GrokViolation[], engine };
}

// ─── Violating HTML Snippet Resolver ──────────────────────────────────────────

function getViolatingHtml(code: string, category: string, blueprintObj: any): string | undefined {
  const codeLower = code.toLowerCase();
  
  if (codeLower.includes('alt') || codeLower.includes('image') || code === 'ADA-001') {
    if (blueprintObj.imagesHtml?.missingAlt?.length > 0) {
      return blueprintObj.imagesHtml.missingAlt.join('\n');
    }
  }
  
  if (codeLower.includes('button') || code === 'ADA-002') {
    if (blueprintObj.buttonsHtml?.unlabeled?.length > 0) {
      return blueprintObj.buttonsHtml.unlabeled.join('\n');
    }
  }
  
  if (codeLower.includes('label') || codeLower.includes('input') || codeLower.includes('form')) {
    if (blueprintObj.formsHtml?.inputsWithoutLabel?.length > 0) {
      return blueprintObj.formsHtml.inputsWithoutLabel.join('\n');
    }
  }
  
  if (codeLower.includes('link') || codeLower.includes('anchor')) {
    if (blueprintObj.linksHtml?.emptyLinks?.length > 0) {
      return blueprintObj.linksHtml.emptyLinks.join('\n');
    }
  }
  
  return undefined;
}

// ─── Честный отказ вместо выдуманного отчёта ──────────────────────────────────

/**
 * Здесь стоял `buildFallbackResult` — и это была самая опасная строка сервиса.
 *
 * Когда модель была недоступна, он брал СУММУ КОДОВ СИМВОЛОВ адреса сайта,
 * по ней выбирал двенадцать «нарушений» из реестра и отдавал их клиенту как
 * результат аудита — с названиями законов, суммами штрафов и «доказательством»
 * вида «эвристический анализ обнаружил проблемы». Ни одна из этих находок не
 * была проверена на сайте клиента. За такой отчёт мы берём $500.
 *
 * Выдуманных данных в платной услуге быть не может. Теперь при недоступности
 * модели сервис честно отвечает 503: детерминированные проверки всё равно
 * отработают и дадут настоящие находки, а если недоступно вообще всё —
 * человек увидит «сервис временно недоступен», а не сочинённый список.
 */

// ─── Merge Responses Helper for Sitemap Scans ─────────────────────────────────

function mergeScanResponses(responses: ScanResponse[], rootUrl: string): ScanResponse {
  const threatMap = new Map<number, FoundThreat>();
  
  for (const res of responses) {
    const pagePath = new URL(res.targetUrl).pathname;
    const pageLabel = pagePath === '/' ? 'Home Page' : pagePath;
    
    for (const t of res.allThreats) {
      const existing = threatMap.get(t.id);
      if (existing) {
        existing.evidence += ` | [${pageLabel}]: ${t.evidence}`;
        if (t.violatingHtml) {
          existing.violatingHtml = existing.violatingHtml 
            ? `${existing.violatingHtml}\n<!-- [${pageLabel}] -->\n${t.violatingHtml}`
            : t.violatingHtml;
        }
      } else {
        threatMap.set(t.id, {
          ...t,
          evidence: `[${pageLabel}]: ${t.evidence}`,
        });
      }
    }
  }
  
  const allThreats = Array.from(threatMap.values());
  return {
    score: Math.max(0, 2000 - allThreats.length),
    totalIssues: allThreats.length,
    topIssues: allThreats.slice(0, 5),
    allThreats,
    targetUrl: rootUrl,
    fallback: responses.some(r => r.fallback),
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 🔴 ЧАСЫ ЗАПРОСА — от них считается внутренний срок.
  //
  // Замер 20.08.2026 по журналу Vercel: `Vercel Runtime Timeout Error: Task
  // timed out after 60 seconds`, маршрут /api/scan, два раза подряд — ровно
  // те два запуска, где Архитектор видел «Ошибка сканирования». Платформа
  // убивала функцию на 60-й секунде, поэтому тела ответа не было ВООБЩЕ:
  // ни кода, ни объяснения, показывать интерфейсу нечего.
  //
  // Причина долготы — галочка «Сканировать карту сайта»: страниц становится
  // три, и слой языковой модели ждёт ответа по каждой без всякого предела.
  //
  // Лечится не увеличением потолка, а СРОКОМ: детерминированные проверки
  // (слой А) к этому моменту уже посчитаны, и честнее отдать их, чем умереть
  // молча. Модель — дополнение, а не условие ответа.
  const стартЗапроса = Date.now();

  // CORS configuration for B2B open developer integrations
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { headers, status: 204 });
  }

  // Каждый скан — это пачка обращений к чужому сайту и вызов модели за наши
  // деньги, поэтому даровым он быть не может. Но и отгонять людей нельзя.
  //
  // 🔴 ПРЕЖНИЙ ЛИМИТ БЫЛ ВРЕДНЫМ: пять сканов в ЧАС. Считалось по адресу, а за
  // одним адресом сидит целый офис, кофейня или мобильный оператор — первый же
  // посетитель выбирал квоту на всех, и остальные упирались в отказ, ничего не
  // сделав. Отказ при этом был немой: код 429 и слово RATE_LIMITED, из которых
  // человек не понимал ни причины, ни что делать дальше.
  //
  // Стало: пять сканов в СУТКИ. Этого хватает распробовать AIfaFocus по-настоящему
  // (обычно человеку нужен один-два), а исчерпав — он видит внятное объяснение
  // и предложение тарифа, а не глухую стену.
  //
  // 🔴 А ВОТ СЧИТАЛ ЭТИ ПЯТЬ НЕ ТОТ СЧЁТЧИК.
  //
  // Здесь стоял `allowRequest` из lib/rate-limit — обычный Map в памяти ОДНОГО
  // экземпляра. В том файле честно написано: «safety net rather than a hard
  // quota». Значит каждый холодный старт, каждая выкладка и каждый новый
  // параллельный экземпляр начинали счёт заново, и обещание «их пять в сутки»
  // не выполнялось. Проверено на себе 10.08.2026: после выкладки счётчик
  // обнулился, и я сделала девять проверок вместо пяти.
  //
  // Пока за лишними проверками стояли только деньги на Grok, это было терпимо.
  // Теперь за ними стоит бесплатный дневной запас Gemini — 1100 обращений на
  // ключ, — и один посетитель мог выпить его целиком, оставив всех остальных
  // на платном канале.
  //
  // Стало: общий счётчик в базе (`dbRateLimit`), один на все экземпляры и все
  // сайты. Он уже был написан и работал в других ручках — просто до AIfaFocus
  // руки не дошли.
  //
  // Память оставлена ВТОРЫМ рубежом, а не выброшена. Оба счётчика при своей
  // поломке пропускают запрос (это осознанное правило: ограничитель никогда не
  // должен класть сайт). Значит, если база недоступна, общий счётчик отключится
  // молча — и тогда лимит держит память. Один рубеж хуже двух: у памяти счёт
  // сбивается, у базы бывает недоступность, но одновременно обе беды редки.
  //
  // Порядок важен: сначала спрашиваем память (это ноль обращений наружу), и
  // только если она пропустила — идём в базу.
  //
  // Проверено на живом сайте 10.08.2026: шесть проверок подряд с одного адреса —
  // первые пять прошли, шестая вернула RATE_LIMITED с человеческим объяснением.
  // Отдельно проверено главное: после НОВОЙ ВЫКЛАДКИ счёт не обнулился, а
  // продолжился — именно на этом ломался прежний счётчик в памяти.
  /**
   * Тело запроса читается ЗДЕСЬ, до проверки лимита, и только один раз.
   *
   * Раньше оно разбиралось ниже, уже после отказа по лимиту, — и объяснение
   * «проверки на сегодня закончились» собиралось, когда язык посетителя ещё
   * неизвестен. Поэтому оно было только по-русски: на английской, испанской и
   * китайской версии сайта человек получал текст, которого не понимает.
   * Прочитать тело дважды нельзя, поэтому разбор перенесён наверх, а ниже
   * используются уже готовые значения.
   */
  // Три имени для одного признака — подтверждения права на проверку домена.
  // Русское для нашей формы, `authorized` и `iOwnThisDomain` — для тех, кто
  // придёт к ручке из своего кода: угадывать русское имя поля никто не обязан.
  let тело: {
    url?: string;
    locale?: string;
    scanSitemap?: boolean;
    rescan?: boolean;
    подтверждаюПраво?: boolean;
    authorized?: boolean;
    iOwnThisDomain?: boolean;
  } = {};
  try { тело = await req.json(); } catch { тело = {}; }
  const язык = ['ru', 'en', 'es', 'zh'].includes(String(тело.locale)) ? String(тело.locale) : 'en';

  /**
   * 🔴 МЫ ОБЕЩАЛИ ТО, ЧЕГО НЕ ДЕЛАЛИ.
   *
   * В отказе написано: «подписка Spark за $15 в месяц снимает это ограничение».
   * А в коде проверки тарифа НЕ БЫЛО ВООБЩЕ: пять проверок в сутки применялись
   * ко всем одинаково, включая заплативших. То есть человек мог заплатить и
   * упереться в тот же отказ, который сам же и предлагал ему заплатить.
   *
   * Теперь тариф проверяется по-настоящему. Уровень 1 и выше («Искра» и
   * старше) лимита не имеет.
   *
   * Сбой базы или отсутствие входа трактуются как бесплатный уровень: молча
   * пропустить всех при недоступной базе значило бы отдать дневной запас
   * первому, кто заметит.
   */
  // 🔴 ВЛАДЕЛЕЦ НЕ УПИРАЕТСЯ В СОБСТВЕННЫЙ ЛИМИТ.
  //
  // Требование Архитектора от 20.08.2026: «Лимиты для всех кроме МЕНЯ».
  // Пять бесплатных проверок в сутки — это заслон от чужого перебора, а не
  // от хозяина продукта. Он упирался в него на своём же сайте и не мог ни
  // показать AIfaFocus, ни проверить починку.
  //
  // 🔴 ПРИЗНАК ТОЛЬКО ОДИН — ВХОД. И вот почему второго быть не должно.
  //
  // Сначала я сняла лимит ещё и «если проверяется наш собственный домен».
  // Рассуждение было: чужим адресом этим не воспользуешься. Рассуждение
  // НЕВЕРНОЕ, и это дыра, а не удобство:
  //
  //   любой посторонний, без входа и без учётной записи, мог слать
  //   `{"url":"https://aifa.works"}` сколько угодно раз. Каждый такой запрос —
  //   это обращения к чужому сайту и вызов платной модели за наши деньги.
  //   То есть проверка личности отсутствовала вовсе, а счёт приходил нам.
  //
  // Признак владельца обязан быть НЕПОДДЕЛЫВАЕМЫМ. Домен в теле запроса
  // задаёт тот же, кто запрос и шлёт, — это не признак, это его пожелание.
  //
  // Остаётся ровно один признак: ВХОД. Почта берётся из подписанной куки
  // (HMAC на AIFA_SESSION_SECRET), её нельзя подделать, не зная ключа. Кто не
  // вошёл — идёт по самому узкому лимиту (одна проверка в сутки), включая скан
  // наших же сайтов. Это правильно: платит за них всё равно наш кошелёк.
  const владелец = await (async () => {
    try {
      const { getFreshSessionEmail } = await import('../../../lib/user-auth');
      const почта = (await getFreshSessionEmail(req) || '').trim().toLowerCase();
      if (!почта) return false;
      const список = (process.env.OWNER_EMAILS || 'codeofdigitaleternity@gmail.com')
        .split(',')
        .map((x) => x.trim().toLowerCase())
        .filter(Boolean);
      return список.includes(почта);
    } catch {
      return false;
    }
  })();

  // 🔴 ЛИМИТ БЫЛ ОДИН НА ВСЕХ: пять в сутки для незарегистрированного и
  // БЕЗЛИМИТ для любого платного, начиная с самого дешёвого тарифа. Обе
  // крайности неверны. Пять бесплатных проверок — это пять обращений к
  // платной модели за наши деньги от человека, который нам ничего не должен
  // и может не вернуться. А безлимит на тарифе за $15 позволяет одному
  // подписчику съесть месячную выручку с себя же за один вечер: сканер ходит
  // на чужой сайт и вызывает модель, и то и другое стоит денег.
  //
  // Решение Архитектора от 28.08.2026, дословно: «на максимальном тарифе —
  // 100 в сутки, а сверх — отдельный "партнёрский" тариф».
  //
  // Сетка (уровень совпадает с полем tier в таблице user_tiers, см. lib/pricing.ts):
  //
  //   -1  не вошёл вовсе .............  1 в сутки  — попробовать и увидеть
  //    0  вошёл, тарифа нет ..........  3 в сутки  — награда за регистрацию
  //    1  Spark, $15 ................. 10 в сутки
  //    2  Family Archive, $100 ....... 30 в сутки
  //    3  Digital DNA, $200 .......... 100 в сутки
  //    4  Партнёрский, от $500 ....... без ограничения
  //   99  владелец ................... без ограничения
  //
  // Почта возвращается наружу вместе с уровнем НЕ для красоты: счётчик должен
  // считать по учётной записи, а не по адресу сети. Иначе двое из одной
  // конторы делят один лимит, а один человек с телефона и с ноутбука получает
  // два. По IP считаем только тех, кто не вошёл, — другого признака у них нет.
  const { уровень: уровеньТарифа, почта: почтаСеанса } = await (async () => {
    if (владелец) return { уровень: 99, почта: '' };
    try {
      const { getFreshSessionEmail } = await import('../../../lib/user-auth');
      const почта = (await getFreshSessionEmail(req) || '').trim().toLowerCase();
      if (!почта) return { уровень: -1, почта: '' };
      const url = process.env.SUBMISSIONS_DB_URL;
      // Вошёл, но спросить тариф не у чего — считаем бесплатным вошедшим (0),
      // а не безлимитным. Поломка базы не должна открывать наш кошелёк.
      if (!url) return { уровень: 0, почта };
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(url);
      const строки = await sql`SELECT tier FROM user_tiers WHERE LOWER(email)=LOWER(${почта})`;
      const t = Number((строки?.[0] as { tier?: unknown } | undefined)?.tier ?? 0);
      return { уровень: Number.isFinite(t) ? t : 0, почта };
    } catch {
      return { уровень: -1, почта: '' };
    }
  })();

  // Бесконечность здесь настоящая, а не «очень большое число»: сравнение с ней
  // всегда даёт «пропустить», и ни один счётчик даже не заводится.
  const суточныйЛимит =
    уровеньТарифа >= 4 ? Infinity
    : уровеньТарифа === 3 ? 100
    : уровеньТарифа === 2 ? 30
    : уровеньТарифа === 1 ? 10
    : уровеньТарифа === 0 ? 3
    : 1;

  {
    const { allowRequest } = await import('../../../lib/rate-limit');
    const { dbRateLimit, clientIp } = await import('../../../lib/rate-limit-db');
    const ip = clientIp(req);
    const безЛимита = суточныйЛимит === Infinity;
    // Ключ счётчика: вошедший считается по своей почте, остальные — по адресу
    // сети. Приставка `u:` нужна, чтобы почта и адрес не столкнулись в одном
    // пространстве имён (адрес почтой быть не может, но ключ читают люди).
    const ключ = почтаСеанса ? `scan:u:${почтаСеанса}` : `scan:${ip}`;
    const вПамяти = безЛимита || allowRequest(req, 'scan', суточныйЛимит, 24 * 60 * 60_000);
    const вБазе = безЛимита || (вПамяти && (почтаСеанса || ip !== 'unknown')
      ? await dbRateLimit(ключ, суточныйЛимит, 24 * 60 * 60_000)
      : true);
    if (!вПамяти || !вБазе) {
      // Совет по СЛЕДУЮЩЕЙ ступени, а не всегда «купите Spark».
      const следующаяСтупень =
        уровеньТарифа >= 3 ? {
          ru: 'Если ста проверок в сутки мало — это партнёрский объём, напишите нам: contact@codeofdigitaleternity.com.',
          en: 'If a hundred scans a day is not enough, that is partner volume — write to us: contact@codeofdigitaleternity.com.',
          es: 'Si cien análisis al día no bastan, ese es volumen de socio: escríbanos a contact@codeofdigitaleternity.com.',
          zh: '如果每天一百次仍不够，那属于合作伙伴用量，请联系我们：contact@codeofdigitaleternity.com。',
        } : уровеньТарифа === 2 ? {
          ru: 'Тариф Digital DNA поднимает предел до ста проверок в сутки.',
          en: 'The Digital DNA plan raises the limit to a hundred scans a day.',
          es: 'El plan Digital DNA eleva el límite a cien análisis al día.',
          zh: 'Digital DNA 套餐可将上限提高到每天一百次。',
        } : уровеньТарифа === 1 ? {
          ru: 'Тариф Family Archive за $100 в месяц поднимает предел до тридцати проверок в сутки.',
          en: 'The Family Archive plan at $100 a month raises the limit to thirty scans a day.',
          es: 'El plan Family Archive de 100 $ al mes eleva el límite a treinta análisis al día.',
          zh: '每月 100 美元的 Family Archive 套餐可将上限提高到每天三十次。',
        } : уровеньТарифа === 0 ? {
          ru: 'Подписка Spark за $15 в месяц поднимает предел до десяти проверок в сутки.',
          en: 'The Spark plan at $15 a month raises the limit to ten scans a day.',
          es: 'El plan Spark de 15 $ al mes eleva el límite a diez análisis al día.',
          zh: '每月 15 美元的 Spark 订阅可将上限提高到每天十次。',
        } : {
          ru: 'Бесплатная регистрация даёт три проверки в сутки вместо одной.',
          en: 'Free registration gives three scans a day instead of one.',
          es: 'El registro gratuito da tres análisis al día en lugar de uno.',
          zh: '免费注册即可获得每天三次，而不是一次。',
        };
      return NextResponse.json({
        error: 'RATE_LIMITED',
        // Человеку — по-человечески и НА ЕГО ЯЗЫКЕ. Молчаливый отказ выглядит
        // поломкой сайта, а поломка отпугивает надёжнее любого лимита.
        // 🔴 ТЕКСТ ВРАЛ ПОСЛЕ ВВЕДЕНИЯ СЕТКИ. Здесь стояло «их пять в сутки»
        // на всех четырёх языках — число было вписано словом и не могло
        // измениться вместе с лимитом. Человек на тарифе Family увидел бы
        // «пять в сутки», исчерпав тридцать, и решил бы, что сайт сломан.
        // Теперь число берётся из того же `суточныйЛимит`, по которому
        // отказали, а совет назван по СЛЕДУЮЩЕЙ ступени, а не всегда Spark:
        // предлагать Spark тому, кто уже на Digital DNA, — это оскорбление.
        userMessage: {
          ru: `На сегодня проверки закончились — их ${суточныйЛимит} в сутки. `
            + `Приходите завтра, и они снова будут доступны. ${следующаяСтупень.ru}`,
          en: `Today’s scans are used up — there are ${суточныйЛимит} per day. `
            + `Come back tomorrow and they will be available again. ${следующаяСтупень.en}`,
          es: `Los análisis de hoy se han agotado: son ${суточныйЛимит} por día. `
            + `Vuelve mañana y estarán disponibles de nuevo. ${следующаяСтупень.es}`,
          zh: `今天的检测已用完 —— 每天 ${суточныйЛимит} 次。`
            + `明天再来即可继续使用。${следующаяСтупень.zh}`,
        }[язык],
        retryAfterHours: 24,
        // 🔴 ССЫЛКА ВЕЛА В ПУСТОТУ. Было
        // 'https://www.codeofdigitaleternity.com/#pricing', но якоря `pricing`
        // на главной центрального сайта НЕТ — проверено 10.08.2026 разбором
        // выданной страницы: там есть только cookie-consent-banner,
        // cookie-consent-text, email, main-content и message. Человек, у
        // которого кончились бесплатные проверки, попадал на верх чужой
        // страницы и не видел никаких тарифов — то есть ровно в тот момент,
        // когда он готов платить, мы теряли его молча.
        //
        // Ставим якорь ЭТОГО же сайта: он существует (проверено разбором
        // выданной страницы aifa.works), и человек остаётся там, где начал.
        pricingUrl: 'https://aifa.works/#pricing',
      }, { status: 429, headers: { ...headers, 'Retry-After': '86400' } });
    }
  }

  try {
    // Тело уже прочитано выше — второй раз его прочитать нельзя, поток
    // запроса одноразовый. Берём готовые значения.
    const { url, locale, scanSitemap, rescan } = тело;
    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'INVALID_DOMAIN' }, { status: 400, headers });
    }

    const rawUrl = url.trim();
    const domainPattern = /^(https?:\/\/)?([a-z0-9а-яё\-]+\.)+[a-zа-яё]{2,10}(:\d+)?(\/\S*)?$/i;
    if (!domainPattern.test(rawUrl) && rawUrl.toLowerCase() !== 'localhost') {
      return NextResponse.json({ error: 'INVALID_DOMAIN' }, { status: 400, headers });
    }

    let normalized = rawUrl;
    if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;
    
    let parsed: URL;
    try { 
      parsed = new URL(normalized); 
    } catch {
      return NextResponse.json({ error: 'INVALID_DOMAIN' }, { status: 400, headers });
    }

    const host = parsed.hostname.toLowerCase();
    const isLocalHost = host === 'localhost' || host.endsWith('.localhost') || host === '127.0.0.1' || host === '0.0.0.0' || host === '::1';
    const isPrivateIp = host.startsWith('10.') || host.startsWith('192.168.') || host.startsWith('169.254.') || /^172\.(1[6-9]|2\d|3[0-1])\./.test(host);

    if (isPrivateIp || (process.env.NODE_ENV === 'production' && isLocalHost)) {
      return NextResponse.json({ error: 'INVALID_DOMAIN' }, { status: 400, headers });
    }

    /**
     * 🔴 ПРОВЕРКИ ВЫШЕ СМОТРЯТ НА НАПИСАНИЕ ИМЕНИ, А НЕ НА ТО, КУДА ОНО ВЕДЁТ.
     *
     * AIfaFocus по замыслу открывает адрес, который ввёл посторонний человек.
     * Строки `localtest.me` и `169.254.169.254.nip.io` выглядят как обычные
     * домены и проходят проверку написания — а разрешаются в 127.0.0.1 и в
     * службу метаданных облака соответственно. Так ломают сканеры сайтов.
     *
     * Здесь заслон смотрит на РАЗРЕШЁННЫЙ адрес. Прежние строки оставлены: они
     * дешевле (без обращения к серверу имён) и отсекают очевидное раньше.
     */
    if (!(await хостБезопасен(parsed.hostname))) {
      return NextResponse.json({ error: 'INVALID_DOMAIN' }, { status: 400, headers });
    }

    /**
     * 🔴 ДЫРА, ЗАКРЫТАЯ 29.08.2026: НАС МОЖНО БЫЛО ИСПОЛЬЗОВАТЬ КАК ЧУЖОЙ
     * СКРЕЙПЕР, И ЖАЛОБА ПРИШЛА БЫ НАМ.
     *
     * AIfaFocus устроен так, что запрос к проверяемому сайту уходит С НАШЕГО
     * сервера, а не с машины человека. В журналах владельца сайта записаны мы:
     * наш адрес, наш User-Agent, наше имя. Кто нажал кнопку — там не видно.
     *
     * Чем это грозило. Сто бесплатных учётных записей по три проверки в сутки
     * дают триста обращений к одному чужому сайту, и выглядит это как атака
     * от aifa.works. Дальше жалоба уходит не тому, кто это затеял, а нам и в
     * Vercel; Vercel вправе приостановить проект, и тогда лягут все четыре
     * сайта разом.
     *
     * Заслон двойной, потому что одного мало:
     *
     * 1. ПОДТВЕРЖДЕНИЕ ПРАВА. Человек прямо заявляет, что домен его или что он
     *    уполномочен. Это не формальность: защита «мы просто смотрели открытые
     *    страницы» слабее, чем «пользователь письменно подтвердил право», —
     *    в США это CFAA, в Германии § 202a StGB, в Британии Computer Misuse
     *    Act 1990. Подтверждение записывается вместе с временем, адресом сети
     *    и почтой, если человек вошёл.
     *
     * 2. СЧЁТЧИК ПО ЦЕЛИ. Галочку можно поставить не думая, поэтому рядом
     *    стоит техническая мера: один домен проверяется не больше трёх раз в
     *    сутки СО ВСЕХ учётных записей суммарно. Настоящему клиенту хватает с
     *    запасом — он проверяет свой сайт, чинит, проверяет снова. А выкачать
     *    через нас чужой сайт становится нельзя, сколько учёток ни заводи.
     *
     * Владельцу тарифа от партнёрского и выше счётчик по цели не применяется:
     * у него договор, и объём — предмет этого договора.
     */
    {
      const подтвердилПраво =
        тело?.подтверждаюПраво === true ||
        тело?.authorized === true ||
        тело?.iOwnThisDomain === true;

      if (!подтвердилПраво && уровеньТарифа < 4) {
        return NextResponse.json({
          error: 'AUTHORIZATION_REQUIRED',
          userMessage: {
            ru: 'Подтвердите, что вы владеете этим сайтом или уполномочены его проверять. '
              + 'Проверка обращается к сайту с нашего сервера, поэтому мы обязаны спросить.',
            en: 'Please confirm that you own this website or are authorised to scan it. '
              + 'The scan reaches the site from our server, so we are obliged to ask.',
            es: 'Confirme que es propietario de este sitio o que está autorizado a analizarlo. '
              + 'El análisis accede al sitio desde nuestro servidor, por eso debemos preguntar.',
            zh: '请确认您拥有该网站，或已获授权对其进行检测。'
              + '检测由我们的服务器发起访问，因此我们必须先行询问。',
          }[язык],
        }, { status: 403, headers });
      }

      if (уровеньТарифа < 4) {
        const { dbRateLimit } = await import('../../../lib/rate-limit-db');
        // Ключ по домену БЕЗ www: `example.com` и `www.example.com` — один сайт,
        // и считать их порознь значит удвоить предел одной буквой.
        const цель = host.replace(/^www\./, '');
        const целиХватает = await dbRateLimit(`scan:host:${цель}`, 3, 24 * 60 * 60_000);
        if (!целиХватает) {
          return NextResponse.json({
            error: 'TARGET_RATE_LIMITED',
            userMessage: {
              ru: `Сайт ${цель} сегодня уже проверяли трижды — это предел на один домен в сутки. `
                + 'Приходите завтра. Если вам нужен больший объём по своим сайтам, напишите нам: '
                + 'contact@codeofdigitaleternity.com',
              en: `The site ${цель} has already been scanned three times today — that is the daily limit per domain. `
                + 'Come back tomorrow. If you need a higher volume for your own sites, write to us: '
                + 'contact@codeofdigitaleternity.com',
              es: `El sitio ${цель} ya se ha analizado tres veces hoy: es el límite diario por dominio. `
                + 'Vuelva mañana. Si necesita mayor volumen para sus propios sitios, escríbanos: '
                + 'contact@codeofdigitaleternity.com',
              zh: `网站 ${цель} 今日已检测三次，这是每个域名每天的上限。`
                + '请明天再来。如果您需要为自有网站提高用量，请联系我们：contact@codeofdigitaleternity.com',
            }[язык],
            retryAfterHours: 24,
          }, { status: 429, headers });
        }
      }
    }

    const hasKeys = !!(ключГрока() || process.env.GEMINI_API_KEY);
    const activeLocale = locale || 'en';

    // Build URL queue
    const urlsToScan = scanSitemap ? await fetchSitemapUrls(normalized) : [normalized];
    const urlsToScanForHash = urlsToScan;

    const { scanContentHash, findFreshScan, saveScan } = await import('../../../lib/oracle-scans');

    // ── Слой А: детерминированные проверки ────────────────────────────────────
    // Выполняются ВСЕГДА и независимо от модели. Их вердикт выносит код, а не
    // языковая модель, поэтому у этих находок есть точное доказательство и они
    // повторяются от запуска к запуску. Если модель недоступна — клиент всё
    // равно получает настоящий результат, а не выдуманный.
    const {
      probeUrl, probeSiteFiles, probeDomainMail, probeGpcRespect,
      probeDnssec, probeImageDelivery, probeLogoutCleanup,
      detectConsentPlatform, scoreFromFindings,
    } = await import('../../../lib/oracle-probe');
    const probe = await Promise.allSettled([
      probeUrl(normalized),
      probeSiteFiles(parsed.origin),
      probeDomainMail(parsed.hostname),
      probeGpcRespect(normalized),
      // Три проверки ниже добавлены как «бесплатные»: каждая укладывается в один
      // запрос и не обращается к модели, то есть себестоимость скана не растёт.
      probeDnssec(parsed.hostname),
      probeLogoutCleanup(parsed.origin),
    ]);
    const probeMain = probe[0].status === 'fulfilled' ? probe[0].value : null;
    const probeFiles = probe[1].status === 'fulfilled' ? probe[1].value : [];
    const probeMail = probe[2].status === 'fulfilled' ? probe[2].value : [];
    const probeGpc = probe[3].status === 'fulfilled' ? probe[3].value : [];
    const probeDns = probe[4].status === 'fulfilled' ? probe[4].value : [];
    const probeLogout = probe[5].status === 'fulfilled' ? probe[5].value : [];
    // Картинки разбираются по странице, которую probeUrl уже скачал. Второй раз
    // качать то же самое — лишняя задержка клиенту и лишняя нагрузка на его
    // сервер, которую мы создали бы без всякой нужды.
    const probeImages = probeMain?.html ? probeImageDelivery(probeMain.html) : [];

    // Какой менеджер согласия стоит на сайте. Нарушением это не является и в
    // отчёт как находка не идёт — это служебная пометка: по ней сразу видно,
    // велика ли вероятность, что подтверждение отказа не показывается.
    const consentPlatform = probeMain?.html
      ? detectConsentPlatform(probeMain.html)
      : { vendor: null, showsConfirmationByDefault: null };

    // Отрасль клиента угадываем по тому, что сайт сам о себе пишет: заголовок
    // страницы и описание для поисковиков. Это простое сопоставление слов, без
    // модели — результат должен быть одинаковым при каждом прогоне.
    const sectorHintText = [
      probeMain?.html ? (probeMain.html.match(/<title[^>]*>([^<]{0,200})<\/title>/i)?.[1] ?? '') : '',
      probeMain?.html
        ? (probeMain.html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{0,300})["']/i)?.[1] ?? '')
        : '',
      parsed.hostname,
    ].join(' ');
    const guessedSector = guessSector(sectorHintText);
    const sectorRisk = riskForSector(guessedSector);
    // Находки приходят из проб по-русски: их дело — измерять, а не оформлять,
    // и переменной locale у них нет вовсе. Поэтому язык подставляется здесь,
    // один раз на весь собранный список, по коду каждой находки.
    //
    // Без этого англоязычный клиент открывал наш отчёт о СВОЁМ сайте и видел
    // кириллицу — письмо прочитано, ссылка открыта, и цепочка обрывалась на
    // последнем шаге. Переведены названия, доказательства, источники и советы
    // по исправлению; всё, чему перевода нет, остаётся как пришло — пустое
    // поле хуже непереведённого.
    const provenFindings = localizeFindings([
      ...(probeMain?.findings || []), ...probeFiles, ...probeMail, ...probeGpc,
      ...probeDns, ...probeLogout, ...probeImages,
    ], activeLocale);

    const blueprints: { url: string; blueprint: string; parsed: any }[] = [];

    // Crawl all targets sequentially or in parallel
    for (const targetUrl of urlsToScan) {
      try {
        const bp = await scrapePageBlueprint(targetUrl);
        blueprints.push({ url: targetUrl, blueprint: bp, parsed: JSON.parse(bp) });
      } catch (scrapeErr: any) {
        console.warn(`[scan] scrape failed for ${targetUrl}:`, String(scrapeErr));
        if (targetUrl === normalized) {
          // Сайт не открылся. Раньше здесь подставлялся выдуманный отчёт —
          // теперь честно говорим, что не смогли получить страницу.
          return NextResponse.json({ error: 'DOMAIN_UNREACHABLE' }, { status: 400, headers });
        }
      }
    }

    if (blueprints.length === 0 && !provenFindings.length) {
      return NextResponse.json({ error: 'DOMAIN_UNREACHABLE' }, { status: 400, headers });
    }

    // ── Кэш на сутки ──────────────────────────────────────────────────────────
    //
    // ЧТО БЫЛО НЕ ТАК. Отпечаток считался ТОЛЬКО по адресу сайта, языку и списку
    // страниц — то есть по сути был кэшем «по домену на сутки», хотя назывался
    // отпечатком содержимого. Последствие поймано на живой проверке своего же
    // radiocode: сайт был починен, заголовки изменились, а сканер сутки отдавал
    // старый отчёт со старыми нарушениями. Для платной услуги это худший вид
    // ошибки: клиент платит за починку, перепроверяет — и видит, что ничего не
    // изменилось.
    //
    // КАК СТАЛО. Отпечаток считается по тому, что реально увидели на сайте:
    // по доказательствам детерминированных проверок (в них входят заголовки
    // ответа) и по разобранной структуре страниц. Любая настоящая правка сайта
    // меняет отпечаток и запускает полный разбор заново. Неизменившийся сайт
    // по-прежнему отвечает из кэша.
    //
    // ПОЧЕМУ ПРОВЕРКА ПЕРЕЕХАЛА СЮДА. Экономить нужно на дорогом — на обращении
    // к языковой модели, куда уходит весь перечень правил. Сами проверки и
    // разбор страниц стоят копейки, поэтому их выполняем всегда: именно они и
    // дают отпечаток.
    const fingerprint = [
      provenFindings.map((f) => `${f.code}:${f.evidence}`).sort().join('|'),
      blueprints.map((b) => b.blueprint).join('|'),
    ].join('||');
    const contentHash = scanContentHash(parsed.hostname, activeLocale, [
      ...urlsToScanForHash,
      fingerprint,
    ]);
    // При еженедельной перепроверке кэш обходим намеренно: смысл именно в том,
    // чтобы увидеть, что изменилось за неделю, а не вернуть прошлый отчёт.
    const cached = rescan ? null : await findFreshScan(contentHash, 24);
    if (cached && cached.payload) {
      return NextResponse.json({ ...(cached.payload as object), scanId: cached.id, cached: true }, { headers });
    }

    // ── Слой Б: языковая модель ───────────────────────────────────────────────
    // Модель НЕ решает, есть ли нарушение по доказанным пунктам — она лишь
    // дополняет картину по тем проверкам реестра, которые нельзя вычислить
    // формально (тексты, смысл, полнота раскрытия).
    let engineUsed = 'deterministic-only';
    const analyzePromises = blueprints.map(async (bp) => {
      if (!hasKeys) return { url: bp.url, violations: [] as GrokViolation[], parsed: bp.parsed };
      try {
        const { violations, engine } = await analyzeWithGrok(bp.blueprint, activeLocale);
        engineUsed = engine;
        return { url: bp.url, violations, parsed: bp.parsed };
      } catch (err) {
        // Никаких выдуманных результатов: пустой список, и об этом честно
        // сообщается в ответе полем engine.
        console.warn(`[scan] модель не ответила для ${bp.url}:`, String(err));
        return { url: bp.url, violations: [] as GrokViolation[], parsed: bp.parsed };
      }
    });

    // 🔴 СРОК НА СЛОЙ МОДЕЛИ. Без него `Promise.all` ждёт столько, сколько
    // понадобится, и на трёх страницах упирается в шестидесятисекундный
    // потолок платформы — та убивает функцию, и человек получает пустоту.
    //
    // Оставляем 12 секунд на всё, что идёт ПОСЛЕ модели: сведение находок,
    // подсчёт балла, запись отчёта и отдачу ответа. Если модель не уложилась
    // — берём разбор без неё. Поле engine честно скажет, что модели не было.
    const ОСТАТОК_НА_СБОРКУ_МС = 12_000;
    const ПОТОЛОК_МС = maxDuration * 1000;
    const срокМодели = Math.max(5_000, ПОТОЛОК_МС - (Date.now() - стартЗапроса) - ОСТАТОК_НА_СБОРКУ_МС);

    type РазборСтраницы = Awaited<(typeof analyzePromises)[number]>;
    let модельУспела = true;
    const analysisResults: РазборСтраницы[] = await Promise.race([
      Promise.all(analyzePromises),
      new Promise<РазборСтраницы[]>((resolve) =>
        setTimeout(() => {
          модельУспела = false;
          console.warn(`[scan] слой модели не уложился в ${срокМодели} мс — отдаю детерминированный разбор`);
          resolve(blueprints.map((bp) => ({ url: bp.url, violations: [] as GrokViolation[], parsed: bp.parsed })));
        }, срокМодели),
      ),
    ]);
    if (!модельУспела) engineUsed = 'deterministic-only (model timed out)';

    // Merge multi-page violations
    const activeThreatMatrix = getThreatMatrix(activeLocale);
    const activeLawMeta = getLawMeta(activeLocale);
    const threatMap = new Map<number, FoundThreat>();

    for (const r of analysisResults) {
      const pagePath = new URL(r.url).pathname;
      const pageLabel = pagePath === '/' ? 'Home Page' : pagePath;
      
      for (const v of r.violations) {
        const check = activeThreatMatrix.find((c) => c.id === v.id);
        if (!check) continue;
        const law = activeLawMeta[check.category as Category];
        const violatingHtml = getViolatingHtml(check.code, check.category, r.parsed);
        
        const existing = threatMap.get(v.id);
        if (existing) {
          existing.evidence += ` | [${pageLabel}]: ${v.evidence}`;
          if (violatingHtml) {
            existing.violatingHtml = existing.violatingHtml 
              ? `${existing.violatingHtml}\n<!-- [${pageLabel}] -->\n${violatingHtml}`
              : violatingHtml;
          }
        } else {
          threatMap.set(v.id, {
            id: check.id,
            code: check.code,
            title: check.title,
            description: check.description,
            severity: check.severity,
            category: check.category as Category,
            evidenceKind: (check as { evidenceKind?: 'observable' | 'indicative' }).evidenceKind ?? 'observable',
            evidence: `[${pageLabel}]: ${v.evidence || (activeLocale === 'ru' ? 'Нарушение обнаружено.' : 'Violation discovered.')}`,
            lawName: law.lawName,
            lawUrl: law.lawUrl,
            fineAmount: law.fineAmount,
            consequence: law.reportingConsequence,
            violatingHtml,
          });
        }
      }
    }

    // ПОМЕТКА «ДОКАЗАНО» НА ЯЗЫКЕ ОТЧЁТА.
    //
    // Она отличает найденное кодом от того, что предположила модель, — клиент
    // должен видеть, где факт, а где мнение. Раньше слово было русским всегда,
    // и англоязычный клиент видел кириллицу в самом заметном месте отчёта.
    //
    // ОСТОРОЖНО: по этой пометке идёт ФИЛЬТРАЦИЯ в app/api/scan/report/route.ts
    // и report/json/route.ts. Там теперь проверяется любой из четырёх вариантов;
    // добавляя язык сюда, добавьте его и там, иначе отчёт потеряет деление на
    // доказанное и предполагаемое.
    const PROVEN_LABEL: Record<string, string> = {
      ru: 'ДОКАЗАНО', en: 'PROVEN', es: 'PROBADO', zh: '已验证',
    };

    // ── Доказанные находки идут первыми ───────────────────────────────────────
    // Они получены кодом, у каждой есть точное значение из ответа сервера.
    // Пометка [ДОКАЗАНО] отличает их от того, что предположила модель, — так
    // клиент видит, где факт, а где мнение.
    const provenThreats: FoundThreat[] = provenFindings.map((pf, i) => ({
      id: 900000 + i,
      code: pf.code,
      title: pf.title,
      description: pf.remedy,
      severity: pf.severity,
      category: 'Digital Operations' as Category,
      evidence: `[${PROVEN_LABEL[activeLocale] || PROVEN_LABEL.en} · ${pf.source}] ${pf.evidence}`,
      lawName: activeLawMeta['Digital Operations']?.lawName ?? 'Security & Privacy Baseline',
      lawUrl: activeLawMeta['Digital Operations']?.lawUrl ?? 'https://owasp.org/www-project-secure-headers/',
      fineAmount: activeLawMeta['Digital Operations']?.fineAmount ?? '—',
      consequence: pf.remedy,
    }));

    // Порядок: сначала доказанное, затем предположения — и всё по серьёзности.
    const rank: Record<string, number> = { critical: 0, serious: 1, moderate: 2, advisory: 3 };
    const modelThreats = Array.from(threatMap.values())
      .sort((a, b) => (rank[a.severity] ?? 9) - (rank[b.severity] ?? 9))
      .slice(0, 12);          // было 25: половина уходила шаблонным шумом

    const allThreats = [...provenThreats, ...modelThreats];

    // Оценка по весам серьёзности, а не «2000 минус число находок»: раньше сайт
    // с одной критической дырой получал 1999 из 2000 и выглядел почти идеальным.
    // ОЦЕНКА СЧИТАЕТСЯ ТОЛЬКО ПО ДОКАЗАННОМУ. Точка.
    //
    // Предположения модели на балл не влияют вообще. Половинчатое решение
    // («догадки весят меньше») было неправильным по сути: если мы не можем
    // доказать находку, мы не имеем права снижать за неё оценку чужого сайта.
    // Либо факт с точным значением из ответа сервера — либо это не основание
    // для цифры, которую человек понесёт в банк или к аудитору.
    //
    // Предположения остаются в отчёте отдельным разделом «требует проверки»,
    // но их место — рядом с находками, а не внутри балла.
    const score = scoreFromFindings(provenThreats);

    // К каждой находке добавляем её НАСТОЯЩУЮ юрисдикцию.
    //
    // В реестре десять категорий, и они не соответствуют содержимому: 633
    // неевропейских закона лежат в «GDPR», 169 латиноамериканских — в «CCPA».
    // Клиент из Бразилии видел «GDPR» и не понимал, что проверка про его LGPD.
    // Сам реестр не трогаем (это 8000 записей в четырёх файлах и весь код
    // вокруг), а юрисдикцию определяем по коду проверки — он её уже несёт.
    const { jurisdictionOf, jurisdictionSummary, jurisdictionLabel } = await import('../../../lib/jurisdiction');
    for (const t of allThreats) {
      const j = jurisdictionOf(t.code);
      (t as FoundThreat & Record<string, unknown>).jurisdiction = jurisdictionLabel(j.region, activeLocale);
      (t as FoundThreat & Record<string, unknown>).jurisdictionLaw = jurisdictionLabel(j.law, activeLocale);
      (t as FoundThreat & Record<string, unknown>).jurisdictionFlag = j.flag;
    }

    const payload = {
      score,
      jurisdictions: jurisdictionSummary(allThreats.map((t) => t.code))
        .map((x) => ({ ...x, region: jurisdictionLabel(x.region, activeLocale) })),
      totalIssues: allThreats.length,
      topIssues: allThreats.slice(0, 5),
      allThreats,
      targetUrl: normalized,
      engine: engineUsed,
      provenCount: provenThreats.length,
      scannedPages: blueprints.map((b) => b.url),
      scoreScale: 100,
      // Служебная пометка, не находка: какой менеджер согласия стоит на сайте и
      // показывает ли он подтверждение отказа сам, «из коробки». По ней видно,
      // велика ли вероятность нарушения требования Калифорнии, действующего
      // с 1 января 2026 года, — и всё это без единого обращения к модели.
      consentPlatform,
      // Оценка риска в деньгах ПО ОТРАСЛИ, а не «штраф до 20 млн евро».
      //
      // Верхний предел закона выписывали считанным компаниям планетарного
      // масштаба; написать его директору небольшой фирмы — значит запугивать,
      // и он это чувствует. Здесь вместо предела идут реальные числа из
      // открытого реестра ЕС: сколько раз в ЕГО отрасли штрафовали, какая
      // медиана, какой типичный случай.
      //
      // Отрасль угадывается по тексту самого сайта простым сопоставлением
      // слов — без обращения к модели, чтобы результат был предсказуем. Если
      // отрасль не определилась или дел по ней меньше десяти, поле пустое:
      // подставлять чужую статистику хуже, чем не сказать ничего.
      sectorRisk,
      // Сравнение с другими сайтами той же отрасли из НАШЕЙ выборки.
      //
      // «У вас 34» отмахнуть легко: наверное, у всех так. «У вас 34, середина
      // по отрасли 61, вы позади семи из десяти» задевает не страх, а
      // самолюбие — и это единственное, что заставляет человека действовать
      // без нашего давления.
      //
      // Пусто, если отрасль не определилась или сайтов в ней меньше восьми: по
      // трём соседям середина — это не середина, а совпадение. Формулировка
      // всегда говорит «среди проверенных нами», а не «в вашей отрасли»:
      // второе мы доказать не можем.
      peers: await peerComparison(guessedSector, score, parsed.hostname),
    };

    // Номер проверки. Без него «сертификат» на /audit-verify строился прямо из
    // адресной строки: любой правил ?score=2000 и получал «A+» с нашим брендом.
    // Теперь подтвердить отчёт можно только по номеру, и данные берутся из базы.
    const scanId = await saveScan({
      domain: parsed.hostname,
      contentHash,
      score,
      totalIssues: allThreats.length,
      provenCount: provenThreats.length,
      engine: engineUsed,
      locale: activeLocale,
      payload,
      sector: guessedSector,
    });

    return NextResponse.json({ ...payload, scanId, cached: false } as ScanResponse & Record<string, unknown>, { headers });

  } catch (err) {
    // 🔴 ПОЧЕМУ ЗДЕСЬ ТЕПЕРЬ userMessage И КОД.
    //
    // Замер 20.08.2026 на живом сайте: Архитектор запустил проверку и увидел
    // «[ОШИБКА] Ошибка сканирования.» — строку без единого слова о причине.
    // Разбор: этот ответ отдавал только `error: 'Scan failed'`. Такой код не
    // совпадает ни с INVALID_DOMAIN, ни с DOMAIN_UNREACHABLE, а поля
    // userMessage у него не было вовсе — и на экране оставалась безликая
    // «ошибка». Человек, пришедший за аудитом, видел поломку и уходил, а мы
    // не могли сказать, что именно упало: в ответе не было НИЧЕГО.
    //
    // Теперь ответ несёт три вещи: человеческий текст (его показывает
    // интерфейс вместо «ошибки»), устойчивый код SCAN_FAILED и короткую
    // причину — по ней видно, что произошло, без чтения журналов Vercel.
    // Внутренности наружу не выносим: только имя ошибки и первая строка.
    const причина =
      err instanceof Error
        ? `${err.name}: ${String(err.message).slice(0, 200)}`
        : String(err).slice(0, 200);
    console.error('[scan] unhandled API error:', err);
    // Язык берём НЕ из activeLocale: она объявлена внутри try и в catch не
    // существует — обращение к ней уронило бы сам обработчик отказа, то есть
    // сделало бы хуже, чем было. Читаем язык заново и безопасно.
    let языкОтказа = 'en';
    try {
      const url = new URL(req.url);
      const изАдреса = url.searchParams.get('locale');
      if (изАдреса && ['ru', 'es', 'zh', 'en'].includes(изАдреса)) языкОтказа = изАдреса;
    } catch { /* адрес не разобрался — остаётся английский */ }
    const текстПоЯзыку: Record<string, string> = {
      ru: 'Проверка не завершилась — сайт ответил не так, как мы ожидали. Попробуйте ещё раз через минуту: часто это временная заминка на стороне проверяемого сайта. Если повторится, напишите нам, мы разберёмся вручную.',
      es: 'El análisis no se completó: el sitio respondió de forma inesperada. Inténtelo de nuevo en un minuto; suele ser una interrupción temporal del sitio analizado. Si se repite, escríbanos y lo revisaremos manualmente.',
      zh: '扫描未能完成——目标网站的响应与预期不符。请一分钟后重试，这通常是被扫描网站的临时故障。如果反复出现，请联系我们，我们会人工检查。',
      en: 'The scan did not finish — the site responded in a way we did not expect. Try again in a minute; this is usually a temporary hiccup on the scanned site. If it keeps happening, write to us and we will look into it by hand.',
    };
    return NextResponse.json(
      {
        error: 'SCAN_FAILED',
        userMessage: текстПоЯзыку[языкОтказа] || текстПоЯзыку.en,
        reason: причина,
      },
      { status: 500, headers },
    );
  }
}
