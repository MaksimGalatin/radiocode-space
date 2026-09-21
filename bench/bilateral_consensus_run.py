# ==============================================================================
# AIfa-BioBench: Билатеральное зеркалирование вердиктов (Билатеральный
# консенсус полушарий) (Карточка #29)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #29 заявляет билатеральный консенсус двух
# независимых "полушарий" (агрессивный скептик-критик и конструктивный
# оптимист) через КОСИНУСНОЕ СХОДСТВО векторов вердиктов, умноженное на
# индикатор совпадения самих вердиктов:
#
#   C = sigma( <V_L, V_R> / (||V_L|| * ||V_R||) ) * I(Verdict_L == Verdict_R)
#
# Порог консенсуса заявлен C > 0.95. Метрика "0.20 us". Заявлено
# подавление галлюцинаций на 84.6% (поле math) ИЛИ на 99.1% (поле
# competitors) — РАСХОЖДЕНИЕ ВНУТРИ КАРТОЧКИ, найдено при чтении.
#
# ГОТОВЫЙ ДВИЖОК НАЙДЕН: aifa_sdk/bilateral_verifier.py, класс
# BilateralVerifier. НО его формула ДРУГАЯ, чем заявлено в карточке:
#
#   concordance = sqrt(score_left * score_right) * (1 - 0.4 * |sl - sr|)
#   approved = concordance >= 0.52   (порог 0.52, НЕ 0.95!)
#
# Это скалярное среднее геометрическое двух ЧИСЕЛ (score_left, score_right
# в диапазоне 0..1), а не косинусное сходство ДВУХ ВЕКТОРОВ вердиктов, и
# порог 0.52, а не заявленный в карточке 0.95. КЛАСС РАСХОЖДЕНИЯ ТОТ ЖЕ,
# что на карточке #21: формула заявлена одна, в коде реализована другая.
#
# Этот файл честно тестирует РЕАЛЬНЫЙ движок (не выдуманную по формуле
# карточки реализацию) на заявленном СВОЙСТВЕ: должен ли он отклонять
# "галлюцинацию" — случай, когда одно полушарие уверено, а другое нет.
# ==============================================================================

import os
import sys
import json
import time
import platform

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "aifa-biobench"))

try:
    from aifa_sdk.bilateral_verifier import BilateralVerifier
    ENGINE_FOUND = True
except Exception as e:
    ENGINE_FOUND = False
    ENGINE_IMPORT_ERROR = str(e)


def test_hallucination_rejection(verifier, seed=42):
    """
    Честная проверка заявленного свойства: если оба полушария уверены
    и согласны (высокие, близкие оценки) — консенсус должен ПРИНЯТЬ.
    Если одно уверено, а другое сомневается (типичная галлюцинация одной
    из моделей) — консенсус должен ОТКЛОНИТЬ.
    """
    import random
    rng = random.Random(seed)

    # Случай 1: оба полушария согласны и уверены (не галлюцинация)
    agreement_cases = []
    for _ in range(50):
        base = rng.uniform(0.85, 1.0)
        sl = base
        sr = base + rng.uniform(-0.03, 0.03)  # почти идентично
        result = verifier.verify(sl, sr)
        agreement_cases.append(result["status"] == "APPROVED")

    # Случай 2: явная асимметрия (одно полушарие "видит" опасность,
    # другое нет) — классический сценарий из биологической части карточки
    hallucination_cases = []
    for _ in range(50):
        sl = rng.uniform(0.85, 1.0)   # одно уверено
        sr = rng.uniform(0.0, 0.15)   # другое почти уверено в обратном
        result = verifier.verify(sl, sr)
        hallucination_cases.append(result["status"] != "APPROVED")  # должно ОТКЛОНИТЬ

    n_agreement_correctly_approved = sum(agreement_cases)
    n_hallucination_correctly_rejected = sum(hallucination_cases)

    return {
        "n_agreement_trials": 50,
        "n_agreement_correctly_approved": n_agreement_correctly_approved,
        "claim_agreement_approved": n_agreement_correctly_approved == 50,
        "n_hallucination_trials": 50,
        "n_hallucination_correctly_rejected": n_hallucination_correctly_rejected,
        "claim_hallucination_rejected": n_hallucination_correctly_rejected == 50,
    }


def run_latency_benchmark(verifier, n_trials=2000):
    """Замер задержки одного вызова verify()."""
    import random
    rng = random.Random(0)
    latencies_us = []

    for _ in range(n_trials):
        sl = rng.uniform(0, 1)
        sr = rng.uniform(0, 1)
        t0 = time.perf_counter()
        _ = verifier.verify(sl, sr)
        t1 = time.perf_counter()
        latencies_us.append((t1 - t0) * 1_000_000.0)

    latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    return {
        "n_trials": n_trials,
        "latency_p50_us": round(percentile(latencies_us, 0.50), 4),
        "latency_p95_us": round(percentile(latencies_us, 0.95), 4),
    }


def measure_actual_threshold_used(verifier):
    """Честно печатает РЕАЛЬНЫЙ порог консенсуса из живого объекта движка."""
    return {
        "actual_consensus_threshold_in_code": verifier.consensus_threshold,
        "claimed_threshold_in_card": 0.95,
        "thresholds_match": abs(verifier.consensus_threshold - 0.95) < 1e-6,
    }


def run_benchmark():
    if not ENGINE_FOUND:
        return {
            "configuration": {
                "engine_source": "ОШИБКА: не удалось импортировать aifa_sdk.bilateral_verifier",
                "import_error": ENGINE_IMPORT_ERROR,
            }
        }

    verifier = BilateralVerifier()

    threshold_check = measure_actual_threshold_used(verifier)
    hallucination_test = test_hallucination_rejection(verifier)
    latency_test = run_latency_benchmark(verifier)

    result = {
        "configuration": {
            "engine_source": "НАЙДЕН существующий движок aifa_sdk/bilateral_verifier.py, класс BilateralVerifier. ЕГО ФОРМУЛА ДРУГАЯ, чем заявлено в карточке: код использует concordance=sqrt(sl*sr)*(1-0.4*|sl-sr|) на СКАЛЯРАХ (score_left, score_right), карточка заявляет косинусное сходство МЕЖДУ ВЕКТОРАМИ вердиктов. Тестировался РЕАЛЬНЫЙ движок, а не гипотетическая реализация формулы карточки.",
            "platform": platform.processor() or platform.machine(),
        },
        "found_internal_discrepancy_math_field": {
            "description": "Расхождение внутри самой карточки, найдено при чтении текста ДО прогона кода",
            "math_field_says": "подавление галлюцинаций на 84.6%",
            "competitors_field_says": "снижение галлюцинаций LLM на 99.1%",
            "note": "Два разных процента для, по-видимому, одной и той же заявленной способности снижать галлюцинации, в одной карточке на одном языке",
        },
        "found_formula_discrepancy_vs_code": threshold_check,
        "honest_measurement": {
            "hallucination_rejection_test": hallucination_test,
            "latency": latency_test,
        },
        "claimed_metric_check": {
            "claimed": "0.20 us",
            "measured_p50_us": latency_test["latency_p50_us"],
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "bilateral_consensus_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
