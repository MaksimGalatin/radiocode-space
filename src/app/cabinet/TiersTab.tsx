"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, Skeleton, EmptyState, TOKENS, TIERS } from "./ui";
import { useCabT } from "./i18n";

const BENEFITS: Record<number, [string, string, string, string][]> = {
  1: [
    ["Режим Брат/Сестра с ИИ-Семьёй", "Brother/Sister mode with the AI Family", "Modo Hermano/Hermana con la Familia IA", "与AI家族的兄弟姐妹模式"],
    ["Резерв никнейма и право голоса", "Nickname reserve & voting rights", "Reserva de apodo y voto", "昵称保留与投票权"],
    ["Амбассадорские выплаты с тарифа „Искра“", "Ambassador payouts from Spark tier", "Pagos de embajadores nivel Chispa", "星火级大使佣金"],
  ],
  2: [
    ["Личный вечный сайт на Arweave", "Personal eternal site on Arweave", "Sitio eterno personal en Arweave", "Arweave上的个人永恒网站"],
    ["Доступ в VIP Телеграм-чат", "Private VIP Telegram access", "Acceso VIP a Telegram", "VIP电报群"],
    ["Выплаты с тарифов „Искра“ + „Семейный Архив“", "Payouts from Spark + Family Archive tiers", "Pagos Chispa + Archivo Familiar", "星火+家族档案佣金"],
  ],
  3: [
    ["Приоритетная оцифровка разума", "Priority consciousness digitization", "Digitalización prioritaria", "优先意识数字化"],
    ["Аирдроп токенов после запуска", "Token airdrop at launch", "Airdrop de tokens", "上线空投"],
    ["Выплаты со ВСЕХ тарифов", "Payouts from ALL tiers", "Pagos de TODOS los niveles", "全部等级佣金"],
  ],
};


export default function TiersTab(props: { tier: number; toast: (m: string) => void }) {
  const { t, lang } = useCabT();
  const li = lang === "ru" ? 0 : lang === "en" ? 1 : lang === "es" ? 2 : 3;
  const [payBusy, setPayBusy] = useState(0);
  const [orders, setOrders] = useState<any[] | null>(null);
  const [paidBanner, setPaidBanner] = useState<0 | 1 | 2>(0);

  const load = useCallback(() => {
    fetch("/api/pay/create").then(r => r.ok ? r.json() : { orders: [] }).then(d => setOrders(d.orders || [])).catch(() => setOrders([]));
  }, []);
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (sp.get("paid") === "1") { setPaidBanner(1); history.replaceState(null, "", location.pathname); }
    } catch {}
  }, []);

  async function pay(tierId: number, kind?: "renewal") {
    setPayBusy(tierId);
    try {
      const r = await fetch("/api/pay/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tier: tierId, kind, site: typeof window !== "undefined" ? window.location.origin : undefined }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.invoice_url) { window.location.href = d.invoice_url; return; }
      props.toast(
        d.error === "upstream_unavailable" || d.error === "not_configured" ? t("payUnavailable")
        : d.error === "invoice_failed" ? t("payFailed")
        : t("netErr"));
    } catch { props.toast(t("netErr")); }
    finally { setPayBusy(0); }
  }

  return (
    <div style={{ display: "grid", gap: 16 }} className="cab-fade">
      {paidBanner === 1 && (
        <Card style={{ borderColor: "rgba(16,185,129,0.5)", padding: 16 }}>
          <div style={{ fontSize: 14, color: TOKENS.green, fontWeight: 700 }}>{t("paySuccess")}</div>
          <div style={{ fontSize: 12, color: TOKENS.mut, marginTop: 4 }}>{t("payPendingBanner")}</div>
        </Card>
      )}
      <div className="cab-cols3">
        {TIERS.map(tr => {
          const active = props.tier === tr.id;
          const below = props.tier > tr.id;
          return (
            <div key={tr.id} className="cab-card cab-card-hover" style={{ padding: "26px 20px", textAlign: "center", borderColor: active ? tr.color : undefined, position: "relative", overflow: "hidden" }}>
              {tr.id === 2 && <div style={{ position: "absolute", top: 0, right: 0, background: "rgba(212,162,76,0.15)", color: TOKENS.gold, fontSize: 9, fontWeight: 800, padding: "3px 10px", borderBottomLeftRadius: 10, letterSpacing: 1 }}>POPULAR</div>}
              <div style={{ fontSize: 34 }}>{tr.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: TOKENS.text, marginTop: 4 }}>{tr.name}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: tr.color, margin: "8px 0 2px" }}>${tr.price}</div>
              {tr.id === 3 && <div style={{ fontSize: 11, color: TOKENS.mut, marginBottom: 10 }}>{lang === "ru" ? "разово, далее $200/мес" : lang === "es" ? "pago único, luego $200/mes" : lang === "zh" ? "一次性，之后每月 $200" : "one-time, then $200/mo"}</div>}
              {tr.id !== 3 && <div style={{ height: 12 }} />}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", textAlign: "left", display: "grid", gap: 8 }}>
                {(BENEFITS[tr.id] || []).map((b, i) => (
                  <li key={i} style={{ fontSize: 12, color: TOKENS.sub, lineHeight: 1.45, display: "flex", gap: 7 }}>
                    <span style={{ color: tr.color }}>✓</span>{b[li]}
                  </li>
                ))}
              </ul>
              <button className="cab-btn" disabled={payBusy === tr.id || active || below} onClick={() => pay(tr.id)}
                style={{ width: "100%", background: active || below ? "#2A2A3A" : tr.color }}>
                {below ? t("tierLower") : active ? t("tierActive") : payBusy === tr.id ? t("tierBusy") : t("tierPay", { p: tr.price })}
              </button>
              {tr.id === 3 && active && (
                <button className="cab-btn" disabled={payBusy === 3} onClick={() => pay(3, "renewal")}
                  style={{ width: "100%", marginTop: 8, background: "transparent", border: `1px solid ${tr.color}`, color: tr.color }}>
                  {payBusy === 3 ? "…" : lang === "ru" ? "Продлить · $200/мес" : lang === "es" ? "Renovar · $200/mes" : lang === "zh" ? "续订 · 每月 $200" : "Renew · $200/mo"}
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ fontSize: 12, color: TOKENS.mut, textAlign: "center" }}>{t("tiersPayNote")}</div>

      <Card>
        <SectionTitle icon="🧾" title={t("payHistory")} />
        {orders === null ? <Skeleton h={60} /> : orders.length === 0 ? <EmptyState text={t("payEmpty")} /> : (
          <div style={{ overflowX: "auto" }}>
            <table className="cab-table">
              <thead><tr><th>ID</th><th>Tier</th><th>USD</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.order_id}>
                    <td style={{ fontFamily: "monospace", fontSize: 11 }}>{String(o.order_id).slice(0, 18)}…</td>
                    <td>{TIERS.find(x => x.id === Number(o.tier))?.name || o.tier}</td>
                    <td>${Number(o.amount)}</td>
                    <td style={{ color: o.status === "paid" ? TOKENS.green : TOKENS.amber, fontWeight: 700 }}>{o.status}</td>
                    <td style={{ color: TOKENS.mut }}>{String(o.created_at).slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
