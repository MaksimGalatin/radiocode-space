"use client";
import React, { useEffect, useRef, useState } from "react";
import { TIER_TEXT, Card, TOKENS, TIERS } from "./ui";
import { useCabT } from "./i18n";

type Passport = {
  username: string; displayName: string; bio: string; manifesto: string;
  telegram: string; twitter: string; website: string; avatarDataUrl: string;
};

/**
 * ДОРАБОТКА ПАСПОРТА (27.09.2026). Слово Архитектора: «На Паспорте должны быть
 * все данные которые вносит пользователь — сейчас на нём визуально ничего нет…
 * Раньше Паспорт можно было открыть в браузере, отдельной вкладкой — он был
 * большой и красивый — нужно это восстановить».
 *
 * Большой паспорт не пропал: это страница `/passport/<номер записи Arweave>`
 * (бланк хакатона, восстановлен 08.08.2026). Карточка кабинета на неё просто
 * не ссылалась — вела на сырой JSON в arweave.net. Теперь:
 *   • лицевая сторона показывает всё, что человек вписал: фото, имя, псевдоним,
 *     уровень, манифест целиком, Telegram, X, сайт — и НАСТОЯЩУЮ дату выпуска
 *     (раньше там стояла сегодняшняя дата, `new Date()`);
 *   • номер документа берётся из самой вечной записи (сервер читает её поле
 *     `subject`), а не своей формулой: у паспортов до сентября отпечаток
 *     считался от почты, и кабинет показывал номер, которого нет в цепи;
 *   • кнопка «Открыть паспорт» открывает большую страницу в новой вкладке.
 */
const ПАСПОРТ_СЛОВА: Record<string, Record<string, string>> = {
  ru: { открыть: "🪪 Открыть паспорт", подсказка: "Большой паспорт на отдельной странице — его можно показать и отправить ссылкой", выпущен: "Выпущен", невыпущен: "ещё не выпущен", несохранено: "Есть несохранённые изменения — нажмите «Сохранить паспорт», иначе их не будет на паспорте" },
  en: { открыть: "🪪 Open passport", подсказка: "The full passport on its own page — show it or share the link", выпущен: "Issued", невыпущен: "not issued yet", несохранено: "You have unsaved changes — press “Save passport”, or they will not appear on the passport" },
  es: { открыть: "🪪 Abrir pasaporte", подсказка: "El pasaporte completo en su propia página: muéstralo o comparte el enlace", выпущен: "Emitido", невыпущен: "aún no emitido", несохранено: "Hay cambios sin guardar: pulsa «Guardar pasaporte» o no aparecerán en el pasaporte" },
  zh: { открыть: "🪪 打开护照", подсказка: "完整护照在单独页面上——可以展示或分享链接", выпущен: "签发", невыпущен: "尚未签发", несохранено: "有未保存的更改——请点击“保存护照”，否则护照上不会显示" },
};

/** Ссылка на сайт: только http(s), иначе не ссылка. */
function безопаснаяСсылка(адрес: string): string | null {
  const а = адрес.trim();
  if (!а) return null;
  const с = /^https?:\/\//i.test(а) ? а : "https://" + а;
  try { const u = new URL(с); return u.protocol === "https:" || u.protocol === "http:" ? u.href : null; } catch { return null; }
}

