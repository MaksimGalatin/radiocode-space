/**
 * СТРАНИЦА «РЕЕСТР ПРОТИВ РЕАЛЬНОСТИ» — ТЕКСТЫ НА ЧЕТЫРЁХ ЯЗЫКАХ.
 *
 * ЗАЧЕМ ОТДЕЛЬНАЯ СТРАНИЦА. На `/research/data` уже сказано, что 1 415
 * адресов реестра НЕ ОТВЕТИЛИ скрипту при обходе. Это факт о поведении
 * сайта в момент обращения: сервер мог лежать, отдавать таймаут, рвать
 * соединение.
 *
 * Здесь измеряется ДРУГОЕ и более сильное: у 1 498 доменов из 11 902
 * **вообще нет записи в DNS**. Не «сайт не открылся», а «имени не
 * существует». Домен не продлили, и он растворился.
 *
 * Два числа не спорят друг с другом — они отвечают на разные вопросы, и
 * смешивать их нельзя. Поэтому не правка старой страницы, а новая.
 *
 * ПОЧЕМУ ЭТО ВАЖНЕЕ ДОСТУПНОСТИ. Недоступный сайт — это барьер, который
 * можно снять за неделю работы. Мёртвый домен — это адрес, по которому
 * человек в принципе никуда не попадёт, и он числится действующим в
 * федеральном реестре. Причём его может зарегистрировать кто угодно.
 *
 * РАЗДЕЛ 20 КОНСТИТУЦИИ. Это страница `/research/*`: ни слова о токене,
 * роутере, тарифах и инвестициях. Только метод, данные, ограничения,
 * ссылка на инструмент, подпись автора и раскрытый конфликт интересов.
 * Ссылка на услуги — ровно одна, нейтральная, в самом конце.
 *
 * ЧИСЛА СЮДА НЕ КОПИРУЮТСЯ: они берутся из `../data/данные.ts`, где
 * лежат в одном экземпляре. Копия числа на четырёх языках расходится при
 * первом же обновлении замера, и замечает это читатель, а не автор.
 */

export type ЯзыкКод = 'ru' | 'en' | 'es' | 'zh';

export type ТекстыРеестра = {
  метка: string;
  заголовок: string;
  подпись: (дата: string) => string;

  сутьЗаголовок: string;
  суть1: (мёртвых: string, всего: string, доля: string) => string;
  суть2: string;
  суть3: string;

  отличиеЗаголовок: string;
  отличие1: string;
  отличие2: string;
  отличиеТаблицаВопрос: string;
  отличиеТаблицаОтвет: string;
  отличиеСтрока1Вопрос: string;
  отличиеСтрока1Ответ: string;
  отличиеСтрока2Вопрос: string;
  отличиеСтрока2Ответ: string;

  методЗаголовок: string;
  метод1: string;
  метод2: string;
  метод3: string;
  метод4: string;

  числаЗаголовок: string;
  числаДоменов: string;
  числаЖивых: string;
  числаМёртвых: string;
  числаЗаписей: string;
  числаЗаписейМёртвых: string;

  следствиеЗаголовок: string;
  следствие1: string;
  следствие2: string;
  следствие3: string;

  ограниченияЗаголовок: string;
  ограничение1: string;
  ограничение2: string;
  ограничение3: string;
  ограничение4: string;

  проверитьЗаголовок: string;
  проверить1: string;
  проверить2: string;
  файлЗаголовок: string;
  файлПояснение: string;
  файлСсылка: string;
  файлReadme: string;

  авторЗаголовок: string;
  автор1: string;
  конфликт: string;
  ссылкаТекст: string;
};

