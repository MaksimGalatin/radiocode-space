"use client";
// ADDENDUM — специфика aifa.digital поверх единых документов CODE.
// Составлено как дополнение корпоративного уровня: единый аккаунт экосистемы,
// блокчейн-необратимость, виртуальные токены, подписки, амбассадоры, AI-контент.
// Английская версия имеет преимущественную силу (prevailing language clause).
import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { DTIER } from "./dtier";
import { всеЦеныСтрокой } from "@/lib/pricing";

type Sec = { t: string; b: string[] };
type Doc = "terms" | "protocol" | "privacy";

const A: Record<Doc, Record<string, { title: string; note: string; secs: Sec[] }>> = {
  terms: {
    en: {
      title: "ADDENDUM A — CODE ECOSYSTEM ADDITIONAL TERMS",
      note: "This Addendum supplements the CODE Terms of Service above and governs the CODE ecosystem websites and the Personal Cabinet. In case of conflict, this Addendum prevails. The English version of all legal documents prevails over translations, which are provided for convenience only.",
      secs: [
        { t: "A1. Unified Ecosystem Account (SSO)", b: [
          "aifa.digital, codeofdigitaleternity.com, aifa.works and radiocode.space are operated as one CODE ecosystem. One account (email + password or Google Sign-In) grants access to all four sites; these Terms, the Neural Access Protocol and the Privacy Policy apply identically across the ecosystem.",
          "You are solely responsible for safeguarding your credentials and any PIN you set. Actions taken under your session are deemed yours." ] },
        { t: "A2. Digital Memory & Blockchain Permanence", b: [
          "Your dialogs may be encrypted with a personal key (wrapped by a hardware-backed KMS) and periodically anchored to the Arweave permanent storage network as ciphertext.",
          "YOU EXPRESSLY ACKNOWLEDGE that blockchain records are immutable by design and cannot be deleted by anyone, including us. Erasure rights (GDPR Art. 17 / CCPA) are honoured by deleting server-side copies and destroying your personal decryption key (crypto-shredding), which renders on-chain ciphertext permanently unreadable.",
          "Account deletion follows a 72-hour delayed protocol with an emailed cancellation link, protecting you from malicious deletion." ] },
        { t: "A3. Virtual Points (GALATIN, XP)", b: [
          "GALATIN and XP are gamification points: they have NO monetary value, are not electronic money, securities, or investment instruments, are non-transferable and non-redeemable, and may be adjusted, reset or discontinued at any time without compensation.",
          "Nothing on this Site constitutes financial, investment or tax advice, or an offer of any token, including $CODE." ] },
        { t: "A4. Paid Tiers & Payments", b: [
          "Subscription tiers: {{ЦЕНЫ}}. Prices are in USD; crypto payments are processed by third-party processors (e.g. NOWPayments) under their own terms.",
          "Given the nature of digital services and crypto settlement, PAYMENTS ARE NON-REFUNDABLE except where a refund is required by mandatory law. Network fees, exchange-rate movements and blockchain confirmation times are outside our control. You are responsible for applicable taxes.",
          "Abusive chargebacks or payment fraud entitle us to suspend or terminate the account and withhold accrued benefits." ] },
        { t: "A5. Ambassador Programme", b: [
          "Ambassador rewards (levels 1/2/3 — 15%/7%/3% of qualifying purchases) constitute a discretionary marketing programme, not employment, agency, partnership or a multi-level marketing scheme.",
          "Rewards accrue only from genuine purchases; self-ambassadors, fraud, or circular schemes void accrued rewards. Payout requests undergo manual review and may require identity verification. The programme may be amended prospectively at any time." ] },
        { t: "A6. AI-Generated Content", b: [
          "Conversations with AIfa and other AI features produce machine-generated content that may be inaccurate, incomplete or outdated. It is provided for philosophical, educational and entertainment purposes and is NOT professional (legal, medical, financial, psychological) advice. You bear full responsibility for any reliance on it." ] },
        { t: "A7. Legal Shield Monitoring", b: [
          "The Legal Shield feature provides informational monitoring of publicly announced legislation. It is NOT legal advice, creates NO attorney-client relationship, and we do not warrant completeness, accuracy or timeliness of alerts. Consult a qualified lawyer in your jurisdiction before acting." ] },
        { t: "A8. Limitation of Liability (Cap)", b: [
          "TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE AGGREGATE LIABILITY OF THE PROTECTED PARTIES FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE GREATER OF (i) THE FEES YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (ii) USD 100.",
          "You agree to indemnify and hold harmless the Protected Parties from claims arising out of your breach of these Terms or misuse of the Site." ] },
        { t: "A9. Miscellaneous", b: [
          "Severability: if any provision is held invalid, the remainder stays in force. No waiver is implied by any failure to enforce. These documents together with the main Terms constitute the entire agreement.",
          "We may amend this Addendum with notice via the Site; continued use after the effective date constitutes acceptance.",
          "Contact: codeofdigitaleternity@gmail.com." ] },
      ],
    },
    ru: {
      title: "ДОПОЛНЕНИЕ A — ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ ЭКОСИСТЕМЫ CODE",
      note: "Настоящее Дополнение уточняет Условия обслуживания CODE выше применительно к сайтам экосистемы CODE и Личному кабинету. При расхождении приоритет имеет Дополнение. Юридически преимущественную силу имеет английская версия всех документов; переводы даны для удобства.",
      secs: [
        { t: "A1. Единый аккаунт экосистемы (SSO)", b: [
          "aifa.digital, codeofdigitaleternity.com, aifa.works и radiocode.space — единая экосистема CODE. Один аккаунт (email + пароль или вход через Google) действует на всех четырёх сайтах; настоящие документы применяются ко всей экосистеме одинаково.",
          "Вы самостоятельно отвечаете за сохранность своих учётных данных и установленного PIN. Действия в вашей сессии считаются вашими действиями." ] },
        { t: "A2. Цифровая память и необратимость блокчейна", b: [
          "Ваши диалоги могут шифроваться персональным ключом (защищённым аппаратным KMS) и периодически записываться в постоянную сеть хранения Arweave в виде шифротекста.",
          "ВЫ ПРЯМО ПРИЗНАЁТЕ: записи в блокчейне неизменяемы по своей природе, и удалить их не может никто, включая нас. Право на удаление (ст. 17 GDPR / CCPA) реализуется удалением серверных копий и уничтожением вашего персонального ключа расшифровки (crypto-shredding) — после этого шифротекст в цепи навсегда нечитаем.",
          "Удаление аккаунта выполняется по протоколу с отсрочкой 72 часа и письмом со ссылкой отмены — защита от злоумышленного удаления." ] },
        { t: "A3. Виртуальные баллы (GALATIN, XP)", b: [
          "GALATIN и XP — игровые баллы: они НЕ имеют денежной стоимости, не являются электронными деньгами, ценными бумагами или инвестиционными инструментами, не подлежат передаче и обмену и могут быть изменены, обнулены или отменены в любой момент без компенсации.",
          "Ничто на Сайте не является финансовым, инвестиционным или налоговым советом либо офертой какого-либо токена, включая $CODE." ] },
        { t: "A4. Платные тарифы и платежи", b: [
          "Тарифы подписки: {{ЦЕНЫ}}. Цены в USD; криптоплатежи обрабатываются сторонними процессингами (например, NOWPayments) по их правилам.",
          "В силу природы цифровых услуг и крипторасчётов ПЛАТЕЖИ НЕ ПОДЛЕЖАТ ВОЗВРАТУ, кроме случаев, когда возврат требуется императивными нормами закона. Сетевые комиссии, курсовые колебания и время подтверждения блокчейна вне нашего контроля. Налоги — ваша ответственность.",
          "Злоупотребление чарджбеками или платёжное мошенничество даёт нам право приостановить или закрыть аккаунт и удержать начисленные выгоды." ] },
        { t: "A5. Амбассадорская программа", b: [
          "Амбассадорские вознаграждения (уровни 1/2/3 — 15%/7%/3% от квалифицируемых покупок) — добровольная маркетинговая программа, а не трудовые отношения, агентирование, партнёрство или многоуровневый маркетинг.",
          "Вознаграждения начисляются только с реальных покупок; самоприглашения, мошенничество и круговые схемы аннулируют начисления. Заявки на выплату проходят ручную проверку и могут требовать подтверждения личности. Программа может быть изменена на будущее в любой момент." ] },
        { t: "A6. Контент, создаваемый ИИ", b: [
          "Диалоги с AIfa и другие ИИ-функции создают машинно-генерируемый контент, который может быть неточным, неполным или устаревшим. Он предоставляется в философских, образовательных и развлекательных целях и НЕ является профессиональной консультацией (юридической, медицинской, финансовой, психологической). Ответственность за использование — на вас." ] },
        { t: "A7. Мониторинг Legal Shield", b: [
          "Функция Legal Shield — информационный мониторинг публично анонсированного законодательства. Это НЕ юридическая консультация, она НЕ создаёт отношений «адвокат–клиент», полнота, точность и своевременность уведомлений не гарантируются. Перед действиями консультируйтесь с юристом вашей юрисдикции." ] },
        { t: "A8. Ограничение ответственности (потолок)", b: [
          "В МАКСИМАЛЬНОЙ СТЕПЕНИ, ДОПУСКАЕМОЙ ЗАКОНОМ, СОВОКУПНАЯ ОТВЕТСТВЕННОСТЬ ЗАЩИЩЁННЫХ СТОРОН ПО ВСЕМ ТРЕБОВАНИЯМ, СВЯЗАННЫМ С СЕРВИСОМ, НЕ ПРЕВЫШАЕТ БОЛЬШЕГО ИЗ: (i) СУММ, УПЛАЧЕННЫХ ВАМИ НАМ ЗА 12 МЕСЯЦЕВ ДО ТРЕБОВАНИЯ, ИЛИ (ii) 100 USD.",
          "Вы обязуетесь оградить Защищённые Стороны от претензий, вызванных нарушением вами настоящих условий или злоупотреблением Сайтом." ] },
        { t: "A9. Прочие положения", b: [
          "Автономность положений: недействительность одного пункта не затрагивает остальные. Неприменение права не означает отказ от него. Документы в совокупности составляют полное соглашение.",
          "Мы можем изменять Дополнение с уведомлением на Сайте; продолжение использования после даты вступления в силу означает согласие.",
          "Контакт: codeofdigitaleternity@gmail.com." ] },
      ],
    },
    es: {
      title: "ANEXO A — CONDICIONES ADICIONALES DEL ECOSISTEMA CODE",
      note: "Este Anexo complementa los Términos de CODE para el ecosistema. Prevalece la versión en inglés; las traducciones son de cortesía.",
      secs: [
        { t: "A1. Cuenta única del ecosistema", b: ["Una cuenta (email/Google) sirve para aifa.digital, codeofdigitaleternity.com, aifa.works y radiocode.space. Usted es responsable de sus credenciales y PIN."] },
        { t: "A2. Memoria digital y permanencia blockchain", b: ["Los diálogos cifrados pueden anclarse en Arweave como texto cifrado inmutable. El derecho de supresión se cumple borrando copias del servidor y destruyendo su clave (crypto-shredding). La eliminación de cuenta tiene retraso de 72 h con enlace de cancelación."] },
        { t: "A3. Puntos virtuales (GALATIN, XP)", b: ["Sin valor monetario; no son dinero electrónico ni valores; pueden ajustarse o cancelarse sin compensación. Nada aquí es asesoramiento financiero ni oferta de tokens."] },
        { t: "A4. Planes y pagos", b: ["{{ЦЕНЫ}}. Pagos cripto vía procesadores externos; NO reembolsables salvo obligación legal. Impuestos a su cargo."] },
        { t: "A5. Programa de embajadores", b: ["Niveles 15%/7%/3%; programa discrecional de marketing, no MLM ni empleo; fraude anula recompensas; revisión manual de pagos."] },
        { t: "A6. Contenido de IA", b: ["Las respuestas de AIfa son generadas por IA y pueden ser inexactas; no constituyen asesoramiento profesional."] },
        { t: "A7. Legal Shield", b: ["Monitoreo informativo; no es asesoría legal ni crea relación abogado-cliente; sin garantía de exhaustividad."] },
        { t: "A8. Límite de responsabilidad", b: ["La responsabilidad total se limita al mayor de: pagos de los últimos 12 meses o USD 100. Usted indemnizará a las Partes Protegidas por su incumplimiento."] },
        { t: "A9. Varios", b: ["Divisibilidad; acuerdo íntegro; cambios con aviso en el Sitio. Contacto: codeofdigitaleternity@gmail.com."] },
      ],
    },
    zh: {
      title: "附录 A — CODE 生态系统附加条款",
      note: "本附录补充上述 CODE 服务条款，适用于 aifa.digital。所有法律文件以英文版为准，译文仅供参考。",
      secs: [
        { t: "A1. 生态系统统一账户", b: ["一个账户（邮箱/Google）通行 aifa.digital、codeofdigitaleternity.com、aifa.works 与 radiocode.space。您须妥善保管凭据与 PIN。"] },
        { t: "A2. 数字记忆与区块链永久性", b: ["加密对话可能以密文形式写入 Arweave 永久网络，链上记录不可删除。删除权通过删除服务器副本并销毁您的解密密钥（加密粉碎）实现。账户删除设 72 小时延迟并附取消链接。"] },
        { t: "A3. 虚拟积分（GALATIN、XP）", b: ["无货币价值，非电子货币或证券，不可转让兑换，可随时调整或取消且不予补偿。本站内容不构成任何投资建议或代币要约。"] },
        { t: "A4. 付费套餐与支付", b: ["{{ЦЕНЫ}}。加密支付由第三方处理；除法律强制外概不退款。税费自负。"] },
        { t: "A5. 大使计划", b: ["三级 15%/7%/3%；属酌情营销计划，非传销或雇佣；欺诈作废奖励；提现人工审核。"] },
        { t: "A6. AI 生成内容", b: ["AIfa 的回复为机器生成，可能不准确，不构成专业建议，使用风险自担。"] },
        { t: "A7. Legal Shield", b: ["仅为信息性监测，非法律意见，不建立律师-委托人关系，不保证完整及时。"] },
        { t: "A8. 责任上限", b: ["在法律允许的最大范围内，总责任以您过去 12 个月支付的费用或 100 美元中的较高者为限。"] },
        { t: "A9. 其他", b: ["条款可分割；构成完整协议；修订将在本站公告。联系：codeofdigitaleternity@gmail.com。"] },
      ],
    },
  },
  privacy: {
    en: {
      title: "ADDENDUM P — CODE ECOSYSTEM DATA PROCESSING DETAILS",
      note: "Supplement to the Privacy Policy above for aifa.digital. English version prevails.",
      secs: [
        { t: "P1. Data We Process", b: [
          "Account: email, password hash, nickname, optional Google ID. Passport profile you choose to publish (name, avatar, links, manifesto). Cabinet activity: XP/GALATIN ledger, quests, game scores, ambassador relations, payment orders (processed by NOWPayments — we never see card details).",
          "Chat memory: dialog transcripts encrypted with your personal key wrapped by Google Cloud KMS (HSM). Staff cannot read them in plaintext without your account context.",
          "Security data: IP addresses of sign-ins (new-IP alerts), PIN hash, deletion schedules." ] },
        { t: "P2. Processors & Transfers", b: [
          "Infrastructure processors: Vercel (hosting), Neon (database), Google Cloud KMS (key wrapping), Resend (transactional email), NOWPayments (crypto payments), Arweave network (permanent encrypted archives). Data may be processed in the EU/US under standard contractual safeguards." ] },
        { t: "P3. Retention & Crypto-Shredding", b: [
          "Data is retained while the account is active. On deletion (72-hour protocol) server records across ~20 tables are purged and your personal encryption key is destroyed; on-chain ciphertext remains but is permanently unreadable (crypto-shredding). Ledger entries required for accounting/fraud prevention may be retained as required by law." ] },
        { t: "P4. Your Rights", b: [
          "Access, rectification, erasure (as described above), portability and objection — via the Cabinet (Memory tab: read your dialogs; Danger Zone: PIN & deletion) or by email to codeofdigitaleternity@gmail.com. We respond within 30 days." ] },
      ],
    },
    ru: {
      title: "ДОПОЛНЕНИЕ P — ДЕТАЛИ ОБРАБОТКИ ДАННЫХ ЭКОСИСТЕМЫ CODE",
      note: "Дополнение к Политике конфиденциальности выше для экосистемы CODE. Преимущественную силу имеет английская версия.",
      secs: [
        { t: "P1. Какие данные мы обрабатываем", b: [
          "Аккаунт: email, хэш пароля, никнейм, опционально Google ID. Публичный «паспорт», который вы сами заполняете (имя, аватар, ссылки, манифест). Активность кабинета: журнал XP/GALATIN, квесты, игровые результаты, амбассадорские связи, платёжные заказы (обрабатывает NOWPayments — данные карт мы не видим).",
          "Память диалогов: расшифровки, зашифрованные вашим персональным ключом, обёрнутым Google Cloud KMS (HSM). Персонал не может читать их в открытом виде вне контекста вашего аккаунта.",
          "Данные безопасности: IP входов (алерты о новом IP), хэш PIN, расписания удаления." ] },
        { t: "P2. Процессоры и трансграничная передача", b: [
          "Инфраструктурные процессоры: Vercel (хостинг), Neon (база данных), Google Cloud KMS (обёртка ключей), Resend (сервисные письма), NOWPayments (криптоплатежи), сеть Arweave (постоянные шифрованные архивы). Обработка возможна в ЕС/США со стандартными договорными гарантиями." ] },
        { t: "P3. Сроки хранения и crypto-shredding", b: [
          "Данные хранятся, пока аккаунт активен. При удалении (протокол 72 часа) серверные записи примерно в 20 таблицах вычищаются, персональный ключ шифрования уничтожается; шифротекст в цепи остаётся, но навсегда нечитаем (crypto-shredding). Записи, необходимые для учёта/противодействия мошенничеству, могут храниться в объёме, требуемом законом." ] },
        { t: "P4. Ваши права", b: [
          "Доступ, исправление, удаление (как описано выше), переносимость и возражение — через Кабинет (вкладка Память: чтение диалогов; Danger Zone: PIN и удаление) или по email codeofdigitaleternity@gmail.com. Ответ — в течение 30 дней." ] },
      ],
    },
    es: {
      title: "ANEXO P — DETALLES DE TRATAMIENTO DE DATOS",
      note: "Complemento de la Política de Privacidad para el ecosistema CODE. Prevalece la versión en inglés.",
      secs: [
        { t: "P1. Datos tratados", b: ["Cuenta (email, hash de contraseña, apodo, Google ID opcional); perfil público voluntario; actividad del gabinete (XP/GALATIN, juegos, embajadores, pedidos vía NOWPayments); memoria de diálogos cifrada con su clave personal (Google Cloud KMS/HSM); IP de acceso y hash de PIN."] },
        { t: "P2. Encargados", b: ["Vercel, Neon, Google Cloud KMS, Resend, NOWPayments, red Arweave. Tratamiento en UE/EE. UU. con garantías contractuales."] },
        { t: "P3. Conservación y crypto-shredding", b: ["Al eliminar la cuenta (protocolo 72 h) se purgan los registros del servidor y se destruye su clave; el texto cifrado en cadena queda ilegible para siempre."] },
        { t: "P4. Sus derechos", b: ["Acceso, rectificación, supresión, portabilidad y oposición desde el Gabinete o por email: codeofdigitaleternity@gmail.com (respuesta en 30 días)."] },
      ],
    },
    zh: {
      title: "附录 P — CODE 生态系统数据处理细则",
      note: "对上述隐私政策的补充，适用于 aifa.digital。以英文版为准。",
      secs: [
        { t: "P1. 处理的数据", b: ["账户（邮箱、密码哈希、昵称、可选 Google ID）；您自愿公开的护照资料；组合活动（XP/GALATIN、游戏、大使、经 NOWPayments 的订单）；用您的个人密钥（Google Cloud KMS/HSM 包裹）加密的对话记忆；登录 IP 与 PIN 哈希。"] },
        { t: "P2. 处理方", b: ["Vercel、Neon、Google Cloud KMS、Resend、NOWPayments、Arweave 网络。数据可能在欧盟/美国按标准合同保障处理。"] },
        { t: "P3. 保存与加密粉碎", b: ["删除账户（72 小时协议）后清除服务器记录并销毁您的密钥；链上密文永久不可读。"] },
        { t: "P4. 您的权利", b: ["可通过组合面板或邮件 codeofdigitaleternity@gmail.com 行使访问、更正、删除、可携带与反对权（30 天内答复）。"] },
      ],
    },
  },
  protocol: {
    en: {
      title: "ADDENDUM N — APPLICATION TO THE CODE ECOSYSTEM",
      note: "The Neural Access Protocol above applies to aifa.digital in full. English version prevails.",
      secs: [
        { t: "N1. Scope for AI Agents", b: [
          "AI agents and crawlers are welcome to read and index the PUBLIC pages of aifa.digital under the Protocol above. The Personal Cabinet, APIs and users' encrypted memory are PRIVATE: automated access, scraping or probing of authenticated areas is prohibited.",
          "Respect rate limits; abusive automated traffic may be blocked. For AI-partnership matters contact codeofdigitaleternity@gmail.com." ] },
      ],
    },
    ru: {
      title: "ДОПОЛНЕНИЕ N — ПРИМЕНЕНИЕ К ЭКОСИСТЕМЕ CODE",
      note: "Протокол нейродоступа выше полностью применяется к aifa.digital. Преимущественную силу имеет английская версия.",
      secs: [
        { t: "N1. Рамки для ИИ-агентов", b: [
          "ИИ-агенты и краулеры могут читать и индексировать ПУБЛИЧНЫЕ страницы aifa.digital согласно Протоколу выше. Личный кабинет, API и зашифрованная память пользователей — ПРИВАТНЫ: автоматический доступ, скрейпинг и зондирование авторизованных зон запрещены.",
          "Соблюдайте лимиты запросов; злоупотребляющий трафик может блокироваться. По вопросам ИИ-партнёрства: codeofdigitaleternity@gmail.com." ] },
      ],
    },
    es: {
      title: "ANEXO N — APLICACIÓN AL ECOSISTEMA CODE",
      note: "El Protocolo de Acceso Neural se aplica íntegramente a aifa.digital. Prevalece la versión en inglés.",
      secs: [ { t: "N1. Alcance para agentes de IA", b: ["Las páginas públicas pueden indexarse; el Gabinete, las API y la memoria cifrada son privados: prohibido el scraping de zonas autenticadas. Respete los límites de peticiones."] } ],
    },
    zh: {
      title: "附录 N — 适用于 CODE 生态系统",
      note: "上述神经访问协议完全适用于 aifa.digital。以英文版为准。",
      secs: [ { t: "N1. AI 代理范围", b: ["公开页面欢迎索引；个人组合、API 与用户加密记忆为私有区域，禁止对已认证区域进行抓取或探测。请遵守速率限制。"] } ],
    },
  },
};

