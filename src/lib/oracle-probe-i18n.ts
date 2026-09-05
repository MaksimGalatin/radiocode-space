/**
 * Тексты находок AIfaFocus на четырёх языках.
 *
 * ЗАЧЕМ. Названия находок, доказательства, источники и советы по исправлению
 * были вписаны в oracle-probe.ts по-русски. Отчёт приходил на русском даже при
 * locale="en": англоязычный клиент открывал наш отчёт о СВОЁМ сайте и видел
 * кириллицу. Для холодной рассылки на англоязычный рынок это обрывало цепочку
 * на последнем шаге — письмо прочитано, ссылка открыта, и там непонятный язык.
 *
 * ПОЧЕМУ ПЕРЕВОД ЖИВЁТ ЗДЕСЬ, А НЕ В ПРОБАХ. В oracle-probe.ts нет переменной
 * locale — пробы её не получают и не должны: их дело измерять, а не оформлять.
 * Поэтому находка переводится один раз, уже собранной, в маршруте сканера, где
 * язык известен. Логика сорока двух проверок при этом не тронута вовсе.
 *
 * ПОЧЕМУ ПО КОДУ, А НЕ ПО ТЕКСТУ. Код находки не меняется при правке
 * формулировок. Правка русского оригинала не рассыплет словарь.
 *
 * Файл собран скриптом AIFA_РАБОТА/оракул-перевод/собрать_i18n.py и правится
 * тем же путём: правим ru.json, переводим, запускаем скрипт заново.
 */

export type OracleLang = 'ru' | 'en' | 'es' | 'zh';

/** Поля находки, которые видит человек и которые поэтому переводятся. */
type Fields = Partial<Record<'title' | 'evidence' | 'source' | 'remedy', string>>;

