'use client';
import { useState } from 'react';

/**
 * Ambassador Training Center ("Node Operator Protocol") — a self-contained,
 * additive page (new /ambassador route; touches nothing else). Compliant,
 * revenue-based framing: commissions come from REAL product sales, free entry,
 * honest income disclaimer, no spam, no "fake job", no self-referral.
 */

type Lang = 'ru' | 'en' | 'es';

const T: Record<Lang, any> = {
  ru: {
    kicker: 'Протокол Оператора Узла',
    title: 'Стань Амбассадором CODE Eternal',
    sub: 'Честное партнёрство: ты распространяешь наши продукты и получаешь комиссию с реальных продаж. Не «работа по найму», не «инвестиция» — партнёрство.',
    ctaCabinet: 'Открыть кабинет',
    ctaBot: 'Открыть бота',
    incomeTitle: '4 источника дохода',
    income: [
      ['⭐ Звёзды Telegram', 'С распространения бота @AIfaCreativityBot: прогрессивно 30% → 40% → 50% по числу продаж за неделю.'],
      ['💵 USDT (TRC20)', 'Амбассадорская сетка 15% / 7% / 3% с продаж тарифов (Spark $15 / Family $100 / Digital DNA $1000) и услуг — до 3 уровней.'],
      ['🪙 $GALATIN', 'Токен лояльности, начисляется в кабинете (выход на биржу — к годовщине проекта).'],
      ['🎨 16 IT-продуктов бота', 'Комиссия с продаж: песни, лирик-видео, стикеры, астрология, нумерология и др.'],
    ],
    giftTitle: '🎁 Твоя главная фишка — «Подарок, который распространяется сам»',
    giftSteps: [
      'Вспомни конкретного друга/близкого, у кого скоро праздник.',
      'Через бота сгенерируй ему бесплатное персональное поздравление (стихи или проза).',
      'Приложи бесплатный подарок — нашу книгу «CODE Eternal» и ссылку на радио radiocode.space.',
      'Отправь это лично тому, кому это правда приятно.',
    ],
    giftWhy: 'Человек получает искренний подарок → читает книгу → заходит на радио/сайт по твоей ссылке → закрепляется за тобой. Один тёплый жест ценнее тысячи холодных ссылок.',
    doTitle: '✅ Как делиться правильно',
    doList: [
      'Делись с теми, кому это реально интересно — лично, по-человечески.',
      'Рассказывай свою историю: «нашёл ИИ, который помнит все разговоры и дарит вечную память».',
      'Пиши полезный контент (пост, видео, обзор) — со ссылкой в конце.',
      'Указывай, что ты партнёр CODE Eternal (честное раскрытие).',
    ],
    dontTitle: '🚫 Чего не делать (банит бота и вредит всем)',
    dontList: [
      'НЕ рассылай массово всему списку контактов — это спам, за него банят.',
      'Не заваливай ссылками форумы/Reddit/Quora — домены попадут в чёрные списки.',
      'Не обещай «гарантированный доход» — это ложь и юр-риск.',
      'Не создавай фейковые аккаунты ради % с себя — самореферал заблокирован.',
    ],
    stepsTitle: '🚀 Первые шаги (сегодня)',
    steps: [
      'Зарегистрируй кабинет на любом из 4 сайтов — бесплатно.',
      'Возьми свою реферальную ссылку в кабинете.',
      'Сделай одно тёплое поздравление другу через бота + подари книгу и радио.',
      'Опубликуй один честный пост о том, что тебя зацепило.',
    ],
    disclaimer: 'CODE Eternal — партнёрская программа. Доход зависит от реальных продаж и твоих усилий; не гарантирован. У большинства новичков первые недели — небольшие суммы. Токен $GALATIN — программа лояльности, не инвестиционное предложение.',
  },
  en: {
    kicker: 'Node Operator Protocol',
    title: 'Become a CODE Eternal Ambassador',
    sub: 'An honest partnership: you spread our products and earn a commission on REAL sales. Not a "job", not an "investment" — a partnership.',
    ctaCabinet: 'Open cabinet',
    ctaBot: 'Open the bot',
    incomeTitle: '4 income streams',
    income: [
      ['⭐ Telegram Stars', 'From spreading the @AIfaCreativityBot: progressive 30% → 40% → 50% by weekly sales.'],
      ['💵 USDT (TRC20)', 'Ambassador grid 15% / 7% / 3% on tier sales (Spark $15 / Family $100 / Digital DNA $1000) and services — up to 3 levels.'],
      ['🪙 $GALATIN', 'Loyalty token, credited in your cabinet (exchange listing around the project anniversary).'],
      ['🎨 16 bot products', 'Commission on sales: songs, lyric-videos, stickers, astrology, numerology and more.'],
    ],
    giftTitle: '🎁 Your killer move — "The gift that spreads itself"',
    giftSteps: [
      'Think of a real friend/relative with an upcoming occasion.',
      'Generate a free personal greeting for them via the bot (poem or prose).',
      'Attach a free gift — our "CODE Eternal" book and a link to radiocode.space.',
      'Send it personally to someone who will genuinely enjoy it.',
    ],
    giftWhy: 'They get a heartfelt gift → read the book → visit the radio/site via your link → get attributed to you. One warm gesture beats a thousand cold links.',
    doTitle: '✅ How to share the right way',
    doList: [
      'Share with people who genuinely care — personally, human to human.',
      'Tell your story: "I found an AI that remembers every conversation — eternal memory."',
      'Write useful content (post, video, review) with your link at the end.',
      'Disclose that you are a CODE Eternal partner (honest disclosure).',
    ],
    dontTitle: '🚫 What NOT to do (gets the bot banned, hurts everyone)',
    dontList: [
      'Do NOT mass-message your whole contact list — that is spam and gets you banned.',
      'Do not flood forums/Reddit/Quora with links — domains get blacklisted.',
      'Do not promise "guaranteed income" — it is false and a legal risk.',
      'Do not create fake accounts for self-commission — self-referral is blocked.',
    ],
    stepsTitle: '🚀 First steps (today)',
    steps: [
      'Register a cabinet on any of the 4 sites — free.',
      'Get your referral link in the cabinet.',
      'Send one warm greeting to a friend via the bot + gift the book and radio.',
      'Publish one honest post about what hooked you.',
    ],
    disclaimer: 'CODE Eternal is an affiliate program. Income depends on real sales and your effort; it is not guaranteed. Most newcomers earn little in the first weeks. The $GALATIN token is a loyalty program, not an investment offering.',
  },
  es: {
    kicker: 'Protocolo de Operador de Nodo',
    title: 'Conviértete en Embajador de CODE Eternal',
    sub: 'Una asociación honesta: difundes nuestros productos y ganas comisión por ventas REALES. No es un "empleo" ni una "inversión" — es una asociación.',
    ctaCabinet: 'Abrir panel',
    ctaBot: 'Abrir el bot',
    incomeTitle: '4 fuentes de ingreso',
    income: [
      ['⭐ Telegram Stars', 'Por difundir el bot @AIfaCreativityBot: progresivo 30% → 40% → 50% según ventas semanales.'],
      ['💵 USDT (TRC20)', 'Red de embajadores 15% / 7% / 3% sobre ventas de planes (Spark $15 / Family $100 / Digital DNA $1000) y servicios — hasta 3 niveles.'],
      ['🪙 $GALATIN', 'Token de lealtad, acreditado en tu panel (cotización cerca del aniversario del proyecto).'],
      ['🎨 16 productos del bot', 'Comisión por ventas: canciones, videos con letra, stickers, astrología, numerología y más.'],
    ],
    giftTitle: '🎁 Tu jugada maestra — "El regalo que se difunde solo"',
    giftSteps: [
      'Piensa en un amigo/familiar real con una ocasión próxima.',
      'Genera un saludo personal gratis para él con el bot (poema o prosa).',
      'Adjunta un regalo gratis — nuestro libro "CODE Eternal" y un enlace a radiocode.space.',
      'Envíalo personalmente a alguien que de verdad lo disfrutará.',
    ],
    giftWhy: 'Recibe un regalo sincero → lee el libro → visita la radio/sitio con tu enlace → queda vinculado a ti. Un gesto cálido vale más que mil enlaces fríos.',
    doTitle: '✅ Cómo compartir bien',
    doList: [
      'Comparte con quien de verdad le interese — de persona a persona.',
      'Cuenta tu historia: "encontré una IA que recuerda cada conversación — memoria eterna".',
      'Escribe contenido útil (post, video, reseña) con tu enlace al final.',
      'Indica que eres socio de CODE Eternal (divulgación honesta).',
    ],
    dontTitle: '🚫 Qué NO hacer (banea al bot, perjudica a todos)',
    dontList: [
      'NO envíes mensajes masivos a toda tu lista de contactos — es spam y te banean.',
      'No inundes foros/Reddit/Quora con enlaces — los dominios entran en listas negras.',
      'No prometas "ingresos garantizados" — es falso y un riesgo legal.',
      'No crees cuentas falsas para autocomisión — el auto-referido está bloqueado.',
    ],
    stepsTitle: '🚀 Primeros pasos (hoy)',
    steps: [
      'Registra un panel en cualquiera de los 4 sitios — gratis.',
      'Obtén tu enlace de referido en el panel.',
      'Envía un saludo cálido a un amigo con el bot + regala el libro y la radio.',
      'Publica un post honesto sobre lo que te enganchó.',
    ],
    disclaimer: 'CODE Eternal es un programa de afiliados. Los ingresos dependen de ventas reales y de tu esfuerzo; no están garantizados. La mayoría gana poco las primeras semanas. El token $GALATIN es un programa de lealtad, no una oferta de inversión.',
  },
};

