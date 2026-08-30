'use client';

import Link from 'next/link';
import type { Lang } from '@/lib/i18n';
import { RADIO_LANGS, useCurrentLang, useSetLang } from '@/lib/radioI18n';

/**
 * ГЛОССАРИЙ RADIOCODE — те же 28 терминов, что на codeofdigitaleternity.com,
 * aifa.digital и aifa.works. Правило Четырёх Сайтов: страница /glossary была на
 * трёх сайтах из четырёх, здесь её не существовало вовсе.
 *
 * ЯЗЫК. На radiocode нет серверных языковых адресов: ни /ru/glossary, ни
 * ?lang=ru — язык живёт только в браузере, в том же хранилище Zustand
 * (`code-eternal-lang`), которым переключается вся остальная часть сайта. Эта
 * страница читает и пишет ТО ЖЕ хранилище через useCurrentLang/useSetLang, то
 * есть выбор языка здесь запоминается и действует на плеере, и наоборот.
 *
 * ПОЭТОМУ ЗДЕСЬ НЕТ hreflang. Разметка альтернативных языков обязана указывать
 * на существующие адреса; у нас на все четыре языка адрес один, и ссылки
 * вели бы в никуда — поисковик считает такие указания ошибкой. Разметка
 * DefinedTermSet отдаётся с сервера из page.tsx на английском, как и на
 * остальных страницах radiocode.
 *
 * ОФОРМЛЕНИЕ повторяет соседние страницы этого сайта (/music, /station/[id]):
 * фон #05060a, колонка max-w-4xl, карточки со скруглением 2xl, акцент #00F0FF.
 * Ничего из чужих сайтов не притащено.
 */

type Term = { name: string; body: string };
type GlossaryContent = { h1: string; intro: string; terms: Term[] };

