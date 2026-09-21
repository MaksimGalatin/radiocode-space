# ==============================================================================
# AIfa-BioBench: Топологический изоморфизм Small-World (Карточка #11)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #11 уже честно пересчитала арифметическую ошибку
# в индексе σ для коннектома FlyWire (79.81, не 8.42). Второе число на
# карточке — "σ = 7.15" для графа диалоговой памяти AIfa Memory —
# никогда не было вычислено кодом. Этот файл честно строит синтетический
# граф памяти (сущности AIfa: организации, домены, телефоны, технологии
# — аналогично карточке #5) и считает индекс малого мира по формуле
# Уоттса-Строгаца: sigma = (C/C_rand) / (L/L_rand), используя уже
# существующий метод evaluate_small_world_topology() из
# connectome_golden_standard.py (карточка #7), а не переписывает его.
# ==============================================================================

import os
import sys
import json
import platform
import numpy as np

sys.path.insert(0, "E:/CODE/aifa-biobench/aifa_sdk")
from connectome_golden_standard import ConnectomeGoldenStandard


def build_memory_graph(n_nodes=500, k_neighbors=8, rewire_prob=0.08, seed=42):
    """
    Синтетический граф ассоциативной памяти AIfa: сущности (организации,
    домены, телефоны, технологии) соединены по модели малого мира
    Уоттса-Строгаца — та же модель, что уже использовалась для
    карточки #7 (biomatch_score.py), с параметром перелинковки p=0.08,
    как честно заявлено в самой карточке #11 ("Статический коэффициент
    перелинковки p=0.08").
    """
    rng = np.random.RandomState(seed)
    adj = np.zeros((n_nodes, n_nodes), dtype=np.float32)

    for i in range(n_nodes):
        for j in range(1, k_neighbors // 2 + 1):
            adj[i, (i + j) % n_nodes] = 1.0
            adj[i, (i - j) % n_nodes] = 1.0

    edges = np.argwhere(adj > 0)
    for (i, j) in edges:
        if rng.rand() < rewire_prob:
            new_j = rng.randint(0, n_nodes)
            if new_j != i:
                adj[i, j] = 0.0
                adj[i, new_j] = 1.0

    return adj


def compute_path_length(adj: np.ndarray) -> float:
    """
    Средняя длина кратчайшего пути (BFS от каждого узла) — честный
    расчёт L, необходимый для индекса sigma, но отсутствующий в
    evaluate_small_world_topology() (тот считает только C).
    """
    n = adj.shape[0]
    bin_adj = (adj > 0).astype(np.int32)
    adj_list = [np.where(bin_adj[i] > 0)[0] for i in range(n)]

    total_dist = 0
    total_pairs = 0
    for src in range(n):
        dist = np.full(n, -1, dtype=np.int32)
        dist[src] = 0
        queue = [src]
        head = 0
        while head < len(queue):
            u = queue[head]
            head += 1
            for v in adj_list[u]:
                if dist[v] == -1:
                    dist[v] = dist[u] + 1
                    queue.append(v)
        reachable = dist[dist > 0]
        total_dist += int(np.sum(reachable))
        total_pairs += len(reachable)

    return total_dist / max(1, total_pairs)


def compute_random_graph_baseline(n_nodes: int, n_edges: int, seed: int) -> tuple:
    """Граф Эрдёша-Реньи той же плотности — эталон C_rand и L_rand."""
    rng = np.random.RandomState(seed + 1000)
    adj = np.zeros((n_nodes, n_nodes), dtype=np.float32)
    max_possible = n_nodes * (n_nodes - 1) // 2
    n_edges = min(n_edges, max_possible)
    chosen = rng.choice(max_possible, size=n_edges, replace=False)
    idx = 0
    for i in range(n_nodes):
        for j in range(i + 1, n_nodes):
            if idx in chosen:
                adj[i, j] = 1.0
                adj[j, i] = 1.0
            idx += 1

    validator = ConnectomeGoldenStandard(seed=seed)
    c_rand = validator.evaluate_small_world_topology(adj)["clustering_coefficient"]
    l_rand = compute_path_length(adj)
    return c_rand, l_rand


def run_benchmark(n_nodes=500, k_neighbors=8, rewire_prob=0.08, seed=42):
    adj = build_memory_graph(n_nodes=n_nodes, k_neighbors=k_neighbors, rewire_prob=rewire_prob, seed=seed)

    validator = ConnectomeGoldenStandard(seed=seed)
    sw_report = validator.evaluate_small_world_topology(adj)
    c_memory = sw_report["clustering_coefficient"]
    l_memory = compute_path_length(adj)

    n_edges = int(np.sum(adj > 0) / 2)
    c_rand, l_rand = compute_random_graph_baseline(n_nodes, n_edges, seed)

    sigma = (c_memory / max(1e-9, c_rand)) / (l_memory / max(1e-9, l_rand))

    result = {
        "configuration": {
            "n_nodes": n_nodes,
            "k_neighbors": k_neighbors,
            "rewire_prob": rewire_prob,
            "seed": seed,
            "platform": platform.processor() or platform.machine(),
            "engine_source": "E:/CODE/aifa-biobench/aifa_sdk/connectome_golden_standard.py (переиспользован метод evaluate_small_world_topology для C; L и C_rand/L_rand посчитаны честно в этом файле, т.к. движок их не вычисляет)",
        },
        "memory_graph": {
            "clustering_coefficient_C": c_memory,
            "avg_path_length_L": round(l_memory, 4),
        },
        "random_graph_baseline": {
            "clustering_coefficient_C_rand": c_rand,
            "avg_path_length_L_rand": round(l_rand, 4),
        },
        "small_world_index_sigma": round(sigma, 4),
        "claimed_vs_measured": {
            "claimed_sigma": 7.15,
            "measured_sigma": round(sigma, 4),
            "note": "Заявленное на карточке sigma=7.15 для графа памяти AIfa никогда не было вычислено кодом. Значение выше — честный расчёт по той же формуле Уоттса-Строгаца на синтетическом графе памяти сопоставимой конструкции (p=0.08, как заявлено на карточке).",
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "small_world_index_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
