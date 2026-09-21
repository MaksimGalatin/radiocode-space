# ==============================================================================
# AIfa-BioBench: Детектор движения Рейхардта (EMD T4/T5) для выявления
# визуальных барьеров и мерцания (Карточка #25)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #25 заявляет корреляционный детектор движения
# Хассенштейна-Рейхардта (Hassenstein & Reichardt, 1956):
#
#   EMD_{A->B}(t) = S_A(t-tau)*S_B(t) - S_A(t)*S_B(t-tau)
#
# и его применение к детекции мерцающих/стробоскопических визуальных
# барьеров (WCAG 2.3.1) через спектральную мощность суммарного EMD-сигнала
# в полосе 3-50 Гц:
#
#   P_flicker = integral_{3Hz}^{50Hz} |F{ sum_xy EMD(x,y,t) }|^2 df
#
# Заявлено: если P_flicker > theta_seizure, сайт мгновенно помечается
# опасным. Метрика "0.28 us" (на элементарный детектор/пиксель).
#
# Готового движка не найдено. Этот файл честно реализует формулу EMD и
# ПРОВЕРЯЕТ заявленное свойство напрямую: подаёт синтетический видеопоток
# со СТАТИЧНЫМ фоном (без мерцания) и со СТРОБОСКОПИЧЕСКИМ мерцанием на
# частотах внутри и вне диапазона 3-50 Гц, честно замеряет, действительно
# ли детектор различает опасное мерцание от неопасного/статичного контента.
# ==============================================================================

import os
import sys
import json
import time
import platform
import numpy as np


def reichardt_emd(signal_a, signal_b, tau_steps=1):
    """
    Буквальная реализация корреляционного детектора Рейхардта:
    EMD_{A->B}(t) = S_A(t-tau)*S_B(t) - S_A(t)*S_B(t-tau)

    signal_a, signal_b: временные ряды сигналов двух соседних фоторецепторов.
    tau_steps: задержка в шагах дискретизации.
    Возвращает временной ряд EMD-отклика (длина уменьшена на tau_steps).
    """
    n = len(signal_a)
    if n <= tau_steps:
        return np.array([])

    a_delayed = signal_a[:-tau_steps]
    b_delayed = signal_b[:-tau_steps]
    a_now = signal_a[tau_steps:]
    b_now = signal_b[tau_steps:]

    emd = a_delayed * b_now - a_now * b_delayed
    return emd


def generate_flicker_stimulus(freq_hz, duration_s, sample_rate_hz, amplitude=1.0, dc_offset=0.5):
    """Генерирует синусоидальное мерцание яркости на заданной частоте."""
    n_samples = int(duration_s * sample_rate_hz)
    t = np.arange(n_samples) / sample_rate_hz
    signal = dc_offset + amplitude * 0.5 * np.sin(2 * np.pi * freq_hz * t)
    return signal


def generate_static_stimulus(duration_s, sample_rate_hz, noise_level=0.02, seed=0):
    """Генерирует статичный (немерцающий) фон с небольшим сенсорным шумом."""
    rng = np.random.RandomState(seed)
    n_samples = int(duration_s * sample_rate_hz)
    return 0.5 + rng.normal(0, noise_level, n_samples)


def measure_flicker_power(signal_a, signal_b, sample_rate_hz, tau_steps=1,
                           band_lo_hz=3.0, band_hi_hz=50.0):
    """
    Считает P_flicker: спектральную мощность EMD-отклика в полосе
    band_lo_hz..band_hi_hz — буквальная реализация формулы карточки
    (интеграл |FFT|^2 по полосе).
    """
    emd = reichardt_emd(signal_a, signal_b, tau_steps=tau_steps)
    if len(emd) < 4:
        return 0.0

    spectrum = np.fft.rfft(emd - np.mean(emd))
    freqs = np.fft.rfftfreq(len(emd), d=1.0 / sample_rate_hz)
    power = np.abs(spectrum) ** 2

    band_mask = (freqs >= band_lo_hz) & (freqs <= band_hi_hz)
    p_flicker = float(np.sum(power[band_mask]))
    return p_flicker


