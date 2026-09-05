import { ComplianceCheck, LawMeta, Category } from './threatMatrix';

export const LAW_META_ES: Record<Category, LawMeta> = {
  "ADA / WCAG": {
    "lawName": "ADA Título III / Ley Europea de Accesibilidad (EAA) / AODA de Ontario",
    "lawUrl": "https://www.ada.gov/resources/web-guidance/",
    "fineAmount": "$75,000–$150,000 (ADA) / €100,000 (EAA) / $100,000 por día (AODA)",
    "reportingConsequence": "Aplicación civil del DOJ / Penalizaciones por vigilancia del mercado nacional / Auditorías del Ministerio de Ontario"
  },
  "HIPAA / Medical": {
    "lawName": "Regla de Privacidad HIPAA / Ley de Washington Mi Salud Mis Datos (MHMDA)",
    "lawUrl": "https://www.hhs.gov/hipaa/for-professionals/privacy/index.html",
    "fineAmount": "$50,000–$1,500,000 por año / $7,500 por violación MHMDA",
    "reportingConsequence": "Investigación civil de HHS OCR / Demandas colectivas bajo MHMDA / Procesamiento del DOJ"
  },
  "CCPA / CPRA": {
    "lawName": "Ley de Privacidad del Consumidor de California (CCPA/CPRA) / Código de Diseño Apropiado para la Edad de California (AB 2273)",
    "lawUrl": "https://oag.ca.gov/privacy/ccpa",
    "fineAmount": "$2,500–$7,500 por violación / $7,500 por niño (AB 2273)",
    "reportingConsequence": "Auditorías de la Agencia de Protección de Privacidad de California (CPPA) / Aplicación civil del AG de California"
  },
  "FTC Enforcement": {
    "lawName": "Ley de la Comisión Federal de Comercio — Sección 5 (Prácticas Engañosas y Patrones Oscuros)",
    "lawUrl": "https://www.ftc.gov/legal-library/browse/statutes/federal-trade-commission-act",
    "fineAmount": "Hasta $50,120 por violación (ajustado anualmente)",
    "reportingConsequence": "Órdenes de aplicación de la FTC / Decretos de consentimiento / Reembolsos obligatorios al consumidor / Auditorías"
  },
  "TCPA / Telecom": {
    "lawName": "Ley de Protección al Consumidor Telefónico (TCPA) / Ley CAN-SPAM / FTSA",
    "lawUrl": "https://www.fcc.gov/general/telemarketing-and-robocalls",
    "fineAmount": "$500–$1,500 por llamada/texto (TCPA) / $50,120 por correo electrónico CAN-SPAM",
    "reportingConsequence": "Acción regulatoria de la FCC / Litigios de acción colectiva / Lista negra permanente de dominios por ISP"
  },
  "GDPR": {
    "lawName": "RGPD de la UE / RGPD del Reino Unido / Directiva ePrivacy",
    "lawUrl": "https://gdpr-info.eu/",
    "fineAmount": "Hasta €20,000,000 / £17.5M o 4% de la facturación anual global",
    "reportingConsequence": "Investigación de DPA nacional (CNIL, ICO, etc.) / Prohibiciones de procesamiento / Notificación obligatoria de brechas"
  },
  "PCI-DSS / Security": {
    "lawName": "PCI DSS v4.0 — Requisitos del Consejo de Estándares de Seguridad PCI",
    "lawUrl": "https://www.pcisecuritystandards.org/standards/pci-dss/",
    "fineAmount": "$5,000–$100,000 por mes; suspensión del procesamiento de tarjetas de comerciante",
    "reportingConsequence": "Multas de la red de tarjetas / Auditorías forenses obligatorias / Terminación del procesamiento de tarjetas de crédito"
  },
  "State Privacy Laws": {
    "lawName": "Leyes de Privacidad Estatales de EE.UU. (VA VCDPA, TX TDPSA, CO CPA) / NY DFS / NY SHIELD",
    "lawUrl": "https://www.ncsl.org/technology-and-communication/state-laws-related-to-digital-privacy",
    "fineAmount": "$2,500–$7,500 por violación (Estados) / hasta $250,000 (NY DFS)",
    "reportingConsequence": "Demandas civiles del AG estatal / Aplicación financiera de NY DFS / Responsabilidad por acciones colectivas"
  },
  "Financial / Corporate": {
    "lawName": "DORA de la UE / Ley Gramm-Leach-Bliley (GLBA) / Ley de Transparencia Corporativa (CTA)",
    "lawUrl": "https://www.ftc.gov/legal-library/browse/statutes/gramm-leach-bliley-act",
    "fineAmount": "$500/día de retraso (FinCEN BOI) / hasta $100,000 (GLBA) / 1% de facturación global diaria (DORA)",
    "reportingConsequence": "Penalidades criminales de FinCEN/IRS / Aplicación de la SEC / Auditorías regulatorias de las ESAs europeas"
  },
  "Digital Operations": {
    "lawName": "PIPEDA de Canadá y Ley 25 / LGPD de Brasil / Ley de Privacidad de Australia / PDPA de Singapur / Ley de IA y DSA de la UE",
    "lawUrl": "https://laws-lois.justice.gc.ca/eng/acts/P-8.6/",
    "fineAmount": "$100,000 CAD (PIPEDA) / $25M CAD (Quebec) / 2% de ingresos (LGPD) / $50M AUD (APPs) / €35M o 7% de ingresos (Ley de IA)",
    "reportingConsequence": "Investigaciones de OPC Canadá / Auditorías de ANPD Brasil / Demandas de OAIC Australia / Aplicación de la Oficina de IA de la UE"
  }
};

export const threatMatrixEs: ComplianceCheck[] = [
  {
    "id": 1,
    "code": "ADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Faltan etiquetas ALT en las imágenes",
    "description": "Las imágenes carecen de atributos de texto alternativo, lo que hace que el contenido visual sea invisible para los lectores de pantalla. Esta es la queja de accesibilidad web ADA más presentada y la más fácil de probar en los tribunales.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 1.1.1"
  },
  {
    "id": 2,
    "code": "ADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Faltan etiquetas ARIA en elementos interactivos",
    "description": "Los botones, enlaces y controles interactivos carecen de nombres accesibles mediante aria-label o aria-labelledby. Los usuarios de lectores de pantalla no pueden determinar el propósito de estos elementos, creando una barrera de uso.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 4.1.2"
  },
  {
    "id": 3,
    "code": "ADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Relación de contraste de color insuficiente",
    "description": "El contraste entre texto y fondo está por debajo de la relación mínima de 4.5:1 requerida para texto normal. Los usuarios con baja visión no pueden leer el contenido de la página, y esta es una violación medible y automatizable frecuentemente citada en cartas de demanda.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 1.4.3"
  },
  {
    "id": 4,
    "code": "ADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Sin enlace de navegación para saltar",
    "description": "La página carece de un enlace \"saltar al contenido principal\" como primer elemento enfocable. Los usuarios de teclado y lectores de pantalla deben tabular a través de toda la navegación en cada carga de página, lo cual es una barrera de accesibilidad documentada.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.4.1"
  },
  {
    "id": 5,
    "code": "ADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Elementos interactivos inaccesibles por teclado",
    "description": "Elementos interactivos como menús desplegables, modales o controles personalizados no pueden operarse solo con el teclado. Los usuarios que no pueden usar un ratón quedan completamente bloqueados de funcionalidades clave.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.1.1"
  },
  {
    "id": 6,
    "code": "ADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Faltan etiquetas en campos de formulario",
    "description": "Los campos de entrada de formularios carecen de elementos <label> asociados o atributos aria-label. Los usuarios de lectores de pantalla no pueden identificar qué información se solicita, impidiendo completar el formulario.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.3.1"
  },
  {
    "id": 7,
    "code": "ADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Jerarquía de encabezados rota",
    "description": "A la página le falta un elemento H1 o salta niveles de encabezado (por ejemplo, de H1 a H3). Los lectores de pantalla dependen de la estructura de encabezados para la navegación de la página; una jerarquía rota hace que el contenido sea difícil de escanear y entender.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 1.3.1"
  },
  {
    "id": 8,
    "code": "ADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta atributo lang en HTML",
    "description": "El elemento <html> carece de un atributo lang que especifique el idioma de la página. Los lectores de pantalla no pueden determinar las reglas de pronunciación correctas, causando una salida de voz distorsionada para todo el contenido de la página.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 3.1.1"
  },
  {
    "id": 9,
    "code": "ADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Widget de superposición ADA instalado",
    "description": "Se ha instalado un widget de superposición de accesibilidad de terceros (por ejemplo, AccessiBe, UserWay). Estas superposiciones se consideran una \"bandera roja para abogados troll\", no proporcionan cumplimiento legal y han sido explícitamente rechazadas por organizaciones de defensa de la discapacidad y tribunales.",
    "severity": "moderate",
    "reference": "ADA Title III; DOJ Web Guidance 2022"
  },
  {
    "id": 10,
    "code": "ADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Portal de carreras/solicitudes de empleo inaccesible",
    "description": "La página de carreras o el portal de solicitudes de empleo no es accesible para usuarios con discapacidades. Esto crea responsabilidad bajo el Título I de la ADA (empleo) y el Título III (acomodo público) y es un objetivo frecuente de demandantes seriales de ADA.",
    "severity": "advisory",
    "reference": "ADA Title I § 12112; Title III § 12182"
  },
  {
    "id": 11,
    "code": "HIPAA-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Píxel de Meta en páginas de reservas médicas",
    "description": "El píxel de seguimiento de Facebook/Meta se activa en páginas de programación de citas o servicios médicos, transmitiendo datos de condiciones de salud del paciente a Meta. El HHS ha emitido orientación explícita de que esto constituye una divulgación impermissible de PHI.",
    "severity": "critical",
    "reference": "45 CFR § 164.502; HHS Bulletin Dec 2022"
  },
  {
    "id": 12,
    "code": "HIPAA-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Google Analytics en portal de pacientes sin BAA",
    "description": "Google Analytics está recopilando datos en páginas del portal de pacientes sin un Acuerdo de Asociado de Negocios firmado. Google no firma BAAs para Analytics estándar, lo que hace que cualquier seguimiento del portal de pacientes sea una violación automática de HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.502(e)"
  },
  {
    "id": 13,
    "code": "HIPAA-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Falta página de estimación de buena fe",
    "description": "El sitio web no proporciona información sobre el derecho de los pacientes a recibir una Estimación de Buena Fe de los cargos esperados según lo requiere la Ley Sin Sorpresas. Los pacientes de pago propio y sin seguro deben ser informados de este derecho antes de programar servicios.",
    "severity": "serious",
    "reference": "No Surprises Act § 112; 45 CFR § 149.610"
  },
  {
    "id": 14,
    "code": "HIPAA-004",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Píxeles de redes sociales en páginas de servicios de salud",
    "description": "Los píxeles de seguimiento de TikTok, Snapchat u otras redes sociales están activos en páginas que describen condiciones o tratamientos de salud específicos. Estos píxeles transmiten rutas de URL que revelan las condiciones de salud que los usuarios están investigando.",
    "severity": "critical",
    "reference": "45 CFR § 164.502; FTC Health Breach Notification Rule"
  },
  {
    "id": 15,
    "code": "HIPAA-005",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Sin BAA con proveedor SaaS de formularios",
    "description": "Los formularios de admisión de pacientes o de contacto se procesan a través de una plataforma SaaS de terceros (por ejemplo, Typeform, JotForm) sin un Acuerdo de Asociado de Negocios firmado. Todos los datos de pacientes enviados a través de estos formularios son una divulgación de PHI no segura.",
    "severity": "serious",
    "reference": "45 CFR § 164.502(e); § 164.504(e)"
  },
  {
    "id": 16,
    "code": "HIPAA-006",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Chatbot Médico que Recopila Síntomas Sin Consentimiento",
    "description": "Un chatbot impulsado por IA o script está recopilando información de síntomas, quejas de salud o historial médico sin presentar una autorización HIPAA o un Aviso de Prácticas de Privacidad. Esto crea un punto de recopilación de PHI no controlado.",
    "severity": "serious",
    "reference": "45 CFR § 164.520; § 164.508"
  },
  {
    "id": 17,
    "code": "HIPAA-007",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Formularios de Admisión de Pacientes Sin Cifrado",
    "description": "Los formularios de admisión de pacientes se envían a través de conexiones HTTP sin cifrado o se almacenan sin cifrado en reposo. HIPAA requiere salvaguardas técnicas que incluyan el cifrado para la PHI electrónica en tránsito y en reposo.",
    "severity": "moderate",
    "reference": "45 CFR § 164.312(a)(2)(iv); § 164.312(e)(1)"
  },
  {
    "id": 18,
    "code": "HIPAA-008",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Falta de Enlace para Solicitar Acceso a PHI del Paciente",
    "description": "El sitio web no proporciona un mecanismo para que los pacientes soliciten acceso o descarguen su información de salud protegida. HIPAA otorga a los pacientes el derecho a acceder a su PHI, y el proceso debe comunicarse claramente.",
    "severity": "moderate",
    "reference": "45 CFR § 164.524"
  },
  {
    "id": 19,
    "code": "HIPAA-009",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Telemedicina Entre Estados Sin Filtro de Licencia",
    "description": "Se ofrecen servicios de telemedicina a pacientes en estados donde el proveedor no está licenciado, sin un filtro de elegibilidad geográfica. Pueden violarse las leyes de Práctica Corporativa de Medicina (CPOM) y los requisitos de licencia estatal.",
    "severity": "moderate",
    "reference": "State Medical Practice Acts; CPOM Statutes"
  },
  {
    "id": 20,
    "code": "HIPAA-010",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Seguimiento de Salud Sin Consentimiento MHMDA",
    "description": "Un sitio web de salud o bienestar está rastreando el comportamiento del usuario sin el consentimiento requerido por la Ley My Health My Data (MHMDA) de Washington. Esta ley se aplica a cualquier entidad que recopile datos de salud de residentes de Washington, no solo a entidades cubiertas por HIPAA.",
    "severity": "advisory",
    "reference": "RCW 19.373 (Washington MHMDA)"
  },
  {
    "id": 21,
    "code": "CCPA-001",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de Enlace en el Pie de Página \"No Vender ni Compartir\"",
    "description": "El sitio web carece de un enlace \"No vender ni compartir mi información personal\" en el pie de página. CCPA requiere que este enlace sea claro, visible y esté disponible en todas las páginas para los consumidores de California.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.120(a)"
  },
  {
    "id": 22,
    "code": "CCPA-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Ventana Emergente de Descuento por Correo Electrónico Sin Aviso de Incentivo Financiero",
    "description": "Una ventana emergente de registro de correo electrónico ofrece un descuento (por ejemplo, \"10% de descuento por suscribirse\") sin un aviso de Incentivo Financiero. CCPA/CPRA requiere que las empresas divulguen los términos materiales de cualquier programa de incentivos financieros vinculado a la recopilación de datos.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.125(b)"
  },
  {
    "id": 23,
    "code": "CCPA-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Rastreadores de Terceros que se Ejecutan Antes del Consentimiento de Cookies",
    "description": "Los scripts de análisis, publicidad y seguimiento de redes sociales se ejecutan antes de que el usuario haya dado su consentimiento. Según CCPA/CPRA, el intercambio de datos con terceros para publicidad conductual entre contextos requiere al menos la capacidad de exclusión.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.120; 11 CCR § 7025"
  },
  {
    "id": 24,
    "code": "CCPA-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Política de Privacidad Faltante o Inadecuada",
    "description": "El sitio web carece de una política de privacidad completa o la política existente no divulga las categorías requeridas por CCPA: tipos de información personal recopilada, fines, intercambio con terceros y derechos del consumidor.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.130(a)(5)"
  },
  {
    "id": 25,
    "code": "CCPA-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Página de Carreras Sin Aviso de Privacidad para Solicitantes",
    "description": "La página de carreras o solicitudes de empleo recopila currículos y datos personales sin un Aviso de Privacidad para Solicitantes. CPRA extendió los derechos de privacidad a los solicitantes de empleo y empleados, requiriendo divulgación en el punto de recopilación.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.100(b); CPRA Employee/Applicant Extension"
  },
  {
    "id": 26,
    "code": "CCPA-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Sin Mecanismo para Solicitar la Eliminación de Datos",
    "description": "El sitio web no proporciona ninguna forma para que los consumidores soliciten la eliminación de su información personal. CCPA requiere al menos dos métodos para enviar solicitudes de consumidores, incluido un número de teléfono gratuito para empresas más grandes.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.105; § 1798.130"
  },
  {
    "id": 27,
    "code": "CCPA-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Compartición de Datos con Terceros Sin Divulgación",
    "description": "La información personal se comparte con servicios de publicidad, análisis o enriquecimiento de datos de terceros sin divulgación en la política de privacidad. Cada relación de intercambio no divulgada constituye una violación separada.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.115"
  },
  {
    "id": 28,
    "code": "CCPA-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de Banner de Consentimiento de Cookies para Usuarios de California",
    "description": "No se presenta ningún mecanismo de consentimiento de cookies a los visitantes de California. Aunque CCPA no exige específicamente banners de cookies, la CPPA ha señalado que la prioridad de aplicación se centra en los sitios que implementan cookies de seguimiento sin respetar las señales de exclusión.",
    "severity": "moderate",
    "reference": "11 CCR § 7025; Cal. Civ. Code § 1798.135(e)"
  },
  {
    "id": 29,
    "code": "CCPA-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Opt-In Automático a Comunicaciones de Marketing",
    "description": "Los usuarios se inscriben automáticamente en correos electrónicos de marketing o SMS durante la creación de la cuenta o el proceso de pago sin consentimiento afirmativo. Las casillas de consentimiento de marketing marcadas previamente violan tanto los principios de CCPA como los requisitos de CAN-SPAM.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.120; 16 CFR § 316"
  },
  {
    "id": 30,
    "code": "CCPA-010",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Operar como Corredor de Datos Sin Registro",
    "description": "La empresa recopila y vende información personal de consumidores con los que no tiene una relación directa, cumpliendo la definición de corredor de datos, sin registrarse ante el estado según lo exige Texas SB 2105 y la Delete Act de California.",
    "severity": "advisory",
    "reference": "TX Bus. & Com. Code § 509; Cal. Civ. Code § 1798.99.82"
  },
  {
    "id": 31,
    "code": "FTC-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Temporizador de cuenta regresiva falso (Patrón oscuro)",
    "description": "Un temporizador de cuenta regresiva de \"oferta por tiempo limitado\" se reinicia al recargar la página, revelando que es urgencia fabricada. La FTC clasifica los temporizadores de cuenta regresiva falsos como un patrón oscuro engañoso sujeto a aplicación bajo la Sección 5.",
    "severity": "critical",
    "reference": "FTC Act § 5; FTC Dark Patterns Report 2022"
  },
  {
    "id": 32,
    "code": "FTC-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Precio \"original\" tachado engañoso",
    "description": "Se muestra un precio \"original\" tachado que nunca fue el precio de venta real, creando un descuento fantasma. Las Guías contra la fijación de precios engañosos de la FTC prohíben los precios anteriores ficticios.",
    "severity": "critical",
    "reference": "16 CFR § 233; FTC Act § 5"
  },
  {
    "id": 33,
    "code": "FTC-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Contador de prueba social falso",
    "description": "Un contador de \"X personas están viendo esto ahora mismo\" o \"solo quedan Y en stock\" muestra números fabricados o no verificables. La FTC considera que la prueba social fabricada es una práctica comercial engañosa.",
    "severity": "serious",
    "reference": "FTC Act § 5; FTC Endorsement Guides 16 CFR § 255"
  },
  {
    "id": 34,
    "code": "FTC-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Reseñas de clientes no verificadas",
    "description": "Se muestran reseñas de clientes sin verificación de compra o autenticidad. La Regla de 2024 de la FTC sobre el uso de reseñas de consumidores prohíbe las reseñas falsas, compradas o incentivadas sin divulgación clara.",
    "severity": "critical",
    "reference": "16 CFR § 465 (FTC Review Rule 2024)"
  },
  {
    "id": 35,
    "code": "FTC-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Cancelación de suscripción más difícil que el registro",
    "description": "Cancelar una suscripción requiere más pasos, llamadas telefónicas u obstáculos que el proceso de registro original. La Regla de clic para cancelar de la FTC requiere que la cancelación sea tan fácil como la inscripción.",
    "severity": "serious",
    "reference": "16 CFR § 425 (FTC Click-to-Cancel Rule 2024)"
  },
  {
    "id": 36,
    "code": "FTC-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Divulgación de afiliado faltante",
    "description": "Los enlaces de afiliados y comisiones de referencia no se divulgan de manera clara y conspicua por encima del primer enlace de afiliado en la página. La FTC requiere la divulgación de la conexión material antes de que el consumidor encuentre el respaldo.",
    "severity": "serious",
    "reference": "16 CFR § 255.5; FTC Endorsement Guides"
  },
  {
    "id": 37,
    "code": "FTC-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Testimonios compensados no divulgados",
    "description": "Se muestran testimonios de clientes o influencers sin divulgar que el revisor recibió compensación, productos gratuitos u otros incentivos. Cada respaldo pagado no divulgado puede incurrir en multas de hasta $50,000.",
    "severity": "moderate",
    "reference": "16 CFR § 255.1; FTC Endorsement Guides"
  },
  {
    "id": 38,
    "code": "FTC-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Reclamos ambientales no fundamentados",
    "description": "El texto de marketing usa términos como \"ecológico\", \"neutral en carbono\" o \"sostenible\" sin certificación de terceros o fundamentación. Las Guías Verdes de la FTC requieren evidencia científica competente y confiable para los reclamos ambientales.",
    "severity": "moderate",
    "reference": "16 CFR § 260 (FTC Green Guides)"
  },
  {
    "id": 39,
    "code": "FTC-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Prueba gratuita que se convierte automáticamente sin divulgación",
    "description": "Una prueba gratuita se convierte automáticamente en una suscripción paga sin divulgación clara y conspicua de los términos de conversión, fecha de facturación y monto antes de que el consumidor proporcione información de pago.",
    "severity": "moderate",
    "reference": "FTC Act § 5; Restore Online Shoppers' Confidence Act (ROSCA)"
  },
  {
    "id": 40,
    "code": "FTC-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Precios de cebo y cambio",
    "description": "El precio mostrado en la publicidad o resultados de búsqueda difiere del precio mostrado en el pago debido a tarifas agregadas, versiones diferentes del producto o términos cambiados. Esto constituye un engaño clásico de cebo y cambio.",
    "severity": "advisory",
    "reference": "FTC Act § 5; 16 CFR § 238 (Bait Advertising)"
  },
  {
    "id": 41,
    "code": "TCPA-001",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Formulario de contacto sin casilla de consentimiento para SMS",
    "description": "El formulario de contacto o generación de leads recopila números de teléfono sin una casilla de aceptación explícita para comunicaciones por SMS. Los requisitos de portadores A2P 10DLC y la TCPA exigen consentimiento previo expreso por escrito para textos de marketing.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227(b); A2P 10DLC Guidelines"
  },
  {
    "id": 42,
    "code": "TCPA-002",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "SMS de marketing enviados después de las 8 PM hora local",
    "description": "Los mensajes de texto de marketing automatizados se envían fuera de las horas permitidas. La Ley de Solicitación Telefónica de Florida (FTSA) restringe los textos a las 8 AM–8 PM hora local, con otros estados imponiendo ventanas similares.",
    "severity": "critical",
    "reference": "FL Stat. § 501.059 (FTSA); 47 U.S.C. § 227"
  },
  {
    "id": 43,
    "code": "TCPA-003",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Sin mecanismo STOP en SMS de marketing",
    "description": "Los mensajes de texto de marketing no incluyen instrucciones de exclusión (por ejemplo, \"Responde STOP para darte de baja\"). Las directrices de CTIA y la TCPA requieren que cada SMS de marketing incluya un mecanismo claro de exclusión.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227; CTIA Short Code Monitoring Handbook"
  },
  {
    "id": 44,
    "code": "TCPA-004",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Correos electrónicos de marketing sin dirección física",
    "description": "Los mensajes de correo electrónico comerciales no incluyen la dirección postal física válida del remitente. CAN-SPAM requiere que cada correo electrónico comercial contenga la dirección actual del remitente o un apartado de correos registrado.",
    "severity": "serious",
    "reference": "15 U.S.C. § 7704(a)(5)(A); 16 CFR § 316.2"
  },
  {
    "id": 45,
    "code": "TCPA-005",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Correos electrónicos de marketing sin enlace de cancelación de suscripción",
    "description": "Los correos electrónicos comerciales carecen de un mecanismo de cancelación de suscripción funcional. CAN-SPAM requiere un método de exclusión claro y conspicuo en cada mensaje comercial, y las solicitudes de exclusión deben atenderse dentro de los 10 días hábiles.",
    "severity": "serious",
    "reference": "15 U.S.C. § 7704(a)(3); 16 CFR § 316.5"
  },
  {
    "id": 46,
    "code": "TCPA-006",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "SMS de Carrito Abandonado Sin Consentimiento Escrito Previo",
    "description": "Mensajes de texto de recuperación de carrito abandonado se envían a consumidores que no proporcionaron consentimiento expreso escrito previo para textos de marketing. El abandono del carrito no constituye consentimiento bajo la TCPA.",
    "severity": "serious",
    "reference": "47 U.S.C. § 227(b)(1)(A)(iii)"
  },
  {
    "id": 47,
    "code": "TCPA-007",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Marcador Automático Sin Consentimiento Expreso TCPA",
    "description": "Se utiliza un sistema de marcado telefónico automático (ATDS) para realizar llamadas o enviar textos sin obtener consentimiento expreso previo. La TCPA prohíbe las llamadas autodializadas o pregrabadas no solicitadas a teléfonos celulares.",
    "severity": "moderate",
    "reference": "47 U.S.C. § 227(b)(1)(A)"
  },
  {
    "id": 48,
    "code": "TCPA-008",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Falta de Registro de Campaña A2P 10DLC",
    "description": "Mensajes SMS comerciales se envían a través de códigos largos (números de 10 dígitos) sin el registro adecuado de campaña A2P 10DLC con los operadores. Las campañas no registradas enfrentan filtrado de mensajes, bloqueo y multas por mensaje de los operadores.",
    "severity": "moderate",
    "reference": "CTIA 10DLC Policy; Carrier A2P Guidelines"
  },
  {
    "id": 49,
    "code": "TCPA-009",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "SMS Masivos Sin Manejador de Palabra Clave STOP",
    "description": "El sistema de SMS masivos no procesa automáticamente las respuestas con la palabra clave STOP para cesar inmediatamente el envío de mensajes. No honrar las palabras clave de exclusión expone al negocio a responsabilidad por demandas colectivas TCPA de $500–$1,500 por mensaje.",
    "severity": "moderate",
    "reference": "47 U.S.C. § 227; CTIA Messaging Principles"
  },
  {
    "id": 50,
    "code": "TCPA-010",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Mensajes de Voz Pregrabados Sin Opt-In",
    "description": "Mensajes de marketing de voz pregrabada o artificial se entregan a consumidores sin consentimiento expreso escrito previo. Las disposiciones de llamadas robóticas de la TCPA conllevan daños estatutarios de $500–$1,500 por llamada.",
    "severity": "advisory",
    "reference": "47 U.S.C. § 227(b)(1)(B)"
  },
  {
    "id": 51,
    "code": "GDPR-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Meta Pixel Se Activa Antes del Consentimiento de Cookies",
    "description": "El píxel de seguimiento de Facebook/Meta carga y transmite datos de usuario antes de que el visitante haya interactuado con el banner de consentimiento de cookies. Bajo el GDPR, el seguimiento no esencial requiere consentimiento previo, informado y afirmativo.",
    "severity": "critical",
    "reference": "GDPR Article 6(1)(a); ePrivacy Directive Article 5(3)"
  },
  {
    "id": 52,
    "code": "GDPR-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Sin Banner de Consentimiento de Cookies para Visitantes de la UE",
    "description": "El sitio web no muestra ningún mecanismo de consentimiento de cookies a visitantes de estados miembros de la UE. La Directiva ePrivacy y el GDPR requieren consentimiento informado antes de colocar cookies o tecnologías de seguimiento no esenciales.",
    "severity": "critical",
    "reference": "GDPR Article 7; ePrivacy Directive Article 5(3)"
  },
  {
    "id": 53,
    "code": "GDPR-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Google Analytics Sin Consentimiento GDPR",
    "description": "Google Analytics recopila datos de visitantes de usuarios de la UE sin obtener consentimiento previo. Múltiples Autoridades de Protección de Datos de la UE han dictaminado que las transferencias de Google Analytics constituyen procesamiento ilegal y transferencia de datos transfronteriza.",
    "severity": "critical",
    "reference": "GDPR Article 44; Austrian DSB & French CNIL Rulings 2022"
  },
  {
    "id": 54,
    "code": "GDPR-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Sin Acuerdo de Procesamiento de Datos con Procesadores",
    "description": "Servicios de terceros que procesan datos personales en nombre del controlador operan sin un Acuerdo de Procesamiento de Datos firmado. El GDPR exige contratos escritos que especifiquen el alcance, propósito y obligaciones de seguridad del procesamiento.",
    "severity": "serious",
    "reference": "GDPR Article 28(3)"
  },
  {
    "id": 55,
    "code": "GDPR-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Sin Proceso de Notificación de Brecha en 72 Horas",
    "description": "La organización no tiene un procedimiento documentado para notificar a la autoridad de supervisión dentro de las 72 horas de tomar conocimiento de una brecha de datos personales. No notificar es una violación separada, finable de forma independiente.",
    "severity": "serious",
    "reference": "GDPR Article 33"
  },
  {
    "id": 56,
    "code": "GDPR-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Transferencia de Datos Transfronteriza Sin Salvaguardas",
    "description": "Datos personales de residentes de la UE se transfieren a servidores o servicios basados en EE.UU. sin Cláusulas Contractuales Estándar (SCCs), decisiones de adecuación u otros mecanismos de transferencia aprobados tras la sentencia Schrems II.",
    "severity": "serious",
    "reference": "GDPR Articles 44–49; Schrems II (C-311/18)"
  },
  {
    "id": 57,
    "code": "GDPR-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Incrustación de YouTube Filtrando Datos de Visualización de Videos",
    "description": "Las incrustaciones estándar de YouTube combinadas con píxeles de seguimiento crean una fuga de datos de visualización de videos similar a violaciones de la VPPA. La incrustación estándar de YouTube comparte hábitos de visualización con Google antes de obtener el consentimiento.",
    "severity": "moderate",
    "reference": "GDPR Article 6(1)(a); ePrivacy Directive Article 5(3)"
  },
  {
    "id": 58,
    "code": "GDPR-008",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Sin Mecanismo de \"Derecho al Olvido\"",
    "description": "El sitio web no proporciona ninguna forma para que los titulares de datos soliciten la eliminación de sus datos personales. El Derecho al Borrado del GDPR requiere que los controladores eliminen datos personales a solicitud cuando no exista una base legal superior.",
    "severity": "moderate",
    "reference": "GDPR Article 17"
  },
  {
    "id": 59,
    "code": "GDPR-009",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Sin Política de Retención de Datos Publicada",
    "description": "La política de privacidad no especifica cuánto tiempo se retienen los datos personales ni los criterios utilizados para determinar los períodos de retención. El GDPR requiere comunicación transparente de los períodos de retención en el punto de recolección.",
    "severity": "moderate",
    "reference": "GDPR Article 13(2)(a); Article 5(1)(e)"
  },
  {
    "id": 60,
    "code": "GDPR-010",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Banner de Consentimiento Usa Casillas Pre-Marcadas",
    "description": "El banner de consentimiento de cookies presenta casillas de consentimiento pre-marcadas para cookies de análisis o marketing. El TJUE dictaminó en Planet49 que las casillas pre-marcadas no constituyen consentimiento válido bajo el GDPR.",
    "severity": "advisory",
    "reference": "GDPR Article 4(11); CJEU Planet49 (C-673/17)"
  },
  {
    "id": 61,
    "code": "PCI-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de Encabezado Content-Security-Policy",
    "description": "El sitio web no establece un encabezado HTTP Content-Security-Policy, dejándolo vulnerable a ataques de cross-site scripting (XSS) e inyección de datos. CSP es una capa de defensa crítica para prevenir la ejecución de scripts no autorizados.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; OWASP CSP Cheat Sheet"
  },
  {
    "id": 62,
    "code": "PCI-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Claves API Expuestas en el Código Fuente del Frontend",
    "description": "Las claves API para servicios como Google Maps, Stripe o SendGrid son visibles en el código fuente de JavaScript del lado del cliente. Las claves secretas expuestas pueden ser recolectadas por bots y utilizadas para acceso no autorizado a la API, fraude de facturación o exfiltración de datos.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 2.2.7; OWASP API Security Top 10"
  },
  {
    "id": 63,
    "code": "PCI-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Formulario de Pago Sin Tokenización",
    "description": "Los números de tarjeta de crédito se recopilan directamente en los campos del formulario en el servidor del comerciante en lugar de a través de un servicio de tokenización compatible con PCI (por ejemplo, Stripe Elements, Braintree). Esto coloca todo el sitio dentro del alcance de PCI-DSS.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req. 3.4; Req. 4.2"
  },
  {
    "id": 64,
    "code": "PCI-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de HTTPS en Formularios o Páginas de Pago",
    "description": "Las páginas que contienen formularios, campos de inicio de sesión o entradas de pago se sirven a través de HTTP no cifrado. Todos los datos enviados en estas páginas pueden ser interceptados en tránsito por cualquier intermediario de red.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 4.2.1"
  },
  {
    "id": 65,
    "code": "PCI-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Contenido Mixto en Páginas HTTPS",
    "description": "La página se sirve a través de HTTPS pero carga sub-recursos (imágenes, scripts, hojas de estilo) a través de HTTP inseguro. El contenido mixto socava la garantía de seguridad de HTTPS y puede ser explotado para ataques de intermediario (man-in-the-middle).",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 4.2.1; OWASP Transport Layer Security"
  },
  {
    "id": 66,
    "code": "PCI-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Listado de Directorio Abierto",
    "description": "Los directorios del servidor como /wp-content/uploads/ son navegables, exponiendo archivos subidos, documentos internos y datos potencialmente sensibles. El listado de directorios debe estar deshabilitado en todas las rutas accesibles por web.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 2.2.7; CIS Apache Benchmark"
  },
  {
    "id": 67,
    "code": "PCI-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Punto de Acceso XML-RPC Habilitado",
    "description": "El punto de acceso XML-RPC de WordPress (xmlrpc.php) es accesible públicamente y responde a solicitudes. Este punto de acceso es un vector conocido para ataques de amplificación de fuerza bruta y abuso de DDoS.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.3.3; CVE-2015-5623"
  },
  {
    "id": 68,
    "code": "PCI-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "CMS Desactualizado con CVEs Conocidas",
    "description": "El sistema de gestión de contenidos (WordPress, Magento, Drupal) está ejecutando una versión desactualizada con vulnerabilidades de seguridad divulgadas públicamente. Las instalaciones de CMS sin parches son el vector principal para compromisos de sitios web.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.3.1; Req. 6.3.3"
  },
  {
    "id": 69,
    "code": "PCI-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Scripts de Terceros Sin SRI",
    "description": "Los archivos JavaScript externos se cargan sin hashes de Subresource Integrity (SRI). Si un CDN de terceros o host de scripts es comprometido, código malicioso podría inyectarse en la página sin detección.",
    "severity": "moderate",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; W3C SRI Specification"
  },
  {
    "id": 70,
    "code": "PCI-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Formularios Sin Protección CAPTCHA",
    "description": "Los formularios de contacto, páginas de inicio de sesión y formularios de registro carecen de mecanismos CAPTCHA o de detección de bots. Los formularios sin protección son vulnerables al stuffing de credenciales, inyección de spam y abuso automatizado a gran escala.",
    "severity": "advisory",
    "reference": "PCI-DSS v4.0 Req. 6.2.4; OWASP Automated Threats"
  },
  {
    "id": 71,
    "code": "STATE-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CIPA: Grabación de Chatbot Sin Consentimiento",
    "description": "Un chatbot de terceros graba y almacena transcripciones de conversaciones sin informar a los usuarios y obtener su consentimiento. Bajo la Ley de Invasión de Privacidad de California (CIPA), esto constituye interceptación ilegal de comunicaciones con una multa de $5,000 por diálogo.",
    "severity": "critical",
    "reference": "Cal. Penal Code § 631; § 632.7 (CIPA)"
  },
  {
    "id": 72,
    "code": "STATE-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "BIPA: Prueba Virtual Sin Consentimiento Biométrico",
    "description": "Una función de prueba virtual o escaneo facial recopila identificadores biométricos sin obtener el consentimiento escrito informado requerido por BIPA de Illinois. Las violaciones conllevan daños estatutarios de $1,000–$5,000 por escaneo.",
    "severity": "critical",
    "reference": "740 ILCS 14/15 (Illinois BIPA)"
  },
  {
    "id": 73,
    "code": "STATE-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Ley de IA de Utah: Chatbot de IA No Divulga su Identidad de IA",
    "description": "Un chatbot o asistente virtual impulsado por IA no se identifica como inteligencia artificial cuando un usuario lo pregunta directamente. La Ley de Política de IA de Utah requiere que los sistemas de IA revelen su naturaleza no humana ante una consulta.",
    "severity": "serious",
    "reference": "Utah Code § 13-72 (Utah AI Policy Act 2024)"
  },
  {
    "id": 74,
    "code": "STATE-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Ley BOT de CA: IA Usando Nombre Humano Sin Divulgación",
    "description": "Un chatbot de IA o cuenta automatizada usa un nombre humano, avatar o persona sin revelar que no es humano. La Ley BOT de California (SB 1001) requiere una divulgación clara cuando la IA se hace pasar por un humano en interacciones en línea.",
    "severity": "critical",
    "reference": "Cal. Bus. & Prof. Code § 17941 (SB 1001)"
  },
  {
    "id": 75,
    "code": "STATE-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Proposición 65: Falta de Advertencia de Sustancia Tóxica",
    "description": "Los productos enviados a California contienen químicos listados bajo la Proposición 65 sin la advertencia requerida de \"conocido por causar cáncer o daño reproductivo\". Las violaciones conllevan multas de $2,500 por día por violación.",
    "severity": "serious",
    "reference": "Cal. Health & Safety Code § 25249.6 (Proposition 65)"
  },
  {
    "id": 76,
    "code": "STATE-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "CA Auto-Renewal: Sin Recordatorio Antes del Cargo Anual",
    "description": "Las suscripciones anuales se renuevan sin enviar un correo electrónico de recordatorio antes del cargo. La Ley de Renovación Automática de California exige que las empresas proporcionen un recordatorio claro con instrucciones de cancelación antes de cada renovación.",
    "severity": "serious",
    "reference": "Cal. Bus. & Prof. Code § 17601 (ARL)"
  },
  {
    "id": 77,
    "code": "STATE-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Verificación de Edad Inadecuada para Productos Restringidos",
    "description": "La verificación de edad para productos de alcohol, vape o CBD se basa en un simple botón \"Sí, tengo 21\" sin verificación real de identidad. Múltiples estados requieren una verificación de edad robusta más allá de la auto-declaración para la venta de productos restringidos.",
    "severity": "moderate",
    "reference": "State Alcohol Control Acts; 27 CFR § 6"
  },
  {
    "id": 78,
    "code": "STATE-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "SB 478: Tarifas de Servicio Ocultas en el Pago",
    "description": "Las tarifas obligatorias, cargos por servicio o recargos se revelan solo en el pago en lugar de incluirse en el precio anunciado. La SB 478 de California (Prohibición de Tarifas Ocultas) prohíbe las tarifas ocultas no divulgadas de antemano.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1770(a)(29) (SB 478)"
  },
  {
    "id": 79,
    "code": "STATE-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "NY SHIELD Act: Seguridad de Datos Inadecuada",
    "description": "La empresa recopila información privada de residentes de Nueva York sin implementar salvaguardas razonables de seguridad de datos según lo exige la Ley SHIELD. Las salvaguardas administrativas, técnicas y físicas deben estar documentadas.",
    "severity": "moderate",
    "reference": "NY Gen. Bus. Law § 899-bb (SHIELD Act)"
  },
  {
    "id": 80,
    "code": "STATE-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Publicaciones de Empleo Sin Rango Salarial",
    "description": "Los listados de empleo no incluyen rangos de compensación según lo requieren las leyes de transparencia salarial en California, Nueva York, Colorado y Washington. Las penalizaciones van hasta $10,000 por publicación no conforme.",
    "severity": "advisory",
    "reference": "Cal. Lab. Code § 432.3; NY Lab. Law § 194-b; CO SB 19-085"
  },
  {
    "id": 81,
    "code": "FIN-001",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "GLBA: Documentos Financieros Sensibles vía Email No Seguro",
    "description": "La empresa acepta documentos financieros sensibles (declaraciones de impuestos, estados de cuenta bancarios, SSN) a través de correo electrónico estándar sin cifrar. La Regla de Salvaguardas de GLBA requiere que las instituciones financieras implementen métodos de transmisión seguros para los datos de los clientes.",
    "severity": "critical",
    "reference": "16 CFR § 314 (GLBA Safeguards Rule)"
  },
  {
    "id": 82,
    "code": "FIN-002",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FinCEN BOI: Informe de Propiedad Beneficiaria Faltante",
    "description": "La LLC o corporación no ha presentado un informe de Información de Propiedad Beneficiaria ante FinCEN según lo exige la Ley de Transparencia Corporativa. El incumplimiento conlleva multas de $500 por día, hasta $10,000, más posible responsabilidad penal.",
    "severity": "critical",
    "reference": "31 U.S.C. § 5336; 31 CFR § 1010.380 (CTA/BOI)"
  },
  {
    "id": 83,
    "code": "FIN-003",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "FINRA: Email Personal para Comunicaciones de Inversión",
    "description": "Un asesor de inversiones o corredor de bolsa utiliza Gmail personal o correo electrónico no archivado para comunicaciones con clientes en lugar de un sistema de correo corporativo supervisado y archivado. FINRA requiere la retención y supervisión de todas las comunicaciones comerciales.",
    "severity": "critical",
    "reference": "FINRA Rule 3110; SEC Rule 17a-4"
  },
  {
    "id": 84,
    "code": "FIN-004",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Número de Licencia de Contratista Faltante en el Sitio Web",
    "description": "El sitio web de un contratista con licencia no muestra el número de licencia de contratista estatal. La mayoría de los estados requieren que el número de licencia aparezca en toda la publicidad y comunicaciones comerciales, con multas de $2,000–$5,000.",
    "severity": "serious",
    "reference": "Cal. Bus. & Prof. Code § 7030.5; State Contractor License Acts"
  },
  {
    "id": 85,
    "code": "FIN-005",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Sin Agente DMCA o Política de Eliminación",
    "description": "El sitio web no tiene un agente DMCA registrado ante la Oficina de Derechos de Autor de EE.UU. y no publica una página de política de eliminación DMCA. Sin estos, la empresa pierde la protección de puerto seguro para el contenido generado por usuarios.",
    "severity": "serious",
    "reference": "17 U.S.C. § 512(c)(2) (DMCA Safe Harbor)"
  },
  {
    "id": 86,
    "code": "FIN-006",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Cláusula de Arbitraje Faltante en los Términos de Servicio",
    "description": "Los Términos de Servicio carecen de una exención de acción colectiva y cláusula de arbitraje obligatoria. Sin estas disposiciones, la empresa está expuesta a litigios de acción colectiva por cualquier disputa con el consumidor.",
    "severity": "serious",
    "reference": "9 U.S.C. § 2 (Federal Arbitration Act)"
  },
  {
    "id": 87,
    "code": "FIN-007",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Política de Devolución No Mostrada de Manera Prominente",
    "description": "La ley de California requiere que una política de no devolución o devolución limitada se muestre de manera conspicua en el punto de venta. Si no se muestra, los consumidores tienen derecho a un reembolso completo dentro de los 30 días independientemente de la política prevista por el comerciante.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1723"
  },
  {
    "id": 88,
    "code": "FIN-008",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Recargo con Tarjeta de Crédito Sin Aviso Previo",
    "description": "Se agrega un recargo o tarifa de conveniencia con tarjeta de crédito en el pago sin aviso previo en el punto de entrada. Múltiples estados requieren señalización/divulgación previa, y las reglas de las redes de tarjetas limitan los recargos al 3% con divulgación obligatoria.",
    "severity": "moderate",
    "reference": "Visa Core Rules § 5.6.2; State Surcharge Statutes"
  },
  {
    "id": 89,
    "code": "FIN-009",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "SEC Form CRS Faltante para Asesores de Inversiones",
    "description": "El sitio web de un asesor de inversiones registrado no publica el Formulario CRS (Resumen de Relación con el Cliente) según lo exige la Regulación Best Interest de la SEC. El Formulario CRS debe entregarse a los inversores minoristas y ponerse a disposición del público.",
    "severity": "moderate",
    "reference": "SEC Rule 17a-14; Regulation Best Interest"
  },
  {
    "id": 90,
    "code": "FIN-010",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Generación de Leads de Seguros Sin las Divulgaciones Requeridas",
    "description": "El sitio web genera cotizaciones o leads de seguros sin las divulgaciones requeridas por el estado sobre la naturaleza del servicio, los arreglos de compensación y el estado de licencia. Múltiples estados requieren divulgaciones específicas para los generadores de leads de seguros.",
    "severity": "advisory",
    "reference": "State Insurance Codes; NAIC Producer Licensing Model Act"
  },
  {
    "id": 91,
    "code": "OPS-001",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Registro DMARC Faltante",
    "description": "El dominio carece de un registro DNS DMARC (Domain-based Message Authentication, Reporting & Conformance). Sin DMARC, los correos electrónicos son cada vez más rechazados o enviados a la carpeta de spam por Gmail, Yahoo y otros proveedores principales que aplican políticas DMARC.",
    "severity": "critical",
    "reference": "RFC 7489; Google/Yahoo Sender Requirements 2024"
  },
  {
    "id": 92,
    "code": "OPS-002",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Registro SPF Faltante",
    "description": "El dominio no tiene un registro DNS SPF (Sender Policy Framework), lo que lo hace vulnerable a la suplantación de correo electrónico. Los atacantes pueden enviar correos que parecen provenir del dominio, permitiendo ataques de phishing contra clientes y socios.",
    "severity": "critical",
    "reference": "RFC 7208; Google Sender Guidelines 2024"
  },
  {
    "id": 93,
    "code": "OPS-003",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Enlaces Salientes Rotos a Dominios Expirados",
    "description": "El sitio web contiene enlaces que apuntan a dominios expirados, aparcados o potencialmente maliciosos. Los enlaces salientes rotos dañan la autoridad SEO y pueden redirigir a los usuarios a sitios de phishing o malware si el dominio expirado es registrado nuevamente por actores malintencionados.",
    "severity": "serious",
    "reference": "Google Search Quality Guidelines; OWASP Broken Link Hijacking"
  },
  {
    "id": 94,
    "code": "OPS-004",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Scripts de Seguimiento Huérfanos de Servicios Descontinuados",
    "description": "El sitio web carga JavaScript de servicios que han sido descontinuados, adquiridos o abandonados. Estos scripts zombis desperdician tiempo de carga de página, pueden romper la funcionalidad y representan un riesgo de seguridad en la cadena de suministro si el dominio es registrado nuevamente.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3; OWASP Supply Chain Security"
  },
  {
    "id": 95,
    "code": "OPS-005",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de Autenticación de Correo DKIM",
    "description": "El dominio no publica registros DKIM (DomainKeys Identified Mail) para la autenticación de correo electrónico. Sin DKIM, los servidores de correo receptores no pueden verificar que el contenido del correo no haya sido alterado en tránsito, reduciendo la entregabilidad.",
    "severity": "critical",
    "reference": "RFC 6376; Google/Yahoo Sender Requirements 2024"
  },
  {
    "id": 96,
    "code": "OPS-006",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Año de Copyright Desactualizado en el Pie de Página",
    "description": "El pie de página del sitio web muestra un año de copyright desactualizado, señalando a visitantes, motores de búsqueda y posibles litigantes que el sitio puede estar abandonado o sin mantenimiento. Esto erosiona la confianza y puede impactar negativamente las clasificaciones de búsqueda.",
    "severity": "serious",
    "reference": "Google Search Quality Evaluator Guidelines § 4.5"
  },
  {
    "id": 97,
    "code": "OPS-007",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de robots.txt y Sitemap",
    "description": "El sitio web carece de un archivo robots.txt y/o un sitemap XML. Sin estos, los motores de búsqueda pueden rastrear el sitio de manera ineficiente, indexar páginas sensibles o perder contenido importante por completo, impactando directamente la visibilidad en búsquedas orgánicas.",
    "severity": "moderate",
    "reference": "RFC 9309 (robots.txt); Sitemaps.org Protocol"
  },
  {
    "id": 98,
    "code": "OPS-008",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Objetivos de Toque Móvil Deficientes",
    "description": "Los elementos interactivos (botones, enlaces, campos de formulario) son más pequeños que 48x48 píxeles CSS o están posicionados demasiado cerca unos de otros, causando toques erróneos frecuentes en dispositivos móviles. Esto es tanto un problema de UX como una violación de accesibilidad WCAG 2.5.5.",
    "severity": "moderate",
    "reference": "WCAG 2.5.8; Google Mobile Usability Guidelines"
  },
  {
    "id": 99,
    "code": "OPS-009",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Formulario de Contacto Sin Limitación de Tasa",
    "description": "El formulario de contacto no tiene limitación de tasa, honeypot ni mecanismo de prevención de abuso. Los formularios sin protección son rutinariamente explotados para inyección de spam, retransmisión de phishing y ataques de denegación de servicio contra el manejador del formulario.",
    "severity": "moderate",
    "reference": "OWASP Automated Threats; PCI-DSS v4.0 Req. 6.2.4"
  },
  {
    "id": 100,
    "code": "OPS-010",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Certificado SSL Faltante o Expirado",
    "description": "El sitio web carece de un certificado SSL/TLS válido o el certificado ha expirado. Los navegadores muestran advertencias de seguridad prominentes que ahuyentan a los visitantes, y los motores de búsqueda penalizan los sitios sin HTTPS en las clasificaciones.",
    "severity": "advisory",
    "reference": "PCI-DSS v4.0 Req. 4.2.1; Google HTTPS Ranking Signal"
  },
  {
    "id": 101,
    "code": "ADA-101",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de Información de Accesibilidad en Productos/Servicios",
    "description": "Los servicios digitales regulados por la EAA no proporcionan información y características de accesibilidad claras en su interfaz digital, violando los requisitos de la Directiva (UE) 2019/882 para el comercio electrónico y la banca.",
    "severity": "serious",
    "reference": "Directive (EU) 2019/882 Art. 4"
  },
  {
    "id": 102,
    "code": "ADA-102",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Procesos de Retroalimentación Pública No Conformes",
    "description": "El mecanismo de retroalimentación del sitio web no es accesible para personas con discapacidades, violando los estándares de servicio al cliente de AODA para organizaciones con sede en Ontario.",
    "severity": "moderate",
    "reference": "AODA IASR Sec. 7"
  },
  {
    "id": 103,
    "code": "COP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Recopilación Ilegal de Información Personal de Niños",
    "description": "El sitio web recopila datos personales (nombres, correos electrónicos, cookies de seguimiento) de usuarios menores de 13 años sin obtener el consentimiento parental verificable, violando las regulaciones de COPPA.",
    "severity": "critical",
    "reference": "16 CFR Part 312 (COPPA)"
  },
  {
    "id": 104,
    "code": "PIP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de Información de Contacto del Oficial de Privacidad Mandatado",
    "description": "El sitio web dirigido a Canadá no publica el nombre o la información de contacto del Oficial de Privacidad designado responsable del cumplimiento de PIPEDA.",
    "severity": "moderate",
    "reference": "PIPEDA Schedule 1 Sec. 4.1"
  },
  {
    "id": 105,
    "code": "PIP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Propósitos Vagamente Definidos para la Recopilación de Datos Personales",
    "description": "Los campos de formulario recopilan datos sin identificar claramente el propósito específico y limitado de la recopilación en el momento de la misma o antes, según los requisitos de PIPEDA.",
    "severity": "serious",
    "reference": "PIPEDA Schedule 1 Sec. 4.2"
  },
  {
    "id": 106,
    "code": "LGP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Sin Oficial de Protección de Datos (DPO) Designado",
    "description": "El sitio dirigido a Brasil no identifica ni proporciona detalles de contacto para su DPO (Encarregado) en el sitio web, violando el Artículo 41 de la LGPD.",
    "severity": "serious",
    "reference": "LGPD Art. 41"
  },
  {
    "id": 107,
    "code": "LGP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Ausencia de una Base Legal Válida para el Procesamiento",
    "description": "El sitio web procesa datos personales sin listar la base legal explícita (por ejemplo, consentimiento, interés legítimo) para cada actividad de procesamiento según la LGPD.",
    "severity": "critical",
    "reference": "LGPD Art. 7"
  },
  {
    "id": 108,
    "code": "POP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Marketing Directo Sin Consentimiento de Opt-In",
    "description": "El sitio web implementa casillas de consentimiento pre-marcadas o formularios de opt-out para marketing directo electrónico, violando las regulaciones de opt-in de POPIA para consumidores sudafricanos.",
    "severity": "critical",
    "reference": "POPIA Sec. 69"
  },
  {
    "id": 109,
    "code": "POP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Divulgaciones Ilegales de Transferencia de Datos Transfronteriza",
    "description": "El sitio web sudafricano transfiere datos personales fuera de Sudáfrica sin garantizar que el país receptor tenga leyes adecuadas de protección de datos o sin divulgarlo al usuario.",
    "severity": "serious",
    "reference": "POPIA Sec. 72"
  },
  {
    "id": 110,
    "code": "APP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Declaración de Divulgación de Datos en el Extranjero No Conforme",
    "description": "El sitio dirigido a Australia no indica en su política de privacidad si es probable que divulgue información personal a destinatarios en el extranjero y, en caso afirmativo, en qué países.",
    "severity": "serious",
    "reference": "APP 1.4(g)"
  },
  {
    "id": 111,
    "code": "APP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de Opción de Interacción Anónima/Pseudónima",
    "description": "El sitio web obliga a los usuarios a identificarse para consultas generales cuando no es necesario práctica o legalmente, violando el Principio de Privacidad Australiano 2.",
    "severity": "moderate",
    "reference": "APP 2"
  },
  {
    "id": 112,
    "code": "PDP-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falla al Proporcionar Información de Solicitud de Acceso/Corrección",
    "description": "El sitio singapurense no especifica cómo los usuarios pueden solicitar acceso o corrección de sus datos personales en sus divulgaciones de privacidad.",
    "severity": "serious",
    "reference": "PDPA Sec. 21 & 22"
  },
  {
    "id": 113,
    "code": "PDP-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Términos Irrazonables que Forzan el Consentimiento de Datos Personales",
    "description": "El sitio web requiere consentimiento para recopilar datos personales más allá de lo razonable para proporcionar el producto o servicio, violando los requisitos de consentimiento de PDPA.",
    "severity": "serious",
    "reference": "PDPA Sec. 14(2)"
  },
  {
    "id": 114,
    "code": "AIA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Salida de IA Generativa / Deepfakes Sin Marcar",
    "description": "El sitio web presenta texto, audio o video generado por IA (deepfakes) sin marcarlo en un formato legible por máquina como generado por IA, violando las reglas de transparencia de la Ley de IA de la UE.",
    "severity": "critical",
    "reference": "AI Act Art. 52(3)"
  },
  {
    "id": 115,
    "code": "AIA-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de Divulgación sobre Interacción con Usuario de IA",
    "description": "El sitio web utiliza un sistema de IA (como un chatbot de soporte al cliente) para interactuar con personas naturales sin informarles que están interactuando con una IA, violando los mandatos de transparencia.",
    "severity": "critical",
    "reference": "AI Act Art. 52(1)"
  },
  {
    "id": 116,
    "code": "DSA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Patrones de UI Engañosos (Patrones Oscuros) en el Diseño",
    "description": "El sitio web emplea patrones oscuros que distorsionan o perjudican la capacidad del usuario para tomar decisiones autónomas e informadas (por ejemplo, flujos de cancelación de suscripción difíciles, popups de consentimiento engañosos).",
    "severity": "critical",
    "reference": "DSA Art. 25"
  },
  {
    "id": 117,
    "code": "DSA-102",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de Punto Único de Contacto para Autoridades",
    "description": "El proveedor de servicios digitales no publica un punto de contacto único directo, electrónico y fácilmente accesible para comunicaciones con autoridades de la UE.",
    "severity": "serious",
    "reference": "DSA Art. 11"
  },
  {
    "id": 118,
    "code": "DMA-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Combinación Ilegal de Datos a Través de Servicios",
    "description": "Las plataformas a escala de gatekeeper combinan datos personales de su plataforma principal con datos de otros servicios sin el consentimiento específico del usuario, violando las regulaciones de DMA.",
    "severity": "critical",
    "reference": "DMA Art. 5(2)"
  },
  {
    "id": 119,
    "code": "STA-101",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Diseño Engañoso que Fomenta el Compartir Datos de Niños",
    "description": "El sitio web utiliza patrones oscuros para incitar a los niños a proporcionar información personal más allá de lo necesario, violando los requisitos de California AB 2273.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 120,
    "code": "STA-102",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Ausencia de Proceso de Derechos de Apelación del Consumidor",
    "description": "La política de privacidad no explica el proceso para que los consumidores apelen una negativa a tomar acción sobre una solicitud de derechos de privacidad, violando VCDPA de Virginia y TDPSA de Texas.",
    "severity": "serious",
    "reference": "Va. Code § 59.1-573 / Tex. Bus. & Com. Code § 541.104"
  },
  {
    "id": 121,
    "code": "STA-103",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de Opt-In para el Procesamiento de Datos Sensibles",
    "description": "El sitio web procesa datos personales sensibles (por ejemplo, geolocalización precisa, datos de salud, información racial) sin obtener consentimiento afirmativo de opt-in de residentes de Colorado o Virginia.",
    "severity": "critical",
    "reference": "Colo. Rev. Stat. § 6-1-1308 / Va. Code § 59.1-574"
  },
  {
    "id": 122,
    "code": "NYD-101",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de Autenticación Multifactor (MFA) de Ciberseguridad",
    "description": "El sitio web de servicios financieros no aplica autenticación multifactor para el acceso al correo electrónico corporativo o bases de datos del portal de clientes, violando los requisitos de NY DFS.",
    "severity": "critical",
    "reference": "23 NYCRR Section 500.12"
  },
  {
    "id": 123,
    "code": "NYD-102",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falla al Implementar Salvaguardas para Datos Privados",
    "description": "El sitio dirigido a Nueva York no mantiene salvaguardas administrativas, físicas y técnicas para la información personal, violando la Ley SHIELD de NY.",
    "severity": "serious",
    "reference": "N.Y. Gen. Bus. Law § 899-bb"
  },
  {
    "id": 124,
    "code": "QBL-101",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Sin Evaluación de Impacto de Privacidad (PIA) para Transferencia",
    "description": "El sitio web transfiere información personal fuera de Quebec sin realizar una Evaluación de Impacto de Privacidad obligatoria, violando la Ley 25.",
    "severity": "serious",
    "reference": "Quebec Law 25 Sec. 17"
  },
  {
    "id": 125,
    "code": "DOR-101",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Divulgaciones Inadecuadas de Riesgo de Terceros de TIC",
    "description": "La entidad financiera no mantiene un registro completo de información sobre sus acuerdos contractuales con proveedores de servicios de terceros de TIC, violando las directrices de DORA.",
    "severity": "critical",
    "reference": "DORA Regulation Art. 28"
  },
  {
    "id": 126,
    "code": "VPPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Píxel de Seguimiento de Video se Activa Sin Consentimiento VPPA",
    "description": "El sitio web incrusta contenido de video (video HTML5, iframes de YouTube, Vimeo) junto con Meta Pixel, Google Analytics u otros píxeles de seguimiento que transmiten datos de visualización de video a terceros sin obtener un consentimiento separado, explícito y por escrito. Bajo la VPPA, divulgar a sabiendas la PII de un consumidor vinculada a hábitos de visualización de video sin consentimiento previo es una violación.",
    "severity": "critical",
    "reference": "18 U.S.C. § 2710 (VPPA)"
  },
  {
    "id": 127,
    "code": "EAA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Sin Declaración de Accesibilidad Publicada Bajo la European Accessibility Act",
    "description": "El sitio web de comercio electrónico o servicio digital dirigido a consumidores de la UE carece de una declaración de accesibilidad públicamente accesible que describa el estado de conformidad con EN 301 549 / WCAG 2.1 AA. La European Accessibility Act (Directiva 2019/882), exigible desde el 28 de junio de 2025, exige que las empresas del sector privado que prestan servicios cubiertos publiquen declaraciones de accesibilidad.",
    "severity": "serious",
    "reference": "EU Directive 2019/882 (EAA), Art. 14"
  },
  {
    "id": 128,
    "code": "NIS2-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Sin security.txt ni Política de Divulgación de Vulnerabilidades (NIS2)",
    "description": "El sitio web de una entidad esencial o importante (energía, salud, transporte, infraestructura digital) carece de un archivo /.well-known/security.txt o de cualquier política de divulgación de vulnerabilidades de acceso público. La Directiva NIS2 exige que las entidades cubiertas implementen medidas de gestión de incidentes y vulnerabilidades.",
    "severity": "moderate",
    "reference": "EU Directive 2022/2555 (NIS2), Art. 21(2)(b)"
  },
  {
    "id": 129,
    "code": "HBNR-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Datos de Salud Compartidos Sin Cumplimiento de la FTC Health Breach Notification Rule",
    "description": "Un sitio web o aplicación de salud no-HIPAA (bienestar, fitness, comprobador de síntomas) recopila información de salud identificable y la transmite a plataformas de análisis/publicidad de terceros sin mostrar una política de notificación de brechas. La FTC Health Breach Notification Rule (modificada en julio de 2024) considera el intercambio no autorizado de datos de salud como una brecha.",
    "severity": "critical",
    "reference": "16 CFR Part 318 (FTC Health Breach Notification Rule, 2024)"
  },
  {
    "id": 130,
    "code": "CKWL-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Muro de Cookies Bloquea el Acceso Sin Opción Válida de Rechazo",
    "description": "El sitio web muestra un banner de consentimiento de cookies que bloquea todo el acceso al contenido hasta que se aceptan las cookies, sin una opción clara y funcional para rechazar.",
    "severity": "serious",
    "reference": "GDPR Art. 7(4); ePrivacy Directive Art. 5(3); EDPB Opinion 08/2024"
  },
  {
    "id": 131,
    "code": "CTDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Datos de Menores Usados para Publicidad Dirigida Sin Opt-In (CTDPA)",
    "description": "El sitio web dirige contenido a menores (menores de 18 años) o recopila datos de edad que indican usuarios menores, pero continúa activando píxeles de publicidad dirigida sin obtener consentimiento afirmativo de opt-in. Connecticut SB 3 (que modifica la CTDPA) prohíbe el procesamiento de datos de menores para publicidad dirigida o elaboración de perfiles sin consentimiento explícito.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3), amending CTDPA §§ 42-520"
  },
  {
    "id": 132,
    "code": "OCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "El Sitio Web No Honra la Señal Global Privacy Control (Oregon CPA)",
    "description": "El sitio web dirigido a consumidores de Oregón no detecta ni honra la señal de navegador Global Privacy Control (GPC) como una solicitud válida de exclusión para publicidad dirigida y ventas de datos personales. La Oregon Consumer Privacy Act exige el reconocimiento de señales universales de preferencia de exclusión a partir del 1 de enero de 2026.",
    "severity": "serious",
    "reference": "ORS 646A.570–646A.589 (Oregon Consumer Privacy Act)"
  },
  {
    "id": 133,
    "code": "COAI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Sistema de IA de Alto Riesgo Sin Divulgación Pública de Transparencia (Colorado AI Act)",
    "description": "El sitio web utiliza sistemas impulsados por IA para decisiones trascendentales (contratación, préstamos, seguros, vivienda) pero carece de una declaración de acceso público que divulgue qué sistemas de IA de alto riesgo están implementados y cómo se gestionan los riesgos de discriminación algorítmica. Colorado SB 24-205 exige que los implementadores mantengan dichas divulgaciones.",
    "severity": "moderate",
    "reference": "Colorado SB 24-205 (Colorado AI Act), §§ 6-1-1701"
  },
  {
    "id": 134,
    "code": "JPAP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Datos de Cookies Compartidos con Terceros Sin Divulgación Japan APPI",
    "description": "El sitio web dirigido a usuarios japoneses transfiere datos de cookies/seguimiento a proveedores de publicidad o análisis de terceros que pueden combinarlos para identificar individuos, sin divulgar estas transferencias ni confirmar el consentimiento de terceros. El APPI de Japón y la Telecommunications Business Act exigen transparencia y confirmación de consentimiento para tales transferencias.",
    "severity": "serious",
    "reference": "Japan APPI (Act No. 57 of 2003, amended 2022), Art. 31; Telecom Business Act, Art. 27-12"
  },
  {
    "id": 135,
    "code": "KRPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Cookies No Esenciales Configuradas Antes del Consentimiento para Usuarios de Corea del Sur",
    "description": "El sitio web dirigido a usuarios de Corea del Sur configura cookies de seguimiento o publicidad antes de obtener consentimiento explícito e informado. La PIPA de Corea del Sur exige consentimiento previo de opt-in antes de recopilar información personal, incluidos datos de seguimiento conductual. Las violaciones conllevan multas de hasta el 3% de los ingresos totales.",
    "severity": "serious",
    "reference": "South Korea PIPA, Art. 15, Art. 17"
  },
  {
    "id": 136,
    "code": "FERP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Píxeles de Seguimiento en Sitios Web Educativos que Transmiten Datos de Estudiantes",
    "description": "El sitio web de una institución educativa incrusta Meta Pixel, Google Analytics u otras tecnologías de seguimiento en páginas orientadas a estudiantes (portales, formularios de inscripción, catálogos de cursos) que transmiten datos potencialmente identificables de estudiantes a terceros. FERPA prohíbe la divulgación no autorizada de PII de registros educativos.",
    "severity": "critical",
    "reference": "20 U.S.C. § 1232g (FERPA); 34 CFR Part 99"
  },
  {
    "id": 137,
    "code": "ESIG-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Flujo de Consentimiento E-Sign Carece de las Divulgaciones Requeridas por la ESIGN Act",
    "description": "El sitio web utiliza firmas o acuerdos electrónicos para transacciones pero no proporciona las divulgaciones previas al consentimiento requeridas, incluyendo: el derecho a recibir copias en papel, el derecho a retirar el consentimiento y los procedimientos para hacerlo, y los requisitos de hardware/software para acceder a los registros.",
    "severity": "moderate",
    "reference": "15 U.S.C. §§ 7001–7006 (E-SIGN Act), § 7001(c)"
  },
  {
    "id": 138,
    "code": "IDDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de Privacidad No Disponible en los Idiomas Requeridos (India DPDP Act)",
    "description": "El sitio web que recopila datos personales de usuarios indios no proporciona un aviso de privacidad en inglés y al menos uno de los 22 idiomas indios programados según lo exige la Digital Personal Data Protection Act 2023. El aviso debe incluir descripciones detalladas de los datos recopilados, los fines y los derechos de los usuarios.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023 (Act No. 22 of 2023), Sections 5–6"
  },
  {
    "id": 139,
    "code": "FACT-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Número Completo de Tarjeta de Crédito Mostrado en Recibo Electrónico (Violación de FACTA)",
    "description": "El sitio web muestra más de los últimos cinco dígitos de un número de tarjeta de crédito/débito o muestra la fecha de vencimiento en confirmaciones de pedidos electrónicas, recibos o páginas de cuenta. FACTA exige la truncación de los números de tarjeta a no más de cinco dígitos y prohíbe imprimir la fecha de vencimiento en recibos impresos electrónicamente.",
    "severity": "critical",
    "reference": "15 U.S.C. § 1681c(g) (FACTA, § 113)"
  },
  {
    "id": 140,
    "code": "DLDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Sin Mecanismo Claro de Opt-Out para Consumidores de Delaware (DPDPA)",
    "description": "El sitio web dirigido a consumidores de Delaware carece de un enlace de exclusión claro y visible para publicidad dirigida y ventas de datos personales, o no reconoce señales universales de exclusión (GPC). La Delaware Personal Data Privacy Act (vigente desde el 1 de enero de 2025) exige ambos mecanismos.",
    "severity": "serious",
    "reference": "Delaware DPDPA (HB 154, Chapter 12C, Title 6)"
  },
  {
    "id": 141,
    "code": "THPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Cookies No Esenciales Activadas Sin Consentimiento de Opt-In (Thailand PDPA)",
    "description": "El sitio web dirigido a usuarios tailandeses activa cookies no esenciales (análisis, publicidad, redes sociales) antes de obtener consentimiento explícito de opt-in mediante un banner de consentimiento conforme. La PDPA de Tailandia exige consentimiento expreso y activo de opt-in antes de procesar datos personales, incluidas las cookies. Las casillas pre-marcadas son explícitamente no conformes.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562 (2019), Sections 19, 23"
  },
  {
    "id": 142,
    "code": "SEC-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Registrante de la SEC Sin Divulgación de Gobernanza de Ciberseguridad",
    "description": "El sitio web de una empresa pública que informa a la SEC no incluye ni enlaza a las divulgaciones de gestión de riesgos de ciberseguridad (supervisión del consejo, experiencia de la dirección, procesos de evaluación de riesgos) según lo requerido en los archivos 10-K. Los sitios web corporativos deben hacer referencia o enlazar a estas divulgaciones para el cumplimiento de relaciones con inversores.",
    "severity": "moderate",
    "reference": "SEC Final Rule 33-11216 (2023); Regulation S-K, Item 106"
  },
  {
    "id": 143,
    "code": "TRKV-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de Registro de Controlador de Datos Faltante (Turkey KVKK)",
    "description": "El sitio web que procesa datos personales de residentes turcos no divulga la identidad del controlador de datos, el número de registro VERBIS (Registro de Controladores de Datos) ni proporciona un aviso de privacidad conforme que identifique los fines del procesamiento, las transferencias a terceros y los derechos de los titulares de datos según los requisitos de KVKK.",
    "severity": "serious",
    "reference": "Turkey Law No. 6698 (KVKK), Art. 10, Art. 16"
  },
  {
    "id": 144,
    "code": "NZPR-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia Transfronteriza de Datos Sin Cumplimiento de NZ Privacy Act IPP 12",
    "description": "El sitio web recopila datos personales de usuarios de Nueva Zelanda y los transfiere al extranjero (evidenciado por scripts de seguimiento con sede en EE.UU./UE) sin divulgar en la política de privacidad que los datos pueden transferirse al extranjero y qué salvaguardas existen según el Information Privacy Principle 12.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 12"
  },
  {
    "id": 145,
    "code": "MNDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de Privacidad Sin Períodos de Retención de Datos (Minnesota MCDPA)",
    "description": "El sitio web dirigido a consumidores de Minnesota tiene una política de privacidad que no divulga los períodos o políticas de retención de datos personales recopilados. La Minnesota Consumer Data Privacy Act (vigente desde el 31 de julio de 2025) exige de forma única la divulgación de la política de retención en el aviso de privacidad.",
    "severity": "moderate",
    "reference": "Minnesota MCDPA (HF 2309), § 325O"
  },
  {
    "id": 146,
    "code": "EIDS-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Plataforma en Línea Muy Grande No Preparada para la Aceptación de EUDI Wallet",
    "description": "Una Plataforma en Línea Muy Grande (VLOP) que requiere autenticación fuerte del cliente para inicio de sesión, verificación de edad o KYC no admite ni indica preparación para la aceptación de EU Digital Identity Wallet. eIDAS 2.0 exige que las VLOPs acepten EUDI Wallet para diciembre de 2027.",
    "severity": "advisory",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 12b"
  },
  {
    "id": 147,
    "code": "AMLK-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Aviso de Identificación de Cliente AML/KYC Faltante en Sitio Financiero",
    "description": "El sitio web de una institución financiera, fintech o negocio de servicios monetarios que abre cuentas en línea no muestra la notificación requerida al cliente que explica que se recopila información personal para cumplir con los requisitos federales de verificación de identidad (CIP) bajo la USA PATRIOT Act/BSA.",
    "severity": "serious",
    "reference": "31 U.S.C. § 5318(l); 31 CFR § 1020.220(a)(5) (BSA/PATRIOT Act CIP)"
  },
  {
    "id": 148,
    "code": "CTHL-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Geocercado Cerca de Instalación de Salud para Recopilación de Datos (CT SB 3)",
    "description": "El sitio web o aplicación móvil asociada utiliza tecnología de geocercado dentro de 1.750 pies de una instalación de salud mental, reproductiva o sexual para identificar, rastrear o enviar notificaciones push a consumidores con fines de recopilación de datos de salud. Connecticut SB 3 prohíbe específicamente esta práctica.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3), § 4(d)"
  },
  {
    "id": 149,
    "code": "IDDG-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Mecanismo de Resolución de Quejas Faltante para Titulares de Datos Indios",
    "description": "El sitio web que recopila datos personales de usuarios indios no proporciona los datos de contacto de un oficial de quejas designado ni un mecanismo de quejas para los titulares de datos. La India DPDP Act 2023 exige que los Fiduciarios de Datos establezcan un mecanismo accesible de resolución de quejas en su sitio web.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023, Section 8(10); IT Act 2000, Rule 5(9)"
  },
  {
    "id": 150,
    "code": "CBAC-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Banner de Consentimiento de Cookies Usa Diseño Asimétrico de Aceptar/Rechazar",
    "description": "El banner de consentimiento de cookies del sitio web hace que la opción de aceptar sea más prominente o fácil que la de rechazar, creando un diseño asimétrico que influye indebidamente en la elección del usuario.",
    "severity": "serious",
    "reference": "GDPR Art. 7(4), Art. 4(11); ePrivacy Art. 5(3); CNIL Deliberation 2023-010"
  },
  {
    "id": 151,
    "code": "CUBI-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Captura biométrica sin notificación previa y consentimiento (Texas CUBI)",
    "description": "El sitio web captura identificadores biométricos (como escaneos de geometría facial de pruebas virtuales o fotos, o huellas de voz) sin informar al individuo antes de la captura y sin obtener su consentimiento explícito, violando la ley CUBI de Texas.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 503.001"
  },
  {
    "id": 152,
    "code": "EUAI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de metadatos/marca de agua legible por máquina en contenido generado por IA (EU AI Act)",
    "description": "Los proveedores de sistemas de IA que generen o manipulen imágenes, audio o video (contenido sintético/deepfakes) deben garantizar que los resultados estén marcados en un formato legible por máquina para detectar su origen artificial según la Ley de IA de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(3)"
  },
  {
    "id": 153,
    "code": "QC25-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de datos de contacto del Delegado de Protección de Datos (DPO) en el sitio web (Quebec Act 25)",
    "description": "El sitio web que recopila información personal de residentes de Quebec no publica el cargo y los datos de contacto de la persona a cargo de la protección de la información personal (DPO/Responsable), violando la Sección 3.1 de la Ley 25 de Quebec.",
    "severity": "serious",
    "reference": "Quebec Act respecting the protection of personal information in the private sector (Act 25), Section 3.1 & 60.1"
  },
  {
    "id": 154,
    "code": "COPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "No reconocimiento de la señal universal de exclusión voluntaria GPC (Colorado CPA)",
    "description": "El sitio web dirigido a los consumidores de Colorado no reconoce ni procesa la señal de exclusión universal Global Privacy Control (GPC) para excluir automáticamente a los usuarios del procesamiento de sus datos con fines publicitarios, obligatorio desde el 1 de julio de 2024.",
    "severity": "serious",
    "reference": "4 CCR 904-3 (Colorado Privacy Act Rules), Rule 5.05 & 5.06"
  },
  {
    "id": 155,
    "code": "MHMDA-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Enlace a la Política de privacidad de datos de salud del consumidor ausente en la página de inicio (WA MHMDA)",
    "description": "El sitio web que recopila datos de salud de los consumidores (por ejemplo, búsquedas de síntomas, rastreadores de bienestar reproductivo o registros de acondicionamiento físico) no muestra un enlace separado y visible en el pie de página o encabezado con el texto exacto \"Consumer Health Privacy Policy\", como exige la ley MHMDA del estado de Washington.",
    "severity": "critical",
    "reference": "RCW 19.373.030(1)(a) (Washington MHMDA)"
  },
  {
    "id": 156,
    "code": "CNPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento separado para el procesamiento de información personal confidencial (China PIPL)",
    "description": "El sitio web dirigido a residentes chinos recopila información personal confidencial (como cuentas financieras, registros médicos, datos biométricos o ubicación precisa) sin obtener un consentimiento separado y específico para cada categoría de datos confidenciales, violando el artículo 29 de la PIPL.",
    "severity": "critical",
    "reference": "China Personal Information Protection Law (PIPL), Article 29 & 66"
  },
  {
    "id": 157,
    "code": "DSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Patrones oscuros en interfaces de usuario (EU DSA Article 25)",
    "description": "El sitio web utiliza técnicas de diseño engañosas o patrones oscuros que distorsionan, deterioran o manipulan la capacidad del usuario para tomar decisiones libres e informadas (por ejemplo, dificultar la cancelación de una suscripción en comparación con el registro), violando el artículo 25 de la DSA de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (Digital Services Act), Article 25"
  },
  {
    "id": 158,
    "code": "KRPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Consentimiento empaquetado para transferencias de datos a terceros (South Korea PIPA)",
    "description": "El sitio web recopila datos personales de residentes de Corea del Sur y los comparte con terceros (redes publicitarias, CRM, análisis), pero agrupa este acuerdo en la política de privacidad general o en los términos de servicio, en lugar de obtener un consentimiento separado, violando el artículo 17 de la PIPA de Corea del Sur.",
    "severity": "serious",
    "reference": "Personal Information Protection Act of South Korea (PIPA), Article 15, 17 & 75"
  },
  {
    "id": 159,
    "code": "UKOSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Verificación de edad inadecuada para contenido regulado (UK OSA)",
    "description": "El sitio web publica contenido perjudicial para los niños (como contenido para adultos, juegos de azar o contenido violento altamente sensible) pero no implementa una verificación de edad robusta, confiando en simples clics de declaración \"Tengo 18 años\", violando la Ley de Seguridad en Línea del Reino Unido.",
    "severity": "critical",
    "reference": "UK Online Safety Act 2023, Sections 11 & 12"
  },
  {
    "id": 160,
    "code": "EUAI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación del reconocimiento de emociones / categorización biométrica (EU AI Act)",
    "description": "Los proveedores o usuarios de sistemas de reconocimiento de emociones o categorización biométrica deben informar a las personas expuestas sobre el funcionamiento del sistema, violando las obligaciones de transparencia bajo el artículo 52(2) de la Ley de IA de la UE.",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(2)"
  },
  {
    "id": 161,
    "code": "CAAD-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Geolocalización activada por defecto para menores de 18 años (CA AADC)",
    "description": "El sitio web que probablemente sea accedido por menores no desactiva el rastreo de geolocalización precisa por defecto, violando la Ley de Diseño Apto para la Edad de California.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(5)"
  },
  {
    "id": 162,
    "code": "BIPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de política de retención y destrucción de datos biométricos (BIPA)",
    "description": "El sitio web que recopila o utiliza datos biométricos no publica un cronograma de retención y pautas de destrucción disponibles al público según lo exige BIPA de Illinois.",
    "severity": "critical",
    "reference": "740 ILCS 14/15(a)"
  },
  {
    "id": 163,
    "code": "ORPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento para procesar datos sensibles (Oregon OCPA)",
    "description": "El sitio web dirigido a los consumidores de Oregón procesa datos sensibles sin el consentimiento explícito previo, violando la Ley de Privacidad del Consumidor de Oregón.",
    "severity": "serious",
    "reference": "Or. Rev. Stat. § 646A (OCPA)"
  },
  {
    "id": 164,
    "code": "VCDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Geocercado alrededor de instalaciones médicas para recopilar datos (VCDPA)",
    "description": "El sitio web o la aplicación utiliza geocercas dentro de los 1750 pies de cualquier centro de salud para rastrear o dirigir a los consumidores para recopilar datos de salud, lo cual está prohibido bajo la VCDPA de Virginia.",
    "severity": "critical",
    "reference": "Va. Code § 59.1-574 (VCDPA)"
  },
  {
    "id": 165,
    "code": "TDPS-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Violación de consentimiento de datos sensibles (Texas TDPSA)",
    "description": "El sitio web dirigido a los consumidores de Texas recopila datos personales sensibles, incluidos identificadores biométricos o genéticos, sin obtener un consentimiento explícito previo según lo exige la Ley de Privacidad y Seguridad de Datos de Texas.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 541.101"
  },
  {
    "id": 166,
    "code": "MTDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de verificación del consentimiento paterno para menores de 13 años (Montana MCDPA)",
    "description": "El sitio web dirigido a los consumidores de Montana recopila datos personales de menores de 13 años sin obtener el consentimiento verificado de los padres de acuerdo con la Ley de Privacidad de Datos del Consumidor de Montana.",
    "severity": "critical",
    "reference": "Mont. Code Ann. § 30-14"
  },
  {
    "id": 167,
    "code": "FDBR-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de divulgación de vigilancia de reconocimiento facial (Florida FDBR)",
    "description": "El sitio web o la aplicación web asociada utiliza software de vigilancia o reconocimiento facial activo sin proporcionar un aviso claro y visible en la interfaz y obtener el consentimiento según lo exige la Declaración de Derechos Digitales de Florida.",
    "severity": "serious",
    "reference": "Fla. Stat. § 501.71 (FDBR)"
  },
  {
    "id": 168,
    "code": "NJPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de divulgación de privacidad para datos de niños (New Jersey Privacy Act)",
    "description": "El sitio web dirigido a los consumidores de Nueva Jersey recopila datos de menores (menores de 18 años) sin proporcionar el aviso de privacidad detallado requerido que especifica las políticas de procesamiento y uso compartido.",
    "severity": "serious",
    "reference": "N.J. Stat. Ann. 56:8-1"
  },
  {
    "id": 169,
    "code": "NEDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso inadecuado sobre creación de perfiles de consumidores (Nebraska NDPA)",
    "description": "El sitio web dirigido a los consumidores de Nebraska utiliza la toma de decisiones automatizada o la creación de perfiles para el empleo, las finanzas o la vivienda sin revelar la lógica de la creación de perfiles en su aviso de privacidad.",
    "severity": "moderate",
    "reference": "Neb. Rev. Stat. § 87-301 (NDPA)"
  },
  {
    "id": 170,
    "code": "NHPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de enlace de exclusión de marketing directo (New Hampshire Privacy Act)",
    "description": "El sitio web dirigido a los consumidores de Nuevo Hampshire no proporciona un enlace de exclusión de fácil acceso para la publicidad dirigida o la venta de datos en su página de inicio, violando la Ley de Privacidad de Nuevo Hampshire.",
    "severity": "serious",
    "reference": "N.H. Rev. Stat. § 507-H"
  },
  {
    "id": 171,
    "code": "GDPR-011",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Formato inaccesible para solicitudes de portabilidad de datos (GDPR)",
    "description": "Las herramientas de descarga de datos del sitio web muestran datos en un formato propietario o no estructurado en lugar de un formato estructurado y legible por máquina según lo exige el GDPR.",
    "severity": "moderate",
    "reference": "GDPR Article 20"
  },
  {
    "id": 172,
    "code": "GDPR-012",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Estructura de política de privacidad no estratificada (GDPR)",
    "description": "El sitio web muestra un bloque de texto denso y único de política de privacidad sin utilizar una estructura de diseño de múltiples capas o expandible para garantizar la legibilidad.",
    "severity": "moderate",
    "reference": "GDPR Article 12(1)"
  },
  {
    "id": 173,
    "code": "DSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de repositorio de anuncios y registro de transparencia (EU DSA)",
    "description": "La plataforma en línea que muestra anuncios a los usuarios de la UE no proporciona una biblioteca de anuncios accesible al público que contenga filtros y parámetros de orientación.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 39"
  },
  {
    "id": 174,
    "code": "DSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de punto único de contacto para autoridades (EU DSA)",
    "description": "La plataforma digital dirigida a usuarios de la UE no publica un canal de comunicación o correo electrónico dedicado y de fácil acceso para el contacto directo de las autoridades de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 11"
  },
  {
    "id": 175,
    "code": "DMA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Agrupación involuntaria de datos de intermediarios (EU DMA)",
    "description": "Las plataformas en línea intermediarias agrupan datos personales recopilados de un servicio principal con datos de otros sin obtener el consentimiento explícito del usuario.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/1925 (DMA), Art. 5(2)"
  },
  {
    "id": 176,
    "code": "EUDAT-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de capacidad de desactivación de contratos inteligentes (EU Data Act)",
    "description": "Los paneles web que administran contratos inteligentes o sistemas de IoT no proporcionan mecanismos para la desactivación segura y autorizada, violando la Ley de Datos de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2023/2854 (Data Act), Art. 30"
  },
  {
    "id": 177,
    "code": "GDPR-013",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de registro de estado de consentimiento y pistas de auditoría (GDPR)",
    "description": "El sitio web que recopila datos personales no registra ni mantiene pistas de auditoría del sello de tiempo exacto y la acción del usuario para los acuerdos de cookies.",
    "severity": "serious",
    "reference": "GDPR Article 7(1)"
  },
  {
    "id": 178,
    "code": "EPRIV-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Ejecución de cookies y rastreadores antes del consentimiento (ePrivacy)",
    "description": "El sitio web ejecuta scripts de seguimiento publicitario o analítico antes de que el usuario interactúe con el banner de consentimiento de cookies.",
    "severity": "critical",
    "reference": "Directive 2002/58/EC (ePrivacy), Art. 5(3)"
  },
  {
    "id": 179,
    "code": "DORA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación de resiliencia operativa (EU DORA)",
    "description": "El sitio web de una entidad financiera no revela los marcos de gestión de riesgos cibernéticos y las rutas de contacto de emergencia, violando el artículo 30 de DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30"
  },
  {
    "id": 180,
    "code": "GDPR-014",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de plazos de retención en la política de privacidad (GDPR)",
    "description": "La política de privacidad no especifica los períodos de retención concretos para distintas categorías de datos personales, violando el GDPR.",
    "severity": "moderate",
    "reference": "GDPR Article 13(2)(a)"
  },
  {
    "id": 181,
    "code": "AUPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Infracción de estándares de eliminación de datos (Australia Privacy Act)",
    "description": "El sitio web que contiene datos personales de residentes australianos no implementa rutinas para destruir o desidentificar datos que ya no son necesarios.",
    "severity": "serious",
    "reference": "Australian Privacy Act 1988, APP 11.2"
  },
  {
    "id": 182,
    "code": "SGPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de mecanismo de retiro de consentimiento (Singapore PDPA)",
    "description": "El sitio web que recopila datos de residentes de Singapur no proporciona una herramienta para que los usuarios retiren el consentimiento para el marketing.",
    "severity": "serious",
    "reference": "Singapore PDPA 2012, Sec. 16"
  },
  {
    "id": 183,
    "code": "SGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de visibilidad del Delegado de Protección de Datos (Singapore PDPA)",
    "description": "El sitio web dirigido a usuarios de Singapur no publica la información de contacto del Delegado de Protección de Datos designado, violando la Sección 20.",
    "severity": "moderate",
    "reference": "Singapore PDPA 2012, Sec. 20"
  },
  {
    "id": 184,
    "code": "DPDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de aviso de derecho a nombrar un representante (India DPDP Act)",
    "description": "El sitio web dirigido a residentes indios no informa a los usuarios sobre su derecho a nombrar a otra persona para actuar en su nombre en caso de muerte o incapacidad.",
    "severity": "moderate",
    "reference": "India DPDP Act 2023, Section 14"
  },
  {
    "id": 185,
    "code": "DPDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de integración con Gestor de Consentimiento (India DPDP Act)",
    "description": "El sitio web no admite ni se vincula a Gestores de Consentimiento autorizados para permitir que los usuarios indios gestionen y retiren el consentimiento.",
    "severity": "serious",
    "reference": "India DPDP Act 2023, Section 6(7)"
  },
  {
    "id": 186,
    "code": "JPAP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación para el manejo de datos anonimizados (Japan APPI)",
    "description": "El sitio web que utiliza datos anonimizados de residentes japoneses no publica los elementos de información personal incluidos en dichos datos.",
    "severity": "serious",
    "reference": "Japan APPI, Article 36"
  },
  {
    "id": 187,
    "code": "NZPR-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de enlace de contacto para Oficial de Privacidad (New Zealand Privacy Act)",
    "description": "El sitio web recopila datos de residentes de Nueva Zelanda pero no muestra rutas de contacto para su Oficial de Privacidad designado.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, Sec. 201"
  },
  {
    "id": 188,
    "code": "THPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de detalles de contacto de DPO en flujos de consentimiento (Thailand PDPA)",
    "description": "El sitio web recopila datos de residentes tailandeses pero no proporciona la información del Oficial de Protección de Datos en los flujos de consentimiento.",
    "severity": "moderate",
    "reference": "Thailand PDPA B.E. 2562, Section 42"
  },
  {
    "id": 189,
    "code": "VNDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de Oficial de Protección de Datos local para datos sensibles (Vietnam Decree 13)",
    "description": "El sitio web que recopila datos personales sensibles de residentes vietnamitas no nombra un DPO local según lo ordenado por el Decreto 13.",
    "severity": "serious",
    "reference": "Vietnam Decree 13/2023/ND-CP, Art. 28"
  },
  {
    "id": 190,
    "code": "PHDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Consentimiento empaquetado para creación de perfiles y decisiones automatizadas (Philippines DPA)",
    "description": "El sitio web recopila datos de residentes filipinos y realiza perfiles automatizados sin obtener un consentimiento explícito y por separado.",
    "severity": "serious",
    "reference": "Philippines Data Privacy Act of 2012, Sec. 12"
  },
  {
    "id": 191,
    "code": "LGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de enlace al portal de derechos del titular de datos (Brazil LGPD)",
    "description": "El sitio web no muestra un enlace separado que permita a los residentes brasileños enviar solicitudes directas de derechos sobre sus datos.",
    "severity": "serious",
    "reference": "Brazil LGPD, Article 18"
  },
  {
    "id": 192,
    "code": "POPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de autorización previa para procesar datos crediticios (South Africa POPIA)",
    "description": "El sitio web de un servicio de crédito que se dirige a residentes sudafricanos procesa informes de crédito sin autorización previa de la entidad reguladora.",
    "severity": "serious",
    "reference": "South Africa POPIA 2013, Section 57"
  },
  {
    "id": 193,
    "code": "SAPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento explícito para marketing directo (Saudi Arabia PDPL)",
    "description": "El sitio web dirigido a residentes de Arabia Saudita envía comunicaciones promocionales sin obtener el consentimiento explícito previo.",
    "severity": "serious",
    "reference": "Saudi PDPL, Article 28"
  },
  {
    "id": 194,
    "code": "ILPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación del estado de registro de la base de datos (Israel Privacy Act)",
    "description": "El sitio web que recopila datos de residentes israelíes no especifica si la base de datos está registrada ante el Registro de Bases de Datos.",
    "severity": "moderate",
    "reference": "Israel Privacy Protection Act 1981, Sec. 8"
  },
  {
    "id": 195,
    "code": "DIFC-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento separado para marketing directo (Dubai DIFC)",
    "description": "El sitio web bajo la jurisdicción de DIFC recopila datos personales y agrupa el consentimiento para marketing con los términos generales.",
    "severity": "serious",
    "reference": "DIFC Law No. 5 of 2020, Art. 12"
  },
  {
    "id": 196,
    "code": "NDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de transferencia transfronteriza de datos (Nigeria NDPA)",
    "description": "El sitio web que recopila datos de residentes nigerianos los transfiere a servidores extranjeros sin revelar los países de destino.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act 2023, Sec. 42"
  },
  {
    "id": 197,
    "code": "KEDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia transfronteriza no autorizada de datos de salud (Kenya DPA)",
    "description": "El sitio web recopila registros médicos de residentes de Kenia y los almacena en servidores fuera de Kenia sin consentimiento.",
    "severity": "critical",
    "reference": "Kenya Data Protection Act 2019, Sec. 50"
  },
  {
    "id": 198,
    "code": "EGDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de licencia para mensajes de marketing electrónico (Egypt DPA)",
    "description": "El sitio web que se dirige a usuarios egipcios envía correos electrónicos promocionales sin obtener la licencia de marketing electrónico requerida.",
    "severity": "serious",
    "reference": "Egypt Law No. 151 of 2020, Art. 13"
  },
  {
    "id": 199,
    "code": "MRDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia internacional de datos no autorizada (Morocco CNDP Law 09-08)",
    "description": "El sitio web recopila datos de residentes marroquíes y los transfiere fuera de Marruecos sin autorización previa por escrito de la CNDP.",
    "severity": "serious",
    "reference": "Morocco Law 09-08, Art. 43"
  },
  {
    "id": 200,
    "code": "LGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Divulgación inadecuada de estándares de seguridad (Brazil LGPD)",
    "description": "El sitio web que recopila datos personales no detalla las medidas de seguridad técnicas implementadas para proteger la información.",
    "severity": "serious",
    "reference": "Brazil LGPD, Art. 46"
  },
  {
    "id": 201,
    "code": "FTCS-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Transmisión insegura de información de clientes financieros (FTC Safeguards)",
    "description": "El portal financiero transmite datos de los clientes a través de canales no cifrados o no aplica HTTPS en todos los endpoints de inicio de sesión.",
    "severity": "critical",
    "reference": "16 CFR Part 314, Sec 314.4(c)"
  },
  {
    "id": 202,
    "code": "GLBA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de enlace para la entrega del aviso de privacidad (GLBA)",
    "description": "El sitio web de servicios financieros no proporciona un enlace visible a su aviso anual de privacidad de la Ley Gramm-Leach-Bliley.",
    "severity": "serious",
    "reference": "16 CFR Part 313 (GLBA Privacy Rule)"
  },
  {
    "id": 203,
    "code": "CTAC-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación de transparencia corporativa (CTA)",
    "description": "El sitio web corporativo no menciona las confirmaciones de presentación de informes de propiedad efectiva según lo requerido por la Ley de Transparencia Corporativa.",
    "severity": "moderate",
    "reference": "31 U.S.C. § 5336 (CTA)"
  },
  {
    "id": 204,
    "code": "SEC-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de verificación de archivado de registros electrónicos (SEC Rule 17a-4)",
    "description": "El portal de inversiones financieras no revela ni se vincula a sus sistemas de archivado de registros electrónicos que cumplen con WORM.",
    "severity": "serious",
    "reference": "17 CFR § 240.17a-4"
  },
  {
    "id": 205,
    "code": "DORA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación del sistema de gestión de riesgos de TIC (EU DORA)",
    "description": "El sitio de una entidad financiera de la UE no muestra certificaciones que describan los mecanismos de resiliencia operativa digital.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 6"
  },
  {
    "id": 206,
    "code": "FTCR-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Falta de divulgación para la prevención del robo de identidad (FTC Red Flags)",
    "description": "El portal financiero no muestra ni se vincula a su Programa de Prevención del Robo de Identidad durante el registro de la cuenta.",
    "severity": "serious",
    "reference": "16 CFR § 681.1"
  },
  {
    "id": 207,
    "code": "FINRA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de enlace a BrokerCheck y divulgaciones regulatorias (FINRA)",
    "description": "El sitio web de asesoría de inversiones no muestra un enlace directo y destacado a la herramienta FINRA BrokerCheck en su página de inicio.",
    "severity": "serious",
    "reference": "FINRA Rule 2210(d)"
  },
  {
    "id": 208,
    "code": "PCI-011",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Scripts de terceros no supervisados en la página de pago (PCI-DSS v4.0)",
    "description": "La página de pago ejecuta scripts de terceros sin emplear controles de integridad de scripts o restricciones de CSP, violando PCI-DSS.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.3"
  },
  {
    "id": 209,
    "code": "PCI-012",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de Integridad de Subrecursos (SRI) en pasarela de pago (PCI-DSS v4.0)",
    "description": "El sitio web incrusta formularios de pago de CDN externos sin utilizar hash SRI, dejando los pagos abiertos a formjacking.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 11.6.1"
  },
  {
    "id": 210,
    "code": "TILA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Divulgación de APR no destacada en anuncios de préstamos (TILA)",
    "description": "El sitio web que anuncia préstamos establece tasas sin divulgar de manera destacada la Tasa de Interés Anual (APR) junto a la tasa.",
    "severity": "serious",
    "reference": "12 CFR Part 1026 (Regulation Z)"
  },
  {
    "id": 211,
    "code": "FTCD-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación engañoso / Roach Motel (FTC Sección 5)",
    "description": "El sitio web utiliza patrones oscuros para dificultar significativamente la cancelación de la suscripción, requiriendo llamadas en comparación con el registro.",
    "severity": "serious",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 212,
    "code": "FTCD-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Urgencia engañosa y temporizadores de cuenta regresiva falsos (FTC Sección 5)",
    "description": "El sitio web muestra temporizadores que afirman bajo stock u ofertas limitadas que son sintéticas y no reflejan métricas reales.",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 213,
    "code": "FTCD-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Confirmación de vergüenza en ventanas de exclusión (FTC Sección 5)",
    "description": "El sitio muestra opciones de exclusión donde el botón de rechazo utiliza un lenguaje manipulador (por ejemplo, \"No, gracias, odio ahorrar dinero\").",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 214,
    "code": "W3CR-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación de auditoría de contratos inteligentes en dApp (SEC)",
    "description": "La aplicación descentralizada Web3 que lanza tokens o NFT no publica certificados de auditoría de seguridad para sus contratos inteligentes.",
    "severity": "serious",
    "reference": "SEC Framework for Investment Contracts"
  },
  {
    "id": 215,
    "code": "W3CR-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Vulnerabilidad de firma ciega en la interfaz dApp Web3 (NIST SP 800-95)",
    "description": "La integración de la billetera dApp solicita firmas de transacciones sin mostrar los detalles legibles de la transacción en la interfaz.",
    "severity": "critical",
    "reference": "NIST SP 800-95 Web Services Security"
  },
  {
    "id": 216,
    "code": "DSA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de transparencia del algoritmo del sistema de recomendación (EU DSA)",
    "description": "El sitio web que utiliza recomendadores algorítmicos no explica los parámetros principales utilizados en su aviso de términos.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 26"
  },
  {
    "id": 217,
    "code": "EUAI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de capacidad de registro del sistema de IA de alto riesgo (EU AI Act)",
    "description": "El implementador de un sistema de IA de alto riesgo no garantiza que los registros se guarden automáticamente durante al menos seis meses.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 12"
  },
  {
    "id": 218,
    "code": "UKCR-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Términos de renovación automática sin resumen en lenguaje sencillo (UK CRA)",
    "description": "El sitio web que cobra suscripciones recurrentes no proporciona un resumen en lenguaje sencillo de los términos de facturación.",
    "severity": "serious",
    "reference": "UK Consumer Rights Act 2015, Sec. 68"
  },
  {
    "id": 219,
    "code": "PIPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Divulgación inadecuada de procesadores de terceros (Canada PIPEDA)",
    "description": "La política de privacidad no detalla las identidades y los países de los procesadores SaaS de terceros que manejan datos personales.",
    "severity": "serious",
    "reference": "PIPEDA Schedule 1, APP 4.8"
  },
  {
    "id": 220,
    "code": "TDDD-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Bypass de consentimiento de cookies de análisis (Alemania TDDDG)",
    "description": "El sitio web dirigido a usuarios alemanes ejecuta cookies de análisis antes de obtener el consentimiento explícito, violando la Sección 25 de TDDDG.",
    "severity": "critical",
    "reference": "Germany TDDDG Section 25"
  },
  {
    "id": 221,
    "code": "TXSC-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Chat de redes sociales habilitado por defecto para menores (Texas SCOPE)",
    "description": "El sitio de red social no deshabilita las funciones de chat por defecto para usuarios menores de edad, violando la Ley SCOPE de Texas.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 509 (SCOPE Act)"
  },
  {
    "id": 222,
    "code": "UTSM-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de verificación de edad para plataformas sociales (Utah SMRA)",
    "description": "La plataforma de redes sociales no verifica la edad de los residentes de Utah o no obtiene el consentimiento paterno para menores.",
    "severity": "critical",
    "reference": "Utah Code § 13-63-102 (SMRA)"
  },
  {
    "id": 223,
    "code": "FLDB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de puerta de edad para plataforma social restringida (Florida FDBR)",
    "description": "La plataforma de redes sociales accesible a menores no implementa un mecanismo seguro de verificación de edad bajo la FDBR.",
    "severity": "critical",
    "reference": "Fla. Stat. § 501.71 (FDBR)"
  },
  {
    "id": 224,
    "code": "CTDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Geocercas alrededor de centros de salud mental (Connecticut SB 3)",
    "description": "El sitio o la aplicación utiliza geocercas dentro de los 1750 pies de cualquier centro de salud mental o reproductiva para recopilar datos.",
    "severity": "critical",
    "reference": "CT Public Act 23-56 (SB 3)"
  },
  {
    "id": 225,
    "code": "VCDP-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de verificación de consentimiento para datos de niños (Virginia VCDPA)",
    "description": "El sitio web que recopila datos personales de niños menores de 13 años no obtiene la verificación de los padres según COPPA.",
    "severity": "critical",
    "reference": "Va. Code § 59.1-574 (VCDPA)"
  },
  {
    "id": 226,
    "code": "CAAD-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Creación de perfiles activada por defecto para cuentas de menores (CA AADC)",
    "description": "El sitio web que probablemente sea accedido por niños tiene activada la creación de perfiles por defecto para cuentas de menores.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31 (AADC)"
  },
  {
    "id": 227,
    "code": "MDAD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de divulgación de la evaluación de impacto en niños (Maryland AADCA)",
    "description": "El sitio web que probablemente sea accedido por niños no realiza una Evaluación de Impacto de Protección de Datos (DPIA) sobre riesgos para menores.",
    "severity": "serious",
    "reference": "Md. Code Ann., Com. Law § 14-45"
  },
  {
    "id": 228,
    "code": "COPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento paterno para datos de niños (Colorado CPA)",
    "description": "El sitio web recopila datos de consumidores que se sabe que son menores de 13 años sin obtener el consentimiento verificado de los padres.",
    "severity": "critical",
    "reference": "4 CCR 904-3 Rule 6.09"
  },
  {
    "id": 229,
    "code": "INDP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento explícito para datos sensibles de niños (Indiana CDPA)",
    "description": "El sitio web dirigido a residentes de Indiana recopila datos de menores de 13 años sin consentimiento previo de acuerdo con COPPA.",
    "severity": "critical",
    "reference": "Ind. Code § 24-15"
  },
  {
    "id": 230,
    "code": "TNIP-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de proceso de apelación de derechos en política de privacidad (Tennessee TIPA)",
    "description": "El aviso de privacidad dirigido a residentes de Tennessee no describe el proceso para apelar una denegación de solicitudes de derechos.",
    "severity": "serious",
    "reference": "Tenn. Code Ann. § 47-18-32"
  },
  {
    "id": 231,
    "code": "TCPA-011",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Mecanismo de baja de correo electrónico inaccesible o retrasado (CAN-SPAM)",
    "description": "El enlace de baja de marketing del sitio web no se procesa de inmediato o requiere más de 10 días hábiles, violando la ley CAN-SPAM.",
    "severity": "serious",
    "reference": "16 CFR § 316.5"
  },
  {
    "id": 232,
    "code": "TCPA-012",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Falta de identidad del remitente y dirección postal válidas (CAN-SPAM)",
    "description": "Los correos electrónicos de marketing no contienen una dirección postal física válida del remitente, violando CAN-SPAM.",
    "severity": "critical",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 233,
    "code": "TCPA-013",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Falta de consentimiento por escrito para llamadas automáticas (TCPA)",
    "description": "Los formularios recopilan números telefónicos y los usan para llamadas automáticas sin consentimiento previo por escrito de TCPA.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 234,
    "code": "EAA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Barreras de navegación con teclado en el carrito de compras (EAA)",
    "description": "La página de pago contiene trampas de enfoque de teclado o no se puede operar solo con el teclado, violando la Ley de Accesibilidad Europea.",
    "severity": "critical",
    "reference": "EN 301 549 Clause 9.2.1 (EAA)"
  },
  {
    "id": 235,
    "code": "EAA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de formatos de medios alternativos en el comercio electrónico (EAA)",
    "description": "El sitio web muestra productos a través de video o audio sin subtítulos o audiodescripciones, violando la Ley de Accesibilidad Europea.",
    "severity": "serious",
    "reference": "EN 301 549 Clause 9.1.2 (EAA)"
  },
  {
    "id": 236,
    "code": "AODA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Descargas de documentos inaccesibles (Ontario AODA)",
    "description": "El sitio ofrece descargas de documentos públicos (PDF, manuales) que no cumplen con los estándares de accesibilidad WCAG 2.0 Nivel AA.",
    "severity": "serious",
    "reference": "AODA Section 14"
  },
  {
    "id": 237,
    "code": "ADA-237",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Trampa de enfoque de teclado en diálogos modales (ADA Título III)",
    "description": "Los diálogos modales atrapan el enfoque del teclado, evitando que los usuarios regresen al contenido de la página principal, violando accesibilidad.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 2.1.2"
  },
  {
    "id": 238,
    "code": "ADA-103",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Reproductores de medios inaccesibles (ADA Título III)",
    "description": "Los reproductores carecen de etiquetas de control accesibles o controles de teclado, bloqueando a usuarios de lectores de pantalla.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.1.1 & 4.1.2"
  },
  {
    "id": 239,
    "code": "EPRIV-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Bypass de consentimiento en diseños móviles (ePrivacy)",
    "description": "El banner de consentimiento no se renderiza en dispositivos móviles mientras se ejecutan los scripts de seguimiento, violando ePrivacy.",
    "severity": "critical",
    "reference": "Directive 2002/58/EC (ePrivacy)"
  },
  {
    "id": 240,
    "code": "FTCE-011",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Testimonios y reseñas falsos generados por IA (Regla de reseñas de la FTC)",
    "description": "El sitio web muestra testimonios de clientes generados por IA sin una divulgación clara que indique que no son reales.",
    "severity": "critical",
    "reference": "16 CFR Part 465"
  },
  {
    "id": 241,
    "code": "HIPAA-011",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Fuga de PHI del paciente a través de chat de redes sociales (HIPAA)",
    "description": "El portal de comunicación médica incorpora widgets de chat de redes sociales de terceros que transmiten identificadores del paciente.",
    "severity": "critical",
    "reference": "45 CFR § 164.502"
  },
  {
    "id": 242,
    "code": "HIPAA-012",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Transmisión insegura de registros de pacientes por SMS/correo (HIPAA)",
    "description": "Los formularios envían resúmenes de salud no cifrados a través de redes estándar de correo o SMS, violando HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(e)"
  },
  {
    "id": 243,
    "code": "PCI-013",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Almacenamiento inseguro de datos de tarjeta en LocalStorage (PCI-DSS v4.0)",
    "description": "El sitio guarda números de cuenta primarios o códigos CVV en el LocalStorage del navegador, violando mandatos de PCI-DSS.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 3.4.1"
  },
  {
    "id": 244,
    "code": "PCI-014",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Ejecución insegura de scripts de pago en páginas de pago (PCI-DSS v4.0)",
    "description": "La página de pago ejecuta scripts cargados externamente sin validar su integridad o restringirlos usando políticas de CSP.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.3"
  },
  {
    "id": 245,
    "code": "MHMDA-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Falta de verificación del proveedor de salud para datos sensibles (WA MHMDA)",
    "description": "El sitio web recopila datos de salud de residentes de Washington sin verificar si el receptor es un proveedor de salud autorizado.",
    "severity": "critical",
    "reference": "RCW 19.373 (MHMDA)"
  },
  {
    "id": 246,
    "code": "NIST-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de tiempos de espera de sesión de autenticación del portal (NIST SP 800-53)",
    "description": "El portal de clientes o el panel del sistema no finaliza automáticamente las sesiones autenticadas inactivas después de un período.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (IA-11)"
  },
  {
    "id": 247,
    "code": "SOC2-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de divulgación de disponibilidad del sistema (SOC 2 Tipo II)",
    "description": "El portal SaaS no proporciona una página de seguimiento de tiempo de actividad disponible al público, violando criterios de SOC 2.",
    "severity": "moderate",
    "reference": "SOC 2 CC1.1 (Availability)"
  },
  {
    "id": 248,
    "code": "CYIN-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Plataformas de software obsoletas no divulgadas (Seguro cibernético)",
    "description": "El sitio web de SaaS utiliza plataformas no compatibles sin revelar los riesgos a los aseguradores cibernéticos.",
    "severity": "serious",
    "reference": "Cyber Insurance Risk Standards"
  },
  {
    "id": 249,
    "code": "DORA-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de capacidad de notificación de incidentes de TIC (EU DORA)",
    "description": "La plataforma de servicios financieros no aloja un portal dedicado para que los usuarios informen de incidentes de TIC.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 17"
  },
  {
    "id": 250,
    "code": "FTCS-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Falta de límites de sesión en el portal del cliente (FTC Safeguards)",
    "description": "El portal de tecnología financiera no aplica límites máximos estrictos a las sesiones de acceso al panel de control.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(c)(5)"
  },
  {
    "id": 251,
    "code": "DEPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de formato portátil para descarga de datos (Delaware DPDPA)",
    "description": "El sitio web que se dirige a los consumidores de Delaware no proporciona descargas de datos en un formato portátil y utilizable.",
    "severity": "serious",
    "reference": "Delaware DPDPA (HB 154), Sec. 12C-5"
  },
  {
    "id": 252,
    "code": "MAPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Prohibición de venta de datos personales sensibles (Maryland MODPA)",
    "description": "El sitio recopila y vende datos sensibles de los consumidores de Maryland, lo cual está prohibido bajo la MODPA de Maryland.",
    "severity": "critical",
    "reference": "Maryland MODPA (SB 541), Sec. 14-46"
  },
  {
    "id": 253,
    "code": "KYPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de divulgación del derecho de acceso del consumidor (Kentucky KCDPA)",
    "description": "El sitio web dirigido a residentes de Kentucky no describe el proceso para que los consumidores confirmen si sus datos son procesados.",
    "severity": "serious",
    "reference": "Kentucky KCDPA (SB 15), Sec. 4"
  },
  {
    "id": 254,
    "code": "RIPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de divulgación de ventas a terceros en aviso de privacidad (Rhode Island RIDTPPA)",
    "description": "El sitio web dirigido a los consumidores de Rhode Island no enumera todos los terceros a quienes se venden o comparten datos personales.",
    "severity": "serious",
    "reference": "Rhode Island RIDTPPA (SB 2502), Sec. 6"
  },
  {
    "id": 255,
    "code": "IAPD-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de enlace de exclusión de venta de datos (Iowa ICDPA)",
    "description": "El sitio web dirigido a los consumidores de Iowa no proporciona un enlace visible para optar por la exclusión de la venta de sus datos.",
    "severity": "serious",
    "reference": "Iowa ICDPA (SF 262), Sec. 715C"
  },
  {
    "id": 256,
    "code": "FTCH-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Intercambio ilegal de métricas de salud con rastreadores (Regla HBNR de la FTC)",
    "description": "El sitio web recopila consultas de salud y las comparte con rastreadores de publicidad de terceros sin autorización explícita.",
    "severity": "critical",
    "reference": "16 CFR Part 318 (HBNR Rule)"
  },
  {
    "id": 257,
    "code": "NYDF-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de autenticación de múltiples factores en portales financieros (NYDFS)",
    "description": "El panel financiero bajo la jurisdicción de NYDFS no aplica la autenticación multifactor (MFA) para todos los inicios de sesión web.",
    "severity": "critical",
    "reference": "23 NYCRR Part 500, Sec. 500.12"
  },
  {
    "id": 258,
    "code": "BIPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de autorización escrita para recopilación biométrica (BIPA de Illinois)",
    "description": "El sitio recopila identificadores biométricos sin obtener una autorización escrita y firmada por el usuario antes de la recopilación.",
    "severity": "critical",
    "reference": "740 ILCS 14/15(b)"
  },
  {
    "id": 259,
    "code": "AADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Enfoque de teclado oculto por elementos flotantes (WCAG 2.2)",
    "description": "El diseño del sitio web permite que los encabezados o superposiciones oculten el indicador de enfoque durante la navegación con el teclado.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.11"
  },
  {
    "id": 260,
    "code": "AADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de objetivo insuficiente para elementos interactivos (WCAG 2.2)",
    "description": "Los elementos interactivos son más pequeños que 24x24 píxeles de CSS sin el espaciado adecuado, violando las pautas de WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.8"
  },
  {
    "id": 261,
    "code": "EUAI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de supervisión humana para IA de alto riesgo (EU AI Act)",
    "description": "El sitio web que implementa sistemas de decisión de IA de alto riesgo no divulga los mecanismos de supervisión e intervención humana.",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 14"
  },
  {
    "id": 262,
    "code": "EUAI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de planes de seguimiento postcomercialización para sistemas de IA (EU AI Act)",
    "description": "El proveedor de sistemas de IA regulados no publica un plan de seguimiento posterior a la comercialización ni canales de incidentes.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 61"
  },
  {
    "id": 263,
    "code": "DSA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción sin perfiles para sistemas de recomendación (EU DSA)",
    "description": "La plataforma en línea que utiliza sistemas de recomendación no proporciona a los usuarios al menos una opción que no se base en perfiles.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 38"
  },
  {
    "id": 264,
    "code": "DSA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de verificación de edad para la protección de menores (EU DSA)",
    "description": "La plataforma en línea accesible para menores no implementa medidas de verificación de edad proporcionales para garantizar la seguridad.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 28"
  },
  {
    "id": 265,
    "code": "NIS2-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de canales de contacto y notificación de incidentes (NIS2)",
    "description": "El sitio web de un proveedor de servicios críticos no muestra procedimientos claros para informar incidentes cibernéticos, violando NIS2.",
    "severity": "serious",
    "reference": "EU Directive 2022/2555 (NIS2), Art. 21"
  },
  {
    "id": 266,
    "code": "GDPR-015",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de ruta de acción para el derecho a limitar el tratamiento (GDPR)",
    "description": "El sitio web no proporciona a los usuarios un mecanismo para ejercer su derecho a limitar el tratamiento de sus datos bajo el GDPR.",
    "severity": "serious",
    "reference": "GDPR Article 18"
  },
  {
    "id": 267,
    "code": "EPRIV-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "La vida útil de las cookies supera los límites máximos (Directrices ePrivacy)",
    "description": "El mecanismo del sitio establece cookies de seguimiento con vencimientos superiores a 12 meses sin solicitudes de renovación.",
    "severity": "moderate",
    "reference": "ePrivacy Guidelines on Cookies, Sec. 4"
  },
  {
    "id": 268,
    "code": "GDPR-016",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de resumen de registro de actividades de tratamiento (GDPR)",
    "description": "El aviso del sitio no indica que la empresa mantenga registros de actividades de tratamiento, violando el artículo 30 del GDPR.",
    "severity": "serious",
    "reference": "GDPR Article 30"
  },
  {
    "id": 269,
    "code": "EIDS-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de soporte para firmas electrónicas cualificadas (eIDAS 2.0)",
    "description": "La plataforma digital que requiere firmas de ciudadanos de la UE no reconoce las firmas electrónicas cualificadas (QES) de la lista de la UE.",
    "severity": "moderate",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 6"
  },
  {
    "id": 270,
    "code": "GDPR-017",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de divulgación de Evaluación de Impacto de Protección de Datos (DPIA) (GDPR)",
    "description": "El aviso de privacidad que realiza tratamiento de alto riesgo no indica que se haya realizado y registrado una DPIA.",
    "severity": "serious",
    "reference": "GDPR Article 35"
  },
  {
    "id": 271,
    "code": "ARPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de rectificación de datos (Ley 25.326 de Argentina)",
    "description": "El sitio web que recopila datos de residentes argentinos no proporciona instrucciones claras para solicitar la rectificación de datos.",
    "severity": "serious",
    "reference": "Argentina Law 25.326, Art. 6"
  },
  {
    "id": 272,
    "code": "COPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Consentimiento empaquetado para mensajes comerciales (Ley 1581 de Colombia)",
    "description": "El sitio recopila datos de residentes colombianos y agrupa el consentimiento de marketing con el registro general, violando la Ley 1581.",
    "severity": "serious",
    "reference": "Colombia Law 1581 of 2012, Art. 12"
  },
  {
    "id": 273,
    "code": "MXPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de acciones separadas para Derechos ARCO (LFPDPPP de México)",
    "description": "El sitio que recopila datos de consumidores mexicanos no proporciona pasos claros para ejercer los derechos ARCO, violando la LFPDPPP.",
    "severity": "serious",
    "reference": "Mexico LFPDPPP, Art. 16"
  },
  {
    "id": 274,
    "code": "CHPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de transferencia internacional de datos (FADP de Suiza)",
    "description": "El sitio recopila datos de residentes suizos y los transfiere sin revelar los países y las salvaguardas en su política de privacidad.",
    "severity": "serious",
    "reference": "Switzerland FADP, Art. 16"
  },
  {
    "id": 275,
    "code": "POPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Violación de marketing por exclusión voluntaria por defecto (POPIA de Sudáfrica)",
    "description": "El sitio envía marketing directo a residentes sudafricanos sin obtener el consentimiento explícito previo, violando POPIA.",
    "severity": "serious",
    "reference": "South Africa POPIA 2013, Sec. 69"
  },
  {
    "id": 276,
    "code": "TRKV-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia internacional de datos no autorizada (KVKK de Turquía)",
    "description": "El sitio transfiere datos de residentes turcos a servidores fuera de Turquía sin el consentimiento explícito, violando la KVKK.",
    "severity": "serious",
    "reference": "Turkey Law 6698 (KVKK), Art. 9"
  },
  {
    "id": 277,
    "code": "AUPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de detalles de contacto y acceso en política de privacidad (APP 1 de Australia)",
    "description": "La política de privacidad dirigida a usuarios australianos carece de detalles sobre cómo pueden acceder o solicitar correcciones.",
    "severity": "serious",
    "reference": "Australian Privacy Act 1988, APP 1.4"
  },
  {
    "id": 278,
    "code": "SGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de sistema de seguimiento de solicitudes de acceso (Singapur PDPA)",
    "description": "El sitio web no proporciona a los residentes de Singapur un portal para solicitar la confirmación de los datos procesados en el último año.",
    "severity": "moderate",
    "reference": "Singapore PDPA 2012, Sec. 21"
  },
  {
    "id": 279,
    "code": "THPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia internacional a países no adecuados sin consentimiento (Tailandia PDPA)",
    "description": "El sitio transfiere datos de residentes tailandeses a terceros países sin estándares adecuados de protección sin el consentimiento.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562, Sec. 28"
  },
  {
    "id": 280,
    "code": "PHDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Divulgación inadecuada del derecho a oponerse al tratamiento (DPA de Filipinas)",
    "description": "El aviso dirigido a residentes de Filipinas no establece explícitamente el derecho del usuario a oponerse al tratamiento de sus datos.",
    "severity": "serious",
    "reference": "Philippines Data Privacy Act 2012, Sec. 16"
  },
  {
    "id": 281,
    "code": "FTCD-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Aumentos engañosos del precio de la suscripción sin consentimiento (FTC)",
    "description": "El sitio implementa renovaciones automáticas a tarifas más altas sin notificar a los usuarios antes de facturar el precio actualizado.",
    "severity": "serious",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 282,
    "code": "FTCD-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Elementos adicionales opcionales marcados previamente en el pago (FTC)",
    "description": "El flujo de pago del comercio electrónico establece servicios opcionales o garantías en estados marcados previamente.",
    "severity": "moderate",
    "reference": "15 U.S.C. § 45 (FTC Act Section 5)"
  },
  {
    "id": 283,
    "code": "TCPA-014",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Falta de registro interno de No Llamar (DNC) (TCPA)",
    "description": "El sitio de captura de clientes no mantiene una lista interna de No Llamar (DNC) para gestionar las solicitudes de contacto.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200(d)"
  },
  {
    "id": 284,
    "code": "TCPA-015",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Las solicitudes de baja requieren tarifas o inicios de sesión (CAN-SPAM)",
    "description": "Los enlaces de baja de marketing obligan a los usuarios a iniciar sesión o pagar tarifas de procesamiento, violando CAN-SPAM.",
    "severity": "serious",
    "reference": "16 CFR § 316.5"
  },
  {
    "id": 285,
    "code": "EAA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Facturas o recibos digitales inaccesibles para comercio electrónico (EAA)",
    "description": "La tienda en línea genera páginas de confirmación de pedidos que se formatean como imágenes planas, bloqueando lectores de pantalla.",
    "severity": "critical",
    "reference": "EN 301 549 Clause 11.2 (EAA)"
  },
  {
    "id": 286,
    "code": "AODA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de envío de comentarios sobre accesibilidad (AODA de Ontario)",
    "description": "El sitio web no proporciona una ruta o formulario en línea dedicado a recibir comentarios sobre problemas de accesibilidad de usuarios con discapacidad.",
    "severity": "serious",
    "reference": "AODA Section 12"
  },
  {
    "id": 287,
    "code": "ADA-104",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "El escalado de texto rompe el diseño de la página al 200% (ADA Título III)",
    "description": "El diseño del sitio web se rompe o superpone texto cuando el zoom del navegador se establece al 200%, violando WCAG 2.1.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.4.4"
  },
  {
    "id": 288,
    "code": "ADA-105",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Incapacidad para ajustar los límites de sesión del formulario (ADA Título III)",
    "description": "Los formularios con restricciones de tiempo no permiten a los usuarios desactivar o extender el límite antes del tiempo de espera.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.2.1"
  },
  {
    "id": 289,
    "code": "EPRIV-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "La configuración de cookies del banner de consentimiento bloquea a usuarios de teclado",
    "description": "El banner de cookies y su panel de configuración no se pueden cerrar o navegar a través de la tecla TAB del teclado.",
    "severity": "critical",
    "reference": "ePrivacy Directive, Art. 5(3)"
  },
  {
    "id": 290,
    "code": "FTCE-012",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Enlaces de afiliados y contenido patrocinado no etiquetados (FTC)",
    "description": "El sitio web muestra enlaces que ganan comisiones o bloques patrocinados sin mostrar etiquetas claras como \'Afiliado\' o \'Patrocinado\'.",
    "severity": "critical",
    "reference": "16 CFR Part 255"
  },
  {
    "id": 291,
    "code": "W3CR-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación de riesgos para transacciones de tokens en dApp (SEC)",
    "description": "La interfaz de Web3 que facilita intercambios de tokens no muestra una divulgación clara sobre la volatilidad de los tokens.",
    "severity": "serious",
    "reference": "SEC Guidance on Digital Assets"
  },
  {
    "id": 292,
    "code": "W3CR-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "dApp no valida la integridad de los endpoints de la API (NIST SP 1800-34)",
    "description": "La aplicación dApp se conecta a nodos RPC sin verificar las firmas de respuesta, lo que permite mostrar saldos falsos.",
    "severity": "critical",
    "reference": "NIST SP 1800-34 (Data Integrity)"
  },
  {
    "id": 293,
    "code": "PCI-015",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Ejecución frontal de scripts de dominios no autorizados (PCI-DSS v4.0)",
    "description": "Las interfaces de pago cargan archivos JavaScript alojados en dominios no autorizados, violando las reglas de PCI-DSS v4.0.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.4.1"
  },
  {
    "id": 294,
    "code": "PCI-016",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Scripts de reproducción de sesión habilitados en entradas de contraseña (PCI-DSS)",
    "description": "Las herramientas de grabación ejecutan grabaciones sin enmascarar campos como contraseñas o tarjetas, violando PCI-DSS.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 8.3"
  },
  {
    "id": 295,
    "code": "CYIN-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de referencia al plan de respuesta a incidentes (Seguro cibernético)",
    "description": "La interfaz de SaaS no muestra un mecanismo para solicitar informes de divulgación de incidentes de seguridad, requeridos por seguros.",
    "severity": "serious",
    "reference": "NIST Cybersecurity Framework (CSF)"
  },
  {
    "id": 296,
    "code": "DORA-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de reporte de registro de incidentes mayores de TIC (EU DORA)",
    "description": "La consola web de la entidad financiera no proporciona registros de incidentes de TIC para transparencia a las autoridades.",
    "severity": "critical",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 18"
  },
  {
    "id": 297,
    "code": "FTCS-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Falta de divulgación del registro de evaluación de riesgos (FTC Safeguards)",
    "description": "El portal financiero o de tecnología financiera no publica que realiza evaluaciones de riesgo periódicas en las bases de datos.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(d)"
  },
  {
    "id": 298,
    "code": "SOC2-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Notificación de revocación de acceso inadecuada (SOC 2 Tipo II)",
    "description": "La consola del cliente no registra registros de tokens administrativos revocados ni muestra sesiones activas con rutas de terminación.",
    "severity": "moderate",
    "reference": "SOC 2 CC6.3 (Access Controls)"
  },
  {
    "id": 299,
    "code": "NIST-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de registros de auditoría de gestión de cuentas (NIST SP 800-53)",
    "description": "El gabinete del cliente no genera pistas de auditoría para la creación de cuentas o modificación de privilegios de usuario.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (AC-2)"
  },
  {
    "id": 300,
    "code": "HIPAA-013",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Falta de verificación de identidad antes de acceder a PHI (HIPAA)",
    "description": "El portal del paciente permite acceder a registros históricos o PHI sin ejecutar una validación de identidad multifactorial.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(d)"
  },
  {
    "id": 301,
    "code": "MCDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta del derecho del consumidor a corregir datos personales inexactos (MCDPA)",
    "description": "El sitio no proporciona a los consumidores de Minnesota una ruta accesible para corregir inexactitudes en sus datos.",
    "severity": "serious",
    "reference": "Minnesota MCDPA, Sec. 325O.04"
  },
  {
    "id": 302,
    "code": "TXSC-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Restricciones publicitarias inadecuadas en redes sociales para menores (Texas SCOPE)",
    "description": "La plataforma de redes sociales dirigida a menores de Texas ofrece publicidad basada en la creación de perfiles de menores.",
    "severity": "critical",
    "reference": "Texas SCOPE Act, Sec. 509.052"
  },
  {
    "id": 303,
    "code": "UTSM-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Bloqueo de DM por defecto entre menores y adultos no verificados (Utah SMRA)",
    "description": "La aplicación no bloquea los mensajes directos entre menores y usuarios que no son padres verificados, violando SMRA.",
    "severity": "critical",
    "reference": "Utah SMRA, Sec. 13-63-201"
  },
  {
    "id": 304,
    "code": "FLDB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de divulgación de sesgo en los resultados de búsqueda (FDBR de Florida)",
    "description": "La plataforma de búsqueda que se dirige a residentes de Florida no revela los parámetros utilizados para clasificar los resultados.",
    "severity": "critical",
    "reference": "Florida FDBR, Sec. 501.714"
  },
  {
    "id": 305,
    "code": "CTDP-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Creación de perfiles de menores con fines comerciales (Connecticut SB 3)",
    "description": "El sitio web dirigido a menores de Connecticut recopila perfiles para marketing sin el consentimiento por escrito.",
    "severity": "critical",
    "reference": "CTDPA SB 3, Sec. 5"
  },
  {
    "id": 306,
    "code": "CAAD-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Patrones oscuros interactivos dirigidos a niños (CA AADC)",
    "description": "El sitio que es accedido por niños utiliza mecánicas de juego engañosas para incitar a revelar correos, violando la AADC.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 307,
    "code": "MDAD-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Seguimiento activado por defecto para niños (MODPA de Maryland)",
    "description": "El servicio en línea dirigido a residentes de Maryland no desactiva los rastreadores de comportamiento para menores de 18 años.",
    "severity": "serious",
    "reference": "Maryland MODPA, Sec. 14-45"
  },
  {
    "id": 308,
    "code": "INDP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de divulgación del tratamiento de datos sensibles (CDPA de Indiana)",
    "description": "El aviso dirigido a residentes de Indiana no establece explícitamente las categorías de datos personales sensibles tratados.",
    "severity": "critical",
    "reference": "Indiana CDPA, Sec. 24-15-4"
  },
  {
    "id": 309,
    "code": "TNIP-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tiempo de respuesta inadecuado para solicitudes de derechos de datos (TIPA)",
    "description": "El flujo no garantiza responder a las solicitudes de derechos de los consumidores dentro del plazo de 45 días.",
    "severity": "serious",
    "reference": "Tennessee TIPA, Sec. 47-18"
  },
  {
    "id": 310,
    "code": "NHPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta del derecho de eliminación para consumidores de Nuevo Hampshire (NHPA)",
    "description": "El sitio web no proporciona a los residentes de Nuevo Hampshire un método claro para eliminar sus datos recopilados.",
    "severity": "serious",
    "reference": "New Hampshire Privacy Act, Sec. 507-H.4"
  },
  {
    "id": 311,
    "code": "AADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Entrada de datos redundante requerida en formularios de varios pasos (WCAG 2.2)",
    "description": "Los formularios de varios pasos requieren que los usuarios vuelvan a ingresar información previamente proporcionada en la misma sesión.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 3.3.7"
  },
  {
    "id": 312,
    "code": "AADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Autenticación inaccesible a través de pruebas de función cognitiva (WCAG 2.2)",
    "description": "La autenticación requiere resolver acertijos o CAPTCHA visuales sin ofrecer un método de inicio de sesión alternativo.",
    "severity": "critical",
    "reference": "WCAG 2.2 SC 3.3.8"
  },
  {
    "id": 313,
    "code": "AADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Ubicación inconsistente de los contactos de soporte (WCAG 2.2)",
    "description": "El sitio web muestra los contactos de soporte en diferentes ubicaciones en diferentes páginas, violando la consistencia de WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 3.2.6"
  },
  {
    "id": 314,
    "code": "AADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Movimientos de arrastre requeridos sin alternativas de un solo clic (WCAG 2.2)",
    "description": "El sitio requiere arrastrar elementos sin admitir alternativas de clic para entradas de un solo puntero, violando WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.7"
  },
  {
    "id": 315,
    "code": "AADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Desplazamiento horizontal activado en diseños de escritorio (WCAG 2.1)",
    "description": "El diseño obliga al desplazamiento horizontal cuando se visualiza a un ancho de 320 píxeles, violando WCAG 2.1.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 1.4.10"
  },
  {
    "id": 316,
    "code": "AADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Los ajustes de espaciado de texto provocan texto superpuesto (WCAG 2.1)",
    "description": "Los ajustes de espaciado causan que los elementos de texto de la página se superpongan o se trunquen, violando WCAG 2.1.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 1.4.12"
  },
  {
    "id": 317,
    "code": "AADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Medios y carruseles de reproducción automática que no se pueden detener (WCAG 2.1)",
    "description": "El sitio incluye carruseles o videos de fondo que no se pueden pausar, detener o silenciar por el usuario, violando WCAG 2.1.",
    "severity": "critical",
    "reference": "WCAG 2.1 SC 2.2.2"
  },
  {
    "id": 318,
    "code": "AADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de marcadores de posición o pistas de contexto en entradas (WCAG 2.1)",
    "description": "Las entradas que requieren formatos específicos no proporcionan marcadores de posición o instrucciones de contexto.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 3.3.2"
  },
  {
    "id": 319,
    "code": "AADA-011",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Mensajes de estado no anunciados por lectores de pantalla (WCAG 2.1)",
    "description": "Las actualizaciones de estado dinámicas aparecen sin role=\'status\' o aria-live, ocultándolas de lectores de pantalla.",
    "severity": "moderate",
    "reference": "WCAG 2.1 SC 4.1.3"
  },
  {
    "id": 320,
    "code": "AADA-012",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Orden de navegación de pestañas ilógico (WCAG 2.1)",
    "description": "La ruta de enfoque de navegación del teclado atraviesa la página en un orden ilógico, fallando al coincidir con el diseño visual.",
    "severity": "serious",
    "reference": "WCAG 2.1 SC 2.4.3"
  },
  {
    "id": 321,
    "code": "GDPR-018",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Estándares de cifrado para datos recopilados no divulgados (GDPR)",
    "description": "El aviso del sitio recopila datos personales pero no indica los métodos de cifrado utilizados durante el almacenamiento.",
    "severity": "serious",
    "reference": "GDPR Article 32"
  },
  {
    "id": 322,
    "code": "GDPR-019",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de divulgación de decisiones de adecuación para transferencias externas (GDPR)",
    "description": "El aviso transfiere datos fuera del EEE pero no indica si los países de destino cuentan con una decisión de adecuación de la CE.",
    "severity": "moderate",
    "reference": "GDPR Article 13(1)(f)"
  },
  {
    "id": 323,
    "code": "GDPR-020",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de instrucciones para los usuarios en caso de brecha de datos (GDPR)",
    "description": "El sitio web no muestra instrucciones que expliquen cómo se notificará a los usuarios ante una vulneración de datos.",
    "severity": "serious",
    "reference": "GDPR Article 34"
  },
  {
    "id": 324,
    "code": "PIPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de la ubicación específica del almacenamiento (PIPEDA de Canadá)",
    "description": "La política dirigida a residentes canadienses recopila datos pero no revela las ubicaciones geográficas específicas donde se almacenan.",
    "severity": "serious",
    "reference": "PIPEDA Principle 4.5"
  },
  {
    "id": 325,
    "code": "PIPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de aviso sobre costos de procesamiento de solicitudes de acceso a datos (PIPEDA)",
    "description": "El aviso dirigido a residentes de Canadá no indica si existen costos de procesamiento asociados con las solicitudes formales de acceso.",
    "severity": "serious",
    "reference": "PIPEDA Principle 4.9"
  },
  {
    "id": 326,
    "code": "JPAP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de los fines de los identificadores de cookies compartidos (APPI de Japón)",
    "description": "El sitio dirigido a usuarios japoneses comparte identificadores sin revelar los fines publicitarios de los destinatarios.",
    "severity": "serious",
    "reference": "Japan APPI, Art. 27"
  },
  {
    "id": 327,
    "code": "NZPR-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Retención ilegal de datos más allá del tiempo necesario (New Zealand Privacy Act)",
    "description": "El sitio dirigido a residentes de Nueva Zelanda carece de políticas que especifiquen que los datos no se conservarán más de lo necesario.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, IPP 4"
  },
  {
    "id": 328,
    "code": "THPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Divulgación inadecuada del derecho a solicitar la eliminación de datos (Tailandia PDPA)",
    "description": "El sitio dirigido a usuarios tailandeses tiene una política que no establece el derecho del consumidor a solicitar la eliminación de sus datos.",
    "severity": "serious",
    "reference": "Thailand PDPA B.E. 2562, Sec. 30"
  },
  {
    "id": 329,
    "code": "PHDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de los procedimientos para presentar quejas ante la DPA (Filipinas DPA)",
    "description": "La política dirigida a consumidores filipinos no explica cómo presentar una queja formal ante la Comisión Nacional de Privacidad.",
    "severity": "moderate",
    "reference": "Philippines Data Privacy Act 2012, Sec. 34"
  },
  {
    "id": 330,
    "code": "LGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Actualizaciones de la política de privacidad no notificadas de forma destacada (LGPD)",
    "description": "El sitio realiza cambios significativos en las políticas de procesamiento sin notificar a los usuarios brasileños, violando la LGPD.",
    "severity": "serious",
    "reference": "Brazil LGPD, Art. 9"
  },
  {
    "id": 331,
    "code": "GLBA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta del derecho del consumidor a optar por la exclusión del intercambio de datos (GLBA)",
    "description": "El portal bajo GLBA no proporciona una ruta de exclusión antes de compartir información personal con terceros no afiliados.",
    "severity": "serious",
    "reference": "16 CFR Part 313.9"
  },
  {
    "id": 332,
    "code": "SEC-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación de políticas administrativas que salvaguardan la información (SEC)",
    "description": "El sitio de asesoría de inversiones registrado en la SEC no muestra políticas que describan las salvaguardas para los registros.",
    "severity": "serious",
    "reference": "SEC Regulation S-P, Sec. 248.30"
  },
  {
    "id": 333,
    "code": "PCI-017",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de inventario de componentes de software externos (PCI-DSS v4.0)",
    "description": "El flujo de pago del sitio utiliza bibliotecas de software externas sin mantener un inventario documentado, violando PCI-DSS.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 6.3.2"
  },
  {
    "id": 334,
    "code": "PCI-018",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de documentación de la gestión de claves criptográficas (PCI-DSS v4.0)",
    "description": "El sitio que procesa transacciones con tarjetas no documenta la gestión de claves criptográficas utilizadas para cifrar datos.",
    "severity": "critical",
    "reference": "PCI-DSS v4.0 Req 12.3.2"
  },
  {
    "id": 335,
    "code": "CYIN-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de aviso del programa de divulgación de vulnerabilidades (Seguro cibernético)",
    "description": "El sitio corporativo no publica un Programa de Divulgación de Vulnerabilidades (VDP) para investigadores, requerido por seguros.",
    "severity": "serious",
    "reference": "Cyber Insurance Security Requirements"
  },
  {
    "id": 336,
    "code": "DORA-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación del nivel de criticidad del proveedor de TIC (EU DORA)",
    "description": "El panel web del sistema financiero no categoriza los niveles de criticidad de sus proveedores de infraestructura de TIC.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 28"
  },
  {
    "id": 337,
    "code": "FTCS-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Falta de referencia a la capacitación en seguridad de los empleados (FTC Safeguards)",
    "description": "El aviso del portal no indica que la empresa realice capacitaciones de seguridad anuales sobre protección de datos.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(e)"
  },
  {
    "id": 338,
    "code": "SOC2-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Divulgaciones inadecuadas de gestión de parches (SOC 2 Tipo II)",
    "description": "El portal SaaS no detalla los plazos y procedimientos de gestión de parches para resolver vulnerabilidades conocidas.",
    "severity": "moderate",
    "reference": "SOC 2 CC7.1 (Vulnerability Management)"
  },
  {
    "id": 339,
    "code": "NIST-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de divulgación sobre el monitoreo de intrusiones y tráfico web (NIST SP 800-53)",
    "description": "El aviso de seguridad de la plataforma no indica si emplea firewalls de aplicaciones web (WAF) para monitorear el tráfico.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev 5 (SI-4)"
  },
  {
    "id": 340,
    "code": "HIPAA-014",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Divulgación inadecuada del análisis de riesgos de ciberseguridad (HIPAA)",
    "description": "El portal de salud no confirma que realice análisis de riesgos periódicos para evaluar vulnerabilidades de seguridad a la PHI.",
    "severity": "critical",
    "reference": "45 CFR § 164.308(a)(1)"
  },
  {
    "id": 341,
    "code": "MDAD-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Creación de perfiles de niños para anuncios dirigidos (MODPA de Maryland)",
    "description": "El sitio web permite la creación de perfiles para publicidad dirigida en cuentas de usuarios que se sabe que son menores de 18 años.",
    "severity": "critical",
    "reference": "Maryland MODPA, Sec. 14-46"
  },
  {
    "id": 342,
    "code": "TXSC-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Recopilación del historial de ubicación de menores sin verificación paterna (SCOPE)",
    "description": "La aplicación recopila registros de ubicación de usuarios menores de edad sin obtener el consentimiento de los padres.",
    "severity": "critical",
    "reference": "Texas SCOPE Act, Sec. 509.053"
  },
  {
    "id": 343,
    "code": "UTSM-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Recomendaciones algorítmicas a menores (SMRA de Utah)",
    "description": "La plataforma utiliza algoritmos predictivos en cuentas de menores sin el consentimiento verificado de los padres, violando la SMRA.",
    "severity": "critical",
    "reference": "Utah SMRA, Sec. 13-63-301"
  },
  {
    "id": 344,
    "code": "FLDB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de enlace de exclusión para venta de datos (FDBR de Florida)",
    "description": "El sitio dirigido a los consumidores de Florida no proporciona un enlace visible titulado \"Do Not Sell My Personal Information\".",
    "severity": "critical",
    "reference": "Florida FDBR, Sec. 501.715"
  },
  {
    "id": 345,
    "code": "CTDP-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Venta de datos de geolocalización sin consentimiento (Connecticut SB 3)",
    "description": "El sitio web dirigido a los consumidores de Connecticut vende coordenadas de geolocalización recopiladas sin consentimiento.",
    "severity": "critical",
    "reference": "Connecticut SB 3, Sec. 6"
  },
  {
    "id": 346,
    "code": "CAAD-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de divulgación del análisis de impacto en la seguridad infantil (CA AADC)",
    "description": "El sitio web que es accedido por niños no detalla en su aviso de privacidad las salvaguardas implementadas basadas en el análisis.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 347,
    "code": "BIPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Prohibición de venta de identificadores biométricos (BIPA de Illinois)",
    "description": "El sitio web vende o comparte datos biométricos de residentes de Illinois, lo cual está prohibido bajo la ley BIPA.",
    "severity": "critical",
    "reference": "740 ILCS 14/15(c)"
  },
  {
    "id": 348,
    "code": "HIPAA-015",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Anonimización inadecuada de registros de investigación de pacientes (HIPAA)",
    "description": "El portal de salud publica resúmenes que contienen códigos postales, sin cumplir con las reglas de HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.514(b)"
  },
  {
    "id": 349,
    "code": "DORA-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de resúmenes de salvaguardas de cláusulas contractuales (EU DORA)",
    "description": "El panel financiero no revela que sus contratos con proveedores de TIC contienen cláusulas de seguridad obligatorias.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30.2"
  },
  {
    "id": 350,
    "code": "FTCS-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Falta de resumen de política de respuesta a incidentes (FTC Safeguards)",
    "description": "El portal de tecnología financiera no muestra en sus divulgaciones un resumen de su Plan de Respuesta a Incidentes.",
    "severity": "serious",
    "reference": "16 CFR § 314.4(g)"
  },
  {
    "id": 351,
    "code": "ADA-106",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Violación del aspecto mínimo del foco",
    "description": "El indicador de foco del teclado del sitio web carece del área o contraste mínimos en comparación con los colores adyacentes, lo que dificulta que los usuarios que solo usan el teclado vean qué elemento está activo, violando WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.11"
  },
  {
    "id": 352,
    "code": "ADA-107",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Foco ocultado por elementos fijos",
    "description": "Los elementos interactivos enfocados mediante el teclado están total o parcialmente cubiertos por encabezados fijos, pies de página o superposiciones flotantes, violando WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.4.12"
  },
  {
    "id": 353,
    "code": "ADA-108",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Movimientos de arrastre sin alternativas de clic",
    "description": "Los gestos de arrastre (por ejemplo, controles deslizantes, tableros kanban) carecen de alternativas de clic o toque de un solo punto, bloqueando a usuarios con discapacidad motora, violando WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.7"
  },
  {
    "id": 354,
    "code": "ADA-109",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño del objetivo interactivo menor al mínimo",
    "description": "Los objetivos interactivos (botones, enlaces) son menores a 24x24 píxeles CSS sin suficiente espacio, lo que provoca clics erróneos en usuarios táctiles y con discapacidad motora, violando WCAG 2.2.",
    "severity": "serious",
    "reference": "WCAG 2.2 SC 2.5.8"
  },
  {
    "id": 355,
    "code": "ADA-110",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Requisito de entrada de datos redundante en formularios",
    "description": "Los formularios requieren que los usuarios vuelvan a ingresar información enviada anteriormente en la misma sesión en lugar de autocompletarla o proporcionar opciones de selección, violando WCAG 2.2.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 3.3.7"
  },
  {
    "id": 356,
    "code": "ADA-111",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Autenticación multifactor inaccesible",
    "description": "El flujo de autenticación obliga a realizar pruebas cognitivas (como memorizar contraseñas, transcribir códigos o resolver acertijos) sin proporcionar una alternativa de copiar y pegar o llave física, violando WCAG 2.2.",
    "severity": "critical",
    "reference": "WCAG 2.2 SC 3.3.8"
  },
  {
    "id": 357,
    "code": "ADA-112",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Foco ocultado (nivel mejorado)",
    "description": "Los elementos interactivos están completamente visibles cuando tienen el foco, sin ninguna superposición de diseños bajo auditorías de accesibilidad más estrictas, violando los estándares WCAG 2.2 AAA.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 2.4.13"
  },
  {
    "id": 358,
    "code": "ADA-113",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Exclusión de autenticación cognitiva (mejorada)",
    "description": "Los formularios de inicio de sesión omiten por completo las pruebas cognitivas (incluido el reconocimiento de objetos y ortografía de patrones), basándose únicamente en autenticaciones accesibles, violando WCAG 2.2 AAA.",
    "severity": "moderate",
    "reference": "WCAG 2.2 SC 3.3.9"
  },
  {
    "id": 359,
    "code": "ADA-114",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de transcripciones de video accesibles",
    "description": "Los videos incrustados con información educativa o comercial carecen de transcripciones de texto completo sincronizadas o vinculadas, creando barreras para usuarios sordociegos, violando el Título III de la ADA.",
    "severity": "serious",
    "reference": "ADA Title III / WCAG SC 1.2.8"
  },
  {
    "id": 360,
    "code": "ADA-115",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos para medios grabados",
    "description": "Los videos de marketing o vista previa de productos no ofrecen subtítulos cerrados (CC) precisos, bloqueando el acceso a visitantes sordos o con problemas de audición, violando el Título III de la ADA.",
    "severity": "critical",
    "reference": "ADA Title III / WCAG SC 1.2.2"
  },
  {
    "id": 361,
    "code": "HIPAA-016",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Formularios de cita médica inseguros",
    "description": "Las interfaces de reserva en línea transmiten Información Médica Protegida (PHI), como condiciones médicas o nombres de médicos, en parámetros de URL no cifrados, violando las normas de seguridad de HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(e)(1)"
  },
  {
    "id": 362,
    "code": "HIPAA-017",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Píxeles de marketing no autorizados en pantallas de reserva",
    "description": "Los sistemas de citas médicas ejecutan rastreadores analíticos o publicitarios (por ejemplo, Meta Pixel) sin obtener autorizaciones firmadas explícitas de HIPAA de los pacientes, lo que provoca multas regulatorias masivas.",
    "severity": "critical",
    "reference": "45 CFR § 164.508"
  },
  {
    "id": 363,
    "code": "HIPAA-018",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Falta de registro de actividad de acceso al portal",
    "description": "La base de datos del portal de salud no registra la identidad del visor, la marca de tiempo ni las acciones cuando se cargan registros médicos o análisis, violando las reglas de auditoría de HIPAA.",
    "severity": "serious",
    "reference": "45 CFR § 164.312(b)"
  },
  {
    "id": 364,
    "code": "HIPAA-019",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Aviso de prácticas de privacidad sin fecha de vigencia",
    "description": "El Aviso de Prácticas de Privacidad (NPP) alojado en el sitio web de una clínica médica no muestra de manera destacada su fecha de vigencia, violando las normas de divulgación de la Regla de Privacidad de HIPAA.",
    "severity": "moderate",
    "reference": "45 CFR § 164.520"
  },
  {
    "id": 365,
    "code": "HIPAA-020",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Proceso de eliminación de datos de salud no conforme",
    "description": "El portal de salud no cumple con las solicitudes de eliminación de datos de seguimiento de salud (no HIPAA) de los consumidores dentro del plazo legal de 30 días según la ley MHMDA de Washington.",
    "severity": "serious",
    "reference": "RCW 19.373.040"
  },
  {
    "id": 366,
    "code": "HIPAA-021",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Falta de consentimiento explícito de salud del consumidor para MHMDA",
    "description": "Un sitio web de seguimiento de la salud recopila índices de bienestar o consultas de síntomas de consumidores de Washington sin obtener un consentimiento explícito separado, violando MHMDA.",
    "severity": "critical",
    "reference": "RCW 19.373.030"
  },
  {
    "id": 367,
    "code": "HIPAA-022",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Almacenamiento inseguro de recetas cargadas",
    "description": "Los archivos de recetas o notas médicas cargados en el portal se guardan en directorios públicos de la nube o son accesibles a través de URL fáciles de adivinar, violando las normas de seguridad de HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(a)(2)(iv)"
  },
  {
    "id": 368,
    "code": "HIPAA-023",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Falta de cierre de sesión automático en el portal de pacientes",
    "description": "Las sesiones del portal médico permanecen activas indefinidamente tras la inactividad del usuario, exponiendo datos de pacientes a accesos físicos no autorizados, violando los protocolos de HIPAA.",
    "severity": "serious",
    "reference": "45 CFR § 164.312(a)(2)(iii)"
  },
  {
    "id": 369,
    "code": "HIPAA-024",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Credenciales administrativas compartidas en el portal de pacientes",
    "description": "El personal de la clínica médica accede al panel del portal utilizando un inicio de sesión genérico compartido, lo que imposibilita las auditorías de cambios, violando el requisito de usuario único de HIPAA.",
    "severity": "critical",
    "reference": "45 CFR § 164.312(a)(1)"
  },
  {
    "id": 370,
    "code": "HIPAA-025",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Fallas de desidentificación en informes del portal",
    "description": "Las funciones de exportación recopilan informes estadísticos dejando expuestas fechas de nacimiento o códigos postales sin una desidentificación adecuada, violando las pautas de privacidad de HIPAA.",
    "severity": "serious",
    "reference": "45 CFR § 164.514(b)"
  },
  {
    "id": 371,
    "code": "CCPA-011",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Patrones oscuros en enlaces de exclusión voluntaria",
    "description": "La opción requerida 'No vender ni compartir mi información personal' está formateada de manera que es difícil hacer clic o tiene un estilo que parece inactivo, violando la CCPA.",
    "severity": "critical",
    "reference": "11 CCR § 7004"
  },
  {
    "id": 372,
    "code": "CCPA-012",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de registros de verificación de Control de Privacidad Global (GPC)",
    "description": "El gestor de consentimiento del sitio web no mantiene registros internos que demuestren que se respetaron las señales GPC de los usuarios y se desactivaron los scripts, violando la CCPA.",
    "severity": "serious",
    "reference": "11 CCR § 7025"
  },
  {
    "id": 373,
    "code": "CCPA-013",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta del aviso de incentivo financiero",
    "description": "Las ventanas emergentes de comercio electrónico ofrecen descuentos a cambio de registrarse al boletín (recopilación de correos) sin proporcionar un Aviso de Incentivo Financiero, violando CCPA.",
    "severity": "serious",
    "reference": "11 CCR § 7016"
  },
  {
    "id": 374,
    "code": "CCPA-014",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Aviso de privacidad para empleados y candidatos no conforme",
    "description": "Los formularios de solicitud de empleo y los portales internos carecen de una política de privacidad detallada sobre el manejo de datos de empleados y candidatos, violando la CPRA.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.100"
  },
  {
    "id": 375,
    "code": "CCPA-015",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de divulgación de los períodos de retención de datos sensibles",
    "description": "La política de privacidad no indica el período de retención específico para cada categoría de información personal sensible recopilada, violando el Código Civil de California.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.130"
  },
  {
    "id": 376,
    "code": "CCPA-016",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de portal para ejercer el derecho de corrección",
    "description": "El panel de usuario no ofrece una interfaz clara o formulario que permita a los consumidores de California corregir datos personales inexactos registrados, violando la CPRA.",
    "severity": "moderate",
    "reference": "Cal. Civ. Code § 1798.106"
  },
  {
    "id": 377,
    "code": "CCPA-017",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Rastreo implícito de geolocalización precisa",
    "description": "La aplicación web rastrea coordenadas precisas dentro de un radio de 560 metros sin presentar una solicitud clara para limitar el uso de información sensible, violando la CCPA.",
    "severity": "critical",
    "reference": "11 CCR § 7027"
  },
  {
    "id": 378,
    "code": "CCPA-018",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Divulgación incompleta del procedimiento para agentes autorizados",
    "description": "La política de privacidad no detalla los procedimientos de verificación y formularios requeridos cuando un consumidor ejerce sus derechos mediante un agente autorizado, violando la CCPA.",
    "severity": "moderate",
    "reference": "11 CCR § 7063"
  },
  {
    "id": 379,
    "code": "CCPA-019",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de métricas anuales sobre solicitudes de privacidad",
    "description": "Las empresas que procesan datos de más de 10 millones de consumidores de California no recopilan ni publican estadísticas anuales de solicitudes recibidas, violando la CCPA.",
    "severity": "moderate",
    "reference": "11 CCR § 7102"
  },
  {
    "id": 380,
    "code": "CCPA-020",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Perfilado por defecto de usuarios menores de 18 años",
    "description": "Los servicios en línea accesibles por niños activan por defecto el perfilado conductual o el rastreo de ubicación, violando el Código de Diseño Apropiado para la Edad de California.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31"
  },
  {
    "id": 381,
    "code": "FTC-011",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Obstáculos engañosos en la cancelación de autorrenovación",
    "description": "La compra inscribe a usuarios en facturación recurrente pero no ofrece un botón simple de cancelación en línea, violando las pautas de ROSCA y la FTC.",
    "severity": "critical",
    "reference": "15 U.S.C. § 8403"
  },
  {
    "id": 382,
    "code": "FTC-012",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Temporizadores falsos de escasez",
    "description": "La compra muestra temporizadores de cuenta regresiva de 'oferta expira pronto' que se reinician al recargar la página, clasificados por la FTC como patrones oscuros.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 383,
    "code": "FTC-013",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Casillas premarcadas de consentimiento de marketing",
    "description": "Las pantallas de registro o compra premarcan casillas para suscribir a usuarios a promociones opcionales, violando los estándares de la sección 5 de la FTC.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 384,
    "code": "FTC-014",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Datos de reseñas falsas incrustados en código cliente",
    "description": "Las páginas de destino muestran reseñas de clientes codificadas en JS con fechas aleatorias para simular frescura, violando la regla de la FTC sobre reseñas engañosas.",
    "severity": "critical",
    "reference": "16 CFR Part 465"
  },
  {
    "id": 385,
    "code": "FTC-015",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Tarifas basura engañosas al finalizar la compra",
    "description": "Los flujos de pago ocultan cargos por servicio o costos administrativos hasta la pantalla final de confirmación, violando los estándares de la sección 5 de la FTC.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 386,
    "code": "FTC-016",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Adición automática de artículos al carrito",
    "description": "El carrito agrega automáticamente garantías pagas o seguros de envío sin la selección del usuario, violando las pautas de la FTC contra patrones oscuros.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 387,
    "code": "FTC-017",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Falta de autenticación multifactor en portales financieros",
    "description": "Las consolas web que dan acceso a historiales de crédito no exigen autenticación multifactor (MFA) para el personal, violando la regla Safeguards de la FTC.",
    "severity": "critical",
    "reference": "16 CFR § 314.4(c)(5)"
  },
  {
    "id": 388,
    "code": "FTC-018",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Proceso inválido de consentimiento parental en portales infantiles",
    "description": "Los portales infantiles recopilan datos usando casillas simples o correos no verificados para la aprobación de los padres, violando las reglas de COPPA.",
    "severity": "critical",
    "reference": "16 CFR § 312.5"
  },
  {
    "id": 389,
    "code": "FTC-019",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Compartición de búsquedas de salud con píxeles publicitarios",
    "description": "Las plataformas de bienestar no reguladas por HIPAA transmiten búsquedas de enfermedades a redes publicitarias, violando la regla de la FTC sobre salud.",
    "severity": "critical",
    "reference": "16 CFR Part 318"
  },
  {
    "id": 390,
    "code": "FTC-020",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Contenido patrocinado no etiquetado",
    "description": "Las publicaciones de blogs con enlaces de afiliados pagados no muestran etiquetas claras de divulgación (como 'Patrocinado'), violando las reglas de la FTC.",
    "severity": "serious",
    "reference": "FTC Act Section 5"
  },
  {
    "id": 391,
    "code": "TCPA-016",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Consentimiento premarcado de SMS",
    "description": "Los formularios premarcan casillas para suscribir a los usuarios a SMS promocionales, violando los requisitos de consentimiento expreso de la TCPA.",
    "severity": "critical",
    "reference": "47 U.S.C. § 227"
  },
  {
    "id": 392,
    "code": "TCPA-017",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Términos legales de suscripción a SMS incompletos",
    "description": "Los formularios que recopilan teléfonos carecen de texto legal que especifique que se aplican tarifas de datos, violando las pautas de la TCPA.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 393,
    "code": "TCPA-018",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Falta de divulgación del operador móvil",
    "description": "Los campos de SMS omiten declaraciones sobre la responsabilidad del operador y el soporte, violando los códigos operativos de la CTIA.",
    "severity": "serious",
    "reference": "CTIA Guidelines"
  },
  {
    "id": 394,
    "code": "TCPA-019",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Sistema de baja de SMS no conforme",
    "description": "Las integraciones de SMS no reconocen ni procesan palabras clave estándar de exclusión voluntaria (como STOP o CANCEL), violando la TCPA.",
    "severity": "critical",
    "reference": "47 CFR § 64.1200"
  },
  {
    "id": 395,
    "code": "TCPA-020",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Falta de dirección física en correos salientes",
    "description": "Los correos de marketing enviados por el portal no muestran una dirección postal física válida de la empresa, violando CAN-SPAM.",
    "severity": "serious",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 396,
    "code": "TCPA-021",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Mecanismo de exclusión dañado en pie de correo",
    "description": "Los enlaces de baja en los correos redirigen a páginas rotas o exigen que el usuario inicie sesión, violando las regulaciones de CAN-SPAM.",
    "severity": "critical",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 397,
    "code": "TCPA-022",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Retraso excesivo en procesar bajas de correo",
    "description": "Los sistemas no eliminan los correos de baja de las listas promocionales activas dentro del plazo legal de 10 días hábiles, violando CAN-SPAM.",
    "severity": "serious",
    "reference": "16 CFR § 316.4"
  },
  {
    "id": 398,
    "code": "TCPA-023",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Llamadas automáticas y mensajes sin consentimiento escrito",
    "description": "Las páginas recopilan teléfonos para marcado automático sin obtener firmas de consentimiento previo por escrito de usuarios de Florida, violando la FTSA.",
    "severity": "critical",
    "reference": "Fla. Stat. § 501.059"
  },
  {
    "id": 399,
    "code": "TCPA-024",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Falta de registros conservados de Do Not Call",
    "description": "Las bases de datos no conservan registros de solicitudes DNC por el mínimo legal de cinco años desde su envío, violando la TCPA.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200(d)(6)"
  },
  {
    "id": 400,
    "code": "TCPA-025",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Envío de mensajes automáticos fuera de horario",
    "description": "Los servidores de marketing envían mensajes automáticos antes de las 8:00 a.m. o después de las 9:00 p.m. hora local del destinatario, violando la TCPA.",
    "severity": "serious",
    "reference": "47 CFR § 64.1200(c)(2)"
  },
  {
    "id": 401,
    "code": "GDPR-021",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Casillas premarcadas de cookies no esenciales",
    "description": "El sitio web establece cookies analíticas o publicitarias no esenciales antes de recibir el consentimiento activo del visitante de la UE, violando ePrivacy y GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 4(11) / ePrivacy Directive"
  },
  {
    "id": 402,
    "code": "GDPR-022",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Botones desiguales de rechazo y aceptación en el banner",
    "description": "El banner de cookies oculta el botón 'Rechazar' o exige abrir submenús para desactivar el rastreo, permitiendo aceptar en un solo clic, violando el GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 7(4) / Guidelines 05/2020"
  },
  {
    "id": 403,
    "code": "GDPR-023",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de datos de contacto del DPO en la política",
    "description": "La política del sitio web no muestra los datos de contacto oficiales del Delegado de Protección de Datos (DPO) designado bajo los requisitos del GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 13(1)(b) & Art. 37"
  },
  {
    "id": 404,
    "code": "GDPR-024",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de divulgación de contratos DPA con subencargados",
    "description": "Los formularios recopilan datos de la UE sin verificar ni enlazar contratos DPA completados con subencargados en la nube, violando el artículo 28 del GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 28"
  },
  {
    "id": 405,
    "code": "GDPR-025",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de canales seguros para solicitudes SAR",
    "description": "La plataforma no proporciona un canal seguro y autenticado para procesar solicitudes de acceso a datos (SAR), arriesgando fugas de información, violando el GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 15 / Right of Access"
  },
  {
    "id": 406,
    "code": "GDPR-026",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Rechazo injustificado de solicitudes de borrado",
    "description": "Los sistemas de soporte rechazan o retrasan solicitudes de 'Derecho al olvido' sin justificaciones legales válidas, violando el artículo 17 del GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 17 / Right to be Forgotten"
  },
  {
    "id": 407,
    "code": "GDPR-027",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Ajustes de privacidad desactivados por defecto",
    "description": "Los paneles de usuario comparten por defecto perfiles o ubicaciones con otros usuarios tras el registro, violando las reglas de Privacidad por Defecto del GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 25 / Privacy by Design"
  },
  {
    "id": 408,
    "code": "GDPR-028",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Envío inseguro de formularios de contacto",
    "description": "Los formularios de contacto del sitio web transmiten mensajes personales a través de canales HTTP no cifrados en lugar de HTTPS, violando los requisitos del GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 32 / Security of Processing"
  },
  {
    "id": 409,
    "code": "GDPR-029",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de realización de la evaluación DPIA requerida",
    "description": "Las aplicaciones web que rastrean datos conductuales a gran escala no realizan una evaluación de impacto de protección de datos (DPIA), violando el GDPR.",
    "severity": "serious",
    "reference": "GDPR Art. 35"
  },
  {
    "id": 410,
    "code": "GDPR-030",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Transferencias transfronterizas sin cláusulas contractuales",
    "description": "Los registros se transmiten a servidores en terceros países sin cláusulas contractuales estándar (SCC) vigentes, violando el GDPR.",
    "severity": "critical",
    "reference": "GDPR Art. 44-46"
  },
  {
    "id": 411,
    "code": "PCI-019",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Retención de datos CVV en la base de datos",
    "description": "La base de datos de pagos guarda códigos CVV/CVC tras completarse la autorización, cometiendo una infracción crítica de PCI DSS.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 3.2.2"
  },
  {
    "id": 412,
    "code": "PCI-020",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Configuración débil de cifrado TLS en servidor",
    "description": "El servidor de pagos acepta conexiones TLS 1.0 o TLS 1.1 con cifrados débiles, violando los requisitos de PCI para cifrado en tránsito.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 4.2.1"
  },
  {
    "id": 413,
    "code": "PCI-021",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de encabezados CSP en páginas de pago",
    "description": "Las páginas de pago no implementan encabezados CSP, exponiendo los campos a XSS y vulnerabilidades de inyección, violando las reglas de PCI.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 6.4.3"
  },
  {
    "id": 414,
    "code": "PCI-022",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de auditorías de scripts de JS externos",
    "description": "La página de pago carga scripts externos de terceros en las mismas páginas con formularios de tarjetas sin auditorías de verificación, violando PCI DSS.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 6.4.3"
  },
  {
    "id": 415,
    "code": "PCI-023",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de monitoreo de alteración del formulario de pago",
    "description": "Las integraciones de pago carecen de monitoreo de integridad en tiempo real para detectar inyecciones en las páginas de pago, violando las normas de PCI.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 11.6.1"
  },
  {
    "id": 416,
    "code": "PCI-024",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Credenciales por defecto en el panel de control",
    "description": "El panel del sistema o dashboards utilizan contraseñas de fábrica o inicios de sesión estándar, violando los protocolos de seguridad de PCI.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 2.1.1"
  },
  {
    "id": 417,
    "code": "PCI-025",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Sesiones compartidas entre operadores de pago",
    "description": "El personal de facturación comparte sesiones de inicio o cuentas multiusuario durante la gestión de transacciones, violando las directivas de PCI.",
    "severity": "serious",
    "reference": "PCI DSS v4.0 Requirement 8.2.1"
  },
  {
    "id": 418,
    "code": "PCI-026",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Vulnerabilidades CVE conocidas en el entorno de pagos",
    "description": "Los servicios de pago utilizan frameworks obsoletos con registros CVE activos de alta gravedad, violando los requisitos de seguridad de PCI.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 6.2.1"
  },
  {
    "id": 419,
    "code": "PCI-027",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Almacenamiento no cifrado de números de tarjeta (PAN)",
    "description": "Las bases de datos internas guardan números de tarjeta (PAN) en texto claro sin implementar criptografía sólida, violando las normas de PCI.",
    "severity": "critical",
    "reference": "PCI DSS v4.0 Requirement 3.4"
  },
  {
    "id": 420,
    "code": "PCI-028",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de atestación de pruebas de penetración",
    "description": "Las páginas de seguridad no muestran pruebas de certificaciones anuales de pruebas de penetración independientes, violando las normas de PCI.",
    "severity": "moderate",
    "reference": "PCI DSS v4.0 Requirement 11.4"
  },
  {
    "id": 421,
    "code": "STATE-011",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Consentimiento de datos sensibles para pymes bajo TDPSA de Texas",
    "description": "Los portales de pymes que recopilan datos sensibles en Texas venden información sin consentimiento previo, violando las disposiciones de la TDPSA.",
    "severity": "critical",
    "reference": "Tex. Bus. & Com. Code § 541.055"
  },
  {
    "id": 422,
    "code": "STATE-012",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Escalación de apelación de derechos bajo VCDPA de Virginia",
    "description": "La política no detalla un proceso para que los usuarios apelen la denegación de sus solicitudes de derechos, violando la VCDPA de Virginia.",
    "severity": "serious",
    "reference": "Va. Code § 59.1-577"
  },
  {
    "id": 423,
    "code": "STATE-013",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de reconocimiento del mecanismo universal de exclusión bajo CPA de Colorado",
    "description": "Los comercios dirigidos a Colorado no procesan automáticamente los mecanismos universales de exclusión voluntaria (UOOM), violando la CPA.",
    "severity": "critical",
    "reference": "4 ... (Colorado CPA, 4 CCR 904-3 Rule 5.01)"
  },
  {
    "id": 424,
    "code": "STATE-014",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transferencias de salud no consentidas bajo DPDPA de Delaware",
    "description": "Las bases de datos transmiten búsquedas de diagnósticos a terceros sin consentimiento explícito, violando la DPDPA de Delaware.",
    "severity": "critical",
    "reference": "6 Del. C. § 12D-106"
  },
  {
    "id": 425,
    "code": "STATE-015",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Listado de terceros incompleto bajo OCPA de Oregón",
    "description": "La política detalla categorías generales en lugar de los nombres específicos de los terceros que reciben datos, violando la OCPA de Oregón.",
    "severity": "moderate",
    "reference": "ORS § 646A.825"
  },
  {
    "id": 426,
    "code": "STATE-016",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Divulgación de venta de datos sensibles bajo NJPA de Nueva Jersey",
    "description": "El portal vende registros de Nueva Jersey con información sensible sin mostrar un aviso claro y obtener consentimiento, violando la NJPA.",
    "severity": "critical",
    "reference": "N.J.S.A. 56:8-166"
  },
  {
    "id": 427,
    "code": "STATE-017",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Divulgación incompleta de derechos bajo UCPA de Utah",
    "description": "El aviso omite cláusulas legales sobre los derechos en Utah, los plazos de verificación y la exclusión voluntaria, violando la UCPA.",
    "severity": "moderate",
    "reference": "Utah Code § 13-61-302"
  },
  {
    "id": 428,
    "code": "STATE-018",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Designación de oficial de privacidad bajo NHPA de Nuevo Hampshire",
    "description": "Los portales que procesan datos de Nuevo Hampshire no designan un contacto público de cumplimiento, violando la NHPA.",
    "severity": "moderate",
    "reference": "N.H. Rev. Stat. § 507-H:6"
  },
  {
    "id": 429,
    "code": "STATE-019",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Consentimiento de procesamiento infantil bajo MTCDPA de Montana",
    "description": "Los sitios que procesan datos de usuarios de Montana de 13 a 16 años no obtienen consentimiento expreso, violando la MTCDPA.",
    "severity": "critical",
    "reference": "Mont. Code § 30-14-311"
  },
  {
    "id": 430,
    "code": "STATE-020",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Plazos de respuesta incompletos bajo NEDPA de Nebraska",
    "description": "La documentación de soporte no se compromete al plazo legal de 45 días para responder a solicitudes, violando la NEDPA de Nebraska.",
    "severity": "moderate",
    "reference": "Neb. Rev. Stat. § 87-301"
  },
  {
    "id": 431,
    "code": "FIN-011",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación de notificación de incidentes TIC bajo DORA",
    "description": "Las plataformas financieras no documentan los procesos para reportar caídas de servicios TIC a los reguladores, violando DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 19"
  },
  {
    "id": 432,
    "code": "FIN-012",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Fallas de cifrado en archivos de clientes bajo GLBA",
    "description": "Los portales de préstamos guardan extractos bancarios sin implementar cifrado equivalente a AES-256, violando las normas de GLBA.",
    "severity": "critical",
    "reference": "16 CFR § 314.4(c)(1)"
  },
  {
    "id": 433,
    "code": "FIN-013",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Fallas de reporte de beneficiarios bajo la CTA",
    "description": "Las interfaces de registro empresarial no tienen campos seguros para registrar datos de propiedad beneficiaria, violando la CTA.",
    "severity": "serious",
    "reference": "31 U.S.C. § 5336"
  },
  {
    "id": 434,
    "code": "FIN-014",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Divulgación inadecuada de amenazas materiales bajo SEC 10-K",
    "description": "Los portales de empresas cotizadas alojan informes de la SEC que omiten evaluaciones de riesgos de ciberseguridad, violando las normas de la SEC.",
    "severity": "serious",
    "reference": "SEC Cybersecurity Rule (Form 10-K Item 1C)"
  },
  {
    "id": 435,
    "code": "FIN-015",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Reclamaciones de rendimiento engañosas bajo regla 2210 de FINRA",
    "description": "Las páginas de brókers muestran rendimientos de activos sin colocar advertencias de riesgo con la misma importancia, violando la regla 2210 de FINRA.",
    "severity": "serious",
    "reference": "FINRA Rule 2210"
  },
  {
    "id": 436,
    "code": "FIN-016",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Falta de divulgación de evaluación de control interno bajo SOX",
    "description": "Los portales de inversores no publican informes anuales de gestión que evalúen los controles financieros internos, violando la sección 404 de SOX.",
    "severity": "moderate",
    "reference": "SOX Section 404"
  },
  {
    "id": 437,
    "code": "FIN-017",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Exclusiones en registros de riesgo de terceros bajo DORA",
    "description": "Las aplicaciones conectan APIs de terceros sin llevar un registro consolidado de proveedores TIC y sus certificaciones, violando DORA.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2554 (DORA), Art. 30"
  },
  {
    "id": 438,
    "code": "FIN-018",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Notificaciones de opción de exclusión anual de GLBA incompletas",
    "description": "Los portales bancarios omiten instrucciones sobre la opción de exclusión anual para compartir datos con afiliados, violando las reglas de GLBA.",
    "severity": "serious",
    "reference": "16 CFR § 313.9"
  },
  {
    "id": 439,
    "code": "FIN-019",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Formato de registro que permite modificaciones bajo FINRA 4511",
    "description": "Los sistemas registran transacciones en bases de datos modificables en lugar de almacenamiento WORM (escritura única y lectura múltiple), violando FINRA.",
    "severity": "critical",
    "reference": "FINRA Rule 4511"
  },
  {
    "id": 440,
    "code": "FIN-020",
    "evidenceKind": "indicative",
    "category": "Financial / Corporate",
    "title": "Eliminación de historial electrónico bajo regla 1.31 de CFTC",
    "description": "Los portales de trading no configuran sus sistemas para garantizar un plazo de retención obligatorio de cinco años para los registros, violando la CFTC.",
    "severity": "critical",
    "reference": "CFTC Rule 1.31"
  },
  {
    "id": 441,
    "code": "OPS-011",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de advertencias de análisis de sentimientos de IA",
    "description": "Los chatbots con IA analizan las emociones de los usuarios en los mensajes sin mostrar advertencias claras, violando la Ley de IA de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(2)"
  },
  {
    "id": 442,
    "code": "OPS-012",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Sistemas de categorización biométrica con IA prohibidos",
    "description": "Las interfaces de verificación categorizan a los usuarios mediante biometría facial de fotos subidas sin base legal, violando la Ley de IA de la UE.",
    "severity": "critical",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 5(1)(c)"
  },
  {
    "id": 443,
    "code": "OPS-013",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de marcas de agua en metadatos de imágenes de IA",
    "description": "Las herramientas de IA generativa que crean imágenes o textos no incrustan marcas de agua en los metadatos, violando la Ley de IA de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1689 (EU AI Act), Art. 52(3)"
  },
  {
    "id": 444,
    "code": "OPS-014",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Divulgación de feeds algorítmicos bajo la DSA de la UE",
    "description": "Los sistemas de recomendación no detallan los parámetros y criterios de clasificación de sus feeds automáticos, violando la DSA de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 27"
  },
  {
    "id": 445,
    "code": "OPS-015",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de repositorio de publicidad bajo la DSA de la UE",
    "description": "Las grandes plataformas no ofrecen un registro público de anuncios que muestre patrocinadores y métricas de segmentación, violando la DSA de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 39"
  },
  {
    "id": 446,
    "code": "OPS-016",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de portal de apelación de shadow banning bajo la DSA",
    "description": "Las plataformas que limitan contenidos no notifican a los autores ni ofrecen un portal de quejas, violando la DSA de la UE.",
    "severity": "serious",
    "reference": "Regulation (EU) 2022/2065 (DSA), Art. 20"
  },
  {
    "id": 447,
    "code": "OPS-017",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de aceptación de billeteras eIDAS 2.0",
    "description": "Los portales de verificación no admiten la integración con las billeteras oficiales de identidad digital europea, violando eIDAS 2.0.",
    "severity": "serious",
    "reference": "Regulation (EU) 2024/1183 (eIDAS 2.0), Art. 6a"
  },
  {
    "id": 448,
    "code": "OPS-018",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de canal de reporte de vulnerabilidades bajo la CRA",
    "description": "Los portales de software no muestran un canal destacado para el reporte de fallos de seguridad, violando la Ley de Ciberresiliencia (CRA).",
    "severity": "serious",
    "reference": "Cyber Resilience Act (CRA), Art. 11"
  },
  {
    "id": 449,
    "code": "OPS-019",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de registro del DPO ante la ANPD bajo la LGPD",
    "description": "Las webs para Brasil recopilan datos sin registrar ni publicar los datos del DPO ante la ANPD, violando la LGPD de Brasil.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 41"
  },
  {
    "id": 450,
    "code": "OPS-020",
    "evidenceKind": "indicative",
    "category": "Digital Operations",
    "title": "Falta de verificación del tutor para la DPDP de la India",
    "description": "Los portales que recopilan datos de menores de 18 años en la India no verifican el consentimiento de padres o tutores, violando la DPDP.",
    "severity": "critical",
    "reference": "Digital Personal Data Protection Act (DPDP Act), Sec. 9"
  },
  {
    "id": 451,
    "code": "UAEPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento explícito para transferencia de datos en EAU",
    "description": "El sitio web transfiere datos de residentes de EAU a servidores externos sin obtener consentimiento o demostrar medidas de adecuación, violando la Ley de EAU No. 45.",
    "severity": "critical",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 22"
  },
  {
    "id": 452,
    "code": "UAEPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de contacto del DPO local de EAU en el portal",
    "description": "El sitio web para EAU no publica los datos de contacto de un DPO local cuando realiza un procesamiento de datos a gran escala, violando la PDPL de EAU.",
    "severity": "moderate",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 10"
  },
  {
    "id": 453,
    "code": "UAEPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Flujo de consentimiento infantil de EAU no conforme",
    "description": "El portal recopila datos personales de niños en EAU sin verificar el consentimiento de padres o tutores, violando las leyes de protección infantil de EAU.",
    "severity": "critical",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 6"
  },
  {
    "id": 454,
    "code": "UAEPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de registro de actividades de tratamiento de EAU",
    "description": "El backend no documenta ni mantiene un registro de actividades de tratamiento (ROPA) para las operaciones dirigidas a EAU, violando la PDPL de EAU.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 11"
  },
  {
    "id": 455,
    "code": "UAEPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Plazos de notificación de brechas en EAU inadecuados",
    "description": "Los términos y políticas de seguridad no se comprometen a notificar a la Oficina de Datos de EAU inmediatamente sobre cualquier brecha de seguridad, violando la ley.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 9"
  },
  {
    "id": 456,
    "code": "UAEPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión directa para perfilado en EAU",
    "description": "El panel de control no ofrece un botón claro en un clic para que los usuarios de EAU rechacen decisiones automatizadas y perfilado, violando la PDPL de EAU.",
    "severity": "serious",
    "reference": "UAE Federal Decree-Law No. 45 of 2021, Art. 18"
  },
  {
    "id": 457,
    "code": "SDPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de registro en el Portal Nacional de Datos de Arabia Saudita",
    "description": "Las empresas que procesan datos en Arabia Saudita no registran sus bases de datos ante la autoridad SDAIA, violando la PDPL de KSA.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 32"
  },
  {
    "id": 458,
    "code": "SDPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento explícito para marketing directo en KSA",
    "description": "Los formularios de suscripción para KSA no obtienen consentimiento explícito separado antes de enviar ofertas promocionales, violando la PDPL de Arabia Saudita.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 28"
  },
  {
    "id": 459,
    "code": "SDPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Almacenamiento ilegal de datos sensibles fuera de KSA",
    "description": "Los sitios web que transfieren datos de salud o financieros de KSA a servidores fuera del Reino sin autorización de la SDAIA cometen una infracción grave.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 29"
  },
  {
    "id": 460,
    "code": "SDPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación del propósito de tratamiento para KSA",
    "description": "La política de privacidad no vincula explícitamente los campos de recopilación con los propósitos específicos y legítimos de tratamiento para KSA, violando la ley.",
    "severity": "serious",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 5"
  },
  {
    "id": 461,
    "code": "SDPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Plazo de respuesta para eliminación de datos en KSA no conforme",
    "description": "El portal de soporte no procesa las solicitudes de eliminación de datos de residentes de KSA dentro de los plazos establecidos por las normas de Arabia Saudita.",
    "severity": "serious",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 21"
  },
  {
    "id": 462,
    "code": "SDPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento para rastreo de ciudadanos de KSA",
    "description": "El sitio web ejecuta rastreadores conductuales para visitantes de KSA antes de obtener un consentimiento explícito, violando la PDPL de Arabia Saudita.",
    "severity": "critical",
    "reference": "Saudi Arabia Personal Data Protection Law (PDPL) 2021, Art. 17"
  },
  {
    "id": 463,
    "code": "ILPA-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de registro de base de datos bajo ley de Israel",
    "description": "La plataforma trata datos de ciudadanos de Israel en bases de más de 10,000 personas sin el registro de ley, violando la Ley de Privacidad de Israel.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 8"
  },
  {
    "id": 464,
    "code": "ILPA-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de notificación del deber de entrega bajo la ley israelí",
    "description": "Los formularios no informan explícitamente a los usuarios si están legalmente obligados a entregar sus datos o si es voluntario, violando la Ley de Israel.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 11"
  },
  {
    "id": 465,
    "code": "ILPA-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Transferencia internacional de datos desde Israel no conforme",
    "description": "Las bases de datos transfieren registros de Israel a terceros países que no garantizan la misma protección sin cumplir las excepciones, violando el reglamento israelí.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Regulations (Transfer of Data to Databases Abroad) 5761-2001"
  },
  {
    "id": 466,
    "code": "ILPA-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de auditorías de seguridad bajo reglamento israelí",
    "description": "La empresa que procesa datos de Israel no realiza ni registra auditorías anuales de seguridad en su infraestructura de bases de datos, violando el reglamento israelí.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Regulations (Data Security) 5777-2017"
  },
  {
    "id": 467,
    "code": "ILPA-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Publicidad de correo directo no registrada en Israel",
    "description": "El comercio envía correos publicitarios a usuarios de Israel basados en perfilado sin registrar la base de datos para envíos directos, violando la ley de Israel.",
    "severity": "serious",
    "reference": "Israel Privacy Protection Act 5741-1981, Sec. 17C"
  },
  {
    "id": 468,
    "code": "TRKV-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de consentimiento explícito para cookies en Turquía",
    "description": "Los banners de cookies no bloquean scripts analíticos para usuarios en Turquía antes de recibir un consentimiento activo, violando las directrices de la KVKK de Turquía.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 5"
  },
  {
    "id": 469,
    "code": "TRKV-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de registro en el sistema turco VERBIS",
    "description": "Las empresas extranjeras que tratan datos de residentes en Turquía y superan los límites de ley no se registran en el sistema VERBIS, violando las reglas de la KVKK.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 16"
  },
  {
    "id": 470,
    "code": "TRKV-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Plazos de notificación de brechas en Turquía no conformes",
    "description": "El protocolo de seguridad no exige el reporte de brechas de datos a la junta KVKK de Turquía dentro del plazo legal de 72 horas, violando la ley.",
    "severity": "serious",
    "reference": "KVKK Board Decision on Breach Notification Timelines (Decision No. 2019/10)"
  },
  {
    "id": 471,
    "code": "TRKV-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de texto de aclaración de privacidad para Turquía",
    "description": "Los formularios web no presentan a los usuarios de Turquía un 'Texto de aclaración' (Aydınlatma Metni) separado de las políticas generales, violando la KVKK.",
    "severity": "serious",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 10"
  },
  {
    "id": 472,
    "code": "TRKV-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Transferencia internacional de datos desde Turquía sin autorización de la junta",
    "description": "La base de datos envía registros de usuarios turcos a servidores fuera de Turquía sin consentimiento explícito o protocolos de compromiso estándar, violando la KVKK.",
    "severity": "critical",
    "reference": "Turkey Law on Protection of Personal Data (KVKK) No. 6698, Art. 9"
  },
  {
    "id": 473,
    "code": "CHFADP-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de divulgación de decisiones automatizadas en Suiza",
    "description": "El sitio web utiliza sistemas automatizados de perfilado para residentes en Suiza sin mostrar advertencias ni ofrecer revisión humana, violando la FADP de Suiza.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 21"
  },
  {
    "id": 474,
    "code": "CHFADP-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de representante para controladores extranjeros en Suiza",
    "description": "Las empresas extranjeras que tratan volúmenes altos de datos de Suiza no designan un representante local en el país, violando la FADP de Suiza.",
    "severity": "moderate",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 14"
  },
  {
    "id": 475,
    "code": "CHFADP-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de publicación del registro de actividades en Suiza",
    "description": "Los sistemas corporativos que no mantienen un registro de actividades (ROPA) bajo las normas suizas enfrentan responsabilidades bajo la FADP revisada.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 12"
  },
  {
    "id": 476,
    "code": "CHFADP-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Transferencia de datos desde Suiza sin garantías de adecuación",
    "description": "Las copias de seguridad de la web envían datos de Suiza a países sin nivel adecuado de protección sin contratos estándar vigentes, violando la FADP.",
    "severity": "critical",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 16"
  },
  {
    "id": 477,
    "code": "CHFADP-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de consentimiento explícito para datos sensibles en Suiza",
    "description": "Los formularios que recopilan datos sensibles de usuarios en Suiza no obtienen un consentimiento explícito y activo, violando la FADP.",
    "severity": "critical",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 6"
  },
  {
    "id": 478,
    "code": "CHFADP-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de notificación rápida de brechas de datos en Suiza",
    "description": "Los registros del sistema no admiten la notificación rápida al Comisionado Federal (FDPIC) ante brechas de datos de alto riesgo en Suiza, violando la FADP.",
    "severity": "serious",
    "reference": "Swiss Federal Act on Data Protection (FADP) 2023, Art. 24"
  },
  {
    "id": 479,
    "code": "UKGDPR-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta del Anexo del Reino Unido (UK Addendum) para transferencias",
    "description": "Los servicios de bases de datos envían registros del Reino Unido a servidores internacionales sin el Acuerdo de Transferencia (IDTA) o el Anexo del Reino Unido vigente.",
    "severity": "critical",
    "reference": "UK Data Protection Act 2018 / UK GDPR"
  },
  {
    "id": 480,
    "code": "UKGDPR-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de registro y pago de tarifa ante la ICO del Reino Unido",
    "description": "Las empresas extranjeras que tratan datos del Reino Unido no se registran ni pagan la tarifa anual ante la Oficina del Comisionado (ICO), violando las leyes del país.",
    "severity": "moderate",
    "reference": "UK Data Protection (Charges and Information) Regulations 2018"
  },
  {
    "id": 481,
    "code": "UKGDPR-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de representante en el Reino Unido bajo el UK GDPR",
    "description": "Las empresas extranjeras dirigidas al mercado del Reino Unido no designan ni publican un representante en el país, violando el UK GDPR.",
    "severity": "serious",
    "reference": "UK GDPR, Art. 27"
  },
  {
    "id": 482,
    "code": "UKGDPR-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Procesamiento de datos infantiles no conforme al código del Reino Unido",
    "description": "El sitio web que recopila datos de menores de 18 años en el Reino Unido no establece la privacidad por defecto con el nivel alto exigido, violando el Código Infantil.",
    "severity": "critical",
    "reference": "UK Age-Appropriate Design Code (Children's Code)"
  },
  {
    "id": 483,
    "code": "UKOSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de verificación de edad para contenido nocivo (UK OSA)",
    "description": "Los portales con contenidos de usuarios no utilizan procedimientos fiables de comprobación de edad para restringir el acceso a menores, violando la OSA del Reino Unido.",
    "severity": "critical",
    "reference": "UK Online Safety Act 2023"
  },
  {
    "id": 484,
    "code": "UKOSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de canal de reporte de contenido nocivo bajo la ley del Reino Unido",
    "description": "Los sitios con foros interactivos no muestran un portal destacado para denunciar contenidos ilegales o nocivos, violando las normas de seguridad del Reino Unido.",
    "severity": "serious",
    "reference": "UK Online Safety Act 2023"
  },
  {
    "id": 485,
    "code": "AUSPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de cumplimiento de solicitudes de borrado bajo ley de Australia",
    "description": "El soporte no ofrece un canal de ley para que los ciudadanos de Australia soliciten la destrucción o desidentificación de datos, violando los principios APP.",
    "severity": "serious",
    "reference": "Australia Privacy Act 1988 - Australian Privacy Principles (APPs)"
  },
  {
    "id": 486,
    "code": "AUSPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia de datos fuera de Australia sin medidas contractuales",
    "description": "Los datos de Australia se envían a servidores fuera del país sin tomar medidas razonables para garantizar la protección por parte del receptor, violando el APP 8.",
    "severity": "critical",
    "reference": "Australia Privacy Act 1988 - APP 8"
  },
  {
    "id": 487,
    "code": "AUSPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento para cookies de marketing en Australia",
    "description": "El comercio ejecuta píxeles para publicidad dirigida a usuarios de Australia antes de recibir consentimiento, violando las reformas de la Ley de Privacidad.",
    "severity": "critical",
    "reference": "Australia Privacy Act 1988 Reforms"
  },
  {
    "id": 488,
    "code": "AUSPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de los países de destino en la política de Australia",
    "description": "La política de privacidad no detalla la lista de países donde es probable que se alojen o divulguen los registros personales, violando el APP 1 de Australia.",
    "severity": "moderate",
    "reference": "Australia Privacy Act 1988 - APP 1"
  },
  {
    "id": 489,
    "code": "AUSPA-005",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Violación de baja bajo la Ley de Spam de Australia",
    "description": "Los correos de marketing se siguen enviando a Australia después del plazo de 5 días hábiles tras haberse procesado la solicitud de baja, violando la Ley de Spam.",
    "severity": "serious",
    "reference": "Australia Spam Act 2003"
  },
  {
    "id": 490,
    "code": "AUSPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Marketing directo ilegal sin opción de exclusión voluntaria bajo APP 7",
    "description": "El sitio ofrece servicios a Australia usando perfiles personales sin dar una opción de baja gratuita y visible en cada mensaje, violando el APP 7.",
    "severity": "serious",
    "reference": "Australia Privacy Act 1988 - APP 7"
  },
  {
    "id": 491,
    "code": "AUSPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de verificación de calidad de datos bajo ley de Australia",
    "description": "La base de datos no cuenta con comprobaciones para asegurar que los datos recopilados de Australia se mantengan exactos y actualizados, violando el APP 10.",
    "severity": "moderate",
    "reference": "Australia Privacy Act 1988 - APP 10"
  },
  {
    "id": 492,
    "code": "NZPR-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de contacto del oficial de privacidad en Nueva Zelanda",
    "description": "Los portales que tratan datos en Nueva Zelanda no designan ni publican los datos de un oficial de privacidad, violando la Ley de Nueva Zelanda.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 1"
  },
  {
    "id": 493,
    "code": "NZPR-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de reporte de brechas de datos de alto riesgo en Nueva Zelanda",
    "description": "Los sistemas no contemplan la notificación rápida al Comisionado de Nueva Zelanda ante brechas de alto riesgo, violando la Ley de Privacidad.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, Part 6"
  },
  {
    "id": 494,
    "code": "NZPR-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de acceso para usuarios de Nueva Zelanda (IPP 6)",
    "description": "El panel no ofrece a los usuarios de Nueva Zelanda una vía para ver y descargar una copia completa de sus datos registrados, violando el IPP 6.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020, IPP 6"
  },
  {
    "id": 495,
    "code": "NZPR-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Almacenamiento de registros de Nueva Zelanda en países no autorizados (IPP 12)",
    "description": "Los datos de usuarios de Nueva Zelanda se guardan en servidores en el extranjero sin garantías de nivel comparable de protección, violando el IPP 12.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020, IPP 12"
  },
  {
    "id": 496,
    "code": "NZPR-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Recopilación de datos innecesarios de residentes de Nueva Zelanda",
    "description": "Los formularios exigen datos personales innecesarios a residentes de Nueva Zelanda que no son necesarios para la transacción, violando el IPP 1.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020, IPP 1"
  },
  {
    "id": 497,
    "code": "SGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de contacto de DPO para Singapur",
    "description": "El sitio dirigido a Singapur no muestra la dirección o correo del DPO designado en su política de privacidad, violando la PDPA.",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012, Sec. 11"
  },
  {
    "id": 498,
    "code": "SGPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de documentación de las reglas de consentimiento tácito en Singapur",
    "description": "El portal procesa datos bajo las reglas de 'consentimiento tácito' de Singapur sin realizar una evaluación de impacto previa, violando las pautas de la PDPA.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 Amendments"
  },
  {
    "id": 499,
    "code": "SGPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Acciones de portabilidad de datos no conformes en Singapur",
    "description": "Los paneles de usuario no ofrecen vías de transmisión de portabilidad automáticas para los perfiles de Singapur al exportar, violando la PDPA.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 Portability Provisions"
  },
  {
    "id": 500,
    "code": "SGPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Plazos de notificación de brechas en Singapur no conformes",
    "description": "El protocolo de incidentes no exige la notificación a la PDPC de Singapur dentro de los 3 días calendario posteriores a detectar una brecha, violando la ley.",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012, Sec. 26D"
  },
  {
    "id": 501,
    "code": "SGPD-008",
    "evidenceKind": "observable",
    "category": "TCPA / Telecom",
    "title": "Violaciones del registro Do Not Call (DNC) de Singapur",
    "description": "Las herramientas de telemarketing envían ofertas a teléfonos de Singapur sin verificar los números contra el registro DNC nacional, violando la PDPA.",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA) 2012 - DNC Provisions"
  },
  {
    "id": 502,
    "code": "MYPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de aviso de privacidad bilingüe en Malasia",
    "description": "El sitio web para Malasia no presenta su política de privacidad en ambos idiomas oficiales (malayo e inglés), violando las normas de la PDPA.",
    "severity": "moderate",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 7(3)"
  },
  {
    "id": 503,
    "code": "MYPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia de datos fuera de Malasia sin autorización legal",
    "description": "Las bases de datos transfieren registros de Malasia al extranjero sin consentimiento explícito o excepciones legales, violando la PDPA de Malasia.",
    "severity": "critical",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 129"
  },
  {
    "id": 504,
    "code": "MYPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de control de precisión de datos bajo ley de Malasia",
    "description": "La base de datos de la web no cuenta con métodos para asegurar que los datos de Malasia se procesen con exactitud, violando la PDPA.",
    "severity": "moderate",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 11"
  },
  {
    "id": 505,
    "code": "MYPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles en Malasia sin consentimiento explícito",
    "description": "Los formularios web recopilan datos sensibles en Malasia sin obtener consentimiento por escrito, violando la PDPA.",
    "severity": "critical",
    "reference": "Malaysia Personal Data Protection Act (PDPA) 2010, Sec. 40"
  },
  {
    "id": 506,
    "code": "THPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de publicación de los datos del DPO en Tailandia",
    "description": "El sitio web dirigido a Tailandia no publica de forma visible los datos del DPO, violando las normas de la PDPA de Tailandia.",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 41"
  },
  {
    "id": 507,
    "code": "THPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de interfaz de revocación de consentimiento en Tailandia",
    "description": "El panel de control no ofrece un método sencillo para que los usuarios en Tailandia retiren su consentimiento, violando la PDPA.",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 19"
  },
  {
    "id": 508,
    "code": "THPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia de datos desde Tailandia sin nivel de protección adecuado",
    "description": "Las copias de seguridad de datos envían registros de Tailandia a servidores extranjeros sin cumplir el nivel de protección de ley, violando la PDPA.",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 28"
  },
  {
    "id": 509,
    "code": "THPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de registro de actividades de tratamiento para Tailandia",
    "description": "Los controladores que tratan datos en Tailandia no registran ni conservan logs de las operaciones y evaluaciones de bases de datos, violando la PDPA.",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 39"
  },
  {
    "id": 510,
    "code": "THPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Recopilación de datos sensibles en Tailandia sin consentimiento explícito",
    "description": "Los formularios en línea recopilan datos biométricos o de salud de Tailandia sin obtener consentimiento explícito, violando la PDPA.",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA) 2019, Sec. 26"
  },
  {
    "id": 511,
    "code": "VNDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto para transferencia desde Vietnam",
    "description": "Las empresas que envían datos de Vietnam al extranjero no presentan la evaluación de impacto ante el Ministerio de Seguridad Pública, violando el Decreto 13.",
    "severity": "critical",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 25"
  },
  {
    "id": 512,
    "code": "VNDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos de menores en Vietnam no conforme",
    "description": "Las aplicaciones web que recopilan datos de niños mayores de 7 años en Vietnam no obtienen la aprobación del menor junto al tutor, violando el Decreto 13.",
    "severity": "critical",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 20"
  },
  {
    "id": 513,
    "code": "VNDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de localización de servidores exigidos por la ley de Vietnam",
    "description": "Los sistemas corporativos no utilizan servidores locales para alojar los registros de Vietnam dentro del territorio nacional cuando lo exige la ley, violando las normas.",
    "severity": "critical",
    "reference": "Vietnam Law on Cybersecurity No. 24/2018/QH14, Art. 26"
  },
  {
    "id": 514,
    "code": "VNDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación del contacto del DPO en Vietnam",
    "description": "Las empresas que tratan datos sensibles en Vietnam no publican el contacto del DPO o departamento de protección en sus políticas, violando el Decreto 13.",
    "severity": "moderate",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 28"
  },
  {
    "id": 515,
    "code": "VNDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditorías de seguridad en bases de datos de Vietnam",
    "description": "Las plataformas que tratan datos de Vietnam no realizan evaluaciones anuales de seguridad en sus bases de datos, violando el Decreto 13.",
    "severity": "serious",
    "reference": "Vietnam Decree 13/2023/ND-CP on Personal Data Protection, Art. 27"
  },
  {
    "id": 516,
    "code": "DPDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de aviso de privacidad multilingüe en la India",
    "description": "El sitio web para la India no ofrece la opción de ver los avisos en los 22 idiomas oficiales de la Constitución de la India, violando la Ley DPDP.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 5(3)"
  },
  {
    "id": 517,
    "code": "DPDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de canal local de resolución de disputas para la India",
    "description": "El portal de soporte no ofrece a los usuarios en la India un canal claro para presentar quejas y contactar a un oficial local de quejas, violando la Ley DPDP.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 13"
  },
  {
    "id": 518,
    "code": "DPDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de consentimiento de la India no cumple con la especificación de propósito",
    "description": "Los formularios recopilan datos de la India sin mostrar un aviso claro que detalle qué datos se recogen y para qué, violando la Ley DPDP.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 5(1)"
  },
  {
    "id": 519,
    "code": "DPDP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de datos de contacto de DPO o administrador de consentimientos en la India",
    "description": "La política de privacidad para la India omite los datos de contacto del DPO y del administrador de consentimientos habilitado, violando la Ley DPDP.",
    "severity": "moderate",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 6"
  },
  {
    "id": 520,
    "code": "DPDP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Perfilado o rastreo de menores en la India no conforme",
    "description": "La web ejecuta cookies de rastreo conductual o dirige anuncios dirigidos a menores de 18 años en la India, violando las prohibiciones de la Ley DPDP.",
    "severity": "critical",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 9(2)"
  },
  {
    "id": 521,
    "code": "DPDP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de control de borrado de datos en subencargados en la India",
    "description": "La base de datos no transfiere de forma automática las solicitudes de borrado de la India a sus subencargados y proveedores de hosting, violando la Ley DPDP.",
    "severity": "serious",
    "reference": "Digital Personal Data Protection Act (DPDP Act) 2023, Sec. 12"
  },
  {
    "id": 522,
    "code": "JPAP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de transferencias internacionales bajo APPI de Japón",
    "description": "La política de privacidad no detalla los países destino de los datos ni los sistemas de seguridad de los servidores receptores, violando la APPI de Japón.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 28"
  },
  {
    "id": 523,
    "code": "JPAP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Divulgación incompleta de medidas de seguridad de bases de datos en Japón",
    "description": "La política de la empresa no detalla las medidas de control físico, técnico y administrativo para la protección de los datos de Japón, violando la APPI.",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 32"
  },
  {
    "id": 524,
    "code": "JPAP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento para procesar información seudonimizada en Japón",
    "description": "El sitio web trata datos seudonimizados (como IDs de cookies vinculados a perfiles) de usuarios en Japón sin cumplir los requisitos de la APPI.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 41"
  },
  {
    "id": 525,
    "code": "JPAP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de información referible a personas en Japón no conforme",
    "description": "Las bases de datos envían identificadores a terceros sabiendo que se vincularán a registros personales en Japón sin verificar el consentimiento, violando la APPI.",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 31"
  },
  {
    "id": 526,
    "code": "JPAP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de sistema de reporte de brechas de datos ante la PPC de Japón",
    "description": "Las normas de la empresa no contemplan la notificación obligatoria ante brechas de datos graves a la Comisión (PPC) de Japón, violando la APPI.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI), Sec. 26"
  },
  {
    "id": 527,
    "code": "JPAP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Telemarketing no registrado o sin exclusión visible en Japón",
    "description": "Los formularios que recogen teléfonos de Japón no muestran casillas de baja ni verifican las preferencias de los usuarios, violando la APPI.",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI) Guidelines"
  },
  {
    "id": 528,
    "code": "SKPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de separación de casillas de consentimiento en formularios de Corea del Sur",
    "description": "Los formularios para Corea del Sur agrupan el consentimiento para marketing opcional con los términos obligatorios en una sola opción, violando la PIPA.",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 22"
  },
  {
    "id": 529,
    "code": "SKPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento no conforme de números de registro de residente (RRN) en Corea del Sur",
    "description": "Las webs tratan números de registro (RRN) de Corea del Sur sin autorización legal expresa o medidas de cifrado sólidas, violando la PIPA.",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 24-2"
  },
  {
    "id": 530,
    "code": "SKPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de publicación del DPO en idioma local para Corea del Sur",
    "description": "El aviso para Corea del Sur no detalla la dirección o teléfono del DPO en idioma coreano, violando las normas de la PIPA.",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 31"
  },
  {
    "id": 531,
    "code": "SKPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de información sobre transferencias internacionales en Corea del Sur",
    "description": "El aviso no informa a los usuarios de Corea del Sur sobre la fecha, país destino y propósito de las transferencias al extranjero, violando la PIPA.",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 39-11"
  },
  {
    "id": 532,
    "code": "SKPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Plazos de notificación de brechas en Corea del Sur no conformes",
    "description": "Las pautas de incidentes no exigen notificar las brechas graves (de más de 1,000 usuarios) ante la PIPC de Corea del Sur dentro de las 24 horas, violando la PIPA.",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA), Art. 34"
  },
  {
    "id": 533,
    "code": "LGPD-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de registro del DPO ante la ANPD bajo la LGPD",
    "description": "Las empresas que tratan datos en Brasil no registran ni publican los datos de su DPO (Encarregado) ante la autoridad ANPD, violando la LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 41"
  },
  {
    "id": 534,
    "code": "LGPD-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de consentimiento explícito para datos sensibles en Brasil",
    "description": "Los formularios recopilan datos sensibles en Brasil sin obtener un consentimiento explícito y firmado en una casilla separada, violando la LGPD.",
    "severity": "critical",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 11"
  },
  {
    "id": 535,
    "code": "LGPD-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Acciones de portabilidad de datos no conformes en Brasil",
    "description": "El panel no ofrece a los usuarios de Brasil un método automático para exportar y transferir sus datos a plataformas competidoras, violando la LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 9"
  },
  {
    "id": 536,
    "code": "LGPD-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de documentación de bases legales de tratamiento para Brasil",
    "description": "La política de privacidad no vincula cada categoría de datos con una de las diez bases legales legítimas exigidas por la LGPD, violando la ley.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 7"
  },
  {
    "id": 537,
    "code": "LGPD-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de cumplimiento inmediato de solicitudes de borrado en Brasil",
    "description": "El soporte no elimina los datos personales de forma inmediata tras recibir una solicitud de borrado de usuarios de Brasil, violando la LGPD.",
    "severity": "serious",
    "reference": "Lei Geral de Proteção de Dados (LGPD), Art. 16"
  },
  {
    "id": 538,
    "code": "POPI-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de registro del Oficial de Información en Sudáfrica",
    "description": "Las empresas que procesan datos en Sudáfrica no registran a su Oficial de Información ante el Regulador de Información, violando la ley POPIA.",
    "severity": "serious",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 55"
  },
  {
    "id": 539,
    "code": "POPI-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de consentimiento para marketing electrónico directo en Sudáfrica",
    "description": "Los portales envían ofertas por correo o SMS a Sudáfrica sin consentimiento previo de los destinatarios, violando la sección 69 de la ley POPIA.",
    "severity": "critical",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 69"
  },
  {
    "id": 540,
    "code": "POPI-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Almacenamiento inseguro de números de identidad de Sudáfrica",
    "description": "Las bases de datos guardan números de identidad de Sudáfrica en columnas sin cifrar o permiten accesos no autorizados, violando las normas de POPIA.",
    "severity": "critical",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 19"
  },
  {
    "id": 541,
    "code": "POPI-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de control de los límites del propósito de datos en Sudáfrica",
    "description": "Las aplicaciones tratan datos de Sudáfrica para fines incompatibles con los propósitos de recogida originales sin consentimiento, violando la ley POPIA.",
    "severity": "serious",
    "reference": "Protection of Personal Information Act (POPIA) 2013, Sec. 15"
  },
  {
    "id": 542,
    "code": "POPI-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de publicación del manual PAIA en portales corporativos de Sudáfrica",
    "description": "Las webs para Sudáfrica no publican el manual PAIA con los procesos de acceso a la información de la empresa, violando la Ley de Acceso a la Información (PAIA).",
    "severity": "moderate",
    "reference": "Promotion of Access to Information Act (PAIA) 2000"
  },
  {
    "id": 543,
    "code": "NDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de auditorías de datos bajo ley de Nigeria",
    "description": "Los controladores que tratan datos en Nigeria no presentan sus informes de auditoría anuales ante la Comisión (NDPC), violando la Ley NDPA.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 33"
  },
  {
    "id": 544,
    "code": "NDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de consentimiento para marketing directo en Nigeria",
    "description": "Los registros web suscriben a usuarios de Nigeria a listas promocionales sin obtener su consentimiento previo, violando las normas de protección de datos.",
    "severity": "critical",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 26"
  },
  {
    "id": 545,
    "code": "NDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Transferencia internacional de datos desde Nigeria sin base legal",
    "description": "Las bases de datos envían registros de Nigeria al extranjero sin cumplir con el nivel de protección o contratos de ley, violando la Ley NDPA.",
    "severity": "critical",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 41"
  },
  {
    "id": 546,
    "code": "NDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditorías de seguridad en bases de datos bajo ley de Nigeria",
    "description": "La empresa que trata datos de Nigeria no realiza ni documenta auditorías anuales en sus sistemas de bases de datos, violando la Ley NDPA.",
    "severity": "serious",
    "reference": "Nigeria Data Protection Act (NDPA) 2023, Sec. 39"
  },
  {
    "id": 547,
    "code": "MXPD-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de estructura de Aviso de Privacidad exigida por ley de México",
    "description": "El aviso para usuarios de México no cuenta con la estructura formal exigida para un Aviso de Privacidad, violando la LFPDPPP.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 15"
  },
  {
    "id": 548,
    "code": "MXPD-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de consentimiento por escrito para datos sensibles en México",
    "description": "Los formularios recopilan datos financieros o médicos en México sin consentimiento expreso por escrito del usuario, violando la LFPDPPP.",
    "severity": "critical",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 9"
  },
  {
    "id": 549,
    "code": "MXPD-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de descripción del proceso de derechos ARCO para México",
    "description": "La política de privacidad no describe el proceso ni los plazos para ejercer los derechos ARCO (Acceso, Rectificación, Cancelación, Oposición), violando la ley.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 22"
  },
  {
    "id": 550,
    "code": "MXPD-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de medidas de seguridad administrativas exigidas por ley de México",
    "description": "Los registros que procesan datos de México no cuentan con las medidas de seguridad físicas, técnicas y administrativas exigidas, violando la LFPDPPP.",
    "severity": "serious",
    "reference": "Mexico Federal Law on Protection of Personal Data (LFPDPPP), Art. 19"
  },
{
  "id": 551,
  "code": "ARGPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de registro de bases de datos ante la AAIP (Argentina)",
  "description": "El responsable del tratamiento procesa datos personales de residentes argentinos sin registrar sus bases de datos ante la Agencia de Acceso a la Información Pública (AAIP).",
  "severity": "critical",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 3"
},
{
  "id": 552,
  "code": "ARGPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de canales explícitos para derechos ARCO bajo la ley argentina",
  "description": "La política de privacidad no explica cómo los titulares de datos argentinos pueden ejercer sus derechos de acceso, rectificación, supresión y confidencialidad.",
  "severity": "serious",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 14"
},
{
  "id": 553,
  "code": "ARGPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de medidas de seguridad locales para repositorios de datos argentinos",
  "description": "Los sistemas de bases de datos que contienen datos de residentes argentinos no implementan las medidas de seguridad organizativas y técnicas exigidas por la AAIP.",
  "severity": "moderate",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 9"
},
{
  "id": 554,
  "code": "ARGPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Marketing directo ilegal sin verificación de exclusión bajo la ley argentina",
  "description": "El sitio web realiza marketing directo a residentes argentinos sin verificar el registro nacional 'No Llame' ni proporcionar un enlace de exclusión directo.",
  "severity": "serious",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 27"
},
{
  "id": 555,
  "code": "ARGPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de garantías adecuadas de transferencia a terceros países para datos argentinos",
  "description": "El responsable transfiere datos de residentes argentinos a países o entidades que no proporcionan niveles de protección adecuados según los estándares de la AAIP.",
  "severity": "moderate",
  "reference": "Argentina Personal Data Protection Act (Ley 25.326), Art. 12"
},
{
  "id": 556,
  "code": "COLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de registro obligatorio de bases de datos en Colombia (RNBD)",
  "description": "El responsable del tratamiento no registra sus bases de datos personales que contienen datos de residentes colombianos en el Registro Nacional de Bases de Datos (RNBD).",
  "severity": "critical",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 25"
},
{
  "id": 557,
  "code": "COLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ausencia de consentimiento previo explícito para residentes colombianos",
  "description": "El sitio web recopila y procesa datos de residentes colombianos sin obtener el consentimiento previo, explícito e informado ejecutable posteriormente.",
  "severity": "serious",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 9"
},
{
  "id": 558,
  "code": "COLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de canales conformes para el manejo de reclamos bajo la ley colombiana",
  "description": "La política de privacidad no documenta los canales y plazos legales (15 días hábiles) para resolver consultas o reclamos de titulares colombianos.",
  "severity": "moderate",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 15"
},
{
  "id": 559,
  "code": "COLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de auditoría de protocolos de flujo de datos transfronterizo bajo la ley colombiana",
  "description": "El responsable transfiere datos personales colombianos a terceros países sin confirmar la adecuación o asegurar la autorización de la SIC.",
  "severity": "serious",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 26"
},
{
  "id": 560,
  "code": "COLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento ilícito de datos de menores sin representación paterna en Colombia",
  "description": "El sitio web recopila datos de niños o adolescentes colombianos sin implementar la verificación de la autorización de los padres o representantes legales.",
  "severity": "moderate",
  "reference": "Colombia Data Protection Law (Ley 1581 of 2012), Art. 7"
},
{
  "id": 561,
  "code": "CHLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de atención a solicitudes de supresión o rectificación de ciudadanos chilenos",
  "description": "El sitio web no proporciona canales automatizados o documentados para que los residentes chilenos soliciten la supresión o rectificación de sus datos.",
  "severity": "critical",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 12"
},
{
  "id": 562,
  "code": "CHLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento ilegal de datos sensibles sin autorización escrita en Chile",
  "description": "El sitio recopila datos sensibles de ciudadanos chilenos (salud, ideología) sin obtener el consentimiento explícito por escrito o digital equivalente.",
  "severity": "serious",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 10"
},
{
  "id": 563,
  "code": "CHLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de divulgación adecuada de seguridad para repositorios de datos chilenos",
  "description": "Los sistemas de tratamiento de datos que contienen datos de residentes chilenos carecen de medidas técnicas documentadas de protección contra accesos no autorizados.",
  "severity": "moderate",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 11"
},
{
  "id": 564,
  "code": "CHLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Marketing directo por correo no conforme sin opción de exclusión bajo la ley chilena",
  "description": "El sitio web envía correos comerciales a residentes chilenos sin proporcionar un mecanismo de exclusión explícito, gratuito y fácil de usar.",
  "severity": "serious",
  "reference": "Chile Consumer Protection Act (Ley 19.496), Art. 28B"
},
{
  "id": 565,
  "code": "CHLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Contratos de transferencia inadecuados para el tratamiento de datos de residentes chilenos",
  "description": "El responsable comparte datos de residentes chilenos con terceros proveedores de servicios sin acuerdos formales que definan los deberes de seguridad y manejo.",
  "severity": "moderate",
  "reference": "Chile Law on Private Life Protection (Ley 19.628), Art. 4"
},
{
  "id": 566,
  "code": "PERPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de registro de bancos de datos personales en el RNDP de Perú",
  "description": "El responsable no registra sus bancos de datos personales que contienen información de residentes peruanos ante el Registro Nacional de Protección de Datos Personales.",
  "severity": "critical",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 30"
},
{
  "id": 567,
  "code": "PERPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Divulgación incompleta de transferencias internacionales de datos peruanos",
  "description": "La política de privacidad no identifica a los terceros específicos ni los lugares de transferencia fuera del Perú, violando las obligaciones legales de transparencia.",
  "severity": "serious",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 18"
},
{
  "id": 568,
  "code": "PERPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de procedimientos de derechos ARCO directos e inmediatos bajo la ley peruana",
  "description": "El sitio web carece de instrucciones y plazos específicos (ej. 8 días para acceso, 10 días para rectificación) para ejercer los derechos ARCO según la ley peruana.",
  "severity": "moderate",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 19"
},
{
  "id": 569,
  "code": "PERPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de obtención de consentimiento previo claro para cookies de seguimiento en Perú",
  "description": "El sitio web implementa cookies de publicidad o análisis antes de obtener el consentimiento de los residentes peruanos, violando los estándares de consentimiento.",
  "severity": "serious",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 12"
},
{
  "id": 570,
  "code": "PERPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Representación legal inadecuada para el tratamiento de datos en Perú por entidades extranjeras",
  "description": "Las entidades extranjeras que procesan datos de residentes peruanos no designan un representante legal local o domicilio para notificaciones dentro de Perú.",
  "severity": "moderate",
  "reference": "Peru Data Protection Law (Ley 29733), Art. 34"
},
{
  "id": 571,
  "code": "URYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de registro de actividad de tratamiento de datos ante la URCDP (Uruguay)",
  "description": "El responsable no registra sus bases de datos o planes de tratamiento de datos ante la Unidad Reguladora y de Control de Datos Personales (URCDP).",
  "severity": "critical",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 31"
},
{
  "id": 572,
  "code": "URYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de documentación y notificación de brechas de seguridad en Uruguay dentro de las 24 horas",
  "description": "El sitio web carece de protocolos formales para documentar y reportar incidentes de seguridad a la URCDP dentro de las 24 horas posteriores a su descubrimiento.",
  "severity": "serious",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 12 (amended)"
},
{
  "id": 573,
  "code": "URYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de designación de representante local uruguayo para responsables extranjeros",
  "description": "Las empresas extranjeras dirigidas al mercado uruguayo no designan un representante local para responder a las demandas del regulador bajo la Ley 18.331.",
  "severity": "moderate",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 34"
},
{
  "id": 574,
  "code": "URYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento no conforme de datos biométricos o sensibles en Uruguay",
  "description": "El sitio web recopila datos sensibles (salud, identificadores biométricos) de residentes uruguayos sin obtener consentimiento explícito, previo y por escrito.",
  "severity": "serious",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 18"
},
{
  "id": 575,
  "code": "URYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de acciones de portabilidad explícitas para residentes de Uruguay",
  "description": "El responsable no proporciona vías directas o formatos estandarizados para atender las solicitudes de portabilidad de los consumidores uruguayos.",
  "severity": "moderate",
  "reference": "Uruguay Personal Data Protection Act (Ley 18.331), Art. 14"
},
{
  "id": 576,
  "code": "ECUPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Interfaces de consentimiento inadecuadas para residentes ecuatorianos (LOPDP)",
  "description": "Las interfaces de consentimiento no ofrecen casillas de verificación independientes para diferentes fines de tratamiento dirigidos a consumidores ecuatorianos.",
  "severity": "critical",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 8"
},
{
  "id": 577,
  "code": "ECUPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de vías de recurso localizadas ante la Autoridad de Protección ecuatoriana",
  "description": "La política de privacidad no documenta los derechos de recurso del usuario ni proporciona una vía para presentar reclamos ante la Superintendencia de Protección de Datos de Ecuador.",
  "severity": "serious",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 33"
},
{
  "id": 578,
  "code": "ECUPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de ejecución de Evaluaciones de Impacto de Protección de Datos (DPIA) en Ecuador",
  "description": "El responsable no realiza ni registra Evaluaciones de Impacto de Protección de Datos para perfiles de alto riesgo dirigidos a sujetos ecuatorianos.",
  "severity": "moderate",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 40"
},
{
  "id": 579,
  "code": "ECUPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Comunicaciones de marketing ilegales sin consentimiento verificado en Ecuador",
  "description": "El sitio web envía mensajes comerciales a residentes ecuatorianos sin recopilar un consentimiento explícito e independiente para fines promocionales.",
  "severity": "serious",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 12"
},
{
  "id": 580,
  "code": "ECUPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de medidas de seguridad e integridad para bases de datos en Ecuador",
  "description": "Las bases de datos que tratan información de consumidores ecuatorianos carecen de planes de seguridad administrativos, técnicos y físicos documentados.",
  "severity": "moderate",
  "reference": "Ecuador Law on Protection of Personal Data (LOPDP), Art. 37"
},
{
  "id": 581,
  "code": "CRIAP-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de registro de bases de datos ante PRODHAB (Costa Rica)",
  "description": "La entidad trata datos personales costarricenses sin registrar las bases de datos ante la Agencia de Protección de Datos de los Habitantes (PRODHAB).",
  "severity": "critical",
  "reference": "Costa Rica Law 8968, Art. 12"
},
{
  "id": 582,
  "code": "CRIAP-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Divulgación incompleta de autodeterminación informativa en Costa Rica",
  "description": "El aviso de privacidad no revela los derechos obligatorios de autodeterminación informativa y la ruta para revocar el consentimiento.",
  "severity": "serious",
  "reference": "Costa Rica Law 8968, Art. 5"
},
{
  "id": 583,
  "code": "CRIAP-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de protocolos de verificación para el tratamiento de datos sensibles costarricenses",
  "description": "Se recopilan categorías sensibles de datos personales (salud, biométricos) de titulares costarricenses sin protocolos explícitos de verificación previa.",
  "severity": "moderate",
  "reference": "Costa Rica Law 8968, Art. 9"
},
{
  "id": 584,
  "code": "CRIAP-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia ilícita de datos costarricenses a terceros países no adecuados",
  "description": "El sitio web transfiere datos personales costarricenses a países que no cumplen con los niveles de protección adecuados sin asegurar el consentimiento explícito del usuario.",
  "severity": "serious",
  "reference": "Costa Rica Law 8968, Art. 24"
},
{
  "id": 585,
  "code": "CRIAP-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ausencia de mecanismos de revocación simplificados para usuarios costarricenses",
  "description": "No se proporciona a los usuarios costarricenses un mecanismo simplificado y gratuito para revocar el consentimiento para el tratamiento promocional.",
  "severity": "moderate",
  "reference": "Costa Rica Law 8968, Art. 6"
},
{
  "id": 586,
  "code": "PANPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de información sobre la identidad del responsable a ciudadanos panameños",
  "description": "El sitio web procesa datos personales panameños sin revelar la identidad corporativa completa y la dirección física del responsable del tratamiento.",
  "severity": "critical",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 8"
},
{
  "id": 587,
  "code": "PANPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de vías para la ejecución de derechos ARCO en Panamá",
  "description": "El responsable no proporciona un correo electrónico o sistema gratuito y de fácil acceso para ejercer el acceso, rectificación, oposición y supresión en Panamá.",
  "severity": "serious",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 15"
},
{
  "id": 588,
  "code": "PANPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ausencia de base legal de consentimiento para elaboración de perfiles financieros en Panamá",
  "description": "El sitio web realiza perfiles crediticios o trata datos económicos de residentes panameños sin cumplimiento verificado o autorización previa explícita.",
  "severity": "moderate",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 21"
},
{
  "id": 589,
  "code": "PANPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de protocolos de notificación de brechas de seguridad a la ANTAI (Panamá)",
  "description": "La organización no documenta los procedimientos para reportar incidentes de seguridad de inmediato a la ANTAI y a los titulares afectados en Panamá.",
  "severity": "serious",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 36"
},
{
  "id": 590,
  "code": "PANPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Almacenamiento ilícito de datos personales panameños en servidores no adecuados",
  "description": "Los datos personales panameños se almacenan internacionalmente en sistemas en la nube que no cumplen con las medidas de seguridad mínimas exigidas por la ANTAI.",
  "severity": "moderate",
  "reference": "Panama Data Protection Act (Ley 81 of 2019), Art. 33"
},
{
  "id": 591,
  "code": "KENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registro como responsable del tratamiento ante la ODPC de Kenia",
  "description": "La entidad recopila y procesa datos de residentes de Kenia sin registrarse como responsable o encargado ante la Oficina del Comisionado de Protección de Datos (ODPC).",
  "severity": "critical",
  "reference": "Kenya Data Protection Act 2019, Section 18"
},
{
  "id": 592,
  "code": "KENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ausencia de representante local para responsables extranjeros en Kenia",
  "description": "Los responsables de datos extranjeros que tratan datos de personas en Kenia no designan un representante local residente para manejar asuntos regulatorios.",
  "severity": "serious",
  "reference": "Kenya Data Protection Act 2019, Section 50"
},
{
  "id": 593,
  "code": "KENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Controles de consentimiento inadecuados para marketing directo bajo la ley de Kenia",
  "description": "El sitio web utiliza datos personales de residentes kenianos para promociones comerciales o publicidad sin obtener consentimiento previo de inclusión voluntaria.",
  "severity": "moderate",
  "reference": "Kenya Data Protection Act 2019, Section 37"
},
{
  "id": 594,
  "code": "KENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de Evaluación de Impacto de Protección de Datos (DPIA) para operaciones en Kenia",
  "description": "La entidad realiza operaciones de tratamiento que plantean altos riesgos para los residentes kenianos sin llevar a cabo una DPIA obligatoria.",
  "severity": "serious",
  "reference": "Kenya Data Protection Act 2019, Section 31"
},
{
  "id": 595,
  "code": "KENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de cumplimiento del plazo de 72 horas para notificar brechas a la ODPC de Kenia",
  "description": "El protocolo documentado de respuesta a brechas del responsable no exige la notificación a la ODPC de Kenia dentro de las 72 horas posteriores a un incidente.",
  "severity": "moderate",
  "reference": "Kenya Data Protection Act 2019, Section 43"
},
{
  "id": 596,
  "code": "EGYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de obtención de licencia para marketing electrónico en Egipto",
  "description": "El sitio web realiza marketing electrónico directo a residentes egipcios sin obtener la licencia requerida del Centro de Protección de Datos.",
  "severity": "critical",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 17"
},
{
  "id": 597,
  "code": "EGYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgaciones inadecuadas en el aviso de privacidad para ciudadanos egipcios",
  "description": "La política de privacidad no detalla explícitamente las bases legales específicas y las duraciones del tratamiento para los datos de ciudadanos egipcios.",
  "severity": "serious",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 2"
},
{
  "id": 598,
  "code": "EGYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de Delegado de Protección de Datos (DPO) obligatorio en Egipto",
  "description": "La entidad procesa datos de residentes egipcios a gran escala pero no designa ni registra a un Delegado de Protección de Datos ante el regulador.",
  "severity": "moderate",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 8"
},
{
  "id": 599,
  "code": "EGYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de notificación de brechas de datos personales dentro de las 72 horas en Egipto",
  "description": "El responsable no establece directrices internas para informar sobre brechas de datos al regulador egipcio y a los afectados en un plazo de 72 horas.",
  "severity": "serious",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 7"
},
{
  "id": 600,
  "code": "EGYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza ilícita de datos de ciudadanos egipcios",
  "description": "El sitio web transfiere datos de residentes egipcios a entidades internacionales sin obtener la aprobación necesaria del Centro de Protección de Datos de Egipto.",
  "severity": "moderate",
  "reference": "Egypt Personal Data Protection Law (Law 151 of 2020), Art. 14"
},
{
  "id": 601,
  "code": "MARPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de presentación de declaración previa o autorización ante la CNDP de Marruecos",
  "description": "El responsable trata datos de residentes marroquíes sin presentar la declaración previa obligatoria o asegurar la autorización de la CNDP.",
  "severity": "critical",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 12"
},
{
  "id": 602,
  "code": "MARPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de divulgación clara de categorías de destinatarios en Marruecos",
  "description": "La política de privacidad no informa a los titulares marroquíes sobre las categorías específicas de terceros destinatarios de sus datos.",
  "severity": "serious",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 5"
},
{
  "id": 603,
  "code": "MARPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ausencia de consentimiento explícito para marketing directo en Marruecos",
  "description": "El sitio web dirige comunicaciones de marketing directo a consumidores marroquíes sin obtener su consentimiento previo e inequívoco de inclusión.",
  "severity": "moderate",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 10"
},
{
  "id": 604,
  "code": "MARPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de implementación de medidas técnicas para la integridad de datos marroquíes",
  "description": "Las configuraciones del servidor que alojan registros de usuarios marroquíes carecen de protección adecuada contra la destrucción accidental, pérdida o alteración.",
  "severity": "serious",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 23"
},
{
  "id": 605,
  "code": "MARPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencias transfronterizas no conformes de datos personales marroquíes",
  "description": "La entidad transfiere datos personales marroquíes a jurisdicciones fuera de Marruecos sin obtener la autorización previa por escrito de la CNDP.",
  "severity": "moderate",
  "reference": "Morocco Protection of Individuals Law (Law 09-08), Art. 43"
},
{
  "id": 606,
  "code": "QATPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Verificación inadecuada de consentimiento para datos de niños en Qatar",
  "description": "El sitio web trata datos personales de niños en Qatar sin obtener el consentimiento explícito de sus padres o tutores legales según lo exige la PDPPL.",
  "severity": "critical",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 17"
},
{
  "id": 607,
  "code": "QATPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de documentación de auditorías de tratamiento para el regulador de Qatar",
  "description": "La organización no mantiene ni documenta un registro interno de las operaciones de tratamiento para presentarlo al departamento competente de Qatar.",
  "severity": "serious",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 11"
},
{
  "id": 608,
  "code": "QATPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Medidas de seguridad y divulgaciones incompletas para residentes de Qatar",
  "description": "Las bases de datos que almacenan datos de residentes qataríes carecen de las medidas de seguridad técnicas y administrativas auditadas necesarias para evitar filtraciones.",
  "severity": "moderate",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 13"
},
{
  "id": 609,
  "code": "QATPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de canales de atención a solicitudes directas para titulares qataríes",
  "description": "El sitio web no proporciona a los residentes qataríes un mecanismo directo y gratuito para enviar solicitudes de acceso, supresión o corrección.",
  "severity": "serious",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 5"
},
{
  "id": 610,
  "code": "QATPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de divulgación de ubicaciones de tratamiento transfronterizo a titulares qataríes",
  "description": "La política de privacidad no especifica las ubicaciones geográficas donde se procesan o almacenan los datos personales de los residentes de Qatar.",
  "severity": "moderate",
  "reference": "Qatar Personal Data Privacy Protection Law (Law 13 of 2016), Art. 8"
},
{
  "id": 611,
  "code": "BHRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento por escrito para datos sensibles en Bahrein",
  "description": "El sitio web recopila datos sensibles (como estado de salud o datos biométricos) de residentes de Bahrein sin obtener consentimiento previo por escrito y explícito.",
  "severity": "critical",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 4"
},
{
  "id": 612,
  "code": "BHRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de designación de un representante local en Bahrein",
  "description": "Los responsables de datos extranjeros que procesan datos de residentes de Bahrein a gran escala no designan un representante local residente en Bahrein.",
  "severity": "serious",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 33"
},
{
  "id": 613,
  "code": "BHRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Bahrein",
  "description": "El sitio web envía comunicaciones de marketing a través de mensajes electrónicos a ciudadanos de Bahrein sin darles una opción de exclusión previa y clara.",
  "severity": "moderate",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 30"
},
{
  "id": 614,
  "code": "BHRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registro de tratamientos ante la Autoridad de Bahrein",
  "description": "El responsable no registra los sistemas de bases de datos que contienen datos personales de residentes de Bahrein ante la Autoridad de Protección de Datos Personales.",
  "severity": "serious",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 12"
},
{
  "id": 615,
  "code": "BHRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Protocolos de transferencia inadecuados para exportar datos de ciudadanos de Bahrein",
  "description": "Los datos de residentes de Bahrein se transfieren a países que no brindan niveles de seguridad adecuados sin la aprobación previa por escrito.",
  "severity": "moderate",
  "reference": "Bahrain Personal Data Protection Law (Law 30 of 2018), Art. 15"
},
{
  "id": 616,
  "code": "OMNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de designación de un Delegado de Protección de Datos (DPO) en Omán",
  "description": "La organización procesa datos de residentes de Omán a gran escala pero no designa a un Oficial de Protección de Datos.",
  "severity": "critical",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 21"
},
{
  "id": 617,
  "code": "OMNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles de salud o biométricos en Omán",
  "description": "El sitio web recopila datos sensibles (salud, registros biométricos) de residentes de Omán sin obtener consentimiento explícito, previo y documentado.",
  "severity": "serious",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 5"
},
{
  "id": 618,
  "code": "OMNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de procedimientos verificados de resolución de disputas para titulares de Omán",
  "description": "La política de privacidad no documenta vías legales o canales de contacto específicos para atender reclamos de titulares omani.",
  "severity": "moderate",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 12"
},
{
  "id": 619,
  "code": "OMNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ausencia de garantías adecuadas de transferencia transfronteriza para datos de Omán",
  "description": "El sitio web transfiere datos de residentes omani a entidades internacionales sin asegurar acuerdos de adecuación o aprobación del Ministerio.",
  "severity": "serious",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 24"
},
{
  "id": 620,
  "code": "OMNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de respuesta a solicitudes de consumidores omani dentro del plazo legal",
  "description": "Los procedimientos del responsable de datos no exigen responder a solicitudes de acceso o rectificación de ciudadanos omani dentro del plazo legal.",
  "severity": "moderate",
  "reference": "Oman Personal Data Protection Law (Royal Decree 6/2022), Art. 15"
},
{
  "id": 621,
  "code": "HKGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de divulgación del marketing directo previsto a residentes de Hong Kong",
  "description": "El sitio web recopila datos de residentes de Hong Kong y pretende usarlos para marketing sin proporcionar una interfaz clara de inclusión.",
  "severity": "critical",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), Sec. 35C"
},
{
  "id": 622,
  "code": "HKGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de consentimiento separado para marketing de terceros en Hong Kong",
  "description": "El sitio web comparte datos de residentes de Hong Kong con socios para marketing sin obtener consentimiento por separado y explícito.",
  "severity": "serious",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), Sec. 35J"
},
{
  "id": 623,
  "code": "HKGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Divulgaciones de retención de datos no conformes para clientes de Hong Kong",
  "description": "La política de privacidad no detalla plazos de retención o procedimientos de eliminación para los datos recopilados de residentes de Hong Kong.",
  "severity": "moderate",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 2"
},
{
  "id": 624,
  "code": "HKGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Protocolos de eliminación y destrucción de datos inseguros en Hong Kong",
  "description": "El ciclo de vida de los datos del servidor no implementa algoritmos de eliminación seguros para registros inactivos de usuarios de Hong Kong.",
  "severity": "serious",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 4"
},
{
  "id": 625,
  "code": "HKGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de interfaces de acceso y rectificación de datos para titulares de Hong Kong",
  "description": "El sitio web no suministra a los usuarios de Hong Kong formularios o procedimientos sencillos para solicitar el acceso o rectificación de sus datos.",
  "severity": "moderate",
  "reference": "Hong Kong Personal Data (Privacy) Ordinance (Cap. 486), DPP 6"
},
{
  "id": 626,
  "code": "TWNPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Divulgaciones de información incompletas bajo la PDPA de Taiwán",
  "description": "La política de privacidad no enumera explícitamente todos los elementos obligatorios según el Art. 8 de la PDPA, como las consecuencias de no proporcionar los datos.",
  "severity": "critical",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 8"
},
{
  "id": 627,
  "code": "TWNPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Recopilación ilícita de datos sensibles sin consentimiento por escrito en Taiwán",
  "description": "El sitio web recopila registros personales sensibles (historial médico, datos genéticos) de residentes taiwaneses sin obtener consentimiento por escrito explícito.",
  "severity": "serious",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 6"
},
{
  "id": 628,
  "code": "TWNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de plan de mantenimiento de seguridad auditable en Taiwán",
  "description": "El responsable del tratamiento no documenta ni mantiene un plan de seguridad interno para evitar filtraciones de datos en Taiwán.",
  "severity": "moderate",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 27"
},
{
  "id": 629,
  "code": "TWNPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de protocolos de notificación de incidentes a ciudadanos taiwaneses",
  "description": "La empresa carece de protocolos para notificar a los titulares taiwaneses sobre filtraciones de datos inmediatamente después de verificar la brecha.",
  "severity": "serious",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 12"
},
{
  "id": 630,
  "code": "TWNPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Garantías inadecuadas para marketing directo a residentes de Taiwán",
  "description": "El sitio web utiliza datos de residentes taiwaneses para marketing sin proporcionar una opción clara para oponerse en el primer contacto.",
  "severity": "moderate",
  "reference": "Taiwan Personal Data Protection Act (PDPA), Article 20"
},
{
  "id": 631,
  "code": "PHLPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de registro de sistemas de tratamiento ante la NPC de Filipinas",
  "description": "La entidad trata datos de ciudadanos filipinos pero no registra sus sistemas de tratamiento ante la Comisión Nacional de Privacidad (NPC).",
  "severity": "critical",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 14"
},
{
  "id": 632,
  "code": "PHLPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de designación de un Delegado de Protección de Datos en Filipinas",
  "description": "El responsable que se dirige a titulares filipinos no designa ni registra oficialmente a un Oficial de Protección de Datos ante la NPC.",
  "severity": "serious",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 21"
},
{
  "id": 633,
  "code": "PHLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Divulgaciones del aviso de privacidad inadecuadas para residentes filipinos",
  "description": "La política de privacidad no informa a los usuarios filipinos sobre sus derechos específicos a ser informados, acceder, oponerse y exigir la supresión.",
  "severity": "moderate",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 16"
},
{
  "id": 634,
  "code": "PHLPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de sistema de notificación de brechas a la NPC dentro de las 72 horas",
  "description": "Los procedimientos de seguridad de la empresa no exigen la notificación a la NPC y a los afectados en un plazo de 72 horas tras detectar la brecha.",
  "severity": "serious",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 20"
},
{
  "id": 635,
  "code": "PHLPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Formularios de consentimiento incompletos para procesar información sensible en Filipinas",
  "description": "El mecanismo de consentimiento agrupa el permiso para tratar información sensible con los términos de servicio generales, violando las leyes filipinas.",
  "severity": "moderate",
  "reference": "Philippines Data Privacy Act of 2012 (RA 10173), Sec. 13"
},
{
  "id": 636,
  "code": "IDNPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de base legal documentada para operaciones en Indonesia",
  "description": "El sitio web recopila y procesa datos de ciudadanos indonesios sin documentar las bases legales específicas (consentimiento, contrato) según la UU PDP.",
  "severity": "critical",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 20"
},
{
  "id": 637,
  "code": "IDNPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de designación de un Oficial de Protección de Datos local en Indonesia",
  "description": "El responsable del tratamiento maneja registros personales indonesios a gran escala pero no designa a un Oficial de Protección de Datos local residente.",
  "severity": "serious",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 53"
},
{
  "id": 638,
  "code": "IDNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de controles de verificación de edad y paterna para niños en Indonesia",
  "description": "El sitio web recopila datos personales de niños indonesios sin verificar su edad ni obtener el consentimiento validado de los padres.",
  "severity": "moderate",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 32"
},
{
  "id": 639,
  "code": "IDNPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de sistema explícito de notificación de incidentes en Indonesia dentro de las 72 horas",
  "description": "El responsable del tratamiento no establece procedimientos para notificar a las autoridades y titulares indonesios dentro de las 72 horas posteriores a la brecha.",
  "severity": "serious",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 46"
},
{
  "id": 640,
  "code": "IDNPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Mecanismos de eliminación de datos no conformes para datos personales indonesios",
  "description": "Los sistemas no admiten la supresión total y permanente de los registros de usuarios indonesios tras el retiro del consentimiento o el fin del contrato.",
  "severity": "moderate",
  "reference": "Indonesia Personal Data Protection Act (UU PDP No. 27/2022), Art. 43"
},
{
  "id": 641,
  "code": "KAZPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de registro de bases de datos que contienen datos de residentes de Kazajistán",
  "description": "El responsable del tratamiento no registra ante la autoridad estatal sus bases de datos que tratan información de residentes de Kazajistán.",
  "severity": "critical",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 26"
},
{
  "id": 642,
  "code": "KAZPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Transferencias transfronterizas no conformes sin confirmar la adecuación en Kazajistán",
  "description": "El sitio web transfiere datos de ciudadanos de Kazajistán a terceros países sin verificar la adecuación o asegurar bases legales de transferencia.",
  "severity": "serious",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 16"
},
{
  "id": 643,
  "code": "KAZPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Sistemas de obtención de consentimiento incompletos para residentes de Kazajistán",
  "description": "El sitio web recopila datos de residentes de Kazajistán sin obtener un consentimiento explícito que detalle los fines específicos del tratamiento.",
  "severity": "moderate",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 8"
},
{
  "id": 644,
  "code": "KAZPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de localización del almacenamiento del servidor dentro de la República de Kazajistán",
  "description": "Las bases de datos que almacenan datos personales de residentes de Kazajistán se alojan fuera del país, violando los requisitos de localización.",
  "severity": "serious",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 12"
},
{
  "id": 645,
  "code": "KAZPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de protocolos estándar de recurso y eliminación para ciudadanos de Kazajistán",
  "description": "El responsable no proporciona vías directas o contactos para solicitar el bloqueo o destrucción de los registros de ciudadanos de Kazajistán.",
  "severity": "moderate",
  "reference": "Kazakhstan Law on Personal Data (Law 94-V), Art. 24"
},
{
  "id": 646,
  "code": "UKRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de notificación del tratamiento de datos al Comisionado de Ucrania",
  "description": "El responsable trata datos personales sensibles de residentes ucranianos sin notificar al Comisionado de Derechos Humanos.",
  "severity": "critical",
  "reference": "Ukraine Law on Personal Data Protection, Article 9"
},
{
  "id": 647,
  "code": "UKRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgaciones del aviso de privacidad inadecuadas sobre destinatarios terceros en Ucrania",
  "description": "La política de privacidad no detalla las categorías o nombres de los terceros destinatarios que tratan datos de residentes ucranianos.",
  "severity": "serious",
  "reference": "Ukraine Law on Personal Data Protection, Article 12"
},
{
  "id": 648,
  "code": "UKRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de obtención de consentimiento para marketing y cookies en Ucrania",
  "description": "El sitio web utiliza cookies publicitarias o envía correos promocionales a ciudadanos ucranianos sin consentimiento verificado.",
  "severity": "moderate",
  "reference": "Ukraine Law on Personal Data Protection, Article 11"
},
{
  "id": 649,
  "code": "UKRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registros de seguridad y acceso bajo la ley ucraniana",
  "description": "La base de datos que contiene registros personales de sujetos ucranianos carece de registros de acceso documentados y controles de permisos de usuario.",
  "severity": "serious",
  "reference": "Ukraine Law on Personal Data Protection, Article 24"
},
{
  "id": 650,
  "code": "UKRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Procedimientos incompletos de recurso y supresión para titulares ucranianos",
  "description": "El responsable del tratamiento no proporciona canales de contacto claros o plazos de respuesta para que los titulares ucranianos soliciten la eliminación de datos.",
  "severity": "moderate",
  "reference": "Ukraine Law on Personal Data Protection, Article 8"
},
{
  "id": 651,
  "code": "CANPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de consentimiento explícito para datos sensibles bajo PIPEDA",
  "description": "El sitio web recopila registros personales sensibles (médicos, financieros) de residentes canadienses sin obtener el consentimiento previo explícito.",
  "severity": "critical",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.3"
},
{
  "id": 652,
  "code": "CANPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de información de contacto del Oficial de Privacidad bajo PIPEDA",
  "description": "La política de privacidad no identifica ni proporciona rutas de contacto para el Oficial de Privacidad responsable bajo la ley canadiense.",
  "severity": "serious",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.1"
},
{
  "id": 653,
  "code": "CANPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Procedimientos inadecuados de acceso y rectificación bajo PIPEDA",
  "description": "El sitio web carece de instrucciones claras y documentadas para que los residentes canadienses accedan o soliciten la rectificación de sus archivos.",
  "severity": "moderate",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.9"
},
{
  "id": 654,
  "code": "CANPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Procedimientos de reporte de brechas no conformes bajo la ley canadiense",
  "description": "El responsable no documenta los procedimientos para reportar incidentes de seguridad a la OPC tan pronto como sea factible.",
  "severity": "serious",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Sec. 10.1"
},
{
  "id": 655,
  "code": "CANPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Contratos de transferencia a terceros incompletos para datos canadienses",
  "description": "El responsable transfiere datos de residentes canadienses a terceros encargados sin contratos que garanticen un nivel de protección equivalente.",
  "severity": "moderate",
  "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA), Schedule 1, Sec. 4.5.3"
},
{
  "id": 656,
  "code": "BOLPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de atención al derecho constitucional de Habeas Data en Bolivia",
  "description": "El sitio web carece de opciones para que los ciudadanos bolivianos ejerzan su derecho constitucional de verificar, corregir o eliminar datos.",
  "severity": "critical",
  "reference": "Bolivia Political Constitution, Article 130"
},
{
  "id": 657,
  "code": "BOLPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de protocolos de recurso para datos personales en Bolivia",
  "description": "La política de privacidad no documenta vías específicas de recurso administrativo o judicial para que los titulares bolivianos se opongan al tratamiento.",
  "severity": "serious",
  "reference": "Bolivia Political Constitution, Article 131"
},
{
  "id": 658,
  "code": "BOLPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento ilícito de registros de comunicación en Bolivia",
  "description": "El sitio web rastrea y procesa metadatos o registros de comunicación de usuarios bolivianos sin consentimiento previo explícito o mandato judicial.",
  "severity": "moderate",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 55"
},
{
  "id": 659,
  "code": "BOLPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Divulgación incompleta de destinatarios terceros para datos de Bolivia",
  "description": "La política de privacidad no detalla las organizaciones o bases de datos terceras específicas que acceden a los registros de residentes bolivianos.",
  "severity": "serious",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 56"
},
{
  "id": 660,
  "code": "BOLPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Almacenamiento inseguro de registros de titulares bolivianos",
  "description": "Las bases de datos que procesan datos de residentes bolivianos no implementan el cifrado ni las medidas de seguridad exigidas por los estándares de telecomunicación.",
  "severity": "moderate",
  "reference": "Bolivia General Telecommunications Law (Ley 164), Art. 57"
},
{
  "id": 661,
  "code": "PRYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento ilícito de historial crediticio financiero en Paraguay",
  "description": "El sitio web realiza perfiles o procesa registros financieros de residentes paraguayos sin consentimiento explícito escrito o digitalmente verificable.",
  "severity": "critical",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 6"
},
{
  "id": 662,
  "code": "PRYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ausencia de vías de corrección directa bajo la ley de Paraguay",
  "description": "La política de privacidad no documenta métodos gratuitos y simplificados para rectificar registros inexactos en Paraguay.",
  "severity": "serious",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 14"
},
{
  "id": 663,
  "code": "PRYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de medidas de seguridad organizativas para registros de Paraguay",
  "description": "Los responsables de datos no auditan ni documentan las medidas de seguridad administrativas que protegen las bases de datos de residentes paraguayos.",
  "severity": "moderate",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 9"
},
{
  "id": 664,
  "code": "PRYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Marketing directo ilegal por canales electrónicos en Paraguay",
  "description": "El sitio web envía mensajes comerciales a consumidores paraguayos sin autorización previa verificada o enlaces de exclusión explícitos.",
  "severity": "serious",
  "reference": "Paraguay Consumer Protection Law (Ley 1334), Art. 6"
},
{
  "id": 665,
  "code": "PRYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Contratos inadecuados con encargados de datos paraguayos",
  "description": "El responsable comparte datos de residentes paraguayos con terceros encargados sin acuerdos formales que detallen las obligaciones de seguridad.",
  "severity": "moderate",
  "reference": "Paraguay Personal Data Protection Law (Ley 6534/2020), Art. 12"
},
{
  "id": 666,
  "code": "VENPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de cumplimiento de los principios de Habeas Data en Venezuela",
  "description": "El sitio web procesa registros personales de residentes venezolanos sin ofrecer mecanismos para inspeccionar, corregir o eliminar sus datos.",
  "severity": "critical",
  "reference": "Venezuela Constitution, Article 28"
},
{
  "id": 667,
  "code": "VENPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de documentación de controles de seguridad para la transmisión de datos en Venezuela",
  "description": "Los paneles web que recopilan y transmiten registros de residentes venezolanos carecen de protocolos de seguridad documentados.",
  "severity": "serious",
  "reference": "Venezuela Infogobierno Law, Article 32"
},
{
  "id": 668,
  "code": "VENPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de divulgación de consentimiento para repositorios de datos en Venezuela",
  "description": "El aviso de privacidad no revela las bases legales ni obtiene el consentimiento para almacenar registros de ciudadanos venezolanos.",
  "severity": "moderate",
  "reference": "Venezuela Constitution, Article 60"
},
{
  "id": 669,
  "code": "VENPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de interfaces de solicitud de acceso fácil para usuarios venezolanos",
  "description": "El sitio web no proporciona a los residentes venezolanos una vía de contacto directa y gratuita para inspeccionar sus registros.",
  "severity": "serious",
  "reference": "Venezuela Constitution, Article 28"
},
{
  "id": 670,
  "code": "VENPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Políticas de retención no conformes para registros de clientes venezolanos",
  "description": "Los registros personales de residentes venezolanos se almacenan indefinidamente sin justificación documentada ni rutinas de supresión.",
  "severity": "moderate",
  "reference": "Venezuela Constitution, Article 60"
},
{
  "id": 671,
  "code": "GTMIP-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Aviso de información inadecuado bajo la ley de Guatemala",
  "description": "La política de privacidad no explica el propósito de la recopilación ni las políticas de transferencia a terceros a los residentes guatemaltecos.",
  "severity": "critical",
  "reference": "Guatemala Access to Public Information Law, Article 31"
},
{
  "id": 672,
  "code": "GTMIP-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de cumplimiento del derecho de corrección de Habeas Data en Guatemala",
  "description": "El sitio web carece de canales o interfaces formales para que los residentes guatemaltecos exijan la rectificación o bloqueo de sus datos.",
  "severity": "serious",
  "reference": "Guatemala Access to Public Information Law, Article 32"
},
{
  "id": 673,
  "code": "GTMIP-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Almacenamiento inseguro de registros personales guatemaltecos",
  "description": "Los sistemas de bases de datos que contienen registros de ciudadanos guatemaltecos carecen de controles de acceso técnico y cifrado.",
  "severity": "moderate",
  "reference": "Guatemala Access to Public Information Law, Article 33"
},
{
  "id": 674,
  "code": "GTMIP-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de consentimiento explícito para compartir datos de residentes guatemaltecos",
  "description": "El sitio web comparte datos de residentes guatemaltecos con socios o plataformas de marketing sin el consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Guatemala Access to Public Information Law, Article 34"
},
{
  "id": 675,
  "code": "GTMIP-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ausencia de canales gratuitos de revocación de consentimiento de marketing en Guatemala",
  "description": "El sitio web no proporciona a los usuarios guatemaltecos un mecanismo fácil y gratuito para oponerse y revocar el envío de correos comerciales.",
  "severity": "moderate",
  "reference": "Guatemala Consumer Protection Law, Article 17"
},
{
  "id": 676,
  "code": "DOMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos dominicanos sin consentimiento previo",
  "description": "El sitio web recopila y trata registros de residentes dominicanos sin obtener el consentimiento previo, libre e informado.",
  "severity": "critical",
  "reference": "Dominican Republic Law 172-13, Article 5"
},
{
  "id": 677,
  "code": "DOMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Divulgación incompleta de la identidad del responsable dominicano",
  "description": "La política de privacidad no identifica al responsable del tratamiento ni los registros de bases de datos supervisados por el regulador.",
  "severity": "serious",
  "reference": "Dominican Republic Law 172-13, Article 8"
},
{
  "id": 678,
  "code": "DOMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Procedimientos inadecuados de solicitud de Habeas Data bajo la ley dominicana",
  "description": "El responsable carece de métodos documentados para que los ciudadanos dominicanos envíen solicitudes de acceso, corrección y supresión.",
  "severity": "moderate",
  "reference": "Dominican Republic Law 172-13, Article 18"
},
{
  "id": 679,
  "code": "DOMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencias transfronterizas ilícitas de datos de ciudadanos dominicanos",
  "description": "El sitio web transfiere bases de datos personales dominicanas a países o entidades que no garantizan niveles de seguridad adecuados.",
  "severity": "serious",
  "reference": "Dominican Republic Law 172-13, Article 29"
},
{
  "id": 680,
  "code": "DOMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de medidas de seguridad para bancos de datos personales dominicanos",
  "description": "Los sistemas de bases de datos carecen de las medidas de seguridad físicas, lógicas y administrativas exigidas por la Ley 172-13.",
  "severity": "moderate",
  "reference": "Dominican Republic Law 172-13, Article 12"
},
{
  "id": 681,
  "code": "SLVPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de consentimiento para correos comerciales en El Salvador",
  "description": "El sitio web envía correos comerciales a residentes de El Salvador sin obtener consentimiento previo o dar una opción de exclusión.",
  "severity": "critical",
  "reference": "El Salvador Electronic Commerce Law, Article 18"
},
{
  "id": 682,
  "code": "SLVPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Divulgaciones inadecuadas del manejo de datos en el aviso de El Salvador",
  "description": "El aviso de privacidad no detalla los métodos de recopilación y transferencia de los registros de consumidores salvadoreños.",
  "severity": "serious",
  "reference": "El Salvador Electronic Commerce Law, Article 20"
},
{
  "id": 683,
  "code": "SLVPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Registro de transacciones inseguro para clientes salvadoreños",
  "description": "El portal web que procesa pagos de usuarios salvadoreños no implementa registros de transacciones seguros y cifrados.",
  "severity": "moderate",
  "reference": "El Salvador Electronic Commerce Law, Article 22"
},
{
  "id": 684,
  "code": "SLVPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Registros de base de datos inseguros para consumidores salvadoreños",
  "description": "Las bases de datos que almacenan registros de residentes salvadoreños carecen de medidas técnicas para evitar filtraciones de datos.",
  "severity": "serious",
  "reference": "El Salvador Consumer Protection Law, Article 27"
},
{
  "id": 685,
  "code": "SLVPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Opciones de eliminación incompletas para bases de usuarios salvadoreños",
  "description": "El sitio web no proporciona a los consumidores de El Salvador canales simplificados para exigir la eliminación de sus cuentas.",
  "severity": "moderate",
  "reference": "El Salvador Electronic Commerce Law, Article 19"
},
{
  "id": 686,
  "code": "HNDPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de divulgación de recopilación para residentes de Honduras",
  "description": "El sitio web recopila datos de residentes hondureños sin proporcionar divulgaciones claras de los fines del tratamiento.",
  "severity": "critical",
  "reference": "Honduras Access to Public Information Law, Article 23"
},
{
  "id": 687,
  "code": "HNDPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de vías de bloqueo y eliminación en bases de datos de Honduras",
  "description": "El responsable no establece vías documentadas para que los ciudadanos hondureños soliciten el bloqueo o supresión de archivos.",
  "severity": "serious",
  "reference": "Honduras Access to Public Information Law, Article 24"
},
{
  "id": 688,
  "code": "HNDPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencias transfronterizas ilícitas a terceros sin consentimiento en Honduras",
  "description": "El sitio web transfiere bases de datos de residentes hondureños a entidades comerciales sin asegurar el consentimiento previo.",
  "severity": "moderate",
  "reference": "Honduras Access to Public Information Law, Article 25"
},
{
  "id": 689,
  "code": "HNDPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Almacenamiento inseguro de registros personales hondureños",
  "description": "Las bases de datos que procesan datos de residentes hondureños carecen de controles lógicos de acceso básicos y cifrado de datos.",
  "severity": "serious",
  "reference": "Honduras Access to Public Information Law, Article 26"
},
{
  "id": 690,
  "code": "HNDPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ausencia de canales de exclusión de marketing gratuitos para Honduras",
  "description": "El sitio web dirigido a consumidores hondureños no muestra mecanismos gratuitos para oponerse a mensajes comerciales.",
  "severity": "moderate",
  "reference": "Honduras Consumer Protection Law, Article 15"
},
{
  "id": 691,
  "code": "NICPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de registro de bases de datos ante el regulador de Nicaragua",
  "description": "El responsable no registra sus bases de datos que contienen datos de residentes nicaragüenses ante el registro nacional.",
  "severity": "critical",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 15"
},
{
  "id": 692,
  "code": "NICPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de consentimiento explícito para datos sensibles en Nicaragua",
  "description": "El sitio web recopila datos sensibles de residentes nicaragüenses sin obtener consentimiento previo, por escrito o digitalmente verificable.",
  "severity": "serious",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 7"
},
{
  "id": 693,
  "code": "NICPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Vías de recurso inadecuadas para derechos ARCO en Nicaragua",
  "description": "La política de privacidad no documenta canales de contacto o plazos específicos para ejercer los derechos ARCO bajo la Ley 787.",
  "severity": "moderate",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 9"
},
{
  "id": 694,
  "code": "NICPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencias transfronterizas no conformes de datos de Nicaragua",
  "description": "El sitio web transfiere bases de datos personales nicaragüenses internacionalmente sin asegurar aprobación regulatoria o garantías de adecuación.",
  "severity": "serious",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 21"
},
{
  "id": 695,
  "code": "NICPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de reporte de brechas de seguridad de bases de datos en Nicaragua",
  "description": "La organización no documenta procedimientos internos para reportar incidentes de seguridad al regulador nicaragüense y a los titulares afectados.",
  "severity": "moderate",
  "reference": "Nicaragua Personal Data Protection Law (Law 787), Art. 12"
},
{
  "id": 696,
  "code": "GHAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registro como responsable del tratamiento ante la DPC de Ghana",
  "description": "La entidad trata datos personales de residentes de Ghana sin registrarse como responsable ante la Comisión de Protección de Datos (DPC).",
  "severity": "critical",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 27"
},
{
  "id": 697,
  "code": "GHAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles dominicanos sin autorización en Ghana",
  "description": "El sitio web recopila registros sensibles (biométricos, salud) de residentes ghaneses sin obtener la autorización previa por escrito de la DPC.",
  "severity": "serious",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 35"
},
{
  "id": 698,
  "code": "GHAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Aviso inadecuado sobre el derecho a oponerse al marketing en Ghana",
  "description": "La política de privacidad no informa a los titulares ghaneses sobre su derecho específico a oponerse al tratamiento con fines promocionales.",
  "severity": "moderate",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 20"
},
{
  "id": 699,
  "code": "GHAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencias internacionales no conformes de datos de Ghana",
  "description": "El responsable transfiere datos personales ghaneses internacionalmente sin obtener la aprobación por escrito o la confirmación de adecuación de la DPC.",
  "severity": "serious",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 47"
},
{
  "id": 700,
  "code": "GHAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de sistemas de notificación de brechas de seguridad bajo la ley de Ghana",
  "description": "El responsable carece de procedimientos documentados para reportar incidentes de seguridad a la DPC de Ghana y a los titulares afectados.",
  "severity": "moderate",
  "reference": "Ghana Data Protection Act 2012 (Act 843), Section 31"
},
{
  "id": 701,
  "code": "UGAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registro ante la Oficina de Protección de Datos de Uganda",
  "description": "El responsable recopila y procesa datos de residentes ugandeses sin registrarse ante la Oficina de Protección de Datos Personales de Uganda.",
  "severity": "critical",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 4"
},
{
  "id": 702,
  "code": "UGAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Recopilación de datos de ciudadanos de Uganda sin consentimiento previo",
  "description": "El sitio web recopila datos personales de ciudadanos ugandeses sin obtener el consentimiento previo, por escrito y explícito.",
  "severity": "serious",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 7"
},
{
  "id": 703,
  "code": "UGAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Procedimientos inadecuados para manejar derechos de titulares en Uganda",
  "description": "El responsable no proporciona vías directas o contactos para atender las solicitudes de acceso, rectificación o supresión de titulares ugandeses.",
  "severity": "moderate",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 24"
},
{
  "id": 704,
  "code": "UGAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Marketing directo ilegal sin opción de exclusión en Uganda",
  "description": "El sitio web envía correos comerciales o mensajes de marketing a ciudadanos ugandeses sin proporcionar un mecanismo de exclusión gratuito.",
  "severity": "serious",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 15"
},
{
  "id": 705,
  "code": "UGAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Almacenamiento no conforme de registros de Uganda en países no adecuados",
  "description": "Los registros personales de residentes de Uganda se transfieren internacionalmente a jurisdicciones que no garantizan estándares de protección adecuados.",
  "severity": "moderate",
  "reference": "Uganda Data Protection and Privacy Act 2019, Section 19"
},
{
  "id": 706,
  "code": "RWAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin registro en Ruanda",
  "description": "El responsable del tratamiento trata registros personales ruandeses sin registrarse ni notificar a la autoridad de control.",
  "severity": "critical",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 8"
},
{
  "id": 707,
  "code": "RWAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Ruanda",
  "description": "El sitio web recopila datos sensibles (salud, biométricos) de residentes ruandeses sin obtener consentimiento previo, explícito e independiente.",
  "severity": "serious",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 10"
},
{
  "id": 708,
  "code": "RWAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de contactos del Oficial de Protección de Datos local para operaciones en Ruanda",
  "description": "La entidad trata registros de residentes de Ruanda pero no designa un Oficial de Protección de Datos local o canal de contacto.",
  "severity": "moderate",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 18"
},
{
  "id": 709,
  "code": "RWAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Procedimientos inadecuados de reporte de brechas a la Autoridad de Ruanda",
  "description": "La organización no reporta incidentes de seguridad a la autoridad de control de Ruanda dentro de las 48 horas posteriores a su detección.",
  "severity": "serious",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 25"
},
{
  "id": 710,
  "code": "RWAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencias transfronterizas ilícitas de registros de residentes ruandeses",
  "description": "El sitio web transfiere registros personales de residentes ruandeses internacionalmente sin obtener autorización previa o confirmar la adecuación.",
  "severity": "moderate",
  "reference": "Rwanda Protection of Personal Data and Privacy Law (Law 058/2021), Art. 30"
},
{
  "id": 711,
  "code": "ZIMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos de Zimbabwe sin registro",
  "description": "El responsable trata registros de residentes de Zimbabwe sin licencia o registro ante el regulador POTRAZ.",
  "severity": "critical",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 11"
},
{
  "id": 712,
  "code": "ZIMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento para la toma de decisiones automatizada en Zimbabwe",
  "description": "El sitio web realiza perfiles o decisiones automatizadas en residentes de Zimbabwe sin obtener consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 17"
},
{
  "id": 713,
  "code": "ZIMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Medidas de seguridad inadecuadas para bases de datos de Zimbabwe",
  "description": "Las bases de datos que tratan datos de residentes de Zimbabwe carecen de medidas técnicas de protección contra la divulgación no autorizada.",
  "severity": "moderate",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 22"
},
{
  "id": 714,
  "code": "ZIMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de procedimientos de solicitud de acceso a datos para ciudadanos de Zimbabwe",
  "description": "El sitio web no proporciona a los residentes de Zimbabwe un procedimiento directo y gratuito para enviar solicitudes de acceso o corrección.",
  "severity": "serious",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 15"
},
{
  "id": 715,
  "code": "ZIMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes a residentes de Zimbabwe",
  "description": "El sitio web envía correos comerciales de marketing a residentes de Zimbabwe sin obtener el consentimiento previo explícito de inclusión.",
  "severity": "moderate",
  "reference": "Zimbabwe Cyber and Data Protection Act (Chapter 11:24), Section 25"
},
{
  "id": 716,
  "code": "AOGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales angoleños sin notificación ante la APD",
  "description": "La entidad trata registros de residentes angoleños sin presentar la declaración obligatoria o autorización ante la APD.",
  "severity": "critical",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 28"
},
{
  "id": 717,
  "code": "AOGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Angola",
  "description": "El sitio web recopila datos sensibles (salud, registros biométricos) de residentes angoleños sin obtener consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 7"
},
{
  "id": 718,
  "code": "AOGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación incompleta de categorías de destinatarios en Angola",
  "description": "La política de privacidad no informa a los residentes angoleños sobre las organizaciones terceras específicas que acceden a sus datos.",
  "severity": "moderate",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 14"
},
{
  "id": 719,
  "code": "AOGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Seguridad técnica inadecuada para bases de datos personales angoleñas",
  "description": "Las configuraciones de servidor que alojan registros de usuarios angoleños carecen de salvaguardas técnicas contra filtraciones.",
  "severity": "serious",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 19"
},
{
  "id": 720,
  "code": "AOGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencias transfronterizas ilícitas de datos personales angoleños",
  "description": "El sitio web transfiere datos de residentes angoleños internacionalmente sin obtener la aprobación por escrito de la APD.",
  "severity": "moderate",
  "reference": "Angola Personal Data Protection Law (Lei 22/11), Art. 33"
},
{
  "id": 721,
  "code": "ALGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registro de sistemas de tratamiento ante la ANPDP de Argelia",
  "description": "El responsable trata registros de residentes argelinos sin registrar sus sistemas de datos ante la ANPDP.",
  "severity": "critical",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 13"
},
{
  "id": 722,
  "code": "ALGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento previo explícito para datos personales en Argelia",
  "description": "El sitio web recopila y trata datos de ciudadanos argelinos sin obtener consentimiento previo, explícito y documentado.",
  "severity": "serious",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 7"
},
{
  "id": 723,
  "code": "ALGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Procedimientos inadecuados para atender el acceso y la supresión en Argelia",
  "description": "El responsable carece de métodos documentados para que los ciudadanos argelinos envíen solicitudes de acceso, corrección o supresión.",
  "severity": "moderate",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 34"
},
{
  "id": 724,
  "code": "ALGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencias internacionales no conformes de registros argelinos",
  "description": "El sitio web transfiere bases de datos personales argelinas internacionalmente sin obtener la autorización o aprobación de la ANPDP.",
  "severity": "serious",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 44"
},
{
  "id": 725,
  "code": "ALGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ausencia de protocolos de notificación de brechas a la Autoridad Argelina",
  "description": "La organización no documenta procedimientos para reportar incidentes de seguridad al regulador argelino y a los titulares afectados.",
  "severity": "moderate",
  "reference": "Algeria Protection of Individuals Law (Law 18-07), Art. 41"
},
{
  "id": 726,
  "code": "JORPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales de Jordania sin consentimiento",
  "description": "El sitio web recopila y trata datos de residentes jordanos sin obtener consentimiento previo, explícito y documentado.",
  "severity": "critical",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 4"
},
{
  "id": 727,
  "code": "JORPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de Oficial de Protección de Datos (DPO) para operaciones en Jordania",
  "description": "El responsable del tratamiento maneja bases de datos personales jordanas a gran escala pero no designa a un DPO residente.",
  "severity": "serious",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 15"
},
{
  "id": 728,
  "code": "JORPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada de retención de datos en avisos de Jordania",
  "description": "La política de privacidad no detalla plazos de retención o criterios para los datos de ciudadanos jordanos.",
  "severity": "moderate",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 8"
},
{
  "id": 729,
  "code": "JORPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencias transfronterizas no conformes de datos de Jordania",
  "description": "El sitio web transfiere registros personales jordanos internacionalmente sin asegurar garantías de adecuación o aprobación regulatoria.",
  "severity": "serious",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 19"
},
{
  "id": 730,
  "code": "JORPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Opciones incompletas de acceso y rectificación para ciudadanos de Jordania",
  "description": "Los sistemas de bases de datos carecen de mecanismos gratuitos para que los ciudadanos jordanos soliciten el acceso o corrección.",
  "severity": "moderate",
  "reference": "Jordan Personal Data Protection Law (Law 24 of 2023), Art. 10"
},
{
  "id": 731,
  "code": "KWTDP-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de cumplimiento documentado de CITRA para operaciones en Kuwait",
  "description": "El sitio web recopila datos de residentes kuwaitíes sin documentar el cumplimiento de las regulaciones de protección de datos de CITRA.",
  "severity": "critical",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 5"
},
{
  "id": 732,
  "code": "KWTDP-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para marketing en Kuwait",
  "description": "El sitio web envía mensajes promocionales comerciales a residentes de Kuwait sin obtener consentimiento previo de inclusión.",
  "severity": "serious",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 11"
},
{
  "id": 733,
  "code": "KWTDP-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Medidas de seguridad inadecuadas para bases de datos kuwaitíes",
  "description": "Los sistemas de bases de datos que contienen registros de usuarios kuwaitíes carecen de medidas técnicas de protección contra accesos.",
  "severity": "moderate",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 14"
},
{
  "id": 734,
  "code": "KWTDP-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ausencia de procedimientos de reporte de incidentes a CITRA en Kuwait",
  "description": "El responsable no documenta procedimientos para reportar incidentes de seguridad a CITRA y a los usuarios kuwaitíes de inmediato.",
  "severity": "serious",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 21"
},
{
  "id": 735,
  "code": "KWTDP-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de opciones de eliminación simplificadas para consumidores de Kuwait",
  "description": "El sitio web no proporciona a los consumidores de Kuwait vías gratuitas para revocar el consentimiento y solicitar la supresión.",
  "severity": "moderate",
  "reference": "Kuwait CITRA Data Protection Regulation (No. 125/2021), Art. 8"
},
{
  "id": 736,
  "code": "UZBPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Tratamiento de datos de residentes de Uzbekistán sin consentimiento explícito",
  "description": "El sitio web recopila y trata datos de ciudadanos uzbekos sin obtener consentimiento previo y explícito.",
  "severity": "critical",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 18"
},
{
  "id": 737,
  "code": "UZBPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de localización de la base de datos del servidor dentro de Uzbekistán",
  "description": "Las bases de datos que almacenan registros personales de ciudadanos uzbekos se alojan fuera de Uzbekistán, violando las leyes de localización.",
  "severity": "serious",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 12-1"
},
{
  "id": 738,
  "code": "UZBPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Avisos inadecuados para el acceso y corrección de datos en Uzbekistán",
  "description": "La política de privacidad no detalla los derechos del usuario para solicitar el acceso, bloqueo o corrección en Uzbekistán.",
  "severity": "moderate",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 30"
},
{
  "id": 739,
  "code": "UZBPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Transferencias internacionales no conformes de datos de Uzbekistán",
  "description": "El responsable transfiere registros personales de ciudadanos uzbekos a países que no garantizan niveles de protección adecuados.",
  "severity": "serious",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 15"
},
{
  "id": 740,
  "code": "UZBPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de registro de bases de datos ante el Registro Estatal de Uzbekistán",
  "description": "El responsable no registra los sistemas de bases de datos que tratan información de residentes uzbekos ante el Registro Estatal.",
  "severity": "moderate",
  "reference": "Uzbekistan Law on Personal Data (ZRU-547), Art. 24"
},
{
  "id": 741,
  "code": "GEOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de notificación al Servicio de Inspección del Estado en Georgia",
  "description": "El responsable trata datos de residentes georgianos sin notificar al Servicio del Inspector del Estado.",
  "severity": "critical",
  "reference": "Georgia Law on Personal Data Protection, Article 15"
},
{
  "id": 742,
  "code": "GEOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Georgia",
  "description": "El sitio web recopila datos sensibles (salud, registros biométricos) de residentes de Georgia sin obtener consentimiento explícito.",
  "severity": "serious",
  "reference": "Georgia Law on Personal Data Protection, Article 6"
},
{
  "id": 743,
  "code": "GEOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgaciones inadecuadas de encargados y proveedores en Georgia",
  "description": "El aviso de privacidad no detalla los encargados terceros específicos que tratan datos de residentes de Georgia.",
  "severity": "moderate",
  "reference": "Georgia Law on Personal Data Protection, Article 19"
},
{
  "id": 744,
  "code": "GEOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de auditorías de seguridad y niveles de permisos bajo la ley de Georgia",
  "description": "La base de datos que contiene registros de sujetos georgianos carece de registros de seguridad y auditorías de acceso de usuarios.",
  "severity": "serious",
  "reference": "Georgia Law on Personal Data Protection, Article 24"
},
{
  "id": 745,
  "code": "GEOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Procedimientos de bloqueo y eliminación no conformes en Georgia",
  "description": "El responsable del tratamiento no proporciona canales de contacto claros o plazos para solicitar el bloqueo o eliminación en Georgia.",
  "severity": "moderate",
  "reference": "Georgia Law on Personal Data Protection, Article 21"
},
{
  "id": 746,
  "code": "ARMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de cumplimiento de la ley de protección de datos de Armenia",
  "description": "El responsable del tratamiento trata datos de residentes armenios sin cumplir con los requisitos establecidos por la ley.",
  "severity": "critical",
  "reference": "Armenia Law on Personal Data Protection, Article 9"
},
{
  "id": 747,
  "code": "ARMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ausencia de consentimiento para perfiles automatizados en Armenia",
  "description": "El sitio web realiza publicidad dirigida o perfiles automatizados de residentes de Armenia sin consentimiento explícito.",
  "severity": "serious",
  "reference": "Armenia Law on Personal Data Protection, Article 11"
},
{
  "id": 748,
  "code": "ARMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación incompleta de ubicaciones de transferencia para Armenia",
  "description": "El aviso de privacidad no revela los países o entidades específicas fuera de Armenia que acceden a los datos del usuario.",
  "severity": "moderate",
  "reference": "Armenia Law on Personal Data Protection, Article 27"
},
{
  "id": 749,
  "code": "ARMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de planes de seguridad para bancos de datos personales en Armenia",
  "description": "La base de datos que contiene registros de sujetos armenios carece de planes de seguridad lógicos y administrativos documentados.",
  "severity": "serious",
  "reference": "Armenia Law on Personal Data Protection, Article 19"
},
{
  "id": 750,
  "code": "ARMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Procedimientos inadecuados de acceso y rectificación en Armenia",
  "description": "El responsable no proporciona canales de contacto claros o plazos para que los titulares armenios soliciten la rectificación.",
  "severity": "moderate",
  "reference": "Armenia Law on Personal Data Protection, Article 15"
},
{
  "id": 751,
  "code": "SWSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para elaboración de perfiles de alto riesgo bajo FADP de Suiza",
  "description": "El sitio web elabora perfiles de alto riesgo de residentes suizos sin obtener el consentimiento previo explícito según lo exige la FADP revisada.",
  "severity": "critical",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 6, Art. 60"
},
{
  "id": 752,
  "code": "SWSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación incompleta del aviso de privacidad bajo FADP de Suiza",
  "description": "El sitio web no proporciona información completa sobre la identidad del responsable, las categorías de datos y los países destinatarios en su aviso de privacidad.",
  "severity": "serious",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 19, Art. 60"
},
{
  "id": 753,
  "code": "SWSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de información del representante para responsables extranjeros bajo FADP",
  "description": "El responsable extranjero del sitio web no designa ni divulga un representante en Suiza para las comunicaciones con los titulares de datos.",
  "severity": "moderate",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 14"
},
{
  "id": 754,
  "code": "SWSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos suizos",
  "description": "El responsable exporta datos de residentes suizos a terceros países sin una decisión de adecuación del Consejo Federal o cláusulas contractuales estándar.",
  "severity": "serious",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 16, Art. 17"
},
{
  "id": 755,
  "code": "SWSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para derechos de los titulares bajo FADP de Suiza",
  "description": "El sitio web no proporciona a los residentes suizos métodos gratuitos y accesibles para ejercer sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Switzerland Federal Act on Data Protection (FADP), Art. 25, Art. 26"
},
{
  "id": 756,
  "code": "SAUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles bajo PDPL de Arabia Saudita",
  "description": "El sitio web recopila registros sensibles (médicos, financieros) de residentes de Arabia Saudita sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 5, Art. 35"
},
{
  "id": 757,
  "code": "SAUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de aviso de privacidad bilingüe bajo PDPL de Arabia Saudita",
  "description": "El aviso de privacidad del sitio web no se proporciona en árabe, violando los requisitos de accesibilidad lingüística y transparencia para los residentes.",
  "severity": "serious",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 30"
},
{
  "id": 758,
  "code": "SAUPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Arabia Saudita",
  "description": "El sitio web envía materiales de marketing directo o cookies publicitarias a usuarios de Arabia Saudita sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 28"
},
{
  "id": 759,
  "code": "SAUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no autorizada de datos personales suizos",
  "description": "El sitio web exporta datos de residentes de Arabia Saudita a entornos externos sin garantizar el cumplimiento de las regulaciones nacionales.",
  "severity": "serious",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 29, Art. 35"
},
{
  "id": 760,
  "code": "SAUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de documentación de recursos para titulares bajo la ley saudí",
  "description": "La política de privacidad no describe los mecanismos para que los titulares de Arabia Saudita presenten quejas ante la autoridad reguladora (SDAIA).",
  "severity": "moderate",
  "reference": "Saudi Arabia Personal Data Protection Law (PDPL), Art. 9"
},
{
  "id": 761,
  "code": "ISRPA-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de bases de datos sensibles no registradas en Israel",
  "description": "El sitio web recopila datos sensibles de ciudadanos israelíes (religión, salud, biometría) sin registrar la base de datos ante la PPA.",
  "severity": "critical",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 8, Section 31A"
},
{
  "id": 762,
  "code": "ISRPA-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de divulgación sobre la voluntariedad de la recopilación bajo la ley de Israel",
  "description": "Los formularios web no notifican explícitamente a los usuarios israelíes si proporcionar sus datos personales es obligatorio por ley o voluntario.",
  "severity": "serious",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 11"
},
{
  "id": 763,
  "code": "ISRPA-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Controles de acceso y registros de seguridad inadecuados según las normas israelíes",
  "description": "La base de datos del sitio web carece de registros de seguridad y restricciones de acceso exigidos para bases de datos con archivos personales.",
  "severity": "moderate",
  "reference": "Israel Privacy Protection Regulations (Information Security), 5777-2017"
},
{
  "id": 764,
  "code": "ISRPA-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Registro de marketing por correo directo no conforme en Israel",
  "description": "El responsable utiliza listas de contactos para marketing por correo directo a ciudadanos israelíes sin revelar la fuente de la base de datos.",
  "severity": "serious",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 17F"
},
{
  "id": 765,
  "code": "ISRPA-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de procedimientos de acceso y rectificación en Israel",
  "description": "La política de privacidad no detalla los procesos administrativos o plazos específicos para que los titulares israelíes inspeccionen o rectifiquen sus datos.",
  "severity": "moderate",
  "reference": "Israel Privacy Protection Act, 5741-1981, Section 13, Section 14"
},
{
  "id": 766,
  "code": "LKAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento para procesar datos sensibles en Sri Lanka",
  "description": "El sitio web trata datos personales sensibles (biometría, salud, registros financieros) de titulares en Sri Lanka sin obtener consentimiento explícito.",
  "severity": "critical",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 6"
},
{
  "id": 767,
  "code": "LKAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Retención excesiva de datos personales en Sri Lanka",
  "description": "El sitio web conserva datos personales de usuarios de Sri Lanka más tiempo del necesario, violando los límites de retención establecidos por ley.",
  "severity": "serious",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 10"
},
{
  "id": 768,
  "code": "LKAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de designación o divulgación de contacto de DPO en Sri Lanka",
  "description": "El responsable no designa ni proporciona vías de contacto públicas para el Delegado de Protección de Datos bajo la ley de Sri Lanka.",
  "severity": "moderate",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 20"
},
{
  "id": 769,
  "code": "LKAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de provisión gratuita de derechos de acceso en Sri Lanka",
  "description": "El sitio web no establece procedimientos para responder de forma gratuita a las solicitudes de acceso de residentes de Sri Lanka en un plazo de 21 días.",
  "severity": "serious",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 14"
},
{
  "id": 770,
  "code": "LKAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Sri Lanka",
  "description": "El responsable transfiere datos de Sri Lanka a países externos que no garantizan un nivel adecuado de protección según las normas de la autoridad.",
  "severity": "moderate",
  "reference": "Sri Lanka Personal Data Protection Act, No. 9 of 2022, Sec. 26"
},
{
  "id": 771,
  "code": "MUSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de base legal para el tratamiento de datos sensibles en Mauricio",
  "description": "El sitio web recopila registros personales sensibles de ciudadanos de Mauricio sin una base legal válida o consentimiento previo explícito.",
  "severity": "critical",
  "reference": "Mauritius Data Protection Act 2017, Sec. 29, Sec. 43"
},
{
  "id": 772,
  "code": "MUSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación incompleta sobre transferencias transfronterizas en Mauricio",
  "description": "La política de privacidad no revela detalles de la transferencia ni solicita el consentimiento para exportar datos de usuarios de Mauricio.",
  "severity": "serious",
  "reference": "Mauritius Data Protection Act 2017, Sec. 28"
},
{
  "id": 773,
  "code": "MUSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de métodos para retirar el consentimiento en Mauricio",
  "description": "El sitio web no proporciona a los residentes de Mauricio métodos fáciles y gratuitos para retirar el consentimiento del tratamiento.",
  "severity": "moderate",
  "reference": "Mauritius Data Protection Act 2017, Sec. 28(2)"
},
{
  "id": 774,
  "code": "MUSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Reporte de brechas de 72 horas no conforme en Mauricio",
  "description": "El responsable del sitio web carece de procesos documentados para reportar incidentes al Comisionado en un plazo de 72 horas.",
  "severity": "serious",
  "reference": "Mauritius Data Protection Act 2017, Sec. 44, Sec. 47"
},
{
  "id": 775,
  "code": "MUSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación en Mauricio",
  "description": "El sitio web no proporciona rutas de contacto claras para que los titulares de Mauricio soliciten la supresión o rectificación de sus datos.",
  "severity": "moderate",
  "reference": "Mauritius Data Protection Act 2017, Sec. 39"
},
{
  "id": 776,
  "code": "TZNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro ante la Comisión en Tanzania",
  "description": "El sitio web recopila datos de titulares en Tanzania sin registrarse como responsable ante la Comisión de Protección de Datos Personales.",
  "severity": "critical",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 14, Sec. 15"
},
{
  "id": 777,
  "code": "TZNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Tanzania",
  "description": "El sitio web utiliza datos personales de ciudadanos de Tanzania para marketing directo comercial sin obtener consentimiento previo de aceptación.",
  "severity": "serious",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 31"
},
{
  "id": 778,
  "code": "TZNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Procedimientos inadecuados de acceso y rectificación en Tanzania",
  "description": "La política de privacidad no documenta procedimientos accesibles ni rutas de contacto para que los usuarios de Tanzania inspeccionen y corrijan datos.",
  "severity": "moderate",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 27, Sec. 28"
},
{
  "id": 779,
  "code": "TZNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza de datos no conforme desde Tanzania",
  "description": "El responsable transfiere datos de residentes de Tanzania fuera del país sin obtener la aprobación previa o el permiso de la Comisión.",
  "severity": "serious",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 32"
},
{
  "id": 780,
  "code": "TZNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de documentación de protocolos de notificación de brechas en Tanzania",
  "description": "El responsable no documenta los procedimientos para notificar a la Comisión y a los afectados sobre brechas de seguridad tan pronto como sea viable.",
  "severity": "moderate",
  "reference": "Tanzania Personal Data Protection Act, 2022, Sec. 40"
},
{
  "id": 781,
  "code": "BTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento en Botsuana",
  "description": "El sitio web trata datos personales sensibles (salud, políticos, vida sexual) de titulares en Botsuana sin consentimiento previo explícito.",
  "severity": "critical",
  "reference": "Botswana Data Protection Act, 2018, Sec. 16, Sec. 49"
},
{
  "id": 782,
  "code": "BTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de autorización para transferencias transfronterizas desde Botsuana",
  "description": "El responsable transfiere datos de residentes de Botsuana a países que carecen de leyes adecuadas sin la autorización del Comisionado.",
  "severity": "serious",
  "reference": "Botswana Data Protection Act, 2018, Sec. 48, Sec. 49"
},
{
  "id": 783,
  "code": "BTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Medidas de seguridad inadecuadas para bases de datos sensibles en Botsuana",
  "description": "La base de datos del sitio web no implementa las salvaguardas de seguridad y el cifrado adecuados para proteger los registros de usuarios.",
  "severity": "moderate",
  "reference": "Botswana Data Protection Act, 2018, Sec. 33"
},
{
  "id": 784,
  "code": "BTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de métodos de acceso y limitación para titulares en Botsuana",
  "description": "La política de privacidad no documenta métodos accesibles para que los usuarios de Botsuana verifiquen o limiten el tratamiento de datos.",
  "severity": "serious",
  "reference": "Botswana Data Protection Act, 2018, Sec. 21, Sec. 22"
},
{
  "id": 785,
  "code": "BTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de vías de revocación de consentimiento en Botsuana",
  "description": "El sitio web no proporciona a los residentes de Botsuana mecanismos directos y gratuitos para revocar el consentimiento del seguimiento.",
  "severity": "moderate",
  "reference": "Botswana Data Protection Act, 2018, Sec. 20"
},
{
  "id": 786,
  "code": "ZMBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Zambia",
  "description": "El sitio web recopila registros sensibles (médicos, financieros) de titulares en Zambia sin el consentimiento previo explícito por escrito.",
  "severity": "critical",
  "reference": "Zambia Data Protection Act, 2021, Sec. 10, Sec. 15"
},
{
  "id": 787,
  "code": "ZMBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable en Zambia",
  "description": "El responsable del sitio web recopila datos de residentes de Zambia sin registrarse ante la Oficina del Comisionado de Protección de Datos.",
  "severity": "serious",
  "reference": "Zambia Data Protection Act, 2021, Sec. 10, Sec. 11"
},
{
  "id": 788,
  "code": "ZMBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de designación o divulgación de DPO bajo la ley de Zambia",
  "description": "El responsable no designa ni proporciona información de contacto pública para un Delegado de Protección de Datos según las normas de Zambia.",
  "severity": "moderate",
  "reference": "Zambia Data Protection Act, 2021, Sec. 41"
},
{
  "id": 789,
  "code": "ZMBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Zambia",
  "description": "El sitio web conserva registros de usuarios de Zambia más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Zambia Data Protection Act, 2021, Sec. 14"
},
{
  "id": 790,
  "code": "ZMBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Zambia",
  "description": "El responsable transfiere datos de residentes de Zambia fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Zambia Data Protection Act, 2021, Sec. 47"
},
{
  "id": 791,
  "code": "JAMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de registro ante el Comisionado de Información en Jamaica",
  "description": "El responsable del sitio web recopila datos de residentes de Jamaica sin registrarse ante el Comisionado de Información.",
  "severity": "critical",
  "reference": "Jamaica Data Protection Act, 2020, Section 14, Section 67"
},
{
  "id": 792,
  "code": "JAMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de contactos del Delegado de Protección de Datos en Jamaica",
  "description": "La política de privacidad no identifica ni proporciona contactos públicos del Delegado de Protección de Datos designado en Jamaica.",
  "severity": "serious",
  "reference": "Jamaica Data Protection Act, 2020, Section 18"
},
{
  "id": 793,
  "code": "JAMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de opción de exclusión para elaboración de perfiles en Jamaica",
  "description": "El sitio web no proporciona a los residentes de Jamaica opciones claras para excluirse o negarse al tratamiento con fines de marketing.",
  "severity": "moderate",
  "reference": "Jamaica Data Protection Act, 2020, Section 27"
},
{
  "id": 794,
  "code": "JAMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de contratos formales con encargados bajo la ley de Jamaica",
  "description": "El responsable transfiere datos de residentes de Jamaica a terceros proveedores o encargados sin un contrato vinculante por escrito.",
  "severity": "serious",
  "reference": "Jamaica Data Protection Act, 2020, Section 31"
},
{
  "id": 795,
  "code": "JAMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme desde Jamaica",
  "description": "El responsable exporta datos de usuarios de Jamaica a países sin la protección adecuada y sin autorización del Comisionado.",
  "severity": "moderate",
  "reference": "Jamaica Data Protection Act, 2020, Section 36"
},
{
  "id": 796,
  "code": "BRBPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento no registrado de datos personales en Barbados",
  "description": "El sitio web recopila datos de ciudadanos de Barbados sin registrarse ante el Comisionado de Protección de Datos.",
  "severity": "critical",
  "reference": "Barbados Data Protection Act, 2019, Sec. 14, Sec. 51"
},
{
  "id": 797,
  "code": "BRBPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Medidas de seguridad inadecuadas para datos de Barbados",
  "description": "El sitio web carece de salvaguardas técnicas y administrativas para proteger los registros recopilados contra el acceso no autorizado.",
  "severity": "serious",
  "reference": "Barbados Data Protection Act, 2019, Sec. 32"
},
{
  "id": 798,
  "code": "BRBPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de divulgación en el aviso de privacidad bajo la ley de Barbados",
  "description": "La política de privacidad no proporciona a los usuarios de Barbados información sobre los fines, los límites de retención y los destinatarios.",
  "severity": "moderate",
  "reference": "Barbados Data Protection Act, 2019, Sec. 37"
},
{
  "id": 799,
  "code": "BRBPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de mecanismos de objeción directa en Barbados",
  "description": "El sitio web no ofrece a los titulares de Barbados mecanismos claros para oponerse o limitar el tratamiento con fines comerciales.",
  "severity": "serious",
  "reference": "Barbados Data Protection Act, 2019, Sec. 24"
},
{
  "id": 800,
  "code": "BRBPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Reporte de brechas de 72 horas no conforme en Barbados",
  "description": "El sitio web no documenta los protocolos para notificar al Comisionado sobre brechas de seguridad en un plazo de 72 horas.",
  "severity": "moderate",
  "reference": "Barbados Data Protection Act, 2019, Sec. 46"
},
{
  "id": 801,
  "code": "BHSPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento no registrado de datos personales en Bahamas",
  "description": "El sitio web recopila registros sensibles de titulares de las Bahamas sin registrar el tratamiento ante el Comisionado.",
  "severity": "critical",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 5, Sec. 15"
},
{
  "id": 802,
  "code": "BHSPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Medidas de seguridad inadecuadas para datos de Bahamas",
  "description": "La base de datos almacena archivos de residentes de las Bahamas sin implementar medidas de seguridad para evitar la pérdida de datos.",
  "severity": "serious",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 11"
},
{
  "id": 803,
  "code": "BHSPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de derechos de rectificación y supresión en Bahamas",
  "description": "La política de privacidad no documenta rutas de contacto para que los residentes de las Bahamas soliciten la corrección o supresión.",
  "severity": "moderate",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 8"
},
{
  "id": 804,
  "code": "BHSPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Exclusión de marketing directo no conforme en Bahamas",
  "description": "El sitio web envía correos publicitarios o cookies a titulares en las Bahamas sin proporcionar mecanismos gratuitos de exclusión.",
  "severity": "serious",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 13"
},
{
  "id": 805,
  "code": "BHSPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Límites excesivos de retención de datos bajo la ley de Bahamas",
  "description": "El sitio web conserva registros de usuarios de las Bahamas indefinidamente sin establecer límites específicos o ciclos de limpieza.",
  "severity": "moderate",
  "reference": "Bahamas Data Protection (Privacy of Personal Information) Act, Sec. 6"
},
{
  "id": 806,
  "code": "TTOPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de base de datos sensible no registrada en Trinidad y Tobago",
  "description": "El sitio web trata registros sensibles de residentes de Trinidad y Tobago sin registrar la base de datos ante el Comisionado.",
  "severity": "critical",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 46, Section 82"
},
{
  "id": 807,
  "code": "TTOPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Trinidad y Tobago",
  "description": "La base de datos almacena archivos de usuarios de Trinidad y Tobago sin emplear cifrado técnico o controles administrativos obligatorios.",
  "severity": "serious",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 38"
},
{
  "id": 808,
  "code": "TTOPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Plazos de solicitud de acceso de 30 días no conformes en Trinidad y Tobago",
  "description": "La política de privacidad del sitio web no documenta puntos de contacto o procedimientos para responder a solicitudes de acceso en 30 días.",
  "severity": "moderate",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 42"
},
{
  "id": 809,
  "code": "TTOPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme desde Trinidad y Tobago",
  "description": "El sitio web transfiere datos de usuarios de Trinidad y Tobago a países que carecen de protección jurídica comparable sin consentimiento.",
  "severity": "serious",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 46(2)"
},
{
  "id": 810,
  "code": "TTOPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento para fines secundarios sin consentimiento en Trinidad y Tobago",
  "description": "El sitio web utiliza datos de usuarios de Trinidad y Tobago para fines de marketing secundario sin obtener el consentimiento previo.",
  "severity": "moderate",
  "reference": "Trinidad and Tobago Data Protection Act, 2011, Section 32"
},
{
  "id": 811,
  "code": "MCOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de notificación del tratamiento a la CCIN en Mónaco",
  "description": "El sitio web recopila datos de residentes de Mónaco sin presentar una declaración u obtener la autorización de la CCIN.",
  "severity": "critical",
  "reference": "Monaco Law No. 1.165, Article 7, Article 21"
},
{
  "id": 812,
  "code": "MCOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de representante local para responsables extranjeros en Mónaco",
  "description": "El responsable extranjero del sitio web no designa ni divulga un representante en Mónaco para las comunicaciones.",
  "severity": "serious",
  "reference": "Monaco Law No. 1.165, Article 7-1"
},
{
  "id": 813,
  "code": "MCOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Consentimiento de cookies inadecuado en Mónaco",
  "description": "El sitio web instala cookies publicitarias sin aviso previo transparente y opciones de consentimiento activo en Mónaco.",
  "severity": "moderate",
  "reference": "Monaco Law No. 1.165, Article 11, Article 12"
},
{
  "id": 814,
  "code": "MCOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Exportación no autorizada de datos personales desde Mónaco",
  "description": "El sitio web transfiere datos de usuarios de Mónaco a países extranjeros sin garantizar la adecuación o la autorización de la CCIN.",
  "severity": "serious",
  "reference": "Monaco Law No. 1.165, Article 20, Article 20-1"
},
{
  "id": 815,
  "code": "MCOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para ejercer derechos de oposición en Mónaco",
  "description": "La política de privacidad no establece rutas de contacto claras para que los titulares de Mónaco se opongan al tratamiento.",
  "severity": "moderate",
  "reference": "Monaco Law No. 1.165, Article 13, Article 15"
},
{
  "id": 816,
  "code": "ADPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de base legal para el tratamiento bajo la ley 29/2021 de Andorra",
  "description": "El sitio web trata datos personales de residentes de Andorra sin establecer una base legal válida según la Ley Cualificada.",
  "severity": "critical",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 6, Article 7"
},
{
  "id": 817,
  "code": "ADPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de designación o registro del DPO en Andorra",
  "description": "El responsable no designa ni registra un Delegado de Protección de Datos ante la APDA cuando el tratamiento lo requiere.",
  "severity": "serious",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 37"
},
{
  "id": 818,
  "code": "ADPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Andorra",
  "description": "El aviso de privacidad del sitio web no revela los plazos de retención, las bases legales o los derechos a reclamar ante la APDA.",
  "severity": "moderate",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 13, Article 14"
},
{
  "id": 819,
  "code": "ADPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Andorra",
  "description": "El responsable transfiere datos de residentes de Andorra a terceros países sin adecuación o cláusulas autorizadas por la APDA.",
  "severity": "serious",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 44, Article 45"
},
{
  "id": 820,
  "code": "ADPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para ejercer el derecho de supresión en Andorra",
  "description": "El sitio web no proporciona a los usuarios de Andorra métodos claros y gratuitos para solicitar la supresión o limitación.",
  "severity": "moderate",
  "reference": "Andorra Qualified Law 29/2021 on Personal Data Protection, Article 15, Article 18"
},
{
  "id": 821,
  "code": "SRBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Serbia",
  "description": "El sitio web recopila datos sensibles (salud, biometría) de residentes en Serbia sin consentimiento previo explícito.",
  "severity": "critical",
  "reference": "Serbia Law on Personal Data Protection, Article 17, Article 95"
},
{
  "id": 822,
  "code": "SRBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de representante en Serbia para responsables extranjeros",
  "description": "El responsable extranjero del sitio web no designa ni divulga un representante local en Serbia para el cumplimiento de la ley.",
  "severity": "serious",
  "reference": "Serbia Law on Personal Data Protection, Article 44"
},
{
  "id": 823,
  "code": "SRBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Serbia",
  "description": "La política de privacidad no detalla los fines del tratamiento en Serbia, los límites de retención o los contactos del Comisionado.",
  "severity": "moderate",
  "reference": "Serbia Law on Personal Data Protection, Article 23"
},
{
  "id": 824,
  "code": "SRBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Reporte de brechas de 72 horas no conforme en Serbia",
  "description": "El responsable del sitio web carece de procedimientos documentados para reportar incidentes al Comisionado de Serbia en 72 horas.",
  "severity": "serious",
  "reference": "Serbia Law on Personal Data Protection, Article 52, Article 95"
},
{
  "id": 825,
  "code": "SRBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Serbia",
  "description": "El sitio web no establece canales para que los titulares de Serbia ejerzan sus derechos en el plazo de respuesta de 30 días.",
  "severity": "moderate",
  "reference": "Serbia Law on Personal Data Protection, Article 21, Article 22"
},
{
  "id": 826,
  "code": "ALBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación en Albania",
  "description": "El sitio web recopila datos de residentes de Albania sin presentar una notificación de tratamiento ante el Comisionado.",
  "severity": "critical",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 21, Article 39"
},
{
  "id": 827,
  "code": "ALBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no autorizada de datos de Albania",
  "description": "El sitio web exporta datos de usuarios de Albania a entornos externos sin garantizar la adecuación o la aprobación del Comisionado.",
  "severity": "serious",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 8, Article 9"
},
{
  "id": 828,
  "code": "ALBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Albania",
  "description": "El sitio web utiliza datos de titulares de Albania para marketing directo comercial sin proporcionar opciones de exclusión gratuitas.",
  "severity": "moderate",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 16"
},
{
  "id": 829,
  "code": "ALBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Medidas de seguridad de bases de datos inadecuadas bajo la ley de Albania",
  "description": "La base de datos del sitio web carece del cifrado y los controles de acceso exigidos para proteger los registros de usuarios.",
  "severity": "serious",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 18"
},
{
  "id": 830,
  "code": "ALBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Procedimientos inadecuados de acceso y rectificación en Albania",
  "description": "La política de privacidad del sitio web no establece rutas de contacto para que los titulares inspeccionen o rectifiquen registros.",
  "severity": "moderate",
  "reference": "Albania Law No. 9887 on Protection of Personal Data, Article 12, Article 15"
},
{
  "id": 831,
  "code": "TUNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin declaración ante la INPDP en Túnez",
  "description": "El sitio web recopila datos de residentes de Túnez sin presentar una declaración o solicitar la autorización de la INPDP.",
  "severity": "critical",
  "reference": "Tunisia Organic Law No. 2004-63, Article 7, Article 76"
},
{
  "id": 832,
  "code": "TUNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento por escrito para datos sensibles en Túnez",
  "description": "El sitio web trata datos personales sensibles (salud, opiniones políticas) de residentes de Túnez sin consentimiento previo por escrito.",
  "severity": "serious",
  "reference": "Tunisia Organic Law No. 2004-63, Article 13, Article 77"
},
{
  "id": 833,
  "code": "TUNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Túnez",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Túnez soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Tunisia Organic Law No. 2004-63, Article 27"
},
{
  "id": 834,
  "code": "TUNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Túnez",
  "description": "El sitio web utiliza datos de titulares de Túnez para marketing directo comercial sin obtener consentimiento previo de aceptación.",
  "severity": "serious",
  "reference": "Tunisia Organic Law No. 2004-63, Article 31, Article 82"
},
{
  "id": 835,
  "code": "TUNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos desde Túnez",
  "description": "El responsable exporta datos de usuarios de Túnez a entornos de almacenamiento externos sin garantizar la adecuación o aprobación.",
  "severity": "moderate",
  "reference": "Tunisia Organic Law No. 2004-63, Article 49, Article 85"
},
{
  "id": 836,
  "code": "SENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la CDP en Senegal",
  "description": "El sitio web recopila datos de residentes de Senegal sin presentar una notificación de tratamiento ante la CDP.",
  "severity": "critical",
  "reference": "Senegal Law No. 2008-12, Article 16, Article 46"
},
{
  "id": 837,
  "code": "SENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Senegal",
  "description": "La base de datos almacena archivos de residentes de Senegal sin emplear cifrado técnico o controles administrativos obligatorios.",
  "severity": "serious",
  "reference": "Senegal Law No. 2008-12, Article 70, Article 71"
},
{
  "id": 838,
  "code": "SENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de divulgación sobre terceros destinatarios en aviso de Senegal",
  "description": "La política de privacidad del sitio web no identifica a terceros destinatarios o servidores para datos de residentes de Senegal.",
  "severity": "moderate",
  "reference": "Senegal Law No. 2008-12, Article 58"
},
{
  "id": 839,
  "code": "SENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Senegal",
  "description": "El sitio web envía correos publicitarios o cookies a titulares en Senegal sin obtener consentimiento previo de aceptación.",
  "severity": "serious",
  "reference": "Senegal Law No. 2008-12, Article 33"
},
{
  "id": 840,
  "code": "SENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación en Senegal",
  "description": "La política de privacidad del sitio web no proporciona a los titulares de Senegal canales claros para solicitar la supresión o rectificación.",
  "severity": "moderate",
  "reference": "Senegal Law No. 2008-12, Article 69"
},
{
  "id": 841,
  "code": "CIVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registro del tratamiento ante la ARTCI en Costa de Marfil",
  "description": "El responsable del sitio web recopila datos de residentes de Costa de Marfil sin presentar una notificación de registro ante la ARTCI.",
  "severity": "critical",
  "reference": "Ivory Coast Law No. 2013-450, Article 6, Article 42"
},
{
  "id": 842,
  "code": "CIVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Costa de Marfil",
  "description": "El sitio web trata datos personales sensibles (biometría, salud) de titulares en Costa de Marfil sin obtener el consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Ivory Coast Law No. 2013-450, Article 9, Article 43"
},
{
  "id": 843,
  "code": "CIVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación en Costa de Marfil",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Costa de Marfil soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Ivory Coast Law No. 2013-450, Article 28"
},
{
  "id": 844,
  "code": "CIVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Costa de Marfil",
  "description": "El responsable transfiere datos de titulares de Costa de Marfil a países extranjeros sin la autorización previa de la ARTCI.",
  "severity": "serious",
  "reference": "Ivory Coast Law No. 2013-450, Article 35, Article 45"
},
{
  "id": 845,
  "code": "CIVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Costa de Marfil",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Costa de Marfil sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Ivory Coast Law No. 2013-450, Article 25"
},
{
  "id": 846,
  "code": "MNGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Tratamiento de datos personales sin base legal en Mongolia",
  "description": "El sitio web recopila datos de residentes de Mongolia sin establecer una base legal válida o consentimiento según la ley de Mongolia.",
  "severity": "critical",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 6, Article 32"
},
{
  "id": 847,
  "code": "MNGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de canales de notificación de incidentes bajo la ley de Mongolia",
  "description": "El responsable del sitio web no documenta los procedimientos para notificar a los usuarios de Mongolia sobre brechas de seguridad.",
  "severity": "serious",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 15"
},
{
  "id": 848,
  "code": "MNGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de derechos de rectificación y supresión de datos en Mongolia",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los usuarios de Mongolia soliciten la rectificación o destrucción.",
  "severity": "moderate",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 17, Article 18"
},
{
  "id": 849,
  "code": "MNGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Tratamiento de datos biométricos sin consentimiento escrito en Mongolia",
  "description": "El sitio web recopila datos biométricos o genéticos de titulares en Mongolia sin el consentimiento previo por escrito.",
  "severity": "serious",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 8, Article 12"
},
{
  "id": 850,
  "code": "MNGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Comunicaciones de marketing directo no conformes en Mongolia",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Mongolia sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Mongolia Law on Protection of Personal Data 2021, Article 23"
},
{
  "id": 851,
  "code": "NORPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento explícito en Noruega",
  "description": "El sitio web trata datos personales sensibles de usuarios noruegos sin obtener el consentimiento previo explícito exigido por la Datatilsynet.",
  "severity": "critical",
  "reference": "Norway Personal Data Act, Sec. 1 (incorporating GDPR Art. 9)"
},
{
  "id": 852,
  "code": "NORPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Verificación de edad incompleta para servicios infantiles en Noruega",
  "description": "El sitio web no implementa mecanismos de verificación de edad o consentimiento parental para usuarios noruegos menores de 13 años.",
  "severity": "serious",
  "reference": "Norway Personal Data Act, Sec. 12"
},
{
  "id": 853,
  "code": "NORPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en aviso de privacidad según las normas de Noruega",
  "description": "La política de privacidad no identifica la información de contacto noruega o los detalles para presentar una queja ante la Datatilsynet.",
  "severity": "moderate",
  "reference": "Norway Personal Data Act (GDPR Art. 13)"
},
{
  "id": 854,
  "code": "NORPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de protocolos de notificación de brechas de 72 horas en Noruega",
  "description": "El responsable del sitio web no documenta los procedimientos para reportar brechas a la Datatilsynet en un plazo de 72 horas.",
  "severity": "serious",
  "reference": "Norway Personal Data Act (GDPR Art. 33)"
},
{
  "id": 855,
  "code": "NORPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Vías inadecuadas de respuesta para acceso y supresión en Noruega",
  "description": "El sitio web no establece puntos de contacto transparentes y gratuitos para que los usuarios soliciten la supresión o acceso.",
  "severity": "moderate",
  "reference": "Norway Personal Data Act (GDPR Art. 15, Art. 17)"
},
{
  "id": 856,
  "code": "ISLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sensibles sin consentimiento escrito en Islandia",
  "description": "El sitio web recopila registros personales sensibles de titulares en Islandia sin el consentimiento previo por escrito o digital.",
  "severity": "critical",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 9)"
},
{
  "id": 857,
  "code": "ISLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de verificación de edad para consentimiento infantil en Islandia",
  "description": "El sitio web no implementa mecanismos de consentimiento parental para usuarios en Islandia menores de 13 años.",
  "severity": "serious",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018, Sec. 14"
},
{
  "id": 858,
  "code": "ISLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación incompleta en el aviso de privacidad de Islandia",
  "description": "El aviso de privacidad del sitio web no revela los límites de retención o el derecho a reclamar ante la Persónuvernd.",
  "severity": "moderate",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 13)"
},
{
  "id": 859,
  "code": "ISLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de protocolos de notificación de incidentes en Islandia",
  "description": "El sitio web no establece procesos para notificar a la Persónuvernd y a los afectados sobre brechas en un plazo de 72 horas.",
  "severity": "serious",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 33)"
},
{
  "id": 860,
  "code": "ISLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos en Islandia",
  "description": "El sitio web no establece puntos de contacto gratuitos para que los titulares en Islandia soliciten la rectificación o supresión.",
  "severity": "moderate",
  "reference": "Iceland Act on Data Protection and Processing of Personal Data, No. 90/2018 (GDPR Art. 15, Art. 17)"
},
{
  "id": 861,
  "code": "LIEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento en Liechtenstein",
  "description": "El sitio web recopila datos sensibles de residentes de Liechtenstein sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 4, GDPR Art. 9"
},
{
  "id": 862,
  "code": "LIEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Verificación de edad incompleta para consentimiento infantil en Liechtenstein",
  "description": "El sitio web no implementa mecanismos de consentimiento parental para usuarios en Liechtenstein menores de 16 años.",
  "severity": "serious",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 12, GDPR Art. 8"
},
{
  "id": 863,
  "code": "LIEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Liechtenstein",
  "description": "La política de privacidad del sitio web no revela los plazos de retención o el derecho a reclamar ante la DSS de Liechtenstein.",
  "severity": "moderate",
  "reference": "Liechtenstein Data Protection Act (DSG) Art. 15, GDPR Art. 13"
},
{
  "id": 864,
  "code": "LIEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de protocolos de reporte de brechas de 72 horas en Liechtenstein",
  "description": "El responsable del sitio web carece de procedimientos documentados para reportar incidentes a la DSS de Liechtenstein en 72 horas.",
  "severity": "serious",
  "reference": "Liechtenstein Data Protection Act (DSG), GDPR Art. 33"
},
{
  "id": 865,
  "code": "LIEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en Liechtenstein",
  "description": "El sitio web no proporciona a los residentes de Liechtenstein métodos accesibles para ejercer sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Liechtenstein Data Protection Act (DSG), GDPR Art. 15, Art. 17"
},
{
  "id": 866,
  "code": "MKDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sensibles sin consentimiento en Macedonia del Norte",
  "description": "El sitio web trata categorías sensibles de datos de residentes de Macedonia del Norte sin el consentimiento previo explícito.",
  "severity": "critical",
  "reference": "North Macedonia Law on Personal Data Protection, Article 13, Article 100"
},
{
  "id": 867,
  "code": "MKDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de designación de DPO bajo la ley de Macedonia del Norte",
  "description": "El responsable no designa ni proporciona información de contacto del Delegado de Protección de Datos según las normas locales.",
  "severity": "serious",
  "reference": "North Macedonia Law on Personal Data Protection, Article 32"
},
{
  "id": 868,
  "code": "MKDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en aviso de privacidad de Macedonia del Norte",
  "description": "El aviso de privacidad del sitio web no revela los plazos de retención, las bases legales o los derechos a reclamar ante la Agencia.",
  "severity": "moderate",
  "reference": "North Macedonia Law on Personal Data Protection, Article 17, Article 18"
},
{
  "id": 869,
  "code": "MKDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de protocolos de notificación de brechas en Macedonia del Norte",
  "description": "El responsable del sitio web carece de procedimientos documentados para reportar incidentes a la Agencia de Protección de Datos en 72 horas.",
  "severity": "serious",
  "reference": "North Macedonia Law on Personal Data Protection, Article 37, Article 100"
},
{
  "id": 870,
  "code": "MKDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en Macedonia del Norte",
  "description": "El sitio web no proporciona a los residentes de Macedonia del Norte métodos accesibles para ejercer sus derechos de acceso o supresión.",
  "severity": "moderate",
  "reference": "North Macedonia Law on Personal Data Protection, Article 19, Article 21"
},
{
  "id": 871,
  "code": "MNEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento para procesar datos sensibles en Montenegro",
  "description": "El sitio web recopila registros sensibles de residentes de Montenegro sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Montenegro Law on Personal Data Protection, Article 9, Article 13"
},
{
  "id": 872,
  "code": "MNEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Salvaguardas de seguridad de base de datos inadecuadas en Montenegro",
  "description": "La base de datos del sitio web carece del cifrado y los controles de acceso exigidos para proteger los registros de usuarios en Montenegro.",
  "severity": "serious",
  "reference": "Montenegro Law on Personal Data Protection, Article 24"
},
{
  "id": 873,
  "code": "MNEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Aviso de privacidad inadecuado bajo la ley de Montenegro",
  "description": "El aviso de privacidad no revela los plazos de retención o los derechos a reclamar ante la AZLP de Montenegro.",
  "severity": "moderate",
  "reference": "Montenegro Law on Personal Data Protection, Article 21"
},
{
  "id": 874,
  "code": "MNEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no autorizada de datos de Montenegro",
  "description": "El sitio web exporta datos de residentes de Montenegro a países que carecen de protección adecuada sin la aprobación de la AZLP.",
  "severity": "serious",
  "reference": "Montenegro Law on Personal Data Protection, Article 28"
},
{
  "id": 875,
  "code": "MNEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en Montenegro",
  "description": "El sitio web no proporciona a los residentes de Montenegro métodos claros para acceder o rectificar registros.",
  "severity": "moderate",
  "reference": "Montenegro Law on Personal Data Protection, Article 19, Article 20"
},
{
  "id": 876,
  "code": "BIHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Bosnia y Herzegovina",
  "description": "El sitio web recopila datos sensibles de residentes de Bosnia y Herzegovina sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 9, Article 42"
},
{
  "id": 877,
  "code": "BIHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Medidas de seguridad inadecuadas para datos en Bosnia y Herzegovina",
  "description": "La base de datos del sitio web carece de registros de seguridad y restricciones de acceso para proteger los registros de usuarios bosnios.",
  "severity": "serious",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 11"
},
{
  "id": 878,
  "code": "BIHPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Aviso de privacidad inadecuado según las normas de Bosnia y Herzegovina",
  "description": "La política de privacidad del sitio web no revela los plazos de retención o el derecho a reclamar ante la AZLP de Bosnia.",
  "severity": "moderate",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 15"
},
{
  "id": 879,
  "code": "BIHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no autorizada de datos de Bosnia",
  "description": "El sitio web exporta datos de residentes de Bosnia a países que carecen de protección adecuada sin la aprobación de la AZLP.",
  "severity": "serious",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 18"
},
{
  "id": 880,
  "code": "BIHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de canales para supresión y rectificación en Bosnia",
  "description": "El sitio web no proporciona a los usuarios en Bosnia métodos fáciles para solicitar la rectificación o supresión de datos.",
  "severity": "moderate",
  "reference": "Bosnia and Herzegovina Law on Personal Data Protection, Article 24, Article 25"
},
{
  "id": 881,
  "code": "MDAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registro del tratamiento ante la CNPDCP en Moldavia",
  "description": "El sitio web recopila datos de residentes de Moldavia sin registrar el tratamiento ante la CNPDCP.",
  "severity": "critical",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 6, Article 32"
},
{
  "id": 882,
  "code": "MDAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Moldavia",
  "description": "El sitio web trata datos personales sensibles (biometría, salud) de titulares en Moldavia sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 5"
},
{
  "id": 883,
  "code": "MDAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Aviso de privacidad inadecuado bajo la ley de Moldavia",
  "description": "La política de privacidad del sitio web no revela los plazos de retención o los derechos a reclamar ante la CNPDCP.",
  "severity": "moderate",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 12"
},
{
  "id": 884,
  "code": "MDAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Moldavia",
  "description": "El responsable transfiere datos de residentes de Moldavia a terceros países sin adecuación o cláusulas autorizadas por la CNPDCP.",
  "severity": "serious",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 32"
},
{
  "id": 885,
  "code": "MDAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en Moldavia",
  "description": "El sitio web no proporciona a los residentes de Moldavia métodos accesibles para ejercer sus derechos de acceso o rectificación.",
  "severity": "moderate",
  "reference": "Moldova Law No. 133 on Personal Data Protection, Article 15"
},
{
  "id": 886,
  "code": "KGZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Kirguistán",
  "description": "El sitio web recopila datos de residentes de Kirguistán sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Kyrgyzstan Law on Personal Information, Article 5, Article 29"
},
{
  "id": 887,
  "code": "KGZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Kirguistán",
  "description": "El sitio web recopila datos sensibles de residentes en Kirguistán sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Kyrgyzstan Law on Personal Information, Article 8"
},
{
  "id": 888,
  "code": "KGZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Kirguistán",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos del Organismo Estatal.",
  "severity": "moderate",
  "reference": "Kyrgyzstan Law on Personal Information, Article 19"
},
{
  "id": 889,
  "code": "KGZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Kirguistán",
  "description": "El responsable transfiere datos de usuarios de Kirguistán a países externos sin garantizar la adecuación o la aprobación del Organismo.",
  "severity": "serious",
  "reference": "Kyrgyzstan Law on Personal Information, Article 25"
},
{
  "id": 890,
  "code": "KGZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Kirguistán",
  "description": "El sitio web no establece canales para que los titulares de Kirguistán ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Kyrgyzstan Law on Personal Information, Article 17, Article 18"
},
{
  "id": 891,
  "code": "TJKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Tayikistán",
  "description": "El sitio web recopila datos de residentes de Tayikistán sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Tajikistan Law on Personal Data, Article 5, Article 21"
},
{
  "id": 892,
  "code": "TJKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Tayikistán",
  "description": "El sitio web recopila datos sensibles de residentes en Tayikistán sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Tajikistan Law on Personal Data, Article 8"
},
{
  "id": 893,
  "code": "TJKPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Tayikistán",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos del organismo autorizado.",
  "severity": "moderate",
  "reference": "Tajikistan Law on Personal Data, Article 15"
},
{
  "id": 894,
  "code": "TJKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Tayikistán",
  "description": "El responsable transfiere datos de usuarios de Tayikistán a países externos sin garantizar la adecuación o la aprobación del organismo.",
  "severity": "serious",
  "reference": "Tajikistan Law on Personal Data, Article 18"
},
{
  "id": 895,
  "code": "TJKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Tayikistán",
  "description": "El sitio web no establece canales para que los titulares de Tayikistán ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Tajikistan Law on Personal Data, Article 11, Article 12"
},
{
  "id": 896,
  "code": "TGOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la IPDCP en Togo",
  "description": "El sitio web recopila datos de residentes de Togo sin presentar una notificación de tratamiento ante la IPDCP.",
  "severity": "critical",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 16, Article 50"
},
{
  "id": 897,
  "code": "TGOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Togo",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Togo sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 13"
},
{
  "id": 898,
  "code": "TGOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Togo",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Togo soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 28"
},
{
  "id": 899,
  "code": "TGOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Togo",
  "description": "El responsable transfiere datos de titulares de Togo a países extranjeros sin la autorización previa de la IPDCP.",
  "severity": "serious",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 35"
},
{
  "id": 900,
  "code": "TGOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Togo",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Togo sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Togo Law No. 2019-014 on Personal Data Protection, Article 25"
},
{
  "id": 901,
  "code": "BENPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la APDP en Benín",
  "description": "El sitio web recopila datos de residentes de Benín sin presentar una notificación de tratamiento ante la APDP.",
  "severity": "critical",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 390, Article 420"
},
{
  "id": 902,
  "code": "BENPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Benín",
  "description": "El sitio web trata datos personales sensibles (biometría, salud) de titulares en Benín sin obtener el consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 395"
},
{
  "id": 903,
  "code": "BENPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación en Benín",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Benín soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 410"
},
{
  "id": 904,
  "code": "BENPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Benín",
  "description": "El responsable transfiere datos de titulares de Benín a países extranjeros sin la autorización previa de la APDP.",
  "severity": "serious",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 415"
},
{
  "id": 905,
  "code": "BENPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Benín",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Benín sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Benin Digital Code 2018 (Loi No. 2017-20), Article 400"
},
{
  "id": 906,
  "code": "MLIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la APDP en Mali",
  "description": "El sitio web recopila datos de residentes de Mali sin presentar una notificación de tratamiento ante la APDP.",
  "severity": "critical",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 15, Article 40"
},
{
  "id": 907,
  "code": "MLIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Mali",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Mali sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 12"
},
{
  "id": 908,
  "code": "MLIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Mali",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Mali soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 27"
},
{
  "id": 909,
  "code": "MLIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Mali",
  "description": "El responsable transfiere datos de titulares de Mali a países extranjeros sin la autorización previa de la APDP.",
  "severity": "serious",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 32"
},
{
  "id": 910,
  "code": "MLIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Mali",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Mali sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Mali Law No. 2013-015 on Protection of Personal Data, Article 23"
},
{
  "id": 911,
  "code": "NERPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la HAPDP en Níger",
  "description": "El sitio web recopila datos de residentes de Níger sin presentar una notificación de tratamiento ante la HAPDP.",
  "severity": "critical",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 912,
  "code": "NERPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Níger",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Níger sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 12"
},
{
  "id": 913,
  "code": "NERPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Níger",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Níger soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 28"
},
{
  "id": 914,
  "code": "NERPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Níger",
  "description": "El responsable transfiere datos de titulares de Níger a países extranjeros sin la autorización previa de la HAPDP.",
  "severity": "serious",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 35"
},
{
  "id": 915,
  "code": "NERPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Níger",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Níger sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Niger Law No. 2019-10 on Personal Data Protection, Article 24"
},
{
  "id": 916,
  "code": "GABPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la CNPDCP en Gabón",
  "description": "El sitio web recopila datos de residentes de Gabón sin presentar una notificación de tratamiento ante la CNPDCP.",
  "severity": "critical",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 917,
  "code": "GABPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Gabón",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Gabón sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 12"
},
{
  "id": 918,
  "code": "GABPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Gabón",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Gabón soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 28"
},
{
  "id": 919,
  "code": "GABPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Gabón",
  "description": "El responsable transfiere datos de titulares de Gabón a países extranjeros sin la autorización previa de la CNPDCP.",
  "severity": "serious",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 35"
},
{
  "id": 920,
  "code": "GABPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Gabón",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Gabón sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Gabon Law No. 001/2011 on Personal Data Protection, Article 24"
},
{
  "id": 921,
  "code": "MDGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la CMIL en Madagascar",
  "description": "El sitio web recopila datos de residentes de Madagascar sin presentar una notificación de tratamiento ante la CMIL.",
  "severity": "critical",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 922,
  "code": "MDGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Madagascar",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Madagascar sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 12"
},
{
  "id": 923,
  "code": "MDGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Madagascar",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Madagascar soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 28"
},
{
  "id": 924,
  "code": "MDGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Madagascar",
  "description": "El responsable transfiere datos de titulares de Madagascar a países extranjeros sin la autorización previa de la CMIL.",
  "severity": "serious",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 35"
},
{
  "id": 925,
  "code": "MDGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Madagascar",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Madagascar sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Madagascar Law No. 2014-038 on Personal Data Protection, Article 24"
},
{
  "id": 926,
  "code": "CPVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la CNPD en Cabo Verde",
  "description": "El sitio web recopila datos de residentes de Cabo Verde sin presentar una notificación de tratamiento ante la CNPD.",
  "severity": "critical",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 927,
  "code": "CPVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Cabo Verde",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Cabo Verde sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 12"
},
{
  "id": 928,
  "code": "CPVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Cabo Verde",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Cabo Verde soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 28"
},
{
  "id": 929,
  "code": "CPVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Cabo Verde",
  "description": "El responsable transfiere datos de titulares de Cabo Verde a países extranjeros sin la autorización previa de la CNPD.",
  "severity": "serious",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 35"
},
{
  "id": 930,
  "code": "CPVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Cabo Verde",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Cabo Verde sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Cabo Verde Law No. 133/V/2001 on Personal Data Protection, Article 24"
},
{
  "id": 931,
  "code": "LSTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento en Lesoto",
  "description": "El sitio web recopila datos sensibles de residentes de Lesoto sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Lesotho Data Protection Act 2011, Sec. 15, Sec. 25"
},
{
  "id": 932,
  "code": "LSTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Lesoto",
  "description": "La base de datos almacena archivos de residentes de Lesoto sin emplear cifrado técnico o controles administrativos obligatorios.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 32"
},
{
  "id": 933,
  "code": "LSTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de divulgación sobre terceros destinatarios en aviso de Lesoto",
  "description": "La política de privacidad del sitio web no identifica a terceros destinatarios o servidores para datos de residentes de Lesoto.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 38"
},
{
  "id": 934,
  "code": "LSTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Lesoto",
  "description": "El sitio web envía correos publicitarios o cookies a titulares en Lesoto sin obtener consentimiento previo de aceptación.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 33"
},
{
  "id": 935,
  "code": "LSTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación en Lesoto",
  "description": "La política de privacidad del sitio web no proporciona a los titulares de Lesoto canales claros para solicitar la supresión o rectificación.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 29"
},
{
  "id": 936,
  "code": "COGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la CNIL en Congo",
  "description": "El sitio web recopila datos de residentes de Congo sin presentar una notificación de tratamiento ante la CNIL.",
  "severity": "critical",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 937,
  "code": "COGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Congo",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Congo sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 12"
},
{
  "id": 938,
  "code": "COGPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Congo",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Congo soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 28"
},
{
  "id": 939,
  "code": "COGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Congo",
  "description": "El responsable transfiere datos de titulares de Congo a países extranjeros sin la autorización previa de la CNIL.",
  "severity": "serious",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 35"
},
{
  "id": 940,
  "code": "COGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Congo",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Congo sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Congo Law No. 29-2019 on Personal Data Protection, Article 24"
},
{
  "id": 941,
  "code": "FIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Fiyi",
  "description": "El sitio web recopila datos de residentes de Fiyi sin establecer una base legal válida o consentimiento según la ley de Fiyi.",
  "severity": "critical",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 942,
  "code": "FIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Fiyi",
  "description": "El sitio web recopila datos sensibles de residentes en Fiyi sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 943,
  "code": "FIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Fiyi",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Fiyi.",
  "severity": "moderate",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 944,
  "code": "FIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Fiyi",
  "description": "El responsable transfiere datos de usuarios de Fiyi a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 945,
  "code": "FIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Fiyi",
  "description": "El sitio web no establece canales para que los titulares de Fiyi ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Fiji Constitution 2013, Section 14 (Right to Privacy)"
},
{
  "id": 946,
  "code": "PNGPD-001",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Tratamiento de datos personales sin base legal en Papúa Nueva Guinea",
  "description": "El sitio web recopila datos de residentes de PNG sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 947,
  "code": "PNGPD-002",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Falta de consentimiento explícito para datos sensibles en Papúa Nueva Guinea",
  "description": "El sitio web recopila datos sensibles de residentes en PNG sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 948,
  "code": "PNGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de PNG",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en PNG.",
  "severity": "moderate",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 949,
  "code": "PNGPD-004",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Transferencia transfronteriza no conforme desde Papúa Nueva Guinea",
  "description": "El responsable transfiere datos de usuarios de PNG a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 950,
  "code": "PNGPD-005",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en PNG",
  "description": "El sitio web no establece canales para que los titulares de PNG ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Papua New Guinea Constitution, Section 49 (Right to Privacy)"
},
{
  "id": 951,
  "code": "SMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en San Marino",
  "description": "El sitio web recopila datos sensibles de ciudadanos de San Marino sin el consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 6, Art. 83"
},
{
  "id": 952,
  "code": "SMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de designación de DPO bajo la ley de San Marino",
  "description": "El responsable no designa ni proporciona información de contacto del Delegado de Protección de Datos según las normas de San Marino.",
  "severity": "serious",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 37"
},
{
  "id": 953,
  "code": "SMRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Aviso de privacidad inadecuado bajo la ley de San Marino",
  "description": "El aviso de privacidad del sitio web no revela los plazos de retención o el derecho a reclamar ante la APD de San Marino.",
  "severity": "moderate",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 13"
},
{
  "id": 954,
  "code": "SMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde San Marino",
  "description": "El responsable transfiere datos de residentes de San Marino a terceros países sin adecuación o cláusulas autorizadas por la APD.",
  "severity": "serious",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 45"
},
{
  "id": 955,
  "code": "SMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en San Marino",
  "description": "El sitio web no proporciona a los residentes de San Marino métodos accesibles para ejercer sus derechos de acceso o supresión.",
  "severity": "moderate",
  "reference": "San Marino Law no. 171 on Personal Data Protection, Art. 15, Art. 17"
},
{
  "id": 956,
  "code": "GIBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sensibles sin consentimiento en Gibraltar",
  "description": "El sitio web trata datos personales sensibles de usuarios de Gibraltar sin obtener consentimiento explícito.",
  "severity": "critical",
  "reference": "Gibraltar Data Protection Act 2004, Sec. 2 (GDPR Art. 9)"
},
{
  "id": 957,
  "code": "GIBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de verificación de edad para consentimiento infantil en Gibraltar",
  "description": "El sitio web no implementa mecanismos de consentimiento parental para usuarios en Gibraltar menores de 13 años.",
  "severity": "serious",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 8)"
},
{
  "id": 958,
  "code": "GIBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación incompleta en el aviso de privacidad de Gibraltar",
  "description": "El aviso de privacidad del sitio web no revela los límites de retención o el derecho a reclamar ante la GRA de Gibraltar.",
  "severity": "moderate",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 13)"
},
{
  "id": 959,
  "code": "GIBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de protocolos de notificación de brechas de 72 horas en Gibraltar",
  "description": "El responsable del sitio web carece de procedimientos documentados para reportar incidentes a la GRA en un plazo de 72 horas.",
  "severity": "serious",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 33)"
},
{
  "id": 960,
  "code": "GIBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en Gibraltar",
  "description": "El sitio web no proporciona a los residentes de Gibraltar métodos accesibles para ejercer sus derechos de acceso o rectificación.",
  "severity": "moderate",
  "reference": "Gibraltar Data Protection Act 2004 (GDPR Art. 15, Art. 17)"
},
{
  "id": 961,
  "code": "JSYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento en Jersey",
  "description": "El sitio web recopila datos sensibles de residentes de Jersey sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Data Protection (Jersey) Law 2018, Schedule 2, Sec. 9"
},
{
  "id": 962,
  "code": "JSYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Verificación de edad incompleta para consentimiento infantil en Jersey",
  "description": "El sitio web no implementa mecanismos de consentimiento parental para usuarios en Jersey menores de 13 años.",
  "severity": "serious",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 10"
},
{
  "id": 963,
  "code": "JSYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Jersey",
  "description": "La política de privacidad del sitio web no revela los plazos de retención o el derecho a reclamar ante la JOIC de Jersey.",
  "severity": "moderate",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 12"
},
{
  "id": 964,
  "code": "JSYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de Inglaterra y Jersey de protocolos de reporte de brechas de 72 horas",
  "description": "El responsable del sitio web carece de procedimientos documentados para reportar incidentes a la JOIC de Jersey en 72 horas.",
  "severity": "serious",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 21"
},
{
  "id": 965,
  "code": "JSYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en Jersey",
  "description": "El sitio web no proporciona a los residentes de Jersey métodos accesibles para ejercer sus derechos de acceso o supresión.",
  "severity": "moderate",
  "reference": "Data Protection (Jersey) Law 2018, Sec. 28, Sec. 30"
},
{
  "id": 966,
  "code": "GGYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sensibles sin consentimiento en Guernsey",
  "description": "El sitio web recopila datos sensibles de residentes de Guernsey sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 9, Sec. 80"
},
{
  "id": 967,
  "code": "GGYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Verificación de edad incompleta para consentimiento infantil en Guernsey",
  "description": "El sitio web no implementa mecanismos de consentimiento parental para usuarios en Guernsey menores de 13 años.",
  "severity": "serious",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 10"
},
{
  "id": 968,
  "code": "GGYPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Guernsey",
  "description": "La política de privacidad del sitio web no revela los plazos de retención o el derecho a reclamar ante la ODPA de Guernsey.",
  "severity": "moderate",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 12"
},
{
  "id": 969,
  "code": "GGYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de protocolos de reporte de brechas de 72 horas en Guernsey",
  "description": "El responsable del sitio web carece de procedimientos documentados para reportar incidentes a la ODPA de Guernsey en 72 horas.",
  "severity": "serious",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 21"
},
{
  "id": 970,
  "code": "GGYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en Guernsey",
  "description": "El sitio web no proporciona a los residentes de Guernsey métodos accesibles para ejercer sus derechos de acceso o supresión.",
  "severity": "moderate",
  "reference": "Data Protection (Bailiwick of Guernsey) Law 2017, Sec. 28, Sec. 30"
},
{
  "id": 971,
  "code": "IOMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en la Isla de Man",
  "description": "El sitio web recopila datos sensibles de residentes de la Isla de Man sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 9)"
},
{
  "id": 972,
  "code": "IOMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Verificación de edad incompleta para consentimiento infantil en la Isla de Man",
  "description": "El sitio web no implementa mecanismos de consentimiento parental para usuarios en la Isla de Man menores de 13 años.",
  "severity": "serious",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 8)"
},
{
  "id": 973,
  "code": "IOMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de la Isla de Man",
  "description": "La política de privacidad del sitio web no revela los plazos de retención o el derecho a reclamar ante la IMIO de la Isla de Man.",
  "severity": "moderate",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 13)"
},
{
  "id": 974,
  "code": "IOMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de protocolos de reporte de brechas de 72 horas en la Isla de Man",
  "description": "El responsable del sitio web carece de procedimientos documentados para reportar incidentes a la IMIO de la Isla de Man en 72 horas.",
  "severity": "serious",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 33)"
},
{
  "id": 975,
  "code": "IOMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en la Isla de Man",
  "description": "El sitio web no proporciona a los residentes de la Isla de Man métodos accesibles para ejercer sus derechos de acceso o supresión.",
  "severity": "moderate",
  "reference": "Isle of Man Data Protection Act 2018 (GDPR Art. 15, Art. 17)"
},
{
  "id": 976,
  "code": "FROPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento para procesar datos sensibles en las Islas Feroe",
  "description": "El sitio web recopila registros sensibles de residentes de las Islas Feroe sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 9"
},
{
  "id": 977,
  "code": "FROPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Salvaguardas de seguridad de base de datos inadecuadas en las Islas Feroe",
  "description": "La base de datos del sitio web carece del cifrado y los controles de acceso exigidos para proteger los registros de usuarios en las Islas Feroe.",
  "severity": "serious",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 11"
},
{
  "id": 978,
  "code": "FROPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Aviso de privacidad inadecuado bajo la ley de las Islas Feroe",
  "description": "El aviso de privacidad no revela los plazos de retención o los derechos a reclamar ante la Datatilsynet de las Islas Feroe.",
  "severity": "moderate",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 21"
},
{
  "id": 979,
  "code": "FROPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no autorizada de datos de las Islas Feroe",
  "description": "El sitio web exporta datos de residentes de las Islas Feroe a países que carecen de protección adecuada sin la aprobación de la Datatilsynet.",
  "severity": "serious",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 28"
},
{
  "id": 980,
  "code": "FROPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en las Islas Feroe",
  "description": "El sitio web no proporciona a los residentes de las Islas Feroe métodos claros para acceder o rectificar registros.",
  "severity": "moderate",
  "reference": "Faroe Islands Act on Processing of Personal Data, Sec. 19"
},
{
  "id": 981,
  "code": "BMUPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de consentimiento explícito para datos sensibles bajo PIPA de Bermudas",
  "description": "El sitio web recopila datos sensibles de residentes de las Bermudas sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 6, Section 47"
},
{
  "id": 982,
  "code": "BMUPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de contactos del Oficial de Privacidad bajo la ley de Bermudas",
  "description": "La política de privacidad no identifica ni proporciona contactos del Oficial de Privacidad designado en Bermudas.",
  "severity": "serious",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 9"
},
{
  "id": 983,
  "code": "BMUPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de opción de exclusión para elaboración de perfiles en Bermudas",
  "description": "El sitio web no proporciona a los residentes de Bermudas opciones de exclusión para el tratamiento con fines de perfilado.",
  "severity": "moderate",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 15"
},
{
  "id": 984,
  "code": "BMUPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de contratos formales con encargados bajo la ley de Bermudas",
  "description": "El responsable transfiere datos de residentes de Bermudas a terceros encargados sin un contrato vinculante por escrito.",
  "severity": "serious",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 12"
},
{
  "id": 985,
  "code": "BMUPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme desde Bermudas",
  "description": "El responsable exporta datos de usuarios de Bermudas a países sin la protección adecuada y sin medidas equivalentes.",
  "severity": "moderate",
  "reference": "Bermuda Personal Information Protection Act 2016 (PIPA), Section 15"
},
{
  "id": 986,
  "code": "CYMPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Falta de consentimiento explícito para datos sensibles bajo la ley de Caimán",
  "description": "El sitio web recopila datos sensibles de residentes de las Islas Caimán sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 1)"
},
{
  "id": 987,
  "code": "CYMPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en las Islas Caimán",
  "description": "La base de datos almacena archivos de usuarios de las Islas Caimán sin emplear cifrado técnico o controles administrativos obligatorios.",
  "severity": "serious",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 11"
},
{
  "id": 988,
  "code": "CYMPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Plazos de solicitud de acceso de 30 días no conformes en las Islas Caimán",
  "description": "La política de privacidad del sitio web no documenta puntos de contacto o procedimientos para responder a solicitudes de acceso en 30 días.",
  "severity": "moderate",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 15"
},
{
  "id": 989,
  "code": "CYMPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme desde las Islas Caimán",
  "description": "El sitio web transfiere datos de usuarios de las Islas Caimán a países que carecen de protección jurídica comparable sin consentimiento.",
  "severity": "serious",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 8)"
},
{
  "id": 990,
  "code": "CYMPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Límites excesivos de retención de datos bajo la ley de Caimán",
  "description": "El sitio web conserva registros de usuarios de las Islas Caimán indefinidamente sin establecer límites específicos o ciclos de limpieza.",
  "severity": "moderate",
  "reference": "Cayman Islands Data Protection Act 2017, Sec. 6 (Principle 5)"
},
{
  "id": 991,
  "code": "LCAPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Santa Lucía",
  "description": "El sitio web recopila registros sensibles de titulares en Santa Lucía sin el consentimiento previo explícito por escrito.",
  "severity": "critical",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 15, Sec. 50"
},
{
  "id": 992,
  "code": "LCAPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos sin registro del responsable en Santa Lucía",
  "description": "El responsable del sitio web recopila datos de residentes de Santa Lucía sin registrarse ante el Comisionado.",
  "severity": "serious",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 10"
},
{
  "id": 993,
  "code": "LCAPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Santa Lucía",
  "description": "La base de datos almacena archivos de residentes de Santa Lucía sin emplear cifrado técnico o controles administrativos obligatorios.",
  "severity": "moderate",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 32"
},
{
  "id": 994,
  "code": "LCAPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ciclos de retención de datos no conformes en Santa Lucía",
  "description": "El sitio web conserva registros de usuarios de Santa Lucía más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 14"
},
{
  "id": 995,
  "code": "LCAPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme de datos de Santa Lucía",
  "description": "El responsable transfiere datos de residentes de Santa Lucía fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Saint Lucia Data Protection Act 2011, Sec. 47"
},
{
  "id": 996,
  "code": "KNAPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en San Cristóbal y Nieves",
  "description": "El sitio web recopila registros sensibles de titulares en San Cristóbal y Nieves sin el consentimiento previo escrito.",
  "severity": "critical",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 15, Sec. 50"
},
{
  "id": 997,
  "code": "KNAPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos sin registro del responsable en San Cristóbal y Nieves",
  "description": "El responsable del sitio web recopila datos de residentes de San Cristóbal y Nieves sin registrarse ante el Comisionado.",
  "severity": "serious",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 10"
},
{
  "id": 998,
  "code": "KNAPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en San Cristóbal y Nieves",
  "description": "La base de datos almacena archivos de residentes de San Cristóbal y Nieves sin emplear cifrado técnico o controles obligatorios.",
  "severity": "moderate",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 32"
},
{
  "id": 999,
  "code": "KNAPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ciclos de retención de datos no conformes en San Cristóbal y Nieves",
  "description": "El sitio web conserva registros de usuarios de San Cristóbal y Nieves más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 14"
},
{
  "id": 1000,
  "code": "KNAPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme de datos de San Cristóbal y Nieves",
  "description": "El responsable transfiere datos de residentes de San Cristóbal y Nieves fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Saint Kitts and Nevis Data Protection Act 2018, Sec. 47"
},
{
  "id": 1001,
  "code": "ATGPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Antigua y Barbuda",
  "description": "El sitio web recopila registros sensibles de titulares en Antigua y Barbuda sin el consentimiento previo escrito.",
  "severity": "critical",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 15, Sec. 50"
},
{
  "id": 1002,
  "code": "ATGPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos sin registro del responsable en Antigua y Barbuda",
  "description": "El responsable del sitio web recopila datos de residentes de Antigua y Barbuda sin registrarse ante el Comisionado.",
  "severity": "serious",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 10"
},
{
  "id": 1003,
  "code": "ATGPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Antigua y Barbuda",
  "description": "La base de datos almacena archivos de residentes de Antigua y Barbuda sin emplear cifrado técnico o controles obligatorios.",
  "severity": "moderate",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 32"
},
{
  "id": 1004,
  "code": "ATGPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ciclos de retención de datos no conformes en Antigua y Barbuda",
  "description": "El sitio web conserva registros de usuarios de Antigua y Barbuda más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 14"
},
{
  "id": 1005,
  "code": "ATGPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme de datos de Antigua y Barbuda",
  "description": "El responsable transfiere datos de residentes de Antigua y Barbuda fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Antigua and Barbuda Data Protection Act 2013, Sec. 47"
},
{
  "id": 1006,
  "code": "SYCPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sensibles sin consentimiento en Seychelles",
  "description": "El sitio web trata categorías sensibles de datos de residentes de Seychelles sin el consentimiento previo explícito.",
  "severity": "critical",
  "reference": "Seychelles Data Protection Act 2003, Sec. 10, Sec. 28"
},
{
  "id": 1007,
  "code": "SYCPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Salvaguardas de seguridad de base de datos inadecuadas en Seychelles",
  "description": "La base de datos del sitio web carece del cifrado y los controles de acceso exigidos para proteger los registros de usuarios en Seychelles.",
  "severity": "serious",
  "reference": "Seychelles Data Protection Act 2003, Sec. 11"
},
{
  "id": 1008,
  "code": "SYCPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Aviso de privacidad inadecuado bajo la ley de Seychelles",
  "description": "El aviso de privacidad no revela los plazos de retención o los derechos a reclamar ante el regulador de Seychelles.",
  "severity": "moderate",
  "reference": "Seychelles Data Protection Act 2003, Sec. 21"
},
{
  "id": 1009,
  "code": "SYCPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no autorizada de datos de Seychelles",
  "description": "El sitio web exporta datos de residentes de Seychelles a países que carecen de protección adecuada sin la aprobación del regulador.",
  "severity": "serious",
  "reference": "Seychelles Data Protection Act 2003, Sec. 28"
},
{
  "id": 1010,
  "code": "SYCPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados para los derechos de los titulares en Seychelles",
  "description": "El sitio web no proporciona a los residentes de Seychelles métodos claros para acceder o rectificar registros.",
  "severity": "moderate",
  "reference": "Seychelles Data Protection Act 2003, Sec. 19"
},
{
  "id": 1011,
  "code": "SWZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento en Esuatini",
  "description": "El sitio web recopila datos sensibles de residentes de Esuatini sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Eswatini Data Protection Act 2018, Sec. 15, Sec. 25"
},
{
  "id": 1012,
  "code": "SWZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Esuatini",
  "description": "La base de datos almacena archivos de residentes de Esuatini sin emplear cifrado técnico o controles administrativos obligatorios.",
  "severity": "serious",
  "reference": "Eswatini Data Protection Act 2018, Sec. 32"
},
{
  "id": 1013,
  "code": "SWZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de divulgación sobre terceros destinatarios en aviso de Esuatini",
  "description": "La política de privacidad del sitio web no identifica a terceros destinatarios o servidores para datos de residentes de Esuatini.",
  "severity": "moderate",
  "reference": "Eswatini Data Protection Act 2018, Sec. 38"
},
{
  "id": 1014,
  "code": "SWZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Esuatini",
  "description": "El sitio web envía correos publicitarios o cookies a titulares en Esuatini sin obtener consentimiento previo de aceptación.",
  "severity": "serious",
  "reference": "Eswatini Data Protection Act 2018, Sec. 33"
},
{
  "id": 1015,
  "code": "SWZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación en Esuatini",
  "description": "La política de privacidad del sitio web no proporciona a los titulares de Esuatini canales claros para solicitar la supresión o rectificación.",
  "severity": "moderate",
  "reference": "Eswatini Data Protection Act 2018, Sec. 29"
},
{
  "id": 1016,
  "code": "GINPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la APDP en Guinea",
  "description": "El sitio web recopila datos de residentes de Guinea sin presentar una notificación de tratamiento ante la APDP.",
  "severity": "critical",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1017,
  "code": "GINPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Guinea",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Guinea sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 12"
},
{
  "id": 1018,
  "code": "GINPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Guinea",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Guinea soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 28"
},
{
  "id": 1019,
  "code": "GINPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Guinea",
  "description": "El responsable transfiere datos de titulares de Guinea a países extranjeros sin la autorización previa de la APDP.",
  "severity": "serious",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 35"
},
{
  "id": 1020,
  "code": "GINPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Guinea",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Guinea sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Guinea Law No. 2016-037 on Personal Data Protection, Article 24"
},
{
  "id": 1021,
  "code": "BFAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la CIL en Burkina Faso",
  "description": "El sitio web recopila datos de residentes de Burkina Faso sin presentar una notificación de tratamiento ante la CIL.",
  "severity": "critical",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1022,
  "code": "BFAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Burkina Faso",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Burkina Faso sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 12"
},
{
  "id": 1023,
  "code": "BFAPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Burkina Faso",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Burkina Faso soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 28"
},
{
  "id": 1024,
  "code": "BFAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Burkina Faso",
  "description": "El responsable transfiere datos de titulares de Burkina Faso a países extranjeros sin la autorización previa de la CIL.",
  "severity": "serious",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 35"
},
{
  "id": 1025,
  "code": "BFAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Burkina Faso",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Burkina Faso sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Burkina Faso Law No. 001-2021/PR on Personal Data Protection, Article 24"
},
{
  "id": 1026,
  "code": "MRTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la APDP en Mauritania",
  "description": "El sitio web recopila datos de residentes de Mauritania sin presentar una notificación de tratamiento ante la APDP.",
  "severity": "critical",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1027,
  "code": "MRTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Mauritania",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Mauritania sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 12"
},
{
  "id": 1028,
  "code": "MRTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Mauritania",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Mauritania soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 28"
},
{
  "id": 1029,
  "code": "MRTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Mauritania",
  "description": "El responsable transfiere datos de titulares de Mauritania a países extranjeros sin la autorización previa de la APDP.",
  "severity": "serious",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 35"
},
{
  "id": 1030,
  "code": "MRTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Mauritania",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Mauritania sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Mauritania Law No. 2017-020 on Personal Data Protection, Article 24"
},
{
  "id": 1031,
  "code": "TCDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la ANAD en Chad",
  "description": "El sitio web recopila datos de residentes de Chad sin presentar una notificación de tratamiento ante la ANAD.",
  "severity": "critical",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1032,
  "code": "TCDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Chad",
  "description": "El sitio web trata datos personales sensibles (salud, biometría) de titulares en Chad sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 12"
},
{
  "id": 1033,
  "code": "TCDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Chad",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Chad soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 28"
},
{
  "id": 1034,
  "code": "TCDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Chad",
  "description": "El responsable transfiere datos de titulares de Chad a países extranjeros sin la autorización previa de la ANAD.",
  "severity": "serious",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 35"
},
{
  "id": 1035,
  "code": "TCDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Chad",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Chad sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Chad Law No. 007/PR/2015 on Personal Data Protection, Article 24"
},
{
  "id": 1036,
  "code": "MACPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles bajo la ley de Macao",
  "description": "El sitio web recopila datos sensibles de residentes de Macao sin consentimiento previo explícito por escrito o digital.",
  "severity": "critical",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 7, Article 24"
},
{
  "id": 1037,
  "code": "MACPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de registro del tratamiento ante la GPDP en Macao",
  "description": "El responsable del sitio web recopila datos de residentes de Macao sin presentar una notificación de registro ante la GPDP.",
  "severity": "serious",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 19"
},
{
  "id": 1038,
  "code": "MACPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación en Macao",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Macao soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 12"
},
{
  "id": 1039,
  "code": "MACPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Macao",
  "description": "El responsable transfiere datos de titulares de Macao a países extranjeros sin la autorización previa de la GPDP.",
  "severity": "serious",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 19, Article 20"
},
{
  "id": 1040,
  "code": "MACPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Macao",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Macao sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Macau Personal Data Protection Act (Law No. 8/2005), Article 12"
},
{
  "id": 1041,
  "code": "NPLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Nepal",
  "description": "El sitio web recopila datos de residentes de Nepal sin establecer una base legal válida o consentimiento según la ley de Nepal.",
  "severity": "critical",
  "reference": "Nepal Individual Privacy Act 2018, Section 4, Section 30"
},
{
  "id": 1042,
  "code": "NPLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Nepal",
  "description": "El sitio web recopila datos sensibles de residentes en Nepal sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Nepal Individual Privacy Act 2018, Section 10"
},
{
  "id": 1043,
  "code": "NPLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Nepal",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Nepal.",
  "severity": "moderate",
  "reference": "Nepal Individual Privacy Act 2018, Section 12"
},
{
  "id": 1044,
  "code": "NPLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Nepal",
  "description": "El responsable transfiere datos de usuarios de Nepal a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Nepal Individual Privacy Act 2018, Section 14"
},
{
  "id": 1045,
  "code": "NPLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Nepal",
  "description": "El sitio web no establece canales para que los titulares de Nepal ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Nepal Individual Privacy Act 2018, Section 15"
},
{
  "id": 1046,
  "code": "PAKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Pakistán",
  "description": "El sitio web recopila datos de residentes de Pakistán sin establecer una base legal válida o consentimiento según la ley de Pakistán.",
  "severity": "critical",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1047,
  "code": "PAKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Pakistán",
  "description": "El sitio web recopila datos sensibles de residentes en Pakistán sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1048,
  "code": "PAKPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Pakistán",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Pakistán.",
  "severity": "moderate",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1049,
  "code": "PAKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Pakistán",
  "description": "El responsable transfiere datos de usuarios de Pakistán a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1050,
  "code": "PAKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Pakistán",
  "description": "El sitio web no establece canales para que los titulares de Pakistán ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Pakistan Prevention of Electronic Crimes Act (PECA) 2016, Section 34"
},
{
  "id": 1051,
  "code": "DJIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la CNDP en Yibuti",
  "description": "El sitio web recopila datos de residentes de Yibuti sin presentar una notificación de tratamiento ante la CNDP.",
  "severity": "critical",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 15, Article 42"
},
{
  "id": 1052,
  "code": "DJIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Yibuti",
  "description": "El sitio web trata datos personales sensibles de titulares en Yibuti sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 12"
},
{
  "id": 1053,
  "code": "DJIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Yibuti",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Yibuti soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 28"
},
{
  "id": 1054,
  "code": "DJIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Yibuti",
  "description": "El responsable transfiere datos de titulares de Yibuti a países extranjeros sin la autorización previa de la CNDP.",
  "severity": "serious",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 35"
},
{
  "id": 1055,
  "code": "DJIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Yibuti",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Yibuti sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Djibouti Law No. 101/AN/15/7eme L on Personal Data Protection, Article 24"
},
{
  "id": 1056,
  "code": "LAOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Laos",
  "description": "El sitio web recopila datos de residentes de Laos sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 5, Sec. 21"
},
{
  "id": 1057,
  "code": "LAOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Laos",
  "description": "El sitio web recopila datos sensibles de residentes en Laos sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 10"
},
{
  "id": 1058,
  "code": "LAOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Laos",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Laos.",
  "severity": "moderate",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 12"
},
{
  "id": 1059,
  "code": "LAOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Laos",
  "description": "El responsable transfiere datos de usuarios de Laos a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 14"
},
{
  "id": 1060,
  "code": "LAOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Laos",
  "description": "El sitio web no establece canales para que los titulares de Laos ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Laos Law on Electronic Data Protection 2017, Sec. 15"
},
{
  "id": 1061,
  "code": "BTNDP-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Bután",
  "description": "El sitio web recopila datos de residentes de Bután sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 320"
},
{
  "id": 1062,
  "code": "BTNDP-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Bután",
  "description": "El sitio web recopila datos sensibles de residentes en Bután sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 321"
},
{
  "id": 1063,
  "code": "BTNDP-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Bután",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Bután.",
  "severity": "moderate",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 322"
},
{
  "id": 1064,
  "code": "BTNDP-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Bután",
  "description": "El responsable transfiere datos de usuarios de Bután a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 325"
},
{
  "id": 1065,
  "code": "BTNDP-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Bután",
  "description": "El sitio web no establece canales para que los titulares de Bután ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Bhutan Information, Communications and Media Act 2018, Sec. 327"
},
{
  "id": 1066,
  "code": "MMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Myanmar",
  "description": "El sitio web recopila datos de residentes de Myanmar sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 5"
},
{
  "id": 1067,
  "code": "MMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Myanmar",
  "description": "El sitio web recopila datos sensibles de residentes en Myanmar sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 6"
},
{
  "id": 1068,
  "code": "MMRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Myanmar",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Myanmar.",
  "severity": "moderate",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 7"
},
{
  "id": 1069,
  "code": "MMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Myanmar",
  "description": "El responsable transfiere datos de usuarios de Myanmar a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 8"
},
{
  "id": 1070,
  "code": "MMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Myanmar",
  "description": "El sitio web no establece canales para que los titulares de Myanmar ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Myanmar Law Protecting the Privacy and Security of Citizens, Sec. 9"
},
{
  "id": 1071,
  "code": "KHMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Camboya",
  "description": "El sitio web recopila datos de residentes de Camboya sin establecer una base legal válida o consentimiento según la ley de Camboya.",
  "severity": "critical",
  "reference": "Cambodia Civil Code, Article 7, Article 11"
},
{
  "id": 1072,
  "code": "KHMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Camboya",
  "description": "El sitio web recopila datos sensibles de residentes en Camboya sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Cambodia Civil Code, Article 8"
},
{
  "id": 1073,
  "code": "KHMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Camboya",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Camboya.",
  "severity": "moderate",
  "reference": "Cambodia Civil Code, Article 9"
},
{
  "id": 1074,
  "code": "KHMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Camboya",
  "description": "El responsable transfiere datos de usuarios de Camboya a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Cambodia Civil Code, Article 10"
},
{
  "id": 1075,
  "code": "KHMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Camboya",
  "description": "El sitio web no establece canales para que los titulares de Camboya ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Cambodia Civil Code, Article 12"
},
{
  "id": 1076,
  "code": "LBNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación en Líbano",
  "description": "El sitio web recopila datos de residentes de Líbano sin presentar una notificación de tratamiento ante el Ministerio.",
  "severity": "critical",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 85, Article 95"
},
{
  "id": 1077,
  "code": "LBNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Líbano",
  "description": "El sitio web trata datos personales sensibles de titulares en Líbano sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 88"
},
{
  "id": 1078,
  "code": "LBNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Líbano",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Líbano soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 92"
},
{
  "id": 1079,
  "code": "LBNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Líbano",
  "description": "El responsable transfiere datos de titulares de Líbano a países extranjeros sin la autorización previa del Ministerio.",
  "severity": "serious",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 94"
},
{
  "id": 1080,
  "code": "LBNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Líbano",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Líbano sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Lebanon Law No. 81/2018 on Electronic Transactions and Personal Data, Article 90"
},
{
  "id": 1081,
  "code": "YEMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Yemen",
  "description": "El sitio web recopila datos de residentes de Yemen sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 5"
},
{
  "id": 1082,
  "code": "YEMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Yemen",
  "description": "El sitio web recopila datos sensibles de residentes en Yemen sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 8"
},
{
  "id": 1083,
  "code": "YEMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Yemen",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Yemen.",
  "severity": "moderate",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 12"
},
{
  "id": 1084,
  "code": "YEMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Yemen",
  "description": "El responsable transfiere datos de usuarios de Yemen a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 14"
},
{
  "id": 1085,
  "code": "YEMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Yemen",
  "description": "El sitio web no establece canales para que los titulares de Yemen ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Yemen local rules / upcoming privacy laws, Sec. 15"
},
{
  "id": 1086,
  "code": "SYRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Siria",
  "description": "El sitio web recopila datos de residentes de Siria sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 5"
},
{
  "id": 1087,
  "code": "SYRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Siria",
  "description": "El sitio web recopila datos sensibles de residentes en Siria sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 8"
},
{
  "id": 1088,
  "code": "SYRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Siria",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Siria.",
  "severity": "moderate",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 12"
},
{
  "id": 1089,
  "code": "SYRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Siria",
  "description": "El responsable transfiere datos de usuarios de Siria a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 14"
},
{
  "id": 1090,
  "code": "SYRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Siria",
  "description": "El sitio web no establece canales para que los titulares de Siria ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Syria Law No. 17 on Cyber Crime / privacy, Sec. 15"
},
{
  "id": 1091,
  "code": "IRQPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Irak",
  "description": "El sitio web recopila datos de residentes de Irak sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 5"
},
{
  "id": 1092,
  "code": "IRQPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Irak",
  "description": "El sitio web recopila datos sensibles de residentes en Irak sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 8"
},
{
  "id": 1093,
  "code": "IRQPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Irak",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Irak.",
  "severity": "moderate",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 12"
},
{
  "id": 1094,
  "code": "IRQPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Irak",
  "description": "El responsable transfiere datos de usuarios de Irak a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 14"
},
{
  "id": 1095,
  "code": "IRQPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Irak",
  "description": "El sitio web no establece canales para que los titulares de Irak ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Iraq Constitution / local cybersecurity acts, Sec. 15"
},
{
  "id": 1096,
  "code": "MWIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Malaui",
  "description": "El sitio web recopila datos de residentes de Malaui sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 72, Sec. 80"
},
{
  "id": 1097,
  "code": "MWIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Malaui",
  "description": "El sitio web recopila datos sensibles de residentes en Malaui sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 73"
},
{
  "id": 1098,
  "code": "MWIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Malaui",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Malaui.",
  "severity": "moderate",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 74"
},
{
  "id": 1099,
  "code": "MWIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Malaui",
  "description": "El responsable transfiere datos de usuarios de Malaui a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 78"
},
{
  "id": 1100,
  "code": "MWIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Malaui",
  "description": "El sitio web no establece canales para que los titulares de Malaui ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Malawi Electronic Transactions and Cybersecurity Act 2016, Sec. 79"
},
{
  "id": 1101,
  "code": "MOZPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Mozambique",
  "description": "El sitio web recopila datos de residentes de Mozambique sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Mozambique Electronic Transactions Law, Sec. 15, Sec. 25"
},
{
  "id": 1102,
  "code": "MOZPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Mozambique",
  "description": "El sitio web recopila datos sensibles de residentes en Mozambique sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Mozambique Electronic Transactions Law, Sec. 16"
},
{
  "id": 1103,
  "code": "MOZPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Mozambique",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Mozambique.",
  "severity": "moderate",
  "reference": "Mozambique Electronic Transactions Law, Sec. 18"
},
{
  "id": 1104,
  "code": "MOZPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Mozambique",
  "description": "El responsable transfiere datos de usuarios de Mozambique a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Mozambique Electronic Transactions Law, Sec. 20"
},
{
  "id": 1105,
  "code": "MOZPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Mozambique",
  "description": "El sitio web no establece canales para que los titulares de Mozambique ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Mozambique Electronic Transactions Law, Sec. 22"
},
{
  "id": 1106,
  "code": "NAMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Namibia",
  "description": "El sitio web recopila datos de residentes de Namibia sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 15"
},
{
  "id": 1107,
  "code": "NAMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Namibia",
  "description": "El sitio web recopila datos sensibles de residentes en Namibia sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 18"
},
{
  "id": 1108,
  "code": "NAMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Namibia",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Namibia.",
  "severity": "moderate",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 21"
},
{
  "id": 1109,
  "code": "NAMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Namibia",
  "description": "El responsable transfiere datos de usuarios de Namibia a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 25"
},
{
  "id": 1110,
  "code": "NAMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Namibia",
  "description": "El sitio web no establece canales para que los titulares de Namibia ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Namibia local rules / upcoming FIP / Constitution, Sec. 28"
},
{
  "id": 1111,
  "code": "GRNPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Granada",
  "description": "El sitio web recopila registros sensibles de titulares en Granada sin el consentimiento previo explícito por escrito.",
  "severity": "critical",
  "reference": "Grenada Data Protection Act 2014, Sec. 15, Sec. 50"
},
{
  "id": 1112,
  "code": "GRNPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos sin registro del responsable en Granada",
  "description": "El responsable del sitio web recopila datos de residentes de Granada sin registrarse ante el Comisionado.",
  "severity": "serious",
  "reference": "Grenada Data Protection Act 2014, Sec. 10"
},
{
  "id": 1113,
  "code": "GRNPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Granada",
  "description": "La base de datos almacena archivos de residentes de Granada sin emplear cifrado técnico o controles obligatorios.",
  "severity": "moderate",
  "reference": "Grenada Data Protection Act 2014, Sec. 32"
},
{
  "id": 1114,
  "code": "GRNPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ciclos de retención de datos no conformes en Granada",
  "description": "El sitio web conserva registros de usuarios de Granada más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Grenada Data Protection Act 2014, Sec. 14"
},
{
  "id": 1115,
  "code": "GRNPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme de datos de Granada",
  "description": "El responsable transfiere datos de residentes de Granada fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Grenada Data Protection Act 2014, Sec. 47"
},
{
  "id": 1116,
  "code": "VCTPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos personales sensibles sin consentimiento en San Vicente y las Granadinas",
  "description": "El sitio web recopila registros sensibles de titulares en San Vicente y las Granadinas sin el consentimiento previo escrito.",
  "severity": "critical",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 15, Sec. 50"
},
{
  "id": 1117,
  "code": "VCTPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos sin registro del responsable en San Vicente y las Granadinas",
  "description": "El responsable del sitio web recopila datos de residentes de San Vicente y las Granadinas sin registrarse ante el Comisionado.",
  "severity": "serious",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 10"
},
{
  "id": 1118,
  "code": "VCTPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en San Vicente y las Granadinas",
  "description": "La base de datos almacena archivos de residentes de San Vicente y las Granadinas sin emplear cifrado técnico o controles obligatorios.",
  "severity": "moderate",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 32"
},
{
  "id": 1119,
  "code": "VCTPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ciclos de retención de datos no conformes en San Vicente y las Granadinas",
  "description": "El sitio web conserva registros de usuarios de San Vicente y las Granadinas más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 14"
},
{
  "id": 1120,
  "code": "VCTPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme de datos de San Vicente y las Granadinas",
  "description": "El responsable transfiere datos de residentes de San Vicente y las Granadinas fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Saint Vincent and the Grenadines Electronic Transactions Act, Sec. 47"
},
{
  "id": 1121,
  "code": "SAMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Samoa",
  "description": "El sitio web recopila datos de residentes de Samoa sin establecer una base legal válida o consentimiento según la ley de Samoa.",
  "severity": "critical",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 5"
},
{
  "id": 1122,
  "code": "SAMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Samoa",
  "description": "El sitio web recopila datos sensibles de residentes en Samoa sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 8"
},
{
  "id": 1123,
  "code": "SAMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Samoa",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Samoa.",
  "severity": "moderate",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 12"
},
{
  "id": 1124,
  "code": "SAMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Samoa",
  "description": "El responsable transfiere datos de usuarios de Samoa a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 14"
},
{
  "id": 1125,
  "code": "SAMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Samoa",
  "description": "El sitio web no establece canales para que los titulares de Samoa ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Samoa local telecom / privacy guidelines, Sec. 15"
},
{
  "id": 1126,
  "code": "TONPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Tonga",
  "description": "El sitio web recopila datos de residentes de Tonga sin establecer una base legal válida o consentimiento según la ley de Tonga.",
  "severity": "critical",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 5"
},
{
  "id": 1127,
  "code": "TONPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Tonga",
  "description": "El sitio web recopila datos sensibles de residentes en Tonga sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 8"
},
{
  "id": 1128,
  "code": "TONPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Tonga",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Tonga.",
  "severity": "moderate",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 12"
},
{
  "id": 1129,
  "code": "TONPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Tonga",
  "description": "El responsable transfiere datos de usuarios de Tonga a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 14"
},
{
  "id": 1130,
  "code": "TONPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Tonga",
  "description": "El sitio web no establece canales para que los titulares de Tonga ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Tonga local telecom / electronic transactions laws, Sec. 15"
},
{
  "id": 1131,
  "code": "VUTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Vanuatu",
  "description": "El sitio web recopila datos de residentes de Vanuatu sin establecer una base legal válida o consentimiento según la ley de Vanuatu.",
  "severity": "critical",
  "reference": "Vanuatu local electronic transactions laws, Sec. 5"
},
{
  "id": 1132,
  "code": "VUTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Vanuatu",
  "description": "El sitio web recopila datos sensibles de residentes en Vanuatu sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Vanuatu local electronic transactions laws, Sec. 8"
},
{
  "id": 1133,
  "code": "VUTPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Vanuatu",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Vanuatu.",
  "severity": "moderate",
  "reference": "Vanuatu local electronic transactions laws, Sec. 12"
},
{
  "id": 1134,
  "code": "VUTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Vanuatu",
  "description": "El responsable transfiere datos de usuarios de Vanuatu a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Vanuatu local electronic transactions laws, Sec. 14"
},
{
  "id": 1135,
  "code": "VUTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Vanuatu",
  "description": "El sitio web no establece canales para que los titulares de Vanuatu ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Vanuatu local electronic transactions laws, Sec. 15"
},
{
  "id": 1136,
  "code": "GUYPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos personales sensibles sin consentimiento en Guyana",
  "description": "El sitio web recopila registros sensibles de titulares en Guyana sin el consentimiento previo por escrito.",
  "severity": "critical",
  "reference": "Guyana Data Protection Act 2024, Sec. 15, Sec. 50"
},
{
  "id": 1137,
  "code": "GUYPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos sin registro del responsable en Guyana",
  "description": "El responsable del sitio web recopila datos de residentes de Guyana sin registrarse ante el Comisionado.",
  "severity": "serious",
  "reference": "Guyana Data Protection Act 2024, Sec. 10"
},
{
  "id": 1138,
  "code": "GUYPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Guyana",
  "description": "La base de datos almacena archivos de residentes de Guyana sin emplear cifrado técnico o controles obligatorios.",
  "severity": "moderate",
  "reference": "Guyana Data Protection Act 2024, Sec. 32"
},
{
  "id": 1139,
  "code": "GUYPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ciclos de retención de datos no conformes en Guyana",
  "description": "El sitio web conserva registros de usuarios de Guyana más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Guyana Data Protection Act 2024, Sec. 14"
},
{
  "id": 1140,
  "code": "GUYPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme de datos de Guyana",
  "description": "El responsable transfiere datos de residentes de Guyana fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Guyana Data Protection Act 2024, Sec. 47"
},
{
  "id": 1141,
  "code": "BLZPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos personales sensibles sin consentimiento en Belice",
  "description": "El sitio web recopila registros sensibles de titulares en Belice sin el consentimiento previo por escrito.",
  "severity": "critical",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 15, Sec. 50"
},
{
  "id": 1142,
  "code": "BLZPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos sin registro del responsable en Belice",
  "description": "El responsable del sitio web recopila datos de residentes de Belice sin registrarse ante el Comisionado.",
  "severity": "serious",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 10"
},
{
  "id": 1143,
  "code": "BLZPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Belice",
  "description": "La base de datos almacena archivos de residentes de Belice sin emplear cifrado técnico o controles obligatorios.",
  "severity": "moderate",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 32"
},
{
  "id": 1144,
  "code": "BLZPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ciclos de retención de datos no conformes en Belice",
  "description": "El sitio web conserva registros de usuarios de Belice más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 14"
},
{
  "id": 1145,
  "code": "BLZPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme de datos de Belice",
  "description": "El responsable transfiere datos de residentes de Belice fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Belize local laws / draft Data Protection Act, Sec. 47"
},
{
  "id": 1146,
  "code": "SURPD-001",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Surinam",
  "description": "El sitio web recopila registros sensibles de titulares en Surinam sin el consentimiento previo por escrito.",
  "severity": "critical",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 15, Sec. 50"
},
{
  "id": 1147,
  "code": "SURPD-002",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Tratamiento de datos sin registro del responsable en Surinam",
  "description": "El responsable del sitio web recopila datos de residentes de Surinam sin registrarse ante el Comisionado.",
  "severity": "serious",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 10"
},
{
  "id": 1148,
  "code": "SURPD-003",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Surinam",
  "description": "La base de datos almacena archivos de residentes de Surinam sin emplear cifrado técnico o controles obligatorios.",
  "severity": "moderate",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 32"
},
{
  "id": 1149,
  "code": "SURPD-004",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Ciclos de retención de datos no conformes en Surinam",
  "description": "El sitio web conserva registros de usuarios de Surinam más tiempo del necesario para el fin previsto sin protocolos de supresión.",
  "severity": "serious",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 14"
},
{
  "id": 1150,
  "code": "SURPD-005",
  "evidenceKind": "observable",
  "category": "CCPA / CPRA",
  "title": "Transferencia transfronteriza no conforme de datos de Surinam",
  "description": "El responsable transfiere datos de residentes de Surinam fuera del país sin garantizar niveles de protección adecuados.",
  "severity": "moderate",
  "reference": "Suriname local laws / draft Data Protection Act, Sec. 47"
},
{
  "id": 1151,
  "code": "BDIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la autoridad en Burundi",
  "description": "El sitio web recopila datos de residentes de Burundi sin presentar una notificación ante la autoridad reguladora.",
  "severity": "critical",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 15, Article 42"
},
{
  "id": 1152,
  "code": "BDIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Burundi",
  "description": "El sitio web trata datos personales sensibles de titulares en Burundi sin consentimiento previo explícito.",
  "severity": "serious",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 12"
},
{
  "id": 1153,
  "code": "BDIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de supresión y rectificación bajo la ley de Burundi",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Burundi soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 28"
},
{
  "id": 1154,
  "code": "BDIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Burundi",
  "description": "El responsable transfiere datos de titulares de Burundi a países extranjeros sin la autorización previa de la autoridad.",
  "severity": "serious",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 35"
},
{
  "id": 1155,
  "code": "BDIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Comunicaciones de marketing directo no conformes en Burundi",
  "description": "El sitio web envía materiales de marketing directo o cookies a usuarios de Burundi sin obtener consentimiento previo de aceptación.",
  "severity": "moderate",
  "reference": "Burundi Law No. 1/01 of 2018 on Protection of Personal Data, Article 24"
},
{
  "id": 1156,
  "code": "ERIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Eritrea",
  "description": "El sitio web recopila datos de residentes de Eritrea sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 5, Sec. 21"
},
{
  "id": 1157,
  "code": "ERIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Eritrea",
  "description": "El sitio web recopila datos sensibles de residentes en Eritrea sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 10"
},
{
  "id": 1158,
  "code": "ERIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Eritrea",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Eritrea.",
  "severity": "moderate",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 12"
},
{
  "id": 1159,
  "code": "ERIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Eritrea",
  "description": "El responsable transfiere datos de usuarios de Eritrea a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 14"
},
{
  "id": 1160,
  "code": "ERIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Eritrea",
  "description": "El sitio web no establece canales para que los titulares de Eritrea ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Eritrean Civil Code / Cybersecurity directives, Sec. 15"
},
{
  "id": 1161,
  "code": "SOMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Somalia",
  "description": "El sitio web recopila datos de residentes de Somalia sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 5"
},
{
  "id": 1162,
  "code": "SOMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Somalia",
  "description": "El sitio web recopila datos sensibles de residentes en Somalia sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 8"
},
{
  "id": 1163,
  "code": "SOMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Somalia",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Somalia.",
  "severity": "moderate",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 12"
},
{
  "id": 1164,
  "code": "SOMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Somalia",
  "description": "El responsable transfiere datos de usuarios de Somalia a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 14"
},
{
  "id": 1165,
  "code": "SOMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Somalia",
  "description": "El sitio web no establece canales para que los titulares de Somalia ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Somali Communications Act / draft Data Protection Law, Sec. 15"
},
{
  "id": 1166,
  "code": "SDNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Sudán",
  "description": "El sitio web recopila datos de residentes de Sudán sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 5"
},
{
  "id": 1167,
  "code": "SDNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Sudán",
  "description": "El sitio web recopila datos sensibles de residentes en Sudán sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 8"
},
{
  "id": 1168,
  "code": "SDNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Sudán",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Sudán.",
  "severity": "moderate",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 12"
},
{
  "id": 1169,
  "code": "SDNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Sudán",
  "description": "El responsable transfiere datos de usuarios de Sudán a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 14"
},
{
  "id": 1170,
  "code": "SDNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Sudán",
  "description": "El sitio web no establece canales para que los titulares de Sudán ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Sudanese Cybercrime Law / draft Data Protection rules, Sec. 15"
},
{
  "id": 1171,
  "code": "SSDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Sudán del Sur",
  "description": "El sitio web recopila datos de residentes de Sudán del Sur sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 5"
},
{
  "id": 1172,
  "code": "SSDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Sudán del Sur",
  "description": "El sitio web recopila datos sensibles de residentes en Sudán del Sur sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 8"
},
{
  "id": 1173,
  "code": "SSDPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Sudán del Sur",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Sudán del Sur.",
  "severity": "moderate",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 12"
},
{
  "id": 1174,
  "code": "SSDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Sudán del Sur",
  "description": "El responsable transfiere datos de usuarios de Sudán del Sur a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 14"
},
{
  "id": 1175,
  "code": "SSDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Sudán del Sur",
  "description": "El sitio web no establece canales para que los titulares de Sudán del Sur ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "South Sudan National Communications Act / draft Data Protection Act, Sec. 15"
},
{
  "id": 1176,
  "code": "GNQPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin notificación a la autoridad en Guinea Ecuatorial",
  "description": "El sitio web recopila datos de residentes de Guinea Ecuatorial sin presentar una notificación ante la autoridad reguladora.",
  "severity": "critical",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 15"
},
{
  "id": 1177,
  "code": "GNQPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Guinea Ecuatorial",
  "description": "El sitio web recopila datos sensibles de residentes en Guinea Ecuatorial sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 12"
},
{
  "id": 1178,
  "code": "GNQPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Guinea Ecuatorial",
  "description": "La política de privacidad del sitio web no documenta rutas de contacto para que los residentes de Guinea Ecuatorial soliciten la supresión de datos.",
  "severity": "moderate",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 28"
},
{
  "id": 1179,
  "code": "GNQPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Guinea Ecuatorial",
  "description": "El responsable transfiere datos de usuarios de Guinea Ecuatorial a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 35"
},
{
  "id": 1180,
  "code": "GNQPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Canales inadecuados de respuesta a los derechos de los titulares en Guinea Ecuatorial",
  "description": "El sitio web no establece canales para que los titulares de Guinea Ecuatorial ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Equatorial Guinea Law No. 1/2016 on Cybersecurity and Data Protection, Article 24"
},
{
  "id": 1181,
  "code": "CAFPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en la República Centroafricana",
  "description": "El sitio web recopila datos de residentes de la República Centroafricana sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 5"
},
{
  "id": 1182,
  "code": "CAFPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en la República Centroafricana",
  "description": "El sitio web recopila datos sensibles de residentes en la República Centroafricana sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 8"
},
{
  "id": 1183,
  "code": "CAFPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de la República Centroafricana",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en la República Centroafricana.",
  "severity": "moderate",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 12"
},
{
  "id": 1184,
  "code": "CAFPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde la República Centroafricana",
  "description": "El responsable transfiere datos de usuarios de la República Centroafricana a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 14"
},
{
  "id": 1185,
  "code": "CAFPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en la República Centroafricana",
  "description": "El sitio web no establece canales para que los titulares de la República Centroafricana ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "CAR draft Personal Data Protection Law / Telecom rules, Sec. 15"
},
{
  "id": 1186,
  "code": "SLEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Sierra Leona",
  "description": "El sitio web recopila datos de residentes de Sierra Leona sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 5"
},
{
  "id": 1187,
  "code": "SLEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Sierra Leona",
  "description": "El sitio web recopila datos sensibles de residentes en Sierra Leona sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 8"
},
{
  "id": 1188,
  "code": "SLEPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Sierra Leona",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Sierra Leona.",
  "severity": "moderate",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 12"
},
{
  "id": 1189,
  "code": "SLEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Sierra Leona",
  "description": "El responsable transfiere datos de usuarios de Sierra Leona a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 14"
},
{
  "id": 1190,
  "code": "SLEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Sierra Leona",
  "description": "El sitio web no establece canales para que los titulares de Sierra Leona ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Sierra Leone draft Data Protection Act / National Cybersecurity Law, Sec. 15"
},
{
  "id": 1191,
  "code": "LBRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Liberia",
  "description": "El sitio web recopila datos de residentes de Liberia sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 5"
},
{
  "id": 1192,
  "code": "LBRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Liberia",
  "description": "El sitio web recopila datos sensibles de residentes en Liberia sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 8"
},
{
  "id": 1193,
  "code": "LBRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Liberia",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Liberia.",
  "severity": "moderate",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 12"
},
{
  "id": 1194,
  "code": "LBRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Liberia",
  "description": "El responsable transfiere datos de usuarios de Liberia a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 14"
},
{
  "id": 1195,
  "code": "LBRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Liberia",
  "description": "El sitio web no establece canales para que los titulares de Liberia ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Liberian draft Data Protection Act / Telecommunications Act, Sec. 15"
},
{
  "id": 1196,
  "code": "GMBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Gambia",
  "description": "El sitio web recopila datos de residentes de Gambia sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1197,
  "code": "GMBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Gambia",
  "description": "El sitio web recopila datos sensibles de residentes en Gambia sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1198,
  "code": "GMBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Gambia",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Gambia.",
  "severity": "moderate",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1199,
  "code": "GMBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Gambia",
  "description": "El responsable transfiere datos de usuarios de Gambia a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1200,
  "code": "GMBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Gambia",
  "description": "El sitio web no establece canales para que los titulares de Gambia ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Gambian Information and Communications Act 2009 / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1201,
  "code": "GWIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Guinea-Bisáu",
  "description": "El sitio web recopila datos de residentes de Guinea-Bisáu sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 5"
},
{
  "id": 1202,
  "code": "GWIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Guinea-Bisáu",
  "description": "El sitio web recopila datos sensibles de residentes en Guinea-Bisáu sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 8"
},
{
  "id": 1203,
  "code": "GWIPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Guinea-Bisáu",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Guinea-Bisáu.",
  "severity": "moderate",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 12"
},
{
  "id": 1204,
  "code": "GWIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Guinea-Bisáu",
  "description": "El responsable transfiere datos de usuarios de Guinea-Bisáu a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 14"
},
{
  "id": 1205,
  "code": "GWIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Guinea-Bisáu",
  "description": "El sitio web no establece canales para que los titulares de Guinea-Bisáu ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Guinea-Bissau Civil Code / draft Personal Data Protection Law, Sec. 15"
},
{
  "id": 1206,
  "code": "LSOPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Lesoto",
  "description": "El sitio web recopila datos de residentes de Lesoto sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Lesotho Data Protection Act 2011, Sec. 5, Sec. 21"
},
{
  "id": 1207,
  "code": "LSOPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Lesoto",
  "description": "El sitio web recopila datos sensibles de residentes en Lesoto sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 10"
},
{
  "id": 1208,
  "code": "LSOPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Lesoto",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Lesoto.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 12"
},
{
  "id": 1209,
  "code": "LSOPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Lesoto",
  "description": "El responsable transfiere datos de usuarios de Lesoto a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Lesotho Data Protection Act 2011, Sec. 14"
},
{
  "id": 1210,
  "code": "LSOPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Lesoto",
  "description": "El sitio web no establece canales para que los titulares de Lesoto ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Lesotho Data Protection Act 2011, Sec. 15"
},
{
  "id": 1211,
  "code": "TLSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Timor Oriental",
  "description": "El sitio web recopila datos de residentes de Timor Oriental sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 5"
},
{
  "id": 1212,
  "code": "TLSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Timor Oriental",
  "description": "El sitio web recopila datos sensibles de residentes en Timor Oriental sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 8"
},
{
  "id": 1213,
  "code": "TLSPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Timor Oriental",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Timor Oriental.",
  "severity": "moderate",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 12"
},
{
  "id": 1214,
  "code": "TLSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Timor Oriental",
  "description": "El responsable transfiere datos de usuarios de Timor Oriental a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 14"
},
{
  "id": 1215,
  "code": "TLSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Timor Oriental",
  "description": "El sitio web no establece canales para que los titulares de Timor Oriental ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Timor-Leste Civil Code / Cybersecurity guidelines, Sec. 15"
},
{
  "id": 1216,
  "code": "MDVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Maldivas",
  "description": "El sitio web recopila datos de residentes de Maldivas sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1217,
  "code": "MDVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Maldivas",
  "description": "El sitio web recopila datos sensibles de residentes en Maldivas sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1218,
  "code": "MDVPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Maldivas",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Maldivas.",
  "severity": "moderate",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1219,
  "code": "MDVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Maldivas",
  "description": "El responsable transfiere datos de usuarios de Maldivas a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1220,
  "code": "MDVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Maldivas",
  "description": "El sitio web no establece canales para que los titulares de Maldivas ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Maldives local regulations / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1221,
  "code": "BRNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Brunéi",
  "description": "El sitio web recopila datos de residentes de Brunéi sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 5"
},
{
  "id": 1222,
  "code": "BRNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Brunéi",
  "description": "El sitio web recopila datos sensibles de residentes en Brunéi sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 8"
},
{
  "id": 1223,
  "code": "BRNPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Brunéi",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Brunéi.",
  "severity": "moderate",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 12"
},
{
  "id": 1224,
  "code": "BRNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Brunéi",
  "description": "El responsable transfiere datos de usuarios de Brunéi a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 14"
},
{
  "id": 1225,
  "code": "BRNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Brunéi",
  "description": "El sitio web no establece canales para que los titulares de Brunéi ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Brunei local guidelines / Cybersecurity directives, Sec. 15"
},
{
  "id": 1226,
  "code": "SLBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Islas Salomón",
  "description": "El sitio web recopila datos de residentes de Islas Salomón sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 5"
},
{
  "id": 1227,
  "code": "SLBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Islas Salomón",
  "description": "El sitio web recopila datos sensibles de residentes en Islas Salomón sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 8"
},
{
  "id": 1228,
  "code": "SLBPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Islas Salomón",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Islas Salomón.",
  "severity": "moderate",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 12"
},
{
  "id": 1229,
  "code": "SLBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Islas Salomón",
  "description": "El responsable transfiere datos de usuarios de Islas Salomón a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 14"
},
{
  "id": 1230,
  "code": "SLBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Islas Salomón",
  "description": "El sitio web no establece canales para que los titulares de Islas Salomón ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Solomon Islands local rules / Cybersecurity guidelines, Sec. 15"
},
{
  "id": 1231,
  "code": "FSMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Micronesia",
  "description": "El sitio web recopila datos de residentes de Micronesia sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 5"
},
{
  "id": 1232,
  "code": "FSMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Micronesia",
  "description": "El sitio web recopila datos sensibles de residentes en Micronesia sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 8"
},
{
  "id": 1233,
  "code": "FSMPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Micronesia",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Micronesia.",
  "severity": "moderate",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 12"
},
{
  "id": 1234,
  "code": "FSMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Micronesia",
  "description": "El responsable transfiere datos de usuarios de Micronesia a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 14"
},
{
  "id": 1235,
  "code": "FSMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Micronesia",
  "description": "El sitio web no establece canales para que los titulares de Micronesia ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Micronesia draft Personal Data Protection Bill, Sec. 15"
},
{
  "id": 1236,
  "code": "MHLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Islas Marshall",
  "description": "El sitio web recopila datos de residentes de Islas Marshall sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 5"
},
{
  "id": 1237,
  "code": "MHLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Islas Marshall",
  "description": "El sitio web recopila datos sensibles de residentes en Islas Marshall sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 8"
},
{
  "id": 1238,
  "code": "MHLPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Islas Marshall",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Islas Marshall.",
  "severity": "moderate",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 12"
},
{
  "id": 1239,
  "code": "MHLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Islas Marshall",
  "description": "El responsable transfiere datos de usuarios de Islas Marshall a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 14"
},
{
  "id": 1240,
  "code": "MHLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Islas Marshall",
  "description": "El sitio web no establece canales para que los titulares de Islas Marshall ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Marshall Islands local guidelines / draft Data Protection Bill, Sec. 15"
},
{
  "id": 1241,
  "code": "PLWPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Palaos",
  "description": "El sitio web recopila datos de residentes de Palaos sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 5"
},
{
  "id": 1242,
  "code": "PLWPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Palaos",
  "description": "El sitio web recopila datos sensibles de residentes en Palaos sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 8"
},
{
  "id": 1243,
  "code": "PLWPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Palaos",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Palaos.",
  "severity": "moderate",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 12"
},
{
  "id": 1244,
  "code": "PLWPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Palaos",
  "description": "El responsable transfiere datos de usuarios de Palaos a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 14"
},
{
  "id": 1245,
  "code": "PLWPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Palaos",
  "description": "El sitio web no establece canales para que los titulares de Palaos ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Palau draft Personal Data Protection Bill, Sec. 15"
},
{
  "id": 1246,
  "code": "KIRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sin base legal en Kiribati",
  "description": "El sitio web recopila datos de residentes de Kiribati sin establecer una base legal válida o consentimiento según la ley local.",
  "severity": "critical",
  "reference": "Kiribati draft Data Protection Act, Sec. 5"
},
{
  "id": 1247,
  "code": "KIRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Falta de consentimiento explícito para datos sensibles en Kiribati",
  "description": "El sitio web recopila datos sensibles de residentes en Kiribati sin consentimiento previo explícito por escrito o digital.",
  "severity": "serious",
  "reference": "Kiribati draft Data Protection Act, Sec. 8"
},
{
  "id": 1248,
  "code": "KIRPD-003",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Divulgación inadecuada en el aviso de privacidad bajo la ley de Kiribati",
  "description": "La política de privacidad no detalla los fines del tratamiento, los límites de retención o los contactos en Kiribati.",
  "severity": "moderate",
  "reference": "Kiribati draft Data Protection Act, Sec. 12"
},
{
  "id": 1249,
  "code": "KIRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme desde Kiribati",
  "description": "El responsable transfiere datos de usuarios de Kiribati a países externos sin garantizar la adecuación o la protección comparable.",
  "severity": "serious",
  "reference": "Kiribati draft Data Protection Act, Sec. 14"
},
{
  "id": 1250,
  "code": "KIRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Métodos inadecuados de respuesta a los derechos de los titulares en Kiribati",
  "description": "El sitio web no establece canales para que los titulares de Kiribati ejerzan sus derechos de acceso, rectificación o supresión.",
  "severity": "moderate",
  "reference": "Kiribati draft Data Protection Act, Sec. 15"
},
{
  "id": 1251,
  "code": "CHNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en China",
  "description": "El sitio web recopila registros sensibles de titulares en China sin el consentimiento previo por escrito exigido por la Ley de Protección de Información Personal (PIPL).",
  "severity": "critical",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1252,
  "code": "CHNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Administración del Ciberespacio de China (CAC) en China",
  "description": "El responsable del sitio web recopila datos de residentes de China sin presentar una notificación o registrarse ante la Administración del Ciberespacio de China (CAC) bajo la Ley de Protección de Información Personal (PIPL).",
  "severity": "serious",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1253,
  "code": "CHNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en China",
  "description": "La base de datos almacena o procesa archivos de residentes de China sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Información Personal (PIPL).",
  "severity": "moderate",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1254,
  "code": "CHNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en China",
  "description": "El sitio web conserva registros de usuarios de China más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Información Personal (PIPL).",
  "severity": "serious",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1255,
  "code": "CHNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de China",
  "description": "El responsable transfiere datos de residentes de China fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Información Personal (PIPL).",
  "severity": "moderate",
  "reference": "Personal Information Protection Law (PIPL)"
},
{
  "id": 1256,
  "code": "RUSPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Rusia",
  "description": "El sitio web recopila registros sensibles de titulares en Rusia sin el consentimiento previo por escrito exigido por la Ley Federal N° 152-FZ de Datos Personales.",
  "severity": "critical",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1257,
  "code": "RUSPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Roskomnadzor en Rusia",
  "description": "El responsable del sitio web recopila datos de residentes de Rusia sin presentar una notificación o registrarse ante la Roskomnadzor bajo la Ley Federal N° 152-FZ de Datos Personales.",
  "severity": "serious",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1258,
  "code": "RUSPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Rusia",
  "description": "La base de datos almacena o procesa archivos de residentes de Rusia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley Federal N° 152-FZ de Datos Personales.",
  "severity": "moderate",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1259,
  "code": "RUSPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Rusia",
  "description": "El sitio web conserva registros de usuarios de Rusia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley Federal N° 152-FZ de Datos Personales.",
  "severity": "serious",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1260,
  "code": "RUSPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Rusia",
  "description": "El responsable transfiere datos de residentes de Rusia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley Federal N° 152-FZ de Datos Personales.",
  "severity": "moderate",
  "reference": "Federal Law No. 152-FZ on Personal Data"
},
{
  "id": 1261,
  "code": "TURPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Turquía",
  "description": "El sitio web recopila registros sensibles de titulares en Turquía sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos Personales N° 6698 (KVKK).",
  "severity": "critical",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1262,
  "code": "TURPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Junta de la KVKK en Turquía",
  "description": "El responsable del sitio web recopila datos de residentes de Turquía sin presentar una notificación o registrarse ante la Junta de la KVKK bajo la Ley de Protección de Datos Personales N° 6698 (KVKK).",
  "severity": "serious",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1263,
  "code": "TURPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Turquía",
  "description": "La base de datos almacena o procesa archivos de residentes de Turquía sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos Personales N° 6698 (KVKK).",
  "severity": "moderate",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1264,
  "code": "TURPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Turquía",
  "description": "El sitio web conserva registros de usuarios de Turquía más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos Personales N° 6698 (KVKK).",
  "severity": "serious",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1265,
  "code": "TURPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Turquía",
  "description": "El responsable transfiere datos de residentes de Turquía fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos Personales N° 6698 (KVKK).",
  "severity": "moderate",
  "reference": "Law on Protection of Personal Data No. 6698 (KVKK)"
},
{
  "id": 1266,
  "code": "NGAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Nigeria",
  "description": "El sitio web recopila registros sensibles de titulares en Nigeria sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos de Nigeria 2023 (NDPA).",
  "severity": "critical",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1267,
  "code": "NGAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la NDPC en Nigeria",
  "description": "El responsable del sitio web recopila datos de residentes de Nigeria sin presentar una notificación o registrarse ante la NDPC bajo la Ley de Protección de Datos de Nigeria 2023 (NDPA).",
  "severity": "serious",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1268,
  "code": "NGAPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Nigeria",
  "description": "La base de datos almacena o procesa archivos de residentes de Nigeria sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos de Nigeria 2023 (NDPA).",
  "severity": "moderate",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1269,
  "code": "NGAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Nigeria",
  "description": "El sitio web conserva registros de usuarios de Nigeria más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos de Nigeria 2023 (NDPA).",
  "severity": "serious",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1270,
  "code": "NGAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Nigeria",
  "description": "El responsable transfiere datos de residentes de Nigeria fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos de Nigeria 2023 (NDPA).",
  "severity": "moderate",
  "reference": "Nigeria Data Protection Act 2023 (NDPA)"
},
{
  "id": 1271,
  "code": "AFGPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Afganistán",
  "description": "El sitio web recopila registros sensibles de titulares en Afganistán sin el consentimiento previo por escrito exigido por la Decretos de telecomunicaciones de Afganistán.",
  "severity": "critical",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1272,
  "code": "AFGPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Ministerio de Comunicaciones en Afganistán",
  "description": "El responsable del sitio web recopila datos de residentes de Afganistán sin presentar una notificación o registrarse ante la Ministerio de Comunicaciones bajo la Decretos de telecomunicaciones de Afganistán.",
  "severity": "serious",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1273,
  "code": "AFGPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Afganistán",
  "description": "La base de datos almacena o procesa archivos de residentes de Afganistán sin emplear el cifrado técnico o los controles administrativos requeridos por la Decretos de telecomunicaciones de Afganistán.",
  "severity": "moderate",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1274,
  "code": "AFGPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Afganistán",
  "description": "El sitio web conserva registros de usuarios de Afganistán más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Decretos de telecomunicaciones de Afganistán.",
  "severity": "serious",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1275,
  "code": "AFGPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Afganistán",
  "description": "El responsable transfiere datos de residentes de Afganistán fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Decretos de telecomunicaciones de Afganistán.",
  "severity": "moderate",
  "reference": "Afghan local communications and telecommunications decrees"
},
{
  "id": 1276,
  "code": "AZEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Azerbaiyán",
  "description": "El sitio web recopila registros sensibles de titulares en Azerbaiyán sin el consentimiento previo por escrito exigido por la Ley de Datos Personales de Azerbaiyán N° 998-IIIQ.",
  "severity": "critical",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1277,
  "code": "AZEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Ministerio de Desarrollo Digital en Azerbaiyán",
  "description": "El responsable del sitio web recopila datos de residentes de Azerbaiyán sin presentar una notificación o registrarse ante la Ministerio de Desarrollo Digital bajo la Ley de Datos Personales de Azerbaiyán N° 998-IIIQ.",
  "severity": "serious",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1278,
  "code": "AZEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Azerbaiyán",
  "description": "La base de datos almacena o procesa archivos de residentes de Azerbaiyán sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Datos Personales de Azerbaiyán N° 998-IIIQ.",
  "severity": "moderate",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1279,
  "code": "AZEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Azerbaiyán",
  "description": "El sitio web conserva registros de usuarios de Azerbaiyán más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Datos Personales de Azerbaiyán N° 998-IIIQ.",
  "severity": "serious",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1280,
  "code": "AZEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Azerbaiyán",
  "description": "El responsable transfiere datos de residentes de Azerbaiyán fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Datos Personales de Azerbaiyán N° 998-IIIQ.",
  "severity": "moderate",
  "reference": "Law of Azerbaijan on Personal Data No. 998-IIIQ"
},
{
  "id": 1281,
  "code": "BGDPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Bangladés",
  "description": "El sitio web recopila registros sensibles de titulares en Bangladés sin el consentimiento previo por escrito exigido por la Ley de TIC / proyecto de Ley de Protección de Datos de Bangladés.",
  "severity": "critical",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1282,
  "code": "BGDPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la DPA de Bangladés en Bangladés",
  "description": "El responsable del sitio web recopila datos de residentes de Bangladés sin presentar una notificación o registrarse ante la DPA de Bangladés bajo la Ley de TIC / proyecto de Ley de Protección de Datos de Bangladés.",
  "severity": "serious",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1283,
  "code": "BGDPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Bangladés",
  "description": "La base de datos almacena o procesa archivos de residentes de Bangladés sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de TIC / proyecto de Ley de Protección de Datos de Bangladés.",
  "severity": "moderate",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1284,
  "code": "BGDPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Bangladés",
  "description": "El sitio web conserva registros de usuarios de Bangladés más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de TIC / proyecto de Ley de Protección de Datos de Bangladés.",
  "severity": "serious",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1285,
  "code": "BGDPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Bangladés",
  "description": "El responsable transfiere datos de residentes de Bangladés fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de TIC / proyecto de Ley de Protección de Datos de Bangladés.",
  "severity": "moderate",
  "reference": "Information and Communication Technology Act / draft Data Protection Act"
},
{
  "id": 1286,
  "code": "BLRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Bielorrusia",
  "description": "El sitio web recopila registros sensibles de titulares en Bielorrusia sin el consentimiento previo por escrito exigido por la Ley de Bielorrusia N° 99-Z de Protección de Datos Personales.",
  "severity": "critical",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1287,
  "code": "BLRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Centro Nacional de Protección de Datos en Bielorrusia",
  "description": "El responsable del sitio web recopila datos de residentes de Bielorrusia sin presentar una notificación o registrarse ante la Centro Nacional de Protección de Datos bajo la Ley de Bielorrusia N° 99-Z de Protección de Datos Personales.",
  "severity": "serious",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1288,
  "code": "BLRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Bielorrusia",
  "description": "La base de datos almacena o procesa archivos de residentes de Bielorrusia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Bielorrusia N° 99-Z de Protección de Datos Personales.",
  "severity": "moderate",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1289,
  "code": "BLRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Bielorrusia",
  "description": "El sitio web conserva registros de usuarios de Bielorrusia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Bielorrusia N° 99-Z de Protección de Datos Personales.",
  "severity": "serious",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1290,
  "code": "BLRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Bielorrusia",
  "description": "El responsable transfiere datos de residentes de Bielorrusia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Bielorrusia N° 99-Z de Protección de Datos Personales.",
  "severity": "moderate",
  "reference": "Law of Belarus No. 99-Z on Protection of Personal Data"
},
{
  "id": 1291,
  "code": "CMRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Camerún",
  "description": "El sitio web recopila registros sensibles de titulares en Camerún sin el consentimiento previo por escrito exigido por la Ley de Camerún N° 2010/012 de Ciberseguridad.",
  "severity": "critical",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1292,
  "code": "CMRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la ANTIC en Camerún",
  "description": "El responsable del sitio web recopila datos de residentes de Camerún sin presentar una notificación o registrarse ante la ANTIC bajo la Ley de Camerún N° 2010/012 de Ciberseguridad.",
  "severity": "serious",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1293,
  "code": "CMRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Camerún",
  "description": "La base de datos almacena o procesa archivos de residentes de Camerún sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Camerún N° 2010/012 de Ciberseguridad.",
  "severity": "moderate",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1294,
  "code": "CMRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Camerún",
  "description": "El sitio web conserva registros de usuarios de Camerún más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Camerún N° 2010/012 de Ciberseguridad.",
  "severity": "serious",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1295,
  "code": "CMRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Camerún",
  "description": "El responsable transfiere datos de residentes de Camerún fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Camerún N° 2010/012 de Ciberseguridad.",
  "severity": "moderate",
  "reference": "Cameroon Law No. 2010/012 on Cybersecurity and Cybercriminality"
},
{
  "id": 1296,
  "code": "COMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Comoras",
  "description": "El sitio web recopila registros sensibles de titulares en Comoras sin el consentimiento previo por escrito exigido por la Leyes de telecomunicaciones de Comoras.",
  "severity": "critical",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1297,
  "code": "COMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la ANRTIC en Comoras",
  "description": "El responsable del sitio web recopila datos de residentes de Comoras sin presentar una notificación o registrarse ante la ANRTIC bajo la Leyes de telecomunicaciones de Comoras.",
  "severity": "serious",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1298,
  "code": "COMPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Comoras",
  "description": "La base de datos almacena o procesa archivos de residentes de Comoras sin emplear el cifrado técnico o los controles administrativos requeridos por la Leyes de telecomunicaciones de Comoras.",
  "severity": "moderate",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1299,
  "code": "COMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Comoras",
  "description": "El sitio web conserva registros de usuarios de Comoras más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Leyes de telecomunicaciones de Comoras.",
  "severity": "serious",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1300,
  "code": "COMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Comoras",
  "description": "El responsable transfiere datos de residentes de Comoras fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Leyes de telecomunicaciones de Comoras.",
  "severity": "moderate",
  "reference": "Comoros local communications and transaction laws"
},
{
  "id": 1301,
  "code": "CUBPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Cuba",
  "description": "El sitio web recopila registros sensibles de titulares en Cuba sin el consentimiento previo por escrito exigido por la Decreto-Ley N° 370 de Cuba sobre Informatización de la Sociedad.",
  "severity": "critical",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1302,
  "code": "CUBPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la MINCOM en Cuba",
  "description": "El responsable del sitio web recopila datos de residentes de Cuba sin presentar una notificación o registrarse ante la MINCOM bajo la Decreto-Ley N° 370 de Cuba sobre Informatización de la Sociedad.",
  "severity": "serious",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1303,
  "code": "CUBPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Cuba",
  "description": "La base de datos almacena o procesa archivos de residentes de Cuba sin emplear el cifrado técnico o los controles administrativos requeridos por la Decreto-Ley N° 370 de Cuba sobre Informatización de la Sociedad.",
  "severity": "moderate",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1304,
  "code": "CUBPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Cuba",
  "description": "El sitio web conserva registros de usuarios de Cuba más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Decreto-Ley N° 370 de Cuba sobre Informatización de la Sociedad.",
  "severity": "serious",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1305,
  "code": "CUBPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Cuba",
  "description": "El responsable transfiere datos de residentes de Cuba fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Decreto-Ley N° 370 de Cuba sobre Informatización de la Sociedad.",
  "severity": "moderate",
  "reference": "Cuban Decree-Law No. 370 on Informatization of Society"
},
{
  "id": 1306,
  "code": "CODPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en RD Congo",
  "description": "El sitio web recopila registros sensibles de titulares en RD Congo sin el consentimiento previo por escrito exigido por la Ley de Telecomunicaciones de la RDC N° 20/017.",
  "severity": "critical",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1307,
  "code": "CODPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la ARPTC en RD Congo",
  "description": "El responsable del sitio web recopila datos de residentes de RD Congo sin presentar una notificación o registrarse ante la ARPTC bajo la Ley de Telecomunicaciones de la RDC N° 20/017.",
  "severity": "serious",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1308,
  "code": "CODPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en RD Congo",
  "description": "La base de datos almacena o procesa archivos de residentes de RD Congo sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Telecomunicaciones de la RDC N° 20/017.",
  "severity": "moderate",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1309,
  "code": "CODPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en RD Congo",
  "description": "El sitio web conserva registros de usuarios de RD Congo más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Telecomunicaciones de la RDC N° 20/017.",
  "severity": "serious",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1310,
  "code": "CODPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de RD Congo",
  "description": "El responsable transfiere datos de residentes de RD Congo fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Telecomunicaciones de la RDC N° 20/017.",
  "severity": "moderate",
  "reference": "DRC Telecom Law No. 20/017 / Cybersecurity framework"
},
{
  "id": 1311,
  "code": "ETHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Etiopía",
  "description": "El sitio web recopila registros sensibles de titulares en Etiopía sin el consentimiento previo por escrito exigido por la Proyecto de Proclamación de Protección de Datos Personales de Etiopía.",
  "severity": "critical",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1312,
  "code": "ETHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la MInT en Etiopía",
  "description": "El responsable del sitio web recopila datos de residentes de Etiopía sin presentar una notificación o registrarse ante la MInT bajo la Proyecto de Proclamación de Protección de Datos Personales de Etiopía.",
  "severity": "serious",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1313,
  "code": "ETHPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Etiopía",
  "description": "La base de datos almacena o procesa archivos de residentes de Etiopía sin emplear el cifrado técnico o los controles administrativos requeridos por la Proyecto de Proclamación de Protección de Datos Personales de Etiopía.",
  "severity": "moderate",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1314,
  "code": "ETHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Etiopía",
  "description": "El sitio web conserva registros de usuarios de Etiopía más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Proyecto de Proclamación de Protección de Datos Personales de Etiopía.",
  "severity": "serious",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1315,
  "code": "ETHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Etiopía",
  "description": "El responsable transfiere datos de residentes de Etiopía fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Proyecto de Proclamación de Protección de Datos Personales de Etiopía.",
  "severity": "moderate",
  "reference": "Ethiopian draft Personal Data Protection Proclamation"
},
{
  "id": 1316,
  "code": "HTIPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Haití",
  "description": "El sitio web recopila registros sensibles de titulares en Haití sin el consentimiento previo por escrito exigido por la Directrices de ciberseguridad de Haití.",
  "severity": "critical",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1317,
  "code": "HTIPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la CONATEL en Haití",
  "description": "El responsable del sitio web recopila datos de residentes de Haití sin presentar una notificación o registrarse ante la CONATEL bajo la Directrices de ciberseguridad de Haití.",
  "severity": "serious",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1318,
  "code": "HTIPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Haití",
  "description": "La base de datos almacena o procesa archivos de residentes de Haití sin emplear el cifrado técnico o los controles administrativos requeridos por la Directrices de ciberseguridad de Haití.",
  "severity": "moderate",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1319,
  "code": "HTIPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Haití",
  "description": "El sitio web conserva registros de usuarios de Haití más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Directrices de ciberseguridad de Haití.",
  "severity": "serious",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1320,
  "code": "HTIPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Haití",
  "description": "El responsable transfiere datos de residentes de Haití fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Directrices de ciberseguridad de Haití.",
  "severity": "moderate",
  "reference": "Haitian Cyber Security guidelines / draft privacy rules"
},
{
  "id": 1321,
  "code": "IRNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Irán",
  "description": "El sitio web recopila registros sensibles de titulares en Irán sin el consentimiento previo por escrito exigido por la Regulaciones del ciberespacio de Irán.",
  "severity": "critical",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1322,
  "code": "IRNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la CRA en Irán",
  "description": "El responsable del sitio web recopila datos de residentes de Irán sin presentar una notificación o registrarse ante la CRA bajo la Regulaciones del ciberespacio de Irán.",
  "severity": "serious",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1323,
  "code": "IRNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Irán",
  "description": "La base de datos almacena o procesa archivos de residentes de Irán sin emplear el cifrado técnico o los controles administrativos requeridos por la Regulaciones del ciberespacio de Irán.",
  "severity": "moderate",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1324,
  "code": "IRNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Irán",
  "description": "El sitio web conserva registros de usuarios de Irán más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Regulaciones del ciberespacio de Irán.",
  "severity": "serious",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1325,
  "code": "IRNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Irán",
  "description": "El responsable transfiere datos de residentes de Irán fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Regulaciones del ciberespacio de Irán.",
  "severity": "moderate",
  "reference": "Iran Cyber Space regulations / draft Personal Data protection"
},
{
  "id": 1326,
  "code": "LBYPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Libia",
  "description": "El sitio web recopila registros sensibles de titulares en Libia sin el consentimiento previo por escrito exigido por la Resoluciones de telecomunicaciones de Libia.",
  "severity": "critical",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1327,
  "code": "LBYPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la GPTC en Libia",
  "description": "El responsable del sitio web recopila datos de residentes de Libia sin presentar una notificación o registrarse ante la GPTC bajo la Resoluciones de telecomunicaciones de Libia.",
  "severity": "serious",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1328,
  "code": "LBYPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Libia",
  "description": "La base de datos almacena o procesa archivos de residentes de Libia sin emplear el cifrado técnico o los controles administrativos requeridos por la Resoluciones de telecomunicaciones de Libia.",
  "severity": "moderate",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1329,
  "code": "LBYPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Libia",
  "description": "El sitio web conserva registros de usuarios de Libia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Resoluciones de telecomunicaciones de Libia.",
  "severity": "serious",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1330,
  "code": "LBYPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Libia",
  "description": "El responsable transfiere datos de residentes de Libia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Resoluciones de telecomunicaciones de Libia.",
  "severity": "moderate",
  "reference": "Libyan local telecom and cybercrime resolutions"
},
{
  "id": 1331,
  "code": "NRUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Nauru",
  "description": "El sitio web recopila registros sensibles de titulares en Nauru sin el consentimiento previo por escrito exigido por la Ley de Ciberseguridad de Nauru.",
  "severity": "critical",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1332,
  "code": "NRUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Ministerio de Telecomunicaciones en Nauru",
  "description": "El responsable del sitio web recopila datos de residentes de Nauru sin presentar una notificación o registrarse ante la Ministerio de Telecomunicaciones bajo la Ley de Ciberseguridad de Nauru.",
  "severity": "serious",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1333,
  "code": "NRUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Nauru",
  "description": "La base de datos almacena o procesa archivos de residentes de Nauru sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Ciberseguridad de Nauru.",
  "severity": "moderate",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1334,
  "code": "NRUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Nauru",
  "description": "El sitio web conserva registros de usuarios de Nauru más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Ciberseguridad de Nauru.",
  "severity": "serious",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1335,
  "code": "NRUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Nauru",
  "description": "El responsable transfiere datos de residentes de Nauru fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Ciberseguridad de Nauru.",
  "severity": "moderate",
  "reference": "Nauru Cybersecurity Act / draft privacy rules"
},
{
  "id": 1336,
  "code": "PRKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Corea del Norte",
  "description": "El sitio web recopila registros sensibles de titulares en Corea del Norte sin el consentimiento previo por escrito exigido por la Leyes de transacciones electrónicas de la RPDC.",
  "severity": "critical",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1337,
  "code": "PRKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Ministerio de Correos y Telecomunicaciones en Corea del Norte",
  "description": "El responsable del sitio web recopila datos de residentes de Corea del Norte sin presentar una notificación o registrarse ante la Ministerio de Correos y Telecomunicaciones bajo la Leyes de transacciones electrónicas de la RPDC.",
  "severity": "serious",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1338,
  "code": "PRKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Corea del Norte",
  "description": "La base de datos almacena o procesa archivos de residentes de Corea del Norte sin emplear el cifrado técnico o los controles administrativos requeridos por la Leyes de transacciones electrónicas de la RPDC.",
  "severity": "moderate",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1339,
  "code": "PRKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Corea del Norte",
  "description": "El sitio web conserva registros de usuarios de Corea del Norte más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Leyes de transacciones electrónicas de la RPDC.",
  "severity": "serious",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1340,
  "code": "PRKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Corea del Norte",
  "description": "El responsable transfiere datos de residentes de Corea del Norte fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Leyes de transacciones electrónicas de la RPDC.",
  "severity": "moderate",
  "reference": "DPRK Cybersecurity and electronic transactions laws"
},
{
  "id": 1341,
  "code": "TKMPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Turkmenistán",
  "description": "El sitio web recopila registros sensibles de titulares en Turkmenistán sin el consentimiento previo por escrito exigido por la Ley de Turkmenistán N° 562-V de Información y su Protección.",
  "severity": "critical",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1342,
  "code": "TKMPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Ministerio de Comunicaciones en Turkmenistán",
  "description": "El responsable del sitio web recopila datos de residentes de Turkmenistán sin presentar una notificación o registrarse ante la Ministerio de Comunicaciones bajo la Ley de Turkmenistán N° 562-V de Información y su Protección.",
  "severity": "serious",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1343,
  "code": "TKMPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Turkmenistán",
  "description": "La base de datos almacena o procesa archivos de residentes de Turkmenistán sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Turkmenistán N° 562-V de Información y su Protección.",
  "severity": "moderate",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1344,
  "code": "TKMPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Turkmenistán",
  "description": "El sitio web conserva registros de usuarios de Turkmenistán más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Turkmenistán N° 562-V de Información y su Protección.",
  "severity": "serious",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1345,
  "code": "TKMPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Turkmenistán",
  "description": "El responsable transfiere datos de residentes de Turkmenistán fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Turkmenistán N° 562-V de Información y su Protección.",
  "severity": "moderate",
  "reference": "Law of Turkmenistan No. 562-V on Information and its Protection"
},
{
  "id": 1346,
  "code": "TUVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Tuvalu",
  "description": "El sitio web recopila registros sensibles de titulares en Tuvalu sin el consentimiento previo por escrito exigido por la Reglas de ciberseguridad de Tuvalu.",
  "severity": "critical",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1347,
  "code": "TUVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Ministerio de Telecomunicaciones en Tuvalu",
  "description": "El responsable del sitio web recopila datos de residentes de Tuvalu sin presentar una notificación o registrarse ante la Ministerio de Telecomunicaciones bajo la Reglas de ciberseguridad de Tuvalu.",
  "severity": "serious",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1348,
  "code": "TUVPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Tuvalu",
  "description": "La base de datos almacena o procesa archivos de residentes de Tuvalu sin emplear el cifrado técnico o los controles administrativos requeridos por la Reglas de ciberseguridad de Tuvalu.",
  "severity": "moderate",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1349,
  "code": "TUVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Tuvalu",
  "description": "El sitio web conserva registros de usuarios de Tuvalu más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Reglas de ciberseguridad de Tuvalu.",
  "severity": "serious",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1350,
  "code": "TUVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Tuvalu",
  "description": "El responsable transfiere datos de residentes de Tuvalu fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Reglas de ciberseguridad de Tuvalu.",
  "severity": "moderate",
  "reference": "Tuvalu Cybersecurity and draft privacy rules"
},
{
  "id": 1351,
  "code": "VATPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Vaticano",
  "description": "El sitio web recopila registros sensibles de titulares en Vaticano sin el consentimiento previo por escrito exigido por la Directivas de ciberseguridad del Vaticano.",
  "severity": "critical",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1352,
  "code": "VATPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Gendarmería del Vaticano en Vaticano",
  "description": "El responsable del sitio web recopila datos de residentes de Vaticano sin presentar una notificación o registrarse ante la Gendarmería del Vaticano bajo la Directivas de ciberseguridad del Vaticano.",
  "severity": "serious",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1353,
  "code": "VATPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Vaticano",
  "description": "La base de datos almacena o procesa archivos de residentes de Vaticano sin emplear el cifrado técnico o los controles administrativos requeridos por la Directivas de ciberseguridad del Vaticano.",
  "severity": "moderate",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1354,
  "code": "VATPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Vaticano",
  "description": "El sitio web conserva registros de usuarios de Vaticano más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Directivas de ciberseguridad del Vaticano.",
  "severity": "serious",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1355,
  "code": "VATPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Vaticano",
  "description": "El responsable transfiere datos de residentes de Vaticano fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Directivas de ciberseguridad del Vaticano.",
  "severity": "moderate",
  "reference": "Vatican local cybersecurity and administrative directives"
},
{
  "id": 1356,
  "code": "ESHPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Sahara Occidental",
  "description": "El sitio web recopila registros sensibles de titulares en Sahara Occidental sin el consentimiento previo por escrito exigido por la Reglas locales de Sahara Occidental.",
  "severity": "critical",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1357,
  "code": "ESHPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Autoridad de Telecomunicaciones en Sahara Occidental",
  "description": "El responsable del sitio web recopila datos de residentes de Sahara Occidental sin presentar una notificación o registrarse ante la Autoridad de Telecomunicaciones bajo la Reglas locales de Sahara Occidental.",
  "severity": "serious",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1358,
  "code": "ESHPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Sahara Occidental",
  "description": "La base de datos almacena o procesa archivos de residentes de Sahara Occidental sin emplear el cifrado técnico o los controles administrativos requeridos por la Reglas locales de Sahara Occidental.",
  "severity": "moderate",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1359,
  "code": "ESHPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Sahara Occidental",
  "description": "El sitio web conserva registros de usuarios de Sahara Occidental más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Reglas locales de Sahara Occidental.",
  "severity": "serious",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1360,
  "code": "ESHPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Sahara Occidental",
  "description": "El responsable transfiere datos de residentes de Sahara Occidental fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Reglas locales de Sahara Occidental.",
  "severity": "moderate",
  "reference": "Western Sahara local rules / cybersecurity draft"
},
{
  "id": 1361,
  "code": "BGRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Bulgaria",
  "description": "El sitio web recopila registros sensibles de titulares en Bulgaria sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos Personales de Bulgaria.",
  "severity": "critical",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1362,
  "code": "BGRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la CPDP en Bulgaria",
  "description": "El responsable del sitio web recopila datos de residentes de Bulgaria sin presentar una notificación o registrarse ante la CPDP bajo la Ley de Protección de Datos Personales de Bulgaria.",
  "severity": "serious",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1363,
  "code": "BGRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Bulgaria",
  "description": "La base de datos almacena o procesa archivos de residentes de Bulgaria sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos Personales de Bulgaria.",
  "severity": "moderate",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1364,
  "code": "BGRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Bulgaria",
  "description": "El sitio web conserva registros de usuarios de Bulgaria más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos Personales de Bulgaria.",
  "severity": "serious",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1365,
  "code": "BGRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Bulgaria",
  "description": "El responsable transfiere datos de residentes de Bulgaria fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos Personales de Bulgaria.",
  "severity": "moderate",
  "reference": "Bulgarian Personal Data Protection Act"
},
{
  "id": 1366,
  "code": "HRVPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Croacia",
  "description": "El sitio web recopila registros sensibles de titulares en Croacia sin el consentimiento previo por escrito exigido por la Ley de Croacia sobre la Implementación del RGPD.",
  "severity": "critical",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1367,
  "code": "HRVPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la AZOP en Croacia",
  "description": "El responsable del sitio web recopila datos de residentes de Croacia sin presentar una notificación o registrarse ante la AZOP bajo la Ley de Croacia sobre la Implementación del RGPD.",
  "severity": "serious",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1368,
  "code": "HRVPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Croacia",
  "description": "La base de datos almacena o procesa archivos de residentes de Croacia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Croacia sobre la Implementación del RGPD.",
  "severity": "moderate",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1369,
  "code": "HRVPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Croacia",
  "description": "El sitio web conserva registros de usuarios de Croacia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Croacia sobre la Implementación del RGPD.",
  "severity": "serious",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1370,
  "code": "HRVPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Croacia",
  "description": "El responsable transfiere datos de residentes de Croacia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Croacia sobre la Implementación del RGPD.",
  "severity": "moderate",
  "reference": "Croatian Act on the Implementation of the General Data Protection Regulation"
},
{
  "id": 1371,
  "code": "ESTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Estonia",
  "description": "El sitio web recopila registros sensibles de titulares en Estonia sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos Personales de Estonia.",
  "severity": "critical",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1372,
  "code": "ESTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la AKI en Estonia",
  "description": "El responsable del sitio web recopila datos de residentes de Estonia sin presentar una notificación o registrarse ante la AKI bajo la Ley de Protección de Datos Personales de Estonia.",
  "severity": "serious",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1373,
  "code": "ESTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Estonia",
  "description": "La base de datos almacena o procesa archivos de residentes de Estonia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos Personales de Estonia.",
  "severity": "moderate",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1374,
  "code": "ESTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Estonia",
  "description": "El sitio web conserva registros de usuarios de Estonia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos Personales de Estonia.",
  "severity": "serious",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1375,
  "code": "ESTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Estonia",
  "description": "El responsable transfiere datos de residentes de Estonia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos Personales de Estonia.",
  "severity": "moderate",
  "reference": "Estonian Personal Data Protection Act (Isikuandmete kaitse seadus)"
},
{
  "id": 1376,
  "code": "LVAPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Letonia",
  "description": "El sitio web recopila registros sensibles de titulares en Letonia sin el consentimiento previo por escrito exigido por la Ley de Tratamiento de Datos Personales de Letonia.",
  "severity": "critical",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1377,
  "code": "LVAPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la DVI en Letonia",
  "description": "El responsable del sitio web recopila datos de residentes de Letonia sin presentar una notificación o registrarse ante la DVI bajo la Ley de Tratamiento de Datos Personales de Letonia.",
  "severity": "serious",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1378,
  "code": "LVAPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Letonia",
  "description": "La base de datos almacena o procesa archivos de residentes de Letonia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Tratamiento de Datos Personales de Letonia.",
  "severity": "moderate",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1379,
  "code": "LVAPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Letonia",
  "description": "El sitio web conserva registros de usuarios de Letonia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Tratamiento de Datos Personales de Letonia.",
  "severity": "serious",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1380,
  "code": "LVAPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Letonia",
  "description": "El responsable transfiere datos de residentes de Letonia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Tratamiento de Datos Personales de Letonia.",
  "severity": "moderate",
  "reference": "Latvian Personal Data Processing Law"
},
{
  "id": 1381,
  "code": "LTUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Lituania",
  "description": "El sitio web recopila registros sensibles de titulares en Lituania sin el consentimiento previo por escrito exigido por la Ley de Protección Jurídica de Datos Personales de Lituania.",
  "severity": "critical",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1382,
  "code": "LTUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la VDAI en Lituania",
  "description": "El responsable del sitio web recopila datos de residentes de Lituania sin presentar una notificación o registrarse ante la VDAI bajo la Ley de Protección Jurídica de Datos Personales de Lituania.",
  "severity": "serious",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1383,
  "code": "LTUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Lituania",
  "description": "La base de datos almacena o procesa archivos de residentes de Lituania sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección Jurídica de Datos Personales de Lituania.",
  "severity": "moderate",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1384,
  "code": "LTUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Lituania",
  "description": "El sitio web conserva registros de usuarios de Lituania más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección Jurídica de Datos Personales de Lituania.",
  "severity": "serious",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1385,
  "code": "LTUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Lituania",
  "description": "El responsable transfiere datos de residentes de Lituania fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección Jurídica de Datos Personales de Lituania.",
  "severity": "moderate",
  "reference": "Lithuanian Law on Legal Protection of Personal Data"
},
{
  "id": 1386,
  "code": "CYPPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Chipre",
  "description": "El sitio web recopila registros sensibles de titulares en Chipre sin el consentimiento previo por escrito exigido por la Ley de Chipre de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "critical",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1387,
  "code": "CYPPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Comisionado de Protección de Datos en Chipre",
  "description": "El responsable del sitio web recopila datos de residentes de Chipre sin presentar una notificación o registrarse ante la Comisionado de Protección de Datos bajo la Ley de Chipre de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "serious",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1388,
  "code": "CYPPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Chipre",
  "description": "La base de datos almacena o procesa archivos de residentes de Chipre sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Chipre de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "moderate",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1389,
  "code": "CYPPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Chipre",
  "description": "El sitio web conserva registros de usuarios de Chipre más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Chipre de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "serious",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1390,
  "code": "CYPPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Chipre",
  "description": "El responsable transfiere datos de residentes de Chipre fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Chipre de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "moderate",
  "reference": "Cyprus Protection of Natural Persons with regard to the Processing of Personal Data Law"
},
{
  "id": 1391,
  "code": "MLTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Malta",
  "description": "El sitio web recopila registros sensibles de titulares en Malta sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos de Malta.",
  "severity": "critical",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1392,
  "code": "MLTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la IDPC en Malta",
  "description": "El responsable del sitio web recopila datos de residentes de Malta sin presentar una notificación o registrarse ante la IDPC bajo la Ley de Protección de Datos de Malta.",
  "severity": "serious",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1393,
  "code": "MLTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Malta",
  "description": "La base de datos almacena o procesa archivos de residentes de Malta sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos de Malta.",
  "severity": "moderate",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1394,
  "code": "MLTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Malta",
  "description": "El sitio web conserva registros de usuarios de Malta más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos de Malta.",
  "severity": "serious",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1395,
  "code": "MLTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Malta",
  "description": "El responsable transfiere datos de residentes de Malta fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos de Malta.",
  "severity": "moderate",
  "reference": "Malta Data Protection Act (Cap. 586)"
},
{
  "id": 1396,
  "code": "SVKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Eslovaquia",
  "description": "El sitio web recopila registros sensibles de titulares en Eslovaquia sin el consentimiento previo por escrito exigido por la Ley de Eslovaquia N° 18/2018 Coll. de Protección de Datos.",
  "severity": "critical",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1397,
  "code": "SVKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la UOOU SR en Eslovaquia",
  "description": "El responsable del sitio web recopila datos de residentes de Eslovaquia sin presentar una notificación o registrarse ante la UOOU SR bajo la Ley de Eslovaquia N° 18/2018 Coll. de Protección de Datos.",
  "severity": "serious",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1398,
  "code": "SVKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Eslovaquia",
  "description": "La base de datos almacena o procesa archivos de residentes de Eslovaquia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Eslovaquia N° 18/2018 Coll. de Protección de Datos.",
  "severity": "moderate",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1399,
  "code": "SVKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Eslovaquia",
  "description": "El sitio web conserva registros de usuarios de Eslovaquia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Eslovaquia N° 18/2018 Coll. de Protección de Datos.",
  "severity": "serious",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1400,
  "code": "SVKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Eslovaquia",
  "description": "El responsable transfiere datos de residentes de Eslovaquia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Eslovaquia N° 18/2018 Coll. de Protección de Datos.",
  "severity": "moderate",
  "reference": "Slovak Act No. 18/2018 Coll. on Personal Data Protection"
},
{
  "id": 1401,
  "code": "SVNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Eslovenia",
  "description": "El sitio web recopila registros sensibles de titulares en Eslovenia sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos Personales de Eslovenia (ZVOP-2).",
  "severity": "critical",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1402,
  "code": "SVNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Comisionado de Información en Eslovenia",
  "description": "El responsable del sitio web recopila datos de residentes de Eslovenia sin presentar una notificación o registrarse ante la Comisionado de Información bajo la Ley de Protección de Datos Personales de Eslovenia (ZVOP-2).",
  "severity": "serious",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1403,
  "code": "SVNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Eslovenia",
  "description": "La base de datos almacena o procesa archivos de residentes de Eslovenia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos Personales de Eslovenia (ZVOP-2).",
  "severity": "moderate",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1404,
  "code": "SVNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Eslovenia",
  "description": "El sitio web conserva registros de usuarios de Eslovenia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos Personales de Eslovenia (ZVOP-2).",
  "severity": "serious",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1405,
  "code": "SVNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Eslovenia",
  "description": "El responsable transfiere datos de residentes de Eslovenia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos Personales de Eslovenia (ZVOP-2).",
  "severity": "moderate",
  "reference": "Slovenian Personal Data Protection Act (ZVOP-2)"
},
{
  "id": 1406,
  "code": "LUXPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Luxemburgo",
  "description": "El sitio web recopila registros sensibles de titulares en Luxemburgo sin el consentimiento previo por escrito exigido por la Ley de Luxemburgo de Protección de Datos de 2018.",
  "severity": "critical",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1407,
  "code": "LUXPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la CNPD en Luxemburgo",
  "description": "El responsable del sitio web recopila datos de residentes de Luxemburgo sin presentar una notificación o registrarse ante la CNPD bajo la Ley de Luxemburgo de Protección de Datos de 2018.",
  "severity": "serious",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1408,
  "code": "LUXPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Luxemburgo",
  "description": "La base de datos almacena o procesa archivos de residentes de Luxemburgo sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Luxemburgo de Protección de Datos de 2018.",
  "severity": "moderate",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1409,
  "code": "LUXPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Luxemburgo",
  "description": "El sitio web conserva registros de usuarios de Luxemburgo más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Luxemburgo de Protección de Datos de 2018.",
  "severity": "serious",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1410,
  "code": "LUXPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Luxemburgo",
  "description": "El responsable transfiere datos de residentes de Luxemburgo fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Luxemburgo de Protección de Datos de 2018.",
  "severity": "moderate",
  "reference": "Luxembourg Act of 1 August 2018 on the organization of the National Commission for Data Protection"
},
{
  "id": 1411,
  "code": "CZEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en República Checa",
  "description": "El sitio web recopila registros sensibles de titulares en República Checa sin el consentimiento previo por escrito exigido por la Ley Checa N° 110/2019 Coll. de Tratamiento de Datos Personales.",
  "severity": "critical",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1412,
  "code": "CZEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la UOOU en República Checa",
  "description": "El responsable del sitio web recopila datos de residentes de República Checa sin presentar una notificación o registrarse ante la UOOU bajo la Ley Checa N° 110/2019 Coll. de Tratamiento de Datos Personales.",
  "severity": "serious",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1413,
  "code": "CZEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en República Checa",
  "description": "La base de datos almacena o procesa archivos de residentes de República Checa sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley Checa N° 110/2019 Coll. de Tratamiento de Datos Personales.",
  "severity": "moderate",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1414,
  "code": "CZEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en República Checa",
  "description": "El sitio web conserva registros de usuarios de República Checa más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley Checa N° 110/2019 Coll. de Tratamiento de Datos Personales.",
  "severity": "serious",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1415,
  "code": "CZEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de República Checa",
  "description": "El responsable transfiere datos de residentes de República Checa fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley Checa N° 110/2019 Coll. de Tratamiento de Datos Personales.",
  "severity": "moderate",
  "reference": "Czech Act No. 110/2019 Coll. on Personal Data Processing"
},
{
  "id": 1416,
  "code": "HUNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Hungría",
  "description": "El sitio web recopila registros sensibles de titulares en Hungría sin el consentimiento previo por escrito exigido por la Ley Húngara CXII de 2011 de Autodeterminación Informativa.",
  "severity": "critical",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1417,
  "code": "HUNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la NAIH en Hungría",
  "description": "El responsable del sitio web recopila datos de residentes de Hungría sin presentar una notificación o registrarse ante la NAIH bajo la Ley Húngara CXII de 2011 de Autodeterminación Informativa.",
  "severity": "serious",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1418,
  "code": "HUNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Hungría",
  "description": "La base de datos almacena o procesa archivos de residentes de Hungría sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley Húngara CXII de 2011 de Autodeterminación Informativa.",
  "severity": "moderate",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1419,
  "code": "HUNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Hungría",
  "description": "El sitio web conserva registros de usuarios de Hungría más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley Húngara CXII de 2011 de Autodeterminación Informativa.",
  "severity": "serious",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1420,
  "code": "HUNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Hungría",
  "description": "El responsable transfiere datos de residentes de Hungría fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley Húngara CXII de 2011 de Autodeterminación Informativa.",
  "severity": "moderate",
  "reference": "Hungarian Act CXII of 2011 on Informational Self-Determination and Freedom of Information"
},
{
  "id": 1421,
  "code": "ROUPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Rumania",
  "description": "El sitio web recopila registros sensibles de titulares en Rumania sin el consentimiento previo por escrito exigido por la Ley de Rumania N° 190/2018 sobre medidas de aplicación del RGPD.",
  "severity": "critical",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1422,
  "code": "ROUPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la ANSPDCP en Rumania",
  "description": "El responsable del sitio web recopila datos de residentes de Rumania sin presentar una notificación o registrarse ante la ANSPDCP bajo la Ley de Rumania N° 190/2018 sobre medidas de aplicación del RGPD.",
  "severity": "serious",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1423,
  "code": "ROUPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Rumania",
  "description": "La base de datos almacena o procesa archivos de residentes de Rumania sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Rumania N° 190/2018 sobre medidas de aplicación del RGPD.",
  "severity": "moderate",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1424,
  "code": "ROUPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Rumania",
  "description": "El sitio web conserva registros de usuarios de Rumania más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Rumania N° 190/2018 sobre medidas de aplicación del RGPD.",
  "severity": "serious",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1425,
  "code": "ROUPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Rumania",
  "description": "El responsable transfiere datos de residentes de Rumania fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Rumania N° 190/2018 sobre medidas de aplicación del RGPD.",
  "severity": "moderate",
  "reference": "Romanian Law No. 190/2018 on implementation measures of GDPR"
},
{
  "id": 1426,
  "code": "POLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Polonia",
  "description": "El sitio web recopila registros sensibles de titulares en Polonia sin el consentimiento previo por escrito exigido por la Ley de Polonia de Protección de Datos Personales de 2018.",
  "severity": "critical",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1427,
  "code": "POLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la UODO en Polonia",
  "description": "El responsable del sitio web recopila datos de residentes de Polonia sin presentar una notificación o registrarse ante la UODO bajo la Ley de Polonia de Protección de Datos Personales de 2018.",
  "severity": "serious",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1428,
  "code": "POLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Polonia",
  "description": "La base de datos almacena o procesa archivos de residentes de Polonia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Polonia de Protección de Datos Personales de 2018.",
  "severity": "moderate",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1429,
  "code": "POLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Polonia",
  "description": "El sitio web conserva registros de usuarios de Polonia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Polonia de Protección de Datos Personales de 2018.",
  "severity": "serious",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1430,
  "code": "POLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Polonia",
  "description": "El responsable transfiere datos de residentes de Polonia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Polonia de Protección de Datos Personales de 2018.",
  "severity": "moderate",
  "reference": "Polish Act of 10 May 2018 on the Protection of Personal Data"
},
{
  "id": 1431,
  "code": "IRLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Irlanda",
  "description": "El sitio web recopila registros sensibles de titulares en Irlanda sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos de Irlanda de 2018.",
  "severity": "critical",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1432,
  "code": "IRLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la DPC en Irlanda",
  "description": "El responsable del sitio web recopila datos de residentes de Irlanda sin presentar una notificación o registrarse ante la DPC bajo la Ley de Protección de Datos de Irlanda de 2018.",
  "severity": "serious",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1433,
  "code": "IRLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Irlanda",
  "description": "La base de datos almacena o procesa archivos de residentes de Irlanda sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos de Irlanda de 2018.",
  "severity": "moderate",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1434,
  "code": "IRLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Irlanda",
  "description": "El sitio web conserva registros de usuarios de Irlanda más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos de Irlanda de 2018.",
  "severity": "serious",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1435,
  "code": "IRLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Irlanda",
  "description": "El responsable transfiere datos de residentes de Irlanda fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos de Irlanda de 2018.",
  "severity": "moderate",
  "reference": "Irish Data Protection Act 2018"
},
{
  "id": 1436,
  "code": "AUTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Austria",
  "description": "El sitio web recopila registros sensibles de titulares en Austria sin el consentimiento previo por escrito exigido por la Ley Federal de Protección de Datos Personales de Austria (DSG).",
  "severity": "critical",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1437,
  "code": "AUTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la DSB en Austria",
  "description": "El responsable del sitio web recopila datos de residentes de Austria sin presentar una notificación o registrarse ante la DSB bajo la Ley Federal de Protección de Datos Personales de Austria (DSG).",
  "severity": "serious",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1438,
  "code": "AUTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Austria",
  "description": "La base de datos almacena o procesa archivos de residentes de Austria sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley Federal de Protección de Datos Personales de Austria (DSG).",
  "severity": "moderate",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1439,
  "code": "AUTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Austria",
  "description": "El sitio web conserva registros de usuarios de Austria más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley Federal de Protección de Datos Personales de Austria (DSG).",
  "severity": "serious",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1440,
  "code": "AUTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Austria",
  "description": "El responsable transfiere datos de residentes de Austria fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley Federal de Protección de Datos Personales de Austria (DSG).",
  "severity": "moderate",
  "reference": "Austrian Federal Act on the Protection of Personal Data (Datenschutzgesetz - DSG)"
},
{
  "id": 1441,
  "code": "SWEPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Suecia",
  "description": "El sitio web recopila registros sensibles de titulares en Suecia sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos de Suecia.",
  "severity": "critical",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1442,
  "code": "SWEPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la IMY en Suecia",
  "description": "El responsable del sitio web recopila datos de residentes de Suecia sin presentar una notificación o registrarse ante la IMY bajo la Ley de Protección de Datos de Suecia.",
  "severity": "serious",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1443,
  "code": "SWEPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Suecia",
  "description": "La base de datos almacena o procesa archivos de residentes de Suecia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos de Suecia.",
  "severity": "moderate",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1444,
  "code": "SWEPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Suecia",
  "description": "El sitio web conserva registros de usuarios de Suecia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos de Suecia.",
  "severity": "serious",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1445,
  "code": "SWEPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Suecia",
  "description": "El responsable transfiere datos de residentes de Suecia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos de Suecia.",
  "severity": "moderate",
  "reference": "Swedish Data Protection Act (Lag med kompletterande bestämmelser till EU:s dataskyddsförordning)"
},
{
  "id": 1446,
  "code": "FLNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Finlandia",
  "description": "El sitio web recopila registros sensibles de titulares en Finlandia sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos de Finlandia (1050/2018).",
  "severity": "critical",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1447,
  "code": "FLNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Defensor del Pueblo de Protección de Datos en Finlandia",
  "description": "El responsable del sitio web recopila datos de residentes de Finlandia sin presentar una notificación o registrarse ante la Defensor del Pueblo de Protección de Datos bajo la Ley de Protección de Datos de Finlandia (1050/2018).",
  "severity": "serious",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1448,
  "code": "FLNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Finlandia",
  "description": "La base de datos almacena o procesa archivos de residentes de Finlandia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos de Finlandia (1050/2018).",
  "severity": "moderate",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1449,
  "code": "FLNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Finlandia",
  "description": "El sitio web conserva registros de usuarios de Finlandia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos de Finlandia (1050/2018).",
  "severity": "serious",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1450,
  "code": "FLNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Finlandia",
  "description": "El responsable transfiere datos de residentes de Finlandia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos de Finlandia (1050/2018).",
  "severity": "moderate",
  "reference": "Finnish Data Protection Act (Tietosuojalaki 1050/2018)"
},
{
  "id": 1451,
  "code": "DNKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Dinamarca",
  "description": "El sitio web recopila registros sensibles de titulares en Dinamarca sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos de Dinamarca.",
  "severity": "critical",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1452,
  "code": "DNKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Datatilsynet en Dinamarca",
  "description": "El responsable del sitio web recopila datos de residentes de Dinamarca sin presentar una notificación o registrarse ante la Datatilsynet bajo la Ley de Protección de Datos de Dinamarca.",
  "severity": "serious",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1453,
  "code": "DNKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Dinamarca",
  "description": "La base de datos almacena o procesa archivos de residentes de Dinamarca sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos de Dinamarca.",
  "severity": "moderate",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1454,
  "code": "DNKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Dinamarca",
  "description": "El sitio web conserva registros de usuarios de Dinamarca más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos de Dinamarca.",
  "severity": "serious",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1455,
  "code": "DNKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Dinamarca",
  "description": "El responsable transfiere datos de residentes de Dinamarca fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos de Dinamarca.",
  "severity": "moderate",
  "reference": "Danish Data Protection Act (Databeskyttelsesloven)"
},
{
  "id": 1456,
  "code": "BELPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Bélgica",
  "description": "El sitio web recopila registros sensibles de titulares en Bélgica sin el consentimiento previo por escrito exigido por la Ley de Bélgica de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "critical",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1457,
  "code": "BELPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la APD-GBA en Bélgica",
  "description": "El responsable del sitio web recopila datos de residentes de Bélgica sin presentar una notificación o registrarse ante la APD-GBA bajo la Ley de Bélgica de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "serious",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1458,
  "code": "BELPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Bélgica",
  "description": "La base de datos almacena o procesa archivos de residentes de Bélgica sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Bélgica de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "moderate",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1459,
  "code": "BELPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Bélgica",
  "description": "El sitio web conserva registros de usuarios de Bélgica más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Bélgica de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "serious",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1460,
  "code": "BELPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Bélgica",
  "description": "El responsable transfiere datos de residentes de Bélgica fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Bélgica de Protección de las Personas Físicas respecto al Tratamiento de Datos.",
  "severity": "moderate",
  "reference": "Belgian Act of 30 July 2018 on the protection of natural persons with regard to the processing of personal data"
},
{
  "id": 1461,
  "code": "GRCPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Grecia",
  "description": "El sitio web recopila registros sensibles de titulares en Grecia sin el consentimiento previo por escrito exigido por la Ley de Grecia N° 4624/2019 de Medidas de Protección de Datos.",
  "severity": "critical",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1462,
  "code": "GRCPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la HDPA en Grecia",
  "description": "El responsable del sitio web recopila datos de residentes de Grecia sin presentar una notificación o registrarse ante la HDPA bajo la Ley de Grecia N° 4624/2019 de Medidas de Protección de Datos.",
  "severity": "serious",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1463,
  "code": "GRCPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Grecia",
  "description": "La base de datos almacena o procesa archivos de residentes de Grecia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Grecia N° 4624/2019 de Medidas de Protección de Datos.",
  "severity": "moderate",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1464,
  "code": "GRCPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Grecia",
  "description": "El sitio web conserva registros de usuarios de Grecia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Grecia N° 4624/2019 de Medidas de Protección de Datos.",
  "severity": "serious",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1465,
  "code": "GRCPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Grecia",
  "description": "El responsable transfiere datos de residentes de Grecia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Grecia N° 4624/2019 de Medidas de Protección de Datos.",
  "severity": "moderate",
  "reference": "Greek Law No. 4624/2019 on Personal Data Protection Measures"
},
{
  "id": 1466,
  "code": "PRTPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Portugal",
  "description": "El sitio web recopila registros sensibles de titulares en Portugal sin el consentimiento previo por escrito exigido por la Ley de Portugal N° 58/2019 de Normas de Ejecución del RGPD.",
  "severity": "critical",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1467,
  "code": "PRTPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la CNPD en Portugal",
  "description": "El responsable del sitio web recopila datos de residentes de Portugal sin presentar una notificación o registrarse ante la CNPD bajo la Ley de Portugal N° 58/2019 de Normas de Ejecución del RGPD.",
  "severity": "serious",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1468,
  "code": "PRTPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Portugal",
  "description": "La base de datos almacena o procesa archivos de residentes de Portugal sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Portugal N° 58/2019 de Normas de Ejecución del RGPD.",
  "severity": "moderate",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1469,
  "code": "PRTPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Portugal",
  "description": "El sitio web conserva registros de usuarios de Portugal más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Portugal N° 58/2019 de Normas de Ejecución del RGPD.",
  "severity": "serious",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1470,
  "code": "PRTPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Portugal",
  "description": "El responsable transfiere datos de residentes de Portugal fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Portugal N° 58/2019 de Normas de Ejecución del RGPD.",
  "severity": "moderate",
  "reference": "Portuguese Law No. 58/2019 on execution rules of GDPR"
},
{
  "id": 1471,
  "code": "GRLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Groenlandia",
  "description": "El sitio web recopila registros sensibles de titulares en Groenlandia sin el consentimiento previo por escrito exigido por la Ley de Procesamiento de Datos Personales de Groenlandia.",
  "severity": "critical",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1472,
  "code": "GRLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Datatilsynet en Groenlandia",
  "description": "El responsable del sitio web recopila datos de residentes de Groenlandia sin presentar una notificación o registrarse ante la Datatilsynet bajo la Ley de Procesamiento de Datos Personales de Groenlandia.",
  "severity": "serious",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1473,
  "code": "GRLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Groenlandia",
  "description": "La base de datos almacena o procesa archivos de residentes de Groenlandia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Procesamiento de Datos Personales de Groenlandia.",
  "severity": "moderate",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1474,
  "code": "GRLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Groenlandia",
  "description": "El sitio web conserva registros de usuarios de Groenlandia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Procesamiento de Datos Personales de Groenlandia.",
  "severity": "serious",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1475,
  "code": "GRLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Groenlandia",
  "description": "El responsable transfiere datos de residentes de Groenlandia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Procesamiento de Datos Personales de Groenlandia.",
  "severity": "moderate",
  "reference": "Greenlandic Act on Processing of Personal Data (Persondataloven for Grønland)"
},
{
  "id": 1476,
  "code": "FLKPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Islas Malvinas",
  "description": "El sitio web recopila registros sensibles de titulares en Islas Malvinas sin el consentimiento previo por escrito exigido por la Ordenanza de Protección de Datos de las Islas Malvinas de 2018.",
  "severity": "critical",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1477,
  "code": "FLKPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Comisionado de Protección de Datos en Islas Malvinas",
  "description": "El responsable del sitio web recopila datos de residentes de Islas Malvinas sin presentar una notificación o registrarse ante la Comisionado de Protección de Datos bajo la Ordenanza de Protección de Datos de las Islas Malvinas de 2018.",
  "severity": "serious",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1478,
  "code": "FLKPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Islas Malvinas",
  "description": "La base de datos almacena o procesa archivos de residentes de Islas Malvinas sin emplear el cifrado técnico o los controles administrativos requeridos por la Ordenanza de Protección de Datos de las Islas Malvinas de 2018.",
  "severity": "moderate",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1479,
  "code": "FLKPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Islas Malvinas",
  "description": "El sitio web conserva registros de usuarios de Islas Malvinas más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ordenanza de Protección de Datos de las Islas Malvinas de 2018.",
  "severity": "serious",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1480,
  "code": "FLKPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Islas Malvinas",
  "description": "El responsable transfiere datos de residentes de Islas Malvinas fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ordenanza de Protección de Datos de las Islas Malvinas de 2018.",
  "severity": "moderate",
  "reference": "Falkland Islands Data Protection Ordinance 2018"
},
{
  "id": 1481,
  "code": "PYFPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Polinesia Francesa",
  "description": "El sitio web recopila registros sensibles de titulares en Polinesia Francesa sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos de Francia aplicable en la Polinesia Francesa.",
  "severity": "critical",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1482,
  "code": "PYFPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la CNIL en Polinesia Francesa",
  "description": "El responsable del sitio web recopila datos de residentes de Polinesia Francesa sin presentar una notificación o registrarse ante la CNIL bajo la Ley de Protección de Datos de Francia aplicable en la Polinesia Francesa.",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1483,
  "code": "PYFPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Polinesia Francesa",
  "description": "La base de datos almacena o procesa archivos de residentes de Polinesia Francesa sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos de Francia aplicable en la Polinesia Francesa.",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1484,
  "code": "PYFPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Polinesia Francesa",
  "description": "El sitio web conserva registros de usuarios de Polinesia Francesa más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos de Francia aplicable en la Polinesia Francesa.",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1485,
  "code": "PYFPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Polinesia Francesa",
  "description": "El responsable transfiere datos de residentes de Polinesia Francesa fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos de Francia aplicable en la Polinesia Francesa.",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in French Polynesia (Loi Informatique et Libertés)"
},
{
  "id": 1486,
  "code": "NCLPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Nueva Caledonia",
  "description": "El sitio web recopila registros sensibles de titulares en Nueva Caledonia sin el consentimiento previo por escrito exigido por la Ley de Protección de Datos de Francia aplicable en Nueva Caledonia.",
  "severity": "critical",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1487,
  "code": "NCLPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la CNIL en Nueva Caledonia",
  "description": "El responsable del sitio web recopila datos de residentes de Nueva Caledonia sin presentar una notificación o registrarse ante la CNIL bajo la Ley de Protección de Datos de Francia aplicable en Nueva Caledonia.",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1488,
  "code": "NCLPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Nueva Caledonia",
  "description": "La base de datos almacena o procesa archivos de residentes de Nueva Caledonia sin emplear el cifrado técnico o los controles administrativos requeridos por la Ley de Protección de Datos de Francia aplicable en Nueva Caledonia.",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1489,
  "code": "NCLPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Nueva Caledonia",
  "description": "El sitio web conserva registros de usuarios de Nueva Caledonia más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ley de Protección de Datos de Francia aplicable en Nueva Caledonia.",
  "severity": "serious",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1490,
  "code": "NCLPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Nueva Caledonia",
  "description": "El responsable transfiere datos de residentes de Nueva Caledonia fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ley de Protección de Datos de Francia aplicable en Nueva Caledonia.",
  "severity": "moderate",
  "reference": "French Data Protection Act applicable in New Caledonia (Loi Informatique et Libertés)"
},
{
  "id": 1491,
  "code": "MSRPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Montserrat",
  "description": "El sitio web recopila registros sensibles de titulares en Montserrat sin el consentimiento previo por escrito exigido por la Proyecto de Ley de Protección de Datos de Montserrat.",
  "severity": "critical",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1492,
  "code": "MSRPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Comisionado de Protección de Datos en Montserrat",
  "description": "El responsable del sitio web recopila datos de residentes de Montserrat sin presentar una notificación o registrarse ante la Comisionado de Protección de Datos bajo la Proyecto de Ley de Protección de Datos de Montserrat.",
  "severity": "serious",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1493,
  "code": "MSRPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Montserrat",
  "description": "La base de datos almacena o procesa archivos de residentes de Montserrat sin emplear el cifrado técnico o los controles administrativos requeridos por la Proyecto de Ley de Protección de Datos de Montserrat.",
  "severity": "moderate",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1494,
  "code": "MSRPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Montserrat",
  "description": "El sitio web conserva registros de usuarios de Montserrat más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Proyecto de Ley de Protección de Datos de Montserrat.",
  "severity": "serious",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1495,
  "code": "MSRPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Montserrat",
  "description": "El responsable transfiere datos de residentes de Montserrat fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Proyecto de Ley de Protección de Datos de Montserrat.",
  "severity": "moderate",
  "reference": "Montserrat draft Data Protection Act / cybersecurity rules"
},
{
  "id": 1496,
  "code": "SHNPD-001",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos personales sensibles sin consentimiento escrito en Santa Elena",
  "description": "El sitio web recopila registros sensibles de titulares en Santa Elena sin el consentimiento previo por escrito exigido por la Ordenanza de Protección de Datos de Santa Elena.",
  "severity": "critical",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1497,
  "code": "SHNPD-002",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Tratamiento de datos sin registro del responsable ante la Comisionado de Protección de Datos en Santa Elena",
  "description": "El responsable del sitio web recopila datos de residentes de Santa Elena sin presentar una notificación o registrarse ante la Comisionado de Protección de Datos bajo la Ordenanza de Protección de Datos de Santa Elena.",
  "severity": "serious",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1498,
  "code": "SHNPD-003",
  "evidenceKind": "observable",
  "category": "Digital Operations",
  "title": "Salvaguardas de seguridad de datos inadecuadas en Santa Elena",
  "description": "La base de datos almacena o procesa archivos de residentes de Santa Elena sin emplear el cifrado técnico o los controles administrativos requeridos por la Ordenanza de Protección de Datos de Santa Elena.",
  "severity": "moderate",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1499,
  "code": "SHNPD-004",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Ciclos de retención de datos no conformes en Santa Elena",
  "description": "El sitio web conserva registros de usuarios de Santa Elena más tiempo del necesario para el fin previsto sin protocolos de supresión conformes a la Ordenanza de Protección de Datos de Santa Elena.",
  "severity": "serious",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
{
  "id": 1500,
  "code": "SHNPD-005",
  "evidenceKind": "observable",
  "category": "GDPR",
  "title": "Transferencia transfronteriza no conforme de datos de Santa Elena",
  "description": "El responsable transfiere datos de residentes de Santa Elena fuera del país sin garantizar niveles de protección adecuados o autorizaciones bajo la Ordenanza de Protección de Datos de Santa Elena.",
  "severity": "moderate",
  "reference": "Saint Helena Data Protection Ordinance / draft privacy rules"
},
  {
    "id": 1501,
    "code": "OWASP-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Vulnerabilidad de inyección SQL en campos de entrada",
    "description": "Los campos de entrada o parámetros de URL son vulnerables a la inyección SQL, permitiendo el acceso no autorizado a la base de datos.",
    "severity": "critical",
    "reference": "OWASP Top 10 A03:2021-Injection"
  },
  {
    "id": 1502,
    "code": "OWASP-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Vulnerabilidad de Cross-Site Scripting (XSS)",
    "description": "La entrada de usuario se renderiza sin sanitización, permitiendo a atacantes ejecutar scripts maliciosos en el navegador.",
    "severity": "critical",
    "reference": "OWASP Top 10 A03:2021-XSS"
  },
  {
    "id": 1503,
    "code": "OWASP-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Autenticación rota y filtración de sesiones",
    "description": "El sitio expone identificadores de sesión en las URL o usa tiempos de espera débiles, lo que permite el secuestro de sesión.",
    "severity": "critical",
    "reference": "OWASP Top 10 A07:2021-Identification & Auth"
  },
  {
    "id": 1504,
    "code": "OWASP-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Transmisión no cifrada de datos sensibles",
    "description": "Los datos sensibles de clientes se transmiten a través de HTTP o mediante protocolos TLS 1.0/1.1 obsoletos.",
    "severity": "critical",
    "reference": "OWASP Top 10 A02:2021-Cryptographic Failures"
  },
  {
    "id": 1505,
    "code": "OWASP-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Control de acceso roto a nivel de objetos",
    "description": "La API o el endpoint no verifica si el usuario autenticado tiene permisos para acceder al ID de recurso solicitado.",
    "severity": "critical",
    "reference": "OWASP Top 10 A01:2021-Broken Access Control"
  },
  {
    "id": 1506,
    "code": "OWASP-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Modo depuración activo en entorno de producción",
    "description": "Los registros de errores detallados y trazas de pila son visibles para los usuarios, filtrando rutas y variables del sistema.",
    "severity": "serious",
    "reference": "OWASP Top 10 A05:2021-Security Misconfig"
  },
  {
    "id": 1507,
    "code": "OWASP-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Vulnerabilidad de inyección de entidades externas XML (XXE)",
    "description": "El analizador XML acepta entidades externas, permitiendo leer archivos locales o realizar ataques SSRF.",
    "severity": "serious",
    "reference": "OWASP Top 10 A05:2021-XXE"
  },
  {
    "id": 1508,
    "code": "OWASP-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Deserialización insegura de entradas no confiables",
    "description": "La aplicación deserializa objetos controlados por el usuario sin validación, lo que puede resultar en RCE.",
    "severity": "serious",
    "reference": "OWASP Top 10 A08:2021-Software Integrity"
  },
  {
    "id": 1509,
    "code": "OWASP-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Bibliotecas obsoletas con vulnerabilidades conocidas",
    "description": "El frontend ejecuta paquetes NPM, plugins de WordPress o bibliotecas JQuery desactualizados con CVE abiertas.",
    "severity": "serious",
    "reference": "OWASP Top 10 A06:2021-Vulnerable Components"
  },
  {
    "id": 1510,
    "code": "OWASP-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Registro y auditoría de seguridad insuficientes",
    "description": "Las acciones críticas (cambios de contraseña, inicios de sesión de administrador) no se registran, dificultando el análisis forense.",
    "severity": "moderate",
    "reference": "OWASP Top 10 A09:2021-Logging & Monitoring"
  },
  {
    "id": 1511,
    "code": "NISTP-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Políticas de control de acceso inadecuadas",
    "description": "La falta de controles de acceso basados en roles (RBAC) permite a usuarios estándar ver registros de administración.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 AC-2"
  },
  {
    "id": 1512,
    "code": "NISTP-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de generación de registros de auditoría",
    "description": "La aplicación no registra cambios de configuración de API ni creación de usuarios en un almacén inmutable.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 AU-2"
  },
  {
    "id": 1513,
    "code": "NISTP-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Gestión de configuración ineficaz",
    "description": "No existen configuraciones base para el software del servidor, lo que genera niveles de seguridad inconsistentes.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 CM-2"
  },
  {
    "id": 1514,
    "code": "NISTP-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de autenticación multifactor para administradores",
    "description": "Los accesos administrativos usan autenticación de factor único, violando los estándares de seguridad de identidad.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 IA-2"
  },
  {
    "id": 1515,
    "code": "NISTP-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Integración inadecuada del plan de respuesta a incidentes",
    "description": "El sitio carece de alertas automáticas para activar los procedimientos del equipo de respuesta durante ataques activos.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 IR-4"
  },
  {
    "id": 1516,
    "code": "NISTP-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Seguimiento inadecuado del mantenimiento del sistema",
    "description": "Los escaneos de vulnerabilidad no están programados de manera formal, retrasando la detección de CVE críticas.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 MA-2"
  },
  {
    "id": 1517,
    "code": "NISTP-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de protección de medios y cifrado de copias de seguridad",
    "description": "Las copias de seguridad con datos personales se almacenan en buckets de la nube pública sin cifrado.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 MP-4"
  },
  {
    "id": 1518,
    "code": "NISTP-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de registros de acceso a la sala de servidores",
    "description": "Para servidores autohospedados, falta el registro de accesos físicos a las unidades de almacenamiento.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 PE-2"
  },
  {
    "id": 1519,
    "code": "NISTP-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Registros de capacitación de seguridad inadecuados",
    "description": "Los administradores de sistemas que manejan credenciales carecen de capacitación documentada en ciberseguridad.",
    "severity": "moderate",
    "reference": "NIST SP 800-53 Rev. 5 PS-8"
  },
  {
    "id": 1520,
    "code": "NISTP-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de límites de red y controles DNSSEC",
    "description": "El dominio carece de firmas DNSSEC, exponiendo a usuarios a la suplantación de DNS y redirección intermedia.",
    "severity": "serious",
    "reference": "NIST SP 800-53 Rev. 5 SC-7"
  },
  {
    "id": 1521,
    "code": "ISO27-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Políticas de seguridad de la información inadecuadas",
    "description": "La empresa opera sin una política formal de seguridad de la información revisada anualmente por la dirección.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.1"
  },
  {
    "id": 1522,
    "code": "ISO27-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de roles y autoridades de seguridad definidos",
    "description": "No se ha designado a ningún responsable para supervisar el cumplimiento de la seguridad de datos.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.2"
  },
  {
    "id": 1523,
    "code": "ISO27-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Inventario de activos de datos de clientes inadecuado",
    "description": "La base de datos opera sin un inventario que clasifique dónde se almacenan los datos de clientes.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.9"
  },
  {
    "id": 1524,
    "code": "ISO27-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Uso débil de criptografía para contraseñas de usuario",
    "description": "Las contraseñas de los usuarios se cifran con MD5 o SHA1 débiles y sin configuración de sal.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.24"
  },
  {
    "id": 1525,
    "code": "ISO27-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Seguridad física inadecuada para servidores web",
    "description": "Los servidores físicos que albergan las bases de datos carecen de controles de detección de manipulaciones.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.7.1"
  },
  {
    "id": 1526,
    "code": "ISO27-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Seguridad de operaciones deficiente y copias no verificadas",
    "description": "Los ciclos de recuperación no se prueban de manera periódica, arriesgando la pérdida de datos durante la restauración.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.13"
  },
  {
    "id": 1527,
    "code": "ISO27-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Arquitectura de red insegura y controles de enrutamiento débiles",
    "description": "Los nodos de base de datos son accesibles directamente desde direcciones IP públicas sin intermediarios.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.20"
  },
  {
    "id": 1528,
    "code": "ISO27-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de estándares de desarrollo de software seguro",
    "description": "El equipo de desarrollo opera sin una política de codificación segura que prevenga inyecciones SQL y XSS.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.8.25"
  },
  {
    "id": 1529,
    "code": "ISO27-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de requisitos de seguridad en acuerdos con proveedores",
    "description": "Los contratos con pasarelas de pago y proveedores de SaaS carecen de cláusulas de seguridad definidas.",
    "severity": "moderate",
    "reference": "ISO/IEC 27001:2022 Control A.5.19"
  },
  {
    "id": 1530,
    "code": "ISO27-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de gestión de incidentes y rutas de escalamiento",
    "description": "No existen procedimientos para escalar intrusiones del sistema desde los operadores de TI a la dirección.",
    "severity": "serious",
    "reference": "ISO/IEC 27001:2022 Control A.5.24"
  },
  {
    "id": 1531,
    "code": "SOC2P-001",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Monitoreo del sistema inadecuado para anomalías de seguridad",
    "description": "Los registros del servidor muestran falta de sistemas automáticos de detección de intrusos (IDS).",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.8"
  },
  {
    "id": 1532,
    "code": "SOC2P-002",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Credenciales de acceso débiles y falta de MFA",
    "description": "Los controles permiten contraseñas simples en endpoints de administración sin exigir verificación de MFA.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.3"
  },
  {
    "id": 1533,
    "code": "SOC2P-003",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Protección de transmisión de datos insuficiente",
    "description": "Las rutas API del sitio web utilizan protocolos HTTP obsoletos y carecen de cabeceras HSTS.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.7"
  },
  {
    "id": 1534,
    "code": "SOC2P-004",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Políticas de clasificación de datos débiles",
    "description": "Los registros internos carecen de etiquetas para identificar qué formularios almacenan credenciales confidenciales.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC6.1"
  },
  {
    "id": 1535,
    "code": "SOC2P-005",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de infraestructura de gestión de vulnerabilidades",
    "description": "El código opera sin herramientas integradas para identificar dependencias vulnerables en los procesos CI/CD.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC7.1"
  },
  {
    "id": 1536,
    "code": "SOC2P-006",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de pruebas de disponibilidad y conmutación por error",
    "description": "El entorno de alojamiento carece de pruebas de conmutación por error automáticas para la base de datos.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC8.1"
  },
  {
    "id": 1537,
    "code": "SOC2P-007",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Integridad de procesamiento débil para transacciones",
    "description": "Los endpoints de pago no emplean tokens de verificación, lo que permite la alteración de parámetros.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC9.1"
  },
  {
    "id": 1538,
    "code": "SOC2P-008",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Protección de confidencialidad inadecuada en el almacenamiento",
    "description": "Los archivos de identificación se almacenan junto a activos públicos sin comprobaciones de autorización.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC6.6"
  },
  {
    "id": 1539,
    "code": "SOC2P-009",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Gestión del ciclo de vida de los datos débil",
    "description": "El sistema conserva los perfiles indefinidamente sin procedimientos para eliminar entradas obsoletas.",
    "severity": "moderate",
    "reference": "SOC 2 Trust Services Criteria CC6.5"
  },
  {
    "id": 1540,
    "code": "SOC2P-010",
    "evidenceKind": "indicative",
    "category": "PCI-DSS / Security",
    "title": "Falta de control de cambios y revisión por pares",
    "description": "Los commits de código se implementan en producción sin las aprobaciones obligatorias de pull requests.",
    "severity": "serious",
    "reference": "SOC 2 Trust Services Criteria CC8.1-Change"
  },
  {
    "id": 1541,
    "code": "CISA-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Contraseñas administrativas por defecto habilitadas",
    "description": "Los endpoints de bases de datos o CMS usan contraseñas genéricas, exponiendo los sistemas al control de bots.",
    "severity": "critical",
    "reference": "CISA Cybersecurity Performance Goal 1.1"
  },
  {
    "id": 1542,
    "code": "CISA-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de MFA para consolas de administración",
    "description": "El acceso administrativo a paneles de hosting, nodos de base de datos o consolas de API carece de requisitos de MFA.",
    "severity": "critical",
    "reference": "CISA Cybersecurity Performance Goal 1.2"
  },
  {
    "id": 1543,
    "code": "CISA-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Vulnerabilidades conocidas explotadas en el software web",
    "description": "El servidor ejecuta dependencias enumeradas en el catálogo de vulnerabilidades explotadas (KEV) de la CISA.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.1"
  },
  {
    "id": 1544,
    "code": "CISA-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Inventario de activos expuestos a Internet ineficaz",
    "description": "La empresa no registra los dominios públicos, exponiendo subdominios huérfanos al secuestro.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.2"
  },
  {
    "id": 1545,
    "code": "CISA-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de controles de protección de integridad de DNS",
    "description": "El registro del dominio carece de bloqueo de registro, exponiendo los registros a cambios no autorizados.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 2.3"
  },
  {
    "id": 1546,
    "code": "CISA-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Estándares de autenticación de correo inseguros (sin DMARC)",
    "description": "El dominio carece de configuración DMARC, permitiendo enviar correos fraudulentos en nombre del sitio web.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 2.4"
  },
  {
    "id": 1547,
    "code": "CISA-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Falta de ejercicios de incidentes de seguridad",
    "description": "No se han realizado pruebas para verificar los procedimientos ante ransomware o brechas de datos.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 3.1"
  },
  {
    "id": 1548,
    "code": "CISA-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Protocolos de acceso remoto inseguros habilitados",
    "description": "El entorno de alojamiento expone interfaces Telnet o HTTP no cifradas para la gestión remota.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 1.3"
  },
  {
    "id": 1549,
    "code": "CISA-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Aislamiento de copias de seguridad de datos inadecuado",
    "description": "Las copias de seguridad se almacenan en la misma subred de red, arriesgando su pérdida conjunta.",
    "severity": "serious",
    "reference": "CISA Cybersecurity Performance Goal 4.1"
  },
  {
    "id": 1550,
    "code": "CISA-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Escaneo de vulnerabilidades interno ineficaz",
    "description": "El servidor no se somete a escaneos semanales de vulnerabilidades en los endpoints públicos.",
    "severity": "moderate",
    "reference": "CISA Cybersecurity Performance Goal 2.5"
  },
  {
    "id": 1551,
    "code": "EUDSA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de punto de contacto directo para autoridades",
    "description": "El sitio carece de una dirección de contacto electrónico designada para comunicarse directamente con las autoridades de la UE.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 11"
  },
  {
    "id": 1552,
    "code": "EUDSA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de términos sobre reglas de moderación de contenido",
    "description": "Los términos de servicio no revelan filtros algorítmicos ni políticas de revisión humana para moderar comentarios.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 14"
  },
  {
    "id": 1553,
    "code": "EUDSA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de transparencia en los parámetros del sistema de recomendaciones",
    "description": "El sitio presenta recomendaciones de productos sin explicar los principales factores de ordenación.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 27"
  },
  {
    "id": 1554,
    "code": "EUDSA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Manipulación de interfaz no conforme (patrones oscuros)",
    "description": "El diseño utiliza elementos engañosos para forzar suscripciones preseleccionando opciones.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 25"
  },
  {
    "id": 1555,
    "code": "EUDSA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Anuncios en línea y patrocinadores no etiquetados",
    "description": "Los enlaces promocionales pagados se muestran sin etiquetas claras que identifiquen al comprador.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 26"
  },
  {
    "id": 1556,
    "code": "EUDSA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de mecanismo de notificación y acción para usuarios",
    "description": "El portal no proporciona un formulario accesible para que los usuarios reporten contenido ilegal.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 16"
  },
  {
    "id": 1557,
    "code": "EUDSA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Reglas de suspensión de usuarios no conformes",
    "description": "El sitio bloquea cuentas o elimina artículos de vendedores sin proporcionar una justificación por escrito.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 20"
  },
  {
    "id": 1558,
    "code": "EUDSA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de declaración de motivos en el directorio público",
    "description": "El sitio modera comentarios sin publicar sus decisiones en la base de datos de la DSA de la UE.",
    "severity": "moderate",
    "reference": "EU Digital Services Act (DSA) Article 17"
  },
  {
    "id": 1559,
    "code": "EUDSA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Sistema de gestión de quejas inadecuado",
    "description": "El sitio no ofrece un mecanismo de apelación para que los usuarios impugnen decisiones de moderación.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 20-Appeal"
  },
  {
    "id": 1560,
    "code": "EUDSA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Políticas engañosas de segmentación de anuncios",
    "description": "El sitio utiliza datos personales sensibles (religión, salud) para orientar banners promocionales.",
    "severity": "serious",
    "reference": "EU Digital Services Act (DSA) Article 26-Target"
  },
  {
    "id": 1561,
    "code": "EUDMA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Autopreferenciación desleal en listados de productos",
    "description": "El buscador de la tienda posiciona sus propios productos por encima de los de vendedores externos.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(5)"
  },
  {
    "id": 1562,
    "code": "EUDMA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Combinación ilegal de datos de múltiples fuentes",
    "description": "El portal combina datos de usuarios de servicios principales con píxeles externos sin consentimiento.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 5(2)"
  },
  {
    "id": 1563,
    "code": "EUDMA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Restricción de instalación de software de terceros",
    "description": "El portal restringe el uso de integraciones de pago o navegadores externos en su marco de página.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(3)"
  },
  {
    "id": 1564,
    "code": "EUDMA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Restricción de portabilidad de datos de usuarios comerciales",
    "description": "El panel de control impide a los vendedores exportar su historial de transacciones a servidores externos.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(9)"
  },
  {
    "id": 1565,
    "code": "EUDMA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Informes de rendimiento publicitario desleales",
    "description": "El sistema cobra por publicidad sin proporcionar métricas de rendimiento diarias gratuitas.",
    "severity": "moderate",
    "reference": "EU Digital Markets Act (DMA) Article 5(9)"
  },
  {
    "id": 1566,
    "code": "EUDMA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Restricción de paridad de precios multiplataforma",
    "description": "Los términos penalizan a comerciantes por ofrecer precios más bajos en sus propios canales directos.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 5(3)"
  },
  {
    "id": 1567,
    "code": "EUDMA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Implementación engañosa de pantalla de elección",
    "description": "El sistema configura buscadores predeterminados sin presentar opciones imparciales durante el registro.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(3)-Choice"
  },
  {
    "id": 1568,
    "code": "EUDMA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Restricción de interoperabilidad de servicios de la plataforma",
    "description": "La API restringe que herramientas de terceros se vinculen con el sistema de mensajería principal.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(7)"
  },
  {
    "id": 1569,
    "code": "EUDMA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Flujos de cancelación de suscripción complejos y engañosos",
    "description": "El portal obliga a usuarios comerciales a pasar por confirmaciones telefónicas para cancelar el servicio.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(13)"
  },
  {
    "id": 1570,
    "code": "EUDMA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Explotación ilegal de datos de ventas de usuarios comerciales",
    "description": "El host utiliza datos no públicos de transacciones de vendedores para lanzar productos propios.",
    "severity": "serious",
    "reference": "EU Digital Markets Act (DMA) Article 6(2)"
  },
  {
    "id": 1571,
    "code": "UKAAC-001",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Verificación de edad inadecuada para contenido sensible",
    "description": "El portal utiliza un botón simple de autodeclaración para la verificación de edad en medios para adultos.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 3"
  },
  {
    "id": 1572,
    "code": "UKAAC-002",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Seguimiento de alto riesgo activo por defecto para menores",
    "description": "La geolocalización y el seguimiento de comportamiento están activos por defecto al registrarse.",
    "severity": "critical",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 6"
  },
  {
    "id": 1573,
    "code": "UKAAC-003",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Divulgaciones de privacidad complejas para audiencias jóvenes",
    "description": "La política de privacidad utiliza términos legales complejos en lugar de explicaciones sencillas para niños.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 4"
  },
  {
    "id": 1574,
    "code": "UKAAC-004",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Técnicas de diseño persuasivo engañosas dirigidas a menores",
    "description": "El diseño persuade a niños a reducir su nivel de privacidad con notificaciones coloridas y recompensas.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 9"
  },
  {
    "id": 1575,
    "code": "UKAAC-005",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Perfilado automático ilegal de menores",
    "description": "El feed de recomendaciones analiza por defecto los hábitos de niños para mostrar contenido adictivo.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 11"
  },
  {
    "id": 1576,
    "code": "UKAAC-006",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Falta de notificaciones de seguimiento parental",
    "description": "La aplicación carece de un icono destacado que informe a los niños si los padres rastrean sus sesiones.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 13"
  },
  {
    "id": 1577,
    "code": "UKAAC-007",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Compartición ilegal de datos de niños con anunciantes",
    "description": "El portal comparte cookies de seguimiento de menores con redes publicitarias sin consentimiento explícito.",
    "severity": "critical",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 12"
  },
  {
    "id": 1578,
    "code": "UKAAC-008",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Minimización de datos inadecuada para menores de 18 años",
    "description": "El formulario solicita datos opcionales (pasatiempos, escuela) a usuarios identificados como menores.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 8"
  },
  {
    "id": 1579,
    "code": "UKAAC-009",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Prácticas de segmentación de marketing dañinas para niños",
    "description": "El sitio muestra banners orientados aprovechando las debilidades conductuales o inseguridades de menores.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 5"
  },
  {
    "id": 1580,
    "code": "UKAAC-010",
    "evidenceKind": "observable",
    "category": "GDPR",
    "title": "Configuración de perfil de menores insegura por defecto",
    "description": "Los perfiles de menores tienen visibilidad pública por defecto, permitiendo ver sus datos sin autenticarse.",
    "severity": "serious",
    "reference": "UK Age Appropriate Design Code (Children\'s Code) Standard 7"
  },
  {
    "id": 1581,
    "code": "CAAAC-001",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de DPIA para servicios accedidos por menores",
    "description": "El responsable no documenta una Evaluación de Impacto de Protección de Datos (DPIA) para funciones infantiles.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(1)"
  },
  {
    "id": 1582,
    "code": "CAAAC-002",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Implementación de aseguramiento de edad engañosa",
    "description": "El sitio no estima la edad de los usuarios con certeza, exponiendo a menores a salas de chat para adultos.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(5)"
  },
  {
    "id": 1583,
    "code": "CAAAC-003",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Configuración de alta privacidad por defecto desactivada",
    "description": "El sitio configura opciones de baja privacidad para visitantes menores de 18 años al registrarse.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(6)"
  },
  {
    "id": 1584,
    "code": "CAAAC-004",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Perfilado conductual automatizado ilegal de menores",
    "description": "El sitio analiza las búsquedas de menores para crear perfiles publicitarios sin consentimiento parental.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(2)"
  },
  {
    "id": 1585,
    "code": "CAAAC-005",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Venta ilegal de datos de menores verificados",
    "description": "La plataforma vende o comparte datos de usuarios menores de 18 años sin la autorización requerida.",
    "severity": "critical",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(1)"
  },
  {
    "id": 1586,
    "code": "CAAAC-006",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de indicadores de seguimiento activo para menores",
    "description": "La aplicación registra la ubicación de menores sin mostrar un símbolo de seguimiento visual permanente.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(7)"
  },
  {
    "id": 1587,
    "code": "CAAAC-007",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Patrones de diseño persuasivo para eludir la privacidad",
    "description": "Los flujos usan gamificación para convencer a menores de desactivar las protecciones por defecto.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(7)"
  },
  {
    "id": 1588,
    "code": "CAAAC-008",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Términos de servicio complejos para menores",
    "description": "Los términos están redactados con un nivel de lectura complejo, violando los estándares para menores.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(8)"
  },
  {
    "id": 1589,
    "code": "CAAAC-009",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Recopilación ilegal de historial de geolocalización de menores",
    "description": "El servidor registra coordenadas precisas de menores de 18 años sin necesidad inmediata del servicio.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(b)(8)"
  },
  {
    "id": 1590,
    "code": "CAAAC-010",
    "evidenceKind": "observable",
    "category": "CCPA / CPRA",
    "title": "Falta de controles de eliminación y borrado de perfil",
    "description": "El panel de usuario no ofrece un botón de eliminación inmediata para que los menores borren su perfil.",
    "severity": "serious",
    "reference": "Cal. Civ. Code § 1798.99.31(a)(9)"
  },
  {
    "id": 1591,
    "code": "EUAIA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de interacción con IA",
    "description": "El chatbot opera en el sitio sin informar explícitamente a los usuarios que se comunican con una IA.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(1)"
  },
  {
    "id": 1592,
    "code": "EUAIA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación de contenido generado por IA",
    "description": "Las imágenes sintéticas o noticias de IA carecen de marcas legibles por máquina que detecten su origen artificial.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(3)"
  },
  {
    "id": 1593,
    "code": "EUAIA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Uso prohibido de sistemas de reconocimiento de emociones",
    "description": "El sitio emplea IA para analizar las emociones de candidatos durante pruebas de empleo en línea.",
    "severity": "critical",
    "reference": "EU AI Act Article 5(1)(f)"
  },
  {
    "id": 1594,
    "code": "EUAIA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Implementación ilegal de clasificación biométrica",
    "description": "La analítica de IA clasifica a los visitantes según perfiles biométricos para mostrar catálogos por género.",
    "severity": "critical",
    "reference": "EU AI Act Article 5(1)(g)"
  },
  {
    "id": 1595,
    "code": "EUAIA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de divulgación en imágenes y videos deepfake",
    "description": "Se cargan videos o audios modificados realistas sin advertencias explícitas de contenido alterado.",
    "severity": "serious",
    "reference": "EU AI Act Article 52(3)-Deepfake"
  },
  {
    "id": 1596,
    "code": "EUAIA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Gestión de riesgos de sistemas de IA de alto riesgo inadecuada",
    "description": "El portal despliega software de clasificación de CVs automatizado sin pruebas ni gestión de riesgos.",
    "severity": "serious",
    "reference": "EU AI Act Article 9"
  },
  {
    "id": 1597,
    "code": "EUAIA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de registro de actividad para sistemas de IA de alto riesgo",
    "description": "Los modelos de precios automáticos operan sin registrar los parámetros de entrada.",
    "severity": "serious",
    "reference": "EU AI Act Article 12"
  },
  {
    "id": 1598,
    "code": "EUAIA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de supervisión humana en selección automatizada",
    "description": "El filtrado de candidatos por IA rechaza postulaciones de forma automática sin revisión humana.",
    "severity": "serious",
    "reference": "EU AI Act Article 14"
  },
  {
    "id": 1599,
    "code": "EUAIA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Recopilación ilegal de datos web para entrenamiento de IA",
    "description": "Los agentes recopilan imágenes con derechos de autor del sitio para entrenar IA ignorando la exclusión voluntaria.",
    "severity": "serious",
    "reference": "EU AI Act Article 53(1)(c)"
  },
  {
    "id": 1600,
    "code": "EUAIA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Integración insegura de base de datos de IA de alto riesgo",
    "description": "El modelo de elegibilidad crediticia opera en el servidor sin registrarse en la base de datos de IA de la UE.",
    "severity": "serious",
    "reference": "EU AI Act Article 60"
  },
  {
    "id": 1601,
    "code": "TXDPS-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1602,
    "code": "TXDPS-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1603,
    "code": "TXDPS-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1604,
    "code": "TXDPS-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exportación de portabilidad bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "moderate",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1605,
    "code": "TXDPS-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1606,
    "code": "TXDPS-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1607,
    "code": "TXDPS-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "moderate",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1608,
    "code": "TXDPS-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "critical",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1609,
    "code": "TXDPS-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "serious",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1610,
    "code": "TXDPS-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Privacidad и Seguridad de Datos de Texas (TDPSA).",
    "severity": "critical",
    "reference": "Texas Data Privacy and Security Act (TDPSA)"
  },
  {
    "id": 1611,
    "code": "VCDPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1612,
    "code": "VCDPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1613,
    "code": "VCDPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1614,
    "code": "VCDPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exportación de portabilidad bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "moderate",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1615,
    "code": "VCDPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1616,
    "code": "VCDPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1617,
    "code": "VCDPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "moderate",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1618,
    "code": "VCDPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "critical",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1619,
    "code": "VCDPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "serious",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1620,
    "code": "VCDPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Protección de Datos del Consumidor de Virginia (VCDPA).",
    "severity": "critical",
    "reference": "Virginia Consumer Data Protection Act (VCDPA)"
  },
  {
    "id": 1621,
    "code": "COPR-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1622,
    "code": "COPR-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1623,
    "code": "COPR-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1624,
    "code": "COPR-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exportación de portabilidad bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "moderate",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1625,
    "code": "COPR-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1626,
    "code": "COPR-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1627,
    "code": "COPR-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "moderate",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1628,
    "code": "COPR-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "critical",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1629,
    "code": "COPR-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "serious",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1630,
    "code": "COPR-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Privacidad de Colorado (CPA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Privacidad de Colorado (CPA).",
    "severity": "critical",
    "reference": "Colorado Privacy Act (CPA)"
  },
  {
    "id": 1631,
    "code": "CTDPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1632,
    "code": "CTDPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1633,
    "code": "CTDPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1634,
    "code": "CTDPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exportación de portabilidad bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "moderate",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1635,
    "code": "CTDPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1636,
    "code": "CTDPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1637,
    "code": "CTDPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "moderate",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1638,
    "code": "CTDPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "critical",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1639,
    "code": "CTDPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "serious",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1640,
    "code": "CTDPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Privacidad de Datos de Connecticut (CTDPA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Privacidad de Datos de Connecticut (CTDPA).",
    "severity": "critical",
    "reference": "Connecticut Data Privacy Act (CTDPA)"
  },
  {
    "id": 1641,
    "code": "UCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1642,
    "code": "UCPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1643,
    "code": "UCPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1644,
    "code": "UCPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exportación de portabilidad bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "moderate",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1645,
    "code": "UCPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1646,
    "code": "UCPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1647,
    "code": "UCPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "moderate",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1648,
    "code": "UCPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "critical",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1649,
    "code": "UCPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "serious",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1650,
    "code": "UCPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Privacidad del Consumidor de Utah (UCPA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Privacidad del Consumidor de Utah (UCPA).",
    "severity": "critical",
    "reference": "Utah Consumer Privacy Act (UCPA)"
  },
  {
    "id": 1651,
    "code": "ORCPA-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1652,
    "code": "ORCPA-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1653,
    "code": "ORCPA-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1654,
    "code": "ORCPA-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exportación de portabilidad bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "moderate",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1655,
    "code": "ORCPA-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1656,
    "code": "ORCPA-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1657,
    "code": "ORCPA-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "moderate",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1658,
    "code": "ORCPA-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "critical",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1659,
    "code": "ORCPA-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "serious",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1660,
    "code": "ORCPA-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Privacidad del Consumidor de Oregón (OCPA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Privacidad del Consumidor de Oregón (OCPA).",
    "severity": "critical",
    "reference": "Oregon Consumer Privacy Act (OCPA)"
  },
  {
    "id": 1661,
    "code": "FLORDB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Canal de acceso a datos no disponible bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1662,
    "code": "FLORDB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de procedimiento de rectificación bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1663,
    "code": "FLORDB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de portal de eliminación de datos bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1664,
    "code": "FLORDB-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exportación de portabilidad bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "moderate",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1665,
    "code": "FLORDB-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de opción de exclusión de publicidad bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1666,
    "code": "FLORDB-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de venta de datos bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1667,
    "code": "FLORDB-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de perfilado automatizado bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "moderate",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1668,
    "code": "FLORDB-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "critical",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1669,
    "code": "FLORDB-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de evaluación de impacto de datos bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "serious",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1670,
    "code": "FLORDB-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de recopilación de datos no conforme bajo la Carta de Derechos Digitales de Florida (FDBR)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Carta de Derechos Digitales de Florida (FDBR).",
    "severity": "critical",
    "reference": "Florida Digital Bill of Rights (FDBR)"
  },
  {
    "id": 1671,
    "code": "PIPEDA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1672,
    "code": "PIPEDA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1673,
    "code": "PIPEDA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1674,
    "code": "PIPEDA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "moderate",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1675,
    "code": "PIPEDA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1676,
    "code": "PIPEDA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1677,
    "code": "PIPEDA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "moderate",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1678,
    "code": "PIPEDA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "critical",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1679,
    "code": "PIPEDA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "serious",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1680,
    "code": "PIPEDA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Protección de Información Personal y Documentos Electrónicos de Canadá (PIPEDA).",
    "severity": "critical",
    "reference": "Canada Personal Information Protection and Electronic Documents Act (PIPEDA)"
  },
  {
    "id": 1681,
    "code": "LAW25-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley 25 de Quebec",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley 25 de Quebec.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1682,
    "code": "LAW25-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley 25 de Quebec",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley 25 de Quebec.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1683,
    "code": "LAW25-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley 25 de Quebec",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley 25 de Quebec.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1684,
    "code": "LAW25-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley 25 de Quebec",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley 25 de Quebec.",
    "severity": "moderate",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1685,
    "code": "LAW25-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley 25 de Quebec",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley 25 de Quebec.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1686,
    "code": "LAW25-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley 25 de Quebec",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley 25 de Quebec.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1687,
    "code": "LAW25-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley 25 de Quebec",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley 25 de Quebec.",
    "severity": "moderate",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1688,
    "code": "LAW25-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley 25 de Quebec",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley 25 de Quebec.",
    "severity": "critical",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1689,
    "code": "LAW25-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley 25 de Quebec",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley 25 de Quebec.",
    "severity": "serious",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1690,
    "code": "LAW25-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley 25 de Quebec",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley 25 de Quebec.",
    "severity": "critical",
    "reference": "Quebec Law 25"
  },
  {
    "id": 1691,
    "code": "TDDDG-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Canal de acceso a datos no disponible bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1692,
    "code": "TDDDG-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de procedimiento de rectificación bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1693,
    "code": "TDDDG-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de portal de eliminación de datos bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1694,
    "code": "TDDDG-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exportación de portabilidad bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "moderate",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1695,
    "code": "TDDDG-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1696,
    "code": "TDDDG-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de venta de datos bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1697,
    "code": "TDDDG-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "moderate",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1698,
    "code": "TDDDG-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "critical",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1699,
    "code": "TDDDG-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de evaluación de impacto de datos bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "serious",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1700,
    "code": "TDDDG-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley Alemana de Protección de Datos de Telecomunicaciones y Telemedios (TDDDG).",
    "severity": "critical",
    "reference": "German Telecommunications-Telemedia Data Protection Act (TDDDG)"
  },
  {
    "id": 1701,
    "code": "SGPDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1702,
    "code": "SGPDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1703,
    "code": "SGPDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1704,
    "code": "SGPDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1705,
    "code": "SGPDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1706,
    "code": "SGPDPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1707,
    "code": "SGPDPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "moderate",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1708,
    "code": "SGPDPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1709,
    "code": "SGPDPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "serious",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1710,
    "code": "SGPDPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Protección de Datos Personales de Singapur (PDPA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Protección de Datos Personales de Singapur (PDPA).",
    "severity": "critical",
    "reference": "Singapore Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1711,
    "code": "AUSAPP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1712,
    "code": "AUSAPP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1713,
    "code": "AUSAPP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1714,
    "code": "AUSAPP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "moderate",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1715,
    "code": "AUSAPP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1716,
    "code": "AUSAPP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1717,
    "code": "AUSAPP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "moderate",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1718,
    "code": "AUSAPP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "critical",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1719,
    "code": "AUSAPP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Principios de Privacidad de Australia (APPs)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "serious",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1720,
    "code": "AUSAPP-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Principios de Privacidad de Australia (APPs)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Principios de Privacidad de Australia (APPs).",
    "severity": "critical",
    "reference": "Australian Privacy Principles (APPs)"
  },
  {
    "id": 1721,
    "code": "NZPRIV-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1722,
    "code": "NZPRIV-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1723,
    "code": "NZPRIV-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1724,
    "code": "NZPRIV-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1725,
    "code": "NZPRIV-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1726,
    "code": "NZPRIV-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1727,
    "code": "NZPRIV-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "moderate",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1728,
    "code": "NZPRIV-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1729,
    "code": "NZPRIV-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "serious",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1730,
    "code": "NZPRIV-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Privacidad de Nueva Zelanda de 2020",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Privacidad de Nueva Zelanda de 2020.",
    "severity": "critical",
    "reference": "New Zealand Privacy Act 2020"
  },
  {
    "id": 1731,
    "code": "JPAPPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1732,
    "code": "JPAPPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1733,
    "code": "JPAPPI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1734,
    "code": "JPAPPI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1735,
    "code": "JPAPPI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1736,
    "code": "JPAPPI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1737,
    "code": "JPAPPI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "moderate",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1738,
    "code": "JPAPPI-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1739,
    "code": "JPAPPI-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "serious",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1740,
    "code": "JPAPPI-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Protección de Información Personal de Japón (APPI)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Protección de Información Personal de Japón (APPI).",
    "severity": "critical",
    "reference": "Japan Act on the Protection of Personal Information (APPI)"
  },
  {
    "id": 1741,
    "code": "KRPIPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1742,
    "code": "KRPIPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1743,
    "code": "KRPIPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1744,
    "code": "KRPIPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1745,
    "code": "KRPIPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1746,
    "code": "KRPIPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1747,
    "code": "KRPIPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "moderate",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1748,
    "code": "KRPIPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1749,
    "code": "KRPIPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "serious",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1750,
    "code": "KRPIPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Protección de Información Personal de Corea del Sur (PIPA).",
    "severity": "critical",
    "reference": "South Korea Personal Information Protection Act (PIPA)"
  },
  {
    "id": 1751,
    "code": "VNDPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1752,
    "code": "VNDPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1753,
    "code": "VNDPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1754,
    "code": "VNDPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "moderate",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1755,
    "code": "VNDPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1756,
    "code": "VNDPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1757,
    "code": "VNDPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "moderate",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1758,
    "code": "VNDPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "critical",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1759,
    "code": "VNDPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "serious",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1760,
    "code": "VNDPD-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Decreto de Protección de Datos Personales de Vietnam N° 13/2023/ND-CP.",
    "severity": "critical",
    "reference": "Vietnam Personal Data Protection Decree 13/2023/ND-CP"
  },
  {
    "id": 1761,
    "code": "THPDPA-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1762,
    "code": "THPDPA-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1763,
    "code": "THPDPA-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1764,
    "code": "THPDPA-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1765,
    "code": "THPDPA-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1766,
    "code": "THPDPA-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1767,
    "code": "THPDPA-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "moderate",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1768,
    "code": "THPDPA-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1769,
    "code": "THPDPA-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "serious",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1770,
    "code": "THPDPA-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Protección de Datos Personales de Tailandia (PDPA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Protección de Datos Personales de Tailandia (PDPA).",
    "severity": "critical",
    "reference": "Thailand Personal Data Protection Act (PDPA)"
  },
  {
    "id": 1771,
    "code": "INDPDP-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1772,
    "code": "INDPDP-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1773,
    "code": "INDPDP-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1774,
    "code": "INDPDP-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "moderate",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1775,
    "code": "INDPDP-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1776,
    "code": "INDPDP-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1777,
    "code": "INDPDP-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "moderate",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1778,
    "code": "INDPDP-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "critical",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1779,
    "code": "INDPDP-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "serious",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1780,
    "code": "INDPDP-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Protección de Datos Personales Digitales de India 2023 (DPDP).",
    "severity": "critical",
    "reference": "India Digital Personal Data Protection Act 2023 (DPDP)"
  },
  {
    "id": 1781,
    "code": "BRLGPD-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1782,
    "code": "BRLGPD-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1783,
    "code": "BRLGPD-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1784,
    "code": "BRLGPD-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "moderate",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1785,
    "code": "BRLGPD-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1786,
    "code": "BRLGPD-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1787,
    "code": "BRLGPD-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "moderate",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1788,
    "code": "BRLGPD-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "critical",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1789,
    "code": "BRLGPD-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "serious",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1790,
    "code": "BRLGPD-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley General de Protección de Datos de Brasil (LGPD)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley General de Protección de Datos de Brasil (LGPD).",
    "severity": "critical",
    "reference": "Brazil General Data Protection Law (LGPD)"
  },
  {
    "id": 1791,
    "code": "ZAPOPI-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Canal de acceso a datos no disponible bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio web no proporciona un mecanismo accesible para solicitar el acceso a los datos almacenados bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1792,
    "code": "ZAPOPI-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de procedimiento de rectificación bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio web no cuenta con un procedimiento para que los usuarios corrijan datos personales inexactos bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1793,
    "code": "ZAPOPI-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de portal de eliminación de datos bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio web carece de un mecanismo claro de solicitud de eliminación para borrar perfiles bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1794,
    "code": "ZAPOPI-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exportación de portabilidad bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio web no ofrece un formato estructurado y portátil para descargar y transferir registros bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "moderate",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1795,
    "code": "ZAPOPI-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de opción de exclusión de publicidad bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio web utiliza píxeles de seguimiento publicitario sin ofrecer un enlace de exclusión bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1796,
    "code": "ZAPOPI-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de venta de datos bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio comparte datos de usuarios con intermediarios sin proporcionar un enlace de exclusión visible bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1797,
    "code": "ZAPOPI-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de exclusión de perfilado automatizado bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio utiliza modelos automatizados para la elegibilidad sin ofrecer opción de exclusión bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "moderate",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1798,
    "code": "ZAPOPI-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Tratamiento de datos sensibles sin consentimiento bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio recopila datos sensibles (salud, finanzas) sin consentimiento afirmativo previo bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "critical",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1799,
    "code": "ZAPOPI-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de evaluación de impacto de datos bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "La empresa no realiza evaluaciones de impacto para el perfilado de alto riesgo bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "serious",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1800,
    "code": "ZAPOPI-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Aviso de recopilación de datos no conforme bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA)",
    "description": "El sitio web recopila datos personales sin presentar un aviso de privacidad conforme bajo la Ley de Protección de Información Personal de Sudáfrica (POPIA).",
    "severity": "critical",
    "reference": "South Africa Protection of Personal Information Act (POPIA)"
  },
  {
    "id": 1801,
    "code": "TXSBB-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1802,
    "code": "TXSBB-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Fallos de Auditoría y Registro",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1803,
    "code": "TXSBB-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Defectos de Diseño de Interfaz",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1804,
    "code": "TXSBB-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Fortalezas Criptográficas Débiles",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1805,
    "code": "TXSBB-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Fallos en Escaneos de Vulnerabilidad",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1806,
    "code": "TXSBB-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Integridad del Registro de Consentimiento",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1807,
    "code": "TXSBB-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Visibilidad de Enlaces de Exclusión",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1808,
    "code": "TXSBB-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Divulgaciones del Aviso de Privacidad",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1809,
    "code": "TXSBB-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Verificación del Control de Auditoría",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1810,
    "code": "TXSBB-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Operaciones de intermediario de datos no registrado — Credenciales Administrativas Inseguras",
    "description": "El sitio vende datos a terceros sin registrarse en el Registro de Intermediarios de Texas. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "Texas SB 2105 (Data Broker Registry)"
  },
  {
    "id": 1811,
    "code": "WAHMHD-001",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1812,
    "code": "WAHMHD-002",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Fallos de Auditoría y Registro",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1813,
    "code": "WAHMHD-003",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Defectos de Diseño de Interfaz",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1814,
    "code": "WAHMHD-004",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Fortalezas Criptográficas Débiles",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1815,
    "code": "WAHMHD-005",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Fallos en Escaneos de Vulnerabilidad",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1816,
    "code": "WAHMHD-006",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Integridad del Registro de Consentimiento",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1817,
    "code": "WAHMHD-007",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Visibilidad de Enlaces de Exclusión",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1818,
    "code": "WAHMHD-008",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Divulgaciones del Aviso de Privacidad",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1819,
    "code": "WAHMHD-009",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Verificación del Control de Auditoría",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1820,
    "code": "WAHMHD-010",
    "evidenceKind": "observable",
    "category": "HIPAA / Medical",
    "title": "Geovallado ilegal alrededor de instalaciones médicas — Credenciales Administrativas Inseguras",
    "description": "La aplicación utiliza geovallado en centros médicos para rastrear a los usuarios sin consentimiento. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "critical",
    "reference": "Washington My Health My Data Act (MHMDA)"
  },
  {
    "id": 1821,
    "code": "NYDFS-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1822,
    "code": "NYDFS-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Fallos de Auditoría y Registro",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1823,
    "code": "NYDFS-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Defectos de Diseño de Interfaz",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1824,
    "code": "NYDFS-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Fortalezas Criptográficas Débiles",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1825,
    "code": "NYDFS-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Fallos en Escaneos de Vulnerabilidad",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1826,
    "code": "NYDFS-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Integridad del Registro de Consentimiento",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1827,
    "code": "NYDFS-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Visibilidad de Enlaces de Exclusión",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1828,
    "code": "NYDFS-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Divulgaciones del Aviso de Privacidad",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1829,
    "code": "NYDFS-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Verificación del Control de Auditoría",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1830,
    "code": "NYDFS-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de certificación de ciberseguridad financiera — Credenciales Administrativas Inseguras",
    "description": "El portal financiero opera sin las declaraciones anuales de cumplimiento de ciberseguridad requeridas por la DFS de NY. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "23 NYCRR Section 500"
  },
  {
    "id": 1831,
    "code": "PSD2-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1832,
    "code": "PSD2-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Fallos de Auditoría y Registro",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1833,
    "code": "PSD2-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Defectos de Diseño de Interfaz",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1834,
    "code": "PSD2-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Fortalezas Criptográficas Débiles",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1835,
    "code": "PSD2-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Fallos en Escaneos de Vulnerabilidad",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1836,
    "code": "PSD2-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Integridad del Registro de Consentimiento",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1837,
    "code": "PSD2-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Visibilidad de Enlaces de Exclusión",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1838,
    "code": "PSD2-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Divulgaciones del Aviso de Privacidad",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1839,
    "code": "PSD2-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Verificación del Control de Auditoría",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1840,
    "code": "PSD2-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Autenticación reforzada de clientes (SCA) no conforme — Credenciales Administrativas Inseguras",
    "description": "El portal de pago acepta tarjetas de crédito sin exigir la verificación multifactor requerida por la PSD2. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "critical",
    "reference": "EU Payment Services Directive 2 (PSD2)"
  },
  {
    "id": 1841,
    "code": "PCISC-001",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI).",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1842,
    "code": "PCISC-002",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Fallos de Auditoría y Registro",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1843,
    "code": "PCISC-003",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Defectos de Diseño de Interfaz",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1844,
    "code": "PCISC-004",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Fortalezas Criptográficas Débiles",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1845,
    "code": "PCISC-005",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Fallos en Escaneos de Vulnerabilidad",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1846,
    "code": "PCISC-006",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Integridad del Registro de Consentimiento",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1847,
    "code": "PCISC-007",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Visibilidad de Enlaces de Exclusión",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1848,
    "code": "PCISC-008",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Divulgaciones del Aviso de Privacidad",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1849,
    "code": "PCISC-009",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Verificación del Control de Auditoría",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1850,
    "code": "PCISC-010",
    "evidenceKind": "observable",
    "category": "PCI-DSS / Security",
    "title": "Controles de integridad de scripts del cliente inadecuados — Credenciales Administrativas Inseguras",
    "description": "La página de pago carga módulos JavaScript externos sin validación activa de integridad (SRI). Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "PCI-DSS v4.0 Req. 6.4.3"
  },
  {
    "id": 1851,
    "code": "GLBAS-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1852,
    "code": "GLBAS-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Fallos de Auditoría y Registro",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1853,
    "code": "GLBAS-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Defectos de Diseño de Interfaz",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1854,
    "code": "GLBAS-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Fortalezas Criptográficas Débiles",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1855,
    "code": "GLBAS-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Fallos en Escaneos de Vulnerabilidad",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1856,
    "code": "GLBAS-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Integridad del Registro de Consentimiento",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1857,
    "code": "GLBAS-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Visibilidad de Enlaces de Exclusión",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1858,
    "code": "GLBAS-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Divulgaciones del Aviso de Privacidad",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1859,
    "code": "GLBAS-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Verificación del Control de Auditoría",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1860,
    "code": "GLBAS-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de controles de transmisión para datos financieros — Credenciales Administrativas Inseguras",
    "description": "El formulario de préstamo transmite informes crediticios y SSN sin cifrado de transporte fuerte. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "Gramm-Leach-Bliley Act (GLBA) Safeguards Rule"
  },
  {
    "id": 1861,
    "code": "FTCDP-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1862,
    "code": "FTCDP-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Fallos de Auditoría y Registro",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1863,
    "code": "FTCDP-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Defectos de Diseño de Interfaz",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1864,
    "code": "FTCDP-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Fortalezas Criptográficas Débiles",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1865,
    "code": "FTCDP-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Fallos en Escaneos de Vulnerabilidad",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1866,
    "code": "FTCDP-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Integridad del Registro de Consentimiento",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1867,
    "code": "FTCDP-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Visibilidad de Enlaces de Exclusión",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1868,
    "code": "FTCDP-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Divulgaciones del Aviso de Privacidad",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1869,
    "code": "FTCDP-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Verificación del Control de Auditoría",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1870,
    "code": "FTCDP-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Descuentos ficticios sobre precios originales — Credenciales Administrativas Inseguras",
    "description": "El catálogo muestra precios originales tachados que no reflejan ventas históricas reales, engañando a los compradores. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "FTC Guides Against Deceptive Pricing 16 CFR 233"
  },
  {
    "id": 1871,
    "code": "FTCCC-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1872,
    "code": "FTCCC-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Fallos de Auditoría y Registro",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1873,
    "code": "FTCCC-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Defectos de Diseño de Interfaz",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1874,
    "code": "FTCCC-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Fortalezas Criptográficas Débiles",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1875,
    "code": "FTCCC-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Fallos en Escaneos de Vulnerabilidad",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1876,
    "code": "FTCCC-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Integridad del Registro de Consentimiento",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1877,
    "code": "FTCCC-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Visibilidad de Enlaces de Exclusión",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1878,
    "code": "FTCCC-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Divulgaciones del Aviso de Privacidad",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1879,
    "code": "FTCCC-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Verificación del Control de Auditoría",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1880,
    "code": "FTCCC-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Flujo de cancelación de suscripción asimétrico — Credenciales Administrativas Inseguras",
    "description": "El portal requiere que los usuarios contacten por teléfono para cancelar la facturación recurrente. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "FTC Click-to-Cancel Rule 16 CFR 425"
  },
  {
    "id": 1881,
    "code": "FTCFR-001",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1882,
    "code": "FTCFR-002",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Fallos de Auditoría y Registro",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1883,
    "code": "FTCFR-003",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Defectos de Diseño de Interfaz",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1884,
    "code": "FTCFR-004",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Fortalezas Criptográficas Débiles",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1885,
    "code": "FTCFR-005",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Fallos en Escaneos de Vulnerabilidad",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1886,
    "code": "FTCFR-006",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Integridad del Registro de Consentimiento",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1887,
    "code": "FTCFR-007",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Visibilidad de Enlaces de Exclusión",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1888,
    "code": "FTCFR-008",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Divulgaciones del Aviso de Privacidad",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1889,
    "code": "FTCFR-009",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Verificación del Control de Auditoría",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1890,
    "code": "FTCFR-010",
    "evidenceKind": "observable",
    "category": "FTC Enforcement",
    "title": "Incentivos de reseñas compensados no divulgados — Credenciales Administrativas Inseguras",
    "description": "Los resúmenes de calificación muestran opiniones pagadas sin indicar que los clientes recibieron recompensas. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "FTC Review Rule 16 CFR 465"
  },
  {
    "id": 1891,
    "code": "EUDOR-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1892,
    "code": "EUDOR-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Fallos de Auditoría y Registro",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1893,
    "code": "EUDOR-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Defectos de Diseño de Interfaz",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1894,
    "code": "EUDOR-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Fortalezas Criptográficas Débiles",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1895,
    "code": "EUDOR-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Fallos en Escaneos de Vulnerabilidad",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1896,
    "code": "EUDOR-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Integridad del Registro de Consentimiento",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1897,
    "code": "EUDOR-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Visibilidad de Enlaces de Exclusión",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1898,
    "code": "EUDOR-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Divulgaciones del Aviso de Privacidad",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1899,
    "code": "EUDOR-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Verificación del Control de Auditoría",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1900,
    "code": "EUDOR-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de registros de auditoría de vulnerabilidad de TI — Credenciales Administrativas Inseguras",
    "description": "La interfaz bancaria opera sin los informes semanales de vulnerabilidades de red requeridos por DORA. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "EU Digital Operational Resilience Act (DORA)"
  },
  {
    "id": 1901,
    "code": "EUCTA-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1902,
    "code": "EUCTA-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Fallos de Auditoría y Registro",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1903,
    "code": "EUCTA-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Defectos de Diseño de Interfaz",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1904,
    "code": "EUCTA-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Fortalezas Criptográficas Débiles",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1905,
    "code": "EUCTA-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Fallos en Escaneos de Vulnerabilidad",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1906,
    "code": "EUCTA-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Integridad del Registro de Consentimiento",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1907,
    "code": "EUCTA-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Visibilidad de Enlaces de Exclusión",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1908,
    "code": "EUCTA-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Divulgaciones del Aviso de Privacidad",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1909,
    "code": "EUCTA-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Verificación del Control de Auditoría",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1910,
    "code": "EUCTA-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de detalles de propiedad real en el pie de página — Credenciales Administrativas Inseguras",
    "description": "El pie de página carece de declaraciones que identifiquen a los beneficiarios reales y sus ID de registro. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "moderate",
    "reference": "EU Corporate Transparency Act / AML Rules"
  },
  {
    "id": 1911,
    "code": "WCAG2-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1912,
    "code": "WCAG2-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Fallos de Auditoría y Registro",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1913,
    "code": "WCAG2-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Defectos de Diseño de Interfaz",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1914,
    "code": "WCAG2-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Fortalezas Criptográficas Débiles",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1915,
    "code": "WCAG2-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Fallos en Escaneos de Vulnerabilidad",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1916,
    "code": "WCAG2-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Integridad del Registro de Consentimiento",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1917,
    "code": "WCAG2-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Visibilidad de Enlaces de Exclusión",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1918,
    "code": "WCAG2-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Divulgaciones del Aviso de Privacidad",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1919,
    "code": "WCAG2-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Verificación del Control de Auditoría",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1920,
    "code": "WCAG2-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Tamaño de botón inadecuado para hacer clic — Credenciales Administrativas Inseguras",
    "description": "Los botones de navegación tienen un tamaño inferior a 24x24 píxeles CSS, bloqueando a usuarios con discapacidad. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "WCAG 2.2 Level AA Standard"
  },
  {
    "id": 1921,
    "code": "EAAAX-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1922,
    "code": "EAAAX-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Fallos de Auditoría y Registro",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1923,
    "code": "EAAAX-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Defectos de Diseño de Interfaz",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1924,
    "code": "EAAAX-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Fortalezas Criptográficas Débiles",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1925,
    "code": "EAAAX-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Fallos en Escaneos de Vulnerabilidad",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1926,
    "code": "EAAAX-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Integridad del Registro de Consentimiento",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1927,
    "code": "EAAAX-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Visibilidad de Enlaces de Exclusión",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1928,
    "code": "EAAAX-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Divulgaciones del Aviso de Privacidad",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1929,
    "code": "EAAAX-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Verificación del Control de Auditoría",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1930,
    "code": "EAAAX-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Controles de pago de comercio electrónico inaccesibles — Credenciales Administrativas Inseguras",
    "description": "Los formularios de pago carecen de soporte de lectura de pantalla asistido por voz requerido por la EAA. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "critical",
    "reference": "European Accessibility Act (EAA) Directive 2019/882"
  },
  {
    "id": 1931,
    "code": "ONADA-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1932,
    "code": "ONADA-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Fallos de Auditoría y Registro",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1933,
    "code": "ONADA-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Defectos de Diseño de Interfaz",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1934,
    "code": "ONADA-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Fortalezas Criptográficas Débiles",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1935,
    "code": "ONADA-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Fallos en Escaneos de Vulnerabilidad",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1936,
    "code": "ONADA-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Integridad del Registro de Consentimiento",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1937,
    "code": "ONADA-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Visibilidad de Enlaces de Exclusión",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1938,
    "code": "ONADA-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Divulgaciones del Aviso de Privacidad",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1939,
    "code": "ONADA-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Verificación del Control de Auditoría",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1940,
    "code": "ONADA-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de canal de comentarios de accesibilidad — Credenciales Administrativas Inseguras",
    "description": "El sitio web no cuenta con un canal dedicado para reportar barreras de accesibilidad digital según la AODA. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "Ontario Accessibility for Ontarians (AODA)"
  },
  {
    "id": 1941,
    "code": "SEC50-001",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1942,
    "code": "SEC50-002",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Fallos de Auditoría y Registro",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1943,
    "code": "SEC50-003",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Defectos de Diseño de Interfaz",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1944,
    "code": "SEC50-004",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Fortalezas Criptográficas Débiles",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1945,
    "code": "SEC50-005",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Fallos en Escaneos de Vulnerabilidad",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1946,
    "code": "SEC50-006",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Integridad del Registro de Consentimiento",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1947,
    "code": "SEC50-007",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Visibilidad de Enlaces de Exclusión",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1948,
    "code": "SEC50-008",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Divulgaciones del Aviso de Privacidad",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1949,
    "code": "SEC50-009",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Verificación del Control de Auditoría",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1950,
    "code": "SEC50-010",
    "evidenceKind": "observable",
    "category": "ADA / WCAG",
    "title": "Falta de subtítulos en videos de capacitación — Credenciales Administrativas Inseguras",
    "description": "Los archivos de video integrados operan sin pistas de texto sincronizadas ni soporte de subtítulos. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "Rehabilitation Act Section 508"
  },
  {
    "id": 1951,
    "code": "EEOC-001",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1952,
    "code": "EEOC-002",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Fallos de Auditoría y Registro",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1953,
    "code": "EEOC-003",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Defectos de Diseño de Interfaz",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1954,
    "code": "EEOC-004",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Fortalezas Criptográficas Débiles",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1955,
    "code": "EEOC-005",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Fallos en Escaneos de Vulnerabilidad",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1956,
    "code": "EEOC-006",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Integridad del Registro de Consentimiento",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1957,
    "code": "EEOC-007",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Visibilidad de Enlaces de Exclusión",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1958,
    "code": "EEOC-008",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Divulgaciones del Aviso de Privacidad",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1959,
    "code": "EEOC-009",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Verificación del Control de Auditoría",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1960,
    "code": "EEOC-010",
    "evidenceKind": "observable",
    "category": "Digital Operations",
    "title": "Falta de auditoría de sesgo en selección automatizada — Credenciales Administrativas Inseguras",
    "description": "La aplicación selecciona perfiles de candidatos con herramientas de IA sin realizar auditorías anuales de sesgo. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "serious",
    "reference": "NY AEDT Local Law 144 / EEOC Guidelines"
  },
  {
    "id": 1961,
    "code": "BIPAX-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1962,
    "code": "BIPAX-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Fallos de Auditoría y Registro",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1963,
    "code": "BIPAX-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Defectos de Diseño de Interfaz",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1964,
    "code": "BIPAX-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Fortalezas Criptográficas Débiles",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1965,
    "code": "BIPAX-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Fallos en Escaneos de Vulnerabilidad",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1966,
    "code": "BIPAX-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Integridad del Registro de Consentimiento",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1967,
    "code": "BIPAX-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Visibilidad de Enlaces de Exclusión",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1968,
    "code": "BIPAX-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Divulgaciones del Aviso de Privacidad",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1969,
    "code": "BIPAX-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Verificación del Control de Auditoría",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1970,
    "code": "BIPAX-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Falta de consentimiento biométrico para prueba virtual — Credenciales Administrativas Inseguras",
    "description": "El portal cosmético despliega software de prueba virtual de escaneo facial sin consentimiento biométrico previo por escrito. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "critical",
    "reference": "Illinois Biometric Information Privacy Act (BIPA)"
  },
  {
    "id": 1971,
    "code": "CIPAX-001",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1972,
    "code": "CIPAX-002",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Fallos de Auditoría y Registro",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1973,
    "code": "CIPAX-003",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Defectos de Diseño de Interfaz",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1974,
    "code": "CIPAX-004",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Fortalezas Criptográficas Débiles",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1975,
    "code": "CIPAX-005",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Fallos en Escaneos de Vulnerabilidad",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1976,
    "code": "CIPAX-006",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Integridad del Registro de Consentimiento",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1977,
    "code": "CIPAX-007",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Visibilidad de Enlaces de Exclusión",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1978,
    "code": "CIPAX-008",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Divulgaciones del Aviso de Privacidad",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1979,
    "code": "CIPAX-009",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Verificación del Control de Auditoría",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1980,
    "code": "CIPAX-010",
    "evidenceKind": "observable",
    "category": "State Privacy Laws",
    "title": "Transcripción de chat sin advertencia de la CIPA — Credenciales Administrativas Inseguras",
    "description": "El chat del cliente realiza transcripción en tiempo real y registra diálogos sin advertencia de grabación. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "critical",
    "reference": "California Invasion of Privacy Act (CIPA)"
  },
  {
    "id": 1981,
    "code": "LKSG-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1982,
    "code": "LKSG-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Fallos de Auditoría y Registro",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1983,
    "code": "LKSG-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Defectos de Diseño de Interfaz",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1984,
    "code": "LKSG-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Fortalezas Criptográficas Débiles",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1985,
    "code": "LKSG-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Fallos en Escaneos de Vulnerabilidad",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1986,
    "code": "LKSG-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Integridad del Registro de Consentimiento",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1987,
    "code": "LKSG-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Visibilidad de Enlaces de Exclusión",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1988,
    "code": "LKSG-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Divulgaciones del Aviso de Privacidad",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1989,
    "code": "LKSG-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Verificación del Control de Auditoría",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1990,
    "code": "LKSG-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de canal de quejas sobre la cadena de suministro — Credenciales Administrativas Inseguras",
    "description": "El sitio web carece de un portal accesible para que los proveedores envíen quejas sobre violaciones de derechos humanos. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "moderate",
    "reference": "German Supply Chain Due Diligence Act (LkSG)"
  },
  {
    "id": 1991,
    "code": "CSRD-001",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1992,
    "code": "CSRD-002",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Fallos de Auditoría y Registro",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. Los registros de auditoría inadecuados no documentan los cambios de configuración.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1993,
    "code": "CSRD-003",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Defectos de Diseño de Interfaz",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. Las interfaces emplean elementos de diseño que limitan el acceso o las opciones de los usuarios.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1994,
    "code": "CSRD-004",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Fortalezas Criptográficas Débiles",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. Los algoritmos de cifrado o capas de transporte están por debajo de los estándares mínimos.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1995,
    "code": "CSRD-005",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Fallos en Escaneos de Vulnerabilidad",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. Los escáneres automáticos de vulnerabilidad no se ejecutan periódicamente en rutas públicas.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1996,
    "code": "CSRD-006",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Integridad del Registro de Consentimiento",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. Los registros no almacenan las elecciones en un repositorio inmutable.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1997,
    "code": "CSRD-007",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Visibilidad de Enlaces de Exclusión",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. El pie de página carece de enlaces visibles para solicitar la exclusión del seguimiento.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1998,
    "code": "CSRD-008",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Divulgaciones del Aviso de Privacidad",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. Las declaraciones de privacidad no explican con claridad los alcances del procesamiento.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 1999,
    "code": "CSRD-009",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Verificación del Control de Auditoría",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. Los procesos de transferencia operan sin comprobaciones automáticas de validez.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  },
  {
    "id": 2000,
    "code": "CSRD-010",
    "evidenceKind": "observable",
    "category": "Financial / Corporate",
    "title": "Falta de divulgaciones digitales de sostenibilidad — Credenciales Administrativas Inseguras",
    "description": "El portal corporativo no publica las auditorías anuales de sostenibilidad en formato digital legible por máquina. Las consolas de administración permiten el acceso sin forzar claves MFA.",
    "severity": "moderate",
    "reference": "EU Corporate Sustainability Reporting Directive (CSRD)"
  }
];
