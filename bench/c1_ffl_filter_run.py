# ==============================================================================
# AIfa-BioBench: Когерентный мотив прямой связи C1-FFL для шумоподавления
# (Карточка #24)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #24 заявляет фильтр импульсных помех на основе
# когерентного мотива прямой связи (C1-FFL, Uri Alon 2007):
#
#   dy/dt = (1/tau_y) * (f(x(t)) - y(t))
#   z(t) = Theta(x(t) - theta_x) * Theta(y(t) - theta_y)
#
# Заявлено: фильтр ПОЛНОСТЬЮ подавляет импульсные помехи короче
#   dt_critical = tau_y * ln(1/(1-theta_y))
# без задержки фронта полезного (устойчивого) сигнала. Метрика "0.18 us".
#
# Готового движка не найдено. Этот файл честно реализует формулу и
# ПРОВЕРЯЕТ заявленное свойство напрямую: подаёт короткие импульсы шума
# (короче dt_critical) и длинные устойчивые сигналы (длиннее dt_critical),
# честно замеряет, действительно ли короткие импульсы полностью
# подавляются (z всегда 0), а длинные проходят (z становится 1).
# ==============================================================================

import os
import sys
import json
import time
import platform
import numpy as np


class C1FFLFilter:
    """Буквальная реализация формулы карточки."""

    def __init__(self, tau_y=5.0, theta_x=0.5, theta_y=0.5, f=lambda x: x):
        self.tau_y = tau_y
        self.theta_x = theta_x
        self.theta_y = theta_y
        self.f = f
        self.y = 0.0

    def critical_duration(self):
        """dt_critical = tau_y * ln(1/(1-theta_y)) — заявленный порог полного подавления."""
        return self.tau_y * np.log(1.0 / (1.0 - self.theta_y))

    def step(self, x, dt=1.0):
        """Один шаг интегрирования y и вычисления z по формуле карточки."""
        dydt = (1.0 / self.tau_y) * (self.f(x) - self.y)
        self.y += dydt * dt

        z = float((x > self.theta_x) and (self.y > self.theta_y))
        return z, self.y


def simulate_pulse(filter_obj, pulse_amplitude, pulse_duration_steps, total_steps=200):
    """Подаёт импульс x=pulse_amplitude длительностью pulse_duration_steps,
    затем x=0, и честно замеряет, активировался ли выход z хотя бы раз."""
    filter_obj.y = 0.0  # сброс состояния перед каждым тестом
    z_activated = False
    z_trace = []

    for t in range(total_steps):
        x = pulse_amplitude if t < pulse_duration_steps else 0.0
        z, y = filter_obj.step(x)
        z_trace.append(z)
        if z > 0.5:
            z_activated = True

    return z_activated, z_trace


def test_filter_behavior(seed=42):
    """
    Честная проверка заявленного поведения: короткие импульсы (шум)
    должны быть ПОЛНОСТЬЮ подавлены (z никогда не активируется), а
    длинные устойчивые сигналы должны проходить (z активируется).
    """
    filt = C1FFLFilter(tau_y=5.0, theta_x=0.5, theta_y=0.5)
    dt_critical = filt.critical_duration()

    # Короткий импульс — заведомо короче dt_critical (шум)
    short_pulse_duration = max(1, int(dt_critical * 0.3))
    short_activated, short_trace = simulate_pulse(filt, pulse_amplitude=1.0, pulse_duration_steps=short_pulse_duration)

    # Длинный устойчивый сигнал — заведомо длиннее dt_critical (полезный сигнал)
    long_pulse_duration = int(dt_critical * 3.0)
    long_activated, long_trace = simulate_pulse(filt, pulse_amplitude=1.0, pulse_duration_steps=long_pulse_duration)

    # Пограничный случай — ровно на границе
    borderline_duration = int(dt_critical)
    borderline_activated, _ = simulate_pulse(filt, pulse_amplitude=1.0, pulse_duration_steps=borderline_duration)

    # Проверка на множестве случайных длительностей вокруг порога — честная
    # статистика, а не единичный тест
    rng = np.random.RandomState(seed)
    n_trials = 50
    below_threshold_false_positives = 0
    above_threshold_false_negatives = 0

    for _ in range(n_trials):
        # Импульсы заведомо короче порога (0.1-0.5 от dt_critical)
        dur_below = max(1, int(dt_critical * rng.uniform(0.1, 0.5)))
        activated, _ = simulate_pulse(filt, 1.0, dur_below)
        if activated:
            below_threshold_false_positives += 1

        # Импульсы заведомо длиннее порога (2.0-4.0 от dt_critical)
        dur_above = int(dt_critical * rng.uniform(2.0, 4.0))
        activated, _ = simulate_pulse(filt, 1.0, dur_above)
        if not activated:
            above_threshold_false_negatives += 1

    return {
        "dt_critical_steps": round(float(dt_critical), 4),
        "short_pulse_duration_steps": short_pulse_duration,
        "short_pulse_activates_output": short_activated,
        "long_pulse_duration_steps": long_pulse_duration,
        "long_pulse_activates_output": long_activated,
        "borderline_duration_steps": borderline_duration,
        "borderline_activates_output": borderline_activated,
        "n_trials_below_threshold": n_trials,
        "false_positives_below_threshold": below_threshold_false_positives,
        "n_trials_above_threshold": n_trials,
        "false_negatives_above_threshold": above_threshold_false_negatives,
        "claim_short_pulses_fully_suppressed": below_threshold_false_positives == 0,
        "claim_long_signals_pass_through": above_threshold_false_negatives == 0,
    }


def run_latency_benchmark(n_trials=1000):
    filt = C1FFLFilter(tau_y=5.0, theta_x=0.5, theta_y=0.5)
    latencies_us = []

    for i in range(n_trials):
        x = 1.0 if i % 10 < 3 else 0.0
        t0 = time.perf_counter()
        _ = filt.step(x)
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
    behavior_test = test_filter_behavior()
    latency_test = run_latency_benchmark()

    result = {
        "configuration": {
            "engine_source": "написано с нуля 21.09.2026 (готового движка под эту формулу в aifa_sdk не найдено); буквальная реализация формулы карточки: dy/dt=(1/tau_y)*(f(x)-y), z=Theta(x-theta_x)*Theta(y-theta_y)",
            "platform": platform.processor() or platform.machine(),
        },
        "honest_measurement": {
            "filter_behavior": behavior_test,
            "latency": latency_test,
        },
        "claimed_metric_check": {
            "claimed": "0.18 us",
            "measured_p50_us": latency_test["latency_p50_us"],
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "c1_ffl_filter_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
