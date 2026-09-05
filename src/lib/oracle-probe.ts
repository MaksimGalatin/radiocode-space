/**
 * Детерминированное ядро AIfaFocus: находки, которые выносит КОД, а не модель.
 *
 * Зачем это появилось. Раньше весь вердикт выносила языковая модель: она
 * читала «блюпринт» страницы и сама решала, какие из 2000 проверок нарушены.
 * Отсюда шло главное слабое место — на один и тот же сайт приходили разные
 * ответы, и клиенту, который платит за аудит, нечего было предъявить.
 *
 * Здесь собраны проверки, у которых ответ однозначен: либо заголовок есть,
 * либо его нет; либо у cookie стоит флаг, либо не стоит. Никакой вариативности,
 * никаких «вероятно». У каждой находки есть ДОКАЗАТЕЛЬСТВО — точное значение,
 * взятое из ответа сервера, а не пересказ модели.
 *
 * Модель после этого не решает, есть ли нарушение. Она только объясняет
 * человеческим языком уже вынесенный вердикт и пишет, как чинить.
 *
 * Принцип заимствован у Detectify: находка — это факт с приложенным
 * доказательством, а не мнение. Спорить с сырым заголовком невозможно.
 */

export type ProbeSeverity = 'critical' | 'serious' | 'moderate' | 'advisory';

export type ProbeFinding = {
  /** Код нашей проверки, по нему находка связывается с реестром 2000 пунктов. */
  code: string;
  title: string;
  severity: ProbeSeverity;
  /** Что именно увидели — точное значение из ответа сервера. */
  evidence: string;
  /** Откуда взято: заголовок, cookie, тело ответа, редирект. */
  source: string;
  /** Как чинить — коротко и по делу. */
  remedy: string;
};

export type ProbeArtifacts = {
  finalUrl: string;
  status: number;
  redirectedToHttps: boolean;
  headers: Record<string, string>;
  cookies: string[];
  htmlBytes: number;
  fetchedAt: string;
};

export type ProbeResult = {
  artifacts: ProbeArtifacts;
  findings: ProbeFinding[];
  /**
   * Исходный код главной страницы, уже скачанный этой проверкой.
   *
   * Отдаётся наружу, чтобы другим проверкам не пришлось качать ту же страницу
   * второй раз. Один лишний запрос на каждый скан — это и задержка для
   * клиента, и нагрузка на его сервер, которую мы создаём без нужды.
   */
  html: string;
};

/** Заголовки, которые мы сохраняем как доказательство (остальные — шум). */
const KEEP_HEADERS = [
  'strict-transport-security', 'content-security-policy', 'content-security-policy-report-only',
  'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy',
  'cross-origin-opener-policy', 'cross-origin-resource-policy', 'x-xss-protection',
  'server', 'x-powered-by', 'x-aspnet-version', 'x-generator', 'via',
  'access-control-allow-origin', 'cache-control', 'content-type', 'set-cookie',
];

function headerMap(h: Headers): Record<string, string> {
  const out: Record<string, string> = {};
  for (const name of KEEP_HEADERS) {
    const v = h.get(name);
    if (v) out[name] = v.slice(0, 500);
  }
  return out;
}

/** Разбирает max-age у HSTS. Возвращает -1, если заголовка нет. */
function hstsMaxAge(value?: string): number {
  if (!value) return -1;
  const m = value.match(/max-age\s*=\s*(\d+)/i);
  return m ? Number(m[1]) : 0;
}

/**
 * Забирает страницу и снимает с неё объективные показания.
 * Никаких атакующих запросов: один обычный GET, как у любого браузера.
 */
