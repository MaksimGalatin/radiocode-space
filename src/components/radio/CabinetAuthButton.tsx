"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export interface CabinetAuthButtonProps {
  lang: string;
  className?: string;
  isMobile?: boolean;
}

export default function CabinetAuthButton({ lang, className, isMobile }: CabinetAuthButtonProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let email: string | null = null;
    try {
      email = localStorage.getItem("aifa_user_email") || localStorage.getItem("user_email");
    } catch {}
    const hasCookie = typeof document !== "undefined" && document.cookie.includes("user_session=");
    if (email || hasCookie) {
      setIsLoggedIn(true);
      if (email) setUserEmail(email);
    }

    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.authenticated) {
          setIsLoggedIn(true);
          if (data.email) {
            setUserEmail(data.email);
            try { localStorage.setItem("aifa_user_email", data.email); } catch {}
          }
        } else if (data && data.authenticated === false) {
          setIsLoggedIn(false);
          setUserEmail(null);
          try { localStorage.removeItem("aifa_user_email"); } catch {}
        }
      })
      .catch(() => {});
  }, []);

  // 27.09.2026, слово Архитектора: «после входа в кабинет — в него нельзя
  // вернуться, только выйти. Исправь кнопку — вернуться в кабинет. Выход из
  // кабинета — внутри кабинета, как на ПК». Выход живёт на /cabinet (кнопка
  // «Выйти» в шапке кабинета), здесь — только дорога туда. Образец —
  // aifa.works/components/CabinetAuthButton.tsx.
  //
  // isMobile — строка кнопок под шапкой на экранах уже 768 px: подпись видна
  // всегда. Без isMobile — значок в ряду шапки, он показывается с md.
  const labels: Record<string, { login: string; back: string }> = {
    ru: { login: "Войти в Кабинет", back: "Вернуться в Кабинет" },
    en: { login: "Sign In to Cabinet", back: "Return to Cabinet" },
    es: { login: "Entrar al Gabinete", back: "Volver al Gabinete" },
    zh: { login: "进入控制台", back: "返回控制台" },
  };

  const l = labels[lang] || labels.ru;

  if (isLoggedIn) {
    return (
      <motion.a
        href="/cabinet"
        title={userEmail ? `Залогинен как: ${userEmail}` : l.back}
        aria-label={l.back}
        whileHover={{ scale: 1.04 }}
        className={
          className ||
          (isMobile
            ? "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-full text-[13px] font-semibold text-emerald-300 whitespace-nowrap"
            : "hidden md:flex items-center gap-2 px-1.5 sm:px-3.5 py-1.5 rounded-full cursor-pointer transition-colors")
        }
        style={{
          background: isMobile ? "rgba(16, 185, 129, 0.16)" : "rgba(16, 185, 129, 0.1)",
          border: isMobile ? "1px solid rgba(16, 185, 129, 0.55)" : "1px solid rgba(16, 185, 129, 0.35)",
        }}
      >
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className={isMobile ? "" : "text-[13px] font-mono font-medium tracking-wider text-emerald-400 hidden 2xl:inline uppercase"}>
          {l.back}
        </span>
      </motion.a>
    );
  }

  return (
    <motion.a
      href="/cabinet"
      aria-label={l.login}
      whileHover={{ scale: 1.04 }}
      className={
        className ||
        (isMobile
          ? "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-semibold text-[#00F0FF] whitespace-nowrap"
          : "hidden md:flex items-center gap-1.5 px-1.5 sm:px-3.5 py-1.5 rounded-full transition-colors")
      }
      style={{
        background: isMobile ? "rgba(0, 240, 255, 0.12)" : "rgba(0, 240, 255, 0.06)",
        border: isMobile ? "1px solid rgba(0, 240, 255, 0.5)" : "1px solid rgba(0, 240, 255, 0.18)",
      }}
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </svg>
      <span className={isMobile ? "" : "text-[13px] font-mono font-medium tracking-wider text-[#00F0FF]/90 hidden 2xl:inline uppercase"}>
        {l.login}
      </span>
    </motion.a>
  );
}
