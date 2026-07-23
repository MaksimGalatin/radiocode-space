"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, Skeleton, ErrorState, EmptyState, TOKENS, TIERS } from "./ui";
import { useCabT } from "./i18n";

export default function ReferralsTab(props: { email: string; toast: (m: string) => void }) {
  const { t } = useCabT();
  const [d, setD] = useState<any | null>(null);
  const [err, setErr] = useState(false);
  const [page, setPage] = useState(0);
  const [addr, setAddr] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const load = useCallback(async (pg = 0) => {
    setErr(false);
    try {
      const r = await fetch("/api/referrals/me?page=" + pg);
      if (!r.ok) throw new Error();
      setD(await r.json()); setPage(pg);
    } catch { setErr(true); }
  }, []);
  useEffect(() => { load(0); }, [load]);

  const refLink = d ? "https://radiocode.space/cabinet?ref=" + encodeURIComponent(d.refCode || props.email) : "";

  async function copy() {
    try { await navigator.clipboard.writeText(refLink); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }

  async function payout() {
    setMsg("");
    if (!/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(addr.trim())) { setMsg(t("refBadAddr")); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/referrals/payout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ address: addr.trim() }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) { setMsg(t("refRequested", { a: Number(j.requested).toFixed(2) })); load(page); }
      else setMsg(j.error === "no_funds" ? t("refNoFunds") : t("netErr"));
    } catch { setMsg(t("netErr")); }
    finally { setBusy(false); }
  }

  if (err) return <Card><ErrorState text={t("netErr")} onRetry={() => load(0)} retryLabel={t("retry")} /></Card>;

  return (
    <div className="cab-cols2 cab-fade">
      <Card>
        <SectionTitle icon="👥" title={t("refTitle")} />
        <a href="/ambassador" style={{ display: "block", textAlign: "center", padding: "11px 14px", marginBottom: 14, borderRadius: 10, fontWeight: 800, fontSize: 13, background: "linear-gradient(90deg,#06B6D4,#6366F1)", color: "#fff", textDecoration: "none" }}>🎓 Ambassador Training →</a>
        {!d ? <div style={{ display: "grid", gap: 10 }}><Skeleton h={54} /><Skeleton h={80} /><Skeleton h={40} /></div> : (
          <>
            <div style={{ display: "flex", gap: 24, marginBottom: 14 }}>
              <div><div style={{ fontSize: 11, color: TOKENS.mut }}>{t("refInvited")}</div><div style={{ fontSize: 24, fontWeight: 800, color: TOKENS.cyan }}>{d.count}</div></div>
              <div><div style={{ fontSize: 11, color: TOKENS.mut }}>{t("refBalance")}</div><div style={{ fontSize: 24, fontWeight: 800, color: TOKENS.green }}>${Number(d.balance).toFixed(2)}</div></div>
            </div>
            <div className="cab-cols3" style={{ gap: 8, marginBottom: 12 }}>
              {[{ l: 1, p: "15%", c: TOKENS.cyan }, { l: 2, p: "7%", c: TOKENS.violet }, { l: 3, p: "3%", c: TOKENS.gold }].map(x => (
                <div key={x.l} style={{ background: "#13131C", border: "1px solid #2A2A3A", borderRadius: 10, padding: 10 }}>
                  <div style={{ fontSize: 10, color: TOKENS.mut, fontWeight: 700 }}>LVL {x.l} · <span style={{ color: x.c }}>{x.p}</span></div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: TOKENS.text, marginTop: 4 }}>{d.counts?.[x.l] || 0}</div>
                  <div style={{ fontSize: 11, color: TOKENS.green }}>${Number(d.byLevel?.[x.l] || 0).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: TOKENS.mut, marginBottom: 8, lineHeight: 1.5 }}>{t("refLvlNote")}</div>
            {Number(d.missed) > 0 && (
              <div style={{ fontSize: 12, color: TOKENS.amber, marginBottom: 10, lineHeight: 1.5 }}>
                {t("refMissed", { m: Number(d.missed).toFixed(2) })}
              </div>
            )}
            <div style={{ fontSize: 12, color: TOKENS.mut }}>{t("refYourLink")}:</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6, flexWrap: "wrap" }}>
              <code style={{ fontSize: 12, fontFamily: "monospace", color: TOKENS.cyan, wordBreak: "break-all", flex: "1 1 220px" }}>{refLink}</code>
              <button className="cab-btn cab-btn-ghost" onClick={copy} style={{ padding: "7px 14px", fontSize: 12 }}>{copied ? t("refCopied") : "📋 " + t("refCopy")}</button>
            </div>
            {d.list?.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 11, color: TOKENS.mut, marginBottom: 6 }}>{t("refDownline")}:</div>
                <div style={{ maxHeight: 200, overflowY: "auto" }}>
                  {d.list.map((x: any, i: number) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderTop: i ? "1px solid rgba(42,42,58,0.5)" : "none" }}>
                      <span style={{ color: TOKENS.sub, fontFamily: "monospace" }}>{x.email}</span>
                      <span style={{ color: TOKENS.mut }}>L{x.lvl} · {TIERS.find(tt => tt.id === x.tier)?.name || "—"}</span>
                    </div>
                  ))}
                </div>
                {d.pages > 1 && (
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
                    <button className="cab-btn cab-btn-ghost" disabled={page <= 0} onClick={() => load(page - 1)} style={{ padding: "5px 12px", fontSize: 12 }}>←</button>
                    <span style={{ fontSize: 12, color: TOKENS.mut, alignSelf: "center" }}>{page + 1}/{d.pages}</span>
                    <button className="cab-btn cab-btn-ghost" disabled={page >= d.pages - 1} onClick={() => load(page + 1)} style={{ padding: "5px 12px", fontSize: 12 }}>→</button>
                  </div>
                )}
              </div>
            )}
            {d.list?.length === 0 && <EmptyState text={t("empty")} />}
          </>
        )}
      </Card>

      <Card>
        <SectionTitle icon="💸" title={t("refPayout")} />
        <input className="cab-input" value={addr} onChange={e => setAddr(e.target.value)} placeholder="T..." aria-label="TRC20" />
        <button className="cab-btn cab-btn-green" onClick={payout} disabled={busy || !d} style={{ width: "100%", marginTop: 12 }}>
          {busy ? "…" : t("refPayoutBtn")}
        </button>
        {msg && <div style={{ marginTop: 10, fontSize: 12, color: TOKENS.sub, textAlign: "center" }}>{msg}</div>}
      </Card>
    </div>
  );
}