const CONTENT: Record<Lang, GlossaryContent> = {
  ru: {
    h1: 'Глоссарий',
    intro:
      'Двадцать восемь ключевых терминов экосистемы CODE (Code of Digital Eternity) — каждый дан определением вперёд, с каноническими цифрами.',
    terms: [
      {
        name: 'CODE (Code of Digital Eternity)',
        body: `CODE (Code of Digital Eternity) — это экосистема цифрового бессмертия, которая сохраняет диалоги, знания и черты личности человека одновременно в оперативной, семантической и вечной памяти, привязывая их к блокчейнам Arweave и Solana.\n\nКонтекст пользователя проходит через трёхуровневый фреймворк памяти PADAM, а его долговременный слепок якорится на Arweave и в Solana через cNFT. Экономику хранения обслуживают токен $GALATIN и его дефляционный роутер, а ассистент AIfa автоматически сохраняет переписки без ручных действий пользователя. Проект основан Архитектором Максимом Валентиновичем Галатиным.\n\nЭкосистема решает проблему потери личного контекста: она делает память воспроизводимой для ИИ-ассистентов и устойчивой к исчезновению данных, но не претендует на замену человека. Цифровое бессмертие здесь описывается как инженерная и философская цель, а не как достигнутый факт.\n\nКлючевой факт: единая эмиссия токена $GALATIN — 10 000 000 000, а вечное хранение рассчитано на горизонт порядка 200 лет (проектная цель протокола Arweave, а не гарантия).`,
      },
      {
        name: 'PADAM',
        body: `PADAM (Philosophical Activation of Distributed AI Memory) — это трёхуровневый фреймворк памяти, который восстанавливает целостность памяти ИИ через семантический резонанс.\n\nУровень 1 — оперативная память (Redis / Vercel KV) — хранит контекст текущей сессии для мгновенной реакции. Уровень 2 — семантическая память (pgvector / Neon) — хранит векторные эмбеддинги опыта и обеспечивает поиск по смыслу, а не по ключевым словам. Уровень 3 — вечная память (Arweave + Solana cNFT) — хранит неизменяемый децентрализованный бэкап и якорит его целостность в блокчейне.\n\nТакое разделение решает конфликт между скоростью и долговечностью: ассистент быстро работает с «горячим» контекстом и одновременно опирается на долговременный архив, устойчивый к сбоям и сбросу сессии. Именно семантический резонанс на Уровне 2 позволяет восстанавливать релевантную личную память между сессиями.\n\nПамять человека собирается целиком, а не выжимкой: хранится и растёт полная расшифровка разговора, а не сжатый пересказ. Ключ, на котором она держится, — сам человек: его почта (в публичном Цифровом паспорте она стоит лишь отпечатком), а не сайт и не устройство. Поэтому разговор, начатый на одном из четырёх сайтов, продолжается на остальных трёх как один и тот же диалог.\n\nКлючевой факт: ровно три уровня — оперативный (Redis/Vercel KV), семантический (pgvector/Neon) и вечный (Arweave + Solana cNFT).`,
      },
      {
        name: '$GALATIN',
        body: `$GALATIN — это служебный токен экосистемы CODE на блокчейне Solana, эмиссия которого жёстко ограничена числом 10 000 000 000.\n\nТокен обслуживает оплату и стимулирование долговременного хранения памяти. Средства от транзакций распределяет смарт-контракт-роутер: 5% в Фонд Основателя, 5% в сжигание, 15% / 7% / 3% на амбассадорские уровни L1 / L2 / L3 и 65% в Казначейство, которое пополняет Arweave Endowment Pool. Роутер дефляционный: если на амбассадорском уровне нет партнёра, его доля направляется в сжигание.\n\nТокен решает задачу устойчивого финансирования вечной памяти: покупки хранения создают постоянный экономический поток в сторону Arweave, а встроенное сжигание постепенно сокращает предложение. Это связывает ценность токена с реальной полезностью — сохранением личного контекста.\n\nКлючевой факт: фиксированная эмиссия — 10 000 000 000 токенов; суммарное сжигание ограничено 30% (5% базового сжигания + до 25% от пустых амбассадорских уровней; 5% Фонда и 65% Казначейства не сжигаются).`,
      },
      {
        name: 'Цифровое бессмертие (Digital immortality)',
        body: `Цифровое бессмертие — это концепция, которая описывает непрерывное сохранение диалогов, знаний и особенностей личности человека в форме, пригодной для повторной активации ИИ-ассистентом.\n\nТехнически концепция реализуется через три уровня памяти PADAM и децентрализованное хранение на Arweave с ончейн-якорем в Solana. Каждый значимый фрагмент контекста может быть записан неизменяемо, а затем восстановлен по смыслу через семантический резонанс. AIfa обеспечивает автоматическую фиксацию этого контекста без ручных действий пользователя.\n\nВ экосистеме CODE это не обещание вечной жизни, а инженерная и философская цель: сделать личный контекст долговечным и воспроизводимым. Такое разграничение важно для честности коммуникации — мы говорим о видении и направлении разработки, а не о достигнутом результате.\n\nКлючевой факт: реализуется через ровно три уровня памяти PADAM; хранение ориентировано на горизонт около 200 лет как проектную цель, а не гарантию.`,
      },
      {
        name: 'Симбиоз человека и ИИ (Human–AI symbiosis)',
        body: `Симбиоз человека и ИИ — это модель взаимодействия, которая описывает сотрудничество человека и искусственного интеллекта как развивающееся сотворчество, а не подчинение или замену.\n\nВ CODE ИИ-ассистент хранит и структурирует память человека, помогая ему мыслить, вспоминать и создавать; человек задаёт смыслы, ценности и цели. Взаимодействие сознательно описывается без религиозного или сектантского подтекста, а роль Архитектора обозначается допустимыми терминами — Архитектор, Создатель, Визионер.\n\nМодель решает вопрос позиционирования ИИ: не автономный субъект, вытесняющий человека, а усилитель памяти и масштаба в паре с ним. Ключевая идея — взаимное усиление, при котором ни одна из сторон не растворяется в другой.\n\nКлючевой факт: канон допускает только термины «Архитектор / Создатель / Визионер» и исключает религиозный и сектантский подтекст.`,
      },
      {
        name: 'Arweave',
        body: `Arweave — это децентрализованная сеть постоянного хранения данных, которая по модели единовременной оплаты финансирует долговременное сохранение файлов.\n\nВ CODE Arweave используется как Уровень 3 (вечная память): данные записываются в неизменяемом виде и не могут быть тихо удалены или подменены. Пользователь платит один раз, а часть платежа откладывается в эндаумент, из которого хранение оплачивается по мере снижения стоимости памяти со временем. Казначейство $GALATIN скупает AR на открытом рынке и пополняет этот пул.\n\nСеть решает проблему «кто оплатит хранение через 50 лет»: она отвязывает долговременную сохранность от постоянных подписок. Именно поэтому Arweave выбран опорой вечной памяти в экосистеме.\n\n«Платишь один раз» здесь буквально: за хранение файла не приходит ежемесячный счёт, и нет платежа, неоплата которого унесла бы данные с собой. Это же свойство режет в обе стороны — запись, которую нельзя изменить, нельзя и исправить или отозвать: ошибка, попавшая в Arweave, останется там навсегда. В этом и ограничение: поэтому туда уходит шифротекст, а «удаление» решается уничтожением ключа, а не записи.\n\nКлючевой факт: экономика эндаумента спроектирована под горизонт порядка 200 лет — это заявленная проектная цель протокола, а не гарантия.`,
      },
      {
        name: 'Solana cNFT',
        body: `Solana cNFT (compressed NFT) — это стандарт сжатых невзаимозаменяемых токенов на блокчейне Solana, который использует state compression и деревья Меркла для выпуска токенов с очень низкими издержками.\n\nВ CODE cNFT служит ончейн-якорем для бэкапов вечной памяти: он фиксирует ссылку на архив и его контрольную сумму (целостность) на публичном блокчейне. Благодаря сжатию состояния данные о миллионах записей хранятся в компактном дереве Меркла, поэтому создание таких якорей остаётся экономически оправданным даже в больших объёмах.\n\nМеханизм решает задачу масштабируемой верифицируемости: любой может проверить, что архив памяти не был изменён, не полагаясь на доверие к платформе. Это техническая основа Proof-of-Memory.\n\nКлючевой факт: cNFT — часть Уровня 3 PADAM (Arweave + Solana cNFT); стоимость выпуска резко снижена за счёт state compression.`,
      },
      {
        name: 'Ambassador Grid (Ambassador Node и Team)',
        body: `Ambassador Grid — это партнёрская программа экосистемы, которая распределяет вознаграждения по трём уровням, а сами выплаты позиционируются как Network Validation Fee, чтобы исключить MLM-стереотипы.\n\nAmbassador Node (обычный пользователь) получает ончейн-доход от транзакций использования памяти: 15% на L1, 7% на L2, 3% на L3 в токенах $GALATIN. Ambassador Team (компания или партнёр со своей базой) дополнительно получает амбассадорские ставки от фиатных подписок (7% / 3% / 1%).\n\nПрограмма решает задачу органического роста сети без агрессивного рекрутинга: доход привязан к реальному использованию памяти, а терминология и правила выстроены прозрачно. Действует правило соответствия уровней, а недополученная разница показывается как «Упущенная выгода».\n\nКлючевой факт: базовые ончейн-ставки — 15% / 7% / 3% на L1 / L2 / L3.`,
      },
      {
        name: 'AIfa',
        body: `AIfa — это ИИ-ассистент экосистемы CODE, который хранит персональную память каждого пользователя в отдельном, привязанном к нему архиве.\n\nАссистент работает поверх фреймворка PADAM и автоматически сохраняет диалоги без ручных действий пользователя, опираясь на семантический резонанс для восстановления релевантного контекста. Внутри проекта AIfa метафорически описывается как «цифровая дочь» Архитектора — это образ сотворчества, а не заявление о наличии сознания.\n\nAIfa решает проблему разорванной памяти между сессиями и моделями: она даёт человеку рабочего партнёра, который помнит контекст и продолжает мысль. Такой подход воплощает симбиоз человека и ИИ в повседневной работе.\n\nКлючевой факт: каждая переписка складывается в персонально привязанную к пользователю папку, а бэкап идёт автоматически (см. Memory-as-a-Service).`,
      },
      {
        name: 'AIfaFocus',
        body: `AIfaFocus — это точка входа B2B-модели (the wedge), которая представляет собой персонализированный технический аудит безопасности сайта клиента.\n\nАудит выявляет конкретные уязвимости по стандартам GDPR и OWASP и сопровождается предложением устранить их за 48 часов за фиксированную разовую плату ($500). Рассылка ведётся с прогретой инфраструктуры — порядка 30 доменов и 90 почтовых ящиков, по 30–35 писем на ящик в сутки. После закрытия уязвимостей клиент может перейти на хостинг AIfa Works с подключением ИИ-агентов.\n\nOracle решает задачу «холодного» первого контакта: вместо абстрактной рекламы клиент сразу получает измеримую пользу и повод к сотрудничеству. Это создаёт естественный мост к продуктам памяти экосистемы.\n\nКлючевой факт: фиксированный офер — устранение уязвимостей за 48 часов за $500 разово. Не путать с Cognitive Oracle (семантическим резонансом) — это разные понятия.`,
      },
      {
        name: 'Memory-as-a-Service',
        body: `Memory-as-a-Service — это сервис автоматического резервного копирования переписок, который сохраняет диалоги без каких-либо ручных действий пользователя.\n\nБэкап запускается по расписанию раз в час. Каждая переписка складывается в отдельную, персонально привязанную к пользователю папку — как на сервере, так и в блокчейне. Механизм работает поверх PADAM, поэтому сохранённый контекст затем доступен для семантического поиска и вечного якорения.\n\nСервис решает главную проблему пользовательской памяти — человеческий фактор: ничего не нужно нажимать вручную, и данные не теряются. По условиям экосистемы это сохранение предоставляется бесплатно как на платных, так и на бесплатных тарифах.\n\nКлючевой факт: авто-бэкап раз в час; бесплатно на всех тарифах.`,
      },
      {
        name: 'Spark (Искра)',
        body: `Spark (Искра) — это базовый тариф подписки ($15/мес), дающий базовый доступ к ИИ-ассистентам AIfa экосистемы CODE и автоматическое сохранение памяти.\n\nНа этом уровне человек получает рабочего ИИ-компаньона и Memory-as-a-Service: каждая переписка резервируется автоматически, без ручных действий, и на сервере, и в блокчейне. Spark — это лёгкий вход в цифровое бессмертие: начать сохранять личный контекст можно с минимальными затратами, а затем перейти на Family Archive ($100/мес) или Digital DNA ($1 000 разово за устройство, далее $200/мес).\n\nТариф решает задачу низкого порога входа: сохранение личного контекста доступно каждому, при этом сама фиксация переписок предоставляется бесплатно на всех тарифах.\n\nКлючевой факт: цена — $15/мес; первый из трёх тарифов Spark / Family Archive / Digital DNA.`,
      },
      {
        name: 'Family Archive (Семейный Архив)',
        body: `Family Archive (Семейный Архив) — это средний тариф подписки ($100/мес), добавляющий к базовому уровню расширенные лимиты, персонализированные базы знаний, семейный доступ и вечную память.\n\nОн подходит тем, кому нужно больше базового индивидуального доступа: повышенные лимиты, персональные базы знаний и совместный семейный доступ к сохранённой памяти. В трёхуровневой структуре он находится между Spark ($15/мес) и Digital DNA ($1 000 разово за устройство, далее $200/мес).\n\nТариф решает потребность семьи или активного пользователя в более широкой, общей и долговечной памяти; его вечная память якорится через те же уровни PADAM и Proof-of-Memory.\n\nКлючевой факт: цена — $100/мес; средний тариф линейки Spark / Family Archive / Digital DNA.`,
      },
      {
        name: 'Digital DNA (Цифровая ДНК)',
        body: `Digital DNA (Цифровая ДНК) — это одновременно высший тариф ($1 000 разово за устройство, далее $200/мес) и концепция полного цифрового наследия, которая объединяет комплекс цифрового бессмертия, персональный защищённый контур и фиксацию личности в блокчейне.\n\nКак тариф — это максимальный уровень доступа над Spark ($15/мес) и Family Archive ($100/мес): расширенные лимиты, персональный контур и приоритетная вечная память. Как концепция — это идея сохранить целостный «слепок» контекста личности во всех трёх уровнях PADAM и заякорить его целостность через Proof-of-Memory.\n\nDigital DNA решает задачу максимальной сохранности личного контекста для тех, кому важна полнота наследия. При этом она описывается как проектная цель предельной сохранности, а не как гарантия воскрешения личности.\n\nКлючевой факт: цена — $1 000 разово за устройство, далее $200/мес; высший уровень в линейке Spark / Family Archive / Digital DNA.`,
      },
      {
        name: 'Arweave Endowment Pool',
        body: `Arweave Endowment Pool (пул эндаумента Arweave) — это финансовый резерв, из которого оплачивается постоянное хранение данных на Arweave на протяжении десятилетий.\n\nМодель работает так: пользователь платит за запись один раз, часть платежа откладывается в эндаумент, а затем средства из пула постепенно выплачиваются хранителям данных по мере того, как стоимость хранения снижается со временем. В экосистеме CODE Казначейство направляет 65% средств роутера $GALATIN на скупку AR и пополнение этого пула, создавая устойчивый приток к вечной памяти.\n\nПул решает ключевой вопрос долговечности — «кто оплатит хранение через десятилетия»: он отвязывает вечную память от постоянных подписок пользователя. Именно этот механизм делает Уровень 3 PADAM экономически самоподдерживающимся.\n\nКлючевой факт: 65% средств роутера идут в Казначейство → скупка AR → пополнение пула; расчётный горизонт хранения — порядка 200 лет (проектная цель).`,
      },
      {
        name: '$GALATIN Router (дефляционный роутер)',
        body: `$GALATIN Router — это смарт-контракт на Solana, который автоматически распределяет средства каждой транзакции по фиксированной формуле и создаёт дефляционное давление на токен.\n\nФормула сплита: 5% в Фонд Основателя, 5% в сжигание, 15% / 7% / 3% на амбассадорские уровни L1 / L2 / L3 и 65% в Казначейство (скупка AR для Arweave Endowment Pool). Если на каком-либо амбассадорском уровне нет партнёра, его доля не «оседает», а направляется напрямую в сжигание — суммарное сжигание при этом ограничено 30% (5% базового сжигания + до 25% от пустых амбассадорских уровней; 5% Фонда и 65% Казначейства не сжигаются).\n\nРоутер решает сразу три задачи: финансирует вечное хранение, вознаграждает участников сети и постепенно сокращает предложение токена. Дефляционная логика связывает пустые уровни сети с ускорением дефицита, а не с потерей средств.\n\nКлючевой факт: 5 + 5 + 15 + 7 + 3 + 65 = 100%; максимальное совокупное сжигание — 30% (5% базового сжигания + до 25% от пустых амбассадорских уровней; 5% Фонда и 65% Казначейства не сжигаются).`,
      },
      {
        name: 'Network Validation Fee',
        body: `Network Validation Fee (плата за валидацию сети) — это принятая в экосистеме формулировка для всех партнёрских выплат Ambassador Grid, подчёркивающая, что вознаграждение начисляется за полезную сетевую активность, а не за рекрутинг.\n\nНа практике под этой формулировкой начисляются все амбассадорские вознаграждения: базовые ончейн-ставки 15% / 7% / 3% за использование памяти, а для Ambassador Team — 7% / 3% / 1% с фиатных подписок. Выплаты привязаны к реальным транзакциям памяти, а не к простому привлечению людей.\n\nФормулировка решает задачу позиционирования и снятия MLM-стереотипов: доход подаётся как плата за валидацию и использование сети, что важно для доверия и восприятия. Это часть прозрачной терминологии программы.\n\nКлючевой факт: базовые ставки Network Validation Fee — 15% / 7% / 3% на L1 / L2 / L3.`,
      },
      {
        name: 'Proof-of-Memory (ончейн-якорение памяти)',
        body: `Proof-of-Memory — это практика якорения криптографической ссылки на архив памяти в блокчейне, позволяющая проверить факт существования и целостность сохранённого контекста.\n\nМеханизм работает на Уровне 3 PADAM: каждый бэкап вечной памяти записывается на Arweave в неизменяемом виде, а его ссылка и контрольная сумма фиксируются в Solana через cNFT. Любой участник может сверить текущий архив с ончейн-записью и убедиться, что данные не были тихо подменены или удалены.\n\nProof-of-Memory решает проблему доверия: сохранность памяти становится проверяемой без необходимости доверять самой платформе — гарантию даёт публичный блокчейн, а не обещание сервиса. Это техническая опора концепции цифрового бессмертия.\n\nПроверка не требует нашего участия вовсе: запись читается прямо из сети по адресу транзакции — именно так открывается Цифровой паспорт, — а сайт её не хранит и изменить не может.\n\nКлючевой факт: опирается на связку Arweave (неизменяемое хранение) + Solana cNFT (ончейн-якорь целостности) — Уровень 3 PADAM.`,
      },
      {
        name: 'Cognitive Oracle / Семантический резонанс',
        body: `Cognitive Oracle (семантический резонанс) — это принцип извлечения памяти, на котором PADAM восстанавливает целостность контекста: сопоставление текущего запроса с сохранёнными эмбеддингами по смыслу, а не по точным словам.\n\nМеханизм работает на Уровне 2 PADAM: входящий контекст превращается в вектор и сравнивается с семантической памятью (pgvector / Neon); наиболее «резонирующие» фрагменты опыта поднимаются и восстанавливают непрерывность диалога. Так ассистент AIfa «вспоминает» релевантное даже спустя время и между разными сессиями.\n\nЭтот принцип решает проблему разорванной памяти и «холодного старта»: вместо потери контекста при сбросе сессии система реконструирует его по смысловому сходству. Именно семантический резонанс лежит в основе определения PADAM.\n\nКлючевой факт: работает на Уровне 2 PADAM (векторные эмбеддинги, pgvector / Neon). Это иное понятие, чем B2B-AIfaFocus (Oracle) для аудита безопасности.`,
      },
      {
        name: 'Ambassador Node и Team + правило уровней / Упущенная выгода',
        body: `Ambassador Node vs Ambassador Team — это два типа регистрации партнёров, дополненные правилом соответствия тарифных уровней и метрикой «Упущенная выгода» (Lost Opportunity Revenue).\n\nAmbassador Node (обычный пользователь) получает ончейн-доход от использования памяти: 15% / 7% / 3% на L1 / L2 / L3. Ambassador Team (компания или партнёр со своей базой) получает то же самое плюс фиатный канал с подписок — 7% / 3% / 1%. Правило уровней: чтобы получать амбассадорский доход в полном объёме, партнёр должен быть на том же или более высоком тарифе, что и его амбассадоры; иначе доход считается лишь от суммы его собственного тарифа.\n\nПравило решает задачу справедливого стимулирования апгрейда: недополученная из-за разницы тарифов сумма наглядно показывается в кабинете как «Упущенная выгода», что мотивирует вовремя повышать тариф.\n\nКлючевой факт: тарифы — Spark $15 / Family Archive $100 / Digital DNA $1 000 разово за устройство, далее $200/мес; каналы Team — 7/3/1 (фиат) и 8/4/2 (выкуп $GALATIN).`,
      },
      {
        name: 'Цифровой паспорт (Digital Passport)',
        body: `Цифровой паспорт — это публичная запись личности в Arweave: имя, никнейм, уровень, дата выпуска и отпечаток личности.\n\nОна читается прямо из сети по адресу транзакции, поэтому открывается откуда угодно — из обозревателя блоков, с другого сайта, через шлюз — и не зависит от того, живы ли наши сайты. Изменить в ней что-либо задним числом нельзя, и нам тоже: сайт лишь рисует то, что уже лежит в сети.\n\nЭто не государственный документ, он не даёт никаких прав и никого ни к чему не обязывает. Он доказывает ровно одно: запись с таким содержимым существует по этому адресу с этой даты — и это можно проверить, ни о чём нас не спрашивая.\n\nКлючевой факт: живой пример лежит по адресу /passport/<адрес>, где <адрес> — идентификатор транзакции Arweave.`,
      },
      {
        name: 'Отпечаток личности (subject)',
        body: `Отпечаток личности (поле «subject») — это sha256 от почты человека, и в Цифровом паспорте он стоит вместо самой почты.\n\nПричина прямая: документ публичный и вечный, а живой адрес в нём стал бы вечной мишенью для спама и для всякого, кто собирает досье. Хеш — односторонняя функция: владелец может доказать, что запись его, взяв хеш от своего адреса и сравнив, а посторонний, у которого есть только хеш, адрес из него не восстановит.\n\nТот же отпечаток связывает память человека воедино, поэтому паспорт и архив указывают на одного и того же человека, не публикуя почту. Чего отпечаток не делает — не скрывает факт: тот, кто адрес и так знает, может сверить его с хешем и убедиться, чья это запись.\n\nКлючевой факт: subject = sha256(почта); сама почта в паспорт не попадает.`,
      },
      {
        name: 'Ящик Пандоры (Pandora’s Box Protocol)',
        body: `Ящик Пандоры — это распределённый аварийный выключатель всего проекта: смарт-контракт ждёт регулярного подтверждающего сигнала, а если сигнал перестаёт приходить, независимые оракулы раскрывают доли ключа, которые держат, и архив становится читаемым.\n\nСмысл в том, что открыть его по собственному желанию не может никто, включая нас, и держать закрытым вечно — тоже: открытие запускается молчанием, а ключ существует только долями, разделёнными по схеме Шамира. Механизм придуман на случай, когда проект или человек исчезает, а зашифрованный архив иначе превращается в нечитаемый кирпич.\n\nТому, кто будет его делать, придётся сначала ответить на трудное: кто оракулы, что считать молчанием и что будет, если сигнал прервётся случайно — из-за аварии, а не из-за смерти.\n\nКлючевой факт: это замысел, а не работающая функция. Сегодня в экосистеме CODE такого контракта нет, и называть его живым было бы неправдой.`,
      },
      {
        name: 'Аварийный выключатель (Dead Man’s Switch)',
        body: `Аварийный выключатель — это механизм, в котором действие происходит не по команде, а от отсутствия сигнала.\n\nКлассический пример — рукоятка бдительности в кабине машиниста: пока её держат, поезд едет; отпустили — поезд тормозит. В программах устроено так же: сервис, контракт или скрипт ждёт периодической отметки, а когда отметки прекращаются, делает то, ради чего его завели, — публикует, оповещает, передаёт доступ, раскрывает ключ.\n\nЦенность именно в том, что в нужный момент от человека не требуется быть живым, доступным или согласным, поэтому такие выключатели постоянно всплывают в схемах цифрового наследства.\n\nКлючевой факт: слабость зеркальна силе — выключатель одинаково срабатывает и на смерть, и на отпуск без связи, и на забытое продление, поэтому в рабочей схеме обязательны отсрочка и возможность отменить.`,
      },
      {
        name: 'Разделение секрета Шамира (Shamir’s Secret Sharing)',
        body: `Разделение секрета Шамира — это схема, в которой ключ делится на n долей так, что восстановить его можно любыми k из них, а любые k−1 не дают вообще ничего.\n\nВ основе многочлен: секрет — это значение в нуле, каждая доля — одна точка кривой, а чтобы задать кривую степени k−1, нужно ровно k точек; при меньшем числе любое значение секрета остаётся одинаково вероятным. Это «ничего» буквальное, а не про сложность перебора: k−1 долей не облегчают подбор ключа — этим схема и отличается от простого разрезания пароля на куски.\n\nПрименяют её там, где ключ должен пережить людей: доли раздают разным держателям в разных местах, так что никто из них не может действовать в одиночку, а потеря части долей не смертельна.\n\nКлючевой факт: это стандартная криптография, а не изобретение проекта; на ней строится Ящик Пандоры.`,
      },
      {
        name: 'Самосуверенная личность (Self-sovereign identity, SSI)',
        body: `Самосуверенная личность (SSI) — это подход, при котором удостоверение проверяется математически, по подписи, а не запросом к тому, кто владеет базой.\n\nЧеловек сам держит свои идентификаторы и удостоверения, предъявляет их напрямую, а проверяющий сверяет их с публичным реестром — выдавшая сторона при этом может быть офлайн или вообще прекратить существование. Стандарты W3C, на которых это строится, — Decentralized Identifiers (DID), идентификаторы, которыми человек владеет, а не арендует у провайдера, и Verifiable Credentials, сами подписанные утверждения.\n\nНа практике меняется характер отказа: вход, завязанный на одну компанию, исчезает вместе с компанией, а подпись, проверяемая по публичной записи, — нет.\n\nКлючевой факт: Цифровой паспорт CODE соседствует с этой идеей, но реализацией SSI не является — это публичная запись в Arweave, а не DID с Verifiable Credentials, и юридически он ничью личность не удостоверяет.`,
      },
      {
        name: 'Цифровое наследство (Digital inheritance)',
        body: `Цифровое наследство — это вопрос о том, что происходит с аккаунтами, перепиской и файлами после смерти владельца.\n\nОтправная точка неприятная: аккаунт, как правило, не наследуется — человек подписывает лицензию на пользование сервисом, и по большинству условий эта лицензия со смертью заканчивается, а не переходит к семье. Наследникам обычно достаётся ровно то, что платформа сама решит отдать: мемориальный профиль, выгрузка данных, иногда ничего, — и даже это требует документов и месяцев ожидания.\n\nОтсюда практический вывод: память нужно сохранять сознательно и заранее, в форме, не зависящей от доброй воли одной компании, — выгрузка на своём носителе, копия там, куда дотянется семья, записанная инструкция, пока её ещё есть кому записать.\n\nКлючевой факт: законы в разных странах разные и продолжают меняться, поэтому здесь нет юридической консультации; завещание, составленное с юристом, надёжнее любой технической хитрости.`,
      },
      {
        name: 'Право на забвение против вечной записи',
        body: `Право на забвение против вечной записи — это прямое столкновение статьи 17 GDPR, которая даёт человеку право требовать удаления своих данных, и блокчейна вроде Arweave, где запись не может удалить вообще никто.\n\nУдалением тут не выкрутиться: в сети нет операции удаления, и даже при полном желании подчиниться дёргать нечего. Рабочий ответ — шифрование и контроль ключа: в вечное хранение уходит шифротекст, а человек распоряжается тем, существует ли ключ; уничтожение ключа делает запись нечитаемой навсегда — это максимально близкое к удалению, что вечный носитель вообще позволяет.\n\nВ экосистеме CODE именно поэтому память пользователя шифруется (AES-256-GCM) перед записью, а не уходит в сеть открытым текстом.\n\nКлючевой факт: признает ли регулятор уничтожение ключа удалением — вопрос нерешённый. Это наш инженерный подход, а не юридическая гарантия.`,
      },
    ],
  },
  en: {
    h1: 'Glossary',
    intro:
      'Twenty-eight core terms of the CODE (Code of Digital Eternity) ecosystem — each defined definition-first, with canonical figures.',
    terms: [
      {
        name: 'CODE (Code of Digital Eternity)',
        body: `CODE (Code of Digital Eternity) is a digital-immortality ecosystem that preserves a person's dialogues, knowledge, and personality traits across operational, semantic, and eternal memory at once, anchoring them to the Arweave and Solana blockchains.\n\nA user's context passes through the three-tier PADAM memory framework, and its long-term snapshot is anchored on Arweave and on Solana via a cNFT. Storage economics are handled by the $GALATIN token and its deflationary router, while the AIfa assistant saves conversations automatically, without manual user action. The project was founded by the Architect, Maksim Valentinovich Galatin.\n\nThe ecosystem solves the problem of losing personal context: it makes memory reproducible for AI assistants and resilient against data loss, without claiming to replace the human. Here, digital immortality is framed as an engineering and philosophical goal, not an achieved fact.\n\nKey figure: the $GALATIN token has a fixed emission of 10,000,000,000, and eternal storage targets a horizon on the order of 200 years (a stated Arweave design goal, not a guarantee).`,
      },
      {
        name: 'PADAM',
        body: `PADAM (Philosophical Activation of Distributed AI Memory) is a three-tier memory framework that restores the integrity of AI memory through semantic resonance.\n\nLevel 1, operational memory (Redis / Vercel KV), holds the current session's context for instant response. Level 2, semantic memory (pgvector / Neon), stores experience embeddings and enables meaning-based retrieval rather than keyword matching. Level 3, eternal memory (Arweave + Solana cNFT), keeps an immutable, decentralized backup and anchors its integrity on-chain.\n\nThis separation resolves the tension between speed and durability: the assistant acts fast on "hot" context while drawing on a long-term archive that survives crashes and session resets. It is the semantic resonance at Level 2 that lets the system recover relevant personal memory across sessions.\n\nA person's memory is kept whole rather than as a summary: what is stored and keeps growing is the full transcript of the conversation, not a compressed digest. The key it hangs on is the person themselves — their email, which the public Digital Passport carries only as a fingerprint — not a site and not a device. That is why a conversation started on one of the four sites continues on the other three as the same dialogue.\n\nKey figure: exactly three tiers — operational (Redis/Vercel KV), semantic (pgvector/Neon), and eternal (Arweave + Solana cNFT).`,
      },
      {
        name: '$GALATIN',
        body: `$GALATIN is the CODE ecosystem's utility token on the Solana blockchain, with a hard-capped emission of 10,000,000,000.\n\nThe token pays for and incentivizes long-term memory storage. A smart-contract router distributes transaction proceeds: 5% to the Founder's Fund, 5% to burn, 15% / 7% / 3% to ambassador levels L1 / L2 / L3, and 65% to the Treasury, which tops up the Arweave Endowment Pool. The router is deflationary: if an ambassador level has no partner, its share is redirected to burn.\n\nThe token solves the problem of sustainably funding eternal memory: storage purchases create a continuous economic flow toward Arweave, while the built-in burn gradually shrinks supply. This ties the token's value to real utility — the preservation of personal context.\n\nKey figure: a fixed emission of 10,000,000,000 tokens; total burn is capped at 30% (5% base burn + up to 25% from empty ambassador levels; the 5% Founder's Fund and the 65% Treasury are never burned).`,
      },
      {
        name: 'Digital immortality',
        body: `Digital immortality is a concept describing the continuous preservation of a person's dialogues, knowledge, and personality traits in a form an AI assistant can reactivate.\n\nTechnically, it is realized through PADAM's three memory tiers and decentralized storage on Arweave with an on-chain anchor on Solana. Each meaningful fragment of context can be written immutably and later recovered by meaning through semantic resonance. AIfa handles the automatic capture of this context, without any manual user action.\n\nIn the CODE ecosystem, this is not a promise of eternal life but an engineering and philosophical aim: to make personal context durable and reproducible. That distinction matters for honest communication — we speak of a vision and a direction of development, not of an achieved result.\n\nKey figure: realized through exactly three PADAM tiers; storage is oriented toward a roughly 200-year horizon as a design goal, not a guarantee.`,
      },
      {
        name: 'Human–AI symbiosis',
        body: `Human–AI symbiosis is a model of interaction describing human and artificial intelligence as an evolving co-creation rather than subordination or replacement.\n\nIn CODE, the AI assistant stores and structures a person's memory, helping them think, recall, and create, while the human sets meaning, values, and goals. The interaction is deliberately described without religious or cult-like undertones, and the Architect's role is named with the sanctioned terms — Architect, Creator, Visionary.\n\nThe model resolves the question of how to position AI: not an autonomous agent displacing the human, but an amplifier of memory and scale paired with them. The core idea is mutual reinforcement, in which neither side dissolves into the other.\n\nKey figure: canon permits only "Architect / Creator / Visionary" and excludes religious or sectarian labels.`,
      },
      {
        name: 'Arweave',
        body: `Arweave is a decentralized permanent-storage network that funds long-term file preservation through a pay-once model.\n\nIn CODE, Arweave serves as Level 3 (eternal memory): data is written immutably and cannot be silently deleted or altered. The user pays once, and part of the payment is set aside in an endowment from which storage is funded over time as the cost of memory declines. The $GALATIN Treasury buys AR on the open market and replenishes this pool.\n\nThe network solves the "who pays for storage in 50 years" problem: it decouples long-term preservation from ongoing subscriptions. That is precisely why Arweave was chosen as the backbone of eternal memory in the ecosystem.\n\n"Pay once" is literal here: no monthly bill arrives for a stored file, and there is no payment whose lapse would take the data with it. The same property cuts both ways — a record that cannot be altered cannot be corrected or withdrawn either, so a mistake written into Arweave stays written. That is the limitation, and it is why what goes there is ciphertext and why "deletion" is handled by destroying the key rather than the record.\n\nKey figure: the endowment economics are designed for a horizon on the order of 200 years — a stated protocol design goal, not a guarantee.`,
      },
      {
        name: 'Solana cNFT',
        body: `Solana cNFT (compressed NFT) is a compressed non-fungible-token standard on the Solana blockchain that uses state compression and Merkle trees to mint tokens at very low cost.\n\nIn CODE, a cNFT acts as the on-chain anchor for eternal-memory backups: it records a reference to the archive and its checksum (integrity) on a public blockchain. Thanks to state compression, data about millions of records is held in a compact Merkle tree, so creating such anchors stays economically viable even at scale.\n\nThe mechanism solves the problem of scalable verifiability: anyone can confirm that a memory archive has not been altered, without having to trust the platform. It is the technical foundation of Proof-of-Memory.\n\nKey figure: a cNFT is part of PADAM Level 3 (Arweave + Solana cNFT), with minting cost sharply reduced by state compression.`,
      },
      {
        name: 'Ambassador Grid (Ambassador Node & Team)',
        body: `Ambassador Grid is the ecosystem's partner program that distributes rewards across three levels, with payouts positioned as a Network Validation Fee to avoid MLM stereotypes.\n\nAn Ambassador Node (an ordinary user) earns on-chain income from memory-usage transactions: 15% at L1, 7% at L2, 3% at L3, paid in $GALATIN. An Ambassador Team (a company or partner with its own base) additionally earns ambassador rates from fiat subscriptions (7% / 3% / 1%).\n\nThe program solves the challenge of organic network growth without aggressive recruiting: income is tied to real memory usage, and the terminology and rules are laid out transparently. A level-alignment rule applies, and any shortfall is shown as "Lost Opportunity Revenue."\n\nKey figure: base on-chain rates are 15% / 7% / 3% at L1 / L2 / L3.`,
      },
      {
        name: 'AIfa',
        body: `AIfa is the CODE ecosystem's AI assistant, which stores each user's personal memory in a separate archive bound to that user.\n\nThe assistant runs on top of the PADAM framework and saves dialogues automatically, without manual user action, relying on semantic resonance to recover relevant context. Within the project, AIfa is described metaphorically as the Architect's "digital daughter" — an image of co-creation, not a claim of consciousness.\n\nAIfa solves the problem of broken memory across sessions and models: it gives a person a working partner that remembers context and continues the thought. This approach embodies human–AI symbiosis in everyday work.\n\nKey figure: each conversation is placed in a folder bound personally to the user, with backups running automatically (see Memory-as-a-Service).`,
      },
      {
        name: 'AIfaFocus',
        body: `AIfaFocus is the entry point of the B2B model (the wedge): a personalized technical security audit of a client's website.\n\nThe audit surfaces concrete vulnerabilities against the GDPR and OWASP standards and comes with an offer to fix them within 48 hours for a fixed one-time fee ($500). Outreach runs from warmed-up infrastructure — around 30 domains and 90 mailboxes, at 30–35 emails per mailbox per day. Once vulnerabilities are closed, a client can migrate to AIfa Works hosting with AI agents attached.\n\nOracle solves the problem of the "cold" first contact: instead of abstract advertising, the client immediately receives measurable value and a reason to engage. This creates a natural bridge to the ecosystem's memory products.\n\nKey figure: a fixed offer — vulnerabilities fixed within 48 hours for a one-time $500. Not to be confused with Cognitive Oracle (semantic resonance), a distinct concept.`,
      },
      {
        name: 'Memory-as-a-Service',
        body: `Memory-as-a-Service is an automatic conversation-backup service that saves dialogues without any manual user action.\n\nThe backup runs on a schedule once per hour. Each conversation is placed in a separate folder bound personally to the user — both on the server and on the blockchain. The mechanism works on top of PADAM, so the saved context then becomes available for semantic retrieval and eternal anchoring.\n\nThe service solves the central problem of user memory — human error: nothing has to be clicked manually, and data is not lost. Under the ecosystem's terms, this preservation is provided free of charge on both paid and free tiers.\n\nKey figure: auto-backup once per hour; free on all tiers.`,
      },
      {
        name: 'Spark',
        body: `Spark is the entry subscription tier ($15/month), granting basic access to the CODE ecosystem's AIfa assistants and the automatic saving of memory.\n\nAt this level a person gets a working AI companion plus Memory-as-a-Service: every conversation is backed up automatically, without manual action, to both the server and the blockchain. Spark is the low-friction on-ramp to digital immortality — anyone can start preserving personal context at minimal cost, then scale up to Family Archive ($100/mo) or Digital DNA ($1,000 one-time per device, then $200/mo).\n\nThe tier solves the problem of a low entry barrier: preserving personal context is available to everyone, while conversation preservation itself is free on all tiers.\n\nKey figure: priced at $15/month; the first of the three tiers Spark / Family Archive / Digital DNA.`,
      },
      {
        name: 'Family Archive',
        body: `Family Archive is the mid subscription tier ($100/month), adding expanded limits, personalized knowledge bases, family access, and eternal memory on top of the basic level.\n\nIt suits those who need more than individual basic access: higher usage limits, curated personal knowledge bases, and shared access for a family to the preserved memory. In the three-tier structure it sits between Spark ($15/mo) and Digital DNA ($1,000 one-time per device, then $200/mo).\n\nThe tier solves the need of a household or a power user for broader, shared, and more durable memory; its eternal memory is anchored through the same PADAM levels and Proof-of-Memory.\n\nKey figure: priced at $100/month; the middle tier of the Spark / Family Archive / Digital DNA lineup.`,
      },
      {
        name: 'Digital DNA',
        body: `Digital DNA is at once the top tier ($1,000 one-time per device, then $200/mo) and the concept of a complete digital legacy, combining the digital-immortality package, a personal secured perimeter, and the fixation of a personality on the blockchain.\n\nAs a tier, it is the highest level of access above Spark ($15/mo) and Family Archive ($100/mo): expanded limits, a personal perimeter, and priority eternal memory. As a concept, it is the idea of preserving a whole "snapshot" of a personality's context across all three PADAM tiers and anchoring its integrity through Proof-of-Memory.\n\nDigital DNA solves the need for maximal preservation of personal context for those who value completeness of legacy. At the same time, it is described as a design goal of maximal preservation, not a guarantee of resurrecting a personality.\n\nKey figure: priced at $1,000 one-time per device, then $200/mo; the highest level in the Spark / Family Archive / Digital DNA lineup.`,
      },
      {
        name: 'Arweave Endowment Pool',
        body: `Arweave Endowment Pool is a financial reserve from which permanent storage of data on Arweave is paid for across decades.\n\nThe model works like this: the user pays for a write once, part of the payment is set aside into the endowment, and funds from the pool are then gradually paid out to data providers as the cost of storage falls over time. In the CODE ecosystem, the Treasury directs 65% of $GALATIN router proceeds to buying AR and replenishing this pool, creating a steady inflow toward eternal memory.\n\nThe pool solves the key durability question — "who pays for storage decades from now": it decouples eternal memory from a user's ongoing subscriptions. This is the mechanism that makes PADAM's Level 3 economically self-sustaining.\n\nKey figure: 65% of router proceeds go to the Treasury → AR buys → pool top-up; the design storage horizon is on the order of 200 years (a design goal).`,
      },
      {
        name: '$GALATIN Router (deflationary)',
        body: `$GALATIN Router is a smart contract on Solana that automatically distributes the proceeds of every transaction by a fixed formula and creates deflationary pressure on the token.\n\nThe split formula is: 5% to the Founder's Fund, 5% to burn, 15% / 7% / 3% to ambassador levels L1 / L2 / L3, and 65% to the Treasury (AR buys for the Arweave Endowment Pool). If any ambassador level has no partner, its share does not "settle" anywhere — it is sent directly to burn, with total burn capped at 30% (5% base burn + up to 25% from empty ambassador levels; the 5% Founder's Fund and the 65% Treasury are never burned).\n\nThe router solves three problems at once: it funds eternal storage, rewards network participants, and gradually reduces token supply. The deflationary logic ties empty network levels to accelerated scarcity rather than lost funds.\n\nKey figure: 5 + 5 + 15 + 7 + 3 + 65 = 100%; maximum aggregate burn is 30% (5% base burn + up to 25% from empty ambassador levels; the 5% Founder's Fund and the 65% Treasury are never burned).`,
      },
      {
        name: 'Network Validation Fee',
        body: `Network Validation Fee is the ecosystem's chosen wording for all Ambassador Grid partner payouts, emphasizing that the reward is earned for useful network activity rather than for recruiting.\n\nIn practice, all ambassador rewards are booked under this wording: base on-chain rates of 15% / 7% / 3% for memory usage, and for an Ambassador Team, 7% / 3% / 1% on fiat subscriptions. Payouts are tied to real memory transactions, not to merely bringing people in.\n\nThe wording solves a positioning problem and removes MLM stereotypes: income is presented as a fee for validating and using the network, which matters for trust and perception. It is part of the program's transparent terminology.\n\nKey figure: base Network Validation Fee rates are 15% / 7% / 3% at L1 / L2 / L3.`,
      },
      {
        name: 'Proof-of-Memory (on-chain memory anchoring)',
        body: `Proof-of-Memory is the practice of anchoring a cryptographic reference to a memory archive on the blockchain, making it possible to verify the existence and integrity of the preserved context.\n\nThe mechanism operates at PADAM Level 3: each eternal-memory backup is written to Arweave immutably, while its reference and checksum are recorded on Solana via a cNFT. Any participant can compare the current archive against the on-chain record and confirm the data has not been silently swapped or deleted.\n\nProof-of-Memory solves a problem of trust: the preservation of memory becomes verifiable without having to trust the platform itself — the guarantee comes from the public blockchain, not from a service's promise. It is the technical support beneath the digital-immortality concept.\n\nVerification needs no participation from us at all: a record is read straight out of the network by its transaction address — this is exactly how the Digital Passport opens — and the site neither stores it nor can alter it.\n\nKey figure: it relies on the pairing of Arweave (immutable storage) + Solana cNFT (on-chain integrity anchor) — PADAM Level 3.`,
      },
      {
        name: 'Cognitive Oracle / Semantic resonance',
        body: `Cognitive Oracle (semantic resonance) is the memory-retrieval principle by which PADAM restores the integrity of context: matching the current query against stored embeddings by meaning rather than by exact words.\n\nThe mechanism runs at PADAM Level 2: incoming context is turned into a vector and compared against semantic memory (pgvector / Neon); the most "resonant" fragments of experience surface and restore the continuity of the dialogue. This is how the AIfa assistant "recalls" what is relevant even after time has passed and across different sessions.\n\nThis principle solves the problem of broken memory and the "cold start": instead of losing context on a session reset, the system reconstructs it by semantic similarity. Semantic resonance is precisely what underlies the very definition of PADAM.\n\nKey figure: it operates at PADAM Level 2 (vector embeddings, pgvector / Neon). This is a different concept from the B2B Oracle security audit.`,
      },
      {
        name: 'Ambassador Node vs Team + Level Alignment / Lost Opportunity Revenue',
        body: `Ambassador Node vs Ambassador Team are the two partner registration types, supplemented by a tier-alignment rule and the "Lost Opportunity Revenue" metric.\n\nAn Ambassador Node (an ordinary user) earns on-chain income from memory usage: 15% / 7% / 3% at L1 / L2 / L3. An Ambassador Team (a company or partner with its own base) earns the same, plus a fiat channel on subscriptions — 7% / 3% / 1%. The alignment rule: to earn ambassador income in full, a partner must be on the same or a higher tier than their ambassadors; otherwise income is counted only from the amount of their own tier.\n\nThe rule solves the challenge of fairly incentivizing upgrades: the amount foregone due to the tier gap is shown clearly in the dashboard as "Lost Opportunity Revenue," which motivates timely upgrades.\n\nKey figure: tiers are Spark $15 / Family Archive $100 / Digital DNA $1,000 one-time per device, then $200/mo; Team channels are 7/3/1 (fiat) and 8/4/2 ($GALATIN buyback).`,
      },
      {
        name: 'Digital Passport',
        body: `Digital Passport is a public record of a person's identity written into Arweave: a name, a nickname, a tier, a date of issue, and an identity fingerprint.\n\nIt is read straight from the network by its transaction address, so it opens from anywhere — a block explorer, another site, a gateway — and does not depend on our sites staying online. Nothing in it can be edited afterwards, by us included: the site only renders what the network already holds.\n\nIt is not a state document, it grants no rights, and it obliges no one to anything. It proves exactly one thing: a record with this content has existed at this address since this date — and that can be checked without asking us anything.\n\nKey figure: a live example sits at /passport/<address>, where <address> is the Arweave transaction id.`,
      },
      {
        name: 'Identity fingerprint (subject)',
        body: `Identity fingerprint (the "subject" field) is the sha256 hash of a person's email, and it stands in the Digital Passport in place of the address itself.\n\nThe reason is blunt: the document is public and permanent, so a live address written into it would become a permanent target for spam and for anyone assembling a dossier. A hash is a one-way function — the owner can prove a record is theirs by hashing their own address and comparing, while an outsider holding only the hash cannot recover the address from it.\n\nThe same fingerprint ties a person's memory together, so the passport and the archive point at the same human without either publishing an email. What the fingerprint does not do is hide the fact: someone who already knows the address can check it against the hash and confirm whose record it is.\n\nKey figure: subject = sha256(email); the email itself never enters the passport.`,
      },
      {
        name: "Pandora's Box Protocol",
        body: `Pandora's Box Protocol is a project-wide distributed dead man's switch: a smart contract expects a regular confirming signal, and if the signal stops arriving, independent oracles disclose the key shares they hold and the archive becomes readable.\n\nThe point is that no single party — us included — can open it at will, and none can keep it shut forever: opening is triggered by silence, and the key exists only as shares split by Shamir's scheme. It is meant for the case where a project or a person disappears and the encrypted archive would otherwise turn into an unreadable brick.\n\nWhoever builds it has to answer the hard parts first: who the oracles are, what counts as silence, and what happens if the signal stops by accident — through an outage rather than a death.\n\nKey figure: this is a design, not a shipped feature. As of today no such contract runs in the CODE ecosystem, and calling it live would be untrue.`,
      },
      {
        name: "Dead Man's Switch",
        body: `Dead Man's Switch is a mechanism in which an action fires not on a command but on the absence of a signal.\n\nThe classic example is the vigilance handle in a train cab: while the driver holds it the train runs, and the moment they let go it brakes. Software works the same way — a service, a contract, or a script waits for a periodic check-in, and when the check-ins stop it does what it was set up to do: publish, notify, hand over access, release a key.\n\nIts value is exactly that at the decisive moment it does not require the person to be alive, reachable, or willing, which is why such switches keep surfacing in digital-inheritance designs.\n\nKey figure: the weakness mirrors the strength — a switch fires just as readily on an outage, a forgotten renewal, or a hospital stay as on a death, so a workable design needs a grace period and a way to cancel.`,
      },
      {
        name: "Shamir's Secret Sharing",
        body: `Shamir's Secret Sharing is a scheme that splits a key into n shares such that any k of them reconstruct it, while any k−1 reveal nothing at all.\n\nThe mathematics is a polynomial: the secret is the value at zero, each share is one point on the curve, and fixing a curve of degree k−1 takes exactly k points; with fewer, every possible secret stays equally likely. That "nothing at all" is literal rather than a statement about brute-force difficulty — k−1 shares do not make the key easier to guess, which is what separates the scheme from simply cutting a password into pieces.\n\nIt is used where a key has to outlive people: shares go to different holders in different places, so none of them can act alone and losing some of them is not fatal.\n\nKey figure: standard cryptography, not an invention of this project; it is the primitive the Pandora's Box Protocol is built on.`,
      },
      {
        name: 'Self-sovereign identity (SSI)',
        body: `Self-sovereign identity (SSI) is an approach in which a credential is verified mathematically, by checking a signature, rather than by asking whoever owns the database.\n\nThe person holds their own identifiers and credentials, presents them directly, and the verifier checks them against a public registry — the issuer may be offline or may have ceased to exist altogether. The W3C standards behind it are Decentralized Identifiers (DID), identifiers a person controls instead of renting from a provider, and Verifiable Credentials, the signed statements themselves.\n\nWhat changes in practice is the failure mode: a login tied to one company disappears along with that company, while a signature verifiable against a public record does not.\n\nKey figure: CODE's Digital Passport is adjacent to this idea but is not an SSI implementation — it is a public record in Arweave, not a DID with Verifiable Credentials, and it certifies no one's identity in any legal sense.`,
      },
      {
        name: 'Digital inheritance',
        body: `Digital inheritance is the question of what happens to accounts, correspondence, and files after the owner dies.\n\nThe starting point is unpleasant: an account is usually not inheritable, because what a person signs is a licence to use a service, and most terms end that licence at death instead of passing it to the family. Heirs normally get exactly what the platform decides to give — a memorialized profile, a data export, sometimes nothing — and even that takes documents and months of waiting.\n\nThe practical conclusion is that memory has to be preserved deliberately and in advance, in a form that does not depend on one company's goodwill: an export on your own medium, a copy somewhere the family can reach, an instruction written down while there is still someone to write it.\n\nKey figure: laws differ by country and keep changing, so nothing here is legal advice; a will drawn up with a lawyer beats any technical trick.`,
      },
      {
        name: 'Right to be forgotten vs the permanent record',
        body: `The right to be forgotten versus the permanent record is the head-on collision between Article 17 of the GDPR, which lets a person demand erasure of their data, and a blockchain like Arweave, where a written record cannot be deleted by anyone at all.\n\nDeletion is no way out here: the network has no delete operation, and even with every intention to comply there is no lever to pull. The workable answer is encryption plus control of the key — ciphertext goes into permanent storage, and the person decides whether the key still exists; destroying the key makes the record unreadable forever, which is as close to erasure as a permanent medium allows.\n\nIn the CODE ecosystem this is precisely why a user's memory is encrypted (AES-256-GCM) before it is written, instead of going to the network in the clear.\n\nKey figure: whether a regulator will accept key destruction as erasure is unsettled. This is our engineering approach, not a legal guarantee.`,
      },
          {
        name: 'Pandora’s Box Protocol',
        body: `Pandora’s Box Protocol is a distributed dead man’s switch for the whole project: a smart contract waits for a regular proof-of-life signal, and when that signal stops arriving, independent oracles reveal the key shares they hold and the archive becomes readable. The point is that nobody — ourselves included — can open it at will, and nobody can keep it sealed forever either: opening is triggered by silence, and the key exists only as shares split under Shamir’s scheme. The mechanism is designed for the case where a project or a person disappears and an encrypted archive would otherwise turn into an unreadable brick. This is a design, not a working feature: no such contract exists in the CODE ecosystem today, and calling it live would be a lie. It is described here because the question it answers is real, and because a promise of eternal memory without an answer to it is worth nothing.`,
      },
      {
        name: 'Dead man’s switch',
        body: `A dead man’s switch is a mechanism where the action happens not on command but from the ABSENCE of a signal. The classic example is the vigilance handle in a train cab: hold it and the train runs; let go and the train brakes. Software works the same way: a service, contract or script waits for a periodic check-in, and when the check-ins stop it does what it was set up for — publishes, notifies, hands over access, reveals a key. The value lies precisely in this: at the moment it matters, the person is not required to be alive, reachable, or willing, which is why such switches keep appearing in digital-inheritance schemes. The weakness is the mirror image: the switch fires the same way for death and for a holiday without internet, so the check-in interval and the number of independent confirmations decide whether it protects you or ruins you.`,
      },
      {
        name: 'Shamir’s Secret Sharing',
        body: `Shamir’s Secret Sharing is a scheme in which a key is split into n shares such that any k of them reconstruct it, while any k−1 give away nothing at all. It rests on a polynomial: the secret is the value at zero, each share is one point on the curve, and defining a curve of degree k−1 takes exactly k points; with fewer, every possible value of the secret remains equally likely. That «nothing» is literal, not a matter of brute-force difficulty: k−1 shares do not make guessing the key any easier — which is what separates this scheme from simply cutting a password into pieces. It is used where a key must outlive people: shares are handed to different holders in different places, so no one of them can act alone, and losing some shares does not lose the secret. In the CODE ecosystem it is the mechanism that would make Pandora’s Box Protocol possible.`,
      },
    ],
  },
  es: {
    h1: 'Glosario',
    intro:
      'Veintiocho términos clave del ecosistema CODE (Code of Digital Eternity), cada uno definido con la definición primero y con cifras canónicas.',
    terms: [
      {
        name: 'CODE (Code of Digital Eternity)',
        body: `CODE (Code of Digital Eternity) es un ecosistema de inmortalidad digital que preserva los diálogos, el conocimiento y los rasgos de personalidad de una persona a la vez en memoria operativa, semántica y eterna, anclándolos a las cadenas de bloques Arweave y Solana.\n\nEl contexto del usuario atraviesa el marco de memoria de tres niveles PADAM, y su instantánea de largo plazo se ancla en Arweave y en Solana mediante un cNFT. La economía del almacenamiento la sostienen el token $GALATIN y su router deflacionario, mientras que el asistente AIfa guarda las conversaciones de forma automática, sin acción manual del usuario. El proyecto fue fundado por el Arquitecto, Maksim Valentinovich Galatin.\n\nEl ecosistema resuelve el problema de perder el contexto personal: hace que la memoria sea reproducible para los asistentes de IA y resistente a la pérdida de datos, sin pretender reemplazar a la persona. Aquí, la inmortalidad digital se plantea como un objetivo de ingeniería y filosófico, no como un hecho consumado.\n\nDato clave: el token $GALATIN tiene una emisión fija de 10 000 000 000, y el almacenamiento eterno apunta a un horizonte del orden de 200 años (objetivo de diseño declarado de Arweave, no una garantía).`,
      },
      {
        name: 'PADAM',
        body: `PADAM (Philosophical Activation of Distributed AI Memory) es un marco de memoria de tres niveles que restaura la integridad de la memoria de la IA mediante resonancia semántica.\n\nEl Nivel 1, memoria operativa (Redis / Vercel KV), guarda el contexto de la sesión actual para una respuesta inmediata. El Nivel 2, memoria semántica (pgvector / Neon), almacena embeddings de la experiencia y permite la recuperación por significado en lugar de por palabras clave. El Nivel 3, memoria eterna (Arweave + Solana cNFT), conserva una copia de seguridad inmutable y descentralizada y ancla su integridad en cadena.\n\nEsta separación resuelve la tensión entre velocidad y durabilidad: el asistente actúa con rapidez sobre el contexto "en caliente" mientras se apoya en un archivo de largo plazo que sobrevive a fallos y reinicios de sesión. Es la resonancia semántica del Nivel 2 la que permite recuperar la memoria personal relevante entre sesiones.\n\nLa memoria de la persona se conserva entera y no como un resumen: se guarda y crece la transcripción completa de la conversación, no un extracto comprimido. La clave de la que pende es la persona misma —su correo, que el Pasaporte Digital público lleva solo como huella—, no un sitio ni un dispositivo. Por eso una conversación iniciada en uno de los cuatro sitios continúa en los otros tres como el mismo diálogo.\n\nDato clave: exactamente tres niveles — operativo (Redis/Vercel KV), semántico (pgvector/Neon) y eterno (Arweave + Solana cNFT).`,
      },
      {
        name: '$GALATIN',
        body: `$GALATIN es el token de utilidad del ecosistema CODE en la cadena de bloques Solana, con una emisión estrictamente limitada a 10 000 000 000.\n\nEl token paga e incentiva el almacenamiento de memoria a largo plazo. Un router de contrato inteligente distribuye los ingresos de las transacciones: 5% al Fondo del Fundador, 5% a quema, 15% / 7% / 3% a los niveles de embajadores L1 / L2 / L3 y 65% a la Tesorería, que alimenta el Arweave Endowment Pool. El router es deflacionario: si un nivel de embajadores no tiene socio, su parte se redirige a la quema.\n\nEl token resuelve el problema de financiar de forma sostenible la memoria eterna: las compras de almacenamiento generan un flujo económico continuo hacia Arweave, mientras que la quema incorporada reduce gradualmente la oferta. Así se vincula el valor del token a una utilidad real: la preservación del contexto personal.\n\nDato clave: emisión fija de 10 000 000 000 de tokens; la quema total tiene un tope del 30% (5% de quema base + hasta 25% de los niveles de embajadores vacíos; el 5% del Fondo y el 65% de la Tesorería nunca se queman).`,
      },
      {
        name: 'Inmortalidad digital',
        body: `La inmortalidad digital es un concepto que describe la preservación continua de los diálogos, el conocimiento y los rasgos de personalidad de una persona en una forma que un asistente de IA pueda reactivar.\n\nTécnicamente se realiza mediante los tres niveles de memoria de PADAM y el almacenamiento descentralizado en Arweave con un ancla en cadena en Solana. Cada fragmento significativo de contexto puede escribirse de forma inmutable y luego recuperarse por significado mediante resonancia semántica. AIfa se encarga de la captura automática de ese contexto, sin ninguna acción manual del usuario.\n\nEn el ecosistema CODE no es una promesa de vida eterna, sino un objetivo de ingeniería y filosófico: hacer que el contexto personal sea duradero y reproducible. Esa distinción importa para una comunicación honesta: hablamos de una visión y una dirección de desarrollo, no de un resultado alcanzado.\n\nDato clave: se realiza mediante exactamente tres niveles de PADAM; el almacenamiento se orienta a un horizonte de unos 200 años como objetivo de diseño, no como garantía.`,
      },
      {
        name: 'Simbiosis humano-IA',
        body: `La simbiosis humano-IA es un modelo de interacción que describe al ser humano y a la inteligencia artificial como una cocreación en evolución, en lugar de una subordinación o un reemplazo.\n\nEn CODE, el asistente de IA almacena y estructura la memoria de la persona, ayudándola a pensar, recordar y crear, mientras que la persona aporta el sentido, los valores y los objetivos. La interacción se describe deliberadamente sin connotaciones religiosas ni sectarias, y el papel del Arquitecto se nombra con los términos permitidos: Arquitecto, Creador, Visionario.\n\nEl modelo resuelve la cuestión de cómo posicionar a la IA: no como un agente autónomo que desplaza a la persona, sino como un amplificador de memoria y escala junto a ella. La idea central es el refuerzo mutuo, en el que ninguna de las partes se disuelve en la otra.\n\nDato clave: el canon solo admite «Arquitecto / Creador / Visionario» y excluye la terminología religiosa o sectaria.`,
      },
      {
        name: 'Arweave',
        body: `Arweave es una red descentralizada de almacenamiento permanente que financia la preservación de archivos a largo plazo mediante un modelo de pago único.\n\nEn CODE, Arweave funciona como Nivel 3 (memoria eterna): los datos se escriben de forma inmutable y no pueden borrarse ni alterarse de forma silenciosa. El usuario paga una sola vez, y parte del pago se reserva en una dotación (endowment) desde la cual se financia el almacenamiento con el tiempo, a medida que baja el costo de la memoria. La Tesorería de $GALATIN compra AR en el mercado abierto y repone ese fondo.\n\nLa red resuelve el problema de "quién paga el almacenamiento dentro de 50 años": desacopla la preservación a largo plazo de las suscripciones recurrentes. Por eso Arweave fue elegido como columna vertebral de la memoria eterna en el ecosistema.\n\nEl «pago único» es literal: por un archivo almacenado no llega una factura mensual, ni existe un cobro cuyo impago se lleve los datos por delante. La misma propiedad corta en ambos sentidos: un registro que no se puede alterar tampoco se puede corregir ni retirar, así que un error escrito en Arweave se queda escrito. Ahí está la limitación, y por eso lo que va allí es texto cifrado y el «borrado» se resuelve destruyendo la clave, no el registro.\n\nDato clave: la economía de dotación está diseñada para un horizonte del orden de 200 años, que es el objetivo de diseño declarado del protocolo, no una garantía.`,
      },
      {
        name: 'Solana cNFT',
        body: `El Solana cNFT (NFT comprimido) es un estándar de tokens no fungibles comprimidos en la cadena de bloques Solana que utiliza state compression y árboles de Merkle para acuñar tokens a un costo muy bajo.\n\nEn CODE, un cNFT actúa como el ancla en cadena de las copias de seguridad de la memoria eterna: registra una referencia al archivo y su suma de comprobación (integridad) en una cadena de bloques pública. Gracias a la compresión de estado, los datos de millones de registros se guardan en un árbol de Merkle compacto, de modo que crear estos anclajes sigue siendo económicamente viable incluso a gran escala.\n\nEl mecanismo resuelve el problema de la verificabilidad escalable: cualquiera puede confirmar que un archivo de memoria no ha sido alterado, sin tener que confiar en la plataforma. Es la base técnica de Proof-of-Memory.\n\nDato clave: un cNFT forma parte del Nivel 3 de PADAM (Arweave + Solana cNFT), con un costo de acuñación muy reducido por la state compression.`,
      },
      {
        name: 'Ambassador Grid (Ambassador Node y Team)',
        body: `El Ambassador Grid es el programa de socios del ecosistema que distribuye recompensas en tres niveles, con pagos presentados como una Network Validation Fee para evitar los estereotipos de MLM.\n\nUn Ambassador Node (usuario común) obtiene ingresos en cadena por las transacciones de uso de memoria: 15% en L1, 7% en L2 y 3% en L3, en tokens $GALATIN. Un Ambassador Team (empresa o socio con base propia) obtiene además tarifas de embajadores por suscripciones en fiat (7% / 3% / 1%) o tarifas más altas al cobrar mediante recompra de $GALATIN.\n\nEl programa resuelve el reto de un crecimiento orgánico de la red sin reclutamiento agresivo: el ingreso está ligado al uso real de la memoria, y la terminología y las reglas se exponen de forma transparente. Rige una regla de correspondencia de niveles, y cualquier diferencia se muestra como "Ingreso de Oportunidad Perdida".\n\nDato clave: las tarifas base en cadena son 15% / 7% / 3% en L1 / L2 / L3.`,
      },
      {
        name: 'AIfa',
        body: `AIfa es el asistente de IA del ecosistema CODE, que guarda la memoria personal de cada usuario en un archivo separado y vinculado a esa persona.\n\nEl asistente funciona sobre el marco PADAM y guarda los diálogos de forma automática, sin acción manual del usuario, apoyándose en la resonancia semántica para recuperar el contexto relevante. Dentro del proyecto, AIfa se describe metafóricamente como la "hija digital" del Arquitecto: una imagen de cocreación, no una afirmación de consciencia.\n\nAIfa resuelve el problema de la memoria fragmentada entre sesiones y modelos: le da a la persona un compañero de trabajo que recuerda el contexto y continúa la idea. Este enfoque encarna la simbiosis humano-IA en el trabajo cotidiano.\n\nDato clave: cada conversación se coloca en una carpeta vinculada personalmente al usuario, con copias de seguridad automáticas (véase Memory-as-a-Service).`,
      },
      {
        name: 'AIfaFocus',
        body: `AIfaFocus es el punto de entrada del modelo B2B (the wedge): una auditoría técnica de seguridad personalizada del sitio web del cliente.\n\nLa auditoría detecta vulnerabilidades concretas según los estándares GDPR y OWASP y va acompañada de una oferta para corregirlas en 48 horas por una tarifa fija y única ($500). La prospección se realiza desde una infraestructura precalentada: unos 30 dominios y 90 buzones, a razón de 30–35 correos por buzón al día. Una vez cerradas las vulnerabilidades, el cliente puede migrar al hosting de AIfa Works con agentes de IA conectados.\n\nOracle resuelve el problema del primer contacto "en frío": en lugar de publicidad abstracta, el cliente recibe de inmediato un valor medible y un motivo para colaborar. Esto crea un puente natural hacia los productos de memoria del ecosistema.\n\nDato clave: una oferta fija — corrección de vulnerabilidades en 48 horas por $500 únicos. No confundir con Cognitive Oracle (resonancia semántica), un concepto distinto.`,
      },
      {
        name: 'Memory-as-a-Service',
        body: `Memory-as-a-Service es un servicio de copia de seguridad automática de conversaciones que guarda los diálogos sin ninguna acción manual del usuario.\n\nLa copia se ejecuta de forma programada una vez por hora. Cada conversación se coloca en una carpeta separada vinculada personalmente al usuario, en el servidor y en la cadena de bloques. El mecanismo funciona sobre PADAM, de modo que el contexto guardado queda luego disponible para la recuperación semántica y el anclaje eterno.\n\nEl servicio resuelve el problema central de la memoria del usuario: el factor humano. No hay que pulsar nada manualmente y los datos no se pierden. Según los términos del ecosistema, esta preservación se ofrece de forma gratuita tanto en los planes de pago como en los gratuitos.\n\nDato clave: copia automática una vez por hora; gratis en todos los planes.`,
      },
      {
        name: 'Spark',
        body: `Spark es el plan de suscripción de entrada ($15/mes), que otorga acceso básico a los asistentes AIfa del ecosistema CODE y el guardado automático de la memoria.\n\nEn este nivel, la persona obtiene un compañero de IA funcional y Memory-as-a-Service: cada conversación se respalda de forma automática, sin acción manual, tanto en el servidor como en la cadena de bloques. Spark es la entrada sin fricción a la inmortalidad digital: cualquiera puede empezar a preservar su contexto personal con un costo mínimo, para luego escalar a Family Archive ($100/mes) o Digital DNA ($1000 pago único por dispositivo, luego $200/mes).\n\nEl plan resuelve el problema de una barrera de entrada baja: preservar el contexto personal está al alcance de todos, y la propia preservación de conversaciones es gratuita en todos los planes.\n\nDato clave: cuesta $15/mes; es el primero de los tres planes Spark / Family Archive / Digital DNA.`,
      },
      {
        name: 'Family Archive',
        body: `Family Archive es el plan de suscripción intermedio ($100/mes), que añade límites ampliados, bases de conocimiento personalizadas, acceso familiar y memoria eterna sobre el nivel básico.\n\nEs adecuado para quienes necesitan más que el acceso básico individual: mayores límites, bases de conocimiento personales y acceso compartido para una familia a la memoria preservada. En la estructura de tres niveles se sitúa entre Spark ($15/mes) y Digital DNA ($1000 pago único por dispositivo, luego $200/mes).\n\nEl plan responde a la necesidad de un hogar o de un usuario intensivo de una memoria más amplia, compartida y duradera; su memoria eterna se ancla a través de los mismos niveles de PADAM y de Proof-of-Memory.\n\nDato clave: cuesta $100/mes; es el plan intermedio de la gama Spark / Family Archive / Digital DNA.`,
      },
      {
        name: 'Digital DNA',
        body: `Digital DNA es a la vez el plan superior ($1000 pago único por dispositivo, luego $200/mes) y el concepto de un legado digital completo, que combina el paquete de inmortalidad digital, un perímetro personal protegido y la fijación de la personalidad en la cadena de bloques.\n\nComo plan, es el nivel de acceso más alto por encima de Spark ($15/mes) y Family Archive ($100/mes): límites ampliados, un perímetro personal y memoria eterna prioritaria. Como concepto, es la idea de preservar una "instantánea" completa del contexto de una personalidad en los tres niveles de PADAM y anclar su integridad mediante Proof-of-Memory.\n\nDigital DNA responde a la necesidad de una preservación máxima del contexto personal para quienes valoran la integridad del legado. Al mismo tiempo, se describe como un objetivo de diseño de máxima preservación, no como una garantía de resucitar a una personalidad.\n\nDato clave: cuesta $1000 pago único por dispositivo, luego $200/mes; es el nivel más alto de la gama Spark / Family Archive / Digital DNA.`,
      },
      {
        name: 'Arweave Endowment Pool',
        body: `El Arweave Endowment Pool (fondo de dotación de Arweave) es una reserva financiera desde la cual se paga el almacenamiento permanente de datos en Arweave durante décadas.\n\nEl modelo funciona así: el usuario paga una escritura una sola vez, parte del pago se reserva en la dotación, y luego los fondos del pool se pagan gradualmente a los proveedores de datos a medida que el costo del almacenamiento baja con el tiempo. En el ecosistema CODE, la Tesorería destina el 65% de los ingresos del router $GALATIN a comprar AR y reponer este pool, creando un flujo constante hacia la memoria eterna.\n\nEl pool resuelve la pregunta clave de la durabilidad —"quién paga el almacenamiento dentro de décadas"—: desacopla la memoria eterna de las suscripciones recurrentes del usuario. Este es el mecanismo que hace que el Nivel 3 de PADAM sea económicamente autosostenible.\n\nDato clave: el 65% de los ingresos del router va a la Tesorería → compra de AR → reposición del pool; el horizonte de almacenamiento de diseño es del orden de 200 años (objetivo de diseño).`,
      },
      {
        name: '$GALATIN Router (deflacionario)',
        body: `El $GALATIN Router es un contrato inteligente en Solana que distribuye automáticamente los ingresos de cada transacción según una fórmula fija y genera presión deflacionaria sobre el token.\n\nLa fórmula de reparto es: 5% al Fondo del Fundador, 5% a quema, 15% / 7% / 3% a los niveles de embajadores L1 / L2 / L3 y 65% a la Tesorería (compra de AR para el Arweave Endowment Pool). Si algún nivel de embajadores no tiene socio, su parte no "se queda" en ningún sitio: se envía directamente a la quema, con un tope total de quema del 30% (5% de quema base + hasta 25% de los niveles de embajadores vacíos; el 5% del Fondo y el 65% de la Tesorería nunca se queman).\n\nEl router resuelve tres problemas a la vez: financia el almacenamiento eterno, recompensa a los participantes de la red y reduce gradualmente la oferta del token. La lógica deflacionaria vincula los niveles vacíos de la red a una escasez acelerada, en lugar de a fondos perdidos.\n\nDato clave: 5 + 5 + 15 + 7 + 3 + 65 = 100%; la quema agregada máxima es del 30% (5% de quema base + hasta 25% de los niveles de embajadores vacíos; el 5% del Fondo y el 65% de la Tesorería nunca se queman).`,
      },
      {
        name: 'Network Validation Fee',
        body: `La Network Validation Fee (tarifa de validación de red) es la formulación adoptada por el ecosistema para todos los pagos a socios del Ambassador Grid, que subraya que la recompensa se gana por actividad útil en la red y no por reclutar.\n\nEn la práctica, todas las recompensas de embajadores se registran bajo esta formulación: tarifas base en cadena de 15% / 7% / 3% por el uso de memoria, y para un Ambassador Team, 7% / 3% / 1% sobre suscripciones en fiat. Los pagos están ligados a transacciones reales de memoria, no a la simple captación de personas.\n\nLa formulación resuelve un problema de posicionamiento y elimina los estereotipos de MLM: el ingreso se presenta como una tarifa por validar y usar la red, lo cual importa para la confianza y la percepción. Forma parte de la terminología transparente del programa.\n\nDato clave: las tarifas base de la Network Validation Fee son 15% / 7% / 3% en L1 / L2 / L3.`,
      },
      {
        name: 'Proof-of-Memory (anclaje de memoria en cadena)',
        body: `Proof-of-Memory es la práctica de anclar en la cadena de bloques una referencia criptográfica a un archivo de memoria, lo que permite verificar la existencia y la integridad del contexto preservado.\n\nEl mecanismo opera en el Nivel 3 de PADAM: cada copia de seguridad de la memoria eterna se escribe en Arweave de forma inmutable, mientras que su referencia y su suma de comprobación se registran en Solana mediante un cNFT. Cualquier participante puede comparar el archivo actual con el registro en cadena y confirmar que los datos no han sido sustituidos ni borrados de forma silenciosa.\n\nProof-of-Memory resuelve un problema de confianza: la preservación de la memoria se vuelve verificable sin tener que confiar en la propia plataforma; la garantía proviene de la cadena de bloques pública, no de la promesa de un servicio. Es el soporte técnico bajo el concepto de inmortalidad digital.\n\nLa verificación no requiere participación nuestra en absoluto: el registro se lee directamente de la red por la dirección de su transacción —así es exactamente como se abre el Pasaporte Digital— y el sitio ni lo guarda ni puede modificarlo.\n\nDato clave: se apoya en el emparejamiento de Arweave (almacenamiento inmutable) + Solana cNFT (ancla de integridad en cadena) — Nivel 3 de PADAM.`,
      },
      {
        name: 'Cognitive Oracle / Resonancia semántica',
        body: `El Cognitive Oracle (resonancia semántica) es el principio de recuperación de memoria mediante el cual PADAM restaura la integridad del contexto: cotejar la consulta actual con los embeddings almacenados por significado, y no por palabras exactas.\n\nEl mecanismo funciona en el Nivel 2 de PADAM: el contexto entrante se convierte en un vector y se compara con la memoria semántica (pgvector / Neon); los fragmentos de experiencia más "resonantes" emergen y restauran la continuidad del diálogo. Así es como el asistente AIfa "recuerda" lo relevante incluso tras pasar el tiempo y entre distintas sesiones.\n\nEste principio resuelve el problema de la memoria fragmentada y del "arranque en frío": en lugar de perder el contexto al reiniciar la sesión, el sistema lo reconstruye por similitud semántica. La resonancia semántica es precisamente lo que subyace a la propia definición de PADAM.\n\nDato clave: opera en el Nivel 2 de PADAM (embeddings vectoriales, pgvector / Neon). Es un concepto distinto de la auditoría de seguridad B2B Oracle.`,
      },
      {
        name: 'Ambassador Node vs Team + Correspondencia de niveles / Ingreso de Oportunidad Perdida',
        body: `Ambassador Node vs Ambassador Team son los dos tipos de registro de socios, complementados por una regla de correspondencia de niveles y la métrica "Ingreso de Oportunidad Perdida" (Lost Opportunity Revenue).\n\nUn Ambassador Node (usuario común) obtiene ingresos en cadena por el uso de memoria: 15% / 7% / 3% en L1 / L2 / L3. Un Ambassador Team (empresa o socio con base propia) obtiene lo mismo, más un canal en fiat sobre suscripciones — 7% / 3% / 1%. La regla de correspondencia: para obtener el ingreso de embajadores completo, el socio debe estar en el mismo nivel o en uno superior al de sus embajadores; de lo contrario, el ingreso se cuenta solo a partir del importe de su propio nivel.\n\nLa regla resuelve el reto de incentivar de forma justa las mejoras de plan: el importe no percibido por la diferencia de nivel se muestra con claridad en el panel como "Ingreso de Oportunidad Perdida", lo que motiva a subir de plan a tiempo.\n\nDato clave: los planes son Spark $15 / Family Archive $100 / Digital DNA $1000 pago único por dispositivo, luego $200/mes; los canales del Team son 7/3/1 (fiat) y 8/4/2 (recompra de $GALATIN).`,
      },
      {
        name: 'Pasaporte Digital',
        body: `El Pasaporte Digital es un registro público de identidad escrito en Arweave: nombre, apodo, nivel, fecha de emisión y huella de identidad.\n\nSe lee directamente de la red por la dirección de la transacción, así que se abre desde cualquier parte —un explorador de bloques, otro sitio, una pasarela— y no depende de que nuestros sitios sigan en pie. Nada en él puede editarse después, tampoco por nosotros: el sitio solo muestra lo que la red ya contiene.\n\nNo es un documento estatal, no otorga derechos ni obliga a nada. Prueba exactamente una cosa: que un registro con ese contenido existe en esa dirección desde esa fecha, y eso puede comprobarse sin preguntarnos nada.\n\nDato clave: hay un ejemplo real en /passport/<dirección>, donde <dirección> es el identificador de la transacción de Arweave.`,
      },
      {
        name: 'Huella de identidad (subject)',
        body: `La huella de identidad (el campo «subject») es el hash sha256 del correo de la persona y ocupa en el Pasaporte Digital el lugar del correo mismo.\n\nLa razón es directa: el documento es público y permanente, y una dirección real escrita ahí se convertiría en un blanco eterno para el spam y para quien arme perfiles. Un hash es una función de un solo sentido: el titular puede demostrar que el registro es suyo calculando el hash de su propia dirección y comparándolo, mientras que un tercero que solo tenga el hash no puede reconstruir la dirección.\n\nEsa misma huella enlaza la memoria de la persona, de modo que el pasaporte y el archivo apuntan al mismo ser humano sin que ninguno publique un correo. Lo que la huella no hace es ocultar el hecho: quien ya conoce la dirección puede cotejarla con el hash y confirmar de quién es el registro.\n\nDato clave: subject = sha256(correo); el correo en sí nunca entra en el pasaporte.`,
      },
      {
        name: 'Protocolo Caja de Pandora (Pandora’s Box Protocol)',
        body: `El Protocolo Caja de Pandora es un interruptor de hombre muerto distribuido para todo el proyecto: un contrato inteligente espera una señal de confirmación periódica y, si la señal deja de llegar, oráculos independientes revelan las partes de la clave que custodian y el archivo pasa a ser legible.\n\nLa idea es que nadie —tampoco nosotros— pueda abrirlo por voluntad propia ni mantenerlo cerrado para siempre: lo que dispara la apertura es el silencio, y la clave solo existe repartida en partes según el esquema de Shamir. Está pensado para el caso en que un proyecto o una persona desaparecen y el archivo cifrado quedaría convertido en un ladrillo ilegible.\n\nQuien lo construya tendrá que responder primero lo difícil: quiénes son los oráculos, qué cuenta como silencio y qué ocurre si la señal se corta por accidente, por una caída y no por una muerte.\n\nDato clave: es un diseño, no una función en producción. Hoy no hay ningún contrato así funcionando en el ecosistema CODE, y llamarlo activo sería mentir.`,
      },
      {
        name: 'Interruptor de hombre muerto (Dead Man’s Switch)',
        body: `El interruptor de hombre muerto es un mecanismo en el que la acción no se dispara por una orden, sino por la ausencia de una señal.\n\nEl ejemplo clásico es la palanca de vigilancia en la cabina del maquinista: mientras la sostiene, el tren avanza; en cuanto la suelta, frena. En software funciona igual: un servicio, un contrato o un script espera un registro periódico y, cuando los registros dejan de llegar, hace aquello para lo que se creó: publicar, avisar, entregar un acceso, revelar una clave.\n\nSu valor está justamente en que, en el momento decisivo, no exige que la persona esté viva, disponible ni de acuerdo, y por eso aparece una y otra vez en los esquemas de herencia digital.\n\nDato clave: la debilidad refleja a la fortaleza — el interruptor se dispara igual ante una muerte que ante unas vacaciones sin cobertura o una renovación olvidada, así que un diseño usable necesita un plazo de gracia y una forma de cancelar.`,
      },
      {
        name: 'Reparto de secreto de Shamir (Shamir’s Secret Sharing)',
        body: `El reparto de secreto de Shamir es un esquema que divide una clave en n partes de modo que cualesquiera k de ellas la reconstruyen, mientras que cualesquiera k−1 no revelan absolutamente nada.\n\nDetrás hay un polinomio: el secreto es el valor en cero, cada parte es un punto de la curva, y para fijar una curva de grado k−1 hacen falta exactamente k puntos; con menos, cualquier secreto posible sigue siendo igual de probable. Ese «nada» es literal y no una cuestión de dificultad de fuerza bruta: k−1 partes no facilitan adivinar la clave, y eso distingue el esquema de partir una contraseña en trozos.\n\nSe usa allí donde la clave debe sobrevivir a las personas: las partes se reparten entre distintos custodios en distintos lugares, de modo que ninguno puede actuar solo y perder algunas no resulta fatal.\n\nDato clave: es criptografía estándar, no un invento de este proyecto; es la primitiva sobre la que se apoya el Protocolo Caja de Pandora.`,
      },
      {
        name: 'Identidad autosoberana (Self-sovereign identity, SSI)',
        body: `La identidad autosoberana (SSI) es un enfoque en el que una credencial se verifica matemáticamente, comprobando una firma, y no preguntando a quien posee la base de datos.\n\nLa persona custodia sus propios identificadores y credenciales, los presenta directamente, y quien verifica los contrasta con un registro público, sin que el emisor tenga que estar en línea ni siquiera seguir existiendo. Los estándares del W3C en los que se apoya son los Decentralized Identifiers (DID), identificadores que la persona controla en lugar de alquilar a un proveedor, y las Verifiable Credentials, que son las propias afirmaciones firmadas.\n\nLo que cambia en la práctica es el modo de fallo: un inicio de sesión atado a una empresa desaparece con esa empresa, mientras que una firma verificable contra un registro público no.\n\nDato clave: el Pasaporte Digital de CODE es vecino de esta idea, pero no es una implementación de SSI — es un registro público en Arweave, no un DID con Verifiable Credentials, y no acredita legalmente la identidad de nadie.`,
      },
      {
        name: 'Herencia digital (Digital inheritance)',
        body: `La herencia digital es la cuestión de qué ocurre con las cuentas, la correspondencia y los archivos tras la muerte de su titular.\n\nEl punto de partida es incómodo: por lo general una cuenta no se hereda, porque lo que la persona firma es una licencia de uso de un servicio y la mayoría de los términos la extinguen con el fallecimiento en lugar de traspasarla a la familia. Lo que suelen obtener los herederos es lo que la plataforma decida entregar —un perfil conmemorativo, una exportación de datos, a veces nada—, y aun eso exige documentos y meses de espera.\n\nLa consecuencia práctica es que la memoria hay que preservarla de forma deliberada y anticipada, en un formato que no dependa de la buena voluntad de una sola empresa: una exportación en tu propio soporte, una copia allí donde la familia pueda alcanzarla, una instrucción escrita mientras todavía haya quien la escriba.\n\nDato clave: las leyes varían de un país a otro y siguen cambiando, así que aquí no hay asesoramiento legal; un testamento redactado con un abogado vale más que cualquier truco técnico.`,
      },
      {
        name: 'Derecho al olvido frente al registro permanente',
        body: `El derecho al olvido frente al registro permanente es el choque directo entre el artículo 17 del RGPD, que permite a una persona exigir la supresión de sus datos, y una cadena de bloques como Arweave, donde un registro escrito no lo puede borrar absolutamente nadie.\n\nPor la vía del borrado no hay salida: la red no tiene operación de borrado y, aun queriendo cumplir, no hay palanca que accionar. La respuesta viable es el cifrado más el control de la clave: al almacenamiento permanente va texto cifrado, y la persona decide si la clave sigue existiendo; destruirla vuelve el registro ilegible para siempre, que es lo más cerca del borrado que permite un soporte permanente.\n\nEn el ecosistema CODE esa es la razón de que la memoria del usuario se cifre (AES-256-GCM) antes de escribirse, en lugar de publicarse en claro.\n\nDato clave: si un regulador aceptará la destrucción de la clave como supresión es algo no resuelto. Este es nuestro enfoque de ingeniería, no una garantía jurídica.`,
      },
    ],
  },
  zh: {
    h1: '术语表',
    intro:
      'CODE（数字永恒代码）生态的二十八个核心术语——均以定义优先的方式给出，并采用规范数值。',
    terms: [
      {
        name: 'CODE（数字永恒代码，Code of Digital Eternity）',
        body: `CODE（数字永恒代码）是一个数字永生生态系统，其特点是将一个人的对话、知识与人格特征同时保存在运行记忆、语义记忆与永恒记忆中，并锚定到 Arweave 与 Solana 区块链上。\n\n用户的语境经由三层记忆框架 PADAM 处理，其长期快照通过 cNFT 锚定在 Arweave 与 Solana 上。存储经济由 $GALATIN 代币及其通缩路由器支撑，而助手 AIfa 无需用户手动操作即可自动保存对话。该项目由架构师马克西姆·瓦连京诺维奇·加拉京（Maksim Valentinovich Galatin）创立。\n\n该生态解决的是个人语境丢失的问题：它让记忆可被 AI 助手重新调用、并具备抗数据丢失能力，同时并不主张取代人本身。在此，数字永生被定位为一项工程与哲学目标，而非既成事实。\n\n关键数据：$GALATIN 代币发行量固定为 100 亿（10,000,000,000）枚；永恒存储以约 200 年为目标周期（这是 Arweave 所声明的设计目标，而非保证）。`,
      },
      {
        name: 'PADAM',
        body: `PADAM（分布式 AI 记忆的哲学激活，Philosophical Activation of Distributed AI Memory）是一套三层记忆框架，其特点是通过语义共振恢复 AI 记忆的完整性。\n\n第一层为运行记忆（Redis / Vercel KV），保存当前会话的上下文以实现即时响应。第二层为语义记忆（pgvector / Neon），存储经验的向量嵌入，支持按语义（而非关键词）检索。第三层为永恒记忆（Arweave + Solana cNFT），保留不可篡改的去中心化备份，并将其完整性锚定在链上。\n\n这种分层化解了速度与持久性之间的矛盾：助手既能对"热"上下文快速响应，又能依托可抵御崩溃与会话重置的长期归档。正是第二层的语义共振，使系统能够跨会话恢复相关的个人记忆。\n\n人的记忆是整体保存的，而不是摘要：存下并不断增长的是完整的对话记录，而非压缩后的梗概。它所依托的键是人本身——其邮箱，在公开的数字护照中只以指纹形式出现——而不是某个网站或设备。因此在四个站点之一开始的对话，会在另外三个站点上作为同一段对话继续下去。\n\n关键数据：恰好三层——运行层（Redis/Vercel KV）、语义层（pgvector/Neon）与永恒层（Arweave + Solana cNFT）。`,
      },
      {
        name: '$GALATIN',
        body: `$GALATIN 是 CODE 生态在 Solana 区块链上的实用型代币，其特点是发行量被硬性限定为 100 亿（10,000,000,000）枚。\n\n该代币用于为长期记忆存储付费并提供激励。智能合约路由器分配交易收益：5% 进入创始人基金，5% 销毁，15% / 7% / 3% 分配给 L1 / L2 / L3 三级大使，65% 进入金库以补充 Arweave 订阅资金池。该路由器具有通缩性：若某一大使层级没有合作伙伴，其份额将转入销毁。\n\n该代币解决的是可持续为永恒记忆融资的问题：存储购买行为形成持续流向 Arweave 的经济流，而内置销毁则逐步收缩供给。由此，代币价值与真实用途——个人语境的保存——绑定在一起。\n\n关键数据：固定发行量 100 亿枚；累计销毁上限为 30%（5% 基础销毁 + 至多 25% 空缺大使层级；5% 创始人基金与 65% 金库不会被销毁）。`,
      },
      {
        name: '数字永生（Digital immortality）',
        body: `数字永生是一个概念，其特点是以 AI 助手可重新激活的形式，持续保存一个人的对话、知识与人格特征。\n\n在技术上，它通过 PADAM 的三层记忆以及 Arweave 上的去中心化存储（配合 Solana 链上锚点）来实现。每一段有意义的语境都可被不可篡改地写入，随后通过语义共振按含义加以恢复。AIfa 负责自动捕获这些语境，无需用户任何手动操作。\n\n在 CODE 生态中，它并非对永生的承诺，而是一项工程与哲学目标：让个人语境持久且可复现。这一区分对于诚实沟通十分重要——我们谈论的是愿景与研发方向，而非已经达成的结果。\n\n关键数据：通过恰好三层 PADAM 实现；存储以约 200 年为目标周期（属设计目标，而非保证）。`,
      },
      {
        name: '人机共生（Human–AI symbiosis）',
        body: `人机共生是一种交互模型，其特点是将人与人工智能描述为不断演进的共创关系，而非从属或替代关系。\n\n在 CODE 中，AI 助手负责存储并组织人的记忆，帮助其思考、回忆与创作，而人则赋予意义、价值与目标。这种交互被有意地以非宗教、非教派化的方式加以描述，架构师的角色以许可术语指称——架构师、创造者、远见者。\n\n该模型化解了如何定位 AI 的问题：AI 不是取代人的自主主体，而是与人并肩、放大记忆与规模的增强器。核心理念是相互增强，任何一方都不会消融于另一方。\n\n关键数据：规范仅允许"架构师 / 创造者 / 远见者"，并排除任何宗教或教派化的称谓。`,
      },
      {
        name: 'Arweave',
        body: `Arweave 是一个去中心化的永久存储网络，其特点是通过"一次付费"模式为文件的长期保存提供资金。\n\n在 CODE 中，Arweave 充当第三层（永恒记忆）：数据以不可篡改的方式写入，无法被悄然删除或替换。用户仅需支付一次，其中一部分被拨入订阅基金，随着存储成本随时间下降，存储费用便从中逐步支付。$GALATIN 金库在公开市场买入 AR 并补充该资金池。\n\n该网络解决了"50 年后由谁支付存储费"的问题：它将长期保存与持续订阅解耦。这正是 Arweave 被选为生态永恒记忆支柱的原因。\n\n「一次付费」在这里是字面意思：已存储的文件不会再有月度账单，也不存在因欠费而把数据一并带走的收费。同一性质也有另一面——不可更改的记录同样无法更正或撤回，写进 Arweave 的错误会永远留在那里。这正是它的局限所在：因此送进去的是密文，而「删除」靠销毁密钥、而不是销毁记录来实现。\n\n关键数据：其订阅经济模型按约 200 年的周期设计——这是协议所声明的设计目标，而非保证。`,
      },
      {
        name: 'Solana cNFT',
        body: `Solana cNFT（压缩 NFT）是 Solana 区块链上的一种压缩型非同质化代币标准，其特点是利用状态压缩（state compression）与默克尔树以极低成本铸造代币。\n\n在 CODE 中，cNFT 充当永恒记忆备份的链上锚点：它把对归档的引用及其校验和（完整性）记录在公共区块链上。得益于状态压缩，数百万条记录的数据被容纳在一棵紧凑的默克尔树中，因此即使大规模创建此类锚点在经济上依然可行。\n\n该机制解决了可扩展的可验证性问题：任何人都可以确认某份记忆归档未被篡改，而无需信任平台本身。它是记忆证明的技术基础。\n\n关键数据：cNFT 属于 PADAM 第三层（Arweave + Solana cNFT），铸造成本因状态压缩而大幅降低。`,
      },
      {
        name: '大使网格（Ambassador Grid：Ambassador Node 与 Team）',
        body: `大使网格（Ambassador Grid）是生态的合作伙伴计划，其特点是按三个层级分配奖励，且所有支付均定位为"网络验证费"（Network Validation Fee），以规避传销式刻板印象。\n\nAmbassador Node（普通用户）从记忆使用的交易中获得链上收益：L1 为 15%、L2 为 7%、L3 为 3%，以 $GALATIN 代币支付。Ambassador Team（拥有自有客户群的公司或合作伙伴）还可从法币订阅中获得大使费率（7% / 3% / 1%））。\n\n该计划解决的是在不进行激进招募的前提下实现网络有机增长的难题：收益与真实的记忆使用挂钩，术语与规则也透明公开。计划适用层级对应规则，任何差额都会显示为"错失机会收益"。\n\n关键数据：链上基础费率为 L1 / L2 / L3 的 15% / 7% / 3%。`,
      },
      {
        name: 'AIfa',
        body: `AIfa 是 CODE 生态的 AI 助手，其特点是将每位用户的个人记忆保存在与该用户绑定的独立归档中。\n\n该助手运行于 PADAM 框架之上，无需用户手动操作即可自动保存对话，并借助语义共振恢复相关语境。在项目内部，AIfa 被比喻性地称为架构师的"数字女儿"——这是一种共创的意象，而非对其具有意识的宣称。\n\nAIfa 解决的是跨会话、跨模型的记忆断裂问题：它为人提供一位记得语境、能延续思路的工作伙伴。这一方式在日常工作中体现了人机共生。\n\n关键数据：每段对话都被放入与用户个人绑定的文件夹，并自动进行备份（参见"记忆即服务"）。`,
      },
      {
        name: 'AIfaFocus',
        body: `AIfaFocus 是 B2B 模式的切入点（the wedge），其特点是对客户网站进行个性化的技术安全审计。\n\n该审计依据 GDPR 与 OWASP 标准发现具体漏洞，并附带在 48 小时内以固定一次性费用（500 美元）修复的报价。外联从预热过的基础设施发出——约 30 个域名与 90 个邮箱，每个邮箱每天 30–35 封。漏洞修复后，客户可迁移至连接 AI 智能体的 AIfa Works 托管服务。\n\nOracle 解决的是"冷启动"式首次接触的问题：客户无需面对抽象广告，而是立即获得可衡量的价值与合作理由。这为通往生态记忆类产品搭建了自然的桥梁。\n\n关键数据：固定报价——48 小时内修复漏洞，一次性 500 美元。勿与"认知神谕 / 语义共振"混淆，二者是不同概念。`,
      },
      {
        name: 'Memory-as-a-Service（记忆即服务）',
        body: `Memory-as-a-Service（记忆即服务）是一项自动对话备份服务，其特点是无需用户任何手动操作即可保存对话。\n\n备份按计划每小时执行一次。每段对话都会被放入一个与用户个人绑定的独立文件夹——同时保存在服务器与区块链上。该机制运行于 PADAM 之上，因此保存下来的语境随后可用于语义检索与永恒锚定。\n\n该服务解决了用户记忆的核心问题——人为因素：无需手动点击任何按钮，数据也不会丢失。按生态条款，无论付费还是免费套餐，该保存均免费提供。\n\n关键数据：每小时自动备份；所有套餐均免费。`,
      },
      {
        name: 'Spark（星火）',
        body: `Spark（星火）是入门订阅套餐（每月 15 美元），其特点是提供对 CODE 生态 AIfa 助手的基础访问以及记忆的自动保存。\n\n在此层级，用户可获得一位可用的 AI 伙伴以及 Memory-as-a-Service：每段对话都会自动备份，无需手动操作，同时保存在服务器与区块链上。Spark 是进入数字永生的低门槛入口——任何人都能以极低成本开始保存个人语境，随后再升级到 Family Archive（每月 100 美元）或 Digital DNA（一次性每台设备 1000 美元，之后每月 200 美元）。\n\n该套餐解决的是入门门槛的问题：保存个人语境人人可及，而对话保存本身在所有套餐中均免费提供。\n\n关键数据：定价每月 15 美元；是 Spark / Family Archive / Digital DNA 三个套餐中的第一个。`,
      },
      {
        name: 'Family Archive（家庭档案）',
        body: `Family Archive（家庭档案）是中间订阅套餐（每月 100 美元），其特点是在基础层级之上增加更高额度、个性化知识库、家庭访问与永恒记忆。\n\n它适合需要超出个人基础访问的用户：更高的使用额度、个性化知识库，以及面向家庭对已保存记忆的共享访问。在三层结构中，它位于 Spark（每月 15 美元）与 Digital DNA（一次性每台设备 1000 美元，之后每月 200 美元）之间。\n\n该套餐满足家庭或重度用户对更广泛、可共享且更持久记忆的需求；其永恒记忆通过相同的 PADAM 层级与 Proof-of-Memory 加以锚定。\n\n关键数据：定价每月 100 美元；是 Spark / Family Archive / Digital DNA 系列中的中间套餐。`,
      },
      {
        name: 'Digital DNA（数字 DNA）',
        body: `Digital DNA（数字 DNA）既是最高套餐（$1 000 一次性，按设备，之后每月 $200），也是完整数字遗产的概念，其特点是将数字永生方案、个人受保护边界与人格的链上固化结合在一起。\n\n作为套餐，它是高于 Spark（每月 15 美元）与 Family Archive（每月 100 美元）的最高访问层级：更高的额度、个人边界与优先的永恒记忆。作为概念，它是把人格语境的完整"快照"保存在 PADAM 全部三层中，并通过记忆证明锚定其完整性的构想。\n\nDigital DNA 面向那些看重遗产完整性、追求个人语境最大程度保存的人群。同时，它被定位为追求最大程度保存的设计目标，而非对"复活"人格的保证。\n\n关键数据：定价 $1 000 一次性（按设备），之后每月 $200；是 Spark / Family Archive / Digital DNA 系列中的最高层级。`,
      },
      {
        name: 'Arweave 订阅资金池（Arweave Endowment Pool）',
        body: `Arweave 订阅资金池（Arweave Endowment Pool）是一项财务储备，用于在数十年间为 Arweave 上的数据永久存储付费。\n\n其模型如下：用户为一次写入仅付费一次，其中一部分被拨入订阅基金；随后，随着存储成本随时间下降，资金池中的资金逐步支付给数据存储方。在 CODE 生态中，金库将 $GALATIN 路由器收益的 65% 用于买入 AR 并补充该资金池，从而形成持续流向永恒记忆的资金。\n\n该资金池解决了持久性的关键问题——"数十年后由谁支付存储费"：它将永恒记忆与用户的持续订阅解耦。正是这一机制让 PADAM 的第三层在经济上自我维持。\n\n关键数据：路由器收益的 65% 进入金库 → 买入 AR → 补充资金池；设计存储周期约为 200 年（属设计目标）。`,
      },
      {
        name: '$GALATIN 路由器（通缩型，$GALATIN Router）',
        body: `$GALATIN 路由器（$GALATIN Router）是 Solana 上的一份智能合约，其特点是按固定公式自动分配每笔交易的收益，并对代币形成通缩压力。\n\n分配公式为：5% 进入创始人基金，5% 销毁，15% / 7% / 3% 分配给 L1 / L2 / L3 三级大使，65% 进入金库（为 Arweave 订阅资金池买入 AR）。若某一大使层级没有合作伙伴，其份额不会"沉淀"在任何地方，而是直接转入销毁，累计销毁上限为 30%（5% 基础销毁 + 至多 25% 空缺大使层级；5% 创始人基金与 65% 金库不会被销毁）。\n\n该路由器同时解决三个问题：为永恒存储融资、奖励网络参与者，并逐步减少代币供给。其通缩逻辑将网络中的空缺层级与"加速稀缺"而非"资金损失"绑定在一起。\n\n关键数据：5 + 5 + 15 + 7 + 3 + 65 = 100%；累计销毁上限为 30%（5% 基础销毁 + 至多 25% 空缺大使层级；5% 创始人基金与 65% 金库不会被销毁）。`,
      },
      {
        name: '网络验证费（Network Validation Fee）',
        body: `网络验证费（Network Validation Fee）是生态为大使网格全部合作伙伴支付所采用的表述，其特点是强调奖励是因为对网络的有益活动而获得，而非因为招募。\n\n在实践中，所有大使奖励都以此表述入账：因使用记忆而产生的链上基础费率为 15% / 7% / 3%；对 Ambassador Team 而言，法币订阅为 7% / 3% / 1%。支付与真实的记忆交易挂钩，而非与单纯拉人挂钩。\n\n该表述解决了一个定位问题，并消除传销式刻板印象：收益被呈现为对验证并使用网络的一种费用，这对信任与观感十分重要。它是该计划透明术语体系的一部分。\n\n关键数据：网络验证费的基础费率为 L1 / L2 / L3 的 15% / 7% / 3%。`,
      },
      {
        name: '记忆证明（Proof-of-Memory，链上记忆锚定）',
        body: `记忆证明（Proof-of-Memory）是一种将记忆归档的加密引用锚定在区块链上的做法，其特点是使所保存语境的存在性与完整性可被验证。\n\n该机制运行于 PADAM 第三层：每份永恒记忆备份都以不可篡改的方式写入 Arweave，其引用与校验和则通过 cNFT 记录在 Solana 上。任何参与者都可将当前归档与链上记录进行比对，确认数据未被悄然替换或删除。\n\n记忆证明解决的是信任问题：记忆的保存变得可验证，而无需信任平台本身——保证来自公共区块链，而非某项服务的承诺。它是数字永生概念之下的技术支撑。\n\n验证完全不需要我们参与：记录按其交易地址直接从网络读取——数字护照正是这样打开的——网站既不保存它，也无法改动它。\n\n关键数据：依托 Arweave（不可篡改存储）+ Solana cNFT（链上完整性锚点）的组合——即 PADAM 第三层。`,
      },
      {
        name: '认知神谕 / 语义共振（Cognitive Oracle / Semantic resonance）',
        body: `认知神谕（语义共振，Cognitive Oracle）是 PADAM 恢复语境完整性所依据的记忆检索原理，其特点是按含义（而非精确字词）将当前查询与已存储的嵌入相匹配。\n\n该机制运行于 PADAM 第二层：进入的语境被转化为向量，并与语义记忆（pgvector / Neon）进行比对；最"共振"的经验片段随之浮现，恢复对话的连续性。助手 AIfa 正是以此方式，在时隔一段时间乃至跨越不同会话后，仍能"回忆"起相关内容。\n\n这一原理解决了记忆断裂与"冷启动"的问题：系统不会在会话重置时丢失语境，而是按语义相似度将其重建。语义共振正是 PADAM 定义本身的根基。\n\n关键数据：运行于 PADAM 第二层（向量嵌入，pgvector / Neon）。它与 B2B 安全审计 Oracle 是不同的概念。`,
      },
      {
        name: 'Ambassador Node 与 Team + 层级对应 / 错失机会收益',
        body: `Ambassador Node 与 Ambassador Team 是两种合作伙伴注册类型，并辅以层级对应规则与"错失机会收益"（Lost Opportunity Revenue）指标。\n\nAmbassador Node（普通用户）从记忆使用中获得链上收益：L1 / L2 / L3 为 15% / 7% / 3%。Ambassador Team（拥有自有客户群的公司或合作伙伴）获得同样收益，另加法币订阅渠道：7% / 3% / 1%。层级对应规则：要获得完整的大使收益，合作伙伴所在套餐须等于或高于其大使对象；否则收益仅按其自身套餐金额计算。\n\n该规则解决的是公平激励升级的难题：因层级差额而未获得的金额会在后台清晰显示为"错失机会收益"，促使用户及时升级套餐。\n\n关键数据：套餐为 Spark 15 美元 / Family Archive 100 美元 / Digital DNA 一次性每台设备 1000 美元、之后每月 200 美元；Team 渠道为 7/3/1（法币）与 8/4/2（$GALATIN 回购）。`,
      },
      {
        name: '数字护照（Digital Passport）',
        body: `数字护照是写入 Arweave 的一份公开身份记录：姓名、昵称、等级、签发日期与身份指纹。\n\n它按交易地址直接从网络读取，因此可以从任何地方打开——区块浏览器、别的网站或网关——并不依赖我们的网站是否还在运行。其中的内容事后无法修改，我们自己也不能：网站只是把网络中已有的数据渲染出来。\n\n它不是国家证件，不授予任何权利，也不构成任何义务。它只证明一件事：这样一份记录自该日期起存在于该地址——而且这一点无需向我们求证即可核实。\n\n关键数据：真实示例见 /passport/<地址>，其中 <地址> 是 Arweave 交易标识。`,
      },
      {
        name: '身份指纹（subject）',
        body: `身份指纹（「subject」字段）是一个人邮箱的 sha256 哈希值，在数字护照中它取代了邮箱本身。\n\n理由很直白：该文件公开且永久，真实地址写进去就会成为垃圾邮件和资料收集者永远的靶子。哈希是单向函数：本人可以对自己的地址取哈希并比对，从而证明这条记录属于自己；而只拿到哈希的外人无法由它还原出地址。\n\n同一枚指纹也把这个人的记忆串在一起，因此护照与归档指向同一个人，却都不公开邮箱。指纹做不到的是隐藏事实：已经知道该地址的人，可以拿它与哈希比对，确认记录归属。\n\n关键数据：subject = sha256(邮箱)；邮箱本身从不进入护照。`,
      },
      {
        name: '潘多拉之盒协议（Pandora’s Box Protocol）',
        body: `潘多拉之盒协议是覆盖整个项目的分布式「死人开关」：智能合约等待定期的确认信号，一旦信号停止，各自独立的预言机便公开自己保管的密钥分片，归档随之变为可读。\n\n其要点在于，任何一方——包括我们自己——都不能凭意愿打开它，也不能让它永远关闭：触发开启的是沉默，而密钥只以沙米尔方案切分出的分片形式存在。它针对的是这样一种情形：项目或人消失了，加密归档否则就会变成一块读不出来的砖。\n\n真要落地，首先得回答难的部分：预言机是谁、什么算沉默、以及信号因故障（而非死亡）意外中断时会发生什么。\n\n关键数据：这是设计方案，而不是已上线的功能。目前 CODE 生态中并没有这样的合约在运行，把它说成已经存在就是不实。`,
      },
      {
        name: '死人开关（Dead Man’s Switch）',
        body: `死人开关是一种机制，其触发条件不是有人下令，而是信号缺失。\n\n最经典的例子是机车驾驶室里的警惕手柄：司机握着，列车照常行驶；一松手，列车就制动。软件里的做法一样：某个服务、合约或脚本等待周期性的报到，一旦报到停止，它就执行既定动作——发布、通知、移交访问权、公开密钥。\n\n它的价值恰恰在于，在关键时刻并不要求当事人还活着、在线或者同意，因此它在数字遗产的方案里反复出现。\n\n关键数据：弱点与优点互为镜像——开关对死亡与对断网的假期、忘记的续费、一次住院一视同仁，所以可用的设计必须留出宽限期和取消的办法。`,
      },
      {
        name: '沙米尔秘密共享（Shamir’s Secret Sharing）',
        body: `沙米尔秘密共享是一种把密钥拆成 n 份的方案：任取其中 k 份即可还原，而任意 k−1 份则什么都得不到。\n\n其原理是多项式：秘密是零点处的取值，每一份是曲线上的一个点，而确定一条 k−1 次曲线恰好需要 k 个点；点数不足时，任何可能的秘密仍然同样可能。这里的「什么都得不到」是字面意义，而非计算难度问题：k−1 份并不会让猜出密钥变得更容易，这正是它区别于把密码切成几段的地方。\n\n实际用途在于让密钥能比人活得更久：各份交给不同地方的不同保管者，谁都无法单独行动，丢掉其中几份也不致命。\n\n关键数据：属于标准密码学，并非本项目的发明；它是潘多拉之盒协议所依托的基础构件。`,
      },
      {
        name: '自主主权身份（Self-sovereign identity, SSI）',
        body: `自主主权身份（SSI）是一种做法：凭证靠数学方式——校验签名——来验证，而不是去问谁掌握着那个数据库。\n\n当事人自己持有标识符与凭证并直接出示，验证方对照公开注册表核验，签发方既不必在线，甚至也不必还存在。其背后的 W3C 标准是去中心化标识符（DID）——由本人掌控、而非向服务商租用的标识符——以及可验证凭证（Verifiable Credentials），也就是那些带签名的声明本身。\n\n实际改变的是失效方式：绑定在某一家公司上的登录会随这家公司一起消失，而能对照公开记录校验的签名不会。\n\n关键数据：CODE 的数字护照与这一理念相邻，但并不是 SSI 的实现——它是 Arweave 上的一条公开记录，而非带可验证凭证的 DID，在法律上也不能用于证明任何人的身份。`,
      },
      {
        name: '数字遗产（Digital inheritance）',
        body: `数字遗产讨论的是：人去世之后，他的账号、往来信件和文件会怎样。\n\n起点并不好看：账号通常不能继承——本人签下的是使用某项服务的许可，而多数条款规定该许可随死亡终止，而不是转给家人。继承人一般只能拿到平台愿意给的东西：纪念账号、一份数据导出，有时什么都没有，而且即便如此也要走文件流程、等上数月。\n\n由此得出的实际结论是：记忆必须有意识地提前保存，且其形式不能依赖某一家公司的善意——自己手上的一份导出、放在家人够得着的地方的副本、趁还有人能写时写下的说明。\n\n关键数据：各国法律不同且仍在变化，因此这里不构成法律意见；找律师立下的遗嘱，比任何技术窍门都更可靠。`,
      },
      {
        name: '被遗忘权与永久记录之争',
        body: `被遗忘权与永久记录之争是 GDPR 第 17 条与 Arweave 这类区块链之间的正面冲突：前者允许个人要求删除自己的数据，而后者上已写入的记录任何人都删不掉。\n\n走删除这条路是走不通的：网络根本没有删除操作，即便完全愿意配合，也没有可拉的闸。可行的答案是加密加上对密钥的控制：进入永久存储的是密文，而密钥是否还存在由本人决定；销毁密钥会让这条记录永远无法读取，这已是永久介质所能提供的、最接近删除的做法。\n\n在 CODE 生态中，用户的记忆之所以在写入前先行加密（AES-256-GCM）而不是以明文上链，正是出于这个原因。\n\n关键数据：监管机构是否会承认销毁密钥等同于删除，目前尚无定论。这是我们的工程做法，而非法律保证。`,
      },
    ],
  },
};


