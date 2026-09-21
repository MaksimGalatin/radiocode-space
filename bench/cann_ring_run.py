# ==============================================================================
# AIfa-BioBench: 16-нейронный кольцевой аттрактор фазы диалога (Карточка #14)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #14 заявляет 16-нейронное кольцо (эллипсоидное тело
# дрозофилы, EB, содержит ровно 16 клиньев E-PG) и задержку "16.21 мкс".
# Найден уже существующий движок E:/CODE/aifa-biobench/aifa_sdk/
# cann_focus.py (класс CANNFocusRing), реализующий уравнение Амари с
# весами "мексиканская шляпа" — та же математика, что заявлена на
# карточке — но по умолчанию с 64 нейронами, не 16, и никогда не
# запускался с честным замером задержки для этой конкретной карточки.
#
# Этот файл честно прогоняет уже существующий движок с параметром
# n_neurons=16, как заявлено на карточке, и честно замеряет задержку
# одного шага симуляции.
# ==============================================================================

import os
import sys
import json
import time
import platform

sys.path.insert(0, "E:/CODE/aifa-biobench/aifa_sdk")
from cann_focus import CANNFocusRing


def run_benchmark(n_neurons=16, n_steps=1000, seed=42):
    import numpy as np
    rng = np.random.RandomState(seed)

    ring = CANNFocusRing(n_neurons=n_neurons)
    ring.initialize_focus(target_angle_rad=0.0)

    latencies_us = []
    stability_scores = []
    locked_count = 0

    for i in range(n_steps):
        # Симуляция дрейфующего внешнего входа (диалог смещает тему)
        noise_angle = rng.normal(0, 0.05)
        ext_angle = ring.target_heading_rad + noise_angle

        t0 = time.perf_counter()
        result = ring.step(external_angle_rad=ext_angle, external_strength=0.25)
        t1 = time.perf_counter()

        latencies_us.append((t1 - t0) * 1_000_000.0)
        stability_scores.append(result["focus_stability_score"])
        if result["is_focus_locked"]:
            locked_count += 1

    latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    p50 = percentile(latencies_us, 0.50)
    p95 = percentile(latencies_us, 0.95)
    p99 = percentile(latencies_us, 0.99)

    result = {
        "configuration": {
            "n_neurons": n_neurons,
            "n_steps": n_steps,
            "seed": seed,
            "platform": platform.processor() or platform.machine(),
            "engine_source": "E:/CODE/aifa-biobench/aifa_sdk/cann_focus.py (уже существовал, реализация Архитектора, класс CANNFocusRing; по умолчанию 64 нейрона, а не 16 как заявлено на карточке — этот прогон честно использует n_neurons=16, как заявлено)",
        },
        "honest_measurement": {
            "latency_p50_us": round(p50, 4),
            "latency_p95_us": round(p95, 4),
            "latency_p99_us": round(p99, 4),
            "mean_stability_score": round(sum(stability_scores) / len(stability_scores), 4),
            "focus_locked_ratio_pct": round((locked_count / n_steps) * 100.0, 2),
        },
        "claimed_metric_check": {
            "claimed": "16.21 us",
            "measured_p50_us": round(p50, 4),
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "cann_ring_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
