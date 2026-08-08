"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, Skeleton, ErrorState, EmptyState, TOKENS } from "./ui";
import { useCabT } from "./i18n";

// Parse the stored markdown transcript into role-tagged messages.
function parseChat(md: string): { role: "user" | "assistant"; content: string; ts: string }[] {
  const re = /###\s*\[([^\]]+)\]\s*([^\n\r]+)\r?\n/g;
  const out: { role: "user" | "assistant"; content: string; ts: string }[] = [];
  const marks: { i: number; len: number; ts: string; name: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) marks.push({ i: m.index, len: m[0].length, ts: m[1], name: m[2].trim() });
  for (let k = 0; k < marks.length; k++) {
    const cur = marks[k]; const next = k + 1 < marks.length ? marks[k + 1].i : md.length;
    let body = md.substring(cur.i + cur.len, next).trim();
    if (body.endsWith("---")) body = body.slice(0, -3).trim();
    out.push({ role: cur.name === "AIfa" || cur.name === "assistant" ? "assistant" : "user", content: body, ts: cur.ts });
  }
  return out;
}


function ArchivesCard() {
  const { t } = useCabT();
  const [rows, setRows] = useState<{ chatType: string; txId: string; size: number; at: string }[] | null>(null);
  const [err, setErr] = useState(false);
  const load = useCallback(() => {
    setErr(false);
    fetch("/api/memory/archives", { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => setRows(d.archives || []))
      .catch(() => setErr(true));
  }, []);
  useEffect(() => { load(); }, [load]);
  const label = (ct: string) => ct === "oracle" ? "🔮 Oracle" : ct === "terminal" ? "🧠 Terminal" : ct === "main" ? "💬 Main" : "🗂️ " + ct;
  const [openTx, setOpenTx] = useState<string>("");
  const [txText, setTxText] = useState<string>("");
  const [txBusy, setTxBusy] = useState<string>("");
  async function readTx(tx: string) {
    if (openTx === tx) { setOpenTx(""); setTxText(""); return; }
    setTxBusy(tx); setOpenTx(""); setTxText("");
    try {
      const r = await fetch(`/api/memory/archives/read?tx=${encodeURIComponent(tx)}`, { cache: "no-store" });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) { setOpenTx(tx); setTxText(d.text || ""); }
      else setTxText("");
      if (!r.ok) { setOpenTx(tx); setTxText(d.error === "gateway_unavailable" ? t("memGatewayDown") : t("memDecryptFail")); }
    } catch { setOpenTx(tx); setTxText(t("netErr")); }
    finally { setTxBusy(""); }
  }
  return (
    <Card>
      <SectionTitle icon="🔗" title={t("memChainTitle")}
        sub={t("memChainSub")} />
      {err ? <ErrorState text={t("netErr")} onRetry={load} retryLabel={t("retry")} />
        : rows === null ? <div style={{ display: "grid", gap: 10 }}><Skeleton h={44} /><Skeleton h={44} /></div>
        : rows.length === 0 ? <EmptyState text={t("memChainEmpty")} />
        : (
          <div style={{ display: "grid", gap: 8, maxHeight: 320, overflowY: "auto" }}>
            {rows.map((a, i) => {
              const msgs = openTx === a.txId && txText && txText.includes("### [") ? parseChat(txText) : [];
              return (
              <div key={a.txId + i} style={{ background: "#0B0F1A", border: "1px solid rgba(42,42,58,0.6)", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "10px 14px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 15, color: TOKENS.text }}>🔒 {label(a.chatType)}</span>
                  <span style={{ fontSize: 14, color: TOKENS.mut }}>{a.size ? (a.size / 1024).toFixed(1) + " KB" : ""}{a.at ? " · " + String(a.at).slice(0, 10) : ""}</span>
                  <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <button className="cab-btn cab-btn-ghost" disabled={txBusy === a.txId} onClick={() => readTx(a.txId)} style={{ padding: "5px 12px", fontSize: 14 }}>
                      {txBusy === a.txId ? t("memReading") : openTx === a.txId ? t("memCollapse") : "📖 " + t("memRead")}
                    </button>
                    <a href={`https://arweave.net/${a.txId}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: TOKENS.green, fontWeight: 700, textDecoration: "none" }}>ARWEAVE ↗</a>
                  </span>
                </div>
                {openTx === a.txId && (
                  <div style={{ padding: "0 14px 12px" }}>
                    {msgs.length ? (
                      <div style={{ display: "grid", gap: 8, maxHeight: 380, overflowY: "auto" }}>
                        {msgs.map((mm, k) => (
                          <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: mm.role === "user" ? "flex-end" : "flex-start" }}>
                            <div style={{ maxWidth: "85%", background: mm.role === "user" ? "rgba(124,58,237,0.15)" : "rgba(6,182,212,0.1)", border: `1px solid ${mm.role === "user" ? "rgba(124,58,237,0.3)" : "rgba(6,182,212,0.25)"}`, borderRadius: 12, padding: "8px 12px" }}>
                              <div style={{ fontSize: 13, color: TOKENS.mut, marginBottom: 3 }}>{mm.role === "user" ? "🧑" : "🤖 AIfa"} · {mm.ts}</div>
                              <div style={{ fontSize: 15, color: TOKENS.text, whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.5 }}>{mm.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 15, color: TOKENS.text, margin: 0, maxHeight: 320, overflowY: "auto" }}>{txText.slice(0, 40000)}</pre>
                    )}
                  </div>
                )}
              </div>
            );})}
          </div>
        )}
    </Card>
  );
}

// Ключ вечной памяти: тот самый личный ключ, которым зашифрованы записи
// человека в Arweave.
//
// ЗАЧЕМ ЭТО В КАБИНЕТЕ. Записи в Arweave вечные и публичные, а читаются только
// этим ключом. Пока ключ есть лишь у нас, «вечная память» на деле живёт ровно
// столько, сколько живём мы. Отдать копию владельцу — единственное, что делает
// её действительно вечной.
//
// ПОЧЕМУ КЛЮЧ НЕ ТЯНЕТСЯ ПРИ ОТКРЫТИИ ВКЛАДКИ. Человек может открыть кабинет
// при демонстрации экрана, рядом с камерой или на чужом компьютере. Секрет
// появляется на странице только после осознанного нажатия — до этого его нет
// даже в памяти вкладки.
type ДанныеКлюча = { key: string; algorithm?: string; kdf?: string; envelope?: string };

function MemoryKeyCard({ email }: { email: string }) {
  const { t } = useCabT();
  const [data, setData] = React.useState<ДанныеКлюча | null>(null);
  const [shown, setShown] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");

  // Возвращает ключ вызвавшему, а не только кладёт в состояние: состояние React
  // обновится лишь к следующей отрисовке, а скачивание файла происходит прямо
  // сейчас — иначе первое нажатие «Скачать» сохранило бы файл без ключа.
  async function получитьКлюч(): Promise<ДанныеКлюча | null> {
    if (data) return data;
    setBusy(true); setErr("");
    try {
      const r = await fetch("/api/account/memory-key", { cache: "no-store" });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d?.ok || !d?.key) { setErr(t("mkErr")); return null; }
      const свежие: ДанныеКлюча = { key: String(d.key), algorithm: d.algorithm, kdf: d.kdf, envelope: d.envelope };
      setData(свежие);
      return свежие;
    } catch { setErr(t("netErr")); return null; }
    finally { setBusy(false); }
  }

  async function переключить() {
    if (shown) { setShown(false); return; }
    if (await получитьКлюч()) setShown(true);
  }

  async function скачать() {
    const k = await получитьКлюч();
    if (!k) return;
    // Файл собирается на стороне браузера: так ключ не проходит второй раз через
    // сеть и не попадает ни в какое хранилище по дороге.
    const строки = [
      "CODE Eternal — " + t("mkTitle"),
      email,
      new Date().toISOString(),
      "",
      "KEY (base64): " + k.key,
      "",
      [k.algorithm, k.kdf, k.envelope].filter(Boolean).join("\n"),
      "",
      t("mkP1"),
      t("mkP2"),
      t("mkP3"),
      "",
    ];
    const url = URL.createObjectURL(new Blob([строки.join("\n")], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = "code-memory-key.txt";
    document.body.appendChild(a); a.click(); a.remove();
    // Отпускаем ссылку не сразу: часть браузеров начинает читать Blob уже после
    // возврата из click(), и мгновенный revoke обрывает скачивание пустым файлом.
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }

  return (
    <Card>
      <SectionTitle icon="🔑" title={t("mkTitle")} sub={t("mkSub")} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
        <button className="cab-btn cab-btn-ghost" disabled={busy} onClick={переключить}>
          {busy ? t("mkBusy") : shown ? t("mkHide") : t("mkShow")}
        </button>
        <button className="cab-btn cab-btn-ghost" disabled={busy} onClick={скачать}>⬇️ {t("mkDownload")}</button>
      </div>
      {shown && data && (
        <div style={{ background: "#0B0F1A", border: "1px solid rgba(42,42,58,0.6)", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
          <code style={{ fontSize: 14, color: TOKENS.cyan, wordBreak: "break-all", userSelect: "all" }}>{data.key}</code>
        </div>
      )}
      {err && <div style={{ marginBottom: 12, fontSize: 15, color: TOKENS.red }}>{err}</div>}
      <div style={{ display: "grid", gap: 8, fontSize: 15, color: TOKENS.mut, lineHeight: 1.5 }}>
        <p style={{ margin: 0 }}>{t("mkP1")}</p>
        <p style={{ margin: 0 }}>{t("mkP2")}</p>
        <p style={{ margin: 0 }}>{t("mkP3")}</p>
      </div>
    </Card>
  );
}

function DangerZone({ email }: { email: string }) {
  const { t } = useCabT();
  const [pinSet, setPinSet] = React.useState<boolean | null>(null);
  const [pin, setPin] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  React.useEffect(() => { fetch("/api/account/pin").then(r => r.ok ? r.json() : null).then(d => setPinSet(d ? !!d.hasPin : false)).catch(() => setPinSet(false)); }, []);
  async function savePin(action: "set" | "clear") {
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/account/pin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, pin }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok) { setPinSet(!!d.hasPin); setPin(""); setMsg(action === "set" ? t("dzPinSetOk") : t("dzPinClearedOk")); }
      else setMsg(d.error === "bad_pin_format" ? t("dzPinFormat") : t("dzErr"));
    } catch { setMsg(t("netErr")); }
    finally { setBusy(false); }
  }
  async function requestDelete() {
    const warn = t("dzDeleteConfirm");
    if (!window.confirm(warn)) return;
    let usePin: string | undefined;
    if (pinSet) { usePin = window.prompt(t("dzPinPrompt")) || undefined; if (!usePin) return; }
    setBusy(true); setMsg("");
    try {
      const r = await fetch("/api/account/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pin: usePin }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) setMsg(t("dzDeleteScheduled"));
      else if (d.error === "bad_pin") setMsg(t("dzPinWrong"));
      else setMsg(t("dzDeleteFailed"));
    } catch { setMsg(t("netErr")); }
    finally { setBusy(false); }
  }
  return (
    <Card style={{ borderColor: "rgba(239,68,68,0.3)" }}>
      <SectionTitle icon="🛡️" title={t("dzTitle")} sub={t("dzSub")} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
        <input type="password" inputMode="numeric" className="cab-input" value={pin} onChange={e => setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 8))} placeholder={t("dzPinPh")} style={{ flex: "1 1 160px", width: "auto" }} />
        <button className="cab-btn cab-btn-ghost" disabled={busy || pin.length < 4} onClick={() => savePin("set")}>{t("dzPinSetBtn")}</button>
        {pinSet && <button className="cab-btn cab-btn-ghost" disabled={busy} onClick={() => savePin("clear")}>{t("dzPinClearBtn")}</button>}
        <span style={{ fontSize: 15, color: pinSet ? TOKENS.green : TOKENS.mut }}>{pinSet === null ? "" : pinSet ? t("dzPinActive") : t("dzPinNone")}</span>
      </div>
      <button className="cab-btn" onClick={requestDelete} disabled={busy} style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)" }}>🗑️ {t("dzDeleteBtn")}</button>
      {msg && <div style={{ marginTop: 10, fontSize: 15, color: msg.includes("✓") || msg.includes("72") ? TOKENS.green : TOKENS.red }}>{msg}</div>}
    </Card>
  );
}

export default function MemoryTab({ email }: { email: string }) {
  const { t } = useCabT();
  const [server, setServer] = useState<{ chatType: string; text: string }[] | null>(null);
  const [err, setErr] = useState(false);

  const load = useCallback(() => {
    setErr(false);
    fetch("/api/memory", { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => setServer((d.chats || []).map((c: any) => ({ chatType: c.chatType, text: c.text }))))
      .catch(() => setErr(true));
  }, []);
  useEffect(() => { load(); }, [load]);

  const chatLabel = (ct: string) =>
    ct === "oracle" ? "🔮 Oracle" : ct === "terminal" ? "🧠 " + t("tabTerminal") : ct === "main" ? "💬 Main" : "🗂️ " + ct;


  return (
    <div style={{ display: "grid", gap: 16 }} className="cab-fade">
      <Card>
        <SectionTitle icon="🧠" title={t("memAuto")} sub={t("memAutoSub")} />
        {err ? <ErrorState text={t("netErr")} onRetry={load} retryLabel={t("retry")} />
          : server === null ? <div style={{ display: "grid", gap: 10 }}><Skeleton h={80} /><Skeleton h={60} /></div>
          : server.length === 0 ? <EmptyState text={t("memEmpty")} />
          : (
            <div style={{ display: "grid", gap: 12 }}>
              {server.map(ch => {
                const msgs = parseChat(ch.text);
                return (
                  <div key={ch.chatType} style={{ background: "#0B0F1A", border: "1px solid rgba(42,42,58,0.6)", borderRadius: 12, padding: 14 }}>
                    <div style={{ fontSize: 15, color: TOKENS.cyan, fontWeight: 700, marginBottom: 10 }}>{chatLabel(ch.chatType)}</div>
                    {msgs.length ? (
                      <div style={{ display: "grid", gap: 8, maxHeight: 460, overflowY: "auto" }}>
                        {(() => {
                          // Сессии по датам: последняя — раскрыта, старые — свёрнуты
                          const groups: { date: string; items: typeof msgs }[] = [];
                          for (const mm of msgs) {
                            const d = (mm.ts || "").slice(0, 10) || t("earlier");
                            const g = groups.find(x => x.date === d);
                            if (g) g.items.push(mm); else groups.push({ date: d, items: [mm] });
                          }
                          return groups.map((g, gi) => (
                            <details key={g.date} open={gi === groups.length - 1}>
                              <summary style={{ cursor: "pointer", fontSize: 15, color: TOKENS.mut, fontWeight: 700, padding: "4px 0" }}>📅 {g.date} · {g.items.length} {t("archMsgs")}</summary>
                              <div style={{ display: "grid", gap: 8, paddingTop: 6 }}>
                                {g.items.map((mm, i) => (
                                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: mm.role === "user" ? "flex-end" : "flex-start" }}>
                                    <div style={{ maxWidth: "85%", background: mm.role === "user" ? "rgba(124,58,237,0.15)" : "rgba(6,182,212,0.1)", border: `1px solid ${mm.role === "user" ? "rgba(124,58,237,0.3)" : "rgba(6,182,212,0.25)"}`, borderRadius: 12, padding: "8px 12px" }}>
                                      <div style={{ fontSize: 13, color: TOKENS.mut, marginBottom: 3 }}>{mm.role === "user" ? "🧑 " + email.split("@")[0] : "🤖 AIfa"} · {mm.ts}</div>
                                      <div style={{ fontSize: 15, color: TOKENS.text, whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.5 }}>{mm.content}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </details>
                          ));
                        })()}
                      </div>
                    ) : (
                      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 15, color: TOKENS.text, margin: 0, maxHeight: 320, overflowY: "auto" }}>{ch.text.slice(0, 20000)}</pre>
                    )}
                  </div>
                );
              })}
            </div>
          )}
      </Card>

      <ArchivesCard />

      <MemoryKeyCard email={email} />

      <DangerZone email={email} />
    </div>
  );
}
