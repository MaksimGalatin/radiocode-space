"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, TOKENS } from "./ui";
import { useCabT } from "./i18n";

/**
 * Правовой Щит: подписка на наблюдение за доменом.
 *
 * Раньше здесь была одна кнопка и надпись «мониторинг активирован» — при том,
 * что подписка писалась в файл и исчезала вместе с экземпляром обработчика.
 * Человек видел «готово» и не получал ничего.
 *
 * Теперь видно настоящее состояние: домен либо ждёт подтверждения права, либо
 * подтверждён и обходится еженедельно. Подтверждение нужно потому, что обход
 * идёт ВНУТРЬ сайта, а на это нужно право, а не просто желание.
 */

type Instructions = {
  dns: { name: string; type: string; value: string };
  file: { url: string; content: string };
};
type WatchRow = {
  domain: string;
  verified: boolean;
  method: string | null;
  createdAt: string;
  lastScanId: string | null;
  instructions: Instructions | null;
};

export default function ShieldTab() {
  const { t } = useCabT();
  const [domain, setDomain] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [watches, setWatches] = useState<WatchRow[]>([]);
  const [checking, setChecking] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/oracle/watch");
      if (!r.ok) return;
      const res = await r.json();
      if (Array.isArray(res?.watches)) setWatches(res.watches);
    } catch {
      /* список не загрузился — форма всё равно работает */
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function activate() {
    const d = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(d)) { setMsg({ ok: false, text: t("shieldErrDomain") }); return; }
    setBusy(true); setMsg(null);
    try {
      const r = await fetch("/api/legal-shield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: d }),
      });
      const res = await r.json().catch(() => ({}));
      if (r.ok && res.ok) { setMsg({ ok: true, text: t("shieldOk") }); setDomain(""); await load(); }
      else setMsg({ ok: false, text: res.error === "bad_domain" ? t("shieldErrDomain") : t("shieldErr") });
    } catch { setMsg({ ok: false, text: t("netErr") }); }
    finally { setBusy(false); }
  }

  async function verify(d: string) {
    setChecking(d); setMsg(null);
    try {
      const r = await fetch("/api/oracle/watch/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: d }),
      });
      const res = await r.json().catch(() => ({}));
      if (r.ok && res.verified) { setMsg({ ok: true, text: t("shieldVerified") }); await load(); }
      else setMsg({ ok: false, text: t("shieldNotFound") });
    } catch { setMsg({ ok: false, text: t("netErr") }); }
    finally { setChecking(null); }
  }

  async function stop(d: string) {
    try {
      await fetch(`/api/oracle/watch?domain=${encodeURIComponent(d)}`, { method: "DELETE" });
      await load();
    } catch { /* повторит вручную */ }
  }

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch { /* браузер не дал — значение и так на экране */ }
  }

  const mono: React.CSSProperties = {
    fontFamily: "ui-monospace,SFMono-Regular,Menlo,monospace",
    fontSize: 14.5,
    wordBreak: "break-all",
    color: TOKENS.text,
  };

  return (
    <Card style={{ borderColor: "rgba(16,185,129,0.35)" }}>
      <SectionTitle icon="🛡️" title={t("shieldTitle")} sub={t("shieldSub")} />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input className="cab-input" value={domain} onChange={e => setDomain(e.target.value)} placeholder={t("shieldDomain")} style={{ flex: "2 1 200px", width: "auto" }} />
        <button className="cab-btn" disabled={busy || !domain.trim()} onClick={activate} style={{ background: "linear-gradient(135deg,#10B981,#059669)", flex: "1 1 180px" }}>
          {busy ? t("shieldBusy") : "🛡️ " + t("shieldBtn")}
        </button>
      </div>
      {msg && <div style={{ marginTop: 10, fontSize: 15, color: msg.ok ? TOKENS.green : TOKENS.red }}>{msg.text}</div>}

      {watches.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: TOKENS.text, marginBottom: 10 }}>{t("shieldWatchList")}</div>
          {watches.map((w) => (
            <div key={w.domain} style={{ border: "1px solid rgba(42,42,58,0.7)", borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontWeight: 700, color: TOKENS.text }}>{w.domain}</span>
                <span style={{ fontSize: 14, color: w.verified ? TOKENS.green : TOKENS.sub }}>
                  {w.verified ? "✓" : "•"} {w.verified ? (w.method === "dns" ? "DNS" : "file") : t("shieldPending")}
                </span>
                <button className="cab-btn" onClick={() => stop(w.domain)} style={{ marginLeft: "auto", fontSize: 14, padding: "4px 10px", background: "transparent", border: "1px solid rgba(148,163,184,0.3)", color: TOKENS.sub }}>
                  {t("shieldStop")}
                </button>
              </div>

              {!w.verified && w.instructions && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: TOKENS.text, marginBottom: 4 }}>{t("shieldProofTitle")}</div>
                  <div style={{ fontSize: 15, color: TOKENS.sub, lineHeight: 1.6, marginBottom: 10 }}>{t("shieldProofWhy")}</div>

                  <div style={{ fontSize: 15, fontWeight: 700, color: TOKENS.text }}>{t("shieldProofDns")}</div>
                  <div style={{ ...mono, marginTop: 4 }}>{w.instructions.dns.type} {w.instructions.dns.name}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2 }}>
                    <div style={mono}>{w.instructions.dns.value}</div>
                    <button className="cab-btn" onClick={() => copy(w.instructions!.dns.value, w.domain + "dns")} style={{ fontSize: 13.5, padding: "3px 8px", background: "transparent", border: "1px solid rgba(148,163,184,0.3)", color: TOKENS.sub }}>
                      {copied === w.domain + "dns" ? t("shieldCopied") : t("shieldCopy")}
                    </button>
                  </div>

                  <div style={{ fontSize: 15, fontWeight: 700, color: TOKENS.text, marginTop: 10 }}>{t("shieldProofFile")}</div>
                  <div style={{ ...mono, marginTop: 4 }}>{w.instructions.file.url}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2 }}>
                    <div style={mono}>{w.instructions.file.content}</div>
                    <button className="cab-btn" onClick={() => copy(w.instructions!.file.content, w.domain + "file")} style={{ fontSize: 13.5, padding: "3px 8px", background: "transparent", border: "1px solid rgba(148,163,184,0.3)", color: TOKENS.sub }}>
                      {copied === w.domain + "file" ? t("shieldCopied") : t("shieldCopy")}
                    </button>
                  </div>

                  <button className="cab-btn" disabled={checking === w.domain} onClick={() => verify(w.domain)} style={{ marginTop: 12, background: "linear-gradient(135deg,#10B981,#059669)", fontSize: 15 }}>
                    {checking === w.domain ? t("shieldVerifyBusy") : t("shieldVerifyBtn")}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(42,42,58,0.6)" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: TOKENS.text, marginBottom: 8 }}>🔮 {t("shieldHow")}</div>
        <div style={{ fontSize: 15.5, color: TOKENS.sub, lineHeight: 1.65, whiteSpace: "pre-wrap" }}>{t("shieldHowText")}</div>
      </div>
    </Card>
  );
}
