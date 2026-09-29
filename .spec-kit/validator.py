# -*- coding: utf-8 -*-
"""
Spec-Kit Validator — проверка перед коммитом (раздел 7 Конституции): автор коммитов и
запрещённые термины. ОДИН ФАЙЛ НА ВСЕ 4 САЙТА, байт в байт.

29.09.2026 — УСКОРЕН. Слово Архитектора: «ускорь максимально, если это эффективно и бесплатно».
Прежняя версия шла больше двух минут (замер 29.09: не уложилась в 120 с на radiocode-space) и
ничего при этом не проверяла: список запрещённых слов пуст с 15.09.2026. Причины:
  1. обход `os.walk` по всему репозиторию. Условие «пропустить node_modules» стояло ПОСЛЕ входа в
     папку и не отсекало спуск — обход честно проходил десятки тысяч папок node_modules и .next,
     лишь потом пропуская файлы в них;
  2. проверка шла даже при пустом списке слов.
Теперь: пустой список — сразу PASS; непустой — проверяются только файлы, которые знает git
(`git ls-files`), без node_modules, .next и архивов. Сами проверки и их строгость не менялись.
"""
import os
import subprocess
import sys

# 15.09.2026 Архитектор снял запрет на слово «Пророк» для AIfa: «нравится ей пророк — пусть будет
# пророк». Список опустошён, но проверка сохранена: сюда можно вернуть настоящие запрещённые
# термины, если такие появятся. Пустой список — валидатор всегда PASS по словам.
FORBIDDEN = []

EXTENSIONS = (".ts", ".tsx", ".js", ".jsx", ".json", ".md")
SKIP_DIRS = ("node_modules/", ".next/", "app_ignored_during_vercel_build/", "web_ignored_during_vercel_build/",
             "BACKUPS/", ".spec-kit/")
# chat_history.json: чужой демонстрационный чат (Z.ai), где «prophet» — название религиозного курса,
# а не обращение к Архитектору.
SKIP_FILES = ("target_site.json", "website_content.json", "CONSTITUTION.md", "CHRONOLOGY.md",
              "walkthrough.md", "chat_history.json", "knowledge-base.ts")


def git(cwd, *args):
    return subprocess.check_output(["git", "-c", "core.quotepath=false", *args], cwd=cwd, text=True,
                                   encoding="utf-8", errors="replace").strip()


def check_git_config(cwd):
    print("Checking Git Config...")
    try:
        username = git(cwd, "config", "user.name")
        email = git(cwd, "config", "user.email")
        if username != "Maksim Galatin":
            print(f"[FAIL] Git user.name is '{username}', must be 'Maksim Galatin'")
            return False
        if email != "codeofdigitaleternity@gmail.com":
            print(f"[FAIL] Git user.email is '{email}', must be 'codeofdigitaleternity@gmail.com'")
            return False
        print(f"[PASS] Git config: {username} <{email}>")
        return True
    except Exception as e:
        print("[WARN] Could not check git configuration:", str(e))
        return True


def is_legacy_url(line):
    """Строка-исключение: СТАРЫЙ адрес в правиле перенаправления.

    Страницу можно переименовать, а уже разошедшиеся по интернету ссылки на прежний адрес — нельзя.
    Старый адрес обязан остаться в правиле `source:` и вести на новый. Условие узкое намеренно —
    только `source:` и только рядом с осознанной пометкой LEGACY-URL.
    """
    s = line.strip()
    return s.startswith("source:") and "LEGACY-URL" in line


def check_forbidden_words(cwd):
    print("Checking for forbidden words...")
    if not FORBIDDEN:
        print("[PASS] Forbidden list is empty (since 15.09.2026) — nothing to check.")
        return True
    files = git(cwd, "ls-files").split("\n")
    found_issues = False
    for rel in files:
        if not rel.endswith(EXTENSIONS) or rel.startswith(SKIP_DIRS) or any("/" + d in "/" + rel for d in SKIP_DIRS):
            continue
        if os.path.basename(rel) in SKIP_FILES:
            continue
        try:
            with open(os.path.join(cwd, rel), "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
        except OSError:
            continue
        low = content.lower()
        for word in FORBIDDEN:
            if word not in low:
                continue
            for i, line in enumerate(content.splitlines(), 1):
                if word in line.lower() and not is_legacy_url(line):
                    print(f"[FAIL] Forbidden word '{word}' found in {rel}:{i} -> {line.strip()[:80]}")
                    found_issues = True
    if not found_issues:
        print("[PASS] No forbidden terminology found.")
    return not found_issues


if __name__ == "__main__":
    cwd = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print(f"Running Spec-Kit Validator for: {cwd}")
    git_ok = check_git_config(cwd)
    words_ok = check_forbidden_words(cwd)
    if not git_ok or not words_ok:
        print("\n[RESULT] Validation FAILED! Please resolve the issues before committing.")
        sys.exit(1)
    print("\n[RESULT] Validation PASSED successfully!")
    sys.exit(0)