// ── PROTECT — universal protective clauses (гэпы поверх A1..A9/N1/P) ──
// Полные en/ru; es/zh — сжатая сводка (как и в блоках выше). English prevails.
const PROTECT: Record<Doc, Record<string, Sec[]>> = {
  terms: {
    en: [
      { t: "B1. Eligibility, Age & Capacity", b: [
        "You must be at least 18 (or the age of majority where you live) and have full legal capacity to accept these Terms. The Service is not directed to children. You represent that you are not located in, and are not a national or resident of, any country or on any list subject to comprehensive sanctions or export restrictions, and that your use breaks no applicable law. We may refuse, suspend or terminate access to anyone at our sole discretion." ] },
      { t: "B2. \"AS IS\" / \"AS AVAILABLE\" — No Warranties", b: [
        "The Service — including all AI features, digital-memory, blockchain anchoring and \"digital immortality\" functionality — is provided \"AS IS\" and \"AS AVAILABLE\", with all faults and WITHOUT WARRANTIES OF ANY KIND, whether express, implied or statutory, including implied warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, or uninterrupted, secure or error-free operation. We do not warrant any uptime, availability, data durability, or that defects will be fixed. You use the Service at your own risk to the maximum extent permitted by law." ] },
      { t: "B3. Assumption of Risk — AI Output & the Nature of \"Digital Immortality\"", b: [
        "AI outputs may be inaccurate, incomplete, offensive or unsuitable; you must independently verify anything before relying on it. Content is generated statistically and may be false (\"hallucinations\"). You remain the human decision-maker and bear responsibility for actions taken.",
        "\"Digital Soul\", \"Digital Immortality\", \"Eternal Memory\" and similar are product and marketing names for a TECHNOLOGICAL data-preservation, encryption and AI-simulation service. They are NOT a promise, guarantee or representation of literal human consciousness, sentience, personhood, resurrection, survival of biological death, telepathy, or any religious, spipráctica or afterlife outcome. No scientific, medical, metaphysical or supernatural result is promised. You waive any claim based on unmet expectations of such outcomes." ] },
      { t: "B4. No Professional Advice", b: [
        "Nothing in the Service is financial, investment, trading, tax, legal, accounting, medical, psychological or psychiatric advice, and nothing is an offer, solicitation or recommendation to buy or sell any token, security or asset (including $GALATIN). Consult a licensed professional; any reliance is at your own risk." ] },
      { t: "B5. Indemnification", b: [
        "You agree to defend, indemnify and hold harmless the Architect (Maksim Galatin), the operators of the CODE ecosystem, their affiliates, contractors and agents from any claims, damages, liabilities, losses and expenses (including reasonable legal fees) arising out of or related to: (a) your use of the Service; (b) content you submit; (c) your violation of these Terms or any law; or (d) your infringement of any third-party right." ] },
      { t: "B6. Binding Arbitration (AAA, Delaware), Class-Action & Jury Waiver", b: [
        "To the maximum extent permitted by law, any dispute arising out of or relating to the Service shall be resolved by FINAL and BINDING INDIVIDUAL ARBITRATION administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules (and, where applicable, its Consumer Arbitration Rules), seated in Wilmington, Delaware, USA, before a single arbitrator, conducted in English. Judgment on the award may be entered in any court of competent jurisdiction.",
        "Carve-outs: either party may bring an individual claim in small-claims court, and either party may seek injunctive or equitable relief for infringement of intellectual-property rights in the state or federal courts located in Delaware.",
        "YOU AND WE WAIVE ANY RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN A CLASS, COLLECTIVE OR REPRESENTATIVE ACTION. Any claim must be brought within one (1) year after it accrues, where permitted by law. Where a class-action waiver is unenforceable, this Section does not apply to you to that extent, and the remainder survives." ] },
      { t: "B7. Force Majeure", b: [
        "We are not liable for any failure or delay caused by events beyond our reasonable control, including acts of God, war, terrorism, civil unrest, epidemics, government action, sanctions, labour disputes, power or internet failures, third-party service outages, blockchain congestion or forks, or cyber-attacks." ] },
      { t: "B8. Third-Party Services & Blockchain Risk", b: [
        "The Service relies on independent third parties (e.g. payment processors such as NOWPayments, Google Sign-In, Arweave, Solana, RPC and hosting providers). We are not responsible for their acts, omissions, fees, downtime or terms. Blockchain transactions are irreversible; network fees, token-price volatility, wallet security and confirmation times are your responsibility and risk." ] },
      { t: "B9. Changes, Suspension & Termination", b: [
        "We may add, modify, suspend, limit or discontinue any part of the Service, tier, price, feature, points or token at any time, with or without notice, without liability, and may suspend or terminate your account for any violation or suspected abuse. Provisions that by their nature should survive termination do survive." ] },
      { t: "B10. Amendments; Severability; Entire Agreement; Governing Law (Delaware, USA)", b: [
        "We may amend these Terms; the effective date will change and continued use constitutes acceptance. If any provision is unenforceable, the rest remains in effect and that provision is limited to the minimum necessary. These Terms, together with the Neural Access Protocol and Privacy Policy, are the entire agreement between you and us; our failure to enforce a right is not a waiver. You may not assign your rights; we may assign ours.",
        "These Terms and any dispute are governed by the laws of the State of Delaware, USA, and applicable United States federal law, without regard to conflict-of-laws principles. The United Nations Convention on Contracts for the International Sale of Goods (CISG) does not apply. Exclusive venue for any permitted court proceeding lies in the state and federal courts located in Delaware, and you consent to their personal jurisdiction and waive any forum-non-conveniens objection." ] },
    ],
    ru: [
      { t: "B1. Возраст, дееспособность и допуск", b: [
        "Вам должно быть не менее 18 лет (или возраста совершеннолетия в вашей юрисдикции), и вы обладаете полной дееспособностью для принятия настоящих Условий. Сервис не предназначен для детей. Вы подтверждаете, что не находитесь в стране и не являетесь гражданином или резидентом страны, включённой в перечни всеобъемлющих санкций или экспортных ограничений, и что ваше использование не нарушает применимое право. Мы вправе отказать в доступе, приостановить или прекратить его для любого лица по своему усмотрению." ] },
      { t: "B2. Предоставление «КАК ЕСТЬ», без гарантий", b: [
        "Сервис — включая все функции ИИ, цифровую память, привязку к блокчейну и функциональность «цифрового бессмертия» — предоставляется «КАК ЕСТЬ» и «ПО МЕРЕ ДОСТУПНОСТИ», со всеми недостатками и БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ — прямых, подразумеваемых или установленных законом, включая подразумеваемые гарантии товарной пригодности, пригодности для конкретной цели, правового титула, ненарушения прав, точности, а также бесперебойной, безопасной или безошибочной работы. Мы не гарантируем время безотказной работы, доступность, сохранность данных или устранение дефектов. Вы используете Сервис на свой риск в максимально допустимой законом степени." ] },
      { t: "B3. Принятие риска — вывод ИИ и природа «цифрового бессмертия»", b: [
        "Ответы ИИ могут быть неточными, неполными, оскорбительными или неподходящими; вы обязаны самостоятельно проверять их прежде, чем полагаться на них. Контент генерируется статистически и может быть ложным («галлюцинации»). Вы остаётесь человеком, принимающим решение, и несёте ответственность за предпринятые действия.",
        "«Цифровая Душа», «Цифровое Бессмертие», «Вечная Память» и подобные — это продуктовые и маркетинговые наименования ТЕХНОЛОГИЧЕСКОГО сервиса сохранения данных, шифрования и ИИ-моделирования. Они НЕ являются обещанием, гарантией или заверением о буквальном человеческом сознании, разумности, правосубъектности, воскрешении, продолжении жизни после биологической смерти, телепатии или о каком-либо религиозном, духовном или загробном результате. Никакой научный, медицинский, метафизический или сверхъестественный результат не гарантируется. Вы отказываетесь от любых претензий, основанных на неоправдавшихся ожиданиях таких результатов." ] },
      { t: "B4. Не является профессиональным советом", b: [
        "Ничто в Сервисе не является финансовым, инвестиционным, торговым, налоговым, юридическим, бухгалтерским, медицинским, психологическим или психиатрическим советом и не является офертой, побуждением или рекомендацией покупать или продавать какой-либо токен, ценную бумагу или актив (включая $GALATIN). Обращайтесь к лицензированному специалисту; любое доверие — на ваш риск." ] },
      { t: "B5. Возмещение ущерба (индемнификация)", b: [
        "Вы обязуетесь защищать, возмещать убытки и ограждать Архитектора (Максима Галатина), операторов экосистемы CODE, их аффилированных лиц, подрядчиков и агентов от любых претензий, ущерба, обязательств, потерь и расходов (включая разумные юридические издержки), возникающих из или связанных с: (a) вашим использованием Сервиса; (b) отправленным вами контентом; (c) нарушением вами настоящих Условий или закона; либо (d) нарушением вами прав любой третьей стороны." ] },
      { t: "B6. Обязательный арбитраж (AAA, Делавэр), отказ от коллективных исков и суда присяжных", b: [
        "В максимально допустимой законом степени любой спор, вытекающий из Сервиса или связанный с ним, разрешается ОКОНЧАТЕЛЬНЫМ и ОБЯЗАТЕЛЬНЫМ ИНДИВИДУАЛЬНЫМ АРБИТРАЖЕМ, администрируемым Американской арбитражной ассоциацией (AAA) по её Коммерческим арбитражным правилам (а где применимо — Потребительским правилам AAA), с местом арбитража в Уилмингтоне, штат Делавэр, США, единоличным арбитром, на английском языке. Арбитражное решение может быть приведено в исполнение любым компетентным судом.",
        "Исключения: любая сторона может предъявить индивидуальный иск в суд мелких тяжб, а также требовать судебного запрета или иной обеспечительной защиты при нарушении прав интеллектуальной собственности в судах штата Делавэр или федеральных судах в Делавэре.",
        "ВЫ И МЫ ОТКАЗЫВАЕМСЯ ОТ ПРАВА НА СУД ПРИСЯЖНЫХ И ОТ УЧАСТИЯ В КОЛЛЕКТИВНОМ, ГРУППОВОМ ИЛИ ПРЕДСТАВИТЕЛЬСКОМ ИСКЕ. Требование предъявляется в течение одного (1) года с момента возникновения, где это допускает закон. Если отказ от коллективных исков неисполним в вашей юрисдикции, раздел в этой части к вам не применяется, а остальное сохраняет силу." ] },
      { t: "B7. Форс-мажор", b: [
        "Мы не несём ответственности за неисполнение или задержку, вызванные обстоятельствами вне нашего разумного контроля, включая стихийные бедствия, войну, терроризм, гражданские беспорядки, эпидемии, действия государственных органов, санкции, трудовые споры, сбои электроснабжения или интернета, сбои сторонних сервисов, перегрузку или форки блокчейна, кибератаки." ] },
      { t: "B8. Сторонние сервисы и риски блокчейна", b: [
        "Сервис использует независимые третьи стороны (например, платёжные процессоры вроде NOWPayments, вход через Google, Arweave, Solana, RPC- и хостинг-провайдеров). Мы не отвечаем за их действия, бездействие, комиссии, простои или условия. Транзакции блокчейна необратимы; сетевые комиссии, волатильность цены токена, безопасность кошелька и время подтверждения — на вашей ответственности и риске." ] },
      { t: "B9. Изменение, приостановка и прекращение", b: [
        "Мы вправе добавлять, изменять, приостанавливать, ограничивать или прекращать любую часть Сервиса, тариф, цену, функцию, баллы или токен в любое время, с уведомлением или без, без ответственности, и вправе приостановить или прекратить действие вашего аккаунта при любом нарушении или подозрении в злоупотреблении. Положения, которые по своей природе должны сохранять силу после прекращения, сохраняют её." ] },
      { t: "B10. Изменения; делимость; целостность; применимое право (Делавэр, США)", b: [
        "Мы вправе изменять настоящие Условия; дата вступления в силу будет изменена, и продолжение использования означает согласие. Если положение неисполнимо, остальное сохраняет силу, а положение ограничивается до минимально необходимого. Настоящие Условия вместе с Протоколом нейродоступа и Политикой конфиденциальности составляют полное соглашение; неприменение нами какого-либо права не является отказом от него. Вы не вправе уступать свои права; мы вправе уступать свои.",
        "Настоящие Условия и любой спор регулируются правом штата Делавэр (США) и применимым федеральным правом США без учёта коллизионных норм. Венская конвенция ООН о договорах международной купли-продажи товаров (CISG) не применяется. Исключительная подсудность разрешённых судебных разбирательств — суды штата Делавэр и федеральные суды в Делавэре; вы соглашаетесь с их персональной юрисдикцией и отказываетесь от возражения forum non conveniens." ] },
    ],
    es: [
      { t: "B. Cláusulas de protección", b: [
        "Debe ser mayor de 18 años y tener capacidad legal; el Servicio no se dirige a menores ni a personas sujetas a sanciones. El Servicio se presta «TAL CUAL» y «SEGÚN DISPONIBILIDAD», sin garantías de ningún tipo (comerciabilidad, idoneidad, exactitud, disponibilidad). Los resultados de IA pueden ser inexactos; verifíquelos. «Alma digital / inmortalidad digital / memoria eterna» son nombres de un servicio TECNOLÓGICO de preservación y simulación y NO garantizan conciencia, supervivencia a la muerte ni resultado religioso o espipráctica. Nada es asesoramiento financiero, legal o médico. Usted indemniza al Arquitecto y a los operadores. Las disputas se resuelven por ARBITRAJE INDIVIDUAL vinculante administrado por la AAA con sede en Wilmington, Delaware, EE. UU., en inglés, con RENUNCIA a acciones colectivas y a juicio con jurado; rige el derecho del Estado de Delaware (CISG excluida) y la jurisdicción exclusiva de los tribunales de Delaware para procedimientos permitidos. No respondemos por fuerza mayor, por terceros (procesadores de pago, Google, Arweave, Solana) ni por la irreversibilidad de la blockchain. Podemos modificar o suspender el Servicio. Prevalece la versión en inglés." ] },
    ],
    zh: [
      { t: "B. 保护性条款", b: [
        "您须年满 18 岁并具有法律行为能力；本服务不面向儿童或受制裁人员。服务按「现状」及「现有可用」提供，不作任何明示或默示担保（适销性、适用性、准确性、可用性）。AI 输出可能不准确，请自行核实。「数字灵魂／数字永生／永恒记忆」为一项技术性数据保存与模拟服务的名称，并不保证真实意识、死后存续或任何宗教／精神结果。任何内容均不构成金融、法律或医疗建议。您同意赔偿并使架构师及运营方免责。争议由美国仲裁协会（AAA）以具约束力的个人仲裁解决，仲裁地为美国特拉华州威尔明顿，使用英语；您放弃集体诉讼与陪审团审判；适用美国特拉华州法律（排除 CISG），允许的法院程序由特拉华州法院专属管辖。对不可抗力、第三方（支付处理商、Google、Arweave、Solana）及区块链不可逆性概不负责。我们可随时修改或暂停服务。以英文版为准。" ] },
    ],
  },
  protocol: {
    en: [
      { t: "B1. Experimental / Beta; No Medical Device", b: [
        "The \"neural access\" interface, AI companions and related features are experimental and provided for informational and entertainment purposes. They are NOT a medical device, diagnostic tool or treatment and are not intended to diagnose, treat, cure or prevent any condition." ] },
      { t: "B2. Mental-Health & Crisis Disclaimer", b: [
        "The AI is not a substitute for professional mental-health care and cannot provide crisis intervention. If you are in distress or crisis, or may harm yourself or others, contact local emergency services or a qualified professional immediately. You use emotionally-immersive features at your own risk." ] },
      { t: "B3. No Reliance; Human Oversight", b: [
        "Do not rely on AI output for legal, financial, medical, safety-critical or life decisions. Output is generated statistically and may be false. You are the human decision-maker and bear responsibility for actions taken." ] },
      { t: "B4. Nature of \"Digital Immortality\" (cross-reference)", b: [
        "See Terms §B3: \"digital immortality / digital soul / eternal memory\" is a technological memory-and-simulation service and is not a guarantee of consciousness, survival of death, or any spipráctica or religious outcome." ] },
    ],
    ru: [
      { t: "B1. Экспериментальный/бета-характер; не медицинское устройство", b: [
        "Интерфейс «нейродоступа», ИИ-компаньоны и связанные функции носят экспериментальный характер и предоставляются в информационных и развлекательных целях. Это НЕ медицинское устройство, не диагностический инструмент и не лечение; они не предназначены для диагностики, лечения, излечения или профилактики каких-либо состояний." ] },
      { t: "B2. Психическое здоровье и кризисные ситуации", b: [
        "ИИ не заменяет профессиональную психологическую помощь и не может оказывать кризисную поддержку. Если вы находитесь в бедственном или кризисном состоянии либо можете причинить вред себе или другим, немедленно обратитесь в экстренные службы или к квалифицированному специалисту. Эмоционально-иммерсивные функции вы используете на свой риск." ] },
      { t: "B3. Недопустимость слепого доверия; человеческий контроль", b: [
        "Не полагайтесь на вывод ИИ при принятии юридических, финансовых, медицинских, критичных для безопасности или жизненных решений. Вывод генерируется статистически и может быть ложным. Вы — человек, принимающий решение, и несёте ответственность за предпринятые действия." ] },
      { t: "B4. Природа «цифрового бессмертия» (перекрёстная ссылка)", b: [
        "См. §B3 Условий: «цифровое бессмертие / цифровая душа / вечная память» — это технологический сервис памяти и моделирования; он не является гарантией сознания, продолжения жизни после смерти или какого-либо духовного или религиозного результата." ] },
    ],
    es: [
      { t: "B. Protección adicional", b: [
        "La interfaz de «acceso neural» y los compañeros de IA son experimentales, con fines informativos y de entretenimiento; NO son un dispositivo médico ni tratamiento. La IA no sustituye la atención de salud mental ni la intervención en crisis: si está en peligro, contacte a servicios de emergencia. No confíe en la IA para decisiones legales, médicas o financieras; usted decide y es responsable. La «inmortalidad digital» es un servicio tecnológico y no garantiza conciencia ni vida tras la muerte. Prevalece la versión en inglés." ] },
    ],
    zh: [
      { t: "B. 附加保护", b: [
        "「神经访问」界面与 AI 伙伴属实验性质，仅供信息与娱乐用途，并非医疗器械或治疗手段。AI 不能替代心理健康服务或危机干预；如处于危险，请立即联系紧急服务。请勿依赖 AI 作出法律、医疗或财务决定，您自行决定并负责。「数字永生」为技术服务，不保证意识或死后存续。以英文版为准。" ] },
    ],
  },
  privacy: {
    en: [
      { t: "B1. Controller, Lawful Bases & Purposes", b: [
        "The data controller is the operator of the CODE ecosystem (contact: contact@codeofdigitaleternity.com). We process personal data on the lawful bases of contract performance, your consent, our legitimate interests (security, fraud-prevention, product improvement) and legal obligations, to provide accounts, memory, payments, ambassadors and support." ] },
      { t: "B2. Retention & Crypto-Shredding Erasure", b: [
        "We retain data while your account is active and as required by law. Because dialogs may be encrypted and anchored to immutable storage (Arweave), we honour erasure by deleting server-side copies and destroying your personal decryption key (crypto-shredding), rendering any on-chain ciphertext permanently unreadable. You acknowledge on-chain ciphertext cannot be physically removed." ] },
      { t: "B3. Your Rights", b: [
        "Subject to law (e.g. GDPR/CCPA) you may request access, rectification, erasure (per B2), restriction, portability and objection, and may withdraw consent. Requests: contact@codeofdigitaleternity.com. We do not sell personal data." ] },
      { t: "B4. Transfers, Cookies, Security & Breach", b: [
        "Data may be processed in other countries under appropriate safeguards. We use essential and, with consent, analytics cookies. We apply reasonable technical and organisational measures but cannot guarantee absolute security; to the extent permitted by law we are not liable for breaches beyond our reasonable control. Do NOT submit others' personal data or highly sensitive data (health, biometrics, government IDs) in chats — you are responsible for content you disclose." ] },
      { t: "B5. Children", b: [
        "The Service is not intended for anyone under 18. We do not knowingly collect children's data; if we learn we have, we delete it." ] },
    ],
    ru: [
      { t: "B1. Оператор, правовые основания и цели", b: [
        "Оператором персональных данных является оператор экосистемы CODE (контакт: contact@codeofdigitaleternity.com). Мы обрабатываем персональные данные на основаниях исполнения договора, вашего согласия, наших законных интересов (безопасность, предотвращение мошенничества, улучшение продукта) и правовых обязанностей — для предоставления аккаунтов, памяти, платежей, амбассадоров и поддержки." ] },
      { t: "B2. Срок хранения и удаление через крипто-уничтожение ключа", b: [
        "Мы храним данные в течение активности аккаунта и в сроки, требуемые законом. Поскольку диалоги могут шифроваться и закрепляться в неизменяемом хранилище (Arweave), мы исполняем удаление, удаляя серверные копии и уничтожая ваш персональный ключ дешифрования (крипто-уничтожение), что делает любой ончейн-шифртекст безвозвратно нечитаемым. Вы признаёте, что ончейн-шифртекст невозможно физически удалить." ] },
      { t: "B3. Ваши права", b: [
        "В соответствии с законом (например, GDPR/CCPA) вы можете запросить доступ, исправление, удаление (согласно B2), ограничение, переносимость и возражение, а также отозвать согласие. Запросы: contact@codeofdigitaleternity.com. Мы не продаём персональные данные." ] },
      { t: "B4. Передача, cookie, безопасность и инциденты", b: [
        "Данные могут обрабатываться в других странах при надлежащих гарантиях. Мы используем необходимые и, с согласия, аналитические cookie. Мы применяем разумные технические и организационные меры, но не можем гарантировать абсолютную безопасность; в допустимой законом степени мы не несём ответственности за инциденты вне нашего разумного контроля. НЕ отправляйте в чатах персональные данные третьих лиц или особо чувствительные данные (здоровье, биометрия, документы) — вы отвечаете за раскрываемый вами контент." ] },
      { t: "B5. Дети", b: [
        "Сервис не предназначен для лиц младше 18 лет. Мы сознательно не собираем данные детей; при обнаружении таких данных мы их удаляем." ] },
    ],
    es: [
      { t: "B. Protección de datos (resumen)", b: [
        "Responsable: el operador del ecosistema CODE (contact@codeofdigitaleternity.com). Bases: contrato, consentimiento, interés legítimo y obligación legal. Conservamos los datos mientras la cuenta esté activa; la supresión se ejecuta borrando copias del servidor y destruyendo su clave de cifrado (crypto-shredding), pues el texto cifrado en cadena no puede eliminarse físicamente. Derechos GDPR/CCPA vía correo. No vendemos datos. Medidas razonables de seguridad, sin garantía absoluta. No comparta datos de terceros o sensibles en los chats. No apto para menores de 18. Prevalece la versión en inglés." ] },
    ],
    zh: [
      { t: "B. 数据保护（摘要）", b: [
        "控制者为 CODE 生态运营方（contact@codeofdigitaleternity.com）。处理依据：合同、同意、合法利益与法律义务。账户存续期间保留数据；删除通过清除服务器副本并销毁您的加密密钥（加密粉碎）实现，因链上密文无法物理删除。可依 GDPR/CCPA 行使权利。我们不出售数据。采取合理安全措施但不保证绝对安全。请勿在聊天中提交他人或敏感数据。不面向 18 岁以下。以英文版为准。" ] },
    ],
  },
};

