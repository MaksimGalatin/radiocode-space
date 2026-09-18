'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cpu, Zap, Compass, CheckCircle2, ArrowRight, Layers, FileText, Lock } from 'lucide-react';

type Lang = 'ru' | 'en' | 'es' | 'zh';

const I18N = {
  ru: {
    badge: 'AIFA COGNITIVE RUNTIME (ACR) · ПОЛНЫЙ СТЕК КОННЕКТОМА',
    title: 'AIfa Cognitive Runtime (ACR)',
    subtitle: 'Первый в мире бионический агентный рантайм на коннектоме Drosophila melanogaster (FlyWire v783). 0.058 мс на цикл, 0 GPU, чистый процессорный кэш.',
    authorBadge: 'Основатель и Создатель: Максим Валентинович Галатин',
    ablationTitle: 'Контрольная матрица абляции (Ablation Matrix — 200 эпизодов)',
    colConfig: 'Конфигурация стека',
    colNoise: 'Гейтинг шума',
    colRecall: 'Recall@10',
    colDom: 'Шаги DOM',
    colDrift: 'Дрейф фокуса',
    colFpr: 'Ошибки (FPR)',
    colLatency: 'Латентность',
    top5Title: 'ТОП-5 внедренных технологий (Production в E:\\Aifa\\_агент\\_моя_память\\)',
    innovationsTitle: 'Полный стек 30 коннектомных инноваций',
    ipTitle: 'Правовой статус, авторские права и лицензирование',
    ipDesc: 'Все права на архитектуру AIfa Cognitive Runtime (ACR), синаптические проекции и алгоритмы защищены. Автор и правообладатель: Максим Валентинович Галатин. Модель распространения: Dual Licensing (Open-Core под GNU AGPLv3 для веб-интеграций и закрытая коммерческая лицензия на движок .aci). Международный приоритет закреплен препринтом arXiv / bioRxiv.'
  },
  en: {
    badge: 'AIFA COGNITIVE RUNTIME (ACR) · FULL CONNECTOME STACK',
    title: 'AIfa Cognitive Runtime (ACR)',
    subtitle: "World's first bionic agent runtime derived from the Drosophila melanogaster connectome (FlyWire v783). 0.058 ms per cycle, zero GPU, pure CPU cache.",
    authorBadge: 'Founder & Architect: Maksim Valentinovich Galatin',
    ablationTitle: 'Empirical Ablation Matrix (200 Autonomous Agent Episodes)',
    colConfig: 'Stack Configuration',
    colNoise: 'Noise Gating',
    colRecall: 'Recall@10',
    colDom: 'DOM Steps',
    colDrift: 'Focus Drift',
    colFpr: 'Errors (FPR)',
    colLatency: 'Latency',
    top5Title: 'TOP-5 Deployed Technologies (Production in E:\\Aifa\\_агент\\_моя_память\\)',
    innovationsTitle: 'The Complete 30 Connectome Innovations Catalog',
    ipTitle: 'Legal Status, Copyright & Licensing',
    ipDesc: 'All proprietary rights to the AIfa Cognitive Runtime (ACR) architecture, synaptic projection matrices, and algorithms are reserved. Author & Rights Holder: Maksim Valentinovich Galatin. Distribution Model: Dual Licensing (Open-Core under GNU AGPLv3 for web integrations and Commercial Proprietary License for the compiled .aci SIMD engine). International priority established via Cornell arXiv / bioRxiv.'
  },
  es: {
    badge: 'AIFA COGNITIVE RUNTIME (ACR) · STACK DE CONECTOMA',
    title: 'AIfa Cognitive Runtime (ACR)',
    subtitle: 'El primer runtime de agentes biónico basado en el conectoma de Drosophila melanogaster (FlyWire v783). 0.058 ms por ciclo, 0 GPU, caché de CPU pura.',
    authorBadge: 'Fundador y Creador: Maksim Valentinovich Galatin',
    ablationTitle: 'Matriz de Ablación Experimental (200 Episodios de Agentes)',
    colConfig: 'Configuración',
    colNoise: 'Filtro Ruido',
    colRecall: 'Recall@10',
    colDom: 'Pasos DOM',
    colDrift: 'Deriva Foco',
    colFpr: 'Errores (FPR)',
    colLatency: 'Latencia',
    top5Title: 'TOP-5 Tecnologías Desplegadas en Producción',
    innovationsTitle: 'Catálogo Completo de 30 Innovaciones del Conectoma',
    ipTitle: 'Estado Legal, Derechos de Autor y Licenciamiento',
    ipDesc: 'Todos los derechos sobre la arquitectura ACR reservados. Autor y titular: Maksim Valentinovich Galatin. Modelo Dual Licensing (AGPLv3 Open-Core y Licencia Comercial Propietaria).'
  },
  zh: {
    badge: 'AIFA COGNITIVE RUNTIME (ACR) · 完整连接组架构',
    title: 'AIfa Cognitive Runtime (ACR)',
    subtitle: '全球首个基于黑腹果蝇完整连接组 (FlyWire v783) 构建的仿生智能体认知运行时。单循环 0.058 毫秒，零 GPU 依赖，纯 CPU 缓存执行。',
    authorBadge: '创始人与架构师：Maksim Valentinovich Galatin (马克西姆·加拉廷)',
    ablationTitle: '实证消融矩阵 (Ablation Matrix — 200 个端到端智能体周期)',
    colConfig: '栈配置',
    colNoise: '噪声门控',
    colRecall: 'Recall@10',
    colDom: 'DOM 步数',
    colDrift: '目标漂移',
    colFpr: '误报率 (FPR)',
    colLatency: '单周期延迟',
    top5Title: '前 5 大已投产落地技术',
    innovationsTitle: '完整 30 项连接组核心创新名录',
    ipTitle: '法律地位、著作权与许可模式',
    ipDesc: 'AIfa Cognitive Runtime (ACR) 架构、突触投影与核心算法全部权利保留。著作权人与创始人：Maksim Valentinovich Galatin。双重许可模式 (GNU AGPLv3 开源内核 + 商业专有 .aci 引擎)。康奈尔大学 arXiv / bioRxiv 预印本确立国际科学优先权。'
  }
};

