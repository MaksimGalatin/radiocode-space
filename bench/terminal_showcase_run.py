# ==============================================================================
# AIfa-BioBench: Терминальный live showcase коннектома — проекция и сонификация
# (Карточка #20)
# Copyright (c) 2026 CODE Eternal Ecosystem & Maksim Galatin
# Chief Architect, Lead Engineer & Creator: Maxim Valentinovich Galatin
# Licensed under the Apache License, Version 2.0
#
# 21.09.2026: карточка #20 заявляет терминальный live-показ работы
# коннектома — ортографическую проекцию 3D координат (x,y,z) 139 255
# нейронов на псевдографическую сетку терминала (ANSI Unicode braille)
# и сонификацию суммарной синаптической активности через частотную
# модуляцию звука:
#
#   [u,v]^T = R(alpha,beta) * [x,y,z]^T   (ортографическая проекция)
#   f(t) = f0 + k_audio * sum(s_i(t))     (сонификация)
#
# Заявлена метрика "6.99 us".
#
# Готового движка под ИМЕННО эту проекцию/сонификацию в aifa_sdk не
# найдено. Этот файл честно реализует обе части формулы буквально и
# замеряет задержку одного кадра (проекция всех точек + один шаг
# сонификации) на синтетическом наборе координат той же размерности,
# что заявлена на карточке (139 255 нейронов).
# ==============================================================================

import os
import sys
import json
import time
import platform
import numpy as np


def build_orthographic_projection_matrix(alpha, beta):
    """
    Буквальная реализация матрицы проекции из формулы карточки:
    [u,v]^T = R(alpha,beta) * [x,y,z]^T
    """
    R = np.array([
        [np.cos(alpha), -np.sin(alpha), 0.0],
        [np.sin(alpha) * np.cos(beta), np.cos(alpha) * np.cos(beta), -np.sin(beta)],
    ], dtype=np.float64)
    return R


def project_points(coords_xyz, R):
    """coords_xyz: (N, 3) массив координат нейронов -> (N, 2) экранных координат."""
    return coords_xyz @ R.T


def map_to_braille_grid(uv_points, grid_width=160, grid_height=48):
    """
    Отображение спроецированных координат на псевдографическую сетку
    терминала (ANSI Unicode braille символы дают эффективное разрешение
    2x4 суб-пикселя на символ — честно моделируем именно эту сетку,
    а не произвольное округление).
    """
    u_min, u_max = uv_points[:, 0].min(), uv_points[:, 0].max()
    v_min, v_max = uv_points[:, 1].min(), uv_points[:, 1].max()

    u_range = max(1e-9, u_max - u_min)
    v_range = max(1e-9, v_max - v_min)

    # braille-сетка: каждый символ = 2 столбца x 4 строки суб-пикселей
    sub_width = grid_width * 2
    sub_height = grid_height * 4

    px = ((uv_points[:, 0] - u_min) / u_range * (sub_width - 1)).astype(np.int32)
    py = ((uv_points[:, 1] - v_min) / v_range * (sub_height - 1)).astype(np.int32)

    grid = np.zeros((sub_height, sub_width), dtype=np.uint8)
    grid[py, px] = 1
    return grid


def sonify_activity(spike_sums, f0=220.0, k_audio=50.0):
    """
    Буквальная реализация формулы сонификации карточки:
    f(t) = f0 + k_audio * sum(s_i(t))
    spike_sums: массив суммарной активности по времени (уже просуммированной
    по нейропилям, как заявлено в описании — "суммарная синаптическая
    активность нейропиля").
    """
    return f0 + k_audio * spike_sums


def run_benchmark(n_neurons=139255, n_frames=60, seed=42):
    rng = np.random.RandomState(seed)

    # Синтетические 3D координаты нейронов — реалистичный масштаб
    # коннектома дрозофилы (объём мозга ~500x300x200 микрон)
    coords_xyz = rng.uniform(low=[-250, -150, -100], high=[250, 150, 100], size=(n_neurons, 3))

    frame_latencies_us = []
    sonify_latencies_us = []
    single_point_latencies_us = []
    single_point = coords_xyz[0:1]

    for frame_i in range(n_frames):
        alpha = frame_i * 0.05  # вращение камеры кадр за кадром
        beta = 0.3

        t0 = time.perf_counter()
        R = build_orthographic_projection_matrix(alpha, beta)
        uv = project_points(coords_xyz, R)
        grid = map_to_braille_grid(uv)
        t1 = time.perf_counter()
        frame_latencies_us.append((t1 - t0) * 1_000_000.0)

        # Отдельный замер задержки проекции ОДНОЙ точки (аналог заявленной
        # метрики "6.99 us" — вероятно, это задержка одной точки, а не
        # всего кадра, поэтому меряем обе величины честно и раздельно)
        t_sp0 = time.perf_counter()
        _ = project_points(single_point, R)
        t_sp1 = time.perf_counter()
        single_point_latencies_us.append((t_sp1 - t_sp0) * 1_000_000.0)

        # Сонификация: синтетическая суммарная активность нейропиля на этом кадре
        spike_sum = rng.poisson(lam=50.0)
        t2 = time.perf_counter()
        freq = sonify_activity(spike_sum)
        t3 = time.perf_counter()
        sonify_latencies_us.append((t3 - t2) * 1_000_000.0)

    frame_latencies_us.sort()
    sonify_latencies_us.sort()
    single_point_latencies_us.sort()

    def percentile(arr, p):
        return arr[min(len(arr) - 1, int(len(arr) * p))]

    frame_p50 = percentile(frame_latencies_us, 0.50)
    frame_p95 = percentile(frame_latencies_us, 0.95)
    sonify_p50 = percentile(sonify_latencies_us, 0.50)
    single_point_p50 = percentile(single_point_latencies_us, 0.50)

    fps_achievable = 1_000_000.0 / frame_p50 if frame_p50 > 0 else 0.0

    result = {
        "configuration": {
            "n_neurons": n_neurons,
            "n_frames": n_frames,
            "grid_size": "160x48 (320x192 суб-пикселей braille)",
            "seed": seed,
            "platform": platform.processor() or platform.machine(),
            "engine_source": "написано с нуля 21.09.2026 (готового движка под эту проекцию/сонификацию в aifa_sdk не найдено); буквальная реализация формул карточки: ортографическая проекция [u,v]=R(alpha,beta)*[x,y,z], сонификация f(t)=f0+k_audio*sum(s_i(t))",
        },
        "honest_measurement": {
            "frame_render_latency_p50_us_full_139k_neurons": round(frame_p50, 4),
            "frame_render_latency_p95_us": round(frame_p95, 4),
            "sonification_latency_p50_us": round(sonify_p50, 4),
            "single_point_projection_latency_p50_us": round(single_point_p50, 4),
            "achievable_fps_full_projection": round(fps_achievable, 2),
        },
        "claimed_metric_check": {
            "claimed": "6.99 us",
            "claimed_fps": "60 FPS (упомянуто в конкурентном сравнении карточки)",
            "measured_single_point_latency_us": round(single_point_p50, 4),
            "measured_full_frame_latency_us": round(frame_p50, 4),
            "measured_achievable_fps": round(fps_achievable, 2),
            "fps_claim_confirmed": fps_achievable >= 60.0,
        },
    }
    return result


def main():
    result = run_benchmark()

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "results")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "terminal_showcase_result.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)

    print(json.dumps(result, indent=2, ensure_ascii=False))
    print(f"\nСохранено: {out_path}")


if __name__ == "__main__":
    main()
