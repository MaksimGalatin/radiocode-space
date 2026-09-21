# ==============================================================================
# AIfa-BioBench: Нейромодуляторное переключение режимов шедулера краулера
# (Карточка #22)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #22 заявляет адаптивный диспетчер фоновых
# процессов на основе нейромодуляторного гомеостаза:
#
#   dc_dop/dt = alpha*R_success(t) - beta*c_dop
#   dc_oct/dt = gamma*E_error(t) - delta*c_oct
#   W(t) = W_base + floor(4*tanh(c_dop) - 6*sigma(c_oct))
#   T_silence = T0/(1+c_dop) * (1+2*c_oct)
#
# Заявлена метрика "0.19 us".
#
# Готового движка под ИМЕННО эту формулу в aifa_sdk не найдено (проверен
# полный поиск по нейромедиаторам — есть только карточка #15, другая
# модель E/I-баланса). Этот файл честно реализует формулу буквально,
# симулирует поток успехов/ошибок краулера и замеряет задержку одного
# шага гомеостаза, а также проверяет ЗАЯВЛЕННОЕ ПОВЕДЕНИЕ: при высоком
# дофамине (успехи) параллелизм должен расти, при высоком октопамине
# (ошибки) — падать и снижаться до почти нуля (защита от бана по IP).
# ==============================================================================

import os
import sys
import json
import time
import platform
import numpy as np


def sigmoid(x):
    return 1.0 / (1.0 + np.exp(-x))


class NeuromodulatorScheduler:
    """Буквальная реализация формулы карточки #22."""

    def __init__(self, alpha=0.3, beta=0.1, gamma=0.5, delta=0.15, w_base=4, t0=5.0):
        self.alpha = alpha
        self.beta = beta
        self.gamma = gamma
        self.delta = delta
        self.w_base = w_base
        self.t0 = t0
        self.c_dop = 0.0
        self.c_oct = 0.0

    def step(self, success_signal, error_signal, dt=1.0):
        """
        Один шаг гомеостаза: success_signal и error_signal — мгновенные
        индикаторы (0 или 1, или доля успехов/ошибок за окно), R_success
        и E_error из формулы.
        """
        d_dop = self.alpha * success_signal - self.beta * self.c_dop
        d_oct = self.gamma * error_signal - self.delta * self.c_oct

        self.c_dop += d_dop * dt
        self.c_oct += d_oct * dt

        # Концентрации нейромодуляторов физически не могут быть
        # отрицательными (честное ограничение, не в формуле явно, но
        # необходимо для физического смысла — иначе гомеостаз даёт
        # отрицательные "концентрации", что бессмысленно)
        self.c_dop = max(0.0, self.c_dop)
        self.c_oct = max(0.0, self.c_oct)

        w = self.w_base + int(np.floor(4 * np.tanh(self.c_dop) - 6 * sigmoid(self.c_oct)))
        w = max(0, w)  # число воркеров не может быть отрицательным

        t_silence = (self.t0 / (1.0 + self.c_dop)) * (1.0 + 2.0 * self.c_oct)

        return {
            "c_dop": self.c_dop,
            "c_oct": self.c_oct,
            "n_workers": w,
            "silence_timeout_sec": t_silence,
        }


def run_behavior_test(n_steps=2000, seed=42):
    """
    Честная проверка заявленного поведения: два сценария —
    (1) устойчивый успех (краулер собирает данные без ошибок) должен
        со временем ПОВЫСИТЬ параллелизм выше базового уровня;
    (2) устойчивые ошибки (сервер банит IP) должны СНИЗИТЬ параллелизм
        почти до нуля — это и есть заявленная защита от перегрузки и бана.
    """
    rng = np.random.RandomState(seed)

    # Сценарий успеха
    sched_success = NeuromodulatorScheduler()
    workers_success_trace = []
    for _ in range(n_steps):
        result = sched_success.step(success_signal=1.0, error_signal=0.0)
        workers_success_trace.append(result["n_workers"])

    # Сценарий ошибок (краулер начинает получать 429/403 подряд)
    sched_error = NeuromodulatorScheduler()
    workers_error_trace = []
    silence_error_trace = []
    for _ in range(n_steps):
        result = sched_error.step(success_signal=0.0, error_signal=1.0)
        workers_error_trace.append(result["n_workers"])
        silence_error_trace.append(result["silence_timeout_sec"])

    final_workers_success = workers_success_trace[-1]
    final_workers_error = workers_error_trace[-1]
    final_silence_error = silence_error_trace[-1]

    # Честные проверки заявленного поведения
    success_raises_parallelism = final_workers_success > 4  # выше w_base=4
    errors_reduce_parallelism_near_zero = final_workers_error <= 1
    errors_increase_silence_timeout = final_silence_error > 5.0  # выше t0=5.0

    return {
        "final_workers_after_sustained_success": final_workers_success,
        "final_workers_after_sustained_errors": final_workers_error,
        "final_silence_timeout_after_errors_sec": round(final_silence_error, 4),
        "claim_success_raises_parallelism": success_raises_parallelism,
        "claim_errors_reduce_parallelism_near_zero": errors_reduce_parallelism_near_zero,
        "claim_errors_increase_backoff_timeout": errors_increase_silence_timeout,
        "formula_analysis": {
            "c_dop_equilibrium_under_sustained_success": round(0.3 / 0.1, 4),
            "dopamine_term_at_equilibrium": round(4 * np.tanh(0.3 / 0.1), 4),
            "octopamine_baseline_penalty_at_zero_error": round(6 * sigmoid(0.0), 4),
            "finding": "При устойчивом успехе БЕЗ ошибок (c_oct=0) базовый штраф 6*sigmoid(0)=3.0 почти полностью гасит максимально достижимый прирост от дофамина 4*tanh(3.0)=3.98, оставляя чистый прирост параллелизма около 0. Заявленная формула сама по себе не даёт значимого роста параллелизма при чистом успехе — это математическое свойство формулы, а не ошибка реализации.",
        },
    }


def run_latency_benchmark(n_trials=1000, seed=42):
    rng = np.random.RandomState(seed)
    scheduler = NeuromodulatorScheduler()

    latencies_us = []
    for _ in range(n_trials):
        success = rng.choice([0.0, 1.0], p=[0.3, 0.7])
        error = 1.0 - success

        t0 = time.perf_counter()
        _ = scheduler.step(success_signal=success, error_signal=error)
        t1 = time.perf_counter()
        latencies_us.append((t1 - t0) * 1_000_000.0)

    latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    return {
        "latency_p50_us": round(percentile(latencies_us, 0.50), 4),
        "latency_p95_us": round(percentile(latencies_us, 0.95), 4),
        "latency_p99_us": round(percentile(latencies_us, 0.99), 4),
    }


def run_benchmark():
    behavior_test = run_behavior_test()
    latency_test = run_latency_benchmark()

    result = {
        "configuration": {
            "engine_source": "написано с нуля 21.09.2026 (готового движка под эту формулу в aifa_sdk не найдено); буквальная реализация дифференциальных уравнений и нелинейной формулы карточки",
            "platform": platform.processor() or platform.machine(),
        },
        "honest_measurement": {
            "behavior_test": behavior_test,
            "latency": latency_test,
        },
        "claimed_metric_check": {
            "claimed": "0.19 us",
            "measured_p50_us": latency_test["latency_p50_us"],
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "neuromod_scheduler_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
