import type { Metadata } from 'next';
import { headers } from 'next/headers';
import BotClient from './bot-client';
import { buildAlternates } from '@/lib/seo';

/**
 * Страница AIfa Creativity на radiocode.space — создана 30.09.2026.
 *
 * Слово Архитектора: страницу творчества «красиво расписать» и сделать «на всех 4 сайтах …
 * и на всех 4 языках». До этого она была только на aifa.works и центральном, здесь отдавала 404.
 * Разметка и образцы — те же, что на aifa.works (bot-client.tsx, services.ts,
 * public/creativity/samples); заголовок вкладки — на языке страницы из заголовка x-locale.
 */
const МЕТА: Record<string, { title: string; desc: string }> = {
  ru: {
    title: 'AIfa Creativity — песни, сказки и подарки с ИИ в Telegram | RadioCODE',
    desc: 'Персональные песни с вокалом, интерактивные сказки и детективы с книгой PDF, стихи, открытки, гороскопы и стикеры от AIfa в Telegram. От $0.99, образец каждой услуги — до оплаты.',
  },
  en: {
    title: 'AIfa Creativity — AI songs, fairy tales and gifts in Telegram | RadioCODE',
    desc: 'Personal songs with vocals, interactive fairy tales and detective stories with a PDF book, poems, cards, horoscopes and stickers from AIfa in Telegram. From $0.99, with a sample of every service before you pay.',
  },
  es: {
    title: 'AIfa Creativity — canciones, cuentos y regalos con IA en Telegram | RadioCODE',
    desc: 'Canciones personales con voz, cuentos y relatos de detectives interactivos con libro PDF, poemas, postales, horóscopos y stickers de AIfa en Telegram. Desde $0.99, con muestra de cada servicio antes de pagar.',
  },
  zh: {
    title: 'AIfa Creativity —— Telegram 中的 AI 歌曲、童话与礼物 | RadioCODE',
    desc: '来自 AIfa 的专属人声歌曲、附 PDF 书的互动童话与侦探故事、诗歌、贺卡、星座运势和贴纸，尽在 Telegram。$0.99 起，每项服务付款前均可查看样例。',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const м = МЕТА[(h.get('x-locale') || 'en').toLowerCase()] ?? МЕТА.en;
  return { title: м.title, description: м.desc, alternates: await buildAlternates('/AIfacreativity') };
}

export default function AIfaCreativityPage() {
  return <BotClient />;
}
