# ==============================================================================
# AIfa-BioBench: Нейроморфный компилятор графов (Карточка #9)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #9 заявляет "0 взаимных блокировок (deadlocks)"
# на 1000 прогонах программного симулятора. Прямая проверка движка
# E:/CODE/aifa-biobench/aifa_sdk/neuromorphic_compiler.py показала:
# метод compile_aer_routing_table() возвращает "is_deadlock_free": True
# КАК ЖЁСТКУЮ КОНСТАНТУ — движок вообще не проверяет наличие дедлоков,
# он их не ищет и не может их обнаружить в принципе. Заявление "0 из
# 1000" было невозможно получить честно из этого кода: 1000 прогонов
# константы дают 1000 констант, а не 1000 измерений.
#
# Этот файл честно ЗАМЕНЯЕТ отсутствующую проверку: реализует реальный
# детектор дедлоков в маршрутизации Network-on-Chip (циклическое
# ожидание буфера между ядрами, классический признак дедлока
# NoC-роутера) и прогоняет компилятор 1000 раз на разных синтетических
# графах, честно считая долю прогонов с обнаруженным потенциальным
# дедлоком.
# ==============================================================================

import os
import sys
import json
import platform
import numpy as np

sys.path.insert(0, "E:/CODE/aifa-biobench/aifa_sdk")
from neuromorphic_compiler import NeuromorphicCompiler


def build_random_connectome_subgraph(n_neurons, density, seed):
    rng = np.random.RandomState(seed)
    adj = (rng.rand(n_neurons, n_neurons) < density).astype(np.float32)
    np.fill_diagonal(adj, 0)
    weights = rng.lognormal(mean=1.12, sigma=0.86, size=(n_neurons, n_neurons)).astype(np.float32)
    return adj * weights


def detect_noc_cyclic_wait(aer_packets, num_cores):
    """
    Честная проверка на потенциальный дедлок в маршрутизации NoC:
    строит граф ЗАВИСИМОСТЕЙ МЕЖДУ ЯДРАМИ (кто кому шлёт трафик) и ищет
    цикл. Циклическая зависимость ожидания буфера — классический
    необходимый (хоть и не всегда достаточный без учёта виртуальных
    каналов) признак дедлока в wormhole-маршрутизации NoC.
    """
    core_graph = [[] for _ in range(num_cores)]
    seen_edges = set()
    for pkt in aer_packets:
        src, tgt = pkt["src_core"], pkt["tgt_core"]
        if src != tgt and (src, tgt) not in seen_edges:
            core_graph[src].append(tgt)
            seen_edges.add((src, tgt))

    # DFS-поиск цикла в графе межъядерной зависимости трафика
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * num_cores

    def has_cycle(u):
        color[u] = GRAY
        for v in core_graph[u]:
            if color[v] == GRAY:
                return True
            if color[v] == WHITE and has_cycle(v):
                return True
        color[u] = BLACK
        return False

    for node in range(num_cores):
        if color[node] == WHITE:
            if has_cycle(node):
                return True
    return False


def run_benchmark(n_runs=1000, seed=42):
    compiler = NeuromorphicCompiler(num_target_cores=128)
    rng = np.random.RandomState(seed)

    cyclic_dependency_found = 0
    total_compile_time_ms = 0.0
    reports = []

    for i in range(n_runs):
        n_neurons = int(rng.randint(50, 300))
        density = float(rng.uniform(0.02, 0.15))
        adj = build_random_connectome_subgraph(n_neurons, density, seed=seed + i)

        report = compiler.compile_aer_routing_table(adj)
        total_compile_time_ms += report["compilation_time_ms"]

        # Собираем полные пакеты заново (образец в отчёте усечён до 10) —
        # честная проверка требует полного графа зависимостей ядер.
        core_assignments = compiler.partition_graph_to_cores(adj)
        int8_weights = compiler.quantize_weights_lognormal(adj)
        sources, targets = np.where(int8_weights > 0)
        full_packets = [
            {"src_core": int(core_assignments[s]), "tgt_core": int(core_assignments[t])}
            for s, t in zip(sources, targets)
        ]

        has_cyclic_dep = detect_noc_cyclic_wait(full_packets, compiler.num_target_cores)
        if has_cyclic_dep:
            cyclic_dependency_found += 1

        if i < 3:
            reports.append(report)

    result = {
        "configuration": {
            "n_runs": n_runs,
            "seed": seed,
            "num_target_cores": compiler.num_target_cores,
            "platform": platform.processor() or platform.machine(),
            "engine_source": "E:/CODE/aifa-biobench/aifa_sdk/neuromorphic_compiler.py (уже существовал; его собственный метод is_deadlock_free — жёсткая константа True, а не измерение — этот файл добавляет НАСТОЯЩУЮ проверку через поиск цикла в графе межъядерных зависимостей трафика)",
        },
        "honest_deadlock_check": {
            "method": "поиск цикла (DFS) в графе направленных зависимостей между ядрами NoC — необходимый признак классического циклического ожидания буфера (может давать ложные срабатывания без учёта виртуальных каналов, но НЕ является константой)",
            "runs_with_cyclic_core_dependency": cyclic_dependency_found,
            "runs_total": n_runs,
            "cyclic_dependency_rate_pct": round((cyclic_dependency_found / n_runs) * 100.0, 2),
            "note": "Наличие цикла в графе зависимостей ядер НЕ доказывает реальный дедлок на аппаратном NoC-роутере (это зависит от политики виртуальных каналов и буферизации), но отсутствие такой проверки в исходном движке делает заявление '0 из 1000' непроверяемым по построению. Это честная замена отсутствовавшей проверки.",
        },
        "engine_own_claim_reality_check": {
            "engine_field": "is_deadlock_free",
            "engine_value": "True (ЖЁСТКАЯ КОНСТАНТА в исходном коде, строка 129 neuromorphic_compiler.py — не вычисляется, не измеряется)",
        },
        "average_compilation_time_ms": round(total_compile_time_ms / n_runs, 4),
        "sample_reports": reports,
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "neuromorphic_compiler_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