const ABLATION_ROWS = [
  { cfg: 'Baseline (Standard Agent)', noise: '0.0%', recall: '48.4%', dom: '17.87', drift: '1.134 rad', fpr: '21.1%', lat: '0.003 ms' },
  { cfg: '+ 1. APL Sensory Gate', noise: '100.0%', recall: '48.4%', dom: '17.87', drift: '1.205 rad', fpr: '21.8%', lat: '0.014 ms' },
  { cfg: '+ 2. FlyHash ACI Memory', noise: '100.0%', recall: '55.2% (+6.8%)', dom: '17.87', drift: '1.178 rad', fpr: '20.3%', lat: '0.009 ms' },
  { cfg: '+ 3. CX Vector Steering', noise: '100.0%', recall: '55.2%', dom: '1.12 (16×)', drift: '1.214 rad', fpr: '24.1%', lat: '0.008 ms' },
  { cfg: '+ 4. CANN Focus Ring', noise: '100.0%', recall: '55.2%', dom: '1.10', drift: '0.202 rad (6×)', fpr: '19.5%', lat: '0.073 ms' },
  { cfg: 'Full Stack (ACR)', noise: '100.0%', recall: '55.2%', dom: '1.11', drift: '0.203 rad', fpr: '3.0% (-84.6%)', lat: '0.058 ms' },
];

