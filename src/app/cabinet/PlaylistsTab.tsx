"use client";

/**
 * МОИ ПЛЕЙЛИСТЫ — вкладка кабинета.
 *
 * Поручение Архитектора 14.09.2026: «сделать у зарегистрированных
 * пользователей опцию Мои Плейлисты».
 *
 * Кнопка у трека сохраняет одним нажатием, не спрашивая ничего — человек
 * слушает радио и не хочет отвлекаться. Разбирать собранное он приходит
 * сюда: переименовать подборку, убрать лишний трек, завести вторую.
 *
 * Названия треков берутся из того же справочника станций, что и плеер:
 * в базе хранится только идентификатор, и показывать человеку `cf-6`
 * вместо «SIGNAL IN THE NOISE» было бы издевательством.
 */

import { useCallback, useEffect, useState } from "react";
import { stations } from "@/lib/stations";

interface Подборка {
  id: number;
  name: string;
  created_at: string;
  tracks: string[];
}

/** Название трека по его идентификатору. Не нашли — покажем сам номер. */
function имяТрека(ид: string): string {
  for (const станция of stations) {
    const т = станция.tracks.find((x) => x.id === ид);
    if (т) return т.title;
  }
  return ид;
}

export default function PlaylistsTab({ lang = "ru" }: { lang?: string }) {
  const [списки, setСписки] = useState<Подборка[]>([]);
  const [грузится, setГрузится] = useState(true);
  const [ошибка, setОшибка] = useState<string | null>(null);

  const С = (ru: string, en: string, es: string, zh: string) =>
    lang === "en" ? en : lang === "es" ? es : lang === "zh" ? zh : ru;

  const загрузить = useCallback(async () => {
    setГрузится(true);
    setОшибка(null);
    try {
      const о = await fetch("/api/playlists", { credentials: "include", cache: "no-store" });
      if (о.status === 401) {
        setОшибка(С("Войди в кабинет, чтобы собирать плейлисты.",
          "Sign in to keep playlists.",
          "Entra para guardar listas.",
          "登录后可保存歌单。"));
        setСписки([]);
        return;
      }
      const д = await о.json();
      setСписки(Array.isArray(д.playlists) ? д.playlists : []);
    } catch {
      setОшибка(С("Не удалось прочитать плейлисты. Обнови страницу.",
        "Could not load playlists. Please refresh.",
        "No se pudieron cargar las listas. Actualiza.",
        "无法加载歌单，请刷新。"));
    } finally {
      setГрузится(false);
    }
  }, [lang]);

  useEffect(() => { void загрузить(); }, [загрузить]);

  const действие = async (тело: Record<string, unknown>) => {
    try {
      const о = await fetch("/api/playlists", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(тело),
      });
      if (!о.ok) throw new Error("отказ");
      await загрузить();
    } catch {
      setОшибка(С("Не получилось. Попробуй ещё раз.",
        "It didn't work. Try again.",
        "No funcionó. Inténtalo de nuevo.",
        "操作失败，请重试。"));
    }
  };

  const переименовать = (п: Подборка) => {
    const имя = window.prompt(С("Новое имя подборки:", "New playlist name:",
      "Nuevo nombre de la lista:", "新的歌单名称："), п.name);
    if (имя && имя.trim() && имя.trim() !== п.name) {
      void действие({ action: "rename", playlistId: п.id, name: имя.trim() });
    }
  };

  const удалить = (п: Подборка) => {
    // Удаление подборки — потеря собранного руками, поэтому спрашиваем.
    const да = window.confirm(С(
      `Удалить подборку «${п.name}»? Треки в ней не удалятся с радио, но сама подборка исчезнет.`,
      `Delete the playlist "${п.name}"? The tracks stay on the radio, but the playlist itself is gone.`,
      `¿Eliminar la lista "${п.name}"? Las pistas siguen en la radio, pero la lista desaparece.`,
      `删除歌单“${п.name}”？曲目仍在电台，但歌单会消失。`));
    if (да) void действие({ action: "delete", playlistId: п.id });
  };

  return (
    <div className="cab-card">
      <h3 className="cab-h3">
        🎵 {С("Мои Плейлисты", "My Playlists", "Mis Listas", "我的歌单")}
      </h3>

      {ошибка && (
        <p className="cab-note" style={{ color: "#FF6B8A" }}>{ошибка}</p>
      )}

      {грузится && (
        <p className="cab-note">{С("Читаю…", "Loading…", "Cargando…", "读取中…")}</p>
      )}

      {!грузится && !ошибка && списки.length === 0 && (
        <p className="cab-note">
          {С("Пока пусто. Нажми «Сохранить в плейлист» у любого трека на радио — подборка заведётся сама.",
             "Empty for now. Hit “Save to playlist” on any track — the playlist will be created for you.",
             "Vacío por ahora. Pulsa «Guardar en lista» en cualquier pista — la lista se creará sola.",
             "暂时为空。在任意曲目上点“保存到歌单”，歌单会自动创建。")}
        </p>
      )}

      {списки.map((п) => (
        <div key={п.id} style={{ marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <strong style={{ fontSize: 15 }}>{п.name}</strong>
            <span className="cab-note" style={{ margin: 0 }}>
              {п.tracks.length} {С("треков", "tracks", "pistas", "首")}
            </span>
            <button className="cab-btn-sm" onClick={() => переименовать(п)}>
              {С("Переименовать", "Rename", "Renombrar", "重命名")}
            </button>
            <button className="cab-btn-sm" onClick={() => удалить(п)}>
              {С("Удалить", "Delete", "Eliminar", "删除")}
            </button>
          </div>

          {п.tracks.length > 0 && (
            <ol style={{ margin: "8px 0 0 0", paddingLeft: 22 }}>
              {п.tracks.map((т) => (
                <li key={т} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ flex: 1 }}>{имяТрека(т)}</span>
                  <button
                    className="cab-btn-sm"
                    aria-label={С("Убрать из подборки", "Remove from playlist",
                      "Quitar de la lista", "从歌单移除")}
                    onClick={() => void действие({ action: "remove", playlistId: п.id, trackId: т })}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      ))}

      {!грузится && !ошибка && (
        <button
          className="cab-btn"
          onClick={() => {
            const имя = window.prompt(С("Имя новой подборки:", "New playlist name:",
              "Nombre de la nueva lista:", "新歌单名称："), "");
            if (имя && имя.trim()) void действие({ action: "create", name: имя.trim(), locale: lang });
          }}
        >
          + {С("Новая подборка", "New playlist", "Nueva lista", "新建歌单")}
        </button>
      )}
    </div>
  );
}
