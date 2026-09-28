/**
 * Глубокая проверка — платный уровень, запускается ТОЛЬКО после оплаты.
 *
 * ЗАЧЕМ ЭТОТ ФАЙЛ ПОЯВИЛСЯ. Бесплатная проверка смотрит на сайт снаружи одним
 * запросом: заголовки, разметка, DNS. Этого достаточно, чтобы показать
 * человеку доказанную проблему и начать разговор, но глубина у неё небольшая.
 * Крупные сканеры (Acunetix, Qualys, Detectify) идут дальше: обходят страницы,
 * ищут открытые служебные пути, устаревшие библиотеки, слабые места форм.
 *
 * ЧЕГО ЗДЕСЬ НЕТ И НЕ БУДЕТ. Мы НЕ атакуем. Никаких попыток подбора паролей,
 * никакой нагрузки на сервер, никаких вредоносных полезных нагрузок в формах.
 * Всё, что делает этот файл, — обычные запросы, какие делает браузер, только
 * их больше и они умнее. Причина не в скромности: проверка чужого сайта
 * атакующими средствами без письменного разрешения незаконна в большинстве
 * стран, а разрешение у нас появляется только после договора — и даже тогда
 * оно ограничено рамками этого договора.
 *
 * ПОЭТОМУ доступ к этим проверкам открывается только после оплаты: не ради
 * жадности, а потому что до договора у нас нет права заглядывать глубже.
 */

import type { ProbeFinding } from './oracle-probe';

/** Ответ с сокращённым телом — чтобы не тащить в память мегабайты. */
async function grab(url: string, timeoutMs = 10000): Promise<{ status: number; headers: Headers; body: string } | null> {
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AIfa-Oracle-Deep/1.0; +https://aifa.works/oracle)' },
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
    });
    const body = (await r.text()).slice(0, 300_000);
    return { status: r.status, headers: r.headers, body };
  } catch { return null; }
}

/**
 * Устаревшие библиотеки на странице.
 *
 * Почему это важно клиенту: старая версия популярной библиотеки — самый частый
 * способ попасть в чужие руки. Взломщику не нужно ничего изобретать: уязвимость
 * опубликована, готовый код лежит в открытом доступе, остаётся найти сайт,
 * который не обновился. Именно так ломают большинство небольших сайтов.
 */
export function probeOutdatedLibraries(html: string): ProbeFinding[] {
  const out: ProbeFinding[] = [];
  // Версия обычно видна прямо в адресе файла. Берём распространённые
  // библиотеки, у которых есть известные опубликованные уязвимости в старых
  // ветках, и сравниваем по номеру ветки, а не по точной версии: точный
  // разбор всех выпусков снаружи невозможен, а ветка говорит достаточно.
  const rules: Array<{ name: string; re: RegExp; unsafeBelow: [number, number]; why: string }> = [
    { name: 'jQuery', re: /jquery[.-]?(\d+)\.(\d+)(?:\.\d+)?(?:\.min)?\.js/i, unsafeBelow: [3, 5],
      why: 'в ветках ниже 3.5 есть опубликованная уязвимость подстановки кода через разбор HTML' },
    { name: 'Bootstrap', re: /bootstrap[.-]?(\d+)\.(\d+)(?:\.\d+)?(?:\.min)?\.(?:js|css)/i, unsafeBelow: [4, 4],
      why: 'в ветках ниже 4.4 есть опубликованные уязвимости подстановки кода во всплывающих подсказках' },
    { name: 'AngularJS', re: /angular[.-]?(\d+)\.(\d+)(?:\.\d+)?(?:\.min)?\.js/i, unsafeBelow: [1, 8],
      why: 'AngularJS снят с поддержки в декабре 2021 года: новых исправлений безопасности для него не выходит' },
    { name: 'Lodash', re: /lodash[.-]?(\d+)\.(\d+)(?:\.\d+)?(?:\.min)?\.js/i, unsafeBelow: [4, 17],
      why: 'в ветках ниже 4.17 есть опубликованная уязвимость подмены свойств объекта' },
  ];
  // Версия в адресе файла — не единственный источник. Сборщики прячут её за
  // хэшем (`jquery.lc-7842899…min.js`), и тогда по имени файла не узнать
  // ничего. Зато WordPress — а на нём почти весь малый бизнес — подставляет
  // версию отдельным параметром: `jquery.min.js?ver=3.6.0`. Поймано на живом
  // abacusplumbing.com, где первая версия детектора не нашла ничего.
  const byQuery: Array<[string, RegExp]> = [
    ['jQuery', /jquery(?:\.min)?\.js\?ver=(\d+)\.(\d+)/i],
    ['Bootstrap', /bootstrap(?:\.min)?\.(?:js|css)\?ver=(\d+)\.(\d+)/i],
  ];

  for (const r of rules) {
    let m = html.match(r.re);
    if (!m) {
      const alt = byQuery.find(([n]) => n === r.name);
      if (alt) m = html.match(alt[1]);
    }
    if (!m) continue;
    const major = Number(m[1]); const minor = Number(m[2]);
    const [uMaj, uMin] = r.unsafeBelow;
    if (major < uMaj || (major === uMaj && minor < uMin)) {
      out.push({
        code: 'DEEP-LIB-001',
        title: `Устаревшая версия ${r.name} (${major}.${minor})`,
        severity: 'serious',
        evidence: `На странице подключён файл ${m[0]} — это ветка ${major}.${minor}, ${r.why}`,
        source: 'исходный код страницы',
        remedy: `Обновить ${r.name} минимум до ${uMaj}.${uMin}. Обновление библиотек — самая дешёвая защита: уязвимость уже опубликована, и её ищут автоматически, а не вручную.`,
      });
    }
  }
  return out;
}

