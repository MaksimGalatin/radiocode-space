"use client";
import React, { useState } from "react";
import { Card, SectionTitle } from "./ui";
import { useCabT } from "./i18n";

/**
 * ПОИСК ПО СВОЕЙ ПЕРЕПИСКЕ — карточка во вкладке «Память» (27.09.2026).
 * Спрашивает /api/memory/search этого же сайта; почта берётся из сессии на
 * сервере, поэтому человек видит только свою переписку. Четыре языка.
 */
const Т: Record<string, [string, string, string, string]> = {
  title: ["Найти в нашей переписке", "Search our conversations", "Buscar en nuestras conversaciones", "搜索我们的对话"],
  sub: ["Спросите своими словами — например, «когда мы говорили о наследовании?»",
        "Ask in your own words — e.g. “when did we talk about inheritance?”",
        "Pregunte con sus palabras — por ejemplo, «¿cuándo hablamos de la herencia?»",
        "用自己的话提问——例如「我们什么时候谈过遗产？」"],
  placeholder: ["О чём мы говорили…", "What did we talk about…", "¿De qué hablamos…", "我们谈过什么……"],
  button: ["Найти", "Search", "Buscar", "搜索"],
  searching: ["Ищу…", "Searching…", "Buscando…", "正在搜索……"],
  empty: ["Ничего похожего не нашлось. Попробуйте другими словами.", "Nothing similar found. Try other words.",
          "No se encontró nada parecido. Pruebe con otras palabras.", "没有找到相似内容。请换个说法。"],
  error: ["Поиск сейчас не ответил. Попробуйте ещё раз.", "Search did not respond. Please try again.",
          "La búsqueda no respondió. Inténtelo de nuevo.", "搜索暂时没有响应，请重试。"],
  unavailable: ["Поиск по смыслу временно недоступен — попробуйте позже.", "Meaning search is temporarily unavailable — try later.",
                "La búsqueda por significado no está disponible ahora — inténtelo más tarde.", "语义搜索暂时不可用，请稍后再试。"],
  you: ["Вы", "You", "Usted", "您"],
};

type Находка = { text: string; role: string; channel: string; date: string | null; site: string; score: number };

export default function MemorySearchCard() {
  const { lang } = useCabT();
  const i = lang === "ru" ? 0 : lang === "en" ? 1 : lang === "es" ? 2 : 3;
  const т = (k: string) => Т[k][i];
  const [вопрос, setВопрос] = useState("");
  const [идёт, setИдёт] = useState(false);
  const [итог, setИтог] = useState<Находка[] | null>(null);
  const [сбой, setСбой] = useState<"" | "error" | "unavailable">("");

  const найти = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = вопрос.trim();
    if (q.length < 2 || идёт) return;
    setИдёт(true); setСбой(""); setИтог(null);
    try {
      const r = await fetch("/api/memory/search", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: q }),
      });
      if (!r.ok) throw new Error(String(r.status));
      const d = await r.json();
      if (d.unavailable) setСбой("unavailable");
      setИтог(Array.isArray(d.results) ? d.results : []);
    } catch {
      setСбой("error");
    } finally {
      setИдёт(false);
    }
  };

  const дата = (s: string | null) => {
    if (!s) return "";
    const d = new Date(s);
    if (isNaN(d.getTime())) return "";
    const loc = lang === "ru" ? "ru-RU" : lang === "es" ? "es-ES" : lang === "zh" ? "zh-CN" : "en-US";
    return d.toLocaleDateString(loc, { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <Card>
      <SectionTitle icon="🔎" title={т("title")} sub={т("sub")} />
      <form onSubmit={найти} style={{ display: "flex", gap: 8, flexWrap: "wrap" }} role="search">
        <label htmlFor="cab-mem-search" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
          {т("title")}
        </label>
        <input
          id="cab-mem-search" type="search" value={вопрос} maxLength={300}
          onChange={(e) => setВопрос(e.target.value)} placeholder={т("placeholder")}
          style={{ flex: "1 1 220px", minWidth: 0, padding: "10px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.18)",
                   background: "rgba(0,0,0,0.35)", color: "inherit", fontSize: 15 }}
        />
        <button type="submit" disabled={идёт || вопрос.trim().length < 2}
          style={{ padding: "10px 18px", borderRadius: 10, border: "1px solid rgba(120,160,255,0.5)", background: "rgba(80,120,255,0.25)",
                   color: "inherit", fontSize: 15, cursor: идёт ? "wait" : "pointer" }}>
          {идёт ? т("searching") : т("button")}
        </button>
      </form>
      <div aria-live="polite" style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {сбой === "error" && <div style={{ opacity: 0.85 }}>{т("error")}</div>}
        {сбой === "unavailable" && <div style={{ opacity: 0.85 }}>{т("unavailable")}</div>}
        {итог && итог.length === 0 && !сбой && <div style={{ opacity: 0.85 }}>{т("empty")}</div>}
        {итог && итог.map((н, k) => (
          <div key={k} style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 4 }}>
              {н.role === "assistant" ? "AIfa" : т("you")}{н.date ? " · " + дата(н.date) : ""}{н.channel ? " · " + н.channel : ""}{н.site ? " · " + н.site : ""}
            </div>
            <div style={{ whiteSpace: "pre-wrap", fontSize: 14, lineHeight: 1.45 }}>{н.text}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
