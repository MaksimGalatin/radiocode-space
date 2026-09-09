"use client";
// Юридические документы aifa.digital — единые для экосистемы CODE.
// Тексты идентичны codeofdigitaleternity.com; адаптер подключает их к i18n этого сайта.
import { useLang } from "@/lib/i18n";
import { terms as termsEn } from "./locales/en/terms";
import { protocol as protocolEn } from "./locales/en/protocol";
import { privacy as privacyEn } from "./locales/en/privacy";
import { terms as termsRu } from "./locales/ru/terms";
import { protocol as protocolRu } from "./locales/ru/protocol";
import { privacy as privacyRu } from "./locales/ru/privacy";
import { terms as termsEs } from "./locales/es/terms";
import { protocol as protocolEs } from "./locales/es/protocol";
import { privacy as privacyEs } from "./locales/es/privacy";
import { terms as termsZh } from "./locales/zh/terms";
import { protocol as protocolZh } from "./locales/zh/protocol";
import { privacy as privacyZh } from "./locales/zh/privacy";

const LEGAL: Record<string, { terms: any; protocol: any; privacy: any }> = {
  en: { terms: termsEn, protocol: protocolEn, privacy: privacyEn },
  ru: { terms: termsRu, protocol: protocolRu, privacy: privacyRu },
  es: { terms: termsEs, protocol: protocolEs, privacy: privacyEs },
  zh: { terms: termsZh, protocol: protocolZh, privacy: privacyZh },
};

export function useLegalT() {
  const { lang } = useLang();
  return { t: LEGAL[lang] || LEGAL.en, lang };
}
