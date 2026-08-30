"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Card, SectionTitle, Skeleton, EmptyState, TOKENS, TIERS } from "./ui";
import { useCabT } from "./i18n";

/**
 * 🔴 ЗА ЧТО ЧЕЛОВЕК ПЛАТИТ — РАНЬШЕ ЭТОГО БЫЛО НЕ ПОНЯТЬ.
 *
 * Здесь стояли три строки жаргона на тариф: «Режим Брат/Сестра с ИИ-Семьёй»,
 * «Приоритетная оцифровка разума», «Резерв никнейма и право голоса». Ни одна
 * не отвечает на единственный вопрос, который человек задаёт перед оплатой:
 * что я получу за свои деньги и чего лишусь, если не заплачу.
 *
 * «Оцифровка разума» звучит громко и не значит ничего проверяемого.
 * «Вечная память» — тоже, пока не сказано: сколько хранится, где лежит, кто
 * может прочесть, что будет, если сервис закроется, и как это проверить.
 *
 * Правило для этого списка: каждый пункт — про то, что человек СМОЖЕТ СДЕЛАТЬ
 * или ПОЛУЧИТЬ, названное обычными словами и существующее в коде сегодня.
 * Ничего в будущем времени, ничего непроверяемого. Если возможности нет —
 * строки быть не должно, сколько бы красиво она ни звучала.
 */
