"use client";

/**
 * ПАМЯТЬ → ДОКУМЕНТЫ — 29.09.2026. Один файл на все 4 сайта, байт в байт.
 *
 * Слово Архитектора: «в разделе „Память“ появится вкладка „Документы“ — список, просмотр,
 * скачивание, удаление своего и строка „занято X из Y“ … отлично, так и делай».
 * Данные — /api/documents этого же сайта (спутники пересылают в центр, кабинет единый).
 */
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, Skeleton, ErrorState, EmptyState, ProgressBar, TOKENS } from "./ui";
import { useCabT } from "./i18n";
import { AifaDocButton } from "@/components/AifaDocButton";

type Язык = "ru" | "en" | "es" | "zh";
type Документ = { id: string; name: string; mime: string; kind: string; size_bytes: number; stored: boolean; chars: number; created_at: string };
type Сводка = { usedBytes: number; limitBytes: number; tier: number; count: number; uploadsIn5h: number; uploadsLimit5h: number };

const Т: Record<string, Record<Язык, string>> = {
  заголовок: { ru: "Документы", en: "Documents", es: "Documentos", zh: "文档" },
  подзаголовок: {
    ru: "Файлы, которые ты приложил к разговорам с AIfa. Она прочитала их и может к ним вернуться. Текст, PDF и картинки до 4 МБ.",
    en: "Files you attached to conversations with AIfa. She has read them and can come back to them. Text, PDF and images up to 4 MB.",
    es: "Archivos que adjuntaste en tus conversaciones con AIfa. Los ha leído y puede volver a ellos. Texto, PDF e imágenes de hasta 4 MB.",
    zh: "你在与 AIfa 的对话中添加的文件。她已经读过，并可以随时回看。文本、PDF 和图片，最大 4 MB。",
  },
  занято: { ru: "Занято", en: "Used", es: "Usado", zh: "已用" },
  из: { ru: "из", en: "of", es: "de", zh: "/" },
  загрузок: {
    ru: "Загрузок за 5 часов: {a} из {b}",
    en: "Uploads in the last 5 hours: {a} of {b}",
    es: "Subidas en las últimas 5 horas: {a} de {b}",
    zh: "近 5 小时上传：{a} / {b}",
  },
  пусто: {
    ru: "Документов пока нет. Нажми скрепку в чате AIfa или кнопку выше.",
    en: "No documents yet. Tap the paperclip in AIfa’s chat or the button above.",
    es: "Aún no hay documentos. Pulsa el clip en el chat de AIfa o el botón de arriba.",
    zh: "还没有文档。点击 AIfa 聊天中的回形针，或上方的按钮。",
  },
  загрузить: { ru: "Загрузить документ", en: "Upload a document", es: "Subir un documento", zh: "上传文档" },
  показать: { ru: "Показать текст", en: "Show text", es: "Mostrar texto", zh: "显示文本" },
  скрыть: { ru: "Скрыть текст", en: "Hide text", es: "Ocultar texto", zh: "隐藏文本" },
  скачать: { ru: "Скачать", en: "Download", es: "Descargar", zh: "下载" },
  удалить: { ru: "Удалить", en: "Delete", es: "Eliminar", zh: "删除" },
  подтвердить: {
    ru: "Удалить документ «{n}» навсегда? Оригинал и распознанный текст сотрутся, вернуть их будет нельзя.",
    en: "Delete “{n}” permanently? The original and its recognised text will be erased and cannot be restored.",
    es: "¿Eliminar «{n}» para siempre? Se borrarán el original y su texto reconocido, y no podrán recuperarse.",
    zh: "永久删除“{n}”？原文件和识别出的文本都将被清除，无法恢复。",
  },
  безОригинала: {
    ru: "оригинал не сохранён — хранилище файлов подключается",
    en: "original not stored — file storage is being connected",
    es: "original no guardado: el almacenamiento se está conectando",
    zh: "原文件未保存：文件存储正在接入",
  },
  знаков: { ru: "знаков", en: "characters", es: "caracteres", zh: "字符" },
  ошибка: { ru: "Не удалось загрузить список документов.", en: "Could not load your documents.", es: "No se pudo cargar la lista de documentos.", zh: "无法加载文档列表。" },
  повторить: { ru: "Повторить", en: "Retry", es: "Reintentar", zh: "重试" },
};
const тип = (k: string) => (k === "pdf" ? "📄 PDF" : k === "картинка" ? "🖼️" : "📝");

function размер(байт: number, l: Язык): string {
  const ед = { ru: ["Б", "КБ", "МБ", "ГБ"], en: ["B", "KB", "MB", "GB"], es: ["B", "KB", "MB", "GB"], zh: ["B", "KB", "MB", "GB"] }[l];
  let v = байт, i = 0;
  while (v >= 1024 && i < 3) { v /= 1024; i++; }
  return (i === 0 ? String(v) : v.toFixed(v >= 10 ? 0 : 1)) + " " + ед[i];
}