const TEXTS: Record<OracleLang, Record<string, Fields>> = {
  ru: {
    "A11Y-VIEWPORT-001": {
      "remedy": "Убрать user-scalable=no и maximum-scale: людям со слабым зрением иначе не прочитать текст.",
      "source": "исходный код страницы",
      "title": "Посетителю запрещено увеличивать страницу"
    },
    "AIACT-001": {
      "evidence": "На странице найден чат-виджет, но нигде не сказано, что собеседник — программа",
      "remedy": "Указать в окне чата, что отвечает искусственный интеллект — этого требует статья 50 Акта ЕС об ИИ.",
      "source": "исходный код страницы",
      "title": "Чат-помощник не раскрывает, что это машина"
    },
    "COOKIE-LIFE-001": {
      "evidence": "Max-Age=${ma} секунд — это ${Math.round(Number(ma) / 2_592_000)} месяцев",
      "remedy": "Сократить срок до 13 месяцев — таков ориентир надзорных органов ЕС.",
      "source": "заголовок Set-Cookie",
      "title": "Cookie «${c.split('=')[0].trim()}» живёт дольше 13 месяцев"
    },
    "DNS-DMARC-001": {
      "evidence": "У домена ${root} есть почта (запись MX), но записи DMARC нет",
      "remedy": "Добавить TXT-запись _dmarc со значением v=DMARC1; p=none; rua=mailto:ваш@адрес — начать с наблюдения.",
      "source": "публичный DNS",
      "title": "Письмо от вашего имени может отправить кто угодно"
    },
    "DNS-SEC-001": {
      "evidence": "У домена ${root} нет записи DS: подпись зоны не настроена, подмену ответа DNS обнаружить нельзя",
      "remedy": "Включить DNSSEC у регистратора или в панели DNS. У большинства это один переключатель. Защищает от подмены адреса сайта и почты по дороге к посетителю.",
      "source": "запрос к DNS",
      "title": "Зона DNS не подписана (нет DNSSEC)"
    },
    "DNS-SPF-001": {
      "evidence": "У домена ${root} есть почта, но записи SPF нет",
      "remedy": "Добавить TXT-запись SPF со списком разрешённых отправителей.",
      "source": "публичный DNS",
      "title": "Не указано, кому разрешено слать письма от домена"
    },
    "DNS-SPF-002": {
      "evidence": "В записи SPF ${lookups} механизмов при пределе 10 — почтовые серверы вернут ошибку и проверка не сработает",
      "remedy": "Сократить число include или свести их в одну плоскую запись.",
      "source": "публичный DNS",
      "title": "Проверка отправителя молча не работает: превышен предел DNS-обращений"
    },
    "EUODR-001": {
      "evidence": "Найдена ссылка на ec.europa.eu/consumers/odr — платформа отключена 20.07.2025",
      "remedy": "Убрать ссылку и указать действующий порядок досудебного урегулирования.",
      "source": "исходный код страницы",
      "title": "В подвале осталась ссылка на отключённую платформу споров ЕС"
    },
    "EXPO-WP-001": {
      "evidence": "В разметке найдены признаки WordPress (wp-content / wp-json)",
      "remedy": "Закрыть /wp-json/wp/v2/users: по нему публикуется список логинов администраторов.",
      "source": "исходный код страницы",
      "title": "Сайт на WordPress — проверьте, не открыт ли список авторов"
    },
    "GDPR-CONSENT-001": {
      "evidence": "В разметке найдено: ${trackers.join(', ')}; ни одного известного менеджера согласия не обнаружено",
      "remedy": "Подключить менеджер согласия и не запускать счётчики до явного «да» посетителя.",
      "source": "исходный код страницы",
      "title": "Слежка подключается без спроса согласия"
    },
    "GDPR-POLICY-001": {
      "evidence": "Ни в тексте, ни в ссылках не найдено упоминания политики конфиденциальности",
      "remedy": "Разместить ссылку на политику в подвале каждой страницы.",
      "source": "исходный код страницы",
      "title": "На странице нет ссылки на политику конфиденциальности"
    },
    "GPC-001": {
      "evidence": "С заголовком Sec-GPC сайт всё равно ставит рекламные cookie: ${gpc.map((c) => c.split('=')[0]).join(', ').slice(0, 120)}",
      "remedy": "Уважать заголовок Sec-GPC. На 2026 год этого требуют законы двенадцати штатов США: Калифорния, Колорадо, Коннектикут, Делавэр, Мэриленд, Миннесота, Монтана, Небраска, Нью-Гэмпшир, Нью-Джерси, Орегон и Техас. Штрафы по этому основанию уже выписывались: Sephora — 1,2 млн долларов, Healthline — 1,55 млн, Disney — 2,75 млн, Ford — 375 тысяч.",
      "source": "сравнение двух запросов",
      "title": "Сигнал «не продавать мои данные» игнорируется"
    },
    "GPC-002": {
      "title": "Сайт использует рекламные механизмы, но не подтверждает отказ от продажи данных"
    },
    "IMPR-001": {
      "evidence": "Страница выглядит коммерческой (корзина, цены, кнопка покупки), но раздела с юридическими данными не найдено",
      "remedy": "Добавить раздел с названием организации, адресом, почтой и регистрационным номером — этого требует директива ЕС об электронной торговле.",
      "source": "исходный код страницы",
      "title": "Нет обязательных сведений о продавце"
    },
    "OPS-ROBOTS-001": {
      "evidence": "Запрос /robots.txt вернул код ${robots.status || 'нет ответа'}",
      "remedy": "Добавить robots.txt — без него поисковые и ИИ-обходчики работают вслепую.",
      "source": "проба файла",
      "title": "Нет файла robots.txt"
    },
    "OPS-SECTXT-001": {
      "evidence": "Запрос /.well-known/security.txt не вернул файл",
      "remedy": "Добавить /.well-known/security.txt с адресом для сообщений о проблемах безопасности.",
      "source": "проба файла",
      "title": "Нет security.txt — исследователю некуда сообщить об уязвимости"
    },
    "PERF-IMG-001": {
      "evidence": "Из ${imgs.length} картинок ${noLazy.length} не имеют атрибута loading=\"lazy\" — браузер скачивает их ещё до того, как посетитель до них долистает",
      "remedy": "Добавить loading=\"lazy\" картинкам ниже первого экрана. Первым двум — не добавлять, им это вредит. Экономит трафик посетителя и ускоряет первую отрисовку.",
      "source": "исходный код страницы",
      "title": "Картинки ниже первого экрана грузятся сразу"
    },
    "PERF-IMG-002": {
      "evidence": "Ни одна из ${imgs.length} картинок не объявляет srcset или sizes: телефон скачивает изображение, рассчитанное на широкий экран",
      "remedy": "Объявить srcset с несколькими размерами и sizes. Телефон возьмёт меньший файл — страница откроется заметно быстрее на медленной связи.",
      "source": "исходный код страницы",
      "title": "Одна и та же картинка отдаётся телефону и большому экрану"
    },
    "PRIV-LOGOUT-001": {
      "title": "При выходе из кабинета данные в браузере не стираются"
    },
    "PRIV-PERM-001": {
      "evidence": "Заголовок Permissions-Policy отсутствует",
      "remedy": "Добавить Permissions-Policy и явно запретить неиспользуемые возможности.",
      "source": "заголовки ответа",
      "title": "Не ограничен доступ к камере, микрофону и геопозиции"
    },
    "PRIV-REF-001": {
      "evidence": "Заголовок Referrer-Policy отсутствует — браузер передаёт полный адрес перехода",
      "remedy": "Добавить Referrer-Policy: strict-origin-when-cross-origin.",
      "source": "заголовки ответа",
      "title": "Адреса ваших страниц утекают на чужие сайты"
    },
    "SEC-CLICK-001": {
      "evidence": "Нет ни X-Frame-Options, ни директивы frame-ancestors в CSP",
      "remedy": "Добавить frame-ancestors в CSP (предпочтительно) или X-Frame-Options: SAMEORIGIN.",
      "source": "заголовки ответа",
      "title": "Страницу можно встроить в чужой сайт (риск подмены кликов)"
    },
    "SEC-COOKIE-001": {
      "remedy": "Выставлять Secure, HttpOnly и SameSite=Lax (или Strict) для служебных cookie.",
      "source": "заголовок Set-Cookie",
      "title": "Cookie «${name}» выставлена без защитных флагов"
    },
    "SEC-CORS-001": {
      "remedy": "Ограничить список доверенных источников вместо звёздочки.",
      "source": "заголовки ответа",
      "title": "Ответ разрешено читать любому стороннему сайту"
    },
    "SEC-CSP-001": {
      "remedy": "Ввести CSP, начав с режима наблюдения, затем перевести в боевой.",
      "source": "заголовки ответа",
      "title": "Нет политики безопасности содержимого (CSP)"
    },
    "SEC-CSP-002": {
      "evidence": "Директива script-src содержит 'unsafe-eval': ${scriptSrc.trim().slice(0, 200)}",
      "source": "заголовки ответа",
      "title": "Скриптам разрешено собирать код из строк (unsafe-eval)"
    },
    "SEC-CSP-004": {
      "evidence": "Директива script-src содержит 'unsafe-inline' и не содержит ни nonce, ни хэша: ${scriptSrc.trim().slice(0, 200)}",
      "remedy": "Перейти на одноразовые метки (nonce) или хэши. Тогда встроенный скрипт, подставленный злоумышленником, выполнен не будет.",
      "source": "заголовки ответа",
      "title": "Разрешены встроенные скрипты без одноразовой метки"
    },
    "SEC-CSP-005": {
      "remedy": "Вынести блоки <style> в обычные файлы стилей и задать style-src-elem без ",
      "source": "заголовки ответа",
      "title": "Разрешены встроенные блоки оформления"
    },
    "SEC-ENV-001": {
      "evidence": "/.env отдаётся публично и содержит строки вида ИМЯ=значение",
      "remedy": "Немедленно убрать файл из публичного доступа и сменить все ключи, которые в нём были.",
      "source": "проба файла",
      "title": "Наружу открыт файл настроек с переменными окружения"
    },
    "SEC-FORM-001": {
      "evidence": "Найдено ${insecureForms.length} форм с action по http://, например: ${(insecureForms[0] ?? '').slice(0, 100)}",
      "remedy": "Перевести отправку форм на https:// — иначе всё введённое читается по дороге.",
      "source": "исходный код страницы",
      "title": "Форма отправляет данные по незащищённому каналу"
    },
    "SEC-GIT-001": {
      "evidence": "/.git/HEAD отдаётся публично и содержит: ${git.text.trim().slice(0, 80)}",
      "remedy": "Немедленно закрыть доступ к /.git — по нему выгружается весь исходный код сайта.",
      "source": "проба файла",
      "title": "Наружу открыт служебный каталог .git"
    },
    "SEC-HSTS-001": {
      "evidence": "Заголовок Strict-Transport-Security в ответе отсутствует",
      "remedy": "Добавить Strict-Transport-Security: max-age=31536000; includeSubDomains.",
      "source": "заголовки ответа",
      "title": "Нет заголовка HSTS"
    },
    "SEC-HSTS-002": {
      "remedy": "Поднять max-age минимум до 15552000 (полгода), рекомендуется 31536000.",
      "source": "заголовки ответа",
      "title": "Срок действия HSTS слишком мал"
    },
    "SEC-INFO-001": {
      "remedy": "Скрыть версии: это подсказка нападающему, какие уязвимости пробовать.",
      "source": "заголовки ответа",
      "title": "Сервер сообщает версии своего программного обеспечения"
    },
    "SEC-MIME-001": {
      "remedy": "Добавить X-Content-Type-Options: nosniff.",
      "source": "заголовки ответа",
      "title": "Браузеру разрешено угадывать тип содержимого"
    },
    "SEC-MIXED-001": {
      "evidence": "Найдено ${real.length} ссылок вида http://, например: ${real[0].slice(0, 120)}",
      "remedy": "Перевести все внешние ресурсы на https:// — иначе браузер их заблокирует.",
      "source": "исходный код страницы",
      "title": "Защищённая страница подгружает файлы по незащищённому каналу"
    },
    "SEC-PWD-001": {
      "evidence": "На странице есть поле ввода пароля, а сама страница отдаётся по http://",
      "remedy": "Немедленно перевести страницу на https:// — пароли уходят открытым текстом.",
      "source": "исходный код страницы",
      "title": "Поле пароля на незащищённой странице"
    },
    "SEC-TLS-001": {
      "evidence": "Итоговый адрес после переходов: ${artifacts.finalUrl}",
      "remedy": "Выпустить сертификат и включить постоянный редирект с http:// на https://.",
      "source": "итоговый URL ответа",
      "title": "Сайт отдаётся без шифрования (HTTP)"
    },
    "SUPPLY-MAP-001": {
      "evidence": "В разметке присутствует ссылка sourceMappingURL — по ней восстанавливается исходный код с комментариями",
      "remedy": "Отключить публикацию карт кода в сборке для продакшена.",
      "source": "исходный код страницы",
      "title": "Наружу отдаётся карта исходного кода"
    },
    "SUPPLY-SRI-001": {
      "evidence": "${noSri.length} внешних скриптов без атрибута integrity, например с узлов: ${hosts.join(', ')}",
      "remedy": "Добавить атрибут integrity к внешним скриптам: тогда подменённый файл просто не выполнится.",
      "source": "исходный код страницы",
      "title": "Чужие скрипты подключены без проверки подлинности"
    },
    "TRUTH-002": {
      "evidence": "Найдено упоминание: ${obsolete.join('; ')}",
      "remedy": "Обновить юридические тексты: ссылка на отменённый механизм показывает, что документы не пересматривались годами.",
      "source": "исходный код страницы",
      "title": "Документы ссылаются на отменённые правовые механизмы"
    },
    "XFER-FONTS-001": {
      "evidence": "В разметке найдено обращение к fonts.googleapis.com / fonts.gstatic.com",
      "remedy": "Скачать шрифты и раздавать со своего домена — это снимает передачу данных целиком.",
      "source": "исходный код страницы",
      "title": "Шрифты грузятся прямо с серверов Google — адрес посетителя уходит в США"
    }
  },
  en: {
    "A11Y-VIEWPORT-001": {
      "remedy": "Remove user-scalable=no and maximum-scale: without zoom, people with poor eyesight cannot read the text.",
      "source": "page source",
      "title": "Visitors are prevented from zooming the page"
    },
    "AIACT-001": {
      "evidence": "A chat widget was found on the page, but nowhere does it say that the visitor is talking to software",
      "remedy": "State in the chat window that the replies come from artificial intelligence — Article 50 of the EU AI Act requires this.",
      "source": "page source",
      "title": "The chat assistant does not disclose that it is a machine"
    },
    "COOKIE-LIFE-001": {
      "evidence": "Max-Age=${ma} seconds — that is ${Math.round(Number(ma) / 2_592_000)} months",
      "remedy": "Shorten the lifetime to 13 months — that is the benchmark used by EU supervisory authorities.",
      "source": "Set-Cookie header",
      "title": "Cookie “${c.split('=')[0].trim()}” lives longer than 13 months"
    },
    "DNS-DMARC-001": {
      "evidence": "The domain ${root} has mail (an MX record), but there is no DMARC record",
      "remedy": "Add a _dmarc TXT record with the value v=DMARC1; p=none; rua=mailto:your@address — start in monitoring mode.",
      "source": "public DNS",
      "title": "Anyone can send email in your name"
    },
    "DNS-SEC-001": {
      "evidence": "The domain ${root} has no DS record: the zone is not signed, so a forged DNS answer cannot be detected",
      "remedy": "Enable DNSSEC at your registrar or in your DNS panel. With most providers this is a single switch. It protects the addresses of your site and your mail from being substituted on the way to the visitor.",
      "source": "DNS query",
      "title": "The DNS zone is not signed (no DNSSEC)"
    },
    "DNS-SPF-001": {
      "evidence": "The domain ${root} has mail, but there is no SPF record",
      "remedy": "Add an SPF TXT record listing the permitted senders.",
      "source": "public DNS",
      "title": "It is not stated who is allowed to send email from the domain"
    },
    "DNS-SPF-002": {
      "evidence": "The SPF record has ${lookups} mechanisms against a limit of 10 — mail servers will return an error and the check will not work",
      "remedy": "Reduce the number of include mechanisms or flatten them into a single record.",
      "source": "public DNS",
      "title": "Sender checking silently fails: the DNS lookup limit is exceeded"
    },
    "EUODR-001": {
      "evidence": "A link to ec.europa.eu/consumers/odr was found — the platform was shut down on 20 July 2025",
      "remedy": "Remove the link and set out the out-of-court dispute resolution procedure that is currently in force.",
      "source": "page source",
      "title": "The footer still carries a link to the discontinued EU dispute platform"
    },
    "EXPO-WP-001": {
      "evidence": "Signs of WordPress were found in the markup (wp-content / wp-json)",
      "remedy": "Block /wp-json/wp/v2/users: it publishes the list of administrator usernames.",
      "source": "page source",
      "title": "The site runs on WordPress — check whether the author list is exposed"
    },
    "GDPR-CONSENT-001": {
      "evidence": "Found in the markup: ${trackers.join(', ')}; no known consent manager was detected",
      "remedy": "Add a consent manager and do not start the tracking scripts until the visitor has explicitly said yes.",
      "source": "page source",
      "title": "Tracking is loaded without asking for consent"
    },
    "GDPR-POLICY-001": {
      "evidence": "No mention of a privacy policy was found, either in the text or in the links",
      "remedy": "Place a link to the policy in the footer of every page.",
      "source": "page source",
      "title": "The page has no link to a privacy policy"
    },
    "GPC-001": {
      "evidence": "With the Sec-GPC header present, the site still sets advertising cookies: ${gpc.map((c) => c.split('=')[0]).join(', ').slice(0, 120)}",
      "remedy": "Honour the Sec-GPC header. As of 2026 the laws of twelve US states require it: California, Colorado, Connecticut, Delaware, Maryland, Minnesota, Montana, Nebraska, New Hampshire, New Jersey, Oregon and Texas. Fines have already been issued on this ground: Sephora — $1.2 million, Healthline — $1.55 million, Disney — $2.75 million, Ford — $375 thousand.",
      "source": "comparison of two requests",
      "title": "The “do not sell my data” signal is ignored"
    },
    "GPC-002": {
      "title": "The site uses advertising technology but does not confirm any opt-out from the sale of data"
    },
    "IMPR-001": {
      "evidence": "The page looks commercial (basket, prices, buy button), but no section with legal details was found",
      "remedy": "Add a section with the name of the organisation, its address, email and registration number — the EU e-commerce directive requires this.",
      "source": "page source",
      "title": "The mandatory seller details are missing"
    },
    "OPS-ROBOTS-001": {
      "evidence": "A request for /robots.txt returned status ${robots.status || 'no response'}",
      "remedy": "Add a robots.txt — without it, search and AI crawlers work blind.",
      "source": "file probe",
      "title": "There is no robots.txt file"
    },
    "OPS-SECTXT-001": {
      "evidence": "A request for /.well-known/security.txt returned no file",
      "remedy": "Add /.well-known/security.txt with an address for reports about security problems.",
      "source": "file probe",
      "title": "No security.txt — a researcher has nowhere to report a vulnerability"
    },
    "PERF-IMG-001": {
      "evidence": "Of ${imgs.length} images, ${noLazy.length} have no loading=\"lazy\" attribute — the browser downloads them before the visitor has scrolled down to them",
      "remedy": "Add loading=\"lazy\" to the images below the fold. Do not add it to the first two — it harms them. This saves the visitor's data and speeds up the first render.",
      "source": "page source",
      "title": "Images below the fold are loaded straight away"
    },
    "PERF-IMG-002": {
      "evidence": "None of the ${imgs.length} images declares srcset or sizes: a phone downloads an image intended for a wide screen",
      "remedy": "Declare srcset with several sizes, together with sizes. A phone will then take the smaller file and the page will open noticeably faster on a slow connection.",
      "source": "page source",
      "title": "The same image is served to a phone and to a large screen"
    },
    "PRIV-LOGOUT-001": {
      "title": "Logging out of the account area does not clear the data held in the browser"
    },
    "PRIV-PERM-001": {
      "evidence": "The Permissions-Policy header is missing",
      "remedy": "Add Permissions-Policy and explicitly deny the features you do not use.",
      "source": "response headers",
      "title": "Access to the camera, microphone and location is not restricted"
    },
    "PRIV-REF-001": {
      "evidence": "The Referrer-Policy header is missing — the browser passes on the full address the visitor came from",
      "remedy": "Add Referrer-Policy: strict-origin-when-cross-origin.",
      "source": "response headers",
      "title": "The addresses of your pages leak to third-party sites"
    },
    "SEC-CLICK-001": {
      "evidence": "There is neither X-Frame-Options nor a frame-ancestors directive in the CSP",
      "remedy": "Add frame-ancestors to the CSP (preferred) or X-Frame-Options: SAMEORIGIN.",
      "source": "response headers",
      "title": "The page can be embedded in someone else's site (clickjacking risk)"
    },
    "SEC-COOKIE-001": {
      "remedy": "Set Secure, HttpOnly and SameSite=Lax (or Strict) on functional cookies.",
      "source": "Set-Cookie header",
      "title": "Cookie “${name}” is set without protective flags"
    },
    "SEC-CORS-001": {
      "remedy": "Restrict the list of trusted origins instead of using an asterisk.",
      "source": "response headers",
      "title": "Any third-party site is allowed to read the response"
    },
    "SEC-CSP-001": {
      "remedy": "Introduce a CSP, starting in report-only mode, then switch it to enforcing.",
      "source": "response headers",
      "title": "There is no Content-Security-Policy (CSP)"
    },
    "SEC-CSP-002": {
      "evidence": "The script-src directive contains 'unsafe-eval': ${scriptSrc.trim().slice(0, 200)}",
      "source": "response headers",
      "title": "Scripts are allowed to build code out of strings (unsafe-eval)"
    },
    "SEC-CSP-004": {
      "evidence": "The script-src directive contains 'unsafe-inline' and contains neither a nonce nor a hash: ${scriptSrc.trim().slice(0, 200)}",
      "remedy": "Move to one-time tokens (nonce) or hashes. An inline script injected by an attacker will then not run.",
      "source": "response headers",
      "title": "Inline scripts are allowed without a nonce"
    },
    "SEC-CSP-005": {
      "remedy": "Move the <style> blocks into ordinary stylesheet files and set style-src-elem without ",
      "source": "response headers",
      "title": "Inline style blocks are allowed"
    },
    "SEC-ENV-001": {
      "evidence": "/.env is served publicly and contains lines of the form NAME=value",
      "remedy": "Remove the file from public access immediately and replace every key it contained.",
      "source": "file probe",
      "title": "The settings file with the environment variables is exposed"
    },
    "SEC-FORM-001": {
      "evidence": "Found ${insecureForms.length} forms with an http:// action, for example: ${(insecureForms[0] ?? '').slice(0, 100)}",
      "remedy": "Move form submission to https:// — otherwise everything entered can be read in transit.",
      "source": "page source",
      "title": "A form sends data over an unencrypted channel"
    },
    "SEC-GIT-001": {
      "evidence": "/.git/HEAD is served publicly and contains: ${git.text.trim().slice(0, 80)}",
      "remedy": "Close access to /.git immediately — it allows the entire source code of the site to be downloaded.",
      "source": "file probe",
      "title": "The internal .git directory is exposed"
    },
    "SEC-HSTS-001": {
      "evidence": "The Strict-Transport-Security header is missing from the response",
      "remedy": "Add Strict-Transport-Security: max-age=31536000; includeSubDomains.",
      "source": "response headers",
      "title": "There is no HSTS header"
    },
    "SEC-HSTS-002": {
      "remedy": "Raise max-age to at least 15552000 (six months); 31536000 is recommended.",
      "source": "response headers",
      "title": "The HSTS lifetime is too short"
    },
    "SEC-INFO-001": {
      "remedy": "Hide the version numbers: they tell an attacker which vulnerabilities to try.",
      "source": "response headers",
      "title": "The server announces the versions of its software"
    },
    "SEC-MIME-001": {
      "remedy": "Add X-Content-Type-Options: nosniff.",
      "source": "response headers",
      "title": "The browser is allowed to guess the content type (MIME sniffing)"
    },
    "SEC-MIXED-001": {
      "evidence": "Found ${real.length} links of the form http://, for example: ${real[0].slice(0, 120)}",
      "remedy": "Move all external resources to https:// — otherwise the browser will block them.",
      "source": "page source",
      "title": "A secure page loads files over an unencrypted channel"
    },
    "SEC-PWD-001": {
      "evidence": "The page has a password field, yet the page itself is served over http://",
      "remedy": "Move the page to https:// immediately — passwords are going out in clear text.",
      "source": "page source",
      "title": "A password field on an unencrypted page"
    },
    "SEC-TLS-001": {
      "evidence": "Final address after the redirects: ${artifacts.finalUrl}",
      "remedy": "Issue a certificate and enable a permanent redirect from http:// to https://.",
      "source": "final response URL",
      "title": "The site is served without encryption (HTTP)"
    },
    "SUPPLY-MAP-001": {
      "evidence": "The markup contains a sourceMappingURL reference — it allows the source code, comments and all, to be reconstructed",
      "remedy": "Turn off the publishing of source maps in the production build.",
      "source": "page source",
      "title": "The source map is served publicly"
    },
    "SUPPLY-SRI-001": {
      "evidence": "${noSri.length} external scripts have no integrity attribute, for example from the hosts: ${hosts.join(', ')}",
      "remedy": "Add the integrity attribute to external scripts: a substituted file will then simply not run.",
      "source": "page source",
      "title": "Third-party scripts are loaded without an authenticity check"
    },
    "TRUTH-002": {
      "evidence": "Reference found: ${obsolete.join('; ')}",
      "remedy": "Update the legal texts: a reference to a repealed mechanism shows that the documents have not been reviewed for years.",
      "source": "page source",
      "title": "The documents refer to repealed legal mechanisms"
    },
    "XFER-FONTS-001": {
      "evidence": "A request to fonts.googleapis.com / fonts.gstatic.com was found in the markup",
      "remedy": "Download the fonts and serve them from your own domain — this removes the data transfer altogether.",
      "source": "page source",
      "title": "Fonts are loaded straight from Google's servers — the visitor's address goes to the USA"
    }
  },
  es: {
    "A11Y-VIEWPORT-001": {
      "remedy": "Eliminar user-scalable=no y maximum-scale: sin ese cambio, las personas con baja visión no pueden leer el texto.",
      "source": "código fuente de la página",
      "title": "El visitante no puede ampliar la página"
    },
    "AIACT-001": {
      "evidence": "Se ha detectado un widget de chat en la página, pero en ningún sitio se indica que el interlocutor es un programa",
      "remedy": "Indicar en la ventana del chat que quien responde es una inteligencia artificial: así lo exige el artículo 50 del Reglamento de IA de la UE.",
      "source": "código fuente de la página",
      "title": "El asistente de chat no revela que es una máquina"
    },
    "COOKIE-LIFE-001": {
      "evidence": "Max-Age=${ma} segundos, es decir, ${Math.round(Number(ma) / 2_592_000)} meses",
      "remedy": "Reducir la duración a 13 meses: es la referencia que marcan las autoridades de control de la UE.",
      "source": "cabecera Set-Cookie",
      "title": "La cookie «${c.split('=')[0].trim()}» dura más de 13 meses"
    },
    "DNS-DMARC-001": {
      "evidence": "El dominio ${root} tiene correo (registro MX), pero no tiene registro DMARC",
      "remedy": "Añadir un registro TXT _dmarc con el valor v=DMARC1; p=none; rua=mailto:su@direccion: empezar en modo de observación.",
      "source": "DNS público",
      "title": "Cualquiera puede enviar correos en su nombre"
    },
    "DNS-SEC-001": {
      "evidence": "El dominio ${root} no tiene registro DS: la zona no está firmada y no es posible detectar la manipulación de una respuesta DNS",
      "remedy": "Activar DNSSEC en el registrador o en el panel de DNS. En la mayoría de los casos es un único interruptor. Protege frente a la suplantación de la dirección del sitio y del correo en el trayecto hasta el visitante.",
      "source": "consulta al DNS",
      "title": "La zona DNS no está firmada (sin DNSSEC)"
    },
    "DNS-SPF-001": {
      "evidence": "El dominio ${root} tiene correo, pero no tiene registro SPF",
      "remedy": "Añadir un registro TXT SPF con la lista de remitentes autorizados.",
      "source": "DNS público",
      "title": "No consta quién está autorizado a enviar correos desde el dominio"
    },
    "DNS-SPF-002": {
      "evidence": "El registro SPF contiene ${lookups} mecanismos frente al límite de 10: los servidores de correo devolverán un error y la comprobación no se aplicará",
      "remedy": "Reducir el número de include o consolidarlos en un único registro plano.",
      "source": "DNS público",
      "title": "La comprobación del remitente falla en silencio: se supera el límite de consultas DNS"
    },
    "EUODR-001": {
      "evidence": "Se ha encontrado un enlace a ec.europa.eu/consumers/odr: la plataforma se cerró el 20/07/2025",
      "remedy": "Eliminar el enlace e indicar el procedimiento de resolución extrajudicial vigente.",
      "source": "código fuente de la página",
      "title": "En el pie de página sigue habiendo un enlace a la plataforma de litigios de la UE ya cerrada"
    },
    "EXPO-WP-001": {
      "evidence": "En el marcado se han encontrado indicios de WordPress (wp-content / wp-json)",
      "remedy": "Cerrar el acceso a /wp-json/wp/v2/users: por ahí se publica la lista de nombres de usuario de los administradores.",
      "source": "código fuente de la página",
      "title": "El sitio funciona con WordPress: compruebe si la lista de autores está abierta"
    },
    "GDPR-CONSENT-001": {
      "evidence": "En el marcado se ha encontrado: ${trackers.join(', ')}; no se ha detectado ningún gestor de consentimiento conocido",
      "remedy": "Instalar un gestor de consentimiento y no activar los sistemas de medición hasta que el visitante diga «sí» de forma expresa.",
      "source": "código fuente de la página",
      "title": "El rastreo se activa sin pedir consentimiento"
    },
    "GDPR-POLICY-001": {
      "evidence": "No se ha encontrado ninguna mención a la política de privacidad ni en el texto ni en los enlaces",
      "remedy": "Colocar un enlace a la política en el pie de todas las páginas.",
      "source": "código fuente de la página",
      "title": "La página no incluye enlace a la política de privacidad"
    },
    "GPC-001": {
      "evidence": "Con la cabecera Sec-GPC presente, el sitio sigue instalando cookies publicitarias: ${gpc.map((c) => c.split('=')[0]).join(', ').slice(0, 120)}",
      "remedy": "Respetar la cabecera Sec-GPC. En 2026 lo exigen las leyes de doce estados de EE. UU.: California, Colorado, Connecticut, Delaware, Maryland, Minnesota, Montana, Nebraska, Nuevo Hampshire, Nueva Jersey, Oregón y Texas. Ya se han impuesto multas por este motivo: Sephora, 1,2 millones de dólares; Healthline, 1,55 millones; Disney, 2,75 millones; Ford, 375 000.",
      "source": "comparación de dos solicitudes",
      "title": "Se ignora la señal «no vender mis datos»"
    },
    "GPC-002": {
      "title": "El sitio utiliza mecanismos publicitarios, pero no confirma la exclusión de la venta de datos"
    },
    "IMPR-001": {
      "evidence": "La página parece comercial (carrito, precios, botón de compra), pero no se ha encontrado un apartado con los datos legales",
      "remedy": "Añadir un apartado con la denominación de la empresa, la dirección, el correo electrónico y el número de registro: así lo exige la directiva de comercio electrónico de la UE.",
      "source": "código fuente de la página",
      "title": "Faltan los datos obligatorios del vendedor"
    },
    "OPS-ROBOTS-001": {
      "evidence": "La solicitud de /robots.txt devolvió el código ${robots.status || 'sin respuesta'}",
      "remedy": "Añadir robots.txt: sin él, los rastreadores de buscadores y de IA trabajan a ciegas.",
      "source": "sondeo del archivo",
      "title": "No existe el archivo robots.txt"
    },
    "OPS-SECTXT-001": {
      "evidence": "La solicitud de /.well-known/security.txt no devolvió ningún archivo",
      "remedy": "Añadir /.well-known/security.txt con una dirección de contacto para comunicar problemas de seguridad.",
      "source": "sondeo del archivo",
      "title": "No hay security.txt: un investigador no tiene dónde comunicar una vulnerabilidad"
    },
    "PERF-IMG-001": {
      "evidence": "De ${imgs.length} imágenes, ${noLazy.length} no llevan el atributo loading=\"lazy\": el navegador las descarga antes de que el visitante llegue a ellas al desplazarse",
      "remedy": "Añadir loading=\"lazy\" a las imágenes situadas bajo la línea de flotación. A las dos primeras no hay que añadírselo, porque las perjudica. Ahorra datos al visitante y acelera el primer renderizado.",
      "source": "código fuente de la página",
      "title": "Las imágenes situadas bajo la línea de flotación se cargan de inmediato"
    },
    "PERF-IMG-002": {
      "evidence": "Ninguna de las ${imgs.length} imágenes declara srcset ni sizes: el móvil descarga una imagen pensada para una pantalla ancha",
      "remedy": "Declarar srcset con varios tamaños y sizes. El móvil tomará el archivo más pequeño y la página se abrirá bastante más rápido con una conexión lenta.",
      "source": "código fuente de la página",
      "title": "Se sirve la misma imagen al móvil y a la pantalla grande"
    },
    "PRIV-LOGOUT-001": {
      "title": "Al salir del área privada no se borran los datos guardados en el navegador"
    },
    "PRIV-PERM-001": {
      "evidence": "No está presente la cabecera Permissions-Policy",
      "remedy": "Añadir Permissions-Policy y denegar de forma explícita las funciones que no se utilizan.",
      "source": "cabeceras de la respuesta",
      "title": "No se restringe el acceso a la cámara, el micrófono y la ubicación"
    },
    "PRIV-REF-001": {
      "evidence": "No está presente la cabecera Referrer-Policy: el navegador transmite la dirección completa desde la que se accede",
      "remedy": "Añadir Referrer-Policy: strict-origin-when-cross-origin.",
      "source": "cabeceras de la respuesta",
      "title": "Las direcciones de sus páginas se filtran a sitios ajenos"
    },
    "SEC-CLICK-001": {
      "evidence": "No hay X-Frame-Options ni directiva frame-ancestors en la CSP",
      "remedy": "Añadir frame-ancestors a la CSP (opción preferible) o X-Frame-Options: SAMEORIGIN.",
      "source": "cabeceras de la respuesta",
      "title": "La página puede incrustarse en un sitio ajeno (riesgo de clickjacking)"
    },
    "SEC-COOKIE-001": {
      "remedy": "Establecer Secure, HttpOnly y SameSite=Lax (o Strict) en las cookies de servicio.",
      "source": "cabecera Set-Cookie",
      "title": "La cookie «${name}» se establece sin indicadores de protección"
    },
    "SEC-CORS-001": {
      "remedy": "Limitar la lista de orígenes de confianza en lugar de usar el asterisco.",
      "source": "cabeceras de la respuesta",
      "title": "Cualquier sitio externo puede leer la respuesta"
    },
    "SEC-CSP-001": {
      "remedy": "Implantar una CSP empezando en modo de observación y pasarla después a modo activo.",
      "source": "cabeceras de la respuesta",
      "title": "No hay política de seguridad de contenido (CSP)"
    },
    "SEC-CSP-002": {
      "evidence": "La directiva script-src contiene 'unsafe-eval': ${scriptSrc.trim().slice(0, 200)}",
      "source": "cabeceras de la respuesta",
      "title": "Los scripts pueden construir código a partir de cadenas de texto (unsafe-eval)"
    },
    "SEC-CSP-004": {
      "evidence": "La directiva script-src contiene 'unsafe-inline' y no incluye ni nonce ni hash: ${scriptSrc.trim().slice(0, 200)}",
      "remedy": "Pasar a marcas de un solo uso (nonce) o a hashes. Así, un script insertado por un atacante no llegará a ejecutarse.",
      "source": "cabeceras de la respuesta",
      "title": "Se permiten scripts en línea sin marca de un solo uso"
    },
    "SEC-CSP-005": {
      "remedy": "Sacar los bloques <style> a archivos de estilos normales y definir style-src-elem sin ",
      "source": "cabeceras de la respuesta",
      "title": "Se permiten bloques de estilos en línea"
    },
    "SEC-ENV-001": {
      "evidence": "/.env se sirve públicamente y contiene líneas del tipo NOMBRE=valor",
      "remedy": "Retirar el archivo del acceso público de inmediato y cambiar todas las claves que contenía.",
      "source": "sondeo del archivo",
      "title": "Está expuesto al exterior el archivo de configuración con las variables de entorno"
    },
    "SEC-FORM-001": {
      "evidence": "Se han encontrado ${insecureForms.length} formularios con action por http://, por ejemplo: ${(insecureForms[0] ?? '').slice(0, 100)}",
      "remedy": "Pasar el envío de los formularios a https://: de lo contrario, todo lo que se escriba puede leerse por el camino.",
      "source": "código fuente de la página",
      "title": "El formulario envía los datos por un canal sin cifrar"
    },
    "SEC-GIT-001": {
      "evidence": "/.git/HEAD se sirve públicamente y contiene: ${git.text.trim().slice(0, 80)}",
      "remedy": "Cerrar el acceso a /.git de inmediato: por ahí se descarga todo el código fuente del sitio.",
      "source": "sondeo del archivo",
      "title": "Está expuesto al exterior el directorio interno .git"
    },
    "SEC-HSTS-001": {
      "evidence": "La cabecera Strict-Transport-Security no está presente en la respuesta",
      "remedy": "Añadir Strict-Transport-Security: max-age=31536000; includeSubDomains.",
      "source": "cabeceras de la respuesta",
      "title": "Falta la cabecera HSTS"
    },
    "SEC-HSTS-002": {
      "remedy": "Elevar max-age hasta 15552000 como mínimo (medio año); se recomienda 31536000.",
      "source": "cabeceras de la respuesta",
      "title": "El periodo de validez de HSTS es demasiado corto"
    },
    "SEC-INFO-001": {
      "remedy": "Ocultar las versiones: son una pista para el atacante sobre qué vulnerabilidades probar.",
      "source": "cabeceras de la respuesta",
      "title": "El servidor revela las versiones de su software"
    },
    "SEC-MIME-001": {
      "remedy": "Añadir X-Content-Type-Options: nosniff.",
      "source": "cabeceras de la respuesta",
      "title": "El navegador puede adivinar el tipo de contenido"
    },
    "SEC-MIXED-001": {
      "evidence": "Se han encontrado ${real.length} enlaces del tipo http://, por ejemplo: ${real[0].slice(0, 120)}",
      "remedy": "Pasar todos los recursos externos a https://: de lo contrario, el navegador los bloqueará.",
      "source": "código fuente de la página",
      "title": "Una página cifrada carga archivos por un canal sin cifrar"
    },
    "SEC-PWD-001": {
      "evidence": "La página tiene un campo de contraseña y ella misma se sirve por http://",
      "remedy": "Pasar la página a https:// de inmediato: las contraseñas viajan en texto claro.",
      "source": "código fuente de la página",
      "title": "Campo de contraseña en una página sin cifrar"
    },
    "SEC-TLS-001": {
      "evidence": "Dirección final tras las redirecciones: ${artifacts.finalUrl}",
      "remedy": "Emitir un certificado y activar una redirección permanente de http:// a https://.",
      "source": "URL final de la respuesta",
      "title": "El sitio se sirve sin cifrado (HTTP)"
    },
    "SUPPLY-MAP-001": {
      "evidence": "En el marcado hay un enlace sourceMappingURL: a través de él se reconstruye el código fuente con sus comentarios",
      "remedy": "Desactivar la publicación de los mapas de código en la compilación de producción.",
      "source": "código fuente de la página",
      "title": "Se sirve al exterior el mapa del código fuente"
    },
    "SUPPLY-SRI-001": {
      "evidence": "${noSri.length} scripts externos sin atributo integrity, por ejemplo desde los hosts: ${hosts.join(', ')}",
      "remedy": "Añadir el atributo integrity a los scripts externos: así, un archivo manipulado sencillamente no se ejecutará.",
      "source": "código fuente de la página",
      "title": "Se cargan scripts de terceros sin verificación de autenticidad"
    },
    "TRUTH-002": {
      "evidence": "Se ha encontrado la mención: ${obsolete.join('; ')}",
      "remedy": "Actualizar los textos legales: una referencia a un mecanismo derogado indica que los documentos llevan años sin revisarse.",
      "source": "código fuente de la página",
      "title": "Los documentos remiten a mecanismos legales derogados"
    },
    "XFER-FONTS-001": {
      "evidence": "En el marcado se ha encontrado una llamada a fonts.googleapis.com / fonts.gstatic.com",
      "remedy": "Descargar las fuentes y servirlas desde el dominio propio: así se elimina por completo esa transferencia de datos.",
      "source": "código fuente de la página",
      "title": "Las fuentes se cargan directamente de los servidores de Google: la dirección del visitante viaja a EE. UU."
    }
  },
  zh: {
    "A11Y-VIEWPORT-001": {
      "remedy": "移除 user-scalable=no 和 maximum-scale：否则视力不佳的访客无法读清页面文字。",
      "source": "页面源代码",
      "title": "访客无法放大页面"
    },
    "AIACT-001": {
      "evidence": "页面上有聊天组件，但没有任何地方说明对话的另一方是程序",
      "remedy": "在聊天窗口中说明由人工智能作答——欧盟《人工智能法案》第 50 条对此有要求。",
      "source": "页面源代码",
      "title": "聊天助手未表明自己是机器"
    },
    "COOKIE-LIFE-001": {
      "evidence": "Max-Age=${ma} 秒，相当于 ${Math.round(Number(ma) / 2_592_000)} 个月",
      "remedy": "把有效期缩短到 13 个月——这是欧盟监管机构给出的参考上限。",
      "source": "Set-Cookie 响应头",
      "title": "Cookie「${c.split('=')[0].trim()}」的存活时间超过 13 个月"
    },
    "DNS-DMARC-001": {
      "evidence": "域名 ${root} 配置了邮件（MX 记录），但没有 DMARC 记录",
      "remedy": "添加 _dmarc 的 TXT 记录，值为 v=DMARC1; p=none; rua=mailto:您的邮箱地址 —— 先从观察模式开始。",
      "source": "公开 DNS",
      "title": "任何人都能冒用您的域名发信"
    },
    "DNS-SEC-001": {
      "evidence": "域名 ${root} 没有 DS 记录：区域签名未配置，无法发现 DNS 应答被篡改",
      "remedy": "在域名注册商或 DNS 控制面板中开启 DNSSEC（DNS 安全扩展）。大多数服务商那里只是一个开关。它可以防止网站和邮件的地址在送达访客途中被替换。",
      "source": "DNS 查询",
      "title": "DNS 区域未签名（未启用 DNSSEC）"
    },
    "DNS-SPF-001": {
      "evidence": "域名 ${root} 配置了邮件，但没有 SPF 记录",
      "remedy": "添加 SPF 的 TXT 记录，列出允许的发件方。",
      "source": "公开 DNS",
      "title": "未声明谁有权以该域名发信"
    },
    "DNS-SPF-002": {
      "evidence": "SPF 记录中有 ${lookups} 个机制，而上限是 10 个——邮件服务器会返回错误，校验将无法生效",
      "remedy": "减少 include 的数量，或把它们合并成一条展开后的记录。",
      "source": "公开 DNS",
      "title": "发件人校验已悄然失效：超出 DNS 查询次数上限"
    },
    "EUODR-001": {
      "evidence": "发现指向 ec.europa.eu/consumers/odr 的链接——该平台已于 2025 年 7 月 20 日关闭",
      "remedy": "删除该链接，并写明现行的庭外争议解决流程。",
      "source": "页面源代码",
      "title": "页脚仍留有指向已关闭的欧盟争议解决平台的链接"
    },
    "EXPO-WP-001": {
      "evidence": "页面代码中发现 WordPress 的特征（wp-content / wp-json）",
      "remedy": "关闭 /wp-json/wp/v2/users：该地址会公开管理员的登录名列表。",
      "source": "页面源代码",
      "title": "网站基于 WordPress——请检查作者列表是否对外开放"
    },
    "GDPR-CONSENT-001": {
      "evidence": "页面代码中发现：${trackers.join(', ')}；未发现任何已知的同意管理工具",
      "remedy": "接入同意管理工具，在访客明确表示「同意」之前不要启动统计代码。",
      "source": "页面源代码",
      "title": "未征得同意就加载跟踪代码"
    },
    "GDPR-POLICY-001": {
      "evidence": "无论在正文还是在链接中，都没有找到隐私政策的任何提及",
      "remedy": "在每个页面的页脚放置隐私政策的链接。",
      "source": "页面源代码",
      "title": "页面上没有隐私政策链接"
    },
    "GPC-001": {
      "evidence": "在带 Sec-GPC 请求头的情况下，网站依然写入了广告类 cookie：${gpc.map((c) => c.split('=')[0]).join(', ').slice(0, 120)}",
      "remedy": "尊重 Sec-GPC（全球隐私控制信号）请求头。截至 2026 年，美国十二个州的法律对此提出了要求：加利福尼亚、科罗拉多、康涅狄格、特拉华、马里兰、明尼苏达、蒙大拿、内布拉斯加、新罕布什尔、新泽西、俄勒冈和得克萨斯。已有企业据此被开出罚单：Sephora 120 万美元，Healthline 155 万美元，Disney 275 万美元，Ford 37.5 万美元。",
      "source": "两次请求的对比",
      "title": "「不要出售我的数据」信号被忽略"
    },
    "GPC-002": {
      "title": "网站使用了广告类机制，但未确认已停止出售数据"
    },
    "IMPR-001": {
      "evidence": "页面看起来是商业性的（购物车、价格、购买按钮），但没有找到载明法律信息的版块",
      "remedy": "增加一个版块，写明企业名称、地址、电子邮箱和注册号——欧盟电子商务指令对此有要求。",
      "source": "页面源代码",
      "title": "缺少法定的经营者信息"
    },
    "OPS-ROBOTS-001": {
      "evidence": "请求 /robots.txt 返回状态码 ${robots.status || '无响应'}",
      "remedy": "添加 robots.txt——没有它，搜索引擎和 AI 爬虫只能盲目抓取。",
      "source": "文件探测",
      "title": "缺少 robots.txt 文件"
    },
    "OPS-SECTXT-001": {
      "evidence": "请求 /.well-known/security.txt 没有返回文件",
      "remedy": "添加 /.well-known/security.txt，在其中写明接收安全问题报告的联系地址。",
      "source": "文件探测",
      "title": "缺少 security.txt——研究人员无处上报漏洞"
    },
    "PERF-IMG-001": {
      "evidence": "${imgs.length} 张图片中有 ${noLazy.length} 张没有 loading=\"lazy\" 属性——访客还没滚动到它们，浏览器就已经把它们下载下来了",
      "remedy": "给首屏以下的图片加上 loading=\"lazy\"。前两张不要加，加了反而有害。这样能节省访客的流量，并加快首次渲染。",
      "source": "页面源代码",
      "title": "首屏以下的图片被立即加载"
    },
    "PERF-IMG-002": {
      "evidence": "${imgs.length} 张图片中没有一张声明 srcset 或 sizes：手机下载的是按宽屏尺寸准备的图片",
      "remedy": "声明包含多种尺寸的 srcset 以及 sizes。手机会取更小的文件——在网速较慢时页面打开会明显更快。",
      "source": "页面源代码",
      "title": "手机和大屏拿到的是同一张图片"
    },
    "PRIV-LOGOUT-001": {
      "title": "退出账户时，浏览器中的数据没有被清除"
    },
    "PRIV-PERM-001": {
      "evidence": "响应中没有 Permissions-Policy 头",
      "remedy": "添加 Permissions-Policy，并明确禁用未使用的功能。",
      "source": "响应头",
      "title": "未限制对摄像头、麦克风和地理位置的访问"
    },
    "PRIV-REF-001": {
      "evidence": "响应中没有 Referrer-Policy 头——浏览器会把完整的来源网址一并发出",
      "remedy": "添加 Referrer-Policy: strict-origin-when-cross-origin。",
      "source": "响应头",
      "title": "您的页面网址会泄露给第三方网站"
    },
    "SEC-CLICK-001": {
      "evidence": "既没有 X-Frame-Options，CSP 中也没有 frame-ancestors 指令",
      "remedy": "在 CSP 中添加 frame-ancestors（更推荐），或使用 X-Frame-Options: SAMEORIGIN。",
      "source": "响应头",
      "title": "页面可被嵌入他人网站（存在点击劫持风险）"
    },
    "SEC-COOKIE-001": {
      "remedy": "为功能性 cookie 设置 Secure、HttpOnly 和 SameSite=Lax（或 Strict）。",
      "source": "Set-Cookie 响应头",
      "title": "Cookie「${name}」在设置时没有加保护标志"
    },
    "SEC-CORS-001": {
      "remedy": "用可信来源的白名单取代通配符星号。",
      "source": "响应头",
      "title": "任何第三方网站都被允许读取该响应"
    },
    "SEC-CSP-001": {
      "remedy": "引入 CSP（内容安全策略），先以观察模式起步，再切换到强制模式。",
      "source": "响应头",
      "title": "没有内容安全策略（CSP）"
    },
    "SEC-CSP-002": {
      "evidence": "script-src 指令包含 'unsafe-eval'：${scriptSrc.trim().slice(0, 200)}",
      "source": "响应头",
      "title": "脚本被允许把字符串当作代码执行（unsafe-eval）"
    },
    "SEC-CSP-004": {
      "evidence": "script-src 指令包含 'unsafe-inline'，且既没有 nonce 也没有哈希：${scriptSrc.trim().slice(0, 200)}",
      "remedy": "改用一次性标记（nonce）或哈希。这样攻击者注入的内联脚本就不会被执行。",
      "source": "响应头",
      "title": "允许了没有一次性标记的内联脚本"
    },
    "SEC-CSP-005": {
      "remedy": "把 <style> 块移到普通的样式文件中，并设置 style-src-elem，不带 ",
      "source": "响应头",
      "title": "允许了内联的样式块"
    },
    "SEC-ENV-001": {
      "evidence": "/.env 可被公开访问，且包含形如 名称=值 的行",
      "remedy": "立即撤销该文件的公开访问，并更换其中出现过的所有密钥。",
      "source": "文件探测",
      "title": "含环境变量的配置文件对外开放"
    },
    "SEC-FORM-001": {
      "evidence": "发现 ${insecureForms.length} 个 action 指向 http:// 的表单，例如：${(insecureForms[0] ?? '').slice(0, 100)}",
      "remedy": "把表单提交改到 https://——否则填写的内容在传输途中会被读取。",
      "source": "页面源代码",
      "title": "表单通过未加密的通道提交数据"
    },
    "SEC-GIT-001": {
      "evidence": "/.git/HEAD 可被公开访问，内容为：${git.text.trim().slice(0, 80)}",
      "remedy": "立即关闭对 /.git 的访问——通过它可以下载网站的全部源代码。",
      "source": "文件探测",
      "title": "内部目录 .git 对外开放"
    },
    "SEC-HSTS-001": {
      "evidence": "响应中没有 Strict-Transport-Security 头",
      "remedy": "添加 Strict-Transport-Security: max-age=31536000; includeSubDomains。",
      "source": "响应头",
      "title": "缺少 HSTS 头"
    },
    "SEC-HSTS-002": {
      "remedy": "把 max-age 至少提高到 15552000（半年），建议设为 31536000。",
      "source": "响应头",
      "title": "HSTS 的有效期太短"
    },
    "SEC-INFO-001": {
      "remedy": "隐藏版本号：它等于在提示攻击者该试哪些漏洞。",
      "source": "响应头",
      "title": "服务器对外公开了自身软件的版本"
    },
    "SEC-MIME-001": {
      "remedy": "添加 X-Content-Type-Options: nosniff。",
      "source": "响应头",
      "title": "浏览器被允许自行猜测内容类型"
    },
    "SEC-MIXED-001": {
      "evidence": "发现 ${real.length} 个 http:// 形式的链接，例如：${real[0].slice(0, 120)}",
      "remedy": "把所有外部资源改为 https://——否则浏览器会拦截它们。",
      "source": "页面源代码",
      "title": "加密页面通过未加密的通道加载文件"
    },
    "SEC-PWD-001": {
      "evidence": "页面上有密码输入框，而页面本身通过 http:// 提供",
      "remedy": "立即把页面切换到 https://——密码正以明文传输。",
      "source": "页面源代码",
      "title": "未加密页面上的密码输入框"
    },
    "SEC-TLS-001": {
      "evidence": "跳转结束后的最终地址：${artifacts.finalUrl}",
      "remedy": "申请证书，并开启从 http:// 到 https:// 的永久重定向。",
      "source": "响应的最终 URL",
      "title": "网站以未加密方式提供（HTTP）"
    },
    "SUPPLY-MAP-001": {
      "evidence": "页面代码中存在 sourceMappingURL 引用——借助它可以还原带注释的源代码",
      "remedy": "在生产环境的构建中关闭 source map 的发布。",
      "source": "页面源代码",
      "title": "源代码映射文件对外开放"
    },
    "SUPPLY-SRI-001": {
      "evidence": "有 ${noSri.length} 个外部脚本没有 integrity 属性，例如来自这些主机：${hosts.join(', ')}",
      "remedy": "为外部脚本添加 integrity 属性：这样被替换过的文件根本不会执行。",
      "source": "页面源代码",
      "title": "引入第三方脚本时没有做完整性校验"
    },
    "TRUTH-002": {
      "evidence": "发现如下提及：${obsolete.join('; ')}",
      "remedy": "更新法律文本：引用已废止的机制会表明这些文件多年未曾复核。",
      "source": "页面源代码",
      "title": "文件引用了已废止的法律机制"
    },
    "XFER-FONTS-001": {
      "evidence": "页面代码中发现对 fonts.googleapis.com / fonts.gstatic.com 的请求",
      "remedy": "把字体下载下来，从自己的域名提供——这样可以完全消除这项数据传输。",
      "source": "页面源代码",
      "title": "字体直接从 Google 服务器加载——访客的地址会被传往美国"
    }
  },
};

