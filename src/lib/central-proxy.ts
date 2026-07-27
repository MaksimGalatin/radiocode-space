import type { NextRequest } from 'next/server';

/**
 * Unified AIfa — shared helpers for proxying chat/memory to the CENTRAL brain
 * (codeofdigitaleternity.com). One memory, one knowledge base, one provider
 * chain across all three sites. Configured via env on Vercel:
 *   AIFA_CENTRAL_API    = https://www.codeofdigitaleternity.com
 *   AIFA_INTERNAL_SECRET= shared secret (lets us bypass the center's per-IP limit)
 */

export function centralConfig(): { base: string; secret: string } | null {
  const base = process.env.AIFA_CENTRAL_API;
  const secret = process.env.AIFA_INTERNAL_SECRET;
  if (!base || !secret) return null; // not configured → caller uses local logic
  return { base: base.replace(/\/$/, ''), secret };
}

// Per-user memory headers the center needs to scope memory correctly.
const FORWARD_HEADERS = [
  'x-client-key',
  'x-solana-signature',
  'x-solana-publickey',
  'x-solana-timestamp',
];

export function buildCentralHeaders(
  req: NextRequest,
  secret: string,
  extra?: Record<string, string>
): Record<string, string> {
  const headers: Record<string, string> = { 'x-aifa-internal': secret, ...(extra || {}) };
  for (const name of FORWARD_HEADERS) {
    const v = req.headers.get(name);
    if (v) headers[name] = v;
  }
  return headers;
}

/** fetch with an abort timeout; returns null instead of throwing. */
export async function centralFetch(url: string, init: RequestInit, timeoutMs = 25_000): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    console.warn('[AIfa proxy] Central request failed:', String(err));
    return null;
  } finally {
    clearTimeout(timer);
  }
}
