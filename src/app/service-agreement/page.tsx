'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft, FileText, Briefcase, ClipboardList, CreditCard, Users,
  Scale, ShieldAlert, AlertTriangle, Shield, Lock, Ban, Globe, Gavel,
  Handshake, Info, HelpCircle, BookOpen,
} from 'lucide-react';
import { useLanguage } from '../../lib/LanguageContext';
import { строкаРеквизитов, type Язык } from '../../lib/requisites';

const ЗАГОЛОВОК_РЕКВИЗИТОВ: Record<Язык, string> = {
  en: 'Requisites of the Contractor',
  ru: 'Реквизиты Исполнителя',
  es: 'Datos del Contratista',
  zh: '承包人登记信息',
};

export default function ServiceAgreementPage() {
  const { locale } = useLanguage();

  // ─── ENGLISH ────────────────────────────────────────────────────────────────
  const en = {
    title: "Public Service Agreement (Offer)",
    subtitle: "Master Services Agreement & Statement-of-Work Framework for Web, Compliance-Remediation, AI-Integration and Design services",
    lastUpdated: "Effective Date: July 19, 2026 · Version 1.0",
    backBtn: "Back to Home",
    acceptTitle: "How this Agreement is concluded",
    acceptDesc: "This document is a public offer (the \"Agreement\") addressed by the Contractor to any legal entity or individual (the \"Client\"). No signature is required. The Agreement is concluded, and its terms become fully binding, at the earliest of the following conclusive actions by the Client:",
    acceptSteps: [
      "The Client requests, orders, or confirms any service via email, chat, web form, or messenger;",
      "The Client approves a Statement of Work (SOW) / brief describing a specific project;",
      "The Client makes any payment (including a deposit or prepayment) toward the services;",
      "The Client provides access, credentials, materials, or content for the Contractor to begin work.",
      "Performing any of these actions means the Client has read, understood, and unconditionally accepted every term below.",
    ],
    sections: [
      {
        title: "1. GENERAL PROVISIONS & PARTIES",
        icon: BookOpen,
        subsections: [
          {
            subtitle: "1.1 The Contractor",
            text: "The services under this Agreement are provided by Maksim Valentinovich Galatin, acting as an independent self-employed individual contractor (the \"Contractor\"), reachable at contact@codeofdigitaleternity.com, support@aifa.works and sales@aifa.works. The Contractor operates the CODE Eternal ecosystem, including aifa.works. As of the Effective Date the Contractor acts as a natural person; the Contractor reserves the right to assign this Agreement and any Statement of Work to a legal entity established in the future (see Section 15).",
          },
          {
            subtitle: "1.2 Nature of the Offer",
            text: "This Agreement is a legally binding public offer under which the Contractor undertakes to render, and the Client undertakes to accept and pay for, professional technical and creative services. It is not an employment contract, partnership, joint venture, franchise, or agency relationship. It does not create any fiduciary duty. Each engagement is documented by a Statement of Work (\"SOW\") that incorporates this Agreement by reference; in case of conflict, the Statement of Work governs for that specific project, and this Agreement governs all other matters.",
          },
          {
            subtitle: "1.3 Definitions",
            text: "\"Services\" — the work described in Section 2 and detailed in a Statement of Work.\n\"Deliverables\" — the results of the Services (code, sites, fixes, integrations, designs, files) delivered to the Client.\n\"Statement of Work (SOW)\" — a written brief (email, document, or web form) defining scope, timeline, and price for a specific project.\n\"Fees\" — the amounts payable for the Services.\n\"Oracle\" — the automated website compliance scanner operated by the Contractor.",
          },
        ],
      },
      {
        title: "2. SUBJECT & SCOPE OF SERVICES",
        icon: Briefcase,
        subsections: [
          {
            subtitle: "2.1 Categories of Services",
            text: "The Contractor provides, in whole or in part, the following Services:\n\n• Website creation and development (landing pages, corporate sites, web applications);\n• Remediation of violations and defects identified by the AIfaFocus compliance scan (e.g., accessibility/ADA/WCAG, privacy/CCPA, tracking/HIPAA, email/DMARC and similar technical exposures);\n• Integration of AI agents and assistants (AIfa and third-party models) into the Client's products and workflows;\n• Web design, UX/UI, branding, and related creative services.\n\nThe exact scope for any project is fixed exclusively by the corresponding Statement of Work. Anything not expressly listed in a Statement of Work is out of scope.",
          },
          {
            subtitle: "2.2 Nature and Limits of Remediation Services",
            text: "Compliance-remediation Services are technical services aimed at reducing identifiable technical exposure. They are NOT legal advice, legal representation, a legal audit, or a certification of compliance with any law, standard, or regulation (including ADA, WCAG, CCPA/CPRA, HIPAA, GDPR, TCPA, or others). AIfaFocus scan and any report are automated heuristic analyses provided for informational purposes. The Contractor is not a law firm, licensed auditor, or regulatory authority. The Client remains solely responsible for its legal compliance and is strongly advised to consult qualified professionals.",
          },
          {
            subtitle: "2.3 Authorisation for In-Depth Technical Assessment",
            text: "In-depth technical assessment (crawling internal pages, identifying software versions, checking for exposed service files, analysing forms) is performed ONLY after acceptance of this Offer and only against the domain named in the Statement of Work. By accepting the Offer the Client confirms authority over that domain and authorises such assessment. The Contractor does NOT perform: password or credential guessing; load or resilience testing; submission of malicious payloads to forms; attempts to bypass protective measures; downloading the contents of any exposed service files — their presence is recorded only. The free check is limited to publicly available information and requires no authorisation.",
          },
        ],
      },
      {
        title: "3. ORDER OF PERFORMANCE & CHANGE REQUESTS",
        icon: ClipboardList,
        subsections: [
          {
            subtitle: "3.1 Statements of Work",
            text: "Each project begins with a Statement of Work agreed by the Parties. The Statement of Work specifies the scope, deliverables, timeline, milestones, and Fees. Timelines are good-faith estimates, not guarantees, and depend on the Client's timely cooperation. The Contractor may engage subcontractors or tools at its discretion while remaining responsible for the Deliverables.",
          },
          {
            subtitle: "3.2 Changes & Additional Work",
            text: "Any request beyond the agreed Statement of Work (scope creep, added features, extra revision rounds, redesigns, new pages) constitutes additional work subject to a separate quote and Fees. The Contractor is entitled to reasonably adjust timelines and Fees to reflect changes requested by the Client or caused by inaccurate/incomplete information supplied by the Client.",
          },
        ],
      },
      {
        title: "4. FEES, PAYMENT, TAXES & REFUNDS",
        icon: CreditCard,
        subsections: [
          {
            subtitle: "4.1 Fees & Payment Schedule",
            text: "Fees are stated in the Statement of Work. Unless stated otherwise, work commences after receipt of an upfront payment (deposit), typically 50%, with the balance due on delivery or per agreed milestones. The Contractor may withhold delivery, transfer of files, or deployment until all Fees are paid in full. Access to results (accounts, source files, production deployment) is conditional on full payment.",
          },
          {
            subtitle: "4.2 Taxes, Fees & Currency",
            text: "All Fees are net amounts. The Client bears all taxes, duties, bank charges, currency-conversion costs, payment-processor fees, and blockchain/network fees associated with payment. If any withholding is required by the Client's jurisdiction, the Client shall gross up the payment so the Contractor receives the full net amount.",
          },
          {
            subtitle: "4.3 Non-Refundable Amounts & Chargebacks",
            text: "Deposits and payments for work already performed are non-refundable, as they compensate reserved time and delivered effort. Because the Services are bespoke digital work created specifically for the Client, statutory withdrawal/cooling-off rights (where they would otherwise apply) are, to the extent permitted by law, waived once performance has begun with the Client's consent. Initiating a chargeback or payment dispute for services rendered is a material breach; the Contractor may suspend all work, revoke licenses to Deliverables, and pursue recovery of amounts due plus costs.",
          },
          {
            subtitle: "4.4 Late Payment & Suspension",
            text: "Overdue amounts may accrue interest at the lower of 1.5% per month or the maximum permitted by law. The Contractor may suspend Services, deployments, and support while any amount is overdue, without liability for resulting delay.",
          },
        ],
      },
      {
        title: "5. CLIENT OBLIGATIONS & WARRANTIES",
        icon: Users,
        subsections: [
          {
            subtitle: "5.1 Cooperation & Materials",
            text: "The Client shall provide, promptly and accurately, all access, credentials, domains, hosting, accounts, content, texts, images, brand assets, and information reasonably required. The Client is responsible for maintaining independent backups of its data and systems before, during, and after the Services.",
          },
          {
            subtitle: "5.2 Content Lawfulness & Authority",
            text: "The Client warrants that it has the right and authority to engage the Contractor and to grant access to the relevant systems; that all materials it supplies are lawful and do not infringe third-party rights; and that its use of the Deliverables will comply with applicable law. The Client is solely responsible for the legality of the content, business, and data it operates.",
          },
        ],
      },
      {
        title: "6. INTELLECTUAL PROPERTY",
        icon: FileText,
        subsections: [
          {
            subtitle: "6.1 Transfer on Full Payment",
            text: "Upon receipt of all Fees for a given Statement of Work, the Contractor assigns to the Client the deliverable-specific work product created for that project, to the extent legally assignable. Until full payment, all rights remain with the Contractor and any license to use the Deliverables is suspended.",
          },
          {
            subtitle: "6.2 Contractor's Pre-Existing & Reusable IP",
            text: "The Contractor retains all rights to its pre-existing materials, know-how, methods, frameworks, libraries, tools, and generic components used to produce the Deliverables, and grants the Client a non-exclusive, perpetual license to use them solely as embedded in the Deliverables. Third-party assets (fonts, stock media, plugins, APIs) are licensed to the Client on the third party's terms and at the Client's cost.",
          },
          {
            subtitle: "6.3 Portfolio Rights",
            text: "The Contractor may display the non-confidential Deliverables and reference the engagement in its portfolio, case studies, and marketing, unless the Statement of Work expressly states otherwise in writing. The Contractor may also publish anonymised before-and-after audit results — numeric scores and the list of items remediated, without the domain, name or any other detail identifying the Client — unless the Statement of Work expressly states otherwise in writing.",
          },
          {
            subtitle: "6.4 Ecosystem Brand & IP — Sole Ownership",
            text: "All intellectual property, trademarks, trade names, logos, domain names, source code, content, and brand of the CODE Eternal ecosystem — including the websites codeofdigitaleternity.com, aifa.works, aifa.digital, and radiocode.space, the names 'CODE', 'CODE Eternal', and 'AIfa', and the $GALATIN token — are and remain the sole and exclusive property of Maksim Valentinovich Galatin. Nothing in this Agreement, in any Statement of Work, or in the provision of the Services transfers, licenses, or grants to the Client any right, title, or interest in the ecosystem's brand, trademarks, or intellectual property, other than the specific Deliverables paid for and expressly assigned under Section 6.1. The Client shall not use, register, imitate, or contest any of the foregoing.",
          },
        ],
      },
      {
        title: "7. DELIVERY & ACCEPTANCE",
        icon: Scale,
        subsections: [
          {
            subtitle: "7.1 Acceptance Procedure",
            text: "Upon delivery, the Client has five (5) business days to review the Deliverables and submit written notice of any material non-conformity with the Statement of Work. Absent such notice within that period, or upon any production use of the Deliverables, the Deliverables are deemed accepted. Minor deviations that do not materially impair use are not grounds for rejection.",
          },
          {
            subtitle: "7.2 Revisions",
            text: "The Statement of Work may include a defined number of revision rounds addressing conformity with the agreed scope. Revisions beyond that number, or outside the agreed scope, are additional work under Section 3.2.",
          },
          {
            subtitle: "7.3 Client Dependencies & Turnaround",
            text: "Any stated turnaround (including a 48-hour remediation window) starts only once the Client has provided everything required to begin: written approval of scope, working access to the site's administration, working access to DNS where DNS changes are in scope, and a technical contact able to answer within one business day. Time during which the Contractor is waiting on the Client does not count toward the turnaround. A remediation window is a commitment to perform the agreed work within that time — it is not a representation that the site will thereafter comply with any law, standard, or regulation (see Section 3.3).",
          },
          {
            subtitle: "7.4 Force Majeure",
            text: "Neither party is liable for delay or failure to perform caused by events beyond its reasonable control, including: outage or degradation of the Client's hosting, CDN, registrar, DNS provider, or third-party services; changes made to the site by the Client or its other contractors during the work; a proprietary or closed platform that does not permit the required change; refusal or delay by a third-party provider; loss of connectivity; acts of government; and natural events. The affected party will notify the other promptly and resume performance as soon as practicable. If such an event prevents performance for more than fourteen (14) days, either party may terminate the affected Statement of Work, and the Contractor will refund fees for work not performed.",
          },
          {
            subtitle: "7.5 Scope Boundaries",
            text: "Unless the Statement of Work expressly agrees otherwise, remediation covers: one domain and its primary subdomain; up to twenty (20) unique pages; a standard, supported platform or content management system on a current version. Sites beyond this scope, closed or bespoke platforms, storefronts with generated product pages, localized copies beyond one language, and separate subdomains are quoted and billed separately under 3.2. The Contractor notifies the Client before starting work if the actual scope exceeds what was agreed.",
          },
        ],
      },
      {
        title: "8. DISCLAIMERS & NO WARRANTY",
        icon: ShieldAlert,
        subsections: [
          {
            subtitle: "8.1 \"As Is\" Basis",
            text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES AND DELIVERABLES ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\", WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, UPTIME, OR ERROR-FREE OPERATION.",
          },
          {
            subtitle: "8.2 No Guaranteed Outcomes",
            text: "The Contractor does not warrant any specific business, legal, regulatory, ranking, traffic, conversion, revenue, or performance outcome. Remediation reduces but does not eliminate legal or technical exposure and does not guarantee freedom from claims, fines, or litigation. Search-engine rankings, third-party platform behavior, and AI-model outputs are outside the Contractor's control.",
          },
          {
            subtitle: "8.3 Third-Party Assessment",
            text: "The Contractor does not represent or warrant that any regulator, court, insurer, payment provider, auditor or other third party will assess the site, the report or the completed work the same way the Contractor does. The Contractor's reports and scores reflect a technical check as of the date it was performed; they are not a legal opinion, a certificate of compliance, or evidence in anyone's favour.",
          },
          {
            subtitle: "8.4 Confirmed Findings vs. Observations Requiring Verification",
            text: "The report separates findings into confirmed and requiring verification. A finding is confirmed when it rests on an observable fact — the Client's own server response, page content, or a domain-name record — which the Client can re-check independently. Observations produced by language models or heuristics are marked as requiring verification. Under a Statement of Work the Contractor remediates confirmed findings; work on observations requiring verification is agreed and billed separately.",
          },
        ],
      },
      {
        title: "9. LIMITATION OF LIABILITY",
        icon: AlertTriangle,
        subsections: [
          {
            subtitle: "9.1 Liability Cap",
            text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE CONTRACTOR'S TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO A GIVEN STATEMENT OF WORK OR THE SERVICES SHALL NOT EXCEED THE TOTAL FEES ACTUALLY PAID BY THE CLIENT FOR THAT SPECIFIC STATEMENT OF WORK DURING THE THREE (3) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.",
          },
          {
            subtitle: "9.2 Exclusion of Indirect Damages",
            text: "IN NO EVENT SHALL THE CONTRACTOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITY, EVEN IF ADVISED OF THE POSSIBILITY. Some jurisdictions do not allow certain exclusions; in such case liability is limited to the smallest amount permitted by law.",
          },
          {
            subtitle: "9.3 Time Bar",
            text: "Any claim relating to the Services must be brought within fourteen (14) calendar days after the Deliverable was received or the Service performed, failing which it is permanently waived, to the extent permitted by law.",
          },
        ],
      },
      {
        title: "10. INDEMNIFICATION",
        icon: Shield,
        subsections: [
          {
            subtitle: "10.1 Client Indemnity",
            text: "The Client shall defend, indemnify, and hold harmless the Contractor and its affiliates, contributors, and providers from any claim, loss, liability, fine, or cost (including reasonable legal fees) arising from: the Client's content, business, or data; the Client's use of the Deliverables; the Client's breach of this Agreement or of any law; and any third-party claim connected to the foregoing.",
          },
        ],
      },
      {
        title: "11. CONFIDENTIALITY",
        icon: Lock,
        subsections: [
          {
            subtitle: "11.1 Mutual Confidentiality",
            text: "Each Party shall keep confidential non-public information disclosed by the other and use it only to perform this Agreement. This does not apply to information that is public, independently developed, or lawfully obtained, or to disclosures required by law. Obligations survive termination of the Agreement for one (1) year.",
          },
        ],
      },
      {
        title: "12. TERM, SUSPENSION & TERMINATION",
        icon: Ban,
        subsections: [
          {
            subtitle: "12.1 Term & Termination",
            text: "This Agreement applies from the moment of acceptance and continues while any Statement of Work is active. Either Party may terminate a Statement of Work for material breach not cured within ten (10) days of written notice. The Contractor may suspend or terminate immediately for non-payment, unlawful use, or chargeback.",
          },
          {
            subtitle: "12.2 Effect of Termination",
            text: "On termination, the Client shall pay for all Services performed and costs incurred up to the termination date. Sections concerning payment, IP, disclaimers, liability, indemnity, confidentiality, and dispute resolution survive termination.",
          },
        ],
      },
      {
        title: "13. FORCE MAJEURE",
        icon: Globe,
        subsections: [
          {
            subtitle: "13.1 Excused Performance",
            text: "The Contractor is not liable for delay or failure caused by events beyond its reasonable control, including acts of God, war, civil unrest, epidemics, government action, internet or hosting outages, failures of third-party platforms, blockchain or payment networks, power or connectivity loss.",
          },
        ],
      },
      {
        title: "14. GOVERNING LAW, SEAT & DISPUTE RESOLUTION",
        icon: Gavel,
        subsections: [
          {
            subtitle: "14.1 Good-Faith Resolution",
            text: "The Parties shall first attempt to resolve any dispute amicably by written negotiation within thirty (30) days of notice. This step is a condition precedent to arbitration, save for urgent relief.",
          },
          {
            subtitle: "14.2 Governing Law",
            text: "This Agreement, its formation, interpretation and any non-contractual obligation arising out of it are governed by the law of the REPUBLIC OF ECUADOR, where the Contractor is resident, without regard to conflict-of-law rules. The UN Convention on Contracts for the International Sale of Goods (CISG) does not apply.",
          },
          {
            subtitle: "14.3 Arbitration — seat, institution, arbitrator",
            text: "Any dispute not resolved amicably shall be finally settled by binding arbitration ADMINISTERED BY THE CENTRE FOR ARBITRATION AND MEDIATION OF THE QUITO CHAMBER OF COMMERCE (Centro de Arbitraje y Mediación de la Cámara de Comercio de Quito) under its Rules in force, by a SOLE ARBITRATOR, deciding in law (en derecho). THE SEAT OF THE ARBITRATION IS QUITO, ECUADOR. Ecuador is a party to the 1958 New York Convention, so the award is enforceable in over 170 states.",
          },
          {
            subtitle: "14.4 No Party may be required to travel",
            text: "The proceedings are conducted IN WRITING AND BY VIDEOCONFERENCE. NO PARTY MAY BE REQUIRED TO APPEAR IN PERSON at any hearing, and no Party bears the other's travel costs. The seat named in 14.3 is a legal concept, not a geographic obligation: hearings and deliberations may take place anywhere or remotely without changing the seat.",
          },
          {
            subtitle: "14.5 Language and documents",
            text: "The language of the arbitration is SPANISH, or ENGLISH if both Parties so agree. Documents in English are admissible WITHOUT TRANSLATION; a Party requiring a translation of any document bears its cost.",
          },
          {
            subtitle: "14.6 Expedited procedure for claims under USD 50,000",
            text: "Where the total amount in dispute is below USD 50,000, the arbitration is conducted on a DOCUMENTS-ONLY basis under the expedited procedure of the applicable Rules, with no oral hearing unless the arbitrator considers one indispensable.",
          },
          {
            subtitle: "14.7 Costs",
            text: "The unsuccessful Party bears the costs of the arbitration, including the administrative fees, the arbitrator's fees and the reasonable legal representation costs of the successful Party, unless the arbitrator decides otherwise for good reason.",
          },
          {
            subtitle: "14.8 Contractor's option for the recovery of unpaid Fees",
            text: "FOR CLAIMS SEEKING PAYMENT OF FEES DUE, the Contractor may, at its sole option, instead bring proceedings before the competent courts of the Client's domicile or of any place where the Client holds assets, and the Client submits to that jurisdiction. This option belongs to the Contractor only. If the law applicable in a given forum does not recognise a unilateral option clause, only this Section 14.8 is affected and the remainder of Section 14 stays in force.",
          },
          {
            subtitle: "14.9 Blockchain records are evidence, not a forum",
            text: "Records anchored to a public blockchain (including Arweave transactions and their timestamps) are admissible as authentic evidence of content and time. NO on-chain or 'decentralised' arbitration protocol is agreed as a forum: awards of such protocols are not covered by the New York Convention and cannot be enforced against assets. Decentralisation governs how the record is kept, not where a monetary dispute is decided.",
          },
          {
            subtitle: "14.10 Class-Action & Jury Waiver",
            text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, ALL DISPUTES SHALL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT AS A CLASS, COLLECTIVE, OR REPRESENTATIVE ACTION. EACH PARTY WAIVES ANY RIGHT TO A JURY TRIAL AND TO CONSOLIDATE CLAIMS.",
          },
          {
            subtitle: "14.11 Consumers",
            text: "Where the Client is a consumer, SECTION 19 PREVAILS OVER THIS SECTION: arbitration and the waivers above apply only to the extent permitted by the mandatory law of the consumer's country of habitual residence, and the consumer keeps the right to go to the courts of that country.",
          },
        ],
      },
      {
        title: "15. INDEPENDENT CONTRACTOR & FUTURE ASSIGNMENT",
        icon: Handshake,
        subsections: [
          {
            subtitle: "15.1 Status",
            text: "The Contractor is an independent self-employed individual and not an employee, partner, or agent of the Client. Nothing creates a joint venture or fiduciary relationship. The Contractor controls the manner and means of performing the Services.",
          },
          {
            subtitle: "15.2 Assignment to Future Entity",
            text: "The Contractor may assign, novate, or transfer this Agreement and any Statement of Work, in whole or in part, to a legal entity that the Contractor establishes or controls in the future (e.g., a company within the CODE Eternal ecosystem), upon notice to the Client and without the Client's further consent. The Client may not assign this Agreement without the Contractor's prior written consent.",
          },
        ],
      },
      {
        title: "16. MISCELLANEOUS",
        icon: Info,
        subsections: [
          {
            subtitle: "16.1 Entire Agreement; Severability; Amendments",
            text: "This Agreement together with the applicable Statement of Work is the entire agreement between the Parties and supersedes prior discussions. If any provision is held invalid, the remainder stays in effect and the invalid provision is replaced by a valid one closest to the original intent. The Contractor may update this offer; the version in force at the time of acceptance governs that engagement.",
          },
          {
            subtitle: "16.2 Notices; Electronic Acceptance; Language",
            text: "Notices may be given by email to the addresses in Section 1.1 and to the Client's contact address. The Parties agree that electronic communications and conclusive actions constitute valid acceptance and signature. This Agreement is provided in several languages for convenience; in case of discrepancy, the English version prevails.",
          },
        ],
      },
      {
        title: "17. CONTACT",
        icon: HelpCircle,
        subsections: [
          {
            subtitle: "17.1 How to Reach the Contractor",
            text: "For orders, Statements of Work, invoices, or questions about this Agreement: contact@codeofdigitaleternity.com, support@aifa.works and sales@aifa.works. Contractor: Maksim Valentinovich Galatin (CODE Eternal / aifa.works).",
          },
        ],
      },
      {
        title: "18. IDENTITY OF THE CONTRACTOR, REQUISITES & LANGUAGE",
        icon: Info,
        subsections: [
          {
            subtitle: "18.1 Who the Contractor is",
            text: "The Services are supplied by a natural person, not by a company. Full identification details — legal name, status, country of residence, address for legal correspondence and electronic contact details — are set out in the Requisites block published on this page and in the footer of every site of the CODE ecosystem. These disclosures are made because they are required of any trader by, among others, Article 5 of Directive 2000/31/EC (e-Commerce), Article 6(1)(b)-(c) of Directive 2011/83/EU (Consumer Rights), the UK Consumer Contracts Regulations 2013, the Australian Consumer Law and comparable rules elsewhere.",
          },
          {
            subtitle: "18.2 Language of the Agreement",
            text: "This Agreement is published in English, Russian, Spanish and Chinese. The Client may conclude and correspond in any of these languages. In case of any discrepancy between versions, the ENGLISH text prevails, except where the mandatory law of the Client's country requires the local-language version to prevail for consumers, in which case that version prevails for that Client.",
          },
          {
            subtitle: "18.3 Record of the Agreement",
            text: "The Contractor retains the Statement of Work, the accepted version of this Agreement and the related correspondence for the duration of the engagement and for the period required by applicable law. On request, the Client receives a copy of the concluded Agreement on a durable medium (e-mail attachment in PDF).",
          },
        ],
      },
      {
        title: "19. CONSUMERS: MANDATORY RIGHTS & RIGHT OF WITHDRAWAL",
        icon: Scale,
        subsections: [
          {
            subtitle: "19.1 Who this Section protects",
            text: "This Section applies where the Client is a CONSUMER — a natural person acting wholly or mainly outside their trade, business, craft or profession. Where it applies, THIS SECTION PREVAILS over Sections 4.3, 9 and 14 to the extent of any conflict.",
          },
          {
            subtitle: "19.2 Mandatory law is not displaced",
            text: "Nothing in this Agreement removes or limits any right that the consumer has under the mandatory law of the country of their habitual residence (Article 6 of Regulation (EC) 593/2008, Rome I). A consumer may bring proceedings in the courts of their own country of residence and may only be sued there (Articles 17-19 of Regulation (EU) 1215/2012, Brussels I bis). The arbitration and class-action provisions of Section 14 apply to consumers only where the law of their country permits.",
          },
          {
            subtitle: "19.3 Right of withdrawal — 14 days",
            text: "A consumer in the EU/EEA or the United Kingdom may withdraw from this Agreement within 14 calendar days from the day it is concluded, WITHOUT giving any reason and without incurring any cost other than as stated in 19.4. Many other jurisdictions grant a comparable cooling-off period, which the Contractor honours on the same terms. To withdraw, send an unequivocal statement to contact@codeofdigitaleternity.com (for example: \"I hereby withdraw from the agreement of [date] for [service]\"). Sending it before the deadline expires is enough. The Contractor confirms receipt without delay and refunds all payments received, using the same means of payment, within 14 days of being informed.",
          },
          {
            subtitle: "19.4 Starting work before the 14 days expire",
            text: "If the consumer wants the work to start during the withdrawal period, the consumer must EXPRESSLY REQUEST IT and acknowledge that: (a) once the Services are FULLY performed with that prior express consent, the right of withdrawal is LOST (Article 16(a) of Directive 2011/83/EU; Regulation 36 of the UK Consumer Contracts Regulations 2013); and (b) if the consumer withdraws while the work is only partly done, the consumer pays an amount proportionate to what was supplied up to that moment, measured against the total price. Without that express request and acknowledgement, work does not begin until the 14 days have passed. If the consumer was never informed of the right of withdrawal, the withdrawal period is extended by twelve months (Article 10 of Directive 2011/83/EU) — which is precisely why this clause exists.",
          },
          {
            subtitle: "19.5 Conformity of the Deliverables",
            text: "Deliverables must correspond to the description in the Statement of Work and be fit for the purpose stated there. Where digital content or digital services are supplied to a consumer, the conformity remedies of Directive (EU) 2019/770 — repair, price reduction or termination — apply; in the United Kingdom, the equivalent remedies under the Consumer Rights Act 2015 apply. These remedies are free of charge and in addition to any voluntary warranty.",
          },
          {
            subtitle: "19.6 Complaints and out-of-court dispute resolution",
            text: "Complaints are addressed to contact@codeofdigitaleternity.com and are answered within 14 days. If the answer does not satisfy the consumer, the consumer may turn to the consumer-protection body or approved alternative-dispute-resolution scheme of their own country; the Contractor will engage with such a body in good faith. Note that the European Commission's online dispute-resolution (ODR) platform CEASED OPERATION on 20 July 2025, so no link to it is given here; national consumer bodies remain available.",
          },
        ],
      },
      {
        title: "20. TAXES, SANCTIONS, EXPORT CONTROL & LAWFUL PAYMENT",
        icon: Ban,
        subsections: [
          {
            subtitle: "20.1 Taxes and place of supply",
            text: "Unless the Statement of Work states otherwise, Fees are exclusive of VAT, GST, sales tax and equivalent turnover taxes. Where such a tax is due on a supply to a consumer, it is charged at the rate of the consumer's country and is shown before payment. For supplies to a business established in the EU, the reverse-charge mechanism may apply where the Client provides a valid VAT identification number; the Client is responsible for the accuracy of that number. Each Party bears its own income taxes. Import duties and any withholding imposed by the Client's jurisdiction are dealt with in Section 4.2.",
          },
          {
            subtitle: "20.2 Sanctions",
            text: "The Client represents and warrants that neither it, nor its owners, nor any person for whose benefit the Services are procured, is designated on any sanctions list maintained by the United Nations, the European Union, the United Kingdom, the United States (including the OFAC SDN list) or any other applicable authority, and that it is not located in, nor acting on behalf of a person located in, a comprehensively sanctioned territory. The Contractor may refuse, suspend or terminate any engagement without liability where performance would breach, or create a material risk of breaching, such measures. Amounts already paid for work not performed for this reason are returned.",
          },
          {
            subtitle: "20.3 Export control and prohibited end-use",
            text: "Deliverables and any technical information supplied may be subject to export-control rules. The Client shall not use, re-export or make available any Deliverable in connection with weapons of mass destruction, military end-use in an embargoed destination, unlawful surveillance of individuals, or any other prohibited end-use, and shall not transfer them to any person where doing so would breach such rules.",
          },
          {
            subtitle: "20.4 Lawful origin of funds",
            text: "Payments must originate from a lawful source and from an account, card or wallet belonging to the Client. For large payments and for settlement in crypto-assets, the Contractor may request reasonable verification of identity and of the source of funds before beginning or continuing work, and may decline a payment that cannot be verified. This mirrors the obligations imposed on payment processors under applicable anti-money-laundering rules.",
          },
        ],
      },
    ],
    bannerTag: "PROTECTED BY THE CODE ETERNAL LEGAL SHIELD",
    bannerNote: "By ordering or paying for any service you accept this Agreement in full.",
  };

  // ─── RUSSIAN ─────────────────────────────────────────────────────────────────
  const ru = {
    title: "Публичная оферта на оказание услуг",
    subtitle: "Рамочный договор оказания услуг и механизм Технических заданий (Statement of Work): веб-разработка, устранение нарушений, интеграция ИИ и дизайн",
    lastUpdated: "Дата вступления в силу: 19 июля 2026 · Версия 1.0",
    backBtn: "На главную",
    acceptTitle: "Как заключается договор",
    acceptDesc: "Настоящий документ является публичной офертой («Договор»), адресованной Исполнителем любому юридическому или физическому лицу («Заказчик»). Подпись не требуется. Договор считается заключённым, а его условия — полностью обязательными, с момента совершения Заказчиком любого из следующих конклюдентных действий (в зависимости от того, что наступит раньше):",
    acceptSteps: [
      "Заказчик заказывает, запрашивает или подтверждает любую услугу по email, в чате, через форму или мессенджер;",
      "Заказчик утверждает Техническое задание / бриф по конкретному проекту;",
      "Заказчик вносит любую оплату (в том числе задаток или предоплату) за услуги;",
      "Заказчик предоставляет доступы, учётные данные, материалы или контент для начала работ.",
      "Совершение любого из этих действий означает, что Заказчик прочитал, понял и безоговорочно принял все условия ниже.",
    ],
    sections: [
      {
        title: "1. ОБЩИЕ ПОЛОЖЕНИЯ И СТОРОНЫ",
        icon: BookOpen,
        subsections: [
          {
            subtitle: "1.1 Исполнитель",
            text: "Услуги по настоящему Договору оказывает Максим Валентинович Галатин, действующий как независимое самозанятое физическое лицо («Исполнитель»), контакты: contact@codeofdigitaleternity.com, support@aifa.works и sales@aifa.works. Исполнитель развивает экосистему CODE Eternal, включая aifa.works. На дату вступления в силу Исполнитель действует как физическое лицо; Исполнитель вправе уступить настоящий Договор и любое Техническое задание создаваемому в будущем юридическому лицу (см. Раздел 15).",
          },
          {
            subtitle: "1.2 Природа оферты",
            text: "Настоящий Договор — юридически обязывающая публичная оферта, по которой Исполнитель обязуется оказать, а Заказчик — принять и оплатить профессиональные технические и творческие услуги. Договор не является трудовым договором, товариществом, совместным предприятием, франшизой или агентскими отношениями и не создаёт фидуциарных обязанностей. Каждый заказ оформляется Техническим заданием, включающим настоящий Договор по ссылке; при противоречии по конкретному проекту приоритет имеет Техническое задание, по остальным вопросам — настоящий Договор.",
          },
          {
            subtitle: "1.3 Термины",
            text: "«Услуги» — работы, описанные в Разделе 2 и детализированные в Техническом задании.\n«Результаты» — результаты Услуг (код, сайты, исправления, интеграции, дизайн, файлы), передаваемые Заказчику.\n«Техническое задание» (в международной практике — Statement of Work, сокр. SOW) — письменный бриф (email, документ или веб-форма), определяющий объём, сроки и цену конкретного проекта.\n«Вознаграждение» — суммы, подлежащие уплате за Услуги.\n«AIfaFocus» — автоматический сканер соответствия сайтов, эксплуатируемый Исполнителем.",
          },
        ],
      },
      {
        title: "2. ПРЕДМЕТ И ОБЪЁМ УСЛУГ",
        icon: Briefcase,
        subsections: [
          {
            subtitle: "2.1 Категории услуг",
            text: "Исполнитель оказывает полностью или частично следующие Услуги:\n\n• Создание и разработка сайтов (лендинги, корпоративные сайты, веб-приложения);\n• Устранение нарушений и дефектов, выявленных сканом AIfaFocus (доступность/ADA/WCAG, приватность/CCPA, трекинг/HIPAA, почта/DMARC и аналогичные технические риски);\n• Интеграция ИИ-агентов и ассистентов (AIfa и сторонние модели) в продукты и процессы Заказчика;\n• Веб-дизайн, UX/UI, брендинг и смежные творческие услуги.\n\nТочный объём каждого проекта определяется исключительно соответствующим Техническим заданием. Всё, что прямо не указано в Техническом задании, в объём не входит.",
          },
          {
            subtitle: "2.2 Природа и пределы услуг по устранению нарушений",
            text: "Услуги по устранению нарушений — это технические услуги по снижению выявляемых технических рисков. Они НЕ являются юридической консультацией, представительством, юридическим аудитом или сертификацией соответствия какому-либо закону, стандарту или регламенту (включая ADA, WCAG, CCPA/CPRA, HIPAA, GDPR, TCPA и др.). Скан AIfaFocus и любые отчёты — автоматический эвристический анализ информационного характера. Исполнитель не является юридической фирмой, лицензированным аудитором или регулятором. Заказчик несёт единоличную ответственность за своё юридическое соответствие и должен консультироваться с квалифицированными специалистами.",
          },
          {
            subtitle: "2.3 Разрешение на углублённую техническую проверку",
            text: "Углублённая техническая проверка (обход внутренних страниц, определение версий используемого программного обеспечения, проверка наличия открытых служебных файлов, анализ форм) проводится ТОЛЬКО после акцепта настоящей оферты и только в отношении домена, указанного в Техническом задании. Акцептуя оферту, Заказчик подтверждает, что вправе распоряжаться этим доменом, и разрешает такую проверку. Исполнитель НЕ выполняет: подбор паролей и иных учётных данных; нагрузочное или отказоустойчивое тестирование; отправку в формы вредоносных данных; попытки обойти средства защиты; скачивание содержимого обнаруженных служебных файлов — фиксируется только сам факт их доступности. Бесплатная проверка ограничивается общедоступной информацией и разрешения не требует.",
          },
        ],
      },
      {
        title: "3. ПОРЯДОК ВЫПОЛНЕНИЯ И ИЗМЕНЕНИЯ",
        icon: ClipboardList,
        subsections: [
          {
            subtitle: "3.1 Технические задания",
            text: "Каждый проект начинается с согласованного Сторонами Технического задания, определяющего объём, результаты, сроки, этапы и Вознаграждение. Сроки являются добросовестными оценками, а не гарантиями, и зависят от своевременного содействия Заказчика. Исполнитель вправе привлекать субподрядчиков и инструменты по своему усмотрению, оставаясь ответственным за Результаты.",
          },
          {
            subtitle: "3.2 Изменения и дополнительные работы",
            text: "Любой запрос сверх согласованного Технического задания (расширение объёма, новые функции, дополнительные раунды правок, редизайн, новые страницы) является дополнительной работой с отдельной сметой и Вознаграждением. Исполнитель вправе разумно корректировать сроки и Вознаграждение с учётом изменений Заказчика либо неточной/неполной информации, предоставленной Заказчиком.",
          },
        ],
      },
      {
        title: "4. ВОЗНАГРАЖДЕНИЕ, ОПЛАТА, НАЛОГИ И ВОЗВРАТЫ",
        icon: CreditCard,
        subsections: [
          {
            subtitle: "4.1 Вознаграждение и график оплаты",
            text: "Вознаграждение указывается в Техническом задании. Если не согласовано иное, работы начинаются после получения предоплаты (задатка), как правило 50%, с уплатой остатка при сдаче или по согласованным этапам. Исполнитель вправе удерживать передачу Результатов, файлов или деплой до полной оплаты. Доступ к результатам (аккаунты, исходники, продакшн-деплой) предоставляется только при полной оплате.",
          },
          {
            subtitle: "4.2 Налоги, сборы и валюта",
            text: "Все суммы Вознаграждения указаны «нетто». Заказчик несёт все налоги, пошлины, банковские и конвертационные издержки, комиссии платёжных систем и сетевые/блокчейн-сборы, связанные с оплатой. Если юрисдикция Заказчика требует удержания налога, Заказчик увеличивает платёж так, чтобы Исполнитель получил полную сумму нетто.",
          },
          {
            subtitle: "4.3 Невозвратные суммы и чарджбеки",
            text: "Задатки и оплата уже выполненных работ не возвращаются, поскольку компенсируют зарезервированное время и оказанные усилия. Поскольку Услуги — это индивидуальная цифровая работа, созданная специально для Заказчика, право на отказ/«период охлаждения» (там, где оно применялось бы) в допустимых законом пределах считается отменённым с момента начала исполнения с согласия Заказчика. Инициирование чарджбека или платёжного спора по оказанным услугам является существенным нарушением; Исполнитель вправе приостановить работы, отозвать лицензии на Результаты и взыскать причитающиеся суммы и издержки.",
          },
          {
            subtitle: "4.4 Просрочка и приостановка",
            text: "На просроченные суммы могут начисляться проценты в размере меньшего из 1,5% в месяц или максимума, допустимого законом. Исполнитель вправе приостановить Услуги, деплой и поддержку при наличии просрочки без ответственности за возникшую задержку.",
          },
        ],
      },
      {
        title: "5. ОБЯЗАННОСТИ И ГАРАНТИИ ЗАКАЗЧИКА",
        icon: Users,
        subsections: [
          {
            subtitle: "5.1 Содействие и материалы",
            text: "Заказчик своевременно и достоверно предоставляет все доступы, учётные данные, домены, хостинг, аккаунты, контент, тексты, изображения, бренд-материалы и информацию, разумно необходимые для работ. Заказчик самостоятельно обеспечивает независимое резервное копирование своих данных и систем до, во время и после оказания Услуг.",
          },
          {
            subtitle: "5.2 Законность контента и полномочия",
            text: "Заказчик гарантирует, что имеет право и полномочия привлекать Исполнителя и предоставлять доступ к соответствующим системам; что все предоставляемые им материалы законны и не нарушают прав третьих лиц; и что использование Результатов будет соответствовать применимому праву. Заказчик несёт единоличную ответственность за законность своего контента, бизнеса и данных.",
          },
        ],
      },
      {
        title: "6. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ",
        icon: FileText,
        subsections: [
          {
            subtitle: "6.1 Передача при полной оплате",
            text: "После получения всего Вознаграждения по конкретному Техническому заданию Исполнитель уступает Заказчику относящийся к проекту результат работ в пределах, допустимых законом. До полной оплаты все права сохраняются за Исполнителем, а любая лицензия на использование Результатов приостановлена.",
          },
          {
            subtitle: "6.2 Ранее существовавшая и повторно используемая интеллектуальная собственность Исполнителя",
            text: "Исполнитель сохраняет все права на свои ранее созданные материалы, ноу-хау, методы, фреймворки, библиотеки, инструменты и типовые компоненты, использованные при создании Результатов, и предоставляет Заказчику неисключительную бессрочную лицензию на их использование исключительно в составе Результатов. Сторонние объекты (шрифты, сток-медиа, плагины, API) лицензируются Заказчику на условиях третьих лиц и за счёт Заказчика.",
          },
          {
            subtitle: "6.3 Право на портфолио",
            text: "Исполнитель вправе демонстрировать неконфиденциальные Результаты и упоминать проект в портфолио, кейсах и маркетинге, если иное прямо письменно не указано в Техническом задании. Исполнитель также вправе публиковать обезличенные результаты проверок «было/стало» — числовые оценки и перечень устранённых пунктов без указания домена, наименования и иных сведений, позволяющих определить Заказчика, — если иное прямо письменно не указано в Техническом задании.",
          },
          {
            subtitle: "6.4 Бренд и интеллектуальная собственность экосистемы — единоличное правообладание",
            text: "Вся интеллектуальная собственность, товарные знаки, фирменные наименования, логотипы, доменные имена, исходный код, контент и бренд экосистемы CODE Eternal — включая сайты codeofdigitaleternity.com, aifa.works, aifa.digital и radiocode.space, наименования «CODE», «CODE Eternal» и «AIfa», а также токен $GALATIN — являются и остаются единоличной и исключительной собственностью Максима Валентиновича Галатина. Ничто в настоящем Договоре, в любом Техническом задании или в оказании Услуг не передаёт, не лицензирует и не предоставляет Заказчику каких-либо прав, титула или интереса в отношении бренда, товарных знаков или интеллектуальной собственности экосистемы, кроме конкретных Результатов, оплаченных и прямо уступленных по п. 6.1. Заказчик не вправе использовать, регистрировать, имитировать или оспаривать что-либо из вышеперечисленного.",
          },
        ],
      },
      {
        title: "7. СДАЧА И ПРИЁМКА",
        icon: Scale,
        subsections: [
          {
            subtitle: "7.1 Порядок приёмки",
            text: "После сдачи Заказчик в течение пяти (5) рабочих дней проверяет Результаты и направляет письменное уведомление о любом существенном несоответствии Техническому заданию. При отсутствии такого уведомления в этот срок либо при любом продакшн-использовании Результатов Результаты считаются принятыми. Незначительные отклонения, не препятствующие использованию, не являются основанием для отказа в приёмке.",
          },
          {
            subtitle: "7.2 Правки",
            text: "Техническое задание может включать определённое число раундов правок в рамках согласованного объёма. Правки сверх этого числа или вне согласованного объёма являются дополнительной работой согласно п. 3.2.",
          },
          {
            subtitle: "7.3 Зависимость сроков от Заказчика",
            text: "Любой объявленный срок (включая окно устранения в 48 часов) начинает течь только после того, как Заказчик предоставил всё необходимое для начала работ: письменное согласование объёма, рабочий доступ к панели управления сайтом, рабочий доступ к управлению DNS (если изменения DNS входят в объём) и контакт технического специалиста, способного ответить в течение одного рабочего дня. Время ожидания ответа или доступов Заказчика в срок не засчитывается. Окно устранения — это обязательство выполнить согласованные работы в указанный срок; оно НЕ является заверением о том, что после этого сайт будет соответствовать какому-либо закону, стандарту или регламенту (см. Раздел 3.3).",
          },
          {
            subtitle: "7.4 Обстоятельства непреодолимой силы",
            text: "Ни одна из сторон не отвечает за задержку или неисполнение, вызванные обстоятельствами вне её разумного контроля, в том числе: отказ или деградация хостинга, сети доставки содержимого, регистратора, поставщика DNS либо сторонних сервисов Заказчика; изменения, внесённые в сайт Заказчиком или его другими подрядчиками в ходе работ; закрытая или самописная платформа, не допускающая требуемого изменения; отказ или задержка стороннего поставщика; потеря связи; акты органов власти; природные события. Затронутая сторона незамедлительно уведомляет другую и возобновляет исполнение при первой возможности. Если такое обстоятельство препятствует исполнению более четырнадцати (14) дней, любая из сторон вправе прекратить затронутое Техническое задание, а Исполнитель возвращает вознаграждение за невыполненные работы.",
          },
          {
            subtitle: "7.5 Границы объёма работ",
            text: "Если Техническим заданием прямо не согласовано иное, работы по устранению нарушений охватывают: один домен и его основной поддомен; до двадцати (20) уникальных страниц; стандартную, поддерживаемую платформу или систему управления содержимым в актуальной версии. Сайты сверх этого объёма, закрытые или самописные платформы, витрины с автоматически создаваемыми страницами товаров, локализованные копии сверх одного языка и отдельные поддомены оцениваются и оплачиваются отдельно согласно п. 3.2. Исполнитель уведомляет Заказчика до начала работ, если фактический объём превышает согласованный.",
          },
        ],
      },
      {
        title: "8. ОГОВОРКИ И ОТСУТСТВИЕ ГАРАНТИЙ",
        icon: ShieldAlert,
        subsections: [
          {
            subtitle: "8.1 Основа «как есть»",
            text: "В МАКСИМАЛЬНО ДОПУСТИМОЙ ЗАКОНОМ СТЕПЕНИ УСЛУГИ И РЕЗУЛЬТАТЫ ПРЕДОСТАВЛЯЮТСЯ «КАК ЕСТЬ» И «ПО ДОСТУПНОСТИ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ПРЯМЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ КОММЕРЧЕСКУЮ ПРИГОДНОСТЬ, ПРИГОДНОСТЬ ДЛЯ ОПРЕДЕЛЁННОЙ ЦЕЛИ, НЕНАРУШЕНИЕ ПРАВ, БЕСПЕРЕБОЙНОСТЬ ИЛИ БЕЗОШИБОЧНУЮ РАБОТУ.",
          },
          {
            subtitle: "8.2 Отсутствие гарантированного результата",
            text: "Исполнитель не гарантирует какой-либо конкретный бизнес-, юридический, регуляторный, позиционный, трафиковый, конверсионный, доходный или иной результат. Устранение нарушений снижает, но не устраняет юридические или технические риски и не гарантирует отсутствие претензий, штрафов или судебных исков. Позиции в поисковых системах, поведение сторонних платформ и вывод ИИ-моделей находятся вне контроля Исполнителя.",
          },
          {
            subtitle: "8.3 Оценка третьими лицами",
            text: "Исполнитель не заверяет и не гарантирует, что регулирующий орган, суд, страховщик, платёжная система, аудитор или иное третье лицо оценит сайт, отчёт или выполненные работы так же, как Исполнитель. Отчёты и оценки Исполнителя отражают результат технической проверки на дату её проведения и не являются юридическим заключением, сертификатом соответствия или доказательством в чью-либо пользу.",
          },
          {
            subtitle: "8.4 Доказанные находки и наблюдения, требующие подтверждения",
            text: "Отчёт разделяет находки на доказанные и требующие подтверждения. Доказанной считается находка, опирающаяся на наблюдаемый факт — ответ сервера Заказчика, содержимое страницы или запись в системе доменных имён, — который Заказчик может перепроверить самостоятельно. Наблюдения, полученные с помощью языковых моделей или эвристик, помечаются как требующие подтверждения. По Техническому заданию Исполнитель устраняет доказанные находки; работы по наблюдениям, требующим подтверждения, согласуются и оплачиваются отдельно.",
          },
        ],
      },
      {
        title: "9. ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ",
        icon: AlertTriangle,
        subsections: [
          {
            subtitle: "9.1 Предел ответственности",
            text: "В МАКСИМАЛЬНО ДОПУСТИМОЙ ЗАКОНОМ СТЕПЕНИ СОВОКУПНАЯ ОТВЕТСТВЕННОСТЬ ИСПОЛНИТЕЛЯ, ВОЗНИКАЮЩАЯ ИЗ ИЛИ В СВЯЗИ С КОНКРЕТНЫМ ТЕХНИЧЕСКИМ ЗАДАНИЕМ ИЛИ УСЛУГАМИ, НЕ ПРЕВЫШАЕТ ОБЩЕЙ СУММЫ ВОЗНАГРАЖДЕНИЯ, ФАКТИЧЕСКИ УПЛАЧЕННОГО ЗАКАЗЧИКОМ ПО ЭТОМУ ТЕХНИЧЕСКОМУ ЗАДАНИЮ ЗА ТРИ (3) МЕСЯЦА, ПРЕДШЕСТВУЮЩИХ СОБЫТИЮ, ПОСЛУЖИВШЕМУ ОСНОВАНИЕМ ТРЕБОВАНИЯ.",
          },
          {
            subtitle: "9.2 Исключение косвенных убытков",
            text: "НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ ИСПОЛНИТЕЛЬ НЕ НЕСЁТ ОТВЕТСТВЕННОСТИ ЗА КОСВЕННЫЕ, СЛУЧАЙНЫЕ, ОСОБЫЕ, ПОСЛЕДУЮЩИЕ, ШТРАФНЫЕ УБЫТКИ, А ТАКЖЕ ЗА УПУЩЕННУЮ ВЫГОДУ, ПОТЕРЮ ДОХОДА, ДАННЫХ, ДЕЛОВОЙ РЕПУТАЦИИ ИЛИ ВОЗМОЖНОСТЕЙ, ДАЖЕ ЕСЛИ БЫЛ ПРЕДУПРЕЖДЁН О ВОЗМОЖНОСТИ. Если в юрисдикции такие исключения не допускаются, ответственность ограничивается минимальной суммой, допустимой законом.",
          },
          {
            subtitle: "9.3 Срок предъявления требований",
            text: "Любое требование, связанное с Услугами, должно быть заявлено в течение 14 (четырнадцати) календарных дней после получения Результата или оказания Услуги, иначе оно считается безвозвратно утраченным в допустимых законом пределах.",
          },
        ],
      },
      {
        title: "10. ВОЗМЕЩЕНИЕ (ИНДЕМНИТЕТ)",
        icon: Shield,
        subsections: [
          {
            subtitle: "10.1 Возмещение со стороны Заказчика",
            text: "Заказчик защищает, возмещает и ограждает Исполнителя, его аффилированных лиц, участников и провайдеров от любых претензий, убытков, ответственности, штрафов или издержек (включая разумные юридические расходы), возникающих из: контента, бизнеса или данных Заказчика; использования Заказчиком Результатов; нарушения Заказчиком настоящего Договора или закона; а также из любых связанных с этим претензий третьих лиц.",
          },
        ],
      },
      {
        title: "11. КОНФИДЕНЦИАЛЬНОСТЬ",
        icon: Lock,
        subsections: [
          {
            subtitle: "11.1 Взаимная конфиденциальность",
            text: "Каждая Сторона сохраняет конфиденциальность непубличной информации, раскрытой другой Стороной, и использует её только для исполнения Договора. Это не распространяется на общедоступную, самостоятельно разработанную или законно полученную информацию, а также на раскрытие, требуемое законом. Обязательства действуют один (1) год после прекращения Договора.",
          },
        ],
      },
      {
        title: "12. СРОК, ПРИОСТАНОВКА И РАСТОРЖЕНИЕ",
        icon: Ban,
        subsections: [
          {
            subtitle: "12.1 Срок и расторжение",
            text: "Договор действует с момента акцепта и пока активно любое Техническое задание. Любая Сторона вправе расторгнуть Техническое задание при существенном нарушении, не устранённом в течение десяти (10) дней после письменного уведомления. Исполнитель вправе немедленно приостановить или расторгнуть договор при неоплате, незаконном использовании или чарджбеке.",
          },
          {
            subtitle: "12.2 Последствия расторжения",
            text: "При расторжении Заказчик оплачивает все оказанные Услуги и понесённые издержки на дату расторжения. Разделы об оплате, интеллектуальной собственности, оговорках, ответственности, возмещении, конфиденциальности и разрешении споров сохраняют силу после расторжения.",
          },
        ],
      },
      {
        title: "13. ФОРС-МАЖОР",
        icon: Globe,
        subsections: [
          {
            subtitle: "13.1 Освобождение от ответственности",
            text: "Исполнитель не отвечает за задержку или неисполнение, вызванные обстоятельствами вне его разумного контроля, включая стихийные бедствия, войну, беспорядки, эпидемии, действия властей, сбои интернета или хостинга, отказы сторонних платформ, блокчейн- или платёжных сетей, потерю электропитания или связи.",
          },
        ],
      },
      {
        title: "14. ПРИМЕНИМОЕ ПРАВО, МЕСТО АРБИТРАЖА И РАЗРЕШЕНИЕ СПОРОВ",
        icon: Gavel,
        subsections: [
          {
            subtitle: "14.1 Добросовестное урегулирование",
            text: "Стороны сначала пытаются урегулировать спор путём письменных переговоров в течение тридцати (30) дней с момента уведомления. Этот шаг обязателен до обращения в арбитраж, кроме случаев срочных обеспечительных мер.",
          },
          {
            subtitle: "14.2 Применимое право",
            text: "К настоящему Договору, его заключению, толкованию и к любым внедоговорным обязательствам из него применяется право РЕСПУБЛИКИ ЭКВАДОР — страны, где проживает Исполнитель, — без учёта коллизионных норм. Венская конвенция о договорах международной купли-продажи товаров (CISG) не применяется.",
          },
          {
            subtitle: "14.3 Арбитраж — место, институт, состав",
            text: "Спор, не урегулированный добросовестно, окончательно разрешается арбитражем ПОД АДМИНИСТРИРОВАНИЕМ ЦЕНТРА АРБИТРАЖА И МЕДИАЦИИ ТОРГОВОЙ ПАЛАТЫ КИТО (Centro de Arbitraje y Mediación de la Cámara de Comercio de Quito) по его действующему Регламенту, ЕДИНОЛИЧНЫМ АРБИТРОМ, разрешающим спор по праву (en derecho). МЕСТОМ АРБИТРАЖА ЯВЛЯЕТСЯ КИТО, ЭКВАДОР. Эквадор участвует в Нью-Йоркской конвенции 1958 года, поэтому решение исполнимо более чем в 170 государствах.",
          },
          {
            subtitle: "14.4 Ни одну сторону нельзя обязать приехать",
            text: "Разбирательство ведётся ПИСЬМЕННО И ПО ВИДЕОСВЯЗИ. НИ ОДНУ СТОРОНУ НЕЛЬЗЯ ОБЯЗАТЬ ЯВИТЬСЯ ЛИЧНО на какое-либо заседание, и ни одна сторона не несёт дорожных расходов другой. Место арбитража, названное в п. 14.3, — понятие юридическое, а не географическая обязанность: заседания и совещания могут проходить где угодно или удалённо, не меняя места арбитража.",
          },
          {
            subtitle: "14.5 Язык и документы",
            text: "Языком арбитража является ИСПАНСКИЙ либо АНГЛИЙСКИЙ, если об этом договорились обе стороны. Документы на английском принимаются БЕЗ ПЕРЕВОДА; сторона, которой перевод нужен, оплачивает его сама.",
          },
          {
            subtitle: "14.6 Ускоренная процедура для требований до 50 000 $",
            text: "Если общая цена спора меньше 50 000 долларов США, разбирательство ведётся ТОЛЬКО ПО ДОКУМЕНТАМ в порядке ускоренной процедуры применимого Регламента, без устного слушания, если арбитр не сочтёт его необходимым.",
          },
          {
            subtitle: "14.7 Расходы",
            text: "Расходы на арбитраж, включая административный сбор, гонорар арбитра и разумные расходы выигравшей стороны на представителя, несёт проигравшая сторона, если арбитр по обоснованной причине не решит иначе.",
          },
          {
            subtitle: "14.8 Право выбора Исполнителя при взыскании оплаты",
            text: "ПО ТРЕБОВАНИЯМ О ВЗЫСКАНИИ ПРИЧИТАЮЩЕГОСЯ ВОЗНАГРАЖДЕНИЯ Исполнитель вправе по своему усмотрению вместо арбитража обратиться в компетентный суд по месту нахождения Заказчика или по месту нахождения его имущества, и Заказчик подчиняется такой юрисдикции. Это право принадлежит ТОЛЬКО Исполнителю. Если право конкретного форума не признаёт односторонних оговорок о выборе, недействительным считается только настоящий пункт 14.8, а остальная часть раздела 14 сохраняет силу.",
          },
          {
            subtitle: "14.9 Блокчейн — доказательство, а не форум",
            text: "Записи, закреплённые в публичном блокчейне (в том числе сделки Arweave и их отметки времени), принимаются как достоверное доказательство содержания и времени. НИКАКОЙ ончейн- или «децентрализованный» арбитражный протокол форумом не признаётся: решения таких протоколов не подпадают под Нью-Йоркскую конвенцию и не могут быть обращены на имущество. Децентрализация определяет, как хранится запись, а не то, где решается денежный спор.",
          },
          {
            subtitle: "14.10 Отказ от коллективного иска и суда присяжных",
            text: "В МАКСИМАЛЬНО ДОПУСТИМОЙ ЗАКОНОМ СТЕПЕНИ ВСЕ СПОРЫ РАССМАТРИВАЮТСЯ ТОЛЬКО В ИНДИВИДУАЛЬНОМ ПОРЯДКЕ, А НЕ КАК КОЛЛЕКТИВНЫЙ ИЛИ ПРЕДСТАВИТЕЛЬСКИЙ ИСК. КАЖДАЯ СТОРОНА ОТКАЗЫВАЕТСЯ ОТ ПРАВА НА СУД ПРИСЯЖНЫХ И НА ОБЪЕДИНЕНИЕ ТРЕБОВАНИЙ.",
          },
          {
            subtitle: "14.11 Потребители",
            text: "Если Заказчик — потребитель, РАЗДЕЛ 19 ИМЕЕТ ПРИОРИТЕТ НАД НАСТОЯЩИМ: арбитраж и указанные выше отказы применяются лишь в той мере, в какой это допускают императивные нормы страны его обычного места жительства, и потребитель сохраняет право обратиться в суд своей страны.",
          },
        ],
      },
      {
        title: "15. НЕЗАВИСИМЫЙ СТАТУС И БУДУЩАЯ УСТУПКА",
        icon: Handshake,
        subsections: [
          {
            subtitle: "15.1 Статус",
            text: "Исполнитель является независимым самозанятым физическим лицом, а не работником, партнёром или агентом Заказчика. Ничто не создаёт совместного предприятия или фидуциарных отношений. Исполнитель самостоятельно определяет способ и средства оказания Услуг.",
          },
          {
            subtitle: "15.2 Уступка будущему юридическому лицу",
            text: "Исполнитель вправе уступить, передать или новировать настоящий Договор и любое Техническое задание, полностью или частично, юридическому лицу, которое Исполнитель создаст или будет контролировать в будущем (например, компании в экосистеме CODE Eternal), с уведомлением Заказчика и без его дополнительного согласия. Заказчик не вправе уступать настоящий Договор без предварительного письменного согласия Исполнителя.",
          },
        ],
      },
      {
        title: "16. ПРОЧИЕ УСЛОВИЯ",
        icon: Info,
        subsections: [
          {
            subtitle: "16.1 Полнота договора; делимость; изменения",
            text: "Настоящий Договор вместе с применимым Техническим заданием составляет полное соглашение Сторон и заменяет предыдущие обсуждения. Если какое-либо положение признано недействительным, остальные сохраняют силу, а недействительное заменяется действительным, наиболее близким по смыслу. Исполнитель вправе обновлять оферту; к конкретному заказу применяется версия, действовавшая на момент акцепта.",
          },
          {
            subtitle: "16.2 Уведомления; электронный акцепт; язык",
            text: "Уведомления направляются по email на адреса из п. 1.1 и на контактный адрес Заказчика. Стороны соглашаются, что электронные сообщения и конклюдентные действия являются действительным акцептом и подписью. Договор предоставляется на нескольких языках для удобства; при расхождении преимущественную силу имеет английская версия.",
          },
        ],
      },
      {
        title: "17. КОНТАКТЫ",
        icon: HelpCircle,
        subsections: [
          {
            subtitle: "17.1 Как связаться с Исполнителем",
            text: "По заказам, Техническим заданиям, счетам или вопросам по настоящему Договору: contact@codeofdigitaleternity.com, support@aifa.works и sales@aifa.works. Исполнитель: Максим Валентинович Галатин (CODE Eternal / aifa.works).",
          },
        ],
      },
      {
        title: "18. КТО ТАКОЙ ИСПОЛНИТЕЛЬ, РЕКВИЗИТЫ И ЯЗЫК ДОГОВОРА",
        icon: Info,
        subsections: [
          {
            subtitle: "18.1 Кто оказывает услуги",
            text: "Услуги оказывает ФИЗИЧЕСКОЕ ЛИЦО, а не компания. Полные сведения об Исполнителе — имя, правовой статус, страна пребывания, адрес для юридической переписки и электронные контакты — приведены в блоке реквизитов на этой странице и в подвале каждого сайта экосистемы CODE. Эти сведения раскрываются потому, что их обязан раскрывать любой продавец: ст. 5 Директивы 2000/31/EC об электронной торговле, ст. 6(1)(b)-(c) Директивы 2011/83/EU о правах потребителей, Consumer Contracts Regulations 2013 (Великобритания), Australian Consumer Law и сопоставимые нормы других стран.",
          },
          {
            subtitle: "18.2 Язык договора",
            text: "Договор опубликован на английском, русском, испанском и китайском языках. Заказчик вправе заключить договор и вести переписку на любом из них. При расхождении версий преимущественную силу имеет АНГЛИЙСКИЙ текст — кроме случаев, когда императивная норма страны Заказчика требует для потребителя приоритета версии на его языке; тогда для такого Заказчика приоритет у неё.",
          },
          {
            subtitle: "18.3 Хранение договора",
            text: "Исполнитель хранит Техническое задание, принятую редакцию настоящего Договора и связанную переписку в течение работы и в сроки, установленные применимым правом. По запросу Заказчик получает копию заключённого договора на долговременном носителе (файлом PDF по электронной почте).",
          },
        ],
      },
      {
        title: "19. ПОТРЕБИТЕЛИ: ИМПЕРАТИВНЫЕ ПРАВА И ОТКАЗ ОТ ДОГОВОРА",
        icon: Scale,
        subsections: [
          {
            subtitle: "19.1 Кого защищает этот раздел",
            text: "Раздел применяется, если Заказчик — ПОТРЕБИТЕЛЬ, то есть физическое лицо, действующее полностью или преимущественно вне своей предпринимательской или профессиональной деятельности. В этом случае НАСТОЯЩИЙ РАЗДЕЛ ИМЕЕТ ПРИОРИТЕТ над разделами 4.3, 9 и 14 в части противоречия.",
          },
          {
            subtitle: "19.2 Императивные нормы не отменяются",
            text: "Ничто в Договоре не отменяет и не ограничивает прав, которые потребитель имеет по императивным нормам страны своего обычного места жительства (ст. 6 Регламента (ЕС) 593/2008, «Рим I»). Потребитель вправе обращаться в суд своей страны, и иск к нему может быть предъявлен только там (ст. 17-19 Регламента (ЕС) 1215/2012, «Брюссель I bis»). Положения раздела 14 об арбитраже и об отказе от коллективного иска применяются к потребителю лишь в той мере, в какой это допускает право его страны.",
          },
          {
            subtitle: "19.3 Право на отказ — 14 дней",
            text: "Потребитель в ЕС/ЕЭЗ и Великобритании вправе отказаться от Договора в течение 14 календарных дней со дня его заключения БЕЗ ОБЪЯСНЕНИЯ ПРИЧИН и без каких-либо расходов, кроме указанных в п. 19.4. Во многих других странах действует сопоставимый срок охлаждения, и Исполнитель соблюдает его на тех же условиях. Для отказа достаточно недвусмысленного заявления на contact@codeofdigitaleternity.com (например: «Настоящим отказываюсь от договора от [дата] на [услугу]»). Достаточно отправить его до истечения срока. Исполнитель незамедлительно подтверждает получение и возвращает все полученные средства тем же способом платежа в течение 14 дней с момента извещения.",
          },
          {
            subtitle: "19.4 Начало работ до истечения 14 дней",
            text: "Если потребитель хочет, чтобы работа началась в течение срока отказа, он должен ПРЯМО ОБ ЭТОМ ПОПРОСИТЬ и подтвердить, что: (а) после ПОЛНОГО оказания услуги с таким предварительным прямым согласием право на отказ УТРАЧИВАЕТСЯ (ст. 16(a) Директивы 2011/83/EU; п. 36 Consumer Contracts Regulations 2013); и (б) при отказе на середине работы потребитель оплачивает сумму, соразмерную выполненному к этому моменту, относительно полной цены. Без такой прямой просьбы и подтверждения работа не начинается до истечения 14 дней. Если потребителю НЕ сообщили о праве на отказ, срок этого права продлевается на двенадцать месяцев (ст. 10 Директивы 2011/83/EU) — ради этого пункт и написан.",
          },
          {
            subtitle: "19.5 Соответствие результата",
            text: "Результат работ должен соответствовать описанию в Техническом задании и быть пригодным для указанной там цели. При передаче потребителю цифрового содержания или цифровых услуг применяются средства защиты по Директиве (ЕС) 2019/770 — устранение недостатка, соразмерное уменьшение цены или расторжение; в Великобритании — равнозначные средства по Consumer Rights Act 2015. Эти средства бесплатны и действуют дополнительно к любой добровольной гарантии.",
          },
          {
            subtitle: "19.6 Претензии и внесудебное урегулирование",
            text: "Претензии направляются на contact@codeofdigitaleternity.com и рассматриваются в течение 14 дней. Если ответ потребителя не устроил, он вправе обратиться в орган защиты прав потребителей или в утверждённую схему внесудебного урегулирования своей страны; Исполнитель добросовестно участвует в таком разбирательстве. Обратите внимание: площадка Европейской комиссии по разрешению споров онлайн (ODR) ПРЕКРАТИЛА РАБОТУ 20 июля 2025 года, поэтому ссылка на неё здесь не приводится; национальные органы защиты прав потребителей продолжают работать.",
          },
        ],
      },
      {
        title: "20. НАЛОГИ, САНКЦИИ, ЭКСПОРТНЫЙ КОНТРОЛЬ И ЗАКОННОСТЬ СРЕДСТВ",
        icon: Ban,
        subsections: [
          {
            subtitle: "20.1 Налоги и место реализации",
            text: "Если в Техническом задании не указано иное, вознаграждение указывается без НДС, GST, налога с продаж и равнозначных оборотных налогов. Когда такой налог подлежит уплате при оказании услуги потребителю, он начисляется по ставке страны потребителя и показывается до оплаты. При оказании услуги предприятию, учреждённому в ЕС, может применяться механизм обратного начисления (reverse charge), если Заказчик сообщил действительный номер плательщика НДС; за достоверность номера отвечает Заказчик. Подоходные налоги каждая сторона платит сама. Ввозные пошлины и удержания, установленные страной Заказчика, урегулированы п. 4.2.",
          },
          {
            subtitle: "20.2 Санкции",
            text: "Заказчик заверяет и гарантирует, что ни он, ни его владельцы, ни лицо, в чью пользу приобретаются услуги, не включены в санкционные списки ООН, Европейского союза, Великобритании, США (включая список SDN OFAC) или иного применимого органа, и что он не находится на территории, в отношении которой действуют всеобъемлющие санкции, и не действует в интересах лица, там находящегося. Исполнитель вправе отказать, приостановить или расторгнуть договор без ответственности, если исполнение нарушило бы такие меры или создало существенный риск их нарушения. Средства, уплаченные за невыполненную по этой причине работу, возвращаются.",
          },
          {
            subtitle: "20.3 Экспортный контроль и запрещённое конечное использование",
            text: "Результаты работ и переданные технические сведения могут подпадать под правила экспортного контроля. Заказчик не вправе использовать, реэкспортировать или предоставлять результаты в связи с оружием массового поражения, военным конечным использованием в стране под эмбарго, незаконным слежением за людьми или иным запрещённым конечным использованием, а также передавать их лицам, если это нарушило бы такие правила.",
          },
          {
            subtitle: "20.4 Законность происхождения средств",
            text: "Платёж должен происходить из законного источника и со счёта, карты или кошелька, принадлежащих Заказчику. При крупных платежах и при расчётах в криптоактивах Исполнитель вправе до начала или продолжения работ запросить разумное подтверждение личности и происхождения средств и отклонить платёж, который невозможно проверить. Это повторяет обязанности, возложенные на платёжных операторов правилами противодействия отмыванию денег.",
          },
        ],
      },
    ],
    bannerTag: "ПОД ЗАЩИТОЙ ЮРИДИЧЕСКОГО ЩИТА CODE ETERNAL",
    bannerNote: "Заказывая или оплачивая любую услугу, вы полностью принимаете настоящий Договор.",
  };

  // ─── SPANISH ─────────────────────────────────────────────────────────────────
  const es = {
    title: "Oferta Pública de Prestación de Servicios",
    subtitle: "Contrato marco de servicios y mecanismo de Órdenes de Trabajo (Statement of Work): desarrollo web, subsanación de infracciones, integración de IA y diseño",
    lastUpdated: "Fecha de entrada en vigor: 19 de julio de 2026 · Versión 1.0",
    backBtn: "Volver al Inicio",
    acceptTitle: "Cómo se celebra este Contrato",
    acceptDesc: "Este documento es una oferta pública (el «Contrato») dirigida por el Prestador a cualquier persona jurídica o física (el «Cliente»). No se requiere firma. El Contrato se celebra, y sus términos son plenamente vinculantes, en el momento más temprano de las siguientes acciones concluyentes del Cliente:",
    acceptSteps: [
      "El Cliente solicita, encarga o confirma cualquier servicio por email, chat, formulario o mensajería;",
      "El Cliente aprueba una Orden de Trabajo / brief de un proyecto concreto;",
      "El Cliente realiza cualquier pago (incluido un depósito o anticipo) por los servicios;",
      "El Cliente proporciona accesos, credenciales, materiales o contenido para iniciar el trabajo.",
      "Realizar cualquiera de estas acciones significa que el Cliente ha leído, comprendido y aceptado incondicionalmente todos los términos siguientes.",
    ],
    sections: [
      {
        title: "1. DISPOSICIONES GENERALES Y PARTES",
        icon: BookOpen,
        subsections: [
          {
            subtitle: "1.1 El Prestador",
            text: "Los servicios de este Contrato los presta Maksim Valentinovich Galatin, actuando como profesional autónomo independiente (el «Prestador»), contactable en contact@codeofdigitaleternity.com, support@aifa.works y sales@aifa.works. El Prestador opera el ecosistema CODE Eternal, incluido aifa.works. En la fecha de entrada en vigor el Prestador actúa como persona física; se reserva el derecho de ceder este Contrato y cualquier Orden de Trabajo a una entidad jurídica que constituya en el futuro (véase la Sección 15).",
          },
          {
            subtitle: "1.2 Naturaleza de la oferta",
            text: "Este Contrato es una oferta pública jurídicamente vinculante por la que el Prestador se obliga a prestar, y el Cliente a aceptar y pagar, servicios técnicos y creativos profesionales. No es un contrato laboral, sociedad, empresa conjunta, franquicia ni relación de agencia, y no crea deber fiduciario alguno. Cada encargo se documenta mediante una Orden de Trabajo que incorpora este Contrato por referencia; en caso de conflicto, para ese proyecto prevalece la Orden de Trabajo y, para lo demás, este Contrato.",
          },
          {
            subtitle: "1.3 Definiciones",
            text: "«Servicios» — el trabajo descrito en la Sección 2 y detallado en una Orden de Trabajo.\n«Entregables» — los resultados de los Servicios (código, sitios, correcciones, integraciones, diseños, archivos) entregados al Cliente.\n«Orden de Trabajo» (en la práctica internacional — Statement of Work, abrev. SOW) — un brief escrito (email, documento o formulario) que define alcance, plazo y precio de un proyecto.\n«Honorarios» — los importes pagaderos por los Servicios.\n«AIfaFocus» — el escáner automático de cumplimiento de sitios web operado por el Prestador.",
          },
        ],
      },
      {
        title: "2. OBJETO Y ALCANCE DE LOS SERVICIOS",
        icon: Briefcase,
        subsections: [
          {
            subtitle: "2.1 Categorías de servicios",
            text: "El Prestador ofrece, total o parcialmente, los siguientes Servicios:\n\n• Creación y desarrollo de sitios web (landings, sitios corporativos, aplicaciones web);\n• Subsanación de infracciones y defectos detectados por el escaneo de AIfaFocus (accesibilidad/ADA/WCAG, privacidad/CCPA, rastreo/HIPAA, correo/DMARC y riesgos técnicos similares);\n• Integración de agentes y asistentes de IA (AIfa y modelos de terceros) en los productos y procesos del Cliente;\n• Diseño web, UX/UI, branding y servicios creativos afines.\n\nEl alcance exacto de cada proyecto se fija exclusivamente en la Orden de Trabajo correspondiente. Todo lo que no figure expresamente en una Orden de Trabajo queda fuera del alcance.",
          },
          {
            subtitle: "2.2 Naturaleza y límites de la subsanación",
            text: "Los servicios de subsanación son servicios técnicos para reducir la exposición técnica identificable. NO constituyen asesoramiento jurídico, representación, auditoría legal ni certificación de cumplimiento de ninguna ley, norma o reglamento (incluidos ADA, WCAG, CCPA/CPRA, HIPAA, GDPR, TCPA u otros). El escaneo de AIfaFocus y cualquier informe son análisis heurísticos automáticos de carácter informativo. El Prestador no es un bufete, auditor licenciado ni autoridad reguladora. El Cliente es el único responsable de su cumplimiento legal y debe consultar a profesionales cualificados.",
          },
          {
            subtitle: "2.3 Autorización para la evaluación técnica en profundidad",
            text: "La evaluación técnica en profundidad (rastreo de páginas internas, identificación de versiones de software, comprobación de archivos de servicio expuestos, análisis de formularios) se realiza ÚNICAMENTE tras la aceptación de esta Oferta y solo sobre el dominio indicado en el Enunciado de Trabajo. Al aceptar la Oferta, el Cliente confirma que tiene autoridad sobre ese dominio y autoriza dicha evaluación. El Contratista NO realiza: adivinación de contraseñas o credenciales; pruebas de carga o resiliencia; envío de cargas maliciosas a formularios; intentos de eludir medidas de protección; descarga del contenido de archivos de servicio expuestos — solo se registra su existencia. La comprobación gratuita se limita a información pública y no requiere autorización.",
          },
        ],
      },
      {
        title: "3. EJECUCIÓN Y CAMBIOS",
        icon: ClipboardList,
        subsections: [
          {
            subtitle: "3.1 Órdenes de Trabajo",
            text: "Cada proyecto comienza con una Orden de Trabajo acordada por las Partes que especifica alcance, entregables, plazo, hitos y Honorarios. Los plazos son estimaciones de buena fe, no garantías, y dependen de la cooperación oportuna del Cliente. El Prestador puede recurrir a subcontratistas o herramientas a su discreción, permaneciendo responsable de los Entregables.",
          },
          {
            subtitle: "3.2 Cambios y trabajo adicional",
            text: "Toda solicitud fuera de la Orden de Trabajo acordada (ampliación de alcance, nuevas funciones, rondas de revisión adicionales, rediseños, nuevas páginas) constituye trabajo adicional sujeto a presupuesto y Honorarios aparte. El Prestador puede ajustar razonablemente plazos y Honorarios por cambios del Cliente o por información inexacta/incompleta facilitada por este.",
          },
        ],
      },
      {
        title: "4. HONORARIOS, PAGO, IMPUESTOS Y REEMBOLSOS",
        icon: CreditCard,
        subsections: [
          {
            subtitle: "4.1 Honorarios y calendario de pago",
            text: "Los Honorarios se indican en la Orden de Trabajo. Salvo pacto distinto, el trabajo comienza tras recibir un pago inicial (depósito), habitualmente el 50%, con el saldo a la entrega o por hitos acordados. El Prestador puede retener la entrega, la transferencia de archivos o el despliegue hasta el pago íntegro. El acceso a los resultados (cuentas, fuentes, despliegue en producción) está condicionado al pago total.",
          },
          {
            subtitle: "4.2 Impuestos, comisiones y moneda",
            text: "Todos los Honorarios son importes netos. El Cliente asume todos los impuestos, tasas, cargos bancarios, costes de conversión, comisiones de pasarelas de pago y tarifas de red/blockchain asociadas al pago. Si la jurisdicción del Cliente exige retención, el Cliente incrementará el pago para que el Prestador reciba el importe neto íntegro.",
          },
          {
            subtitle: "4.3 Importes no reembolsables y contracargos",
            text: "Los depósitos y los pagos por trabajo ya realizado no son reembolsables, pues compensan el tiempo reservado y el esfuerzo prestado. Dado que los Servicios son trabajo digital a medida creado específicamente para el Cliente, el derecho de desistimiento/período de reflexión (donde aplicaría) se renuncia, en la medida permitida por la ley, una vez iniciada la ejecución con el consentimiento del Cliente. Iniciar un contracargo o disputa de pago por servicios prestados es un incumplimiento sustancial; el Prestador puede suspender el trabajo, revocar licencias sobre los Entregables y reclamar los importes debidos más costes.",
          },
          {
            subtitle: "4.4 Mora y suspensión",
            text: "Los importes vencidos podrán devengar intereses del menor entre el 1,5% mensual o el máximo permitido por la ley. El Prestador puede suspender Servicios, despliegues y soporte mientras exista mora, sin responsabilidad por el retraso resultante.",
          },
        ],
      },
      {
        title: "5. OBLIGACIONES Y GARANTÍAS DEL CLIENTE",
        icon: Users,
        subsections: [
          {
            subtitle: "5.1 Cooperación y materiales",
            text: "El Cliente proporcionará, con prontitud y exactitud, todos los accesos, credenciales, dominios, hosting, cuentas, contenido, textos, imágenes, activos de marca e información razonablemente necesarios. El Cliente es responsable de mantener copias de seguridad independientes de sus datos y sistemas antes, durante y después de los Servicios.",
          },
          {
            subtitle: "5.2 Legalidad del contenido y autoridad",
            text: "El Cliente garantiza que tiene el derecho y la autoridad para contratar al Prestador y conceder acceso a los sistemas pertinentes; que todos los materiales que aporta son lícitos y no infringen derechos de terceros; y que su uso de los Entregables cumplirá la ley aplicable. El Cliente es el único responsable de la legalidad de su contenido, negocio y datos.",
          },
        ],
      },
      {
        title: "6. PROPIEDAD INTELECTUAL",
        icon: FileText,
        subsections: [
          {
            subtitle: "6.1 Transferencia al pago íntegro",
            text: "Tras recibir todos los Honorarios de una Orden de Trabajo, el Prestador cede al Cliente el producto de trabajo específico de ese proyecto, en la medida legalmente cedible. Hasta el pago íntegro, todos los derechos permanecen en el Prestador y cualquier licencia de uso de los Entregables queda suspendida.",
          },
          {
            subtitle: "6.2 PI preexistente y reutilizable del Prestador",
            text: "El Prestador conserva todos los derechos sobre sus materiales preexistentes, know-how, métodos, frameworks, bibliotecas, herramientas y componentes genéricos usados para producir los Entregables, y concede al Cliente una licencia no exclusiva y perpetua para usarlos únicamente integrados en los Entregables. Los activos de terceros (fuentes, medios de stock, plugins, API) se licencian al Cliente en los términos del tercero y a su costa.",
          },
          {
            subtitle: "6.3 Derechos de portafolio",
            text: "El Prestador puede mostrar los Entregables no confidenciales y referenciar el encargo en su portafolio, casos de estudio y marketing, salvo que la Orden de Trabajo indique expresamente lo contrario por escrito. El Contratista también podrá publicar resultados de auditoría anonimizados de antes y después —puntuaciones numéricas y la lista de puntos subsanados, sin el dominio, el nombre ni ningún otro dato que identifique al Cliente— salvo que el Enunciado de Trabajo indique expresamente lo contrario por escrito.",
          },
          {
            subtitle: "6.4 Marca y PI del ecosistema — titularidad exclusiva",
            text: "Toda la propiedad intelectual, marcas, nombres comerciales, logotipos, nombres de dominio, código fuente, contenido y marca del ecosistema CODE Eternal —incluidos los sitios codeofdigitaleternity.com, aifa.works, aifa.digital y radiocode.space, los nombres «CODE», «CODE Eternal» y «AIfa», y el token $GALATIN— son y siguen siendo propiedad única y exclusiva de Maksim Valentinovich Galatin. Nada en este Contrato, en ninguna Orden de Trabajo ni en la prestación de los Servicios transfiere, licencia u otorga al Cliente derecho, título o interés alguno sobre la marca, las marcas registradas o la propiedad intelectual del ecosistema, salvo los Entregables concretos pagados y expresamente cedidos conforme al punto 6.1. El Cliente no usará, registrará, imitará ni impugnará ninguno de los anteriores.",
          },
        ],
      },
      {
        title: "7. ENTREGA Y ACEPTACIÓN",
        icon: Scale,
        subsections: [
          {
            subtitle: "7.1 Procedimiento de aceptación",
            text: "Tras la entrega, el Cliente dispone de cinco (5) días hábiles para revisar los Entregables y notificar por escrito cualquier disconformidad sustancial con la Orden de Trabajo. En ausencia de tal notificación en ese plazo, o ante cualquier uso en producción de los Entregables, estos se consideran aceptados. Las desviaciones menores que no impidan el uso no son motivo de rechazo.",
          },
          {
            subtitle: "7.2 Revisiones",
            text: "La Orden de Trabajo puede incluir un número definido de rondas de revisión dentro del alcance acordado. Las revisiones que excedan ese número o queden fuera del alcance son trabajo adicional conforme al punto 3.2.",
          },
          {
            subtitle: "7.3 Dependencias del Cliente y plazos",
            text: "Todo plazo anunciado (incluida la ventana de subsanación de 48 horas) empieza a correr solo cuando el Cliente ha entregado lo necesario para comenzar: la aprobación por escrito del alcance, acceso operativo al panel del sitio, acceso operativo a la gestión de DNS (si los cambios de DNS entran en el alcance) y el contacto de un responsable técnico capaz de responder en un día hábil. El tiempo de espera de respuestas o accesos del Cliente no computa en el plazo. La ventana de subsanación es un compromiso de ejecutar los trabajos acordados en ese plazo; NO es una declaración de que después el sitio cumplirá ley, norma o reglamento alguno (véase el punto 3.3).",
          },
          {
            subtitle: "7.4 Fuerza mayor",
            text: "Ninguna parte responde por retrasos o incumplimientos causados por circunstancias fuera de su control razonable, incluidas: fallo o degradación del alojamiento, la red de distribución de contenidos, el registrador, el proveedor de DNS o los servicios de terceros del Cliente; cambios introducidos en el sitio por el Cliente o por sus otros proveedores durante los trabajos; una plataforma cerrada o a medida que no admita el cambio requerido; fallo o retraso de un proveedor externo; pérdida de conectividad; actos de autoridad; sucesos naturales. La parte afectada avisa sin demora a la otra y reanuda el cumplimiento en cuanto sea posible. Si tal circunstancia impide el cumplimiento durante más de catorce (14) días, cualquiera de las partes puede resolver el Enunciado de Trabajo afectado y el Contratista reembolsa la parte no ejecutada.",
          },
          {
            subtitle: "7.5 Límites del alcance",
            text: "Salvo que el Enunciado de Trabajo acuerde expresamente otra cosa, la subsanación cubre: un dominio y su subdominio principal; hasta veinte (20) páginas únicas; una plataforma o gestor de contenidos estándar, con soporte y en versión vigente. Los sitios que excedan este alcance, las plataformas cerradas o a medida, las tiendas con páginas de producto generadas, las copias localizadas más allá de un idioma y los subdominios independientes se presupuestan y facturan por separado conforme al punto 3.2. El Contratista avisa al Cliente antes de comenzar si el alcance real supera lo acordado.",
          },
        ],
      },
      {
        title: "8. EXENCIONES Y AUSENCIA DE GARANTÍA",
        icon: ShieldAlert,
        subsections: [
          {
            subtitle: "8.1 Base «tal cual»",
            text: "EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, LOS SERVICIOS Y ENTREGABLES SE PRESTAN «TAL CUAL» Y «SEGÚN DISPONIBILIDAD», SIN GARANTÍAS DE NINGÚN TIPO, EXPRESAS O IMPLÍCITAS, INCLUIDAS COMERCIABILIDAD, IDONEIDAD PARA UN FIN CONCRETO, NO INFRACCIÓN, DISPONIBILIDAD O FUNCIONAMIENTO SIN ERRORES.",
          },
          {
            subtitle: "8.2 Sin resultados garantizados",
            text: "El Prestador no garantiza ningún resultado concreto de negocio, legal, regulatorio, de posicionamiento, tráfico, conversión, ingresos o rendimiento. La subsanación reduce pero no elimina la exposición legal o técnica y no garantiza la ausencia de reclamaciones, multas o litigios. El posicionamiento en buscadores, el comportamiento de plataformas de terceros y las salidas de modelos de IA están fuera del control del Prestador.",
          },
          {
            subtitle: "8.3 Valoración por terceros",
            text: "El Contratista no declara ni garantiza que un regulador, tribunal, aseguradora, proveedor de pagos, auditor u otro tercero valore el sitio, el informe o el trabajo realizado del mismo modo que el Contratista. Los informes y las puntuaciones reflejan una comprobación técnica en la fecha en que se realizó; no son un dictamen jurídico, un certificado de conformidad ni prueba a favor de nadie.",
          },
          {
            subtitle: "8.4 Hallazgos confirmados frente a observaciones pendientes de verificación",
            text: "El informe separa los hallazgos en confirmados y pendientes de verificación. Un hallazgo es confirmado cuando se apoya en un hecho observable —la respuesta del propio servidor del Cliente, el contenido de la página o un registro del sistema de nombres de dominio— que el Cliente puede volver a comprobar por su cuenta. Las observaciones generadas por modelos de lenguaje o heurísticas se marcan como pendientes de verificación. Conforme al Enunciado de Trabajo, el Contratista subsana los hallazgos confirmados; el trabajo sobre observaciones pendientes se acuerda y factura por separado.",
          },
        ],
      },
      {
        title: "9. LIMITACIÓN DE RESPONSABILIDAD",
        icon: AlertTriangle,
        subsections: [
          {
            subtitle: "9.1 Límite de responsabilidad",
            text: "EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, LA RESPONSABILIDAD TOTAL AGREGADA DEL PRESTADOR DERIVADA DE O RELACIONADA CON UNA ORDEN DE TRABAJO O LOS SERVICIOS NO EXCEDERÁ EL TOTAL DE HONORARIOS EFECTIVAMENTE PAGADOS POR EL CLIENTE POR ESA ORDEN DE TRABAJO EN LOS TRES (3) MESES ANTERIORES AL HECHO QUE ORIGINA LA RECLAMACIÓN.",
          },
          {
            subtitle: "9.2 Exclusión de daños indirectos",
            text: "EN NINGÚN CASO EL PRESTADOR RESPONDERÁ POR DAÑOS INDIRECTOS, INCIDENTALES, ESPECIALES, CONSECUENTES, EJEMPLARES O PUNITIVOS, NI POR LUCRO CESANTE, PÉRDIDA DE INGRESOS, DATOS, FONDO DE COMERCIO U OPORTUNIDADES, AUNQUE SE LE HAYA ADVERTIDO DE SU POSIBILIDAD. Si alguna jurisdicción no permite ciertas exclusiones, la responsabilidad se limita al mínimo permitido por la ley.",
          },
          {
            subtitle: "9.3 Plazo de reclamación",
            text: "Toda reclamación relativa a los Servicios debe interponerse dentro de los 14 (catorce) días naturales posteriores a la recepción del Entregable o a la prestación del Servicio; en su defecto, se renuncia a ella de forma permanente en la medida permitida por la ley.",
          },
        ],
      },
      {
        title: "10. INDEMNIZACIÓN",
        icon: Shield,
        subsections: [
          {
            subtitle: "10.1 Indemnización del Cliente",
            text: "El Cliente defenderá, indemnizará y mantendrá indemne al Prestador y a sus afiliados, colaboradores y proveedores frente a cualquier reclamación, pérdida, responsabilidad, multa o coste (incluidos honorarios legales razonables) derivados de: el contenido, negocio o datos del Cliente; el uso de los Entregables por el Cliente; el incumplimiento por el Cliente de este Contrato o de la ley; y cualquier reclamación de terceros relacionada con lo anterior.",
          },
        ],
      },
      {
        title: "11. CONFIDENCIALIDAD",
        icon: Lock,
        subsections: [
          {
            subtitle: "11.1 Confidencialidad mutua",
            text: "Cada Parte mantendrá confidencial la información no pública revelada por la otra y la usará solo para ejecutar este Contrato. No aplica a información pública, desarrollada de forma independiente u obtenida lícitamente, ni a divulgaciones exigidas por ley. Las obligaciones subsisten un (1) año tras la terminación del Contrato.",
          },
        ],
      },
      {
        title: "12. VIGENCIA, SUSPENSIÓN Y TERMINACIÓN",
        icon: Ban,
        subsections: [
          {
            subtitle: "12.1 Vigencia y terminación",
            text: "Este Contrato aplica desde la aceptación y continúa mientras alguna Orden de Trabajo esté activa. Cualquiera de las Partes puede terminar una Orden de Trabajo por incumplimiento sustancial no subsanado en diez (10) días desde la notificación escrita. El Prestador puede suspender o terminar de inmediato por impago, uso ilícito o contracargo.",
          },
          {
            subtitle: "12.2 Efectos de la terminación",
            text: "Al terminar, el Cliente pagará todos los Servicios prestados y costes incurridos hasta la fecha de terminación. Las secciones sobre pago, PI, exenciones, responsabilidad, indemnización, confidencialidad y resolución de disputas subsisten a la terminación.",
          },
        ],
      },
      {
        title: "13. FUERZA MAYOR",
        icon: Globe,
        subsections: [
          {
            subtitle: "13.1 Cumplimiento excusado",
            text: "El Prestador no responde por retrasos o incumplimientos causados por eventos fuera de su control razonable, incluidos casos fortuitos, guerra, disturbios, epidemias, actos de gobierno, caídas de internet u hosting, fallos de plataformas de terceros, redes de blockchain o pago, cortes de energía o conectividad.",
          },
        ],
      },
      {
        title: "14. LEY APLICABLE, SEDE Y RESOLUCIÓN DE CONTROVERSIAS",
        icon: Gavel,
        subsections: [
          {
            subtitle: "14.1 Resolución de buena fe",
            text: "Las Partes intentarán primero resolver amistosamente cualquier controversia mediante negociación escrita dentro de los treinta (30) días siguientes a la notificación. Este paso es condición previa al arbitraje, salvo para medidas urgentes.",
          },
          {
            subtitle: "14.2 Ley aplicable",
            text: "Este Contrato, su formación, interpretación y cualquier obligación extracontractual derivada de él se rigen por la ley de la REPÚBLICA DEL ECUADOR, país de residencia del Contratista, sin atender a las normas de conflicto. No se aplica la Convención de Viena sobre Compraventa Internacional de Mercaderías (CISG).",
          },
          {
            subtitle: "14.3 Arbitraje — sede, institución y árbitro",
            text: "Toda controversia no resuelta amistosamente se resolverá definitivamente mediante arbitraje ADMINISTRADO POR EL CENTRO DE ARBITRAJE Y MEDIACIÓN DE LA CÁMARA DE COMERCIO DE QUITO conforme a su Reglamento vigente, por ÁRBITRO ÚNICO, en derecho. LA SEDE DEL ARBITRAJE ES QUITO, ECUADOR. Ecuador es parte de la Convención de Nueva York de 1958, por lo que el laudo es ejecutable en más de 170 Estados.",
          },
          {
            subtitle: "14.4 Ninguna Parte puede ser obligada a viajar",
            text: "El procedimiento se desarrolla POR ESCRITO Y POR VIDEOCONFERENCIA. NINGUNA PARTE PODRÁ SER OBLIGADA A COMPARECER PERSONALMENTE en audiencia alguna, ni soportará los gastos de viaje de la otra. La sede indicada en 14.3 es un concepto jurídico y no una obligación geográfica: las audiencias y deliberaciones pueden celebrarse en cualquier lugar o a distancia sin alterar la sede.",
          },
          {
            subtitle: "14.5 Idioma y documentos",
            text: "El idioma del arbitraje es el ESPAÑOL, o el INGLÉS si ambas Partes lo acuerdan. Los documentos en inglés son admisibles SIN TRADUCCIÓN; la Parte que requiera una traducción asume su coste.",
          },
          {
            subtitle: "14.6 Procedimiento abreviado para reclamaciones inferiores a 50 000 USD",
            text: "Cuando la cuantía total en disputa sea inferior a 50 000 dólares estadounidenses, el arbitraje se sustanciará ÚNICAMENTE SOBRE DOCUMENTOS conforme al procedimiento abreviado del Reglamento aplicable, sin audiencia oral salvo que el árbitro la considere indispensable.",
          },
          {
            subtitle: "14.7 Costas",
            text: "La Parte vencida soporta las costas del arbitraje, incluidos los derechos administrativos, los honorarios del árbitro y los costes razonables de representación letrada de la Parte vencedora, salvo que el árbitro decida otra cosa por causa justificada.",
          },
          {
            subtitle: "14.8 Opción del Contratista para el cobro de honorarios impagados",
            text: "EN LAS RECLAMACIONES DIRIGIDAS AL COBRO DE HONORARIOS DEBIDOS, el Contratista podrá, a su sola elección, acudir en lugar del arbitraje a los tribunales competentes del domicilio del Cliente o de cualquier lugar donde éste tenga bienes, sometiéndose el Cliente a dicha jurisdicción. Esta opción corresponde ÚNICAMENTE al Contratista. Si la ley aplicable en un foro determinado no reconoce las cláusulas de opción unilateral, sólo se verá afectada esta cláusula 14.8 y el resto de la sección 14 conservará su vigencia.",
          },
          {
            subtitle: "14.9 La cadena de bloques es prueba, no foro",
            text: "Los registros anclados en una cadena de bloques pública (incluidas las transacciones de Arweave y sus sellos de tiempo) se admiten como prueba auténtica de contenido y fecha. NO se pacta como foro ningún protocolo de arbitraje «en cadena» o «descentralizado»: sus laudos no están amparados por la Convención de Nueva York y no pueden ejecutarse sobre bienes. La descentralización rige cómo se conserva el registro, no dónde se decide una controversia dineraria.",
          },
          {
            subtitle: "14.10 Renuncia a la acción colectiva y al jurado",
            text: "EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY, TODAS LAS CONTROVERSIAS SE SUSTANCIARÁN ÚNICAMENTE DE FORMA INDIVIDUAL Y NO COMO ACCIÓN COLECTIVA O REPRESENTATIVA. CADA PARTE RENUNCIA AL JUICIO POR JURADO Y A LA ACUMULACIÓN DE PRETENSIONES.",
          },
          {
            subtitle: "14.11 Consumidores",
            text: "Cuando el Cliente sea consumidor, LA SECCIÓN 19 PREVALECE SOBRE ESTA: el arbitraje y las renuncias anteriores se aplican sólo en la medida en que lo permitan las normas imperativas del país de su residencia habitual, y el consumidor conserva el derecho a acudir a los tribunales de ese país.",
          },
        ],
      },
      {
        title: "15. CONDICIÓN INDEPENDIENTE Y CESIÓN FUTURA",
        icon: Handshake,
        subsections: [
          {
            subtitle: "15.1 Condición",
            text: "El Prestador es un profesional autónomo independiente y no un empleado, socio o agente del Cliente. Nada crea una empresa conjunta o relación fiduciaria. El Prestador controla el modo y los medios de prestar los Servicios.",
          },
          {
            subtitle: "15.2 Cesión a entidad futura",
            text: "El Prestador puede ceder, novar o transferir este Contrato y cualquier Orden de Trabajo, total o parcialmente, a una entidad jurídica que constituya o controle en el futuro (p. ej., una empresa del ecosistema CODE Eternal), previa notificación al Cliente y sin su consentimiento adicional. El Cliente no puede ceder este Contrato sin el consentimiento previo por escrito del Prestador.",
          },
        ],
      },
      {
        title: "16. DISPOSICIONES VARIAS",
        icon: Info,
        subsections: [
          {
            subtitle: "16.1 Contrato íntegro; divisibilidad; modificaciones",
            text: "Este Contrato junto con la Orden de Trabajo aplicable constituye el acuerdo íntegro entre las Partes y sustituye discusiones previas. Si alguna disposición se declara inválida, el resto sigue vigente y la inválida se sustituye por otra válida lo más cercana posible a la intención original. El Prestador puede actualizar esta oferta; a cada encargo aplica la versión vigente en el momento de la aceptación.",
          },
          {
            subtitle: "16.2 Notificaciones; aceptación electrónica; idioma",
            text: "Las notificaciones podrán darse por email a las direcciones de la Sección 1.1 y a la dirección de contacto del Cliente. Las Partes acuerdan que las comunicaciones electrónicas y las acciones concluyentes constituyen aceptación y firma válidas. Este Contrato se ofrece en varios idiomas por conveniencia; en caso de discrepancia, prevalece la versión inglesa.",
          },
        ],
      },
      {
        title: "17. CONTACTO",
        icon: HelpCircle,
        subsections: [
          {
            subtitle: "17.1 Cómo contactar al Prestador",
            text: "Para encargos, Órdenes de Trabajo, facturas o consultas sobre este Contrato: contact@codeofdigitaleternity.com, support@aifa.works y sales@aifa.works. Prestador: Maksim Valentinovich Galatin (CODE Eternal / aifa.works).",
          },
        ],
      },
      {
        title: "18. IDENTIDAD DEL CONTRATISTA, DATOS Y LENGUA DEL CONTRATO",
        icon: Info,
        subsections: [
          {
            subtitle: "18.1 Quién presta los servicios",
            text: "Los Servicios los presta una PERSONA FÍSICA, no una sociedad. Los datos completos del Contratista — nombre, condición jurídica, país de residencia, dirección para correspondencia legal y contactos electrónicos — figuran en el bloque de datos de esta página y en el pie de cada sitio del ecosistema CODE. Esta información se publica porque la exige a todo comerciante, entre otras normas, el art. 5 de la Directiva 2000/31/CE sobre comercio electrónico, el art. 6(1)(b)-(c) de la Directiva 2011/83/UE sobre derechos de los consumidores, las Consumer Contracts Regulations 2013 del Reino Unido, la Australian Consumer Law y reglas equivalentes de otros países.",
          },
          {
            subtitle: "18.2 Lengua del contrato",
            text: "Este Contrato se publica en inglés, ruso, español y chino. El Cliente puede celebrarlo y comunicarse en cualquiera de ellos. En caso de discrepancia entre versiones prevalece el texto en INGLÉS, salvo cuando una norma imperativa del país del Cliente exija que, para los consumidores, prevalezca la versión en su lengua; en ese caso prevalecerá esa versión para dicho Cliente.",
          },
          {
            subtitle: "18.3 Conservación del contrato",
            text: "El Contratista conserva el Pliego de Trabajo, la versión aceptada de este Contrato y la correspondencia relacionada durante el encargo y por el plazo que exija la ley aplicable. A solicitud, el Cliente recibe copia del contrato celebrado en soporte duradero (archivo PDF por correo electrónico).",
          },
        ],
      },
      {
        title: "19. CONSUMIDORES: DERECHOS IMPERATIVOS Y DESISTIMIENTO",
        icon: Scale,
        subsections: [
          {
            subtitle: "19.1 A quién protege esta sección",
            text: "Esta sección se aplica cuando el Cliente es CONSUMIDOR, esto es, una persona física que actúa con un propósito ajeno, total o principalmente, a su actividad comercial, empresarial, oficio o profesión. En tal caso, ESTA SECCIÓN PREVALECE sobre las secciones 4.3, 9 y 14 en lo que se opongan.",
          },
          {
            subtitle: "19.2 Las normas imperativas no se desplazan",
            text: "Nada en este Contrato suprime ni limita los derechos que el consumidor tenga conforme a las normas imperativas del país de su residencia habitual (art. 6 del Reglamento (CE) 593/2008, Roma I). El consumidor puede demandar ante los tribunales de su propio país y sólo puede ser demandado allí (arts. 17-19 del Reglamento (UE) 1215/2012, Bruselas I bis). Las cláusulas de arbitraje y de renuncia a la acción colectiva de la sección 14 se aplican al consumidor sólo en la medida en que lo permita la ley de su país.",
          },
          {
            subtitle: "19.3 Derecho de desistimiento — 14 días",
            text: "El consumidor de la UE/EEE y del Reino Unido puede desistir de este Contrato en un plazo de 14 días naturales desde su celebración, SIN NECESIDAD DE JUSTIFICACIÓN y sin coste alguno distinto de los indicados en 19.4. Muchos otros países reconocen un plazo de reflexión comparable, que el Contratista respeta en los mismos términos. Para desistir basta una declaración inequívoca a contact@codeofdigitaleternity.com (por ejemplo: «Por la presente desisto del contrato de [fecha] relativo a [servicio]»). Basta con enviarla antes de que expire el plazo. El Contratista acusa recibo sin demora y reembolsa todos los pagos recibidos, por el mismo medio de pago, en un plazo de 14 días desde que fue informado.",
          },
          {
            subtitle: "19.4 Inicio de los trabajos antes de que expiren los 14 días",
            text: "Si el consumidor desea que el trabajo comience durante el plazo de desistimiento, debe SOLICITARLO EXPRESAMENTE y reconocer que: (a) una vez ejecutado POR COMPLETO el Servicio con ese consentimiento previo expreso, el derecho de desistimiento SE PIERDE (art. 16(a) de la Directiva 2011/83/UE; regla 36 de las Consumer Contracts Regulations 2013); y (b) si desiste con el trabajo parcialmente ejecutado, abonará un importe proporcional a lo prestado hasta ese momento en relación con el precio total. Sin esa solicitud y reconocimiento expresos, el trabajo no comienza hasta transcurridos los 14 días. Si no se informó al consumidor del derecho de desistimiento, el plazo se prorroga doce meses (art. 10 de la Directiva 2011/83/UE): por eso existe esta cláusula.",
          },
          {
            subtitle: "19.5 Conformidad del resultado",
            text: "El resultado debe corresponder a la descripción del Pliego de Trabajo y ser apto para el fin allí indicado. Cuando se suministran contenidos o servicios digitales a un consumidor, se aplican los remedios de conformidad de la Directiva (UE) 2019/770 — subsanación, reducción del precio o resolución; en el Reino Unido, los remedios equivalentes de la Consumer Rights Act 2015. Estos remedios son gratuitos y se añaden a cualquier garantía voluntaria.",
          },
          {
            subtitle: "19.6 Reclamaciones y resolución extrajudicial",
            text: "Las reclamaciones se dirigen a contact@codeofdigitaleternity.com y se responden en 14 días. Si la respuesta no satisface al consumidor, éste puede acudir al organismo de protección del consumidor o al sistema aprobado de resolución alternativa de litigios de su propio país; el Contratista participará de buena fe. Téngase en cuenta que la plataforma de resolución de litigios en línea (ODR) de la Comisión Europea CESÓ SU ACTIVIDAD el 20 de julio de 2025, por lo que no se incluye enlace a ella; los organismos nacionales siguen disponibles.",
          },
        ],
      },
      {
        title: "20. IMPUESTOS, SANCIONES, CONTROL DE EXPORTACIÓN Y LICITUD DE FONDOS",
        icon: Ban,
        subsections: [
          {
            subtitle: "20.1 Impuestos y lugar de prestación",
            text: "Salvo que el Pliego de Trabajo indique otra cosa, los Honorarios se expresan sin IVA, GST, impuesto sobre las ventas ni tributos equivalentes. Cuando tal impuesto sea exigible en una prestación a un consumidor, se aplicará al tipo del país del consumidor y se mostrará antes del pago. En prestaciones a una empresa establecida en la UE puede aplicarse la inversión del sujeto pasivo si el Cliente facilita un número de IVA válido; el Cliente responde de su exactitud. Cada parte asume sus propios impuestos sobre la renta. Los derechos de importación y las retenciones que imponga el país del Cliente se rigen por la cláusula 4.2.",
          },
          {
            subtitle: "20.2 Sanciones",
            text: "El Cliente declara y garantiza que ni él, ni sus titulares, ni la persona en cuyo beneficio se contratan los Servicios figuran en listas de sanciones de las Naciones Unidas, la Unión Europea, el Reino Unido, los Estados Unidos (incluida la lista SDN de la OFAC) u otra autoridad aplicable, y que no se encuentra en un territorio sometido a sanciones integrales ni actúa por cuenta de quien allí se encuentre. El Contratista puede rechazar, suspender o resolver el encargo sin responsabilidad cuando su ejecución infringiera tales medidas o creara un riesgo material de infringirlas. Se devuelven los importes pagados por trabajo no ejecutado por este motivo.",
          },
          {
            subtitle: "20.3 Control de exportación y uso final prohibido",
            text: "Los resultados y la información técnica entregada pueden estar sujetos a normas de control de exportación. El Cliente no usará, reexportará ni pondrá a disposición ningún resultado en relación con armas de destrucción masiva, uso militar final en un destino sometido a embargo, vigilancia ilícita de personas u otro uso final prohibido, ni los transferirá a persona alguna cuando ello infringiera dichas normas.",
          },
          {
            subtitle: "20.4 Licitud del origen de los fondos",
            text: "Los pagos deben proceder de una fuente lícita y de una cuenta, tarjeta o monedero pertenecientes al Cliente. En pagos elevados y en liquidaciones con criptoactivos, el Contratista puede solicitar, antes de iniciar o continuar el trabajo, una verificación razonable de identidad y del origen de los fondos, y rechazar un pago que no pueda verificarse. Ello refleja las obligaciones impuestas a los proveedores de servicios de pago por las normas de prevención del blanqueo de capitales.",
          },
        ],
      },
    ],
    bannerTag: "PROTEGIDO POR EL ESCUDO LEGAL DE CODE ETERNAL",
    bannerNote: "Al encargar o pagar cualquier servicio, usted acepta íntegramente este Contrato.",
  };

  // ─── CHINESE ─────────────────────────────────────────────────────────────────
  const zh = {
    title: "服务提供公开要约",
    subtitle: "服务框架合同与工作说明书（Statement of Work）机制：网站开发、违规整改、AI 集成与设计",
    lastUpdated: "生效日期：2026 年 7 月 19 日 · 版本 1.0",
    backBtn: "返回首页",
    acceptTitle: "本合同如何订立",
    acceptDesc: "本文件是承包方向任何法人或自然人（「客户」）发出的公开要约（「本合同」）。无需签字。在客户实施下列任一确定性行为中最早发生者时，本合同即告成立，其条款即产生完全约束力：",
    acceptSteps: [
      "客户通过电子邮件、聊天、表单或即时通讯请求、订购或确认任何服务；",
      "客户批准某一具体项目的工作说明书/需求简报；",
      "客户就服务支付任何款项（包括定金或预付款）；",
      "客户提供访问权限、凭据、材料或内容以便承包方开始工作。",
      "实施上述任一行为即表示客户已阅读、理解并无条件接受以下全部条款。",
    ],
    sections: [
      {
        title: "1. 一般规定与当事方",
        icon: BookOpen,
        subsections: [
          {
            subtitle: "1.1 承包方",
            text: "本合同项下的服务由 Maksim Valentinovich Galatin（马克西姆·瓦连京诺维奇·加拉京）以独立自雇个人身份（「承包方」）提供，联系方式：contact@codeofdigitaleternity.com、support@aifa.works 与 sales@aifa.works。承包方运营 CODE Eternal 生态系统，包括 aifa.works。于生效日，承包方以自然人身份行事；承包方保留将本合同及任何工作说明书转让给其未来设立的法人实体的权利（见第 15 条）。",
          },
          {
            subtitle: "1.2 要约性质",
            text: "本合同是具有法律约束力的公开要约，据此承包方承诺提供、客户承诺接受并支付专业的技术与创意服务。本合同并非雇佣合同、合伙、合营、特许经营或代理关系，亦不产生任何信义义务。每一委托均以工作说明书记录，并以援引方式纳入本合同；如有冲突，就该具体项目以工作说明书为准，其余事项以本合同为准。",
          },
          {
            subtitle: "1.3 定义",
            text: "「服务」——第 2 条所述并在工作说明书中细化的工作。\n「交付物」——交付给客户的服务成果（代码、网站、修复、集成、设计、文件）。\n「工作说明书」（Statement of Work，简称 SOW）——界定具体项目范围、时间与价格的书面简报（邮件、文档或表单）。\n「费用」——就服务应付的金额。\n「Oracle 神谕」——承包方运营的网站合规自动扫描器。",
          },
        ],
      },
      {
        title: "2. 服务标的与范围",
        icon: Briefcase,
        subsections: [
          {
            subtitle: "2.1 服务类别",
            text: "承包方全部或部分提供以下服务：\n\n• 网站创建与开发（落地页、企业网站、Web 应用）；\n• 整改由 AIfaFocus 扫描识别的违规与缺陷（无障碍/ADA/WCAG、隐私/CCPA、追踪/HIPAA、邮件/DMARC 及类似技术风险）；\n• 将 AI 智能体与助手（AIfa 及第三方模型）集成到客户的产品与流程中；\n• 网页设计、UX/UI、品牌及相关创意服务。\n\n任何项目的确切范围仅由相应工作说明书确定。工作说明书未明确列出的一切均不在范围之内。",
          },
          {
            subtitle: "2.2 整改服务的性质与界限",
            text: "合规整改服务是旨在降低可识别技术风险的技术服务。它并非法律咨询、法律代理、法律审计，也不是对任何法律、标准或法规（包括 ADA、WCAG、CCPA/CPRA、HIPAA、GDPR、TCPA 等）合规性的认证。AIfaFocus 扫描及任何报告均为信息性的自动启发式分析。承包方并非律师事务所、持牌审计机构或监管机关。客户对其法律合规承担唯一责任，并应咨询合格的专业人士。",
          },
          {
            subtitle: "2.3 深度技术评估授权",
            text: "深度技术评估（抓取内部页面、识别软件版本、检查暴露的服务文件、分析表单）仅在本要约被接受之后进行，且仅针对工作说明书中指明的域名。客户接受本要约即确认其对该域名拥有处置权限并授权此类评估。承包方不会执行：密码或凭据猜测；负载或稳定性测试；向表单提交恶意数据；绕过防护措施的尝试；下载任何暴露服务文件的内容——仅记录其存在。免费检查仅限公开信息，无需授权。",
          },
        ],
      },
      {
        title: "3. 履行方式与变更",
        icon: ClipboardList,
        subsections: [
          {
            subtitle: "3.1 工作说明书",
            text: "每个项目均以双方商定的工作说明书开始，其中载明范围、交付物、时间、里程碑与费用。时间为善意估计而非保证，取决于客户的及时配合。承包方可自行决定聘用分包商或工具，但仍对交付物负责。",
          },
          {
            subtitle: "3.2 变更与额外工作",
            text: "任何超出既定工作说明书的请求（范围扩张、新增功能、额外修改轮次、重新设计、新增页面）均构成额外工作，须另行报价并收费。承包方有权因客户提出的变更或客户提供的不准确/不完整信息，合理调整时间与费用。",
          },
        ],
      },
      {
        title: "4. 费用、付款、税费与退款",
        icon: CreditCard,
        subsections: [
          {
            subtitle: "4.1 费用与付款安排",
            text: "费用载于工作说明书。除非另有约定，工作在收到预付款（定金，通常为 50%）后开始，余款于交付时或按约定里程碑支付。在全额付款前，承包方可暂不交付、转移文件或部署。对成果（账户、源文件、生产部署）的访问以全额付款为前提。",
          },
          {
            subtitle: "4.2 税费、手续费与币种",
            text: "所有费用均为净额。客户承担与付款相关的一切税项、关税、银行费用、货币兑换成本、支付处理费及区块链/网络费用。如客户所在法域要求代扣税款，客户应补足付款，使承包方收到完整净额。",
          },
          {
            subtitle: "4.3 不可退款金额与拒付",
            text: "定金及已完成工作的款项不予退还，因其补偿已预留的时间与已付出的努力。鉴于本服务是专为客户创建的定制数字工作，一旦经客户同意开始履行，法定撤回权/冷静期（若原本适用）在法律允许范围内即视为放弃。就已提供的服务发起拒付或付款争议构成重大违约；承包方可暂停全部工作、撤销对交付物的许可，并追偿应付款项及费用。",
          },
          {
            subtitle: "4.4 逾期与暂停",
            text: "逾期金额可按每月 1.5% 与法律允许上限中的较低者计息。存在逾期期间，承包方可暂停服务、部署与支持，且不对由此产生的延误负责。",
          },
        ],
      },
      {
        title: "5. 客户义务与保证",
        icon: Users,
        subsections: [
          {
            subtitle: "5.1 配合与材料",
            text: "客户应及时且准确地提供合理所需的一切访问权限、凭据、域名、托管、账户、内容、文本、图像、品牌素材与信息。客户负责在服务之前、期间与之后独立备份其数据与系统。",
          },
          {
            subtitle: "5.2 内容合法性与授权",
            text: "客户保证其有权且有授权聘用承包方并授予对相关系统的访问权限；其提供的所有材料合法且不侵犯第三方权利；其对交付物的使用将符合适用法律。客户对其内容、业务与数据的合法性承担唯一责任。",
          },
        ],
      },
      {
        title: "6. 知识产权",
        icon: FileText,
        subsections: [
          {
            subtitle: "6.1 全额付款后转让",
            text: "在收到某一工作说明书的全部费用后，承包方在法律可转让范围内将为该项目创建的特定工作成果转让给客户。在全额付款前，一切权利归承包方所有，对交付物的任何使用许可均被暂停。",
          },
          {
            subtitle: "6.2 承包方既有及可复用知识产权",
            text: "承包方保留其对用于制作交付物的既有材料、专有技术、方法、框架、库、工具及通用组件的一切权利，并授予客户非独占、永久的许可，仅可在交付物内嵌使用。第三方素材（字体、素材媒体、插件、API）依第三方条款并由客户承担费用向客户授权。",
          },
          {
            subtitle: "6.3 作品集权利",
            text: "除非工作说明书另有明确书面约定，承包方可在其作品集、案例研究与营销中展示非保密交付物并提及该委托。承包方亦可发布匿名化的整改前后审计结果——数值评分与已整改项清单，不含域名、名称或任何可识别客户的其他信息——除非工作说明书另有书面明确约定。",
          },
          {
            subtitle: "6.4 生态系统品牌与知识产权——独家所有权",
            text: "CODE Eternal 生态系统的全部知识产权、商标、商号、标识、域名、源代码、内容与品牌——包括网站 codeofdigitaleternity.com、aifa.works、aifa.digital 与 radiocode.space，名称「CODE」「CODE Eternal」与「AIfa」以及 $GALATIN 代币——均是并始终是 Maksim Valentinovich Galatin（马克西姆·瓦连京诺维奇·加拉京）的唯一且专有财产。本合同、任何工作说明书或服务的提供，均不向客户转让、许可或授予对生态系统品牌、商标或知识产权的任何权利、所有权或权益，第 6.1 条项下已付款并明确转让的特定交付物除外。客户不得使用、注册、模仿或质疑上述任何内容。",
          },
        ],
      },
      {
        title: "7. 交付与验收",
        icon: Scale,
        subsections: [
          {
            subtitle: "7.1 验收程序",
            text: "交付后，客户有五（5）个工作日审阅交付物并就与工作说明书的任何重大不符提出书面通知。若在该期限内未提出此类通知，或对交付物进行任何生产性使用，交付物即视为已验收。不实质妨碍使用的轻微偏差不构成拒收理由。",
          },
          {
            subtitle: "7.2 修改",
            text: "工作说明书可包含在既定范围内的若干修改轮次。超出该次数或范围之外的修改，属于第 3.2 条项下的额外工作。",
          },
          {
            subtitle: "7.3 客户配合与时限",
            text: "任何已公布的时限（包括 48 小时整改窗口）自客户提供开工所需的全部条件之日起计算：书面确认的工作范围、网站管理后台的有效访问权限、DNS 管理的有效访问权限（若范围包含 DNS 变更），以及能在一个工作日内答复的技术联系人。等待客户答复或权限的时间不计入时限。整改窗口是在该期限内完成既定工作的承诺；它并不表示此后网站将符合任何法律、标准或法规（见第 3.3 条）。",
          },
          {
            subtitle: "7.4 不可抗力",
            text: "任何一方均不对因其合理控制之外的情形导致的延误或不履行承担责任，包括：主机、内容分发网络、注册商、DNS 服务商或客户第三方服务的故障或性能下降；工作期间客户或其其他承包商对网站所做的更改；不支持所需变更的封闭或定制平台；外部供应商的故障或延迟；网络中断；政府行为；自然事件。受影响方应立即通知对方，并在可能时尽快恢复履行。若该情形导致无法履行超过十四（14）日，任何一方均可终止受影响的工作说明书，承包方退还未执行部分的费用。",
          },
          {
            subtitle: "7.5 范围界限",
            text: "除非工作说明书另有明确约定，整改范围包括：一个域名及其主子域名；至多二十（20）个独立页面；一个受支持且为当前版本的标准平台或内容管理系统。超出此范围的网站、封闭或定制平台、含自动生成商品页的店铺、超过一种语言的本地化副本以及独立子域名，均按第 3.2 条另行报价与计费。若实际范围超出约定，承包方将在开工前通知客户。",
          },
        ],
      },
      {
        title: "8. 免责与无保证",
        icon: ShieldAlert,
        subsections: [
          {
            subtitle: "8.1 「按现状」提供",
            text: "在法律允许的最大范围内，服务与交付物按「现状」及「可用状态」提供，不作任何明示或默示的保证，包括适销性、特定用途适用性、不侵权、正常运行时间或无差错运行。",
          },
          {
            subtitle: "8.2 不保证结果",
            text: "承包方不保证任何特定的商业、法律、监管、排名、流量、转化、收入或性能结果。整改可降低但不能消除法律或技术风险，亦不保证免于索赔、罚款或诉讼。搜索引擎排名、第三方平台行为及 AI 模型输出均非承包方所能控制。",
          },
          {
            subtitle: "8.3 第三方评估",
            text: "承包方不声明也不保证任何监管机构、法院、保险人、支付服务商、审计方或其他第三方会与承包方作出相同的评估。承包方的报告与评分仅反映执行之日的技术检查结果，不构成法律意见、合规证书，也不构成对任何一方有利的证据。",
          },
          {
            subtitle: "8.4 已证实的发现与待核实的观察",
            text: "报告将发现分为「已证实」与「待核实」两类。当某项发现基于可观察的事实——客户自身服务器的响应、页面内容或域名系统记录——且客户可自行复核时，即视为已证实。由语言模型或启发式方法得出的观察结果标记为待核实。依据工作说明书，承包方负责整改已证实的发现；针对待核实观察的工作另行约定并计费。",
          },
        ],
      },
      {
        title: "9. 责任限制",
        icon: AlertTriangle,
        subsections: [
          {
            subtitle: "9.1 责任上限",
            text: "在法律允许的最大范围内，承包方因某一工作说明书或服务引起或与之相关的累计总责任，不超过客户在引发索赔事件之前三（3）个月内就该工作说明书实际支付的费用总额。",
          },
          {
            subtitle: "9.2 排除间接损害",
            text: "在任何情况下，承包方均不对任何间接、附带、特殊、后果性、惩戒性或惩罚性损害，或利润、收入、数据、商誉或商业机会的损失负责，即使已被告知此类可能性。若某法域不允许某些排除，则责任限于法律允许的最低金额。",
          },
          {
            subtitle: "9.3 索赔时效",
            text: "与服务有关的任何索赔，须在交付物接收或服务提供后14（十四）个日历日内提出，逾期则在法律允许范围内永久放弃。",
          },
        ],
      },
      {
        title: "10. 赔偿",
        icon: Shield,
        subsections: [
          {
            subtitle: "10.1 客户赔偿",
            text: "客户应就下列事项引起的任何索赔、损失、责任、罚款或费用（包括合理的法律费用），为承包方及其关联方、贡献者与供应商进行抗辩、赔偿并使其免受损害：客户的内容、业务或数据；客户对交付物的使用；客户违反本合同或法律；以及与上述相关的任何第三方索赔。",
          },
        ],
      },
      {
        title: "11. 保密",
        icon: Lock,
        subsections: [
          {
            subtitle: "11.1 相互保密",
            text: "各方应对另一方披露的非公开信息保密，并仅为履行本合同而使用。对于公开的、独立开发的或合法获得的信息，或法律要求的披露，则不适用。义务在本合同终止后存续一（1）年。",
          },
        ],
      },
      {
        title: "12. 期限、暂停与终止",
        icon: Ban,
        subsections: [
          {
            subtitle: "12.1 期限与终止",
            text: "本合同自接受之时起适用，并在任何工作说明书有效期间持续。任一方可在书面通知后十（10）日内未获纠正的重大违约时终止某一工作说明书。承包方可因不付款、非法使用或拒付而立即暂停或终止。",
          },
          {
            subtitle: "12.2 终止的效果",
            text: "终止时，客户应支付截至终止日已提供的全部服务及已发生的费用。有关付款、知识产权、免责、责任、赔偿、保密与争议解决的条款在终止后继续有效。",
          },
        ],
      },
      {
        title: "13. 不可抗力",
        icon: Globe,
        subsections: [
          {
            subtitle: "13.1 免于履行",
            text: "对于因承包方合理控制之外的事件造成的延误或不履行，承包方不承担责任，包括天灾、战争、内乱、疫情、政府行为、互联网或托管中断、第三方平台、区块链或支付网络故障、断电或断网。",
          },
        ],
      },
      {
        title: "14. 适用法律、仲裁地与争议解决",
        icon: Gavel,
        subsections: [
          {
            subtitle: "14.1 善意解决",
            text: "双方应先在收到通知后三十（30）日内以书面协商方式友好解决争议。除紧急救济外，此步骤为提起仲裁的前置条件。",
          },
          {
            subtitle: "14.2 适用法律",
            text: "本协议及其订立、解释以及由其产生的任何非合同义务，均适用承包人居住国厄瓜多尔共和国的法律，不适用其冲突法规则。《联合国国际货物销售合同公约》（CISG）不适用。",
          },
          {
            subtitle: "14.3 仲裁——仲裁地、机构与仲裁员",
            text: "未能友好解决的争议，应由基多商会仲裁与调解中心（Centro de Arbitraje y Mediación de la Cámara de Comercio de Quito）依其现行规则管理，由独任仲裁员依法（en derecho）作出终局裁决。仲裁地为厄瓜多尔基多。厄瓜多尔是 1958 年《纽约公约》缔约国，裁决可在 170 多个国家执行。",
          },
          {
            subtitle: "14.4 任何一方均不得被要求出行",
            text: "程序以书面及视频会议方式进行。任何一方均不得被要求亲自出席任何庭审，亦不承担对方的差旅费用。第 14.3 条所指的仲裁地是法律概念而非地理义务：庭审与合议可在任何地点或远程进行，不因此改变仲裁地。",
          },
          {
            subtitle: "14.5 语言与文件",
            text: "仲裁语言为西班牙语；经双方同意亦可为英语。英文文件无需翻译即可采信；需要翻译的一方自行承担费用。",
          },
          {
            subtitle: "14.6 争议金额低于 50,000 美元的快速程序",
            text: "争议总金额低于 50,000 美元的，依适用规则的快速程序仅以书面文件审理，除仲裁员认为确有必要外不开庭。",
          },
          {
            subtitle: "14.7 费用",
            text: "仲裁费用，包括管理费、仲裁员报酬以及胜诉方合理的律师代理费用，由败诉方承担，但仲裁员有正当理由另行决定的除外。",
          },
          {
            subtitle: "14.8 承包人就未付费用的选择权",
            text: "就请求支付到期费用的主张，承包人可自行选择不提起仲裁，而向客户住所地或客户财产所在地的有管辖权法院提起诉讼，客户接受该管辖。该选择权仅属于承包人。若某一法域的适用法律不承认单方选择条款，则仅本第 14.8 条受影响，第 14 条其余部分继续有效。",
          },
          {
            subtitle: "14.9 区块链是证据，而非争议解决场所",
            text: "锚定于公共区块链的记录（包括 Arweave 交易及其时间戳）可作为内容与时间的真实证据被采信。任何链上或「去中心化」仲裁协议均不被约定为争议解决场所：其裁决不受《纽约公约》保护，无法对财产强制执行。去中心化决定记录如何保存，而非金钱争议在何处裁决。",
          },
          {
            subtitle: "14.10 放弃集体诉讼与陪审团审判",
            text: "在法律允许的最大范围内，所有争议仅以个别方式处理，不作为集体、共同或代表人诉讼。各方放弃陪审团审判权及合并请求的权利。",
          },
          {
            subtitle: "14.11 消费者",
            text: "客户为消费者时，第 19 条优先于本条：仲裁及上述放弃仅在其惯常居所地国强制性法律允许的范围内适用，消费者保留向该国法院起诉的权利。",
          },
        ],
      },
      {
        title: "15. 独立地位与未来转让",
        icon: Handshake,
        subsections: [
          {
            subtitle: "15.1 地位",
            text: "承包方是独立的自雇个人，而非客户的雇员、合伙人或代理人。任何内容均不构成合营或信义关系。承包方自行控制提供服务的方式与手段。",
          },
          {
            subtitle: "15.2 向未来实体转让",
            text: "承包方可在通知客户后、无需客户另行同意，将本合同及任何工作说明书全部或部分转让、更新或移转给其未来设立或控制的法人实体（例如 CODE Eternal 生态系统内的公司）。未经承包方事先书面同意，客户不得转让本合同。",
          },
        ],
      },
      {
        title: "16. 其他条款",
        icon: Info,
        subsections: [
          {
            subtitle: "16.1 完整协议；可分割性；修改",
            text: "本合同连同适用的工作说明书构成双方之间的完整协议，并取代先前的讨论。若任何条款被认定无效，其余条款仍然有效，无效条款由最接近原意的有效条款替代。承包方可更新本要约；对具体委托适用接受时有效的版本。",
          },
          {
            subtitle: "16.2 通知；电子接受；语言",
            text: "通知可通过电子邮件发送至第 1.1 条的地址及客户的联系地址。双方同意，电子通讯与确定性行为构成有效的接受与签署。本合同以多种语言提供以便利参考；如有歧义，以英文版本为准。",
          },
        ],
      },
      {
        title: "17. 联系方式",
        icon: HelpCircle,
        subsections: [
          {
            subtitle: "17.1 如何联系承包方",
            text: "关于订单、工作说明书、发票或本合同的问题：contact@codeofdigitaleternity.com、support@aifa.works 与 sales@aifa.works。承包方：Maksim Valentinovich Galatin（CODE Eternal / aifa.works）。",
          },
        ],
      },
      {
        title: "18. 承包人身份、登记信息与合同语言",
        icon: Info,
        subsections: [
          {
            subtitle: "18.1 由谁提供服务",
            text: "本服务由自然人提供，而非公司。承包人的完整信息——姓名、法律身份、居住国家、法律信函地址及电子联系方式——载于本页的登记信息栏以及 CODE 生态各站点的页脚。公布这些信息，是因为多项法律对任何经营者都有此要求，包括：欧盟《电子商务指令》2000/31/EC 第 5 条、《消费者权利指令》2011/83/EU 第 6(1)(b)-(c) 条、英国《消费者合同条例 2013》、澳大利亚《消费者法》以及其他国家的同类规定。",
          },
          {
            subtitle: "18.2 合同语言",
            text: "本协议以英文、俄文、西班牙文和中文发布。客户可使用其中任一语言订立合同并进行往来。各版本之间如有不一致，以英文文本为准；但如客户所在国的强制性法律要求对消费者以其本国语言版本为准，则对该客户以该版本为准。",
          },
          {
            subtitle: "18.3 合同的留存",
            text: "承包人在服务期内并按适用法律要求的期限，保存工作说明书、已接受的本协议版本及相关往来记录。经客户请求，客户可获得已订立合同的持久性载体副本（以电子邮件发送 PDF 文件）。",
          },
        ],
      },
      {
        title: "19. 消费者：强制性权利与撤回权",
        icon: Scale,
        subsections: [
          {
            subtitle: "19.1 本节保护的对象",
            text: "当客户为消费者——即完全或主要在其贸易、经营、手工业或职业活动之外行事的自然人——时，适用本节。在此情形下，本节在冲突范围内优先于第 4.3 条、第 9 条和第 14 条。",
          },
          {
            subtitle: "19.2 强制性法律不被排除",
            text: "本协议中的任何内容均不排除或限制消费者依其惯常居所地国强制性法律所享有的权利（（欧共体）第 593/2008 号条例《罗马条例 I》第 6 条）。消费者可在其本国法院提起诉讼，且仅可在该地被诉（（欧盟）第 1215/2012 号条例《布鲁塞尔条例 I bis》第 17-19 条）。第 14 条关于仲裁及放弃集体诉讼的约定，仅在消费者所在国法律允许的范围内对消费者适用。",
          },
          {
            subtitle: "19.3 撤回权——14 天",
            text: "欧盟／欧洲经济区及英国的消费者，可自合同订立之日起 14 个自然日内撤回本协议，无须说明理由，除 19.4 条所述外不承担任何费用。许多其他司法辖区规定了可比的冷静期，承包人以相同条件予以遵守。撤回只需向 contact@codeofdigitaleternity.com 发出明确声明（例如：「本人特此撤回于［日期］就［服务］订立的合同」）。在期限届满前发出即可。承包人将立即确认收到，并自获知之日起 14 日内以原支付方式退还全部已收款项。",
          },
          {
            subtitle: "19.4 在 14 天期限届满前开始工作",
            text: "消费者如希望在撤回期内开始工作，必须明确提出请求并确认：(a) 在此事先明确同意下服务被完全履行后，撤回权即告丧失（指令 2011/83/EU 第 16(a) 条；英国《消费者合同条例 2013》第 36 条）；(b) 若在工作部分完成时撤回，消费者应按截至该时点已提供部分相对于总价的比例支付款项。没有上述明确请求与确认，工作在 14 天期限届满前不会开始。如果从未告知消费者撤回权，该权利期限将延长十二个月（指令 2011/83/EU 第 10 条）——本条款正是为此而设。",
          },
          {
            subtitle: "19.5 成果的符合性",
            text: "成果应与工作说明书的描述相符，并适合其中载明的用途。向消费者提供数字内容或数字服务时，适用指令（欧盟）2019/770 的符合性救济——修复、减价或解除合同；在英国适用《2015 年消费者权利法》的同等救济。上述救济免费提供，并且是任何自愿保证之外的补充。",
          },
          {
            subtitle: "19.6 投诉与庭外争议解决",
            text: "投诉发送至 contact@codeofdigitaleternity.com，并在 14 日内答复。若答复未使消费者满意，消费者可向其本国的消费者保护机构或经认可的替代性争议解决机制提出；承包人将本着诚信参与。请注意：欧盟委员会的在线争议解决（ODR）平台已于 2025 年 7 月 20 日停止运作，故此处不提供其链接；各国消费者保护机构仍可受理。",
          },
        ],
      },
      {
        title: "20. 税费、制裁、出口管制与资金合法性",
        icon: Ban,
        subsections: [
          {
            subtitle: "20.1 税费与服务发生地",
            text: "除工作说明书另有约定外，费用不含增值税、商品及服务税、销售税及同类流转税。向消费者提供服务而应缴纳此类税费的，按消费者所在国税率计收，并在付款前显示。向设立于欧盟的企业提供服务时，如客户提供有效的增值税识别号，可适用反向征收机制；号码的准确性由客户负责。各方各自承担其所得税。客户所在国征收的进口关税与预提税适用第 4.2 条。",
          },
          {
            subtitle: "20.2 制裁",
            text: "客户声明并保证：其本身、其所有者以及服务受益人，均未被列入联合国、欧盟、英国、美国（包括 OFAC 的 SDN 名单）或其他适用机关的制裁名单；其不位于受全面制裁的地区，亦非代表位于该地区的人行事。若履行将违反上述措施或产生重大违反风险，承包人可拒绝、暂停或终止相关委托而不承担责任。因此原因未履行部分所收取的款项予以退还。",
          },
          {
            subtitle: "20.3 出口管制与禁止的最终用途",
            text: "成果及所提供的技术资料可能受出口管制规则约束。客户不得将任何成果用于、再出口或提供给与大规模杀伤性武器、受禁运目的地的军事最终用途、对个人的非法监控或其他被禁止的最终用途相关的活动，亦不得在违反上述规则的情况下向任何人转移。",
          },
          {
            subtitle: "20.4 资金来源的合法性",
            text: "付款须来源合法，且来自属于客户本人的账户、银行卡或钱包。对于大额付款及以加密资产结算的付款，承包人可在开始或继续工作之前，要求对身份及资金来源进行合理核验，并可拒绝无法核验的付款。这与反洗钱规则对支付服务机构所施加的义务相一致。",
          },
        ],
      },
    ],
    bannerTag: "受 CODE ETERNAL 法律护盾保护",
    bannerNote: "订购或支付任何服务，即表示您完全接受本合同。",
  };

  const dict: Record<string, typeof en> = { en, ru, es, zh };
  const ui = dict[locale as string] || en;

  return (
    <div className="min-h-screen bg-white dark:bg-[#030711] text-gray-900 dark:text-white pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-cyan-600 dark:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {ui.backBtn}
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <Handshake className="w-8 h-8" />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight break-words">{ui.title}</h1>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">{ui.subtitle}</p>
            </div>
          </div>
          <p className="text-xs text-cyan-600 dark:text-cyan-400/80 font-mono mt-2">{ui.lastUpdated}</p>
        </div>

        {/* Acceptance highlight box */}
        <div className="rounded-3xl border border-cyan-500/30 bg-cyan-950/10 backdrop-blur-xl p-6 sm:p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none" />
          <h2 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-3 flex items-center gap-2">
            <Handshake className="w-5 h-5" />
            {ui.acceptTitle}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{ui.acceptDesc}</p>
          <div className="space-y-3">
            {ui.acceptSteps.map((stepText, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0 text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  {idx + 1}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-0.5">{stepText}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Sections */}
        <div className="space-y-8">
          {ui.sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-gray-200 dark:border-white/8 bg-white/[0.01] backdrop-blur-xl overflow-hidden"
              >
                <div className="flex items-center gap-4 p-6 pb-4 border-b border-gray-200 dark:border-white/5 bg-white/[0.015]">
                  <div className="p-2.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white">{sec.title}</h2>
                </div>
                <div className="p-6 space-y-6">
                  {sec.subsections.map((sub, subIdx) => (
                    <div key={subIdx} className={subIdx > 0 ? "pt-6 border-t border-gray-200 dark:border-white/5" : ""}>
                      <h3 className="text-sm font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-3">{sub.subtitle}</h3>
                      <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line font-[350]">
                        {sub.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Реквизиты Исполнителя — на них ссылается раздел 18.1.
            Источник один на все четыре сайта: lib/requisites.ts. Незаполненные
            поля не выводятся, поэтому блок никогда не показывает пустых строк. */}
        <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-cyan-950/5 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-cyan-600 dark:text-cyan-400 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            {ЗАГОЛОВОК_РЕКВИЗИТОВ[locale as Язык] ?? ЗАГОЛОВОК_РЕКВИЗИТОВ.en}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed break-words">
            {строкаРеквизитов((locale as Язык) ?? 'en')}
          </p>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/8 text-center space-y-3">
          <div className="inline-block px-6 py-2 rounded-full bg-cyan-500/5 border border-cyan-500/15">
            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono font-bold tracking-wider">{ui.bannerTag}</p>
          </div>
          <p className="text-xs text-gray-500 font-mono">{ui.bannerNote}</p>
        </div>

      </div>
    </div>
  );
}
