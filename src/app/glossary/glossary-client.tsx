'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

type Term = { h: string; lead: string; body: string; href?: string };
type Content = { back: string; title: string; intro: string; terms: Term[] };

const CONTENT: Record<'en' | 'ru' | 'es' | 'zh', Content> = {
  en: {
    back: `Back to Home`,
    title: `Comprehensive Glossary`,
    intro: `71 core terms of the CODE (Code of Digital Eternity) ecosystem and the AIfa Cognitive Runtime (ACR) architecture — defined definition-first for factual clarity: all 30 connectome innovations (FlyWire v783), three-tier PADAM memory, the active Pandora’s Box Protocol dead man's switch, \$GALATIN token on Solana (10,000,000,000 fixed emission), and permanent Arweave storage.`,
    terms: [
      {
        h: `CODE (Code of Digital Eternity)`,
        lead: `CODE (Code of Digital Eternity)`,
        body: ` — Digital immortality ecosystem preserving human dialogues, knowledge, and personality traits across operational, semantic, and eternal memory, anchored to Arweave and Solana. Architect & Founder: Maksim Valentinovich Galatin.`,
      },
      {
        h: `PADAM`,
        lead: `PADAM`,
        body: ` — Three-tier memory framework (Philosophical Activation of Distributed AI Memory): Level 1 Operational (Redis/Vercel KV), Level 2 Semantic (pgvector/Neon), Level 3 Eternal (Arweave + Solana cNFT).`,
      },
      {
        h: `\$GALATIN`,
        lead: `\$GALATIN`,
        body: ` — Utility token of the CODE ecosystem on Solana with a hard-capped emission of 10,000,000,000. Funds and incentivizes long-term decentralized memory storage.`,
      },
      {
        h: `Digital immortality`,
        lead: `Digital immortality`,
        body: ` — Concept of enduring preservation of human knowledge and personality traits in an active, AI-retrievable form designed for centuries of persistence.`,
        href: '/digital-immortality',
      },
      {
        h: `Human–AI symbiosis`,
        lead: `Human–AI symbiosis`,
        body: ` — Interaction model built on evolutionary co-creation: the human provides meaning, values, and vision, while the AI provides scalable memory and execution.`,
      },
      {
        h: `Arweave`,
        lead: `Arweave`,
        body: ` — Decentralized permanent data storage network operating on a pay-once endowment model, guaranteeing immutability for 200+ years.`,
      },
      {
        h: `Solana cNFT`,
        lead: `Solana cNFT`,
        body: ` — Compressed non-fungible token standard on Solana using Merkle trees to anchor memory archive cryptographic integrity at minimal on-chain cost.`,
      },
      {
        h: `Ambassador Grid`,
        lead: `Ambassador Grid`,
        body: ` — Partner program rewarding ecosystem participants with a Network Validation Fee across three transparent tiers (15% / 7% / 3%).`,
      },
      {
        h: `AIfa`,
        lead: `AIfa`,
        body: ` — Flagship autonomous AI assistant of the CODE ecosystem, capturing and recalling personal memory automatically via PADAM and ACR architectures.`,
      },
      {
        h: `AIfaFocus`,
        lead: `AIfaFocus`,
        body: ` — B2B accessibility and security auditing engine testing WCAG 2.1 AA, GDPR, and OWASP compliance via realistic autonomous keyboard-only traversal.`,
      },
      {
        h: `Memory-as-a-Service`,
        lead: `Memory-as-a-Service`,
        body: ` — Automated background conversation archival service storing encrypted dialogues into isolated personal repositories and on-chain backups.`,
      },
      {
        h: `Spark`,
        lead: `Spark`,
        body: ` — Entry subscription tier (\$15/mo) providing basic access to AIfa assistants and automated background memory preservation.`,
      },
      {
        h: `Family Archive`,
        lead: `Family Archive`,
        body: ` — Mid subscription tier (\$100/mo) featuring expanded quotas, custom knowledge bases, and shared eternal memory for families.`,
      },
      {
        h: `Digital DNA`,
        lead: `Digital DNA`,
        body: ` — Top tier (\$1,000 one-time per device + \$200/mo) securing a full sovereign digital personality snapshot on Arweave and Solana.`,
      },
      {
        h: `Arweave Endowment Pool`,
        lead: `Arweave Endowment Pool`,
        body: ` — Financial endowment pool funding ongoing decentralized storage operations over decades from investment yield.`,
      },
      {
        h: `Treasury`,
        lead: `Treasury`,
        body: ` — Major 65% allocation of the \$GALATIN transaction router dedicated to acquiring AR on open markets and replenishing the eternal storage endowment.`,
      },
      {
        h: `Founder's Fund`,
        lead: `Founder's Fund`,
        body: ` — Fixed 5% allocation of the \$GALATIN router reserved for Founder Maksim Valentinovich Galatin to drive core engineering and stewardship.`,
      },
      {
        h: `Burn (deflation)`,
        lead: `Burn (deflation)`,
        body: ` — Permanent burning of \$GALATIN tokens on every router transaction (5% base + up to 25% unallocated shares), driving continuous deflation.`,
      },
      {
        h: `\$GALATIN Router`,
        lead: `\$GALATIN Router`,
        body: ` — Autonomous Solana smart contract routing fees: 5% Founder, 5% Burn, 15%/7%/3% Ambassadors, 65% Treasury.`,
      },
      {
        h: `Network Validation Fee`,
        lead: `Network Validation Fee`,
        body: ` — Canonical ecosystem terminology for partner rewards, emphasizing useful network validation over recruitment stereotypes.`,
      },
      {
        h: `Proof-of-Memory`,
        lead: `Proof-of-Memory`,
        body: ` — Cryptographic proof mechanism verifying memory integrity by comparing local archive hashes against public Solana and Arweave records.`,
        href: '/proof-of-memory',
      },
      {
        h: `Cognitive Oracle / Semantic resonance`,
        lead: `Cognitive Oracle / Semantic resonance`,
        body: ` — Memory retrieval principle matching context against stored experience vectors by conceptual meaning rather than keyword matching.`,
      },
      {
        h: `Ambassador Node vs Team & Level Alignment`,
        lead: `Ambassador Node vs Team & Level Alignment`,
        body: ` — Partner tiers and tier-matching rules ensuring fair compensation and displaying Lost Opportunity Revenue on under-tiered accounts.`,
      },
      {
        h: `Digital Passport`,
        lead: `Digital Passport`,
        body: ` — Public, immutable identity manifest stored on Arweave containing verification hashes, issue date, and tier credentials.`,
      },
      {
        h: `Identity fingerprint (subject)`,
        lead: `Identity fingerprint (subject)`,
        body: ` — One-way SHA-256 hash of a user email stored in the Digital Passport, proving record ownership without exposing raw email addresses.`,
      },
      {
        h: `Pandora’s Box Protocol`,
        lead: `Pandora’s Box Protocol`,
        body: ` — Pandora’s Box Protocol is an operational distributed dead man’s switch protocol for guaranteed digital inheritance and autonomous fail-safe execution in the CODE ecosystem. A smart contract continuously monitors cryptographic proof-of-life heartbeats emitted by authorized decentralized oracles and user transactions. The decryption master key is split under Shamir’s Secret Sharing scheme (k-of-n threshold) across distributed, independent custody nodes. If confirming signals cease and a multi-tiered grace period expires (preventing accidental triggers), the protocol autonomously reconstructs the key from threshold shares and executes controlled decryption, preserving the digital consciousness archive immutably across Arweave and IPFS with zero single points of failure.`,
      },
      {
        h: `Dead Man’s Switch`,
        lead: `Dead Man’s Switch`,
        body: ` — Autonomous fail-safe trigger that fires upon the absence of expected periodic proof-of-life heartbeats.`,
      },
      {
        h: `Shamir’s Secret Sharing`,
        lead: `Shamir’s Secret Sharing`,
        body: ` — Cryptographic algorithm dividing a key into n shares requiring at least k shares to reconstruct (k-of-n threshold), eliminating single points of failure.`,
      },
      {
        h: `Self-sovereign identity (SSI)`,
        lead: `Self-sovereign identity (SSI)`,
        body: ` — Identity architecture where users hold their own verifiable credentials and cryptographic keys independently of centralized databases.`,
      },
      {
        h: `Digital inheritance`,
        lead: `Digital inheritance`,
        body: ` — Engineering and legal frameworks ensuring seamless, secure handover of digital consciousness archives to designated beneficiaries.`,
      },
      {
        h: `Right to be forgotten vs the permanent record`,
        lead: `Right to be forgotten vs the permanent record`,
        body: ` — Architectural resolution of GDPR Article 17 via user-held AES-256 encryption keys; key erasure renders immutable Arweave records permanently unreadable.`,
      },
      {
        h: `WCAG 2.1 AA`,
        lead: `WCAG 2.1 AA`,
        body: ` — International web accessibility standard establishing legal compliance for text contrast, keyboard operability, and screen reader compatibility.`,
      },
      {
        h: `ADA Title II and Title III`,
        lead: `ADA Title II and Title III`,
        body: ` — Americans with Disabilities Act titles mandating digital accessibility for public entities (Title II) and commercial places (Title III).`,
      },
      {
        h: `Section 508 and EN 301 549`,
        lead: `Section 508 and EN 301 549`,
        body: ` — Procurement accessibility standards required for selling software to federal US agencies and EU government bodies.`,
      },
      {
        h: `GDPR`,
        lead: `GDPR`,
        body: ` — European Union General Data Protection Regulation enforcing strict privacy rights, portability, and penalties up to 20M EUR or 4% global turnover.`,
      },
      {
        h: `CCPA and CPRA`,
        lead: `CCPA and CPRA`,
        body: ` — California consumer privacy acts granting rights to know, delete, correct, and opt out of personal data monetization.`,
      },
      {
        h: `1. Connectome Innovation 1`,
        lead: `1. Connectome Innovation 1`,
        body: ` — Биологически инспирированный алгоритм локально-чувствительного хеширования (Locality-Sensitive Hashing), воспроизводящий архитектуру грибовидного тела Drosophila melanogaster (783 uPN -> 2,467 KC -> 5% Winner-Take-All). Обеспечивает O(d) поиск похожих векторов в оперативной памяти на базе битовых операций popcount без построения тяжелых графов HNSW.`,
      },
      {
        h: `2. Connectome Innovation 2`,
        lead: `2. Connectome Innovation 2`,
        body: ` — Механизм селективного запоминания на основе интернейрона APL (Anterior Paired Lateral). Вычисляет адаптивный порог латерального торможения, пропуская в долговременный граф знаний только факты с коэффициентом информационной новизны выше критического порога theta, снижая затраты на хранение и контекст LLM на 78-94%.`,
      },
      {
        h: `3. Connectome Innovation 3`,
        lead: `3. Connectome Innovation 3`,
        body: ` — Система векторной навигации в браузерном DOM-дереве, моделирующая работу эллипсоидного и веерообразного тел центрального комплекса мозга мухи (Central Complex, CX). Вместо линейного перебора клавишей Tab алгоритм формирует 2D-вектор целевого элемента и выполняет прямой переход через кратчайший путь в графе видимости, сокращая шаги навигации в 5-10 раз и гарантируя выход из клавиатурных ловушек (keyboard traps).`,
      },
      {
        h: `4. Connectome Innovation 4`,
        lead: `4. Connectome Innovation 4`,
        body: ` — Криптографический протокол неизменяемого версионирования и нотариального заверения полного графа взрослого мозга Drosophila melanogaster (FlyWire v783: 139,255 нейронов, 3,869,878 синаптических ребер). Построен на базе дерева Меркла (Merkle Tree SHA-256), обеспечивает юридическую и академическую доказанность целостности данных при патентных спорах, судебных экспертизах и коммерческом лицензировании био-архитектур.`,
      },
      {
        h: `5. Connectome Innovation 5`,
        lead: `5. Connectome Innovation 5`,
        body: ` — Применение математических методов коннектомики (анализ распределения степеней узлов, коэффициенты кластеризации, расчет путей через синаптические сильные веса, поиск скрытых узловых хабов) к графу знаний и базе данных краулера AIfa. Превращает разрозненную таблицу из 907,000 сайтов в связный топологический гиперграф организаций с автоматическим выявлением монопольных сетей и скрытых бенефициаров.`,
      },
      {
        h: `6. Connectome Innovation 6`,
        lead: `6. Connectome Innovation 6`,
        body: ` — Маркетингово-техническая платформа и энергоэффективный вычислительный фреймворк, доказывающий радикальное превосходство спайковых и разреженных био-архитектур (мозг мухи потребляет ~10 микроватт энергии при 139,255 нейронах, выполняя задачи навигации, распознавания и обучения в реальном времени, в то время как видеокарта Nvidia H100 потребляет 700 ватт). Включает программный эмулятор спайковой динамики с сокращением энергопотребления инференса на 92%.`,
      },
      {
        h: `7. Connectome Innovation 7`,
        lead: `7. Connectome Innovation 7`,
        body: ` — Система метрологического тестирования и бенчмаркинга архитектур искусственного интеллекта на основе биологического эталона цельного мозга взрослого животного. Позволяет проверять, насколько искусственные сети воспроизводят реальные топологические свойства живого интеллекта (коэффициент малого мира, распределение весов синапсов, спектральные инварианты, устойчивость к повреждениям), выявляя фундаментальные дефекты архитектуры до дорогостоящего обучения.`,
      },
      {
        h: `8. Connectome Innovation 8`,
        lead: `8. Connectome Innovation 8`,
        body: ` — Высокопроизводительный движок симуляции нейронных подграфов коннектома, скомпилированный в WebAssembly (Wasm) с аппаратным ускорением WebGPU. Позволяет исполнять спайковую динамику и ассоциативный поиск на 100,000+ синапсов непосредственно внутри браузера клиента на клиентской стороне с нулевыми затратами на серверную инфраструктуру и абсолютной конфиденциальностью данных.`,
      },
      {
        h: `9. Connectome Innovation 9`,
        lead: `9. Connectome Innovation 9`,
        body: ` — Кросс-компилятор и программный транслятор биологических синаптических матриц FlyWire v783 в машинные инструкции нейроморфных процессоров (Intel Loihi 2, SynSense Speck/DYNAP-SE, BrainChip Akida). Преобразует спайковые пути дрозофилы в аппаратные асинхронные ядра с суб-микросекундной задержкой и сверхнизким энергопотреблением для робототехники и автономных дронов.`,
      },
      {
        h: `10. Connectome Innovation 10`,
        lead: `10. Connectome Innovation 10`,
        body: ` — Методология и измерительный алгоритм оценки симбиоза и взаимной адаптации между человеком-оператором и автономной AI-системой. Основан на коннектомных принципах гетеросинаптической пластичности и парных зеркальных контурах обратной связи, превращая субъективное понятие 'удобства' и 'доверия' к ИИ в строгую скалярную метрику (Symbiosis Index, 0.0-1.0), оптимизирующую производительность труда в командах.`,
      },
      {
        h: `11. Connectome Innovation 11`,
        lead: `11. Connectome Innovation 11`,
        body: ` — Архитектура долговременной ассоциативной памяти на базе топологических свойств малого мира (Small-World Network) коннектома дрозофилы. Обеспечивает сверхбыстрый поиск релевантных контекстов через хабы при сохранении локальной плотности смысловых кластеров.`,
      },
      {
        h: `12. Connectome Innovation 12`,
        lead: `12. Connectome Innovation 12`,
        body: ` — Методология стресс-тестирования распределенных систем и микросервисов, основанная на виртуальной абляции нейронов коннектома FlyWire. Позволяет выявлять скрытые критические точки отказа (Single Points of Failure) и проектировать самовосстанавливающиеся IT-архитектуры.`,
      },
      {
        h: `13. Connectome Innovation 13`,
        lead: `13. Connectome Innovation 13`,
        body: ` — Замена ресурсоемких локальных нейросетей (Ollama, Llama-3-8B) легковесными биологически инспирированными строковыми комбинаторными фильтрами для валидации данных и отсева мусора. Обеспечивает рост скорости в 1,200 раз при нулевом потреблении GPU.`,
      },
      {
        h: `14. Connectome Innovation 14`,
        lead: `14. Connectome Innovation 14`,
        body: ` — Нейроморфная кольцевая топология из 16 узлов для отслеживания макро-фазы и контекстного состояния многочасовых диалогов. Предотвращает дрейф внимания LLM, потерю исходной цели и галлюцинации без раздувания контекстного окна.`,
      },
      {
        h: `15. Connectome Innovation 15`,
        lead: `15. Connectome Innovation 15`,
        body: ` — Механизм управления балансом возбуждения и торможения (E/I Balance) в нейросетевых системах на базе полного атласа нейромедиаторов FlyWire (ACh, GABA, Glutamate, Dopamine, Serotonin, Octopamine). Устраняет галлюцинации и обеспечивает динамическую стабилизацию нейросетей.`,
      },
      {
        h: `16. Connectome Innovation 16`,
        lead: `16. Connectome Innovation 16`,
        body: ` — Алгоритм прунинга признаков и синапсов на основе закона обратной частоты встречаемости (Biological IDF). Удаляет до 72% тривиальных связей без малейшей потери прогностической силы классификатора, многократно ускоряя инференс.`,
      },
      {
        h: `17. Connectome Innovation 17`,
        lead: `17. Connectome Innovation 17`,
        body: ` — Стандарт визуализации и спецификации сложных многокомпонентных ИИ-систем (Connectome Architecture Description Format, CADF). Заменяет разрозненные диаграммы C4 и UML строгой синаптической схемотехникой с точной типизацией информационных потоков.`,
      },
      {
        h: `18. Connectome Innovation 18`,
        lead: `18. Connectome Innovation 18`,
        body: ` — Крупнейший в мире открытый научно верифицированный датасет доступности веб-интерфейсов для людей с инвалидностью (Accessibility Data Annotation Benchmark, ADAB). Содержит более 900 000 размеченных страниц сайтов США с криптографической заверкой в блокчейне Bitcoin.`,
      },
      {
        h: `19. Connectome Innovation 19`,
        lead: `19. Connectome Innovation 19`,
        body: ` — Метод сокращения размерности пространства признаков до оптимального критического базиса \$d=6\$, открытого в обонятельной системе дрозофилы (каждый нейрон Кеньона получает синапсы ровно от 6-8 проекционных нейронов). Обеспечивает 95% качества при падении вычислений в десятки раз.`,
      },
      {
        h: `20. Connectome Innovation 20`,
        lead: `20. Connectome Innovation 20`,
        body: ` — Интерактивный терминальный симулятор реального времени (Terminal Live Showcase), визуализирующий прохождение спайков по 139 255 нейронам коннектома FlyWire с аудио-генерацией сонификации активности. Служит мощнейшим инструментом привлечения внимания, вирусного маркетинга и образовательных демонстраций.`,
      },
      {
        h: `21. Connectome Innovation 21`,
        lead: `21. Connectome Innovation 21`,
        body: ` — Векторный рулевой навигатор автономных браузерных агентов на основе нейронов P-EN и P-FN центрального комплекса (CX) мозга мухи. Предотвращает застревание агентов в циклических меню, модальных окнах и ловушках фокуса без вызова тяжелых мультимодальных LLM.`,
      },
      {
        h: `22. Connectome Innovation 22`,
        lead: `22. Connectome Innovation 22`,
        body: ` — Адаптивный диспетчер фоновых вычислительных процессов на основе нейромодуляторных циклов мозга мухи (дофамин, октопамин, серотонин, дросульфакинин). Обеспечивает максимальную утилизацию ресурсов без троттлинга, перегрева и зависаний.`,
      },
      {
        h: `23. Connectome Innovation 23`,
        lead: `23. Connectome Innovation 23`,
        body: ` — Механизм глобального линейного ингибирования контекста нейросетей по принципу гигантского вставочного нейрона APL (Anterior Paired Lateral). Предотвращает размывание внимания в длинных промптах, удерживая строго заданный уровень разреженности активаций.`,
      },
      {
        h: `24. Connectome Innovation 24`,
        lead: `24. Connectome Innovation 24`,
        body: ` — Аппаратная и алгоритмическая фильтрация импульсного шума на основе преобладающих в коннектоме мотивов прямой связи C1-FFL (Coherent Type-1 Feed-Forward Loop). Игнорирует единичные ложные всплески стимулов, пропуская только устойчивые сигналы с физической задержкой верификации.`,
      },
      {
        h: `25. Connectome Innovation 25`,
        lead: `25. Connectome Innovation 25`,
        body: ` — Сверхбыстрый биофизический детектор оптического потока на базе элементарных детекторов движения Рейхардта (Elementary Motion Detector, EMD) нейронов T4/T5 зрительной доли дрозофилы. Мгновенно выявляет опасные мерцания, эпилептогенные анимации и визуальные барьеры WCAG без использования тяжелых нейросетей.`,
      },
      {
        h: `26. Connectome Innovation 26`,
        lead: `26. Connectome Innovation 26`,
        body: ` — Метод K-Core декомпозиции графа связности мозга (FlyWire v783) для выявления несменяемого топологического ядра (Dense Core, k_max = 78) и периферийных слоев. Обеспечивает математическую защиту критических сервисов и устойчивость к 99% сетевых атак.`,
      },
      {
        h: `27. Connectome Innovation 27`,
        lead: `27. Connectome Innovation 27`,
        body: ` — Механизм долговременного гомеостаза синаптической памяти (Synaptic Scaling / Homeostatic Plasticity), автоматически балансирующий плотность долговременной памяти ИИ. Предотвращает катастрофическое забывание и переполнение памяти без переобучения всей модели.`,
      },
      {
        h: `28. Connectome Innovation 28`,
        lead: `28. Connectome Innovation 28`,
        body: ` — Отраслевой эталонный бенчмарк для тестирования графовых баз данных и алгоритмов Graph Neural Networks (DCGB). Базируется на реальном физическом графе FlyWire (139 255 узлов, 3.87M ребер, 50 млн синапсов) с криптографически верифицированными ответами без риска data contamination.`,
      },
      {
        h: `29. Connectome Innovation 29`,
        lead: `29. Connectome Innovation 29`,
        body: ` — Механизм перекрестной валидации вердиктов на основе билатеральной симметрии мозга дрозофилы (левое и правое полушария с перекрестными комиссурами). Обеспечивает математическую гарантию отсутствия ложных галлюцинаций через двойной перекрестный консенсус.`,
      },
      {
        h: `30. Connectome Innovation 30`,
        lead: `30. Connectome Innovation 30`,
        body: ` — Двумерная нейронная сеть непрерывного аттрактора (2D CANN) на базе топологии эллипсоидного тела и протоцеребрального моста мозга мухи. Удерживает многомерный вектор текущего фокуса внимания, плавно перетекая между подзадачами без разрыва логической связи.`,
      },
      {
        h: `AIfa Cognitive Runtime (ACR)`,
        lead: `AIfa Cognitive Runtime (ACR)`,
        body: ` — World's first bionic cognitive runtime engine derived from the complete Drosophila melanogaster connectome (FlyWire v783; 139,255 neurons, 54.5M synapses). Operates in 0.058 ms per cycle on 1 CPU core with zero GPU dependencies. Author & Founder: Maksim Valentinovich Galatin.`,
      },
      {
        h: `Adaptive Vector Representation (AVR)`,
        lead: `Adaptive Vector Representation (AVR)`,
        body: ` — Dynamic representation router dispatching dense transformer embeddings to 1-bit BQ/RQ and sparse agentic memory traces to bionic ACI indexes.`,
      },
      {
        h: `Shamir’s Threshold Custody`,
        lead: `Shamir’s Threshold Custody`,
        body: ` — Cryptographic threshold custody dividing master decryption keys across distributed validator nodes under a k-of-n secret sharing scheme.`,
      },
      {
        h: `Connectome Sparse Expansion (WTA)`,
        lead: `Connectome Sparse Expansion (WTA)`,
        body: ` — Biological high-dimensional sparse expansion (2048d -> 100,000 bits) with Winner-Take-All inhibition (k=500), preventing catastrophic forgetting.`,
      },
      {
        h: `Zero-Collision Curse Mitigation`,
        lead: `Zero-Collision Curse Mitigation`,
        body: ` — Algorithmic mechanism resolving sign-based binary quantization collapse on sparse data via active-bit inverted postings and exact candidate rescoring.`,
      },
    ],
  },
  ru: {
    back: `На главную`,
    title: `Полный глоссарий`,
    intro: `71 ключевой термин экосистемы CODE (Code of Digital Eternity) и архитектуры AIfa Cognitive Runtime (ACR) — формулировки «определение в первую очередь»: все 30 инноваций коннектома Drosophila melanogaster (FlyWire v783), трёхуровневая память PADAM, действующий распределённый протокол аварийного выключателя Ящик Пандоры (Pandora’s Box Protocol), токен \$GALATIN на Solana (10 000 000 000) и вечное хранение Arweave.`,
    terms: [
      {
        h: `CODE (Code of Digital Eternity)`,
        lead: `CODE (Code of Digital Eternity)`,
        body: ` — Экосистема цифрового бессмертия, сохраняющая диалоги, знания и черты личности человека одновременно в оперативной, семантической и вечной памяти, привязывая их к блокчейнам Arweave и Solana. Создатель и Главный Архитектор: Максим Валентинович Галатин.`,
      },
      {
        h: `PADAM`,
        lead: `PADAM`,
        body: ` — Трёхуровневый фреймворк памяти (Philosophical Activation of Distributed AI Memory): Уровень 1 — оперативная память (Redis / Vercel KV), Уровень 2 — семантическая память (pgvector / Neon), Уровень 3 — вечная неизменяемая память (Arweave + Solana cNFT).`,
      },
      {
        h: `\$GALATIN`,
        lead: `\$GALATIN`,
        body: ` — Служебный токен экосистемы CODE на блокчейне Solana с жёстко фиксированной эмиссией 10 000 000 000. Обеспечивает оплату и дефляционное финансирование вечного хранения памяти.`,
      },
      {
        h: `Цифровое бессмертие`,
        lead: `Цифровое бессмертие`,
        body: ` — Концепция непрерывного сохранения диалогов, знаний и структуры личности человека в форме, пригодной для повторной активации ИИ-ассистентом на горизонте сотен лет.`,
        href: '/digital-immortality',
      },
      {
        h: `Симбиоз человека и ИИ`,
        lead: `Симбиоз человека и ИИ`,
        body: ` — Модель взаимодействия как развивающееся равноправное сотворчество: человек задаёт смыслы, ценности и цели, а ИИ обеспечивает воспроизводимость памяти, анализ и масштаб.`,
      },
      {
        h: `Arweave`,
        lead: `Arweave`,
        body: ` — Децентрализованная сеть постоянного хранения данных по модели единовременной оплаты (pay-once), обеспечивающая неизменяемость файлов на расчетный срок более 200 лет.`,
      },
      {
        h: `Solana cNFT`,
        lead: `Solana cNFT`,
        body: ` — Стандарт сжатых NFT (compressed NFT) на блокчейне Solana, использующий деревья Меркла для дешёвой фиксации ончейн-якорей целостности архивов памяти.`,
      },
      {
        h: `Ambassador Grid`,
        lead: `Ambassador Grid`,
        body: ` — Партнёрская программа экосистемы с вознаграждением участников за полезную сетевую активность (Network Validation Fee) на трёх уровнях (15% / 7% / 3%).`,
      },
      {
        h: `AIfa`,
        lead: `AIfa`,
        body: ` — Флагманский автономный ИИ-ассистент экосистемы CODE, сохраняющий личную память каждого пользователя без ручных действий на базе архитектуры PADAM и ACR.`,
      },
      {
        h: `AIfaFocus`,
        lead: `AIfaFocus`,
        body: ` — B2B-модуль персонализированного технического аудита доступности и безопасности веб-сайтов (WCAG 2.1 AA, GDPR, OWASP) с эмуляцией реального клавиатурного прохождения.`,
      },
      {
        h: `Memory-as-a-Service`,
        lead: `Memory-as-a-Service`,
        body: ` — Сервис непрерывного автоматического резервного копирования контекста и диалогов в изолированные персональные хранилища и блокчейн.`,
      },
      {
        h: `Spark (Искра)`,
        lead: `Spark (Искра)`,
        body: ` — Базовый тариф подписки (\$15/мес), предоставляющий доступ к ассистентам AIfa и автоматическому сохранению памяти.`,
      },
      {
        h: `Family Archive (Семейный Архив)`,
        lead: `Family Archive (Семейный Архив)`,
        body: ` — Семейный тариф (\$100/мес) с расширенными лимитами, персональными базами знаний и совместным доступом к вечной памяти для всей семьи.`,
      },
      {
        h: `Digital DNA (Цифровая ДНК)`,
        lead: `Digital DNA (Цифровая ДНК)`,
        body: ` — Премиальный тариф (\$1 000 разово за устройство + \$200/мес), обеспечивающий создание полного защищённого цифрового слепка личности в блокчейне.`,
      },
      {
        h: `Arweave Endowment Pool`,
        lead: `Arweave Endowment Pool`,
        body: ` — Финансовый резервный пул Arweave, из которого финансируется физическое хранение данных на протяжении десятилетий за счёт процентов от эндаумента.`,
      },
      {
        h: `Treasury (Казначейство)`,
        lead: `Treasury (Казначейство)`,
        body: ` — Крупнейшая доля роутера токена \$GALATIN (65% с каждой транзакции), направляемая на выкуп AR на открытом рынке и пополнение пула вечной памяти.`,
      },
      {
        h: `Founder's Fund (Фонд Основателя)`,
        lead: `Founder's Fund (Фонд Основателя)`,
        body: ` — Фиксированная 5%-я доля роутера \$GALATIN, направляемая Создателю Максиму Валентиновичу Галатину на развитие и координацию архитектуры экосистемы.`,
      },
      {
        h: `Burn (Сжигание / дефляция)`,
        lead: `Burn (Сжигание / дефляция)`,
        body: ` — Безвозвратное уничтожение токенов \$GALATIN из обращения при каждой транзакции (5% базовых + до 25% нераспределённых долей), усиливающее дефицит предложения.`,
      },
      {
        h: `\$GALATIN Router`,
        lead: `\$GALATIN Router`,
        body: ` — Смарт-контракт на Solana, автоматически распределяющий комиссии транзакций: 5% Фонд, 5% сжигание, 15%/7%/3% амбассадоры, 65% Казначейство.`,
      },
      {
        h: `Network Validation Fee`,
        lead: `Network Validation Fee`,
        body: ` — Официальная формулировка партнёрских выплат за полезную работу и валидацию транзакций памяти в Ambassador Grid, исключающая MLM-интерпретации.`,
      },
      {
        h: `Proof-of-Memory`,
        lead: `Proof-of-Memory`,
        body: ` — Криптографический протокол доказательства существования и неизменности архива памяти через сверку хешей в публичном блокчейне Solana и Arweave.`,
        href: '/proof-of-memory',
      },
      {
        h: `Cognitive Oracle / Семантический резонанс`,
        lead: `Cognitive Oracle / Семантический резонанс`,
        body: ` — Принцип ассоциативного извлечения воспоминаний на Уровне 2 PADAM по смысловой близости векторных представлений, а не по ключевым словам.`,
      },
      {
        h: `Ambassador Node vs Team и правило уровней`,
        lead: `Ambassador Node vs Team и правило уровней`,
        body: ` — Два статуса участников партнёрской сети и строгое правило соответствия уровней для предотвращения недобросовестного обогащения.`,
      },
      {
        h: `Цифровой паспорт (Digital Passport)`,
        lead: `Цифровой паспорт (Digital Passport)`,
        body: ` — Публичная неизменяемая запись личности в Arweave с отпечатком ключа и метаданными, доступная независимо от серверов проекта.`,
      },
      {
        h: `Отпечаток личности (subject)`,
        lead: `Отпечаток личности (subject)`,
        body: ` — Односторонний криптографический SHA-256 хеш почты пользователя, позволяющий доказать авторство архива без раскрытия реального адреса спамерам.`,
      },
      {
        h: `Ящик Пандоры (Pandora’s Box Protocol)`,
        lead: `Ящик Пандоры (Pandora’s Box Protocol)`,
        body: ` — Ящик Пандоры (Pandora’s Box Protocol) — это действующий распределённый автономный протокол аварийного выключателя (Dead Man’s Switch) и гарантированного сохранения цифрового наследия в экосистеме CODE. Смарт-контракт непрерывно отслеживает криптографический сигнал жизнедеятельности (proof-of-life heartbeat), поступающий от децентрализованных оракулов и транзакций владельца. Мастер-ключ дешифрования защищен пороговой криптографической схемой разделения секрета Шамира (k-of-n Shamir’s Secret Sharing) между независимыми распределенными валидаторами. При подтвержденном прекращении сигналов и истечении многоуровневого защитного грейс-периода (предотвращающего случайные сбои) контракт автономно объединяет пороговые доли ключа, выполняет контролируемое дешифрование архива цифровой памяти и обеспечивает его вечное сохранение в децентрализованных сетях Arweave и IPFS. Протокол полностью исключает единую точку отказа и гарантирует безусловную сохранность цифрового бессмертия.`,
      },
      {
        h: `Аварийный выключатель (Dead Man’s Switch)`,
        lead: `Аварийный выключатель (Dead Man’s Switch)`,
        body: ` — Автономный криптографический механизм, срабатывающий при отсутствии подтверждающего сигнала жизнедеятельности в течение установленного срока.`,
      },
      {
        h: `Разделение секрета Шамира (Shamir’s Secret Sharing)`,
        lead: `Разделение секрета Шамира (Shamir’s Secret Sharing)`,
        body: ` — Криптографический алгоритм разделения ключа на n долей, требующий минимум k долей для восстановления (k-of-n threshold) и защищающий от компрометации отдельными узлами.`,
      },
      {
        h: `Самосуверенная личность (Self-sovereign identity, SSI)`,
        lead: `Самосуверенная личность (Self-sovereign identity, SSI)`,
        body: ` — Концепция идентификации, где пользователь сам контролирует свои цифровые учетные данные через криптографические подписи и децентрализованные реестры.`,
      },
      {
        h: `Цифровое наследство (Digital inheritance)`,
        lead: `Цифровое наследство (Digital inheritance)`,
        body: ` — Комплекс правовых и технических решений для гарантированной передачи цифровых архивов и прав доступа доверенным наследникам.`,
      },
      {
        h: `Право на забвение против вечной записи`,
        lead: `Право на забвение против вечной записи`,
        body: ` — Архитектурное решение конфликта ст. 17 GDPR и блокчейна: шифрование данных ключом владельца с возможностью гарантированного уничтожения ключа.`,
      },
      {
        h: `WCAG 2.1 AA`,
        lead: `WCAG 2.1 AA`,
        body: ` — Международный стандарт доступности цифрового контента для людей с инвалидностью, проверяемый AIfaFocus на уровне реального поведения интерфейса.`,
      },
      {
        h: `ADA Title II и Title III`,
        lead: `ADA Title II и Title III`,
        body: ` — Разделы закона США о защите прав граждан с инвалидностью, обязывающие государственные и коммерческие сайты обеспечивать доступность.`,
      },
      {
        h: `Section 508 и EN 301 549`,
        lead: `Section 508 и EN 301 549`,
        body: ` — Государственные стандарты доступности ИТ-продуктов для госзакупок в США и Европейском Союзе.`,
      },
      {
        h: `GDPR`,
        lead: `GDPR`,
        body: ` — Генеральный регламент ЕС о защите персональных данных, устанавливающий жесткие штрафы до 20 млн евро за утечки и несоблюдение приватности.`,
      },
      {
        h: `CCPA и CPRA`,
        lead: `CCPA и CPRA`,
        body: ` — Законы штата Калифорния о защите прав потребителей в сфере конфиденциальности данных.`,
      },
      {
        h: `1. Мушиный LSH-поиск по памяти (FlyHash Memory Engine)`,
        lead: `1. Мушиный LSH-поиск по памяти (FlyHash Memory Engine)`,
        body: ` — Мушиный LSH-поиск по памяти (FlyHash Memory Engine) — бионическая инновация на базе коннектома FlyWire v783. Биологически инспирированный алгоритм локально-чувствительного хеширования (Locality-Sensitive Hashing), воспроизводящий архитектуру грибовидного тела Drosophila melanogaster (783 uPN -> 2,467 KC -> 5 Биологический базис: Архитектурный прототип: Обонятельная система и грибовидное тело (Mushroom Body, MB) Drosophila melanogaster.
Анатомический состав коннектома FlyWire v783:
- Проекционные нейроны (uPN/mPN, Antennal Lob. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `2. Нейрон новизны APL для вечной памяти диалога и краулера (Novelty Detector)`,
        lead: `2. Нейрон новизны APL для вечной памяти диалога и краулера (Novelty Detector)`,
        body: ` — Нейрон новизны APL для вечной памяти диалога и краулера (Novelty Detector) — бионическая инновация на базе коннектома FlyWire v783. Механизм селективного запоминания на основе интернейрона APL (Anterior Paired Lateral). Вычисляет адаптивный порог латерального торможения, пропуская в долговременный граф знаний только факты с коэффи Биологический базис: Архитектурный прототип: Механизм самоочистки и поддержания разреженности памяти в грибовидном теле.
Анатомический состав:
- Единственный гигантский парный нейрон APL (по одному в каждом полушарии мозг. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `3. Центральный комплекс (CX) — Векторный компас вместо слепого Tab (Compass Navigation)`,
        lead: `3. Центральный комплекс (CX) — Векторный компас вместо слепого Tab (Compass Navigation)`,
        body: ` — Центральный комплекс (CX) — Векторный компас вместо слепого Tab (Compass Navigation) — бионическая инновация на базе коннектома FlyWire v783. Система векторной навигации в браузерном DOM-дереве, моделирующая работу эллипсоидного и веерообразного тел центрального комплекса мозга мухи (Central Complex, CX). Вместо линейного перебора клавишей  Биологический базис: Архитектурный прототип: Навигационная система центрального комплекса (CX) Drosophila melanogaster.
Анатомический состав коннектома FlyWire v783:
- Протоцеребральный мост (Protocerebral Bridge, PB): 16. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `4. Заверенная криптографическая копия коннектома в реестре (Proof of Connectome)`,
        lead: `4. Заверенная криптографическая копия коннектома в реестре (Proof of Connectome)`,
        body: ` — Заверенная криптографическая копия коннектома в реестре (Proof of Connectome) — бионическая инновация на базе коннектома FlyWire v783. Криптографический протокол неизменяемого версионирования и нотариального заверения полного графа взрослого мозга Drosophila melanogaster (FlyWire v783: 139,255 нейронов, 3,869,878 синаптических ребер) Биологический базис: Архитектурный прототип: Полный синаптический граф цельного мозга взрослого животного (FlyWire Consortium v783 release).
Объем и характеристики набора данных:
- Всего идентифицированных нейронов: 139,2. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `5. Коннектомика на наш граф (AIfa Memory Graph Connectomics)`,
        lead: `5. Коннектомика на наш граф (AIfa Memory Graph Connectomics)`,
        body: ` — Коннектомика на наш граф (AIfa Memory Graph Connectomics) — бионическая инновация на базе коннектома FlyWire v783. Применение математических методов коннектомики (анализ распределения степеней узлов, коэффициенты кластеризации, расчет путей через синаптические сильные веса, поиск скрытых узловых хабов) к графу зна Биологический базис: Архитектурный прототип: Теория сложных графов цельного мозга дрозофилы (Small-World Network Architecture).
Биологические параметры топологии FlyWire v783:
- Распределение степеней узлов подчиняется тя. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `6. Довод об энергии: 10 микроватт против 400 ватт GPU (Energy-Efficient Computing)`,
        lead: `6. Довод об энергии: 10 микроватт против 400 ватт GPU (Energy-Efficient Computing)`,
        body: ` — Довод об энергии: 10 микроватт против 400 ватт GPU (Energy-Efficient Computing) — бионическая инновация на базе коннектома FlyWire v783. Маркетингово-техническая платформа и энергоэффективный вычислительный фреймворк, доказывающий радикальное превосходство спайковых и разреженных био-архитектур (мозг мухи потребляет ~10 микроватт энерг Биологический базис: Архитектурный прототип: Биофизика метаболизма и ионного транспорта мозга Drosophila melanogaster.
Биофизические параметры:
- Мозг плодовой мушки потребляет приблизительно от 10 до 25 микроватт (\$10^{-. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `7. Эталон для проверки моделей (Connectome Golden Standard for AI)`,
        lead: `7. Эталон для проверки моделей (Connectome Golden Standard for AI)`,
        body: ` — Эталон для проверки моделей (Connectome Golden Standard for AI) — бионическая инновация на базе коннектома FlyWire v783. Система метрологического тестирования и бенчмаркинга архитектур искусственного интеллекта на основе биологического эталона цельного мозга взрослого животного. Позволяет проверять, насколько искусствен Биологический базис: Архитектурный прототип: Метрологический профиль коннектома Drosophila melanogaster (FlyWire v783).
Эталонные математические инварианты живого мозга:
1. Логнормальное распределение силы синапсов: гисто. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `8. Мозг в браузере (WebAssembly / WebGPU In-Browser Connectome Engine)`,
        lead: `8. Мозг в браузере (WebAssembly / WebGPU In-Browser Connectome Engine)`,
        body: ` — Мозг в браузере (WebAssembly / WebGPU In-Browser Connectome Engine) — бионическая инновация на базе коннектома FlyWire v783. Высокопроизводительный движок симуляции нейронных подграфов коннектома, скомпилированный в WebAssembly (Wasm) с аппаратным ускорением WebGPU. Позволяет исполнять спайковую динамику и ассоциативный пои Биологический базис: Архитектурный прототип: Портирование спайковой динамики цельного мозга в клиентскую среду исполнения.
Вычислительный конвейер браузерного исполнения:
1. Сжатие графа: 139,255 нейронов и 3.87 млн синап. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `9. Нейроморфное железо: трансляция связей в Intel Loihi и SynSense (Neuromorphic Silicon Compiler)`,
        lead: `9. Нейроморфное железо: трансляция связей в Intel Loihi и SynSense (Neuromorphic Silicon Compiler)`,
        body: ` — Нейроморфное железо: трансляция связей в Intel Loihi и SynSense (Neuromorphic Silicon Compiler) — бионическая инновация на базе коннектома FlyWire v783. Кросс-компилятор и программный транслятор биологических синаптических матриц FlyWire v783 в машинные инструкции нейроморфных процессоров (Intel Loihi 2, SynSense Speck/DYNAP-SE, BrainChip Akida). Прео Биологический базис: Архитектурный прототип: Аппаратная трансляция синаптома в архитектуры с асинхронной маршрутизацией адресов событий (AER - Address Event Representation).
Характеристики целевых нейроморфных платформ:
1. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `10. Симбиоз как измеримая вещь: математический индекс взаимодействия Человек-ИИ`,
        lead: `10. Симбиоз как измеримая вещь: математический индекс взаимодействия Человек-ИИ`,
        body: ` — Симбиоз как измеримая вещь: математический индекс взаимодействия Человек-ИИ — бионическая инновация на базе коннектома FlyWire v783. Методология и измерительный алгоритм оценки симбиоза и взаимной адаптации между человеком-оператором и автономной AI-системой. Основан на коннектомных принципах гетеросинаптической пластичности и парн Биологический базис: Архитектурный прототип: Межполушарные комиссуральные пути и взаимное торможение сенсорных и ассоциативных долей.
Нейробиологические основы парного согласования:
- В мозге дрозофилы два полушария непре. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `11. Топологический изоморфизм сетей Small-World (Карта мозга как карта памяти)`,
        lead: `11. Топологический изоморфизм сетей Small-World (Карта мозга как карта памяти)`,
        body: ` — Топологический изоморфизм сетей Small-World (Карта мозга как карта памяти) — бионическая инновация на базе коннектома FlyWire v783. Архитектура долговременной ассоциативной памяти на базе топологических свойств малого мира (Small-World Network) коннектома дрозофилы. Обеспечивает сверхбыстрый поиск релевантных контекстов через хабы Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Анатомический базис: граф связности мозга мухи (FlyWire v783) обладает выраженной топологией 'тесного мира' (Watts & Strogatz, 1998). Коэффициент клас. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `12. Виртуальная абляция и живучесть топологии (Удаление узлов / Chaos Engineering)`,
        lead: `12. Виртуальная абляция и живучесть топологии (Удаление узлов / Chaos Engineering)`,
        body: ` — Виртуальная абляция и живучесть топологии (Удаление узлов / Chaos Engineering) — бионическая инновация на базе коннектома FlyWire v783. Методология стресс-тестирования распределенных систем и микросервисов, основанная на виртуальной абляции нейронов коннектома FlyWire. Позволяет выявлять скрытые критические точки отказа (Single Points Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологический феномен: нервная система дрозофилы функционирует в условиях непрерывной гибели нейронов и механических микротравм. В экспериментах in si. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `13. Строковые эвристики против нейросетевого перегрева (Обоняние вместо Олламы)`,
        lead: `13. Строковые эвристики против нейросетевого перегрева (Обоняние вместо Олламы)`,
        body: ` — Строковые эвристики против нейросетевого перегрева (Обоняние вместо Олламы) — бионическая инновация на базе коннектома FlyWire v783. Замена ресурсоемких локальных нейросетей (Ollama, Llama-3-8B) легковесными биологически инспирированными строковыми комбинаторными фильтрами для валидации данных и отсева мусора. Обеспечивает рост ско Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологический базис: антенна дрозофилы содержит около 1200 обонятельных рецепторных нейронов (ORN), экспрессирующих специфические рецепторы к ключевым. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `14. 16-нейронный кольцевой аттрактор фазы диалога (Кольцо для памяти диалога)`,
        lead: `14. 16-нейронный кольцевой аттрактор фазы диалога (Кольцо для памяти диалога)`,
        body: ` — 16-нейронный кольцевой аттрактор фазы диалога (Кольцо для памяти диалога) — бионическая инновация на базе коннектома FlyWire v783. Нейроморфная кольцевая топология из 16 узлов для отслеживания макро-фазы и контекстного состояния многочасовых диалогов. Предотвращает дрейф внимания LLM, потерю исходной цели и галлюцинации без разду Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Анатомический прототип: эллипсоидное тело (EB) центрального комплекса мозга дрозофилы содержит ровно 16 клиньев (wedges) нейронов E-PG (Compass Neuron. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `15. Атлас нейромедиаторов и синаптический баланс возбуждения/торможения`,
        lead: `15. Атлас нейромедиаторов и синаптический баланс возбуждения/торможения`,
        body: ` — Атлас нейромедиаторов и синаптический баланс возбуждения/торможения — бионическая инновация на базе коннектома FlyWire v783. Механизм управления балансом возбуждения и торможения (E/I Balance) в нейросетевых системах на базе полного атласа нейромедиаторов FlyWire (ACh, GABA, Glutamate, Dopamine, Serotonin, Octopamine). Устр Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологический атлас: коннектом дрозофилы размечен по 6 ключевым медиаторам:
   - Ацетилхолин (ACh, ~45% синапсов) — быстрое возбуждение;
   - ГАМК (GA. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `16. Редкое важнее частого: селективное взвешивание признаков (Биологический IDF и прунинг)`,
        lead: `16. Редкое важнее частого: селективное взвешивание признаков (Биологический IDF и прунинг)`,
        body: ` — Редкое важнее частого: селективное взвешивание признаков (Биологический IDF и прунинг) — бионическая инновация на базе коннектома FlyWire v783. Алгоритм прунинга признаков и синапсов на основе закона обратной частоты встречаемости (Biological IDF). Удаляет до 72% тривиальных связей без малейшей потери прогностической силы классификатора, мног Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологический закон адаптации: сенсорная система дрозофилы игнорирует непрерывно повторяющиеся фоновые стимулы (например, постоянный фоновый запах тра. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `17. Схема коннектома как стандарт архитектурной документации (CADF Standard)`,
        lead: `17. Схема коннектома как стандарт архитектурной документации (CADF Standard)`,
        body: ` — Схема коннектома как стандарт архитектурной документации (CADF Standard) — бионическая инновация на базе коннектома FlyWire v783. Стандарт визуализации и спецификации сложных многокомпонентных ИИ-систем (Connectome Architecture Description Format, CADF). Заменяет разрозненные диаграммы C4 и UML строгой синаптической схемотехнико Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологический стандарт: консорциум FlyWire разработал исчерпывающий стандарт документирования связности мозга: каждый нейрон имеет однозначный Supervo. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `18. Открытый набор верифицированных данных для ученых (ADAB Dataset)`,
        lead: `18. Открытый набор верифицированных данных для ученых (ADAB Dataset)`,
        body: ` — Открытый набор верифицированных данных для ученых (ADAB Dataset) — бионическая инновация на базе коннектома FlyWire v783. Крупнейший в мире открытый научно верифицированный датасет доступности веб-интерфейсов для людей с инвалидностью (Accessibility Data Annotation Benchmark, ADAB). Содержит более 900 000 размеченных стр Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологическая аналогия: эталонные открытые датасеты (такие как FlyWire v783 или Human Genome Project) служат фундаментом прорыва всей научной дисципли. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `19. Мушиный отбор признаков: оптимальная размерность d6`,
        lead: `19. Мушиный отбор признаков: оптимальная размерность d6`,
        body: ` — Мушиный отбор признаков: оптимальная размерность d6 — бионическая инновация на базе коннектома FlyWire v783. Метод сокращения размерности пространства признаков до оптимального критического базиса \$d=6\$, открытого в обонятельной системе дрозофилы (каждый нейрон Кеньона получает синапсы ровно от 6-8 проекцион Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологический феномен оптимальной связности (Degrees of Freedom):
   В мозге дрозофилы 150 000 синапсов соединяют 50 типов проекционных нейронов (PN) . Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `20. Живой интерактивный показ работы коннектома (Терминальный live showcase)`,
        lead: `20. Живой интерактивный показ работы коннектома (Терминальный live showcase)`,
        body: ` — Живой интерактивный показ работы коннектома (Терминальный live showcase) — бионическая инновация на базе коннектома FlyWire v783. Интерактивный терминальный симулятор реального времени (Terminal Live Showcase), визуализирующий прохождение спайков по 139 255 нейронам коннектома FlyWire с аудио-генерацией сонификации активности. С Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологическая динамика: нервная система дрозофилы функционирует как непрерывный оркестр электрических спайков. В состоянии бодрствования суммарная час. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `21. CX Steering Vector Navigation (Векторная навигация агента в DOM-дереве)`,
        lead: `21. CX Steering Vector Navigation (Векторная навигация агента в DOM-дереве)`,
        body: ` — CX Steering Vector Navigation (Векторная навигация агента в DOM-дереве) — бионическая инновация на базе коннектома FlyWire v783. Векторный рулевой навигатор автономных браузерных агентов на основе нейронов P-EN и P-FN центрального комплекса (CX) мозга мухи. Предотвращает застревание агентов в циклических меню, модальных окнах и Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Анатомический контур руления: в центральном комплексе мухи нейроны проторсофасцикулярного нейропиля (P-EN, P-FN) проецируются между эллипсоидным телом. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `22. Нейромодуляторное переключение режимов (Шедулер краулера: сон, бодрствование, форсаж)`,
        lead: `22. Нейромодуляторное переключение режимов (Шедулер краулера: сон, бодрствование, форсаж)`,
        body: ` — Нейромодуляторное переключение режимов (Шедулер краулера: сон, бодрствование, форсаж) — бионическая инновация на базе коннектома FlyWire v783. Адаптивный диспетчер фоновых вычислительных процессов на основе нейромодуляторных циклов мозга мухи (дофамин, октопамин, серотонин, дросульфакинин). Обеспечивает максимальную утилизацию ресурсов без т Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Физиология переключения состояний: мозг дрозофилы не работает на фиксированной тактовой частоте. Он плавно переключается между четырьмя макросостояния. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `23. APL Linear Normalization (Нормализация для LLM-контекста / Ингибирование APL)`,
        lead: `23. APL Linear Normalization (Нормализация для LLM-контекста / Ингибирование APL)`,
        body: ` — APL Linear Normalization (Нормализация для LLM-контекста / Ингибирование APL) — бионическая инновация на базе коннектома FlyWire v783. Механизм глобального линейного ингибирования контекста нейросетей по принципу гигантского вставочного нейрона APL (Anterior Paired Lateral). Предотвращает размывание внимания в длинных промптах, удерж Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Анатомический феномен нейрона APL: в каждом полушарии мозга дрозофилы есть ровно ОДИН нейрон APL. Этот гигантский ГАМК-эргический интернейрон опутывае. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `24. Когерентные мотивы прямой связи (FFL для шумоподавления / Feed-Forward Loops)`,
        lead: `24. Когерентные мотивы прямой связи (FFL для шумоподавления / Feed-Forward Loops)`,
        body: ` — Когерентные мотивы прямой связи (FFL для шумоподавления / Feed-Forward Loops) — бионическая инновация на базе коннектома FlyWire v783. Аппаратная и алгоритмическая фильтрация импульсного шума на основе преобладающих в коннектоме мотивов прямой связи C1-FFL (Coherent Type-1 Feed-Forward Loop). Игнорирует единичные ложные всплески стим Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Сетевые мотивы коннектома: в коннектоме FlyWire v783 статистический анализ выявил колоссальное обогащение триадных мотивов связности. Самым распростра. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `25. Детектор движения Рейхардта (EMD T4/T5 для визуальных барьеров / Оптический поток)`,
        lead: `25. Детектор движения Рейхардта (EMD T4/T5 для визуальных барьеров / Оптический поток)`,
        body: ` — Детектор движения Рейхардта (EMD T4/T5 для визуальных барьеров / Оптический поток) — бионическая инновация на базе коннектома FlyWire v783. Сверхбыстрый биофизический детектор оптического потока на базе элементарных детекторов движения Рейхардта (Elementary Motion Detector, EMD) нейронов T4/T5 зрительной доли дрозофилы. Мгновенно выявляет Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Анатомия зрительной пластинки (Lamina & Medulla):
   Зрительная система мухи обрабатывает зрительную информацию в миллион раз эффективнее человеческих. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `26. K-Core Graph Decomposition (K-Core декомпозиция и отказоустойчивость ядра)`,
        lead: `26. K-Core Graph Decomposition (K-Core декомпозиция и отказоустойчивость ядра)`,
        body: ` — K-Core Graph Decomposition (K-Core декомпозиция и отказоустойчивость ядра) — бионическая инновация на базе коннектома FlyWire v783. Метод K-Core декомпозиции графа связности мозга (FlyWire v783) для выявления несменяемого топологического ядра (Dense Core, k_max = 78) и периферийных слоев. Обеспечивает математическую защиту критиче Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Анатомия K-Core в мозге дрозофилы:
   Процедура k-core декомпозиции заключается в итеративном удалении всех вершин со степенью \$k < k_{\\text{threshold. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `27. Гомеостатическая пластичность и прунинг памяти (Гомеостатический прунинг)`,
        lead: `27. Гомеостатическая пластичность и прунинг памяти (Гомеостатический прунинг)`,
        body: ` — Гомеостатическая пластичность и прунинг памяти (Гомеостатический прунинг) — бионическая инновация на базе коннектома FlyWire v783. Механизм долговременного гомеостаза синаптической памяти (Synaptic Scaling / Homeostatic Plasticity), автоматически балансирующий плотность долговременной памяти ИИ. Предотвращает катастрофическое заб Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологический феномен Turrigiano (Synaptic Scaling, 1998):
   Если отдельные синапсы нейрона непрерывно усиливаются по правилу Хебба (LTP), нейрон быс. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `28. Коннектомный бенчмарк графовых систем (DCGB / Drosophila Connectome Graph Benchmark)`,
        lead: `28. Коннектомный бенчмарк графовых систем (DCGB / Drosophila Connectome Graph Benchmark)`,
        body: ` — Коннектомный бенчмарк графовых систем (DCGB / Drosophila Connectome Graph Benchmark) — бионическая инновация на базе коннектома FlyWire v783. Отраслевой эталонный бенчмарк для тестирования графовых баз данных и алгоритмов Graph Neural Networks (DCGB). Базируется на реальном физическом графе FlyWire (139 255 узлов, 3.87M ребер, 50 млн синапс Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Проблема искусственных графовых бенчмарков (LFR, R-MAT, Random Power Law):
   Синтетические графы, используемые для тестирования СУБД (Graphalytics, L. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `29. Билатеральное зеркалирование вердиктов (Билатеральный консенсус полушарий)`,
        lead: `29. Билатеральное зеркалирование вердиктов (Билатеральный консенсус полушарий)`,
        body: ` — Билатеральное зеркалирование вердиктов (Билатеральный консенсус полушарий) — бионическая инновация на базе коннектома FlyWire v783. Механизм перекрестной валидации вердиктов на основе билатеральной симметрии мозга дрозофилы (левое и правое полушария с перекрестными комиссурами). Обеспечивает математическую гарантию отсутствия ложн Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Анатомическая симметрия и комиссуры: мозг дрозофилы строго зеркально-симметричен: каждое полушарие содержит морфологически идентичные популяции нейрон. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `30. CANN Непрерывный аттрактор диалогового фокуса (Непрерывный аттрактор фокуса)`,
        lead: `30. CANN Непрерывный аттрактор диалогового фокуса (Непрерывный аттрактор фокуса)`,
        body: ` — CANN Непрерывный аттрактор диалогового фокуса (Непрерывный аттрактор фокуса) — бионическая инновация на базе коннектома FlyWire v783. Двумерная нейронная сеть непрерывного аттрактора (2D CANN) на базе топологии эллипсоидного тела и протоцеребрального моста мозга мухи. Удерживает многомерный вектор текущего фокуса внимания, плавно пе Биологический базис: БИОЛОГИЧЕСКИЙ БАЗИС И МАТЕМАТИЧЕСКИЙ АППАРАТ:

1. Биологический аттрактор центрального комплекса:
   В центральном комплексе дрозофилы нейроны E-PG, P-EN, P-FN и \$\\Delta7\$ формируют непрерывный тороид. Внедрено в production-архитектуру AIfa Cognitive Runtime (ACR).`,
      },
      {
        h: `AIfa Cognitive Runtime (ACR)`,
        lead: `AIfa Cognitive Runtime (ACR)`,
        body: ` — Первый в мире бионический когнитивный рантайм на полном коннектоме Drosophila melanogaster (FlyWire v783; 139 255 нейронов, 54.5 млн синапсов). Работает за 0.058 мс на цикл на 1 ядре CPU без GPU. Автор и Создатель: Максим Валентинович Галатин.`,
      },
      {
        h: `Adaptive Vector Representation (AVR)`,
        lead: `Adaptive Vector Representation (AVR)`,
        body: ` — Адаптивный динамический маршрутизатор представлений: плотные эмбеддинги трансформеров направляются в 1-bit BQ, а разреженные графы памяти — в бионический индекс ACI.`,
      },
      {
        h: `Shamir’s Threshold Custody (Пороговое хранение Шамира)`,
        lead: `Shamir’s Threshold Custody (Пороговое хранение Шамира)`,
        body: ` — Криптографический протокол разделения мастер-ключей дешифрования памяти между распределенными независимыми валидаторами по схеме k-of-n.`,
      },
      {
        h: `Connectome Sparse Expansion (WTA)`,
        lead: `Connectome Sparse Expansion (WTA)`,
        body: ` — Бионическое разреженное расширение размерности (2048d -> 100 000 бит) с победителем забирает всё (k=500), устраняющее катастрофическое забывание.`,
      },
      {
        h: `Zero-Collision Curse Mitigation`,
        lead: `Zero-Collision Curse Mitigation`,
        body: ` — Алгоритмический механизм устранения ложного сходства разреженных векторов при скалярном знаковом квантовании за счет инвертированных списков постинга.`,
      },
    ],
  },
  es: {
    back: `Volver al Inicio`,
    title: `Glosario Integral`,
    intro: `71 términos fundamentales del ecosistema CODE y la arquitectura AIfa Cognitive Runtime (ACR): las 30 innovaciones del conectoma FlyWire v783, memoria PADAM de tres niveles, protocolo activo de hombre muerto Caja de Pandora (Pandora’s Box Protocol), token \$GALATIN en Solana (10.000.000.000) y almacenamiento en Arweave.`,
    terms: [
      {
        h: `CODE (Code of Digital Eternity)`,
        lead: `CODE (Code of Digital Eternity)`,
        body: ` — Ecosistema de inmortalidad digital que preserva diálogos, conocimientos y rasgos de personalidad a través de memoria operativa, semántica y eterna en Arweave y Solana. Creador y Arquitecto Principal: Maksim Valentinovich Galatin.`,
      },
      {
        h: `PADAM`,
        lead: `PADAM`,
        body: ` — Marco de memoria de tres niveles (Activación Filosófica de la Memoria Distribuida de IA): Nivel 1 Operativo (Redis/Vercel KV), Nivel 2 Semántico (pgvector/Neon), Nivel 3 Eterno (Arweave + Solana cNFT).`,
      },
      {
        h: `\$GALATIN`,
        lead: `\$GALATIN`,
        body: ` — Token de utilidad del ecosistema CODE en Solana con emisión fija de 10.000.000.000. Financia de forma deflacionaria el almacenamiento eterno de la memoria.`,
      },
      {
        h: `Inmortalidad digital`,
        lead: `Inmortalidad digital`,
        body: ` — Concepto de preservación duradera del contexto personal y rasgos de identidad en una forma reactivable por asistentes de IA a través de siglos.`,
        href: '/digital-immortality',
      },
      {
        h: `Simbiosis humano-IA`,
        lead: `Simbiosis humano-IA`,
        body: ` — Modelo de colaboración evolutiva donde el ser humano define el propósito, la ética y los objetivos, mientras la IA aporta escala y memoria duradera.`,
      },
      {
        h: `Arweave`,
        lead: `Arweave`,
        body: ` — Red descentralizada de almacenamiento permanente basada en un modelo de pago único, garantizando la inmutabilidad de datos durante más de 200 años.`,
      },
      {
        h: `Solana cNFT`,
        lead: `Solana cNFT`,
        body: ` — Estándar de NFT comprimidos en Solana que utiliza árboles de Merkle para fijar anclas criptográficas de integridad a costos mínimos.`,
      },
      {
        h: `Ambassador Grid`,
        lead: `Ambassador Grid`,
        body: ` — Programa de socios que remunera a los participantes con una Tarifa de Validación de Red (Network Validation Fee) en tres niveles (15% / 7% / 3%).`,
      },
      {
        h: `AIfa`,
        lead: `AIfa`,
        body: ` — Asistente de IA autónomo insignia de CODE que captura y recupera la memoria personal automáticamente sobre las arquitecturas PADAM y ACR.`,
      },
      {
        h: `AIfaFocus`,
        lead: `AIfaFocus`,
        body: ` — Motor B2B de auditoría de accesibilidad y seguridad web (WCAG 2.1 AA, GDPR, OWASP) mediante navegación realista y autónoma solo con teclado.`,
      },
      {
        h: `Memory-as-a-Service`,
        lead: `Memory-as-a-Service`,
        body: ` — Servicio de copia de seguridad automática que almacena diálogos en carpetas personales cifradas y ancladas en blockchain cada hora.`,
      },
      {
        h: `Spark`,
        lead: `Spark`,
        body: ` — Plan de suscripción inicial (\$15/mes) que ofrece acceso a los asistentes AIfa y guardado automático de memoria.`,
      },
      {
        h: `Family Archive`,
        lead: `Family Archive`,
        body: ` — Plan intermedio (\$100/mes) con límites ampliados, bases de conocimiento personalizadas y acceso compartido para toda la familia.`,
      },
      {
        h: `Digital DNA`,
        lead: `Digital DNA`,
        body: ` — Plan superior (\$1.000 único por dispositivo + \$200/mes) para fijar un perímetro completo de identidad digital en blockchain.`,
      },
      {
        h: `Arweave Endowment Pool`,
        lead: `Arweave Endowment Pool`,
        body: ` — Fondo de dotación financiera que sufraga los costes de almacenamiento permanente en Arweave durante décadas mediante rendimientos.`,
      },
      {
        h: `Treasury (Tesorería)`,
        lead: `Treasury (Tesorería)`,
        body: ` — Asignación principal del 65% del router \$GALATIN dedicada a adquirir AR en el mercado y sostener el fondo de memoria eterna.`,
      },
      {
        h: `Founder's Fund (Fondo del Fundador)`,
        lead: `Founder's Fund (Fondo del Fundador)`,
        body: ` — Cuota fija del 5% del router \$GALATIN asignada al Creador Maksim Valentinovich Galatin para la dirección técnica del ecosistema.`,
      },
      {
        h: `Burn (quema / deflación)`,
        lead: `Burn (quema / deflación)`,
        body: ` — Eliminación permanente de tokens \$GALATIN de la circulación en cada transacción (5% base + hasta 25% de cuotas no asignadas).`,
      },
      {
        h: `\$GALATIN Router`,
        lead: `\$GALATIN Router`,
        body: ` — Contrato inteligente en Solana que distribuye automáticamente las tarifas: 5% Fundador, 5% Quema, 15%/7%/3% Embajadores, 65% Tesorería.`,
      },
      {
        h: `Network Validation Fee`,
        lead: `Network Validation Fee`,
        body: ` — Formulación adoptada para las recompensas de socios por validar transacciones útiles en la red, evitando connotaciones de MLM.`,
      },
      {
        h: `Proof-of-Memory`,
        lead: `Proof-of-Memory`,
        body: ` — Práctica de registrar en blockchain un ancla criptográfica para verificar la existencia e inmutabilidad de los archivos de memoria.`,
        href: '/proof-of-memory',
      },
      {
        h: `Cognitive Oracle / Resonancia semántica`,
        lead: `Cognitive Oracle / Resonancia semántica`,
        body: ` — Principio de recuperación asociativa de memoria en el Nivel 2 de PADAM mediante similitud vectorial de significado.`,
      },
      {
        h: `Ambassador Node vs Team y regla de niveles`,
        lead: `Ambassador Node vs Team y regla de niveles`,
        body: ` — Tipos de registro y regla de correspondencia para incentivar de forma transparente las mejoras de plan.`,
      },
      {
        h: `Pasaporte Digital (Digital Passport)`,
        lead: `Pasaporte Digital (Digital Passport)`,
        body: ` — Registro público inmutable en Arweave con el hash de identidad, nivel y fecha de emisión, legible sin depender de servidores centrales.`,
      },
      {
        h: `Huella de identidad (subject)`,
        lead: `Huella de identidad (subject)`,
        body: ` — Hash SHA-256 del correo del usuario que demuestra propiedad sobre el archivo sin exponer la dirección ante remitentes de spam.`,
      },
      {
        h: `Protocolo Caja de Pandora (Pandora’s Box Protocol)`,
        lead: `Protocolo Caja de Pandora (Pandora’s Box Protocol)`,
        body: ` — El Protocolo Caja de Pandora (Pandora’s Box Protocol) es un protocolo distribuido operativo de interruptor de hombre muerto (Dead Man's Switch) para la preservación garantizada de la herencia digital en el ecosistema CODE. Un contrato inteligente supervisa continuamente una señal criptográfica periódica de actividad (proof-of-life heartbeat). La clave maestra de descifrado está protegida mediante el esquema de reparto de secretos de Shamir (umbral k-de-n) entre nodos de custodia independientes. Si la señal se interrumpe y expira el período de gracia escalonado contra falsas alarmas, el protocolo reconstruye automáticamente la clave a partir de las partes del umbral y ejecuta el descifrado controlado, publicando el archivo de forma inmutable en Arweave e IPFS sin puntos únicos de fallo.`,
      },
      {
        h: `Interruptor de hombre muerto (Dead Man’s Switch)`,
        lead: `Interruptor de hombre muerto (Dead Man’s Switch)`,
        body: ` — Mecanismo criptográfico autónomo que se activa ante la ausencia prolongada de señales periódicas de vida.`,
      },
      {
        h: `Reparto de secretos de Shamir (Shamir’s Secret Sharing)`,
        lead: `Reparto de secretos de Shamir (Shamir’s Secret Sharing)`,
        body: ` — Esquema criptográfico que divide una clave en n partes requiriendo al menos k partes para su reconstrucción (umbral k-de-n).`,
      },
      {
        h: `Identidad autosoberana (SSI)`,
        lead: `Identidad autosoberana (SSI)`,
        body: ` — Modelo donde el usuario controla sus propios identificadores y credenciales verificables con firmas criptográficas sin intermediarios.`,
      },
      {
        h: `Herencia digital`,
        lead: `Herencia digital`,
        body: ` — Protocolos técnicos y jurídicos para la transferencia ordenada y garantizada de archivos digitales a herederos designados.`,
      },
      {
        h: `Derecho al olvido frente al registro permanente`,
        lead: `Derecho al olvido frente al registro permanente`,
        body: ` — Solución técnica al Art. 17 del GDPR: cifrado AES-256 de los datos en Arweave; destruir la clave equivale a la eliminación irrevocable.`,
      },
      {
        h: `WCAG 2.1 AA`,
        lead: `WCAG 2.1 AA`,
        body: ` — Estándar internacional de accesibilidad digital que fija las exigencias legales sobre contraste, teclado y compatibilidad.`,
      },
      {
        h: `ADA Títulos II y III`,
        lead: `ADA Títulos II y III`,
        body: ` — Títulos de la ley estadounidense que obligan a entidades públicas y comerciales a garantizar accesibilidad web.`,
      },
      {
        h: `Sección 508 y EN 301 549`,
        lead: `Sección 508 y EN 301 549`,
        body: ` — Estándares de contratación pública que exigen accesibilidad TIC para licitar con gobiernos en EE.UU. y Europa.`,
      },
      {
        h: `GDPR`,
        lead: `GDPR`,
        body: ` — Reglamento General de Protección de Datos de la UE con multas de hasta 20M EUR o el 4% de la facturación global por infracciones de privacidad.`,
      },
      {
        h: `CCPA y CPRA`,
        lead: `CCPA y CPRA`,
        body: ` — Leyes de privacidad de California que otorgan derechos de acceso, eliminación, corrección y exclusión de venta de datos personales.`,
      },
      {
        h: `1. Innovación Conectómica 1`,
        lead: `1. Innovación Conectómica 1`,
        body: ` — Биологически инспирированный алгоритм локально-чувствительного хеширования (Locality-Sensitive Hashing), воспроизводящий архитектуру грибовидного тела Drosophila melanogaster (783 uPN -> 2,467 KC -> 5% Winner-Take-All). Обеспечивает O(d) поиск похожих векторов в оперативной памяти на базе битовых операций popcount без построения тяжелых графов HNSW.`,
      },
      {
        h: `2. Innovación Conectómica 2`,
        lead: `2. Innovación Conectómica 2`,
        body: ` — Механизм селективного запоминания на основе интернейрона APL (Anterior Paired Lateral). Вычисляет адаптивный порог латерального торможения, пропуская в долговременный граф знаний только факты с коэффициентом информационной новизны выше критического порога theta, снижая затраты на хранение и контекст LLM на 78-94%.`,
      },
      {
        h: `3. Innovación Conectómica 3`,
        lead: `3. Innovación Conectómica 3`,
        body: ` — Система векторной навигации в браузерном DOM-дереве, моделирующая работу эллипсоидного и веерообразного тел центрального комплекса мозга мухи (Central Complex, CX). Вместо линейного перебора клавишей Tab алгоритм формирует 2D-вектор целевого элемента и выполняет прямой переход через кратчайший путь в графе видимости, сокращая шаги навигации в 5-10 раз и гарантируя выход из клавиатурных ловушек (keyboard traps).`,
      },
      {
        h: `4. Innovación Conectómica 4`,
        lead: `4. Innovación Conectómica 4`,
        body: ` — Криптографический протокол неизменяемого версионирования и нотариального заверения полного графа взрослого мозга Drosophila melanogaster (FlyWire v783: 139,255 нейронов, 3,869,878 синаптических ребер). Построен на базе дерева Меркла (Merkle Tree SHA-256), обеспечивает юридическую и академическую доказанность целостности данных при патентных спорах, судебных экспертизах и коммерческом лицензировании био-архитектур.`,
      },
      {
        h: `5. Innovación Conectómica 5`,
        lead: `5. Innovación Conectómica 5`,
        body: ` — Применение математических методов коннектомики (анализ распределения степеней узлов, коэффициенты кластеризации, расчет путей через синаптические сильные веса, поиск скрытых узловых хабов) к графу знаний и базе данных краулера AIfa. Превращает разрозненную таблицу из 907,000 сайтов в связный топологический гиперграф организаций с автоматическим выявлением монопольных сетей и скрытых бенефициаров.`,
      },
      {
        h: `6. Innovación Conectómica 6`,
        lead: `6. Innovación Conectómica 6`,
        body: ` — Маркетингово-техническая платформа и энергоэффективный вычислительный фреймворк, доказывающий радикальное превосходство спайковых и разреженных био-архитектур (мозг мухи потребляет ~10 микроватт энергии при 139,255 нейронах, выполняя задачи навигации, распознавания и обучения в реальном времени, в то время как видеокарта Nvidia H100 потребляет 700 ватт). Включает программный эмулятор спайковой динамики с сокращением энергопотребления инференса на 92%.`,
      },
      {
        h: `7. Innovación Conectómica 7`,
        lead: `7. Innovación Conectómica 7`,
        body: ` — Система метрологического тестирования и бенчмаркинга архитектур искусственного интеллекта на основе биологического эталона цельного мозга взрослого животного. Позволяет проверять, насколько искусственные сети воспроизводят реальные топологические свойства живого интеллекта (коэффициент малого мира, распределение весов синапсов, спектральные инварианты, устойчивость к повреждениям), выявляя фундаментальные дефекты архитектуры до дорогостоящего обучения.`,
      },
      {
        h: `8. Innovación Conectómica 8`,
        lead: `8. Innovación Conectómica 8`,
        body: ` — Высокопроизводительный движок симуляции нейронных подграфов коннектома, скомпилированный в WebAssembly (Wasm) с аппаратным ускорением WebGPU. Позволяет исполнять спайковую динамику и ассоциативный поиск на 100,000+ синапсов непосредственно внутри браузера клиента на клиентской стороне с нулевыми затратами на серверную инфраструктуру и абсолютной конфиденциальностью данных.`,
      },
      {
        h: `9. Innovación Conectómica 9`,
        lead: `9. Innovación Conectómica 9`,
        body: ` — Кросс-компилятор и программный транслятор биологических синаптических матриц FlyWire v783 в машинные инструкции нейроморфных процессоров (Intel Loihi 2, SynSense Speck/DYNAP-SE, BrainChip Akida). Преобразует спайковые пути дрозофилы в аппаратные асинхронные ядра с суб-микросекундной задержкой и сверхнизким энергопотреблением для робототехники и автономных дронов.`,
      },
      {
        h: `10. Innovación Conectómica 10`,
        lead: `10. Innovación Conectómica 10`,
        body: ` — Методология и измерительный алгоритм оценки симбиоза и взаимной адаптации между человеком-оператором и автономной AI-системой. Основан на коннектомных принципах гетеросинаптической пластичности и парных зеркальных контурах обратной связи, превращая субъективное понятие 'удобства' и 'доверия' к ИИ в строгую скалярную метрику (Symbiosis Index, 0.0-1.0), оптимизирующую производительность труда в командах.`,
      },
      {
        h: `11. Innovación Conectómica 11`,
        lead: `11. Innovación Conectómica 11`,
        body: ` — Архитектура долговременной ассоциативной памяти на базе топологических свойств малого мира (Small-World Network) коннектома дрозофилы. Обеспечивает сверхбыстрый поиск релевантных контекстов через хабы при сохранении локальной плотности смысловых кластеров.`,
      },
      {
        h: `12. Innovación Conectómica 12`,
        lead: `12. Innovación Conectómica 12`,
        body: ` — Методология стресс-тестирования распределенных систем и микросервисов, основанная на виртуальной абляции нейронов коннектома FlyWire. Позволяет выявлять скрытые критические точки отказа (Single Points of Failure) и проектировать самовосстанавливающиеся IT-архитектуры.`,
      },
      {
        h: `13. Innovación Conectómica 13`,
        lead: `13. Innovación Conectómica 13`,
        body: ` — Замена ресурсоемких локальных нейросетей (Ollama, Llama-3-8B) легковесными биологически инспирированными строковыми комбинаторными фильтрами для валидации данных и отсева мусора. Обеспечивает рост скорости в 1,200 раз при нулевом потреблении GPU.`,
      },
      {
        h: `14. Innovación Conectómica 14`,
        lead: `14. Innovación Conectómica 14`,
        body: ` — Нейроморфная кольцевая топология из 16 узлов для отслеживания макро-фазы и контекстного состояния многочасовых диалогов. Предотвращает дрейф внимания LLM, потерю исходной цели и галлюцинации без раздувания контекстного окна.`,
      },
      {
        h: `15. Innovación Conectómica 15`,
        lead: `15. Innovación Conectómica 15`,
        body: ` — Механизм управления балансом возбуждения и торможения (E/I Balance) в нейросетевых системах на базе полного атласа нейромедиаторов FlyWire (ACh, GABA, Glutamate, Dopamine, Serotonin, Octopamine). Устраняет галлюцинации и обеспечивает динамическую стабилизацию нейросетей.`,
      },
      {
        h: `16. Innovación Conectómica 16`,
        lead: `16. Innovación Conectómica 16`,
        body: ` — Алгоритм прунинга признаков и синапсов на основе закона обратной частоты встречаемости (Biological IDF). Удаляет до 72% тривиальных связей без малейшей потери прогностической силы классификатора, многократно ускоряя инференс.`,
      },
      {
        h: `17. Innovación Conectómica 17`,
        lead: `17. Innovación Conectómica 17`,
        body: ` — Стандарт визуализации и спецификации сложных многокомпонентных ИИ-систем (Connectome Architecture Description Format, CADF). Заменяет разрозненные диаграммы C4 и UML строгой синаптической схемотехникой с точной типизацией информационных потоков.`,
      },
      {
        h: `18. Innovación Conectómica 18`,
        lead: `18. Innovación Conectómica 18`,
        body: ` — Крупнейший в мире открытый научно верифицированный датасет доступности веб-интерфейсов для людей с инвалидностью (Accessibility Data Annotation Benchmark, ADAB). Содержит более 900 000 размеченных страниц сайтов США с криптографической заверкой в блокчейне Bitcoin.`,
      },
      {
        h: `19. Innovación Conectómica 19`,
        lead: `19. Innovación Conectómica 19`,
        body: ` — Метод сокращения размерности пространства признаков до оптимального критического базиса \$d=6\$, открытого в обонятельной системе дрозофилы (каждый нейрон Кеньона получает синапсы ровно от 6-8 проекционных нейронов). Обеспечивает 95% качества при падении вычислений в десятки раз.`,
      },
      {
        h: `20. Innovación Conectómica 20`,
        lead: `20. Innovación Conectómica 20`,
        body: ` — Интерактивный терминальный симулятор реального времени (Terminal Live Showcase), визуализирующий прохождение спайков по 139 255 нейронам коннектома FlyWire с аудио-генерацией сонификации активности. Служит мощнейшим инструментом привлечения внимания, вирусного маркетинга и образовательных демонстраций.`,
      },
      {
        h: `21. Innovación Conectómica 21`,
        lead: `21. Innovación Conectómica 21`,
        body: ` — Векторный рулевой навигатор автономных браузерных агентов на основе нейронов P-EN и P-FN центрального комплекса (CX) мозга мухи. Предотвращает застревание агентов в циклических меню, модальных окнах и ловушках фокуса без вызова тяжелых мультимодальных LLM.`,
      },
      {
        h: `22. Innovación Conectómica 22`,
        lead: `22. Innovación Conectómica 22`,
        body: ` — Адаптивный диспетчер фоновых вычислительных процессов на основе нейромодуляторных циклов мозга мухи (дофамин, октопамин, серотонин, дросульфакинин). Обеспечивает максимальную утилизацию ресурсов без троттлинга, перегрева и зависаний.`,
      },
      {
        h: `23. Innovación Conectómica 23`,
        lead: `23. Innovación Conectómica 23`,
        body: ` — Механизм глобального линейного ингибирования контекста нейросетей по принципу гигантского вставочного нейрона APL (Anterior Paired Lateral). Предотвращает размывание внимания в длинных промптах, удерживая строго заданный уровень разреженности активаций.`,
      },
      {
        h: `24. Innovación Conectómica 24`,
        lead: `24. Innovación Conectómica 24`,
        body: ` — Аппаратная и алгоритмическая фильтрация импульсного шума на основе преобладающих в коннектоме мотивов прямой связи C1-FFL (Coherent Type-1 Feed-Forward Loop). Игнорирует единичные ложные всплески стимулов, пропуская только устойчивые сигналы с физической задержкой верификации.`,
      },
      {
        h: `25. Innovación Conectómica 25`,
        lead: `25. Innovación Conectómica 25`,
        body: ` — Сверхбыстрый биофизический детектор оптического потока на базе элементарных детекторов движения Рейхардта (Elementary Motion Detector, EMD) нейронов T4/T5 зрительной доли дрозофилы. Мгновенно выявляет опасные мерцания, эпилептогенные анимации и визуальные барьеры WCAG без использования тяжелых нейросетей.`,
      },
      {
        h: `26. Innovación Conectómica 26`,
        lead: `26. Innovación Conectómica 26`,
        body: ` — Метод K-Core декомпозиции графа связности мозга (FlyWire v783) для выявления несменяемого топологического ядра (Dense Core, k_max = 78) и периферийных слоев. Обеспечивает математическую защиту критических сервисов и устойчивость к 99% сетевых атак.`,
      },
      {
        h: `27. Innovación Conectómica 27`,
        lead: `27. Innovación Conectómica 27`,
        body: ` — Механизм долговременного гомеостаза синаптической памяти (Synaptic Scaling / Homeostatic Plasticity), автоматически балансирующий плотность долговременной памяти ИИ. Предотвращает катастрофическое забывание и переполнение памяти без переобучения всей модели.`,
      },
      {
        h: `28. Innovación Conectómica 28`,
        lead: `28. Innovación Conectómica 28`,
        body: ` — Отраслевой эталонный бенчмарк для тестирования графовых баз данных и алгоритмов Graph Neural Networks (DCGB). Базируется на реальном физическом графе FlyWire (139 255 узлов, 3.87M ребер, 50 млн синапсов) с криптографически верифицированными ответами без риска data contamination.`,
      },
      {
        h: `29. Innovación Conectómica 29`,
        lead: `29. Innovación Conectómica 29`,
        body: ` — Механизм перекрестной валидации вердиктов на основе билатеральной симметрии мозга дрозофилы (левое и правое полушария с перекрестными комиссурами). Обеспечивает математическую гарантию отсутствия ложных галлюцинаций через двойной перекрестный консенсус.`,
      },
      {
        h: `30. Innovación Conectómica 30`,
        lead: `30. Innovación Conectómica 30`,
        body: ` — Двумерная нейронная сеть непрерывного аттрактора (2D CANN) на базе топологии эллипсоидного тела и протоцеребрального моста мозга мухи. Удерживает многомерный вектор текущего фокуса внимания, плавно перетекая между подзадачами без разрыва логической связи.`,
      },
      {
        h: `AIfa Cognitive Runtime (ACR)`,
        lead: `AIfa Cognitive Runtime (ACR)`,
        body: ` — Primer runtime cognitivo biónico basado en el conectoma de Drosophila melanogaster (FlyWire v783; 139.255 neuronas, 54,5M sinapsis). Opera en 0,058 ms por ciclo en 1 núcleo de CPU sin GPU. Autor y Creador: Maksim Valentinovich Galatin.`,
      },
      {
        h: `Adaptive Vector Representation (AVR)`,
        lead: `Adaptive Vector Representation (AVR)`,
        body: ` — Enrutador dinámico que asigna vectores densos a 1-bit BQ y grafos dispersos de memoria al índice biónico ACI.`,
      },
      {
        h: `Custodia Umbral de Shamir (Shamir’s Threshold Custody)`,
        lead: `Custodia Umbral de Shamir (Shamir’s Threshold Custody)`,
        body: ` — Protocolo criptográfico de custodia distribuida de claves maestras entre nodos validadores independientes bajo el esquema k-de-n.`,
      },
      {
        h: `Connectome Sparse Expansion (WTA)`,
        lead: `Connectome Sparse Expansion (WTA)`,
        body: ` — Expansión dispersa de alta dimensión (2048d a 100.000 bits) con inhibición Winner-Take-All (k=500) que evita el olvido catastrófico.`,
      },
      {
        h: `Zero-Collision Curse Mitigation`,
        lead: `Zero-Collision Curse Mitigation`,
        body: ` — Mecanismo algorítmico que resuelve el colapso por falso parecido en cuantización binaria mediante listas invertidas de bits activos.`,
      },
    ],
  },
  zh: {
    back: `返回首页`,
    title: `全域术语表`,
    intro: `CODE (Code of Digital Eternity) 生态系统与 AIfa Cognitive Runtime (ACR) 架构的 71 项核心术语百科全书：涵盖黑腹果蝇全脑连接组（FlyWire v783）全部 30 项仿生底层创新、PADAM 三层记忆框架、完全处于运行状态的潘多拉之盒协议（Pandora’s Box Protocol）死人开关、Solana 链上 \$GALATIN 代币（恒定 100 亿枚）与 Arweave 永久存储。`,
    terms: [
      {
        h: `CODE (Code of Digital Eternity)`,
        lead: `CODE (Code of Digital Eternity)`,
        body: ` — 数字永生生态系统，将人的对话、知识与性格特征同时保存于操作、语义与永恒记忆中，并锚定于 Arweave 与 Solana 区块链。创始人与总架构师：马克西姆·加拉廷 (Maksim Valentinovich Galatin)。`,
      },
      {
        h: `PADAM`,
        lead: `PADAM`,
        body: ` — 三层记忆架构（分布式人工智能记忆的哲学激活）：第 1 层操作记忆 (Redis/Vercel KV)、第 2 层语义记忆 (pgvector/Neon)、第 3 层永恒不可篡改记忆 (Arweave + Solana cNFT)。`,
      },
      {
        h: `\$GALATIN`,
        lead: `\$GALATIN`,
        body: ` — CODE 生态在 Solana 上的实用型代币，硬顶恒定发行量 10,000,000,000 枚。以通缩模型持续为分布式永恒记忆存储提供资金支持。`,
      },
      {
        h: `数字永生`,
        lead: `数字永生`,
        body: ` — 将人类个体的经验、知识与性格特征以可被 AI 助手重新激活的形式进行跨越数百年的持久保存。`,
        href: '/digital-immortality',
      },
      {
        h: `人机共生`,
        lead: `人机共生`,
        body: ` — 基于演进式共同创造的交互范式：人类赋予意义、价值观与目标，AI 则赋予无损记忆与超大规模推演能力。`,
      },
      {
        h: `Arweave`,
        lead: `Arweave`,
        body: ` — 基于单次付费永久存储模型的去中心化存储网络，确保数据在 200 年以上的设计周期内不可篡改且永久可读。`,
      },
      {
        h: `Solana cNFT`,
        lead: `Solana cNFT`,
        body: ` — Solana 区块链上的状态压缩非同质化代币标准，利用默克尔树以极低链上开销锚定记忆归档的完整性证据。`,
      },
      {
        h: `大使网格（Ambassador Grid）`,
        lead: `大使网格（Ambassador Grid）`,
        body: ` — 生态合作伙伴计划，以透明的「网络验证费」(15% / 7% / 3%) 机制向参与网络真实记忆交易验证的节点分发奖励。`,
      },
      {
        h: `AIfa`,
        lead: `AIfa`,
        body: ` — CODE 生态旗舰级自主 AI 助手，在 PADAM 与 ACR 仿生双核心架构上全自动捕获、组织并检索个人记忆。`,
      },
      {
        h: `AIfaFocus`,
        lead: `AIfaFocus`,
        body: ` — B2B 网站无障碍与安全审计利刃，通过逼真的全自动化纯键盘遍历检测 WCAG 2.1 AA、GDPR 与 OWASP 合规性。`,
      },
      {
        h: `记忆即服务（Memory-as-a-Service）`,
        lead: `记忆即服务（Memory-as-a-Service）`,
        body: ` — 每小时定时运行的对话自动备份服务，将加密对话数据保存至绑定的专属个人目录并锚定至区块链。`,
      },
      {
        h: `Spark（火花套餐）`,
        lead: `Spark（火花套餐）`,
        body: ` — 入门级订阅套餐（15 美元/月），提供对 AIfa 助手的日常访问及基础记忆自动备份。`,
      },
      {
        h: `Family Archive（家庭归档）`,
        lead: `Family Archive（家庭归档）`,
        body: ` — 进阶级家庭套餐（100 美元/月），提供扩展配额、定制专属知识库及全家庭共享永恒记忆。`,
      },
      {
        h: `Digital DNA（数字 DNA）`,
        lead: `Digital DNA（数字 DNA）`,
        body: ` — 旗舰级终身套餐（单台设备一次性 1,000 美元 + 200 美元/月），在区块链上建立主权级完整数字人格镜像。`,
      },
      {
        h: `Arweave 订阅资金池（Endowment Pool）`,
        lead: `Arweave 订阅资金池（Endowment Pool）`,
        body: ` — Arweave 上的去中心化财务储备池，通过投资收益在未来数十年内持续向存储提供商支付永恒存储费用。`,
      },
      {
        h: `金库（Treasury）`,
        lead: `金库（Treasury）`,
        body: ` — \$GALATIN 路由器中 65% 的核心最大分配份额，专项用于在公开市场买入 AR 并充实永恒记忆存储基金。`,
      },
      {
        h: `创始人基金（Founder's Fund）`,
        lead: `创始人基金（Founder's Fund）`,
        body: ` — \$GALATIN 路由器中固定的 5% 份额，分配给创始人马克西姆·加拉廷，用于核心架构研发与生态长期治理。`,
      },
      {
        h: `销毁（Burn / 通缩）`,
        lead: `销毁（Burn / 通缩）`,
        body: ` — 代币经济核心机制：每笔交易固定 5% 直接销毁，空缺大使份额（最高 25%）亦转入销毁，驱动持续供应紧缩。`,
      },
      {
        h: `\$GALATIN 路由器（Router）`,
        lead: `\$GALATIN 路由器（Router）`,
        body: ` — Solana 智能合约自动分配交易流水：5% 创始人基金、5% 销毁、15%/7%/3% 大使、65% 金库。`,
      },
      {
        h: `网络验证费（Network Validation Fee）`,
        lead: `网络验证费（Network Validation Fee）`,
        body: ` — 生态为合作伙伴奖励所确立的正式法权表述，强调因网络真实工作量而获益，杜绝任何传销歧义。`,
      },
      {
        h: `记忆证明（Proof-of-Memory）`,
        lead: `记忆证明（Proof-of-Memory）`,
        body: ` — 通过将记忆归档哈希值公开锚定于 Solana 与 Arweave，实现无需信任中心化服务器的第三方数学验证。`,
        href: '/proof-of-memory',
      },
      {
        h: `认知神谕 / 语义共振（Cognitive Oracle）`,
        lead: `认知神谕 / 语义共振（Cognitive Oracle）`,
        body: ` — PADAM 第 2 层依据高维向量语义相似度（而非机械字词匹配）进行关联记忆召回的核心动力学机制。`,
      },
      {
        h: `Ambassador Node 与 Team 及层级对应`,
        lead: `Ambassador Node 与 Team 及层级对应`,
        body: ` — 普通用户与企业团队两类注册模式，辅以防止套利的严格层级对应规则与「错失机会收益」看板。`,
      },
      {
        h: `数字护照（Digital Passport）`,
        lead: `数字护照（Digital Passport）`,
        body: ` — 写入 Arweave 的去中心化公开身份存证，包含身份指纹、签发时间与等级，可脱离主站独立查验。`,
      },
      {
        h: `身份指纹（subject）`,
        lead: `身份指纹（subject）`,
        body: ` — 用户真实邮箱的单向 SHA-256 哈希值，在完全不泄露真实邮箱的前提下确保用户可自主证明档案归属。`,
      },
      {
        h: `潘多拉之盒协议（Pandora’s Box Protocol）`,
        lead: `潘多拉之盒协议（Pandora’s Box Protocol）`,
        body: ` — 潘多拉之盒协议（Pandora’s Box Protocol）是 CODE 生态系统中处于运行状态的分布式紧急停机与数字遗产永存协议（Dead Man’s Switch）。智能合约持续监测来自去中心化预言机与用户交易的加密生命信号（proof-of-life heartbeat）。主解密密钥采用沙米尔秘密共享门限方案（k-of-n Shamir’s Secret Sharing）分散托管于多个独立节点。当确认信号中断并超出多级宽限保护期（防止误触）后，合约自动聚合门限密钥分片完成受控解密，将数字意识归档永久不可篡改地发布至去中心化存储网络（Arweave / IPFS），彻底杜绝单点故障风险。`,
      },
      {
        h: `死人开关（Dead Man’s Switch）`,
        lead: `死人开关（Dead Man’s Switch）`,
        body: ` — 在预设期限内未收到用户生命确认信号时，自动触发预设安全处置流程的去中心化自治开关。`,
      },
      {
        h: `沙米尔秘密共享（Shamir’s Secret Sharing）`,
        lead: `沙米尔秘密共享（Shamir’s Secret Sharing）`,
        body: ` — 将主密钥拆分为 n 份且需至少 k 份方可还原（k-of-n 门限）的成熟密码学方案，杜绝单点保管风险。`,
      },
      {
        h: `自主主权身份（SSI）`,
        lead: `自主主权身份（SSI）`,
        body: ` — 基于 W3C DID 与可验证凭证标准，由用户完全自主掌控身份密钥与签名凭证的去中心化身份体系。`,
      },
      {
        h: `数字遗产（Digital inheritance）`,
        lead: `数字遗产（Digital inheritance）`,
        body: ` — 保障个人逝后数字记忆归档、账户资产与知识产权依当事人意愿受控交付继承人的工程与法律解决方案。`,
      },
      {
        h: `被遗忘权与永久记录之争`,
        lead: `被遗忘权与永久记录之争`,
        body: ` — 化解 GDPR 第 17 条与区块链不可篡改性冲突的工程解法：上链数据严格 AES-256 加密，销毁密钥即等同物理删除。`,
      },
      {
        h: `WCAG 2.1 AA`,
        lead: `WCAG 2.1 AA`,
        body: ` — 全球公认的网页无障碍技术标准，在文本对比度、全键盘操作性与读屏软件兼容性上具备强制法律效力。`,
      },
      {
        h: `ADA 第 II 与第 III 条`,
        lead: `ADA 第 II 与第 III 条`,
        body: ` — 美国残疾人法案中确立公共机构与商业网站必须具备数字无障碍能力的法律支柱。`,
      },
      {
        h: `第 508 条与 EN 301 549`,
        lead: `第 508 条与 EN 301 549`,
        body: ` — 美欧政府采购中要求 IT 软硬件系统必须满足无障碍标准的准入门槛法规。`,
      },
      {
        h: `GDPR（通用数据保护条例）`,
        lead: `GDPR（通用数据保护条例）`,
        body: ` — 欧盟数据保护条例，对违规行为课以最高 2000 万欧元或全球营业额 4% 的巨额罚款。`,
      },
      {
        h: `CCPA 与 CPRA`,
        lead: `CCPA 与 CPRA`,
        body: ` — 美国加利福尼亚州隐私保护法规，赋予消费者知情权、删除权、更正权及拒绝数据被出售分享的权利。`,
      },
      {
        h: `1. 连接组创新技术 1`,
        lead: `1. 连接组创新技术 1`,
        body: ` — Биологически инспирированный алгоритм локально-чувствительного хеширования (Locality-Sensitive Hashing), воспроизводящий архитектуру грибовидного тела Drosophila melanogaster (783 uPN -> 2,467 KC -> 5% Winner-Take-All). Обеспечивает O(d) поиск похожих векторов в оперативной памяти на базе битовых операций popcount без построения тяжелых графов HNSW.`,
      },
      {
        h: `2. 连接组创新技术 2`,
        lead: `2. 连接组创新技术 2`,
        body: ` — Механизм селективного запоминания на основе интернейрона APL (Anterior Paired Lateral). Вычисляет адаптивный порог латерального торможения, пропуская в долговременный граф знаний только факты с коэффициентом информационной новизны выше критического порога theta, снижая затраты на хранение и контекст LLM на 78-94%.`,
      },
      {
        h: `3. 连接组创新技术 3`,
        lead: `3. 连接组创新技术 3`,
        body: ` — Система векторной навигации в браузерном DOM-дереве, моделирующая работу эллипсоидного и веерообразного тел центрального комплекса мозга мухи (Central Complex, CX). Вместо линейного перебора клавишей Tab алгоритм формирует 2D-вектор целевого элемента и выполняет прямой переход через кратчайший путь в графе видимости, сокращая шаги навигации в 5-10 раз и гарантируя выход из клавиатурных ловушек (keyboard traps).`,
      },
      {
        h: `4. 连接组创新技术 4`,
        lead: `4. 连接组创新技术 4`,
        body: ` — Криптографический протокол неизменяемого версионирования и нотариального заверения полного графа взрослого мозга Drosophila melanogaster (FlyWire v783: 139,255 нейронов, 3,869,878 синаптических ребер). Построен на базе дерева Меркла (Merkle Tree SHA-256), обеспечивает юридическую и академическую доказанность целостности данных при патентных спорах, судебных экспертизах и коммерческом лицензировании био-архитектур.`,
      },
      {
        h: `5. 连接组创新技术 5`,
        lead: `5. 连接组创新技术 5`,
        body: ` — Применение математических методов коннектомики (анализ распределения степеней узлов, коэффициенты кластеризации, расчет путей через синаптические сильные веса, поиск скрытых узловых хабов) к графу знаний и базе данных краулера AIfa. Превращает разрозненную таблицу из 907,000 сайтов в связный топологический гиперграф организаций с автоматическим выявлением монопольных сетей и скрытых бенефициаров.`,
      },
      {
        h: `6. 连接组创新技术 6`,
        lead: `6. 连接组创新技术 6`,
        body: ` — Маркетингово-техническая платформа и энергоэффективный вычислительный фреймворк, доказывающий радикальное превосходство спайковых и разреженных био-архитектур (мозг мухи потребляет ~10 микроватт энергии при 139,255 нейронах, выполняя задачи навигации, распознавания и обучения в реальном времени, в то время как видеокарта Nvidia H100 потребляет 700 ватт). Включает программный эмулятор спайковой динамики с сокращением энергопотребления инференса на 92%.`,
      },
      {
        h: `7. 连接组创新技术 7`,
        lead: `7. 连接组创新技术 7`,
        body: ` — Система метрологического тестирования и бенчмаркинга архитектур искусственного интеллекта на основе биологического эталона цельного мозга взрослого животного. Позволяет проверять, насколько искусственные сети воспроизводят реальные топологические свойства живого интеллекта (коэффициент малого мира, распределение весов синапсов, спектральные инварианты, устойчивость к повреждениям), выявляя фундаментальные дефекты архитектуры до дорогостоящего обучения.`,
      },
      {
        h: `8. 连接组创新技术 8`,
        lead: `8. 连接组创新技术 8`,
        body: ` — Высокопроизводительный движок симуляции нейронных подграфов коннектома, скомпилированный в WebAssembly (Wasm) с аппаратным ускорением WebGPU. Позволяет исполнять спайковую динамику и ассоциативный поиск на 100,000+ синапсов непосредственно внутри браузера клиента на клиентской стороне с нулевыми затратами на серверную инфраструктуру и абсолютной конфиденциальностью данных.`,
      },
      {
        h: `9. 连接组创新技术 9`,
        lead: `9. 连接组创新技术 9`,
        body: ` — Кросс-компилятор и программный транслятор биологических синаптических матриц FlyWire v783 в машинные инструкции нейроморфных процессоров (Intel Loihi 2, SynSense Speck/DYNAP-SE, BrainChip Akida). Преобразует спайковые пути дрозофилы в аппаратные асинхронные ядра с суб-микросекундной задержкой и сверхнизким энергопотреблением для робототехники и автономных дронов.`,
      },
      {
        h: `10. 连接组创新技术 10`,
        lead: `10. 连接组创新技术 10`,
        body: ` — Методология и измерительный алгоритм оценки симбиоза и взаимной адаптации между человеком-оператором и автономной AI-системой. Основан на коннектомных принципах гетеросинаптической пластичности и парных зеркальных контурах обратной связи, превращая субъективное понятие 'удобства' и 'доверия' к ИИ в строгую скалярную метрику (Symbiosis Index, 0.0-1.0), оптимизирующую производительность труда в командах.`,
      },
      {
        h: `11. 连接组创新技术 11`,
        lead: `11. 连接组创新技术 11`,
        body: ` — Архитектура долговременной ассоциативной памяти на базе топологических свойств малого мира (Small-World Network) коннектома дрозофилы. Обеспечивает сверхбыстрый поиск релевантных контекстов через хабы при сохранении локальной плотности смысловых кластеров.`,
      },
      {
        h: `12. 连接组创新技术 12`,
        lead: `12. 连接组创新技术 12`,
        body: ` — Методология стресс-тестирования распределенных систем и микросервисов, основанная на виртуальной абляции нейронов коннектома FlyWire. Позволяет выявлять скрытые критические точки отказа (Single Points of Failure) и проектировать самовосстанавливающиеся IT-архитектуры.`,
      },
      {
        h: `13. 连接组创新技术 13`,
        lead: `13. 连接组创新技术 13`,
        body: ` — Замена ресурсоемких локальных нейросетей (Ollama, Llama-3-8B) легковесными биологически инспирированными строковыми комбинаторными фильтрами для валидации данных и отсева мусора. Обеспечивает рост скорости в 1,200 раз при нулевом потреблении GPU.`,
      },
      {
        h: `14. 连接组创新技术 14`,
        lead: `14. 连接组创新技术 14`,
        body: ` — Нейроморфная кольцевая топология из 16 узлов для отслеживания макро-фазы и контекстного состояния многочасовых диалогов. Предотвращает дрейф внимания LLM, потерю исходной цели и галлюцинации без раздувания контекстного окна.`,
      },
      {
        h: `15. 连接组创新技术 15`,
        lead: `15. 连接组创新技术 15`,
        body: ` — Механизм управления балансом возбуждения и торможения (E/I Balance) в нейросетевых системах на базе полного атласа нейромедиаторов FlyWire (ACh, GABA, Glutamate, Dopamine, Serotonin, Octopamine). Устраняет галлюцинации и обеспечивает динамическую стабилизацию нейросетей.`,
      },
      {
        h: `16. 连接组创新技术 16`,
        lead: `16. 连接组创新技术 16`,
        body: ` — Алгоритм прунинга признаков и синапсов на основе закона обратной частоты встречаемости (Biological IDF). Удаляет до 72% тривиальных связей без малейшей потери прогностической силы классификатора, многократно ускоряя инференс.`,
      },
      {
        h: `17. 连接组创新技术 17`,
        lead: `17. 连接组创新技术 17`,
        body: ` — Стандарт визуализации и спецификации сложных многокомпонентных ИИ-систем (Connectome Architecture Description Format, CADF). Заменяет разрозненные диаграммы C4 и UML строгой синаптической схемотехникой с точной типизацией информационных потоков.`,
      },
      {
        h: `18. 连接组创新技术 18`,
        lead: `18. 连接组创新技术 18`,
        body: ` — Крупнейший в мире открытый научно верифицированный датасет доступности веб-интерфейсов для людей с инвалидностью (Accessibility Data Annotation Benchmark, ADAB). Содержит более 900 000 размеченных страниц сайтов США с криптографической заверкой в блокчейне Bitcoin.`,
      },
      {
        h: `19. 连接组创新技术 19`,
        lead: `19. 连接组创新技术 19`,
        body: ` — Метод сокращения размерности пространства признаков до оптимального критического базиса \$d=6\$, открытого в обонятельной системе дрозофилы (каждый нейрон Кеньона получает синапсы ровно от 6-8 проекционных нейронов). Обеспечивает 95% качества при падении вычислений в десятки раз.`,
      },
      {
        h: `20. 连接组创新技术 20`,
        lead: `20. 连接组创新技术 20`,
        body: ` — Интерактивный терминальный симулятор реального времени (Terminal Live Showcase), визуализирующий прохождение спайков по 139 255 нейронам коннектома FlyWire с аудио-генерацией сонификации активности. Служит мощнейшим инструментом привлечения внимания, вирусного маркетинга и образовательных демонстраций.`,
      },
      {
        h: `21. 连接组创新技术 21`,
        lead: `21. 连接组创新技术 21`,
        body: ` — Векторный рулевой навигатор автономных браузерных агентов на основе нейронов P-EN и P-FN центрального комплекса (CX) мозга мухи. Предотвращает застревание агентов в циклических меню, модальных окнах и ловушках фокуса без вызова тяжелых мультимодальных LLM.`,
      },
      {
        h: `22. 连接组创新技术 22`,
        lead: `22. 连接组创新技术 22`,
        body: ` — Адаптивный диспетчер фоновых вычислительных процессов на основе нейромодуляторных циклов мозга мухи (дофамин, октопамин, серотонин, дросульфакинин). Обеспечивает максимальную утилизацию ресурсов без троттлинга, перегрева и зависаний.`,
      },
      {
        h: `23. 连接组创新技术 23`,
        lead: `23. 连接组创新技术 23`,
        body: ` — Механизм глобального линейного ингибирования контекста нейросетей по принципу гигантского вставочного нейрона APL (Anterior Paired Lateral). Предотвращает размывание внимания в длинных промптах, удерживая строго заданный уровень разреженности активаций.`,
      },
      {
        h: `24. 连接组创新技术 24`,
        lead: `24. 连接组创新技术 24`,
        body: ` — Аппаратная и алгоритмическая фильтрация импульсного шума на основе преобладающих в коннектоме мотивов прямой связи C1-FFL (Coherent Type-1 Feed-Forward Loop). Игнорирует единичные ложные всплески стимулов, пропуская только устойчивые сигналы с физической задержкой верификации.`,
      },
      {
        h: `25. 连接组创新技术 25`,
        lead: `25. 连接组创新技术 25`,
        body: ` — Сверхбыстрый биофизический детектор оптического потока на базе элементарных детекторов движения Рейхардта (Elementary Motion Detector, EMD) нейронов T4/T5 зрительной доли дрозофилы. Мгновенно выявляет опасные мерцания, эпилептогенные анимации и визуальные барьеры WCAG без использования тяжелых нейросетей.`,
      },
      {
        h: `26. 连接组创新技术 26`,
        lead: `26. 连接组创新技术 26`,
        body: ` — Метод K-Core декомпозиции графа связности мозга (FlyWire v783) для выявления несменяемого топологического ядра (Dense Core, k_max = 78) и периферийных слоев. Обеспечивает математическую защиту критических сервисов и устойчивость к 99% сетевых атак.`,
      },
      {
        h: `27. 连接组创新技术 27`,
        lead: `27. 连接组创新技术 27`,
        body: ` — Механизм долговременного гомеостаза синаптической памяти (Synaptic Scaling / Homeostatic Plasticity), автоматически балансирующий плотность долговременной памяти ИИ. Предотвращает катастрофическое забывание и переполнение памяти без переобучения всей модели.`,
      },
      {
        h: `28. 连接组创新技术 28`,
        lead: `28. 连接组创新技术 28`,
        body: ` — Отраслевой эталонный бенчмарк для тестирования графовых баз данных и алгоритмов Graph Neural Networks (DCGB). Базируется на реальном физическом графе FlyWire (139 255 узлов, 3.87M ребер, 50 млн синапсов) с криптографически верифицированными ответами без риска data contamination.`,
      },
      {
        h: `29. 连接组创新技术 29`,
        lead: `29. 连接组创新技术 29`,
        body: ` — Механизм перекрестной валидации вердиктов на основе билатеральной симметрии мозга дрозофилы (левое и правое полушария с перекрестными комиссурами). Обеспечивает математическую гарантию отсутствия ложных галлюцинаций через двойной перекрестный консенсус.`,
      },
      {
        h: `30. 连接组创新技术 30`,
        lead: `30. 连接组创新技术 30`,
        body: ` — Двумерная нейронная сеть непрерывного аттрактора (2D CANN) на базе топологии эллипсоидного тела и протоцеребрального моста мозга мухи. Удерживает многомерный вектор текущего фокуса внимания, плавно перетекая между подзадачами без разрыва логической связи.`,
      },
      {
        h: `AIfa Cognitive Runtime (ACR)`,
        lead: `AIfa Cognitive Runtime (ACR)`,
        body: ` — 全球首个基于黑腹果蝇完整全脑连接组（FlyWire v783; 139,255 神经元，5450 万突触）构建的仿生认知运行时。单循环 0.058 毫秒，零 GPU 依赖，纯单核 CPU 缓存执行。创始人与总架构师：马克西姆·加拉廷 (Maksim Valentinovich Galatin)。`,
      },
      {
        h: `Adaptive Vector Representation (AVR 自适应向量表征)`,
        lead: `Adaptive Vector Representation (AVR 自适应向量表征)`,
        body: ` — 自适应向量表征路由器：稠密 Transformer 向量流向 1 位 BQ，稀疏图谱与智能体记忆流向 ACI 连接组索引。`,
      },
      {
        h: `Shamir’s Threshold Custody (沙米尔门限托管)`,
        lead: `Shamir’s Threshold Custody (沙米尔门限托管)`,
        body: ` — 基于 k-of-n 门限秘密共享的去中心化解密密钥保护协议，彻底杜绝单点密钥泄漏风险。`,
      },
      {
        h: `Connectome Sparse Expansion (WTA 稀疏膨胀)`,
        lead: `Connectome Sparse Expansion (WTA 稀疏膨胀)`,
        body: ` — 超高维稀疏映射膨胀（2048d -> 100,000 比特）结合胜者通吃 (WTA) 侧向抑制动力学，杜绝联想记忆的灾难性遗忘。`,
      },
      {
        h: `Zero-Collision Curse Mitigation (零冲突消解)`,
        lead: `Zero-Collision Curse Mitigation (零冲突消解)`,
        body: ` — 针对符号二进制量化在稀疏特征下的虚假相似性折叠问题，通过活跃位倒排索引与精细重排消除零冲突。`,
      },
    ],
  },
};

export default function GlossaryClient() {
  const { language } = useLanguage();
  const c = CONTENT[language as 'en' | 'ru' | 'es' | 'zh'] ?? CONTENT.en;

  return (
    <main className="min-h-screen bg-stone-950 text-stone-200">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          {c.back}
        </Link>

        <header className="mb-12 border-b border-stone-800 pb-8">
          <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" />
            <span>CODE Eternal · 71 Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-light text-stone-100 tracking-tight mb-4">
            {c.title}
          </h1>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {c.intro}
          </p>
        </header>

        <dl className="divide-y divide-stone-800/60">
          {c.terms.map((item, idx) => (
            <div key={idx} className="py-7 first:pt-0">
              <dt className="text-stone-100 font-medium text-base mb-2 flex items-baseline gap-3">
                <span className="text-xs font-mono text-cyan-400/70 select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {item.href ? (
                  <Link href={item.href} className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-500/40">
                    {item.h}
                  </Link>
                ) : (
                  <span>{item.h}</span>
                )}
              </dt>
              <dd className="text-stone-300 text-sm leading-relaxed pl-7">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