/** Приводит произвольную метку языка к одному из четырёх наших. */
export function toOracleLang(locale?: string): OracleLang {
  const l = (locale || '').slice(0, 2).toLowerCase();
  return l === 'en' || l === 'es' || l === 'zh' ? l : 'ru';
}

/**
 * Переводит одну готовую находку.
 *
 * Если перевода нет — оставляем то, что пришло из пробы, а не пустую строку:
 * отчёт с одной непереведённой строкой хуже, чем полностью переведённый, но
 * отчёт с пустым полем хуже обоих. Поля, которых нет в словаре (например,
 * динамические доказательства с конкретным адресом), остаются как есть.
 */
export function localizeFinding<T extends { code?: string }>(finding: T, locale?: string): T {
  const lang = toOracleLang(locale);
  if (lang === 'ru' || !finding?.code) return finding;
  const t = TEXTS[lang]?.[finding.code];
  const out: any = { ...finding };
  if (t) {
    for (const key of ['title', 'evidence', 'source', 'remedy'] as const) {
      if (t[key]) out[key] = t[key];
    }
  }
  // Запасной проход по шаблонам. Нужен потому, что у десяти проверок
  // доказательство ветвится или содержит подставленные значения — перевода на
  // код для них нет вовсе, и раньше такая находка возвращалась русской в
  // отчёте на любом языке. Раннего выхода при отсутствии t тоже больше нет:
  // именно он и оставлял эти десять без единого шанса на перевод.
  if (typeof out.evidence === 'string') {
    out.evidence = localizeEvidence(out.evidence, locale);
  }
  return out as T;
}

