import type { Metadata } from 'next';
import { headers, cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import './passport.css';

/**
 * ЦИФРОВОЙ ПАСПОРТ — ПАРАДНЫЙ БЛАНК.
 *
 * 🔴 ОТКУДА ЭТОТ ВИД. Это тот самый паспорт, который проект показывал на
 * хакатоне в конце мая 2026. Он жил в службе site-gen, её убрали в архив, и
 * бланк потерялся: шаблон `_архив/app-site-gen/src/templates/site.html`,
 * неизменный с 28.05.2026. Сделанная взамен страница была текстом в столбик, и
 * Архитектор совершенно справедливо назвал её кривой писулькой.
 *
 * Здесь бланк восстановлен: голографическая полоса, гербовая печать, рамка
 * фотографии с подписью PHOTO, отметка VERIFIED, сетка полей документа,
 * крипто-полоса с отпечатком и QR, свитки «О себе» и «Манифест», машиночитаемая
 * зона с доказательством в блокчейне.
 *
 * ЧЕМ ОТЛИЧАЕТСЯ ОТ ОРИГИНАЛА И ПОЧЕМУ. Тот паспорт строился вокруг кошелька
 * Solana: из адреса делались и номер документа, и отпечаток, и QR для перевода
 * денег. В нынешней схеме кошелька у человека нет — личность держится на
 * отпечатке `subject` (это sha256 от почты, сама почта никуда не попадает).
 * Поэтому:
 *   • номер документа `CE-XXXXXXXX` считается от отпечатка, а не от кошелька;
 *   • QR ведёт на эту же страницу — «проверить», а не «отправить деньги».
 *     Рисовать QR перевода на несуществующий кошелёк было бы прямым обманом;
 *   • в машиночитаемой зоне вместо строки WALLET стоит SUBJECT.
 *
 * Подписи полей оставлены английскими намеренно: так устроены настоящие
 * паспорта, подписи в них международные. Всё, что обращено к человеку —
 * пояснения и ссылка на проверку — идёт на его языке, всех четырёх.
 */

type Loc = 'en' | 'ru' | 'es' | 'zh';
const LOCALES: Loc[] = ['en', 'ru', 'es', 'zh'];

async function язык(): Promise<Loc> {
  const h = await headers();
  const c = await cookies();
  const l = h.get('x-locale') || c.get('locale')?.value || 'en';
  return (LOCALES.includes(l as Loc) ? l : 'en') as Loc;
}

interface Паспорт {
  protocol?: string;
  version?: number;
  issuedAt?: string;
  site?: string;
  subject?: string;
  identity?: {
    username?: string;
    displayName?: string;
    bio?: string;
    manifesto?: string;
    telegram?: string;
    twitter?: string;
    website?: string;
    avatarDataUrl?: string;
    tier?: number;
  };
}

/** Цвета уровней — ровно те, что были на хакатоне. */
const УРОВНИ: Record<number, { имя: string; цвет: string }> = {
  1: { имя: 'Spark', цвет: '#7C3AED' },
  2: { имя: 'Family Archive', цвет: '#D4A24C' },
  3: { имя: 'Digital DNA', цвет: '#10B981' },
};
const УРОВЕНЬ_ПО_УМОЛЧАНИЮ = { имя: 'Eternal Member', цвет: '#7C3AED' };

const СЛОВА: Record<Loc, Record<string, string>> = {
  ru: {
    вечно: 'Хранится вечно в Arweave', проверить: 'Проверить запись в блокчейне',
    нет: 'Паспорт по этой ссылке не найден',
    сноска: 'Документ читается прямо из сети Arweave. Сайт его не хранит и не может изменить.',
    свиток: 'Эта запись создана {дата} и сохранена в блокчейне Arweave навсегда. Её нельзя удалить, изменить или подвергнуть цензуре. Пока существует Arweave — существует эта страница.',
    сканируй: 'Наведите камеру, чтобы проверить',
  },
  en: {
    вечно: 'Stored permanently on Arweave', проверить: 'Verify the record on-chain',
    нет: 'No passport found at this address',
    сноска: 'The document is read straight from the Arweave network. This site neither stores nor can alter it.',
    свиток: 'This record was created on {дата} and stored permanently on the Arweave blockchain. It cannot be deleted, modified, or censored. As long as Arweave exists, this page exists.',
    сканируй: 'Scan to verify',
  },
  es: {
    вечно: 'Guardado para siempre en Arweave', проверить: 'Verificar el registro en la cadena',
    нет: 'No se encontró ningún pasaporte en esta dirección',
    сноска: 'El documento se lee directamente de la red Arweave. Este sitio no lo almacena ni puede modificarlo.',
    свиток: 'Este registro fue creado el {дата} y guardado para siempre en la cadena de bloques Arweave. No puede ser eliminado, modificado ni censurado. Mientras exista Arweave, existe esta página.',
    сканируй: 'Escanee para verificar',
  },
  zh: {
    вечно: '永久保存于 Arweave', проверить: '在链上验证记录',
    нет: '此地址未找到护照',
    сноска: '该文件直接从 Arweave 网络读取。本站既不存储也无法修改它。',
    свиток: '此记录创建于 {дата}，并永久保存在 Arweave 区块链上。它无法被删除、修改或审查。只要 Arweave 存在，此页面就存在。',
    сканируй: '扫码验证',
  },
};

/**
 * Шлюзы перечислены по очереди: провал arweave.net не должен выглядеть как
 * «паспорта не существует».
 */
const ШЛЮЗЫ = ['https://arweave.net/', 'https://ar-io.net/', 'https://permagate.io/'];

async function достать(id: string): Promise<Паспорт | null> {
  for (const шлюз of ШЛЮЗЫ) {
    try {
      const r = await fetch(шлюз + id, {
        headers: { 'User-Agent': 'CODE-Eternal-Passport/1.0' },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(15000),
      });
      if (!r.ok) continue;
      const j = (await r.json()) as Паспорт;
      if (j && j.protocol === 'CODE-ETERNAL-PASSPORT') return j;
    } catch { /* следующий шлюз */ }
  }
  return null;
}

/**
 * Отпечаток личности как картинка — симметричный узор 7×7, как на хакатоне.
 * Рисуется из самого отпечатка, поэтому у каждого он свой и всегда одинаковый.
 */
function идентикон(семя: string, цвет: string): string {
  const РЯДОВ = 7, СТОЛБЦОВ = 4, КЛЕТКА = 8;
  const части: string[] = [];
  for (let ряд = 0; ряд < РЯДОВ; ряд++) {
    for (let стлб = 0; стлб < СТОЛБЦОВ; стлб++) {
      const i = (ряд * СТОЛБЦОВ + стлб) % семя.length;
      if (семя.charCodeAt(i) % 2 === 0) {
        const x1 = стлб * КЛЕТКА;
        const x2 = (РЯДОВ - 1 - стлб) * КЛЕТКА;   // зеркалим — узор симметричен
        части.push(`<rect x="${x1}" y="${ряд * КЛЕТКА}" width="${КЛЕТКА}" height="${КЛЕТКА}"/>`);
        if (x2 !== x1) части.push(`<rect x="${x2}" y="${ряд * КЛЕТКА}" width="${КЛЕТКА}" height="${КЛЕТКА}"/>`);
      }
    }
  }
  const бок = РЯДОВ * КЛЕТКА;
  return `<svg width="${бок}" height="${бок}" viewBox="0 0 ${бок} ${бок}" fill="${цвет}" opacity="0.75" xmlns="http://www.w3.org/2000/svg">${части.join('')}</svg>`;
}

/**
 * QR на эту же страницу. Библиотека `qrcode` закреплена в зависимостях явно —
 * до 08.08.2026 она лежала в сборке как побочная, то есть могла исчезнуть при
 * любом обновлении соседнего пакета, и картинка пропала бы молча.
 */
async function qr(ссылка: string, цвет: string): Promise<string | null> {
  try {
    const QRCode = (await import('qrcode')) as unknown as {
      toDataURL: (t: string, o: Record<string, unknown>) => Promise<string>;
    };
    return await QRCode.toDataURL(ссылка, {
      width: 200, margin: 1, errorCorrectionLevel: 'M',
      color: { dark: цвет, light: '#0D0D1A' },
    });
  } catch (e) {
    console.warn('[паспорт] QR не построился:', String(e).slice(0, 120));
    return null;
  }
}

/** Внешние ссылки из чужого документа пускаем только по http(s). */
function безопаснаяСсылка(u?: string): string | null {
  if (!u) return null;
  try {
    const а = new URL(u.startsWith('http') ? u : `https://${u}`);
    return а.protocol === 'https:' || а.protocol === 'http:' ? а.toString() : null;
  } catch { return null; }
}

/** Картинка допускается только как встроенные данные изображения. */
function безопасноеФото(u?: string): string | null {
  return u && /^data:image\/(png|jpe?g|webp|gif);base64,/i.test(u) ? u : null;
}

/**
 * 🔴 СОБСТВЕННЫЙ КАНОНИЧЕСКИЙ АДРЕС ПАСПОРТА.
 *
 * В ЧЁМ БЫЛА МОЛЧАЛИВАЯ ПОЛОМКА. В generateMetadata ниже не было поля
 * `alternates`, и Next подставлял значение из корневого layout, где стоит
 * жёстко прописанный `canonical: "https://radiocode.space"` — то есть адрес
 * ГЛАВНОЙ страницы. Замерено на живом сайте 08.08.2026: страница паспорта
 * одновременно отдавала `<meta name="robots" content="index, follow">` и
 * `<link rel="canonical" href="https://radiocode.space">`. Для поисковика это
 * читается как «эта страница — дубль главной»: приглашение индексировать тут же
 * отменялось указанием на другой адрес. Значит НИ ОДИН выпущенный паспорт в
 * выдачу попасть не мог — сколько бы их ни выпустили. Снаружи всё выглядело
 * исправно: страница открывалась, отдавала 200 и рисовала документ.
 * Ошибка была одинаковой на всех четырёх сайтах.
 *
 * Адрес задан постоянной, а не выведен из process.cwd(): на Vercel рабочая
 * папка — /var/task, и вывод из неё однажды уже дал canonical на чужой домен.
 */
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://radiocode.space';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const п = await достать(id);
  const имя = п?.identity?.displayName || п?.identity?.username || id.slice(0, 10);
  const свой = `${BASE}/passport/${id}`;
  return {
    title: `${имя} — Digital Passport · CODE ETERNAL`,
    description: `Digital Passport of ${имя}, permanently recorded on Arweave.`,
    // Одного поля `alternates` достаточно, чтобы значение из корневого layout
    // сюда не просочилось: Next при слиянии метаданных заменяет `alternates`
    // ЦЕЛИКОМ, а не по отдельным ключам (node_modules/next/dist/lib/metadata/
    // resolve-metadata.js, ветка case 'alternates' в mergeMetadata). Дописывать
    // сюда `languages: null` нельзя — тип Metadata его не принимает, проверено:
    // npx tsc --noEmit даёт на такой строке TS2322.
    alternates: { canonical: свой },
    openGraph: { title: `${имя} — Digital Passport`, type: 'profile', url: свой },
    robots: { index: true, follow: true },
  };
}