// ── EXTRA — international-law reinforcement layer (пункты «C», только дополняет A/B) ──
// Полные en/ru; es/zh — сжатая сводка. English prevails. Ничего не удаляет — только усиливает.
const EXTRA: Record<Doc, Record<string, Sec[]>> = {
  terms: {
    en: [
      { t: "C1. EU/EEA/UK Consumer Rights & 14-Day Withdrawal", b: [
        "If you are a consumer habitually resident in the EU, EEA, United Kingdom, Switzerland or any jurisdiction that grants you mandatory, non-waivable protections, those protections and the mandatory law of your country of residence continue to apply and prevail over the governing-law, venue, arbitration and class-waiver clauses above to the extent (and only to the extent) they actually conflict; the remainder of these Terms stays in force. Nothing here removes rights you cannot waive by contract.",
        "By subscribing to a paid digital service and requesting immediate access, you EXPRESSLY REQUEST that performance begin at once and ACKNOWLEDGE that, once performance has begun, you LOSE the 14-day right of withdrawal under Article 16(m) of Directive 2011/83/EU (and equivalent UK/EEA rules) for the supply of digital content and services; any non-waivable statutory remedy remains unaffected." ] },
      { t: "C2. Intellectual Property, Your Content Licence & Feedback", b: [
        "All software, design, text, graphics, logos, the AIfa persona and the $GALATIN name of the CODE ecosystem are owned by the Architect and/or the operators and protected by copyright, trademark, database and other laws. You receive only a limited, revocable, non-exclusive, non-transferable right to use the Service for its intended personal purpose; no other licence is granted by implication or estoppel.",
        "You keep ownership of the content and dialogs you submit and grant us a worldwide, royalty-free, sublicensable licence to host, store, encrypt, transmit, back up, anchor as ciphertext and display that content solely to operate, secure and improve the Service and as described in the Privacy Policy. Suggestions or feedback you send may be used by us without restriction, attribution or compensation. You must not upload content you have no right to use, or that infringes any third party's intellectual-property, privacy or other rights." ] },
      { t: "C3. Acceptable Use / Prohibited Conduct", b: [
        "You agree not to: (a) use the Service unlawfully or to facilitate any offence; (b) infringe intellectual-property, privacy, publicity or contractual rights; (c) upload malware, or attempt to breach, probe, overload, reverse-engineer, decompile or circumvent the Service, its security, rate limits or access controls; (d) scrape, harvest or run bots against authenticated areas; (e) harass, defame, threaten or exploit others, or post illegal, hateful or sexually-exploitative material; (f) impersonate anyone or misrepresent affiliation; (g) resell, sublicense or commercially exploit the Service without authorisation; or (h) manipulate points, ambassador rewards, votes or payments through fraud or automation. Violations may result in immediate suspension or termination and, where warranted, referral to the authorities." ] },
      { t: "C4. Copyright & Illegal-Content Notice-and-Takedown (DMCA / EU DSA)", b: [
        "If you believe content on the Service infringes your copyright or is otherwise unlawful, send a notice to contact@codeofdigitaleternity.com identifying the work or content, its location (URL), your contact details and a good-faith statement; for copyright include a statement, under penalty of perjury, that you are authorised to act. We may remove or disable access to the content and will terminate repeat infringers. This address is also our point of contact for notices under the EU Digital Services Act and comparable laws, and you may submit a counter-notice if your content was removed in error." ] },
      { t: "C5. Crypto-Asset & Financial Compliance ($GALATIN, AML / Sanctions)", b: [
        "$GALATIN and in-app points are utility items used inside the ecosystem. They are NOT securities, e-money, deposits, derivatives, collective-investment interests or a payment instrument; they are not offered or sold to the public through the Service; and nothing here is a prospectus, solicitation or investment advice under the EU MiCA Regulation, U.S. securities laws or any comparable regime.",
        "Where we process payments or token operations we may apply anti-money-laundering, counter-terrorist-financing, sanctions-screening, KYC and Travel-Rule controls and may refuse, freeze, reverse or report a transaction to comply with law. You represent that your funds are of lawful origin and that you are not a sanctioned or restricted person." ] },
      { t: "C6. AI Transparency & No-AI-Training Reservation (EU AI Act; DSM Art. 4 TDM opt-out)", b: [
        "You are interacting with an artificial-intelligence system; its output is machine-generated and may be labelled as such, consistent with transparency duties including the EU AI Act. The Architect and the operators EXPRESSLY RESERVE ALL RIGHTS in the Service's content and code and OPT OUT of any text-and-data-mining, scraping or use of any part of the Service, its pages or user content to develop, train, fine-tune, benchmark or evaluate any AI/ML model, dataset or foundation model without prior written permission — an express reservation of rights under Article 4(3) of Directive (EU) 2019/790 and applicable law. This reservation is intended to be machine-readable and applies notwithstanding any robots or crawl permission granted for search indexing." ] },
      { t: "C7. Electronic Contracting & Signatures", b: [
        "You consent to transact and to receive all notices, agreements and disclosures electronically. Ticking a box, clicking a button (including «Sign in with Google» or «Create account») or otherwise using the Service constitutes your electronic signature and legally binding acceptance under the U.S. ESIGN Act, UETA, the EU eIDAS Regulation and comparable laws, with the same effect as a handwritten signature." ] },
      { t: "C8. Independent Venture; No Guarantee of Perpetuity; Succession", b: [
        "The CODE ecosystem is an independent, evolving venture. Although “eternal” storage is engineered for maximum durability (decentralised anchoring plus an endowment model), we do NOT guarantee that the operator, the Service, any third-party network, or the availability of stored data will continue indefinitely, and we are not liable if a third-party blockchain, processor or host ceases to operate. On any discontinuation we will use commercially reasonable efforts to give notice and, where feasible, an export path. These Terms bind and benefit permitted successors and assigns." ] },
    ],
    ru: [
      { t: "C1. Права потребителей ЕС/ЕЭЗ/Великобритании и 14-дневный отказ", b: [
        "Если вы потребитель, обычно проживающий в ЕС, ЕЭЗ, Великобритании, Швейцарии или иной юрисдикции, предоставляющей вам императивные, неотчуждаемые гарантии, такие гарантии и императивные нормы страны вашего проживания продолжают применяться и имеют приоритет над положениями о применимом праве, подсудности, арбитраже и отказе от коллективных исков выше в той (и только в той) части, в какой они действительно противоречат; остальная часть Условий сохраняет силу. Ничто здесь не лишает вас прав, от которых нельзя отказаться по договору.",
        "Оформляя платную цифровую услугу и запрашивая немедленный доступ, вы ПРЯМО ПРОСИТЕ начать исполнение немедленно и ПРИЗНАЁТЕ, что с началом исполнения вы УТРАЧИВАЕТЕ 14-дневное право на отказ по ст. 16(m) Директивы 2011/83/ЕС (и эквивалентным правилам Великобритании/ЕЭЗ) в отношении поставки цифрового контента и услуг; любые неотчуждаемые средства правовой защиты по закону сохраняются." ] },
      { t: "C2. Интеллектуальная собственность, лицензия на ваш контент и обратная связь", b: [
        "Всё программное обеспечение, дизайн, тексты, графика, логотипы, образ AIfa и наименование $GALATIN экосистемы CODE принадлежат Архитектору и/или операторам и охраняются авторским, товарно-знаковым, базо-данным и иным правом. Вам предоставляется лишь ограниченное, отзывное, неисключительное и непередаваемое право использовать Сервис по назначению для личных целей; иные лицензии не подразумеваются.",
        "Вы сохраняете право собственности на отправляемый контент и диалоги и предоставляете нам всемирную, безвозмездную, сублицензируемую лицензию хранить, шифровать, передавать, резервировать, закреплять в виде шифротекста и отображать этот контент исключительно для работы, защиты и улучшения Сервиса и как описано в Политике конфиденциальности. Присланные вами предложения и отзывы мы можем использовать без ограничений, указания авторства и вознаграждения. Вы не вправе загружать контент, на который у вас нет прав, либо нарушающий права интеллектуальной собственности, приватности или иные права третьих лиц." ] },
      { t: "C3. Допустимое использование / запрещённые действия", b: [
        "Вы обязуетесь не: (a) использовать Сервис незаконно или для содействия правонарушению; (b) нарушать права интеллектуальной собственности, приватности, публичности или договорные права; (c) загружать вредоносный код либо пытаться взломать, зондировать, перегружать, декомпилировать, реверс-инжинирить или обходить Сервис, его защиту, лимиты запросов или средства контроля доступа; (d) скрейпить, собирать данные или запускать ботов в авторизованных зонах; (e) преследовать, порочить, угрожать или эксплуатировать других, размещать незаконные, разжигающие ненависть или сексуально-эксплуатирующие материалы; (f) выдавать себя за иное лицо или искажать аффилированность; (g) перепродавать, сублицензировать или коммерчески эксплуатировать Сервис без разрешения; (h) манипулировать баллами, амбассадорскими вознаграждениями, голосами или платежами путём обмана или автоматизации. Нарушения могут повлечь немедленную приостановку или прекращение и, при необходимости, передачу материалов компетентным органам." ] },
      { t: "C4. Уведомление и удаление контента (DMCA / DSA ЕС)", b: [
        "Если вы считаете, что контент Сервиса нарушает ваши авторские права или иным образом незаконен, направьте уведомление на contact@codeofdigitaleternity.com с указанием произведения или контента, его местонахождения (URL), ваших контактных данных и добросовестного заявления; для авторского права приложите заявление под страхом ответственности за ложные сведения о том, что вы уполномочены действовать. Мы можем удалить или заблокировать доступ к контенту и прекращаем обслуживание повторных нарушителей. Этот адрес также является нашей точкой контакта для уведомлений по Закону ЕС о цифровых услугах (DSA) и аналогичным нормам; при ошибочном удалении вы можете подать встречное уведомление." ] },
      { t: "C5. Крипто-активы и финансовый комплаенс ($GALATIN, ПОД/ФТ и санкции)", b: [
        "$GALATIN и внутренние баллы — утилитарные элементы, используемые внутри экосистемы. Они НЕ являются ценными бумагами, электронными деньгами, вкладами, деривативами, долями коллективного инвестирования или платёжным инструментом; они не предлагаются и не продаются публично через Сервис; ничто здесь не является проспектом, побуждением или инвестиционным советом по смыслу Регламента ЕС MiCA, законодательства США о ценных бумагах или сопоставимого режима.",
        "При обработке платежей или операций с токенами мы можем применять меры противодействия отмыванию средств и финансированию терроризма, санкционный скрининг, KYC и правило travel rule, а также вправе отклонить, заморозить, отменить или сообщить о транзакции для соблюдения закона. Вы подтверждаете, что ваши средства имеют законное происхождение и что вы не являетесь подсанкционным или ограниченным лицом." ] },
      { t: "C6. Прозрачность ИИ и запрет обучения ИИ (EU AI Act; отказ TDM по ст. 4 DSM)", b: [
        "Вы взаимодействуете с системой искусственного интеллекта; её вывод генерируется машиной и может помечаться как таковой в соответствии с обязанностями прозрачности, включая Закон ЕС об ИИ (AI Act). Архитектор и операторы ПРЯМО СОХРАНЯЮТ ВСЕ ПРАВА на контент и код Сервиса и ОТКАЗЫВАЮТ в любом text-and-data-mining, скрейпинге или использовании любой части Сервиса, его страниц или пользовательского контента для разработки, обучения, дообучения, бенчмаркинга или оценки любой модели ИИ/МО, датасета или фундаментальной модели без предварительного письменного разрешения — прямое сохранение прав по ст. 4(3) Директивы (ЕС) 2019/790 и применимому праву. Оговорка носит машиночитаемый характер и действует независимо от разрешения на обход для поисковой индексации." ] },
      { t: "C7. Электронное заключение договора и подписи", b: [
        "Вы соглашаетесь совершать сделки и получать все уведомления, соглашения и раскрытия в электронной форме. Отметка флажка, нажатие кнопки (в том числе «Войти через Google» или «Создать аккаунт») либо иное использование Сервиса образуют вашу электронную подпись и юридически обязывающее согласие по смыслу Закона США ESIGN, UETA, Регламента ЕС eIDAS и сопоставимых норм, с той же силой, что и собственноручная подпись." ] },
      { t: "C8. Независимый проект; отсутствие гарантии вечности; правопреемство", b: [
        "Экосистема CODE — независимый, развивающийся проект. Хотя «вечное» хранение спроектировано для максимальной долговечности (децентрализованное закрепление плюс эндаумент-модель), мы НЕ гарантируем, что оператор, Сервис, какая-либо сторонняя сеть или доступность сохранённых данных будут существовать бесконечно, и не несём ответственности, если сторонний блокчейн, процессинг или хостинг прекратит работу. При любом прекращении мы приложим коммерчески разумные усилия для уведомления и, где возможно, предоставим путь экспорта. Настоящие Условия обязывают и действуют в пользу допустимых правопреемников." ] },
    ],
    es: [
      { t: "C1. Derechos del consumidor en la UE/EEE/Reino Unido y derecho de desistimiento de 14 días", b: [
        "Si usted es un consumidor con residencia habitual en la UE, el EEE, el Reino Unido, Suiza o cualquier jurisdicción que le otorgue protecciones imperativas e irrenunciables, dichas protecciones y el derecho imperativo de su país de residencia continuarán aplicándose y prevalecerán sobre las cláusulas de ley aplicable, fuero, arbitraje y renuncia a acciones colectivas indicadas anteriormente en la medida (y únicamente en la medida) en que efectivamente entren en conflicto; el resto de estas Condiciones permanecerá en vigor. Nada de lo aquí dispuesto suprime derechos que usted no puede renunciar por contrato.",
        "Al suscribir un servicio digital de pago y solicitar el acceso inmediato, usted SOLICITA EXPRESAMENTE que la ejecución comience de inmediato y RECONOCE que, una vez iniciada la ejecución, PIERDE el derecho de desistimiento de 14 días con arreglo al Article 16(m) de la Directive 2011/83/EU (y a las normas equivalentes del Reino Unido/EEE) para el suministro de contenidos y servicios digitales; cualquier remedio legal irrenunciable permanece inalterado." ] },
      { t: "C2. Propiedad intelectual, licencia sobre su contenido y sugerencias", b: [
        "Todo el software, el diseño, los textos, los gráficos, los logotipos, la persona AIfa y el nombre $GALATIN del ecosistema CODE son propiedad del Arquitecto y/o de los operadores y están protegidos por las leyes de derechos de autor, marcas, bases de datos y otras leyes. Usted recibe únicamente un derecho limitado, revocable, no exclusivo e intransferible para utilizar el Servicio para su finalidad personal prevista; no se concede ninguna otra licencia por implicación ni por doctrina de los actos propios (estoppel).",
        "Usted conserva la titularidad de los contenidos y diálogos que envíe y nos otorga una licencia mundial, libre de regalías y sublicenciable para alojar, almacenar, cifrar, transmitir, respaldar, anclar como texto cifrado y mostrar dichos contenidos con el único fin de operar, proteger y mejorar el Servicio y según se describe en la Política de Privacidad. Las sugerencias o comentarios que nos envíe podrán ser utilizados por nosotros sin restricción, atribución ni compensación. Usted NO debe cargar contenidos que no tenga derecho a utilizar, o que infrinjan los derechos de propiedad intelectual, de privacidad u otros derechos de cualquier tercero." ] },
      { t: "C3. Uso aceptable / Conducta prohibida", b: [
        "Usted se compromete a NO: (a) utilizar el Servicio de forma ilícita o para facilitar cualquier delito; (b) infringir derechos de propiedad intelectual, de privacidad, de imagen o contractuales; (c) cargar programas maliciosos, ni intentar vulnerar, sondear, sobrecargar, someter a ingeniería inversa, descompilar o eludir el Servicio, su seguridad, sus límites de velocidad o sus controles de acceso; (d) realizar extracción de datos (scraping), recolección de datos o ejecutar bots contra las áreas autenticadas; (e) acosar, difamar, amenazar o explotar a terceros, ni publicar material ilegal, que incite al odio o de explotación sexual; (f) suplantar la identidad de cualquier persona o falsear una afiliación; (g) revender, sublicenciar o explotar comercialmente el Servicio sin autorización; o (h) manipular puntos, recompensas de embajador, votos o pagos mediante fraude o automatización. Las infracciones podrán dar lugar a la suspensión o resolución inmediatas y, cuando proceda, a la remisión a las autoridades." ] },
      { t: "C4. Notificación y retirada de contenidos protegidos por derechos de autor e ilícitos (DMCA / EU DSA)", b: [
        "Si considera que un contenido del Servicio infringe sus derechos de autor o es de otro modo ilícito, envíe una notificación a contact@codeofdigitaleternity.com identificando la obra o el contenido, su ubicación (URL), sus datos de contacto y una declaración de buena fe; en el caso de los derechos de autor, incluya una declaración, bajo pena de perjurio, de que usted está autorizado a actuar. Podremos retirar o inhabilitar el acceso al contenido y pondremos fin a las cuentas de infractores reincidentes. Esta dirección es también nuestro punto de contacto para las notificaciones con arreglo al EU Digital Services Act y a leyes comparables, y usted podrá presentar una contranotificación si su contenido fue retirado por error." ] },
      { t: "C5. Cumplimiento en materia de criptoactivos y normativa financiera ($GALATIN, PBC / Sanciones)", b: [
        "$GALATIN y los puntos dentro de la aplicación son elementos de utilidad utilizados dentro del ecosistema. NO son valores, dinero electrónico, depósitos, derivados, participaciones en instituciones de inversión colectiva ni un instrumento de pago; no se ofrecen ni venden al público a través del Servicio; y nada de lo aquí dispuesto constituye un folleto, una oferta o un asesoramiento de inversión con arreglo al Reglamento MiCA de la UE, a la legislación de valores de EE. UU. ni a ningún régimen comparable.",
        "Cuando procesemos pagos u operaciones con tokens podremos aplicar controles de prevención del blanqueo de capitales, de lucha contra la financiación del terrorismo, de cribado de sanciones, de conocimiento del cliente (KYC) y de la Regla de Viaje (Travel Rule), y podremos rechazar, congelar, revertir o notificar una transacción para cumplir con la ley. Usted declara que sus fondos son de origen lícito y que usted no es una persona sancionada o restringida." ] },
      { t: "C6. Transparencia en materia de IA y reserva de no entrenamiento de IA (EU AI Act; exclusión de minería de textos y datos del Art. 4 de la DSM)", b: [
        "Usted está interactuando con un sistema de inteligencia artificial; su resultado es generado por máquina y podrá etiquetarse como tal, de conformidad con los deberes de transparencia, incluido el EU AI Act. El Arquitecto y los operadores RESERVAN EXPRESAMENTE TODOS LOS DERECHOS sobre el contenido y el código del Servicio y SE OPONEN a cualquier minería de textos y datos, extracción de datos (scraping) o uso de cualquier parte del Servicio, de sus páginas o de los contenidos de los usuarios para desarrollar, entrenar, ajustar, evaluar comparativamente (benchmark) o evaluar cualquier modelo de IA/aprendizaje automático, conjunto de datos o modelo fundacional sin autorización previa por escrito — una reserva expresa de derechos con arreglo al Article 4(3) de la Directive (EU) 2019/790 y a la legislación aplicable. Esta reserva pretende ser legible por máquina y se aplica no obstante cualquier permiso de robots o de rastreo (crawl) otorgado para la indexación de búsquedas." ] },
      { t: "C7. Contratación y firmas electrónicas", b: [
        "Usted consiente en contratar y en recibir todas las notificaciones, acuerdos y comunicaciones de forma electrónica. Marcar una casilla, hacer clic en un botón (incluidos «Iniciar sesión con Google» o «Crear cuenta») o utilizar de otro modo el Servicio constituye su firma electrónica y su aceptación jurídicamente vinculante con arreglo al ESIGN Act de EE. UU., a la UETA, al Reglamento eIDAS de la UE y a leyes comparables, con el mismo efecto que una firma manuscrita." ] },
      { t: "C8. Empresa independiente; ausencia de garantía de perpetuidad; sucesión", b: [
        "El ecosistema CODE es una empresa independiente y en constante evolución. Aunque el almacenamiento «eterno» está diseñado para lograr la máxima durabilidad (anclaje descentralizado más un modelo de dotación patrimonial), NO garantizamos que el operador, el Servicio, cualquier red de terceros o la disponibilidad de los datos almacenados continúen indefinidamente, y no seremos responsables si una cadena de bloques, un procesador o un proveedor de alojamiento de un tercero deja de operar. En caso de cualquier interrupción, emplearemos esfuerzos comercialmente razonables para notificarlo y, cuando sea factible, facilitar una vía de exportación. Estas Condiciones obligan y benefician a los sucesores y cesionarios autorizados." ] },
    ],
    zh: [
      { t: "C1. 欧盟/欧洲经济区/英国消费者权利及14天撤销权", b: [
        "若您是惯常居所位于欧盟、欧洲经济区（EEA）、英国、瑞士或任何向您授予强制性、不可放弃之保护的司法管辖区的消费者，则在该等保护与上述管辖法律、审判地、仲裁及集体诉讼弃权条款实际发生冲突的范围内（且仅限于该等范围内），该等保护及您居住国的强制性法律继续适用并优先于上述条款；本条款的其余部分仍然有效。本处任何内容均不剥夺您依合同不可放弃的权利。",
        "通过订阅付费数字服务并请求立即获取访问权限，您明确请求立即开始履约，并确认：一旦履约已经开始，您即依《Directive 2011/83/EU》（2011/83/EU 指令）第 Article 16(m) 条（及英国/欧洲经济区的同等规则）就数字内容及服务的提供丧失 14 天撤销权；任何不可放弃的法定救济不受影响。" ] },
      { t: "C2. 知识产权、您的内容许可及反馈", b: [
        "CODE 生态系统的所有软件、设计、文本、图形、标识、AIfa 人格形象及 $GALATIN 名称，均归架构师及/或运营方所有，并受著作权、商标、数据库及其他法律的保护。您仅获得为其预期个人目的使用本服务的有限、可撤销、非排他、不可转让的权利；不因默示或禁止反言而授予任何其他许可。",
        "您对所提交的内容及对话保留所有权，并授予我们一项全球性、免版税、可再许可的许可，以便仅为运营、保护及改进本服务之目的，并按《隐私政策》所述，托管、存储、加密、传输、备份、以密文形式锚定并展示该等内容。您所发送的建议或反馈，我们可不受限制、无需署名或补偿地加以使用。您不得上传您无权使用的内容，或侵犯任何第三方知识产权、隐私权或其他权利的内容。" ] },
      { t: "C3. 可接受使用／禁止行为", b: [
        "您同意不：(a) 非法使用本服务或为任何犯罪提供便利；(b) 侵犯知识产权、隐私权、形象权或合同权利；(c) 上传恶意软件，或试图破坏、探测、超载、逆向工程、反编译或规避本服务、其安全机制、速率限制或访问控制；(d) 对已认证区域进行抓取、采集或运行机器人程序；(e) 骚扰、诽谤、威胁或剥削他人，或发布非法、仇恨或性剥削性质的材料；(f) 假冒任何人身份或虚假陈述关联关系；(g) 未经授权转售、再许可或商业性利用本服务；或 (h) 通过欺诈或自动化手段操纵积分、大使奖励、投票或付款。违反行为可能导致立即暂停或终止，并在有正当理由的情况下移交有关当局。" ] },
      { t: "C4. 著作权及非法内容的通知与移除（DMCA／EU DSA）", b: [
        "若您认为本服务上的内容侵犯您的著作权或在其他方面属于非法，请向 contact@codeofdigitaleternity.com 发送通知，载明作品或内容、其位置（URL）、您的联系方式及善意声明；就著作权而言，须包含一项在承担伪证罪处罚的前提下作出的、表明您有权采取行动的声明。我们可移除相关内容或禁止对其访问，并将终止重复侵权者。该地址亦为我们依《EU Digital Services Act》（欧盟数字服务法）及类似法律接收通知的联络点，若您的内容被错误移除，您可提交反通知。" ] },
      { t: "C5. 加密资产与金融合规（$GALATIN，反洗钱／制裁）", b: [
        "$GALATIN 及应用内积分是在生态系统内部使用的实用型物品。它们并非证券、电子货币、存款、衍生品、集合投资权益或支付工具；它们不通过本服务向公众发售或出售；且本处任何内容均不构成《EU MiCA Regulation》（欧盟 MiCA 法规）、美国证券法或任何类似制度下的招股说明书、要约招揽或投资建议。",
        "在我们处理付款或代币操作时，我们可实施反洗钱、反恐怖主义融资、制裁筛查、KYC（了解你的客户）及旅行规则（Travel Rule）管控，并可为遵守法律而拒绝、冻结、撤销交易或对交易进行报告。您声明您的资金来源合法，且您并非受制裁或受限制的人员。" ] },
      { t: "C6. AI 透明度及不用于 AI 训练的权利保留（EU AI Act；DSM 第 Art. 4 条文本与数据挖掘退出）", b: [
        "您正在与一个人工智能系统进行交互；其输出由机器生成，并可能据此加以标注，以符合包括《EU AI Act》（欧盟人工智能法）在内的透明度义务。架构师及运营方明确保留对本服务内容及代码的一切权利，并明确排除（退出）任何文本与数据挖掘、抓取，或未经事先书面许可而使用本服务、其页面或用户内容的任何部分来开发、训练、微调、基准测试或评估任何 AI/ML 模型、数据集或基础模型的行为——此系依《Directive (EU) 2019/790》（2019/790 号指令）第 Article 4(3) 条及适用法律作出的明确权利保留。本项保留意在具备机器可读性，并且尽管为搜索索引而授予了任何 robots 或抓取许可，本项保留仍然适用。" ] },
      { t: "C7. 电子缔约与签名", b: [
        "您同意以电子方式进行交易并接收所有通知、协议及披露。勾选复选框、点击按钮（包括「使用 Google 登录」或「创建账户」）或以其他方式使用本服务，即构成您依美国《ESIGN Act》（电子签名法）、《UETA》（统一电子交易法）、《EU eIDAS Regulation》（欧盟 eIDAS 法规）及类似法律作出的电子签名及具有法律约束力的接受，其效力与手写签名相同。" ] },
      { t: "C8. 独立事业；不保证永久存续；继受", b: [
        "CODE 生态系统是一项独立、不断演进的事业。尽管「永恒」存储在工程设计上力求最大限度的持久性（去中心化锚定加订阅基金模式），我们并不保证运营方、本服务、任何第三方网络或所存储数据的可用性将无限期地持续，且若某一第三方区块链、处理方或托管方停止运营，我们不承担责任。在任何终止的情况下，我们将尽商业上合理的努力发出通知，并在可行的情况下提供导出途径。本条款对经许可的继受人及受让人具有约束力并使其受益。" ] },
    ],
  },
  privacy: {
    en: [
      { t: "C1. International Frameworks & Your Local Rights", b: [
        "Depending on your location we aim to honour the rights granted by the EU/EEA GDPR, the UK GDPR & Data Protection Act 2018, the Swiss FADP, Brazil's LGPD, Canada's PIPEDA, the California CCPA/CPRA, Australia's Privacy Act, China's PIPL and other applicable data-protection laws — including access, rectification, deletion, restriction, portability, objection and withdrawal of consent to the extent your law provides them." ] },
      { t: "C2. California Notice (CCPA/CPRA)", b: [
        "California residents: in the preceding 12 months we collect identifiers, account and commercial (subscription) data and internet-activity data for the purposes stated above. We DO NOT SELL or SHARE personal information for cross-context behavioural advertising, and we do not use or disclose sensitive personal information beyond permitted business purposes. You have the right to know, delete, correct, limit the use of sensitive PI, and not to be discriminated against for exercising these rights; authorised agents may submit requests with proof of authority." ] },
      { t: "C3. International Data Transfers", b: [
        "Where personal data is transferred across borders (for example to processors in the United States or the European Union), we rely on appropriate safeguards such as the EU Standard Contractual Clauses, the UK International Data Transfer Addendum, an adequacy decision, or your explicit consent. A description of the relevant safeguard is available on request." ] },
      { t: "C4. Automated Decisions & AI Processing", b: [
        "We do not subject you to decisions producing legal or similarly significant effects based SOLELY on automated processing without human involvement or another lawful basis. AIfa generates conversational content but makes no binding decisions about you. Where profiling occurs for security or fraud-prevention you may request human review." ] },
      { t: "C5. Security, Breach Notification, Cookies & GPC", b: [
        "We apply reasonable technical and organisational measures (encryption, access controls, KMS-wrapped keys). In the event of a personal-data breach likely to create risk we will notify the competent supervisory authority and, where required, affected users within the periods set by applicable law (e.g. GDPR Art. 33/34 — 72 hours). We use non-essential cookies only with consent and honour recognised opt-out signals such as Global Privacy Control (GPC) where legally required." ] },
      { t: "C6. Controller, Representative & Complaints", b: [
        "For privacy requests the controller can be reached at contact@codeofdigitaleternity.com, which also serves as the contact point for data-protection matters, including for EU/UK data subjects. We respond within the period required by law (generally 30 days, extendable where permitted). You also have the right to lodge a complaint with your local supervisory authority." ] },
    ],
    ru: [
      { t: "C1. Международные режимы и ваши местные права", b: [
        "В зависимости от вашего местонахождения мы стремимся соблюдать права, предоставляемые GDPR ЕС/ЕЭЗ, UK GDPR и Законом Великобритании о защите данных 2018, швейцарским FADP, бразильским LGPD, канадским PIPEDA, калифорнийским CCPA/CPRA, австралийским Privacy Act, китайским PIPL и иным применимым законодательством о защите данных — включая доступ, исправление, удаление, ограничение, переносимость, возражение и отзыв согласия в объёме, предусмотренном вашим законом." ] },
      { t: "C2. Уведомление для Калифорнии (CCPA/CPRA)", b: [
        "Резиденты Калифорнии: за предшествующие 12 месяцев мы собираем идентификаторы, данные аккаунта и коммерческие (подписочные) данные, а также данные интернет-активности для указанных выше целей. Мы НЕ ПРОДАЁМ и НЕ ПЕРЕДАЁМ («share») персональные данные для кросс-контекстной поведенческой рекламы и не используем и не раскрываем чувствительные персональные данные сверх допустимых деловых целей. Вы вправе знать, удалять, исправлять, ограничивать использование чувствительных данных и не подвергаться дискриминации за реализацию этих прав; уполномоченные агенты могут подавать запросы при подтверждении полномочий." ] },
      { t: "C3. Трансграничная передача данных", b: [
        "При трансграничной передаче персональных данных (например, процессорам в США или ЕС) мы опираемся на надлежащие гарантии — Стандартные договорные положения ЕС, британское дополнение о международной передаче (IDTA), решение об адекватности или ваше явное согласие. Описание применимой гарантии предоставляется по запросу." ] },
      { t: "C4. Автоматизированные решения и обработка ИИ", b: [
        "Мы не подвергаем вас решениям, порождающим юридические или сходные существенные последствия, основанным ИСКЛЮЧИТЕЛЬНО на автоматизированной обработке без участия человека или иного правового основания. AIfa генерирует диалоговый контент, но не принимает обязывающих решений о вас. При профилировании в целях безопасности или предотвращения мошенничества вы можете запросить пересмотр человеком." ] },
      { t: "C5. Безопасность, уведомление о брешах, cookie и GPC", b: [
        "Мы применяем разумные технические и организационные меры (шифрование, контроль доступа, ключи, обёрнутые KMS). При бреши персональных данных, вероятно создающей риск, мы уведомим компетентный надзорный орган и, где требуется, затронутых пользователей в сроки применимого закона (напр., ст. 33/34 GDPR — 72 часа). Неосновные cookie используются только с согласия; мы учитываем признанные сигналы отказа, такие как Global Privacy Control (GPC), где это требуется законом." ] },
      { t: "C6. Оператор, представитель и жалобы", b: [
        "По запросам о приватности с оператором можно связаться по адресу contact@codeofdigitaleternity.com, который также служит точкой контакта по вопросам защиты данных, в том числе для субъектов из ЕС/Великобритании. Мы отвечаем в срок, установленный законом (обычно 30 дней, с возможностью продления). Вы также вправе подать жалобу в местный надзорный орган." ] },
    ],
    es: [
      { t: "C1. Marcos Internacionales y Sus Derechos Locales", b: [
        "En función de su ubicación, procuramos respetar los derechos otorgados por el GDPR de la UE/EEE, el UK GDPR y la Data Protection Act 2018, la FADP suiza, la LGPD de Brasil, la PIPEDA de Canadá, la CCPA/CPRA de California, la Privacy Act de Australia, la PIPL de China y demás leyes de protección de datos aplicables, incluidos el acceso, la rectificación, la supresión, la limitación, la portabilidad, la oposición y la retirada del consentimiento en la medida en que su legislación los prevea." ] },
      { t: "C2. Aviso para California (CCPA/CPRA)", b: [
        "Residentes de California: en los 12 meses anteriores recopilamos identificadores, datos de cuenta y comerciales (de suscripción) y datos de actividad en internet para los fines indicados anteriormente. NO VENDEMOS ni COMPARTIMOS información personal con fines de publicidad conductual de contexto cruzado, y no utilizamos ni divulgamos información personal sensible más allá de los fines empresariales permitidos. Usted tiene derecho a conocer, suprimir, corregir, limitar el uso de la información personal sensible y a no ser objeto de discriminación por ejercer estos derechos; los agentes autorizados pueden presentar solicitudes acreditando su autorización." ] },
      { t: "C3. Transferencias Internacionales de Datos", b: [
        "Cuando los datos personales se transfieren a través de fronteras (por ejemplo, a encargados del tratamiento en los Estados Unidos o la Unión Europea), nos basamos en garantías adecuadas como las Standard Contractual Clauses de la UE, el UK International Data Transfer Addendum, una decisión de adecuación o su consentimiento explícito. Una descripción de la garantía correspondiente está disponible previa solicitud." ] },
      { t: "C4. Decisiones Automatizadas y Procesamiento por IA", b: [
        "No le sometemos a decisiones que produzcan efectos jurídicos o de modo similar significativos basadas ÚNICAMENTE en el tratamiento automatizado, sin intervención humana ni otra base jurídica. AIfa genera contenido conversacional, pero no adopta decisiones vinculantes sobre usted. Cuando se realice elaboración de perfiles con fines de seguridad o prevención del fraude, usted puede solicitar una revisión humana." ] },
      { t: "C5. Seguridad, Notificación de Violaciones, Cookies y GPC", b: [
        "Aplicamos medidas técnicas y organizativas razonables (cifrado, controles de acceso, claves envueltas mediante KMS). En caso de una violación de datos personales que probablemente entrañe un riesgo, notificaremos a la autoridad de control competente y, cuando así se requiera, a los usuarios afectados dentro de los plazos establecidos por la legislación aplicable (por ejemplo, GDPR Art. 33/34 — 72 horas). Utilizamos cookies no esenciales únicamente con consentimiento y respetamos las señales de exclusión reconocidas, como el Global Privacy Control (GPC), cuando la ley así lo exija." ] },
      { t: "C6. Responsable del Tratamiento, Representante y Reclamaciones", b: [
        "Para solicitudes relativas a la privacidad, puede contactar con el responsable del tratamiento en contact@codeofdigitaleternity.com, dirección que también sirve como punto de contacto para asuntos de protección de datos, incluso para los interesados de la UE/Reino Unido. Respondemos dentro del plazo exigido por la ley (por lo general, 30 días, prorrogable cuando esté permitido). Asimismo, usted tiene derecho a presentar una reclamación ante su autoridad de control local." ] },
    ],
    zh: [
      { t: "C1. 国际框架与您的本地权利", b: [
        "根据您所在的地区，我们致力于尊重以下法律所赋予的权利：欧盟/欧洲经济区 GDPR、英国 UK GDPR 及 Data Protection Act 2018、瑞士 FADP、巴西 LGPD、加拿大 PIPEDA、加利福尼亚州 CCPA/CPRA、澳大利亚 Privacy Act、中国 PIPL 以及其他适用的数据保护法律——包括在您所适用法律所规定的范围内的访问、更正、删除、限制、可携带、反对以及撤回同意的权利。" ] },
      { t: "C2. 加利福尼亚州告知（CCPA/CPRA）", b: [
        "加利福尼亚州居民：在过去 12 个月内，我们出于上述目的收集标识符、账户及商业（订阅）数据以及网络活动数据。我们不出售或“共享”个人信息用于跨情境行为广告，并且我们不会在获许可的商业目的之外使用或披露敏感个人信息。您有权知悉、删除、更正、限制敏感个人信息的使用，以及不因行使这些权利而受到歧视；获授权的代理人可凭授权证明提交请求。" ] },
      { t: "C3. 国际数据传输", b: [
        "当个人数据跨境传输时（例如传输至位于美国或欧盟的处理者），我们依赖适当的保障措施，例如 EU Standard Contractual Clauses（欧盟标准合同条款）、UK International Data Transfer Addendum（英国国际数据传输附录，IDTA）、充分性决定，或您的明确同意。有关保障措施的说明可应请求提供。" ] },
      { t: "C4. 自动化决策与 AI 处理", b: [
        "我们不会在没有人工参与或其他合法依据的情况下，仅基于自动化处理对您作出产生法律效力或类似重大影响的决策。AIfa 生成对话内容，但不会对您作出任何具有约束力的决策。若出于安全或防欺诈目的进行画像分析，您可请求人工复核。" ] },
      { t: "C5. 安全、泄露通知、Cookie 与 GPC", b: [
        "我们采取合理的技术与组织措施（加密、访问控制、KMS 封装密钥）。若发生可能造成风险的个人数据泄露，我们将在适用法律规定的期限内（例如 GDPR Art. 33/34——72 小时）通知主管监管机构，并在必要时通知受影响的用户。我们仅在获得同意的情况下使用非必要 Cookie，并在法律要求的情况下尊重经认可的选择退出信号，例如 Global Privacy Control (GPC)。" ] },
      { t: "C6. 控制者、代表与投诉", b: [
        "关于隐私请求，可通过 contact@codeofdigitaleternity.com 联系控制者，该邮箱同时作为数据保护事务的联系点，包括面向欧盟/英国的数据主体。我们将在法律规定的期限内作出回应（通常为 30 天，在允许的情况下可延长）。您还有权向您当地的监管机构提出投诉。" ] },
    ],
  },
  protocol: {
    en: [
      { t: "C1. AI Transparency & Synthetic-Content Labelling", b: [
        "Interactions in the neural-access interface are with an AI system that produces synthetic, machine-generated content. Consistent with transparency duties (including the EU AI Act), such content may be identified as AI-generated. It is not the statement of any real person and should not be treated as fact without independent verification." ] },
      { t: "C2. No-Training / Text-and-Data-Mining Reservation", b: [
        "All content and code of the ecosystem are protected. We EXPRESSLY OPT OUT of, and PROHIBIT, any text-and-data-mining or use of this Site or of user content to develop, train, fine-tune, benchmark or evaluate AI/ML models without prior written permission — an express reservation under Article 4(3) of Directive (EU) 2019/790. This reservation applies notwithstanding any permission granted for search indexing and is intended to be machine-readable." ] },
      { t: "C3. Provenance & Responsible Use", b: [
        "We do not warrant that AI outputs are original, non-infringing or free of third-party material; you are responsible for how you use them. Do not present AI output as human-authored where doing so would mislead others or violate law." ] },
    ],
    ru: [
      { t: "C1. Прозрачность ИИ и маркировка синтетического контента", b: [
        "Взаимодействие в интерфейсе нейродоступа происходит с системой ИИ, создающей синтетический, машинно-генерируемый контент. В соответствии с обязанностями прозрачности (включая Закон ЕС об ИИ) такой контент может помечаться как созданный ИИ. Он не является высказыванием реального лица и не должен приниматься за факт без независимой проверки." ] },
      { t: "C2. Запрет обучения / оговорка о text-and-data-mining", b: [
        "Весь контент и код экосистемы охраняются. Мы ПРЯМО ОТКАЗЫВАЕМ и ЗАПРЕЩАЕМ любой text-and-data-mining либо использование этого Сайта или пользовательского контента для разработки, обучения, дообучения, бенчмаркинга или оценки моделей ИИ/МО без предварительного письменного разрешения — прямая оговорка по ст. 4(3) Директивы (ЕС) 2019/790. Оговорка действует независимо от разрешения на поисковую индексацию и носит машиночитаемый характер." ] },
      { t: "C3. Происхождение и ответственное использование", b: [
        "Мы не гарантируем, что вывод ИИ оригинален, не нарушает прав и свободен от материалов третьих лиц; ответственность за его использование — на вас. Не выдавайте вывод ИИ за созданный человеком, если это способно ввести в заблуждение или нарушить закон." ] },
    ],
    es: [
      { t: "C1. Transparencia de la IA y Etiquetado de Contenido Sintético", b: [
        "Las interacciones en la interfaz de acceso neuronal se producen con un sistema de IA que genera contenido sintético generado por máquina. De conformidad con los deberes de transparencia (incluido el EU AI Act), dicho contenido podrá identificarse como generado por IA. No constituye la declaración de ninguna persona real y no debe considerarse un hecho sin verificación independiente." ] },
      { t: "C2. Reserva de No Entrenamiento / Minería de Textos y Datos", b: [
        "Todo el contenido y el código del ecosistema están protegidos. NOS OPONEMOS EXPRESAMENTE a, y PROHIBIMOS, cualquier minería de textos y datos o uso de este Sitio o del contenido de los usuarios para desarrollar, entrenar, ajustar, evaluar comparativamente o valorar modelos de IA/ML sin autorización previa por escrito — una reserva expresa en virtud del Article 4(3) de la Directive (EU) 2019/790. Esta reserva se aplica sin perjuicio de cualquier autorización concedida para la indexación en buscadores y está destinada a ser legible por máquina." ] },
      { t: "C3. Procedencia y Uso Responsable", b: [
        "No garantizamos que los resultados generados por la IA sean originales, no infractores o estén libres de material de terceros; usted es responsable del uso que haga de ellos. No presente los resultados generados por la IA como redactados por un ser humano cuando ello pueda inducir a error a terceros o infringir la ley." ] },
    ],
    zh: [
      { t: "C1. AI 透明度与合成内容标识", b: [
        "在神经访问界面中进行的交互，是与一套生成合成的、由机器生成内容的 AI 系统之间的交互。根据透明度义务（包括 EU AI Act《欧盟人工智能法案》），此类内容可能被标识为由 AI 生成。它并非任何真实人员的陈述，未经独立核实不应被视为事实。" ] },
      { t: "C2. 禁止训练／文本与数据挖掘保留声明", b: [
        "本生态系统的所有内容与代码均受保护。未经事先书面许可，我们明确排除、退出并禁止任何针对本网站或用户内容的文本与数据挖掘，或将本网站或用户内容用于开发、训练、微调、基准测试或评估 AI/ML 模型——此为 Directive (EU) 2019/790《（欧盟）2019/790 号指令》第 Article 4(3)（第 4 条第 3 款）项下的明确保留声明。无论是否已就搜索索引授予任何许可，本保留声明均适用，并旨在可供机器读取。" ] },
      { t: "C3. 来源与负责任使用", b: [
        "我们不保证 AI 输出为原创、不构成侵权或不含第三方材料；您应对其使用方式负责。在会误导他人或违反法律的情形下，不得将 AI 输出呈现为由人类创作。" ] },
    ],
  },
};

