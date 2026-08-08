import type { Metadata } from 'next';
import { headers, cookies } from 'next/headers';
import { notFound } from 'next/navigation';

/**
 * ПУБЛИЧНАЯ СТРАНИЦА ЦИФРОВОГО ПАСПОРТА.
 *
 * 🔴 ЗАЧЕМ ОНА ПОЯВИЛАСЬ. 08.08.2026 я отчиталась Архитектору четырьмя ссылками
 * на выпущенные паспорта — и получила «что это за дерьмо? По ссылкам ничего
 * НЕТ!». Ссылки вели прямо в Arweave, а шлюз отдаёт там сырой JSON: набор
 * фигурных скобок, который в браузере выглядит как ошибка. Сам документ был на
 * месте и читался, но ПОКАЗАТЬ его было негде — страницы просмотра не
 * существовало ни на одном из четырёх сайтов.
 *
 * Теперь есть: `/passport/<id транзакции>` берёт документ из вечного хранилища
 * и рисует его как паспорт. Ссылка живёт столько же, сколько сеть: сайт может
 * исчезнуть, а запись останется — внизу страницы всегда стоит прямой адрес в
 * Arweave, чтобы прочитать документ без нас.
 *
 * Страница намеренно ничего не требует: ни входа, ни ключей. Паспорт — это
 * публичное свидетельство личности, его показывают.
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

const СЛОВА: Record<Loc, Record<string, string>> = {
  ru: {
    заголовок: 'Цифровой паспорт', выдан: 'Выдан', уровень: 'Уровень',
    отпечаток: 'Отпечаток личности', оМанифест: 'Манифест', оСебе: 'О себе',
    сайт: 'Сайт', проверить: 'Проверить запись в блокчейне',
    вечно: 'Запись в Arweave неизменяема и хранится бессрочно',
    нет: 'Паспорт по этой ссылке не найден', связи: 'Связь',
    сноска: 'Документ прочитан прямо из сети Arweave. Сайт его не хранит и не может изменить.',
  },
  en: {
    заголовок: 'Digital Passport', выдан: 'Issued', уровень: 'Tier',
    отпечаток: 'Identity fingerprint', оМанифест: 'Manifesto', оСебе: 'About',
    сайт: 'Website', проверить: 'Verify the record on-chain',
    вечно: 'The Arweave record is immutable and stored permanently',
    нет: 'No passport found at this address', связи: 'Contact',
    сноска: 'The document is read straight from the Arweave network. This site neither stores nor can alter it.',
  },
  es: {
    заголовок: 'Pasaporte Digital', выдан: 'Emitido', уровень: 'Nivel',
    отпечаток: 'Huella de identidad', оМанифест: 'Manifiesto', оСебе: 'Acerca de',
    сайт: 'Sitio web', проверить: 'Verificar el registro en la cadena',
    вечно: 'El registro en Arweave es inmutable y se guarda para siempre',
    нет: 'No se encontró ningún pasaporte en esta dirección', связи: 'Contacto',
    сноска: 'El documento se lee directamente de la red Arweave. Este sitio no lo almacena ni puede modificarlo.',
  },
  zh: {
    заголовок: '数字护照', выдан: '签发于', уровень: '等级',
    отпечаток: '身份指纹', оМанифест: '宣言', оСебе: '简介',
    сайт: '网站', проверить: '在链上验证记录',
    вечно: 'Arweave 记录不可篡改，永久保存', нет: '此地址未找到护照',
    связи: '联系方式',
    сноска: '该文件直接从 Arweave 网络读取。本站既不存储也无法修改它。',
  },
};

const УРОВНИ: Record<number, string> = { 1: 'Spark', 2: 'Family Archive', 3: 'Digital DNA' };

/**
 * Шлюзы перечислены по очереди: у arweave.net случаются провалы, и одна
 * недоступность шлюза не должна выглядеть как «паспорта не существует».
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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const п = await достать(id);
  const имя = п?.identity?.displayName || п?.identity?.username || id.slice(0, 10);
  return {
    title: `${имя} — CODE Eternal Digital Passport`,
    description: `Digital Passport of ${имя}, permanently recorded on Arweave.`,
    openGraph: { title: `${имя} — Digital Passport`, type: 'profile' },
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
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24 }}>{с.нет}</h1>
        <p style={{ fontSize: 16, opacity: 0.75, marginTop: 12, wordBreak: 'break-all' }}>{id}</p>
      </main>
    );
  }

  const и = п.identity || {};
  const выдан = п.issuedAt ? new Date(п.issuedAt).toISOString().slice(0, 10) : '—';
  const уровень = и.tier ? `${и.tier} · ${УРОВНИ[и.tier] || ''}`.trim() : '—';

  return (
    <main className="pass-wrap">
      <style>{`
        .pass-wrap{max-width:760px;margin:0 auto;padding:48px 20px 96px;
          font:16px/1.65 -apple-system,Segoe UI,Roboto,sans-serif;color:#12121c}
        .pass-card{border-radius:22px;padding:34px;
          background:linear-gradient(160deg,#0d1230 0%,#151a3f 55%,#0a0e26 100%);
          color:#e8ecff;box-shadow:0 24px 60px rgba(10,14,38,.34)}
        .pass-top{display:flex;align-items:center;gap:18px;flex-wrap:wrap}
        .pass-ava{width:76px;height:76px;border-radius:20px;object-fit:cover;
          background:rgba(255,255,255,.08);display:flex;align-items:center;
          justify-content:center;font-size:30px;font-weight:700;flex:none}
        .pass-name{font-size:27px;font-weight:700;margin:0;line-height:1.25}
        .pass-nick{font-size:17px;color:#8fb7ff;margin:4px 0 0}
        .pass-kind{font-size:13px;letter-spacing:.16em;text-transform:uppercase;
          color:#8f9bd6;margin:0 0 20px}
        .pass-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));
          gap:14px;margin-top:26px}
        .pass-cell{background:rgba(255,255,255,.06);border-radius:14px;padding:14px 16px}
        .pass-lab{font-size:13px;color:#98a2d8;margin:0 0 5px}
        .pass-val{font-size:16px;margin:0;word-break:break-word}
        .pass-sec{margin-top:26px}
        .pass-sec h2{font-size:15px;letter-spacing:.1em;text-transform:uppercase;
          color:#98a2d8;margin:0 0 8px;font-weight:600}
        .pass-sec p{font-size:16px;margin:0;white-space:pre-wrap}
        .pass-fp{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;
          font-size:13px;word-break:break-all;color:#c6d0ff}
        .pass-foot{margin-top:26px;font-size:15px}
        .pass-foot a{color:#0E7490;font-weight:600}
        .pass-note{font-size:14px;opacity:.72;margin-top:10px}
        @media (prefers-color-scheme:dark){
          .pass-wrap{color:#e8ecff}
          .pass-foot a{color:#7dd3fc}
        }
        @media (max-width:640px){
          .pass-card{padding:24px}
          .pass-name{font-size:23px}
          .pass-wrap{padding:28px 14px 72px}
        }
      `}</style>

      <p className="pass-kind">{с.заголовок}</p>

      <section className="pass-card">
        <div className="pass-top">
          {и.avatarDataUrl
            ? <img className="pass-ava" src={и.avatarDataUrl} alt="" />
            : <div className="pass-ava">{(и.displayName || и.username || '?').slice(0, 1).toUpperCase()}</div>}
          <div>
            <h1 className="pass-name">{и.displayName || и.username || '—'}</h1>
            {и.username ? <p className="pass-nick">@{и.username}</p> : null}
          </div>
        </div>

        <div className="pass-grid">
          <div className="pass-cell">
            <p className="pass-lab">{с.выдан}</p>
            <p className="pass-val">{выдан}</p>
          </div>
          <div className="pass-cell">
            <p className="pass-lab">{с.уровень}</p>
            <p className="pass-val">{уровень}</p>
          </div>
          {и.website ? (
            <div className="pass-cell">
              <p className="pass-lab">{с.сайт}</p>
              <p className="pass-val">{и.website.replace(/^https?:\/\//, '')}</p>
            </div>
          ) : null}
          {(и.telegram || и.twitter) ? (
            <div className="pass-cell">
              <p className="pass-lab">{с.связи}</p>
              <p className="pass-val">
                {[и.telegram ? `TG @${и.telegram}` : '', и.twitter ? `X @${и.twitter}` : '']
                  .filter(Boolean).join(' · ')}
              </p>
            </div>
          ) : null}
        </div>

        {и.bio ? (
          <div className="pass-sec">
            <h2>{с.оСебе}</h2>
            <p>{и.bio}</p>
          </div>
        ) : null}

        {и.manifesto ? (
          <div className="pass-sec">
            <h2>{с.оМанифест}</h2>
            <p>{и.manifesto}</p>
          </div>
        ) : null}

        {п.subject ? (
          <div className="pass-sec">
            <h2>{с.отпечаток}</h2>
            <p className="pass-fp">{п.subject}</p>
          </div>
        ) : null}
      </section>

      <p className="pass-foot">
        <a href={`https://arweave.net/${id}`} rel="noopener noreferrer" target="_blank">{с.проверить} ↗</a>
      </p>
      <p className="pass-note">{с.вечно}. {с.сноска}</p>
      <p className="pass-fp" style={{ marginTop: 8, opacity: 0.6 }}>{id}</p>
    </main>
  );
}