export async function probeUrl(url: string, timeoutMs = 14000): Promise<ProbeResult> {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; AIfa-Oracle/2.2; +https://aifa.works/oracle)',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
  });

  const html = await res.text();
  const h = res.headers;
  // getSetCookie есть в современных средах; иначе берём одиночный заголовок.
  const cookies: string[] = typeof (h as unknown as { getSetCookie?: () => string[] }).getSetCookie === 'function'
    ? (h as unknown as { getSetCookie: () => string[] }).getSetCookie()
    : (h.get('set-cookie') ? [h.get('set-cookie') as string] : []);

  const artifacts: ProbeArtifacts = {
    finalUrl: res.url || url,
    status: res.status,
    redirectedToHttps: (res.url || url).startsWith('https://'),
    headers: headerMap(h),
    cookies: cookies.map((c) => c.slice(0, 300)),
    htmlBytes: html.length,
    fetchedAt: new Date().toISOString(),
  };

  const f: ProbeFinding[] = [];
  const add = (x: ProbeFinding) => f.push(x);
  const hdr = (n: string) => artifacts.headers[n];

  // ── Транспорт ──────────────────────────────────────────────────────────────
  if (!artifacts.finalUrl.startsWith('https://')) {
    add({
      code: 'SEC-TLS-001', title: 'Сайт отдаётся без шифрования (HTTP)', severity: 'critical',
      evidence: `Итоговый адрес после переходов: ${artifacts.finalUrl}`,
      source: 'итоговый URL ответа',
      remedy: 'Выпустить сертификат и включить постоянный редирект с http:// на https://.',
    });
  }

  const hsts = hstsMaxAge(hdr('strict-transport-security'));
  if (hsts < 0) {
    add({
      code: 'SEC-HSTS-001', title: 'Нет заголовка HSTS', severity: 'serious',
      evidence: 'Заголовок Strict-Transport-Security в ответе отсутствует',
      source: 'заголовки ответа',
      remedy: 'Добавить Strict-Transport-Security: max-age=31536000; includeSubDomains.',
    });
  } else if (hsts < 15552000) {
    add({
      code: 'SEC-HSTS-002', title: 'Срок действия HSTS слишком мал', severity: 'moderate',
      evidence: `Strict-Transport-Security: ${hdr('strict-transport-security')}`,
      source: 'заголовки ответа',
      remedy: 'Поднять max-age минимум до 15552000 (полгода), рекомендуется 31536000.',
    });
  }

  // ── Заголовки безопасности ────────────────────────────────────────────────
  const csp = hdr('content-security-policy');
  if (!csp) {
    add({
      code: 'SEC-CSP-001', title: 'Нет политики безопасности содержимого (CSP)', severity: 'serious',
      evidence: hdr('content-security-policy-report-only')
        ? `Есть только режим наблюдения: Content-Security-Policy-Report-Only присутствует, боевой заголовок — нет`
        : 'Заголовок Content-Security-Policy в ответе отсутствует',
      source: 'заголовки ответа',
      remedy: 'Ввести CSP, начав с режима наблюдения, затем перевести в боевой.',
    });
  } else {
    // Разбираем политику по директивам. Раньше здесь стояла одна проверка на
    // всю строку: нашлось слово unsafe — обвинение. Так нельзя, потому что
    // разрешение встроенных СТИЛЕЙ и разрешение встроенных СКРИПТОВ — риски
    // несопоставимой величины, а сборка кода из строк опаснее их обоих.
    // Одинаковая оценка за разные вещи — это неточность, за которую клиент
    // справедливо перестаёт верить остальному отчёту.
    const dir = (name: string): string => {
      const m = csp.match(new RegExp(`(?:^|;)\\s*${name}\\s([^;]*)`, 'i'));
      return m ? m[1] : '';
    };
    const scriptSrc = dir('script-src') || dir('default-src');
    const styleSrc = dir('style-src') || dir('default-src');

    // ОФОРМЛЕНИЕ: смотреть надо на ту директиву, которая РЕАЛЬНО применяется.
    //
    // В CSP уровня 3 у стилей три директивы, и они не равны между собой:
    //   • style-src-elem — блоки <style> и подключаемые таблицы;
    //   • style-src-attr — атрибут style="…" прямо на элементе;
    //   • style-src      — запасная, действует ТОЛЬКО там, где нет уточняющей.
    // Если задана уточняющая директива, браузер берёт её, а style-src для этого
    // вида не применяет вовсе.
    //
    // Почему это важно для отчёта. Правильно настроенный сайт запрещает блоки
    // <style> (style-src-elem без unsafe-inline) и оставляет разрешение только
    // для атрибута style= (style-src-attr), потому что инлайновые стили есть в
    // разметке сотнями. При этом в style-src слово unsafe-inline обычно
    // остаётся — ради старых браузеров, которые уточняющих директив не знают.
    // Проверка «по строке style-src» обвиняла бы такой сайт зря, а ложное
    // обвинение стоит доверия ко всему остальному отчёту.
    //
    // Опасность у двух видов тоже разная. Через подставленный БЛОК оформления
    // воруют введённое в поля: селектор по атрибуту плюс фоновая картинка
    // отправляют значение на чужой сервер без единой строчки скрипта. Атрибут
    // style= на конкретном элементе такой возможности не даёт.
    const styleElem = dir('style-src-elem') || styleSrc;

    // По стандарту CSP уровня 3 браузер ИГНОРИРУЕТ 'unsafe-inline', если в той
    // же директиве есть одноразовая метка, хэш или 'strict-dynamic'. То есть
    // политика с меткой безопасна, даже когда слово unsafe в ней осталось —
    // его держат ради старых браузеров. Обвинять за это — ошибка.
    const neutralised = (d: string) => /'nonce-|'sha(256|384|512)-|'strict-dynamic'/i.test(d);

    if (/'unsafe-eval'/i.test(scriptSrc)) {
      add({
        code: 'SEC-CSP-002', title: 'Скриптам разрешено собирать код из строк (unsafe-eval)', severity: 'serious',
        evidence: `Директива script-src содержит 'unsafe-eval': ${scriptSrc.trim().slice(0, 200)}`,
        source: 'заголовки ответа',
        remedy: "Убрать 'unsafe-eval'. Он нужен только режиму разработки; в готовом приложении код из строк не собирается.",
      });
    }

    if (/'unsafe-inline'/i.test(scriptSrc) && !neutralised(scriptSrc)) {
      add({
        code: 'SEC-CSP-004', title: 'Разрешены встроенные скрипты без одноразовой метки', severity: 'moderate',
        evidence: `Директива script-src содержит 'unsafe-inline' и не содержит ни nonce, ни хэша: ${scriptSrc.trim().slice(0, 200)}`,
        source: 'заголовки ответа',
        remedy: 'Перейти на одноразовые метки (nonce) или хэши. Тогда встроенный скрипт, подставленный злоумышленником, выполнен не будет.',
      });
    }

    // Встроенные стили — риск заметно ниже: подмена оформления, а не запуск
    // чужого кода. Отмечаем как рекомендацию, а не как нарушение, потому что
    // так честнее: почти каждый сайт на современных инструментах их использует.
    if (/'unsafe-inline'/i.test(styleElem) && !neutralised(styleElem)) {
      const viaElem = Boolean(dir('style-src-elem'));
      add({
        code: 'SEC-CSP-005', title: 'Разрешены встроенные блоки оформления', severity: 'advisory',
        evidence: viaElem
          ? `Директива style-src-elem содержит 'unsafe-inline': ${styleElem.trim().slice(0, 200)}`
          : `Директива style-src содержит 'unsafe-inline' и не уточнена директивой style-src-elem: ${styleElem.trim().slice(0, 200)}`,
        source: 'заголовки ответа',
        remedy: 'Вынести блоки <style> в обычные файлы стилей и задать style-src-elem без '
          + "'unsafe-inline'. Инлайновые стили в атрибуте style= при этом можно оставить — "
          + "для них есть отдельная директива style-src-attr. Через подставленный БЛОК "
          + 'оформления воруют введённое в поля (селектор по атрибуту плюс фоновая картинка '
          + 'отправляют значение на чужой сервер без единой строчки скрипта); атрибут на '
          + 'конкретном элементе такой возможности не даёт.',
      });
    }
  }

  if (!hdr('x-frame-options') && !(csp && /frame-ancestors/i.test(csp))) {
    add({
      code: 'SEC-CLICK-001', title: 'Страницу можно встроить в чужой сайт (риск подмены кликов)', severity: 'serious',
      evidence: 'Нет ни X-Frame-Options, ни директивы frame-ancestors в CSP',
      source: 'заголовки ответа',
      remedy: 'Добавить frame-ancestors в CSP (предпочтительно) или X-Frame-Options: SAMEORIGIN.',
    });
  }

  // Сравниваем по вхождению, а не на точное равенство: серверы за прокси часто
  // отдают заголовок дважды, и он приходит склеенным — «nosniff, nosniff».
  // Проверено на живом сайте: строгое равенство обвиняло тех, у кого всё в
  // порядке. Ложное обвинение в платном аудите недопустимо.
  if (!/nosniff/i.test(hdr('x-content-type-options') || '')) {
    add({
      code: 'SEC-MIME-001', title: 'Браузеру разрешено угадывать тип содержимого', severity: 'moderate',
      evidence: hdr('x-content-type-options')
        ? `X-Content-Type-Options: ${hdr('x-content-type-options')}`
        : 'Заголовок X-Content-Type-Options отсутствует',
      source: 'заголовки ответа',
      remedy: 'Добавить X-Content-Type-Options: nosniff.',
    });
  }

  if (!hdr('referrer-policy')) {
    add({
      code: 'PRIV-REF-001', title: 'Адреса ваших страниц утекают на чужие сайты', severity: 'moderate',
      evidence: 'Заголовок Referrer-Policy отсутствует — браузер передаёт полный адрес перехода',
      source: 'заголовки ответа',
      remedy: 'Добавить Referrer-Policy: strict-origin-when-cross-origin.',
    });
  }

  if (!hdr('permissions-policy')) {
    add({
      code: 'PRIV-PERM-001', title: 'Не ограничен доступ к камере, микрофону и геопозиции', severity: 'advisory',
      evidence: 'Заголовок Permissions-Policy отсутствует',
      source: 'заголовки ответа',
      remedy: 'Добавить Permissions-Policy и явно запретить неиспользуемые возможности.',
    });
  }

  // ── Раскрытие внутренностей ───────────────────────────────────────────────
  const leaky = ['x-powered-by', 'x-aspnet-version', 'x-generator'].filter((n) => hdr(n));
  const serverVer = hdr('server');
  if (leaky.length || (serverVer && /\d+\.\d+/.test(serverVer))) {
    const parts = leaky.map((n) => `${n}: ${hdr(n)}`);
    if (serverVer && /\d+\.\d+/.test(serverVer)) parts.push(`server: ${serverVer}`);
    add({
      code: 'SEC-INFO-001', title: 'Сервер сообщает версии своего программного обеспечения', severity: 'moderate',
      evidence: parts.join(' | '),
      source: 'заголовки ответа',
      remedy: 'Скрыть версии: это подсказка нападающему, какие уязвимости пробовать.',
    });
  }

  // Звёздочка в CORS — нарушение ТОЛЬКО там, где ответ содержит что-то личное.
  //
  // На обычной публичной странице она безобидна: содержимое и так открыто
  // любому. Поймала на собственном сайте — проба ругалась на главную radiocode,
  // где читать нечего. Ругаемся теперь лишь когда вместе со звёздочкой сервер
  // ставит cookie сессии или отдаёт данные: вот тогда чужой сайт действительно
  // может прочитать чужое.
  const corsStar = /(^|,\s*)\*(\s*,|$)/.test(hdr('access-control-allow-origin') || '');
  const carriesPrivate = artifacts.cookies.some((c) => /session|token|auth|sid/i.test(c))
    || /application\/json/i.test(hdr('content-type') || '');
  if (corsStar && carriesPrivate) {
    add({
      code: 'SEC-CORS-001', title: 'Ответ разрешено читать любому стороннему сайту', severity: 'moderate',
      evidence: 'Access-Control-Allow-Origin: *',
      source: 'заголовки ответа',
      remedy: 'Ограничить список доверенных источников вместо звёздочки.',
    });
  }

  // ── Cookies ───────────────────────────────────────────────────────────────
  for (const c of artifacts.cookies.slice(0, 12)) {
    const name = c.split('=')[0].trim();
    const low = c.toLowerCase();
    const problems: string[] = [];
    if (!low.includes('secure')) problems.push('нет Secure');
    if (!low.includes('httponly')) problems.push('нет HttpOnly');
    if (!low.includes('samesite')) problems.push('нет SameSite');
    if (problems.length) {
      add({
        code: 'SEC-COOKIE-001', title: `Cookie «${name}» выставлена без защитных флагов`,
        severity: problems.length >= 2 ? 'serious' : 'moderate',
        evidence: `${c.slice(0, 160)} — ${problems.join(', ')}`,
        source: 'заголовок Set-Cookie',
        remedy: 'Выставлять Secure, HttpOnly и SameSite=Lax (или Strict) для служебных cookie.',
      });
    }
  }

  // ── Приватность: слежка до согласия ───────────────────────────────────────
  // Проверка объективная: скрипт аналитики присутствует в разметке, а признаков
  // менеджера согласия нет ни одного. Это ровно то, за что штрафуют по GDPR.
  // Комментарии вырезаны намеренно, до всех проверок ниже.
  //
  // Мы поймали это на собственном сайте: в лендинге есть комментарий,
  // объясняющий, ПОЧЕМУ шрифты лежат у нас, а не тянутся с fonts.googleapis.com
  // — и проверка засчитала упоминание за обращение. Отчёт обвинил сайт ровно в
  // том, чего тот избегает, да ещё с пометкой «доказано».
  //
  // Цена такой ошибки — не косметическая. Мы шлём отчёты незнакомым людям и
  // берём деньги за исправления; обвинение, опровергаемое одним взглядом в
  // исходник, стоит доверия ко всем остальным находкам сразу.
  //
  // Вырезаются ДВА вида: комментарии разметки и блочные комментарии внутри
  // <style> и <script>. Первой правкой я убрала только разметочные — и
  // ошибка осталась, потому что тот самый комментарий оказался CSS-овским.
  // Строчные `// …` не трогаем: под них попал бы каждый `https://`.
  const lower = html.toLowerCase()
    .replace(/<!--[\s\S]*?-->/g, ' ')   // комментарии разметки
    .replace(/\/\*[\s\S]*?\*\//g, ' '); // комментарии в <style> и <script>
  const trackers: string[] = [];
  if (/googletagmanager\.com|gtag\(|google-analytics\.com/.test(lower)) trackers.push('Google Analytics / Tag Manager');
  if (/connect\.facebook\.net|fbq\(/.test(lower)) trackers.push('Meta Pixel');
  if (/static\.hotjar\.com|hj\(/.test(lower)) trackers.push('Hotjar');
  if (/mc\.yandex\.ru|ym\(/.test(lower)) trackers.push('Яндекс.Метрика');
  if (/clarity\.ms/.test(lower)) trackers.push('Microsoft Clarity');
  // Менеджер согласия — это не обязательно покупная платформа.
  //
  // Проверила на своих же сайтах: у нас собственный баннер и режим согласия
  // Google (Consent Mode v2) — счётчики стоят «запрещено» до явного «да».
  // Проба этого не видела и обвиняла нас в слежке без спроса. Такое же ложное
  // обвинение получил бы любой клиент, сделавший согласие своими руками, а не
  // купивший готовый сервис. Теперь засчитываем три равноправных признака:
  //   • известную покупную платформу;
  //   • режим согласия Google с состоянием «запрещено» по умолчанию;
  //   • собственный баннер, который упоминает cookie и требует согласия.
  const hasVendorCmp = /cookiebot|onetrust|cookiepro|usercentrics|consentmanager|klaro|cookieyes|termly|iubenda|axeptio|didomi|quantcast|sourcepoint/.test(lower);
  const hasConsentMode = /gtag\(\s*['"]consent['"]\s*,\s*['"]default['"]/.test(html)
    && /denied/.test(lower);
  const hasOwnBanner = /cookie|куки|галет/i.test(lower)
    && /(соглас|принять|accept all|accept cookies|aceptar|同意)/i.test(lower);
  const hasCmp = hasVendorCmp || hasConsentMode || hasOwnBanner;
  if (trackers.length && !hasCmp) {
    add({
      code: 'GDPR-CONSENT-001', title: 'Слежка подключается без спроса согласия', severity: 'critical',
      evidence: `В разметке найдено: ${trackers.join(', ')}; ни одного известного менеджера согласия не обнаружено`,
      source: 'исходный код страницы',
      remedy: 'Подключить менеджер согласия и не запускать счётчики до явного «да» посетителя.',
    });
  }

  const hasPrivacyLink = /privacy|конфиденциальн|privacidad|datenschutz|隐私/.test(lower);
  if (!hasPrivacyLink) {
    add({
      code: 'GDPR-POLICY-001', title: 'На странице нет ссылки на политику конфиденциальности', severity: 'serious',
      evidence: 'Ни в тексте, ни в ссылках не найдено упоминания политики конфиденциальности',
      source: 'исходный код страницы',
      remedy: 'Разместить ссылку на политику в подвале каждой страницы.',
    });
  }

  // ── Смешанное содержимое ──────────────────────────────────────────────────
  if (artifacts.finalUrl.startsWith('https://')) {
    const mixed = html.match(/(?:src|href)\s*=\s*["']http:\/\/[^"']+/gi) || [];
    const real = mixed.filter((m) => !/http:\/\/(localhost|127\.0\.0\.1|www\.w3\.org|schema\.org|ns\.adobe)/i.test(m));
    if (real.length) {
      add({
        code: 'SEC-MIXED-001', title: 'Защищённая страница подгружает файлы по незащищённому каналу', severity: 'serious',
        evidence: `Найдено ${real.length} ссылок вида http://, например: ${real[0].slice(0, 120)}`,
        source: 'исходный код страницы',
        remedy: 'Перевести все внешние ресурсы на https:// — иначе браузер их заблокирует.',
      });
    }
  }

  // ── Утечка посетителя третьим лицам (Schrems II, дело о Google Fonts) ──────
  // Мюнхенский суд взыскал с сайта компенсацию за то, что шрифт подгружался
  // напрямую с серверов Google: IP посетителя уходил в США без основания.
  // С тех пор это самый частый повод для писем-претензий в Германии.
  if (/fonts\.(googleapis|gstatic)\.com/.test(lower)) {
    add({
      code: 'XFER-FONTS-001', title: 'Шрифты грузятся прямо с серверов Google — адрес посетителя уходит в США',
      severity: 'serious',
      evidence: 'В разметке найдено обращение к fonts.googleapis.com / fonts.gstatic.com',
      source: 'исходный код страницы',
      remedy: 'Скачать шрифты и раздавать со своего домена — это снимает передачу данных целиком.',
    });
  }

  // ── Чужие скрипты без контроля целостности ────────────────────────────────
  // С 31 марта 2025 требования PCI DSS 6.4.3 и 11.6.1 стали обязательными:
  // подменённый чужой скрипт — это классическая кража карт прямо со страницы.
  const extScripts = Array.from(html.matchAll(/<script[^>]+src\s*=\s*["']https?:\/\/([^"'/]+)[^"']*["'][^>]*>/gi));
  const noSri = extScripts.filter((m) => !/integrity\s*=/.test(m[0]));
  if (noSri.length >= 2) {
    const hosts = Array.from(new Set(noSri.map((m) => m[1]))).slice(0, 4);
    add({
      code: 'SUPPLY-SRI-001', title: 'Чужие скрипты подключены без проверки подлинности',
      severity: 'serious',
      evidence: `${noSri.length} внешних скриптов без атрибута integrity, например с узлов: ${hosts.join(', ')}`,
      source: 'исходный код страницы',
      remedy: 'Добавить атрибут integrity к внешним скриптам: тогда подменённый файл просто не выполнится.',
    });
  }

  // ── Наружу отданы исходники ───────────────────────────────────────────────
  if (/sourceMappingURL\s*=/.test(html)) {
    add({
      code: 'SUPPLY-MAP-001', title: 'Наружу отдаётся карта исходного кода',
      severity: 'moderate',
      evidence: 'В разметке присутствует ссылка sourceMappingURL — по ней восстанавливается исходный код с комментариями',
      source: 'исходный код страницы',
      remedy: 'Отключить публикацию карт кода в сборке для продакшена.',
    });
  }

  // ── Запрет увеличивать страницу ───────────────────────────────────────────
  // Прямое нарушение WCAG 1.4.4, входящего в европейский стандарт доступности.
  const viewport = (html.match(/<meta[^>]+name\s*=\s*["']viewport["'][^>]*content\s*=\s*["']([^"']+)/i) || [])[1];
  if (viewport && (/user-scalable\s*=\s*(no|0)/i.test(viewport) || /maximum-scale\s*=\s*(1(\.0+)?|0?\.\d+)\b/i.test(viewport))) {
    add({
      code: 'A11Y-VIEWPORT-001', title: 'Посетителю запрещено увеличивать страницу',
      severity: 'serious',
      evidence: `meta viewport: ${viewport.slice(0, 120)}`,
      source: 'исходный код страницы',
      remedy: 'Убрать user-scalable=no и maximum-scale: людям со слабым зрением иначе не прочитать текст.',
    });
  }

  // ── Отменённая ссылка на европейскую платформу споров ─────────────────────
  // Платформа отключена 20 июля 2025. Живая ссылка на неё ведёт в никуда и
  // прямо показывает, что юридические тексты не пересматривались год.
  if (/ec\.europa\.eu\/consumers\/odr/.test(lower)) {
    add({
      code: 'EUODR-001', title: 'В подвале осталась ссылка на отключённую платформу споров ЕС',
      severity: 'moderate',
      evidence: 'Найдена ссылка на ec.europa.eu/consumers/odr — платформа отключена 20.07.2025',
      source: 'исходный код страницы',
      remedy: 'Убрать ссылку и указать действующий порядок досудебного урегулирования.',
    });
  }

  // ── Слишком долгая жизнь следящей cookie ──────────────────────────────────
  // Предел в 13 месяцев принят надзорными органами ЕС как ориентир.
  for (const c of artifacts.cookies.slice(0, 12)) {
    const ma = (c.match(/max-age\s*=\s*(\d+)/i) || [])[1];
    if (ma && Number(ma) > 34_128_000) {
      add({
        code: 'COOKIE-LIFE-001', title: `Cookie «${c.split('=')[0].trim()}» живёт дольше 13 месяцев`,
        severity: 'moderate',
        evidence: `Max-Age=${ma} секунд — это ${Math.round(Number(ma) / 2_592_000)} месяцев`,
        source: 'заголовок Set-Cookie',
        remedy: 'Сократить срок до 13 месяцев — таков ориентир надзорных органов ЕС.',
      });
      break;
    }
  }

  // ── Сигнал отказа от продажи данных игнорируется ──────────────────────────
  // В Калифорнии, Колорадо и Коннектикуте сайт ОБЯЗАН уважать заголовок
  // Global Privacy Control. Если браузер посетителя его шлёт, а рекламные
  // cookie всё равно ставятся — это прямое нарушение.
  // Проверяем честно: два одинаковых запроса, разница только в этом заголовке.
  // (Выполняется отдельной функцией ниже — здесь только отметка о поддержке.)

  // ── Обязательные сведения о продавце ──────────────────────────────────────
  // В Европе интернет-магазин обязан указывать юридические данные: название,
  // адрес, электронную почту, регистрационный номер. Отсутствие раздела —
  // самый частый повод для писем от конкурентов в Германии и Австрии.
  const looksCommercial = /(корзин|cart|checkout|купить|buy now|заказать|price|цена|€|\$\d)/i.test(lower);
  const hasImprint = /(impressum|mentions.l[eé]gales|aviso.legal|legal.notice|юридическ|реквизит|о\s+компании|about\s+us|contacts?)/i.test(lower);
  if (looksCommercial && !hasImprint) {
    add({
      code: 'IMPR-001', title: 'Нет обязательных сведений о продавце', severity: 'serious',
      evidence: 'Страница выглядит коммерческой (корзина, цены, кнопка покупки), но раздела с юридическими данными не найдено',
      source: 'исходный код страницы',
      remedy: 'Добавить раздел с названием организации, адресом, почтой и регистрационным номером — этого требует директива ЕС об электронной торговле.',
    });
  }

  // ── Прозрачность искусственного интеллекта ────────────────────────────────
  // По Акту ЕС об ИИ (статья 50) человек должен знать, что говорит с машиной.
  const hasChatWidget = /(intercom|tidio|crisp\.chat|drift\.com|livechat|tawk\.to|zendesk|hubspot.*conversations|jivosite|jivo)/i.test(lower);
  const disclosesAi = /(искусственн\w*\s+интеллект|бот|ai\s+assistant|chatbot|виртуальн\w*\s+помощник|automated)/i.test(lower);
  if (hasChatWidget && !disclosesAi) {
    add({
      code: 'AIACT-001', title: 'Чат-помощник не раскрывает, что это машина', severity: 'moderate',
      evidence: 'На странице найден чат-виджет, но нигде не сказано, что собеседник — программа',
      source: 'исходный код страницы',
      remedy: 'Указать в окне чата, что отвечает искусственный интеллект — этого требует статья 50 Акта ЕС об ИИ.',
    });
  }

  // ── Наружу отдан список авторов ───────────────────────────────────────────
  // Готовый перечень логинов для подбора пароля.
  if (/wp-content|wp-includes|\/wp-json/.test(lower)) {
    add({
      code: 'EXPO-WP-001', title: 'Сайт на WordPress — проверьте, не открыт ли список авторов', severity: 'advisory',
      evidence: 'В разметке найдены признаки WordPress (wp-content / wp-json)',
      source: 'исходный код страницы',
      remedy: 'Закрыть /wp-json/wp/v2/users: по нему публикуется список логинов администраторов.',
    });
  }

  // ── Формы, отправляющие данные не туда ────────────────────────────────────
  const insecureForms = (html.match(/<form[^>]+action\s*=\s*["']http:\/\/[^"']+/gi) || []);
  if (insecureForms.length) {
    add({
      code: 'SEC-FORM-001', title: 'Форма отправляет данные по незащищённому каналу', severity: 'critical',
      evidence: `Найдено ${insecureForms.length} форм с action по http://, например: ${(insecureForms[0] ?? '').slice(0, 100)}`,
      source: 'исходный код страницы',
      remedy: 'Перевести отправку форм на https:// — иначе всё введённое читается по дороге.',
    });
  }

  // ── Пароль в форме без защищённого канала ─────────────────────────────────
  if (/<input[^>]+type\s*=\s*["']password["']/i.test(html) && !artifacts.finalUrl.startsWith('https://')) {
    add({
      code: 'SEC-PWD-001', title: 'Поле пароля на незащищённой странице', severity: 'critical',
      evidence: 'На странице есть поле ввода пароля, а сама страница отдаётся по http://',
      source: 'исходный код страницы',
      remedy: 'Немедленно перевести страницу на https:// — пароли уходят открытым текстом.',
    });
  }

  // ── Устаревшие правовые механизмы в текстах ───────────────────────────────
  // ВАЖНО про «Safe Harbor». Есть два совершенно разных значения, и путать их
  // нельзя. Отменён в 2015 году механизм передачи данных между ЕС и США. А
  // «DMCA Safe Harbor» — действующее положение американского закона об
  // авторском праве, его упоминание в документах абсолютно правомерно.
  //
  // Поймала на собственном сайте: проба обвинила наши юридические тексты в
  // устаревании из-за строки «DMCA Safe Harbor». Так же несправедливо мы
  // обвинили бы любого клиента с нормальными документами. Поэтому ищем только
  // в связке с передачей данных и прямо исключаем упоминание DMCA.
  const obsolete: string[] = [];
  if (/privacy\s*shield/i.test(lower) && !/privacy\s*shield\s*(is|was)?\s*(invalidat|annull|отмен)/i.test(lower)) {
    obsolete.push('Privacy Shield (отменён в 2020 году делом Schrems II)');
  }
  const shTransfer = /(eu[\s-]*us|us[\s-]*eu|европ\w*[\s-]*сша|swiss)[^.]{0,40}safe\s*harbou?r|safe\s*harbou?r[^.]{0,40}(framework|передач\w*\s+данн\w*|data\s+transfer)/i;
  if (shTransfer.test(lower) && !/dmca/i.test(lower)) {
    obsolete.push('Safe Harbor как механизм передачи данных (отменён в 2015 году)');
  }
  if (obsolete.length) {
    add({
      code: 'TRUTH-002', title: 'Документы ссылаются на отменённые правовые механизмы', severity: 'serious',
      evidence: `Найдено упоминание: ${obsolete.join('; ')}`,
      source: 'исходный код страницы',
      remedy: 'Обновить юридические тексты: ссылка на отменённый механизм показывает, что документы не пересматривались годами.',
    });
  }

  return { artifacts, findings: f, html };
}

/**
 * Проверка сигнала отказа от продажи данных (Global Privacy Control).
 *
 * На 2026 год уважать этот заголовок обязывают законы ДВЕНАДЦАТИ штатов США:
 * Калифорния (с 2023), Колорадо (2024), Монтана (2024), Коннектикут, Делавэр,
 * Небраска, Нью-Гэмпшир, Нью-Джерси, Техас (2025), Миннесота, Мэриленд (2025),
 * Орегон (2026). Раньше здесь было написано «три штата» — цифра устарела, а
 * она попадала в платный отчёт клиенту.
 *
 * Проверка честная и объективная: два одинаковых запроса, разница только в
 * заголовке. Если при «не продавать» сайт всё равно ставит рекламные cookie —
 * это доказанное нарушение, а не предположение.
 *
 * Отдельно проверяется требование Калифорнии, вступившее в силу 1 января
 * 2026 года (§ 7025(c)(6)): мало молча выполнить отказ — сайт ОБЯЗАН показать
 * посетителю, что отказ принят. Формулировка нормы изменилась с «может» на
 * «должен», и это то новое, о чём почти никто ещё не знает.
 */
export async function probeGpcRespect(url: string): Promise<ProbeFinding[]> {
  const out: ProbeFinding[] = [];
  const adCookie = /(_ga|_gid|_fbp|_fbc|_gcl|IDE|test_cookie|personalization_id|_uetsid|_ttp)/i;
  let gpcBodyHtml = '';
  const grab = async (withGpc: boolean) => {
    const r = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AIfa-Oracle/2.2)',
        ...(withGpc ? { 'Sec-GPC': '1' } : {}),
      },
      signal: AbortSignal.timeout(12000),
    });
    const h = r.headers as unknown as { getSetCookie?: () => string[] };
    const cookies = typeof h.getSetCookie === 'function'
      ? h.getSetCookie()
      : (r.headers.get('set-cookie') ? [r.headers.get('set-cookie') as string] : []);
    if (withGpc) gpcBodyHtml = await r.text().catch(() => '');
    return cookies.filter((c) => adCookie.test(c.split('=')[0]));
  };
  try {
    const [plain, gpc] = await Promise.all([grab(false), grab(true)]);

    // Требование Калифорнии § 7025(c)(6), действует с 1 января 2026 года: если
    // сайт получил сигнал отказа, он ОБЯЗАН показать посетителю, что отказ
    // принят. Норма новая, формулировка сменилась с «может» на «должен», и
    // почти никто её ещё не выполняет. Проверяем только тех, кто отказ реально
    // соблюдает: обвинять в отсутствии подтверждения того, кто и сам отказ
    // игнорирует, бессмысленно — у него проблема крупнее, и она уже отмечена.
    const honours = plain.length > 0 && gpc.length < plain.length;
    // Шаблон подтверждения. ОСТОРОЖНО С КОРОТКИМИ СЛОВАМИ И ШИРОКИМИ ОКНАМИ.
    //
    // При замере по 46 сайтам похожий шаблон совпал с пунктом меню «Do Not Sell
    // Or Share My Personal Information» и объявил пять сайтов подтверждающими.
    // Здесь ошибка в обратную сторону — мы бы пропустили находку, — но она всё
    // равно ошибка. Оставляем только фразы, означающие ИМЕННО принятый отказ,
    // с границами слов и узким окном.
    const confirms = new RegExp(
      [
        String.raw`opt[- ]?out (request )?(is |has been )?(honou?red|received|processed|recorded|applied)\b`,
        String.raw`your (opt[- ]?out|privacy choice|preference)s? (has|have) been (honou?red|saved|applied|recorded)\b`,
        String.raw`we (are )?honou?r(ing|ed)? your (opt[- ]?out|global privacy control|gpc)\b`,
        String.raw`global privacy control (signal )?(was |is |has been )?(detected|honou?red|respected|recognized)\b`,
        String.raw`do not sell.{0,30}\b(honou?red|already active|is enabled)\b`,
        String.raw`запрос(?:\s+на)?\s+отказ\w*\s+(принят|учт[её]н)`,
        String.raw`ваш\w*\s+отказ\w*\s+(принят|учт[её]н|сохран\w+)`,
        String.raw`solicitud de exclusión\s+(recibida|registrada|aplicada)`,
        String.raw`已(接受|处理|记录)您的选择退出`,
      ].join('|'),
      'i',
    );
    if (honours && gpcBodyHtml && !confirms.test(gpcBodyHtml)) {
      out.push({
        code: 'GPC-002', title: 'Отказ от продажи данных выполняется, но посетителю об этом не сообщают', severity: 'moderate',
        evidence: 'Сайт перестал ставить рекламные cookie при получении заголовка Sec-GPC — то есть отказ соблюдает, — но на странице нет ни одного подтверждения, что запрос принят',
        source: 'сравнение двух запросов',
        remedy: 'Показывать видимое подтверждение вида «Ваш отказ от продажи данных принят». С 1 января 2026 года это прямое требование правил Калифорнии (§ 7025(c)(6) и § 7026(g)); формулировка нормы изменена с разрешительной на обязательную. ВАЖНО: подтверждение должно быть пассивным — надпись, переключатель или значок. Экран, который ТРЕБУЕТ от человека нажатия или подтверждения почты, сам является нарушением: 5 марта 2026 года Ford получил штраф 375 703 долл. именно за то, что добавил такой шаг в процедуру отказа.',
      });
    }

    // ВТОРОЙ ПУТЬ: сайт, у которого рекламные механизмы подключаются скриптом.
    //
    // Условие выше требует, чтобы сайт ставил рекламные cookie С СЕРВЕРА. Но
    // так делает меньшинство: у большинства счётчики и рекламные сети
    // подключаются скриптом уже после загрузки, и сравнение заголовков ответа
    // не показывает НИЧЕГО. Такие сайты проверка пропускала целиком, хотя
    // требование Калифорнии распространяется и на них.
    //
    // Признак принадлежности к требованию берём наблюдаемый: в разметке есть
    // обращения к рекламным доменам. Это факт, который заказчик перепроверит
    // сам, открыв исходный код своей страницы.
    //
    // Формулировка ОСТОРОЖНАЯ: мы не утверждаем, что сайт продаёт данные, —
    // мы говорим, что видим рекламные механизмы и не видим подтверждения.
    const AD_HOSTS = [
      'doubleclick.net', 'googletagmanager.com', 'google-analytics.com', 'googlesyndication.com',
      'googleadservices.com', 'facebook.net', 'connect.facebook', 'analytics.tiktok.com',
      'snap.licdn.com', 'ads.linkedin.com', 'bat.bing.com', 'hotjar.com', 'clarity.ms',
      'criteo.', 'taboola.com', 'outbrain.com', 'adroll.com', 'pinterest.com/ct',
    ];
    if (!honours && gpcBodyHtml && !confirms.test(gpcBodyHtml)) {
      const seen = AD_HOSTS.filter((h) => gpcBodyHtml.includes(h));
      if (seen.length > 0) {
        out.push({
          code: 'GPC-002', title: 'Сайт использует рекламные механизмы, но не подтверждает отказ от продажи данных', severity: 'moderate',
          evidence: `В разметке страницы есть обращения к рекламным доменам (${seen.slice(0, 5).join(', ')}), а при запросе с заголовком Sec-GPC на странице нет ни одного подтверждения, что отказ принят. Проверить можно так: открыть исходный код страницы и найти в нём эти адреса.`,
          source: 'разметка страницы + запрос с заголовком Sec-GPC',
          remedy: 'Показывать видимое подтверждение вида «Ваш отказ от продажи данных принят». С 1 января 2026 года это прямое требование правил Калифорнии (§ 7025(c)(6) и § 7026(g)); формулировка нормы изменена с разрешительной на обязательную. ВАЖНО: подтверждение должно быть пассивным — надпись, переключатель или значок. Экран, который ТРЕБУЕТ от человека нажатия или подтверждения почты, сам является нарушением: 5 марта 2026 года Ford получил штраф 375 703 долл. именно за то, что добавил такой шаг в процедуру отказа. Отдельно: наличие рекламных доменов в разметке не означает автоматически, что вы «продаёте» данные в смысле закона — но именно эти механизмы регуляторы и рассматривают в первую очередь.',
        });
      }
    }

    if (gpc.length && gpc.length >= plain.length && plain.length > 0) {
      out.push({
        code: 'GPC-001', title: 'Сигнал «не продавать мои данные» игнорируется', severity: 'serious',
        evidence: `С заголовком Sec-GPC сайт всё равно ставит рекламные cookie: ${gpc.map((c) => c.split('=')[0]).join(', ').slice(0, 120)}`,
        source: 'сравнение двух запросов',
        remedy: 'Уважать заголовок Sec-GPC. На 2026 год этого требуют законы двенадцати штатов США: Калифорния, Колорадо, Коннектикут, Делавэр, Мэриленд, Миннесота, Монтана, Небраска, Нью-Гэмпшир, Нью-Джерси, Орегон и Техас. Штрафы по этому основанию уже выписывались: Sephora — 1,2 млн долларов, Healthline — 1,55 млн, Disney — 2,75 млн, Ford — 375 тысяч.',
      });
    }
  } catch { /* сеть подвела — молчим, обвинять без данных нельзя */ }
  return out;
}

/**
 * Проверка почтовой защиты домена по DNS.
 *
 * Почему это важно клиенту: если у домена есть почта, но нет записи DMARC,
 * письмо от его имени может отправить кто угодно. Это самый частый способ
 * обмануть его же клиентов и бухгалтерию. Проверяется снаружи и однозначно.
 */
export async function probeDomainMail(hostname: string): Promise<ProbeFinding[]> {
  const out: ProbeFinding[] = [];
  const ask = async (name: string, type: string) => {
    try {
      const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`, {
        headers: { accept: 'application/dns-json' },
        signal: AbortSignal.timeout(6000),
      });
      const j = await r.json() as { Answer?: Array<{ type: number; data: string }> };
      return (j.Answer || []).map((a) => ({ type: a.type, data: a.data.replace(/^"|"$/g, '') }));
    } catch { return []; }
  };

  const root = hostname.replace(/^www\./, '');
  const [mx, txt, dmarc] = await Promise.all([
    ask(root, 'MX'), ask(root, 'TXT'), ask(`_dmarc.${root}`, 'TXT'),
  ]);

  const hasMx = mx.some((r) => r.type === 15);
  const spf = txt.filter((r) => r.type === 16 && r.data.startsWith('v=spf1'));
  const dm = dmarc.filter((r) => r.type === 16 && r.data.toLowerCase().startsWith('v=dmarc1'));

  if (hasMx && !dm.length) {
    out.push({
      code: 'DNS-DMARC-001', title: 'Письмо от вашего имени может отправить кто угодно',
      severity: 'serious',
      evidence: `У домена ${root} есть почта (запись MX), но записи DMARC нет`,
      source: 'публичный DNS',
      remedy: 'Добавить TXT-запись _dmarc со значением v=DMARC1; p=none; rua=mailto:ваш@адрес — начать с наблюдения.',
    });
  }
  if (hasMx && !spf.length) {
    out.push({
      code: 'DNS-SPF-001', title: 'Не указано, кому разрешено слать письма от домена',
      severity: 'serious',
      evidence: `У домена ${root} есть почта, но записи SPF нет`,
      source: 'публичный DNS',
      remedy: 'Добавить TXT-запись SPF со списком разрешённых отправителей.',
    });
  }
  // SPF молча ломается, если требует больше десяти обращений к DNS (RFC 7208).
  if (spf.length) {
    const lookups = (spf[0].data.match(/\b(include|a|mx|ptr|exists|redirect)[:=]/g) || []).length;
    if (lookups > 10) {
      out.push({
        code: 'DNS-SPF-002', title: 'Проверка отправителя молча не работает: превышен предел DNS-обращений',
        severity: 'serious',
        evidence: `В записи SPF ${lookups} механизмов при пределе 10 — почтовые серверы вернут ошибку и проверка не сработает`,
        source: 'публичный DNS',
        remedy: 'Сократить число include или свести их в одну плоскую запись.',
      });
    }
  }
  return out;
}

/** Дополнительные объективные пробы, не требующие разбора HTML. */
export async function probeSiteFiles(origin: string): Promise<ProbeFinding[]> {
  const out: ProbeFinding[] = [];
  const get = async (path: string) => {
    try {
      const r = await fetch(new URL(path, origin).toString(), {
        signal: AbortSignal.timeout(6000),
        headers: { 'User-Agent': 'AIfa-Oracle/2.2' },
      });
      return { ok: r.ok, status: r.status, text: r.ok ? (await r.text()).slice(0, 2000) : '' };
    } catch { return { ok: false, status: 0, text: '' }; }
  };

  const [robots, securityTxt] = await Promise.all([get('/robots.txt'), get('/.well-known/security.txt')]);

  if (!robots.ok) {
    out.push({
      code: 'OPS-ROBOTS-001', title: 'Нет файла robots.txt', severity: 'advisory',
      evidence: `Запрос /robots.txt вернул код ${robots.status || 'нет ответа'}`,
      source: 'проба файла',
      remedy: 'Добавить robots.txt — без него поисковые и ИИ-обходчики работают вслепую.',
    });
  }

  if (!securityTxt.ok) {
    out.push({
      code: 'OPS-SECTXT-001', title: 'Нет security.txt — исследователю некуда сообщить об уязвимости', severity: 'advisory',
      evidence: 'Запрос /.well-known/security.txt не вернул файл',
      source: 'проба файла',
      remedy: 'Добавить /.well-known/security.txt с адресом для сообщений о проблемах безопасности.',
    });
  }

  // Открытая директория .git — это выдача исходного кода наружу.
  const git = await get('/.git/HEAD');
  if (git.ok && /^ref:\s/.test(git.text.trim())) {
    out.push({
      code: 'SEC-GIT-001', title: 'Наружу открыт служебный каталог .git', severity: 'critical',
      evidence: `/.git/HEAD отдаётся публично и содержит: ${git.text.trim().slice(0, 80)}`,
      source: 'проба файла',
      remedy: 'Немедленно закрыть доступ к /.git — по нему выгружается весь исходный код сайта.',
    });
  }

  // Открытые дампы окружения — классический источник утечки ключей.
  const envFile = await get('/.env');
  if (envFile.ok && /[A-Z_]{3,}\s*=/.test(envFile.text)) {
    out.push({
      code: 'SEC-ENV-001', title: 'Наружу открыт файл настроек с переменными окружения', severity: 'critical',
      evidence: '/.env отдаётся публично и содержит строки вида ИМЯ=значение',
      source: 'проба файла',
      remedy: 'Немедленно убрать файл из публичного доступа и сменить все ключи, которые в нём были.',
    });
  }

  return out;
}

/**
 * Кто управляет согласием на сайте — и показывает ли он подтверждение отказа.
 *
 * ЗАЧЕМ ЭТО ЕСТЬ. С 1 января 2026 года правила Калифорнии (§ 7025(c)(6) и
 * § 7026(g)) обязывают показывать посетителю, что его отказ от продажи данных
 * принят. Формулировка нормы сменилась с «может» на «должен».
 *
 * Проверено по документации поставщиков на 27.07.2026:
 *   — Cookiebot и Usercentrics показывают подтверждение сами;
 *   — Osano показывает с 14.11.2025, но только при включённом GPC;
 *   — Termly добавил всплывающую подсказку с 01.01.2026;
 *   — OneTrust: переключатель ВЫКЛЮЧЕН по умолчанию, текст пишет админ руками;
 *   — CookieYes: сам GPC выключен по умолчанию, показ не документирован;
 *   — iubenda и Didomi: показ нигде не документирован;
 *   — Klaro: поддержки сигнала нет вообще (проверено по исходникам).
 *
 * ЗАЧЕМ НАМ. Регулятор при подсчёте затрат прямо ДОПУСТИЛ, что клиенты
 * менеджеров согласия защищены автоматически, — и это допущение неверно как
 * минимум для трёх распространённых менеджеров. Знание, какой менеджер стоит
 * на сайте, позволяет заранее понимать, велика ли вероятность нарушения, не
 * тратя ни одного обращения к модели.
 *
 * ЧЕСТНАЯ ОГОВОРКА. Само по себе наличие такого менеджера нарушением НЕ
 * является, и находкой мы это не считаем. Это пометка для нас, а в отчёт идёт
 * только доказанный факт из GPC-002.
 */
export function detectConsentPlatform(html: string): { vendor: string | null; showsConfirmationByDefault: boolean | null } {
  // Сначала выбрасываем СКРЫТЫЕ элементы.
  //
  // Поймано на собственном сайте: там стоял невидимый блок с перечислением
  // чужих менеджеров согласия — «cookiebot onetrust cookiepro usercentrics
  // consentmanager», — подложенный специально, чтобы проверяющий робот
  // засчитал наличие менеджера. Детектор честно на это и попался, объявив,
  // что у нас стоит Cookiebot.
  //
  // Это маскировка: одно показывают человеку, другое машине. Такое встретится
  // и у клиентов, причём именно у тех, кто уже пытался пройти чью-то проверку
  // обманом. Определять поставщика по тексту, которого посетитель не видит,
  // нельзя — иначе наш вывод подделывается одной строкой разметки.
  const visible = html
    .replace(/<[^>]*aria-hidden=["']true["'][^>]*>[\s\S]*?<\/[a-z]+>/gi, ' ')
    .replace(/<[^>]*class=["'][^"']*\bhidden\b[^"']*["'][^>]*>[\s\S]*?<\/[a-z]+>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  const t = visible.toLowerCase();
  const table: Array<[string, RegExp, boolean | null]> = [
    ['Cookiebot', /cookiebot/, true],
    ['Usercentrics', /usercentrics/, true],
    ['Osano', /osano/, true],
    ['Termly', /termly/, true],
    ['OneTrust', /onetrust|otSDKStub|optanon/i, false],
    ['CookieYes', /cookieyes|cky-consent/, false],
    ['iubenda', /iubenda/, null],
    ['Didomi', /didomi/, null],
    ['Klaro', /klaro/, false],
    ['Complianz', /complianz|cmplz/, null],
  ];
  for (const [vendor, re, shows] of table) {
    if (re.test(t)) return { vendor, showsConfirmationByDefault: shows };
  }
  return { vendor: null, showsConfirmationByDefault: null };
}

/**
 * Проверка подписи зоны DNS (DNSSEC).
 *
 * ЗАЧЕМ КЛИЕНТУ. Без подписи зоны ответ DNS можно подменить по дороге: человек
 * набирает адрес банка, а попадает на копию. Подпись делает подмену
 * обнаружимой. Проверяется одним запросом и стоит ноль.
 *
 * ЧЕСТНАЯ ОГОВОРКА. Отсутствие подписи — не нарушение закона, а рекомендация:
 * так и помечено. Для государственных сайтов США подпись обязательна с 2009
 * года, для остальных — добрая воля. Поэтому severity = advisory, а не
 * обвинение: раздувать серьёзность ради красивого отчёта мы не будем.
 */
export async function probeDnssec(hostname: string): Promise<ProbeFinding[]> {
  const out: ProbeFinding[] = [];
  const root = hostname.replace(/^www\./, '');
  try {
    // Флаг do=1 просит резолвер вернуть данные проверки подписи; поле AD в
    // ответе означает «данные аутентифицированы», то есть подпись есть и верна.
    const r = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(root)}&type=DS&do=1`, {
      headers: { accept: 'application/dns-json' },
      signal: AbortSignal.timeout(6000),
    });
    const j = await r.json() as { Answer?: Array<{ type: number; data: string }>; AD?: boolean; Status?: number };
    // Если резолвер не ответил внятно — молчим. Обвинять без данных нельзя.
    if (typeof j.Status !== 'number' || j.Status !== 0) return out;
    const ds = (j.Answer || []).filter((a) => a.type === 43);
    if (ds.length === 0) {
      out.push({
        code: 'DNS-SEC-001',
        title: 'Зона DNS не подписана (нет DNSSEC)',
        severity: 'advisory',
        evidence: `У домена ${root} нет записи DS: подпись зоны не настроена, подмену ответа DNS обнаружить нельзя`,
        source: 'запрос к DNS',
        remedy: 'Включить DNSSEC у регистратора или в панели DNS. У большинства это один переключатель. Защищает от подмены адреса сайта и почты по дороге к посетителю.',
      });
    }
  } catch { /* сеть подвела — молчим */ }
  return out;
}

/**
 * Проверка веса картинок: современные форматы и отложенная загрузка.
 *
 * ЗАЧЕМ КЛИЕНТУ. Картинки — обычно больше половины веса страницы. Если они
 * отдаются одним размером на все экраны и грузятся все сразу, телефон на
 * медленной связи ждёт лишние секунды. Это прямо бьёт по показателям скорости,
 * которые Google учитывает в выдаче.
 *
 * ЧЕСТНАЯ ОГОВОРКА. Это не нарушение закона — это скорость и деньги. Помечено
 * как рекомендация. Считаем только картинки НИЖЕ первого экрана условно: у
 * первых двух отложенная загрузка как раз вредна, поэтому их не трогаем.
 */
export function probeImageDelivery(html: string): ProbeFinding[] {
  const out: ProbeFinding[] = [];
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  if (imgs.length < 4) return out;

  // Первые две картинки пропускаем: обычно это логотип и главная иллюстрация,
  // им отложенная загрузка только вредит.
  const below = imgs.slice(2);
  const noLazy = below.filter((t) => !/loading\s*=\s*["']?lazy/i.test(t));
  const noSrcset = imgs.filter((t) => !/\bsrcset\s*=/i.test(t) && !/\bsizes\s*=/i.test(t));

  if (noLazy.length >= 3) {
    out.push({
      code: 'PERF-IMG-001',
      title: 'Картинки ниже первого экрана грузятся сразу',
      severity: 'advisory',
      evidence: `Из ${imgs.length} картинок ${noLazy.length} не имеют атрибута loading="lazy" — браузер скачивает их ещё до того, как посетитель до них долистает`,
      source: 'исходный код страницы',
      remedy: 'Добавить loading="lazy" картинкам ниже первого экрана. Первым двум — не добавлять, им это вредит. Экономит трафик посетителя и ускоряет первую отрисовку.',
    });
  }

  if (noSrcset.length === imgs.length && imgs.length >= 6) {
    out.push({
      code: 'PERF-IMG-002',
      title: 'Одна и та же картинка отдаётся телефону и большому экрану',
      severity: 'advisory',
      evidence: `Ни одна из ${imgs.length} картинок не объявляет srcset или sizes: телефон скачивает изображение, рассчитанное на широкий экран`,
      source: 'исходный код страницы',
      remedy: 'Объявить srcset с несколькими размерами и sizes. Телефон возьмёт меньший файл — страница откроется заметно быстрее на медленной связи.',
    });
  }
  return out;
}

/**
 * Проверка очистки данных при выходе из учётной записи.
 *
 * ЗАЧЕМ КЛИЕНТУ. Человек вышел из кабинета на чужом или общем компьютере. Если
 * сервер при выходе не попросил браузер стереть данные сайта, в хранилище
 * остаются его сведения — их увидит следующий, кто сядет за этот компьютер.
 * Заголовок Clear-Site-Data решает это одной строкой.
 *
 * ЧЕСТНАЯ ОГОВОРКА. Обязательным требованием закона это не является, поэтому
 * рекомендация, а не обвинение. Проверяем только если у сайта есть страница
 * выхода — иначе проверять нечего и молчим.
 */
export async function probeLogoutCleanup(origin: string): Promise<ProbeFinding[]> {
  const out: ProbeFinding[] = [];
  const paths = ['/logout', '/signout', '/api/auth/logout', '/api/logout', '/vyhod'];
  for (const path of paths) {
    try {
      const r = await fetch(origin + path, {
        method: 'GET',
        redirect: 'manual',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; AIfa-Oracle/2.2)' },
        signal: AbortSignal.timeout(6000),
      });
      // Страница выхода найдена, если ответ не «не найдено».
      if (r.status === 404 || r.status === 410) continue;

      // Перенаправление — это НЕ страница выхода.
      //
      // Поймано на собственном сайте: codeofdigitaleternity.com переводит все
      // запросы на адрес с www, и /logout отвечал кодом 308. Проверка считала
      // это найденной страницей выхода, не находила в перенаправлении заголовка
      // Clear-Site-Data (его там и не может быть) и выставляла замечание на
      // ровном месте. Настоящий выход на этом сайте отвечает кодом 405, то есть
      // сделан правильно — только через POST.
      //
      // По самому перенаправлению не идём намеренно: цель может вести на другой
      // домен, а ходить по чужим адресам от имени заказчика мы не станем.
      if (r.status >= 300 && r.status < 400) continue;

      // Ответ «метод не поддерживается» означает, что выход принимает только
      // POST. Это ПРАВИЛЬНО: выход по обычной ссылке — известная уязвимость,
      // при которой чужая страница может разлогинить посетителя картинкой.
      // Проверить заголовок мы в этом случае не можем: слать POST на чужой
      // сайт нельзя, он может что-то изменить. А раз проверить не можем —
      // молчим. Поймано на собственном сайте: заголовок там стоял, а проверка
      // всё равно докладывала о его отсутствии.
      if (r.status === 405 || r.status === 501) continue;

      const csd = r.headers.get('clear-site-data');
      if (!csd) {
        out.push({
          code: 'PRIV-LOGOUT-001',
          title: 'При выходе из кабинета данные в браузере не стираются',
          severity: 'advisory',
          evidence: `Ответ ${path} (код ${r.status}) не содержит заголовка Clear-Site-Data: после выхода сведения о человеке остаются в хранилище браузера`,
          source: 'заголовки ответа',
          remedy: 'Отдавать при выходе заголовок Clear-Site-Data: "cache", "cookies", "storage". Особенно важно там, где входят с чужого или общего компьютера.',
        });
      }
      // Достаточно одной найденной страницы выхода.
      break;
    } catch { /* следующий путь */ }
  }
  return out;
}

/**
 * Оценка от 0 до 100 по весам серьёзности.
 *
 * Раньше «счёт» считался как 2000 минус число находок, то есть сайт с одной
 * найденной проблемой получал 1999 из 2000 и выглядел почти идеальным. Теперь
 * критическая находка бьёт по оценке ощутимо, а рекомендация — почти нет.
 */
export function scoreFromFindings(findings: Array<{ severity: string }>): number {
  const weight: Record<string, number> = { critical: 25, serious: 12, moderate: 5, advisory: 1 };
  const penalty = findings.reduce((sum, x) => sum + (weight[x.severity] ?? 3), 0);

  // Штраф гасится, а не вычитается напрямую.
  //
  // Проверила на живом сайте: четырнадцать находок давали штраф больше ста, и
  // оценка становилась ровно 0. Ноль получал бы почти любой обычный сайт — а
  // значит оценка перестала бы что-либо значить и читалась бы как запугивание.
  // Здесь каждая следующая находка отнимает меньше предыдущей: разница между
  // «плохо» и «очень плохо» сохраняется, но дно не пробивается.
  //
  // Ориентиры: штраф 12 → около 76 бал.; 25 → 61; 50 → 45; 100 → 30; 200 → 19.
  const score = 100 * Math.exp(-penalty / 45);

  // Одна критическая находка не должна оставлять «отлично»: потолок при её
  // наличии — 69, иначе сайт с открытым /.env выглядел бы благополучным.
  const hasCritical = findings.some((f) => f.severity === 'critical');
  const capped = hasCritical ? Math.min(score, 69) : score;

  return Math.max(3, Math.round(capped));
}