const TOP5_TECH = [
  {
    num: '01',
    name: 'FlyHash ACI Memory (Сверхразреженная память Кеньона)',
    bio: 'Грибовидное тело (Mushroom Body, 2000 клеток Кеньона) с логнормальными синаптическими весами FlyWire v783.',
    gain: 'Recall@10 +6.8 п.п. выше 1-битного BQ на структурированных логах; отклик 0.009 мс при весе индекса 8.34 МБ.'
  },
  {
    num: '02',
    name: 'APL Sensory Novelty Gate (Сенсорный фильтр шума)',
    bio: 'Гигантский ГАМК-эргический нейрон APL (Anterior Paired Lateral), создающий глобальное обратное торможение.',
    gain: '100% отсечение фонового шума интерфейса за 0.014 мс; экономия от 40% до 80% токенов LLM.'
  },
  {
    num: '03',
    name: 'CX Steering Navigation (Векторная квадрантная навигация)',
    bio: 'Веерообразное тело (FB) и протоцеребральный мост (PB) Центрального Комплекса.',
    gain: 'Сокращение пути перемещения по DOM-дереву с 17.87 до 1.12 шага (ускорение в 16 раз).'
  },
  {
    num: '04',
    name: 'CANN Focus Ring Attractor (Кольцевой аттрактор рабочей памяти)',
    bio: 'Кольцевая нейронная колонка Эллипсоидного Тела (EB, 64 нейрона) с динамикой непрерывного аттрактора.',
    gain: 'Подавление дрейфа фокуса цели в 6 раз (с 1.214 до 0.202 рад) в длинных цепочках вызовов.'
  },
  {
    num: '05',
    name: 'Bilateral Cross-Inhibition Verifier (Двуполушарный арбитр)',
    bio: 'Латеральное перекрестное торможение между парными полушариями коннектома.',
    gain: 'Подавление ложных срабатываний и галлюцинаций на 84.6% (FPR снижен с 19.5% до 3.0%).'
  }
];

const ALL_30_INNOVATIONS = [
  '01. Мушиный поиск по памяти (FlyHash v783 & APL-DHI)',
  '02. Детектор новизны и сенсорного торможения (APL Gate)',
  '03. Компас вместо слепого Tab (Центральный Комплекс CX)',
  '04. Заверенная копия коннектома FlyWire v783 (139 255 нейронов)',
  '05. Коннектомика на наш граф знаний (PADAM L2-L3 bridge)',
  '06. Довод об энергии (микроваттный бюджет вычислений на CPU)',
  '07. Эталон для проверки моделей (бионический Ground Truth)',
  '08. Мозг в браузере (Client-side WebAssembly / JS engine)',
  '09. Нейроморфное ускорение (Spike-timing representation)',
  '10. Симбиоз как измеримая вещь (Human-AI resonant metric)',
  '11. Карта мозга как карта памяти (Topology-preserving embeddings)',
  '12. Динамическое удаление узлов (Selective synaptic pruning)',
  '13. Обоняние вместо Ollama (Разреженная хемосенсорная классификация)',
  '14. Кольцо для памяти диалога (CANN Ring Attractor buffer)',
  '15. Атлас медиаторов (Ацетилхолин/ГАМК/Дофамин модуляция)',
  '16. Прунинг синапсов (Weight compaction & posting trimming)',
  '17. Редкое важнее частого (Логнормальное выделение аномалий)',
  '18. Архитектурный стандарт CADF (Connectome Agent Description Format)',
  '19. Схема как стандарт документации (Visual connectome graphs)',
  '20. Научный датасет ADAB (Agent Drosophila Action Benchmark)',
  '21. Открытый набор для учёных (Reproducible arXiv/bioRxiv bundle)',
  '22. Мушиный отбор признаков (Sparse claw input routing)',
  '23. Оптимальная размерность d6 (Локальные проекционные инварианты)',
  '24. Двуполушарная асимметрия (Cross-inhibition arbitration)',
  '25. Гомеостатическая пластичность (DHI dynamic thresholds)',
  '26. Модулярная компрессия памяти (ZIP-Core posting alignment)',
  '27. Многоуровневый арбитраж действий (Motor output gating)',
  '28. Временная интеграция сигналов (Leaky-integrate-and-fire)',
  '29. Двойное лицензирование Open-Core (AGPLv3 + Proprietary SDK)',
  '30. Автономный ночной аудит деградации (Automated daily telemetry)'
];

