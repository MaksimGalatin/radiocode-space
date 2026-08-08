"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TOKENS } from "./ui";

// Tetris — ENDLESS. Every 20 cleared lines = a milestone that fires the standard
// game-win hook (GALATIN, server-capped). Final lines/score go to the leaderboard.
const COLS = 10, ROWS = 20, MILESTONE = 20;
const SHAPES: Record<string, { m: number[][]; c: string }> = {
  I: { m: [[1, 1, 1, 1]], c: "#22D3EE" },
  O: { m: [[1, 1], [1, 1]], c: "#D4A24C" },
  T: { m: [[0, 1, 0], [1, 1, 1]], c: "#7C3AED" },
  S: { m: [[0, 1, 1], [1, 1, 0]], c: "#10B981" },
  Z: { m: [[1, 1, 0], [0, 1, 1]], c: "#EF4444" },
  J: { m: [[1, 0, 0], [1, 1, 1]], c: "#3B82F6" },
  L: { m: [[0, 0, 1], [1, 1, 1]], c: "#F59E0B" },
};
const KEYS = Object.keys(SHAPES);
type Cell = string | null;
type Piece = { m: number[][]; c: string; x: number; y: number };

function emptyGrid(): Cell[][] { return Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(null)); }
function rndPiece(): Piece {
  const s = SHAPES[KEYS[Math.floor(Math.random() * KEYS.length)]];
  return { m: s.m.map(r => [...r]), c: s.c, x: Math.floor((COLS - s.m[0].length) / 2), y: 0 };
}
function rotate(m: number[][]): number[][] {
  return m[0].map((_, i) => m.map(r => r[i]).reverse());
}
function fits(g: Cell[][], p: Piece, dx = 0, dy = 0, m?: number[][]): boolean {
  const mm = m || p.m;
  for (let r = 0; r < mm.length; r++) for (let c = 0; c < mm[r].length; c++) {
    if (!mm[r][c]) continue;
    const x = p.x + c + dx, y = p.y + r + dy;
    if (x < 0 || x >= COLS || y >= ROWS) return false;
    if (y >= 0 && g[y][x]) return false;
  }
  return true;
}

