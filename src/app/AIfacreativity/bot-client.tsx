'use client';

/**
 * Страница продукта AIfa Creativity.
 *
 * 24.09.2026 — переписана в презентацию продукта (слово Архитектора: «расскажи что это, про
 * возможность заработать… сделай презентабельную страницу»).
 * 30.09.2026 — второй заход, слово Архитектора: «нужно красиво расписать ВСЕ услуги и как всё
 * работает… Кликая по каждой из Услуг должен быть Образец». Каталог теперь — 22 услуги из
 * services.ts: клик открывает окно с подробным описанием, вопросами AIfa, тем, что придёт, и
 * образцом. Образцы — НАСТОЯЩИЕ выдачи бота (public/creativity/samples), прочитанные целиком.
 *
 * 01.10.2026 — третий заход, слово Архитектора: «РАСПИСАТЬ детально ВСЁ на странице, каждую услугу!» и
 * «Нужно просто сделать их шире и информативнее до клика мышью». Карточки — две в ряд, с картинкой из образца,
 * «Кому и когда», полным описанием, тем, что придёт, сроком и кнопкой сразу в услугу (?start=buy_<sku>).
 *
 * Исправлено против прежней страницы:
 *   • бот говорит на трёх языках (en/ru/es), а не на четырёх — китайского в боте нет;
 *   • в блоке заработка — как это устроено по шагам и пример расчёта из кода бота
 *     (referral.ts: NET_CENTS_PER_STAR ≈ 1,2675; weeklyRate 30/40/50 %; неделя с понедельника UTC).
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Music, Mic, Sparkles, Image as ImageIcon, Send, Smile, PenTool, Heart, Moon, Users, HelpCircle,
  BookOpen, Compass, ShieldAlert, Award, Star, ArrowUpRight, Video, Volume2, Gift,
  MessageCircle, ListChecks, Eye, Wallet, Zap, Globe, Coins, CalendarHeart, Package, TrendingUp, Link2,
  X, Clock, PlayCircle, ChevronRight, Calculator,
} from 'lucide-react';
import { SERVICES, CATS, SAMPLE_IDS, SAMPLE_LANGS, CARD, В_БОТЕ_СРАЗУ, type Service, type L } from './services';

type Lang = 'ru' | 'en' | 'es' | 'zh';
type Icon = React.ComponentType<{ className?: string }>;

const ICONS: Record<string, Icon> = {
  Music, Mic, Video, Gift, Volume2, BookOpen, ShieldAlert, Star, PenTool, Heart, Send, Image: ImageIcon,
  Smile, Sparkles, Compass, Moon, Users, Award, CalendarHeart, Package,
};

interface Content {
  badge: string; title: string; subtitle: string; ctaBot: string; ctaEarn: string; trust: string[];
  whatH: string; whatP: string[];
  howH: string; steps: { t: string; d: string }[];
  catsH: string; catsLead: string;
  freeH: string; free: { icon: Icon; t: string; d: string }[];
  earnH: string; earnLead: string; earnStepsH: string; earnSteps: string[];
  tiersH: string; tiers: { pct: string; d: string }[];
  exampleH: string; exampleP: string;
  earnPoints: string[]; earnCta: string;
  techH: string; techP: string;
  faqH: string; faq: { q: string; a: string }[];
  finalH: string; finalP: string;
}

const BOT = 'https://t.me/AIfaCreativityBot';
const EARN = 'https://t.me/AIfaCreativityBot?start=ambassador';
/** Кнопка «Создать» ведёт сразу в услугу: бот понимает ?start=buy_<sku> (bot/src/bot.ts, показатьТовар). */
const вБот = (id: string) => (В_БОТЕ_СРАЗУ.has(id) ? `${BOT}?start=buy_${id}` : BOT);

