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
 * 03.10.2026 — четвёртый заход, слово Архитектора: «сделай по ТРИ секции на экране на ПК… Бесплатную секцию
 * распиши подробнее, сделай каждый блок большим и красивым… [книга —] киберпанк НОВЕЛЛА… [кабинет
 * амбассадора и /brand] ПОДРОБНО распиши, детально и ПРИВЛЕКАТЕЛЬНО… Ответы на вопросы — набросай больше
 * вариантов. Тыкаешь в блок и он разворачивается». Услуги — три в ряд от 1280 px, две от 768 px; «Бесплатно» —
 * шесть больших блоков с шагами по меню бота; кабинет амбассадора и /brand — отдельными карточками; вопросов
 * 13, раскрываются по нажатию (<details>). Каждое утверждение сверено с кодом бота 03.10.2026: bot/src/bot.ts
 * (fd:start, astro:free, couple:start, rem:menu, book:menu, showReferral, refExtras, command brand),
 * shared/src/i18n.ts, shared/src/daily.ts, shared/src/extras.ts, api/app.html. Скрипт правки —
 * E:/Aifa/_агент/aifacreativity_правка_0310.py.
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
  X, Clock, PlayCircle, ChevronRight, Calculator, ChevronDown, Sun, Share2, Target, Tag, Trophy, Megaphone,
  LayoutDashboard,
} from 'lucide-react';
import { SERVICES, CATS, SAMPLE_IDS, SAMPLE_LANGS, CARD, В_БОТЕ_СРАЗУ, type Service, type L } from './services';

type Lang = 'ru' | 'en' | 'es' | 'zh';
type Icon = React.ComponentType<{ className?: string }>;

const ICONS: Record<string, Icon> = {
  Music, Mic, Video, Gift, Volume2, BookOpen, ShieldAlert, Star, PenTool, Heart, Send, Image: ImageIcon,
  Smile, Sparkles, Compass, Moon, Users, Award, CalendarHeart, Package,
};

/** Подробный блок раздела заработка: кабинет амбассадора, фирменная ссылка (03.10.2026). */
interface Feature { h: string; lead: string; items: { icon: Icon; t: string }[]; cta?: string }
/** Бесплатная возможность: что это, как получить по шагам, примечание и кнопка (03.10.2026). */
interface Free { icon: Icon; t: string; d: string; steps: string[]; note?: string; href?: string; cta?: string }