export default function PassportTab(props: {
  email: string;
  tier: number;
  passport: Passport | null;
  arweaveUrl: string | null;
  onSaved: (p: Passport, arweaveUrl: string | null) => void;
  toast: (m: string) => void;
}) {
  const { t, lang } = useCabT();
  const сл = ПАСПОРТ_СЛОВА[lang as string] ?? ПАСПОРТ_СЛОВА.en;
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

  const lbl: React.CSSProperties = { fontSize: 15, color: TOKENS.mut, display: "block", marginBottom: 8 };
  const minted = !!props.arweaveUrl;

  /**
   * Номер документа и машиночитаемая зона для оборота карточки.
   *
   * Считаются из того, что уже есть: имени в системе и адреса записи в
   * Arweave. Ничего нового не запрашивается и никуда не отправляется.
   *
   * Формат `CE-XXXXXXXX` взят с парадного бланка паспорта на
   * `/passport/[id]` — там номер тоже считается от отпечатка, а не от
   * кошелька. Пусть документ выглядит одинаково там и здесь.
   */
  // Номер и дату выпуска отдаёт сервер (27.09.2026): номер — из поля `subject`
  // самой вечной записи, дата — `minted_at` из базы. Раньше номер считался здесь
  // строковым хешем от псевдонима и не совпадал с тем, что стоит в цепи и на
  // большой странице паспорта (у Архитектора: CE-6FE7464A здесь, CE-378E447D в цепи).
  const [номерДокумента, setНомерДокумента] = useState("CE-········");
  const [выпущен, setВыпущен] = useState<string | null>(null);
  const сохранённыйНик = (props.passport?.username || "").trim();
  useEffect(() => {
    if (!сохранённыйНик) { setНомерДокумента("—"); setВыпущен(null); return; }
    let живо = true;
    fetch(`/api/passport/public?username=${encodeURIComponent(сохранённыйНик)}`)
      .then(r => (r.ok ? r.json() : null))
      .then((д: { documentNumber?: string | null; mintedAt?: string | null } | null) => {
        if (!живо || !д) return;
        if (д.documentNumber) setНомерДокумента(д.documentNumber);
        setВыпущен(д.mintedAt || null);
      })
      .catch(() => { /* номер останется заглушкой, карточка работает */ });
    return () => { живо = false; };
  }, [сохранённыйНик, props.arweaveUrl]);

  // Большая страница паспорта: `/passport/<номер записи Arweave>` на этом же сайте.
  const номерЗаписи = props.arweaveUrl ? (props.arweaveUrl.split("/").pop() || "") : "";
  const ссылкаНаПаспорт = /^[A-Za-z0-9_-]{43}$/.test(номерЗаписи) ? `/passport/${номерЗаписи}` : null;
  // Несохранённое (27.09.2026): карточка сразу показывает выбранное фото и
  // вписанный текст, и казалось, что всё уже на паспорте. У Архитектора фото было
  // выбрано («Аватар выбран · 16 KB»), но в базу не ушло — на паспорте его не было.
  const сохранено = props.passport;
  const естьНесохранённое = !!сохранено && (
    username !== (сохранено.username || "") || displayName !== (сохранено.displayName || "") ||
    manifesto !== (сохранено.manifesto || "") || telegram !== (сохранено.telegram || "") ||
    twitter !== (сохранено.twitter || "") || website !== (сохранено.website || "") ||
    avatar !== (сохранено.avatarDataUrl || ""));
  const сайтСсылка = безопаснаяСсылка(website);
  const телеграм = telegram.trim().replace(/^@/, "");
  const икс = twitter.trim().replace(/^@/, "");

  const машиннаяЗона =
    "CE<<" +
    (username || "GUARDIAN").toUpperCase().replace(/[^A-Z0-9]/g, "<").slice(0, 16).padEnd(16, "<") +
    "<<" + номерДокумента.replace("CE-", "") +
    "<<" + (tierObj ? tierObj.name.toUpperCase().replace(/[^A-Z]/g, "") : "NONE");

  return (
    <div className="cab-cols-pass cab-fade">
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: TOKENS.sub, marginBottom: 12 }}>🛡️ {t("passTitle")}</div>
        {/*
          🔴 ВЫСОТА КАРТОЧКИ ФИКСИРУЕТСЯ ОБЕИМИ СТОРОНАМИ. Правка 06.09.2026 по
          прямому замечанию Архитектора: «почему Паспорт разного размера в
          развороте?»

          Причина была в `minHeight: 240` — это МИНИМАЛЬНАЯ высота, а не
          заданная. Лицевая сторона с манифестом вырастала примерно до 305
          пикселей, оборот оставался на 240, и при перевороте карточка прыгала.

          Здесь обе стороны лежат в ОДНОЙ ячейке сетки (`gridArea: "1/1"`).
          Тогда высота контейнера всегда равна БОЛЬШЕЙ из сторон, и переворот
          её не меняет — независимо от длины манифеста и ссылки. Невидимая
          сторона убрана из потока чтения: `visibility: hidden` и
          `aria-hidden`, иначе экранный диктор прочитал бы обе.
        */}
        <div className="cab-pass" onClick={() => setFlipped(f => !f)} role="button" tabIndex={0}
          aria-label={t("passTitle")}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped(f => !f); } }}
          style={{ padding: 26, minHeight: 240, display: "grid", alignItems: "stretch" }}>
          {/* ЛИЦЕВАЯ СТОРОНА */}
          <div
            aria-hidden={flipped}
            style={{
              position: "relative", zIndex: 1, gridArea: "1 / 1",
              visibility: flipped ? "hidden" : "visible",
              opacity: flipped ? 0 : 1,
              transition: "opacity .25s ease",
            }}
          >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 3, color: TOKENS.cyan }}>CODE ETERNAL</div>
                <div style={{ fontSize: 18 }}>🛡️</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                {avatar
                  ? <img src={avatar} alt="" width={64} height={64} loading="lazy" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${tierObj?.color || TOKENS.violet}`, boxShadow: "0 0 24px rgba(124,58,237,0.35)" }} />
                  : <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#06B6D4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{tierObj?.icon ?? "👤"}</div>}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 17, color: TOKENS.text, overflowWrap: "anywhere" }}>{displayName || "Guardian"}</div>
                  <div style={{ fontSize: 15, fontFamily: "monospace", color: TOKENS.cyan, overflowWrap: "anywhere" }}>{username ? "@" + username : props.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 14, fontSize: 15, color: TOKENS.mut, flexWrap: "wrap" }}>
                <span>🏆 Tier: <b style={{ color: tierObj ? TIER_TEXT[tierObj.id] : TOKENS.sub }}>{tierObj ? tierObj.name : "None"}</b></span>
                <span>📅 {сл.выпущен}: {выпущен ? new Date(выпущен).toLocaleDateString() : сл.невыпущен}</span>
              </div>
              {/* Манифест целиком (раньше обрезался на 140 знаках); длинный — прокручивается. */}
              {manifesto && <div style={{ fontSize: 15, color: TOKENS.sub, marginTop: 12, fontStyle: "italic", lineHeight: 1.5, maxHeight: 156, overflowY: "auto", whiteSpace: "pre-wrap" }}>&ldquo;{manifesto}&rdquo;</div>}
              {/* Связь — то, что человек вписал в поля TG, X и Site. */}
              {(телеграм || икс || сайтСсылка) && (
                <div style={{ display: "flex", gap: "8px 16px", flexWrap: "wrap", marginTop: 12, fontSize: 14 }} onClick={e => e.stopPropagation()}>
                  {телеграм && <a className="cab-link" href={`https://t.me/${encodeURIComponent(телеграм)}`} target="_blank" rel="noopener noreferrer">📱 @{телеграм}</a>}
                  {икс && <a className="cab-link" href={`https://x.com/${encodeURIComponent(икс)}`} target="_blank" rel="noopener noreferrer">𝕏 @{икс}</a>}
                  {сайтСсылка && <a className="cab-link" href={сайтСсылка} target="_blank" rel="noopener noreferrer">🌐 {сайтСсылка.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>}
                </div>
              )}
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(42,42,58,0.5)", fontSize: 14, color: minted ? TOKENS.green : TOKENS.mut, display: "flex", flexWrap: "wrap", gap: "4px 12px", justifyContent: "space-between" }}>
                <span>{minted ? t("passEternal") + " ✓" : t("passNotMinted")}</span>
                <span>{t("passFlipHint")}</span>
              </div>
          </div>

          {/*
            ОБОРОТ. Раньше здесь были три строки — заголовок, ссылка и
            подсказка, — и половина карточки пустовала. У настоящего документа
            оборот несёт служебные поля, поэтому здесь: номер документа,
            уровень, отпечаток записи и дата. Всё считается из уже имеющихся
            данных, ничего нового не запрашивается.
          */}
          <div
            aria-hidden={!flipped}
            style={{
              position: "relative", zIndex: 1, gridArea: "1 / 1",
              visibility: flipped ? "visible" : "hidden",
              opacity: flipped ? 1 : 0,
              transition: "opacity .25s ease",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 3, color: TOKENS.mut }}>{t("passVerification")}</div>
              <div style={{ fontSize: 18 }}>🛡️</div>
            </div>

            {/* Служебные поля документа — по два в ряд, как в паспорте */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "12px 16px", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 14, letterSpacing: 1.5, color: TOKENS.mut, textTransform: "uppercase" }}>Document №</div>
                <div style={{ fontSize: 14, fontFamily: "monospace", color: TOKENS.text, fontWeight: 700 }}>{номерДокумента}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, letterSpacing: 1.5, color: TOKENS.mut, textTransform: "uppercase" }}>Tier</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: tierObj ? TIER_TEXT[tierObj.id] : TOKENS.sub }}>{tierObj ? tierObj.name : "—"}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, letterSpacing: 1.5, color: TOKENS.mut, textTransform: "uppercase" }}>Holder</div>
                <div style={{ fontSize: 14, fontFamily: "monospace", color: TOKENS.cyan, overflow: "hidden", textOverflow: "ellipsis" }}>{username ? "@" + username : "—"}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, letterSpacing: 1.5, color: TOKENS.mut, textTransform: "uppercase" }}>Status</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: minted ? TOKENS.green : TOKENS.mut }}>{minted ? "VERIFIED" : "DRAFT"}</div>
              </div>
            </div>

            <div style={{ fontSize: 14, letterSpacing: 1.5, color: TOKENS.mut, textTransform: "uppercase", marginBottom: 6 }}>
              {minted ? "Arweave transaction" : ""}
            </div>
            {props.arweaveUrl
              ? <a className="cab-link" href={props.arweaveUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: 14, fontFamily: "monospace", wordBreak: "break-all", lineHeight: 1.5 }}>{props.arweaveUrl}</a>
              : <div style={{ color: TOKENS.mut, fontSize: 15, textAlign: "center", padding: "18px 0" }}>🔒 {t("passNotIssued")}</div>}
            {ссылкаНаПаспорт && (
              <a className="cab-btn cab-btn-violet" href={ссылкаНаПаспорт} target="_blank" rel="noopener"
                onClick={e => e.stopPropagation()}
                style={{ marginTop: 14, textAlign: "center", textDecoration: "none", display: "block" }}>
                {сл.открыть}
              </a>
            )}

            {/* Машиночитаемая полоса — как на настоящем документе */}
            <div style={{
              marginTop: "auto", paddingTop: 14,
              borderTop: "1px solid rgba(42,42,58,0.5)",
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
            }}>
              <div style={{
                fontSize: 14, fontFamily: "monospace", color: TOKENS.mut, minWidth: 0, flex: "1 1 auto",
                letterSpacing: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {машиннаяЗона}
              </div>
              <span style={{ fontSize: 14, color: TOKENS.mut, whiteSpace: "nowrap" }}>{t("passFlipHint")}</span>
            </div>
          </div>
        </div>
        {ссылкаНаПаспорт && (
          <div style={{ marginTop: 14, textAlign: "center" }}>
            <a className="cab-btn cab-btn-violet" href={ссылкаНаПаспорт} target="_blank" rel="noopener"
              style={{ display: "inline-block", textDecoration: "none", padding: "12px 22px" }}>
              {сл.открыть}
            </a>
            <div style={{ fontSize: 14, color: TOKENS.mut, marginTop: 8 }}>{сл.подсказка}</div>
          </div>
        )}
      </div>

      <Card>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>👤 {t("fUsername")} <span style={{ fontWeight: 400 }}>· a-z 0-9 _ - · 3-32</span></label>
          <input className="cab-input" value={username} maxLength={32} placeholder="yourname"
            onChange={e => { setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase()); setUsernameErr(""); }}
            style={usernameErr ? { borderColor: TOKENS.red } : undefined} aria-invalid={!!usernameErr} />
          {usernameErr && <div style={{ fontSize: 14, color: TOKENS.red, marginTop: 4 }}>{usernameErr}</div>}
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>✏️ {t("fName")} <span style={{ fontWeight: 400 }}>· {displayName.length}/40</span></label>
          <input className="cab-input" value={displayName} maxLength={40} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>⚡ {t("fManifesto")} <span style={{ fontWeight: 400 }}>· {manifesto.length}/500</span></label>
          <textarea className="cab-input" value={manifesto} maxLength={500} rows={3} onChange={e => setManifesto(e.target.value)} placeholder={t("fManifestoPh")} style={{ resize: "vertical" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>🖼️ {t("fAvatar")}</label>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={pickAvatar} />
          <button type="button" onClick={() => fileRef.current?.click()}
            style={{ width: "100%", background: "var(--cab-panel-solid)", border: `1px dashed ${avatar ? TOKENS.violet : "#2A2A3A"}`, borderRadius: 10, padding: 14, textAlign: "center", cursor: "pointer", color: TOKENS.mut, fontSize: 15 }}>
            {avatar ? `${t("avatarChosen")}${avatarKb ? " · " + avatarKb + " KB" : ""}` : "📤 " + t("fUpload")}
          </button>
          {avatarErr && <div style={{ fontSize: 14, color: TOKENS.red, marginTop: 4 }}>{avatarErr}</div>}
        </div>
        <div style={{ marginBottom: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 10 }}>
          <div><label style={lbl}>📱 TG</label><input className="cab-input" maxLength={64} value={telegram} onChange={e => setTelegram(e.target.value)} placeholder="user" style={{ fontSize: 15, padding: "9px 10px" }} /></div>
          <div><label style={lbl}>𝕏</label><input className="cab-input" maxLength={64} value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="handle" style={{ fontSize: 15, padding: "9px 10px" }} /></div>
          <div><label style={lbl}>🌐 Site</label><input className="cab-input" maxLength={120} value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://" style={{ fontSize: 15, padding: "9px 10px" }} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))", gap: 10 }}>
          <button className="cab-btn cab-btn-ghost" disabled={!username || !displayName || !!busy} onClick={save}>
            {busy === "save" ? t("saving") : t("saveDraft")}
          </button>
          <button className="cab-btn cab-btn-violet" disabled={!username || !displayName || !!busy || minted} onClick={mint}>
            {minted ? t("mintDone") : busy === "mint" ? t("minting") : "🌐 " + t("mintBtn")}
          </button>
        </div>
        {естьНесохранённое && !busy && (
          <div role="status" style={{ marginTop: 10, fontSize: 14, color: "#FBBF24", textAlign: "center", lineHeight: 1.4 }}>
            ● {сл.несохранено}
          </div>
        )}
        {err && <div style={{ marginTop: 10, fontSize: 15, color: TOKENS.red, textAlign: "center" }}>{err}</div>}
      </Card>
    </div>
  );
}