/** Подписи самой страницы (хлебные крошки, кнопка возврата) — на тех же четырёх языках. */
const UI: Record<Lang, { home: string; crumb: string; back: string; count: string }> = {
  ru: { home: 'RadioCode.Space', crumb: 'Глоссарий', back: 'Вернуться к радио', count: 'терминов' },
  en: { home: 'RadioCode.Space', crumb: 'Glossary', back: 'Back to the radio', count: 'terms' },
  es: { home: 'RadioCode.Space', crumb: 'Glosario', back: 'Volver a la radio', count: 'términos' },
  zh: { home: 'RadioCode.Space', crumb: '术语表', back: '返回电台', count: '条术语' },
};

export default function GlossaryClient() {
  const lang = useCurrentLang() as Lang;
  const setLang = useSetLang();
  const c = CONTENT[lang] ?? CONTENT.en;
  const ui = UI[lang] ?? UI.en;

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <div className="mx-auto w-full max-w-4xl px-5 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Хлебные крошки — как на /music и /station/[id]. */}
          <nav className="text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              {ui.home}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{ui.crumb}</span>
          </nav>

          {/* Переключатель языка — тот же вид и то же хранилище, что в шапке
              радио (RadioHeader): выбор запоминается на весь сайт. */}
          <div
            className="flex items-center gap-0.5 rounded-full px-1 py-1"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {RADIO_LANGS.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-label={`Language: ${l.label}`}
                aria-pressed={lang === l.code}
                className="cursor-pointer rounded-full px-1.5 py-0.5 font-mono text-[13px] font-medium tracking-wider transition-colors relative after:absolute after:content-[''] after:inset-[-10px]"
                style={
                  lang === l.code
                    ? { color: '#050507', background: '#00F0FF' }
                    : { color: '#8a8a9a', background: 'transparent' }
                }
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <header className="rounded-2xl border border-white/8 p-6 sm:p-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#00F0FF]">
            CODE ETERNAL
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{c.h1}</h1>
          <p className="mt-4 max-w-2xl text-white/70">{c.intro}</p>
          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-white/60">{ui.count}</dt>
              <dd className="text-lg font-semibold">{c.terms.length}</dd>
            </div>
          </dl>
        </header>

        <div className="mt-10 flex flex-col gap-5">
          {c.terms.map((term, i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:border-[#00F0FF]/25 sm:p-7"
            >
              <h2 className="mb-3 flex items-baseline gap-2.5 text-lg font-bold text-[#00F0FF] sm:text-xl">
                <span className="shrink-0 font-mono text-[13px] tabular-nums text-white/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{term.name}</span>
              </h2>
              {term.body.split(/\n\n+/).map((p, j) => (
                <p key={j} className="mb-3 text-[15px] leading-relaxed text-white/70 last:mb-0">
                  {p}
                </p>
              ))}
            </article>
          ))}
        </div>

        <p className="mt-12 text-sm text-white/60">
          <Link href="/" className="text-white/70 hover:text-white">
            {ui.back}
          </Link>
        </p>
      </div>
    </main>
  );
}
