import { ComplianceCheck, LawMeta, Category } from './threatMatrix';

export const LAW_META_EN: Record<Category, LawMeta> = {
  "ADA / WCAG": {
    "lawName": "ADA Title III / European Accessibility Act (EAA) / Ontario AODA",
    "lawUrl": "https://www.ada.gov/resources/web-guidance/",
    "fineAmount": "$75,000–$150,000 (ADA) / €100,000 (EAA) / $100,000 per day (AODA)",
    "reportingConsequence": "DOJ civil enforcement / National market surveillance penalties / Ministry of Ontario audits"
  },
  "HIPAA / Medical": {
    "lawName": "HIPAA Privacy Rule / Washington My Health My Data Act (MHMDA)",
    "lawUrl": "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
    "fineAmount": "$50,000–$1,500,000 per year / $7,500 per MHMDA violation",
    "reportingConsequence": "HHS OCR civil investigation / Class-action lawsuits under MHMDA / DOJ prosecution"
  },
  "CCPA / CPRA": {
    "lawName": "California Consumer Privacy Act (CCPA/CPRA) / California Age-Appropriate Design Code (AB 2273)",
    "lawUrl": "https://oag.ca.gov/privacy/ccpa",
    "fineAmount": "$2,500–$7,500 per violation / $7,500 per child (AB 2273)",
    "reportingConsequence": "California Privacy Protection Agency (CPPA) audits / California AG civil enforcement"
  },
  "FTC Enforcement": {
    "lawName": "Federal Trade Commission Act — Section 5 (Deceptive Practices & Dark Patterns)",
    "lawUrl": "https://www.ftc.gov/legal-library/browse/statutes/federal-trade-commission-act",
    "fineAmount": "Up to $50,120 per violation (adjusted annually)",
    "reportingConsequence": "FTC enforcement orders / Consent decrees / Mandatory consumer refunds / Audits"
  },
  "TCPA / Telecom": {
    "lawName": "Telephone Consumer Protection Act (TCPA) / CAN-SPAM Act / FTSA",
    "lawUrl": "https://www.fcc.gov/general/telemarketing-and-robocalls",
    "fineAmount": "$500–$1,500 per call/text (TCPA) / $50,120 per CAN-SPAM email",
    "reportingConsequence": "FCC regulatory action / Class-action litigation / Permanent domain blacklisting by ISPs"
  },
  "GDPR": {
    "lawName": "EU GDPR / UK GDPR / ePrivacy Directive",
    "lawUrl": "https://gdpr-info.eu/",
    "fineAmount": "Up to €20,000,000 / £17.5M or 4% of global annual turnover",
    "reportingConsequence": "National DPA investigation (CNIL, ICO, etc.) / Processing bans / Mandatory breach reporting"
  },
  "PCI-DSS / Security": {
    "lawName": "PCI DSS v4.0 — PCI Security Standards Council Requirements",
    "lawUrl": "https://www.pcisecuritystandards.org/standards/pci-dss/",
    "fineAmount": "$5,000–$100,000 per month; merchant card processing suspension",
    "reportingConsequence": "Card network fines / Mandatory forensic audits / Credit card processing termination"
  },
  "State Privacy Laws": {
    "lawName": "US State Privacy Acts (VA VCDPA, TX TDPSA, CO CPA) / NY DFS / NY SHIELD",
    "lawUrl": "https://www.ncsl.org/technology-and-communication/state-laws-related-to-digital-privacy",
    "fineAmount": "$2,500–$7,500 per violation (States) / up to $250,000 (NY DFS)",
    "reportingConsequence": "State AG civil lawsuits / NY DFS financial enforcement / Class-action liability"
  },
  "Financial / Corporate": {
    "lawName": "EU DORA / Gramm-Leach-Bliley Act (GLBA) / Corporate Transparency Act (CTA)",
    "lawUrl": "https://www.ftc.gov/legal-library/browse/statutes/gramm-leach-bliley-act",
    "fineAmount": "$500/day late (FinCEN BOI) / up to $100,000 (GLBA) / 1% daily global turnover (DORA)",
    "reportingConsequence": "FinCEN/IRS criminal penalties / SEC enforcement / European ESAs regulatory audits"
  },
  "Digital Operations": {
    "lawName": "Canada PIPEDA & Law 25 / Brazil LGPD / Australia Privacy Act / Singapore PDPA / EU AI Act & DSA",
    "lawUrl": "https://laws-lois.justice.gc.ca/eng/acts/P-8.6/",
    "fineAmount": "$100,000 CAD (PIPEDA) / $25M CAD (Quebec) / 2% revenue (LGPD) / $50M AUD (APPs) / €35M or 7% revenue (AI Act)",
    "reportingConsequence": "OPC Canada investigations / ANPD Brazil audits / OAIC Australia lawsuits / EU AI Office enforcement"
  }
};

export const threatMatrixEn: ComplianceCheck[] = [
  {
    "id": 1,
    "code": "ADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing ALT Tags on Images",
    "description": "Images lack alternative text attributes, making visual content invisible to screen readers. This is the single most-filed ADA web accessibility complaint and the easiest to prove in court.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 1.1.1"
  },
  {
    "id": 2,
    "code": "ADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing ARIA Labels on Interactive Elements",
    "description": "Buttons, links, and interactive controls lack accessible names via aria-label or aria-labelledby. Screen reader users cannot determine the purpose of these elements, creating a barrier to use.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 4.1.2"
  },
  {
    "id": 3,
    "code": "ADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Insufficient Color Contrast Ratio",
    "description": "Text-to-background contrast falls below the 4.5:1 minimum ratio required for normal text. Low-vision users cannot read page content, and this is a measurable, automatable violation frequently cited in demand letters.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 1.4.3"
  },
  {
    "id": 4,
    "code": "ADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "No Skip Navigation Link",
    "description": "The page lacks a \"skip to main content\" link as the first focusable element. Keyboard and screen reader users must tab through the entire navigation on every page load, which is a documented accessibility barrier.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.4.1"
  },
  {
    "id": 5,
    "code": "ADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Keyboard-Inaccessible Interactive Elements",
    "description": "Interactive elements such as dropdown menus, modals, or custom controls cannot be operated via keyboard alone. Users who cannot use a mouse are completely blocked from key functionality.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.1.1"
  },
  {
    "id": 6,
    "code": "ADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Form Field Labels",
    "description": "Form inputs lack associated <label> elements or aria-label attributes. Screen reader users cannot identify what information is being requested, preventing form completion.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.3.1"
  },
  {
    "id": 7,
    "code": "ADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Broken Heading Hierarchy",
    "description": "The page is missing an H1 element or skips heading levels (e.g., H1 to H3). Screen readers rely on heading structure for page navigation; broken hierarchy makes content difficult to scan and understand.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 1.3.1"
  },
  {
    "id": 8,
    "code": "ADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing HTML Lang Attribute",
    "description": "The <html> element lacks a lang attribute specifying the page language. Screen readers cannot determine correct pronunciation rules, causing garbled speech output for all page content.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 3.1.1"
  },
  {
    "id": 9,
    "code": "ADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "ADA Overlay Widget Installed",
    "description": "A third-party accessibility overlay widget (e.g., AccessiBe, UserWay) is installed. These overlays are considered a \"red flag for troll lawyers,\" do not provide legal compliance, and have been explicitly rejected by disability advocacy organizations and courts.",
    "severity": "moderate",
    "reference": "ADA Title III; DOJ Web Guidance 2022"
  },
  {
    "id": 10,
    "code": "ADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible Careers/Job Application Portal",
    "description": "The careers page or job application portal is not accessible to users with disabilities. This creates liability under both ADA Title I (employment) and Title III (public accommodation) and is a frequent target of serial ADA plaintiffs.",
    "severity": "advisory",
    "reference": "ADA Title I § 12112; Title III § 12182"
  },
  {
    "id": 11,
    "code": "HIPAA-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Meta Pixel on Medical Booking Pages",
    "description": "The Facebook/Meta tracking pixel is firing on appointment scheduling or medical service pages, transmitting patient health condition data to Meta. HHS has issued explicit guidance that this constitutes impermissible PHI disclosure.",
    "severity": "critical",
    "reference": "45 CFR § 164.502; HHS Bulletin Dec 2022"
  },
  {
    "id": 12,
    "code": "HIPAA-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Google Analytics on Patient Portal Without BAA",
    "description": "Google Analytics is collecting data on patient portal pages without a signed Business Associate Agreement. Google does not sign BAAs for standard Analytics, making any patient portal tracking an automatic HIPAA violation.",
    "severity": "critical",
    "reference": "45 CFR § 164.502(e)"
  },
  {
    "id": 13,
    "code": "HIPAA-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Missing Good Faith Estimate Page",
    "description": "The website does not provide information about patients\\' right to receive a Good Faith Estimate of expected charges as required by the No Surprises Act. Self-pay and uninsured patients must be informed of this right before scheduling services.",
    "severity": "serious",
    "reference": "No Surprises Act § 112; 45 CFR § 149.610"
  },
  {
    "id": 14,
    "code": "HIPAA-004",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Social Media Pixels on Health Service Pages",
    "description": "TikTok, Snapchat, or other social media tracking pixels are active on pages describing specific health conditions or treatments. These pixels transmit URL paths that reveal the health conditions users are researching.",
    "severity": "critical",
    "reference": "45 CFR § 164.502; FTC Health Breach Notification Rule"
  },
  {
    "id": 15,
    "code": "HIPAA-005",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "No BAA with Form SaaS Provider",
    "description": "Patient intake or contact forms are processed through a third-party SaaS platform (e.g., Typeform, JotForm) without a signed Business Associate Agreement. All patient data submitted through these forms is an unsecured PHI disclosure.",
    "severity": "serious",
    "reference": "45 CFR § 164.502(e); § 164.504(e)"
  },
  {
    "id": 16,
    "code": "HIPAA-006",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Medical Chatbot Collecting Symptoms Without Consent",
    "description": "An AI-powered or scripted chatbot is collecting symptom information, health complaints, or medical history without presenting a HIPAA authorization or Notice of Privacy Practices. This creates an uncontrolled PHI collection point.",
    "severity": "serious",
    "reference": "45 CFR § 164.520; § 164.508"
  },
  {
    "id": 17,
    "code": "HIPAA-007",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unencrypted Patient Intake Forms",
    "description": "Patient intake forms are submitted over unencrypted HTTP connections or stored without encryption at rest. HIPAA requires technical safeguards including encryption for electronic PHI in transit and at rest.",
    "severity": "moderate",
    "reference": "45 CFR § 164.312(a)(2)(iv); § 164.312(e)(1)"
  },
  {
    "id": 18,
    "code": "HIPAA-008",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Missing Patient PHI Access Request Link",
    "description": "The website does not provide a mechanism for patients to request access to or download their protected health information. HIPAA grants patients the right to access their PHI, and the process must be clearly communicated.",
    "severity": "moderate",
    "reference": "45 CFR § 164.524"
  },
  {
    "id": 19,
    "code": "HIPAA-009",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Telehealth Across State Lines Without License Filter",
    "description": "Telehealth services are offered to patients in states where the provider is not licensed, without a geographic eligibility filter. Corporate Practice of Medicine (CPOM) laws and state licensure requirements may be violated.",
    "severity": "moderate",
    "reference": "State Medical Practice Acts; CPOM Statutes"
  },
  {
    "id": 20,
    "code": "HIPAA-010",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Health Tracking Without MHMDA Consent",
    "description": "A health or wellness website is tracking user behavior without consent as required by Washington\\'s My Health My Data Act (MHMDA). This law applies to any entity collecting health data from Washington residents, not just HIPAA-covered entities.",
    "severity": "advisory",
    "reference": "RCW 19.373 (Washington MHMDA)"
  },
  {
    "id": 21,
    "code": "CCPA-001",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing \"Do Not Sell or Share\" Footer Link",
    "description": "The website lacks a \"Do Not Sell or Share My Personal Information\" link in the footer. CCPA requires this link to be clear, conspicuous, and available on every page for California consumers.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.120(a)"
  },
  {
    "id": 22,
    "code": "CCPA-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Email Discount Popup Without Financial Incentive Notice",
    "description": "An email signup popup offers a discount (e.g., \"10% off for subscribing\") without a Financial Incentive notice. CCPA/CPRA requires businesses to disclose the material terms of any financial incentive program linked to data collection.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.125(b)"
  },
  {
    "id": 23,
    "code": "CCPA-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Third-Party Trackers Firing Before Cookie Consent",
    "description": "Analytics, advertising, and social media tracking scripts execute before the user has provided consent. Under CCPA/CPRA, third-party data sharing for cross-context behavioral advertising requires opt-out capability at minimum.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.120; 11 CCR § 7025"
  },
  {
    "id": 24,
    "code": "CCPA-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing or Inadequate Privacy Policy",
    "description": "The website lacks a comprehensive privacy policy or the existing policy fails to disclose required CCPA categories: types of personal information collected, purposes, third-party sharing, and consumer rights.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.130(a)(5)"
  },
  {
    "id": 25,
    "code": "CCPA-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Careers Page Missing Applicant Privacy Notice",
    "description": "The careers or job application page collects resumes and personal data without an Applicant Privacy Notice. CPRA extended privacy rights to job applicants and employees, requiring disclosure at the point of collection.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.100(b); CPRA Employee/Applicant Extension"
  },
  {
    "id": 26,
    "code": "CCPA-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "No Data Deletion Request Mechanism",
    "description": "The website provides no way for consumers to request deletion of their personal information. CCPA requires at least two methods for submitting consumer requests, including a toll-free number for larger businesses.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.105; § 1798.130"
  },
  {
    "id": 27,
    "code": "CCPA-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Third-Party Data Sharing Without Disclosure",
    "description": "Personal information is shared with third-party advertising, analytics, or data enrichment services without disclosure in the privacy policy. Each undisclosed sharing relationship is a separate violation.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.115"
  },
  {
    "id": 28,
    "code": "CCPA-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Cookie Consent Banner for California Users",
    "description": "No cookie consent mechanism is presented to California visitors. While CCPA does not mandate cookie banners specifically, the CPPA has signaled enforcement priority for sites that deploy tracking cookies without honoring opt-out signals.",
    "severity": "moderate",
    "reference": "11 CCR § 7025; Cal. Civ. Code § 1798.135(e)"
  },
  {
    "id": 29,
    "code": "CCPA-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Auto-Opt-In to Marketing Communications",
    "description": "Users are automatically opted into marketing emails or SMS during account creation or checkout without affirmative consent. Pre-checked marketing consent boxes violate both CCPA principles and CAN-SPAM requirements.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.120; 16 CFR § 316"
  },
  {
    "id": 30,
    "code": "CCPA-010",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Operating as Data Broker Without Registration",
    "description": "The business collects and sells personal information of consumers with whom it has no direct relationship, meeting the definition of a data broker, without registering with the state as required by Texas SB 2105 and California\\'s Delete Act.",
    "severity": "advisory",
    "reference": "TX Bus. & Com. Code § 509; Cal. Civ. Code § 1798.99.82"
  },
  {
    "id": 31,
    "code": "FTC-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fake Countdown Timer (Dark Pattern)",
    "description": "A \"limited time offer\" countdown timer resets when the page is reloaded, revealing it is fabricated urgency. The FTC classifies fake countdown timers as a deceptive dark pattern subject to enforcement under Section 5.",
    "severity": "critical",
    "reference": "FTC Act § 5; FTC Dark Patterns Report 2022"
  },
  {
    "id": 32,
    "code": "FTC-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Deceptive Crossed-Out \"Original\" Price",
    "description": "A crossed-out \"original\" price is displayed that was never the actual selling price, creating a phantom discount. The FTC\\'s Guides Against Deceptive Pricing prohibit fictitious former prices.",
    "severity": "critical",
    "reference": "16 CFR § 233; FTC Act § 5"
  },
  {
    "id": 33,
    "code": "FTC-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fake Social Proof Counter",
    "description": "A \"X people are viewing this right now\" or \"only Y left in stock\" counter displays fabricated or unverifiable numbers. The FTC considers manufactured social proof to be a deceptive trade practice.",
    "severity": "serious",
    "reference": "FTC Act § 5; FTC Endorsement Guides 16 CFR § 255"
  },
  {
    "id": 34,
    "code": "FTC-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Unverified Customer Reviews",
    "description": "Customer reviews are displayed without verification of purchase or authenticity. The FTC\\'s 2024 Rule on the Use of Consumer Reviews prohibits fake, purchased, or incentivized reviews without clear disclosure.",
    "severity": "critical",
    "reference": "16 CFR § 465 (FTC Review Rule 2024)"
  },
  {
    "id": 35,
    "code": "FTC-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Subscription Cancellation Harder Than Signup",
    "description": "Canceling a subscription requires more steps, phone calls, or obstacles than the original signup process. The FTC\\'s Click-to-Cancel Rule requires cancellation to be as easy as enrollment.",
    "severity": "serious",
    "reference": "16 CFR § 425 (FTC Click-to-Cancel Rule 2024)"
  },
  {
    "id": 36,
    "code": "FTC-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Missing Affiliate Disclosure",
    "description": "Affiliate links and ambassador commissions are not disclosed clearly and conspicuously above the first affiliate link on the page. The FTC requires material connection disclosure before the consumer encounters the endorsement.",
    "severity": "serious",
    "reference": "16 CFR § 255.5; FTC Endorsement Guides"
  },
  {
    "id": 37,
    "code": "FTC-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Testimonials",
    "description": "Customer or influencer testimonials are displayed without disclosing that the reviewer received compensation, free products, or other incentives. Each undisclosed paid endorsement can incur fines up to $50,000.",
    "severity": "moderate",
    "reference": "16 CFR § 255.1; FTC Endorsement Guides"
  },
  {
    "id": 38,
    "code": "FTC-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Unsubstantiated Environmental Claims",
    "description": "Marketing copy uses terms like \"eco-friendly,\" \"carbon neutral,\" or \"sustainable\" without third-party certification or substantiation. The FTC\\'s Green Guides require competent and reliable scientific evidence for environmental claims.",
    "severity": "moderate",
    "reference": "16 CFR § 260 (FTC Green Guides)"
  },
  {
    "id": 39,
    "code": "FTC-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Free Trial Auto-Converting Without Disclosure",
    "description": "A free trial automatically converts to a paid subscription without clear, conspicuous disclosure of the conversion terms, billing date, and amount before the consumer provides payment information.",
    "severity": "moderate",
    "reference": "FTC Act § 5; Restore Online Shoppers\\' Confidence Act (ROSCA)"
  },
  {
    "id": 40,
    "code": "FTC-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Bait-and-Switch Pricing",
    "description": "The price shown in advertising or search results differs from the price displayed at checkout due to added fees, different product versions, or changed terms. This constitutes classic bait-and-switch deception.",
    "severity": "advisory",
    "reference": "FTC Act § 5; 16 CFR § 238 (Bait Advertising)"
  },
  {
    "id": 41,
    "code": "TCPA-001",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Contact Form Missing SMS Consent Checkbox",
    "description": "The contact or lead generation form collects phone numbers without an explicit opt-in checkbox for SMS communications. A2P 10DLC carrier requirements and the TCPA mandate prior express written consent for marketing texts.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227(b); A2P 10DLC Guidelines"
  },
  {
    "id": 42,
    "code": "TCPA-002",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Marketing SMS Sent After 8 PM Local Time",
    "description": "Automated marketing text messages are sent outside permitted hours. Florida\\'s Telephone Solicitation Act (FTSA) restricts texts to 8 AM–8 PM local time, with other states imposing similar windows.",
    "severity": "critical",
    "reference": "FL Stat. § 501.059 (FTSA); 47 U.S.C. § 227"
  },
  {
    "id": 43,
    "code": "TCPA-003",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "No STOP Mechanism in Marketing SMS",
    "description": "Marketing text messages do not include opt-out instructions (e.g., \"Reply STOP to unsubscribe\"). CTIA guidelines and the TCPA require every marketing SMS to include a clear opt-out mechanism.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227; CTIA Short Code Monitoring Handbook"
  },
  {
    "id": 44,
    "code": "TCPA-004",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Marketing Emails Without Physical Address",
    "description": "Commercial email messages do not include the sender\\'s valid physical postal address. CAN-SPAM requires every commercial email to contain the sender\\'s current street address or registered P.O. box.",
    "severity": "serious",
    "reference": "15 U.S.C. § 7704(a)(5)(A); 16 CFR § 316.2"
  },
  {
    "id": 45,
    "code": "TCPA-005",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Marketing Emails Without Unsubscribe Link",
    "description": "Commercial emails lack a functioning unsubscribe mechanism. CAN-SPAM requires a clear, conspicuous opt-out method in every commercial message, and opt-out requests must be honored within 10 business days.",
    "severity": "serious",
    "reference": "15 U.S.C. § 7704(a)(3); 16 CFR § 316.5"
  },
  {
    "id": 46,
    "code": "TCPA-006",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Abandoned Cart SMS Without Prior Written Consent",
    "description": "Abandoned cart recovery text messages are sent to consumers who did not provide prior express written consent for marketing texts. Cart abandonment does not constitute consent under the TCPA.",
    "severity": "serious",
    "reference": "47 U.S.C. § 227(b)(1)(A)(iii)"
  },
  {
    "id": 47,
    "code": "TCPA-007",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Auto-Dialer Without Express TCPA Consent",
    "description": "An automatic telephone dialing system (ATDS) is used to place calls or send texts without obtaining prior express consent. The TCPA prohibits unsolicited autodialed or prerecorded calls to cell phones.",
    "severity": "moderate",
    "reference": "47 U.S.C. § 227(b)(1)(A)"
  },
  {
    "id": 48,
    "code": "TCPA-008",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Missing A2P 10DLC Campaign Registration",
    "description": "Business SMS messages are sent via long codes (10-digit numbers) without proper A2P 10DLC campaign registration with carriers. Unregistered campaigns face message filtering, blocking, and per-message carrier fines.",
    "severity": "moderate",
    "reference": "CTIA 10DLC Policy; Carrier A2P Guidelines"
  },
  {
    "id": 49,
    "code": "TCPA-009",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Bulk SMS Without STOP Keyword Handler",
    "description": "The bulk SMS system does not automatically process STOP keyword responses to immediately cease messaging. Failure to honor opt-out keywords exposes the business to TCPA class-action liability at $500–$1,500 per message.",
    "severity": "moderate",
    "reference": "47 U.S.C. § 227; CTIA Messaging Principles"
  },
  {
    "id": 50,
    "code": "TCPA-010",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Pre-Recorded Voice Messages Without Opt-In",
    "description": "Pre-recorded or artificial voice marketing messages are delivered to consumers without prior express written consent. The TCPA\\'s robocall provisions carry statutory damages of $500–$1,500 per call.",
    "severity": "advisory",
    "reference": "47 U.S.C. § 227(b)(1)(B)"
  },
  {
    "id": 51,
    "code": "GDPR-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Meta Pixel Fires Before Cookie Consent",
    "description": "The Facebook/Meta tracking pixel loads and transmits user data before the visitor has interacted with the cookie consent banner. Under GDPR, non-essential tracking requires prior, informed, and affirmative consent.",
    "severity": "critical",
    "reference": "GDPR Article 6(1)(a); ePrivacy Directive Article 5(3)"
  },
  {
    "id": 52,
    "code": "GDPR-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "No Cookie Consent Banner for EU Visitors",
    "description": "The website displays no cookie consent mechanism to visitors from EU member states. The ePrivacy Directive and GDPR require informed consent before placing non-essential cookies or tracking technologies.",
    "severity": "critical",
    "reference": "GDPR Article 7; ePrivacy Directive Article 5(3)"
  },
  {
    "id": 53,
    "code": "GDPR-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Google Analytics Without GDPR Consent",
    "description": "Google Analytics collects visitor data from EU users without obtaining prior consent. Multiple EU Data Protection Authorities have ruled that Google Analytics transfers constitute unlawful processing and cross-border data transfer.",
    "severity": "critical",
    "reference": "GDPR Article 44; Austrian DSB & French CNIL Rulings 2022"
  },
  {
    "id": 54,
    "code": "GDPR-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "No Data Processing Agreement with Processors",
    "description": "Third-party services processing personal data on behalf of the controller operate without a signed Data Processing Agreement. GDPR mandates written contracts specifying processing scope, purpose, and security obligations.",
    "severity": "serious",
    "reference": "GDPR Article 28(3)"
  },
  {
    "id": 55,
    "code": "GDPR-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "No 72-Hour Breach Notification Process",
    "description": "The organization has no documented procedure for notifying the supervisory authority within 72 hours of becoming aware of a personal data breach. Failure to notify is a separate, independently finable violation.",
    "severity": "serious",
    "reference": "GDPR Article 33"
  },
  {
    "id": 56,
    "code": "GDPR-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cross-Border Data Transfer Without Safeguards",
    "description": "Personal data of EU residents is transferred to US-based servers or services without Standard Contractual Clauses (SCCs), adequacy decisions, or other approved transfer mechanisms following the Schrems II ruling.",
    "severity": "serious",
    "reference": "GDPR Articles 44–49; Schrems II (C-311/18)"
  },
  {
    "id": 57,
    "code": "GDPR-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "YouTube Embed Leaking Video Viewing Data",
    "description": "Standard YouTube embeds combined with tracking pixels create a video viewing data leak similar to VPPA violations. YouTube\\'s standard embed shares viewing habits with Google before consent is obtained.",
    "severity": "moderate",
    "reference": "GDPR Article 6(1)(a); ePrivacy Directive Article 5(3)"
  },
  {
    "id": 58,
    "code": "GDPR-008",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "No \"Right to Be Forgotten\" Mechanism",
    "description": "The website provides no way for data subjects to request erasure of their personal data. GDPR\\'s Right to Erasure requires controllers to delete personal data upon request when no overriding legal basis exists.",
    "severity": "moderate",
    "reference": "GDPR Article 17"
  },
  {
    "id": 59,
    "code": "GDPR-009",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "No Data Retention Policy Published",
    "description": "The privacy policy does not specify how long personal data is retained or the criteria used to determine retention periods. GDPR requires transparent communication of retention periods at the point of collection.",
    "severity": "moderate",
    "reference": "GDPR Article 13(2)(a); Article 5(1)(e)"
  },
  {
    "id": 60,
    "code": "GDPR-010",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Consent Banner Uses Pre-Checked Boxes",
    "description": "The cookie consent banner presents pre-checked consent boxes for analytics or marketing cookies. The CJEU ruled in Planet49 that pre-ticked checkboxes do not constitute valid consent under GDPR.",
    "severity": "advisory",
    "reference": "GDPR Article 4(11); CJEU Planet49 (C-673/17)"
  },
  {
    "id": 61,
    "code": "PCI-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing Content-Security-Policy Header",
    "description": "The website does not set a Content-Security-Policy HTTP header, leaving it vulnerable to cross-site scripting (XSS) and data injection attacks. CSP is a critical defense layer for preventing unauthorized script execution.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; OWASP CSP Cheat Sheet"
  },
  {
    "id": 62,
    "code": "PCI-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "API Keys Exposed in Frontend Source",
    "description": "API keys for services like Google Maps, Stripe, or SendGrid are visible in client-side JavaScript source code. Exposed secret keys can be harvested by bots and used for unauthorized API access, billing fraud, or data exfiltration.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 2.2.7; OWASP API Security Top 10"
  },
  {
    "id": 63,
    "code": "PCI-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Payment Form Without Tokenization",
    "description": "Credit card numbers are collected directly into form fields on the merchant\\'s server rather than through a PCI-compliant tokenization service (e.g., Stripe Elements, Braintree). This places the entire site in PCI-DSS scope.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 3.4; Req. 4.2"
  },
  {
    "id": 64,
    "code": "PCI-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing HTTPS on Form or Payment Pages",
    "description": "Pages containing forms, login fields, or payment inputs are served over unencrypted HTTP. All data submitted on these pages can be intercepted in transit by any network intermediary.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 4.2.1"
  },
  {
    "id": 65,
    "code": "PCI-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Mixed Content on HTTPS Pages",
    "description": "The page is served over HTTPS but loads sub-resources (images, scripts, stylesheets) over insecure HTTP. Mixed content undermines the security guarantee of HTTPS and can be exploited for man-in-the-middle attacks.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 4.2.1; OWASP Transport Layer Security"
  },
  {
    "id": 66,
    "code": "PCI-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Open Directory Listing",
    "description": "Server directories such as /wp-content/uploads/ are browsable, exposing uploaded files, internal documents, and potentially sensitive data. Directory listing must be disabled on all web-accessible paths.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 2.2.7; CIS Apache Benchmark"
  },
  {
    "id": 67,
    "code": "PCI-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "XML-RPC Endpoint Enabled",
    "description": "The WordPress XML-RPC endpoint (xmlrpc.php) is publicly accessible and responding to requests. This endpoint is a known vector for brute-force amplification attacks and DDoS abuse.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.3.3; CVE-2015-5623"
  },
  {
    "id": 68,
    "code": "PCI-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Outdated CMS with Known CVEs",
    "description": "The content management system (WordPress, Magento, Drupal) is running an outdated version with publicly disclosed security vulnerabilities. Unpatched CMS installations are the primary vector for website compromises.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.3.1; Req. 6.3.3"
  },
  {
    "id": 69,
    "code": "PCI-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Third-Party Scripts Without SRI",
    "description": "External JavaScript files are loaded without Subresource Integrity (SRI) hashes. If a third-party CDN or script host is compromised, malicious code could be injected into the page without detection.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; W3C SRI Specification"
  },
  {
    "id": 70,
    "code": "PCI-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Forms Without CAPTCHA Protection",
    "description": "Contact forms, login pages, and registration forms lack CAPTCHA or bot-detection mechanisms. Unprotected forms are vulnerable to credential stuffing, spam injection, and automated abuse at scale.",
    "severity": "advisory",
    "reference": "PCI-DSS v4.0 Req. 6.2.4; OWASP Automated Threats"
  },
  {
    "id": 71,
    "code": "STATE-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CIPA: Chatbot Recording Without Consent",
    "description": "A third-party chatbot records and stores conversation transcripts without informing users and obtaining consent. Under California\\'s Invasion of Privacy Act (CIPA), this constitutes illegal wiretapping at $5,000 per dialog.",
    "severity": "critical",
    "reference": "Cal. Penal Code § 631; § 632.7 (CIPA)"
  },
  {
    "id": 72,
    "code": "STATE-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "BIPA: Virtual Try-On Without Biometric Consent",
    "description": "A virtual try-on or face-scanning feature collects biometric identifiers without obtaining informed written consent as required by Illinois BIPA. Violations carry statutory damages of $1,000–$5,000 per scan.",
    "severity": "critical",
    "reference": "740 ILCS 14/15 (Illinois BIPA)"
  },
  {
    "id": 73,
    "code": "STATE-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Utah AI Act: AI Chatbot Not Disclosing AI Identity",
    "description": "An AI-powered chatbot or virtual assistant fails to identify itself as artificial intelligence when directly asked by a user. Utah\\'s AI Policy Act requires AI systems to disclose their non-human nature upon inquiry.",
    "severity": "serious",
    "reference": "Utah Code § 13-72 (Utah AI Policy Act 2024)"
  },
  {
    "id": 74,
    "code": "STATE-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CA BOT Act: AI Using Human Name Without Disclosure",
    "description": "An AI chatbot or automated account uses a human name, avatar, or persona without disclosing that it is not a human. California\\'s BOT Act (SB 1001) requires clear disclosure when AI impersonates a human in online interactions.",
    "severity": "critical",
    "reference": "Cal. Bus. & Prof. Code § 17941 (SB 1001)"
  },
  {
    "id": 75,
    "code": "STATE-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Proposition 65: Missing Toxic Substance Warning",
    "description": "Products shipped to California contain chemicals listed under Proposition 65 without the required \"known to cause cancer or reproductive harm\" warning. Violations carry penalties of $2,500 per day per violation.",
    "severity": "serious",
    "reference": "Cal. Health & Safety Code § 25249.6 (Proposition 65)"
  },
  {
    "id": 76,
    "code": "STATE-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CA Auto-Renewal: No Reminder Before Annual Charge",
    "description": "Annual subscriptions renew without sending a reminder email before the charge. California\\'s Automatic Renewal Law requires businesses to provide a clear reminder with cancellation instructions before each renewal.",
    "severity": "serious",
    "reference": "Cal. Bus. & Prof. Code § 17601 (ARL)"
  },
  {
    "id": 77,
    "code": "STATE-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inadequate Age-Gate for Restricted Products",
    "description": "Age verification for alcohol, vape, or CBD products relies on a simple \"Yes I\\'m 21\" button without real identity verification. Multiple states require robust age verification beyond self-attestation for restricted product sales.",
    "severity": "moderate",
    "reference": "State Alcohol Control Acts; 27 CFR § 6"
  },
  {
    "id": 78,
    "code": "STATE-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "SB 478: Hidden Service Fees at Checkout",
    "description": "Mandatory fees, service charges, or surcharges are revealed only at checkout rather than being included in the advertised price. California\\'s SB 478 (Junk Fee Ban) prohibits hidden fees not disclosed upfront.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1770(a)(29) (SB 478)"
  },
  {
    "id": 79,
    "code": "STATE-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "NY SHIELD Act: Inadequate Data Security",
    "description": "The business collects private information of New York residents without implementing reasonable data security safeguards as required by the SHIELD Act. Administrative, technical, and physical safeguards must be documented.",
    "severity": "moderate",
    "reference": "NY Gen. Bus. Law § 899-bb (SHIELD Act)"
  },
  {
    "id": 80,
    "code": "STATE-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Job Postings Without Salary Range",
    "description": "Job listings do not include compensation ranges as required by pay transparency laws in California, New York, Colorado, and Washington. Penalties range up to $10,000 per non-compliant posting.",
    "severity": "advisory",
    "reference": "Cal. Lab. Code § 432.3; NY Lab. Law § 194-b; CO SB 19-085"
  },
  {
    "id": 81,
    "code": "FIN-001",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "GLBA: Sensitive Financial Docs via Unsecured Email",
    "description": "The business accepts sensitive financial documents (tax returns, bank statements, SSNs) via standard unencrypted email. GLBA\\'s Safeguards Rule requires financial institutions to implement secure transmission methods for customer data.",
    "severity": "critical",
    "reference": "16 CFR § 314 (GLBA Safeguards Rule)"
  },
  {
    "id": 82,
    "code": "FIN-002",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FinCEN BOI: Missing Beneficial Ownership Report",
    "description": "The LLC or corporation has not filed a Beneficial Ownership Information report with FinCEN as required by the Corporate Transparency Act. Non-compliance carries penalties of $500 per day, up to $10,000, plus potential criminal liability.",
    "severity": "critical",
    "reference": "31 U.S.C. § 5336; 31 CFR § 1010.380 (CTA/BOI)"
  },
  {
    "id": 83,
    "code": "FIN-003",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FINRA: Personal Email for Investment Communications",
    "description": "An investment advisor or broker-dealer uses personal Gmail or unarchived email for client communications instead of a supervised, archived corporate email system. FINRA requires retention and supervision of all business communications.",
    "severity": "critical",
    "reference": "FINRA Rule 3110; SEC Rule 17a-4"
  },
  {
    "id": 84,
    "code": "FIN-004",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Missing Contractor License Number on Website",
    "description": "A licensed contractor\\'s website does not display the state contractor license number. Most states require the license number to appear on all advertising and business communications, with penalties of $2,000–$5,000.",
    "severity": "serious",
    "reference": "Cal. Bus. & Prof. Code § 7030.5; State Contractor License Acts"
  },
  {
    "id": 85,
    "code": "FIN-005",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "No DMCA Agent or Takedown Policy",
    "description": "The website has no registered DMCA agent with the U.S. Copyright Office and does not publish a DMCA takedown policy page. Without these, the business loses safe harbor protection for user-generated content.",
    "severity": "serious",
    "reference": "17 U.S.C. § 512(c)(2) (DMCA Safe Harbor)"
  },
  {
    "id": 86,
    "code": "FIN-006",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Missing Arbitration Clause in Terms of Service",
    "description": "The Terms of Service lack a class action waiver and mandatory arbitration clause. Without these provisions, the business is exposed to class-action litigation for any consumer dispute.",
    "severity": "serious",
    "reference": "9 U.S.C. § 2 (Federal Arbitration Act)"
  },
  {
    "id": 87,
    "code": "FIN-007",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Return Policy Not Prominently Displayed",
    "description": "California law requires a no-return or limited-return policy to be conspicuously displayed at the point of sale. If not displayed, consumers are entitled to a full refund within 30 days regardless of the merchant\\'s intended policy.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1723"
  },
  {
    "id": 88,
    "code": "FIN-008",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Credit Card Surcharge Without Advance Notice",
    "description": "A credit card surcharge or convenience fee is added at checkout without prior notice at the point of entry. Multiple states require advance signage/disclosure, and card network rules limit surcharges to 3% with mandatory disclosure.",
    "severity": "moderate",
    "reference": "Visa Core Rules § 5.6.2; State Surcharge Statutes"
  },
  {
    "id": 89,
    "code": "FIN-009",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "SEC Form CRS Missing for Investment Advisors",
    "description": "A registered investment advisor\\'s website does not publish Form CRS (Client Relationship Summary) as required by SEC Regulation Best Interest. Form CRS must be delivered to retail investors and made publicly available.",
    "severity": "moderate",
    "reference": "SEC Rule 17a-14; Regulation Best Interest"
  },
  {
    "id": 90,
    "code": "FIN-010",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Insurance Lead Generation Without Required Disclosures",
    "description": "The website generates insurance quotes or leads without state-required disclosures about the nature of the service, compensation arrangements, and licensure status. Multiple states require specific disclosures for insurance lead generators.",
    "severity": "advisory",
    "reference": "State Insurance Codes; NAIC Producer Licensing Model Act"
  },
  {
    "id": 91,
    "code": "OPS-001",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Missing DMARC Record",
    "description": "The domain lacks a DMARC (Domain-based Message Authentication, Reporting & Conformance) DNS record. Without DMARC, emails are increasingly rejected or spam-foldered by Gmail, Yahoo, and other major providers enforcing DMARC policies.",
    "severity": "critical",
    "reference": "RFC 7489; Google/Yahoo Sender Requirements 2024"
  },
  {
    "id": 92,
    "code": "OPS-002",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Missing SPF Record",
    "description": "The domain has no SPF (Sender Policy Framework) DNS record, making it vulnerable to email spoofing. Attackers can send emails appearing to come from the domain, enabling phishing attacks against customers and partners.",
    "severity": "critical",
    "reference": "RFC 7208; Google Sender Guidelines 2024"
  },
  {
    "id": 93,
    "code": "OPS-003",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Broken Outbound Links to Expired Domains",
    "description": "The website contains links pointing to expired, parked, or potentially malicious domains. Broken outbound links damage SEO authority and can redirect users to phishing or malware sites if the expired domain is re-registered by bad actors.",
    "severity": "serious",
    "reference": "Google Search Quality Guidelines; OWASP Broken Link Hijacking"
  },
  {
    "id": 94,
    "code": "OPS-004",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Orphaned Tracking Scripts from Discontinued Services",
    "description": "The website loads JavaScript from services that have been discontinued, acquired, or abandoned. These zombie scripts waste page load time, may break functionality, and pose a supply-chain security risk if the domain is re-registered.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; OWASP Supply Chain Security"
  },
  {
    "id": 95,
    "code": "OPS-005",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Missing DKIM Email Authentication",
    "description": "The domain does not publish DKIM (DomainKeys Identified Mail) records for email authentication. Without DKIM, receiving mail servers cannot verify that email content was not altered in transit, reducing deliverability.",
    "severity": "critical",
    "reference": "RFC 6376; Google/Yahoo Sender Requirements 2024"
  },
  {
    "id": 96,
    "code": "OPS-006",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Outdated Copyright Year in Footer",
    "description": "The website footer displays an outdated copyright year, signaling to visitors, search engines, and potential litigants that the site may be abandoned or unmaintained. This erodes trust and can negatively impact search rankings.",
    "severity": "serious",
    "reference": "Google Search Quality Evaluator Guidelines § 4.5"
  },
  {
    "id": 97,
    "code": "OPS-007",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Missing robots.txt and Sitemap",
    "description": "The website lacks a robots.txt file and/or XML sitemap. Without these, search engines may crawl the site inefficiently, index sensitive pages, or miss important content entirely, directly impacting organic search visibility.",
    "severity": "moderate",
    "reference": "RFC 9309 (robots.txt); Sitemaps.org Protocol"
  },
  {
    "id": 98,
    "code": "OPS-008",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Poor Mobile Tap Targets",
    "description": "Interactive elements (buttons, links, form fields) are smaller than 48x48 CSS pixels or positioned too close together, causing frequent mis-taps on mobile devices. This is both a UX issue and a WCAG 2.5.5 accessibility violation.",
    "severity": "moderate",
    "reference": "WCAG 2.5.8; Google Mobile Usability Guidelines"
  },
  {
    "id": 99,
    "code": "OPS-009",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Contact Form Without Rate Limiting",
    "description": "The contact form has no rate limiting, honeypot, or abuse prevention mechanism. Unprotected forms are routinely exploited for spam injection, phishing relay, and denial-of-service attacks against the form handler.",
    "severity": "moderate",
    "reference": "OWASP Automated Threats; PCI-DSS v4.0 Req. 6.2.4"
  },
  {
    "id": 100,
    "code": "OPS-010",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Missing or Expired SSL Certificate",
    "description": "The website lacks a valid SSL/TLS certificate or the certificate has expired. Browsers display prominent security warnings that drive away visitors, and search engines penalize non-HTTPS sites in rankings.",
    "severity": "advisory",
    "reference": "PCI-DSS v4.0 Req. 4.2.1; Google HTTPS Ranking Signal"
  },
  {
    "id": 101,
    "code": "ADA-101",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Information on Products/Services",
    "description": "EAA-regulated digital services fail to provide clear accessibility information and features in their digital interface, violating EU Directive 2019/882 requirements for e-commerce and banking.",
    "severity": "serious",
    "reference": "Directive (EU) 2019/882 Art. 4"
  },
  {
    "id": 102,
    "code": "ADA-102",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Non-Compliant Public Feedback Processes",
    "description": "The website's feedback mechanism is not accessible to persons with disabilities, violating AODA customer service standards for Ontario-based organizations.",
    "severity": "moderate",
    "reference": "AODA IASR Sec. 7"
  },
  {
    "id": 103,
    "code": "COP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Illegal Personal Information Collection from Children",
    "description": "The website collects personal data (names, emails, tracking cookies) from users under 13 without obtaining verifiable parental consent, violating COPPA regulations.",
    "severity": "critical",
    "reference": "16 CFR Part 312 (COPPA)"
  },
  {
    "id": 104,
    "code": "PIP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Mandated Privacy Officer Contact Info",
    "description": "Canadian-targeted website fails to publish the name or contact info of the designated Privacy Officer accountable for PIPEDA compliance.",
    "severity": "moderate",
    "reference": "PIPEDA Schedule 1 Sec. 4.1"
  },
  {
    "id": 105,
    "code": "PIP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Vague Purposes for Personal Data Collection",
    "description": "Form fields collect data without clearly identifying the specific, limited purpose of collection at or before the time of collection under PIPEDA requirements.",
    "severity": "serious",
    "reference": "PIPEDA Schedule 1 Sec. 4.2"
  },
  {
    "id": 106,
    "code": "LGP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "No Appointed Data Protection Officer (DPO)",
    "description": "Brazilian-targeted site does not identify or provide contact details for its DPO (Encarregado) on the website, violating LGPD Article 41.",
    "severity": "serious",
    "reference": "LGPD Art. 41"
  },
  {
    "id": 107,
    "code": "LGP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Absence of a Valid Legal Basis for Processing",
    "description": "Website processes personal data without listing the explicit legal basis (e.g., consent, legitimate interest) for each processing activity under LGPD.",
    "severity": "critical",
    "reference": "LGPD Art. 7"
  },
  {
    "id": 108,
    "code": "POP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Direct Marketing Without Opt-In Consent",
    "description": "Website deploys pre-checked consent boxes or opt-out forms for electronic direct marketing, violating POPIA opt-in regulations for South African consumers.",
    "severity": "critical",
    "reference": "POPIA Sec. 69"
  },
  {
    "id": 109,
    "code": "POP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unlawful Cross-Border Data Transfer Disclosures",
    "description": "South African website transfers personal data outside of South Africa without ensuring the recipient country has adequate data protection laws or disclosing it to the user.",
    "severity": "serious",
    "reference": "POPIA Sec. 72"
  },
  {
    "id": 110,
    "code": "APP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Overseas Data Disclosure Statement",
    "description": "Australian-targeted site fails to state in its privacy policy whether it is likely to disclose personal information to overseas recipients and, if so, in which countries.",
    "severity": "serious",
    "reference": "APP 1.4(g)"
  },
  {
    "id": 111,
    "code": "APP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Anonymous/Pseudonymous Interaction Option",
    "description": "The website forces users to identify themselves for general inquiries where it is not practically or legally necessary, violating Australian Privacy Principle 2.",
    "severity": "moderate",
    "reference": "APP 2"
  },
  {
    "id": 112,
    "code": "PDP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Provide Request for Access/Correction Info",
    "description": "Singaporean site fails to specify how users can request access to or correction of their personal data in its privacy disclosures.",
    "severity": "serious",
    "reference": "PDPA Sec. 21 & 22"
  },
  {
    "id": 113,
    "code": "PDP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unreasonable Terms forcing Personal Data Consent",
    "description": "Website requires consent to collect personal data beyond what is reasonable to provide the product or service, violating PDPA consent requirements.",
    "severity": "serious",
    "reference": "PDPA Sec. 14(2)"
  },
  {
    "id": 114,
    "code": "AIA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unmarked Generative AI Output / Deepfakes",
    "description": "Website presents AI-generated text, audio, or video (deepfakes) without marking it in a machine-readable format as AI-generated, violating EU AI Act transparency rules.",
    "severity": "critical",
    "reference": "AI Act Art. 52(3)"
  },
  {
    "id": 115,
    "code": "AIA-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Disclosure on AI User Interaction",
    "description": "The website uses an AI system (like a customer support chatbot) to interact with natural persons without informing them that they are interacting with an AI, violating transparency mandates.",
    "severity": "critical",
    "reference": "AI Act Art. 52(1)"
  },
  {
    "id": 116,
    "code": "DSA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Deceptive UI Patterns (Dark Patterns) in Design",
    "description": "The website employs dark patterns that distort or impair the user's ability to make autonomous, informed choices (e.g., difficult unsubscribe flows, deceptive consent popups).",
    "severity": "critical",
    "reference": "DSA Art. 25"
  },
  {
    "id": 117,
    "code": "DSA-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Single Point of Contact for Authorities",
    "description": "Digital service provider fails to publish a direct, electronic, and easily accessible single point of contact for communications with EU authorities.",
    "severity": "serious",
    "reference": "DSA Art. 11"
  },
  {
    "id": 118,
    "code": "DMA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unlawful Data Combination Across Services",
    "description": "Gatekeeper-scale platforms combine personal data from their core platform with data from other services without specific user consent, violating DMA regulations.",
    "severity": "critical",
    "reference": "DMA Art. 5(2)"
  },
  {
    "id": 119,
    "code": "STA-101",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Deceptive Design Encouraging Child Data Sharing",
    "description": "Website uses dark patterns to nudge children to provide personal information beyond what is necessary, violating California AB 2273 requirements.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 120,
    "code": "STA-102",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Absence of Consumer Appeal Rights Process",
    "description": "The privacy policy fails to explain the process for consumers to appeal a refusal to take action on a privacy rights request, violating Virginia VCDPA and Texas TDPSA.",
    "severity": "serious",
    "reference": "Va. Code § 59.1-573 / Tex. Bus. & Com. Code § 541.104"
  },
  {
    "id": 121,
    "code": "STA-103",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Sensitive Data Processing Opt-In",
    "description": "The website processes sensitive personal data (e.g., precise geolocation, health data, racial info) without obtaining affirmative opt-in consent from Colorado or Virginia residents.",
    "severity": "critical",
    "reference": "Colo. Rev. Stat. § 6-1-1308 / Va. Code § 59.1-574"
  },
  {
    "id": 122,
    "code": "NYD-101",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Cybersecurity Multi-Factor Auth (MFA)",
    "description": "Financial services website does not enforce multi-factor authentication for access to corporate email or customer portal databases, violating NY DFS requirements.",
    "severity": "critical",
    "reference": "23 NYCRR Section 500.12"
  },
  {
    "id": 123,
    "code": "NYD-102",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Failure to Implement Safeguards for Private Data",
    "description": "New York targeted site fails to maintain administrative, physical, and technical safeguards for personal information, violating the NY SHIELD Act.",
    "severity": "serious",
    "reference": "N.Y. Gen. Bus. Law § 899-bb"
  },
  {
    "id": 124,
    "code": "QBL-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "No Privacy Impact Assessment (PIA) for Transfer",
    "description": "The website transfers personal information outside of Quebec without conducting a mandatory Privacy Impact Assessment, violating Law 25.",
    "severity": "serious",
    "reference": "Quebec Law 25 Sec. 17"
  },
  {
    "id": 125,
    "code": "DOR-101",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Inadequate ICT Third-Party Risk Disclosures",
    "description": "Financial entity fails to maintain a comprehensive register of information on its contractual arrangements with ICT third-party service providers, violating DORA guidelines.",
    "severity": "critical",
    "reference": "DORA Regulation Art. 28"
  },
  {
    "id": 126,
    "code": "VPPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Video Tracking Pixel Fires Without VPPA Consent",
    "description": "Website embeds video content (HTML5 video, YouTube, Vimeo iframes) alongside Meta Pixel, Google Analytics, or other tracking pixels that transmit video viewing data to third parties without obtaining separate, explicit written consent. Under the VPPA, knowingly disclosing a consumer\\'s PII linked to video viewing habits without prior consent is a violation.",
    "severity": "critical",
    "reference": "18 U.S.C. § 2710 (VPPA)"
  },
  {
    "id": 127,
    "code": "EAA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "No Accessibility Statement Published Under European Accessibility Act",
    "description": "E-commerce or digital service website targeting EU consumers lacks a publicly accessible accessibility statement describing conformance status with EN 301 549 / WCAG 2.1 AA. The European Accessibility Act (Directive 2019/882), enforceable since June 28, 2025, requires private-sector businesses providing covered services to publish accessibility declarations.",
    "severity": "serious",
    "reference": "EU Directive 2019/882 (EAA), Art. 14"
  },
  {
    "id": 128,
    "code": "NIS2-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "No Security.txt or Vulnerability Disclosure Policy (NIS2)",
    "description": "Website of an essential or important entity (energy, health, transport, digital infrastructure) lacks a /.well-known/security.txt file or any publicly accessible vulnerability disclosure policy. NIS2 Directive requires covered entities to implement incident handling and vulnerability management measures.",
    "severity": "moderate",
    "reference": "EU Directive 2022/2555 (NIS2), Art. 21(2)(b)"
  },
  {
    "id": 129,
    "code": "HBNR-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Health Data Shared Without FTC Health Breach Notification Compliance",
    "description": "Non-HIPAA health website or app (wellness, fitness, symptom checker) collects identifiable health information and transmits it to third-party analytics/advertising platforms without displaying a breach notification policy. The FTC Health Breach Notification Rule (amended July 2024) treats unauthorized sharing of health data as a breach.",
    "severity": "critical",
    "reference": "16 CFR Part 318 (FTC Health Breach Notification Rule, 2024)"
  },
  {
    "id": 130,
    "code": "CKWL-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cookie Wall Blocks Access Without Valid Reject Option",
    "description": "Website displays a cookie consent banner that blocks all content access until cookies are accepted, with no \\\"Reject All\\\" option or equivalent free-access alternative. The EDPB and CJEU have ruled that cookie walls conditioning service access on acceptance of non-essential cookies do not constitute freely given consent under GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 7(4); ePrivacy Directive Art. 5(3); EDPB Opinion 08/2024"
  },
  {
    "id": 131,
    "code": "CTDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Minor\\'s Data Used for Targeted Advertising Without Opt-In (CTDPA)",
    "description": "Website directs content at minors (under 18) or collects age data indicating minor users, but continues to fire targeted advertising pixels without obtaining affirmative opt-in consent. Connecticut SB 3 (amending CTDPA) prohibits processing minors\\' data for targeted advertising or profiling without explicit consent.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3), amending CTDPA §§ 42-520"
  },
  {
    "id": 132,
    "code": "OCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Website Does Not Honor Global Privacy Control Signal (Oregon CPA)",
    "description": "Website targeting Oregon consumers does not detect or honor the Global Privacy Control (GPC) browser signal as a valid opt-out request for targeted advertising and personal data sales. The Oregon Consumer Privacy Act mandates recognition of universal opt-out preference signals as of January 1, 2026.",
    "severity": "serious",
    "reference": "ORS 646A.570–646A.589 (Oregon Consumer Privacy Act)"
  },
  {
    "id": 133,
    "code": "COAI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "High-Risk AI System Without Public Transparency Disclosure (Colorado AI Act)",
    "description": "Website uses AI-driven systems for consequential decisions (hiring, lending, insurance, housing) but lacks a publicly accessible statement disclosing which high-risk AI systems are deployed and how algorithmic discrimination risks are managed. Colorado SB 24-205 requires deployers to maintain such disclosures.",
    "severity": "moderate",
    "reference": "Colorado SB 24-205 (Colorado AI Act), §§ 6-1-1701"
  },
  {
    "id": 134,
    "code": "JPAP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Cookie Data Shared With Third Parties Without Japan APPI Disclosure",
    "description": "Website targeting Japanese users transfers cookie/tracking data to third-party advertising or analytics vendors that can combine it to identify individuals, without disclosing these transfers or confirming third-party consent. Japan\\'s APPI and the Telecommunications Business Act require transparency and consent confirmation for such transfers.",
    "severity": "serious",
    "reference": "Japan APPI (Act No. 57 of 2003, amended 2022), Art. 31; Telecom Business Act, Art. 27-12"
  },
  {
    "id": 135,
    "code": "KRPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Essential Cookies Set Before Consent for South Korean Users",
    "description": "Website targeting South Korean users sets tracking or advertising cookies before obtaining explicit, informed consent. South Korea\\'s PIPA requires prior opt-in consent before collecting personal information including behavioral tracking data. Violations carry fines up to 3% of total revenue.",
    "severity": "serious",
    "reference": "South Korea PIPA, Art. 15, Art. 17"
  },
  {
    "id": 136,
    "code": "FERP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Education Website Tracking Pixels Transmitting Student Data",
    "description": "Educational institution website embeds Meta Pixel, Google Analytics, or similar tracking technologies on student-facing pages (portals, enrollment forms, course catalogs) that transmit potentially identifiable student data to third parties. FERPA prohibits unauthorized disclosure of PII from education records.",
    "severity": "critical",
    "reference": "20 U.S.C. § 1232g (FERPA); 34 CFR Part 99"
  },
  {
    "id": 137,
    "code": "ESIG-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "E-Sign Consent Flow Lacks Required ESIGN Act Disclosures",
    "description": "Website uses electronic signatures or agreements for transactions but fails to provide required pre-consent disclosures including: the right to receive paper copies, the right to withdraw consent and procedures for doing so, and the hardware/software requirements for accessing records.",
    "severity": "moderate",
    "reference": "15 U.S.C. §§ 7001–7006 (E-SIGN Act), § 7001(c)"
  },
  {
    "id": 138,
    "code": "IDDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Privacy Notice Not Available in Required Languages (India DPDP Act)",
    "description": "Website collecting personal data from Indian users does not provide a privacy notice in English and at least one of the 22 scheduled Indian languages as required by the Digital Personal Data Protection Act 2023. The notice must include itemized descriptions of data collected, purposes, and user rights.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023 (Act No. 22 of 2023), Sections 5–6"
  },
  {
    "id": 139,
    "code": "FACT-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Full Credit Card Number Shown on Electronic Receipt (FACTA Violation)",
    "description": "Website displays more than the last five digits of a credit/debit card number or shows the expiration date on electronic order confirmations, receipts, or account pages. FACTA mandates truncation of card numbers to no more than five digits and prohibits printing the expiration date on electronically printed receipts.",
    "severity": "critical",
    "reference": "15 U.S.C. § 1681c(g) (FACTA, § 113)"
  },
  {
    "id": 140,
    "code": "DLDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "No Clear Opt-Out Mechanism for Delaware Consumers (DPDPA)",
    "description": "Website targeting Delaware consumers lacks a clear, conspicuous opt-out link for targeted advertising and personal data sales, or fails to recognize universal opt-out signals (GPC). The Delaware Personal Data Privacy Act (effective January 1, 2025) requires both mechanisms.",
    "severity": "serious",
    "reference": "Delaware DPDPA (HB 154, Chapter 12C, Title 6)"
  },
  {
    "id": 141,
    "code": "THPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Essential Cookies Firing Without Opt-In Consent (Thailand PDPA)",
    "description": "Website targeting Thai users fires non-essential cookies (analytics, advertising, social) before obtaining explicit opt-in consent via a compliant consent banner. Thailand\\'s PDPA requires express, active opt-in consent before processing personal data including cookies. Pre-ticked boxes are explicitly non-compliant.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562 (2019), Sections 19, 23"
  },
  {
    "id": 142,
    "code": "SEC-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "SEC Registrant Missing Cybersecurity Governance Disclosure",
    "description": "Website of an SEC-reporting public company does not include or link to cybersecurity risk management disclosures (board oversight, management expertise, risk assessment processes) as required in 10-K filings. Corporate websites must reference or link to these disclosures for investor relations compliance.",
    "severity": "moderate",
    "reference": "SEC Final Rule 33-11216 (2023); Regulation S-K, Item 106"
  },
  {
    "id": 143,
    "code": "TRKV-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Controller Registration Notice (Turkey KVKK)",
    "description": "Website processing personal data of Turkish residents does not disclose the identity of the data controller, VERBIS (Data Controllers Registry) registration number, or provide a compliant privacy notice identifying purposes of processing, third-party transfers, and data subject rights per KVKK requirements.",
    "severity": "serious",
    "reference": "Turkey Law No. 6698 (KVKK), Art. 10, Art. 16"
  },
  {
    "id": 144,
    "code": "NZPR-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Cross-Border Data Transfer Without NZ Privacy Act IPP 12 Compliance",
    "description": "Website collects personal data from New Zealand users and transfers it overseas (evidenced by US/EU-based tracking scripts) without disclosing in the privacy policy that data may be transferred overseas and what safeguards are in place per Information Privacy Principle 12.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 12"
  },
  {
    "id": 145,
    "code": "MNDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Privacy Notice Missing Data Retention Periods (Minnesota MCDPA)",
    "description": "Website targeting Minnesota consumers has a privacy policy that does not disclose data retention periods or policies for personal data collected. The Minnesota Consumer Data Privacy Act (effective July 31, 2025) uniquely requires retention policy disclosure in the privacy notice.",
    "severity": "moderate",
    "reference": "Minnesota MCDPA (HF 2309), § 325O"
  },
  {
    "id": 146,
    "code": "EIDS-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Very Large Online Platform Not Prepared for EUDI Wallet Acceptance",
    "description": "Very Large Online Platform (VLOP) requiring strong customer authentication for login, age verification, or KYC does not support or indicate readiness for EU Digital Identity Wallet acceptance. eIDAS 2.0 mandates VLOPs accept EUDI Wallet by December 2027.",
    "severity": "advisory",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 12b"
  },
  {
    "id": 147,
    "code": "AMLK-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "AML/KYC Customer Identification Notice Missing on Financial Site",
    "description": "Website of a financial institution, fintech, or money services business that opens accounts online does not display the required customer notification explaining that personal information is being collected to comply with federal identity verification (CIP) requirements under the USA PATRIOT Act/BSA.",
    "severity": "serious",
    "reference": "31 U.S.C. § 5318(l); 31 CFR § 1020.220(a)(5) (BSA/PATRIOT Act CIP)"
  },
  {
    "id": 148,
    "code": "CTHL-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Geofencing Near Health Facility for Data Collection (CT SB 3)",
    "description": "Website or associated mobile app uses geofencing technology within 1,750 feet of a mental, reproductive, or sexual health facility to identify, track, or send push notifications to consumers for health data collection purposes. Connecticut SB 3 specifically prohibits this practice.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3), § 4(d)"
  },
  {
    "id": 149,
    "code": "IDDG-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Grievance Redressal Mechanism for Indian Data Principals",
    "description": "Website collecting personal data from Indian users does not provide a designated grievance officer\\'s contact details or a complaint mechanism for data principals. The India DPDP Act 2023 requires Data Fiduciaries to establish an accessible grievance redressal mechanism on their website.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023, Section 8(10); IT Act 2000, Rule 5(9)"
  },
  {
    "id": 150,
    "code": "CBAC-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cookie Consent Banner Uses Asymmetric Accept/Reject Design",
    "description": "Website\\'s cookie consent banner makes the \\\"Accept All\\\" button visually prominent (larger, colored, higher placement) while the \\\"Reject All\\\" or \\\"Manage Preferences\\\" option is obscured, smaller, or requires additional clicks. European DPAs (CNIL, AEPD, Belgian DPA) have ruled that asymmetric cookie banners constitute dark patterns undermining freely given consent.",
    "severity": "serious",
    "reference": "GDPR Art. 7(4), Art. 4(11); ePrivacy Art. 5(3); CNIL Deliberation 2023-010"
  },
  {
    "id": 151,
    "code": "CUBI-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Biometric Capture Without Prior Notification and Consent (Texas CUBI)",
    "description": "Website captures biometric identifiers (such as facial geometry scans from virtual try-ons or photos, or voiceprints) without informing the individual prior to capture and without obtaining their explicit consent, violating Texas CUBI.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 503.001"
  },
  {
    "id": 152,
    "code": "EUAI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Machine-Readable Metadata/Watermark in AI-Generated Content (EU AI Act)",
    "description": "Providers of AI systems that generate or manipulate image, audio, or video content (synthetic content/deepfakes) must ensure that the outputs are marked in a machine-readable format and detectable as artificially generated or manipulated.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(3)"
  },
  {
    "id": 153,
    "code": "QC25-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Officer (DPO) Contact Details on Website (Quebec Act 25)",
    "description": "Website collecting personal information from Quebec residents fails to publish the title and contact details of the person in charge of personal information protection (DPO/Responsable) on the website, violating Section 3.1 of Quebec\'s Act 25.",
    "severity": "serious",
    "reference": "Quebec Act respecting the protection of personal information in the private sector (Act 25), Section 3.1 & 60.1"
  },
  {
    "id": 154,
    "code": "COPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Failure to Recognize Global Privacy Control (GPC) Opt-Out Signal (Colorado CPA)",
    "description": "Website targeting Colorado consumers fails to recognize and process the Global Privacy Control (GPC) universal opt-out signal to automatically opt users out of the processing of their personal data for targeted advertising or sale, which is mandatory as of July 1, 2024.",
    "severity": "serious",
    "reference": "4 CCR 904-3 (Colorado Privacy Act Rules), Rule 5.05 & 5.06"
  },
  {
    "id": 155,
    "code": "MHMDA-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Missing Consumer Health Privacy Policy Link on Homepage (WA MHMDA)",
    "description": "Website collecting consumer health data (e.g., searches for symptoms, reproductive wellness trackers, fitness registrations) fails to display a separate, distinct link on its homepage footer or header titled \"Consumer Health Privacy Policy\", as required by Washington State\'s MHMDA.",
    "severity": "critical",
    "reference": "RCW 19.373.030(1)(a) (Washington MHMDA)"
  },
  {
    "id": 156,
    "code": "CNPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Separate Consent for Sensitive Personal Information Processing (China PIPL)",
    "description": "Website targeting Chinese residents collects sensitive personal information (such as financial accounts, medical records, biometrics, or precise location) without obtaining separate, specific consent for each category of sensitive data, violating PIPL Article 29.",
    "severity": "critical",
    "reference": "China Personal Information Protection Law (PIPL), Article 29 & 66"
  },
  {
    "id": 157,
    "code": "DSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Dark Patterns in User Interfaces (EU DSA Article 25)",
    "description": "Website uses deceptive design techniques or dark patterns that distort, impair, or manipulate the user\'s ability to make free and informed decisions (e.g., making subscription cancellation significantly harder than signing up), violating DSA Article 25.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (Digital Services Act), Article 25"
  },
  {
    "id": 158,
    "code": "KRPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Bundling Consent for Third-Party Data Transfers (South Korea PIPA)",
    "description": "Website collects personal data of South Korean residents and shares it with third parties (such as marketing networks, CRM tools, or analytics) but bundles the third-party transfer agreement with the general privacy policy or terms of service, violating South Korea PIPA Article 17.",
    "severity": "serious",
    "reference": "Personal Information Protection Act of South Korea (PIPA), Article 15, 17 & 75"
  },
  {
    "id": 159,
    "code": "UKOSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate Age Verification for Regulated Content (UK OSA)",
    "description": "Website publishes content harmful to children (such as adult content, gambling, or highly sensitive violent content) but fails to implement robust age verification, relying instead on simple click-through \"I am 18\" age gates, violating the UK Online Safety Act.",
    "severity": "critical",
    "reference": "UK Online Safety Act 2023, Sections 11 & 12"
  },
  {
    "id": 160,
    "code": "EUAI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Emotion Recognition / Biometric Categorization Disclosure (EU AI Act)",
    "description": "Providers or deployers of emotion recognition or biometric categorization systems must inform natural persons exposed thereto of the operation of the system, violating transparency obligations under EU AI Act Article 52(2).",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(2)"
  },
  {
    "id": 161,
    "code": "CAAD-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Default Geolocation Disabled for Under-18 Users (CA AADC)",
    "description": "Website likely to be accessed by minors fails to disable precise geolocation tracking by default, violating California\'s Age-Appropriate Design Code Act.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(5)"
  },
  {
    "id": 162,
    "code": "BIPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Retention and Destruction Policy (BIPA)",
    "description": "Website collecting or utilizing biometric data (virtual try-on, authentication) fails to publish a publicly available retention schedule and destruction guidelines as mandated by Illinois BIPA.",
    "severity": "critical",
    "reference": "740 ILCS 14/15(a)"
  },
  {
    "id": 163,
    "code": "ORPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-In Consent for Sensitive Data Processing (Oregon OCPA)",
    "description": "Website targeting Oregon consumers processes sensitive data (biometrics, precise location, race, sexual orientation) without prior affirmative opt-in consent, violating the Oregon Consumer Privacy Act.",
    "severity": "serious",
    "reference": "Or. Rev. Stat. § 646A (OCPA)"
  },
  {
    "id": 164,
    "code": "VCDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Geofencing Around Healthcare Facilities for Data Collection (VCDPA)",
    "description": "Website or app uses geofencing within 1,750 feet of any healthcare facility to track, identify, or target consumers for health data collection, which is prohibited under Virginia\'s amended VCDPA.",
    "severity": "critical",
    "reference": "Va. Code § 59.1-574 (VCDPA)"
  },
  {
    "id": 165,
    "code": "TDPS-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Sensitive Data Consent Violation (Texas TDPSA)",
    "description": "Website targeting Texas consumers collects sensitive personal data, including biometric or genetic identifiers, without obtaining explicit prior opt-in consent as mandated by the Texas Data Privacy and Security Act.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 541.101"
  },
  {
    "id": 166,
    "code": "MTDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Parent Consent Verification for Minors under 13 (Montana MCDPA)",
    "description": "Website targeting Montana consumers collects personal data of minors under 13 without obtaining verifiable parental consent in accordance with the Montana Consumer Data Privacy Act.",
    "severity": "critical",
    "reference": "Mont. Code Ann. § 30-14"
  },
  {
    "id": 167,
    "code": "FDBR-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Failure to Disclose Facial Recognition Surveillance (Florida FDBR)",
    "description": "Website or associated web application utilizes active facial recognition or surveillance software without providing a clear, conspicuous front-end notice and obtaining opt-in consent as required by the Florida Digital Bill of Rights.",
    "severity": "serious",
    "reference": "Fla. Stat. § 501.71 (FDBR)"
  },
  {
    "id": 168,
    "code": "NJPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Privacy Disclosures for Children\'s Data (New Jersey Privacy Act)",
    "description": "Website targeting New Jersey consumers collects data from minors (under 18) without providing the required heightened privacy notice detailing specific processing and sharing policies.",
    "severity": "serious",
    "reference": "N.J. Stat. Ann. 56:8-1"
  },
  {
    "id": 169,
    "code": "NEDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inadequate Notice of Consumer Profiling (Nebraska NDPA)",
    "description": "Website targeting Nebraska consumers utilizes automated decision-making or profiling for employment, finance, or housing without disclosing the profiling logic in its privacy notice.",
    "severity": "moderate",
    "reference": "Neb. Rev. Stat. § 87-301 (NDPA)"
  },
  {
    "id": 170,
    "code": "NHPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Direct Marketing Opt-Out Link (New Hampshire Privacy Act)",
    "description": "Website targeting New Hampshire consumers fails to provide an easily accessible opt-out link for targeted advertising or personal data sale on its homepage, violating the New Hampshire Privacy Act.",
    "severity": "serious",
    "reference": "N.H. Rev. Stat. § 507-H"
  },
  {
    "id": 171,
    "code": "GDPR-011",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Inaccessible Format for Data Portability Requests (GDPR)",
    "description": "Website\'s data download tools output personal data in a proprietary or unstructured format (e.g., PDF reports) rather than a structured, commonly used, machine-readable format (e.g., JSON or CSV) as required by GDPR.",
    "severity": "moderate",
    "reference": "GDPR Article 20"
  },
  {
    "id": 172,
    "code": "GDPR-012",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Non-Layered Privacy Policy Information Structure (GDPR)",
    "description": "Website displays a single, dense, unnavigable blocks-of-text privacy policy without employing a multi-layered, tabbed, or expandable design structure to ensure transparency and readability.",
    "severity": "moderate",
    "reference": "GDPR Article 12(1)"
  },
  {
    "id": 173,
    "code": "DSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Ad Repository and Transparency Log (EU DSA)",
    "description": "Online platform displaying advertisements to EU users fails to provide a publicly accessible ad library containing search filters, advertiser identities, and targeting parameters, violating DSA Article 39.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 39"
  },
  {
    "id": 174,
    "code": "DSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Single Point of Contact for Authorities (EU DSA)",
    "description": "Digital platform targeting EU users fails to publish a dedicated, easily accessible email address and communication channel for direct contact by EU authorities, violating DSA Article 11.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 11"
  },
  {
    "id": 175,
    "code": "DMA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Involuntary Gatekeeper Data Bundling (EU DMA)",
    "description": "Gatekeeper online platforms bundle personal data collected from a core platform service with data from other services without obtaining explicit, separate consent from the user, violating DMA Article 5(2).",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/1925 (DMA), Art. 5(2)"
  },
  {
    "id": 176,
    "code": "EUDAT-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Smart Contract Access Lack of Deactivation Capability (EU Data Act)",
    "description": "Web panels administering smart contracts or IoT systems fail to provide mechanisms for safe, authorized deactivation and termination of smart contracts, violating EU Data Act Article 30.",
    "severity": "serious",
    "reference": "Regulation (EU) 2023/2854 (Data Act), Art. 30"
  },
  {
    "id": 177,
    "code": "GDPR-013",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Consent Status Logging and Audit Trails (GDPR)",
    "description": "Website collecting personal data fails to record, log, and maintain audit trails of the exact timestamp, consent version, and user action for cookie consent agreements, violating GDPR Article 7(1).",
    "severity": "serious",
    "reference": "GDPR Article 7(1)"
  },
  {
    "id": 178,
    "code": "EPRIV-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Pre-Consent Cookie & Tracker Execution (ePrivacy)",
    "description": "Website runs non-essential analytics or advertising tracking scripts (e.g., Google Analytics, Meta Pixel) prior to the user interacting with the cookie consent banner, violating the ePrivacy Directive.",
    "severity": "critical",
    "reference": "Directive 2002/58/EC (ePrivacy), Art. 5(3)"
  },
  {
    "id": 179,
    "code": "DORA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Lack of Operational Resilience Disclosures (EU DORA)",
    "description": "Website of a financial entity or critical third-party provider fails to disclose cybersecurity operational risk management frameworks and emergency contact paths, violating DORA Article 30.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30"
  },
  {
    "id": 180,
    "code": "GDPR-014",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Retention Timelines in Privacy Disclosures (GDPR)",
    "description": "Privacy policy fails to specify concrete retention periods or criteria used to determine retention durations for distinct categories of personal data, violating GDPR transparency principles.",
    "severity": "moderate",
    "reference": "GDPR Article 13(2)(a)"
  },
  {
    "id": 181,
    "code": "AUPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Data Disposal Standards Infraction (Australia Privacy Act)",
    "description": "Website holding personal data of Australian residents fails to implement automated scripts or schedules to permanently de-identify or destroy data that is no longer needed, violating APP 11.2.",
    "severity": "serious",
    "reference": "Australian Privacy Act 1988, APP 11.2"
  },
  {
    "id": 182,
    "code": "SGPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Consent Withdrawal Mechanism (Singapore PDPA)",
    "description": "Website collecting data of Singapore residents fails to provide an easily accessible online tool or form allowing users to withdraw consent for marketing or data processing, violating Singapore PDPA.",
    "severity": "serious",
    "reference": "Singapore PDPA 2012, Sec. 16"
  },
  {
    "id": 183,
    "code": "SGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Officer Visibility (Singapore PDPA)",
    "description": "Website targeting Singapore users fails to publish the contact information (such as a direct email address) of the designated Data Protection Officer, violating Section 20 of Singapore PDPA.",
    "severity": "moderate",
    "reference": "Singapore PDPA 2012, Sec. 20"
  },
  {
    "id": 184,
    "code": "DPDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Right to Nominate Representative Notice (India DPDP Act)",
    "description": "Website targeting Indian residents fails to inform users in its privacy policy of their right to nominate any other individual to act on their behalf in the event of death or incapacity, violating DPDP Act Section 14.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023, Section 14"
  },
  {
    "id": 185,
    "code": "DPDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Consent Manager Interface Integration (India DPDP Act)",
    "description": "Website fails to support or link to authorized Consent Managers to allow Indian data principals to give, manage, review, and withdraw consent through an automated portal, violating DPDP Act Section 6(7).",
    "severity": "serious",
    "reference": "India DPDP Act 2023, Section 6(7)"
  },
  {
    "id": 186,
    "code": "JPAP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Disclosures for Handling Anonymized Data (Japan APPI)",
    "description": "Website utilizing anonymized data of Japanese residents fails to publish the items of personal information included in the anonymized data and the security measures taken, violating APPI Article 36.",
    "severity": "serious",
    "reference": "Japan APPI, Article 36"
  },
  {
    "id": 187,
    "code": "NZPR-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Contact Link for Privacy Officer (New Zealand Privacy Act)",
    "description": "Website collects data of New Zealand residents but fails to display contact paths for its designated Privacy Officer, violating NZ Privacy Act Section 201.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, Sec. 201"
  },
  {
    "id": 188,
    "code": "THPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing DPO Contact Details in Consent Flows (Thailand PDPA)",
    "description": "Website collects personal data of Thai residents but fails to provide the contact details of the Data Protection Officer or representative in its consent banners or policies, violating Thailand PDPA Section 42.",
    "severity": "moderate",
    "reference": "Thailand PDPA B.E. 2562, Section 42"
  },
  {
    "id": 189,
    "code": "VNDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Local Data Protection Officer for Sensitive Data (Vietnam Decree 13)",
    "description": "Website collecting sensitive personal data (e.g., location, health, financial) of Vietnamese residents fails to establish a local data protection department or appoint a DPO as mandated by Decree 13.",
    "severity": "serious",
    "reference": "Vietnam Decree 13/2023/ND-CP, Art. 28"
  },
  {
    "id": 190,
    "code": "PHDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Bundled Consent for Profiling and Automated Decision-Making (Philippines DPA)",
    "description": "Website collects data of Philippine residents and conducts automated profiling or decision-making without obtaining separate, express consent, violating the Philippines Data Privacy Act.",
    "severity": "serious",
    "reference": "Philippines Data Privacy Act of 2012, Sec. 12"
  },
  {
    "id": 191,
    "code": "LGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Subject Rights Portal Link (Brazil LGPD)",
    "description": "Website fails to display a clear, separate link on its main page allowing Brazilian residents to submit direct requests to access, correct, delete, or anonymize their personal data, violating LGPD Article 18.",
    "severity": "serious",
    "reference": "Brazil LGPD, Article 18"
  },
  {
    "id": 192,
    "code": "POPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Prior Authorization for Processing Credit Data (South Africa POPIA)",
    "description": "Website of a financial or credit evaluation service targeting South African residents processes consumer credit reports or history without prior registration or authorization, violating POPIA Section 57.",
    "severity": "serious",
    "reference": "South Africa POPIA 2013, Section 57"
  },
  {
    "id": 193,
    "code": "SAPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-in Consent for Direct Marketing (Saudi Arabia PDPL)",
    "description": "Website targeting Saudi Arabian residents sends promotional communications or tracks behavior for advertising purposes without obtaining prior explicit opt-in consent, violating PDPL Article 28.",
    "severity": "serious",
    "reference": "Saudi PDPL, Article 28"
  },
  {
    "id": 194,
    "code": "ILPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Disclose Database Registration Status (Israel Privacy Act)",
    "description": "Website collecting personal data of Israeli residents fails to specify whether the database is registered with the Database Registrar, the registration number, and the purposes of data collection, violating Israel Privacy Act.",
    "severity": "moderate",
    "reference": "Israel Privacy Protection Act 1981, Sec. 8"
  },
  {
    "id": 195,
    "code": "DIFC-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Separate Consent for Direct Marketing (Dubai DIFC)",
    "description": "Website operating under DIFC jurisdiction collects personal data and bundles consent for marketing or profiling with the general terms, violating DIFC Data Protection Law Article 12.",
    "severity": "serious",
    "reference": "DIFC Law No. 5 of 2020, Art. 12"
  },
  {
    "id": 196,
    "code": "NDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Cross-Border Data Transfer Disclosures (Nigeria NDPA)",
    "description": "Website collecting data of Nigerian residents transfers it to foreign servers (e.g., US/EU analytics engines) without disclosing the target countries and verifying adequacy, violating Nigeria Data Protection Act.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act 2023, Sec. 42"
  },
  {
    "id": 197,
    "code": "KEDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unauthorized Cross-Border Transfer of Health Data (Kenya DPA)",
    "description": "Website collects sensitive health or medical records of Kenyan residents and stores them on servers located outside Kenya without obtaining explicit approval and consent, violating Kenya DPA Section 50.",
    "severity": "critical",
    "reference": "Kenya Data Protection Act 2019, Sec. 50"
  },
  {
    "id": 198,
    "code": "EGDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of License for Electronic Marketing Messages (Egypt DPA)",
    "description": "Website targeting Egyptian users sends promotional emails or texts without obtaining the necessary electronic marketing license from the Data Protection Center, violating Egypt Law 151.",
    "severity": "serious",
    "reference": "Egypt Law No. 151 of 2020, Art. 13"
  },
  {
    "id": 199,
    "code": "MRDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unauthorized International Data Transfer (Morocco CNDP Law 09-08)",
    "description": "Website collects personal data of Moroccan residents and transfers it outside Morocco (evidenced by external script endpoints) without obtaining prior written authorization from the CNDP.",
    "severity": "serious",
    "reference": "Morocco Law 09-08, Art. 43"
  },
  {
    "id": 200,
    "code": "LGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate Security Standards Disclosures (Brazil LGPD)",
    "description": "Website collecting personal data fails to disclose the specific administrative and technical security measures deployed to safeguard user data, violating transparency mandates under LGPD Article 46.",
    "severity": "serious",
    "reference": "Brazil LGPD, Art. 46"
  },
  {
    "id": 201,
    "code": "FTCS-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Insecure Transmission of Financial Customer Info (FTC Safeguards)",
    "description": "Fintech or financial portal targeting consumers transmits customer data over unencrypted channels or fails to enforce HTTPS across all login and API endpoints, violating FTC Safeguards Rule.",
    "severity": "critical",
    "reference": "16 CFR Part 314, Sec 314.4(c)"
  },
  {
    "id": 202,
    "code": "GLBA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Privacy Notice Delivery Link (GLBA)",
    "description": "Financial service website failing to provide a clear, visible link to its annual Gramm-Leach-Bliley Act privacy notice on all account management or client onboarding pages, violating FTC GLBA regulations.",
    "severity": "serious",
    "reference": "16 CFR Part 313 (GLBA Privacy Rule)"
  },
  {
    "id": 203,
    "code": "CTAC-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Lack of Corporate Transparency Disclosures (CTA)",
    "description": "Corporate website fails to mention or display required beneficial ownership reporting notices or filing confirmations as required for compliance under the Corporate Transparency Act.",
    "severity": "moderate",
    "reference": "31 U.S.C. § 5336 (CTA)"
  },
  {
    "id": 204,
    "code": "SEC-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Electronic Record Archiving Verification (SEC Rule 17a-4)",
    "description": "Broker-dealer or financial investment portal does not disclose or link to its electronic record archiving systems (WORM storage compliance), violating SEC recordkeeping regulations.",
    "severity": "serious",
    "reference": "17 CFR § 240.17a-4"
  },
  {
    "id": 205,
    "code": "DORA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Lack of ICT Risk Management System Disclosures (EU DORA)",
    "description": "Website of an EU financial entity or service fails to display cybersecurity certifications or disclosures outlining digital operational resilience mechanisms, violating DORA Article 6.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 6"
  },
  {
    "id": 206,
    "code": "FTCR-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Missing Identity Theft Prevention Disclosures (FTC Red Flags)",
    "description": "Creditor or financial utility portal failing to display or link to its Identity Theft Prevention Program (ITPP) or show active identity verification steps during account sign-up, violating FTC Red Flags Rule.",
    "severity": "serious",
    "reference": "16 CFR § 681.1"
  },
  {
    "id": 207,
    "code": "FINRA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing BrokerCheck Link and Regulatory Disclosures (FINRA)",
    "description": "Investment advisory or broker-dealer website fails to display a direct, prominent link to the FINRA BrokerCheck tool on its homepage and profile pages, violating FINRA Rule 2210.",
    "severity": "serious",
    "reference": "FINRA Rule 2210(d)"
  },
  {
    "id": 208,
    "code": "PCI-011",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Unmonitored Third-Party Scripts on Checkout Page (PCI-DSS v4.0)",
    "description": "Payment checkout page executes third-party scripts (e.g., live chats, analytics) without employing script integrity controls, CSP restrictions, or explicit load authorization, violating PCI-DSS Req 6.4.3.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.3"
  },
  {
    "id": 209,
    "code": "PCI-012",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing Subresource Integrity (SRI) on Payment Gateway (PCI-DSS v4.0)",
    "description": "Website embeds payment forms or scripts from external CDNs or third-party gateways without utilizing Subresource Integrity (SRI) hashes, leaving payments open to formjacking, violating PCI-DSS Req 11.6.1.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 11.6.1"
  },
  {
    "id": 210,
    "code": "TILA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Prominent APR Disclosure in Loan Ads (TILA)",
    "description": "Website advertising credit or loan options states finance rates or promotional fees without prominently disclosing the Annual Percentage Rate (APR) next to the rate, violating Truth in Lending Act Z Regulation.",
    "severity": "serious",
    "reference": "12 CFR Part 1026 (Regulation Z)"
  },
  {
    "id": 211,
    "code": "FTCD-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Deceptive Cancellation Flow / Roach Motel (FTC Section 5)",
    "description": "Website uses dark patterns to make subscription cancellation significantly harder, requiring multiple phone calls or complex navigation paths compared to the one-click signup process.",
    "severity": "serious",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 212,
    "code": "FTCD-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Deceptive Urgency & Fake Countdown Timers (FTC Section 5)",
    "description": "Website displays countdown timers or dynamic text claiming low stock, high demand, or limited deals that are synthetic and do not reflect real transactional metrics, deceiving consumers.",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 213,
    "code": "FTCD-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Confirmshaming in Opt-Out Modals (FTC Section 5)",
    "description": "Website displays marketing or subscription opt-out options where the reject button uses emotionally manipulative language (e.g., \"No thanks, I hate saving money\") to discourage users from opting out.",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 214,
    "code": "W3CR-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Smart Contract Auditing Disclosures on dApp (SEC Framework)",
    "description": "Web3 decentralized application launching tokens or NFTs fails to publish or link to external security audit certificates for its smart contracts, violating SEC transparency guidelines.",
    "severity": "serious",
    "reference": "SEC Framework for Investment Contracts"
  },
  {
    "id": 215,
    "code": "W3CR-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Blind Signing Vulnerability in Web3 dApp Interface (NIST SP 800-95)",
    "description": "Web3 application wallet integration requests raw transaction signature payloads without rendering readable transaction details (functions, targets, arguments) in the web UI, enabling blind signing.",
    "severity": "critical",
    "reference": "NIST SP 800-95 Web Services Security"
  },
  {
    "id": 216,
    "code": "DSA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Recommender System Algorithmic Transparency (EU DSA)",
    "description": "Website utilizing algorithmic recommender systems (e.g., personalized feed, product suggestions) fails to explain the main parameters used in the algorithms in its terms and conditions, violating DSA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 26"
  },
  {
    "id": 217,
    "code": "EUAI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing High-Risk AI System Logging Capability (EU AI Act)",
    "description": "Deployer of a high-risk AI system fails to ensure that logs generated by the system are automatically kept for at least six months to ensure traceability and auditability, violating EU AI Act.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 12"
  },
  {
    "id": 218,
    "code": "UKCR-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Auto-Renewal Terms Without Plain Language Summary (UK CRA)",
    "description": "Website charging recurring subscriptions fails to provide a conspicuous, plain language summary of billing terms, price changes, and renewal dates, violating the UK Consumer Rights Act.",
    "severity": "serious",
    "reference": "UK Consumer Rights Act 2015, Sec. 68"
  },
  {
    "id": 219,
    "code": "PIPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate Third-Party Processor Disclosures (Canada PIPEDA)",
    "description": "Privacy policy fails to detail the identities, roles, and countries of third-party SaaS processors handling user personal data, violating PIPEDA transparency guidelines.",
    "severity": "serious",
    "reference": "PIPEDA Schedule 1, APP 4.8"
  },
  {
    "id": 220,
    "code": "TDDD-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Analytics Cookie Consent Bypass (Germany TDDDG)",
    "description": "Website targeting German users fires analytics, heatmap, or performance cookies before obtaining explicit consent, violating Section 25 of the Telecommunications Digital Services Data Protection Act.",
    "severity": "critical",
    "reference": "Germany TDDDG Section 25"
  },
  {
    "id": 221,
    "code": "TXSC-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Social Media Chat Enabled by Default for Minors (Texas SCOPE)",
    "description": "Social networking or platform site fails to disable direct messaging and chat features by default for users verified or suspected to be minors, violating the Texas SCOPE Act.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 509 (SCOPE Act)"
  },
  {
    "id": 222,
    "code": "UTSM-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Age Verification for Social Platforms (Utah SMRA)",
    "description": "Social media platform fails to verify the age of Utah residents attempting to create accounts or fails to obtain verifiable parental consent for minors, violating the Utah Social Media Regulation Act.",
    "severity": "critical",
    "reference": "Utah Code § 13-63-102 (SMRA)"
  },
  {
    "id": 223,
    "code": "FLDB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Age Gate for Restricted Social Platform (Florida FDBR)",
    "description": "Social media platform accessible to minors fails to deploy an accredited, secure age-verification mechanism, violating young consumer safety provisions under the Florida Digital Bill of Rights.",
    "severity": "critical",
    "reference": "Fla. Stat. § 501.71 (FDBR)"
  },
  {
    "id": 224,
    "code": "CTDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Geofencing Around Mental Health Centers (Connecticut SB 3)",
    "description": "Website or app uses geofencing within 1,750 feet of any mental, reproductive, or sexual health facility to collect health-related data, violating Connecticut SB 3.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3)"
  },
  {
    "id": 225,
    "code": "VCDP-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Consent Verification for Child Sensitive Data (Virginia VCDPA)",
    "description": "Website collecting sensitive personal data of child consumers under 13 fails to obtain parental verification conforming to COPPA prior to data collection, violating VCDPA.",
    "severity": "critical",
    "reference": "Va. Code § 59.1-574 (VCDPA)"
  },
  {
    "id": 226,
    "code": "CAAD-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Profiling Enabled by Default for Minor Accounts (CA AADC)",
    "description": "Website likely to be accessed by children has profiling, personalized ads, or algorithmic feeds turned on by default for accounts of minors, violating the California Age-Appropriate Design Code Act.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31 (AADC)"
  },
  {
    "id": 227,
    "code": "MDAD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Child Impact Assessment Disclosures (Maryland AADCA)",
    "description": "Website or application likely to be accessed by children fails to conduct and file a Data Protection Impact Assessment (DPIA) regarding risks to minors, violating the Maryland AADCA.",
    "severity": "serious",
    "reference": "Md. Code Ann., Com. Law § 14-45"
  },
  {
    "id": 228,
    "code": "COPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Parental Consent for Child Personal Data (Colorado CPA)",
    "description": "Website collects or processes personal data of consumers known to be under 13 without obtaining prior verifiable parental consent, violating the Colorado Privacy Act Rules.",
    "severity": "critical",
    "reference": "4 CCR 904-3 Rule 6.09"
  },
  {
    "id": 229,
    "code": "INDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-In Consent for Child Sensitive Data (Indiana CDPA)",
    "description": "Website targeting Indiana residents collects sensitive data of minors under 13 without prior affirmative opt-in consent matching COPPA requirements, violating the Indiana Consumer Data Protection Act.",
    "severity": "critical",
    "reference": "Ind. Code § 24-15"
  },
  {
    "id": 230,
    "code": "TNIP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Privacy Policy Rights Appeals Process (Tennessee TIPA)",
    "description": "Website privacy notice targeting Tennessee residents fails to provide a clear description of the process to appeal a refusal to act on a privacy rights request, violating the Tennessee Information Protection Act.",
    "severity": "serious",
    "reference": "Tenn. Code Ann. § 47-18-32"
  },
  {
    "id": 231,
    "code": "TCPA-011",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Inaccessible or Delayed Email Unsubscribe Mechanism (CAN-SPAM)",
    "description": "Website\'s marketing unsubscribe link fails to process immediately, or requires more than 10 business days to remove the user from lists, violating CAN-SPAM Act rules.",
    "severity": "serious",
    "reference": "16 CFR § 316.5"
  },
  {
    "id": 232,
    "code": "TCPA-012",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Missing Valid Sender Identity and Postal Address (CAN-SPAM)",
    "description": "Website marketing emails do not contain a valid physical postal address of the sender or utilize misleading headers, violating federal CAN-SPAM requirements.",
    "severity": "critical",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 233,
    "code": "TCPA-013",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Missing Written Consent for Marketing Robocalls (TCPA)",
    "description": "Lead collection forms collect phone numbers and use them for automated marketing call campaigns without obtaining express prior written consent containing required TCPA disclosures.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 234,
    "code": "EAA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "E-Commerce Shopping Cart Keyboard Navigation Barriers (EAA)",
    "description": "Checkout page or shopping cart widget contains keyboard focus traps or cannot be operated via keyboard alone, violating European Accessibility Act requirements for e-commerce.",
    "severity": "critical",
    "reference": "EN 301 549 Clause 9.2.1 (EAA)"
  },
  {
    "id": 235,
    "code": "EAA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Lack of Alternative Media Formats in E-Commerce (EAA)",
    "description": "Website showcases products via video or audio media without providing captions or audio descriptions, violating e-commerce accessibility rules under the European Accessibility Act.",
    "severity": "serious",
    "reference": "EN 301 549 Clause 9.1.2 (EAA)"
  },
  {
    "id": 236,
    "code": "AODA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible Document Downloads (Ontario AODA)",
    "description": "Website offers public document downloads (PDFs, user manuals) that do not conform to WCAG 2.0 Level AA tagging and accessibility, violating Ontario AODA Section 14.",
    "severity": "serious",
    "reference": "AODA Section 14"
  },
  {
    "id": 237,
    "code": "ADA-237",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Keyboard Focus Trap in Modal Dialogues (ADA Title III)",
    "description": "Modal dialogues or cookie banners trap keyboard focus, preventing users from tabbing back to the main page content, violating accessibility standards.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 2.1.2"
  },
  {
    "id": 238,
    "code": "ADA-103",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible Media Players (ADA Title III)",
    "description": "Web media players lack accessible control labels or keyboard controls, blocking screen reader and keyboard users, violating ADA Title III requirements.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.1.1 & 4.1.2"
  },
  {
    "id": 239,
    "code": "EPRIV-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Consent Bypass on Mobile Responsive Layouts (ePrivacy)",
    "description": "Website consent banner does not render or is hidden on mobile layouts while tracking scripts are executed, bypassing user consent, violating ePrivacy Directive.",
    "severity": "critical",
    "reference": "Directive 2002/58/EC (ePrivacy)"
  },
  {
    "id": 240,
    "code": "FTCE-011",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fake AI Testimonials and Reviews (FTC Consumer Review Rule)",
    "description": "Website displays customer reviews or testimonials that are AI-generated or synthetic without displaying a clear, conspicuous disclosure indicating they are not genuine consumer reviews, violating the FTC Unfair Deceptive Review Rule.",
    "severity": "critical",
    "reference": "16 CFR Part 465"
  },
  {
    "id": 241,
    "code": "HIPAA-011",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Social Media Chat Leakage of Patient PHI (HIPAA)",
    "description": "Medical booking or client communication portal incorporates third-party social media chat widgets (e.g. Facebook Messenger) that transmit patient identifiers, violating HIPAA Privacy Rule.",
    "severity": "critical",
    "reference": "45 CFR § 164.502"
  },
  {
    "id": 242,
    "code": "HIPAA-012",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unsecure Transmission of Patient Records via SMS/Email (HIPAA)",
    "description": "Telehealth or medical intake forms send unencrypted patient health summaries via standard email or SMS networks, violating HIPAA Security Rule standards.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(e)"
  },
  {
    "id": 243,
    "code": "PCI-013",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Insecure Storage of Credit Card Data in LocalStorage (PCI-DSS v4.0)",
    "description": "Website saves primary account numbers (PAN), cardholder names, or CVVs in browser LocalStorage or SessionStorage, violating PCI-DSS data storage mandates.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 3.4.1"
  },
  {
    "id": 244,
    "code": "PCI-014",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Insecure Payment Scripts Execution on Checkout Pages (PCI-DSS v4.0)",
    "description": "Payment checkout runs externally loaded scripts without validating integrity or restricting access using Content Security Policies (CSP), violating PCI-DSS requirements.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.3"
  },
  {
    "id": 245,
    "code": "MHMDA-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Lack of Health Provider Verification for Sensitive Data (WA MHMDA)",
    "description": "Website collects sensitive physical/mental health data of Washington residents without verifying whether the recipient is a licensed healthcare provider, violating MHMDA.",
    "severity": "critical",
    "reference": "RCW 19.373 (MHMDA)"
  },
  {
    "id": 246,
    "code": "NIST-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing Web Portal Authentication Session Timeouts (NIST SP 800-53)",
    "description": "Customer portal or system panel does not automatically terminate inactive authenticated sessions after a reasonable period, violating NIST security controls.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (IA-11)"
  },
  {
    "id": 247,
    "code": "SOC2-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Missing System Availability Disclosures (SOC 2 Type II)",
    "description": "SaaS portal fails to provide a publicly accessible status or uptime tracking page, violating SOC 2 Trust Services Criteria regarding operational availability.",
    "severity": "moderate",
    "reference": "SOC 2 CC1.1 (Availability)"
  },
  {
    "id": 248,
    "code": "CYIN-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Undisclosed End-of-Life Software Platforms (Cyber Insurance)",
    "description": "SaaS website or underlying framework utilizes unsupported, end-of-life platforms without disclosing the risks to cyber underwriters, violating cyber insurance terms.",
    "severity": "serious",
    "reference": "Cyber Insurance Risk Standards"
  },
  {
    "id": 249,
    "code": "DORA-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing ICT Incident Reporting Capability (EU DORA)",
    "description": "Financial service platform fails to host a secure, dedicated portal for users to report operational ICT incidents, violating DORA Article 17.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 17"
  },
  {
    "id": 250,
    "code": "FTCS-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Missing Customer Portal Session Limits (FTC Safeguards)",
    "description": "Fintech portal fails to configure and enforce strict maximum session lengths for customer dashboard access, violating the FTC Safeguards Rule.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(c)(5)"
  },
  {
    "id": 251,
    "code": "DEPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Consumer Data Portability Format Option (Delaware DPDPA)",
    "description": "Website targeting Delaware consumers fails to provide personal data downloads in a portable, technically feasible, and readily usable format, violating Delaware\'s DPDPA.",
    "severity": "serious",
    "reference": "Delaware DPDPA (HB 154), Sec. 12C-5"
  },
  {
    "id": 252,
    "code": "MAPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Sale of Sensitive Personal Data Prohibited (Maryland MODPA)",
    "description": "Website collects and sells sensitive personal data (e.g. precise location, health, race) of Maryland consumers, which is strictly prohibited under the Maryland Online Data Privacy Act.",
    "severity": "critical",
    "reference": "Maryland MODPA (SB 541), Sec. 14-46"
  },
  {
    "id": 253,
    "code": "KYPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Consumer Right of Access Disclosure (Kentucky KCDPA)",
    "description": "Website targeting Kentucky residents fails to outline the clear, accessible process for consumers to confirm whether their data is processed and to access it, violating KCDPA.",
    "severity": "serious",
    "reference": "Kentucky KCDPA (SB 15), Sec. 4"
  },
  {
    "id": 254,
    "code": "RIPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Failure to Disclose Third-Party Sales in Privacy Notice (Rhode Island RIDTPPA)",
    "description": "Website targeting Rhode Island consumers fails to explicitly list all third parties to whom personal data is sold or shared in its privacy notice, violating RIDTPPA.",
    "severity": "serious",
    "reference": "Rhode Island RIDTPPA (SB 2502), Sec. 6"
  },
  {
    "id": 255,
    "code": "IAPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Consumer Right to Opt-Out of Data Sale (Iowa ICDPA)",
    "description": "Website targeting Iowa consumers fails to provide a clear, conspicuous link allowing users to opt-out of the sale of their personal data, violating the Iowa Consumer Data Protection Act.",
    "severity": "serious",
    "reference": "Iowa ICDPA (SF 262), Sec. 715C"
  },
  {
    "id": 256,
    "code": "FTCH-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Unlawful Sharing of Health Metrics with Trackers (FTC Health Breach Rule)",
    "description": "Website collects health, symptom, or wellness queries and shares them with third-party advertising trackers without explicit authorization, triggering FTC Health Breach Notification violations.",
    "severity": "critical",
    "reference": "16 CFR Part 318 (HBNR Rule)"
  },
  {
    "id": 257,
    "code": "NYDF-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Multi-Factor Authentication on Financial Portals (NYDFS)",
    "description": "Financial dashboard or client web panel under NYDFS jurisdiction fails to enforce multi-factor authentication (MFA) for all web logins, violating cybersecurity regulation 23 NYCRR Part 500.",
    "severity": "critical",
    "reference": "23 NYCRR Part 500, Sec. 500.12"
  },
  {
    "id": 258,
    "code": "BIPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Written Release for Biometric Collection (Illinois BIPA)",
    "description": "Website collects biometric identifiers (e.g. faceprints, voiceprints) without obtaining a signed, written release from the user prior to collection, violating BIPA Section 15(b).",
    "severity": "critical",
    "reference": "740 ILCS 14/15(b)"
  },
  {
    "id": 259,
    "code": "AADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Keyboard Focus Obscured by Sticky Elements (WCAG 2.2)",
    "description": "Website layout permits sticky headers, footers, or overlays to obscure the focus indicator of active input fields or buttons during keyboard navigation, violating WCAG 2.2 SC 2.4.11.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.11"
  },
  {
    "id": 260,
    "code": "AADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Insufficient Target Size for Interactive Elements (WCAG 2.2)",
    "description": "Interactive target elements (buttons, links, form inputs) are smaller than 24x24 CSS pixels without sufficient spacing, violating WCAG 2.2 Level AA guidelines for touch and pointer input.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.8"
  },
  {
    "id": 261,
    "code": "EUAI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Human Oversight Disclosures for High-Risk AI (EU AI Act)",
    "description": "Website deploying high-risk AI decision systems (e.g. candidate screening, credit evaluation) fails to disclose mechanisms for human oversight and intervention, violating AI Act Article 14.",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 14"
  },
  {
    "id": 262,
    "code": "EUAI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Post-Market Monitoring Plans for AI Systems (EU AI Act)",
    "description": "Provider of regulated AI systems fails to host or link to a publicly accessible post-market monitoring plan and incident reporting path, violating EU AI Act requirements.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 61"
  },
  {
    "id": 263,
    "code": "DSA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Non-Profiling Option for Recommender Systems (EU DSA)",
    "description": "Online platform utilizing recommender systems fails to provide users with at least one option that is not based on profiling (e.g. chronological feed instead of algorithmic feed), violating DSA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 38"
  },
  {
    "id": 264,
    "code": "DSA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Age Verification for Minor Protection (EU DSA)",
    "description": "Online platform accessible to minors fails to implement appropriate and proportionate age verification measures to ensure child safety online, violating DSA Article 28.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 28"
  },
  {
    "id": 265,
    "code": "NIS2-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing Incident Notification and Contact Channels (NIS2)",
    "description": "Website of a critical infrastructure or digital service provider fails to display clear incident notification procedures or contact paths for reporting cyber incidents, violating NIS2 requirements.",
    "severity": "serious",
    "reference": "EU Directive 2022/2555 (NIS2), Art. 21"
  },
  {
    "id": 266,
    "code": "GDPR-015",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Right to Restrict Processing Action Path (GDPR)",
    "description": "Website fails to provide users with a direct, online mechanism (form, switch, or email path) to exercise their right to restrict processing of personal data under GDPR Article 18.",
    "severity": "serious",
    "reference": "GDPR Article 18"
  },
  {
    "id": 267,
    "code": "EPRIV-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cookie Lifespan Exceeds Maximum Limits (ePrivacy Guidelines)",
    "description": "Website consent mechanism sets non-essential tracking cookies with expiration periods longer than 12 months without automated consent renewal prompts, violating ePrivacy guidelines.",
    "severity": "moderate",
    "reference": "ePrivacy Guidelines on Cookies, Sec. 4"
  },
  {
    "id": 268,
    "code": "GDPR-016",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Records of Processing Activities Disclosure summary (GDPR)",
    "description": "Website privacy notice fails to state that the company maintains records of processing activities (ROPA) and does not provide a summary for user visibility, violating GDPR Article 30.",
    "severity": "serious",
    "reference": "GDPR Article 30"
  },
  {
    "id": 269,
    "code": "EIDS-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Qualified Electronic Signatures Support (eIDAS 2.0)",
    "description": "Digital platform requiring signatures from EU citizens fails to recognize or support Qualified Electronic Signatures (QES) verified through European Trust Lists, violating eIDAS 2.0.",
    "severity": "moderate",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 6"
  },
  {
    "id": 270,
    "code": "GDPR-017",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Data Protection Impact Assessment (DPIA) Disclosures (GDPR)",
    "description": "Website privacy notice conducting high-risk processing (e.g. monitoring public areas or massive tracking) fails to state that a DPIA has been conducted and logged with the DPA.",
    "severity": "serious",
    "reference": "GDPR Article 35"
  },
  {
    "id": 271,
    "code": "ARPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Right to Rectification Portal (Argentina Law 25.326)",
    "description": "Website collecting data of Argentine residents fails to provide a dedicated path or clear instructions to request rectification or destruction of personal data, violating Law 25.326.",
    "severity": "serious",
    "reference": "Argentina Law 25.326, Art. 6"
  },
  {
    "id": 272,
    "code": "COPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Bundled Consent for Commercial Messaging (Colombia Law 1581)",
    "description": "Website collects data of Colombian residents and bundles marketing communications consent with the general registration agreement, violating Habeas Data Law 1581.",
    "severity": "serious",
    "reference": "Colombia Law 1581 of 2012, Art. 12"
  },
  {
    "id": 273,
    "code": "MXPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Separate ARCO Rights Actions (Mexico LFPDPPP)",
    "description": "Website collecting data of Mexican consumers fails to provide clear, actionable steps for users to exercise their ARCO (Access, Rectification, Cancellation, Opposition) rights, violating LFPDPPP.",
    "severity": "serious",
    "reference": "Mexico LFPDPPP, Art. 16"
  },
  {
    "id": 274,
    "code": "CHPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Cross-Border Transfer Disclosures (Switzerland FADP)",
    "description": "Website collects Swiss residents\' data and transfers it internationally (e.g. via external tracking APIs) without disclosing countries and security safeguards in its privacy policy.",
    "severity": "serious",
    "reference": "Switzerland FADP, Art. 16"
  },
  {
    "id": 275,
    "code": "POPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Default Opt-in Marketing Violation (South Africa POPIA)",
    "description": "Website sends electronic direct marketing to South African residents without getting explicit prior opt-in consent or sends it to users who have never consented, violating POPIA Section 69.",
    "severity": "serious",
    "reference": "South Africa POPIA 2013, Sec. 69"
  },
  {
    "id": 276,
    "code": "TRKV-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unauthorized Cross-Border Transfer without Adequate Safeguards (Turkey KVKK)",
    "description": "Website transfers personal data of Turkish residents to servers outside Turkey without obtaining explicit consent or demonstrating compliant standard contractual clauses, violating KVKK.",
    "severity": "serious",
    "reference": "Turkey Law 6698 (KVKK), Art. 9"
  },
  {
    "id": 277,
    "code": "AUPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Privacy Policy Contact and Access Procedure Details (Australia APP 1)",
    "description": "Privacy policy targeting Australian users lacks details on how individuals can access their personal data, seek correction, or complain about a breach of the APPs, violating APP 1.4.",
    "severity": "serious",
    "reference": "Australian Privacy Act 1988, APP 1.4"
  },
  {
    "id": 278,
    "code": "SGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Access and Correction Request Tracking System (Singapore PDPA)",
    "description": "Website fails to provide Singapore residents with a dedicated email or automated portal to request confirmation of their data processed within the past year, violating Singapore PDPA.",
    "severity": "moderate",
    "reference": "Singapore PDPA 2012, Sec. 21"
  },
  {
    "id": 279,
    "code": "THPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Cross-Border Transfer to Non-Adequate Countries without Consent (Thailand PDPA)",
    "description": "Website transfers personal data of Thai residents to third countries that do not have adequate data protection standards without obtaining explicit consent, violating PDPA Section 28.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562, Sec. 28"
  },
  {
    "id": 280,
    "code": "PHDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate Disclosure of Right to Object to Processing (Philippines DPA)",
    "description": "Website privacy notice targeting Philippines residents fails to explicitly state the user\'s right to object to the processing of their personal data, including for marketing purposes.",
    "severity": "serious",
    "reference": "Philippines Data Privacy Act 2012, Sec. 16"
  },
  {
    "id": 281,
    "code": "FTCD-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Deceptive Subscription Price Increases Without Consent (FTC)",
    "description": "Website implements automated subscription renewals at higher rates without notifying users and obtaining explicit consent prior to billing the updated price, violating FTC rules.",
    "severity": "serious",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 282,
    "code": "FTCD-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Pre-ticked Optional Add-on Items at Checkout (FTC)",
    "description": "E-commerce checkout flow defaults optional services, warranties, or add-on products to pre-checked states, utilizing consumer inertia to inflate transaction costs.",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 283,
    "code": "TCPA-014",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Failure to Maintain Internal Do Not Call (DNC) Registry (TCPA)",
    "description": "Lead capture website fails to maintain and document an internal Do Not Call (DNC) list and procedures for managing marketing contact requests, violating TCPA rules.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200(d)"
  },
  {
    "id": 284,
    "code": "TCPA-015",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Unsubscribe Requests Require Fees or Logins (CAN-SPAM)",
    "description": "Website marketing unsubscribe links force users to log in, fill complex surveys, or pay processing fees to opt-out of emails, violating CAN-SPAM regulations.",
    "severity": "serious",
    "reference": "16 CFR § 316.5"
  },
  {
    "id": 285,
    "code": "EAA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible Digital Invoice/Receipt Outputs for E-Commerce (EAA)",
    "description": "Online store generates order confirmation pages or downloadable receipts that are formatted as flat images or inaccessible PDFs, blocking screen reader access, violating EAA.",
    "severity": "critical",
    "reference": "EN 301 549 Clause 11.2 (EAA)"
  },
  {
    "id": 286,
    "code": "AODA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Submission Channel (Ontario AODA)",
    "description": "Website fails to provide an accessible online path or form specifically dedicated to receiving feedback regarding accessibility issues from disabled users, violating AODA.",
    "severity": "serious",
    "reference": "AODA Section 12"
  },
  {
    "id": 287,
    "code": "ADA-104",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Text Scaling Breaks Page Layout at 200% (ADA Title III)",
    "description": "Website layout breaks, overlaps, or truncates text when browser zoom is set to 200% without assistive tech, violating WCAG 2.1 SC 1.4.4 scaling standards.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.4.4"
  },
  {
    "id": 288,
    "code": "ADA-105",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inability to Adjust or Extend Form Session Limits (ADA Title III)",
    "description": "Forms with timing restrictions (e.g. checkout ticket reservations) do not allow users to disable, adjust, or extend the limit before timeout, violating WCAG 2.1 SC 2.2.1.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.2.1"
  },
  {
    "id": 289,
    "code": "EPRIV-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Consent Banner Cookie Settings Block Keyboard Users",
    "description": "Cookie consent banner and its 'Manage Settings' panel cannot be fully closed or navigated via keyboard TAB keys, rendering the website functionally non-compliant.",
    "severity": "critical",
    "reference": "ePrivacy Directive, Art. 5(3)"
  },
  {
    "id": 290,
    "code": "FTCE-012",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Unlabeled Affiliate Links and Sponsored Content (FTC Endorsement Guides)",
    "description": "Website displays product links earning commission or sponsored content blocks without displaying clear, immediate labels (e.g. 'Affiliate Link' or 'Sponsored') near the links.",
    "severity": "critical",
    "reference": "16 CFR Part 255"
  },
  {
    "id": 291,
    "code": "W3CR-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Risks Disclosure for Token Transactions in dApp (SEC)",
    "description": "Web3 interface facilitating token swaps or financial transactions fails to display a clear risk disclosure regarding token volatility and regulatory status on its swap panel.",
    "severity": "serious",
    "reference": "SEC Guidance on Digital Assets"
  },
  {
    "id": 292,
    "code": "W3CR-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "dApp Fails to Validate API Endpoint Integrity (NIST SP 1800-34)",
    "description": "Decentralized web application connects to RPC nodes or APIs without verifying response signatures, allowing man-in-the-middle attacks to show false wallet balances.",
    "severity": "critical",
    "reference": "NIST SP 1800-34 (Data Integrity)"
  },
  {
    "id": 293,
    "code": "PCI-015",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Front-end Execution of Scripts from Non-Authorized Domains (PCI-DSS v4.0)",
    "description": "Checkout or payment interfaces load and run JavaScript files hosted on non-whitelisted domains, violating strict payment interface security rules under PCI-DSS v4.0.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.1"
  },
  {
    "id": 294,
    "code": "PCI-016",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Customer Portal Session Replay Scripts Enabled on Password Inputs (PCI-DSS)",
    "description": "Session recording tools (e.g. Hotjar, FullStory) run on customer portals without masking or excluding sensitive input fields like password, cardholder, or CVV inputs.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 8.3"
  },
  {
    "id": 295,
    "code": "CYIN-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Incident Response Plan Reference (Cyber Insurance)",
    "description": "SaaS system interface fails to display a mechanism for users to request security incident disclosure reports, which is required for cyber liability insurance underwriting.",
    "severity": "serious",
    "reference": "NIST Cybersecurity Framework (CSF)"
  },
  {
    "id": 296,
    "code": "DORA-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "ICT Systems Major Incident Log Reporting Lack (EU DORA)",
    "description": "EU financial entity web console fails to provide or link to logs of major ICT related incidents for transparency to users and regulatory authorities, violating DORA Article 18.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 18"
  },
  {
    "id": 297,
    "code": "FTCS-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Missing Risk Assessment Log Disclosures (FTC Safeguards)",
    "description": "Financial or fintech portal fails to publish or reference in its security notices that it conducts periodic risk assessments on customer data storage databases.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(d)"
  },
  {
    "id": 298,
    "code": "SOC2-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Access Revocation Notification (SOC 2 Type II)",
    "description": "Customer console does not record logs of revoked administrative tokens or display active sessions with direct termination paths, violating SOC 2 CC6.3 security controls.",
    "severity": "moderate",
    "reference": "SOC 2 CC6.3 (Access Controls)"
  },
  {
    "id": 299,
    "code": "NIST-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Lack of User Account Management Audit Logs (NIST SP 800-53)",
    "description": "Website client cabinet fails to generate audit trails for user account creation, privilege modification, or deletion actions, violating NIST cybersecurity standards.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (AC-2)"
  },
  {
    "id": 300,
    "code": "HIPAA-013",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Missing Identity Verification Prior to Accessing PHI (HIPAA)",
    "description": "Patient intake portal or symptom tracker allows users to access historical records or Protected Health Information (PHI) without executing verified multi-step identity validation.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(d)"
  },
  {
    "id": 301,
    "code": "MCDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Consumer Right to Correct Inaccurate Personal Data (Minnesota MCDPA)",
    "description": "Website privacy flow fails to provide Minnesota consumers with an accessible path to correct inaccuracies in their collected personal data, violating the MCDPA.",
    "severity": "serious",
    "reference": "Minnesota MCDPA, Sec. 325O.04"
  },
  {
    "id": 302,
    "code": "TXSC-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inadequate Advertising Restrictions on Social Platforms for Minors (Texas SCOPE)",
    "description": "Social media platform targeting Texas minors serves targeted advertising based on profiling of under-18 accounts, violating the SCOPE Act.",
    "severity": "critical",
    "reference": "Texas SCOPE Act, Sec. 509.052"
  },
  {
    "id": 303,
    "code": "UTSM-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Default DM Block Between Minors and Non-Parents (Utah SMRA)",
    "description": "Social media web application fails to block direct messaging features between minor accounts and accounts of users who are not verified parents/guardians, violating Utah SMRA.",
    "severity": "critical",
    "reference": "Utah SMRA, Sec. 13-63-201"
  },
  {
    "id": 304,
    "code": "FLDB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Search Results Bias Disclosure Failure (Florida FDBR)",
    "description": "Search engine or directory platform targeting Florida residents fails to disclose the parameters used to rank search results when algorithmic filtering is active, violating FDBR.",
    "severity": "critical",
    "reference": "Florida FDBR, Sec. 501.714"
  },
  {
    "id": 305,
    "code": "CTDP-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Profiling Minors for Commercial Purposes (Connecticut SB 3)",
    "description": "Website targeting Connecticut minors compiles personal profiles for targeted marketing or product recommendations without express written consent from the minor or guardian.",
    "severity": "critical",
    "reference": "CTDPA SB 3, Sec. 5"
  },
  {
    "id": 306,
    "code": "CAAD-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Obvious Interactive Dark Patterns Targeting Children (CA AADC)",
    "description": "Website likely to be accessed by minors uses deceptive game mechanics or styling to nudge children into spending money or disclosing email addresses, violating AADC.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 307,
    "code": "MDAD-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Default Tracking Active for Children (Maryland MODPA)",
    "description": "Online service targeting Maryland residents fails to deactivate behavioral trackers by default for users identified as under 18 years old, violating MODPA.",
    "severity": "serious",
    "reference": "Maryland MODPA, Sec. 14-45"
  },
  {
    "id": 308,
    "code": "INDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Sensitive Data Processing Disclosures (Indiana CDPA)",
    "description": "Privacy notice targeting Indiana residents fails to explicitly state the categories of sensitive personal data processed and the specific purposes, violating the CDPA.",
    "severity": "critical",
    "reference": "Indiana CDPA, Sec. 24-15-4"
  },
  {
    "id": 309,
    "code": "TNIP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inadequate Response Time for Data Rights Requests (Tennessee TIPA)",
    "description": "Website privacy workflow fails to guarantee and execute response to consumer privacy rights requests within the mandated 45-day window, violating TIPA.",
    "severity": "serious",
    "reference": "Tennessee TIPA, Sec. 47-18"
  },
  {
    "id": 310,
    "code": "NHPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Right to Deletion Actions for New Hampshire Consumers (NHPA)",
    "description": "Website fails to provide New Hampshire residents with a clear, automated method to delete personal data collected, violating the New Hampshire Privacy Act.",
    "severity": "serious",
    "reference": "New Hampshire Privacy Act, Sec. 507-H.4"
  },
  {
    "id": 311,
    "code": "AADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Redundant Data Entry Required in Multi-step Forms (WCAG 2.2)",
    "description": "Multi-step registration or checkout forms require users to re-enter previously provided information in the same session without offering auto-fill, violating WCAG 2.2 SC 3.3.7.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 3.3.7"
  },
  {
    "id": 312,
    "code": "AADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible Authentication via Cognitive Function Tests (WCAG 2.2)",
    "description": "Website authentication requires cognitive function tests (like solving puzzles or writing codes from images) without providing an alternative, accessible login method, violating WCAG 2.2 SC 3.3.8.",
    "severity": "critical",
    "reference": "WCAG 2.2 SC 3.3.8"
  },
  {
    "id": 313,
    "code": "AADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inconsistent Location of Help and Support Contacts (WCAG 2.2)",
    "description": "Website displays support contacts, chats, or FAQ paths in different locations on different pages (e.g. top right on homepage, bottom left on checkout), violating WCAG 2.2 SC 3.2.6.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 3.2.6"
  },
  {
    "id": 314,
    "code": "AADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Dragging Movements Required Without Single-pointer Alternatives (WCAG 2.2)",
    "description": "Website requires dragging movements (e.g. custom sliders, maps, or drag-and-drop lists) without supporting click-or-tap alternatives for single-pointer inputs, violating WCAG 2.2 SC 2.5.7.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.7"
  },
  {
    "id": 315,
    "code": "AADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Horizontal Scrolling Triggered on Desktop Layouts (WCAG 2.1)",
    "description": "Website layout forces horizontal scrolling when viewed at a width of 320 CSS pixels or scaled, blocking easy reading, violating WCAG 2.1 SC 1.4.10.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.4.10"
  },
  {
    "id": 316,
    "code": "AADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Text Spacing Adjustments Lead to Overlapping Text (WCAG 2.1)",
    "description": "Custom client-side font spacing adjustments (line height, letter spacing) cause page text elements to overlap or truncate, violating WCAG 2.1 SC 1.4.12.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 1.4.12"
  },
  {
    "id": 317,
    "code": "AADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Unstoppable Auto-playing Media and Carousels (WCAG 2.1)",
    "description": "Website includes auto-playing sliders, banners, or video background media that cannot be paused, stopped, or hidden by the user, violating WCAG 2.1 SC 2.2.2.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 2.2.2"
  },
  {
    "id": 318,
    "code": "AADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Input Placeholders or Context Clues (WCAG 2.1)",
    "description": "Form inputs requiring specific formats (e.g. dates, phone numbers) do not provide placeholders, description hints, or context instructions, violating WCAG 2.1 SC 3.3.2.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 3.3.2"
  },
  {
    "id": 319,
    "code": "AADA-011",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Status Messages Not Announced by Screen Readers (WCAG 2.1)",
    "description": "Dynamic status updates (e.g. 'Saved successfully' notifications or inline validation messages) appear in DOM without `role=\"status\"` or `aria-live=\"polite\"`, hiding them from screen readers.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 4.1.3"
  },
  {
    "id": 320,
    "code": "AADA-012",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Illogical Tab Navigation Order (WCAG 2.1)",
    "description": "Keyboard navigation focus path traverses the page in an illogical or random order, failing to match visual reading layouts, violating WCAG 2.1 SC 2.4.3.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.4.3"
  },
  {
    "id": 321,
    "code": "GDPR-018",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Encryption Standards for Collected Data Not Disclosed (GDPR)",
    "description": "Website privacy notice collects sensitive personal data but fails to state the encryption methods (e.g. AES-256) used during storage and transport, violating GDPR Article 32.",
    "severity": "serious",
    "reference": "GDPR Article 32"
  },
  {
    "id": 322,
    "code": "GDPR-019",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Adequacy Decision Disclosures for External Transfers (GDPR)",
    "description": "Privacy notice transfers data outside the EEA but fails to disclose whether destination countries are subject to an EC adequacy decision or state the specific safeguards deployed.",
    "severity": "moderate",
    "reference": "GDPR Article 13(1)(f)"
  },
  {
    "id": 323,
    "code": "GDPR-020",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Lack of Data Breach Mitigation Instructions for Users (GDPR)",
    "description": "Website fails to display instructions, direct email forms, or contact details explaining how users will be notified and what actions they should take during a personal data breach.",
    "severity": "serious",
    "reference": "GDPR Article 34"
  },
  {
    "id": 324,
    "code": "PIPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Specific Storage Location Disclosures (Canada PIPEDA)",
    "description": "Privacy policy targeting Canadian residents collects personal data but fails to disclose the specific geographic locations (provinces/countries) where data is stored, violating PIPEDA.",
    "severity": "serious",
    "reference": "PIPEDA Principle 4.5"
  },
  {
    "id": 325,
    "code": "PIPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Access Request Processing Costs Notice (Canada PIPEDA)",
    "description": "Website privacy notice targeting Canadian residents fails to state whether there are processing costs associated with formal personal data access requests, violating PIPEDA.",
    "severity": "serious",
    "reference": "PIPEDA Principle 4.9"
  },
  {
    "id": 326,
    "code": "JPAP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Disclose Purposes of Shared Cookie Identifiers (Japan APPI)",
    "description": "Website targeting Japanese users shares third-party advertising identifiers or cookies without disclosing the exact advertising and analytical purposes of the recipients in its cookie statement.",
    "severity": "serious",
    "reference": "Japan APPI, Art. 27"
  },
  {
    "id": 327,
    "code": "NZPR-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unlawful Retention of Personal Data Beyond Needed Duration (New Zealand Privacy Act)",
    "description": "Website targeting New Zealand residents lacks automated policies or disclosures specifying that personal data will not be kept for longer than is required for lawful purposes, violating IPP 4.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, IPP 4"
  },
  {
    "id": 328,
    "code": "THPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate Disclosure of Right to Request Data Deletion (Thailand PDPA)",
    "description": "Website targeting Thai users has a privacy policy that does not state the consumer\'s right to request erasure, destruction, or de-identification of their personal data under the PDPA.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562, Sec. 30"
  },
  {
    "id": 329,
    "code": "PHDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Disclose Procedures for Filing Complaints with DPA (Philippines DPA)",
    "description": "Website privacy policy targeting Philippines consumers fails to explain how users can file a formal complaint regarding data breaches with the National Privacy Commission (NPC).",
    "severity": "moderate",
    "reference": "Philippines Data Privacy Act 2012, Sec. 34"
  },
  {
    "id": 330,
    "code": "LGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Privacy Policy Updates Not Prominently Notified (Brazil LGPD)",
    "description": "Website makes significant changes to processing methods or privacy policies without notifying Brazilian users through clear site alerts or emails, violating LGPD Article 9.",
    "severity": "serious",
    "reference": "Brazil LGPD, Art. 9"
  },
  {
    "id": 331,
    "code": "GLBA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Consumer Right to Opt-Out of Sharing with Non-Affiliates (GLBA)",
    "description": "Fintech or financial dashboard under GLBA jurisdiction fails to provide users with an opt-out path before sharing nonpublic personal info with non-affiliated third parties.",
    "severity": "serious",
    "reference": "16 CFR Part 313.9"
  },
  {
    "id": 332,
    "code": "SEC-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Administrative Policies Safeguarding Customer Information Disclosures (SEC)",
    "description": "Website of a SEC-registered investment advisor fails to display or link to policies outlining physical and technical safeguards for client records, violating Regulation S-P.",
    "severity": "serious",
    "reference": "SEC Regulation S-P, Sec. 248.30"
  },
  {
    "id": 333,
    "code": "PCI-017",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inventory of External Software Components Missing (PCI-DSS v4.0)",
    "description": "Website payment flow uses external software libraries, frames, or scripts without maintaining an active, documented inventory of all software components, violating PCI-DSS Req 6.3.2.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.3.2"
  },
  {
    "id": 334,
    "code": "PCI-018",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Failure to Document Cryptographic Key Management (PCI-DSS v4.0)",
    "description": "Website handling cardholder transactions fails to document or publish summaries of cryptographical algorithms and key management procedures used to encrypt card data.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 12.3.2"
  },
  {
    "id": 335,
    "code": "CYIN-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Lack of Vulnerability Disclosure Program Notice (Cyber Insurance)",
    "description": "Corporate website fails to publish a Vulnerability Disclosure Program (VDP) or safe harbor policy for white-hat security researchers, which is required for cyber insurance compliance.",
    "severity": "serious",
    "reference": "Cyber Insurance Security Requirements"
  },
  {
    "id": 336,
    "code": "DORA-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Lack of Third-Party ICT Provider Criticality Level Disclosures (EU DORA)",
    "description": "Web dashboard of a financial system does not list or categorise the criticality levels of its third-party cloud and infrastructure providers, violating DORA transparency rules.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 28"
  },
  {
    "id": 337,
    "code": "FTCS-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Missing Employee Security Training Reference (FTC Safeguards)",
    "description": "Financial dashboard privacy notice fails to state that the company conducts annual employee security training regarding consumer data protection, violating the FTC Safeguards Rule.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(e)"
  },
  {
    "id": 338,
    "code": "SOC2-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Patch Management Disclosures (SOC 2 Type II)",
    "description": "Customer-facing SaaS portal fails to reference or document patch management timelines and procedures for resolving known system vulnerabilities, violating SOC 2 CC7.1.",
    "severity": "moderate",
    "reference": "SOC 2 CC7.1 (Vulnerability Management)"
  },
  {
    "id": 339,
    "code": "NIST-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Lack of Web Traffic and Intrusion Monitoring Disclosures (NIST SP 800-53)",
    "description": "Security notice of a digital platform does not state whether it employs active intrusion detection or web application firewalls (WAF) to monitor incoming network traffic, violating NIST SI-4.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (SI-4)"
  },
  {
    "id": 340,
    "code": "HIPAA-014",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Inadequate Cybersecurity Risk Analysis Disclosures (HIPAA Security Rule)",
    "description": "Patient onboarding application fails to confirm in its privacy policy that it conducts periodic risk analyses to assess potential security vulnerabilities to PHI, violating HIPAA Security Rule.",
    "severity": "critical",
    "reference": "45 CFR § 164.308(a)(1)"
  },
  {
    "id": 341,
    "code": "MDAD-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Profiling Children for Targeted Ads (Maryland MODPA)",
    "description": "Website targeting Maryland consumers enables targeted advertising profiling on accounts of users known to be under 18 years old, violating the Online Data Privacy Act.",
    "severity": "critical",
    "reference": "Maryland MODPA, Sec. 14-46"
  },
  {
    "id": 342,
    "code": "TXSC-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Collection of Minor Location History Without Parent Verification (Texas SCOPE)",
    "description": "Web application collects and maintains historical location tracking records of users verified or suspected to be minors without obtaining verified parental consent, violating SCOPE.",
    "severity": "critical",
    "reference": "Texas SCOPE Act, Sec. 509.053"
  },
  {
    "id": 343,
    "code": "UTSM-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Algorithmic Recommendations to Minors (Utah SMRA)",
    "description": "Social media platform targeting Utah minors utilizes predictive algorithms or personalized recommendations on minor accounts without verified parental consent, violating SMRA.",
    "severity": "critical",
    "reference": "Utah SMRA, Sec. 13-63-301"
  },
  {
    "id": 344,
    "code": "FLDB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Personal Data Sales Clear Opt-out Link (Florida FDBR)",
    "description": "Website targeting Florida consumers fails to host a clear, conspicuous link titled \"Do Not Sell My Personal Information\" on its homepage, violating Florida FDBR.",
    "severity": "critical",
    "reference": "Florida FDBR, Sec. 501.715"
  },
  {
    "id": 345,
    "code": "CTDP-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Geolocation Data Selling Without Consent (Connecticut SB 3)",
    "description": "Website targeting Connecticut consumers sells precise geolocation coordinates collected from mobile or web interfaces without obtaining prior explicit opt-in consent.",
    "severity": "critical",
    "reference": "Connecticut SB 3, Sec. 6"
  },
  {
    "id": 346,
    "code": "CAAD-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Absence of Child Safety Impact Assessment Rationale Disclosures (CA AADC)",
    "description": "Website likely to be accessed by minors fails to detail in its privacy notice the security safeguards implemented based on child data impact assessments, violating AADC.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 347,
    "code": "BIPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Selling Biometric Identifiers Prohibited (Illinois BIPA)",
    "description": "Website selling or sharing biometric data (e.g. voice templates, face recognition markers) of Illinois residents for commercial profit, which is strictly prohibited under BIPA.",
    "severity": "critical",
    "reference": "740 ILCS 14/15(c)"
  },
  {
    "id": 348,
    "code": "HIPAA-015",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Inadequate De-identification of Patient Research Records (HIPAA Privacy)",
    "description": "Health portal publishes clinical summaries or symptom databases containing zip codes or exact birth dates, failing to meet strict Safe Harbor de-identification rules under HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.514(b)"
  },
  {
    "id": 349,
    "code": "DORA-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Contractual Clause Safeguard Summaries (EU DORA)",
    "description": "Financial dashboard fails to disclose that its contracts with critical ICT providers contain mandatory security and data portability clauses, violating DORA Article 30.2.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30.2"
  },
  {
    "id": 350,
    "code": "FTCS-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Missing Incident Response Policy Summary (FTC Safeguards)",
    "description": "Fintech portal fails to reference or display in its security disclosures a summary of its written Incident Response Plan (IRP) for customer data breaches, violating FTC Safeguards.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(g)"
  },
  {
    "id": 351,
    "code": "ADA-106",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Focus Appearance (Minimum) Violation",
    "description": "The website's keyboard focus indicator lacks the minimum area or contrast against adjacent colors, making it difficult for keyboard-only users to see which element is active, violating WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.11"
  },
  {
    "id": 352,
    "code": "ADA-107",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Focus Obscured by Sticky Elements",
    "description": "Interactive elements focused via keyboard are fully or partially covered by sticky headers, footers, or floating overlays, preventing screen visibility, violating WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.12"
  },
  {
    "id": 353,
    "code": "ADA-108",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Dragging Movements Lack Click Alternatives",
    "description": "Dragging gestures (e.g. slider controls, kanban boards) lack single-point click/tap alternatives, blocking users with motor impairments, violating WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.7"
  },
  {
    "id": 354,
    "code": "ADA-109",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Sub-Minimum Interactive Target Size",
    "description": "Interactive targets (buttons, links) are smaller than 24x24 CSS pixels without sufficient spacing, causing mis-clicks for touch and motor-impaired users, violating WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.8"
  },
  {
    "id": 355,
    "code": "ADA-110",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Redundant Form Data Entry Requirement",
    "description": "Forms require users to re-enter information previously submitted in the same session instead of auto-populating or providing selection options, violating WCAG 2.2.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 3.3.7"
  },
  {
    "id": 356,
    "code": "ADA-111",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible Multi-Factor Authentication",
    "description": "Authentication flow forces cognitive tests (e.g. memorizing passwords, transcribing codes, solving puzzles) without providing a copy-paste or hardware key alternative, violating WCAG 2.2.",
    "severity": "critical",
    "reference": "WCAG 2.2 SC 3.3.8"
  },
  {
    "id": 357,
    "code": "ADA-112",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Focus Obscured (Enhanced Level)",
    "description": "Interactive elements are fully visible when focused, without any overlap from layouts under stricter accessibility audits, violating WCAG 2.2 AAA standards.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 2.4.13"
  },
  {
    "id": 358,
    "code": "ADA-113",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Cognitive Authentication Exclusion (Enhanced)",
    "description": "Login forms entirely omit cognitive tests (including object recognition and pattern spelling), relying solely on accessible authentications, violating WCAG 2.2 AAA.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 3.3.9"
  },
  {
    "id": 359,
    "code": "ADA-114",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessible Video Transcripts",
    "description": "Embedded videos with educational or commercial info lack synchronized or linked full text transcripts, creating barriers for deaf-blind users, violating ADA Title III.",
    "severity": "serious",
    "reference": "ADA Title III / WCAG SC 1.2.8"
  },
  {
    "id": 360,
    "code": "ADA-115",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Captions for Pre-recorded Media",
    "description": "Marketing or product preview videos fail to offer accurate closed captions (CC), blocking access for deaf or hard-of-hearing site visitors, violating ADA Title III.",
    "severity": "critical",
    "reference": "ADA Title III / WCAG SC 1.2.2"
  },
  {
    "id": 361,
    "code": "HIPAA-016",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Insecure Patient Appointment Forms",
    "description": "Online booking interfaces pass Protected Health Information (PHI) like medical conditions or physician names within unencrypted URL parameters, violating HIPAA Security standards.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(e)(1)"
  },
  {
    "id": 362,
    "code": "HIPAA-017",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unauthorized Marketing Pixels on Booking Screens",
    "description": "Patient schedule systems execute analytics or advertising trackers (e.g. Meta Pixel) without obtaining explicit, signed HIPAA authorizations from patients, leading to massive regulatory fines.",
    "severity": "critical",
    "reference": "45 CFR § 164.508"
  },
  {
    "id": 363,
    "code": "HIPAA-018",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Lack of Portal Access Activity Logging",
    "description": "Health portal database fails to log viewer identity, timestamp, and actions when sensitive patient records or lab results are loaded, violating HIPAA Security Rule auditing requirements.",
    "severity": "serious",
    "reference": "45 CFR § 164.312(b)"
  },
  {
    "id": 364,
    "code": "HIPAA-019",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Undated Notice of Privacy Practices",
    "description": "The Notice of Privacy Practices (NPP) hosted on a medical clinic's website fails to prominently display its effective date, violating HIPAA Privacy Rule disclosure mandates.",
    "severity": "moderate",
    "reference": "45 CFR § 164.520"
  },
  {
    "id": 365,
    "code": "HIPAA-020",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Non-Compliant Health Data Deletion Process",
    "description": "Health portal fails to honor consumer deletion requests for collected non-HIPAA health tracking details within the statutory 30-day window under Washington My Health My Data Act.",
    "severity": "serious",
    "reference": "RCW 19.373.040"
  },
  {
    "id": 366,
    "code": "HIPAA-021",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Missing MHMDA Consumer Health Opt-In",
    "description": "A health-tracking website collects wellness indices or condition queries from Washington consumers without obtaining a separate, explicit opt-in consent banner, violating MHMDA.",
    "severity": "critical",
    "reference": "RCW 19.373.030"
  },
  {
    "id": 367,
    "code": "HIPAA-022",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Insecure Storage of Prescription Uploads",
    "description": "Portal file uploads for prescriptions or doctor notes are placed in public cloud directories or accessible via easily guessable URLs, violating HIPAA security standards.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(a)(2)(iv)"
  },
  {
    "id": 368,
    "code": "HIPAA-023",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Lack of Patient Portal Automatic Logoff",
    "description": "Electronic medical portal sessions remain active indefinitely after user inactivity, exposing patient charts to unauthorized physical access, violating HIPAA Security Rule protocols.",
    "severity": "serious",
    "reference": "45 CFR § 164.312(a)(2)(iii)"
  },
  {
    "id": 369,
    "code": "HIPAA-024",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Shared Patient Portal Administrative Credentials",
    "description": "Medical clinic staff access patient portal backends using a shared generic login ID, making audits of record alterations impossible, violating HIPAA's Unique User requirement.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(a)(1)"
  },
  {
    "id": 370,
    "code": "HIPAA-025",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "De-identification Failures in Portal Reports",
    "description": "Portal export functions compile statistical reports while leaving identifiable patient birthdates or zip codes exposed without proper de-identification, violating HIPAA Privacy guidelines.",
    "severity": "serious",
    "reference": "45 CFR § 164.514(b)"
  },
  {
    "id": 371,
    "code": "CCPA-011",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Dark Patterns in Consent Opt-Out Links",
    "description": "The required 'Do Not Sell or Share My Personal Information' option is formatted in a way that is hard to click or styled to look inactive compared to the accept buttons, violating CCPA.",
    "severity": "critical",
    "reference": "11 CCR § 7004"
  },
  {
    "id": 372,
    "code": "CCPA-012",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Lack of Global Privacy Control (GPC) Verification Logs",
    "description": "The website's consent manager fails to maintain internal logs showing that user GPC signals were honored and processing scripts deactivated, violating California CPPA audit readiness.",
    "severity": "serious",
    "reference": "11 CCR § 7025"
  },
  {
    "id": 373,
    "code": "CCPA-013",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Notice of Financial Incentive",
    "description": "E-commerce popups offer discounts in exchange for newsletter signup (email collection) without providing a linked, detailed Notice of Financial Incentive, violating CCPA.",
    "severity": "serious",
    "reference": "11 CCR § 7016"
  },
  {
    "id": 374,
    "code": "CCPA-014",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Non-Compliant Employee & Applicant Privacy Notice",
    "description": "Job application forms and internal intranet portals lack a detailed privacy disclosure specifically outlining how employee and applicant personal data is handled under CPRA.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.100"
  },
  {
    "id": 375,
    "code": "CCPA-015",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Sensitive Data Retention Periods",
    "description": "Privacy policy fails to state the specific retention period (or criteria used to determine it) for each category of collected sensitive personal information, violating California Civ. Code.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.130"
  },
  {
    "id": 376,
    "code": "CCPA-016",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Lack of Portal for Right to Correct",
    "description": "User account cabinet fails to offer a clear, self-service interface or form allowing California consumers to correct inaccurate personal data on record, violating CPRA.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.106"
  },
  {
    "id": 377,
    "code": "CCPA-017",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Implicit Sensitive Geolocation Tracking",
    "description": "The web app tracks precise coordinates within a 1,850-foot radius without presenting a clear prompt to restrict the use of sensitive personal information, violating CCPA.",
    "severity": "critical",
    "reference": "11 CCR § 7027"
  },
  {
    "id": 378,
    "code": "CCPA-018",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Incomplete Authorized Agent Procedural Disclosure",
    "description": "The privacy policy fails to explain verification procedures and forms required when a consumer exercises rights via a third-party authorized agent, violating CCPA.",
    "severity": "moderate",
    "reference": "11 CCR § 7063"
  },
  {
    "id": 379,
    "code": "CCPA-019",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Privacy Request Annual Metrics",
    "description": "Businesses processing personal details of 10,000,000+ California consumers fail to compile and publish annual statistics of received and handled requests, violating CCPA regulations.",
    "severity": "moderate",
    "reference": "11 CCR § 7102"
  },
  {
    "id": 380,
    "code": "CCPA-020",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Default Profiling of Under-18 Consumers",
    "description": "Online services likely accessed by children enable default behavioral profiling, targeted advertising, or background geolocation tracking, violating California Age-Appropriate Design Code.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 381,
    "code": "FTC-011",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Subscription Deceptive Auto-Renewal Obstacles",
    "description": "Web checkout enrolls users in recurring billing but fails to offer an easy, client-side button to cancel online, violating ROSCA and FTC enforcement guidelines.",
    "severity": "critical",
    "reference": "15 U.S.C. § 8403"
  },
  {
    "id": 382,
    "code": "FTC-012",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fake Scarcity Countdown Timers",
    "description": "E-commerce checkout renders countdown timers claiming 'offer expires soon' that reset automatically on page reload, classified by the FTC as deceptive dark patterns.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 383,
    "code": "FTC-013",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Pre-Checked Optional Marketing Consents",
    "description": "Sign-up or checkout screens pre-check checkboxes subscribing users to optional promotions or secondary partner communications, violating FTC section 5 deceptive standards.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 384,
    "code": "FTC-014",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fake Review Data Embedded in Client Bundles",
    "description": "Product landing pages display customer reviews hardcoded in JavaScript bundles with randomized dates to appear recent, violating the FTC rule on deceptive reviews.",
    "severity": "critical",
    "reference": "16 CFR Part 465"
  },
  {
    "id": 385,
    "code": "FTC-015",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Deceptive Checkout Junk Fees",
    "description": "Online payment flows conceal service fees, transaction surcharges, or hidden admin costs until the final transaction confirmation screen, violating FTC Section 5 standards.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 386,
    "code": "FTC-016",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Automatic E-Commerce Shopping Cart Additions",
    "description": "Cart interfaces automatically add paid warranties, shipping insurance, or donation items without explicit consumer selections, violating FTC guidelines against dark patterns.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 387,
    "code": "FTC-017",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Lack of Multi-Factor Authentication for Financial Portals",
    "description": "Web consoles providing access to consumer credit information fail to mandate Multi-Factor Authentication (MFA) for internal staff access, violating the FTC Safeguards Rule.",
    "severity": "critical",
    "reference": "16 CFR § 314.4(c)(5)"
  },
  {
    "id": 388,
    "code": "FTC-018",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Invalid Parental Consent Process on Child Portals",
    "description": "Portals aimed at children collect data using simple checkboxes or unverified email returns for parental approval instead of statutory verification methods under COPPA rules.",
    "severity": "critical",
    "reference": "16 CFR § 312.5"
  },
  {
    "id": 389,
    "code": "FTC-019",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Ad Pixel Data Sharing on Health Searches",
    "description": "Non-HIPAA wellness platforms transmit condition searches, queries, or selections to advertising networks via trackers, violating the FTC Health Breach Notification Rule.",
    "severity": "critical",
    "reference": "16 CFR Part 318"
  },
  {
    "id": 390,
    "code": "FTC-020",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Unlabelled Sponsored Content",
    "description": "E-commerce blog posts or reviews that contain paid affiliate links fail to display clear and conspicuous disclosure labels (like 'Sponsored'), violating FTC endorsement rules.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 391,
    "code": "TCPA-016",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Pre-Checked SMS Consent Inputs",
    "description": "Registration forms pre-check checkboxes subscribing consumers to promotional SMS messages, violating TCPA requirements for prior express written consent.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227"
  },
  {
    "id": 392,
    "code": "TCPA-017",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Incomplete SMS Opt-In Statutory Terms",
    "description": "Lead forms collecting telephone numbers lack clear statutory language specifying that 'Message and data rates may apply' and listing sending frequency, violating TCPA guidelines.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 393,
    "code": "TCPA-018",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Missing Mobile Carrier Disclosures",
    "description": "SMS submission fields omit clear statements detailing carrier liabilities, privacy protections, and support access instructions, violating CTIA operating codes.",
    "severity": "serious",
    "reference": "CTIA Guidelines"
  },
  {
    "id": 394,
    "code": "TCPA-019",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Non-Compliant SMS Unsubscribe System",
    "description": "Automated text campaign integrations fail to recognize and process standard opt-out keyword replies (such as STOP, CANCEL, or UNSUBSCRIBE), violating TCPA.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 395,
    "code": "TCPA-020",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Missing Physical Address in Outbound Emails",
    "description": "Marketing emails dispatched automatically by portal registrations fail to display the organization's valid physical street address, violating CAN-SPAM.",
    "severity": "serious",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 396,
    "code": "TCPA-021",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Broken Unsubscribe Mechanisms in Mail Footers",
    "description": "Unsubscribe links inside system notification emails lead to broken server paths or force users to log in before processing requests, violating CAN-SPAM regulations.",
    "severity": "critical",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 397,
    "code": "TCPA-022",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Excessive Delays in Email Unsubscribe Processing",
    "description": "Database systems fail to remove unsubscribed emails from active promotional lists within the statutory 10-business-day window, violating CAN-SPAM rules.",
    "severity": "serious",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 398,
    "code": "TCPA-023",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Robocalls and Automatic Texting Without Written Consent",
    "description": "Web landing pages collect telephone contacts for automated dialing systems without obtaining prior express written signatures of Florida consumers, violating Florida FTSA.",
    "severity": "critical",
    "reference": "Fla. Stat. § 501.059"
  },
  {
    "id": 399,
    "code": "TCPA-024",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Lack of Preserved Do Not Call Request Records",
    "description": "Telemarketing databases fail to preserve records of consumer Do Not Call (DNC) requests for the statutory minimum of five years from the date of submission, violating TCPA.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200(d)(6)"
  },
  {
    "id": 400,
    "code": "TCPA-025",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Out-of-Hours Automated Text Dispatching",
    "description": "Marketing servers queue and dispatch automated SMS messages before 8:00 AM or after 9:00 PM local time of the recipient, violating TCPA regulations.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200(c)(2)"
  },
  {
    "id": 401,
    "code": "GDPR-021",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Pre-Ticked Non-Essential Cookies on Load",
    "description": "The website sets non-essential analytics or advertising cookies before receiving active, affirmative consent from the EU visitor, violating ePrivacy and GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 4(11) / ePrivacy Directive"
  },
  {
    "id": 402,
    "code": "GDPR-022",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Unequal Reject and Accept Banner Layouts",
    "description": "The cookie banner uses design tricks to hide the 'Reject' button or forces the visitor to open submenus to reject tracking while allowing single-click acceptance, violating GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 7(4) / Guidelines 05/2020"
  },
  {
    "id": 403,
    "code": "GDPR-023",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing DPO Public Contact Details",
    "description": "The website's privacy disclosure fails to display the official contact details of the designated Data Protection Officer (DPO) under GDPR requirements.",
    "severity": "serious",
    "reference": "GDPR Art. 13(1)(b) & Art. 37"
  },
  {
    "id": 404,
    "code": "GDPR-024",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Failing to Disclose DPAs with Cloud Subprocessors",
    "description": "Data forms collect European personal inputs but fail to verify and link Data Processing Agreements (DPA) completed with cloud hosts and backend subprocessors, violating GDPR Art 28.",
    "severity": "serious",
    "reference": "GDPR Art. 28"
  },
  {
    "id": 405,
    "code": "GDPR-025",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Lack of Secure SAR Request Channels",
    "description": "The platform fails to provide a secure, authenticated pathway for processing Subject Access Requests (SAR), risking accidental disclosure of personal records, violating GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 15 / Right of Access"
  },
  {
    "id": 406,
    "code": "GDPR-026",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Unjustified Erasure Request Rejections",
    "description": "Portal support systems refuse or delay consumer 'Right to be Forgotten' requests without valid statutory justifications, violating GDPR Article 17 requirements.",
    "severity": "serious",
    "reference": "GDPR Art. 17 / Right to be Forgotten"
  },
  {
    "id": 407,
    "code": "GDPR-027",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Privacy Settings Enabled by Default",
    "description": "User profile dashboards default to sharing personal profiles, location files, or usage histories with other users or partners upon registration, violating Privacy by Default rules.",
    "severity": "serious",
    "reference": "GDPR Art. 25 / Privacy by Design"
  },
  {
    "id": 408,
    "code": "GDPR-028",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Insecure Email Contact Form Submissions",
    "description": "Website contact forms transmit personal user messages and identifiers over unencrypted HTTP channels instead of secure HTTPS, violating GDPR security of processing requirements.",
    "severity": "critical",
    "reference": "GDPR Art. 32 / Security of Processing"
  },
  {
    "id": 409,
    "code": "GDPR-029",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Failure to Execute Required DPIAs",
    "description": "Web applications tracking large-scale behavioral data fail to complete and record a Data Protection Impact Assessment (DPIA), violating GDPR requirements.",
    "severity": "serious",
    "reference": "GDPR Art. 35"
  },
  {
    "id": 410,
    "code": "GDPR-030",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cross-Border Transfers without Standard Clauses",
    "description": "User records are transmitted to servers located in third-party countries (lacking adequacy decisions) without established Standard Contractual Clauses (SCCs) in place, violating GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 44-46"
  },
  {
    "id": 411,
    "code": "PCI-019",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "CVV Data Retention in Database",
    "description": "Payment database archives Card Verification Value (CVV/CVC) numbers after payment authorization completes, committing a critical PCI DSS violation.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 3.2.2"
  },
  {
    "id": 412,
    "code": "PCI-020",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Weak TLS Cipher Suite Configurations",
    "description": "The e-commerce payment server accepts TLS 1.0 or TLS 1.1 connections containing insecure ciphers, failing PCI requirements for data encryption in transit.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 4.2.1"
  },
  {
    "id": 413,
    "code": "PCI-021",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing CSP Headers on Payments Checkouts",
    "description": "Payment checkout screens fail to implement Content Security Policy (CSP) headers, exposing the form inputs to script-injection vulnerabilities, violating PCI rules.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 6.4.3"
  },
  {
    "id": 414,
    "code": "PCI-022",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Lack of External Javascript Script Audits",
    "description": "Checkouts load third-party marketing or utility scripts (e.g., chat boxes) directly on pages containing credit card forms without verification audits, violating PCI DSS.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 6.4.3"
  },
  {
    "id": 415,
    "code": "PCI-023",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing Payment Form Tampering Monitoring",
    "description": "Payment integrations lack automated, real-time integrity monitoring to detect changes, headers alterations, or injections on checkout pages, violating PCI standards.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 11.6.1"
  },
  {
    "id": 416,
    "code": "PCI-024",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Default Administrative Panel Credentials",
    "description": "The system backend or connected merchant dashboards run default manufacturer passwords or standard administrator logins, violating PCI secure deployment protocols.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 2.1.1"
  },
  {
    "id": 417,
    "code": "PCI-025",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Shared Payment Operator Sessions",
    "description": "Administrative billing staff share active login sessions or multi-user accounts during transactions management, violating PCI accountability directives.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 8.2.1"
  },
  {
    "id": 418,
    "code": "PCI-026",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Known CVE Vulnerabilities in Payment Stack",
    "description": "Payment routing services run outdated server frameworks containing open, high-severity CVE records, violating PCI secure vulnerability management requirements.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 6.2.1"
  },
  {
    "id": 419,
    "code": "PCI-027",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Unencrypted Storage of Primary Account Numbers",
    "description": "Internal databases log and save complete Primary Account Numbers (PAN) in cleartext columns without implementing strong cryptography algorithms, violating PCI standards.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 3.4"
  },
  {
    "id": 420,
    "code": "PCI-028",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing Penetration Testing Attestation",
    "description": "Security policy pages fail to showcase proof of annual, independent external penetration testing certifications, failing PCI verification checklists.",
    "severity": "moderate",
    "reference": "PCI DSS v4.0 Requirement 11.4"
  },
  {
    "id": 421,
    "code": "STATE-011",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Texas TDPSA Small Business Sensitive Consent",
    "description": "Small business portals collecting Texas consumer sensitive records fail to gain prior opt-in consent before selling data, violating TDPSA provisions.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 541.055"
  },
  {
    "id": 422,
    "code": "STATE-012",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Virginia VCDPA Rights Appeal Escalation",
    "description": "Privacy policy fails to outline a clear process for consumers to appeal a refusal to act on data rights requests, violating Virginia VCDPA regulations.",
    "severity": "serious",
    "reference": "Va. Code § 59.1-577"
  },
  {
    "id": 423,
    "code": "STATE-013",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Colorado CPA Universal Opt-Out Recognition",
    "description": "E-commerce sites targeting Colorado consumers fail to automatically process and honor Universal Opt-Out Mechanisms (UOOM), violating CPA rules.",
    "severity": "critical",
    "reference": "4 ... (Colorado CPA, 4 CCR 904-3 Rule 5.01)"
  },
  {
    "id": 424,
    "code": "STATE-014",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Delaware DPDPA Non-Consensual Health Transfers",
    "description": "Consumer health databases transmit search queries for off-label health diagnostics to third-party ad brokers without explicit consent, violating Delaware DPDPA.",
    "severity": "critical",
    "reference": "6 Del. C. § 12D-106"
  },
  {
    "id": 425,
    "code": "STATE-015",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Oregon OCPA Incomplete Third-Party Listing",
    "description": "Privacy policy discloses general categories of processors instead of listing the specific legal names of third parties receiving user records, violating Oregon OCPA.",
    "severity": "moderate",
    "reference": "ORS § 646A.825"
  },
  {
    "id": 426,
    "code": "STATE-016",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "New Jersey NJPA Sensitive Selling Disclosures",
    "description": "The portal sells New Jersey consumer records containing sensitive info without showing a clear notice and obtaining opt-in consent, violating NJPA directives.",
    "severity": "critical",
    "reference": "N.J.S.A. 56:8-166"
  },
  {
    "id": 427,
    "code": "STATE-017",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Utah UCPA Incomplete Rights Disclosures",
    "description": "Privacy statement omits statutory notices detailing Utah consumer rights, verification timelines, and opt-out processing steps, violating UCPA rules.",
    "severity": "moderate",
    "reference": "Utah Code § 13-61-302"
  },
  {
    "id": 428,
    "code": "STATE-018",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "New Hampshire NHPA Privacy Officer Designation",
    "description": "Large-scale processing portals handling New Hampshire citizen data fail to designate a public compliance contact, violating NHPA regulatory mandates.",
    "severity": "moderate",
    "reference": "N.H. Rev. Stat. § 507-H:6"
  },
  {
    "id": 429,
    "code": "STATE-019",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Montana MTCDPA Child Processing Opt-In",
    "description": "Websites processing personal details of Montana consumers aged 13-16 fail to obtain explicit, affirmative opt-in consent, violating MTCDPA laws.",
    "severity": "critical",
    "reference": "Mont. Code § 30-14-311"
  },
  {
    "id": 430,
    "code": "STATE-020",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Nebraska NEDPA Incomplete Response Timelines",
    "description": "Customer support documentation fails to commit to the statutory 45-day deadline for responding to consumer request submissions under Nebraska NEDPA.",
    "severity": "moderate",
    "reference": "Neb. Rev. Stat. § 87-301"
  },
  {
    "id": 431,
    "code": "FIN-011",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Missing DORA ICT Incident Notification Disclosures",
    "description": "Financial systems fail to document and explain processes for notifying regulators of critical digital service disruptions, violating DORA directives.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 19"
  },
  {
    "id": 432,
    "code": "FIN-012",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "GLBA Customer Files Cleartext Encryption Failures",
    "description": "Loan processing portals store uploaded tax returns or banking statements without implementing AES-256 equivalent encryption, violating GLBA Safeguards.",
    "severity": "critical",
    "reference": "16 CFR § 314.4(c)(1)"
  },
  {
    "id": 433,
    "code": "FIN-013",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "CTA Beneficial Owner Portal Reporting Failures",
    "description": "Corporate registration and customer cabinet interfaces fail to establish secure, validated structures to log beneficial ownership data, violating CTA.",
    "severity": "serious",
    "reference": "31 U.S.C. § 5336"
  },
  {
    "id": 434,
    "code": "FIN-014",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Inadequate SEC 10-K Material Threat Disclosures",
    "description": "Publicly traded company investor relations pages host SEC filing archives omitting detailed assessments of material cybersecurity risks, violating SEC rules.",
    "severity": "serious",
    "reference": "SEC Cybersecurity Rule (Form 10-K Item 1C)"
  },
  {
    "id": 435,
    "code": "FIN-015",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FINRA Rule 2210 Deceptive Yield Claims",
    "description": "Broker-dealer portal screens display promotional asset yields or growth projections without presenting equal prominence to risk disclaimers, violating FINRA Rule 2210.",
    "severity": "serious",
    "reference": "FINRA Rule 2210"
  },
  {
    "id": 436,
    "code": "FIN-016",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Missing SOX Internal Control Assessment Disclosures",
    "description": "Investor portals fail to publish annual management reports evaluating internal financial tracking and operational control audits, violating SOX Section 404.",
    "severity": "moderate",
    "reference": "SOX Section 404"
  },
  {
    "id": 437,
    "code": "FIN-017",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "DORA Third-Party Risk Registers Exclusions",
    "description": "Financial applications link to external APIs or services without preserving a consolidated register of third-party ICT providers and security certifications, violating DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30"
  },
  {
    "id": 438,
    "code": "FIN-018",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "GLBA Incomplete Annual Opt-Out Option Notifications",
    "description": "Consumer banking portals omit clear instructions on yearly opt-out options regarding sharing non-public personal information with affiliates, violating GLBA rules.",
    "severity": "serious",
    "reference": "16 CFR § 313.9"
  },
  {
    "id": 439,
    "code": "FIN-019",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FINRA Rule 4511 Non-WORM Log Format",
    "description": "Broker trading systems record transactions and customer communication logs in standard databases instead of write-once-read-many (WORM) storage, violating FINRA.",
    "severity": "critical",
    "reference": "FINRA Rule 4511"
  },
  {
    "id": 440,
    "code": "FIN-020",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "CFTC Rule 1.31 Electronic History Deletions",
    "description": "Trading portals fail to configure electronic recordkeepings to enforce a strict five-year retention policy for financial logs and confirmations, violating CFTC Rule 1.31.",
    "severity": "critical",
    "reference": "CFTC Rule 1.31"
  },
  {
    "id": 441,
    "code": "OPS-011",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "AI Sentiment Analysis Warnings Missing",
    "description": "AI-powered customer service chatbots use emotion-detection or sentiment analysis algorithms on user message inputs without displaying clear warnings, violating EU AI Act.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(2)"
  },
  {
    "id": 442,
    "code": "OPS-012",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Prohibited AI Biometric Categorization Systems",
    "description": "Online user onboarding interfaces categorize users based on biometrics derived from uploaded facial photos without explicit, statutory legal grounds, violating EU AI Act.",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 5(1)(c)"
  },
  {
    "id": 443,
    "code": "OPS-013",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Missing AI Image & Text Metadata Watermarks",
    "description": "Gen-AI interfaces outputting images or texts fail to embed standard metadata watermarks showing the content is AI-generated, violating EU AI Act mandates.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(3)"
  },
  {
    "id": 444,
    "code": "OPS-014",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "EU DSA Algorithmic Feed Disclosures",
    "description": "Social feeds or content portals fail to disclose the primary parameters and ranking criteria used by their recommender systems, violating Digital Services Act rules.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 27"
  },
  {
    "id": 445,
    "code": "OPS-015",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "EU DSA Missing Advertisements Repository",
    "description": "Large publishing platforms fail to host a public, searchable repository displaying active ads, sponsoring names, and target metrics, violating Digital Services Act.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 39"
  },
  {
    "id": 446,
    "code": "OPS-016",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Lack of Shadow Banning Redress Portal",
    "description": "Community portals restricting user content (shadow banning) fail to notify authors and offer a clear internal complaint handling portal, violating Digital Services Act.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 20"
  },
  {
    "id": 447,
    "code": "OPS-017",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Failing to Accept eIDAS 2.0 Wallets",
    "description": "Identity-gated platforms fail to integrate mechanisms accepting official European Digital Identity Wallets for verification, violating eIDAS 2.0 mandates.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 6a"
  },
  {
    "id": 448,
    "code": "OPS-018",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Missing CRA Vulnerability Reporting Gateway",
    "description": "Digital hardware or software portals fail to provide a conspicuous, functional interface to report security vulnerabilities, violating the Cyber Resilience Act.",
    "severity": "serious",
    "reference": "Cyber Resilience Act (CRA), Art. 11"
  },
  {
    "id": 449,
    "code": "OPS-019",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Missing DPO ANPD Registry for Brazilian Portals",
    "description": "Brazilian-facing portals collect customer information but fail to publish and register their designated DPO details with the national ANPD authority, violating LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 41"
  },
  {
    "id": 450,
    "code": "OPS-020",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Lack of Guardian Consent Verification for India DPDP",
    "description": "Portals collecting data of Indian citizens under the age of 18 fail to implement verified parental or guardian consent structures, violating Digital Personal Data Protection Act.",
    "severity": "critical",
    "reference": "Digital Personal Data Protection Act (DPDP Act), Sec. 9"
  },
  {
    "id": 451,
    "code": "UAEPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Explicit Consent for Cross-Border Data Transfers",
    "description": "The website transfers personal data of UAE residents to servers outside the UAE without obtaining explicit consent or demonstrating adequacy measures, violating UAE Federal Decree-Law No. 45.",
    "severity": "critical",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 22"
  },
  {
    "id": 452,
    "code": "UAEPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Local Data Protection Officer (DPO) Contact Details",
    "description": "The website targeting UAE consumers fails to designate and publish contact details of a localized DPO when processing high-volume personal details, violating UAE PDPL.",
    "severity": "moderate",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 10"
  },
  {
    "id": 453,
    "code": "UAEPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant UAE Child Consent Flow",
    "description": "The portal collects personal details of children in the UAE without verifying parental or guardian consent structures, violating UAE child protection laws.",
    "severity": "critical",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 6"
  },
  {
    "id": 454,
    "code": "UAEPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Maintain UAE Data Processing Registers",
    "description": "The organization's backend fails to document and maintain a record of personal data processing activities (ROPA) for UAE-facing operations, violating UAE PDPL requirements.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 11"
  },
  {
    "id": 455,
    "code": "UAEPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate Data Breach Notification Timelines for UAE",
    "description": "The website's terms and security policy fail to commit to notifying the UAE Data Office immediately of any security breach that threatens data privacy.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 9"
  },
  {
    "id": 456,
    "code": "UAEPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Direct Opt-Out for Marketing Profiling in UAE",
    "description": "The client cabinet fails to provide a clear, one-click mechanism for UAE users to opt out of automated decisions and marketing profiling, violating UAE PDPL.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 18"
  },
  {
    "id": 457,
    "code": "SDPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Registration on Saudi National Data Portal",
    "description": "Organizations processing Saudi personal records fail to register their databases with the Saudi Data and Artificial Intelligence Authority (SDAIA) portal, violating KSA PDPL.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 32"
  },
  {
    "id": 458,
    "code": "SDPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Explicit Consent for Direct Marketing in KSA",
    "description": "Marketing subscription forms targeting Saudi consumers fail to obtain separate, explicit consent before dispatching promotional offers, violating Saudi PDPL.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 28"
  },
  {
    "id": 459,
    "code": "SDPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Illegal Storage of Sensitive Personal Data Outside KSA",
    "description": "Websites transferring health or sensitive financial records of Saudi nationals to cloud servers outside the Kingdom fail to secure statutory SDAIA authorization, committing a major violation.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 29"
  },
  {
    "id": 460,
    "code": "SDPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Disclose Processing Purpose to KSA Consumers",
    "description": "The privacy policy fails to explicitly link data collection fields to the specific, lawful purposes of processing required for compliance in Saudi Arabia.",
    "severity": "serious",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 5"
  },
  {
    "id": 461,
    "code": "SDPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Data Erasure Response Timeframe in KSA",
    "description": "The customer support portal fails to process and confirm personal data deletion requests submitted by Saudi residents within the statutory timeframes under KSA regulations.",
    "severity": "serious",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 21"
  },
  {
    "id": 462,
    "code": "SDPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Explicit Opt-In for Tracking KSA Citizens",
    "description": "The website executes behavioral trackers or analytics scripts targeting KSA visitors before obtaining explicit, active opt-in consent, violating Saudi PDPL.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 17"
  },
  {
    "id": 463,
    "code": "ILPA-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Database Registration under Israeli Law",
    "description": "The platform processes personal information of Israeli citizens in databases containing over 10,000 individuals without statutory registration, violating the Israeli Privacy Act.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 8"
  },
  {
    "id": 464,
    "code": "ILPA-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Failure to Disclose Duty of Delivery under Israeli Law",
    "description": "Web forms fail to explicitly notify Israeli consumers whether they are legally obligated to provide personal details or if it is voluntary, violating the Israeli Privacy Protection Act.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 11"
  },
  {
    "id": 465,
    "code": "ILPA-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Non-Compliant Cross-Border Data Transfers from Israel",
    "description": "User databases transfer Israeli records to third countries that fail to ensure equal privacy protections without meeting statutory exceptions under Israeli transfer regulations.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Regulations (Transfer of Data to Databases Abroad) 5761-2001"
  },
  {
    "id": 466,
    "code": "ILPA-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Lack of Data Security Audits under Israeli Regulations",
    "description": "The enterprise processing Israeli user records fails to perform and log annual, independent security audits of database processing infrastructure, violating Israeli regulations.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Regulations (Data Security) 5777-2017"
  },
  {
    "id": 467,
    "code": "ILPA-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Illegal Direct Mailing Advertising without Registration in Israel",
    "description": "The e-commerce site sends automated marketing emails to Israeli citizens based on character profiling without registering the target database for direct mailing, violating Israeli law.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 17C"
  },
  {
    "id": 468,
    "code": "TRKV-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Explicit Consent for Cookie Tracking in Turkey",
    "description": "Cookie consent managers fail to block analytical or advertising scripts for Turkish visitors before obtaining explicit, active opt-in consent, violating Turkey's KVKK guidelines.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 5"
  },
  {
    "id": 469,
    "code": "TRKV-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Registration on Turkish VERBIS Database Registry",
    "description": "Foreign companies processing personal data of Turkish residents above statutory thresholds fail to register with the Data Controllers Registry (VERBIS), violating KVKK rules.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 16"
  },
  {
    "id": 470,
    "code": "TRKV-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Inadequate Data Breach Reporting Windows for Turkey",
    "description": "The security incident protocol fails to mandate reporting data breaches to the Turkish Personal Data Protection Board (KVKK) within the statutory 72-hour window.",
    "severity": "serious",
    "reference": "KVKK Board Decision on Breach Notification Timelines (Decision No. 2019/10)"
  },
  {
    "id": 471,
    "code": "TRKV-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Turkish Privacy Policy Clarification Text",
    "description": "Web forms fail to present Turkish consumers with a dedicated 'Clarification Text' (Aydınlatma Metni) outlining rights and processing channels as separate from general policies, violating KVKK.",
    "severity": "serious",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 10"
  },
  {
    "id": 472,
    "code": "TRKV-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Illegal Cross-Border Transfers without Turkish Board Consent",
    "description": "Website database hosting routes personal records of Turkish users to servers outside Turkey without obtaining explicit consent or demonstrating standard undertaking protocols, violating KVKK.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 9"
  },
  {
    "id": 473,
    "code": "CHFADP-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Lack of Explicit Disclosures for Automated Decisions in Switzerland",
    "description": "The website deploys automated user scoring or decision systems targeting Swiss residents without displaying clear disclosures and offering human review interfaces, violating Swiss FADP.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 21"
  },
  {
    "id": 474,
    "code": "CHFADP-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Representative for Foreign Controllers in Switzerland",
    "description": "Foreign organisations processing high volumes of Swiss consumer records fail to designate a localized representative in Switzerland, violating Swiss FADP.",
    "severity": "moderate",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 14"
  },
  {
    "id": 475,
    "code": "CHFADP-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Failure to Disclose Swiss Processing Register entries",
    "description": "Corporate systems failing to maintain a record of processing activities (ROPA) under Swiss standards face regulatory compliance liabilities under the revised FADP.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 12"
  },
  {
    "id": 476,
    "code": "CHFADP-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Inadequate Data Transfer Exclusions for Switzerland",
    "description": "Website database backups transfer Swiss personal files to servers in non-adequate countries without implementing verified contractual clauses, violating Swiss FADP.",
    "severity": "critical",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 16"
  },
  {
    "id": 477,
    "code": "CHFADP-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Lack of Explicit Consent for Swiss Sensitive Data",
    "description": "Forms collecting sensitive details (e.g. religious views, political opinions, union statuses) from Swiss nationals fail to obtain active, explicit consent, violating FADP.",
    "severity": "critical",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 6"
  },
  {
    "id": 478,
    "code": "CHFADP-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Lack of Swiss Data Breach Reporting (Rapid Windows)",
    "description": "System incident logs fail to support rapid notification to the Federal Data Protection and Information Commissioner (FDPIC) of any data breach resulting in high risk to Swiss users, violating FADP.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 24"
  },
  {
    "id": 479,
    "code": "UKGDPR-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Lack of UK GDPR Addendum for Data Transfers",
    "description": "Website database services transfer UK user records to international servers without implementing the mandatory UK International Data Transfer Agreement (IDTA) or UK Addendum to EU SCCs.",
    "severity": "critical",
    "reference": "UK Data Protection Act 2018 / UK GDPR"
  },
  {
    "id": 480,
    "code": "UKGDPR-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing UK ICO Fee Registration",
    "description": "Foreign companies processing personal data of UK citizens fail to register and pay the data protection fee to the UK Information Commissioner's Office (ICO), violating UK laws.",
    "severity": "moderate",
    "reference": "UK Data Protection (Charges and Information) Regulations 2018"
  },
  {
    "id": 481,
    "code": "UKGDPR-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing UK Representative under UK GDPR",
    "description": "Foreign companies targeting UK customers fail to designate and publish a UK representative to act on behalf of the controller under UK GDPR requirements.",
    "severity": "serious",
    "reference": "UK GDPR, Art. 27"
  },
  {
    "id": 482,
    "code": "UKGDPR-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Non-Compliant Children's Data Processing under UK Age-Appropriate Code",
    "description": "The website targeting UK users collects information from children under 18 without establishing a high level of privacy by default, violating the UK Children's Code.",
    "severity": "critical",
    "reference": "UK Age-Appropriate Design Code (Children's Code)"
  },
  {
    "id": 483,
    "code": "UKOSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Age Verification Mechanisms for Harmful Content (UK OSA)",
    "description": "Content portals displaying user-generated media fail to deploy robust age-assurance verification procedures to restrict minors from accessing harmful files, violating UK OSA.",
    "severity": "critical",
    "reference": "UK Online Safety Act 2023"
  },
  {
    "id": 484,
    "code": "UKOSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing UK Online Safety Reporting Channels",
    "description": "Websites offering interactive user communication fail to display a prominent, functional portal allowing UK users to report illegal or harmful content, violating Online Safety mandates.",
    "severity": "serious",
    "reference": "UK Online Safety Act 2023"
  },
  {
    "id": 485,
    "code": "AUSPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Honor Australia Privacy Act Erasure Requests",
    "description": "The support system fails to provide a dedicated, statutory channel for Australian citizens to request destruction or de-identification of personal records, violating APPs.",
    "severity": "serious",
    "reference": "Australia Privacy Act 1988 - Australian Privacy Principles (APPs)"
  },
  {
    "id": 486,
    "code": "AUSPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Cross-Border Disclosures for Australia",
    "description": "Personal records of Australian citizens are transferred to international hosting targets without establishing reasonable steps to ensure recipient compliance, violating APP 8.",
    "severity": "critical",
    "reference": "Australia Privacy Act 1988 - APP 8"
  },
  {
    "id": 487,
    "code": "AUSPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Explicit Opt-In for Marketing Cookies in Australia",
    "description": "The e-commerce site executes tracking pixels for targeted advertising to Australian users before obtaining explicit, active opt-in consent, violating recent Privacy Act reforms.",
    "severity": "critical",
    "reference": "Australia Privacy Act 1988 Reforms"
  },
  {
    "id": 488,
    "code": "AUSPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Australia Privacy Policy Disclosure of Third Party Hosting Locations",
    "description": "The privacy policy fails to explicitly disclose the list of countries where personal records are likely to be disclosed or hosted, violating Australian APP 1.",
    "severity": "moderate",
    "reference": "Australia Privacy Act 1988 - APP 1"
  },
  {
    "id": 489,
    "code": "AUSPA-005",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Australia Spam Act Opt-Out Violation",
    "description": "The email marketing infrastructure continues sending promotional messages to Australian citizens past the statutory 5-business-day processing window after unsubscribing, violating the Spam Act.",
    "severity": "serious",
    "reference": "Australia Spam Act 2003"
  },
  {
    "id": 490,
    "code": "AUSPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Illegal Direct Marketing without Opt-Out under APP 7",
    "description": "The website promotes services to Australian consumers using personal profiles without providing a prominent, free opt-out mechanism in every marketing context, violating APP 7.",
    "severity": "serious",
    "reference": "Australia Privacy Act 1988 - APP 7"
  },
  {
    "id": 491,
    "code": "AUSPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Quality Verifications for Australian Records",
    "description": "The database fails to run automated verification checks to ensure personal data collected from Australian residents remains accurate, complete, and up-to-date, violating APP 10.",
    "severity": "moderate",
    "reference": "Australia Privacy Act 1988 - APP 10"
  },
  {
    "id": 492,
    "code": "NZPR-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Disclose NZ Privacy Officer Details",
    "description": "Websites processing personal details of New Zealand citizens fail to designate and publish the contact information of a statutory Privacy Officer, violating NZ Privacy Act.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 1"
  },
  {
    "id": 493,
    "code": "NZPR-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Immediate Breach Notification for New Zealand",
    "description": "Security systems fail to support rapid notification to the NZ Privacy Commissioner of any data breach likely to cause serious harm to New Zealand residents, violating the Privacy Act.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, Part 6"
  },
  {
    "id": 494,
    "code": "NZPR-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing NZ Consumer Access Portal (IPP 6)",
    "description": "The account dashboard fails to offer New Zealand users a clear path to access and download a complete copy of all personal files stored on record, violating IPP 6.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, IPP 6"
  },
  {
    "id": 495,
    "code": "NZPR-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Illegal Storage of NZ Records in Non-Adequate Jurisdictions (IPP 12)",
    "description": "Personal records of NZ consumers are stored on cloud server locations abroad that fail to guarantee protection comparable to New Zealand's laws, violating IPP 12.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020, IPP 12"
  },
  {
    "id": 496,
    "code": "NZPR-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Collection of Excessive Personal Data from NZ Residents",
    "description": "Online forms demand unnecessary personal details from NZ residents that are not directly required for the business transaction, violating New Zealand IPP 1.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 1"
  },
  {
    "id": 497,
    "code": "SGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Mandatory DPO Contact Disclosures in Singapore",
    "description": "The website targeting Singaporean users fails to list the business address or email of its designated Data Protection Officer (DPO) in its privacy page, violating PDPA.",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012, Sec. 11"
  },
  {
    "id": 498,
    "code": "SGPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Document Deemed Consent Rules for Singapore",
    "description": "The portal processes user data under Singapore's 'deemed consent by notification' rules without conducting a prior Assessment of Impact or documenting notification structures.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 Amendments"
  },
  {
    "id": 499,
    "code": "SGPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Data Portability Actions under Singapore PDPA",
    "description": "Customer dashboards processing Singaporean data fail to offer automated data portability transmission pathways for user profiles upon requested exports, violating PDPA.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 Portability Provisions"
  },
  {
    "id": 500,
    "code": "SGPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate Singapore Breach Notification Timeline (3 Calendar Days)",
    "description": "Incident response protocols fail to mandate notifying the Singapore PDPC within 3 calendar days of identifying a reportable data breach, violating statutory timelines.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012, Sec. 26D"
  },
  {
    "id": 501,
    "code": "SGPD-008",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Singapore Do Not Call (DNC) Registry Violations",
    "description": "Telemarketing integrations dispatch promotional calls or texts to Singapore phone numbers without validating records against the national DNC Registry, violating Singapore PDPA.",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 - DNC Provisions"
  },
  {
    "id": 502,
    "code": "MYPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Dual-Language Privacy Notice under Malaysian PDPA",
    "description": "The website targeting Malaysian users fails to present its privacy policy in both national languages (Malay and English), violating explicit Malaysian PDPA requirements.",
    "severity": "moderate",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 7(3)"
  },
  {
    "id": 503,
    "code": "MYPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Illegal Cross-Border Transfers under Malaysian PDPA",
    "description": "User databases transfer personal records of Malaysian citizens to server locations outside Malaysia without statutory exceptions or explicit consent, violating PDPA.",
    "severity": "critical",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 129"
  },
  {
    "id": 504,
    "code": "MYPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Verification Controls for Data Correctness in Malaysia",
    "description": "The website database fails to implement mechanisms to ensure personal records collected from Malaysian users are processed accurately and kept up-to-date, violating PDPA.",
    "severity": "moderate",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 11"
  },
  {
    "id": 505,
    "code": "MYPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Processing of Sensitive Personal Data in Malaysia",
    "description": "Web forms collect sensitive personal detail fields (such as health or political affiliations) of Malaysian users without obtaining explicit, signed consent, violating PDPA.",
    "severity": "critical",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 40"
  },
  {
    "id": 506,
    "code": "THPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Disclose Thai DPO Contact Protocols",
    "description": "The website targeting Thai consumers fails to prominently publish contact options for its designated Data Protection Officer (DPO) under Thai PDPA requirements.",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 41"
  },
  {
    "id": 507,
    "code": "THPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Thai Consent Revocation Interface",
    "description": "The user cabinet fails to offer a simple mechanism for Thai citizens to withdraw consent that is as easy as the mechanism used to grant it, violating PDPA.",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 19"
  },
  {
    "id": 508,
    "code": "THPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Illegal Cross-Border Transfers of Thai Personal Data",
    "description": "Database backups route personal details of Thai users to servers located abroad without complying with adequacy rules or obtaining consent, violating Thai PDPA.",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 28"
  },
  {
    "id": 509,
    "code": "THPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Thai Data Processing Register Entries",
    "description": "Corporate controllers processing Thai citizen records fail to document and preserve logs of database operations and purpose evaluations, violating PDPA mandates.",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 39"
  },
  {
    "id": 510,
    "code": "THPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Collection of Thai Sensitive Personal Data without Explicit Consent",
    "description": "Online intake forms collect criminal records, biological, or health data of Thai residents without securing active, explicit consent, violating PDPA regulations.",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 26"
  },
  {
    "id": 511,
    "code": "VNDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Prior Impact Assessment for Vietnam Data Transfers",
    "description": "Organizations transferring Vietnamese personal data to server locations outside Vietnam fail to file a Transfer Impact Assessment with the Ministry of Public Security, violating Decree 13.",
    "severity": "critical",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 25"
  },
  {
    "id": 512,
    "code": "VNDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Processing of Children's Data in Vietnam",
    "description": "Web applications collecting personal details of children in Vietnam aged 7 or older fail to verify child consent along with parental/guardian approval, violating Decree 13.",
    "severity": "critical",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 20"
  },
  {
    "id": 513,
    "code": "VNDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Localized Server Presence for Vietnam Operations",
    "description": "Enterprise systems fail to establish a local server presence to store user database records of Vietnamese citizens within Vietnamese territory when required by cybersecurity laws.",
    "severity": "critical",
    "reference": "Vietnam Law on Cybersecurity No. 24/2018/QH14, Art. 26"
  },
  {
    "id": 514,
    "code": "VNDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Disclose DPO Details under Vietnam Decree 13",
    "description": "Organizations processing sensitive personal details of Vietnamese citizens fail to designate a Data Protection Department or DPO contact in their privacy policies, violating Decree 13.",
    "severity": "moderate",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 28"
  },
  {
    "id": 515,
    "code": "VNDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Verified Data Security Assessments in Vietnam",
    "description": "Platforms processing Vietnamese user records fail to perform annual database system security assessments and maintain verification logs for regulatory inspections under Decree 13.",
    "severity": "serious",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 27"
  },
  {
    "id": 516,
    "code": "DPDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Multi-Language Privacy Notices for India",
    "description": "The website targeting Indian users fails to provide option toggles to view the privacy disclosures in all 22 scheduled languages of the Constitution of India, violating DPDP Act.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 5(3)"
  },
  {
    "id": 517,
    "code": "DPDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Localized Dispute Redressal Channels for India",
    "description": "The support portal fails to provide Indian consumers with a clear mechanism to file grievances and contact a localized Grievance Officer, violating DPDP Act mandates.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 13"
  },
  {
    "id": 518,
    "code": "DPDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Incomplete Purpose-Specification Form Notices in India",
    "description": "Online input forms collect personal details of Indian residents without presenting a standalone, clear notification specifying exactly what details are collected and why, violating DPDP Act.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 5(1)"
  },
  {
    "id": 519,
    "code": "DPDP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Failure to Disclose DPO and Consent Manager Contacts in India",
    "description": "The privacy disclosures targeting India omit publishing details of the DPO and fail to support appointing a certified Consent Manager, violating DPDP requirements.",
    "severity": "moderate",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 6"
  },
  {
    "id": 520,
    "code": "DPDP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Processing of Children's Tracking Cookies in India",
    "description": "The website executes behavioral monitoring cookies or targets advertising algorithms towards users determined to be children under 18 in India, violating DPDP Act prohibitions.",
    "severity": "critical",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 9(2)"
  },
  {
    "id": 521,
    "code": "DPDP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Erasure Controls on Vendor Subprocessors in India",
    "description": "The database fails to automatically propagate data erasure requests submitted by Indian users to third-party vendor subprocessors and partners, violating DPDP Act mandates.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 12"
  },
  {
    "id": 522,
    "code": "JPAP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Cross-Border Information Disclosures under Japanese APPI",
    "description": "The privacy policy fails to inform Japanese users of the names of countries where their records are stored and the security systems implemented by recipient servers, violating APPI.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 28"
  },
  {
    "id": 523,
    "code": "JPAP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Incomplete Disclosure of Database Safety Measures in Japan",
    "description": "The corporate privacy policy fails to list specific administrative, technical, and physical safety management measures taken to protect stored Japanese records, violating APPI.",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 32"
  },
  {
    "id": 524,
    "code": "JPAP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Consent for Pseudo-Personally Identifiable Information in Japan",
    "description": "The website tracks and processes pseudonymised user data (e.g. cookie IDs linked to server profiles) of Japanese visitors without meeting APPI disclosure requirements.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 41"
  },
  {
    "id": 525,
    "code": "JPAP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Processing of Personally Referable Information in Japan",
    "description": "Web databases transfer user identifiers to third parties knowing they will be linked to identifiable personal records in Japan without validating consent, violating APPI.",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 31"
  },
  {
    "id": 526,
    "code": "JPAP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Breach Notification System for PPC Japan",
    "description": "System incident tracking rules fail to mandate reporting significant data breach incidents (resulting in leaks of sensitive or high-volume files) to the Japanese Personal Information Protection Commission (PPC).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 26"
  },
  {
    "id": 527,
    "code": "JPAP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Illegal Direct Marketing over Phone without Verification in Japan",
    "description": "Lead forms capturing Japanese telephone numbers fail to display clear opt-out checkboxes and verify Do Not Call preferences before initiating sales calls, violating APPI guidelines.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI) Guidelines"
  },
  {
    "id": 528,
    "code": "SKPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Multi-Option Form Consent Separations in South Korea",
    "description": "Online input forms targeting South Korean users bundle optional marketing consents together with essential terms of service agreement checkmarks, violating South Korea's PIPA.",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 22"
  },
  {
    "id": 529,
    "code": "SKPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Resident Registration Number Processing in S. Korea",
    "description": "Web applications process Resident Registration Numbers (RRN) of South Korean citizens without statutory legal authority or secure cryptographic measures, violating South Korea PIPA.",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 24-2"
  },
  {
    "id": 530,
    "code": "SKPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Native Language DPO Disclosures in South Korea",
    "description": "The privacy disclosures targeting South Korean users fail to specify the contact address or phone number of the DPO in Korean native text, violating PIPA mandates.",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 31"
  },
  {
    "id": 531,
    "code": "SKPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Cross-Border Transfer Disclosures under Korean PIPA",
    "description": "The privacy policy fails to inform South Korean consumers of the date, destination country, and purpose of outbound personal data transfers to overseas servers, violating PIPA.",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 39-11"
  },
  {
    "id": 532,
    "code": "SKPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "South Korea PIPC Breach Notification Violations",
    "description": "Incident response guidelines fail to mandate reporting significant data breach leaks (affecting 1,000+ users) to the Korean Personal Information Protection Commission (PIPC) within 24 hours.",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 34"
  },
  {
    "id": 533,
    "code": "LGPD-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Brazilian DPO Registry with ANPD",
    "description": "Organizations processing Brazilian personal data fail to formally register and publish their designated DPO (Encarregado) contact details with the national ANPD authority, violating LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 41"
  },
  {
    "id": 534,
    "code": "LGPD-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Lack of Explicit Consent for Processing Sensitive Brazilian Records",
    "description": "Online intake forms collect health, biometrics, or union status details from Brazilian consumers without obtaining a separate, explicit opt-in signature or verification checkbox, violating LGPD.",
    "severity": "critical",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 11"
  },
  {
    "id": 535,
    "code": "LGPD-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Non-Compliant Data Portability Path under Brazilian LGPD",
    "description": "The customer dashboard fails to provide Brazilian consumers with an automated interface to export and transfer their database profiles to competitor networks, violating LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 9"
  },
  {
    "id": 536,
    "code": "LGPD-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Failure to Document Brazilian Processing Legal Bases",
    "description": "The corporate privacy policy fails to explicitly link each category of collected personal details to one of the ten statutory legal bases required for compliance under LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 7"
  },
  {
    "id": 537,
    "code": "LGPD-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Failure to Honor Immediate Erasure Requests in Brazil",
    "description": "Support systems fail to instantly delete personal details and verify compliance upon receipt of erasure requests submitted by Brazilian users, violating LGPD regulations.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 16"
  },
  {
    "id": 538,
    "code": "POPI-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Registration of South African Information Officer",
    "description": "Organizations processing personal details of South African residents fail to register their designated Information Officer with the Information Regulator, violating POPIA.",
    "severity": "serious",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 55"
  },
  {
    "id": 539,
    "code": "POPI-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Lack of Direct Consent for Unsolicited Electronic Marketing in SA",
    "description": "E-commerce or landing portals send promotional emails or SMS texts to South African citizens without obtaining active, prior opt-in consent (unless statutory exclusions apply), violating POPIA.",
    "severity": "critical",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 69"
  },
  {
    "id": 540,
    "code": "POPI-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Insecure Storage of South African Identity Numbers",
    "description": "System databases store South African national identity numbers in unencrypted database columns or permit unauthorized access, failing POPIA security requirements.",
    "severity": "critical",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 19"
  },
  {
    "id": 541,
    "code": "POPI-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Failure to Audit South African Processing Purpose Boundaries",
    "description": "Web applications process details collected from South African citizens for reasons not compatible with the original collection purpose without consent, violating POPIA.",
    "severity": "serious",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 15"
  },
  {
    "id": 542,
    "code": "POPI-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Failure to File PAIA Manual on Corporate Portals",
    "description": "South African-facing business platforms fail to host a public, downloadable PAIA manual detailing access procedures for corporate information registries, violating statutory requirements.",
    "severity": "moderate",
    "reference": "Promotion of Access to Information Act (PAIA) 2000"
  },
  {
    "id": 543,
    "code": "NDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Mandated Audit Disclosures under Nigerian NDPA",
    "description": "Large data controllers processing Nigerian records fail to file annual data protection audit reports with the Nigeria Data Protection Commission (NDPC), violating NDPA.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 33"
  },
  {
    "id": 544,
    "code": "NDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Explicit Consent for Direct Marketing in Nigeria",
    "description": "Online customer registration flows subscribe Nigerian users to promotional lists without obtaining explicit, prior consent, violating data protection regulations.",
    "severity": "critical",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 26"
  },
  {
    "id": 545,
    "code": "NDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Illegal Storage of Nigerian Data Outside Nigeria",
    "description": "User databases transfer records of Nigerian citizens to servers outside Nigeria without meeting adequacy rules or executing verified contractual terms, violating NDPA.",
    "severity": "critical",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 41"
  },
  {
    "id": 546,
    "code": "NDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Information Security Audits under Nigerian Law",
    "description": "The enterprise processing Nigerian user records fails to perform and record annual database systems security assessments, violating NDPA regulations.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 39"
  },
  {
    "id": 547,
    "code": "MXPD-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Mexican Privacy Notice Structure (Aviso de Privacidad)",
    "description": "The privacy disclosures targeting Mexican consumers fail to provide the statutory structure of a formal Privacy Notice (Aviso de Privacidad), violating LFPDPPP.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 15"
  },
  {
    "id": 548,
    "code": "MXPD-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Lack of Explicit Opt-In for Sensitive Data in Mexico",
    "description": "Online intake forms collect financial or sensitive wellness details from Mexican users without obtaining explicit, signed opt-in signatures or checkboxes, violating Mexican law.",
    "severity": "critical",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 9"
  },
  {
    "id": 549,
    "code": "MXPD-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Failure to Document ARCO Rights Redress Pathways in Mexico",
    "description": "The privacy policy fails to explain the specific procedures, timelines, and contact routes required to execute ARCO rights (Access, Rectification, Cancellation, Opposition) under Mexican law.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 22"
  },
  {
    "id": 550,
    "code": "MXPD-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Insecure Security Disclosures for Mexican Customer Data",
    "description": "Customer database records processing Mexican resident data lack documented administrative, technical, and physical security measures required under LFPDPPP regulations.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 19"
  },
{
  "id": 551,
  "code": "ARGPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Register Databases with AAIP (Argentina)",
  "description": "The data controller processes personal data of Argentine residents without registering its databases with the Access to Public Information Agency (AAIP).",
  "severity": "critical",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 3"
},
{
  "id": 552,
  "code": "ARGPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Explicit ARCO Rights Redress Channels under Argentine Law",
  "description": "The privacy policy fails to explain how Argentine data subjects can exercise their rights of access, rectification, deletion, and confidentiality.",
  "severity": "serious",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 14"
},
{
  "id": 553,
  "code": "ARGPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Local Security Safeguards for Argentine Data Subject Repositories",
  "description": "Database systems holding Argentine resident personal data fail to implement organizational and technical security measures mandated by AAIP regulations.",
  "severity": "moderate",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 9"
},
{
  "id": 554,
  "code": "ARGPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Illegal Direct Marketing without Opt-Out Verification under Argentine Law",
  "description": "The website engages in direct marketing to Argentine residents without verifying the national 'Do Not Call' registry or providing a direct opt-out link.",
  "severity": "serious",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 27"
},
{
  "id": 555,
  "code": "ARGPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Adequate Third-Country Transfer Safeguards for Argentine Citizens",
  "description": "The controller transfers Argentine resident data internationally to countries or entities that do not provide adequate protection levels under AAIP standards.",
  "severity": "moderate",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 12"
},
{
  "id": 556,
  "code": "COLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Mandatory Registration of Databases in Colombia (RNBD)",
  "description": "The data controller fails to register its personal databases containing Colombian resident data in the National Registry of Databases (RNBD).",
  "severity": "critical",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 25"
},
{
  "id": 557,
  "code": "COLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Absence of Explicit Prior Consent for Colombian Residents",
  "description": "The website collects and processes personal data of Colombian residents without obtaining explicit, prior, and informed consent that can be verified later.",
  "severity": "serious",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 9"
},
{
  "id": 558,
  "code": "COLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Compliant Grievance Handling Channels under Colombian Law",
  "description": "The privacy policy fails to document compliant channels and statutory timelines (15 business days) to resolve queries or claims by Colombian subjects.",
  "severity": "moderate",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 15"
},
{
  "id": 559,
  "code": "COLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Audit Cross-Border Data Flow Protocols under Colombian Law",
  "description": "The controller transfers Colombian personal data to third countries without confirming adequacy or securing authorization from the SIC.",
  "severity": "serious",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 26"
},
{
  "id": 560,
  "code": "COLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unlawful Processing of Minors' Personal Data without Parental Representation in Colombia",
  "description": "The website collects data from Colombian children or adolescents without implementing verification of parental or legal representative authorization.",
  "severity": "moderate",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 7"
},
{
  "id": 561,
  "code": "CHLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Honor Erasure or Correction Requests for Chilean Citizens",
  "description": "The website fails to provide automated or documented channels for Chilean residents to request deletion or rectification of their personal record data.",
  "severity": "critical",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 12"
},
{
  "id": 562,
  "code": "CHLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Illegal Processing of Sensitive Personal Information without Written Authorization in Chile",
  "description": "The site collects sensitive data of Chilean citizens (health, ideology, union membership) without obtaining explicit written or equivalent digital consent.",
  "severity": "serious",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 10"
},
{
  "id": 563,
  "code": "CHLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Proper Security Disclosures for Chilean Resident Data Repositories",
  "description": "Data processing systems holding personal data of Chilean residents lack documented technical measures to protect against unauthorized access.",
  "severity": "moderate",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 11"
},
{
  "id": 564,
  "code": "CHLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Email Direct Marketing without Opt-Out under Chilean Law",
  "description": "The website sends commercial emails to Chilean residents without providing an explicit, cost-free, and easy-to-use opt-out mechanism.",
  "severity": "serious",
  "reference": "Chile Consumer Protection Act (Ley 19.496), Art. 28B"
},
{
  "id": 565,
  "code": "CHLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Transfer Contracts for Processing Chilean Resident Personal Data",
  "description": "The controller shares Chilean resident data with third-party service providers without formal agreements outlining data safety and handling duties.",
  "severity": "moderate",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 4"
},
{
  "id": 566,
  "code": "PERPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Register Personal Data Banks in Peru (RNDP)",
  "description": "The data controller fails to register its personal databases containing Peruvian resident data with the National Registry for Personal Data Protection.",
  "severity": "critical",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 30"
},
{
  "id": 567,
  "code": "PERPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Incomplete Disclosures of International Transfers of Peruvian Data",
  "description": "The privacy policy fails to identify specific third parties and transfer locations outside Peru, violating legal transparency obligations.",
  "severity": "serious",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 18"
},
{
  "id": 568,
  "code": "PERPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Direct and Immediate ARCO Rights Procedures under Peruvian Law",
  "description": "The website lacks specific instructions and timeframes (e.g. 8 days for access, 10 days for rectification) to execute ARCO rights under Peruvian law.",
  "severity": "moderate",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 19"
},
{
  "id": 569,
  "code": "PERPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Obtain Clear, Prior Consent for Tracking Cookies in Peru",
  "description": "The website deploys advertising or analytic cookies prior to obtaining consent from Peruvian residents, violating consent standards.",
  "severity": "serious",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 12"
},
{
  "id": 570,
  "code": "PERPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Legal Representation for Data Processing in Peru by Foreign Entities",
  "description": "Foreign entities processing Peruvian resident data fail to designate a local legal representative or address for service within Peru.",
  "severity": "moderate",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 34"
},
{
  "id": 571,
  "code": "URYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Registration of Data Processing Activity with URCDP (Uruguay)",
  "description": "The data controller fails to register databases or data treatment plans with the Unidad Reguladora y de Control de Datos Personales (URCDP).",
  "severity": "critical",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 31"
},
{
  "id": 572,
  "code": "URYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Document and Notify Security Breaches in Uruguay within 24 Hours",
  "description": "The website lacks formal protocols to document and report security incidents to URCDP within 24 hours of discovery.",
  "severity": "serious",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 12 (amended)"
},
{
  "id": 573,
  "code": "URYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Uruguayan Local Representative Designation for Foreign Controllers",
  "description": "Foreign companies targeting Uruguayan consumers fail to designate a local representative to manage regulator demands under Ley 18.331.",
  "severity": "moderate",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 34"
},
{
  "id": 574,
  "code": "URYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Processing of Biometric or Sensitive Data in Uruguay",
  "description": "The website collects sensitive data (health, biometric identifiers) of Uruguayan residents without obtaining explicit, prior, and written consent.",
  "severity": "serious",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 18"
},
{
  "id": 575,
  "code": "URYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Explicit Portability Actions for Uruguay Residents",
  "description": "The data controller fails to provide direct pathways or standardized formats to honor portability requests by Uruguayan consumers.",
  "severity": "moderate",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 14"
},
{
  "id": 576,
  "code": "ECUPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Consent Interfaces for Ecuadorian Residents (LOPDP)",
  "description": "The consent interfaces fail to offer distinct checkboxes for different processing purposes for Ecuadorian consumers under LOPDP.",
  "severity": "critical",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 8"
},
{
  "id": 577,
  "code": "ECUPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Localized Redress Pathways for Ecuadorian Protection Agency",
  "description": "The privacy policy fails to document user redress rights or provide a clear path to submit complaints to the Ecuadorian Superintendent of Data Protection.",
  "severity": "serious",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 33"
},
{
  "id": 578,
  "code": "ECUPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Execute Data Protection Impact Assessments (DPIA) in Ecuador",
  "description": "The controller fails to perform or log Data Protection Impact Assessments for high-risk profiles targeting Ecuadorian subjects.",
  "severity": "moderate",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 40"
},
{
  "id": 579,
  "code": "ECUPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Illegal Marketing Communications without Verified Consent in Ecuador",
  "description": "The website delivers commercial messages to Ecuadorian residents without collecting explicit, unbundled consent for promotional purposes.",
  "severity": "serious",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 12"
},
{
  "id": 580,
  "code": "ECUPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Security and Integrity Measures for Ecuador Databases",
  "description": "Personal databases processing Ecuadorian consumer data lack documented administrative, technical, and physical security plans.",
  "severity": "moderate",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 37"
},
{
  "id": 581,
  "code": "CRIAP-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Register Databases with PRODHAB (Costa Rica)",
  "description": "The entity processes Costa Rican personal data without registering the databases with the Agency for the Protection of Inhabitants' Data (PRODHAB).",
  "severity": "critical",
  "reference": "Costa Rica Law 8968, Art. 12"
},
{
  "id": 582,
  "code": "CRIAP-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Incomplete Informational Self-Determination Disclosures in Costa Rica",
  "description": "The privacy notice fails to disclose the mandatory rights of informational self-determination and the path to revoke consent.",
  "severity": "serious",
  "reference": "Costa Rica Law 8968, Art. 5"
},
{
  "id": 583,
  "code": "CRIAP-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Verification Protocols for Costa Rican Sensitive Data Processing",
  "description": "Sensitive categories of personal data (health, biometric) from Costa Rican subjects are collected without explicit prior verification protocols.",
  "severity": "moderate",
  "reference": "Costa Rica Law 8968, Art. 9"
},
{
  "id": 584,
  "code": "CRIAP-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unlawful Transfer of Costa Rican Data to Non-Adequate Third Countries",
  "description": "The website transfers Costa Rican personal data to countries that do not meet adequate protection levels without securing explicit user consent.",
  "severity": "serious",
  "reference": "Costa Rica Law 8968, Art. 24"
},
{
  "id": 585,
  "code": "CRIAP-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Absence of Simplified Revocation Mechanisms for Costa Rican Users",
  "description": "Costa Rican users are not provided with a simplified, free-of-charge mechanism to revoke consent for promotional processing.",
  "severity": "moderate",
  "reference": "Costa Rica Law 8968, Art. 6"
},
{
  "id": 586,
  "code": "PANPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Inform Panama Citizens of Controller Identity (Ley 81)",
  "description": "The website processes Panamanian personal data without disclosing the complete corporate identity and physical address of the data controller.",
  "severity": "critical",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 8"
},
{
  "id": 587,
  "code": "PANPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of ARCO Rights Enforcement Pathways in Panama",
  "description": "The controller fails to provide a free and easily accessible email address or system to exercise access, rectification, opposition, and deletion in Panama.",
  "severity": "serious",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 15"
},
{
  "id": 588,
  "code": "PANPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Absence of Consent Legal Basis for Financial Profiling in Panama",
  "description": "The website performs credit profiling or processes economic data of Panamanian residents without verified compliance or explicit prior authorization.",
  "severity": "moderate",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 21"
},
{
  "id": 589,
  "code": "PANPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Security Breach Notification Protocols to ANTAI (Panama)",
  "description": "The organization does not document procedures to report security incidents immediately to ANTAI and to affected subjects in Panama.",
  "severity": "serious",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 36"
},
{
  "id": 590,
  "code": "PANPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unlawful Storage of Panamanian Personal Data in Non-Adequate Servers",
  "description": "Panamanian personal data is stored internationally on cloud systems that fail to provide minimum information security measures mandated by ANTAI.",
  "severity": "moderate",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 33"
},
{
  "id": 591,
  "code": "KENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Register as a Data Controller with Kenyan ODPC",
  "description": "The entity collects and processes personal data of Kenyan residents without registering as a data controller or processor with the Office of the Data Protection Commissioner (ODPC).",
  "severity": "critical",
  "reference": "Kenya Data Protection Act 2019, Section 18"
},
{
  "id": 592,
  "code": "KENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Absence of Local Representative for Foreign Controllers in Kenya",
  "description": "Foreign data controllers processing personal data of data subjects in Kenya fail to appoint a resident local representative to handle regulatory matters.",
  "severity": "serious",
  "reference": "Kenya Data Protection Act 2019, Section 50"
},
{
  "id": 593,
  "code": "KENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Consent Controls for Direct Marketing under Kenya Law",
  "description": "The website utilizes personal data of Kenyan residents for commercial promotions or advertising without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Kenya Data Protection Act 2019, Section 37"
},
{
  "id": 594,
  "code": "KENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Data Protection Impact Assessment (DPIA) for Kenya Operations",
  "description": "The entity runs processing operations posing high risks to Kenyan residents (such as large-scale tracking) without conducting a mandatory DPIA.",
  "severity": "serious",
  "reference": "Kenya Data Protection Act 2019, Section 31"
},
{
  "id": 595,
  "code": "KENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Meet the 72-Hour Data Breach Reporting Window to Kenyan ODPC",
  "description": "The data controller's documented breach response protocol fails to mandate notification to the Kenyan ODPC within 72 hours of a security incident.",
  "severity": "moderate",
  "reference": "Kenya Data Protection Act 2019, Section 43"
},
{
  "id": 596,
  "code": "EGYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Obtain License for Electronic Marketing in Egypt",
  "description": "The website conducts direct electronic marketing to Egyptian residents without obtaining the required license from the Data Protection Center.",
  "severity": "critical",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 17"
},
{
  "id": 597,
  "code": "EGYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures for Egyptian Citizens",
  "description": "The privacy policy fails to explicitly outline the specific legal basis and processing durations for Egyptian citizen data.",
  "severity": "serious",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 2"
},
{
  "id": 598,
  "code": "EGYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Mandated Data Protection Officer (DPO) in Egypt",
  "description": "The entity processes Egyptian resident data on a large scale but fails to designate and register a Data Protection Officer with the regulator.",
  "severity": "moderate",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 8"
},
{
  "id": 599,
  "code": "EGYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Report Personal Data Breaches within 72 Hours in Egypt",
  "description": "The controller fails to establish internal guidelines to report personal data breaches to the Egyptian regulator and affected subjects within 72 hours.",
  "severity": "serious",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 7"
},
{
  "id": 600,
  "code": "EGYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unlawful Cross-Border Transfer of Egyptian Citizens' Data",
  "description": "The website transfers personal data of Egyptian residents to international entities without obtaining the necessary approval from the Egyptian Data Protection Center.",
  "severity": "moderate",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 14"
},
{
  "id": 601,
  "code": "MARPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to File Prior Declaration or Authorization with Moroccan CNDP",
  "description": "The controller processes personal data of Moroccan residents without filing the mandatory prior declaration or securing authorization from the CNDP.",
  "severity": "critical",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 12"
},
{
  "id": 602,
  "code": "MARPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Clear Disclosures of Recipient Categories in Morocco",
  "description": "The privacy policy fails to inform Moroccan data subjects about the specific categories of third-party recipients of their personal data.",
  "severity": "serious",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 5"
},
{
  "id": 603,
  "code": "MARPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Absence of Explicit Consent for Direct Marketing in Morocco",
  "description": "The website targets Moroccan consumers with direct marketing communications without obtaining their prior, unambiguous, opt-in consent.",
  "severity": "moderate",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 10"
},
{
  "id": 604,
  "code": "MARPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Implement Technical Safeguards for Moroccan Data Integrity",
  "description": "The server configurations hosting Moroccan user records lack appropriate protection against accidental destruction, loss, or alteration.",
  "severity": "serious",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 23"
},
{
  "id": 605,
  "code": "MARPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers of Moroccan Personal Data",
  "description": "The entity transfers Moroccan personal data to jurisdictions outside Morocco without obtaining prior written authorization from the CNDP.",
  "severity": "moderate",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 43"
},
{
  "id": 606,
  "code": "QATPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Verification of Consent for Children's Data in Qatar",
  "description": "The website processes personal data of children in Qatar without obtaining explicit consent from their parents or legal guardians as required by PDPPL.",
  "severity": "critical",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 17"
},
{
  "id": 607,
  "code": "QATPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Document Processing Audits for Qatar Regulator",
  "description": "The organization fails to maintain and document an internal register of processing operations to present to the competent Qatari department.",
  "severity": "serious",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 11"
},
{
  "id": 608,
  "code": "QATPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Security Measures and Disclosures for Qatari Residents",
  "description": "The databases storing Qatari resident data lack audited technical and administrative security measures required to prevent data leakage.",
  "severity": "moderate",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 13"
},
{
  "id": 609,
  "code": "QATPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Direct Request Handling Channels for Qatari Subjects",
  "description": "The website fails to provide Qatari residents with a direct, zero-cost mechanism to submit access, erasure, or correction requests.",
  "severity": "serious",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 5"
},
{
  "id": 610,
  "code": "QATPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Disclose Cross-Border Processing Locations to Qatari Subjects",
  "description": "The privacy policy fails to specify the geographic locations where the personal data of Qatari residents is processed or stored.",
  "severity": "moderate",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 8"
},
{
  "id": 611,
  "code": "BHRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Written Consent for Sensitive Data in Bahrain",
  "description": "The website collects sensitive data (such as health status or biometrics) of Bahraini residents without obtaining prior, written, and explicit consent.",
  "severity": "critical",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 4"
},
{
  "id": 612,
  "code": "BHRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Appoint a Local Representative in Bahrain",
  "description": "Foreign data controllers processing Bahraini resident data on a large scale fail to designate a resident local representative in Bahrain.",
  "severity": "serious",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 33"
},
{
  "id": 613,
  "code": "BHRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Bahrain",
  "description": "The website delivers marketing communications via electronic messages to Bahraini citizens without giving them a prior, clear opt-out path.",
  "severity": "moderate",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 30"
},
{
  "id": 614,
  "code": "BHRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Record Processing Registrations with Bahrain Authority",
  "description": "The controller fails to register database systems containing personal data of Bahrain residents with the Personal Data Protection Authority.",
  "severity": "serious",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 12"
},
{
  "id": 615,
  "code": "BHRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Transfer Protocols for Exporting Bahraini Citizen Data",
  "description": "Personal data of Bahraini residents is transferred to countries that do not provide adequate data security levels without prior written approval.",
  "severity": "moderate",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 15"
},
{
  "id": 616,
  "code": "OMNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Appoint a Data Protection Officer (DPO) in Oman",
  "description": "The organization processes personal data of Omani residents on a large scale but fails to designate a Data Protection Officer.",
  "severity": "critical",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 21"
},
{
  "id": 617,
  "code": "OMNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Explicit Consent for Sensitive Health or Biometrics in Oman",
  "description": "The website collects sensitive data (health, biometric records) of Omani residents without obtaining explicit, prior, and documented consent.",
  "severity": "serious",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 5"
},
{
  "id": 618,
  "code": "OMNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Verified Dispute Resolution Procedures for Omani Subjects",
  "description": "The privacy policy fails to document specific legal pathways or contact channels to handle complaints from Omani data subjects.",
  "severity": "moderate",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 12"
},
{
  "id": 619,
  "code": "OMNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Absence of Adequate Cross-Border Transfer Guarantees for Omani Data",
  "description": "The website transfers personal data of Omani residents to international entities without ensuring adequacy agreements or Ministry approval.",
  "severity": "serious",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 24"
},
{
  "id": 620,
  "code": "OMNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Respond to Omani Consumer Requests within Legal Timeline",
  "description": "The data controller's user request procedures do not mandate responding to access or rectification requests by Omani citizens within the statutory timeframe.",
  "severity": "moderate",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 15"
},
{
  "id": 621,
  "code": "HKGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Failure to Disclose Intended Direct Marketing to Hong Kong Residents",
  "description": "The website collects personal data of Hong Kong residents and intends to use it for marketing without providing a clear opt-in interface.",
  "severity": "critical",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), Sec. 35C"
},
{
  "id": 622,
  "code": "HKGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Separated Consent for Third-Party Marketing in Hong Kong",
  "description": "The website shares Hong Kong resident data with partners for marketing purposes without obtaining separate, explicit, and informed consent.",
  "severity": "serious",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), Sec. 35J"
},
{
  "id": 623,
  "code": "HKGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Non-Compliant Data Retention Disclosures for Hong Kong Customers",
  "description": "The privacy policy fails to outline clear retention schedules or disposal procedures for personal data collected from Hong Kong residents.",
  "severity": "moderate",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 2"
},
{
  "id": 624,
  "code": "HKGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Insecure Data Deletion and Destruction Protocols in Hong Kong",
  "description": "The server-side data lifecycle fails to implement secure deletion algorithms for inactive Hong Kong user database entries.",
  "severity": "serious",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 4"
},
{
  "id": 625,
  "code": "HKGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Data Access and Correction Interfaces for Hong Kong Subjects",
  "description": "The website fails to supply Hong Kong users with simple, dedicated contact forms or procedures to demand access or correction of their data.",
  "severity": "moderate",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 6"
},
{
  "id": 626,
  "code": "TWNPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Incomplete Informational Disclosures under Taiwan PDPA",
  "description": "The privacy policy fails to explicitly list all mandatory items under PDPA Art. 8, such as the consequences of not providing data.",
  "severity": "critical",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 8"
},
{
  "id": 627,
  "code": "TWNPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Unlawful Collection of Sensitive Personal Data without Written Consent in Taiwan",
  "description": "The website collects sensitive personal records (medical history, genetic data) of Taiwanese residents without obtaining explicit written consent.",
  "severity": "serious",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 6"
},
{
  "id": 628,
  "code": "TWNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Auditable Safety Maintenance Plan in Taiwan",
  "description": "The data controller fails to document and maintain an internal security maintenance plan to prevent personal data leakage in Taiwan.",
  "severity": "moderate",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 27"
},
{
  "id": 629,
  "code": "TWNPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Missing Incident Notification Protocols to Taiwanese Citizens",
  "description": "The company lacks protocols to notify Taiwanese data subjects of personal data leaks immediately after verification of a breach.",
  "severity": "serious",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 12"
},
{
  "id": 630,
  "code": "TWNPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Safeguards for Direct Marketing to Taiwan Residents",
  "description": "The website uses personal data of Taiwanese residents for marketing without providing a clear option to object at the first contact.",
  "severity": "moderate",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 20"
},
{
  "id": 631,
  "code": "PHLPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Missing Registration of Data Processing Systems with Philippines NPC",
  "description": "The entity processes personal data of Philippine citizens but fails to register its data processing systems with the National Privacy Commission (NPC).",
  "severity": "critical",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 14"
},
{
  "id": 632,
  "code": "PHLPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Failure to Designate a Data Protection Officer in the Philippines",
  "description": "The data controller targeting Philippine subjects fails to officially designate and register a Data Protection Officer with the NPC.",
  "severity": "serious",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 21"
},
{
  "id": 633,
  "code": "PHLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Privacy Notice Disclosures for Philippine Residents",
  "description": "The privacy policy fails to inform Philippine users about their specific rights to be informed, access, object, and demand erasure.",
  "severity": "moderate",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 16"
},
{
  "id": 634,
  "code": "PHLPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Systemic Breach Notification System to NPC within 72 Hours",
  "description": "The company's security procedures do not mandate notification to the NPC and affected subjects within 72 hours of discovering a breach.",
  "severity": "serious",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 20"
},
{
  "id": 635,
  "code": "PHLPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Incomplete Consent Forms for Processing Sensitive Information in the Philippines",
  "description": "The consent mechanism bundles permission for sensitive info processing with general terms of service, violating Philippine consent laws.",
  "severity": "moderate",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 13"
},
{
  "id": 636,
  "code": "IDNPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Documented Legal Basis for Indonesian Operations",
  "description": "The website collects and processes Indonesian citizen data without documenting the specific legal bases (consent, contract) under UU PDP.",
  "severity": "critical",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 20"
},
{
  "id": 637,
  "code": "IDNPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Failure to Appoint a Local Data Protection Officer in Indonesia",
  "description": "The data controller handles Indonesian personal records on a large scale but fails to designate a resident local Data Protection Officer.",
  "severity": "serious",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 53"
},
{
  "id": 638,
  "code": "IDNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Missing Age and Parental Verification Controls for Children in Indonesia",
  "description": "The website collects personal data of Indonesian children without verifying their age and obtaining validated consent from parents.",
  "severity": "moderate",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 32"
},
{
  "id": 639,
  "code": "IDNPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Explicit Incident Notification System in Indonesia within 72 Hours",
  "description": "The data controller fails to establish procedures to notify Indonesian authorities and subjects within 72 hours of data security breach detection.",
  "severity": "serious",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 46"
},
{
  "id": 640,
  "code": "IDNPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Non-Compliant Data Erasure Mechanisms for Indonesian Personal Data",
  "description": "The systems do not support total, permanent deletion of Indonesian user records upon valid consent withdrawal or contract termination.",
  "severity": "moderate",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 43"
},
{
  "id": 641,
  "code": "KAZPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Failure to Register Databases containing Kazakhstan Resident Data",
  "description": "The data controller fails to register its databases processing personal data of Kazakhstan residents with the state authority.",
  "severity": "critical",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 26"
},
{
  "id": 642,
  "code": "KAZPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Non-Compliant Cross-Border Transfers without Confirming Adequacy in Kazakhstan",
  "description": "The website transfers personal data of Kazakhstan citizens to third countries without verifying adequacy or securing legal transfer grounds.",
  "severity": "serious",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 16"
},
{
  "id": 643,
  "code": "KAZPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Incomplete Consent Gathering Systems for Kazakhstan Residents",
  "description": "The website collects personal data of Kazakhstan residents without obtaining explicit consent that details specific processing purposes.",
  "severity": "moderate",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 8"
},
{
  "id": 644,
  "code": "KAZPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Failure to Localize Server Storage within the Republic of Kazakhstan",
  "description": "The databases storing personal data of Kazakhstan residents are hosted outside Kazakhstan, violating mandatory data localization requirements.",
  "severity": "serious",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 12"
},
{
  "id": 645,
  "code": "KAZPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Standard Redress and Deletion Protocols for Kazakhstan Citizens",
  "description": "The controller fails to provide direct pathways or contact options to request blocking or destruction of Kazakhstan citizen personal records.",
  "severity": "moderate",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 24"
},
{
  "id": 646,
  "code": "UKRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Notification of Data Processing to Ukrainian Commissioner",
  "description": "The controller processes sensitive personal data of Ukrainian residents without notifying the Commissioner for Human Rights.",
  "severity": "critical",
  "reference": "Ukraine Law on Personal Data Protection, Article 9"
},
{
  "id": 647,
  "code": "UKRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Policy Disclosures regarding Third-Party Recipients in Ukraine",
  "description": "The privacy policy fails to explicitly name or detail categories of third-party recipients processing Ukrainian resident data.",
  "severity": "serious",
  "reference": "Ukraine Law on Personal Data Protection, Article 12"
},
{
  "id": 648,
  "code": "UKRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Obtain Consent for Marketing and Cookie Tracking in Ukraine",
  "description": "The website deploys advertising track cookies or delivers promotional newsletters to Ukrainian citizens without verified opt-in consent.",
  "severity": "moderate",
  "reference": "Ukraine Law on Personal Data Protection, Article 11"
},
{
  "id": 649,
  "code": "UKRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Security and Access Logs under Ukrainian Law",
  "description": "The database containing personal records of Ukrainian subjects lacks documented access logs and user permission controls.",
  "severity": "serious",
  "reference": "Ukraine Law on Personal Data Protection, Article 24"
},
{
  "id": 650,
  "code": "UKRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Redress and Erasure Access Procedures for Ukrainian Subjects",
  "description": "The data controller fails to provide clear contact channels or response timelines for Ukrainian subjects to request data destruction.",
  "severity": "moderate",
  "reference": "Ukraine Law on Personal Data Protection, Article 8"
},
{
  "id": 651,
  "code": "CANPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Explicit Opt-In Consent for Sensitive Data under PIPEDA",
  "description": "The website collects sensitive personal records (health, financial details) of Canadian residents without obtaining explicit prior opt-in consent.",
  "severity": "critical",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.3"
},
{
  "id": 652,
  "code": "CANPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Privacy Officer Contact Information under PIPEDA",
  "description": "The privacy policy fails to identify or provide direct contact routes for the designated individual responsible for compliance under Canadian Law.",
  "severity": "serious",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.1"
},
{
  "id": 653,
  "code": "CANPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Access and Rectification Procedures under PIPEDA",
  "description": "The website lacks clear and documented instructions for Canadian residents to obtain access to and request rectification of their personal files.",
  "severity": "moderate",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.9"
},
{
  "id": 654,
  "code": "CANPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Breach Reporting Procedures under Canadian Law",
  "description": "The data controller fails to document procedures to report security incidents to the Office of the Privacy Commissioner (OPC) as soon as feasible.",
  "severity": "serious",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Sec. 10.1"
},
{
  "id": 655,
  "code": "CANPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Incomplete Third-Party Transfer Agreements for Canadian Data",
  "description": "The controller transfers Canadian resident data to third-party processors without implementing formal contract guarantees ensuring equivalent protection.",
  "severity": "moderate",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.5.3"
},
{
  "id": 656,
  "code": "BOLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Honor Constitutional Right of Habeas Data in Bolivia",
  "description": "The website lacks options for Bolivian citizens to execute their constitutional right to check, correct, or delete personal data repositories.",
  "severity": "critical",
  "reference": "Bolivia Political Constitution, Article 130"
},
{
  "id": 657,
  "code": "BOLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of User Redress Protocols for Personal Data in Bolivia",
  "description": "The privacy policy fails to document specific administrative or judicial redress pathways for Bolivian subjects to oppose unauthorized processing.",
  "severity": "serious",
  "reference": "Bolivia Political Constitution, Article 131"
},
{
  "id": 658,
  "code": "BOLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unlawful Processing of Communication Logs in Bolivia",
  "description": "The website tracks and processes communication metadata or logs of Bolivian users without explicit prior consent or judicial orders.",
  "severity": "moderate",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 55"
},
{
  "id": 659,
  "code": "BOLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Incomplete Disclosures of Third-Party Recipients of Bolivian Data",
  "description": "The privacy policy fails to outline specific third-party organizations and databases that access personal records of Bolivian residents.",
  "severity": "serious",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 56"
},
{
  "id": 660,
  "code": "BOLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Insecure Storage of Bolivian Data Subject Registries",
  "description": "Databases processing personal data of Bolivian residents fail to deploy encryption and technical security safeguards required under telecommunication standards.",
  "severity": "moderate",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 57"
},
{
  "id": 661,
  "code": "PRYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unlawful Financial Credit History Processing in Paraguay",
  "description": "The website conducts profiling or processes financial records of Paraguayan residents without explicit, written, or digitally verifiable consent.",
  "severity": "critical",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 6"
},
{
  "id": 662,
  "code": "PRYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Absence of Direct Correction Pathways under Paraguay Law",
  "description": "The privacy policy fails to document free, simplified methods to rectify inaccurate personal or financial database records in Paraguay.",
  "severity": "serious",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 14"
},
{
  "id": 663,
  "code": "PRYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Organizational Safety Measures for Paraguay Records",
  "description": "Data controllers fail to audit and document administrative security measures protecting Paraguayan resident databases against unauthorized access.",
  "severity": "moderate",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 9"
},
{
  "id": 664,
  "code": "PRYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Illegal Direct Marketing over Electronic Channels in Paraguay",
  "description": "The website delivers commercial messages to Paraguayan consumers without verified prior authorization or explicit opt-out links.",
  "severity": "serious",
  "reference": "Paraguay Consumer Protection Law (Ley 1334), Art. 6"
},
{
  "id": 665,
  "code": "PRYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Contracts with Subprocessors of Paraguayan Data",
  "description": "The controller shares Paraguayan resident data with third-party service providers without formal agreements outlining data safety duties.",
  "severity": "moderate",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 12"
},
{
  "id": 666,
  "code": "VENPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Compliance with Habeas Data Principles in Venezuela",
  "description": "The website processes personal registries of Venezuelan residents without offering mechanisms to inspect, correct, or delete their records.",
  "severity": "critical",
  "reference": "Venezuela Constitution, Article 28"
},
{
  "id": 667,
  "code": "VENPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Document Safety Controls for Venezuelan Data Transmission",
  "description": "Web panels collecting and transmitting personal records of Venezuelan residents lack documented administrative security protocols.",
  "severity": "serious",
  "reference": "Venezuela Infogobierno Law, Article 32"
},
{
  "id": 668,
  "code": "VENPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Consent Disclosures for Venezuelan Subject Repositories",
  "description": "The privacy notice fails to disclose the legal bases or obtain consent for storing personal records of Venezuelan citizens.",
  "severity": "moderate",
  "reference": "Venezuela Constitution, Article 60"
},
{
  "id": 669,
  "code": "VENPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Easy Access Request Interfaces for Venezuelan Users",
  "description": "The website fails to provide Venezuelan residents with a direct, cost-free contact path to inspect their database record profiles.",
  "severity": "serious",
  "reference": "Venezuela Constitution, Article 28"
},
{
  "id": 670,
  "code": "VENPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Retention Policies for Venezuelan Customer Records",
  "description": "Personal database records of Venezuelan residents are stored indefinitely without documented justification or deletion routines.",
  "severity": "moderate",
  "reference": "Venezuela Constitution, Article 60"
},
{
  "id": 671,
  "code": "GTMIP-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Informational Notice under Guatemala Law",
  "description": "The privacy policy fails to explain the purpose of data collection or third-party transfer policies to Guatemalan residents.",
  "severity": "critical",
  "reference": "Guatemala Access to Public Information Law, Article 31"
},
{
  "id": 672,
  "code": "GTMIP-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Honor Habeas Data Correction Rights in Guatemala",
  "description": "The website lacks formal contact paths or interfaces for Guatemalan residents to demand rectification or blocking of personal records.",
  "severity": "serious",
  "reference": "Guatemala Access to Public Information Law, Article 32"
},
{
  "id": 673,
  "code": "GTMIP-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Insecure Storage of Guatemalan Personal Data Registries",
  "description": "Database systems holding personal records of Guatemalan citizens lack documented technical access controls and encryption safeguards.",
  "severity": "moderate",
  "reference": "Guatemala Access to Public Information Law, Article 33"
},
{
  "id": 674,
  "code": "GTMIP-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Explicit Consent for Sharing Guatemalan Resident Data",
  "description": "The website shares personal data of Guatemalan residents with partners or marketing platforms without explicit prior opt-in consent.",
  "severity": "serious",
  "reference": "Guatemala Access to Public Information Law, Article 34"
},
{
  "id": 675,
  "code": "GTMIP-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Absence of Free Marketing Consent Revocation Channels in Guatemala",
  "description": "The website fails to provide Guatemalan users with an easy, free-of-charge mechanism to object to and revoke commercial email processing.",
  "severity": "moderate",
  "reference": "Guatemala Consumer Protection Law, Article 17"
},
{
  "id": 676,
  "code": "DOMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Dominican Data without Prior Consent",
  "description": "The website collects and processes personal database records of Dominican residents without obtaining prior, free, and informed consent.",
  "severity": "critical",
  "reference": "Dominican Republic Law 172-13, Article 5"
},
{
  "id": 677,
  "code": "DOMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Incomplete Disclosures of Dominican Controller Identity",
  "description": "The privacy policy fails to identify the data controller and database registrations overseen by the regulatory authorities.",
  "severity": "serious",
  "reference": "Dominican Republic Law 172-13, Article 8"
},
{
  "id": 678,
  "code": "DOMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Habeas Data Request Procedures under Dominican Law",
  "description": "The database controller lacks documented methods for Dominican citizens to submit access, correction, and deletion requests.",
  "severity": "moderate",
  "reference": "Dominican Republic Law 172-13, Article 18"
},
{
  "id": 679,
  "code": "DOMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unlawful Cross-Border Transfers of Dominican Citizen Data",
  "description": "The website transfers Dominican personal databases to countries or entities that fail to guarantee adequate security levels.",
  "severity": "serious",
  "reference": "Dominican Republic Law 172-13, Article 29"
},
{
  "id": 680,
  "code": "DOMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Insecure Security Disclosures for Dominican Personal Data Banks",
  "description": "The database systems lack documented physical, logical, and administrative security measures required under Law 172-13.",
  "severity": "moderate",
  "reference": "Dominican Republic Law 172-13, Article 12"
},
{
  "id": 681,
  "code": "SLVPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Consent for Commercial Emails in El Salvador",
  "description": "The website sends commercial emails to El Salvador residents without obtaining prior, express consent or giving a clear opt-out path.",
  "severity": "critical",
  "reference": "El Salvador Electronic Commerce Law, Article 18"
},
{
  "id": 682,
  "code": "SLVPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Data Handling Disclosures in Salvadoran Privacy Notice",
  "description": "The privacy notice fails to detail the collection methods and transfer protocols for personal records of Salvadoran consumers.",
  "severity": "serious",
  "reference": "El Salvador Electronic Commerce Law, Article 20"
},
{
  "id": 683,
  "code": "SLVPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Insecure Transaction Logging for Salvadoran Customers",
  "description": "The web portal processing electronic payments of Salvadoran users fails to implement secure, encrypted, and isolated transaction logs.",
  "severity": "moderate",
  "reference": "El Salvador Electronic Commerce Law, Article 22"
},
{
  "id": 684,
  "code": "SLVPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Insecure Database Records for Salvadoran Consumers",
  "description": "The databases storing consumer record entries of Salvadoran residents lack technical safety measures to prevent unauthorized data leaks.",
  "severity": "serious",
  "reference": "El Salvador Consumer Protection Law, Article 27"
},
{
  "id": 685,
  "code": "SLVPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Incomplete Deletion Options for Salvadoran User Databases",
  "description": "The website does not provide El Salvador consumers with simplified, automated channels to demand complete deletion of their account databases.",
  "severity": "moderate",
  "reference": "El Salvador Electronic Commerce Law, Article 19"
},
{
  "id": 686,
  "code": "HNDPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Collection Disclosures for Honduras Residents",
  "description": "The website collects personal data of Honduran residents without providing clear disclosures of processing purposes.",
  "severity": "critical",
  "reference": "Honduras Access to Public Information Law, Article 23"
},
{
  "id": 687,
  "code": "HNDPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Block and Deletion Pathways in Honduras Databases",
  "description": "The data controller fails to establish documented pathways or contacts for Honduran citizens to request database blocking or file deletion.",
  "severity": "serious",
  "reference": "Honduras Access to Public Information Law, Article 24"
},
{
  "id": 688,
  "code": "HNDPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unlawful Third-Party Transfers without Consent in Honduras",
  "description": "The website transfers personal databases of Honduran residents to commercial entities without securing prior consent.",
  "severity": "moderate",
  "reference": "Honduras Access to Public Information Law, Article 25"
},
{
  "id": 689,
  "code": "HNDPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Insecure Storage of Honduran Personal Registries",
  "description": "Databases processing personal data of Honduran residents lack basic logical access controls and data encryption.",
  "severity": "serious",
  "reference": "Honduras Access to Public Information Law, Article 26"
},
{
  "id": 690,
  "code": "HNDPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Absence of Free Marketing Opt-Out Channels for Honduras",
  "description": "The website targeting Honduran consumers does not display clear, cost-free mechanisms to object to commercial messages.",
  "severity": "moderate",
  "reference": "Honduras Consumer Protection Law, Article 15"
},
{
  "id": 691,
  "code": "NICPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Register Databases with Regulator in Nicaragua",
  "description": "The data controller fails to register its databases containing Nicaraguan resident data with the national registry.",
  "severity": "critical",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 15"
},
{
  "id": 692,
  "code": "NICPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Explicit Consent for Sensitive Data in Nicaragua",
  "description": "The website collects sensitive data of Nicaraguan residents without obtaining prior, written, or digitally verifiable consent.",
  "severity": "serious",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 7"
},
{
  "id": 693,
  "code": "NICPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Redress Pathways for ARCO Rights in Nicaragua",
  "description": "The privacy policy fails to document specific contact channels or statutory timelines to execute ARCO rights under Law 787.",
  "severity": "moderate",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 9"
},
{
  "id": 694,
  "code": "NICPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfers of Nicaraguan Data",
  "description": "The website transfers Nicaraguan personal databases internationally without securing regulatory approval or adequacy guarantees.",
  "severity": "serious",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 21"
},
{
  "id": 695,
  "code": "NICPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Report Database Security Breaches in Nicaragua",
  "description": "The organization does not document internal procedures to report security incidents to Nicaraguan regulators and affected subjects.",
  "severity": "moderate",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 12"
},
{
  "id": 696,
  "code": "GHAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Register as a Data Controller with Ghana DPC",
  "description": "The entity processes personal data of Ghanaian residents without registering as a data controller with the Data Protection Commission (DPC).",
  "severity": "critical",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 27"
},
{
  "id": 697,
  "code": "GHAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Ghanaian Sensitive Personal Data without Authorization",
  "description": "The website collects sensitive personal records (biometric, health, beliefs) of Ghanaian residents without obtaining prior written authorization from the DPC.",
  "severity": "serious",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 35"
},
{
  "id": 698,
  "code": "GHAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Notice regarding Right to Object to Marketing in Ghana",
  "description": "The privacy policy fails to inform Ghanaian data subjects of their specific right to object to processing for promotional purposes.",
  "severity": "moderate",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 20"
},
{
  "id": 699,
  "code": "GHAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant International Transfers of Ghanaian Data",
  "description": "The controller transfers Ghanaian personal data internationally without obtaining prior written approval or adequacy confirmations from the DPC.",
  "severity": "serious",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 47"
},
{
  "id": 700,
  "code": "GHAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Security Breach Notification Systems under Ghana Law",
  "description": "The data controller lacks documented procedures to report security incidents to the Ghana DPC and affected subjects within a reasonable timeframe.",
  "severity": "moderate",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 31"
},
{
  "id": 701,
  "code": "UGAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Register with Uganda Data Protection Office",
  "description": "The data controller collects and processes Ugandan resident data without officially registering with the Personal Data Protection Office of Uganda.",
  "severity": "critical",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 4"
},
{
  "id": 702,
  "code": "UGAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Collecting Ugandan Citizen Data without Prior Consent",
  "description": "The website collects personal data of Ugandan citizens without obtaining prior, written, and explicit consent from the data subjects.",
  "severity": "serious",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 7"
},
{
  "id": 703,
  "code": "UGAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Procedures to Handle Subject Rights in Uganda",
  "description": "The controller fails to provide direct pathways or contact options to handle access, rectification, or deletion requests by Ugandan subjects.",
  "severity": "moderate",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 24"
},
{
  "id": 704,
  "code": "UGAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Illegal Direct Marketing without Opt-Out in Uganda",
  "description": "The website sends commercial emails or marketing messages to Ugandan citizens without providing a verified, free opt-out mechanism.",
  "severity": "serious",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 15"
},
{
  "id": 705,
  "code": "UGAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Storage of Ugandan Records in Non-Adequate Countries",
  "description": "Ugandan personal records are transferred internationally to jurisdictions that fail to guarantee adequate data protection standards.",
  "severity": "moderate",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 19"
},
{
  "id": 706,
  "code": "RWAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Registration in Rwanda",
  "description": "The data controller processes Rwandan personal records without obtaining registration or notifying the supervisory authority.",
  "severity": "critical",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 8"
},
{
  "id": 707,
  "code": "RWAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Rwanda",
  "description": "The website collects sensitive data (health, biometric) of Rwandan residents without obtaining prior, explicit, and unbundled consent.",
  "severity": "serious",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 10"
},
{
  "id": 708,
  "code": "RWAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Local Data Protection Officer Contacts for Rwanda Operations",
  "description": "The entity processes personal records of Rwandan residents but fails to designate a localized Data Protection Officer or contact channel.",
  "severity": "moderate",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 18"
},
{
  "id": 709,
  "code": "RWAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Data Breach Reporting Procedures to Rwanda Authority",
  "description": "The organization fails to report database security incidents to the Rwanda supervisory authority within 48 hours of detection.",
  "severity": "serious",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 25"
},
{
  "id": 710,
  "code": "RWAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unlawful Cross-Border Transfers of Rwandan Resident Records",
  "description": "The website transfers personal records of Rwandan residents internationally without obtaining prior authorization or confirming adequacy.",
  "severity": "moderate",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 30"
},
{
  "id": 711,
  "code": "ZIMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Zimbabwe Data without Registration",
  "description": "The data controller processes personal records of Zimbabwean residents without a license or registration with the POTRAZ regulator.",
  "severity": "critical",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 11"
},
{
  "id": 712,
  "code": "ZIMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Consent for Automated Decision-Making in Zimbabwe",
  "description": "The website conducts automated profiling or decision-making on Zimbabwean residents without obtaining explicit, prior consent.",
  "severity": "serious",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 17"
},
{
  "id": 713,
  "code": "ZIMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Security Measures for Zimbabwean Databases",
  "description": "Databases processing personal data of Zimbabwean residents lack technical safeguards to protect records against unauthorized disclosure.",
  "severity": "moderate",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 22"
},
{
  "id": 714,
  "code": "ZIMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Data Access Request Procedures for Zimbabwe Citizens",
  "description": "The website fails to provide Zimbabwean residents with a direct, cost-free procedure to submit access or correction requests.",
  "severity": "serious",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 15"
},
{
  "id": 715,
  "code": "ZIMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications to Zimbabwe Residents",
  "description": "The website delivers commercial marketing emails to Zimbabwean residents without obtaining explicit opt-in consent prior to transmission.",
  "severity": "moderate",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 25"
},
{
  "id": 716,
  "code": "AOGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Angolan Personal Data without Notification to APD",
  "description": "The entity processes personal records of Angolan residents without filing the mandatory declaration or authorization with APD.",
  "severity": "critical",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 28"
},
{
  "id": 717,
  "code": "AOGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Angola",
  "description": "The website collects sensitive data (health, biometric records) of Angolan residents without obtaining explicit, prior consent.",
  "severity": "serious",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 7"
},
{
  "id": 718,
  "code": "AOGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Disclosures of Recipient Categories in Angola",
  "description": "The privacy policy fails to inform Angolan residents of the specific third-party organizations that access their personal records.",
  "severity": "moderate",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 14"
},
{
  "id": 719,
  "code": "AOGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Technical Security for Angolan Personal Databases",
  "description": "Server hosting configurations containing Angolan user database entries lack technical safeguards to protect data against unauthorized leakage.",
  "severity": "serious",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 19"
},
{
  "id": 720,
  "code": "AOGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unlawful Cross-Border Transfers of Angolan Personal Data",
  "description": "The website transfers personal data of Angolan residents internationally without obtaining prior written approval from APD.",
  "severity": "moderate",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 33"
},
{
  "id": 721,
  "code": "ALGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Register Data Processing Systems with Algerian ANPDP",
  "description": "The data controller processes personal records of Algerian residents without registering its data systems with the ANPDP.",
  "severity": "critical",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 13"
},
{
  "id": 722,
  "code": "ALGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Prior Consent for Personal Data in Algeria",
  "description": "The website collects and processes personal data of Algerian citizens without obtaining prior, explicit, and documented consent.",
  "severity": "serious",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 7"
},
{
  "id": 723,
  "code": "ALGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Procedures to Honor Access and Deletion in Algeria",
  "description": "The database controller lacks documented methods for Algerian citizens to submit access, correction, or erasure requests.",
  "severity": "moderate",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 34"
},
{
  "id": 724,
  "code": "ALGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant International Transfers of Algerian Records",
  "description": "The website transfers Algerian personal databases internationally without obtaining prior authorization or security approvals from the ANPDP.",
  "severity": "serious",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 44"
},
{
  "id": 725,
  "code": "ALGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Absence of Breach Notification Protocols to Algerian Authority",
  "description": "The organization does not document procedures to report security incidents immediately to the ANPDP and to affected subjects in Algeria.",
  "severity": "moderate",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 41"
},
{
  "id": 726,
  "code": "JORPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Jordan Personal Data without Consent",
  "description": "The website collects and processes personal data of Jordanian residents without obtaining explicit, prior, and documented consent.",
  "severity": "critical",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 4"
},
{
  "id": 727,
  "code": "JORPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Data Protection Officer (DPO) for Jordan Operations",
  "description": "The data controller handles Jordanian personal databases on a large scale but fails to designate a resident Data Protection Officer.",
  "severity": "serious",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 15"
},
{
  "id": 728,
  "code": "JORPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures of Data Retention in Jordan Privacy Notices",
  "description": "The privacy policy fails to outline concrete retention periods or criteria used to determine retention for Jordanian citizen data.",
  "severity": "moderate",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 8"
},
{
  "id": 729,
  "code": "JORPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers of Jordanian Data",
  "description": "The website transfers Jordanian personal records internationally without ensuring adequacy guarantees or regulatory approval.",
  "severity": "serious",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 19"
},
{
  "id": 730,
  "code": "JORPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Options to Execute Access and Rectification for Jordan Citizens",
  "description": "The database systems lack simplified, zero-cost mechanisms for Jordanian citizens to demand access or correction of their personal data.",
  "severity": "moderate",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 10"
},
{
  "id": 731,
  "code": "KWTDP-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Documented CITRA Compliance for Kuwait Operations",
  "description": "The website collects personal data of Kuwaiti residents without documenting compliance with CITRA data protection regulations.",
  "severity": "critical",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 5"
},
{
  "id": 732,
  "code": "KWTDP-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Explicit Consent for Marketing Communications in Kuwait",
  "description": "The website sends commercial promotional messages to Kuwaiti residents without obtaining prior, express opt-in consent.",
  "severity": "serious",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 11"
},
{
  "id": 733,
  "code": "KWTDP-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Security Safeguards for Kuwaiti Databases",
  "description": "The database systems holding Kuwaiti user records lack technical measures to prevent unauthorized data access.",
  "severity": "moderate",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 14"
},
{
  "id": 734,
  "code": "KWTDP-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Absence of Incident Reporting Procedures to CITRA in Kuwait",
  "description": "The controller fails to document procedures to report security incidents to CITRA and affected Kuwaiti users immediately.",
  "severity": "serious",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 21"
},
{
  "id": 735,
  "code": "KWTDP-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Provide Simplified Deletion for Kuwaiti Consumers",
  "description": "The website fails to provide Kuwaiti consumers with direct, cost-free pathways to revoke consent and request data deletion.",
  "severity": "moderate",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 8"
},
{
  "id": 736,
  "code": "UZBPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Processing Uzbekistan Resident Data without Explicit Consent",
  "description": "The website collects and processes personal data of Uzbekistani citizens without obtaining explicit, prior consent.",
  "severity": "critical",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 18"
},
{
  "id": 737,
  "code": "UZBPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Failure to Localize Server Databases within Uzbekistan",
  "description": "The databases storing personal records of Uzbekistani citizens are hosted outside Uzbekistan, violating localization laws.",
  "severity": "serious",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 12-1"
},
{
  "id": 738,
  "code": "UZBPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Notices for Data Access and Correction in Uzbekistan",
  "description": "The privacy policy fails to outline user rights to demand access, block, or correct personal records in Uzbekistan.",
  "severity": "moderate",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 30"
},
{
  "id": 739,
  "code": "UZBPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Non-Compliant International Transfers of Uzbekistani Data",
  "description": "The controller transfers personal records of Uzbekistani citizens to countries lacking adequate protection levels.",
  "severity": "serious",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 15"
},
{
  "id": 740,
  "code": "UZBPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Failure to Register Personal Databases with Uzbek State Register",
  "description": "The controller fails to register database systems processing personal data of Uzbek residents with the State Register.",
  "severity": "moderate",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 24"
},
{
  "id": 741,
  "code": "GEOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Notify State Inspector Service in Georgia",
  "description": "The data controller processes personal data of Georgian residents without notifying the State Inspector Service.",
  "severity": "critical",
  "reference": "Georgia Law on Personal Data Protection, Article 15"
},
{
  "id": 742,
  "code": "GEOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Georgia",
  "description": "The website collects sensitive data (health, biometric records) of Georgian residents without obtaining explicit consent.",
  "severity": "serious",
  "reference": "Georgia Law on Personal Data Protection, Article 6"
},
{
  "id": 743,
  "code": "GEOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures of Processors and Vendors in Georgia",
  "description": "The privacy notice fails to disclose the specific third-party processors handling personal data of Georgian residents.",
  "severity": "moderate",
  "reference": "Georgia Law on Personal Data Protection, Article 19"
},
{
  "id": 744,
  "code": "GEOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Security Audits and Permission Levels under Georgian Law",
  "description": "The database storing personal records of Georgian subjects lacks documented security logs and user access audits.",
  "severity": "serious",
  "reference": "Georgia Law on Personal Data Protection, Article 24"
},
{
  "id": 745,
  "code": "GEOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Blocking and Deletion Procedures in Georgia",
  "description": "The controller fails to provide clear contact channels or response timelines for Georgian subjects to request data blocking or deletion.",
  "severity": "moderate",
  "reference": "Georgia Law on Personal Data Protection, Article 21"
},
{
  "id": 746,
  "code": "ARMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Comply with Armenia Law on Personal Data Protection",
  "description": "The data controller processes personal data of Armenian residents without complying with the statutory requirements.",
  "severity": "critical",
  "reference": "Armenia Law on Personal Data Protection, Article 9"
},
{
  "id": 747,
  "code": "ARMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Absence of Consent for Automated Profiling in Armenia",
  "description": "The website conducts automated targeting or profiling of Armenian residents without obtaining explicit consent.",
  "severity": "serious",
  "reference": "Armenia Law on Personal Data Protection, Article 11"
},
{
  "id": 748,
  "code": "ARMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Disclosures of International Transfer Locations for Armenia",
  "description": "The privacy notice fails to disclose the specific countries or entities outside Armenia that access user data.",
  "severity": "moderate",
  "reference": "Armenia Law on Personal Data Protection, Article 27"
},
{
  "id": 749,
  "code": "ARMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Security Plans for Armenian Personal Data Banks",
  "description": "The database containing personal records of Armenian subjects lacks documented administrative and logical security plans.",
  "severity": "serious",
  "reference": "Armenia Law on Personal Data Protection, Article 19"
},
{
  "id": 750,
  "code": "ARMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Procedures for Access and Rectification in Armenia",
  "description": "The controller fails to provide clear contact channels or response timelines for Armenian subjects to request data correction.",
  "severity": "moderate",
  "reference": "Armenia Law on Personal Data Protection, Article 15"
},
{
  "id": 751,
  "code": "SWSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for High-Risk Profiling under Swiss FADP",
  "description": "The website performs high-risk profiling of Swiss residents without obtaining prior explicit opt-in consent as mandated by the revised FADP.",
  "severity": "critical",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 6, Art. 60"
},
{
  "id": 752,
  "code": "SWSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Privacy Notice Disclosures under Swiss FADP",
  "description": "The website fails to provide comprehensive information about the identity of the controller, categories of data, and recipient countries in its privacy notice.",
  "severity": "serious",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 19, Art. 60"
},
{
  "id": 753,
  "code": "SWSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Representative Contact Info for Foreign Controllers under FADP",
  "description": "The foreign website controller fails to appoint or disclose a designated representative in Switzerland for data subject communications.",
  "severity": "moderate",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 14"
},
{
  "id": 754,
  "code": "SWSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Swiss Data Transfer",
  "description": "The controller exports personal data of Swiss residents to third countries without a Federal Council adequacy decision or standard contractual clauses.",
  "severity": "serious",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 16, Art. 17"
},
{
  "id": 755,
  "code": "SWSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels under Swiss FADP",
  "description": "The website fails to provide Swiss residents with free, accessible, and transparent methods to exercise their rights to access, correct, or delete data.",
  "severity": "moderate",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 25, Art. 26"
},
{
  "id": 756,
  "code": "SAUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data under Saudi PDPL",
  "description": "The website collects sensitive personal records (health, financial, genetic) of Saudi residents without prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 5, Art. 35"
},
{
  "id": 757,
  "code": "SAUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Bilingual Privacy Notice under Saudi PDPL Requirements",
  "description": "The website privacy notice is not provided in Arabic, violating the linguistic and transparent accessibility requirements for Saudi residents.",
  "severity": "serious",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 30"
},
{
  "id": 758,
  "code": "SAUPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Saudi Arabia",
  "description": "The website sends direct marketing materials or advertising cookies to Saudi subjects without obtaining prior opt-in consent and offering direct opt-out routes.",
  "severity": "moderate",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 28"
},
{
  "id": 759,
  "code": "SAUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unauthorized Cross-Border Transfer of Saudi Personal Data",
  "description": "The website exports personal data of Saudi residents to external hosting environments without ensuring compliance with national security and adequacy regulations.",
  "severity": "serious",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 29, Art. 35"
},
{
  "id": 760,
  "code": "SAUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Document Subject Redress Pathways under Saudi Law",
  "description": "The website privacy policy fails to outline designated mechanisms for Saudi data subjects to lodge complaints with the regulatory authority (SDAIA).",
  "severity": "moderate",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 9"
},
{
  "id": 761,
  "code": "ISRPA-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unregistered Sensitive Database Processing in Israel",
  "description": "The website collects sensitive data of Israeli citizens (religion, health, biometric, political) without registering the database with the PPA.",
  "severity": "critical",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 8, Section 31A"
},
{
  "id": 762,
  "code": "ISRPA-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Disclosure of Collection Voluntariness under Israeli Law",
  "description": "The web forms fail to explicitly notify Israeli users whether providing their personal details is legally mandatory or voluntary.",
  "severity": "serious",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 11"
},
{
  "id": 763,
  "code": "ISRPA-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Access Controls and Security Logs under Israeli Regulations",
  "description": "The website database lacks compliance security log monitoring and access restrictions required for databases containing personal files under Israeli regulations.",
  "severity": "moderate",
  "reference": "Israel Privacy Protection Regulations (Information Security), 5777-2017"
},
{
  "id": 764,
  "code": "ISRPA-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Mail Marketing Registry in Israel",
  "description": "The web controller uses lists of contacts for direct mailing to Israeli citizens without disclosing the source of the database and providing opt-out routes.",
  "severity": "serious",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 17F"
},
{
  "id": 765,
  "code": "ISRPA-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Direct Access and Rectification Procedures in Israel",
  "description": "The privacy policy fails to detail the administrative processes or specific timelines for Israeli subjects to inspect, rectify, or request erasure of their records.",
  "severity": "moderate",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 13, Section 14"
},
{
  "id": 766,
  "code": "LKAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Consent for Processing Sensitive Data in Sri Lanka",
  "description": "The website processes sensitive personal data (biometrics, health, financial records) of Sri Lankan subjects without obtaining valid, explicit consent.",
  "severity": "critical",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 6"
},
{
  "id": 767,
  "code": "LKAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Excessive Retention of Personal Data in Sri Lanka",
  "description": "The website retains personal data of Sri Lankan users longer than necessary for the specified purposes, violating retention limits under Sri Lankan law.",
  "severity": "serious",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 10"
},
{
  "id": 768,
  "code": "LKAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Designate or Disclose DPO Contact Info in Sri Lanka",
  "description": "The data controller fails to appoint or provide public contact pathways for the designated Data Protection Officer under Sri Lankan law.",
  "severity": "moderate",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 20"
},
{
  "id": 769,
  "code": "LKAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Provide Free Subject Access Rights in Sri Lanka",
  "description": "The website privacy policy fails to establish procedures to respond to access requests from Sri Lankan residents free of charge within 21 days.",
  "severity": "serious",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 14"
},
{
  "id": 770,
  "code": "LKAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Sri Lankan Data",
  "description": "The controller transfers Sri Lankan data to external countries that do not ensure an adequate level of data protection under the authority’s rules.",
  "severity": "moderate",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 26"
},
{
  "id": 771,
  "code": "MUSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Lawful Processing Basis for Sensitive Data in Mauritius",
  "description": "The website collects sensitive personal records of Mauritian citizens without a valid legal basis or prior explicit consent.",
  "severity": "critical",
  "reference": "Mauritius Data Protection Act 2017, Sec. 29, Sec. 43"
},
{
  "id": 772,
  "code": "MUSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Cross-Border Transfer Disclosures in Mauritius",
  "description": "The privacy policy fails to disclose transfer details or seek consent for exporting Mauritian user data to external cloud locations.",
  "severity": "serious",
  "reference": "Mauritius Data Protection Act 2017, Sec. 28"
},
{
  "id": 773,
  "code": "MUSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Direct Consent Withdrawal Methods in Mauritius",
  "description": "The website fails to provide Mauritian residents with direct, easy, and free methods to withdraw consent for ongoing processing operations.",
  "severity": "moderate",
  "reference": "Mauritius Data Protection Act 2017, Sec. 28(2)"
},
{
  "id": 774,
  "code": "MUSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant 72-Hour Breach Reporting in Mauritius",
  "description": "The website controller lacks documented processes to report security incidents to the Commissioner within 72 hours under Mauritius law.",
  "severity": "serious",
  "reference": "Mauritius Data Protection Act 2017, Sec. 44, Sec. 47"
},
{
  "id": 775,
  "code": "MUSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Erasure and Rectification Channels in Mauritius",
  "description": "The website fails to provide clear administrative contact routes for Mauritian subjects to request the erasure or rectification of their records.",
  "severity": "moderate",
  "reference": "Mauritius Data Protection Act 2017, Sec. 39"
},
{
  "id": 776,
  "code": "TZNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Commission Registration in Tanzania",
  "description": "The website collects personal data of Tanzanian subjects without registering as a data controller with the Personal Data Protection Commission.",
  "severity": "critical",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 14, Sec. 15"
},
{
  "id": 777,
  "code": "TZNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Tanzania",
  "description": "The website utilizes personal details of Tanzanian citizens for commercial direct marketing without obtaining prior opt-in consent.",
  "severity": "serious",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 31"
},
{
  "id": 778,
  "code": "TZNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Access and Rectification Procedures in Tanzania",
  "description": "The website privacy policy fails to document accessible procedures and specific contact routes for Tanzanian users to inspect and correct records.",
  "severity": "moderate",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 27, Sec. 28"
},
{
  "id": 779,
  "code": "TZNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Data Transfers from Tanzania",
  "description": "The controller transfers personal records of Tanzanian residents outside the country without obtaining prior approval or permit from the Commission.",
  "severity": "serious",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 32"
},
{
  "id": 780,
  "code": "TZNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Document Security Breach Notification Protocols in Tanzania",
  "description": "The data controller fails to document administrative procedures to notify the Commission and affected subjects of security breaches as soon as practicable.",
  "severity": "moderate",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 40"
},
{
  "id": 781,
  "code": "BTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Consent in Botswana",
  "description": "The website processes sensitive personal data (health, political, sexual) of Botswana subjects without prior written or digital explicit consent.",
  "severity": "critical",
  "reference": "Botswana Data Protection Act, 2018, Sec. 16, Sec. 49"
},
{
  "id": 782,
  "code": "BTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Authorization for Non-Adequate Cross-Border Transfer from Botswana",
  "description": "The controller transfers personal records of Botswana residents to countries lacking adequate laws without Commissioner authorization.",
  "severity": "serious",
  "reference": "Botswana Data Protection Act, 2018, Sec. 48, Sec. 49"
},
{
  "id": 783,
  "code": "BTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Safeguards for Sensitive Database Files in Botswana",
  "description": "The website database fails to implement appropriate security safeguards and encryption to protect the personal records of Botswana users.",
  "severity": "moderate",
  "reference": "Botswana Data Protection Act, 2018, Sec. 33"
},
{
  "id": 784,
  "code": "BTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Subject Access and Restriction Methods in Botswana",
  "description": "The privacy policy fails to document accessible methods for Botswana users to execute their rights to check or restrict data processing.",
  "severity": "serious",
  "reference": "Botswana Data Protection Act, 2018, Sec. 21, Sec. 22"
},
{
  "id": 785,
  "code": "BTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Direct Consent Withdrawal Pathways in Botswana",
  "description": "The website fails to provide Botswana residents with direct, transparent, and free mechanisms to revoke consent for data tracking.",
  "severity": "moderate",
  "reference": "Botswana Data Protection Act, 2018, Sec. 20"
},
{
  "id": 786,
  "code": "ZMBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Written Consent in Zambia",
  "description": "The website collects sensitive personal records (health, financial details) of Zambian subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Zambia Data Protection Act, 2021, Sec. 10, Sec. 15"
},
{
  "id": 787,
  "code": "ZMBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Controller Registration in Zambia",
  "description": "The website controller collects personal details of Zambian residents without registering with the Office of the Data Protection Commissioner.",
  "severity": "serious",
  "reference": "Zambia Data Protection Act, 2021, Sec. 10, Sec. 11"
},
{
  "id": 788,
  "code": "ZMBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Appoint or Disclose DPO under Zambian Law",
  "description": "The web controller fails to designate or provide public contact information for a Data Protection Officer as required by Zambian regulations.",
  "severity": "moderate",
  "reference": "Zambia Data Protection Act, 2021, Sec. 41"
},
{
  "id": 789,
  "code": "ZMBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Zambia",
  "description": "The website retains personal records of Zambian users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Zambia Data Protection Act, 2021, Sec. 14"
},
{
  "id": 790,
  "code": "ZMBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Zambian Data",
  "description": "The controller transfers data of Zambian residents outside Zambia without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Zambia Data Protection Act, 2021, Sec. 47"
},
{
  "id": 791,
  "code": "JAMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Failure to Register with Information Commissioner in Jamaica",
  "description": "The website controller collects personal details of Jamaican residents without registering with the Information Commissioner as a data controller.",
  "severity": "critical",
  "reference": "Jamaica Data Protection Act, 2020, Section 14, Section 67"
},
{
  "id": 792,
  "code": "JAMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Data Protection Officer Contacts under Jamaican Law",
  "description": "The website privacy policy fails to identify or provide direct public contacts for the appointed Data Protection Officer in Jamaica.",
  "severity": "serious",
  "reference": "Jamaica Data Protection Act, 2020, Section 18"
},
{
  "id": 793,
  "code": "JAMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Subject Profiling Opt-Out under Jamaican Law",
  "description": "The website fails to provide Jamaican residents with clear options to opt-out or object to processing for profiling and direct marketing.",
  "severity": "moderate",
  "reference": "Jamaica Data Protection Act, 2020, Section 27"
},
{
  "id": 794,
  "code": "JAMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Formal Data Processor Agreements under Jamaican Law",
  "description": "The controller transfers personal records of Jamaican residents to third-party hosters or processors without a binding written contract.",
  "severity": "serious",
  "reference": "Jamaica Data Protection Act, 2020, Section 31"
},
{
  "id": 795,
  "code": "JAMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfers from Jamaica",
  "description": "The controller exports personal data of Jamaican users to countries without adequate protection without authorization from the Commissioner.",
  "severity": "moderate",
  "reference": "Jamaica Data Protection Act, 2020, Section 36"
},
{
  "id": 796,
  "code": "BRBPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unregistered Processing of Personal Data in Barbados",
  "description": "The website collects personal details of Barbadian citizens without registering with the Data Protection Commissioner.",
  "severity": "critical",
  "reference": "Barbados Data Protection Act, 2019, Sec. 14, Sec. 51"
},
{
  "id": 797,
  "code": "BRBPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Security Safeguards for Barbadian Data",
  "description": "The website lacks technical and administrative safeguards to protect collected Barbadian resident records against unauthorized access or breaches.",
  "severity": "serious",
  "reference": "Barbados Data Protection Act, 2019, Sec. 32"
},
{
  "id": 798,
  "code": "BRBPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Disclosures in Privacy Notice under Barbados Law",
  "description": "The privacy policy fails to provide Barbadian users with information regarding data purposes, retention limits, and third-party recipients.",
  "severity": "moderate",
  "reference": "Barbados Data Protection Act, 2019, Sec. 37"
},
{
  "id": 799,
  "code": "BRBPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Direct Objection Mechanisms in Barbados",
  "description": "The website fails to offer Barbadian data subjects clear, direct mechanisms to object to or restrict processing for commercial purposes.",
  "severity": "serious",
  "reference": "Barbados Data Protection Act, 2019, Sec. 24"
},
{
  "id": 800,
  "code": "BRBPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant 72-Hour Breach Reporting in Barbados",
  "description": "The website fails to document security breach reporting protocols to notify the Commissioner within 72 hours of an incident under Barbados law.",
  "severity": "moderate",
  "reference": "Barbados Data Protection Act, 2019, Sec. 46"
},
{
  "id": 801,
  "code": "BHSPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unregistered Processing of Personal Data in Bahamas",
  "description": "The website collects sensitive personal records of Bahamian subjects without registering the processing registry with the Data Protection Commissioner.",
  "severity": "critical",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 5, Sec. 15"
},
{
  "id": 802,
  "code": "BHSPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Security Safeguards for Bahamian Data",
  "description": "The database collects and stores personal files of Bahamas residents without implementing proper security measures to prevent data loss.",
  "severity": "serious",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 11"
},
{
  "id": 803,
  "code": "BHSPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Rectification and Deletion Rights in Bahamas",
  "description": "The website privacy policy fails to document accessible contact paths for Bahamas residents to request correction or erasure of files.",
  "severity": "moderate",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 8"
},
{
  "id": 804,
  "code": "BHSPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Direct Marketing Opt-Out in Bahamas",
  "description": "The website sends advertising emails or direct marketing cookies to Bahamas subjects without providing direct, free opt-out mechanisms.",
  "severity": "serious",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 13"
},
{
  "id": 805,
  "code": "BHSPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Excessive Data Retention Limits under Bahamas Law",
  "description": "The website retains personal records of Bahamian users indefinitely without establishing specific limits or cleanup cycles.",
  "severity": "moderate",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 6"
},
{
  "id": 806,
  "code": "TTOPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Unregistered Sensitive Database Processing in Trinidad & Tobago",
  "description": "The website processes sensitive personal records of Trinidadian residents without registering the database with the Information Commissioner.",
  "severity": "critical",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 46, Section 82"
},
{
  "id": 807,
  "code": "TTOPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Data Security Safeguards in Trinidad & Tobago",
  "description": "The database collects and processes personal files of Trinidadian users without employing mandatory technical encryption or administrative controls.",
  "severity": "serious",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 38"
},
{
  "id": 808,
  "code": "TTOPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant 30-Day Access Request Timelines in Trinidad & Tobago",
  "description": "The website privacy policy fails to document contact points or procedures to respond to data access requests within 30 days.",
  "severity": "moderate",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 42"
},
{
  "id": 809,
  "code": "TTOPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Adequate Cross-Border Transfer from Trinidad & Tobago",
  "description": "The website transfers personal records of Trinidadian users to countries lacking comparable legal protection without user consent.",
  "severity": "serious",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 46(2)"
},
{
  "id": 810,
  "code": "TTOPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Secondary Purpose Processing without Consent in Trinidad & Tobago",
  "description": "The website uses personal data collected from Trinidad and Tobago users for secondary marketing purposes without obtaining prior consent.",
  "severity": "moderate",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 32"
},
{
  "id": 811,
  "code": "MCOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Notify CCIN of Processing in Monaco",
  "description": "The website collections personal details of Monégasque residents without submitting a declaration or seeking authorization from the CCIN.",
  "severity": "critical",
  "reference": "Monaco Law No. 1.165, Article 7, Article 21"
},
{
  "id": 812,
  "code": "MCOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Local Representative contacts for Foreign Controllers in Monaco",
  "description": "The foreign controller fails to appoint or disclose a designated representative in Monaco for data subject communications.",
  "severity": "serious",
  "reference": "Monaco Law No. 1.165, Article 7-1"
},
{
  "id": 813,
  "code": "MCOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Cookie Consent and Opt-Out Options in Monaco",
  "description": "The website sets advertising cookies on Monégasque browsers without prior transparent notice and active opt-in consent choices.",
  "severity": "moderate",
  "reference": "Monaco Law No. 1.165, Article 11, Article 12"
},
{
  "id": 814,
  "code": "MCOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unauthorized Export of Personal Data from Monaco",
  "description": "The website transfers personal records of Monégasque users to foreign countries without ensuring adequacy or seeking CCIN transfer authorization.",
  "severity": "serious",
  "reference": "Monaco Law No. 1.165, Article 20, Article 20-1"
},
{
  "id": 815,
  "code": "MCOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Channels to Execute Rights of Opposition in Monaco",
  "description": "The privacy policy fails to establish clear contact pathways for Monaco subjects to oppose processing or request rectification of files.",
  "severity": "moderate",
  "reference": "Monaco Law No. 1.165, Article 13, Article 15"
},
{
  "id": 816,
  "code": "ADPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Lawful Processing Basis under Andorra Law 29/2021",
  "description": "The website processes personal data of Andorran residents without establishing a valid lawful processing base under the Qualified Law.",
  "severity": "critical",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 6, Article 7"
},
{
  "id": 817,
  "code": "ADPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing DPO Designation or Registration in Andorra",
  "description": "The web controller fails to designate or register a Data Protection Officer with the APDA when performing processing as required by Law 29/2021.",
  "severity": "serious",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 37"
},
{
  "id": 818,
  "code": "ADPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Andorra Law",
  "description": "The website privacy notice fails to disclose data retention periods, legal bases, or rights of Andorran residents to complain to APDA.",
  "severity": "moderate",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 13, Article 14"
},
{
  "id": 819,
  "code": "ADPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Andorra",
  "description": "The controller transfers personal records of Andorran subjects to third countries without adequacy or APDA authorized clauses.",
  "severity": "serious",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 44, Article 45"
},
{
  "id": 820,
  "code": "ADPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Channels to Honor Erasure Rights in Andorra",
  "description": "The website fails to provide Andorran users with clear, direct, and free methods to request the erasure or restriction of their personal data.",
  "severity": "moderate",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 15, Article 18"
},
{
  "id": 821,
  "code": "SRBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Serbia",
  "description": "The website collects sensitive personal records (health, biometrics) of Serbian residents without prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Serbia Law on Personal Data Protection, Article 17, Article 95"
},
{
  "id": 822,
  "code": "SRBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Representative contacts in Serbia for Foreign Controllers",
  "description": "The foreign website controller fails to appoint or disclose a designated local representative in Serbia for data protection compliance.",
  "severity": "serious",
  "reference": "Serbia Law on Personal Data Protection, Article 44"
},
{
  "id": 823,
  "code": "SRBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Serbian Law",
  "description": "The privacy policy fails to identify Serbian processing purposes, retention details, or contact options for the local Commissioner.",
  "severity": "moderate",
  "reference": "Serbia Law on Personal Data Protection, Article 23"
},
{
  "id": 824,
  "code": "SRBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant 72-Hour Breach Reporting in Serbia",
  "description": "The website controller fails to document procedures to report security incidents to the Serbian Commissioner within 72 hours.",
  "severity": "serious",
  "reference": "Serbia Law on Personal Data Protection, Article 52, Article 95"
},
{
  "id": 825,
  "code": "SRBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Access Rights Response Methods in Serbia",
  "description": "The website fails to establish transparent channels for Serbian subjects to exercise access or erasure rights within the 30-day response period.",
  "severity": "moderate",
  "reference": "Serbia Law on Personal Data Protection, Article 21, Article 22"
},
{
  "id": 826,
  "code": "ALBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Notification in Albania",
  "description": "The website collects personal data of Albanian residents without submitting a processing notification to the Commissioner.",
  "severity": "critical",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 21, Article 39"
},
{
  "id": 827,
  "code": "ALBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unauthorized Cross-Border Transfer of Albanian Personal Data",
  "description": "The website exports personal data of Albanian users to external hosting environments without ensuring adequacy or seeking Commissioner approval.",
  "severity": "serious",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 8, Article 9"
},
{
  "id": 828,
  "code": "ALBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Albania",
  "description": "The website utilizes personal details of Albanian subjects for commercial direct marketing without providing direct, free opt-out choices.",
  "severity": "moderate",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 16"
},
{
  "id": 829,
  "code": "ALBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Database Safeguards under Albanian Law",
  "description": "The website database lacks compliance encryption and access controls required to safeguard personal records of Albanian users.",
  "severity": "serious",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 18"
},
{
  "id": 830,
  "code": "ALBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Access Rights Response Methods in Albania",
  "description": "The website privacy policy fails to establish clear contact pathways or procedures to inspect, rectify, or request deletion of records in Albania.",
  "severity": "moderate",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 12, Article 15"
},
{
  "id": 831,
  "code": "TUNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without INPDP Declaration in Tunisia",
  "description": "The website collects personal details of Tunisian residents without submitting a declaration or seeking authorization from the INPDP.",
  "severity": "critical",
  "reference": "Tunisia Organic Law No. 2004-63, Article 7, Article 76"
},
{
  "id": 832,
  "code": "TUNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Written Consent for Sensitive Data in Tunisia",
  "description": "The website processes sensitive categories of personal data (health, political views) of Tunisian residents without prior written consent.",
  "severity": "serious",
  "reference": "Tunisia Organic Law No. 2004-63, Article 13, Article 77"
},
{
  "id": 833,
  "code": "TUNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Tunisian Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Tunisian residents to request data erasure.",
  "severity": "moderate",
  "reference": "Tunisia Organic Law No. 2004-63, Article 27"
},
{
  "id": 834,
  "code": "TUNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Tunisia",
  "description": "The website utilizes personal details of Tunisian subjects for commercial direct marketing without obtaining prior opt-in consent.",
  "severity": "serious",
  "reference": "Tunisia Organic Law No. 2004-63, Article 31, Article 82"
},
{
  "id": 835,
  "code": "TUNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Data Transfer from Tunisia",
  "description": "The controller exports personal data of Tunisian users to external hosting environments without ensuring compliance with adequacy and regulatory approvals.",
  "severity": "moderate",
  "reference": "Tunisia Organic Law No. 2004-63, Article 49, Article 85"
},
{
  "id": 836,
  "code": "SENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without CDP Notification in Senegal",
  "description": "The website collects personal details of Senegalese residents without submitting a processing notification to the CDP.",
  "severity": "critical",
  "reference": "Senegal Law No. 2008-12, Article 16, Article 46"
},
{
  "id": 837,
  "code": "SENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Technical Database Safeguards in Senegal",
  "description": "The database collects and processes personal files of Senegal residents without employing mandatory technical encryption or administrative controls.",
  "severity": "serious",
  "reference": "Senegal Law No. 2008-12, Article 70, Article 71"
},
{
  "id": 838,
  "code": "SENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Third-Party Recipient Disclosures in Senegal Notice",
  "description": "The website privacy policy fails to identify external third-party recipients or cloud hosting locations for Senegal resident data.",
  "severity": "moderate",
  "reference": "Senegal Law No. 2008-12, Article 58"
},
{
  "id": 839,
  "code": "SENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Senegal",
  "description": "The website sends advertising emails or marketing cookies to Senegalese subjects without obtaining prior opt-in consent and offering opt-out paths.",
  "severity": "serious",
  "reference": "Senegal Law No. 2008-12, Article 33"
},
{
  "id": 840,
  "code": "SENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Rectification and Deletion Rights in Senegal",
  "description": "The website privacy policy fails to provide Senegalese subjects with clear contact paths to request the erasure or rectification of their records.",
  "severity": "moderate",
  "reference": "Senegal Law No. 2008-12, Article 69"
},
{
  "id": 841,
  "code": "CIVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Register Database Processing with ARTCI in Ivory Coast",
  "description": "The website controller collects personal details of Ivorian residents without submitting a registration notification to ARTCI.",
  "severity": "critical",
  "reference": "Ivory Coast Law No. 2013-450, Article 6, Article 42"
},
{
  "id": 842,
  "code": "CIVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Ivory Coast",
  "description": "The website processes sensitive personal data (biometrics, health, financial records) of Ivorian subjects without obtaining valid, prior explicit consent.",
  "severity": "serious",
  "reference": "Ivory Coast Law No. 2013-450, Article 9, Article 43"
},
{
  "id": 843,
  "code": "CIVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Erasure and Rectification Channels in Ivory Coast",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Ivorian residents to request data erasure.",
  "severity": "moderate",
  "reference": "Ivory Coast Law No. 2013-450, Article 28"
},
{
  "id": 844,
  "code": "CIVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Ivory Coast",
  "description": "The controller transfers personal records of Ivorian subjects to foreign countries without prior authorization from ARTCI.",
  "severity": "serious",
  "reference": "Ivory Coast Law No. 2013-450, Article 35, Article 45"
},
{
  "id": 845,
  "code": "CIVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Ivory Coast",
  "description": "The website sends direct marketing materials or advertising cookies to Ivorian subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Ivory Coast Law No. 2013-450, Article 25"
},
{
  "id": 846,
  "code": "MNGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Processing Personal Data without Legal Basis in Mongolia",
  "description": "The website collects personal details of Mongolian residents without establishing a valid lawful processing base or consent under Mongolian Law.",
  "severity": "critical",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 6, Article 32"
},
{
  "id": 847,
  "code": "MNGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Missing Security Incident Notification Channels under Mongolian Law",
  "description": "The website controller fails to document specific administrative or public procedures to notify Mongolian subjects of data breach incidents.",
  "severity": "serious",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 15"
},
{
  "id": 848,
  "code": "MNGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Data Subject Rectification and Erasure Rights in Mongolia",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Mongolian users to request correction or destruction of records.",
  "severity": "moderate",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 17, Article 18"
},
{
  "id": 849,
  "code": "MNGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Processing Biometric Data without Written Consent in Mongolia",
  "description": "The website collects sensitive biometric or genetic files of Mongolian subjects without obtaining prior written explicit consent.",
  "severity": "serious",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 8, Article 12"
},
{
  "id": 850,
  "code": "MNGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Non-Compliant Direct Marketing Communications in Mongolia",
  "description": "The website sends direct marketing materials or advertising cookies to Mongolian subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 23"
},
{
  "id": 851,
  "code": "NORPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Explicit Consent in Norway",
  "description": "The website processes sensitive personal records of Norwegian users without obtaining explicit, prior opt-in consent as required by the Datatilsynet.",
  "severity": "critical",
  "reference": "Norway Personal Data Act, Sec. 1 (incorporating GDPR Art. 9)"
},
{
  "id": 852,
  "code": "NORPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Age Verification for Children’s Services in Norway",
  "description": "The website fails to implement robust age verification or parental consent mechanisms for Norwegian users under the age of 13.",
  "severity": "serious",
  "reference": "Norway Personal Data Act, Sec. 12"
},
{
  "id": 853,
  "code": "NORPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy notice Disclosures under Norwegian Regulations",
  "description": "The privacy policy fails to identify Norwegian contact information or details on how to lodge a complaint with the Datatilsynet.",
  "severity": "moderate",
  "reference": "Norway Personal Data Act (GDPR Art. 13)"
},
{
  "id": 854,
  "code": "NORPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of 72-Hour Security Incident Notification Protocols in Norway",
  "description": "The website controller fails to document administrative procedures to report data breaches to the Datatilsynet within 72 hours.",
  "severity": "serious",
  "reference": "Norway Personal Data Act (GDPR Art. 33)"
},
{
  "id": 855,
  "code": "NORPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Access and Erasure Response Pathways in Norway",
  "description": "The website fails to establish transparent and free contact points for Norwegian subjects to request the deletion or retrieval of personal data.",
  "severity": "moderate",
  "reference": "Norway Personal Data Act (GDPR Art. 15, Art. 17)"
},
{
  "id": 856,
  "code": "ISLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Iceland",
  "description": "The website collects sensitive personal records of Icelandic subjects without prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 9)"
},
{
  "id": 857,
  "code": "ISLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Age Verification for Children’s Consent in Iceland",
  "description": "The website fails to implement parental consent mechanisms for Icelandic users under the age of 13 for information society services.",
  "severity": "serious",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018, Sec. 14"
},
{
  "id": 858,
  "code": "ISLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Disclosures in Icelandic Privacy Notice",
  "description": "The privacy notice fails to disclose details regarding data retention limits or the right to complain to the Icelandic DPA (Persónuvernd).",
  "severity": "moderate",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 13)"
},
{
  "id": 859,
  "code": "ISLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Security incident Notification Protocols in Iceland",
  "description": "The website fails to establish processes to notify Persónuvernd and affected subjects of security breaches in Iceland within 72 hours.",
  "severity": "serious",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 33)"
},
{
  "id": 860,
  "code": "ISLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Iceland",
  "description": "The website fails to establish transparent and free contact points for Icelandic subjects to request the correction or erasure of files.",
  "severity": "moderate",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 15, Art. 17)"
},
{
  "id": 861,
  "code": "LIEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Explicit Consent in Liechtenstein",
  "description": "The website collects sensitive personal records of Liechtenstein residents without obtaining prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 4, GDPR Art. 9"
},
{
  "id": 862,
  "code": "LIEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Age Verification for Children’s Consent in Liechtenstein",
  "description": "The website fails to implement age verification or parental consent mechanisms for Liechtenstein users under the age of 16.",
  "severity": "serious",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 12, GDPR Art. 8"
},
{
  "id": 863,
  "code": "LIEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Liechtenstein Law",
  "description": "The website privacy policy fails to identify the data retention limits or the right to complain to the Liechtenstein DPA (DSS).",
  "severity": "moderate",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 15, GDPR Art. 13"
},
{
  "id": 864,
  "code": "LIEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of 72-Hour Security incident Notification Protocols in Liechtenstein",
  "description": "The website controller fails to document administrative procedures to report data breaches to the Liechtenstein Commissioner (DSS) within 72 hours.",
  "severity": "serious",
  "reference": "Liechtenstein Data Protection Act (DSG), GDPR Art. 33"
},
{
  "id": 865,
  "code": "LIEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Liechtenstein",
  "description": "The website fails to provide Liechtenstein residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "Liechtenstein Data Protection Act (DSG), GDPR Art. 15, Art. 17"
},
{
  "id": 866,
  "code": "MKDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in North Macedonia",
  "description": "The website processes sensitive categories of personal data of North Macedonian residents without prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "North Macedonia Law on Personal Data Protection, Article 13, Article 100"
},
{
  "id": 867,
  "code": "MKDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing DPO Designation or Registration in North Macedonia",
  "description": "The website controller fails to appoint or disclose public contacts for a designated Data Protection Officer as required by local regulations.",
  "severity": "serious",
  "reference": "North Macedonia Law on Personal Data Protection, Article 32"
},
{
  "id": 868,
  "code": "MKDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Macedonian Regulations",
  "description": "The website privacy notice fails to disclose data retention periods, legal bases, or rights of Macedonian residents to complain to the Agency.",
  "severity": "moderate",
  "reference": "North Macedonia Law on Personal Data Protection, Article 17, Article 18"
},
{
  "id": 869,
  "code": "MKDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of 72-Hour Security incident Notification Protocols in North Macedonia",
  "description": "The website controller fails to document administrative procedures to report data breaches to the Personal Data Protection Agency within 72 hours.",
  "severity": "serious",
  "reference": "North Macedonia Law on Personal Data Protection, Article 37, Article 100"
},
{
  "id": 870,
  "code": "MKDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in North Macedonia",
  "description": "The website fails to provide Macedonian residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "North Macedonia Law on Personal Data Protection, Article 19, Article 21"
},
{
  "id": 871,
  "code": "MNEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Consent for Sensitive Data Processing in Montenegro",
  "description": "The website collects sensitive personal records of Montenegrin residents without prior written or digital explicit consent.",
  "severity": "critical",
  "reference": "Montenegro Law on Personal Data Protection, Article 9, Article 13"
},
{
  "id": 872,
  "code": "MNEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Database Safeguards under Montenegrin Law",
  "description": "The website database lacks compliance encryption and access controls required to safeguard personal records of Montenegrin users.",
  "severity": "serious",
  "reference": "Montenegro Law on Personal Data Protection, Article 24"
},
{
  "id": 873,
  "code": "MNEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Montenegrin Law",
  "description": "The website privacy notice fails to disclose data retention periods, legal bases, or rights of Montenegrin residents to complain to the Agency (AZLP).",
  "severity": "moderate",
  "reference": "Montenegro Law on Personal Data Protection, Article 21"
},
{
  "id": 874,
  "code": "MNEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unauthorized Cross-Border Transfer of Montenegrin Data",
  "description": "The website exports personal data of Montenegrin residents to external countries that do not ensure an adequate level of protection without AZLP approval.",
  "severity": "serious",
  "reference": "Montenegro Law on Personal Data Protection, Article 28"
},
{
  "id": 875,
  "code": "MNEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Montenegro",
  "description": "The website fails to provide Montenegrin residents with free, accessible, and transparent methods to exercise rights to check, rectify, or delete data.",
  "severity": "moderate",
  "reference": "Montenegro Law on Personal Data Protection, Article 19, Article 20"
},
{
  "id": 876,
  "code": "BIHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Bosnia & Herzegovina",
  "description": "The website collects sensitive personal records (health, biometric) of Bosnian residents without obtaining prior written or digital explicit consent.",
  "severity": "critical",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 9, Article 42"
},
{
  "id": 877,
  "code": "BIHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Security Safeguards for Bosnian Database Files",
  "description": "The website database lacks compliance security log monitoring and access restrictions required to protect Bosnian user personal records.",
  "severity": "serious",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 11"
},
{
  "id": 878,
  "code": "BIHPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy notice Disclosures under Bosnian Regulations",
  "description": "The website privacy policy fails to identify the data retention limits or the right to complain to the Agency (AZLP).",
  "severity": "moderate",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 15"
},
{
  "id": 879,
  "code": "BIHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unauthorized Cross-Border Transfer of Bosnian Personal Data",
  "description": "The website exports personal data of Bosnian residents to countries without adequate protection without Agency (AZLP) approval.",
  "severity": "serious",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 18"
},
{
  "id": 880,
  "code": "BIHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Deletion and Rectification Rights Response Channels in Bosnia",
  "description": "The website fails to provide Bosnian subjects with direct, easy, and free methods to request the correction or erasure of files.",
  "severity": "moderate",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 24, Article 25"
},
{
  "id": 881,
  "code": "MDAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Register Processing Registry with CNPDCP in Moldova",
  "description": "The website collects personal details of Moldovan residents without registering the processing register or seeking authorization from CNPDCP.",
  "severity": "critical",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 6, Article 32"
},
{
  "id": 882,
  "code": "MDAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Moldova",
  "description": "The website processes sensitive personal data (biometrics, health) of Moldovan subjects without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 5"
},
{
  "id": 883,
  "code": "MDAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy notice under Moldovan Law",
  "description": "The privacy notice fails to disclose data retention periods, legal bases, or rights of Moldovan residents to complain to CNPDCP.",
  "severity": "moderate",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 12"
},
{
  "id": 884,
  "code": "MDAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Moldova",
  "description": "The controller transfers personal records of Moldovan subjects to third countries without adequacy or CNPDCP authorized clauses.",
  "severity": "serious",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 32"
},
{
  "id": 885,
  "code": "MDAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Moldova",
  "description": "The website fails to provide Moldovan residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 15"
},
{
  "id": 886,
  "code": "KGZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Kyrgyzstan",
  "description": "The website collects personal details of Kyrgyz residents without establishing a valid lawful processing base or consent under Kyrgyz Law.",
  "severity": "critical",
  "reference": "Kyrgyzstan Law on Personal Information, Article 5, Article 29"
},
{
  "id": 887,
  "code": "KGZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Kyrgyzstan",
  "description": "The website collects sensitive personal records (health, religion) of Kyrgyz residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Kyrgyzstan Law on Personal Information, Article 8"
},
{
  "id": 888,
  "code": "KGZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Kyrgyz Law",
  "description": "The privacy policy fails to identify Kyrgyz processing purposes, retention details, or contact options for the local State Agency.",
  "severity": "moderate",
  "reference": "Kyrgyzstan Law on Personal Information, Article 19"
},
{
  "id": 889,
  "code": "KGZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Kyrgyzstan",
  "description": "The controller transfers personal records of Kyrgyz subjects to external countries without ensuring adequacy or seeking State Agency approval.",
  "severity": "serious",
  "reference": "Kyrgyzstan Law on Personal Information, Article 25"
},
{
  "id": 890,
  "code": "KGZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Kyrgyzstan",
  "description": "The website fails to establish transparent channels for Kyrgyz subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Kyrgyzstan Law on Personal Information, Article 17, Article 18"
},
{
  "id": 891,
  "code": "TJKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Tajikistan",
  "description": "The website collects personal details of Tajik residents without establishing a valid lawful processing base or consent under Tajik Law.",
  "severity": "critical",
  "reference": "Tajikistan Law on Personal Data, Article 5, Article 21"
},
{
  "id": 892,
  "code": "TJKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Tajikistan",
  "description": "The website collects sensitive personal records (health, biometrics) of Tajik residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Tajikistan Law on Personal Data, Article 8"
},
{
  "id": 893,
  "code": "TJKPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Tajik Law",
  "description": "The privacy policy fails to identify Tajik processing purposes, retention details, or contact options for the local authorized body.",
  "severity": "moderate",
  "reference": "Tajikistan Law on Personal Data, Article 15"
},
{
  "id": 894,
  "code": "TJKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Tajikistan",
  "description": "The controller transfers personal records of Tajik subjects to external countries without ensuring adequacy or seeking authorized body approval.",
  "severity": "serious",
  "reference": "Tajikistan Law on Personal Data, Article 18"
},
{
  "id": 895,
  "code": "TJKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Tajikistan",
  "description": "The website fails to establish transparent channels for Tajik subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Tajikistan Law on Personal Data, Article 11, Article 12"
},
{
  "id": 896,
  "code": "TGOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without IPDCP Notification in Togo",
  "description": "The website collects personal details of Togolese residents without submitting a processing notification to the IPDCP.",
  "severity": "critical",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 16, Article 50"
},
{
  "id": 897,
  "code": "TGOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Togo",
  "description": "The website processes sensitive categories of personal data (health, political views) of Togolese residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 13"
},
{
  "id": 898,
  "code": "TGOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Togolese Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Togolese residents to request data erasure.",
  "severity": "moderate",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 28"
},
{
  "id": 899,
  "code": "TGOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Togo",
  "description": "The controller transfers personal records of Togolese subjects to foreign countries without prior authorization from IPDCP.",
  "severity": "serious",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 35"
},
{
  "id": 900,
  "code": "TGOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Togo",
  "description": "The website sends direct marketing materials or advertising cookies to Togolese subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 25"
},
{
  "id": 901,
  "code": "BENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without APDP Declaration in Benin",
  "description": "The website collects personal details of Beninese residents without submitting a processing notification to the APDP.",
  "severity": "critical",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 390, Article 420"
},
{
  "id": 902,
  "code": "BENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Benin",
  "description": "The website processes sensitive personal data (biometrics, health) of Beninese subjects without obtaining valid, prior explicit consent.",
  "severity": "serious",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 395"
},
{
  "id": 903,
  "code": "BENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Erasure and Rectification Channels in Benin",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Beninese residents to request data erasure.",
  "severity": "moderate",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 410"
},
{
  "id": 904,
  "code": "BENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Benin",
  "description": "The controller transfers personal records of Beninese subjects to foreign countries without prior authorization from APDP.",
  "severity": "serious",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 415"
},
{
  "id": 905,
  "code": "BENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Benin",
  "description": "The website sends direct marketing materials or advertising cookies to Beninese subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 400"
},
{
  "id": 906,
  "code": "MLIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without APDP Notification in Mali",
  "description": "The website collects personal details of Malian residents without submitting a processing notification to the APDP.",
  "severity": "critical",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 15, Article 40"
},
{
  "id": 907,
  "code": "MLIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Mali",
  "description": "The website processes sensitive categories of personal data (health, political views) of Malian residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 12"
},
{
  "id": 908,
  "code": "MLIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Malian Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Malian residents to request data erasure.",
  "severity": "moderate",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 27"
},
{
  "id": 909,
  "code": "MLIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Mali",
  "description": "The controller transfers personal records of Malian subjects to foreign countries without prior authorization from APDP.",
  "severity": "serious",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 32"
},
{
  "id": 910,
  "code": "MLIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Mali",
  "description": "The website sends direct marketing materials or advertising cookies to Malian subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 23"
},
{
  "id": 911,
  "code": "NERPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without HAPDP Notification in Niger",
  "description": "The website collects personal details of Nigerien residents without submitting a processing notification to the HAPDP.",
  "severity": "critical",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 912,
  "code": "NERPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Niger",
  "description": "The website processes sensitive categories of personal data (health, political views) of Nigerien residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 12"
},
{
  "id": 913,
  "code": "NERPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Nigerien Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Nigerien residents to request data erasure.",
  "severity": "moderate",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 28"
},
{
  "id": 914,
  "code": "NERPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Niger",
  "description": "The controller transfers personal records of Nigerien subjects to foreign countries without prior authorization from HAPDP.",
  "severity": "serious",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 35"
},
{
  "id": 915,
  "code": "NERPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Niger",
  "description": "The website sends direct marketing materials or advertising cookies to Nigerien subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 24"
},
{
  "id": 916,
  "code": "GABPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without CNPDCP Notification in Gabon",
  "description": "The website collects personal details of Gabonese residents without submitting a processing notification to the CNPDCP.",
  "severity": "critical",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 917,
  "code": "GABPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Gabon",
  "description": "The website processes sensitive categories of personal data (health, political views) of Gabonese residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 12"
},
{
  "id": 918,
  "code": "GABPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Gabonese Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Gabonese residents to request data erasure.",
  "severity": "moderate",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 28"
},
{
  "id": 919,
  "code": "GABPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Gabon",
  "description": "The controller transfers personal records of Gabonese subjects to foreign countries without prior authorization from CNPDCP.",
  "severity": "serious",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 35"
},
{
  "id": 920,
  "code": "GABPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Gabon",
  "description": "The website sends direct marketing materials or advertising cookies to Gabonese subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 24"
},
{
  "id": 921,
  "code": "MDGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without CMIL Notification in Madagascar",
  "description": "The website collects personal details of Malagasy residents without submitting a processing notification to the CMIL.",
  "severity": "critical",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 922,
  "code": "MDGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Madagascar",
  "description": "The website processes sensitive categories of personal data (health, political views) of Malagasy residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 12"
},
{
  "id": 923,
  "code": "MDGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Malagasy Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Malagasy residents to request data erasure.",
  "severity": "moderate",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 28"
},
{
  "id": 924,
  "code": "MDGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Madagascar",
  "description": "The controller transfers personal records of Malagasy subjects to foreign countries without prior authorization from CMIL.",
  "severity": "serious",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 35"
},
{
  "id": 925,
  "code": "MDGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Madagascar",
  "description": "The website sends direct marketing materials or advertising cookies to Malagasy subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 24"
},
{
  "id": 926,
  "code": "CPVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without CNPD Notification in Cabo Verde",
  "description": "The website collects personal details of Cape Verdean residents without submitting a processing notification to the CNPD.",
  "severity": "critical",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 927,
  "code": "CPVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Cabo Verde",
  "description": "The website processes sensitive categories of personal data (health, political views) of Cape Verdean residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 12"
},
{
  "id": 928,
  "code": "CPVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Cape Verdean Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Cape Verdean residents to request data erasure.",
  "severity": "moderate",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 28"
},
{
  "id": 929,
  "code": "CPVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Cabo Verde",
  "description": "The controller transfers personal records of Cape Verdean subjects to foreign countries without prior authorization from CNPD.",
  "severity": "serious",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 35"
},
{
  "id": 930,
  "code": "CPVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Cabo Verde",
  "description": "The website sends direct marketing materials or advertising cookies to Cape Verdean subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 24"
},
{
  "id": 931,
  "code": "LSTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Consent in Lesotho",
  "description": "The website collects sensitive personal records of Lesotho residents without obtaining prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Lesotho Data Protection Act 2011, Sec. 15, Sec. 25"
},
{
  "id": 932,
  "code": "LSTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Technical Database Safeguards in Lesotho",
  "description": "The database collects and processes personal files of Lesotho residents without employing mandatory technical encryption or administrative controls.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 32"
},
{
  "id": 933,
  "code": "LSTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Third-Party Recipient Disclosures in Lesotho Notice",
  "description": "The website privacy policy fails to identify external third-party recipients or cloud hosting locations for Lesotho resident data.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 38"
},
{
  "id": 934,
  "code": "LSTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Lesotho",
  "description": "The website sends advertising emails or marketing cookies to Lesotho subjects without obtaining prior opt-in consent and offering opt-out paths.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 33"
},
{
  "id": 935,
  "code": "LSTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Rectification and Deletion Rights in Lesotho",
  "description": "The website privacy policy fails to provide Lesotho subjects with clear contact paths to request the erasure or rectification of their records.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 29"
},
{
  "id": 936,
  "code": "COGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without CNIL Notification in Congo",
  "description": "The website collects personal details of Congolese residents without submitting a processing notification to the CNIL.",
  "severity": "critical",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 937,
  "code": "COGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Congo",
  "description": "The website processes sensitive categories of personal data (health, political views) of Congolese residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 12"
},
{
  "id": 938,
  "code": "COGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Congolese Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Congolese residents to request data erasure.",
  "severity": "moderate",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 28"
},
{
  "id": 939,
  "code": "COGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Congo",
  "description": "The controller transfers personal records of Congolese subjects to foreign countries without prior authorization from CNIL.",
  "severity": "serious",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 35"
},
{
  "id": 940,
  "code": "COGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Congo",
  "description": "The website sends direct marketing materials or advertising cookies to Congolese subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 24"
},
{
  "id": 941,
  "code": "FIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Fiji",
  "description": "The website collects personal details of Fijian residents without establishing a valid lawful processing base or consent under Fiji law.",
  "severity": "critical",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 942,
  "code": "FIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Fiji",
  "description": "The website collects sensitive personal records (health, biometric) of Fijian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 943,
  "code": "FIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Fiji Law",
  "description": "The privacy policy fails to identify Fijian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 944,
  "code": "FIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Fiji",
  "description": "The controller transfers personal records of Fijian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 945,
  "code": "FIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Fiji",
  "description": "The website fails to establish transparent channels for Fijian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 946,
  "code": "PNGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Processing Personal Data without Legal Basis in Papua New Guinea",
  "description": "The website collects personal details of PNG residents without establishing a valid lawful processing base or consent under PNG law.",
  "severity": "critical",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 947,
  "code": "PNGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Lack of Explicit Consent for Sensitive Data in Papua New Guinea",
  "description": "The website collects sensitive personal records (health, biometric) of PNG residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 948,
  "code": "PNGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Disclosures in Privacy Notice under PNG Law",
  "description": "The privacy policy fails to identify PNG processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 949,
  "code": "PNGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Non-Compliant Cross-Border Transfers from Papua New Guinea",
  "description": "The controller transfers personal records of PNG subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 950,
  "code": "PNGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Subject Rights Response Methods in Papua New Guinea",
  "description": "The website fails to establish transparent channels for PNG subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 951,
  "code": "SMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data Processing in San Marino",
  "description": "The website collects sensitive personal records of Sammarinese subjects without obtaining valid, prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 6, Art. 83"
},
{
  "id": 952,
  "code": "SMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing DPO Designation or Registration in San Marino",
  "description": "The website controller fails to appoint or disclose public contacts for a designated Data Protection Officer as required by Sammarinese law.",
  "severity": "serious",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 37"
},
{
  "id": 953,
  "code": "SMRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Sammarinese Privacy Notice",
  "description": "The privacy notice fails to disclose data retention periods, legal bases, or rights of Sammarinese residents to complain to the APD.",
  "severity": "moderate",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 13"
},
{
  "id": 954,
  "code": "SMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from San Marino",
  "description": "The controller transfers personal records of Sammarinese subjects to third countries without adequacy or APD authorized clauses.",
  "severity": "serious",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 45"
},
{
  "id": 955,
  "code": "SMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in San Marino",
  "description": "The website fails to provide Sammarinese residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 15, Art. 17"
},
{
  "id": 956,
  "code": "GIBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Explicit Consent in Gibraltar",
  "description": "The website processes sensitive personal records of Gibraltar users without obtaining explicit, prior opt-in consent as required by the GRA.",
  "severity": "critical",
  "reference": "Gibraltar Data Protection Act 2004, Sec. 2 (GDPR Art. 9)"
},
{
  "id": 957,
  "code": "GIBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Age Verification for Children’s Consent in Gibraltar",
  "description": "The website fails to implement age verification or parental consent mechanisms for Gibraltar users under the age of 13.",
  "severity": "serious",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 8)"
},
{
  "id": 958,
  "code": "GIBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Disclosures in Gibraltar Privacy Notice",
  "description": "The privacy notice fails to disclose details regarding data retention limits or the right to complain to the Gibraltar Regulatory Authority (GRA).",
  "severity": "moderate",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 13)"
},
{
  "id": 959,
  "code": "GIBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of 72-Hour Security incident Notification Protocols in Gibraltar",
  "description": "The website controller fails to document administrative procedures to report data breaches to the GRA within 72 hours.",
  "severity": "serious",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 33)"
},
{
  "id": 960,
  "code": "GIBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Gibraltar",
  "description": "The website fails to provide Gibraltar residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 15, Art. 17)"
},
{
  "id": 961,
  "code": "JSYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Explicit Consent in Jersey",
  "description": "The website collects sensitive personal records of Jersey residents without obtaining prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Data Protection (Jersey) Law 2018, Schedule 2, Sec. 9"
},
{
  "id": 962,
  "code": "JSYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Age Verification for Children’s Consent in Jersey",
  "description": "The website fails to implement age verification or parental consent mechanisms for Jersey users under the age of 13.",
  "severity": "serious",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 10"
},
{
  "id": 963,
  "code": "JSYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Jersey Law",
  "description": "The website privacy policy fails to identify the data retention limits or the right to complain to the Jersey Commissioner (JOIC).",
  "severity": "moderate",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 12"
},
{
  "id": 964,
  "code": "JSYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of 72-Hour Security incident Notification Protocols in Jersey",
  "description": "The website controller fails to document administrative procedures to report data breaches to the Jersey Commissioner (JOIC) within 72 hours.",
  "severity": "serious",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 21"
},
{
  "id": 965,
  "code": "JSYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Jersey",
  "description": "The website fails to provide Jersey residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 28, Sec. 30"
},
{
  "id": 966,
  "code": "GGYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Explicit Consent in Guernsey",
  "description": "The website collects sensitive personal records of Guernsey residents without obtaining prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 9, Sec. 80"
},
{
  "id": 967,
  "code": "GGYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Age Verification for Children’s Consent in Guernsey",
  "description": "The website fails to implement age verification or parental consent mechanisms for Guernsey users under the age of 13.",
  "severity": "serious",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 10"
},
{
  "id": 968,
  "code": "GGYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Guernsey Law",
  "description": "The website privacy policy fails to identify the data retention limits or the right to complain to the Guernsey Commissioner (ODPA).",
  "severity": "moderate",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 12"
},
{
  "id": 969,
  "code": "GGYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of 72-Hour Security incident Notification Protocols in Guernsey",
  "description": "The website controller fails to document administrative procedures to report data breaches to the Guernsey Commissioner (ODPA) within 72 hours.",
  "severity": "serious",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 21"
},
{
  "id": 970,
  "code": "GGYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Guernsey",
  "description": "The website fails to provide Guernsey residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 28, Sec. 30"
},
{
  "id": 971,
  "code": "IOMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data Processing in Isle of Man",
  "description": "The website collects sensitive personal records of Manx residents without obtaining prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 9)"
},
{
  "id": 972,
  "code": "IOMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Incomplete Age Verification for Children’s Consent in Isle of Man",
  "description": "The website fails to implement age verification or parental consent mechanisms for Manx users under the age of 13.",
  "severity": "serious",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 8)"
},
{
  "id": 973,
  "code": "IOMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Manx Law",
  "description": "The website privacy policy fails to identify the data retention limits or the right to complain to the Isle of Man Commissioner (IMIO).",
  "severity": "moderate",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 13)"
},
{
  "id": 974,
  "code": "IOMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of 72-Hour Security incident Notification Protocols in Isle of Man",
  "description": "The website controller fails to document administrative procedures to report data breaches to the Manx Commissioner (IMIO) within 72 hours.",
  "severity": "serious",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 33)"
},
{
  "id": 975,
  "code": "IOMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Isle of Man",
  "description": "The website fails to provide Manx residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 15, Art. 17)"
},
{
  "id": 976,
  "code": "FROPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data Processing in Faroe Islands",
  "description": "The website collects sensitive personal records of Faroese residents without obtaining prior written or digital explicit consent.",
  "severity": "critical",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 9"
},
{
  "id": 977,
  "code": "FROPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Database Security Safeguards in Faroe Islands",
  "description": "The website database lacks compliance encryption and access controls required to safeguard personal records of Faroese users.",
  "severity": "serious",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 11"
},
{
  "id": 978,
  "code": "FROPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Faroese Law",
  "description": "The website privacy notice fails to disclose data retention periods, legal bases, or rights of Faroese residents to complain to Datatilsynet.",
  "severity": "moderate",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 21"
},
{
  "id": 979,
  "code": "FROPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unauthorized Cross-Border Transfer of Faroese Data",
  "description": "The website exports personal data of Faroese residents to external countries that do not ensure an adequate level of protection without Datatilsynet approval.",
  "severity": "serious",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 28"
},
{
  "id": 980,
  "code": "FROPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Faroe Islands",
  "description": "The website fails to provide Faroese residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 19"
},
{
  "id": 981,
  "code": "BMUPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Explicit Consent for Sensitive Data under Bermuda PIPA",
  "description": "The website collects sensitive personal records (health, financial, genetic) of Bermudian residents without obtaining prior explicit opt-in consent.",
  "severity": "critical",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 6, Section 47"
},
{
  "id": 982,
  "code": "BMUPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Missing Privacy Officer Contact Info under Bermuda PIPA",
  "description": "The website privacy policy fails to identify or provide direct contact routes for the designated Privacy Officer in Bermuda.",
  "severity": "serious",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 9"
},
{
  "id": 983,
  "code": "BMUPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Subject Profiling Opt-Out under Bermuda PIPA",
  "description": "The website fails to provide Bermudian residents with clear options to opt-out or object to processing for profiling and marketing.",
  "severity": "moderate",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 15"
},
{
  "id": 984,
  "code": "BMUPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Formal Data Processor Agreements under Bermuda Law",
  "description": "The controller transfers personal records of Bermudian residents to third-party processors without a binding written contract ensuring equivalent protection.",
  "severity": "serious",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 12"
},
{
  "id": 985,
  "code": "BMUPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfers from Bermuda",
  "description": "The controller exports personal data of Bermudian users to countries without adequate protection without establishing equivalent protection level.",
  "severity": "moderate",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 15"
},
{
  "id": 986,
  "code": "CYMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Lack of Explicit Consent for Sensitive Data under Cayman DPA",
  "description": "The website collects sensitive personal records (health, financial, genetic) of Caymanian residents without obtaining prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 1)"
},
{
  "id": 987,
  "code": "CYMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Data Security Safeguards in Cayman Islands",
  "description": "The database collects and processes personal files of Caymanian users without employing mandatory technical encryption or administrative controls.",
  "severity": "serious",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 11"
},
{
  "id": 988,
  "code": "CYMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant 30-Day Access Request Timelines in Cayman Islands",
  "description": "The website privacy policy fails to document contact points or procedures to respond to data access requests within 30 days.",
  "severity": "moderate",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 15"
},
{
  "id": 989,
  "code": "CYMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Adequate Cross-Border Transfer from Cayman Islands",
  "description": "The website transfers personal records of Caymanian users to countries lacking comparable legal protection without user consent or approved clauses.",
  "severity": "serious",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 8)"
},
{
  "id": 990,
  "code": "CYMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Excessive Data Retention Limits under Cayman Law",
  "description": "The website retains personal records of Caymanian users indefinitely without establishing specific limits or cleanup cycles.",
  "severity": "moderate",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 5)"
},
{
  "id": 991,
  "code": "LCAPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Sensitive Personal Data without Written Consent in Saint Lucia",
  "description": "The website collects sensitive personal records (health, financial details) of Saint Lucian subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 15, Sec. 50"
},
{
  "id": 992,
  "code": "LCAPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Personal Data without Controller Registration in Saint Lucia",
  "description": "The website controller collects personal details of Saint Lucian residents without registering with the Commissioner.",
  "severity": "serious",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 10"
},
{
  "id": 993,
  "code": "LCAPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Technical Database Safeguards in Saint Lucia",
  "description": "The database collects and processes personal files of Saint Lucian residents without employing mandatory technical encryption or administrative controls.",
  "severity": "moderate",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 32"
},
{
  "id": 994,
  "code": "LCAPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Data Retention Cycles in Saint Lucia",
  "description": "The website retains personal records of Saint Lucian users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 14"
},
{
  "id": 995,
  "code": "LCAPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfer of Saint Lucian Data",
  "description": "The controller transfers data of Saint Lucian residents outside the country without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 47"
},
{
  "id": 996,
  "code": "KNAPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Sensitive Personal Data without Consent in St. Kitts & Nevis",
  "description": "The website collects sensitive personal records (health, financial details) of St. Kitts & Nevis subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 15, Sec. 50"
},
{
  "id": 997,
  "code": "KNAPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Personal Data without Controller Registration in St. Kitts & Nevis",
  "description": "The website controller collects personal details of St. Kitts & Nevis residents without registering with the Commissioner.",
  "severity": "serious",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 10"
},
{
  "id": 998,
  "code": "KNAPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Technical Database Safeguards in St. Kitts & Nevis",
  "description": "The database collects and processes personal files of St. Kitts & Nevis residents without employing mandatory technical encryption or administrative controls.",
  "severity": "moderate",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 32"
},
{
  "id": 999,
  "code": "KNAPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Data Retention Cycles in St. Kitts & Nevis",
  "description": "The website retains personal records of St. Kitts & Nevis users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 14"
},
{
  "id": 1000,
  "code": "KNAPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfer of St. Kitts & Nevis Data",
  "description": "The controller transfers data of St. Kitts & Nevis residents outside the country without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 47"
},
{
  "id": 1001,
  "code": "ATGPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Sensitive Personal Data without Consent in Antigua & Barbuda",
  "description": "The website collects sensitive personal records (health, financial details) of Antigua & Barbuda subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 15, Sec. 50"
},
{
  "id": 1002,
  "code": "ATGPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Personal Data without Controller Registration in Antigua & Barbuda",
  "description": "The website controller collects personal details of Antigua & Barbuda residents without registering with the Commissioner.",
  "severity": "serious",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 10"
},
{
  "id": 1003,
  "code": "ATGPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Technical Database Safeguards in Antigua & Barbuda",
  "description": "The database collects and processes personal files of Antigua & Barbuda residents without employing mandatory technical encryption or administrative controls.",
  "severity": "moderate",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 32"
},
{
  "id": 1004,
  "code": "ATGPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Data Retention Cycles in Antigua & Barbuda",
  "description": "The website retains personal records of Antigua & Barbuda users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 14"
},
{
  "id": 1005,
  "code": "ATGPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfer of Antigua & Barbuda Data",
  "description": "The controller transfers data of Antigua & Barbuda residents outside the country without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 47"
},
{
  "id": 1006,
  "code": "SYCPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Seychelles",
  "description": "The website processes sensitive categories of personal data of Seychelles residents without prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Seychelles Data Protection Act 2003, Sec. 10, Sec. 28"
},
{
  "id": 1007,
  "code": "SYCPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Database Security Safeguards in Seychelles",
  "description": "The website database lacks compliance encryption and access controls required to safeguard personal records of Seychelles users.",
  "severity": "serious",
  "reference": "Seychelles Data Protection Act 2003, Sec. 11"
},
{
  "id": 1008,
  "code": "SYCPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Privacy Notice Disclosures under Seychelles Law",
  "description": "The website privacy notice fails to disclose data retention periods, legal bases, or rights of Seychelles residents to complain to the regulator.",
  "severity": "moderate",
  "reference": "Seychelles Data Protection Act 2003, Sec. 21"
},
{
  "id": 1009,
  "code": "SYCPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Unauthorized Cross-Border Transfer of Seychelles Data",
  "description": "The website exports personal data of Seychelles residents to external countries that do not ensure an adequate level of protection without regulator approval.",
  "severity": "serious",
  "reference": "Seychelles Data Protection Act 2003, Sec. 28"
},
{
  "id": 1010,
  "code": "SYCPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Access Channels in Seychelles",
  "description": "The website fails to provide Seychelles residents with free, accessible, and transparent methods to exercise rights of access, correction, or deletion.",
  "severity": "moderate",
  "reference": "Seychelles Data Protection Act 2003, Sec. 19"
},
{
  "id": 1011,
  "code": "SWZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Personal Data without Consent in Eswatini",
  "description": "The website collects sensitive personal records of Eswatini residents without obtaining prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Eswatini Data Protection Act 2018, Sec. 15, Sec. 25"
},
{
  "id": 1012,
  "code": "SWZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Technical Database Safeguards in Eswatini",
  "description": "The database collects and processes personal files of Eswatini residents without employing mandatory technical encryption or administrative controls.",
  "severity": "serious",
  "reference": "Eswatini Data Protection Act 2018, Sec. 32"
},
{
  "id": 1013,
  "code": "SWZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Missing Third-Party Recipient Disclosures in Eswatini Notice",
  "description": "The website privacy policy fails to identify external third-party recipients or cloud hosting locations for Eswatini resident data.",
  "severity": "moderate",
  "reference": "Eswatini Data Protection Act 2018, Sec. 38"
},
{
  "id": 1014,
  "code": "SWZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Eswatini",
  "description": "The website sends advertising emails or marketing cookies to Eswatini subjects without obtaining prior opt-in consent and offering opt-out paths.",
  "severity": "serious",
  "reference": "Eswatini Data Protection Act 2018, Sec. 33"
},
{
  "id": 1015,
  "code": "SWZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Rectification and Deletion Rights in Eswatini",
  "description": "The website privacy policy fails to provide Eswatini subjects with clear contact paths to request the erasure or rectification of their records.",
  "severity": "moderate",
  "reference": "Eswatini Data Protection Act 2018, Sec. 29"
},
{
  "id": 1016,
  "code": "GINPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without APDP Notification in Guinea",
  "description": "The website collects personal details of Guinean residents without submitting a processing notification to the APDP.",
  "severity": "critical",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1017,
  "code": "GINPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Guinea",
  "description": "The website processes sensitive categories of personal data (health, political views) of Guinean residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 12"
},
{
  "id": 1018,
  "code": "GINPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Guinean Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Guinean residents to request data erasure.",
  "severity": "moderate",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 28"
},
{
  "id": 1019,
  "code": "GINPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Guinea",
  "description": "The controller transfers personal records of Guinean subjects to foreign countries without prior authorization from APDP.",
  "severity": "serious",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 35"
},
{
  "id": 1020,
  "code": "GINPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Guinea",
  "description": "The website sends direct marketing materials or advertising cookies to Guinean subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 24"
},
{
  "id": 1021,
  "code": "BFAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without CIL Notification in Burkina Faso",
  "description": "The website collects personal details of Burkinabe residents without submitting a processing notification to the CIL.",
  "severity": "critical",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1022,
  "code": "BFAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Burkina Faso",
  "description": "The website processes sensitive categories of personal data (health, political views) of Burkinabe residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 12"
},
{
  "id": 1023,
  "code": "BFAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Burkinabe Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Burkinabe residents to request data erasure.",
  "severity": "moderate",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 28"
},
{
  "id": 1024,
  "code": "BFAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Burkina Faso",
  "description": "The controller transfers personal records of Burkinabe subjects to foreign countries without prior authorization from CIL.",
  "severity": "serious",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 35"
},
{
  "id": 1025,
  "code": "BFAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Burkina Faso",
  "description": "The website sends direct marketing materials or advertising cookies to Burkinabe subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 24"
},
{
  "id": 1026,
  "code": "MRTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without APDP Notification in Mauritania",
  "description": "The website collects personal details of Mauritanian residents without submitting a processing notification to the APDP.",
  "severity": "critical",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1027,
  "code": "MRTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Mauritania",
  "description": "The website processes sensitive categories of personal data (health, political views) of Mauritanian residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 12"
},
{
  "id": 1028,
  "code": "MRTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Mauritanian Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Mauritanian residents to request data erasure.",
  "severity": "moderate",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 28"
},
{
  "id": 1029,
  "code": "MRTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Mauritania",
  "description": "The controller transfers personal records of Mauritanian subjects to foreign countries without prior authorization from APDP.",
  "severity": "serious",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 35"
},
{
  "id": 1030,
  "code": "MRTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Mauritania",
  "description": "The website sends direct marketing materials or advertising cookies to Mauritanian subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 24"
},
{
  "id": 1031,
  "code": "TCDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without ANAD Notification in Chad",
  "description": "The website collects personal details of Chadian residents without submitting a processing notification to the ANAD.",
  "severity": "critical",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1032,
  "code": "TCDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Chad",
  "description": "The website processes sensitive categories of personal data (health, political views) of Chadian residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 12"
},
{
  "id": 1033,
  "code": "TCDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Chadian Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Chadian residents to request data erasure.",
  "severity": "moderate",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 28"
},
{
  "id": 1034,
  "code": "TCDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Chad",
  "description": "The controller transfers personal records of Chadian subjects to foreign countries without prior authorization from ANAD.",
  "severity": "serious",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 35"
},
{
  "id": 1035,
  "code": "TCDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Chad",
  "description": "The website sends direct marketing materials or advertising cookies to Chadian subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 24"
},
{
  "id": 1036,
  "code": "MACPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data under Macau Law",
  "description": "The website collects sensitive personal records (health, financial, genetic) of Macau residents without obtaining prior explicit written or digital consent.",
  "severity": "critical",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 7, Article 24"
},
{
  "id": 1037,
  "code": "MACPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Failure to Register Database Processing with GPDP in Macau",
  "description": "The website controller collects personal details of Macau residents without submitting a registration notification to the GPDP.",
  "severity": "serious",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 19"
},
{
  "id": 1038,
  "code": "MACPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Macau Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Macau residents to request data erasure.",
  "severity": "moderate",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 12"
},
{
  "id": 1039,
  "code": "MACPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Macau",
  "description": "The controller transfers personal records of Macau subjects to foreign countries without prior authorization from GPDP.",
  "severity": "serious",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 19, Article 20"
},
{
  "id": 1040,
  "code": "MACPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Macau",
  "description": "The website sends direct marketing materials or advertising cookies to Macau subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 12"
},
{
  "id": 1041,
  "code": "NPLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Nepal",
  "description": "The website collects personal details of Nepalese residents without establishing a valid lawful processing base or consent under Nepal law.",
  "severity": "critical",
  "reference": "Nepal Individual Privacy Act 2018, Section 4, Section 30"
},
{
  "id": 1042,
  "code": "NPLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Nepal",
  "description": "The website collects sensitive personal records (health, biometric) of Nepalese residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Nepal Individual Privacy Act 2018, Section 10"
},
{
  "id": 1043,
  "code": "NPLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Nepal Law",
  "description": "The privacy policy fails to identify Nepalese processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Nepal Individual Privacy Act 2018, Section 12"
},
{
  "id": 1044,
  "code": "NPLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Nepal",
  "description": "The controller transfers personal records of Nepalese subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Nepal Individual Privacy Act 2018, Section 14"
},
{
  "id": 1045,
  "code": "NPLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Nepal",
  "description": "The website fails to establish transparent channels for Nepalese subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Nepal Individual Privacy Act 2018, Section 15"
},
{
  "id": 1046,
  "code": "PAKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Pakistan",
  "description": "The website collects personal details of Pakistani residents without establishing a valid lawful processing base or consent under Pakistan law.",
  "severity": "critical",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1047,
  "code": "PAKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Pakistan",
  "description": "The website collects sensitive personal records (health, biometric) of Pakistani residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1048,
  "code": "PAKPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Pakistan Law",
  "description": "The privacy policy fails to identify Pakistani processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1049,
  "code": "PAKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Pakistan",
  "description": "The controller transfers personal records of Pakistani subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1050,
  "code": "PAKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Pakistan",
  "description": "The website fails to establish transparent channels for Pakistani subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1051,
  "code": "DJIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without CNDP Notification in Djibouti",
  "description": "The website collects personal details of Djiboutian residents without submitting a processing notification to the CNDP.",
  "severity": "critical",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1052,
  "code": "DJIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Djibouti",
  "description": "The website processes sensitive categories of personal data (health, political views) of Djiboutian residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 12"
},
{
  "id": 1053,
  "code": "DJIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Djiboutian Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Djiboutian residents to request data erasure.",
  "severity": "moderate",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 28"
},
{
  "id": 1054,
  "code": "DJIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Djibouti",
  "description": "The controller transfers personal records of Djiboutian subjects to foreign countries without prior authorization from CNDP.",
  "severity": "serious",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 35"
},
{
  "id": 1055,
  "code": "DJIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Djibouti",
  "description": "The website sends direct marketing materials or advertising cookies to Djiboutian subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 24"
},
{
  "id": 1056,
  "code": "LAOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Laos",
  "description": "The website collects personal details of Laotian residents without establishing a valid lawful processing base or consent under Laos law.",
  "severity": "critical",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 5, Sec. 21"
},
{
  "id": 1057,
  "code": "LAOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Laos",
  "description": "The website collects sensitive personal records (health, biometric) of Laotian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 10"
},
{
  "id": 1058,
  "code": "LAOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Laos Law",
  "description": "The privacy policy fails to identify Laotian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 12"
},
{
  "id": 1059,
  "code": "LAOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Laos",
  "description": "The controller transfers personal records of Laotian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 14"
},
{
  "id": 1060,
  "code": "LAOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Laos",
  "description": "The website fails to establish transparent channels for Laotian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 15"
},
{
  "id": 1061,
  "code": "BTNDP-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Bhutan",
  "description": "The website collects personal details of Bhutanese residents without establishing a valid lawful processing base or consent under Bhutan law.",
  "severity": "critical",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 320"
},
{
  "id": 1062,
  "code": "BTNDP-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Bhutan",
  "description": "The website collects sensitive personal records (health, biometric) of Bhutanese residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 321"
},
{
  "id": 1063,
  "code": "BTNDP-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Bhutan Law",
  "description": "The privacy policy fails to identify Bhutanese processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 322"
},
{
  "id": 1064,
  "code": "BTNDP-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Bhutan",
  "description": "The controller transfers personal records of Bhutanese subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 325"
},
{
  "id": 1065,
  "code": "BTNDP-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Bhutan",
  "description": "The website fails to establish transparent channels for Bhutanese subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 327"
},
{
  "id": 1066,
  "code": "MMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Myanmar",
  "description": "The website collects personal details of Myanmar residents without establishing a valid lawful processing base or consent under Myanmar law.",
  "severity": "critical",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 5"
},
{
  "id": 1067,
  "code": "MMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Myanmar",
  "description": "The website collects sensitive personal records (health, biometric) of Myanmar residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 6"
},
{
  "id": 1068,
  "code": "MMRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Myanmar Law",
  "description": "The privacy policy fails to identify Myanmar processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 7"
},
{
  "id": 1069,
  "code": "MMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Myanmar",
  "description": "The controller transfers personal records of Myanmar subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 8"
},
{
  "id": 1070,
  "code": "MMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Myanmar",
  "description": "The website fails to establish transparent channels for Myanmar subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 9"
},
{
  "id": 1071,
  "code": "KHMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Cambodia",
  "description": "The website collects personal details of Cambodian residents without establishing a valid lawful processing base or consent under Cambodia law.",
  "severity": "critical",
  "reference": "Cambodia Civil Code, Article 7, Article 11"
},
{
  "id": 1072,
  "code": "KHMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Cambodia",
  "description": "The website collects sensitive personal records (health, biometric) of Cambodian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Cambodia Civil Code, Article 8"
},
{
  "id": 1073,
  "code": "KHMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Cambodia Law",
  "description": "The privacy policy fails to identify Cambodian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Cambodia Civil Code, Article 9"
},
{
  "id": 1074,
  "code": "KHMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Cambodia",
  "description": "The controller transfers personal records of Cambodian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Cambodia Civil Code, Article 10"
},
{
  "id": 1075,
  "code": "KHMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Cambodia",
  "description": "The website fails to establish transparent channels for Cambodian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Cambodia Civil Code, Article 12"
},
{
  "id": 1076,
  "code": "LBNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Notification in Lebanon",
  "description": "The website collects personal details of Lebanese residents without submitting a processing notification to the Ministry.",
  "severity": "critical",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 85, Article 95"
},
{
  "id": 1077,
  "code": "LBNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Lebanon",
  "description": "The website processes sensitive categories of personal data (health, biometric) of Lebanese residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 88"
},
{
  "id": 1078,
  "code": "LBNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Lebanese Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Lebanese residents to request data erasure.",
  "severity": "moderate",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 92"
},
{
  "id": 1079,
  "code": "LBNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Lebanon",
  "description": "The controller transfers personal records of Lebanese subjects to foreign countries without prior authorization from the Ministry.",
  "severity": "serious",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 94"
},
{
  "id": 1080,
  "code": "LBNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Lebanon",
  "description": "The website sends direct marketing materials or advertising cookies to Lebanese subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 90"
},
{
  "id": 1081,
  "code": "YEMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Yemen",
  "description": "The website collects personal details of Yemeni residents without establishing a valid lawful processing base or consent under Yemen law.",
  "severity": "critical",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 5"
},
{
  "id": 1082,
  "code": "YEMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Yemen",
  "description": "The website collects sensitive personal records (health, biometric) of Yemeni residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 8"
},
{
  "id": 1083,
  "code": "YEMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Yemen Law",
  "description": "The privacy policy fails to identify Yemeni processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 12"
},
{
  "id": 1084,
  "code": "YEMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Yemen",
  "description": "The controller transfers personal records of Yemeni subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 14"
},
{
  "id": 1085,
  "code": "YEMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Yemen",
  "description": "The website fails to establish transparent channels for Yemeni subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 15"
},
{
  "id": 1086,
  "code": "SYRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Syria",
  "description": "The website collects personal details of Syrian residents without establishing a valid lawful processing base or consent under Syrian law.",
  "severity": "critical",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 5"
},
{
  "id": 1087,
  "code": "SYRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Syria",
  "description": "The website collects sensitive personal records (health, biometric) of Syrian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 8"
},
{
  "id": 1088,
  "code": "SYRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Syrian Law",
  "description": "The privacy policy fails to identify Syrian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 12"
},
{
  "id": 1089,
  "code": "SYRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Syria",
  "description": "The controller transfers personal records of Syrian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 14"
},
{
  "id": 1090,
  "code": "SYRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Syria",
  "description": "The website fails to establish transparent channels for Syrian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 15"
},
{
  "id": 1091,
  "code": "IRQPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Iraq",
  "description": "The website collects personal details of Iraqi residents without establishing a valid lawful processing base or consent under Iraq law.",
  "severity": "critical",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 5"
},
{
  "id": 1092,
  "code": "IRQPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Iraq",
  "description": "The website collects sensitive personal records (health, biometric) of Iraqi residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 8"
},
{
  "id": 1093,
  "code": "IRQPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Iraq Law",
  "description": "The privacy policy fails to identify Iraqi processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 12"
},
{
  "id": 1094,
  "code": "IRQPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Iraq",
  "description": "The controller transfers personal records of Iraqi subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 14"
},
{
  "id": 1095,
  "code": "IRQPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Iraq",
  "description": "The website fails to establish transparent channels for Iraqi subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 15"
},
{
  "id": 1096,
  "code": "MWIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Malawi",
  "description": "The website collects personal details of Malawian residents without establishing a valid lawful processing base or consent under Malawi law.",
  "severity": "critical",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 72, Sec. 80"
},
{
  "id": 1097,
  "code": "MWIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Malawi",
  "description": "The website collects sensitive personal records (health, biometric) of Malawian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 73"
},
{
  "id": 1098,
  "code": "MWIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Malawi Law",
  "description": "The privacy policy fails to identify Malawian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 74"
},
{
  "id": 1099,
  "code": "MWIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Malawi",
  "description": "The controller transfers personal records of Malawian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 78"
},
{
  "id": 1100,
  "code": "MWIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Malawi",
  "description": "The website fails to establish transparent channels for Malawian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 79"
},
{
  "id": 1101,
  "code": "MOZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Mozambique",
  "description": "The website collects personal details of Mozambican residents without establishing a valid lawful processing base or consent under Mozambique law.",
  "severity": "critical",
  "reference": "Mozambique Electronic Transactions Law, Sec. 15, Sec. 25"
},
{
  "id": 1102,
  "code": "MOZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Mozambique",
  "description": "The website collects sensitive personal records (health, biometric) of Mozambican residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Mozambique Electronic Transactions Law, Sec. 16"
},
{
  "id": 1103,
  "code": "MOZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Mozambique Law",
  "description": "The privacy policy fails to identify Mozambican processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Mozambique Electronic Transactions Law, Sec. 18"
},
{
  "id": 1104,
  "code": "MOZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Mozambique",
  "description": "The controller transfers personal records of Mozambican subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Mozambique Electronic Transactions Law, Sec. 20"
},
{
  "id": 1105,
  "code": "MOZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Mozambique",
  "description": "The website fails to establish transparent channels for Mozambican subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Mozambique Electronic Transactions Law, Sec. 22"
},
{
  "id": 1106,
  "code": "NAMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Namibia",
  "description": "The website collects personal details of Namibian residents without establishing a valid lawful processing base or consent under Namibia law.",
  "severity": "critical",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 15"
},
{
  "id": 1107,
  "code": "NAMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Namibia",
  "description": "The website collects sensitive personal records (health, biometric) of Namibian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 18"
},
{
  "id": 1108,
  "code": "NAMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Namibia Law",
  "description": "The privacy policy fails to identify Namibian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 21"
},
{
  "id": 1109,
  "code": "NAMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Namibia",
  "description": "The controller transfers personal records of Namibian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 25"
},
{
  "id": 1110,
  "code": "NAMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Namibia",
  "description": "The website fails to establish transparent channels for Namibian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 28"
},
{
  "id": 1111,
  "code": "GRNPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Sensitive Personal Data without Written Consent in Grenada",
  "description": "The website collects sensitive personal records (health, financial details) of Grenadian subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Grenada Data Protection Act 2014, Sec. 15, Sec. 50"
},
{
  "id": 1112,
  "code": "GRNPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Personal Data without Controller Registration in Grenada",
  "description": "The website controller collects personal details of Grenadian residents without registering with the Commissioner.",
  "severity": "serious",
  "reference": "Grenada Data Protection Act 2014, Sec. 10"
},
{
  "id": 1113,
  "code": "GRNPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Technical Database Safeguards in Grenada",
  "description": "The database collects and processes personal files of Grenadian residents without employing mandatory technical encryption or administrative controls.",
  "severity": "moderate",
  "reference": "Grenada Data Protection Act 2014, Sec. 32"
},
{
  "id": 1114,
  "code": "GRNPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Data Retention Cycles in Grenada",
  "description": "The website retains personal records of Grenadian users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Grenada Data Protection Act 2014, Sec. 14"
},
{
  "id": 1115,
  "code": "GRNPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfer of Grenadian Data",
  "description": "The controller transfers data of Grenadian residents outside the country without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Grenada Data Protection Act 2014, Sec. 47"
},
{
  "id": 1116,
  "code": "VCTPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Sensitive Data without Consent in St. Vincent & Grenadines",
  "description": "The website collects sensitive personal records (health, financial details) of St. Vincent & Grenadines subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 15, Sec. 50"
},
{
  "id": 1117,
  "code": "VCTPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Personal Data without Controller Registration in St. Vincent & Grenadines",
  "description": "The website controller collects personal details of St. Vincent & Grenadines residents without registering with the Commissioner.",
  "severity": "serious",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 10"
},
{
  "id": 1118,
  "code": "VCTPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Technical Database Safeguards in St. Vincent & Grenadines",
  "description": "The database collects and processes personal files of St. Vincent & Grenadines residents without employing mandatory technical encryption or administrative controls.",
  "severity": "moderate",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 32"
},
{
  "id": 1119,
  "code": "VCTPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Data Retention Cycles in St. Vincent & Grenadines",
  "description": "The website retains personal records of St. Vincent & Grenadines users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 14"
},
{
  "id": 1120,
  "code": "VCTPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfer of St. Vincent & Grenadines Data",
  "description": "The controller transfers data of St. Vincent & Grenadines residents outside the country without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 47"
},
{
  "id": 1121,
  "code": "SAMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Samoa",
  "description": "The website collects personal details of Samoan residents without establishing a valid lawful processing base or consent under Samoan law.",
  "severity": "critical",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 5"
},
{
  "id": 1122,
  "code": "SAMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Samoa",
  "description": "The website collects sensitive personal records (health, biometric) of Samoan residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 8"
},
{
  "id": 1123,
  "code": "SAMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Samoan Law",
  "description": "The privacy policy fails to identify Samoan processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 12"
},
{
  "id": 1124,
  "code": "SAMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Samoa",
  "description": "The controller transfers personal records of Samoan subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 14"
},
{
  "id": 1125,
  "code": "SAMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Samoa",
  "description": "The website fails to establish transparent channels for Samoan subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 15"
},
{
  "id": 1126,
  "code": "TONPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Tonga",
  "description": "The website collects personal details of Tongan residents without establishing a valid lawful processing base or consent under Tonga law.",
  "severity": "critical",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 5"
},
{
  "id": 1127,
  "code": "TONPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Tonga",
  "description": "The website collects sensitive personal records (health, biometric) of Tongan residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 8"
},
{
  "id": 1128,
  "code": "TONPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Tonga Law",
  "description": "The privacy policy fails to identify Tongan processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 12"
},
{
  "id": 1129,
  "code": "TONPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Tonga",
  "description": "The controller transfers personal records of Tongan subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 14"
},
{
  "id": 1130,
  "code": "TONPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Tonga",
  "description": "The website fails to establish transparent channels for Tongan subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 15"
},
{
  "id": 1131,
  "code": "VUTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Vanuatu",
  "description": "The website collects personal details of Ni-Vanuatu residents without establishing a valid lawful processing base or consent under Vanuatu law.",
  "severity": "critical",
  "reference": "Vanuatu local electronic transactions laws, Sec. 5"
},
{
  "id": 1132,
  "code": "VUTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Vanuatu",
  "description": "The website collects sensitive personal records (health, biometric) of Ni-Vanuatu residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Vanuatu local electronic transactions laws, Sec. 8"
},
{
  "id": 1133,
  "code": "VUTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Vanuatu Law",
  "description": "The privacy policy fails to identify Ni-Vanuatu processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Vanuatu local electronic transactions laws, Sec. 12"
},
{
  "id": 1134,
  "code": "VUTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Vanuatu",
  "description": "The controller transfers personal records of Ni-Vanuatu subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Vanuatu local electronic transactions laws, Sec. 14"
},
{
  "id": 1135,
  "code": "VUTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Vanuatu",
  "description": "The website fails to establish transparent channels for Ni-Vanuatu subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Vanuatu local electronic transactions laws, Sec. 15"
},
{
  "id": 1136,
  "code": "GUYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Sensitive Personal Data without Consent in Guyana",
  "description": "The website collects sensitive personal records (health, financial details) of Guyanese subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Guyana Data Protection Act 2024, Sec. 15, Sec. 50"
},
{
  "id": 1137,
  "code": "GUYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Personal Data without Controller Registration in Guyana",
  "description": "The website controller collects personal details of Guyanese residents without registering with the Commissioner.",
  "severity": "serious",
  "reference": "Guyana Data Protection Act 2024, Sec. 10"
},
{
  "id": 1138,
  "code": "GUYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Technical Database Safeguards in Guyana",
  "description": "The database collects and processes personal files of Guyanese residents without employing mandatory technical encryption or administrative controls.",
  "severity": "moderate",
  "reference": "Guyana Data Protection Act 2024, Sec. 32"
},
{
  "id": 1139,
  "code": "GUYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Data Retention Cycles in Guyana",
  "description": "The website retains personal records of Guyanese users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Guyana Data Protection Act 2024, Sec. 14"
},
{
  "id": 1140,
  "code": "GUYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfer of Guyanese Data",
  "description": "The controller transfers data of Guyanese residents outside the country without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Guyana Data Protection Act 2024, Sec. 47"
},
{
  "id": 1141,
  "code": "BLZPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Sensitive Data without Written Consent in Belize",
  "description": "The website collects sensitive personal records (health, financial details) of Belizean subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 15, Sec. 50"
},
{
  "id": 1142,
  "code": "BLZPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Personal Data without Controller Registration in Belize",
  "description": "The website controller collects personal details of Belizean residents without registering with the Commissioner.",
  "severity": "serious",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 10"
},
{
  "id": 1143,
  "code": "BLZPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Technical Database Safeguards in Belize",
  "description": "The database collects and processes personal files of Belizean residents without employing mandatory technical encryption or administrative controls.",
  "severity": "moderate",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 32"
},
{
  "id": 1144,
  "code": "BLZPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Data Retention Cycles in Belize",
  "description": "The website retains personal records of Belizean users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 14"
},
{
  "id": 1145,
  "code": "BLZPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfer of Belizean Data",
  "description": "The controller transfers data of Belizean residents outside the country without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 47"
},
{
  "id": 1146,
  "code": "SURPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Sensitive Data without Written Consent in Suriname",
  "description": "The website collects sensitive personal records (health, financial details) of Surinamese subjects without prior written explicit consent.",
  "severity": "critical",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 15, Sec. 50"
},
{
  "id": 1147,
  "code": "SURPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Processing Personal Data without Controller Registration in Suriname",
  "description": "The website controller collects personal details of Surinamese residents without registering with the Commissioner.",
  "severity": "serious",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 10"
},
{
  "id": 1148,
  "code": "SURPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Inadequate Technical Database Safeguards in Suriname",
  "description": "The database collects and processes personal files of Surinamese residents without employing mandatory technical encryption or administrative controls.",
  "severity": "moderate",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 32"
},
{
  "id": 1149,
  "code": "SURPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Data Retention Cycles in Suriname",
  "description": "The website retains personal records of Surinamese users longer than necessary for the designated processing purpose without deletion protocols.",
  "severity": "serious",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 14"
},
{
  "id": 1150,
  "code": "SURPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Non-Compliant Cross-Border Transfer of Surinamese Data",
  "description": "The controller transfers data of Surinamese residents outside the country without ensuring adequate protection levels or obtaining required authorizations.",
  "severity": "moderate",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 47"
},
{
  "id": 1151,
  "code": "BDIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Burundi",
  "description": "The website collects personal details of Burundian residents without submitting a processing notification to the regulatory authority.",
  "severity": "critical",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 15, Article 42"
},
{
  "id": 1152,
  "code": "BDIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Burundi",
  "description": "The website processes sensitive categories of personal data (health, political views) of Burundian residents without prior explicit consent.",
  "severity": "serious",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 12"
},
{
  "id": 1153,
  "code": "BDIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Deletion and Correction Channels under Burundian Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Burundian residents to request data erasure.",
  "severity": "moderate",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 28"
},
{
  "id": 1154,
  "code": "BDIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Burundi",
  "description": "The controller transfers personal records of Burundian subjects to foreign countries without prior authorization from the regulatory authority.",
  "severity": "serious",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 35"
},
{
  "id": 1155,
  "code": "BDIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Direct Marketing Communications in Burundi",
  "description": "The website sends direct marketing materials or advertising cookies to Burundian subjects without obtaining prior opt-in consent.",
  "severity": "moderate",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 24"
},
{
  "id": 1156,
  "code": "ERIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Eritrea",
  "description": "The website collects personal details of Eritrean residents without establishing a valid lawful processing base or consent under Eritrean law.",
  "severity": "critical",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 5, Sec. 21"
},
{
  "id": 1157,
  "code": "ERIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Eritrea",
  "description": "The website collects sensitive personal records (health, biometric) of Eritrean residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 10"
},
{
  "id": 1158,
  "code": "ERIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Eritrean Law",
  "description": "The privacy policy fails to identify Eritrean processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 12"
},
{
  "id": 1159,
  "code": "ERIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Eritrea",
  "description": "The controller transfers personal records of Eritrean subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 14"
},
{
  "id": 1160,
  "code": "ERIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Eritrea",
  "description": "The website fails to establish transparent channels for Eritrean subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 15"
},
{
  "id": 1161,
  "code": "SOMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Somalia",
  "description": "The website collects personal details of Somali residents without establishing a valid lawful processing base or consent under Somali law.",
  "severity": "critical",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 5"
},
{
  "id": 1162,
  "code": "SOMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Somalia",
  "description": "The website collects sensitive personal records (health, biometric) of Somali residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 8"
},
{
  "id": 1163,
  "code": "SOMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Somali Law",
  "description": "The privacy policy fails to identify Somali processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 12"
},
{
  "id": 1164,
  "code": "SOMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Somalia",
  "description": "The controller transfers personal records of Somali subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 14"
},
{
  "id": 1165,
  "code": "SOMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Somalia",
  "description": "The website fails to establish transparent channels for Somali subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 15"
},
{
  "id": 1166,
  "code": "SDNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Sudan",
  "description": "The website collects personal details of Sudanese residents without establishing a valid lawful processing base or consent under Sudanese law.",
  "severity": "critical",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 5"
},
{
  "id": 1167,
  "code": "SDNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Sudan",
  "description": "The website collects sensitive personal records (health, biometric) of Sudanese residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 8"
},
{
  "id": 1168,
  "code": "SDNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Sudan Law",
  "description": "The privacy policy fails to identify Sudanese processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 12"
},
{
  "id": 1169,
  "code": "SDNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Sudan",
  "description": "The controller transfers personal records of Sudanese subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 14"
},
{
  "id": 1170,
  "code": "SDNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Sudan",
  "description": "The website fails to establish transparent channels for Sudanese subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 15"
},
{
  "id": 1171,
  "code": "SSDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in South Sudan",
  "description": "The website collects personal details of South Sudanese residents without establishing a valid lawful processing base or consent under South Sudan law.",
  "severity": "critical",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 5"
},
{
  "id": 1172,
  "code": "SSDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in South Sudan",
  "description": "The website collects sensitive personal records (health, biometric) of South Sudanese residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 8"
},
{
  "id": 1173,
  "code": "SSDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under South Sudan Law",
  "description": "The privacy policy fails to identify South Sudanese processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 12"
},
{
  "id": 1174,
  "code": "SSDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from South Sudan",
  "description": "The controller transfers personal records of South Sudanese subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 14"
},
{
  "id": 1175,
  "code": "SSDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in South Sudan",
  "description": "The website fails to establish transparent channels for South Sudanese subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 15"
},
{
  "id": 1176,
  "code": "GNQPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Equatorial Guinea",
  "description": "The website collects personal details of Equatorial Guinean residents without submitting a processing notification to the regulatory authority.",
  "severity": "critical",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 15"
},
{
  "id": 1177,
  "code": "GNQPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Equatorial Guinea",
  "description": "The website processes sensitive personal records (health, biometric) of Equatorial Guinean residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 12"
},
{
  "id": 1178,
  "code": "GNQPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Equatorial Guinean Law",
  "description": "The website privacy policy fails to document accessible contact paths or specific procedures for Equatorial Guinean residents to request data erasure.",
  "severity": "moderate",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 28"
},
{
  "id": 1179,
  "code": "GNQPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Equatorial Guinea",
  "description": "The controller transfers personal records of Equatorial Guinean subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 35"
},
{
  "id": 1180,
  "code": "GNQPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Rights Response Channels for Equatorial Guinean Subjects",
  "description": "The website fails to establish transparent channels for Equatorial Guinean subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 24"
},
{
  "id": 1181,
  "code": "CAFPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in CAR",
  "description": "The website collects personal details of Central African Republic residents without establishing a valid lawful processing base or consent under CAR law.",
  "severity": "critical",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 5"
},
{
  "id": 1182,
  "code": "CAFPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in CAR",
  "description": "The website collects sensitive personal records (health, biometric) of Central African Republic residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 8"
},
{
  "id": 1183,
  "code": "CAFPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under CAR Law",
  "description": "The privacy policy fails to identify Central African Republic processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 12"
},
{
  "id": 1184,
  "code": "CAFPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from CAR",
  "description": "The controller transfers personal records of Central African Republic subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 14"
},
{
  "id": 1185,
  "code": "CAFPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Rectification and Erasure Channels in CAR",
  "description": "The website fails to establish transparent channels for Central African Republic subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 15"
},
{
  "id": 1186,
  "code": "SLEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Sierra Leone",
  "description": "The website collects personal details of Sierra Leonean residents without establishing a valid lawful processing base or consent under Sierra Leone law.",
  "severity": "critical",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 5"
},
{
  "id": 1187,
  "code": "SLEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Sierra Leone",
  "description": "The website collects sensitive personal records (health, biometric) of Sierra Leonean residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 8"
},
{
  "id": 1188,
  "code": "SLEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Sierra Leone Law",
  "description": "The privacy policy fails to identify Sierra Leonean processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 12"
},
{
  "id": 1189,
  "code": "SLEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Sierra Leone",
  "description": "The controller transfers personal records of Sierra Leonean subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 14"
},
{
  "id": 1190,
  "code": "SLEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Subject Rights Response Methods in Sierra Leone",
  "description": "The website fails to establish transparent channels for Sierra Leonean subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 15"
},
{
  "id": 1191,
  "code": "LBRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Liberia",
  "description": "The website collects personal details of Liberian residents without establishing a valid lawful processing base or consent under Liberian law.",
  "severity": "critical",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 5"
},
{
  "id": 1192,
  "code": "LBRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Liberia",
  "description": "The website collects sensitive personal records (health, biometric) of Liberian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 8"
},
{
  "id": 1193,
  "code": "LBRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Liberian Law",
  "description": "The privacy policy fails to identify Liberian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 12"
},
{
  "id": 1194,
  "code": "LBRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Liberia",
  "description": "The controller transfers personal records of Liberian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 14"
},
{
  "id": 1195,
  "code": "LBRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Liberia",
  "description": "The website fails to establish transparent channels for Liberian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 15"
},
{
  "id": 1196,
  "code": "GMBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Gambia",
  "description": "The website collects personal details of Gambian residents without establishing a valid lawful processing base or consent under Gambian law.",
  "severity": "critical",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1197,
  "code": "GMBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Gambia",
  "description": "The website collects sensitive personal records (health, biometric) of Gambian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1198,
  "code": "GMBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Gambian Law",
  "description": "The privacy policy fails to identify Gambian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1199,
  "code": "GMBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Gambia",
  "description": "The controller transfers personal records of Gambian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1200,
  "code": "GMBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Gambia",
  "description": "The website fails to establish transparent channels for Gambian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1201,
  "code": "GWIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Guinea-Bissau",
  "description": "The website collects personal details of Guinea-Bissau residents without establishing a valid lawful processing base or consent under Guinea-Bissau law.",
  "severity": "critical",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 5"
},
{
  "id": 1202,
  "code": "GWIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Guinea-Bissau",
  "description": "The website collects sensitive personal records (health, biometric) of Guinea-Bissau residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 8"
},
{
  "id": 1203,
  "code": "GWIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Guinea-Bissau Law",
  "description": "The privacy policy fails to identify Guinea-Bissau processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 12"
},
{
  "id": 1204,
  "code": "GWIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Guinea-Bissau",
  "description": "The controller transfers personal records of Guinea-Bissau subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 14"
},
{
  "id": 1205,
  "code": "GWIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Guinea-Bissau",
  "description": "The website fails to establish transparent channels for Guinea-Bissau subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 15"
},
{
  "id": 1206,
  "code": "LSOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Lesotho",
  "description": "The website collects personal details of Lesotho residents without establishing a valid lawful processing base or consent under Lesotho law.",
  "severity": "critical",
  "reference": "Lesotho Data Protection Act 2011, Sec. 5, Sec. 21"
},
{
  "id": 1207,
  "code": "LSOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Lesotho",
  "description": "The website collects sensitive personal records (health, biometric) of Lesotho residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 10"
},
{
  "id": 1208,
  "code": "LSOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Lesotho Law",
  "description": "The privacy policy fails to identify Lesotho processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 12"
},
{
  "id": 1209,
  "code": "LSOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Lesotho",
  "description": "The controller transfers personal records of Lesotho subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 14"
},
{
  "id": 1210,
  "code": "LSOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Lesotho",
  "description": "The website fails to establish transparent channels for Lesotho subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 15"
},
{
  "id": 1211,
  "code": "TLSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Timor-Leste",
  "description": "The website collects personal details of Timor-Leste residents without establishing a valid lawful processing base or consent under Timor-Leste law.",
  "severity": "critical",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 5"
},
{
  "id": 1212,
  "code": "TLSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Timor-Leste",
  "description": "The website collects sensitive personal records (health, biometric) of Timor-Leste residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 8"
},
{
  "id": 1213,
  "code": "TLSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Timor-Leste Law",
  "description": "The privacy policy fails to identify Timor-Leste processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 12"
},
{
  "id": 1214,
  "code": "TLSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Timor-Leste",
  "description": "The controller transfers personal records of Timor-Leste subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 14"
},
{
  "id": 1215,
  "code": "TLSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Timor-Leste",
  "description": "The website fails to establish transparent channels for Timor-Leste subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 15"
},
{
  "id": 1216,
  "code": "MDVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Maldives",
  "description": "The website collects personal details of Maldivian residents without establishing a valid lawful processing base or consent under Maldivian law.",
  "severity": "critical",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1217,
  "code": "MDVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Maldives",
  "description": "The website collects sensitive personal records (health, biometric) of Maldivian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1218,
  "code": "MDVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Maldivian Law",
  "description": "The privacy policy fails to identify Maldivian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1219,
  "code": "MDVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Maldives",
  "description": "The controller transfers personal records of Maldivian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1220,
  "code": "MDVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Maldives",
  "description": "The website fails to establish transparent channels for Maldivian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1221,
  "code": "BRNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Brunei",
  "description": "The website collects personal details of Bruneian residents without establishing a valid lawful processing base or consent under Brunei law.",
  "severity": "critical",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 5"
},
{
  "id": 1222,
  "code": "BRNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Brunei",
  "description": "The website collects sensitive personal records (health, biometric) of Bruneian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 8"
},
{
  "id": 1223,
  "code": "BRNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Brunei Law",
  "description": "The privacy policy fails to identify Bruneian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 12"
},
{
  "id": 1224,
  "code": "BRNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Brunei",
  "description": "The controller transfers personal records of Bruneian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 14"
},
{
  "id": 1225,
  "code": "BRNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Brunei",
  "description": "The website fails to establish transparent channels for Bruneian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 15"
},
{
  "id": 1226,
  "code": "SLBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Solomon Islands",
  "description": "The website collects personal details of Solomon Islands residents without establishing a valid lawful processing base or consent under Solomon Islands law.",
  "severity": "critical",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 5"
},
{
  "id": 1227,
  "code": "SLBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Solomon Islands",
  "description": "The website collects sensitive personal records (health, biometric) of Solomon Islands residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 8"
},
{
  "id": 1228,
  "code": "SLBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Solomon Islands Law",
  "description": "The privacy policy fails to identify Solomon Islands processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 12"
},
{
  "id": 1229,
  "code": "SLBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Solomon Islands",
  "description": "The controller transfers personal records of Solomon Islands subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 14"
},
{
  "id": 1230,
  "code": "SLBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Solomon Islands",
  "description": "The website fails to establish transparent channels for Solomon Islands subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 15"
},
{
  "id": 1231,
  "code": "FSMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Micronesia",
  "description": "The website collects personal details of Micronesian residents without establishing a valid lawful processing base or consent under Micronesia law.",
  "severity": "critical",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 5"
},
{
  "id": 1232,
  "code": "FSMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Micronesia",
  "description": "The website collects sensitive personal records (health, biometric) of Micronesian residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 8"
},
{
  "id": 1233,
  "code": "FSMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Micronesia Law",
  "description": "The privacy policy fails to identify Micronesian processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 12"
},
{
  "id": 1234,
  "code": "FSMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Micronesia",
  "description": "The controller transfers personal records of Micronesian subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 14"
},
{
  "id": 1235,
  "code": "FSMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Micronesia",
  "description": "The website fails to establish transparent channels for Micronesian subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 15"
},
{
  "id": 1236,
  "code": "MHLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Marshall Islands",
  "description": "The website collects personal details of Marshall Islands residents without establishing a valid lawful processing base or consent under Marshall Islands law.",
  "severity": "critical",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1237,
  "code": "MHLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Marshall Islands",
  "description": "The website collects sensitive personal records (health, biometric) of Marshall Islands residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1238,
  "code": "MHLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Marshall Islands Law",
  "description": "The privacy policy fails to identify Marshall Islands processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1239,
  "code": "MHLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Marshall Islands",
  "description": "The controller transfers personal records of Marshall Islands subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1240,
  "code": "MHLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Marshall Islands",
  "description": "The website fails to establish transparent channels for Marshall Islands subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1241,
  "code": "PLWPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Palau",
  "description": "The website collects personal details of Palauan residents without establishing a valid lawful processing base or consent under Palau law.",
  "severity": "critical",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 5"
},
{
  "id": 1242,
  "code": "PLWPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Palau",
  "description": "The website collects sensitive personal records (health, biometric) of Palauan residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 8"
},
{
  "id": 1243,
  "code": "PLWPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Palau Law",
  "description": "The privacy policy fails to identify Palauan processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 12"
},
{
  "id": 1244,
  "code": "PLWPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Palau",
  "description": "The controller transfers personal records of Palauan subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 14"
},
{
  "id": 1245,
  "code": "PLWPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Palau",
  "description": "The website fails to establish transparent channels for Palauan subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 15"
},
{
  "id": 1246,
  "code": "KIRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Legal Basis in Kiribati",
  "description": "The website collects personal details of Kiribati residents without establishing a valid lawful processing base or consent under Kiribati law.",
  "severity": "critical",
  "reference": "Kiribati draft Data Protection Act, Sec. 5"
},
{
  "id": 1247,
  "code": "KIRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Lack of Explicit Consent for Sensitive Data in Kiribati",
  "description": "The website collects sensitive personal records (health, biometric) of Kiribati residents without prior explicit written or digital consent.",
  "severity": "serious",
  "reference": "Kiribati draft Data Protection Act, Sec. 8"
},
{
  "id": 1248,
  "code": "KIRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Disclosures in Privacy Notice under Kiribati Law",
  "description": "The privacy policy fails to identify Kiribati processing purposes, retention details, or contact options for data subjects.",
  "severity": "moderate",
  "reference": "Kiribati draft Data Protection Act, Sec. 12"
},
{
  "id": 1249,
  "code": "KIRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfers from Kiribati",
  "description": "The controller transfers personal records of Kiribati subjects to external countries without ensuring adequacy or comparable protection.",
  "severity": "serious",
  "reference": "Kiribati draft Data Protection Act, Sec. 14"
},
{
  "id": 1250,
  "code": "KIRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Inadequate Subject Rights Response Methods in Kiribati",
  "description": "The website fails to establish transparent channels for Kiribati subjects to exercise access, correction, or erasure rights.",
  "severity": "moderate",
  "reference": "Kiribati draft Data Protection Act, Sec. 15"
},
{
  "id": 1251,
  "code": "CHNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in China",
  "description": "The website collects sensitive personal records (health, financial details) of Chinese subjects without prior written explicit consent under the Personal Information Protection Law (PIPL).",
  "severity": "critical",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1252,
  "code": "CHNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in China",
  "description": "The website controller collects personal details of Chinese residents without submitting a processing notification to the Cyberspace Administration of China (CAC).",
  "severity": "serious",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1253,
  "code": "CHNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in China",
  "description": "The database collects and processes personal files of Chinese residents without employing mandatory technical encryption or administrative controls required under Personal Information Protection Law (PIPL).",
  "severity": "moderate",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1254,
  "code": "CHNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in China",
  "description": "The website retains personal records of Chinese users longer than necessary for the designated processing purpose without deletion protocols under Personal Information Protection Law (PIPL).",
  "severity": "serious",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1255,
  "code": "CHNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Chinese Data",
  "description": "The controller transfers data of Chinese residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Personal Information Protection Law (PIPL).",
  "severity": "moderate",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1256,
  "code": "RUSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Russia",
  "description": "The website collects sensitive personal records (health, financial details) of Russian subjects without prior written explicit consent under the Federal Law No. 152-FZ on Personal Data.",
  "severity": "critical",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1257,
  "code": "RUSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Russia",
  "description": "The website controller collects personal details of Russian residents without submitting a processing notification to the Roskomnadzor.",
  "severity": "serious",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1258,
  "code": "RUSPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Russia",
  "description": "The database collects and processes personal files of Russian residents without employing mandatory technical encryption or administrative controls required under Federal Law No. 152-FZ on Personal Data.",
  "severity": "moderate",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1259,
  "code": "RUSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Russia",
  "description": "The website retains personal records of Russian users longer than necessary for the designated processing purpose without deletion protocols under Federal Law No. 152-FZ on Personal Data.",
  "severity": "serious",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1260,
  "code": "RUSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Russian Data",
  "description": "The controller transfers data of Russian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Federal Law No. 152-FZ on Personal Data.",
  "severity": "moderate",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1261,
  "code": "TURPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Turkey",
  "description": "The website collects sensitive personal records (health, financial details) of Turkish subjects without prior written explicit consent under the Law on Protection of Personal Data No. 6698 (KVKK).",
  "severity": "critical",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1262,
  "code": "TURPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Turkey",
  "description": "The website controller collects personal details of Turkish residents without submitting a processing notification to the KVKK Board.",
  "severity": "serious",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1263,
  "code": "TURPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Turkey",
  "description": "The database collects and processes personal files of Turkish residents without employing mandatory technical encryption or administrative controls required under Law on Protection of Personal Data No. 6698 (KVKK).",
  "severity": "moderate",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1264,
  "code": "TURPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Turkey",
  "description": "The website retains personal records of Turkish users longer than necessary for the designated processing purpose without deletion protocols under Law on Protection of Personal Data No. 6698 (KVKK).",
  "severity": "serious",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1265,
  "code": "TURPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Turkish Data",
  "description": "The controller transfers data of Turkish residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Law on Protection of Personal Data No. 6698 (KVKK).",
  "severity": "moderate",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1266,
  "code": "NGAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Nigeria",
  "description": "The website collects sensitive personal records (health, financial details) of Nigerian subjects without prior written explicit consent under the Nigeria Data Protection Act 2023 (NDPA).",
  "severity": "critical",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1267,
  "code": "NGAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Nigeria",
  "description": "The website controller collects personal details of Nigerian residents without submitting a processing notification to the NDPC.",
  "severity": "serious",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1268,
  "code": "NGAPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Nigeria",
  "description": "The database collects and processes personal files of Nigerian residents without employing mandatory technical encryption or administrative controls required under Nigeria Data Protection Act 2023 (NDPA).",
  "severity": "moderate",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1269,
  "code": "NGAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Nigeria",
  "description": "The website retains personal records of Nigerian users longer than necessary for the designated processing purpose without deletion protocols under Nigeria Data Protection Act 2023 (NDPA).",
  "severity": "serious",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1270,
  "code": "NGAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Nigerian Data",
  "description": "The controller transfers data of Nigerian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Nigeria Data Protection Act 2023 (NDPA).",
  "severity": "moderate",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1271,
  "code": "AFGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Afghanistan",
  "description": "The website collects sensitive personal records (health, financial details) of Afghan subjects without prior written explicit consent under the Afghan local communications and telecommunications decrees.",
  "severity": "critical",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1272,
  "code": "AFGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Afghanistan",
  "description": "The website controller collects personal details of Afghan residents without submitting a processing notification to the Ministry of Communications.",
  "severity": "serious",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1273,
  "code": "AFGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Afghanistan",
  "description": "The database collects and processes personal files of Afghan residents without employing mandatory technical encryption or administrative controls required under Afghan local communications and telecommunications decrees.",
  "severity": "moderate",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1274,
  "code": "AFGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Afghanistan",
  "description": "The website retains personal records of Afghan users longer than necessary for the designated processing purpose without deletion protocols under Afghan local communications and telecommunications decrees.",
  "severity": "serious",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1275,
  "code": "AFGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Afghan Data",
  "description": "The controller transfers data of Afghan residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Afghan local communications and telecommunications decrees.",
  "severity": "moderate",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1276,
  "code": "AZEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Azerbaijan",
  "description": "The website collects sensitive personal records (health, financial details) of Azerbaijani subjects without prior written explicit consent under the Law of Azerbaijan on Personal Data No. 998-IIIQ.",
  "severity": "critical",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1277,
  "code": "AZEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Azerbaijan",
  "description": "The website controller collects personal details of Azerbaijani residents without submitting a processing notification to the Ministry of Digital Development.",
  "severity": "serious",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1278,
  "code": "AZEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Azerbaijan",
  "description": "The database collects and processes personal files of Azerbaijani residents without employing mandatory technical encryption or administrative controls required under Law of Azerbaijan on Personal Data No. 998-IIIQ.",
  "severity": "moderate",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1279,
  "code": "AZEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Azerbaijan",
  "description": "The website retains personal records of Azerbaijani users longer than necessary for the designated processing purpose without deletion protocols under Law of Azerbaijan on Personal Data No. 998-IIIQ.",
  "severity": "serious",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1280,
  "code": "AZEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Azerbaijani Data",
  "description": "The controller transfers data of Azerbaijani residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Law of Azerbaijan on Personal Data No. 998-IIIQ.",
  "severity": "moderate",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1281,
  "code": "BGDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Bangladesh",
  "description": "The website collects sensitive personal records (health, financial details) of Bangladeshi subjects without prior written explicit consent under the Information and Communication Technology Act / draft Data Protection Act.",
  "severity": "critical",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1282,
  "code": "BGDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Bangladesh",
  "description": "The website controller collects personal details of Bangladeshi residents without submitting a processing notification to the BTRC / Data Protection Authority.",
  "severity": "serious",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1283,
  "code": "BGDPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Bangladesh",
  "description": "The database collects and processes personal files of Bangladeshi residents without employing mandatory technical encryption or administrative controls required under Information and Communication Technology Act / draft Data Protection Act.",
  "severity": "moderate",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1284,
  "code": "BGDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Bangladesh",
  "description": "The website retains personal records of Bangladeshi users longer than necessary for the designated processing purpose without deletion protocols under Information and Communication Technology Act / draft Data Protection Act.",
  "severity": "serious",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1285,
  "code": "BGDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Bangladeshi Data",
  "description": "The controller transfers data of Bangladeshi residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Information and Communication Technology Act / draft Data Protection Act.",
  "severity": "moderate",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1286,
  "code": "BLRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Belarus",
  "description": "The website collects sensitive personal records (health, financial details) of Belarusian subjects without prior written explicit consent under the Law of Belarus No. 99-Z on Protection of Personal Data.",
  "severity": "critical",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1287,
  "code": "BLRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Belarus",
  "description": "The website controller collects personal details of Belarusian residents without submitting a processing notification to the National Center for Personal Data Protection.",
  "severity": "serious",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1288,
  "code": "BLRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Belarus",
  "description": "The database collects and processes personal files of Belarusian residents without employing mandatory technical encryption or administrative controls required under Law of Belarus No. 99-Z on Protection of Personal Data.",
  "severity": "moderate",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1289,
  "code": "BLRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Belarus",
  "description": "The website retains personal records of Belarusian users longer than necessary for the designated processing purpose without deletion protocols under Law of Belarus No. 99-Z on Protection of Personal Data.",
  "severity": "serious",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1290,
  "code": "BLRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Belarusian Data",
  "description": "The controller transfers data of Belarusian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Law of Belarus No. 99-Z on Protection of Personal Data.",
  "severity": "moderate",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1291,
  "code": "CMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Cameroon",
  "description": "The website collects sensitive personal records (health, financial details) of Cameroonian subjects without prior written explicit consent under the Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality.",
  "severity": "critical",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1292,
  "code": "CMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Cameroon",
  "description": "The website controller collects personal details of Cameroonian residents without submitting a processing notification to the ANTIC.",
  "severity": "serious",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1293,
  "code": "CMRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Cameroon",
  "description": "The database collects and processes personal files of Cameroonian residents without employing mandatory technical encryption or administrative controls required under Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality.",
  "severity": "moderate",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1294,
  "code": "CMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Cameroon",
  "description": "The website retains personal records of Cameroonian users longer than necessary for the designated processing purpose without deletion protocols under Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality.",
  "severity": "serious",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1295,
  "code": "CMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Cameroonian Data",
  "description": "The controller transfers data of Cameroonian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality.",
  "severity": "moderate",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1296,
  "code": "COMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Comoros",
  "description": "The website collects sensitive personal records (health, financial details) of Comorian subjects without prior written explicit consent under the Comoros local communications and transaction laws.",
  "severity": "critical",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1297,
  "code": "COMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Comoros",
  "description": "The website controller collects personal details of Comorian residents without submitting a processing notification to the ANRTIC.",
  "severity": "serious",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1298,
  "code": "COMPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Comoros",
  "description": "The database collects and processes personal files of Comorian residents without employing mandatory technical encryption or administrative controls required under Comoros local communications and transaction laws.",
  "severity": "moderate",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1299,
  "code": "COMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Comoros",
  "description": "The website retains personal records of Comorian users longer than necessary for the designated processing purpose without deletion protocols under Comoros local communications and transaction laws.",
  "severity": "serious",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1300,
  "code": "COMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Comorian Data",
  "description": "The controller transfers data of Comorian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Comoros local communications and transaction laws.",
  "severity": "moderate",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1301,
  "code": "CUBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Cuba",
  "description": "The website collects sensitive personal records (health, financial details) of Cuban subjects without prior written explicit consent under the Cuban Decree-Law No. 370 on Informatization of Society.",
  "severity": "critical",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1302,
  "code": "CUBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Cuba",
  "description": "The website controller collects personal details of Cuban residents without submitting a processing notification to the MINCOM.",
  "severity": "serious",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1303,
  "code": "CUBPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Cuba",
  "description": "The database collects and processes personal files of Cuban residents without employing mandatory technical encryption or administrative controls required under Cuban Decree-Law No. 370 on Informatization of Society.",
  "severity": "moderate",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1304,
  "code": "CUBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Cuba",
  "description": "The website retains personal records of Cuban users longer than necessary for the designated processing purpose without deletion protocols under Cuban Decree-Law No. 370 on Informatization of Society.",
  "severity": "serious",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1305,
  "code": "CUBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Cuban Data",
  "description": "The controller transfers data of Cuban residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Cuban Decree-Law No. 370 on Informatization of Society.",
  "severity": "moderate",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1306,
  "code": "CODPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in DR Congo",
  "description": "The website collects sensitive personal records (health, financial details) of Congolese subjects without prior written explicit consent under the DRC Telecom Law No. 20/017 / Cybersecurity framework.",
  "severity": "critical",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1307,
  "code": "CODPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in DR Congo",
  "description": "The website controller collects personal details of Congolese residents without submitting a processing notification to the ARPTC.",
  "severity": "serious",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1308,
  "code": "CODPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in DR Congo",
  "description": "The database collects and processes personal files of Congolese residents without employing mandatory technical encryption or administrative controls required under DRC Telecom Law No. 20/017 / Cybersecurity framework.",
  "severity": "moderate",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1309,
  "code": "CODPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in DR Congo",
  "description": "The website retains personal records of Congolese users longer than necessary for the designated processing purpose without deletion protocols under DRC Telecom Law No. 20/017 / Cybersecurity framework.",
  "severity": "serious",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1310,
  "code": "CODPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Congolese Data",
  "description": "The controller transfers data of Congolese residents outside the country without ensuring adequate protection levels or obtaining required authorizations under DRC Telecom Law No. 20/017 / Cybersecurity framework.",
  "severity": "moderate",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1311,
  "code": "ETHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Ethiopia",
  "description": "The website collects sensitive personal records (health, financial details) of Ethiopian subjects without prior written explicit consent under the Ethiopian draft Personal Data Protection Proclamation.",
  "severity": "critical",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1312,
  "code": "ETHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Ethiopia",
  "description": "The website controller collects personal details of Ethiopian residents without submitting a processing notification to the MInT.",
  "severity": "serious",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1313,
  "code": "ETHPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Ethiopia",
  "description": "The database collects and processes personal files of Ethiopian residents without employing mandatory technical encryption or administrative controls required under Ethiopian draft Personal Data Protection Proclamation.",
  "severity": "moderate",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1314,
  "code": "ETHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Ethiopia",
  "description": "The website retains personal records of Ethiopian users longer than necessary for the designated processing purpose without deletion protocols under Ethiopian draft Personal Data Protection Proclamation.",
  "severity": "serious",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1315,
  "code": "ETHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Ethiopian Data",
  "description": "The controller transfers data of Ethiopian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Ethiopian draft Personal Data Protection Proclamation.",
  "severity": "moderate",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1316,
  "code": "HTIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Haiti",
  "description": "The website collects sensitive personal records (health, financial details) of Haitian subjects without prior written explicit consent under the Haitian Cyber Security guidelines / draft privacy rules.",
  "severity": "critical",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1317,
  "code": "HTIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Haiti",
  "description": "The website controller collects personal details of Haitian residents without submitting a processing notification to the CONATEL.",
  "severity": "serious",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1318,
  "code": "HTIPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Haiti",
  "description": "The database collects and processes personal files of Haitian residents without employing mandatory technical encryption or administrative controls required under Haitian Cyber Security guidelines / draft privacy rules.",
  "severity": "moderate",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1319,
  "code": "HTIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Haiti",
  "description": "The website retains personal records of Haitian users longer than necessary for the designated processing purpose without deletion protocols under Haitian Cyber Security guidelines / draft privacy rules.",
  "severity": "serious",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1320,
  "code": "HTIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Haitian Data",
  "description": "The controller transfers data of Haitian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Haitian Cyber Security guidelines / draft privacy rules.",
  "severity": "moderate",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1321,
  "code": "IRNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Iran",
  "description": "The website collects sensitive personal records (health, financial details) of Iranian subjects without prior written explicit consent under the Iran Cyber Space regulations / draft Personal Data protection.",
  "severity": "critical",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1322,
  "code": "IRNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Iran",
  "description": "The website controller collects personal details of Iranian residents without submitting a processing notification to the CRA.",
  "severity": "serious",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1323,
  "code": "IRNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Iran",
  "description": "The database collects and processes personal files of Iranian residents without employing mandatory technical encryption or administrative controls required under Iran Cyber Space regulations / draft Personal Data protection.",
  "severity": "moderate",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1324,
  "code": "IRNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Iran",
  "description": "The website retains personal records of Iranian users longer than necessary for the designated processing purpose without deletion protocols under Iran Cyber Space regulations / draft Personal Data protection.",
  "severity": "serious",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1325,
  "code": "IRNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Iranian Data",
  "description": "The controller transfers data of Iranian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Iran Cyber Space regulations / draft Personal Data protection.",
  "severity": "moderate",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1326,
  "code": "LBYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Libya",
  "description": "The website collects sensitive personal records (health, financial details) of Libyan subjects without prior written explicit consent under the Libyan local telecom and cybercrime resolutions.",
  "severity": "critical",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1327,
  "code": "LBYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Libya",
  "description": "The website controller collects personal details of Libyan residents without submitting a processing notification to the GPTC.",
  "severity": "serious",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1328,
  "code": "LBYPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Libya",
  "description": "The database collects and processes personal files of Libyan residents without employing mandatory technical encryption or administrative controls required under Libyan local telecom and cybercrime resolutions.",
  "severity": "moderate",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1329,
  "code": "LBYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Libya",
  "description": "The website retains personal records of Libyan users longer than necessary for the designated processing purpose without deletion protocols under Libyan local telecom and cybercrime resolutions.",
  "severity": "serious",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1330,
  "code": "LBYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Libyan Data",
  "description": "The controller transfers data of Libyan residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Libyan local telecom and cybercrime resolutions.",
  "severity": "moderate",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1331,
  "code": "NRUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Nauru",
  "description": "The website collects sensitive personal records (health, financial details) of Nauruan subjects without prior written explicit consent under the Nauru Cybersecurity Act / draft privacy rules.",
  "severity": "critical",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1332,
  "code": "NRUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Nauru",
  "description": "The website controller collects personal details of Nauruan residents without submitting a processing notification to the Ministry of Telecommunications.",
  "severity": "serious",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1333,
  "code": "NRUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Nauru",
  "description": "The database collects and processes personal files of Nauruan residents without employing mandatory technical encryption or administrative controls required under Nauru Cybersecurity Act / draft privacy rules.",
  "severity": "moderate",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1334,
  "code": "NRUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Nauru",
  "description": "The website retains personal records of Nauruan users longer than necessary for the designated processing purpose without deletion protocols under Nauru Cybersecurity Act / draft privacy rules.",
  "severity": "serious",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1335,
  "code": "NRUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Nauruan Data",
  "description": "The controller transfers data of Nauruan residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Nauru Cybersecurity Act / draft privacy rules.",
  "severity": "moderate",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1336,
  "code": "PRKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in North Korea",
  "description": "The website collects sensitive personal records (health, financial details) of North Korean subjects without prior written explicit consent under the DPRK Cybersecurity and electronic transactions laws.",
  "severity": "critical",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1337,
  "code": "PRKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in North Korea",
  "description": "The website controller collects personal details of North Korean residents without submitting a processing notification to the Ministry of Posts and Telecommunications.",
  "severity": "serious",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1338,
  "code": "PRKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in North Korea",
  "description": "The database collects and processes personal files of North Korean residents without employing mandatory technical encryption or administrative controls required under DPRK Cybersecurity and electronic transactions laws.",
  "severity": "moderate",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1339,
  "code": "PRKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in North Korea",
  "description": "The website retains personal records of North Korean users longer than necessary for the designated processing purpose without deletion protocols under DPRK Cybersecurity and electronic transactions laws.",
  "severity": "serious",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1340,
  "code": "PRKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of North Korean Data",
  "description": "The controller transfers data of North Korean residents outside the country without ensuring adequate protection levels or obtaining required authorizations under DPRK Cybersecurity and electronic transactions laws.",
  "severity": "moderate",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1341,
  "code": "TKMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Turkmenistan",
  "description": "The website collects sensitive personal records (health, financial details) of Turkmen subjects without prior written explicit consent under the Law of Turkmenistan No. 562-V on Information and its Protection.",
  "severity": "critical",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1342,
  "code": "TKMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Turkmenistan",
  "description": "The website controller collects personal details of Turkmen residents without submitting a processing notification to the Ministry of Communication.",
  "severity": "serious",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1343,
  "code": "TKMPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Turkmenistan",
  "description": "The database collects and processes personal files of Turkmen residents without employing mandatory technical encryption or administrative controls required under Law of Turkmenistan No. 562-V on Information and its Protection.",
  "severity": "moderate",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1344,
  "code": "TKMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Turkmenistan",
  "description": "The website retains personal records of Turkmen users longer than necessary for the designated processing purpose without deletion protocols under Law of Turkmenistan No. 562-V on Information and its Protection.",
  "severity": "serious",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1345,
  "code": "TKMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Turkmen Data",
  "description": "The controller transfers data of Turkmen residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Law of Turkmenistan No. 562-V on Information and its Protection.",
  "severity": "moderate",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1346,
  "code": "TUVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Tuvalu",
  "description": "The website collects sensitive personal records (health, financial details) of Tuvaluan subjects without prior written explicit consent under the Tuvalu Cybersecurity and draft privacy rules.",
  "severity": "critical",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1347,
  "code": "TUVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Tuvalu",
  "description": "The website controller collects personal details of Tuvaluan residents without submitting a processing notification to the Telecom Ministry.",
  "severity": "serious",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1348,
  "code": "TUVPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Tuvalu",
  "description": "The database collects and processes personal files of Tuvaluan residents without employing mandatory technical encryption or administrative controls required under Tuvalu Cybersecurity and draft privacy rules.",
  "severity": "moderate",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1349,
  "code": "TUVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Tuvalu",
  "description": "The website retains personal records of Tuvaluan users longer than necessary for the designated processing purpose without deletion protocols under Tuvalu Cybersecurity and draft privacy rules.",
  "severity": "serious",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1350,
  "code": "TUVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Tuvaluan Data",
  "description": "The controller transfers data of Tuvaluan residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Tuvalu Cybersecurity and draft privacy rules.",
  "severity": "moderate",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1351,
  "code": "VATPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Vatican City",
  "description": "The website collects sensitive personal records (health, financial details) of Vatican subjects without prior written explicit consent under the Vatican local cybersecurity and administrative directives.",
  "severity": "critical",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1352,
  "code": "VATPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Vatican City",
  "description": "The website controller collects personal details of Vatican residents without submitting a processing notification to the Vatican Gendarmerie.",
  "severity": "serious",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1353,
  "code": "VATPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Vatican City",
  "description": "The database collects and processes personal files of Vatican residents without employing mandatory technical encryption or administrative controls required under Vatican local cybersecurity and administrative directives.",
  "severity": "moderate",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1354,
  "code": "VATPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Vatican City",
  "description": "The website retains personal records of Vatican users longer than necessary for the designated processing purpose without deletion protocols under Vatican local cybersecurity and administrative directives.",
  "severity": "serious",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1355,
  "code": "VATPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Vatican Data",
  "description": "The controller transfers data of Vatican residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Vatican local cybersecurity and administrative directives.",
  "severity": "moderate",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1356,
  "code": "ESHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Western Sahara",
  "description": "The website collects sensitive personal records (health, financial details) of Sahrawi subjects without prior written explicit consent under the Western Sahara local rules / cybersecurity draft.",
  "severity": "critical",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1357,
  "code": "ESHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Western Sahara",
  "description": "The website controller collects personal details of Sahrawi residents without submitting a processing notification to the Telecommunications authority.",
  "severity": "serious",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1358,
  "code": "ESHPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Western Sahara",
  "description": "The database collects and processes personal files of Sahrawi residents without employing mandatory technical encryption or administrative controls required under Western Sahara local rules / cybersecurity draft.",
  "severity": "moderate",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1359,
  "code": "ESHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Western Sahara",
  "description": "The website retains personal records of Sahrawi users longer than necessary for the designated processing purpose without deletion protocols under Western Sahara local rules / cybersecurity draft.",
  "severity": "serious",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1360,
  "code": "ESHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Sahrawi Data",
  "description": "The controller transfers data of Sahrawi residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Western Sahara local rules / cybersecurity draft.",
  "severity": "moderate",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1361,
  "code": "BGRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Bulgaria",
  "description": "The website collects sensitive personal records (health, financial details) of Bulgarian subjects without prior written explicit consent under the Bulgarian Personal Data Protection Act.",
  "severity": "critical",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1362,
  "code": "BGRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Bulgaria",
  "description": "The website controller collects personal details of Bulgarian residents without submitting a processing notification to the CPDP.",
  "severity": "serious",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1363,
  "code": "BGRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Bulgaria",
  "description": "The database collects and processes personal files of Bulgarian residents without employing mandatory technical encryption or administrative controls required under Bulgarian Personal Data Protection Act.",
  "severity": "moderate",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1364,
  "code": "BGRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Bulgaria",
  "description": "The website retains personal records of Bulgarian users longer than necessary for the designated processing purpose without deletion protocols under Bulgarian Personal Data Protection Act.",
  "severity": "serious",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1365,
  "code": "BGRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Bulgarian Data",
  "description": "The controller transfers data of Bulgarian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Bulgarian Personal Data Protection Act.",
  "severity": "moderate",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1366,
  "code": "HRVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Croatia",
  "description": "The website collects sensitive personal records (health, financial details) of Croatian subjects without prior written explicit consent under the Croatian Act on the Implementation of the General Data Protection Regulation.",
  "severity": "critical",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1367,
  "code": "HRVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Croatia",
  "description": "The website controller collects personal details of Croatian residents without submitting a processing notification to the AZOP.",
  "severity": "serious",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1368,
  "code": "HRVPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Croatia",
  "description": "The database collects and processes personal files of Croatian residents without employing mandatory technical encryption or administrative controls required under Croatian Act on the Implementation of the General Data Protection Regulation.",
  "severity": "moderate",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1369,
  "code": "HRVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Croatia",
  "description": "The website retains personal records of Croatian users longer than necessary for the designated processing purpose without deletion protocols under Croatian Act on the Implementation of the General Data Protection Regulation.",
  "severity": "serious",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1370,
  "code": "HRVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Croatian Data",
  "description": "The controller transfers data of Croatian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Croatian Act on the Implementation of the General Data Protection Regulation.",
  "severity": "moderate",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1371,
  "code": "ESTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Estonia",
  "description": "The website collects sensitive personal records (health, financial details) of Estonian subjects without prior written explicit consent under the Estonian Personal Data Protection Act (Isikuandmete kaitse seadus).",
  "severity": "critical",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1372,
  "code": "ESTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Estonia",
  "description": "The website controller collects personal details of Estonian residents without submitting a processing notification to the AKI.",
  "severity": "serious",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1373,
  "code": "ESTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Estonia",
  "description": "The database collects and processes personal files of Estonian residents without employing mandatory technical encryption or administrative controls required under Estonian Personal Data Protection Act (Isikuandmete kaitse seadus).",
  "severity": "moderate",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1374,
  "code": "ESTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Estonia",
  "description": "The website retains personal records of Estonian users longer than necessary for the designated processing purpose without deletion protocols under Estonian Personal Data Protection Act (Isikuandmete kaitse seadus).",
  "severity": "serious",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1375,
  "code": "ESTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Estonian Data",
  "description": "The controller transfers data of Estonian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Estonian Personal Data Protection Act (Isikuandmete kaitse seadus).",
  "severity": "moderate",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1376,
  "code": "LVAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Latvia",
  "description": "The website collects sensitive personal records (health, financial details) of Latvian subjects without prior written explicit consent under the Latvian Personal Data Processing Law.",
  "severity": "critical",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1377,
  "code": "LVAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Latvia",
  "description": "The website controller collects personal details of Latvian residents without submitting a processing notification to the DVI.",
  "severity": "serious",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1378,
  "code": "LVAPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Latvia",
  "description": "The database collects and processes personal files of Latvian residents without employing mandatory technical encryption or administrative controls required under Latvian Personal Data Processing Law.",
  "severity": "moderate",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1379,
  "code": "LVAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Latvia",
  "description": "The website retains personal records of Latvian users longer than necessary for the designated processing purpose without deletion protocols under Latvian Personal Data Processing Law.",
  "severity": "serious",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1380,
  "code": "LVAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Latvian Data",
  "description": "The controller transfers data of Latvian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Latvian Personal Data Processing Law.",
  "severity": "moderate",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1381,
  "code": "LTUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Lithuania",
  "description": "The website collects sensitive personal records (health, financial details) of Lithuanian subjects without prior written explicit consent under the Lithuanian Law on Legal Protection of Personal Data.",
  "severity": "critical",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1382,
  "code": "LTUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Lithuania",
  "description": "The website controller collects personal details of Lithuanian residents without submitting a processing notification to the VDAI.",
  "severity": "serious",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1383,
  "code": "LTUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Lithuania",
  "description": "The database collects and processes personal files of Lithuanian residents without employing mandatory technical encryption or administrative controls required under Lithuanian Law on Legal Protection of Personal Data.",
  "severity": "moderate",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1384,
  "code": "LTUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Lithuania",
  "description": "The website retains personal records of Lithuanian users longer than necessary for the designated processing purpose without deletion protocols under Lithuanian Law on Legal Protection of Personal Data.",
  "severity": "serious",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1385,
  "code": "LTUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Lithuanian Data",
  "description": "The controller transfers data of Lithuanian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Lithuanian Law on Legal Protection of Personal Data.",
  "severity": "moderate",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1386,
  "code": "CYPPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Cyprus",
  "description": "The website collects sensitive personal records (health, financial details) of Cypriot subjects without prior written explicit consent under the Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law.",
  "severity": "critical",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1387,
  "code": "CYPPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Cyprus",
  "description": "The website controller collects personal details of Cypriot residents without submitting a processing notification to the Commissioner for Personal Data Protection.",
  "severity": "serious",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1388,
  "code": "CYPPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Cyprus",
  "description": "The database collects and processes personal files of Cypriot residents without employing mandatory technical encryption or administrative controls required under Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law.",
  "severity": "moderate",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1389,
  "code": "CYPPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Cyprus",
  "description": "The website retains personal records of Cypriot users longer than necessary for the designated processing purpose without deletion protocols under Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law.",
  "severity": "serious",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1390,
  "code": "CYPPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Cypriot Data",
  "description": "The controller transfers data of Cypriot residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law.",
  "severity": "moderate",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1391,
  "code": "MLTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Malta",
  "description": "The website collects sensitive personal records (health, financial details) of Maltese subjects without prior written explicit consent under the Malta Data Protection Act (Cap. 586).",
  "severity": "critical",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1392,
  "code": "MLTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Malta",
  "description": "The website controller collects personal details of Maltese residents without submitting a processing notification to the IDPC.",
  "severity": "serious",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1393,
  "code": "MLTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Malta",
  "description": "The database collects and processes personal files of Maltese residents without employing mandatory technical encryption or administrative controls required under Malta Data Protection Act (Cap. 586).",
  "severity": "moderate",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1394,
  "code": "MLTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Malta",
  "description": "The website retains personal records of Maltese users longer than necessary for the designated processing purpose without deletion protocols under Malta Data Protection Act (Cap. 586).",
  "severity": "serious",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1395,
  "code": "MLTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Maltese Data",
  "description": "The controller transfers data of Maltese residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Malta Data Protection Act (Cap. 586).",
  "severity": "moderate",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1396,
  "code": "SVKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Slovakia",
  "description": "The website collects sensitive personal records (health, financial details) of Slovak subjects without prior written explicit consent under the Slovak Act No. 18/2018 Coll. on Personal Data Protection.",
  "severity": "critical",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1397,
  "code": "SVKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Slovakia",
  "description": "The website controller collects personal details of Slovak residents without submitting a processing notification to the UOOU SR.",
  "severity": "serious",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1398,
  "code": "SVKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Slovakia",
  "description": "The database collects and processes personal files of Slovak residents without employing mandatory technical encryption or administrative controls required under Slovak Act No. 18/2018 Coll. on Personal Data Protection.",
  "severity": "moderate",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1399,
  "code": "SVKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Slovakia",
  "description": "The website retains personal records of Slovak users longer than necessary for the designated processing purpose without deletion protocols under Slovak Act No. 18/2018 Coll. on Personal Data Protection.",
  "severity": "serious",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1400,
  "code": "SVKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Slovak Data",
  "description": "The controller transfers data of Slovak residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Slovak Act No. 18/2018 Coll. on Personal Data Protection.",
  "severity": "moderate",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1401,
  "code": "SVNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Slovenia",
  "description": "The website collects sensitive personal records (health, financial details) of Slovenian subjects without prior written explicit consent under the Slovenian Personal Data Protection Act (ZVOP-2).",
  "severity": "critical",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1402,
  "code": "SVNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Slovenia",
  "description": "The website controller collects personal details of Slovenian residents without submitting a processing notification to the Information Commissioner.",
  "severity": "serious",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1403,
  "code": "SVNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Slovenia",
  "description": "The database collects and processes personal files of Slovenian residents without employing mandatory technical encryption or administrative controls required under Slovenian Personal Data Protection Act (ZVOP-2).",
  "severity": "moderate",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1404,
  "code": "SVNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Slovenia",
  "description": "The website retains personal records of Slovenian users longer than necessary for the designated processing purpose without deletion protocols under Slovenian Personal Data Protection Act (ZVOP-2).",
  "severity": "serious",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1405,
  "code": "SVNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Slovenian Data",
  "description": "The controller transfers data of Slovenian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Slovenian Personal Data Protection Act (ZVOP-2).",
  "severity": "moderate",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1406,
  "code": "LUXPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Luxembourg",
  "description": "The website collects sensitive personal records (health, financial details) of Luxembourgish subjects without prior written explicit consent under the Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection.",
  "severity": "critical",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1407,
  "code": "LUXPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Luxembourg",
  "description": "The website controller collects personal details of Luxembourgish residents without submitting a processing notification to the CNPD.",
  "severity": "serious",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1408,
  "code": "LUXPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Luxembourg",
  "description": "The database collects and processes personal files of Luxembourgish residents without employing mandatory technical encryption or administrative controls required under Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection.",
  "severity": "moderate",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1409,
  "code": "LUXPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Luxembourg",
  "description": "The website retains personal records of Luxembourgish users longer than necessary for the designated processing purpose without deletion protocols under Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection.",
  "severity": "serious",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1410,
  "code": "LUXPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Luxembourgish Data",
  "description": "The controller transfers data of Luxembourgish residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection.",
  "severity": "moderate",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1411,
  "code": "CZEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Czech Republic",
  "description": "The website collects sensitive personal records (health, financial details) of Czech subjects without prior written explicit consent under the Czech Act No. 110/2019 Coll. on Personal Data Processing.",
  "severity": "critical",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1412,
  "code": "CZEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Czech Republic",
  "description": "The website controller collects personal details of Czech residents without submitting a processing notification to the UOOU.",
  "severity": "serious",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1413,
  "code": "CZEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Czech Republic",
  "description": "The database collects and processes personal files of Czech residents without employing mandatory technical encryption or administrative controls required under Czech Act No. 110/2019 Coll. on Personal Data Processing.",
  "severity": "moderate",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1414,
  "code": "CZEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Czech Republic",
  "description": "The website retains personal records of Czech users longer than necessary for the designated processing purpose without deletion protocols under Czech Act No. 110/2019 Coll. on Personal Data Processing.",
  "severity": "serious",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1415,
  "code": "CZEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Czech Data",
  "description": "The controller transfers data of Czech residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Czech Act No. 110/2019 Coll. on Personal Data Processing.",
  "severity": "moderate",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1416,
  "code": "HUNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Hungary",
  "description": "The website collects sensitive personal records (health, financial details) of Hungarian subjects without prior written explicit consent under the Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information.",
  "severity": "critical",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1417,
  "code": "HUNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Hungary",
  "description": "The website controller collects personal details of Hungarian residents without submitting a processing notification to the NAIH.",
  "severity": "serious",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1418,
  "code": "HUNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Hungary",
  "description": "The database collects and processes personal files of Hungarian residents without employing mandatory technical encryption or administrative controls required under Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information.",
  "severity": "moderate",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1419,
  "code": "HUNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Hungary",
  "description": "The website retains personal records of Hungarian users longer than necessary for the designated processing purpose without deletion protocols under Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information.",
  "severity": "serious",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1420,
  "code": "HUNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Hungarian Data",
  "description": "The controller transfers data of Hungarian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information.",
  "severity": "moderate",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1421,
  "code": "ROUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Romania",
  "description": "The website collects sensitive personal records (health, financial details) of Romanian subjects without prior written explicit consent under the Romanian Law No. 190/2018 on implementation measures of GDPR.",
  "severity": "critical",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1422,
  "code": "ROUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Romania",
  "description": "The website controller collects personal details of Romanian residents without submitting a processing notification to the ANSPDCP.",
  "severity": "serious",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1423,
  "code": "ROUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Romania",
  "description": "The database collects and processes personal files of Romanian residents without employing mandatory technical encryption or administrative controls required under Romanian Law No. 190/2018 on implementation measures of GDPR.",
  "severity": "moderate",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1424,
  "code": "ROUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Romania",
  "description": "The website retains personal records of Romanian users longer than necessary for the designated processing purpose without deletion protocols under Romanian Law No. 190/2018 on implementation measures of GDPR.",
  "severity": "serious",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1425,
  "code": "ROUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Romanian Data",
  "description": "The controller transfers data of Romanian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Romanian Law No. 190/2018 on implementation measures of GDPR.",
  "severity": "moderate",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1426,
  "code": "POLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Poland",
  "description": "The website collects sensitive personal records (health, financial details) of Polish subjects without prior written explicit consent under the Polish Act of 10 May 2018 on the Protection of Personal Data.",
  "severity": "critical",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1427,
  "code": "POLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Poland",
  "description": "The website controller collects personal details of Polish residents without submitting a processing notification to the UODO.",
  "severity": "serious",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1428,
  "code": "POLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Poland",
  "description": "The database collects and processes personal files of Polish residents without employing mandatory technical encryption or administrative controls required under Polish Act of 10 May 2018 on the Protection of Personal Data.",
  "severity": "moderate",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1429,
  "code": "POLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Poland",
  "description": "The website retains personal records of Polish users longer than necessary for the designated processing purpose without deletion protocols under Polish Act of 10 May 2018 on the Protection of Personal Data.",
  "severity": "serious",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1430,
  "code": "POLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Polish Data",
  "description": "The controller transfers data of Polish residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Polish Act of 10 May 2018 on the Protection of Personal Data.",
  "severity": "moderate",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1431,
  "code": "IRLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Ireland",
  "description": "The website collects sensitive personal records (health, financial details) of Irish subjects without prior written explicit consent under the Irish Data Protection Act 2018.",
  "severity": "critical",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1432,
  "code": "IRLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Ireland",
  "description": "The website controller collects personal details of Irish residents without submitting a processing notification to the DPC.",
  "severity": "serious",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1433,
  "code": "IRLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Ireland",
  "description": "The database collects and processes personal files of Irish residents without employing mandatory technical encryption or administrative controls required under Irish Data Protection Act 2018.",
  "severity": "moderate",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1434,
  "code": "IRLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Ireland",
  "description": "The website retains personal records of Irish users longer than necessary for the designated processing purpose without deletion protocols under Irish Data Protection Act 2018.",
  "severity": "serious",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1435,
  "code": "IRLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Irish Data",
  "description": "The controller transfers data of Irish residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Irish Data Protection Act 2018.",
  "severity": "moderate",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1436,
  "code": "AUTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Austria",
  "description": "The website collects sensitive personal records (health, financial details) of Austrian subjects without prior written explicit consent under the Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG).",
  "severity": "critical",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1437,
  "code": "AUTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Austria",
  "description": "The website controller collects personal details of Austrian residents without submitting a processing notification to the DSB.",
  "severity": "serious",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1438,
  "code": "AUTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Austria",
  "description": "The database collects and processes personal files of Austrian residents without employing mandatory technical encryption or administrative controls required under Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG).",
  "severity": "moderate",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1439,
  "code": "AUTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Austria",
  "description": "The website retains personal records of Austrian users longer than necessary for the designated processing purpose without deletion protocols under Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG).",
  "severity": "serious",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1440,
  "code": "AUTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Austrian Data",
  "description": "The controller transfers data of Austrian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG).",
  "severity": "moderate",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1441,
  "code": "SWEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Sweden",
  "description": "The website collects sensitive personal records (health, financial details) of Swedish subjects without prior written explicit consent under the Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning).",
  "severity": "critical",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1442,
  "code": "SWEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Sweden",
  "description": "The website controller collects personal details of Swedish residents without submitting a processing notification to the IMY.",
  "severity": "serious",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1443,
  "code": "SWEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Sweden",
  "description": "The database collects and processes personal files of Swedish residents without employing mandatory technical encryption or administrative controls required under Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning).",
  "severity": "moderate",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1444,
  "code": "SWEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Sweden",
  "description": "The website retains personal records of Swedish users longer than necessary for the designated processing purpose without deletion protocols under Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning).",
  "severity": "serious",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1445,
  "code": "SWEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Swedish Data",
  "description": "The controller transfers data of Swedish residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning).",
  "severity": "moderate",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1446,
  "code": "FLNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Finland",
  "description": "The website collects sensitive personal records (health, financial details) of Finnish subjects without prior written explicit consent under the Finnish Data Protection Act (Tietosuojalaki 1050/2018).",
  "severity": "critical",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1447,
  "code": "FLNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Finland",
  "description": "The website controller collects personal details of Finnish residents without submitting a processing notification to the Office of the Data Protection Ombudsman.",
  "severity": "serious",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1448,
  "code": "FLNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Finland",
  "description": "The database collects and processes personal files of Finnish residents without employing mandatory technical encryption or administrative controls required under Finnish Data Protection Act (Tietosuojalaki 1050/2018).",
  "severity": "moderate",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1449,
  "code": "FLNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Finland",
  "description": "The website retains personal records of Finnish users longer than necessary for the designated processing purpose without deletion protocols under Finnish Data Protection Act (Tietosuojalaki 1050/2018).",
  "severity": "serious",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1450,
  "code": "FLNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Finnish Data",
  "description": "The controller transfers data of Finnish residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Finnish Data Protection Act (Tietosuojalaki 1050/2018).",
  "severity": "moderate",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1451,
  "code": "DNKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Denmark",
  "description": "The website collects sensitive personal records (health, financial details) of Danish subjects without prior written explicit consent under the Danish Data Protection Act (Databeskyttelsesloven).",
  "severity": "critical",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1452,
  "code": "DNKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Denmark",
  "description": "The website controller collects personal details of Danish residents without submitting a processing notification to the Datatilsynet.",
  "severity": "serious",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1453,
  "code": "DNKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Denmark",
  "description": "The database collects and processes personal files of Danish residents without employing mandatory technical encryption or administrative controls required under Danish Data Protection Act (Databeskyttelsesloven).",
  "severity": "moderate",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1454,
  "code": "DNKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Denmark",
  "description": "The website retains personal records of Danish users longer than necessary for the designated processing purpose without deletion protocols under Danish Data Protection Act (Databeskyttelsesloven).",
  "severity": "serious",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1455,
  "code": "DNKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Danish Data",
  "description": "The controller transfers data of Danish residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Danish Data Protection Act (Databeskyttelsesloven).",
  "severity": "moderate",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1456,
  "code": "BELPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Belgium",
  "description": "The website collects sensitive personal records (health, financial details) of Belgian subjects without prior written explicit consent under the Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data.",
  "severity": "critical",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1457,
  "code": "BELPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Belgium",
  "description": "The website controller collects personal details of Belgian residents without submitting a processing notification to the APD-GBA.",
  "severity": "serious",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1458,
  "code": "BELPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Belgium",
  "description": "The database collects and processes personal files of Belgian residents without employing mandatory technical encryption or administrative controls required under Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data.",
  "severity": "moderate",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1459,
  "code": "BELPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Belgium",
  "description": "The website retains personal records of Belgian users longer than necessary for the designated processing purpose without deletion protocols under Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data.",
  "severity": "serious",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1460,
  "code": "BELPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Belgian Data",
  "description": "The controller transfers data of Belgian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data.",
  "severity": "moderate",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1461,
  "code": "GRCPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Greece",
  "description": "The website collects sensitive personal records (health, financial details) of Greek subjects without prior written explicit consent under the Greek Law No. 4624/2019 on Personal Data Protection Measures.",
  "severity": "critical",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1462,
  "code": "GRCPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Greece",
  "description": "The website controller collects personal details of Greek residents without submitting a processing notification to the HDPA.",
  "severity": "serious",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1463,
  "code": "GRCPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Greece",
  "description": "The database collects and processes personal files of Greek residents without employing mandatory technical encryption or administrative controls required under Greek Law No. 4624/2019 on Personal Data Protection Measures.",
  "severity": "moderate",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1464,
  "code": "GRCPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Greece",
  "description": "The website retains personal records of Greek users longer than necessary for the designated processing purpose without deletion protocols under Greek Law No. 4624/2019 on Personal Data Protection Measures.",
  "severity": "serious",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1465,
  "code": "GRCPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Greek Data",
  "description": "The controller transfers data of Greek residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Greek Law No. 4624/2019 on Personal Data Protection Measures.",
  "severity": "moderate",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1466,
  "code": "PRTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Portugal",
  "description": "The website collects sensitive personal records (health, financial details) of Portuguese subjects without prior written explicit consent under the Portuguese Law No. 58/2019 on execution rules of GDPR.",
  "severity": "critical",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1467,
  "code": "PRTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Portugal",
  "description": "The website controller collects personal details of Portuguese residents without submitting a processing notification to the CNPD.",
  "severity": "serious",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1468,
  "code": "PRTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Portugal",
  "description": "The database collects and processes personal files of Portuguese residents without employing mandatory technical encryption or administrative controls required under Portuguese Law No. 58/2019 on execution rules of GDPR.",
  "severity": "moderate",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1469,
  "code": "PRTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Portugal",
  "description": "The website retains personal records of Portuguese users longer than necessary for the designated processing purpose without deletion protocols under Portuguese Law No. 58/2019 on execution rules of GDPR.",
  "severity": "serious",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1470,
  "code": "PRTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Portuguese Data",
  "description": "The controller transfers data of Portuguese residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Portuguese Law No. 58/2019 on execution rules of GDPR.",
  "severity": "moderate",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1471,
  "code": "GRLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Greenland",
  "description": "The website collects sensitive personal records (health, financial details) of Greenlandic subjects without prior written explicit consent under the Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland).",
  "severity": "critical",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1472,
  "code": "GRLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Greenland",
  "description": "The website controller collects personal details of Greenlandic residents without submitting a processing notification to the Datatilsynet.",
  "severity": "serious",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1473,
  "code": "GRLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Greenland",
  "description": "The database collects and processes personal files of Greenlandic residents without employing mandatory technical encryption or administrative controls required under Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland).",
  "severity": "moderate",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1474,
  "code": "GRLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Greenland",
  "description": "The website retains personal records of Greenlandic users longer than necessary for the designated processing purpose without deletion protocols under Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland).",
  "severity": "serious",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1475,
  "code": "GRLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Greenlandic Data",
  "description": "The controller transfers data of Greenlandic residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland).",
  "severity": "moderate",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1476,
  "code": "FLKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Falkland Islands",
  "description": "The website collects sensitive personal records (health, financial details) of Falkland Islands subjects without prior written explicit consent under the Falkland Islands Data Protection Ordinance 2018.",
  "severity": "critical",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1477,
  "code": "FLKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Falkland Islands",
  "description": "The website controller collects personal details of Falkland Islands residents without submitting a processing notification to the Data Protection Commissioner.",
  "severity": "serious",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1478,
  "code": "FLKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Falkland Islands",
  "description": "The database collects and processes personal files of Falkland Islands residents without employing mandatory technical encryption or administrative controls required under Falkland Islands Data Protection Ordinance 2018.",
  "severity": "moderate",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1479,
  "code": "FLKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Falkland Islands",
  "description": "The website retains personal records of Falkland Islands users longer than necessary for the designated processing purpose without deletion protocols under Falkland Islands Data Protection Ordinance 2018.",
  "severity": "serious",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1480,
  "code": "FLKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Falkland Islands Data",
  "description": "The controller transfers data of Falkland Islands residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Falkland Islands Data Protection Ordinance 2018.",
  "severity": "moderate",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1481,
  "code": "PYFPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in French Polynesia",
  "description": "The website collects sensitive personal records (health, financial details) of French Polynesian subjects without prior written explicit consent under the French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés).",
  "severity": "critical",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1482,
  "code": "PYFPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in French Polynesia",
  "description": "The website controller collects personal details of French Polynesian residents without submitting a processing notification to the CNIL.",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1483,
  "code": "PYFPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in French Polynesia",
  "description": "The database collects and processes personal files of French Polynesian residents without employing mandatory technical encryption or administrative controls required under French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés).",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1484,
  "code": "PYFPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in French Polynesia",
  "description": "The website retains personal records of French Polynesian users longer than necessary for the designated processing purpose without deletion protocols under French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés).",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1485,
  "code": "PYFPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of French Polynesian Data",
  "description": "The controller transfers data of French Polynesian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés).",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1486,
  "code": "NCLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in New Caledonia",
  "description": "The website collects sensitive personal records (health, financial details) of New Caledonian subjects without prior written explicit consent under the French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés).",
  "severity": "critical",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1487,
  "code": "NCLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in New Caledonia",
  "description": "The website controller collects personal details of New Caledonian residents without submitting a processing notification to the CNIL.",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1488,
  "code": "NCLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in New Caledonia",
  "description": "The database collects and processes personal files of New Caledonian residents without employing mandatory technical encryption or administrative controls required under French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés).",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1489,
  "code": "NCLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in New Caledonia",
  "description": "The website retains personal records of New Caledonian users longer than necessary for the designated processing purpose without deletion protocols under French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés).",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1490,
  "code": "NCLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of New Caledonian Data",
  "description": "The controller transfers data of New Caledonian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés).",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1491,
  "code": "MSRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Montserrat",
  "description": "The website collects sensitive personal records (health, financial details) of Montserratian subjects without prior written explicit consent under the Montserrat draft Data Protection Act / cybersecurity rules.",
  "severity": "critical",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1492,
  "code": "MSRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Montserrat",
  "description": "The website controller collects personal details of Montserratian residents without submitting a processing notification to the Data Protection Commissioner.",
  "severity": "serious",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1493,
  "code": "MSRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Montserrat",
  "description": "The database collects and processes personal files of Montserratian residents without employing mandatory technical encryption or administrative controls required under Montserrat draft Data Protection Act / cybersecurity rules.",
  "severity": "moderate",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1494,
  "code": "MSRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Montserrat",
  "description": "The website retains personal records of Montserratian users longer than necessary for the designated processing purpose without deletion protocols under Montserrat draft Data Protection Act / cybersecurity rules.",
  "severity": "serious",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1495,
  "code": "MSRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Montserratian Data",
  "description": "The controller transfers data of Montserratian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Montserrat draft Data Protection Act / cybersecurity rules.",
  "severity": "moderate",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1496,
  "code": "SHNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Sensitive Data without Written Consent in Saint Helena",
  "description": "The website collects sensitive personal records (health, financial details) of Saint Helenian subjects without prior written explicit consent under the Saint Helena Data Protection Ordinance / draft privacy rules.",
  "severity": "critical",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1497,
  "code": "SHNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Processing Personal Data without Authority Notification in Saint Helena",
  "description": "The website controller collects personal details of Saint Helenian residents without submitting a processing notification to the Data Protection Commissioner.",
  "severity": "serious",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1498,
  "code": "SHNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Inadequate Technical Database Safeguards in Saint Helena",
  "description": "The database collects and processes personal files of Saint Helenian residents without employing mandatory technical encryption or administrative controls required under Saint Helena Data Protection Ordinance / draft privacy rules.",
  "severity": "moderate",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1499,
  "code": "SHNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Data Retention Cycles in Saint Helena",
  "description": "The website retains personal records of Saint Helenian users longer than necessary for the designated processing purpose without deletion protocols under Saint Helena Data Protection Ordinance / draft privacy rules.",
  "severity": "serious",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1500,
  "code": "SHNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Non-Compliant Cross-Border Transfer of Saint Helenian Data",
  "description": "The controller transfers data of Saint Helenian residents outside the country without ensuring adequate protection levels or obtaining required authorizations under Saint Helena Data Protection Ordinance / draft privacy rules.",
  "severity": "moderate",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
  {
    "id": 1501,
    "code": "OWASP-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "SQL Injection Vulnerability in User Input",
    "description": "Website input fields or URL parameters are vulnerable to SQL injection, allowing unauthorized database access.",
    "severity": "critical",
    "reference": "OWASP Top 10 A03:2021-Injection"
  },
  {
    "id": 1502,
    "code": "OWASP-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Cross-Site Scripting (XSS) Vulnerability",
    "description": "User input is rendered on the page without sanitization, allowing attackers to execute malicious scripts in visitors\' browsers.",
    "severity": "critical",
    "reference": "OWASP Top 10 A03:2021-XSS"
  },
  {
    "id": 1503,
    "code": "OWASP-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Broken Authentication and Session Leakage",
    "description": "The website exposes session identifiers in URLs or uses weak session timeouts, permitting session hijacking.",
    "severity": "critical",
    "reference": "OWASP Top 10 A07:2021-Identification & Auth"
  },
  {
    "id": 1504,
    "code": "OWASP-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Unencrypted Transmission of Sensitive Data",
    "description": "Sensitive customer details (passwords, payment files) are transmitted over HTTP or using obsolete TLS 1.0/1.1 protocols.",
    "severity": "critical",
    "reference": "OWASP Top 10 A02:2021-Cryptographic Failures"
  },
  {
    "id": 1505,
    "code": "OWASP-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Broken Object-Level Access Control",
    "description": "The API or backend endpoint fails to verify if the authenticated user has permission to access the requested resource ID.",
    "severity": "critical",
    "reference": "OWASP Top 10 A01:2021-Broken Access Control"
  },
  {
    "id": 1506,
    "code": "OWASP-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Debug Mode Active in Production Environment",
    "description": "Detailed error logs and stack traces are visible to public visitors, leaking system paths and environment variables.",
    "severity": "serious",
    "reference": "OWASP Top 10 A05:2021-Security Misconfig"
  },
  {
    "id": 1507,
    "code": "OWASP-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "XML External Entity (XXE) Injection Vulnerability",
    "description": "The XML parser accepts external entities, enabling attackers to read local server files or perform SSRF attacks.",
    "severity": "serious",
    "reference": "OWASP Top 10 A05:2021-XXE"
  },
  {
    "id": 1508,
    "code": "OWASP-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Insecure Deserialization of Untrusted Input",
    "description": "The application deserializes user-controlled objects without validation, which can lead to remote code execution (RCE).",
    "severity": "serious",
    "reference": "OWASP Top 10 A08:2021-Software Integrity"
  },
  {
    "id": 1509,
    "code": "OWASP-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Outdated Libraries with Known Vulnerabilities",
    "description": "The frontend runs outdated third-party NPM packages, WordPress plugins, or JQuery libraries with open CVE disclosures.",
    "severity": "serious",
    "reference": "OWASP Top 10 A06:2021-Vulnerable Components"
  },
  {
    "id": 1510,
    "code": "OWASP-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Insufficient Security Logging and Auditing",
    "description": "Critical actions like password resets, administrative logins, and billing changes are not logged, hindering forensics.",
    "severity": "moderate",
    "reference": "OWASP Top 10 A09:2021-Logging & Monitoring"
  },
  {
    "id": 1511,
    "code": "NISTP-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Access Control Policies",
    "description": "Lack of role-based access controls (RBAC) allows standard user accounts to view system management logs.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 AC-2"
  },
  {
    "id": 1512,
    "code": "NISTP-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Missing Audit Record Generation",
    "description": "The web application does not log API configuration changes or user creation events to an immutable audit store.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 AU-2"
  },
  {
    "id": 1513,
    "code": "NISTP-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Ineffective Configuration Management",
    "description": "No baseline configurations exist for server software deployments, leading to differing security levels.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 CM-2"
  },
  {
    "id": 1514,
    "code": "NISTP-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Missing Multi-Factor Authentication for Admins",
    "description": "Administrative logins use single-factor authentication, violating federal security identity standards.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 IA-2"
  },
  {
    "id": 1515,
    "code": "NISTP-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Incident Response Plan Integration",
    "description": "The website lacks automated anomaly alerting to trigger incident response team procedures during active attacks.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 IR-4"
  },
  {
    "id": 1516,
    "code": "NISTP-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate System Maintenance Tracking",
    "description": "Vulnerability scanning schedules are not formalized, leading to long delays in identifying critical CVEs.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 MA-2"
  },
  {
    "id": 1517,
    "code": "NISTP-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Lack of Media Protection and Backup Encryption",
    "description": "System backups containing customer personal information are stored in public cloud storage buckets without encryption.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 MP-4"
  },
  {
    "id": 1518,
    "code": "NISTP-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Missing Server Room Access Logs (Hosted Servers)",
    "description": "For self-hosted server deployments, the website controller lacks logs tracking physical access to storage drives.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 PE-2"
  },
  {
    "id": 1519,
    "code": "NISTP-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Security Training Records",
    "description": "System administrators managing user credentials lack verified cybersecurity awareness training documentation.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 PS-8"
  },
  {
    "id": 1520,
    "code": "NISTP-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Missing Network Boundaries and DNSSEC Controls",
    "description": "The domain lacks DNSSEC signatures, exposing users to DNS spoofing and man-in-the-middle redirection.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 SC-7"
  },
  {
    "id": 1521,
    "code": "ISO27-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Information Security Policies",
    "description": "The company operates without a formalized information security charter reviewed by management annually.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.1"
  },
  {
    "id": 1522,
    "code": "ISO27-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Lack of Defined Security Roles and Authorities",
    "description": "No single officer is appointed to supervise data security compliance across web operations.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.2"
  },
  {
    "id": 1523,
    "code": "ISO27-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Asset Inventory for Customer Data",
    "description": "The database operates without an inventory classifying where PII and credit details are stored across schemas.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.9"
  },
  {
    "id": 1524,
    "code": "ISO27-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Weak Use of Cryptography for User Passwords",
    "description": "User passwords are secure-hashed using weak MD5 or SHA1 algorithms without salt configurations.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.24"
  },
  {
    "id": 1525,
    "code": "ISO27-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Physical Security for Web Servers",
    "description": "Physical server chassis housing database drives lack tamper-detection controls or security locking rails.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.7.1"
  },
  {
    "id": 1526,
    "code": "ISO27-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Poor Operations Security and Unverified Backups",
    "description": "Backup recovery cycles are not tested periodically, leading to risk of data loss during restoration.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.13"
  },
  {
    "id": 1527,
    "code": "ISO27-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Insecure Network Architecture and Weak Routing Controls",
    "description": "Database nodes are directly reachable from public IP space without intermediate application routing proxy limits.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.20"
  },
  {
    "id": 1528,
    "code": "ISO27-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Lack of Secure Coding Standards in Software Development",
    "description": "The website development team operates without a secure coding policy covering SQL injection and XSS defenses.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.25"
  },
  {
    "id": 1529,
    "code": "ISO27-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Lack of Security Requirements in Supplier Agreements",
    "description": "Contracts with third-party payment gateways and analytical SaaS providers lack defined security clauses.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.19"
  },
  {
    "id": 1530,
    "code": "ISO27-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Lack of Incident Management and Escalation Paths",
    "description": "No procedures exist to escalate active system intrusions from IT operators to executive management.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.5.24"
  },
  {
    "id": 1531,
    "code": "SOC2P-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate System Monitoring for Security Anomalies",
    "description": "The server logs show no evidence of automated intrusion detection systems (IDS) alerting on brute-force attempts.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.8"
  },
  {
    "id": 1532,
    "code": "SOC2P-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Weak Access Credentials and Missing Multi-Factor Auth",
    "description": "Access control controls permit simple passwords on admin endpoints without enforcing secondary key checks.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.3"
  },
  {
    "id": 1533,
    "code": "SOC2P-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Insufficient Data Transmission Protections",
    "description": "The website API routes utilize outdated HTTP protocols and lack HSTS headers to force encryption.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.7"
  },
  {
    "id": 1534,
    "code": "SOC2P-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Weak Data Classification Policies",
    "description": "Internal records lack tagging to identify which website forms store confidential customer credentials.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC6.1"
  },
  {
    "id": 1535,
    "code": "SOC2P-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Lack of Vulnerability Management Infrastructure",
    "description": "The codebase operates without integrated tools to identify vulnerable node dependencies during CI/CD steps.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC7.1"
  },
  {
    "id": 1536,
    "code": "SOC2P-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Lack of System Availability and Failover Testing",
    "description": "The hosting environment lacks automated failover testing, creating single points of failure for database instances.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC8.1"
  },
  {
    "id": 1537,
    "code": "SOC2P-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Weak Processing Integrity for Transactions",
    "description": "Payment endpoints fail to employ transaction verification tokens, allowing parameter tampering during checkout.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC9.1"
  },
  {
    "id": 1538,
    "code": "SOC2P-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Confidentiality Protections for Data Storage",
    "description": "Personal identification files are stored alongside public assets without access authorization checks.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.6"
  },
  {
    "id": 1539,
    "code": "SOC2P-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Weak Data Lifecycle Management",
    "description": "The system retains personal profiles indefinitely without automated procedures to remove obsolete entries.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC6.5"
  },
  {
    "id": 1540,
    "code": "SOC2P-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Missing Change Control and Peer Review Controls",
    "description": "Code commits are deployed directly to production systems without mandatory pull request approvals.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC8.1-Change"
  },
  {
    "id": 1541,
    "code": "CISA-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Default Administrative Passwords Enabled",
    "description": "Database or CMS setup endpoints use generic administrator passwords, exposing systems to automated bot takeovers.",
    "severity": "critical",
    "reference": "CISA Cybersecurity Performance Goal 1.1"
  },
  {
    "id": 1542,
    "code": "CISA-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing Multi-Factor Authentication for Admin Consoles",
    "description": "Administrative access to hosting panels, database nodes, or API consoles lacks MFA requirements.",
    "severity": "critical",
    "reference": "CISA Cybersecurity Performance Goal 1.2"
  },
  {
    "id": 1543,
    "code": "CISA-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Known Exploited Vulnerabilities in Web Software",
    "description": "The production server runs dependencies listed on CISA\'s Known Exploited Vulnerabilities (KEV) Catalog.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.1"
  },
  {
    "id": 1544,
    "code": "CISA-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Ineffective Internet-Facing Asset Inventory",
    "description": "The organization does not inventory public domain names, exposing orphaned subdomains to hijacking.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.2"
  },
  {
    "id": 1545,
    "code": "CISA-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Missing DNS Integrity Protection Controls",
    "description": "Domain registration lacks registry locking, leaving records vulnerable to unauthorized changes.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 2.3"
  },
  {
    "id": 1546,
    "code": "CISA-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Insecure Email Authentication Standards (No DMARC)",
    "description": "Domain lacks DMARC configuration, permitting attackers to send phishing emails impersonating the website domain.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.4"
  },
  {
    "id": 1547,
    "code": "CISA-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Lack of Security Incident Exercises",
    "description": "No tabletop testing has been conducted to verify response procedures during ransomware or data breach events.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 3.1"
  },
  {
    "id": 1548,
    "code": "CISA-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Insecure Remote Access Protocols Enabled",
    "description": "The hosting environment exposes Telnet or unencrypted HTTP interfaces for remote device management.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 1.3"
  },
  {
    "id": 1549,
    "code": "CISA-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Data Backup Isolation",
    "description": "Database backups are stored on the same network server subnet, risking joint loss during cyberattacks.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 4.1"
  },
  {
    "id": 1550,
    "code": "CISA-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Ineffective Internal Vulnerability Scanning",
    "description": "The website server does not undergo weekly vulnerability scans of public-facing endpoints.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 2.5"
  },
  {
    "id": 1551,
    "code": "EUDSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Direct Point of Contact for Authorities",
    "description": "The website lacks a designated electronic contact address for EU authorities to communicate directly.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 11"
  },
  {
    "id": 1552,
    "code": "EUDSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Terms for Content Moderation Rules",
    "description": "The terms of service fail to disclose algorithmic filters or human review policies used to moderate comments.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 14"
  },
  {
    "id": 1553,
    "code": "EUDSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Recommender System Parameter Transparency",
    "description": "The website presents recommendations or product order feeds without explaining the main sorting factors.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 27"
  },
  {
    "id": 1554,
    "code": "EUDSA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Interface Manipulation (Dark Patterns)",
    "description": "Deceptive design elements trick users into subscribing to newsletters by pre-selecting choices or hiding close buttons.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 25"
  },
  {
    "id": 1555,
    "code": "EUDSA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unlabeled Online Advertisements and Sponsors",
    "description": "Paid promotional links or sponsored items load inside content streams without clear labels identifying the buyer.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 26"
  },
  {
    "id": 1556,
    "code": "EUDSA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Notice-and-Action Mechanism for Users",
    "description": "The portal provides no clear, accessible digital form for visitors to flag illegal comments or items.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 16"
  },
  {
    "id": 1557,
    "code": "EUDSA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant User Suspension Rules",
    "description": "The website blocks accounts or removes seller items without providing a detailed, written justification.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 20"
  },
  {
    "id": 1558,
    "code": "EUDSA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Statements of Reasons in Public Directory",
    "description": "The web host moderates third-party comments without publishing decisions in the EU DSA Database.",
    "severity": "moderate",
    "reference": "EU Digital Services Act (DSA) Article 17"
  },
  {
    "id": 1559,
    "code": "EUDSA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate Complaint Handling System",
    "description": "The website provides no digital appeal mechanism allowing users to challenge moderation rulings for 6 months.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 20-Appeal"
  },
  {
    "id": 1560,
    "code": "EUDSA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Deceptive Advertising Targeting Policies",
    "description": "The website uses sensitive personal details (religion, health, orientation) to target promotional banners.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 26-Target"
  },
  {
    "id": 1561,
    "code": "EUDMA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unfair Self-Preferencing in Product Listings",
    "description": "The store search engine ranks owner-branded goods higher than equivalent third-party seller inventory.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(5)"
  },
  {
    "id": 1562,
    "code": "EUDMA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unlawful Multi-Source Data Combination",
    "description": "The portal combines user data from core services with third-party tracking pixels without explicit opt-in.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 5(2)"
  },
  {
    "id": 1563,
    "code": "EUDMA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Restricting Third-Party Software Side-Loading",
    "description": "The web portal restricts users from running external payment integrations or browsers within the page framework.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(3)"
  },
  {
    "id": 1564,
    "code": "EUDMA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Restricting Business User Data Portability",
    "description": "The website checkout dashboard blocks sellers from exporting their transaction history to external servers.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(9)"
  },
  {
    "id": 1565,
    "code": "EUDMA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unfair Advertising Performance Reporting",
    "description": "The system charges advertisers for promotional space without sharing free daily performance metrics.",
    "severity": "moderate",
    "reference": "EU Digital Markets Act (DMA) Article 5(9)"
  },
  {
    "id": 1566,
    "code": "EUDMA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Restricting Cross-Platform Price Parity (Anti-Steering)",
    "description": "Terms of service penalize merchants for offering lower prices on their own direct channels or other sites.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 5(3)"
  },
  {
    "id": 1567,
    "code": "EUDMA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Deceptive Choice Screen Implementation",
    "description": "The system configures default search engines or browsers during setup without presenting unbiased options.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(3)-Choice"
  },
  {
    "id": 1568,
    "code": "EUDMA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Restricting Platform Services Interoperability",
    "description": "The API restricts third-party communication tools from linking with the core messaging system.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(7)"
  },
  {
    "id": 1569,
    "code": "EUDMA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Deceptive and Complex Unsubscribe Flows",
    "description": "The portal forces business users through telephone confirmation lines to terminate core service access.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(13)"
  },
  {
    "id": 1570,
    "code": "EUDMA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unlawful Exploitation of Business User Sales Data",
    "description": "The website host uses non-public checkout transaction data from sellers to launch competing direct products.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(2)"
  },
  {
    "id": 1571,
    "code": "UKAAC-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Inadequate Age Verification for Sensitive Content",
    "description": "The portal uses a simple, unverified self-declaration button for age verification on mature media streams.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 3"
  },
  {
    "id": 1572,
    "code": "UKAAC-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "High-Risk Tracking Active by Default for Minors",
    "description": "Geolocation and behavioral tracking are enabled by default upon registration before age verification occurs.",
    "severity": "critical",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 6"
  },
  {
    "id": 1573,
    "code": "UKAAC-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Complex Privacy Disclosures for Young Audiences",
    "description": "The privacy policy utilizes complex legalese instead of bite-sized, child-friendly explanations.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 4"
  },
  {
    "id": 1574,
    "code": "UKAAC-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Deceptive Nudge UI Techniques Target Minors",
    "description": "Interface elements nudge children to choose lower privacy settings using colorful alerts and reward loops.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 9"
  },
  {
    "id": 1575,
    "code": "UKAAC-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Unlawful Automated Minor Profiling",
    "description": "The recommendation feed defaults to profiling child user habits to serve addictive content streams.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 11"
  },
  {
    "id": 1576,
    "code": "UKAAC-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Missing Parental Tracking Notifications",
    "description": "The application lacks a prominent status icon informing child users when parents track their active sessions.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 13"
  },
  {
    "id": 1577,
    "code": "UKAAC-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Unlawful Children\'s Data Sharing with Advertisers",
    "description": "The portal shares tracking cookies of verified minors with external advertising brokers without opt-in.",
    "severity": "critical",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 12"
  },
  {
    "id": 1578,
    "code": "UKAAC-008",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Inadequate Data Minimization for Under-18s",
    "description": "The registration form requests optional data points (hobbies, schools) from users classified as minors.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 8"
  },
  {
    "id": 1579,
    "code": "UKAAC-009",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Harmful Marketing Target Practices for Children",
    "description": "The database serves targeted marketing banners exploiting minors\' behavioral weaknesses or insecurities.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 5"
  },
  {
    "id": 1580,
    "code": "UKAAC-010",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Insecure Default Minor Profile Settings",
    "description": "Minors\' search profiles default to public visibility, letting unauthenticated internet users view child details.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 7"
  },
  {
    "id": 1581,
    "code": "CAAAC-001",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing DPIA for Services Accessed by Minors",
    "description": "The controller fails to document a Data Protection Impact Assessment (DPIA) before deploying child-focused features.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(1)"
  },
  {
    "id": 1582,
    "code": "CAAAC-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Deceptive Age Assurance Implementation",
    "description": "The site fails to estimate child age with reasonable certainty, exposing minors to adult user chatrooms.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(5)"
  },
  {
    "id": 1583,
    "code": "CAAAC-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Disabled Default High Privacy Settings",
    "description": "The website configures default settings to low privacy upon checkout registration for visitors under 18.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(6)"
  },
  {
    "id": 1584,
    "code": "CAAAC-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Unlawful Automated Minor Behavioral Profiling",
    "description": "The site analyzes minor search queries to build persistent ad personas without obtaining parent consent.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(2)"
  },
  {
    "id": 1585,
    "code": "CAAAC-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Unlawful Sale of Verified Minors\' Data",
    "description": "The platform sells or shares data of users under 18 years without obtaining required opt-in authorization.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(1)"
  },
  {
    "id": 1586,
    "code": "CAAAC-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Active Tracking Indicators for Minors",
    "description": "The mobile web app logs child location points without displaying a persistent visual tracking symbol.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(7)"
  },
  {
    "id": 1587,
    "code": "CAAAC-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Deceptive Nudge Patterns Bypass Privacy Settings",
    "description": "Interface flows use gamification techniques to convince minors to disable default database protections.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(7)"
  },
  {
    "id": 1588,
    "code": "CAAAC-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Complex Terms of Service Explanations",
    "description": "The terms detailing data usage are written above a high school reading level, violating minor-friendly standards.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(8)"
  },
  {
    "id": 1589,
    "code": "CAAAC-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Unlawful Collection of Minor Geolocation History",
    "description": "The server logs precise device coordinates of visitors under 18 without immediate application delivery reasons.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(8)"
  },
  {
    "id": 1590,
    "code": "CAAAC-010",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Missing Deletion and Profile Eraser Controls",
    "description": "The user cabinet fails to offer an immediate deletion button allowing minor users to remove their profile.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(9)"
  },
  {
    "id": 1591,
    "code": "EUAIA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing AI Interaction Disclosures for Users",
    "description": "The chatbot operates on the contact page without explicitly informing visitors they are communicating with an AI system.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(1)"
  },
  {
    "id": 1592,
    "code": "EUAIA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Generative AI Content Disclosures",
    "description": "Synthetic images or AI-generated news items lack machine-readable labels detecting the artificial origin.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(3)"
  },
  {
    "id": 1593,
    "code": "EUAIA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Prohibited Deployments of Emotion Recognition Systems",
    "description": "The website employs AI tracking camera inputs to analyze candidate emotions during online job tests.",
    "severity": "critical",
    "reference": "EU AI Act Article 5(1)(f)"
  },
  {
    "id": 1594,
    "code": "EUAIA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unlawful Biometric Classification Implementations",
    "description": "AI analytics categorize visitors based on biometric profiles to target gender-specific product catalogs.",
    "severity": "critical",
    "reference": "EU AI Act Article 5(1)(g)"
  },
  {
    "id": 1595,
    "code": "EUAIA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Deceptive Deepfake Image and Video Disclosures",
    "description": "Realistic altered video or audio files load inside media streams without explicit altered-content warnings.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(3)-Deepfake"
  },
  {
    "id": 1596,
    "code": "EUAIA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inadequate High-Risk AI System Risk Management",
    "description": "The online portal deploys automated CV ranking software without pre-deployment testing and risk documentation.",
    "severity": "serious",
    "reference": "EU AI Act Article 9"
  },
  {
    "id": 1597,
    "code": "EUAIA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Logging Capabilities for High-Risk AI Systems",
    "description": "Automated pricing models operate on checkouts without records tracking raw telemetry input parameters.",
    "severity": "serious",
    "reference": "EU AI Act Article 12"
  },
  {
    "id": 1598,
    "code": "EUAIA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Human Oversight in Automated Recruitment",
    "description": "AI hiring screening results reject candidates automatically without a human review or appeal path.",
    "severity": "serious",
    "reference": "EU AI Act Article 14"
  },
  {
    "id": 1599,
    "code": "EUAIA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Unlawful Web Data Scraping for AI Training",
    "description": "Scraping agents fetch copyright images from website storage to train AI models without honoring opt-out flags.",
    "severity": "serious",
    "reference": "EU AI Act Article 53(1)(c)"
  },
  {
    "id": 1600,
    "code": "EUAIA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Insecure High-Risk AI Database Integration",
    "description": "The automated credit eligibility model runs on the server without registering in the public EU AI database.",
    "severity": "serious",
    "reference": "EU AI Act Article 60"
  },
  {
    "id": 1601,
    "code": "TXDPS-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Access Channel under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1602,
    "code": "TXDPS-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Rectification Form under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1603,
    "code": "TXDPS-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Deletion Portal under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1604,
    "code": "TXDPS-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Data Portability Export under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "moderate",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1605,
    "code": "TXDPS-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Targeted Advertising under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1606,
    "code": "TXDPS-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Personal Data Sales under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1607,
    "code": "TXDPS-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Automated Profiling under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "moderate",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1608,
    "code": "TXDPS-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Processing Sensitive Data without Consent under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "critical",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1609,
    "code": "TXDPS-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Protection Impact Assessment under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1610,
    "code": "TXDPS-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Compliant Notice at Collection under Texas Data Privacy and Security Act (TDPSA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Texas Data Privacy and Security Act (TDPSA).",
    "severity": "critical",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1611,
    "code": "VCDPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Access Channel under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1612,
    "code": "VCDPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Rectification Form under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1613,
    "code": "VCDPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Deletion Portal under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1614,
    "code": "VCDPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Data Portability Export under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "moderate",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1615,
    "code": "VCDPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Targeted Advertising under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1616,
    "code": "VCDPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Personal Data Sales under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1617,
    "code": "VCDPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Automated Profiling under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "moderate",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1618,
    "code": "VCDPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Processing Sensitive Data without Consent under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "critical",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1619,
    "code": "VCDPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Protection Impact Assessment under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1620,
    "code": "VCDPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Compliant Notice at Collection under Virginia Consumer Data Protection Act (VCDPA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Virginia Consumer Data Protection Act (VCDPA).",
    "severity": "critical",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1621,
    "code": "COPR-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Access Channel under Colorado Privacy Act (CPA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Colorado Privacy Act (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1622,
    "code": "COPR-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Rectification Form under Colorado Privacy Act (CPA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Colorado Privacy Act (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1623,
    "code": "COPR-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Deletion Portal under Colorado Privacy Act (CPA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Colorado Privacy Act (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1624,
    "code": "COPR-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Data Portability Export under Colorado Privacy Act (CPA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Colorado Privacy Act (CPA).",
    "severity": "moderate",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1625,
    "code": "COPR-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Targeted Advertising under Colorado Privacy Act (CPA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Colorado Privacy Act (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1626,
    "code": "COPR-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Personal Data Sales under Colorado Privacy Act (CPA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Colorado Privacy Act (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1627,
    "code": "COPR-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Automated Profiling under Colorado Privacy Act (CPA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Colorado Privacy Act (CPA).",
    "severity": "moderate",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1628,
    "code": "COPR-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Processing Sensitive Data without Consent under Colorado Privacy Act (CPA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Colorado Privacy Act (CPA).",
    "severity": "critical",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1629,
    "code": "COPR-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Protection Impact Assessment under Colorado Privacy Act (CPA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Colorado Privacy Act (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1630,
    "code": "COPR-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Compliant Notice at Collection under Colorado Privacy Act (CPA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Colorado Privacy Act (CPA).",
    "severity": "critical",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1631,
    "code": "CTDPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Access Channel under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1632,
    "code": "CTDPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Rectification Form under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1633,
    "code": "CTDPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Deletion Portal under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1634,
    "code": "CTDPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Data Portability Export under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "moderate",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1635,
    "code": "CTDPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Targeted Advertising under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1636,
    "code": "CTDPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Personal Data Sales under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1637,
    "code": "CTDPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Automated Profiling under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "moderate",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1638,
    "code": "CTDPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Processing Sensitive Data without Consent under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "critical",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1639,
    "code": "CTDPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Protection Impact Assessment under Connecticut Data Privacy Act (CTDPA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1640,
    "code": "CTDPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Compliant Notice at Collection under Connecticut Data Privacy Act (CTDPA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Connecticut Data Privacy Act (CTDPA).",
    "severity": "critical",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1641,
    "code": "UCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Access Channel under Utah Consumer Privacy Act (UCPA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Utah Consumer Privacy Act (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1642,
    "code": "UCPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Rectification Form under Utah Consumer Privacy Act (UCPA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Utah Consumer Privacy Act (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1643,
    "code": "UCPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Deletion Portal under Utah Consumer Privacy Act (UCPA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Utah Consumer Privacy Act (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1644,
    "code": "UCPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Data Portability Export under Utah Consumer Privacy Act (UCPA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Utah Consumer Privacy Act (UCPA).",
    "severity": "moderate",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1645,
    "code": "UCPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Targeted Advertising under Utah Consumer Privacy Act (UCPA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Utah Consumer Privacy Act (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1646,
    "code": "UCPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Personal Data Sales under Utah Consumer Privacy Act (UCPA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Utah Consumer Privacy Act (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1647,
    "code": "UCPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Automated Profiling under Utah Consumer Privacy Act (UCPA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Utah Consumer Privacy Act (UCPA).",
    "severity": "moderate",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1648,
    "code": "UCPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Processing Sensitive Data without Consent under Utah Consumer Privacy Act (UCPA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Utah Consumer Privacy Act (UCPA).",
    "severity": "critical",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1649,
    "code": "UCPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Protection Impact Assessment under Utah Consumer Privacy Act (UCPA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Utah Consumer Privacy Act (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1650,
    "code": "UCPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Compliant Notice at Collection under Utah Consumer Privacy Act (UCPA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Utah Consumer Privacy Act (UCPA).",
    "severity": "critical",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1651,
    "code": "ORCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Access Channel under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1652,
    "code": "ORCPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Rectification Form under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1653,
    "code": "ORCPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Deletion Portal under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1654,
    "code": "ORCPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Data Portability Export under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "moderate",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1655,
    "code": "ORCPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Targeted Advertising under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1656,
    "code": "ORCPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Personal Data Sales under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1657,
    "code": "ORCPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Automated Profiling under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "moderate",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1658,
    "code": "ORCPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Processing Sensitive Data without Consent under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "critical",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1659,
    "code": "ORCPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Protection Impact Assessment under Oregon Consumer Privacy Act (OCPA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1660,
    "code": "ORCPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Compliant Notice at Collection under Oregon Consumer Privacy Act (OCPA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Oregon Consumer Privacy Act (OCPA).",
    "severity": "critical",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1661,
    "code": "FLORDB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Access Channel under Florida Digital Bill of Rights (FDBR)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Florida Digital Bill of Rights (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1662,
    "code": "FLORDB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Rectification Form under Florida Digital Bill of Rights (FDBR)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Florida Digital Bill of Rights (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1663,
    "code": "FLORDB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Deletion Portal under Florida Digital Bill of Rights (FDBR)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Florida Digital Bill of Rights (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1664,
    "code": "FLORDB-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Data Portability Export under Florida Digital Bill of Rights (FDBR)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Florida Digital Bill of Rights (FDBR).",
    "severity": "moderate",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1665,
    "code": "FLORDB-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Targeted Advertising under Florida Digital Bill of Rights (FDBR)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Florida Digital Bill of Rights (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1666,
    "code": "FLORDB-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Personal Data Sales under Florida Digital Bill of Rights (FDBR)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Florida Digital Bill of Rights (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1667,
    "code": "FLORDB-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Automated Profiling under Florida Digital Bill of Rights (FDBR)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Florida Digital Bill of Rights (FDBR).",
    "severity": "moderate",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1668,
    "code": "FLORDB-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Processing Sensitive Data without Consent under Florida Digital Bill of Rights (FDBR)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Florida Digital Bill of Rights (FDBR).",
    "severity": "critical",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1669,
    "code": "FLORDB-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Protection Impact Assessment under Florida Digital Bill of Rights (FDBR)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Florida Digital Bill of Rights (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1670,
    "code": "FLORDB-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Compliant Notice at Collection under Florida Digital Bill of Rights (FDBR)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Florida Digital Bill of Rights (FDBR).",
    "severity": "critical",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1671,
    "code": "PIPEDA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1672,
    "code": "PIPEDA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1673,
    "code": "PIPEDA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1674,
    "code": "PIPEDA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "moderate",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1675,
    "code": "PIPEDA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1676,
    "code": "PIPEDA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1677,
    "code": "PIPEDA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "moderate",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1678,
    "code": "PIPEDA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "critical",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1679,
    "code": "PIPEDA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1680,
    "code": "PIPEDA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under Canada Personal Information Protection and Electronic Documents Act (PIPEDA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Canada Personal Information Protection and Electronic Documents Act (PIPEDA).",
    "severity": "critical",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1681,
    "code": "LAW25-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under Quebec Law 25",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Quebec Law 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1682,
    "code": "LAW25-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under Quebec Law 25",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Quebec Law 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1683,
    "code": "LAW25-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under Quebec Law 25",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Quebec Law 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1684,
    "code": "LAW25-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under Quebec Law 25",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Quebec Law 25.",
    "severity": "moderate",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1685,
    "code": "LAW25-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under Quebec Law 25",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Quebec Law 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1686,
    "code": "LAW25-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under Quebec Law 25",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Quebec Law 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1687,
    "code": "LAW25-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under Quebec Law 25",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Quebec Law 25.",
    "severity": "moderate",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1688,
    "code": "LAW25-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under Quebec Law 25",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Quebec Law 25.",
    "severity": "critical",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1689,
    "code": "LAW25-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under Quebec Law 25",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Quebec Law 25.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1690,
    "code": "LAW25-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under Quebec Law 25",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Quebec Law 25.",
    "severity": "critical",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1691,
    "code": "TDDDG-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Access Channel under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1692,
    "code": "TDDDG-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Rectification Form under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1693,
    "code": "TDDDG-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Inaccessible Data Deletion Portal under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1694,
    "code": "TDDDG-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Lack of Data Portability Export under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "moderate",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1695,
    "code": "TDDDG-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Targeted Advertising under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1696,
    "code": "TDDDG-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Personal Data Sales under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1697,
    "code": "TDDDG-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Opt-Out of Automated Profiling under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "moderate",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1698,
    "code": "TDDDG-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Processing Sensitive Data without Consent under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "critical",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1699,
    "code": "TDDDG-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Data Protection Impact Assessment under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1700,
    "code": "TDDDG-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Non-Compliant Notice at Collection under German Telecommunications-Telemedia Data Protection Act (TDDDG)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the German Telecommunications-Telemedia Data Protection Act (TDDDG).",
    "severity": "critical",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1701,
    "code": "SGPDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1702,
    "code": "SGPDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1703,
    "code": "SGPDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1704,
    "code": "SGPDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1705,
    "code": "SGPDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1706,
    "code": "SGPDPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1707,
    "code": "SGPDPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1708,
    "code": "SGPDPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1709,
    "code": "SGPDPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under Singapore Personal Data Protection Act (PDPA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1710,
    "code": "SGPDPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under Singapore Personal Data Protection Act (PDPA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Singapore Personal Data Protection Act (PDPA).",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1711,
    "code": "AUSAPP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under Australian Privacy Principles (APPs)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Australian Privacy Principles (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1712,
    "code": "AUSAPP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under Australian Privacy Principles (APPs)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Australian Privacy Principles (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1713,
    "code": "AUSAPP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under Australian Privacy Principles (APPs)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Australian Privacy Principles (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1714,
    "code": "AUSAPP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under Australian Privacy Principles (APPs)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Australian Privacy Principles (APPs).",
    "severity": "moderate",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1715,
    "code": "AUSAPP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under Australian Privacy Principles (APPs)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Australian Privacy Principles (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1716,
    "code": "AUSAPP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under Australian Privacy Principles (APPs)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Australian Privacy Principles (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1717,
    "code": "AUSAPP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under Australian Privacy Principles (APPs)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Australian Privacy Principles (APPs).",
    "severity": "moderate",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1718,
    "code": "AUSAPP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under Australian Privacy Principles (APPs)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Australian Privacy Principles (APPs).",
    "severity": "critical",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1719,
    "code": "AUSAPP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under Australian Privacy Principles (APPs)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Australian Privacy Principles (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1720,
    "code": "AUSAPP-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under Australian Privacy Principles (APPs)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Australian Privacy Principles (APPs).",
    "severity": "critical",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1721,
    "code": "NZPRIV-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under New Zealand Privacy Act 2020",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the New Zealand Privacy Act 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1722,
    "code": "NZPRIV-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under New Zealand Privacy Act 2020",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the New Zealand Privacy Act 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1723,
    "code": "NZPRIV-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under New Zealand Privacy Act 2020",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the New Zealand Privacy Act 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1724,
    "code": "NZPRIV-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under New Zealand Privacy Act 2020",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the New Zealand Privacy Act 2020.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1725,
    "code": "NZPRIV-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under New Zealand Privacy Act 2020",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the New Zealand Privacy Act 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1726,
    "code": "NZPRIV-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under New Zealand Privacy Act 2020",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the New Zealand Privacy Act 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1727,
    "code": "NZPRIV-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under New Zealand Privacy Act 2020",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the New Zealand Privacy Act 2020.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1728,
    "code": "NZPRIV-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under New Zealand Privacy Act 2020",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the New Zealand Privacy Act 2020.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1729,
    "code": "NZPRIV-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under New Zealand Privacy Act 2020",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the New Zealand Privacy Act 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1730,
    "code": "NZPRIV-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under New Zealand Privacy Act 2020",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the New Zealand Privacy Act 2020.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1731,
    "code": "JPAPPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1732,
    "code": "JPAPPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1733,
    "code": "JPAPPI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1734,
    "code": "JPAPPI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1735,
    "code": "JPAPPI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1736,
    "code": "JPAPPI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1737,
    "code": "JPAPPI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1738,
    "code": "JPAPPI-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1739,
    "code": "JPAPPI-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1740,
    "code": "JPAPPI-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under Japan Act on the Protection of Personal Information (APPI)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Japan Act on the Protection of Personal Information (APPI).",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1741,
    "code": "KRPIPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1742,
    "code": "KRPIPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1743,
    "code": "KRPIPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1744,
    "code": "KRPIPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1745,
    "code": "KRPIPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1746,
    "code": "KRPIPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1747,
    "code": "KRPIPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1748,
    "code": "KRPIPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1749,
    "code": "KRPIPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under South Korea Personal Information Protection Act (PIPA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1750,
    "code": "KRPIPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under South Korea Personal Information Protection Act (PIPA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the South Korea Personal Information Protection Act (PIPA).",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1751,
    "code": "VNDPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1752,
    "code": "VNDPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1753,
    "code": "VNDPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1754,
    "code": "VNDPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "moderate",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1755,
    "code": "VNDPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1756,
    "code": "VNDPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1757,
    "code": "VNDPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "moderate",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1758,
    "code": "VNDPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "critical",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1759,
    "code": "VNDPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1760,
    "code": "VNDPD-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under Vietnam Personal Data Protection Decree 13/2023/ND-CP",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Vietnam Personal Data Protection Decree 13/2023/ND-CP.",
    "severity": "critical",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1761,
    "code": "THPDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1762,
    "code": "THPDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1763,
    "code": "THPDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1764,
    "code": "THPDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1765,
    "code": "THPDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1766,
    "code": "THPDPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1767,
    "code": "THPDPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1768,
    "code": "THPDPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1769,
    "code": "THPDPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under Thailand Personal Data Protection Act (PDPA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1770,
    "code": "THPDPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under Thailand Personal Data Protection Act (PDPA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Thailand Personal Data Protection Act (PDPA).",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1771,
    "code": "INDPDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1772,
    "code": "INDPDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1773,
    "code": "INDPDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1774,
    "code": "INDPDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "moderate",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1775,
    "code": "INDPDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1776,
    "code": "INDPDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1777,
    "code": "INDPDP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "moderate",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1778,
    "code": "INDPDP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "critical",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1779,
    "code": "INDPDP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1780,
    "code": "INDPDP-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under India Digital Personal Data Protection Act 2023 (DPDP)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the India Digital Personal Data Protection Act 2023 (DPDP).",
    "severity": "critical",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1781,
    "code": "BRLGPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under Brazil General Data Protection Law (LGPD)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the Brazil General Data Protection Law (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1782,
    "code": "BRLGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under Brazil General Data Protection Law (LGPD)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the Brazil General Data Protection Law (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1783,
    "code": "BRLGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under Brazil General Data Protection Law (LGPD)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the Brazil General Data Protection Law (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1784,
    "code": "BRLGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under Brazil General Data Protection Law (LGPD)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the Brazil General Data Protection Law (LGPD).",
    "severity": "moderate",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1785,
    "code": "BRLGPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under Brazil General Data Protection Law (LGPD)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the Brazil General Data Protection Law (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1786,
    "code": "BRLGPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under Brazil General Data Protection Law (LGPD)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the Brazil General Data Protection Law (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1787,
    "code": "BRLGPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under Brazil General Data Protection Law (LGPD)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the Brazil General Data Protection Law (LGPD).",
    "severity": "moderate",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1788,
    "code": "BRLGPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under Brazil General Data Protection Law (LGPD)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the Brazil General Data Protection Law (LGPD).",
    "severity": "critical",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1789,
    "code": "BRLGPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under Brazil General Data Protection Law (LGPD)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the Brazil General Data Protection Law (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1790,
    "code": "BRLGPD-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under Brazil General Data Protection Law (LGPD)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the Brazil General Data Protection Law (LGPD).",
    "severity": "critical",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1791,
    "code": "ZAPOPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Access Channel under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website provides no accessible mechanism or contact email for users to request access to their stored personal data under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1792,
    "code": "ZAPOPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Rectification Form under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website fails to provide a form or procedure for users to correct inaccurate personal data collected under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1793,
    "code": "ZAPOPI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Inaccessible Data Deletion Portal under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website lacks a clear deletion request mechanism for users seeking erasure of their personal profiles under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1794,
    "code": "ZAPOPI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Lack of Data Portability Export under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website fails to offer a portable, structured format for users to download and transfer their records under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "moderate",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1795,
    "code": "ZAPOPI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Targeted Advertising under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website deploys tracking pixels for behavioral advertising without offering an opt-out link under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1796,
    "code": "ZAPOPI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Personal Data Sales under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website shares user details with marketing brokers without providing a prominent opt-out mechanism under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1797,
    "code": "ZAPOPI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Opt-Out of Automated Profiling under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website uses automated decision models for client eligibility without providing an opt-out under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "moderate",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1798,
    "code": "ZAPOPI-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Processing Sensitive Data without Consent under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website collects sensitive details (health, beliefs, finance) without affirmative opt-in consent under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "critical",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1799,
    "code": "ZAPOPI-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Data Protection Impact Assessment under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The organization fails to conduct or document required risk assessments for high-risk web profiling under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1800,
    "code": "ZAPOPI-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Non-Compliant Notice at Collection under South Africa Protection of Personal Information Act (POPIA)",
    "description": "The website collects personal details without presenting a compliant privacy disclosure notice under the South Africa Protection of Personal Information Act (POPIA).",
    "severity": "critical",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1801,
    "code": "TXSBB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1802,
    "code": "TXSBB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Audit and Record Failures",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1803,
    "code": "TXSBB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Interface Design Flaws",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1804,
    "code": "TXSBB-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Cryptographic Strengths",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1805,
    "code": "TXSBB-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Vulnerability Scanning Failures",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1806,
    "code": "TXSBB-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Consent Logging Integrity",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1807,
    "code": "TXSBB-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Opt-Out Links Visibility",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1808,
    "code": "TXSBB-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Privacy Notice Disclosures",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1809,
    "code": "TXSBB-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Audit Control Verification",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1810,
    "code": "TXSBB-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Unregistered Data Broker Operations Administrative Key Credentials",
    "description": "The website sells consumer data to third parties without registering in the Texas Data Broker Registry. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1811,
    "code": "WAHMHD-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1812,
    "code": "WAHMHD-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Audit and Record Failures",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1813,
    "code": "WAHMHD-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Interface Design Flaws",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1814,
    "code": "WAHMHD-004",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Cryptographic Strengths",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1815,
    "code": "WAHMHD-005",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Vulnerability Scanning Failures",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1816,
    "code": "WAHMHD-006",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Consent Logging Integrity",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1817,
    "code": "WAHMHD-007",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Opt-Out Links Visibility",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1818,
    "code": "WAHMHD-008",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Privacy Notice Disclosures",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1819,
    "code": "WAHMHD-009",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Audit Control Verification",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1820,
    "code": "WAHMHD-010",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Unlawful Geofencing Around Health Facilities Administrative Key Credentials",
    "description": "The mobile web app deploys geofencing tools around medical facilities to track visitor behavior without MHMDA consent. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1821,
    "code": "NYDFS-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1822,
    "code": "NYDFS-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Audit and Record Failures",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1823,
    "code": "NYDFS-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Interface Design Flaws",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1824,
    "code": "NYDFS-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Cryptographic Strengths",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1825,
    "code": "NYDFS-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Vulnerability Scanning Failures",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1826,
    "code": "NYDFS-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Consent Logging Integrity",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1827,
    "code": "NYDFS-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Opt-Out Links Visibility",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1828,
    "code": "NYDFS-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Privacy Notice Disclosures",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1829,
    "code": "NYDFS-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Audit Control Verification",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1830,
    "code": "NYDFS-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Financial Cybersecurity Certification Administrative Key Credentials",
    "description": "The financial portal operates without annual cybersecurity compliance filings required by New York DFS. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1831,
    "code": "PSD2-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA)",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1832,
    "code": "PSD2-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Audit and Record Failures",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1833,
    "code": "PSD2-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Interface Design Flaws",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1834,
    "code": "PSD2-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Cryptographic Strengths",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1835,
    "code": "PSD2-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Vulnerability Scanning Failures",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1836,
    "code": "PSD2-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Consent Logging Integrity",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1837,
    "code": "PSD2-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Opt-Out Links Visibility",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1838,
    "code": "PSD2-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Privacy Notice Disclosures",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1839,
    "code": "PSD2-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Audit Control Verification",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1840,
    "code": "PSD2-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Non-Compliant Strong Customer Authentication (SCA) Administrative Key Credentials",
    "description": "The checkout portal accepts credit card payments without enforcing multi-factor verification as required by PSD2. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1841,
    "code": "PCISC-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1842,
    "code": "PCISC-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Audit and Record Failures",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1843,
    "code": "PCISC-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Interface Design Flaws",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1844,
    "code": "PCISC-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Cryptographic Strengths",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1845,
    "code": "PCISC-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Vulnerability Scanning Failures",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1846,
    "code": "PCISC-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Consent Logging Integrity",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1847,
    "code": "PCISC-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Opt-Out Links Visibility",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1848,
    "code": "PCISC-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Privacy Notice Disclosures",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1849,
    "code": "PCISC-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Audit Control Verification",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1850,
    "code": "PCISC-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inadequate Client-Side Script Integrity Controls Administrative Key Credentials",
    "description": "The checkout page loads external JavaScript modules without active subresource integrity (SRI) validation filters. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1851,
    "code": "GLBAS-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1852,
    "code": "GLBAS-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Audit and Record Failures",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1853,
    "code": "GLBAS-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Interface Design Flaws",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1854,
    "code": "GLBAS-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Cryptographic Strengths",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1855,
    "code": "GLBAS-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Vulnerability Scanning Failures",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1856,
    "code": "GLBAS-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Consent Logging Integrity",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1857,
    "code": "GLBAS-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Opt-Out Links Visibility",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1858,
    "code": "GLBAS-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Privacy Notice Disclosures",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1859,
    "code": "GLBAS-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Audit Control Verification",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1860,
    "code": "GLBAS-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Secure Transmission Controls for Financial Data Administrative Key Credentials",
    "description": "The loan application form transmits credit reports and SSNs over network paths without strong transport layer encryption. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1861,
    "code": "FTCDP-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1862,
    "code": "FTCDP-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Audit and Record Failures",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1863,
    "code": "FTCDP-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Interface Design Flaws",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1864,
    "code": "FTCDP-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Cryptographic Strengths",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1865,
    "code": "FTCDP-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Vulnerability Scanning Failures",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1866,
    "code": "FTCDP-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Consent Logging Integrity",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1867,
    "code": "FTCDP-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Opt-Out Links Visibility",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1868,
    "code": "FTCDP-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Privacy Notice Disclosures",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1869,
    "code": "FTCDP-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Audit Control Verification",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1870,
    "code": "FTCDP-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Fictitious Original Pricing Discounts Administrative Key Credentials",
    "description": "The catalog displays crossed-out original prices that do not reflect actual historical sales averages, deceiving buyers. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1871,
    "code": "FTCCC-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1872,
    "code": "FTCCC-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Audit and Record Failures",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1873,
    "code": "FTCCC-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Interface Design Flaws",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1874,
    "code": "FTCCC-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Cryptographic Strengths",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1875,
    "code": "FTCCC-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Vulnerability Scanning Failures",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1876,
    "code": "FTCCC-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Consent Logging Integrity",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1877,
    "code": "FTCCC-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Opt-Out Links Visibility",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1878,
    "code": "FTCCC-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Privacy Notice Disclosures",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1879,
    "code": "FTCCC-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Audit Control Verification",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1880,
    "code": "FTCCC-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Asymmetric Subscription Cancellation Flow Administrative Key Credentials",
    "description": "The membership portal requires users to contact support via telephone to cancel recurring credit billing contracts. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1881,
    "code": "FTCFR-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1882,
    "code": "FTCFR-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Audit and Record Failures",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1883,
    "code": "FTCFR-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Interface Design Flaws",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1884,
    "code": "FTCFR-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Cryptographic Strengths",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1885,
    "code": "FTCFR-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Vulnerability Scanning Failures",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1886,
    "code": "FTCFR-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Consent Logging Integrity",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1887,
    "code": "FTCFR-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Opt-Out Links Visibility",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1888,
    "code": "FTCFR-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Privacy Notice Disclosures",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1889,
    "code": "FTCFR-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Audit Control Verification",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1890,
    "code": "FTCFR-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Undisclosed Compensated Review Incentives Administrative Key Credentials",
    "description": "Product rating summaries display paid reviews without clearly stating that customers received promo rewards for feedback. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1891,
    "code": "EUDOR-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1892,
    "code": "EUDOR-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Audit and Record Failures",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1893,
    "code": "EUDOR-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Interface Design Flaws",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1894,
    "code": "EUDOR-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Cryptographic Strengths",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1895,
    "code": "EUDOR-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Vulnerability Scanning Failures",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1896,
    "code": "EUDOR-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Consent Logging Integrity",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1897,
    "code": "EUDOR-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Opt-Out Links Visibility",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1898,
    "code": "EUDOR-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Privacy Notice Disclosures",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1899,
    "code": "EUDOR-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Audit Control Verification",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1900,
    "code": "EUDOR-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing IT Vulnerability Audit Records Administrative Key Credentials",
    "description": "The banking web interface operates without documented weekly network vulnerability reports required by DORA. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1901,
    "code": "EUCTA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1902,
    "code": "EUCTA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Audit and Record Failures",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1903,
    "code": "EUCTA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Interface Design Flaws",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1904,
    "code": "EUCTA-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Cryptographic Strengths",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1905,
    "code": "EUCTA-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Vulnerability Scanning Failures",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1906,
    "code": "EUCTA-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Consent Logging Integrity",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1907,
    "code": "EUCTA-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Opt-Out Links Visibility",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1908,
    "code": "EUCTA-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Privacy Notice Disclosures",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1909,
    "code": "EUCTA-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Audit Control Verification",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1910,
    "code": "EUCTA-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Beneficial Ownership Details in Portal Footer Administrative Key Credentials",
    "description": "The corporate profile footer lacks disclosures identifying the registered beneficial owners and registry IDs. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1911,
    "code": "WCAG2-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1912,
    "code": "WCAG2-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Audit and Record Failures",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1913,
    "code": "WCAG2-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Interface Design Flaws",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1914,
    "code": "WCAG2-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Cryptographic Strengths",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1915,
    "code": "WCAG2-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Vulnerability Scanning Failures",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1916,
    "code": "WCAG2-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Consent Logging Integrity",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1917,
    "code": "WCAG2-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Opt-Out Links Visibility",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1918,
    "code": "WCAG2-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Privacy Notice Disclosures",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1919,
    "code": "WCAG2-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Audit Control Verification",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1920,
    "code": "WCAG2-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inadequate Button Target Size Administrative Key Credentials",
    "description": "Interactive navigation elements have a click target size smaller than 24x24 CSS pixels, blocking mobility-impaired users. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1921,
    "code": "EAAAX-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1922,
    "code": "EAAAX-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Audit and Record Failures",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1923,
    "code": "EAAAX-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Interface Design Flaws",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1924,
    "code": "EAAAX-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Cryptographic Strengths",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1925,
    "code": "EAAAX-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Vulnerability Scanning Failures",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1926,
    "code": "EAAAX-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Consent Logging Integrity",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1927,
    "code": "EAAAX-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Opt-Out Links Visibility",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1928,
    "code": "EAAAX-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Privacy Notice Disclosures",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1929,
    "code": "EAAAX-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Audit Control Verification",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1930,
    "code": "EAAAX-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Inaccessible E-Commerce Checkout Controls Administrative Key Credentials",
    "description": "The digital store payment forms lack voice-assisted screen reader navigation support required by the EAA. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1931,
    "code": "ONADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1932,
    "code": "ONADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Audit and Record Failures",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1933,
    "code": "ONADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Interface Design Flaws",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1934,
    "code": "ONADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Cryptographic Strengths",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1935,
    "code": "ONADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Vulnerability Scanning Failures",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1936,
    "code": "ONADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Consent Logging Integrity",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1937,
    "code": "ONADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Opt-Out Links Visibility",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1938,
    "code": "ONADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Privacy Notice Disclosures",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1939,
    "code": "ONADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Audit Control Verification",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1940,
    "code": "ONADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Accessibility Feedback Channel Administrative Key Credentials",
    "description": "The Ontario-targeted website fails to host a dedicated compliance channel for users to report digital accessibility barriers. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1941,
    "code": "SEC50-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1942,
    "code": "SEC50-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Audit and Record Failures",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1943,
    "code": "SEC50-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Interface Design Flaws",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1944,
    "code": "SEC50-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Cryptographic Strengths",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1945,
    "code": "SEC50-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Vulnerability Scanning Failures",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1946,
    "code": "SEC50-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Consent Logging Integrity",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1947,
    "code": "SEC50-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Opt-Out Links Visibility",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1948,
    "code": "SEC50-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Privacy Notice Disclosures",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1949,
    "code": "SEC50-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Audit Control Verification",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1950,
    "code": "SEC50-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Missing Closed Captions on Training Videos Administrative Key Credentials",
    "description": "Embedded onboarding video files operate without synchronized text tracks or closed caption support for deaf users. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1951,
    "code": "EEOC-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1952,
    "code": "EEOC-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Audit and Record Failures",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1953,
    "code": "EEOC-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Interface Design Flaws",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1954,
    "code": "EEOC-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Cryptographic Strengths",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1955,
    "code": "EEOC-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Vulnerability Scanning Failures",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1956,
    "code": "EEOC-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Consent Logging Integrity",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1957,
    "code": "EEOC-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Opt-Out Links Visibility",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1958,
    "code": "EEOC-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Privacy Notice Disclosures",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1959,
    "code": "EEOC-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Audit Control Verification",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1960,
    "code": "EEOC-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Missing Automated Hiring Algorithmic Bias Audit Administrative Key Credentials",
    "description": "The recruitment application ranks applicant profiles using AI tools without carrying out annual bias audits. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1961,
    "code": "BIPAX-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1962,
    "code": "BIPAX-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Audit and Record Failures",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1963,
    "code": "BIPAX-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Interface Design Flaws",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1964,
    "code": "BIPAX-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Cryptographic Strengths",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1965,
    "code": "BIPAX-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Vulnerability Scanning Failures",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1966,
    "code": "BIPAX-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Consent Logging Integrity",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1967,
    "code": "BIPAX-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Opt-Out Links Visibility",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1968,
    "code": "BIPAX-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Privacy Notice Disclosures",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1969,
    "code": "BIPAX-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Audit Control Verification",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1970,
    "code": "BIPAX-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Missing Biometric Scanner Consent in Virtual Try-On Administrative Key Credentials",
    "description": "The cosmetics portal deploys face-scanning virtual try-on software without obtaining prior written biometric consent. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1971,
    "code": "CIPAX-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1972,
    "code": "CIPAX-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Audit and Record Failures",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1973,
    "code": "CIPAX-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Interface Design Flaws",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1974,
    "code": "CIPAX-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Cryptographic Strengths",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1975,
    "code": "CIPAX-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Vulnerability Scanning Failures",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1976,
    "code": "CIPAX-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Consent Logging Integrity",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1977,
    "code": "CIPAX-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Opt-Out Links Visibility",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1978,
    "code": "CIPAX-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Privacy Notice Disclosures",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1979,
    "code": "CIPAX-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Audit Control Verification",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1980,
    "code": "CIPAX-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chatbot Live Transcription Without CIPA Warning Administrative Key Credentials",
    "description": "The client chat script performs real-time text transcription and records dialogs without presenting a wiretapping warning. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1981,
    "code": "LKSG-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1982,
    "code": "LKSG-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Audit and Record Failures",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1983,
    "code": "LKSG-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Interface Design Flaws",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1984,
    "code": "LKSG-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Cryptographic Strengths",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1985,
    "code": "LKSG-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Vulnerability Scanning Failures",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1986,
    "code": "LKSG-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Consent Logging Integrity",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1987,
    "code": "LKSG-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Opt-Out Links Visibility",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1988,
    "code": "LKSG-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Privacy Notice Disclosures",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1989,
    "code": "LKSG-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Audit Control Verification",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1990,
    "code": "LKSG-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Supply Chain Grievance Channel Administrative Key Credentials",
    "description": "The corporate website lacks a publicly accessible portal allowing suppliers to submit human rights violation complaints. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1991,
    "code": "CSRD-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1992,
    "code": "CSRD-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Audit and Record Failures",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. Inadequate audit trails or record preservation protocols fail to document configuration settings.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1993,
    "code": "CSRD-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Interface Design Flaws",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. User interfaces employ design components that restrict access or options for visitors.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1994,
    "code": "CSRD-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Cryptographic Strengths",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. Cryptographic hashing algorithms or encryption transport layers fall below baseline standards.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1995,
    "code": "CSRD-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Vulnerability Scanning Failures",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. Automated scanning tools fail to run periodically on public web paths.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1996,
    "code": "CSRD-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Consent Logging Integrity",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. Automated logging systems fail to store customer choices in an immutable storage registry.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1997,
    "code": "CSRD-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Opt-Out Links Visibility",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. Footers lack conspicuous links allowing visitors to request exclusion from data tracking.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1998,
    "code": "CSRD-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Privacy Notice Disclosures",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. Disclosures fail to clearly state the reasons and scope of personal file processing.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1999,
    "code": "CSRD-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Audit Control Verification",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. Data transfer procedures operate without automated checks ensuring record validity.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 2000,
    "code": "CSRD-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Missing Digital Sustainability Disclosures Administrative Key Credentials",
    "description": "The corporate portal fails to publish annual sustainability audits in the machine-readable digital format. Administrative consoles allow standard user credentials without enforcing MFA keys.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  }
];
