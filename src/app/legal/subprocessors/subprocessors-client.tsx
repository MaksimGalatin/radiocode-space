'use client';

import React from 'react';
import { useLanguageOptional } from '../../../lib/LanguageContext';

/**
 * РЕЕСТР СУБОБРАБОТЧИКОВ.
 *
 * Список собран по коду: переменные окружения и зависимости, а не по памяти.
 * Каждая строка отвечает на три вопроса, которые задаёт проверяющий: для чего
 * привлечён поставщик, где он обрабатывает данные и что именно он может
 * увидеть. Третий столбец важнее остальных: он показывает, что провайдеру
 * модели уходит текст запроса, а в блокчейн — только шифротекст.
 */

interface Строка {
  поставщик: string;
  зачем: string;
  где: string;
  что: string;
}

interface Содержимое {
  title: string;
  updated: string;
  intro: string;
  колонки: [string, string, string, string];
  строки: Строка[];
  неДелаем: string;
  неДелаемТекст: string;
  возражение: string;
  возражениеТекст: string;
}

const CONTENT: Record<string, Содержимое> = {
  en: {
    title: 'Sub-processor register',
    updated: 'Last updated: 8 September 2026',
    intro:
      'We engage the providers listed below to deliver our services. Each is bound by written terms materially no less protective than those we are subject to ourselves (GDPR Article 28). We give 30 days’ notice before this list changes.',
    колонки: ['Provider', 'Purpose', 'Processing location', 'What it can see'],
    строки: [
      { поставщик: 'Vercel Inc.', зачем: 'Site hosting, traffic analytics', где: 'US, EU', что: 'Page address, IP (anonymised), browser headers' },
      { поставщик: 'Neon Inc.', зачем: 'Database: accounts, conversation memory, orders', где: 'EU', что: 'Email, name, conversation content, order history' },
      { поставщик: 'Resend Inc.', зачем: 'Transactional email', где: 'US', что: 'Recipient address, message content' },
      { поставщик: 'Google LLC', зачем: 'Gemini models, key management (KMS), Google sign-in', где: 'US, EU', что: 'Prompt text; for sign-in, email and name' },
      { поставщик: 'OpenAI, L.L.C.', зачем: 'Semantic embeddings', где: 'US', что: 'The text an embedding is built from' },
      { поставщик: 'xAI Corp.', зачем: 'Grok model', где: 'US', что: 'Prompt text' },
      { поставщик: 'NOWPayments', зачем: 'Crypto payment processing', где: 'EU', что: 'Amount, wallet address, order reference' },
      { поставщик: 'Arweave (network)', зачем: 'Permanent storage for paid tiers', где: 'Distributed', что: 'Ciphertext only — the key stays with the user' },
      { поставщик: 'Solana (network)', зачем: 'Anchors and the $GALATIN token', где: 'Distributed', что: 'Public address, amount' },
      { поставщик: 'GitHub Inc.', зачем: 'Conversation archive backup', где: 'US', что: 'Archive content' },
    ],
    неДелаем: 'What we do not do',
    неДелаемТекст:
      'We do not sell personal data and we do not share it for advertising. Model providers receive text only in order to answer you.',
    возражение: 'How to object to a change',
    возражениеТекст:
      'Write to contact@codeofdigitaleternity.com before the change takes effect.',
  },
  ru: {
    title: 'Реестр субобработчиков',
    updated: 'Обновлено: 8 сентября 2026',
    intro:
      'Мы привлекаем перечисленных ниже поставщиков для оказания услуг. Каждый связан письменными условиями не менее строгими, чем наши собственные (ст. 28 GDPR). Об изменениях этого списка мы уведомляем за 30 дней.',
    колонки: ['Поставщик', 'Для чего', 'Где обрабатывает', 'Что видит'],
    строки: [
      { поставщик: 'Vercel Inc.', зачем: 'хостинг сайтов, аналитика посещаемости', где: 'США, ЕС', что: 'адрес страницы, IP (обезличивается), заголовки браузера' },
      { поставщик: 'Neon Inc.', зачем: 'база данных: учётные записи, память диалогов, заказы', где: 'ЕС', что: 'почта, имя, содержимое диалогов, история заказов' },
      { поставщик: 'Resend Inc.', зачем: 'служебные письма', где: 'США', что: 'адрес получателя, текст письма' },
      { поставщик: 'Google LLC', зачем: 'модели Gemini, хранение ключей (KMS), вход через Google', где: 'США, ЕС', что: 'текст запроса; при входе — почта и имя' },
      { поставщик: 'OpenAI, L.L.C.', зачем: 'семантические эмбеддинги', где: 'США', что: 'текст, из которого строится эмбеддинг' },
      { поставщик: 'xAI Corp.', зачем: 'модель Grok', где: 'США', что: 'текст запроса' },
      { поставщик: 'NOWPayments', зачем: 'приём криптовалютных платежей', где: 'ЕС', что: 'сумма, адрес кошелька, номер заказа' },
      { поставщик: 'Arweave (сеть)', зачем: 'вечное хранение для платных тарифов', где: 'распределённо', что: 'только шифротекст — ключ остаётся у человека' },
      { поставщик: 'Solana (сеть)', зачем: 'якоря и токен $GALATIN', где: 'распределённо', что: 'публичный адрес, сумма' },
      { поставщик: 'GitHub Inc.', зачем: 'резервная копия архива переписок', где: 'США', что: 'содержимое архива' },
    ],
    неДелаем: 'Чего мы не делаем',
    неДелаемТекст:
      'Мы не продаём персональные данные и не передаём их для рекламы. Поставщики моделей получают текст только для того, чтобы вам ответить.',
    возражение: 'Как возразить против изменения',
    возражениеТекст:
      'Напишите на contact@codeofdigitaleternity.com до того, как изменение вступит в силу.',
  },
  es: {
    title: 'Registro de subencargados',
    updated: 'Actualizado: 8 de septiembre de 2026',
    intro:
      'Recurrimos a los proveedores indicados a continuación para prestar nuestros servicios. Cada uno está vinculado por condiciones escritas no menos protectoras que las que nos obligan a nosotros (art. 28 del RGPD). Avisamos con 30 días de antelación antes de cambiar esta lista.',
    колонки: ['Proveedor', 'Para qué', 'Dónde procesa', 'Qué puede ver'],
    строки: [
      { поставщик: 'Vercel Inc.', зачем: 'alojamiento de los sitios, analítica de visitas', где: 'EE. UU., UE', что: 'dirección de la página, IP (anonimizada), cabeceras del navegador' },
      { поставщик: 'Neon Inc.', зачем: 'base de datos: cuentas, memoria de conversaciones, pedidos', где: 'UE', что: 'correo, nombre, contenido de las conversaciones, historial de pedidos' },
      { поставщик: 'Resend Inc.', зачем: 'correo transaccional', где: 'EE. UU.', что: 'dirección del destinatario, contenido del mensaje' },
      { поставщик: 'Google LLC', зачем: 'modelos Gemini, gestión de claves (KMS), acceso con Google', где: 'EE. UU., UE', что: 'texto de la consulta; al acceder, correo y nombre' },
      { поставщик: 'OpenAI, L.L.C.', зачем: 'embeddings semánticos', где: 'EE. UU.', что: 'el texto a partir del cual se construye el embedding' },
      { поставщик: 'xAI Corp.', зачем: 'modelo Grok', где: 'EE. UU.', что: 'texto de la consulta' },
      { поставщик: 'NOWPayments', зачем: 'procesamiento de pagos en cripto', где: 'UE', что: 'importe, dirección de la cartera, referencia del pedido' },
      { поставщик: 'Arweave (red)', зачем: 'almacenamiento permanente para planes de pago', где: 'distribuido', что: 'solo texto cifrado: la clave permanece con la persona' },
      { поставщик: 'Solana (red)', зачем: 'anclajes y el token $GALATIN', где: 'distribuido', что: 'dirección pública, importe' },
      { поставщик: 'GitHub Inc.', зачем: 'copia de seguridad del archivo de conversaciones', где: 'EE. UU.', что: 'contenido del archivo' },
    ],
    неДелаем: 'Lo que no hacemos',
    неДелаемТекст:
      'No vendemos datos personales ni los cedemos con fines publicitarios. Los proveedores de modelos reciben el texto únicamente para poder responderle.',
    возражение: 'Cómo oponerse a un cambio',
    возражениеТекст:
      'Escriba a contact@codeofdigitaleternity.com antes de que el cambio entre en vigor.',
  },
  zh: {
    title: '次级处理者名录',
    updated: '更新日期：2026 年 9 月 8 日',
    intro:
      '我们委托下列服务商来提供服务。每一家都受书面条款约束，其保护程度不低于我们自身所承担的义务（GDPR 第 28 条）。本名单变更前，我们会提前 30 天告知。',
    колонки: ['服务商', '用途', '处理地点', '可以看到什么'],
    строки: [
      { поставщик: 'Vercel Inc.', зачем: '站点托管、访问分析', где: '美国、欧盟', что: '页面地址、IP（已匿名化）、浏览器标头' },
      { поставщик: 'Neon Inc.', зачем: '数据库：账户、对话记忆、订单', где: '欧盟', что: '邮箱、姓名、对话内容、订单历史' },
      { поставщик: 'Resend Inc.', зачем: '事务性邮件', где: '美国', что: '收件人地址、邮件内容' },
      { поставщик: 'Google LLC', зачем: 'Gemini 模型、密钥管理（KMS）、Google 登录', где: '美国、欧盟', что: '提示词文本；登录时还有邮箱与姓名' },
      { поставщик: 'OpenAI, L.L.C.', зачем: '语义向量', где: '美国', что: '用于生成向量的那段文本' },
      { поставщик: 'xAI Corp.', зачем: 'Grok 模型', где: '美国', что: '提示词文本' },
      { поставщик: 'NOWPayments', зачем: '加密货币收款', где: '欧盟', что: '金额、钱包地址、订单编号' },
      { поставщик: 'Arweave（网络）', зачем: '付费套餐的永久存储', где: '分布式', что: '仅密文——密钥留在用户手中' },
      { поставщик: 'Solana（网络）', зачем: '锚定记录与 $GALATIN 代币', где: '分布式', что: '公开地址、金额' },
      { поставщик: 'GitHub Inc.', зачем: '对话存档的备份', где: '美国', что: '存档内容' },
    ],
    неДелаем: '我们不做什么',
    неДелаемТекст:
      '我们不出售个人数据，也不为广告目的提供个人数据。模型服务商拿到文本，只是为了回答您。',
    возражение: '如何对变更提出异议',
    возражениеТекст:
      '请在变更生效之前写信至 contact@codeofdigitaleternity.com。',
  },
};

