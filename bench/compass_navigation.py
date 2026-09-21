# ==============================================================================
# AIfa-BioBench: Compass Navigation / CX Steering (Карточка #3 и #21)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# Реализация формулы, заявленной на карточке #3 страницы /digital и /acr:
#
#   V_err = P_target - P_current
#   theta_heading = atan2(V_err.y, V_err.x)
#   J(n_next) = alpha * ||V_next - V_target|| + beta * Cost_focus(n_curr, n_next)
#
# Baseline для сравнения — линейный перебор клавишей Tab (DOM-порядок),
# ровно тот, с которым сравнивает сама карточка ("12-18 итераций слепого
# поиска по DOM" у baseline-агентов).
#
# 21.09.2026: до этого скрипта карточки #3/#21 не имели ни одной строки
# кода. Заявленные числа ("1.12 шага", "сокращение с 19.7 до 1.12", "16x
# ускорение", "91% снижение ошибочных кликов") никогда не были измерены.
# Этот скрипт честно строит синтетическое дерево DOM-узлов со случайными
# 2D-координатами и меряет число шагов до целевого узла для (а) линейного
# Tab-перебора и (б) векторной навигации CX Steering с исключением
# повторных посещений (это и есть "не бесконечные циклы" из формулы).
# ==============================================================================

import os
import json
import platform
import argparse
import numpy as np


def build_random_dom_tree(n_nodes: int, seed: int, canvas_size: float = 1000.0):
    """
    Синтетическое дерево DOM-узлов: каждый узел имеет 2D-координату на
    экране (типичная веб-страница) и топологический DOM-индекс (порядок
    обхода Tab совпадает с topological_index).
    """
    rng = np.random.RandomState(seed)
    coords = rng.uniform(0, canvas_size, size=(n_nodes, 2))
    # DOM-порядок = порядок обхода Tab; для честности он НЕ совпадает с
    # порядком по расстоянию до случайной цели (иначе Tab был бы уже оптимален)
    dom_order = np.arange(n_nodes)
    rng.shuffle(dom_order)
    return coords, dom_order


def tab_baseline_steps(coords, dom_order, start_idx, target_idx):
    """
    Линейный перебор Tab: агент последовательно проходит DOM-порядок,
    начиная от текущей позиции, пока не дойдёт до целевого узла.
    Возвращает число нажатий Tab.
    """
    start_pos_in_order = np.where(dom_order == start_idx)[0][0]
    target_pos_in_order = np.where(dom_order == target_idx)[0][0]
    n = len(dom_order)
    # Циклический перебор вперёд по DOM-порядку
    steps = (target_pos_in_order - start_pos_in_order) % n
    return max(steps, 1)


def cx_steering_navigate(coords, start_idx, target_idx, alpha=1.0, beta=2.0,
                          k_neighbors=8, max_steps=200):
    """
    Векторная навигация CX Steering:
    на каждом шаге среди k_neighbors ближайших к текущему узлу неисследованных
    кандидатов выбирается тот, что минимизирует J(n_next) = alpha*||V_next-V_target||
    + beta*Cost_focus(n_curr, n_next), где Cost_focus штрафует повторное
    посещение уже пройденных узлов (штраф = бесконечность для visited),
    что и обеспечивает "топологическую невозможность зацикливания" из
    формулы карточки.
    """
    n_nodes = len(coords)
    target_pos = coords[target_idx]
    current_idx = start_idx
    visited = {start_idx}
    steps = 0

    while current_idx != target_idx and steps < max_steps:
        current_pos = coords[current_idx]
        dists_to_current = np.linalg.norm(coords - current_pos, axis=1)
        candidate_order = np.argsort(dists_to_current)
        candidate_order = candidate_order[candidate_order != current_idx][:k_neighbors]

        best_j = None
        best_candidate = None
        for cand in candidate_order:
            if cand in visited and cand != target_idx:
                cost_focus = 1e9  # штраф за повторное посещение (кроме цели)
            else:
                cost_focus = 0.0
            v_next_to_target = np.linalg.norm(coords[cand] - target_pos)
            j_value = alpha * v_next_to_target + beta * cost_focus
            if best_j is None or j_value < best_j:
                best_j = j_value
                best_candidate = cand

        if best_candidate is None:
            break  # некуда идти — все соседи посещены
        current_idx = best_candidate
        visited.add(current_idx)
        steps += 1

    return steps if current_idx == target_idx else max_steps


def run_benchmark(n_nodes=50, n_trials=200, seed=42):
    rng = np.random.RandomState(seed)
    tab_steps_all = []
    cx_steps_all = []
    cx_success = 0

    for trial in range(n_trials):
        trial_seed = seed + trial
        coords, dom_order = build_random_dom_tree(n_nodes, seed=trial_seed)
        trial_rng = np.random.RandomState(trial_seed + 1)
        start_idx, target_idx = trial_rng.choice(n_nodes, size=2, replace=False)

        tab_steps = tab_baseline_steps(coords, dom_order, start_idx, target_idx)
        cx_steps = cx_steering_navigate(coords, start_idx, target_idx)

        tab_steps_all.append(tab_steps)
        cx_steps_all.append(cx_steps)
        if cx_steps < n_nodes:  # не упёрлись в max_steps-затык
            cx_success += 1

    tab_mean = float(np.mean(tab_steps_all))
    cx_mean = float(np.mean(cx_steps_all))
    speedup = tab_mean / cx_mean if cx_mean > 0 else float("inf")

    result = {
        "configuration": {
            "n_nodes_per_trial": n_nodes,
            "n_trials": n_trials,
            "seed": seed,
            "platform": platform.processor() or platform.machine(),
        },
        "metrics": {
            "tab_baseline_mean_steps": round(tab_mean, 2),
            "cx_steering_mean_steps": round(cx_mean, 2),
            "speedup_x": round(speedup, 2),
            "cx_success_rate": round(cx_success / n_trials, 4),
        },
    }
    return result


def main():
    parser = argparse.ArgumentParser(description="AIfa CX Steering / Compass Navigation benchmark")
    parser.add_argument("--n-nodes", type=int, default=50)
    parser.add_argument("--n-trials", type=int, default=200)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    result = run_benchmark(n_nodes=args.n_nodes, n_trials=args.n_trials, seed=args.seed)

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "compass_navigation_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