/**
 * Версия системы управления сайтом и её возраст.
 *
 * Почему это важно клиенту: WordPress держит больше сорока процентов всех
 * сайтов, и он же — самая частая цель массового взлома. Взломщик не выбирает
 * жертву: робот перебирает сайты, читает версию и, если она старая, запускает
 * готовый набор. Старая версия — это не «когда-нибудь потом», это вопрос
 * недель.
 *
 * Версия видна в служебной метке страницы, которую движок ставит сам.
 */
export function probeCmsVersion(html: string): ProbeFinding[] {
  const out: ProbeFinding[] = [];
  const wp = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']WordPress\s+(\d+)\.(\d+)(?:\.(\d+))?["']/i);
  if (wp) {
    const major = Number(wp[1]); const minor = Number(wp[2]);
    out.push({
      code: 'DEEP-CMS-001',
      title: `Версия WordPress объявлена публично: ${major}.${minor}`,
      severity: major < 6 || (major === 6 && minor < 5) ? 'serious' : 'moderate',
      evidence: `В служебной метке страницы указано: WordPress ${major}.${minor}${wp[3] ? '.' + wp[3] : ''}`,
      source: 'исходный код страницы',
      remedy: major < 6 || (major === 6 && minor < 5)
        ? `Обновить WordPress: ветка ${major}.${minor} устарела, для неё опубликованы уязвимости, и роботы перебирают сайты именно по этой метке.`
        : 'Убрать служебную метку с версией из разметки. Версия сама по себе не уязвимость, но она превращает случайный перебор в прицельный.',
    });
  }
  const joomla = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']Joomla!?\s*(\d+)\.(\d+)/i);
  if (joomla) {
    out.push({
      code: 'DEEP-CMS-002',
      title: `Версия Joomla объявлена публично: ${joomla[1]}.${joomla[2]}`,
      severity: 'moderate',
      evidence: `В служебной метке страницы указано: Joomla ${joomla[1]}.${joomla[2]}`,
      source: 'исходный код страницы',
      remedy: 'Убрать служебную метку с версией и убедиться, что движок обновлён.',
    });
  }
  return out;
}

/**
 * Открытые служебные пути.
 *
 * Почему это важно клиенту: панель входа, резервная копия базы или файл с
 * настройками, открытые всему интернету, — это не «теоретический риск», а
 * готовый вход. Роботы перебирают такие адреса круглосуточно; человека,
 * который «просто не знал, что этот файл виден», это не спасает.
 *
 * Мы только ПРОВЕРЯЕМ наличие. Ничего не скачиваем, не открываем архивы, не
 * пробуем пароли. Это принципиально: разница между «дверь не заперта» и
 * «вошёл внутрь» — это разница между аудитом и взломом.
 */
