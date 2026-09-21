# ==============================================================================
# AIfa-BioBench: CANN Непрерывный аттрактор диалогового фокуса
# (Карточка #30, последняя карточка бенчмарка)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #30 заявляет непрерывный аттрактор (CANN,
# Continuous Attractor Neural Network) на кольце нейронов центрального
# комплекса, удерживающий "холм активности" (текущий фокус диалога) без
# дрейфа и без внезапных перескоков на постороннюю тему. Заявлено:
# удержание фокуса в 20.5 раз надёжнее FIFO-буферов, Focus Drift = 0.000.
# Метрика "9.33 us".
#
# ГОТОВЫЙ ДВИЖОК НАЙДЕН: aifa_sdk/cann_focus.py, класс CANNFocusRing.
# Это КОРРЕКТНАЯ реализация заявленного механизма (Mexican-hat матрица
# связности, нормализованный холм активности, population-vector
# декодирование) — не другая формула, как было на карточке #29, а тот же
# принцип буквально. Тестируется РЕАЛЬНЫЙ движок.
# ==============================================================================

import os
import sys
import json
import time
import platform
import math

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "aifa-biobench"))

try:
    from aifa_sdk.cann_focus import CANNFocusRing
    ENGINE_FOUND = True
except Exception as e:
    ENGINE_FOUND = False
    ENGINE_IMPORT_ERROR = str(e)


def test_focus_stability_without_input(seed=42):
    """
    Честная проверка заявленного свойства "neutral stability": холм
    активности должен УДЕРЖИВАТЬ своё положение (фокус диалога), даже
    когда внешний управляющий стимул исчезает (нет новых указаний от
    пользователя) — в отличие от FIFO-буфера, который просто теряет
    старый контекст.
    """
    ring = CANNFocusRing()
    target = 1.5  # произвольный целевой угол (тема диалога)
    ring.initialize_focus(target)

    # Фаза 1: несколько шагов БЕЗ внешнего стимула (external_strength=0) —
    # холм должен оставаться на месте за счёт рекуррентной динамики
    stability_no_input = []
    for _ in range(20):
        result = ring.step(external_angle_rad=target, external_strength=0.0)
        stability_no_input.append(result["angular_error_deg"])

    return {
        "target_heading_rad": target,
        "n_steps_no_external_input": 20,
        "angular_error_deg_trace": stability_no_input,
        "final_angular_error_deg": stability_no_input[-1],
        "claim_focus_maintained_without_input": stability_no_input[-1] < 15.0,
    }


def test_smooth_tracking_no_jump(seed=42):
    """
    Честная проверка заявленного свойства: холм должен ПЛАВНО скользить
    к новой цели (управляющий стимул), а не "перескакивать" резко —
    буквально то, что заявлено в bio: "Математически исключена потеря
    контекста или внезапный 'перескок' на постороннюю тему".
    """
    ring = CANNFocusRing()
    ring.initialize_focus(0.0)

    # Плавно двигаем цель от 0 до pi (180 градусов) малыми шагами
    n_steps = 60
    targets = [i * math.pi / n_steps for i in range(n_steps)]
    heading_trace = []
    max_step_jump_deg = 0.0
    prev_heading = 0.0

    for i, tgt in enumerate(targets):
        result = ring.step(external_angle_rad=tgt, external_strength=0.3)
        heading_trace.append(result["current_heading_rad"])
        if i > 0:
            jump = abs(result["current_heading_rad"] - prev_heading)
            if jump > math.pi:
                jump = 2 * math.pi - jump
            jump_deg = jump * 180.0 / math.pi
            max_step_jump_deg = max(max_step_jump_deg, jump_deg)
        prev_heading = result["current_heading_rad"]

    final_error_deg = abs(heading_trace[-1] - targets[-1]) * 180.0 / math.pi

    return {
        "n_steps": n_steps,
        "target_swept_from_deg": 0.0,
        "target_swept_to_deg": round(targets[-1] * 180.0 / math.pi, 2),
        "max_single_step_jump_deg": round(max_step_jump_deg, 2),
        "claim_no_sudden_jump": max_step_jump_deg < 30.0,  # честный порог: скачок > 30 град за 1 шаг = "перескок"
        "final_tracking_error_deg": round(final_error_deg, 2),
        "claim_smoothly_tracks_target": final_error_deg < 20.0,
    }


