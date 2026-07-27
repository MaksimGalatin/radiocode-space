"use client";
import React, { useEffect, useState } from "react";
import { Card, SectionTitle, TOKENS } from "./ui";
import { useCabT } from "./i18n";

export default function ShieldTab() {
  const { t } = useCabT();
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  useEffect(() => { try { const e = localStorage.getItem("aifa_user_email"); if (e) setEmail(e); } catch {} }, []);
  async function activate() {
    const d = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(d)) { setMsg({ ok: false, text: t("shieldErrDomain") }); return; }
    setBusy(true); setMsg(null);
    try {
      const r = await fetch("/api/legal-shield", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain: d, email: email.trim() || undefined }) });
      const res = await r.json().catch(() => ({}));
      if (r.ok && res.ok) { setMsg({ ok: true, text: t("shieldOk") }); setDomain(""); }
      else setMsg({ ok: false, text: res.error === "bad_domain" ? t("shieldErrDomain") : t("shieldErr") });
    } catch { setMsg({ ok: false, text: t("netErr") }); }
    finally { setBusy(false); }
  }
  return (
    <Card style={{ borderColor: "rgba(16,185,129,0.35)" }}>
      <SectionTitle icon="🛡️" title={t("shieldTitle")} sub={t("shieldSub")} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input className="cab-input" value={domain} onChange={e => setDomain(e.target.value)} placeholder={t("shieldDomain")} style={{ flex: "2 1 200px", width: "auto" }} />
        <input className="cab-input" value={email} onChange={e => setEmail(e.target.value)} placeholder={t("shieldEmail")} style={{ flex: "2 1 200px", width: "auto" }} />
        <button className="cab-btn" disabled={busy || !domain.trim()} onClick={activate} style={{ background: "linear-gradient(135deg,#10B981,#059669)", flex: "1 1 180px" }}>
          {busy ? t("shieldBusy") : "🛡️ " + t("shieldBtn")}
        </button>
      </div>
      {msg && <div style={{ marginTop: 10, fontSize: 12, color: msg.ok ? TOKENS.green : TOKENS.red }}>{msg.text}</div>}
    
      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(42,42,58,0.6)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: TOKENS.text, marginBottom: 8 }}>🔮 {t("shieldHow")}</div>
        <div style={{ fontSize: 12.5, color: TOKENS.sub, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{t("shieldHowText")}</div>
      </div>
    </Card>
  );
}
