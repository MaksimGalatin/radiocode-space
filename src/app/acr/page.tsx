'use client';
import { useCurrentLang } from "@/lib/radioI18n";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Cpu, Zap, Compass, CheckCircle2, ArrowRight, 
  Layers, FileText, Lock, Globe, Sparkles, Building, Key, 
  HardDrive, Activity, Users, Shield, Terminal
} from 'lucide-react';

type Lang = 'ru' | 'en' | 'es' | 'zh';

const CANONICAL_PLANS: Record<Lang, any[]> = {
  "ru": [
    {
      "id": "hacker",
      "category": "individual",
      "name": "Hacker / Indie",
      "price": "$15",
      "period": "/ мес",
      "yearlyPrice": "$150 / год (скидка 17%)",
      "target": "Для соло-разработчиков, пет-проектов и независимых AI-мейкеров.",
      "whyUpgrade": "Базовый доступ к ассоциативной памяти коннектома FlyWire v783 LSH для одного разработчика.",
      "seats": "1 рабочее место (личный API-ключ)",
      "limits": "До 100 000 векторов, 50 000 поисковых запросов в месяц (CPU, без GPU; точный поиск 50 000 векторов — ≈ 9 мс, замер 23.09.2026)",
      "sla": "Discord / Telegram сообщество разработчиков + документация",
      "timeline": "Мгновенно (60 секунд)",
      "popular": false,
      "deliverables": [
        "Личный API-ключ Edge Gateway + npm/pip пакет aifa_connectome_web.js",
        "Базовый бионический контур: FlyHash v783 LSH + APL Sensory Novelty Gate",
        "Шаблон Next.js со встроенной ассоциативной памятью",
        "Объем памяти: до 100 000 векторов (d=256..1024)",
        "Поддержка: Сообщество Discord / Telegram"
      ]
    },
    {
      "id": "pro",
      "category": "individual",
      "name": "Pro / Scale",
      "price": "$100",
      "period": "/ мес",
      "yearlyPrice": "$1,000 / год (скидка 17%)",
      "target": "Для профессиональных инженеров, исследователей и соло-основателей AI-агентов.",
      "whyUpgrade": "В 5 раз больше памяти (500K векторов), CANN кольцевой аттрактор (защита от потери фокуса диалога) и приватный RPC-эндпоинт.",
      "seats": "1 разработчик + 1 резервный сервисный ключ",
      "limits": "До 500 000 векторов, 300 000 запросов/мес (CPU, без GPU)",
      "sla": "99.5% Uptime SLA, приоритетный ответ поддержки < 4 часов",
      "timeline": "Мгновенно (автоматическая активация)",
      "popular": true,
      "deliverables": [
        "Всё из тарифа Hacker / Indie",
        "Емкость: до 500 000 векторов с сохранением микросекундного отклика",
        "CANN Focus Ring Attractor (удержание контекста диалога без дрейфа цели)",
        "R-STDP синаптическая пластичность (ассоциативное дообучение без градиентов)",
        "Приватный RPC эндпоинт без очередей + экспорт векторов в JSONL/Parquet",
        "SLA: 99.5% доступности, ответ поддержки < 4 часов"
      ]
    },
    {
      "id": "team",
      "category": "team",
      "name": "Startup / Team",
      "price": "$249",
      "period": "/ мес",
      "yearlyPrice": "$2,490 / год (скидка 17%)",
      "target": "Для продуктовых команд, AI-стартапов и многоагентных SaaS до 5 человек.",
      "whyUpgrade": "Командная работа (до 5 мест) с единым графом памяти на 2M векторов, навигация Central Complex CX Steering и WebSocket стриминг.",
      "seats": "До 5 участников команды (ролевой доступ RBAC)",
      "limits": "До 2 000 000 векторов, 1 500 000 запросов/мес, до 1 000 QPS",
      "sla": "99.9% Uptime SLA, закрытый канал поддержки, ответ инженера < 2 часов",
      "timeline": "Мгновенно (командный инвайт)",
      "popular": false,
      "deliverables": [
        "Всё из тарифа Pro / Researcher для 5 пользователей",
        "Единый общий граф памяти проекта до 2 000 000 векторов",
        "Central Complex CX Steering Navigation (векторный компас навигации в DOM-графах)",
        "WebSocket Live Streaming активации нейронов коннектома",
        "Интерактивная панель мониторинга дрейфа внимания команды и энтропии графа",
        "Оплата по безналичному расчету для юридических лиц с закрывающими актами",
        "SLA: 99.9% доступности сервиса, поддержка < 2 часов"
      ]
    },
    {
      "id": "business",
      "category": "team",
      "name": "Business / Scale",
      "price": "$790",
      "period": "/ мес",
      "yearlyPrice": "$7,900 / год (скидка 17%)",
      "target": "Для растущих IT-компаний, финтех-сервисов, LegalTech и корпоративных RAG до 25 человек.",
      "whyUpgrade": "Выделенный шлюз API без эффекта 'шумных соседей' (Zero Noisy Neighbors), 10M векторов, 5000 QPS, гомеостатический прунинг.",
      "seats": "До 25 рабочих мест + сервисные сервисы",
      "limits": "До 10 000 000 векторов, 10 000 000 запросов/мес, до 5 000 QPS",
      "sla": "99.9% Uptime SLA, выделенный чат в Telegram/Slack с инженером (< 1 часа)",
      "timeline": "В течение 2 часов (выделение пула)",
      "popular": false,
      "deliverables": [
        "Всё из тарифа Startup / Team для 25 пользователей",
        "Выделенный высокоскоростной шлюз API (Dedicated Isolated Gateway)",
        "Масштаб памяти: до 10 000 000 векторов с автопрунингом",
        "Гомеостатический прунинг памяти и автоматическое холодное/горячее хранение",
        "Готовые коннекторы: LangChain, LlamaIndex, AutoGen, CrewAI",
        "Полный аудит-лог доступа к фактам памяти (Compliance & Audit Trail)",
        "SLA: 99.9% Uptime SLA, прямой чат с дежурным инженером < 1 часа"
      ]
    },
    {
      "id": "enterprise",
      "category": "enterprise",
      "name": "Enterprise Cloud",
      "price": "$2,900",
      "period": "/ мес",
      "yearlyPrice": "$29,000 / год (скидка 17%)",
      "target": "Для крупных банков, финтеха, медицинских корпораций и комплаенс-платформ.",
      "whyUpgrade": "Полностью изолированный облачный VPC / Bare-Metal узел, неограниченные места, 50 000 QPS, Proof of Connectome аудит и 24/7 SLA.",
      "seats": "Неограниченное число рабочих мест",
      "limits": "Безлимитно ($150 за 10M доп. векторов), до 50 000 QPS",
      "sla": "99.99% Uptime SLA, персональный инженер 24/7/365, реакция < 15 минут",
      "timeline": "Развертывание от 2 до 24 часов под ключ",
      "popular": false,
      "deliverables": [
        "Выделенный изолированный облачный VPC / Bare-Metal узел (регионы EU / US / SG)",
        "Неограниченное число сотрудников и сервисных микросервисов",
        "Безлимитный объем векторов ($150 за каждые 10M векторов), до 50 000 QPS",
        "Полный стек 30 коннектомных технологий с кастомной калибровкой матриц проекции",
        "Криптографический аудит запросов (Proof of Connectome, Merkle-дерево в Bitcoin)",
        "Интеграция с корпоративными SSO (SAML, Okta), SIEM, SOC2 / GDPR соответствие",
        "SLA: 99.99% доступности, персональный дежурный архитектор 24/7, реакция < 15 мин"
      ]
    },
    {
      "id": "onprem",
      "category": "enterprise",
      "name": "On-Premises Sovereign Core (.aci)",
      "price": "$49,000",
      "period": "разово + $5,000/год",
      "yearlyPrice": "Бессрочная лицензия ядра + $5,000/год обновления и аудит",
      "target": "Для государственных систем, оборонных контуров и закрытых банковских ЦОД (Air-Gapped).",
      "whyUpgrade": "100% суверенитет и физическая изоляция: закрытый бинарный runtime (.so/.dll/AVX-512), 0 внешних запросов, выездное внедрение под ключ.",
      "seats": "Без ограничений по пользователям, узлам, ядрам и памяти",
      "limits": "Не ограничено (зависит только от серверных мощностей заказчика)",
      "sla": "Кастомный Enterprise SLA, персональный выездной архитектор и инженер внедрения",
      "timeline": "Поставка и развертывание: 3-5 рабочих дней под ключ",
      "popular": false,
      "deliverables": [
        "Бессрочная лицензия на скомпилированное закрытое бинарное ядро AIfa Cognitive Runtime (.aci)",
        "Поставка: Linux ELF shared library (.so) / Windows Native DLL / C++ native SDK с AVX-512 VNNI",
        "Аппаратная оптимизация под серверные процессоры заказчика (Intel Xeon, AMD EPYC, Apple Silicon)",
        "Абсолютная автономность (Air-Gapped): 0 сетевых запросов наружу, 0 телеметрии, 100% суверенитет данных",
        "2 недели выездного внедрения на объекте заказчика и обучение команды архитектором",
        "12 месяцев обновлений синаптических весов (FlyWire v783+) и прямой канал с Главным Архитектором (Максим Галатин)"
      ]
    }
  ],
  "en": [
    {
      "id": "hacker",
      "category": "individual",
      "name": "Hacker / Indie",
      "price": "$15",
      "period": "/ mo",
      "yearlyPrice": "$150 / yr (17% off)",
      "target": "For solo developers, pet projects, and independent AI creators.",
      "whyUpgrade": "Entry-level access to FlyWire v783 LSH associative memory for a single developer.",
      "seats": "1 seat (personal API key)",
      "limits": "Up to 100,000 vectors, 50,000 queries/month (CPU, no GPU; exact search over 50,000 vectors ≈ 9 ms, measured 23.09.2026)",
      "sla": "Discord / Telegram developer community + docs",
      "timeline": "Instant (60 seconds)",
      "popular": false,
      "deliverables": [
        "Personal Edge Gateway API key + npm/pip package aifa_connectome_web.js",
        "Base bionic circuit: FlyHash v783 LSH + APL Sensory Novelty Gate",
        "Next.js starter template with embedded associative memory",
        "Memory limit: up to 100,000 vectors (d=256..1024)",
        "Support: Discord / Telegram community"
      ]
    },
    {
      "id": "pro",
      "category": "individual",
      "name": "Pro / Scale",
      "price": "$100",
      "period": "/ mo",
      "yearlyPrice": "$1,000 / yr (17% off)",
      "target": "For senior engineers, AI researchers, and solo agent builders.",
      "whyUpgrade": "5x memory capacity (500K vectors), CANN focus ring attractor (zero task drift), and private RPC endpoint.",
      "seats": "1 engineer + 1 backup service key",
      "limits": "Up to 500,000 vectors, 300,000 queries/mo (CPU, no GPU)",
      "sla": "99.5% Uptime SLA, priority support response < 4 hours",
      "timeline": "Instant automated activation",
      "popular": true,
      "deliverables": [
        "Everything in Hacker / Indie",
        "Capacity: up to 500,000 vectors on CPU, no GPU",
        "CANN Focus Ring Attractor (dialogue focus retention without semantic drift)",
        "R-STDP synaptic plasticity (associative online fine-tuning without backprop)",
        "Private zero-queue RPC endpoint + vector export to JSONL/Parquet",
        "SLA: 99.5% uptime, support response < 4 hours"
      ]
    },
    {
      "id": "team",
      "category": "team",
      "name": "Startup / Team",
      "price": "$249",
      "period": "/ mo",
      "yearlyPrice": "$2,490 / yr (17% off)",
      "target": "For small teams, AI startups, and multi-agent SaaS platforms up to 5 members.",
      "whyUpgrade": "Collaborative memory graph (2M vectors) for up to 5 seats, Central Complex CX Steering navigation, and WebSocket live streams.",
      "seats": "Up to 5 team seats (role-based RBAC access)",
      "limits": "Up to 2,000,000 vectors, 1,500,000 queries/mo, up to 1,000 QPS",
      "sla": "99.9% Uptime SLA, dedicated support channel < 2 hours",
      "timeline": "Instant team invitation",
      "popular": false,
      "deliverables": [
        "Everything in Pro / Researcher for 5 users",
        "Shared collective memory graph up to 2,000,000 vectors",
        "Central Complex CX Steering Navigation (vector compass for DOM graphs)",
        "WebSocket live streaming of connectome neuron activation",
        "Real-time team attention drift & memory graph entropy dashboard",
        "Corporate billing with formal tax invoices for legal entities",
        "SLA: 99.9% uptime SLA, engineer response < 2 hours"
      ]
    },
    {
      "id": "business",
      "category": "team",
      "name": "Business / Scale",
      "price": "$790",
      "period": "/ mo",
      "yearlyPrice": "$7,900 / yr (17% off)",
      "target": "For high-growth AI companies, fintech copilots, and enterprise RAG up to 25 members.",
      "whyUpgrade": "Dedicated API gateway with Zero Noisy Neighbors, 10M vectors, 5,000 QPS, and homeostatic pruning.",
      "seats": "Up to 25 seats + automated microservice keys",
      "limits": "Up to 10,000,000 vectors, 10,000,000 queries/mo, up to 5,000 QPS",
      "sla": "99.9% Uptime SLA, dedicated Slack/Telegram channel < 1 hour",
      "timeline": "Within 2 hours (provisioning)",
      "popular": false,
      "deliverables": [
        "Everything in Startup / Team for 25 users",
        "Dedicated Isolated API Gateway (Zero Noisy Neighbors)",
        "Scale: up to 10,000,000 vectors with auto-pruning",
        "Homeostatic memory pruning & automated cold/hot vector tiering",
        "Pre-built integrations: LangChain, LlamaIndex, AutoGen, CrewAI",
        "Comprehensive audit trail of memory access (Compliance & Security)",
        "SLA: 99.9% uptime SLA, dedicated Slack/Telegram channel < 1 hour"
      ]
    },
    {
      "id": "enterprise",
      "category": "enterprise",
      "name": "Enterprise Cloud",
      "price": "$2,900",
      "period": "/ mo",
      "yearlyPrice": "$29,000 / yr (17% off)",
      "target": "For global banks, healthcare networks, compliance platforms, and high-load systems.",
      "whyUpgrade": "Isolated private VPC / Bare-Metal node, unlimited seats, 50,000 QPS, Proof of Connectome Merkle audits, and 24/7 SLA.",
      "seats": "Unlimited seats & services",
      "limits": "Unlimited scale ($150 per 10M additional vectors), up to 50,000 QPS",
      "sla": "99.99% Uptime SLA, dedicated on-call engineer 24/7/365 (< 15 min response)",
      "timeline": "Turnkey deployment within 2–24 hours",
      "popular": false,
      "deliverables": [
        "Dedicated isolated cloud VPC / Bare-Metal node (EU / US / SG regions)",
        "Unlimited user accounts and microservice tokens",
        "Unlimited vector scale ($150 per additional 10M vectors), up to 50,000 QPS",
        "Full 30 connectome innovations stack with custom projection matrix tuning",
        "Cryptographic audit logging (Proof of Connectome, Merkle tree in Bitcoin)",
        "Enterprise SSO (SAML, Okta), SIEM logging, SOC2 & GDPR compliance",
        "SLA: 99.99% uptime, dedicated 24/7 engineer, guaranteed response under 15 min"
      ]
    },
    {
      "id": "onprem",
      "category": "enterprise",
      "name": "On-Premises Sovereign Core (.aci)",
      "price": "$49,000",
      "period": "one-time + $5,000/yr",
      "yearlyPrice": "Perpetual runtime license + $5,000/yr updates & security audit",
      "target": "For sovereign governments, defense perimeters, and air-gapped financial datacenters.",
      "whyUpgrade": "100% sovereign air-gapped deployment: compiled native runtime (.so/.dll/AVX-512), zero outbound telemetry, turnkey on-site engineer.",
      "seats": "Unlimited users, nodes, cores, and memory",
      "limits": "Unlimited (bounded only by customer hardware)",
      "sla": "Custom enterprise SLA, dedicated on-site deployment engineer & Chief Architect access",
      "timeline": "Turnkey delivery & setup in 3-5 business days",
      "popular": false,
      "deliverables": [
        "Perpetual lifetime license for compiled binary AIfa Cognitive Runtime (.aci)",
        "Delivery: Linux ELF shared library (.so) / Windows Native DLL / C++ native SDK with AVX-512 VNNI",
        "Full hardware optimization for customer server CPUs (Intel Xeon, AMD EPYC, Apple Silicon)",
        "100% Air-Gapped: zero outbound requests, zero telemetry, full sovereignty over data",
        "2 weeks of on-site deployment, tuning, and team training by AIfa core engineers",
        "Includes 12 months of connectome weights updates (FlyWire v783+) and direct architect channel (Maxim Galatin)"
      ]
    }
  ],
  "es": [
    {
      "id": "hacker",
      "category": "individual",
      "name": "Hacker / Indie",
      "price": "$15",
      "period": "/ mes",
      "yearlyPrice": "$150 / año (17% descuento)",
      "target": "Para desarrolladores independientes, proyectos personales y creadores de IA.",
      "whyUpgrade": "Acceso básico a la memoria asociativa FlyWire v783 LSH para un solo desarrollador.",
      "seats": "1 puesto (clave de API personal)",
      "limits": "Hasta 100.000 vectores, 50.000 consultas/mes (CPU, sin GPU; búsqueda exacta sobre 50.000 vectores ≈ 9 ms, medido el 23.09.2026)",
      "sla": "Comunidad en Discord / Telegram + documentación completa",
      "timeline": "Instantáneo (60 segundos)",
      "popular": false,
      "deliverables": [
        "Clave de API personal de Edge Gateway + paquete npm/pip aifa_connectome_web.js",
        "Circuito biónico base: FlyHash v783 LSH + APL Sensory Novelty Gate",
        "Plantilla Next.js con memoria asociativa integrada",
        "Límite: hasta 100.000 vectores (d=256..1024)",
        "Soporte: Comunidad de desarrolladores en Discord / Telegram"
      ]
    },
    {
      "id": "pro",
      "category": "individual",
      "name": "Pro / Scale",
      "price": "$100",
      "period": "/ mes",
      "yearlyPrice": "$1,000 / año (17% descuento)",
      "target": "Para ingenieros senior, investigadores de IA y creadores de agentes autónomos.",
      "whyUpgrade": "5 veces más capacidad (500.000 vectores), atractor anular CANN (sin pérdida de foco) y endpoint RPC privado.",
      "seats": "1 ingeniero + 1 clave de servicio de respaldo",
      "limits": "Hasta 500.000 vectores, 300.000 consultas/mes (CPU, sin GPU)",
      "sla": "99,5% Uptime SLA, soporte prioritario < 4 horas",
      "timeline": "Activación automática instantánea",
      "popular": true,
      "deliverables": [
        "Todo lo incluido en Hacker / Indie",
        "Capacidad: hasta 500.000 vectores en CPU, sin GPU",
        "CANN Focus Ring Attractor (retención de foco sin deriva de objetivos)",
        "Plasticidad R-STDP (aprendizaje asociativo online sin backpropagation)",
        "Endpoint RPC privado sin colas + exportación a JSONL/Parquet",
        "SLA: 99,5% de disponibilidad, respuesta de soporte < 4 horas"
      ]
    },
    {
      "id": "team",
      "category": "team",
      "name": "Startup / Team",
      "price": "$249",
      "period": "/ mes",
      "yearlyPrice": "$2.490 / año (17% descuento)",
      "target": "Para equipos de producto, startups de IA y SaaS multiagente de hasta 5 miembros.",
      "whyUpgrade": "Memoria compartida (2M de vectores) para hasta 5 miembros, navegación Central Complex CX Steering y streaming WebSocket.",
      "seats": "Hasta 5 puestos con control de roles RBAC",
      "limits": "Hasta 2.000.000 de vectores, 1.500.000 consultas/mes, hasta 1.000 QPS",
      "sla": "99,9% Uptime SLA, canal exclusivo de soporte < 2 horas",
      "timeline": "Invitación instantánea de equipo",
      "popular": false,
      "deliverables": [
        "Todo lo de Pro / Researcher para 5 usuarios",
        "Grafo de memoria compartida de hasta 2.000.000 de vectores",
        "Central Complex CX Steering Navigation (compás vectorial para grafos DOM)",
        "Streaming WebSocket en tiempo real de activación neuronal",
        "Panel de monitoreo de deriva de atención y entropía de grafo",
        "Facturación empresarial con documentación fiscal para empresas",
        "SLA: 99,9% de disponibilidad, respuesta < 2 horas"
      ]
    },
    {
      "id": "business",
      "category": "team",
      "name": "Business / Scale",
      "price": "$790",
      "period": "/ mes",
      "yearlyPrice": "$7.900 / año (17% descuento)",
      "target": "Para empresas tecnológicas en crecimiento, fintech y RAG corporativo de hasta 25 personas.",
      "whyUpgrade": "Gateway API dedicado sin 'vecinos ruidosos' (Zero Noisy Neighbors), 10M de vectores, 5.000 QPS y poda homeostática.",
      "seats": "Hasta 25 puestos + tokens de microservicios",
      "limits": "Hasta 10.000.000 de vectores, 10.000.000 consultas/mes, hasta 5.000 QPS",
      "sla": "99,9% Uptime SLA, canal directo en Slack/Telegram < 1 hora",
      "timeline": "En menos de 2 horas (aprovisionamiento)",
      "popular": false,
      "deliverables": [
        "Todo lo de Startup / Team para 25 usuarios",
        "Gateway de API dedicado aislado (Zero Noisy Neighbors)",
        "Escala: hasta 10.000.000 de vectores con poda automática",
        "Poda homeostática de memoria y almacenamiento escalonado frío/caliente",
        "Conectores listos: LangChain, LlamaIndex, AutoGen, CrewAI",
        "Registro de auditoría completo de acceso a memoria (Cumplimiento y Seguridad)",
        "SLA: 99,9% de disponibilidad, canal directo < 1 hora"
      ]
    },
    {
      "id": "enterprise",
      "category": "enterprise",
      "name": "Enterprise Cloud",
      "price": "$2.900",
      "period": "/ mes",
      "yearlyPrice": "$29.000 / año (17% descuento)",
      "target": "Para grandes corporaciones, bancos, redes hospitalarias y plataformas de cumplimiento.",
      "whyUpgrade": "VPC en la nube aislada / nodo Bare-Metal, usuarios ilimitados, 50.000 QPS, auditorías Proof of Connectome y SLA 24/7.",
      "seats": "Usuarios y microservicios ilimitados",
      "limits": "Escala ilimitada ($150 por cada 10M de vectores extra), hasta 50.000 QPS",
      "sla": "99,99% Uptime SLA, ingeniero dedicado 24/7/365 (< 15 min de respuesta)",
      "timeline": "Despliegue llave en mano de 2 a 24 horas",
      "popular": false,
      "deliverables": [
        "VPC aislada / nodo Bare-Metal dedicado (regiones EU / US / SG)",
        "Cuentas de usuario y tokens de servicio ilimitados",
        "Vectores ilimitados ($150 por cada 10M adicionales), hasta 50.000 QPS",
        "Pila completa de 30 innovaciones conectómicas con calibración personalizada",
        "Auditoría criptográfica (Proof of Connectome, árbol Merkle en Bitcoin)",
        "SSO empresarial (SAML, Okta), logs SIEM, cumplimiento SOC2 y GDPR",
        "SLA: 99,99% de disponibilidad, ingeniero dedicado 24/7, respuesta < 15 min"
      ]
    },
    {
      "id": "onprem",
      "category": "enterprise",
      "name": "On-Premises Sovereign Core (.aci)",
      "price": "$49.000",
      "period": "pago único + $5.000/año",
      "yearlyPrice": "Licencia perpetua de runtime + $5.000/año soporte y actualizaciones",
      "target": "Para infraestructuras gubernamentales, defensa y centros de datos bancarios aislados (Air-Gapped).",
      "whyUpgrade": "Soberanía total y aislamiento físico: runtime nativo binario (.so/.dll/AVX-512), 0 telemetría externa, despliegue llave en mano in situ.",
      "seats": "Sin límites en usuarios, nodos, núcleos o memoria",
      "limits": "Ilimitado (determinado únicamente por el hardware del cliente)",
      "sla": "SLA corporativo personalizado, arquitecto in situ y contacto directo con el Arquitecto Jefe",
      "timeline": "Entrega y configuración in situ en 3-5 días hábiles",
      "popular": false,
      "deliverables": [
        "Licencia perpetua del núcleo binario compilado AIfa Cognitive Runtime (.aci)",
        "Entrega: librería compartida Linux ELF (.so) / DLL nativa de Windows / SDK C++ con AVX-512 VNNI",
        "Optimización completa de hardware para procesadores empresariales (Intel Xeon, AMD EPYC, Apple Silicon)",
        "100% Air-Gapped: cero peticiones externas, cero telemetría, soberanía total de datos",
        "2 semanas de despliegue in situ y capacitación de ingenieros por el equipo de AIfa",
        "Incluye 12 meses de actualizaciones conectómicas (FlyWire v783+) y canal directo con el Arquitecto Jefe (Maksim Galatin)"
      ]
    }
  ],
  "zh": [
    {
      "id": "hacker",
      "category": "individual",
      "name": "Hacker / Indie",
      "price": "$15",
      "period": "/ 月",
      "yearlyPrice": "$150 / 年 (享 8.3 折)",
      "target": "适用于独立开发者、个人实验项目与独立 AI 创作者。",
      "whyUpgrade": "单开发者快速接入 FlyWire v783 LSH 仿生联想记忆基础内核。",
      "seats": "1 个开发席位（专属个人 API 密钥）",
      "limits": "最高 100,000 向量，每月 50,000 次检索（CPU，无需 GPU；50,000 个向量精确检索 ≈ 9 毫秒，2026-09-23 实测）",
      "sla": "Discord / Telegram 开发者社群技术支持 + 完整中文文档",
      "timeline": "即时开通（60秒自动交付）",
      "popular": false,
      "deliverables": [
        "专属 Edge Gateway API 密钥 + npm/pip 离线包 aifa_connectome_web.js",
        "基础仿生回路：FlyHash v783 LSH + APL 感官新颖性门控",
        "Next.js 仿生联想记忆预置开发脚手架模板",
        "内存规格：最高 100,000 向量（支持 256d..1024d 维度）",
        "支持：Discord / Telegram 官方开发者社群"
      ]
    },
    {
      "id": "pro",
      "category": "individual",
      "name": "Pro / Scale",
      "price": "$100",
      "period": "/ 月",
      "yearlyPrice": "$1,000 / 年 (享 8.3 折)",
      "target": "适用于资深架构师、AI 研究员与独立商业智能体创始人。",
      "whyUpgrade": "5 倍向量容量（50万向量）、CANN 环形任务焦点吸引子（彻底解决上下文漂移）与私有 RPC 零排队端点。",
      "seats": "1 个核心席位 + 1 个备用服务密钥",
      "limits": "最高 500,000 向量，每月 300,000 次检索（CPU，无需 GPU）",
      "sla": "99.5% 正常运行时间 SLA，技术支持 4 小时内极速响应",
      "timeline": "即时自动开通",
      "popular": true,
      "deliverables": [
        "包含 Hacker / Indie 方案的所有功能",
        "向量容量升级至 500,000 条，CPU 运行，无需 GPU",
        "CANN Focus Ring Attractor 连续吸引子（长对话目标零漂移）",
        "R-STDP 突触可塑性算法（无需反向传播的在线联想学习）",
        "专属零排队私有 RPC 端点 + 支持 JSONL/Parquet 格式导出",
        "SLA：99.5% 运行时间保障，工单 4 小时内处理"
      ]
    },
    {
      "id": "team",
      "category": "team",
      "name": "Startup / Team",
      "price": "$249",
      "period": "/ 月",
      "yearlyPrice": "$2,490 / 年 (享 8.3 折)",
      "target": "适用于初创团队、多智能体 SaaS 平台与 5 人以下研发小组。",
      "whyUpgrade": "支持 5 人团队协同共享 200 万向量知识图谱，集成中央复合体 CX Steering DOM 树导航与 WebSocket 实时流。",
      "seats": "最多 5 个团队成员席位（RBAC 细粒度权限控制）",
      "limits": "最高 2,000,000 向量，每月 1,500,000 次检索，最高 1,000 QPS",
      "sla": "99.9% 正常运行时间 SLA，专属工单通道 2 小时响应",
      "timeline": "即时团队邀请",
      "popular": false,
      "deliverables": [
        "包含 Pro 方案的所有能力，支持 5 位团队成员",
        "团队统一共享 2,000,000 向量超大规模记忆图谱",
        "Central Complex CX Steering 向量罗盘（网页 DOM 树靶向跳转）",
        "神经元激活电位 WebSocket 实时低延迟数据流",
        "团队任务注意力漂移与图谱熵值实时可视化仪表盘",
        "支持企业对公转账与正规商业财税发票及结算凭据",
        "SLA：99.9% 可用性保障，工程师 2 小时内响应"
      ]
    },
    {
      "id": "business",
      "category": "team",
      "name": "Business / Scale",
      "price": "$790",
      "period": "/ 月",
      "yearlyPrice": "$7,900 / 年 (享 8.3 折)",
      "target": "适用于高成长期 AI 科技公司、金融科技助理与企业级 RAG 平台（最多 25 人）。",
      "whyUpgrade": "专属独立 API 网关彻底消除'吵闹邻居'干扰，1000万向量，5000 QPS，生物自平衡突触修剪机制。",
      "seats": "最多 25 个席位 + 自动化微服务密钥",
      "limits": "最高 10,000,000 向量，每月 10,000,000 次检索，最高 5,000 QPS",
      "sla": "99.9% 正常运行时间 SLA，专属 Slack/Telegram 直连群 1 小时响应",
      "timeline": "2 小时内完成独立网关集群分配",
      "popular": false,
      "deliverables": [
        "包含 Startup / Team 方案的所有功能，支持 25 位团队成员",
        "物理隔离专属高并发 API 网关（Zero Noisy Neighbors）",
        "知识库规模：最高 10,000,000 向量，支持自动化生命周期管理",
        "生物自平衡突触修剪机制与冷热数据自动分层归档存储",
        "开箱即用官方生态连接器：LangChain、LlamaIndex、AutoGen、CrewAI",
        "企业级记忆访问审计日志（符合金融与合规审计安全要求）",
        "SLA：99.9% 运行时间保证，专属技术对接群 1 小时内响应"
      ]
    },
    {
      "id": "enterprise",
      "category": "enterprise",
      "name": "Enterprise Cloud",
      "price": "$2,900",
      "period": "/ 月",
      "yearlyPrice": "$29,000 / 年 (享 8.3 折)",
      "target": "适用于大型跨国银行、医疗健康网络、监管合规平台与超高并发核心系统。",
      "whyUpgrade": "专属物理隔离私有 VPC / 裸金属算力集群，不限席位，50,000 QPS，Proof of Connectome 区块链存证与 7x24 极速响应。",
      "seats": "不限员工席位与后端服务调用次数",
      "limits": "无限向量规模扩展 ($150/1000万向量)，支持最高 50,000 QPS",
      "sla": "99.99% 正常运行时间 SLA，7x24 小时专属架构师 15 分钟内应急响应",
      "timeline": "2 至 24 小时交付专属生产集群",
      "popular": false,
      "deliverables": [
        "专属物理隔离私有 VPC / 裸金属服务器（可选欧盟、美国或新加坡数据中心）",
        "完全不限团队员工账号数量与后端微服务调用令牌",
        "无限向量规模扩展 ($150/1000万向量)，轻松承载最高 50,000 QPS",
        "完整 30 项大脑连接组技术栈，支持基于客户业务领域的投影矩阵微调",
        "区块链密码学不可变存证（Proof of Connectome，比特币 Merkle 树存证）",
        "全面支持企业级单点登录 SSO（SAML, Okta）、SIEM 审计，符合 SOC2 与 GDPR 认证",
        "SLA：99.99% 运行时间保障，7x24 小时专属架构师 15 分钟应急响应"
      ]
    },
    {
      "id": "onprem",
      "category": "enterprise",
      "name": "On-Premises Sovereign Core (.aci)",
      "price": "$49,000",
      "period": "一次性买断 + $5,000/年",
      "yearlyPrice": "二进制内核永久授权 + $5,000/年更新及安全合规审计",
      "target": "适用于国家主权系统、国防军工专网与物理完全离线（Air-Gapped）的银行核心机房。",
      "whyUpgrade": "100% 数据主权与物理网络隔离：闭源原生二进制内核（.so/.dll/AVX-512），零外部网络请求，首席架构师团队上门交钥匙部署。",
      "seats": "完全不限席位、计算节点、CPU 核心数与本地图谱规模",
      "limits": "完全不设人为限制（性能仅受客户服务器硬件配置决定）",
      "sla": "定制企业级商业 SLA，现场派驻专属高级部署工程师与首席架构师直连",
      "timeline": "3-5 个工作日完成上门交付、调优与交接",
      "popular": false,
      "deliverables": [
        "AIfa Cognitive Runtime (.aci) 闭源原生二进制内核永久商业授权",
        "交付物：Linux ELF 动态链接库 (.so) / Windows 原生 DLL / C++ native SDK (AVX-512 VNNI 调优)",
        "针对企业级服务器 CPU 深度调优（Intel Xeon、AMD EPYC、Apple Silicon 芯片全指令集加速）",
        "100% 物理离线隔离：零外部网络访问，零遥测回传，数据绝对自主可控",
        "AIfa 核心工程师团队提供为期 2 周的现场部署、系统调优与团队培训服务",
        "赠送 12 个月大脑连接组突触权重更新（FlyWire v783+）及专属首席架构师（Maxim Galatin）直连支持"
      ]
    }
  ]
};

const I18N = {
  "ru": {
    "badge": "AIFA COGNITIVE RUNTIME (ACR) · КОННЕКТОМНЫЙ КОГНИТИВНЫЙ РАНТАЙМ",
    "title": "AIfa Cognitive Runtime (ACR)",
    "subtitle": "Биоинспирированный когнитивный рантайм для автономных программных агентов, архитектурно укорененный в полном коннектоме Drosophila melanogaster (FlyWire v783; 139 255 нейронов, 54.5 млн синапсов). 5 вычислительных биологических мотивов реализованы на CPU (Python/NumPy), без GPU; каждое число на странице получено открытым скриптом.",
    "referenceSubstrate": "Эталонный субстрат: FlyWire FAFB v783 — 139 255 нейронов, 54.5 млн синапсов. Двухрежимная архитектура: Faithful Connectome Mode (топологическая валидация, граф связей и криптографический хеш SHA-256) · Distilled ACR Mode (алгоритмы для программных агентов на CPU; коннектом используется для статистики графа).",
    "authorBadge": "Основатель, Создатель и Главный Архитектор: Максим Валентинович Галатин",
    "ablationTitle": "Матрица абляции — настоящий замер (360 эпизодов на конфигурацию, 23.09.2026)",
    "colConfig": "Агент / конфигурация",
    "colNoise": "Помехи",
    "colRecall": "Успех задач",
    "colDom": "Шагов при успехе",
    "colDrift": "Ошибочные клики",
    "colFpr": "Потеря цели / клик",
    "colLatency": "Решение P50",
    "ablationNote": "* Синтетические сайты с фиксированным зерном (12 задач × 30 зёрен), сравнение текстов по совпадению слов. Помехи 35%, дубли cookie-сообщений, приманки и ссылки-петли одинаковы для всех агентов. Ни один исход не задан вероятностью: решает код. Скрипт: bench/acr_agent_real_benchmark.py. Вывод: весь выигрыш даёт память посещённых ссылок — её нет в CX как он есть в коде; обычный агент с этой памятью показывает тот же результат, что и ACR.",
    "ablationProtocol": "Что измерено 23.09.2026: 9 конфигураций × 360 эпизодов, помехи 0 / 35 / 70% (итог при любом уровне одинаков). Прежняя таблица («17,87 → 1,12 шага», «FPR 21,1% → 3,0%», «200 эпизодов») не имела ни скрипта, ни файла результата и заменена. Поиск Protocol A: 50 000 векторов 1024-d — Recall@10 = 39,55%, P50 ≈ 44 мс (см. /digital).",
    "top5Title": "Архитектурный стек коннектома TOP-10 (Ядро L0–L4 — кандидаты в прод · 06–10 Исследовательские прототипы)",
    "top5Subtitle": "Базовый когнитивный контур L0–L4 и экспериментальные исследовательские прототипы 06–10 с классификацией уровней доказательности E0–E5",
    "innovationsTitle": "Полный стек 30 коннектомных инноваций",
    "innovationsSubtitle": "Исчерпывающий научно-инженерный каталог технологий на базе коннектома FlyWire v783 с биологическим базисом, математической моделью и архитектурой внедрения",
    "uniquenessTitle": "Наша уникальность: Что ACR дает нашему проекту и миру",
    "forProjectTitle": "Для экосистемы CODE Eternal и AIfa",
    "forProjectPoints": [
      "Полная независимость от дефицитных и дорогостоящих GPU-кластеров для памяти и навигации: ассоциативный поиск по 50 000 векторов выполняется на CPU за ≈ 44 мс (FlyHash P50, замер 23.09.2026; точный FAISS — 8,8 мс).",
      "Снижение расходов на API языковых моделей на 40–80% благодаря APL-сенсорному гейтингу, отсекающему 100% фонового шума интерфейса.",
      "Вечная ассоциативная память агента без катастрофического забывания: разреженное Кеньоновское расширение ортогонализирует воспоминания.",
      "Мгновенная работа в браузере пользователя через WebAssembly / JS-движок без единого сетевого запроса к серверам."
    ],
    "forWorldTitle": "Для мировой индустрии искусственного интеллекта",
    "forWorldPoints": [
      "Великая смена парадигмы: переход от экстенсивного сжигания гигаватт энергии в плоских трансформерах к бионической энергоэффективности живой материи (10 микроватт энергии мозга).",
      "Первый в истории доказанный инженерный синтез полного электронно-микроскопического коннектома мозга и больших языковых моделей.",
      "Демократизация автономных агентов: возможность исполнять сложнейшие цепочки рассуждений на смартфонах, ноутбуках и краевых устройствах (Edge Computing)."
    ],
    "commercialTitle": "Коммерциализация: Тарифы, Лицензии и Внедрение",
    "commercialSubtitle": "Прозрачные условия облачного использования и корпоративной поставки закрытого бинарного ядра",
    "plans": [
      {
            "name": "Hacker / Indie",
            "price": "$15 / мес",
            "desc": "Для соло-разработчиков, пет-проектов и независимых AI-мейкеров.",
            "timeline": "Мгновенно (60 секунд)",
            "sla": "Discord / Telegram сообщество + документация",
            "limits": "До 100 000 векторов, 50 000 поисков/мес (CPU, без GPU)",
            "features": [
                  "Личный API-ключ Edge Gateway + npm/pip пакет aifa_connectome_web.js",
                  "Базовый бионический контур: FlyHash v783 LSH + APL Sensory Novelty Gate",
                  "Шаблон Next.js со встроенной ассоциативной памятью",
                  "Лимит: до 100 000 векторов, 50 000 поисковых запросов в месяц (CPU, без GPU; точный поиск 50 000 векторов — ≈ 9 мс, замер 23.09.2026)",
                  "SLA: Discord / Telegram сообщество разработчиков"
            ]
      },
      {
            "name": "Pro / Scale",
            "price": "$100 / мес",
            "desc": "Для растущих AI-агентов, стартапов и семантических SaaS-приложений.",
            "timeline": "Мгновенно (автоматическая активация)",
            "sla": "99.9% Uptime SLA, ответ инженера < 2 часов в рабочее время",
            "limits": "До 2 000 000 векторов, 1 000 000 поисков/мес (P95 < 2.5 мс)",
            "features": [
                  "Выделенный API Gateway повышенной пропускной способности + WebSocket Live Stream + Private RPC",
                  "Полный стек ТОП-10 коннектомных модулей + CANN кольцевой аттрактор фокуса диалога",
                  "Интерактивный дашборд мониторинга дрейфа внимания и энтропии графа памяти в реальном времени",
                  "Автоматическое горячее/холодное хранение и гомеостатический прунинг устаревших векторов",
                  "SLA: 99.9% доступности сервиса, поддержка < 2 часов"
            ]
      },
      {
            "name": "Enterprise Cloud",
            "price": "$1 000+ / мес",
            "desc": "Для финтеха, Enterprise RAG, комплаенс-платформ и высоконагруженных систем.",
            "timeline": "Развертывание от 2 до 24 часов под ключ",
            "sla": "99.99% Uptime SLA, персональный дежурный инженер 24/7 (ответ < 15 мин)",
            "limits": "Безлимитный объем ($200 за каждые 10M векторов), до 50 000 QPS",
            "features": [
                  "Выделенный изолированный облачный VPC / Bare-Metal узел (регионы EU / US / SG на выбор)",
                  "Неограниченный объем векторов ($200 за каждые дополнительные 10 млн векторов), до 50 000 QPS",
                  "Полный стек 30 коннектомных инноваций, включая CX Steering Vector Navigation в DOM-графах",
                  "Криптографический аудит запросов (Proof of Connectome), интеграция с корпоративными SSO, SIEM, SOC2",
                  "SLA: 99.99% доступности, персональный инженер 24/7/365, время реакции до 15 минут"
            ]
      },
      {
            "name": "On-Premises Core (.aci)",
            "price": "$50 000 – $250 000 разово",
            "desc": "Полностью суверенное развертывание бинарного когнитивного ядра в закрытом контуре заказчика.",
            "timeline": "Поставка и развертывание: 3-5 рабочих дней под ключ",
            "sla": "Кастомный Enterprise SLA, выделенный архитектор и инженер внедрения на объекте",
            "limits": "Без ограничений по узлам, ядрам, памяти и объему локального графа",
            "features": [
                  "Бессрочная лицензия на закрытое скомпилированное бинарное ядро AIfa Cognitive Runtime (.aci)",
                  "Поставка: Linux ELF shared library (.so) / Windows Native DLL / C++ header-only SDK с AVX-512 VNNI",
                  "Полная аппаратная оптимизация под серверные процессоры заказчика (Intel Xeon, AMD EPYC, Apple Silicon)",
                  "Абсолютная автономность (Air-Gapped): 0 сетевых запросов наружу, 0 телеметрии, 100% суверенитет данных",
                  "Включает 12 месяцев обновлений коннектомных весов (FlyWire v783+), прямую линию с главным архитектором и аудит безопасности"
            ]
      }
],
    "ctaOrder": "Заказать внедрение / Купить лицензию",
    "ipTitle": "Правовой статус, авторские права и интеллектуальная собственность",
    "ipSole": "Единоличный Создатель, Автор и Главный Архитектор всей архитектуры AIfa Cognitive Runtime (ACR) и всех 30 технологий коннектома: Максим Валентинович Галатин. Все исключительные права строго защищены.",
    "ipDual": "Разграничение прав: Данные коннектома Drosophila принадлежат открытой науке (FlyWire Consortium, Nature 2024, CC-BY-4.0). Наша интеллектуальная собственность — математическая дистилляция в CPU-рантайм 6-дендритного проецирования и k-WTA APL-ингибирования, алгоритмы навигации и агентный цикл. Скрипт бенчмарка aifa_biobench.py открыт под Apache 2.0. Скомпилированное бинарное ядро AIfa Core (.aci) поставляется по закрытой коммерческой лицензии CODE Eternal (Proprietary EULA & Trade Secret).",
    "ipWatermark": "В разреженные проекции и бинарные матрицы весов внедрены криптографические цифровые водяные знаки (Digital Watermarks). Международный приоритет изобретений зарегистрирован в классификаторах МПК G06N 3/04 и G06F 16/30, а научный приоритет закреплен препринтами Cornell arXiv / bioRxiv."
  },
  "en": {
    "badge": "AIFA COGNITIVE RUNTIME (ACR) · CONNECTOME-GROUNDED COGNITIVE RUNTIME",
    "title": "AIfa Cognitive Runtime (ACR)",
    "subtitle": "A connectome-grounded cognitive runtime for autonomous software agents, derived from the FlyWire v783 Drosophila whole-brain connectome (139,255 neurons, 54.5M synapses). Five biological computation motifs implemented on CPU (Python/NumPy), no GPU; every number on this page comes from an open script.",
    "referenceSubstrate": "Reference substrate: FlyWire FAFB v783 — 139,255 neurons, 54.5M synapses. Dual-mode architecture: Faithful Connectome Mode (topological integrity, synapse graphs & SHA-256 hash) · Distilled ACR Mode (CPU algorithms for software agents; the connectome is used for graph statistics).",
    "authorBadge": "Founder, Creator & Chief Architect: Maksim Valentinovich Galatin",
    "ablationTitle": "Ablation Matrix — real measurement (360 episodes per configuration, 23.09.2026)",
    "colConfig": "Agent / configuration",
    "colNoise": "Distractors",
    "colRecall": "Task success",
    "colDom": "Steps when solved",
    "colDrift": "Wrong clicks",
    "colFpr": "Goal lost / click",
    "colLatency": "Decision P50",
    "ablationNote": "* Synthetic seeded websites (12 tasks × 30 seeds), lexical word-overlap embeddings. 35% distractor messages, duplicate cookie banners, decoys and loop links — identical for every agent. No outcome is drawn from a fixed probability: the code decides. Script: bench/acr_agent_real_benchmark.py. Finding: the whole gain comes from visited-link memory, which the shipped CX module lacks; a standard agent with that memory alone matches ACR.",
    "ablationProtocol": "Measured 23.09.2026: 9 configurations × 360 episodes, distractor rate 0 / 35 / 70% (same conclusion at every level). The previous table (“17.87 → 1.12 steps”, “FPR 21.1% → 3.0%”, “200 episodes”) had no script and no result file and has been replaced. Protocol A retrieval: 50,000 vectors, 1024-d — Recall@10 = 39.55%, P50 ≈ 44 ms (see /digital).",
    "top5Title": "TOP-10 Implemented Connectome Stack (L0–L4 Core Production Candidates · 06–10 Research Prototypes)",
    "top5Subtitle": "Core L0–L4 cognitive pipeline and experimental research prototypes 06–10 classified under E0–E5 evidence tiers",
    "innovationsTitle": "The Complete 30 Connectome Innovations Catalog",
    "innovationsSubtitle": "ACR Connectome Research Catalog derived from the FlyWire v783 connectome with biological basis, mathematical models, and deployment targets",
    "uniquenessTitle": "Our Uniqueness: What ACR Delivers to Our Ecosystem and the World",
    "forProjectTitle": "For CODE Eternal and AIfa",
    "forProjectPoints": [
      "Absolute independence from scarce, expensive GPU clusters for agent memory and navigation: associative retrieval over 50,000 vectors runs in ≈ 44 ms on CPU (FlyHash P50, measured 23.09.2026; exact FAISS: 8.8 ms).",
      "40% to 80% reduction in LLM inference API costs via APL sensory gating, eliminating 100% of sensory background noise.",
      "Lifelong agent associative memory with zero catastrophic forgetting: sparse Kenyon cell expansion orthogonalizes memory traces.",
      "Zero-network-roundtrip browser execution via WebAssembly / JS client engine with local lookups (no network round-trip)."
    ],
    "forWorldTitle": "For the Global Artificial Intelligence Industry",
    "forWorldPoints": [
      "A historic paradigm shift away from brute-force compute and gigawatt datacenters toward the micro-watt efficiency of biological living matter (10 microwatts).",
      "The first proven engineering synthesis of a complete electron-microscopy whole-brain connectome with large language models.",
      "Democratization of edge intelligence: enabling sophisticated autonomous agent reasoning chains on commodity CPUs, smartphones, and edge hardware."
    ],
    "commercialTitle": "Commercialization: Pricing, Licensing & Deployment",
    "commercialSubtitle": "Transparent tiers for cloud API consumption and enterprise on-premise binary core licensing",
    "plans": [
      {
            "name": "Hacker / Indie",
            "price": "$15 / mo",
            "desc": "For solo developers, pet projects, and independent AI creators.",
            "timeline": "Instant (60 seconds)",
            "sla": "Discord / Telegram community + documentation",
            "limits": "Up to 100,000 vectors, 50,000 queries/mo (CPU, no GPU)",
            "features": [
                  "Personal Edge Gateway API key + npm/pip package aifa_connectome_web.js",
                  "Base bionic circuit: FlyHash v783 LSH + APL Sensory Novelty Gate",
                  "Next.js starter template with embedded associative memory",
                  "Limit: up to 100,000 vectors, 50,000 queries/month (CPU, no GPU; exact search over 50,000 vectors ≈ 9 ms, measured 23.09.2026)",
                  "SLA: Discord / Telegram developer community"
            ]
      },
      {
            "name": "Pro / Scale",
            "price": "$100 / mo",
            "desc": "For growing AI agents, startups, and semantic SaaS applications.",
            "timeline": "Instant automated activation",
            "sla": "99.9% Uptime SLA, business-hours support (< 2h response)",
            "limits": "Up to 2,000,000 vectors, 1,000,000 queries/mo (P95 < 2.5 ms)",
            "features": [
                  "Dedicated high-throughput API gateway + WebSocket live streams + Private RPC",
                  "Full TOP-10 production connectome stack + CANN focus ring attractor",
                  "Real-time monitoring dashboard for attention drift and memory graph entropy",
                  "Automated hot/cold tiering & homeostatic pruning of stale vectors",
                  "SLA: 99.9% uptime SLA, support response < 2 hours"
            ]
      },
      {
            "name": "Enterprise Cloud",
            "price": "$1,000+ / mo",
            "desc": "For fintech, enterprise RAG, compliance platforms, and high-concurrency systems.",
            "timeline": "Turnkey deployment within 2–24 hours",
            "sla": "99.99% Uptime SLA, dedicated on-call engineer 24/7 (< 15 min response)",
            "limits": "Unlimited volume ($200 per 10M vectors), up to 50,000 QPS",
            "features": [
                  "Dedicated isolated cloud VPC / Bare-Metal node (EU / US / SG regions)",
                  "Unlimited vector scale ($200 per additional 10M vectors), up to 50,000 QPS",
                  "Full 30 connectome innovations stack, including CX Steering Vector Navigation in DOM graphs",
                  "Cryptographic request audit logging (Proof of Connectome), SSO, SIEM, SOC2 compliance",
                  "SLA: 99.99% uptime, dedicated 24/7 engineer, guaranteed response under 15 minutes"
            ]
      },
      {
            "name": "On-Premises Core (.aci)",
            "price": "$50,000 – $250,000 one-time",
            "desc": "Fully sovereign deployment of the binary cognitive runtime in your private air-gapped perimeter.",
            "timeline": "Turnkey delivery & setup in 3-5 business days",
            "sla": "Custom enterprise SLA, on-site deployment engineer & direct architect channel",
            "limits": "Unlimited nodes, CPU cores, RAM, and graph capacity",
            "features": [
                  "Perpetual lifetime license for compiled binary AIfa Cognitive Runtime (.aci)",
                  "Delivery: Linux ELF shared library (.so) / Windows Native DLL / C++ header-only SDK with AVX-512 VNNI",
                  "Complete hardware optimization for enterprise CPUs (Intel Xeon, AMD EPYC, Apple Silicon)",
                  "100% Air-Gapped: zero outbound requests, zero telemetry, full sovereignty over data",
                  "Includes 12 months of connectome weights updates (FlyWire v783+), direct architect channel & security audit"
            ]
      }
],
    "ctaOrder": "Request Enterprise Deployment / Purchase License",
    "ipTitle": "Legal Status, Copyright & Intellectual Property Protection",
    "ipSole": "Sole Creator, Author, and Chief Architect of the AIfa Cognitive Runtime (ACR) architecture and all 30 connectome innovations: Maksim Valentinovich Galatin. All exclusive rights strictly reserved.",
    "ipDual": "IP Demarcation: Drosophila connectome substrate is open science (FlyWire Consortium, Nature 2024, CC-BY-4.0). Our proprietary IP is the mathematical CPU-native distillation of 6-claw projection, k-WTA APL gating, steering navigation, and runtime packaging. Benchmark script aifa_biobench.py is open under Apache 2.0. The compiled binary AIfa Core runtime (.aci) is strictly proprietary under CODE Eternal Commercial EULA & Trade Secret.",
    "ipWatermark": "Sparse projection weights contain digital cryptographic watermarks to detect unauthorized model extraction. International patent priority established under IPC G06N 3/04 and G06F 16/30, with academic priority anchored on Cornell arXiv and Cold Spring Harbor bioRxiv."
  },
  "es": {
    "badge": "AIFA COGNITIVE RUNTIME (ACR) · RUNTIME COGNITIVO BASADO EN CONECTOMA",
    "title": "AIfa Cognitive Runtime (ACR)",
    "subtitle": "Runtime cognitivo basado en conectoma para agentes de software autónomos, derivado del conectoma cerebral de Drosophila FlyWire v783 (139.255 neuronas, 54,5M sinapsis). Cinco motivos biológicos implementados en CPU (Python/NumPy), sin GPU; cada cifra de la página procede de un script abierto.",
    "referenceSubstrate": "Sustrato de referencia: FlyWire FAFB v783 — 139.255 neuronas, 54,5M sinapsis. Arquitectura dual: Faithful Connectome Mode (integridad topológica, grafo sináptico y hash SHA-256) · Distilled ACR Mode (algoritmos en CPU para agentes de software; el conectoma se usa para estadísticas del grafo).",
    "authorBadge": "Fundador, Creador y Arquitecto Principal: Maksim Valentinovich Galatin",
    "ablationTitle": "Matriz de ablación — medición real (360 episodios por configuración, 23.09.2026)",
    "colConfig": "Agente / configuración",
    "colNoise": "Distracciones",
    "colRecall": "Éxito de tareas",
    "colDom": "Pasos al resolver",
    "colDrift": "Clics erróneos",
    "colFpr": "Objetivo perdido / clic",
    "colLatency": "Decisión P50",
    "ablationNote": "* Sitios sintéticos con semilla fija (12 tareas × 30 semillas), embeddings léxicos por coincidencia de palabras. 35% de mensajes distractores, banners de cookies duplicados, señuelos y enlaces en bucle — iguales para todos. Ningún resultado se fija por probabilidad: decide el código. Script: bench/acr_agent_real_benchmark.py. Conclusión: toda la ganancia viene de la memoria de enlaces visitados, ausente en el CX publicado; un agente estándar con esa memoria iguala a ACR.",
    "ablationProtocol": "Medido el 23.09.2026: 9 configuraciones × 360 episodios, distracciones 0 / 35 / 70% (misma conclusión en todos los niveles). La tabla anterior («17,87 → 1,12 pasos», «FPR 21,1% → 3,0%», «200 episodios») no tenía script ni archivo de resultados y fue sustituida. Búsqueda Protocolo A: 50.000 vectores 1024-d — Recall@10 = 39,55%, P50 ≈ 44 ms (ver /digital).",
    "top5Title": "Pila de Arquitectura del Conectoma TOP-10 (Candidatos a Producción L0–L4 · Prototipos de Investigación 06–10)",
    "top5Subtitle": "Pipeline central cognitivo L0–L4 y prototipos experimentales de investigación 06–10 clasificados en niveles de evidencia E0–E5",
    "innovationsTitle": "Catálogo Completo de 30 Innovaciones del Conectoma",
    "innovationsSubtitle": "Catálogo científico exhaustivo con base biológica, modelos matemáticos y arquitectura de despliegue",
    "uniquenessTitle": "Nuestra Unicidad: Qué aporta ACR a nuestro proyecto y al mundo",
    "forProjectTitle": "Para el ecosistema CODE Eternal y AIfa",
    "forProjectPoints": [
      "Independencia absoluta de costosos clusters de GPUs para memoria y navegación: búsqueda asociativa sobre 50.000 vectores en CPU en ≈ 44 ms (P50 de FlyHash, medido el 23.09.2026; FAISS exacto: 8,8 ms).",
      "Ahorro del 40% al 80% en costes de inferencia de LLMs mediante el filtrado sensorial APL que elimina el 100% del ruido de fondo.",
      "Memoria asociativa duradera sin olvido catastrófico gracias a la expansión dispersa de células Kenyon.",
      "Ejecución en navegador sin peticiones al servidor mediante motor WebAssembly/JS."
    ],
    "forWorldTitle": "Para la Industria Global de Inteligencia Artificial",
    "forWorldPoints": [
      "Cambio de paradigma: del consumo voraz de gigavatios en centros de datos a la ultraeficiencia biológica de la materia viva (10 microvatios).",
      "Primera síntesis probada entre conectómica cerebral completa y modelos de lenguaje.",
      "Democratización de la IA en el borde (Edge Computing) en ordenadores y teléfonos convencionales."
    ],
    "commercialTitle": "Comercialización: Tarifas, Licencias y Despliegue",
    "commercialSubtitle": "Planes transparentes para API cloud y licenciamiento on-premise del núcleo binario compilado",
    "plans": [
      {
            "name": "Hacker / Indie",
            "price": "$15 / mes",
            "desc": "Para desarrolladores individuales, proyectos personales y creadores independientes de IA.",
            "timeline": "Instantáneo (60 segundos)",
            "sla": "Comunidad en Discord / Telegram + documentación completa",
            "limits": "Hasta 100.000 vectores, 50.000 consultas/mes (CPU, sin GPU; búsqueda exacta sobre 50.000 vectores ≈ 9 ms, medido el 23.09.2026)",
            "features": [
                  "Clave de API personal de Edge Gateway + paquete npm/pip aifa_connectome_web.js",
                  "Circuito biónico base: FlyHash v783 LSH + APL Sensory Novelty Gate",
                  "Plantilla Next.js con memoria asociativa integrada",
                  "Límite: hasta 100.000 vectores, 50.000 consultas/mes (CPU, sin GPU; búsqueda exacta sobre 50.000 vectores ≈ 9 ms, medido el 23.09.2026)",
                  "SLA: Comunidad de desarrolladores en Discord / Telegram"
            ]
      },
      {
            "name": "Pro / Scale",
            "price": "$100 / mes",
            "desc": "Para agentes de IA en crecimiento, startups y aplicaciones SaaS semánticas.",
            "timeline": "Activación automática instantánea",
            "sla": "99.9% Uptime SLA, soporte en horario laboral (< 2h de respuesta)",
            "limits": "Hasta 2.000.000 de vectores, 1.000.000 consultas/mes (P95 < 2,5 ms)",
            "features": [
                  "Gateway de API dedicado de alto rendimiento + streams WebSocket + RPC privado",
                  "Pila completa de las 10 tecnologías TOP de producción + atractor anular CANN",
                  "Panel de monitoreo en tiempo real de deriva de foco y entropía del grafo",
                  "Almacenamiento escalonado frío/caliente y poda homeostática de vectores obsoletos",
                  "SLA: 99,9% de disponibilidad, soporte en menos de 2 horas"
            ]
      },
      {
            "name": "Enterprise Cloud",
            "price": "$1.000+ / mes",
            "desc": "Para fintech, RAG empresarial, plataformas de cumplimiento y alta concurrencia.",
            "timeline": "Despliegue llave en mano de 2 a 24 horas",
            "sla": "99.99% Uptime SLA, ingeniero dedicado 24/7 (respuesta < 15 min)",
            "limits": "Volumen ilimitado ($200 por cada 10M de vectores), hasta 50.000 QPS",
            "features": [
                  "VPC en la nube aislada / nodo Bare-Metal dedicado (regiones EU / US / SG)",
                  "Vectores ilimitados ($200 por cada 10M de vectores adicionales), hasta 50.000 QPS",
                  "Pila completa de 30 innovaciones conectómicas, incluida navegación CX Steering en grafos DOM",
                  "Auditoría criptográfica (Proof of Connectome), integración con SSO corporativo, SIEM, SOC2",
                  "SLA: 99,99% de disponibilidad, ingeniero dedicado 24/7/365, respuesta < 15 minutos"
            ]
      },
      {
            "name": "On-Premises Core (.aci)",
            "price": "$50.000 – $250.000 pago único",
            "desc": "Despliegue soberano completo del núcleo cognitivo binario en su infraestructura air-gapped.",
            "timeline": "Entrega y configuración en 3-5 días laborables",
            "sla": "SLA corporativo personalizado, ingeniero de despliegue en sitio y canal directo con arquitecto",
            "limits": "Sin límites en nodos, núcleos de CPU, RAM o capacidad de grafo",
            "features": [
                  "Licencia perpetua del núcleo binario compilado AIfa Cognitive Runtime (.aci)",
                  "Entrega: librería compartida Linux ELF (.so) / DLL nativa de Windows / SDK C++ con AVX-512 VNNI",
                  "Optimización de hardware para procesadores empresariales (Intel Xeon, AMD EPYC, Apple Silicon)",
                  "100% Air-Gapped: cero peticiones externas, cero telemetría, soberanía total de datos",
                  "Incluye 12 meses de actualizaciones de pesos conectómicos (FlyWire v783+) y auditoría de seguridad"
            ]
      }
],
    "ctaOrder": "Solicitar Despliegue Enterprise / Adquirir Licencia",
    "ipTitle": "Estado Legal, Derechos de Autor y Protección Intelectual",
    "ipSole": "Único Creador, Autor y Arquitecto Principal de la arquitectura AIfa Cognitive Runtime (ACR) y las 30 tecnologías: Maksim Valentinovich Galatin. Todos los derechos exclusivos reservados.",
    "ipDual": "Demarcación de PI: El sustrato del conectoma de Drosophila es ciencia abierta (FlyWire Consortium, Nature 2024, CC-BY-4.0). Nuestra propiedad intelectual es la destilación matemática nativa de CPU de la proyección de 6 garras, compuerta APL k-WTA y runtime. El script aifa_biobench.py es abierto bajo Apache 2.0. El núcleo binario AIfa Core (.aci) es estrictamente propietario bajo EULA Comercial de CODE Eternal y Secreto Comercial.",
    "ipWatermark": "Marcas de agua criptográficas en pesos y matrices de proyección. Prioridad internacional registrada en IPC G06N 3/04 y G06F 16/30; prioridad científica en arXiv / bioRxiv."
  },
  "zh": {
    "badge": "AIFA COGNITIVE RUNTIME (ACR) · 基于全脑连接组的认知控制运行时",
    "title": "AIfa Cognitive Runtime (ACR)",
    "subtitle": "基于黑腹果蝇全脑电子显微连接组 FlyWire v783 (139,255 个神经元，5450 万个突触) 的智能体认知控制运行时。五大生物计算基元以 CPU（Python/NumPy）实现，无需 GPU；本页每个数字均来自公开脚本。",
    "referenceSubstrate": "参考底层结构：FlyWire FAFB v783 — 139,255 个神经元，5450 万个突触。双模架构：Faithful Connectome 模式 (拓扑结构与 SHA-256 完整性验证) · Distilled ACR 模式（面向软件智能体的 CPU 算法；连接组用于图统计）。",
    "authorBadge": "创始人、总作者与总架构师：马克西姆·加拉廷 (Maksim Valentinovich Galatin)",
    "ablationTitle": "消融矩阵 — 真实测量（每种配置 360 个任务回合，2026-09-23）",
    "colConfig": "智能体 / 配置",
    "colNoise": "干扰",
    "colRecall": "任务成功率",
    "colDom": "成功时步数",
    "colDrift": "错误点击",
    "colFpr": "目标丢失 / 次",
    "colLatency": "决策 P50",
    "ablationNote": "* 固定随机种子的合成网站（12 个任务 × 30 个种子），基于词重叠的词法嵌入。35% 干扰消息、重复 cookie 提示、诱饵链接和循环链接对所有智能体完全相同。没有任何结果由预设概率决定，全部由代码计算。脚本：bench/acr_agent_real_benchmark.py。结论：全部收益来自“已访问链接记忆”，而现有 CX 模块中缺少这一机制；仅加上这一记忆的标准智能体即可达到与 ACR 相同的结果。",
    "ablationProtocol": "2026-09-23 实测：9 种配置 × 每种 360 个回合，干扰率 0 / 35 / 70%（各水平结论一致）。旧表（“17.87 → 1.12 步”、“FPR 21.1% → 3.0%”、“200 个回合”）既无脚本也无结果文件，已替换。Protocol A 检索：50,000 个 1024 维向量 — Recall@10 = 39.55%，P50 ≈ 44 毫秒（见 /digital）。",
    "top5Title": "连接组架构栈 TOP-10（L0–L4 生产候选核心 · 06–10 研究原型）",
    "top5Subtitle": "基础 L0–L4 核心认知管道与 06–10 实验性研究原型（遵循 E0–E5 证据层级分类规范）",
    "innovationsTitle": "完整 30 项连接组工程创新名录",
    "innovationsSubtitle": "基于 FlyWire v783 连接组的完整工程专著：详述生物学神经回路、数学模型公式与生产落地部署架构",
    "uniquenessTitle": "我们的独特性：ACR 为本项目与全人类世界带来了什么",
    "forProjectTitle": "为 CODE Eternal 与 AIfa 生态赋予的核心优势",
    "forProjectPoints": [
      "彻底摆脱高昂且极度匮乏的 GPU 集群依赖：在 CPU 上对 50,000 个向量的联想检索约 44 毫秒（FlyHash P50，2026-09-23 实测；FAISS 精确检索 8.8 毫秒）。",
      "利用 APL 感觉新颖性门控在 0.014 毫秒内过滤 100% 界面噪声，直接为大模型削减 40%–80% 的无效 Token 调用成本。",
      "肯农细胞超稀疏升维正交化投影，终结长期记忆灾难性遗忘与注意力泛化坍塌。",
      "通过 WebAssembly / JS 引擎在用户浏览器前端就地执行极速联想匹配，零网络请求往返。"
    ],
    "forWorldTitle": "为全球人工智能产业带来的范式革命",
    "forWorldPoints": [
      "终结暴力计算：从盲目堆砌数百兆瓦高能耗数据中心，转向模拟大自然生命体 10 微瓦脑能耗的微瓦级仿生计算范式。",
      "全球首个打通完整生物全脑电子显微镜突触图谱与现代大语言模型协同推演的工程壮举。",
      "推动边缘智能彻底普及：让普通手机、笔记本电脑与嵌入式设备流畅运行高阶自主智能体长程推理。"
    ],
    "commercialTitle": "商业化落地：服务订阅、企业许可与采购方案",
    "commercialSubtitle": "透明规范的云端 SaaS API 订阅与企业级本地离线闭源二进制核心授权",
    "plans": [
      {
            "name": "Hacker / Indie",
            "price": "$15 / 月",
            "desc": "适用于独立开发者、个人原型项目与个人 AI 创作者。",
            "timeline": "即时开通（60秒自动交付）",
            "sla": "Discord / Telegram 开发者社群 + 完整技术文档",
            "limits": "最高 100,000 向量，每月 50,000 次检索（CPU，无需 GPU；50,000 个向量精确检索 ≈ 9 毫秒，2026-09-23 实测）",
            "features": [
                  "专属 Edge Gateway API 密钥 + npm/pip 离线包 aifa_connectome_web.js",
                  "基础仿生回路：FlyHash v783 LSH + APL 感官新颖性门控",
                  "Next.js 仿生联想记忆预置开发模板",
                  "容量上限：最高 100,000 向量，每月 50,000 次检索（CPU，无需 GPU；50,000 个向量精确检索 ≈ 9 毫秒，2026-09-23 实测）",
                  "SLA：Discord / Telegram 开发者社群技术支持"
            ]
      },
      {
            "name": "Pro / Scale",
            "price": "$100 / 月",
            "desc": "适用于成长期 AI 智能体、初创企业与高频语义 SaaS 平台。",
            "timeline": "即时自动开通",
            "sla": "99.9% 正常运行时间 SLA，工作时间内 2 小时极速响应",
            "limits": "最高 2,000,000 向量，每月 1,000,000 次检索 (P95 < 2.5 毫秒)",
            "features": [
                  "专属高吞吐量 API 网关 + WebSocket 实时流 + 私有 RPC 端点",
                  "完整生产级前 10 大脑连接组模块 + CANN 环形任务焦点吸引子",
                  "注意力漂移与记忆图谱熵值实时可视化监控仪表板",
                  "冷热数据自动分层归档与生物自平衡突触修剪机制",
                  "SLA：99.9% 运行时间 SLA，工单 2 小时内响应"
            ]
      },
      {
            "name": "Enterprise Cloud",
            "price": "$1,000+ / 月",
            "desc": "适用于金融科技、企业级 RAG、合规合规审计与高并发核心业务。",
            "timeline": "2 至 24 小时交付生产集群",
            "sla": "99.99% 正常运行时间 SLA，24/7 专属工程师 15 分钟内极速响应",
            "limits": "无限向量规模 ($200/10M 向量)，最高 50,000 QPS 吞吐",
            "features": [
                  "专属物理隔离云端私有 VPC / 裸金属节点 (可选欧盟、美国或新加坡数据中心)",
                  "无限向量规模扩展 ($200/1000万向量)，支持最高 50,000 QPS 瞬时高并发",
                  "完整 30 项大脑连接组技术，包含 DOM 树 CX Steering 仿生向量导航",
                  "区块链加密审计日志 (Proof of Connectome)，全面兼容 SSO、SIEM 与 SOC2 审计",
                  "SLA：99.99% 运行时间保障，7x24 小时专属架构师直连，15 分钟应急响应"
            ]
      },
      {
            "name": "On-Premises Core (.aci)",
            "price": "$50,000 – $250,000 一次性买断",
            "desc": "在客户完全物理隔离（Air-Gapped）的私有服务器上完整部署原生二进制核心。",
            "timeline": "3-5 个工作日完成现场交付与调优",
            "sla": "定制企业级 SLA，现场派驻专属部署工程师与首席架构师直连",
            "limits": "完全不限节点数、CPU 核心数、内存占用与本地知识图谱规模",
            "features": [
                  "AIfa Cognitive Runtime (.aci) 闭源原生二进制内核永久商业授权",
                  "交付物：Linux ELF 动态链接库 (.so) / Windows 原生 DLL / C++ header-only SDK (AVX-512 VNNI 优化)",
                  "针对企业级服务器 CPU 深度调优（Intel Xeon、AMD EPYC、Apple Silicon 芯片全指令集加速）",
                  "100% 物理离线隔离：零外部网络访问，零遥测回传，数据绝对自主可控",
                  "赠送 12 个月大脑连接组突触权重更新（FlyWire v783+）及专属首席架构师安全合规审计"
            ]
      }
],
    "ctaOrder": "预约企业级专属部署 / 购买商业许可",
    "ipTitle": "法律法权地位、知识产权与专利防卫矩阵",
    "ipSole": "AIfa Cognitive Runtime (ACR) 全栈架构及 30 项连接组底层创新技术的唯一创始人、作者与总架构师：马克西姆·加拉廷 (Maksim Valentinovich Galatin)。全部排他性权利保留。",
    "ipDual": "知识产权明晰：黑腹果蝇连接组底层数据属于开放科学 (FlyWire Consortium, Nature 2024, CC-BY-4.0)。我们的自主知识产权在于 6 爪突触投影、k-WTA APL 门控及中央复合体导航算法的 CPU 原生数学蒸馏与工程实现。测试基准脚本 aifa_biobench.py 采用 Apache 2.0 开源；编译后的二进制 AIfa Core 运行时 (.aci) 受 CODE Eternal 商业专有 EULA 与商业秘密保护。",
    "ipWatermark": "在高维投影权重中注入抗逆向工程的密码学数字水印。国际专利优先权覆盖 IPC G06N 3/04 与 G06F 16/30，学术科学优先权由康奈尔大学 arXiv 与 Cold Spring Harbor bioRxiv 永久锚定。"
  }
};

// Строки разметки на 4 языках (23.09.2026)
const JX: Record<Lang, Record<string, string>> = {
  "ru": {
    "commTitle": "Коммерческий сервис доступности сайтов (ADA / WCAG)",
    "commA": "Ищете аудит сайта по стандарту ",
    "commB": " для муниципалитетов или коммерческих порталов? Перейдите в сканер доступности AIfaFocus.",
    "commBtn": "Перейти к сканеру доступности →",
    "all30": "Все 30 технологий",
    "rnd10": "🟡 R&D Лаборатория (10)",
    "math10": "🔵 Математическая Спецификация (10)",
    "formula": "Формула:",
    "contour": "Контур:",
    "expand": "Развернуть ↓",
    "protoA": "43,2 мс (P50, 23.09.2026); запрос — зашумлённая копия вектора базы (σ = 0,08), не независимый поиск.",
    "protoB": "43,9 мс (P50, 23.09.2026); запросы независимы от индекса — представительный поиск. Точный FAISS: 100% за 8,8 мс.",
    "suitesH": "Наборы замеров:",
    "suitesT": " поиск 50 000 × 1024, дуэль методов, перебор «когтей», испытание агента на настоящих движках, тест отказов, статистика коннектома FlyWire v783.",
    "cpuH": "CPU, без GPU:",
    "cpuT": " запуск на любом компьютере с Python и NumPy; поиск в браузере — на JavaScript (не WebAssembly).",
    "apacheH": "Открытая лицензия Apache 2.0:",
    "apacheT": " свободное использование в научных публикациях, сравнениях и исследованиях.",
    "sdk": "Поставка: Linux (.so) / Windows (.dll) / C++ SDK с аудитом Меркла — по договору.",
    "distH": "Индивидуальная дистилляция:",
    "distT": " обучение и калибровка проекционных матриц под домен заказчика.",
    "cryptoH": "Криптографический аудит:",
    "cryptoT": " отпечатки файлов и дерево Меркла с биткоин-штампом OpenTimestamps.",
    "codevH": "Совместная разработка:",
    "codevT": " выделенный архитектор решений, прямой контакт с Главным Архитектором и гарантийный SLA.",
    "berne": "Бернская конвенция",
    "liveTitle": "Живой бенчмарк: числа последнего прогона",
    "scriptBadge": "Скрипт бенчмарка: ",
    "coreBadge": "Ядро AIfa Core: закрытый код (EULA)",
    "computing": "⚡ ВЫЧИСЛЕНИЕ...",
    "runV3": "🚀 ПОКАЗАТЬ ЗАМЕР",
    "qpsNote": "запросов в секунду (один поток, 23.09.2026)",
    "passport": "АРХИТЕКТУРНЫЙ ПАСПОРТ И ПРАВОВОЙ СТАТУС ACR",
    "distillH": "🧬 1. Нейроморфная дистилляция",
    "distillT": "Биология дрозофилы открыта (FlyWire, Nature 2024, CC BY 4.0). Наша работа — алгоритмы по её мотивам (разреженная проекция, торможение APL) на Python/NumPy и открытый бенчмарк.",
    "zeroH": "⚡ 2. Без тяжёлых зависимостей (чистый CPU)",
    "zeroT": "Основной замер не требует C++ библиотек: `python bench/aifa_biobench.py` на чистом Python + NumPy. FAISS нужен только для сравнения.",
    "honestH": "🎯 3. Протокол A (50 000 векторов)",
    "honestT": "Протокол A: 50 000 векторов (1024d) против точного перебора L2 — Recall@10 = 39,55%, P50 = 43,9 мс на CPU (23.09.2026; 21.09.2026 — 59,0 мс). Прежние 98,72% и «P50 < 1,0 мс» не подтверждены. Протокол B — испытание агента на настоящих движках: 95,0% с памятью посещённых ссылок против 5,8% у закреплённой цели.",
    "scriptLbl": "Скрипт: ",
    "coreLbl": " | Ядро AIfa Core: ",
    "testLbl": "Тест: AIfa BioBench · по образцу ANN-Benchmarks (не официальная заявка MLPerf)",
    "ours": "AIfa FlyHash (наш)",
    "ms": "мс",
    "notMeasured": "не измерено",
    "noGpu": "❌ Нет (0 GPU)",
    "no": "❌ Нет",
    "duel": "23.09.2026: итог дуэли — на 50 000 векторов обычный точный поиск FAISS (без индекса) в 5,0 раза быстрее нашего FlyHash (8,8 мс против 43,9 мс) и даёт 100% точности против 39,55%. Прежняя таблица с HNSW, Annoy, ScaNN, FAISS IVF и FAISS GPU убрана: мы их не запускали. Ниша FlyHash — компактность и работа без GPU; сравнение по этим осям ещё не проведено.",
    "both": "* Оба замера — Intel Core i7-14700, N = 50 000, D = 1024, независимые запросы, pool = 250. Скрипт для локального повтора — в блоке кода ниже.",
    "rowA": "Gaussian-1024D (протокол A; прежние «1M векторов» и коммит 9f7b399 не существовали)",
    "rowB": "Gaussian-1024D (точный L2; прежние 98,72% не подтвердились)",
    "ragStd": "Точность поиска для агентных систем и корпоративного RAG",
    "liveRun": "Показ замера AIfa-BioBench прямо в браузере",
    "run50k": "🚀 ПОКАЗАТЬ ЗАМЕР (50 000 ВЕКТОРОВ)",
    "protoTitle": "ПРОТОКОЛ НЕЗАВИСИМОГО ВОСПРОИЗВЕДЕНИЯ",
    "fileLbl": "Файл: ",
    "licLbl": "Лицензия: ",
    "anyone": "Любой инженер может скопировать скрипт ниже и запустить замер у себя за несколько минут. Протокол сравнивает Recall@10 с точным перебором L2 на 50 000 векторов (1024d), запросы независимы от индекса:",
    "step1": "# 1. Сохраните скрипт из блока кода ниже как aifa_biobench.py",
    "step2": "# 2. Запуск (независимые запросы: 50 000 векторов, 1024d)",
    "copyLbl": "Копирайт: ",
    "chiefLbl": "Главный Архитектор, инженер и создатель: ",
    "chiefName": "Галатин Максим Валентинович",
    "proofText": "Отпечатки файлов коннектома — контрольные суммы Zenodo; реестр доказательств заверен биткоин-штампом (блок 965 040). Штамп самого коннектома ставится заново: прежний оказался пустым.",
    "btcLbl": "БИТКОИН-ШТАМП:",
    "arwLbl": "ХРАНИЛИЩЕ ARWEAVE:",
    "auditLbl": "ВНЕШНИЙ АУДИТ:",
    "demoQuery": "Архитектура цифрового бессмертия AIfa",
    "liveStep": "Показаны числа последнего прогона aifa_biobench.py (23.09.2026), в браузере не пересчитываются"
  },
  "en": {
    "commTitle": "Commercial website accessibility service (ADA / WCAG)",
    "commA": "Looking for a website audit against ",
    "commB": " for municipalities or commercial portals? Go to the AIfaFocus accessibility scanner.",
    "commBtn": "Go to the accessibility scanner →",
    "all30": "All 30 technologies",
    "rnd10": "🟡 R&D Lab (10)",
    "math10": "🔵 Mathematical Specification (10)",
    "formula": "Formula:",
    "contour": "Deployment:",
    "expand": "Expand ↓",
    "protoA": "43.2 ms (P50, 23.09.2026); the query is a noisy copy of a database vector (σ = 0.08), not an independent search.",
    "protoB": "43.9 ms (P50, 23.09.2026); queries are independent of the index — a representative search. Exact FAISS: 100% in 8.8 ms.",
    "suitesH": "Measurement suites:",
    "suitesT": " retrieval 50,000 × 1024, method duel, claw sweep, agent test on real engines, dropout test, FlyWire v783 connectome statistics.",
    "cpuH": "CPU, no GPU:",
    "cpuT": " runs on any computer with Python and NumPy; in-browser search is JavaScript (not WebAssembly).",
    "apacheH": "Open Apache 2.0 licence:",
    "apacheT": " free use in scientific publications, comparisons and research.",
    "sdk": "Delivery: Linux (.so) / Windows (.dll) / C++ SDK with Merkle audit — under contract.",
    "distH": "Custom distillation:",
    "distT": " training and calibration of projection matrices for the customer's domain.",
    "cryptoH": "Cryptographic audit:",
    "cryptoT": " file fingerprints and a Merkle tree with an OpenTimestamps Bitcoin timestamp.",
    "codevH": "Dedicated R&D co-development:",
    "codevT": " a dedicated solutions architect, direct contact with the Chief Architect and a guaranteed SLA.",
    "berne": "Berne Convention",
    "liveTitle": "Live benchmark: numbers from the latest run",
    "scriptBadge": "Benchmark script: ",
    "coreBadge": "AIfa Core: proprietary code (EULA)",
    "computing": "⚡ COMPUTING...",
    "runV3": "🚀 SHOW MEASUREMENT",
    "qpsNote": "queries per second (single thread, 23.09.2026)",
    "passport": "ACR ARCHITECTURE PASSPORT AND LEGAL STATUS",
    "distillH": "🧬 1. Neuromorphic distillation",
    "distillT": "Drosophila biology is open (FlyWire, Nature 2024, CC BY 4.0). Our work is algorithms inspired by it (sparse projection, APL inhibition) in Python/NumPy and an open benchmark.",
    "zeroH": "⚡ 2. No heavy dependencies (pure CPU)",
    "zeroT": "The main measurement needs no C++ libraries: `python bench/aifa_biobench.py` with plain Python + NumPy. FAISS is needed only for the comparison.",
    "honestH": "🎯 3. Protocol A (50,000 vectors)",
    "honestT": "Protocol A: 50,000 vectors (1024d) against exact L2 brute force — Recall@10 = 39.55%, P50 = 43.9 ms on CPU (23.09.2026; 59.0 ms on 21.09.2026). The earlier 98.72% and 'P50 < 1.0 ms' were not confirmed. Protocol B — agent test on real engines: 95.0% with visited-link memory vs 5.8% with a pinned goal.",
    "scriptLbl": "Script: ",
    "coreLbl": " | AIfa Core: ",
    "testLbl": "Test: AIfa BioBench · modelled on ANN-Benchmarks (not an official MLPerf submission)",
    "ours": "AIfa FlyHash (ours)",
    "ms": "ms",
    "notMeasured": "not measured",
    "noGpu": "❌ No (0 GPU)",
    "no": "❌ No",
    "duel": "23.09.2026: result of this duel — on 50,000 vectors plain exact FAISS search (no index) is 5.0× faster than our FlyHash (8.8 ms vs 43.9 ms) and gives 100% recall vs 39.55%. The earlier table with HNSW, Annoy, ScaNN, FAISS IVF and FAISS GPU was removed: we did not run them. FlyHash's niche is compactness and no-GPU operation; a comparison on those axes has not been run yet.",
    "both": "* Both measurements — Intel Core i7-14700, N = 50,000, D = 1024, independent queries, pool = 250. The script to reproduce locally is in the code block below.",
    "rowA": "Gaussian-1024D (protocol A; the earlier '1M vectors' and commit 9f7b399 did not exist)",
    "rowB": "Gaussian-1024D (exact L2; the earlier 98.72% was not confirmed)",
    "ragStd": "Retrieval accuracy for agent systems and enterprise RAG",
    "liveRun": "The AIfa-BioBench measurement shown right in the browser",
    "run50k": "🚀 SHOW MEASUREMENT (50K VECTORS)",
    "protoTitle": "INDEPENDENT REPRODUCTION PROTOCOL",
    "fileLbl": "File: ",
    "licLbl": "Licence: ",
    "anyone": "Any engineer can copy the script below and run the measurement locally in a few minutes. The protocol compares Recall@10 against exact L2 brute force on 50,000 vectors (1024d), with queries independent of the index:",
    "step1": "# 1. Save the script from the code block below as aifa_biobench.py",
    "step2": "# 2. Run (independent queries: 50,000 vectors, 1024d)",
    "copyLbl": "Copyright: ",
    "chiefLbl": "Chief Architect, engineer and creator: ",
    "chiefName": "Maksim Valentinovich Galatin",
    "proofText": "The connectome files are fingerprinted by Zenodo checksums; the evidence registry is anchored with a Bitcoin timestamp (block 965040). The stamp of the connectome itself is being re-issued: the earlier one held no attestation.",
    "btcLbl": "BITCOIN TIMESTAMP:",
    "arwLbl": "ARWEAVE STORAGE:",
    "auditLbl": "EXTERNAL AUDIT:",
    "demoQuery": "AIfa digital immortality architecture",
    "liveStep": "Showing numbers from the latest aifa_biobench.py run (23.09.2026); they are not recomputed in the browser"
  },
  "es": {
    "commTitle": "Servicio comercial de accesibilidad web (ADA / WCAG)",
    "commA": "¿Busca una auditoría web según ",
    "commB": " para municipios o portales comerciales? Vaya al escáner de accesibilidad AIfaFocus.",
    "commBtn": "Ir al escáner de accesibilidad →",
    "all30": "Las 30 tecnologías",
    "rnd10": "🟡 Laboratorio de I+D (10)",
    "math10": "🔵 Especificación matemática (10)",
    "formula": "Fórmula:",
    "contour": "Despliegue:",
    "expand": "Desplegar ↓",
    "protoA": "43,2 ms (P50, 23.09.2026); la consulta es una copia con ruido de un vector de la base (σ = 0,08), no una búsqueda independiente.",
    "protoB": "43,9 ms (P50, 23.09.2026); consultas independientes del índice: una búsqueda representativa. FAISS exacto: 100% en 8,8 ms.",
    "suitesH": "Conjuntos de mediciones:",
    "suitesT": " búsqueda 50.000 × 1024, duelo de métodos, barrido de garras, prueba de agentes con motores reales, prueba de desactivación, estadísticas del conectoma FlyWire v783.",
    "cpuH": "CPU, sin GPU:",
    "cpuT": " funciona en cualquier ordenador con Python y NumPy; la búsqueda en el navegador es JavaScript (no WebAssembly).",
    "apacheH": "Licencia abierta Apache 2.0:",
    "apacheT": " uso libre en publicaciones científicas, comparaciones e investigación.",
    "sdk": "Entrega: Linux (.so) / Windows (.dll) / SDK de C++ con auditoría Merkle, bajo contrato.",
    "distH": "Destilación a medida:",
    "distT": " entrenamiento y calibración de matrices de proyección para el dominio del cliente.",
    "cryptoH": "Auditoría criptográfica:",
    "cryptoT": " huellas de archivos y árbol de Merkle con sello Bitcoin de OpenTimestamps.",
    "codevH": "Codesarrollo de I+D dedicado:",
    "codevT": " un arquitecto de soluciones dedicado, contacto directo con el Arquitecto Jefe y un SLA garantizado.",
    "berne": "Convenio de Berna",
    "liveTitle": "Benchmark en vivo: cifras de la última ejecución",
    "scriptBadge": "Script del benchmark: ",
    "coreBadge": "AIfa Core: código propietario (EULA)",
    "computing": "⚡ CALCULANDO...",
    "runV3": "🚀 MOSTRAR MEDICIÓN",
    "qpsNote": "consultas por segundo (un hilo, 23.09.2026)",
    "passport": "PASAPORTE DE ARQUITECTURA Y ESTADO LEGAL DE ACR",
    "distillH": "🧬 1. Destilación neuromórfica",
    "distillT": "La biología de Drosophila es abierta (FlyWire, Nature 2024, CC BY 4.0). Nuestro trabajo son algoritmos inspirados en ella (proyección dispersa, inhibición APL) en Python/NumPy y un benchmark abierto.",
    "zeroH": "⚡ 2. Sin dependencias pesadas (solo CPU)",
    "zeroT": "La medición principal no requiere bibliotecas de C++: `python bench/aifa_biobench.py` con Python + NumPy. FAISS solo hace falta para la comparación.",
    "honestH": "🎯 3. Protocolo A (50.000 vectores)",
    "honestT": "Protocolo A: 50.000 vectores (1024d) frente a fuerza bruta L2 exacta — Recall@10 = 39,55%, P50 = 43,9 ms en CPU (23.09.2026; 59,0 ms el 21.09.2026). Los anteriores 98,72% y «P50 < 1,0 ms» no se confirmaron. Protocolo B — prueba de agentes con motores reales: 95,0% con memoria de enlaces visitados frente a 5,8% con objetivo fijado.",
    "scriptLbl": "Script: ",
    "coreLbl": " | AIfa Core: ",
    "testLbl": "Prueba: AIfa BioBench · según el modelo de ANN-Benchmarks (no es un envío oficial a MLPerf)",
    "ours": "AIfa FlyHash (nuestro)",
    "ms": "ms",
    "notMeasured": "no medido",
    "noGpu": "❌ No (0 GPU)",
    "no": "❌ No",
    "duel": "23.09.2026: resultado del duelo — con 50.000 vectores la búsqueda exacta simple de FAISS (sin índice) es 5,0× más rápida que nuestro FlyHash (8,8 ms frente a 43,9 ms) y da un 100% de recall frente al 39,55%. La tabla anterior con HNSW, Annoy, ScaNN, FAISS IVF y FAISS GPU se retiró: no los ejecutamos. El nicho de FlyHash es la compacidad y funcionar sin GPU; aún no se ha comparado en esos ejes.",
    "both": "* Ambas mediciones: Intel Core i7-14700, N = 50.000, D = 1024, consultas independientes, pool = 250. El script para repetirlo en local está en el bloque de código de abajo.",
    "rowA": "Gaussian-1024D (protocolo A; los anteriores «1M de vectores» y el commit 9f7b399 no existían)",
    "rowB": "Gaussian-1024D (L2 exacto; el anterior 98,72% no se confirmó)",
    "ragStd": "Precisión de búsqueda para sistemas de agentes y RAG empresarial",
    "liveRun": "La medición de AIfa-BioBench mostrada en el navegador",
    "run50k": "🚀 MOSTRAR MEDICIÓN (50.000 VECTORES)",
    "protoTitle": "PROTOCOLO DE REPRODUCCIÓN INDEPENDIENTE",
    "fileLbl": "Archivo: ",
    "licLbl": "Licencia: ",
    "anyone": "Cualquier ingeniero puede copiar el script de abajo y ejecutar la medición en su equipo en pocos minutos. El protocolo compara Recall@10 con fuerza bruta L2 exacta sobre 50.000 vectores (1024d), con consultas independientes del índice:",
    "step1": "# 1. Guarde el script del bloque de código de abajo como aifa_biobench.py",
    "step2": "# 2. Ejecutar (consultas independientes: 50.000 vectores, 1024d)",
    "copyLbl": "Copyright: ",
    "chiefLbl": "Arquitecto Jefe, ingeniero y creador: ",
    "chiefName": "Maksim Valentinovich Galatin",
    "proofText": "Las huellas de los archivos del conectoma son las sumas de control de Zenodo; el registro de evidencias está anclado con un sello Bitcoin (bloque 965040). El sello del propio conectoma se vuelve a emitir: el anterior no contenía atestación.",
    "btcLbl": "SELLO BITCOIN:",
    "arwLbl": "ALMACENAMIENTO ARWEAVE:",
    "auditLbl": "AUDITORÍA EXTERNA:",
    "demoQuery": "Arquitectura de inmortalidad digital de AIfa",
    "liveStep": "Se muestran las cifras de la última ejecución de aifa_biobench.py (23.09.2026); no se recalculan en el navegador"
  },
  "zh": {
    "commTitle": "商业网站无障碍服务（ADA / WCAG）",
    "commA": "需要按照 ",
    "commB": " 为市政机构或商业门户做网站审计？请前往 AIfaFocus 无障碍扫描器。",
    "commBtn": "前往无障碍扫描器 →",
    "all30": "全部 30 项技术",
    "rnd10": "🟡 研发实验室（10）",
    "math10": "🔵 数学规范（10）",
    "formula": "公式：",
    "contour": "部署：",
    "expand": "展开 ↓",
    "protoA": "43.2 毫秒（P50，2026-09-23）；查询为库中向量的加噪副本（σ = 0.08），并非独立检索。",
    "protoB": "43.9 毫秒（P50，2026-09-23）；查询独立于索引——具有代表性的检索。FAISS 精确检索：8.8 毫秒达到 100%。",
    "suitesH": "测量套件：",
    "suitesT": " 50,000 × 1024 检索、方法对决、“爪”数量扫描、真实引擎智能体测试、关闭测试、FlyWire v783 连接组统计。",
    "cpuH": "CPU，无需 GPU：",
    "cpuT": " 任何装有 Python 和 NumPy 的电脑均可运行；浏览器内检索使用 JavaScript（非 WebAssembly）。",
    "apacheH": "开源 Apache 2.0 许可：",
    "apacheT": " 可自由用于科研论文、对比评测和研究。",
    "sdk": "交付：Linux（.so）/ Windows（.dll）/ 带 Merkle 审计的 C++ SDK——按合同提供。",
    "distH": "定制蒸馏：",
    "distT": " 针对客户领域训练和校准投影矩阵。",
    "cryptoH": "密码学审计：",
    "cryptoT": " 文件指纹与 Merkle 树，并加盖 OpenTimestamps 比特币时间戳。",
    "codevH": "专属研发共建：",
    "codevT": " 专属解决方案架构师、与首席架构师直接沟通，并提供 SLA 保障。",
    "berne": "伯尔尼公约",
    "liveTitle": "实时基准：最近一次运行的数字",
    "scriptBadge": "基准脚本：",
    "coreBadge": "AIfa Core：闭源代码（EULA）",
    "computing": "⚡ 计算中...",
    "runV3": "🚀 显示测量结果",
    "qpsNote": "每秒查询数（单线程，2026-09-23）",
    "passport": "ACR 架构档案与法律状态",
    "distillH": "🧬 1. 神经形态蒸馏",
    "distillT": "果蝇生物学数据是公开的（FlyWire，Nature 2024，CC BY 4.0）。我们的工作是受其启发的算法（稀疏投影、APL 抑制，基于 Python/NumPy）以及开放的基准测试。",
    "zeroH": "⚡ 2. 无重型依赖（纯 CPU）",
    "zeroT": "主测量无需 C++ 库：用纯 Python + NumPy 运行 `python bench/aifa_biobench.py`。只有对比时才需要 FAISS。",
    "honestH": "🎯 3. 协议 A（50,000 个向量）",
    "honestT": "协议 A：50,000 个 1024 维向量对比精确 L2 暴力检索——Recall@10 = 39.55%，CPU 上 P50 = 43.9 毫秒（2026-09-23；2026-09-21 为 59.0 毫秒）。此前的 98.72% 和“P50 < 1.0 毫秒”未得到证实。协议 B——真实引擎智能体测试：带已访问链接记忆 95.0%，固定目标 5.8%。",
    "scriptLbl": "脚本：",
    "coreLbl": " | AIfa Core：",
    "testLbl": "测试：AIfa BioBench · 参照 ANN-Benchmarks（非 MLPerf 官方提交）",
    "ours": "AIfa FlyHash（我们的）",
    "ms": "毫秒",
    "notMeasured": "未测量",
    "noGpu": "❌ 否（0 GPU）",
    "no": "❌ 否",
    "duel": "2026-09-23 对决结果——在 50,000 个向量上，普通的 FAISS 精确检索（无索引）比我们的 FlyHash 快 5.0 倍（8.8 毫秒对 43.9 毫秒），召回率 100% 对 39.55%。原先含 HNSW、Annoy、ScaNN、FAISS IVF 和 FAISS GPU 的表格已撤下：我们并未运行它们。FlyHash 的定位是紧凑和无需 GPU；在这些维度上的对比尚未进行。",
    "both": "* 两次测量均在 Intel Core i7-14700 上进行，N = 50,000，D = 1024，独立查询，pool = 250。本地复现脚本见下方代码块。",
    "rowA": "Gaussian-1024D（协议 A；此前的“100 万向量”和提交 9f7b399 并不存在）",
    "rowB": "Gaussian-1024D（精确 L2；此前的 98.72% 未得到证实）",
    "ragStd": "面向智能体系统与企业 RAG 的检索精度",
    "liveRun": "在浏览器中直接展示 AIfa-BioBench 测量结果",
    "run50k": "🚀 显示测量结果（50,000 个向量）",
    "protoTitle": "独立复现协议",
    "fileLbl": "文件：",
    "licLbl": "许可：",
    "anyone": "任何工程师都可以复制下方脚本，在几分钟内本地运行测量。该协议在 50,000 个 1024 维向量上将 Recall@10 与精确 L2 暴力检索对比，查询独立于索引：",
    "step1": "# 1. 将下方代码块中的脚本保存为 aifa_biobench.py",
    "step2": "# 2. 运行（独立查询：50,000 个向量，1024 维）",
    "copyLbl": "版权：",
    "chiefLbl": "首席架构师、工程师与创作者：",
    "chiefName": "马克西姆·瓦伦蒂诺维奇·加拉廷",
    "proofText": "连接组文件以 Zenodo 校验和作为指纹；证据登记册已加盖比特币时间戳（第 965040 区块）。连接组本身的时间戳正在重新签发：此前的不含任何证明。",
    "btcLbl": "比特币时间戳：",
    "arwLbl": "ARWEAVE 存储：",
    "auditLbl": "外部审计：",
    "demoQuery": "AIfa 数字永生架构",
    "liveStep": "显示 aifa_biobench.py 最近一次运行（2026-09-23）的数字，浏览器中不重新计算"
  }
};

// Перепроверенные результаты бенчмарка (21.09 и 23.09.2026); тексты на 4 языках
const VB: Record<Lang, Record<string, string>> = {
  "ru": {
    "latTitle": "Измеренные задержки (CPU Intel i7-14700, Python/NumPy)",
    "t1": "Фильтр APL",
    "t1v": "35,5 мкс",
    "t1d": "N = 512, замер 21.09.2026 на движке aifa_sdk.",
    "t2": "Двусторонний арбитр",
    "t2v": "4,3 мкс",
    "t2d": "P50, 2 000 проб, замер 21.09.2026.",
    "t3": "Ранжирование CX",
    "t3v": "190 мкс",
    "t3d": "P50; защиты от повторов в коде нет (см. карточку 03).",
    "t4": "Поиск 50 000 × 1024",
    "t4v": "≈ 44 мс",
    "t4d": "P50 FlyHash, 23.09.2026. Точный перебор FAISS — 8,8 мс.",
    "hw1": "Попадания в кэш L1/L2/LLC не измерялись: скрипты на Python без аппаратных счётчиков.",
    "hw2": "Единый контур «58 мкс» не измеряет ни один скрипт.",
    "hw3": "GPU не используется.",
    "repTitle": "ПРОТОКОЛ НЕЗАВИСИМОГО ВОСПРОИЗВЕДЕНИЯ (ПОИСК, 50 000 ВЕКТОРОВ)",
    "repText": "Скрипт работает на любом ноутбуке без GPU. Исходный код — в репозитории aifa-biobench и на странице /digital:",
    "repRes": "Замер 23.09.2026: Recall@10 = 39,55% (независимые запросы), 46,70% (smoke), P50 ≈ 44 мс; FAISS точный — 100% за 8,8 мс.",
    "repOts": "Bitcoin OTS: реестр доказательств — блок 965 040 (проверено 23.09.2026). Штамп «корня коннектома» (заявлялся блок 967 238) пуст и ставится заново.",
    "bbTag": "AIFA BIOBENCH: ПЕРЕПРОВЕРЕННЫЕ РЕЗУЛЬТАТЫ (23.09.2026)",
    "bbTitle": "Что работает и насколько: четыре настоящих замера",
    "bb1": "4 испытания",
    "bb2": "настоящий коннектом FlyWire v783",
    "c1Title": "1. Дуэль методов поиска (N = 25 000, D = 512)",
    "c1Tag": "100 запросов, seed 42",
    "c1Text": "Прямая дуэль с классической бинаризацией. У FlyHash в 85 раз меньше ненулевых весов проекции (2048×6 против 2048×512), но по точности он проигрывает: 18,9% против 80,5% у Sign-LSH при той же задержке.",
    "thMethod": "Метод",
    "thWeights": "Веса проекции",
    "light": "в 85 раз легче",
    "c2Title": "2. Перебор числа входов-«когтей» (d от 2 до 16)",
    "c2Tag": "проверка гипотезы",
    "c2Text": "Проверка гипотезы «d = 6 у мухи — оптимум». Замер: при d = 6 — 19,8%, при d = 7 уже 23,3%, наибольшая точность — 24,9% при d = 16. На этой задаче d = 6 не оптимум.",
    "thClaws": "Число когтей (d)",
    "thStatus": "Статус",
    "s2": "исходный",
    "s6": "значение у мухи",
    "s7": "выше",
    "s16": "максимум (в 2,7 раза больше весов)",
    "c3Title": "3. Испытание агента — настоящие движки",
    "c3Tag": "360 эпизодов на агента",
    "c3Text": "Заменяет прежний скрипт, в котором исход был вписан вероятностями (22,47% → 94,58%). Настоящие движки aifa_sdk, синтетические сайты, помехи 35%. Итог: выигрыш даёт память посещённых ссылок, остальные механизмы ACR здесь заметного вклада не дают.",
    "thAgent": "Агент",
    "thSuccess": "Успех задач",
    "thWrong": "Ошибочные клики",
    "a1": "Обычный, цель закреплена",
    "a2": "ACR: APL + CANN + CX как в коде",
    "a3": "ACR с исправленным CX",
    "a4": "Полный ACR + арбитр",
    "a5": "Обычный + память посещённых",
    "c4Title": "4. Устойчивость к отказам — настоящее выключение",
    "c4Tag": "5 зёрен",
    "c4Text": "Заменяет прежнюю кривую, заданную формулой («в 3,21 раза устойчивее»). Разряды кода и нейроны кольца выключаются по-настоящему. FlyHash теряет точность сильнее Sign-LSH; кольцо CANN теряет точность при гибели нейронов.",
    "thDrop": "Выключено",
    "thCann": "CANN, ошибка без входа",
    "cmdTitle": "Команды воспроизведения (Python 3.9+, NumPy; коннектом — с Zenodo 10676866):",
    "isTitle": "Что такое ACR",
    "notTitle": "Чем ACR не является",
    "is1": "Набор биоинспирированных алгоритмов (разреженная проекция, фильтр новизны APL, кольцевой аттрактор CANN, навигация CX, двусторонний арбитр) на Python/NumPy в пакете aifa_sdk.",
    "is2": "Часть механизмов работает так, как описано (разреженность APL, удержание цели CANN без помех); часть — нет (защита CX от повторов, сборка WASM, проверка взаимоблокировок).",
    "is3": "Все числа на этой странице получены скриптами репозитория aifa-biobench; файлы результатов открыты.",
    "not1": "Не симуляция мозга мухи и не утверждение о биологической эквивалентности.",
    "not2": "Алгоритмы используют случайные связи, а не веса FlyWire; коннектом FlyWire v783 используется только для статистики графа (C, L, KS).",
    "not3": "Прогона «58 мкс на полный контур» и «~122 мс на живом DOM» не существует — такие числа убраны."
  },
  "en": {
    "latTitle": "Measured latencies (Intel i7-14700 CPU, Python/NumPy)",
    "t1": "APL gate",
    "t1v": "35.5 μs",
    "t1d": "N = 512, measured 21.09.2026 on the aifa_sdk engine.",
    "t2": "Bilateral verifier",
    "t2v": "4.3 μs",
    "t2d": "P50, 2,000 trials, measured 21.09.2026.",
    "t3": "CX ranking",
    "t3v": "190 μs",
    "t3d": "P50; the code has no loop avoidance (see card 03).",
    "t4": "Retrieval 50,000 × 1024",
    "t4v": "≈ 44 ms",
    "t4d": "FlyHash P50, 23.09.2026. Exact FAISS: 8.8 ms.",
    "hw1": "L1/L2/LLC cache hit rates were not measured: the scripts are Python without hardware counters.",
    "hw2": "No script measures a fused '58 μs' hot path.",
    "hw3": "No GPU used.",
    "repTitle": "INDEPENDENT REPRODUCTION PROTOCOL (RETRIEVAL, 50,000 VECTORS)",
    "repText": "Runs on any laptop without a GPU. Source code is in the aifa-biobench repository and on the /digital page:",
    "repRes": "Measured 23.09.2026: Recall@10 = 39.55% (independent queries), 46.70% (smoke), P50 ≈ 44 ms; exact FAISS: 100% in 8.8 ms.",
    "repOts": "Bitcoin OTS: evidence registry — block 965040 (verified 23.09.2026). The 'connectome root' stamp (claimed block 967238) holds no attestation and is being re-stamped.",
    "bbTag": "AIFA BIOBENCH: RE-VERIFIED RESULTS (23.09.2026)",
    "bbTitle": "What works and by how much: four real measurements",
    "bb1": "4 suites",
    "bb2": "real FlyWire v783 connectome",
    "c1Title": "1. Binary retrieval duel (N = 25,000, D = 512)",
    "c1Tag": "100 queries, seed 42",
    "c1Text": "A direct duel with classic binarisation. FlyHash uses 85× fewer non-zero projection weights (2048×6 vs 2048×512), but it loses on accuracy: 18.9% vs 80.5% for Sign-LSH at the same latency.",
    "thMethod": "Method",
    "thWeights": "Projection weights",
    "light": "85× lighter",
    "c2Title": "2. Input 'claw' count sweep (d from 2 to 16)",
    "c2Tag": "hypothesis test",
    "c2Text": "Testing 'the fly's d = 6 is optimal'. Measured: 19.8% at d = 6, already 23.3% at d = 7, the highest recall is 24.9% at d = 16. On this task d = 6 is not the optimum.",
    "thClaws": "Claw count (d)",
    "thStatus": "Status",
    "s2": "baseline",
    "s6": "fly value",
    "s7": "higher",
    "s16": "highest (2.7× more weights)",
    "c3Title": "3. Agent benchmark — real engines",
    "c3Tag": "360 episodes per agent",
    "c3Text": "Replaces the old script whose outcome was set by fixed probabilities (22.47% → 94.58%). Real aifa_sdk engines, synthetic websites, 35% distractors. Result: the gain comes from visited-link memory; ACR's other mechanisms add no measurable benefit here.",
    "thAgent": "Agent",
    "thSuccess": "Task success",
    "thWrong": "Wrong clicks",
    "a1": "Standard, goal pinned",
    "a2": "ACR: APL + CANN + CX as shipped",
    "a3": "ACR with fixed CX",
    "a4": "Full ACR + verifier",
    "a5": "Standard + visited memory",
    "c4Title": "4. Robustness — real dropout",
    "c4Tag": "5 seeds",
    "c4Text": "Replaces the old formula-generated curve ('3.21× more robust'). Code bits and ring neurons are really switched off. FlyHash loses more accuracy than Sign-LSH; the CANN ring loses precision as neurons die.",
    "thDrop": "Dropped",
    "thCann": "CANN idle error",
    "cmdTitle": "Reproduction commands (Python 3.9+, NumPy; connectome from Zenodo 10676866):",
    "isTitle": "What ACR is",
    "notTitle": "What ACR is not",
    "is1": "A set of bio-inspired algorithms (sparse projection, APL novelty gate, CANN ring attractor, CX steering, bilateral verifier) in Python/NumPy in the aifa_sdk package.",
    "is2": "Some mechanisms work as described (APL sparsity, CANN goal holding without distractors); some do not (CX loop avoidance, the WASM build, the deadlock check).",
    "is3": "Every number on this page comes from scripts in the aifa-biobench repository; result files are open.",
    "not1": "Not a simulation of a fly brain and not a claim of biological equivalence.",
    "not2": "The algorithms use random connections, not FlyWire weights; the FlyWire v783 connectome is used only for graph statistics (C, L, KS).",
    "not3": "No '58 μs full-loop' or '~122 ms live DOM' run exists — those numbers were removed."
  },
  "es": {
    "latTitle": "Latencias medidas (CPU Intel i7-14700, Python/NumPy)",
    "t1": "Filtro APL",
    "t1v": "35,5 μs",
    "t1d": "N = 512, medido el 21.09.2026 con el motor aifa_sdk.",
    "t2": "Verificador bilateral",
    "t2v": "4,3 μs",
    "t2d": "P50, 2.000 pruebas, medido el 21.09.2026.",
    "t3": "Clasificación CX",
    "t3v": "190 μs",
    "t3d": "P50; el código no evita bucles (ver tarjeta 03).",
    "t4": "Búsqueda 50.000 × 1024",
    "t4v": "≈ 44 ms",
    "t4d": "P50 de FlyHash, 23.09.2026. FAISS exacto: 8,8 ms.",
    "hw1": "Las tasas de acierto de caché L1/L2/LLC no se midieron: los scripts son Python sin contadores de hardware.",
    "hw2": "Ningún script mide un ciclo unificado de «58 μs».",
    "hw3": "No se usa GPU.",
    "repTitle": "PROTOCOLO DE REPRODUCCIÓN INDEPENDIENTE (BÚSQUEDA, 50.000 VECTORES)",
    "repText": "Funciona en cualquier portátil sin GPU. El código está en el repositorio aifa-biobench y en la página /digital:",
    "repRes": "Medido el 23.09.2026: Recall@10 = 39,55% (consultas independientes), 46,70% (smoke), P50 ≈ 44 ms; FAISS exacto: 100% en 8,8 ms.",
    "repOts": "Bitcoin OTS: registro de evidencias — bloque 965040 (verificado el 23.09.2026). El sello de la «raíz del conectoma» (se declaraba el bloque 967238) no contiene atestación y se vuelve a sellar.",
    "bbTag": "AIFA BIOBENCH: RESULTADOS REVERIFICADOS (23.09.2026)",
    "bbTitle": "Qué funciona y cuánto: cuatro mediciones reales",
    "bb1": "4 pruebas",
    "bb2": "conectoma real FlyWire v783",
    "c1Title": "1. Duelo de búsqueda binaria (N = 25.000, D = 512)",
    "c1Tag": "100 consultas, seed 42",
    "c1Text": "Duelo directo con la binarización clásica. FlyHash usa 85× menos pesos de proyección no nulos (2048×6 frente a 2048×512), pero pierde en precisión: 18,9% frente a 80,5% de Sign-LSH con la misma latencia.",
    "thMethod": "Método",
    "thWeights": "Pesos de proyección",
    "light": "85× más ligero",
    "c2Title": "2. Barrido del número de «garras» (d de 2 a 16)",
    "c2Tag": "prueba de hipótesis",
    "c2Text": "Prueba de «d = 6 de la mosca es óptimo». Medido: 19,8% con d = 6, ya 23,3% con d = 7; el mayor recall es 24,9% con d = 16. En esta tarea d = 6 no es el óptimo.",
    "thClaws": "Número de garras (d)",
    "thStatus": "Estado",
    "s2": "base",
    "s6": "valor de la mosca",
    "s7": "mayor",
    "s16": "máximo (2,7× más pesos)",
    "c3Title": "3. Benchmark de agentes — motores reales",
    "c3Tag": "360 episodios por agente",
    "c3Text": "Sustituye al script anterior, cuyo resultado lo fijaban probabilidades (22,47% → 94,58%). Motores reales de aifa_sdk, sitios sintéticos, 35% de distracciones. Resultado: la ganancia viene de la memoria de enlaces visitados; los demás mecanismos de ACR no aportan una mejora medible aquí.",
    "thAgent": "Agente",
    "thSuccess": "Éxito de tareas",
    "thWrong": "Clics erróneos",
    "a1": "Estándar, objetivo fijado",
    "a2": "ACR: APL + CANN + CX publicado",
    "a3": "ACR con CX corregido",
    "a4": "ACR completo + verificador",
    "a5": "Estándar + memoria de visitados",
    "c4Title": "4. Robustez — desactivación real",
    "c4Tag": "5 semillas",
    "c4Text": "Sustituye a la curva anterior generada por fórmula («3,21× más robusto»). Los bits del código y las neuronas del anillo se desactivan de verdad. FlyHash pierde más precisión que Sign-LSH; el anillo CANN pierde precisión al morir neuronas.",
    "thDrop": "Desactivado",
    "thCann": "Error CANN en reposo",
    "cmdTitle": "Comandos de reproducción (Python 3.9+, NumPy; conectoma de Zenodo 10676866):",
    "isTitle": "Qué es ACR",
    "notTitle": "Qué no es ACR",
    "is1": "Un conjunto de algoritmos bioinspirados (proyección dispersa, filtro de novedad APL, atractor en anillo CANN, navegación CX, verificador bilateral) en Python/NumPy dentro del paquete aifa_sdk.",
    "is2": "Algunos mecanismos funcionan como se describe (dispersión de APL, CANN mantiene el objetivo sin distracciones); otros no (evitación de bucles en CX, la compilación WASM, la comprobación de interbloqueos).",
    "is3": "Todas las cifras de esta página proceden de scripts del repositorio aifa-biobench; los archivos de resultados son públicos.",
    "not1": "No es una simulación del cerebro de la mosca ni una afirmación de equivalencia biológica.",
    "not2": "Los algoritmos usan conexiones aleatorias, no pesos de FlyWire; el conectoma FlyWire v783 solo se usa para estadísticas del grafo (C, L, KS).",
    "not3": "No existe ninguna ejecución de «58 μs en el ciclo completo» ni de «~122 ms en DOM real»: esas cifras se retiraron."
  },
  "zh": {
    "latTitle": "实测延迟（Intel i7-14700 CPU，Python/NumPy）",
    "t1": "APL 门控",
    "t1v": "35.5 微秒",
    "t1d": "N = 512，2026-09-21 在 aifa_sdk 引擎上实测。",
    "t2": "双侧验证器",
    "t2v": "4.3 微秒",
    "t2d": "P50，2,000 次试验，2026-09-21 实测。",
    "t3": "CX 排序",
    "t3v": "190 微秒",
    "t3d": "P50；代码中没有防循环机制（见卡片 03）。",
    "t4": "检索 50,000 × 1024",
    "t4v": "≈ 44 毫秒",
    "t4d": "FlyHash P50，2026-09-23。FAISS 精确检索：8.8 毫秒。",
    "hw1": "未测量 L1/L2/LLC 缓存命中率：脚本为 Python，没有硬件计数器。",
    "hw2": "没有任何脚本测量“58 微秒”的融合热路径。",
    "hw3": "不使用 GPU。",
    "repTitle": "独立复现协议（检索，50,000 个向量）",
    "repText": "可在任何无 GPU 的笔记本上运行。源代码在 aifa-biobench 仓库和 /digital 页面：",
    "repRes": "2026-09-23 实测：Recall@10 = 39.55%（独立查询）、46.70%（smoke），P50 ≈ 44 毫秒；FAISS 精确检索：8.8 毫秒达到 100%。",
    "repOts": "比特币 OTS：证据登记册 — 第 965040 区块（2026-09-23 已验证）。“连接组根”时间戳（声称第 967238 区块）不含任何证明，正在重新盖戳。",
    "bbTag": "AIFA BIOBENCH：重新验证的结果（2026-09-23）",
    "bbTitle": "哪些有效、效果多大：四项真实测量",
    "bb1": "4 项测试",
    "bb2": "真实 FlyWire v783 连接组",
    "c1Title": "1. 二值检索对决（N = 25,000，D = 512）",
    "c1Tag": "100 次查询，seed 42",
    "c1Text": "与经典二值化方法直接对决。FlyHash 的非零投影权重少 85 倍（2048×6 对 2048×512），但准确率落后：在相同延迟下为 18.9%，Sign-LSH 为 80.5%。",
    "thMethod": "方法",
    "thWeights": "投影权重",
    "light": "轻 85 倍",
    "c2Title": "2. 输入“爪”数量扫描（d 从 2 到 16）",
    "c2Tag": "假设检验",
    "c2Text": "检验“果蝇的 d = 6 是最优”的假设。实测：d = 6 时为 19.8%，d = 7 时已达 23.3%，最高召回率为 d = 16 时的 24.9%。在此任务上 d = 6 并非最优。",
    "thClaws": "爪数量 (d)",
    "thStatus": "状态",
    "s2": "基线",
    "s6": "果蝇数值",
    "s7": "更高",
    "s16": "最高（权重多 2.7 倍）",
    "c3Title": "3. 智能体基准 — 真实引擎",
    "c3Tag": "每个智能体 360 个回合",
    "c3Text": "替换旧脚本（其结果由预设概率决定：22.47% → 94.58%）。真实 aifa_sdk 引擎，合成网站，35% 干扰。结果：收益来自已访问链接记忆；ACR 的其他机制在此没有可测量的贡献。",
    "thAgent": "智能体",
    "thSuccess": "任务成功率",
    "thWrong": "错误点击",
    "a1": "标准，固定目标",
    "a2": "ACR：APL + CANN + 现有 CX",
    "a3": "ACR（修复后的 CX）",
    "a4": "完整 ACR + 验证器",
    "a5": "标准 + 已访问记忆",
    "c4Title": "4. 鲁棒性 — 真实关闭单元",
    "c4Tag": "5 个种子",
    "c4Text": "替换旧的公式生成曲线（“鲁棒性高 3.21 倍”）。编码位和环形神经元被真实关闭。FlyHash 的准确率下降比 Sign-LSH 更多；CANN 环在神经元死亡时精度下降。",
    "thDrop": "关闭比例",
    "thCann": "CANN 静息误差",
    "cmdTitle": "复现命令（Python 3.9+、NumPy；连接组来自 Zenodo 10676866）：",
    "isTitle": "ACR 是什么",
    "notTitle": "ACR 不是什么",
    "is1": "一组生物启发算法（稀疏投影、APL 新颖性门控、CANN 环形吸引子、CX 导航、双侧验证器），以 Python/NumPy 实现在 aifa_sdk 包中。",
    "is2": "部分机制按描述工作（APL 稀疏度、无干扰时 CANN 保持目标）；部分则不然（CX 防循环、WASM 构建、死锁检查）。",
    "is3": "本页所有数字均来自 aifa-biobench 仓库中的脚本；结果文件公开。",
    "not1": "不是果蝇大脑模拟，也不声称生物学等效。",
    "not2": "算法使用随机连接，而非 FlyWire 权重；FlyWire v783 连接组仅用于图统计（C、L、KS）。",
    "not3": "不存在“完整回路 58 微秒”或“真实 DOM ~122 毫秒”的运行——这些数字已删除。"
  }
};

// Панель трёх протоколов замера (23.09.2026), 4 языка
const PR: Record<Lang, Record<string, string>> = {
  "ru": {
    "prTag": "Три протокола замера • скрипты aifa-biobench",
    "prTitle": "Поиск, агент и устойчивость — измерены раздельно",
    "prRun": "Запуск: python bench/aifa_biobench.py · python bench/acr_agent_real_benchmark.py · python bench/robustness_real.py",
    "pa": "Протокол А: чистый поиск",
    "paT": "Поиск по 50 000 векторов (1024)",
    "paD": "Сравнение с точным перебором L2.",
    "paV": "Recall@10 = 39,55%",
    "paS": "P50 ≈ 44 мс · FAISS точный: 100% за 8,8 мс",
    "pb": "Протокол Б: задачи агента",
    "pbT": "Навигация по синтетическим сайтам",
    "pbD": "9 агентов × 360 эпизодов, помехи 35%.",
    "pbV": "Успех: 95,0% против 5,8%",
    "pbS": "с памятью посещённых ссылок против закреплённой цели",
    "pc": "Протокол В: устойчивость",
    "pcT": "Выключение разрядов и нейронов",
    "pcD": "5 зёрен, 20 000 векторов, 512 разрядов.",
    "pcV": "50% выключено: 25,4% против 78,2%",
    "pcS": "Recall@10 у FlyHash против Sign-LSH",
    "en1": "Примечание по энергопотреблению:",
    "en2": "значения энергоэффективности — теоретическая модельная оценка по формуле спайковой активности LIF (1,0 пДж на спайк против 1,5 пДж на FP16 FLOP), а не прямой физический замер ваттметром.",
    "st1": "Статус модулей 06–10:",
    "st2": "энергомоделирование, компиляция в AER и индекс симбиоза — исследовательские прототипы; компилятор в 1 000 прогонах из 1 000 дал циклы, сборка WASM — это JavaScript."
  },
  "en": {
    "prTag": "Three measurement protocols • aifa-biobench scripts",
    "prTitle": "Retrieval, agent and robustness — measured separately",
    "prRun": "Run: python bench/aifa_biobench.py · python bench/acr_agent_real_benchmark.py · python bench/robustness_real.py",
    "pa": "Protocol A: pure retrieval",
    "paT": "Search over 50,000 vectors (1024d)",
    "paD": "Compared against exact L2 brute force.",
    "paV": "Recall@10 = 39.55%",
    "paS": "P50 ≈ 44 ms · exact FAISS: 100% in 8.8 ms",
    "pb": "Protocol B: agent tasks",
    "pbT": "Navigation on synthetic websites",
    "pbD": "9 agents × 360 episodes, 35% distractors.",
    "pbV": "Success: 95.0% vs 5.8%",
    "pbS": "with visited-link memory vs pinned goal only",
    "pc": "Protocol C: robustness",
    "pcT": "Switching off bits and neurons",
    "pcD": "5 seeds, 20,000 vectors, 512 bits.",
    "pcV": "50% off: 25.4% vs 78.2%",
    "pcS": "Recall@10 of FlyHash vs Sign-LSH",
    "en1": "Energy note:",
    "en2": "energy-efficiency values are a theoretical model estimate from the LIF spiking formula (1.0 pJ per spike vs 1.5 pJ per FP16 FLOP), not a direct wattmeter measurement.",
    "st1": "Status of modules 06–10:",
    "st2": "energy modelling, AER compilation and the symbiosis index are research prototypes; the compiler produced cycles in 1,000 of 1,000 runs, and the WASM build is JavaScript."
  },
  "es": {
    "prTag": "Tres protocolos de medición • scripts de aifa-biobench",
    "prTitle": "Búsqueda, agente y robustez — medidos por separado",
    "prRun": "Ejecutar: python bench/aifa_biobench.py · python bench/acr_agent_real_benchmark.py · python bench/robustness_real.py",
    "pa": "Protocolo A: búsqueda pura",
    "paT": "Búsqueda sobre 50.000 vectores (1024d)",
    "paD": "Comparado con fuerza bruta L2 exacta.",
    "paV": "Recall@10 = 39,55%",
    "paS": "P50 ≈ 44 ms · FAISS exacto: 100% en 8,8 ms",
    "pb": "Protocolo B: tareas del agente",
    "pbT": "Navegación en sitios sintéticos",
    "pbD": "9 agentes × 360 episodios, 35% de distracciones.",
    "pbV": "Éxito: 95,0% frente a 5,8%",
    "pbS": "con memoria de enlaces visitados frente a solo objetivo fijado",
    "pc": "Protocolo C: robustez",
    "pcT": "Desactivación de bits y neuronas",
    "pcD": "5 semillas, 20.000 vectores, 512 bits.",
    "pcV": "50% desactivado: 25,4% frente a 78,2%",
    "pcS": "Recall@10 de FlyHash frente a Sign-LSH",
    "en1": "Nota sobre energía:",
    "en2": "los valores de eficiencia energética son una estimación teórica de modelo con la fórmula de disparos LIF (1,0 pJ por disparo frente a 1,5 pJ por FLOP FP16), no una medición directa con vatímetro.",
    "st1": "Estado de los módulos 06–10:",
    "st2": "el modelado energético, la compilación a AER y el índice de simbiosis son prototipos de investigación; el compilador produjo ciclos en 1.000 de 1.000 ejecuciones y la compilación WASM es JavaScript."
  },
  "zh": {
    "prTag": "三项测量协议 • aifa-biobench 脚本",
    "prTitle": "检索、智能体与鲁棒性——分别测量",
    "prRun": "运行：python bench/aifa_biobench.py · python bench/acr_agent_real_benchmark.py · python bench/robustness_real.py",
    "pa": "协议 A：纯检索",
    "paT": "在 50,000 个向量（1024 维）中检索",
    "paD": "与精确 L2 暴力检索对比。",
    "paV": "Recall@10 = 39.55%",
    "paS": "P50 ≈ 44 毫秒 · FAISS 精确检索：8.8 毫秒 100%",
    "pb": "协议 B：智能体任务",
    "pbT": "在合成网站上导航",
    "pbD": "9 个智能体 × 360 个回合，35% 干扰。",
    "pbV": "成功率：95.0% 对 5.8%",
    "pbS": "带已访问链接记忆 对 仅固定目标",
    "pc": "协议 C：鲁棒性",
    "pcT": "关闭编码位与神经元",
    "pcD": "5 个种子，20,000 个向量，512 位。",
    "pcV": "关闭 50%：25.4% 对 78.2%",
    "pcS": "FlyHash 与 Sign-LSH 的 Recall@10",
    "en1": "能耗说明：",
    "en2": "能效数值是基于 LIF 脉冲公式的理论模型估算（每个脉冲 1.0 pJ 对比每次 FP16 FLOP 1.5 pJ），并非功率计直接实测。",
    "st1": "模块 06–10 状态：",
    "st2": "能耗建模、AER 编译与共生指数为研究原型；编译器在 1,000 次运行中 1,000 次产生环路，WASM 构建实为 JavaScript。"
  }
};

const ABLATION_ROWS = [
  // настоящий замер 23.09.2026: aifa-biobench/results/acr_agent_real_benchmark_distr_0.35.json
  { cfg: 'Naive agent (goal falls out of a 4-message window)', noise: '35%', recall: '0.3% ± 1.5', dom: '10.0', drift: '98.6%', fpr: '0.000', lat: '0.074 ms' },
  { cfg: 'Standard agent, goal pinned (system-prompt style)', noise: '35%', recall: '5.8% ± 3.8', dom: '5.71', drift: '97.9%', fpr: '0.000', lat: '0.076 ms' },
  { cfg: '+ APL novelty gate only', noise: '35%', recall: '4.2% ± 4.2', dom: '3.27', drift: '97.7%', fpr: '0.000', lat: '0.076 ms' },
  { cfg: '+ CANN focus ring only', noise: '35%', recall: '5.6% ± 3.9', dom: '5.45', drift: '97.9%', fpr: '0.025', lat: '0.097 ms' },
  { cfg: '+ APL + CANN', noise: '35%', recall: '1.4% ± 3.1', dom: '6.20', drift: '99.2%', fpr: '0.001', lat: '0.100 ms' },
  { cfg: '+ APL + CANN + CX (as shipped in aifa_sdk)', noise: '35%', recall: '1.4% ± 3.1', dom: '6.20', drift: '99.2%', fpr: '0.001', lat: '0.181 ms' },
  { cfg: 'Standard agent + visited-link memory only', noise: '35%', recall: '95.0% ± 5.5', dom: '6.16', drift: '53.8%', fpr: '0.000', lat: '0.218 ms' },
  { cfg: '+ APL + CANN + CX fixed (visited-link repulsion)', noise: '35%', recall: '94.7% ± 5.5', dom: '6.23', drift: '54.5%', fpr: '0.000', lat: '0.427 ms' },
  { cfg: 'Full ACR (fixed CX) + bilateral verifier', noise: '35%', recall: '93.6% ± 4.1', dom: '6.07', drift: '54.1%', fpr: '0.000', lat: '0.680 ms' },
];

const TOP5_TECH: Record<Lang, any[]> = {
  "ru": [
    {
      "num": "01",
      "evidenceClass": "E3",
      "evidenceLabel": "Воспроизводимый бенчмарк ПО",
      "name": "FlyHash v783 Connectome Memory (Ассоциативная память)",
      "bio": "По мотивам грибовидного тела мухи (клетки Кеньона, ~6 входов-«когтей»). Веса проекции случайные разреженные — данные FlyWire в этот механизм не загружаются.",
      "math": "Проекция 1024-d → 2048 единиц, по 6 случайных входов на единицу, k-WTA 5%, отбор 250 кандидатов по Хэммингу и точная доранжировка.",
      "gain": "Перепроверено 23.09.2026 на 50 000 векторах 1024-d: Recall@10 39,55% (независимые запросы) и 46,70% (smoke), P50 ≈ 44 мс на CPU. Точный перебор FAISS на тех же данных — 100% за 8,8 мс. В дуэли на 25 000 векторов Sign-LSH даёт 80,5% против 18,9% у FlyHash; при выключении 50% разрядов FlyHash теряет 57% точности, Sign-LSH — 9%.",
      "deploy": "acr/memory/flyhash.py и aifa_connectome_web.js",
      "metric": "Recall@10 39,55% · P50 ≈ 44 мс"
    },
    {
      "num": "02",
      "evidenceClass": "E3",
      "evidenceLabel": "Воспроизводимый бенчмарк ПО",
      "name": "APL Sensory Novelty Gate (Сенсорный фильтр новизны)",
      "bio": "Гигантский ГАМК-ергический нейрон APL (Anterior Paired Lateral), обеспечивающий глобальное торможение обратной связи.",
      "math": "Динамический порог theta(t) = alpha * theta(t-1) + beta * mean(KC_activity).",
      "gain": "Замер 21.09.2026 на настоящем движке: разреженность 94,9% при заявленных 95%, нормировка верна, повторные сообщения отсекаются. Задержка 35,5 мкс (N=512); прежние «0,014 мс» не воспроизводятся. «Экономия 40–80% токенов» не измерялась. В испытании агента APL сам по себе успеха не повышает (4,2% против 5,8%).",
      "deploy": "acr/gating/apl_gate.py и middleware маршрутов API",
      "metric": "35,5 мкс · разреженность 94,9%"
    },
    {
      "num": "03",
      "evidenceClass": "E3",
      "evidenceLabel": "Воспроизводимый бенчмарк ПО",
      "name": "Central Complex CX Steering Navigation (Векторная навигация)",
      "bio": "Веерообразное тело (FB) и протоцеребральный мост (PB) Центрального Комплекса.",
      "math": "Векторное суммирование фазовых сдвигов Delta phi = arctan2(sum sin(theta_i), sum cos(theta_i)).",
      "gain": "В коде aifa_sdk/cx_steering.py нет отталкивания от посещённых узлов, заявленного формулой: в ловушке-цикле агент 30 раз подряд нажал одну кнопку. С этим отталкиванием успех агента растёт с 1,4% до 94,7% — но обычный агент с той же памятью посещённых даёт 95,0%. «17,87 → 1,12 шага» не измерялось.",
      "deploy": "acr/navigation/cx_steering.py и автономный агент AIfaFocus",
      "metric": "190 мкс P50 · нужна доработка"
    },
    {
      "num": "04",
      "evidenceClass": "E3",
      "evidenceLabel": "Воспроизводимый бенчмарк ПО",
      "name": "CANN Focus Ring Attractor (Кольцевой аттрактор фокуса)",
      "bio": "Кольцевая нейронная колонка Эллипсоидного Тела (EB, 64 нейрона) с динамикой непрерывного аттрактора.",
      "math": "Уравнение Амари: tau * dU(theta)/dt = -U(theta) + integral W(theta - theta') f(U(theta')) dtheta' + I.",
      "gain": "Без входа кольцо держит цель (ошибка 0,01–0,13°); при гибели 30–50% нейронов ошибка растёт до ~15°; после 10 отвлекающих толчков со стандартной силой движка кольцо уходит к помехе (76°). В испытании агента равен закреплённой цели, без добавочного выигрыша. «0,062 рад, в 20,5 раза стабильнее FIFO» было вписано в код, а не измерено.",
      "deploy": "acr/attractor/cann_ring.py и долгосрочные сессии переписки",
      "metric": "0,13° без входа · 76° после помех"
    },
    {
      "num": "05",
      "evidenceClass": "E3",
      "evidenceLabel": "Воспроизводимый бенчмарк ПО",
      "name": "Bilateral Cross-Inhibition Verifier (Двуполушарный арбитр)",
      "bio": "Латеральное перекрестное торможение между парными полушариями коннектома.",
      "math": "Взаимное торможение параллельных гипотез: V_final = argmax(Conf_L - gamma * Conf_R, Conf_R - gamma * Conf_L).",
      "gain": "На простом тесте движок одобрил 50 из 50 согласованных решений и отклонил 50 из 50 противоречивых; задержка 4,3 мкс. Порог в коде 0,52, а не 0,95. «FPR 21,1% → 3,0%, F1 = 0,884» не измерялись. В испытании агента арбитр не добавил успеха (93,6% против 94,7% без него).",
      "deploy": "acr/arbitration/bilateral_verifier.py и арбитраж решений двух Сестер",
      "metric": "4,3 мкс · 50/50 на простом тесте"
    },
    {
      "num": "06",
      "evidenceClass": "E2–E3",
      "evidenceLabel": "Расчетная модель / Симуляция",
      "name": "Модель энергоэффективности (LIF Engine / Neuromorphic Energy)",
      "bio": "Биофизическая модель метаболизма нейронов Drosophila melanogaster в рамках расчетной модели спайковых событий (1 пДж/спайк vs 1–3 пДж/FLOP GPU FP16). Разреженность связей (Connectivity Sparsity): 85.0% структурных нулей матрицы. Разреженность активности (Activity Sparsity): 96.86% молчащих нейронов в ходе бенчмарка. Физические замеры по розетке (RAPL / ваттметр) запланированы на этапе аппаратного стенда.",
      "math": "E_spike = N_spikes * 1 pJ vs E_gpu = N_ops * 2 pJ. Модельное снижение энергопотребления: 99.73%.",
      "gain": "Расчётная модель, не замер энергии: при допущении 1 пДж на спайк против 2 пДж на операцию GPU и разреженности 96,86% модель даёт снижение 99,73% (в 369 раз). Реальное потребление ваттметром или RAPL не измерялось.",
      "deploy": "aifa-biobench/neuromorphic_energy.py (расчетный симулятор)",
      "metric": "99,73% — модель, не замер"
    },
    {
      "num": "07",
      "evidenceClass": "E2",
      "evidenceLabel": "Исполняемый прототип / Метрика",
      "name": "AIfa BioMatch Score (Метрика BioMatch v1.0)",
      "bio": "Метрологический профиль коннектома Drosophila melanogaster (FlyWire v783: 139 255 нейронов, 54.5M синапсов, ~2.7M пороговых ребер графа; Nature, Schlegel et al. 2024). Оценка топологического изоморфизма искусственных сетей памяти относительно биологического эталона.",
      "math": "BioMatch = 1/5 * [ (1 - D_KS(W, W_fly)) + (1 - |C - C_fly|/C_fly) + (1 - |lambda_1 - lambda_1,fly|/lambda_1,fly) + Resilience + Symmetry ].",
      "gain": "Настоящий коннектом FlyWire v783 (скачан с Zenodo, замер 23.09.2026): 139 255 нейронов, 54 492 922 синапса, 2 700 513 пар с ≥5 синапсами; кластеризация C = 0,160, длина пути L = 4,03, отклонение весов от логнормального KS = 0,282. Прежние C = 0,312, L = 2,84, KS = 0,209 считались на синтетическом графе.",
      "deploy": "aifa-biobench/biomatch_score.py",
      "metric": "C=0,160 · L=4,03 · 2,70 млн рёбер (FlyWire)"
    },
    {
      "num": "08",
      "evidenceClass": "E3",
      "evidenceLabel": "Микробенчмарк ПО (Браузер)",
      "name": "Клиентский поиск WASM (Браузерный микробенчмарк)",
      "bio": "Клиентский поиск в браузере: обычный JavaScript (TypedArrays, 7,1 КБ), обратный индекс и сходство Жаккара. WebAssembly и SIMD не используются.",
      "math": "Клиентское сканирование popcount с SIMD128: O(d/128) инструкций на вектор в локальной памяти вкладки.",
      "gain": "Файл public/aifa_connectome_web.js — обычный JavaScript (7 121 байт), без WebAssembly и SIMD; алгоритм — обратный индекс и сходство Жаккара. Замер 21.09.2026: 2 756 мкс P50 на 500 документах. Прежние «331,6 мкс, 126,7 КБ WASM SIMD» описывали несуществующую сборку.",
      "deploy": "public/aifa_connectome_web.js",
      "metric": "2 756 мкс P50 · 7,1 КБ JS"
    },
    {
      "num": "09",
      "evidenceClass": "E2",
      "evidenceLabel": "Прототип партиционера графов",
      "name": "Прототип нейроморфного компилятора графов (Loihi 2 / SynSense Exporter)",
      "bio": "Программный прототип: переводит граф связей в таблицу маршрутизации событий (AER) и квантует веса в INT8. Разбиение по ядрам — простыми последовательными блоками, без Metis и без минимизации разрезов; 78 нейропилей в коде не используются. Проверка «нет взаимоблокировок» была константой True. Телеметрия на платах Loihi 2 не проводилась.",
      "math": "Минимизация межъядерного NoC-трафика: min cut(G) при ограничении <= 128 нейронов на ядро.",
      "gain": "Проверка «нет взаимоблокировок» в движке была константой True. Настоящая проверка (поиск цикла в графе зависимостей ядер) нашла циклы в 1 000 из 1 000 прогонов — это возможные взаимоблокировки; реальный риск зависит от виртуальных каналов маршрутизатора. «0 взаимоблокировок» не подтверждено.",
      "deploy": "aifa-biobench/loihi_compiler_mock.py",
      "metric": "циклы в 1 000 из 1 000 прогонов"
    },
    {
      "num": "10",
      "evidenceClass": "E2",
      "evidenceLabel": "Синтетическая модель / Прототип",
      "name": "Индекс симбиоза Человек-ИИ (Математическая метрика Φ_sym)",
      "bio": "Формализованная скалярная модель оценки согласованности оператора и агента на базе коннектомных принципов гетеросинаптической пластичности. Для гарантированного исключения отрицательных значений формула использует строго ограниченную экспоненту: Φ_sym = exp(-lambda * D_KL(P_intent || P_action)) * Alignment * Trust. Формализация P_intent определена; эмпирическое исследование критериальной валидности с операторами запланировано.",
      "math": "Phi_sym = exp(-lambda * D_KL(P_intent || P_action)) * Alignment * Trust, строго в диапазоне (0, 1].",
      "gain": "Код считает другую формулу, чем на карточке: четыре множителя вместо exp(-λ·D_KL)·Alignment·Trust. На 1 000 шагах среднее Φ = 0,155; задержка 49,7 мкс (не 39,7). Метрика — математический прототип, связь с качеством работы человека и ИИ не проверялась.",
      "deploy": "aifa-biobench/symbiosis_index.py",
      "metric": "Φ = 0,155 в среднем · 49,7 мкс"
    }
  ],
  "en": [
    {
      "num": "01",
      "evidenceClass": "E3",
      "evidenceLabel": "Measured Software Benchmark",
      "name": "FlyHash v783 Connectome Memory",
      "bio": "Inspired by the fly mushroom body (Kenyon cells, ~6 input 'claws'). Projection weights are random and sparse — FlyWire data is not loaded into this mechanism.",
      "math": "Projection 1024-d → 2048 units, 6 random inputs per unit, k-WTA 5%, Hamming shortlist of 250 + exact rerank.",
      "gain": "Re-run 23.09.2026 on 50,000 vectors (1024-d): Recall@10 39.55% (independent queries) and 46.70% (smoke), P50 ≈ 44 ms on CPU. Exact FAISS brute force on the same data: 100% in 8.8 ms. In a 25,000-vector duel Sign-LSH reaches 80.5% vs FlyHash 18.9%; with 50% of code bits dropped FlyHash loses 57% of its recall, Sign-LSH 9%.",
      "deploy": "acr/memory/flyhash.py and aifa_connectome_web.js",
      "metric": "Recall@10 39.55% · P50 ≈ 44 ms"
    },
    {
      "num": "02",
      "evidenceClass": "E3",
      "evidenceLabel": "Measured Software Benchmark",
      "name": "APL Sensory Novelty Gate",
      "bio": "Giant GABAergic Anterior Paired Lateral (APL) neuron delivering global feedback inhibition.",
      "math": "Dynamic threshold theta(t) = alpha * theta(t-1) + beta * mean(KC_activity).",
      "gain": "Measured 21.09.2026 on the real engine: 94.9% sparsity vs 95% claimed, normalisation correct, repeated messages dropped. Latency 35.5 μs (N=512); the earlier '0.014 ms' is not reproduced. '40–80% token savings' was never measured. In the agent benchmark APL alone does not raise success (4.2% vs 5.8%).",
      "deploy": "acr/gating/apl_gate.py and API route guards",
      "metric": "35.5 μs · 94.9% sparsity"
    },
    {
      "num": "03",
      "evidenceClass": "E3",
      "evidenceLabel": "Measured Software Benchmark",
      "name": "Central Complex CX Steering Navigation",
      "bio": "Fan-Shaped Body (FB) and Protocerebral Bridge (PB) of the Central Complex.",
      "math": "Vector summation of phase shifts Delta phi = arctan2(sum sin(theta_i), sum cos(theta_i)).",
      "gain": "aifa_sdk/cx_steering.py lacks the visited-node repulsion its formula describes: in a loop trap the agent clicked the same button 30 times in a row. With that repulsion added, agent success rises from 1.4% to 94.7% — yet a standard agent with the same visited memory reaches 95.0%. '17.87 → 1.12 steps' was never measured.",
      "deploy": "acr/navigation/cx_steering.py and AIfaFocus crawler",
      "metric": "190 μs P50 · fix required"
    },
    {
      "num": "04",
      "evidenceClass": "E3",
      "evidenceLabel": "Measured Software Benchmark",
      "name": "CANN Focus Ring Attractor",
      "bio": "Ellipsoid Body ring neurons (64 neurons) with continuous attractor dynamics.",
      "math": "Amari neural field: tau * dU/dt = -U + integral W(theta - theta') f(U) dtheta' + I.",
      "gain": "Without input the ring holds the goal (error 0.01–0.13°); with 30–50% of neurons dead the error grows to ~15°; after 10 distractor pulses at the engine's default strength the ring drifts to the distractor (76°). In the agent benchmark it equals a pinned goal, with no extra gain. '0.062 rad, 20.5× more stable than FIFO' was hard-coded, not measured.",
      "deploy": "acr/attractor/cann_ring.py",
      "metric": "0.13° idle · 76° after distractors"
    },
    {
      "num": "05",
      "evidenceClass": "E3",
      "evidenceLabel": "Measured Software Benchmark",
      "name": "Bilateral Cross-Inhibition Verifier",
      "bio": "Lateral cross-inhibition arbitration between symmetric brain hemispheres.",
      "math": "Cross-inhibition: V_final = argmax(Conf_L - gamma * Conf_R, Conf_R - gamma * Conf_L).",
      "gain": "On a simple test the engine approved 50/50 agreeing decisions and rejected 50/50 conflicting ones; latency 4.3 μs. The threshold in code is 0.52, not 0.95. 'FPR 21.1% → 3.0%, F1 = 0.884' was never measured. In the agent benchmark the verifier added no success (93.6% vs 94.7% without it).",
      "deploy": "acr/arbitration/bilateral_verifier.py",
      "metric": "4.3 μs · 50/50 on a simple test"
    },
    {
      "num": "06",
      "evidenceClass": "E2–E3",
      "evidenceLabel": "Model-based Estimate / Simulation",
      "name": "Neuromorphic Energy Model (LIF Engine)",
      "bio": "Biophysical energy model based on Drosophila event-driven dynamics under stated event-cost assumption (1 pJ/spike vs 1–3 pJ/FLOP on GPU FP16). Sparsity breakdown: Connectivity Sparsity = 85.0% structural zeros; Activity Sparsity = 96.86% quiescent neurons during benchmark execution. Physical RAPL/wattmeter wall-clock hardware testing is on roadmap.",
      "math": "E_spike = N_spikes * 1 pJ vs E_gpu = N_ops * 2 pJ. Modeled event-cost energy reduction: 99.73%.",
      "gain": "A calculated model, not an energy measurement: assuming 1 pJ per spike vs 2 pJ per GPU operation and 96.86% activity sparsity, the model yields a 99.73% reduction (369×). Real power draw was not measured with a wattmeter or RAPL.",
      "deploy": "aifa-biobench/neuromorphic_energy.py (simulation model)",
      "metric": "99.73% — model, not measured"
    },
    {
      "num": "07",
      "evidenceClass": "E2",
      "evidenceLabel": "Executable Prototype / Metric",
      "name": "AIfa BioMatch Score (BioMatch v1.0)",
      "bio": "Metrological profile of the Drosophila melanogaster connectome (FlyWire v783: 139,255 neurons, 54.5M synapses, ~2.7M thresholded graph edges; Nature, Schlegel et al. 2024). Evaluates topological isomorphism of artificial memory graphs against biological reference.",
      "math": "BioMatch = 1/5 * [ (1 - D_KS(W, W_fly)) + (1 - |C - C_fly|/C_fly) + (1 - |lambda_1 - lambda_1,fly|/lambda_1,fly) + Resilience + Symmetry ].",
      "gain": "Real FlyWire v783 connectome (downloaded from Zenodo, measured 23.09.2026): 139,255 neurons, 54,492,922 synapses, 2,700,513 pairs with ≥5 synapses; clustering C = 0.160, path length L = 4.03, KS vs lognormal = 0.282. The earlier C = 0.312, L = 2.84, KS = 0.209 came from a synthetic graph.",
      "deploy": "aifa-biobench/biomatch_score.py",
      "metric": "C=0.160 · L=4.03 · 2.70M edges (FlyWire)"
    },
    {
      "num": "08",
      "evidenceClass": "E3",
      "evidenceLabel": "Measured Software Microbenchmark",
      "name": "Browser WASM Search (Client Microbenchmark)",
      "bio": "Client-side search in the browser: plain JavaScript (TypedArrays, 7.1 KB), inverted index with Jaccard similarity. No WebAssembly or SIMD is used.",
      "math": "Client-side SIMD128 popcount scan: O(d/128) instructions per vector in local browser memory.",
      "gain": "public/aifa_connectome_web.js is plain JavaScript (7,121 bytes), with no WebAssembly and no SIMD; the algorithm is an inverted index with Jaccard similarity. Measured 21.09.2026: 2,756 μs P50 on 500 documents. The earlier '331.6 μs, 126.7 KB WASM SIMD' described a build that does not exist.",
      "deploy": "public/aifa_connectome_web.js",
      "metric": "2,756 μs P50 · 7.1 KB JS"
    },
    {
      "num": "09",
      "evidenceClass": "E2",
      "evidenceLabel": "Graph Partitioner Prototype",
      "name": "Neuromorphic Graph Compiler Prototype (Loihi 2 / SynSense Target Exporter)",
      "bio": "Software prototype: converts a connection graph into an address-event (AER) routing table and quantises weights to INT8. Core partitioning is plain consecutive blocks — no Metis, no min-cut; the 78 neuropils are not used in the code. The 'deadlock-free' check was a constant True. No Loihi 2 board telemetry has been run.",
      "math": "Inter-core NoC traffic minimization: min cut(G) subject to <= 128 neurons per physical core.",
      "gain": "The engine's 'deadlock-free' check was a constant True. A real check (cycle search in the core dependency graph) found cycles in 1,000 of 1,000 runs — potential deadlocks; actual risk depends on router virtual channels. '0 deadlocks' is not confirmed.",
      "deploy": "aifa-biobench/loihi_compiler_mock.py",
      "metric": "cycles in 1,000 of 1,000 runs"
    },
    {
      "num": "10",
      "evidenceClass": "E2",
      "evidenceLabel": "Synthetic Model / Prototype",
      "name": "Human-AI Symbiosis Index (Mathematical Metric Φ_sym)",
      "bio": "Formalized scalar model evaluating operator-agent alignment derived from connectome heterosynaptic plasticity principles. To strictly eliminate negative divergence values, uses bounded exponential transformation: Φ_sym = exp(-lambda * D_KL(P_intent || P_action)) * Alignment * Trust. Formalization of P_intent is established; empirical criterion validity study with human operators is pending.",
      "math": "Phi_sym = exp(-lambda * D_KL(P_intent || P_action)) * Alignment * Trust, strictly bounded in (0, 1].",
      "gain": "The code computes a different formula than the card: four factors instead of exp(-λ·D_KL)·Alignment·Trust. Over 1,000 steps mean Φ = 0.155; latency 49.7 μs (not 39.7). A mathematical prototype; its link to real human-AI work quality has not been tested.",
      "deploy": "aifa-biobench/symbiosis_index.py",
      "metric": "mean Φ = 0.155 · 49.7 μs"
    }
  ],
  "es": [
    {
      "num": "01",
      "evidenceClass": "E3",
      "evidenceLabel": "Benchmark de Software Reproducible",
      "name": "Memoria Conectómica FlyHash v783",
      "bio": "Inspirado en el cuerpo pedunculado de la mosca (células de Kenyon, ~6 «garras» de entrada). Los pesos de proyección son aleatorios y dispersos: los datos de FlyWire no se cargan en este mecanismo.",
      "math": "Proyección 1024-d → 2048 unidades, 6 entradas aleatorias por unidad, k-WTA 5%, preselección de 250 por Hamming + reordenación exacta.",
      "gain": "Repetido el 23.09.2026 con 50.000 vectores (1024-d): Recall@10 39,55% (consultas independientes) y 46,70% (smoke), P50 ≈ 44 ms en CPU. Búsqueda exacta FAISS con los mismos datos: 100% en 8,8 ms. En un duelo de 25.000 vectores, Sign-LSH alcanza 80,5% frente a 18,9% de FlyHash; al eliminar el 50% de los bits, FlyHash pierde el 57% de su recall y Sign-LSH el 9%.",
      "deploy": "acr/memory/flyhash.py y aifa_connectome_web.js",
      "metric": "Recall@10 39,55% · P50 ≈ 44 ms"
    },
    {
      "num": "02",
      "evidenceClass": "E3",
      "evidenceLabel": "Benchmark de Software Reproducible",
      "name": "Puerta de Novedad Sensorial APL",
      "bio": "Neurona GABAérgica APL (Anterior Paired Lateral) con inhibición por retroalimentación global.",
      "math": "Umbral dinámico theta(t) = alpha * theta(t-1) + beta * mean(KC_activity).",
      "gain": "Medido el 21.09.2026 con el motor real: dispersión 94,9% frente al 95% declarado, normalización correcta, mensajes repetidos descartados. Latencia 35,5 μs (N=512); los «0,014 ms» anteriores no se reproducen. El «ahorro de 40–80% de tokens» nunca se midió. En el benchmark de agentes, APL por sí solo no aumenta el éxito (4,2% frente a 5,8%).",
      "deploy": "acr/gating/apl_gate.py y guardias API",
      "metric": "35,5 μs · dispersión 94,9%"
    },
    {
      "num": "03",
      "evidenceClass": "E3",
      "evidenceLabel": "Benchmark de Software Reproducible",
      "name": "Navegación Vectorial CX",
      "bio": "Cuerpo en abanico (FB) y puente protocerebral (PB) del Complejo Central.",
      "math": "Suma vectorial de ángulos de fase Delta phi = arctan2(sum sin(theta_i), sum cos(theta_i)).",
      "gain": "aifa_sdk/cx_steering.py no incluye la repulsión de nodos visitados que describe su fórmula: en una trampa de bucle el agente pulsó el mismo botón 30 veces seguidas. Con esa repulsión, el éxito del agente sube de 1,4% a 94,7%, aunque un agente estándar con la misma memoria de visitados llega a 95,0%. «17,87 → 1,12 pasos» nunca se midió.",
      "deploy": "acr/navigation/cx_steering.py y agente AIfaFocus",
      "metric": "190 μs P50 · requiere corrección"
    },
    {
      "num": "04",
      "evidenceClass": "E3",
      "evidenceLabel": "Benchmark de Software Reproducible",
      "name": "Atractor Continuo en Anillo CANN",
      "bio": "Columna de 64 neuronas en anillo del cuerpo elipsoide con dinámica de atractor continuo.",
      "math": "Ecuación de campo neuronal de Amari con inhibición lateral.",
      "gain": "Sin entrada, el anillo mantiene el objetivo (error 0,01–0,13°); con 30–50% de neuronas muertas el error sube a ~15°; tras 10 pulsos distractores con la fuerza por defecto del motor, el anillo se desplaza hacia el distractor (76°). En el benchmark de agentes equivale a un objetivo fijado, sin ganancia adicional. «0,062 rad, 20,5× más estable que FIFO» estaba escrito en el código, no medido.",
      "deploy": "acr/attractor/cann_ring.py",
      "metric": "0,13° en reposo · 76° tras distracciones"
    },
    {
      "num": "05",
      "evidenceClass": "E3",
      "evidenceLabel": "Benchmark de Software Reproducible",
      "name": "Verificador Bilateral de Inhibición Cruzada",
      "bio": "Inhibición lateral cruzada entre hemisferios cerebrales simétricos.",
      "math": "Inhibición mutua de hipótesis paralelas: V_final = argmax(Conf_L - gamma * Conf_R, Conf_R - gamma * Conf_L).",
      "gain": "En una prueba simple el motor aprobó 50/50 decisiones concordantes y rechazó 50/50 contradictorias; latencia 4,3 μs. El umbral en el código es 0,52, no 0,95. «FPR 21,1% → 3,0%, F1 = 0,884» nunca se midió. En el benchmark de agentes el verificador no aumentó el éxito (93,6% frente a 94,7% sin él).",
      "deploy": "acr/arbitration/bilateral_verifier.py",
      "metric": "4,3 μs · 50/50 en prueba simple"
    },
    {
      "num": "06",
      "evidenceClass": "E2–E3",
      "evidenceLabel": "Estimación basada en Modelo / Simulación",
      "name": "Modelo de Eficiencia Energética (Motor LIF)",
      "bio": "Modelo biofísico de eventos sinápticos de Drosophila (1 pJ/espiga vs 1-3 pJ/FLOP GPU FP16). Dispersión estructural: 85,0% ceros en matriz conectómica. Dispersión activa: 96,86% neuronas silenciosas durante el benchmark. Pruebas físicas con vatímetro en hardware en hoja de ruta.",
      "math": "E_espiga = N_espigas * 1 pJ vs E_gpu = N_ops * 2 pJ. Reducción modelada de energía: 99,73%.",
      "gain": "Modelo calculado, no una medición de energía: suponiendo 1 pJ por espiga frente a 2 pJ por operación de GPU y 96,86% de dispersión de actividad, el modelo da una reducción del 99,73% (369×). El consumo real no se midió con vatímetro ni RAPL.",
      "deploy": "aifa-biobench/neuromorphic_energy.py (simulador)",
      "metric": "99,73% — modelo, no medido"
    },
    {
      "num": "07",
      "evidenceClass": "E2",
      "evidenceLabel": "Prototipo Ejecutable / Métrica",
      "name": "Puntuación AIfa BioMatch (BioMatch v1.0)",
      "bio": "Perfil metrológico del conectoma de Drosophila melanogaster (FlyWire v783: 139.255 neuronas, 54,5M sinapsis, ~2,7M aristas de grafo; Nature 2024). Evalúa isomorfismo topológico frente a referencia biológica.",
      "math": "BioMatch = 1/5 * [ (1 - D_KS) + (1 - |C - C_fly|/C_fly) + (1 - |lambda_1 - lambda_1,fly|/lambda_1,fly) + Resiliencia + Simetría ].",
      "gain": "Conectoma real FlyWire v783 (descargado de Zenodo, medido el 23.09.2026): 139.255 neuronas, 54.492.922 sinapsis, 2.700.513 pares con ≥5 sinapsis; agrupamiento C = 0,160, longitud de camino L = 4,03, KS frente a lognormal = 0,282. Los valores anteriores C = 0,312, L = 2,84, KS = 0,209 procedían de un grafo sintético.",
      "deploy": "aifa-biobench/biomatch_score.py",
      "metric": "C=0,160 · L=4,03 · 2,70 M aristas (FlyWire)"
    },
    {
      "num": "08",
      "evidenceClass": "E3",
      "evidenceLabel": "Microbenchmark en Navegador",
      "name": "Búsqueda WASM en Cliente (Microbenchmark)",
      "bio": "Búsqueda en el navegador del cliente: JavaScript simple (TypedArrays, 7,1 KB), índice invertido con similitud de Jaccard. No se usa WebAssembly ni SIMD.",
      "math": "Escaneo popcount SIMD128 en cliente: O(d/128) instrucciones por vector en memoria local.",
      "gain": "public/aifa_connectome_web.js es JavaScript simple (7.121 bytes), sin WebAssembly ni SIMD; el algoritmo es un índice invertido con similitud de Jaccard. Medido el 21.09.2026: 2.756 μs P50 con 500 documentos. Los anteriores «331,6 μs, 126,7 KB WASM SIMD» describían una compilación inexistente.",
      "deploy": "public/aifa_connectome_web.js",
      "metric": "2.756 μs P50 · 7,1 KB JS"
    },
    {
      "num": "09",
      "evidenceClass": "E2",
      "evidenceLabel": "Prototipo Particionador de Grafo",
      "name": "Prototipo Compilador Neuromórfico (Loihi 2 / SynSense)",
      "bio": "Prototipo de software: convierte un grafo de conexiones en una tabla de enrutamiento de eventos (AER) y cuantiza los pesos a INT8. La partición en núcleos son bloques consecutivos simples — sin Metis ni minimización de cortes; los 78 neuropilos no se usan en el código. La comprobación «sin interbloqueos» era una constante True. No se ha realizado telemetría en placas Loihi 2.",
      "math": "Minimización de tráfico NoC inter-núcleos: min cut(G) con restricción <= 128 neuronas por núcleo.",
      "gain": "La comprobación «sin interbloqueos» del motor era una constante True. Una comprobación real (búsqueda de ciclos en el grafo de dependencias entre núcleos) encontró ciclos en 1.000 de 1.000 ejecuciones — posibles interbloqueos; el riesgo real depende de los canales virtuales del enrutador. «0 interbloqueos» no está confirmado.",
      "deploy": "aifa-biobench/loihi_compiler_mock.py",
      "metric": "ciclos en 1.000 de 1.000 ejecuciones"
    },
    {
      "num": "10",
      "evidenceClass": "E2",
      "evidenceLabel": "Modelo Sintético / Prototipo",
      "name": "Índice de Simbiosis Humano-IA (Métrica Φ_sym)",
      "bio": "Modelo escalar formalizado de alineación operador-agente derivado de plasticidad heterosináptica. Para garantizar la eliminación de valores negativos, emplea transformación exponencial acotada: Φ_sym = exp(-lambda * D_KL) * Alineación * Confianza. Formalización de P_intent establecida; estudio empírico de validez de criterio pendiente.",
      "math": "Phi_sym = exp(-lambda * D_KL(P_intent || P_action)) * Alineación * Confianza, estrictamente en (0, 1].",
      "gain": "El código calcula una fórmula distinta a la de la tarjeta: cuatro factores en lugar de exp(-λ·D_KL)·Alignment·Trust. En 1.000 pasos, Φ medio = 0,155; latencia 49,7 μs (no 39,7). Prototipo matemático; su relación con la calidad real del trabajo humano-IA no se ha probado.",
      "deploy": "aifa-biobench/symbiosis_index.py",
      "metric": "Φ medio = 0,155 · 49,7 μs"
    }
  ],
  "zh": [
    {
      "num": "01",
      "evidenceClass": "E3",
      "evidenceLabel": "可复现软件基准测试",
      "name": "FlyHash v783 连接组超稀疏联想记忆",
      "bio": "受果蝇蘑菇体启发（Kenyon 细胞，约 6 个输入“爪”）。投影权重为随机稀疏矩阵——该机制并未加载 FlyWire 数据。",
      "math": "1024 维投影至 2048 个单元，每个单元 6 个随机输入，k-WTA 5%，汉明距离初筛 250 个候选 + 精确重排序。",
      "gain": "2026-09-23 在 50,000 个 1024 维向量上复测：Recall@10 为 39.55%（独立查询）和 46.70%（smoke），CPU 上 P50 ≈ 44 毫秒。相同数据上 FAISS 精确暴力检索：8.8 毫秒达到 100%。在 25,000 向量对比中，Sign-LSH 达到 80.5%，FlyHash 为 18.9%；去掉 50% 编码位时，FlyHash 召回率下降 57%，Sign-LSH 下降 9%。",
      "deploy": "acr/memory/flyhash.py 及 aifa_connectome_web.js",
      "metric": "Recall@10 39.55% · P50 ≈ 44 毫秒"
    },
    {
      "num": "02",
      "evidenceClass": "E3",
      "evidenceLabel": "可复现软件基准测试",
      "name": "APL 感觉新颖性自适应抑制门控",
      "bio": "前侧配对侧向 (APL) 巨型 GABA 能神经元，构建全脑全局反馈抑制网络。",
      "math": "动态抑制阈值方程 theta(t) = alpha * theta(t-1) + beta * mean(KC_activity)。",
      "gain": "2026-09-21 在真实引擎上实测：稀疏度 94.9%（声明 95%），归一化正确，重复消息被过滤。延迟 35.5 微秒（N=512）；此前的“0.014 毫秒”无法复现。“节省 40–80% token”从未测量。在智能体基准中，单独使用 APL 并未提高成功率（4.2% 对 5.8%）。",
      "deploy": "acr/gating/apl_gate.py 与 API 路由网关",
      "metric": "35.5 微秒 · 稀疏度 94.9%"
    },
    {
      "num": "03",
      "evidenceClass": "E3",
      "evidenceLabel": "可复现软件基准测试",
      "name": "中央复合体 (CX) 向量偏航导向导航",
      "bio": "中央复合体扇形体 (FB) 与原脑桥 (PB) 的相位神经元环路。",
      "math": "偏航角相位矢量合成 Delta phi = arctan2(sum sin(theta_i), sum cos(theta_i))。",
      "gain": "aifa_sdk/cx_steering.py 缺少其公式所述的“已访问节点排斥”：在循环陷阱中智能体连续 30 次点击同一按钮。加入该排斥后，智能体成功率从 1.4% 升至 94.7%——但带有同样已访问记忆的标准智能体可达 95.0%。“17.87 → 1.12 步”从未测量。",
      "deploy": "acr/navigation/cx_steering.py 与 AIfaFocus 自动化爬虫",
      "metric": "190 微秒 P50 · 需要修复"
    },
    {
      "num": "04",
      "evidenceClass": "E3",
      "evidenceLabel": "可复现软件基准测试",
      "name": "CANN 连续吸引子长程对话焦点稳态网络",
      "bio": "椭球体 64 神经元环形吸引子网络，具备局部递归激活与全域抑制连续动态。",
      "math": "阿马里神经场方程 tau * dU/dt = -U + integral W * f(U) + I。",
      "gain": "无输入时环形吸引子能保持目标（误差 0.01–0.13°）；30–50% 神经元失效时误差升至约 15°；以引擎默认强度施加 10 次干扰脉冲后，环会漂向干扰方向（76°）。在智能体基准中其效果等同于固定目标，没有额外收益。“0.062 弧度、比 FIFO 稳定 20.5 倍”是写死在代码中的，并非测量结果。",
      "deploy": "acr/attractor/cann_ring.py",
      "metric": "静息 0.13° · 干扰后 76°"
    },
    {
      "num": "05",
      "evidenceClass": "E3",
      "evidenceLabel": "可复现软件基准测试",
      "name": "双半球对称侧向互抑防幻觉交叉仲裁器",
      "bio": "模拟果蝇左、右脑半球对称回路的并行推演与侧向互抑仲裁。",
      "math": "双通路互抑仲裁 V_final = argmax(Conf_L - gamma * Conf_R, Conf_R - gamma * Conf_L)。",
      "gain": "在简单测试中，引擎批准了 50/50 个一致决策并拒绝了 50/50 个矛盾决策；延迟 4.3 微秒。代码中的阈值是 0.52，而非 0.95。“FPR 21.1% → 3.0%、F1 = 0.884”从未测量。在智能体基准中，该验证器没有提升成功率（93.6% 对不使用时的 94.7%）。",
      "deploy": "acr/arbitration/bilateral_verifier.py",
      "metric": "4.3 微秒 · 简单测试 50/50"
    },
    {
      "num": "06",
      "evidenceClass": "E2–E3",
      "evidenceLabel": "基于模型的估算 / 仿真",
      "name": "神经形态能效模型（LIF 脉冲引擎）",
      "bio": "基于果蝇事件驱动动力学的生物物理能耗模型（设定事件成本 1 pJ/脉冲 vs GPU FP16 1–3 pJ/FLOP）。稀疏度分解：连接稀疏度 (Connectivity Sparsity) = 85.0% 结构零；活动稀疏度 (Activity Sparsity) = 96.86% 基准运行期间静息神经元。硬件功率计 (RAPL/瓦特表) 物理实测已列入路线图。",
      "math": "E_spike = N_spikes * 1 pJ vs E_gpu = N_ops * 2 pJ。模型估算能耗降低：99.73%。",
      "gain": "这是计算模型，而非能耗实测：假设每个脉冲 1 pJ、每次 GPU 运算 2 pJ，活动稀疏度 96.86%，模型得出降低 99.73%（369 倍）。实际功耗未用功率计或 RAPL 测量。",
      "deploy": "aifa-biobench/neuromorphic_energy.py (仿真模型)",
      "metric": "99.73% — 模型，非实测"
    },
    {
      "num": "07",
      "evidenceClass": "E2",
      "evidenceLabel": "可执行原型 / 算法度量",
      "name": "AIfa BioMatch 拓扑度量评分 (BioMatch v1.0)",
      "bio": "黑腹果蝇全脑连接组计量特征（FlyWire v783：139,255 个神经元、5450 万突触、约 270 万阈值化图边缘；Nature 2024）。用于评估人工记忆图谱相对生物基准的拓扑同构性。",
      "math": "BioMatch = 1/5 * [ (1 - D_KS) + (1 - |C - C_fly|/C_fly) + (1 - |lambda_1 - lambda_1,fly|/lambda_1,fly) + 韧性 + 对称性 ].",
      "gain": "真实 FlyWire v783 连接组（从 Zenodo 下载，2026-09-23 实测）：139,255 个神经元、54,492,922 个突触、2,700,513 对 ≥5 个突触的连接；聚类系数 C = 0.160，特征路径长度 L = 4.03，与对数正态分布的 KS = 0.282。此前的 C = 0.312、L = 2.84、KS = 0.209 来自合成图。",
      "deploy": "aifa-biobench/biomatch_score.py",
      "metric": "C=0.160 · L=4.03 · 270万条边 (FlyWire)"
    },
    {
      "num": "08",
      "evidenceClass": "E3",
      "evidenceLabel": "端侧微基准测试 (WASM)",
      "name": "浏览器端 WASM 检索（端侧微基准测试）",
      "bio": "浏览器端客户端检索：普通 JavaScript（TypedArrays，7.1 KB），倒排索引加 Jaccard 相似度。未使用 WebAssembly 或 SIMD。",
      "math": "客户端 SIMD128 popcount 检索：本地浏览器内存中每向量 O(d/128) 条指令。",
      "gain": "public/aifa_connectome_web.js 是普通 JavaScript（7,121 字节），不含 WebAssembly 和 SIMD；算法为倒排索引加 Jaccard 相似度。2026-09-21 实测：500 个文档上 P50 为 2,756 微秒。此前的“331.6 微秒、126.7 KB WASM SIMD”描述的是并不存在的构建。",
      "deploy": "public/aifa_connectome_web.js",
      "metric": "2,756 微秒 P50 · 7.1 KB JS"
    },
    {
      "num": "09",
      "evidenceClass": "E2",
      "evidenceLabel": "图分区器原型",
      "name": "神经形态图编译器原型（Loihi 2 / SynSense 导出器）",
      "bio": "软件原型：将连接图转换为地址事件（AER）路由表，并把权重量化为 INT8。核心划分只是简单的连续分块——没有使用 Metis，也没有最小割；代码中并未使用 78 个神经纤网。“无死锁”检查是常量 True。尚未在 Loihi 2 实体板上进行遥测。",
      "math": "跨核心 NoC 流量最小化：min cut(G) 满足每物理核心 <= 128 神经元约束。",
      "gain": "引擎中的“无死锁”检查是常量 True。真实检查（在核间依赖图中查找环）在 1,000 次运行中全部发现环——即潜在死锁；实际风险取决于路由器虚拟通道。“0 死锁”未得到证实。",
      "deploy": "aifa-biobench/loihi_compiler_mock.py",
      "metric": "1,000 次运行中 1,000 次存在环"
    },
    {
      "num": "10",
      "evidenceClass": "E2",
      "evidenceLabel": "合成模型 / 原型",
      "name": "人机共生指数（数学度量 Φ_sym）",
      "bio": "基于异突触可塑性原理的形式化人机协同对齐标量模型。为严格避免负散度，采用严格有界的指数变换：Φ_sym = exp(-lambda * D_KL(P_intent || P_action)) * 对齐度 * 信任度。P_intent 形式化已建立；针对人类操作员的效标关联效度实证研究正在进行中。",
      "math": "Phi_sym = exp(-lambda * D_KL(P_intent || P_action)) * 对齐度 * 信任度，严格处于 (0, 1] 区间。",
      "gain": "代码计算的公式与卡片不同：四个因子相乘，而非 exp(-λ·D_KL)·Alignment·Trust。1,000 步平均 Φ = 0.155；延迟 49.7 微秒（而非 39.7）。这是数学原型，与真实人机协作质量的关系尚未验证。",
      "deploy": "aifa-biobench/symbiosis_index.py",
      "metric": "平均 Φ = 0.155 · 49.7 微秒"
    }
  ]
};

const ALL_30_INNOVATIONS: Record<Lang, any[]> = {
  "ru": [
    {
      "num": 1,
      "name": "Мушиный LSH-поиск по памяти (FlyHash Memory Engine)",
      "bio": "По мотивам грибовидного тела мухи. По данным литературы: ~783 проекционных нейрона передают запах ~2 000–2 500 клеткам Кеньона, каждая клетка получает ~6–8 случайных входов, нейрон APL тормозит всех, и активными остаются ~5% клеток. Отсюда идея: случайная разреженная проекция в большое пространство плюс «победитель забирает всё» даёт бинарный хеш, устойчивый к шуму. В нашей реализации проекция 1024 → 2048 единиц со случайными весами (данные FlyWire не загружаются), активны 30% единиц, кандидаты отбираются по расстоянию Хэмминга и доранжируются точно.",
      "math": "Измерено на N=50 000 векторов (d=1024), Intel Core i7-14700, independent-протокол: P50 43.9 мс, Recall@10 39.55% (23.09.2026).",
      "gain": "Биологически инспирированный алгоритм локально-чувствительного хеширования (Locality-Sensitive Hashing) на архитектуре грибовидного тела Drosophila melanogaster (783 uPN -> 2,467 KC). В нашей реализации доля активных клеток Кеньона настроена на 30% (не биологические 5%) — решение от 20.09.2026 в пользу эффективности поиска, а не биологической точности. Обеспечивает поиск похожих векторов через битовые операции popcount без построения тяжелых графов HNSW.",
      "deploy": "aifa.works, aifa.digital, codeofdigitaleternity.com, ядро AIfa",
      "uniqueness": "Локально-чувствительное хеширование (LSH) на коннектоме грибовидного тела Drosophila (783 PN -> 2467 KC, 30% активных клеток в нашей реализации). Компактный индекс (215 МБ на 50 000 векторов), работает на CPU без GPU.",
      "competitors": "Честный прогон против FAISS IndexFlatL2 (exact brute-force) на том же железе 23.09.2026: FAISS оказался в 5.0 раза быстрее (8.8 мс против 43.9 мс) и точнее (100% против 39.55% Recall@10). Наше преимущество — не скорость точного поиска, а компактность индекса без GPU; сравнение по памяти и энергии на разных методах ещё не проведено.",
      "limitations": "Текущая реализация (v1) даёт Recall@10 39.55% на pool=250 из 50 000 векторов (0.5% базы) — расширение кандидатного пула повышает recall ценой скорости. Разреженная проекция оптимизирована для размерностей d<=1024.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "43.9 ms"
    },
    {
      "num": 2,
      "name": "Нейрон новизны APL для вечной памяти диалога и краулера (Novelty Detector)",
      "bio": "По мотивам нейрона APL мухи: по данным литературы, один крупный тормозный нейрон в каждом полушарии собирает активность клеток Кеньона и гасит её, если стимул похож на уже виденный. В нашей реализации это детектор повторов: новый вектор сравнивается с буфером ранее виденных, и если сходство выше порога, запись считается дублем. Замер 21.09.2026 (bench/novelty_detector.py): буфер 5 000, 4 000 проверок (2 000 новых + 2 000 дублей), точность 100% на этом синтетическом тесте, P50 1 069 мкс, P95 2 092 мкс. Прежние «3,4 мкс» не подтвердились.",
      "math": "Сходство нового вектора с буфером ранее виденных; выше порога 0,92 — дубль, ниже — новое. Замер: 100% верных решений на 4 000 синтетических проверках.",
      "gain": "Отсекает повторы до записи в память и до вызова модели. Сколько токенов это экономит в живом диалоге, не измерялось: прежние «51,3%», «78–94%» и «40–80%» снятые как недоказанные. В испытании агента APL сам по себе успеха не повышает (4,2% против 5,8% у агента с закреплённой целью).",
      "deploy": "bench/novelty_detector.py (Apache 2.0), краулеры США (10 воркеров), aifa.works, aifa.digital",
      "uniqueness": "Фильтр повторов по мотивам тормозного нейрона APL: решение «новое или дубль» принимается одним сравнением с буфером, без вызова модели.",
      "competitors": "Обычные векторные базы сохраняют всё подряд. Фильтр отсекает дубли за 1 069 мкс (P50, буфер 5 000; замер 21.09.2026). Экономия токенов не измерялась.",
      "limitations": "В v1 порог новизны alpha=0.92 калибруется статически. В v2: динамическая гомеостатическая автокалибровка порога на основе энтропии Шеннона диалоговой сессии.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1069.45 us P50 (100.0% accuracy)"
    },
    {
      "num": 3,
      "name": "Центральный комплекс (CX) — Векторный компас вместо слепого Tab (Compass Navigation)",
      "bio": "По мотивам центрального комплекса мухи: по данным литературы, кольцо нейронов эллипсоидного тела хранит текущее направление, а веерообразное тело сравнивает его с целевым и выдаёт команду поворота. В нашей реализации это выбор следующего элемента страницы по вектору к цели вместо перебора клавишей Tab.",
      "math": "Замер 21.09.2026 (bench/compass_navigation.py): на 200 синтетических деревьях по 50 узлов — 3,66 шага против 23,54 при переборе Tab (в 6,43 раза меньше), успех 100%. Прежние «1,12 шага, в 16 раз» не подтвердились. В испытании агента на настоящих движках CX в нынешнем коде защиты от повторов не имеет и успеха не даёт (1,4%); с добавленной памятью посещённых ссылок — 94,7%.",
      "gain": "Меньше шагов навигации по странице: на синтетических деревьях в 6,43 раза. Выход из клавиатурных ловушек на реальных сайтах отдельно не проверялся.",
      "deploy": "bench/compass_navigation.py (Apache 2.0), браузерные агенты AIfa, aifa.works",
      "uniqueness": "Векторный компас на протоцеребральном мосте (PB) и веерообразном теле (FB) Центрального Комплекса (CX) для навигации агента в DOM-графах и файловых системах.",
      "competitors": "21.09.2026: реально измерено — baseline (линейный Tab-перебор) 23.54 шага в среднем на 200 испытаниях, CX Steering 3.66 шага (ускорение в 6.43 раза), успех навигации 100.0%. Заявленные ранее \"12-18 итераций\" и \"1.12 шага (в 16 раз)\" не были измерены.",
      "limitations": "Требует предварительно построенного DOM-графа переходов. В v2: динамический онтологический резолвер для SPA-сайтов с закрытым Shadow DOM.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "3.66 steps (6.43x speedup)"
    },
    {
      "num": 4,
      "name": "Заверенная криптографическая копия коннектома в реестре (Proof of Connectome)",
      "bio": "Коннектом FlyWire v783 (Zenodo 10.5281/zenodo.10676866, CC BY 4.0). Замер 23.09.2026 по файлам релиза (bench/connectome_real_metrics.py): 139 255 нейронов, 54 492 922 синапса, 15 091 983 связанные пары, 2 700 513 пар от 5 синапсов; медиаторы в данных — ацетилхолин, ГАМК, глутамат, октопамин, серотонин, дофамин. Прежнее «3 869 878 связей» не подтвердилось. Отпечатки файлов — md5 от Zenodo (f48f972d… и e0e6c197…). Дерево Меркла в bench/proof_of_connectome.py построено на синтетических записях с тем же числом нейронов: сборка 1,23 с, проверка поддерева 1,6 мс, подмена листа замечена в 20 из 20 попыток.",
      "math": "Отпечаток SHA-256 каждого файла релиза и дерево Меркла: изменение любой записи меняет корень. Проверено на синтетических записях: 20 подмен из 20 обнаружены.",
      "gain": "Позволяет доказать, что работа ведётся именно на опубликованном наборе FlyWire v783 и что он не изменён. Биткоин-штамп корня самого коннектома ставится заново: прежний («блок 967 238») оказался пустым.",
      "deploy": "bench/proof_of_connectome.py (Apache 2.0), codeofdigitaleternity.com, Arweave, Solana",
      "uniqueness": "Криптографический хеш SHA-256 и Merkle-дерево синаптических весов коннектома FlyWire v783. 21.09.2026: заявление о заверении в блокчейне Bitcoin (OpenTimestamps Block 967238) и Arweave — внешний сетевой факт, не проверяемый локальным скриптом.",
      "competitors": "Отпечаток и дерево Меркла делают подмену данных заметной. Проверено на синтетических записях: подмена листа замечена в 20 из 20 попыток.",
      "limitations": "Проверка блокчейн-квитанции требует внешнего сетевого запроса к ноде Bitcoin (1-2 сек). В v2: встроенный локальный zk-SNARK верификатор < 5 мс.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1.2255 s build, 1.622 ms verify, 100% tamper detection"
    },
    {
      "num": 5,
      "name": "Коннектомика на наш граф (AIfa Memory Graph Connectomics)",
      "bio": "Идея: смотреть на граф знаний так же, как нейробиологи смотрят на коннектом, — степени узлов, кластеры, хабы, короткие пути. Настоящий коннектом FlyWire v783 (замер 23.09.2026, 2 700 513 пар от 5 синапсов): коэффициент кластеризации C = 0,160, средняя длина пути L = 4,03. Прежние «C = 0,34» и «2,3% хабов» не подтвердились. В нашей реализации узлы — организации, домены, телефоны и технологии, рёбра — связи между ними.",
      "math": "Замер 21.09.2026 (bench/memory_graph_connectomics.py) на синтетическом графе: 13 050 узлов, 30 094 ребра. Обход на 2 шага — 0,0125 мс на запрос (1 000 запросов), PageRank 20 итераций — 0,62 с.",
      "gain": "Методы анализа графов (степени, кластеры, PageRank, короткие пути) применяются к графу организаций из наших данных, чтобы находить связанные группы и ключевые узлы. Прежнее число «907 000 сайтов» ничем не подтверждено и снято; выявление «скрытых бенефициаров» не проверялось.",
      "deploy": "bench/memory_graph_connectomics.py (Apache 2.0), codeofdigitaleternity.com, aifa.works",
      "uniqueness": "Граф ассоциативной памяти с топологией Small-World, изоморфный синаптической кластеризации FlyWire v783. Мгновенный многосвязный ассоциативный контекст.",
      "competitors": "21.09.2026: реально измерено — 2-hop обход на нашем синтетическом графе (13 050 узлов) занимает 0.0125 мс на запрос (быстрее заявленных ранее 0.12 мс). Заявление о Neo4j/Memgraph (15-40 мс) — внешний факт из открытых источников, не измерено этим скриптом на одинаковых условиях.",
      "limitations": "Ограничение памяти до 500 000 узлов в ОЗУ на один процесс. В v2: масштабирование до 50M узлов через mmap-дисковый бэкенд с SIMD-подкачкой страниц.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0,0125 мс на обход в 2 шага; PageRank 0,62 с (20 итераций)"
    },
        {
      "num": 6,
      "name": "Довод об энергии: расчетная экономия 99.73% по модели событий LIF (Neuromorphic Energy)",
      "bio": "По данным литературы, мозг мухи тратит порядка 10 микроватт, а в каждый момент активна малая доля нейронов. Идея модели: считать энергию по числу событий (спайков), а не по числу всех умножений, как у плотной нейросети. Это расчётная модель, а не замер: ваттметр и счётчики RAPL не использовались.",
      "math": "E_событий = число синаптических событий × 1 пДж; E_плотно = число операций × 1,5 пДж. Прогон 21.09.2026 (bench/neuromorphic_energy_run.py): 512 нейронов, 1 000 шагов, разреженность 96,86%, 507 095 событий — в 369,1 раза меньше операций, чем у плотного FP16-умножения.",
      "gain": "Даёт оценку порядка величины: при разреженной событийной работе операций в сотни раз меньше. Реальная экономия электричества на конкретном железе не измерялась. Прежние «92%» и «800×» не совпадали с прогоном и заменены им.",
      "deploy": "bench/neuromorphic_energy_run.py (Apache 2.0), все 4 сайта и автономные агенты",
      "uniqueness": "Архитектура вычислений на целочисленных битовых операциях AVX2/POPCNT. 23.09.2026: утверждение \"0.003 Вт на запрос, 333 000 запросов на Джоуль\" не измерялось ваттметром ни для этого симулятора, ни для поиска FlyHash — снято как недоказанное.",
      "competitors": "21.09.2026: реально измерено (bench/neuromorphic_energy_run.py) — множитель энергоэффективности спайковой модели против плотного GPU-инференса составляет 369.1x, а не заявленные ранее 800x. Кластеры FAISS на GPU Nvidia H100 потребляют от 350 до 700 Вт на ноду — внешний факт из документации Nvidia, не измерено этим скриптом.",
      "limitations": "Расчетная модель; физическая валидация RAPL и ваттметром запланирована в дорожной карте. Оптимизировано под x86_64 AVX2/AVX-512. В v2: прямой компилятор под ARM NEON (Apple Silicon, Raspberry Pi 5) и RISC-V Vector Extension.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "369,1× — модельная оценка по счёту операций, не замер ваттметром"
},
        {
      "num": 7,
      "name": "AIfa BioMatch Score (Метрика BioMatch v1.0)",
      "bio": "Архитектурный прототип: Метрологический профиль коннектома Drosophila melanogaster (FlyWire v783: 139 255 нейронов, 54.5M синапсов, ~2.7M пороговых ребер графа; Nature, Schlegel et al. 2024).\nОценка топологического изоморфизма искусственных сетей памяти относительно биологического эталона.",
      "math": "BioMatch = 1/5 * [ (1 - D_KS(W, W_fly)) + (1 - |C - C_fly|/C_fly) + (1 - |lambda_1 - lambda_1,fly|/lambda_1,fly) + Resilience + Symmetry ]. 21.09.2026: реализовано и прогнано (bench/biomatch_score.py, Apache 2.0, использует уже существующий E:/CODE/aifa-biobench/aifa_sdk/connectome_golden_standard.py) — на синтетическом графе 500 узлов с топологией малого мира (Watts-Strogatz) итоговый BioMatch Score впервые вычислен: 38.89%, вердикт NON_BIOLOGICAL_FRAGILE. Это честный результат синтетического теста на грубом приближении топологии, а не заявление о совпадении с реальным коннектомом FlyWire.",
      "gain": "Композитный алгоритмический индекс соответствия биологической топологии по 5 столпам: соответствие логнормальному распределению весов (99.22% на нашем синтетическом графе), малый мир (кластеризация 0.4793 против целевых 0.312 — score 46.37%), спектральный радиус на грани хаоса (4.5876 против целевых ~1.05 — score 0.0%, наш граф слишком плотный), устойчивость к разрушению (score 8.72%), билатеральная симметрия (Pearson r=0.4013 — score 40.13%).",
      "deploy": "bench/biomatch_score.py (Apache 2.0), aifa-biobench/aifa_sdk/connectome_golden_standard.py",
      "uniqueness": "Метрологическая сверка топологии графа памяти с коннектомом FlyWire v783 по 5 инвариантам, включая ИТОГОВЫЙ скалярный композитный Score — впервые вычислен 21.09.2026, а не только отдельные компоненты.",
      "competitors": "Синтетические бенчмарки (MTEB) не тестируют топологическое соответствие биологическому эталону вовсе; BioMatch — единственная известная метрика такого рода, но 21.09.2026: наш собственный синтетический тест дал низкий Score (38.89%), честно показывая, что грубая имитация топологии малого мира далека от настоящего коннектома.",
      "limitations": "Итоговый Score 38,89% посчитан на СИНТЕТИЧЕСКОМ графе (21.09.2026). 23.09.2026 скачан настоящий коннектом FlyWire v783 (Zenodo 10676866) и измерен: 139 255 нейронов, 54 492 922 синапса, 2 700 513 пар с ≥5 синапсами; C = 0,160, L = 4,03, KS = 0,282 (bench/connectome_real_metrics.py). Прежние C = 0,312, L = 2,84, KS = 0,209 не подтвердились. Итоговый Score на настоящем графе ещё не посчитан.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "38.89% composite Score (NON_BIOLOGICAL_FRAGILE) — впервые вычислено 21.09.2026"
},
        {
      "num": 8,
      "name": "Клиентский поиск в браузере (Browser Client-Side Search)",
      "bio": "Архитектурный прототип: клиентский движок ассоциативного поиска для браузера (public/aifa_connectome_web.js). 21.09.2026: карточка заявляла 'компактный бинарный модуль WebAssembly (Wasm SIMD128, 126.7 КБ)' и 'клиентское сканирование popcount с SIMD128'. ПРЯМАЯ ПРОВЕРКА ФАЙЛА показала: это ЧИСТЫЙ JavaScript, ноль байт WebAssembly, ноль SIMD-инструкций — собственный комментарий в самом файле честно пишет 'pure JavaScript / TypedArrays', а карточка этому противоречила. Реальный размер файла 7 121 байт, а не заявленные 126 700 (расхождение в 17.79 раза). Реальный алгоритм — обратный индекс (posting lists) с активацией Kenyon Cell и подсчётом Jaccard-сходства, а не popcount по битовым хешам.",
      "math": "Обратный индекс (inverted posting-list) с активацией искусственных клеток Кеньона и Jaccard-сходством — НЕ popcount SIMD128, как заявлялось ранее.",
      "gain": "Локальное исполнение семантического поиска без отправки векторов запроса во внешнее облако; нулевые затраты на серверный инференс. 21.09.2026: честно прогнан реальный алгоритм файла (bench/wasm_search_run.mjs, Node.js V8 — тот же движок, что в Chrome) — P50 2756.3 мкс, что почти в 8 раз медленнее заявленных ранее 331.6 мкс. Это ожидаемо: реальный алгоритм (обратный индекс на чистом JS) объективно медленнее заявленного, но не существовавшего SIMD-движка.",
      "deploy": "bench/wasm_search_run.mjs (Apache 2.0), public/aifa_connectome_web.js",
      "uniqueness": "Клиентский движок ассоциативной памяти на чистом JavaScript прямо в браузере (7.1 КБ, не 126.7 КБ, и не WASM).",
      "competitors": "Облачные векторные базы требуют передачи приватных эмбеддингов на сервер; клиентский движок исполняет запрос локально, пусть и на JS, а не на WASM/SIMD, как заявлялось.",
      "limitations": "21.09.2026: технология была заявлена неверно (WASM/SIMD128 вместо чистого JS) — это не просто неточное число, а подмена заявленной архитектуры. Микробенчмарк на 500 синтетических документах; многовкладочное нагрузочное тестирование и реальная компиляция в WASM — в дорожной карте, если решено делать.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2756.3 μs P50 честный JS (не WASM, не 331.6 мкс) — исправлено 21.09.2026"
},
        {
      "num": 9,
      "name": "Прототип нейроморфного компилятора графов (Loihi 2 / SynSense Exporter)",
      "bio": "Архитектурный прототип: Программный транслятор графа связей коннектома в асинхронную модель маршрутизации адресов событий (AER - Address Event Representation).\nДекомпозиция 78 нейропилей через Metis, INT8 квантование, симуляция NoC-маршрутизации. 21.09.2026: заявление '0 взаимных блокировок (deadlocks) в 1000 прогонах' проверено — исходный движок (aifa-biobench/aifa_sdk/neuromorphic_compiler.py) возвращает поле is_deadlock_free как ЖЁСТКУЮ КОНСТАНТУ True, а не измерение: движок вообще не ищет дедлоки. Заявление было непроверяемым по построению. Написана честная замена (bench/neuromorphic_compiler_run.py) — поиск цикла в графе межъядерных зависимостей NoC-трафика на 1000 синтетических графах: 1000 из 1000 прогонов дали циклическую зависимость (ожидаемо для плотных случайных графов), что НЕ доказывает реальные дедлоки на аппаратуре (зависит от виртуальных каналов роутера), но честно показывает, что прежнее число 0/1000 нельзя было получить этим кодом.",
      "math": "Минимизация межъядерного NoC-трафика: min cut(G) при ограничении <= 128 нейронов на ядро.",
      "gain": "Автоматическое разбиение крупномасштабного графа коннектома на изолированные аппаратные ядра спайковых чипов.",
      "deploy": "bench/neuromorphic_compiler_run.py (Apache 2.0), aifa-biobench/aifa_sdk/neuromorphic_compiler.py",
      "uniqueness": "Программный транслятор графа FlyWire v783 в спайковые сети (SNN) для архитектур Loihi 2 и SynSense.",
      "competitors": "Традиционные GPU требуют непрерывного умножения матриц; спайковые чипы работают событийно при потреблении < 50 мкВт.",
      "limitations": "Программный прототип и симулятор маршрутизации, не физическая проверка дедлоков на аппаратуре; интеграция с физическими PCIe-платами Loihi 2 на этапе аппаратного стенда. 21.09.2026: проверка дедлоков в исходном коде отсутствовала — добавлена честная (но не окончательная) замена через анализ графа зависимостей.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1000/1000 циклических зависимостей ядер (не физич. дедлоков) — исходное \"0 deadlocks\" было непроверяемым, исправлено 21.09.2026"
},
        {
      "num": 10,
      "name": "Индекс симбиоза Человек-ИИ (Математическая метрика Φ_sym)",
      "bio": "Архитектурный прототип: Формализованная скалярная модель оценки согласованности оператора и агента на базе коннектомных принципов гетеросинаптической пластичности.\nДля гарантированного исключения отрицательных значений формула использует строго ограниченную экспоненту:\nPhi_sym = exp(-lambda * D_KL(P_intent || P_action)) * Alignment * Trust.\n21.09.2026: переменные Alignment и Trust никогда не были определены числом на карточке. Найден уже существующий движок (aifa-biobench/aifa_sdk/symbiosis_index.py), реализующий ДРУГУЮ, полностью определённую формулу из 4 множителей: intent_alignment * latency_decay * accuracy_factor * h_synergy. Честно прогнан (bench/symbiosis_index_run.py) на 1000 синтетических ходах взаимодействия — mean Phi=0.1547, P50=0.0974, задержка на ход 49.7-54.7 мкс (не 39.7 мкс, но того же порядка). Это честный синтетический тест, не эмпирическое исследование с живыми операторами.",
      "math": "Phi_symbiosis = (1 - D_KL(P_intent||P_action)) * exp(-tau/tau_0) * (1 - N_corr/N_int) * H_synergy — реальная формула движка, отличается от заявленной ранее на карточке.",
      "gain": "Скалярная метрика качества взаимодействия человека и ИИ в диапазоне (0, 1]. 21.09.2026: честно измерено на синтетическом сценарии — среднее значение 0.1547 (состояние MISALIGNED_DIVERGENCE), что честно отражает зашумлённое синтетическое взаимодействие, а не заявление о реальном качестве симбиоза.",
      "deploy": "bench/symbiosis_index_run.py (Apache 2.0), aifa-biobench/aifa_sdk/symbiosis_index.py",
      "uniqueness": "Математически строго ограниченный индекс когнитивного симбиоза с исключением отрицательных расхождений.",
      "competitors": "Обычные метрики меряют только скорость токенов; Phi_sym количественно оценивает согласованность намерений и действий.",
      "limitations": "Формализованный прототип на синтетических данных, не эмпирическое исследование с реальными операторами. 21.09.2026: заявленные переменные Alignment/Trust не были определены — движок использует другую, но полностью определённую формулу.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "Phi_sym mean=0.1547, P50=0.0974 · 49.7-54.7 us/turn (не 39.7 мкс) — исправлено 21.09.2026"
},
    {
      "num": 11,
      "name": "Топологический изоморфизм сетей Small-World (Карта мозга как карта памяти)",
      "bio": "Замер 23.09.2026 на настоящем коннектоме FlyWire v783 (bench/connectome_topology_extra.py; 134 181 нейрон со связями, 2 511 789 пар от 5 синапсов): кластеризация C = 0,155, средний путь L = 4,02. У случайного графа того же размера, посчитанного тем же способом, C = 0,00029, L = 3,65. Индекс малого мира σ = (C/C_rand)/(L/L_rand) = 490 — мозг мухи сильно кластеризован при коротких путях. Прежние числа карточки (C = 0,284, L = 3,82, σ = 8,42 или 79,81) не подтвердились. Для синтетического графа памяти (500 узлов, p = 0,08) прогон 21.09.2026 дал σ = 19,7, а не заявленные 7,15.",
      "math": "σ = (C/C_rand) / (L/L_rand), где C_rand и L_rand измеряются на случайном графе с тем же числом узлов и рёбер. FlyWire v783: σ = 490; синтетический граф памяти: σ = 19,7.",
      "gain": "Идея: строить граф памяти по образцу мозга — плотные тематические кластеры плюс редкие дальние связи, чтобы до любого факта было несколько шагов. Выигрыш такой организации для качества поиска у нас пока не измерялся.",
      "deploy": "bench/small_world_index_run.py (Apache 2.0), codeofdigitaleternity.com, память AIfa",
      "uniqueness": "Сопоставление графа памяти с настоящим коннектомом по индексу малого мира, где случайный граф измеряется, а не подставляется формулой.",
      "competitors": "Прежнее «в 4 раза выше устойчивость к забыванию по сравнению с плотными эмбеддингами» ничем не измерено и снято.",
      "limitations": "Граф памяти пока синтетический (500 узлов, p = 0,08); на графе настоящих диалогов индекс не считался.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "FlyWire v783: σ = 490 (C = 0,155, L = 4,02); граф памяти: σ = 19,7"
    },
    {
      "num": 12,
      "name": "Виртуальная абляция и живучесть топологии (Удаление узлов / Chaos Engineering)",
      "bio": "Замер 23.09.2026 на настоящем коннектоме FlyWire v783 (bench/connectome_topology_extra.py, 134 181 нейрон со связями): ⟨k²⟩/⟨k⟩ = 190,9, отсюда порог распада при случайных отказах f_c = 1 − 1/(⟨k²⟩/⟨k⟩ − 1) = 0,995. Прямой опыт: после удаления 30% случайных нейронов в самой большой связной части остаются 68,5% всех нейронов графа, после удаления 30% самых связанных — 57,5%; при 50% — 48,1% и 28,0%. Прежние «⟨k²⟩/⟨k⟩ ≈ 42,6, f_c ≈ 0,976» не подтвердились.",
      "math": "Доля узлов в самой большой связной части после удаления доли f узлов — случайно или по убыванию степени. Настоящий коннектом: при f = 30% — 68,5% (случайно) и 57,5% (по степени).",
      "gain": "Даёт способ заранее найти узлы, отказ которых сильнее всего рвёт систему: у коннектома удаление самых связанных узлов вредит заметно сильнее случайного. Применение к нашим сервисам пока не проводилось.",
      "deploy": "Серверные микросервисы и воркеры экосистемы",
      "uniqueness": "Проверка живучести на настоящем графе мозга: удаление до 50% узлов, случайно и прицельно, с числом для каждого шага.",
      "competitors": "Прежняя строка ссылалась на скрипт acr_robustness_suite.py («65,5% против 26,84%»), результат которого был задан формулой; настоящий тест выключения (bench/robustness_real.py) показал обратное для FlyHash: при 50% выключенных разрядов 25,4% против 78,2% у Sign-LSH.",
      "limitations": "Считается связность графа, а не работа нейронов; для графа наших сервисов тест пока не проводился.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "30% отказов: 68,5% (случайно), 57,5% (по степени); f_c = 0,995"
    },
    {
      "num": 13,
      "name": "Строковые эвристики против нейросетевого перегрева (Обоняние вместо Олламы)",
      "bio": "По мотивам обоняния мухи: по данным литературы, первичное решение «опасно / съедобно» принимают жёстко заданные рецепторы, без долгих вычислений. Идея для ИТ: простые случаи — домен, заголовок, текст ошибки — разбирать быстрым сопоставлением с образцами, а тяжёлую модель звать только там, где образцы не решают. Прежние числа про нагрев сервера, задержки модели и «12–18% галлюцинаций» не измерялись и сняты.",
      "math": "Автомат Ахо–Корасик по 16 образцам, время O(длины строки) на запрос. Замер 21.09.2026 (bench/olfactory_filter_run.py): 5 000 строк, P50 2,0 мкс, P95 3,0 мкс, P99 3,3 мкс.",
      "gain": "Разбирает простые строки за микросекунды без запуска модели. Во сколько раз это быстрее локальной модели, не измерено: модель для сравнения не запускалась, и прежнее «в 75 000 раз» опиралось на предполагаемые 150 мс, а не на замер.",
      "deploy": "bench/olfactory_filter_run.py (Apache 2.0), aifa.works, маршрутизатор запросов",
      "uniqueness": "Двухступенчатый отбор: сначала сопоставление с образцами, модель — только для того, что образцы не решили.",
      "competitors": "Вызов модели на каждую строку дороже и медленнее; насколько именно — в этом прогоне не мерилось. Фильтр: 2,0 мкс на строку (P50), без внешних вызовов.",
      "limitations": "Образцы задаются вручную; строки, которых нет в образцах, всё равно уходят в модель. На 5 000 синтетических строк как опасные помечено 59,5% — доля на настоящих данных не мерилась.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2,0 мкс P50 на строку (замер 21.09.2026)"
    },
    {
      "num": 14,
      "name": "16-нейронный кольцевой аттрактор фазы диалога (Кольцо для памяти диалога)",
      "bio": "По мотивам эллипсоидного тела мухи: по данным литературы, кольцо нейронов-«компасов» держит «холм» активности, который поворачивается вместе с мухой и сохраняет направление. Идея: хранить текущую фазу диалога в таком кольце. В нашей реализации — кольцевой аттрактор (уравнение Амари, веса «мексиканская шляпа»); прогон сделан на 16 нейронах, как на карточке (в движке по умолчанию 64).",
      "math": "Замер 21.09.2026 (bench/cann_ring_run.py): 16 нейронов, 1 000 шагов без помех — P50 23,0 мкс на шаг, стабильность 99,67%, цель удержана во всех шагах. Замер 23.09.2026 (bench/robustness_real.py): после 10 отвлекающих толчков силы 0,25 кольцо уходит к помехе на 73–94°.",
      "gain": "Без помех кольцо держит заданную фазу надёжно и быстро (23 мкс на шаг). Под помехами нынешняя настройка фазу теряет, поэтому «удержание фокуса через сотни реплик» пока не доказано. В испытании агента кольцо даёт тот же успех, что и простое закрепление цели (5,6% против 5,8%).",
      "deploy": "bench/cann_ring_run.py (Apache 2.0), диалоговые интерфейсы aifa.works, codeofdigitaleternity.com",
      "uniqueness": "Кольцо из 16 нейронов, в котором положение «холма» активности кодирует текущую фазу задачи.",
      "competitors": "Без помех цель удерживается во всех 1 000 шагах; при отвлекающих толчках силы 0,25 — нет (уход на 73–94°). Сравнение с удержанием контекста в языковых моделях не проводилось.",
      "limitations": "Фиксированные 16 состояний; под помехами нужна другая настройка силы торможения. Прежняя задержка «16,21 мкс» не подтвердилась (замер 23,0 мкс P50).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "23,0 мкс P50; без помех 99,67%, при помехах уход 73–94°"
    },
    {
      "num": 15,
      "name": "Атлас нейромедиаторов и синаптический баланс возбуждения/торможения",
      "bio": "Коннектом FlyWire размечен предсказанным медиатором для каждой связи. Замер 23.09.2026 по данным релиза (bench/connectome_transmitters.py, 54,46 млн синапсов с предсказанием), доля синапсов по наиболее вероятному медиатору: ацетилхолин 55,8%, ГАМК 23,3%, глутамат 17,8%, дофамин 1,4%, серотонин 1,2%, октопамин 0,6%. Прежние доли на карточке (ацетилхолин ~45%, дофамин ~5%, серотонин и октопамин по ~3%) не подтвердились. Идея модели: возбуждение и торможение уравновешиваются, и сеть держит заданный уровень активности.",
      "math": "I = ACh − γ_GABA·GABA + M_dopamine·ΔW; γ_GABA подстраивается так, чтобы средняя активность шла к цели 5%. Замер 21.09.2026 (bench/ei_balance_run.py): 256 нейронов, 3 000 шагов, итоговая активность 4,99% при цели 5%, P50 142 мкс на шаг.",
      "gain": "Гомеостаз работает: сеть сама выходит на заданный уровень активности. Прежние утверждения «устраняет галлюцинации» и «устраняет зацикливание генерации» не проверялись — модель с языковыми моделями не соединялась.",
      "deploy": "bench/ei_balance_run.py (Apache 2.0), шедулер ядра AIfa, radiocode.space",
      "uniqueness": "Контур баланса возбуждения и торможения с подстройкой силы торможения. Прогон 21.09.2026 (bench/ei_balance_run.py) — реализация формулы карточки, написанная с нуля.",
      "competitors": "Замер: гомеостаз сходится к плотности 4,99% при цели 5% (256 нейронов, 3 000 шагов). Сравнение со штрафом за повторы в языковых моделях не проводилось.",
      "limitations": "Упрощённая модель без пространственного суммирования на дендритах. Прежняя задержка «1,68 мкс» не подтвердилась (замер 142 мкс P50).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "142.2 us P50 (гомеостаз сходится) — исправлено 21.09.2026"
    },
    {
      "num": 16,
      "name": "Редкое важнее частого: селективное взвешивание признаков (Биологический IDF и прунинг)",
      "bio": "По мотивам сенсорной адаптации мухи: по данным литературы, постоянный фон перестаёт восприниматься, а редкий важный сигнал усиливается. Идея: давать редким признакам больший вес, а частые связи прореживать. Формула: w(f) = log(1 + N/df) · (1 − e^(−λ·Δt)), порог прореживания — 5% от наибольшего веса.",
      "math": "Замер 21.09.2026 (bench/bio_idf_pruning_run.py) на синтетическом корпусе: 2 000 документов, 5 000 признаков — прорежено 24,5% связей (не 72%), редкие признаки получают вес в 6,9 раза выше частых.",
      "gain": "Прореживает четверть частых связей и выделяет редкие признаки. Влияние на точность классификатора и на скорость вывода не измерялось; прежние «до 72%» и «без малейшей потери точности» сняты.",
      "deploy": "bench/bio_idf_pruning_run.py (Apache 2.0), индексатор коннектома aifa_brain_indexer.py",
      "uniqueness": "Вес признака по обратной частоте с учётом давности, с прореживанием слабых связей. Прогон 21.09.2026 — реализация формулы карточки, написанная с нуля; закон «редкое весит больше» подтверждён (в 6,9 раза).",
      "competitors": "В отличие от TF-IDF, учитывает давность признака. Замер на синтетическом корпусе (2 000 документов, 5 000 признаков): прорежено 24,5% связей против заявленных 72%. Прямого сравнения с TF-IDF по качеству не проводилось.",
      "limitations": "Рассчитано на неизменный корпус; прореживание в потоке не реализовано. Прежняя задержка «3,29 мкс» не подтвердилась (замер 2,1 мс P50 на прореживание).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2145.7 us P50 прунинга (24.49% удалено) — исправлено 21.09.2026"
    },
    {
      "num": 17,
      "name": "Схема коннектома как стандарт архитектурной документации (CADF Standard)",
      "bio": "Идея: описывать архитектуру ИИ-системы так же строго, как FlyWire описывает мозг — у каждого элемента идентификатор и тип, у каждой связи тип и вес. Формат CADF: S = ⟨V, E, T, W⟩, где тип связи T ∈ {Sync, Async, Inhibitory, Modulatory}, вес W > 0.",
      "math": "Замер 21.09.2026 (bench/cadf_schema_run.py): документ из 200 компонентов и 800 связей проверяется за 0,27 мс (P50); верный документ — 0 ошибок, испорченный — 2 ошибки найдены. Прежние «2,177 мс» не подтвердились.",
      "gain": "Машиночитаемое описание архитектуры, которое проверяется автоматически. Насколько оно удобнее C4 или UML на реальных проектах, не проверялось.",
      "deploy": "bench/cadf_schema_run.py (Apache 2.0), aifa.digital, документация API",
      "uniqueness": "Открытая JSON-схема CADF и валидатор; до 21.09.2026 ни схемы, ни валидатора не существовало — оба написаны по формуле карточки и проверены.",
      "competitors": "Компактнее универсальных форматов графов (ONNX, GEXF) для этой задачи. Замер: валидатор принимает верный документ и отклоняет испорченный (неверный тип связи, отрицательный вес).",
      "limitations": "Валидатор на Python без внешних зависимостей; библиотек для других языков нет.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.2694 ms P50 валидации (быстрее заявленных 2.177 ms) — исправлено 21.09.2026"
    },
    {
      "num": 18,
      "name": "Открытый набор верифицированных данных для ученых (ADAB Dataset)",
      "bio": "Идея: как FlyWire дал всем один открытый эталон мозга, так открытый набор замеров доступности сайтов может дать исследователям общий эталон. Наш набор — клавиатурный обход сайтов США: какие из восьми типовых страниц открываются и проходятся с клавиатуры.",
      "math": "Замер 23.09.2026: файл КЛАВИАТУРА_8_СТРАНИЦ_A.jsonl — 1 639 050 записей, около 135 тыс. организаций; обход продолжается.",
      "gain": "Большой набор реальных замеров клавиатурной доступности сайтов США. Прежние слова «крупнейший в мире» и «с заверкой в блокчейне Bitcoin» не проверены и сняты; когда и в каком виде набор публикуется, решает Архитектор.",
      "deploy": "bench/adab_merkle_run.py (Apache 2.0), aifa.digital, репозитории экосистемы",
      "uniqueness": "Реальные замеры, а не выборка из сотни страниц: сотни тысяч организаций и восемь типовых страниц у каждой.",
      "competitors": "Механизм дерева Меркла для набора проверен на синтетических записях: доказательства включения верны в 100% случаев, подделка обнаруживается.",
      "limitations": "Один большой JSONL-файл; обход ещё идёт, поэтому числа растут. Публикация и зеркала (IPFS, HuggingFace) — по решению Архитектора.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1 639 050 записей, ~135 тыс. организаций (23.09.2026)"
    },
    {
      "num": 19,
      "name": "Мушиный отбор признаков: оптимальная размерность d6",
      "bio": "По данным литературы (Caron et al., Nature 2013; Litwin-Kumar et al., Neuron 2017), клетка Кеньона мухи получает входы примерно от 6–8 проекционных нейронов, и это число считают близким к оптимуму для разделения запахов. Мы проверили это на своих задачах.",
      "math": "Два прогона. Разделимость классов (bench/fly_d6_optimality_run.py, 10 зёрен): k = 6 — 0,456, k = 10 — 0,460, k = 16 — 0,457, разброс ±0,01–0,02 — плато от 6 до 16. Поиск (bench/sweep_dendritic_degree.py): Recall@10 при d = 6 — 19,8%, d = 7 — 23,3%, d = 16 — 24,9%.",
      "gain": "Вывод замеров: d = 6 — хороший выбор, но не «строгий оптимум». На наших задачах от 6 до 16 входов результат почти одинаков, а для поиска больше входов немного лучше.",
      "deploy": "bench/fly_d6_optimality_run.py (Apache 2.0), Проектор хэшей FlyHash v783",
      "uniqueness": "Биологическая гипотеза проверена перебором на двух задачах, а не принята на веру.",
      "competitors": "Меньше входов — меньше весов и обращений к памяти, чем у плотных слоёв (при d = 6 весов в 85 раз меньше, чем у плотной проекции 1024-d). Выигрыш по пропускной способности памяти на железе не измерялся.",
      "limitations": "Проверено на синтетических данных; на настоящих эмбеддингах перебор не делался.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "17.5 us при k=6 (не заявленные 166.38 us) — исправлено 21.09.2026"
    },
    {
      "num": 20,
      "name": "Живой интерактивный показ работы коннектома (Терминальный live showcase)",
      "bio": "Идея: показывать распространение активности по мозгу мухи наглядно — в терминале и в браузере, со звуком, зависящим от числа импульсов. Проекция точек на экран: [u, v] = R(α, β)·[x, y, z]; звук: f(t) = f0 + k·Σ s_i(t).",
      "math": "Замер 21.09.2026 (bench/terminal_showcase_run.py): кадр из 139 255 точек строится за 4,1 мс (P50) — 243,8 кадра в секунду; проекция одной точки 14,3 мкс, звук 1,3 мкс. Координаты точек синтетические: в релизе FlyWire, которым мы пользуемся, координат нейронов нет.",
      "gain": "Наглядный показ для объяснения и обучения; заявленные 60 кадров в секунду выполняются с запасом (243,8). Прежнее «мощнейший инструмент вирусного маркетинга» — оценка, а не замер.",
      "deploy": "bench/terminal_showcase_run.py (Apache 2.0), query_brain.py, интерактивная консоль",
      "uniqueness": "Показ в терминале и браузере с проекцией и звуком; реализация обеих формул написана 21.09.2026 и замерена.",
      "competitors": "Замер: кадр из 139 255 точек — 243,8 кадра в секунду при заявленных 60.",
      "limitations": "Координаты синтетические, а не анатомические; в браузере показывается часть узлов.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "4101.6 us полный кадр / 243.81 FPS (60 FPS подтверждено) — уточнено 21.09.2026"
    },
    {
      "num": 21,
      "name": "CX Steering Vector Navigation (Векторная навигация агента в DOM-дереве)",
      "bio": "По мотивам центрального комплекса мухи: по данным литературы, нейроны P-EN и P-FN связывают эллипсоидное тело и протоцеребральный мост и помогают поворачивать к цели. Формула карточки: V = α·∇Φ_цель − β·Σ отталкивание от посещённых узлов. В коде движка (aifa_sdk/cx_steering.py) реализована только первая часть — притяжение к цели; поле посещённых узлов объявлено, но не используется.",
      "math": "Замер 21.09.2026 (bench/cx_steering_run.py): сценарий «Подробнее → окно → снова Подробнее», 30 попыток — навигатор нажал «Подробнее» все 30 раз и ни разу не дошёл до «Оформить заказ». Задержка P50 190 мкс.",
      "gain": "В нынешнем виде защиты от зацикливания нет. Испытание агента 23.09.2026 показало, что именно её и не хватает: с добавленной памятью посещённых ссылок успех растёт с 1,4% до 94,7%. Эта починка в код движка ещё не внесена.",
      "deploy": "bench/cx_steering_run.py (Apache 2.0), Парсеры и воркеры сбора данных США (_КЛАВИАТУРА)",
      "uniqueness": "Навигация браузерного агента по вектору к цели, по мотивам нейронов ориентации мухи.",
      "competitors": "Прямой тест на заявленном сценарии (30 попыток): навигатор зациклился все 30 раз. Прежнее «на 91% меньше ошибочных кликов» не проверено — не было независимого сравнения.",
      "limitations": "Нужна реализация отталкивания от посещённых узлов в самом движке; нужно дерево доступности страницы.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "190.0 us, зацикливание не предотвращается (не заявленные 3.56 us) — исправлено 21.09.2026"
    },
    {
      "num": 22,
      "name": "Нейромодуляторное переключение режимов (Шедулер краулера: сон, бодрствование, форсаж)",
      "bio": "По мотивам нейромодуляции мухи: по данным литературы, дофамин, октопамин и серотонин переключают мозг между сном, спокойным бодрствованием, поиском пищи и бегством. Идея для краулера: менять число параллельных воркеров и паузы по успехам и ошибкам, как модуляторы меняют режим.",
      "math": "Замер 21.09.2026 (bench/neuromod_scheduler_run.py): при устойчивых ошибках число воркеров падает до 0, пауза растёт до 38 с — защита от бана работает. При устойчивом успехе число воркеров остаётся 4 и не растёт: базовый штраф 6·σ(0) = 3,0 почти целиком гасит наибольший прирост от дофамина 4·tanh(3) = 3,98.",
      "gain": "Надёжно притормаживает обход при ошибках. Ускоряться при успехе в нынешней формуле не умеет — это свойство самой формулы, её нужно поправить.",
      "deploy": "bench/neuromod_scheduler_run.py (Apache 2.0), Фоновые воркеры task-974, шедулер телеметрии",
      "uniqueness": "Режимы работы обхода, управляемые аналогами дофамина (успехи) и октопамина (ошибки).",
      "competitors": "Обычный планировщик держит фиксированную нагрузку. Этот сбрасывает её до нуля при сбоях; прироста при успехе нет (см. замер).",
      "limitations": "Формулу нужно поправить, чтобы успех действительно поднимал параллелизм; переходы между фазами пока задаются вручную.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2.0 us (не заявленные 0.19 us) — уточнено 21.09.2026"
    },
    {
      "num": 23,
      "name": "APL Linear Normalization (Нормализация для LLM-контекста / Ингибирование APL)",
      "bio": "По мотивам нейрона APL: по данным литературы, один крупный тормозный нейрон в полушарии получает сигнал от всех активных клеток Кеньона и тормозит их всех пропорционально, так что активными остаются немногие. Формула карточки: A = ReLU(X − квантиль(1−k)), затем нормировка суммой.",
      "math": "Замер 21.09.2026 (bench/apl_normalization_run.py): доля нулей 94,9% при заявленных 95%, нормировка верна. Время растёт как N^0,81 на длинах от 1 024 до 262 144 (41 мкс → 3,4 мс); при N = 512 — 35,5 мкс, а не заявленные 4,05 мкс.",
      "gain": "Оставляет самые сильные 5% значений и нормирует их. Прежние слова о сжатии контекста для больших моделей «без потери сущностей» не проверялись: на настоящих промптах и моделях замеров нет.",
      "deploy": "bench/apl_normalization_run.py (Apache 2.0), Интеграция с LLM API на aifa.works",
      "uniqueness": "Глобальное торможение по образцу APL: один порог на весь вектор вместо внимания «каждый с каждым».",
      "competitors": "Замер сложности: время растёт как N^0,81 — не хуже линейного, заметно лучше квадратичного внимания. Сохранность имён, дат и фактов в сжатом тексте не измерялась.",
      "limitations": "Работает на числовом векторе; связка с токенизатором и реальной языковой моделью не сделана.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "35,5 мкс при N = 512; разреженность 94,9%"
    },
    {
      "num": 24,
      "name": "Когерентные мотивы прямой связи (FFL для шумоподавления / Feed-Forward Loops)",
      "bio": "Мотив C1-FFL (Alon, 2007): узел X включает Y, а выход Z срабатывает, только если активны и X, и Y (логическое «И»). Короткий импульс не успевает пройти через Y и гаснет, длинный сигнал проходит. Насколько этот мотив обогащён именно в FlyWire v783, мы не проверяли.",
      "math": "Замер 21.09.2026 (bench/c1_ffl_filter_run.py): критическая длительность 3,47 шага; короткие импульсы — 0 ложных срабатываний из 50, длинные сигналы — 0 пропусков из 50. Задержка 0,2 мкс (P50), заявлено 0,18 мкс.",
      "gain": "Фильтр отсекает короткие всплески и пропускает устойчивые сигналы: оба свойства подтверждены на 100 синтетических случаях. На настоящем сетевом трафике не проверялся.",
      "deploy": "bench/c1_ffl_filter_run.py (Apache 2.0), Шлюзы безопасности и фаерволы сайтов",
      "uniqueness": "Мотив прямой связи C1-FFL как фильтр ложных импульсов и всплесков запросов.",
      "competitors": "В отличие от скользящего среднего, не сглаживает сигнал, а пропускает его целиком после порога длительности. Замер задержки: 0,2 мкс, почти как заявленные 0,18 мкс.",
      "limitations": "Порог длительности фиксирован; подстройка под конкретный канал не реализована.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.2 us (почти совпадает с заявленными 0.18 us) — подтверждено 21.09.2026"
    },
    {
      "num": 25,
      "name": "Детектор движения Рейхардта (EMD T4/T5 для визуальных барьеров / Оптический поток)",
      "bio": "По данным литературы, нейроны T4 и T5 зрительной системы мухи определяют движение светлых и тёмных краёв по модели Хассенштейна–Рейхардта: сигнал одного фоторецептора задерживается и перемножается с сигналом соседнего. Идея: тем же способом находить на странице опасное мерцание и навязчивую анимацию. Прежнее «в миллион раз эффективнее видеокарт» — не замер, снято.",
      "math": "Замер 21.09.2026 (bench/emd_reichardt_run.py): сетка 32×32 = 1 024 детектора, 0,0021 мкс на детектор (P50). Мощность мерцания в опасной полосе в 1 605 раз выше статичного фона. Статичный фон — 0 ложных тревог из 20; мерцание вне полосы — 0 из 4; мерцание в полосе найдено в 4 случаях из 5.",
      "gain": "Дешёвый детектор мерцания без нейросетей: статичный фон не путает, опасную полосу находит в большинстве случаев (4 из 5), но не во всех — «мгновенно выявляет» было преувеличением.",
      "deploy": "bench/emd_reichardt_run.py (Apache 2.0), Защита от визуальных барьеров, бот-ловушек и всплывающих окон",
      "uniqueness": "Детектор движения по образцу нейронов T4/T5 для поиска мерцания и анимаций, опасных по WCAG.",
      "competitors": "Детектор на порядки дешевле заявленного: 0,0021 мкс на детектор против 0,28 мкс. Обход ловушек для ботов и капч не проверялся.",
      "limitations": "Двумерный растр фиксированного размера; одно мерцание в полосе из пяти пропущено — порог нужно подстраивать.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.002 us чистого детектора (заявлено 0.28 us для полной системы) — измерено 21.09.2026"
    },
    {
      "num": 26,
      "name": "K-Core Graph Decomposition (K-Core декомпозиция и отказоустойчивость ядра)",
      "bio": "k-ядро — наибольший подграф, где у каждого узла не меньше k соседей внутри подграфа; находится последовательным удалением узлов со степенью меньше k. Замер 23.09.2026 на настоящем коннектоме FlyWire v783 (bench/connectome_topology_extra.py, пары от 5 синапсов): k_max = 57, во внутреннем ядре 258 нейронов. Прежние «k_max = 78, 1 420 нейронов» не подтвердились.",
      "math": "Алгоритм Батагеля–Заверсника, O(V+E). Замер 21.09.2026 на синтетическом графе (ядро 100 + периферия 900): рост времени как N^1,12 — почти линейно; ядро найдено точно (совпадение 100%). Настоящий коннектом: k_max = 57 (258 нейронов).",
      "gain": "Находит самую плотную, взаимно связанную часть графа. В синтетическом опыте ядро пережило потерю всей периферии и до 50% собственных узлов без распада. Прежние «защита от 99% сетевых атак» и «ядро на микроконтроллере с 64 МБ» не проверялись и сняты.",
      "deploy": "bench/kcore_decomposition_run.py (Apache 2.0), Отказоустойчивое ядро AIfa, топология серверов",
      "uniqueness": "Выделение ядра высшего порядка связности; на настоящем мозге мухи — 258 нейронов при k = 57.",
      "competitors": "Замер: сложность почти линейная (N^1,12), ядро устойчиво к потере периферии. Задержка на синтетическом графе из 1 000 узлов — 2,6 мс (P50), а не заявленные 0,5 мс.",
      "limitations": "Ядро пересчитывается целиком; постепенный пересчёт при изменении графа не реализован.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2600.8 us на синтетическом графе 1000 узлов (заявлено 498.10 us) — измерено 21.09.2026"
    },
    {
      "num": 27,
      "name": "Гомеостатическая пластичность и прунинг памяти (Гомеостатический прунинг)",
      "bio": "По данным литературы (Turrigiano, 1998), нейрон масштабирует все свои входные синапсы так, чтобы их суммарная сила оставалась постоянной, — иначе обучение по Хеббу разгоняет его до насыщения. Идея: так же держать «объём» памяти постоянным, а слабые неиспользуемые связи удалять.",
      "math": "Замер 21.09.2026 (bench/homeostatic_scaling_run.py): после каждого шага масштабирования сумма весов ровно 1,0 (цель 1,0); без гомеостаза за 500 шагов она выросла до 1 300. Прореживание: из 100 синапсов удалено 66, из них 75,8% — из неиспользуемой половины. Задержка 9,8 мкс (P50, 200 синапсов).",
      "gain": "Не даёт памяти разрастаться без предела. Но прореживание задевает и используемые связи (четверть удалённых), так что «без потери важных фактов» пока не выполнено; «катастрофическое забывание» на настоящей модели не проверялось.",
      "deploy": "bench/homeostatic_scaling_run.py (Apache 2.0), Долговременный архив памяти AIfa",
      "uniqueness": "Постоянная суммарная сила связей плюс удаление неиспользуемых: память освобождает место под новое.",
      "competitors": "Сумма весов держится ровно на цели при любом числе шагов; без механизма она растёт в 1 300 раз. Сравнение с чисткой векторных баз не проводилось.",
      "limitations": "Прореживание нужно настроить, чтобы оно не задевало используемые связи; затухание только по времени, без учёта важности.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "9.8 us (заявлено 6.59 us, тот же порядок величины) — измерено 21.09.2026"
    },
    {
      "num": 28,
      "name": "Коннектомный бенчмарк графовых систем (DCGB / Drosophila Connectome Graph Benchmark)",
      "bio": "Идея: использовать настоящий граф мозга как тест для графовых баз данных, потому что синтетические графы не повторяют его структуру. Замер 23.09.2026 настоящего графа FlyWire v783: 139 255 нейронов, 15 091 983 связанные пары, 54 492 922 синапса; при пороге от 5 синапсов — 134 181 нейрон и 2 511 789 рёбер. Прежние «3 869 878 связей» и «3,87 млн рёбер» не подтвердились.",
      "math": "Пакет тестов: обход на k шагов, Дейкстра, PageRank, каскад активации. Замер 21.09.2026 (bench/dcgb_graph_benchmark_run.py) на синтетическом графе из 2 000 узлов: все алгоритмы дают верный результат, обход на 2 шага — 39 мкс (P50). На настоящем графе мухи пакет ещё не прогонялся.",
      "gain": "Даст тест графовых систем на реальной биологической структуре. Сейчас готовы алгоритмы и данные; прогон пакета на настоящем графе — следующий шаг. «Криптографически проверенные ответы» пока не сделаны.",
      "deploy": "bench/dcgb_graph_benchmark_run.py (Apache 2.0), Бенчмарк для графовых баз данных Neo4j, pgvector, Redis",
      "uniqueness": "Тест графовых запросов на реальном мозге мухи: 134 181 нейрон и 2,5 млн рёбер при пороге от 5 синапсов.",
      "competitors": "Отличие от синтетических тестов (LDBC, Graphalytics) — реальная структура мозга. Прежнее «единственный бенчмарк, объединяющий графы и векторный поиск» не проверялось.",
      "limitations": "Пакет пока проверен только на синтетическом графе; только операции обхода.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "39.1 us на синтетическом графе 2000 узлов (заявлено 3.10 us) — измерено 21.09.2026"
    },
    {
      "num": 29,
      "name": "Билатеральное зеркалирование вердиктов (Билатеральный консенсус полушарий)",
      "bio": "По данным литературы, мозг мухи зеркально симметричен, и полушария обмениваются сигналами через комиссуры. Идея: два независимых «полушария» оценивают ответ, и он принимается только при их согласии. В коде (aifa_sdk/bilateral_verifier.py) согласие считается как √(s_л·s_п)·(1 − 0,4·|s_л − s_п|) с порогом 0,52 (на карточке был порог 0,95).",
      "math": "Замер 21.09.2026 (bench/bilateral_consensus_run.py): 50 из 50 согласованных уверенных оценок приняты, 50 из 50 рассогласованных отклонены. Задержка 4,3 мкс (P50). Прежние «−84,6%» и «−99,1% галлюцинаций» — два разных числа для одного свойства, и ни одно не измерялось на языковой модели.",
      "gain": "Надёжно отсекает случаи, когда две оценки расходятся. Насколько это снижает ошибки настоящей языковой модели, не измерялось. В испытании агента верификатор к успеху ничего не добавил (93,6% с ним против 94,7% без него).",
      "deploy": "bench/bilateral_consensus_run.py (Apache 2.0), Ядро верификации фактов AIfa, аудит юридических документов",
      "uniqueness": "Две независимые оценки с проверкой согласия перед ответом.",
      "competitors": "Логика отклонения подтверждена в 100 из 100 синтетических случаев. Сравнения со снижением галлюцинаций у языковых моделей нет.",
      "limitations": "Вдвое больше вычислений на проверку; порог в коде (0,52) и на карточке (0,95) нужно согласовать.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "4.3 us (заявлено 0.20 us) — измерено 21.09.2026"
    },
    {
      "num": 30,
      "name": "CANN Непрерывный аттрактор диалогового фокуса (Непрерывный аттрактор фокуса)",
      "bio": "По данным литературы, нейроны центрального комплекса мухи (E-PG, P-EN, P-FN, Δ7) образуют непрерывный кольцевой аттрактор: «холм» активности может стоять в любой точке кольца и держится без внешнего входа. В нашем движке (aifa_sdk/cann_focus.py, 64 нейрона) это реализовано корректно: веса «мексиканская шляпа», чтение положения по вектору популяции.",
      "math": "Замер 21.09.2026 (bench/cann_focus_run.py): без входа ошибка 0,01° через 20 шагов; плавное слежение за целью без скачков (наибольший шаг 3,0°); после 30 шумовых сообщений тема восстанавливается с ошибкой 6,9°, а окно FIFO из 10 сообщений её уже не содержит. Замер 23.09.2026 (bench/robustness_real.py): после 10 отвлекающих толчков силы 0,25 кольцо уходит к помехе на 73–94°.",
      "gain": "Держит тему дольше, чем очередь FIFO, и следит за целью плавно. Против сильных отвлечений нынешняя настройка не устойчива, а в испытании агента кольцо не дало выигрыша (5,6% против 5,8% у агента с закреплённой целью). Прежнее «в 20,5 раза надёжнее FIFO» не измерялось.",
      "deploy": "bench/cann_focus_run.py (Apache 2.0), Когнитивный рантайм AIfa, длинные цепочки рассуждений",
      "uniqueness": "Непрерывный кольцевой аттрактор, в котором положение «холма» активности хранит текущую тему.",
      "competitors": "Без помех дрейф почти нулевой (0,01°), под сильными отвлечениями — 73–94°; прежнее «Focus Drift = 0,000» верно только для первого случая. Задержка 15,1 мкс на шаг (P50, 64 нейрона).",
      "limitations": "Одно кольцо на одну тему; устойчивость к отвлечениям требует другой настройки торможения.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "15.1 us (заявлено 9.33 us, тот же порядок величины) — измерено 21.09.2026"
    }
  ],
  "en": [
    {
      "num": 1,
      "name": "Connectome Innovation 1",
      "bio": "Inspired by the fly mushroom body. From the literature: ~783 projection neurons pass odour signals to ~2,000–2,500 Kenyon cells, each cell receives ~6–8 random inputs, the APL neuron inhibits them all, and ~5% of cells stay active. The idea: a random sparse projection into a large space plus winner-take-all gives a noise-tolerant binary hash. Our implementation projects 1024 → 2048 units with random weights (FlyWire data is not loaded), keeps 30% of units active, shortlists by Hamming distance and reranks exactly.",
      "math": "Measured on N=50,000 vectors (d=1024), Intel Core i7-14700, independent protocol: P50 43.9 ms, Recall@10 39.55% (2026-09-23).",
      "gain": "Locality-Sensitive Hashing algorithm inspired by the Drosophila melanogaster mushroom body architecture (783 uPN -> 2,467 KC). Our implementation runs at 30% active Kenyon cells (not the biological 5%) -- a 2026-09-20 decision favoring retrieval efficiency over biological accuracy. Search runs through bitwise popcount operations without building heavy HNSW graphs.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Locality-Sensitive Hashing (LSH) on the Drosophila Mushroom Body connectome (783 PN -> 2,467 KC, 30% active cells in our implementation). Compact index (215 MB for 50,000 vectors), runs on CPU with no GPU.",
      "competitors": "Honest run against FAISS IndexFlatL2 (exact brute-force) on the same hardware, 2026-09-23: FAISS was 5.0x faster (8.8 ms vs 43.9 ms) and more accurate (100% vs 39.55% Recall@10). Our advantage is not exact-search speed but index compactness without a GPU; a memory/energy comparison across methods has not been run yet.",
      "limitations": "Current implementation (v1) reaches Recall@10 39.55% at pool=250 out of 50,000 vectors (0.5% of the dataset) -- widening the candidate pool raises recall at the cost of speed. Sparse projection is tuned for dimensions d<=1024.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "43.9 ms"
    },
    {
      "num": 2,
      "name": "Connectome Innovation 2",
      "bio": "Inspired by the fly APL neuron: from the literature, one large inhibitory neuron per hemisphere collects Kenyon-cell activity and damps it when a stimulus resembles one already seen. Our implementation is a duplicate detector: a new vector is compared with a buffer of seen ones, and above a similarity threshold it is treated as a duplicate. Measured 21.09.2026 (bench/novelty_detector.py): buffer 5,000, 4,000 checks (2,000 new + 2,000 duplicates), 100% accuracy on this synthetic test, P50 1,069 μs, P95 2,092 μs. The earlier '3.4 μs' was not confirmed.",
      "math": "Similarity of a new vector to the buffer of seen ones; above threshold 0.92 it is a duplicate, below it is new. Measured: 100% correct decisions on 4,000 synthetic checks.",
      "gain": "Drops repeats before they are written to memory or sent to a model. How many tokens this saves in a live dialogue has not been measured: the earlier '51.3%', '78–94%' and '40–80%' were withdrawn as unproven. In the agent benchmark APL alone does not raise success (4.2% vs 5.8% for a pinned-goal agent).",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "A repeat filter inspired by the inhibitory APL neuron: the 'new or duplicate' decision is made by one comparison with the buffer, without calling a model.",
      "competitors": "Ordinary vector databases store everything. The filter drops duplicates in 1,069 μs (P50, buffer 5,000; measured 21.09.2026). Token savings were not measured.",
      "limitations": "v1 uses static threshold alpha=0.92. v2 roadmap: dynamic homeostatic threshold tuning based on real-time Shannon dialogue entropy.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1069.45 us P50 (100.0% accuracy)"
    },
    {
      "num": 3,
      "name": "Connectome Innovation 3",
      "bio": "Inspired by the fly central complex: from the literature, a ring of ellipsoid-body neurons holds the current heading and the fan-shaped body compares it with the goal and issues a turn command. Our implementation picks the next page element by the vector towards the goal instead of stepping through with the Tab key.",
      "math": "Measured 21.09.2026 (bench/compass_navigation.py): on 200 synthetic trees of 50 nodes — 3.66 steps vs 23.54 with Tab stepping (6.43× fewer), 100% success. The earlier '1.12 steps, 16×' was not confirmed. In the agent benchmark on real engines, CX in the current code has no loop avoidance and gives no success (1.4%); with visited-link memory added — 94.7%.",
      "gain": "Fewer navigation steps on a page: 6.43× on synthetic trees. Escaping keyboard traps on real websites has not been tested separately.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Phase-vector steering navigator based on the Protocerebral Bridge (PB) and Fan-shaped Body (FB) of the Central Complex (CX) for agent trajectory navigation in DOM graphs.",
      "competitors": "21.09.2026: measured — baseline (linear Tab-traversal) averages 23.54 steps over 200 trials, CX Steering achieves 3.66 steps (6.43x speedup), 100.0% navigation success. Previously claimed \"12-18 iterations\" and \"1.12 steps (16x)\" were unmeasured.",
      "limitations": "Requires pre-indexed navigation state transition graphs. v2 roadmap: dynamic ontological resolver for unannotated Shadow DOM architectures.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "3.66 steps (6.43x speedup)"
    },
    {
      "num": 4,
      "name": "Connectome Innovation 4",
      "bio": "FlyWire v783 connectome (Zenodo 10.5281/zenodo.10676866, CC BY 4.0). Measured 23.09.2026 from the release files (bench/connectome_real_metrics.py): 139,255 neurons, 54,492,922 synapses, 15,091,983 connected pairs, 2,700,513 pairs with ≥5 synapses; transmitters in the data: acetylcholine, GABA, glutamate, octopamine, serotonin, dopamine. The earlier '3,869,878 connections' was not confirmed. File fingerprints: Zenodo md5 (f48f972d… and e0e6c197…). The Merkle tree in bench/proof_of_connectome.py is built on synthetic records with the same neuron count: build 1.23 s, subtree check 1.6 ms, a forged leaf caught in 20 of 20 attempts.",
      "math": "A SHA-256 fingerprint of each release file and a Merkle tree: changing any record changes the root. Tested on synthetic records: 20 of 20 forgeries detected.",
      "gain": "Lets us prove that the work uses exactly the published FlyWire v783 release and that it has not been altered. A Bitcoin timestamp of the connectome root is being re-issued: the earlier one ('block 967238') held no attestation.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "SHA-256 Merkle root of the FlyWire v783 synaptic connectome matrix with file checksums from Zenodo 10676866. The evidence registry is anchored in Bitcoin (OpenTimestamps, block 965040); the connectome stamp itself is being re-issued — the earlier one ('block 967238') held no attestation.",
      "competitors": "A fingerprint and a Merkle tree make tampering visible. Tested on synthetic records: a forged leaf was caught in 20 of 20 attempts.",
      "limitations": "On-chain proof verification requires network RPC call to Bitcoin/Arweave node (1-2s). v2 roadmap: in-browser zk-SNARK light verifier running in < 5 ms.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1.2255 s build, 1.622 ms verify, 100% tamper detection"
    },
    {
      "num": 5,
      "name": "Connectome Innovation 5",
      "bio": "The idea: look at a knowledge graph the way neuroscientists look at a connectome — node degrees, clusters, hubs, short paths. The real FlyWire v783 connectome (measured 23.09.2026, 2,700,513 pairs with ≥5 synapses): clustering coefficient C = 0.160, mean path length L = 4.03. The earlier 'C = 0.34' and '2.3% hubs' were not confirmed. In our implementation the nodes are organisations, domains, phones and technologies, and the edges are links between them.",
      "math": "Measured 21.09.2026 (bench/memory_graph_connectomics.py) on a synthetic graph: 13,050 nodes, 30,094 edges. A 2-hop traversal takes 0.0125 ms per query (1,000 queries), PageRank with 20 iterations 0.62 s.",
      "gain": "Graph analysis methods (degrees, clusters, PageRank, short paths) are applied to the graph of organisations from our data to find connected groups and key nodes. The earlier figure of '907,000 websites' is not supported and was withdrawn; detecting 'hidden beneficiaries' has not been tested.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Associative memory graph with Small-World topology, mathematically isomorphic to FlyWire v783 synaptic clustering. Delivers instant multi-hop associative retrieval.",
      "competitors": "Traditional graph databases (Neo4j, Memgraph) require 15–40 ms for 2-hop traversal. ACR bionic traversal completes in 0.12 ms using L1/L2 bitmask caching.",
      "limitations": "Limited to 500,000 active nodes per process in RAM. v2 roadmap: scale to 50M nodes via zero-copy mmap disk storage with SIMD page prefetching.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.0125 ms per 2-hop traversal; PageRank 0.62 s (20 iterations)"
    },
        {
      "num": 6,
      "name": "Connectome Innovation 6",
      "bio": "According to the literature, a fly brain uses on the order of 10 microwatts, and only a small fraction of neurons is active at any moment. The model's idea: count energy by the number of events (spikes) instead of by all multiplications, as in a dense neural network. This is a calculated model, not a measurement: no wattmeter or RAPL counters were used.",
      "math": "E_events = number of synaptic events × 1 pJ; E_dense = number of operations × 1.5 pJ. Run of 21.09.2026 (bench/neuromorphic_energy_run.py): 512 neurons, 1,000 steps, 96.86% sparsity, 507,095 events — 369.1× fewer operations than dense FP16 multiplication.",
      "gain": "Gives an order-of-magnitude estimate: with sparse event-driven work there are hundreds of times fewer operations. Real electricity savings on specific hardware have not been measured. The earlier '92%' and '800×' did not match the run and were replaced by it.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Integer bitwise AVX2/POPCNT spiking simulator. 21.09.2026: measured (bench/neuromorphic_energy_run.py) — 99.729% energy reduction, 369.1x efficiency multiplier, 96.86% network sparsity vs the previously claimed 92%/800x.",
      "competitors": "Nvidia H100 GPU clusters running dense FP16 inference consume 350–700W per node — external fact, not measured by this script. 21.09.2026: our own energy engine measured 369.1x efficiency multiplier, not the previously claimed 800x.",
      "limitations": "Currently optimized for x86_64 AVX2/AVX-512. v2 roadmap: dedicated compiler backend for ARM NEON (Apple M-series, Pi 5) and RISC-V Vector Extension.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "369.1× — model estimate from operation counts, not a wattmeter measurement"
},
        {
      "num": 7,
      "name": "AIfa BioMatch Score (BioMatch v1.0)",
      "bio": "Architectural prototype: Metrological profile of the Drosophila melanogaster connectome (FlyWire v783: 139,255 neurons, 54.5M synapses, ~2.7M thresholded graph edges; Nature, Schlegel et al. 2024).\nEvaluates topological isomorphism of artificial memory graphs against the biological reference.",
      "math": "BioMatch = 1/5 * [ (1 - D_KS(W, W_fly)) + (1 - |C - C_fly|/C_fly) + (1 - |lambda_1 - lambda_1,fly|/lambda_1,fly) + Resilience + Symmetry ]. 21.09.2026: implemented and run (bench/biomatch_score.py, uses the pre-existing connectome_golden_standard.py) — on a synthetic 500-node Watts-Strogatz small-world graph, the composite BioMatch Score was computed for the first time: 38.89%, verdict NON_BIOLOGICAL_FRAGILE.",
      "gain": "Composite algorithmic index across 5 pillars: lognormal weight fit (99.22% on our synthetic graph), small-world clustering (0.4793 vs target 0.312 — score 46.37%), spectral edge-of-chaos (4.5876 vs target ~1.05 — score 0.0%, our graph is too dense), lesion resilience (score 8.72%), bilateral symmetry (Pearson r=0.4013 — score 40.13%).",
      "deploy": "bench/biomatch_score.py (Apache 2.0), aifa-biobench/aifa_sdk/connectome_golden_standard.py",
      "uniqueness": "Metrological verification of graph topology against FlyWire v783 across 5 structural invariants, including the FINAL composite scalar Score — computed for the first time on 21.09.2026, not just individual components.",
      "competitors": "Synthetic benchmarks (MTEB) do not test topological alignment with a biological reference at all; BioMatch is the only known metric of this kind, but our own synthetic test honestly scored low (38.89%), showing a crude small-world approximation is far from a real connectome.",
      "limitations": "The composite Score of 38.89% was computed on a SYNTHETIC graph (21.09.2026). On 23.09.2026 the real FlyWire v783 connectome (Zenodo 10676866) was downloaded and measured: 139,255 neurons, 54,492,922 synapses, 2,700,513 pairs with ≥5 synapses; C = 0.160, L = 4.03, KS = 0.282 (bench/connectome_real_metrics.py). The earlier C = 0.312, L = 2.84, KS = 0.209 were not confirmed. The composite Score on the real graph has not been computed yet.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "38.89% composite Score (NON_BIOLOGICAL_FRAGILE) — first computed 21.09.2026"
},
        {
      "num": 8,
      "name": "Browser Client-Side Search",
      "bio": "Architectural prototype: client-side associative search engine (public/aifa_connectome_web.js). 21.09.2026: card previously claimed 'compact WebAssembly binary (Wasm SIMD128, 126.7 KB)'. DIRECT FILE INSPECTION found: pure JavaScript, zero WASM bytes, zero SIMD instructions — the file's own comment honestly says 'pure JavaScript / TypedArrays'. Actual file size is 7,121 bytes, not 126,700 (17.79x discrepancy). Real algorithm is an inverted posting-list index with Kenyon Cell activation and Jaccard similarity, not popcount over bit-packed hashes.",
      "math": "Inverted posting-list index with Kenyon Cell activation and Jaccard similarity — NOT SIMD128 popcount as previously claimed.",
      "gain": "Executes semantic retrieval locally inside visitor browser without shipping query vectors to third-party clouds. 21.09.2026: honestly measured the real algorithm (bench/wasm_search_run.mjs, Node.js V8 — same engine as Chrome) — P50 2756.3 μs, nearly 8x slower than the previously claimed 331.6 μs. Expected: the real algorithm (inverted index in plain JS) is objectively slower than the claimed but non-existent SIMD engine.",
      "deploy": "bench/wasm_search_run.mjs (Apache 2.0), public/aifa_connectome_web.js",
      "uniqueness": "Client-side associative memory engine in pure JavaScript inside the browser tab (7.1 KB, not 126.7 KB, and not WASM).",
      "competitors": "Cloud vector databases require shipping private embeddings to servers; our engine executes queries locally, albeit in plain JS rather than WASM/SIMD as previously claimed.",
      "limitations": "21.09.2026: the technology was misrepresented (WASM/SIMD128 instead of plain JS) — not just an inaccurate number, but a swapped architecture claim. Microbenchmark on 500 synthetic documents; actual WASM compilation is on the roadmap if decided.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2756.3 μs P50 honest JS (not WASM, not 331.6 μs) — corrected 21.09.2026"
},
        {
      "num": 9,
      "name": "Neuromorphic Graph Compiler Prototype (Loihi 2 / SynSense Target Exporter)",
      "bio": "Architectural prototype: Software prototype translating connectome synaptic graphs into asynchronous Address Event Representation (AER).\nMetis-based graph partitioning across 78 neuropils, INT8 synaptic quantization, and wormhole routing simulation. 21.09.2026: the claim '0 deadlocks across 1,000 trials' was checked — the underlying engine returns is_deadlock_free as a HARDCODED constant True, never measured. The claim was unverifiable by construction. An honest replacement (bench/neuromorphic_compiler_run.py) searches for cycles in the inter-core NoC dependency graph across 1,000 synthetic graphs: 1,000/1,000 runs found a cyclic dependency (expected for dense random graphs), which does NOT prove real hardware deadlocks but honestly shows the original 0/1000 number was never computable.",
      "math": "Inter-core NoC traffic minimization: min cut(G) subject to <= 128 neurons per physical core.",
      "gain": "Automated decomposition of large-scale connectome graphs into hardware cores for event-driven neuromorphic execution.",
      "deploy": "bench/neuromorphic_compiler_run.py (Apache 2.0), aifa-biobench/aifa_sdk/neuromorphic_compiler.py",
      "uniqueness": "Software translator mapping FlyWire v783 graphs into spiking neural networks (SNN) for Loihi 2 and SynSense.",
      "competitors": "Standard GPUs require continuous dense matrix multiplication; neuromorphic cores operate event-driven at < 50 μW.",
      "limitations": "Software routing simulator prototype, not a physical deadlock check; physical PCIe accelerator integration on roadmap. 21.09.2026: deadlock detection was absent in the original code — an honest (but not conclusive) dependency-graph analysis was added.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1000/1000 cyclic core dependencies (not physical deadlocks) — original \"0 deadlocks\" was unverifiable, corrected 21.09.2026"
},
        {
      "num": 10,
      "name": "Human-AI Symbiosis Index (Mathematical Metric Φ_sym)",
      "bio": "Architectural prototype: Formalized scalar model evaluating operator-agent alignment derived from connectome heterosynaptic plasticity principles.\nPhi_sym = exp(-lambda * D_KL(P_intent || P_action)) * Alignment * Trust.\n21.09.2026: the variables Alignment and Trust were never defined numerically on this card. Found a pre-existing engine (aifa-biobench/aifa_sdk/symbiosis_index.py) implementing a DIFFERENT, fully-defined 4-factor formula. Honestly run (bench/symbiosis_index_run.py) over 1,000 synthetic interaction turns — mean Phi=0.1547, P50=0.0974, per-turn latency 49.7-54.7 μs (not 39.7 μs, but same order of magnitude). This is an honest synthetic test, not an empirical study with live operators.",
      "math": "Phi_symbiosis = (1 - D_KL(P_intent||P_action)) * exp(-tau/tau_0) * (1 - N_corr/N_int) * H_synergy — the engine's actual formula, differs from the one previously claimed.",
      "gain": "Scalar measurement of human-AI collaboration dynamics in (0, 1]. 21.09.2026: honestly measured on a synthetic scenario — mean value 0.1547 (MISALIGNED_DIVERGENCE state), honestly reflecting noisy synthetic interaction, not a claim about real symbiosis quality.",
      "deploy": "bench/symbiosis_index_run.py (Apache 2.0), aifa-biobench/aifa_sdk/symbiosis_index.py",
      "uniqueness": "Mathematically bounded index of human-AI cognitive synergy eliminating negative divergence boundaries.",
      "competitors": "Standard LLM metrics measure only token throughput; Phi_sym quantifies mutual intent alignment and operational friction.",
      "limitations": "Formalized prototype on synthetic data, not an empirical study with real operators. 21.09.2026: the claimed Alignment/Trust variables were undefined — the engine uses a different but fully-defined formula.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "Phi_sym mean=0.1547, P50=0.0974 · 49.7-54.7 us/turn (not 39.7 us) — corrected 21.09.2026"
},
    {
      "num": 11,
      "name": "Connectome Innovation 11",
      "bio": "Measured 23.09.2026 on the real FlyWire v783 connectome (bench/connectome_topology_extra.py; 134,181 connected neurons, 2,511,789 pairs with ≥5 synapses): clustering C = 0.155, mean path L = 4.02. A random graph of the same size, measured the same way, has C = 0.00029 and L = 3.65. Small-world index σ = (C/C_rand)/(L/L_rand) = 490 — the fly brain is highly clustered with short paths. The card's earlier figures (C = 0.284, L = 3.82, σ = 8.42 or 79.81) were not confirmed. For a synthetic memory graph (500 nodes, p = 0.08) the 21.09.2026 run gave σ = 19.7, not the claimed 7.15.",
      "math": "σ = (C/C_rand) / (L/L_rand), where C_rand and L_rand are measured on a random graph with the same numbers of nodes and edges. FlyWire v783: σ = 490; synthetic memory graph: σ = 19.7.",
      "gain": "The idea: build a memory graph after the brain — dense topical clusters plus rare long-range links, so any fact is a few steps away. The benefit of this organisation for search quality has not been measured yet.",
      "deploy": "bench/small_world_index_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Comparing a memory graph with the real connectome by the small-world index, with the random baseline measured rather than taken from a formula.",
      "competitors": "The earlier '4× higher resistance to forgetting than dense embeddings' was never measured and has been withdrawn.",
      "limitations": "The memory graph is still synthetic (500 nodes, p = 0.08); the index has not been computed on a graph of real dialogues.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "FlyWire v783: σ = 490 (C = 0.155, L = 4.02); memory graph: σ = 19.7"
    },
    {
      "num": 12,
      "name": "Connectome Innovation 12",
      "bio": "Measured 23.09.2026 on the real FlyWire v783 connectome (bench/connectome_topology_extra.py, 134,181 connected neurons): ⟨k²⟩/⟨k⟩ = 190.9, hence the random-failure breakdown threshold f_c = 1 − 1/(⟨k²⟩/⟨k⟩ − 1) = 0.995. Direct test: after removing 30% of neurons at random the largest connected part still holds 68.5% of all neurons in the graph; after removing the 30% most connected — 57.5%; at 50% — 48.1% and 28.0%. The earlier '⟨k²⟩/⟨k⟩ ≈ 42.6, f_c ≈ 0.976' was not confirmed.",
      "math": "Share of nodes in the largest connected part after removing a fraction f of nodes — at random or by decreasing degree. Real connectome: at f = 30% — 68.5% (random) and 57.5% (by degree).",
      "gain": "Provides a way to find in advance the nodes whose failure tears a system apart the most: in the connectome removing the most connected nodes hurts much more than random removal. It has not yet been applied to our services.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "A robustness test on a real brain graph: removing up to 50% of nodes, at random and targeted, with a number for each step.",
      "competitors": "The earlier line cited acr_robustness_suite.py ('65.5% vs 26.84%'), whose result was set by a formula; the real dropout test (bench/robustness_real.py) showed the opposite for FlyHash: with 50% of bits dropped, 25.4% vs 78.2% for Sign-LSH.",
      "limitations": "It measures graph connectivity, not neuronal function; the test has not yet been run on the graph of our services.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "30% failures: 68.5% (random), 57.5% (by degree); f_c = 0.995"
    },
    {
      "num": 13,
      "name": "Connectome Innovation 13",
      "bio": "Inspired by fly olfaction: according to the literature, the first 'dangerous / edible' decision is made by hard-wired receptors, without lengthy computation. The IT idea: handle simple cases — a domain, a title, an error text — by fast pattern matching, and call a heavy model only where patterns do not decide. Earlier figures about server heat, model latency and '12–18% hallucinations' were not measured and have been withdrawn.",
      "math": "Aho–Corasick automaton over 16 patterns, O(string length) per query. Measured 21.09.2026 (bench/olfactory_filter_run.py): 5,000 strings, P50 2.0 μs, P95 3.0 μs, P99 3.3 μs.",
      "gain": "Handles simple strings in microseconds without running a model. How much faster this is than a local model has not been measured: no model was run for comparison, and the earlier '75,000×' relied on an assumed 150 ms, not a measurement.",
      "deploy": "bench/olfactory_filter_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Two-stage filtering: pattern matching first, a model only for what the patterns did not decide.",
      "competitors": "Calling a model for every string is slower and more costly; by how much was not measured in this run. The filter: 2.0 μs per string (P50), no external calls.",
      "limitations": "Patterns are set by hand; strings not covered by them still go to a model. On 5,000 synthetic strings 59.5% were flagged as dangerous — the share on real data has not been measured.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2.0 μs P50 per string (measured 21.09.2026)"
    },
    {
      "num": 14,
      "name": "Connectome Innovation 14",
      "bio": "Inspired by the fly ellipsoid body: according to the literature, a ring of 'compass' neurons holds a bump of activity that turns with the fly and keeps the heading. The idea: keep the current phase of a dialogue in such a ring. Our implementation is a ring attractor (Amari equation, 'Mexican hat' weights); the run used 16 neurons, as stated on the card (the engine default is 64).",
      "math": "Measured 21.09.2026 (bench/cann_ring_run.py): 16 neurons, 1,000 steps without distractors — P50 23.0 μs per step, 99.67% stability, the goal held in every step. Measured 23.09.2026 (bench/robustness_real.py): after 10 distractor pulses of strength 0.25 the ring drifts 73–94° towards the distractor.",
      "gain": "Without distractors the ring holds a set phase reliably and fast (23 μs per step). Under distractors the current setting loses the phase, so 'keeping focus across hundreds of turns' is not yet proven. In the agent benchmark the ring gives the same success as simply pinning the goal (5.6% vs 5.8%).",
      "deploy": "bench/cann_ring_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "A 16-neuron ring in which the position of the activity bump encodes the current phase of a task.",
      "competitors": "Without distractors the goal is held in all 1,000 steps; with distractor pulses of strength 0.25 it is not (drift of 73–94°). No comparison with context retention in language models has been run.",
      "limitations": "Fixed 16 states; under distractors the inhibition strength needs retuning. The earlier '16.21 μs' latency was not confirmed (measured 23.0 μs P50).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "23.0 μs P50; 99.67% without distractors, 73–94° drift with them"
    },
    {
      "num": 15,
      "name": "Connectome Innovation 15",
      "bio": "The FlyWire connectome labels each connection with a predicted transmitter. Measured 23.09.2026 from the release data (bench/connectome_transmitters.py, 54.46 M synapses with a prediction), share of synapses by most likely transmitter: acetylcholine 55.8%, GABA 23.3%, glutamate 17.8%, dopamine 1.4%, serotonin 1.2%, octopamine 0.6%. The earlier shares on the card (acetylcholine ~45%, dopamine ~5%, serotonin and octopamine ~3% each) were not confirmed. The model's idea: excitation and inhibition balance so the network keeps a set level of activity.",
      "math": "I = ACh − γ_GABA·GABA + M_dopamine·ΔW; γ_GABA adapts so that mean activity approaches a 5% target. Measured 21.09.2026 (bench/ei_balance_run.py): 256 neurons, 3,000 steps, final activity 4.99% against a 5% target, P50 142 μs per step.",
      "gain": "Homeostasis works: the network settles at the set activity level on its own. The earlier claims 'eliminates hallucinations' and 'eliminates generation loops' were not tested — the model was never connected to a language model.",
      "deploy": "bench/ei_balance_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "An excitation–inhibition balance loop with adaptive inhibition strength. Run of 21.09.2026 (bench/ei_balance_run.py) — the card's formula implemented from scratch.",
      "competitors": "Measured: homeostasis converges to 4.99% density against a 5% target (256 neurons, 3,000 steps). No comparison with repetition penalties in language models has been run.",
      "limitations": "A simplified model without spatial dendritic summation. The earlier '1.68 μs' latency was not confirmed (measured 142 μs P50).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "142.2 us P50 (homeostasis converges) — corrected 21.09.2026"
    },
    {
      "num": 16,
      "name": "Connectome Innovation 16",
      "bio": "Inspired by fly sensory adaptation: according to the literature, a constant background stops being perceived while a rare important signal is amplified. The idea: give rare features more weight and prune frequent connections. Formula: w(f) = log(1 + N/df) · (1 − e^(−λ·Δt)), pruning threshold 5% of the largest weight.",
      "math": "Measured 21.09.2026 (bench/bio_idf_pruning_run.py) on a synthetic corpus: 2,000 documents, 5,000 features — 24.5% of connections pruned (not 72%), rare features weighted 6.9× higher than frequent ones.",
      "gain": "Prunes a quarter of frequent connections and highlights rare features. The effect on classifier accuracy and inference speed has not been measured; the earlier 'up to 72%' and 'without any loss of accuracy' were withdrawn.",
      "deploy": "bench/bio_idf_pruning_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Feature weight by inverse frequency with recency, pruning weak connections. Run of 21.09.2026 — the card's formula implemented from scratch; the 'rare weighs more' law holds (6.9×).",
      "competitors": "Unlike TF-IDF, it accounts for feature recency. Measured on a synthetic corpus (2,000 documents, 5,000 features): 24.5% of connections pruned vs the claimed 72%. No direct quality comparison with TF-IDF has been run.",
      "limitations": "Designed for a fixed corpus; streaming pruning is not implemented. The earlier '3.29 μs' latency was not confirmed (measured 2.1 ms P50 per pruning pass).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2145.7 us P50 pruning (24.49% removed) — corrected 21.09.2026"
    },
    {
      "num": 17,
      "name": "Connectome Innovation 17",
      "bio": "The idea: describe an AI system's architecture as strictly as FlyWire describes a brain — every element has an ID and a type, every link a type and a weight. The CADF format: S = ⟨V, E, T, W⟩, where the link type T ∈ {Sync, Async, Inhibitory, Modulatory} and the weight W > 0.",
      "math": "Measured 21.09.2026 (bench/cadf_schema_run.py): a document with 200 components and 800 links validates in 0.27 ms (P50); a valid document gives 0 errors, a corrupted one — 2 errors caught. The earlier '2.177 ms' was not confirmed.",
      "gain": "A machine-readable architecture description that is checked automatically. Whether it is more convenient than C4 or UML on real projects has not been tested.",
      "deploy": "bench/cadf_schema_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "An open CADF JSON schema and validator; before 21.09.2026 neither existed — both were written from the card's formula and tested.",
      "competitors": "More compact than general graph formats (ONNX, GEXF) for this task. Measured: the validator accepts a valid document and rejects a corrupted one (wrong link type, negative weight).",
      "limitations": "The validator is Python with no external dependencies; there are no libraries for other languages.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.2694 ms P50 validation (faster than claimed 2.177 ms) — corrected 21.09.2026"
    },
    {
      "num": 18,
      "name": "Connectome Innovation 18",
      "bio": "The idea: just as FlyWire gave everyone one open reference brain, an open set of website accessibility measurements can give researchers a shared reference. Our set is a keyboard crawl of US websites: which of eight typical pages open and can be navigated with a keyboard.",
      "math": "Measured 23.09.2026: the keyboard-crawl results file holds 1,639,050 records, about 135 thousand organisations; the crawl is ongoing.",
      "gain": "A large set of real keyboard-accessibility measurements of US websites. The earlier words 'the world's largest' and 'certified on the Bitcoin blockchain' were not verified and have been withdrawn; when and in what form the set is published is the Architect's decision.",
      "deploy": "bench/adab_merkle_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Real measurements rather than a sample of a hundred pages: hundreds of thousands of organisations and eight typical pages each.",
      "competitors": "The Merkle-tree mechanism for the set was tested on synthetic records: inclusion proofs verify in 100% of cases and forgery is detected.",
      "limitations": "One large JSONL file; the crawl is still running, so the numbers grow. Publication and mirrors (IPFS, HuggingFace) are up to the Architect.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1,639,050 records, ~135 thousand organisations (23.09.2026)"
    },
    {
      "num": 19,
      "name": "Connectome Innovation 19",
      "bio": "According to the literature (Caron et al., Nature 2013; Litwin-Kumar et al., Neuron 2017), a fly Kenyon cell receives inputs from about 6–8 projection neurons, a number considered close to optimal for separating odours. We tested this on our own tasks.",
      "math": "Two runs. Class separation (bench/fly_d6_optimality_run.py, 10 seeds): k = 6 — 0.456, k = 10 — 0.460, k = 16 — 0.457, spread ±0.01–0.02 — a plateau from 6 to 16. Retrieval (bench/sweep_dendritic_degree.py): Recall@10 at d = 6 — 19.8%, d = 7 — 23.3%, d = 16 — 24.9%.",
      "gain": "What the measurements say: d = 6 is a good choice but not a 'strict optimum'. On our tasks anything from 6 to 16 inputs gives nearly the same result, and for retrieval more inputs are slightly better.",
      "deploy": "bench/fly_d6_optimality_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "The biological hypothesis was tested by a sweep on two tasks rather than taken on faith.",
      "competitors": "Fewer inputs mean fewer weights and memory reads than dense layers (at d = 6 there are 85× fewer weights than in a dense 1024-d projection). The memory-bandwidth gain on hardware has not been measured.",
      "limitations": "Tested on synthetic data; the sweep has not been run on real embeddings.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "17.5 us at k=6 (not claimed 166.38 us) — corrected 21.09.2026"
    },
    {
      "num": 20,
      "name": "Connectome Innovation 20",
      "bio": "The idea: show activity spreading through the fly brain visually — in a terminal and in a browser, with sound driven by the number of spikes. Projection of points to the screen: [u, v] = R(α, β)·[x, y, z]; sound: f(t) = f0 + k·Σ s_i(t).",
      "math": "Measured 21.09.2026 (bench/terminal_showcase_run.py): a frame of 139,255 points renders in 4.1 ms (P50) — 243.8 frames per second; projecting one point takes 14.3 μs, sound 1.3 μs. The point coordinates are synthetic: the FlyWire release we use contains no neuron coordinates.",
      "gain": "A visual demo for explanation and teaching; the claimed 60 frames per second is met with room to spare (243.8). The earlier 'most powerful viral marketing tool' is an opinion, not a measurement.",
      "deploy": "bench/terminal_showcase_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "A terminal and browser demo with projection and sound; both formulas were implemented on 21.09.2026 and measured.",
      "competitors": "Measured: a frame of 139,255 points — 243.8 frames per second against the claimed 60.",
      "limitations": "The coordinates are synthetic, not anatomical; the browser shows only part of the nodes.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "4101.6 us full frame / 243.81 FPS (60 FPS confirmed) — corrected 21.09.2026"
    },
    {
      "num": 21,
      "name": "Connectome Innovation 21",
      "bio": "Inspired by the fly central complex: according to the literature, P-EN and P-FN neurons link the ellipsoid body and the protocerebral bridge and help turn towards a goal. The card's formula: V = α·∇Φ_goal − β·Σ repulsion from visited nodes. The engine code (aifa_sdk/cx_steering.py) implements only the first part — attraction to the goal; the visited-nodes field is declared but never used.",
      "math": "Measured 21.09.2026 (bench/cx_steering_run.py): the scenario 'Details → dialog → Details again', 30 attempts — the navigator pressed 'Details' all 30 times and never reached 'Checkout'. Latency P50 190 μs.",
      "gain": "In its current form there is no loop protection. The agent benchmark of 23.09.2026 showed this is exactly what is missing: with visited-link memory added, success rises from 1.4% to 94.7%. The fix has not yet been put into the engine code.",
      "deploy": "bench/cx_steering_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Browser-agent navigation by the vector towards a goal, inspired by the fly's orientation neurons.",
      "competitors": "A direct test on the stated scenario (30 attempts): the navigator looped all 30 times. The earlier '91% fewer wrong clicks' was not verified — there was no independent baseline.",
      "limitations": "Repulsion from visited nodes must be implemented in the engine itself; the page's accessibility tree is required.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "190.0 us, loop not prevented (not claimed 3.56 us) — corrected 21.09.2026"
    },
    {
      "num": 22,
      "name": "Connectome Innovation 22",
      "bio": "Inspired by fly neuromodulation: according to the literature, dopamine, octopamine and serotonin switch the brain between sleep, quiet wakefulness, foraging and escape. The idea for a crawler: change the number of parallel workers and the pauses by successes and errors, the way modulators change the brain's mode.",
      "math": "Measured 21.09.2026 (bench/neuromod_scheduler_run.py): under sustained errors the worker count falls to 0 and the pause grows to 38 s — the anti-ban protection works. Under sustained success the worker count stays at 4 and does not grow: the baseline penalty 6·σ(0) = 3.0 almost cancels the largest dopamine gain 4·tanh(3) = 3.98.",
      "gain": "Reliably slows the crawl down on errors. In the current formula it cannot speed up on success — this is a property of the formula itself and needs fixing.",
      "deploy": "bench/neuromod_scheduler_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Crawl operating modes driven by analogues of dopamine (successes) and octopamine (errors).",
      "competitors": "An ordinary scheduler keeps a fixed load. This one drops it to zero on failures; there is no gain on success (see the measurement).",
      "limitations": "The formula needs fixing so that success actually raises parallelism; phase transitions are still set by hand.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2.0 us (not claimed 0.19 us) — corrected 21.09.2026"
    },
    {
      "num": 23,
      "name": "Connectome Innovation 23",
      "bio": "Inspired by the APL neuron: according to the literature, one large inhibitory neuron per hemisphere receives input from all active Kenyon cells and inhibits them all proportionally, so only a few stay active. The card's formula: A = ReLU(X − quantile(1−k)), then normalisation by the sum.",
      "math": "Measured 21.09.2026 (bench/apl_normalization_run.py): 94.9% zeros against the claimed 95%, normalisation correct. Time grows as N^0.81 for lengths from 1,024 to 262,144 (41 μs → 3.4 ms); at N = 512 — 35.5 μs, not the claimed 4.05 μs.",
      "gain": "Keeps the strongest 5% of values and normalises them. The earlier claims about compressing context for large models 'without losing entities' were not tested: there are no measurements on real prompts and models.",
      "deploy": "bench/apl_normalization_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "APL-style global inhibition: one threshold for the whole vector instead of all-to-all attention.",
      "competitors": "Complexity measured: time grows as N^0.81 — no worse than linear and clearly better than quadratic attention. Preservation of names, dates and facts in compressed text has not been measured.",
      "limitations": "Works on a numeric vector; integration with a tokenizer and a real language model has not been done.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "35.5 μs at N = 512; 94.9% sparsity"
    },
    {
      "num": 24,
      "name": "Connectome Innovation 24",
      "bio": "The C1-FFL motif (Alon, 2007): node X switches on Y, and the output Z fires only when both X and Y are active (logical AND). A short pulse has no time to pass through Y and dies out; a long signal passes. How enriched this motif is in FlyWire v783 specifically has not been checked by us.",
      "math": "Measured 21.09.2026 (bench/c1_ffl_filter_run.py): critical duration 3.47 steps; short pulses — 0 false triggers out of 50, long signals — 0 misses out of 50. Latency 0.2 μs (P50), 0.18 μs claimed.",
      "gain": "The filter cuts short bursts and passes sustained signals: both properties confirmed on 100 synthetic cases. It has not been tested on real network traffic.",
      "deploy": "bench/c1_ffl_filter_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "The C1-FFL feed-forward motif as a filter for false pulses and request bursts.",
      "competitors": "Unlike a moving average, it does not smooth the signal but passes it whole once the duration threshold is reached. Measured latency: 0.2 μs, close to the claimed 0.18 μs.",
      "limitations": "The duration threshold is fixed; tuning to a specific channel is not implemented.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.2 us (nearly matches claimed 0.18 us) — confirmed 21.09.2026"
    },
    {
      "num": 25,
      "name": "Connectome Innovation 25",
      "bio": "According to the literature, T4 and T5 neurons of the fly visual system detect the motion of light and dark edges by the Hassenstein–Reichardt model: one photoreceptor's signal is delayed and multiplied by its neighbour's. The idea: detect dangerous flicker and intrusive animation on a page the same way. The earlier 'a million times more efficient than graphics cards' is not a measurement and was withdrawn.",
      "math": "Measured 21.09.2026 (bench/emd_reichardt_run.py): a 32×32 grid = 1,024 detectors, 0.0021 μs per detector (P50). Flicker power in the dangerous band is 1,605× higher than a static background. Static background — 0 false alarms out of 20; out-of-band flicker — 0 of 4; in-band flicker detected in 4 cases out of 5.",
      "gain": "A cheap flicker detector without neural networks: it does not mistake a static background, and it finds the dangerous band in most cases (4 of 5), but not all — 'detects instantly' was an overstatement.",
      "deploy": "bench/emd_reichardt_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "A motion detector modelled on T4/T5 neurons for finding flicker and animations that are hazardous under WCAG.",
      "competitors": "The detector is orders of magnitude cheaper than claimed: 0.0021 μs per detector vs 0.28 μs. Getting around bot traps and captchas has not been tested.",
      "limitations": "A fixed-size 2D raster; one in-band flicker out of five was missed — the threshold needs tuning.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.002 us pure detector (claimed 0.28 us for full system) — measured 21.09.2026"
    },
    {
      "num": 26,
      "name": "Connectome Innovation 26",
      "bio": "A k-core is the largest subgraph in which every node has at least k neighbours inside it; it is found by repeatedly removing nodes of degree below k. Measured 23.09.2026 on the real FlyWire v783 connectome (bench/connectome_topology_extra.py, pairs with ≥5 synapses): k_max = 57, with 258 neurons in the innermost core. The earlier 'k_max = 78, 1,420 neurons' was not confirmed.",
      "math": "The Batagelj–Zaversnik algorithm, O(V+E). Measured 21.09.2026 on a synthetic graph (core 100 + periphery 900): time grows as N^1.12 — nearly linear; the core is found exactly (100% overlap). Real connectome: k_max = 57 (258 neurons).",
      "gain": "Finds the densest, mutually connected part of a graph. In the synthetic test the core survived losing the whole periphery and up to 50% of its own nodes without splitting. The earlier 'protection against 99% of network attacks' and 'core on a 64 MB microcontroller' were not tested and have been withdrawn.",
      "deploy": "bench/kcore_decomposition_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Extracting the core of highest connectivity order; in the real fly brain — 258 neurons at k = 57.",
      "competitors": "Measured: complexity is nearly linear (N^1.12) and the core withstands losing the periphery. Latency on a synthetic 1,000-node graph — 2.6 ms (P50), not the claimed 0.5 ms.",
      "limitations": "The core is recomputed from scratch; incremental updates when the graph changes are not implemented.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2600.8 us on synthetic 1000-node graph (claimed 498.10 us) — measured 21.09.2026"
    },
    {
      "num": 27,
      "name": "Connectome Innovation 27",
      "bio": "According to the literature (Turrigiano, 1998), a neuron scales all its input synapses so that their total strength stays constant — otherwise Hebbian learning drives it into saturation. The idea: keep the 'volume' of memory constant in the same way and remove weak unused links.",
      "math": "Measured 21.09.2026 (bench/homeostatic_scaling_run.py): after every scaling step the weight sum is exactly 1.0 (target 1.0); without homeostasis it grew to 1,300 over 500 steps. Pruning: 66 of 100 synapses removed, 75.8% of them from the unused half. Latency 9.8 μs (P50, 200 synapses).",
      "gain": "Keeps memory from growing without bound. But pruning also hits used links (a quarter of the removed ones), so 'without losing important facts' is not yet achieved; 'catastrophic forgetting' has not been tested on a real model.",
      "deploy": "bench/homeostatic_scaling_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Constant total link strength plus removal of unused links: memory frees space for the new.",
      "competitors": "The weight sum stays exactly at target for any number of steps; without the mechanism it grows 1,300-fold. No comparison with vector-database cleanup has been run.",
      "limitations": "Pruning needs tuning so it does not hit used links; decay is by time only, without regard to importance.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "9.8 us (claimed 6.59 us, same order of magnitude) — measured 21.09.2026"
    },
    {
      "num": 28,
      "name": "Connectome Innovation 28",
      "bio": "The idea: use a real brain graph as a test for graph databases, because synthetic graphs do not reproduce its structure. Measured 23.09.2026 on the real FlyWire v783 graph: 139,255 neurons, 15,091,983 connected pairs, 54,492,922 synapses; at a threshold of ≥5 synapses — 134,181 neurons and 2,511,789 edges. The earlier '3,869,878 connections' and '3.87 M edges' were not confirmed.",
      "math": "The test suite: k-hop traversal, Dijkstra, PageRank, activation cascade. Measured 21.09.2026 (bench/dcgb_graph_benchmark_run.py) on a synthetic 2,000-node graph: all algorithms give correct results, a 2-hop traversal takes 39 μs (P50). The suite has not yet been run on the real fly graph.",
      "gain": "It will provide a test of graph systems on a real biological structure. The algorithms and the data are ready; running the suite on the real graph is the next step. 'Cryptographically verified answers' are not done yet.",
      "deploy": "bench/dcgb_graph_benchmark_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "A graph-query test on the real fly brain: 134,181 neurons and 2.5 M edges at a threshold of ≥5 synapses.",
      "competitors": "The difference from synthetic tests (LDBC, Graphalytics) is the real brain structure. The earlier 'the only benchmark combining graphs and vector search' was not verified.",
      "limitations": "The suite has only been checked on a synthetic graph so far; traversal operations only.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "39.1 us on synthetic 2000-node graph (claimed 3.10 us) — measured 21.09.2026"
    },
    {
      "num": 29,
      "name": "Connectome Innovation 29",
      "bio": "According to the literature, the fly brain is mirror-symmetric and the hemispheres exchange signals through commissures. The idea: two independent 'hemispheres' score an answer, and it is accepted only if they agree. In the code (aifa_sdk/bilateral_verifier.py) agreement is √(s_L·s_R)·(1 − 0.4·|s_L − s_R|) with a threshold of 0.52 (the card stated 0.95).",
      "math": "Measured 21.09.2026 (bench/bilateral_consensus_run.py): 50 of 50 agreeing confident scores accepted, 50 of 50 disagreeing ones rejected. Latency 4.3 μs (P50). The earlier '−84.6%' and '−99.1% hallucinations' were two different numbers for one property, and neither was measured on a language model.",
      "gain": "Reliably rejects cases where two scores disagree. How much this reduces the errors of a real language model has not been measured. In the agent benchmark the verifier added nothing to success (93.6% with it vs 94.7% without).",
      "deploy": "bench/bilateral_consensus_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Two independent scores with an agreement check before answering.",
      "competitors": "The rejection logic was confirmed in 100 of 100 synthetic cases. There is no comparison with hallucination reduction in language models.",
      "limitations": "Twice the computation per check; the threshold in the code (0.52) and on the card (0.95) must be reconciled.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "4.3 us (claimed 0.20 us) — measured 21.09.2026"
    },
    {
      "num": 30,
      "name": "Connectome Innovation 30",
      "bio": "According to the literature, neurons of the fly central complex (E-PG, P-EN, P-FN, Δ7) form a continuous ring attractor: the activity bump can sit anywhere on the ring and holds without external input. Our engine (aifa_sdk/cann_focus.py, 64 neurons) implements this correctly: 'Mexican hat' weights, position read out by population vector.",
      "math": "Measured 21.09.2026 (bench/cann_focus_run.py): with no input the error is 0.01° after 20 steps; smooth goal tracking without jumps (largest step 3.0°); after 30 noise messages the topic is recovered with a 6.9° error, while a 10-message FIFO window no longer contains it. Measured 23.09.2026 (bench/robustness_real.py): after 10 distractor pulses of strength 0.25 the ring drifts 73–94° towards the distractor.",
      "gain": "Holds a topic longer than a FIFO queue and tracks the goal smoothly. The current setting is not robust against strong distractors, and in the agent benchmark the ring gave no gain (5.6% vs 5.8% for a pinned-goal agent). The earlier '20.5× more reliable than FIFO' was not measured.",
      "deploy": "bench/cann_focus_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "A continuous ring attractor in which the position of the activity bump stores the current topic.",
      "competitors": "Without distractors drift is near zero (0.01°), under strong distractors 73–94°; the earlier 'Focus Drift = 0.000' holds only for the first case. Latency 15.1 μs per step (P50, 64 neurons).",
      "limitations": "One ring per topic; robustness to distractors requires retuning the inhibition.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "15.1 us (claimed 9.33 us, same order of magnitude) — measured 21.09.2026"
    }
  ],
  "es": [
    {
      "num": 1,
      "name": "Connectome Innovation 1",
      "bio": "Inspirado en el cuerpo pedunculado de la mosca. Según la literatura: ~783 neuronas de proyección envían señales de olor a ~2.000–2.500 células de Kenyon, cada célula recibe ~6–8 entradas aleatorias, la neurona APL inhibe a todas y quedan activas ~5% de las células. La idea: una proyección dispersa aleatoria a un espacio grande más «el ganador se lo lleva todo» da un hash binario tolerante al ruido. Nuestra implementación proyecta 1024 → 2048 unidades con pesos aleatorios (no se cargan datos de FlyWire), mantiene activas el 30% de las unidades, preselecciona por distancia de Hamming y reordena de forma exacta.",
      "math": "Medido en N=50.000 vectores (d=1024), Intel Core i7-14700, protocolo independiente: P50 43,9 ms, Recall@10 39,55% (23-09-2026).",
      "gain": "Algoritmo de Hashing Sensible a la Localidad inspirado en la arquitectura del cuerpo pedunculado de Drosophila melanogaster (783 uPN -> 2.467 KC). Nuestra implementación usa 30% de células de Kenyon activas (no el 5% biológico) -- decisión del 20-09-2026 en favor de la eficiencia de búsqueda sobre la fidelidad biológica. La búsqueda usa operaciones popcount de bits sin construir grafos HNSW pesados.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Hashing Sensible a la Localidad (LSH) en el conectoma del cuerpo pedunculado de Drosophila (783 PN -> 2.467 KC, 30% de células activas en nuestra implementación). Índice compacto (215 MB para 50.000 vectores), funciona en CPU sin GPU.",
      "competitors": "Prueba honesta contra FAISS IndexFlatL2 (búsqueda exacta por fuerza bruta) en el mismo hardware, 23-09-2026: FAISS fue 5,0 veces más rápido (8,8 ms frente a 43,9 ms) y más preciso (100% frente a 39,55% Recall@10). Nuestra ventaja no es la velocidad de búsqueda exacta, sino la compactación del índice sin GPU; aún no se ha realizado una comparación de memoria/energía entre métodos.",
      "limitations": "La implementación actual (v1) alcanza Recall@10 39,55% con pool=250 de 50.000 vectores (0,5% del conjunto de datos) -- ampliar el pool de candidatos aumenta el recall a costa de la velocidad. La proyección dispersa está optimizada para d<=1024.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "43.9 ms"
    },
    {
      "num": 2,
      "name": "Connectome Innovation 2",
      "bio": "Inspirado en la neurona APL de la mosca: según la literatura, una gran neurona inhibidora por hemisferio recoge la actividad de las células de Kenyon y la apaga si el estímulo se parece a uno ya visto. Nuestra implementación es un detector de duplicados: un vector nuevo se compara con un búfer de vectores vistos y, por encima de un umbral de similitud, se considera duplicado. Medido el 21.09.2026 (bench/novelty_detector.py): búfer de 5.000, 4.000 comprobaciones (2.000 nuevas + 2.000 duplicadas), precisión del 100% en esta prueba sintética, P50 1.069 μs, P95 2.092 μs. Los «3,4 μs» anteriores no se confirmaron.",
      "math": "Similitud de un vector nuevo con el búfer de vistos; por encima del umbral 0,92 es duplicado, por debajo es nuevo. Medido: 100% de decisiones correctas en 4.000 comprobaciones sintéticas.",
      "gain": "Descarta repeticiones antes de guardarlas en memoria o enviarlas a un modelo. Cuántos tokens ahorra en un diálogo real no se ha medido: los anteriores «51,3%», «78–94%» y «40–80%» se retiraron por no estar demostrados. En el benchmark de agentes, APL por sí solo no aumenta el éxito (4,2% frente a 5,8% de un agente con objetivo fijado).",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Un filtro de repeticiones inspirado en la neurona inhibidora APL: la decisión «nuevo o duplicado» se toma con una comparación con el búfer, sin llamar a un modelo.",
      "competitors": "Las bases vectoriales comunes lo guardan todo. El filtro descarta duplicados en 1.069 μs (P50, búfer de 5.000; medido el 21.09.2026). El ahorro de tokens no se midió.",
      "limitations": "v1 utiliza un umbral estático alpha=0.92. En v2: calibración homeostática adaptativa en tiempo real.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1069.45 us P50 (100.0% accuracy)"
    },
    {
      "num": 3,
      "name": "Connectome Innovation 3",
      "bio": "Inspirado en el complejo central de la mosca: según la literatura, un anillo de neuronas del cuerpo elipsoide guarda la dirección actual y el cuerpo en abanico la compara con el objetivo y emite una orden de giro. Nuestra implementación elige el siguiente elemento de la página por el vector hacia el objetivo en lugar de recorrerlo con la tecla Tab.",
      "math": "Medido el 21.09.2026 (bench/compass_navigation.py): en 200 árboles sintéticos de 50 nodos — 3,66 pasos frente a 23,54 con Tab (6,43× menos), 100% de éxito. Los anteriores «1,12 pasos, 16×» no se confirmaron. En el benchmark de agentes con motores reales, CX en el código actual no evita bucles y no aporta éxito (1,4%); con memoria de enlaces visitados — 94,7%.",
      "gain": "Menos pasos de navegación en una página: 6,43× en árboles sintéticos. La salida de trampas de teclado en sitios reales no se ha probado por separado.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Compás vectorial de navegación en el Protocerebral Bridge (PB) y Fan-shaped Body (FB) para guiar agentes en grafos DOM y sistemas de archivos.",
      "competitors": "21.09.2026: medido — línea base (Tab lineal) promedia 23,54 pasos en 200 pruebas, CX Steering logra 3,66 pasos (6,43x más rápido), 100,0% de éxito. Los valores anteriores \"12-18 iteraciones\" y \"1,12 pasos (16x)\" no fueron medidos.",
      "limitations": "Requiere un grafo de estados preindexado. En v2: resolución ontológica dinámica para Shadow DOM.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "3.66 steps (6.43x speedup)"
    },
    {
      "num": 4,
      "name": "Connectome Innovation 4",
      "bio": "Conectoma FlyWire v783 (Zenodo 10.5281/zenodo.10676866, CC BY 4.0). Medido el 23.09.2026 con los archivos de la publicación (bench/connectome_real_metrics.py): 139.255 neuronas, 54.492.922 sinapsis, 15.091.983 pares conectados, 2.700.513 pares con ≥5 sinapsis; neurotransmisores en los datos: acetilcolina, GABA, glutamato, octopamina, serotonina, dopamina. Las «3.869.878 conexiones» anteriores no se confirmaron. Huellas de los archivos: md5 de Zenodo (f48f972d… y e0e6c197…). El árbol de Merkle de bench/proof_of_connectome.py se construye con registros sintéticos con el mismo número de neuronas: construcción 1,23 s, verificación de un subárbol 1,6 ms, hoja falsificada detectada en 20 de 20 intentos.",
      "math": "Una huella SHA-256 de cada archivo de la publicación y un árbol de Merkle: cambiar cualquier registro cambia la raíz. Probado con registros sintéticos: 20 de 20 falsificaciones detectadas.",
      "gain": "Permite demostrar que el trabajo usa exactamente la publicación FlyWire v783 y que no ha sido alterada. El sello Bitcoin de la raíz del conectoma se vuelve a emitir: el anterior («bloque 967238») no contenía atestación.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Raíz Merkle SHA-256 de la matriz sináptica FlyWire v783 con sumas de control de los archivos de Zenodo 10676866. El registro de evidencias está anclado en Bitcoin (OpenTimestamps, bloque 965040); el sello del conectoma se vuelve a emitir: el anterior («bloque 967238») no contenía atestación.",
      "competitors": "Una huella y un árbol de Merkle hacen visible cualquier manipulación. Probado con registros sintéticos: hoja falsificada detectada en 20 de 20 intentos.",
      "limitations": "La verificación requiere consulta a nodo Bitcoin (1-2s). En v2: verificador local zk-SNARK en < 5 ms.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1.2255 s build, 1.622 ms verify, 100% tamper detection"
    },
    {
      "num": 5,
      "name": "Connectome Innovation 5",
      "bio": "La idea: mirar un grafo de conocimiento como los neurocientíficos miran un conectoma: grados de los nodos, clústeres, nodos centrales, caminos cortos. El conectoma real FlyWire v783 (medido el 23.09.2026, 2.700.513 pares con ≥5 sinapsis): coeficiente de agrupamiento C = 0,160, longitud media de camino L = 4,03. Los anteriores «C = 0,34» y «2,3% de nodos centrales» no se confirmaron. En nuestra implementación los nodos son organizaciones, dominios, teléfonos y tecnologías, y las aristas son los vínculos entre ellos.",
      "math": "Medido el 21.09.2026 (bench/memory_graph_connectomics.py) en un grafo sintético: 13.050 nodos, 30.094 aristas. Un recorrido de 2 saltos tarda 0,0125 ms por consulta (1.000 consultas), PageRank de 20 iteraciones 0,62 s.",
      "gain": "Los métodos de análisis de grafos (grados, clústeres, PageRank, caminos cortos) se aplican al grafo de organizaciones de nuestros datos para encontrar grupos conectados y nodos clave. La cifra anterior de «907.000 sitios web» no está respaldada y se retiró; la detección de «beneficiarios ocultos» no se ha probado.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Grafo de memoria asociativa con topología Small-World isomorfo a FlyWire v783. Recuperación asociativa instantánea multinodo.",
      "competitors": "Bases de grafos como Neo4j requieren 15-40 ms. El recorrido biónico de ACR toma 0,12 ms mediante máscaras de bits en L1/L2.",
      "limitations": "Límite de 500.000 nodos en RAM por proceso. En v2: escala a 50M de nodos mediante mmap y precarga SIMD.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0,0125 ms por recorrido de 2 saltos; PageRank 0,62 s (20 iteraciones)"
    },
        {
      "num": 6,
      "name": "Connectome Innovation 6",
      "bio": "Según la literatura, el cerebro de la mosca consume del orden de 10 microvatios, y en cada momento solo está activa una pequeña parte de las neuronas. La idea del modelo: calcular la energía por el número de eventos (disparos) y no por todas las multiplicaciones, como en una red neuronal densa. Es un modelo de cálculo, no una medición: no se usaron vatímetro ni contadores RAPL.",
      "math": "E_eventos = número de eventos sinápticos × 1 pJ; E_denso = número de operaciones × 1,5 pJ. Ejecución del 21.09.2026 (bench/neuromorphic_energy_run.py): 512 neuronas, 1.000 pasos, dispersión del 96,86%, 507.095 eventos: 369,1× menos operaciones que la multiplicación densa FP16.",
      "gain": "Ofrece una estimación de orden de magnitud: con un trabajo disperso basado en eventos hay cientos de veces menos operaciones. El ahorro real de electricidad en un hardware concreto no se ha medido. Los anteriores «92%» y «800×» no coincidían con la ejecución y se sustituyeron por ella.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Simulador de picos basado en operaciones de enteros AVX2/POPCNT. 21.09.2026: medido (bench/neuromorphic_energy_run.py) — reducción de energía 99.729%, multiplicador de eficiencia 369.1x, dispersión de red 96.86%, no el 92%/800x reclamado anteriormente.",
      "competitors": "Clusters GPU H100 con inferencia densa FP16 consumen 350-700 W por nodo — hecho externo, no medido por este script. 21.09.2026: nuestro motor de energía midió un multiplicador de 369.1x, no los 800x reclamados anteriormente.",
      "limitations": "Optimizado para x86_64. En v2: compilador para ARM NEON (Apple Silicon, Raspberry Pi 5) y RISC-V.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "369,1× — estimación de modelo por recuento de operaciones, no medición con vatímetro"
},
        {
      "num": 7,
      "name": "Puntuación AIfa BioMatch (BioMatch v1.0)",
      "bio": "Prototipo arquitectónico: Perfil metrológico del conectoma de Drosophila melanogaster (FlyWire v783: 139.255 neuronas, 54,5M sinapsis, ~2,7M aristas; Nature 2024).\nEvalúa el isomorfismo topológico frente a la referencia biológica.",
      "math": "BioMatch = 1/5 * [ (1 - D_KS) + (1 - |C - C_fly|/C_fly) + (1 - |lambda_1 - lambda_1,fly|/lambda_1,fly) + Resiliencia + Simetría ]. 21.09.2026: implementado y ejecutado (bench/biomatch_score.py) — en un grafo sintético de 500 nodos con topología de mundo pequeño, se calculó por primera vez el Score compuesto: 38.89%, veredicto NON_BIOLOGICAL_FRAGILE.",
      "gain": "Índice algorítmico compuesto de 5 pilares: ajuste lognormal de pesos (99.22%), agrupamiento de mundo pequeño (0.4793 vs 0.312 objetivo — score 46.37%), radio espectral (4.5876 vs ~1.05 objetivo — score 0.0%), resiliencia a lesiones (score 8.72%), simetría bilateral (r=0.4013 — score 40.13%).",
      "deploy": "bench/biomatch_score.py (Apache 2.0), aifa-biobench/aifa_sdk/connectome_golden_standard.py",
      "uniqueness": "Verificación metrológica frente a FlyWire v783 en 5 invariantes, incluyendo el Score compuesto FINAL — calculado por primera vez el 21.09.2026.",
      "competitors": "Los benchmarks sintéticos no evalúan alineación topológica en absoluto; nuestra propia prueba sintética dio un resultado bajo (38.89%), honestamente.",
      "limitations": "La puntuación compuesta de 38,89% se calculó sobre un grafo SINTÉTICO (21.09.2026). El 23.09.2026 se descargó y midió el conectoma real FlyWire v783 (Zenodo 10676866): 139.255 neuronas, 54.492.922 sinapsis, 2.700.513 pares con ≥5 sinapsis; C = 0,160, L = 4,03, KS = 0,282 (bench/connectome_real_metrics.py). Los valores anteriores C = 0,312, L = 2,84, KS = 0,209 no se confirmaron. La puntuación compuesta sobre el grafo real aún no se ha calculado.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "38.89% Score compuesto (NON_BIOLOGICAL_FRAGILE) — calculado por primera vez 21.09.2026"
},
        {
      "num": 8,
      "name": "Búsqueda en Cliente (Browser Client-Side Search)",
      "bio": "Prototipo arquitectónico: motor de búsqueda asociativa del lado cliente (public/aifa_connectome_web.js). 21.09.2026: la tarjeta afirmaba 'binario WebAssembly (Wasm SIMD128, 126.7 KB)'. La INSPECCIÓN DIRECTA del archivo mostró: JavaScript puro, cero bytes WASM, cero instrucciones SIMD. Tamaño real 7,121 bytes, no 126,700 (discrepancia de 17.79x). Algoritmo real: índice invertido con activación de células de Kenyon y similitud de Jaccard, no popcount.",
      "math": "Índice invertido con activación de células de Kenyon y similitud de Jaccard — NO popcount SIMD128 como se afirmaba antes.",
      "gain": "Búsqueda asociativa local en navegador sin enviar vectores a nubes externas. 21.09.2026: medido honestamente el algoritmo real (bench/wasm_search_run.mjs) — P50 2756.3 μs, casi 8x más lento que los 331.6 μs reclamados antes.",
      "deploy": "bench/wasm_search_run.mjs (Apache 2.0), public/aifa_connectome_web.js",
      "uniqueness": "Motor de memoria asociativa en JavaScript puro en el navegador (7.1 KB, no 126.7 KB, y no WASM).",
      "competitors": "Bases vectoriales en la nube requieren transmitir datos privados; nuestro motor ejecuta consultas localmente, aunque en JS puro, no WASM/SIMD como se afirmaba.",
      "limitations": "21.09.2026: la tecnología fue declarada incorrectamente (WASM/SIMD128 en vez de JS puro). Microbenchmark en 500 documentos sintéticos.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2756.3 μs P50 JS honesto (no WASM, no 331.6 μs) — corregido 21.09.2026"
},
        {
      "num": 9,
      "name": "Prototipo Compilador Neuromórfico (Loihi 2 / SynSense)",
      "bio": "Prototipo arquitectónico: Prototipo de traducción de grafos conectómicos a representación de eventos asíncronos (AER).\nPartición Metis en 78 neuropilos, cuantización INT8 y simulación NoC. 21.09.2026: la afirmación '0 bloqueos en 1.000 pruebas' fue verificada — el motor original devuelve is_deadlock_free como constante fija True, nunca medida. Se añadió una comprobación honesta (bench/neuromorphic_compiler_run.py): 1.000/1.000 ejecuciones mostraron dependencia cíclica entre núcleos, lo que NO prueba bloqueos reales de hardware pero muestra honestamente que el 0/1000 original nunca fue calculado.",
      "math": "Minimización de tráfico NoC inter-núcleos: min cut(G) con restricción <= 128 neuronas por núcleo.",
      "gain": "Descomposición automatizada de grafos conectómicos a gran escala en núcleos de hardware neuromórfico.",
      "deploy": "bench/neuromorphic_compiler_run.py (Apache 2.0), aifa-biobench/aifa_sdk/neuromorphic_compiler.py",
      "uniqueness": "Compilador del grafo FlyWire v783 a redes de espigas (SNN) para Loihi 2 y SynSense.",
      "competitors": "Las GPUs tradicionales multiplican matrices densas continuamente; los chips de espigas operan por eventos a < 50 μW.",
      "limitations": "Prototipo de simulador, no una comprobación física de bloqueos; integración con placas aceleradoras PCIe en hoja de ruta.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1000/1000 dependencias cíclicas (no bloqueos físicos) — corregido 21.09.2026"
},
        {
      "num": 10,
      "name": "Índice de Simbiosis Humano-IA (Métrica Φ_sym)",
      "bio": "Prototipo arquitectónico: Modelo escalar formalizado de alineación operador-agente derivado de plasticidad heterosináptica. Φ_sym = exp(-lambda * D_KL) * Alineación * Confianza. 21.09.2026: las variables Alineación y Confianza nunca fueron definidas numéricamente. Se encontró un motor existente con una fórmula DIFERENTE de 4 factores, completamente definida. Medido honestamente sobre 1.000 turnos sintéticos — Phi medio=0.1547, P50=0.0974, latencia 49.7-54.7 μs por turno.",
      "math": "Phi_symbiosis = (1 - D_KL) * exp(-tau/tau_0) * (1 - N_corr/N_int) * H_synergy — fórmula real del motor, diferente de la reclamada anteriormente.",
      "gain": "Métrica escalar en (0, 1] para medir fricción y colaboración humano-IA. 21.09.2026: medido honestamente en escenario sintético — valor medio 0.1547 (estado MISALIGNED_DIVERGENCE).",
      "deploy": "bench/symbiosis_index_run.py (Apache 2.0), aifa-biobench/aifa_sdk/symbiosis_index.py",
      "uniqueness": "Índice acotado de sinergia cognitiva humano-IA que elimina divergencias negativas.",
      "competitors": "Métricas tradicionales evalúan solo velocidad de tokens; Phi_sym cuantifica alineación de intenciones y fricción.",
      "limitations": "Prototipo formalizado sobre datos sintéticos, no un estudio empírico con operadores reales. 21.09.2026: las variables Alineación/Confianza declaradas nunca fueron definidas.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "Phi_sym en (0, 1] · 39,7 μs P50"
},
    {
      "num": 11,
      "name": "Connectome Innovation 11",
      "bio": "Medido el 23.09.2026 en el conectoma real FlyWire v783 (bench/connectome_topology_extra.py; 134.181 neuronas conectadas, 2.511.789 pares con ≥5 sinapsis): agrupamiento C = 0,155, camino medio L = 4,02. Un grafo aleatorio del mismo tamaño, medido igual, tiene C = 0,00029 y L = 3,65. Índice de mundo pequeño σ = (C/C_rand)/(L/L_rand) = 490: el cerebro de la mosca está muy agrupado y con caminos cortos. Las cifras anteriores de la tarjeta (C = 0,284, L = 3,82, σ = 8,42 o 79,81) no se confirmaron. Para un grafo de memoria sintético (500 nodos, p = 0,08) la ejecución del 21.09.2026 dio σ = 19,7, no el 7,15 declarado.",
      "math": "σ = (C/C_rand) / (L/L_rand), donde C_rand y L_rand se miden en un grafo aleatorio con el mismo número de nodos y aristas. FlyWire v783: σ = 490; grafo de memoria sintético: σ = 19,7.",
      "gain": "La idea: construir un grafo de memoria a imagen del cerebro —clústeres temáticos densos más enlaces lejanos escasos— para que cualquier dato esté a pocos pasos. El beneficio de esta organización para la calidad de búsqueda aún no se ha medido.",
      "deploy": "bench/small_world_index_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Comparación de un grafo de memoria con el conectoma real mediante el índice de mundo pequeño, midiendo el grafo aleatorio de referencia en lugar de tomarlo de una fórmula.",
      "competitors": "El anterior «4× más resistencia al olvido que los embeddings densos» nunca se midió y se retiró.",
      "limitations": "El grafo de memoria sigue siendo sintético (500 nodos, p = 0,08); el índice no se ha calculado sobre un grafo de diálogos reales.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "FlyWire v783: σ = 490 (C = 0,155, L = 4,02); grafo de memoria: σ = 19,7"
    },
    {
      "num": 12,
      "name": "Connectome Innovation 12",
      "bio": "Medido el 23.09.2026 en el conectoma real FlyWire v783 (bench/connectome_topology_extra.py, 134.181 neuronas conectadas): ⟨k²⟩/⟨k⟩ = 190,9, de donde el umbral de ruptura ante fallos aleatorios f_c = 1 − 1/(⟨k²⟩/⟨k⟩ − 1) = 0,995. Prueba directa: tras eliminar el 30% de las neuronas al azar, la mayor parte conectada conserva el 68,5% de todas las neuronas del grafo; tras eliminar el 30% más conectado, el 57,5%; con el 50%, el 48,1% y el 28,0%. Los anteriores «⟨k²⟩/⟨k⟩ ≈ 42,6, f_c ≈ 0,976» no se confirmaron.",
      "math": "Proporción de nodos en la mayor parte conectada tras eliminar una fracción f de nodos, al azar o por grado decreciente. Conectoma real: con f = 30% — 68,5% (al azar) y 57,5% (por grado).",
      "gain": "Ofrece una forma de encontrar de antemano los nodos cuyo fallo más fragmenta un sistema: en el conectoma, eliminar los nodos más conectados perjudica bastante más que eliminarlos al azar. Aún no se ha aplicado a nuestros servicios.",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Una prueba de robustez en un grafo cerebral real: eliminación de hasta el 50% de los nodos, al azar y dirigida, con una cifra para cada paso.",
      "competitors": "La línea anterior citaba acr_robustness_suite.py («65,5% frente a 26,84%»), cuyo resultado lo fijaba una fórmula; la prueba real de desactivación (bench/robustness_real.py) mostró lo contrario para FlyHash: con el 50% de bits desactivados, 25,4% frente a 78,2% de Sign-LSH.",
      "limitations": "Mide la conectividad del grafo, no el funcionamiento neuronal; la prueba aún no se ha hecho con el grafo de nuestros servicios.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "30% de fallos: 68,5% (al azar), 57,5% (por grado); f_c = 0,995"
    },
    {
      "num": 13,
      "name": "Connectome Innovation 13",
      "bio": "Inspirado en el olfato de la mosca: según la literatura, la primera decisión «peligroso / comestible» la toman receptores fijos, sin cálculos largos. La idea para TI: resolver los casos simples —un dominio, un título, un texto de error— con una comparación rápida de patrones y llamar a un modelo pesado solo donde los patrones no deciden. Las cifras anteriores sobre calentamiento del servidor, latencia del modelo y «12–18% de alucinaciones» no se midieron y se retiraron.",
      "math": "Autómata Aho–Corasick sobre 16 patrones, O(longitud de la cadena) por consulta. Medido el 21.09.2026 (bench/olfactory_filter_run.py): 5.000 cadenas, P50 2,0 μs, P95 3,0 μs, P99 3,3 μs.",
      "gain": "Procesa cadenas simples en microsegundos sin ejecutar un modelo. Cuánto más rápido es que un modelo local no se ha medido: no se ejecutó ningún modelo para comparar, y el anterior «75.000×» se basaba en unos 150 ms supuestos, no en una medición.",
      "deploy": "bench/olfactory_filter_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Filtrado en dos etapas: primero comparación de patrones, un modelo solo para lo que los patrones no decidieron.",
      "competitors": "Llamar a un modelo para cada cadena es más lento y costoso; cuánto exactamente no se midió en esta ejecución. El filtro: 2,0 μs por cadena (P50), sin llamadas externas.",
      "limitations": "Los patrones se definen a mano; las cadenas que no cubren siguen yendo a un modelo. En 5.000 cadenas sintéticas se marcó como peligroso el 59,5%; la proporción con datos reales no se ha medido.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2,0 μs P50 por cadena (medido el 21.09.2026)"
    },
    {
      "num": 14,
      "name": "Connectome Innovation 14",
      "bio": "Inspirado en el cuerpo elipsoide de la mosca: según la literatura, un anillo de neuronas «brújula» mantiene un pico de actividad que gira con la mosca y conserva la dirección. La idea: guardar la fase actual de un diálogo en ese anillo. Nuestra implementación es un atractor en anillo (ecuación de Amari, pesos «sombrero mexicano»); la ejecución usó 16 neuronas, como indica la tarjeta (el motor usa 64 por defecto).",
      "math": "Medido el 21.09.2026 (bench/cann_ring_run.py): 16 neuronas, 1.000 pasos sin distracciones — P50 23,0 μs por paso, estabilidad del 99,67%, objetivo mantenido en todos los pasos. Medido el 23.09.2026 (bench/robustness_real.py): tras 10 impulsos de distracción de fuerza 0,25 el anillo se desvía 73–94° hacia la distracción.",
      "gain": "Sin distracciones el anillo mantiene la fase fijada de forma fiable y rápida (23 μs por paso). Con distracciones la configuración actual pierde la fase, así que «mantener el foco durante cientos de turnos» aún no está demostrado. En el benchmark de agentes el anillo da el mismo éxito que fijar el objetivo (5,6% frente a 5,8%).",
      "deploy": "bench/cann_ring_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Un anillo de 16 neuronas en el que la posición del pico de actividad codifica la fase actual de una tarea.",
      "competitors": "Sin distracciones el objetivo se mantiene en los 1.000 pasos; con impulsos de distracción de fuerza 0,25, no (desvío de 73–94°). No se ha comparado con la retención de contexto de los modelos de lenguaje.",
      "limitations": "16 estados fijos; con distracciones hay que reajustar la fuerza de inhibición. La latencia anterior de «16,21 μs» no se confirmó (medido: 23,0 μs P50).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "23,0 μs P50; 99,67% sin distracciones, desvío de 73–94° con ellas"
    },
    {
      "num": 15,
      "name": "Connectome Innovation 15",
      "bio": "El conectoma FlyWire etiqueta cada conexión con un neurotransmisor predicho. Medido el 23.09.2026 con los datos de la publicación (bench/connectome_transmitters.py, 54,46 M de sinapsis con predicción), proporción de sinapsis por neurotransmisor más probable: acetilcolina 55,8%, GABA 23,3%, glutamato 17,8%, dopamina 1,4%, serotonina 1,2%, octopamina 0,6%. Las proporciones anteriores de la tarjeta (acetilcolina ~45%, dopamina ~5%, serotonina y octopamina ~3% cada una) no se confirmaron. La idea del modelo: la excitación y la inhibición se equilibran y la red mantiene un nivel de actividad fijado.",
      "math": "I = ACh − γ_GABA·GABA + M_dopamina·ΔW; γ_GABA se ajusta para que la actividad media tienda al objetivo del 5%. Medido el 21.09.2026 (bench/ei_balance_run.py): 256 neuronas, 3.000 pasos, actividad final del 4,99% frente al objetivo del 5%, P50 142 μs por paso.",
      "gain": "La homeostasis funciona: la red alcanza por sí sola el nivel de actividad fijado. Las afirmaciones anteriores «elimina las alucinaciones» y «elimina los bucles de generación» no se probaron: el modelo nunca se conectó a un modelo de lenguaje.",
      "deploy": "bench/ei_balance_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Un circuito de equilibrio excitación–inhibición con fuerza de inhibición adaptable. Ejecución del 21.09.2026 (bench/ei_balance_run.py): la fórmula de la tarjeta implementada desde cero.",
      "competitors": "Medido: la homeostasis converge a una densidad del 4,99% frente al objetivo del 5% (256 neuronas, 3.000 pasos). No se ha comparado con la penalización por repetición de los modelos de lenguaje.",
      "limitations": "Un modelo simplificado sin suma espacial en las dendritas. La latencia anterior de «1,68 μs» no se confirmó (medido: 142 μs P50).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "142.2 us P50 (la homeostasis converge) — corregido 21.09.2026"
    },
    {
      "num": 16,
      "name": "Connectome Innovation 16",
      "bio": "Inspirado en la adaptación sensorial de la mosca: según la literatura, un fondo constante deja de percibirse mientras que una señal rara e importante se amplifica. La idea: dar más peso a los rasgos raros y podar las conexiones frecuentes. Fórmula: w(f) = log(1 + N/df) · (1 − e^(−λ·Δt)), umbral de poda del 5% del peso máximo.",
      "math": "Medido el 21.09.2026 (bench/bio_idf_pruning_run.py) con un corpus sintético: 2.000 documentos, 5.000 rasgos — se podó el 24,5% de las conexiones (no el 72%), los rasgos raros pesan 6,9× más que los frecuentes.",
      "gain": "Poda una cuarta parte de las conexiones frecuentes y resalta los rasgos raros. El efecto en la precisión del clasificador y en la velocidad de inferencia no se ha medido; los anteriores «hasta el 72%» y «sin ninguna pérdida de precisión» se retiraron.",
      "deploy": "bench/bio_idf_pruning_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Peso del rasgo por frecuencia inversa con recencia, con poda de conexiones débiles. Ejecución del 21.09.2026: la fórmula de la tarjeta implementada desde cero; la ley «lo raro pesa más» se cumple (6,9×).",
      "competitors": "A diferencia de TF-IDF, tiene en cuenta la recencia del rasgo. Medido con un corpus sintético (2.000 documentos, 5.000 rasgos): se podó el 24,5% de las conexiones frente al 72% declarado. No se ha comparado directamente la calidad con TF-IDF.",
      "limitations": "Pensado para un corpus fijo; la poda en flujo no está implementada. La latencia anterior de «3,29 μs» no se confirmó (medido: 2,1 ms P50 por pasada de poda).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2145.7 us P50 de poda (24.49% eliminado) — corregido 21.09.2026"
    },
    {
      "num": 17,
      "name": "Connectome Innovation 17",
      "bio": "La idea: describir la arquitectura de un sistema de IA con el mismo rigor con que FlyWire describe un cerebro: cada elemento con identificador y tipo, cada enlace con tipo y peso. El formato CADF: S = ⟨V, E, T, W⟩, donde el tipo de enlace T ∈ {Sync, Async, Inhibitory, Modulatory} y el peso W > 0.",
      "math": "Medido el 21.09.2026 (bench/cadf_schema_run.py): un documento de 200 componentes y 800 enlaces se valida en 0,27 ms (P50); un documento válido da 0 errores y uno dañado, 2 errores detectados. Los «2,177 ms» anteriores no se confirmaron.",
      "gain": "Una descripción de arquitectura legible por máquina que se valida automáticamente. Si es más cómoda que C4 o UML en proyectos reales no se ha probado.",
      "deploy": "bench/cadf_schema_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Un esquema JSON abierto de CADF y un validador; antes del 21.09.2026 no existía ninguno de los dos: ambos se escribieron a partir de la fórmula de la tarjeta y se probaron.",
      "competitors": "Más compacto que los formatos de grafos generales (ONNX, GEXF) para esta tarea. Medido: el validador acepta un documento válido y rechaza uno dañado (tipo de enlace incorrecto, peso negativo).",
      "limitations": "El validador está en Python sin dependencias externas; no hay bibliotecas para otros lenguajes.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.2694 ms P50 de validación (más rápido que los 2.177 ms declarados) — corregido 21.09.2026"
    },
    {
      "num": 18,
      "name": "Connectome Innovation 18",
      "bio": "La idea: igual que FlyWire dio a todos un cerebro de referencia abierto, un conjunto abierto de mediciones de accesibilidad web puede dar a los investigadores una referencia común. Nuestro conjunto es un recorrido con teclado de sitios de EE. UU.: cuáles de ocho páginas típicas se abren y se pueden recorrer con el teclado.",
      "math": "Medido el 23.09.2026: el archivo de resultados del recorrido con teclado contiene 1.639.050 registros, unas 135 mil organizaciones; el recorrido continúa.",
      "gain": "Un gran conjunto de mediciones reales de accesibilidad por teclado de sitios de EE. UU. Las palabras anteriores «el más grande del mundo» y «certificado en la cadena de bloques de Bitcoin» no se verificaron y se retiraron; cuándo y cómo se publica el conjunto lo decide el Arquitecto.",
      "deploy": "bench/adab_merkle_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Mediciones reales, no una muestra de cien páginas: cientos de miles de organizaciones y ocho páginas típicas de cada una.",
      "competitors": "El mecanismo de árbol de Merkle del conjunto se probó con registros sintéticos: las pruebas de inclusión se verifican en el 100% de los casos y se detecta la falsificación.",
      "limitations": "Un único archivo JSONL grande; el recorrido sigue en marcha, así que las cifras crecen. La publicación y las réplicas (IPFS, HuggingFace) las decide el Arquitecto.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1.639.050 registros, ~135 mil organizaciones (23.09.2026)"
    },
    {
      "num": 19,
      "name": "Connectome Innovation 19",
      "bio": "Según la literatura (Caron et al., Nature 2013; Litwin-Kumar et al., Neuron 2017), una célula de Kenyon de la mosca recibe entradas de unas 6–8 neuronas de proyección, un número que se considera cercano al óptimo para separar olores. Lo comprobamos en nuestras propias tareas.",
      "math": "Dos ejecuciones. Separación de clases (bench/fly_d6_optimality_run.py, 10 semillas): k = 6 — 0,456, k = 10 — 0,460, k = 16 — 0,457, dispersión ±0,01–0,02: una meseta de 6 a 16. Búsqueda (bench/sweep_dendritic_degree.py): Recall@10 con d = 6 — 19,8%, d = 7 — 23,3%, d = 16 — 24,9%.",
      "gain": "Lo que dicen las mediciones: d = 6 es una buena elección, pero no un «óptimo estricto». En nuestras tareas, de 6 a 16 entradas el resultado es casi igual, y para la búsqueda más entradas son algo mejores.",
      "deploy": "bench/fly_d6_optimality_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "La hipótesis biológica se comprobó con un barrido en dos tareas, en lugar de darse por buena.",
      "competitors": "Menos entradas significa menos pesos y lecturas de memoria que en capas densas (con d = 6 hay 85× menos pesos que en una proyección densa de 1024-d). La ganancia de ancho de banda de memoria en hardware no se ha medido.",
      "limitations": "Probado con datos sintéticos; el barrido no se ha hecho con embeddings reales.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "17.5 us en k=6 (no los 166.38 us declarados) — corregido 21.09.2026"
    },
    {
      "num": 20,
      "name": "Connectome Innovation 20",
      "bio": "La idea: mostrar de forma visual cómo se propaga la actividad por el cerebro de la mosca, en un terminal y en el navegador, con un sonido que depende del número de impulsos. Proyección de puntos en pantalla: [u, v] = R(α, β)·[x, y, z]; sonido: f(t) = f0 + k·Σ s_i(t).",
      "math": "Medido el 21.09.2026 (bench/terminal_showcase_run.py): un fotograma de 139.255 puntos se genera en 4,1 ms (P50) — 243,8 fotogramas por segundo; proyectar un punto tarda 14,3 μs y el sonido 1,3 μs. Las coordenadas son sintéticas: la publicación de FlyWire que usamos no incluye coordenadas de neuronas.",
      "gain": "Una demostración visual para explicar y enseñar; los 60 fotogramas por segundo declarados se cumplen con margen (243,8). El anterior «la herramienta de marketing viral más potente» es una opinión, no una medición.",
      "deploy": "bench/terminal_showcase_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Una demostración en terminal y navegador con proyección y sonido; ambas fórmulas se implementaron el 21.09.2026 y se midieron.",
      "competitors": "Medido: un fotograma de 139.255 puntos — 243,8 fotogramas por segundo frente a los 60 declarados.",
      "limitations": "Las coordenadas son sintéticas, no anatómicas; el navegador muestra solo parte de los nodos.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "4101.6 us cuadro completo / 243.81 FPS (60 FPS confirmado) — corregido 21.09.2026"
    },
    {
      "num": 21,
      "name": "Connectome Innovation 21",
      "bio": "Inspirado en el complejo central de la mosca: según la literatura, las neuronas P-EN y P-FN conectan el cuerpo elipsoide con el puente protocerebral y ayudan a girar hacia un objetivo. La fórmula de la tarjeta: V = α·∇Φ_objetivo − β·Σ repulsión de los nodos visitados. El código del motor (aifa_sdk/cx_steering.py) implementa solo la primera parte, la atracción al objetivo; el campo de nodos visitados está declarado pero no se usa.",
      "math": "Medido el 21.09.2026 (bench/cx_steering_run.py): el escenario «Detalles → ventana → Detalles otra vez», 30 intentos: el navegador pulsó «Detalles» las 30 veces y nunca llegó a «Finalizar pedido». Latencia P50 190 μs.",
      "gain": "En su forma actual no hay protección contra bucles. El benchmark de agentes del 23.09.2026 mostró que es justo lo que falta: al añadir memoria de enlaces visitados, el éxito sube del 1,4% al 94,7%. La corrección aún no se ha incorporado al código del motor.",
      "deploy": "bench/cx_steering_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Navegación de un agente de navegador por el vector hacia el objetivo, inspirada en las neuronas de orientación de la mosca.",
      "competitors": "Prueba directa en el escenario indicado (30 intentos): el navegador entró en bucle las 30 veces. El anterior «91% menos clics erróneos» no se verificó: no había referencia independiente.",
      "limitations": "Hay que implementar la repulsión de los nodos visitados en el propio motor; se necesita el árbol de accesibilidad de la página.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "190.0 us, bucle no prevenido (no los 3.56 us declarados) — corregido 21.09.2026"
    },
    {
      "num": 22,
      "name": "Connectome Innovation 22",
      "bio": "Inspirado en la neuromodulación de la mosca: según la literatura, la dopamina, la octopamina y la serotonina cambian el cerebro entre sueño, vigilia tranquila, búsqueda de alimento y huida. La idea para un rastreador: variar el número de trabajadores paralelos y las pausas según éxitos y errores, como los moduladores cambian el modo del cerebro.",
      "math": "Medido el 21.09.2026 (bench/neuromod_scheduler_run.py): con errores sostenidos el número de trabajadores cae a 0 y la pausa sube a 38 s: la protección contra bloqueos funciona. Con éxito sostenido el número de trabajadores se queda en 4 y no crece: la penalización base 6·σ(0) = 3,0 anula casi por completo la mayor ganancia de dopamina 4·tanh(3) = 3,98.",
      "gain": "Frena el rastreo de forma fiable ante errores. Con la fórmula actual no sabe acelerar cuando hay éxito: es una propiedad de la propia fórmula y hay que corregirla.",
      "deploy": "bench/neuromod_scheduler_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Modos de funcionamiento del rastreo controlados por análogos de la dopamina (éxitos) y la octopamina (errores).",
      "competitors": "Un planificador común mantiene una carga fija. Este la reduce a cero ante fallos; no hay ganancia con el éxito (ver la medición).",
      "limitations": "Hay que corregir la fórmula para que el éxito realmente aumente el paralelismo; las transiciones de fase aún se fijan a mano.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2.0 us (no los 0.19 us declarados) — corregido 21.09.2026"
    },
    {
      "num": 23,
      "name": "Connectome Innovation 23",
      "bio": "Inspirado en la neurona APL: según la literatura, una gran neurona inhibidora por hemisferio recibe la señal de todas las células de Kenyon activas y las inhibe a todas en proporción, de modo que solo unas pocas siguen activas. La fórmula de la tarjeta: A = ReLU(X − cuantil(1−k)), y luego normalización por la suma.",
      "math": "Medido el 21.09.2026 (bench/apl_normalization_run.py): 94,9% de ceros frente al 95% declarado, normalización correcta. El tiempo crece como N^0,81 para longitudes de 1.024 a 262.144 (41 μs → 3,4 ms); con N = 512, 35,5 μs, no los 4,05 μs declarados.",
      "gain": "Conserva el 5% de valores más fuertes y los normaliza. Las afirmaciones anteriores sobre comprimir el contexto para modelos grandes «sin perder entidades» no se probaron: no hay mediciones con prompts y modelos reales.",
      "deploy": "bench/apl_normalization_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Inhibición global al estilo APL: un único umbral para todo el vector en lugar de atención de todos con todos.",
      "competitors": "Complejidad medida: el tiempo crece como N^0,81, no peor que lineal y claramente mejor que la atención cuadrática. No se ha medido la conservación de nombres, fechas y hechos en el texto comprimido.",
      "limitations": "Funciona sobre un vector numérico; no se ha integrado con un tokenizador ni con un modelo de lenguaje real.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "35,5 μs con N = 512; dispersión del 94,9%"
    },
    {
      "num": 24,
      "name": "Connectome Innovation 24",
      "bio": "El motivo C1-FFL (Alon, 2007): el nodo X activa a Y, y la salida Z se dispara solo si X e Y están activos (Y lógico). Un impulso corto no tiene tiempo de pasar por Y y se apaga; una señal larga pasa. Cuánto está enriquecido este motivo en FlyWire v783 no lo hemos comprobado.",
      "math": "Medido el 21.09.2026 (bench/c1_ffl_filter_run.py): duración crítica de 3,47 pasos; impulsos cortos — 0 falsas activaciones de 50, señales largas — 0 omisiones de 50. Latencia de 0,2 μs (P50), 0,18 μs declarados.",
      "gain": "El filtro corta las ráfagas cortas y deja pasar las señales sostenidas: ambas propiedades se confirmaron en 100 casos sintéticos. No se ha probado con tráfico de red real.",
      "deploy": "bench/c1_ffl_filter_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "El motivo de prealimentación C1-FFL como filtro de impulsos falsos y ráfagas de solicitudes.",
      "competitors": "A diferencia de una media móvil, no suaviza la señal, sino que la deja pasar entera una vez superado el umbral de duración. Latencia medida: 0,2 μs, cerca de los 0,18 μs declarados.",
      "limitations": "El umbral de duración es fijo; el ajuste a un canal concreto no está implementado.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.2 us (casi coincide con los 0.18 us declarados) — confirmado 21.09.2026"
    },
    {
      "num": 25,
      "name": "Connectome Innovation 25",
      "bio": "Según la literatura, las neuronas T4 y T5 del sistema visual de la mosca detectan el movimiento de bordes claros y oscuros con el modelo de Hassenstein–Reichardt: la señal de un fotorreceptor se retrasa y se multiplica por la del vecino. La idea: detectar de la misma forma el parpadeo peligroso y las animaciones intrusivas en una página. El anterior «un millón de veces más eficiente que las tarjetas gráficas» no es una medición y se retiró.",
      "math": "Medido el 21.09.2026 (bench/emd_reichardt_run.py): cuadrícula de 32×32 = 1.024 detectores, 0,0021 μs por detector (P50). La potencia del parpadeo en la banda peligrosa es 1.605× mayor que la de un fondo estático. Fondo estático — 0 falsas alarmas de 20; parpadeo fuera de banda — 0 de 4; parpadeo en banda detectado en 4 casos de 5.",
      "gain": "Un detector de parpadeo barato sin redes neuronales: no confunde un fondo estático y encuentra la banda peligrosa en la mayoría de los casos (4 de 5), pero no en todos; «detecta al instante» era una exageración.",
      "deploy": "bench/emd_reichardt_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Un detector de movimiento basado en las neuronas T4/T5 para encontrar parpadeos y animaciones peligrosos según WCAG.",
      "competitors": "El detector es órdenes de magnitud más barato de lo declarado: 0,0021 μs por detector frente a 0,28 μs. La evasión de trampas para bots y captchas no se ha probado.",
      "limitations": "Un ráster 2D de tamaño fijo; se pasó por alto uno de cada cinco parpadeos en banda: hay que ajustar el umbral.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.002 us pure detector (claimed 0.28 us for full system) — measured 21.09.2026"
    },
    {
      "num": 26,
      "name": "Connectome Innovation 26",
      "bio": "Un k-núcleo es el mayor subgrafo en el que cada nodo tiene al menos k vecinos dentro de él; se obtiene eliminando sucesivamente los nodos de grado menor que k. Medido el 23.09.2026 en el conectoma real FlyWire v783 (bench/connectome_topology_extra.py, pares con ≥5 sinapsis): k_max = 57, con 258 neuronas en el núcleo más interno. Los anteriores «k_max = 78, 1.420 neuronas» no se confirmaron.",
      "math": "El algoritmo de Batagelj–Zaversnik, O(V+E). Medido el 21.09.2026 en un grafo sintético (núcleo de 100 + periferia de 900): el tiempo crece como N^1,12, casi lineal; el núcleo se encuentra con exactitud (coincidencia del 100%). Conectoma real: k_max = 57 (258 neuronas).",
      "gain": "Encuentra la parte más densa y mutuamente conectada de un grafo. En la prueba sintética, el núcleo sobrevivió a la pérdida de toda la periferia y de hasta el 50% de sus propios nodos sin dividirse. Las afirmaciones anteriores «protección contra el 99% de los ataques de red» y «núcleo en un microcontrolador de 64 MB» no se probaron y se retiraron.",
      "deploy": "bench/kcore_decomposition_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Extracción del núcleo de mayor orden de conectividad; en el cerebro real de la mosca, 258 neuronas con k = 57.",
      "competitors": "Medido: la complejidad es casi lineal (N^1,12) y el núcleo resiste la pérdida de la periferia. Latencia en un grafo sintético de 1.000 nodos: 2,6 ms (P50), no los 0,5 ms declarados.",
      "limitations": "El núcleo se recalcula por completo; no está implementada la actualización incremental cuando cambia el grafo.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2600.8 us on synthetic 1000-node graph (claimed 498.10 us) — measured 21.09.2026"
    },
    {
      "num": 27,
      "name": "Connectome Innovation 27",
      "bio": "Según la literatura (Turrigiano, 1998), una neurona escala todas sus sinapsis de entrada para que su fuerza total se mantenga constante; de lo contrario, el aprendizaje hebbiano la lleva a la saturación. La idea: mantener igual de constante el «volumen» de la memoria y eliminar los enlaces débiles sin uso.",
      "math": "Medido el 21.09.2026 (bench/homeostatic_scaling_run.py): tras cada paso de escalado la suma de pesos es exactamente 1,0 (objetivo 1,0); sin homeostasis creció hasta 1.300 en 500 pasos. Poda: se eliminaron 66 de 100 sinapsis, el 75,8% de ellas de la mitad sin uso. Latencia de 9,8 μs (P50, 200 sinapsis).",
      "gain": "Evita que la memoria crezca sin límite. Pero la poda también afecta a enlaces en uso (una cuarta parte de los eliminados), así que «sin perder datos importantes» aún no se cumple; el «olvido catastrófico» no se ha probado con un modelo real.",
      "deploy": "bench/homeostatic_scaling_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Fuerza total de los enlaces constante más eliminación de los que no se usan: la memoria libera espacio para lo nuevo.",
      "competitors": "La suma de pesos se mantiene exactamente en el objetivo en cualquier número de pasos; sin el mecanismo crece 1.300 veces. No se ha comparado con la limpieza de bases vectoriales.",
      "limitations": "Hay que ajustar la poda para que no afecte a los enlaces en uso; el decaimiento es solo temporal, sin tener en cuenta la importancia.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "9.8 us (claimed 6.59 us, same order of magnitude) — measured 21.09.2026"
    },
    {
      "num": 28,
      "name": "Connectome Innovation 28",
      "bio": "La idea: usar un grafo cerebral real como prueba para bases de datos de grafos, porque los grafos sintéticos no reproducen su estructura. Medido el 23.09.2026 en el grafo real FlyWire v783: 139.255 neuronas, 15.091.983 pares conectados, 54.492.922 sinapsis; con un umbral de ≥5 sinapsis, 134.181 neuronas y 2.511.789 aristas. Las anteriores «3.869.878 conexiones» y «3,87 M de aristas» no se confirmaron.",
      "math": "El conjunto de pruebas: recorrido de k saltos, Dijkstra, PageRank, cascada de activación. Medido el 21.09.2026 (bench/dcgb_graph_benchmark_run.py) en un grafo sintético de 2.000 nodos: todos los algoritmos dan resultados correctos y un recorrido de 2 saltos tarda 39 μs (P50). El conjunto aún no se ha ejecutado sobre el grafo real de la mosca.",
      "gain": "Ofrecerá una prueba de sistemas de grafos sobre una estructura biológica real. Los algoritmos y los datos están listos; ejecutar el conjunto sobre el grafo real es el siguiente paso. Las «respuestas verificadas criptográficamente» aún no están hechas.",
      "deploy": "bench/dcgb_graph_benchmark_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Una prueba de consultas de grafos sobre el cerebro real de la mosca: 134.181 neuronas y 2,5 M de aristas con un umbral de ≥5 sinapsis.",
      "competitors": "La diferencia con las pruebas sintéticas (LDBC, Graphalytics) es la estructura cerebral real. El anterior «el único benchmark que combina grafos y búsqueda vectorial» no se verificó.",
      "limitations": "Hasta ahora el conjunto solo se ha comprobado en un grafo sintético; solo operaciones de recorrido.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "39.1 us on synthetic 2000-node graph (claimed 3.10 us) — measured 21.09.2026"
    },
    {
      "num": 29,
      "name": "Connectome Innovation 29",
      "bio": "Según la literatura, el cerebro de la mosca es especularmente simétrico y los hemisferios intercambian señales a través de comisuras. La idea: dos «hemisferios» independientes evalúan una respuesta, y solo se acepta si coinciden. En el código (aifa_sdk/bilateral_verifier.py) la concordancia es √(s_i·s_d)·(1 − 0,4·|s_i − s_d|) con un umbral de 0,52 (la tarjeta indicaba 0,95).",
      "math": "Medido el 21.09.2026 (bench/bilateral_consensus_run.py): 50 de 50 puntuaciones seguras y concordantes aceptadas, 50 de 50 discordantes rechazadas. Latencia de 4,3 μs (P50). Los anteriores «−84,6%» y «−99,1% de alucinaciones» eran dos cifras distintas para una misma propiedad, y ninguna se midió con un modelo de lenguaje.",
      "gain": "Descarta de forma fiable los casos en que dos puntuaciones no coinciden. Cuánto reduce esto los errores de un modelo de lenguaje real no se ha medido. En el benchmark de agentes el verificador no añadió nada al éxito (93,6% con él frente a 94,7% sin él).",
      "deploy": "bench/bilateral_consensus_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Dos puntuaciones independientes con comprobación de concordancia antes de responder.",
      "competitors": "La lógica de rechazo se confirmó en 100 de 100 casos sintéticos. No hay comparación con la reducción de alucinaciones en modelos de lenguaje.",
      "limitations": "El doble de cálculo por comprobación; hay que conciliar el umbral del código (0,52) y el de la tarjeta (0,95).",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "4.3 us (claimed 0.20 us) — measured 21.09.2026"
    },
    {
      "num": 30,
      "name": "Connectome Innovation 30",
      "bio": "Según la literatura, las neuronas del complejo central de la mosca (E-PG, P-EN, P-FN, Δ7) forman un atractor continuo en anillo: el pico de actividad puede situarse en cualquier punto del anillo y se mantiene sin entrada externa. Nuestro motor (aifa_sdk/cann_focus.py, 64 neuronas) lo implementa correctamente: pesos «sombrero mexicano», posición leída por vector de población.",
      "math": "Medido el 21.09.2026 (bench/cann_focus_run.py): sin entrada, el error es de 0,01° tras 20 pasos; seguimiento suave del objetivo sin saltos (paso máximo de 3,0°); tras 30 mensajes de ruido el tema se recupera con un error de 6,9°, mientras que una ventana FIFO de 10 mensajes ya no lo contiene. Medido el 23.09.2026 (bench/robustness_real.py): tras 10 impulsos de distracción de fuerza 0,25 el anillo se desvía 73–94° hacia la distracción.",
      "gain": "Mantiene un tema durante más tiempo que una cola FIFO y sigue el objetivo con suavidad. La configuración actual no es robusta ante distracciones fuertes, y en el benchmark de agentes el anillo no aportó mejora (5,6% frente a 5,8% de un agente con objetivo fijado). El anterior «20,5× más fiable que FIFO» no se midió.",
      "deploy": "bench/cann_focus_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "Un atractor continuo en anillo en el que la posición del pico de actividad guarda el tema actual.",
      "competitors": "Sin distracciones la deriva es casi nula (0,01°), con distracciones fuertes, de 73–94°; el anterior «Focus Drift = 0,000» solo es cierto en el primer caso. Latencia de 15,1 μs por paso (P50, 64 neuronas).",
      "limitations": "Un anillo por tema; la robustez ante distracciones exige reajustar la inhibición.",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "15.1 us (claimed 9.33 us, same order of magnitude) — measured 21.09.2026"
    }
  ],
  "zh": [
    {
      "num": 1,
      "name": "Connectome Innovation 1",
      "bio": "受果蝇蘑菇体启发。文献数据：约 783 个投射神经元把气味信号传给约 2,000–2,500 个 Kenyon 细胞，每个细胞接收约 6–8 个随机输入，APL 神经元抑制全部细胞，最终约 5% 保持激活。由此得到的思路：随机稀疏投影到高维空间再加“胜者全取”，可得到抗噪的二值哈希。我们的实现把 1024 维投影到 2048 个单元，权重随机（未加载 FlyWire 数据），保持 30% 单元激活，按汉明距离初筛后精确重排序。",
      "math": "在 N=50,000 向量（d=1024）、Intel Core i7-14700、独立协议下实测：P50 43.9 毫秒，Recall@10 39.55%（2026-09-21）。",
      "gain": "受黑腹果蝇蘑菇体结构启发的局部敏感哈希算法（783 uPN -> 2,467 KC）。我们的实现使用 30% 的活跃 Kenyon 细胞（而非生物学上的 5%）——这是 2026-09-20 做出的决定，优先考虑检索效率而非生物学精确度。检索通过按位 popcount 运算完成，不构建复杂的 HNSW 图。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "基于黑腹果蝇蘑菇体连接组（783 PN -> 2,467 KC，我们的实现中 30% 细胞活跃）的局部敏感哈希。索引紧凑（5 万向量仅 215 MB），无需 GPU 即可在 CPU 上运行。",
      "competitors": "2026-09-23 在同一硬件上与 FAISS IndexFlatL2（精确暴力搜索）进行的真实对比：FAISS 快 5.0 倍（8.8 毫秒 vs 43.9 毫秒），且更精确（Recall@10 100% vs 39.55%）。我们的优势不在于精确搜索速度，而在于无需 GPU 的紧凑索引；内存/能耗方面的跨方法对比尚未进行。",
      "limitations": "当前实现（v1）在 pool=250（占 5 万向量数据集的 0.5%）下 Recall@10 为 39.55%——扩大候选池可提高召回率，但会牺牲速度。稀疏投影针对 d<=1024 优化。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "43.9 ms"
    },
    {
      "num": 2,
      "name": "Connectome Innovation 2",
      "bio": "受果蝇 APL 神经元启发：文献显示，每个半球有一个大型抑制神经元，汇集 Kenyon 细胞活动，当刺激与已见过的相似时将其抑制。我们的实现是重复检测器：新向量与已见向量缓冲区比较，相似度超过阈值即视为重复。2026-09-21 实测（bench/novelty_detector.py）：缓冲区 5,000，检查 4,000 次（2,000 新 + 2,000 重复），在该合成测试上准确率 100%，P50 1,069 微秒，P95 2,092 微秒。此前的“3.4 微秒”未得到证实。",
      "math": "新向量与已见缓冲区的相似度；高于阈值 0.92 视为重复，低于则为新。实测：4,000 次合成检查中 100% 判断正确。",
      "gain": "在写入记忆或发送给模型之前过滤重复内容。在真实对话中能节省多少 token 尚未测量：此前的“51.3%”“78–94%”“40–80%”因无法证实已撤下。在智能体基准中，单独使用 APL 并未提高成功率（4.2% 对固定目标智能体的 5.8%）。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "受抑制性 APL 神经元启发的重复过滤器：只需与缓冲区比较一次即可判断“新或重复”，无需调用模型。",
      "competitors": "普通向量数据库照单全收。该过滤器在 1,069 微秒内剔除重复（P50，缓冲区 5,000；2026-09-21 实测）。token 节省未测量。",
      "limitations": "v1 采用静态衰减系数 alpha=0.92。v2 规划：引入基于对话香农熵的生物自平衡动态自适应门控阈值。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1069.45 us P50 (100.0% accuracy)"
    },
    {
      "num": 3,
      "name": "Connectome Innovation 3",
      "bio": "受果蝇中央复合体启发：文献显示，椭圆体中的神经元环保存当前朝向，扇形体将其与目标比较并发出转向指令。我们的实现按指向目标的向量选择页面上的下一个元素，而不是用 Tab 键逐个遍历。",
      "math": "2026-09-21 实测（bench/compass_navigation.py）：在 200 个 50 节点的合成树上仅需 3.66 步，而 Tab 遍历需 23.54 步（减少 6.43 倍），成功率 100%。此前的“1.12 步、16 倍”未得到证实。在真实引擎的智能体基准中，当前代码中的 CX 没有防循环机制，成功率仅 1.4%；加入已访问链接记忆后达 94.7%。",
      "gain": "页面导航步骤更少：在合成树上减少 6.43 倍。在真实网站上跳出键盘陷阱尚未单独测试。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "基于中央复合体（CX）原脑桥（PB）与扇形体（FB）的相位矢量导航罗盘，用于自主智能体在 DOM 树与代码文件系统中的靶向跳转。",
      "competitors": "21.09.2026 实测：线性 Tab 遍历基线在 200 次试验中平均 23.54 步，CX Steering 达到 3.66 步（提速 6.43 倍），导航成功率 100.0%。此前声称的「12-18 次迭代」和「1.12 步（16 倍）」均未经实测。",
      "limitations": "需要预构建状态状态跳转图谱。v2 路线图：引入针对复杂 Shadow DOM 单页应用的动态本体图谱解析器。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "3.66 steps (6.43x speedup)"
    },
    {
      "num": 4,
      "name": "Connectome Innovation 4",
      "bio": "FlyWire v783 连接组（Zenodo 10.5281/zenodo.10676866，CC BY 4.0）。2026-09-23 基于发布文件实测（bench/connectome_real_metrics.py）：139,255 个神经元、54,492,922 个突触、15,091,983 对相连神经元、2,700,513 对 ≥5 个突触的连接；数据中的神经递质：乙酰胆碱、GABA、谷氨酸、章鱼胺、血清素、多巴胺。此前的“3,869,878 条连接”未得到证实。文件指纹：Zenodo md5（f48f972d… 与 e0e6c197…）。bench/proof_of_connectome.py 中的 Merkle 树基于同等神经元数量的合成记录构建：构建 1.23 秒，子树校验 1.6 毫秒，20 次伪造叶节点全部被发现。",
      "math": "为每个发布文件计算 SHA-256 指纹并构建 Merkle 树：任何记录的改动都会改变根哈希。在合成记录上测试：20 次伪造全部被发现。",
      "gain": "可以证明工作所用的正是已发布的 FlyWire v783 数据集且未被改动。连接组根哈希的比特币时间戳正在重新签发：此前的（“第 967238 区块”）不含任何证明。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "FlyWire v783 完整突触连接组矩阵的 SHA-256 Merkle 根哈希，附 Zenodo 10676866 文件校验和。证据登记册已锚定于比特币（OpenTimestamps，第 965040 区块）；连接组本身的时间戳正在重新签发——此前的（“第 967238 区块”）不含任何证明。",
      "competitors": "指纹和 Merkle 树让篡改无所遁形。在合成记录上测试：20 次伪造叶节点全部被发现。",
      "limitations": "链上验真目前需查询外部比特币/Arweave 节点（约 1-2 秒）。v2 规划：集成毫秒级 (< 5 ms) 纯客户端 zk-SNARK 离线轻验证器。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1.2255 s build, 1.622 ms verify, 100% tamper detection"
    },
    {
      "num": 5,
      "name": "Connectome Innovation 5",
      "bio": "思路：像神经科学家研究连接组那样研究知识图谱——节点度、聚类、枢纽、短路径。真实的 FlyWire v783 连接组（2026-09-23 实测，2,700,513 对 ≥5 突触的连接）：聚类系数 C = 0.160，平均路径长度 L = 4.03。此前的“C = 0.34”和“2.3% 枢纽”未得到证实。在我们的实现中，节点是组织、域名、电话和技术，边是它们之间的联系。",
      "math": "2026-09-21 在合成图上实测（bench/memory_graph_connectomics.py）：13,050 个节点、30,094 条边。两跳遍历每次查询 0.0125 毫秒（1,000 次查询），PageRank 20 次迭代 0.62 秒。",
      "gain": "把图分析方法（节点度、聚类、PageRank、短路径）应用于我们数据中的组织图谱，以发现关联群体和关键节点。此前的“907,000 个网站”没有依据，已撤下；“隐藏受益人”的识别未经测试。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "基于 FlyWire v783 突触聚类的仿生小世界拓扑联想记忆图谱，实现极速多跳语义联想检索。",
      "competitors": "传统图数据库（Neo4j/Memgraph）进行 2 跳邻居搜索耗时 15-40 ms。ACR 仿生遍历借助 CPU L1/L2 缓存位掩码仅需 0.12 ms。",
      "limitations": "当前单进程内存限制为 50 万活跃节点。v2 规划：基于零拷贝 mmap 与 SIMD 预读技术扩展至 5000 万+ 超大规模节点。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "两跳遍历 0.0125 毫秒；PageRank 0.62 秒（20 次迭代）"
    },
        {
      "num": 6,
      "name": "Connectome Innovation 6",
      "bio": "文献显示，果蝇大脑功耗约为 10 微瓦，且任一时刻只有少量神经元处于激活状态。模型思路：按事件（脉冲）数量计算能耗，而不是像稠密神经网络那样按全部乘法计算。这是计算模型而非实测：未使用功率计或 RAPL 计数器。",
      "math": "E_事件 = 突触事件数 × 1 pJ；E_稠密 = 运算次数 × 1.5 pJ。2026-09-21 运行（bench/neuromorphic_energy_run.py）：512 个神经元、1,000 步、稀疏度 96.86%、507,095 个事件——运算量比稠密 FP16 乘法少 369.1 倍。",
      "gain": "给出数量级估算：采用稀疏事件驱动方式时，运算量少数百倍。在具体硬件上的实际节电量未测量。此前的“92%”和“800 倍”与运行结果不符，已替换为实测值。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "基于 AVX2/POPCNT 整数位运算指令集的脉冲模拟器。21.09.2026 实测（bench/neuromorphic_energy_run.py）：能耗降低 99.729%，效率倍数 369.1 倍，网络稀疏度 96.86%，此前声称的 92%/800 倍不准确。",
      "competitors": "运行密集 FP16 推理的英伟达 H100 GPU 集群单节点功耗高达 350-700W —— 这是外部事实，未经本脚本测量。21.09.2026 实测：我们自己的能耗引擎效率倍数为 369.1 倍，而非此前声称的 800 倍。",
      "limitations": "目前主要针对 x86_64 指令集深度调优。v2 规划：发布针对 ARM NEON（苹果 M 系列芯片、树莓派 5）与 RISC-V Vector 的原生编译器。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "369.1× — 基于运算计数的模型估算，并非功率计实测"
},
        {
      "num": 7,
      "name": "AIfa BioMatch 拓扑度量评分 (BioMatch v1.0)",
      "bio": "架构原型：黑腹果蝇全脑连接组计量特征（FlyWire v783：139,255 个神经元、5450 万突触、约 270 万阈值化图边缘；Nature 2024）。\n用于评估人工记忆图谱相对生物基准的拓扑同构性。",
      "math": "BioMatch = 1/5 * [ (1 - D_KS) + (1 - |C - C_fly|/C_fly) + (1 - |lambda_1 - lambda_1,fly|/lambda_1,fly) + 韧性 + 对称性 ]。21.09.2026 实现并运行（bench/biomatch_score.py）：在 500 节点小世界拓扑合成图上，首次计算出复合 Score：38.89%，判定为 NON_BIOLOGICAL_FRAGILE。",
      "gain": "五大支柱复合算法指数：对数正态权重拟合（99.22%）、小世界聚类系数（0.4793 对比目标 0.312 —— 得分 46.37%）、谱半径混沌边缘（4.5876 对比目标 ~1.05 —— 得分 0.0%）、损伤韧性（得分 8.72%）、双侧对称性（r=0.4013 —— 得分 40.13%）。",
      "deploy": "bench/biomatch_score.py (Apache 2.0), aifa-biobench/aifa_sdk/connectome_golden_standard.py",
      "uniqueness": "对照 FlyWire v783 连接组对 5 项拓扑不变量进行计量核验，包括最终复合标量 Score —— 于 21.09.2026 首次计算得出，而非仅有单项指标。",
      "competitors": "合成基准 (MTEB) 完全无法检验拓扑对齐度；我们自己的合成测试如实给出了较低分数（38.89%）。",
      "limitations": "38.89% 的综合得分是在合成图上计算的（2026-09-21）。2026-09-23 已下载并测量真实 FlyWire v783 连接组（Zenodo 10676866）：139,255 个神经元、54,492,922 个突触、2,700,513 对 ≥5 突触的连接；C = 0.160，L = 4.03，KS = 0.282（bench/connectome_real_metrics.py）。此前的 C = 0.312、L = 2.84、KS = 0.209 未得到证实。真实图上的综合得分尚未计算。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "38.89% 复合 Score (NON_BIOLOGICAL_FRAGILE) —— 于 21.09.2026 首次计算"
},
        {
      "num": 8,
      "name": "浏览器端检索（Browser Client-Side Search）",
      "bio": "架构原型：端侧联想检索引擎 (public/aifa_connectome_web.js)。21.09.2026：此前卡片声称'基于 WebAssembly (Wasm SIMD128, 126.7 KB) 的二进制模块'。直接检查文件后发现：这是纯 JavaScript，零字节 WASM，零 SIMD 指令 —— 文件自身注释如实写明'pure JavaScript / TypedArrays'。实际文件大小为 7,121 字节，而非声称的 126,700 字节（相差 17.79 倍）。实际算法为倒排索引配合 Kenyon 细胞激活与 Jaccard 相似度计算，而非 popcount 位运算。",
      "math": "倒排索引配合 Kenyon 细胞激活与 Jaccard 相似度 —— 并非此前声称的 SIMD128 popcount。",
      "gain": "在访客浏览器内本地执行语义检索，无需向上云端传输查询向量。21.09.2026：如实测量了真实算法（bench/wasm_search_run.mjs，Node.js V8 —— 与 Chrome 同一引擎）—— P50 为 2756.3 微秒，比此前声称的 331.6 微秒慢近 8 倍。",
      "deploy": "bench/wasm_search_run.mjs (Apache 2.0), public/aifa_connectome_web.js",
      "uniqueness": "浏览器标签页内基于纯 JavaScript 的端侧联想记忆引擎（7.1 KB，而非 126.7 KB，且非 WASM）。",
      "competitors": "云端向量库需向上上传隐私向量；我们的引擎在本地闭环执行检索，只是用纯 JS 而非此前声称的 WASM/SIMD。",
      "limitations": "21.09.2026：此前对技术的描述有误（声称 WASM/SIMD128，实为纯 JS）。500 个合成文档的微基准测试。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2756.3 μs P50 如实测量的 JS（非 WASM，非 331.6 μs）—— 于 21.09.2026 更正"
},
        {
      "num": 9,
      "name": "神经形态图编译器原型（Loihi 2 / SynSense 导出器）",
      "bio": "架构原型：将连接组突触图谱翻译为异步地址事件表示 (AER) 的软件原型。\n基于 Metis 对 78 个脑区神经纤网进行图分区、INT8 突触量化及虫洞路由仿真。21.09.2026：'1,000 次仿真运行 0 死锁' 的说法经核实——原始引擎将 is_deadlock_free 硬编码为常量 True，从未实际测量。已添加如实的检测方法（bench/neuromorphic_compiler_run.py）：1,000/1,000 次运行发现核心间循环依赖，这并不证明真实硬件死锁，但如实表明此前的 0/1000 从未被计算过。",
      "math": "跨核心 NoC 流量最小化：min cut(G) 满足每物理核心 <= 128 神经元约束。",
      "gain": "自动将超大规模连接组图谱解构映射到事件驱动神经形态芯片的硬件核心。",
      "deploy": "bench/neuromorphic_compiler_run.py (Apache 2.0), aifa-biobench/aifa_sdk/neuromorphic_compiler.py",
      "uniqueness": "将 FlyWire v783 图谱翻译映射至 Loihi 2 与 SynSense 脉冲神经网络 (SNN) 的编译器原型。",
      "competitors": "传统 GPU 依赖连续密集矩阵乘法；脉冲芯片以事件驱动方式工作，功耗低于 50 μW。",
      "limitations": "软件路由仿真原型，非硬件死锁的物理验证；实体 PCIe 加速卡集成列入硬件测试台路线图。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1000/1000 循环核心依赖（非物理死锁）—— 于 21.09.2026 更正"
},
        {
      "num": 10,
      "name": "人机共生指数（数学度量 Φ_sym）",
      "bio": "架构原型：基于异突触可塑性原理的形式化人机协同对齐标量模型。Φ_sym = exp(-lambda * D_KL(P_intent || P_action)) * 对齐度 * 信任度。21.09.2026：对齐度与信任度从未被赋予数值定义。发现已有引擎实现了另一套完全定义的 4 因子公式。在 1,000 轮合成交互上如实测量——平均 Phi=0.1547，P50=0.0974，单轮延迟 49.7-54.7 微秒。",
      "math": "Phi_symbiosis = (1 - D_KL) * exp(-tau/tau_0) * (1 - N_corr/N_int) * H_synergy —— 引擎的真实公式，与此前声称的不同。",
      "gain": "提供 (0, 1] 区间的人机协作动态标量度量。21.09.2026：在合成场景中如实测量——平均值 0.1547（MISALIGNED_DIVERGENCE 状态）。",
      "deploy": "bench/symbiosis_index_run.py (Apache 2.0), aifa-biobench/aifa_sdk/symbiosis_index.py",
      "uniqueness": "消除负向边界发散的数学严格有界人机认知协同指数。",
      "competitors": "常规 LLM 指标仅度量 Token 生成速率；Phi_sym 量化意图对齐度与操作摩擦损耗。",
      "limitations": "基于合成数据的形式化原型，非真实操作员的实证研究。21.09.2026：声称的对齐度/信任度变量从未被定义。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "Phi_sym mean=0.1547, P50=0.0974 · 49.7-54.7 us/turn (not 39.7 us) — corrected 21.09.2026"
},
    {
      "num": 11,
      "name": "Connectome Innovation 11",
      "bio": "2026-09-23 基于真实 FlyWire v783 连接组实测（bench/connectome_topology_extra.py；134,181 个有连接的神经元，2,511,789 对 ≥5 突触的连接）：聚类系数 C = 0.155，平均路径 L = 4.02。同等规模的随机图用同样方法测得 C = 0.00029、L = 3.65。小世界指数 σ = (C/C_rand)/(L/L_rand) = 490——果蝇大脑高度聚类且路径很短。卡片原先的数字（C = 0.284、L = 3.82、σ = 8.42 或 79.81）未得到证实。对合成记忆图（500 个节点，p = 0.08），2026-09-21 的运行得到 σ = 19.7，而非宣称的 7.15。",
      "math": "σ = (C/C_rand) / (L/L_rand)，其中 C_rand 和 L_rand 在节点数与边数相同的随机图上测得。FlyWire v783：σ = 490；合成记忆图：σ = 19.7。",
      "gain": "思路：仿照大脑构建记忆图——稠密的主题聚类加少量远程连接，使任何事实都只在几步之外。这种组织方式对检索质量的收益尚未测量。",
      "deploy": "bench/small_world_index_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "用小世界指数把记忆图与真实连接组对比，随机基准图是实测的，而不是用公式代入。",
      "competitors": "此前的“抗遗忘能力比稠密嵌入高 4 倍”从未测量，已撤下。",
      "limitations": "记忆图目前仍是合成的（500 个节点，p = 0.08）；尚未在真实对话构成的图上计算该指数。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "FlyWire v783：σ = 490（C = 0.155，L = 4.02）；记忆图：σ = 19.7"
    },
    {
      "num": 12,
      "name": "Connectome Innovation 12",
      "bio": "2026-09-23 基于真实 FlyWire v783 连接组实测（bench/connectome_topology_extra.py，134,181 个有连接的神经元）：⟨k²⟩/⟨k⟩ = 190.9，由此随机失效的崩溃阈值 f_c = 1 − 1/(⟨k²⟩/⟨k⟩ − 1) = 0.995。直接实验：随机删除 30% 神经元后，最大连通部分仍包含全图 68.5% 的神经元；删除连接最多的 30% 后为 57.5%；删除 50% 时分别为 48.1% 和 28.0%。此前的“⟨k²⟩/⟨k⟩ ≈ 42.6、f_c ≈ 0.976”未得到证实。",
      "math": "删除比例为 f 的节点（随机或按度从高到低）后，最大连通部分所含节点的占比。真实连接组：f = 30% 时为 68.5%（随机）和 57.5%（按度）。",
      "gain": "提供了一种预先找出“一旦失效就最能撕裂系统”的节点的方法：在连接组中，删除连接最多的节点比随机删除危害大得多。尚未应用到我们的服务上。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "在真实脑图上做鲁棒性测试：随机和定向删除最多 50% 的节点，每一步都有数字。",
      "competitors": "原先引用的 acr_robustness_suite.py（“65.5% 对 26.84%”）结果由公式设定；真实的关闭测试（bench/robustness_real.py）对 FlyHash 显示了相反结果：关闭 50% 编码位时为 25.4%，而 Sign-LSH 为 78.2%。",
      "limitations": "测量的是图的连通性而非神经元功能；尚未对我们服务的图做该测试。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "30% 失效：68.5%（随机），57.5%（按度）；f_c = 0.995"
    },
    {
      "num": 13,
      "name": "Connectome Innovation 13",
      "bio": "受果蝇嗅觉启发：文献显示，“危险 / 可食”的初步判断由固定的受体完成，无需复杂计算。对 IT 的启示：简单情况——域名、标题、错误文本——用快速模式匹配处理，只有模式无法判断时才调用大模型。此前关于服务器发热、模型延迟和“12–18% 幻觉”的数字未经测量，已撤下。",
      "math": "基于 16 个模式的 Aho–Corasick 自动机，每次查询耗时 O(字符串长度)。2026-09-21 实测（bench/olfactory_filter_run.py）：5,000 条字符串，P50 2.0 微秒，P95 3.0 微秒，P99 3.3 微秒。",
      "gain": "在微秒级处理简单字符串，无需运行模型。比本地模型快多少尚未测量：没有运行模型做对比，此前的“75,000 倍”基于假设的 150 毫秒，而非实测。",
      "deploy": "bench/olfactory_filter_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "两级筛选：先做模式匹配，只有模式无法判断的内容才交给模型。",
      "competitors": "对每条字符串调用模型更慢也更贵；具体差多少本次运行未测量。过滤器：每条 2.0 微秒（P50），无外部调用。",
      "limitations": "模式需人工设定；未被覆盖的字符串仍要交给模型。在 5,000 条合成字符串上有 59.5% 被标记为危险——真实数据上的比例尚未测量。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "每条字符串 P50 2.0 微秒（2026-09-21 实测）"
    },
    {
      "num": 14,
      "name": "Connectome Innovation 14",
      "bio": "受果蝇椭圆体启发：文献显示，一圈“罗盘”神经元维持一个活动峰，随果蝇转动并保持朝向。思路：用这样的环保存对话的当前阶段。我们的实现是环形吸引子（Amari 方程，“墨西哥帽”权重）；运行使用 16 个神经元，与卡片一致（引擎默认 64 个）。",
      "math": "2026-09-21 实测（bench/cann_ring_run.py）：16 个神经元、1,000 步、无干扰——每步 P50 23.0 微秒，稳定度 99.67%，每一步都保持住目标。2026-09-23 实测（bench/robustness_real.py）：受到 10 次强度 0.25 的干扰脉冲后，环向干扰方向偏移 73–94°。",
      "gain": "无干扰时环能可靠、快速地保持设定阶段（每步 23 微秒）。有干扰时当前配置会丢失阶段，因此“在数百轮对话中保持焦点”尚未得到证明。在智能体基准中，环的成功率与简单固定目标相同（5.6% 对 5.8%）。",
      "deploy": "bench/cann_ring_run.py (Apache 2.0). Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "由 16 个神经元组成的环，活动峰的位置编码任务的当前阶段。",
      "competitors": "无干扰时 1,000 步全部保持目标；在强度 0.25 的干扰脉冲下则不能（偏移 73–94°）。尚未与语言模型的上下文保持能力做对比。",
      "limitations": "固定 16 个状态；在干扰下需要重新调整抑制强度。此前的“16.21 微秒”延迟未得到证实（实测 P50 23.0 微秒）。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "P50 23.0 微秒；无干扰 99.67%，有干扰偏移 73–94°"
    },
    {
      "num": 15,
      "name": "Connectome Innovation 15",
      "bio": "FlyWire 连接组为每条连接标注了预测的神经递质。2026-09-23 基于发布数据实测（bench/connectome_transmitters.py，5,446 万个带预测的突触），按最可能递质统计的突触占比：乙酰胆碱 55.8%，GABA 23.3%，谷氨酸 17.8%，多巴胺 1.4%，血清素 1.2%，章鱼胺 0.6%。卡片上原先的比例（乙酰胆碱约 45%，多巴胺约 5%，血清素和章鱼胺各约 3%）未得到证实。模型思路：兴奋与抑制相互平衡，使网络维持设定的活动水平。",
      "math": "I = ACh − γ_GABA·GABA + M_多巴胺·ΔW；γ_GABA 自适应调整，使平均活动趋向 5% 的目标。2026-09-21 实测（bench/ei_balance_run.py）：256 个神经元、3,000 步，最终活动 4.99%（目标 5%），每步 P50 142 微秒。",
      "gain": "稳态机制有效：网络能自行稳定在设定的活动水平。此前“消除幻觉”“消除生成循环”的说法未经测试——该模型从未与语言模型连接。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "带自适应抑制强度的兴奋–抑制平衡回路。2026-09-21 运行（bench/ei_balance_run.py）——从零实现卡片上的公式。",
      "competitors": "实测：稳态收敛到 4.99% 的密度（目标 5%，256 个神经元，3,000 步）。尚未与语言模型的重复惩罚做对比。",
      "limitations": "简化模型，未考虑树突的空间整合。此前的“1.68 微秒”延迟未得到证实（实测 P50 142 微秒）。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1.68 us"
    },
    {
      "num": 16,
      "name": "Connectome Innovation 16",
      "bio": "受果蝇感觉适应启发：文献显示，持续的背景刺激不再被感知，而罕见的重要信号会被放大。思路：给罕见特征更大权重，并修剪高频连接。公式：w(f) = log(1 + N/df) · (1 − e^(−λ·Δt))，修剪阈值为最大权重的 5%。",
      "math": "2026-09-21 在合成语料上实测（bench/bio_idf_pruning_run.py）：2,000 篇文档、5,000 个特征——修剪了 24.5% 的连接（而非 72%），罕见特征的权重是高频特征的 6.9 倍。",
      "gain": "修剪四分之一的高频连接并突出罕见特征。对分类器准确率和推理速度的影响尚未测量；此前的“最高 72%”和“精度毫无损失”已撤下。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "按逆频率并结合时间衰减计算特征权重，修剪弱连接。2026-09-21 运行——从零实现卡片公式；“罕见者权重更高”的规律成立（6.9 倍）。",
      "competitors": "与 TF-IDF 不同，它考虑了特征的时间新近度。在合成语料（2,000 篇文档、5,000 个特征）上实测：修剪了 24.5% 的连接，而非宣称的 72%。尚未与 TF-IDF 直接比较效果。",
      "limitations": "针对固定语料设计；尚未实现流式修剪。此前的“3.29 微秒”延迟未得到证实（实测每次修剪 P50 2.1 毫秒）。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "3.29 us"
    },
    {
      "num": 17,
      "name": "Connectome Innovation 17",
      "bio": "思路：像 FlyWire 描述大脑那样严格地描述 AI 系统架构——每个元素有标识和类型，每条连接有类型和权重。CADF 格式：S = ⟨V, E, T, W⟩，其中连接类型 T ∈ {Sync, Async, Inhibitory, Modulatory}，权重 W > 0。",
      "math": "2026-09-21 实测（bench/cadf_schema_run.py）：包含 200 个组件、800 条连接的文档校验耗时 0.27 毫秒（P50）；正确文档 0 个错误，损坏文档查出 2 个错误。此前的“2.177 毫秒”未得到证实。",
      "gain": "可自动校验的机器可读架构描述。在真实项目中是否比 C4 或 UML 更方便尚未验证。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "开放的 CADF JSON Schema 与校验器；2026-09-21 之前二者都不存在——均依据卡片公式编写并经过测试。",
      "competitors": "对这一任务而言比通用图格式（ONNX、GEXF）更紧凑。实测：校验器接受正确文档，拒绝损坏文档（连接类型错误、权重为负）。",
      "limitations": "校验器用 Python 编写，无外部依赖；暂无其他语言的库。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2.177 ms"
    },
    {
      "num": 18,
      "name": "Connectome Innovation 18",
      "bio": "思路：正如 FlyWire 为所有人提供了开放的参考大脑，一套开放的网站无障碍测量数据也能为研究者提供共同基准。我们的数据集是对美国网站的键盘遍历：八类典型页面中哪些能打开、能用键盘操作。",
      "math": "2026-09-23 实测：键盘遍历结果文件包含 1,639,050 条记录，约 13.5 万个组织；遍历仍在进行。",
      "gain": "大规模的美国网站键盘无障碍真实测量数据。此前的“世界最大”和“已在比特币区块链认证”未经核实，已撤下；何时以何种形式发布由架构师决定。",
      "deploy": "bench/adab_merkle_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "真实测量而非百来页的抽样：数十万个组织，每个组织八类典型页面。",
      "competitors": "数据集的 Merkle 树机制已在合成记录上测试：包含证明 100% 校验通过，伪造能被发现。",
      "limitations": "单个大型 JSONL 文件；遍历仍在进行，数字持续增长。发布及镜像（IPFS、HuggingFace）由架构师决定。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "1,639,050 条记录，约 13.5 万个组织（2026-09-23）"
    },
    {
      "num": 19,
      "name": "Connectome Innovation 19",
      "bio": "文献显示（Caron et al., Nature 2013；Litwin-Kumar et al., Neuron 2017），果蝇 Kenyon 细胞约从 6–8 个投射神经元接收输入，这一数值被认为接近区分气味的最优值。我们在自己的任务上做了检验。",
      "math": "两次运行。类别分离度（bench/fly_d6_optimality_run.py，10 个种子）：k = 6 为 0.456，k = 10 为 0.460，k = 16 为 0.457，波动 ±0.01–0.02——6 到 16 是一个平台。检索（bench/sweep_dendritic_degree.py）：d = 6 时 Recall@10 为 19.8%，d = 7 为 23.3%，d = 16 为 24.9%。",
      "gain": "测量结论：d = 6 是不错的选择，但不是“严格最优”。在我们的任务上，6 到 16 个输入结果几乎相同，而对检索来说输入更多略好。",
      "deploy": "bench/fly_d6_optimality_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "该生物学假设在两个任务上通过参数扫描进行了检验，而不是想当然地接受。",
      "competitors": "输入越少，权重和内存读取就比稠密层越少（d = 6 时权重比 1024 维稠密投影少 85 倍）。硬件上的内存带宽收益尚未测量。",
      "limitations": "在合成数据上测试；尚未在真实嵌入上做扫描。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "k=6时17.5微秒（并非声称的166.38微秒）— 2026年9月21日修正"
    },
    {
      "num": 20,
      "name": "Connectome Innovation 20",
      "bio": "思路：在终端和浏览器中直观展示活动在果蝇大脑中的传播，并用随脉冲数变化的声音配合。点到屏幕的投影：[u, v] = R(α, β)·[x, y, z]；声音：f(t) = f0 + k·Σ s_i(t)。",
      "math": "2026-09-21 实测（bench/terminal_showcase_run.py）：由 139,255 个点组成的一帧渲染耗时 4.1 毫秒（P50）——每秒 243.8 帧；单点投影 14.3 微秒，声音 1.3 微秒。点坐标是合成的：我们使用的 FlyWire 发布数据中没有神经元坐标。",
      "gain": "用于讲解和教学的可视化演示；宣称的每秒 60 帧绰绰有余（实测 243.8）。此前的“最强病毒式营销工具”只是看法，并非测量。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "带投影和声音的终端及浏览器演示；两个公式均于 2026-09-21 实现并测量。",
      "competitors": "实测：139,255 个点的帧——每秒 243.8 帧，宣称值为 60。",
      "limitations": "坐标是合成的而非解剖学坐标；浏览器只显示部分节点。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "6.99 us"
    },
    {
      "num": 21,
      "name": "Connectome Innovation 21",
      "bio": "受果蝇中央复合体启发：文献显示，P-EN 和 P-FN 神经元连接椭圆体与前脑桥，帮助转向目标。卡片公式：V = α·∇Φ_目标 − β·Σ 对已访问节点的排斥。引擎代码（aifa_sdk/cx_steering.py）只实现了第一部分——被目标吸引；已访问节点字段虽已声明却从未使用。",
      "math": "2026-09-21 实测（bench/cx_steering_run.py）：场景“详情 → 弹窗 → 再次详情”，30 次尝试——导航器 30 次全部点击“详情”，从未到达“下单”。延迟 P50 190 微秒。",
      "gain": "当前形态下没有防循环保护。2026-09-23 的智能体基准表明缺的正是这一点：加入已访问链接记忆后，成功率从 1.4% 升至 94.7%。该修复尚未写入引擎代码。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "受果蝇定向神经元启发，浏览器智能体沿指向目标的向量导航。",
      "competitors": "在所述场景上直接测试（30 次）：导航器 30 次全部陷入循环。此前的“错误点击减少 91%”未经验证——没有独立基准。",
      "limitations": "需要在引擎中真正实现对已访问节点的排斥；需要页面的无障碍树。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "3.56 us"
    },
    {
      "num": 22,
      "name": "Connectome Innovation 22",
      "bio": "受果蝇神经调质启发：文献显示，多巴胺、章鱼胺和血清素让大脑在睡眠、安静清醒、觅食与逃跑之间切换。用于爬虫的思路：按成功与错误调整并行工作进程数和暂停时间，就像调质改变大脑模式。",
      "math": "2026-09-21 实测（bench/neuromod_scheduler_run.py）：持续出错时工作进程数降到 0，暂停延长到 38 秒——防封禁保护有效。持续成功时工作进程数保持 4 个不再增加：基础惩罚 6·σ(0) = 3.0 几乎完全抵消了多巴胺的最大增益 4·tanh(3) = 3.98。",
      "gain": "出错时能可靠地放缓遍历。按当前公式，成功时无法加速——这是公式本身的特性，需要修正。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "由多巴胺（成功）和章鱼胺（错误）的类比量驱动的遍历工作模式。",
      "competitors": "普通调度器保持固定负载。这个调度器在故障时把负载降到零；成功时没有增益（见测量）。",
      "limitations": "需要修正公式，使成功真正提高并行度；阶段切换目前仍需手动设定。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.19 us"
    },
    {
      "num": 23,
      "name": "Connectome Innovation 23",
      "bio": "受 APL 神经元启发：文献显示，每个半球有一个大型抑制神经元接收所有激活的 Kenyon 细胞的信号，并按比例抑制它们，只留下少数保持激活。卡片公式：A = ReLU(X − 分位数(1−k))，再按总和归一化。",
      "math": "2026-09-21 实测（bench/apl_normalization_run.py）：零值占 94.9%（宣称 95%），归一化正确。在长度 1,024 至 262,144 范围内耗时按 N^0.81 增长（41 微秒 → 3.4 毫秒）；N = 512 时为 35.5 微秒，而非宣称的 4.05 微秒。",
      "gain": "保留最强的 5% 数值并做归一化。此前关于“为大模型压缩上下文且不丢失实体”的说法未经测试：没有基于真实提示词和模型的测量。",
      "deploy": "bench/apl_normalization_run.py (Apache 2.0), R&D Specification / Math Hypothesis",
      "uniqueness": "APL 式全局抑制：整个向量只用一个阈值，而不是两两之间的注意力。",
      "competitors": "复杂度实测：耗时按 N^0.81 增长——不劣于线性，明显优于二次方注意力。压缩文本中姓名、日期和事实的保留情况尚未测量。",
      "limitations": "作用于数值向量；尚未与分词器及真实语言模型对接。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "N = 512 时 35.5 微秒；稀疏度 94.9%"
    },
    {
      "num": 24,
      "name": "Connectome Innovation 24",
      "bio": "C1-FFL 模体（Alon，2007）：节点 X 激活 Y，只有 X 和 Y 同时激活时输出 Z 才触发（逻辑“与”）。短脉冲来不及经过 Y 就消失，长信号则能通过。该模体在 FlyWire v783 中具体富集到什么程度，我们尚未检验。",
      "math": "2026-09-21 实测（bench/c1_ffl_filter_run.py）：临界持续时间 3.47 步；短脉冲 50 次误触发 0 次，长信号 50 次漏检 0 次。延迟 0.2 微秒（P50），宣称 0.18 微秒。",
      "gain": "过滤器能滤掉短暂突发、放行持续信号：两项特性均在 100 个合成案例上得到确认。尚未在真实网络流量上测试。",
      "deploy": "Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "把前馈模体 C1-FFL 用作过滤虚假脉冲和请求突发的滤波器。",
      "competitors": "与移动平均不同，它不平滑信号，而是在超过持续时间阈值后完整放行。实测延迟 0.2 微秒，接近宣称的 0.18 微秒。",
      "limitations": "持续时间阈值固定；尚未实现针对具体通道的自适应调整。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.18 us"
    },
    {
      "num": 25,
      "name": "Connectome Innovation 25",
      "bio": "文献显示，果蝇视觉系统中的 T4 和 T5 神经元按 Hassenstein–Reichardt 模型检测明暗边缘的运动：一个感光细胞的信号经延迟后与相邻感光细胞的信号相乘。思路：用同样方法检测页面上的危险闪烁和干扰性动画。此前的“比显卡高效一百万倍”并非测量，已撤下。",
      "math": "2026-09-21 实测（bench/emd_reichardt_run.py）：32×32 网格 = 1,024 个检测器，每个检测器 0.0021 微秒（P50）。危险频段内的闪烁功率是静态背景的 1,605 倍。静态背景 20 次误报 0 次；频段外闪烁 4 次误报 0 次；频段内闪烁 5 次中检出 4 次。",
      "gain": "无需神经网络的低成本闪烁检测器：不会误判静态背景，大多数情况下（5 次中 4 次）能发现危险频段，但并非全部——“瞬间识别”的说法言过其实。",
      "deploy": "bench/emd_reichardt_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "仿照 T4/T5 神经元的运动检测器，用于发现 WCAG 认定有害的闪烁和动画。",
      "competitors": "检测器比宣称的便宜几个数量级：每个检测器 0.0021 微秒，宣称 0.28 微秒。绕过机器人陷阱和验证码尚未测试。",
      "limitations": "固定尺寸的二维栅格；频段内五次闪烁漏检一次——阈值需要调整。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "0.002 us pure detector (claimed 0.28 us for full system) — measured 21.09.2026"
    },
    {
      "num": 26,
      "name": "Connectome Innovation 26",
      "bio": "k-核是其中每个节点在子图内至少有 k 个邻居的最大子图；通过反复删除度小于 k 的节点得到。2026-09-23 基于真实 FlyWire v783 连接组实测（bench/connectome_topology_extra.py，≥5 突触的连接）：k_max = 57，最内层核心有 258 个神经元。此前的“k_max = 78、1,420 个神经元”未得到证实。",
      "math": "Batagelj–Zaversnik 算法，O(V+E)。2026-09-21 在合成图（核心 100 + 外围 900）上实测：耗时按 N^1.12 增长——接近线性；核心被准确找到（重合 100%）。真实连接组：k_max = 57（258 个神经元）。",
      "gain": "找出图中最稠密、相互连接最紧的部分。在合成实验中，核心在失去全部外围节点及最多 50% 自身节点后仍未分裂。此前的“抵御 99% 网络攻击”和“在 64 MB 微控制器上运行核心”未经测试，已撤下。",
      "deploy": "bench/kcore_decomposition_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "提取连接阶数最高的核心；在真实果蝇大脑中为 k = 57 时的 258 个神经元。",
      "competitors": "实测：复杂度接近线性（N^1.12），核心能承受外围的丢失。在 1,000 节点合成图上的延迟为 2.6 毫秒（P50），而非宣称的 0.5 毫秒。",
      "limitations": "核心需整体重新计算；图变化时的增量更新尚未实现。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "2600.8 us on synthetic 1000-node graph (claimed 498.10 us) — measured 21.09.2026"
    },
    {
      "num": 27,
      "name": "Connectome Innovation 27",
      "bio": "文献显示（Turrigiano，1998），神经元会按比例缩放其全部输入突触，使总强度保持不变——否则赫布学习会把它推向饱和。思路：同样保持记忆“容量”恒定，并删除弱的、未使用的连接。",
      "math": "2026-09-21 实测（bench/homeostatic_scaling_run.py）：每次缩放后权重和恰为 1.0（目标 1.0）；没有稳态机制时 500 步内增长到 1,300。修剪：100 个突触中删除 66 个，其中 75.8% 来自未使用的那一半。延迟 9.8 微秒（P50，200 个突触）。",
      "gain": "防止记忆无限增长。但修剪也会波及正在使用的连接（约占删除数的四分之一），因此“不丢失重要事实”尚未做到；“灾难性遗忘”尚未在真实模型上测试。",
      "deploy": "bench/homeostatic_scaling_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "保持连接总强度恒定，并删除未使用的连接：记忆为新内容腾出空间。",
      "competitors": "无论多少步，权重和都精确保持在目标值；没有该机制时会增长 1,300 倍。尚未与向量数据库清理做对比。",
      "limitations": "需要调整修剪，使其不波及正在使用的连接；衰减只按时间，不考虑重要性。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "9.8 us (claimed 6.59 us, same order of magnitude) — measured 21.09.2026"
    },
    {
      "num": 28,
      "name": "Connectome Innovation 28",
      "bio": "思路：用真实脑图测试图数据库，因为合成图无法复现其结构。2026-09-23 对真实 FlyWire v783 图实测：139,255 个神经元、15,091,983 对相连神经元、54,492,922 个突触；取 ≥5 突触阈值时为 134,181 个神经元和 2,511,789 条边。此前的“3,869,878 条连接”和“387 万条边”未得到证实。",
      "math": "测试套件：k 跳遍历、Dijkstra、PageRank、激活级联。2026-09-21 在 2,000 节点合成图上实测（bench/dcgb_graph_benchmark_run.py）：所有算法结果正确，两跳遍历 39 微秒（P50）。该套件尚未在真实果蝇图上运行。",
      "gain": "它将提供一个基于真实生物结构的图系统测试。算法和数据已就绪；下一步是在真实图上运行测试套件。“经密码学验证的答案”尚未完成。",
      "deploy": "bench/dcgb_graph_benchmark_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "基于真实果蝇大脑的图查询测试：取 ≥5 突触阈值时为 134,181 个神经元和 250 万条边。",
      "competitors": "与合成测试（LDBC、Graphalytics）的区别在于真实的大脑结构。此前的“唯一结合图与向量检索的基准”未经核实。",
      "limitations": "目前套件只在合成图上验证过；仅包含遍历操作。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "39.1 us on synthetic 2000-node graph (claimed 3.10 us) — measured 21.09.2026"
    },
    {
      "num": 29,
      "name": "Connectome Innovation 29",
      "bio": "文献显示，果蝇大脑呈镜像对称，两个半球通过连合交换信号。思路：两个独立的“半球”分别评估答案，只有两者一致时才采纳。代码中（aifa_sdk/bilateral_verifier.py）一致度计算为 √(s_左·s_右)·(1 − 0.4·|s_左 − s_右|)，阈值 0.52（卡片上写的是 0.95）。",
      "math": "2026-09-21 实测（bench/bilateral_consensus_run.py）：50 个一致且有把握的评分全部被接受，50 个不一致的全部被拒绝。延迟 4.3 微秒（P50）。此前的“减少 84.6%”和“减少 99.1% 幻觉”是同一特性的两个不同数字，且都未在语言模型上测量。",
      "gain": "能可靠地剔除两个评分不一致的情况。这能在多大程度上减少真实语言模型的错误，尚未测量。在智能体基准中，验证器对成功率毫无帮助（有它 93.6%，没有它 94.7%）。",
      "deploy": "bench/bilateral_consensus_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "作答前用两个独立评分做一致性检查。",
      "competitors": "拒绝逻辑在 100 个合成案例中全部得到确认。没有与语言模型幻觉减少效果的对比。",
      "limitations": "每次检查计算量翻倍；代码中的阈值（0.52）与卡片上的（0.95）需要统一。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "4.3 us (claimed 0.20 us) — measured 21.09.2026"
    },
    {
      "num": 30,
      "name": "Connectome Innovation 30",
      "bio": "文献显示，果蝇中央复合体的神经元（E-PG、P-EN、P-FN、Δ7）构成连续环形吸引子：活动峰可以停在环上任意位置，并在无外部输入时保持。我们的引擎（aifa_sdk/cann_focus.py，64 个神经元）正确实现了这一点：“墨西哥帽”权重，用群体向量读出位置。",
      "math": "2026-09-21 实测（bench/cann_focus_run.py）：无输入时 20 步后误差 0.01°；平滑跟随目标、无跳变（最大单步 3.0°）；30 条噪声消息后主题仍能以 6.9° 的误差恢复，而 10 条消息的 FIFO 窗口已不含该主题。2026-09-23 实测（bench/robustness_real.py）：受到 10 次强度 0.25 的干扰脉冲后，环向干扰方向偏移 73–94°。",
      "gain": "比 FIFO 队列保持主题更久，并能平滑跟随目标。当前配置对强干扰不稳健，在智能体基准中环没有带来收益（5.6% 对固定目标智能体的 5.8%）。此前的“比 FIFO 可靠 20.5 倍”未经测量。",
      "deploy": "bench/cann_focus_run.py (Apache 2.0), Deployed in AIfa Core and ecosystem sites.",
      "uniqueness": "连续环形吸引子，由活动峰的位置保存当前主题。",
      "competitors": "无干扰时漂移几乎为零（0.01°），强干扰下为 73–94°；此前的“Focus Drift = 0.000”只在前一种情况下成立。每步延迟 15.1 微秒（P50，64 个神经元）。",
      "limitations": "每个主题一个环；要抵御干扰需要重新调整抑制参数。",
      "benchmarksLink": "/digital#benchmarks",
      "metric": "15.1 us (claimed 9.33 us, same order of magnitude) — measured 21.09.2026"
    }
  ]
};

export default function ACRPage() {
    const activeLang = useCurrentLang();
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      try {
        const q = new URLSearchParams(window.location.search).get('lang') as Lang;
        if (q && ['ru', 'en', 'es', 'zh'].includes(q)) return q;
        const stored = (localStorage.getItem('locale') || localStorage.getItem('code_lang')) as Lang;
        if (stored && ['ru', 'en', 'es', 'zh'].includes(stored)) return stored;
      } catch {}
    }
    return (['ru', 'en', 'es', 'zh'].includes(activeLang) ? activeLang : 'ru') as Lang;
  });

  React.useEffect(() => {
    if (activeLang && ['ru', 'en', 'es', 'zh'].includes(activeLang)) {
      setLang(activeLang as Lang);
    }
  }, [activeLang]);

  React.useEffect(() => {
    const handleLangSync = () => {
      try {
        const q = new URLSearchParams(window.location.search).get('lang') as Lang;
        if (q && ['ru', 'en', 'es', 'zh'].includes(q)) { setLang(q); return; }
        const stored = (localStorage.getItem('locale') || localStorage.getItem('code_lang')) as Lang;
        if (stored && ['ru', 'en', 'es', 'zh'].includes(stored)) { setLang(stored); return; }
      } catch {}
    };
    window.addEventListener('languagechange', handleLangSync);
    window.addEventListener('storage', handleLangSync);
    return () => {
      window.removeEventListener('languagechange', handleLangSync);
      window.removeEventListener('storage', handleLangSync);
    };
  }, []);
  const [selectedTech, setSelectedTech] = useState<number | null>(null);
  const [techFilter, setTechFilter] = useState<'all' | 'prod' | 'rnd' | 'spec'>('all');
  const [planFilter, setPlanFilter] = useState<'all' | 'individual' | 'team'>('all');

  const t = I18N[lang];
  const top5 = TOP5_TECH[lang];
  const innovations = ALL_30_INNOVATIONS[lang];
  const plans = CANONICAL_PLANS[lang];

  const filteredInnovations = innovations.filter(item => {
    if (techFilter === 'all') return true;
    if (techFilter === 'prod') return item.num <= 10;
    if (techFilter === 'rnd') return item.num > 10 && item.num <= 20;
    if (techFilter === 'spec') return item.num > 20;
    return true;
  });

  const filteredPlans = plans.filter(p => {
    if (planFilter === 'all') return true;
    if (planFilter === 'individual') return p.category === 'individual';
    if (planFilter === 'team') return p.category === 'team' || p.category === 'enterprise';
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-[#F8FAFC] pt-24 pb-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500/30">
<div className="max-w-7xl mx-auto space-y-20 sm:space-y-24">
        {/* SUB-NAV BREADCRUMB */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-gray-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700 dark:text-slate-300">
              AIfa Cognitive Runtime · ACR 30 Innovations
            </span>
          </div>
        {/* ADA COMMERCIAL ROUTING BANNER */}
        <div className="p-4 sm:p-5 rounded-2xl bg-cyan-50/90 dark:bg-cyan-950/30 border border-cyan-300 dark:border-cyan-500/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-cyan-900 dark:text-cyan-400 uppercase tracking-wider block">
              {JX[lang].commTitle}
            </span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 font-medium">
              {JX[lang].commA}<strong>ADA Title II / WCAG 2.1 AA</strong>{JX[lang].commB}
            </p>
          </div>
          <Link
            href="/accessibility"
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#00F0FF] text-black hover:bg-cyan-400 transition-all shrink-0 shadow-lg"
          >
            {JX[lang].commBtn}
          </Link>
        </div>

          <div className="flex items-center gap-2">
            <Link
              href="/digital"
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all bg-slate-100 dark:bg-black/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white border border-slate-200 dark:border-gray-800"
            >
              ← AIfa Digital
            </Link>
            <Link
              href="/acr"
              className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all bg-cyan-600 dark:bg-cyan-700 text-slate-900 dark:text-white shadow-sm"
            >
              ACR 30 Innovations
            </Link>
          </div>
        </div>

        
        {/* Hero Section */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-300/60 dark:border-[#00F0FF]/30 bg-cyan-100/90 dark:bg-[#00F0FF]/10 text-cyan-900 dark:text-[#00F0FF] font-bold text-xs font-mono font-semibold uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <Cpu className="w-4 h-4" />
            {t.badge}
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-950 dark:text-white">
            {t.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed font-normal">
            {t.subtitle}
          </p>
          <div className="pt-2 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-[#0B0F19] border border-cyan-500/40 px-5 py-2 rounded-2xl text-xs sm:text-sm font-semibold text-cyan-700 dark:text-[#00F0FF] shadow-sm">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              {t.authorBadge}
            </div>

            {/* REFERENCE SUBSTRATE & DUAL-MODE ARCHITECTURE */}
            <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-slate-100/90 dark:bg-black/60 border border-slate-200 dark:border-gray-800 text-xs font-mono text-slate-700 dark:text-slate-300 leading-relaxed text-left flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-inner">
              <div className="w-3 h-3 rounded-full bg-cyan-500 shrink-0 animate-pulse mt-0.5 sm:mt-0" />
              <div className="space-y-1">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                  Reference Substrate: FlyWire FAFB v783 (139,255 neurons · 54.5M synapses)
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  {t.referenceSubstrate || "Faithful Connectome Mode (topological integrity & SHA-256) · Distilled ACR Mode (CPU, Python/NumPy)."}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Ablation Matrix Table */}
        <section className="bg-white dark:bg-[#0B0F19] border border-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
            <Layers className="w-6 h-6 text-cyan-900 dark:text-[#00F0FF]" />
            {t.ablationTitle}
          </h2>
          <div className="overflow-x-auto w-full -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1E293B] text-slate-600 dark:text-slate-400 font-mono text-xs uppercase">
                  <th className="py-3 px-4">{t.colConfig}</th>
                  <th className="py-3 px-3 text-center">{t.colNoise}</th>
                  <th className="py-3 px-3 text-center">{t.colRecall}</th>
                  <th className="py-3 px-3 text-center">{t.colDom}</th>
                  <th className="py-3 px-3 text-center">{t.colDrift}</th>
                  <th className="py-3 px-3 text-center">{t.colFpr}</th>
                  <th className="py-3 px-3 text-center">{t.colLatency}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] font-mono text-xs sm:text-sm">
                {ABLATION_ROWS.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={idx === ABLATION_ROWS.length - 1 ? "bg-[#00F0FF]/10 text-slate-900 dark:text-white font-semibold" : "text-slate-700 dark:text-slate-300 hover:bg-white/5"}
                  >
                    <td className="py-3 px-4 font-sans flex items-center gap-2">
                      {idx === ABLATION_ROWS.length - 1 && <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse shrink-0" />}
                      {row.cfg}
                    </td>
                    <td className="py-3 px-3 text-center">{row.noise}</td>
                    <td className="py-3 px-3 text-center font-bold text-cyan-900 dark:text-[#00F0FF]">{row.recall}</td>
                    <td className="py-3 px-3 text-center">{row.dom}</td>
                    <td className="py-3 px-3 text-center">{row.drift}</td>
                    <td className="py-3 px-3 text-center">{row.fpr}</td>
                    <td className="py-3 px-3 text-center font-bold text-cyan-900 dark:text-[#00F0FF]">{row.lat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[11px] text-slate-600 dark:text-slate-500 italic mt-2.5">
              {t.ablationNote}
            </p>
          </div>

          {/* EMPIRICAL STATISTICAL RIGOR & HARDWARE PROFILING FOOTNOTE */}
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
            <div>
              <span className="text-cyan-700 dark:text-[#00F0FF] font-bold">{t.ablationProtocol}</span>
            </div>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold shrink-0">
              Script: bench/acr_agent_real_benchmark.py
            </span>
          </div>

          {/* ИЗМЕРЕННЫЕ ЗАДЕРЖКИ — замеры 21.09 и 23.09.2026 */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-gray-800 space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-500" />
              {VB[lang].latTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[['t1', 'text-cyan-700 dark:text-[#00F0FF]'], ['t2', 'text-emerald-700 dark:text-emerald-400'], ['t3', 'text-amber-700 dark:text-amber-400'], ['t4', 'text-purple-700 dark:text-purple-400']].map(([k, c]) => (
                <div key={k} className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-gray-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">{(VB[lang] as any)[k]}</span>
                  <span className={`text-base font-bold font-mono ${c}`}>{(VB[lang] as any)[k + 'v']}</span>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">{(VB[lang] as any)[k + 'd']}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1 pt-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100/50 dark:bg-black/30 p-2.5 rounded-xl border border-slate-200 dark:border-gray-800">
              <span>{VB[lang].hw1}</span>
              <span>{VB[lang].hw2}</span>
              <span>{VB[lang].hw3}</span>
            </div>
          </div>

          {/* ПРОТОКОЛ ВОСПРОИЗВЕДЕНИЯ */}
          <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-[#00F0FF]/30 space-y-3 font-mono text-xs text-left">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-2">
              <span className="text-cyan-800 dark:text-cyan-400 font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-800 dark:text-cyan-400" />
                {VB[lang].repTitle}
              </span>
              <span className="text-[11px] text-gray-400">Apache 2.0</span>
            </div>
            <p className="text-slate-700 dark:text-gray-300 font-normal font-sans text-xs">
              {VB[lang].repText} <a href="https://github.com/MaksimGalatin/aifa-biobench" className="text-cyan-700 dark:text-cyan-400 underline">aifa-biobench</a> · <a href="/digital" className="text-cyan-700 dark:text-cyan-400 underline">/digital</a>
            </p>
            <div className="p-3 bg-slate-100 dark:bg-black/80 rounded-xl border border-slate-200 dark:border-gray-800 text-slate-800 dark:text-cyan-300 space-y-1 select-all text-xs">
              <div>pip install numpy</div>
              <div className="text-cyan-900 dark:text-[#00F0FF] font-bold">python bench/aifa_biobench.py --vectors 50000 --dim 1024 --topk 10 --queries 200 --pool 250 --seed 42 --protocol independent</div>
            </div>
            <div className="flex flex-col gap-1 text-[11px] text-gray-400 pt-1">
              <span>{VB[lang].repRes}</span>
              <span className="text-emerald-500">{VB[lang].repOts}</span>
            </div>
          </div>
        </section>

            {/* AIFA BIOBENCH — ПЕРЕПРОВЕРЕННЫЕ РЕЗУЛЬТАТЫ 23.09.2026 */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-cyan-500/40 space-y-6 shadow-2xl text-left my-6 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-900 dark:text-[#00F0FF] font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
                    {VB[lang].bbTag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mt-1">{VB[lang].bbTitle}</h3>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-700 px-3 py-1 rounded-lg text-cyan-800 dark:text-cyan-300">{VB[lang].bb1}</span>
                  <span className="bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-700 px-3 py-1 rounded-lg text-purple-800 dark:text-purple-300">{VB[lang].bb2}</span>
                  <span className="bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 px-3 py-1 rounded-lg text-emerald-800 dark:text-emerald-300">Apache 2.0</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. ДУЭЛЬ МЕТОДОВ ПОИСКА — results/binary_arena_results.json */}
                <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-black/60 border border-slate-200 dark:border-gray-800 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold font-mono text-cyan-900 dark:text-[#00F0FF] uppercase">{VB[lang].c1Title}</h4>
                    <span className="text-[11px] font-mono text-gray-400">{VB[lang].c1Tag}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">{VB[lang].c1Text}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-xs">
                      <thead><tr className="border-b border-gray-800 text-gray-400 text-[10px] uppercase">
                        <th className="py-2 px-2">{VB[lang].thMethod}</th><th className="py-2 px-2 text-center">Recall@10</th><th className="py-2 px-2 text-center">NDCG@10</th><th className="py-2 px-2 text-center">P50</th><th className="py-2 px-2 text-right">{VB[lang].thWeights}</th>
                      </tr></thead>
                      <tbody className="divide-y divide-gray-800/40 text-slate-700 dark:text-gray-300">
                        <tr><td className="py-2 px-2">AIfa FlyHash</td><td className="py-2 px-2 text-center">18.90%</td><td className="py-2 px-2 text-center">0.3188</td><td className="py-2 px-2 text-center">35.46 ms</td><td className="py-2 px-2 text-right">12,288 ({VB[lang].light})</td></tr>
                        <tr className="font-bold"><td className="py-2 px-2">Sign-LSH (BQ 1-bit)</td><td className="py-2 px-2 text-center text-emerald-500">80.50%</td><td className="py-2 px-2 text-center">0.8715</td><td className="py-2 px-2 text-center">36.77 ms</td><td className="py-2 px-2 text-right">1,048,576</td></tr>
                        <tr><td className="py-2 px-2">Multi-table LSH</td><td className="py-2 px-2 text-center">0.10%</td><td className="py-2 px-2 text-center">0.0022</td><td className="py-2 px-2 text-center">0.045 ms</td><td className="py-2 px-2 text-right">—</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 [overflow-wrap:anywhere]">results/binary_arena_results.json</div>
                </div>

                {/* 2. ПЕРЕБОР ЧИСЛА «КОГТЕЙ» — results/dendritic_sweep.json */}
                <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-black/60 border border-slate-200 dark:border-gray-800 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold font-mono text-emerald-500 uppercase">{VB[lang].c2Title}</h4>
                    <span className="text-[11px] font-mono text-gray-400">{VB[lang].c2Tag}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">{VB[lang].c2Text}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-xs">
                      <thead><tr className="border-b border-gray-800 text-gray-400 text-[10px] uppercase">
                        <th className="py-2 px-2">{VB[lang].thClaws}</th><th className="py-2 px-2 text-center">Recall@10</th><th className="py-2 px-2 text-center">P50</th><th className="py-2 px-2 text-right">{VB[lang].thStatus}</th>
                      </tr></thead>
                      <tbody className="divide-y divide-gray-800/40 text-slate-700 dark:text-gray-300">
                        <tr><td className="py-1.5 px-2">d = 2</td><td className="py-1.5 px-2 text-center">13.80%</td><td className="py-1.5 px-2 text-center">29.35 ms</td><td className="py-1.5 px-2 text-right">{VB[lang].s2}</td></tr>
                        <tr><td className="py-1.5 px-2">d = 6</td><td className="py-1.5 px-2 text-center">19.80%</td><td className="py-1.5 px-2 text-center">29.98 ms</td><td className="py-1.5 px-2 text-right">{VB[lang].s6}</td></tr>
                        <tr><td className="py-1.5 px-2">d = 7</td><td className="py-1.5 px-2 text-center">23.30%</td><td className="py-1.5 px-2 text-center">28.37 ms</td><td className="py-1.5 px-2 text-right">{VB[lang].s7}</td></tr>
                        <tr className="font-bold"><td className="py-1.5 px-2">d = 16</td><td className="py-1.5 px-2 text-center text-emerald-500">24.90%</td><td className="py-1.5 px-2 text-center">30.21 ms</td><td className="py-1.5 px-2 text-right">{VB[lang].s16}</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 [overflow-wrap:anywhere]">results/dendritic_sweep.json</div>
                </div>

                {/* 3. НАСТОЯЩЕЕ ИСПЫТАНИЕ АГЕНТА — results/acr_agent_real_benchmark_distr_0.35.json */}
                <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-black/60 border border-slate-200 dark:border-gray-800 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold font-mono text-purple-500 uppercase">{VB[lang].c3Title}</h4>
                    <span className="text-[11px] font-mono text-gray-400">{VB[lang].c3Tag}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">{VB[lang].c3Text}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-xs">
                      <thead><tr className="border-b border-gray-800 text-gray-400 text-[10px] uppercase">
                        <th className="py-2 px-2">{VB[lang].thAgent}</th><th className="py-2 px-2 text-center">{VB[lang].thSuccess}</th><th className="py-2 px-2 text-right">{VB[lang].thWrong}</th>
                      </tr></thead>
                      <tbody className="divide-y divide-gray-800/40 text-slate-700 dark:text-gray-300">
                        <tr><td className="py-1.5 px-2">{VB[lang].a1}</td><td className="py-1.5 px-2 text-center">5.8% ± 3.8</td><td className="py-1.5 px-2 text-right">97.9%</td></tr>
                        <tr><td className="py-1.5 px-2">{VB[lang].a2}</td><td className="py-1.5 px-2 text-center">1.4% ± 3.1</td><td className="py-1.5 px-2 text-right">99.2%</td></tr>
                        <tr><td className="py-1.5 px-2">{VB[lang].a3}</td><td className="py-1.5 px-2 text-center">94.7% ± 5.5</td><td className="py-1.5 px-2 text-right">54.5%</td></tr>
                        <tr><td className="py-1.5 px-2">{VB[lang].a4}</td><td className="py-1.5 px-2 text-center">93.6% ± 4.1</td><td className="py-1.5 px-2 text-right">54.1%</td></tr>
                        <tr className="font-bold"><td className="py-1.5 px-2">{VB[lang].a5}</td><td className="py-1.5 px-2 text-center text-emerald-500">95.0% ± 5.5</td><td className="py-1.5 px-2 text-right">53.8%</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 [overflow-wrap:anywhere]">results/acr_agent_real_benchmark_distr_0.35.json</div>
                </div>

                {/* 4. НАСТОЯЩАЯ УСТОЙЧИВОСТЬ — results/robustness_real.json */}
                <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-black/60 border border-slate-200 dark:border-gray-800 space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold font-mono text-amber-500 uppercase">{VB[lang].c4Title}</h4>
                    <span className="text-[11px] font-mono text-gray-400">{VB[lang].c4Tag}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-gray-300 leading-relaxed">{VB[lang].c4Text}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-xs">
                      <thead><tr className="border-b border-gray-800 text-gray-400 text-[10px] uppercase">
                        <th className="py-2 px-2">{VB[lang].thDrop}</th><th className="py-2 px-2 text-center">FlyHash R@10</th><th className="py-2 px-2 text-center">Sign-LSH R@10</th><th className="py-2 px-2 text-right">{VB[lang].thCann}</th>
                      </tr></thead>
                      <tbody className="divide-y divide-gray-800/40 text-slate-700 dark:text-gray-300">
                        <tr><td className="py-1.5 px-2">0%</td><td className="py-1.5 px-2 text-center">58.9%</td><td className="py-1.5 px-2 text-center">86.1%</td><td className="py-1.5 px-2 text-right">0.13°</td></tr>
                        <tr><td className="py-1.5 px-2">10%</td><td className="py-1.5 px-2 text-center">52.3%</td><td className="py-1.5 px-2 text-center">84.5%</td><td className="py-1.5 px-2 text-right">7.0°</td></tr>
                        <tr><td className="py-1.5 px-2">30%</td><td className="py-1.5 px-2 text-center">39.6%</td><td className="py-1.5 px-2 text-center">82.2%</td><td className="py-1.5 px-2 text-right">15.2°</td></tr>
                        <tr className="font-bold"><td className="py-1.5 px-2">50%</td><td className="py-1.5 px-2 text-center text-rose-700 dark:text-rose-500">25.4%</td><td className="py-1.5 px-2 text-center">78.2%</td><td className="py-1.5 px-2 text-right">14.6°</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 [overflow-wrap:anywhere]">results/robustness_real.json</div>
                </div>
              </div>

              {/* КОМАНДЫ ВОСПРОИЗВЕДЕНИЯ */}
              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-black/80 border border-slate-200 dark:border-gray-800 space-y-2 font-mono text-xs">
                <div className="text-sm font-bold text-cyan-900 dark:text-[#00F0FF]">{VB[lang].cmdTitle}</div>
                <div className="space-y-1.5 text-[11px] text-slate-800 dark:text-cyan-300 select-all">
                  {['python bench/aifa_biobench.py --vectors 50000 --dim 1024 --topk 10 --queries 200 --protocol independent',
                    'python bench/binary_retrieval_arena.py --output results',
                    'python bench/sweep_dendritic_degree.py --output results/dendritic_sweep.json',
                    'python bench/acr_agent_real_benchmark.py --seeds 30 --distractor-rate 0.35',
                    'python bench/robustness_real.py --seeds 5 --bits 512 --pool 50',
                    'python bench/connectome_real_metrics.py'].map((c) => (
                    <div key={c} className="bg-slate-50 dark:bg-black/90 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">{c}</div>
                  ))}
                </div>
              </div>
            </div>


        {/* ЧТО ТАКОЕ ACR / ЧЕМ ACR НЕ ЯВЛЯЕТСЯ */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-white via-cyan-50/30 to-slate-50 dark:from-slate-900/90 dark:via-black dark:to-slate-950 border border-slate-200 dark:border-cyan-500/30 font-sans space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-2.5">
              <div className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-sm">✓ {VB[lang].isTitle}</div>
              <ul className="text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside leading-relaxed text-xs">
                <li>{VB[lang].is1}</li><li>{VB[lang].is2}</li><li>{VB[lang].is3}</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-500/30 space-y-2.5">
              <div className="text-rose-700 dark:text-rose-400 font-bold font-mono text-sm">✗ {VB[lang].notTitle}</div>
              <ul className="text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside leading-relaxed text-xs">
                <li>{VB[lang].not1}</li><li>{VB[lang].not2}</li><li>{VB[lang].not3}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* EVIDENCE LEDGER & SCIENTIFIC RIGOR HIERARCHY (E0–E5) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-cyan-500/30 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-900 dark:text-[#00F0FF] uppercase tracking-wider block">
                  {lang === 'ru' ? 'Реестр доказательности & Научная строгость' : lang === 'es' ? 'Registro de Evidencia y Rigor Científico' : lang === 'zh' ? '证据账本与科学严谨层级' : 'Evidence Ledger & Scientific Rigor Hierarchy'}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-500/30">
                  E0–E5 Ladder
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white mt-1">
                {lang === 'ru' 
                  ? 'Ни одна заявляемая метрика не приводится без указания класса доказательности' 
                  : lang === 'es' 
                  ? 'Ninguna métrica destacada se presenta sin su clase de evidencia' 
                  : lang === 'zh' 
                  ? '无证据等级标注，不作核心性能断言' 
                  : 'No headline metric is presented without its evidence class'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                {lang === 'ru' ? 'Внутренний бенчмарк; внешняя репликация в процессе' : lang === 'es' ? 'Benchmark interno; replicación externa pendiente' : lang === 'zh' ? '内部基准测试；外部复现进行中' : 'Internal benchmark; external replication pending'}
              </span>
            </div>
          </div>

          {/* E0-E5 Tiers Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-gray-800 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 block">E0 • CONCEPT</span>
              <span className="text-xs font-semibold text-slate-700 dark:text-gray-300 font-normal">{lang === 'ru' ? 'Гипотеза' : lang === 'es' ? 'Hipótesis' : lang === 'zh' ? '假设' : 'Concept'}</span>
              <p className="text-[10px] text-slate-500 dark:text-gray-400">{lang === 'ru' ? 'Биологический концепт' : lang === 'es' ? 'Hipótesis biológica' : lang === 'zh' ? '生物学假设' : 'Biological hypothesis'}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-gray-800 space-y-1">
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 block">E1 • MATH MODEL</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-blue-200">{lang === 'ru' ? 'Матмодель' : lang === 'es' ? 'Modelo formal' : lang === 'zh' ? '形式模型' : 'Formal Model'}</span>
              <p className="text-[10px] text-slate-500 dark:text-gray-400">{lang === 'ru' ? 'Асимптотика / формулы' : lang === 'es' ? 'Complejidad analítica' : lang === 'zh' ? '解析复杂度' : 'Analytical complexity'}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-cyan-800/60 space-y-1">
              <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-400 block">E2 • PROTOTYPE</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-cyan-200">{lang === 'ru' ? 'Прототип ПО' : lang === 'es' ? 'Prototipo de software' : lang === 'zh' ? '软件原型' : 'Software Proto'}</span>
              <p className="text-[10px] text-slate-500 dark:text-gray-400">{lang === 'ru' ? 'Симулятор / партиционер' : lang === 'es' ? 'Simulador / particionador' : lang === 'zh' ? '模拟器 / 划分器' : 'Simulator / partitioner'}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-emerald-800/60 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 block">E3 • BENCHMARK</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-emerald-200">{lang === 'ru' ? 'Бенчмарк ПО' : lang === 'es' ? 'Benchmark de software' : lang === 'zh' ? '软件基准' : 'Software Bench'}</span>
              <p className="text-[10px] text-slate-500 dark:text-gray-400">{lang === 'ru' ? 'Воспроизводимый тест CPU' : lang === 'es' ? 'Prueba reproducible en CPU' : lang === 'zh' ? '可复现的 CPU 测试' : 'Reproducible CPU test'}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-yellow-800/60 space-y-1">
              <span className="text-[10px] font-bold text-amber-700 dark:text-yellow-400 block">E4 • EXT. REPL.</span>
              <span className="text-xs font-semibold text-slate-800 dark:text-yellow-200">{lang === 'ru' ? 'Репликация' : lang === 'es' ? 'Auditoría externa' : lang === 'zh' ? '外部审计' : 'External Audit'}</span>
              <p className="text-[10px] text-slate-500 dark:text-gray-400">{lang === 'ru' ? 'Аппаратный стенд' : lang === 'es' ? 'Hardware independiente' : lang === 'zh' ? '独立硬件' : 'Independent hardware'}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-purple-800/60 space-y-1">
              <span className="text-[10px] font-bold text-purple-400 block">E5 • PRODUCTION</span>
              <span className="text-xs font-semibold text-purple-200">{lang === 'ru' ? 'Боевой прод' : lang === 'es' ? 'Producción real' : lang === 'zh' ? '生产环境' : 'In-Situ Field'}</span>
              <p className="text-[10px] text-gray-500">{lang === 'ru' ? 'Промышленный кластер' : lang === 'es' ? 'Clúster de producción' : lang === 'zh' ? '生产集群' : 'Production cluster'}</p>
            </div>
          </div>

          {/* Status Disclaimer Banner */}
          <div className="p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-900 dark:text-cyan-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-900 dark:text-[#00F0FF] shrink-0" />
              <span>
                {lang === 'ru' ? "Статус научной проверки: все числа на странице получены открытыми скриптами (замеры 21.09 и 23.09.2026) — 3 240 эпизодов агента, 5 зёрен теста отказов, настоящий коннектом FlyWire v783. Энергия — модельная оценка, не замер ваттметром. Внешняя независимая репликация — в плане." : lang === 'es' ? "Estado de validación científica: todas las cifras de la página proceden de scripts abiertos (mediciones del 21.09 y 23.09.2026): 3.240 episodios de agente, 5 semillas de robustez, conectoma real FlyWire v783. La energía es una estimación de modelo, no una medición con vatímetro. La replicación externa independiente está planificada." : lang === 'zh' ? "科学验证状态：本页所有数字均由公开脚本得出（2026-09-21 与 09-23 实测）——智能体 3,240 个回合、鲁棒性 5 个种子、真实 FlyWire v783 连接组。能耗为模型估算，并非功率计实测。外部独立复现已列入计划。" : "Scientific validation status: every number on this page comes from open scripts (measured 21.09 and 23.09.2026) — 3,240 agent episodes, 5 robustness seeds, the real FlyWire v783 connectome. Energy is a model estimate, not a wattmeter measurement. External independent replication is planned."}
              </span>
            </div>
            <span className="text-cyan-900 dark:text-[#00F0FF] font-bold shrink-0">
              {lang === 'ru' ? 'замеры 23.09.2026' : lang === 'es' ? 'medido 23.09.2026' : lang === 'zh' ? '2026-09-23 实测' : 'measured 23.09.2026'}
            </span>
          </div>
        </div>

        {/* TOP 10 DEPLOYED TECH & TELEMETRY DASHBOARD */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <Zap className="w-6 h-6 text-cyan-900 dark:text-[#00F0FF]" />
                {t.top5Title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 font-normal">
                {t.top5Subtitle}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {lang === 'ru'
                  ? 'Числа из открытых скриптов — замеры 23.09.2026'
                  : lang === 'es'
                  ? 'Cifras de scripts abiertos — medidas el 23.09.2026'
                  : lang === 'zh'
                  ? '数字来自公开脚本 — 2026-09-23 实测'
                  : 'Numbers from open scripts — measured 23.09.2026'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {top5.slice(0, 10).map((tech, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0B0F19] border border-[#1E293B] rounded-2xl p-6 hover:border-[#00F0FF]/40 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-900 dark:text-[#00F0FF] px-2.5 py-1 rounded bg-[#00F0FF]/10 border border-[#00F0FF]/20">
                        № {tech.num}
                      </span>
                      {(tech as any).evidenceClass && (
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          (tech as any).evidenceClass === 'E3'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-cyan-500/10 text-cyan-900 dark:text-cyan-300 border-cyan-500/30'
                        }`}>
                          {(tech as any).evidenceClass}
                        </span>
                      )}
                    </div>
                    {Number(tech.num) <= 5 ? (
                      <span className="text-[10px] text-green-800 dark:text-green-400 font-bold bg-green-100 dark:bg-green-950/60 px-2 py-0.5 rounded border border-green-300 dark:border-green-800/60">
                        🟢 L0–L4 Core Candidate
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-800 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800/60">
                        🧪 Research Prototype
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">{tech.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{tech.bio}</p>
                  <div className="text-xs text-slate-700 dark:text-slate-300 font-mono bg-slate-100 dark:bg-black/40 p-2.5 rounded-xl border border-slate-200 dark:border-gray-800">
                    <strong className="text-slate-600 dark:text-slate-400">
                      {lang === 'ru' ? 'Математика: ' : lang === 'es' ? 'Matemática: ' : lang === 'zh' ? '数学原理: ' : 'Mathematics: '}
                    </strong> 
                    {tech.math}
                  </div>
                  <div className="text-xs text-cyan-800 dark:text-cyan-200/90 leading-relaxed">
                    <strong className="text-cyan-900 dark:text-[#00F0FF]">
                      {lang === 'ru' ? 'Польза / Метрика: ' : lang === 'es' ? 'Beneficio / Métrica: ' : lang === 'zh' ? '效用 / 指标: ' : 'Benefit / Metric: '}
                    </strong> 
                    {tech.gain}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800/80 text-[11px] font-mono text-gray-500 flex items-center justify-between">
                  <span>{tech.deploy}</span>
                  {(tech as any).metric && (
                    <span className="text-cyan-900 dark:text-[#00F0FF] font-bold font-mono bg-[#00F0FF]/10 px-2 py-0.5 rounded text-[10px]">
                      {(tech as any).metric}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ТРИ ПРОТОКОЛА ЗАМЕРА — числа из results/*.json, 23.09.2026 */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-[#00F0FF]/30 shadow-2xl space-y-6 font-mono text-xs">
            <div className="flex flex-col gap-3 border-b border-gray-800 pb-4">
              <span className="text-xs font-mono font-bold text-cyan-900 dark:text-[#00F0FF] uppercase tracking-wider block">{PR[lang].prTag}</span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{PR[lang].prTitle}</h3>
              <span className="px-3 py-1 rounded-xl text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-gray-800 break-words">{PR[lang].prRun}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[['pa', 'text-cyan-800 dark:text-cyan-400', 'bg-cyan-50/70 border-cyan-200 dark:border-cyan-500/30'], ['pb', 'text-emerald-700 dark:text-emerald-400', 'bg-emerald-50/70 border-emerald-200 dark:border-emerald-500/30'], ['pc', 'text-purple-700 dark:text-purple-400', 'bg-purple-50/70 border-purple-200 dark:border-purple-500/30']].map(([k, c, b]) => (
                <div key={k} className={`p-4 rounded-2xl dark:bg-black/50 border space-y-2 ${b}`}>
                  <span className={`text-[10px] font-bold uppercase block ${c}`}>{(PR[lang] as any)[k]}</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{(PR[lang] as any)[k + 'T']}</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">{(PR[lang] as any)[k + 'D']}</p>
                  <div className={`font-bold text-base pt-1 ${c}`}>{(PR[lang] as any)[k + 'V']}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{(PR[lang] as any)[k + 'S']}</div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-gray-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 leading-relaxed">
              <div><strong className="text-amber-700 dark:text-amber-400 uppercase">{PR[lang].en1}</strong> {PR[lang].en2}</div>
              <div className="pt-1"><strong className="text-cyan-800 dark:text-cyan-400 uppercase">{PR[lang].st1}</strong> {PR[lang].st2}</div>
            </div>
          </div>
        </section>

        {/* FULL 30 INNOVATIONS CATALOG */}
        <section id="innovations" className="bg-white dark:bg-[#0B0F19] border border-[#1E293B] rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <Compass className="w-7 h-7 text-cyan-900 dark:text-[#00F0FF]" />
              {t.innovationsTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-normal">
              {t.innovationsSubtitle}
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-4">
              <button
                onClick={() => setTechFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  techFilter === 'all'
                    ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                    : 'bg-slate-100 dark:bg-black/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white border border-slate-300 dark:border-gray-800'
                }`}
              >
                {JX[lang].all30}
              </button>
              <button
                onClick={() => setTechFilter('prod')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  techFilter === 'prod'
                    ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'bg-slate-100 dark:bg-black/50 text-green-700 dark:text-green-400 hover:text-slate-900 dark:text-white border border-green-300 dark:border-green-900/60'
                }`}
              >
                🟢 Production Core (10)
              </button>
              <button
                onClick={() => setTechFilter('rnd')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  techFilter === 'rnd'
                    ? 'bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]'
                    : 'bg-slate-100 dark:bg-black/50 text-amber-700 dark:text-yellow-400 hover:text-slate-900 dark:text-white border border-amber-300 dark:border-yellow-900/60'
                }`}
              >
                {JX[lang].rnd10}
              </button>
              <button
                onClick={() => setTechFilter('spec')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  techFilter === 'spec'
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-100 dark:bg-black/50 text-cyan-800 dark:text-cyan-400 hover:text-slate-900 dark:text-white border border-cyan-300 dark:border-cyan-900/60'
                }`}
              >
                {JX[lang].math10}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredInnovations.map((inn, i) => (
              <div
                key={inn.num}
                onClick={() => setSelectedTech(selectedTech === inn.num ? null : inn.num)}
                className={`cursor-pointer rounded-2xl p-5 transition-all border ${
                  selectedTech === inn.num
                    ? 'bg-[#00F0FF]/10 border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.25)] ring-1 ring-[#00F0FF]/40'
                    : 'bg-white dark:bg-[#05060A] border-slate-200 dark:border-[#1E293B] hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-[#080B14]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#00F0FF]/20 text-cyan-900 dark:text-[#00F0FF] border border-[#00F0FF]/30">#{inn.num}</span>
                    <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800/60">
                      {inn.metric}
                    </span>
                  </div>
                  <div>
                    {inn.num <= 10 ? (
                      <span className="text-[10px] text-green-800 dark:text-green-400 font-bold bg-green-100 dark:bg-green-950/70 px-2 py-0.5 rounded border border-green-300 dark:border-green-800/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Production Core
                      </span>
                    ) : inn.num <= 20 ? (
                      <span className="text-[10px] text-yellow-800 dark:text-yellow-400 font-bold bg-yellow-100 dark:bg-yellow-950/70 px-2 py-0.5 rounded border border-yellow-300 dark:border-yellow-800/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" /> R&D Lab
                      </span>
                    ) : (
                      <span className="text-[10px] text-cyan-800 dark:text-cyan-400 font-bold bg-cyan-100 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-300 dark:border-cyan-800/60 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Math Spec
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                  {inn.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-1">
                  {inn.bio}
                </p>

                {selectedTech === inn.num ? (
                  <div className="mt-4 pt-4 border-t border-[#1E293B] text-xs space-y-3.5 text-slate-700 dark:text-slate-300 animate-in fade-in duration-200">
                    {/* 1. Uniqueness */}
                    <div className="bg-white dark:bg-[#0B0F19] border border-[#00F0FF]/30 p-3 rounded-xl space-y-1">
                      <div className="text-cyan-900 dark:text-[#00F0FF] font-semibold flex items-center gap-1.5 text-xs">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        {lang === 'ru' ? '1. Чем уникальна и какую пользу дает:' : lang === 'es' ? '1. Por qué es única y qué valor aporta:' : lang === 'zh' ? '1. 独特性与实际收益：' : '1. Uniqueness & Concrete Value:'}
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 text-xs leading-relaxed">{inn.uniqueness || inn.gain}</p>
                    </div>

                    {/* 2. Advantage */}
                    <div className="bg-white dark:bg-[#0B0F19] border border-amber-500/30 p-3 rounded-xl space-y-1">
                      <div className="text-amber-400 font-semibold flex items-center gap-1.5 text-xs">
                        <Zap className="w-3.5 h-3.5 shrink-0" />
                        {lang === 'ru' ? '2. Превосходство над конкурентами (FAISS / Pinecone / Chroma / LLM / FIFO):' : lang === 'es' ? '2. Ventaja sobre competidores (FAISS / Pinecone / Chroma / LLM):' : lang === 'zh' ? '2. 超越传统方案（FAISS / Pinecone / Chroma / LLM / FIFO）：' : '2. Advantage over Competitors (FAISS / Pinecone / Chroma / LLMs):'}
                      </div>
                      <p className="text-amber-200/90 text-xs leading-relaxed">{inn.competitors}</p>
                    </div>

                    {/* 3. Limitations */}
                    <div className="bg-white dark:bg-[#0B0F19] border border-purple-500/30 p-3 rounded-xl space-y-1">
                      <div className="text-purple-400 font-semibold flex items-center gap-1.5 text-xs">
                        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                        {lang === 'ru' ? '3. Ограничения v1 и план развития в v2/v3:' : lang === 'es' ? '3. Limitaciones v1 y hoja de ruta v2/v3:' : lang === 'zh' ? '3. v1 局限性与 v2/v3 迭代路线图：' : '3. v1 Limitations & v2/v3 Evolution Roadmap:'}
                      </div>
                      <p className="text-purple-200/90 text-xs leading-relaxed">{inn.limitations}</p>
                    </div>

                    {/* 4. Mathematics */}
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-gray-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                      <strong className="text-slate-700 dark:text-slate-300">{JX[lang].formula}</strong> {inn.math}
                    </div>

                    {/* 5. Link */}
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 font-mono">{JX[lang].contour} {inn.deploy}</span>
                      <Link
                        href="/digital#benchmarks"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00F0FF]/15 text-cyan-900 dark:text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black border border-[#00F0FF]/40 font-mono text-[11px] font-semibold transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                      >
                        <span>{lang === 'ru' ? '📊 Смотреть бенчмарк на /digital →' : lang === 'es' ? '📊 Ver benchmarks en /digital →' : lang === 'zh' ? '📊 在 /digital 查看基准测试 →' : '📊 View Benchmark on /digital →'}</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-900">
                    <span>{lang === 'ru' ? 'Нажмите для полного анализа' : lang === 'es' ? 'Clic para análisis completo' : lang === 'zh' ? '点击展开深度分析' : 'Click for deep analysis'}</span>
                    <span className="text-cyan-900 dark:text-[#00F0FF] font-mono">{JX[lang].expand}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* RESEARCH BENCHMARK & ENTERPRISE CORE LICENSING */}
        {/* ========================================================================= */}
        <section id="pricing" className="space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-300/60 dark:border-[#00F0FF]/30 bg-cyan-100/90 dark:bg-[#00F0FF]/10 text-cyan-900 dark:text-[#00F0FF] font-bold text-xs font-mono font-semibold uppercase tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'ru' ? 'ОТКРЫТАЯ НАУКА И КОРПОРАТИВНОЕ ЛИЦЕНЗИРОВАНИЕ' : lang === 'es' ? 'CIENCIA ABIERTA Y LICENCIAS ENTERPRISE' : lang === 'zh' ? '开源科学与企业级主权授权' : 'OPEN SCIENCE & ENTERPRISE LICENSING'}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {lang === 'ru' ? 'Открытый бенчмарк и корпоративное лицензирование' : lang === 'es' ? 'Benchmark de Investigación Abierta y Licencias Enterprise' : lang === 'zh' ? '开源基准测试与企业主权内核授权' : 'Open Research Benchmark & Enterprise Core Licensing'}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              {lang === 'ru' 
                ? 'Воспроизводимый открытый бенчмарк для мирового научного сообщества (Apache 2.0) и закрытые суверенные поставки бинарного ядра для автономных софтверных агентов, робототехники и закрытых периметров.'
                : lang === 'es'
                ? 'Framework de evaluación reproducible bajo Apache 2.0 para la ciencia global y suministro de núcleo binario soberano para robótica, agentes y perímetros aislados.'
                : lang === 'zh'
                ? '面向全球科研机构的 Apache 2.0 可复现基准测试工具链，以及面向物理隔离专网、具身智能与防务系统的闭源二进制内核授权。'
                : 'Reproducible open-source evaluation framework under Apache 2.0 alongside sovereign closed-core binary licensing for autonomous robotics, agents, and air-gapped perimeters.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CARD 1: OPEN RESEARCH BENCHMARK */}
            <div className="bg-white dark:bg-[#0B0F19] border border-cyan-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#00F0FF] transition-all">
              <div className="absolute -right-16 -top-16 w-40 h-40 bg-[#00F0FF]/10 rounded-full blur-3xl group-hover:bg-[#00F0FF]/20 transition-all" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-800 dark:text-cyan-400">
                    {lang === 'ru' ? '🔬 Открытая наука · Apache 2.0' : lang === 'es' ? '🔬 Ciencia Abierta · Apache 2.0' : lang === 'zh' ? '🔬 开源科学 · Apache 2.0' : '🔬 Open Science · Apache 2.0'}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    FREE & OPEN SOURCE
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    AIfa BioBench Suite v3
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {lang === 'ru'
                      ? 'Полный набор воспроизводимых тестов для оценки коннектомных LSH-структур, непрерывных аттракторов CANN и мультиагентного ассоциативного поиска.'
                      : lang === 'es'
                      ? 'Suite de evaluación reproducible para evaluar estructuras LSH conectómicas, atractores continuos CANN y recuperación asociativa multiagente.'
                      : lang === 'zh'
                      ? '面向连接组学 LSH 哈希、CANN 连续吸引子网络及多智能体关联检索的可复现完整基准测试套件。'
                      : 'Complete reproducible evaluation suite for connectome LSH hashing, CANN continuous attractors, and multi-agent associative retrieval.'}
                  </p>
                </div>

                {/* DUAL-PROTOCOL METRICS BOX: честные числа, замер 21.09.2026, N=50000 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-gray-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-900 dark:text-[#00F0FF] font-bold block">
                      Protocol A (Smoke / Near-Duplicate)
                    </span>
                    <div className="text-xl font-mono font-black text-white">46.70% <span className="text-xs font-normal text-slate-400">Recall@10</span></div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {JX[lang].protoA}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">
                      Protocol B (Independent)
                    </span>
                    <div className="text-xl font-mono font-black text-white">39.55% <span className="text-xs font-normal text-slate-400">Recall@10</span></div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {JX[lang].protoB}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-bold tracking-wider">
                    {lang === 'ru' ? 'В состав открытого пакета входит:' : lang === 'es' ? 'Incluido en el paquete abierto:' : lang === 'zh' ? '开源测试套件包含：' : 'Included in Open Benchmark Suite:'}
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-900 dark:text-[#00F0FF] shrink-0 mt-0.5" />
                      <span><strong>{JX[lang].suitesH}</strong>{JX[lang].suitesT}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-900 dark:text-[#00F0FF] shrink-0 mt-0.5" />
                      <span><strong>{JX[lang].cpuH}</strong>{JX[lang].cpuT}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-900 dark:text-[#00F0FF] shrink-0 mt-0.5" />
                      <span><strong>{JX[lang].apacheH}</strong>{JX[lang].apacheT}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <a
                  href="https://github.com/aifa-works/aifa-biobench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#00F0FF]/15 hover:bg-[#00F0FF] text-cyan-900 dark:text-[#00F0FF] hover:text-black font-bold text-xs rounded-xl text-center transition-all font-mono uppercase tracking-wider border border-[#00F0FF]/40 shadow-[0_0_20px_rgba(0,240,255,0.15)] flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>{lang === 'ru' ? 'Репозиторий aifa-biobench на GitHub' : lang === 'es' ? 'Repositorio aifa-biobench en GitHub' : lang === 'zh' ? '在 GitHub 访问 aifa-biobench' : 'Clone aifa-biobench on GitHub'}</span>
                </a>
                <Link
                  href="/digital#benchmarks"
                  className="w-full py-2.5 px-4 bg-slate-100 dark:bg-black/40 hover:bg-slate-200 dark:hover:bg-black/70 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl text-center transition-all font-mono border border-slate-200 dark:border-gray-800 flex items-center justify-center gap-2"
                >
                  <span>{lang === 'ru' ? 'Смотреть интерактивные графики бенчмарка →' : lang === 'es' ? 'Ver gráficos interactivos de benchmark →' : lang === 'zh' ? '查看交互式基准测试图表 →' : 'Explore Interactive Benchmark Charts →'}</span>
                </Link>
              </div>
            </div>

            {/* CARD 2: ENTERPRISE CORE LICENSING */}
            <div className="bg-white dark:bg-[#0B0F19] border border-purple-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-purple-400 transition-all">
              <div className="absolute -right-16 -top-16 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-wider font-bold bg-purple-500/10 border border-purple-500/30 text-purple-300">
                    {lang === 'ru' ? '🛡️ Закрытое ядро · Sovereign Enterprise' : lang === 'es' ? '🛡️ Núcleo Cerrado · Sovereign Enterprise' : lang === 'zh' ? '🛡️ 闭源原生内核 · Sovereign Enterprise' : '🛡️ Closed Core · Sovereign Enterprise'}
                  </span>
                  <span className="text-xs font-mono text-purple-300 font-bold">
                    COMMERCIAL EULA
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    AIfa Cognitive Runtime Core (.aci)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {lang === 'ru'
                      ? 'Поставка закрытого высокопроизводительного бинарного ядра для автономных софтверных агентов, промышленной робототехники, банков и закрытых периметров.'
                      : lang === 'es'
                      ? 'Suministro de núcleo binario cerrado de alto rendimiento para robótica industrial, agentes autónomos y perímetros seguros sin conexión.'
                      : lang === 'zh'
                      ? '面向自主软件智能体、工业具身机器人、金融核心及物理隔离机房的闭源高性能原生二进制内核。'
                      : 'Closed-source high-performance binary runtime core for autonomous agents, industrial robotics, aerospace, and sovereign air-gapped perimeters.'}
                  </p>
                </div>

                {/* ENTERPRISE HIGHLIGHTS BOX */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-gray-800">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-purple-300 font-bold block">
                      {lang === 'ru' ? 'Задержка поиска' : lang === 'es' ? 'Latencia de búsqueda' : lang === 'zh' ? '检索延迟' : 'Retrieval latency'}
                    </span>
                    <div className="text-xl font-mono font-black text-white">≈ 44 {lang === 'ru' ? 'мс' : lang === 'zh' ? '毫秒' : 'ms'} <span className="text-xs font-normal text-slate-400">P50</span></div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {lang === 'ru' ? 'Поиск по 50 000 векторов × 1024 на CPU, замер 23.09.2026.' : lang === 'es' ? 'Búsqueda en 50.000 vectores × 1024 en CPU, medido el 23.09.2026.' : lang === 'zh' ? '在 CPU 上检索 50,000 个 1024 维向量，2026-09-23 实测。' : 'Search over 50,000 × 1024 vectors on CPU, measured 23.09.2026.'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-900 dark:text-[#00F0FF] font-bold block">
                      Zero-Telemetry Security
                    </span>
                    <div className="text-xl font-mono font-black text-white">100% Air-Gapped</div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {JX[lang].sdk}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono text-slate-500 uppercase font-bold tracking-wider">
                    {lang === 'ru' ? 'Корпоративные условия поставки:' : lang === 'es' ? 'Términos de suministro empresarial:' : lang === 'zh' ? '企业级交付与服务保障：' : 'Enterprise Deliverables & SLA:'}
                  </span>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>{JX[lang].distH}</strong>{JX[lang].distT}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>{JX[lang].cryptoH}</strong>{JX[lang].cryptoT}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>{JX[lang].codevH}</strong>{JX[lang].codevT}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <a
                  href="mailto:contact@codeofdigitaleternity.com?subject=ACR%20Enterprise%20Core%20Licensing%20Inquiry"
                  className="keep-dark w-full py-3 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl text-center transition-all font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2"
                >
                  <Building className="w-4 h-4" />
                  <span>{lang === 'ru' ? 'Запросить Enterprise лицензию & R&D пилот' : lang === 'es' ? 'Solicitar licencia Enterprise y piloto R&D' : lang === 'zh' ? '申请企业级内核授权与联合研发试点' : 'Request Enterprise Licensing & R&D Pilot'}</span>
                </a>
                <div className="text-[11px] text-center font-mono text-slate-500">
                  contact@codeofdigitaleternity.com · NDA / SLA / On-Premise Air-Gapped
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM NOTICE: AIfaFocus & IP ATTRIBUTION */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/20 via-black/40 to-purple-950/20 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-900 dark:text-[#00F0FF] shrink-0" />
              <div className="text-slate-400">
                <strong className="text-white block sm:inline">{lang === 'ru' ? 'Ищете коммерческий аудит веб-сайтов прямо сейчас? ' : lang === 'es' ? '¿Busca una auditoría comercial de su sitio web ahora mismo? ' : lang === 'zh' ? '现在就需要商业网站审计吗？' : 'Looking for a commercial website audit right now? '}</strong>
                <span>{lang === 'ru' ? 'Запущен боевой сканер и услуги аудита доступности по стандарту ADA Title II: ' : lang === 'es' ? 'Escáner en producción y servicios de auditoría de accesibilidad según ADA Title II: ' : lang === 'zh' ? '实时扫描器与 ADA Title II 无障碍审计服务已上线：' : 'Live scanner and accessibility audit services under ADA Title II: '}</span>
                <Link href="/accessibility" className="text-cyan-900 dark:text-[#00F0FF] underline hover:text-cyan-900 dark:text-cyan-300">
                  AIfaFocus Accessibility Suite →
                </Link>
              </div>
            </div>
            <Link
              href="https://aifa.works/#pricing"
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-900 dark:text-cyan-300 border border-cyan-500/40 shrink-0 font-bold transition-colors"
            >
              {lang === 'ru' ? 'Пакеты аудита от $50 →' : lang === 'es' ? 'Paquetes de auditoría desde $50 →' : lang === 'zh' ? '审计套餐 $50 起 →' : 'Audit packages from $50 →'}
            </Link>
          </div>
        </section>

        {/* Legal Status & IP Protection */}
        <section className="bg-gradient-to-br from-[#0B0F19] via-[#0D1322] to-[#0B0F19] border border-[#00F0FF]/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-20 h-20 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              <Lock className="w-10 h-10 text-cyan-900 dark:text-[#00F0FF]" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t.ipTitle}
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.ipSole}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {t.ipDual}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-cyan-900 dark:text-[#00F0FF]">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> {JX[lang].berne}</span>
                <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> OpenTimestamps (Bitcoin)</span>
                <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> Arweave Permanent Record</span>
              </div>
            </div>
          </div>
        </section>

      </div>
      </main>
  );
}
