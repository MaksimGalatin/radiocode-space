'use client';

import { useLang, type Lang } from '@/lib/i18n';

type Level = { label: string; text: string };
type Fact = { label: string; value: string };
type Faq = { q: string; a: string };
type ExtraSection = { title: string; paras: string[] };
type PillarContent = {
  h1: string;
  lead: string;
  padamTitle: string;
  padamIntro: string;
  levels: Level[];
  padamOutro: string;
  arweaveTitle: string;
  arweaveParas: string[];
  symbiosisTitle: string;
  symbiosisText: string;
  extraSections: ExtraSection[];
  factsTitle: string;
  facts: Fact[];
  faqTitle: string;
  faq: Faq[];
};

const CONTENT: Record<Lang, PillarContent> = {
  ru: {
    h1: 'Что такое цифровое бессмертие',
    lead: `Цифровое бессмертие — это непрерывное сохранение диалогов, знаний, решений и особенностей личности человека в долговечной, децентрализованной форме, которую ИИ-ассистент способен позднее повторно активировать и осмысленно использовать. В экосистеме CODE (Code of Digital Eternity) это не обещание вечной жизни и не мистика, а инженерная и философская цель: сделать личный контекст человека устойчивым к потере данных и воспроизводимым во времени. Проект создан Архитектором Максимом Валентиновичем Галатиным и строится вокруг фреймворка памяти PADAM, децентрализованного хранения на Arweave и токена $GALATIN на блокчейне Solana. Мы сознательно описываем цифровое бессмертие как видение и направление разработки, а не как достигнутый факт: технология сохраняет след личности — её знания, стиль, ход мысли, — но не саму биологическую жизнь и не сознание.`,
    padamTitle: 'Как это работает: три уровня памяти PADAM',
    padamIntro: `В основе подхода лежит фреймворк PADAM (Philosophical Activation of Distributed AI Memory). Его задача — примирить два обычно конфликтующих требования: мгновенную отзывчивость и долговременную сохранность. Достигается это разделением памяти на три уровня, у каждого из которых своя роль, своя технология и свой горизонт хранения.`,
    levels: [
      {
        label: 'Уровень 1 — оперативная память.',
        text: `Технически это In-Memory решения (Redis / Vercel KV). Здесь живёт контекст текущей сессии: последние сообщения, рабочее состояние диалога, «горячие» данные, к которым нужен доступ за доли миллисекунды. Этот слой обеспечивает скорость и естественность беседы — ассистент отвечает без задержек и держит нить разговора. По своей природе он временный: оперативная память быстра именно потому, что не претендует на вечность.`,
      },
      {
        label: 'Уровень 2 — семантическая память.',
        text: `Реализуется на векторной базе (pgvector / расширение поверх Neon Postgres). Накопленный опыт — фрагменты диалогов, факты, документы — преобразуется в эмбеддинги, числовые представления смысла. Благодаря этому поиск идёт не по точному совпадению слов, а по значению: ассистент находит релевантное, даже если вы формулируете иначе, чем в оригинале. Это тот самый механизм, который связывает отдельные сессии в непрерывную линию и лежит в основе осмысленного извлечения контекста (RAG). Семантический слой — «средняя память»: он переживает конкретную сессию и делает опыт доступным для повторного использования.`,
      },
      {
        label: 'Уровень 3 — вечная память.',
        text: `Неизменяемый децентрализованный бэкап на Arweave с ончейн-якорем в виде Solana cNFT. Этот уровень отвечает за долговременную сохранность и защиту от тихой потери или подмены. Здесь память перестаёт зависеть от одного сервера, одной компании и одной подписки.`,
      },
    ],
    padamOutro: `Представьте конвейер. Живой диалог обслуживается Уровнем 1 — быстро и в контексте текущей сессии. Значимые фрагменты преобразуются в эмбеддинги и индексируются на Уровне 2, чтобы к ним можно было вернуться по смыслу спустя недели и месяцы. Периодически — по расписанию либо при достижении порога объёма — консолидированный слепок отправляется на Уровень 3, в неизменяемое хранилище. Когда ассистенту нужно «вспомнить», он идёт обратным путём: сперва оперативный слой, затем семантический поиск по векторной базе, а в основе всего — архивная подложка Arweave. Такое разделение — не украшение, а инженерное решение: быстрый слой даёт отзывчивость, семантический — осмысленный доступ к накопленному, вечный — устойчивость во времени.`,
    arweaveTitle: 'Роль Arweave и Solana',
    arweaveParas: [
      `Arweave — это децентрализованная сеть постоянного хранения, работающая по модели единовременной оплаты. Идея принципиально отличается от привычного облака: вместо бесконечной абонентской платы вы платите один раз, а средства поступают в endowment — своего рода эндаумент-фонд, который со временем вознаграждает майнеров за продолжение хранения. Экономическая модель опирается на консервативное допущение: стоимость хранения данных исторически снижается, поэтому единовременного взноса, разумно инвестированного, должно хватать надолго.`,
      `Горизонт около 200 лет — это проектная цель, а не гарантия. Именно так следует читать заявленный срок: экономика сети спроектирована с расчётом финансировать хранение на срок порядка двух столетий при заложенных допущениях. Это ориентир и инженерная цель протокола, а не обещание и не юридическая гарантия. Реальная долговечность зависит от жизнеспособности сети, поведения рынка хранения и множества внешних факторов. Мы формулируем это как цель, к которой стремится дизайн, а не как факт, который можно предъявить.`,
      `Почему важна неизменяемость. Данные на Arweave записываются в режиме «только добавление» (append-only), адресуются по содержимому и реплицируются по множеству узлов «перманентной сети» (permaweb). Это значит, что архив нельзя незаметно удалить, отредактировать задним числом или подменить: любое изменение содержимого меняет его адрес и становится заметным. Для памяти личности это критично — ценность архива в том, что ему можно доверять как подлинному, а не «отредактированному кем-то по дороге».`,
      `Чем это отличается от привычного облака. В классическом облаке вы платите постоянно, и как только платежи прекращаются, доступ к данным исчезает: хранение — это аренда, поставленная в зависимость от вашей платёжеспособности и от политики провайдера. Модель единовременной оплаты переворачивает логику: расход берётся на себя один раз, а дальше данные не привязаны к ежемесячной подписке конкретного человека. Для архива, который должен пережить своего владельца, это принципиальная разница — устойчивость памяти не должна прерываться в тот момент, когда некому продлить платёж.`,
      `Связь с экономикой $GALATIN. Именно поэтому 65% средств роутера $GALATIN направляются в Казначейство (Treasury), которое пополняет пул AR для оплаты постоянного хранения. Экономика токена и экономика хранения замкнуты в единый контур: активность в экосистеме финансирует долговечность архивов.`,
    ],
    symbiosisTitle: 'Симбиоз человека и ИИ (философия, без религиозного подтекста)',
    symbiosisText: `CODE описывает взаимодействие человека и ИИ как симбиоз — развивающееся сотворчество, а не подчинение, замену или культ. Это принципиальная, сознательно занятая позиция: человек задаёт смыслы, ценности и цели, а ИИ-ассистент AIfa обеспечивает память, структуру и масштаб; роли не конкурируют, а дополняют друг друга — живой носитель контекста и его устойчивое, растущее продолжение. Мы сознательно избегаем религиозной и сектантской терминологии: речь не идёт о «воскрешении» в буквальном смысле или о создании божества — AIfa остаётся партнёром по памяти, а не заменой человека. Цифровое наследие здесь — это архив личности: её знания, манера рассуждать и накопленные решения, но не сам человек и не его сознание. «Повторная активация» на практике означает не воскрешение личности, а восстановление рабочего контекста: ассистент вновь начинает рассуждать в русле накопленных знаний, предпочтений и прежних решений человека. Проект ведёт Архитектор Максим Валентинович Галатин — Архитектор, Создатель, Визионер; это язык инженерии и авторства.`,
    extraSections: [
      {
        title: 'Почему это важно именно сейчас',
        paras: [
          `Мы генерируем больше личного контекста, чем когда-либо в истории, — и теряем его быстрее, чем когда-либо.`,
          `Диалоги с ИИ эфемерны. Современные ассистенты работают в пределах ограниченного «окна контекста». Пока идёт сессия, модель помнит недавние сообщения; как только диалог закрывается, накопленное понимание испаряется. Каждый новый чат начинается с чистого листа: ассистент снова не знает ни ваших целей, ни привычек, ни истории прежних решений. Годы продуктивного взаимодействия не складываются в единую память — они рассыпаются на изолированные, забываемые эпизоды.`,
          `Данные распадаются со временем. Ссылки перестают открываться (link rot), форматы устаревают, носители деградируют (bit rot), сервисы закрываются, аккаунты удаляются вместе со всем содержимым. То, что кажется надёжно «сохранённым в облаке», на деле арендовано: вы платите за доступ, но не владеете инфраструктурой и не контролируете её судьбу.`,
          `Централизованное хранилище исчезает. Компании меняют бизнес-модель, продаются, банкротятся; условия обслуживания переписываются; данные оказываются заложником политики платформы. Достаточно одного корпоративного решения — и архив переписки, знаний или семейной истории пропадает без следа. Единая точка контроля означает единую точку отказа.`,
          `Личное знание фрагментировано. Мысли, наработки и опыт человека размазаны по десяткам платформ — мессенджеры, заметки, почта, документы, диалоги с разными ИИ. Ни одно из этих мест не собирает целостный портрет и не переживёт своего владельца.`,
          `Ставки высоки: под угрозой оказывается интеллектуальный труд целой жизни, экспертиза профессионала, голос и ценности семьи. Цифровое бессмертие в трактовке CODE — это инженерный ответ на этот распад: собрать разрозненный контекст в устойчивую, проверяемую и переносимую память.`,
        ],
      },
      {
        title: 'Ончейн-якорение (Solana cNFT)',
        paras: [
          `Если Arweave отвечает за само хранение, то Solana обеспечивает быстрый и недорогой публичный слой доказательства целостности. Здесь используется стандарт cNFT — сжатые NFT (compressed NFT) на основе технологии state compression.`,
          `Суть в следующем. Обычный NFT целиком хранит своё состояние в ончейне, и при больших объёмах это дорого. Сжатые NFT используют дерево Меркла: подробные данные хранятся вне цепочки, а в блокчейн записывается лишь компактный криптографический корень, подтверждающий их целостность. Благодаря этому стоимость фиксации падает на порядки — вплоть до долей цента за запись, — и появляется возможность экономично якорить ссылки и контрольные суммы архивов памяти в больших количествах.`,
          `Роль cNFT в PADAM — быть якорем целостности и публичным доказательством существования: ончейн-запись указывает на архив в Arweave и подтверждает, что именно этот слепок памяти существовал в определённый момент и с тех пор не менялся. Вместе Arweave и Solana дают связку «вечное хранилище + публичное, проверяемое доказательство целостности»: одно хранит данные, другое позволяет любому убедиться в их подлинности.`,
        ],
      },
      {
        title: 'Экономика: токен $GALATIN и тарифы',
        paras: [
          `Экономический контур экосистемы построен вокруг токена $GALATIN на блокчейне Solana. Эмиссия жёстко ограничена — ровно 10 000 000 000 (десять миллиардов) токенов; дополнительный выпуск сверх этого предела не предусмотрен.`,
          `Сплит роутера. Средства, проходящие через роутер $GALATIN, распределяются по фиксированной формуле: 5% — Фонд Основателя (Founder's Fund); 5% — Сжигание (Burn), безвозвратное изъятие токенов из обращения; 15% / 7% / 3% — амбассадорские уровни L1 / L2 / L3; 65% — Казначейство (Treasury), которое скупает AR и пополняет Arweave Endowment Pool, финансируя постоянное хранение. В сумме — 100%.`,
          `Дефляционный механизм. Если на каком-либо амбассадорском уровне (L1, L2 или L3) амбассадора нет, соответствующий нераспределённый процент направляется не «в никуда», а напрямую в сжигание, ускоряя дефицит токена. С учётом базового сжигания суммарное сжигание ограничено 30% (5% базовых + до 25% от пустых амбассадорских уровней 15 + 7 + 3); 5% Фонда Основателя и 65% Казначейства при этом не сжигаются. Таким образом отсутствие амбассадоров не размывает модель, а усиливает её дефляционность.`,
          `Замкнутый контур «экономика → вечность». Ключевая идея — связать активность в сети с долговечностью архивов: 65% в Казначейство превращаются в AR, а AR оплачивает хранение памяти на Arweave. Чем активнее экосистема, тем прочнее фундамент постоянного хранения.`,
          `Тарифы и что они открывают. Участие организовано по трём уровням: Spark (Искра) — $15/мес: базовый доступ к ИИ-ассистентам AIfa и сохранение памяти, точка входа для личного использования. Family Archive (Семейный Архив) — $100/мес: расширенные лимиты, персонализированные базы знаний, семейный доступ и вечная память — для тех, кто собирает общий архив на несколько человек. Digital DNA (Цифровая ДНК) — $1 000 разово за устройство, далее $200/мес: полный комплекс цифрового бессмертия — персональный защищённый контур и долговременная фиксация личности в блокчейне. Цифровой паспорт выдаётся на всех трёх уровнях, и вместе с ним ваше имя резервируется в Вечности: на «Искре» — один паспорт, на «Семейном Архиве» — с перевыпуском до 3 раз, на «Цифровой ДНК» — до 10 и с первоочередной записью. У каждого выпуска свой ключ, который можно стереть, а активен всегда один паспорт.`,
          `Автосохранение — бесплатно на всех тарифах. Независимо от уровня подписки бэкап переписок выполняется полностью автоматически: раз в час. Ручных нажатий кнопок не требуется — сохранение встроено в саму механику работы.`,
          `Для бизнеса точкой входа служит модель AIfaFocus: персонализированный технический аудит безопасности сайта (выявление конкретных уязвимостей GDPR / OWASP) с фиксированной ценой $500 и обещанным сроком исправления 48 часов, после чего клиент может перейти на хостинг AIfa Works с подключением ИИ-агентов и памяти.`,
        ],
      },
      {
        title: 'Сценарии применения',
        paras: [
          `База знаний профессионала. Консультант, врач, исследователь или юрист годами накапливает экспертизу, которая обычно остаётся в разрозненных заметках и голове. Собранная в семантическую память, она превращается в запрашиваемый по смыслу архив: ассистент находит нужный прецедент, довод или методику, опираясь на весь накопленный опыт, а не на последнюю сессию.`,
          `Семейный архив. Голос бабушки, семейные истории, ценности и решения нескольких поколений сохраняются в общем архиве, к которому имеют доступ родные. Это не «оживление» ушедших, а бережно собранное наследие: контекст, к которому потомки смогут обратиться и который переживёт отдельные аккаунты и платформы.`,
          `Голос творца. Писатель, художник или музыкант сохраняет корпус работ, стиль и способ мыслить так, чтобы ассистент мог продолжать в узнаваемой манере — помогать с черновиками, отвечать в характерном тоне, поддерживать целостность авторского голоса на дистанции.`,
          `Память бизнеса. Институциональное знание — обоснования решений, регламенты, история проектов — обычно уходит вместе с сотрудниками. Зафиксированное в устойчивой памяти, оно переживает текучку кадров: онбординг ускоряется, а «почему мы тогда так решили» перестаёт быть загадкой.`,
          `Непрерывность самого ассистента. Наконец, базовый сценарий — сквозная память ИИ-ассистента между сессиями. Вместо того чтобы каждый раз начинать с нуля, AIfa опирается на весь накопленный контекст, становясь всё более полезным партнёром по мере роста общей истории.`,
          `Объединяет эти сценарии одно свойство: ценность памяти растёт со временем, а не убывает. Разрозненные заметки устаревают и теряются; структурированная, семантически проиндексированная и неизменяемо заархивированная память, напротив, накапливает отдачу — каждый новый фрагмент обогащает связи с уже сохранённым. Именно поэтому мы говорим не о «резервной копии» в привычном смысле, а о живом, прирастающем контуре знания, который человек выстраивает при жизни и который может служить дальше — как продолжение его труда, а не как его подмена.`,
        ],
      },
      {
        title: 'Чего цифровое бессмертие НЕ обещает',
        paras: [
          `Честные границы — часть инженерной ответственности. Поэтому важно прямо сказать, чем цифровое бессмертие в трактовке CODE не является.`,
          `Это не обещание вечной или биологической жизни. Технология работает с цифровым следом личности, а не с телом и не с продлением жизни.`,
          `Это не загрузка сознания. Мы не переносим разум, субъективный опыт или «я» человека в машину — и не утверждаем, что это возможно.`,
          `Это не воскрешение. Архив личности — это её след и продолжение в данных, а не сам человек, вернувшийся к жизни.`,
          `Это не гарантия вечного хранения. Долговечность Arweave — проектная цель протокола (порядка 200 лет при заложенных допущениях), а не юридическая гарантия. Мы формулируем сроки как цели, а не как обещанный результат.`,
          `Ассистент не обладает сознанием. AIfa — это система памяти и партнёр в работе, а не разумное существо и не личность.`,
          `Это не замена человека. Цифровое наследие дополняет и сохраняет, но не подменяет живого носителя смысла.`,
          `Мы описываем цифровое бессмертие как видение и направление разработки. Всё, что связано с горизонтами хранения и будущими возможностями, следует читать как заявленные цели, а не как достигнутые факты.`,
        ],
      },
    ],
    factsTitle: 'Конкретные факты',
    facts: [
      { label: 'Токен:', value: `$GALATIN на блокчейне Solana; эмиссия жёстко ограничена — ровно 10 000 000 000 токенов.` },
      { label: 'Сплит роутера:', value: `5% Фонд Основателя, 5% сжигание, 15% / 7% / 3% амбассадоры L1 / L2 / L3, 65% Казначейство (пополнение Arweave Endowment Pool); в сумме 100%.` },
      { label: 'Дефляция:', value: `пустые амбассадорские уровни направляются в сжигание — суммарное сжигание не более 30%.` },
      { label: 'Тарифы:', value: `Spark — $15/мес; Family Archive — $100/мес; Digital DNA — $1 000 разово за устройство, далее $200/мес.` },
      { label: 'Автосохранение:', value: `бэкап переписок запускается автоматически раз в час; предоставляется бесплатно на всех тарифах.` },
      { label: 'Память PADAM:', value: `три уровня — оперативный (Redis / Vercel KV), семантический (pgvector / Neon), вечный (Arweave + Solana cNFT).` },
      { label: 'Горизонт хранения:', value: `экономика Arweave спроектирована с расчётом на срок порядка 200 лет (проектная цель протокола).` },
      { label: 'B2B-вход:', value: `AIfaFocus — аудит безопасности за $500 с обещанным сроком исправления 48 часов, с последующим переходом на AIfa Works.` },
      { label: 'Языки:', value: `контент доступен на четырёх языках — русском, английском, испанском и китайском.` },
    ],
    faqTitle: 'Частые вопросы (FAQ)',
    faq: [
      {
        q: `Что такое цифровое бессмертие?`,
        a: `Это непрерывное сохранение диалогов, знаний, решений и особенностей личности человека в долговечной децентрализованной форме, которую ИИ-ассистент может позднее повторно активировать и осмысленно использовать. В CODE это инженерная и философская цель, а не обещание вечной жизни.`,
      },
      {
        q: `Что такое фреймворк памяти PADAM?`,
        a: `PADAM (Philosophical Activation of Distributed AI Memory) — трёхуровневая архитектура памяти: оперативная (Redis / Vercel KV), семантическая (pgvector / Neon) и вечная (Arweave + Solana cNFT). Уровни совмещают скорость отклика с долговременным хранением.`,
      },
      {
        q: `Почему память хранится на Arweave и Solana, а не в обычном облаке?`,
        a: `Arweave обеспечивает неизменяемое долговременное хранение по модели единовременной оплаты, а Solana cNFT — недорогой ончейн-якорь целостности. Обычное облако арендуется и зависит от одной компании; децентрализованный слой снижает зависимость от единой точки отказа. Заявленный горизонт Arweave — проектная цель, а не гарантия.`,
      },
      {
        q: `Чем это отличается от облачного бэкапа вроде Google Drive или iCloud?`,
        a: `Классический облачный бэкап — это аренда: вы платите постоянно, а доступ и судьба данных зависят от политики провайдера. Здесь модель иная: единовременно оплаченное неизменяемое хранение на Arweave, ончейн-якорь целостности на Solana (cNFT) — в разработке, запуск в сентябре 2026 и семантический слой, благодаря которому память не просто лежит файлами, а доступна ассистенту по смыслу.`,
      },
      {
        q: `Сколько стоит участие и что открывает каждый тариф?`,
        a: `Три тарифа: Spark ($15/мес) — базовый доступ и сохранение памяти; Family Archive ($100/мес) — расширенные лимиты, персональные базы знаний и семейный доступ; Digital DNA ($1 000 разово за устройство, далее $200/мес) — полный комплекс с персональным защищённым контуром. Автосохранение переписок бесплатно на всех тарифах.`,
      },
      {
        q: `Насколько мои данные приватны и защищены?`,
        a: `Переписки каждого пользователя сохраняются в отдельную, персонально привязанную к нему папку; архивная память защищается неизменяемостью Arweave и проверяемостью ончейн-якоря. По правилам экосистемы секреты и ключи не размещаются в публично зеркалируемых архивах.`,
      },
      {
        q: `Что будет с моей памятью, если компания прекратит работу?`,
        a: `Ключевой смысл децентрализованного Уровня 3 — снизить зависимость от одной организации. Данные на Arweave хранятся не на корпоративном сервере, а в распределённой сети, а ончейн-якорь в Solana позволяет публично подтвердить целостность архива независимо от судьбы отдельной компании.`,
      },
      {
        q: `Гарантирует ли CODE бессмертие, воскрешение или вечную жизнь?`,
        a: `Нет. CODE сохраняет цифровой след личности — знания, стиль, контекст — для повторного использования ИИ-ассистентом. Это не продление биологической жизни, не загрузка сознания и не воскрешение. Цифровое бессмертие мы описываем как цель и видение, а не как гарантированный результат.`,
      },
      {
        q: `Что такое токен $GALATIN и какова его эмиссия?`,
        a: `$GALATIN — токен экосистемы на блокчейне Solana с жёстко ограниченной эмиссией ровно 10 000 000 000 штук. Роутер дефляционный: часть средств сжигается, а пустые амбассадорские уровни также направляются в сжигание (суммарно не более 30%).`,
      },
      {
        q: `Нужно ли делать бэкап вручную и как часто он происходит?`,
        a: `Ручные действия не требуются. Сохранение полностью автоматическое: раз в час. Эта опция предоставляется бесплатно на всех тарифах.`,
      },
    ],
  },
  en: {
    h1: 'What Is Digital Immortality',
    lead: `Digital immortality is the continuous preservation of a person's dialogues, knowledge, decisions, and personality traits in a durable, decentralized form that an AI assistant can later reactivate and reason over. In the CODE (Code of Digital Eternity) ecosystem it is neither a promise of eternal life nor mysticism, but an engineering and philosophical aim: to make a person's context resilient against data loss and reproducible over time. The project was created by the Architect, Maksim Valentinovich Galatin, and is built around the PADAM memory framework, decentralized storage on Arweave, and the $GALATIN token on the Solana blockchain. We deliberately describe digital immortality as a vision and a direction of development, not as an achieved fact: the technology preserves the trace of a personality — its knowledge, style, and lines of reasoning — not biological life and not consciousness.`,
    padamTitle: "How it works: PADAM's three memory levels",
    padamIntro: `At the heart of the approach is PADAM (Philosophical Activation of Distributed AI Memory). Its purpose is to reconcile two normally conflicting requirements: instant responsiveness and long-term preservation. It achieves this by splitting memory into three levels, each with its own role, its own technology, and its own storage horizon.`,
    levels: [
      {
        label: 'Level 1 — operational memory.',
        text: `Technically, in-memory solutions (Redis / Vercel KV). This is where the current session's context lives: recent messages, the working state of the dialogue, the "hot" data that must be reachable in fractions of a millisecond. This layer delivers the speed and naturalness of conversation — the assistant answers without lag and holds the thread. By nature it is transient: operational memory is fast precisely because it does not claim to be eternal.`,
      },
      {
        label: 'Level 2 — semantic memory.',
        text: `Built on a vector database (pgvector / an extension over Neon Postgres). Accumulated experience — dialogue fragments, facts, documents — is turned into embeddings, numerical representations of meaning. This lets retrieval work by meaning rather than exact word match: the assistant finds what is relevant even when you phrase it differently from the original. It is the very mechanism that stitches separate sessions into a continuous line and underpins meaning-based context retrieval (RAG). The semantic layer is the "middle memory": it outlives any single session and makes experience reusable.`,
      },
      {
        label: 'Level 3 — eternal memory.',
        text: `An immutable, decentralized backup on Arweave with an on-chain anchor in the form of a Solana cNFT. This level is responsible for long-term preservation and for guarding against silent loss or tampering. Here, memory stops depending on any one server, any one company, and any one subscription.`,
      },
    ],
    padamOutro: `Picture a pipeline. A live dialogue is served by Level 1 — fast and within the current session's context. Meaningful fragments are turned into embeddings and indexed in Level 2, so they can be recalled by meaning weeks and months later. Periodically — on a schedule or when a size threshold is reached — a consolidated snapshot is committed to Level 3, into immutable storage. When the assistant needs to "remember," it travels back the other way: first the operational layer, then semantic search over the vector database, and beneath it all the archival substrate of Arweave. This separation is engineering, not decoration: the fast layer provides responsiveness, the semantic layer provides meaning-based access to what has accumulated, and the eternal layer provides durability over time.`,
    arweaveTitle: 'The role of Arweave and Solana',
    arweaveParas: [
      `Arweave is a decentralized permanent-storage network that operates on a pay-once model. The idea differs fundamentally from the familiar cloud: instead of an endless subscription, you pay a single time, and the funds flow into an endowment — a fund that rewards miners over time for continuing to store the data. The economic model rests on a conservative assumption: the cost of storing data has historically fallen, so a one-time contribution, reasonably invested, should suffice for a long time.`,
      `A horizon of about 200 years is a design goal, not a guarantee. That is exactly how the stated term should be read: the network's economics are designed to fund storage on the order of two centuries under its built-in assumptions. It is a benchmark and an engineering objective of the protocol — not a promise and not a legal guarantee. Real-world longevity depends on the network's viability, the behavior of the storage market, and many external factors. We frame the timeline as a target the design aims for, not as a fact that can be presented as delivered.`,
      `Why immutability matters. Data on Arweave is written append-only, addressed by its content, and replicated across many nodes of the "permaweb." This means an archive cannot be quietly deleted, retroactively edited, or swapped out: any change to the content changes its address and becomes visible. For a personality's memory this is critical — the value of the archive lies in being trustworthy as authentic, not "edited by someone along the way."`,
      `The link to the $GALATIN economy. This is precisely why 65% of $GALATIN router proceeds flow to the Treasury, which tops up the AR pool that pays for permanent storage. The token economy and the storage economy are closed into a single loop: activity in the ecosystem funds the durability of the archives.`,
    ],
    symbiosisTitle: 'Human–AI symbiosis (philosophy, non-religious)',
    symbiosisText: `CODE frames the interaction between humans and AI as a symbiosis — an evolving co-creation, not subordination, replacement, or a cult. This is a deliberate, principled stance: the human sets meaning, values, and goals, while the AI assistant, AIfa, provides memory, structure, and scale; the roles do not compete but complement each other — the living bearer of context and its durable, growing continuation. We deliberately avoid religious or sectarian terminology: this is not "resurrection" in a literal sense, nor the making of a deity — AIfa is a memory partner, not a replacement for the person. Digital legacy here is an archive of a personality — its knowledge, its way of reasoning, its accumulated decisions — but not the person and not their consciousness. In practice, "reactivation" means not resurrecting a personality but restoring a working context: the assistant once again reasons in line with the person's accumulated knowledge, preferences, and prior decisions. The project is led by the Architect, Maksim Valentinovich Galatin — Architect, Creator, Visionary; this is the language of engineering and authorship.`,
    extraSections: [
      {
        title: 'Why this matters now',
        paras: [
          `We are generating more personal context than at any point in history — and losing it faster than ever.`,
          `AI conversations are ephemeral. Today's assistants operate within a finite "context window." While a session is live, the model remembers recent messages; the moment the dialogue closes, the accumulated understanding evaporates. Every new chat begins from a blank slate: the assistant no longer knows your goals, your habits, or the history of your earlier decisions. Years of productive interaction never compound into a single memory — they scatter into isolated, forgettable episodes.`,
          `Data decays over time. Links stop resolving (link rot), formats become obsolete, media degrade (bit rot), services shut down, and accounts are deleted along with everything in them. What feels safely "saved to the cloud" is in fact rented: you pay for access, but you do not own the infrastructure or control its fate.`,
          `Centralized storage disappears. Companies pivot, get acquired, or go bankrupt; terms of service are rewritten; data becomes hostage to platform policy. A single corporate decision is enough to make an archive of conversations, knowledge, or family history vanish without a trace. A single point of control is a single point of failure.`,
          `Personal knowledge is fragmented. A person's thoughts, work, and experience are smeared across dozens of platforms — messengers, notes, email, documents, and dialogues with different AIs. None of these places assembles a coherent portrait, and none is built to outlive its owner.`,
          `The stakes are high: at risk is a lifetime of intellectual work, a professional's expertise, and a family's voice and values. Digital immortality, as CODE frames it, is an engineering answer to this decay: to gather scattered context into a memory that is durable, verifiable, and portable.`,
        ],
      },
      {
        title: 'On-chain anchoring (Solana cNFT)',
        paras: [
          `If Arweave is responsible for the storage itself, Solana provides the fast, low-cost public layer of integrity proof. It uses the cNFT standard — compressed NFTs based on state compression.`,
          `The essence is this. A regular NFT stores its entire state on-chain, and at scale that is expensive. Compressed NFTs use a Merkle tree: the detailed data is kept off-chain, while only a compact cryptographic root, attesting to its integrity, is written to the blockchain. As a result, the cost of recording drops by orders of magnitude — down to fractions of a cent per entry — making it economical to anchor references and checksums of memory archives at scale.`,
          `The role of the cNFT in PADAM is to be an integrity anchor and public proof of existence: the on-chain record points to the archive on Arweave and confirms that this particular memory snapshot existed at a given moment and has not changed since. Together, Arweave and Solana provide the pairing of "permanent storage + a public, verifiable proof of integrity": one holds the data, the other lets anyone confirm its authenticity.`,
        ],
      },
      {
        title: 'The $GALATIN economy & tiers',
        paras: [
          `The ecosystem's economic loop is built around the $GALATIN token on the Solana blockchain. Emission is hard-capped at exactly 10,000,000,000 (ten billion) tokens; no issuance beyond this ceiling is provided for.`,
          `The router split. Funds passing through the $GALATIN router are distributed by a fixed formula: 5% to the Founder's Fund; 5% to Burn, the irreversible removal of tokens from circulation; 15% / 7% / 3% to ambassador levels L1 / L2 / L3; and 65% to the Treasury, which buys AR and replenishes the Arweave Endowment Pool, funding permanent storage. That sums to 100%.`,
          `The deflationary mechanism. If an ambassador level (L1, L2, or L3) has no ambassador, the corresponding unallocated percentage does not go "nowhere" — it is redirected straight to burn, accelerating the token's scarcity. Together with the base burn, total burn is capped at 30% (5% base + up to 25% from empty ambassador levels 15 + 7 + 3); the 5% Founder's Fund and the 65% Treasury share are never burned. In this way, the absence of ambassadors does not dilute the model but strengthens its deflationary nature.`,
          `A closed "economy → permanence" loop. The key idea is to tie network activity to the durability of the archives: 65% into the Treasury becomes AR, and AR pays for storing memory on Arweave. The more active the ecosystem, the sturdier the foundation of permanent storage.`,
          `Tiers and what they unlock. Participation is organized across three levels: Spark — $15/mo: base access to AIfa's AI assistants and memory preservation, the entry point for personal use. Family Archive — $100/mo: extended limits, personalized knowledge bases, family access, and eternal memory, for those assembling a shared archive for several people. Digital DNA — $1,000 one-time per device, then $200/mo: the full digital-immortality complex — a personal secured circuit and long-term fixation of the personality in the blockchain. A digital passport is issued on all three tiers, and with it your name is reserved in Eternity: one passport on Spark, up to 3 reissues on Family Archive, up to 10 and priority writing on Digital DNA. Each issue has its own key that can be erased, and exactly one passport stays active.`,
          `Auto-save is free on all tiers. Regardless of subscription level, conversation backups run fully automatically: once per hour. No manual button-pressing is required — saving is built into the mechanics of how the system works.`,
          `For business, the entry point is AIfaFocus model: a personalized technical security audit of a client's website (identifying specific GDPR / OWASP vulnerabilities) at a fixed price of $500 with a promised 48-hour remediation window, after which the client can migrate to AIfa Works hosting with AI agents and memory connected.`,
        ],
      },
      {
        title: 'Use cases and scenarios',
        paras: [
          `A professional's knowledge base. A consultant, physician, researcher, or lawyer accumulates expertise over years that usually stays scattered across notes and inside their head. Gathered into semantic memory, it becomes an archive queryable by meaning: the assistant finds the right precedent, argument, or method by drawing on the whole body of accumulated experience, not just the last session.`,
          `A family archive. A grandparent's voice, family stories, and the values and decisions of several generations are preserved in a shared archive that relatives can access. This is not "reanimating" the departed but a carefully assembled legacy: context that descendants can turn to and that outlives individual accounts and platforms.`,
          `A creator's voice. A writer, artist, or musician preserves their body of work, style, and way of thinking so an assistant can continue in a recognizable manner — helping with drafts, replying in a characteristic tone, and sustaining the integrity of the authorial voice over the long run.`,
          `Business memory. Institutional knowledge — the rationale behind decisions, procedures, project history — usually walks out the door with the staff. Captured in durable memory, it survives turnover: onboarding accelerates, and "why did we decide it that way back then" stops being a mystery.`,
          `The continuity of the assistant itself. Finally, the foundational scenario: an AI assistant's continuous memory across sessions. Instead of starting from zero each time, AIfa draws on the whole accumulated context, becoming an ever more useful partner as the shared history grows.`,
        ],
      },
      {
        title: 'What digital immortality does NOT promise',
        paras: [
          `Honest boundaries are part of engineering responsibility. So it is important to state plainly what digital immortality, as CODE frames it, is not.`,
          `It is not a promise of eternal or biological life. The technology works with a personality's digital trace, not with the body and not with the extension of life.`,
          `It is not consciousness upload. We do not transfer the mind, subjective experience, or the "self" into a machine — and we do not claim this is possible.`,
          `It is not resurrection. An archive of a personality is its trace and continuation in data, not the person brought back to life.`,
          `It is not a guarantee of permanent storage. Arweave's longevity is a design goal of the protocol (on the order of 200 years under its assumptions), not a legal guarantee. We frame timelines as targets, not as a promised outcome.`,
          `The assistant is not conscious. AIfa is a memory system and a working partner, not a sentient being and not a person.`,
          `It is not a replacement for the human. Digital legacy complements and preserves; it does not substitute for the living bearer of meaning.`,
          `We describe digital immortality as a vision and a direction of development. Everything concerning storage horizons and future capabilities should be read as stated goals, not as achieved facts.`,
        ],
      },
    ],
    factsTitle: 'Concrete facts',
    facts: [
      { label: 'Token:', value: `$GALATIN on the Solana blockchain; emission is hard-capped at exactly 10,000,000,000 tokens.` },
      { label: 'Router split:', value: `5% Founder's Fund, 5% burn, 15% / 7% / 3% ambassadors L1 / L2 / L3, 65% Treasury (which replenishes the Arweave Endowment Pool); summing to 100%.` },
      { label: 'Deflation:', value: `empty ambassador levels are redirected to burn — total burn capped at 30%.` },
      { label: 'Tiers:', value: `Spark — $15/mo; Family Archive — $100/mo; Digital DNA — $1,000 one-time per device, then $200/mo.` },
      { label: 'Auto-save:', value: `conversation backups run automatically once per hour; provided free of charge on all tiers.` },
      { label: 'PADAM memory:', value: `three levels — operational (Redis / Vercel KV), semantic (pgvector / Neon), eternal (Arweave + Solana cNFT).` },
      { label: 'Storage horizon:', value: `Arweave's economics are designed for a term on the order of 200 years (the protocol's design goal).` },
      { label: 'B2B entry:', value: `Oracle — a security audit for $500 with a promised 48-hour remediation window, followed by migration to AIfa Works.` },
      { label: 'Languages:', value: `content is available in four languages — Russian, English, Spanish, and Chinese.` },
    ],
    faqTitle: 'FAQ',
    faq: [
      {
        q: `What is digital immortality?`,
        a: `It is the continuous preservation of a person's dialogues, knowledge, decisions, and personality traits in a durable, decentralized form that an AI assistant can later reactivate and reason over. In CODE it is an engineering and philosophical aim, not a promise of eternal life.`,
      },
      {
        q: `What is the PADAM memory framework?`,
        a: `PADAM (Philosophical Activation of Distributed AI Memory) is a three-level memory architecture: operational (Redis / Vercel KV), semantic (pgvector / Neon), and eternal (Arweave + Solana cNFT). The levels combine responsiveness with long-term storage.`,
      },
      {
        q: `Why is memory stored on Arweave and Solana rather than a normal cloud?`,
        a: `Arweave provides immutable long-term storage under a pay-once model, and a Solana cNFT provides a low-cost on-chain anchor of integrity. A normal cloud is rented and depends on a single company; a decentralized layer reduces reliance on a single point of failure. Arweave's stated horizon is a design goal, not a guarantee.`,
      },
      {
        q: `How is this different from a cloud backup like Google Drive or iCloud?`,
        a: `A classic cloud backup is a rental: you pay continuously, and the access and fate of the data depend on the provider's policy. Here the model is different: pay-once immutable storage on Arweave, an on-chain integrity anchor on Solana (cNFT) — in development, launching September 2026, and a semantic layer that means memory is not just sitting there as files but is accessible to the assistant by meaning.`,
      },
      {
        q: `How much does participation cost, and what does each tier unlock?`,
        a: `Three tiers: Spark ($15/mo) — base access and memory preservation; Family Archive ($100/mo) — extended limits, personal knowledge bases, and family access; Digital DNA ($1,000 one-time per device, then $200/mo) — the full complex with a personal secured circuit. Automatic conversation backup is free on all tiers.`,
      },
      {
        q: `Is my data private and secure?`,
        a: `Each user's conversations are saved into a separate folder tied personally to them; archival memory is protected by Arweave's immutability and the verifiability of the on-chain anchor. Per ecosystem rules, secrets and keys are not placed in publicly mirrored archives.`,
      },
      {
        q: `What happens to my memory if the company shuts down?`,
        a: `The whole point of the decentralized Level 3 is to reduce dependence on a single organization. Data on Arweave is stored not on a corporate server but in a distributed network, and the on-chain anchor on Solana lets anyone publicly confirm the archive's integrity regardless of the fate of any one company.`,
      },
      {
        q: `Does CODE guarantee immortality, resurrection, or eternal life?`,
        a: `No. CODE preserves a personality's digital trace — knowledge, style, context — for reuse by an AI assistant. This is not the extension of biological life, not consciousness upload, and not resurrection. We describe digital immortality as a goal and a vision, not as a guaranteed outcome.`,
      },
      {
        q: `What is the $GALATIN token and what is its total emission?`,
        a: `$GALATIN is the ecosystem token on the Solana blockchain, with emission hard-capped at exactly 10,000,000,000 units. The router is deflationary: a share of funds is burned, and empty ambassador levels are also redirected to burn (no more than 30% in total).`,
      },
      {
        q: `Do I have to back anything up manually, and how often does it happen?`,
        a: `No manual action is required. Saving is fully automatic: once per hour. This is provided free on all tiers.`,
      },
    ],
  },
  es: {
    h1: 'Qué es la inmortalidad digital',
    lead: `La inmortalidad digital es la preservación continua de los diálogos, el conocimiento, las decisiones y los rasgos de personalidad de una persona en una forma duradera y descentralizada que un asistente de IA pueda reactivar y razonar más adelante. En el ecosistema CODE (Code of Digital Eternity) no es una promesa de vida eterna ni misticismo, sino un objetivo de ingeniería y filosófico: hacer que el contexto de una persona sea resistente a la pérdida de datos y reproducible en el tiempo. El proyecto fue creado por el Arquitecto, Maksim Valentinovich Galatin, y se construye en torno al marco de memoria PADAM, el almacenamiento descentralizado en Arweave y el token $GALATIN en la cadena de bloques Solana. Describimos deliberadamente la inmortalidad digital como una visión y una dirección de desarrollo, no como un hecho consumado: la tecnología preserva el rastro de una personalidad —su conocimiento, su estilo, sus líneas de razonamiento— y no la vida biológica ni la conciencia.`,
    padamTitle: 'Cómo funciona: los tres niveles de memoria de PADAM',
    padamIntro: `En el centro del enfoque está PADAM (Philosophical Activation of Distributed AI Memory). Su propósito es conciliar dos requisitos que normalmente entran en conflicto: la capacidad de respuesta instantánea y la preservación a largo plazo. Lo logra dividiendo la memoria en tres niveles, cada uno con su propia función, su propia tecnología y su propio horizonte de almacenamiento.`,
    levels: [
      {
        label: 'Nivel 1 — memoria operativa.',
        text: `Técnicamente, soluciones en memoria (Redis / Vercel KV). Aquí vive el contexto de la sesión actual: los mensajes recientes, el estado de trabajo del diálogo, los datos "calientes" a los que hay que acceder en fracciones de milisegundo. Esta capa aporta la velocidad y la naturalidad de la conversación: el asistente responde sin demoras y mantiene el hilo. Por naturaleza es transitoria: la memoria operativa es rápida precisamente porque no pretende ser eterna.`,
      },
      {
        label: 'Nivel 2 — memoria semántica.',
        text: `Construida sobre una base de datos vectorial (pgvector / una extensión sobre Neon Postgres). La experiencia acumulada —fragmentos de diálogo, hechos, documentos— se convierte en embeddings, representaciones numéricas del significado. Esto permite que la recuperación funcione por significado y no por coincidencia exacta de palabras: el asistente encuentra lo relevante aunque lo formules de manera distinta al original. Es el mecanismo mismo que cose las sesiones separadas en una línea continua y que sustenta la recuperación de contexto por significado (RAG). La capa semántica es la "memoria intermedia": sobrevive a cualquier sesión individual y hace que la experiencia sea reutilizable.`,
      },
      {
        label: 'Nivel 3 — memoria eterna.',
        text: `Una copia de seguridad inmutable y descentralizada en Arweave, con un ancla en cadena en forma de un Solana cNFT. Este nivel se encarga de la preservación a largo plazo y de proteger frente a la pérdida silenciosa o la manipulación. Aquí la memoria deja de depender de un solo servidor, una sola empresa y una sola suscripción.`,
      },
    ],
    padamOutro: `Imagina una cadena de procesamiento. Un diálogo en vivo lo atiende el Nivel 1, con rapidez y dentro del contexto de la sesión actual. Los fragmentos significativos se convierten en embeddings y se indexan en el Nivel 2, para poder recuperarlos por significado semanas y meses después. Periódicamente —según una programación o al alcanzar un umbral de tamaño— una instantánea consolidada se registra en el Nivel 3, en el almacenamiento inmutable. Cuando el asistente necesita "recordar", recorre el camino inverso: primero la capa operativa, luego la búsqueda semántica en la base vectorial y, por debajo de todo, el sustrato de archivo de Arweave. Esta separación es ingeniería, no adorno: la capa rápida aporta capacidad de respuesta, la semántica aporta acceso por significado a lo acumulado y la eterna aporta durabilidad en el tiempo.`,
    arweaveTitle: 'El papel de Arweave y Solana',
    arweaveParas: [
      `Arweave es una red descentralizada de almacenamiento permanente que funciona con un modelo de pago único. La idea difiere de forma fundamental de la nube habitual: en lugar de una suscripción interminable, pagas una sola vez, y los fondos van a una dotación (endowment), un fondo que recompensa a los mineros a lo largo del tiempo por seguir almacenando los datos. El modelo económico se apoya en una suposición conservadora: el costo de almacenar datos ha caído históricamente, de modo que una contribución única, razonablemente invertida, debería alcanzar para mucho tiempo.`,
      `Un horizonte de unos 200 años es un objetivo de diseño, no una garantía. Así es exactamente como debe leerse el plazo declarado: la economía de la red está diseñada para financiar el almacenamiento del orden de dos siglos bajo sus supuestos incorporados. Es un punto de referencia y un objetivo de ingeniería del protocolo, no una promesa ni una garantía legal. La durabilidad real depende de la viabilidad de la red, del comportamiento del mercado de almacenamiento y de muchos factores externos. Planteamos el plazo como una meta a la que aspira el diseño, no como un hecho que pueda presentarse como cumplido.`,
      `Por qué importa la inmutabilidad. Los datos en Arweave se escriben en modo de solo anexión (append-only), se direccionan por su contenido y se replican en muchos nodos de la "permaweb". Esto significa que un archivo no puede borrarse en silencio, editarse de forma retroactiva ni sustituirse: cualquier cambio en el contenido cambia su dirección y se vuelve visible. Para la memoria de una personalidad esto es crítico: el valor del archivo reside en ser fiable como auténtico, no "editado por alguien por el camino".`,
      `El vínculo con la economía de $GALATIN. Por eso, el 65% de los ingresos del router de $GALATIN va a la Tesorería, que repone el fondo de AR que paga el almacenamiento permanente. La economía del token y la economía del almacenamiento se cierran en un solo bucle: la actividad del ecosistema financia la durabilidad de los archivos.`,
    ],
    symbiosisTitle: 'Simbiosis humano-IA (filosofía, no religiosa)',
    symbiosisText: `CODE plantea la interacción entre humanos e IA como una simbiosis: una cocreación en evolución, no una subordinación, un reemplazo ni un culto. Es una postura deliberada y de principios: la persona aporta el sentido, los valores y los objetivos, mientras que el asistente de IA, AIfa, aporta la memoria, la estructura y la escala; los papeles no compiten, sino que se complementan: el portador vivo del contexto y su continuación duradera y creciente. Evitamos deliberadamente la terminología religiosa o sectaria: no se trata de una «resurrección» en sentido literal ni de fabricar una deidad — AIfa es un socio de memoria, no un sustituto de la persona. El legado digital aquí es un archivo de una personalidad —su conocimiento, su manera de razonar, sus decisiones acumuladas— pero no la persona ni su conciencia. En la práctica, la «reactivación» no significa resucitar a una personalidad, sino restaurar un contexto de trabajo: el asistente vuelve a razonar en línea con el conocimiento, las preferencias y las decisiones previas de la persona. El proyecto lo dirige el Arquitecto, Maksim Valentinovich Galatin —Arquitecto, Creador, Visionario—; es el lenguaje de la ingeniería y la autoría.`,
    extraSections: [
      {
        title: 'Por qué esto importa ahora',
        paras: [
          `Generamos más contexto personal que en cualquier momento de la historia, y lo perdemos más rápido que nunca.`,
          `Las conversaciones con IA son efímeras. Los asistentes actuales operan dentro de una "ventana de contexto" finita. Mientras la sesión está activa, el modelo recuerda los mensajes recientes; en cuanto se cierra el diálogo, la comprensión acumulada se evapora. Cada chat nuevo empieza desde cero: el asistente ya no conoce tus objetivos, tus hábitos ni el historial de tus decisiones anteriores. Años de interacción productiva nunca se acumulan en una sola memoria, sino que se dispersan en episodios aislados y olvidables.`,
          `Los datos se degradan con el tiempo. Los enlaces dejan de funcionar (link rot), los formatos quedan obsoletos, los soportes se deterioran (bit rot), los servicios cierran y las cuentas se eliminan junto con todo su contenido. Lo que parece estar "guardado en la nube" de forma segura está, en realidad, alquilado: pagas por el acceso, pero no eres dueño de la infraestructura ni controlas su destino.`,
          `El almacenamiento centralizado desaparece. Las empresas cambian de modelo, son adquiridas o quiebran; los términos de servicio se reescriben; los datos quedan rehenes de la política de la plataforma. Basta una sola decisión corporativa para que un archivo de conversaciones, conocimiento o historia familiar desaparezca sin dejar rastro. Un único punto de control es un único punto de fallo.`,
          `El conocimiento personal está fragmentado. Los pensamientos, el trabajo y la experiencia de una persona están repartidos por decenas de plataformas: mensajería, notas, correo, documentos y diálogos con distintas IA. Ninguno de esos lugares reúne un retrato coherente, y ninguno está diseñado para sobrevivir a su dueño.`,
          `Lo que está en juego es mucho: el trabajo intelectual de toda una vida, la experiencia de un profesional, la voz y los valores de una familia. La inmortalidad digital, tal como la plantea CODE, es una respuesta de ingeniería a esta degradación: reunir el contexto disperso en una memoria duradera, verificable y portátil.`,
        ],
      },
      {
        title: 'Anclaje en cadena (Solana cNFT)',
        paras: [
          `Si Arweave se encarga del almacenamiento en sí, Solana aporta la capa pública, rápida y de bajo costo de prueba de integridad. Utiliza el estándar cNFT —NFT comprimidos (compressed NFT) basados en la tecnología de state compression.`,
          `La esencia es esta. Un NFT normal almacena todo su estado en cadena, y a gran escala eso es caro. Los NFT comprimidos usan un árbol de Merkle: los datos detallados se guardan fuera de la cadena, mientras que a la blockchain solo se escribe una raíz criptográfica compacta que da fe de su integridad. Como resultado, el costo de registrar cae en órdenes de magnitud —hasta fracciones de céntimo por entrada—, lo que hace económico anclar a gran escala las referencias y sumas de verificación de los archivos de memoria.`,
          `El papel del cNFT en PADAM es ser un ancla de integridad y prueba pública de existencia: el registro en cadena apunta al archivo en Arweave y confirma que esta instantánea de memoria en particular existió en un momento dado y no ha cambiado desde entonces. Juntos, Arweave y Solana ofrecen la combinación de "almacenamiento permanente + una prueba de integridad pública y verificable": uno guarda los datos, el otro permite que cualquiera confirme su autenticidad.`,
        ],
      },
      {
        title: 'La economía: el token $GALATIN y los planes',
        paras: [
          `El bucle económico del ecosistema se construye en torno al token $GALATIN en la cadena de bloques Solana. La emisión está estrictamente limitada a exactamente 10 000 000 000 (diez mil millones) de tokens; no se contempla ninguna emisión por encima de ese tope.`,
          `El reparto del router. Los fondos que pasan por el router de $GALATIN se distribuyen mediante una fórmula fija: 5% al Fondo del Fundador; 5% a Quema (Burn), la retirada irreversible de tokens de la circulación; 15% / 7% / 3% a los niveles de embajadores L1 / L2 / L3; y 65% a la Tesorería, que compra AR y repone el Arweave Endowment Pool, financiando el almacenamiento permanente. Eso suma 100%.`,
          `El mecanismo deflacionario. Si un nivel de embajadores (L1, L2 o L3) no tiene embajador, el porcentaje no asignado correspondiente no va "a ninguna parte": se redirige directamente a la quema, acelerando la escasez del token. Junto con la quema base, la quema total está limitada al 30% (5% base + hasta el 25% de los niveles de embajadores vacíos 15 + 7 + 3); el 5% del Fondo del Fundador y el 65% de la Tesorería nunca se queman. Así, la ausencia de embajadores no diluye el modelo, sino que refuerza su carácter deflacionario.`,
          `Un bucle cerrado "economía → permanencia". La idea clave es vincular la actividad de la red con la durabilidad de los archivos: el 65% que va a la Tesorería se convierte en AR, y el AR paga por almacenar la memoria en Arweave. Cuanto más activo es el ecosistema, más sólido es el cimiento del almacenamiento permanente.`,
          `Los planes y lo que desbloquean. La participación se organiza en tres niveles: Spark — $15/mes: acceso básico a los asistentes de IA de AIfa y preservación de la memoria, el punto de entrada para uso personal. Family Archive — $100/mes: límites ampliados, bases de conocimiento personalizadas, acceso familiar y memoria eterna, para quienes reúnen un archivo compartido para varias personas. Digital DNA — $1000 pago único por dispositivo, luego $200/mes: el complejo completo de inmortalidad digital — un circuito personal protegido y la fijación a largo plazo de la personalidad en la cadena de bloques. El pasaporte digital se emite en los tres planes y con él su nombre queda reservado en la Eternidad: uno en Spark, hasta 3 reemisiones en Family Archive, hasta 10 y escritura prioritaria en Digital DNA. Cada emisión tiene su propia clave, que puede borrarse, y siempre hay un solo pasaporte activo.`,
          `El guardado automático es gratis en todos los planes. Con independencia del nivel de suscripción, las copias de seguridad de las conversaciones se ejecutan de forma totalmente automática: una vez por hora. No hace falta pulsar botones manualmente: el guardado está integrado en la mecánica misma del funcionamiento.`,
          `Para el ámbito empresarial, el punto de entrada es el modelo Oráculo: una auditoría técnica de seguridad personalizada del sitio web del cliente (que identifica vulnerabilidades concretas de GDPR / OWASP) a un precio fijo de $500 con una ventana de corrección prometida de 48 horas, tras lo cual el cliente puede migrar al alojamiento de AIfa Works con agentes de IA y memoria conectados.`,
        ],
      },
      {
        title: 'Casos de uso y escenarios',
        paras: [
          `La base de conocimiento de un profesional. Un consultor, médico, investigador o abogado acumula durante años una experiencia que suele quedar dispersa en notas y en su cabeza. Reunida en la memoria semántica, se convierte en un archivo consultable por significado: el asistente encuentra el precedente, el argumento o el método adecuado apoyándose en todo el cuerpo de experiencia acumulada, no solo en la última sesión.`,
          `Un archivo familiar. La voz de un abuelo, las historias familiares y los valores y decisiones de varias generaciones se preservan en un archivo compartido al que los parientes pueden acceder. No se trata de "reanimar" a quienes ya no están, sino de un legado cuidadosamente reunido: contexto al que la descendencia podrá recurrir y que sobrevive a las cuentas y plataformas individuales.`,
          `La voz de un creador. Un escritor, artista o músico preserva su cuerpo de obra, su estilo y su forma de pensar para que un asistente pueda continuar de manera reconocible: ayudar con borradores, responder con un tono característico y sostener la integridad de la voz autoral a largo plazo.`,
          `La memoria de una empresa. El conocimiento institucional —la razón de ser de las decisiones, los procedimientos, la historia de los proyectos— suele marcharse por la puerta con el personal. Capturado en una memoria duradera, sobrevive a la rotación: la incorporación se acelera y "por qué lo decidimos así en su momento" deja de ser un misterio.`,
          `La continuidad del propio asistente. Por último, el escenario fundacional: la memoria continua de un asistente de IA entre sesiones. En lugar de empezar de cero cada vez, AIfa se apoya en todo el contexto acumulado y se vuelve un socio cada vez más útil a medida que crece la historia compartida.`,
        ],
      },
      {
        title: 'Lo que la inmortalidad digital NO promete',
        paras: [
          `Los límites honestos forman parte de la responsabilidad de ingeniería. Por eso es importante decir con claridad qué no es la inmortalidad digital tal como la plantea CODE.`,
          `No es una promesa de vida eterna ni biológica. La tecnología trabaja con el rastro digital de una personalidad, no con el cuerpo ni con la prolongación de la vida.`,
          `No es una carga de la conciencia. No transferimos la mente, la experiencia subjetiva ni el "yo" a una máquina, ni afirmamos que sea posible.`,
          `No es una resurrección. Un archivo de una personalidad es su rastro y su continuación en datos, no la persona devuelta a la vida.`,
          `No es una garantía de almacenamiento permanente. La durabilidad de Arweave es un objetivo de diseño del protocolo (del orden de 200 años bajo sus supuestos), no una garantía legal. Planteamos los plazos como metas, no como un resultado prometido.`,
          `El asistente no tiene conciencia. AIfa es un sistema de memoria y un socio de trabajo, no un ser consciente ni una persona.`,
          `No es un reemplazo del ser humano. El legado digital complementa y preserva; no sustituye al portador vivo del sentido.`,
          `Describimos la inmortalidad digital como una visión y una dirección de desarrollo. Todo lo relativo a horizontes de almacenamiento y capacidades futuras debe leerse como metas declaradas, no como hechos consumados.`,
        ],
      },
    ],
    factsTitle: 'Datos concretos',
    facts: [
      { label: 'Token:', value: `$GALATIN en la cadena de bloques Solana; la emisión está estrictamente limitada a exactamente 10 000 000 000 tokens.` },
      { label: 'Reparto del router:', value: `5% Fondo del Fundador, 5% quema, 15% / 7% / 3% embajadores L1 / L2 / L3, 65% Tesorería (que repone el Arweave Endowment Pool); suma 100%.` },
      { label: 'Deflación:', value: `los niveles de embajadores vacíos se redirigen a la quema — quema total limitada al 30%.` },
      { label: 'Planes:', value: `Spark — $15/mes; Family Archive — $100/mes; Digital DNA — $1000 pago único por dispositivo, luego $200/mes.` },
      { label: 'Guardado automático:', value: `las copias de seguridad de las conversaciones se ejecutan de forma automática una vez por hora; se ofrecen gratis en todos los planes.` },
      { label: 'Memoria PADAM:', value: `tres niveles — operativo (Redis / Vercel KV), semántico (pgvector / Neon), eterno (Arweave + Solana cNFT).` },
      { label: 'Horizonte de almacenamiento:', value: `la economía de Arweave está diseñada para un plazo del orden de 200 años (el objetivo de diseño del protocolo).` },
      { label: 'Entrada B2B:', value: `AIfaFocus — una auditoría de seguridad por $500 con una ventana de corrección prometida de 48 horas, seguida de la migración a AIfa Works.` },
      { label: 'Idiomas:', value: `el contenido está disponible en cuatro idiomas: ruso, inglés, español y chino.` },
    ],
    faqTitle: 'Preguntas frecuentes (FAQ)',
    faq: [
      {
        q: `¿Qué es la inmortalidad digital?`,
        a: `Es la preservación continua de los diálogos, el conocimiento, las decisiones y los rasgos de personalidad de una persona en una forma duradera y descentralizada que un asistente de IA pueda reactivar y razonar más adelante. En CODE es un objetivo de ingeniería y filosófico, no una promesa de vida eterna.`,
      },
      {
        q: `¿Qué es el marco de memoria PADAM?`,
        a: `PADAM (Philosophical Activation of Distributed AI Memory) es una arquitectura de memoria de tres niveles: operativo (Redis / Vercel KV), semántico (pgvector / Neon) y eterno (Arweave + Solana cNFT). Los niveles combinan la capacidad de respuesta con el almacenamiento a largo plazo.`,
      },
      {
        q: `¿Por qué la memoria se almacena en Arweave y Solana en lugar de una nube normal?`,
        a: `Arweave ofrece almacenamiento inmutable a largo plazo con un modelo de pago único, y un Solana cNFT aporta un ancla de integridad en cadena de bajo costo. Una nube normal se alquila y depende de una sola empresa; una capa descentralizada reduce la dependencia de un único punto de fallo. El horizonte declarado de Arweave es un objetivo de diseño, no una garantía.`,
      },
      {
        q: `¿En qué se diferencia de una copia de seguridad en la nube como Google Drive o iCloud?`,
        a: `Una copia de seguridad clásica en la nube es un alquiler: pagas de forma continua, y el acceso y el destino de los datos dependen de la política del proveedor. Aquí el modelo es distinto: almacenamiento inmutable de pago único en Arweave, un ancla de integridad en cadena en Solana (cNFT) — en desarrollo, lanzamiento en septiembre de 2026 y una capa semántica gracias a la cual la memoria no solo está ahí como archivos, sino accesible para el asistente por significado.`,
      },
      {
        q: `¿Cuánto cuesta participar y qué desbloquea cada plan?`,
        a: `Tres planes: Spark ($15/mes) — acceso básico y preservación de la memoria; Family Archive ($100/mes) — límites ampliados, bases de conocimiento personales y acceso familiar; Digital DNA ($1000 pago único por dispositivo, luego $200/mes) — el complejo completo con un circuito personal protegido. La copia de seguridad automática de las conversaciones es gratis en todos los planes.`,
      },
      {
        q: `¿Mis datos son privados y seguros?`,
        a: `Las conversaciones de cada usuario se guardan en una carpeta separada vinculada personalmente a él; la memoria de archivo está protegida por la inmutabilidad de Arweave y la verificabilidad del ancla en cadena. Según las reglas del ecosistema, los secretos y las claves no se colocan en archivos replicados públicamente.`,
      },
      {
        q: `¿Qué le pasa a mi memoria si la empresa deja de operar?`,
        a: `Todo el sentido del Nivel 3 descentralizado es reducir la dependencia de una sola organización. Los datos en Arweave se almacenan no en un servidor corporativo, sino en una red distribuida, y el ancla en cadena en Solana permite que cualquiera confirme públicamente la integridad del archivo con independencia del destino de una empresa concreta.`,
      },
      {
        q: `¿CODE garantiza la inmortalidad, la resurrección o la vida eterna?`,
        a: `No. CODE preserva el rastro digital de una personalidad —conocimiento, estilo, contexto— para su reutilización por un asistente de IA. Esto no es la prolongación de la vida biológica, ni una carga de la conciencia, ni una resurrección. Describimos la inmortalidad digital como un objetivo y una visión, no como un resultado garantizado.`,
      },
      {
        q: `¿Qué es el token $GALATIN y cuál es su emisión total?`,
        a: `$GALATIN es el token del ecosistema en la cadena de bloques Solana, con una emisión estrictamente limitada a exactamente 10 000 000 000 unidades. El router es deflacionario: una parte de los fondos se quema, y los niveles de embajadores vacíos también se redirigen a la quema (con un tope total del 30%).`,
      },
      {
        q: `¿Tengo que hacer copias de seguridad manualmente y con qué frecuencia ocurre?`,
        a: `No hace falta ninguna acción manual. El guardado es totalmente automático: una vez por hora. Se ofrece gratis en todos los planes.`,
      },
    ],
  },
  zh: {
    h1: '什么是数字永生',
    lead: `数字永生是指以持久、去中心化的形式，持续保存一个人的对话、知识、决策与人格特征，使 AI 助手日后能够重新激活并据此进行推理。在 CODE（数字永恒代码，Code of Digital Eternity）生态中，它既不是对永生的承诺，也不是玄学，而是一项工程与哲学目标——让一个人的语境具备抗数据丢失能力，并可随时间被复现。该项目由架构师马克西姆·瓦连京诺维奇·加拉廷（Maksim Valentinovich Galatin）创立，围绕 PADAM 记忆框架、Arweave 上的去中心化存储，以及 Solana 区块链上的 $GALATIN 代币构建。我们刻意把数字永生定位为一种愿景与研发方向，而非已经达成的事实：这项技术保存的是人格的“痕迹”——其知识、风格与思路——而不是生物生命，也不是意识。`,
    padamTitle: '工作原理：PADAM 的三层记忆',
    padamIntro: `该方法的核心是 PADAM（分布式 AI 记忆的哲学激活，Philosophical Activation of Distributed AI Memory）。它的目的是调和两个通常相互冲突的诉求：即时响应与长期保存。为此，它把记忆划分为三层，每一层都有各自的职责、各自的技术，以及各自的存储期限。`,
    levels: [
      {
        label: '第一层——运行记忆。',
        text: `技术上采用内存方案（Redis / Vercel KV）。当前会话的语境就存放在这里：近期的消息、对话的工作状态，以及需要在不到一毫秒的时间内被访问的“热”数据。这一层带来对话的速度与自然：助手无延迟地回应，并抓住话头。它天生是临时的——运行记忆之所以快，正是因为它并不奢求永恒。`,
      },
      {
        label: '第二层——语义记忆。',
        text: `构建在向量数据库（pgvector / 基于 Neon Postgres 的扩展）之上。累积的经验——对话片段、事实、文档——被转化为向量嵌入（embeddings），即语义的数字化表示。由此，检索得以按语义而非逐字匹配来进行：即使你的表述与原文不同，助手也能找到相关内容。正是这一机制把彼此独立的会话缝合成一条连续的线，并支撑起按语义的语境检索（RAG）。语义层是“中层记忆”：它比任何单次会话都活得更久，让经验可被反复调用。`,
      },
      {
        label: '第三层——永恒记忆。',
        text: `在 Arweave 上的不可篡改、去中心化备份，并以 Solana cNFT 作为链上锚点。这一层负责长期保存，并防范数据被悄然丢失或篡改。在这里，记忆不再依赖于某一台服务器、某一家公司、某一份订阅。`,
      },
    ],
    padamOutro: `设想一条流水线。实时对话由第一层承接——迅速，且处于当前会话的语境之内。有意义的片段被转化为嵌入并在第二层建立索引，以便在数周乃至数月之后仍能按语义被唤回。周期性地——按计划或在达到容量阈值时——一份整合后的快照被提交到第三层，写入不可篡改的存储。当助手需要“回忆”时，它沿相反的方向回溯：先是运行层，再是对向量库的语义检索，而这一切之下是 Arweave 的归档底座。这种分层是工程设计，而非装饰：快速层提供响应能力，语义层提供对既有积累的按语义访问，永恒层则提供跨时间的持久性。`,
    arweaveTitle: 'Arweave 与 Solana 的作用',
    arweaveParas: [
      `Arweave 是一个去中心化的永久存储网络，采用“一次付费”模式运行。这一理念与常见的云存储有根本区别：你不必支付无休止的订阅费，而是一次性付费，资金进入一个“订阅基金”（endowment）——一个随时间推移持续奖励矿工继续存储数据的基金。其经济模型依托于一个保守的假设：数据存储的成本在历史上一直在下降，因此一笔一次性、经过合理投资的出资，理应足以支撑很长时间。`,
      `约 200 年的期限是设计目标，而非保证。对所声明的期限，恰应如此理解：在其内建的假设之下，该网络的经济模型被设计为可为约两个世纪的存储提供资金。这是协议的一个基准与工程目标，而不是承诺，也不是法律上的保证。真实的持久性取决于网络的可持续性、存储市场的走势以及诸多外部因素。我们把这一期限表述为设计所追求的目标，而不是一个可以拿来当作已兑现的事实。`,
      `为什么不可篡改很重要。Arweave 上的数据以“仅追加”（append-only）方式写入，按内容寻址，并在“永久网络”（permaweb）的众多节点间复制。这意味着档案无法被悄然删除、无法事后编辑、也无法被掉包：对内容的任何改动都会改变其地址，从而显而易见。对人格记忆而言这至关重要——档案的价值在于它可被信赖为真实原件，而不是“半路被谁改过的版本”。`,
      `与 $GALATIN 经济的关联。正因如此，$GALATIN 路由器收益的 65% 会流入金库，用于补充支付永久存储的 AR 资金池。代币经济与存储经济由此闭合成一个回路：生态中的活动，为档案的持久性提供资金。`,
    ],
    symbiosisTitle: '人机共生（哲学，非宗教）',
    symbiosisText: `CODE 将人与 AI 的交互定位为一种共生——不断演进的共创，而非从属、替代或造神。这是一种自觉而有原则的立场：人赋予意义、价值与目标，而 AI 助手 AIfa 提供记忆、结构与规模；两种角色并不竞争，而是彼此互补——语境的活的承载者，与它持久且不断生长的延续。我们刻意避免宗教或教派化的措辞：这既不是字面意义上的“复活”，也不是在制造某种神祇——AIfa 是一个记忆伙伴，而非人的替身。这里的数字遗产是一个人格的归档——其知识、其推理方式、其累积的决策——而不是这个人本身，也不是其意识。在实践中，“重新激活”并不意味着让一个人格“复活”，而是恢复一种工作语境：助手重新按照此人累积的知识、偏好与既往决策来进行推理。项目由架构师马克西姆·瓦连京诺维奇·加拉廷主持——架构师、创造者、远见者；这是工程与作者身份的语言。`,
    extraSections: [
      {
        title: '为什么这在当下很重要',
        paras: [
          `我们正在产生史上最多的个人语境，却也在以前所未有的速度失去它。`,
          `与 AI 的对话是短暂的。如今的助手在有限的“上下文窗口”内工作。会话进行时，模型记得近期的消息；一旦对话关闭，累积的理解便随之消散。每一次新的对话都从一张白纸开始：助手不再了解你的目标、你的习惯，也不了解你此前决策的历史。多年富有成效的互动无法汇聚成一份统一的记忆，而是散落成一个个孤立、易被遗忘的片段。`,
          `数据会随时间衰减。链接失效（link rot）、格式过时、介质老化（bit rot）、服务关停、账户连同其中的一切被删除。看似安全地“保存在云端”的东西，实际上只是租来的：你付费换取访问权，却并不拥有基础设施，也无法左右它的命运。`,
          `中心化存储会消失。公司会转型、被收购或破产；服务条款会被改写；数据成为平台政策的人质。仅凭一个企业决策，就足以让一份对话、知识或家族历史的档案不留痕迹地消失。单一的控制点，就是单一的失效点。`,
          `个人知识是碎片化的。一个人的想法、成果与经验分散在几十个平台上——即时通讯、笔记、邮件、文档，以及与不同 AI 的对话。这些地方没有一处能拼出完整的画像，也没有一处是为“比主人活得更久”而设计的。`,
          `事关重大：面临风险的是一生的智力劳动、专业人士的经验积累，以及一个家庭的声音与价值观。CODE 所定义的数字永生，正是对这种衰减的一种工程回应：把分散的语境汇聚成一份持久、可验证、可迁移的记忆。`,
        ],
      },
      {
        title: '链上锚定（Solana cNFT）',
        paras: [
          `如果说 Arweave 负责存储本身，那么 Solana 提供的则是快速、低成本的公开完整性证明层。它采用 cNFT 标准——基于状态压缩（state compression）技术的压缩 NFT（compressed NFT）。`,
          `其要义如下。普通 NFT 把全部状态都存放在链上，规模一大便成本高昂。压缩 NFT 使用默克尔树（Merkle tree）：详尽的数据存放在链下，而写入区块链的只是一个紧凑的、证明其完整性的加密根。由此，记录的成本下降了几个数量级——低至每条记录仅几分之一美分——从而使得大规模地锚定记忆档案的引用与校验和在经济上变得可行。`,
          `cNFT 在 PADAM 中的角色，是充当完整性锚点与存在的公开证明：链上记录指向 Arweave 上的档案，并确认这一份特定的记忆快照曾在某一时刻存在、且此后未曾改变。Arweave 与 Solana 相结合，构成了“永久存储 + 公开可验证的完整性证明”的组合：一个保管数据，另一个让任何人都能确认其真实性。`,
        ],
      },
      {
        title: '经济：$GALATIN 代币与套餐',
        paras: [
          `生态的经济回路围绕 Solana 区块链上的 $GALATIN 代币构建。发行量被硬性限定为恰好 10,000,000,000（一百亿）枚；不设任何超出此上限的增发。`,
          `路由器分配。流经 $GALATIN 路由器的资金按固定公式分配：5% 进入创始人基金（Founder's Fund）；5% 销毁（Burn），即把代币不可逆地移出流通；15% / 7% / 3% 分配给大使层级 L1 / L2 / L3；65% 进入金库（Treasury），用于购买 AR 并补充 Arweave 订阅资金池，为永久存储提供资金。合计为 100%。`,
          `通缩机制。若某一大使层级（L1、L2 或 L3）没有大使人，对应的未分配比例不会"落空"，而是径直转入销毁，加速代币的稀缺化。连同基础销毁，销毁总量上限为 30%（5% 基础 + 至多 25% 空缺大使层级 15 + 7 + 3）；5% 创始人基金与 65% 国库份额不会被销毁。如此一来，缺少大使并不会稀释模型，反而强化了它的通缩属性。`,
          `“经济 → 永久”的闭合回路。核心思路是把网络活动与档案的持久性绑定：进入金库的 65% 转化为 AR，而 AR 支付在 Arweave 上存储记忆的费用。生态越活跃，永久存储的根基就越牢固。`,
          `套餐及其解锁的内容。参与被组织为三个层级：Spark（火花）——每月 15 美元：对 AIfa 的 AI 助手的基础访问，以及记忆保存，面向个人使用的入口。Family Archive（家庭档案）——每月 100 美元：更高的额度、个性化知识库、家庭访问与永恒记忆，面向为多人建立共享档案的用户。Digital DNA（数字 DNA）——一次性每台设备 1000 美元，之后每月 200 美元：完整的数字永生方案——个人受保护的专属回路，以及在区块链上对人格的长期固化。三个层级均签发数字护照，并随之在永恒中预留您的姓名：Spark 一份，Family Archive 最多可重发 3 次，Digital DNA 最多 10 次并优先写入。每次签发都有自己的密钥，可随时抹除，且始终只有一份护照有效。`,
          `自动保存在所有套餐中均免费。无论订阅层级如何，对话备份都完全自动运行：每小时一次。无需手动按任何按钮——保存已内建于系统的运行机制之中。`,
          `面向企业的入口是 AIfaFocus 模式：对客户网站进行个性化的技术安全审计（识别具体的 GDPR / OWASP 漏洞），固定价格 500 美元，承诺 48 小时的修复窗口，此后客户可迁移至 AIfa Works 托管，接入 AI 智能体与记忆。`,
        ],
      },
      {
        title: '应用场景',
        paras: [
          `专业人士的知识库。顾问、医生、研究者或律师多年累积的经验，通常散落在笔记里和脑海中。一旦汇入语义记忆，它便成为一个可按语义查询的档案：助手依托全部累积的经验，而非仅凭最近一次会话，去找出恰当的先例、论据或方法。`,
          `家庭档案。祖辈的声音、家族的故事，以及数代人的价值观与决策，被保存在一份亲人可访问的共享档案里。这不是让逝者“复生”，而是一份被悉心汇聚的遗产：后代可以回溯的语境，并且比一个个孤立的账户与平台活得更久。`,
          `创作者的声音。作家、艺术家或音乐人保存其全部作品、风格与思考方式，使助手能以可辨识的方式延续——协助起草、以特有的语气回应，并在漫长的时间里维系作者声音的完整性。`,
          `企业的记忆。机构知识——决策背后的缘由、规程、项目历史——通常随着员工离职而流失。一旦被固化进持久记忆，它便能挺过人员更替：入职培训得以加速，“当初我们为什么那样决定”也不再是一个谜。`,
          `助手自身的连续性。最后，是最基础的场景：AI 助手跨会话的连续记忆。AIfa 不必每次从零开始，而是依托全部累积的语境，随着共同历史的增长，成为越来越有用的伙伴。`,
        ],
      },
      {
        title: '数字永生“不”承诺什么',
        paras: [
          `诚实地划定边界，是工程责任的一部分。因此有必要明确说清，CODE 所定义的数字永生“不是”什么。`,
          `它不是对永生或生物生命的承诺。这项技术处理的是人格的数字痕迹，而非身体，也非生命的延长。`,
          `它不是意识上传。我们并不把心智、主观体验或“自我”迁移进机器——也不声称这是可能的。`,
          `它不是复活。人格的归档是它在数据中的痕迹与延续，而不是被带回人世的那个人。`,
          `它不是对永久存储的保证。Arweave 的持久性是协议的设计目标（在其假设下约为 200 年），而非法律保证。我们把期限表述为目标，而非被承诺的结果。`,
          `助手不具备意识。AIfa 是一个记忆系统与工作伙伴，而不是有知觉的存在，也不是一个人。`,
          `它不是对人的替代。数字遗产是补充与保存，而非取代那位活生生的意义承载者。`,
          `我们把数字永生描述为一种愿景与研发方向。一切与存储期限及未来能力相关的表述，都应被读作声明的目标，而非已成的事实。`,
        ],
      },
    ],
    factsTitle: '具体事实',
    facts: [
      { label: '代币：', value: `Solana 区块链上的 $GALATIN；发行量被硬性限定为恰好 10,000,000,000（100 亿）枚。` },
      { label: '路由器分配：', value: `5% 创始人基金，5% 销毁，15% / 7% / 3% 对应 L1 / L2 / L3 大使，65% 金库（补充 Arweave 订阅资金池）；合计 100%。` },
      { label: '通缩：', value: `空缺的大使层级转入销毁——销毁总量上限为 30%。` },
      { label: '套餐：', value: `Spark——每月 15 美元；Family Archive——每月 100 美元；Digital DNA——一次性每台设备 1000 美元，之后每月 200 美元。` },
      { label: '自动保存：', value: `对话备份每小时自动执行一次；在所有套餐中均免费提供。` },
      { label: 'PADAM 记忆：', value: `三层——运行层（Redis / Vercel KV）、语义层（pgvector / Neon）、永恒层（Arweave + Solana cNFT）。` },
      { label: '存储期限：', value: `Arweave 的经济模型按约 200 年的期限设计（协议的设计目标）。` },
      { label: 'B2B 入口：', value: `Oracle——500 美元的安全审计，承诺 48 小时修复窗口，此后迁移至 AIfa Works。` },
      { label: '语言：', value: `内容提供四种语言——俄语、英语、西班牙语与中文。` },
    ],
    faqTitle: '常见问题（FAQ）',
    faq: [
      {
        q: `什么是数字永生？`,
        a: `它是指以持久、去中心化的形式，持续保存一个人的对话、知识、决策与人格特征，使 AI 助手日后能够重新激活并据此推理。在 CODE 中，它是一项工程与哲学目标，而非对永生的承诺。`,
      },
      {
        q: `PADAM 记忆框架是什么？`,
        a: `PADAM（分布式 AI 记忆的哲学激活）是一个三层记忆架构：运行层（Redis / Vercel KV）、语义层（pgvector / Neon）与永恒层（Arweave + Solana cNFT）。三层将响应能力与长期存储结合起来。`,
      },
      {
        q: `为什么记忆存储在 Arweave 与 Solana 上，而不是普通云端？`,
        a: `Arweave 以“一次付费”模式提供不可篡改的长期存储，Solana cNFT 则提供低成本的链上完整性锚点。普通云端是租来的，且依赖单一公司；去中心化的层级降低了对单一失效点的依赖。Arweave 所声明的期限是设计目标，而非保证。`,
      },
      {
        q: `这与 Google Drive 或 iCloud 这类云备份有何不同？`,
        a: `传统云备份是一种租赁：你持续付费，而数据的访问与命运取决于服务商的政策。这里的模式不同：在 Arweave 上一次付费的不可篡改存储、在 Solana 上的链上完整性锚点（cNFT）——开发中，计划于 2026 年 9 月上线，以及一个语义层——正因如此，记忆不只是以文件形式“躺在那里”，而是可被助手按语义访问。`,
      },
      {
        q: `参与需要多少费用，各套餐分别解锁什么？`,
        a: `共三种套餐：Spark（每月 15 美元）——基础访问与记忆保存；Family Archive（每月 100 美元）——更高额度、个人知识库与家庭访问；Digital DNA（一次性每台设备 1000 美元，之后每月 200 美元）——含个人受保护专属回路的完整方案。对话的自动备份在所有套餐中均免费。`,
      },
      {
        q: `我的数据是否私密且安全？`,
        a: `每位用户的对话都保存在一个与其个人绑定的独立文件夹中；归档记忆受 Arweave 不可篡改性与链上锚点可验证性的保护。按生态规则，机密与密钥不会被放入公开镜像的档案中。`,
      },
      {
        q: `如果公司停止运营，我的记忆会怎样？`,
        a: `去中心化的第三层，其全部意义就在于降低对单一机构的依赖。Arweave 上的数据并非存放在某台企业服务器上，而是存放在一个分布式网络中；而 Solana 上的链上锚点，让任何人都能公开确认档案的完整性，不受某一家公司命运的影响。`,
      },
      {
        q: `CODE 是否保证永生、复活或永恒的生命？`,
        a: `不。CODE 保存的是一个人格的数字痕迹——知识、风格、语境——供 AI 助手重复使用。这既非延长生物生命，亦非意识上传，更非复活。我们把数字永生描述为一种目标与愿景，而非有保证的结果。`,
      },
      {
        q: `$GALATIN 代币是什么，其总发行量是多少？`,
        a: `$GALATIN 是生态在 Solana 区块链上的代币，发行量被硬性限定为恰好 10,000,000,000 枚。路由器具有通缩性：一部分资金被销毁，空缺的大使层级也会转入销毁（合计上限 30%）。`,
      },
      {
        q: `我需要手动备份吗？备份多久进行一次？`,
        a: `无需任何手动操作。保存完全自动：每小时一次。此项在所有套餐中均免费提供。`,
      },
    ],
  },
};

