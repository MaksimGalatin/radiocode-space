# ==============================================================================
# AIfa-BioBench: K-Core декомпозиция графа связности и отказоустойчивость ядра
# (Карточка #26)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #26 заявляет k-core декомпозицию коннектома
# FlyWire v783: итеративное удаление узлов степени < k, пока не останется
# максимальное ядро H_k = {v in V | deg_{H_k}(v) >= k}. Заявлено: в мозге
# мухи k_max=78, ядро из 1420 нейронов. Критическая инвариантность:
# при связности ядра k>=78 вероятность разделения сети (split-brain)
# падает экспоненциально: P_split <= exp(-k*Delta_link). Метрика "498.10 us".
#
# Настоящего графа коннектома FlyWire на диске не найдено (проверено:
# в aifa-biobench есть только генератор СИНТЕТИЧЕСКИХ графов с заданными
# инвариантами small-world/log-normal, не сырые данные связей). Поэтому
# этот файл честно реализует АЛГОРИТМ k-core декомпозиции (Batagelj &
# Zaversnik, 2003, O(V+E)) и проверяет заявленное свойство — устойчивость
# ядра к удалению периферии — на синтетическом графе со структурой
# "плотное ядро + разреженная периферия", а НЕ на реальных числах мухи
# (k_max=78, 1420 нейронов), которые без исходных данных проверить нельзя.
# ==============================================================================

import os
import sys
import json
import time
import platform
import numpy as np