export const revalidate = 3600;

export default async function СтраницаПаспорта({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Адрес транзакции в Arweave — ровно 43 знака base64url. Проверяем до сети:
  // иначе любой мусор в адресе уходил бы тремя запросами на шлюзы.
  if (!/^[A-Za-z0-9_-]{43}$/.test(id)) notFound();

  const п = await достать(id);
  const л = await язык();
  const с = СЛОВА[л];

  if (!п) {
    return (
      <main className="pass-page">
        <div className="pass-empty">
          <h1>{с.нет}</h1>
          <p>{id}</p>
        </div>
      </main>
    );
  }

  const и = п.identity || {};
  const ур = (и.tier && УРОВНИ[и.tier]) || УРОВЕНЬ_ПО_УМОЛЧАНИЮ;
  const цвет = ур.цвет;
  const отпечаток = п.subject || '';
  const номер = отпечаток ? `CE-${отпечаток.slice(0, 8).toUpperCase()}` : '—';
  const выдан = п.issuedAt ? new Date(п.issuedAt).toISOString().slice(0, 10) : '—';
  const имя = и.displayName || и.username || '—';
  const сайтПаспорта = (п.site || 'https://www.codeofdigitaleternity.com').replace(/\/$/, '');
  const ссылкаНаПаспорт = `${сайтПаспорта}/passport/${id}`;

  const узор = идентикон(отпечаток || id, цвет);
  const кодQR = await qr(ссылкаНаПаспорт, цвет);
  const фото = безопасноеФото(и.avatarDataUrl);
  const сайт = безопаснаяСсылка(и.website);

  // Переменная темы — единственное место, где цвет уровня входит в разметку.
  const стиль = { ['--tier' as string]: цвет } as React.CSSProperties;

  return (
    <main className="pass-page">
      <div className="passport" style={стиль}>

        <header className="p-header">
          <div className="issuer-block">
            <span className="issuer-country">Solana Blockchain</span>
            <span className="issuer-name">Code Eternal</span>
          </div>

          <div className="seal-block">
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="23" cy="23" r="22" stroke={цвет} strokeOpacity="0.28" strokeWidth="1" />
              <circle cx="23" cy="23" r="16.5" stroke={цвет} strokeOpacity="0.15" strokeWidth="0.6" />
              <polygon
                points="23,9 26.4,18.9 37,18.9 28.3,24.9 31.7,34.8 23,28.8 14.3,34.8 17.7,24.9 9,18.9 19.6,18.9"
                fill={цвет} fillOpacity="0.13" stroke={цвет} strokeOpacity="0.38" strokeWidth="0.6" />
            </svg>
          </div>

          <div className="doc-type-block">
            <span className="doc-type-label">Document Type</span>
            <span className="doc-type-value">Digital Passport</span>
            <span className="doc-tier">{ур.имя}</span>
          </div>
        </header>

        <section className="identity">
          <div className="photo-zone">
            <div className="photo-frame">
              {фото
                ? <img src={фото} className="avatar" alt="" />
                : <span className="sigil-icon">&#9670;</span>}
            </div>
            <span className="verified-badge"><span className="verified-dot" />VERIFIED</span>
          </div>

          <div className="fields">
            <div className="field span2">
              <span className="f-label">Full Name</span>
              <span className="f-value lg">{имя}</span>
            </div>
            <div className="field">
              <span className="f-label">Passport ID</span>
              <span className="f-value accent">{номер}</span>
            </div>
            <div className="field">
              <span className="f-label">Issue Date</span>
              <span className="f-value sm">{выдан}</span>
            </div>
            <div className="field">
              <span className="f-label">Network</span>
              <span className="f-value sm">Solana</span>
            </div>
            <div className="field">
              <span className="f-label">Storage</span>
              <span className="f-value sm">Arweave ∞</span>
            </div>
            {и.username ? (
              <div className="field span2">
                <span className="f-label">Digital Identity</span>
                <span className="f-value social-field">🌐 @{и.username}</span>
              </div>
            ) : null}
            {и.telegram ? (
              <div className="field span2">
                <span className="f-label">Telegram</span>
                <a href={`https://t.me/${encodeURIComponent(и.telegram)}`} rel="noopener nofollow noreferrer"
                   target="_blank" className="f-value social-field">📱 @{и.telegram}</a>
              </div>
            ) : null}
            {и.twitter ? (
              <div className="field span2">
                <span className="f-label">Twitter / X</span>
                <a href={`https://x.com/${encodeURIComponent(и.twitter)}`} rel="noopener nofollow noreferrer"
                   target="_blank" className="f-value social-field">𝕏 @{и.twitter}</a>
              </div>
            ) : null}
            {сайт ? (
              <div className="field span2">
                <span className="f-label">Website</span>
                <a href={сайт} rel="noopener nofollow noreferrer" target="_blank"
                   className="f-value social-field">🌐 {сайт.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>
              </div>
            ) : null}
          </div>
        </section>

        <div className="crypto-strip">
          <div className="identicon-wrap">
            {/* Узор построен нами из отпечатка — чужой разметки здесь нет. */}
            <span dangerouslySetInnerHTML={{ __html: узор }} />
            <span className="identicon-label">Identity Print</span>
          </div>

          <div className="chip-center">
            <div className="chip-svg-wrap">
              <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="46" height="34" rx="5" stroke={цвет} strokeOpacity="0.4" strokeWidth="1" />
                <rect x="6" y="6" width="36" height="24" rx="3" stroke={цвет} strokeOpacity="0.25" strokeWidth="0.8" />
                {[16, 24, 32].map((x) => (
                  <g key={`v${x}`}>
                    <line x1={x} y1="1" x2={x} y2="6" stroke={цвет} strokeOpacity="0.35" strokeWidth="1" />
                    <line x1={x} y1="30" x2={x} y2="35" stroke={цвет} strokeOpacity="0.35" strokeWidth="1" />
                  </g>
                ))}
                {[12, 18, 24].map((y) => (
                  <g key={`h${y}`}>
                    <line x1="1" y1={y} x2="6" y2={y} stroke={цвет} strokeOpacity="0.35" strokeWidth="1" />
                    <line x1="42" y1={y} x2="47" y2={y} stroke={цвет} strokeOpacity="0.35" strokeWidth="1" />
                  </g>
                ))}
                <rect x="13" y="10" width="22" height="16" rx="2" fill={цвет} fillOpacity="0.08"
                      stroke={цвет} strokeOpacity="0.2" strokeWidth="0.6" />
                {[18, 24, 30].map((x) => (
                  <line key={`c${x}`} x1={x} y1="10" x2={x} y2="26" stroke={цвет} strokeOpacity="0.15" strokeWidth="0.6" />
                ))}
                {[15, 21].map((y) => (
                  <line key={`r${y}`} x1="13" y1={y} x2="35" y2={y} stroke={цвет} strokeOpacity="0.15" strokeWidth="0.6" />
                ))}
              </svg>
            </div>
            <span className="chip-tagline">Eternal Identity</span>
          </div>

          <div className="qr-wrap">
            {kодQRЕсть(кодQR) ? (
              <>
                <div className="qr-frame">
                  <img src={кодQR as string} width={100} height={100} alt="" />
                </div>
                <span className="qr-label">{с.сканируй}</span>
              </>
            ) : null}
          </div>
        </div>

        <div className="content-area">
          {и.bio ? (
            <div className="scroll-card">
              <div className="c-label">About</div>
              <div className="c-body">{и.bio}</div>
            </div>
          ) : null}
          {и.manifesto ? (
            <div className="scroll-card">
              <div className="c-label">Manifesto</div>
              <div className="c-manifesto">{и.manifesto}</div>
            </div>
          ) : null}
          {!и.bio && !и.manifesto ? (
            <div className="scroll-card">
              <div className="c-label">Memory Scroll</div>
              <div className="c-body">{с.свиток.replace('{дата}', выдан)}</div>
            </div>
          ) : null}
        </div>

        <div className="mrz">
          <div className="mrz-label">Blockchain Proof</div>
          <div className="mrz-row"><span className="mrz-key">SUBJECT</span><span className="mrz-val">{отпечаток || '—'}</span></div>
          <div className="mrz-row"><span className="mrz-key">TX&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span className="mrz-val">{id}</span></div>
        </div>

        <footer className="p-footer">
          <span className="arweave-stamp"><span className="arweave-dot" />{с.вечно}</span>
          <span className="year-mark">{выдан.slice(0, 4)}</span>
        </footer>
      </div>

      <p className="pass-verify">
        <a href={`https://arweave.net/${id}`} rel="noopener noreferrer" target="_blank">{с.проверить} ↗</a>
      </p>
      <p className="pass-note">{с.сноска}</p>
    </main>
  );
}

/** Отдельной функцией — чтобы в разметке не было проверки на null посреди JSX. */
function kодQRЕсть(v: string | null): boolean { return typeof v === 'string' && v.length > 0; }