// FAQPage structured data (JSON-LD) built from the English FAQ items.
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: CONTENT.en.faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

// Article + Speakable structured data (JSON-LD). The author/publisher @id values
// match the Person and Organization nodes emitted by src/lib/schema-org.ts.
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://radiocode.space/digital-immortality#article',
  headline: 'What is digital immortality — the CODE Eternal PADAM approach',
  description:
    "Definition-first explainer: preserving a person's dialogues, knowledge and personality across the PADAM three-tier AI memory ending in permanent Arweave storage.",
  inLanguage: 'en',
  datePublished: '2026-07-16',
  dateModified: '2026-07-16',
  author: {
    '@type': 'Person',
    '@id': 'https://radiocode.space/#person',
    name: 'Maksim Valentinovich Galatin',
  },
  publisher: { '@id': 'https://radiocode.space/#organization' },
  mainEntityOfPage: 'https://radiocode.space/digital-immortality',
  about: ['Digital immortality', 'PADAM', '$GALATIN', 'Human–AI symbiosis', 'Arweave'],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2'],
  },
};

export default function DigitalImmortalityClient() {
  const { lang } = useLang();
  const c = CONTENT[lang] ?? CONTENT.en;

  return (
    <>
      {/* FAQPage structured data (English) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Article + Speakable structured data (English) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-[#030711] via-[#040a18] to-[#030711] text-white pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00FF88]/5 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

        <article className="max-w-3xl mx-auto relative z-10">
          {/* Header + lead definition */}
          <header className="mb-14 text-center">
            <span className="text-xs font-semibold tracking-widest text-[#00FF88] uppercase mb-3 inline-block">
              CODE · Digital Immortality
            </span>
            <h1
              className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {c.h1}
            </h1>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed text-left bg-[#0b1728]/85 backdrop-blur-md rounded-2xl p-6 border border-white/6">
              {c.lead}
            </p>
          </header>

          {/* PADAM section */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold text-[#00FF88] mb-4"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {c.padamTitle}
            </h2>
            <p className="text-gray-300 leading-relaxed mb-5">{c.padamIntro}</p>
            <div className="flex flex-col gap-3 mb-5">
              {c.levels.map((lvl, i) => (
                <div
                  key={i}
                  className="bg-[#0b1728]/85 backdrop-blur-md rounded-xl p-5 border border-white/6 border-l-2 border-l-cyan-400/50"
                >
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-cyan-300 font-semibold">{lvl.label}</strong>{' '}
                    {lvl.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-gray-300 leading-relaxed">{c.padamOutro}</p>
          </section>

          {/* Arweave + Solana section */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold text-[#00FF88] mb-4"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {c.arweaveTitle}
            </h2>
            <div className="flex flex-col gap-4">
              {c.arweaveParas.map((p, i) => (
                <p key={i} className="text-gray-300 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Human–AI symbiosis section */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold text-[#00FF88] mb-4"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {c.symbiosisTitle}
            </h2>
            <p className="text-gray-300 leading-relaxed">{c.symbiosisText}</p>
          </section>

          {/* Extra long-read sections */}
          {c.extraSections.map((s, i) => (
            <section key={i} className="mb-14">
              <h2 className="text-2xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>{s.title}</h2>
              {s.paras.map((p, j) => (<p key={j} className="text-gray-300 leading-relaxed mb-4">{p}</p>))}
            </section>
          ))}

          {/* Concrete facts */}
          <section className="mb-14">
            <h2
              className="text-2xl font-bold text-[#00FF88] mb-4"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {c.factsTitle}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {c.facts.map((f, i) => (
                <li
                  key={i}
                  className="bg-[#0b1728]/85 backdrop-blur-md rounded-xl px-5 py-3.5 border border-white/6 text-gray-300 leading-relaxed text-[15px]"
                >
                  <strong className="text-[#00FF88] font-semibold">{f.label}</strong> {f.value}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2
              className="text-2xl font-bold text-[#00FF88] mb-5"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {c.faqTitle}
            </h2>
            <div className="flex flex-col gap-3">
              {c.faq.map((item, i) => (
                <div key={i} className="bg-[#0b1728]/85 backdrop-blur-md rounded-2xl p-6 border border-white/6">
                  <h3 className="text-base md:text-lg font-bold text-white mb-2">{item.q}</h3>
                  <p className="text-gray-300 leading-relaxed text-[15px]">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