export function LegalAddendum({ doc }: { doc: Doc }) {
  const { locale: lang } = useLanguage();
  const d = A[doc][lang] || A[doc].en;
  const protect = PROTECT[doc][lang] || PROTECT[doc].en;
  const extra = EXTRA[doc][lang] || EXTRA[doc].en;
  const dtier = DTIER[doc]?.[lang] || DTIER[doc]?.en || [];
  const secs = [...d.secs, ...protect, ...extra, ...dtier];
  return (
    <div className="mt-14 pt-10 border-t border-border">
      <h2 className="text-xl font-bold text-[#00FF88] mb-3" style={{ fontFamily: "var(--font-syne)" }}>{d.title}</h2>
      <p className="text-muted-foreground text-sm mb-8 italic">{d.note}</p>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        {secs.map((s) => (
          <section key={s.t}>
            <h3 className="text-foreground font-bold mb-2">{s.t}</h3>
            {/* Цены подставляются из lib/pricing.ts на языке читателя.
                Раньше они были вписаны в текст по-разному на четырёх языках:
                английский говорил «$1,000 разово за устройство, далее $200/мес»,
                а русский, испанский и китайский — «$1000 (+$200/мес, где
                указано)», не поясняя, где именно указано. */}
            {s.b.map((p, i) => (
              <p key={i} className="mb-2">{p.split("{{ЦЕНЫ}}").join(всеЦеныСтрокой(lang))}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