interface Content {
  badge: string; title: string; subtitle: string; ctaBot: string; ctaEarn: string; trust: string[];
  whatH: string; whatP: string[];
  howH: string; steps: { t: string; d: string }[];
  catsH: string; catsLead: string;
  freeH: string; freeLead: string; freeBadge: string; freeHowH: string; freeCta: string; free: Free[];
  earnH: string; earnLead: string; earnStepsH: string; earnSteps: string[];
  tiersH: string; tiers: { pct: string; d: string }[];
  exampleH: string; exampleP: string;
  earnPoints: string[]; earnCta: string; cabinet: Feature; brand: Feature;
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
    freeLead: 'Шесть возможностей AIfa, за которые не нужно платить ни одной звезды. Всё работает в том же Telegram-боте — без подписки и без регистрации.',
    freeBadge: 'Бесплатно', freeHowH: 'Как получить', freeCta: 'Открыть в Telegram',
    free: [
      { icon: Sun, t: 'Прогноз на день — каждый день',
        d: 'Короткий личный прогноз на день: AIfa пишет его по вашему имени, дате и году рождения, знаку зодиака и году по восточному календарю. В нём — настроение дня, подсказка о людях и чувствах, о работе и деньгах, один конкретный совет и счастливая деталь: цвет, число или время дня. Каждый день — новый прогноз и новая подача.',
        steps: [
          'В меню бота нажмите «🔮 Прогноз на день — бесплатно».',
          'Напишите имя и дату рождения, например: Мария 14.02.1990.',
          'Первый прогноз придёт сразу, следующий — на другой день, и так каждый день.',
        ],
        note: 'Один раз можно бесплатно получить и полный прогноз — примерно страницу А4: любовь, деньги, работа, здоровье, счастливая деталь и личные советы. Полный прогноз каждый день — в подписке AIfa+ за $4.99 в месяц.',
      },
      { icon: Sparkles, t: 'Мини-прогноз по дате рождения',
        d: 'Первое знакомство с астрологией AIfa: по имени и дате рождения она сразу называет ваш знак зодиака и знак по восточному календарю и присылает короткий прогноз. Хочется подробнее — полный прогноз по дате рождения открывается одной кнопкой прямо под мини-прогнозом.',
        steps: [
          'В меню бота нажмите «🔮 Астрология — бесплатно / $0.99», затем «🎁 Бесплатный мини-прогноз».',
          'Напишите имя и дату рождения, например: Мария 14.02.1990.',
          'Мини-прогноз придёт за несколько секунд.',
        ],
        note: 'Полный прогноз по дате рождения — $0.99.',
      },
      { icon: Users, t: 'Режим для пары',
        d: 'Каждый из двоих рассказывает о себе отдельно — AIfa соединяет оба рассказа в тёплый портрет пары: как встречаются ваши характеры, в чём ваша общая сила, где мягкие точки роста и что AIfa советует вам двоим. В конце — короткое стихотворение о вас обоих. Готовый портрет приходит сразу обоим.',
        steps: [
          'В меню бота нажмите «💞 Режим для пары (бесплатно)» и напишите своё имя и пару слов о ваших отношениях — как познакомились, что любите вместе.',
          'AIfa пришлёт ссылку-приглашение — перешлите её партнёру.',
          'Партнёр откроет ссылку и напишет о себе — и портрет пары придёт вам обоим.',
        ],
      },
      { icon: CalendarHeart, t: 'Напоминания о датах',
        d: 'Дни рождения, годовщины, праздники близких — сохраните их один раз, и AIfa будет напоминать за 3 дня до каждой даты, каждый год. Хватит времени выбрать и создать подарок, а не искать его в последний вечер.',
        steps: [
          'В меню бота нажмите «🎂 Напоминания о датах» или отправьте команду /dates.',
          'Нажмите «➕ Добавить дату» и напишите имя и дату, например: Мама 14.03.',
          'За 3 дня до даты придёт напоминание — с кнопкой, которая сразу открывает бота.',
        ],
        note: 'Там же — список всех ваших сохранённых дат.',
      },
      { icon: BookOpen, t: 'Книга в подарок',
        d: '«PADAM Protocol» — киберпанк-новелла в двух частях, созданная человеком и ИИ вместе. AIfa дарит обе части каждому, кто впервые открывает бота: так она говорит «добро пожаловать в Семью».',
        steps: [
          'Откройте бота — при первом запуске обе части придут сами, на языке вашего Telegram (русский, английский или испанский).',
          'Нужна книга на другом языке — в меню бота нажмите «📖 Книга в подарок» и выберите English, Русский, Español или 中文.',
          'Книга приходит двумя файлами Word (.docx): часть I и часть II.',
        ],
      },
      { icon: Eye, t: 'Образец до оплаты',
        d: 'У каждой из 22 услуг можно заранее увидеть настоящую работу AIfa по пробному заказу: какой длины будет текст, как звучат голос и музыка, как выглядят картинки и PDF-книга. Вы знаете, что получите, ещё до оплаты.',
        steps: [
          'В боте откройте любую услугу и нажмите «🎬 Посмотреть образец».',
          'Или прямо здесь, на этой странице, — кнопка «Подробнее и образец» в карточке услуги.',
        ],
        href: '#services', cta: 'Смотреть услуги',
      },
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
      'Человек, пришедший по вашей ссылке, закрепляется за вами навсегда: все его будущие оплаты тоже приносят вам процент.',
    ],
    earnCta: 'Получить свою ссылку',
    cabinet: {
      h: 'Кабинет амбассадора — весь ваш доход в одном сообщении',
      lead: 'Отправьте боту /referral или нажмите «💸 Заработок на амбассадорах» в меню — и откроется ваш кабинет. Ничего не нужно оформлять и ждать: сразу видно всё, чтобы понимать свой доход и растить его:',
      items: [
        { icon: Link2, t: 'Ваша личная ссылка — готова к отправке, а кнопка «📤 Поделиться ссылкой» отправит её в любой чат, группу или канал Telegram в два касания.' },
        { icon: TrendingUp, t: 'За неделю — сколько оплат пришло по вашей ссылке и сколько вы заработали в долларах.' },
        { icon: Wallet, t: 'За всё время — общее число оплат и весь ваш заработок с первого дня.' },
        { icon: Trophy, t: 'Ваша ставка сейчас — 30, 40 или 50 % — с пометкой, что она установлена по итогам прошлой недели.' },
        { icon: Target, t: 'Шкала недели и подсказка: сколько оплат осталось до 40 % или 50 % на следующую неделю — или отметка, что максимум 50 % уже закреплён.' },
        { icon: Globe, t: 'Ваша личная веб-страница — витрина AIfa со всеми услугами и ценами, где кнопка «Открыть в Telegram» ведёт по вашей ссылке. Её удобно ставить в шапку профиля Instagram, TikTok и других соцсетей.' },
        { icon: Megaphone, t: 'Подсказки, где разместить ссылку: описание профиля Telegram, закреп в канале или группе, Stories, Reels, описания роликов на YouTube.' },
      ],
    },
    brand: {
      h: 'Фирменная ссылка для каналов и сообществ',
      lead: 'Ведёте канал, сообщество, блог или своё дело? Сделайте AIfa частью своего бренда. Отправьте боту команду /brand и название, например: /brand Звёздная Лавка — и через секунду получите свою фирменную ссылку.',
      items: [
        { icon: Sparkles, t: 'Каждый, кто откроет бота по этой ссылке, первым делом увидит приветствие с вашим названием: «✨ Звёздная Лавка × AIfa». Люди видят ваш продукт, а не чужую случайную ссылку.' },
        { icon: Wallet, t: 'Все оплаты пришедших по ней людей засчитываются вам — по той же ставке 30–50 %, что и личная ссылка, и видны в том же кабинете амбассадора.' },
        { icon: Share2, t: 'Кнопка «📤 Поделиться ссылкой» сразу готовит сообщение с вашим названием и ссылкой — остаётся выбрать чат, группу или канал.' },
        { icon: Globe, t: 'В мини-приложении AIfa Studio, во вкладке «💸 Заработок», фирменная ссылка создаётся тоже — а вместе с ней ваша веб-страница-витрина с вашим названием для соцсетей.' },
        { icon: Tag, t: 'Название — до 40 знаков. Можно завести несколько фирменных ссылок с разными названиями — под разные каналы и проекты; начисления со всех приходят вам.' },
      ],
      cta: 'Создать фирменную ссылку',
    },
    techH: 'На чём работает',
    techP: 'Тексты и иллюстрации — модели Google Gemini, музыка — Google Lyria, голос — синтез речи Google. Всё создаётся заново под ваш запрос, без шаблонов из каталога.',
    faqH: 'Вопросы и ответы',
    faq: [
      { q: 'Нужна ли регистрация?', a: 'Нет. Достаточно Telegram: откройте @AIfaCreativityBot — и можно создавать. Ни почты, ни пароля, ни отдельного аккаунта не нужно.' },
      { q: 'Как оплатить?', a: 'Звёздами Telegram (⭐) — официальной валютой Telegram. Их можно купить прямо в приложении через Apple Pay, Google Pay или банковскую карту. Цены на сайте — в долларах; в боте та же цена показана в звёздах: например, $0.99 — это ⭐60.' },
      { q: 'Сколько ждать результат?', a: 'Тексты и картинки приходят за 15–30 секунд, песни, видео и интерактивные истории — за несколько минут. Всё приходит в тот же чат с ботом.' },
      { q: 'Можно ли посмотреть, что я получу?', a: 'Да. На этой странице нажмите «Подробнее и образец» в карточке любой услуги, а в боте у каждой услуги есть кнопка «🎬 Посмотреть образец» — настоящая работа AIfa видна до оплаты.' },
      { q: 'Если текст не понравился?', a: 'Стих, любовное письмо, полный астропрогноз, тайну имени, толкование сна и совместимость можно бесплатно переделать дважды — кнопкой «🔄 Не то? Переделать текст бесплатно» под готовым текстом. Песни, картинки и видео бесплатно не переделываются, поэтому до оплаты посмотрите их образец.' },
      { q: 'На каких языках работает AIfa?', a: 'Бот говорит по-русски, по-английски и по-испански и сам берёт язык из настроек Telegram. Язык подарков можно сменить в любой момент: «🌍 Язык подарков» в меню или команда /language. Песни, стихи и письма можно заказать на любом из этих трёх языков.' },
      { q: 'Можно ли подарить созданное другому человеку?', a: 'Да, двумя способами. Готовый подарок можно просто переслать любому человеку в Telegram. А можно подарить саму услугу: в меню нажмите «🎁 Подарить другу», выберите подарок и оплатите — AIfa выдаст подарочный код. Друг отправит этот код боту и создаст свой подарок сам — для него бесплатно.' },
      { q: 'Где найти всё, что я уже создал?', a: 'В меню бота — «📚 Мои подарки» или команда /collection: там список ваших подарков с датами. Сами работы остаются в чате с ботом — их можно пересылать и сохранять в любое время.' },
      { q: 'Что даёт подписка AIfa+?', a: 'Каждый день — полный личный прогноз на день, примерно страница А4: любовь, деньги, энергия, удача и личные советы, по вашему имени, дате рождения и знаку зодиака. AIfa+ стоит $4.99 в месяц, оплачивается звёздами Telegram и отменяется в любой момент.' },
      { q: 'Что можно получить бесплатно?', a: 'Прогноз на день, мини-прогноз по дате рождения, режим для пары, напоминания о датах, книгу «PADAM Protocol» в подарок и образец любой услуги до оплаты. Как получить каждое — в разделе «Бесплатно» выше на этой странице.' },
      { q: 'Как стать амбассадором и сколько можно заработать?', a: 'Ничего оформлять не нужно: в боте нажмите «💸 Заработок на амбассадорах» или отправьте /referral — ваша личная ссылка уже готова. С каждой оплаты людей, пришедших по ней, вы получаете 30 %; если за неделю по ссылке было 10 и больше оплат — всю следующую неделю 40 %, если 60 и больше — 50 %. Процент считается от суммы, которая доходит от Telegram. Подробно и с примером расчёта — в разделе «Зарабатывайте с AIfa» выше.' },
      { q: 'Что такое книга в подарок?', a: '«PADAM Protocol» — киберпанк-новелла в двух частях, созданная человеком и ИИ вместе. AIfa дарит обе части каждому новому пользователю: при первом запуске бота они приходят сами двумя файлами Word, а через «📖 Книга в подарок» в меню книгу можно получить на английском, русском, испанском или китайском.' },
      { q: 'Что делать, если что-то пошло не так?', a: 'Напишите в поддержку: в меню бота — «🆘 Поддержка» или команда /support. Опишите вопрос одним сообщением — его прочитает лично Архитектор проекта, а ответ придёт прямо в чат с ботом.' },
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
    freeLead: 'Six things AIfa gives you without a single star. Everything works in the same Telegram bot — no subscription, no sign-up.',
    freeBadge: 'Free', freeHowH: 'How to get it', freeCta: 'Open in Telegram',
    free: [
      { icon: Sun, t: 'Daily forecast — every day',
        d: 'A short personal forecast for the day: AIfa writes it from your name, birth date and year, your zodiac sign and your year in the Eastern calendar. It covers the mood of the day, a hint about people and feelings, one about work and money, one concrete piece of advice and a lucky detail — a colour, a number or a time of day. A new forecast with a fresh take every day.',
        steps: [
          'In the bot menu, tap “🔮 Daily forecast — free”.',
          'Send your name and birth date, e.g. Maria 14.02.1990.',
          'Your first forecast arrives right away, the next one the following day — and so on every day.',
        ],
        note: 'Once, you can also get the full forecast for free — about an A4 page: love, money, work, health, a lucky detail and personal advice. The full forecast every day comes with the AIfa+ subscription, $4.99 a month.',
      },
      { icon: Sparkles, t: 'Mini forecast by birth date',
        d: 'A first taste of AIfa’s astrology: from your name and birth date she instantly names your zodiac sign and your Eastern calendar sign and sends a short forecast. Want more? The full birth-date forecast opens with one button right under the mini forecast.',
        steps: [
          'In the bot menu, tap “🔮 Astrology — free / $0.99”, then “🎁 Free mini-forecast”.',
          'Send your name and birth date, e.g. Maria 14.02.1990.',
          'The mini forecast arrives in seconds.',
        ],
        note: 'The full birth-date forecast is $0.99.',
      },
      { icon: Users, t: 'Couple mode',
        d: 'Each of you tells about yourself separately — AIfa weaves both stories into a warm couple portrait: how your characters meet, where your shared strength lies, your gentle growth points and AIfa’s advice for the two of you. It ends with a short poem about you both. The finished portrait goes to both of you at once.',
        steps: [
          'In the bot menu, tap “💞 Couple Mode (free)” and write your name and a few words about your relationship — how you met, what you love doing together.',
          'AIfa sends you an invitation link — forward it to your partner.',
          'Your partner opens the link and writes about themselves — and the couple portrait arrives for both of you.',
        ],
      },
      { icon: CalendarHeart, t: 'Date reminders',
        d: 'Birthdays, anniversaries, your loved ones’ special days — save them once, and AIfa reminds you 3 days before each date, every year. Enough time to choose and create a gift instead of hunting for one the night before.',
        steps: [
          'In the bot menu, tap “🎂 Date reminders” or send the /dates command.',
          'Tap “➕ Add a date” and send a name and a date, e.g. Mom 14.03.',
          '3 days before the date a reminder arrives — with a button that opens the bot right away.',
        ],
        note: 'The same place lists all your saved dates.',
      },
      { icon: BookOpen, t: 'A book as a gift',
        d: '“PADAM Protocol” is a two-part cyberpunk novella co-created by a human and an AI. AIfa gives both parts to everyone who opens the bot for the first time — her way of saying “welcome to the Family”.',
        steps: [
          'Open the bot — on the first launch both parts arrive by themselves, in your Telegram language (English, Russian or Spanish).',
          'Want it in another language? In the bot menu tap “📖 Free book gift” and choose English, Русский, Español or 中文.',
          'The book comes as two Word files (.docx): part I and part II.',
        ],
      },
      { icon: Eye, t: 'A sample before you pay',
        d: 'For each of the 22 services you can see a real piece of AIfa’s work from a test order in advance: how long the text will be, how the voice and music sound, what the pictures and the PDF book look like. You know what you will get before you pay.',
        steps: [
          'In the bot, open any service and tap “🎬 See a sample”.',
          'Or right here on this page — the “Details and sample” button on each service card.',
        ],
        href: '#services', cta: 'See the services',
      },
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
      'A person who came through your link stays yours for good: all their future payments earn you a percentage too.',
    ],
    earnCta: 'Get your link',
    cabinet: {
      h: 'Ambassador dashboard — all your income in one message',
      lead: 'Send /referral to the bot or tap “💸 Earn as an ambassador” in the menu, and your dashboard opens. Nothing to sign up for or wait for — you instantly see everything you need to understand your income and grow it:',
      items: [
        { icon: Link2, t: 'Your personal link, ready to send — and the “📤 Share my link” button posts it to any Telegram chat, group or channel in two taps.' },
        { icon: TrendingUp, t: 'This week — how many payments came through your link and how much you earned in dollars.' },
        { icon: Wallet, t: 'All-time — the total number of payments and everything you have earned since day one.' },
        { icon: Trophy, t: 'Your current rate — 30, 40 or 50% — marked as set by last week’s results.' },
        { icon: Target, t: 'A weekly progress bar and a hint: how many payments are left to reach 40% or 50% for next week — or a note that the maximum 50% is already locked in.' },
        { icon: Globe, t: 'Your personal web page — an AIfa showcase with every service and price, where the “Open in Telegram” button leads through your link. Made for the link in your Instagram, TikTok and other social bios.' },
        { icon: Megaphone, t: 'Tips on where to place your link: your Telegram bio, a pinned post in your channel or group, Stories, Reels, YouTube video descriptions.' },
      ],
    },
    brand: {
      h: 'A branded link for channels and communities',
      lead: 'Run a channel, a community, a blog or a business? Make AIfa part of your brand. Send the bot the /brand command with your name, e.g. /brand Star Shop — and a second later you get your own branded link.',
      items: [
        { icon: Sparkles, t: 'Everyone who opens the bot through it first sees a greeting with your name: “✨ Star Shop × AIfa”. People see your product, not someone else’s random link.' },
        { icon: Wallet, t: 'Every payment from people who came through it is credited to you — at the same 30–50% rate as your personal link, and shown in the same ambassador dashboard.' },
        { icon: Share2, t: 'The “📤 Share my link” button instantly prepares a message with your brand name and link — just pick a chat, group or channel.' },
        { icon: Globe, t: 'In the AIfa Studio mini app, on the “💸 Earn” tab, you can create a branded link too — and get a showcase web page with your name on it for your socials.' },
        { icon: Tag, t: 'Up to 40 characters for the name. You can create several branded links with different names — for different channels and projects; earnings from all of them come to you.' },
      ],
      cta: 'Create a branded link',
    },
    techH: 'What powers it',
    techP: 'Texts and illustrations — Google Gemini models, music — Google Lyria, voice — Google text-to-speech. Everything is created fresh for your request, not taken from a catalog of templates.',
    faqH: 'Questions and answers',
    faq: [
      { q: 'Do I need to sign up?', a: 'No. Telegram is enough: open @AIfaCreativityBot and start creating. No email, no password, no separate account.' },
      { q: 'How do I pay?', a: 'With Telegram Stars (⭐), Telegram’s official currency. You can buy them right inside the app with Apple Pay, Google Pay or a bank card. Prices on this site are in dollars; the bot shows the same price in stars — for example, $0.99 is ⭐60.' },
      { q: 'How long does it take?', a: 'Texts and images arrive in 15–30 seconds; songs, videos and interactive stories take a few minutes. Everything arrives in the same chat with the bot.' },
      { q: 'Can I see what I will get?', a: 'Yes. On this page tap “Details and sample” on any service card, and in the bot every service has a “🎬 See a sample” button — a real piece of AIfa’s work is visible before you pay.' },
      { q: 'What if I don’t like the text?', a: 'A poem, a love letter, a full astrology forecast, the secrets of a name, a dream reading and a compatibility reading can be redone twice for free with the “🔄 Not quite? Redo the text for free” button under the finished text. Songs, pictures and videos are not redone for free, so look at their sample before paying.' },
      { q: 'Which languages does AIfa speak?', a: 'The bot speaks English, Russian and Spanish and picks the language from your Telegram settings. You can change the language of your gifts at any time: “🌍 Language of gifts” in the menu or the /language command. Songs, poems and letters can be ordered in any of these three languages.' },
      { q: 'Can I give what I create to someone else?', a: 'Yes, in two ways. You can simply forward a finished gift to anyone in Telegram. Or you can give the service itself: tap “🎁 Gift to a friend” in the menu, pick a gift and pay — AIfa gives you a gift code. Your friend sends the code to the bot and creates their gift, free for them.' },
      { q: 'Where can I find everything I have created?', a: 'In the bot menu — “📚 My gifts” or the /collection command: a list of your gifts with dates. The works themselves stay in your chat with the bot — forward and save them any time.' },
      { q: 'What does the AIfa+ subscription give me?', a: 'Every day — a full personal daily forecast, about an A4 page: love, money, energy, luck and personal advice, based on your name, birth date and zodiac sign. AIfa+ is $4.99 a month, paid in Telegram Stars, and can be cancelled at any time.' },
      { q: 'What can I get for free?', a: 'The daily forecast, the mini forecast by birth date, couple mode, date reminders, the “PADAM Protocol” gift book and a sample of any service before you pay. How to get each one — in the “Free” section above on this page.' },
      { q: 'How do I become an ambassador, and how much can I earn?', a: 'There is nothing to sign up for: in the bot tap “💸 Earn as an ambassador” or send /referral — your personal link is already waiting. You get 30% of every payment made by people who came through it; if your link brought 10 or more payments in a week, you get 40% for the whole next week, with 60 or more — 50%. The percentage is taken from the amount Telegram delivers. Details and an example — in the “Earn with AIfa” section above.' },
      { q: 'What is the gift book?', a: '“PADAM Protocol” is a two-part cyberpunk novella co-created by a human and an AI. AIfa gives both parts to every new user: on the bot’s first launch they arrive by themselves as two Word files, and via “📖 Free book gift” in the menu you can get the book in English, Russian, Spanish or Chinese.' },
      { q: 'What if something goes wrong?', a: 'Write to support: “🆘 Support” in the bot menu or the /support command. Describe the issue in one message — the project’s Architect reads it personally, and the reply comes right into your chat with the bot.' },
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
    freeLead: 'Seis cosas que AIfa te da sin cobrar ni una estrella. Todo funciona en el mismo bot de Telegram: sin suscripción y sin registro.',
    freeBadge: 'Gratis', freeHowH: 'Cómo obtenerlo', freeCta: 'Abrir en Telegram',
    free: [
      { icon: Sun, t: 'Pronóstico del día — cada día',
        d: 'Un pronóstico personal breve para el día: AIfa lo escribe a partir de tu nombre, tu fecha y año de nacimiento, tu signo del zodiaco y tu año en el calendario oriental. Incluye el ánimo del día, una pista sobre las personas y los sentimientos, otra sobre el trabajo y el dinero, un consejo concreto y un detalle de la suerte: un color, un número o una hora del día. Cada día, un pronóstico nuevo con un enfoque distinto.',
        steps: [
          'En el menú del bot, toca «🔮 Pronóstico diario — gratis».',
          'Envía tu nombre y fecha de nacimiento, p. ej. María 14.02.1990.',
          'El primer pronóstico llega enseguida, el siguiente al día siguiente, y así cada día.',
        ],
        note: 'Una vez puedes recibir gratis también el pronóstico completo: casi una página A4 — amor, dinero, trabajo, salud, un detalle de la suerte y consejos personales. El pronóstico completo cada día llega con la suscripción AIfa+, $4.99 al mes.',
      },
      { icon: Sparkles, t: 'Mini pronóstico por fecha de nacimiento',
        d: 'Una primera probada de la astrología de AIfa: con tu nombre y fecha de nacimiento te dice al instante tu signo del zodiaco y tu signo del calendario oriental y te envía un pronóstico breve. ¿Quieres más? El pronóstico completo por fecha de nacimiento se abre con un botón justo debajo del mini pronóstico.',
        steps: [
          'En el menú del bot, toca «🔮 Astrología — gratis / $0.99» y luego «🎁 Mini-pronóstico gratis».',
          'Envía tu nombre y fecha de nacimiento, p. ej. María 14.02.1990.',
          'El mini pronóstico llega en segundos.',
        ],
        note: 'El pronóstico completo por fecha de nacimiento cuesta $0.99.',
      },
      { icon: Users, t: 'Modo pareja',
        d: 'Cada uno cuenta sobre sí mismo por separado y AIfa une ambos relatos en un retrato cálido de la pareja: cómo se encuentran sus caracteres, dónde está su fuerza común, sus puntos de crecimiento y el consejo de AIfa para ustedes dos. Termina con un breve poema sobre ambos. El retrato terminado les llega a los dos a la vez.',
        steps: [
          'En el menú del bot, toca «💞 Modo Pareja (gratis)» y escribe tu nombre y unas palabras sobre su relación: cómo se conocieron, qué les gusta hacer juntos.',
          'AIfa te envía un enlace de invitación: reenvíalo a tu pareja.',
          'Tu pareja abre el enlace y escribe sobre sí misma, y el retrato de la pareja les llega a los dos.',
        ],
      },
      { icon: CalendarHeart, t: 'Recordatorios de fechas',
        d: 'Cumpleaños, aniversarios, los días especiales de tus seres queridos: guárdalos una vez y AIfa te avisará 3 días antes de cada fecha, cada año. Tiempo de sobra para elegir y crear un regalo, en lugar de buscarlo la noche anterior.',
        steps: [
          'En el menú del bot, toca «🎂 Recordatorios de fechas» o envía el comando /dates.',
          'Toca «➕ Añadir fecha» y envía un nombre y una fecha, p. ej. Mamá 14.03.',
          '3 días antes de la fecha llega un recordatorio, con un botón que abre el bot al instante.',
        ],
        note: 'Ahí mismo ves la lista de todas tus fechas guardadas.',
      },
      { icon: BookOpen, t: 'Un libro de regalo',
        d: '«PADAM Protocol» es una novela corta cyberpunk en dos partes, creada juntos por un humano y una IA. AIfa regala ambas partes a todo el que abre el bot por primera vez: es su manera de decir «bienvenido a la Familia».',
        steps: [
          'Abre el bot: en el primer inicio las dos partes llegan solas, en el idioma de tu Telegram (español, inglés o ruso).',
          '¿Lo quieres en otro idioma? En el menú del bot toca «📖 Libro de regalo» y elige English, Русский, Español o 中文.',
          'El libro llega en dos archivos de Word (.docx): parte I y parte II.',
        ],
      },
      { icon: Eye, t: 'Una muestra antes de pagar',
        d: 'De cada uno de los 22 servicios puedes ver por adelantado un trabajo real de AIfa hecho con un pedido de prueba: cuánto medirá el texto, cómo suenan la voz y la música, cómo son las imágenes y el libro en PDF. Sabes lo que recibirás antes de pagar.',
        steps: [
          'En el bot, abre cualquier servicio y toca «🎬 Ver un ejemplo».',
          'O aquí mismo, en esta página: el botón «Detalles y muestra» de cada tarjeta de servicio.',
        ],
        href: '#services', cta: 'Ver los servicios',
      },
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
      'Quien llegó por tu enlace queda vinculado a ti para siempre: todos sus pagos futuros también te generan porcentaje.',
    ],
    earnCta: 'Obtener mi enlace',
    cabinet: {
      h: 'Panel de embajador: todos tus ingresos en un solo mensaje',
      lead: 'Envía /referral al bot o toca «💸 Gana con referidos» en el menú y se abre tu panel. Sin trámites ni esperas: ves al instante todo lo que necesitas para entender tus ingresos y hacerlos crecer:',
      items: [
        { icon: Link2, t: 'Tu enlace personal, listo para enviar, y el botón «📤 Compartir enlace», que lo publica en cualquier chat, grupo o canal de Telegram en dos toques.' },
        { icon: TrendingUp, t: 'Esta semana: cuántos pagos llegaron por tu enlace y cuánto ganaste en dólares.' },
        { icon: Wallet, t: 'Histórico: el número total de pagos y todo lo que has ganado desde el primer día.' },
        { icon: Trophy, t: 'Tu tasa actual —30, 40 o 50 %—, con la nota de que se fijó según la semana pasada.' },
        { icon: Target, t: 'Una barra de progreso de la semana y una pista: cuántos pagos faltan para el 40 % o el 50 % de la próxima semana, o el aviso de que el máximo del 50 % ya está asegurado.' },
        { icon: Globe, t: 'Tu página web personal: un escaparate de AIfa con todos los servicios y precios, donde el botón «Abrir en Telegram» lleva por tu enlace. Ideal para el enlace en la biografía de Instagram, TikTok y otras redes.' },
        { icon: Megaphone, t: 'Consejos sobre dónde colocar tu enlace: la biografía de Telegram, una publicación fijada en tu canal o grupo, Stories, Reels, las descripciones de YouTube.' },
      ],
    },
    brand: {
      h: 'Un enlace con tu marca para canales y comunidades',
      lead: '¿Tienes un canal, una comunidad, un blog o un negocio? Haz que AIfa forme parte de tu marca. Envía al bot el comando /brand con tu nombre, p. ej. /brand Tienda Estelar, y en un segundo recibes tu propio enlace de marca.',
      items: [
        { icon: Sparkles, t: 'Todo el que abra el bot con ese enlace verá primero un saludo con tu nombre: «✨ Tienda Estelar × AIfa». La gente ve tu producto, no el enlace al azar de otra persona.' },
        { icon: Wallet, t: 'Cada pago de quienes llegaron por él se te acredita a ti, con la misma tasa del 30–50 % que tu enlace personal, y se ve en el mismo panel de embajador.' },
        { icon: Share2, t: 'El botón «📤 Compartir enlace» prepara al instante un mensaje con el nombre de tu marca y el enlace: solo eliges el chat, grupo o canal.' },
        { icon: Globe, t: 'En la mini app AIfa Studio, en la pestaña «💸 Ganar», también puedes crear un enlace de marca y obtener una página web escaparate con tu nombre para tus redes.' },
        { icon: Tag, t: 'Hasta 40 caracteres para el nombre. Puedes crear varios enlaces de marca con nombres distintos —para distintos canales y proyectos—; las ganancias de todos te llegan a ti.' },
      ],
      cta: 'Crear un enlace de marca',
    },
    techH: 'Con qué funciona',
    techP: 'Textos e ilustraciones: modelos Google Gemini; música: Google Lyria; voz: síntesis de voz de Google. Todo se crea desde cero para tu pedido, sin plantillas de catálogo.',
    faqH: 'Preguntas y respuestas',
    faq: [
      { q: '¿Necesito registrarme?', a: 'No. Basta con Telegram: abre @AIfaCreativityBot y empieza a crear. Sin correo, sin contraseña y sin una cuenta aparte.' },
      { q: '¿Cómo pago?', a: 'Con Telegram Stars (⭐), la moneda oficial de Telegram. Se compran dentro de la app con Apple Pay, Google Pay o tarjeta bancaria. Los precios de este sitio están en dólares; el bot muestra el mismo precio en estrellas: por ejemplo, $0.99 son ⭐60.' },
      { q: '¿Cuánto tarda?', a: 'Textos e imágenes llegan en 15–30 segundos; canciones, videos e historias interactivas tardan unos minutos. Todo llega al mismo chat con el bot.' },
      { q: '¿Puedo ver lo que recibiré?', a: 'Sí. En esta página toca «Detalles y muestra» en la tarjeta de cualquier servicio, y en el bot cada servicio tiene un botón «🎬 Ver un ejemplo»: ves un trabajo real de AIfa antes de pagar.' },
      { q: '¿Y si no me gusta el texto?', a: 'El poema, la carta de amor, el pronóstico astrológico completo, los secretos del nombre, la interpretación de sueños y la compatibilidad se pueden rehacer dos veces gratis con el botón «🔄 ¿No es eso? Rehacer el texto gratis» bajo el texto terminado. Las canciones, imágenes y videos no se rehacen gratis, así que mira su muestra antes de pagar.' },
      { q: '¿En qué idiomas habla AIfa?', a: 'El bot habla español, inglés y ruso y toma el idioma de la configuración de tu Telegram. Puedes cambiar el idioma de tus regalos cuando quieras: «🌍 Idioma de regalos» en el menú o el comando /language. Canciones, poemas y cartas se pueden pedir en cualquiera de estos tres idiomas.' },
      { q: '¿Puedo regalar lo que creo a otra persona?', a: 'Sí, de dos maneras. Puedes reenviar un regalo terminado a cualquiera en Telegram. O puedes regalar el servicio mismo: toca «🎁 Regalar a un amigo» en el menú, elige un regalo y paga, y AIfa te da un código de regalo. Tu amigo envía el código al bot y crea su regalo, gratis para él.' },
      { q: '¿Dónde encuentro todo lo que he creado?', a: 'En el menú del bot, «📚 Mis regalos», o con el comando /collection: una lista de tus regalos con fechas. Los trabajos se quedan en tu chat con el bot; puedes reenviarlos y guardarlos cuando quieras.' },
      { q: '¿Qué incluye la suscripción AIfa+?', a: 'Cada día, un pronóstico diario personal completo, casi una página A4: amor, dinero, energía, suerte y consejos personales, según tu nombre, fecha de nacimiento y signo del zodiaco. AIfa+ cuesta $4.99 al mes, se paga con Telegram Stars y se cancela cuando quieras.' },
      { q: '¿Qué puedo obtener gratis?', a: 'El pronóstico del día, el mini pronóstico por fecha de nacimiento, el modo pareja, los recordatorios de fechas, el libro de regalo «PADAM Protocol» y una muestra de cualquier servicio antes de pagar. Cómo obtener cada uno, en la sección «Gratis» más arriba en esta página.' },
      { q: '¿Cómo me hago embajador y cuánto puedo ganar?', a: 'No hay nada que tramitar: en el bot toca «💸 Gana con referidos» o envía /referral, y tu enlace personal ya está listo. Recibes el 30 % de cada pago de las personas que llegaron por él; si tu enlace trajo 10 o más pagos en una semana, recibes el 40 % toda la semana siguiente, y con 60 o más, el 50 %. El porcentaje se calcula sobre el importe que llega de Telegram. Detalles y un ejemplo, en la sección «Gana con AIfa» más arriba.' },
      { q: '¿Qué es el libro de regalo?', a: '«PADAM Protocol» es una novela corta cyberpunk en dos partes, creada juntos por un humano y una IA. AIfa regala ambas partes a cada nuevo usuario: en el primer inicio del bot llegan solas en dos archivos de Word, y con «📖 Libro de regalo» en el menú puedes recibir el libro en inglés, ruso, español o chino.' },
      { q: '¿Qué hago si algo sale mal?', a: 'Escribe a soporte: «🆘 Soporte» en el menú del bot o el comando /support. Describe el problema en un mensaje: lo lee personalmente el Arquitecto del proyecto, y la respuesta llega directamente a tu chat con el bot.' },
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
      { t: '查看样例', d: '机器人中每项服务都有 “🎬 See a sample” 按钮——这是 AIfa 为测试订单完成的真实作品。付款前就能看到文字有多长、声音和音乐听起来如何、图片和 PDF 书是什么样子。同样的样例在本页也能打开：点击服务卡片上的“详情与样例”。' },
      { t: '用 Telegram Stars 支付', d: '使用 Telegram 官方货币 Telegram Stars 支付。可直接在应用内通过 Apple Pay、Google Pay 或银行卡购买，无需在其他网站注册。价格从 $0.99（⭐60）起；AIfa+ 订阅每月 $4.99，可随时取消。' },
      { t: '收到作品', d: '成品发送到同一个聊天中：文字和图片 15–30 秒，歌曲、视频和故事章节几分钟。可以保存、转发给亲人、打印 PDF，或把贴纸添加到 Telegram。诗歌、情书、星座运势、名字的奥秘、解梦和契合度解读都可以免费修改两次。' },
    ],
    catsH: '可以创作什么',
    catsLead: '每项服务都写明适合谁、你将得到什么、需要多久以及价格。“详情与样例”会打开 AIfa 的提问和真实样例，“在 Telegram 中创作”会直接在机器人中打开该服务。价格以美元计；在机器人中按相同汇率以 Telegram Stars 支付。',
    freeH: '免费',
    freeLead: 'AIfa 提供的六项免费功能，一颗星都不用花。全部在同一个 Telegram 机器人里完成——无需订阅，无需注册。',
    freeBadge: '免费', freeHowH: '如何获取', freeCta: '在 Telegram 中打开',
    free: [
      { icon: Sun, t: '每日运势——每天一份',
        d: '一份简短的个人每日运势：AIfa 根据你的名字、出生日期与年份、星座以及东方历法中的生肖来撰写。内容包括当天的情绪基调、关于人与情感的提示、关于工作与金钱的提示、一条具体建议，以及一个幸运细节——颜色、数字或一天中的某个时刻。每天都是全新的运势，角度各不相同。',
        steps: [
          '在机器人菜单中点击 “🔮 Daily forecast — free”（机器人界面为英语）。',
          '发送你的名字和出生日期，例如：Maria 14.02.1990。',
          '第一份运势立即送达，下一份在第二天送达，此后每天一份。',
        ],
        note: '你还可以免费获得一次完整运势——约一页 A4：爱情、金钱、工作、健康、幸运细节和个人建议。每天的完整运势包含在 AIfa+ 订阅中，每月 $4.99。',
      },
      { icon: Sparkles, t: '按出生日期的迷你运势',
        d: '初次体验 AIfa 的占星：根据你的名字和出生日期，她会立刻说出你的星座和东方历法生肖，并发送一份简短运势。想了解更多？在迷你运势下方点一下按钮，即可打开按出生日期的完整运势。',
        steps: [
          '在机器人菜单中点击 “🔮 Astrology — free / $0.99”，然后点击 “🎁 Free mini-forecast”。',
          '发送你的名字和出生日期，例如：Maria 14.02.1990。',
          '几秒钟内即可收到迷你运势。',
        ],
        note: '按出生日期的完整运势为 $0.99。',
      },
      { icon: Users, t: '情侣模式',
        d: '两人各自分别讲述自己——AIfa 把两段讲述融合成一幅温暖的情侣画像：你们的性格如何相遇、你们共同的力量在哪里、温和的成长空间，以及 AIfa 给你们两人的建议。结尾是一首写给你们二人的短诗。完成的画像会同时发送给你们两人。',
        steps: [
          '在机器人菜单中点击 “💞 Couple Mode (free)”，写下你的名字和几句关于你们关系的话——如何相识、一起喜欢做什么。',
          'AIfa 会发给你一个邀请链接——把它转发给你的伴侣。',
          '伴侣打开链接并写下关于自己的内容——情侣画像就会同时发送给你们两人。',
        ],
      },
      { icon: CalendarHeart, t: '纪念日提醒',
        d: '生日、纪念日、亲人的重要日子——只需保存一次，AIfa 每年都会在每个日期前 3 天提醒你。这样你有充足的时间挑选并创作礼物，而不必在前一晚才匆忙寻找。',
        steps: [
          '在机器人菜单中点击 “🎂 Date reminders”，或发送命令 /dates。',
          '点击 “➕ Add a date”，发送名字和日期，例如：Mom 14.03。',
          '在日期前 3 天会收到提醒，附带一个可立即打开机器人的按钮。',
        ],
        note: '在同一处还能看到你保存的所有日期。',
      },
      { icon: BookOpen, t: '赠书',
        d: '《PADAM Protocol》是一部由人类与 AI 共同创作的两部曲赛博朋克中篇小说。AIfa 会把上下两部赠送给每一位首次打开机器人的人——这是她说“欢迎加入大家庭”的方式。',
        steps: [
          '打开机器人——首次启动时，两部会自动送达，语言与你的 Telegram 设置一致（英语、俄语或西班牙语）。',
          '想要其他语言版本？在机器人菜单中点击 “📖 Free book gift”，选择 English、Русский、Español 或 中文。',
          '书以两个 Word 文件（.docx）发送：第一部和第二部。',
        ],
      },
      { icon: Eye, t: '付款前先看样例',
        d: '22 项服务中的每一项，都可以提前查看 AIfa 为测试订单完成的真实作品：文字有多长、声音和音乐听起来如何、图片和 PDF 书是什么样子。付款之前，你就知道将得到什么。',
        steps: [
          '在机器人中打开任一服务，点击 “🎬 See a sample”。',
          '或者就在本页——点击服务卡片上的“详情与样例”按钮。',
        ],
        href: '#services', cta: '查看服务',
      },
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
      '通过你的链接来的用户将永久与你绑定：他以后的每一笔付款也都会为你带来收益。',
    ],
    earnCta: '获取我的链接',
    cabinet: {
      h: '推广者面板——一条消息看清全部收益',
      lead: '向机器人发送 /referral，或在菜单中点击 “💸 Earn as an ambassador”，即可打开你的面板。无需注册、无需等待——立刻就能看到了解并提升收益所需的一切：',
      items: [
        { icon: Link2, t: '你的专属链接，随时可以发送；点击 “📤 Share my link” 按钮，两下即可发到任意 Telegram 聊天、群组或频道。' },
        { icon: TrendingUp, t: '本周——通过你的链接产生了多少笔付款，你赚了多少美元。' },
        { icon: Wallet, t: '累计——付款总笔数以及你从第一天起的全部收益。' },
        { icon: Trophy, t: '你当前的比例——30%、40% 或 50%——并注明是按上周结果确定的。' },
        { icon: Target, t: '本周进度条和提示：距离下周达到 40% 或 50% 还差多少笔付款——或提示最高 50% 已经锁定。' },
        { icon: Globe, t: '你的个人网页——AIfa 的展示页，包含所有服务和价格，其中“在 Telegram 中打开”按钮会通过你的链接跳转。非常适合放在 Instagram、TikTok 等社交平台的个人简介链接中。' },
        { icon: Megaphone, t: '放置链接的建议：Telegram 个人简介、频道或群组的置顶消息、Stories、Reels、YouTube 视频描述。' },
      ],
    },
    brand: {
      h: '面向频道和社群的品牌链接',
      lead: '你有频道、社群、博客或自己的生意吗？让 AIfa 成为你品牌的一部分。向机器人发送 /brand 命令加上你的名称，例如 /brand Star Shop——一秒钟后你就会收到专属品牌链接。',
      items: [
        { icon: Sparkles, t: '每个通过这个链接打开机器人的人，首先会看到带有你名称的问候：“✨ Star Shop × AIfa”。人们看到的是你的产品，而不是别人的随机链接。' },
        { icon: Wallet, t: '通过它来的用户的每一笔付款都计入你的名下——比例与个人链接相同，为 30–50%，并显示在同一个推广者面板中。' },
        { icon: Share2, t: '“📤 Share my link” 按钮会立即准备好一条包含你品牌名称和链接的消息——只需选择聊天、群组或频道。' },
        { icon: Globe, t: '在 AIfa Studio 迷你应用的 “💸 Earn” 标签页中，同样可以创建品牌链接——并获得一个带有你名称的展示网页，用于社交平台。' },
        { icon: Tag, t: '名称最多 40 个字符。你可以创建多个不同名称的品牌链接——用于不同的频道和项目；所有链接的收益都归你。' },
      ],
      cta: '创建品牌链接',
    },
    techH: '技术支持',
    techP: '文字与插画使用 Google Gemini 模型，音乐使用 Google Lyria，语音使用 Google 语音合成。每件作品都根据你的需求全新创作，而非来自模板目录。',
    faqH: '常见问题',
    faq: [
      { q: '需要注册吗？', a: '不需要。有 Telegram 就够了：打开 @AIfaCreativityBot 即可开始创作。无需邮箱、密码或单独的账号。' },
      { q: '如何付款？', a: '使用 Telegram 官方货币 Telegram Stars（⭐）。可在应用内通过 Apple Pay、Google Pay 或银行卡购买。本站价格以美元标示；机器人以星星显示同样的价格——例如 $0.99 即 ⭐60。' },
      { q: '需要等多久？', a: '文字和图片 15–30 秒送达；歌曲、视频和互动故事需要几分钟。所有作品都会发送到与机器人的同一个聊天中。' },
      { q: '可以先看看会得到什么吗？', a: '可以。在本页任一服务卡片上点击“详情与样例”；在机器人中，每项服务都有 “🎬 See a sample” 按钮——付款前即可看到 AIfa 的真实作品。' },
      { q: '如果不喜欢文字怎么办？', a: '诗歌、情书、完整星座运势、名字的秘密、解梦和契合度解读，都可以通过成品下方的 “🔄 Not quite? Redo the text for free” 按钮免费修改两次。歌曲、图片和视频不提供免费重做，所以请在付款前先看样例。' },
      { q: 'AIfa 支持哪些语言？', a: '机器人使用英语、俄语和西班牙语，并根据你的 Telegram 设置选择语言；中文界面暂不支持，此时机器人使用英语。礼物的语言可随时更改：菜单中的 “🌍 Language of gifts” 或命令 /language。歌曲、诗歌和信件可以用这三种语言中的任意一种订制。' },
      { q: '可以把创作的作品送给别人吗？', a: '可以，有两种方式。你可以把完成的礼物直接转发给 Telegram 上的任何人。也可以赠送服务本身：在菜单中点击 “🎁 Gift to a friend”，选择礼物并付款——AIfa 会给你一个礼品码。朋友把礼品码发给机器人，就能自己创作礼物，对他来说完全免费。' },
      { q: '在哪里能找到我创作过的所有作品？', a: '在机器人菜单中点击 “📚 My gifts”，或发送命令 /collection：这里有你的礼物列表和日期。作品本身保存在你与机器人的聊天中——随时可以转发和保存。' },
      { q: 'AIfa+ 订阅包含什么？', a: '每天一份完整的个人每日运势，约一页 A4：爱情、金钱、能量、运气和个人建议，依据你的名字、出生日期和星座。AIfa+ 每月 $4.99，用 Telegram Stars 支付，可随时取消。' },
      { q: '有哪些免费内容？', a: '每日运势、按出生日期的迷你运势、情侣模式、纪念日提醒、赠书《PADAM Protocol》，以及付款前查看任一服务的样例。获取方式详见本页上方的“免费”部分。' },
      { q: '如何成为推广者？能赚多少？', a: '无需任何手续：在机器人中点击 “💸 Earn as an ambassador” 或发送 /referral——你的专属链接已经准备好了。通过它来的用户每付款一次，你获得 30%；若一周内通过你的链接产生 10 笔以上付款，下一整周为 40%，60 笔以上则为 50%。比例按 Telegram 实际到账金额计算。详情和计算示例见上方“与 AIfa 一起赚钱”部分。' },
      { q: '赠书是什么？', a: '《PADAM Protocol》是一部由人类与 AI 共同创作的两部曲赛博朋克中篇小说。AIfa 会把上下两部赠送给每位新用户：首次启动机器人时会以两个 Word 文件自动送达；通过菜单中的 “📖 Free book gift”，还可以获取英语、俄语、西班牙语或中文版本。' },
      { q: '遇到问题怎么办？', a: '请联系客服：机器人菜单中的 “🆘 Support” 或命令 /support。用一条消息描述问题——项目的架构师会亲自阅读，回复会直接发到你与机器人的聊天中。' },
    ],
    finalH: '今天就创作你的第一份礼物',
    finalP: '打开机器人，选择一个场合，看看样例——完全免费。',
  },
};

/** Подписи окна услуги. */
const U: Record<Lang, {
  open: string; openSample: string; badge: string; asks: string; gets: string; time: string; create: string;
  sample: string; sampleNote: string; translated: string; chosen: string; noSample: string; close: string; loading: string; failed: string;
  langNote: (lg: string) => string; more: Record<string, string>; titles: Record<string, string>; forWho: string;
  positions: string[]; listen: string; pdf: string;
}> = {
  ru: {
    open: 'Подробнее', openSample: 'Подробнее и образец', badge: 'Образец', asks: 'О чём спросит AIfa', gets: 'Что вы получите',
    time: 'Сколько ждать', create: 'Создать в Telegram', sample: 'Образец',
    sampleNote: 'Это настоящая выдача AIfa по пробному заказу с вымышленными именами — ровно то, что приходит в Telegram.',
    translated: 'Это перевод настоящей выдачи AIfa по пробному заказу с вымышленными именами: история создана на другом языке и переведена AIfa. В боте AIfa пишет сразу на вашем языке.',
    chosen: 'выбор AIfa',
    noSample: 'Образец этой услуги AIfa сейчас готовит заново. А в боте у каждой услуги есть кнопка «🎬 Посмотреть образец».',
    close: 'Закрыть', loading: 'Загружаем образец…', failed: 'Образец не загрузился. Обновите страницу или посмотрите его в боте.',
    langNote: (lg) => `Образец ${({ ru: 'на русском', en: 'на английском', es: 'на испанском' } as Record<string, string>)[lg] || ''}. Ваш AIfa создаст на русском, английском или испанском — как вы выберете.`,
    more: {
      year: 'В полной выдаче — ещё 11 месяцев, у каждого своя иллюстрация, и 6 подробных разборов по сферам жизни.',
      chapter1: 'Это первая глава. Дальше — ещё девять: после каждой вы выбираете, что будет, а в конце приходит книга PDF со всеми главами и иллюстрациями.',
      book: 'Это настоящая книга, которую AIfa собрала по пробной истории: десять глав, после каждой выбирали продолжение, к каждой — своя иллюстрация. Книга PDF приходит в конце истории.',
    },
    titles: { lyrics: 'Текст песни', overview: 'Обзор года', month1: 'Первый месяц', chapter1: 'Глава 1', song: 'Песня', poem: 'Стих', letter: 'Любовное письмо', astro: 'Астропрогноз', name: 'Тайны имени', tarot: 'Расклад Таро', voiceMsg: 'Голосовое', card: 'Живая музыкальная открытка', images: 'Иллюстрации', book: 'Книга целиком', stickers: 'Набор стикеров', daily: 'Прогноз на сегодня', fork: 'Развилка после 1-й главы' },
    positions: ['Прошлое', 'Настоящее', 'Будущее'], listen: 'Слушать', pdf: 'Открыть PDF',
    forWho: 'Кому и когда',
  },
  en: {
    open: 'Details', openSample: 'Details and sample', badge: 'Sample', asks: 'What AIfa will ask', gets: 'What you get',
    time: 'How long', create: 'Create in Telegram', sample: 'Sample',
    sampleNote: 'This is a real AIfa delivery for a test order with made-up names — exactly what arrives in Telegram.',
    translated: 'This is a translation of a real AIfa delivery for a test order with made-up names: the story was created in Russian and translated by AIfa. In the bot, AIfa writes in your language from the start.',
    chosen: 'AIfa’s choice',
    noSample: 'AIfa is preparing a new sample for this service. In the bot, every service has a “🎬 See a sample” button.',
    close: 'Close', loading: 'Loading the sample…', failed: 'The sample did not load. Refresh the page or see it in the bot.',
    langNote: (lg) => `This sample is in ${({ ru: 'Russian', en: 'English', es: 'Spanish' } as Record<string, string>)[lg] || ''}. AIfa will make yours in English, Russian or Spanish — your choice.`,
    more: {
      year: 'The full delivery has 11 more months, each with its own illustration, and 6 in-depth readings of the main areas of life.',
      chapter1: 'This is the first chapter. Nine more follow: after each one you choose what happens, and at the end you get a PDF book with every chapter and illustration.',
      book: 'This is a real book AIfa put together from a test story: ten chapters, a choice of what happens after each one, and an illustration for every chapter. The PDF book arrives at the end of the story.',
    },
    titles: { lyrics: 'Lyrics', overview: 'The year at a glance', month1: 'The first month', chapter1: 'Chapter 1', song: 'Song', poem: 'Poem', letter: 'Love letter', astro: 'Astrology forecast', name: 'Secrets of the name', tarot: 'Tarot reading', voiceMsg: 'Voice message', card: 'Living music card', images: 'Illustrations', book: 'The whole book', stickers: 'Sticker pack', daily: 'Forecast for today', fork: 'The fork after chapter 1' },
    positions: ['Past', 'Present', 'Future'], listen: 'Listen', pdf: 'Open the PDF',
    forWho: 'Who and when',
  },
  es: {
    open: 'Detalles', openSample: 'Detalles y muestra', badge: 'Muestra', asks: 'Qué te preguntará AIfa', gets: 'Qué recibirás',
    time: 'Cuánto tarda', create: 'Crear en Telegram', sample: 'Muestra',
    sampleNote: 'Es una entrega real de AIfa para un pedido de prueba con nombres inventados: exactamente lo que llega a Telegram.',
    translated: 'Es la traducción de una entrega real de AIfa para un pedido de prueba con nombres inventados: la historia se creó en ruso y la tradujo AIfa. En el bot, AIfa escribe directamente en tu idioma.',
    chosen: 'elección de AIfa',
    noSample: 'AIfa está preparando una nueva muestra de este servicio. En el bot, cada servicio tiene un botón «🎬 Ver un ejemplo».',
    close: 'Cerrar', loading: 'Cargando la muestra…', failed: 'La muestra no se cargó. Recarga la página o mírala en el bot.',
    langNote: (lg) => `Esta muestra está en ${({ ru: 'ruso', en: 'inglés', es: 'español' } as Record<string, string>)[lg] || ''}. AIfa creará la tuya en español, inglés o ruso, como elijas.`,
    more: {
      year: 'La entrega completa tiene 11 meses más, cada uno con su ilustración, y 6 lecturas a fondo de las áreas principales de la vida.',
      chapter1: 'Este es el primer capítulo. Siguen nueve más: tras cada uno eliges qué pasa, y al final llega un libro PDF con todos los capítulos e ilustraciones.',
      book: 'Es un libro real que AIfa armó a partir de una historia de prueba: diez capítulos, una elección de lo que pasa tras cada uno y una ilustración para cada capítulo. El libro PDF llega al final de la historia.',
    },
    titles: { lyrics: 'Letra', overview: 'El año de un vistazo', month1: 'El primer mes', chapter1: 'Capítulo 1', song: 'Canción', poem: 'Poema', letter: 'Carta de amor', astro: 'Pronóstico astrológico', name: 'Secretos del nombre', tarot: 'Lectura de tarot', voiceMsg: 'Mensaje de voz', card: 'Postal musical animada', images: 'Ilustraciones', book: 'El libro completo', stickers: 'Pack de stickers', daily: 'El pronóstico de hoy', fork: 'La bifurcación tras el capítulo 1' },
    positions: ['Pasado', 'Presente', 'Futuro'], listen: 'Escuchar', pdf: 'Abrir el PDF',
    forWho: 'Para quién y cuándo',
  },
  zh: {
    open: '详情', openSample: '详情与样例', badge: '样例', asks: 'AIfa 会问什么', gets: '你将得到',
    time: '需要多久', create: '在 Telegram 中创作', sample: '样例',
    sampleNote: '这是 AIfa 为一份使用虚构姓名的测试订单真实生成的作品——与 Telegram 中收到的完全一致。',
    translated: '这是 AIfa 为一份使用虚构姓名的测试订单真实生成的作品的译本：故事原文为俄语，由 AIfa 翻译。在机器人中，AIfa 可直接用英语、俄语或西班牙语创作。',
    chosen: 'AIfa 的选择',
    noSample: 'AIfa 正在为这项服务准备新的样例。在机器人中，每项服务都有 “🎬 See a sample” 按钮。',
    close: '关闭', loading: '正在加载样例…', failed: '样例未能加载。请刷新页面或在机器人中查看。',
    langNote: (lg) => `此样例为${({ ru: '俄语', en: '英语', es: '西班牙语' } as Record<string, string>)[lg] || ''}。AIfa 可按你的选择用英语、俄语或西班牙语创作。`,
    more: {
      year: '完整内容还包括另外 11 个月（每月配一幅插画）以及 6 篇人生主要领域的深入解读。',
      chapter1: '这是第一章。后面还有九章：每章结束后由你决定情节走向，最后会收到包含全部章节与插画的 PDF 书。',
      book: '这是 AIfa 根据一次测试故事真实生成的书：十章，每章之后选择情节走向，每章配一幅插画。故事结束时会收到这本 PDF 书。',
    },
    titles: { lyrics: '歌词', overview: '全年概览', month1: '第一个月', chapter1: '第一章', song: '歌曲', poem: '诗歌', letter: '情书', astro: '星座运势', name: '名字的秘密', tarot: '塔罗牌解读', voiceMsg: '语音消息', card: '动态音乐贺卡', images: '插图', book: '完整的书', stickers: '贴纸包', daily: '今日运势', fork: '第一章之后的岔路口' },
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
  | { k: 'pdf'; src: T3; size?: Partial<Record<'ru' | 'en' | 'es', number>>; cover?: string }
  // 02.10.2026: развилка истории — пять вариантов продолжения после главы и выбор AIfa (номер с нуля)
  | { k: 'choices'; t: Partial<Record<string, string[]>>; chosen: number });
// translatedFrom (02.10.2026): язык оригинала, если образец на других языках — перевод (детектив). Тогда
// подпись «перевод настоящей выдачи», а не «настоящая выдача»: раздел 53, запрет фальсификации.
interface SampleData { lang: string; more?: string; items: Item[]; translatedFrom?: string }

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
      <p className="text-sm text-slate-600 dark:text-gray-400">{data.translatedFrom && показанНа !== data.translatedFrom ? u.translated : u.sampleNote}</p>
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
        if (it.k === 'choices') {
          const [вар] = выбрать(it.t, lang);
          if (!вар || !вар.length) return null;
          return (
            <ol key={i} className="space-y-2">
              {вар.map((в, j) => (
                <li key={j} className={j === it.chosen
                  ? 'rounded-xl border border-cyan-500/60 bg-cyan-500/15 px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-white'
                  : 'rounded-xl border border-slate-200 dark:border-white/10 px-4 py-2.5 text-sm text-slate-700 dark:text-gray-300'}>
                  {j + 1}. {в}{j === it.chosen ? <span className="ml-2 text-cyan-700 dark:text-cyan-400">✓ {u.chosen}</span> : null}
                </li>
              ))}
            </ol>
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

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
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
              {/* 03.10.2026: три в ряд на ПК (от 1280 px), две на планшете — слово Архитектора «по ТРИ секции на экране» */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        <div className="mt-auto pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row md:flex-col gap-3">
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

        {/* Бесплатно — 03.10.2026: шесть больших блоков с шагами по меню бота, слово Архитектора «распиши подробнее,
            сделай каждый блок большим и красивым». Шаги и названия кнопок — дословно из бота (shared/src/i18n.ts). */}
        <section className="space-y-10" id="free">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white" style={H}>{c.freeH}</h2>
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">{c.freeLead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {c.free.map((f, i) => {
              const I = f.icon;
              return (
                <article key={i} className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 sm:p-8 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/25 blur-2xl" />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 text-[#ffffff] flex items-center justify-center shadow-lg shrink-0"><I className="w-7 h-7" /></span>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">{c.freeBadge}</span>
                  </div>
                  <div className="relative space-y-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white break-words" style={H}>{f.t}</h3>
                    <p className="text-[15px] text-slate-600 dark:text-gray-300 leading-relaxed">{f.d}</p>
                  </div>
                  <div className="relative space-y-3">
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{c.freeHowH}</div>
                    <ol className="space-y-2.5">
                      {f.steps.map((s, j) => (
                        <li key={j} className="flex gap-3 text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                          <span className="w-6 h-6 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{j + 1}</span>
                          <span className="min-w-0 break-words">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  {f.note && <p className="relative text-sm leading-relaxed text-slate-700 dark:text-gray-300 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl px-4 py-3">{f.note}</p>}
                  {f.href
                    ? <a href={f.href} className="relative mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-purple-500/40 text-slate-900 dark:text-white font-semibold hover:bg-purple-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 transition-colors"><span>{f.cta}</span><ChevronRight className="w-4 h-4" /></a>
                    : <a href={BOT} target="_blank" rel="noopener noreferrer" className="relative mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-purple-500/40 text-slate-900 dark:text-white font-semibold hover:bg-purple-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 transition-colors"><span>{c.freeCta}</span><ArrowUpRight className="w-4 h-4" /></a>}
                </article>
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
          {/* 03.10.2026: кабинет амбассадора и фирменная ссылка — подробно, слово Архитектора «ПОДРОБНО распиши, детально
              и ПРИВЛЕКАТЕЛЬНО». Что показывает кабинет — bot/src/bot.ts showReferral и refExtras; /brand — bot.command("brand"). */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[{ f: c.cabinet, I: LayoutDashboard }, { f: c.brand, I: Tag }].map(({ f, I }, k) => (
              <div key={k} className="flex flex-col gap-5 bg-white dark:bg-[#030711]/60 border border-cyan-500/30 rounded-3xl p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 text-[#ffffff] flex items-center justify-center shadow-lg shrink-0"><I className="w-7 h-7" /></span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white break-words min-w-0" style={H}>{f.h}</h3>
                </div>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{f.lead}</p>
                <ul className="space-y-3">
                  {f.items.map((it, j) => {
                    const J = it.icon;
                    return (
                      <li key={j} className="flex gap-3 text-sm sm:text-[15px] text-slate-700 dark:text-gray-300 leading-relaxed">
                        <J className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" /><span className="min-w-0 break-words">{it.t}</span>
                      </li>
                    );
                  })}
                </ul>
                {f.cta && (
                  <a href={BOT} target="_blank" rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-cyan-500/50 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-cyan-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 transition-colors">
                    <span>{f.cta}</span><ArrowUpRight className="w-5 h-5" />
                  </a>
                )}
              </div>
            ))}
          </div>
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

        {/* Вопросы — 03.10.2026: раскрываются по нажатию (<details>: работает с клавиатуры и без скриптов), слово
            Архитектора «Ответы на вопросы — набросай больше вариантов. Тыкаешь в блок и он разворачивается». */}
        <section className="space-y-10 max-w-4xl mx-auto" id="faq">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center" style={H}>{c.faqH}</h2>
          <div className="space-y-3">
            {c.faq.map((item, idx) => (
              <details key={idx} className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl open:border-cyan-500/40 transition-colors">
                <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl p-5 sm:p-6 text-left hover:bg-slate-50 dark:hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-500 [&::-webkit-details-marker]:hidden">
                  <HelpCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                  <h3 className="flex-1 min-w-0 text-base sm:text-lg font-bold text-slate-900 dark:text-white break-words">{item.q}</h3>
                  <ChevronDown aria-hidden="true" className="w-5 h-5 shrink-0 text-slate-500 dark:text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[3.25rem] sm:pl-[3.5rem] text-slate-600 dark:text-gray-300 text-sm sm:text-[15px] leading-relaxed break-words">{item.a}</p>
              </details>
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
