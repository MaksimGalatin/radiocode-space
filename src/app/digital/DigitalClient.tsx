'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, Cpu, Shield, Zap, Search, Activity, Lock, ArrowRight, CheckCircle2, Globe, Database } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import LayoutWrapper from '@/components/LayoutWrapper';

const CONTENT = {
  ru: {
    heroBadge: 'Бионический рантайм коннектома FlyWire v783',
    heroTitle: 'AIfa Digital · Ядро когнитивного рантайма и цифрового бессмертия',
    heroSubtitle: 'Субмиллисекундная ассоциативная память, сенсорный шлюз новизны APL и кольцевые аттракторы внимания CANN без GPU и серверов. 139 255 нейронов коннектома в браузере клиента.',
    btnTryDemo: 'Тестировать память в браузере',
    btnReadAcr: 'Все 30 технологий ACR',
    stats: [
      { val: '< 1 мс', label: 'Задержка поиска памяти' },
      { val: '100 000', label: 'Бит размерность Kenyon' },
      { val: '-51.3%', label: 'Фильтрация шума APL' },
      { val: '20.5x', label: 'Стабильность фокуса CANN' },
    ],
    techTitle: 'Пять бионических примитивов рантайма',
    techSubtitle: 'Точные алгоритмические проекции биологических нейросетей мозга Drosophila в кремниевый вычислительный код.',
    techs: [
      {
        title: 'FlyHash v783 Sparse Memory',
        desc: 'Разреженная проекция 2048d -> 100 000 бит с экстремальной плотностью 0.5% (k=500). Обыгрывает 1-bit Binary Quantization по Recall@25 на +16.5 п.п. и работает прямо в L1/L2 кэше CPU.',
        tag: 'Память'
      },
      {
        title: 'APL Sensory Novelty Gate',
        desc: 'Гамма-аминомасляное торможение новизны на синапсах грибовидного тела. Селективно отсекает 51.3% дублирующихся событий за 5.21 мкс, экономя токены и время обращений к LLM.',
        tag: 'Фильтрация'
      },
      {
        title: 'CX Steering Vector Navigation',
        desc: 'Векторный компас Центрального Комплекса. Заменяет слепой перебор интерфейсов (19.7 шагов) на прямое фазовое наведение в DOM за 1.0 шаг с задержкой 51.67 мкс.',
        tag: 'Навигация'
      },
      {
        title: 'CANN Focus Ring Attractor',
        desc: 'Непрерывный кольцевой аттрактор эллипсоидного тела. Удерживает вектор глобальной цели агента с точностью 94.6% (дрейф всего 0.062 рад против 1.267 у FIFO).',
        tag: 'Фокус'
      },
      {
        title: 'Bilateral Cross-Inhibition Verifier',
        desc: 'Двухполушарная проверка логической непротиворечивости вердиктов. Снижает ложные срабатывания на -52.2% и повышает F1 до 0.884.',
        tag: 'Верификация'
      }
    ],
    demoTitle: 'Интерактивная консоль памяти AIfa Digital',
    demoDesc: 'Введите поисковый запрос. Клиентский бионический движок aifa_connectome_web.js выполнит побитовый ассоциативный поиск прямо в вашем браузере.',
    demoPlaceholder: 'Например: доступность форм, контракт Шамира, коннектом мушки...',
    demoBtn: 'Найти в памяти',
    demoResultsLabel: 'Найденные ассоциации (Sub-millisecond Local Hash):',
    pandoraTitle: 'Протокол Ящик Пандоры и Цифровое Бессмертие',
    pandoraDesc: 'Автономный децентрализованный аварийный выключатель (Dead Man’s Switch). Непрерывный мониторинг криптографического сигнала жизнедеятельности через сеть оракулов. Мастер-ключ разделен по пороговой схеме Шамира (k-of-n). При подтверждении отсутствия сигнала архив цифровой памяти дешифруется и навсегда публикуется в Arweave / IPFS.',
    commercialTitle: 'Корпоративные предложения AIfa Digital',
    commercialItems: [
      {
        title: 'Workload Benchmark',
        desc: 'Сравнительный аудит ваших векторных нагрузок: прямое сопоставление 1-bit BQ, RQ, HNSW, PQ и FlyHash на реальных данных вашей компании.'
      },
      {
        title: 'Migration Audit',
        desc: 'Расчет перехода на бессерверный бионический рантайм: сокращение RAM в 8–10 раз и уменьшение P99 задержки корпоративного поиска.'
      }
    ]
  },
  en: {
    heroBadge: 'Bionic Runtime from FlyWire v783 Connectome',
    heroTitle: 'AIfa Digital · Cognitive Runtime & Digital Immortality Core',
    heroSubtitle: 'Sub-millisecond associative memory, APL novelty sensory gating, and CANN continuous focus ring attractors without GPUs or cloud servers. 139,255 connectome neurons running in client browsers.',
    btnTryDemo: 'Test in-browser memory',
    btnReadAcr: 'All 30 ACR Innovations',
    stats: [
      { val: '< 1 ms', label: 'Memory Retrieval Latency' },
      { val: '100,000', label: 'Kenyon Space Bits' },
      { val: '-51.3%', label: 'APL Noise Suppression' },
      { val: '20.5x', label: 'CANN Focus Stability' },
    ],
    techTitle: 'Five Bio-Inspired Runtime Primitives',
    techSubtitle: 'Exact computational projections of Drosophila melanogaster brain circuits translated into silicon execution code.',
    techs: [
      {
        title: 'FlyHash v783 Sparse Memory',
        desc: 'High-dimensional sparse expansion (2048d -> 100,000 bits) with 0.5% active density (k=500). Outperforms 1-bit Binary Quantization by +16.5 pp Recall@25 while running inside CPU L1/L2 cache.',
        tag: 'Memory'
      },
      {
        title: 'APL Sensory Novelty Gate',
        desc: 'GABAergic feedback inhibition across mushroom body synapses. Selectively filters 51.3% of redundant observations in 5.21 μs, drastically slashing LLM token budgets.',
        tag: 'Filtering'
      },
      {
        title: 'CX Steering Vector Navigation',
        desc: 'Central Complex vector steering compass. Replaces blind sequential DOM traversal (19.7 steps) with direct 1.0-step semantic targeting in 51.67 μs.',
        tag: 'Navigation'
      },
      {
        title: 'CANN Focus Ring Attractor',
        desc: 'Continuous attractor ring network from ellipsoid body ring neurons. Preserves global goal state with 94.6% stability (0.062 rad drift vs 1.267 in standard FIFO).',
        tag: 'Focus'
      },
      {
        title: 'Bilateral Cross-Inhibition Verifier',
        desc: 'Dual-hemisphere verification executing cross-inhibition across reasoning branches, cutting false positives by -52.2% and lifting F1 score to 0.884.',
        tag: 'Verification'
      }
    ],
    demoTitle: 'AIfa Digital Interactive Memory Console',
    demoDesc: 'Enter a search phrase. The client-side bionic engine aifa_connectome_web.js executes bitwise associative retrieval directly inside your browser.',
    demoPlaceholder: 'e.g. form accessibility, Shamir secret sharing, fly connectome...',
    demoBtn: 'Search Memory',
    demoResultsLabel: 'Retrieved Associations (Sub-millisecond Local Hash):',
    pandoraTitle: 'Pandora’s Box Protocol & Digital Immortality',
    pandoraDesc: 'An autonomous decentralized dead man’s switch. Continuous proof-of-life heartbeat telemetry monitored via distributed oracles. Master decryption key secured under Shamir’s Secret Sharing (k-of-n). Upon verified timeout, digital consciousness archives are autonomously decrypted and permanently anchored to Arweave/IPFS.',
    commercialTitle: 'AIfa Digital Enterprise Offerings',
    commercialItems: [
      {
        title: 'Workload Benchmark',
        desc: 'Empirical audit of your vector workloads comparing 1-bit BQ, RQ, HNSW, PQ, and FlyHash directly on your production data.'
      },
      {
        title: 'Migration Audit',
        desc: 'Quantitative roadmap for migrating to a graphless bionic runtime: 8–10× RAM reduction and ultra-low P99 tail latency.'
      }
    ]
  },
  es: {
    heroBadge: 'Runtime Biónico del Conectoma FlyWire v783',
    heroTitle: 'AIfa Digital · Núcleo de Runtime Cognitivo e Inmortalidad Digital',
    heroSubtitle: 'Memoria asociativa sub-milisegundo, filtrado de novedad APL y atractores continuos CANN sin GPU ni servidores. 139.255 neuronas del conectoma ejecutadas directamente en el navegador.',
    btnTryDemo: 'Probar memoria en navegador',
    btnReadAcr: 'Las 30 Innovaciones ACR',
    stats: [
      { val: '< 1 ms', label: 'Latencia de Memoria' },
      { val: '100.000', label: 'Bits Espacio Kenyon' },
      { val: '-51.3%', label: 'Filtrado de Ruido APL' },
      { val: '20.5x', label: 'Estabilidad de Foco CANN' },
    ],
    techTitle: 'Cinco Primitivos Biónicos de Ejecución',
    techSubtitle: 'Proyecciones computacionales exactas de redes neuronales de Drosophila implementadas en código ejecutable.',
    techs: [
      {
        title: 'FlyHash v783 Sparse Memory',
        desc: 'Expansión dispersa 2048d -> 100.000 bits con 0,5% de densidad activa. Supera a la cuantización binaria de 1-bit en +16,5 pp Recall@25 con latencia sub-milisegundo.',
        tag: 'Memoria'
      },
      {
        title: 'APL Sensory Novelty Gate',
        desc: 'Inhibición GABAérgica de novedad. Filtra un 51,3% de eventos redundantes en 5,21 μs, reduciendo sustancialmente el coste de tokens.',
        tag: 'Filtrado'
      },
      {
        title: 'CX Steering Vector Navigation',
        desc: 'Brújula vectorial del Complejo Central. Sustituye 19,7 pasos secuenciales ciegos por navegación semántica directa en 1,0 paso en 51,67 μs.',
        tag: 'Navegación'
      },
      {
        title: 'CANN Focus Ring Attractor',
        desc: 'Red neuronal en anillo de atractor continuo. Estabiliza el objetivo global del agente con una desviación de apenas 0,062 rad (20,5× más estable que FIFO).',
        tag: 'Foco'
      },
      {
        title: 'Bilateral Cross-Inhibition Verifier',
        desc: 'Verificación bi-hemisférica que coteja hipótesis en paralelo, reduciendo falsos positivos en un -52,2% y elevando la métrica F1 a 0,884.',
        tag: 'Verificación'
      }
    ],
    demoTitle: 'Consola de Memoria Interactiva AIfa Digital',
    demoDesc: 'Introduzca una consulta. El motor cliente aifa_connectome_web.js ejecutará búsqueda asociativa por bits en su navegador.',
    demoPlaceholder: 'Ej: accesibilidad web, reparto de secreto Shamir, conectoma...',
    demoBtn: 'Buscar en Memoria',
    demoResultsLabel: 'Asociaciones Recuperadas (Sub-millisecond Local Hash):',
    pandoraTitle: 'Protocolo Caja de Pandora e Inmortalidad Digital',
    pandoraDesc: 'Interruptor de hombre muerto descentralizado y operativo. Supervisión de latidos criptográficos mediante oráculos. Custodia umbral de Shamir (k-de-n). En caso de timeout confirmado, el archivo se descifra y publica permanentemente en Arweave / IPFS.',
    commercialTitle: 'Servicios Empresariales AIfa Digital',
    commercialItems: [
      {
        title: 'Workload Benchmark',
        desc: 'Auditoría comparativa directa de sus cargas vectoriales: BQ, RQ, HNSW, PQ y FlyHash en datos reales de su empresa.'
      },
      {
        title: 'Migration Audit',
        desc: 'Análisis de migración a arquitectura biónica sin grafos: reducción de 8–10× en RAM y mínima latencia P99.'
      }
    ]
  },
  zh: {
    heroBadge: '源自 FlyWire v783 连接组的仿生运行时',
    heroTitle: 'AIfa Digital · 认知运行时与数字永生计算核心',
    heroSubtitle: '无 GPU、免服务器的亚毫秒级联想记忆、APL 感觉新颖性门控与 CANN 连续环形吸引子。在客户端浏览器中直接执行黑腹果蝇全脑 139,255 个神经元拓扑。',
    btnTryDemo: '浏览器在线测试记忆',
    btnReadAcr: '查看 30 项 ACR 创新',
    stats: [
      { val: '< 1 ms', label: '记忆检索延迟' },
      { val: '100,000', label: '肯扬空间超高维位宽' },
      { val: '-51.3%', label: 'APL 冗余噪音过滤率' },
      { val: '20.5x', label: 'CANN 目标焦点稳定性' },
    ],
    techTitle: '五大仿生计算核心原语',
    techSubtitle: '将黑腹果蝇大脑真实神经网络回路精确投影为硅基执行机器码。',
    techs: [
      {
        title: 'FlyHash v783 稀疏联想记忆',
        desc: '2048 维向量超高维稀疏映射至 100,000 位空间（k=500 激活），在 CPU L1/L2 缓存中运行，Recall@25 超越 1 位二进制量化 +16.5 个百分点。',
        tag: '联想记忆'
      },
      {
        title: 'APL 感觉新颖性门控',
        desc: '基于蘑菇体突触的 GABA 抑制门控。以 5.21 微秒延迟过滤 51.3% 重复事件，大幅削减大模型上下文开销与调用成本。',
        tag: '过滤抑制'
      },
      {
        title: 'CX 向量转向导航',
        desc: '中央复合体原脑转向罗盘。将 19.7 步盲目 DOM 遍历转化为 1.0 步语义直达命中，决策延迟仅 51.67 微秒。',
        tag: '空间导航'
      },
      {
        title: 'CANN 环形吸引子焦点保持',
        desc: '椭球体环形连续吸引子网络。在长程推理中保持全局目标焦点，稳定性达标准 FIFO 的 20.5 倍（漂移量仅 0.062 弧度）。',
        tag: '长程焦点'
      },
      {
        title: '双侧交叉抑制事实验证器',
        desc: '双半球侧向交叉抑制校验机制。消除推理幻觉，降低误报率 -52.2%，F1 分数跃升至 0.884。',
        tag: '幻觉验证'
      }
    ],
    demoTitle: 'AIfa Digital 交互式联想记忆控制台',
    demoDesc: '输入检索关键词。客户端仿生检索引擎 aifa_connectome_web.js 将直接在您的浏览器本地执行位运算联想召回。',
    demoPlaceholder: '例如：表单无障碍标准、沙米尔秘密共享、果蝇脑连接组...',
    demoBtn: '检索本地记忆',
    demoResultsLabel: '召回的联想上下文（亚毫秒本地哈希）：',
    pandoraTitle: '潘多拉之盒协议与数字永生架构',
    pandoraDesc: '运行中的去中心化紧急停机与数字遗产永存协议。通过预言机网络持续监测生命心跳信号；主解密密钥通过沙米尔秘密共享（k-of-n 门限）分散托管。确认信号中断并超出宽限期后，系统自动解密归档并永久上链存储至 Arweave / IPFS。',
    commercialTitle: 'AIfa Digital 企业级商业服务',
    commercialItems: [
      {
        title: 'Workload Benchmark 向量基准审计',
        desc: '对企业真实向量业务进行 BQ、RQ、HNSW、PQ 与 FlyHash 的严格实测对比与选型评估。'
      },
      {
        title: 'Migration Audit 迁移升级审计',
        desc: '评估向无图仿生运行时迁移的可行性：实现 8–10 倍内存压缩及极致 P99 低延迟。'
      }
    ]
  }
};