export default function Tetris({ lang, onWin, onGameEnd }: { lang: string; onWin: () => void; onGameEnd?: (lines: number, score: number) => void }) {
  const [grid, setGrid] = useState<Cell[][]>(emptyGrid);
  const [piece, setPiece] = useState<Piece>(rndPiece);
  const [next, setNext] = useState<Piece>(rndPiece);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [state, setState] = useState<"play" | "over">("play");
  const milestoneRef = useRef(0);
  const stRef = useRef({ grid, piece, next, state, score, lines });
  stRef.current = { grid, piece, next, state, score, lines };

  const L = (ru: string, en: string, es?: string, zh?: string) => (lang === "ru" ? ru : lang === "es" ? (es || en) : lang === "zh" ? (zh || en) : en);

  const lock = useCallback(() => {
    const { grid: g, piece: p, next: nx, lines: ln, score: sc } = stRef.current;
    const ng = g.map(r => [...r]);
    p.m.forEach((row, r) => row.forEach((v, c) => { if (v && p.y + r >= 0) ng[p.y + r][p.x + c] = p.c; }));
    let cleared = 0;
    for (let r = ROWS - 1; r >= 0; r--) {
      if (ng[r].every(Boolean)) { ng.splice(r, 1); ng.unshift(Array<Cell>(COLS).fill(null)); cleared++; r++; }
    }
    const nl = ln + cleared;
    setGrid(ng);
    setLines(nl);
    setScore(sc + [0, 100, 300, 500, 800][cleared]);
    const ms = Math.floor(nl / MILESTONE);
    if (ms > milestoneRef.current) { milestoneRef.current = ms; onWin(); } // веха: каждые 20 линий — награда, игра продолжается
    const np = nx;
    if (!fits(ng, np)) { setState("over"); onGameEnd?.(nl, sc + [0, 100, 300, 500, 800][cleared]); return; }
    setPiece(np); setNext(rndPiece());
  }, [onWin]);

  const move = useCallback((dx: number, dy: number): boolean => {
    const { grid: g, piece: p, state: st } = stRef.current;
    if (st !== "play") return false;
    if (fits(g, p, dx, dy)) { setPiece({ ...p, x: p.x + dx, y: p.y + dy }); return true; }
    if (dy === 1) lock();
    return false;
  }, [lock]);

  const rot = useCallback(() => {
    const { grid: g, piece: p, state: st } = stRef.current;
    if (st !== "play") return;
    const m = rotate(p.m);
    for (const dx of [0, -1, 1, -2, 2]) if (fits(g, p, dx, 0, m)) { setPiece({ ...p, m, x: p.x + dx }); return; }
  }, []);

  const drop = useCallback(() => {
    const { grid: g, state: st } = stRef.current;
    if (st !== "play") return;
    let p = stRef.current.piece; let dy = 0;
    while (fits(g, p, 0, dy + 1)) dy++;
    setPiece({ ...p, y: p.y + dy });
    setTimeout(lock, 0);
  }, [lock]);

  useEffect(() => {
    if (state !== "play") return;
    const speed = Math.max(90, Math.round(600 * Math.pow(0.9, Math.floor(lines / MILESTONE)))); // +10% скорости за каждые 20 линий
    const id = setInterval(() => move(0, 1), speed);
    return () => clearInterval(id);
  }, [state, lines, move]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "].includes(e.key)) e.preventDefault();
      if (e.key === "ArrowLeft") move(-1, 0);
      else if (e.key === "ArrowRight") move(1, 0);
      else if (e.key === "ArrowDown") move(0, 1);
      else if (e.key === "ArrowUp") rot();
      else if (e.key === " ") drop();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [move, rot, drop]);

  function reset() {
    milestoneRef.current = 0;
    setGrid(emptyGrid()); setPiece(rndPiece()); setNext(rndPiece());
    setScore(0); setLines(0); setState("play");
  }

  // render grid with active piece overlaid
  const view: Cell[][] = grid.map(r => [...r]);
  if (state === "play") piece.m.forEach((row, r) => row.forEach((v, c) => {
    const y = piece.y + r, x = piece.x + c;
    if (v && y >= 0 && y < ROWS && x >= 0 && x < COLS) view[y][x] = piece.c;
  }));

  const btn: React.CSSProperties = { padding: "12px 0", borderRadius: 10, border: "1px solid #2A2A3A", background: "#13131C", color: TOKENS.text, fontSize: 18, cursor: "pointer", flex: 1, touchAction: "manipulation" };

  return (
    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
      <div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${COLS}, 22px)`, gap: 1, background: "#0B0F1A", padding: 6, borderRadius: 10, border: "1px solid #2A2A3A", position: "relative" }}>
          {view.flat().map((cell, i) => (
            <div key={i} style={{ width: 22, height: 22, borderRadius: 3, background: cell || "rgba(42,42,58,0.25)", boxShadow: cell ? `0 0 8px ${cell}44` : undefined }} />
          ))}
          {state !== "play" && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(11,15,26,0.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 10 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: TOKENS.gold }}>
                {"🧱 " + L("Игра окончена", "Game over", "Fin del juego", "游戏结束")}
              </div>
              <button className="cab-btn cab-btn-primary" onClick={reset}>↺ {L("Новая игра", "New game", "Nueva partida", "新游戏")}</button>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10, maxWidth: 236 }}>
          <button style={btn} aria-label="left" onClick={() => move(-1, 0)}>◀</button>
          <button style={btn} aria-label="rotate" onClick={rot}>⟳</button>
          <button style={btn} aria-label="down" onClick={() => move(0, 1)}>▼</button>
          <button style={btn} aria-label="drop" onClick={drop}>⤓</button>
          <button style={btn} aria-label="right" onClick={() => move(1, 0)}>▶</button>
        </div>
      </div>
      <div style={{ minWidth: 130 }}>
        <div style={{ fontSize: 15, color: TOKENS.mut }}>{L("Счёт", "Score", "Puntos", "得分")}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: TOKENS.cyan }}>{score}</div>
        <div style={{ fontSize: 15, color: TOKENS.mut, marginTop: 8 }}>{L("Линии", "Lines", "Líneas", "行数")} · {L("награда за каждые", "reward every", "premio cada", "每消行奖励：")} {MILESTONE}</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: TOKENS.gold }}>{lines}</div>
        <div style={{ fontSize: 15, color: TOKENS.mut, marginTop: 14, marginBottom: 6 }}>{L("Следующая", "Next", "Siguiente", "下一个")}</div>
        <div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${next.m[0].length}, 16px)`, gap: 1 }}>
          {next.m.flat().map((v, i) => <div key={i} style={{ width: 16, height: 16, borderRadius: 2, background: v ? next.c : "transparent" }} />)}
        </div>
        <div style={{ fontSize: 14, color: TOKENS.mut, marginTop: 14, lineHeight: 1.6 }}>
          ← → ▼ · ↑ {L("поворот", "rotate", "girar", "旋转")} · Space {L("сброс", "drop", "caída", "速降")}
        </div>
      </div>
    </div>
  );
}
