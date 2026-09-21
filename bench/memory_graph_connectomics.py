# ==============================================================================
# AIfa-BioBench: AIfa Memory Graph Connectomics (Карточка #5)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# Реализация формулы, заявленной на карточке #5 страницы /digital и /acr:
#
#   W_ij = sum_k log(1 + Evidence_k) * exp(-dt/tau)
#   PageRank с нейромодуляторным смещением (Neuromodulated Biased Random Walk)
#
# 21.09.2026: до этого скрипта карточка #5 не имела ни одной строки кода.
# Этот скрипт строит синтетический гетерогенный граф (организации, домены,
# телефоны, технологии как узлы), взвешивает рёбра по формуле карточки и
# честно замеряет время 2-hop обхода и построения PageRank.
# ==============================================================================

import os
import json
import time
import platform
import argparse
import numpy as np


def build_heterogeneous_graph(n_orgs=5000, n_domains=5000, n_phones=3000,
                               n_technologies=50, avg_degree=6, seed=42):
    """
    Строит гетерогенный граф V = {O_i, D_j, P_k, T_m} (карточка #5).
    Каждая организация связана в среднем с avg_degree другими узлами
    (домен, телефон, технология) — имитация реального реестра сайтов.
    Возвращает список рёбер (u, v, evidence, delta_t).
    """
    rng = np.random.RandomState(seed)
    n_total = n_orgs + n_domains + n_phones + n_technologies
    org_ids = np.arange(0, n_orgs)
    domain_ids = np.arange(n_orgs, n_orgs + n_domains)
    phone_ids = np.arange(n_orgs + n_domains, n_orgs + n_domains + n_phones)
    tech_ids = np.arange(n_orgs + n_domains + n_phones, n_total)

    edges = []
    for org in org_ids:
        n_edges = rng.poisson(avg_degree)
        n_edges = max(1, n_edges)
        # каждая организация связана хотя бы с одним доменом
        pools = [domain_ids, phone_ids, tech_ids]
        targets = []
        targets.append(rng.choice(domain_ids))
        for _ in range(n_edges - 1):
            pool = pools[rng.randint(0, len(pools))]
            targets.append(rng.choice(pool))
        for t in targets:
            evidence = rng.uniform(0.5, 5.0)  # сила доказательства связи
            delta_t = rng.uniform(0, 365)     # дней с момента подтверждения
            edges.append((int(org), int(t), evidence, delta_t))

    return edges, n_total, {
        "org_ids": org_ids, "domain_ids": domain_ids,
        "phone_ids": phone_ids, "tech_ids": tech_ids,
    }


def weight_edges(edges, tau=90.0):
    """W_ij = sum_k log(1 + Evidence_k) * exp(-dt/tau), формула карточки."""
    weighted = []
    for u, v, evidence, delta_t in edges:
        w = np.log(1.0 + evidence) * np.exp(-delta_t / tau)
        weighted.append((u, v, w))
    return weighted


def build_adjacency(weighted_edges, n_total):
    """Список смежности (неориентированный граф) для 2-hop обхода."""
    adj = [[] for _ in range(n_total)]
    for u, v, w in weighted_edges:
        adj[u].append((v, w))
        adj[v].append((u, w))
    return adj


def two_hop_search(adj, start_node, n_trials=1000, seed=42):
    """Честный замер: сколько времени занимает найти всех соседей 2-го порядка."""
    rng = np.random.RandomState(seed)
    n_nodes = len(adj)
    start_nodes = rng.choice(n_nodes, size=min(n_trials, n_nodes), replace=False)

    t0 = time.perf_counter()
    for node in start_nodes:
        one_hop = set(v for v, w in adj[node])
        two_hop = set()
        for neighbor in one_hop:
            two_hop.update(v for v, w in adj[neighbor])
        two_hop.discard(node)
    elapsed = time.perf_counter() - t0
    per_query_ms = (elapsed / len(start_nodes)) * 1000
    return per_query_ms


def pagerank_biased(adj, n_total, damping=0.85, n_iter=30):
    """
    Простая итеративная реализация PageRank со смещением по весу ребра
    (Neuromodulated Biased Random Walk — вес ребра играет роль вероятности
    перехода вместо равномерного распределения).
    """
    t0 = time.perf_counter()
    rank = np.ones(n_total) / n_total
    for _ in range(n_iter):
        new_rank = np.full(n_total, (1 - damping) / n_total)
        for u in range(n_total):
            neighbors = adj[u]
            if not neighbors:
                continue
            total_w = sum(w for v, w in neighbors)
            if total_w <= 0:
                continue
            for v, w in neighbors:
                new_rank[v] += damping * rank[u] * (w / total_w)
        rank = new_rank
    elapsed = time.perf_counter() - t0
    return rank, elapsed


def run_benchmark(n_orgs=5000, n_domains=5000, n_phones=3000, n_technologies=50,
                   avg_degree=6, seed=42, n_search_trials=1000):
    edges, n_total, node_groups = build_heterogeneous_graph(
        n_orgs, n_domains, n_phones, n_technologies, avg_degree, seed)
    weighted_edges = weight_edges(edges)
    adj = build_adjacency(weighted_edges, n_total)

    per_query_ms = two_hop_search(adj, start_node=0, n_trials=n_search_trials, seed=seed)
    rank, pagerank_time = pagerank_biased(adj, n_total, n_iter=20)

    top5_idx = np.argsort(rank)[-5:][::-1]

    result = {
        "configuration": {
            "n_orgs": n_orgs, "n_domains": n_domains, "n_phones": n_phones,
            "n_technologies": n_technologies, "n_total_nodes": n_total,
            "n_edges": len(edges), "avg_degree_target": avg_degree, "seed": seed,
            "platform": platform.processor() or platform.machine(),
        },
        "metrics": {
            "two_hop_search_ms_per_query": round(per_query_ms, 4),
            "n_search_trials": min(n_search_trials, n_total),
            "pagerank_total_time_sec": round(pagerank_time, 4),
            "pagerank_n_iterations": 20,
            "top5_pagerank_node_ids": [int(i) for i in top5_idx],
        },
    }
    return result


def main():
    parser = argparse.ArgumentParser(description="AIfa Memory Graph Connectomics benchmark")
    parser.add_argument("--n-orgs", type=int, default=5000)
    parser.add_argument("--n-domains", type=int, default=5000)
    parser.add_argument("--n-phones", type=int, default=3000)
    parser.add_argument("--n-technologies", type=int, default=50)
    parser.add_argument("--avg-degree", type=int, default=6)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--n-search-trials", type=int, default=1000)
    args = parser.parse_args()

    result = run_benchmark(n_orgs=args.n_orgs, n_domains=args.n_domains,
                            n_phones=args.n_phones, n_technologies=args.n_technologies,
                            avg_degree=args.avg_degree, seed=args.seed,
                            n_search_trials=args.n_search_trials)

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "memory_graph_connectomics_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
