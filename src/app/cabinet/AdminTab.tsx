"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, Skeleton, TOKENS, EmptyState } from "./ui";
import { useCabT } from "./i18n";

type Sub = "stats" | "users" | "payouts" | "inbox" | "credit" | "audit" | "links";

export default function AdminTab(props: { toast: (m: string) => void }) {
  const { t } = useCabT();
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [sub, setSub] = useState<Sub>("stats");

  const [stats, setStats] = useState<any | null>(null);
  const [users, setUsers] = useState<any[] | null>(null);
  const [uPage, setUPage] = useState(0);
  const [uMore, setUMore] = useState(false);
  const [uQ, setUQ] = useState("");
  const [payouts, setPayouts] = useState<any[] | null>(null);
  const [inbox, setInbox] = useState<any[] | null>(null);
  const [audit, setAudit] = useState<any[] | null>(null);
  const [cEmail, setCEmail] = useState(""); const [cAmt, setCAmt] = useState(""); const [cNote, setCNote] = useState(""); const [cBusy, setCBusy] = useState(false);

  async function enter() {
    setErr("");
    const r = await fetch("/api/admin/enter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pass }) });
    if (!r.ok) { setErr(r.status === 429 ? "Rate limited — wait 15 min" : t("admWrongPass")); return; }
    setUnlocked(true); setPass("");
  }

  const loadStats = useCallback(() => { fetch("/api/admin/stats").then(r => r.ok ? r.json() : null).then(d => d && setStats(d.stats)); }, []);
  const loadUsers = useCallback((pg = 0, q = "") => {
    fetch(`/api/admin/users?page=${pg}&q=${encodeURIComponent(q)}`).then(r => r.ok ? r.json() : null).then(d => { if (d) { setUsers(d.users); setUPage(d.page); setUMore(d.hasMore); } });
  }, []);
  const loadPayouts = useCallback(() => { fetch("/api/admin/payouts").then(r => r.ok ? r.json() : null).then(d => d && setPayouts(d.payouts)); }, []);
  const loadInbox = useCallback(() => { fetch("/api/admin/inbox").then(r => r.ok ? r.json() : null).then(d => d && setInbox(d.submissions)); }, []);
  const loadAudit = useCallback(() => { fetch("/api/admin/audit").then(r => r.ok ? r.json() : null).then(d => d && setAudit(d.log)); }, []);

  useEffect(() => {
    if (!unlocked) return;
    if (sub === "stats" && !stats) loadStats();
    if (sub === "users" && !users) loadUsers();
    if (sub === "payouts" && !payouts) loadPayouts();
    if (sub === "inbox" && !inbox) loadInbox();
    if (sub === "audit" && !audit) loadAudit();
  }, [unlocked, sub, stats, users, payouts, inbox, audit, loadStats, loadUsers, loadPayouts, loadInbox, loadAudit]);

  async function markPayout(id: number, status: "paid" | "rejected") {
    const r = await fetch("/api/admin/payouts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    if (r.ok) { props.toast("✓ " + status); loadPayouts(); }
  }
  async function credit() {
    setCBusy(true);
    try {
      const r = await fetch("/api/admin/credit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: cEmail.trim(), amount: Number(cAmt), note: cNote }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) { props.toast(`✓ ${cAmt} GALATIN → ${cEmail}`); setCEmail(""); setCAmt(""); setCNote(""); }
      else props.toast("⚠️ " + (d.error || "error"));
    } finally { setCBusy(false); }
  }

  if (!unlocked) {
    return (
      <Card className="cab-fade">
        <SectionTitle icon="🔐" title={t("admTitle")} sub={t("admSub")} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input type="password" className="cab-input" value={pass} onChange={e => setPass(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") enter(); }} placeholder="Admin password" style={{ flex: "1 1 200px", width: "auto" }} />
          <button className="cab-btn cab-btn-violet" onClick={enter}>{t("admEnter")}</button>
        </div>
        {err && <div style={{ marginTop: 10, fontSize: 12, color: TOKENS.red }}>{err}</div>}
      </Card>
    );
  }

  const SUBS: [Sub, string][] = [
    ["stats", "📊 " + t("admStats")], ["users", "👥 " + t("admUsers")], ["payouts", "💸 " + t("admPayouts")],
    ["inbox", "📥 " + t("admInbox")], ["credit", "🪙 " + t("admCredit")], ["audit", "📝 " + t("admAudit")], ["links", "📈 " + t("admLinks")],
  ];

  return (
    <div className="cab-fade">
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {SUBS.map(([id, label]) => (
          <button key={id} className="cab-tab" aria-selected={sub === id} onClick={() => setSub(id)} style={{ fontSize: 12, padding: "8px 12px" }}>{label}</button>
        ))}
      </div>

      {sub === "stats" && (
        <Card>
          <SectionTitle icon="📊" title={t("admStats")} right={<button className="cab-btn cab-btn-ghost" onClick={loadStats} style={{ padding: "6px 12px", fontSize: 12 }}>↻</button>} />
          {!stats ? <Skeleton h={120} /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12 }}>
              {[
                ["👤 Users", stats.users], ["🟢 DAU", stats.dau], ["📅 WAU", stats.wau],
                ["🛡️ Passports", stats.passports + " (" + stats.minted + " on-chain)"],
                ["💰 Revenue", "$" + Number(stats.revenue)], ["✅ Paid orders", stats.paid_orders],
                ["⏳ Pending orders", stats.pending_orders], ["👥 Referrals", stats.referrals],
                ["💵 Ref credited", "$" + Number(stats.ref_credited).toFixed(2)],
                ["💸 Payouts pending", "$" + Number(stats.payouts_pending).toFixed(2)],
                ["🪙 GALATIN supply", stats.galatin_supply], ["🎮 Total wins", stats.total_wins],
                ["📨 Submissions", stats.submissions],
              ].map(([k, v]) => (
                <div key={String(k)} style={{ background: "#13131C", border: "1px solid #2A2A3A", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 11, color: TOKENS.mut }}>{k}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: TOKENS.text, marginTop: 4 }}>{String(v)}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {sub === "users" && (
        <Card>
          <SectionTitle icon="👥" title={t("admUsers")} right={
            <div style={{ display: "flex", gap: 8 }}>
              <input className="cab-input" value={uQ} onChange={e => setUQ(e.target.value)} onKeyDown={e => { if (e.key === "Enter") loadUsers(0, uQ); }} placeholder="search email…" style={{ width: 180, padding: "7px 10px", fontSize: 12 }} />
              <button className="cab-btn cab-btn-ghost" onClick={() => loadUsers(0, uQ)} style={{ padding: "6px 12px", fontSize: 12 }}>🔍</button>
            </div>} />
          {!users ? <Skeleton h={160} /> : users.length === 0 ? <EmptyState text={t("empty")} /> : (
            <div style={{ overflowX: "auto" }}>
              <table className="cab-table">
                <thead><tr><th>Email</th><th>@nick</th><th>XP</th><th>Tier</th><th>GALATIN</th><th>Invited</th><th>Arweave</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.email}>
                      <td style={{ fontFamily: "monospace", fontSize: 12 }}>{u.email}</td>
                      <td>{u.username ? "@" + u.username : "—"}</td>
                      <td>{u.xp}</td><td>{u.tier || "—"}</td>
                      <td style={{ color: TOKENS.gold }}>{u.galatin}</td><td>{u.invited}</td>
                      <td>{u.arweave_tx ? "✓" : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
                <button className="cab-btn cab-btn-ghost" disabled={uPage <= 0} onClick={() => loadUsers(uPage - 1, uQ)} style={{ padding: "5px 12px", fontSize: 12 }}>←</button>
                <span style={{ fontSize: 12, color: TOKENS.mut, alignSelf: "center" }}>{uPage + 1}</span>
                <button className="cab-btn cab-btn-ghost" disabled={!uMore} onClick={() => loadUsers(uPage + 1, uQ)} style={{ padding: "5px 12px", fontSize: 12 }}>→</button>
              </div>
            </div>
          )}
        </Card>
      )}

      {sub === "payouts" && (
        <Card>
          <SectionTitle icon="💸" title={t("admPayouts")} right={<button className="cab-btn cab-btn-ghost" onClick={loadPayouts} style={{ padding: "6px 12px", fontSize: 12 }}>↻</button>} />
          {!payouts ? <Skeleton h={120} /> : payouts.length === 0 ? <EmptyState text={t("empty")} /> : (
            <div style={{ overflowX: "auto" }}>
              <table className="cab-table">
                <thead><tr><th>Email</th><th>USDT</th><th>Address</th><th>Status</th><th>Date</th><th></th></tr></thead>
                <tbody>
                  {payouts.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontFamily: "monospace", fontSize: 12 }}>{p.email}</td>
                      <td style={{ color: TOKENS.green, fontWeight: 700 }}>${Number(p.amount).toFixed(2)}</td>
                      <td style={{ fontFamily: "monospace", fontSize: 11 }}>{p.address}</td>
                      <td style={{ color: p.status === "pending" ? TOKENS.amber : p.status === "paid" ? TOKENS.green : TOKENS.red }}>{p.status}</td>
                      <td style={{ color: TOKENS.mut }}>{String(p.created_at).slice(0, 10)}</td>
                      <td>
                        {p.status === "pending" && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="cab-btn cab-btn-green" onClick={() => markPayout(p.id, "paid")} style={{ padding: "4px 10px", fontSize: 11 }}>PAID</button>
                            <button className="cab-btn cab-btn-ghost" onClick={() => markPayout(p.id, "rejected")} style={{ padding: "4px 10px", fontSize: 11, color: TOKENS.red }}>✕</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {sub === "inbox" && (
        <Card>
          <SectionTitle icon="📥" title={t("admInbox")} right={<button className="cab-btn cab-btn-ghost" onClick={loadInbox} style={{ padding: "6px 12px", fontSize: 12 }}>↻</button>} />
          {!inbox ? <Skeleton h={120} /> : inbox.length === 0 ? <EmptyState text={t("empty")} /> : (
            <div style={{ overflowX: "auto" }}>
              <table className="cab-table">
                <thead><tr><th>Site</th><th>Type</th><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead>
                <tbody>
                  {inbox.map((s: any) => (
                    <tr key={s.id}>
                      <td>{s.site}</td><td>{s.kind}</td><td>{s.name || "—"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: 11 }}>{s.email || "—"}</td>
                      <td style={{ fontSize: 11, color: TOKENS.sub, maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={s.message || ""}>{s.message || "—"}</td>
                      <td style={{ color: TOKENS.mut }}>{String(s.created_at).slice(0, 16).replace("T", " ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {sub === "credit" && (
        <Card>
          <SectionTitle icon="🪙" title={t("admCredit")} sub="Manual GALATIN credit/debit — audited." />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr auto", gap: 10, alignItems: "end" }} className="cab-cols2">
            <div><label style={{ fontSize: 11, color: TOKENS.mut }}>Email</label><input className="cab-input" value={cEmail} onChange={e => setCEmail(e.target.value)} placeholder="user@…" /></div>
            <div><label style={{ fontSize: 11, color: TOKENS.mut }}>Amount ±</label><input className="cab-input" value={cAmt} onChange={e => setCAmt(e.target.value.replace(/[^0-9-]/g, ""))} placeholder="100" /></div>
            <div><label style={{ fontSize: 11, color: TOKENS.mut }}>Note</label><input className="cab-input" value={cNote} onChange={e => setCNote(e.target.value)} placeholder="reason…" /></div>
            <button className="cab-btn cab-btn-primary" disabled={cBusy || !cEmail || !cAmt} onClick={credit}>OK</button>
          </div>
        </Card>
      )}

      {sub === "audit" && (
        <Card>
          <SectionTitle icon="📝" title={t("admAudit")} right={<button className="cab-btn cab-btn-ghost" onClick={loadAudit} style={{ padding: "6px 12px", fontSize: 12 }}>↻</button>} />
          {!audit ? <Skeleton h={120} /> : audit.length === 0 ? <EmptyState text={t("empty")} /> : (
            <div style={{ overflowX: "auto" }}>
              <table className="cab-table">
                <thead><tr><th>#</th><th>Action</th><th>Detail</th><th>IP</th><th>Date</th></tr></thead>
                <tbody>
                  {audit.map((a: any) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td style={{ fontWeight: 700, color: a.action.includes("failed") ? TOKENS.red : TOKENS.cyan }}>{a.action}</td>
                      <td style={{ fontSize: 11, fontFamily: "monospace", color: TOKENS.sub, maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={JSON.stringify(a.detail)}>{JSON.stringify(a.detail)}</td>
                      <td style={{ fontSize: 11, color: TOKENS.mut }}>{a.ip || "—"}</td>
                      <td style={{ color: TOKENS.mut, fontSize: 11 }}>{String(a.created_at).slice(0, 19).replace("T", " ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {sub === "links" && (
        <Card>
          <SectionTitle icon="📈" title={t("admLinks")} sub="Внешние панели мониторинга владельца." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
            {[
              ["📊 Google Analytics 4", "https://analytics.google.com/analytics/web/"],
              ["⚡ Vercel Analytics (aifa.digital)", "https://vercel.com/maksim-galatins-projects/aifa.digital/analytics"],
              ["🚀 Vercel Speed Insights", "https://vercel.com/maksim-galatins-projects/aifa.digital/speed-insights"],
              ["🗄️ Neon Console (winter-meadow)", "https://console.neon.tech/app/projects/winter-meadow-86695823"],
              ["💳 NOWPayments Dashboard", "https://account.nowpayments.io/"],
              ["📧 Resend Dashboard", "https://resend.com/emails"],
              ["🔍 Google Search Console", "https://search.google.com/search-console"],
              ["🌐 Arweave ViewBlock", "https://viewblock.io/arweave"],
            ].map(([label, url]) => (
              <a key={url} className="cab-card cab-card-hover" href={url} target="_blank" rel="noopener noreferrer"
                style={{ padding: 16, textDecoration: "none", color: TOKENS.text, fontSize: 13, fontWeight: 600, display: "block" }}>
                {label} <span style={{ color: TOKENS.cyan }}>↗</span>
              </a>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
