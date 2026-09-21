// ==============================================================================
// AIfa-BioBench: Клиентский поиск (Карточка #8)
// Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
// Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
// Licensed under the Apache License, Version 2.0
//
// 21.09.2026: карточка #8 заявляет "Wasm SIMD128, 126.7 КБ бинарник" и
// "клиентское сканирование popcount с SIMD128". Прямая проверка файла,
// на который ссылается deploy (public/aifa_connectome_web.js):
//   - размер файла 7 121 байт, а не 126 700 (заявлено в ~18 раз больше)
//   - файл ЧИСТЫЙ JavaScript, ни одного байта WebAssembly, ни одной
//     SIMD-инструкции — собственный комментарий в файле честно говорит
//     "pure JavaScript / TypedArrays", а карточка это противоречие не
//     замечает и заявляет обратное
//   - алгоритм — не popcount по битовым хешам, а обратный индекс
//     (posting lists) с активацией Kenyon Cell и подсчётом Jaccard
//
// Это не находка "число неверно" — это находка "технология неверна".
// Честно измеряю РЕАЛЬНЫЙ алгоритм этого файла в реальном движке
// (Node.js V8 — тот же JS-движок, что в Chrome/браузере, поэтому
// замер валиден для клиентского исполнения), без переписывания логики.
// ==============================================================================

import { AIfaConnectomeWeb } from "../public/aifa_connectome_web.js";
import { writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function makeSyntheticDoc(id, rng) {
  const words = [];
  const vocab = ["connectome", "drosophila", "neuron", "synapse", "memory", "vector",
                 "search", "bionic", "hash", "sparse", "kenyon", "mushroom", "body",
                 "grid", "cell", "signal", "network", "graph", "index", "query"];
  const n = 15 + Math.floor(rng() * 30);
  for (let i = 0; i < n; i++) {
    words.push(vocab[Math.floor(rng() * vocab.length)]);
  }
  return { id, text: words.join(" ") };
}

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function run() {
  const rng = mulberry32(42);
  const N_DOCS = 500;

  const engine = new AIfaConnectomeWeb(8192, 16384, 0.035, 20260917);

  // Индексация: строим postings из документов, используя те же
  // computeHash/tokenize, что и в реальном движке.
  const docs = [];
  const postingsBuild = new Array(engine.kcCells);
  for (let i = 0; i < engine.kcCells; i++) postingsBuild[i] = [];

  for (let i = 0; i < N_DOCS; i++) {
    const d = makeSyntheticDoc(i, rng);
    const tokens = engine.tokenize(d.text);
    const activeKc = engine.computeHash(tokens);
    for (const kc of activeKc) postingsBuild[kc].push(i);
    docs.push({
      external_id: `doc_${i}`,
      snippet: d.text.slice(0, 60),
      metadata: {},
      active_kc_count: activeKc.length,
    });
  }
  engine.documents = docs;
  for (let i = 0; i < engine.kcCells; i++) {
    engine.postings[i] = new Uint32Array(postingsBuild[i]);
  }

  // Честный замер latency поиска: N_QUERIES запросов, реальный вызов search()
  const N_QUERIES = 200;
  const queries = [];
  for (let i = 0; i < N_QUERIES; i++) {
    queries.push(makeSyntheticDoc(1000 + i, rng).text);
  }

  const latencies = [];
  for (const q of queries) {
    const t0 = process.hrtime.bigint();
    engine.search(q, 10);
    const t1 = process.hrtime.bigint();
    latencies.push(Number(t1 - t0) / 1000.0); // наносекунды -> микросекунды
  }
  latencies.sort((a, b) => a - b);

  const percentile = (arr, p) => arr[Math.min(arr.length - 1, Math.floor(arr.length * p))];

  const fileStatsPath = fileURLToPath(new URL("../public/aifa_connectome_web.js", import.meta.url));

  const result = {
    configuration: {
      n_docs: N_DOCS,
      n_queries: N_QUERIES,
      vocab_size: engine.vocabSize,
      kc_cells: engine.kcCells,
      seed: 42,
      runtime: "Node.js " + process.version + " (движок V8 — тот же JS-движок, что в Chrome; замер валиден для клиентского браузерного исполнения)",
      file_checked: "public/aifa_connectome_web.js",
    },
    file_reality_check: {
      claimed_technology: "WebAssembly SIMD128 binary, 126.7 KB",
      actual_technology: "pure JavaScript (TypedArrays), 0 bytes WASM, 0 SIMD instructions — подтверждено собственным комментарием файла: 'pure JavaScript / TypedArrays'",
      claimed_size_bytes: 126700,
      actual_size_bytes: 7121,
      size_discrepancy_factor: Math.round((126700 / 7121) * 100) / 100,
      claimed_algorithm: "popcount SIMD128 bitwise scan",
      actual_algorithm: "inverted posting-list index + Kenyon Cell activation + Jaccard similarity (не popcount, не побитовое сканирование)",
    },
    honest_measurement: {
      latency_p50_us: Math.round(percentile(latencies, 0.50) * 100) / 100,
      latency_p95_us: Math.round(percentile(latencies, 0.95) * 100) / 100,
      latency_p99_us: Math.round(percentile(latencies, 0.99) * 100) / 100,
      note: "Это ЧЕСТНЫЙ замер РЕАЛЬНОГО алгоритма (обратный индекс, не SIMD-popcount), поэтому число НЕ сравнимо напрямую с заявленными 331.6 мкс — та цифра описывала другую (не существующую) технологию.",
    },
  };

  const outDir = join(__dirname, "results");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "wasm_search_result.json");
  writeFileSync(outPath, JSON.stringify(result, null, 2), "utf-8");

  console.log(JSON.stringify(result, null, 2));
  console.log(`\nСохранено: ${outPath}`);
}

run();