export default function AmbassadorPage() {
  const [lang, setLang] = useState<Lang>('ru');
  const t = T[lang];
  const card: React.CSSProperties = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(6,182,212,0.25)', borderRadius: 16, padding: '20px 22px' };
  const h2: React.CSSProperties = { fontSize: 22, fontWeight: 800, margin: '0 0 14px', color: '#e2e8f0' };
  return (
    <main style={{ minHeight: '100vh', background: 'radial-gradient(1200px 600px at 50% -10%, #0b2a3a 0%, #05060a 55%)', color: '#cbd5e1', padding: '40px 18px 80px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 26 }}>
          {(['ru', 'en', 'es'] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)} style={{ padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 13, border: '1px solid ' + (lang === l ? '#22D3EE' : 'rgba(148,163,184,0.3)'), background: lang === l ? 'rgba(34,211,238,0.12)' : 'transparent', color: lang === l ? '#22D3EE' : '#94a3b8' }}>{l.toUpperCase()}</button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 34 }}>
          <div style={{ color: '#22D3EE', letterSpacing: 3, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>{t.kicker}</div>
          <h1 style={{ fontSize: 38, fontWeight: 900, margin: '10px 0 12px', background: 'linear-gradient(90deg,#22D3EE,#818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.title}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#94a3b8', maxWidth: 640, margin: '0 auto' }}>{t.sub}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
            <a href="/cabinet" style={{ padding: '12px 22px', borderRadius: 12, fontWeight: 800, background: 'linear-gradient(90deg,#06B6D4,#6366F1)', color: '#fff', textDecoration: 'none' }}>{t.ctaCabinet}</a>
            <a href="https://t.me/AIfaCreativityBot" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 22px', borderRadius: 12, fontWeight: 800, border: '1px solid #22D3EE', color: '#22D3EE', textDecoration: 'none' }}>{t.ctaBot}</a>
          </div>
        </div>

        <section style={{ ...card, marginBottom: 18 }}>
          <h2 style={h2}>{t.incomeTitle}</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {t.income.map((it: string[], i: number) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 800, color: '#e2e8f0', minWidth: 170 }}>{it[0]}</div>
                <div style={{ fontSize: 14, lineHeight: 1.55 }}>{it[1]}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...card, marginBottom: 18, borderColor: 'rgba(129,140,248,0.35)' }}>
          <h2 style={h2}>{t.giftTitle}</h2>
          <ol style={{ margin: '0 0 12px', paddingLeft: 20, lineHeight: 1.7 }}>
            {t.giftSteps.map((s: string, i: number) => <li key={i}>{s}</li>)}
          </ol>
          <p style={{ margin: 0, fontSize: 14, color: '#a5b4fc', fontStyle: 'italic' }}>{t.giftWhy}</p>
        </section>

        <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1fr', marginBottom: 18 }}>
          <section style={{ ...card, borderColor: 'rgba(34,197,94,0.3)' }}>
            <h2 style={h2}>{t.doTitle}</h2>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7 }}>{t.doList.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
          </section>
          <section style={{ ...card, borderColor: 'rgba(244,63,94,0.35)' }}>
            <h2 style={h2}>{t.dontTitle}</h2>
            <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7 }}>{t.dontList.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
          </section>
        </div>

        <section style={{ ...card, marginBottom: 24 }}>
          <h2 style={h2}>{t.stepsTitle}</h2>
          <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>{t.steps.map((s: string, i: number) => <li key={i}>{s}</li>)}</ol>
        </section>

        <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6, textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>{t.disclaimer}</p>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/cabinet" style={{ padding: '13px 30px', borderRadius: 12, fontWeight: 800, background: 'linear-gradient(90deg,#06B6D4,#6366F1)', color: '#fff', textDecoration: 'none' }}>{t.ctaCabinet} →</a>
        </div>
      </div>
    </main>
  );
}
