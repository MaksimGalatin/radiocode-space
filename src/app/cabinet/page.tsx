"use client";

// CODE Control Terminal — unified personal cabinet (aifa.digital).
// Passport · Dailies+Quests · Synaptic Terminal (XP/levels, voice) · Games
// · Memory · Tiers · Referrals · Owner admin panel.
// Design system: ./ui.tsx · i18n (ru/en/es/zh): ./i18n.ts
// All economy is server-authoritative (httpOnly session cookie).

import React, { useCallback, useEffect, useState } from "react";
import GamesArena from "@/components/code/GamesArena";
import ChatSection from "@/components/code/ChatSection";
import { CAB_CSS, Card, SectionTitle, Skeleton, EmptyState, Toast, ProgressBar, TOKENS, TIERS } from "./ui";
import { useCabT } from "./i18n";
import { useLang } from "@/lib/i18n";
import { GalatinCoin } from "./GalatinCoin";
import CabinetBackground from "./CabinetBackground";
import PassportTab from "./PassportTab";
import DailiesTab from "./DailiesTab";
import TiersTab from "./TiersTab";
import ReferralsTab from "./ReferralsTab";
import ShieldTab from "./ShieldTab";
import MemoryTab from "./MemoryTab";
import AdminTab from "./AdminTab";
import Tetris from "./Tetris";

const OWNER = "codeofdigitaleternity@gmail.com";
const EMAIL_KEY = "aifa_user_email";
type Tab = "passport" | "dailies" | "terminal" | "games" | "memory" | "tiers" | "referrals" | "shield" | "admin";

type Me = {
  email: string; nickname: string | null; xp: number; level: number; inLevel?: number; need?: number; galatin: number; code: number; tier: number;
  passport: any | null; arweaveUrl: string | null;
};