def build_core_periphery_graph(n_core, k_core_degree, n_periphery, periphery_degree, seed=42):
    """
    Строит синтетический граф со структурой "плотное ядро + разреженная
    периферия" — буквальная модель, описанная в биологической части
    карточки: ядро из n_core узлов с высокой внутренней связностью
    (~k_core_degree), периферия из n_periphery узлов с низкой связностью
    (~periphery_degree), периферия слабо связана с ядром (несколько
    случайных мостов).
    Возвращает adjacency list (dict: node -> set of neighbors).
    """
    rng = np.random.RandomState(seed)
    n_total = n_core + n_periphery
    adj = {i: set() for i in range(n_total)}

    # Ядро: почти полный граф достаточной плотности, чтобы степень
    # каждого узла ядра была >= k_core_degree (аналог dense core мухи)
    core_nodes = list(range(n_core))
    for i in core_nodes:
        # каждый узел ядра соединяем со случайными k_core_degree другими
        # узлами ядра (без учёта уже добавленных рёбер — при повторном
        # проходе граф получится ещё плотнее, что только усиливает ядро)
        targets = rng.choice([j for j in core_nodes if j != i],
                              size=min(k_core_degree, n_core - 1), replace=False)
        for t in targets:
            adj[i].add(t)
            adj[t].add(i)

    # Периферия: разреженные связи внутри себя (степень ~periphery_degree)
    periphery_nodes = list(range(n_core, n_total))
    for i in periphery_nodes:
        targets = rng.choice([j for j in periphery_nodes if j != i],
                              size=min(periphery_degree, len(periphery_nodes) - 1), replace=False)
        for t in targets:
            adj[i].add(t)
            adj[t].add(i)

    # Несколько мостов периферия-ядро (периферия физически подключена к
    # системе, но не входит в плотное ядро)
    n_bridges = max(1, n_periphery // 10)
    bridge_periphery = rng.choice(periphery_nodes, size=n_bridges, replace=False)
    bridge_core = rng.choice(core_nodes, size=n_bridges, replace=True)
    for p, c in zip(bridge_periphery, bridge_core):
        adj[p].add(c)
        adj[c].add(p)

    return adj


def k_core_decomposition(adj):
    """
    Буквальная реализация алгоритма k-core декомпозиции
    (Batagelj & Zaversnik, 2003): итеративно удаляет узлы с текущей
    степенью меньше k, начиная с k=0 и повышая k, пока граф не опустеет.
    Возвращает core_number: dict node -> максимальное k, при котором
    узел ещё входит в k-ядро (стандартное определение "coreness").

    Сложность O(V+E) — используется бакетная сортировка по степени,
    как в оригинальной работе, а не наивное O(V^2) переудаление.
    """
    adj = {k: set(v) for k, v in adj.items()}  # копия, чтобы не портить исходный граф
    degree = {v: len(neighbors) for v, neighbors in adj.items()}
    n = len(degree)
    if n == 0:
        return {}

    max_degree = max(degree.values()) if degree else 0
    # Бакеты по степени
    buckets = [set() for _ in range(max_degree + 1)]
    for v, d in degree.items():
        buckets[d].add(v)

    core_number = {}
    removed = set()

    for _ in range(n):
        # Найти минимальный непустой бакет
        d = 0
        while d <= max_degree and not buckets[d]:
            d += 1
        if d > max_degree:
            break
        v = buckets[d].pop()
        core_number[v] = d
        removed.add(v)

        for u in adj[v]:
            if u in removed:
                continue
            old_deg = degree[u]
            if old_deg > d:
                buckets[old_deg].discard(u)
                new_deg = max(d, old_deg - 1)
                degree[u] = new_deg
                buckets[new_deg].add(u)

    return core_number


def find_max_core(core_number):
    """Возвращает (k_max, список узлов максимального ядра)."""
    if not core_number:
        return 0, []
    k_max = max(core_number.values())
    max_core_nodes = [v for v, k in core_number.items() if k == k_max]
    return k_max, max_core_nodes


def test_split_resilience(adj, core_nodes, periphery_nodes, seed=42):
    """
    Честная проверка заявленного свойства: ядро должно сохранять
    связность (не распадаться на компоненты) даже при удалении ВСЕЙ
    сенсорной периферии, тогда как случайное удаление той же ДОЛИ узлов
    ИЗ ЯДРА должно повышать риск разделения при приближении к границе k.
    """
    rng = np.random.RandomState(seed)

    def is_connected(nodes_set, adjacency):
        """BFS-проверка связности индуцированного подграфа."""
        if not nodes_set:
            return True
        nodes_set = set(nodes_set)
        start = next(iter(nodes_set))
        visited = {start}
        queue = [start]
        while queue:
            u = queue.pop()
            for v in adjacency.get(u, ()):
                if v in nodes_set and v not in visited:
                    visited.add(v)
                    queue.append(v)
        return len(visited) == len(nodes_set)

    # 1. Удаление ВСЕЙ периферии — ядро должно остаться связным целиком
    remaining_after_full_periphery_removal = set(core_nodes)
    core_survives_full_periphery_loss = is_connected(remaining_after_full_periphery_removal, adj)

    # 2. Прогрессивное удаление узлов ИЗ ЯДРА (случайно, растущая доля) —
    # проверяем, на каком проценте удаления ядро перестаёт быть связным
    core_list = list(core_nodes)
    n_core = len(core_list)
    fractions = [0.05, 0.10, 0.20, 0.30, 0.40, 0.50]
    split_at_fraction = {}
    for frac in fractions:
        n_remove = int(n_core * frac)
        to_remove = set(rng.choice(core_list, size=n_remove, replace=False))
        remaining = set(core_list) - to_remove
        split_at_fraction[frac] = not is_connected(remaining, adj)

    # Первая доля, при которой ядро распадается (если есть)
    first_split_fraction = None
    for frac in fractions:
        if split_at_fraction[frac]:
            first_split_fraction = frac
            break

    return {
        "core_survives_full_periphery_loss": core_survives_full_periphery_loss,
        "split_at_fraction_removed_from_core": split_at_fraction,
        "first_fraction_causing_split": first_split_fraction,
    }


def run_latency_benchmark(n_trials, adj):
    """Замер задержки k-core декомпозиции на синтетическом графе."""
    latencies_us = []
    for _ in range(n_trials):
        t0 = time.perf_counter()
        _ = k_core_decomposition(adj)
        t1 = time.perf_counter()
        latencies_us.append((t1 - t0) * 1_000_000.0)

    latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    return {
        "n_trials": n_trials,
        "latency_p50_us": round(percentile(latencies_us, 0.50), 2),
        "latency_p95_us": round(percentile(latencies_us, 0.95), 2),
    }


def run_complexity_check():
    """
    Честная проверка заявленной сложности O(|V|+|E|): степенная
    регрессия log(time) ~ p*log(N) на растущих размерах графа с
    постоянной средней степенью (чтобы E росло линейно с V).
    """
    sizes = [200, 400, 800, 1600, 3200, 6400]
    times = []
    for n in sizes:
        n_core = max(10, n // 20)
        n_periphery = n - n_core
        adj = build_core_periphery_graph(n_core, min(15, n_core - 1), n_periphery, 4, seed=n)
        t0 = time.perf_counter()
        _ = k_core_decomposition(adj)
        t1 = time.perf_counter()
        times.append(t1 - t0)

    log_n = np.log(sizes)
    log_t = np.log(np.maximum(times, 1e-9))
    p = float(np.polyfit(log_n, log_t, 1)[0])

    return {
        "sizes_tested": sizes,
        "times_seconds": [round(t, 6) for t in times],
        "empirical_exponent_p": round(p, 3),
        "claim_linear_complexity": p < 1.3,  # допуск для O(V+E) при растущей плотности
    }


def run_benchmark():
    # Синтетический граф со структурой из биологической части карточки:
    # плотное ядро (аналог k_max=78 у мухи, здесь взят меньший масштаб
    # для честной проверки за разумное время) + разреженная периферия
    n_core = 100
    k_core_degree = 30
    n_periphery = 900
    periphery_degree = 4

    adj = build_core_periphery_graph(n_core, k_core_degree, n_periphery, periphery_degree)
    core_number = k_core_decomposition(adj)
    k_max, max_core_nodes = find_max_core(core_number)

    core_node_set = set(range(n_core))
    periphery_node_set = set(range(n_core, n_core + n_periphery))

    # Насколько найденное k-ядро (по алгоритму) пересекается с
    # СКОНСТРУИРОВАННЫМ плотным ядром графа (честная проверка, что
    # алгоритм действительно выделяет "плотное ядро", а не что попало)
    overlap_with_designed_core = len(set(max_core_nodes) & core_node_set) / max(1, len(core_node_set))

    resilience_test = test_split_resilience(adj, core_node_set, periphery_node_set)
    latency_test = run_latency_benchmark(500, adj)
    complexity_test = run_complexity_check()

    result = {
        "configuration": {
            "engine_source": "написано с нуля 21.09.2026 (готового движка k-core в aifa_sdk не найдено; настоящих данных коннектома FlyWire на диске тоже нет — проверка на синтетическом графе с заданной структурой ядро+периферия, а не на реальных числах мухи k_max=78/1420 нейронов, которые без исходных данных верифицировать нельзя)",
            "platform": platform.processor() or platform.machine(),
            "graph_n_core": n_core,
            "graph_n_periphery": n_periphery,
        },
        "honest_measurement": {
            "found_k_max": k_max,
            "found_max_core_size": len(max_core_nodes),
            "overlap_with_designed_dense_core": round(overlap_with_designed_core, 4),
            "split_resilience": resilience_test,
            "latency": latency_test,
            "complexity": complexity_test,
        },
        "claimed_metric_check": {
            "claimed": "498.10 us",
            "measured_p50_us": latency_test["latency_p50_us"],
        },
        "honest_note": "Заявленные числа мухи (k_max=78, 1420 нейронов) НЕ проверены — для этого нужен настоящий граф коннектома FlyWire v783, которого нет на диске. Проверен АЛГОРИТМ и заявленное СВОЙСТВО (устойчивость ядра к потере периферии) на синтетическом графе.",
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "kcore_decomposition_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