export async function probeExposedPaths(origin: string): Promise<ProbeFinding[]> {
  const out: ProbeFinding[] = [];
  const targets: Array<{ path: string; what: string; severity: ProbeFinding['severity'] }> = [
    { path: '/.git/HEAD', what: 'служебная папка системы контроля версий — из неё восстанавливается весь исходный код сайта', severity: 'critical' },
    { path: '/.env', what: 'файл с настройками — в нём обычно лежат пароли к базе и ключи к платёжным системам', severity: 'critical' },
    { path: '/backup.sql', what: 'резервная копия базы данных', severity: 'critical' },
    { path: '/dump.sql', what: 'выгрузка базы данных', severity: 'critical' },
    { path: '/wp-config.php.bak', what: 'резервная копия файла настроек WordPress с паролем к базе', severity: 'critical' },
    { path: '/phpinfo.php', what: 'страница диагностики: раскрывает версии, пути на диске и настройки сервера', severity: 'serious' },
    { path: '/server-status', what: 'страница состояния сервера: показывает адреса всех текущих посетителей', severity: 'serious' },
    { path: '/.DS_Store', what: 'служебный файл macOS — раскрывает список файлов в папке', severity: 'moderate' },
    { path: '/composer.lock', what: 'список установленных библиотек с точными версиями — подсказка для подбора уязвимости', severity: 'moderate' },
    { path: '/package-lock.json', what: 'список установленных библиотек с точными версиями', severity: 'moderate' },
  ];

  const checks = await Promise.allSettled(targets.map(async (t) => {
    const r = await grab(origin + t.path, 7000);
    if (!r || r.status !== 200) return null;
    // Проверяем, что это действительно файл, а не страница «не найдено»,
    // отданная с кодом 200. Иначе обвиним половину сайтов на пустом месте.
    const looksLikeHtmlPage = /<html|<!doctype html/i.test(r.body.slice(0, 400));
    if (looksLikeHtmlPage && !t.path.endsWith('.php')) return null;
    if (t.path === '/.git/HEAD' && !/^ref:\s/.test(r.body)) return null;
    if (t.path === '/.env' && !/[A-Z_]{3,}\s*=/.test(r.body)) return null;
    if (t.path.endsWith('.sql') && !/CREATE TABLE|INSERT INTO/i.test(r.body)) return null;
    if (t.path === '/phpinfo.php' && !/phpinfo\(\)|PHP Version/i.test(r.body)) return null;
    return t;
  }));

  for (const c of checks) {
    if (c.status !== 'fulfilled' || !c.value) continue;
    const t = c.value;
    out.push({
      code: 'DEEP-EXPO-001',
      title: `Открыт служебный файл ${t.path}`,
      severity: t.severity,
      evidence: `Запрос ${t.path} вернул содержимое, а не отказ. Это ${t.what}`,
      source: 'прямой запрос по адресу',
      remedy: `Закрыть доступ к ${t.path} на уровне сервера и убрать файл с боевой площадки. Мы только проверили наличие и ничего не скачивали.`,
    });
  }
  return out;
}

/**
 * Формы, отправляющие данные без защиты.
 *
 * Почему это важно клиенту: форма, отправляющая данные без шифрования или на
 * чужой домен, — это утечка по построению. Человек вводит телефон и адрес,
 * будучи уверен, что пишет в компанию.
 */
export function probeFormSafety(html: string, origin: string): ProbeFinding[] {
  const out: ProbeFinding[] = [];
  const forms = [...html.matchAll(/<form\b[^>]*>/gi)].map((m) => m[0]);
  for (const f of forms) {
    const action = (f.match(/action=["']([^"']+)["']/i) || [])[1] || '';
    if (/^http:\/\//i.test(action)) {
      out.push({
        code: 'DEEP-FORM-001',
        title: 'Форма отправляет данные без шифрования',
        severity: 'critical',
        evidence: `Форма отправляет данные на ${action.slice(0, 120)} — это незашифрованный канал, содержимое видно любому на пути`,
        source: 'исходный код страницы',
        remedy: 'Перевести приём формы на защищённый адрес (https). Пока этого нет, всё введённое посетителем читается по дороге.',
      });
    } else if (/^https?:\/\//i.test(action)) {
      try {
        const to = new URL(action).origin;
        if (to !== origin && !/google|hubspot|mailchimp|formspree|typeform|calendly/i.test(to)) {
          out.push({
            code: 'DEEP-FORM-002',
            title: 'Форма отправляет данные на посторонний домен',
            severity: 'serious',
            evidence: `Форма отправляет введённые данные на ${to} — это не домен сайта`,
            source: 'исходный код страницы',
            remedy: 'Проверить, что этот получатель ожидаем и указан в политике конфиденциальности. Посетитель считает, что пишет вам, а не третьей стороне.',
          });
        }
      } catch { /* некорректный адрес — молчим */ }
    }
  }
  return out;
}

