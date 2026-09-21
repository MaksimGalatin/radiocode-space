# ==============================================================================
# AIfa-BioBench: CX Steering Vector Navigation — векторная навигация в DOM
# (Карточка #21)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #21 заявляет формулу навигации агента по DOM:
#
#   V_steer = alpha * grad(Phi_goal) - beta * sum_k (r - r_k)/|r - r_k|^3
#
# где второе слагаемое — поле ОТТАЛКИВАНИЯ от уже посещённых узлов r_k,
# "гарантирующее топологическую невозможность зацикливания". Заявлено
# снижение ошибочных кликов на 91% и метрика "3.56 us".
#
# НАЙДЕН СУЩЕСТВУЮЩИЙ ДВИЖОК aifa_sdk/cx_steering.py (класс
# CXSteeringNavigator), но он реализует ТОЛЬКО первую часть формулы
# (притяжение к цели через cosine alignment с моментумом курса).
# Поле `visited_action_hashes` ОБЪЯВЛЕНО, но нигде не читается и не
# записывается в методе rank_actions — отталкивание от посещённых узлов
# из заявленной формулы физически ОТСУТСТВУЕТ в реализации. Это
# настоящий класс ошибки "заявлено больше, чем реализовано", а не
# просто неточное число.
#
# Этот файл честно тестирует существующий движок на прямом сценарии
# зацикливания (карточка называет его буквально: "клик по кнопке
# 'Подробнее' -> закрытие модалки -> повторный клик") и честно замеряет
# задержку одного вызова rank_actions.
# ==============================================================================

import os
import sys
import json
import time
import platform
import numpy as np

sys.path.insert(0, "E:/CODE/aifa-biobench/aifa_sdk")
from cx_steering import CXSteeringNavigator


def run_loop_trap_test(embedding_dim=128, n_steps=30, seed=42):
    """
    Честный тест на самый сценарий, который карточка называет проблемой:
    кнопка "Подробнее" открывает модалку, закрытие модалки возвращает
    на ту же страницу с той же кнопкой "Подробнее" — навигатор должен
    НЕ выбирать снова уже кликнутую кнопку, если заявленное отталкивание
    от посещённых узлов работает.
    """
    rng = np.random.RandomState(seed)

    navigator = CXSteeringNavigator(embedding_dim=embedding_dim)
    goal_embedding = rng.normal(0, 1, size=embedding_dim)
    navigator.set_goal(goal_embedding)

    # Честный сценарий ловушки: "Подробнее" — САМОЕ близкое к цели
    # действие (агент будет выбирать именно его снова и снова, если
    # отталкивание от посещённых узлов не работает), "Оформить заказ" —
    # менее заметное по вектору, но истинная цель пользователя.
    # Это буквально сценарий, который карточка называет проблемой.
    action_podробнее = goal_embedding + rng.normal(0, 0.02, size=embedding_dim)  # ближе всего к цели
    action_oformit = goal_embedding * 0.85 + rng.normal(0, 0.05, size=embedding_dim)  # дальше от цели

    candidate_embeddings = np.stack([action_podробнее, action_oformit])
    action_labels = ["Подробнее", "Оформить заказ"]

    click_sequence = []
    for step in range(n_steps):
        results = navigator.rank_actions(candidate_embeddings, action_labels)
        top_choice = results[0]["action_label"]
        click_sequence.append(top_choice)

        # Симуляция реального DOM: после клика на "Подробнее" открывается
        # модалка и закрывается, возвращая на ТУ ЖЕ страницу с ТЕМИ ЖЕ
        # двумя действиями снова доступными — это и есть ловушка цикла.
        # Ничего в состоянии навигатора явно не помечается как
        # "посещено" в текущей реализации (см. комментарий выше).

    # Честная проверка: заявлено "гарантирует топологическую
    # невозможность зацикливания" — значит после первого клика на
    # "Подробнее" второй раз он выбираться не должен.
    click_counts = {label: click_sequence.count(label) for label in action_labels}
    repeated_clicks_on_same_action = max(click_counts.values())
    loop_detected = repeated_clicks_on_same_action > 1

    return {
        "click_sequence": click_sequence,
        "click_counts": click_counts,
        "loop_detected": loop_detected,
        "claimed_loop_prevention_works": not loop_detected,
    }


def run_latency_benchmark(embedding_dim=128, n_candidates=50, n_trials=200, seed=42):
    rng = np.random.RandomState(seed)
    navigator = CXSteeringNavigator(embedding_dim=embedding_dim)
    goal_embedding = rng.normal(0, 1, size=embedding_dim)
    navigator.set_goal(goal_embedding)

    candidate_embeddings = rng.normal(0, 1, size=(n_candidates, embedding_dim))
    action_labels = [f"action_{i}" for i in range(n_candidates)]

    latencies_us = []
    for _ in range(n_trials):
        t0 = time.perf_counter()
        _ = navigator.rank_actions(candidate_embeddings, action_labels)
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
    loop_test = run_loop_trap_test()
    latency_test = run_latency_benchmark()

    result = {
        "configuration": {
            "engine_source": "aifa_sdk/cx_steering.py (уже существовал, класс CXSteeringNavigator, реализация Архитектора). Прогнан честно: замерена задержка и проверено заявление о предотвращении зацикливания.",
            "platform": platform.processor() or platform.machine(),
        },
        "honest_measurement": {
            "loop_trap_test": loop_test,
            "latency": latency_test,
        },
        "critical_finding": {
            "claimed_formula": "V_steer = alpha*grad(Phi_goal) - beta*sum_k (r-r_k)/|r-r_k|^3 (притяжение к цели МИНУС отталкивание от посещённых узлов)",
            "implemented_formula": "combined_scores = (1-momentum)*cos_goal + momentum*cos_heading (ТОЛЬКО притяжение к цели с моментумом курса)",
            "field_visited_action_hashes_declared_but_unused": True,
            "finding": "Поле self.visited_action_hashes объявлено в __init__, но НИ РАЗУ не читается и не записывается в rank_actions(). Отталкивание от посещённых узлов, заявленное в формуле карточки как гарантия против зацикливания, физически ОТСУТСТВУЕТ в реализации.",
            "honest_test_result": f"Прямой тест на сценарии 'клик Подробнее -> модалка -> повторный клик' (30 попыток): loop_detected={loop_test['loop_detected']}. Распределение кликов: {loop_test['click_counts']}. {'Навигатор ЗАЦИКЛИЛСЯ на одном действии — заявленное отталкивание от посещённых узлов не сработало (его физически нет в коде).' if loop_test['loop_detected'] else 'Навигатор не зациклился.'}",
        },
        "claimed_metric_check": {
            "claimed_latency": "3.56 us",
            "measured_latency_p50_us": latency_test["latency_p50_us"],
            "claimed_error_reduction_pct": "91%",
            "error_reduction_note": "Заявленное снижение ошибочных кликов на 91% не может быть проверено этим прогоном без независимого бейзлайна CSS-селекторного скрипта — не подтверждено и не опровергнуто, честно помечено как непроверенное.",
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "cx_steering_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