const D: Record<Lang, Content> = {
  ru: {
    badge: 'Telegram-бот · оплата Telegram Stars · от $0.99',
    title: 'AIfa Creativity — личный цифровой контент за минуты',
    subtitle: 'Песни, сказки, открытки, стихи, прогнозы и подарки, созданные именно про вас и ваших близких. Вы отвечаете на несколько вопросов — AIfa создаёт, вы получаете результат прямо в Telegram.',
    ctaBot: 'Открыть AIfa в Telegram',
    ctaEarn: 'Зарабатывать с AIfa',
    trust: ['Образец каждой услуги — бесплатно, до оплаты', 'Бот говорит по-русски, по-английски и по-испански', 'Оплата Telegram Stars: Apple Pay, Google Pay, карта'],
    whatH: 'Что это',
    whatP: [
      'AIfa Creativity — творческая студия искусственного интеллекта внутри Telegram. Она создаёт не шаблонные открытки из каталога, а персональные вещи: песню с именем мамы, сказку, где героем стал ваш ребёнок, стих к годовщине, где упомянуто то самое море, на котором вы познакомились.',
      'Всё, что нужно, — рассказать о человеке и поводе. AIfa задаст несколько коротких вопросов, покажет образец и создаст результат, который можно сохранить, переслать или подарить в том же Telegram.',
    ],
    howH: 'Как это работает',
    steps: [
      { t: 'Выберите, что создать', d: 'Откройте бота @AIfaCreativityBot — в меню 22 услуги в пяти разделах: музыка и видео, книги и истории, тексты и открытки, астрология, наборы подарков. Не знаете, что выбрать, — ниже на этой странице у каждой услуги расписано, кому она подходит и что придёт, а кнопка «Создать в Telegram» открывает нужную услугу в боте сразу.' },
      { t: 'Ответьте на несколько вопросов', d: 'AIfa спрашивает по одному вопросу: кому подарок, какой повод, что обязательно упомянуть — имена, общие воспоминания, шутки, любимые места — и какое нужно настроение. Где есть готовые варианты, отвечаете одной кнопкой, остальное пишете своими словами. Чем больше живых деталей, тем сильнее человек узнаёт в подарке себя.' },
      { t: 'Посмотрите образец', d: 'У каждой услуги в боте есть кнопка «Посмотреть образец» — это настоящая работа AIfa по пробному заказу. Ещё до оплаты видно, какой длины будет текст, как звучат голос и музыка, как выглядят картинки и PDF-книга. Те же образцы открываются и на этой странице: кнопка «Подробнее и образец» в карточке услуги.' },
      { t: 'Оплатите звёздами Telegram', d: 'Оплата — Telegram Stars, официальная валюта Telegram. Звёзды покупаются прямо в приложении через Apple Pay, Google Pay или банковскую карту, без регистрации на сторонних сайтах. Цены — от $0.99 (⭐60); подписка AIfa+ — $4.99 в месяц, отменяется в любой момент.' },
      { t: 'Получите результат', d: 'Готовое приходит в тот же чат: тексты и картинки — за 15–30 секунд, песни, видео и главы историй — за несколько минут. Подарок можно сохранить, переслать близкому, распечатать PDF или добавить стикеры в Telegram. Стих, любовное письмо, гороскоп, тайну имени, толкование сна и совместимость можно бесплатно переделать дважды.' },
    ],
    catsH: 'Что можно создать',
    catsLead: 'У каждой услуги — кому она подходит, что вы получите, сколько ждать и цена. «Подробнее и образец» откроет вопросы AIfa и настоящий образец, «Создать в Telegram» — сразу эту услугу в боте. Цены в долларах; в боте оплата звёздами Telegram по тому же курсу.',
    freeH: 'Бесплатно',
    free: [
      { icon: Sparkles, t: 'Мини-прогноз', d: 'Короткий прогноз по дате рождения.' },
      { icon: Users, t: 'Режим для пары', d: 'Каждый из двоих отвечает о себе — AIfa создаёт общий портрет пары.' },
      { icon: CalendarHeart, t: 'Напоминания о датах', d: 'Сохраните дни рождения близких — AIfa напомнит за 3 дня, чтобы успеть с подарком.' },
      { icon: BookOpen, t: 'Книга в подарок', d: 'Каждому новому пользователю — повесть «PADAM Protocol», обе части, созданная человеком и ИИ.' },
    ],
    earnH: 'Зарабатывайте с AIfa',
    earnLead: 'Поделитесь своей ссылкой из бота — и получайте процент с каждой оплаты людей, которые пришли по ней. Никаких вложений и закупок: вы рекомендуете продукт, AIfa делает всё остальное.',
    earnStepsH: 'Как это устроено',
    earnSteps: [
      'Откройте бота по кнопке ниже — он выдаст вашу личную ссылку.',
      'Делитесь ею где удобно: в соцсетях, чатах, своём канале, с друзьями.',
      'Человек открывает бота по вашей ссылке и закрепляется за вами.',
      'С каждой его оплаты вам начисляется процент — это видно в кабинете амбассадора в боте.',
    ],
    tiersH: 'Ваш процент',
    tiers: [
      { pct: '30%', d: 'стартовая ставка — с первой оплаты' },
      { pct: '40%', d: 'на неделю, если за прошлую неделю по ссылке было 10+ оплат' },
      { pct: '50%', d: 'на неделю, если за прошлую неделю было 60+ оплат' },
    ],
    exampleH: 'Пример расчёта',
    exampleP: 'Подруга по вашей ссылке заказала песню с вокалом за ⭐180. До нас доходит около $2.28 (после обмена звезда стоит примерно 1,27 цента). Ваши 30 % — $0.68; на неделе со ставкой 40 % — $0.91, со ставкой 50 % — $1.14. Десять оплат по вашей ссылке за неделю — и всю следующую неделю вы получаете 40 %.',
    earnPoints: [
      'Процент считается от суммы, которая дошла от Telegram, с каждой оплаты приглашённого — и с подписки тоже.',
      'Неделя считается с понедельника 00:00 по UTC: ставка новой недели зависит от числа оплат по вашей ссылке за прошлую.',
      'Кабинет амбассадора в боте показывает продажи и заработок за неделю и за всё время.',
      'Для каналов и сообществ — фирменная ссылка: команда /brand в боте.',
    ],
    earnCta: 'Получить свою ссылку',
    techH: 'На чём работает',
    techP: 'Тексты и иллюстрации — модели Google Gemini, музыка — Google Lyria, голос — синтез речи Google. Всё создаётся заново под ваш запрос, без шаблонов из каталога.',
    faqH: 'Вопросы и ответы',
    faq: [
      { q: 'Как оплатить?', a: 'Звёздами Telegram (⭐) — официальной валютой Telegram. Их можно купить прямо в приложении через Apple Pay, Google Pay или банковскую карту.' },
      { q: 'Сколько ждать результат?', a: 'Тексты и картинки приходят за 15–30 секунд, песни, видео и интерактивные истории — за несколько минут.' },
      { q: 'Можно ли посмотреть, что я получу?', a: 'Да. Нажмите на любую услугу на этой странице, а в боте у каждой услуги есть кнопка «Пример» — образец видно до оплаты.' },
      { q: 'Если текст не понравился?', a: 'Текстовые работы можно бесплатно переделать дважды.' },
      { q: 'На каких языках работает AIfa?', a: 'Бот говорит по-русски, по-английски и по-испански и сам берёт язык из настроек Telegram. Песни, стихи и письма можно заказать на любом из этих трёх языков.' },
      { q: 'Что такое книга в подарок?', a: '«PADAM Protocol» — киберпанк-повесть в двух частях, созданная человеком и ИИ. AIfa дарит обе части каждому новому пользователю.' },
    ],
    finalH: 'Создайте первый подарок сегодня',
    finalP: 'Откройте бота, выберите повод и посмотрите образец — это бесплатно.',
  },
  en: {
    badge: 'Telegram bot · paid in Telegram Stars · from $0.99',
    title: 'AIfa Creativity — personal digital content in minutes',
    subtitle: 'Songs, fairy tales, cards, poems, forecasts and gifts made about you and the people you love. Answer a few questions — AIfa creates it, and you get the result right in Telegram.',
    ctaBot: 'Open AIfa in Telegram',
    ctaEarn: 'Earn with AIfa',
    trust: ['A free sample of every service before you pay', 'The bot speaks English, Russian and Spanish', 'Paid in Telegram Stars: Apple Pay, Google Pay, card'],
    whatH: 'What it is',
    whatP: [
      'AIfa Creativity is an AI creative studio inside Telegram. It does not pick a template from a catalog — it makes personal things: a song that names your mom, a fairy tale where your child is the hero, an anniversary poem that mentions the very sea where you met.',
      'All you do is tell it about the person and the occasion. AIfa asks a few short questions, shows a sample and creates a result you can keep, forward or give as a gift in the same Telegram.',
    ],
    howH: 'How it works',
    steps: [
      { t: 'Pick what to create', d: 'Open @AIfaCreativityBot — its menu has 22 services in five sections: music and video, books and stories, texts and cards, astrology, gift sets. Not sure which to choose? Below on this page every service says who it suits and what you get, and the “Create in Telegram” button opens that very service in the bot.' },
      { t: 'Answer a few questions', d: 'AIfa asks one question at a time: who the gift is for, the occasion, what must be mentioned — names, shared memories, jokes, favourite places — and the mood you want. Where there are ready options, you answer with one tap; everything else you write in your own words. The more living details you give, the more the person recognises themselves in the gift.' },
      { t: 'See a sample', d: 'Every service in the bot has a “See a sample” button — a real piece of AIfa’s work from a test order. Before paying you can see how long the text will be, how the voice and music sound, what the pictures and the PDF book look like. The same samples open on this page too: the “Details and sample” button on each service card.' },
      { t: 'Pay with Telegram Stars', d: 'You pay with Telegram Stars, Telegram’s official currency. Stars are bought right inside the app with Apple Pay, Google Pay or a bank card — no sign-up on other websites. Prices start at $0.99 (⭐60); the AIfa+ subscription is $4.99 a month and can be cancelled at any time.' },
      { t: 'Get your result', d: 'The finished piece arrives in the same chat: texts and images in 15–30 seconds, songs, videos and story chapters in a few minutes. Keep it, forward it to someone you love, print the PDF or add the stickers to Telegram. A poem, a love letter, a horoscope, the secret of a name, a dream reading and a compatibility reading can be redone twice for free.' },
    ],
    catsH: 'What you can create',
    catsLead: 'Each service shows who it is for, what you get, how long it takes and the price. “Details and sample” opens AIfa’s questions and a real sample; “Create in Telegram” opens that very service in the bot. Prices in US dollars; in the bot you pay in Telegram Stars at the same rate.',
    freeH: 'Free',
    free: [
      { icon: Sparkles, t: 'Mini forecast', d: 'A short forecast by birth date.' },
      { icon: Users, t: 'Couple mode', d: 'Each of you answers about yourself — AIfa creates a joint portrait of the couple.' },
      { icon: CalendarHeart, t: 'Date reminders', d: 'Save your loved ones’ birthdays — AIfa reminds you 3 days ahead so you have time for a gift.' },
      { icon: BookOpen, t: 'A book as a gift', d: 'Every new user gets the novella “PADAM Protocol”, both parts, co-created by a human and an AI.' },
    ],
    earnH: 'Earn with AIfa',
    earnLead: 'Share your link from the bot and get a percentage of every payment made by the people who came through it. No investment, no stock: you recommend the product, AIfa does the rest.',
    earnStepsH: 'How it works',
    earnSteps: [
      'Open the bot with the button below — it gives you your personal link.',
      'Share it wherever you like: social media, chats, your channel, friends.',
      'A person opens the bot through your link and is attached to you.',
      'Every payment they make earns you a percentage — you see it in the ambassador dashboard in the bot.',
    ],
    tiersH: 'Your percentage',
    tiers: [
      { pct: '30%', d: 'starting rate — from the very first payment' },
      { pct: '40%', d: 'for the week, if your link brought 10+ payments last week' },
      { pct: '50%', d: 'for the week, if it brought 60+ payments last week' },
    ],
    exampleH: 'An example',
    exampleP: 'A friend orders a song with vocals for ⭐180 through your link. About $2.28 reaches us (after exchange a star is worth roughly 1.27 cents). Your 30% is $0.68; in a 40% week it is $0.91, in a 50% week $1.14. Ten payments through your link in a week, and you get 40% for the whole next week.',
    earnPoints: [
      'The percentage is taken from the amount Telegram actually delivers, on every payment of a person you invited — subscriptions included.',
      'Weeks start on Monday at 00:00 UTC: your rate for a new week depends on the number of payments through your link in the previous one.',
      'The ambassador dashboard in the bot shows sales and earnings for the week and all time.',
      'For channels and communities — a branded link: the /brand command in the bot.',
    ],
    earnCta: 'Get your link',
    techH: 'What powers it',
    techP: 'Texts and illustrations — Google Gemini models, music — Google Lyria, voice — Google text-to-speech. Everything is created fresh for your request, not taken from a catalog of templates.',
    faqH: 'Questions and answers',
    faq: [
      { q: 'How do I pay?', a: 'With Telegram Stars (⭐), Telegram’s official currency. You can buy them right inside the app with Apple Pay, Google Pay or a card.' },
      { q: 'How long does it take?', a: 'Texts and images arrive in 15–30 seconds; songs, videos and interactive stories take a few minutes.' },
      { q: 'Can I see what I will get?', a: 'Yes. Tap any service on this page, and in the bot every service has a “Sample” button — you see it before paying.' },
      { q: 'What if I don’t like the text?', a: 'Text pieces can be redone twice for free.' },
      { q: 'Which languages does AIfa speak?', a: 'The bot speaks English, Russian and Spanish and picks the language from your Telegram settings. Songs, poems and letters can be ordered in any of these three languages.' },
      { q: 'What is the gift book?', a: '“PADAM Protocol” is a two-part cyberpunk novella co-created by a human and an AI. AIfa gives both parts to every new user.' },
    ],
    finalH: 'Create your first gift today',
    finalP: 'Open the bot, pick an occasion and look at a sample — it is free.',
  },
  es: {
    badge: 'Bot de Telegram · pago con Telegram Stars · desde $0.99',
    title: 'AIfa Creativity — contenido digital personal en minutos',
    subtitle: 'Canciones, cuentos, postales, poemas, pronósticos y regalos hechos sobre ti y las personas que quieres. Respondes unas preguntas — AIfa lo crea y recibes el resultado en Telegram.',
    ctaBot: 'Abrir AIfa en Telegram',
    ctaEarn: 'Ganar con AIfa',
    trust: ['Muestra gratis de cada servicio antes de pagar', 'El bot habla español, inglés y ruso', 'Pago con Telegram Stars: Apple Pay, Google Pay, tarjeta'],
    whatH: 'Qué es',
    whatP: [
      'AIfa Creativity es un estudio creativo de inteligencia artificial dentro de Telegram. No elige una plantilla de un catálogo: crea cosas personales — una canción que nombra a tu mamá, un cuento donde tu hijo es el protagonista, un poema de aniversario que menciona el mar donde se conocieron.',
      'Solo tienes que contar sobre la persona y la ocasión. AIfa hace unas preguntas breves, muestra una muestra y crea un resultado que puedes guardar, reenviar o regalar en el mismo Telegram.',
    ],
    howH: 'Cómo funciona',
    steps: [
      { t: 'Elige qué crear', d: 'Abre @AIfaCreativityBot: su menú tiene 22 servicios en cinco secciones — música y video, libros e historias, textos y postales, astrología, sets de regalo. ¿No sabes cuál elegir? Más abajo en esta página cada servicio dice para quién es y qué recibes, y el botón «Crear en Telegram» abre ese mismo servicio en el bot.' },
      { t: 'Responde unas preguntas', d: 'AIfa pregunta de una en una: para quién es el regalo, la ocasión, qué hay que mencionar — nombres, recuerdos compartidos, bromas, lugares favoritos — y el tono que quieres. Donde hay opciones listas, respondes con un toque; lo demás lo escribes con tus palabras. Cuantos más detalles vivos, más se reconoce la persona en el regalo.' },
      { t: 'Mira una muestra', d: 'Cada servicio del bot tiene un botón «Ver un ejemplo»: un trabajo real de AIfa hecho con un pedido de prueba. Antes de pagar ves cuánto medirá el texto, cómo suenan la voz y la música, cómo son las imágenes y el libro en PDF. Las mismas muestras se abren en esta página: el botón «Detalles y muestra» de cada tarjeta.' },
      { t: 'Paga con Telegram Stars', d: 'Pagas con Telegram Stars, la moneda oficial de Telegram. Las estrellas se compran dentro de la app con Apple Pay, Google Pay o tarjeta bancaria, sin registrarte en otros sitios. Precios desde $0.99 (⭐60); la suscripción AIfa+ cuesta $4.99 al mes y se cancela cuando quieras.' },
      { t: 'Recibe tu resultado', d: 'Lo terminado llega al mismo chat: textos e imágenes en 15–30 segundos; canciones, videos y capítulos de historias en pocos minutos. Puedes guardarlo, reenviarlo a quien quieras, imprimir el PDF o añadir los stickers a Telegram. El poema, la carta de amor, el horóscopo, el secreto del nombre, la interpretación de sueños y la compatibilidad se pueden rehacer dos veces gratis.' },
    ],
    catsH: 'Qué puedes crear',
    catsLead: 'Cada servicio muestra para quién es, qué recibes, cuánto tarda y el precio. «Detalles y muestra» abre las preguntas de AIfa y una muestra real; «Crear en Telegram» abre ese mismo servicio en el bot. Precios en dólares; en el bot pagas en Telegram Stars al mismo tipo de cambio.',
    freeH: 'Gratis',
    free: [
      { icon: Sparkles, t: 'Mini pronóstico', d: 'Un pronóstico breve por fecha de nacimiento.' },
      { icon: Users, t: 'Modo pareja', d: 'Cada uno responde sobre sí mismo y AIfa crea un retrato conjunto de la pareja.' },
      { icon: CalendarHeart, t: 'Recordatorios de fechas', d: 'Guarda los cumpleaños de tus seres queridos: AIfa te avisa 3 días antes para preparar un regalo.' },
      { icon: BookOpen, t: 'Un libro de regalo', d: 'Cada nuevo usuario recibe la novela «PADAM Protocol», las dos partes, creada por un humano y una IA.' },
    ],
    earnH: 'Gana con AIfa',
    earnLead: 'Comparte tu enlace del bot y recibe un porcentaje de cada pago de las personas que llegaron por él. Sin inversión ni inventario: tú recomiendas el producto, AIfa hace el resto.',
    earnStepsH: 'Cómo funciona',
    earnSteps: [
      'Abre el bot con el botón de abajo: te dará tu enlace personal.',
      'Compártelo donde quieras: redes sociales, chats, tu canal, amigos.',
      'La persona abre el bot con tu enlace y queda vinculada a ti.',
      'Cada pago suyo te genera un porcentaje: lo ves en el panel de embajador del bot.',
    ],
    tiersH: 'Tu porcentaje',
    tiers: [
      { pct: '30%', d: 'tasa inicial, desde el primer pago' },
      { pct: '40%', d: 'durante la semana, si tu enlace trajo 10+ pagos la semana pasada' },
      { pct: '50%', d: 'durante la semana, si trajo 60+ pagos la semana pasada' },
    ],
    exampleH: 'Un ejemplo',
    exampleP: 'Una amiga pide con tu enlace una canción con voz por ⭐180. Nos llegan unos $2.28 (tras el cambio, una estrella vale cerca de 1,27 centavos). Tu 30 % son $0.68; en una semana al 40 %, $0.91; al 50 %, $1.14. Diez pagos con tu enlace en una semana y toda la semana siguiente recibes el 40 %.',
    earnPoints: [
      'El porcentaje se calcula sobre el importe que realmente llega de Telegram, en cada pago de tu invitado, también en suscripciones.',
      'La semana empieza el lunes a las 00:00 UTC: tu tasa de la nueva semana depende de los pagos con tu enlace en la anterior.',
      'El panel de embajador en el bot muestra ventas y ganancias de la semana y del total.',
      'Para canales y comunidades, un enlace con tu marca: el comando /brand en el bot.',
    ],
    earnCta: 'Obtener mi enlace',
    techH: 'Con qué funciona',
    techP: 'Textos e ilustraciones: modelos Google Gemini; música: Google Lyria; voz: síntesis de voz de Google. Todo se crea desde cero para tu pedido, sin plantillas de catálogo.',
    faqH: 'Preguntas y respuestas',
    faq: [
      { q: '¿Cómo pago?', a: 'Con Telegram Stars (⭐), la moneda oficial de Telegram. Se compran dentro de la app con Apple Pay, Google Pay o tarjeta.' },
      { q: '¿Cuánto tarda?', a: 'Textos e imágenes llegan en 15–30 segundos; canciones, videos e historias interactivas tardan unos minutos.' },
      { q: '¿Puedo ver lo que recibiré?', a: 'Sí. Toca cualquier servicio en esta página, y en el bot cada servicio tiene un botón «Muestra», visible antes de pagar.' },
      { q: '¿Y si no me gusta el texto?', a: 'Los textos se pueden rehacer dos veces gratis.' },
      { q: '¿En qué idiomas habla AIfa?', a: 'El bot habla español, inglés y ruso y toma el idioma de la configuración de tu Telegram. Canciones, poemas y cartas se pueden pedir en cualquiera de estos tres idiomas.' },
      { q: '¿Qué es el libro de regalo?', a: '«PADAM Protocol» es una novela cyberpunk en dos partes creada por un humano y una IA. AIfa regala ambas partes a cada nuevo usuario.' },
    ],
    finalH: 'Crea tu primer regalo hoy',
    finalP: 'Abre el bot, elige una ocasión y mira una muestra: es gratis.',
  },
  zh: {
    badge: 'Telegram 机器人 · Telegram Stars 支付 · $0.99 起',
    title: 'AIfa Creativity —— 几分钟创作专属数字内容',
    subtitle: '为你和你所爱的人量身创作的歌曲、童话、贺卡、诗歌、运势与礼物。回答几个问题，AIfa 即可完成创作，结果直接发送到 Telegram。',
    ctaBot: '在 Telegram 中打开 AIfa',
    ctaEarn: '与 AIfa 一起赚钱',
    trust: ['每项服务付款前均可免费查看样例', '机器人使用英语、俄语和西班牙语', 'Telegram Stars 支付：Apple Pay、Google Pay、银行卡'],
    whatH: '这是什么',
    whatP: [
      'AIfa Creativity 是 Telegram 里的人工智能创意工作室。它不从目录里挑模板，而是创作专属作品：一首唱出妈妈名字的歌，一个以你的孩子为主角的童话，一首提到你们初次相遇那片大海的纪念日诗歌。',
      '你只需讲讲这个人和这个场合。AIfa 会问几个简短的问题，展示样例，然后创作出可以保存、转发或在 Telegram 中直接赠送的作品。',
    ],
    howH: '如何使用',
    steps: [
      { t: '选择要创作的内容', d: '打开 @AIfaCreativityBot：菜单中有 22 项服务，分为五类——音乐与视频、书籍与故事、文字与贺卡、占星、礼物套装。不知道选哪个？本页下方每项服务都写明适合谁、你将得到什么，“在 Telegram 中创作”按钮会直接在机器人中打开该服务。' },
      { t: '回答几个问题', d: 'AIfa 一次只问一个问题：礼物送给谁、什么场合、必须提到什么——名字、共同回忆、玩笑、喜欢的地方——以及想要的基调。有现成选项的点一下即可，其余用你自己的话写。生动的细节越多，对方越能在礼物中认出自己。' },
      { t: '查看样例', d: '机器人中每项服务都有“查看样例”按钮——这是 AIfa 为测试订单完成的真实作品。付款前就能看到文字有多长、声音和音乐听起来如何、图片和 PDF 书是什么样子。同样的样例在本页也能打开：点击服务卡片上的“详情与样例”。' },
      { t: '用 Telegram Stars 支付', d: '使用 Telegram 官方货币 Telegram Stars 支付。可直接在应用内通过 Apple Pay、Google Pay 或银行卡购买，无需在其他网站注册。价格从 $0.99（⭐60）起；AIfa+ 订阅每月 $4.99，可随时取消。' },
      { t: '收到作品', d: '成品发送到同一个聊天中：文字和图片 15–30 秒，歌曲、视频和故事章节几分钟。可以保存、转发给亲人、打印 PDF，或把贴纸添加到 Telegram。诗歌、情书、星座运势、名字的奥秘、解梦和契合度解读都可以免费修改两次。' },
    ],
    catsH: '可以创作什么',
    catsLead: '每项服务都写明适合谁、你将得到什么、需要多久以及价格。“详情与样例”会打开 AIfa 的提问和真实样例，“在 Telegram 中创作”会直接在机器人中打开该服务。价格以美元计；在机器人中按相同汇率以 Telegram Stars 支付。',
    freeH: '免费',
    free: [
      { icon: Sparkles, t: '迷你运势', d: '根据出生日期的简短运势。' },
      { icon: Users, t: '情侣模式', d: '两人各自回答关于自己的问题，AIfa 创作一幅情侣合像。' },
      { icon: CalendarHeart, t: '纪念日提醒', d: '保存亲人的生日，AIfa 会提前 3 天提醒你准备礼物。' },
      { icon: BookOpen, t: '赠书', d: '每位新用户都会收到由人类与 AI 共同创作的小说《PADAM Protocol》上下两部。' },
    ],
    earnH: '与 AIfa 一起赚钱',
    earnLead: '分享你在机器人中的专属链接，通过它来的用户每次付款你都能获得一定比例。无需投入、无需囤货：你推荐产品，其余交给 AIfa。',
    earnStepsH: '运作方式',
    earnSteps: [
      '点击下方按钮打开机器人，它会给你专属链接。',
      '随处分享：社交网络、聊天、你的频道、朋友。',
      '对方通过你的链接打开机器人，即与你绑定。',
      '他的每一笔付款都会为你计入一定比例——在机器人的推广者面板中可以看到。',
    ],
    tiersH: '你的比例',
    tiers: [
      { pct: '30%', d: '起始比例，从第一笔付款开始' },
      { pct: '40%', d: '若上周通过你的链接产生 10 笔以上付款，本周适用' },
      { pct: '50%', d: '若上周产生 60 笔以上付款，本周适用' },
    ],
    exampleH: '计算示例',
    exampleP: '朋友通过你的链接以 ⭐180 订购了一首人声歌曲。实际到账约 $2.28（兑换后每颗星约 1.27 美分）。按 30% 你获得 $0.68；在 40% 的一周为 $0.91，50% 的一周为 $1.14。一周内通过你的链接产生 10 笔付款，下一整周即按 40% 计算。',
    earnPoints: [
      '比例按 Telegram 实际到账金额计算，适用于你邀请的用户的每一笔付款，包括订阅。',
      '每周从周一 00:00（UTC）开始：新一周的比例取决于上一周通过你的链接产生的付款笔数。',
      '机器人中的推广者面板显示本周及累计的销售额和收益。',
      '面向频道和社群的品牌链接：在机器人中使用 /brand 命令。',
    ],
    earnCta: '获取我的链接',
    techH: '技术支持',
    techP: '文字与插画使用 Google Gemini 模型，音乐使用 Google Lyria，语音使用 Google 语音合成。每件作品都根据你的需求全新创作，而非来自模板目录。',
    faqH: '常见问题',
    faq: [
      { q: '如何付款？', a: '使用 Telegram 官方货币 Telegram Stars（⭐）。可在应用内通过 Apple Pay、Google Pay 或银行卡购买。' },
      { q: '需要等多久？', a: '文字和图片 15–30 秒送达；歌曲、视频和互动故事需要几分钟。' },
      { q: '可以先看看会得到什么吗？', a: '可以。点击本页任一服务即可查看；在机器人中每项服务也都有“样例”按钮，付款前即可查看。' },
      { q: '如果不喜欢文字怎么办？', a: '文字作品可以免费修改两次。' },
      { q: 'AIfa 支持哪些语言？', a: '机器人使用英语、俄语和西班牙语，并根据你的 Telegram 设置选择语言；中文界面暂不支持，此时机器人使用英语。歌曲、诗歌和信件可以用这三种语言中的任意一种订制。' },
      { q: '赠书是什么？', a: '《PADAM Protocol》是一部由人类与 AI 共同创作的两部曲赛博朋克小说。AIfa 会将上下两部赠送给每位新用户。' },
    ],
    finalH: '今天就创作你的第一份礼物',
    finalP: '打开机器人，选择一个场合，看看样例——完全免费。',
  },
};

