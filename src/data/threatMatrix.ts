export type Severity = 'critical' | 'serious' | 'moderate' | 'advisory';

export type Category =
  | 'ADA / WCAG'
  | 'HIPAA / Medical'
  | 'CCPA / CPRA'
  | 'FTC Enforcement'
  | 'TCPA / Telecom'
  | 'GDPR'
  | 'PCI-DSS / Security'
  | 'State Privacy Laws'
  | 'Financial / Corporate'
  | 'Digital Operations';

export interface LawMeta {
  lawName: string;
  lawUrl: string;
  fineAmount: string;
  reportingConsequence: string;
}

export interface ComplianceCheck {
  id: number;
  code: string;
  category: Category;
  title: string;
  description: string;
  severity: Severity;
  reference: string;
  /**
   * ЧЕМ ПОДТВЕРЖДАЕТСЯ НАХОДКА. Добавлено 22.08.2026.
   *
   * `observable`  — устанавливается из ответа самого сайта: заголовки,
   *                 разметка, куки, TLS, содержимое страниц. Таких 1927.
   * `indicative`  — по внешним признакам можно лишь ПРЕДПОЛОЖИТЬ пробел в
   *                 организационном контроле; подтверждает только аудит.
   *                 Таких 73: SOC2, SOC2P, ISO27, NISTP, OPS, FIN.
   *
   * ЗАЧЕМ РАЗДЕЛЕНИЕ. Часть правил описывает то, чего в ответе сайта нет
   * физически: «политика ИБ, ежегодно пересматриваемая руководством»
   * (ISO27-001), «серверные журналы не показывают следов IDS» (SOC2P-001),
   * процедуры найма, реестры инцидентов. Заявлять, что сканер их ПРОВЕРЯЕТ,
   * нельзя: человек из комплаенса знает, что SOC 2 — это аудит на месяцы, а
   * не запрос по HTTP, и по такому обещанию относит весь отчёт к рекламе.
   * Из 2000 правил честны 1927; их обесценивали 73.
   *
   * Поле необязательное: старые записи без него читаются как `observable`.
   */
  evidenceKind?: 'observable' | 'indicative';
}

export const CATEGORIES: Category[] = [
  'ADA / WCAG',
  'HIPAA / Medical',
  'CCPA / CPRA',
  'FTC Enforcement',
  'TCPA / Telecom',
  'GDPR',
  'PCI-DSS / Security',
  'State Privacy Laws',
  'Financial / Corporate',
  'Digital Operations',
];

export const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 0,
  serious: 1,
  moderate: 2,
  advisory: 3,
};

export const CATEGORY_COLORS: Record<Category, string> = {
  'ADA / WCAG': 'cyan',
  'HIPAA / Medical': 'rose',
  'CCPA / CPRA': 'indigo',
  'FTC Enforcement': 'amber',
  'TCPA / Telecom': 'purple',
  'GDPR': 'blue',
  'PCI-DSS / Security': 'emerald',
  'State Privacy Laws': 'violet',
  'Financial / Corporate': 'teal',
  'Digital Operations': 'orange',
};

// Import static translated datasets
import { LAW_META_EN, threatMatrixEn } from './threatMatrix_en';
import { LAW_META_RU, threatMatrixRu } from './threatMatrix_ru';
import { LAW_META_ES, threatMatrixEs } from './threatMatrix_es';
import { LAW_META_ZH, threatMatrixZh } from './threatMatrix_zh';

// Dynamic loaders based on active locale
export function getThreatMatrix(locale: string): ComplianceCheck[] {
  switch (locale) {
    case 'ru': return threatMatrixRu;
    case 'es': return threatMatrixEs;
    case 'zh': return threatMatrixZh;
    default: return threatMatrixEn;
  }
}

export function getLawMeta(locale: string): Record<Category, LawMeta> {
  switch (locale) {
    case 'ru': return LAW_META_RU;
    case 'es': return LAW_META_ES;
    case 'zh': return LAW_META_ZH;
    default: return LAW_META_EN;
  }
}

// English defaults for backward compatibility
export const LAW_META = LAW_META_EN;
export const threatMatrix = threatMatrixEn;