export default function DocumentsCard() {
  const { lang } = useCabT();
  const l: Язык = lang === "en" || lang === "es" || lang === "zh" ? lang : "ru";
  const [документы, setДокументы] = useState<Документ[] | null>(null);
  const [сводка, setСводка] = useState<Сводка | null>(null);
  const [ошибка, setОшибка] = useState(false);
  const [строка, setСтрока] = useState("");
  const [открыт, setОткрыт] = useState<string>("");
  const [текст, setТекст] = useState<string>("");

  const загрузитьСписок = useCallback(() => {
    setОшибка(false);
    fetch(`/api/documents?locale=${l}`, { cache: "no-store", credentials: "include" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { setДокументы(d.documents || []); setСводка(d.usage || null); })
      .catch(() => setОшибка(true));
  }, [l]);
  useEffect(() => { загрузитьСписок(); }, [загрузитьСписок]);

  async function показать(д: Документ) {
    if (открыт === д.id) { setОткрыт(""); setТекст(""); return; }
    setОткрыт(д.id); setТекст("…");
    try {
      const r = await fetch(`/api/documents?id=${encodeURIComponent(д.id)}&locale=${l}`, { cache: "no-store", credentials: "include" });
      const d = await r.json();
      setТекст(String(d?.document?.text || ""));
    } catch { setТекст(Т.ошибка[l]); }
  }

  async function удалить(д: Документ) {
    if (!window.confirm(Т.подтвердить[l].replace("{n}", д.name))) return;
    try {
      const r = await fetch(`/api/documents?id=${encodeURIComponent(д.id)}&locale=${l}`, { method: "DELETE", credentials: "include" });
      if (r.ok) { if (открыт === д.id) { setОткрыт(""); setТекст(""); } загрузитьСписок(); }
    } catch { /* список останется прежним — кнопка сработает при повторе */ }
  }

  return (
    <Card>
      <SectionTitle icon="📎" title={Т.заголовок[l]} sub={Т.подзаголовок[l]}
        right={<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, color: TOKENS.mut }}>{Т.загрузить[l]}</span>
          <AifaDocButton lang={l} onMessage={setСтрока} onAttached={() => загрузитьСписок()}
            className="cab-btn cab-btn-ghost" />
        </div>} />
      {строка && <div role="status" aria-live="polite" style={{ fontSize: 14, color: TOKENS.sub, marginTop: -6, marginBottom: 10 }}>{строка}</div>}
      {сводка && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 14, color: TOKENS.sub, marginBottom: 6 }}>
            <span>{Т.занято[l]} {размер(сводка.usedBytes, l)} {Т.из[l]} {размер(сводка.limitBytes, l)}</span>
            <span>{Т.загрузок[l].replace("{a}", String(сводка.uploadsIn5h)).replace("{b}", String(сводка.uploadsLimit5h))}</span>
          </div>
          <ProgressBar value={сводка.usedBytes} max={сводка.limitBytes} />
        </div>
      )}
      {ошибка ? <ErrorState text={Т.ошибка[l]} onRetry={загрузитьСписок} retryLabel={Т.повторить[l]} />
        : документы === null ? <div style={{ display: "grid", gap: 10 }}><Skeleton h={48} /><Skeleton h={48} /></div>
        : документы.length === 0 ? <EmptyState text={Т.пусто[l]} />
        : (
          <div style={{ display: "grid", gap: 8 }}>
            {документы.map((д) => (
              <div key={д.id} style={{ border: `1px solid ${TOKENS.line}`, borderRadius: 12, padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 15, color: TOKENS.text, fontWeight: 600, overflowWrap: "anywhere" }}>{тип(д.kind)} {д.name}</div>
                    <div style={{ fontSize: 14, color: TOKENS.mut, marginTop: 2 }}>
                      {размер(д.size_bytes, l)} · {д.chars.toLocaleString(l)} {Т.знаков[l]} · {new Date(д.created_at).toLocaleString(l)}
                      {!д.stored && <> · {Т.безОригинала[l]}</>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button className="cab-btn cab-btn-ghost" style={{ padding: "6px 12px", fontSize: 14 }} onClick={() => void показать(д)} aria-expanded={открыт === д.id}>
                      {открыт === д.id ? Т.скрыть[l] : Т.показать[l]}
                    </button>
                    {д.stored && (
                      <a className="cab-btn cab-btn-ghost" style={{ padding: "6px 12px", fontSize: 14 }} href={`/api/documents?id=${encodeURIComponent(д.id)}&download=1`}>
                        {Т.скачать[l]}
                      </a>
                    )}
                    <button className="cab-btn cab-btn-ghost" style={{ padding: "6px 12px", fontSize: 14, color: TOKENS.red }} onClick={() => void удалить(д)}>
                      {Т.удалить[l]}
                    </button>
                  </div>
                </div>
                {открыт === д.id && (
                  <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 14, color: TOKENS.text, margin: "10px 0 0", maxHeight: 360, overflowY: "auto", background: TOKENS.panelSolid, borderRadius: 8, padding: 10 }}>
                    {текст}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
    </Card>
  );
}
