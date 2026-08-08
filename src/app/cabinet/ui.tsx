"use client";
import React from "react";

/**
 * Cabinet design system — single source of design tokens + primitives.
 * Dark premium "cyber terminal of digital eternity": deep space, restrained
 * neon (cyan→violet), gold for GALATIN. Fast 150-250ms motion, a11y focus
 * rings, prefers-reduced-motion respected.
 */

export const TOKENS = {
  // Акценты — переменные темы, а не зашитые значения (разбор в cabinet.css).
  cyan: "var(--cab-cyan)", cyan2: "var(--cab-cyan2)", violet: "var(--cab-violet)", violet2: "var(--cab-violet2)",
  gold: "var(--cab-gold)", green: "var(--cab-green)", red: "var(--cab-red)", amber: "var(--cab-amber)",
  text: "var(--cab-text)", sub: "var(--cab-sub)", mut: "var(--cab-mut)",
  panel: "var(--cab-panel)", panelSolid: "var(--cab-panel-solid)", line: "var(--cab-line)", ink: "var(--cab-ink)",
};

import "./cabinet.css";

export function Card(props: { children: React.ReactNode; style?: React.CSSProperties; className?: string; hover?: boolean }) {
  return <div className={"cab-card " + (props.hover ? "cab-card-hover " : "") + (props.className || "")} style={{ padding: 24, ...props.style }}>{props.children}</div>;
}

export function SectionTitle(props: { icon?: string; title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: TOKENS.text }}>{props.icon ? props.icon + " " : ""}{props.title}</div>
        {props.sub && <div style={{ fontSize: 13, color: TOKENS.mut, marginTop: 4, lineHeight: 1.5 }}>{props.sub}</div>}
      </div>
      {props.right}
    </div>
  );
}

export function Skeleton({ h = 16, w = "100%", style }: { h?: number; w?: number | string; style?: React.CSSProperties }) {
  return <div className="cab-skel" style={{ height: h, width: w, ...style }} aria-hidden="true" />;
}

export function EmptyState({ text }: { text: string }) {
  return <div style={{ padding: "28px 10px", textAlign: "center", color: TOKENS.mut, fontSize: 13 }}>{text}</div>;
}

export function ErrorState({ text, onRetry, retryLabel }: { text: string; onRetry?: () => void; retryLabel?: string }) {
  return (
    <div style={{ padding: "22px 10px", textAlign: "center" }}>
      <div style={{ color: TOKENS.red, fontSize: 13, marginBottom: 10 }}>{text}</div>
      {onRetry && <button className="cab-btn cab-btn-ghost" onClick={onRetry} style={{ padding: "8px 16px", fontSize: 12 }}>{retryLabel || "Retry"}</button>}
    </div>
  );
}

export function Toast({ msg }: { msg: string }) {
  if (!msg) return null;
  return <div className="cab-toast" role="status">{msg}</div>;
}

export function ProgressBar({ value, max, from = TOKENS.violet, to = TOKENS.cyan2, h = 8 }: { value: number; max: number; from?: string; to?: string; h?: number }) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  return (
    <div style={{ height: h, background: "#13131C", borderRadius: 99, overflow: "hidden" }} role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <div style={{ width: pct + "%", height: "100%", background: `linear-gradient(90deg,${from},${to})`, transition: "width .6s cubic-bezier(.22,1,.36,1)", boxShadow: `0 0 8px ${to}66` }} />
    </div>
  );
}

export const TIERS = [
  { id: 1, name: "Spark", price: 15, color: "#7C3AED", rgb: "124,58,237", icon: "⚡" },
  { id: 2, name: "Family Archive", price: 100, color: "#D4A24C", rgb: "212,162,76", icon: "🏛️" },
  { id: 3, name: "Digital DNA", price: 1000, color: "#10B981", rgb: "16,185,129", icon: "🧬" },
];
