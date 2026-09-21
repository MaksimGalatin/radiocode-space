# ==============================================================================
# AIfa-BioBench: APL Linear Normalization — линейное ингибирование внимания
# (Карточка #23)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #23 заявляет замену softmax на линейно-пороговое
# APL-ингибирование в матрицах внимания:
#
#   A_APL(X) = ReLU(X - theta_APL), theta_APL = Quantile_{1-k}(X)
#   A_hat_i = A_APL(X_i) / (sum_j A_APL(X_j) + eps)
#
# Заявлено: сложность падает с O(N^2) до O(N log N), 95% элементов
# становятся нулями (k=0.05, удержание активности на уровне 5%,
# буквально как в биологическом описании APL-нейрона). Метрика "4.05 us".
#
# Готового движка под ИМЕННО эту формулу в aifa_sdk не найдено. Этот
# файл честно реализует формулу буквально и проверяет три заявленных
# свойства: (1) итоговая разреженность действительно около 5% ненулевых
# элементов (95% нулей), (2) нормализованные веса действительно
# суммируются в 1 (корректная замена softmax), (3) честно измеряет
# сложность вычисления через время на разных N (растёт ли линейно/N*logN
# или квадратично, как честный эмпирический тест, а не теоретическая
# оценка Big-O, которую нельзя измерить напрямую).
# ==============================================================================

import os
import sys
import json
import time
import platform
import numpy as np


def apl_normalize(X, k=0.05, epsilon=1e-9):
    """
    Буквальная реализация формулы карточки. X — вектор/матрица логитов
    внимания (по последней оси). k=0.05 — доля удерживаемой активности
    (буквально "строго 5%", как заявлено в биологическом описании).
    """
    theta_apl = np.quantile(X, 1.0 - k, axis=-1, keepdims=True)
    a_apl = np.maximum(0.0, X - theta_apl)  # ReLU(X - theta)
    normalizer = np.sum(a_apl, axis=-1, keepdims=True) + epsilon
    a_hat = a_apl / normalizer
    return a_hat, a_apl


def test_sparsity_and_normalization(n_trials=100, seq_len=512, seed=42):
    """Честная проверка двух заявленных свойств на случайных матрицах внимания."""
    rng = np.random.RandomState(seed)

    sparsity_fractions = []
    sum_to_one_errors = []

    for _ in range(n_trials):
        logits = rng.normal(0, 1, size=seq_len)
        a_hat, a_apl = apl_normalize(logits, k=0.05)

        nonzero_fraction = float(np.count_nonzero(a_apl) / seq_len)
        sparsity_fractions.append(1.0 - nonzero_fraction)  # доля нулей

        total = float(np.sum(a_hat))
        sum_to_one_errors.append(abs(total - 1.0))

    return {
        "mean_sparsity_fraction": round(float(np.mean(sparsity_fractions)), 4),
        "claimed_sparsity_fraction": 0.95,
        "mean_sum_deviation_from_1": round(float(np.mean(sum_to_one_errors)), 8),
        "normalization_correct": float(np.mean(sum_to_one_errors)) < 1e-6,
    }


def test_complexity_scaling(seq_lengths=(1024, 4096, 16384, 65536, 262144), n_trials=20, seed=42):
    """
    Диапазон выбран честно на диапазоне 1024-262144 (рост в 256 раз):
    на маленьких N (64-2048) постоянные накладные расходы numpy
    маскируют реальный рост сложности — первый прогон 21.09.2026 дал
    ложно низкий показатель p=0.14 именно по этой причине. На большом
    диапазоне накладные расходы становятся пренебрежимо малы
    относительно самого вычисления, и показатель степени становится
    честным отражением алгоритмической сложности.
    """
    """
    Честный эмпирический замер: как растёт время вычисления с ростом N.
    Аппроксимируется степенной моделью time ~ N^p через логарифмическую
    регрессию по замеренным точкам — это единственный способ ЧЕСТНО
    проверить заявление о сложности без домысливания Big-O теоретически.
    """
    rng = np.random.RandomState(seed)
    times_by_n = {}

    for n in seq_lengths:
        latencies = []
        for _ in range(n_trials):
            logits = rng.normal(0, 1, size=n)
            t0 = time.perf_counter()
            _ = apl_normalize(logits, k=0.05)
            t1 = time.perf_counter()
            latencies.append((t1 - t0) * 1_000_000.0)
        latencies.sort()
        times_by_n[n] = latencies[len(latencies) // 2]  # median

    # Степенная регрессия log(time) = p*log(N) + c
    ns = np.array(list(times_by_n.keys()), dtype=np.float64)
    ts = np.array(list(times_by_n.values()), dtype=np.float64)
    log_n = np.log(ns)
    log_t = np.log(ts)
    p, c = np.polyfit(log_n, log_t, 1)

    return {
        "latency_us_by_seq_len": {str(int(n)): round(t, 4) for n, t in times_by_n.items()},
        "empirical_scaling_exponent_p": round(float(p), 4),
        "interpretation": f"time ~ N^{round(float(p), 2)} (p=1.0 значит линейно O(N), p=2.0 значит квадратично O(N^2), заявлено O(N*logN), что при этом диапазоне N даёт p примерно 1.0-1.15)",
    }


def run_benchmark():
    sparsity_test = test_sparsity_and_normalization()
    complexity_test = test_complexity_scaling()

    single_call_latencies = []
    rng = np.random.RandomState(42)
    for _ in range(500):
        logits = rng.normal(0, 1, size=512)
        t0 = time.perf_counter()
        _ = apl_normalize(logits, k=0.05)
        t1 = time.perf_counter()
        single_call_latencies.append((t1 - t0) * 1_000_000.0)
    single_call_latencies.sort()
    p50 = single_call_latencies[len(single_call_latencies) // 2]

    result = {
        "configuration": {
            "engine_source": "написано с нуля 21.09.2026 (готового движка под эту формулу в aifa_sdk не найдено); буквальная реализация формулы карточки: A_APL=ReLU(X-Quantile_{1-k}(X)), нормировка суммой",
            "platform": platform.processor() or platform.machine(),
        },
        "honest_measurement": {
            "sparsity_and_normalization": sparsity_test,
            "complexity_scaling": complexity_test,
        },
        "claimed_metric_check": {
            "claimed": "4.05 us",
            "measured_p50_us_at_seqlen_512": round(p50, 4),
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "apl_normalization_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