def test_flicker_detection(seed=42):
    """
    Честная проверка заявленного поведения: детектор должен давать
    ВЫСОКУЮ мощность P_flicker на мерцании внутри полосы 3-50 Гц и
    НИЗКУЮ на статичном фоне и на мерцании ВНЕ полосы (слишком медленном
    или слишком быстром для человеческого восприятия/эпилептогенности).
    """
    sample_rate_hz = 200.0  # частота дискретизации видеопотока (кадры/с)
    duration_s = 2.0
    tau_steps = 2  # синаптическая задержка EMD в шагах дискретизации

    rng = np.random.RandomState(seed)

    # Статичный фон — эталон "неопасного" контента
    static_powers = []
    for trial in range(20):
        sig = generate_static_stimulus(duration_s, sample_rate_hz, seed=seed + trial)
        # Два соседних "фоторецептора" видят тот же статичный сигнал со
        # сдвигом на пиксель — в реальности почти идентичны
        sig_b = sig + rng.normal(0, 0.01, len(sig))
        p = measure_flicker_power(sig, sig_b, sample_rate_hz, tau_steps)
        static_powers.append(p)

    # Мерцание ВНУТРИ опасного диапазона (3-50 Гц) — классическая
    # частота стробоскопов/баннеров, напр. 10 Гц
    in_band_powers = []
    for freq in [4.0, 10.0, 16.0, 25.0, 40.0]:
        sig = generate_flicker_stimulus(freq, duration_s, sample_rate_hz)
        sig_b = np.roll(sig, 1)  # соседний фоторецептор видит тот же паттерн со сдвигом фазы
        p = measure_flicker_power(sig, sig_b, sample_rate_hz, tau_steps)
        in_band_powers.append(p)

    # Мерцание ВНЕ диапазона: слишком медленное (0.5 Гц — например,
    # плавная смена дня/ночи в фоне) и слишком быстрое (80 Гц — выше
    # порога человеческого восприятия и типичной частоты кадров)
    out_of_band_powers = []
    for freq in [0.5, 1.0, 80.0, 95.0]:
        sig = generate_flicker_stimulus(freq, duration_s, sample_rate_hz)
        sig_b = np.roll(sig, 1)
        p = measure_flicker_power(sig, sig_b, sample_rate_hz, tau_steps)
        out_of_band_powers.append(p)

    static_mean = float(np.mean(static_powers))
    in_band_mean = float(np.mean(in_band_powers))
    out_of_band_mean = float(np.mean(out_of_band_powers))

    # Заявленное свойство: мерцание в опасной полосе должно давать
    # СУЩЕСТВЕННО (на порядки) более высокую мощность, чем статичный фон.
    # "theta_seizure" — порог; честно ставим его посередине лог-шкалы
    # между статикой и внутриполосным сигналом, как это сделал бы
    # реальный детектор.
    if static_mean > 0 and in_band_mean > 0:
        threshold = float(np.sqrt(static_mean * in_band_mean))
    else:
        threshold = float(max(static_mean, in_band_mean) / 2.0) if max(static_mean, in_band_mean) > 0 else 1e-9

    in_band_detected = sum(1 for p in in_band_powers if p > threshold)
    static_false_positives = sum(1 for p in static_powers if p > threshold)
    out_of_band_false_positives = sum(1 for p in out_of_band_powers if p > threshold)

    return {
        "sample_rate_hz": sample_rate_hz,
        "tau_steps": tau_steps,
        "static_power_mean": static_mean,
        "in_band_power_mean": in_band_mean,
        "out_of_band_power_mean": out_of_band_mean,
        "threshold_geometric_mean": threshold,
        "n_static_trials": len(static_powers),
        "static_false_positives": static_false_positives,
        "n_in_band_trials": len(in_band_powers),
        "in_band_detected": in_band_detected,
        "n_out_of_band_trials": len(out_of_band_powers),
        "out_of_band_false_positives": out_of_band_false_positives,
        "ratio_in_band_to_static": (in_band_mean / static_mean) if static_mean > 1e-12 else None,
        "claim_flicker_detected_in_band": in_band_detected == len(in_band_powers),
        "claim_static_not_flagged": static_false_positives == 0,
    }


def run_latency_benchmark(n_trials=2000, grid_size=32):
    """
    Замер задержки на один элементарный EMD-детектор (пара соседних
    пикселей), как заявлено в метрике карточки ("0.28 us").
    """
    rng = np.random.RandomState(0)
    frame_a = rng.random(grid_size * grid_size)
    frame_b = rng.random(grid_size * grid_size)
    frame_a_prev = rng.random(grid_size * grid_size)
    frame_b_prev = rng.random(grid_size * grid_size)

    latencies_us = []
    for _ in range(n_trials):
        t0 = time.perf_counter()
        _ = frame_a_prev * frame_b - frame_a * frame_b_prev
        t1 = time.perf_counter()
        # Делим на число элементарных детекторов в решётке — цена ОДНОГО EMD
        latencies_us.append((t1 - t0) * 1_000_000.0 / (grid_size * grid_size))

    latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    return {
        "grid_size": grid_size,
        "n_elementary_detectors": grid_size * grid_size,
        "latency_per_emd_p50_us": round(percentile(latencies_us, 0.50), 4),
        "latency_per_emd_p95_us": round(percentile(latencies_us, 0.95), 4),
    }


def run_benchmark():
    flicker_test = test_flicker_detection()
    latency_test = run_latency_benchmark()

    result = {
        "configuration": {
            "engine_source": "написано с нуля 21.09.2026 (готового движка под EMD/Рейхардта в aifa_sdk не найдено); буквальная реализация формулы карточки: EMD_A->B(t)=S_A(t-tau)*S_B(t)-S_A(t)*S_B(t-tau), P_flicker=интеграл спектральной мощности EMD по полосе 3-50 Гц",
            "platform": platform.processor() or platform.machine(),
        },
        "honest_measurement": {
            "flicker_detection": flicker_test,
            "latency": latency_test,
        },
        "claimed_metric_check": {
            "claimed": "0.28 us",
            "measured_p50_us": latency_test["latency_per_emd_p50_us"],
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "emd_reichardt_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
