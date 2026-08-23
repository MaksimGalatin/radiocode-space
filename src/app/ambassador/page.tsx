'use client';
import { useState } from 'react';
import { useCurrentLang } from '@/lib/radioI18n';

/**
 * Ambassador Training Center ("Node Operator Protocol") — a self-contained,
 * additive page (new /ambassador route; touches nothing else). Compliant,
 * revenue-based framing: commissions come from REAL product sales, free entry,
 * honest income disclaimer, no spam, no "fake job", no self-invitation.
 */

type Lang = 'ru' | 'en' | 'es' | 'zh';

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
      ['💵 USDT (TRC20)', 'Амбассадорская сетка: 15% / 7% / 3% — каждому амбассадору с ончейн-транзакций памяти в $GALATIN, до 3 уровней. Бизнес-партнёрам, подключившим свою базу пользователей, сверх этого — 7% / 3% / 1% с фиатных продаж лицензий и подписок (Spark $15 / Family $100 / Digital DNA $1 000 разово за устройство, далее $200/мес).'],
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
      'Не создавай фейковые аккаунты ради % с себя — приглашение самого себя заблокирован.',
    ],
    stepsTitle: '🚀 Первые шаги (сегодня)',
    steps: [
      'Зарегистрируй кабинет на любом из 4 сайтов — бесплатно.',
      'Возьми свою амбассадорскую ссылку в кабинете.',
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
      ['💵 USDT (TRC20)', 'Ambassador grid: 15% / 7% / 3% — to every ambassador, on on-chain memory transactions paid in $GALATIN, up to 3 levels. Business partners who connect their own user base receive, on top of that, 7% / 3% / 1% on fiat sales of licenses and subscriptions (Spark $15 / Family $100 / Digital DNA $1,000 one-time per device, then $200/mo).'],
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
      'Do not create fake accounts for self-commission — inviting yourself is blocked.',
    ],
    stepsTitle: '🚀 First steps (today)',
    steps: [
      'Register a cabinet on any of the 4 sites — free.',
      'Get your ambassador link in the cabinet.',
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
      ['💵 USDT (TRC20)', 'Red de embajadores: 15% / 7% / 3% — para cada embajador, sobre transacciones de memoria on-chain pagadas en $GALATIN, hasta 3 niveles. Los socios comerciales que conectan su propia base de usuarios reciben, además, 7% / 3% / 1% sobre las ventas en fiat de licencias y suscripciones (Spark $15 / Family $100 / Digital DNA $1000 pago único por dispositivo, luego $200/mes).'],
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
      'No crees cuentas falsas para autocomisión — invitarte a ti mismo está bloqueado.',
    ],
    stepsTitle: '🚀 Primeros pasos (hoy)',
    steps: [
      'Registra un panel en cualquiera de los 4 sitios — gratis.',
      'Obtén tu enlace de embajador en el panel.',
      'Envía un saludo cálido a un amigo con el bot + regala el libro y la radio.',
      'Publica un post honesto sobre lo que te enganchó.',
    ],
    disclaimer: 'CODE Eternal es un programa de afiliados. Los ingresos dependen de ventas reales y de tu esfuerzo; no están garantizados. La mayoría gana poco las primeras semanas. El token $GALATIN es un programa de lealtad, no una oferta de inversión.',
  },
  zh: {
    kicker: '节点运营者协议',
    title: '成为 CODE Eternal 大使',
    sub: '诚实的合作关系：你传播我们的产品，并从真实销售中获得佣金。这不是「雇佣工作」，也不是「投资」——而是合作。',
    ctaCabinet: '打开个人中心',
    ctaBot: '打开机器人',
    incomeTitle: '4 种收入来源',
    income: [
      ['⭐ Telegram 星星', '来自传播 @AIfaCreativityBot 机器人：按每周销量递进 30% → 40% → 50%。'],
      ['💵 USDT (TRC20)', '大使网络：每位大使均可获得链上记忆交易的 15% / 7% / 3%（以 $GALATIN 结算，最多 3 级）。接入自有用户群的商业伙伴，在此之上另获许可与订阅法币销售的 7% / 3% / 1%（Spark $15 / Family $100 / Digital DNA $1 000 一次性（按设备），之后每月 $200）。'],
      ['🪙 $GALATIN', '忠诚度代币，记入你的个人中心（预计在项目周年前后上线交易所）。'],
      ['🎨 机器人的 16 款 IT 产品', '销售佣金：歌曲、歌词视频、贴纸、占星、数字命理等。'],
    ],
    giftTitle: '🎁 你的王牌——「会自己传播的礼物」',
    giftSteps: [
      '想一位即将迎来节日或纪念日的朋友或亲人。',
      '通过机器人为他生成一份免费的个性化祝福（诗歌或散文）。',
      '附上免费礼物——我们的《CODE Eternal》一书，以及电台链接 radiocode.space。',
      '亲自把它发送给真正会为此高兴的人。',
    ],
    giftWhy: '对方收到真诚的礼物 → 阅读书籍 → 通过你的链接访问电台／网站 → 归属到你名下。一个温暖的举动，胜过一千条冰冷的链接。',
    doTitle: '✅ 如何正确地分享',
    doList: [
      '只分享给真正感兴趣的人——一对一，像人与人之间那样。',
      '讲述你自己的故事：「我找到了一个记得每一次对话、并赋予永恒记忆的 AI」。',
      '撰写有价值的内容（帖子、视频、评测），并在结尾附上你的链接。',
      '注明你是 CODE Eternal 的合作伙伴（诚实披露）。',
    ],
    dontTitle: '🚫 不要做的事（会导致机器人被封，并损害所有人）',
    dontList: [
      '不要向全部联系人群发——那是垃圾信息，会被封号。',
      '不要在论坛／Reddit／Quora 刷链接——域名会被列入黑名单。',
      '不要承诺「保证收益」——这是虚假陈述，并带来法律风险。',
      '不要为了赚取自己的佣金而创建虚假账户——自我邀请已被封锁。',
    ],
    stepsTitle: '🚀 今天就可以开始的第一步',
    steps: [
      '在 4 个网站中的任意一个免费注册个人中心。',
      '在个人中心获取属于你的大使链接。',
      '通过机器人给一位朋友送上温暖的祝福，并赠送书籍与电台。',
      '发布一篇关于「什么打动了你」的诚实帖子。',
    ],
    disclaimer: 'CODE Eternal 是合作伙伴（联盟）计划。收入取决于真实销售与你的努力，并不保证。多数新人在最初几周收入很少。$GALATIN 代币属于忠诚度计划，并非投资要约。',
  },
};

