"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, Skeleton, ErrorState, ProgressBar, TOKENS } from "./ui";
import { useCabT } from "./i18n";
import { GalatinCoin } from "./GalatinCoin";

type DailyState = { claimedDay: number; nextAt: number; canClaim: boolean };
type Quest = { quest: string; period: "daily" | "weekly"; target: number; reward: number; progress: number; claimed: boolean };

export default function DailiesTab(props: { onGalatin: (balance: number | null, delta: number) => void; toast: (m: string) => void }) {
  const { t } = useCabT();
  const [st, setSt] = useState<DailyState | null>(null);
  const [quests, setQuests] = useState<Quest[] | null>(null);
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const [msgErr, setMsgErr] = useState(false);

  const load = useCallback(async () => {
    setErr(false);
    try {
      const [d, q] = await Promise.all([
        fetch("/api/dailies").then(r => r.ok ? r.json() : Promise.reject()),
        fetch("/api/quests").then(r => r.ok ? r.json() : Promise.reject()),
      ]);
      setSt(d); setQuests(q.quests || []);
    } catch { setErr(true); }
  }, []);
  useEffect(() => { load(); }, [load]);

  // A failed claim must always say WHY: 401/403 (session expired), 429 (rate
  // limit), 400/500 and unknown payloads fall back to a generic message.
  function claimErr(status: number, code?: string) {
    if (status === 401 || status === 403 || code === "unauthorized") return t("claimAuth");
    if (status === 429 || code === "rate_limited") return t("claimRate");
    if (code === "already" || code === "not_ready") return t("claimNotReady");
    return t("claimFailed");
  }

  async function claimDaily() {
    setBusy("daily"); setMsg(""); setMsgErr(false);
    try {
      const r = await fetch("/api/dailies", { method: "POST" });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) {
        setSt(d);
        props.onGalatin(d.balance ?? null, d.awarded);
        setMsg(t("dailyGot", { n: d.awarded }));
      } else if (d.error === "too_early") {
        const h = Math.max(1, Math.ceil((d.nextAt - Date.now()) / 3600000));
        setMsg(t("tooEarly", { h }));
        setSt(d);
      } else if (d.error === "week_done") { setMsg(t("weekDone")); setSt(d); }
      else { setMsg(claimErr(r.status, d.error)); setMsgErr(true); }
    } catch { setMsg(t("netErr")); setMsgErr(true); }
    finally { setBusy(""); }
  }

  async function claimQuest(q: Quest) {
    setBusy(q.quest);
    try {
      const r = await fetch("/api/quests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ quest: q.quest }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) {
        props.onGalatin(d.balance ?? null, d.awarded);
        props.toast("+" + d.awarded + " GALATIN 🎉");
        setQuests(prev => (prev || []).map(x => x.quest === q.quest ? { ...x, claimed: true } : x));
      } else {
        props.toast(claimErr(r.status, d.error));
      }
    } catch { props.toast(t("netErr")); }
    finally { setBusy(""); }
  }

  if (err) return <Card><ErrorState text={t("netErr")} onRetry={load} retryLabel={t("retry")} /></Card>;

  return (
    <div style={{ display: "grid", gap: 16 }} className="cab-fade">
      <Card>
        <SectionTitle icon="🎁" title={t("dailyTitle")} sub={t("dailySub")} />
        {!st ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 10 }}>
            {[1,2,3,4,5,6,7].map(i => <Skeleton key={i} h={128} />)}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 10 }}>
            {[1, 2, 3, 4, 5, 6, 7].map(day => {
              const claimed = day <= st.claimedDay;
              const active = day === st.claimedDay + 1 && st.canClaim;
              return (
                <div key={day} className="cab-card" style={{ padding: "16px 10px", textAlign: "center", borderColor: active ? "rgba(34,211,238,0.5)" : claimed ? "rgba(16,185,129,0.4)" : undefined }}>
                  <div style={{ fontSize: 11, color: TOKENS.mut, marginBottom: 6 }}>{t("day").toUpperCase()} {day}</div>
                  <div style={{ marginBottom: 6, display: "flex", justifyContent: "center" }}><GalatinCoin size={44} /></div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TOKENS.gold }}>+{day} GALATIN</div>
                  <button className="cab-btn" disabled={!active || !!busy} onClick={claimDaily}
                    style={{ marginTop: 8, width: "100%", padding: 6, fontSize: 11, borderRadius: 8,
                      background: claimed ? "rgba(16,185,129,0.15)" : active ? "linear-gradient(135deg,#06B6D4,#7C3AED)" : "#2A2A3A",
                      color: claimed ? TOKENS.green : "#fff" }}>
                    {claimed ? t("claimed") : active ? t("claim") : t("locked")}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {msg && <div role="status" style={{ marginTop: 14, fontSize: 13, color: msgErr ? TOKENS.red : TOKENS.green, textAlign: "center" }}>{msg}</div>}
      </Card>

      <Card>
        <SectionTitle icon="🎯" title={t("questsTitle")} sub={t("questsSub")} />
        {!quests ? (
          <div style={{ display: "grid", gap: 10 }}>{[1,2,3,4].map(i => <Skeleton key={i} h={64} />)}</div>
        ) : (
          <div className="cab-cols2">
            {(["daily", "weekly"] as const).map(period => (
              <div key={period}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: period === "daily" ? TOKENS.cyan : TOKENS.violet, marginBottom: 10 }}>
                  {period === "daily" ? t("qDaily") : t("qWeekly")}
                </div>
                <div style={{ display: "grid", gap: 10 }}>
                  {quests.filter(q => q.period === period).map(q => {
                    const ready = q.progress >= q.target && !q.claimed;
                    return (
                      <div key={q.quest} className="cab-card" style={{ padding: 14, borderColor: ready ? "rgba(212,162,76,0.5)" : undefined }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8, alignItems: "center" }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: TOKENS.text }}>{t("q_" + q.quest)}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: TOKENS.gold, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 4 }}>+{q.reward} <GalatinCoin size={20} /></div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ flex: 1 }}><ProgressBar value={q.progress} max={q.target} /></div>
                          <div style={{ fontSize: 11, color: TOKENS.mut, whiteSpace: "nowrap" }}>{q.progress}/{q.target}</div>
                          {q.claimed
                            ? <span style={{ fontSize: 11, color: TOKENS.green, whiteSpace: "nowrap" }}>{t("qDone")}</span>
                            : <button className="cab-btn cab-btn-primary" disabled={!ready || busy === q.quest} onClick={() => claimQuest(q)} style={{ padding: "6px 12px", fontSize: 11 }}>{t("qClaim", { n: q.reward })}</button>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
