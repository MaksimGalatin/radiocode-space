# ==============================================================================
# AIfa-BioBench: Индекс симбиоза Человек-ИИ (Карточка #10)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #10 заявляет формулу Phi_sym = exp(-lambda*D_KL)
# * Alignment * Trust и метрику "39.7 μs P50", но:
#   - переменные Alignment и Trust нигде не определены числом (текст сам
#     честно признаёт "эмпирическое исследование ... запланировано")
#   - уже существующий движок E:/CODE/aifa-biobench/aifa_sdk/
#     symbiosis_index.py реализует ДРУГУЮ, полностью определённую формулу
#     из 4 множителей (intent_alignment * latency_decay * accuracy_factor
#     * h_synergy), а не заявленную на карточке из 3
#   - движок уже умеет прогонять 1000-ходовую симуляцию и считать
#     latency-метрику, но никогда не запускался для этой карточки
#
# Этот файл — честный запускающий обвес: вызывает уже существующий
# движок SymbiosisIndexEngine.simulate_collaboration_session(), не
# переписывает формулу, честно печатает реальную задержку на ход.
# ==============================================================================

import os
import sys
import json
import platform

sys.path.insert(0, "E:/CODE/aifa-biobench/aifa_sdk")
from symbiosis_index import SymbiosisIndexEngine


def run_benchmark(num_turns=1000, seed=42):
    engine = SymbiosisIndexEngine(window_size=50, seed=seed)
    session = engine.simulate_collaboration_session(num_turns=num_turns)

    result = {
        "configuration": {
            "num_turns": num_turns,
            "seed": seed,
            "platform": platform.processor() or platform.machine(),
            "engine_source": "E:/CODE/aifa-biobench/aifa_sdk/symbiosis_index.py (уже существовал, реализует ДРУГУЮ формулу, чем заявлена на карточке: 4 множителя intent_alignment*latency_decay*accuracy_factor*h_synergy, а не 3 заявленных exp(-lambda*D_KL)*Alignment*Trust — Alignment и Trust на карточке никогда не были определены числом)",
        },
        "honest_session_result": session,
        "formula_reality_check": {
            "claimed_formula": "Phi_sym = exp(-lambda * D_KL(P_intent || P_action)) * Alignment * Trust",
            "claimed_variables_defined": "D_KL — да (формула стандартная); Alignment, Trust — НЕТ, ни разу не определены числом на карточке",
            "actual_formula_in_engine": "Phi_symbiosis = (1 - D_KL(P_intent||P_action)) * exp(-tau/tau_0) * (1 - N_corr/N_int) * H_synergy",
            "actual_variables": "D_KL — Kullback-Leibler между распределением намерения и действия; tau — задержка реакции; N_corr/N_int — доля ручных коррекций оператора; H_synergy — нормализованная энтропийная синергия",
        },
        "claimed_metric_check": {
            "claimed": "39.7 μs P50",
            "measured": f"{session['turn_eval_latency_us']} us per turn (average over {num_turns} turns, not a per-turn P50 percentile)",
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "symbiosis_index_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
