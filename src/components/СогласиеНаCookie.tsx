"use client";
import { useEffect, useState } from "react";
import { useЯзык } from "@/lib/server-locale";

/**
 * 🔴 НА ЭТОМ САЙТЕ БАННЕРА СОГЛАСИЯ НЕ БЫЛО ВООБЩЕ.
 *
 * У трёх сестёр он есть, у radiocode.space — не было ни одного. При этом сайт
 * подключает счётчик Google. Спасало только то, что режим согласия выставлен в
 * «запрещено» по умолчанию, — то есть хранение не включалось и без баннера.
 *
 * Но выходило две беды сразу:
 *   1. человеку негде было прочитать, что мы вообще используем cookie, и негде
 *      отказаться осознанно — а право отказаться должно быть предъявлено, а не
 *      подразумеваться;
 *   2. согласие нельзя было и ДАТЬ: код читал ключ `aifa_cookie_consent` из
 *      хранилища браузера, а поставить его было некому — хранилище у каждого
 *      домена своё, и баннер соседнего сайта сюда не дотягивается. Значит
 *      статистика на этом сайте не собиралась вовсе, сколько бы человек ни
 *      соглашался на других.
 *
 * Поведение повторяет сестринский баннер один в один: тот же ключ хранения, те
 * же две кнопки, то же обновление режима согласия Google. Разное поведение на
 * одинаковых кнопках — само по себе дефект.
 */
const КЛЮЧ = "aifa_cookie_consent";

const ТЕКСТ: Record<string, { текст: string; принять: string; отказ: string; политика: string }> = {
  ru: {
    текст: "Мы используем cookie для работы сайта и анонимной статистики. Без вашего согласия статистика не собирается.",
    принять: "Принять", отказ: "Только необходимые", политика: "Политика конфиденциальности",
  },
  en: {
    текст: "We use cookies for site functionality and anonymous analytics. Without your consent no analytics is collected.",
    принять: "Accept", отказ: "Essential only", политика: "Privacy Policy",
  },
  es: {
    текст: "Usamos cookies para el sitio y analíticas anónimas. Sin tu consentimiento no se recopila ninguna analítica.",
    принять: "Aceptar", отказ: "Solo esenciales", политика: "Política de Privacidad",
  },
  zh: {
    текст: "我们使用 Cookie 以保障网站功能与匿名统计。未经您同意，不会收集任何统计数据。",
    принять: "接受", отказ: "仅必要", политика: "隐私政策",
  },
};

export default function СогласиеНаCookie() {
  const язык = useЯзык();
  const [показать, setПоказать] = useState(false);

  useEffect(() => {
    // Спрашиваем ОДИН раз: если выбор уже сделан, баннер не показываем.
    try { if (!localStorage.getItem(КЛЮЧ)) setПоказать(true); } catch { /* хранилище закрыто — не мешаем человеку */ }
  }, []);

  const выбрать = (значение: "all" | "essential") => {
    try { localStorage.setItem(КЛЮЧ, значение); } catch { /* не смогли запомнить — не беда, спросим снова */ }
    try {
      const gtag = (window as unknown as { gtag?: (...а: unknown[]) => void }).gtag;
      if (typeof gtag === "function") {
        const состояние = значение === "all" ? "granted" : "denied";
        gtag("consent", "update", {
          ad_storage: состояние,
          analytics_storage: состояние,
          ad_user_data: состояние,
          ad_personalization: состояние,
        });
      }
    } catch { /* счётчика может не быть — отказ всё равно записан */ }
    setПоказать(false);
  };

  if (!показать) return null;
  const т = ТЕКСТ[язык] || ТЕКСТ.en;

  return (
    <div
      role="region"
      aria-label={т.политика}
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999,
        background: "rgba(5,5,7,0.97)", borderTop: "1px solid rgba(0,240,255,0.35)",
        backdropFilter: "blur(8px)", padding: "14px 18px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, color: "#C9C9DE", flex: "1 1 320px", lineHeight: 1.5 }}>
          🍪 {т.текст}{" "}
          <a
            href="https://www.codeofdigitaleternity.com/privacy-policy"
            rel="noopener"
            style={{ color: "#00F0FF", textDecoration: "underline" }}
          >
            {т.политика}
          </a>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {/* Отказ стоит ПЕРВЫМ и выглядит равноправной кнопкой, а не серой
              надписью сбоку: право отказаться не должно быть спрятано. */}
          <button
            onClick={() => выбрать("essential")}
            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(139,139,168,0.6)", background: "transparent", color: "#C9C9DE", cursor: "pointer", fontSize: 13 }}
          >
            {т.отказ}
          </button>
          <button
            onClick={() => выбрать("all")}
            style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "linear-gradient(135deg,#00F0FF,#B000FF)", color: "#050507", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >
            {т.принять}
          </button>
        </div>
      </div>
    </div>
  );
}