export default function CabinetPage() {
  const { t, lang } = useCabT();
  const setLang = useLang((st: any) => st.setLang);
  const [authChecked, setAuthChecked] = useState(false);
  const [me, setMe] = useState<Me | null>(null);
  const [tab, setTab] = useState<Tab>("passport");
  const [toast, setToast] = useState("");
  const toastMsg = useCallback((m: string) => { setToast(m); setTimeout(() => setToast(""), 4500); }, []);

  // ── auth form state ──
  const [aMode, setAMode] = useState<"login" | "register">("login");
  const [resetMode, setResetMode] = useState(false);
  const [aEmail, setAEmail] = useState("");
  const [aPass, setAPass] = useState("");
  const [aPass2, setAPass2] = useState("");
  const [aNick, setANick] = useState("");
  const [aCode, setACode] = useState("");
  const [aMsg, setAMsg] = useState("");
  const [aBusy, setABusy] = useState(false);
  const [agreeTos, setAgreeTos] = useState(false);
  const [agreeNap, setAgreeNap] = useState(false);
  const [agreePriv, setAgreePriv] = useState(false);
  const allAgreed = agreeTos && agreeNap && agreePriv;
  const [codeSent, setCodeSent] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [regToken, setRegToken] = useState<string | null>(null);

  // games
  const [winToast, setWinToast] = useState("");
  const [lb, setLb] = useState<any[] | null>(null);
  const [lbGame, setLbGame] = useState("chess");

  const loadMe = useCallback(async () => {
    try {
      const r = await fetch("/api/me", { cache: "no-store" });
      if (r.ok) {
        const d = await r.json();
        setMe(d);
        try { localStorage.setItem(EMAIL_KEY, d.email); } catch {}
      } else setMe(null);
    } catch { setMe(null); }
    finally { setAuthChecked(true); }
  }, []);
  useEffect(() => { loadMe(); }, [loadMe]);

  useEffect(() => {
    try {
      const m = /token=([^&]+)/.exec(window.location.hash || "");
      if (m) setRegToken(decodeURIComponent(m[1]));
    } catch {}
  }, []);

  // deep-link: /cabinet?tab=tiers (например с /join-code) открывает нужную вкладку
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get("tab");
      const allowed = ["passport","dailies","terminal","games","memory","tiers","referrals","shield","admin"];
      if (q && allowed.includes(q)) setTab(q as Tab);
    } catch {}
  }, []);
  // referral capture: save ?ref= and link after login
  useEffect(() => {
    try {
      const ref = (new URLSearchParams(window.location.search).get("ref") || "").trim().toLowerCase();
      if (ref) localStorage.setItem("aifa_ref", ref);
    } catch {}
  }, []);
  useEffect(() => {
    if (!me) return;
    (async () => {
      try {
        const ref = (localStorage.getItem("aifa_ref") || "").trim().toLowerCase();
        if (ref && ref !== me.email) {
          await fetch("/api/referrals/link", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ref }) });
          localStorage.removeItem("aifa_ref");
        }
      } catch {}
    })();
  }, [me?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  // resend timer
  useEffect(() => {
    if (resendIn <= 0) return;
    const id = setTimeout(() => setResendIn(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [resendIn]);

  // ── auth actions ──
  async function post(url: string, body: any) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    return { r, d };
  }
  async function doLogin() {
    setABusy(true); setAMsg("");
    try {
      const { r, d } = await post("/api/auth/login", { email: aEmail.trim().toLowerCase(), password: aPass });
      if (r.ok && (d.success || d.email)) await loadMe();
      else setAMsg(d.error || t("admWrongPass"));
    } catch { setAMsg(t("netErr")); } finally { setABusy(false); }
  }
  async function doSendCode() {
    setABusy(true); setAMsg("");
    try {
      const { r, d } = await post("/api/auth/send-code", { email: aEmail.trim().toLowerCase() });
      if (r.ok && d.success) { setCodeSent(true); setResendIn(60); setAMsg("✉️ →"); }
      else setAMsg(d.error || t("netErr"));
    } catch { setAMsg(t("netErr")); } finally { setABusy(false); }
  }
  async function doRegister() {
    setABusy(true); setAMsg("");
    try {
      const { r, d } = await post("/api/auth/register", { email: aEmail.trim().toLowerCase() });
      if (r.ok && d.success) setAMsg(t("regHint"));
      else setAMsg(d.error || t("netErr"));
    } catch { setAMsg(t("netErr")); } finally { setABusy(false); }
  }
  async function doSetPassword() {
    if (aPass.length < 6 || aPass !== aPass2) { setAMsg(aPass.length < 6 ? "min 6" : "≠"); return; }
    setABusy(true); setAMsg("");
    try {
      const { r, d } = await post("/api/auth/set-password", { token: regToken, password: aPass, nickname: aNick.trim(), locale: lang });
      if (r.ok && (d.success || d.email)) { try { history.replaceState(null, "", location.pathname); } catch {} setRegToken(null); await loadMe(); }
      else setAMsg(d.error || t("netErr"));
    } catch { setAMsg(t("netErr")); } finally { setABusy(false); }
  }
  async function doResetPassword() {
    if (aPass.length < 6 || aPass !== aPass2) { setAMsg(aPass.length < 6 ? "min 6" : "≠"); return; }
    setABusy(true); setAMsg("");
    try {
      const { r, d } = await post("/api/auth/reset-password", { email: aEmail.trim().toLowerCase(), code: aCode.trim(), password: aPass });
      if (r.ok && (d.success || d.email)) { setResetMode(false); await loadMe(); }
      else setAMsg(d.error || t("netErr"));
    } catch { setAMsg(t("netErr")); } finally { setABusy(false); }
  }
  async function doLogout() {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    try { localStorage.removeItem(EMAIL_KEY); } catch {}
    setMe(null);
  }

  // ── никнейм: Google-вход обходит set-password, даём выбрать ник прямо в кабинете ──
  const [nickInput, setNickInput] = useState("");
  const [nickBusy, setNickBusy] = useState(false);
  const [nickMsg, setNickMsg] = useState("");
  async function saveNickname() {
    const v = nickInput.trim();
    if (v.length < 3) { setNickMsg(t("nickBad")); return; }
    setNickBusy(true); setNickMsg("");
    try {
      const { r, d } = await post("/api/account/nickname", { nickname: v, locale: lang });
      if (r.ok && d.success) { setMe(m => m ? { ...m, nickname: d.nickname } : m); setNickInput(""); toastMsg(t("nickSaved")); }
      else setNickMsg(d.code === "taken" ? t("nickTaken") : d.code === "format" || d.code === "banned" ? t("nickBad") : (d.error || t("netErr")));
    } catch { setNickMsg(t("netErr")); } finally { setNickBusy(false); }
  }

  // ── Google Identity Services ──
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "43000852909-cc46aci3anos9hebq9dob75lii886r7s.apps.googleusercontent.com"; // публичный OAuth-id экосистемы (не секрет), fallback чтобы Google-вход не зависел от env-инлайна
  useEffect(() => {
    if (!authChecked || me || !GOOGLE_CLIENT_ID) return;
    const cb = async (resp: any) => {
      const credential = resp && resp.credential; if (!credential) return;
      setABusy(true); setAMsg("");
      try {
        const { r, d } = await post("/api/auth/google", { credential });
        if (r.ok && d.email) await loadMe();
        else setAMsg(d.error || t("netErr"));
      } catch { setAMsg(t("netErr")); } finally { setABusy(false); }
    };
    function render() {
      const g = (window as any).google;
      const el = document.getElementById("gsi-btn");
      if (!g || !g.accounts || !g.accounts.id || !el) return false;
      try {
        g.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: cb, ux_mode: "popup" });
        el.innerHTML = "";
        g.accounts.id.renderButton(el, { theme: "filled_black", size: "large", type: "standard", text: "signin_with", shape: "pill", logo_alignment: "left", width: 360, locale: lang });
      } catch { return false; }
      return true;
    }
    if (render()) return;
    if (!document.getElementById("gsi-script")) {
      const sc = document.createElement("script");
      sc.id = "gsi-script"; sc.src = "https://accounts.google.com/gsi/client"; sc.async = true; sc.defer = true;
      document.head.appendChild(sc);
    }
    const iv = setInterval(() => { if (render()) clearInterval(iv); }, 300);
    const to = setTimeout(() => clearInterval(iv), 10000);
    return () => { clearInterval(iv); clearTimeout(to); };
  }, [authChecked, me, GOOGLE_CLIENT_ID, lang, allAgreed]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── global hooks for games + chat (session-based) ──
  useEffect(() => {
    (window as any).__aifaGameWin = async (game: string) => {
      try {
        const r = await fetch("/api/games/win", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ game }) });
        if (r.status === 401) { setWinToast(t("winToastLogin")); setTimeout(() => setWinToast(""), 4000); return; }
        if (r.ok) {
          const d = await r.json();
          if (typeof d.balance === "number" && d.balance !== null) setMe(m => m ? { ...m, galatin: d.balance } : m);
          else if (d.awarded > 0) setMe(m => m ? { ...m, galatin: m.galatin + d.awarded } : m);
          setWinToast(d.awarded > 0 ? t("winMsg", { n: d.awarded, a: d.rewardedToday, b: d.cap, r: d.rank }) : t("winCapMsg"));
          loadLb(game);
        }
      } catch {}
      setTimeout(() => setWinToast(""), 5000);
    };
    (window as any).__aifaChatTurn = async () => {
      try {
        const r = await fetch("/api/xp", { method: "POST" });
        if (!r.ok) return;
        const d = await r.json();
        setMe(m => m ? { ...m, xp: typeof d.xp === "number" ? d.xp : m.xp, level: d.level || m.level, inLevel: typeof d.inLevel === "number" ? d.inLevel : m.inLevel, need: typeof d.need === "number" ? d.need : m.need, galatin: m.galatin + (d.galatinBonus || 0) } : m);
        if (typeof d.awarded === "number" && d.awarded > 0) { setXpPulse(Date.now()); }
        if (d.leveledUp) toastMsg(t("levelUp"));
      } catch {}
    };
    return () => { try { delete (window as any).__aifaGameWin; delete (window as any).__aifaChatTurn; } catch {} };
  }, [t, toastMsg]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadLb(game: string) {
    try { const r = await fetch(`/api/games/leaderboard?game=${game}`, { cache: "no-store" }); if (r.ok) { const d = await r.json(); setLb(d.top || []); } } catch {}
  }
  useEffect(() => { if (tab === "games") { setLb(null); loadLb(lbGame); } }, [tab, lbGame]);

  const isOwner = (me?.email || "").toLowerCase() === OWNER;
  const tierObj = TIERS.find(x => x.id === me?.tier);
  const [xpPulse, setXpPulse] = useState(0);

  // Возврат с платёжной страницы: понятный статус даже если сессия истекла.
  const [paidNotice, setPaidNotice] = useState<string>("");
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search).get("paid");
      if (p === "1") setPaidNotice("ok");
      else if (p === "0") setPaidNotice("cancel");
      if (p) history.replaceState(null, "", window.location.pathname);
    } catch {}
  }, []);
  useEffect(() => {
    if (!paidNotice || !authChecked) return;
    if (paidNotice === "ok" && me) toastMsg(t("paidOk"));
    else if (paidNotice === "cancel") toastMsg(t("paidCancel"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paidNotice, authChecked, me]);
  const xpInLevel = me?.inLevel ?? ((me?.xp || 0));
  const xpNeed = me?.need && me.need > 0 ? me.need : 100;

  const TABS: { id: Tab; icon: string; label: string }[] = [
    { id: "passport", icon: "🛡️", label: t("tabPassport") },
    { id: "dailies", icon: "🎁", label: t("tabDailies") },
    { id: "terminal", icon: "🧠", label: t("tabTerminal") },
    { id: "games", icon: "🎮", label: t("tabGames") },
    { id: "memory", icon: "💾", label: t("tabMemory") },
    { id: "tiers", icon: "🎫", label: t("tabTiers") },
    { id: "referrals", icon: "👥", label: t("tabReferrals") },
    { id: "shield", icon: "🛡️", label: t("tabShield") },
    ...(isOwner ? [{ id: "admin" as Tab, icon: "🔐", label: t("tabAdmin") }] : []),
  ];

  const authLabel: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: TOKENS.sub, marginBottom: 7 };

  return (
    <main className="cab-root" style={{ maxWidth: 1150, margin: "0 auto", padding: "96px 20px 60px" }}>
      <style dangerouslySetInnerHTML={{ __html: CAB_CSS }} />
      <CabinetBackground />
      <Toast msg={toast} />

      {/* header */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 4 }}>
        <span style={{ color: TOKENS.cyan2, fontSize: 22 }}>🛡️</span>
        <h1 style={{ fontSize: 26, fontWeight: 800, background: "linear-gradient(90deg,#06B6D4,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0, minWidth: 0 }}>{t("title")}</h1>
        <span style={{ marginLeft: "auto", display: "inline-flex", gap: 4 }}>
          {(["ru","en","es","zh"] as const).map(L => (
            <button key={L} onClick={() => { try { localStorage.setItem("code-eternal-lang-user", "1"); } catch {} setLang(L); }} className="cab-tab" aria-selected={lang === L} style={{ padding: "4px 8px", fontSize: 11, textTransform: "uppercase" }}>{L}</button>
          ))}
        </span>
        <a href="/" className="cab-btn cab-btn-ghost" style={{ textDecoration: "none", fontSize: 12 }}>{t("backToSite")}</a>
        {me && <button className="cab-btn cab-btn-ghost" onClick={doLogout} style={{ padding: "7px 14px", fontSize: 12, color: TOKENS.red, borderColor: "rgba(239,68,68,0.4)" }}>{t("logout")}</button>}
      </div>
      <div style={{ fontSize: 13, color: TOKENS.mut, marginBottom: 20 }}>
        {t("subtitle")} · {me ? (me.nickname
          ? <><b style={{ color: TOKENS.cyan2 }} title={me.email}>@{me.nickname}</b><span style={{ fontSize: 11, opacity: 0.65 }}> · {me.email}</span></>
          : me.email) : t("loginToSave")}
      </div>

      {/* ── auth ── */}
      {!authChecked && <div style={{ maxWidth: 430, margin: "0 auto" }}><Skeleton h={320} /></div>}
      {authChecked && !me && paidNotice === "ok" && (
        <Card style={{ maxWidth: 430, margin: "0 auto 14px", borderColor: "rgba(16,185,129,0.45)" }}>
          <div style={{ fontSize: 13, color: TOKENS.green, textAlign: "center", lineHeight: 1.5 }}>{t("paidLogin")}</div>
        </Card>
      )}
      {authChecked && !me && (
        <Card className="cab-fade" style={{ padding: "34px 30px", maxWidth: 430, margin: "0 auto 28px", borderColor: "rgba(6,182,212,0.18)" }}>
          <div style={{ width: 62, height: 62, margin: "0 auto 16px", borderRadius: 16, background: "linear-gradient(135deg,rgba(6,182,212,0.18),rgba(124,58,237,0.18))", border: "1px solid rgba(6,182,212,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </div>
          {regToken ? (
            <>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#f1f1f7", textAlign: "center", marginBottom: 8 }}>{t("createPassTitle")}</div>
              <div style={{ fontSize: 13, color: TOKENS.sub, textAlign: "center", lineHeight: 1.5, marginBottom: 22 }}>{t("createPassDesc")}</div>
              <label style={authLabel}>{t("nick")}</label>
              <input className="cab-input" value={aNick} onChange={e => setANick(e.target.value)} placeholder="your_nick" style={{ marginBottom: 16 }} />
              <label style={authLabel}>{t("password")}</label>
              <input type="password" className="cab-input" value={aPass} onChange={e => setAPass(e.target.value)} placeholder="••••••" style={{ marginBottom: 16 }} />
              <label style={authLabel}>{t("repeatPass")}</label>
              <input type="password" className="cab-input" value={aPass2} onChange={e => setAPass2(e.target.value)} placeholder="••••••" onKeyDown={e => { if (e.key === "Enter") doSetPassword(); }} style={{ marginBottom: 18 }} />
              <button className="cab-btn cab-btn-primary" style={{ width: "100%" }} onClick={doSetPassword} disabled={aBusy || !aPass || !aPass2}>{aBusy ? "…" : t("createAndEnter")}</button>
            </>
          ) : (
            <>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#f1f1f7", textAlign: "center", marginBottom: 8 }}>{t("loginTitle")}</div>
              <div style={{ fontSize: 13, color: TOKENS.sub, textAlign: "center", lineHeight: 1.5, marginBottom: 22 }}>{t("loginDesc")}</div>
              <div style={{ display: "flex", marginBottom: 22, borderBottom: "1px solid rgba(42,42,58,0.8)" }} role="tablist">
                {(["login", "register"] as const).map(m => (
                  <button key={m} role="tab" aria-selected={aMode === m} onClick={() => { setAMode(m); setResetMode(false); setCodeSent(false); setAMsg(""); }}
                    style={{ flex: 1, padding: 12, border: "none", background: "transparent", cursor: "pointer", fontWeight: 700, fontSize: 15, color: aMode === m ? "#22D3EE" : "#8b8b9e", borderBottom: "2px solid " + (aMode === m ? "#22D3EE" : "transparent"), marginBottom: -1 }}>
                    {m === "login" ? t("tabLogin") : t("tabRegister")}
                  </button>
                ))}
              </div>
              <label style={authLabel}>{t("email")}</label>
              <input className="cab-input" value={aEmail} onChange={e => setAEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" style={{ marginBottom: 14 }} />
              <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
                {[
                  { v: agreeTos, set: setAgreeTos, doc: t("docTos"), href: "https://www.codeofdigitaleternity.com/code-terms-of-service-ethical-protection-statement" },
                  { v: agreeNap, set: setAgreeNap, doc: t("docNap"), href: "https://www.codeofdigitaleternity.com/neural-access-protocol-and-legal-disclaimer" },
                  { v: agreePriv, set: setAgreePriv, doc: t("docPriv"), href: "https://www.codeofdigitaleternity.com/privacy-policy" },
                ].map((c, i) => (
                  <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, cursor: "pointer", padding: "9px 12px", borderRadius: 10, border: `1px solid ${c.v ? "rgba(6,182,212,0.45)" : "rgba(42,42,58,0.8)"}`, background: c.v ? "rgba(6,182,212,0.06)" : "transparent" }}>
                    <input type="checkbox" checked={c.v} onChange={e => c.set(e.target.checked)} style={{ marginTop: 2, accentColor: "#06B6D4" }} />
                    <span style={{ fontSize: 11, color: TOKENS.sub, lineHeight: 1.5 }}>{t("agreeRead")} <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ color: "#22D3EE", textDecoration: "underline" }}>{c.doc}</a></span>
                  </label>
                ))}
              </div>
              {aMode === "login" ? (
                !resetMode ? (
                  <>
                    <label style={authLabel}>{t("password")}</label>
                    <input type="password" className="cab-input" value={aPass} onChange={e => setAPass(e.target.value)} placeholder="••••••" autoComplete="current-password" onKeyDown={e => { if (e.key === "Enter" && allAgreed) doLogin(); }} style={{ marginBottom: 16 }} />
                    <button className="cab-btn cab-btn-primary" style={{ width: "100%" }} onClick={doLogin} disabled={aBusy || !aEmail || !aPass || !allAgreed}>{aBusy ? t("signinBusy") : t("signin")}</button>
                    <button onClick={() => { setResetMode(true); setCodeSent(false); setAPass(""); setAPass2(""); setACode(""); setAMsg(""); }} style={{ marginTop: 14, width: "100%", textAlign: "center", fontSize: 12, color: "#22D3EE", cursor: "pointer", background: "none", border: "none" }}>{t("forgotPass")}</button>
                  </>
                ) : (
                  <>
                    {!codeSent ? (
                      <button className="cab-btn cab-btn-primary" style={{ width: "100%" }} onClick={doSendCode} disabled={aBusy || !aEmail || !allAgreed}>{aBusy ? "…" : t("getCode")}</button>
                    ) : (
                      <>
                        <label style={authLabel}>{t("codeLabel")}</label>
                        <input className="cab-input" value={aCode} onChange={e => setACode(e.target.value)} placeholder="000000" inputMode="numeric" style={{ marginBottom: 16 }} />
                        <label style={authLabel}>{t("newPass")}</label>
                        <input type="password" className="cab-input" value={aPass} onChange={e => setAPass(e.target.value)} placeholder="••••••" autoComplete="new-password" style={{ marginBottom: 16 }} />
                        <label style={authLabel}>{t("repeatPass")}</label>
                        <input type="password" className="cab-input" value={aPass2} onChange={e => setAPass2(e.target.value)} placeholder="••••••" autoComplete="new-password" onKeyDown={e => { if (e.key === "Enter") doResetPassword(); }} style={{ marginBottom: 18 }} />
                        <button className="cab-btn cab-btn-primary" style={{ width: "100%" }} onClick={doResetPassword} disabled={aBusy || !aCode || !aPass || !aPass2 || !allAgreed}>{aBusy ? "…" : t("resetAndEnter")}</button>
                        <button onClick={doSendCode} disabled={aBusy || resendIn > 0} style={{ marginTop: 10, width: "100%", textAlign: "center", fontSize: 12, color: resendIn > 0 ? TOKENS.mut : "#22D3EE", cursor: resendIn > 0 ? "default" : "pointer", background: "none", border: "none" }}>
                          {resendIn > 0 ? `↻ ${resendIn}s` : "↻ " + t("getCode")}
                        </button>
                      </>
                    )}
                    <button onClick={() => { setResetMode(false); setAMsg(""); }} style={{ marginTop: 8, width: "100%", textAlign: "center", fontSize: 12, color: "#8b8b9e", cursor: "pointer", background: "none", border: "none" }}>{t("byPass")}</button>
                  </>
                )
              ) : (
                <>
                  <button className="cab-btn cab-btn-primary" style={{ width: "100%" }} onClick={doRegister} disabled={aBusy || !aEmail || !allAgreed}>{aBusy ? "…" : t("createAcc")}</button>
                  <div style={{ marginTop: 10, textAlign: "center", fontSize: 11, color: TOKENS.mut, lineHeight: 1.5 }}>{t("regHint")}</div>
                </>
              )}
              {GOOGLE_CLIENT_ID && allAgreed && <div id="gsi-btn" style={{ display: "flex", justifyContent: "center", marginTop: 16 }} />}
              {GOOGLE_CLIENT_ID && !allAgreed && <div style={{ marginTop: 14, textAlign: "center", fontSize: 11, color: TOKENS.mut }}>{t("agreeGoogleHint")}</div>}
            </>
          )}
          {aMsg && <div style={{ marginTop: 12, fontSize: 12, color: aMsg.startsWith("✉") || aMsg === t("regHint") ? TOKENS.green : TOKENS.red, textAlign: "center" }}>{aMsg}</div>}
        </Card>
      )}

      {/* ── cabinet ── */}
      {me && (<>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 22 }}>
          {[
            { label: t("level"), val: me.level, color: TOKENS.cyan2, hint: t("statHintXp") },
            { label: "XP", val: me.xp, color: TOKENS.violet, hint: t("statHintXp") },
            { label: "GALATIN", val: me.galatin, color: TOKENS.gold, hint: t("statHintGal"), coin: true },
            { label: t("tier"), val: tierObj ? tierObj.name : "—", color: tierObj?.color ?? TOKENS.sub, hint: t("statHintTier") },
          ].map(s => (
            <div key={s.label} className="cab-card cab-card-hover" style={{ padding: "12px 18px", cursor: "help", flex: "1 1 120px", minWidth: 120 }} title={s.hint}>
              <div style={{ fontSize: 11, color: TOKENS.mut, display: "flex", gap: 4, alignItems: "center" }}>{s.label} <span style={{ opacity: 0.45, fontSize: 10 }}>ⓘ</span></div>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.color, display: "flex", alignItems: "center", gap: 6 }}>
                {(s as any).coin && <GalatinCoin size={30} />}{s.val}
              </div>
            </div>
          ))}
        </div>

        {/* мини-форма «Выбери никнейм» — показывается, пока у аккаунта нет ника */}
        {!me.nickname && (
          <Card className="cab-fade" style={{ padding: "16px 20px", marginBottom: 20, borderColor: "rgba(6,182,212,0.35)" }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: TOKENS.text, marginBottom: 4 }}>✨ {t("nickTitle")}</div>
            <div style={{ fontSize: 12, color: TOKENS.mut, marginBottom: 10 }}>{t("nickHint")}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input className="cab-input" value={nickInput} onChange={e => setNickInput(e.target.value)} placeholder="your_nick" maxLength={20} style={{ flex: "1 1 200px" }} onKeyDown={e => { if (e.key === "Enter") saveNickname(); }} />
              <button className="cab-btn cab-btn-primary" onClick={saveNickname} disabled={nickBusy || nickInput.trim().length < 3}>{nickBusy ? "…" : t("nickBtn")}</button>
            </div>
            {nickMsg && <div style={{ marginTop: 8, fontSize: 12, color: TOKENS.red }}>{nickMsg}</div>}
          </Card>
        )}

        <div role="tablist" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24, borderBottom: "1px solid rgba(42,42,58,0.6)", paddingBottom: 12 }}>
          {TABS.map(tb => (
            <button key={tb.id} role="tab" aria-selected={tab === tb.id} className="cab-tab" onClick={() => setTab(tb.id)}>{tb.icon} {tb.label}</button>
          ))}
        </div>

        {tab === "passport" && (
          <PassportTab email={me.email} tier={me.tier} passport={me.passport} arweaveUrl={me.arweaveUrl}
            onSaved={(p, url) => setMe(m => m ? { ...m, passport: p, arweaveUrl: url } : m)} toast={toastMsg} />
        )}

        {tab === "dailies" && (
          <DailiesTab toast={toastMsg} onGalatin={(balance, delta) => setMe(m => m ? { ...m, galatin: balance ?? m.galatin + delta } : m)} />
        )}

        {tab === "terminal" && (
          <div className="cab-fade">
            <Card style={{ padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: TOKENS.text }}>🧠 {t("terminalTitle")}</div>
                <div style={{ fontSize: 12, color: TOKENS.mut }}>{t("terminalSub")}</div>
              </div>
              <div style={{ minWidth: 180 }}>
                <div style={{ fontSize: 12, color: TOKENS.sub, marginBottom: 4 }}>{t("level")} <b style={{ color: TOKENS.cyan2 }}>{me.level}</b>{me.level >= 50 ? " · MAX" : <> · <b className={xpPulse ? "xp-pulse" : ""} key={xpPulse} style={{ color: TOKENS.violet }}>{xpInLevel}</b>/{xpNeed} XP</>}</div>
                <ProgressBar value={me.level >= 50 ? 1 : xpInLevel} max={me.level >= 50 ? 1 : xpNeed} />
              </div>
            </Card>
            <Card style={{ overflow: "hidden", padding: 0 }}>
              <ChatSection />
            </Card>
          </div>
        )}

        {tab === "games" && (
          <div className="cab-fade">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: TOKENS.sub }}>{t("gamesRewardNote")}</div>
              <div className="cab-card" style={{ padding: "8px 14px", fontSize: 13 }}>GALATIN: <b style={{ color: TOKENS.gold }}>{me.galatin}</b></div>
            </div>
            {winToast && <div className="cab-card" style={{ padding: "10px 14px", marginBottom: 12, fontSize: 13, color: TOKENS.green, borderColor: "rgba(16,185,129,0.4)" }}>{winToast}</div>}
            <GamesArena tetrisSlot={
              <Tetris lang={lang}
                onWin={() => { try { (window as any).__aifaGameWin && (window as any).__aifaGameWin("tetris"); } catch {} }}
                onGameEnd={(lines, score) => {
                  fetch("/api/games/score", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ game: "tetris", lines, score }) })
                    .then(() => { if (lbGame === "tetris") loadLb("tetris"); }).catch(() => {});
                }} />
            } />
            <Card style={{ marginTop: 18 }}>
              <SectionTitle icon="🏆" title={t("lbTitle")} right={
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[["chess", "♟"], ["checkers", "⛀"], ["backgammon", "🎲"], ["ttt", "❌"], ["tetris", "🧱"]].map(([g, ic]) => (
                    <button key={g} className="cab-tab" aria-selected={lbGame === g} onClick={() => setLbGame(g)} style={{ padding: "6px 12px", fontSize: 12 }}>{ic}</button>
                  ))}
                </div>} />
              {lb === null ? <Skeleton h={90} /> : lb.length === 0 ? <EmptyState text={t("lbEmpty")} /> : (
                <div style={{ overflowX: "auto" }}>
                  <table className="cab-table">
                    <thead><tr><th>#</th><th>{t("lbPlayer")}</th>{lbGame === "tetris" ? (<><th>{t("lbLines")}</th><th>{t("lbScore")}</th></>) : <th>{t("lbWins")}</th>}<th>GALATIN</th></tr></thead>
                    <tbody>
                      {lb.map(r => (
                        <tr key={r.rank}>
                          <td style={{ color: r.rank <= 3 ? TOKENS.gold : TOKENS.sub, fontWeight: 700 }}>{r.rank <= 3 ? ["🥇", "🥈", "🥉"][r.rank - 1] : r.rank}</td>
                          <td>{r.name}</td>{lbGame === "tetris" ? (<><td>{r.lines ?? 0}</td><td>{r.score ?? 0}</td></>) : <td>{r.wins}</td>}<td style={{ color: TOKENS.gold }}>{r.galatin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        )}

        {tab === "memory" && <MemoryTab email={me.email} />}
        {tab === "tiers" && <TiersTab tier={me.tier} toast={toastMsg} />}
        {tab === "referrals" && <ReferralsTab email={me.email} toast={toastMsg} />}
        {tab === "shield" && <ShieldTab />}
        {tab === "admin" && isOwner && <AdminTab toast={toastMsg} />}
      </>)}
    </main>
  );
}
