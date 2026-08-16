# -*- coding: utf-8 -*-
"""Проставляет НАСТОЯЩИЕ длительности трекам радио вместо выдуманных 300 секунд.

Что было. У всех 596 треков в каталоге поле duration равнялось ровно 300 —
одно значение на всю базу. Оно печаталось человеку («5:00» напротив каждого
трека, «Runtime ≈ 50 h») и уходило поисковикам в разметке MusicRecording как
PT5M0S. Любой, кто включал трек, видел расхождение с первой секунды.

Как чинится. Длительность читается ffprobe прямо из файла в облаке: по HTTP он
тянет только заголовок, а не весь трек, поэтому 596 файлов обходятся за минуты,
а не за часы. Ничего, кроме поля duration, в файле не трогается.

Осторожность. Перед правкой делается копия stations.ts рядом. Если для трека
длительность прочитать не удалось, его значение остаётся прежним и он
перечисляется в конце — молчаливо оставить выдуманное число хуже, чем признать,
что этот один не прочитался.
"""
import io, os, re, json, shutil, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor

FP = r"C:\ffmpeg\ffprobe.exe"
ФАЙЛ = r"F:\CODE\radiocode-space\src\lib\stations.ts"
ПОТОКОВ = 8


def длительность(url):
    """Секунды из заголовка файла. None, если прочитать не удалось."""
    try:
        r = subprocess.run(
            [FP, "-v", "error", "-show_entries", "format=duration",
             "-of", "default=noprint_wrappers=1:nokey=1",
             "-user_agent", "Mozilla/5.0", url],
            capture_output=True, text=True, timeout=90)
        з = r.stdout.strip().replace(",", ".")
        return round(float(з)) if з else None
    except Exception:
        return None


def main():
    s = io.open(ФАЙЛ, encoding="utf-8").read()

    # Каждый трек — объект, где рядом стоят "url" и "duration".
    блоки = list(re.finditer(
        r'"url":\s*"([^"]+)",\s*\n(\s*)"duration":\s*(\d+)', s))
    print(f"треков с длительностью: {len(блоки)}")
    if not блоки:
        print("не нашла ни одного — формат файла изменился, ничего не трогаю")
        return 1

    старые = {int(м.group(3)) for м in блоки}
    print(f"различных значений сейчас: {len(старые)} → {sorted(старые)[:5]}")

    адреса = [м.group(1) for м in блоки]
    print(f"читаю длительности в {ПОТОКОВ} потоков…", flush=True)
    начало = time.time()

    итог = [None] * len(адреса)
    with ThreadPoolExecutor(max_workers=ПОТОКОВ) as пул:
        for i, д in enumerate(пул.map(длительность, адреса)):
            итог[i] = д
            if (i + 1) % 50 == 0:
                print(f"  {i+1}/{len(адреса)}  ({time.time()-начало:.0f} c)", flush=True)

    прочитано = [д for д in итог if д]
    не_вышло = [(i, адреса[i]) for i, д in enumerate(итог) if not д]
    print(f"\nпрочитано: {len(прочитано)} из {len(адреса)}")
    if прочитано:
        print(f"диапазон: {min(прочитано)} … {max(прочитано)} c, "
              f"различных значений: {len(set(прочитано))}")

    # Собираем файл заново, заменяя ТОЛЬКО число в duration.
    куски, конец = [], 0
    for м, д in zip(блоки, итог):
        if д is None:
            continue
        нач_числа = м.start(3)
        куски.append(s[конец:нач_числа])
        куски.append(str(д))
        конец = м.end(3)
    куски.append(s[конец:])
    новый = "".join(куски)

    копия = ФАЙЛ + ".before_durations"
    if not os.path.exists(копия):
        shutil.copy2(ФАЙЛ, копия)
        print(f"копия прежнего файла: {копия}")

    io.open(ФАЙЛ, "w", encoding="utf-8", newline="").write(новый)

    # Проверка после записи: считаем заново по получившемуся файлу.
    п = io.open(ФАЙЛ, encoding="utf-8").read()
    стало = [int(x) for x in re.findall(r'"duration":\s*(\d+)', п)]
    print(f"\nпосле правки: {len(стало)} значений, различных {len(set(стало))}")
    print(f"осталось равных 300: {sum(1 for x in стало if x == 300)}")
    if не_вышло:
        print(f"\nНЕ прочитались, длительность оставлена прежней: {len(не_вышло)}")
        for i, u in не_вышло[:10]:
            print("  " + u.rsplit("/", 1)[-1])
    return 0


if __name__ == "__main__":
    sys.exit(main())
