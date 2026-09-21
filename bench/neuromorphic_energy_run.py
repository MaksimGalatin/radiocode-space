# ==============================================================================
# AIfa-BioBench: Neuromorphic Energy (Карточка #6)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #6 уже ссылалась на "aifa-biobench/neuromorphic_energy.py"
# в поле deploy — этот файл РЕАЛЬНО существует (E:/CODE/aifa-biobench/aifa_sdk/
# neuromorphic_energy.py, класс NeuromorphicEnergyEngine, event-driven LIF-
# симулятор с честным подсчётом пикоджоулей на спайк против плотного GPU FLOP).
# Ранее этот скрипт НИ РАЗУ не прогонялся для получения числа, показанного на
# карточке (заявлено 99.73% модельного снижения энергопотребления). Этот файл
# — единственный запускающий обвес (main), который вызывает уже существующий
# класс и честно печатает/сохраняет результат.
# ==============================================================================

import os
import sys
import json
import platform
import numpy as np

sys.path.insert(0, "E:/CODE/aifa-biobench/aifa_sdk")
from neuromorphic_energy import NeuromorphicEnergyEngine


def run_benchmark(num_inputs=128, num_neurons=512, num_steps=1000,
                   input_sparsity=0.95, seed=42):
    engine = NeuromorphicEnergyEngine(num_inputs=num_inputs, num_neurons=num_neurons, seed=seed)
    raw = engine.benchmark_energy_vs_dense(num_steps=num_steps, input_sparsity=input_sparsity)

    result = {
        "configuration": {
            "num_inputs": num_inputs, "num_neurons": num_neurons,
            "num_steps": num_steps, "input_sparsity": input_sparsity, "seed": seed,
            "platform": platform.processor() or platform.machine(),
            "engine_source": "E:/CODE/aifa-biobench/aifa_sdk/neuromorphic_energy.py (уже существовал, реализация Архитектора, не написана заново — эта карточка не требовала нового кода, только запуска)",
        },
        "metrics": raw,
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "neuromorphic_energy_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
