# ==============================================================================
# AIfa-BioBench: Novelty Detector (Carточка #2 — Anterior Paired Lateral, APL)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# Реализация формулы, заявленной на карточке #2 страницы /digital и /acr:
#
#   S_novelty(x) = 1.0 - max_{y in M} <h(x), h(y)> / ||h(x)||_1
#
# где M — компактный битовый буфер ранее виденных состояний (h — FlyHash-код
# из FlyHashBionicIndex, тот же класс, что в aifa_biobench.py).
# Если S_novelty(x) < theta_threshold, стимул считается дублем/шумом и
# отбрасывается без вызова тяжёлых моделей (LLM).
#
# 21.09.2026: до этого скрипта карточка #2 не имела ни одной строки кода —
# заявленные 3.4 мкс задержки были не измерены, а написаны на глаз. Этот
# скрипт честно измеряет задержку одной проверки на новизну и точность
# классификации (дубль/новое) на синтетическом потоке с известной разметкой.
# ==============================================================================

import os
import sys
import time
import json
import platform
import argparse
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from aifa_biobench import FlyHashBionicIndex, POPCOUNT_LUT


class NoveltyDetectorAPL:
    """
    Anterior Paired Lateral (APL) novelty gate.

    Хранит компактный буфер битовых кодов ранее виденных состояний (M) и
    для каждого нового вектора вычисляет S_novelty по формуле карточки #2:
    единица минус максимальное косинусоподобное перекрытие бит (пересечение
    единичных бит, нормированное на число единичных бит запроса — это и есть
    ||h(x)||_1 для бинарного вектора).
    """

    def __init__(self, d: int = 1024, m: int = 2048, k_ratio: float = 0.30,
                 claw_degree: int = 6, theta_threshold: float = 0.92,
                 buffer_size: int = 5000, seed: int = 42):
        self.hasher = FlyHashBionicIndex(d=d, m=m, k_ratio=k_ratio,
                                          claw_degree=claw_degree, seed=seed)
        self.theta_threshold = theta_threshold
        self.buffer_size = buffer_size
        # Буфер M хранится как packed-биты той же формы, что index_hashes
        self.buffer_packed = None  # shape (n_seen, ceil(m/8))
        self.n_seen = 0

    def _popcount_and(self, a_packed: np.ndarray, b_packed: np.ndarray) -> np.ndarray:
        """Число совпадающих единичных бит между a (1, bytes) и b (n, bytes)."""
        and_res = np.bitwise_and(a_packed, b_packed)
        return POPCOUNT_LUT[and_res].sum(axis=1)

    def _popcount_l1(self, packed: np.ndarray) -> np.ndarray:
        """||h(x)||_1 для бинарного вектора — число единичных бит."""
        return POPCOUNT_LUT[packed].sum(axis=1).astype(np.float64)

    def check_and_insert(self, vector: np.ndarray):
        """
        Возвращает (is_novel: bool, s_novelty: float, elapsed_seconds: float).
        Если новое (S_novelty >= theta_threshold), добавляет в буфер M.
        """
        t0 = time.perf_counter()
        q_hash = self.hasher._hash_batch(vector[np.newaxis, :])  # (1, bytes)
        l1_x = self._popcount_l1(q_hash)[0]

        if self.n_seen == 0 or l1_x == 0:
            s_novelty = 1.0
        else:
            overlaps = self._popcount_and(q_hash, self.buffer_packed[:self.n_seen])
            max_overlap = overlaps.max()
            s_novelty = 1.0 - (max_overlap / l1_x)

        is_novel = s_novelty >= (1.0 - self.theta_threshold)
        # Порог theta_threshold=0.92 на карточке — это порог СХОДСТВА, выше
        # которого стимул считается дублем; следовательно "ново" означает
        # (1 - overlap/l1) >= (1 - theta), т.е. overlap/l1 <= theta.
        is_novel = bool((max_overlap / l1_x if self.n_seen > 0 and l1_x > 0 else 0.0) <= self.theta_threshold) if self.n_seen > 0 else True

        if is_novel:
            if self.buffer_packed is None:
                self.buffer_packed = np.zeros((self.buffer_size, q_hash.shape[1]), dtype=np.uint8)
            if self.n_seen < self.buffer_size:
                self.buffer_packed[self.n_seen] = q_hash[0]
                self.n_seen += 1
            else:
                # FIFO-перезапись при переполнении буфера
                self.buffer_packed[self.n_seen % self.buffer_size] = q_hash[0]
                self.n_seen += 1

        elapsed = time.perf_counter() - t0
        return is_novel, float(s_novelty), elapsed