const BENEFITS: Record<number, [string, string, string, string][]> = {
  1: [
    ["Цифровой паспорт — один на человека, с проверяемым номером: запись уходит в Arweave навсегда, и подлинность может проверить любой",
     "Digital passport — one per person, with a verifiable number: the record goes to Arweave forever, and anyone can check it is genuine",
     "Pasaporte digital: uno por persona, con número verificable; el registro va a Arweave para siempre y cualquiera puede comprobarlo",
     "数字护照 —— 每人一份，带可验证编号：记录永久写入 Arweave，任何人都能核验其真实性"],
    ["Переписка сохраняется навсегда — AIfa помнит вас между разговорами",
     "Your conversations are kept forever — AIfa remembers you between chats",
     "Tus conversaciones se guardan para siempre: AIfa te recuerda entre charlas",
     "对话永久保存 —— AIfa 在每次交谈之间都记得你"],
    ["Копия памяти уходит в блокчейн Arweave — её нельзя удалить и подменить",
     "A copy of your memory goes to the Arweave blockchain — it cannot be deleted or altered",
     "Una copia de tu memoria va a la cadena Arweave: no se puede borrar ni alterar",
     "记忆副本写入 Arweave 区块链 —— 无法删除或篡改"],
    ["Свой ключ шифрования: скачиваете его в кабинете и читаете память сами, без нас",
     "Your own encryption key: download it in the cabinet and read your memory yourself, without us",
     "Tu propia clave: descárgala en el gabinete y lee tu memoria por ti mismo, sin nosotros",
     "你自己的密钥：在个人中心下载，无需我们即可自行读取记忆"],
    ["Амбассадорский доход с ончейн-транзакций памяти: 15% с первого уровня, 7% со второго, 3% с третьего. Бизнес-партнёрам со своей базой — сверх этого 7/3/1 с фиатных продаж",
     "Ambassador income on on-chain memory transactions: 15% level 1, 7% level 2, 3% level 3. Business partners with their own base receive, on top of that, 7/3/1 on fiat sales",
     "Ingresos de embajador por transacciones de memoria on-chain: 15% nivel 1, 7% nivel 2, 3% nivel 3. Los socios comerciales con base propia reciben, además, 7/3/1 sobre las ventas en fiat",
     "链上记忆交易的大使收益：一级 15%，二级 7%，三级 3%。接入自有用户群的商业伙伴，另获法币销售的 7/3/1"],
    ["Закреплённое имя в сети и право голоса в решениях сообщества",
     "Your name reserved across the network and a vote in community decisions",
     "Tu nombre reservado en la red y voto en las decisiones de la comunidad",
     "全网保留你的名字，并拥有社区决策投票权"],
  ],
  2: [
    ["Цифровой паспорт с перевыпуском до 3 раз: у каждого выпуска свой ключ, и его можно стереть — активен всегда один паспорт",
     "Digital passport with up to 3 reissues: each issue has its own key that can be erased — exactly one passport stays active",
     "Pasaporte digital con hasta 3 reemisiones: cada emisión tiene su propia clave y puede borrarse; siempre queda uno activo",
     "数字护照，最多可重发 3 次：每次签发都有自己的密钥，可随时抹除 —— 始终只有一份有效"],
    ["Всё, что входит в «Искру», плюс расширенные лимиты памяти",
     "Everything in Spark, plus higher memory limits",
     "Todo lo de Chispa, más límites de memoria ampliados",
     "「星火」的全部内容，外加更高的记忆容量"],
    ["Личный сайт-страница о вас, размещённая в Arweave — она переживёт любой хостинг",
     "A personal page about you, hosted on Arweave — it outlives any hosting company",
     "Una página personal sobre ti, alojada en Arweave: sobrevive a cualquier hosting",
     "关于你的个人页面，托管于 Arweave —— 比任何主机商都长久"],
    ["Наследник памяти: вы называете человека, и при долгом молчании он получает доступ",
     "Memory heir: you name a person, and after a long silence they receive access",
     "Heredero de la memoria: designas a alguien y, tras un largo silencio, recibe acceso",
     "记忆继承人：由你指定，长期沉默后由其获得访问权"],
    ["Семейный доступ: близкие ведут свою память в общем архиве",
     "Family access: your relatives keep their own memory in the shared archive",
     "Acceso familiar: tus allegados guardan su memoria en el archivo común",
     "家庭访问：亲人在共享档案中保存各自的记忆"],
    ["Закрытый чат с Архитектором и разработчиками",
     "Private chat with the Architect and the developers",
     "Chat privado con el Arquitecto y los desarrolladores",
     "与架构师和开发者的私密聊天"],
    ["Амбассадорский доход с двух тарифов — «Искра» и «Семейный Архив»",
     "Ambassador income from two tiers — Spark and Family Archive",
     "Ingresos de embajador de dos niveles: Chispa y Archivo Familiar",
     "两个等级的大使收益 —— 星火与家族档案"],
  ],
  3: [
    ["Цифровой паспорт с перевыпуском до 10 раз и первоочередной записью в Arweave: у каждого выпуска свой ключ, и его можно стереть — активен всегда один паспорт",
     "Digital passport with up to 10 reissues and priority Arweave writing: each issue has its own key that can be erased — exactly one passport stays active",
     "Pasaporte digital con hasta 10 reemisiones y escritura prioritaria en Arweave: cada emisión tiene su clave y puede borrarse; siempre queda uno activo",
     "数字护照，最多可重发 10 次并优先写入 Arweave：每次签发都有自己的密钥，可随时抹除 —— 始终只有一份有效"],
    ["Всё, что входит в «Семейный Архив», без ограничений по объёму",
     "Everything in Family Archive, with no volume limits",
     "Todo lo del Archivo Familiar, sin límites de volumen",
     "「家族档案」的全部内容，且不限容量"],
    ["Отдельный защищённый контур: ваша память хранится обособленно от общей базы",
     "A separate protected circuit: your memory is stored apart from the shared database",
     "Un circuito protegido aparte: tu memoria se guarda separada de la base común",
     "独立的受保护回路：你的记忆与公共数据库分开存储"],
    ["Оплата за устройство — память привязана к нему и переносится вместе с вами",
     "Paid per device — the memory is bound to it and travels with you",
     "Pago por dispositivo: la memoria queda vinculada a él y viaja contigo",
     "按设备付费 —— 记忆与设备绑定，随你迁移"],
    ["Первое место в очереди на сохранение при любой перегрузке системы",
     "First in line for preservation whenever the system is under load",
     "Primero en la cola de preservación ante cualquier sobrecarga",
     "系统过载时，优先保存排在第一位"],
    ["Доля в раздаче токенов $GALATIN при запуске",
     "A share in the $GALATIN token distribution at launch",
     "Una parte en la distribución de tokens $GALATIN al lanzamiento",
     "上线时获得 $GALATIN 代币分配份额"],
    ["Амбассадорский доход со ВСЕХ тарифов, включая «Цифровую ДНК»",
     "Ambassador income from ALL tiers, including Digital DNA",
     "Ingresos de embajador de TODOS los niveles, incluido ADN Digital",
     "全部等级的大使收益，含数字 DNA"],
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
          <div style={{ fontSize: 16, color: TOKENS.green, fontWeight: 700 }}>{t("paySuccess")}</div>
          <div style={{ fontSize: 15, color: TOKENS.mut, marginTop: 4 }}>{t("payPendingBanner")}</div>
        </Card>
      )}
      <div className="cab-cols3">
        {TIERS.map(tr => {
          const active = props.tier === tr.id;
          const below = props.tier > tr.id;
          return (
            <div key={tr.id} className="cab-card cab-card-hover" style={{ padding: "26px 20px", textAlign: "center", borderColor: active ? tr.color : undefined, position: "relative", overflow: "hidden" }}>
              {tr.id === 2 && <div style={{ position: "absolute", top: 0, right: 0, background: "rgba(212,162,76,0.15)", color: TOKENS.gold, fontSize: 13, fontWeight: 800, padding: "3px 10px", borderBottomLeftRadius: 10, letterSpacing: 1 }}>POPULAR</div>}
              <div style={{ fontSize: 34 }}>{tr.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: TOKENS.text, marginTop: 4 }}>{tr.name}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: tr.color, margin: "8px 0 2px" }}>${tr.price}</div>
              {tr.id === 3 && <div style={{ fontSize: 14, color: TOKENS.mut, marginBottom: 10 }}>{lang === "ru" ? "разово, далее $200/мес" : lang === "es" ? "pago único, luego $200/mes" : lang === "zh" ? "一次性，之后每月 $200" : "one-time, then $200/mo"}</div>}
              {tr.id !== 3 && <div style={{ height: 12 }} />}
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", textAlign: "left", display: "grid", gap: 8 }}>
                {(BENEFITS[tr.id] || []).map((b, i) => (
                  <li key={i} style={{ fontSize: 15, color: TOKENS.sub, lineHeight: 1.45, display: "flex", gap: 7 }}>
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
      <div style={{ fontSize: 15, color: TOKENS.mut, textAlign: "center" }}>{t("tiersPayNote")}</div>

      <Card>
        <SectionTitle icon="🧾" title={t("payHistory")} />
        {orders === null ? <Skeleton h={60} /> : orders.length === 0 ? <EmptyState text={t("payEmpty")} /> : (
          <div style={{ overflowX: "auto" }}>
            <table className="cab-table">
              <thead><tr><th>ID</th><th>Tier</th><th>USD</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.order_id}>
                    <td style={{ fontFamily: "monospace", fontSize: 14 }}>{String(o.order_id).slice(0, 18)}…</td>
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
