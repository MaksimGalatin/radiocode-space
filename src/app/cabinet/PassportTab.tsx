"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, TOKENS, TIERS } from "./ui";
import { useCabT } from "./i18n";

type Passport = {
  username: string; displayName: string; bio: string; manifesto: string;
  telegram: string; twitter: string; website: string; avatarDataUrl: string;
};

export default function PassportTab(props: {
  email: string;
  tier: number;
  passport: Passport | null;
  arweaveUrl: string | null;
  onSaved: (p: Passport, arweaveUrl: string | null) => void;
  toast: (m: string) => void;
}) {
  const { t } = useCabT();
  const tierObj = TIERS.find(x => x.id === props.tier);
  const [flipped, setFlipped] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarKb, setAvatarKb] = useState(0);
  const [avatarErr, setAvatarErr] = useState("");
  const [busy, setBusy] = useState<"" | "save" | "mint">("");
  const [err, setErr] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const p = props.passport;
    if (!p) return;
    setUsername(p.username || ""); setDisplayName(p.displayName || "");
    setManifesto(p.manifesto || ""); setTelegram(p.telegram || "");
    setTwitter(p.twitter || ""); setWebsite(p.website || ""); setAvatar(p.avatarDataUrl || "");
  }, [props.passport]);

  function pickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return; setAvatarErr("");
    const reader = new FileReader();
    reader.onload = ev => { const img = new Image(); img.onload = () => {
      const MAX = 256; let w = img.width, h = img.height;
      if (w > MAX || h > MAX) { if (w > h) { h = Math.round(h * MAX / w); w = MAX; } else { w = Math.round(w * MAX / h); h = MAX; } }
      const cv = document.createElement("canvas"); cv.width = w; cv.height = h; cv.getContext("2d")!.drawImage(img, 0, 0, w, h);
      let q = 0.8; let du = cv.toDataURL("image/jpeg", q);
      while (du.length > 80000 && q > 0.25) { q -= 0.15; du = cv.toDataURL("image/jpeg", q); }
      if (du.length > 90000) { setAvatarErr(t("avatarTooBig")); return; }
      setAvatar(du); setAvatarKb(Math.round(du.length / 1024));
    }; img.src = ev.target!.result as string; };
    reader.readAsDataURL(file);
  }

  const current: Passport = { username, displayName, bio: "", manifesto, telegram, twitter, website, avatarDataUrl: avatar };

  async function save(): Promise<boolean> {
    setBusy("save"); setErr(""); setUsernameErr("");
    try {
      const r = await fetch("/api/passport", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(current) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) {
        if (r.status === 409) setUsernameErr(t("usernameTaken"));
        else setErr(d.error || t("netErr"));
        return false;
      }
      props.onSaved(current, d.arweaveUrl ?? props.arweaveUrl);
      props.toast(t("saved"));
      return true;
    } catch { setErr(t("netErr")); return false; }
    finally { setBusy(""); }
  }

  async function mint() {
    if (!username || !displayName) { setErr(t("mintFirstSave")); return; }
    if (!window.confirm(t("mintConfirm"))) return;
    setBusy("mint"); setErr("");
    try {
      const ok = await save90();
      if (!ok) return;
      const r = await fetch("/api/passport/mint", { method: "POST" });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.arweaveUrl) { props.onSaved(current, d.arweaveUrl); props.toast(t("mintDone")); }
      else if (d.error === "not_configured") setErr(t("mintNotConfigured"));
      else setErr(t("netErr"));
    } catch { setErr(t("netErr")); }
    finally { setBusy(""); }
  }
  // save without toggling busy state (mint flow already owns it)
  async function save90(): Promise<boolean> {
    try {
      const r = await fetch("/api/passport", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(current) });
      if (!r.ok) { const d = await r.json().catch(() => ({})); if (r.status === 409) setUsernameErr(t("usernameTaken")); else setErr(d.error || t("netErr")); return false; }
      return true;
    } catch { setErr(t("netErr")); return false; }
  }

  const lbl: React.CSSProperties = { fontSize: 12, color: TOKENS.mut, display: "block", marginBottom: 8 };
  const minted = !!props.arweaveUrl;

  return (
    <div className="cab-cols-pass cab-fade">
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: TOKENS.sub, marginBottom: 12 }}>🛡️ {t("passTitle")}</div>
        <div className="cab-pass" onClick={() => setFlipped(f => !f)} role="button" tabIndex={0}
          onKeyDown={e => { if (e.key === "Enter") setFlipped(f => !f); }}
          style={{ padding: 26, minHeight: 240 }}>
          {!flipped ? (
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: TOKENS.cyan }}>CODE ETERNAL</div>
                <div style={{ fontSize: 18 }}>🛡️</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                {avatar
                  ? <img src={avatar} alt="" width={64} height={64} loading="lazy" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${tierObj?.color || TOKENS.violet}`, boxShadow: "0 0 24px rgba(124,58,237,0.35)" }} />
                  : <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{tierObj?.icon ?? "👤"}</div>}
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17, color: TOKENS.text }}>{displayName || "Guardian"}</div>
                  <div style={{ fontSize: 12, fontFamily: "monospace", color: TOKENS.cyan }}>{username ? "@" + username : props.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, fontSize: 12, color: TOKENS.mut, flexWrap: "wrap" }}>
                <span>🏆 Tier: <b style={{ color: tierObj?.color ?? TOKENS.sub }}>{tierObj ? tierObj.name : "None"}</b></span>
                <span>📅 {new Date().toLocaleDateString()}</span>
              </div>
              {manifesto && <div style={{ fontSize: 12, color: TOKENS.sub, marginTop: 12, fontStyle: "italic", lineHeight: 1.5 }}>&ldquo;{manifesto.slice(0, 140)}{manifesto.length > 140 ? "…" : ""}&rdquo;</div>}
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(42,42,58,0.5)", fontSize: 10, color: minted ? TOKENS.green : TOKENS.mut, display: "flex", justifyContent: "space-between" }}>
                <span>{minted ? t("passEternal") + " ✓" : t("passNotMinted")}</span>
                <span style={{ opacity: 0.6 }}>{t("passFlipHint")}</span>
              </div>
            </div>
          ) : (
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, color: TOKENS.mut, marginBottom: 14 }}>{t("passVerification")}</div>
              {props.arweaveUrl
                ? <a className="cab-link" href={props.arweaveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 12, fontFamily: "monospace", wordBreak: "break-all" }}>{props.arweaveUrl}</a>
                : <div style={{ color: TOKENS.mut, fontSize: 13, textAlign: "center", padding: "26px 0" }}>🔒 {t("passNotIssued")}</div>}
              <div style={{ marginTop: 16, fontSize: 10, color: TOKENS.mut }}>{t("passFlipHint")}</div>
            </div>
          )}
        </div>
      </div>

      <Card>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>👤 {t("fUsername")} <span style={{ opacity: .6 }}>· a-z 0-9 _ - · 3-32</span></label>
          <input className="cab-input" value={username} maxLength={32} placeholder="yourname"
            onChange={e => { setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase()); setUsernameErr(""); }}
            style={usernameErr ? { borderColor: TOKENS.red } : undefined} aria-invalid={!!usernameErr} />
          {usernameErr && <div style={{ fontSize: 11, color: TOKENS.red, marginTop: 4 }}>{usernameErr}</div>}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>✏️ {t("fName")} <span style={{ opacity: .6 }}>· {displayName.length}/40</span></label>
          <input className="cab-input" value={displayName} maxLength={40} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>⚡ {t("fManifesto")} <span style={{ opacity: .6 }}>· {manifesto.length}/500</span></label>
          <textarea className="cab-input" value={manifesto} maxLength={500} rows={3} onChange={e => setManifesto(e.target.value)} placeholder={t("fManifestoPh")} style={{ resize: "vertical" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>🖼️ {t("fAvatar")}</label>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={pickAvatar} />
          <button type="button" onClick={() => fileRef.current?.click()}
            style={{ width: "100%", background: "#13131C", border: `1px dashed ${avatar ? TOKENS.violet : "#2A2A3A"}`, borderRadius: 10, padding: 14, textAlign: "center", cursor: "pointer", color: TOKENS.mut, fontSize: 12 }}>
            {avatar ? `${t("avatarChosen")}${avatarKb ? " · " + avatarKb + " KB" : ""}` : "📤 " + t("fUpload")}
          </button>
          {avatarErr && <div style={{ fontSize: 11, color: TOKENS.red, marginTop: 4 }}>{avatarErr}</div>}
        </div>
        <div style={{ marginBottom: 18, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <div><label style={lbl}>📱 TG</label><input className="cab-input" maxLength={64} value={telegram} onChange={e => setTelegram(e.target.value)} placeholder="user" style={{ fontSize: 13, padding: "9px 10px" }} /></div>
          <div><label style={lbl}>𝕏</label><input className="cab-input" maxLength={64} value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="handle" style={{ fontSize: 13, padding: "9px 10px" }} /></div>
          <div><label style={lbl}>🌐 Site</label><input className="cab-input" maxLength={120} value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://" style={{ fontSize: 13, padding: "9px 10px" }} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          <button className="cab-btn cab-btn-ghost" disabled={!username || !displayName || !!busy} onClick={save}>
            {busy === "save" ? t("saving") : t("saveDraft")}
          </button>
          <button className="cab-btn cab-btn-violet" disabled={!username || !displayName || !!busy || minted} onClick={mint}>
            {minted ? t("mintDone") : busy === "mint" ? t("minting") : "🌐 " + t("mintBtn")}
          </button>
        </div>
        {err && <div style={{ marginTop: 10, fontSize: 12, color: TOKENS.red, textAlign: "center" }}>{err}</div>}
      </Card>
    </div>
  );
}