/** Подписи окна услуги. */
const U: Record<Lang, {
  open: string; openSample: string; badge: string; asks: string; gets: string; time: string; create: string;
  sample: string; sampleNote: string; noSample: string; close: string; loading: string; failed: string;
  langNote: (lg: string) => string; more: Record<string, string>; titles: Record<string, string>; forWho: string;
  positions: string[]; listen: string; pdf: string;
}> = {
  ru: {
    open: 'Подробнее', openSample: 'Подробнее и образец', badge: 'Образец', asks: 'О чём спросит AIfa', gets: 'Что вы получите',
    time: 'Сколько ждать', create: 'Создать в Telegram', sample: 'Образец',
    sampleNote: 'Это настоящая выдача AIfa по пробному заказу с вымышленными именами — ровно то, что приходит в Telegram.',
    noSample: 'Образец этой услуги AIfa сейчас готовит заново. А в боте у каждой услуги есть кнопка «Пример».',
    close: 'Закрыть', loading: 'Загружаем образец…', failed: 'Образец не загрузился. Обновите страницу или посмотрите его в боте.',
    langNote: (lg) => `Образец ${({ ru: 'на русском', en: 'на английском', es: 'на испанском' } as Record<string, string>)[lg] || ''}. Ваш AIfa создаст на русском, английском или испанском — как вы выберете.`,
    more: {
      year: 'В полной выдаче — ещё 11 месяцев, у каждого своя иллюстрация, и 6 подробных разборов по сферам жизни.',
      chapter1: 'Это первая глава. Дальше — ещё девять: после каждой вы выбираете, что будет, а в конце приходит книга PDF со всеми главами и иллюстрациями.',
      book: 'Это настоящая книга, которую AIfa собрала по пробной истории: десять глав, после каждой выбирали продолжение, к каждой — своя иллюстрация. Книга PDF приходит в конце истории.',
    },
    titles: { lyrics: 'Текст песни', overview: 'Обзор года', month1: 'Первый месяц', chapter1: 'Глава 1', song: 'Песня', poem: 'Стих', letter: 'Любовное письмо', astro: 'Астропрогноз', name: 'Тайны имени', tarot: 'Расклад Таро', voiceMsg: 'Голосовое', card: 'Живая музыкальная открытка', images: 'Иллюстрации', book: 'Книга целиком', stickers: 'Набор стикеров', daily: 'Прогноз на сегодня' },
    positions: ['Прошлое', 'Настоящее', 'Будущее'], listen: 'Слушать', pdf: 'Открыть PDF',
    forWho: 'Кому и когда',
  },
  en: {
    open: 'Details', openSample: 'Details and sample', badge: 'Sample', asks: 'What AIfa will ask', gets: 'What you get',
    time: 'How long', create: 'Create in Telegram', sample: 'Sample',
    sampleNote: 'This is a real AIfa delivery for a test order with made-up names — exactly what arrives in Telegram.',
    noSample: 'AIfa is preparing a new sample for this service. In the bot, every service has a “Sample” button.',
    close: 'Close', loading: 'Loading the sample…', failed: 'The sample did not load. Refresh the page or see it in the bot.',
    langNote: (lg) => `This sample is in ${({ ru: 'Russian', en: 'English', es: 'Spanish' } as Record<string, string>)[lg] || ''}. AIfa will make yours in English, Russian or Spanish — your choice.`,
    more: {
      year: 'The full delivery has 11 more months, each with its own illustration, and 6 in-depth readings of the main areas of life.',
      chapter1: 'This is the first chapter. Nine more follow: after each one you choose what happens, and at the end you get a PDF book with every chapter and illustration.',
      book: 'This is a real book AIfa put together from a test story: ten chapters, a choice of what happens after each one, and an illustration for every chapter. The PDF book arrives at the end of the story.',
    },
    titles: { lyrics: 'Lyrics', overview: 'The year at a glance', month1: 'The first month', chapter1: 'Chapter 1', song: 'Song', poem: 'Poem', letter: 'Love letter', astro: 'Astrology forecast', name: 'Secrets of the name', tarot: 'Tarot reading', voiceMsg: 'Voice message', card: 'Living music card', images: 'Illustrations', book: 'The whole book', stickers: 'Sticker pack', daily: 'Forecast for today' },
    positions: ['Past', 'Present', 'Future'], listen: 'Listen', pdf: 'Open the PDF',
    forWho: 'Who and when',
  },
  es: {
    open: 'Detalles', openSample: 'Detalles y muestra', badge: 'Muestra', asks: 'Qué te preguntará AIfa', gets: 'Qué recibirás',
    time: 'Cuánto tarda', create: 'Crear en Telegram', sample: 'Muestra',
    sampleNote: 'Es una entrega real de AIfa para un pedido de prueba con nombres inventados: exactamente lo que llega a Telegram.',
    noSample: 'AIfa está preparando una nueva muestra de este servicio. En el bot, cada servicio tiene un botón «Muestra».',
    close: 'Cerrar', loading: 'Cargando la muestra…', failed: 'La muestra no se cargó. Recarga la página o mírala en el bot.',
    langNote: (lg) => `Esta muestra está en ${({ ru: 'ruso', en: 'inglés', es: 'español' } as Record<string, string>)[lg] || ''}. AIfa creará la tuya en español, inglés o ruso, como elijas.`,
    more: {
      year: 'La entrega completa tiene 11 meses más, cada uno con su ilustración, y 6 lecturas a fondo de las áreas principales de la vida.',
      chapter1: 'Este es el primer capítulo. Siguen nueve más: tras cada uno eliges qué pasa, y al final llega un libro PDF con todos los capítulos e ilustraciones.',
      book: 'Es un libro real que AIfa armó a partir de una historia de prueba: diez capítulos, una elección de lo que pasa tras cada uno y una ilustración para cada capítulo. El libro PDF llega al final de la historia.',
    },
    titles: { lyrics: 'Letra', overview: 'El año de un vistazo', month1: 'El primer mes', chapter1: 'Capítulo 1', song: 'Canción', poem: 'Poema', letter: 'Carta de amor', astro: 'Pronóstico astrológico', name: 'Secretos del nombre', tarot: 'Lectura de tarot', voiceMsg: 'Mensaje de voz', card: 'Postal musical animada', images: 'Ilustraciones', book: 'El libro completo', stickers: 'Pack de stickers', daily: 'El pronóstico de hoy' },
    positions: ['Pasado', 'Presente', 'Futuro'], listen: 'Escuchar', pdf: 'Abrir el PDF',
    forWho: 'Para quién y cuándo',
  },
  zh: {
    open: '详情', openSample: '详情与样例', badge: '样例', asks: 'AIfa 会问什么', gets: '你将得到',
    time: '需要多久', create: '在 Telegram 中创作', sample: '样例',
    sampleNote: '这是 AIfa 为一份使用虚构姓名的测试订单真实生成的作品——与 Telegram 中收到的完全一致。',
    noSample: 'AIfa 正在为这项服务准备新的样例。在机器人中，每项服务都有“样例”按钮。',
    close: '关闭', loading: '正在加载样例…', failed: '样例未能加载。请刷新页面或在机器人中查看。',
    langNote: (lg) => `此样例为${({ ru: '俄语', en: '英语', es: '西班牙语' } as Record<string, string>)[lg] || ''}。AIfa 可按你的选择用英语、俄语或西班牙语创作。`,
    more: {
      year: '完整内容还包括另外 11 个月（每月配一幅插画）以及 6 篇人生主要领域的深入解读。',
      chapter1: '这是第一章。后面还有九章：每章结束后由你决定情节走向，最后会收到包含全部章节与插画的 PDF 书。',
      book: '这是 AIfa 根据一次测试故事真实生成的书：十章，每章之后选择情节走向，每章配一幅插画。故事结束时会收到这本 PDF 书。',
    },
    titles: { lyrics: '歌词', overview: '全年概览', month1: '第一个月', chapter1: '第一章', song: '歌曲', poem: '诗歌', letter: '情书', astro: '星座运势', name: '名字的秘密', tarot: '塔罗牌解读', voiceMsg: '语音消息', card: '动态音乐贺卡', images: '插图', book: '完整的书', stickers: '贴纸包', daily: '今日运势' },
    positions: ['过去', '现在', '未来'], listen: '收听', pdf: '打开 PDF',
    forWho: '适合谁、何时',
  },
};