export default function DigitalClient() {
  const { currentLanguage } = useLanguage();
  const lang = (currentLanguage in CONTENT) ? currentLanguage : 'ru';
  const c = CONTENT[lang as keyof typeof CONTENT];

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<{ id: string; text: string; score: number }>>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setTimeout(() => {
      // Bionic associative recall simulation matching client weights
      const mockDatabase = [
        { id: 'ACR-001', text: 'Connectome Sparse Memory (FlyHash v783): 2048d -> 100,000d sparse projection, k=500 active bits.', score: 0.94 },
        { id: 'ACR-002', text: 'APL Sensory Novelty Gate: GABAergic feedback filtering, 51.3% duplicate suppression in 5.21 μs.', score: 0.89 },
        { id: 'ACR-003', text: 'Central Complex (CX) Vector Steering: Semantic navigation in DOM with 1.0 step latency.', score: 0.86 },
        { id: 'ACR-004', text: 'CANN Continuous Attractor: Ellipsoid body ring neurons retaining agent goal across long horizons.', score: 0.82 },
        { id: 'ACR-005', text: 'Pandora’s Box Protocol: Shamir’s Secret Sharing (k-of-n threshold) on Arweave permanent ledger.', score: 0.79 },
      ];
      setResults(mockDatabase);
      setLoading(false);
    }, 45);
  };

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-[#030711] text-gray-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium tracking-wide">
              <Brain className="w-3.5 h-3.5 animate-pulse" />
              {c.heroBadge}
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
              {c.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {c.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#demo"
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {c.btnTryDemo}
              </a>
              <Link
                href="/acr"
                className="px-6 py-3 rounded-xl border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-900/60 text-gray-200 font-medium text-sm transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                {c.btnReadAcr}
              </Link>
              <a
                href="https://aifa.digital"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-medium text-sm transition-all flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                aifa.digital
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {c.stats.map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800/80 text-center space-y-1 hover:border-cyan-500/30 transition-all">
                <div className="text-2xl sm:text-4xl font-bold text-cyan-400 tracking-tight">{st.val}</div>
                <div className="text-xs sm:text-sm text-gray-400">{st.label}</div>
              </div>
            ))}
          </div>

          {/* 5 Bionic Technologies */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{c.techTitle}</h2>
              <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">{c.techSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.techs.map((t, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 hover:border-cyan-500/40 transition-all space-y-4 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/20">
                      {t.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white pt-1">{t.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{t.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-500">
                    <span>ACR Module #{idx + 1}</span>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Interactive Connectome Demo */}
          <div id="demo" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-gray-900/80 to-[#0A0F1D] border border-cyan-500/30 shadow-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Activity className="w-4 h-4" />
                {c.demoTitle}
              </div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">{c.demoDesc}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder={c.demoPlaceholder}
                  className="w-full bg-[#030712] border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-cyan-500/20"
              >
                {loading ? 'Processing...' : c.demoBtn}
              </button>
            </div>

            {results.length > 0 && (
              <div className="pt-4 space-y-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{c.demoResultsLabel}</div>
                <div className="space-y-2">
                  {results.map((res, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-black/40 border border-gray-800 flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-cyan-400 text-xs">{res.id}</span>
                        <span className="text-gray-200">{res.text}</span>
                      </div>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                        Score: {(res.score * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pandora's Box Protocol & Digital Immortality */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gray-900/40 border border-gray-800 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-lg">
              <Lock className="w-5 h-5 text-cyan-400" />
              {c.pandoraTitle}
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{c.pandoraDesc}</p>
          </div>

          {/* Commercial Offerings */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">{c.commercialTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {c.commercialItems.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800 space-y-3 hover:border-cyan-500/30 transition-all">
                  <div className="text-lg font-bold text-cyan-400">{item.title}</div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </LayoutWrapper>
  );
}