const LANGS: Lang[] = ['ru', 'en', 'es', 'zh'];

export default function AmbassadorPage() {
  // Follow the language selected on the site; a click on the local switcher
  // below overrides it for this page only.
  const locale = useCurrentLang();
  const [override, setOverride] = useState<Lang | null>(null);
  const lang: Lang = override ?? (LANGS.includes(locale as Lang) ? (locale as Lang) : 'en');
  const setLang = (l: Lang) => setOverride(l);
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
          {/* fontSize 12 → 13: под правило «мелкого текста нет нигде».
              Контраст у #22D3EE и так был 9.94, менялся только размер. */}
          <div style={{ color: '#22D3EE', letterSpacing: 3, fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>{t.kicker}</div>
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

        {/* Юридическая оговорка. Было fontSize 12 и цвет #64748b — контраст
            4.28 на фоне #050507 при норме 4.5. Именно оговорку читают
            внимательнее всего, а она была самым тусклым текстом страницы.
            #94A3B8 даёт 7.94, размер поднят до 13px. */}
        <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>{t.disclaimer}</p>
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/cabinet" style={{ padding: '13px 30px', borderRadius: 12, fontWeight: 800, background: 'linear-gradient(90deg,#06B6D4,#6366F1)', color: '#fff', textDecoration: 'none' }}>{t.ctaCabinet} →</a>
        </div>
      </div>
    </main>
  );
}