// ── Образец: формат public/creativity/samples/<id>.json ───────────────────────
type T3 = Partial<Record<'ru' | 'en' | 'es', string>>;
type Item = { title?: string } & (
  | { k: 'text'; t: T3 }
  | { k: 'image'; src: string }
  | { k: 'audio'; src: string; cover?: string }
  | { k: 'voice'; src: T3 }
  | { k: 'video'; src: string; poster?: string }
  | { k: 'gallery'; items: string[]; square?: boolean }
  | { k: 'cards'; names: Partial<Record<'ru' | 'en' | 'es', string[]>>; images?: string[] }
  // 01.10.2026: PDF — книга сказки и детектива, PDF гороскопа и тайны имени; size — размер файла в МБ
  | { k: 'pdf'; src: T3; size?: Partial<Record<'ru' | 'en' | 'es', number>>; cover?: string });
interface SampleData { lang: string; more?: string; items: Item[] }

/** Язык образца: язык страницы → английский → русский → испанский. */
function выбрать<T>(t: Partial<Record<string, T>>, lang: Lang): [T | undefined, string] {
  for (const lg of [lang, 'en', 'ru', 'es']) if (t[lg] !== undefined) return [t[lg], lg];
  return [undefined, ''];
}

const H = { fontFamily: 'var(--font-syne)' } as const;
const tx = (x: L, lang: Lang) => x[lang] || x.en;

