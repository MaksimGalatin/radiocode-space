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

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    try {
      localStorage.removeItem("aifa_user_email");
      localStorage.removeItem("user_email");
      document.cookie = "user_session=; path=/; max-age=0";
    } catch {}
    setIsLoggedIn(false);
    setUserEmail(null);
    window.location.reload();
  };

  const labels: Record<string, { login: string; logout: string }> = {
    ru: { login: "Вход в кабинет", logout: "Выйти из Кабинета" },
    en: { login: "Sign In to Cabinet", logout: "Sign Out of Cabinet" },
    es: { login: "Entrar al Gabinete", logout: "Salir del Gabinete" },
    zh: { login: "进入控制台", logout: "退出控制台" },
  };

  const l = labels[lang] || labels.ru;

  if (isLoggedIn) {
    return (
      <motion.button
        onClick={handleLogout}
        title={userEmail ? `Залогинен как: ${userEmail}` : l.logout}
        whileHover={{ scale: 1.04 }}
        className={
          className ||
          "flex items-center gap-2 px-1.5 sm:px-3.5 py-1.5 rounded-full cursor-pointer transition-colors"
        }
        style={{
          background: "rgba(16, 185, 129, 0.1)",
          border: "1px solid rgba(16, 185, 129, 0.35)",
        }}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[13px] font-mono font-medium tracking-wider text-emerald-400 hidden 2xl:inline uppercase">
          {l.logout}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.a
      href="/cabinet"
      aria-label={l.login}
      whileHover={{ scale: 1.04 }}
      className={
        className ||
        "flex items-center gap-1.5 px-1.5 sm:px-3.5 py-1.5 rounded-full transition-colors"
      }
      style={{
        background: "rgba(0, 240, 255, 0.06)",
        border: "1px solid rgba(0, 240, 255, 0.18)",
      }}
    >
      <svg viewBox="0 0 24 24" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      </svg>
      <span className="text-[13px] font-mono font-medium tracking-wider text-[#00F0FF]/90 hidden 2xl:inline uppercase">
        {l.login}
      </span>
    </motion.a>
  );
}