/** Переводит список находок целиком. */
export function localizeFindings<T extends { code?: string }>(findings: T[], locale?: string): T[] {
  const lang = toOracleLang(locale);
  if (lang === 'ru') return findings;
  return findings.map((f) => localizeFinding(f, locale));
}

/**
 * ШАБЛОНЫ ДОКАЗАТЕЛЬСТВ — для тех проверок, где текст ветвится или содержит
 * подставленные значения.
 *
 * Перевода по коду проверки им не хватает: у одной и той же проверки
 * доказательство разное в зависимости от того, что именно нашлось, а внутрь
 * подставляются домен, число, кусок заголовка. Такие строки оставались
 * русскими в отчёте на любом языке — ровно в той графе, которая доказывает,
 * что мы ничего не выдумали.
 *
 * Шаблон — русский текст, где подставленное место превращено в группу. Она
 * переносится в перевод как есть: домен остаётся доменом, число числом.
 *
 * Порядок важен: длинные шаблоны стоят первыми. Иначе короткий совпал бы
 * раньше и оставил хвост строки непереведённым.
 */
const EVIDENCE_PATTERNS: Array<{ re: RegExp; en: string; es: string; zh: string }> = [
  { re: new RegExp("^В\\ разметке\\ страницы\\ есть\\ обращения\\ к\\ рекламным\\ доменам\\ \\((.*?)\\),\\ а\\ при\\ запросе\\ с\\ заголовком\\ Sec\\-GPC\\ на\\ странице\\ нет\\ ни\\ одного\\ подтверждения,\\ что\\ отказ\\ принят\\.\\ Проверить\\ можно\\ так:\\ открыть\\ исходный\\ код\\ страницы\\ и\\ найти\\ в\\ нём\\ эти\\ адреса\\.$"), en: "The page markup calls advertising domains ($1), yet on a request carrying the Sec-GPC header the page shows no confirmation that the opt-out was accepted. To check: open the page source and look for those addresses.", es: "El marcado de la página llama a dominios publicitarios ($1), pero en una petición con la cabecera Sec-GPC la página no muestra ninguna confirmación de que se aceptó la exclusión. Para comprobarlo: abre el código fuente y busca esas direcciones.", zh: "页面代码中调用了广告域名（$1），但在带 Sec-GPC 头的请求下，页面没有任何表明已接受退出请求的确认。核实方法：查看页面源代码并搜索这些地址。" },
  { re: new RegExp("^Сайт\\ перестал\\ ставить\\ рекламные\\ cookie\\ при\\ получении\\ заголовка\\ Sec\\-GPC\\ —\\ то\\ есть\\ отказ\\ соблюдает,\\ —\\ но\\ на\\ странице\\ нет\\ ни\\ одного\\ подтверждения,\\ что\\ запрос\\ принят$"), en: "The site stops setting advertising cookies when it receives the Sec-GPC header — so it does honour the opt-out — but the page gives no confirmation that the request was accepted", es: "El sitio deja de poner cookies publicitarias al recibir la cabecera Sec-GPC — es decir, respeta la exclusión — pero la página no da ninguna confirmación de que la solicitud fue aceptada", zh: "收到 Sec-GPC 头后站点确实停止设置广告 Cookie — 也就是尊重了退出请求 — 但页面上没有任何表明请求已被接受的确认" },
  { re: new RegExp("^Ответ\\ (.*?)\\ \\(код\\ (.*?)\\)\\ не\\ содержит\\ заголовка\\ Clear\\-Site\\-Data:\\ после\\ выхода\\ сведения\\ о\\ человеке\\ остаются\\ в\\ хранилище\\ браузера$"), en: "The response for $1 (code $2) carries no Clear-Site-Data header: after signing out, the person’s data stays in browser storage", es: "La respuesta de $1 (código $2) no incluye la cabecera Clear-Site-Data: tras cerrar sesión, los datos de la persona permanecen en el almacenamiento del navegador", zh: "$1 的响应（状态码 $2）不含 Clear-Site-Data 响应头：退出登录后，此人的数据仍留在浏览器存储中" },
  { re: new RegExp("^Из\\ (.*?)\\ картинок\\ (.*?)\\ не\\ имеют\\ атрибута\\ loading=\"lazy\"\\ —\\ браузер\\ скачивает\\ их\\ ещё\\ до\\ того,\\ как\\ посетитель\\ до\\ них\\ долистает$"), en: "Of $1 images, $2 lack the loading=\"lazy\" attribute — the browser downloads them before the visitor ever scrolls to them", es: "De $1 imágenes, $2 no tienen el atributo loading=\"lazy\" — el navegador las descarga antes de que el visitante llegue a ellas", zh: "$1 张图片中有 $2 张缺少 loading=\"lazy\" 属性 — 访客尚未滚动到时浏览器就已下载" },
  { re: new RegExp("^Ни\\ одна\\ из\\ (.*?)\\ картинок\\ не\\ объявляет\\ srcset\\ или\\ sizes:\\ телефон\\ скачивает\\ изображение,\\ рассчитанное\\ на\\ широкий\\ экран$"), en: "None of the $1 images declares srcset or sizes: a phone downloads an image meant for a wide screen", es: "Ninguna de las $1 imágenes declara srcset o sizes: un móvil descarga una imagen pensada para pantalla ancha", zh: "$1 张图片均未声明 srcset 或 sizes：手机会下载为宽屏准备的图片" },
  { re: new RegExp("^Страница\\ выглядит\\ коммерческой\\ \\(корзина,\\ цены,\\ кнопка\\ покупки\\),\\ но\\ раздела\\ с\\ юридическими\\ данными\\ не\\ найдено$"), en: "The page looks commercial (cart, prices, buy button), yet no section with legal details was found", es: "La página parece comercial (carrito, precios, botón de compra), pero no se encontró una sección con datos legales", zh: "页面呈现商业特征（购物车、价格、购买按钮），但未找到载明法律信息的版块" },
  { re: new RegExp("^В\\ разметке\\ присутствует\\ ссылка\\ sourceMappingURL\\ —\\ по\\ ней\\ восстанавливается\\ исходный\\ код\\ с\\ комментариями$"), en: "The markup contains a sourceMappingURL link — it restores the source code together with its comments", es: "El marcado contiene un enlace sourceMappingURL — permite reconstruir el código fuente con sus comentarios", zh: "页面代码中存在 sourceMappingURL 链接 — 可据此还原带注释的源代码" },
  { re: new RegExp("^Есть\\ только\\ режим\\ наблюдения:\\ Content\\-Security\\-Policy\\-Report\\-Only\\ присутствует,\\ боевой\\ заголовок\\ —\\ нет$"), en: "Report-only mode alone: Content-Security-Policy-Report-Only is present, the enforcing header is not", es: "Solo modo de observación: Content-Security-Policy-Report-Only está presente, la cabecera efectiva no", zh: "仅有观察模式：存在 Content-Security-Policy-Report-Only，缺少强制生效的响应头" },
  { re: new RegExp("^В\\ записи\\ SPF\\ (.*?)\\ механизмов\\ при\\ пределе\\ 10\\ —\\ почтовые\\ серверы\\ вернут\\ ошибку\\ и\\ проверка\\ не\\ сработает$"), en: "The SPF record has $1 mechanisms against a limit of 10 — mail servers will return an error and the check will not run", es: "El registro SPF tiene $1 mecanismos frente al límite de 10 — los servidores de correo devolverán error y la comprobación no funcionará", zh: "SPF 记录包含 $1 个机制，超过 10 的上限 — 邮件服务器将返回错误，校验无法生效" },
  { re: new RegExp("^У\\ домена\\ (.*?)\\ нет\\ записи\\ DS:\\ подпись\\ зоны\\ не\\ настроена,\\ подмену\\ ответа\\ DNS\\ обнаружить\\ нельзя$"), en: "The domain $1 has no DS record: the zone is unsigned, so a forged DNS answer cannot be detected", es: "El dominio $1 no tiene registro DS: la zona no está firmada, por lo que no se puede detectar una respuesta DNS falsificada", zh: "域名 $1 没有 DS 记录：区域未签名，无法发现被伪造的 DNS 应答" },
  { re: new RegExp("^Директива\\ style\\-src\\ содержит\\ 'unsafe\\-inline'\\ и\\ не\\ уточнена\\ директивой\\ style\\-src\\-elem:\\ (.*?)$"), en: "The style-src directive contains 'unsafe-inline' and is not narrowed by style-src-elem: $1", es: "La directiva style-src contiene 'unsafe-inline' y no se acota con style-src-elem: $1", zh: "style-src 指令包含 'unsafe-inline'，且未由 style-src-elem 收窄：$1" },
  { re: new RegExp("^(.*?)\\ внешних\\ скриптов\\ без\\ атрибута\\ integrity,\\ например\\ с\\ узлов:\\ (.*?)$"), en: "$1 external scripts without an integrity attribute, for example from: $2", es: "$1 scripts externos sin atributo integrity, por ejemplo de: $2", zh: "$1 个外部脚本没有 integrity 属性，例如来自：$2" },
  { re: new RegExp("^Директива\\ script\\-src\\ содержит\\ 'unsafe\\-inline'\\ и\\ не\\ содержит\\ ни\\ nonce,\\ ни\\ хэша:\\ (.*?)$"), en: "The script-src directive contains 'unsafe-inline' and has neither a nonce nor a hash: $1", es: "La directiva script-src contiene 'unsafe-inline' y no tiene ni nonce ni hash: $1", zh: "script-src 指令包含 'unsafe-inline'，且既无 nonce 也无哈希：$1" },
  { re: new RegExp("^В\\ разметке\\ найдено:\\ (.*?);\\ ни\\ одного\\ известного\\ менеджера\\ согласия\\ не\\ обнаружено$"), en: "Found in the markup: $1; no known consent manager was detected", es: "Encontrado en el marcado: $1; no se detectó ningún gestor de consentimiento conocido", zh: "页面代码中发现：$1；未检测到任何已知的同意管理工具" },
  { re: new RegExp("^Заголовок\\ Referrer\\-Policy\\ отсутствует\\ —\\ браузер\\ передаёт\\ полный\\ адрес\\ перехода$"), en: "The Referrer-Policy header is missing — the browser passes the full referring address", es: "La cabecera Referrer-Policy falta — el navegador transmite la dirección completa de origen", zh: "缺少 Referrer-Policy 响应头 — 浏览器会传递完整的来源地址" },
  { re: new RegExp("^На\\ странице\\ найден\\ чат\\-виджет,\\ но\\ нигде\\ не\\ сказано,\\ что\\ собеседник\\ —\\ программа$"), en: "A chat widget was found on the page, but nowhere does it say the other party is a program", es: "Se encontró un widget de chat, pero en ningún sitio se indica que el interlocutor es un programa", zh: "页面上发现聊天组件，但未在任何位置说明对话方是程序" },
  { re: new RegExp("^Найдена\\ ссылка\\ на\\ ec\\.europa\\.eu/consumers/odr\\ —\\ платформа\\ отключена\\ 20\\.07\\.2025$"), en: "A link to ec.europa.eu/consumers/odr was found — the platform was shut down on 20.07.2025", es: "Se encontró un enlace a ec.europa.eu/consumers/odr — la plataforma cerró el 20.07.2025", zh: "发现指向 ec.europa.eu/consumers/odr 的链接 — 该平台已于 2025 年 7 月 20 日关闭" },
  { re: new RegExp("^Ни\\ в\\ тексте,\\ ни\\ в\\ ссылках\\ не\\ найдено\\ упоминания\\ политики\\ конфиденциальности$"), en: "No mention of a privacy policy was found in the text or in the links", es: "No se encontró mención de una política de privacidad ni en el texto ni en los enlaces", zh: "正文与链接中均未发现隐私政策的提及" },
  { re: new RegExp("^В\\ разметке\\ найдено\\ обращение\\ к\\ fonts\\.googleapis\\.com\\ /\\ fonts\\.gstatic\\.com$"), en: "The markup calls fonts.googleapis.com / fonts.gstatic.com", es: "El marcado llama a fonts.googleapis.com / fonts.gstatic.com", zh: "页面代码中调用了 fonts.googleapis.com / fonts.gstatic.com" },
  { re: new RegExp("^На\\ странице\\ есть\\ поле\\ ввода\\ пароля,\\ а\\ сама\\ страница\\ отдаётся\\ по\\ http://$"), en: "The page has a password field yet is served over http://", es: "La página tiene un campo de contraseña pero se sirve por http://", zh: "页面含有密码输入框，却通过 http:// 提供" },
  { re: new RegExp("^С\\ заголовком\\ Sec\\-GPC\\ сайт\\ всё\\ равно\\ ставит\\ рекламные\\ cookie:\\ (.*?)$"), en: "Even with the Sec-GPC header the site still sets advertising cookies: $1", es: "Incluso con la cabecera Sec-GPC el sitio sigue poniendo cookies publicitarias: $1", zh: "即使带有 Sec-GPC 头，站点仍在设置广告 Cookie：$1" },
  { re: new RegExp("^В\\ разметке\\ найдены\\ признаки\\ WordPress\\ \\(wp\\-content\\ /\\ wp\\-json\\)$"), en: "The markup shows signs of WordPress (wp-content / wp-json)", es: "El marcado muestra indicios de WordPress (wp-content / wp-json)", zh: "页面代码中出现 WordPress 特征（wp-content / wp-json）" },
  { re: new RegExp("^/\\.env\\ отдаётся\\ публично\\ и\\ содержит\\ строки\\ вида\\ ИМЯ=значение$"), en: "/.env is served publicly and contains lines of the form NAME=value", es: "/.env se sirve públicamente y contiene líneas del tipo NOMBRE=valor", zh: "/.env 可公开访问，且包含形如 NAME=value 的内容" },
  { re: new RegExp("^Нет\\ ни\\ X\\-Frame\\-Options,\\ ни\\ директивы\\ frame\\-ancestors\\ в\\ CSP$"), en: "There is neither X-Frame-Options nor a frame-ancestors directive in the CSP", es: "No hay ni X-Frame-Options ni una directiva frame-ancestors en la CSP", zh: "既没有 X-Frame-Options，CSP 中也没有 frame-ancestors 指令" },
  { re: new RegExp("^У\\ домена\\ (.*?)\\ есть\\ почта\\ \\(запись\\ MX\\),\\ но\\ записи\\ DMARC\\ нет$"), en: "The domain $1 has mail (an MX record) but no DMARC record", es: "El dominio $1 tiene correo (registro MX) pero no tiene registro DMARC", zh: "域名 $1 有邮件服务（MX 记录），但没有 DMARC 记录" },
  { re: new RegExp("^Заголовок\\ Strict\\-Transport\\-Security\\ в\\ ответе\\ отсутствует$"), en: "The Strict-Transport-Security header is missing from the response", es: "La cabecera Strict-Transport-Security falta en la respuesta", zh: "响应中缺少 Strict-Transport-Security 响应头" },
  { re: new RegExp("^Директива\\ style\\-src\\-elem\\ содержит\\ 'unsafe\\-inline':\\ (.*?)$"), en: "The style-src-elem directive contains 'unsafe-inline': $1", es: "La directiva style-src-elem contiene 'unsafe-inline': $1", zh: "style-src-elem 指令包含 'unsafe-inline'：$1" },
  { re: new RegExp("^Заголовок\\ Content\\-Security\\-Policy\\ в\\ ответе\\ отсутствует$"), en: "The Content-Security-Policy header is missing from the response", es: "La cabecera Content-Security-Policy falta en la respuesta", zh: "响应中缺少 Content-Security-Policy 响应头" },
  { re: new RegExp("^Найдено\\ (.*?)\\ форм\\ с\\ action\\ по\\ http://,\\ например:\\ (.*?)$"), en: "Found $1 forms whose action uses http://, for example: $2", es: "Se encontraron $1 formularios con action por http://, por ejemplo: $2", zh: "发现 $1 个 action 使用 http:// 的表单，例如：$2" },
  { re: new RegExp("^Директива\\ script\\-src\\ содержит\\ 'unsafe\\-eval':\\ (.*?)$"), en: "The script-src directive contains 'unsafe-eval': $1", es: "La directiva script-src contiene 'unsafe-eval': $1", zh: "script-src 指令包含 'unsafe-eval'：$1" },
  { re: new RegExp("^Найдено\\ (.*?)\\ ссылок\\ вида\\ http://,\\ например:\\ (.*?)$"), en: "Found $1 links of the form http://, for example: $2", es: "Se encontraron $1 enlaces del tipo http://, por ejemplo: $2", zh: "发现 $1 个 http:// 形式的链接，例如：$2" },
  { re: new RegExp("^Запрос\\ /\\.well\\-known/security\\.txt\\ не\\ вернул\\ файл$"), en: "A request for /.well-known/security.txt returned no file", es: "La petición a /.well-known/security.txt no devolvió ningún archivo", zh: "请求 /.well-known/security.txt 未返回文件" },
  { re: new RegExp("^/\\.git/HEAD\\ отдаётся\\ публично\\ и\\ содержит:\\ (.*?)$"), en: "/.git/HEAD is served publicly and contains: $1", es: "/.git/HEAD se sirve públicamente y contiene: $1", zh: "/.git/HEAD 可公开访问，内容为：$1" },
  { re: new RegExp("^Заголовок\\ X\\-Content\\-Type\\-Options\\ отсутствует$"), en: "The X-Content-Type-Options header is missing", es: "La cabecera X-Content-Type-Options falta", zh: "缺少 X-Content-Type-Options 响应头" },
  { re: new RegExp("^У\\ домена\\ (.*?)\\ есть\\ почта,\\ но\\ записи\\ SPF\\ нет$"), en: "The domain $1 has mail but no SPF record", es: "El dominio $1 tiene correo pero no tiene registro SPF", zh: "域名 $1 有邮件服务，但没有 SPF 记录" },
  { re: new RegExp("^Заголовок\\ Permissions\\-Policy\\ отсутствует$"), en: "The Permissions-Policy header is missing", es: "La cabecera Permissions-Policy falta", zh: "缺少 Permissions-Policy 响应头" },
  { re: new RegExp("^Max\\-Age=(.*?)\\ секунд\\ —\\ это\\ (.*?)\\ месяцев$"), en: "Max-Age=$1 seconds — that is $2 months", es: "Max-Age=$1 segundos — son $2 meses", zh: "Max-Age=$1 秒 — 相当于 $2 个月" },
  { re: new RegExp("^Итоговый\\ адрес\\ после\\ переходов:\\ (.*?)$"), en: "Final address after redirects: $1", es: "Dirección final tras las redirecciones: $1", zh: "跳转后的最终地址：$1" },
  { re: new RegExp("^Запрос\\ /robots\\.txt\\ вернул\\ код\\ (.*?)$"), en: "A request for /robots.txt returned code $1", es: "La petición a /robots.txt devolvió el código $1", zh: "请求 /robots.txt 返回状态码 $1" },
  { re: new RegExp("^Найдено\\ упоминание:\\ (.*?)$"), en: "Mention found: $1", es: "Mención encontrada: $1", zh: "发现提及：$1" },
];

/** Переводит готовую строку доказательства, сохраняя подставленные значения. */
export function localizeEvidence(text: string, locale?: string): string {
  const lang = toOracleLang(locale);
  if (lang === 'ru' || !text) return text;
  for (const p of EVIDENCE_PATTERNS) {
    const m = text.match(p.re);
    if (!m) continue;
    let out = p[lang];
    for (let i = 1; i < m.length; i++) out = out.split('$' + i).join(m[i] ?? '');
    return out;
  }
  return text;
}