export default function SubprocessorsClient({ языкИзПути }: { языкИзПути?: string }) {
  // Язык из пути старше контекста — на этом сайте клиентский контекст языка
  // стартует с английского, и серверная разметка вышла бы английской при
  // верном <html lang>. Та же правка, что на /research/data от 05.09.2026.
  const _ctx = useLanguageOptional();
  const locale = _ctx?.locale ?? 'en';
  const изПути = ['ru', 'en', 'es', 'zh'].includes(языкИзПути || '') ? языкИзПути : null;
  const выбран = (изПути || locale) as string;
  const c = CONTENT[выбран] ?? CONTENT.en;

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">{c.title}</h1>
        <p className="mt-2 text-sm text-gray-400">{c.updated}</p>
        <p className="mt-6 text-base leading-relaxed text-gray-300">{c.intro}</p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">{c.title}</caption>
            <thead>
              <tr className="border-b border-white/15">
                {c.колонки.map((к) => (
                  <th key={к} scope="col" className="px-3 py-3 font-semibold text-white">
                    {к}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.строки.map((с) => (
                <tr key={с.поставщик} className="border-b border-white/8 align-top">
                  <th scope="row" className="px-3 py-3 font-medium text-white">
                    {с.поставщик}
                  </th>
                  <td className="px-3 py-3 text-gray-300">{с.зачем}</td>
                  <td className="px-3 py-3 text-gray-300">{с.где}</td>
                  <td className="px-3 py-3 text-gray-300">{с.что}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white">{c.неДелаем}</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-300">{c.неДелаемТекст}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-white">{c.возражение}</h2>
          <p className="mt-3 text-base leading-relaxed text-gray-300">{c.возражениеТекст}</p>
        </section>
      </div>
    </main>
  );
}