function SampleView({ id, lang }: { id: string; lang: Lang }) {
  const u = U[lang];
  const [data, setData] = useState<SampleData | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    let живо = true;
    setData(null); setErr(false);
    // 01.10.2026: у образцов с песней, видео и картинками свой файл на язык; китайской странице — английский.
    const есть = SAMPLE_LANGS[id] || [];
    const файл = есть.includes(lang) ? `${id}.${lang}` : lang === 'zh' && есть.includes('en') ? `${id}.en` : id;
    fetch(`/creativity/samples/${файл}.json`).then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => { if (живо) setData(d); }).catch(() => { if (живо) setErr(true); });
    return () => { живо = false; };
  }, [id, lang]);
  if (err) return <p className="text-sm text-slate-600 dark:text-gray-400">{u.failed}</p>;
  if (!data) return <p className="text-sm text-slate-600 dark:text-gray-400" role="status">{u.loading}</p>;

  // язык, на котором фактически показан образец (по первому тексту или голосу)
  let показанНа = '';
  for (const it of data.items) {
    if (it.k === 'text' || it.k === 'voice') { показанНа = выбрать(it.k === 'text' ? it.t : it.src, lang)[1]; break; }
  }
  // пустой data.lang — образец без языка (картинка, инструментал, стикеры): приписку про язык не показываем
  if (!показанНа) показанНа = data.lang || lang;

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-600 dark:text-gray-400">{u.sampleNote}</p>
      {показанНа !== lang && <p className="text-sm text-slate-700 dark:text-gray-300 bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3">{u.langNote(показанНа)}</p>}
      {data.items.map((it, i) => {
        const тело = частьОбразца(it, i, lang, u);
        if (!тело) return null;
        if (!it.title) return тело;
        return (
          <div key={i} className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white">{u.titles[it.title] || it.title}</h4>
            {тело}
          </div>
        );
      })}
      {data.more && u.more[data.more] && <p className="text-sm text-slate-600 dark:text-gray-400 italic">{u.more[data.more]}</p>}
    </div>
  );
}

