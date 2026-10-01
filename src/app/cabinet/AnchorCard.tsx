"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, Skeleton, ErrorState, EmptyState, TOKENS } from "./ui";
import { useCabT } from "./i18n";
import { проверитьЭлемент, type ЭлементЯкоря, type ИтогПроверки } from "../../lib/memory-anchor";

// Якорь вечной памяти в Solana (30.09.2026).
//
// ЗАЧЕМ. Человек сам, в своём браузере, проверяет, что его записи в Arweave целы и не подменены и что
// забытое действительно забыто. Сервер лишь подсказывает, где искать: номер сделки, отпечаток, путь до
// корня и номер транзакции Solana. Запись браузер берёт из Arweave сам, корень — из Solana сам, так
// что соврать сервер не может: подменённый путь не сведётся к корню, записанному в цепи.
//
// ПОЧЕМУ ПРОВЕРКА ПО КНОПКЕ, А НЕ ПРИ ОТКРЫТИИ. Проверка качает каждую запись целиком из Arweave —
// у активного человека это мегабайты. Тратить их на каждое открытие вкладки незачем.

const СТАДИЯ: Record<ИтогПроверки["этап"], string> = {
  данные: "anStData", лист: "anStLeaf", путь: "anStPath", цепь: "anStChain", готово: "anOk",
};

export default function AnchorCard() {
  const { t } = useCabT();
  const [items, setItems] = useState<ЭлементЯкоря[] | null>(null);
  const [err, setErr] = useState(false);
  const [итоги, setИтоги] = useState<Record<string, ИтогПроверки>>({});
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    setErr(false);
    fetch("/api/memory/anchor", { cache: "no-store" })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(d => setItems(Array.isArray(d.items) ? d.items : []))
      .catch(() => setErr(true));
  }, []);
  useEffect(() => { load(); }, [load]);

  async function проверить() {
    const список = items ?? [];
    if (!список.length) return;
    setBusy(true);
    setИтоги({});
    const цепь = new Map<string, Promise<string | null>>();
    const накоплено: Record<string, ИтогПроверки> = {};
    let следующий = 0;
    // Четыре потока: не душим ни шлюз Arweave, ни публичный узел Solana.
    async function поток() {
      while (следующий < список.length) {
        const э = список[следующий++];
        накоплено[э.вид + ":" + э.ссылка] = await проверитьЭлемент(э, цепь)
          .catch((e): ИтогПроверки => ({ ок: false, этап: "данные", подробно: String(e).slice(0, 120) }));
        setИтоги({ ...накоплено });
      }
    }
    await Promise.all([поток(), поток(), поток(), поток()]);
    setBusy(false);
  }

  const записей = (items ?? []).filter(э => э.вид === "запись").length;
  const забвений = (items ?? []).filter(э => э.вид === "забвение").length;
  const проверено = Object.values(итоги);
  const целых = проверено.filter(x => x.ок).length;
  const обозреватель = (э: ЭлементЯкоря) =>
    `https://explorer.solana.com/tx/${э.подпись}${э.сеть === "devnet" ? "?cluster=devnet" : ""}`;

  return (
    <Card>
      <SectionTitle icon="⚓" title={t("anTitle")} sub={t("anSub")} />
      {err ? <ErrorState text={t("netErr")} onRetry={load} retryLabel={t("retry")} />
        : items === null ? <div style={{ display: "grid", gap: 10 }}><Skeleton h={44} /></div>
        : items.length === 0 ? <EmptyState text={t("anEmpty")} />
        : (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 15, color: TOKENS.text }}>
                {записей} {t("anRecords")}{забвений ? ` · ${забвений} ${t("anForgets")}` : ""}
              </span>
              <button className="cab-btn cab-btn-ghost" disabled={busy} onClick={проверить}>
                {busy ? t("anChecking") : "🔍 " + t("anCheck")}
              </button>
            </div>
            {проверено.length > 0 && (
              <div style={{ fontSize: 15, fontWeight: 700, color: целых === проверено.length ? TOKENS.green : "#F87171" }}>
                {t("anSummary")}: {целых} / {items.length} {целых === items.length ? "✓" : ""}
              </div>
            )}
            <div style={{ display: "grid", gap: 6, maxHeight: 320, overflowY: "auto" }}>
              {items.map(э => {
                const и = итоги[э.вид + ":" + э.ссылка];
                return (
                  <div key={э.вид + э.ссылка} style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between", background: "var(--cab-ink)", border: "1px solid var(--cab-line)", borderRadius: 10, padding: "8px 12px" }}>
                    <span style={{ fontSize: 14, color: TOKENS.text, wordBreak: "break-all" }}>
                      {э.вид === "запись" ? "🔒 " + t("anRecord") : "🕊️ " + t("anForget")} · {э.ссылка.slice(0, 12)}… · {String(э.закреплён).slice(0, 10)}
                    </span>
                    <span style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      {и && (
                        <span style={{ fontSize: 14, fontWeight: 700, color: и.ок ? TOKENS.green : "#F87171" }}>
                          {и.ок ? "✓ " + t("anOk") : "✗ " + t(СТАДИЯ[и.этап])}
                        </span>
                      )}
                      {э.вид === "запись" && (
                        <a href={`https://arweave.net/${э.ссылка}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: TOKENS.mut, display: "inline-flex", alignItems: "center", minHeight: 24 }}>Arweave ↗</a>
                      )}
                      <a href={обозреватель(э)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: TOKENS.mut, display: "inline-flex", alignItems: "center", minHeight: 24 }}>Solana ↗</a>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </Card>
  );
}
