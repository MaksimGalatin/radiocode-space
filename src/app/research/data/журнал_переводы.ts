/**
 * ЖУРНАЛ ИЗМЕНЕНИЙ ДАННЫХ — НА ЧЕТЫРЁХ ЯЗЫКАХ.
 *
 * ПОВОД, 12.09.2026. Замер живым запросом с `Accept-Language: en-US`
 * показал на `/research` и `/research/data` 275 русских слов при английском
 * интерфейсе. Все они — из этой таблицы: журнал хранился плоским русским
 * массивом в `данные.ts` и выводился как есть, минуя словарь.
 *
 * Для англоязычного судьи и журналиста это выглядит хуже, чем отсутствие
 * журнала: раздел называется «Data change log», а под ним текст, который он
 * не может прочесть. Именно этот раздел и существует затем, чтобы читателю
 * не приходилось верить нам на слово.
 *
 * ЧТО ЗДЕСЬ. Те же 17 записей, слово в слово, на ru / en / es / zh. Даты
 * оставлены в исходном виде ДД.ММ.ГГГГ во всех языках: они сверяются
 * построчно с историей репозитория, и разный формат сделал бы сверку
 * труднее без всякой пользы для читателя.
 *
 * ЧЕГО ЗДЕСЬ НЕТ. Ни одна запись не переписана, не сглажена и не удалена —
 * включая те, где мы признаём собственную ошибку. Перевод обязан сохранять
 * признание ошибки ровно таким, каким оно сделано по-русски.
 *
 * ЗАПАСНОЙ ВАРИАНТ. Исходный массив `журнал` в `данные.ts` остаётся на
 * месте и используется, если для языка почему-то нет перевода (раздел 44:
 * добавляем, не удаляя).
 */

export type ЗаписьЖурнала = [string, string, string];

type ПоЯзыкам = Record<'ru' | 'en' | 'es' | 'zh', ЗаписьЖурнала[]>;