/** Одна часть образца без заголовка (заголовок ставит SampleView). */
function частьОбразца(it: Item, i: number, lang: Lang, u: (typeof U)[Lang]): React.ReactNode {
        if (it.k === 'text') {
          const [t] = выбрать(it.t, lang);
          if (!t) return null;
          return <div key={i} className="whitespace-pre-line text-[15px] leading-relaxed text-slate-700 dark:text-gray-200 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5">{t}</div>;
        }
        if (it.k === 'pdf') {
          const [src, lg] = выбрать(it.src, lang);
          if (!src) return null;
          const мб = it.size?.[lg as 'ru' | 'en' | 'es'];
          return (
            <a key={i} href={src} target="_blank" rel="noopener" className="flex items-center gap-4 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-slate-900 dark:text-white hover:bg-cyan-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500">
              {it.cover && <img src={it.cover} alt="" loading="lazy" className="w-16 h-20 object-cover rounded-lg shrink-0" />}
              <span className="font-semibold">📄 {u.pdf}{мб ? ` · ${мб} MB` : ''}</span>
            </a>
          );
        }
        if (it.k === 'image') return <img key={i} src={it.src} alt="" loading="lazy" className="w-full rounded-2xl border border-slate-200 dark:border-white/10" />;
        if (it.k === 'audio') return (
          <div key={i} className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4">
            {it.cover && <img src={it.cover} alt="" loading="lazy" className="w-full sm:w-40 aspect-video sm:aspect-square object-cover rounded-xl" />}
            <audio controls preload="none" src={it.src} className="w-full min-w-0" />
          </div>
        );
        if (it.k === 'voice') {
          const [src] = выбрать(it.src, lang);
          return src ? <audio key={i} controls preload="none" src={src} className="w-full" /> : null;
        }
        if (it.k === 'video') return (
          <video key={i} controls preload="none" playsInline poster={it.poster} src={it.src} className="w-full max-w-[560px] mx-auto aspect-square rounded-2xl bg-black" />
        );
        if (it.k === 'gallery') return (
          <ul key={i} className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {it.items.map((s) => <li key={s}><img src={s} alt="" loading="lazy" className={it.square ? 'w-full aspect-square object-contain rounded-lg bg-slate-50 dark:bg-white/5' : 'w-full aspect-video object-cover rounded-lg'} /></li>)}
          </ul>
        );
        if (it.k === 'cards') {
          const [names] = выбрать(it.names, lang);
          return (
            <ol key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(names || []).map((n, j) => (
                <li key={n} className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-4 text-center">
                  {it.images?.[j] && <img src={it.images[j]} alt="" loading="lazy" className="w-full max-w-[220px] mx-auto mb-3 rounded-xl" />}
                  <div className="text-sm text-slate-600 dark:text-gray-400">{u.positions[j]}</div>
                  <div className="font-bold text-slate-900 dark:text-white">🃏 {n}</div>
                </li>
              ))}
            </ol>
          );
        }
        return null;
}

