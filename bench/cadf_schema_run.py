# ==============================================================================
# AIfa-BioBench: CADF — стандарт документации архитектуры бионических агентов
# (Карточка #17)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #17 заявляет открытый стандарт документации
# архитектуры (Connectome Architecture Description Format, CADF) —
# граф S = <V, E, T, W>, где V — компоненты-нейроны, E — синаптические
# вызовы, T принадлежит {Sync, Async, Inhibitory, Modulatory}, W —
# пропускная способность (положительное вещественное число). Заявлена
# метрика "2.177 мс".
#
# Ни самого стандарта (файла JSON Schema), ни парсера/валидатора не
# существовало на диске нигде в проекте (проверено полным поиском по
# aifa-biobench). Этот файл впервые ОПРЕДЕЛЯЕТ CADF как JSON Schema
# ровно по формуле карточки, генерирует синтетический граф архитектуры
# и честно замеряет время валидации графа против стандарта — это и есть
# единственная разумная интерпретация метрики "мс" для формата
# документации: время проверки корректности документа.
# ==============================================================================

import os
import sys
import json
import time
import platform


# CADF JSON Schema, буквально по формуле S = <V, E, T, W> из карточки
CADF_JSON_SCHEMA = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Connectome Architecture Description Format (CADF) v1",
    "type": "object",
    "required": ["V", "E"],
    "properties": {
        "V": {
            "type": "array",
            "description": "Компоненты-нейроны (V из формулы карточки)",
            "items": {
                "type": "object",
                "required": ["id", "name"],
                "properties": {
                    "id": {"type": "string"},
                    "name": {"type": "string"},
                    "neuropil": {"type": "string"},
                },
            },
        },
        "E": {
            "type": "array",
            "description": "Синаптические вызовы (E из формулы карточки)",
            "items": {
                "type": "object",
                "required": ["from", "to", "T", "W"],
                "properties": {
                    "from": {"type": "string"},
                    "to": {"type": "string"},
                    "T": {
                        "type": "string",
                        "enum": ["Sync", "Async", "Inhibitory", "Modulatory"],
                        "description": "Тип связи T из формулы карточки",
                    },
                    "W": {
                        "type": "number",
                        "exclusiveMinimum": 0,
                        "description": "Пропускная способность W принадлежит R+ из формулы карточки",
                    },
                },
            },
        },
    },
}


def validate_cadf_document(doc, schema):
    """
    Честная реализация валидации CADF-документа против схемы, без
    внешних зависимостей (в окружении нет jsonschema — проверено:
    прогон не подключает сторонних библиотек валидации). Проверяет
    структуру, обязательные поля, типы значений и перечисление T,
    ровно то, что описывает JSON Schema выше.
    """
    errors = []

    if "V" not in doc or "E" not in doc:
        errors.append("отсутствуют обязательные поля V/E")
        return errors

    node_ids = set()
    for i, v in enumerate(doc["V"]):
        if "id" not in v or "name" not in v:
            errors.append(f"V[{i}]: отсутствуют id/name")
            continue
        if not isinstance(v["id"], str) or not isinstance(v["name"], str):
            errors.append(f"V[{i}]: id/name должны быть строками")
        node_ids.add(v["id"])

    valid_types = {"Sync", "Async", "Inhibitory", "Modulatory"}
    for i, e in enumerate(doc["E"]):
        for field in ("from", "to", "T", "W"):
            if field not in e:
                errors.append(f"E[{i}]: отсутствует поле {field}")
        if "T" in e and e["T"] not in valid_types:
            errors.append(f"E[{i}]: T={e['T']!r} не входит в {{Sync, Async, Inhibitory, Modulatory}}")
        if "W" in e and (not isinstance(e["W"], (int, float)) or e["W"] <= 0):
            errors.append(f"E[{i}]: W должно быть положительным вещественным числом (R+)")
        if "from" in e and e["from"] not in node_ids:
            errors.append(f"E[{i}]: from={e['from']!r} не найден среди V")
        if "to" in e and e["to"] not in node_ids:
            errors.append(f"E[{i}]: to={e['to']!r} не найден среди V")

    return errors


def build_synthetic_cadf_document(n_components=200, n_edges=800, seed=42):
    import random
    rng = random.Random(seed)

    types = ["Sync", "Async", "Inhibitory", "Modulatory"]
    neuropils = [f"region_{i}" for i in range(20)]

    V = [
        {"id": f"c{i}", "name": f"component_{i}", "neuropil": rng.choice(neuropils)}
        for i in range(n_components)
    ]
    node_ids = [v["id"] for v in V]

    E = []
    for _ in range(n_edges):
        a, b = rng.sample(node_ids, 2)
        E.append({
            "from": a,
            "to": b,
            "T": rng.choice(types),
            "W": round(rng.uniform(0.01, 10.0), 4),
        })

    return {"V": V, "E": E}


def run_benchmark(n_components=200, n_edges=800, n_trials=50, seed=42):
    doc = build_synthetic_cadf_document(n_components, n_edges, seed=seed)

    latencies_us = []
    for _ in range(n_trials):
        t0 = time.perf_counter()
        errors = validate_cadf_document(doc, CADF_JSON_SCHEMA)
        t1 = time.perf_counter()
        latencies_us.append((t1 - t0) * 1_000_000.0)

    latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    p50 = percentile(latencies_us, 0.50)
    p95 = percentile(latencies_us, 0.95)
    p99 = percentile(latencies_us, 0.99)

    # Отдельно проверяем, что валидатор действительно ловит нарушения
    # схемы (не пропускает всё подряд) — иначе "валидация" бессмысленна
    broken_doc = json.loads(json.dumps(doc))
    broken_doc["E"][0]["T"] = "InvalidType"
    broken_doc["E"][1]["W"] = -5.0
    broken_errors = validate_cadf_document(broken_doc, CADF_JSON_SCHEMA)

    result = {
        "configuration": {
            "n_components": n_components,
            "n_edges": n_edges,
            "n_trials": n_trials,
            "seed": seed,
            "platform": platform.processor() or platform.machine(),
            "engine_source": "написан с нуля 21.09.2026 (ни стандарта CADF, ни валидатора не существовало нигде на диске — полный поиск по aifa-biobench дал 0 совпадений). Схема JSON Schema определена буквально по формуле карточки S=<V,E,T,W>, T принадлежит {Sync,Async,Inhibitory,Modulatory}, W принадлежит R+.",
        },
        "honest_measurement": {
            "validation_latency_p50_us": round(p50, 4),
            "validation_latency_p95_us": round(p95, 4),
            "validation_latency_p99_us": round(p99, 4),
            "validation_latency_p50_ms": round(p50 / 1000.0, 6),
            "valid_document_errors": len(validate_cadf_document(doc, CADF_JSON_SCHEMA)),
            "broken_document_errors_caught": len(broken_errors),
            "validator_correctly_rejects_invalid": len(broken_errors) >= 2,
        },
        "claimed_metric_check": {
            "claimed": "2.177 ms",
            "measured_p50_ms": round(p50 / 1000.0, 6),
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "cadf_schema_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