/**
 * Обход нескольких страниц вместо одной.
 *
 * Почему это важно: бесплатная проверка смотрит главную. Настоящие проблемы
 * чаще прячутся глубже — на странице входа, в корзине, в форме заявки.
 * Здесь мы аккуратно проходим до заданного числа внутренних страниц.
 *
 * Про нагрузку: между запросами выдерживается пауза, число страниц ограничено.
 * Мы приходим к клиенту как гость, а не как нагрузочный тест.
 */
export async function crawlInternalPages(origin: string, html: string, maxPages = 12): Promise<string[]> {
  const found = new Set<string>();
  const skip = /\.(png|jpe?g|gif|svg|webp|css|js|pdf|zip|mp4|mp3|woff2?|ico)$/i;

  // Берём И относительные ссылки, И полные — но только на тот же домен.
  // Первая версия ловила только относительные, и на сайте, который пишет
  // полные адреса, обход собирал ровно одну страницу. Поймано на живом
  // abacusplumbing.com: страниц пройдено 1 вместо шести.
  for (const m of html.matchAll(/href=["']([^"'#\s]{1,200})["']/gi)) {
    const raw = m[1];
    if (skip.test(raw)) continue;
    let abs: string;
    if (raw.startsWith('/')) abs = origin + raw.split('?')[0];
    else if (/^https?:\/\//i.test(raw)) {
      try {
        const u = new URL(raw);
        // Домен с www и без — один и тот же сайт, но origin у них разный.
        const same = u.origin === origin
          || u.hostname.replace(/^www\./, '') === new URL(origin).hostname.replace(/^www\./, '');
        if (!same) continue;
        abs = u.origin + u.pathname;
      } catch { continue; }
    } else continue;
    if (abs === origin || abs === origin + '/') continue;
    found.add(abs);
    if (found.size >= maxPages * 4) break;
  }
  // Приоритет страницам, где обычно и живут проблемы.
  const weight = (u: string) =>
    /login|signin|account|cart|checkout|contact|form|register|payment|admin/i.test(u) ? 0 : 1;
  return [...found].sort((a, b) => weight(a) - weight(b) || a.localeCompare(b)).slice(0, maxPages);
}

/**
 * Полная глубокая проверка. Возвращает находки и перечень пройденных страниц.
 *
 * ВАЖНО ПРО ПРАВО. Вызывать только для сайтов, владелец которых заключил с
 * нами договор. Проверка чужого сайта таким способом без разрешения — не
 * «серая зона», а нарушение закона о доступе к компьютерным системам в США,
 * ЕС и большинстве других стран.
 */
export async function deepScan(url: string, opts: { maxPages?: number } = {}): Promise<{
  findings: ProbeFinding[];
  pagesScanned: string[];
}> {
  const origin = new URL(url).origin;
  const root = await grab(url, 14000);
  if (!root) return { findings: [], pagesScanned: [] };

  const findings: ProbeFinding[] = [
    ...probeOutdatedLibraries(root.body),
    ...probeCmsVersion(root.body),
    ...probeFormSafety(root.body, origin),
    ...(await probeExposedPaths(origin)),
  ];

  const pages = await crawlInternalPages(origin, root.body, opts.maxPages ?? 12);
  const scanned = [url];

  for (const p of pages) {
    // Пауза между страницами: мы гость на чужом сервере, а не нагрузка.
    await new Promise((r) => setTimeout(r, 400));
    const page = await grab(p, 9000);
    if (!page) continue;
    scanned.push(p);
    findings.push(
      ...probeOutdatedLibraries(page.body),
      ...probeCmsVersion(page.body),
      ...probeFormSafety(page.body, origin),
    );
  }

  // Одинаковые находки с разных страниц схлопываем: клиенту нужен перечень
  // проблем, а не двенадцать копий одной и той же.
  const seen = new Set<string>();
  const unique = findings.filter((f) => {
    const key = `${f.code}|${f.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { findings: unique, pagesScanned: scanned };
}