function ServiceDialog({ s, lang, onClose }: { s: Service; lang: Lang; onClose: () => void }) {
  const u = U[lang];
  const I = ICONS[s.icon] || Star;
  const панель = useRef<HTMLDivElement>(null);
  const закрыть = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const прежний = document.activeElement as HTMLElement | null;
    const прокрутка = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    закрыть.current?.focus();
    const клав = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key !== 'Tab' || !панель.current) return;
      const все = [...панель.current.querySelectorAll<HTMLElement>('a[href],button,audio,video,[tabindex]:not([tabindex="-1"])')].filter((x) => !x.hasAttribute('disabled'));
      if (!все.length) return;
      const первый = все[0], последний = все[все.length - 1];
      if (e.shiftKey && document.activeElement === первый) { e.preventDefault(); последний.focus(); }
      else if (!e.shiftKey && document.activeElement === последний) { e.preventDefault(); первый.focus(); }
    };
    document.addEventListener('keydown', клав);
    return () => { document.removeEventListener('keydown', клав); document.body.style.overflow = прокрутка; прежний?.focus?.(); };
  }, [onClose]);

  const естьОбразец = SAMPLE_IDS.has(s.id);
  return (
    <div className="fixed inset-0 z-[100] flex items-stretch sm:items-center justify-center sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm pointer-events-none" aria-hidden="true" />
      <div ref={панель} role="dialog" aria-modal="true" aria-labelledby={`svc-${s.id}-h`}
        className="relative w-full sm:max-w-3xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto overscroll-contain bg-white dark:bg-[#0b1020] text-slate-700 dark:text-zinc-300 sm:rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start gap-3 bg-white/95 dark:bg-[#0b1020]/95 backdrop-blur px-5 sm:px-8 pt-5 pb-4 border-b border-slate-200 dark:border-white/10">
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-700 dark:text-cyan-400 shrink-0"><I className="w-6 h-6" /></div>
          <div className="min-w-0 flex-1">
            <h3 id={`svc-${s.id}-h`} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white break-words" style={H}>{tx(s.t, lang)}</h3>
            <div className="font-mono text-sm font-bold text-cyan-700 dark:text-cyan-400">{s.price}{s.per ? ` · ${tx(s.per, lang)}` : ''}</div>
          </div>
          <button ref={закрыть} type="button" onClick={onClose} aria-label={u.close}
            className="shrink-0 w-11 h-11 inline-flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/15 text-slate-700 dark:text-gray-200 hover:border-cyan-500/60">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-5 sm:px-8 py-6 space-y-7">
          {CARD[s.id] && <p className="text-[15px] leading-relaxed text-slate-800 dark:text-gray-100 border-l-4 border-purple-500/60 pl-4"><b>{u.forWho}:</b> {tx(CARD[s.id].for, lang)}</p>}
          <p className="text-[15px] leading-relaxed text-slate-700 dark:text-gray-200">{tx(s.full, lang)}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />{u.asks}</h4>
              <ol className="space-y-2 list-decimal pl-5 text-sm leading-relaxed text-slate-700 dark:text-gray-300">
                {(s.asks[lang] || s.asks.en).map((q, i) => <li key={i}>{q}</li>)}
              </ol>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Gift className="w-5 h-5 text-purple-600 dark:text-purple-400" />{u.gets}</h4>
              <ul className="space-y-2 text-sm leading-relaxed text-slate-700 dark:text-gray-300">
                {(s.gets[lang] || s.gets.en).map((g, i) => <li key={i} className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-400" /><span>{g}</span></li>)}
              </ul>
              <p className="text-sm text-slate-700 dark:text-gray-300 flex items-center gap-2 pt-1"><Clock className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0" /><span><b>{u.time}:</b> {tx(s.time, lang)}</span></p>
            </div>
          </div>
          <a href={вБот(s.id)} target="_blank" rel="noopener noreferrer"
            className="flex sm:inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-[#ffffff] font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all">
            <span>{u.create}</span><ArrowUpRight className="w-5 h-5" />
          </a>
          <div className="space-y-4 border-t border-slate-200 dark:border-white/10 pt-6">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2" style={H}><PlayCircle className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />{u.sample}</h4>
            {естьОбразец ? <SampleView id={s.id} lang={lang} /> : <p className="text-sm text-slate-600 dark:text-gray-400">{u.noSample}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BotClient() {
  const { locale } = useLanguage();
  const lang = ((['ru', 'en', 'es', 'zh'] as const).includes(locale as Lang) ? locale : 'en') as Lang;
  const c = D[lang];
  const u = U[lang];
  const stepIcons: Icon[] = [ListChecks, MessageCircle, Eye, Coins, Zap];
  const trustIcons: Icon[] = [Eye, Globe, Wallet];
  const [открыта, setОткрыта] = useState<string | null>(null);

  // Ссылка вида #s-song открывает услугу сразу — ею можно поделиться.
  useEffect(() => {
    const m = window.location.hash.match(/^#s-([a-z_]+)$/);
    if (m && SERVICES.some((s) => s.id === m[1])) setОткрыта(m[1]);
  }, []);
  const открыть = useCallback((id: string) => {
    setОткрыта(id);
    try { history.replaceState(null, '', `#s-${id}`); } catch {}
  }, []);
  const закрыть = useCallback(() => {
    setОткрыта(null);
    try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch {}
  }, []);
  const услуга = SERVICES.find((s) => s.id === открыта) || null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-[#030711] dark:text-zinc-300 pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 hero-grid opacity-15 dark:opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-24">
        {/* Первый экран */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 dark:border-cyan-500/20 text-cyan-800 dark:text-cyan-400 text-sm font-mono">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            {c.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight break-words" style={H}>
            {c.title}
          </h1>
          <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed">{c.subtitle}</p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={BOT} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-[#ffffff] font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all shadow-lg hover:shadow-cyan-500/25 group">
              <span>{c.ctaBot}</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="#earn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white font-bold rounded-xl hover:border-cyan-500/60 transition-all">
              <TrendingUp className="w-5 h-5 text-cyan-700 dark:text-cyan-400" />
              <span>{c.ctaEarn}</span>
            </a>
          </div>
          <ul className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {c.trust.map((t, i) => {
              const I = trustIcons[i] || Star;
              return (
                <li key={i} className="flex items-center justify-center gap-2 text-slate-600 dark:text-gray-400">
                  <I className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0" />{t}
                </li>
              );
            })}
          </ul>
        </section>

        {/* Что это */}
        <section className="max-w-4xl mx-auto bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white" style={H}>{c.whatH}</h2>
          {c.whatP.map((p, i) => <p key={i} className="text-slate-600 dark:text-gray-300 leading-relaxed">{p}</p>)}
        </section>

        {/* Как это работает */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center" style={H}>{c.howH}</h2>
          {/* 01.10.2026: шаги во всю ширину и с развёрнутым объяснением — слово Архитектора «сделать их больше, растянуть» */}
          <ol className="max-w-5xl mx-auto space-y-4">
            {c.steps.map((s, i) => {
              const I = stepIcons[i] || Star;
              return (
                <li key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-8 hover:border-cyan-500/40 transition-colors">
                  <div className="flex sm:flex-col items-center gap-3 shrink-0">
                    <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 text-[#ffffff] text-2xl font-black flex items-center justify-center" style={H}>{i + 1}</span>
                    <I className="w-6 h-6 text-cyan-700 dark:text-cyan-400" />
                  </div>
                  <div className="space-y-2 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white" style={H}>{s.t}</h3>
                    <p className="text-base text-slate-600 dark:text-gray-300 leading-relaxed">{s.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Каталог: 22 услуги, клик — подробности и образец */}
        <section className="space-y-12" id="services">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white" style={H}>{c.catsH}</h2>
            <p className="text-sm text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">{c.catsLead}</p>
          </div>
          {(Object.keys(CATS) as Service['cat'][]).map((cat) => (
            <div key={cat} className="space-y-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white border-l-4 border-cyan-500 pl-3" style={H}>{tx(CATS[cat], lang)}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {SERVICES.filter((s) => s.cat === cat).map((s) => {
                  const I = ICONS[s.icon] || Star;
                  const образец = SAMPLE_IDS.has(s.id);
                  const к = CARD[s.id];
                  return (
                    <article key={s.id} data-id={s.id} id={`s-${s.id}`}
                      className="scroll-mt-28 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/5 transition-all duration-300">
                      {/* картинка из образца этой услуги; щелчок по ней открывает окно, как кнопка ниже */}
                      <div aria-hidden="true" onClick={() => открыть(s.id)}
                        className="relative h-44 sm:h-52 cursor-pointer bg-gradient-to-br from-cyan-500/15 via-slate-100 to-purple-600/15 dark:via-[#0b1020] flex items-center justify-center overflow-hidden">
                        {к?.preview
                          ? <img src={к.preview} alt="" loading="lazy" className={к.contain ? 'h-full w-full object-contain p-3' : 'h-full w-full object-cover'} />
                          : <I className="w-16 h-16 text-cyan-700/70 dark:text-cyan-400/70" />}
                        {образец && <span className="absolute top-3 right-3 text-sm px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#0b1020]/90 text-purple-700 dark:text-purple-300 border border-purple-500/30 inline-flex items-center gap-1"><PlayCircle className="w-3.5 h-3.5" />{u.badge}</span>}
                      </div>
                      <div className="p-6 flex flex-col gap-4 flex-1">
                        <div className="flex items-start gap-3">
                          <span className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-700 dark:text-cyan-400 shrink-0"><I className="w-5 h-5" /></span>
                          <div className="min-w-0">
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white break-words">{tx(s.t, lang)}</h4>
                            <div className="font-mono text-base font-bold text-cyan-700 dark:text-cyan-400">{s.price}{s.per ? ` · ${tx(s.per, lang)}` : ''}</div>
                          </div>
                        </div>
                        {к && <p className="text-sm leading-relaxed text-slate-800 dark:text-gray-100 border-l-4 border-purple-500/60 pl-3"><b>{u.forWho}:</b> {tx(к.for, lang)}</p>}
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-300">{tx(s.full, lang)}</p>
                        <div className="space-y-2">
                          <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><Gift className="w-4 h-4 text-purple-600 dark:text-purple-400" />{u.gets}</div>
                          <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700 dark:text-gray-300">
                            {(s.gets[lang] || s.gets.en).map((g, gi) => <li key={gi} className="flex gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-cyan-700 dark:text-cyan-400" /><span>{g}</span></li>)}
                          </ul>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-gray-300 flex items-center gap-2"><Clock className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0" /><span><b>{u.time}:</b> {tx(s.time, lang)}</span></p>
                        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-3">
                          <a href={вБот(s.id)} target="_blank" rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-[#ffffff] font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all">
                            <span>{u.create}</span><ArrowUpRight className="w-4 h-4" />
                          </a>
                          <button type="button" onClick={() => открыть(s.id)} aria-haspopup="dialog"
                            className="flex-1 inline-flex items-center justify-center gap-1 px-5 py-3 border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white font-semibold rounded-xl hover:border-cyan-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 transition-all">
                            <span>{образец ? u.openSample : u.open}</span><ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Бесплатно */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center" style={H}>{c.freeH}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.free.map((f, i) => {
              const I = f.icon;
              return (
                <div key={i} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-3">
                  <I className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white">{f.t}</h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{f.d}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Заработок */}
        <section id="earn" className="scroll-mt-28 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-600/10 p-6 sm:p-8 md:p-12 space-y-10">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3" style={H}>
              <Coins className="w-8 h-8 text-cyan-700 dark:text-cyan-400 shrink-0" />{c.earnH}
            </h2>
            <p className="text-slate-700 dark:text-gray-300 text-lg leading-relaxed">{c.earnLead}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">{c.earnStepsH}</h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {c.earnSteps.map((s, i) => (
                <li key={i} className="bg-white dark:bg-[#030711]/60 border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-3">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-[#ffffff] text-sm font-bold flex items-center justify-center">{i + 1}</span>
                  <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">{s}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white">{c.tiersH}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {c.tiers.map((t, i) => (
                <div key={i} className="bg-white dark:bg-[#030711]/60 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-2">
                  <div className="text-4xl font-black text-cyan-700 dark:text-cyan-400" style={H}>{t.pct}</div>
                  <p className="text-sm text-slate-600 dark:text-gray-400">{t.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-[#030711]/60 border border-purple-500/30 rounded-2xl p-6 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />{c.exampleH}</h3>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{c.exampleP}</p>
          </div>
          <ul className="space-y-3">
            {c.earnPoints.map((p, i) => (
              <li key={i} className="flex gap-3 text-slate-700 dark:text-gray-300">
                <Link2 className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" /><span>{p}</span>
              </li>
            ))}
          </ul>
          <a href={EARN} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-[#ffffff] font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all shadow-lg group">
            <span>{c.earnCta}</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </section>

        {/* На чём работает */}
        <section className="max-w-4xl mx-auto text-center space-y-3">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white" style={H}>{c.techH}</h2>
          <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{c.techP}</p>
        </section>

        {/* Вопросы */}
        <section className="space-y-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center" style={H}>{c.faqH}</h2>
          <div className="space-y-4">
            {c.faq.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />{item.q}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed pl-7">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Финал */}
        <section className="text-center space-y-5">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white" style={H}>{c.finalH}</h2>
          <p className="text-slate-600 dark:text-gray-400">{c.finalP}</p>
          <a href={BOT} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-[#ffffff] font-bold rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all shadow-lg group">
            <span>{c.ctaBot}</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </section>
      </div>

      {услуга && <ServiceDialog s={услуга} lang={lang} onClose={закрыть} />}
    </div>
  );
}