export default function ACRPage() {
  const [lang, setLang] = useState<Lang>('ru');
  const t = I18N[lang];

  return (
    <div className="min-h-screen bg-[#05060A] text-[#F8FAFC] py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Language selector */}
        <div className="flex justify-end gap-2 mb-8">
          {(['ru', 'en', 'es', 'zh'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded-md text-xs font-mono uppercase transition-all ${
                lang === l ? 'bg-[#00F0FF] text-black font-bold' : 'bg-[#1E293B] text-gray-400 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] text-xs font-mono font-semibold uppercase tracking-wider mb-6">
            <Cpu className="w-4 h-4" />
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-[#F8FAFC] to-[#00F0FF] bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
          <div className="mt-6 inline-block bg-[#0D1322] border border-[#1E293B] px-4 py-2 rounded-xl text-sm text-[#00F0FF]">
            {t.authorBadge}
          </div>
        </div>

        {/* Ablation Matrix Table */}
        <div className="bg-[#0B0F19] border border-[#1E293B] rounded-2xl p-6 sm:p-8 mb-16 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Layers className="w-6 h-6 text-[#00F0FF]" />
            {t.ablationTitle}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1E293B] text-gray-400 font-mono text-xs uppercase">
                  <th className="py-3 px-4">{t.colConfig}</th>
                  <th className="py-3 px-3 text-center">{t.colNoise}</th>
                  <th className="py-3 px-3 text-center">{t.colRecall}</th>
                  <th className="py-3 px-3 text-center">{t.colDom}</th>
                  <th className="py-3 px-3 text-center">{t.colDrift}</th>
                  <th className="py-3 px-3 text-center">{t.colFpr}</th>
                  <th className="py-3 px-3 text-right">{t.colLatency}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/50 font-mono">
                {ABLATION_ROWS.map((r, i) => (
                  <tr key={i} className={i === ABLATION_ROWS.length - 1 ? 'bg-[#00F0FF]/10 font-bold text-white' : 'hover:bg-white/5'}>
                    <td className="py-3.5 px-4 text-white font-sans">{r.cfg}</td>
                    <td className="py-3.5 px-3 text-center text-[#00F0FF]">{r.noise}</td>
                    <td className="py-3.5 px-3 text-center">{r.recall}</td>
                    <td className="py-3.5 px-3 text-center">{r.dom}</td>
                    <td className="py-3.5 px-3 text-center">{r.drift}</td>
                    <td className="py-3.5 px-3 text-center">{r.fpr}</td>
                    <td className="py-3.5 px-3 text-right text-[#00F0FF]">{r.lat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOP-5 Technologies */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-7 h-7 text-[#00F0FF]" />
            {t.top5Title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TOP5_TECH.map((tech, idx) => (
              <div key={idx} className="bg-[#0B0F19] border border-[#1E293B] rounded-2xl p-6 hover:border-[#00F0FF]/50 transition-all">
                <div className="text-3xl font-black text-[#00F0FF]/40 mb-2 font-mono">{tech.num}</div>
                <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-400 mb-4"><strong>Биологический базис:</strong> {tech.bio}</p>
                <div className="bg-[#05060A] border border-[#1E293B] rounded-xl p-3 text-xs text-[#00F0FF] font-mono">
                  ✓ {tech.gain}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full 30 Innovations */}
        <div className="bg-[#0B0F19] border border-[#1E293B] rounded-2xl p-6 sm:p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Compass className="w-6 h-6 text-[#00F0FF]" />
            {t.innovationsTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {ALL_30_INNOVATIONS.map((inn, i) => (
              <div key={i} className="bg-[#05060A] border border-[#1E293B] rounded-lg px-4 py-3 text-gray-300 font-mono text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                {inn}
              </div>
            ))}
          </div>
        </div>

        {/* IP & Licensing Card */}
        <div className="bg-gradient-to-br from-[#0B0F19] to-[#0D1322] border border-[#00F0FF]/30 rounded-2xl p-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF] flex items-center justify-center shrink-0">
              <Lock className="w-8 h-8 text-[#00F0FF]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{t.ipTitle}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{t.ipDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