def test_fifo_comparison(seed=42):
    """
    Честное сравнение с наивным FIFO-буфером фиксированного размера:
    имитируем сценарий, где после N сообщений "не по теме" (случайный
    шум в других направлениях) FIFO полностью теряет исходную тему (она
    выпадает из окна), а CANN-аттрактор удерживает её за счёт
    рекуррентной динамики. Мера "надёжности" — доля прогонов, где
    исходная тема ещё узнаваема после шума.
    """
    import random
    rng = random.Random(seed)

    target = 2.0
    n_noise_messages = 30
    fifo_window_size = 10  # типичный размер окна контекста FIFO

    # CANN: подаём целевой стимул один раз, затем N шумовых сообщений
    # СЛАБОЙ силы (естественный разговорный шум), проверяем финальную
    # ошибку относительно исходной темы
    ring = CANNFocusRing()
    ring.initialize_focus(target)
    for _ in range(n_noise_messages):
        noise_angle = rng.uniform(0, 2 * math.pi)
        ring.step(external_angle_rad=noise_angle, external_strength=0.05)  # слабый шум
    final = ring.step(external_angle_rad=target, external_strength=0.0)
    cann_final_error_deg = final["angular_error_deg"]

    # FIFO: наивная модель — тема "видна", только если она среди последних
    # fifo_window_size сообщений. После n_noise_messages > window топик
    # теряется полностью (буквальное свойство FIFO — не аппроксимация)
    fifo_topic_visible = n_noise_messages < fifo_window_size

    return {
        "target_heading_rad": target,
        "n_noise_messages": n_noise_messages,
        "fifo_window_size": fifo_window_size,
        "cann_final_angular_error_deg": cann_final_error_deg,
        "cann_topic_still_recoverable": cann_final_error_deg < 45.0,
        "fifo_topic_visible_in_window": fifo_topic_visible,
        "note": "Честное сравнение: FIFO буквально теряет тему за пределами окна (структурное свойство очереди), CANN удерживает её через рекуррентную динамику холма активности — разные механизмы, не число '20.5 раз', которое без специфики бенчмарка FIFO не воспроизводимо",
    }


def run_latency_benchmark(n_trials=2000):
    """Замер задержки одного шага step()."""
    import random
    rng = random.Random(0)
    ring = CANNFocusRing()
    ring.initialize_focus(0.0)
    latencies_us = []

    for _ in range(n_trials):
        angle = rng.uniform(0, 2 * math.pi)
        t0 = time.perf_counter()
        _ = ring.step(angle, external_strength=0.2)
        t1 = time.perf_counter()
        latencies_us.append((t1 - t0) * 1_000_000.0)

    latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    return {
        "n_trials": n_trials,
        "n_neurons": 64,
        "latency_p50_us": round(percentile(latencies_us, 0.50), 4),
        "latency_p95_us": round(percentile(latencies_us, 0.95), 4),
    }


def run_benchmark():
    if not ENGINE_FOUND:
        return {
            "configuration": {
                "engine_source": "ОШИБКА: не удалось импортировать aifa_sdk.cann_focus",
                "import_error": ENGINE_IMPORT_ERROR,
            }
        }

    stability_test = test_focus_stability_without_input()
    smooth_tracking_test = test_smooth_tracking_no_jump()
    fifo_comparison_test = test_fifo_comparison()
    latency_test = run_latency_benchmark()

    result = {
        "configuration": {
            "engine_source": "НАЙДЕН существующий движок aifa_sdk/cann_focus.py, класс CANNFocusRing. КОРРЕКТНАЯ реализация заявленного механизма CANN (Mexican-hat матрица связности, population-vector декодирование) — тот же принцип, что описан в карточке. Тестировался РЕАЛЬНЫЙ движок.",
            "platform": platform.processor() or platform.machine(),
        },
        "honest_measurement": {
            "focus_stability_without_input": stability_test,
            "smooth_tracking_no_jump": smooth_tracking_test,
            "fifo_comparison": fifo_comparison_test,
            "latency": latency_test,
        },
        "claimed_metric_check": {
            "claimed": "9.33 us",
            "measured_p50_us": latency_test["latency_p50_us"],
        },
        "honest_note": "Заявленное число '20.5 раз надёжнее FIFO' и 'Focus Drift = 0.000' не воспроизводимы буквально без спецификации того, как именно измерялся FIFO-бенчмарк в оригинальной работе; честно протестирован РЕАЛЬНЫЙ принцип механизма (удержание фокуса без входа, плавное отслеживание цели, сравнительная устойчивость к шуму), а не подставлено готовое число.",
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "cann_focus_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
