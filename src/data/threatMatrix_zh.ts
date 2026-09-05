import { ComplianceCheck, LawMeta, Category } from './threatMatrix';

export const LAW_META_ZH: Record<Category, LawMeta> = {
  "ADA / WCAG": {
    "lawName": "ADA 第三章 / 欧洲无障碍法案 (EAA) / 安大略省 AODA",
    "lawUrl": "https://www.ada.gov/resources/web-guidance/",
    "fineAmount": "$75,000–$150,000 (ADA) / €100,000 (EAA) / 每天 $100,000 (AODA)",
    "reportingConsequence": "司法部民事执法 / 国家市场监督处罚 / 安大略省部审计"
  },
  "HIPAA / Medical": {
    "lawName": "HIPAA 隐私规则 / 华盛顿州《我的健康我的数据法案》(MHMDA)",
    "lawUrl": "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
    "fineAmount": "每年 $50,000–$1,500,000 / 每次 MHMDA 违规 $7,500",
    "reportingConsequence": "HHS OCR 民事调查 / MHMDA 下的集体诉讼 / DOJ 起诉"
  },
  "CCPA / CPRA": {
    "lawName": "加州消费者隐私法 (CCPA/CPRA) / 加州适龄设计法典 (AB 2273)",
    "lawUrl": "https://oag.ca.gov/privacy/ccpa",
    "fineAmount": "每次违规 $2,500–$7,500 / 每名儿童 $7,500 (AB 2273)",
    "reportingConsequence": "加州隐私保护局 (CPPA) 审计 / 加州总检察长民事执法"
  },
  "FTC Enforcement": {
    "lawName": "联邦贸易委员会法 — 第 5 条（欺骗性行为与暗黑模式）",
    "lawUrl": "https://www.ftc.gov/legal-library/browse/statutes/federal-trade-commission-act",
    "fineAmount": "每次违规最高 $50,120（每年调整）",
    "reportingConsequence": "FTC 执法令 / 同意令 / 强制消费者退款 / 审计"
  },
  "TCPA / Telecom": {
    "lawName": "电话消费者保护法 (TCPA) / CAN-SPAM 法案 / FTSA",
    "lawUrl": "https://www.fcc.gov/general/telemarketing-and-robocalls",
    "fineAmount": "每次通话/短信 $500–$1,500 (TCPA) / 每封 CAN-SPAM 邮件 $50,120",
    "reportingConsequence": "FCC 监管行动 / 集体诉讼 / ISP 永久域名黑名单"
  },
  "GDPR": {
    "lawName": "欧盟 GDPR / 英国 GDPR / ePrivacy 指令",
    "lawUrl": "https://gdpr-info.eu/",
    "fineAmount": "最高 €20,000,000 / £17.5M 或全球年营业额的 4%",
    "reportingConsequence": "国家 DPA 调查（CNIL、ICO 等）/ 处理禁令 / 强制违规报告"
  },
  "PCI-DSS / Security": {
    "lawName": "PCI DSS v4.0 — PCI 安全标准委员会要求",
    "lawUrl": "https://www.pcisecuritystandards.org/standards/pci-dss/",
    "fineAmount": "每月 $5,000–$100,000；商户卡处理暂停",
    "reportingConsequence": "卡网络罚款 / 强制取证审计 / 信用卡处理终止"
  },
  "State Privacy Laws": {
    "lawName": "美国州隐私法 (VA VCDPA、TX TDPSA、CO CPA) / NY DFS / NY SHIELD",
    "lawUrl": "https://www.ncsl.org/technology-and-communication/state-laws-related-to-digital-privacy",
    "fineAmount": "各州每次违规 $2,500–$7,500 / NY DFS 最高 $250,000",
    "reportingConsequence": "州总检察长民事诉讼 / NY DFS 金融执法 / 集体诉讼责任"
  },
  "Financial / Corporate": {
    "lawName": "欧盟 DORA / Gramm-Leach-Bliley 法案 (GLBA) / 企业透明度法案 (CTA)",
    "lawUrl": "https://www.ftc.gov/legal-library/browse/statutes/gramm-leach-bliley-act",
    "fineAmount": "FinCEN BOI 每日迟报 $500 / GLBA 最高 $100,000 / DORA 每日全球营业额的 1%",
    "reportingConsequence": "FinCEN/IRS 刑事处罚 / SEC 执法 / 欧洲 ESA 监管审计"
  },
  "Digital Operations": {
    "lawName": "加拿大 PIPEDA 与第 25 号法律 / 巴西 LGPD / 澳大利亚隐私法 / 新加坡 PDPA / 欧盟 AI 法案与 DSA",
    "lawUrl": "https://laws-lois.justice.gc.ca/eng/acts/P-8.6/",
    "fineAmount": "PIPEDA $100,000 CAD / 魁北克 $25M CAD / LGPD 收入的 2% / APPs $50M AUD / AI 法案 €35M 或收入的 7%",
    "reportingConsequence": "加拿大 OPC 调查 / 巴西 ANPD 审计 / 澳大利亚 OAIC 诉讼 / 欧盟 AI 办公室执法"
  }
};

export const threatMatrixZh: ComplianceCheck[] = [
  {
    "id": 1,
    "code": "ADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "图像缺少 ALT 标签",
    "description": "图像缺少替代文本属性，使视觉内容对屏幕阅读器不可见。这是提交最多的 ADA 网页无障碍投诉，也是最容易在法庭上证明的。",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 1.1.1"
  },
  {
    "id": 2,
    "code": "ADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "交互元素缺少 ARIA 标签",
    "description": "按钮、链接和交互控件缺少通过 aria-label 或 aria-labelledby 提供的可访问名称。屏幕阅读器用户无法确定这些元素的目的，造成使用障碍。",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 4.1.2"
  },
  {
    "id": 3,
    "code": "ADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "颜色对比度不足",
    "description": "文本与背景的对比度低于正常文本所需的 4.5:1 最小比率。低视力用户无法阅读页面内容，这是一个可测量、可自动化的违规行为，经常在需求函中被引用。",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 1.4.3"
  },
  {
    "id": 4,
    "code": "ADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少跳过导航链接",
    "description": "页面缺少作为第一个可聚焦元素的“跳至主要内容”链接。键盘和屏幕阅读器用户必须在每次页面加载时通过整个导航，这是一个记录在案的无障碍障碍。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.4.1"
  },
  {
    "id": 5,
    "code": "ADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "键盘无法访问的交互元素",
    "description": "下拉菜单、模态框或自定义控件等交互元素无法仅通过键盘操作。无法使用鼠标的用户完全无法使用关键功能。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.1.1"
  },
  {
    "id": 6,
    "code": "ADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "表单字段缺少标签",
    "description": "表单输入缺少关联的 <label> 元素或 aria-label 属性。屏幕阅读器用户无法识别请求的信息，阻止表单完成。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.3.1"
  },
  {
    "id": 7,
    "code": "ADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "标题层级损坏",
    "description": "页面缺少 H1 元素或跳过标题级别（例如，从 H1 到 H3）。屏幕阅读器依赖标题结构进行页面导航；损坏的层级使内容难以扫描和理解。",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 1.3.1"
  },
  {
    "id": 8,
    "code": "ADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少 HTML Lang 属性",
    "description": "<html> 元素缺少指定页面语言的 lang 属性。屏幕阅读器无法确定正确的发音规则，导致所有页面内容输出为乱码语音。",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 3.1.1"
  },
  {
    "id": 9,
    "code": "ADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "安装了 ADA 覆盖小部件",
    "description": "安装了第三方无障碍覆盖小部件（例如，AccessiBe、UserWay）。这些覆盖被视为“流氓律师的危险信号”，不提供法律合规性，并已被残疾倡导组织和法院明确拒绝。",
    "severity": "moderate",
    "reference": "ADA Title III; DOJ Web Guidance 2022"
  },
  {
    "id": 10,
    "code": "ADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "职业/求职申请门户无法访问",
    "description": "职业页面或求职申请门户对残疾用户不可访问。这在 ADA 第一章（就业）和第三章（公共住宿）下都产生责任，并且是连续 ADA 原告的频繁目标。",
    "severity": "advisory",
    "reference": "ADA Title I § 12112; Title III § 12182"
  },
  {
    "id": 11,
    "code": "HIPAA-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗预约页面上的 Meta Pixel",
    "description": "Facebook/Meta 跟踪像素在预约安排或医疗服务页面上触发，向 Meta 传输患者健康状况数据。HHS 已发布明确指导，指出这构成不允许的 PHI 披露。",
    "severity": "critical",
    "reference": "45 CFR § 164.502; HHS Bulletin Dec 2022"
  },
  {
    "id": 12,
    "code": "HIPAA-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "患者门户上的 Google Analytics 缺少 BAA",
    "description": "Google Analytics 在患者门户页面上收集数据，但没有签署商业伙伴协议。Google 不为标准 Analytics 签署 BAA，使任何患者门户跟踪成为自动 HIPAA 违规。",
    "severity": "critical",
    "reference": "45 CFR § 164.502(e)"
  },
  {
    "id": 13,
    "code": "HIPAA-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "缺少善意估算页面",
    "description": "网站未提供有关患者有权根据《无意外法案》获得预期费用善意估算的信息。自付和无保险患者必须在安排服务前被告知此权利。",
    "severity": "serious",
    "reference": "No Surprises Act § 112; 45 CFR § 149.610"
  },
  {
    "id": 14,
    "code": "HIPAA-004",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "健康服务页面上的社交媒体像素",
    "description": "TikTok、Snapchat 或其他社交媒体跟踪像素在描述特定健康状况或治疗的页面上处于活动状态。这些像素传输 URL 路径，揭示用户正在研究健康状况。",
    "severity": "critical",
    "reference": "45 CFR § 164.502; FTC Health Breach Notification Rule"
  },
  {
    "id": 15,
    "code": "HIPAA-005",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "与表单 SaaS 提供商缺少 BAA",
    "description": "患者入院或联系表单通过第三方 SaaS 平台（例如，Typeform、JotForm）处理，但没有签署商业伙伴协议。通过这些表单提交的所有患者数据都是不安全的 PHI 披露。",
    "severity": "serious",
    "reference": "45 CFR § 164.502(e); § 164.504(e)"
  },
  {
    "id": 16,
    "code": "HIPAA-006",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "未经同意收集症状的医疗聊天机器人",
    "description": "AI驱动或脚本化的聊天机器人正在收集症状信息、健康投诉或医疗历史，而未展示HIPAA授权或隐私实践通知。这创建了一个不受控制的PHI收集点。",
    "severity": "serious",
    "reference": "45 CFR § 164.520; § 164.508"
  },
  {
    "id": 17,
    "code": "HIPAA-007",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "未加密的患者入院表格",
    "description": "患者入院表格通过未加密的HTTP连接提交或在静态时未加密存储。HIPAA要求对传输中和静态的电子PHI进行包括加密在内的技术保障。",
    "severity": "moderate",
    "reference": "45 CFR § 164.312(a)(2)(iv); § 164.312(e)(1)"
  },
  {
    "id": 18,
    "code": "HIPAA-008",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "缺少患者PHI访问请求链接",
    "description": "网站未提供患者请求访问或下载其受保护健康信息的机制。HIPAA赋予患者访问其PHI的权利，且该过程必须明确传达。",
    "severity": "moderate",
    "reference": "45 CFR § 164.524"
  },
  {
    "id": 19,
    "code": "HIPAA-009",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "跨州远程医疗服务无执照过滤",
    "description": "向提供者未获执照的州提供远程医疗服务，且未设置地理资格过滤器。公司行医法（CPOM）和州执照要求可能被违反。",
    "severity": "moderate",
    "reference": "State Medical Practice Acts; CPOM Statutes"
  },
  {
    "id": 20,
    "code": "HIPAA-010",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "健康追踪未获MHMDA同意",
    "description": "健康或健康网站在未获得华盛顿州《我的健康我的数据法案》（MHMDA）要求的同意下追踪用户行为。该法律适用于从华盛顿居民收集健康数据的任何实体，而不仅限于HIPAA覆盖实体。",
    "severity": "advisory",
    "reference": "RCW 19.373 (Washington MHMDA)"
  },
  {
    "id": 21,
    "code": "CCPA-001",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺少\"不销售或分享\"页脚链接",
    "description": "网站页脚缺少\"不销售或分享我的个人信息\"链接。CCPA要求此链接对加州消费者清晰、醒目且在每个页面可用。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.120(a)"
  },
  {
    "id": 22,
    "code": "CCPA-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "电子邮件折扣弹窗无财务激励通知",
    "description": "电子邮件注册弹窗提供折扣（例如“订阅享9折”），但未提供财务激励通知。CCPA/CPRA要求企业披露与数据收集相关的任何财务激励计划的实质条款。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.125(b)"
  },
  {
    "id": 23,
    "code": "CCPA-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "第三方追踪器在Cookie同意前触发",
    "description": "分析、广告和社交媒体追踪脚本在用户提供同意前执行。根据CCPA/CPRA，用于跨上下文行为广告的第三方数据共享至少需要退出功能。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.120; 11 CCR § 7025"
  },
  {
    "id": 24,
    "code": "CCPA-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺少或不充分的隐私政策",
    "description": "网站缺少全面的隐私政策，或现有政策未能披露CCPA要求的类别：收集的个人信息类型、目的、第三方共享和消费者权利。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.130(a)(5)"
  },
  {
    "id": 25,
    "code": "CCPA-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "职业页面缺少申请人隐私通知",
    "description": "职业或求职申请页面在收集简历和个人数据时未提供申请人隐私通知。CPRA将隐私权扩展至求职者和员工，要求在收集点进行披露。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.100(b); CPRA Employee/Applicant Extension"
  },
  {
    "id": 26,
    "code": "CCPA-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "无数据删除请求机制",
    "description": "网站未提供消费者请求删除其个人信息的方式。CCPA要求至少提供两种提交消费者请求的方法，包括大型企业需提供免费电话号码。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.105; § 1798.130"
  },
  {
    "id": 27,
    "code": "CCPA-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "第三方数据共享未披露",
    "description": "个人信息与第三方广告、分析或数据丰富服务共享，但未在隐私政策中披露。每一次未披露的共享关系均构成单独违规。",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.115"
  },
  {
    "id": 28,
    "code": "CCPA-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "加州用户缺少Cookie同意横幅",
    "description": "未向加州访客展示Cookie同意机制。虽然CCPA未具体要求Cookie横幅，但CPPA已表示将优先执行未遵守退出信号而部署追踪Cookie的网站。",
    "severity": "moderate",
    "reference": "11 CCR § 7025; Cal. Civ. Code § 1798.135(e)"
  },
  {
    "id": 29,
    "code": "CCPA-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "自动选择加入营销通信",
    "description": "用户在创建账户或结账时自动选择加入营销电子邮件或短信，而未获得明确同意。预选营销同意框违反CCPA原则和CAN-SPAM要求。",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.120; 16 CFR § 316"
  },
  {
    "id": 30,
    "code": "CCPA-010",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "作为数据经纪商运营但未注册",
    "description": "企业收集并出售与其无直接关系的消费者的个人信息，符合数据经纪商的定义，但未按德克萨斯州SB 2105和加州《删除法案》要求在州注册。",
    "severity": "advisory",
    "reference": "TX Bus. & Com. Code § 509; Cal. Civ. Code § 1798.99.82"
  },
  {
    "id": 31,
    "code": "FTC-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假倒计时器（黑暗模式）",
    "description": "“限时优惠”倒计时器在页面重新加载时重置，揭示其为虚构的紧迫感。FTC 将虚假倒计时器归类为欺骗性黑暗模式，根据《联邦贸易委员会法》第 5 条进行执法。",
    "severity": "critical",
    "reference": "FTC Act § 5; FTC Dark Patterns Report 2022"
  },
  {
    "id": 32,
    "code": "FTC-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "欺骗性划掉“原价”",
    "description": "显示从未是实际售价的划掉“原价”，制造虚假折扣。FTC 的《反对欺骗性定价指南》禁止虚构的前价。",
    "severity": "critical",
    "reference": "16 CFR § 233; FTC Act § 5"
  },
  {
    "id": 33,
    "code": "FTC-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假社会证明计数器",
    "description": "“现在有 X 人在查看”或“库存仅剩 Y 件”等计数器显示虚构或无法验证的数字。FTC 认为制造的社会证明属于欺骗性贸易行为。",
    "severity": "serious",
    "reference": "FTC Act § 5; FTC Endorsement Guides 16 CFR § 255"
  },
  {
    "id": 34,
    "code": "FTC-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未经验证的客户评论",
    "description": "显示客户评论而未验证购买或真实性。FTC 2024 年《消费者评论使用规则》禁止虚假、购买或有奖励的评论而无明确披露。",
    "severity": "critical",
    "reference": "16 CFR § 465 (FTC Review Rule 2024)"
  },
  {
    "id": 35,
    "code": "FTC-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "订阅取消比注册更难",
    "description": "取消订阅需要比原始注册过程更多的步骤、电话或障碍。FTC 的《一键取消规则》要求取消应与注册一样容易。",
    "severity": "serious",
    "reference": "16 CFR § 425 (FTC Click-to-Cancel Rule 2024)"
  },
  {
    "id": 36,
    "code": "FTC-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "缺少联盟披露",
    "description": "联盟链接和推荐佣金未在页面第一个联盟链接上方清晰显著地披露。FTC 要求在消费者遇到背书之前披露实质性联系。",
    "severity": "serious",
    "reference": "16 CFR § 255.5; FTC Endorsement Guides"
  },
  {
    "id": 37,
    "code": "FTC-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未披露的付费推荐",
    "description": "显示客户或影响者推荐而未披露评论者收到报酬、免费产品或其他激励。每个未披露的付费背书可处以高达 50,000 美元的罚款。",
    "severity": "moderate",
    "reference": "16 CFR § 255.1; FTC Endorsement Guides"
  },
  {
    "id": 38,
    "code": "FTC-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未经证实的环保声明",
    "description": "营销文案使用“环保”、“碳中和”或“可持续”等术语而无第三方认证或证实。FTC 的《绿色指南》要求环境声明有胜任且可靠的科学证据。",
    "severity": "moderate",
    "reference": "16 CFR § 260 (FTC Green Guides)"
  },
  {
    "id": 39,
    "code": "FTC-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "免费试用自动转为付费而无披露",
    "description": "免费试用在消费者提供付款信息前，未明确显著披露转换条款、账单日期和金额即自动转为付费订阅。",
    "severity": "moderate",
    "reference": "FTC Act § 5; Restore Online Shoppers' Confidence Act (ROSCA)"
  },
  {
    "id": 40,
    "code": "FTC-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "诱饵切换定价",
    "description": "广告或搜索结果中显示的价格与结账时因添加费用、不同产品版本或更改条款而显示的价格不同。这构成典型的诱饵切换欺骗。",
    "severity": "advisory",
    "reference": "FTC Act § 5; 16 CFR § 238 (Bait Advertising)"
  },
  {
    "id": 41,
    "code": "TCPA-001",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "联系表单缺少短信同意复选框",
    "description": "联系或潜在客户生成表单收集电话号码而无明确的短信通信选择加入复选框。A2P 10DLC 运营商要求和 TCPA 要求营销短信需事先书面同意。",
    "severity": "critical",
    "reference": "47 U.S.C. § 227(b); A2P 10DLC Guidelines"
  },
  {
    "id": 42,
    "code": "TCPA-002",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "营销短信在当地时间晚上 8 点后发送",
    "description": "自动营销短信在允许时间外发送。佛罗里达州的《电话招揽法》(FTSA) 将短信限制在当地时间上午 8 点至晚上 8 点，其他州也有类似时段限制。",
    "severity": "critical",
    "reference": "FL Stat. § 501.059 (FTSA); 47 U.S.C. § 227"
  },
  {
    "id": 43,
    "code": "TCPA-003",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "营销短信中无 STOP 机制",
    "description": "营销短信未包含退出说明（如“回复 STOP 退订”）。CTIA 指南和 TCPA 要求每条营销短信包含明确的退出机制。",
    "severity": "critical",
    "reference": "47 U.S.C. § 227; CTIA Short Code Monitoring Handbook"
  },
  {
    "id": 44,
    "code": "TCPA-004",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "营销邮件无实体地址",
    "description": "商业电子邮件消息未包含发件人的有效实体邮政地址。CAN-SPAM 要求每封商业邮件包含发件人当前街道地址或注册邮政信箱。",
    "severity": "serious",
    "reference": "15 U.S.C. § 7704(a)(5)(A); 16 CFR § 316.2"
  },
  {
    "id": 45,
    "code": "TCPA-005",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "营销邮件无退订链接",
    "description": "商业邮件缺少有效的退订机制。CAN-SPAM 要求每条商业消息中包含清晰显著的退出方法，且退出请求必须在 10 个工作日内处理。",
    "severity": "serious",
    "reference": "15 U.S.C. § 7704(a)(3); 16 CFR § 316.5"
  },
  {
    "id": 46,
    "code": "TCPA-006",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "未获得事先书面同意的弃购购物车短信",
    "description": "向未提供营销短信事先明确书面同意的消费者发送弃购购物车恢复短信。根据TCPA，购物车放弃不构成同意。",
    "severity": "serious",
    "reference": "47 U.S.C. § 227(b)(1)(A)(iii)"
  },
  {
    "id": 47,
    "code": "TCPA-007",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "未获得TCPA明确同意的自动拨号器",
    "description": "使用自动电话拨号系统（ATDS）拨打电话或发送短信而未获得事先明确同意。TCPA禁止向手机发送未经请求的自动拨号或预录语音呼叫。",
    "severity": "moderate",
    "reference": "47 U.S.C. § 227(b)(1)(A)"
  },
  {
    "id": 48,
    "code": "TCPA-008",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "缺少A2P 10DLC活动注册",
    "description": "通过长代码（10位数字）发送商业短信而未向运营商正确注册A2P 10DLC活动。未注册的活动会面临消息过滤、阻止和每条消息的运营商罚款。",
    "severity": "moderate",
    "reference": "CTIA 10DLC Policy; Carrier A2P Guidelines"
  },
  {
    "id": 49,
    "code": "TCPA-009",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "批量短信缺少STOP关键字处理程序",
    "description": "批量短信系统不会自动处理STOP关键字响应以立即停止发送消息。未能遵守退订关键字会使企业面临每条消息500–1500美元的TCPA集体诉讼责任。",
    "severity": "moderate",
    "reference": "47 U.S.C. § 227; CTIA Messaging Principles"
  },
  {
    "id": 50,
    "code": "TCPA-010",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "未获得选择加入的预录语音消息",
    "description": "向消费者发送预录或人工语音营销消息而未获得事先明确书面同意。TCPA的机器人呼叫条款规定每通电话法定损害赔偿为500–1500美元。",
    "severity": "advisory",
    "reference": "47 U.S.C. § 227(b)(1)(B)"
  },
  {
    "id": 51,
    "code": "GDPR-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Meta Pixel在Cookie同意前触发",
    "description": "Facebook/Meta跟踪像素在访客与Cookie同意横幅互动前加载并传输用户数据。根据GDPR，非必要跟踪需要事先、知情且肯定的同意。",
    "severity": "critical",
    "reference": "GDPR Article 6(1)(a); ePrivacy Directive Article 5(3)"
  },
  {
    "id": 52,
    "code": "GDPR-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "欧盟访客无Cookie同意横幅",
    "description": "网站未向欧盟成员国访客显示Cookie同意机制。ePrivacy指令和GDPR要求在放置非必要Cookie或跟踪技术前获得知情同意。",
    "severity": "critical",
    "reference": "GDPR Article 7; ePrivacy Directive Article 5(3)"
  },
  {
    "id": 53,
    "code": "GDPR-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Google Analytics未获得GDPR同意",
    "description": "Google Analytics在未获得事先同意的情况下收集欧盟用户的访客数据。多个欧盟数据保护机构已裁定Google Analytics传输构成非法处理和跨境数据传输。",
    "severity": "critical",
    "reference": "GDPR Article 44; Austrian DSB & French CNIL Rulings 2022"
  },
  {
    "id": 54,
    "code": "GDPR-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "与处理者无数据处理协议",
    "description": "代表控制者处理个人数据的第三方服务在没有签署数据处理协议的情况下运行。GDPR要求书面合同明确处理范围、目的和安全义务。",
    "severity": "serious",
    "reference": "GDPR Article 28(3)"
  },
  {
    "id": 55,
    "code": "GDPR-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "无72小时违规通知流程",
    "description": "组织没有在意识到个人数据泄露后72小时内通知监管机构的文件化程序。未能通知是单独的、可独立罚款的违规行为。",
    "severity": "serious",
    "reference": "GDPR Article 33"
  },
  {
    "id": 56,
    "code": "GDPR-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "无保障措施的跨境数据传输",
    "description": "欧盟居民的个人数据被传输到美国服务器或服务，而未遵循Schrems II裁决采用标准合同条款（SCCs）、充分性决定或其他批准的传输机制。",
    "severity": "serious",
    "reference": "GDPR Articles 44–49; Schrems II (C-311/18)"
  },
  {
    "id": 57,
    "code": "GDPR-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "YouTube嵌入泄露视频观看数据",
    "description": "标准YouTube嵌入结合跟踪像素会造成类似VPPA违规的视频观看数据泄露。YouTube的标准嵌入在获得同意前与Google共享观看习惯。",
    "severity": "moderate",
    "reference": "GDPR Article 6(1)(a); ePrivacy Directive Article 5(3)"
  },
  {
    "id": 58,
    "code": "GDPR-008",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "无“被遗忘权”机制",
    "description": "网站未提供数据主体请求删除其个人数据的方式。GDPR的删除权要求控制者在没有压倒性法律依据时根据请求删除个人数据。",
    "severity": "moderate",
    "reference": "GDPR Article 17"
  },
  {
    "id": 59,
    "code": "GDPR-009",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未发布数据保留政策",
    "description": "隐私政策未指定个人数据保留时长或确定保留期限所使用的标准。GDPR要求在收集时透明地告知保留期限。",
    "severity": "moderate",
    "reference": "GDPR Article 13(2)(a); Article 5(1)(e)"
  },
  {
    "id": 60,
    "code": "GDPR-010",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "同意横幅使用预选复选框",
    "description": "Cookie同意横幅为分析或营销Cookie显示预选同意框。欧盟法院在Planet49案中裁定预选复选框不构成GDPR下的有效同意。",
    "severity": "advisory",
    "reference": "GDPR Article 4(11); CJEU Planet49 (C-673/17)"
  },
  {
    "id": 61,
    "code": "PCI-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺少 Content-Security-Policy 标头",
    "description": "该网站未设置 Content-Security-Policy HTTP 标头，使其容易受到跨站脚本 (XSS) 和数据注入攻击。CSP 是防止未经授权脚本执行的关键防御层。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; OWASP CSP Cheat Sheet"
  },
  {
    "id": 62,
    "code": "PCI-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "前端源代码中暴露 API 密钥",
    "description": "Google Maps、Stripe 或 SendGrid 等服务的 API 密钥在客户端 JavaScript 源代码中可见。暴露的密钥可能被机器人获取，用于未经授权的 API 访问、账单欺诈或数据外泄。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 2.2.7; OWASP API Security Top 10"
  },
  {
    "id": 63,
    "code": "PCI-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "支付表单未使用令牌化",
    "description": "信用卡号直接收集到商户服务器的表单字段中，而非通过符合 PCI 的令牌化服务（如 Stripe Elements、Braintree）。这将整个站点置于 PCI-DSS 范围内。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 3.4; Req. 4.2"
  },
  {
    "id": 64,
    "code": "PCI-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "表单或支付页面缺少 HTTPS",
    "description": "包含表单、登录字段或支付输入的页面通过未加密的 HTTP 提供服务。这些页面上提交的所有数据都可能被任何网络中介截获。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 4.2.1"
  },
  {
    "id": 65,
    "code": "PCI-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "HTTPS 页面存在混合内容",
    "description": "页面通过 HTTPS 提供服务，但子资源（图像、脚本、样式表）通过不安全的 HTTP 加载。混合内容破坏了 HTTPS 的安全保障，可能被用于中间人攻击。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 4.2.1; OWASP Transport Layer Security"
  },
  {
    "id": 66,
    "code": "PCI-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "开放目录列表",
    "description": "服务器目录（如 /wp-content/uploads/）可被浏览，暴露上传的文件、内部文档和潜在敏感数据。必须在所有可通过 Web 访问的路径上禁用目录列表。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 2.2.7; CIS Apache Benchmark"
  },
  {
    "id": 67,
    "code": "PCI-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "XML-RPC 端点已启用",
    "description": "WordPress XML-RPC 端点 (xmlrpc.php) 可公开访问并响应请求。该端点是已知的暴力破解放大攻击和 DDoS 滥用向量。",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.3.3; CVE-2015-5623"
  },
  {
    "id": 68,
    "code": "PCI-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "存在已知 CVE 的过时 CMS",
    "description": "内容管理系统（WordPress、Magento、Drupal）运行的版本存在公开披露的安全漏洞。未打补丁的 CMS 安装是网站被入侵的主要向量。",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.3.1; Req. 6.3.3"
  },
  {
    "id": 69,
    "code": "PCI-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "第三方脚本缺少 SRI",
    "description": "外部 JavaScript 文件加载时未使用子资源完整性 (SRI) 哈希。如果第三方 CDN 或脚本主机被入侵，恶意代码可能被注入页面而无法检测。",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; W3C SRI Specification"
  },
  {
    "id": 70,
    "code": "PCI-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "表单缺少 CAPTCHA 保护",
    "description": "联系表单、登录页面和注册表单缺少 CAPTCHA 或机器人检测机制。未受保护的表单容易受到凭证填充、垃圾注入和大规模自动化滥用。",
    "severity": "advisory",
    "reference": "PCI-DSS v4.0 Req. 6.2.4; OWASP Automated Threats"
  },
  {
    "id": 71,
    "code": "STATE-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CIPA：聊天机器人未经同意进行录音",
    "description": "第三方聊天机器人记录并存储对话记录，而未告知用户并获得同意。根据加州《隐私入侵法》(CIPA)，这构成非法窃听，每次对话罚款 5,000 美元。",
    "severity": "critical",
    "reference": "Cal. Penal Code § 631; § 632.7 (CIPA)"
  },
  {
    "id": 72,
    "code": "STATE-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "BIPA：虚拟试穿未获得生物识别同意",
    "description": "虚拟试穿或人脸扫描功能在未获得伊利诺伊州 BIPA 要求的知情书面同意的情况下收集生物识别标识符。违规行为每次扫描可处以 1,000–5,000 美元的法定损害赔偿。",
    "severity": "critical",
    "reference": "740 ILCS 14/15 (Illinois BIPA)"
  },
  {
    "id": 73,
    "code": "STATE-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "犹他州 AI 法案：AI 聊天机器人未披露 AI 身份",
    "description": "AI 驱动的聊天机器人或虚拟助手在用户直接询问时未能表明其为人工智能。犹他州 AI 政策法案要求 AI 系统在被询问时披露其非人类性质。",
    "severity": "serious",
    "reference": "Utah Code § 13-72 (Utah AI Policy Act 2024)"
  },
  {
    "id": 74,
    "code": "STATE-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CA BOT 法案：AI 使用人类名称而未披露",
    "description": "AI 聊天机器人或自动化账户使用人类名称、头像或角色，而未披露其非人类身份。加州 BOT 法案 (SB 1001) 要求在 AI 在线互动中冒充人类时进行明确披露。",
    "severity": "critical",
    "reference": "Cal. Bus. & Prof. Code § 17941 (SB 1001)"
  },
  {
    "id": 75,
    "code": "STATE-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "65 号提案：缺少有毒物质警告",
    "description": "运往加利福尼亚州的产品含有 65 号提案所列化学品，但未附带要求的“已知可致癌或生殖危害”警告。违规行为每天每项违规可处以 2,500 美元罚款。",
    "severity": "serious",
    "reference": "Cal. Health & Safety Code § 25249.6 (Proposition 65)"
  },
  {
    "id": 76,
    "code": "STATE-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CA 自动续订：年度收费前无提醒",
    "description": "年度订阅在收费前未发送提醒邮件。加州的《自动续订法》要求企业在每次续订前提供清晰的提醒和取消说明。",
    "severity": "serious",
    "reference": "Cal. Bus. & Prof. Code § 17601 (ARL)"
  },
  {
    "id": 77,
    "code": "STATE-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "受限产品的年龄验证不足",
    "description": "酒精、电子烟或CBD产品的年龄验证仅依赖简单的“我已满21岁”按钮，而无真实身份验证。多个州要求对受限产品销售进行超出自我声明的严格年龄验证。",
    "severity": "moderate",
    "reference": "State Alcohol Control Acts; 27 CFR § 6"
  },
  {
    "id": 78,
    "code": "STATE-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "SB 478：结账时隐藏服务费",
    "description": "强制性费用、服务费或附加费仅在结账时显示，而未包含在广告价格中。加州的SB 478（垃圾费禁令）禁止未提前披露的隐藏费用。",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1770(a)(29) (SB 478)"
  },
  {
    "id": 79,
    "code": "STATE-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "NY SHIELD法案：数据安全不足",
    "description": "企业在收集纽约居民的私人信息时，未实施SHIELD法案要求的合理数据安全保障措施。必须记录行政、技术和物理保障措施。",
    "severity": "moderate",
    "reference": "NY Gen. Bus. Law § 899-bb (SHIELD Act)"
  },
  {
    "id": 80,
    "code": "STATE-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "职位发布未包含薪资范围",
    "description": "职位列表未按加州、纽约、科罗拉多和华盛顿的薪资透明法要求包含薪酬范围。每条不合规的发布可处以高达10,000美元的罚款。",
    "severity": "advisory",
    "reference": "Cal. Lab. Code § 432.3; NY Lab. Law § 194-b; CO SB 19-085"
  },
  {
    "id": 81,
    "code": "FIN-001",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "GLBA：通过不安全电子邮件传输敏感财务文件",
    "description": "企业通过标准未加密电子邮件接受敏感财务文件（纳税申报表、银行对账单、SSN）。GLBA的保障规则要求金融机构为客户数据实施安全传输方法。",
    "severity": "critical",
    "reference": "16 CFR § 314 (GLBA Safeguards Rule)"
  },
  {
    "id": 82,
    "code": "FIN-002",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FinCEN BOI：缺少受益所有权报告",
    "description": "有限责任公司或公司未按《企业透明法》要求向FinCEN提交受益所有权信息报告。不合规将导致每日500美元的罚款，最高10,000美元，并可能承担刑事责任。",
    "severity": "critical",
    "reference": "31 U.S.C. § 5336; 31 CFR § 1010.380 (CTA/BOI)"
  },
  {
    "id": 83,
    "code": "FIN-003",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FINRA：投资通信使用个人电子邮件",
    "description": "投资顾问或经纪自营商使用个人Gmail或未存档的电子邮件进行客户通信，而非受监督、存档的企业电子邮件系统。FINRA要求保留和监督所有业务通信。",
    "severity": "critical",
    "reference": "FINRA Rule 3110; SEC Rule 17a-4"
  },
  {
    "id": 84,
    "code": "FIN-004",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "网站上缺少承包商执照号码",
    "description": "持牌承包商的网站未显示州承包商执照号码。大多数州要求在所有广告和商业通信中显示执照号码，罚款为2,000–5,000美元。",
    "severity": "serious",
    "reference": "Cal. Bus. & Prof. Code § 7030.5; State Contractor License Acts"
  },
  {
    "id": 85,
    "code": "FIN-005",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "无DMCA代理或删除政策",
    "description": "网站未在美国版权局注册DMCA代理，也未发布DMCA删除政策页面。没有这些，企业将失去用户生成内容的避风港保护。",
    "severity": "serious",
    "reference": "17 U.S.C. § 512(c)(2) (DMCA Safe Harbor)"
  },
  {
    "id": 86,
    "code": "FIN-006",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "服务条款中缺少仲裁条款",
    "description": "服务条款缺少集体诉讼豁免和强制仲裁条款。没有这些条款，企业将面临任何消费者纠纷的集体诉讼风险。",
    "severity": "serious",
    "reference": "9 U.S.C. § 2 (Federal Arbitration Act)"
  },
  {
    "id": 87,
    "code": "FIN-007",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "退货政策未显著展示",
    "description": "加州法律要求在销售点显著展示无退货或有限退货政策。如果未展示，消费者有权在30天内获得全额退款，无论商家的原定政策如何。",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1723"
  },
  {
    "id": 88,
    "code": "FIN-008",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "信用卡附加费未提前通知",
    "description": "信用卡附加费或便利费在结账时添加，但未在入口处提前通知。多个州要求提前标牌/披露，卡网络规则将附加费限制在3%以内并要求强制披露。",
    "severity": "moderate",
    "reference": "Visa Core Rules § 5.6.2; State Surcharge Statutes"
  },
  {
    "id": 89,
    "code": "FIN-009",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "投资顾问缺少SEC Form CRS",
    "description": "注册投资顾问的网站未按SEC最佳利益规定发布Form CRS（客户关系摘要）。Form CRS必须交付给零售投资者并公开可用。",
    "severity": "moderate",
    "reference": "SEC Rule 17a-14; Regulation Best Interest"
  },
  {
    "id": 90,
    "code": "FIN-010",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "保险线索生成缺少所需披露",
    "description": "网站生成保险报价或线索时，未提供州要求的关于服务性质、补偿安排和许可状态的披露。多个州要求保险线索生成器提供特定披露。",
    "severity": "advisory",
    "reference": "State Insurance Codes; NAIC Producer Licensing Model Act"
  },
  {
    "id": 91,
    "code": "OPS-001",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "缺少 DMARC 记录",
    "description": "该域名缺少 DMARC（Domain-based Message Authentication, Reporting & Conformance）DNS 记录。没有 DMARC，Gmail、Yahoo 和其他执行 DMARC 政策的主要提供商越来越会拒绝或将邮件归入垃圾邮件文件夹。",
    "severity": "critical",
    "reference": "RFC 7489; Google/Yahoo Sender Requirements 2024"
  },
  {
    "id": 92,
    "code": "OPS-002",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "缺少 SPF 记录",
    "description": "该域名没有 SPF（Sender Policy Framework）DNS 记录，使其容易受到电子邮件欺骗的攻击。攻击者可以发送看似来自该域名的电子邮件，从而对客户和合作伙伴发起网络钓鱼攻击。",
    "severity": "critical",
    "reference": "RFC 7208; Google Sender Guidelines 2024"
  },
  {
    "id": 93,
    "code": "OPS-003",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "指向过期域名的出站链接损坏",
    "description": "网站包含指向已过期、停放或潜在恶意域名的链接。损坏的出站链接会损害 SEO 权威，如果过期域名被恶意行为者重新注册，还可能将用户重定向到网络钓鱼或恶意软件站点。",
    "severity": "serious",
    "reference": "Google Search Quality Guidelines; OWASP Broken Link Hijacking"
  },
  {
    "id": 94,
    "code": "OPS-004",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "来自已停止服务的不活跃跟踪脚本",
    "description": "网站从已停止、被收购或废弃的服务加载 JavaScript。这些僵尸脚本会浪费页面加载时间，可能破坏功能，如果域名被重新注册，还会带来供应链安全风险。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; OWASP Supply Chain Security"
  },
  {
    "id": 95,
    "code": "OPS-005",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "缺少 DKIM 电子邮件身份验证",
    "description": "该域名未发布用于电子邮件身份验证的 DKIM（DomainKeys Identified Mail）记录。没有 DKIM，接收邮件服务器无法验证电子邮件内容在传输过程中是否被篡改，从而降低送达率。",
    "severity": "critical",
    "reference": "RFC 6376; Google/Yahoo Sender Requirements 2024"
  },
  {
    "id": 96,
    "code": "OPS-006",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "页脚版权年份过时",
    "description": "网站页脚显示过时的版权年份，向访问者、搜索引擎和潜在诉讼者表明该网站可能已被放弃或未维护。这会侵蚀信任，并可能对搜索排名产生负面影响。",
    "severity": "serious",
    "reference": "Google Search Quality Evaluator Guidelines § 4.5"
  },
  {
    "id": 97,
    "code": "OPS-007",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "缺少 robots.txt 和站点地图",
    "description": "网站缺少 robots.txt 文件和/或 XML 站点地图。没有这些，搜索引擎可能会低效地抓取网站、索引敏感页面或完全遗漏重要内容，直接影响有机搜索可见性。",
    "severity": "moderate",
    "reference": "RFC 9309 (robots.txt); Sitemaps.org Protocol"
  },
  {
    "id": 98,
    "code": "OPS-008",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "移动点击目标过小",
    "description": "交互元素（按钮、链接、表单字段）小于 48x48 CSS 像素或位置过于靠近，导致移动设备上频繁误触。这既是 UX 问题，也是 WCAG 2.5.5 可访问性违规。",
    "severity": "moderate",
    "reference": "WCAG 2.5.8; Google Mobile Usability Guidelines"
  },
  {
    "id": 99,
    "code": "OPS-009",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "联系表单无速率限制",
    "description": "联系表单没有速率限制、蜜罐或滥用预防机制。未受保护的表单经常被用于垃圾邮件注入、网络钓鱼中继和针对表单处理程序的拒绝服务攻击。",
    "severity": "moderate",
    "reference": "OWASP Automated Threats; PCI-DSS v4.0 Req. 6.2.4"
  },
  {
    "id": 100,
    "code": "OPS-010",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "缺少或过期的 SSL 证书",
    "description": "网站缺少有效的 SSL/TLS 证书或证书已过期。浏览器会显示突出的安全警告，赶走访问者，搜索引擎也会在排名中惩罚非 HTTPS 网站。",
    "severity": "advisory",
    "reference": "PCI-DSS v4.0 Req. 4.2.1; Google HTTPS Ranking Signal"
  },
  {
    "id": 101,
    "code": "ADA-101",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "产品/服务缺少无障碍信息",
    "description": "受EAA监管的数字服务未在其数字界面中提供清晰的无障碍信息和功能，违反了欧盟指令2019/882对电子商务和银行的要求。",
    "severity": "serious",
    "reference": "Directive (EU) 2019/882 Art. 4"
  },
  {
    "id": 102,
    "code": "ADA-102",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "公共反馈流程不合规",
    "description": "网站反馈机制对残障人士不可访问，违反了安大略省AODA客户服务标准。",
    "severity": "moderate",
    "reference": "AODA IASR Sec. 7"
  },
  {
    "id": 103,
    "code": "COP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "非法收集儿童个人信息",
    "description": "网站在未获得可验证的父母同意的情况下收集13岁以下用户的个人数据（姓名、电子邮件、跟踪Cookie），违反COPPA法规。",
    "severity": "critical",
    "reference": "16 CFR Part 312 (COPPA)"
  },
  {
    "id": 104,
    "code": "PIP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少强制性隐私官联系信息",
    "description": "针对加拿大的网站未公布负责PIPEDA合规的指定隐私官姓名或联系方式。",
    "severity": "moderate",
    "reference": "PIPEDA Schedule 1 Sec. 4.1"
  },
  {
    "id": 105,
    "code": "PIP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "个人数据收集目的不明确",
    "description": "表单字段在收集时或之前未明确说明收集的具体且有限目的，不符合PIPEDA要求。",
    "severity": "serious",
    "reference": "PIPEDA Schedule 1 Sec. 4.2"
  },
  {
    "id": 106,
    "code": "LGP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未任命数据保护官（DPO）",
    "description": "针对巴西的网站未在网站上标识或提供其DPO（Encarregado）的联系方式，违反LGPD第41条。",
    "severity": "serious",
    "reference": "LGPD Art. 41"
  },
  {
    "id": 107,
    "code": "LGP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少有效的处理法律依据",
    "description": "网站处理个人数据时未列出每项处理活动的明确法律依据（如同意、合法利益），不符合LGPD要求。",
    "severity": "critical",
    "reference": "LGPD Art. 7"
  },
  {
    "id": 108,
    "code": "POP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经选择同意的直接营销",
    "description": "网站为电子直接营销使用预选同意框或退出表单，违反南非消费者POPIA选择同意规定。",
    "severity": "critical",
    "reference": "POPIA Sec. 69"
  },
  {
    "id": 109,
    "code": "POP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "跨境数据传输披露不合法",
    "description": "南非网站向南非境外传输个人数据时，未确保接收国具备充分数据保护法律或向用户披露，违反规定。",
    "severity": "serious",
    "reference": "POPIA Sec. 72"
  },
  {
    "id": 110,
    "code": "APP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "海外数据披露声明不合规",
    "description": "针对澳大利亚的网站未在其隐私政策中说明是否可能向海外接收方披露个人信息以及具体国家。",
    "severity": "serious",
    "reference": "APP 1.4(g)"
  },
  {
    "id": 111,
    "code": "APP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少匿名/假名交互选项",
    "description": "网站在非实际或法律必要的情况下强制用户提供身份信息进行一般咨询，违反澳大利亚隐私原则2。",
    "severity": "moderate",
    "reference": "APP 2"
  },
  {
    "id": 112,
    "code": "PDP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未提供访问/更正请求信息",
    "description": "新加坡网站未在其隐私披露中说明用户如何请求访问或更正其个人数据。",
    "severity": "serious",
    "reference": "PDPA Sec. 21 & 22"
  },
  {
    "id": 113,
    "code": "PDP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "不合理条款强制个人数据同意",
    "description": "网站要求同意收集超出提供产品或服务合理范围的个人数据，违反PDPA同意要求。",
    "severity": "serious",
    "reference": "PDPA Sec. 14(2)"
  },
  {
    "id": 114,
    "code": "AIA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "生成式AI输出/深度伪造未标记",
    "description": "网站以机器可读格式呈现AI生成文本、音频或视频（深度伪造）时未进行AI生成标记，违反欧盟AI法案透明度规则。",
    "severity": "critical",
    "reference": "AI Act Art. 52(3)"
  },
  {
    "id": 115,
    "code": "AIA-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少AI用户交互披露",
    "description": "网站使用AI系统（如客户支持聊天机器人）与自然人交互时未告知其正在与AI交互，违反透明度要求。",
    "severity": "critical",
    "reference": "AI Act Art. 52(1)"
  },
  {
    "id": 116,
    "code": "DSA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "设计中使用欺骗性UI模式（暗黑模式）",
    "description": "网站采用扭曲或损害用户自主知情选择能力的暗黑模式（如难以取消订阅流程、欺骗性同意弹窗）。",
    "severity": "critical",
    "reference": "DSA Art. 25"
  },
  {
    "id": 117,
    "code": "DSA-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少当局单一联系点",
    "description": "数字服务提供商未发布与欧盟当局沟通的直接、电子且易于访问的单一联系点。",
    "severity": "serious",
    "reference": "DSA Art. 11"
  },
  {
    "id": 118,
    "code": "DMA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "跨服务非法数据组合",
    "description": "守门人规模平台在未经特定用户同意的情况下将其核心平台数据与其他服务数据组合，违反DMA法规。",
    "severity": "critical",
    "reference": "DMA Art. 5(2)"
  },
  {
    "id": 119,
    "code": "STA-101",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "欺骗性设计鼓励儿童数据共享",
    "description": "网站使用暗黑模式诱导儿童提供超出必要范围的个人信息，违反加州AB 2273要求。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 120,
    "code": "STA-102",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少消费者上诉权利流程",
    "description": "隐私政策未说明消费者对隐私权利请求拒绝结果提出上诉的流程，违反弗吉尼亚VCDPA和得克萨斯TDPSA。",
    "severity": "serious",
    "reference": "Va. Code § 59.1-573 / Tex. Bus. & Com. Code § 541.104"
  },
  {
    "id": 121,
    "code": "STA-103",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少敏感数据处理选择同意",
    "description": "网站在未获得科罗拉多或弗吉尼亚居民明确选择同意的情况下处理敏感个人数据（如精确地理位置、健康数据、种族信息）。",
    "severity": "critical",
    "reference": "Colo. Rev. Stat. § 6-1-1308 / Va. Code § 59.1-574"
  },
  {
    "id": 122,
    "code": "NYD-101",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少网络安全多因素身份验证（MFA）",
    "description": "金融服务网站未对企业电子邮件或客户门户数据库访问强制执行多因素身份验证，违反NY DFS要求。",
    "severity": "critical",
    "reference": "23 NYCRR Section 500.12"
  },
  {
    "id": 123,
    "code": "NYD-102",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未实施私人数据保护措施",
    "description": "针对纽约的网站未维护个人信息的行政、物理和技术保护措施，违反NY SHIELD法案。",
    "severity": "serious",
    "reference": "N.Y. Gen. Bus. Law § 899-bb"
  },
  {
    "id": 124,
    "code": "QBL-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "跨境传输缺少隐私影响评估（PIA）",
    "description": "网站向魁北克境外传输个人信息时未进行强制性隐私影响评估，违反第25号法律。",
    "severity": "serious",
    "reference": "Quebec Law 25 Sec. 17"
  },
  {
    "id": 125,
    "code": "DOR-101",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "ICT第三方风险披露不充分",
    "description": "金融实体未维护与其ICT第三方服务提供商合同安排的全面信息登记册，违反DORA指南。",
    "severity": "critical",
    "reference": "DORA Regulation Art. 28"
  },
  {
    "id": 126,
    "code": "VPPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "视频跟踪像素在未经VPPA同意的情况下触发",
    "description": "网站在嵌入视频内容（HTML5视频、YouTube、Vimeo iframe）的同时嵌入Meta Pixel、Google Analytics或其他跟踪像素，这些像素会在未获得单独、明确书面同意的情况下将视频观看数据传输给第三方。根据VPPA，未经事先同意而故意披露与视频观看习惯相关联的消费者PII属于违规行为。",
    "severity": "critical",
    "reference": "18 U.S.C. § 2710 (VPPA)"
  },
  {
    "id": 127,
    "code": "EAA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "未根据欧洲无障碍法案发布无障碍声明",
    "description": "面向欧盟消费者的电子商务或数字服务网站缺少公开可访问的无障碍声明，该声明应说明与EN 301 549 / WCAG 2.1 AA的一致性状态。欧洲无障碍法案（指令2019/882）自2025年6月28日起强制执行，要求提供覆盖服务的私营企业发布无障碍声明。",
    "severity": "serious",
    "reference": "EU Directive 2019/882 (EAA), Art. 14"
  },
  {
    "id": 128,
    "code": "NIS2-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺少security.txt或漏洞披露政策（NIS2）",
    "description": "能源、卫生、交通、数字基础设施等关键或重要实体的网站缺少/.well-known/security.txt文件或任何公开可访问的漏洞披露政策。NIS2指令要求覆盖实体实施事件处理和漏洞管理措施。",
    "severity": "moderate",
    "reference": "EU Directive 2022/2555 (NIS2), Art. 21(2)(b)"
  },
  {
    "id": 129,
    "code": "HBNR-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "健康数据共享未遵守FTC健康数据泄露通知规则",
    "description": "非HIPAA健康网站或应用（健康、健身、症状检查器）收集可识别的健康信息，并将其传输给第三方分析/广告平台，但未显示泄露通知政策。FTC健康数据泄露通知规则（2024年7月修订）将未经授权共享健康数据视为泄露。",
    "severity": "critical",
    "reference": "16 CFR Part 318 (FTC Health Breach Notification Rule, 2024)"
  },
  {
    "id": 130,
    "code": "CKWL-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cookie墙在无有效拒绝选项的情况下阻止访问",
    "description": "网站显示Cookie同意横幅，在接受Cookie之前阻止所有内容访问，且没有有效的拒绝选项。",
    "severity": "serious",
    "reference": "GDPR Art. 7(4); ePrivacy Directive Art. 5(3); EDPB Opinion 08/2024"
  },
  {
    "id": 131,
    "code": "CTDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未获得选择加入同意即使用未成年人的数据进行定向广告（CTDPA）",
    "description": "网站面向未成年人（18岁以下）提供内容或收集表明未成年用户存在的数据，但继续触发定向广告像素而未获得明确的选择加入同意。康涅狄格州SB 3（修订CTDPA）禁止在未获得明确同意的情况下处理未成年人的数据用于定向广告或画像。",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3), amending CTDPA §§ 42-520"
  },
  {
    "id": 132,
    "code": "OCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "网站未响应全球隐私控制信号（俄勒冈州CPA）",
    "description": "面向俄勒冈州消费者的网站未检测或响应全球隐私控制（GPC）浏览器信号，将其作为针对定向广告和个人数据销售的有效退出请求。俄勒冈州消费者隐私法要求自2026年1月1日起识别通用退出偏好信号。",
    "severity": "serious",
    "reference": "ORS 646A.570–646A.589 (Oregon Consumer Privacy Act)"
  },
  {
    "id": 133,
    "code": "COAI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "高风险AI系统缺少公开透明度披露（科罗拉多州AI法案）",
    "description": "网站使用AI驱动系统进行后果性决策（招聘、贷款、保险、住房），但缺少公开可访问的声明，披露部署了哪些高风险AI系统以及如何管理算法歧视风险。科罗拉多州SB 24-205要求部署者维护此类披露。",
    "severity": "moderate",
    "reference": "Colorado SB 24-205 (Colorado AI Act), §§ 6-1-1701"
  },
  {
    "id": 134,
    "code": "JPAP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Cookie数据在未进行日本APPI披露的情况下与第三方共享",
    "description": "面向日本用户的网站将Cookie/跟踪数据传输给第三方广告或分析供应商，这些供应商可将其合并以识别个人，但未披露这些传输或确认第三方同意。日本APPI和电信业务法要求对此类传输保持透明并确认同意。",
    "severity": "serious",
    "reference": "Japan APPI (Act No. 57 of 2003, amended 2022), Art. 31; Telecom Business Act, Art. 27-12"
  },
  {
    "id": 135,
    "code": "KRPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "面向韩国用户在获得同意前设置非必要Cookie",
    "description": "面向韩国用户的网站在获得明确、知情同意前设置跟踪或广告Cookie。韩国PIPA要求在收集包括行为跟踪数据在内的个人信息前获得事先选择加入同意。违规可处以最高3%的总收入罚款。",
    "severity": "serious",
    "reference": "South Korea PIPA, Art. 15, Art. 17"
  },
  {
    "id": 136,
    "code": "FERP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "教育网站跟踪像素传输学生数据",
    "description": "教育机构网站在面向学生的页面（门户、报名表、课程目录）嵌入Meta Pixel、Google Analytics或类似跟踪技术，这些技术将可能可识别的学生数据传输给第三方。FERPA禁止未经授权披露教育记录中的PII。",
    "severity": "critical",
    "reference": "20 U.S.C. § 1232g (FERPA); 34 CFR Part 99"
  },
  {
    "id": 137,
    "code": "ESIG-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "电子签名同意流程缺少ESIGN法案要求的披露",
    "description": "网站使用电子签名或协议进行交易，但未能提供要求的预同意披露，包括：接收纸质副本的权利、撤回同意的权利及程序，以及访问记录所需的硬件/软件要求。",
    "severity": "moderate",
    "reference": "15 U.S.C. §§ 7001–7006 (E-SIGN Act), § 7001(c)"
  },
  {
    "id": 138,
    "code": "IDDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "隐私声明未提供印度DPDP法案要求的语言版本",
    "description": "从印度用户收集个人数据的网站未按2023年数字个人数据保护法要求提供英语及至少22种印度计划语言之一的隐私声明。该声明必须包含收集的数据、目的和用户权利的逐项描述。",
    "severity": "moderate",
    "reference": "India DPDP Act 2023 (Act No. 22 of 2023), Sections 5–6"
  },
  {
    "id": 139,
    "code": "FACT-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "电子收据上显示完整信用卡号（FACTA违规）",
    "description": "网站在电子订单确认、收据或账户页面上显示信用卡/借记卡号超过最后五位数字，或显示有效期。FACTA要求将卡号截断为不超过五位数字，并禁止在电子打印收据上打印有效期。",
    "severity": "critical",
    "reference": "15 U.S.C. § 1681c(g) (FACTA, § 113)"
  },
  {
    "id": 140,
    "code": "DLDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未为特拉华州消费者提供明确的退出机制（DPDPA）",
    "description": "面向特拉华州消费者的网站缺少针对定向广告和个人数据销售的清晰、显著的退出链接，或未能识别通用退出信号（GPC）。特拉华州个人数据隐私法（2025年1月1日起生效）要求同时提供这两种机制。",
    "severity": "serious",
    "reference": "Delaware DPDPA (HB 154, Chapter 12C, Title 6)"
  },
  {
    "id": 141,
    "code": "THPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "在未获得选择加入同意的情况下触发非必要Cookie（泰国PDPA）",
    "description": "面向泰国用户的网站在通过合规同意横幅获得明确选择加入同意前触发非必要Cookie（分析、广告、社交）。泰国PDPA要求在处理包括Cookie在内的个人数据前获得明确、主动的选择加入同意。预选框明确不合规。",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562 (2019), Sections 19, 23"
  },
  {
    "id": 142,
    "code": "SEC-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "SEC注册人缺少网络安全治理披露",
    "description": "SEC报告的上市公司网站未包含或链接到网络安全风险管理披露（董事会监督、管理专业知识、风险评估流程），而这是10-K备案所要求的。公司网站必须引用或链接这些披露以符合投资者关系合规要求。",
    "severity": "moderate",
    "reference": "SEC Final Rule 33-11216 (2023); Regulation S-K, Item 106"
  },
  {
    "id": 143,
    "code": "TRKV-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少数据控制者注册通知（土耳其KVKK）",
    "description": "处理土耳其居民个人数据的网站未披露数据控制者的身份、VERBIS（数据控制者登记处）注册号，或提供符合KVKK要求的隐私声明，说明处理目的、第三方传输和数据主体权利。",
    "severity": "serious",
    "reference": "Turkey Law No. 6698 (KVKK), Art. 10, Art. 16"
  },
  {
    "id": 144,
    "code": "NZPR-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "跨境数据传输未遵守新西兰隐私法IPP 12",
    "description": "网站从新西兰用户收集个人数据并传输到海外（通过美国/欧盟跟踪脚本证明），但未在隐私政策中披露数据可能被传输到海外以及根据信息隐私原则12采取的保障措施。",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 12"
  },
  {
    "id": 145,
    "code": "MNDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "隐私声明缺少明尼苏达州MCDPA要求的数据保留期限",
    "description": "面向明尼苏达州消费者的网站隐私政策未披露所收集个人数据的数据保留期限或政策。明尼苏达州消费者数据隐私法（2025年7月31日起生效）特别要求在隐私声明中披露保留政策。",
    "severity": "moderate",
    "reference": "Minnesota MCDPA (HF 2309), § 325O"
  },
  {
    "id": 146,
    "code": "EIDS-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "超大型在线平台未准备好接受EUDI钱包",
    "description": "要求对登录、年龄验证或KYC进行强客户身份验证的超大型在线平台（VLOP）不支持或未表明准备接受欧盟数字身份钱包。eIDAS 2.0要求VLOP在2027年12月前接受EUDI钱包。",
    "severity": "advisory",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 12b"
  },
  {
    "id": 147,
    "code": "AMLK-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "金融网站缺少AML/KYC客户识别通知",
    "description": "在线开设账户的金融机构、金融科技或货币服务业务网站未显示要求的客户通知，说明正在收集个人信息以遵守联邦身份验证（CIP）要求（根据USA PATRIOT Act/BSA）。",
    "severity": "serious",
    "reference": "31 U.S.C. § 5318(l); 31 CFR § 1020.220(a)(5) (BSA/PATRIOT Act CIP)"
  },
  {
    "id": 148,
    "code": "CTHL-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在健康设施附近使用地理围栏进行数据收集（CT SB 3）",
    "description": "网站或关联移动应用在精神、生殖或性健康设施1750英尺范围内使用地理围栏技术，以识别、跟踪或向消费者发送推送通知，用于健康数据收集目的。康涅狄格州SB 3明确禁止此做法。",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3), § 4(d)"
  },
  {
    "id": 149,
    "code": "IDDG-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "印度数据主体缺少申诉救济机制",
    "description": "从印度用户收集个人数据的网站未提供指定申诉官员的联系方式或数据主体的投诉机制。印度DPDP法案2023要求数据受托人在其网站上建立可访问的申诉救济机制。",
    "severity": "moderate",
    "reference": "India DPDP Act 2023, Section 8(10); IT Act 2000, Rule 5(9)"
  },
  {
    "id": 150,
    "code": "CBAC-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cookie同意横幅使用不对称的接受/拒绝设计",
    "description": "网站的Cookie同意横幅使接受选项比拒绝选项更突出或更容易选择，从而破坏同意的自由性质。",
    "severity": "serious",
    "reference": "GDPR Art. 7(4), Art. 4(11); ePrivacy Art. 5(3); CNIL Deliberation 2023-010"
  },
  {
    "id": 151,
    "code": "CUBI-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经事先通知和同意收集生物识别信息 (Texas CUBI)",
    "description": "网站在未事先通知个人且未获得其明确同意的情况下，收集生物识别标识符（例如虚拟试穿或照片中的面部几何扫描，或声纹），违反了德克萨斯州 CUBI 法案。",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 503.001"
  },
  {
    "id": 152,
    "code": "EUAI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "AI 生成内容中缺少机器可读的元数据/水印 (EU AI Act)",
    "description": "生成或操纵图像、音频或视频内容（合成内容/深度伪造）的 AI 系统提供商必须确保输出以机器可读格式进行标记，并根据欧盟 AI 法案可被检测为人工生成或操纵。",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(3)"
  },
  {
    "id": 153,
    "code": "QC25-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "网站上缺少数据保护官 (DPO) 联系方式 (Quebec Act 25)",
    "description": "收集魁北克居民个人信息的网站未在网站上公布负责保护个人信息的人员（DPO/负责人）的职务 and 联系方式，违反了魁北克第 25 号法案第 3.1 条。",
    "severity": "serious",
    "reference": "Quebec Act respecting the protection of personal information in the private sector (Act 25), Section 3.1 & 60.1"
  },
  {
    "id": 154,
    "code": "COPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未能识别全球隐私控制 (GPC) 选择退出信号 (Colorado CPA)",
    "description": "针对科罗拉多州消费者的网站未能识别并处理全球隐私控制 (GPC) 通用选择退出信号，以自动让用户退出出于针对性广告目的的数据处理或销售（自 2024 年 7 月 1 日起强制执行）。",
    "severity": "serious",
    "reference": "4 CCR 904-3 (Colorado Privacy Act Rules), Rule 5.05 & 5.06"
  },
  {
    "id": 155,
    "code": "MHMDA-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "首页缺少消费者健康隐私政策链接 (WA MHMDA)",
    "description": "收集消费者健康数据（例如搜索症状、生殖健康追踪器、健身注册）的网站未在其首页页脚或页眉显示标题为 \"Consumer Health Privacy Policy\" 的独立、明显链接，违反了华盛顿州 MHMDA 的要求。",
    "severity": "critical",
    "reference": "RCW 19.373.030(1)(a) (Washington MHMDA)"
  },
  {
    "id": 156,
    "code": "CNPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "处理敏感个人信息缺少单独同意 (China PIPL)",
    "description": "针对中国居民的网站在收集敏感个人信息（例如金融账户、医疗记录、生物识别或精确位置）时，未针对每类敏感数据获得单独、具体的同意，违反了《个人信息保护法》第 29 条。",
    "severity": "critical",
    "reference": "China Personal Information Protection Law (PIPL), Article 29 & 66"
  },
  {
    "id": 157,
    "code": "DSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "用户界面中的暗黑模式/操纵性设计 (EU DSA Article 25)",
    "description": "网站使用欺骗性设计技术或暗黑模式，歪曲、损害或操纵用户做出自由和知情决定的能力（例如，取消订阅的难度明显高于注册），违反了欧盟《数字服务法》(DSA) 第 25 条。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (Digital Services Act), Article 25"
  },
  {
    "id": 158,
    "code": "KRPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "第三方数据传输同意捆绑 (South Korea PIPA)",
    "description": "网站收集韩国居民的个人数据并与第三方（如广告网络、CRM 或分析工具）共享，但将第三方传输协议与一般隐私政策或服务条款捆绑在一起，而不是获得单独同意，违反了韩国 PIPA 第 17 条。",
    "severity": "serious",
    "reference": "Personal Information Protection Act of South Korea (PIPA), Article 15, 17 & 75"
  },
  {
    "id": 159,
    "code": "UKOSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "受监管内容年龄验证不足 (UK OSA)",
    "description": "网站发布对儿童有害的内容（如成人内容、赌博或高度敏感的暴力内容），但未实施严格的年龄验证，而是依赖简单的 \"我已满18岁\" 点击式年龄门槛，违反了英国《在线安全法》。",
    "severity": "critical",
    "reference": "UK Online Safety Act 2023, Sections 11 & 12"
  },
  {
    "id": 160,
    "code": "EUAI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少情绪识别/生物识别分类披露 (EU AI Act)",
    "description": "情绪识别系统或生物识别分类系统的提供商或部署者必须向暴露于该系统的自然人告知该系统的运行情况，违反了欧盟 AI 法案第 52(2) 条规定的透明度义务。",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(2)"
  },
  {
    "id": 161,
    "code": "CAAD-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未成年用户默认启用地理定位 (CA AADC)",
    "description": "可能被未成年人访问的网站默认未禁用精确的地理定位跟踪，违反了加利福尼亚州《适龄设计规范法案》。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(5)"
  },
  {
    "id": 162,
    "code": "BIPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少生物识别保留和销毁政策 (BIPA)",
    "description": "收集或使用生物识别数据（虚拟试穿、身份验证）的网站未能发布伊利诺伊州 BIPA 授权的公开保留时间表和销毁指南。",
    "severity": "critical",
    "reference": "740 ILCS 14/15(a)"
  },
  {
    "id": 163,
    "code": "ORPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "处理敏感数据缺少同意 (Oregon OCPA)",
    "description": "针对俄勒冈州消费者的网站在未经事先主动同意的情况下处理敏感数据，违反了俄勒冈州《消费者隐私法》。",
    "severity": "serious",
    "reference": "Or. Rev. Stat. § 646A (OCPA)"
  },
  {
    "id": 164,
    "code": "VCDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "医疗设施周围的地理围栏数据收集 (VCDPA)",
    "description": "网站或应用在任何医疗设施 1750 英尺范围内使用地理围栏来跟踪、识别或定位消费者以收集健康数据，这在弗吉尼亚州经修订的 VCDPA 下是被禁止的。",
    "severity": "critical",
    "reference": "Va. Code § 59.1-574 (VCDPA)"
  },
  {
    "id": 165,
    "code": "TDPS-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "敏感数据同意违规 (Texas TDPSA)",
    "description": "针对德克萨斯州消费者的网站在未获得德克萨斯州《数据隐私和安全法案》规定的明确事先选择性同意的情况下，收集敏感个人数据（包括生物识别或基因标识符）。",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 541.101"
  },
  {
    "id": 166,
    "code": "MTDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少 13 岁以下未成年人父母同意验证 (Montana MCDPA)",
    "description": "根据蒙大拿州《消费者数据隐私法》，针对蒙大拿州消费者的网站在未获得可验证的父母同意的情况下，收集 13 岁以下未成年人的个人数据。",
    "severity": "critical",
    "reference": "Mont. Code Ann. § 30-14"
  },
  {
    "id": 167,
    "code": "FDBR-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未能披露人脸识别监控 (Florida FDBR)",
    "description": "根据《佛罗里达州数字权利法案》的要求，网站或相关 Web 应用程序使用主动人脸识别或监控软件，但未提供清晰、显著的前端通知并获得选择性同意。",
    "severity": "serious",
    "reference": "Fla. Stat. § 501.71 (FDBR)"
  },
  {
    "id": 168,
    "code": "NJPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少儿童数据隐私披露 (New Jersey Privacy Act)",
    "description": "针对新泽西州消费者的网站收集未成年人（18 岁以下）的数据，但未提供详细说明特定处理和共享政策的、要求更高的隐私通知。",
    "severity": "serious",
    "reference": "N.J. Stat. Ann. 56:8-1"
  },
  {
    "id": 169,
    "code": "NEDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "消费者画像通知不充分 (Nebraska NDPA)",
    "description": "针对内布拉斯加州消费者的网站在就业、金融或住房方面使用自动决策或画像，但未在其隐私通知中披露画像逻辑。",
    "severity": "moderate",
    "reference": "Neb. Rev. Stat. § 87-301 (NDPA)"
  },
  {
    "id": 170,
    "code": "NHPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少直接营销选择退出链接 (New Hampshire Privacy Act)",
    "description": "针对新罕布什尔州消费者的网站未能在其首页提供易于访问的针对性广告或个人数据销售选择退出链接，违反了新罕布什尔州《隐私法案》。",
    "severity": "serious",
    "reference": "N.H. Rev. Stat. § 507-H"
  },
  {
    "id": 171,
    "code": "GDPR-011",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "数据可携性请求格式不可访问 (GDPR)",
    "description": "网站的数据下载工具以专有或非结构化格式（如 PDF 报告）输出个人数据，而不是 GDPR 要求的结构化、常用且机器可读的格式（如 JSON 或 CSV）。",
    "severity": "moderate",
    "reference": "GDPR Article 20"
  },
  {
    "id": 172,
    "code": "GDPR-012",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "非分层隐私政策信息结构 (GDPR)",
    "description": "网站显示单一、密集、难以导航的文本块隐私政策，而没有采用多层、标签或可展开的设计结构来确保透明度和可读性。",
    "severity": "moderate",
    "reference": "GDPR Article 12(1)"
  },
  {
    "id": 173,
    "code": "DSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少广告存储库和透明度日志 (EU DSA)",
    "description": "向欧盟用户展示广告的在线平台未能提供包含搜索过滤器、广告主身份和定位参数的公开可访问广告库，违反了 DSA 第 39 条。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 39"
  },
  {
    "id": 174,
    "code": "DSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少官方单一联络点 (EU DSA)",
    "description": "针对欧盟用户的数字平台未能公布专门且易于访问的电子邮件地址和沟通渠道，以便与欧盟机构直接联系，违反了 DSA 第 11 条。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 11"
  },
  {
    "id": 175,
    "code": "DMA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "强行捆绑守门人平台数据 (EU DMA)",
    "description": "作为守门人的在线平台在未获得用户明确、单独同意的情况下，将从核心平台服务收集的个人数据与其他服务的数据进行捆绑，违反了 DMA 第 5(2) 条。",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/1925 (DMA), Art. 5(2)"
  },
  {
    "id": 176,
    "code": "EUDAT-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "智能合约缺少停用功能 (EU Data Act)",
    "description": "管理智能合约或物联网系统的 Web 面板未能提供安全、授权停用和终止智能合约的机制，违反了欧盟《数据法案》第 30 条。",
    "severity": "serious",
    "reference": "Regulation (EU) 2023/2854 (Data Act), Art. 30"
  },
  {
    "id": 177,
    "code": "GDPR-013",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少同意状态记录和审计跟踪 (GDPR)",
    "description": "收集个人数据的网站未能记录、登记和维护 Cookie 同意协议的确切时间戳、同意版本和用户行为的审计跟踪，违反了 GDPR 第 7(1) 条。",
    "severity": "serious",
    "reference": "GDPR Article 7(1)"
  },
  {
    "id": 178,
    "code": "EPRIV-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "同意前执行 Cookie 和跟踪器 (ePrivacy)",
    "description": "在用户与 Cookie 同意横幅交互之前，网站就运行了非必要的分析或广告跟踪脚本（例如 Google Analytics、Meta Pixel），违反了 ePrivacy 指令。",
    "severity": "critical",
    "reference": "Directive 2002/58/EC (ePrivacy), Art. 5(3)"
  },
  {
    "id": 179,
    "code": "DORA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少运营韧性披露 (EU DORA)",
    "description": "金融实体或关键第三方服务商的网站未能披露网络安全运营风险管理框架和紧急联络途径，违反了 DORA 第 30 条。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30"
  },
  {
    "id": 180,
    "code": "GDPR-014",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "隐私声明中缺少数据保留期限 (GDPR)",
    "description": "隐私政策未能指定具体的数据保留期限或用于确定不同类别个人数据保留期限的的标准，违反了 GDPR 透明度原则。",
    "severity": "moderate",
    "reference": "GDPR Article 13(2)(a)"
  },
  {
    "id": 181,
    "code": "AUPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "数据销毁标准违规 (Australia Privacy Act)",
    "description": "保存澳大利亚居民个人数据的网站未能实施自动脚本或计划，以永久去标识化或销毁不再需要的数据，违反了 APP 11.2。",
    "severity": "serious",
    "reference": "Australian Privacy Act 1988, APP 11.2"
  },
  {
    "id": 182,
    "code": "SGPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少撤回同意机制 (Singapore PDPA)",
    "description": "收集新加坡居民数据的网站未能提供易于访问的的在线工具或表单，允许用户撤回对营销或数据处理的同意，违反了新加坡 PDPA。",
    "severity": "serious",
    "reference": "Singapore PDPA 2012, Sec. 16"
  },
  {
    "id": 183,
    "code": "SGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "数据保护官联系方式未公开 (Singapore PDPA)",
    "description": "针对新加坡用户的网站未能公布指定的的敏感数据保护官的联系信息（如直接电子邮件地址），违反了新加坡 PDPA 第 20 条。",
    "severity": "moderate",
    "reference": "Singapore PDPA 2012, Sec. 20"
  },
  {
    "id": 184,
    "code": "DPDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少提名代表权利通知 (India DPDP Act)",
    "description": "针对印度居民的网站未在其隐私政策中告知用户，在死亡或丧失行为能力的情况下，他们有权提名任何其他个人代表他们行事，违反了 DPDP 法案第 14 条。",
    "severity": "moderate",
    "reference": "India DPDP Act 2023, Section 14"
  },
  {
    "id": 185,
    "code": "DPDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少同意管理器接口集成 (India DPDP Act)",
    "description": "网站未能支持或链接到授权的“同意管理器”，以允许印度数据主体通过自动化门户给予、管理、查看和撤回同意，违反了 DPDP 法案第 6(7) 条。",
    "severity": "serious",
    "reference": "India DPDP Act 2023, Section 6(7)"
  },
  {
    "id": 186,
    "code": "JPAP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少处理匿名化数据披露 (Japan APPI)",
    "description": "利用日本居民匿名化数据的网站未能公布匿名化数据中包含的个人信息项目以及所采取的的安全措施，违反了 APPI 第 36 条。",
    "severity": "serious",
    "reference": "Japan APPI, Article 36"
  },
  {
    "id": 187,
    "code": "NZPR-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少隐私官联系链接 (New Zealand Privacy Act)",
    "description": "网站收集新西兰居民的数据，但未能展示其指定隐私官的联系方式，违反了新西兰《隐私法案》第 201 条。",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, Sec. 201"
  },
  {
    "id": 188,
    "code": "THPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "同意流程中缺少 DPO 联系详情 (Thailand PDPA)",
    "description": "网站收集泰国居民的个人数据，但未能在其同意横幅或政策中提供数据保护官或代表的联系方式，违反了泰国 PDPA 第 42 条。",
    "severity": "moderate",
    "reference": "Thailand PDPA B.E. 2562, Section 42"
  },
  {
    "id": 189,
    "code": "VNDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "敏感数据缺少本地数据保护官 (Vietnam Decree 13)",
    "description": "收集越南居民敏感个人数据（如位置、健康、财务）的网站未能按照第 13 号法令的要求设立本地数据保护部门或任命 DPO。",
    "severity": "serious",
    "reference": "Vietnam Decree 13/2023/ND-CP, Art. 28"
  },
  {
    "id": 190,
    "code": "PHDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "画像和自动决策的捆绑同意 (Philippines DPA)",
    "description": "网站收集菲律宾居民的数据并进行自动画像或决策，但未获得单独的明确同意，违反了菲律宾《数据隐私法案》。",
    "severity": "serious",
    "reference": "Philippines Data Privacy Act of 2012, Sec. 12"
  },
  {
    "id": 191,
    "code": "LGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少数据主体权利门户链接 (Brazil LGPD)",
    "description": "网站未能在其主页上显示清晰、独立的链接，以允许巴西居民直接提交访问、更正、删除或匿名化其个人数据的请求，违反了 LGPD 第 18 条。",
    "severity": "serious",
    "reference": "Brazil LGPD, Article 18"
  },
  {
    "id": 192,
    "code": "POPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "处理信用数据缺少事先授权 (South Africa POPIA)",
    "description": "针对南非居民的金融或信用评估服务的网站在未获得事先注册或授权的情况下处理消费者信用报告或历史，违反了 POPIA 第 57 条。",
    "severity": "serious",
    "reference": "South Africa POPIA 2013, Section 57"
  },
  {
    "id": 193,
    "code": "SAPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "直接营销缺少选择性同意 (Saudi Arabia PDPL)",
    "description": "针对沙特阿拉伯居民的网站在未获得事先明确选择性同意的情况下，发送促销信息或出于广告目的跟踪行为，违反了 PDPL 第 28 条。",
    "severity": "serious",
    "reference": "Saudi PDPL, Article 28"
  },
  {
    "id": 194,
    "code": "ILPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未能披露数据库注册状态 (Israel Privacy Act)",
    "description": "收集以色列居民个人数据的网站未能说明数据库是否已向数据库注册机构注册、注册号以及数据收集的目的，违反了以色列《隐私保护法》。",
    "severity": "moderate",
    "reference": "Israel Privacy Protection Act 1981, Sec. 8"
  },
  {
    "id": 195,
    "code": "DIFC-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "直接营销缺少单独同意 (Dubai DIFC)",
    "description": "在 DIFC 管辖区下运营的网站收集个人数据，并将营销或画像同意与一般条款捆绑在一起，违反了 DIFC 《数据保护法》第 12 条。",
    "severity": "serious",
    "reference": "DIFC Law No. 5 of 2020, Art. 12"
  },
  {
    "id": 196,
    "code": "NDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少跨境数据传输披露 (Nigeria NDPA)",
    "description": "收集尼日利亚居民数据的网站在未披露目标国家并验证充分性的情况下，将数据传输到国外服务器（例如美国/欧盟分析引擎），违反了尼日利亚《数据保护法》。",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act 2023, Sec. 42"
  },
  {
    "id": 197,
    "code": "KEDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经授权跨境传输健康数据 (Kenya DPA)",
    "description": "网站收集肯尼亚居民的敏感健康或医疗记录，并在未获得明确批准和同意的情况下将其存储在肯尼亚境外的服务器上，违反了肯尼亚 DPA 第 50 条。",
    "severity": "critical",
    "reference": "Kenya Data Protection Act 2019, Sec. 50"
  },
  {
    "id": 198,
    "code": "EGDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少电子营销信息许可 (Egypt DPA)",
    "description": "针对埃及用户的网站在未从数据保护中心获得必要的电子营销许可证的情况下，发送促销电子邮件或短信，违反了埃及第 151 号法律。",
    "severity": "serious",
    "reference": "Egypt Law No. 151 of 2020, Art. 13"
  },
  {
    "id": 199,
    "code": "MRDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经授权的国际数据传输 (Morocco Law 09-08)",
    "description": "网站收集摩洛哥居民的个人数据并在未获得 CNDP 事先书面授权的情况下将其传输到摩洛哥境外，违反了摩洛哥第 09-08 号法律。",
    "severity": "serious",
    "reference": "Morocco Law 09-08, Art. 43"
  },
  {
    "id": 200,
    "code": "LGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "安全标准披露不充分 (Brazil LGPD)",
    "description": "收集个人数据的网站未能披露为保护用户数据而部署的的具体管理和技术安全措施，违反了 LGPD 第 46 条规定的透明度授权。",
    "severity": "serious",
    "reference": "Brazil LGPD, Art. 46"
  },
  {
    "id": 201,
    "code": "FTCS-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "金融客户信息传输不安全 (FTC Safeguards)",
    "description": "针对消费者的金融科技或金融门户网站通过未加密的渠道传输客户数据，或者未能强制在所有登录和 API 接口上使用 HTTPS，违反了 FTC《保障措施规则》。",
    "severity": "critical",
    "reference": "16 CFR Part 314, Sec 314.4(c)"
  },
  {
    "id": 202,
    "code": "GLBA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少隐私通知送达链接 (GLBA)",
    "description": "金融服务网站未能在其所有账户管理或客户引导页面上提供指向其年度《格兰姆-里奇-布莱里法案》(GLBA) 隐私通知的清晰、显眼链接，违反了 FTC GLBA 规定。",
    "severity": "serious",
    "reference": "16 CFR Part 313 (GLBA Privacy Rule)"
  },
  {
    "id": 203,
    "code": "CTAC-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少公司透明度披露 (CTA)",
    "description": "公司网站未能根据《公司透明度法案》的合规要求，提及或展示所需的实益拥有权报告通知或备案确认。",
    "severity": "moderate",
    "reference": "31 U.S.C. § 5336 (CTA)"
  },
  {
    "id": 204,
    "code": "SEC-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少电子记录归档验证 (SEC Rule 17a-4)",
    "description": "自营商或金融投资门户网站未披露或链接到其电子记录归档系统（符合 WORM 存储标准），违反了 SEC 的记录保存规定。",
    "severity": "serious",
    "reference": "17 CFR § 240.17a-4"
  },
  {
    "id": 205,
    "code": "DORA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 ICT 风险管理系统披露 (EU DORA)",
    "description": "欧盟金融实体或服务的网站未能展示网络安全认证或概述数字运营韧性机制的披露，违反了 DORA 第 6 条。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 6"
  },
  {
    "id": 206,
    "code": "FTCR-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "缺少身份盗用防范披露 (FTC Red Flags)",
    "description": "债权人或金融公用事业门户网站未能在账户注册过程中展示或链接到其身份盗用防范计划 (ITPP) 或显示主动的身份验证步骤，违反了 FTC《红旗规则》。",
    "severity": "serious",
    "reference": "16 CFR § 681.1"
  },
  {
    "id": 207,
    "code": "FINRA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 BrokerCheck 链接及监管披露 (FINRA)",
    "description": "投资顾问或自营商网站未能在其首页和个人资料页面上显示指向 FINRA BrokerCheck 工具的直接、显著链接，违反了 FINRA 规则 2210。",
    "severity": "serious",
    "reference": "FINRA Rule 2210(d)"
  },
  {
    "id": 208,
    "code": "PCI-011",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "结账页面上未经监控的第三方脚本 (PCI-DSS v4.0)",
    "description": "支付结账页面在未采用脚本完整性控制、CSP 限制或显式加载授权的情况下执行第三方脚本（如在线聊天、分析），违反了 PCI-DSS 要求 6.4.3。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.3"
  },
  {
    "id": 209,
    "code": "PCI-012",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "支付网关上缺少子资源完整性 (SRI) (PCI-DSS v4.0)",
    "description": "网站在引入外部 CDN 或第三方网关的支付表单或脚本时未利用子资源完整性 (SRI) 哈希，导致支付面临表单劫持的风险，违反了 PCI-DSS 要求 11.6.1。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 11.6.1"
  },
  {
    "id": 210,
    "code": "TILA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "贷款广告中 APR 披露不显著 (TILA)",
    "description": "广告信贷或贷款选项的网站在说明财务费率或促销费用时，未在费率旁显著披露年百分率 (APR)，违反了《贷款诚实法案》Z 条例。",
    "severity": "serious",
    "reference": "12 CFR Part 1026 (Regulation Z)"
  },
  {
    "id": 211,
    "code": "FTCD-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "操纵性取消流程/蟑螂旅馆 (FTC Section 5)",
    "description": "网站使用暗黑模式使订阅取消变得非常困难，与一键注册流程相比，需要多次打电话或复杂的导航路径。",
    "severity": "serious",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 212,
    "code": "FTCD-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "欺骗性紧迫感和虚假倒计时器 (FTC Section 5)",
    "description": "网站显示倒计时器或动态文本，声称库存不足、需求量大或限时交易，而这些都是合成的，并不反映真实的交易指标，以此欺骗消费者。",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 213,
    "code": "FTCD-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "确认羞辱式选择退出弹窗 (FTC Section 5)",
    "description": "网站显示营销或订阅选择退出选项，其中拒绝按钮使用情感操纵性语言（如“不，谢谢，我讨厌省钱”）来阻碍用户选择退出。",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 214,
    "code": "W3CR-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "dApp 缺少智能合约审计披露 (SEC Framework)",
    "description": "启动代币或 NFT 的 Web3 去中心化应用程序未能公布或链接到其智能合约的外部安全审计证书，违反了 SEC 透明度指南。",
    "severity": "serious",
    "reference": "SEC Framework for Investment Contracts"
  },
  {
    "id": 215,
    "code": "W3CR-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Web3 dApp 界面存在盲签漏洞 (NIST SP 800-95)",
    "description": "Web3 应用程序钱包集成在未在 Web 界面中渲染可读交易详情（函数、目标、参数）的情况下请求原始交易签名有效载荷，从而允许盲签。",
    "severity": "critical",
    "reference": "NIST SP 800-95 Web Services Security"
  },
  {
    "id": 216,
    "code": "DSA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "推荐系统算法透明度缺失 (EU DSA)",
    "description": "使用算法推荐系统（如个性化信息流、产品推荐）的网站未能在其服务条款中说明算法中使用的主要参数，违反了 DSA。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 26"
  },
  {
    "id": 217,
    "code": "EUAI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "高风险 AI 系统缺少日志记录功能 (EU AI Act)",
    "description": "高风险 AI 系统的部署者未能确保系统生成的日志自动保留至少六个月，以确保可追溯性和可审计性，违反了欧盟 AI 法案。",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 12"
  },
  {
    "id": 218,
    "code": "UKCR-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "自动续订条款缺少通俗易懂的摘要 (UK CRA)",
    "description": "收取定期订阅费用的网站未能提供关于计费条款、价格变化和续订日期的显著、通俗易懂的的摘要，违反了英国《消费者权利法案》。",
    "severity": "serious",
    "reference": "UK Consumer Rights Act 2015, Sec. 68"
  },
  {
    "id": 219,
    "code": "PIPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "第三方数据处理商披露不充分 (Canada PIPEDA)",
    "description": "隐私政策未能详细说明处理用户个人数据的第三方 SaaS 处理商的的身份、角色和国家/地区，违反了 PIPEDA 透明度指南。",
    "severity": "serious",
    "reference": "PIPEDA Schedule 1, APP 4.8"
  },
  {
    "id": 220,
    "code": "TDDD-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "绕过分析 Cookie 同意 (Germany TDDDG)",
    "description": "针对德国用户的网站在获得明确同意之前就触发了分析、热图或性能 Cookie，违反了《电信数字化服务数据保护法》第 25 条。",
    "severity": "critical",
    "reference": "Germany TDDDG Section 25"
  },
  {
    "id": 221,
    "code": "TXSC-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "默认对未成年人启用社交媒体聊天 (Texas SCOPE)",
    "description": "社交网络或平台网站默认未对经核实或怀疑为未成年人的用户禁用直接消息和聊天功能，违反了德克萨斯州《SCOPE 法案》。",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 509 (SCOPE Act)"
  },
  {
    "id": 222,
    "code": "UTSM-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "社交平台缺少年龄验证 (Utah SMRA)",
    "description": "社交媒体平台未能验证试图创建账户的犹他州居民的的年龄，或者未能获得未成年人的可验证的父母同意，违反了《犹他州社交媒体监管法案》。",
    "severity": "critical",
    "reference": "Utah Code § 13-63-102 (SMRA)"
  },
  {
    "id": 223,
    "code": "FLDB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "受限社交平台缺少年龄门槛 (Florida FDBR)",
    "description": "允许未成年人访问的社交媒体平台未能部署经认可的、安全的年龄验证机制，违反了《佛罗里达州数字权利法案》下关于年轻消费者安全的规定。",
    "severity": "critical",
    "reference": "Fla. Stat. § 501.71 (FDBR)"
  },
  {
    "id": 224,
    "code": "CTDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "心理健康中心周围的地理围栏 (Connecticut SB 3)",
    "description": "网站或应用在任何心理、生殖或性健康设施 1750 英尺范围内使用地理围栏收集健康相关数据，违反了康涅狄格州 SB 3。",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3)"
  },
  {
    "id": 225,
    "code": "VCDP-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "儿童敏感数据缺少同意验证 (Virginia VCDPA)",
    "description": "收集 13 岁以下儿童消费者敏感个人数据的网站在收集数据之前未能获得符合 COPPA 的父母验证，违反了 VCDPA。",
    "severity": "critical",
    "reference": "Va. Code § 59.1-574 (VCDPA)"
  },
  {
    "id": 226,
    "code": "CAAD-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未成年人账户默认启用画像 (CA AADC)",
    "description": "可能被儿童访问的网站默认对未成年人账户开启画像、个性化广告或算法推送，违反了加利福尼亚州《适龄设计规范法案》。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31 (AADC)"
  },
  {
    "id": 227,
    "code": "MDAD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少儿童影响评估披露 (Maryland AADCA)",
    "description": "可能被儿童访问的网站或应用程序未能就未成年人的风险进行并提交数据保护影响评估 (DPIA)，违反了马里兰州 AADCA。",
    "severity": "serious",
    "reference": "Md. Code Ann., Com. Law § 14-45"
  },
  {
    "id": 228,
    "code": "COPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "儿童个人数据缺少父母同意 (Colorado CPA)",
    "description": "网站在未获得事先可验证的父母同意的情况下，收集或处理已知在 13 岁以下的消费者的个人数据，违反了《科罗拉多州隐私法案规则》。",
    "severity": "critical",
    "reference": "4 CCR 904-3 Rule 6.09"
  },
  {
    "id": 229,
    "code": "INDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "儿童敏感数据缺少选择性同意 (Indiana CDPA)",
    "description": "针对印第安纳州消费者的网站收集 13 岁以下未成年人的敏感数据，但未获得符合 COPPA 要求的、事先的主动选择性同意，违反了印第安纳州《消费者数据隐私法案》。",
    "severity": "critical",
    "reference": "Ind. Code § 24-15"
  },
  {
    "id": 230,
    "code": "TNIP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "隐私政策中缺少权利申诉流程 (Tennessee TIPA)",
    "description": "针对田纳西州居民的网站隐私通知未能清晰描述对拒绝就隐私权利请求采取行动的行为进行申诉的流程，违反了田纳西州《信息保护法案》。",
    "severity": "serious",
    "reference": "Tenn. Code Ann. § 47-18-32"
  },
  {
    "id": 231,
    "code": "TCPA-011",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "电子邮件退订机制不可访问或延迟 (CAN-SPAM)",
    "description": "网站的营销退订链接未能立即处理，或者需要 10 个工作日以上才能将用户从列表中删除，违反了《CAN-SPAM 法案》规则。",
    "severity": "serious",
    "reference": "16 CFR § 316.5"
  },
  {
    "id": 232,
    "code": "TCPA-012",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "缺少有效的发件人身份和邮政地址 (CAN-SPAM)",
    "description": "网站营销电子邮件未包含发件人的有效物理邮政地址，或者使用了误导性标题，违反了联邦 CAN-SPAM 要求。",
    "severity": "critical",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 233,
    "code": "TCPA-013",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "缺少营销自动拨号电话的书面同意 (TCPA)",
    "description": "线索收集表单收集电话号码，并将其用于自动营销呼叫活动，但未获得包含所需 TCPA 披露内容的明确事先书面同意。",
    "severity": "critical",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 234,
    "code": "EAA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务购物车键盘导航障碍 (EAA)",
    "description": "结账页面或购物车组件包含键盘焦点陷阱，或者无法仅通过键盘操作，违反了欧洲《可访问性法案》关于电子商务的要求。",
    "severity": "critical",
    "reference": "EN 301 549 Clause 9.2.1 (EAA)"
  },
  {
    "id": 235,
    "code": "EAA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务中缺少替代媒体格式 (EAA)",
    "description": "网站通过视频或音频媒体展示产品，但未提供字幕或音频说明，违反了欧洲《可访问性法案》下的电子商务可访问性规则。",
    "severity": "serious",
    "reference": "EN 301 549 Clause 9.1.2 (EAA)"
  },
  {
    "id": 236,
    "code": "AODA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "无法访问的文档下载 (Ontario AODA)",
    "description": "网站提供的公共文档下载（PDF、用户手册）不符合 WCAG 2.0 AA 级标记和可访问性要求，违反了安大略省 AODA 第 14 条。",
    "severity": "serious",
    "reference": "AODA Section 14"
  },
  {
    "id": 237,
    "code": "ADA-237",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "模态对话框中的键盘焦点陷阱 (ADA Title III)",
    "description": "模态对话框或 Cookie 横幅禁锢了键盘焦点，防止用户通过 Tab 键返回主页面内容，违反了可访问性标准。",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 2.1.2"
  },
  {
    "id": 238,
    "code": "ADA-103",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "无法访问的媒体播放器 (ADA Title III)",
    "description": "网页媒体播放器缺少可访问的控制标签或键盘控制，阻碍了屏幕阅读器和键盘用户的使用，违反了 ADA 第三编的要求。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.1.1 & 4.1.2"
  },
  {
    "id": 239,
    "code": "EPRIV-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "移动响应式布局上的同意绕过 (ePrivacy)",
    "description": "当在移动布局上不渲染或隐藏网站同意横幅时，跟踪脚本却执行了，以此绕过用户同意，违反了 ePrivacy 指令。",
    "severity": "critical",
    "reference": "Directive 2002/58/EC (ePrivacy)"
  },
  {
    "id": 240,
    "code": "FTCE-011",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假 AI 推荐和评论 (FTC 消费者评论规则)",
    "description": "网站展示由 AI 生成或合成的客户评论或推荐，但未显示清晰、显著的的披露来说明它们不是真实的消费者评论，违反了 FTC《不公平欺骗性评论规则》。",
    "severity": "critical",
    "reference": "16 CFR Part 465"
  },
  {
    "id": 241,
    "code": "HIPAA-011",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "社交媒体聊天泄露患者 PHI (HIPAA)",
    "description": "医疗挂号或客户沟通门户接入了第三方社交媒体聊天组件（如 Facebook Messenger），从而传输了患者标识符，违反了 HIPAA 隐私规则。",
    "severity": "critical",
    "reference": "45 CFR § 164.502"
  },
  {
    "id": 242,
    "code": "HIPAA-012",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "通过短信/邮件不安全地传输患者记录 (HIPAA)",
    "description": "远程医疗或医疗接收表单通过标准电子邮件或短信网络发送未加密的患者健康摘要，违反了 HIPAA 安全规则标准。",
    "severity": "critical",
    "reference": "45 CFR § 164.312(e)"
  },
  {
    "id": 243,
    "code": "PCI-013",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "信用数据在 LocalStorage 中的不安全存储 (PCI-DSS v4.0)",
    "description": "网站将主账号 (PAN)、持卡人姓名或 CVV 保存到浏览器的 LocalStorage 或 SessionStorage 中，违反了 PCI-DSS 数据存储指令。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 3.4.1"
  },
  {
    "id": 244,
    "code": "PCI-014",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "结账页面上的不安全支付脚本执行 (PCI-DSS v4.0)",
    "description": "支付结账在不验证完整性或不使用内容安全策略 (CSP) 限制访问的情况下运行外部加载的脚本，违反了 PCI-DSS 要求。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.3"
  },
  {
    "id": 245,
    "code": "MHMDA-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "敏感数据缺少医疗机构验证 (WA MHMDA)",
    "description": "网站收集华盛顿居民的敏感身体/心理健康数据，但未验证接收方是否为执业医疗机构，违反了 MHMDA。",
    "severity": "critical",
    "reference": "RCW 19.373 (MHMDA)"
  },
  {
    "id": 246,
    "code": "NIST-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺少 Web 门户身份验证会话超时设置 (NIST SP 800-53)",
    "description": "客户门户或系统面板未在合理期限后自动终止不活跃的已验证会话，违反了 NIST 安全控制措施。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (IA-11)"
  },
  {
    "id": 247,
    "code": "SOC2-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "缺少系统可用性披露 (SOC 2 Type II)",
    "description": "SaaS 门户未能提供公开可访问的状态或正常运行时间跟踪页面，违反了关于运营可用性的 SOC 2 信托服务标准。",
    "severity": "moderate",
    "reference": "SOC 2 CC1.1 (Availability)"
  },
  {
    "id": 248,
    "code": "CYIN-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "未披露已停止服务的软件平台 (Cyber Insurance)",
    "description": "SaaS 网站或底层框架使用了不受支持、已停止服务的平台，而未向网络保险承保人披露风险，违反了网络保险条款。",
    "severity": "serious",
    "reference": "Cyber Insurance Risk Standards"
  },
  {
    "id": 249,
    "code": "DORA-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 ICT 事件报告功能 (EU DORA)",
    "description": "金融服务平台未能为用户提供用于报告运营性 ICT 事件的、安全的专用门户，违反了 DORA 第 17 条。",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 17"
  },
  {
    "id": 250,
    "code": "FTCS-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "客户门户缺少会话限制 (FTC Safeguards)",
    "description": "金融科技门户未能配置并强制执行针对客户控制台访问的严格最大会话长度，违反了 FTC《保障措施规则》。",
    "severity": "serious",
    "reference": "16 CFR § 314.4(c)(5)"
  },
  {
    "id": 251,
    "code": "DEPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少消费者数据可携性格式选项 (Delaware DPDPA)",
    "description": "针对特拉华州消费者的网站未能以可移植、技术上可行且易于使用的格式提供个人数据下载，违反了特拉华州 DPDPA。",
    "severity": "serious",
    "reference": "Delaware DPDPA (HB 154), Sec. 12C-5"
  },
  {
    "id": 252,
    "code": "MAPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "禁止销售敏感个人数据 (Maryland MODPA)",
    "description": "网站收集并销售马里兰州消费者的敏感个人数据（如精确位置、健康、种族），这在马里兰州《在线数据隐私法案》下是被严格禁止的。",
    "severity": "critical",
    "reference": "Maryland MODPA (SB 541), Sec. 14-46"
  },
  {
    "id": 253,
    "code": "KYPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少消费者访问权披露 (Kentucky KCDPA)",
    "description": "针对肯塔基州居民的网站未能概述消费者确认其数据是否被处理以及进行访问的清晰、易于访问的的流程，违反了 KCDPA。",
    "severity": "serious",
    "reference": "Kentucky KCDPA (SB 15), Sec. 4"
  },
  {
    "id": 254,
    "code": "RIPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "隐私声明中未披露第三方销售 (Rhode Island RIDTPPA)",
    "description": "针对罗德岛州消费者的网站未能在其隐私通知中明确列出向其销售或共享个人数据的所有第三方，违反了 RIDTPPA。",
    "severity": "serious",
    "reference": "Rhode Island RIDTPPA (SB 2502), Sec. 6"
  },
  {
    "id": 255,
    "code": "IAPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少消费者数据销售选择退出链接 (Iowa ICDPA)",
    "description": "针对爱荷华州消费者的网站未能提供清晰、显著的链接以允许用户选择退出其个人数据的销售，违反了爱荷华州《消费者数据保护法案》。",
    "severity": "serious",
    "reference": "Iowa ICDPA (SF 262), Sec. 715C"
  },
  {
    "id": 256,
    "code": "FTCH-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "与跟踪器非法共享健康指标 (FTC 健康泄露规则)",
    "description": "网站收集健康、症状或健身查询，并在未获得明确授权的情况下将其与第三方广告跟踪器共享，触发了 FTC 《健康泄露通知》违规。",
    "severity": "critical",
    "reference": "16 CFR Part 318 (HBNR Rule)"
  },
  {
    "id": 257,
    "code": "NYDF-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "金融门户网站缺少多因素身份验证 (NYDFS)",
    "description": "受 NYDFS 管辖的金融仪表板或客户端 Web 面板未能对所有 Web 登录强制执行多因素身份验证 (MFA)，违反了网络安全条例 23 NYCRR Part 500。",
    "severity": "critical",
    "reference": "23 NYCRR Part 500, Sec. 500.12"
  },
  {
    "id": 258,
    "code": "BIPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "生物识别收集缺少书面授权书 (Illinois BIPA)",
    "description": "网站在收集生物识别标识符（例如面纹、声纹）之前，未获得用户签署的书面授权书，违反了 BIPA 第 15(b) 条。",
    "severity": "critical",
    "reference": "740 ILCS 14/15(b)"
  },
  {
    "id": 259,
    "code": "AADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "键盘焦点被固定定位元素遮挡 (WCAG 2.2)",
    "description": "网站布局允许固定定位的页眉、页脚或覆盖层在键盘导航期间遮挡活动输入字段或按钮的焦点指示器，违反了 WCAG 2.2 SC 2.4.11。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.11"
  },
  {
    "id": 260,
    "code": "AADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "交互元素的目标大小不足 (WCAG 2.2)",
    "description": "交互式目标元素（按钮、链接、表单输入）小于 24x24 CSS 像素且没有足够的间距，违反了 WCAG 2.2 AA 级关于触摸和指针输入的指南。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.8"
  },
  {
    "id": 261,
    "code": "EUAI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "高风险 AI 缺少人类监督披露 (EU AI Act)",
    "description": "部署高风险 AI 决策系统（如候选人筛选、信用评估）的网站未能披露人类监督和干预的机制，违反了《AI 法案》第 14 条。",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 14"
  },
  {
    "id": 262,
    "code": "EUAI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "AI 系统缺少上市后监控计划 (EU AI Act)",
    "description": "受监管 AI 系统的提供商未能托管或链接到公开可访问的上市后监控计划和事件报告途径，违反了欧盟《AI 法案》要求。",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 61"
  },
  {
    "id": 263,
    "code": "DSA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "推荐系统缺少非画像选项 (EU DSA)",
    "description": "使用推荐系统的在线平台未能向用户提供至少一个不基于画像的选项（例如按时间顺序排列的信息流，而不是算法信息流），违反了 DSA。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 38"
  },
  {
    "id": 264,
    "code": "DSA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少未成年人保护年龄验证 (EU DSA)",
    "description": "允许未成年人访问的在线平台未能实施适当且成比例的年龄验证措施以确保儿童在线安全，违反了 DSA 第 28 条。",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 28"
  },
  {
    "id": 265,
    "code": "NIS2-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺少事件通知和联系渠道 (NIS2)",
    "description": "关键基础设施或数字服务商的网站未能展示清晰的的事件通知程序或报告网络事件的联系途径，违反了 NIS2 要求。",
    "severity": "serious",
    "reference": "EU Directive 2022/2555 (NIS2), Art. 21"
  },
  {
    "id": 266,
    "code": "GDPR-015",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少限制处理权利的操作路径 (GDPR)",
    "description": "网站未能向用户提供用于行使 GDPR 第 18 条规定的限制处理个人数据权利的的直接在线机制（表单、开关或电子邮件途径）。",
    "severity": "serious",
    "reference": "GDPR Article 18"
  },
  {
    "id": 267,
    "code": "EPRIV-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cookie 有效期超过最大限制 (ePrivacy 指南)",
    "description": "网站同意机制设置的非必要跟踪 Cookie 的有效期超过 12 个月，且没有自动的同意续订提示，违反了 ePrivacy 指南。",
    "severity": "moderate",
    "reference": "ePrivacy Guidelines on Cookies, Sec. 4"
  },
  {
    "id": 268,
    "code": "GDPR-016",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少处理活动记录披露摘要 (GDPR)",
    "description": "网站隐私通知未能声明公司维护处理活动记录 (ROPA)，并且未提供用户可见的摘要，违反了 GDPR 第 30 条。",
    "severity": "serious",
    "reference": "GDPR Article 30"
  },
  {
    "id": 269,
    "code": "EIDS-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少对合格电子签名的支持 (eIDAS 2.0)",
    "description": "要求欧盟公民签名的数字平台未能识别或支持通过欧盟信任列表验证的合格电子签名 (QES)，违反了 eIDAS 2.0。",
    "severity": "moderate",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 6"
  },
  {
    "id": 270,
    "code": "GDPR-017",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少数据保护影响评估 (DPIA) 披露 (GDPR)",
    "description": "进行高风险处理（例如监控公共区域或海量跟踪）的网站隐私通知未能声明已进行 DPIA 并已在 DPA 登记。",
    "severity": "serious",
    "reference": "GDPR Article 35"
  },
  {
    "id": 271,
    "code": "ARPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少数据更正门户 (Argentina Law 25.326)",
    "description": "收集阿根廷居民数据的网站未能提供用于请求更正或销毁个人数据的专用路径或清晰说明，违反了第 25.326 号法律。",
    "severity": "serious",
    "reference": "Argentina Law 25.326, Art. 6"
  },
  {
    "id": 272,
    "code": "COPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "商业信息捆绑同意 (Colombia Law 1581)",
    "description": "网站收集哥伦比亚居民的数据，并将营销信息同意与一般注册协议捆绑在一起，违反了 Habeas Data 第 1581 号法律。",
    "severity": "serious",
    "reference": "Colombia Law 1581 of 2012, Art. 12"
  },
  {
    "id": 273,
    "code": "MXPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少独立的 ARCO 权利操作 (Mexico LFPDPPP)",
    "description": "收集墨西哥消费者数据的网站未能为用户行使其 ARCO（访问、更正、取消、反对）权利提供清晰、可操作的步骤，违反了 LFPDPPP。",
    "severity": "serious",
    "reference": "Mexico LFPDPPP, Art. 16"
  },
  {
    "id": 274,
    "code": "CHPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少跨境传输披露 (Switzerland FADP)",
    "description": "网站收集瑞士居民的数据并进行国际传输（例如通过外部跟踪 API），但未在其隐私政策中披露目标国家和安全保障措施。",
    "severity": "serious",
    "reference": "Switzerland FADP, Art. 16"
  },
  {
    "id": 275,
    "code": "POPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "默认选择性加入营销违规 (South Africa POPIA)",
    "description": "网站在未获得明确事先选择性同意的情况下，向南非居民发送电子直接营销，或者向从未同意的用户发送，违反了 POPIA 第 69 条。",
    "severity": "serious",
    "reference": "South Africa POPIA 2013, Sec. 69"
  },
  {
    "id": 276,
    "code": "TRKV-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经授权的跨境传输且缺少充分保障 (Turkey KVKK)",
    "description": "网站在未获得明确同意或展示合规标准合同条款的情况下，将土耳其居民的个人数据传输到土耳其境外的服务器上，违反了 KVKK。",
    "severity": "serious",
    "reference": "Turkey Law 6698 (KVKK), Art. 9"
  },
  {
    "id": 277,
    "code": "AUPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "隐私政策中缺少联系方式和访问程序详情 (Australia APP 1)",
    "description": "针对澳大利亚用户的隐私政策缺少关于个人如何访问其个人数据、寻求更正或投诉违反 APP 行为的详细信息，违反了 APP 1.4。",
    "severity": "serious",
    "reference": "Australian Privacy Act 1988, APP 1.4"
  },
  {
    "id": 278,
    "code": "SGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少数据访问和更正请求跟踪系统 (Singapore PDPA)",
    "description": "网站未能向新加坡居民提供专用的电子邮件或自动化门户，以请求确认过去一年内处理的其数据，违反了新加坡 PDPA。",
    "severity": "moderate",
    "reference": "Singapore PDPA 2012, Sec. 21"
  },
  {
    "id": 279,
    "code": "THPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意向保障不足的国家进行跨境传输 (Thailand PDPA)",
    "description": "网站在未获得明确同意的情况下，将泰国居民的个人数据传输到没有足够数据保护标准的第三国，违反了 PDPA 第 28 条。",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562, Sec. 28"
  },
  {
    "id": 280,
    "code": "PHDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未充分披露反对处理的权利 (Philippines DPA)",
    "description": "针对菲律宾居民的网站隐私通知未能明确说明用户反对处理其个人数据（包括出于营销目的）的权利。",
    "severity": "serious",
    "reference": "Philippines Data Privacy Act 2012, Sec. 16"
  },
  {
    "id": 281,
    "code": "FTCD-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未经同意欺骗性调高订阅价格 (FTC)",
    "description": "网站在未通知用户并在计费更新价格之前获得明确同意的情况下，以更高的费率执行自动订阅续订，违反了 FTC 规则。",
    "severity": "serious",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 282,
    "code": "FTCD-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "结账时预先勾选可选的附加项目 (FTC)",
    "description": "电子商务结账流程将可选服务、保修或附加产品默认为预先勾选状态，利用消费者的惰性来抬高交易成本。",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 283,
    "code": "TCPA-014",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "未能维护内部“谢绝来电”(DNC) 登记册 (TCPA)",
    "description": "线索收集网站未能维护和记录内部“谢绝来电”(DNC) 列表以及管理营销联系请求的程序，违反了 TCPA 规则。",
    "severity": "critical",
    "reference": "47 CFR § 64.1200(d)"
  },
  {
    "id": 284,
    "code": "TCPA-015",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "退订请求需要付费或登录 (CAN-SPAM)",
    "description": "网站营销退订链接强制用户登录、填写复杂的调查或支付处理费以退订电子邮件，违反了 CAN-SPAM 条例。",
    "severity": "serious",
    "reference": "16 CFR § 316.5"
  },
  {
    "id": 285,
    "code": "EAA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务中无法访问的电子发票/收据输出 (EAA)",
    "description": "在线商店生成的订单确认页面或可下载的收据被格式化为扁平图像或无法访问的 PDF，阻碍了屏幕阅读器的访问，违反了 EAA。",
    "severity": "critical",
    "reference": "EN 301 549 Clause 11.2 (EAA)"
  },
  {
    "id": 286,
    "code": "AODA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈提交渠道 (Ontario AODA)",
    "description": "网站未能提供专用的可访问在线途径或表单，以接收残疾用户关于无障碍问题的反馈，违反了 AODA。",
    "severity": "serious",
    "reference": "AODA Section 12"
  },
  {
    "id": 287,
    "code": "ADA-104",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "文本缩放至 200% 时破坏页面布局 (ADA Title III)",
    "description": "当浏览器缩放设置为 200% 时，网站布局在没有辅助技术的情况下发生破坏、重叠或文本截断，违反了 WCAG 2.1 SC 1.4.4 缩放标准。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.4.4"
  },
  {
    "id": 288,
    "code": "ADA-105",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "无法调整或延长表单会话限制 (ADA Title III)",
    "description": "具有时间限制的表单（例如结账机票预订）不允许用户在超时前禁用、调整或延长限制，违反了 WCAG 2.1 SC 2.2.1。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.2.1"
  },
  {
    "id": 289,
    "code": "EPRIV-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "同意横幅 Cookie 设置阻碍键盘用户",
    "description": "Cookie 同意横幅及其“管理设置”面板无法完全关闭或通过键盘 TAB 键导航，导致网站在功能上不合规。",
    "severity": "critical",
    "reference": "ePrivacy Directive, Art. 5(3)"
  },
  {
    "id": 290,
    "code": "FTCE-012",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未标记的联盟链接和赞助内容 (FTC 推荐指南)",
    "description": "网站展示赚取佣金的商品链接或赞助内容块，但在链接附近未显示清晰、直接的的标记（例如“联盟链接”或“赞助”）。",
    "severity": "critical",
    "reference": "16 CFR Part 255"
  },
  {
    "id": 291,
    "code": "W3CR-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "dApp 中代币交易缺少风险披露 (SEC)",
    "description": "促进代币兑换或金融交易的 Web3 界面未能在其兑换面板上展示关于代币波动性和监管状态的清晰风险披露。",
    "severity": "serious",
    "reference": "SEC Guidance on Digital Assets"
  },
  {
    "id": 292,
    "code": "W3CR-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "dApp 未能验证 API 接口完整性 (NIST SP 1800-34)",
    "description": "去中心化 Web 应用程序在不验证响应签名的情况下连接到 RPC 节点或 API，从而允许中间人攻击以显示虚假的钱包余额。",
    "severity": "critical",
    "reference": "NIST SP 1800-34 (Data Integrity)"
  },
  {
    "id": 293,
    "code": "PCI-015",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "在前端执行来自非授权域的脚本 (PCI-DSS v4.0)",
    "description": "结账或支付界面加载并运行托管在非白名单域上的 JavaScript 文件，违反了 PCI-DSS v4.0 下严格的支付界面安全规则。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.1"
  },
  {
    "id": 294,
    "code": "PCI-016",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户门户会话录屏脚本在密码输入框启用 (PCI-DSS)",
    "description": "会话录制工具（例如 Hotjar、FullStory）在客户门户上运行，但未掩码或排除密码、持卡人或 CVV 输入等敏感输入字段。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 8.3"
  },
  {
    "id": 295,
    "code": "CYIN-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少事件响应计划引用 (Cyber Insurance)",
    "description": "SaaS 系统界面未能向用户展示请求安全事件披露报告的机制，这是网络责任保险承保所必需的。",
    "severity": "serious",
    "reference": "NIST Cybersecurity Framework (CSF)"
  },
  {
    "id": 296,
    "code": "DORA-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "ICT 系统重大事件日志报告缺失 (EU DORA)",
    "description": "欧盟金融实体 Web 控制台未能提供或链接到与 ICT 相关的重大事件日志，以便向用户和监管机构公开，违反了 DORA 第 18 条。",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 18"
  },
  {
    "id": 297,
    "code": "FTCS-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "缺少风险评估日志披露 (FTC Safeguards)",
    "description": "金融或金融科技门户网站未能在其安全通知中发布或提及它对客户数据存储数据库进行定期风险评估。",
    "severity": "serious",
    "reference": "16 CFR § 314.4(d)"
  },
  {
    "id": 298,
    "code": "SOC2-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "访问撤销通知不充分 (SOC 2 Type II)",
    "description": "客户控制台未记录已撤销的管理员令牌的日志，或者未展示带有直接终止路径的活动会话，违反了 SOC 2 CC6.3 安全控制措施。",
    "severity": "moderate",
    "reference": "SOC 2 CC6.3 (Access Controls)"
  },
  {
    "id": 299,
    "code": "NIST-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺少用户账户管理审计日志 (NIST SP 800-53)",
    "description": "网站客户端控制面板未能为用户账户创建、特权修改或删除操作生成审计跟踪，违反了 NIST 网络安全标准。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (AC-2)"
  },
  {
    "id": 300,
    "code": "HIPAA-013",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "访问 PHI 前缺少身份验证 (HIPAA)",
    "description": "患者挂号门户或症状追踪器允许用户在未执行验证过的多步身份验证的情况下访问历史记录或受保护的健康信息 (PHI)。",
    "severity": "critical",
    "reference": "45 CFR § 164.312(d)"
  },
  {
    "id": 301,
    "code": "MCDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少消费者纠正不准确个人数据的权利 (Minnesota MCDPA)",
    "description": "网站隐私流程未能为明尼苏达州消费者提供更正其收集的个人数据中不准确之处的易用途径，违反了 MCDPA。",
    "severity": "serious",
    "reference": "Minnesota MCDPA, Sec. 325O.04"
  },
  {
    "id": 302,
    "code": "TXSC-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "社交平台上针对未成年人的广告限制不力 (Texas SCOPE)",
    "description": "针对德克萨斯州未成年人的社交媒体平台根据 18 岁以下账户的画像推送定向广告，违反了《SCOPE 法案》。",
    "severity": "critical",
    "reference": "Texas SCOPE Act, Sec. 509.052"
  },
  {
    "id": 303,
    "code": "UTSM-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未成年人与非父母用户之间默认启用私信 (Utah SMRA)",
    "description": "社交媒体 Web 应用程序未能默认对未成年人账户与未经验证的父母/监护人账户之间的直接消息功能进行拦截，违反了犹他州 SMRA。",
    "severity": "critical",
    "reference": "Utah SMRA, Sec. 13-63-201"
  },
  {
    "id": 304,
    "code": "FLDB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未能披露搜索结果偏好参数 (Florida FDBR)",
    "description": "针对佛罗里达州居民的搜索引擎或目录平台在算法过滤处于活动状态时，未能披露用于对搜索结果进行排名的参数，违反了 FDBR。",
    "severity": "critical",
    "reference": "Florida FDBR, Sec. 501.714"
  },
  {
    "id": 305,
    "code": "CTDP-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "出于商业目的对未成年人进行画像 (Connecticut SB 3)",
    "description": "针对康涅狄格州未成年人的网站在未获得未成年人或其监护人明确书面同意的情况下，收集个人画像用于定向营销或产品推荐。",
    "severity": "critical",
    "reference": "CTDPA SB 3, Sec. 5"
  },
  {
    "id": 306,
    "code": "CAAD-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "针对儿童的非显式交互式暗黑模式 (CA AADC)",
    "description": "可能被未成年人访问的网站使用欺骗性的游戏机制或样式来诱导儿童消费或披露电子邮件地址，违反了 AADC。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 307,
    "code": "MDAD-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "针对儿童默认启用跟踪 (Maryland MODPA)",
    "description": "针对马里兰州居民的在线服务默认未能为识别为 18 岁以下的用户停用行为跟踪器，违反了 MODPA。",
    "severity": "serious",
    "reference": "Maryland MODPA, Sec. 14-45"
  },
  {
    "id": 308,
    "code": "INDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少敏感数据处理披露 (Indiana CDPA)",
    "description": "针对印第安纳州居民的隐私通知未能明确说明所处理的敏感个人数据的类别及具体目的，违反了 CDPA。",
    "severity": "critical",
    "reference": "Indiana CDPA, Sec. 24-15-4"
  },
  {
    "id": 309,
    "code": "TNIP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "数据权利请求响应时间不合规 (Tennessee TIPA)",
    "description": "网站隐私流程未能保证并在规定的 45 天期限内执行对消费者隐私权利请求的响应，违反了 TIPA。",
    "severity": "serious",
    "reference": "Tennessee TIPA, Sec. 47-18"
  },
  {
    "id": 310,
    "code": "NHPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少新罕布什尔州消费者的删除权操作 (NHPA)",
    "description": "网站未能为新罕布什尔州居民提供删除已收集个人数据的清晰、自动化的方法，违反了新罕布什尔州《隐私法案》。",
    "severity": "serious",
    "reference": "New Hampshire Privacy Act, Sec. 507-H.4"
  },
  {
    "id": 311,
    "code": "AADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "多步表单中需要重复输入数据 (WCAG 2.2)",
    "description": "多步注册或结账表单要求用户在同一会话中重新输入先前提供的信息，而未提供自动填充，违反了 WCAG 2.2 SC 3.3.7。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 3.3.7"
  },
  {
    "id": 312,
    "code": "AADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "通过认知功能测试进行不可访问的身份验证 (WCAG 2.2)",
    "description": "网站身份验证需要进行认知功能测试（如拼图或拼写图像中的字符），而未提供替代的、易用的登录方法，违反了 WCAG 2.2 SC 3.3.8。",
    "severity": "critical",
    "reference": "WCAG 2.2 SC 3.3.8"
  },
  {
    "id": 313,
    "code": "AADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "帮助和支持联系信息位置不一致 (WCAG 2.2)",
    "description": "网站在不同的页面上的不同位置展示支持联系人、聊天或 FAQ 路径（例如首页右上角，结账页左下角），违反了 WCAG 2.2 SC 3.2.6。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 3.2.6"
  },
  {
    "id": 314,
    "code": "AADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "要求拖拽操作且未提供单指点击替代方案 (WCAG 2.2)",
    "description": "网站要求进行拖拽动作（如自定义滑块、地图或拖拽列表），而不支持单指输入的点击或轻按替代方案，违反了 WCAG 2.2 SC 2.5.7。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.7"
  },
  {
    "id": 315,
    "code": "AADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "桌面端布局触发水平滚动 (WCAG 2.1)",
    "description": "当在 320 CSS 像素宽度下查看或缩放时，网站布局会强制水平滚动，阻碍了轻松阅读，违反了 WCAG 2.1 SC 1.4.10。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.4.10"
  },
  {
    "id": 316,
    "code": "AADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "调整文本间距导致文本重叠 (WCAG 2.1)",
    "description": "自定义的客户端字体间距调整（行高、字符间距）导致页面文本元素重叠或被截断，违反了 WCAG 2.1 SC 1.4.12。",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 1.4.12"
  },
  {
    "id": 317,
    "code": "AADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "无法停止的自动播放媒体和轮播图 (WCAG 2.1)",
    "description": "网站包含自动播放的滑块、横幅或视频背景媒体，且用户无法暂停、停止或隐藏它们，违反了 WCAG 2.1 SC 2.2.2。",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 2.2.2"
  },
  {
    "id": 318,
    "code": "AADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "输入框缺少占位符或上下文提示 (WCAG 2.1)",
    "description": "需要特定格式（如日期、电话号码）的表单输入未提供占位符、描述性提示或上下文说明，违反了 WCAG 2.1 SC 3.3.2。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 3.3.2"
  },
  {
    "id": 319,
    "code": "AADA-011",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "屏幕阅读器未播报状态消息 (WCAG 2.1)",
    "description": "动态状态更新（例如“保存成功”通知或内联验证消息）显示在 DOM 中，但没有 `role=\"status\"` 或 `aria-live=\"polite\"`，导致屏幕阅读器无法读取。",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 4.1.3"
  },
  {
    "id": 320,
    "code": "AADA-012",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "不合逻辑的 Tab 键导航顺序 (WCAG 2.1)",
    "description": "键盘导航的焦点路径以不合逻辑或随机的顺序穿过页面，未能与视觉阅读布局相匹配，违反了 WCAG 2.1 SC 2.4.3。",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.4.3"
  },
  {
    "id": 321,
    "code": "GDPR-018",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未披露已收集数据的加密标准 (GDPR)",
    "description": "网站隐私通知收集了敏感个人数据，但未能声明在存储和传输过程中使用的加密方法（例如 AES-256），违反了 GDPR 第 32 条。",
    "severity": "serious",
    "reference": "GDPR Article 32"
  },
  {
    "id": 322,
    "code": "GDPR-019",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "外部传输缺少充足性认定披露 (GDPR)",
    "description": "隐私通知向欧洲经济区 (EEA) 之外传输数据，但未能披露目标国家是否符合欧委会的充足性认定，或未说明所部署的的具体保障措施。",
    "severity": "moderate",
    "reference": "GDPR Article 13(1)(f)"
  },
  {
    "id": 323,
    "code": "GDPR-020",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "用户缺少数据泄露缓解说明 (GDPR)",
    "description": "网站未能展示说明、直接电子邮件表单或联系详情来解释在发生个人数据泄露时如何通知用户以及他们应该采取什么行动。",
    "severity": "serious",
    "reference": "GDPR Article 34"
  },
  {
    "id": 324,
    "code": "PIPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少具体存储位置披露 (Canada PIPEDA)",
    "description": "针对加拿大居民的隐私政策收集了个人数据，但未能披露存储数据的具体地理位置（省/国），违反了 PIPEDA。",
    "severity": "serious",
    "reference": "PIPEDA Principle 4.5"
  },
  {
    "id": 325,
    "code": "PIPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少数据访问请求处理费用通知 (Canada PIPEDA)",
    "description": "针对加拿大居民的网站隐私通知未能说明正式个人数据访问请求是否存在相关的处理费用，违反了 PIPEDA。",
    "severity": "serious",
    "reference": "PIPEDA Principle 4.9"
  },
  {
    "id": 326,
    "code": "JPAP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "共享 Cookie 标识符目的披露缺失 (Japan APPI)",
    "description": "针对日本用户的网站共享第三方广告标识符或 Cookie，但未在其 Cookie 声明中披露接收方的确切广告和分析目的，违反了 APPI 第 27 条。",
    "severity": "serious",
    "reference": "Japan APPI, Art. 27"
  },
  {
    "id": 327,
    "code": "NZPR-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "超出必要期限非法保留个人数据 (New Zealand Privacy Act)",
    "description": "针对新西兰居民的网站缺少自动化的政策或披露，以具体说明个人数据的保留时间不会长于合法目的所需的期限，违反了 IPP 4。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, IPP 4"
  },
  {
    "id": 328,
    "code": "THPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未充分披露要求删除数据的权利 (Thailand PDPA)",
    "description": "针对泰国用户的网站隐私政策中未明示消费者根据 PDPA 要求擦除、销毁或去标识化其个人数据的权利。",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562, Sec. 30"
  },
  {
    "id": 329,
    "code": "PHDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未能披露向 DPA 投诉的程序 (Philippines DPA)",
    "description": "针对菲律宾消费者的网站隐私政策未能说明用户如何就数据泄露向国家隐私委员会 (NPC) 提出正式投诉。",
    "severity": "moderate",
    "reference": "Philippines Data Privacy Act 2012, Sec. 34"
  },
  {
    "id": 330,
    "code": "LGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "隐私政策更新未显著通知 (Brazil LGPD)",
    "description": "网站对处理方法或隐私政策做出了重大更改，但未通过清晰的网站警报或电子邮件通知巴西用户，违反了 LGPD 第 9 条。",
    "severity": "serious",
    "reference": "Brazil LGPD, Art. 9"
  },
  {
    "id": 331,
    "code": "GLBA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少选择拒绝与非关联方共享数据的权利 (GLBA)",
    "description": "受 GLBA 管辖的金融科技或金融仪表板未能在与非关联第三方共享非公开个人信息之前，向用户提供选择退出的途径。",
    "severity": "serious",
    "reference": "16 CFR Part 313.9"
  },
  {
    "id": 332,
    "code": "SEC-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少保护客户信息披露的管理政策 (SEC)",
    "description": "经 SEC 注册的投资顾问网站未能展示或链接到概述客户记录物理和技术安全保障措施的政策，违反了 S-P 条例。",
    "severity": "serious",
    "reference": "SEC Regulation S-P, Sec. 248.30"
  },
  {
    "id": 333,
    "code": "PCI-017",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺少外部软件组件清单 (PCI-DSS v4.0)",
    "description": "网站支付流程使用了外部软件库、框架或脚本，但未对所有软件组件进行活跃的、文档化的清单管理，违反了 PCI-DSS 要求 6.3.2。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.3.2"
  },
  {
    "id": 334,
    "code": "PCI-018",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "未能记录加密密钥管理程序 (PCI-DSS v4.0)",
    "description": "处理持卡人交易的网站未能记录或发布用于加密卡数据的加密算法和密钥管理程序的摘要。",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 12.3.2"
  },
  {
    "id": 335,
    "code": "CYIN-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少漏洞披露程序公告 (Cyber Insurance)",
    "description": "公司网站未能为白帽安全研究人员发布漏洞披露计划 (VDP) 或安全港政策，这是满足网络保险合规要求所必需的。",
    "severity": "serious",
    "reference": "Cyber Insurance Security Requirements"
  },
  {
    "id": 336,
    "code": "DORA-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少第三方 ICT 提供商关键级别披露 (EU DORA)",
    "description": "金融系统的 Web 控制台未列出或对其第三方云和基础设施提供商的关键级别进行分类，违反了 DORA 透明度规则。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 28"
  },
  {
    "id": 337,
    "code": "FTCS-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "缺少员工安全培训引用 (FTC Safeguards)",
    "description": "金融仪表板隐私通知未能说明公司针对消费者数据保护进行年度员工安全培训，违反了 FTC《保障措施规则》。",
    "severity": "serious",
    "reference": "16 CFR § 314.4(e)"
  },
  {
    "id": 338,
    "code": "SOC2-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "补丁管理披露不充分 (SOC 2 Type II)",
    "description": "面向客户的 SaaS 门户未能提及或记录用于解决已知系统漏洞的补丁管理时间表和程序，违反了 SOC 2 CC7.1。",
    "severity": "moderate",
    "reference": "SOC 2 CC7.1 (Vulnerability Management)"
  },
  {
    "id": 339,
    "code": "NIST-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺少网络流量和入侵监控披露 (NIST SP 800-53)",
    "description": "数字平台的安全通知未说明其是否采用主动入侵检测或 Web 应用程序防火墙 (WAF) 来监控传入的网络流量，违反了 NIST SI-4。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (SI-4)"
  },
  {
    "id": 340,
    "code": "HIPAA-014",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "网络安全风险分析披露不充分 (HIPAA 安全规则)",
    "description": "患者注册申请表未在其隐私政策中确认它会定期进行风险分析以评估 PHI 的潜在安全漏洞，违反了 HIPAA 安全规则。",
    "severity": "critical",
    "reference": "45 CFR § 164.308(a)(1)"
  },
  {
    "id": 341,
    "code": "MDAD-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "针对儿童画像以投放定向广告 (Maryland MODPA)",
    "description": "针对马里兰州消费者的网站对已知在 18 岁以下的用户账户启用定向广告画像，违反了《在线数据隐私法案》。",
    "severity": "critical",
    "reference": "Maryland MODPA, Sec. 14-46"
  },
  {
    "id": 342,
    "code": "TXSC-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经父母验证收集未成年人位置历史记录 (Texas SCOPE)",
    "description": "Web 应用程序在未获得验证过的的父母同意的情况下，收集并保留经核实或怀疑为未成年人的用户的历史位置跟踪记录，违反了 SCOPE。",
    "severity": "critical",
    "reference": "Texas SCOPE Act, Sec. 509.053"
  },
  {
    "id": 343,
    "code": "UTSM-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "对未成年人进行算法推荐 (Utah SMRA)",
    "description": "针对犹他州未成年人的社交媒体平台在未获得验证过的父母同意的情况下，在未成年人账户上利用预测算法或个性化推荐，违反了 SMRA。",
    "severity": "critical",
    "reference": "Utah SMRA, Sec. 13-63-301"
  },
  {
    "id": 344,
    "code": "FLDB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少个人数据销售选择退出链接 (Florida FDBR)",
    "description": "针对佛罗里达州消费者的网站未能在其首页托管名为“请勿出售我的个人信息”的清晰、显著的链接，违反了佛罗里达州 FDBR。",
    "severity": "critical",
    "reference": "Florida FDBR, Sec. 501.715"
  },
  {
    "id": 345,
    "code": "CTDP-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意出售地理定位数据 (Connecticut SB 3)",
    "description": "针对康涅狄格州消费者的网站在未获得事先明确选择性同意的情况下，出售从移动或 Web 界面收集的精确地理定位坐标。",
    "severity": "critical",
    "reference": "Connecticut SB 3, Sec. 6"
  },
  {
    "id": 346,
    "code": "CAAD-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "缺少儿童安全影响评估合理性披露 (CA AADC)",
    "description": "可能被未成年人访问的网站未能在其隐私通知中详细说明基于儿童数据影响评估实施的安全保障措施，违反了 AADC。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 347,
    "code": "BIPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "禁止销售生物识别标识符 (Illinois BIPA)",
    "description": "网站出售或共享伊利诺伊州居民的生物识别数据（例如语音模板、人脸识别标记）以获取商业利润，这在 BIPA 下是被严格禁止的。",
    "severity": "critical",
    "reference": "740 ILCS 14/15(c)"
  },
  {
    "id": 348,
    "code": "HIPAA-015",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "患者研究记录去标识化不充分 (HIPAA 隐私)",
    "description": "健康门户网站发布包含邮政编码或确切出生日期的临床摘要或症状数据库，未能满足 HIPAA 下严格的安全港去标识化规则。",
    "severity": "critical",
    "reference": "45 CFR § 164.514(b)"
  },
  {
    "id": 349,
    "code": "DORA-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少合同条款保障摘要 (EU DORA)",
    "description": "金融仪表板未能披露其与关键 ICT 提供商的合同中包含强制性安全和数据可携性条款，违反了 DORA 第 30.2 条。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30.2"
  },
  {
    "id": 350,
    "code": "FTCS-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "缺少事件响应政策摘要 (FTC Safeguards)",
    "description": "金融科技门户网站未能在其安全披露中引用或展示针对客户数据泄露的书面事件响应计划 (IRP) 摘要，违反了 FTC《保障措施规则》。",
    "severity": "serious",
    "reference": "16 CFR § 314.4(g)"
  },
  {
    "id": 351,
    "code": "ADA-106",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "焦点外观（最小）违规",
    "description": "该网站的键盘焦点指示器缺乏最小面积或与相邻颜色的对比度，使得仅使用键盘的用户难以看清哪个元素处于活动状态，违反了 WCAG 2.2。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.11"
  },
  {
    "id": 352,
    "code": "ADA-107",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "焦点被固定元素遮挡",
    "description": "通过键盘聚焦的交互式元素完全 or 部分被固定页眉、页脚或悬浮层遮挡，从而妨碍屏幕可见性，违反了 WCAG 2.2。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.12"
  },
  {
    "id": 353,
    "code": "ADA-108",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "拖拽操作缺乏点击替代方案",
    "description": "拖拽手势（如滑块控制、看板）缺乏单点点击/触碰替代方案，给有运动障碍的用户带来障碍，违反了 WCAG 2.2。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.7"
  },
  {
    "id": 354,
    "code": "ADA-109",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "交互目标尺寸低于最小值",
    "description": "交互式目标（按钮、链接）小于 24x24 CSS 像素且没有足够的间距，导致触屏和运动障碍用户误触，违反了 WCAG 2.2。",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.8"
  },
  {
    "id": 355,
    "code": "ADA-110",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "表单数据冗余输入要求",
    "description": "表单要求用户重新输入在同一会话中先前提交过的信息，而不是自动填充或提供选择选项，违反了 WCAG 2.2。",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 3.3.7"
  },
  {
    "id": 356,
    "code": "ADA-111",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "不可访问的多因素身份验证",
    "description": "身份验证流程强制进行认知测试（如记忆密码、抄写验证码、解谜），而没有提供复制粘贴或硬件密钥替代方案，违反了 WCAG 2.2。",
    "severity": "critical",
    "reference": "WCAG 2.2 SC 3.3.8"
  },
  {
    "id": 357,
    "code": "ADA-112",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "焦点遮挡（增强级别）",
    "description": "在更严格的无障碍审计下，交互式元素在聚焦时完全可见，没有布局上的任何重叠，违反了 WCAG 2.2 AAA 标准。",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 2.4.13"
  },
  {
    "id": 358,
    "code": "ADA-113",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "认知身份验证排除（增强）",
    "description": "登录表单完全省略了认知测试（包括对象识别和图案拼写），完全依赖可访问的身份验证，违反了 WCAG 2.2 AAA。",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 3.3.9"
  },
  {
    "id": 359,
    "code": "ADA-114",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少可访问的视频文本转录",
    "description": "包含教育或商业信息的嵌入式视频缺少同步或链接的全文文本转录，给视听障用户带来障碍，违反了 ADA Title III。",
    "severity": "serious",
    "reference": "ADA Title III / WCAG SC 1.2.8"
  },
  {
    "id": 360,
    "code": "ADA-115",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少预录制媒体的字幕",
    "description": "营销或产品预览视频未提供准确的闭路字幕（CC），阻碍了听障或重听访客的访问，违反了 ADA Title III。",
    "severity": "critical",
    "reference": "ADA Title III / WCAG SC 1.2.2"
  },
  {
    "id": 361,
    "code": "HIPAA-016",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "不安全的患者预约表单",
    "description": "在线预约界面在未加密的 URL 参数中传递受保护的健康信息（PHI，如病症或医生姓名），违反了 HIPAA 安全标准。",
    "severity": "critical",
    "reference": "45 CFR § 164.312(e)(1)"
  },
  {
    "id": 362,
    "code": "HIPAA-017",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "预约界面上的未经授权营销像素",
    "description": "患者预约系统在未获得患者明确签署的 HIPAA 授权的情况下执行分析或广告追踪器（如 Meta Pixel），导致巨额监管罚款。",
    "severity": "critical",
    "reference": "45 CFR § 164.508"
  },
  {
    "id": 363,
    "code": "HIPAA-018",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "缺乏门户访问活动日志记录",
    "description": "健康门户数据库在加载敏感患者记录或化验结果时未能记录查看者身份、时间戳和操作，违反了 HIPAA 安全规则的审计要求。",
    "severity": "serious",
    "reference": "45 CFR § 164.312(b)"
  },
  {
    "id": 364,
    "code": "HIPAA-019",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "未注明生效日期的隐私惯例通知",
    "description": "医疗诊所网站上托管的隐私惯例通知（NPP）未能在显著位置显示其生效日期，违反了 HIPAA 隐私规则的披露指令。",
    "severity": "moderate",
    "reference": "45 CFR § 164.520"
  },
  {
    "id": 365,
    "code": "HIPAA-020",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "不符合规范的健康数据删除流程",
    "description": "健康门户未能在华盛顿州《我的健康我的数据法案》（MHMDA）规定的 30 天法定窗口内执行用户删除所收集的非 HIPAA 健康追踪信息的请求。",
    "severity": "serious",
    "reference": "RCW 19.373.040"
  },
  {
    "id": 366,
    "code": "HIPAA-021",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "缺少 MHMDA 消费者健康数据收集同意授权",
    "description": "健康追踪网站在未获取单独的、明确的同意授权横幅的情况下，收集华盛顿州消费者的健康指数或症状查询，违反了 MHMDA。",
    "severity": "critical",
    "reference": "RCW 19.373.030"
  },
  {
    "id": 367,
    "code": "HIPAA-022",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "不安全的处方上传文件存储",
    "description": "门户上传的处方或医生证明文件被放置在公共云目录中，或者可以通过易于猜测的 URL 访问，违反了 HIPAA 安全标准。",
    "severity": "critical",
    "reference": "45 CFR § 164.312(a)(2)(iv)"
  },
  {
    "id": 368,
    "code": "HIPAA-023",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "患者门户缺乏自动注销",
    "description": "在用户处于非活动状态后，电子医疗门户会话仍无限期保持活动状态，使患者病历暴露于未经授权的物理访问风险中，违反了 HIPAA 安全规则协议。",
    "severity": "serious",
    "reference": "45 CFR § 164.312(a)(2)(iii)"
  },
  {
    "id": 369,
    "code": "HIPAA-024",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "患者门户共享管理员凭据",
    "description": "医疗诊所工作人员使用共享的通用登录 ID 访问患者门户后台，导致无法对记录更改进行审计，违反了 HIPAA 关于唯一用户的要求。",
    "severity": "critical",
    "reference": "45 CFR § 164.312(a)(1)"
  },
  {
    "id": 370,
    "code": "HIPAA-025",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "门户报告导出中的去标识化失效",
    "description": "门户导出功能在汇编统计报告时，使可识别的患者出生日期或邮政编码处于暴露状态，而没有进行适当的去标识化，违反了 HIPAA 隐私指南。",
    "severity": "serious",
    "reference": "45 CFR § 164.514(b)"
  },
  {
    "id": 371,
    "code": "CCPA-011",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "征求同意退出链接中的暗黑模式",
    "description": "合规要求的“不销售或共享我的个人信息”选项链接在排版上难以点击，或者被设计成与同意按钮相比呈未激活状态，违反了 CCPA。",
    "severity": "critical",
    "reference": "11 CCR § 7004"
  },
  {
    "id": 372,
    "code": "CCPA-012",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺乏全局隐私控制（GPC）验证日志",
    "description": "该网站的同意管理器未能维护内部日志，以证明用户的 GPC 信号得到了尊重且数据处理脚本已被停用，违反了加州 CPPA 的审计就绪要求。",
    "severity": "serious",
    "reference": "11 CCR § 7025"
  },
  {
    "id": 373,
    "code": "CCPA-013",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺少财务激励通知",
    "description": "电子商务弹窗以提供折扣为条件换取用户订阅简报（收集电子邮件），却没有提供可链接的、详细的“财务激励通知”，违反了 CCPA。",
    "severity": "serious",
    "reference": "11 CCR § 7016"
  },
  {
    "id": 374,
    "code": "CCPA-014",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "不符合规范的的雇员及求职者隐私通知",
    "description": "求职申请表单和内部局域网门户缺少详细的隐私披露，未能具体概述 CPRA 规定下如何处理雇员和求职者的个人数据。",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.100"
  },
  {
    "id": 375,
    "code": "CCPA-015",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "未披露敏感数据保留期限",
    "description": "隐私政策未能声明所收集的每类敏感个人信息的具体保留期限（或用于确定该期限的准则），违反了加州民事法典。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.130"
  },
  {
    "id": 376,
    "code": "CCPA-016",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺乏行使纠正权的数据控制台",
    "description": "用户帐户控制台未能提供清晰的自助服务界面或表单，无法让加州消费者更正记录中不准确的的个人数据，违反了 CPRA。",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.106"
  },
  {
    "id": 377,
    "code": "CCPA-017",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "隐式敏感地理位置定位追踪",
    "description": "该 Web 应用程序在未提出明确提示以限制使用敏感个人信息的情况下，追踪 1,850 英尺半径内的精确坐标，违反了 CCPA。",
    "severity": "critical",
    "reference": "11 CCR § 7027"
  },
  {
    "id": 378,
    "code": "CCPA-018",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "代理人请求处理程序披露不完整",
    "description": "隐私政策未能说明消费者通过第三方授权代理人行使权利时所需的核实程序和表单，违反了 CCPA。",
    "severity": "moderate",
    "reference": "11 CCR § 7063"
  },
  {
    "id": 379,
    "code": "CCPA-019",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺少隐私请求年度指标",
    "description": "处理 1000 万以上加州消费者个人信息的企业未能汇编和公布所收到及处理的请求的年度统计数据，违反了 CCPA 法规。",
    "severity": "moderate",
    "reference": "11 CCR § 7102"
  },
  {
    "id": 380,
    "code": "CCPA-020",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "默认对 18 岁以下消费者进行画像",
    "description": "可能被儿童访问的在线服务默认启用了行为画像、定向广告或后台地理位置追踪，违反了加州《适龄设计规范法案》。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 381,
    "code": "FTC-011",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "订阅欺骗性自动续订取消障碍",
    "description": "网页结账流程将用户纳入循环计费，但未能提供简单的客户端在线取消按钮，违反了 ROSCA 和 FTC 的执法指南。",
    "severity": "critical",
    "reference": "15 U.S.C. § 8403"
  },
  {
    "id": 382,
    "code": "FTC-012",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假紧迫感倒计时器",
    "description": "电子商务结账渲染倒计时器，声称“优惠即将过期”，但页面重新加载时会自动重置，被 FTC 归类为欺骗性暗黑模式。",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 383,
    "code": "FTC-013",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "预先勾选的非必要营销同意",
    "description": "注册或结账页面预先勾选了让用户订阅非必要促销或二级合作伙伴通信的复选框，违反了 FTC 第 5 条关于欺骗性行为的标准。",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 384,
    "code": "FTC-014",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "嵌入在客户端包中的虚假评论数据",
    "description": "产品落地页展示硬编码在 JavaScript 包中的客户评论，并配有随机日期以显得真实，违反了 FTC 关于欺骗性评论的规定。",
    "severity": "critical",
    "reference": "16 CFR Part 465"
  },
  {
    "id": 385,
    "code": "FTC-015",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "欺骗性的结账垃圾费用",
    "description": "在线支付流程隐瞒服务费、交易附加费或隐藏的行政成本，直到最终交易确认屏幕才显示，违反了 FTC 第 5 条标准。",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 386,
    "code": "FTC-016",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "自动向电子商务购物车添加商品",
    "description": "购物车界面在没有消费者明确选择的情况下，自动添加付费保修、运输保险或捐赠项目，违反了 FTC 反对暗黑模式的的指南。",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 387,
    "code": "FTC-017",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "金融门户缺乏多因素身份验证",
    "description": "提供消费者信用信息访问的 Web 控制台未能强制要求内部员工访问必须使用多因素身份验证（MFA），违反了 FTC《保障规则》。",
    "severity": "critical",
    "reference": "16 CFR § 314.4(c)(5)"
  },
  {
    "id": 388,
    "code": "FTC-018",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "儿童门户网站的无效家长同意流程",
    "description": "针对儿童的门户网站使用简单的复选框或未经核实的电子邮件回复来获取家长批准并收集数据，而不是采用 COPPA 规则下的法定核实方法。",
    "severity": "critical",
    "reference": "16 CFR § 312.5"
  },
  {
    "id": 389,
    "code": "FTC-019",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "健康搜索中的广告像素数据共享",
    "description": "非 HIPAA 医疗健康平台通过追踪器将用户的疾病搜索、查询或选择传输给广告网络，违反了 FTC《健康数据泄露通知规则》。",
    "severity": "critical",
    "reference": "16 CFR Part 318"
  },
  {
    "id": 390,
    "code": "FTC-020",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未标注的赞助内容",
    "description": "包含付费联盟链接的电子商务博文或评论未能显示清晰且显著的的披露标签（如“赞助”），违反了 FTC 背书规则。",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 391,
    "code": "TCPA-016",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "预先勾选的 SMS 同意输入",
    "description": "注册表单预先勾选了订阅促销 SMS 的复选框，违反了 TCPA 关于事先明确书面同意的要求。",
    "severity": "critical",
    "reference": "47 U.S.C. § 227"
  },
  {
    "id": 392,
    "code": "TCPA-017",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "不完整的 SMS 选择性加入法定条款",
    "description": "收集电话号码的线索表单缺少清晰的的法定语言，未能具体说明“可能会产生短信和流量费用”并列出发送频率，违反了 TCPA 指南。",
    "severity": "serious",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 393,
    "code": "TCPA-018",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "缺少移动运营商披露",
    "description": "SMS 提交输入框省略了关于运营商责任、隐私保护和支持获取指令的明确说明，违反了 CTIA 运营规范。",
    "severity": "serious",
    "reference": "CTIA Guidelines"
  },
  {
    "id": 394,
    "code": "TCPA-019",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "不符合规范的 SMS 退订系统",
    "description": "自动短信群发系统未能识别和处理标准的退订关键字回复（如 STOP、CANCEL 或 UNSUBSCRIBE），违反了 TCPA。",
    "severity": "critical",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 395,
    "code": "TCPA-020",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "外发电子邮件中缺少物理地址",
    "description": "门户注册自动发送的营销电子邮件未能在底部显示该组织的有效实体物理地址，违反了 CAN-SPAM。",
    "severity": "serious",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 396,
    "code": "TCPA-021",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "邮件页脚退订机制失效",
    "description": "系统通知电子邮件内部的的退订链接指向失效的服务器路径，或者强制用户登录后才能处理退订请求，违反了 CAN-SPAM 法规。",
    "severity": "critical",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 397,
    "code": "TCPA-022",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "电子邮件退订处理超出法定限制",
    "description": "数据库系统未能在 10 个工作日的法定窗口内将已退订的电子邮件从活动促销列表中移除，违反了 CAN-SPAM 规则。",
    "severity": "serious",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 398,
    "code": "TCPA-023",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "未经书面同意的自动拨号及短信群发",
    "description": "网页落地页收集电话联系人并用于自动拨号系统，却没有事先获得佛罗里达州消费者的明确书面签名同意，违反了佛罗里达州 FTSA。",
    "severity": "critical",
    "reference": "Fla. Stat. § 501.059"
  },
  {
    "id": 399,
    "code": "TCPA-024",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "缺乏 Do Not Call (DNC) 请求记录留存",
    "description": "电话营销数据库未能从提交之日起，将消费者的 Do Not Call (DNC) 请求记录保存至少 5 年的法定最低限期，违反了 TCPA。",
    "severity": "serious",
    "reference": "47 CFR § 64.1200(d)(6)"
  },
  {
    "id": 400,
    "code": "TCPA-025",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "在规定时间段外发送自动短信",
    "description": "营销服务器在收件人当地时间上午 8:00 之前或晚上 9:00 之后排队并发送自动 SMS 短信，违反了 TCPA 法规。",
    "severity": "serious",
    "reference": "47 CFR § 64.1200(c)(2)"
  },
  {
    "id": 401,
    "code": "GDPR-021",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "加载时预先勾选非必要 Cookie",
    "description": "在收到欧盟访问者的积极、明确同意之前，该网站就写入了非必要的分析或广告 Cookie，违反了 ePrivacy 和 GDPR。",
    "severity": "critical",
    "reference": "GDPR Art. 4(11) / ePrivacy Directive"
  },
  {
    "id": 402,
    "code": "GDPR-022",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Cookie 横幅中拒绝与接受选项不对等",
    "description": "Cookie 横幅使用视觉干扰或设计技巧隐藏“拒绝”按钮，或强制访问者打开子菜单以拒绝追踪，却允许一键接受，违反了 GDPR。",
    "severity": "critical",
    "reference": "GDPR Art. 7(4) / Guidelines 05/2020"
  },
  {
    "id": 403,
    "code": "GDPR-023",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少数据保护官（DPO）公开联系信息",
    "description": "该网站的隐私披露文件未能在显著位置展示根据 GDPR 要求指定的数据保护官（DPO）的官方联系信息。",
    "severity": "serious",
    "reference": "GDPR Art. 13(1)(b) & Art. 37"
  },
  {
    "id": 404,
    "code": "GDPR-024",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未能披露与云数据分处理商的 DPA 协议",
    "description": "数据表单收集欧盟个人数据输入，但未能核实并关联与云服务商和后端分处理器签署的“数据处理协议”（DPA），违反了 GDPR 第 28 条。",
    "severity": "serious",
    "reference": "GDPR Art. 28"
  },
  {
    "id": 405,
    "code": "GDPR-025",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺乏安全的个人数据访问请求（SAR）渠道",
    "description": "该平台未能提供用于处理个人数据访问请求（SAR）的安全且经过身份验证的渠道，导致意外泄露个人记录的风险，违反了 GDPR。",
    "severity": "serious",
    "reference": "GDPR Art. 15 / Right of Access"
  },
  {
    "id": 406,
    "code": "GDPR-026",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "无理拒绝个人数据删除请求",
    "description": "门户支持系统在没有有效法定理由的情况下，拒绝或拖延消费者的“被遗忘权”请求，违反了 GDPR 第 17 条的要求。",
    "severity": "serious",
    "reference": "GDPR Art. 17 / Right to be Forgotten"
  },
  {
    "id": 407,
    "code": "GDPR-027",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "隐私设置默认处于开放状态",
    "description": "用户个人资料控制台在注册后默认与其它用户或合作伙伴分享个人资料、位置文件或使用历史，违反了 GDPR 的默认隐私保护规则。",
    "severity": "serious",
    "reference": "GDPR Art. 25 / Privacy by Design"
  },
  {
    "id": 408,
    "code": "GDPR-028",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "不安全的电子邮件联系表单提交",
    "description": "网站联系表单在未加密的 HTTP 通道（而非 HTTPS）上外发个人用户的留言和标识符，违反了 GDPR 数据处理安全要求。",
    "severity": "critical",
    "reference": "GDPR Art. 32 / Security of Processing"
  },
  {
    "id": 409,
    "code": "GDPR-029",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未能执行必要的 DPIA 评估",
    "description": "对大规模行为数据进行追踪的 Web 应用程序未能完成并记录“数据保护影响评估”（DPIA），违反了 GDPR 要求。",
    "severity": "serious",
    "reference": "GDPR Art. 35"
  },
  {
    "id": 410,
    "code": "GDPR-030",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少标准契约条款的跨境数据传输",
    "description": "用户记录被传输到位于第三方国家（缺少数据充足性决议）的服务器，而没有建立相应的标准契约条款（SCC），违反了 GDPR。",
    "severity": "critical",
    "reference": "GDPR Art. 44-46"
  },
  {
    "id": 411,
    "code": "PCI-019",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "在数据库中保留 CVV 数据",
    "description": "支付数据库在支付授权完成后归档卡片验证码（CVV/CVC）号码，构成了严重的 PCI DSS 违规。",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 3.2.2"
  },
  {
    "id": 412,
    "code": "PCI-020",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "不安全的 TLS 密码套件配置",
    "description": "电子商务支付服务器接受包含不安全密码的 TLS 1.0 或 TLS 1.1 连接，未能满足 PCI 在传输过程中对数据加密的要求。",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 4.2.1"
  },
  {
    "id": 413,
    "code": "PCI-021",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "支付结账页面缺少 CSP 响应头",
    "description": "支付结账页面未能实施“内容安全政策”（CSP）响应头，使表单输入面临脚本注入漏洞的风险，违反了 PCI 规则。",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 6.4.3"
  },
  {
    "id": 414,
    "code": "PCI-022",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺乏对外部 JavaScript 脚本的审计",
    "description": "结账页面直接在包含信用卡表单的页面上加载第三方营销或实用脚本（如聊天框）而未进行审核，违反了 PCI DSS。",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 6.4.3"
  },
  {
    "id": 415,
    "code": "PCI-023",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "支付表单篡改监测缺失",
    "description": "支付集成系统缺乏自动化的、实时的完整性监测，无法检测结账页面上的篡改、响应头更改或脚本注入，违反了 PCI 标准。",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 11.6.1"
  },
  {
    "id": 416,
    "code": "PCI-024",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "管理后台使用默认凭据",
    "description": "系统后台或连接的商户控制面板运行着厂商默认的密码或标准的管理员登录凭据，违反了 PCI 安全部署协议。",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 2.1.1"
  },
  {
    "id": 417,
    "code": "PCI-025",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "共享的支付操作员会话",
    "description": "行政账单工作人员在交易管理过程中共享活动的登录会话或多用户帐户，违反了 PCI 责任归属指令。",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 8.2.1"
  },
  {
    "id": 418,
    "code": "PCI-026",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "支付技术栈中存在已知的 CVE 漏洞",
    "description": "支付路由服务运行在含有公开、高危 CVE 记录的陈旧服务器框架上，违反了 PCI 的漏洞安全管理要求。",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 6.2.1"
  },
  {
    "id": 419,
    "code": "PCI-027",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "明文存储主账号（PAN）信用卡号",
    "description": "内部数据库直接在明文列中记录并保存完整的信用卡主账号（PAN），而没有实施强加密算法，违反了 PCI 标准。",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 3.4"
  },
  {
    "id": 420,
    "code": "PCI-028",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺少渗透测试证明文件",
    "description": "安全政策页面未能展示年度独立的、外部渗透测试认证证明，未能满足 PCI 验证清单。",
    "severity": "moderate",
    "reference": "PCI DSS v4.0 Requirement 11.4"
  },
  {
    "id": 421,
    "code": "STATE-011",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "德克萨斯州 TDPSA 小企业敏感数据处理同意授权",
    "description": "收集德克萨斯州消费者敏感记录的小型企业门户在出售数据前未能获得事先同意，违反了 TDPSA 规定。",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 541.055"
  },
  {
    "id": 422,
    "code": "STATE-012",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "弗吉尼亚州 VCDPA 权利申诉升级途径缺失",
    "description": "隐私政策未能概述消费者对数据权利请求的拒绝处理结果进行申诉的明确程序，违反了弗吉尼亚州 VCDPA 法规。",
    "severity": "serious",
    "reference": "Va. Code § 59.1-577"
  },
  {
    "id": 423,
    "code": "STATE-013",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "科罗拉多州 CPA 全局退出机制识别缺失",
    "description": "面向科罗拉多州消费者的电子商务网站未能自动处理和尊重全局性通用退出机制（UOOM），违反了 CPA 规则。",
    "severity": "critical",
    "reference": "4 ... (Colorado CPA, 4 CCR 904-3 Rule 5.01)"
  },
  {
    "id": 424,
    "code": "STATE-014",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "特拉华州 DPDPA 未经同意进行非处方健康数据传输",
    "description": "消费者健康数据库在未经明确同意的情况下，将对非处方健康诊断的搜索查询传输给第三方广告经纪商，违反了特拉华州 DPDPA。",
    "severity": "critical",
    "reference": "6 Del. C. § 12D-106"
  },
  {
    "id": 425,
    "code": "STATE-015",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "俄勒冈州 OCPA 隐私政策中第三方名单不全",
    "description": "隐私政策披露的是一般的数据处理器类别，而不是具体列出接收用户记录的第三方公司的法定名称，违反了俄勒冈州 OCPA。",
    "severity": "moderate",
    "reference": "ORS § 646A.825"
  },
  {
    "id": 426,
    "code": "STATE-016",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "新泽西州 NJPA 敏感数据销售披露不完整",
    "description": "该门户网站在没有显示清晰通知并获得选择性加入同意的情况下，出售含有敏感信息的新泽西州消费者记录，违反了 NJPA 指令。",
    "severity": "critical",
    "reference": "N.J.S.A. 56:8-166"
  },
  {
    "id": 427,
    "code": "STATE-017",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "犹他州 UCPA 消费者权利披露不全",
    "description": "隐私声明漏掉了详细说明犹他州消费者权利、验证时限和退出处理步骤的的法定通知，违反了 UCPA 规则。",
    "severity": "moderate",
    "reference": "Utah Code § 13-61-302"
  },
  {
    "id": 428,
    "code": "STATE-018",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "新罕布什尔州 NHPA 缺少指定的隐私主管",
    "description": "处理新罕布什尔州公民数据的大型数据处理门户网站未能指定公开的合规联系人，违反了 NHPA 监管指令。",
    "severity": "moderate",
    "reference": "N.H. Rev. Stat. § 507-H:6"
  },
  {
    "id": 429,
    "code": "STATE-019",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "蒙大拿州 MTCDPA 针对少年数据处理的同意机制缺失",
    "description": "处理 13-16 岁蒙大拿州消费者个人信息的网站未能获得明确的、肯定的选择性加入同意，违反了 MTCDPA 法律。",
    "severity": "critical",
    "reference": "Mont. Code § 30-14-311"
  },
  {
    "id": 430,
    "code": "STATE-020",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "内布拉斯加州 NEDPA 隐私请求答复时限披露缺失",
    "description": "客户支持文档未能承诺在内布拉斯加州 NEDPA 规定的 45 天法定截止日期内答复消费者的隐私请求提交。",
    "severity": "moderate",
    "reference": "Neb. Rev. Stat. § 87-301"
  },
  {
    "id": 431,
    "code": "FIN-011",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "金融 DORA 缺少 ICT 安全事件通知程序披露",
    "description": "金融系统未能记录和说明向监管机构通知关键数字服务中断事件的处理程序，违反了 DORA 指令。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 19"
  },
  {
    "id": 432,
    "code": "FIN-012",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "GLBA 规范下客户文件明文传输/未加密",
    "description": "贷款处理门户网站存储上传的的纳税申报单或银行对账单时未能实施 AES-256 等效加密，违反了 GLBA 安全保障要求。",
    "severity": "critical",
    "reference": "16 CFR § 314.4(c)(1)"
  },
  {
    "id": 433,
    "code": "FIN-013",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "企业所有权 CTA 受益人申报披露缺失",
    "description": "公司注册及客户控制面板接口未能建立安全且经过验证的结构来记录实益所有权数据，违反了《企业透明度法案》（CTA）。",
    "severity": "serious",
    "reference": "31 U.S.C. § 5336"
  },
  {
    "id": 434,
    "code": "FIN-014",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "上市企业 SEC 10-K 重大网络安全威胁披露不足",
    "description": "上市公司的投资者关系页面托管的 SEC 归档文件中，遗漏了对重大网络安全风险的详细评估，违反了 SEC 规则。",
    "severity": "serious",
    "reference": "SEC Cybersecurity Rule (Form 10-K Item 1C)"
  },
  {
    "id": 435,
    "code": "FIN-015",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FINRA 2210 违规宣传欺骗性收益率",
    "description": "经纪交易商门户页面展示推广性质的资产收益率或增长预测，却没有在同等显著位置呈现风险免责声明，违反了 FINRA 规则 2210。",
    "severity": "serious",
    "reference": "FINRA Rule 2210"
  },
  {
    "id": 436,
    "code": "FIN-016",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "上市企业缺少 SOX 内部控制评估披露",
    "description": "投资者关系门户网站未能发布评估内部财务追踪和运营控制审计的年度管理报告，违反了 SOX 第 404 条。",
    "severity": "moderate",
    "reference": "SOX Section 404"
  },
  {
    "id": 437,
    "code": "FIN-017",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "金融 DORA 排除第三方外包风险登记",
    "description": "金融应用程序关联到外部 API 或服务，但未能保存第三方 ICT 提供商及其安全认证的统一登记册，违反了 DORA。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30"
  },
  {
    "id": 438,
    "code": "FIN-018",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "金融 GLBA 年度选择性退出通知不全",
    "description": "消费金融银行门户网站漏掉了关于限制与关联公司共享非公开个人信息的年度选择性退出选择权的清晰指令，违反了 GLBA 规则。",
    "severity": "serious",
    "reference": "16 CFR § 313.9"
  },
  {
    "id": 439,
    "code": "FIN-019",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "交易日志存储不符合 FINRA 4511 的 WORM 格式要求",
    "description": "经纪商交易系统将交易记录和客户通信日志存储在标准可修改数据库中，而不是一次写入多次读取（WORM）的介质中，违反了 FINRA。",
    "severity": "critical",
    "reference": "FINRA Rule 4511"
  },
  {
    "id": 440,
    "code": "FIN-020",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "期货 CFTC 1.31 违规清除五年内交易记录",
    "description": "交易门户网站未能配置电子记录留存系统，以对金融日志和交易确认书实施严格的五年保存期限政策，违反了 CFTC 规则 1.31。",
    "severity": "critical",
    "reference": "CFTC Rule 1.31"
  },
  {
    "id": 441,
    "code": "OPS-011",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "缺少 AI 情绪情感分析提示",
    "description": "AI 智能客服机器人对用户的消息输入运行情绪检测或情感分析算法，但没有向用户显示清晰的提示警告，违反了《欧盟 AI 法案》。",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(2)"
  },
  {
    "id": 442,
    "code": "OPS-012",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "违规运行禁止的 AI 生物识别分类系统",
    "description": "在线用户注册界面通过用户上传的脸部照片提取生物特征并对用户进行分类，缺乏明确的法定法律依据，违反了《欧盟 AI 法案》。",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 5(1)(c)"
  },
  {
    "id": 443,
    "code": "OPS-013",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "AI 生成内容缺少元数据水印",
    "description": "生成式 AI 接口在输出图像或文本时，未能嵌入标准的元数据水印以标明该内容由 AI 生成，违反了《欧盟 AI 法案》的指令。",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(3)"
  },
  {
    "id": 444,
    "code": "OPS-014",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "欧盟 DSA 算法内容流推荐机制披露",
    "description": "社交流或内容门户网站未能披露其推荐系统所使用的主要推荐参数和排名标准，违反了《数字服务法案》（DSA）的规则。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 27"
  },
  {
    "id": 445,
    "code": "OPS-015",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "欧盟 DSA 广告档案库公示缺失",
    "description": "大型发布平台未能托管一个公开的、可搜索的广告档案库来展示活动的广告、赞助商名称和定向投放指标，违反了《数字服务法案》。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 39"
  },
  {
    "id": 446,
    "code": "OPS-016",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "缺少对于限流/影子禁言的申诉救济门户",
    "description": "社区门户在限制用户发布的内容（影子禁言）时，未能通知作者并提供清晰的的内部投诉处理门户，违反了《数字服务法案》。",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 20"
  },
  {
    "id": 447,
    "code": "OPS-017",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "未接受/集成 eIDAS 2.0 欧洲数字身份钱包",
    "description": "设有身份准入限制的的平台未能集成接受官方欧洲数字身份钱包以进行验证的机制，违反了 eIDAS 2.0 指令。",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 6a"
  },
  {
    "id": 448,
    "code": "OPS-018",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "缺少 CRA 安全漏洞上报网关",
    "description": "数字硬件或软件产品门户网站未能提供一个显著、可用的安全漏洞报告接口，违反了《网络韧性法案》（CRA）。",
    "severity": "serious",
    "reference": "Cyber Resilience Act (CRA), Art. 11"
  },
  {
    "id": 449,
    "code": "OPS-019",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "巴西 LGPD 缺少在 ANPD 的 DPO 备案登记",
    "description": "面向巴西用户的门户网站收集客户信息，但未能将其指定的 DPO 信息在国家 ANPD 机构进行登记和公示，违反了 LGPD。",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 41"
  },
  {
    "id": 450,
    "code": "OPS-020",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "印度 DPDP 针对未成年人的监护人同意验证缺失",
    "description": "收集 18 岁以下印度公民数据输入的门户网站未能实施经过验证的父母或监护人同意结构，违反了《数字个人数据保护法案》（DPDP）。",
    "severity": "critical",
    "reference": "Digital Personal Data Protection Act (DPDP Act), Sec. 9"
  },
  {
    "id": 451,
    "code": "UAEPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "阿拉伯联合酋长国跨境数据传输缺乏明确同意",
    "description": "该网站在未获得明确同意或展示充分保护措施的情况下，将阿联酋居民的个人数据传输至阿联酋境外的服务器，违反了阿联酋第 45 号联邦法令。",
    "severity": "critical",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 22"
  },
  {
    "id": 452,
    "code": "UAEPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "阿联酋缺少本地数据保护官（DPO）联系人信息",
    "description": "面向阿联酋消费者的网站在处理大规模个人信息时未能指定并公布本地 DPO 的联系信息，违反了阿联酋 PDPL。",
    "severity": "moderate",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 10"
  },
  {
    "id": 453,
    "code": "UAEPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "不符合规范的阿联酋儿童同意授权流程",
    "description": "该门户网站收集阿联酋儿童的个人数据，但没有验证父母或监护人的同意授权结构，违反了阿联酋儿童保护法。",
    "severity": "critical",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 6"
  },
  {
    "id": 454,
    "code": "UAEPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未能维护阿联酋数据处理记录登记册",
    "description": "该组织的后台系统未能记录和维护针对阿联酋业务的个人数据处理活动记录（ROPA），违反了阿联酋 PDPL 的要求。",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 11"
  },
  {
    "id": 455,
    "code": "UAEPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "阿联酋数据泄露通知时限不合规",
    "description": "该网站的条款和安全政策未能承诺在发生威胁数据隐私的安全泄露事件时立即通知阿联酋数据办公室。",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 9"
  },
  {
    "id": 456,
    "code": "UAEPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "阿联酋缺少直接退出营销画像的机制",
    "description": "客户端控制面板未能为阿联酋用户提供清晰的一键退出自动决策和营销画像的机制，违反了阿联酋 PDPL。",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 18"
  },
  {
    "id": 457,
    "code": "SDPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未在沙特国家数据门户进行注册登记",
    "description": "处理沙特个人记录的组织未能将其数据库在沙特数据和人工智能管理局（SDAIA）门户进行登记注册，违反了沙特 PDPL。",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 32"
  },
  {
    "id": 458,
    "code": "SDPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "沙特阿拉伯直接营销缺少明确的同意授权",
    "description": "面向沙特消费者的营销订阅表单在发送促销优惠前未能获得单独的、明确的同意授权，违反了沙特 PDPL。",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 28"
  },
  {
    "id": 459,
    "code": "SDPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "在沙特境外违规存储敏感个人数据",
    "description": "网站将沙特国民的健康或敏感财务记录传输并存储在沙特境外的云服务器上，而未取得法定的 SDAIA 授权，构成了严重违规。",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 29"
  },
  {
    "id": 460,
    "code": "SDPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未能向沙特消费者披露数据处理目的",
    "description": "隐私政策未能将数据收集字段与在沙特阿拉伯合规所需的特定的、合法的处理目的明确关联起来。",
    "severity": "serious",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 5"
  },
  {
    "id": 461,
    "code": "SDPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "沙特数据删除请求响应时限不合规",
    "description": "客户支持门户未能按照沙特法规规定的法定时间框架，处理并确认沙特居民提交的的个人数据删除请求。",
    "severity": "serious",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 21"
  },
  {
    "id": 462,
    "code": "SDPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "沙特阿拉伯公民缺少追踪的明确选择性同意",
    "description": "该网站在未获得明确的、主动的选择性同意前，对沙特访问者运行行为追踪或分析脚本，违反了沙特 PDPL。",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 17"
  },
  {
    "id": 463,
    "code": "ILPA-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未根据以色列法律注册数据库",
    "description": "该平台在未进行法定注册的情况下，在包含超过 10,000 人的数据库中处理以色列公民的个人信息，违反了以色列《隐私法》。",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 8"
  },
  {
    "id": 464,
    "code": "ILPA-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未能根据以色列法律披露提交数据的自愿性",
    "description": "网页表单未能明确告知以色列消费者他们提供个人信息是法定义务还是完全自愿的，违反了以色列《隐私保护法》。",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 11"
  },
  {
    "id": 465,
    "code": "ILPA-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "以色列跨境数据传输不合规",
    "description": "用户数据库在未满足以色列传输条例规定的法定例外条件的情况下，将以色列记录传输到无法确保同等隐私保护水平的第三国。",
    "severity": "serious",
    "reference": "Israel Privacy Protection Regulations (Transfer of Data to Databases Abroad) 5761-2001"
  },
  {
    "id": 466,
    "code": "ILPA-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少以色列法规要求的网络安全审计",
    "description": "处理以色列用户记录的企业未能对其数据库处理基础设施进行年度独立的网络安全审计并记录，违反了以色列法规。",
    "severity": "serious",
    "reference": "Israel Privacy Protection Regulations (Data Security) 5777-2017"
  },
  {
    "id": 467,
    "code": "ILPA-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "以色列未注册的非法直接邮寄广告",
    "description": "电子商务网站在未将目标数据库注册为直接邮寄数据库的情况下，根据特征画像向以色列公民发送自动营销电子邮件，违反了以色列法律。",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 17C"
  },
  {
    "id": 468,
    "code": "TRKV-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "土耳其缺少 Cookie 追踪的明确同意授权",
    "description": "在获得明确的、主动的选择性同意前，Cookie 同意管理器未能阻止针对土耳其访问者的分析或广告脚本，违反了土耳其 KVKK 指南。",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 5"
  },
  {
    "id": 469,
    "code": "TRKV-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未在土耳其 VERBIS 数据库注册系统进行登记",
    "description": "处理土耳其居民个人数据且超出法定门槛的外国公司未能向数据控制者登记系统（VERBIS）进行注册，违反了 KVKK 规则。",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 16"
  },
  {
    "id": 470,
    "code": "TRKV-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "土耳其数据泄露报告时间不合规",
    "description": "安全事件协议未能强制要求在法定的 72 小时窗口内向土耳其个人数据保护委员会（KVKK）报告数据泄露事件。",
    "severity": "serious",
    "reference": "KVKK Board Decision on Breach Notification Timelines (Decision No. 2019/10)"
  },
  {
    "id": 471,
    "code": "TRKV-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少土耳其隐私政策澄清文本",
    "description": "网页表单未能向土耳其消费者呈现专门的“澄清文本”（Aydınlatma Metni）以概述权利和处理渠道（与通用政策相分离），违反了 KVKK。",
    "severity": "serious",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 10"
  },
  {
    "id": 472,
    "code": "TRKV-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未经土耳其委员会同意的非法跨境数据传输",
    "description": "网站数据库托管服务在未获得明确同意或展示标准承诺协议的情况下，将土耳其用户的个人记录路由到土耳其境外的服务器，违反了 KVKK。",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 9"
  },
  {
    "id": 473,
    "code": "CHFADP-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "瑞士缺少自动决策的明确披露",
    "description": "该网站针对瑞士居民使用自动用户评分或决策系统，但未展示清晰的披露信息并提供人工审核界面，违反了瑞士 FADP。",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 21"
  },
  {
    "id": 474,
    "code": "CHFADP-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "外国控制者在瑞士缺少指定的代表人",
    "description": "大规模处理瑞士消费者记录的外国组织未能指定位于瑞士本地的代表，违反了瑞士 FADP。",
    "severity": "moderate",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 14"
  },
  {
    "id": 475,
    "code": "CHFADP-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "未披露瑞士数据处理登记册分项",
    "description": "未能按照瑞士标准维护数据处理活动记录（ROPA）的企业系统将面临经修订的 FADP 规定下的监管合规法律责任。",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 12"
  },
  {
    "id": 476,
    "code": "CHFADP-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "瑞士数据跨境传输缺少充足性保护措施",
    "description": "网站数据库备份服务在未实施经过验证的的合同条款的情况下，将瑞士用户的个人文件传输到保护水平不足的国家的服务器上，违反了瑞士 FADP。",
    "severity": "critical",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 16"
  },
  {
    "id": 477,
    "code": "CHFADP-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "瑞士敏感个人数据处理缺少明确同意授权",
    "description": "收集瑞士国民敏感信息（如宗教观点、政治见解、工会身份）的表单未能获得主动的、明确的同意授权，违反了 FADP。",
    "severity": "critical",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 6"
  },
  {
    "id": 478,
    "code": "CHFADP-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "瑞士数据泄露事件缺少快速上报机制",
    "description": "系统安全事件日志未能支持在发生给瑞士用户带来高风险的数据泄露事件时，快速向联邦数据保护和信息专员（FDPIC）通报，违反了 FADP。",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 24"
  },
  {
    "id": 479,
    "code": "UKGDPR-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "数据传输缺少英国 GDPR 附录",
    "description": "网站数据库服务在未实施法定的英国《国际数据传输协议》（IDTA）或欧盟标准契约条款（SCC）的英国附录的情况下，将英国用户的记录传输到国际服务器。",
    "severity": "critical",
    "reference": "UK Data Protection Act 2018 / UK GDPR"
  },
  {
    "id": 480,
    "code": "UKGDPR-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少英国 ICO 费用注册登记",
    "description": "处理英国公民个人数据的外国公司未能向英国信息专员办公室（ICO）进行注册登记并缴纳数据保护费，违反了英国法律。",
    "severity": "moderate",
    "reference": "UK Data Protection (Charges and Information) Regulations 2018"
  },
  {
    "id": 481,
    "code": "UKGDPR-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "英国 GDPR 框架下缺少指定的英国代表人",
    "description": "面向英国客户开展业务的外国公司未能指定并公布英国本地代表，以代表控制者行使职责，违反了英国 GDPR 的要求。",
    "severity": "serious",
    "reference": "UK GDPR, Art. 27"
  },
  {
    "id": 482,
    "code": "UKGDPR-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "不符合英国《适龄设计规范》的儿童数据处理",
    "description": "面向英国用户的网站在未默认建立高水平隐私保护的情况下，收集 18 岁以下儿童的信息，违反了英国《儿童规范》。",
    "severity": "critical",
    "reference": "UK Age-Appropriate Design Code (Children's Code)"
  },
  {
    "id": 483,
    "code": "UKOSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "针对有害内容缺少年龄验证机制（英国 OSA）",
    "description": "展示用户生成媒体内容的内容门户网站未能部署健全的的年龄确认验证程序，以限制未成年人访问有害文件，违反了英国 OSA。",
    "severity": "critical",
    "reference": "UK Online Safety Act 2023"
  },
  {
    "id": 484,
    "code": "UKOSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少英国在线安全内容举报渠道",
    "description": "提供交互式用户交流的网站未能展示显著、可用的举报入口，供英国用户举报非法或有害内容，违反了在线安全指令。",
    "severity": "serious",
    "reference": "UK Online Safety Act 2023"
  },
  {
    "id": 485,
    "code": "AUSPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未能执行澳大利亚《隐私法》下的数据擦除请求",
    "description": "支持系统未能为澳大利亚公民提供专用的、法定的渠道来请求销毁或去标识化其个人记录，违反了 APP。",
    "severity": "serious",
    "reference": "Australia Privacy Act 1988 - Australian Privacy Principles (APPs)"
  },
  {
    "id": 486,
    "code": "AUSPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "澳大利亚跨境数据披露不符合规范",
    "description": "在未采取合理步骤确保接收方合规的情况下，将澳大利亚公民的个人记录传输到国际托管目的地，违反了 APP 8。",
    "severity": "critical",
    "reference": "Australia Privacy Act 1988 - APP 8"
  },
  {
    "id": 487,
    "code": "AUSPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "澳大利亚缺少营销 Cookie 追踪的明确选择性同意",
    "description": "该电子商务网站在未获得明确的、主动的选择性同意前，即向澳大利亚用户执行用于定向广告的追踪像素，违反了最新的《隐私法》改革。",
    "severity": "critical",
    "reference": "Australia Privacy Act 1988 Reforms"
  },
  {
    "id": 488,
    "code": "AUSPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "澳大利亚隐私政策未披露第三方数据托管所在地",
    "description": "隐私政策未能明确披露个人记录可能被披露或托管的目标国家名单，违反了澳大利亚 APP 1。",
    "severity": "moderate",
    "reference": "Australia Privacy Act 1988 - APP 1"
  },
  {
    "id": 489,
    "code": "AUSPA-005",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "违反澳大利亚《反垃圾邮件法》的退订规定",
    "description": "电子邮件营销系统在澳大利亚公民退订后的 5 个工作日法定处理窗口期过后，仍继续向其发送促销信息，违反了《反垃圾邮件法》。",
    "severity": "serious",
    "reference": "Australia Spam Act 2003"
  },
  {
    "id": 490,
    "code": "AUSPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "APP 7 框架下未提供选择性退出的非法直接营销",
    "description": "该网站利用个人画像向澳大利亚消费者推广服务，但未在每个营销场景下提供显著的、免费的退出机制，违反了 APP 7。",
    "severity": "serious",
    "reference": "Australia Privacy Act 1988 - APP 7"
  },
  {
    "id": 491,
    "code": "AUSPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "澳大利亚用户记录缺少数据质量核实机制",
    "description": "该数据库未能运行自动化验证程序，以确保从澳大利亚居民收集的个人数据保持准确、完整和最新状态，违反了 APP 10。",
    "severity": "moderate",
    "reference": "Australia Privacy Act 1988 - APP 10"
  },
  {
    "id": 492,
    "code": "NZPR-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未披露新西兰隐私主管的联系方式",
    "description": "处理新西兰公民个人信息的网站未能指定并公布法定隐私主管的联系信息，违反了新西兰《隐私法》。",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 1"
  },
  {
    "id": 493,
    "code": "NZPR-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "新西兰数据泄露事件缺少即时通报机制",
    "description": "安全系统未能支持在发生可能给新西兰居民造成严重危害的数据泄露事件时，快速通报新西兰隐私专员，违反了《隐私法》。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, Part 6"
  },
  {
    "id": 494,
    "code": "NZPR-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少新西兰消费者数据访问控制台（IPP 6）",
    "description": "帐户控制面板未能为新西兰用户提供访问和下载其记录中所有个人文件完整副本的清晰途径，违反了 IPP 6。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, IPP 6"
  },
  {
    "id": 495,
    "code": "NZPR-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "在保护不力司法管辖区违规存储新西兰用户记录（IPP 12）",
    "description": "新西兰消费者的个人记录被存储在无法提供与新西兰法律同等保护水平的境外云服务器上，违反了 IPP 12。",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020, IPP 12"
  },
  {
    "id": 496,
    "code": "NZPR-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "过度收集新西兰居民的个人数据",
    "description": "在线表单要求新西兰居民提供与其业务交易无直接关联的过多的、非必要的个人信息，违反了新西兰 IPP 1。",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 1"
  },
  {
    "id": 497,
    "code": "SGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "新加坡缺少法定 DPO 联系信息披露",
    "description": "面向新加坡用户的网站在其隐私政策页面中未列出指定数据保护官（DPO）的办公地址或电子邮件，违反了 PDPA。",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012, Sec. 11"
  },
  {
    "id": 498,
    "code": "SGPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未能规范记录新加坡默示同意规则",
    "description": "该门户网站在没有事先进行风险评估或规范记录通知机制的情况下，根据新加坡的“默示同意”规则处理用户数据，违反了 PDPA。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 Amendments"
  },
  {
    "id": 499,
    "code": "SGPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "不符合新加坡 PDPA 的数据可携性操作",
    "description": "处理新加坡用户数据的客户端控制面板未能提供可导出的、自动化的数据可携性传输通道，违反了 PDPA。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 Portability Provisions"
  },
  {
    "id": 500,
    "code": "SGPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "新加坡数据泄露通报时间不合规（3日内）",
    "description": "事件响应机制未能强制要求在确认发生符合上报标准的数据泄露事件后，在 3 个日历日内通知新加坡 PDPC，违反了法定时间限制。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012, Sec. 26D"
  },
  {
    "id": 501,
    "code": "SGPD-008",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "违反新加坡 Do Not Call (DNC) 勿呼叫登记规定",
    "description": "电话营销集成系统在未与新加坡国家 DNC 登记册核对过滤的情况下，向新加坡电话号码发送推广电话或短信，违反了新加坡 PDPA。",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 - DNC Provisions"
  },
  {
    "id": 502,
    "code": "MYPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少马来西亚 PDPA 要求的双语隐私通知",
    "description": "面向马来西亚用户的网站未能以双语（马来语和英语）展示其隐私政策，违反了马来西亚 PDPA 的明确要求。",
    "severity": "moderate",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 7(3)"
  },
  {
    "id": 503,
    "code": "MYPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "马来西亚 PDPA 框架下的非法跨境数据传输",
    "description": "用户数据库在没有法定例外条件且未获得明确同意的情况下，将马来西亚公民的个人记录传输到马来西亚境外的服务器上，违反了 PDPA。",
    "severity": "critical",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 129"
  },
  {
    "id": 504,
    "code": "MYPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "马来西亚缺少数据准确性验证机制",
    "description": "网站数据库未能实施相应机制以确保收集自马来西亚用户的个人记录得到准确处理并保持最新，违反了 PDPA。",
    "severity": "moderate",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 11"
  },
  {
    "id": 505,
    "code": "MYPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "不符合规范的马来西亚敏感个人数据处理",
    "description": "网页表单收集马来西亚用户的敏感个人信息（如健康状况或政治派别），但未获得明确的、签署的书面同意，违反了 PDPA。",
    "severity": "critical",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 40"
  },
  {
    "id": 506,
    "code": "THPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未披露泰国 DPO 联系及处理规程",
    "description": "面向泰国消费者的网站在其页面中未能显著公布指定数据保护官（DPO）的联系及沟通方式，违反了泰国 PDPA 的要求。",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 41"
  },
  {
    "id": 507,
    "code": "THPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少泰国用户撤销同意授权的界面",
    "description": "用户个人控制面板未能为泰国公民提供一种撤销同意的简易机制（应当与给予同意一样简便），违反了 PDPA。",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 19"
  },
  {
    "id": 508,
    "code": "THPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "非法跨境传输泰国用户的个人数据",
    "description": "数据库备份服务将泰国用户的个人数据路由传输到国外的服务器，而不符合数据保护充足性规则，且未获得同意，违反了泰国 PDPA。",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 28"
  },
  {
    "id": 509,
    "code": "THPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "泰国数据处理活动登记册记录缺失",
    "description": "处理泰国公民记录的组织未能记录并保存数据库操作和处理目的评估日志，违反了 PDPA 指令。",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 39"
  },
  {
    "id": 510,
    "code": "THPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经明确同意收集泰国敏感个人数据",
    "description": "在线信息收集表单收集泰国居民的指纹/生物特征、犯罪记录或健康数据，但未获得明确的主动同意，违反了 PDPA 法规。",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 26"
  },
  {
    "id": 511,
    "code": "VNDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "越南数据跨境传输缺少事前影响评估",
    "description": "向越南境外传输越南个人数据的组织未能向公安部提交跨境传输影响评估报告，违反了越南第 13 号法令。",
    "severity": "critical",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 25"
  },
  {
    "id": 512,
    "code": "VNDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "不符合规范的越南儿童数据处理",
    "description": "收集 7 岁或以上越南儿童个人数据的 Web 应用程序未能同时获得儿童本人及父母/监护人的双重同意，违反了第 13 号法令。",
    "severity": "critical",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 20"
  },
  {
    "id": 513,
    "code": "VNDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "越南业务缺少本地化服务器存储",
    "description": "根据网络安全法要求，企业系统在越南境内处理越南公民的数据时，未能建立本地服务器存在来存储这些数据库记录。",
    "severity": "critical",
    "reference": "Vietnam Law on Cybersecurity No. 24/2018/QH14, Art. 26"
  },
  {
    "id": 514,
    "code": "VNDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未按照越南第 13 号法令披露 DPO 信息",
    "description": "处理越南公民敏感个人信息的组织在其隐私政策中未能指定数据保护部门或 DPO 联系人，违反了第 13 号法令。",
    "severity": "moderate",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 28"
  },
  {
    "id": 515,
    "code": "VNDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "越南缺少经验证的的数据库安全评估",
    "description": "处理越南用户记录的平台未能进行年度数据库系统安全评估并维护验证日志以备监管检查，违反了第 13 号法令。",
    "severity": "serious",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 27"
  },
  {
    "id": 516,
    "code": "DPDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "印度缺少多语言隐私通知",
    "description": "面向印度用户的网站未能提供查看印度宪法规定的全部 22 种法定语言版本的隐私披露文档的选择切换，违反了 DPDP 法案。",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 5(3)"
  },
  {
    "id": 517,
    "code": "DPDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未针对印度建立本地化的争议纠正与解决渠道",
    "description": "支持门户未能向印度消费者提供提起申诉并联系本地申诉官的明确机制，违反了 DPDP 法案的规定。",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 13"
  },
  {
    "id": 518,
    "code": "DPDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "印度表单中的处理目的披露不够具体合规",
    "description": "在线表单在收集印度居民的个人信息时，未能同时呈现独立的、清晰的通知，具体说明收集哪些数据以及为何收集，违反了 DPDP 法案。",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 5(1)"
  },
  {
    "id": 519,
    "code": "DPDP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "印度未披露 DPO 和同意授权管理器联系人信息",
    "description": "面向印度的隐私披露文件漏掉了 DPO 详细信息，且未能支持指定经过认证的同意授权管理器，违反了 DPDP 的要求。",
    "severity": "moderate",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 6"
  },
  {
    "id": 520,
    "code": "DPDP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "不符合规范的印度未成年人追踪 Cookie 处理",
    "description": "该网站向经判定为 18 岁以下印度儿童的用户执行行为监控 Cookie 或投放定向广告算法，违反了 DPDP 法案的明确禁止规定。",
    "severity": "critical",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 9(2)"
  },
  {
    "id": 521,
    "code": "DPDP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "印度数据处理商/外包供应商处缺少数据擦除控制",
    "description": "该数据库未能将印度用户提交的数据擦除请求自动广播同步给第三方供应商及合作伙伴分处理器，违反了 DPDP 法案的要求。",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 12"
  },
  {
    "id": 522,
    "code": "JPAP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "日本 APPI 框架下缺少跨境信息披露",
    "description": "隐私政策未能告知日本用户其记录存储所在的目标国家名称，以及接收服务器实施的安全系统保障措施，违反了 APPI。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 28"
  },
  {
    "id": 523,
    "code": "JPAP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "日本数据库安全管理措施披露不完整",
    "description": "公司隐私政策未能列出为保护存储的日本用户记录而采取的具体的行政、技术和物理安全管理措施，违反了 APPI。",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 32"
  },
  {
    "id": 524,
    "code": "JPAP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "日本处理假名个人信息缺少同意授权",
    "description": "该网站在未满足 APPI 披露要求的情况下，对日本访问者的假名用户数据（例如与服务器画像关联的 Cookie ID）进行追踪和处理。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 41"
  },
  {
    "id": 525,
    "code": "JPAP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "不符合规范的日本个人可关联信息处理",
    "description": "Web 数据库将用户标识符传输给第三方，且明知这些标识符将在日本与可识别的个人记录相关联，却没有验证用户同意，违反了 APPI。",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 31"
  },
  {
    "id": 526,
    "code": "JPAP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "日本个人信息保护委员会（PPC）缺少数据泄露通报机制",
    "description": "系统安全事件追踪规则未能强制要求在发生重大数据泄露事件（导致敏感或大规模文件泄漏）时，向日本个人信息保护委员会（PPC）通报。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 26"
  },
  {
    "id": 527,
    "code": "JPAP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "日本未经核实的非法电话营销",
    "description": "收集日本电话号码的的线索表单在发起销售电话前，未能显示清晰的选择性退出复选框并核实用户“勿呼叫”偏好，违反了 APPI 指南。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI) Guidelines"
  },
  {
    "id": 528,
    "code": "SKPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "韩国表单中的同意授权缺少多选项的分离设计",
    "description": "面向韩国用户的在线输入表单将非必要的营销同意与必要的服务条款同意复选框打包在一起，违反了韩国 PIPA。",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 22"
  },
  {
    "id": 529,
    "code": "SKPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "韩国身份证号（RRN）处理不符合规范",
    "description": "Web 应用程序在没有法定法律依据或未采取安全加密措施的情况下，处理韩国公民的身份证号（RRN），违反了韩国 PIPA。",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 24-2"
  },
  {
    "id": 530,
    "code": "SKPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "韩国缺少本地语言版本的 DPO 信息披露",
    "description": "面向韩国用户的隐私披露文件未能使用韩文文本注明 DPO 的联系地址或电话号码，违反了 PIPA 的要求。",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 31"
  },
  {
    "id": 531,
    "code": "SKPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "韩国 PIPA 框架下跨境数据传输披露缺失",
    "description": "隐私政策未能告知韩国消费者将个人数据外发传输至海外服务器的日期、目的国以及处理目的，违反了 PIPA。",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 39-11"
  },
  {
    "id": 532,
    "code": "SKPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "韩国向个人信息保护委员会（PIPC）通报数据泄露违规",
    "description": "事件响应指南未能强制要求在确认发生重大数据泄露事件（影响 1,000 名或以上用户）时，在 24 小时内向韩国个人信息保护委员会（PIPC）通报。",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 34"
  },
  {
    "id": 533,
    "code": "LGPD-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "未在巴西国家数据保护局（ANPD）登记注册 DPO",
    "description": "处理巴西个人数据的组织未能正式在国家 ANPD 机构登记注册并公布其指定 DPO（Encarregado）的联系信息，违反了 LGPD。",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 41"
  },
  {
    "id": 534,
    "code": "LGPD-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "处理巴西敏感记录缺少明确同意授权",
    "description": "在线收集表单在收集巴西消费者的健康、生物特征或工会身份等敏感信息时，未能获得单独的、明确的选择性签名或核实复选框，违反了 LGPD。",
    "severity": "critical",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 11"
  },
  {
    "id": 535,
    "code": "LGPD-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "不符合巴西 LGPD 的数据可携性通道",
    "description": "客户端控制面板未能为巴西消费者提供用于将其数据库画像导出并传输至竞争对手网络的自动化接口，违反了 LGPD。",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 9"
  },
  {
    "id": 536,
    "code": "LGPD-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "未能明示并记录针对巴西的数据处理法律依据",
    "description": "公司隐私政策未能明确将所收集的每类个人信息与 LGPD 合规所需的十种法定法律依据之一进行关联说明。",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 7"
  },
  {
    "id": 537,
    "code": "LGPD-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "在巴西未能执行即时擦除请求",
    "description": "支持系统在收到巴西用户提交的数据擦除请求后，未能立即删除其个人信息并确认合规，违反了 LGPD 法规。",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 16"
  },
  {
    "id": 538,
    "code": "POPI-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "未注册南非信息主管",
    "description": "处理南非居民个人信息的组织未能向信息监管机构注册其指定的信息主管，违反了 POPIA。",
    "severity": "serious",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 55"
  },
  {
    "id": 539,
    "code": "POPI-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "南非缺少主动发送的电子营销的直接同意",
    "description": "电子商务或落地页门户网站在未获得主动的、事先选择性同意的情况下，向南非公民发送促销电子邮件或短信，违反了 POPIA。",
    "severity": "critical",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 69"
  },
  {
    "id": 540,
    "code": "POPI-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "南非身份证号不安全存储",
    "description": "系统数据库在未加密的列中存储南非国民身份证号，或允许未经授权的访问，未满足 POPIA 的安全要求。",
    "severity": "critical",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 19"
  },
  {
    "id": 541,
    "code": "POPI-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "南非缺少对数据处理目的边界的审计",
    "description": "Web 应用程序在未经同意的情况下，为了与原始收集目的不相符的其他原因处理从南非公民处收集的数据，违反了 POPIA。",
    "severity": "serious",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 15"
  },
  {
    "id": 542,
    "code": "POPI-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "企业门户网站未公开 PAIA 操作手册",
    "description": "面向南非业务的平台未能提供可公开下载的 PAIA 手册，详细说明访问企业信息登记册的程序，违反了法定要求。",
    "severity": "moderate",
    "reference": "Promotion of Access to Information Act (PAIA) 2000"
  },
  {
    "id": 543,
    "code": "NDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "尼日利亚 NDPA 框架下缺少法定的审计披露",
    "description": "处理尼日利亚数据的大型数据控制者未能向尼日利亚数据保护委员会（NDPC）提交年度数据保护审计报告，违反了 NDPA。",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 33"
  },
  {
    "id": 544,
    "code": "NDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "尼日利亚直接营销缺少明确同意",
    "description": "在线用户注册流程在未获得明确的事先同意前，即将尼日利亚用户列入促销名单，违反了数据保护法规。",
    "severity": "critical",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 26"
  },
  {
    "id": 545,
    "code": "NDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "尼日利亚用户数据在国外违规存储",
    "description": "用户数据库在不符合数据保护充足性规则，且未实施经过验证的合同条款的情况下，将尼日利亚公民的记录传输到尼日利亚境外的服务器，违反了 NDPA。",
    "severity": "critical",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 41"
  },
  {
    "id": 546,
    "code": "NDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "尼日利亚法律框架下缺少信息安全审计",
    "description": "处理尼日利亚用户记录的企业未能进行年度数据库系统安全评估并保存记录，违反了 NDPA 法规。",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 39"
  },
  {
    "id": 547,
    "code": "MXPD-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺少墨西哥合规隐私通知结构（Aviso de Privacidad）",
    "description": "面向墨西哥消费者的隐私披露内容未能提供法定要求的正式隐私通知结构（Aviso de Privacidad），违反了 LFPDPPP。",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 15"
  },
  {
    "id": 548,
    "code": "MXPD-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "墨西哥敏感数据处理缺少明确的选择性同意授权",
    "description": "在线收集表单在收集墨西哥用户的财务或敏感健康信息时，未能获得明确的、签署的主动同意或复选框授权，违反了墨西哥法律。",
    "severity": "critical",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 9"
  },
  {
    "id": 549,
    "code": "MXPD-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "墨西哥未披露 ARCO 权利救济渠道",
    "description": "隐私政策未能说明在墨西哥法律框架下行使 ARCO 权利（访问权、更正权、注销权、反对权）所需的具体程序、时限和联系通道。",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 22"
  },
  {
    "id": 550,
    "code": "MXPD-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "墨西哥客户数据缺少安全保护披露",
    "description": "处理墨西哥居民数据的客户数据库系统缺少 LFPDPPP 法规要求的书面记录的的行政、技术和物理安全保障措施。",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 19"
  },
{
  "id": 551,
  "code": "ARGPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未在 AAIP 注册数据库 (阿根廷)",
  "description": "数据控制者未在公共信息获取机构 (AAIP) 注册包含阿根廷居民个人数据的数据库进行处理。",
  "severity": "critical",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 3"
},
{
  "id": 552,
  "code": "ARGPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "阿根廷法律下缺少明确的 ARCO 权利渠道",
  "description": "隐私政策未能说明阿根廷数据主体如何行使其访问、更正、删除和保密的权利。",
  "severity": "serious",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 14"
},
{
  "id": 553,
  "code": "ARGPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "阿根廷数据存储库缺少本地安全保护措施",
  "description": "保存阿根廷居民个人数据的数据库系统未能实施 AAIP 条例授权的组织和技术安全措施。",
  "severity": "moderate",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 9"
},
{
  "id": 554,
  "code": "ARGPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "阿根廷法律下未经选择退出验证的非法直接营销",
  "description": "网站在未验证国家“谢绝来电”登记处或未提供直接退出链接的情况下，向阿根廷居民进行直接营销。",
  "severity": "serious",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 27"
},
{
  "id": 555,
  "code": "ARGPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "阿根廷公民缺少足够的第三国传输保护措施",
  "description": "控制者将阿根廷居民数据国际传输到根据 AAIP 标准未提供足够保护水平的国家或实体。",
  "severity": "moderate",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 12"
},
{
  "id": 556,
  "code": "COLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "哥伦比亚缺少强制性数据库注册 (RNBD)",
  "description": "数据控制者未能将其包含哥伦比亚居民数据的个人数据库在国家数据库登记处 (RNBD) 进行注册。",
  "severity": "critical",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 25"
},
{
  "id": 557,
  "code": "COLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "哥伦比亚居民缺少明确的事先同意",
  "description": "网站在未获得可验证的明确、事先和知情同意的情况下，收集和处理哥伦比亚居民的个人数据。",
  "severity": "serious",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 9"
},
{
  "id": 558,
  "code": "COLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "哥伦比亚法律下缺少合规的申诉处理渠道",
  "description": "隐私政策未能提供合规的渠道和法定时间表（15个工作日）来解决哥伦比亚主体的查询或申诉。",
  "severity": "moderate",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 15"
},
{
  "id": 559,
  "code": "COLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "哥伦比亚法律下未能审计跨境数据流动协议",
  "description": "控制者在未确认适当性或获得 SIC 授权的情况下，将哥伦比亚个人数据传输到第三国。",
  "severity": "serious",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 26"
},
{
  "id": 560,
  "code": "COLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在哥伦比亚未经父母代理非法处理未成年人个人数据",
  "description": "网站在未对父母或法定代表人授权进行验证的情况下，收集哥伦比亚儿童或青少年的数据。",
  "severity": "moderate",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 7"
},
{
  "id": 561,
  "code": "CHLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未能兑现智利公民的删除或更正请求",
  "description": "网站未能为智利居民提供自动或有文件记录的渠道来请求删除或纠正其个人记录数据。",
  "severity": "critical",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 12"
},
{
  "id": 562,
  "code": "CHLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在智利未经书面授权非法处理敏感个人信息",
  "description": "网站收集智利公民的敏感数据（健康、意识形态、工会成员身份），但未获得明确的书面或同等数字同意。",
  "severity": "serious",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 10"
},
{
  "id": 563,
  "code": "CHLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "智利居民数据存储库缺少妥当的安全披露",
  "description": "保存智利居民个人数据的数据处理系统缺乏有文件记录的技术措施，无法防止未经授权的访问。",
  "severity": "moderate",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 11"
},
{
  "id": 564,
  "code": "CHLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "智利法律下未经选择退出的不合规电子邮件直接营销",
  "description": "网站向智利居民发送商业电子邮件，但未提供明确、免费且易于使用的选择退出机制。",
  "severity": "serious",
  "reference": "Chile Consumer Protection Act (Ley 19.496), Art. 28B"
},
{
  "id": 565,
  "code": "CHLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "处理智利居民个人数据的数据传输合同不充分",
  "description": "控制者与第三方服务提供商共享智利居民的数据，但未签署列明数据安全和处理职责的正式协议。",
  "severity": "moderate",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 4"
},
{
  "id": 566,
  "code": "PERPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未能注册秘鲁个人数据银行 (RNDP)",
  "description": "数据控制者未能将其包含秘鲁居民数据的个人数据库在国家个人数据保护登记处进行注册。",
  "severity": "critical",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 30"
},
{
  "id": 567,
  "code": "PERPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "秘鲁数据国际传输披露不完整",
  "description": "隐私政策未能确定秘鲁境外的特定第三方和传输位置，违反了法定的透明度义务。",
  "severity": "serious",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 18"
},
{
  "id": 568,
  "code": "PERPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "秘鲁法律下缺少直接和即时的 ARCO 权利程序",
  "description": "网站缺乏秘鲁法律下执行 ARCO 权利的特定说明和时限（例如访问8天，更正10天）。",
  "severity": "moderate",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 19"
},
{
  "id": 569,
  "code": "PERPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在秘鲁未能就跟踪 Cookie 获得清晰的事先同意",
  "description": "网站在获得秘鲁居民同意之前就部署了广告或分析 Cookie，违反了同意标准。",
  "severity": "serious",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 12"
},
{
  "id": 570,
  "code": "PERPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "外国实体在秘鲁处理数据缺少适当的的法律代表",
  "description": "处理秘鲁居民数据的外国实体未能指定秘鲁境内的本地法律代表或送达地址。",
  "severity": "moderate",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 34"
},
{
  "id": 571,
  "code": "URYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未在 URCDP 注册数据处理活动 (乌拉圭)",
  "description": "数据控制者未能向个人数据控制和监管单位 (URCDP) 注册数据库或数据处理计划。",
  "severity": "critical",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 31"
},
{
  "id": 572,
  "code": "URYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未能于24小时内在乌拉圭记录和通报安全漏洞",
  "description": "网站缺乏在发现安全事件后 24 小时内向 URCDP 记录和报告的正式协议。",
  "severity": "serious",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 12 (amended)"
},
{
  "id": 573,
  "code": "URYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "外国控制者缺少乌拉圭本地代表指定",
  "description": "针对乌拉圭消费者的外国公司未能指定本地代表来管理第 18.331 号法律规定的监管机构要求。",
  "severity": "moderate",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 34"
},
{
  "id": 574,
  "code": "URYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "乌拉圭不合规地处理生物识别或敏感数据",
  "description": "网站收集乌拉圭居民的敏感数据（健康、生物识别标识符），但未获得明确、事先和书面同意。",
  "severity": "serious",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 18"
},
{
  "id": 575,
  "code": "URYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "乌拉圭居民缺少明确的数据可携性操作",
  "description": "数据控制者未能提供直接途径或标准化格式来满足乌拉圭消费者的可携性请求。",
  "severity": "moderate",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 14"
},
{
  "id": 576,
  "code": "ECUPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "厄瓜多尔居民同意界面不当 (LOPDP)",
  "description": "在 LOPDP 规定下，同意界面未能为厄瓜多尔消费者的不同处理目的提供独立的复选框。",
  "severity": "critical",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 8"
},
{
  "id": 577,
  "code": "ECUPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "缺少厄瓜多尔保护机构本地化救济途径",
  "description": "隐私政策未能说明用户的权利，或提供向厄瓜多尔数据保护局提交申诉的清晰途径。",
  "severity": "serious",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 33"
},
{
  "id": 578,
  "code": "ECUPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在厄瓜多尔未执行数据保护影响评估 (DPIA)",
  "description": "控制者未针对面向厄瓜多尔主体的的高风险数据处理执行或记录数据保护影响评估。",
  "severity": "moderate",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 40"
},
{
  "id": 579,
  "code": "ECUPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在厄瓜多尔未经核实同意的非法营销传播",
  "description": "网站在未收集明确、非捆绑的促销同意的情况下，向厄瓜多尔居民发送商业信息。",
  "severity": "serious",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 12"
},
{
  "id": 580,
  "code": "ECUPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "厄瓜多尔数据库缺少安全和完整性措施",
  "description": "处理厄瓜多尔消费者个人数据的数据库缺乏有文件记录的的管理、技术和物理安全计划。",
  "severity": "moderate",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 37"
},
{
  "id": 581,
  "code": "CRIAP-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未在 PRODHAB 注册数据库 (哥斯达黎加)",
  "description": "实体在未向居民数据保护局 (PRODHAB) 注册数据库的情况下处理哥斯达黎加个人数据。",
  "severity": "critical",
  "reference": "Costa Rica Law 8968, Art. 12"
},
{
  "id": 582,
  "code": "CRIAP-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在哥斯达黎加信息自决披露不完整",
  "description": "隐私声明未能披露法定的信息自决权利以及撤销同意的途径。",
  "severity": "serious",
  "reference": "Costa Rica Law 8968, Art. 5"
},
{
  "id": 583,
  "code": "CRIAP-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "处理哥斯达黎加敏感数据缺少验证协议",
  "description": "在没有明确事先验证协议的情况下，收集哥斯达黎加主体的敏感类别个人数据（健康、生物识别）。",
  "severity": "moderate",
  "reference": "Costa Rica Law 8968, Art. 9"
},
{
  "id": 584,
  "code": "CRIAP-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "向不当的第三国非法传输哥斯达黎加数据",
  "description": "在未获得用户明确同意的情况下，网站将哥斯达黎加个人数据传输到保护水平不合格的国家。",
  "severity": "serious",
  "reference": "Costa Rica Law 8968, Art. 24"
},
{
  "id": 585,
  "code": "CRIAP-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "哥斯达黎加用户缺少简化的撤销机制",
  "description": "未向哥斯达黎加用户提供简便、免费的机制来撤销对促销目的数据处理的同意。",
  "severity": "moderate",
  "reference": "Costa Rica Law 8968, Art. 6"
},
{
  "id": 586,
  "code": "PANPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未能告知巴拿马公民控制者身份 (Ley 81)",
  "description": "网站在未披露数据控制者的完整公司身份和物理地址的情况下，处理巴拿马居民的个人数据。",
  "severity": "critical",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 8"
},
{
  "id": 587,
  "code": "PANPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴拿马缺少 ARCO 权利执行途径",
  "description": "控制者未能在巴拿马提供免费且易于访问的电子邮件地址或系统来行使访问、更正、反对和删除权。",
  "severity": "serious",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 15"
},
{
  "id": 588,
  "code": "PANPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在巴拿马进行财务画像缺少同意法律基础",
  "description": "网站在未核实合规性或获得明确事先授权的情况下，对巴拿马居民进行信用画像或处理其经济数据。",
  "severity": "moderate",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 21"
},
{
  "id": 589,
  "code": "PANPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "缺少向 ANTAI 通报安全漏洞的协议 (巴拿马)",
  "description": "该机构未制定向巴拿马国家机构 (ANTAI) 以及受影响主体立即报告安全事件的程序文件。",
  "severity": "serious",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 36"
},
{
  "id": 590,
  "code": "PANPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在不合规的服务器上非法存储巴拿马个人数据",
  "description": "巴拿马个人数据国际化存储在未能提供 ANTAI 授权的最低信息安全措施的云系统上。",
  "severity": "moderate",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 33"
},
{
  "id": 591,
  "code": "KENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未在肯尼亚 ODPC 注册为数据控制者",
  "description": "实体在未向数据保护专员办公室 (ODPC) 注册为数据控制者或处理者的情况下，收集和处理肯尼亚居民的个人数据。",
  "severity": "critical",
  "reference": "Kenya Data Protection Act 2019, Section 18"
},
{
  "id": 592,
  "code": "KENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "外国控制者在肯尼亚缺少本地代表",
  "description": "处理肯尼亚数据主体个人数据的外国数据控制者未能指定常驻本地代表来处理监管事务。",
  "severity": "serious",
  "reference": "Kenya Data Protection Act 2019, Section 50"
},
{
  "id": 593,
  "code": "KENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "肯尼亚法律下用于直接营销的同意控制不充分",
  "description": "网站在未获得事先主动选择同意的情况下，将肯尼亚居民的个人数据用于商业推广或广告。",
  "severity": "moderate",
  "reference": "Kenya Data Protection Act 2019, Section 37"
},
{
  "id": 594,
  "code": "KENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "肯尼亚业务未执行数据保护影响评估 (DPIA)",
  "description": "该实体在未执行强制性 DPIA 的情况下，运行对肯尼亚居民构成高风险的处理业务（如大规模跟踪）。",
  "severity": "serious",
  "reference": "Kenya Data Protection Act 2019, Section 31"
},
{
  "id": 595,
  "code": "KENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未能满足向肯尼亚 ODPC 报告数据泄露的72小时时限",
  "description": "数据控制者有记录的泄露响应协议未能要求在发生安全事件后 72 小时内通知肯尼亚 ODPC。",
  "severity": "moderate",
  "reference": "Kenya Data Protection Act 2019, Section 43"
},
{
  "id": 596,
  "code": "EGYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在埃及未获得电子营销许可",
  "description": "网站在未向数据保护中心获得必需许可的情况下，向埃及居民进行直接电子营销。",
  "severity": "critical",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 17"
},
{
  "id": 597,
  "code": "EGYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "埃及公民隐私政策披露不充分",
  "description": "隐私政策未能明确列出处理埃及公民数据的特定法律依据和处理期限。",
  "severity": "serious",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 2"
},
{
  "id": 598,
  "code": "EGYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在埃及缺少法定的数据保护官 (DPO)",
  "description": "该实体大规模处理埃及居民数据，但未能向监管机构指定并注册数据保护官。",
  "severity": "moderate",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 8"
},
{
  "id": 599,
  "code": "EGYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在埃及未能在72小时内报告个人数据泄露",
  "description": "控制者未能建立在 72 小时内向埃及监管机构和受影响主体报告个人数据泄露的内部准则。",
  "severity": "serious",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 7"
},
{
  "id": 600,
  "code": "EGYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "埃及公民数据非法跨境传输",
  "description": "网站在未获得埃及数据保护中心必需批准的情况下，将埃及居民的个人数据传输到国际实体。",
  "severity": "moderate",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 14"
},
{
  "id": 601,
  "code": "MARPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未向摩洛哥 CNDP 进行事先申报或获得授权",
  "description": "控制者在未向 CNDP 进行强制性事先申报或获得授权的情况下，处理摩洛哥居民的个人数据。",
  "severity": "critical",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 12"
},
{
  "id": 602,
  "code": "MARPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在摩洛哥未明确披露接收者类别",
  "description": "隐私政策未能向摩洛哥数据主体告知其个人数据的特定第三方接收者类别。",
  "severity": "serious",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 5"
},
{
  "id": 603,
  "code": "MARPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在摩洛哥进行直接营销缺少明确同意",
  "description": "网站在未获得摩洛哥消费者事先、明确的选择性同意的情况下，向其发送直接营销信息。",
  "severity": "moderate",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 10"
},
{
  "id": 604,
  "code": "MARPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩洛哥未实施数据完整性技术保护措施",
  "description": "托管摩洛哥用户记录的服务器配置缺乏适当的保护，无法防止意外销毁、丢失或篡改。",
  "severity": "serious",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 23"
},
{
  "id": 605,
  "code": "MARPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩洛哥不合规的跨境个人数据传输",
  "description": "该实体在未获得 CNDP 事先书面授权的情况下，将摩洛哥个人数据传输到摩洛哥境外的司法管辖区。",
  "severity": "moderate",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 43"
},
{
  "id": 606,
  "code": "QATPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在卡塔尔对儿童数据的同意验证不充分",
  "description": "网站在未按照 PDPPL 的要求获得其父母或法定监护人明确同意的情况下，处理卡塔尔儿童的个人数据。",
  "severity": "critical",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 17"
},
{
  "id": 607,
  "code": "QATPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未能为卡塔尔监管机构记录处理审计文件",
  "description": "该机构未能维护并记录内部处理业务登记簿，以提交给卡塔尔主管部门。",
  "severity": "serious",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 11"
},
{
  "id": 608,
  "code": "QATPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "针对卡塔尔居民的安全措施和披露不完整",
  "description": "存储卡塔尔居民数据的数据库缺乏防止数据泄露所需的、经审计的技术和管理安全措施。",
  "severity": "moderate",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 13"
},
{
  "id": 609,
  "code": "QATPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "卡塔尔主体缺少直接请求处理渠道",
  "description": "网站未能向卡塔尔居民提供直接、免费的机制来提交访问、删除或更正请求。",
  "severity": "serious",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 5"
},
{
  "id": 610,
  "code": "QATPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未能向卡塔尔主体披露跨境处理位置",
  "description": "隐私政策未能说明处理或存储卡塔尔居民个人数据的地理位置。",
  "severity": "moderate",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 8"
},
{
  "id": 611,
  "code": "BHRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在巴林处理敏感数据缺少书面同意",
  "description": "网站收集巴林居民的敏感数据（如健康状况或生物识别），但未获得事先、书面和明确的同意。",
  "severity": "critical",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 4"
},
{
  "id": 612,
  "code": "BHRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在巴林未能任命本地代表",
  "description": "大规模处理巴林居民数据的外国数据控制者未能指定在巴林的本地常驻代表。",
  "severity": "serious",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 33"
},
{
  "id": 613,
  "code": "BHRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在巴林不合规的直接营销传播",
  "description": "网站通过电子信息向巴林公民发送营销传播信息，但未向其提供事先、清晰的选择退出途径。",
  "severity": "moderate",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 30"
},
{
  "id": 614,
  "code": "BHRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未能向巴林监管机构记录处理登记信息",
  "description": "控制者未能向个人数据保护局注册包含巴林居民个人数据的数据库系统。",
  "severity": "serious",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 12"
},
{
  "id": 615,
  "code": "BHRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "导出巴林公民数据缺少适当的传输协议",
  "description": "在没有事先书面批准的情况下，将巴林居民的个人数据传输到未提供足够数据安全水平的国家。",
  "severity": "moderate",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 15"
},
{
  "id": 616,
  "code": "OMNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在阿曼未能任命数据保护官 (DPO)",
  "description": "该机构大规模处理阿曼居民的个人数据，但未能指定数据保护官。",
  "severity": "critical",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 21"
},
{
  "id": 617,
  "code": "OMNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在阿曼处理敏感健康或生物识别数据缺少明确同意",
  "description": "网站收集阿曼居民的敏感数据（健康、生物识别记录），但未获得明确、事先和有记录的同意。",
  "severity": "serious",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 5"
},
{
  "id": 618,
  "code": "OMNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿曼主体缺少经过验证的争议解决程序",
  "description": "隐私政策未能说明处理阿曼数据主体申诉的特定法律途径或联系渠道。",
  "severity": "moderate",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 12"
},
{
  "id": 619,
  "code": "OMNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿曼数据跨境传输缺少足够的保证措施",
  "description": "网站在未确保适当性协议或部级批准的情况下，将阿曼居民的个人数据传输到国际实体。",
  "severity": "serious",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 24"
},
{
  "id": 620,
  "code": "OMNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未能在法定时间内回应阿曼消费者的请求",
  "description": "数据控制者的用户请求处理程序未能要求在法定时间内回复阿曼公民的访问或更正请求。",
  "severity": "moderate",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 15"
},
{
  "id": 621,
  "code": "HKGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "未能向香港居民披露拟进行的直接营销",
  "description": "网站收集香港居民的个人数据并打算将其用于营销，但未提供清晰的选择性同意界面。",
  "severity": "critical",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), Sec. 35C"
},
{
  "id": 622,
  "code": "HKGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "香港第三方营销缺少单独的同意",
  "description": "网站在未获得单独、明确和知情同意的情况下，将香港居民的数据共享给合作伙伴用于营销目的。",
  "severity": "serious",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), Sec. 35J"
},
{
  "id": 623,
  "code": "HKGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "香港客户数据保留披露不合规",
  "description": "隐私政策未能列明从香港居民收集的个人数据的明确保留时间表或销毁程序。",
  "severity": "moderate",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 2"
},
{
  "id": 624,
  "code": "HKGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "香港数据删除和销毁协议不安全",
  "description": "服务器端数据生命周期未针对不活跃的香港用户数据库条目实施安全删除算法。",
  "severity": "serious",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 4"
},
{
  "id": 625,
  "code": "HKGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "香港主体缺少数据访问和更正接口",
  "description": "网站未能向香港用户提供简便、专门的联系表单或程序来要求访问或更正其数据。",
  "severity": "moderate",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 6"
},
{
  "id": 626,
  "code": "TWNPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "台湾 PDPA 下信息披露不完整",
  "description": "隐私政策未能明确列出 PDPA 第8条规定的所有强制性项目，例如不提供数据的后果。",
  "severity": "critical",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 8"
},
{
  "id": 627,
  "code": "TWNPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "在台湾未经书面同意非法收集敏感个人数据",
  "description": "网站收集台湾居民的敏感个人记录（病史、基因数据），但未获得明确的书面同意。",
  "severity": "serious",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 6"
},
{
  "id": 628,
  "code": "TWNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "台湾地区缺少可审计的安全维护计划",
  "description": "数据控制者未能制定并维护内部安全维护计划，以防止台湾地区的个人数据泄露。",
  "severity": "moderate",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 27"
},
{
  "id": 629,
  "code": "TWNPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "台湾地区公民缺少事件通知协议",
  "description": "该公司缺乏在核实数据泄露事件后，立即向台湾地区数据主体通知个人数据泄露的协议。",
  "severity": "serious",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 12"
},
{
  "id": 630,
  "code": "TWNPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "针对台湾居民直接营销的保护措施不充分",
  "description": "网站将台湾居民的个人数据用于营销，但未在首次接触时提供清晰的反对选择。",
  "severity": "moderate",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 20"
},
{
  "id": 631,
  "code": "PHLPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "未在菲律宾 NPC 注册数据处理系统",
  "description": "该实体处理菲律宾公民的个人数据，但未能向国家隐私委员会 (NPC) 注册其数据处理系统。",
  "severity": "critical",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 14"
},
{
  "id": 632,
  "code": "PHLPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "在菲律宾未能任命数据保护官 (DPO)",
  "description": "针对菲律宾主体的数据控制者未能正式任命并向 NPC 注册数据保护官。",
  "severity": "serious",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 21"
},
{
  "id": 633,
  "code": "PHLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "菲律宾居民隐私声明披露不充分",
  "description": "隐私政策未能告知菲律宾用户其特有的知情、访问、反对和要求删除的权利。",
  "severity": "moderate",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 16"
},
{
  "id": 634,
  "code": "PHLPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "未能在72小时内向 NPC 建立系统性的泄露通知机制",
  "description": "公司的安全程序未规定在发现数据泄露后 72 小时内通知 NPC 和受影响的主体。",
  "severity": "serious",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 20"
},
{
  "id": 635,
  "code": "PHLPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "在菲律宾处理敏感信息同意书不完整",
  "description": "同意机制将处理敏感信息的许可与通用服务条款相捆绑，违反了菲律宾同意法。",
  "severity": "moderate",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 13"
},
{
  "id": 636,
  "code": "IDNPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "印度尼西亚业务缺少有文件记录的法律依据",
  "description": "网站在未记录 UU PDP 规定的特定法律依据（同意、合同）的情况下，收集和处理印度尼西亚公民的数据。",
  "severity": "critical",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 20"
},
{
  "id": 637,
  "code": "IDNPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "在印度尼西亚未能任命本地数据保护官 (DPO)",
  "description": "数据控制者大规模处理印度尼西亚个人记录，但未能指定本地常驻数据保护官。",
  "severity": "serious",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 53"
},
{
  "id": 638,
  "code": "IDNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "在印度尼西亚缺少针对儿童的年龄和父母验证控制",
  "description": "网站在未验证年龄并获得父母有效同意的情况下，收集印度尼西亚儿童的个人数据。",
  "severity": "moderate",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 32"
},
{
  "id": 639,
  "code": "IDNPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "在印度尼西亚未能在72小时内建立明确的事件通知机制",
  "description": "数据控制者未能建立在检测到数据安全泄露后 72 小时内向印度尼西亚当局和主体通知的程序。",
  "severity": "serious",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 46"
},
{
  "id": 640,
  "code": "IDNPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "印度尼西亚个人数据的数据删除机制不合规",
  "description": "系统在撤销有效同意或合同终止时，不支持对印度尼西亚用户记录进行完全、永久的删除。",
  "severity": "moderate",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 43"
},
{
  "id": 641,
  "code": "KAZPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "包含哈萨克斯坦居民数据的数据库未进行注册",
  "description": "数据控制者未能向国家机关注册其处理哈萨克斯坦居民个人数据的数据库。",
  "severity": "critical",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 26"
},
{
  "id": 642,
  "code": "KAZPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "在哈萨克斯坦未确认适当性进行不合规数据跨境传输",
  "description": "网站在未核实适当性或获取合法传输依据的情况下，将哈萨克斯坦公民的个人数据传输到第三国。",
  "severity": "serious",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 16"
},
{
  "id": 643,
  "code": "KAZPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "针对哈萨克斯坦居民的同意获取系统不完整",
  "description": "网站收集哈萨克斯坦居民的个人数据，但未获得列明具体处理目的的明确同意。",
  "severity": "moderate",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 8"
},
{
  "id": 644,
  "code": "KAZPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "未能将服务器存储本地化在哈萨克斯坦共和国境内",
  "description": "存储哈萨克斯坦居民个人数据的数据库托管在哈萨克斯坦境外，违反了强行的数据本地化要求。",
  "severity": "serious",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 12"
},
{
  "id": 645,
  "code": "KAZPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "哈萨克斯坦公民缺少标准的救济和删除协议",
  "description": "控制者未能提供请求阻止或销毁哈萨克斯坦公民个人记录的直接途径或联系选项。",
  "severity": "moderate",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 24"
},
{
  "id": 646,
  "code": "UKRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未向乌克兰人权专员通知数据处理情况",
  "description": "控制者在未通知人权专员的情况下，处理乌克兰居民的敏感个人数据。",
  "severity": "critical",
  "reference": "Ukraine Law on Personal Data Protection, Article 9"
},
{
  "id": 647,
  "code": "UKRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "隐私政策中关于乌克兰第三方接收者的披露不充分",
  "description": "隐私政策未能明确指明或详细列出处理乌克兰居民数据的第三方接收者类别。",
  "severity": "serious",
  "reference": "Ukraine Law on Personal Data Protection, Article 12"
},
{
  "id": 648,
  "code": "UKRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在乌克兰未获得营销和 Cookie 跟踪的同意",
  "description": "网站在未获得验证选择同意的情况下，部署广告跟踪 Cookie 或向乌克兰公民发送促销简报。",
  "severity": "moderate",
  "reference": "Ukraine Law on Personal Data Protection, Article 11"
},
{
  "id": 649,
  "code": "UKRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乌克兰法律下缺少安全和访问日志",
  "description": "包含乌克兰主体个人记录的数据库缺乏有文件记录的访问日志和用户权限控制。",
  "severity": "serious",
  "reference": "Ukraine Law on Personal Data Protection, Article 24"
},
{
  "id": 650,
  "code": "UKRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乌克兰主体缺少完整的纠正和删除访问程序",
  "description": "数据控制者未能向乌克兰主体提供要求销毁数据的清晰联系渠道或答复时限。",
  "severity": "moderate",
  "reference": "Ukraine Law on Personal Data Protection, Article 8"
},
{
  "id": 651,
  "code": "CANPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "PIPEDA 规定下敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确选择同意的情况下，收集加拿大居民的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.3"
},
{
  "id": 652,
  "code": "CANPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "PIPEDA 规定下缺少隐私官联系信息",
  "description": "隐私政策未能指明或提供负责遵守加拿大法律的指定合规负责人的直接联系方式。",
  "severity": "serious",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.1"
},
{
  "id": 653,
  "code": "CANPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "PIPEDA 规定下访问和更正程序不妥当",
  "description": "该网站缺乏清晰、有文件记录的说明，无法让加拿大居民获取其个人文件并请求更正。",
  "severity": "moderate",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.9"
},
{
  "id": 654,
  "code": "CANPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "加拿大法律下不合规的泄露报告程序",
  "description": "数据控制者未能记录在可行情况下尽快向隐私专员办公室 (OPC) 报告安全事件的程序。",
  "severity": "serious",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Sec. 10.1"
},
{
  "id": 655,
  "code": "CANPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "加拿大数据第三方传输合同不完整",
  "description": "控制者将加拿大居民的数据传输给第三方处理者，但未实施旨在确保同等保护的正式合同保证。",
  "severity": "moderate",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.5.3"
},
{
  "id": 656,
  "code": "BOLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未能兑现智利宪法赋予的人身保护数据权利 (玻利维亚)",
  "description": "网站缺乏让玻利维亚公民执行其查询、更正或删除个人数据存储库的宪法权利的选项。",
  "severity": "critical",
  "reference": "Bolivia Political Constitution, Article 130"
},
{
  "id": 657,
  "code": "BOLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "玻利维亚缺少个人数据用户纠正协议",
  "description": "隐私政策未能说明玻利维亚主体反对未经授权处理的特定行政或司法救济途径。",
  "severity": "serious",
  "reference": "Bolivia Political Constitution, Article 131"
},
{
  "id": 658,
  "code": "BOLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在玻利维亚非法处理通信日志",
  "description": "网站在未获得明确事先同意或司法命令的情况下，跟踪和处理玻利维亚用户的通信元数据或日志。",
  "severity": "moderate",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 55"
},
{
  "id": 659,
  "code": "BOLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "玻利维亚数据第三方接收者披露不完整",
  "description": "隐私政策未能列明访问玻利维亚居民个人记录的特定第三方机构和数据库。",
  "severity": "serious",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 56"
},
{
  "id": 660,
  "code": "BOLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "玻利维亚数据主体登记库存储不安全",
  "description": "处理玻利维亚居民个人数据的数据库未能部署电信标准规定的加密和技术安全保护措施。",
  "severity": "moderate",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 57"
},
{
  "id": 661,
  "code": "PRYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在巴拉圭非法处理金融信用记录",
  "description": "网站在未获得明确的书面或数字可验证同意的情况下，对巴拉圭居民进行画像或处理其财务记录。",
  "severity": "critical",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 6"
},
{
  "id": 662,
  "code": "PRYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴拉圭法律下缺少直接纠正途径",
  "description": "隐私政策未能说明在巴拉圭纠正不准确的个人或财务数据库记录的免费、简化方法。",
  "severity": "serious",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 14"
},
{
  "id": 663,
  "code": "PRYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴拉圭数据记录缺少组织层面的安全措施",
  "description": "数据控制者未能审计并记录保护巴拉圭居民数据库免受未经授权访问的行政安全措施。",
  "severity": "moderate",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 9"
},
{
  "id": 664,
  "code": "PRYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在巴拉圭通过电子渠道进行非法直接营销",
  "description": "网站在未获得核实的事先授权或明确退出链接的情况下，向巴拉圭消费者发送商业信息。",
  "severity": "serious",
  "reference": "Paraguay Consumer Protection Law (Ley 1334), Art. 6"
},
{
  "id": 665,
  "code": "PRYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "与巴拉圭数据子处理商签订的合同不当",
  "description": "控制者与第三方服务提供商共享巴拉圭居民数据，但未签署列明数据安全职责的正式协议。",
  "severity": "moderate",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 12"
},
{
  "id": 666,
  "code": "VENPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "委内瑞拉未遵守人身保护数据原则",
  "description": "网站处理委内瑞拉居民的个人登记信息，但未提供检查、更正或删除其记录的机制。",
  "severity": "critical",
  "reference": "Venezuela Constitution, Article 28"
},
{
  "id": 667,
  "code": "VENPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "委内瑞拉数据传输未能记录安全控制措施",
  "description": "收集和传输委内瑞拉居民个人记录的 Web 面板缺乏有文件记录的行政安全协议。",
  "severity": "serious",
  "reference": "Venezuela Infogobierno Law, Article 32"
},
{
  "id": 668,
  "code": "VENPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "委内瑞拉主体存储库缺少同意披露信息",
  "description": "隐私声明未能披露法律依据或就存储委内瑞拉公民的个人记录获得同意。",
  "severity": "moderate",
  "reference": "Venezuela Constitution, Article 60"
},
{
  "id": 669,
  "code": "VENPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "委内瑞拉用户缺少简便访问请求接口",
  "description": "网站未能向委内瑞拉居民提供直接、免费的联系途径来检查其数据库记录配置。",
  "severity": "serious",
  "reference": "Venezuela Constitution, Article 28"
},
{
  "id": 670,
  "code": "VENPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "委内瑞拉客户记录保留政策不合规",
  "description": "在未提供有证明文件或删除程序的情况下，无限期存储委内瑞拉居民的个人数据库记录。",
  "severity": "moderate",
  "reference": "Venezuela Constitution, Article 60"
},
{
  "id": 671,
  "code": "GTMIP-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "危地马拉法律下信息通知不当",
  "description": "隐私政策未能向危地马拉居民说明收集数据的目的或第三方传输政策。",
  "severity": "critical",
  "reference": "Guatemala Access to Public Information Law, Article 31"
},
{
  "id": 672,
  "code": "GTMIP-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在危地马拉未能兑现人身保护数据更正权利",
  "description": "网站缺乏让危地马拉居民要求更正或阻止个人记录的正式联系途径或界面。",
  "severity": "serious",
  "reference": "Guatemala Access to Public Information Law, Article 32"
},
{
  "id": 673,
  "code": "GTMIP-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "危地马拉个人数据登记库存储不安全",
  "description": "保存危地马拉公民个人记录的数据库系统缺乏有文件记录的技术访问控制和加密保护措施。",
  "severity": "moderate",
  "reference": "Guatemala Access to Public Information Law, Article 33"
},
{
  "id": 674,
  "code": "GTMIP-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "共享危地马拉居民数据缺少明确同意",
  "description": "在未获得事先明确选择同意的情况下，该网站与合作伙伴或营销平台共享危地马拉居民的个人数据。",
  "severity": "serious",
  "reference": "Guatemala Access to Public Information Law, Article 34"
},
{
  "id": 675,
  "code": "GTMIP-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "危地马拉缺少免费的营销同意撤销渠道",
  "description": "网站未能向危地马拉用户提供一个简单、免费的机制来反对和撤销商业电子邮件处理。",
  "severity": "moderate",
  "reference": "Guatemala Consumer Protection Law, Article 17"
},
{
  "id": 676,
  "code": "DOMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "未经事先同意处理多米尼加数据",
  "description": "网站在未获得事先、自愿和知情同意的情况下，收集和处理多米尼加居民的个人数据库记录。",
  "severity": "critical",
  "reference": "Dominican Republic Law 172-13, Article 5"
},
{
  "id": 677,
  "code": "DOMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "多米尼加控制者身份披露不完整",
  "description": "隐私政策未能确定数据控制者以及监管机构监督的数据库注册。",
  "severity": "serious",
  "reference": "Dominican Republic Law 172-13, Article 8"
},
{
  "id": 678,
  "code": "DOMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "多米尼加法律下人身保护数据请求程序不当",
  "description": "数据库控制者缺乏供多米尼加公民提交访问、更正和删除请求的文档记录方法。",
  "severity": "moderate",
  "reference": "Dominican Republic Law 172-13, Article 18"
},
{
  "id": 679,
  "code": "DOMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "多米尼加公民数据非法跨境传输",
  "description": "网站将多米尼加个人数据库传输到未能保证足够安全水平的国家或实体。",
  "severity": "serious",
  "reference": "Dominican Republic Law 172-13, Article 29"
},
{
  "id": 680,
  "code": "DOMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "多米尼加个人数据银行安全披露不安全",
  "description": "数据库系统缺乏第 172-13 号法律规定的物理、逻辑和管理安全措施。",
  "severity": "moderate",
  "reference": "Dominican Republic Law 172-13, Article 12"
},
{
  "id": 681,
  "code": "SLVPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "萨尔瓦多商业电子邮件缺少同意",
  "description": "网站向萨尔瓦多居民发送商业电子邮件，但未获得事先、明确的同意或提供清晰的选择退出途径。",
  "severity": "critical",
  "reference": "El Salvador Electronic Commerce Law, Article 18"
},
{
  "id": 682,
  "code": "SLVPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "萨尔瓦多隐私声明中数据处理披露不充分",
  "description": "隐私声明未能详细说明收集萨尔瓦多消费者个人记录的方法和传输协议。",
  "severity": "serious",
  "reference": "El Salvador Electronic Commerce Law, Article 20"
},
{
  "id": 683,
  "code": "SLVPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "萨尔瓦多客户交易日志记录不安全",
  "description": "处理萨尔瓦多用户电子支付的 Web 门户未能实施安全、加密且隔离的交易日志。",
  "severity": "moderate",
  "reference": "El Salvador Electronic Commerce Law, Article 22"
},
{
  "id": 684,
  "code": "SLVPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "萨尔瓦多消费者数据库记录不安全",
  "description": "存储萨尔瓦多居民消费者记录条目的数据库缺乏防止未经授权数据泄露的技术安全措施。",
  "severity": "serious",
  "reference": "El Salvador Consumer Protection Law, Article 27"
},
{
  "id": 685,
  "code": "SLVPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "萨尔瓦多用户数据库删除选项不完整",
  "description": "网站未能向萨尔瓦多消费者提供简化的自动化渠道来要求完全删除其账户数据库。",
  "severity": "moderate",
  "reference": "El Salvador Electronic Commerce Law, Article 19"
},
{
  "id": 686,
  "code": "HNDPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "洪都拉斯居民缺少收集披露信息",
  "description": "该网站收集洪都拉斯居民的个人数据，但未清晰披露处理目的。",
  "severity": "critical",
  "reference": "Honduras Access to Public Information Law, Article 23"
},
{
  "id": 687,
  "code": "HNDPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "洪都拉斯数据库缺少阻止和删除途径",
  "description": "数据控制者未能为洪都拉斯公民建立起请求数据库阻止或文件删除的文档记录途径或联系人。",
  "severity": "serious",
  "reference": "Honduras Access to Public Information Law, Article 24"
},
{
  "id": 688,
  "code": "HNDPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在洪都拉斯未经同意进行非法第三方传输",
  "description": "网站在未获得事先同意的情况下，将洪都拉斯居民的个人数据库传输给商业实体。",
  "severity": "moderate",
  "reference": "Honduras Access to Public Information Law, Article 25"
},
{
  "id": 689,
  "code": "HNDPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "洪都拉斯个人登记库存储不安全",
  "description": "处理洪都拉斯居民个人数据的数据库缺乏基本的逻辑访问控制和数据加密。",
  "severity": "serious",
  "reference": "Honduras Access to Public Information Law, Article 26"
},
{
  "id": 690,
  "code": "HNDPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "洪都拉斯缺少免费的营销选择退出渠道",
  "description": "面向洪都拉斯消费者的网站未展示清晰、免费的反对商业信息的机制。",
  "severity": "moderate",
  "reference": "Honduras Consumer Protection Law, Article 15"
},
{
  "id": 691,
  "code": "NICPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在尼加拉瓜未向监管机构注册数据库",
  "description": "数据控制者未能向国家登记处注册包含尼加拉瓜居民数据的数据库。",
  "severity": "critical",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 15"
},
{
  "id": 692,
  "code": "NICPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在尼加拉瓜处理敏感数据缺少明确同意",
  "description": "网站收集尼加拉瓜居民的敏感数据，但未获得事先、书面或数字可验证的同意。",
  "severity": "serious",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 7"
},
{
  "id": 693,
  "code": "NICPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "尼加拉瓜 ARCO 权利救济途径不当",
  "description": "隐私政策未能提供在第 787 号法律下执行 ARCO 权利的特定联系渠道或法定时间表。",
  "severity": "moderate",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 9"
},
{
  "id": 694,
  "code": "NICPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "尼加拉瓜数据不合规跨境传输",
  "description": "该网站在未获得监管批准或适当性保证的情况下将尼加拉瓜个人数据库进行国际传输。",
  "severity": "serious",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 21"
},
{
  "id": 695,
  "code": "NICPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "在尼加拉瓜未能报告数据库安全漏洞",
  "description": "该机构未制定向尼加拉瓜监管机构和受影响主体报告安全事件的内部程序文件。",
  "severity": "moderate",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 12"
},
{
  "id": 696,
  "code": "GHAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未在加纳 DPC 注册为数据控制者",
  "description": "该实体在未向数据保护委员会 (DPC) 注册为数据控制者的情况下，处理加纳居民的个人数据。",
  "severity": "critical",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 27"
},
{
  "id": 697,
  "code": "GHAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在加纳未经授权处理敏感个人数据",
  "description": "网站在未获得 DPC 事先书面授权的情况下，收集加纳居民的敏感个人记录（生物识别、健康、信仰）。",
  "severity": "serious",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 35"
},
{
  "id": 698,
  "code": "GHAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在加纳关于反对营销权利的通知不充分",
  "description": "隐私政策未能告知加纳数据主体其拥有的反对出于促销目的进行数据处理的特定权利。",
  "severity": "moderate",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 20"
},
{
  "id": 699,
  "code": "GHAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "加纳数据不合规的国际传输",
  "description": "控制者在未获得 DPC 事先书面批准或适当性确认的情况下，将加纳个人数据传输到国外。",
  "severity": "serious",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 47"
},
{
  "id": 700,
  "code": "GHAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "加纳法律下缺少安全漏洞通知机制",
  "description": "数据控制者缺乏在合理时间内向加纳 DPC 和受影响主体报告安全事件的文档记录程序。",
  "severity": "moderate",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 31"
},
{
  "id": 701,
  "code": "UGAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未向乌干达数据保护办公室注册",
  "description": "数据控制者在未向乌干达个人数据保护办公室正式注册的情况下，收集和处理乌干达居民的数据。",
  "severity": "critical",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 4"
},
{
  "id": 702,
  "code": "UGAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经事先同意收集乌干达公民数据",
  "description": "该网站在未获得数据主体事先、书面和明确同意的情况下，收集乌干达公民的个人数据。",
  "severity": "serious",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 7"
},
{
  "id": 703,
  "code": "UGAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在乌干达处理数据主体权利的程序不当",
  "description": "控制者未能提供直接途径或联系选项来处理乌干达主体的访问、更正或删除请求。",
  "severity": "moderate",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 24"
},
{
  "id": 704,
  "code": "UGAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在乌干达未经选择退出的非法直接营销",
  "description": "网站向乌干达公民发送商业电子邮件或营销信息，但未提供经核实的、免费的选择退出机制。",
  "severity": "serious",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 15"
},
{
  "id": 705,
  "code": "UGAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在不合规的国家不合规地存储乌干达记录",
  "description": "乌干达个人记录被国际传输到未能保证足够数据保护标准的司法管辖区。",
  "severity": "moderate",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 19"
},
{
  "id": 706,
  "code": "RWAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在卢旺达未经注册处理个人数据",
  "description": "数据控制者在未获得注册或通知监管机构的情况下，处理卢旺达的个人记录。",
  "severity": "critical",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 8"
},
{
  "id": 707,
  "code": "RWAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在卢旺达处理敏感数据缺少明确同意",
  "description": "网站收集卢旺达居民的敏感数据（健康、生物识别），但未获得事先、明确和非捆绑的同意。",
  "severity": "serious",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 10"
},
{
  "id": 708,
  "code": "RWAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "卢旺达业务缺少本地数据保护官联系方式",
  "description": "该实体处理卢旺达居民的个人记录，但未能指定本地化的数据保护官或联系渠道。",
  "severity": "moderate",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 18"
},
{
  "id": 709,
  "code": "RWAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "向卢旺达监管机构报告数据泄露的程序不当",
  "description": "该机构在检测到数据库安全事件后，未能于 48 小时内向卢旺达监管机构报告。",
  "severity": "serious",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 25"
},
{
  "id": 710,
  "code": "RWAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "卢旺达居民记录非法跨境传输",
  "description": "该网站在未获得事先授权或确认适当性的情况下将卢旺达居民的个人记录进行国际传输。",
  "severity": "moderate",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 30"
},
{
  "id": 711,
  "code": "ZIMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经注册处理津巴布韦数据",
  "description": "数据控制者在未向 POTRAZ 监管机构获得许可或注册的情况下，处理津巴布韦居民的个人记录。",
  "severity": "critical",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 11"
},
{
  "id": 712,
  "code": "ZIMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在津巴布韦进行自动决策缺少同意",
  "description": "网站在未获得明确的事先同意的情况下，对津巴布韦居民进行自动画像或决策。",
  "severity": "serious",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 17"
},
{
  "id": 713,
  "code": "ZIMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "津巴布韦数据库安全措施不当",
  "description": "处理津巴布韦居民个人数据的数据库缺乏防止记录遭到未经授权披露的技术保护措施。",
  "severity": "moderate",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 22"
},
{
  "id": 714,
  "code": "ZIMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "津巴布韦公民缺少数据访问请求程序",
  "description": "该网站未能向津巴布韦居民提供提交访问或更正请求的直接、免费程序。",
  "severity": "serious",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 15"
},
{
  "id": 715,
  "code": "ZIMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "针对津巴布韦居民的不合规直接营销传播",
  "description": "网站在发送之前未获得明确的选择性同意就向津巴布韦居民发送商业营销电子邮件。",
  "severity": "moderate",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 25"
},
{
  "id": 716,
  "code": "AOGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "处理安哥拉个人数据未向 APD 报告",
  "description": "该实体在未向 APD 提交强制性声明或获得授权的情况下，处理安哥拉居民的个人记录。",
  "severity": "critical",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 28"
},
{
  "id": 717,
  "code": "AOGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在安哥拉处理敏感数据缺少明确同意",
  "description": "网站收集安哥拉居民的敏感数据（健康、生物识别记录），但未获得明确、事先的同意。",
  "severity": "serious",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 7"
},
{
  "id": 718,
  "code": "AOGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在安哥拉未完整披露接收者类别",
  "description": "隐私政策未能告知安哥拉居民访问其个人记录的特定第三方机构。",
  "severity": "moderate",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 14"
},
{
  "id": 719,
  "code": "AOGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "安哥拉个人数据库技术安全不足",
  "description": "包含安哥拉用户数据库条目的服务器托管配置缺乏保护数据防止未经授权泄露的技术保护措施。",
  "severity": "serious",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 19"
},
{
  "id": 720,
  "code": "AOGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "安哥拉个人数据非法跨境传输",
  "description": "网站在未获得 APD 事先书面批准的情况下，将安哥拉居民的个人数据传输到国外。",
  "severity": "moderate",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 33"
},
{
  "id": 721,
  "code": "ALGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未向阿尔及利亚 ANPDP 注册数据处理系统",
  "description": "数据控制者在未向 ANPDP 注册其数据系统的情况下，处理阿尔及利亚居民的个人记录。",
  "severity": "critical",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 13"
},
{
  "id": 722,
  "code": "ALGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在阿尔及利亚处理个人数据缺少明确的事先同意",
  "description": "网站在未获得事先、明确和有记录的同意的情况下，收集和处理阿尔及利亚公民的个人数据。",
  "severity": "serious",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 7"
},
{
  "id": 723,
  "code": "ALGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在阿尔及利亚未能兑现访问和删除的程序不当",
  "description": "数据库控制者缺乏供阿尔及利亚公民提交访问、更正或删除请求的文档记录方法。",
  "severity": "moderate",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 34"
},
{
  "id": 724,
  "code": "ALGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿尔及利亚记录不合规的国际传输",
  "description": "网站将阿尔及利亚个人数据库传输到国外，但未获得 ANPDP 的事先授权或安全批准。",
  "severity": "serious",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 44"
},
{
  "id": 725,
  "code": "ALGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "缺少向阿尔及利亚监管机构报告泄露的协议",
  "description": "该机构未制定向阿尔及利亚 ANPDP 以及受影响主体立即报告安全事件的程序文件。",
  "severity": "moderate",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 41"
},
{
  "id": 726,
  "code": "JORPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经同意处理约旦个人数据",
  "description": "网站收集和处理约旦居民的个人数据，但未获得明确、事先和有记录的同意。",
  "severity": "critical",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 4"
},
{
  "id": 727,
  "code": "JORPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "约旦业务缺少数据保护官 (DPO)",
  "description": "数据控制者大规模处理约旦个人数据库，但未能指定常驻数据保护官。",
  "severity": "serious",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 15"
},
{
  "id": 728,
  "code": "JORPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "约旦隐私声明中关于数据保留的披露不充分",
  "description": "隐私政策未能列明约旦公民数据的具体保留期限或用于确定保留期限的标准。",
  "severity": "moderate",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 8"
},
{
  "id": 729,
  "code": "JORPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "约旦数据不合规的跨境传输",
  "description": "该网站在未确保适当性保证或监管批准的情况下将约旦个人记录进行国际传输。",
  "severity": "serious",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 19"
},
{
  "id": 730,
  "code": "JORPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "约旦公民缺少完整的访问和更正执行选项",
  "description": "数据库系统缺乏为约旦公民提供的、用以要求访问或更正其个人数据的简化、免费机制。",
  "severity": "moderate",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 10"
},
{
  "id": 731,
  "code": "KWTDP-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科威特业务缺少有文件记录的 CITRA 合规信息",
  "description": "该网站收集科威特居民的个人数据，但未记录对 CITRA 数据保护条例的合规性。",
  "severity": "critical",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 5"
},
{
  "id": 732,
  "code": "KWTDP-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科威特商业推广信息缺少明确同意",
  "description": "网站在未获得事先明确选择同意的情况下，向科威特居民发送商业促销信息。",
  "severity": "serious",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 11"
},
{
  "id": 733,
  "code": "KWTDP-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科威特数据库安全防护不当",
  "description": "保存科威特用户记录的数据库系统缺乏防止未经授权数据访问的技术措施。",
  "severity": "moderate",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 14"
},
{
  "id": 734,
  "code": "KWTDP-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科威特缺少向 CITRA 报告安全事件的程序",
  "description": "控制者未能制定向科威特监管机构 (CITRA) 和受影响用户立即报告安全事件的程序文件。",
  "severity": "serious",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 21"
},
{
  "id": 735,
  "code": "KWTDP-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未能向科威特消费者提供简化的删除服务",
  "description": "网站未能向科威特消费者提供撤销同意和请求删除数据的直接、免费途径。",
  "severity": "moderate",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 8"
},
{
  "id": 736,
  "code": "UZBPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "乌兹别克斯坦居民数据未经明确同意进行处理",
  "description": "网站在未获得明确的事先同意的情况下，收集和处理乌兹别克斯坦公民的个人数据。",
  "severity": "critical",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 18"
},
{
  "id": 737,
  "code": "UZBPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "未能将服务器数据库本地化在乌兹别克斯坦境内",
  "description": "存储乌兹别克斯坦公民个人记录的数据库托管在乌兹别克斯坦境外，违反了本地化法律。",
  "severity": "serious",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 12-1"
},
{
  "id": 738,
  "code": "UZBPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "乌兹别克斯坦数据访问和更正通知不充分",
  "description": "隐私政策未能说明在乌兹别克斯坦要求访问、阻止或更正个人记录的用户权利。",
  "severity": "moderate",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 30"
},
{
  "id": 739,
  "code": "UZBPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "乌兹别克斯坦数据不合规的国际传输",
  "description": "控制者将乌兹别克斯坦公民的个人记录传输到缺乏足够保护水平的国家。",
  "severity": "serious",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 15"
},
{
  "id": 740,
  "code": "UZBPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "未在乌兹别克斯坦国家登记处注册个人数据库",
  "description": "控制者未能向国家登记处注册处理乌兹别克斯坦居民个人数据的数据库系统。",
  "severity": "moderate",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 24"
},
{
  "id": 741,
  "code": "GEOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未向乔治亚州国家监察局报告",
  "description": "数据控制者在未向国家监察局报告的情况下，处理格鲁吉亚居民的个人数据。",
  "severity": "critical",
  "reference": "Georgia Law on Personal Data Protection, Article 15"
},
{
  "id": 742,
  "code": "GEOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在乔治亚州处理敏感数据缺少明确同意",
  "description": "网站收集格鲁吉亚居民的敏感数据（健康、生物识别记录），但未获得明确的同意。",
  "severity": "serious",
  "reference": "Georgia Law on Personal Data Protection, Article 6"
},
{
  "id": 743,
  "code": "GEOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乔治亚州数据处理商和供应商披露不充分",
  "description": "隐私声明未能披露处理格鲁吉亚居民个人数据的特定第三方处理者。",
  "severity": "moderate",
  "reference": "Georgia Law on Personal Data Protection, Article 19"
},
{
  "id": 744,
  "code": "GEOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乔治亚州法律下缺少安全审计和权限级别",
  "description": "包含格鲁吉亚主体个人记录的数据库缺乏有文件记录的安全日志和用户访问审计。",
  "severity": "serious",
  "reference": "Georgia Law on Personal Data Protection, Article 24"
},
{
  "id": 745,
  "code": "GEOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乔治亚州数据阻止和删除程序不合规",
  "description": "控制者未能向格鲁吉亚主体提供请求阻止或删除数据的清晰联系渠道或答复时限。",
  "severity": "moderate",
  "reference": "Georgia Law on Personal Data Protection, Article 21"
},
{
  "id": 746,
  "code": "ARMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未遵守亚美尼亚《个人数据保护法》",
  "description": "数据控制者处理亚美尼亚居民的个人数据，但未遵守法定的要求。",
  "severity": "critical",
  "reference": "Armenia Law on Personal Data Protection, Article 9"
},
{
  "id": 747,
  "code": "ARMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在亚美尼亚进行自动画像缺少同意",
  "description": "网站对亚美尼亚居民进行自动定位或画像，但未获得明确的同意。",
  "severity": "serious",
  "reference": "Armenia Law on Personal Data Protection, Article 11"
},
{
  "id": 748,
  "code": "ARMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "亚美尼亚国际传输位置披露不完整",
  "description": "隐私声明未能披露亚美尼亚境外访问用户数据的特定国家或实体。",
  "severity": "moderate",
  "reference": "Armenia Law on Personal Data Protection, Article 27"
},
{
  "id": 749,
  "code": "ARMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "亚美尼亚个人数据银行缺少安全计划",
  "description": "包含亚美尼亚主体个人记录的数据库缺乏有文件记录的行政和逻辑安全计划。",
  "severity": "serious",
  "reference": "Armenia Law on Personal Data Protection, Article 19"
},
{
  "id": 750,
  "code": "ARMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "在亚美尼亚的访问和更正程序不当",
  "description": "控制者未能向亚美尼亚主体提供请求更正数据的清晰联系渠道或答复时限。",
  "severity": "moderate",
  "reference": "Armenia Law on Personal Data Protection, Article 15"
},
{
  "id": 751,
  "code": "SWSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑞士 FADP 规定下缺少对高风险画像的明确同意",
  "description": "该网站在未获得修订后的 FADP 规定的事先明确选择同意的情况下，对瑞士居民进行高风险画像。",
  "severity": "critical",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 6, Art. 60"
},
{
  "id": 752,
  "code": "SWSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑞士 FADP 规定下隐私声明披露不完整",
  "description": "该网站未能在其隐私声明中提供有关控制者身份、数据类别和接收国的完整信息。",
  "severity": "serious",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 19, Art. 60"
},
{
  "id": 753,
  "code": "SWSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "FADP 规定下境外控制者缺少代表联系信息",
  "description": "境外网站控制者未能指定或披露在瑞士的指定代表以进行数据主体沟通。",
  "severity": "moderate",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 14"
},
{
  "id": 754,
  "code": "SWSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的跨国瑞士数据传输",
  "description": "控制者在没有联邦委员会充足性决定或标准合同条款的情况下，将瑞士居民的个人数据导出到第三国。",
  "severity": "serious",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 16, Art. 17"
},
{
  "id": 755,
  "code": "SWSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑞士 FADP 规定下数据主体权利访问渠道不妥当",
  "description": "该网站未能向瑞士居民提供免费、可访问且透明的方法来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 25, Art. 26"
},
{
  "id": 756,
  "code": "SAUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "沙特 PDPL 规定下敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集沙特居民的敏感个人记录（健康、财务、基因）。",
  "severity": "critical",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 5, Art. 35"
},
{
  "id": 757,
  "code": "SAUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "沙特 PDPL 要求下缺少双语隐私声明",
  "description": "网站隐私声明未提供阿拉伯语版本，违反了沙特居民语言和透明访问的要求。",
  "severity": "serious",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 30"
},
{
  "id": 758,
  "code": "SAUPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "沙特阿拉伯不合规的直接营销沟通",
  "description": "该网站向沙特主体发送直接营销材料或广告 Cookie，但未获得事先选择同意并提供直接退出途径。",
  "severity": "moderate",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 28"
},
{
  "id": 759,
  "code": "SAUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经授权的沙特个人数据跨国传输",
  "description": "该网站将沙特居民的个人数据导出到外部托管环境，而未确保符合国家安全和充足性规定。",
  "severity": "serious",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 29, Art. 35"
},
{
  "id": 760,
  "code": "SAUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "沙特法律下未能记录数据主体救济途径",
  "description": "网站隐私政策未能概述沙特数据主体向监管机构 (SDAIA) 提出投诉的指定机制。",
  "severity": "moderate",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 9"
},
{
  "id": 761,
  "code": "ISRPA-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "以色列未注册敏感数据库处理",
  "description": "该网站在未向 PPA 注册数据库的情况下，收集以色列公民的敏感数据（宗教、健康、生物识别、政治）。",
  "severity": "critical",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 8, Section 31A"
},
{
  "id": 762,
  "code": "ISRPA-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "以色列法律下缺少对收集自愿性的披露",
  "description": "网页表单未能明确通知以色列用户，提供其个人信息是法律强制的还是自愿的。",
  "severity": "serious",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 11"
},
{
  "id": 763,
  "code": "ISRPA-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "以色列法规下访问控制和安全日志不妥当",
  "description": "该网站数据库缺乏以色列法规对包含个人文件的数据库所要求的合规安全日志监控和访问限制。",
  "severity": "moderate",
  "reference": "Israel Privacy Protection Regulations (Information Security), 5777-2017"
},
{
  "id": 764,
  "code": "ISRPA-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "以色列不合规的直接邮寄营销登记",
  "description": "网站控制者使用联系人列表向以色列公民进行直接邮寄营销，但未披露数据库来源并提供退出途径。",
  "severity": "serious",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 17F"
},
{
  "id": 765,
  "code": "ISRPA-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "以色列缺少直接访问和更正程序",
  "description": "隐私政策未能详细说明以色列主体查询、更正或请求删除其记录的行政流程或具体时限。",
  "severity": "moderate",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 13, Section 14"
},
{
  "id": 766,
  "code": "LKAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯里兰卡处理敏感数据缺少同意",
  "description": "该网站在未获得有效、明确同意的情况下，处理斯里兰卡主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "critical",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 6"
},
{
  "id": 767,
  "code": "LKAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯里兰卡个人数据过度保留",
  "description": "该网站保留斯里兰卡用户的个人数据时间超出其指定目的所需时间，违反了斯里兰卡法律规定的保留期限。",
  "severity": "serious",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 10"
},
{
  "id": 768,
  "code": "LKAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯里兰卡未能指定或披露 DPO 联系信息",
  "description": "数据控制者未能指定或提供斯里兰卡法律规定的指定数据保护官的公开联系途径。",
  "severity": "moderate",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 20"
},
{
  "id": 769,
  "code": "LKAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯里兰卡未能提供免费的数据主体访问权",
  "description": "该网站隐私政策未能建立在 21 天内免费回复斯里兰卡居民访问请求的程序。",
  "severity": "serious",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 14"
},
{
  "id": 770,
  "code": "LKAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的斯里兰卡数据跨国传输",
  "description": "控制者将斯里兰卡数据传输到未确保具备符合监管机构规定的同等保护水平的外部国家。",
  "severity": "moderate",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 26"
},
{
  "id": 771,
  "code": "MUSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里求斯处理敏感数据缺少合法基础",
  "description": "该网站在没有合法依据或事先明确同意的情况下，收集毛里求斯公民的敏感个人记录。",
  "severity": "critical",
  "reference": "Mauritius Data Protection Act 2017, Sec. 29, Sec. 43"
},
{
  "id": 772,
  "code": "MUSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里求斯跨国传输披露不完整",
  "description": "隐私政策未能披露传输详情，或未能就将毛里求斯用户数据导出到外部云位置征得同意。",
  "severity": "serious",
  "reference": "Mauritius Data Protection Act 2017, Sec. 28"
},
{
  "id": 773,
  "code": "MUSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里求斯缺少直接撤回同意的方法",
  "description": "该网站未能向毛里求斯居民提供直接、简便且免费的方法来撤回对正在进行的处理操作的同意。",
  "severity": "moderate",
  "reference": "Mauritius Data Protection Act 2017, Sec. 28(2)"
},
{
  "id": 774,
  "code": "MUSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里求斯不合规的 72 小时泄露报告",
  "description": "根据毛里求斯法律，网站控制者缺乏在 72 小时内向专员报告安全事件的文件记录程序。",
  "severity": "serious",
  "reference": "Mauritius Data Protection Act 2017, Sec. 44, Sec. 47"
},
{
  "id": 775,
  "code": "MUSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里求斯擦除和更正渠道不妥当",
  "description": "该网站未能向毛里求斯主体提供明确的的行政联系渠道，以请求擦除或更正其记录。",
  "severity": "moderate",
  "reference": "Mauritius Data Protection Act 2017, Sec. 39"
},
{
  "id": 776,
  "code": "TZNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "坦桑尼亚在未向委员会注册的情况下处理个人数据",
  "description": "该网站在未向个人数据保护委员会注册为数据控制者的情况下，收集坦桑尼亚主体的个人数据。",
  "severity": "critical",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 14, Sec. 15"
},
{
  "id": 777,
  "code": "TZNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "坦桑尼亚不合规的直接营销沟通",
  "description": "该网站在未获得事先选择同意的情况下，将坦桑尼亚公民的个人信息用于商业直接营销。",
  "severity": "serious",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 31"
},
{
  "id": 778,
  "code": "TZNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "坦桑尼亚访问和更正程序不妥当",
  "description": "该网站隐私政策未能为坦桑尼亚用户查阅和更正记录记录下可访问的程序和具体的联系方式。",
  "severity": "moderate",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 27, Sec. 28"
},
{
  "id": 779,
  "code": "TZNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的坦桑尼亚跨国数据传输",
  "description": "控制者在未获得委员会事先批准或许可的情况下，将坦桑尼亚居民的个人记录传输到该国境外。",
  "severity": "serious",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 32"
},
{
  "id": 780,
  "code": "TZNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "坦桑尼亚未能记录安全泄露通知协议",
  "description": "数据控制者未能记录在可行情况下尽快向委员会和受影响主体通知安全泄露事件的行政程序。",
  "severity": "moderate",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 40"
},
{
  "id": 781,
  "code": "BTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波札那在未获得同意的情况下处理敏感个人数据",
  "description": "该网站在未获得事先书面或数字明确同意的情况下，处理博茨瓦纳主体的敏感个人数据（健康、政治、性取向）。",
  "severity": "critical",
  "reference": "Botswana Data Protection Act, 2018, Sec. 16, Sec. 49"
},
{
  "id": 782,
  "code": "BTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波札那跨国传输缺少不充分授权",
  "description": "控制者在未获得专员授权的情况下，将博茨瓦纳居民的个人记录传输到缺乏适当法律的国家。",
  "severity": "serious",
  "reference": "Botswana Data Protection Act, 2018, Sec. 48, Sec. 49"
},
{
  "id": 783,
  "code": "BTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波札那敏感数据库文件安全措施不妥当",
  "description": "该网站数据库未能实施适当的安全防范措施和加密来保护博茨瓦纳用户的个人记录。",
  "severity": "moderate",
  "reference": "Botswana Data Protection Act, 2018, Sec. 33"
},
{
  "id": 784,
  "code": "BTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波札那缺少数据主体访问和限制方法",
  "description": "隐私政策未能记录下博茨瓦纳用户行使其查询或限制数据处理权利的可访问方法。",
  "severity": "serious",
  "reference": "Botswana Data Protection Act, 2018, Sec. 21, Sec. 22"
},
{
  "id": 785,
  "code": "BTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波札那缺少直接撤回同意的途径",
  "description": "该网站未能向博茨瓦纳居民提供直接、透明且免费的机制来撤销对数据跟踪的同意。",
  "severity": "moderate",
  "reference": "Botswana Data Protection Act, 2018, Sec. 20"
},
{
  "id": 786,
  "code": "ZMBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "赞比亚在未获得书面同意的情况下处理敏感个人数据",
  "description": "该网站在未获得事先书面明确同意的情况下，收集赞比亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Zambia Data Protection Act, 2021, Sec. 10, Sec. 15"
},
{
  "id": 787,
  "code": "ZMBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "赞比亚在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护专员办公室注册的情况下，收集赞比亚居民的个人信息。",
  "severity": "serious",
  "reference": "Zambia Data Protection Act, 2021, Sec. 10, Sec. 11"
},
{
  "id": 788,
  "code": "ZMBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "赞比亚法律下未能指定或披露 DPO",
  "description": "网站控制者未能按照赞比亚法规的要求，指定数据保护官或提供其公开的联系信息。",
  "severity": "moderate",
  "reference": "Zambia Data Protection Act, 2021, Sec. 41"
},
{
  "id": 789,
  "code": "ZMBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "赞比亚不合规的数据保留周期",
  "description": "该网站保留赞比亚用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Zambia Data Protection Act, 2021, Sec. 14"
},
{
  "id": 790,
  "code": "ZMBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的赞比亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或未获得所需授权的情况下，将赞比亚居民的数据传输到赞比亚境外。",
  "severity": "moderate",
  "reference": "Zambia Data Protection Act, 2021, Sec. 47"
},
{
  "id": 791,
  "code": "JAMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "牙买加未能向信息专员注册",
  "description": "该网站控制者在未向信息专员注册为数据控制者的情况下，收集牙买加居民的个人信息。",
  "severity": "critical",
  "reference": "Jamaica Data Protection Act, 2020, Section 14, Section 67"
},
{
  "id": 792,
  "code": "JAMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "牙买加法律下缺少数据保护官联系方式",
  "description": "该网站隐私政策未能指明牙买加指定数据保护官，或提供其直接的公开联系方式。",
  "severity": "serious",
  "reference": "Jamaica Data Protection Act, 2020, Section 18"
},
{
  "id": 793,
  "code": "JAMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "牙买加法律下缺少数据主体画像选择退出途径",
  "description": "该网站未能向牙买加居民提供明确的选择退出或反对用于画像和直接营销处理的选项。",
  "severity": "moderate",
  "reference": "Jamaica Data Protection Act, 2020, Section 27"
},
{
  "id": 794,
  "code": "JAMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "牙买加法律下缺少正式的数据处理者协议",
  "description": "控制者在没有约束性书面合同的情况下，将牙买加居民的个人记录传输给第三方托管商或处理者。",
  "severity": "serious",
  "reference": "Jamaica Data Protection Act, 2020, Section 31"
},
{
  "id": 795,
  "code": "JAMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的牙买加跨国数据传输",
  "description": "控制者在未获得专员授权的情况下，将牙买加用户的个人数据导出到缺乏适当保护的国家。",
  "severity": "moderate",
  "reference": "Jamaica Data Protection Act, 2020, Section 36"
},
{
  "id": 796,
  "code": "BRBPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴巴多斯未注册个人数据处理",
  "description": "该网站在未向数据保护专员注册的情况下，收集巴巴多斯公民的个人信息。",
  "severity": "critical",
  "reference": "Barbados Data Protection Act, 2019, Sec. 14, Sec. 51"
},
{
  "id": 797,
  "code": "BRBPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴巴多斯数据安全措施不妥当",
  "description": "该网站缺乏技术和行政保障措施，来保护所收集的巴巴多斯居民记录免受未经授权的访问或泄露。",
  "severity": "serious",
  "reference": "Barbados Data Protection Act, 2019, Sec. 32"
},
{
  "id": 798,
  "code": "BRBPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴巴多斯法律下隐私声明缺少披露",
  "description": "隐私政策未能向巴巴多斯用户提供有关数据目的、保留限制和第三方接收者的信息。",
  "severity": "moderate",
  "reference": "Barbados Data Protection Act, 2019, Sec. 37"
},
{
  "id": 799,
  "code": "BRBPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴巴多斯缺少直接反对机制",
  "description": "该网站未能向巴巴多斯数据主体提供明确、直接的机制，以反对或限制出于商业目的的处理。",
  "severity": "serious",
  "reference": "Barbados Data Protection Act, 2019, Sec. 24"
},
{
  "id": 800,
  "code": "BRBPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴巴多斯不合规的 72 小时泄露报告",
  "description": "该网站未能记录在安全事件发生后 72 小时内通知专员的安全泄露报告协议。",
  "severity": "moderate",
  "reference": "Barbados Data Protection Act, 2019, Sec. 46"
},
{
  "id": 801,
  "code": "BHSPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴哈马未注册个人数据处理",
  "description": "该网站在未向数据保护专员注册处理登记表的情况下，收集巴哈马主体的敏感个人记录。",
  "severity": "critical",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 5, Sec. 15"
},
{
  "id": 802,
  "code": "BHSPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴哈马数据安全措施不妥当",
  "description": "数据库收集并存储巴哈马居民的个人文件，但未实施适当的安全措施来防止数据丢失。",
  "severity": "serious",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 11"
},
{
  "id": 803,
  "code": "BHSPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴哈马缺少更正和删除权",
  "description": "该网站隐私政策未能为巴哈马居民记录下可访问的联系途径，以请求更正或擦除文件。",
  "severity": "moderate",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 8"
},
{
  "id": 804,
  "code": "BHSPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴哈马不合规的直接营销选择退出",
  "description": "该网站向巴哈马主体发送广告电子邮件或直接营销 Cookie，但未提供直接、免费的退出机制。",
  "severity": "serious",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 13"
},
{
  "id": 805,
  "code": "BHSPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "巴哈马法律下数据过度保留限制",
  "description": "该网站无限期保留巴哈马用户的个人记录，而未建立具体的期限或清理周期。",
  "severity": "moderate",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 6"
},
{
  "id": 806,
  "code": "TTOPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "特立尼达和多巴哥未注册敏感数据库处理",
  "description": "该网站在未向信息专员注册数据库的情况下，处理特立尼达和多巴哥居民的敏感个人记录。",
  "severity": "critical",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 46, Section 82"
},
{
  "id": 807,
  "code": "TTOPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "特立尼达和多巴哥数据安全措施不妥当",
  "description": "该数据库收集并处理特立尼达和多巴哥用户的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "serious",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 38"
},
{
  "id": 808,
  "code": "TTOPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "特立尼达和多巴哥不合规的 30 天访问请求时限",
  "description": "该网站隐私政策未能记录下在 30 天内回复数据访问请求的联系方式或程序。",
  "severity": "moderate",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 42"
},
{
  "id": 809,
  "code": "TTOPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的特立尼达和多巴哥数据跨国传输",
  "description": "该网站在未获得用户同意的情况下，将特立尼达和多巴哥用户的个人记录传输到缺乏同等法律保护的国家。",
  "severity": "serious",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 46(2)"
},
{
  "id": 810,
  "code": "TTOPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "特立尼达和多巴哥未经同意的数据次要目的处理",
  "description": "该网站在未获得事先同意的情况下，将收集自特立尼达和多巴哥用户的个人数据用于次要营销目的。",
  "severity": "moderate",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 32"
},
{
  "id": 811,
  "code": "MCOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩纳哥未能向 CCIN 通知数据处理",
  "description": "该网站收集摩纳哥居民的个人信息，但未向 CCIN 提交声明或寻求授权。",
  "severity": "critical",
  "reference": "Monaco Law No. 1.165, Article 7, Article 21"
},
{
  "id": 812,
  "code": "MCOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩纳哥境外控制者缺少本地代表联系信息",
  "description": "境外控制者未能指定或披露在摩纳哥的指定代表以进行数据主体沟通。",
  "severity": "serious",
  "reference": "Monaco Law No. 1.165, Article 7-1"
},
{
  "id": 813,
  "code": "MCOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩纳哥 Cookie 同意和选择退出选项不妥当",
  "description": "该网站在未事先进行透明通知且未提供主动选择同意的情况下，在摩纳哥用户的浏览器中设置广告 Cookie。",
  "severity": "moderate",
  "reference": "Monaco Law No. 1.165, Article 11, Article 12"
},
{
  "id": 814,
  "code": "MCOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经授权从摩纳哥导出个人数据",
  "description": "该网站将摩纳哥用户的个人记录传输到国外，而未确保合规性或寻求 CCIN 传输授权。",
  "severity": "serious",
  "reference": "Monaco Law No. 1.165, Article 20, Article 20-1"
},
{
  "id": 815,
  "code": "MCOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩纳哥行使反对权的渠道不妥当",
  "description": "隐私政策未能为摩纳哥主体建立清晰的联系渠道，以反对数据处理或请求更正文件。",
  "severity": "moderate",
  "reference": "Monaco Law No. 1.165, Article 13, Article 15"
},
{
  "id": 816,
  "code": "ADPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "安道尔法律 29/2021 规定下缺少合法处理基础",
  "description": "该网站在未根据《合格法》建立有效合法处理依据的情况下，处理安道尔居民的个人数据。",
  "severity": "critical",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 6, Article 7"
},
{
  "id": 817,
  "code": "ADPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "安道尔未指定或未注册 DPO",
  "description": "当按照第 29/2021 号法律的要求进行处理时，网站控制者未能指定数据保护官或向 APDA 注册。",
  "severity": "serious",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 37"
},
{
  "id": 818,
  "code": "ADPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "安道尔法律下隐私声明披露不妥当",
  "description": "该网站隐私声明未能披露数据保留期限、法律依据或安道尔居民向 APDA 投诉的权利。",
  "severity": "moderate",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 13, Article 14"
},
{
  "id": 819,
  "code": "ADPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的安道尔跨国数据传输",
  "description": "控制者将安道尔主体的个人记录传输到第三国，而没有充足性决定或 APDA 授权的条款。",
  "severity": "serious",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 44, Article 45"
},
{
  "id": 820,
  "code": "ADPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "安道尔履行擦除权的渠道不妥当",
  "description": "该网站未能向安道尔用户提供清晰、直接且免费的方法来请求擦除或限制其个人数据。",
  "severity": "moderate",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 15, Article 18"
},
{
  "id": 821,
  "code": "SRBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞尔维亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集塞尔维亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "critical",
  "reference": "Serbia Law on Personal Data Protection, Article 17, Article 95"
},
{
  "id": 822,
  "code": "SRBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞尔维亚境外控制者缺少本地代表联系信息",
  "description": "境外网站控制者未能指定或披露在塞尔维亚的指定本地代表，以进行数据保护合规。",
  "severity": "serious",
  "reference": "Serbia Law on Personal Data Protection, Article 44"
},
{
  "id": 823,
  "code": "SRBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞尔维亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明塞尔维亚的数据处理目的、保留细节，或与本地专员的联系方式。",
  "severity": "moderate",
  "reference": "Serbia Law on Personal Data Protection, Article 23"
},
{
  "id": 824,
  "code": "SRBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞尔维亚不合规的 72 小时泄露报告",
  "description": "网站控制者未能记录在 72 小时内向塞尔维亚专员报告安全事件的程序。",
  "severity": "serious",
  "reference": "Serbia Law on Personal Data Protection, Article 52, Article 95"
},
{
  "id": 825,
  "code": "SRBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞尔维亚数据主体访问权回复方式不妥当",
  "description": "该网站未能为塞尔维亚数据主体建立在 30 天答复期内行使访问或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Serbia Law on Personal Data Protection, Article 21, Article 22"
},
{
  "id": 826,
  "code": "ALBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿尔巴尼亚在未通知的情况下处理个人数据",
  "description": "该网站在未向专员提交处理通知的情况下，收集阿尔巴尼亚居民的个人数据。",
  "severity": "critical",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 21, Article 39"
},
{
  "id": 827,
  "code": "ALBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经授权的阿尔巴尼亚个人数据跨国传输",
  "description": "该网站将阿尔巴尼亚用户的个人数据导出到外部托管环境，而未确保合规性或寻求专员批准。",
  "severity": "serious",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 8, Article 9"
},
{
  "id": 828,
  "code": "ALBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿尔巴尼亚不合规的直接营销沟通",
  "description": "该网站在未提供直接、免费退出选择的情况下，将阿尔巴尼亚主体的个人信息用于商业直接营销。",
  "severity": "moderate",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 16"
},
{
  "id": 829,
  "code": "ALBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿尔巴尼亚法律下数据库文件安全措施不妥当",
  "description": "该网站数据库缺乏保护阿尔巴尼亚用户个人记录所需的合规加密和访问控制。",
  "severity": "serious",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 18"
},
{
  "id": 830,
  "code": "ALBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿尔巴尼亚数据主体访问权回复方式不妥当",
  "description": "该网站隐私政策未能建立明确的联系渠道或程序，以查阅、更正或请求删除阿尔巴尼亚的记录。",
  "severity": "moderate",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 12, Article 15"
},
{
  "id": 831,
  "code": "TUNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "突尼斯在未向 INPDP 申报的情况下处理个人数据",
  "description": "该网站收集突尼斯居民的个人信息，但未向 INPDP 提交申报或寻求授权。",
  "severity": "critical",
  "reference": "Tunisia Organic Law No. 2004-63, Article 7, Article 76"
},
{
  "id": 832,
  "code": "TUNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "突尼斯敏感数据缺少书面同意",
  "description": "该网站在未获得事先书面同意的情况下，处理突尼斯居民的敏感类别个人数据（健康、政治观点）。",
  "severity": "serious",
  "reference": "Tunisia Organic Law No. 2004-63, Article 13, Article 77"
},
{
  "id": 833,
  "code": "TUNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "突尼斯法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或突尼斯居民请求擦除数据的前提程序。",
  "severity": "moderate",
  "reference": "Tunisia Organic Law No. 2004-63, Article 27"
},
{
  "id": 834,
  "code": "TUNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "突尼斯不合规的直接营销沟通",
  "description": "该网站在未获得事先选择同意的情况下，将突尼斯主体的个人信息用于商业直接营销。",
  "severity": "serious",
  "reference": "Tunisia Organic Law No. 2004-63, Article 31, Article 82"
},
{
  "id": 835,
  "code": "TUNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的突尼斯跨国数据传输",
  "description": "控制者将突尼斯用户的个人数据导出到外部托管环境，而没有确保符合充足性和监管批准。",
  "severity": "moderate",
  "reference": "Tunisia Organic Law No. 2004-63, Article 49, Article 85"
},
{
  "id": 836,
  "code": "SENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞内加尔在未通知 CDP 的情况下处理个人数据",
  "description": "该网站收集塞内加尔居民的个人信息，但未向 CDP 提交处理通知。",
  "severity": "critical",
  "reference": "Senegal Law No. 2008-12, Article 16, Article 46"
},
{
  "id": 837,
  "code": "SENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞内加尔数据安全措施不妥当",
  "description": "该数据库收集并处理塞内加尔居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "serious",
  "reference": "Senegal Law No. 2008-12, Article 70, Article 71"
},
{
  "id": 838,
  "code": "SENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞内加尔隐私声明中缺少第三方接收者披露",
  "description": "该网站隐私政策未能指明塞内加尔居民数据的外部第三方接收者或云托管位置。",
  "severity": "moderate",
  "reference": "Senegal Law No. 2008-12, Article 58"
},
{
  "id": 839,
  "code": "SENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞内加尔不合规的直接营销沟通",
  "description": "该网站向塞内加尔主体发送广告电子邮件或营销 Cookie，但未获得事先选择同意并提供退出路径。",
  "severity": "serious",
  "reference": "Senegal Law No. 2008-12, Article 33"
},
{
  "id": 840,
  "code": "SENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞内加尔擦除和更正权渠道不妥当",
  "description": "该网站隐私政策未能向塞内加尔主体提供明确的的联系渠道，以请求擦除或更正其记录。",
  "severity": "moderate",
  "reference": "Senegal Law No. 2008-12, Article 69"
},
{
  "id": 841,
  "code": "CIVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科特迪瓦未能向 ARTCI 注册数据库处理",
  "description": "该网站控制者在未向 ARTCI 提交注册通知的情况下，收集科特迪瓦居民的个人信息。",
  "severity": "critical",
  "reference": "Ivory Coast Law No. 2013-450, Article 6, Article 42"
},
{
  "id": 842,
  "code": "CIVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科特迪瓦敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理科特迪瓦主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Ivory Coast Law No. 2013-450, Article 9, Article 43"
},
{
  "id": 843,
  "code": "CIVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科特迪瓦擦除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或科特迪瓦居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Ivory Coast Law No. 2013-450, Article 28"
},
{
  "id": 844,
  "code": "CIVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的科特迪瓦跨国数据传输",
  "description": "控制者在未获得 ARTCI 事先授权的情况下，将科特迪瓦主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Ivory Coast Law No. 2013-450, Article 35, Article 45"
},
{
  "id": 845,
  "code": "CIVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科特迪瓦不合规的直接营销沟通",
  "description": "该网站向科特迪瓦主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Ivory Coast Law No. 2013-450, Article 25"
},
{
  "id": 846,
  "code": "MNGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "蒙古在没有法律依据的情况下处理个人数据",
  "description": "该网站在未根据蒙古法律建立有效合法处理依据或获得同意的情况下，收集蒙古居民的个人信息。",
  "severity": "critical",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 6, Article 32"
},
{
  "id": 847,
  "code": "MNGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "蒙古法律下缺少安全事件通知渠道",
  "description": "该网站控制者未能记录下通知蒙古主体数据泄露事件的特定行政或公开程序。",
  "severity": "serious",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 15"
},
{
  "id": 848,
  "code": "MNGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "蒙古缺少数据主体更正和擦除权",
  "description": "该网站隐私政策未能为蒙古用户记录下可访问的联系途径或请求更正、销毁记录的具体程序。",
  "severity": "moderate",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 17, Article 18"
},
{
  "id": 849,
  "code": "MNGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "蒙古在未获得书面同意的情况下处理生物识别数据",
  "description": "该网站在未获得事先书面明确同意的情况下，收集蒙古主体的敏感生物识别或基因文件。",
  "severity": "serious",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 8, Article 12"
},
{
  "id": 850,
  "code": "MNGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "蒙古不合规的直接营销沟通",
  "description": "该网站向蒙古主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 23"
},
{
  "id": 851,
  "code": "NORPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "挪威在未获得明确同意的情况下处理敏感个人数据",
  "description": "该网站在未获得 Datatilsynet 要求的明确事先选择同意的情况下，处理挪威用户的敏感个人记录。",
  "severity": "critical",
  "reference": "Norway Personal Data Act, Sec. 1 (incorporating GDPR Art. 9)"
},
{
  "id": 852,
  "code": "NORPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "挪威儿童服务年龄验证不完整",
  "description": "该网站未能为 13 岁以下的挪威用户实施健全的年龄验证或家长同意机制。",
  "severity": "serious",
  "reference": "Norway Personal Data Act, Sec. 12"
},
{
  "id": 853,
  "code": "NORPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "挪威法规下隐私声明披露不妥当",
  "description": "隐私政策未能指明挪威的联系信息或向 Datatilsynet 提出投诉的具体细节。",
  "severity": "moderate",
  "reference": "Norway Personal Data Act (GDPR Art. 13)"
},
{
  "id": 854,
  "code": "NORPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "挪威缺少 72 小时安全事件通知协议",
  "description": "数据控制者未能记录下在 72 小时内向 Datatilsynet 报告数据泄露的行政程序。",
  "severity": "serious",
  "reference": "Norway Personal Data Act (GDPR Art. 33)"
},
{
  "id": 855,
  "code": "NORPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "挪威数据访问和擦除回复途径不妥当",
  "description": "该网站未能为挪威数据主体建立透明、免费的联系渠道以请求删除或查询个人数据。",
  "severity": "moderate",
  "reference": "Norway Personal Data Act (GDPR Art. 15, Art. 17)"
},
{
  "id": 856,
  "code": "ISLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冰岛在未获得书面同意的情况下处理敏感数据",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集冰岛主体的敏感个人记录。",
  "severity": "critical",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 9)"
},
{
  "id": 857,
  "code": "ISLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冰岛儿童同意年龄验证缺失",
  "description": "该网站未能为 13 岁以下的冰岛信息社会服务用户实施家长同意机制。",
  "severity": "serious",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018, Sec. 14"
},
{
  "id": 858,
  "code": "ISLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冰岛隐私声明披露不完整",
  "description": "隐私声明未能披露有关数据保留期限，或向冰岛 DPA (Persónuvernd) 投诉的权利的详细信息。",
  "severity": "moderate",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 13)"
},
{
  "id": 859,
  "code": "ISLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冰岛缺少安全事件通知协议",
  "description": "该网站未能建立在 72 小时内向 Persónuvernd 和受影响的主体通知冰岛境内安全泄露事件的程序。",
  "severity": "serious",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 33)"
},
{
  "id": 860,
  "code": "ISLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冰岛数据主体权利回复方式不妥当",
  "description": "该网站未能为冰岛数据主体建立透明、免费的联系渠道以请求更正或删除文件。",
  "severity": "moderate",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 15, Art. 17)"
},
{
  "id": 861,
  "code": "LIEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "列支敦士登在未获得明确同意的情况下处理敏感个人数据",
  "description": "该网站收集列支敦士登居民的敏感个人记录，但未获得事先明确的书面或数字同意。",
  "severity": "critical",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 4, GDPR Art. 9"
},
{
  "id": 862,
  "code": "LIEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "列支敦士登儿童同意年龄验证不完整",
  "description": "该网站未能为 16 岁以下的列支敦士登用户实施年龄验证或家长同意机制。",
  "severity": "serious",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 12, GDPR Art. 8"
},
{
  "id": 863,
  "code": "LIEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "列支敦士登法律下隐私声明披露不妥当",
  "description": "该网站隐私政策未能指明数据保留期限，或向列支敦士登 DPA (DSS) 投诉的权利。",
  "severity": "moderate",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 15, GDPR Art. 13"
},
{
  "id": 864,
  "code": "LIEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "列支敦士登缺少 72 小时安全事件通知协议",
  "description": "根据法律要求，网站控制者未能记录在 72 小时内向列支敦士登专员 (DSS) 报告安全事件的程序。",
  "severity": "serious",
  "reference": "Liechtenstein Data Protection Act (DSG), GDPR Art. 33"
},
{
  "id": 865,
  "code": "LIEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "列支敦士登数据主体权利访问渠道不妥当",
  "description": "该网站未能为列支敦士登居民提供免费、可访问且透明的方法，来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Liechtenstein Data Protection Act (DSG), GDPR Art. 15, Art. 17"
},
{
  "id": 866,
  "code": "MKDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "北马其顿在未获得书面同意的情况下处理敏感数据",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，处理北马其顿居民的敏感类别个人数据。",
  "severity": "critical",
  "reference": "North Macedonia Law on Personal Data Protection, Article 13, Article 100"
},
{
  "id": 867,
  "code": "MKDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "北马其顿未能指定或注册 DPO",
  "description": "网站控制者未能按照当地法规的要求，指定数据保护官或提供其公开的联系方式。",
  "severity": "serious",
  "reference": "North Macedonia Law on Personal Data Protection, Article 32"
},
{
  "id": 868,
  "code": "MKDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马其顿法规下隐私声明披露不妥当",
  "description": "该网站隐私声明未能披露数据保留期限、法律依据或马其顿居民向局 (Agency) 投诉的权利。",
  "severity": "moderate",
  "reference": "North Macedonia Law on Personal Data Protection, Article 17, Article 18"
},
{
  "id": 869,
  "code": "MKDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "北马其顿缺少 72 小时安全事件通知协议",
  "description": "数据控制者未能记录在 72 小时内向个人数据保护局报告安全事件的程序。",
  "severity": "serious",
  "reference": "North Macedonia Law on Personal Data Protection, Article 37, Article 100"
},
{
  "id": 870,
  "code": "MKDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "北马其顿数据主体权利访问渠道不妥当",
  "description": "该网站未能为北马其顿居民提供免费、可访问且透明的方法，来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "North Macedonia Law on Personal Data Protection, Article 19, Article 21"
},
{
  "id": 871,
  "code": "MNEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "黑山处理敏感数据缺少同意",
  "description": "该网站收集黑山居民的敏感个人记录，但未获得事先书面或数字明确同意。",
  "severity": "critical",
  "reference": "Montenegro Law on Personal Data Protection, Article 9, Article 13"
},
{
  "id": 872,
  "code": "MNEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "黑山法律下数据库文件安全措施不妥当",
  "description": "该网站数据库缺乏保护黑山用户个人记录所需的合规加密和访问控制。",
  "severity": "serious",
  "reference": "Montenegro Law on Personal Data Protection, Article 24"
},
{
  "id": 873,
  "code": "MNEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "黑山法律下隐私声明披露不妥当",
  "description": "该网站隐私声明未能披露数据保留期限、法律依据或黑山居民向局 (AZLP) 投诉的权利。",
  "severity": "moderate",
  "reference": "Montenegro Law on Personal Data Protection, Article 21"
},
{
  "id": 874,
  "code": "MNEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经授权的黑山数据跨国传输",
  "description": "该网站在未获得 AZLP 批准的情况下，将黑山居民的个人数据导出到未能确保同等保护水平的外部国家。",
  "severity": "serious",
  "reference": "Montenegro Law on Personal Data Protection, Article 28"
},
{
  "id": 875,
  "code": "MNEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "黑山数据主体权利访问渠道不妥当",
  "description": "该网站未能为黑山居民提供免费、可访问且透明的方法来行使其查询、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Montenegro Law on Personal Data Protection, Article 19, Article 20"
},
{
  "id": 876,
  "code": "BIHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波斯尼亚和黑塞哥维那敏感数据缺少明确同意",
  "description": "该网站收集波斯尼亚和黑塞哥维那居民的敏感个人记录（健康、生物识别），但未获得事先书面或数字明确同意。",
  "severity": "critical",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 9, Article 42"
},
{
  "id": 877,
  "code": "BIHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波斯尼亚和黑塞哥维那数据库文件安全措施不妥当",
  "description": "该网站数据库缺乏保护波斯尼亚和黑塞哥维那用户个人记录所需的合规安全日志监控和访问限制。",
  "severity": "serious",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 11"
},
{
  "id": 878,
  "code": "BIHPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波斯尼亚和黑塞哥维那法规下隐私声明披露不妥当",
  "description": "该网站隐私政策未能指明数据保留期限，或向波斯尼亚 AZLP 投诉的权利。",
  "severity": "moderate",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 15"
},
{
  "id": 879,
  "code": "BIHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经授权的波斯尼亚个人数据跨国传输",
  "description": "该网站在未获得 AZLP 批准的情况下，将波斯尼亚和黑塞哥维那居民的个人数据导出到缺乏适当保护的国家。",
  "severity": "serious",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 18"
},
{
  "id": 880,
  "code": "BIHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波斯尼亚缺少删除和更正权利的回复渠道",
  "description": "该网站未能向波斯尼亚主体提供直接、简便且免费的方法来请求更正或擦除文件。",
  "severity": "moderate",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 24, Article 25"
},
{
  "id": 881,
  "code": "MDAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩尔多瓦未能向 CNPDCP 注册处理登记表",
  "description": "该网站收集摩尔多瓦居民的个人信息，但未向 CNPDCP 注册处理登记表或寻求其授权。",
  "severity": "critical",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 6, Article 32"
},
{
  "id": 882,
  "code": "MDAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩尔多瓦敏感数据缺少明确同意",
  "description": "该网站处理摩尔多瓦主体的敏感个人数据（生物识别、健康），但未获得事先明确的书面或数字同意。",
  "severity": "serious",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 5"
},
{
  "id": 883,
  "code": "MDAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩尔多瓦法律下隐私声明披露不妥当",
  "description": "隐私声明未能披露数据保留期限、法律依据或摩尔多瓦居民向 CNPDCP 投诉的权利。",
  "severity": "moderate",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 12"
},
{
  "id": 884,
  "code": "MDAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的摩尔多瓦跨国数据传输",
  "description": "控制者将摩尔多瓦主体的个人记录传输到第三国，而没有充足性决定或 CNPDCP 授权的条款。",
  "severity": "serious",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 32"
},
{
  "id": 885,
  "code": "MDAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "摩尔多瓦数据主体权利访问渠道不妥当",
  "description": "该网站未能为摩尔多瓦居民提供免费、可访问且透明的方法，来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 15"
},
{
  "id": 886,
  "code": "KGZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "吉尔吉斯斯坦在没有法律依据的情况下处理个人数据",
  "description": "该网站在未根据吉尔吉斯斯坦法律建立有效合法处理依据或获得同意的情况下，收集吉尔吉斯斯坦居民的个人信息。",
  "severity": "critical",
  "reference": "Kyrgyzstan Law on Personal Information, Article 5, Article 29"
},
{
  "id": 887,
  "code": "KGZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "吉尔吉斯斯坦敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集吉尔吉斯斯坦居民的敏感个人记录（健康、宗教）。",
  "severity": "serious",
  "reference": "Kyrgyzstan Law on Personal Information, Article 8"
},
{
  "id": 888,
  "code": "KGZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "吉尔吉斯斯坦法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明吉尔吉斯斯坦的数据处理目的、保留细节，或与本地国家局的联系方式。",
  "severity": "moderate",
  "reference": "Kyrgyzstan Law on Personal Information, Article 19"
},
{
  "id": 889,
  "code": "KGZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的吉尔吉斯斯坦跨国数据传输",
  "description": "控制者在未确保同等保护水平或获得国家局批准的情况下，将吉尔吉斯斯坦主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Kyrgyzstan Law on Personal Information, Article 25"
},
{
  "id": 890,
  "code": "KGZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "吉尔吉斯斯坦数据主体权利回复方式不妥当",
  "description": "该网站未能为吉尔吉斯斯坦数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Kyrgyzstan Law on Personal Information, Article 17, Article 18"
},
{
  "id": 891,
  "code": "TJKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塔吉克斯坦在没有法律依据的情况下处理个人数据",
  "description": "该网站在未根据塔吉克斯坦法律建立有效合法处理依据或获得同意的情况下，收集塔吉克斯坦居民的个人信息。",
  "severity": "critical",
  "reference": "Tajikistan Law on Personal Data, Article 5, Article 21"
},
{
  "id": 892,
  "code": "TJKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塔吉克斯坦敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集塔吉克斯坦居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Tajikistan Law on Personal Data, Article 8"
},
{
  "id": 893,
  "code": "TJKPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塔吉克斯坦法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明塔吉克斯坦的数据处理目的、保留细节，或与本地授权机构的联系方式。",
  "severity": "moderate",
  "reference": "Tajikistan Law on Personal Data, Article 15"
},
{
  "id": 894,
  "code": "TJKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的塔吉克斯坦跨国数据传输",
  "description": "控制者在未确保同等保护水平或获得授权机构批准的情况下，将塔吉克斯坦主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Tajikistan Law on Personal Data, Article 18"
},
{
  "id": 895,
  "code": "TJKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塔吉克斯坦数据主体权利回复方式不妥当",
  "description": "该网站未能为塔吉克斯坦数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Tajikistan Law on Personal Data, Article 11, Article 12"
},
{
  "id": 896,
  "code": "TGOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "多哥在未通知 IPDCP 的情况下处理个人数据",
  "description": "该网站收集多哥居民的个人信息，但未向 IPDCP 提交处理通知。",
  "severity": "critical",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 16, Article 50"
},
{
  "id": 897,
  "code": "TGOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "多哥敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理多哥主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 13"
},
{
  "id": 898,
  "code": "TGOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "多哥法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或多哥居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 28"
},
{
  "id": 899,
  "code": "TGOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的多哥跨国数据传输",
  "description": "控制者在未获得 IPDCP 事先授权的情况下，将多哥主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 35"
},
{
  "id": 900,
  "code": "TGOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "多哥不合规的直接营销沟通",
  "description": "该网站向多哥主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 25"
},
{
  "id": 901,
  "code": "BENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "贝宁在未向 APDP 申报的情况下处理个人数据",
  "description": "该网站收集贝宁居民的个人信息，但未向 APDP 提交处理通知。",
  "severity": "critical",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 390, Article 420"
},
{
  "id": 902,
  "code": "BENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "贝宁敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理贝宁主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 395"
},
{
  "id": 903,
  "code": "BENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "贝宁擦除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或贝宁居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 410"
},
{
  "id": 904,
  "code": "BENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的贝宁跨国数据传输",
  "description": "控制者在未获得 APDP 事先授权的情况下，将贝宁主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 415"
},
{
  "id": 905,
  "code": "BENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "贝宁不合规的直接营销沟通",
  "description": "该网站向贝宁主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 400"
},
{
  "id": 906,
  "code": "MLIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马里在未通知 APDP 的情况下处理个人数据",
  "description": "该网站收集马里居民的个人信息，但未向 APDP 提交处理通知。",
  "severity": "critical",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 15, Article 40"
},
{
  "id": 907,
  "code": "MLIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马里敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理马里主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 12"
},
{
  "id": 908,
  "code": "MLIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马里法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或马里居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 27"
},
{
  "id": 909,
  "code": "MLIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的马里跨国数据传输",
  "description": "控制者在未获得 APDP 事先授权的情况下，将马里主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 32"
},
{
  "id": 910,
  "code": "MLIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马里不合规的直接营销沟通",
  "description": "该网站向马里主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 23"
},
{
  "id": 911,
  "code": "NERPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼日尔在未通知 HAPDP 的情况下处理个人数据",
  "description": "该网站收集尼日尔居民的个人信息，但未向 HAPDP 提交处理通知。",
  "severity": "critical",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 912,
  "code": "NERPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼日尔敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理尼日尔主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 12"
},
{
  "id": 913,
  "code": "NERPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼日尔法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问의联系途径或尼日尔居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 28"
},
{
  "id": 914,
  "code": "NERPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的尼日尔跨国数据传输",
  "description": "控制者在未获得 HAPDP 事先授权的情况下，将尼日尔主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 35"
},
{
  "id": 915,
  "code": "NERPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼日尔不合规的直接营销沟通",
  "description": "该网站向尼日尔主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 24"
},
{
  "id": 916,
  "code": "GABPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "加蓬在未通知 CNPDCP 的情况下处理个人数据",
  "description": "该网站收集加蓬居民的个人信息，但未向 CNPDCP 提交处理通知。",
  "severity": "critical",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 917,
  "code": "GABPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "加蓬敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理加蓬主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 12"
},
{
  "id": 918,
  "code": "GABPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "加蓬法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或加蓬居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 28"
},
{
  "id": 919,
  "code": "GABPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的加蓬跨国数据传输",
  "description": "控制者在未获得 CNPDCP 事先授权的情况下，将加蓬主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 35"
},
{
  "id": 920,
  "code": "GABPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "加蓬不合规的直接营销沟通",
  "description": "该网站向加蓬主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 24"
},
{
  "id": 921,
  "code": "MDGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马达加斯加在未通知 CMIL 的情况下处理个人数据",
  "description": "该网站收集马达加斯加居民的个人信息，但未向 CMIL 提交处理通知。",
  "severity": "critical",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 922,
  "code": "MDGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马达加斯加敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理马达加斯加主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 12"
},
{
  "id": 923,
  "code": "MDGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马达加斯加法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或马达加斯加居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 28"
},
{
  "id": 924,
  "code": "MDGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的马达加斯加跨国数据传输",
  "description": "控制者在未获得 CMIL 事先授权的情况下，将马达加斯加主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 35"
},
{
  "id": 925,
  "code": "MDGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马达加斯加不合规的直接营销沟通",
  "description": "该网站向马达加斯加主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 24"
},
{
  "id": 926,
  "code": "CPVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "佛得角在未通知 CNPD 的情况下处理个人数据",
  "description": "该网站收集佛得角居民的个人信息，但未向 CNPD 提交处理通知。",
  "severity": "critical",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 927,
  "code": "CPVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "佛得角敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理佛得角主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 12"
},
{
  "id": 928,
  "code": "CPVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "佛得角法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或佛得角居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 28"
},
{
  "id": 929,
  "code": "CPVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的佛得角跨国数据传输",
  "description": "控制者在未获得 CNPD 事先授权的情况下，将佛得角主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 35"
},
{
  "id": 930,
  "code": "CPVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "佛得角不合规的直接营销沟通",
  "description": "该网站向佛得角主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 24"
},
{
  "id": 931,
  "code": "LSTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托在未获得明确同意的情况下处理敏感个人数据",
  "description": "该网站收集莱索托居民的敏感个人记录，但未获得事先明确的书面或数字同意。",
  "severity": "critical",
  "reference": "Lesotho Data Protection Act 2011, Sec. 15, Sec. 25"
},
{
  "id": 932,
  "code": "LSTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托数据安全措施不妥当",
  "description": "该数据库收集并处理莱索托居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 32"
},
{
  "id": 933,
  "code": "LSTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托隐私声明中缺少第三方接收者披露",
  "description": "该网站隐私政策未能指明莱索托居民数据的外部第三方接收者或云托管位置。",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 38"
},
{
  "id": 934,
  "code": "LSTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托不合规的直接营销沟通",
  "description": "该网站向莱索托主体发送广告电子邮件或营销 Cookie，但未获得事先选择同意并提供退出路径。",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 33"
},
{
  "id": 935,
  "code": "LSTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托擦除和更正权渠道不妥当",
  "description": "该网站隐私政策未能向莱索托主体提供明确的的联系渠道，以请求擦除或更正其记录。",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 29"
},
{
  "id": 936,
  "code": "COGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "刚果在未通知 CNIL 的情况下处理个人数据",
  "description": "该网站收集刚果居民的个人信息，但未向 CNIL 提交处理通知。",
  "severity": "critical",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 937,
  "code": "COGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "刚果敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理刚果主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 12"
},
{
  "id": 938,
  "code": "COGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "刚果法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或刚果居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 28"
},
{
  "id": 939,
  "code": "COGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的刚果跨国数据传输",
  "description": "控制者在未获得 CNIL 事先授权的情况下，将刚果主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 35"
},
{
  "id": 940,
  "code": "COGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "刚果不合规的直接营销沟通",
  "description": "该网站向刚果主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 24"
},
{
  "id": 941,
  "code": "FIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斐济在没有法律依据的情况下处理个人数据",
  "description": "该网站收集斐济居民的个人信息，但未根据斐济法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 942,
  "code": "FIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斐济敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集斐济居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 943,
  "code": "FIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斐济法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明斐济的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 944,
  "code": "FIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的斐济跨国数据传输",
  "description": "控制者将斐济主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 945,
  "code": "FIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斐济数据主体权利回复方式不妥当",
  "description": "该网站未能为斐济数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 946,
  "code": "PNGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "巴布亚新几内亚在没有法律依据的情况下处理个人数据",
  "description": "该网站收集巴布亚新几内亚居民的个人信息，但未根据巴布亚新几内亚法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 947,
  "code": "PNGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "巴布亚新几内亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集巴布亚新几内亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 948,
  "code": "PNGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "巴布亚新几内亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明巴布亚新几内亚的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 949,
  "code": "PNGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "不合规的巴布亚新几内亚跨国数据传输",
  "description": "控制者将巴布亚新几内亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 950,
  "code": "PNGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "巴布亚新几内亚数据主体权利回复方式不妥当",
  "description": "该网站未能为巴布亚新几内亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 951,
  "code": "SMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "圣马力诺敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确书面或数字同意的情况下，收集圣马力诺主体的敏感个人记录。",
  "severity": "critical",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 6, Art. 83"
},
{
  "id": 952,
  "code": "SMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "圣马力诺未能指定或注册 DPO",
  "description": "网站控制者未能按照圣马力诺法律的要求，指定数据保护官或提供其公开的联系方式。",
  "severity": "serious",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 37"
},
{
  "id": 953,
  "code": "SMRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "圣马力诺隐私声明披露不妥当",
  "description": "隐私声明未能披露数据保留期限、法律依据或圣马力诺居民向 APD 投诉的权利。",
  "severity": "moderate",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 13"
},
{
  "id": 954,
  "code": "SMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的圣马力诺跨国数据传输",
  "description": "控制者将圣马力诺主体的个人记录传输到第三国，而没有充足性决定或 APD 授权的条款。",
  "severity": "serious",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 45"
},
{
  "id": 955,
  "code": "SMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "圣马力诺数据主体权利访问渠道不妥当",
  "description": "该网站未能为圣马力诺居民提供免费、可访问且透明的方法，来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 15, Art. 17"
},
{
  "id": 956,
  "code": "GIBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "直布罗陀在未获得明确同意的情况下处理敏感个人数据",
  "description": "该网站在未获得 GRA 要求的明确事先选择同意的情况下，处理直布罗陀用户的敏感个人记录。",
  "severity": "critical",
  "reference": "Gibraltar Data Protection Act 2004, Sec. 2 (GDPR Art. 9)"
},
{
  "id": 957,
  "code": "GIBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "直布罗陀儿童同意年龄验证缺失",
  "description": "该网站未能为 13 岁以下的直布罗陀用户实施年龄验证或家长同意机制。",
  "severity": "serious",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 8)"
},
{
  "id": 958,
  "code": "GIBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "直布罗陀隐私声明披露不完整",
  "description": "隐私声明未能披露有关数据保留期限，或向直布罗陀监管机构 (GRA) 投诉的权利的详细信息。",
  "severity": "moderate",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 13)"
},
{
  "id": 959,
  "code": "GIBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "直布罗陀缺少 72 小时安全事件通知协议",
  "description": "数据控制者未能记录在 72 小时内向 GRA 报告安全事件的行政程序。",
  "severity": "serious",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 33)"
},
{
  "id": 960,
  "code": "GIBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "直布罗陀数据主体权利访问渠道不妥当",
  "description": "该网站未能为直布罗陀居民提供免费、可访问且透明的方法，来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 15, Art. 17)"
},
{
  "id": 961,
  "code": "JSYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "泽西岛在未获得明确同意的情况下处理敏感个人数据",
  "description": "该网站收集泽西岛居民的敏感个人记录，但未获得事先明确的书面或数字同意。",
  "severity": "critical",
  "reference": "Data Protection (Jersey) Law 2018, Schedule 2, Sec. 9"
},
{
  "id": 962,
  "code": "JSYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "泽西岛儿童同意年龄验证不完整",
  "description": "该网站未能为 13 岁以下的泽西岛用户实施年龄验证或家长同意机制。",
  "severity": "serious",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 10"
},
{
  "id": 963,
  "code": "JSYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "泽西岛法律下隐私声明披露不妥当",
  "description": "该网站隐私政策未能指明数据保留期限，或向泽西岛专员办公室 (JOIC) 投诉的权利。",
  "severity": "moderate",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 12"
},
{
  "id": 964,
  "code": "JSYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "泽西岛缺少 72 小时安全事件通知协议",
  "description": "根据法律要求，网站控制者未能记录在 72 小时内向泽西岛专员 (JOIC) 报告安全事件的程序。",
  "severity": "serious",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 21"
},
{
  "id": 965,
  "code": "JSYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "泽西岛数据主体权利访问渠道不妥当",
  "description": "该网站未能为泽西岛居民提供免费、可访问且透明的方法，来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 28, Sec. 30"
},
{
  "id": 966,
  "code": "GGYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "根西岛在未获得明确同意的情况下处理敏感个人数据",
  "description": "该网站收集根西岛居民的敏感个人记录，但未获得事先明确的书面或数字同意。",
  "severity": "critical",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 9, Sec. 80"
},
{
  "id": 967,
  "code": "GGYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "根西岛儿童同意年龄验证不完整",
  "description": "该网站未能为 13 岁以下的根西岛用户实施年龄验证或家长同意机制。",
  "severity": "serious",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 10"
},
{
  "id": 968,
  "code": "GGYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "根西岛法律下隐私声明披露不妥当",
  "description": "该网站隐私政策未能指明数据保留期限，或向根西岛 DPA (ODPA) 投诉的权利。",
  "severity": "moderate",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 12"
},
{
  "id": 969,
  "code": "GGYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "根西岛缺少 72 小时安全事件通知协议",
  "description": "根据法律要求，网站控制者未能记录在 72 小时内向根西岛专员 (ODPA) 报告安全事件的程序。",
  "severity": "serious",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 21"
},
{
  "id": 970,
  "code": "GGYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "根西岛数据主体权利访问渠道不妥当",
  "description": "该网站未能为根西岛居民提供免费、可访问且透明的方法，来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 28, Sec. 30"
},
{
  "id": 971,
  "code": "IOMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马恩岛敏感数据缺少明确同意",
  "description": "该网站收集马恩岛居民的敏感个人记录，但未获得事先明确的书面或数字同意。",
  "severity": "critical",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 9)"
},
{
  "id": 972,
  "code": "IOMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马恩岛儿童同意年龄验证不完整",
  "description": "该网站未能为 13 岁以下的马恩岛用户实施年龄验证或家长同意机制。",
  "severity": "serious",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 8)"
},
{
  "id": 973,
  "code": "IOMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马恩岛法律下隐私声明披露不妥当",
  "description": "该网站隐私政策未能指明数据保留期限，或向马恩岛专员办公室 (IMIO) 投诉的权利。",
  "severity": "moderate",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 13)"
},
{
  "id": 974,
  "code": "IOMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马恩岛缺少 72 小时安全事件通知协议",
  "description": "根据法律要求，网站控制者未能记录在 72 小时内向马恩岛专员 (IMIO) 报告安全事件的程序。",
  "severity": "serious",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 33)"
},
{
  "id": 975,
  "code": "IOMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马恩岛数据主体权利访问渠道不妥当",
  "description": "该网站未能为马恩岛居民提供免费、可访问且透明的方法，来行使其访问、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 15, Art. 17)"
},
{
  "id": 976,
  "code": "FROPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "法罗群岛敏感数据缺少明确同意",
  "description": "该网站收集法罗群岛居民的敏感个人记录，但未获得事先书面或数字明确同意。",
  "severity": "critical",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 9"
},
{
  "id": 977,
  "code": "FROPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "法罗群岛数据库文件安全措施不妥当",
  "description": "该网站数据库缺乏保护法罗群岛用户个人记录所需的合规加密和访问控制。",
  "severity": "serious",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 11"
},
{
  "id": 978,
  "code": "FROPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "法罗群岛法律下隐私声明披露不妥当",
  "description": "该网站隐私声明未能披露数据保留期限、法律依据或法罗群岛居民向 Datatilsynet 投诉的权利。",
  "severity": "moderate",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 21"
},
{
  "id": 979,
  "code": "FROPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经授权的法罗群岛数据跨国传输",
  "description": "该网站在未获得 Datatilsynet 批准的情况下，将法罗群岛居民的个人数据导出到未能确保同等保护水平的外部国家。",
  "severity": "serious",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 28"
},
{
  "id": 980,
  "code": "FROPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "法罗群岛数据主体权利访问渠道不妥当",
  "description": "该网站未能为法罗群岛居民提供免费、可访问且透明的方法来行使其查询、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 19"
},
{
  "id": 981,
  "code": "BMUPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "百慕大 PIPA 规定下敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确选择同意的情况下，收集百慕大居民的敏感个人记录（健康、财务、基因）。",
  "severity": "critical",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 6, Section 47"
},
{
  "id": 982,
  "code": "BMUPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "百慕大 PIPA 规定下缺少隐私官联系信息",
  "description": "该网站隐私政策未能指明百慕大指定隐私官，或提供其直接的联系方式。",
  "severity": "serious",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 9"
},
{
  "id": 983,
  "code": "BMUPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "百慕大 PIPA 规定下缺少数据主体画像选择退出途径",
  "description": "该网站未能向百慕大居民提供明确的选择退出或反对用于画像和营销处理的选项。",
  "severity": "moderate",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 15"
},
{
  "id": 984,
  "code": "BMUPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "百慕大法律下缺少正式的数据处理者协议",
  "description": "控制者在没有约束性书面合同确保同等保护的情况下，将百慕大居民的个人记录传输给第三方处理者。",
  "severity": "serious",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 12"
},
{
  "id": 985,
  "code": "BMUPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的百慕大跨国数据传输",
  "description": "控制者将百慕大用户的个人数据导出到缺乏适当保护的国家，而未建立等效的保护水平。",
  "severity": "moderate",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 15"
},
{
  "id": 986,
  "code": "CYMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "开曼群岛 DPA 规定下敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集开曼群岛居民的敏感个人记录（健康、财务、基因）。",
  "severity": "critical",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 1)"
},
{
  "id": 987,
  "code": "CYMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "开曼群岛数据安全措施不妥当",
  "description": "该数据库收集并处理开曼群岛用户的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "serious",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 11"
},
{
  "id": 988,
  "code": "CYMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "开曼群岛不合规的 30 天访问请求时限",
  "description": "该网站隐私政策未能记录下在 30 天内回复数据访问请求的联系方式或程序。",
  "severity": "moderate",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 15"
},
{
  "id": 989,
  "code": "CYMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的开曼群岛数据跨国传输",
  "description": "该网站在未获得用户同意或采用经批准条款的情况下，将开曼群岛用户的个人记录传输到缺乏同等法律保护的国家。",
  "severity": "serious",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 8)"
},
{
  "id": 990,
  "code": "CYMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "开曼群岛法律下数据过度保留限制",
  "description": "该网站无限期保留开曼群岛用户的个人记录，而未建立具体的期限或清理周期。",
  "severity": "moderate",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 5)"
},
{
  "id": 991,
  "code": "LCAPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣卢西亚在未获得书面同意的情况下处理敏感个人数据",
  "description": "该网站在未获得事先书面明确同意的情况下，收集圣卢西亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 15, Sec. 50"
},
{
  "id": 992,
  "code": "LCAPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣卢西亚在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向专员/委员会注册的情况下，收集圣卢西亚居民的个人信息。",
  "severity": "serious",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 10"
},
{
  "id": 993,
  "code": "LCAPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣卢西亚数据安全措施不妥当",
  "description": "该数据库收集并处理圣卢西亚居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "moderate",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 32"
},
{
  "id": 994,
  "code": "LCAPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣卢西亚不合规的数据保留周期",
  "description": "该网站保留圣卢西亚用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 14"
},
{
  "id": 995,
  "code": "LCAPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的圣卢西亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得所需授权的情况下，将圣卢西亚居民的数据传输到圣卢西亚境外。",
  "severity": "moderate",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 47"
},
{
  "id": 996,
  "code": "KNAPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣基茨和尼维斯在未获得同意的情况下处理敏感个人数据",
  "description": "该网站收集圣基茨和尼维斯主体的敏感个人记录（健康、财务状况），但未获得事先书面明确同意。",
  "severity": "critical",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 15, Sec. 50"
},
{
  "id": 997,
  "code": "KNAPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣基茨和尼维斯在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向专员/委员会注册的情况下，收集圣基茨和尼维斯居民的个人信息。",
  "severity": "serious",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 10"
},
{
  "id": 998,
  "code": "KNAPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣基茨和尼维斯数据安全措施不妥当",
  "description": "该数据库收集并处理圣基茨和尼维斯居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "moderate",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 32"
},
{
  "id": 999,
  "code": "KNAPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣基茨和尼维斯不合规的数据保留周期",
  "description": "该网站保留圣基茨和尼维斯用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 14"
},
{
  "id": 1000,
  "code": "KNAPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的圣基茨和尼维斯数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得所需授权的情况下，将圣基茨和尼维斯居民的数据传输到圣基茨和尼维斯境外。",
  "severity": "moderate",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 47"
},
{
  "id": 1001,
  "code": "ATGPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "安提瓜和巴布达在未获得同意的情况下处理敏感个人数据",
  "description": "该网站收集安提瓜和巴布达主体的敏感个人记录（健康、财务状况），但未获得事先书面明确同意。",
  "severity": "critical",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 15, Sec. 50"
},
{
  "id": 1002,
  "code": "ATGPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "安提瓜和巴布达在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向专员/委员会注册的情况下，收集安提瓜和巴布达居民 of 个人信息。",
  "severity": "serious",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 10"
},
{
  "id": 1003,
  "code": "ATGPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "安提瓜和巴布达数据安全措施不妥当",
  "description": "该数据库收集并处理安提瓜和巴布达居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "moderate",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 32"
},
{
  "id": 1004,
  "code": "ATGPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "安提瓜和巴布达不合规的数据保留周期",
  "description": "该网站保留安提瓜和巴布达用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 14"
},
{
  "id": 1005,
  "code": "ATGPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的安提瓜和巴布达数据跨国传输",
  "description": "控制者在未确保同等保护水平 or 获得所需授权的情况下，将安提瓜和巴布达居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 47"
},
{
  "id": 1006,
  "code": "SYCPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞舌尔在未获得书面同意的情况下处理敏感数据",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，处理塞舌尔居民的敏感类别个人数据。",
  "severity": "critical",
  "reference": "Seychelles Data Protection Act 2003, Sec. 10, Sec. 28"
},
{
  "id": 1007,
  "code": "SYCPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞舌尔数据库文件安全措施不妥当",
  "description": "该网站数据库缺乏保护塞舌尔用户个人记录所需的合规加密和访问控制。",
  "severity": "serious",
  "reference": "Seychelles Data Protection Act 2003, Sec. 11"
},
{
  "id": 1008,
  "code": "SYCPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞舌尔法律下隐私声明披露不妥当",
  "description": "该网站隐私声明未能披露数据保留期限、法律依据或塞舌尔居民向监管机构投诉的权利。",
  "severity": "moderate",
  "reference": "Seychelles Data Protection Act 2003, Sec. 21"
},
{
  "id": 1009,
  "code": "SYCPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "未经授权的塞舌尔数据跨国传输",
  "description": "该网站在未获得监管机构批准的情况下，将塞舌尔居民的个人数据导出到未能确保同等保护水平的外部国家。",
  "severity": "serious",
  "reference": "Seychelles Data Protection Act 2003, Sec. 28"
},
{
  "id": 1010,
  "code": "SYCPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞舌尔数据主体权利访问渠道不妥当",
  "description": "该网站未能为塞舌尔居民提供免费、可访问且透明的方法来行使其查询、更正或删除数据的权利。",
  "severity": "moderate",
  "reference": "Seychelles Data Protection Act 2003, Sec. 19"
},
{
  "id": 1011,
  "code": "SWZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯威士兰在未获得明确同意的情况下处理敏感个人数据",
  "description": "该网站收集斯威士兰居民的敏感个人记录，但未获得事先明确的书面或数字同意。",
  "severity": "critical",
  "reference": "Eswatini Data Protection Act 2018, Sec. 15, Sec. 25"
},
{
  "id": 1012,
  "code": "SWZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯威士兰数据安全措施不妥当",
  "description": "该数据库收集并处理斯威士兰居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "serious",
  "reference": "Eswatini Data Protection Act 2018, Sec. 32"
},
{
  "id": 1013,
  "code": "SWZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯威士兰隐私声明中缺少第三方接收者披露",
  "description": "该网站隐私政策未能指明斯威士兰居民数据的外部第三方接收者或云托管位置。",
  "severity": "moderate",
  "reference": "Eswatini Data Protection Act 2018, Sec. 38"
},
{
  "id": 1014,
  "code": "SWZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯威士兰不合规的直接营销沟通",
  "description": "该网站向斯威士兰主体发送广告电子邮件或营销 Cookie，但未获得事先选择同意并提供退出路径。",
  "severity": "serious",
  "reference": "Eswatini Data Protection Act 2018, Sec. 33"
},
{
  "id": 1015,
  "code": "SWZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯威士兰擦除和更正权渠道不妥当",
  "description": "该网站隐私政策未能向斯威士兰主体提供明确的的联系渠道，以请求擦除或更正其记录。",
  "severity": "moderate",
  "reference": "Eswatini Data Protection Act 2018, Sec. 29"
},
{
  "id": 1016,
  "code": "GINPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "几内亚在未通知 APDP 的情况下处理个人数据",
  "description": "该网站收集几内亚居民的个人信息，但未向 APDP 提交处理通知。",
  "severity": "critical",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1017,
  "code": "GINPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "几内亚敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理几内亚主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 12"
},
{
  "id": 1018,
  "code": "GINPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "几内亚法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或几内亚居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 28"
},
{
  "id": 1019,
  "code": "GINPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的几内亚跨国数据传输",
  "description": "控制者在未获得 APDP 事先授权的情况下，将几内亚主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 35"
},
{
  "id": 1020,
  "code": "GINPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "几内亚不合规的直接营销沟通",
  "description": "该网站向几内亚主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 24"
},
{
  "id": 1021,
  "code": "BFAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "布基纳法索在未通知 CIL 的情况下处理个人数据",
  "description": "该网站收集布基纳法索居民的个人信息，但未向 CIL 提交处理通知。",
  "severity": "critical",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1022,
  "code": "BFAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "布基纳法索敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理布基纳法索主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 12"
},
{
  "id": 1023,
  "code": "BFAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "布基纳法索法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或布基纳法索居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 28"
},
{
  "id": 1024,
  "code": "BFAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的布基纳法索跨国数据传输",
  "description": "控制者在未获得 CIL 事先授权的情况下，将布基纳法索主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 35"
},
{
  "id": 1025,
  "code": "BFAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "布基纳法索不合规的直接营销沟通",
  "description": "该网站向布基纳法索主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 24"
},
{
  "id": 1026,
  "code": "MRTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里塔尼亚在未通知 APDP 的情况下处理个人数据",
  "description": "该网站收集毛里塔尼亚居民 of 个人信息，但未向 APDP 提交处理通知。",
  "severity": "critical",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1027,
  "code": "MRTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里塔尼亚敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理毛里塔尼亚主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 12"
},
{
  "id": 1028,
  "code": "MRTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里塔尼亚法律下删除 and 更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或毛里塔尼亚居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 28"
},
{
  "id": 1029,
  "code": "MRTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的毛里塔尼亚跨国数据传输",
  "description": "控制者在未获得 APDP 事先授权的情况下，将毛里塔尼亚主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 35"
},
{
  "id": 1030,
  "code": "MRTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "毛里塔尼亚不合规的直接营销沟通",
  "description": "该网站向毛里塔尼亚主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 24"
},
{
  "id": 1031,
  "code": "TCDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乍得在未通知 ANAD 的情况下处理个人数据",
  "description": "该网站收集乍得居民的个人信息，但未向 ANAD 提交处理通知。",
  "severity": "critical",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1032,
  "code": "TCDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乍得敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理乍得主体的敏感个人数据（生物识别、健康、财务记录）。",
  "severity": "serious",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 12"
},
{
  "id": 1033,
  "code": "TCDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乍得法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或乍得居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 28"
},
{
  "id": 1034,
  "code": "TCDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的乍得跨国数据传输",
  "description": "控制者在未获得 ANAD 事先授权的情况下，将乍得主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 35"
},
{
  "id": 1035,
  "code": "TCDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "乍得不合规的直接营销沟通",
  "description": "该网站向乍得主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 24"
},
{
  "id": 1036,
  "code": "MACPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "澳门法律下敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集澳门居民的敏感个人记录（健康、财务、基因）。",
  "severity": "critical",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 7, Article 24"
},
{
  "id": 1037,
  "code": "MACPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "澳门未能向 GPDP 注册数据库处理",
  "description": "该网站控制者在未向个人资料保护办公室 (GPDP) 提交注册通知的情况下，收集澳门居民的个人信息。",
  "severity": "serious",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 19"
},
{
  "id": 1038,
  "code": "MACPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "澳门擦除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或澳门居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 12"
},
{
  "id": 1039,
  "code": "MACPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的澳门跨国数据传输",
  "description": "控制者在未获得 GPDP 事先授权的情况下，将澳门主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 19, Article 20"
},
{
  "id": 1040,
  "code": "MACPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "澳门不合规的直接营销沟通",
  "description": "该网站向澳门主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 12"
},
{
  "id": 1041,
  "code": "NPLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼泊尔在没有法律依据的情况下处理个人数据",
  "description": "该网站收集尼泊尔居民的个人信息，但未根据尼泊尔法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Nepal Individual Privacy Act 2018, Section 4, Section 30"
},
{
  "id": 1042,
  "code": "NPLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼泊尔敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集尼泊尔居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Nepal Individual Privacy Act 2018, Section 10"
},
{
  "id": 1043,
  "code": "NPLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼泊尔法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明尼泊尔的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Nepal Individual Privacy Act 2018, Section 12"
},
{
  "id": 1044,
  "code": "NPLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的尼泊尔跨国数据传输",
  "description": "控制者将尼泊尔主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Nepal Individual Privacy Act 2018, Section 14"
},
{
  "id": 1045,
  "code": "NPLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼泊尔数据主体权利回复方式不妥当",
  "description": "该网站未能为尼泊尔数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Nepal Individual Privacy Act 2018, Section 15"
},
{
  "id": 1046,
  "code": "PAKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "巴基斯坦在没有法律依据的情况下处理个人数据",
  "description": "该网站收集巴基斯坦居民的个人信息，但未根据巴基斯坦法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1047,
  "code": "PAKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "巴基斯坦敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集巴基斯坦居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1048,
  "code": "PAKPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "巴基斯坦法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明巴基斯坦的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1049,
  "code": "PAKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的巴基斯坦跨国数据传输",
  "description": "控制者将巴基斯坦主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1050,
  "code": "PAKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "巴基斯坦数据主体权利回复方式不妥当",
  "description": "该网站未能为巴基斯坦数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1051,
  "code": "DJIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "吉布提在未通知 CNDP 的情况下处理个人数据",
  "description": "该网站收集吉布提居民的个人信息，但未向 CNDP 提交处理通知。",
  "severity": "critical",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1052,
  "code": "DJIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "吉布提敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理吉布提主体的敏感个人数据。",
  "severity": "serious",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 12"
},
{
  "id": 1053,
  "code": "DJIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "吉布提法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或吉布提居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 28"
},
{
  "id": 1054,
  "code": "DJIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的吉布提跨国数据传输",
  "description": "控制者在未获得 CNDP 事先授权的情况下，将吉布提主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 35"
},
{
  "id": 1055,
  "code": "DJIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "吉布提不合规的直接营销沟通",
  "description": "该网站向吉布提主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 24"
},
{
  "id": 1056,
  "code": "LAOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "老挝在没有法律依据的情况下处理个人数据",
  "description": "该网站收集老挝居民的个人信息，但未根据老挝法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 5, Sec. 21"
},
{
  "id": 1057,
  "code": "LAOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "老挝敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集老挝居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 10"
},
{
  "id": 1058,
  "code": "LAOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "老挝法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明老挝的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 12"
},
{
  "id": 1059,
  "code": "LAOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的老挝跨国数据传输",
  "description": "控制者将老挝主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 14"
},
{
  "id": 1060,
  "code": "LAOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "老挝数据主体权利回复方式不妥当",
  "description": "该网站未能为老挝数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 15"
},
{
  "id": 1061,
  "code": "BTNDP-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不丹在没有法律依据的情况下处理个人数据",
  "description": "该网站收集不丹居民的个人信息，但未根据不丹法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 320"
},
{
  "id": 1062,
  "code": "BTNDP-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不丹敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集不丹居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 321"
},
{
  "id": 1063,
  "code": "BTNDP-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不丹法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明不丹的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 322"
},
{
  "id": 1064,
  "code": "BTNDP-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的不丹跨国数据传输",
  "description": "控制者将不丹主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 325"
},
{
  "id": 1065,
  "code": "BTNDP-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不丹数据主体权利回复方式不妥当",
  "description": "该网站未能为不丹数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 327"
},
{
  "id": 1066,
  "code": "MMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "缅甸在没有法律依据的情况下处理个人数据",
  "description": "该网站收集缅甸居民的个人信息，但未根据缅甸法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 5"
},
{
  "id": 1067,
  "code": "MMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "缅甸敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集缅甸居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 6"
},
{
  "id": 1068,
  "code": "MMRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "缅甸法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明缅甸的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 7"
},
{
  "id": 1069,
  "code": "MMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的缅甸跨国数据传输",
  "description": "控制者将缅甸主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 8"
},
{
  "id": 1070,
  "code": "MMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "缅甸数据主体权利回复方式不妥当",
  "description": "该网站未能为缅甸数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 9"
},
{
  "id": 1071,
  "code": "KHMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "柬埔寨在没有法律依据的情况下处理个人数据",
  "description": "该网站收集柬埔寨居民的个人信息，但未根据柬埔寨法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Cambodia Civil Code, Article 7, Article 11"
},
{
  "id": 1072,
  "code": "KHMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "柬埔寨敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集柬埔寨居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Cambodia Civil Code, Article 8"
},
{
  "id": 1073,
  "code": "KHMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "柬埔寨法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明柬埔寨的数据处理目的、保留细节， or 与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Cambodia Civil Code, Article 9"
},
{
  "id": 1074,
  "code": "KHMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的柬埔寨跨国数据传输",
  "description": "控制者将柬埔寨主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Cambodia Civil Code, Article 10"
},
{
  "id": 1075,
  "code": "KHMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "柬埔寨数据主体权利回复方式不妥当",
  "description": "该网站未能为柬埔寨数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Cambodia Civil Code, Article 12"
},
{
  "id": 1076,
  "code": "LBNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "黎巴嫩在未通知的情况下处理个人数据",
  "description": "该网站收集黎巴嫩居民的个人信息，但未向部门提交处理通知。",
  "severity": "critical",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 85, Article 95"
},
{
  "id": 1077,
  "code": "LBNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "黎巴嫩敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理黎巴嫩主体的敏感个人数据。",
  "severity": "serious",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 88"
},
{
  "id": 1078,
  "code": "LBNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "黎巴嫩法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或黎巴嫩居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 92"
},
{
  "id": 1079,
  "code": "LBNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的黎巴嫩跨国数据传输",
  "description": "控制者在未获得部门事先授权的情况下，将黎巴嫩主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 94"
},
{
  "id": 1080,
  "code": "LBNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "黎巴嫩不合规的直接营销沟通",
  "description": "该网站向黎巴嫩主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 90"
},
{
  "id": 1081,
  "code": "YEMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "叶门在没有法律依据的情况下处理个人数据",
  "description": "该网站收集叶门居民的个人信息，但未根据叶门法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 5"
},
{
  "id": 1082,
  "code": "YEMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "叶门敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集叶门居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 8"
},
{
  "id": 1083,
  "code": "YEMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "叶门法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明叶门的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 12"
},
{
  "id": 1084,
  "code": "YEMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的叶门跨国数据传输",
  "description": "控制者将叶门主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 14"
},
{
  "id": 1085,
  "code": "YEMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "叶门数据主体权利回复方式不妥当",
  "description": "该网站未能为叶门数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 15"
},
{
  "id": 1086,
  "code": "SYRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "叙利亚在没有法律依据的情况下处理个人数据",
  "description": "该网站收集叙利亚居民的个人信息，但未根据叙利亚法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 5"
},
{
  "id": 1087,
  "code": "SYRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "叙利亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面 or 数字同意的情况下，收集叙利亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 8"
},
{
  "id": 1088,
  "code": "SYRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "叙利亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明叙利亚的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 12"
},
{
  "id": 1089,
  "code": "SYRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的叙利亚跨国数据传输",
  "description": "控制者将叙利亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 14"
},
{
  "id": 1090,
  "code": "SYRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "叙利亚数据主体权利回复方式不妥当",
  "description": "该网站未能为叙利亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 15"
},
{
  "id": 1091,
  "code": "IRQPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "伊拉克在没有法律依据的情况下处理个人数据",
  "description": "该网站收集伊拉克居民的个人信息，但未根据伊拉克法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 5"
},
{
  "id": 1092,
  "code": "IRQPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "伊拉克敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集伊拉克居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 8"
},
{
  "id": 1093,
  "code": "IRQPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "伊拉克法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明伊拉克的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 12"
},
{
  "id": 1094,
  "code": "IRQPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的伊拉克跨国数据传输",
  "description": "控制者将伊拉克主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 14"
},
{
  "id": 1095,
  "code": "IRQPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "伊拉克数据主体权利回复方式不妥当",
  "description": "该网站未能为伊拉克数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 15"
},
{
  "id": 1096,
  "code": "MWIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马拉维在没有法律依据的情况下处理个人数据",
  "description": "该网站收集马拉维居民的个人信息，但未根据马拉维法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 72, Sec. 80"
},
{
  "id": 1097,
  "code": "MWIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马拉维敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集马拉维居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 73"
},
{
  "id": 1098,
  "code": "MWIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马拉维法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明马拉维的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 74"
},
{
  "id": 1099,
  "code": "MWIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的马拉维跨国数据传输",
  "description": "控制者将马拉维主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 78"
},
{
  "id": 1100,
  "code": "MWIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马拉维数据主体权利回复方式不妥当",
  "description": "该网站未能为马拉维数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 79"
},
{
  "id": 1101,
  "code": "MOZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莫桑比克在没有法律依据的情况下处理个人 data",
  "description": "该网站收集莫桑比克居民的个人信息，但未根据莫桑比克法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Mozambique Electronic Transactions Law, Sec. 15, Sec. 25"
},
{
  "id": 1102,
  "code": "MOZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莫桑比克敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集莫桑比克居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Mozambique Electronic Transactions Law, Sec. 16"
},
{
  "id": 1103,
  "code": "MOZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莫桑比克法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明莫桑比克的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Mozambique Electronic Transactions Law, Sec. 18"
},
{
  "id": 1104,
  "code": "MOZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的莫桑比克跨国数据传输",
  "description": "控制者将莫桑比克主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Mozambique Electronic Transactions Law, Sec. 20"
},
{
  "id": 1105,
  "code": "MOZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莫桑比克数据主体权利回复方式不妥当",
  "description": "该网站未能为莫桑比克数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Mozambique Electronic Transactions Law, Sec. 22"
},
{
  "id": 1106,
  "code": "NAMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "纳米比亚在没有法律依据的情况下处理个人数据",
  "description": "该网站收集纳米比亚居民的个人信息，但未根据纳米比亚法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 15"
},
{
  "id": 1107,
  "code": "NAMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "纳米比亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集纳米比亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 18"
},
{
  "id": 1108,
  "code": "NAMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "纳米比亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明纳米比亚的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 21"
},
{
  "id": 1109,
  "code": "NAMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的纳米比亚跨国数据传输",
  "description": "控制者将纳米比亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 25"
},
{
  "id": 1110,
  "code": "NAMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "纳米比亚数据主体权利回复方式不妥当",
  "description": "该网站未能为纳米比亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 28"
},
{
  "id": 1111,
  "code": "GRNPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "格林纳达在未获得书面同意的情况下处理敏感个人数据",
  "description": "该网站在未获得事先书面明确同意的情况下，收集格林纳达主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Grenada Data Protection Act 2014, Sec. 15, Sec. 50"
},
{
  "id": 1112,
  "code": "GRNPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "格林纳达在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向专员/委员会注册的情况下，收集格林纳达居民的个人信息。",
  "severity": "serious",
  "reference": "Grenada Data Protection Act 2014, Sec. 10"
},
{
  "id": 1113,
  "code": "GRNPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "格林纳达数据安全措施不妥当",
  "description": "该数据库收集并处理格林纳达居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "moderate",
  "reference": "Grenada Data Protection Act 2014, Sec. 32"
},
{
  "id": 1114,
  "code": "GRNPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "格林纳达不合规的数据保留周期",
  "description": "该网站保留格林纳达用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Grenada Data Protection Act 2014, Sec. 14"
},
{
  "id": 1115,
  "code": "GRNPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的格林纳达数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得所需授权的情况下，将格林纳达居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Grenada Data Protection Act 2014, Sec. 47"
},
{
  "id": 1116,
  "code": "VCTPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣文森特和格林纳丁斯在未获得同意的情况下处理敏感个人数据",
  "description": "该网站收集圣文森特和格林纳丁斯主体的敏感个人记录（健康、财务状况），但未获得事先书面明确同意。",
  "severity": "critical",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 15, Sec. 50"
},
{
  "id": 1117,
  "code": "VCTPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣文森特和格林纳丁斯在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向专员/委员会注册的情况下，收集圣文森特和格林纳丁斯居民的个人信息。",
  "severity": "serious",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 10"
},
{
  "id": 1118,
  "code": "VCTPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣文森特和格林纳丁斯数据安全措施不妥当",
  "description": "该数据库收集并处理圣文森特和格林纳丁斯居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "moderate",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 32"
},
{
  "id": 1119,
  "code": "VCTPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣文森特和格林纳丁斯不合规的数据保留周期",
  "description": "该网站保留圣文森特和格林纳丁斯用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 14"
},
{
  "id": 1120,
  "code": "VCTPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圣文森特和格林纳丁斯数据跨国传输不合规",
  "description": "控制者在未确保同等保护水平或获得所需授权的情况下，将圣文森特和格林纳丁斯居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 47"
},
{
  "id": 1121,
  "code": "SAMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "萨摩亚在没有法律依据的情况下处理个人数据",
  "description": "该网站收集萨摩亚居民的个人信息，但未根据萨摩亚法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 5"
},
{
  "id": 1122,
  "code": "SAMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "萨摩亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集萨摩亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 8"
},
{
  "id": 1123,
  "code": "SAMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "萨摩亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明萨摩亚的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 12"
},
{
  "id": 1124,
  "code": "SAMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的萨摩亚跨国数据传输",
  "description": "控制者将萨摩亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 14"
},
{
  "id": 1125,
  "code": "SAMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "萨摩亚数据主体权利回复方式不妥当",
  "description": "该网站未能为萨摩亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 15"
},
{
  "id": 1126,
  "code": "TONPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "汤加在没有法律依据的情况下处理个人数据",
  "description": "该网站收集汤加居民的个人信息，但未根据汤加法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 5"
},
{
  "id": 1127,
  "code": "TONPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "汤加敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集汤加居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 8"
},
{
  "id": 1128,
  "code": "TONPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "汤加法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明汤加的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 12"
},
{
  "id": 1129,
  "code": "TONPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的汤加跨国数据传输",
  "description": "控制者将汤加主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 14"
},
{
  "id": 1130,
  "code": "TONPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "汤加数据主体权利回复方式不妥当",
  "description": "该网站未能为汤加数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 15"
},
{
  "id": 1131,
  "code": "VUTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瓦努阿图在没有法律依据的情况下处理个人数据",
  "description": "该网站收集瓦努阿图居民的个人信息，但未根据瓦努阿图法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Vanuatu local electronic transactions laws, Sec. 5"
},
{
  "id": 1132,
  "code": "VUTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瓦努阿图敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集瓦努阿图居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Vanuatu local electronic transactions laws, Sec. 8"
},
{
  "id": 1133,
  "code": "VUTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瓦努阿图法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明瓦努阿图的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Vanuatu local electronic transactions laws, Sec. 12"
},
{
  "id": 1134,
  "code": "VUTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的瓦努阿图跨国数据传输",
  "description": "控制者将瓦努阿图主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Vanuatu local electronic transactions laws, Sec. 14"
},
{
  "id": 1135,
  "code": "VUTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瓦努阿图数据主体权利回复方式不妥当",
  "description": "该网站未能为瓦努阿图数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Vanuatu local electronic transactions laws, Sec. 15"
},
{
  "id": 1136,
  "code": "GUYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圭亚那在未获得同意的情况下处理敏感个人数据",
  "description": "该网站收集圭亚那主体的敏感个人记录（健康、财务状况），但未获得事先书面明确同意。",
  "severity": "critical",
  "reference": "Guyana Data Protection Act 2024, Sec. 15, Sec. 50"
},
{
  "id": 1137,
  "code": "GUYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圭亚那在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向专员/委员会注册的情况下，收集圭亚那居民的个人信息。",
  "severity": "serious",
  "reference": "Guyana Data Protection Act 2024, Sec. 10"
},
{
  "id": 1138,
  "code": "GUYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圭亚那数据安全措施不妥当",
  "description": "该数据库收集并处理圭亚那居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "moderate",
  "reference": "Guyana Data Protection Act 2024, Sec. 32"
},
{
  "id": 1139,
  "code": "GUYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "圭亚那不合规的数据保留周期",
  "description": "该网站保留圭亚那用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Guyana Data Protection Act 2024, Sec. 14"
},
{
  "id": 1140,
  "code": "GUYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的圭亚那数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得所需授权的情况下，将圭亚那居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Guyana Data Protection Act 2024, Sec. 47"
},
{
  "id": 1141,
  "code": "BLZPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "伯利兹在未获得书面同意的情况下处理敏感数据",
  "description": "该网站在未获得事先书面明确同意的情况下，收集伯利兹主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 15, Sec. 50"
},
{
  "id": 1142,
  "code": "BLZPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "伯利兹在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向专员/委员会注册的情况下，收集伯利兹居民的个人信息。",
  "severity": "serious",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 10"
},
{
  "id": 1143,
  "code": "BLZPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "伯利兹数据安全措施不妥当",
  "description": "该数据库收集并处理伯利兹居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "moderate",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 32"
},
{
  "id": 1144,
  "code": "BLZPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "伯利兹不合规的数据保留周期",
  "description": "该网站保留伯利兹用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 14"
},
{
  "id": 1145,
  "code": "BLZPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "不合规的伯利兹数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得所需授权的情况下，将伯利兹居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 47"
},
{
  "id": 1146,
  "code": "SURPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "苏里南在未获得书面同意的情况下处理敏感数据",
  "description": "该网站在未获得事先书面明确同意的情况下，收集苏里南主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 15, Sec. 50"
},
{
  "id": 1147,
  "code": "SURPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "苏里南在控制者未注册的情况下处理个人数据",
  "description": "该网站控制者在未向专员/委员会注册的情况下，收集苏里南居民的个人信息。",
  "severity": "serious",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 10"
},
{
  "id": 1148,
  "code": "SURPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "苏里南数据安全措施不妥当",
  "description": "该数据库收集并处理苏里南居民的个人文件，但未采用强制性的技术加密或行政控制。",
  "severity": "moderate",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 32"
},
{
  "id": 1149,
  "code": "SURPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "苏里南不合规的数据保留周期",
  "description": "该网站保留苏里南用户的个人记录时间超出指定处理目的所需时间，且没有删除协议。",
  "severity": "serious",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 14"
},
{
  "id": 1150,
  "code": "SURPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "苏里南数据跨国传输不合规",
  "description": "控制者在未确保同等保护水平或获得所需授权的情况下，将苏里南居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 47"
},
{
  "id": 1151,
  "code": "BDIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "布隆迪在未通知监管机构的情况下处理个人数据",
  "description": "该网站收集布隆迪居民的个人信息，但未向监管机构提交处理通知。",
  "severity": "critical",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 15, Article 42"
},
{
  "id": 1152,
  "code": "BDIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "布隆迪敏感数据缺少明确同意",
  "description": "该网站在未获得有效、事先明确同意的情况下，处理布隆迪主体的敏感个人数据。",
  "severity": "serious",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 12"
},
{
  "id": 1153,
  "code": "BDIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "布隆迪法律下删除和更正渠道不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或布隆迪居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 28"
},
{
  "id": 1154,
  "code": "BDIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的布隆迪跨国数据传输",
  "description": "控制者在未获得监管机构事先授权的情况下，将布隆迪主体的个人记录传输到国外。",
  "severity": "serious",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 35"
},
{
  "id": 1155,
  "code": "BDIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "布隆迪不合规的直接营销沟通",
  "description": "该网站向布隆迪主体发送直接营销材料或广告 Cookie，但未获得事先选择同意。",
  "severity": "moderate",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 24"
},
{
  "id": 1156,
  "code": "ERIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "厄立特里亚在没有法律依据的情况下处理个人数据",
  "description": "该网站收集厄立特里亚居民的个人信息，但未根据厄立特里亚法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 5, Sec. 21"
},
{
  "id": 1157,
  "code": "ERIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "厄立特里亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集厄立特里亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 10"
},
{
  "id": 1158,
  "code": "ERIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "厄立特里亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明厄立特里亚的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 12"
},
{
  "id": 1159,
  "code": "ERIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的厄立特里亚跨国数据传输",
  "description": "控制者将厄立特里亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 14"
},
{
  "id": 1160,
  "code": "ERIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "厄立特里亚数据主体权利回复方式不妥当",
  "description": "该网站未能为厄立特里亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 15"
},
{
  "id": 1161,
  "code": "SOMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "索马里在没有法律依据的情况下处理个人数据",
  "description": "该网站收集索马里居民的个人信息，但未根据索马里法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 5"
},
{
  "id": 1162,
  "code": "SOMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "索马里敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集索马里居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 8"
},
{
  "id": 1163,
  "code": "SOMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "索马里法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明索马里的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 12"
},
{
  "id": 1164,
  "code": "SOMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的索马里跨国数据传输",
  "description": "控制者将索马里主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 14"
},
{
  "id": 1165,
  "code": "SOMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "索马里数据主体权利回复方式不妥当",
  "description": "该网站未能为索马里数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 15"
},
{
  "id": 1166,
  "code": "SDNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "苏丹在没有法律依据的情况下处理个人数据",
  "description": "该网站收集苏丹居民的个人信息，但未根据苏丹法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 5"
},
{
  "id": 1167,
  "code": "SDNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "苏丹敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集苏丹居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 8"
},
{
  "id": 1168,
  "code": "SDNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "苏丹法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明苏丹的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 12"
},
{
  "id": 1169,
  "code": "SDNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的苏丹跨国数据传输",
  "description": "控制者将苏丹主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 14"
},
{
  "id": 1170,
  "code": "SDNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "苏丹数据主体权利回复方式不妥当",
  "description": "该网站未能为苏丹数据主体建立行使访问、更正 or 擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 15"
},
{
  "id": 1171,
  "code": "SSDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "南苏丹在没有法律依据的情况下处理个人数据",
  "description": "该网站收集南苏丹居民的个人信息，但未根据南苏丹法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 5"
},
{
  "id": 1172,
  "code": "SSDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "南苏丹敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集南苏丹居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 8"
},
{
  "id": 1173,
  "code": "SSDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "南苏丹法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明南苏丹的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 12"
},
{
  "id": 1174,
  "code": "SSDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的南苏丹跨国数据传输",
  "description": "控制者将南苏丹主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 14"
},
{
  "id": 1175,
  "code": "SSDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "南苏丹数据主体权利回复方式不妥当",
  "description": "该网站未能为南苏丹数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 15"
},
{
  "id": 1176,
  "code": "GNQPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "赤道几内亚在未通知监管机构的情况下处理个人数据",
  "description": "该网站收集赤道几内亚居民的个人信息，但未向监管机构提交处理通知。",
  "severity": "critical",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 15"
},
{
  "id": 1177,
  "code": "GNQPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "赤道几内亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集赤道几内亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 12"
},
{
  "id": 1178,
  "code": "GNQPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "赤道几内亚法律下隐私声明披露不妥当",
  "description": "该网站隐私政策未能记录下可访问的联系途径或赤道几内亚居民请求数据擦除的具体程序。",
  "severity": "moderate",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 28"
},
{
  "id": 1179,
  "code": "GNQPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的赤道几内亚跨国数据传输",
  "description": "控制者将赤道几内亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 35"
},
{
  "id": 1180,
  "code": "GNQPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "赤道几内亚数据主体权利回复方式不妥当",
  "description": "该网站未能为赤道几内亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 24"
},
{
  "id": 1181,
  "code": "CAFPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "中非共和国在没有法律依据的情况下处理个人数据",
  "description": "该网站收集中非共和国居民的个人信息，但未根据中非共和国法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 5"
},
{
  "id": 1182,
  "code": "CAFPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "中非共和国敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集中非共和国居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 8"
},
{
  "id": 1183,
  "code": "CAFPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "中非共和国法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明中非共和国的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 12"
},
{
  "id": 1184,
  "code": "CAFPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的中非共和国跨国数据传输",
  "description": "控制者将中非共和国主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 14"
},
{
  "id": 1185,
  "code": "CAFPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "中非共和国数据主体权利回复方式不妥当",
  "description": "该网站未能为中非共和国数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 15"
},
{
  "id": 1186,
  "code": "SLEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞拉利昂在没有法律依据的情况下处理个人数据",
  "description": "该网站收集塞拉利昂居民的个人信息，但未根据塞拉利昂法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 5"
},
{
  "id": 1187,
  "code": "SLEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞拉利昂敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集塞拉利昂居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 8"
},
{
  "id": 1188,
  "code": "SLEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞拉利昂法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明塞拉利昂的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 12"
},
{
  "id": 1189,
  "code": "SLEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的塞拉利昂跨国数据传输",
  "description": "控制者将塞拉利昂主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 14"
},
{
  "id": 1190,
  "code": "SLEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞拉利昂数据主体权利回复方式不妥当",
  "description": "该网站未能为塞拉利昂数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 15"
},
{
  "id": 1191,
  "code": "LBRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "利比里亚在没有法律依据的情况下处理个人数据",
  "description": "该网站收集利比里亚居民 of 个人信息，但未根据利比里亚法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 5"
},
{
  "id": 1192,
  "code": "LBRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "利比里亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集利比里亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 8"
},
{
  "id": 1193,
  "code": "LBRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "利比里亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明利比里亚的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 12"
},
{
  "id": 1194,
  "code": "LBRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的利比里亚跨国数据传输",
  "description": "控制者将利比里亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 14"
},
{
  "id": 1195,
  "code": "LBRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "利比里亚数据主体权利回复方式不妥当",
  "description": "该网站未能为利比里亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 15"
},
{
  "id": 1196,
  "code": "GMBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冈比亚在没有法律依据的情况下处理个人数据",
  "description": "该网站收集冈比亚居民的个人信息，但未根据冈比亚法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1197,
  "code": "GMBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冈比亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集冈比亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1198,
  "code": "GMBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冈比亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明冈比亚的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1199,
  "code": "GMBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的冈比亚跨国数据传输",
  "description": "控制者将冈比亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1200,
  "code": "GMBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "冈比亚数据主体权利回复方式不妥当",
  "description": "该网站未能为冈比亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1201,
  "code": "GWIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "几内亚比绍在没有法律依据的情况下处理个人数据",
  "description": "该网站收集几内亚比绍居民的个人信息，但未根据几内亚比绍法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 5"
},
{
  "id": 1202,
  "code": "GWIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "几内亚比绍敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集几内亚比绍居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 8"
},
{
  "id": 1203,
  "code": "GWIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "几内亚比绍法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明几内亚比绍的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 12"
},
{
  "id": 1204,
  "code": "GWIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的几内亚比绍跨国数据传输",
  "description": "控制者将几内亚比绍主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 14"
},
{
  "id": 1205,
  "code": "GWIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "几内亚比绍数据主体权利回复方式不妥当",
  "description": "该网站未能为几内亚比绍数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 15"
},
{
  "id": 1206,
  "code": "LSOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托在没有法律依据的情况下处理个人数据",
  "description": "该网站收集莱索托居民的个人信息，但未根据莱索托法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Lesotho Data Protection Act 2011, Sec. 5, Sec. 21"
},
{
  "id": 1207,
  "code": "LSOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集莱索托居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 10"
},
{
  "id": 1208,
  "code": "LSOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明莱索托的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 12"
},
{
  "id": 1209,
  "code": "LSOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的莱索托跨国数据传输",
  "description": "控制者将莱索托主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 14"
},
{
  "id": 1210,
  "code": "LSOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "莱索托数据主体权利回复方式 不妥当",
  "description": "该网站未能为莱索托数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 15"
},
{
  "id": 1211,
  "code": "TLSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "东帝汶在没有法律依据的情况下处理个人数据",
  "description": "该网站收集东帝汶居民的个人信息，但未根据东帝汶法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 5"
},
{
  "id": 1212,
  "code": "TLSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "东帝汶敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集东帝汶居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 8"
},
{
  "id": 1213,
  "code": "TLSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "东帝汶法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明东帝汶的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 12"
},
{
  "id": 1214,
  "code": "TLSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的东帝汶跨国数据传输",
  "description": "控制者将东帝汶主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 14"
},
{
  "id": 1215,
  "code": "TLSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "东帝汶数据主体权利回复方式不妥当",
  "description": "该网站未能为东帝汶数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 15"
},
{
  "id": 1216,
  "code": "MDVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马尔代夫在没有法律依据的情况下处理个人数据",
  "description": "该网站收集马尔代夫居民的个人信息，但未根据马尔代夫法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1217,
  "code": "MDVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马尔代夫敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集马尔代夫居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1218,
  "code": "MDVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马尔代夫法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明马尔代夫的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1219,
  "code": "MDVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的马尔代夫跨国数据传输",
  "description": "控制者将马尔代夫主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1220,
  "code": "MDVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马尔代夫数据主体权利回复方式不妥当",
  "description": "该网站未能为马尔代夫数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1221,
  "code": "BRNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "文莱在没有法律依据的情况下处理个人数据",
  "description": "该网站收集文莱居民的个人信息，但未根据文莱法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 5"
},
{
  "id": 1222,
  "code": "BRNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "文莱敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集文莱居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 8"
},
{
  "id": 1223,
  "code": "BRNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "文莱法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明文莱的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 12"
},
{
  "id": 1224,
  "code": "BRNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的文莱跨国数据传输",
  "description": "控制者将文莱主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 14"
},
{
  "id": 1225,
  "code": "BRNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "文莱数据主体权利回复方式不妥当",
  "description": "该网站未能为文莱数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 15"
},
{
  "id": 1226,
  "code": "SLBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "所罗门群岛在没有法律依据的情况下处理个人数据",
  "description": "该网站收集所罗门群岛居民的个人信息，但未根据所罗门群岛法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 5"
},
{
  "id": 1227,
  "code": "SLBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "所罗门群岛敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集所罗门群岛居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 8"
},
{
  "id": 1228,
  "code": "SLBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "所罗门群岛法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明所罗门群岛的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 12"
},
{
  "id": 1229,
  "code": "SLBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的所罗门群岛跨国数据传输",
  "description": "控制者将所罗门群岛主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 14"
},
{
  "id": 1230,
  "code": "SLBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "所罗门群岛数据主体权利回复方式不妥当",
  "description": "该网站未能为所罗门群岛数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 15"
},
{
  "id": 1231,
  "code": "FSMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "密克罗尼西亚在没有法律依据的情况下处理个人数据",
  "description": "该网站收集密克罗尼西亚居民的个人信息，但未根据密克罗尼西亚法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 5"
},
{
  "id": 1232,
  "code": "FSMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "密克罗尼西亚敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集密克罗尼西亚居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 8"
},
{
  "id": 1233,
  "code": "FSMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "密克罗尼西亚法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明密克罗尼西亚的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 12"
},
{
  "id": 1234,
  "code": "FSMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的密克罗尼西亚跨国数据传输",
  "description": "控制者将密克罗尼西亚主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 14"
},
{
  "id": 1235,
  "code": "FSMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "密克罗尼西亚数据主体权利回复方式不妥当",
  "description": "该网站未能为密克罗尼西亚数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 15"
},
{
  "id": 1236,
  "code": "MHLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马绍尔群岛在没有法律依据的情况下处理个人数据",
  "description": "该网站收集马绍尔群岛居民的个人信息，但未根据马绍尔群岛法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1237,
  "code": "MHLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马绍尔群岛敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集马绍尔群岛居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1238,
  "code": "MHLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马绍尔群岛法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明马绍尔群岛的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1239,
  "code": "MHLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的马绍尔群岛跨国数据传输",
  "description": "控制者将马绍尔群岛主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1240,
  "code": "MHLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马绍尔群岛数据主体权利回复方式不妥当",
  "description": "该网站未能为马绍尔群岛数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1241,
  "code": "PLWPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "帕劳在没有法律依据的情况下处理个人数据",
  "description": "该网站收集帕劳居民的个人信息，但未根据帕劳法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 5"
},
{
  "id": 1242,
  "code": "PLWPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "帕劳敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集帕劳居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 8"
},
{
  "id": 1243,
  "code": "PLWPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "帕劳法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明帕劳的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 12"
},
{
  "id": 1244,
  "code": "PLWPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的帕劳跨国数据传输",
  "description": "控制者将帕劳主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 14"
},
{
  "id": 1245,
  "code": "PLWPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "帕劳数据主体权利回复方式不妥当",
  "description": "该网站未能为帕劳数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 15"
},
{
  "id": 1246,
  "code": "KIRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "基里巴斯在没有法律依据的情况下处理个人数据",
  "description": "该网站收集基里巴斯居民的个人信息，但未根据基里巴斯法律建立有效合法处理依据或获得同意。",
  "severity": "critical",
  "reference": "Kiribati draft Data Protection Act, Sec. 5"
},
{
  "id": 1247,
  "code": "KIRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "基里巴斯敏感数据缺少明确同意",
  "description": "该网站在未获得事先明确书面或数字同意的情况下，收集基里巴斯居民的敏感个人记录（健康、生物识别）。",
  "severity": "serious",
  "reference": "Kiribati draft Data Protection Act, Sec. 8"
},
{
  "id": 1248,
  "code": "KIRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "基里巴斯法律下隐私声明披露不妥当",
  "description": "隐私政策未能指明基里巴斯的数据处理目的、保留细节，或与数据主体的联系方式。",
  "severity": "moderate",
  "reference": "Kiribati draft Data Protection Act, Sec. 12"
},
{
  "id": 1249,
  "code": "KIRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的基里巴斯跨国数据传输",
  "description": "控制者将基里巴斯主体的个人记录传输到国外，而未确保同等保护水平或具有可比的保护措施。",
  "severity": "serious",
  "reference": "Kiribati draft Data Protection Act, Sec. 14"
},
{
  "id": 1250,
  "code": "KIRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "基里巴斯数据主体权利回复方式不妥当",
  "description": "该网站未能为基里巴斯数据主体建立行使访问、更正或擦除权利的透明渠道。",
  "severity": "moderate",
  "reference": "Kiribati draft Data Protection Act, Sec. 15"
},
{
  "id": 1251,
  "code": "CHNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "中国在未获得书面同意的情况下处理敏感数据",
  "description": "根据个人信息保护法，该网站在未获得事先书面明确同意的情况下，收集中国主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1252,
  "code": "CHNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "中国在控制者未向国家互联网信息办公室 (网信办)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家互联网信息办公室 (网信办)注册的情况下，收集中国居民的个人信息，违反了个人信息保护法。",
  "severity": "serious",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1253,
  "code": "CHNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "中国数据安全及加密措施不妥当",
  "description": "该数据库收集并处理中国居民的个人文件，但未采用个人信息保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1254,
  "code": "CHNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "中国不合规的数据保留周期",
  "description": "该网站保留中国用户的个人记录时间超出指定处理目的所需时间，且缺少符合个人信息保护法的删除协议。",
  "severity": "serious",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1255,
  "code": "CHNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的中国数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得个人信息保护法及国家互联网信息办公室 (网信办)所需授权的情况下，将中国居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1256,
  "code": "RUSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "俄罗斯在未获得书面同意的情况下处理敏感数据",
  "description": "根据第 152-FZ 号联邦个人数据法，该网站在未获得事先书面明确同意的情况下，收集俄罗斯主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1257,
  "code": "RUSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "俄罗斯在控制者未向联邦通信、信息技术和大众传媒监督局 (Роскомнадзор)注册的情况下处理个人数据",
  "description": "该网站控制者在未向联邦通信、信息技术和大众传媒监督局 (Роскомнадзор)注册的情况下，收集俄罗斯居民的个人信息，违反了第 152-FZ 号联邦个人数据法。",
  "severity": "serious",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1258,
  "code": "RUSPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "俄罗斯数据安全及加密措施不妥当",
  "description": "该数据库收集并处理俄罗斯居民的个人文件，但未采用第 152-FZ 号联邦个人数据法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1259,
  "code": "RUSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "俄罗斯不合规的数据保留周期",
  "description": "该网站保留俄罗斯用户的个人记录时间超出指定处理目的所需时间，且缺少符合第 152-FZ 号联邦个人数据法的删除协议。",
  "severity": "serious",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1260,
  "code": "RUSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的俄罗斯数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得第 152-FZ 号联邦个人数据法及联邦通信、信息技术和大众传媒监督局 (Роскомнадзор)所需授权的情况下，将俄罗斯居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1261,
  "code": "TURPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "土耳其在未获得书面同意的情况下处理敏感数据",
  "description": "根据第 6698 号个人数据保护法 (KVKK)，该网站在未获得事先书面明确同意的情况下，收集土耳其主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1262,
  "code": "TURPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "土耳其在控制者未向个人数据保护委员会 (KVKK)注册的情况下处理个人数据",
  "description": "该网站控制者在未向个人数据保护委员会 (KVKK)注册的情况下，收集土耳其居民的个人信息，违反了第 6698 号个人数据保护法 (KVKK)。",
  "severity": "serious",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1263,
  "code": "TURPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "土耳其数据安全及加密措施不妥当",
  "description": "该数据库收集并处理土耳其居民的个人文件，但未采用第 6698 号个人数据保护法 (KVKK)所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1264,
  "code": "TURPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "土耳其不合规的数据保留周期",
  "description": "该网站保留土耳其用户的个人记录时间超出指定处理目的所需时间，且缺少符合第 6698 号个人数据保护法 (KVKK)的删除协议。",
  "severity": "serious",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1265,
  "code": "TURPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的土耳其数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得第 6698 号个人数据保护法 (KVKK)及个人数据保护委员会 (KVKK)所需授权的情况下，将土耳其居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1266,
  "code": "NGAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼日利亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据2023年尼日利亚数据保护法 (NDPA)，该网站在未获得事先书面明确同意的情况下，收集尼日利亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1267,
  "code": "NGAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼日利亚在控制者未向尼日利亚数据保护委员会 (NDPC)注册的情况下处理个人数据",
  "description": "该网站控制者在未向尼日利亚数据保护委员会 (NDPC)注册的情况下，收集尼日利亚居民的个人信息，违反了2023年尼日利亚数据保护法 (NDPA)。",
  "severity": "serious",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1268,
  "code": "NGAPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "尼日利亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理尼日利亚居民的个人文件，但未采用2023年尼日利亚数据保护法 (NDPA)所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1269,
  "code": "NGAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "尼日利亚不合规的数据保留周期",
  "description": "该网站保留尼日利亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合2023年尼日利亚数据保护法 (NDPA)的删除协议。",
  "severity": "serious",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1270,
  "code": "NGAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的尼日利亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得2023年尼日利亚数据保护法 (NDPA)及尼日利亚数据保护委员会 (NDPC)所需授权的情况下，将尼日利亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1271,
  "code": "AFGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿富汗在未获得书面同意的情况下处理敏感数据",
  "description": "根据阿富汗电信及媒体法令，该网站在未获得事先书面明确同意的情况下，收集阿富汗主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1272,
  "code": "AFGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿富汗在控制者未向通信部注册的情况下处理个人数据",
  "description": "该网站控制者在未向通信部注册的情况下，收集阿富汗居民的个人信息，违反了阿富汗电信及媒体法令。",
  "severity": "serious",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1273,
  "code": "AFGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "阿富汗数据安全及加密措施不妥当",
  "description": "该数据库收集并处理阿富汗居民的个人文件，但未采用阿富汗电信及媒体法令所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1274,
  "code": "AFGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿富汗不合规的数据保留周期",
  "description": "该网站保留阿富汗用户的个人记录时间超出指定处理目的所需时间，且缺少符合阿富汗电信及媒体法令的删除协议。",
  "severity": "serious",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1275,
  "code": "AFGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的阿富汗数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得阿富汗电信及媒体法令及通信部所需授权的情况下，将阿富汗居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1276,
  "code": "AZEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿塞拜疆在未获得书面同意的情况下处理敏感数据",
  "description": "根据阿塞拜疆个人数据法第 998-IIIQ 号，该网站在未获得事先书面明确同意的情况下，收集阿塞拜疆主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1277,
  "code": "AZEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿塞拜疆在控制者未向数字发展部注册的情况下处理个人数据",
  "description": "该网站控制者在未向数字发展部注册的情况下，收集阿塞拜疆居民的个人信息，违反了阿塞拜疆个人数据法第 998-IIIQ 号。",
  "severity": "serious",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1278,
  "code": "AZEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "阿塞拜疆数据安全及加密措施不妥当",
  "description": "该数据库收集并处理阿塞拜疆居民的个人文件，但未采用阿塞拜疆个人数据法第 998-IIIQ 号所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1279,
  "code": "AZEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "阿塞拜疆不合规的数据保留周期",
  "description": "该网站保留阿塞拜疆用户的个人记录时间超出指定处理目的所需时间，且缺少符合阿塞拜疆个人数据法第 998-IIIQ 号的删除协议。",
  "severity": "serious",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1280,
  "code": "AZEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的阿塞拜疆数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得阿塞拜疆个人数据法第 998-IIIQ 号及数字发展部所需授权的情况下，将阿塞拜疆居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1281,
  "code": "BGDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "孟加拉国在未获得书面同意的情况下处理敏感数据",
  "description": "根据信息与通信技术法 / 孟加拉国数据保护法草案，该网站在未获得事先书面明确同意的情况下，收集孟加拉国主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1282,
  "code": "BGDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "孟加拉国在控制者未向孟加拉国数据保护局注册的情况下处理个人数据",
  "description": "该网站控制者在未向孟加拉国数据保护局注册的情况下，收集孟加拉国居民的个人信息，违反了信息与通信技术法 / 孟加拉国数据保护法草案。",
  "severity": "serious",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1283,
  "code": "BGDPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "孟加拉国数据安全及加密措施不妥当",
  "description": "该数据库收集并处理孟加拉国居民的个人文件，但未采用信息与通信技术法 / 孟加拉国数据保护法草案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1284,
  "code": "BGDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "孟加拉国不合规的数据保留周期",
  "description": "该网站保留孟加拉国用户的个人记录时间超出指定处理目的所需时间，且缺少符合信息与通信技术法 / 孟加拉国数据保护法草案的删除协议。",
  "severity": "serious",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1285,
  "code": "BGDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的孟加拉国数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得信息与通信技术法 / 孟加拉国数据保护法草案及孟加拉国数据保护局所需授权的情况下，将孟加拉国居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1286,
  "code": "BLRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "白俄罗斯在未获得书面同意的情况下处理敏感数据",
  "description": "根据白俄罗斯第 99-Z 号个人数据保护法，该网站在未获得事先书面明确同意的情况下，收集白俄罗斯主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1287,
  "code": "BLRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "白俄罗斯在控制者未向国家个人数据保护中心注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家个人数据保护中心注册的情况下，收集白俄罗斯居民的个人信息，违反了白俄罗斯第 99-Z 号个人数据保护法。",
  "severity": "serious",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1288,
  "code": "BLRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "白俄罗斯数据安全及加密措施不妥当",
  "description": "该数据库收集并处理白俄罗斯居民的个人文件，但未采用白俄罗斯第 99-Z 号个人数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1289,
  "code": "BLRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "白俄罗斯不合规的数据保留周期",
  "description": "该网站保留白俄罗斯用户的个人记录时间超出指定处理目的所需时间，且缺少符合白俄罗斯第 99-Z 号个人数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1290,
  "code": "BLRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的白俄罗斯数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得白俄罗斯第 99-Z 号个人数据保护法及国家个人数据保护中心所需授权的情况下，将白俄罗斯居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1291,
  "code": "CMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "喀麦隆在未获得书面同意的情况下处理敏感数据",
  "description": "根据喀麦隆第 2010/012 号网络安全和网络犯罪法，该网站在未获得事先书面明确同意的情况下，收集喀麦隆主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1292,
  "code": "CMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "喀麦隆在控制者未向国家信息与通信技术局 (ANTIC)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家信息与通信技术局 (ANTIC)注册的情况下，收集喀麦隆居民的个人信息，违反了喀麦隆第 2010/012 号网络安全和网络犯罪法。",
  "severity": "serious",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1293,
  "code": "CMRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "喀麦隆数据安全及加密措施不妥当",
  "description": "该数据库收集并处理喀麦隆居民的个人文件，但未采用喀麦隆第 2010/012 号网络安全和网络犯罪法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1294,
  "code": "CMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "喀麦隆不合规的数据保留周期",
  "description": "该网站保留喀麦隆用户的个人记录时间超出指定处理目的所需时间，且缺少符合喀麦隆第 2010/012 号网络安全和网络犯罪法的删除协议。",
  "severity": "serious",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1295,
  "code": "CMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的喀麦隆数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得喀麦隆第 2010/012 号网络安全和网络犯罪法及国家信息与通信技术局 (ANTIC)所需授权的情况下，将喀麦隆居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1296,
  "code": "COMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科摩罗在未获得书面同意的情况下处理敏感数据",
  "description": "根据科摩罗电子通信与交易法，该网站在未获得事先书面明确同意的情况下，收集科摩罗主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1297,
  "code": "COMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科摩罗在控制者未向国家通信与信息技术监管局 (ANRTIC)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家通信与信息技术监管局 (ANRTIC)注册的情况下，收集科摩罗居民的个人信息，违反了科摩罗电子通信与交易法。",
  "severity": "serious",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1298,
  "code": "COMPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "科摩罗数据安全及加密措施不妥当",
  "description": "该数据库收集并处理科摩罗居民的个人文件，但未采用科摩罗电子通信与交易法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1299,
  "code": "COMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "科摩罗不合规的数据保留周期",
  "description": "该网站保留科摩罗用户的个人记录时间超出指定处理目的所需时间，且缺少符合科摩罗电子通信与交易法的删除协议。",
  "severity": "serious",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1300,
  "code": "COMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的科摩罗数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得科摩罗电子通信与交易法及国家通信与信息技术监管局 (ANRTIC)所需授权的情况下，将科摩罗居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1301,
  "code": "CUBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "古巴在未获得书面同意的情况下处理敏感数据",
  "description": "根据古巴关于社会信息化的第 370 号法令，该网站在未获得事先书面明确同意的情况下，收集古巴主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1302,
  "code": "CUBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "古巴在控制者未向通信部 (MINCOM)注册的情况下处理个人数据",
  "description": "该网站控制者在未向通信部 (MINCOM)注册的情况下，收集古巴居民的个人信息，违反了古巴关于社会信息化的第 370 号法令。",
  "severity": "serious",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1303,
  "code": "CUBPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "古巴数据安全及加密措施不妥当",
  "description": "该数据库收集并处理古巴居民的个人文件，但未采用古巴关于社会信息化的第 370 号法令所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1304,
  "code": "CUBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "古巴不合规的数据保留周期",
  "description": "该网站保留古巴用户的个人记录时间超出指定处理目的所需时间，且缺少符合古巴关于社会信息化的第 370 号法令的删除协议。",
  "severity": "serious",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1305,
  "code": "CUBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的古巴数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得古巴关于社会信息化的第 370 号法令及通信部 (MINCOM)所需授权的情况下，将古巴居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1306,
  "code": "CODPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "刚果民主共和国在未获得书面同意的情况下处理敏感数据",
  "description": "根据刚果民主共和国第 20/017 号电信法，该网站在未获得事先书面明确同意的情况下，收集刚果民主共和国主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1307,
  "code": "CODPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "刚果民主共和国在控制者未向邮电与电信监管局 (ARPTC)注册的情况下处理个人数据",
  "description": "该网站控制者在未向邮电与电信监管局 (ARPTC)注册的情况下，收集刚果民主共和国居民的个人信息，违反了刚果民主共和国第 20/017 号电信法。",
  "severity": "serious",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1308,
  "code": "CODPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "刚果民主共和国数据安全及加密措施不妥当",
  "description": "该数据库收集并处理刚果民主共和国居民的个人文件，但未采用刚果民主共和国第 20/017 号电信法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1309,
  "code": "CODPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "刚果民主共和国不合规的数据保留周期",
  "description": "该网站保留刚果民主共和国用户的个人记录时间超出指定处理目的所需时间，且缺少符合刚果民主共和国第 20/017 号电信法的删除协议。",
  "severity": "serious",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1310,
  "code": "CODPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的刚果民主共和国数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得刚果民主共和国第 20/017 号电信法及邮电与电信监管局 (ARPTC)所需授权的情况下，将刚果民主共和国居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1311,
  "code": "ETHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "埃塞俄比亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据埃塞俄比亚个人数据保护公告草案，该网站在未获得事先书面明确同意的情况下，收集埃塞俄比亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1312,
  "code": "ETHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "埃塞俄比亚在控制者未向创新与技术部 (MInT)注册的情况下处理个人数据",
  "description": "该网站控制者在未向创新与技术部 (MInT)注册的情况下，收集埃塞俄比亚居民的个人信息，违反了埃塞俄比亚个人数据保护公告草案。",
  "severity": "serious",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1313,
  "code": "ETHPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "埃塞俄比亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理埃塞俄比亚居民的个人文件，但未采用埃塞俄比亚个人数据保护公告草案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1314,
  "code": "ETHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "埃塞俄比亚不合规的数据保留周期",
  "description": "该网站保留埃塞俄比亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合埃塞俄比亚个人数据保护公告草案的删除协议。",
  "severity": "serious",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1315,
  "code": "ETHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的埃塞俄比亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得埃塞俄比亚个人数据保护公告草案及创新与技术部 (MInT)所需授权的情况下，将埃塞俄比亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1316,
  "code": "HTIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "海地在未获得书面同意的情况下处理敏感数据",
  "description": "根据海地网络安全指南 / 隐私规则草案，该网站在未获得事先书面明确同意的情况下，收集海地主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1317,
  "code": "HTIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "海地在控制者未向国家电信委员会 (CONATEL)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家电信委员会 (CONATEL)注册的情况下，收集海地居民的个人信息，违反了海地网络安全指南 / 隐私规则草案。",
  "severity": "serious",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1318,
  "code": "HTIPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "海地数据安全及加密措施不妥当",
  "description": "该数据库收集并处理海地居民的个人文件，但未采用海地网络安全指南 / 隐私规则草案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1319,
  "code": "HTIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "海地不合规的数据保留周期",
  "description": "该网站保留海地用户的个人记录时间超出指定处理目的所需时间，且缺少符合海地网络安全指南 / 隐私规则草案的删除协议。",
  "severity": "serious",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1320,
  "code": "HTIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的海地数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得海地网络安全指南 / 隐私规则草案及国家电信委员会 (CONATEL)所需授权的情况下，将海地居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1321,
  "code": "IRNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "伊朗在未获得书面同意的情况下处理敏感数据",
  "description": "根据伊朗网络空间条例 / 个人数据保护草案，该网站在未获得事先书面明确同意的情况下，收集伊朗主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1322,
  "code": "IRNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "伊朗在控制者未向通信监管局 (CRA)注册的情况下处理个人数据",
  "description": "该网站控制者在未向通信监管局 (CRA)注册的情况下，收集伊朗居民的个人信息，违反了伊朗网络空间条例 / 个人数据保护草案。",
  "severity": "serious",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1323,
  "code": "IRNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "伊朗数据安全及加密措施不妥当",
  "description": "该数据库收集并处理伊朗居民的个人文件，但未采用伊朗网络空间条例 / 个人数据保护草案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1324,
  "code": "IRNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "伊朗不合规的数据保留周期",
  "description": "该网站保留伊朗用户的个人记录时间超出指定处理目的所需时间，且缺少符合伊朗网络空间条例 / 个人数据保护草案的删除协议。",
  "severity": "serious",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1325,
  "code": "IRNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的伊朗数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得伊朗网络空间条例 / 个人数据保护草案及通信监管局 (CRA)所需授权的情况下，将伊朗居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1326,
  "code": "LBYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "利比亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据利比亚电信及网络犯罪决议，该网站在未获得事先书面明确同意的情况下，收集利比亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1327,
  "code": "LBYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "利比亚在控制者未向邮电通信总局 (GPTC)注册的情况下处理个人数据",
  "description": "该网站控制者在未向邮电通信总局 (GPTC)注册的情况下，收集利比亚居民的个人信息，违反了利比亚电信及网络犯罪决议。",
  "severity": "serious",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1328,
  "code": "LBYPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "利比亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理利比亚居民的个人文件，但未采用利比亚电信及网络犯罪决议所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1329,
  "code": "LBYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "利比亚不合规的数据保留周期",
  "description": "该网站保留利比亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合利比亚电信及网络犯罪决议的删除协议。",
  "severity": "serious",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1330,
  "code": "LBYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的利比亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得利比亚电信及网络犯罪决议及邮电通信总局 (GPTC)所需授权的情况下，将利比亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1331,
  "code": "NRUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑙鲁在未获得书面同意的情况下处理敏感数据",
  "description": "根据瑙鲁网络安全法 / 隐私规则草案，该网站在未获得事先书面明确同意的情况下，收集瑙鲁主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1332,
  "code": "NRUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑙鲁在控制者未向电信部注册的情况下处理个人数据",
  "description": "该网站控制者在未向电信部注册的情况下，收集瑙鲁居民的个人信息，违反了瑙鲁网络安全法 / 隐私规则草案。",
  "severity": "serious",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1333,
  "code": "NRUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "瑙鲁数据安全及加密措施不妥当",
  "description": "该数据库收集并处理瑙鲁居民的个人文件，但未采用瑙鲁网络安全法 / 隐私规则草案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1334,
  "code": "NRUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑙鲁不合规的数据保留周期",
  "description": "该网站保留瑙鲁用户的个人记录时间超出指定处理目的所需时间，且缺少符合瑙鲁网络安全法 / 隐私规则草案的删除协议。",
  "severity": "serious",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1335,
  "code": "NRUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的瑙鲁数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得瑙鲁网络安全法 / 隐私规则草案及电信部所需授权的情况下，将瑙鲁居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1336,
  "code": "PRKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "朝鲜在未获得书面同意的情况下处理敏感数据",
  "description": "根据朝鲜民主主义人民共和国网络安全与电子交易法，该网站在未获得事先书面明确同意的情况下，收集朝鲜主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1337,
  "code": "PRKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "朝鲜在控制者未向邮电部注册的情况下处理个人数据",
  "description": "该网站控制者在未向邮电部注册的情况下，收集朝鲜居民的个人信息，违反了朝鲜民主主义人民共和国网络安全与电子交易法。",
  "severity": "serious",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1338,
  "code": "PRKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "朝鲜数据安全及加密措施不妥当",
  "description": "该数据库收集并处理朝鲜居民的个人文件，但未采用朝鲜民主主义人民共和国网络安全与电子交易法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1339,
  "code": "PRKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "朝鲜不合规的数据保留周期",
  "description": "该网站保留朝鲜用户的个人记录时间超出指定处理目的所需时间，且缺少符合朝鲜民主主义人民共和国网络安全与电子交易法的删除协议。",
  "severity": "serious",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1340,
  "code": "PRKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的朝鲜数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得朝鲜民主主义人民共和国网络安全与电子交易法及邮电部所需授权的情况下，将朝鲜居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1341,
  "code": "TKMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "土库曼斯坦在未获得书面同意的情况下处理敏感数据",
  "description": "根据土库曼斯坦关于信息及其保护的第 562-V 号法，该网站在未获得事先书面明确同意的情况下，收集土库曼斯坦主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1342,
  "code": "TKMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "土库曼斯坦在控制者未向通信部注册的情况下处理个人数据",
  "description": "该网站控制者在未向通信部注册的情况下，收集土库曼斯坦居民的个人信息，违反了土库曼斯坦关于信息及其保护的第 562-V 号法。",
  "severity": "serious",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1343,
  "code": "TKMPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "土库曼斯坦数据安全及加密措施不妥当",
  "description": "该数据库收集并处理土库曼斯坦居民的个人文件，但未采用土库曼斯坦关于信息及其保护的第 562-V 号法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1344,
  "code": "TKMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "土库曼斯坦不合规的数据保留周期",
  "description": "该网站保留土库曼斯坦用户的个人记录时间超出指定处理目的所需时间，且缺少符合土库曼斯坦关于信息及其保护的第 562-V 号法的删除协议。",
  "severity": "serious",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1345,
  "code": "TKMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的土库曼斯坦数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得土库曼斯坦关于信息及其保护的第 562-V 号法及通信部所需授权的情况下，将土库曼斯坦居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1346,
  "code": "TUVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "图瓦卢在未获得书面同意的情况下处理敏感数据",
  "description": "根据图瓦卢网络安全及隐私规则草案，该网站在未获得事先书面明确同意的情况下，收集图瓦卢主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1347,
  "code": "TUVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "图瓦卢在控制者未向电信部注册的情况下处理个人数据",
  "description": "该网站控制者在未向电信部注册的情况下，收集图瓦卢居民的个人信息，违反了图瓦卢网络安全及隐私规则草案。",
  "severity": "serious",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1348,
  "code": "TUVPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "图瓦卢数据安全及加密措施不妥当",
  "description": "该数据库收集并处理图瓦卢居民的个人文件，但未采用图瓦卢网络安全及隐私规则草案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1349,
  "code": "TUVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "图瓦卢不合规的数据保留周期",
  "description": "该网站保留图瓦卢用户的个人记录时间超出指定处理目的所需时间，且缺少符合图瓦卢网络安全及隐私规则草案的删除协议。",
  "severity": "serious",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1350,
  "code": "TUVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的图瓦卢数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得图瓦卢网络安全及隐私规则草案及电信部所需授权的情况下，将图瓦卢居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1351,
  "code": "VATPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "梵蒂冈在未获得书面同意的情况下处理敏感数据",
  "description": "根据梵蒂冈网络安全与行政指令，该网站在未获得事先书面明确同意的情况下，收集梵蒂冈主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1352,
  "code": "VATPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "梵蒂冈在控制者未向梵蒂冈宪兵与行政管理机构注册的情况下处理个人数据",
  "description": "该网站控制者在未向梵蒂冈宪兵与行政管理机构注册的情况下，收集梵蒂冈居民的个人信息，违反了梵蒂冈网络安全与行政指令。",
  "severity": "serious",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1353,
  "code": "VATPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "梵蒂冈数据安全及加密措施不妥当",
  "description": "该数据库收集并处理梵蒂冈居民的个人文件，但未采用梵蒂冈网络安全与行政指令所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1354,
  "code": "VATPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "梵蒂冈不合规的数据保留周期",
  "description": "该网站保留梵蒂冈用户的个人记录时间超出指定处理目的所需时间，且缺少符合梵蒂冈网络安全与行政指令的删除协议。",
  "severity": "serious",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1355,
  "code": "VATPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的梵蒂冈数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得梵蒂冈网络安全与行政指令及梵蒂冈宪兵与行政管理机构所需授权的情况下，将梵蒂冈居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1356,
  "code": "ESHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "西撒哈拉在未获得书面同意的情况下处理敏感数据",
  "description": "根据西撒哈拉信息规则 / 网络安全草案，该网站在未获得事先书面明确同意的情况下，收集西撒哈拉主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1357,
  "code": "ESHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "西撒哈拉在控制者未向电信监管局注册的情况下处理个人数据",
  "description": "该网站控制者在未向电信监管局注册的情况下，收集西撒哈拉居民的个人信息，违反了西撒哈拉信息规则 / 网络安全草案。",
  "severity": "serious",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1358,
  "code": "ESHPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "西撒哈拉数据安全及加密措施不妥当",
  "description": "该数据库收集并处理西撒哈拉居民的个人文件，但未采用西撒哈拉信息规则 / 网络安全草案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1359,
  "code": "ESHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "西撒哈拉不合规的数据保留周期",
  "description": "该网站保留西撒哈拉用户的个人记录时间超出指定处理目的所需时间，且缺少符合西撒哈拉信息规则 / 网络安全草案的删除协议。",
  "severity": "serious",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1360,
  "code": "ESHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的西撒哈拉数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得西撒哈拉信息规则 / 网络安全草案及电信监管局所需授权的情况下，将西撒哈拉居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1361,
  "code": "BGRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "保加利亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据保加利亚个人数据保护法，该网站在未获得事先书面明确同意的情况下，收集保加利亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1362,
  "code": "BGRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "保加利亚在控制者未向个人数据保护委员会 (CPDP)注册的情况下处理个人数据",
  "description": "该网站控制者在未向个人数据保护委员会 (CPDP)注册的情况下，收集保加利亚居民的个人信息，违反了保加利亚个人数据保护法。",
  "severity": "serious",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1363,
  "code": "BGRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "保加利亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理保加利亚居民的个人文件，但未采用保加利亚个人数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1364,
  "code": "BGRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "保加利亚不合规的数据保留周期",
  "description": "该网站保留保加利亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合保加利亚个人数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1365,
  "code": "BGRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的保加利亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得保加利亚个人数据保护法及个人数据保护委员会 (CPDP)所需授权的情况下，将保加利亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1366,
  "code": "HRVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "克罗地亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据克罗地亚关于执行通用数据保护条例的法案，该网站在未获得事先书面明确同意的情况下，收集克罗地亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1367,
  "code": "HRVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "克罗地亚在控制者未向个人数据保护局 (AZOP)注册的情况下处理个人数据",
  "description": "该网站控制者在未向个人数据保护局 (AZOP)注册的情况下，收集克罗地亚居民的个人信息，违反了克罗地亚关于执行通用数据保护条例的法案。",
  "severity": "serious",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1368,
  "code": "HRVPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "克罗地亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理克罗地亚居民的个人文件，但未采用克罗地亚关于执行通用数据保护条例的法案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1369,
  "code": "HRVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "克罗地亚不合规的数据保留周期",
  "description": "该网站保留克罗地亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合克罗地亚关于执行通用数据保护条例的法案的删除协议。",
  "severity": "serious",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1370,
  "code": "HRVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的克罗地亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得克罗地亚关于执行通用数据保护条例的法案及个人数据保护局 (AZOP)所需授权的情况下，将克罗地亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1371,
  "code": "ESTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "爱沙尼亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据爱沙尼亚个人数据保护法 (IKS)，该网站在未获得事先书面明确同意的情况下，收集爱沙尼亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1372,
  "code": "ESTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "爱沙尼亚在控制者未向数据保护局 (AKI)注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护局 (AKI)注册的情况下，收集爱沙尼亚居民的个人信息，违反了爱沙尼亚个人数据保护法 (IKS)。",
  "severity": "serious",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1373,
  "code": "ESTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "爱沙尼亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理爱沙尼亚居民的个人文件，但未采用爱沙尼亚个人数据保护法 (IKS)所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1374,
  "code": "ESTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "爱沙尼亚不合规的数据保留周期",
  "description": "该网站保留爱沙尼亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合爱沙尼亚个人数据保护法 (IKS)的删除协议。",
  "severity": "serious",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1375,
  "code": "ESTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的爱沙尼亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得爱沙尼亚个人数据保护法 (IKS)及数据保护局 (AKI)所需授权的情况下，将爱沙尼亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1376,
  "code": "LVAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "拉脱维亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据拉脱维亚个人数据处理法，该网站在未获得事先书面明确同意的情况下，收集拉脱维亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1377,
  "code": "LVAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "拉脱维亚在控制者未向国家数据督察局 (DVI)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家数据督察局 (DVI)注册的情况下，收集拉脱维亚居民的个人信息，违反了拉脱维亚个人数据处理法。",
  "severity": "serious",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1378,
  "code": "LVAPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "拉脱维亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理拉脱维亚居民的个人文件，但未采用拉脱维亚个人数据处理法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1379,
  "code": "LVAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "拉脱维亚不合规的数据保留周期",
  "description": "该网站保留拉脱维亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合拉脱维亚个人数据处理法的删除协议。",
  "severity": "serious",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1380,
  "code": "LVAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的拉脱维亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得拉脱维亚个人数据处理法及国家数据督察局 (DVI)所需授权的情况下，将拉脱维亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1381,
  "code": "LTUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "立陶宛在未获得书面同意的情况下处理敏感数据",
  "description": "根据立陶宛个人数据法律保护法，该网站在未获得事先书面明确同意的情况下，收集立陶宛主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1382,
  "code": "LTUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "立陶宛在控制者未向国家数据保护督察局 (VDAI)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家数据保护督察局 (VDAI)注册的情况下，收集立陶宛居民的个人信息，违反了立陶宛个人数据法律保护法。",
  "severity": "serious",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1383,
  "code": "LTUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "立陶宛数据安全及加密措施不妥当",
  "description": "该数据库收集并处理立陶宛居民的个人文件，但未采用立陶宛个人数据法律保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1384,
  "code": "LTUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "立陶宛不合规的数据保留周期",
  "description": "该网站保留立陶宛用户的个人记录时间超出指定处理目的所需时间，且缺少符合立陶宛个人数据法律保护法的删除协议。",
  "severity": "serious",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1385,
  "code": "LTUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的立陶宛数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得立陶宛个人数据法律保护法及国家数据保护督察局 (VDAI)所需授权的情况下，将立陶宛居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1386,
  "code": "CYPPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞浦路斯在未获得书面同意的情况下处理敏感数据",
  "description": "根据塞浦路斯个人数据处理个人保护法，该网站在未获得事先书面明确同意的情况下，收集塞浦路斯主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1387,
  "code": "CYPPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞浦路斯在控制者未向个人数据保护专员注册的情况下处理个人数据",
  "description": "该网站控制者在未向个人数据保护专员注册的情况下，收集塞浦路斯居民的个人信息，违反了塞浦路斯个人数据处理个人保护法。",
  "severity": "serious",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1388,
  "code": "CYPPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "塞浦路斯数据安全及加密措施不妥当",
  "description": "该数据库收集并处理塞浦路斯居民的个人文件，但未采用塞浦路斯个人数据处理个人保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1389,
  "code": "CYPPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "塞浦路斯不合规的数据保留周期",
  "description": "该网站保留塞浦路斯用户的个人记录时间超出指定处理目的所需时间，且缺少符合塞浦路斯个人数据处理个人保护法的删除协议。",
  "severity": "serious",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1390,
  "code": "CYPPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的塞浦路斯数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得塞浦路斯个人数据处理个人保护法及个人数据保护专员所需授权的情况下，将塞浦路斯居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1391,
  "code": "MLTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马耳他在未获得书面同意的情况下处理敏感数据",
  "description": "根据马耳他数据保护法 (第 586 章)，该网站在未获得事先书面明确同意的情况下，收集马耳他主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1392,
  "code": "MLTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马耳他在控制者未向信息与数据保护专员办公室 (IDPC)注册的情况下处理个人数据",
  "description": "该网站控制者在未向信息与数据保护专员办公室 (IDPC)注册的情况下，收集马耳他居民的个人信息，违反了马耳他数据保护法 (第 586 章)。",
  "severity": "serious",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1393,
  "code": "MLTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "马耳他数据安全及加密措施不妥当",
  "description": "该数据库收集并处理马耳他居民的个人文件，但未采用马耳他数据保护法 (第 586 章)所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1394,
  "code": "MLTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "马耳他不合规的数据保留周期",
  "description": "该网站保留马耳他用户的个人记录时间超出指定处理目的所需时间，且缺少符合马耳他数据保护法 (第 586 章)的删除协议。",
  "severity": "serious",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1395,
  "code": "MLTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的马耳他数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得马耳他数据保护法 (第 586 章)及信息与数据保护专员办公室 (IDPC)所需授权的情况下，将马耳他居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1396,
  "code": "SVKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯洛伐克在未获得书面同意的情况下处理敏感数据",
  "description": "根据斯洛伐克第 18/2018 Coll. 号个人数据保护法，该网站在未获得事先书面明确同意的情况下，收集斯洛伐克主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1397,
  "code": "SVKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯洛伐克在控制者未向个人数据保护局注册的情况下处理个人数据",
  "description": "该网站控制者在未向个人数据保护局注册的情况下，收集斯洛伐克居民的个人信息，违反了斯洛伐克第 18/2018 Coll. 号个人数据保护法。",
  "severity": "serious",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1398,
  "code": "SVKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "斯洛伐克数据安全及加密措施不妥当",
  "description": "该数据库收集并处理斯洛伐克居民的个人文件，但未采用斯洛伐克第 18/2018 Coll. 号个人数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1399,
  "code": "SVKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯洛伐克不合规的数据保留周期",
  "description": "该网站保留斯洛伐克用户的个人记录时间超出指定处理目的所需时间，且缺少符合斯洛伐克第 18/2018 Coll. 号个人数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1400,
  "code": "SVKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的斯洛伐克数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得斯洛伐克第 18/2018 Coll. 号个人数据保护法及个人数据保护局所需授权的情况下，将斯洛伐克居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1401,
  "code": "SVNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯洛文尼亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据斯洛文尼亚个人数据保护法 (ZVOP-2)，该网站在未获得事先书面明确同意的情况下，收集斯洛文尼亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1402,
  "code": "SVNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯洛文尼亚在控制者未向信息专员注册的情况下处理个人数据",
  "description": "该网站控制者在未向信息专员注册的情况下，收集斯洛文尼亚居民的个人信息，违反了斯洛文尼亚个人数据保护法 (ZVOP-2)。",
  "severity": "serious",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1403,
  "code": "SVNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "斯洛文尼亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理斯洛文尼亚居民的个人文件，但未采用斯洛文尼亚个人数据保护法 (ZVOP-2)所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1404,
  "code": "SVNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "斯洛文尼亚不合规的数据保留周期",
  "description": "该网站保留斯洛文尼亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合斯洛文尼亚个人数据保护法 (ZVOP-2)的删除协议。",
  "severity": "serious",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1405,
  "code": "SVNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的斯洛文尼亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得斯洛文尼亚个人数据保护法 (ZVOP-2)及信息专员所需授权的情况下，将斯洛文尼亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1406,
  "code": "LUXPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "卢森堡在未获得书面同意的情况下处理敏感数据",
  "description": "根据卢森堡个人数据保护法，该网站在未获得事先书面明确同意的情况下，收集卢森堡主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1407,
  "code": "LUXPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "卢森堡在控制者未向国家数据保护委员会 (CNPD)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家数据保护委员会 (CNPD)注册的情况下，收集卢森堡居民的个人信息，违反了卢森堡个人数据保护法。",
  "severity": "serious",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1408,
  "code": "LUXPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "卢森堡数据安全及加密措施不妥当",
  "description": "该数据库收集并处理卢森堡居民的个人文件，但未采用卢森堡个人数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1409,
  "code": "LUXPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "卢森堡不合规的数据保留周期",
  "description": "该网站保留卢森堡用户的个人记录时间超出指定处理目的所需时间，且缺少符合卢森堡个人数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1410,
  "code": "LUXPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的卢森堡数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得卢森堡个人数据保护法及国家数据保护委员会 (CNPD)所需授权的情况下，将卢森堡居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1411,
  "code": "CZEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "捷克共和国在未获得书面同意的情况下处理敏感数据",
  "description": "根据捷克第 110/2019 Coll. 号个人数据处理法，该网站在未获得事先书面明确同意的情况下，收集捷克共和国主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1412,
  "code": "CZEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "捷克共和国在控制者未向个人数据保护局 (UOOU)注册的情况下处理个人数据",
  "description": "该网站控制者在未向个人数据保护局 (UOOU)注册的情况下，收集捷克共和国居民的个人信息，违反了捷克第 110/2019 Coll. 号个人数据处理法。",
  "severity": "serious",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1413,
  "code": "CZEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "捷克共和国数据安全及加密措施不妥当",
  "description": "该数据库收集并处理捷克共和国居民的个人文件，但未采用捷克第 110/2019 Coll. 号个人数据处理法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1414,
  "code": "CZEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "捷克共和国不合规的数据保留周期",
  "description": "该网站保留捷克共和国用户的个人记录时间超出指定处理目的所需时间，且缺少符合捷克第 110/2019 Coll. 号个人数据处理法的删除协议。",
  "severity": "serious",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1415,
  "code": "CZEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的捷克共和国数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得捷克第 110/2019 Coll. 号个人数据处理法及个人数据保护局 (UOOU)所需授权的情况下，将捷克共和国居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1416,
  "code": "HUNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "匈牙利在未获得书面同意的情况下处理敏感数据",
  "description": "根据匈牙利2011年第 CXII 号信息自决与信息自由法，该网站在未获得事先书面明确同意的情况下，收集匈牙利主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1417,
  "code": "HUNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "匈牙利在控制者未向国家数据保护与信息自由局 (NAIH)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家数据保护与信息自由局 (NAIH)注册的情况下，收集匈牙利居民的个人信息，违反了匈牙利2011年第 CXII 号信息自决与信息自由法。",
  "severity": "serious",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1418,
  "code": "HUNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "匈牙利数据安全及加密措施不妥当",
  "description": "该数据库收集并处理匈牙利居民的个人文件，但未采用匈牙利2011年第 CXII 号信息自决与信息自由法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1419,
  "code": "HUNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "匈牙利不合规的数据保留周期",
  "description": "该网站保留匈牙利用户的个人记录时间超出指定处理目的所需时间，且缺少符合匈牙利2011年第 CXII 号信息自决与信息自由法的删除协议。",
  "severity": "serious",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1420,
  "code": "HUNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的匈牙利数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得匈牙利2011年第 CXII 号信息自决与信息自由法及国家数据保护与信息自由局 (NAIH)所需授权的情况下，将匈牙利居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1421,
  "code": "ROUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "罗马尼亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据罗马尼亚关于执行 GDPR 措施的的第 190/2018 号法律，该网站在未获得事先书面明确同意的情况下，收集罗马尼亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1422,
  "code": "ROUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "罗马尼亚在控制者未向国家个人数据处理监督管理局 (ANSPDCP)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家个人数据处理监督管理局 (ANSPDCP)注册的情况下，收集罗马尼亚居民的个人信息，违反了罗马尼亚关于执行 GDPR 措施的的第 190/2018 号法律。",
  "severity": "serious",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1423,
  "code": "ROUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "罗马尼亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理罗马尼亚居民的个人文件，但未采用罗马尼亚关于执行 GDPR 措施的的第 190/2018 号法律所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1424,
  "code": "ROUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "罗马尼亚不合规的数据保留周期",
  "description": "该网站保留罗马尼亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合罗马尼亚关于执行 GDPR 措施的的第 190/2018 号法律的删除协议。",
  "severity": "serious",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1425,
  "code": "ROUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的罗马尼亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得罗马尼亚关于执行 GDPR 措施的的第 190/2018 号法律及国家个人数据处理监督管理局 (ANSPDCP)所需授权的情况下，将罗马尼亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1426,
  "code": "POLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波兰在未获得书面同意的情况下处理敏感数据",
  "description": "根据波兰个人数据保护法，该网站在未获得事先书面明确同意的情况下，收集波兰主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1427,
  "code": "POLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波兰在控制者未向个人数据保护局 (UODO)注册的情况下处理个人数据",
  "description": "该网站控制者在未向个人数据保护局 (UODO)注册的情况下，收集波兰居民的个人信息，违反了波兰个人数据保护法。",
  "severity": "serious",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1428,
  "code": "POLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "波兰数据安全及加密措施不妥当",
  "description": "该数据库收集并处理波兰居民的个人文件，但未采用波兰个人数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1429,
  "code": "POLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "波兰不合规的数据保留周期",
  "description": "该网站保留波兰用户的个人记录时间超出指定处理目的所需时间，且缺少符合波兰个人数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1430,
  "code": "POLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的波兰数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得波兰个人数据保护法及个人数据保护局 (UODO)所需授权的情况下，将波兰居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1431,
  "code": "IRLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "爱尔兰在未获得书面同意的情况下处理敏感数据",
  "description": "根据爱尔兰2018年数据保护法，该网站在未获得事先书面明确同意的情况下，收集爱尔兰主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1432,
  "code": "IRLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "爱尔兰在控制者未向数据保护委员会 (DPC)注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护委员会 (DPC)注册的情况下，收集爱尔兰居民的个人信息，违反了爱尔兰2018年数据保护法。",
  "severity": "serious",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1433,
  "code": "IRLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "爱尔兰数据安全及加密措施不妥当",
  "description": "该数据库收集并处理爱尔兰居民的个人文件，但未采用爱尔兰2018年数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1434,
  "code": "IRLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "爱尔兰不合规的数据保留周期",
  "description": "该网站保留爱尔兰用户的个人记录时间超出指定处理目的所需时间，且缺少符合爱尔兰2018年数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1435,
  "code": "IRLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的爱尔兰数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得爱尔兰2018年数据保护法及数据保护委员会 (DPC)所需授权的情况下，将爱尔兰居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1436,
  "code": "AUTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "奥地利在未获得书面同意的情况下处理敏感数据",
  "description": "根据奥地利联邦个人数据保护法 (DSG)，该网站在未获得事先书面明确同意的情况下，收集奥地利主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1437,
  "code": "AUTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "奥地利在控制者未向数据保护局 (DSB)注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护局 (DSB)注册的情况下，收集奥地利居民的个人信息，违反了奥地利联邦个人数据保护法 (DSG)。",
  "severity": "serious",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1438,
  "code": "AUTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "奥地利数据安全及加密措施不妥当",
  "description": "该数据库收集并处理奥地利居民的个人文件，但未采用奥地利联邦个人数据保护法 (DSG)所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1439,
  "code": "AUTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "奥地利不合规的数据保留周期",
  "description": "该网站保留奥地利用户的个人记录时间超出指定处理目的所需时间，且缺少符合奥地利联邦个人数据保护法 (DSG)的删除协议。",
  "severity": "serious",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1440,
  "code": "AUTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的奥地利数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得奥地利联邦个人数据保护法 (DSG)及数据保护局 (DSB)所需授权的情况下，将奥地利居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1441,
  "code": "SWEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑞典在未获得书面同意的情况下处理敏感数据",
  "description": "根据瑞典个人数据保护法，该网站在未获得事先书面明确同意的情况下，收集瑞典主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1442,
  "code": "SWEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑞典在控制者未向隐私保护局 (IMY)注册的情况下处理个人数据",
  "description": "该网站控制者在未向隐私保护局 (IMY)注册的情况下，收集瑞典居民的个人信息，违反了瑞典个人数据保护法。",
  "severity": "serious",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1443,
  "code": "SWEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "瑞典数据安全及加密措施不妥当",
  "description": "该数据库收集并处理瑞典居民的个人文件，但未采用瑞典个人数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1444,
  "code": "SWEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "瑞典不合规的数据保留周期",
  "description": "该网站保留瑞典用户的个人记录时间超出指定处理目的所需时间，且缺少符合瑞典个人数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1445,
  "code": "SWEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的瑞典数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得瑞典个人数据保护法及隐私保护局 (IMY)所需授权的情况下，将瑞典居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1446,
  "code": "FLNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "芬兰在未获得书面同意的情况下处理敏感数据",
  "description": "根据芬兰数据保护法 (1050/2018)，该网站在未获得事先书面明确同意的情况下，收集芬兰主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1447,
  "code": "FLNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "芬兰在控制者未向数据保护专员办公室注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护专员办公室注册的情况下，收集芬兰居民的个人信息，违反了芬兰数据保护法 (1050/2018)。",
  "severity": "serious",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1448,
  "code": "FLNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "芬兰数据安全及加密措施不妥当",
  "description": "该数据库收集并处理芬兰居民的个人文件，但未采用芬兰数据保护法 (1050/2018)所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1449,
  "code": "FLNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "芬兰不合规的数据保留周期",
  "description": "该网站保留芬兰用户的个人记录时间超出指定处理目的所需时间，且缺少符合芬兰数据保护法 (1050/2018)的删除协议。",
  "severity": "serious",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1450,
  "code": "FLNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的芬兰数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得芬兰数据保护法 (1050/2018)及数据保护专员办公室所需授权的情况下，将芬兰居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1451,
  "code": "DNKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "丹麦在未获得书面同意的情况下处理敏感数据",
  "description": "根据丹麦数据保护法，该网站在未获得事先书面明确同意的情况下，收集丹麦主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1452,
  "code": "DNKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "丹麦在控制者未向数据监察局 (Datatilsynet)注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据监察局 (Datatilsynet)注册的情况下，收集丹麦居民的个人信息，违反了丹麦数据保护法。",
  "severity": "serious",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1453,
  "code": "DNKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "丹麦数据安全及加密措施不妥当",
  "description": "该数据库收集并处理丹麦居民的个人文件，但未采用丹麦数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1454,
  "code": "DNKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "丹麦不合规的数据保留周期",
  "description": "该网站保留丹麦用户的个人记录时间超出指定处理目的所需时间，且缺少符合丹麦数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1455,
  "code": "DNKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的丹麦数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得丹麦数据保护法及数据监察局 (Datatilsynet)所需授权的情况下，将丹麦居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1456,
  "code": "BELPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "比利时在未获得书面同意的情况下处理敏感数据",
  "description": "根据比利时个人数据保护法，该网站在未获得事先书面明确同意的情况下，收集比利时主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1457,
  "code": "BELPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "比利时在控制者未向数据保护局 (APD-GBA)注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护局 (APD-GBA)注册的情况下，收集比利时居民的个人信息，违反了比利时个人数据保护法。",
  "severity": "serious",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1458,
  "code": "BELPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "比利时数据安全及加密措施不妥当",
  "description": "该数据库收集并处理比利时居民的个人文件，但未采用比利时个人数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1459,
  "code": "BELPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "比利时不合规的数据保留周期",
  "description": "该网站保留比利时用户的个人记录时间超出指定处理目的所需时间，且缺少符合比利时个人数据保护法的删除协议。",
  "severity": "serious",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1460,
  "code": "BELPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的比利时数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得比利时个人数据保护法及数据保护局 (APD-GBA)所需授权的情况下，将比利时居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1461,
  "code": "GRCPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "希腊在未获得书面同意的情况下处理敏感数据",
  "description": "根据希腊关于执行 GDPR 措施的第 4624/2019 号法律，该网站在未获得事先书面明确同意的情况下，收集希腊主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1462,
  "code": "GRCPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "希腊在控制者未向希腊个人数据保护局 (HDPA)注册的情况下处理个人数据",
  "description": "该网站控制者在未向希腊个人数据保护局 (HDPA)注册的情况下，收集希腊居民的个人信息，违反了希腊关于执行 GDPR 措施的第 4624/2019 号法律。",
  "severity": "serious",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1463,
  "code": "GRCPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "希腊数据安全及加密措施不妥当",
  "description": "该数据库收集并处理希腊居民的个人文件，但未采用希腊关于执行 GDPR 措施的第 4624/2019 号法律所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1464,
  "code": "GRCPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "希腊不合规的数据保留周期",
  "description": "该网站保留希腊用户的个人记录时间超出指定处理目的所需时间，且缺少符合希腊关于执行 GDPR 措施的第 4624/2019 号法律的删除协议。",
  "severity": "serious",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1465,
  "code": "GRCPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的希腊数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得希腊关于执行 GDPR 措施的第 4624/2019 号法律及希腊个人数据保护局 (HDPA)所需授权的情况下，将希腊居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1466,
  "code": "PRTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "葡萄牙在未获得书面同意的情况下处理敏感数据",
  "description": "根据葡萄牙关于执行 GDPR 规则的第 58/2019 号法律，该网站在未获得事先书面明确同意的情况下，收集葡萄牙主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1467,
  "code": "PRTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "葡萄牙在控制者未向国家数据保护委员会 (CNPD)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家数据保护委员会 (CNPD)注册的情况下，收集葡萄牙居民的个人信息，违反了葡萄牙关于执行 GDPR 规则的第 58/2019 号法律。",
  "severity": "serious",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1468,
  "code": "PRTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "葡萄牙数据安全及加密措施不妥当",
  "description": "该数据库收集并处理葡萄牙居民的个人文件，但未采用葡萄牙关于执行 GDPR 规则的第 58/2019 号法律所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1469,
  "code": "PRTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "葡萄牙不合规的数据保留周期",
  "description": "该网站保留葡萄牙用户的个人记录时间超出指定处理目的所需时间，且缺少符合葡萄牙关于执行 GDPR 规则的第 58/2019 号法律的删除协议。",
  "severity": "serious",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1470,
  "code": "PRTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的葡萄牙数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得葡萄牙关于执行 GDPR 规则的第 58/2019 号法律及国家数据保护委员会 (CNPD)所需授权的情况下，将葡萄牙居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1471,
  "code": "GRLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "格陵兰在未获得书面同意的情况下处理敏感数据",
  "description": "根据格陵兰个人数据处理法案，该网站在未获得事先书面明确同意的情况下，收集格陵兰主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1472,
  "code": "GRLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "格陵兰在控制者未向数据监察局 (Datatilsynet)注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据监察局 (Datatilsynet)注册的情况下，收集格陵兰居民的个人信息，违反了格陵兰个人数据处理法案。",
  "severity": "serious",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1473,
  "code": "GRLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "格陵兰数据安全及加密措施不妥当",
  "description": "该数据库收集并处理格陵兰居民的个人文件，但未采用格陵兰个人数据处理法案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1474,
  "code": "GRLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "格陵兰不合规的数据保留周期",
  "description": "该网站保留格陵兰用户的个人记录时间超出指定处理目的所需时间，且缺少符合格陵兰个人数据处理法案的删除协议。",
  "severity": "serious",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1475,
  "code": "GRLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的格陵兰数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得格陵兰个人数据处理法案及数据监察局 (Datatilsynet)所需授权的情况下，将格陵兰居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1476,
  "code": "FLKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "福克兰群岛在未获得书面同意的情况下处理敏感数据",
  "description": "根据福克兰群岛2018年数据保护条例，该网站在未获得事先书面明确同意的情况下，收集福克兰群岛主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1477,
  "code": "FLKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "福克兰群岛在控制者未向数据保护专员注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护专员注册的情况下，收集福克兰群岛居民的个人信息，违反了福克兰群岛2018年数据保护条例。",
  "severity": "serious",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1478,
  "code": "FLKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "福克兰群岛数据安全及加密措施不妥当",
  "description": "该数据库收集并处理福克兰群岛居民的个人文件，但未采用福克兰群岛2018年数据保护条例所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1479,
  "code": "FLKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "福克兰群岛不合规的数据保留周期",
  "description": "该网站保留福克兰群岛用户的个人记录时间超出指定处理目的所需时间，且缺少符合福克兰群岛2018年数据保护条例的删除协议。",
  "severity": "serious",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1480,
  "code": "FLKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的福克兰群岛数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得福克兰群岛2018年数据保护条例及数据保护专员所需授权的情况下，将福克兰群岛居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1481,
  "code": "PYFPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "法属波利尼西亚在未获得书面同意的情况下处理敏感数据",
  "description": "根据适用于法属波利尼西亚的法国数据保护法，该网站在未获得事先书面明确同意的情况下，收集法属波利尼西亚主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1482,
  "code": "PYFPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "法属波利尼西亚在控制者未向国家监察委员会 (CNIL)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家监察委员会 (CNIL)注册的情况下，收集法属波利尼西亚居民的个人信息，违反了适用于法属波利尼西亚的法国数据保护法。",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1483,
  "code": "PYFPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "法属波利尼西亚数据安全及加密措施不妥当",
  "description": "该数据库收集并处理法属波利尼西亚居民的个人文件，但未采用适用于法属波利尼西亚的法国数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1484,
  "code": "PYFPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "法属波利尼西亚不合规的数据保留周期",
  "description": "该网站保留法属波利尼西亚用户的个人记录时间超出指定处理目的所需时间，且缺少符合适用于法属波利尼西亚的法国数据保护法的删除协议。",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1485,
  "code": "PYFPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的法属波利尼西亚数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得适用于法属波利尼西亚的法国数据保护法及国家监察委员会 (CNIL)所需授权的情况下，将法属波利尼西亚居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1486,
  "code": "NCLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "新 Caledonia在未获得书面同意的情况下处理敏感数据",
  "description": "根据适用于新喀里多尼亚的法国数据保护法，该网站在未获得事先书面明确同意的情况下，收集新 Caledonia主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1487,
  "code": "NCLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "新 Caledonia在控制者未向国家监察委员会 (CNIL)注册的情况下处理个人数据",
  "description": "该网站控制者在未向国家监察委员会 (CNIL)注册的情况下，收集新 Caledonia居民的个人信息，违反了适用于新喀里多尼亚的法国数据保护法。",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1488,
  "code": "NCLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "新 Caledonia数据安全及加密措施不妥当",
  "description": "该数据库收集并处理新 Caledonia居民的个人文件，但未采用适用于新喀里多尼亚的法国数据保护法所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1489,
  "code": "NCLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "新 Caledonia不合规的数据保留周期",
  "description": "该网站保留新 Caledonia用户的个人记录时间超出指定处理目的所需时间，且缺少符合适用于新喀里多尼亚的法国数据保护法的删除协议。",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1490,
  "code": "NCLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的新 Caledonia数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得适用于新喀里多尼亚的法国数据保护法及国家监察委员会 (CNIL)所需授权的情况下，将新 Caledonia居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1491,
  "code": "MSRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "蒙特塞拉特在未获得书面同意的情况下处理敏感数据",
  "description": "根据蒙特塞拉特数据保护法草案 / 网络安全规则，该网站在未获得事先书面明确同意的情况下，收集蒙特塞拉特主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1492,
  "code": "MSRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "蒙特塞拉特在控制者未向数据保护专员注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护专员注册的情况下，收集蒙特塞拉特居民的个人信息，违反了蒙特塞拉特数据保护法草案 / 网络安全规则。",
  "severity": "serious",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1493,
  "code": "MSRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "蒙特塞拉特数据安全及加密措施不妥当",
  "description": "该数据库收集并处理蒙特塞拉特居民的个人文件，但未采用蒙特塞拉特数据保护法草案 / 网络安全规则所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1494,
  "code": "MSRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "蒙特塞拉特不合规的数据保留周期",
  "description": "该网站保留蒙特塞拉特用户的个人记录时间超出指定处理目的所需时间，且缺少符合蒙特塞拉特数据保护法草案 / 网络安全规则的删除协议。",
  "severity": "serious",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1495,
  "code": "MSRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的蒙特塞拉特数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得蒙特塞拉特数据保护法草案 / 网络安全规则及数据保护专员所需授权的情况下，将蒙特塞拉特居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1496,
  "code": "SHNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "圣赫勒拿在未获得书面同意的情况下处理敏感数据",
  "description": "根据圣赫勒拿数据保护条例 / 隐私规则草案，该网站在未获得事先书面明确同意的情况下，收集圣赫勒拿主体的敏感个人记录（健康、财务状况）。",
  "severity": "critical",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1497,
  "code": "SHNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "圣赫勒拿在控制者未向数据保护专员注册的情况下处理个人数据",
  "description": "该网站控制者在未向数据保护专员注册的情况下，收集圣赫勒拿居民的个人信息，违反了圣赫勒拿数据保护条例 / 隐私规则草案。",
  "severity": "serious",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1498,
  "code": "SHNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "圣赫勒拿数据安全及加密措施不妥当",
  "description": "该数据库收集并处理圣赫勒拿居民的个人文件，但未采用圣赫勒拿数据保护条例 / 隐私规则草案所规定的强制性技术加密或行政安全控制。",
  "severity": "moderate",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1499,
  "code": "SHNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "圣赫勒拿不合规的数据保留周期",
  "description": "该网站保留圣赫勒拿用户的个人记录时间超出指定处理目的所需时间，且缺少符合圣赫勒拿数据保护条例 / 隐私规则草案的删除协议。",
  "severity": "serious",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1500,
  "code": "SHNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "不合规的圣赫勒拿数据跨国传输",
  "description": "控制者在未确保同等保护水平或获得圣赫勒拿数据保护条例 / 隐私规则草案及数据保护专员所需授权的情况下，将圣赫勒拿居民的数据传输到境外。",
  "severity": "moderate",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
  {
    "id": 1501,
    "code": "OWASP-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "用户输入中的 SQL 注入漏洞",
    "description": "网站输入字段或 URL 参数易受 SQL 注入攻击，允许未经授权访问数据库。",
    "severity": "critical",
    "reference": "OWASP Top 10 A03:2021-Injection"
  },
  {
    "id": 1502,
    "code": "OWASP-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "跨站脚本 (XSS) 漏洞",
    "description": "用户输入未经验证即在页面上呈现，允许攻击者在访问者浏览器中执行恶意脚本。",
    "severity": "critical",
    "reference": "OWASP Top 10 A03:2021-XSS"
  },
  {
    "id": 1503,
    "code": "OWASP-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "身份验证损坏和会话泄露",
    "description": "网站在 URL 中暴露会话标识符或使用过短/过长的会话超时设定，导致会话劫持风险。",
    "severity": "critical",
    "reference": "OWASP Top 10 A07:2021-Identification & Auth"
  },
  {
    "id": 1504,
    "code": "OWASP-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "敏感数据的未加密传输",
    "description": "敏感客户信息（密码、支付文件）通过 HTTP 传输或使用过时的 TLS 1.0/1.1 协议。",
    "severity": "critical",
    "reference": "OWASP Top 10 A02:2021-Cryptographic Failures"
  },
  {
    "id": 1505,
    "code": "OWASP-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "失效的对象级访问控制",
    "description": "API 或后端端点未能验证已身份验证的用户是否有权访问所请求的资源 ID。",
    "severity": "critical",
    "reference": "OWASP Top 10 A01:2021-Broken Access Control"
  },
  {
    "id": 1506,
    "code": "OWASP-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "生产环境中处于激活状态的调试模式",
    "description": "详细的错误日志和堆栈跟踪对公众访问者可见，导致系统路径和环境变量泄露。",
    "severity": "serious",
    "reference": "OWASP Top 10 A05:2021-Security Misconfig"
  },
  {
    "id": 1507,
    "code": "OWASP-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "XML 外部实体 (XXE) 注入漏洞",
    "description": "XML 解析器接受外部实体，使攻击者能够读取本地服务器文件或执行 SSRF 攻击。",
    "severity": "serious",
    "reference": "OWASP Top 10 A05:2021-XXE"
  },
  {
    "id": 1508,
    "code": "OWASP-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "不安全的反序列化不受信任输入",
    "description": "应用程序在未经验证的情况下反序列化用户控制的对象，这可能导致远程代码执行 (RCE)。",
    "severity": "serious",
    "reference": "OWASP Top 10 A08:2021-Software Integrity"
  },
  {
    "id": 1509,
    "code": "OWASP-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "具有已知漏洞的过时库",
    "description": "前端运行过时的第三方 NPM 包、WordPress 插件或具有公开 CVE 披露的 JQuery 库。",
    "severity": "serious",
    "reference": "OWASP Top 10 A06:2021-Vulnerable Components"
  },
  {
    "id": 1510,
    "code": "OWASP-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "安全日志记录和审计不足",
    "description": "关键操作（例如密码重置、管理登录和账单更改）未被记录，阻碍了安全鉴证。",
    "severity": "moderate",
    "reference": "OWASP Top 10 A09:2021-Logging & Monitoring"
  },
  {
    "id": 1511,
    "code": "NISTP-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "不充分的访问控制策略",
    "description": "缺乏基于角色的访问控制 (RBAC) 允许标准用户帐户查看系统管理日志。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 AC-2"
  },
  {
    "id": 1512,
    "code": "NISTP-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "缺失审计记录生成机制",
    "description": "Web 应用程序未将 API 配置更改或用户创建事件记录到不可变的审计存储库中。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 AU-2"
  },
  {
    "id": 1513,
    "code": "NISTP-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "配置管理失效",
    "description": "服务器软件部署没有基线配置，导致安全级别不一致。",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 CM-2"
  },
  {
    "id": 1514,
    "code": "NISTP-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "管理员缺少多因素身份验证",
    "description": "管理员登录使用单因素身份验证，违反了联邦安全标识标准。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 IA-2"
  },
  {
    "id": 1515,
    "code": "NISTP-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "事件响应计划集成不充分",
    "description": "网站缺乏自动异常警报，无法在发生攻击时触发事件响应团队程序。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 IR-4"
  },
  {
    "id": 1516,
    "code": "NISTP-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "系统维护跟踪不力",
    "description": "漏洞扫描日程未正式化，导致识别关键 CVE 时出现延误。",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 MA-2"
  },
  {
    "id": 1517,
    "code": "NISTP-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "媒体保护和备份加密缺失",
    "description": "包含客户个人信息的系统备份存储在公共云存储桶中且未加密。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 MP-4"
  },
  {
    "id": 1518,
    "code": "NISTP-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "缺少机房访问日志（自建托管服务器）",
    "description": "对于自建服务器部署，网站控制器缺少跟踪物理访问存储驱动器的日志。",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 PE-2"
  },
  {
    "id": 1519,
    "code": "NISTP-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "安全培训记录不全",
    "description": "管理用户凭据的系统管理员缺乏经过验证的网络安全意识培训文档。",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 PS-8"
  },
  {
    "id": 1520,
    "code": "NISTP-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "缺失网络边界和 DNSSEC 控制",
    "description": "域名缺少 DNSSEC 签名，导致用户面临 DNS 欺骗和中间人重定向风险。",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 SC-7"
  },
  {
    "id": 1521,
    "code": "ISO27-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "信息安全策略不足",
    "description": "公司运行缺乏正式的信息安全章程，且未由管理层进行年度审查。",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.1"
  },
  {
    "id": 1522,
    "code": "ISO27-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "安全角色和权限定义不清",
    "description": "未任命专职人员负责监督网络运营中的数据安全合规性。",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.2"
  },
  {
    "id": 1523,
    "code": "ISO27-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "客户数据资产清单不全",
    "description": "数据库运行没有资产清单，未分类标明个人身份信息 (PIPI) 和信用信息在各模式下的存储位置。",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.9"
  },
  {
    "id": 1524,
    "code": "ISO27-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "用户密码密码学保护薄弱",
    "description": "用户密码使用过时的 MD5 或 SHA1 算法进行安全哈希处理，且未配置盐值。",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.24"
  },
  {
    "id": 1525,
    "code": "ISO27-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Web 服务器物理安全不足",
    "description": "容纳数据库驱动器的物理服务器机箱缺少防拆检测控制或安全锁轨。",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.7.1"
  },
  {
    "id": 1526,
    "code": "ISO27-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "运维安全不足及未经验证的备份",
    "description": "备份恢复周期未定期测试，导致在恢复过程中存在数据丢失风险。",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.13"
  },
  {
    "id": 1527,
    "code": "ISO27-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "不安全的网络架构和薄弱的路由控制",
    "description": "数据库节点可从公共 IP 空间直接访问，缺少中间应用路由代理限制。",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.20"
  },
  {
    "id": 1528,
    "code": "ISO27-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "软件开发中缺乏安全编码标准",
    "description": "网站开发团队运行缺少涵盖 SQL 注入和 XSS 防御的安全编码策略。",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.25"
  },
  {
    "id": 1529,
    "code": "ISO27-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "供应商协议中缺乏安全要求",
    "description": "与第三方支付网关和分析型 SaaS 提供商签订的合同中缺少明确的安全条款。",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.19"
  },
  {
    "id": 1530,
    "code": "ISO27-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "缺乏事件管理和升级路径",
    "description": "不存在将活动系统入侵从 IT 运维人员向高级管理层升级报告的程序。",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.5.24"
  },
  {
    "id": 1531,
    "code": "SOC2P-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "系统安全异常监控不足",
    "description": "服务器日志显示缺少自动入侵检测系统 (IDS) 针对暴力破解尝试发出警报的证据。",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.8"
  },
  {
    "id": 1532,
    "code": "SOC2P-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "弱访问凭据和多因素身份验证缺失",
    "description": "访问控制允许在管理员端点上使用简单密码，而没有强制执行二次密钥检查。",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.3"
  },
  {
    "id": 1533,
    "code": "SOC2P-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "数据传输保护不足",
    "description": "网站 API 路由使用过时的 HTTP 协议，且缺少 HSTS 标头来强制执行加密。",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.7"
  },
  {
    "id": 1534,
    "code": "SOC2P-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "薄弱的数据分类策略",
    "description": "内部记录缺少标记，无法识别哪些网站表单存储了机密客户凭据。",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC6.1"
  },
  {
    "id": 1535,
    "code": "SOC2P-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "缺少漏洞管理基础设施",
    "description": "代码库运行没有集成工具来在 CI/CD 步骤中识别易受攻击的 Node 依赖项。",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC7.1"
  },
  {
    "id": 1536,
    "code": "SOC2P-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "系统可用性和故障转移测试缺失",
    "description": "托管环境缺少自动化故障转移测试，导致数据库实例存在单点故障风险。",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC8.1"
  },
  {
    "id": 1537,
    "code": "SOC2P-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "交易处理完整性薄弱",
    "description": "支付端点未能使用交易验证令牌，允许在结账过程中篡改参数。",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC9.1"
  },
  {
    "id": 1538,
    "code": "SOC2P-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "数据存储的机密性保护不力",
    "description": "个人标识文件与公共资产一同存储，缺少访问授权检查。",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.6"
  },
  {
    "id": 1539,
    "code": "SOC2P-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "数据生命周期管理薄弱",
    "description": "系统无限期保留个人资料，缺少自动删除过时条目的程序。",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC6.5"
  },
  {
    "id": 1540,
    "code": "SOC2P-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "缺少变更控制和同行评审机制",
    "description": "代码提交直接部署到生产系统，缺少强制性的拉取请求审批。",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC8.1-Change"
  },
  {
    "id": 1541,
    "code": "CISA-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "启用了默认管理密码",
    "description": "数据库或 CMS 设置端点使用通用管理员密码，导致系统面临自动机器人接管风险。",
    "severity": "critical",
    "reference": "CISA Cybersecurity Performance Goal 1.1"
  },
  {
    "id": 1542,
    "code": "CISA-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "管理控制台缺少多因素身份验证",
    "description": "对托管面板、数据库节点或 API 控制台的管理员访问权限缺少 MFA 要求。",
    "severity": "critical",
    "reference": "CISA Cybersecurity Performance Goal 1.2"
  },
  {
    "id": 1543,
    "code": "CISA-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Web 软件中存在已知被利用的漏洞",
    "description": "生产服务器运行 CISA 已知被利用漏洞 (KEV) 目录中列出的依赖项。",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.1"
  },
  {
    "id": 1544,
    "code": "CISA-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "面向互联网的资产清单失效",
    "description": "组织未盘点公共域名，导致孤立的子域名面临被劫持风险。",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.2"
  },
  {
    "id": 1545,
    "code": "CISA-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺失 DNS 完整性保护控制",
    "description": "域名注册缺少注册局锁定，导致解析记录易遭受未经授权的篡改。",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 2.3"
  },
  {
    "id": 1546,
    "code": "CISA-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "不安全的电子邮件身份验证标准（无 DMARC）",
    "description": "域名缺少 DMARC 配置，允许攻击者冒充该网站域名发送钓鱼电子邮件。",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.4"
  },
  {
    "id": 1547,
    "code": "CISA-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "缺乏安全事件演练",
    "description": "未进行桌面测试以验证在勒索软件或数据泄露事件发生时的响应程序。",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 3.1"
  },
  {
    "id": 1548,
    "code": "CISA-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "启用了不安全的远程访问协议",
    "description": "托管环境暴露了用于远程设备管理的 Telnet 或未加密的 HTTP 接口。",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 1.3"
  },
  {
    "id": 1549,
    "code": "CISA-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "数据备份隔离不足",
    "description": "数据库备份存储在相同的网络服务器子网中，在遭受网络攻击时存在同时丢失的风险。",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 4.1"
  },
  {
    "id": 1550,
    "code": "CISA-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "内部漏洞扫描失效",
    "description": "网站服务器未对面向公众的端点进行每周漏洞扫描。",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 2.5"
  },
  {
    "id": 1551,
    "code": "EUDSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少向监管机构提供直接联系方式",
    "description": "网站缺少指定的电子联系地址，导致欧盟监管机构无法直接沟通。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 11"
  },
  {
    "id": 1552,
    "code": "EUDSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "条款中缺少内容审核规则说明",
    "description": "服务条款未能公开用于审核评论的算法过滤或人工审查政策。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 14"
  },
  {
    "id": 1553,
    "code": "EUDSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "推荐系统参数缺乏透明度",
    "description": "该网站在展示推荐或产品订购源时，未解释主要排序因素。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 27"
  },
  {
    "id": 1554,
    "code": "EUDSA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "违规界面操纵（暗黑模式）",
    "description": "欺骗性的设计元素通过预选选项或隐藏关闭按钮，诱导用户订阅新闻通讯。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 25"
  },
  {
    "id": 1555,
    "code": "EUDSA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未标明在线广告及赞助商",
    "description": "付费推广链接或赞助商品在内容流中加载，但未明确标注标识购买广告的广告主。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 26"
  },
  {
    "id": 1556,
    "code": "EUDSA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少供用户使用的通知与行动机制",
    "description": "门户网站未向访问者提供清晰、易用的电子表单来举报非法评论或商品。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 16"
  },
  {
    "id": 1557,
    "code": "EUDSA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "违规的用户停用规则",
    "description": "网站在不提供详细书面说明的情况下封禁帐户或下架卖家商品。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 20"
  },
  {
    "id": 1558,
    "code": "EUDSA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "公共目录中缺少原因声明",
    "description": "网站托管商审核第三方评论，但未将决定发布在欧盟 DSA 数据库中。",
    "severity": "moderate",
    "reference": "EU Digital Services Act (DSA) Article 17"
  },
  {
    "id": 1559,
    "code": "EUDSA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "投诉处理系统不完善",
    "description": "网站未提供电子申诉机制，允许用户在 6 个月内对审核裁决提出异议。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 20-Appeal"
  },
  {
    "id": 1560,
    "code": "EUDSA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "具有误导性的广告定位政策",
    "description": "该网站利用敏感的个人信息（宗教、健康、性取向）来定位推广横幅。",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 26-Target"
  },
  {
    "id": 1561,
    "code": "EUDMA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "产品列表中的不公平自我优待",
    "description": "商店搜索引擎将自有品牌商品置于同等第三方卖家库存之上。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(5)"
  },
  {
    "id": 1562,
    "code": "EUDMA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "非法的多源数据组合",
    "description": "门户网站将核心服务的用户数据与第三方追踪像素相结合，而未经用户明确选择同意。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 5(2)"
  },
  {
    "id": 1563,
    "code": "EUDMA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "限制第三方软件侧载",
    "description": "Web 门户限制用户在页面框架内运行外部支付集成或浏览器。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(3)"
  },
  {
    "id": 1564,
    "code": "EUDMA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "限制商业用户的数据可移植性",
    "description": "网站结算后台阻止卖家将交易历史记录导出到外部服务器。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(9)"
  },
  {
    "id": 1565,
    "code": "EUDMA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "不公平的广告效果报告",
    "description": "系统向广告主收取推广空间费用，却不共享每日免费的效果指标。",
    "severity": "moderate",
    "reference": "EU Digital Markets Act (DMA) Article 5(9)"
  },
  {
    "id": 1566,
    "code": "EUDMA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "限制跨平台价格平价（反引导）",
    "description": "服务条款处罚那些在自有直接渠道或其他网站上提供更低价格的商户。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 5(3)"
  },
  {
    "id": 1567,
    "code": "EUDMA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "具欺骗性的选择屏幕实现",
    "description": "系统在设置期间配置默认搜索引擎或浏览器，而未展示无偏向的选择项。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(3)-Choice"
  },
  {
    "id": 1568,
    "code": "EUDMA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "限制平台服务互操作性",
    "description": "API 限制第三方通信工具与核心消息传递系统建立连接。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(7)"
  },
  {
    "id": 1569,
    "code": "EUDMA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "具欺骗性且复杂的退订流程",
    "description": "门户网站强迫商业用户通过电话确认等繁琐流程来终止核心服务的使用权限。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(13)"
  },
  {
    "id": 1570,
    "code": "EUDMA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "非法利用商业用户的销售数据",
    "description": "网站托管商使用卖家的非公开结账交易数据来推出竞争性的自营产品。",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(2)"
  },
  {
    "id": 1571,
    "code": "UKAAC-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "针对敏感内容未进行充分的年龄验证",
    "description": "该门户在成人媒体流上仅使用简单的、未经验证的自我声明按钮进行年龄验证。",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 3"
  },
  {
    "id": 1572,
    "code": "UKAAC-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "默认对未成年人激活高风险追踪",
    "description": "在进行年龄验证之前，注册时默认启用了地理位置和行为追踪。",
    "severity": "critical",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 6"
  },
  {
    "id": 1573,
    "code": "UKAAC-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "针对年轻受众的隐私披露过于复杂",
    "description": "隐私政策使用复杂的法律术语，而不是简短易懂的儿童友好型说明。",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 4"
  },
  {
    "id": 1574,
    "code": "UKAAC-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "针对未成年人的欺骗性引导 UI 技术",
    "description": "界面元素利用彩色的警报和奖励循环，诱导儿童选择较低的隐私设置。",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 9"
  },
  {
    "id": 1575,
    "code": "UKAAC-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "非法的未成年人自动画像",
    "description": "推荐源默认对儿童用户的习惯进行画像分析，以推送易成瘾的内容流。",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 11"
  },
  {
    "id": 1576,
    "code": "UKAAC-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "缺少家长追踪通知提示",
    "description": "当家长追踪活动会话时，应用程序未向儿童用户展示显着的的状态图标进行提示。",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 13"
  },
  {
    "id": 1577,
    "code": "UKAAC-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "非法的儿童数据与广告商共享",
    "description": "门户网站在未经主动选择同意的情况下，与外部广告经纪商共享已验证未成年人的追踪 Cookie。",
    "severity": "critical",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 12"
  },
  {
    "id": 1578,
    "code": "UKAAC-008",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "针对18岁以下人群的数据最小化实施不足",
    "description": "注册表单向被归类为未成年人的用户请求收集非必需的数据项（爱好、学校）。",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 8"
  },
  {
    "id": 1579,
    "code": "UKAAC-009",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "针对儿童的有害营销定位做法",
    "description": "数据库伺机推送利用未成年人行为弱点或不安全感的定向营销横幅。",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 5"
  },
  {
    "id": 1580,
    "code": "UKAAC-010",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "默认未成年人档案设置不安全",
    "description": "未成年人的搜索配置文件默认公开可见，允许未经身份验证的互联网用户查看儿童的详细信息。",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 7"
  },
  {
    "id": 1581,
    "code": "CAAAC-001",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺少针对未成年人访问服务的 DPIA 评估",
    "description": "控制器在部署以儿童为中心的功能之前，未能记录数据保护影响评估 (DPIA)。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(1)"
  },
  {
    "id": 1582,
    "code": "CAAAC-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "具欺骗性的年龄确认实现",
    "description": "该网站未能以合理的商业确定性评估用户年龄，导致未成年人暴露于成人聊天室。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(5)"
  },
  {
    "id": 1583,
    "code": "CAAAC-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "默认的高隐私设置被禁用",
    "description": "对于 18 岁以下的访问者，该网站在结算注册时默认将隐私设置配置为低隐私级别。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(6)"
  },
  {
    "id": 1584,
    "code": "CAAAC-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "非法的未成年人自动行为画像",
    "description": "网站分析未成年人的搜索查询以构建持久的广告画像，而未获得家长的同意。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(2)"
  },
  {
    "id": 1585,
    "code": "CAAAC-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "非法的已验证未成年人数据销售",
    "description": "平台在未获得必需的选择性同意授权的情况下，出售或共享 18 岁以下用户的数据。",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(1)"
  },
  {
    "id": 1586,
    "code": "CAAAC-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺少针对未成年人的活动追踪指示器",
    "description": "移动 Web 应用程序记录儿童位置点，但未显示持续的视觉追踪符号。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(7)"
  },
  {
    "id": 1587,
    "code": "CAAAC-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "诱导绕过隐私设置的欺骗性引导模式",
    "description": "界面流程利用游戏化技术，诱使未成年人禁用默认的数据库安全保护。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(7)"
  },
  {
    "id": 1588,
    "code": "CAAAC-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "复杂的服务条款说明",
    "description": "详细说明数据使用情况的条款超出了中学生的阅读理解水平，违反了未成年人友好标准。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(8)"
  },
  {
    "id": 1589,
    "code": "CAAAC-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "非法收集未成年人地理位置历史记录",
    "description": "在没有即时应用交付原因的情况下，服务器记录了 18 岁以下访问者的精确设备坐标。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(8)"
  },
  {
    "id": 1590,
    "code": "CAAAC-010",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "缺少删除及资料清除控制功能",
    "description": "用户个人中心未能提供即时删除按钮，供未成年人用户清除其个人资料档案。",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(9)"
  },
  {
    "id": 1591,
    "code": "EUAIA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未向用户披露其正在与人工智能交互",
    "description": "在线客服机器人运行在联系页面上，但未明确告知访问者他们正在与人工智能系统进行交流。",
    "severity": "serious",
    "reference": "EU AI Act Article 52(1)"
  },
  {
    "id": 1592,
    "code": "EUAIA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "生成式 AI 内容缺少标识说明",
    "description": "合成图像或 AI 生成的新闻条目缺少机器可读的标签来标识其人工生成的来源。",
    "severity": "serious",
    "reference": "EU AI Act Article 52(3)"
  },
  {
    "id": 1593,
    "code": "EUAIA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "违规部署情绪识别系统",
    "description": "网站在在线求职测试期间，使用 AI 追踪摄像头输入来分析求职者的情绪。",
    "severity": "critical",
    "reference": "EU AI Act Article 5(1)(f)"
  },
  {
    "id": 1594,
    "code": "EUAIA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "非法的生物特征识别分类应用",
    "description": "人工智能分析系统根据生物特征图谱对访问者进行分类，以实现针对特定性别的产品目录定向展示。",
    "severity": "critical",
    "reference": "EU AI Act Article 5(1)(g)"
  },
  {
    "id": 1595,
    "code": "EUAIA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "具欺骗性的深度伪造 (Deepfake) 图像和视频未进行披露",
    "description": "逼真的经过修改的视频或音频文件在媒体流中加载，但未提供明确的“已修改内容”警告。",
    "severity": "serious",
    "reference": "EU AI Act Article 52(3)-Deepfake"
  },
  {
    "id": 1596,
    "code": "EUAIA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "高风险人工智能系统风险管理不足",
    "description": "在线门户网站部署了自动化的简历筛选排名软件，但未进行部署前的测试和风险评估记录。",
    "severity": "serious",
    "reference": "EU AI Act Article 9"
  },
  {
    "id": 1597,
    "code": "EUAIA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "高风险人工智能系统缺少日志记录功能",
    "description": "结账环节运行自动定价模型，但未记录追踪原始遥测输入参数的数据。",
    "severity": "serious",
    "reference": "EU AI Act Article 12"
  },
  {
    "id": 1598,
    "code": "EUAIA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "自动化招聘中缺乏人工监管",
    "description": "AI 招聘筛选结果会自动拒绝候选人，缺少人工复核或申诉渠道。",
    "severity": "serious",
    "reference": "EU AI Act Article 14"
  },
  {
    "id": 1599,
    "code": "EUAIA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "非法的网页数据爬取用于人工智能训练",
    "description": "网络爬虫从网站存储中抓取受版权保护的图像来训练 AI 模型，但未遵守拒绝抓取标记（如 robots.txt 规则）。",
    "severity": "serious",
    "reference": "EU AI Act Article 53(1)(c)"
  },
  {
    "id": 1600,
    "code": "EUAIA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "高风险人工智能数据库集成不安全",
    "description": "服务器上运行自动信用资格评估模型，但未在公共欧盟 AI 数据库中进行登记注册。",
    "severity": "serious",
    "reference": "EU AI Act Article 60"
  },
  {
    "id": 1601,
    "code": "TXDPS-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据德克萨斯州数据隐私和安全法 (TDPSA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1602,
    "code": "TXDPS-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据德克萨斯州数据隐私和安全法 (TDPSA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1603,
    "code": "TXDPS-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据德克萨斯州数据隐私和安全法 (TDPSA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1604,
    "code": "TXDPS-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据德克萨斯州数据隐私和安全法 (TDPSA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1605,
    "code": "TXDPS-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据德克萨斯州数据隐私和安全法 (TDPSA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1606,
    "code": "TXDPS-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据德克萨斯州数据隐私和安全法 (TDPSA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1607,
    "code": "TXDPS-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据德克萨斯州数据隐私和安全法 (TDPSA)提供退出选项。",
    "severity": "moderate",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1608,
    "code": "TXDPS-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意处理敏感个人数据违反德克萨斯州数据隐私和安全法 (TDPSA)",
    "description": "根据德克萨斯州数据隐私和安全法 (TDPSA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1609,
    "code": "TXDPS-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)进行数据保护影响评估",
    "description": "该组织未能针对德克萨斯州数据隐私和安全法 (TDPSA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1610,
    "code": "TXDPS-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德克萨斯州数据隐私和安全法 (TDPSA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据德克萨斯州数据隐私和安全法 (TDPSA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1611,
    "code": "VCDPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据弗吉尼亚州消费者数据保护法 (VCDPA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1612,
    "code": "VCDPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据弗吉尼亚州消费者数据保护法 (VCDPA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1613,
    "code": "VCDPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据弗吉尼亚州消费者数据保护法 (VCDPA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1614,
    "code": "VCDPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据弗吉尼亚州消费者数据保护法 (VCDPA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1615,
    "code": "VCDPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1616,
    "code": "VCDPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1617,
    "code": "VCDPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供退出选项。",
    "severity": "moderate",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1618,
    "code": "VCDPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意处理敏感个人数据违反弗吉尼亚州消费者数据保护法 (VCDPA)",
    "description": "根据弗吉尼亚州消费者数据保护法 (VCDPA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1619,
    "code": "VCDPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)进行数据保护影响评估",
    "description": "该组织未能针对弗吉尼亚州消费者数据保护法 (VCDPA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1620,
    "code": "VCDPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据弗吉尼亚州消费者数据保护法 (VCDPA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据弗吉尼亚州消费者数据保护法 (VCDPA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1621,
    "code": "COPR-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据科罗拉多州隐私法 (CPA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1622,
    "code": "COPR-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据科罗拉多州隐私法 (CPA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1623,
    "code": "COPR-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据科罗拉多州隐私法 (CPA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1624,
    "code": "COPR-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据科罗拉多州隐私法 (CPA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1625,
    "code": "COPR-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据科罗拉多州隐私法 (CPA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1626,
    "code": "COPR-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据科罗拉多州隐私法 (CPA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1627,
    "code": "COPR-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据科罗拉多州隐私法 (CPA)提供退出选项。",
    "severity": "moderate",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1628,
    "code": "COPR-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意处理敏感个人数据违反科罗拉多州隐私法 (CPA)",
    "description": "根据科罗拉多州隐私法 (CPA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1629,
    "code": "COPR-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)进行数据保护影响评估",
    "description": "该组织未能针对科罗拉多州隐私法 (CPA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1630,
    "code": "COPR-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据科罗拉多州隐私法 (CPA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据科罗拉多州隐私法 (CPA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1631,
    "code": "CTDPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据康涅狄格州数据隐私法 (CTDPA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1632,
    "code": "CTDPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据康涅狄格州数据隐私法 (CTDPA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1633,
    "code": "CTDPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据康涅狄格州数据隐私法 (CTDPA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1634,
    "code": "CTDPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据康涅狄格州数据隐私法 (CTDPA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1635,
    "code": "CTDPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据康涅狄格州数据隐私法 (CTDPA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1636,
    "code": "CTDPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据康涅狄格州数据隐私法 (CTDPA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1637,
    "code": "CTDPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据康涅狄格州数据隐私法 (CTDPA)提供退出选项。",
    "severity": "moderate",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1638,
    "code": "CTDPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意处理敏感个人数据违反康涅狄格州数据隐私法 (CTDPA)",
    "description": "根据康涅狄格州数据隐私法 (CTDPA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1639,
    "code": "CTDPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)进行数据保护影响评估",
    "description": "该组织未能针对康涅狄格州数据隐私法 (CTDPA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1640,
    "code": "CTDPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据康涅狄格州数据隐私法 (CTDPA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据康涅狄格州数据隐私法 (CTDPA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1641,
    "code": "UCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据犹他州消费者隐私法 (UCPA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1642,
    "code": "UCPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据犹他州消费者隐私法 (UCPA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1643,
    "code": "UCPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据犹他州消费者隐私法 (UCPA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1644,
    "code": "UCPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据犹他州消费者隐私法 (UCPA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1645,
    "code": "UCPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据犹他州消费者隐私法 (UCPA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1646,
    "code": "UCPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据犹他州消费者隐私法 (UCPA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1647,
    "code": "UCPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据犹他州消费者隐私法 (UCPA)提供退出选项。",
    "severity": "moderate",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1648,
    "code": "UCPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意处理敏感个人数据违反犹他州消费者隐私法 (UCPA)",
    "description": "根据犹他州消费者隐私法 (UCPA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1649,
    "code": "UCPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)进行数据保护影响评估",
    "description": "该组织未能针对犹他州消费者隐私法 (UCPA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1650,
    "code": "UCPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据犹他州消费者隐私法 (UCPA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据犹他州消费者隐私法 (UCPA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1651,
    "code": "ORCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据俄勒冈州消费者隐私法 (OCPA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1652,
    "code": "ORCPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据俄勒冈州消费者隐私法 (OCPA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1653,
    "code": "ORCPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据俄勒冈州消费者隐私法 (OCPA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1654,
    "code": "ORCPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据俄勒冈州消费者隐私法 (OCPA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1655,
    "code": "ORCPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据俄勒冈州消费者隐私法 (OCPA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1656,
    "code": "ORCPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据俄勒冈州消费者隐私法 (OCPA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1657,
    "code": "ORCPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据俄勒冈州消费者隐私法 (OCPA)提供退出选项。",
    "severity": "moderate",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1658,
    "code": "ORCPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意处理敏感个人数据违反俄勒冈州消费者隐私法 (OCPA)",
    "description": "根据俄勒冈州消费者隐私法 (OCPA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1659,
    "code": "ORCPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)进行数据保护影响评估",
    "description": "该组织未能针对俄勒冈州消费者隐私法 (OCPA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1660,
    "code": "ORCPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据俄勒冈州消费者隐私法 (OCPA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据俄勒冈州消费者隐私法 (OCPA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1661,
    "code": "FLORDB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据佛罗里达州数字权利法案 (FDBR)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1662,
    "code": "FLORDB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据佛罗里达州数字权利法案 (FDBR)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1663,
    "code": "FLORDB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据佛罗里达州数字权利法案 (FDBR)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1664,
    "code": "FLORDB-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据佛罗里达州数字权利法案 (FDBR)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1665,
    "code": "FLORDB-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据佛罗里达州数字权利法案 (FDBR)提供退出链接选项。",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1666,
    "code": "FLORDB-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据佛罗里达州数字权利法案 (FDBR)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1667,
    "code": "FLORDB-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据佛罗里达州数字权利法案 (FDBR)提供退出选项。",
    "severity": "moderate",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1668,
    "code": "FLORDB-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意处理敏感个人数据违反佛罗里达州数字权利法案 (FDBR)",
    "description": "根据佛罗里达州数字权利法案 (FDBR)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1669,
    "code": "FLORDB-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)进行数据保护影响评估",
    "description": "该组织未能针对佛罗里达州数字权利法案 (FDBR)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1670,
    "code": "FLORDB-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据佛罗里达州数字权利法案 (FDBR)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据佛罗里达州数字权利法案 (FDBR)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1671,
    "code": "PIPEDA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据加拿大个人信息保护和电子文件法 (PIPEDA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1672,
    "code": "PIPEDA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据加拿大个人信息保护和电子文件法 (PIPEDA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1673,
    "code": "PIPEDA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据加拿大个人信息保护和电子文件法 (PIPEDA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1674,
    "code": "PIPEDA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据加拿大个人信息保护和电子文件法 (PIPEDA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1675,
    "code": "PIPEDA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1676,
    "code": "PIPEDA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1677,
    "code": "PIPEDA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供退出选项。",
    "severity": "moderate",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1678,
    "code": "PIPEDA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反加拿大个人信息保护和电子文件法 (PIPEDA)",
    "description": "根据加拿大个人信息保护和电子文件法 (PIPEDA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1679,
    "code": "PIPEDA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)进行数据保护影响评估",
    "description": "该组织未能针对加拿大个人信息保护和电子文件法 (PIPEDA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1680,
    "code": "PIPEDA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据加拿大个人信息保护和电子文件法 (PIPEDA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据加拿大个人信息保护和电子文件法 (PIPEDA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1681,
    "code": "LAW25-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据魁北克省第25号法案请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1682,
    "code": "LAW25-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据魁北克省第25号法案纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1683,
    "code": "LAW25-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据魁北克省第25号法案清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1684,
    "code": "LAW25-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据魁北克省第25号法案下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1685,
    "code": "LAW25-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据魁北克省第25号法案提供退出链接选项。",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1686,
    "code": "LAW25-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据魁北克省第25号法案提供显着的退出机制。",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1687,
    "code": "LAW25-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据魁北克省第25号法案提供退出选项。",
    "severity": "moderate",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1688,
    "code": "LAW25-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反魁北克省第25号法案",
    "description": "根据魁北克省第25号法案，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1689,
    "code": "LAW25-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案进行数据保护影响评估",
    "description": "该组织未能针对魁北克省第25号法案下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1690,
    "code": "LAW25-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据魁北克省第25号法案提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据魁北克省第25号法案展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1691,
    "code": "TDDDG-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据德国电信和电传媒体数据保护法 (TDDDG)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1692,
    "code": "TDDDG-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据德国电信和电传媒体数据保护法 (TDDDG)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1693,
    "code": "TDDDG-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据德国电信和电传媒体数据保护法 (TDDDG)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1694,
    "code": "TDDDG-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据德国电信和电传媒体数据保护法 (TDDDG)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1695,
    "code": "TDDDG-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据德国电信和电传媒体数据保护法 (TDDDG)提供退出链接选项。",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1696,
    "code": "TDDDG-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据德国电信和电传媒体数据保护法 (TDDDG)提供显着的退出机制。",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1697,
    "code": "TDDDG-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据德国电信和电传媒体数据保护法 (TDDDG)提供退出选项。",
    "severity": "moderate",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1698,
    "code": "TDDDG-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未经同意处理敏感个人数据违反德国电信和电传媒体数据保护法 (TDDDG)",
    "description": "根据德国电信和电传媒体数据保护法 (TDDDG)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1699,
    "code": "TDDDG-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)进行数据保护影响评估",
    "description": "该组织未能针对德国电信和电传媒体数据保护法 (TDDDG)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1700,
    "code": "TDDDG-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未根据德国电信和电传媒体数据保护法 (TDDDG)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据德国电信和电传媒体数据保护法 (TDDDG)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1701,
    "code": "SGPDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据新加坡个人数据保护法 (PDPA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1702,
    "code": "SGPDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据新加坡个人数据保护法 (PDPA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1703,
    "code": "SGPDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据新加坡个人数据保护法 (PDPA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1704,
    "code": "SGPDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据新加坡个人数据保护法 (PDPA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1705,
    "code": "SGPDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据新加坡个人数据保护法 (PDPA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1706,
    "code": "SGPDPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据新加坡个人数据保护法 (PDPA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1707,
    "code": "SGPDPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据新加坡个人数据保护法 (PDPA)提供退出选项。",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1708,
    "code": "SGPDPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反新加坡个人数据保护法 (PDPA)",
    "description": "根据新加坡个人数据保护法 (PDPA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1709,
    "code": "SGPDPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)进行数据保护影响评估",
    "description": "该组织未能针对新加坡个人数据保护法 (PDPA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1710,
    "code": "SGPDPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新加坡个人数据保护法 (PDPA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据新加坡个人数据保护法 (PDPA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1711,
    "code": "AUSAPP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据澳大利亚隐私原则 (APPs)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1712,
    "code": "AUSAPP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据澳大利亚隐私原则 (APPs)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1713,
    "code": "AUSAPP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据澳大利亚隐私原则 (APPs)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1714,
    "code": "AUSAPP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据澳大利亚隐私原则 (APPs)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1715,
    "code": "AUSAPP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据澳大利亚隐私原则 (APPs)提供退出链接选项。",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1716,
    "code": "AUSAPP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据澳大利亚隐私原则 (APPs)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1717,
    "code": "AUSAPP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据澳大利亚隐私原则 (APPs)提供退出选项。",
    "severity": "moderate",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1718,
    "code": "AUSAPP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反澳大利亚隐私原则 (APPs)",
    "description": "根据澳大利亚隐私原则 (APPs)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1719,
    "code": "AUSAPP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)进行数据保护影响评估",
    "description": "该组织未能针对澳大利亚隐私原则 (APPs)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1720,
    "code": "AUSAPP-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据澳大利亚隐私原则 (APPs)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据澳大利亚隐私原则 (APPs)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1721,
    "code": "NZPRIV-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据新西兰2020年隐私法请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1722,
    "code": "NZPRIV-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据新西兰2020年隐私法纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1723,
    "code": "NZPRIV-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据新西兰2020年隐私法清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1724,
    "code": "NZPRIV-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据新西兰2020年隐私法下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1725,
    "code": "NZPRIV-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据新西兰2020年隐私法提供退出链接选项。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1726,
    "code": "NZPRIV-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据新西兰2020年隐私法提供显着的退出机制。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1727,
    "code": "NZPRIV-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据新西兰2020年隐私法提供退出选项。",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1728,
    "code": "NZPRIV-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反新西兰2020年隐私法",
    "description": "根据新西兰2020年隐私法，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1729,
    "code": "NZPRIV-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法进行数据保护影响评估",
    "description": "该组织未能针对新西兰2020年隐私法下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1730,
    "code": "NZPRIV-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据新西兰2020年隐私法提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据新西兰2020年隐私法展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1731,
    "code": "JPAPPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据日本个人信息保护法 (APPI)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1732,
    "code": "JPAPPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据日本个人信息保护法 (APPI)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1733,
    "code": "JPAPPI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据日本个人信息保护法 (APPI)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1734,
    "code": "JPAPPI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据日本个人信息保护法 (APPI)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1735,
    "code": "JPAPPI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据日本个人信息保护法 (APPI)提供退出链接选项。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1736,
    "code": "JPAPPI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据日本个人信息保护法 (APPI)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1737,
    "code": "JPAPPI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据日本个人信息保护法 (APPI)提供退出选项。",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1738,
    "code": "JPAPPI-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反日本个人信息保护法 (APPI)",
    "description": "根据日本个人信息保护法 (APPI)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1739,
    "code": "JPAPPI-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)进行数据保护影响评估",
    "description": "该组织未能针对日本个人信息保护法 (APPI)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1740,
    "code": "JPAPPI-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据日本个人信息保护法 (APPI)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据日本个人信息保护法 (APPI)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1741,
    "code": "KRPIPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据韩国个人信息保护法 (PIPA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1742,
    "code": "KRPIPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据韩国个人信息保护法 (PIPA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1743,
    "code": "KRPIPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据韩国个人信息保护法 (PIPA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1744,
    "code": "KRPIPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据韩国个人信息保护法 (PIPA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1745,
    "code": "KRPIPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据韩国个人信息保护法 (PIPA)提供退出链接选项。",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1746,
    "code": "KRPIPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据韩国个人信息保护法 (PIPA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1747,
    "code": "KRPIPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据韩国个人信息保护法 (PIPA)提供退出选项。",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1748,
    "code": "KRPIPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反韩国个人信息保护法 (PIPA)",
    "description": "根据韩国个人信息保护法 (PIPA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1749,
    "code": "KRPIPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)进行数据保护影响评估",
    "description": "该组织未能针对韩国个人信息保护法 (PIPA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1750,
    "code": "KRPIPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据韩国个人信息保护法 (PIPA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据韩国个人信息保护法 (PIPA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1751,
    "code": "VNDPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据越南个人数据保护令第 13/2023/ND-CP 号请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1752,
    "code": "VNDPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据越南个人数据保护令第 13/2023/ND-CP 号纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1753,
    "code": "VNDPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据越南个人数据保护令第 13/2023/ND-CP 号清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1754,
    "code": "VNDPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据越南个人数据保护令第 13/2023/ND-CP 号下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1755,
    "code": "VNDPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据越南个人数据保护令第 13/2023/ND-CP 号提供退出链接选项。",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1756,
    "code": "VNDPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据越南个人数据保护令第 13/2023/ND-CP 号提供显着的退出机制。",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1757,
    "code": "VNDPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据越南个人数据保护令第 13/2023/ND-CP 号提供退出选项。",
    "severity": "moderate",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1758,
    "code": "VNDPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反越南个人数据保护令第 13/2023/ND-CP 号",
    "description": "根据越南个人数据保护令第 13/2023/ND-CP 号，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1759,
    "code": "VNDPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号进行数据保护影响评估",
    "description": "该组织未能针对越南个人数据保护令第 13/2023/ND-CP 号下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1760,
    "code": "VNDPD-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据越南个人数据保护令第 13/2023/ND-CP 号提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据越南个人数据保护令第 13/2023/ND-CP 号展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1761,
    "code": "THPDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据泰国个人数据保护法 (PDPA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1762,
    "code": "THPDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据泰国个人数据保护法 (PDPA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1763,
    "code": "THPDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据泰国个人数据保护法 (PDPA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1764,
    "code": "THPDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据泰国个人数据保护法 (PDPA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1765,
    "code": "THPDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据泰国个人数据保护法 (PDPA)提供退出链接选项。",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1766,
    "code": "THPDPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据泰国个人数据保护法 (PDPA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1767,
    "code": "THPDPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据泰国个人数据保护法 (PDPA)提供退出选项。",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1768,
    "code": "THPDPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反泰国个人数据保护法 (PDPA)",
    "description": "根据泰国个人数据保护法 (PDPA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1769,
    "code": "THPDPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)进行数据保护影响评估",
    "description": "该组织未能针对泰国个人数据保护法 (PDPA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1770,
    "code": "THPDPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据泰国个人数据保护法 (PDPA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据泰国个人数据保护法 (PDPA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1771,
    "code": "INDPDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据印度2023年数字个人数据保护法 (DPDP)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1772,
    "code": "INDPDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据印度2023年数字个人数据保护法 (DPDP)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1773,
    "code": "INDPDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据印度2023年数字个人数据保护法 (DPDP)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1774,
    "code": "INDPDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据印度2023年数字个人数据保护法 (DPDP)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1775,
    "code": "INDPDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据印度2023年数字个人数据保护法 (DPDP)提供退出链接选项。",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1776,
    "code": "INDPDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据印度2023年数字个人数据保护法 (DPDP)提供显着的退出机制。",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1777,
    "code": "INDPDP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据印度2023年数字个人数据保护法 (DPDP)提供退出选项。",
    "severity": "moderate",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1778,
    "code": "INDPDP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反印度2023年数字个人数据保护法 (DPDP)",
    "description": "根据印度2023年数字个人数据保护法 (DPDP)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1779,
    "code": "INDPDP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)进行数据保护影响评估",
    "description": "该组织未能针对印度2023年数字个人数据保护法 (DPDP)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1780,
    "code": "INDPDP-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据印度2023年数字个人数据保护法 (DPDP)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据印度2023年数字个人数据保护法 (DPDP)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1781,
    "code": "BRLGPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据巴西通用数据保护法 (LGPD)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1782,
    "code": "BRLGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据巴西通用数据保护法 (LGPD)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1783,
    "code": "BRLGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据巴西通用数据保护法 (LGPD)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1784,
    "code": "BRLGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据巴西通用数据保护法 (LGPD)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1785,
    "code": "BRLGPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据巴西通用数据保护法 (LGPD)提供退出链接选项。",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1786,
    "code": "BRLGPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据巴西通用数据保护法 (LGPD)提供显着的退出机制。",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1787,
    "code": "BRLGPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据巴西通用数据保护法 (LGPD)提供退出选项。",
    "severity": "moderate",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1788,
    "code": "BRLGPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反巴西通用数据保护法 (LGPD)",
    "description": "根据巴西通用数据保护法 (LGPD)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1789,
    "code": "BRLGPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)进行数据保护影响评估",
    "description": "该组织未能针对巴西通用数据保护法 (LGPD)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1790,
    "code": "BRLGPD-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据巴西通用数据保护法 (LGPD)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据巴西通用数据保护法 (LGPD)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1791,
    "code": "ZAPOPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)提供有效的数据访问渠道",
    "description": "该网站未提供有效的访问机制或联系邮箱，供用户根据南非个人信息保护法 (POPIA)请求访问其存储的个人数据。",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1792,
    "code": "ZAPOPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)提供数据纠错机制",
    "description": "网站未能提供表格或流程，供用户根据南非个人信息保护法 (POPIA)纠正收集到的不准确个人数据。",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1793,
    "code": "ZAPOPI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)提供数据删除入口",
    "description": "网站缺乏清晰的删除请求机制，供要求根据南非个人信息保护法 (POPIA)清除其个人资料的用户使用。",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1794,
    "code": "ZAPOPI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)提供便携的数据导出功能",
    "description": "网站未能提供便携式、结构化的格式，供用户根据南非个人信息保护法 (POPIA)下载和传输其数据记录。",
    "severity": "moderate",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1795,
    "code": "ZAPOPI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)提供退出定向广告的选项",
    "description": "该网站部署了用于行为广告的追踪像素，但未根据南非个人信息保护法 (POPIA)提供退出链接选项。",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1796,
    "code": "ZAPOPI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)提供退出个人数据销售的选项",
    "description": "该网站与营销经纪商共享用户详细信息，但未根据南非个人信息保护法 (POPIA)提供显着的退出机制。",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1797,
    "code": "ZAPOPI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)提供退出自动化画像分析的选项",
    "description": "该网站使用自动化决策模型评估客户资格，但未根据南非个人信息保护法 (POPIA)提供退出选项。",
    "severity": "moderate",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1798,
    "code": "ZAPOPI-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未经同意处理敏感个人数据违反南非个人信息保护法 (POPIA)",
    "description": "根据南非个人信息保护法 (POPIA)，该网站在未获得积极同意的情况下，收集敏感的个人记录（健康、信仰、财务）。",
    "severity": "critical",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1799,
    "code": "ZAPOPI-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)进行数据保护影响评估",
    "description": "该组织未能针对南非个人信息保护法 (POPIA)下的高风险网页画像分析进行或记录必需的风险评估。",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1800,
    "code": "ZAPOPI-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "未根据南非个人信息保护法 (POPIA)提供合规的收集时声明",
    "description": "该网站在收集个人信息时，未能根据南非个人信息保护法 (POPIA)展示合规的隐私披露声明。",
    "severity": "critical",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1801,
    "code": "TXSBB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1802,
    "code": "TXSBB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 审计与记录失效",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1803,
    "code": "TXSBB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 界面设计缺陷",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1804,
    "code": "TXSBB-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 密码学强度不足",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1805,
    "code": "TXSBB-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 漏洞扫描失效",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1806,
    "code": "TXSBB-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 同意日志记录完整性缺陷",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1807,
    "code": "TXSBB-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 退出链接可见性问题",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1808,
    "code": "TXSBB-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 隐私声明披露不足",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1809,
    "code": "TXSBB-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 审计控制验证缺失",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1810,
    "code": "TXSBB-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "未注册的数据经纪商运营 — 管理员凭据安全弱点",
    "description": "该网站在未向德克萨斯州数据经纪商注册处注册的情况下，将消费者数据出售给第三方。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1811,
    "code": "WAHMHD-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1812,
    "code": "WAHMHD-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 审计与记录失效",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 审计跟踪不充分，未能记录配置设置。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1813,
    "code": "WAHMHD-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 界面设计缺陷",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1814,
    "code": "WAHMHD-004",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 密码学强度不足",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1815,
    "code": "WAHMHD-005",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 漏洞扫描失效",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1816,
    "code": "WAHMHD-006",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 同意日志记录完整性缺陷",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1817,
    "code": "WAHMHD-007",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 退出链接可见性问题",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1818,
    "code": "WAHMHD-008",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 隐私声明披露不足",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1819,
    "code": "WAHMHD-009",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 审计控制验证缺失",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1820,
    "code": "WAHMHD-010",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "医疗机构周围非法的地理围栏限制 — 管理员凭据安全弱点",
    "description": "移动 Web 应用程序在医疗机构周围部署地理围栏工具以追踪访问者行为，但未获得 MHMDA 的同意。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1821,
    "code": "NYDFS-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1822,
    "code": "NYDFS-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 审计与记录失效",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1823,
    "code": "NYDFS-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 界面设计缺陷",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1824,
    "code": "NYDFS-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 密码学强度不足",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1825,
    "code": "NYDFS-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 漏洞扫描失效",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1826,
    "code": "NYDFS-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 同意日志记录完整性缺陷",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1827,
    "code": "NYDFS-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 退出链接可见性问题",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1828,
    "code": "NYDFS-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 隐私声明披露不足",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1829,
    "code": "NYDFS-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 审计控制验证缺失",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1830,
    "code": "NYDFS-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务网络安全认证 — 管理员凭据安全弱点",
    "description": "该财务门户网站在未提交纽约 DFS 要求的年度网络安全合规性申报的情况下运营。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1831,
    "code": "PSD2-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1832,
    "code": "PSD2-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 审计与记录失效",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 审计跟踪不充分，未能记录配置设置。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1833,
    "code": "PSD2-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 界面设计缺陷",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1834,
    "code": "PSD2-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 密码学强度不足",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1835,
    "code": "PSD2-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 漏洞扫描失效",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1836,
    "code": "PSD2-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 同意日志记录完整性缺陷",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1837,
    "code": "PSD2-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 退出链接可见性问题",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1838,
    "code": "PSD2-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 隐私声明披露不足",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1839,
    "code": "PSD2-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 审计控制验证缺失",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1840,
    "code": "PSD2-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "不符合强客户身份验证 (SCA) 标准 — 管理员凭据安全弱点",
    "description": "结账门户网站在未按照 PSD2 的要求强制执行多因素验证的情况下接受信用卡付款。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1841,
    "code": "PCISC-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1842,
    "code": "PCISC-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 审计与记录失效",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1843,
    "code": "PCISC-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 界面设计缺陷",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1844,
    "code": "PCISC-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 密码学强度不足",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1845,
    "code": "PCISC-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 漏洞扫描失效",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1846,
    "code": "PCISC-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 同意日志记录完整性缺陷",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1847,
    "code": "PCISC-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 退出链接可见性问题",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1848,
    "code": "PCISC-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 隐私声明披露不足",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1849,
    "code": "PCISC-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 审计控制验证缺失",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1850,
    "code": "PCISC-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "客户端脚本完整性控制不足 — 管理员凭据安全弱点",
    "description": "结账页面在未启用活动子资源完整性 (SRI) 验证过滤器的情况下加载外部 JavaScript 模块。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1851,
    "code": "GLBAS-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1852,
    "code": "GLBAS-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 审计与记录失效",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1853,
    "code": "GLBAS-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 界面设计缺陷",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1854,
    "code": "GLBAS-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 密码学强度不足",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1855,
    "code": "GLBAS-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 漏洞扫描失效",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1856,
    "code": "GLBAS-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 同意日志记录完整性缺陷",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1857,
    "code": "GLBAS-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 退出链接可见性问题",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1858,
    "code": "GLBAS-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 隐私声明披露不足",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1859,
    "code": "GLBAS-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 审计控制验证缺失",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1860,
    "code": "GLBAS-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少财务数据安全传输控制 — 管理员凭据安全弱点",
    "description": "贷款申请表在未进行强传输层加密的情况下通过网络路径传输信用报告和 SSN。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1861,
    "code": "FTCDP-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1862,
    "code": "FTCDP-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 审计与记录失效",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1863,
    "code": "FTCDP-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 界面设计缺陷",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1864,
    "code": "FTCDP-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 密码学强度不足",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1865,
    "code": "FTCDP-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 漏洞扫描失效",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1866,
    "code": "FTCDP-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 同意日志记录完整性缺陷",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1867,
    "code": "FTCDP-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 退出链接可见性问题",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1868,
    "code": "FTCDP-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 隐私声明披露不足",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1869,
    "code": "FTCDP-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 审计控制验证缺失",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1870,
    "code": "FTCDP-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "虚假的原始价格折扣 — 管理员凭据安全弱点",
    "description": "商品目录中显示了划线的原始价格，但该价格并不反映实际的历史销售均价，从而欺骗了买家。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1871,
    "code": "FTCCC-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1872,
    "code": "FTCCC-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 审计与记录失效",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1873,
    "code": "FTCCC-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 界面设计缺陷",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1874,
    "code": "FTCCC-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 密码学强度不足",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1875,
    "code": "FTCCC-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 漏洞扫描失效",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1876,
    "code": "FTCCC-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 同意日志记录完整性缺陷",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1877,
    "code": "FTCCC-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 退出链接可见性问题",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1878,
    "code": "FTCCC-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 隐私声明披露不足",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1879,
    "code": "FTCCC-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 审计控制验证缺失",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1880,
    "code": "FTCCC-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "不对称的订阅退订流程 — 管理员凭据安全弱点",
    "description": "会员门户网站要求用户通过电话联系客服来取消定期信用计费合同。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1881,
    "code": "FTCFR-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1882,
    "code": "FTCFR-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 审计与记录失效",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1883,
    "code": "FTCFR-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 界面设计缺陷",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1884,
    "code": "FTCFR-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 密码学强度不足",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1885,
    "code": "FTCFR-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 漏洞扫描失效",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1886,
    "code": "FTCFR-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 同意日志记录完整性缺陷",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1887,
    "code": "FTCFR-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 退出链接可见性问题",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1888,
    "code": "FTCFR-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 隐私声明披露不足",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1889,
    "code": "FTCFR-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 审计控制验证缺失",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1890,
    "code": "FTCFR-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "未公开的有偿点评奖励 — 管理员凭据安全弱点",
    "description": "产品评分摘要中显示了有偿点评，但未明确指出客户因提供反馈而获得了促销奖励。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1891,
    "code": "EUDOR-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1892,
    "code": "EUDOR-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 审计与记录失效",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1893,
    "code": "EUDOR-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 界面设计缺陷",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1894,
    "code": "EUDOR-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 密码学强度不足",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1895,
    "code": "EUDOR-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 漏洞扫描失效",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1896,
    "code": "EUDOR-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 同意日志记录完整性缺陷",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1897,
    "code": "EUDOR-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 退出链接可见性问题",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1898,
    "code": "EUDOR-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 隐私声明披露不足",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1899,
    "code": "EUDOR-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 审计控制验证缺失",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1900,
    "code": "EUDOR-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少 IT 漏洞审计记录 — 管理员凭据安全弱点",
    "description": "银行 Web 接口在未记录 DORA 要求的每周网络漏洞报告的情况下运行。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1901,
    "code": "EUCTA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1902,
    "code": "EUCTA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 审计与记录失效",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 审计跟踪不充分，未能记录配置设置。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1903,
    "code": "EUCTA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 界面设计缺陷",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1904,
    "code": "EUCTA-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 密码学强度不足",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1905,
    "code": "EUCTA-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 漏洞扫描失效",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1906,
    "code": "EUCTA-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 同意日志记录完整性缺陷",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1907,
    "code": "EUCTA-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 退出链接可见性问题",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1908,
    "code": "EUCTA-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 隐私声明披露不足",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1909,
    "code": "EUCTA-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 审计控制验证缺失",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1910,
    "code": "EUCTA-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "网站底部缺少实际受益人信息 — 管理员凭据安全弱点",
    "description": "公司简介底部缺少标明注册的实际受益人及登记注册 ID 的披露说明。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1911,
    "code": "WCAG2-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1912,
    "code": "WCAG2-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 审计与记录失效",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1913,
    "code": "WCAG2-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 界面设计缺陷",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1914,
    "code": "WCAG2-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 密码学强度不足",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1915,
    "code": "WCAG2-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 漏洞扫描失效",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1916,
    "code": "WCAG2-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 同意日志记录完整性缺陷",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1917,
    "code": "WCAG2-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 退出链接可见性问题",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1918,
    "code": "WCAG2-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 隐私声明披露不足",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1919,
    "code": "WCAG2-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 审计控制验证缺失",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1920,
    "code": "WCAG2-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "按钮触控面积尺寸不足 — 管理员凭据安全弱点",
    "description": "交互式导航元素的点击目标尺寸小于 24x24 CSS 像素，阻碍了行动不便的用户使用。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1921,
    "code": "EAAAX-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1922,
    "code": "EAAAX-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 审计与记录失效",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 审计跟踪不充分，未能记录配置设置。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1923,
    "code": "EAAAX-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 界面设计缺陷",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1924,
    "code": "EAAAX-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 密码学强度不足",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1925,
    "code": "EAAAX-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 漏洞扫描失效",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1926,
    "code": "EAAAX-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 同意日志记录完整性缺陷",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1927,
    "code": "EAAAX-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 退出链接可见性问题",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1928,
    "code": "EAAAX-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 隐私声明披露不足",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1929,
    "code": "EAAAX-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 审计控制验证缺失",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1930,
    "code": "EAAAX-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "电子商务结账控制无法访问 — 管理员凭据安全弱点",
    "description": "数字商店付款表单缺少 EAA 要求的语音辅助屏幕阅读器导航支持。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1931,
    "code": "ONADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1932,
    "code": "ONADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 审计与记录失效",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1933,
    "code": "ONADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 界面设计缺陷",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1934,
    "code": "ONADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 密码学强度不足",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1935,
    "code": "ONADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 漏洞扫描失效",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1936,
    "code": "ONADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 同意日志记录完整性缺陷",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1937,
    "code": "ONADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 退出链接可见性问题",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1938,
    "code": "ONADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 隐私声明披露不足",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1939,
    "code": "ONADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 审计控制验证缺失",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1940,
    "code": "ONADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "缺少无障碍反馈渠道 — 管理员凭据安全弱点",
    "description": "针对安大略省的网站未能提供专门的合规渠道，供用户报告数字无障碍障碍。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1941,
    "code": "SEC50-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1942,
    "code": "SEC50-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 审计与记录失效",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1943,
    "code": "SEC50-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 界面设计缺陷",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1944,
    "code": "SEC50-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 密码学强度不足",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1945,
    "code": "SEC50-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 漏洞扫描失效",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1946,
    "code": "SEC50-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 同意日志记录完整性缺陷",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1947,
    "code": "SEC50-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 退出链接可见性问题",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1948,
    "code": "SEC50-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 隐私声明披露不足",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1949,
    "code": "SEC50-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 审计控制验证缺失",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1950,
    "code": "SEC50-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "培训视频缺少闭合字幕 — 管理员凭据安全弱点",
    "description": "嵌入的入职培训视频文件运行时，没有为听力障碍用户提供同步的文本轨迹或闭合字幕支持。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1951,
    "code": "EEOC-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1952,
    "code": "EEOC-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 审计与记录失效",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 审计跟踪不充分，未能记录配置设置。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1953,
    "code": "EEOC-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 界面设计缺陷",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1954,
    "code": "EEOC-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 密码学强度不足",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1955,
    "code": "EEOC-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 漏洞扫描失效",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1956,
    "code": "EEOC-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 同意日志记录完整性缺陷",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1957,
    "code": "EEOC-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 退出链接可见性问题",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1958,
    "code": "EEOC-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 隐私声明披露不足",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1959,
    "code": "EEOC-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 审计控制验证缺失",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1960,
    "code": "EEOC-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "缺少自动招聘算法偏差审计 — 管理员凭据安全弱点",
    "description": "招聘应用程序使用 AI 工具对申请人档案进行排名，但未进行年度偏差审计。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1961,
    "code": "BIPAX-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1962,
    "code": "BIPAX-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 审计与记录失效",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 审计跟踪不充分，未能记录配置设置。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1963,
    "code": "BIPAX-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 界面设计缺陷",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1964,
    "code": "BIPAX-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 密码学强度不足",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1965,
    "code": "BIPAX-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 漏洞扫描失效",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1966,
    "code": "BIPAX-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 同意日志记录完整性缺陷",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1967,
    "code": "BIPAX-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 退出链接可见性问题",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1968,
    "code": "BIPAX-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 隐私声明披露不足",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1969,
    "code": "BIPAX-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 审计控制验证缺失",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1970,
    "code": "BIPAX-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "虚拟试穿中缺少生物特征扫描同意书 — 管理员凭据安全弱点",
    "description": "化妆品门户网站部署了人脸扫描虚拟试穿软件，但未事先获得书面生物特征同意书。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1971,
    "code": "CIPAX-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1972,
    "code": "CIPAX-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 审计与记录失效",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 审计跟踪不充分，未能记录配置设置。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1973,
    "code": "CIPAX-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 界面设计缺陷",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1974,
    "code": "CIPAX-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 密码学强度不足",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1975,
    "code": "CIPAX-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 漏洞扫描失效",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1976,
    "code": "CIPAX-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 同意日志记录完整性缺陷",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1977,
    "code": "CIPAX-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 退出链接可见性问题",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1978,
    "code": "CIPAX-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 隐私声明披露不足",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1979,
    "code": "CIPAX-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 审计控制验证缺失",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1980,
    "code": "CIPAX-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "在线客服实时转录缺少 CIPA 警告 — 管理员凭据安全弱点",
    "description": "客户端聊天脚本执行实时文本转录并记录对话，但未展示 CIPA 录音警告。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1981,
    "code": "LKSG-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1982,
    "code": "LKSG-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 审计与记录失效",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 审计跟踪不充分，未能记录配置设置。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1983,
    "code": "LKSG-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 界面设计缺陷",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1984,
    "code": "LKSG-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 密码学强度不足",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1985,
    "code": "LKSG-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 漏洞扫描失效",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1986,
    "code": "LKSG-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 同意日志记录完整性缺陷",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1987,
    "code": "LKSG-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 退出链接可见性问题",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1988,
    "code": "LKSG-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 隐私声明披露不足",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1989,
    "code": "LKSG-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 审计控制验证缺失",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1990,
    "code": "LKSG-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少供应链投诉举报渠道 — 管理员凭据安全弱点",
    "description": "公司网站缺少公开访问渠道，供供应商提交侵犯人权的投诉举报。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1991,
    "code": "CSRD-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1992,
    "code": "CSRD-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 审计与记录失效",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 审计跟踪不充分，未能记录配置设置。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1993,
    "code": "CSRD-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 界面设计缺陷",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 用户界面采用了限制访问者访问或选择的设计组件。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1994,
    "code": "CSRD-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 密码学强度不足",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 密码哈希算法或加密传输层低于基线标准。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1995,
    "code": "CSRD-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 漏洞扫描失效",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 自动扫描工具未能定期在公共网络路径上运行。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1996,
    "code": "CSRD-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 同意日志记录完整性缺陷",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 自动日志系统未能将客户选择存储在不可变的存储注册表中。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1997,
    "code": "CSRD-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 退出链接可见性问题",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 页脚缺乏显着的链接允许访问者请求排除在数据追踪之外。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1998,
    "code": "CSRD-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 隐私声明披露不足",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 披露未能清楚说明个人文件处理的目的和范围。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1999,
    "code": "CSRD-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 审计控制验证缺失",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 数据传输过程在没有确保记录有效性的自动检查情况下运行。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 2000,
    "code": "CSRD-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "缺少数字化可持续发展报告披露 — 管理员凭据安全弱点",
    "description": "企业门户网站未能以机器可读的数字格式发布年度可持续发展审计报告。 管理控制台允许使用标准用户凭据，且未强制执行 MFA 密钥。",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  }
];