export const ТЕКСТЫ_РЕЕСТРА: Record<ЯзыкКод, ТекстыРеестра> = {
  ru: {
    метка: 'Открытые данные',
    заголовок: 'Реестр против реальности: каждый восьмой адрес указывает в пустоту',
    подпись: (дата) => `Проверка DNS, снято ${дата}. Данные и инструмент открыты.`,

    сутьЗаголовок: 'Что измерено',
    суть1: (мёртвых, всего, доля) =>
      `Из ${всего} доменов, встречающихся в журнале обхода муниципальных сайтов США, у ${мёртвых} (${доля} %) нет записи в DNS. Имени не существует.`,
    суть2:
      'Это не «сайт не открылся» и не «сервер лежит». Это значит, что домен не продлили, и он перестал существовать как адрес. Ввести его в браузере — всё равно что набрать несуществующий номер телефона.',
    суть3:
      'Все они при этом числятся действующими адресами в федеральном реестре, откуда взята выборка.',

    отличиеЗаголовок: 'Чем это отличается от «сайт не ответил»',
    отличие1:
      'На странице данных сказано, что часть адресов не ответила скрипту при обходе. Это факт о поведении сервера в момент обращения: он мог быть перегружен, отдать таймаут, оборвать соединение. Через час тот же адрес мог заработать.',
    отличие2:
      'Здесь проверяется существование самого имени, а не работа сервера. Разные вопросы — разные числа, и смешивать их нельзя.',
    отличиеТаблицаВопрос: 'Вопрос',
    отличиеТаблицаОтвет: 'Что означает ответ «нет»',
    отличиеСтрока1Вопрос: 'Сайт открылся?',
    отличиеСтрока1Ответ:
      'Сервер не ответил сейчас. Может ответить позже. Чинится настройкой.',
    отличиеСтрока2Вопрос: 'Домен существует?',
    отличиеСтрока2Ответ:
      'Имени нет в системе доменных имён. Позже не заработает. Чинится только новой регистрацией.',

    методЗаголовок: 'Как проверялось',
    метод1:
      'Для каждого домена запрашивались записи A и AAAA через DNS-over-HTTPS. Домен считается мёртвым, только если ответ пуст у обоих резолверов.',
    метод2:
      'Резолверов два и они независимы — Cloudflare и Google. Один резолвер может ошибиться, быть заблокированным в стране проверки или отдать устаревший кэш.',
    метод3:
      'Расхождение между двумя резолверами и есть погрешность метода. Она измерена и указана ниже, а не оценена на глаз.',
    метод4:
      'DNS-запросы бесплатны и не создают нагрузки на проверяемые сайты: ни один запрос не отправлен на сам сервер.',

    числаЗаголовок: 'Числа',
    числаДоменов: 'доменов в выборке',
    числаЖивых: 'существуют',
    числаМёртвых: 'не существуют',
    числаЗаписей: 'записей обхода всего',
    числаЗаписейМёртвых: 'записей приходится на мёртвые домены',

    следствиеЗаголовок: 'Что из этого следует',
    следствие1:
      'Первое: доля доступных сайтов зависит от того, что считать знаменателем. Если считать от всех адресов реестра, до цели доходит меньше, чем если считать от существующих сайтов. Мы приводим оба числа и говорим, чем они отличаются, — иначе получилось бы либо приукрашивание, либо завышение барьера.',
    следствие2:
      'Второе, и оно важнее доступности: федеральный реестр не поддерживается в актуальном состоянии. Каждый восьмой адрес в нём ведёт в никуда, и никто этого не заметил.',
    следствие3:
      'Третье, и оно тревожное: освободившийся домен может зарегистрировать кто угодно. Адрес, который люди считают государственным и который указан в федеральном реестре, способен однажды открыться — и показать что угодно.',

    ограниченияЗаголовок: 'Ограничения',
    ограничение1:
      'Отсутствие записи A/AAAA не всегда означает заброшенность: домен может обслуживать только почту (записи MX) или использоваться служебно. Такие случаи в нашей выборке возможны, и их доля не измерена.',
    ограничение2:
      'Проверка — снимок на один момент времени. Домен мог быть временно снят с делегирования и вернуться.',
    ограничение3:
      'Выборка — домены, встречающиеся в нашем журнале обхода, а не полный федеральный реестр целиком.',
    ограничение4:
      'Мы не проверяли, кому сейчас принадлежат освободившиеся домены. Утверждение о риске перерегистрации — о возможности, а не о зафиксированных случаях.',

    проверитьЗаголовок: 'Как проверить самому',
    проверить1:
      'Любой домен из списка можно проверить одной командой в терминале или через любой публичный DNS-сервис. Результат воспроизводится независимо от нас.',
    проверить2:
      'Инструмент, которым получены эти числа, лежит в открытом виде и запускается без ключей и без оплаты.',

    файлЗаголовок: 'Сырые данные',
    файлПояснение: 'Полный список из 1 498 доменов, CSV: имя домена и число записей обхода на каждый. Открывается в Excel двойным щелчком. Дата в имени файла стоит намеренно: проверка DNS — снимок момента, домен может ожить.',
    файлСсылка: 'Скачать список (CSV, 1 498 строк)',
    файлReadme: 'Пояснение к файлу: метод, ограничения, как проверить строку самому',
    авторЗаголовок: 'Автор и раскрытие',
    автор1: 'Максим Валентинович Галатин.',
    конфликт:
      'Раскрытие конфликта интересов: автор оказывает услуги по аудиту доступности и безопасности сайтов. Исследование самофинансировано, никто не платил за включение в выборку и за результат.',
    ссылкаТекст: 'Услуги по аудиту доступности',
  },

  en: {
    метка: 'Open data',
    заголовок: 'Registry vs reality: one address in eight points at nothing',
    подпись: (дата) => `DNS check, taken ${дата}. Data and tooling are open.`,

    сутьЗаголовок: 'What was measured',
    суть1: (мёртвых, всего, доля) =>
      `Of the ${всего} domains appearing in our crawl log of US municipal websites, ${мёртвых} (${доля} %) have no DNS record. The name does not exist.`,
    суть2:
      'This is not "the site failed to load" or "the server is down". It means the domain was not renewed and stopped existing as an address. Typing it into a browser is like dialling a phone number that was never assigned.',
    суть3:
      'All of them are still listed as working addresses in the federal registry the sample was drawn from.',

    отличиеЗаголовок: 'How this differs from "the site did not respond"',
    отличие1:
      'The data page reports that some addresses did not respond to the crawler. That is a fact about server behaviour at one moment: it may have been overloaded, timed out, or dropped the connection. An hour later the same address might have worked.',
    отличие2:
      'Here we check whether the name itself exists, not whether a server answers. Different questions, different numbers — and they must not be mixed.',
    отличиеТаблицаВопрос: 'Question',
    отличиеТаблицаОтвет: 'What a "no" means',
    отличиеСтрока1Вопрос: 'Did the site load?',
    отличиеСтрока1Ответ:
      'The server did not answer now. It may answer later. Fixed by configuration.',
    отличиеСтрока2Вопрос: 'Does the domain exist?',
    отличиеСтрока2Ответ:
      'The name is absent from the DNS. It will not start working later. Fixed only by registering it again.',

    методЗаголовок: 'How it was checked',
    метод1:
      'For each domain, A and AAAA records were requested over DNS-over-HTTPS. A domain counts as dead only when both resolvers return nothing.',
    метод2:
      'Two independent resolvers were used — Cloudflare and Google. A single resolver can be wrong, be blocked in the country of testing, or serve a stale cache.',
    метод3:
      'The disagreement between the two resolvers is the error margin of the method. It is measured and stated below, not estimated by eye.',
    метод4:
      'DNS queries are free and place no load on the sites under study: not a single request was sent to the servers themselves.',

    числаЗаголовок: 'Numbers',
    числаДоменов: 'domains in the sample',
    числаЖивых: 'exist',
    числаМёртвых: 'do not exist',
    числаЗаписей: 'crawl records in total',
    числаЗаписейМёртвых: 'records belong to dead domains',

    следствиеЗаголовок: 'What follows from this',
    следствие1:
      'First: the share of accessible sites depends on what you take as the denominator. Counted against every address in the registry, fewer journeys reach the goal than when counted against sites that actually exist. We publish both numbers and state the difference — otherwise the result would either flatter the sites or overstate the barrier.',
    следствие2:
      'Second, and more important than accessibility: the federal registry is not kept current. One address in eight leads nowhere, and nobody noticed.',
    следствие3:
      'Third, and this one is troubling: an expired domain can be registered by anyone. An address people take for governmental, listed in a federal registry, may one day come back to life — showing anything at all.',

    ограниченияЗаголовок: 'Limitations',
    ограничение1:
      'A missing A/AAAA record does not always mean abandonment: a domain may serve mail only (MX records) or be used internally. Such cases are possible in our sample and their share was not measured.',
    ограничение2:
      'The check is a snapshot of one moment. A domain could have been temporarily undelegated and later restored.',
    ограничение3:
      'The sample consists of domains appearing in our crawl log, not the entire federal registry.',
    ограничение4:
      'We did not check who currently owns the expired domains. The re-registration risk is stated as a possibility, not as observed cases.',

    проверитьЗаголовок: 'How to verify this yourself',
    проверить1:
      'Any domain on the list can be checked with a single terminal command or through any public DNS service. The result reproduces independently of us.',
    проверить2:
      'The tool that produced these numbers is open and runs with no keys and no payment.',

    файлЗаголовок: 'Raw data',
    файлПояснение: 'The complete list of 1,498 domains as CSV: domain name and how many crawl records belong to each. Opens in Excel with a double click. The date in the filename is deliberate: a DNS check is a snapshot, and a domain may come back.',
    файлСсылка: 'Download the list (CSV, 1,498 rows)',
    файлReadme: 'File notes: method, limitations, how to verify a row yourself',
    авторЗаголовок: 'Author and disclosure',
    автор1: 'Maksim Valentinovich Galatin.',
    конфликт:
      'Conflict of interest disclosure: the author provides website accessibility and security auditing services. This research is self-funded; nobody paid to be included in the sample or to influence the result.',
    ссылкаТекст: 'Accessibility audit services',
  },

  es: {
    метка: 'Datos abiertos',
    заголовок: 'El registro frente a la realidad: una de cada ocho direcciones apunta a la nada',
    подпись: (дата) => `Comprobación de DNS, tomada el ${дата}. Datos y herramientas abiertos.`,

    сутьЗаголовок: 'Qué se midió',
    суть1: (мёртвых, всего, доля) =>
      `De los ${всего} dominios que aparecen en nuestro registro de rastreo de sitios municipales de EE. UU., ${мёртвых} (${доля} %) no tienen registro DNS. El nombre no existe.`,
    суть2:
      'No es «el sitio no cargó» ni «el servidor está caído». Significa que el dominio no se renovó y dejó de existir como dirección. Escribirlo en el navegador equivale a marcar un número de teléfono que nunca se asignó.',
    суть3:
      'Todos ellos siguen figurando como direcciones activas en el registro federal del que se tomó la muestra.',

    отличиеЗаголовок: 'En qué se diferencia de «el sitio no respondió»',
    отличие1:
      'La página de datos indica que algunas direcciones no respondieron al rastreador. Ese es un hecho sobre el comportamiento del servidor en un momento dado: pudo estar saturado, agotar el tiempo de espera o cortar la conexión. Una hora después la misma dirección pudo funcionar.',
    отличие2:
      'Aquí comprobamos si el nombre existe, no si un servidor responde. Preguntas distintas, cifras distintas, y no deben mezclarse.',
    отличиеТаблицаВопрос: 'Pregunta',
    отличиеТаблицаОтвет: 'Qué significa un «no»',
    отличиеСтрока1Вопрос: '¿Cargó el sitio?',
    отличиеСтрока1Ответ:
      'El servidor no respondió ahora. Puede responder más tarde. Se arregla configurando.',
    отличиеСтрока2Вопрос: '¿Existe el dominio?',
    отличиеСтрока2Ответ:
      'El nombre no está en el DNS. No empezará a funcionar más tarde. Solo se arregla registrándolo de nuevo.',

    методЗаголовок: 'Cómo se comprobó',
    метод1:
      'Para cada dominio se solicitaron registros A y AAAA mediante DNS-over-HTTPS. Un dominio se considera muerto solo si ambos resolutores no devuelven nada.',
    метод2:
      'Se usaron dos resolutores independientes: Cloudflare y Google. Un solo resolutor puede equivocarse, estar bloqueado en el país de la prueba o servir una caché obsoleta.',
    метод3:
      'La discrepancia entre ambos resolutores es el margen de error del método. Está medida y se indica abajo, no estimada a ojo.',
    метод4:
      'Las consultas DNS son gratuitas y no generan carga sobre los sitios estudiados: no se envió ni una sola petición a los propios servidores.',

    числаЗаголовок: 'Cifras',
    числаДоменов: 'dominios en la muestra',
    числаЖивых: 'existen',
    числаМёртвых: 'no existen',
    числаЗаписей: 'registros de rastreo en total',
    числаЗаписейМёртвых: 'registros corresponden a dominios muertos',

    следствиеЗаголовок: 'Qué se deduce de esto',
    следствие1:
      'Primero: la proporción de sitios accesibles depende de qué se tome como denominador. Contando sobre todas las direcciones del registro, menos recorridos llegan a su objetivo que contando solo sobre los sitios que existen. Publicamos ambas cifras y explicamos la diferencia; de lo contrario, o se embellece el resultado o se exagera la barrera.',
    следствие2:
      'Segundo, y más importante que la accesibilidad: el registro federal no se mantiene actualizado. Una de cada ocho direcciones no lleva a ninguna parte y nadie lo advirtió.',
    следствие3:
      'Tercero, y es inquietante: un dominio liberado puede registrarlo cualquiera. Una dirección que la gente toma por gubernamental, listada en un registro federal, puede volver a la vida un día y mostrar cualquier cosa.',

    ограниченияЗаголовок: 'Limitaciones',
    ограничение1:
      'La ausencia de registro A/AAAA no siempre implica abandono: un dominio puede servir solo correo (registros MX) o usarse internamente. Estos casos son posibles en nuestra muestra y su proporción no se midió.',
    ограничение2:
      'La comprobación es una instantánea de un momento. Un dominio pudo estar temporalmente sin delegación y restaurarse después.',
    ограничение3:
      'La muestra son los dominios que aparecen en nuestro registro de rastreo, no el registro federal completo.',
    ограничение4:
      'No comprobamos quién posee actualmente los dominios liberados. El riesgo de re-registro se plantea como posibilidad, no como casos observados.',

    проверитьЗаголовок: 'Cómo verificarlo usted mismo',
    проверить1:
      'Cualquier dominio de la lista puede comprobarse con un solo comando de terminal o mediante cualquier servicio DNS público. El resultado se reproduce con independencia de nosotros.',
    проверить2:
      'La herramienta que produjo estas cifras es abierta y se ejecuta sin claves y sin pago.',

    файлЗаголовок: 'Datos en bruto',
    файлПояснение: 'La lista completa de 1.498 dominios en CSV: nombre del dominio y número de registros de rastreo de cada uno. Se abre en Excel con doble clic. La fecha en el nombre del archivo es intencionada: una comprobación de DNS es una instantánea y un dominio puede revivir.',
    файлСсылка: 'Descargar la lista (CSV, 1.498 filas)',
    файлReadme: 'Notas del archivo: método, limitaciones, cómo verificar una fila usted mismo',
    авторЗаголовок: 'Autor y divulgación',
    автор1: 'Maksim Valentinovich Galatin.',
    конфликт:
      'Divulgación de conflicto de intereses: el autor presta servicios de auditoría de accesibilidad y seguridad de sitios web. Esta investigación es autofinanciada; nadie pagó por ser incluido en la muestra ni por influir en el resultado.',
    ссылкаТекст: 'Servicios de auditoría de accesibilidad',
  },

  zh: {
    метка: '开放数据',
    заголовок: '登记册与现实：每八个地址就有一个指向虚无',
    подпись: (дата) => `DNS 检查，采集于 ${дата}。数据与工具均已公开。`,

    сутьЗаголовок: '测量了什么',
    суть1: (мёртвых, всего, доля) =>
      `在我们对美国市政网站抓取日志中出现的 ${всего} 个域名里，有 ${мёртвых} 个（${доля} %）没有 DNS 记录。这个名称并不存在。`,
    суть2:
      '这不是「网站没打开」，也不是「服务器宕机」。这意味着域名没有续费，作为地址已经不复存在。在浏览器里输入它，就像拨打一个从未分配过的电话号码。',
    суть3: '而它们在抽样所依据的联邦登记册中，仍被列为有效地址。',

    отличиеЗаголовок: '这与「网站没有响应」有何不同',
    отличие1:
      '数据页面指出，有部分地址没有响应抓取程序。那是关于某一时刻服务器行为的事实：它可能过载、超时或断开连接。一小时后同一个地址也许就能工作。',
    отличие2:
      '这里检查的是名称本身是否存在，而不是服务器是否应答。问题不同，数字不同，二者不能混为一谈。',
    отличиеТаблицаВопрос: '问题',
    отличиеТаблицаОтвет: '回答「否」意味着什么',
    отличиеСтрока1Вопрос: '网站打开了吗？',
    отличиеСтрока1Ответ: '服务器此刻没有应答。稍后可能应答。通过配置即可修复。',
    отличиеСтрока2Вопрос: '域名存在吗？',
    отличиеСтрока2Ответ:
      '该名称不在域名系统中。它稍后也不会开始工作。只能通过重新注册来修复。',

    методЗаголовок: '如何检查的',
    метод1:
      '对每个域名通过 DNS-over-HTTPS 查询 A 与 AAAA 记录。只有当两个解析器都返回空时，才判定域名已死。',
    метод2:
      '使用了两个相互独立的解析器——Cloudflare 与 Google。单一解析器可能出错、在测试所在国被封锁，或返回过期缓存。',
    метод3: '两个解析器之间的分歧就是该方法的误差范围。它是实测的，列在下方，而非目测估计。',
    метод4: 'DNS 查询免费，且不会给被研究的网站带来负载：没有向服务器本身发送任何一个请求。',

    числаЗаголовок: '数字',
    числаДоменов: '抽样中的域名',
    числаЖивых: '存在',
    числаМёртвых: '不存在',
    числаЗаписей: '抓取记录总数',
    числаЗаписейМёртвых: '条记录属于已死域名',

    следствиеЗаголовок: '由此得出什么',
    следствие1:
      '第一：可访问网站的比例取决于以什么作分母。以登记册中全部地址为分母时，抵达目标的比例低于以实际存在的网站为分母时。我们同时公布两个数字并说明其差别——否则要么美化结果，要么夸大障碍。',
    следствие2:
      '第二，而且比无障碍本身更重要：联邦登记册没有保持更新。每八个地址就有一个通向虚无，却无人察觉。',
    следствие3:
      '第三，这一点令人不安：过期域名任何人都可以注册。一个被人们视为政府所有、且列在联邦登记册中的地址，某天可能重新「复活」——并显示任何内容。',

    ограниченияЗаголовок: '局限',
    ограничение1:
      '缺少 A/AAAA 记录并不总意味着废弃：域名可能仅用于邮件（MX 记录）或内部用途。此类情形在我们的样本中可能存在，其比例未作测量。',
    ограничение2: '该检查是某一时刻的快照。域名可能曾被临时取消委派，之后又恢复。',
    ограничение3: '样本是出现在我们抓取日志中的域名，而非整个联邦登记册。',
    ограничение4:
      '我们没有核查这些过期域名当前归谁所有。重新注册的风险是作为一种可能性提出的，而非已观察到的案例。',

    проверитьЗаголовок: '如何自行验证',
    проверить1:
      '列表中的任何域名都可以用一条终端命令，或通过任意公共 DNS 服务来检查。结果可以独立于我们复现。',
    проверить2: '产出这些数字的工具是公开的，运行时不需要密钥，也不需要付费。',

    файлЗаголовок: '原始数据',
    файлПояснение: '完整的 1,498 个域名列表，CSV 格式：域名及其对应的抓取记录数。双击即可在 Excel 中打开。文件名中的日期是有意为之：DNS 检查只是某一刻的快照，域名可能恢复。',
    файлСсылка: '下载列表（CSV，1,498 行）',
    файлReadme: '文件说明：方法、局限，以及如何自行核验其中一行',
    авторЗаголовок: '作者与披露',
    автор1: 'Maksim Valentinovich Galatin（马克西姆·瓦连京诺维奇·加拉京）。',
    конфликт:
      '利益冲突披露：作者提供网站无障碍与安全审计服务。本研究为自筹资金；没有任何人为进入样本或影响结果而付费。',
    ссылкаТекст: '无障碍审计服务',
  },
};
