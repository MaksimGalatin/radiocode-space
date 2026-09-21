# ==============================================================================
# AIfa-BioBench: Биологический IDF и структурный прунинг синапсов (Карточка #16)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #16 заявляет биологический закон обратной частоты
# встречаемости признаков (Bio-IDF) с явной формулой:
#
#   w(f_i) = log(1 + N / (sum_j I(f_i in x_j) + eps)) * (1 - exp(-lambda * dt_last))
#
# и структурный прунинг синапсов: все связи с интегральным весом ниже
# theta_prune = 0.05 * max(w) удаляются из разреженной матрицы,
# заявлено удаление до 72% связей и метрика "3.29 us".
#
# Готового движка под ИМЕННО эту формулу в aifa_sdk не найдено. Этот
# файл пишет её с нуля буквально по формуле и честно замеряет
# долю удалённых синапсов и задержку одного прохода прунинга.
# ==============================================================================

import os
import sys
import json
import time
import platform
import numpy as np


def compute_bio_idf_weights(doc_features, n_docs, n_features, epsilon=1e-6, lam=0.01, time_since_last=None):
    """
    Честная реализация формулы карточки:
    w(f_i) = log(1 + N / (df(f_i) + eps)) * (1 - exp(-lambda * dt_last))

    doc_features: список множеств признаков на документ (аналог "x_j" в формуле)
    n_features: общее число признаков в словаре (передаётся явно, а не
    выводится из данных — иначе размер вектора весов зависит от того,
    какие именно признаки случайно попали в выборку, и рассинхронизируется
    с любым внешним массивом длины n_features, как time_since_last).
    """
    df = np.zeros(n_features, dtype=np.float64)  # document frequency каждого признака

    for doc in doc_features:
        for f in doc:
            df[f] += 1.0

    idf_term = np.log(1.0 + n_docs / (df + epsilon))

    if time_since_last is None:
        time_since_last = np.zeros(n_features, dtype=np.float64)
    recency_term = 1.0 - np.exp(-lam * time_since_last)

    weights = idf_term * recency_term
    return weights, df


def build_synaptic_matrix(n_neurons, weights, density=0.15, seed=42):
    """
    Строит разреженную матрицу связности CSR-подобной структуры, где вес
    каждого синапса берётся из распределения Bio-IDF (частые признаки —
    низкий вес, редкие — высокий), моделируя связь между частотой
    признака в коннектоме и силой синаптического пути.
    """
    rng = np.random.RandomState(seed)
    n_features = len(weights)

    # Случайная топология связности заданной плотности
    mask = rng.rand(n_neurons, n_neurons) < density
    # Каждому синапсу присваивается вес, взятый (со случайным индексом)
    # из распределения весов Bio-IDF — так связи наследуют статистику
    # частоты признаков, как заявлено в модели
    feature_idx = rng.randint(0, n_features, size=(n_neurons, n_neurons))
    synaptic_weights = weights[feature_idx] * mask

    return synaptic_weights


def prune_synapses(synaptic_matrix, theta_ratio=0.05):
    """
    Структурный прунинг: все синапсы с весом ниже theta_prune = theta_ratio * max(w)
    обнуляются (удаляются из разреженной матрицы связности).
    """
    max_w = np.max(synaptic_matrix)
    if max_w <= 0:
        return synaptic_matrix, 0.0

    theta_prune = theta_ratio * max_w
    n_before = int(np.count_nonzero(synaptic_matrix))

    pruned = synaptic_matrix.copy()
    pruned[pruned < theta_prune] = 0.0

    n_after = int(np.count_nonzero(pruned))
    pruned_fraction = 1.0 - (n_after / max(1, n_before))

    return pruned, pruned_fraction


def run_benchmark(n_docs=2000, n_features=5000, n_neurons=512, seed=42):
    rng = np.random.RandomState(seed)

    # Синтетический корпус: степенное (зипфовское) распределение частот
    # признаков — реалистичная модель "редкое важнее частого": несколько
    # признаков встречаются очень часто (стоп-слова/фон), большинство —
    # редко (уникальные маркеры)
    zipf_probs = 1.0 / (np.arange(1, n_features + 1) ** 1.1)
    zipf_probs /= zipf_probs.sum()

    doc_features = []
    for _ in range(n_docs):
        doc_len = rng.randint(5, 30)
        feats = set(rng.choice(n_features, size=doc_len, replace=False, p=zipf_probs))
        doc_features.append(feats)

    time_since_last = rng.exponential(scale=50.0, size=n_features)

    t_weight_start = time.perf_counter()
    weights, df = compute_bio_idf_weights(doc_features, n_docs, n_features, time_since_last=time_since_last)
    t_weight_end = time.perf_counter()

    synaptic_matrix = build_synaptic_matrix(n_neurons, weights, seed=seed)

    latencies_us = []
    pruned_fractions = []

    n_trials = 20
    for _ in range(n_trials):
        t0 = time.perf_counter()
        pruned, frac = prune_synapses(synaptic_matrix, theta_ratio=0.05)
        t1 = time.perf_counter()
        latencies_us.append((t1 - t0) * 1_000_000.0)
        pruned_fractions.append(frac)

    latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    p50 = percentile(latencies_us, 0.50)
    p95 = percentile(latencies_us, 0.95)
    p99 = percentile(latencies_us, 0.99)

    mean_pruned_pct = float(np.mean(pruned_fractions)) * 100.0

    # Проверка биологического закона: частые признаки должны получать
    # МЕНЬШИЙ вес, чем редкие (обратная частота)
    df_sorted_idx = np.argsort(df)
    rare_features = df_sorted_idx[:100]  # 100 самых редких
    frequent_features = df_sorted_idx[-100:]  # 100 самых частых
    mean_weight_rare = float(np.mean(weights[rare_features]))
    mean_weight_frequent = float(np.mean(weights[frequent_features]))
    law_holds = mean_weight_rare > mean_weight_frequent

    result = {
        "configuration": {
            "n_docs": n_docs,
            "n_features": n_features,
            "n_neurons": n_neurons,
            "seed": seed,
            "n_trials": n_trials,
            "platform": platform.processor() or platform.machine(),
            "engine_source": "написан с нуля 21.09.2026 (готового движка под эту формулу в aifa_sdk не найдено); буквальная реализация формулы карточки: w(f_i) = log(1 + N/(df+eps)) * (1 - exp(-lambda*dt_last)), theta_prune = 0.05 * max(w)",
        },
        "honest_measurement": {
            "prune_latency_p50_us": round(p50, 4),
            "prune_latency_p95_us": round(p95, 4),
            "prune_latency_p99_us": round(p99, 4),
            "mean_pruned_synapses_pct": round(mean_pruned_pct, 2),
            "weight_computation_time_ms": round((t_weight_end - t_weight_start) * 1000.0, 4),
            "bio_idf_law_holds": law_holds,
            "mean_weight_rare_features": round(mean_weight_rare, 6),
            "mean_weight_frequent_features": round(mean_weight_frequent, 6),
        },
        "claimed_metric_check": {
            "claimed_metric": "3.29 us",
            "claimed_pruned_pct": "72%",
            "measured_prune_latency_p50_us": round(p50, 4),
            "measured_pruned_pct": round(mean_pruned_pct, 2),
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "bio_idf_pruning_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