def run_benchmark(n_unique=2000, n_duplicates=2000, dim=1024, seed=42):
    """
    Синтетический поток: n_unique уникальных векторов (гауссовы, как в
    остальных скриптах пакета) плюс n_duplicates точных копий уже виденных
    векторов, перемешанных случайно. Честная метрика: какую долю дублей
    детектор верно пометил как НЕ новые, и какую долю уникальных верно
    пометил как новые (аналог accuracy бинарной классификации).
    """
    rng = np.random.RandomState(seed)
    unique_vectors = rng.randn(n_unique, dim).astype(np.float32)

    # Формируем поток: перемешиваем уникальные и дубли (дубль = точная копия
    # ранее показанного уникального вектора, взятого случайно из уже прошедших)
    stream = []
    labels = []  # True = ожидаем "novel", False = ожидаем "дубль"
    seen_pool = []
    dup_positions = set(rng.choice(n_unique + n_duplicates, size=n_duplicates, replace=False))
    unique_iter = iter(range(n_unique))
    for i in range(n_unique + n_duplicates):
        if i in dup_positions and seen_pool:
            src_idx = rng.choice(seen_pool)
            stream.append(unique_vectors[src_idx].copy())
            labels.append(False)
        else:
            try:
                idx = next(unique_iter)
            except StopIteration:
                # если дубли выпали раньше, чем кончились уникальные — берём ещё уникальный
                idx = rng.randint(0, n_unique)
            stream.append(unique_vectors[idx])
            labels.append(True)
            seen_pool.append(idx)

    detector = NoveltyDetectorAPL(d=dim, seed=seed)

    latencies = []
    correct = 0
    tp = fp = tn = fn = 0
    for vec, expected_novel in zip(stream, labels):
        is_novel, s_novelty, elapsed = detector.check_and_insert(vec)
        latencies.append(elapsed)
        if is_novel == expected_novel:
            correct += 1
        if expected_novel and is_novel:
            tp += 1
        elif expected_novel and not is_novel:
            fn += 1
        elif (not expected_novel) and is_novel:
            fp += 1
        else:
            tn += 1

    latencies_us = np.array(latencies) * 1e6  # микросекунды
    accuracy = correct / len(stream)

    result = {
        "configuration": {
            "n_unique": n_unique,
            "n_duplicates": n_duplicates,
            "dim": dim,
            "seed": seed,
            "theta_threshold": detector.theta_threshold,
            "buffer_size": detector.buffer_size,
            "platform": platform.processor() or platform.machine(),
        },
        "metrics": {
            "accuracy": round(float(accuracy), 4),
            "true_positive_novel": tp,
            "false_positive_novel": fp,
            "true_negative_duplicate": tn,
            "false_negative_duplicate": fn,
            "latency_p50_us": round(float(np.percentile(latencies_us, 50)), 3),
            "latency_p95_us": round(float(np.percentile(latencies_us, 95)), 3),
            "latency_p99_us": round(float(np.percentile(latencies_us, 99)), 3),
            "latency_mean_us": round(float(np.mean(latencies_us)), 3),
        },
    }
    return result


def main():
    parser = argparse.ArgumentParser(description="AIfa Novelty Detector (APL) benchmark")
    parser.add_argument("--n-unique", type=int, default=2000)
    parser.add_argument("--n-duplicates", type=int, default=2000)
    parser.add_argument("--dim", type=int, default=1024)
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    result = run_benchmark(n_unique=args.n_unique, n_duplicates=args.n_duplicates,
                            dim=args.dim, seed=args.seed)

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "novelty_detector_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