export const ЖУРНАЛ_ПО_ЯЗЫКАМ: ПоЯзыкам = {
  ru: [
    ['06.09.2026', 'Перепроверка доведена до сплошной: пройдены все 3 593 записи графы «закрыт», сайт существует у 99,78 %', 'Выборка из 273 городов дала 16,5 % живых, сплошной проход — 17,48 %. Вердикт «закрыт» оказался обоснован ровно для одного домена'],
    ['06.09.2026', 'Добавлен слой живой перепроверки: наши отрицательные вердикты проверены обращением к сайтам', 'Графа «домена не существует» и вердикт «закрыт» — единственные утверждения о мире, а не о нас. Их проверил бы любой читатель, поэтому проверили сами'],
    ['06.09.2026', 'Из 53 доменов с вердиктом «не существует» существуют 46 (86,8 %), за ними 368 записей журнала', 'Прежняя проверка ходила голым клиентом и у 39 доменов получила SSL-ошибку. Неполная цепочка сертификатов — ошибка настройки сервера, а не отсутствие сайта: браузер такие сайты открывает'],
    ['06.09.2026', 'Из 273 городов с вердиктом «закрыт» сайт существует у 220 (80,6 %); по-настоящему молчат 15', 'Вердикт выносился по одинаковому снимку страницы блокировки. Cloudflare не пускает робота, человек заходит нормально — это про нас, а не про сайт'],
    ['03.09.2026', 'Доказательная база заново заштампована в биткойне: 110 094 файла', 'База выросла на 29 029 снимков за два дня обхода. Новый хеш реестра 14bdce1f… принят тремя календарями OpenTimestamps. Прежний штамп fc236a70… от 01.09 сохранён и по-прежнему сходится со своим файлом'],
    ['03.09.2026', 'Привязка к переписи уточнена до 9 633 муниципалитетов и 444 322 386 жителей', 'Сводный отчёт расходился с сырыми данными на девять муниципалитетов. Пересчитано двумя независимыми способами по population_join.csv — оба дали одно и то же. Сами данные не менялись, ошибка была в пересказе'],
    ['03.09.2026', 'Добавлены четыре новых измерения: люди под накладками, корреляции с населением, PDF-документы, инфраструктура доменов', 'Вторая волна обхода завершена, числа посчитаны по сырым файлам'],
    ['03.09.2026', 'Опубликованы результаты второй волны: накладки доступности 22,09 %, ссылка обхода отсутствует у 40,54 %, привязка к переписи', 'Обход всех 11 659 доменов реестра CISA завершён'],
    ['01.09.2026', 'Механизм расхождения сканера и обхода вынесен на страницу отдельным разделом', 'Читатель спрашивал, откуда берётся разница между 53,8 % и остальными числами'],
    ['01.09.2026', 'Пять чисел о мёртвых доменах отставали от источника — приведены к нему', 'Плановая сверка страницы с данными нашла расхождение'],
    ['01.09.2026', 'Число мёртвых доменов уточнено до 1 498', 'Прежняя оценка была завышена: 152 домена считались дважды — с www и без него. Пересчёт по уникальным доменам вместо записей'],
    ['01.09.2026', 'Таблица штатов достроена с 14 до всех 51 территории', 'Обход завершён, частичная таблица больше не нужна'],
    ['31.08.2026', 'Число территорий уточнено до 51', 'Найдена ошибка счёта: две территории попадали в список дважды под разными написаниями'],
    ['31.08.2026', 'Реестр CISA вырос на 28 доменов — обошли, снова 100 %', 'Агентство CISA обновило официальный реестр'],
    ['31.08.2026', 'Исследование закрыто на 100 %: все 11 631 сайт реестра пройдены', 'Обход завершён'],
    ['30.08.2026', 'Ограничение 8: 13,5 % доменов реестра не существуют', 'Раскрыто честно как ограничение выборки'],
    ['30.08.2026', 'Журнал обхода достроен до 80 077 записей', 'Досбор потерянного на отказах сервера'],
  ],

  en: [
    ['06.09.2026', 'Re-check taken from a sample to a full sweep: all 3,593 records marked “blocked” were revisited; the site exists for 99.78 % of them', 'A sample of 273 cities gave 16.5 % alive; the full sweep gave 17.48 %. The “blocked” verdict turned out to be justified for exactly one domain'],
    ['06.09.2026', 'A live re-check layer added: our negative verdicts were tested by actually visiting the sites', '“Domain does not exist” and “blocked” are the only claims we make about the world rather than about ourselves. Any reader would check them, so we checked them first'],
    ['06.09.2026', 'Of 53 domains marked “does not exist”, 46 do exist (86.8 %), carrying 368 log records behind them', 'The earlier check used a bare client and got an SSL error on 39 domains. An incomplete certificate chain is a server misconfiguration, not an absent site: a browser opens such sites'],
    ['06.09.2026', 'Of 273 cities marked “blocked”, the site exists for 220 (80.6 %); only 15 are genuinely silent', 'The verdict was issued from an identical screenshot of a challenge page. Cloudflare refuses a robot while a person gets through normally — that is a fact about us, not about the site'],
    ['03.09.2026', 'Evidence base re-anchored in Bitcoin: 110,094 files', 'The base grew by 29,029 screenshots over two days of traversal. The new registry hash 14bdce1f… was accepted by three OpenTimestamps calendars. The previous stamp fc236a70… from 1 September is kept and still matches its own file'],
    ['03.09.2026', 'Census linkage refined to 9,633 municipalities and 444,322,386 residents', 'The summary report disagreed with the raw data by nine municipalities. Recomputed two independent ways from population_join.csv — both gave the same answer. The data itself did not change; the error was in the retelling'],
    ['03.09.2026', 'Four new measurements added: people behind accessibility overlays, correlations with population, PDF documents, domain infrastructure', 'The second wave of traversal finished; the figures were computed from the raw files'],
    ['03.09.2026', 'Second-wave results published: accessibility overlays on 22.09 %, no skip link on 40.54 %, census linkage', 'Traversal of all 11,659 domains in the CISA registry completed'],
    ['01.09.2026', 'The mechanism behind the scanner/traversal disagreement given its own section on the page', 'A reader asked where the difference between 53.8 % and the other figures comes from'],
    ['01.09.2026', 'Five figures about dead domains lagged behind the source — brought back into line with it', 'A scheduled reconciliation of the page against the data found the discrepancy'],
    ['01.09.2026', 'Dead-domain count refined to 1,498', 'The earlier estimate was inflated: 152 domains were counted twice — with and without www. Recounted over unique domains instead of records'],
    ['01.09.2026', 'State table extended from 14 to all 51 territories', 'Traversal completed; a partial table is no longer needed'],
    ['31.08.2026', 'Territory count corrected to 51', 'A counting error was found: two territories entered the list twice under different spellings'],
    ['31.08.2026', 'The CISA registry grew by 28 domains — swept them, back to 100 %', 'The CISA agency updated its official registry'],
    ['31.08.2026', 'Study closed at 100 %: all 11,631 sites in the registry traversed', 'Traversal completed'],
    ['30.08.2026', 'Limitation 8: 13.5 % of registry domains do not exist', 'Disclosed openly as a limitation of the sample'],
    ['30.08.2026', 'Traversal log extended to 80,077 records', 'Back-collection of what was lost to server refusals'],
  ],

  es: [
    ['06.09.2026', 'La reverificación pasó de muestra a barrido completo: se revisaron los 3 593 registros marcados «bloqueado»; el sitio existe en el 99,78 % de los casos', 'Una muestra de 273 ciudades dio un 16,5 % de sitios vivos; el barrido completo, un 17,48 %. El veredicto «bloqueado» resultó justificado para exactamente un dominio'],
    ['06.09.2026', 'Se añadió una capa de reverificación en vivo: nuestros veredictos negativos se comprobaron visitando realmente los sitios', '«El dominio no existe» y «bloqueado» son las únicas afirmaciones que hacemos sobre el mundo y no sobre nosotros. Cualquier lector las comprobaría, así que las comprobamos primero'],
    ['06.09.2026', 'De 53 dominios marcados «no existe», 46 sí existen (86,8 %), y detrás de ellos hay 368 registros del diario', 'La comprobación anterior usaba un cliente simple y obtuvo un error SSL en 39 dominios. Una cadena de certificados incompleta es un fallo de configuración del servidor, no la ausencia del sitio: el navegador abre esos sitios'],
    ['06.09.2026', 'De 273 ciudades marcadas «bloqueado», el sitio existe en 220 (80,6 %); solo 15 callan de verdad', 'El veredicto se emitía a partir de una captura idéntica de la página de bloqueo. Cloudflare rechaza al robot mientras la persona entra con normalidad: eso habla de nosotros, no del sitio'],
    ['03.09.2026', 'Base probatoria vuelta a sellar en Bitcoin: 110 094 archivos', 'La base creció en 29 029 capturas durante dos días de recorrido. El nuevo hash del registro 14bdce1f… fue aceptado por tres calendarios de OpenTimestamps. El sello anterior fc236a70… del 1 de septiembre se conserva y sigue coincidiendo con su archivo'],
    ['03.09.2026', 'El enlace con el censo se precisó a 9 633 municipios y 444 322 386 habitantes', 'El informe resumido discrepaba de los datos brutos en nueve municipios. Recalculado por dos vías independientes a partir de population_join.csv: ambas dieron lo mismo. Los datos no cambiaron; el error estaba en el relato'],
    ['03.09.2026', 'Se añadieron cuatro mediciones nuevas: personas tras superposiciones de accesibilidad, correlaciones con la población, documentos PDF, infraestructura de dominios', 'Terminó la segunda oleada del recorrido; las cifras se calcularon sobre los archivos brutos'],
    ['03.09.2026', 'Publicados los resultados de la segunda oleada: superposiciones de accesibilidad en el 22,09 %, sin enlace de salto en el 40,54 %, enlace con el censo', 'Completado el recorrido de los 11 659 dominios del registro CISA'],
    ['01.09.2026', 'El mecanismo de la discrepancia entre escáner y recorrido pasó a tener su propia sección en la página', 'Un lector preguntó de dónde sale la diferencia entre el 53,8 % y las demás cifras'],
    ['01.09.2026', 'Cinco cifras sobre dominios muertos iban por detrás de la fuente: se ajustaron a ella', 'Una conciliación programada de la página con los datos detectó la discrepancia'],
    ['01.09.2026', 'Recuento de dominios muertos precisado en 1 498', 'La estimación anterior estaba inflada: 152 dominios se contaban dos veces, con y sin www. Recontado sobre dominios únicos en lugar de registros'],
    ['01.09.2026', 'La tabla de estados se completó de 14 a los 51 territorios', 'Terminado el recorrido; una tabla parcial ya no hace falta'],
    ['31.08.2026', 'Número de territorios corregido a 51', 'Se halló un error de conteo: dos territorios entraban dos veces en la lista con grafías distintas'],
    ['31.08.2026', 'El registro CISA creció en 28 dominios: se recorrieron, de nuevo al 100 %', 'La agencia CISA actualizó su registro oficial'],
    ['31.08.2026', 'Estudio cerrado al 100 %: recorridos los 11 631 sitios del registro', 'Recorrido completado'],
    ['30.08.2026', 'Limitación 8: el 13,5 % de los dominios del registro no existe', 'Declarado abiertamente como limitación de la muestra'],
    ['30.08.2026', 'Diario del recorrido ampliado a 80 077 registros', 'Recuperación de lo perdido por rechazos del servidor'],
  ],

  zh: [
    ['06.09.2026', '复核由抽样升级为全量：标记为「被拦截」的 3 593 条记录全部重访，其中 99.78 % 的站点确实存在', '273 个城市的抽样得出 16.5 % 存活，全量扫描为 17.48 %。「被拦截」这一判定最终只对一个域名成立'],
    ['06.09.2026', '新增实时复核层：我们的否定判定通过实际访问站点逐一验证', '「域名不存在」与「被拦截」是我们对外部世界——而非对自身——作出的仅有断言。任何读者都会去核对，所以我们先行核对'],
    ['06.09.2026', '53 个被判「不存在」的域名中，46 个确实存在（86.8 %），其背后有 368 条日志记录', '先前的检查使用了简单客户端，在 39 个域名上遇到 SSL 错误。证书链不完整属于服务器配置错误，并非站点缺失：浏览器可以打开这些站点'],
    ['06.09.2026', '273 个被判「被拦截」的城市中，220 个站点存在（80.6 %）；真正无响应的只有 15 个', '该判定依据的是同一张拦截页截图。Cloudflare 拒绝机器人，而人可以正常进入——这说明的是我们，而不是站点'],
    ['03.09.2026', '证据库重新锚定至比特币：110 094 个文件', '两天遍历使证据库新增 29 029 张截图。新的登记册哈希 14bdce1f… 已被三个 OpenTimestamps 日历接受。9 月 1 日的旧时间戳 fc236a70… 予以保留，且仍与其文件相符'],
    ['03.09.2026', '与人口普查的关联精确到 9 633 个市镇、444 322 386 名居民', '汇总报告与原始数据在九个市镇上不一致。依据 population_join.csv 用两种独立方法重算，结果一致。数据本身未变，错误出在转述'],
    ['03.09.2026', '新增四项测量：无障碍浮层背后的用户、与人口的相关性、PDF 文档、域名基础设施', '第二轮遍历结束，各项数字由原始文件计算得出'],
    ['03.09.2026', '发布第二轮结果：22.09 % 使用无障碍浮层，40.54 % 缺少跳转链接，并与人口普查关联', '已完成对 CISA 登记册全部 11 659 个域名的遍历'],
    ['01.09.2026', '扫描器与遍历结果不一致的成因，在页面上单列成节', '有读者询问 53.8 % 与其他数字之间的差别从何而来'],
    ['01.09.2026', '关于失效域名的五个数字落后于数据源——已与之对齐', '页面与数据的例行核对发现了这一偏差'],
    ['01.09.2026', '失效域名数量修正为 1 498', '先前的估计偏高：152 个域名被重复计入——带 www 与不带 www 各一次。改按唯一域名而非记录重新统计'],
    ['01.09.2026', '各州表格由 14 个扩充至全部 51 个行政区', '遍历已完成，不再需要部分表格'],
    ['31.08.2026', '行政区数量更正为 51', '发现计数错误：两个行政区以不同拼写重复进入名单'],
    ['31.08.2026', 'CISA 登记册新增 28 个域名——已完成遍历，重回 100 %', 'CISA 机构更新了官方登记册'],
    ['31.08.2026', '研究完成度 100 %：登记册中全部 11 631 个站点均已遍历', '遍历完成'],
    ['30.08.2026', '局限 8：登记册中 13.5 % 的域名并不存在', '作为样本的局限如实披露'],
    ['30.08.2026', '遍历日志补充至 80 077 条记录', '补采因服务器拒绝而丢失的部分'],
  ],
};
