/**
 * НАСЛЕДНИК ПАМЯТИ — механизм «на всякий случай».
 *
 * ЗАЧЕМ ЭТО ВООБЩЕ ПОЯВИЛОСЬ. 05.08.2026 вышла статья «Цифровое наследство: что
 * остаётся от человека, когда заканчивается пароль». В ней прямо сказано, что
 * передача доступа наследнику входит в старшие тарифы. В кабинете такой
 * возможности не было вовсе. Статья обещала то, чего мы не делали, и закрыть
 * это правкой текста нельзя: обещание уже прочитали живые люди.
 *
 * НА ЧЁМ ОСНОВАН МЕХАНИЗМ. Только на молчании — ровно как Inactive Account
 * Manager у Google. Мы не нотариус: не просим свидетельство о смерти, не ведём
 * никакой юридической процедуры и не проверяем, что случилось с человеком. Мы
 * умеем ровно одно — заметить, что владелец давно не приходил, предупредить его
 * дважды и, если он так и не пришёл, дать наследнику доступ к архиву.
 *
 * ЧТО ИМЕННО ПОЛУЧАЕТ НАСЛЕДНИК. Копию ключа вечной памяти владельца и список
 * его записей в Arweave. И ВСЁ. Ни пароля, ни входа в учётную запись, ни
 * возможности что-то изменить или удалить. Это принципиально разные вещи:
 * доступ к архиву — чтение уже написанного, доступ к учётной записи — право
 * писать от чужого имени. Второго мы не даём никому и никогда.
 *
 * ЧЕГО МЕХАНИЗМ НЕ ДЕЛАЕТ У ВЛАДЕЛЬЦА. Он ничего не отбирает. Владелец после
 * передачи остаётся полным хозяином своей памяти: его ключ прежний, записи
 * прежние, вход прежний. Наследование только ДОБАВЛЯЕТ читателя.
 *
 * ПО УМОЛЧАНИЮ НЕ ВКЛЮЧЕНО НИ У КОГО. Строка в таблице появляется только тогда,
 * когда человек сам назначил наследника.
 *
 * ПОЧЕМУ ФАЙЛ САМОДОСТАТОЧНЫЙ. Он копируется без изменений на все четыре сайта
 * (Правило Четырёх Сайтов), а состав библиотек у сайтов разный: на двух
 * спутниках нет `lib/mail.ts` и нет `lib/chat-logger.ts`. Поэтому и отправка
 * письма, и приведение почты к виду ключа памяти сделаны здесь на месте — иначе
 * файл собирался бы на центральном сайте и падал бы при сборке спутника.
 */
import crypto from 'crypto';

/** Сроки молчания на выбор. Больше 24 месяцев не даём: два года — это уже не «вдруг», а «точно». */
export const СРОКИ_МЕСЯЦЕВ = [6, 12, 18, 24] as const;
export type СрокМесяцев = (typeof СРОКИ_МЕСЯЦЕВ)[number];

/**
 * Тариф, начиная с которого можно назначить наследника.
 *
 * 2 — Family Archive ($100/мес), 3 — Digital DNA. Нумерация та же, что в
 * `chat-quota.ts` и `arweave-quota.ts`: 0 — бесплатный, 1 — Spark ($15).
 * Именно так написано в статье, и цены здесь не выдумываются — они в
 * Конституции.
 */
export const МИН_ТАРИФ = 2;

/** За сколько дней до срока шлём предупреждения владельцу. Порядок важен: от дальнего к ближнему. */
export const ПРЕДУПРЕЖДЕНИЯ_ДНЕЙ = [30, 7] as const;

/** Сколько живёт ссылка наследника. Месяц: письмо могут прочесть не в тот же день. */
export const СРОК_ССЫЛКИ_ДНЕЙ = 30;

/**
 * Сколько времени ссылка ещё открывается ПОСЛЕ первого открытия.
 *
 * ПОЧЕМУ НЕ СТРОГО ОДИН РАЗ В БУКВАЛЬНОМ СМЫСЛЕ. Строгий «ровно один запрос»
 * ломается о реальность: почтовый клиент делает предпросмотр ссылки, антивирус
 * корпоративной почты открывает её раньше человека, а сам человек случайно
 * обновляет страницу — и единственный шанс сгорает на пустом месте, причём в
 * тот момент жизни, когда разбираться с этим некому. Полчаса — это всё ещё
 * «одно открытие» по смыслу (одна сессия у одного человека), но уже переживает
 * обновление страницы. Первое открытие фиксируется в любом случае.
 */
export const ОКНО_ПОВТОРА_МИНУТ = 30;

export type СостояниеНаследования = {
  heirEmail: string;
  silenceMonths: number;
  createdAt: string | null;
  updatedAt: string | null;
  warn30At: string | null;
  warn7At: string | null;
  handoverAt: string | null;
  claimedAt: string | null;
};

type PoolLike = {
  query: <T = Record<string, unknown>>(text: string, params?: unknown[]) => Promise<{ rows: T[]; rowCount: number }>;
  end: () => Promise<void>;
};

let схемаГотова = false;

/**
 * Создание таблицы. Idempotent — как у соседей: ручка может быть вызвана
 * раньше, чем кто-либо думал о миграциях, и не должна от этого падать.
 *
 * Столбцы дописываются отдельными ALTER … IF NOT EXISTS: у уже работающей базы
 * `CREATE TABLE IF NOT EXISTS` не тронет существующую таблицу, и новое поле без
 * ALTER там никогда не появится. На этом уже обжигались с `users_auth.country`.
 */
export async function подготовитьСхему(pool: PoolLike): Promise<void> {
  if (схемаГотова) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS memory_heirs (
      email            VARCHAR(255) PRIMARY KEY,
      heir_email       VARCHAR(255) NOT NULL,
      silence_months   SMALLINT     NOT NULL,
      created_at       TIMESTAMPTZ  NOT NULL DEFAULT now(),
      updated_at       TIMESTAMPTZ  NOT NULL DEFAULT now()
    )`);
  for (const [имя, тип] of [
    ['owner_seen_at', 'TIMESTAMPTZ'],     // когда владелец последний раз открывал кабинет
    ['warn30_at', 'TIMESTAMPTZ'],         // когда ушло предупреждение за 30 дней
    ['warn7_at', 'TIMESTAMPTZ'],          // когда ушло предупреждение за 7 дней
    ['handover_at', 'TIMESTAMPTZ'],       // когда наследнику ушло письмо со ссылкой
    ['token_hash', 'TEXT'],               // sha256 от ссылки; сама ссылка у нас не хранится
    ['token_expires_at', 'TIMESTAMPTZ'],
    ['claimed_at', 'TIMESTAMPTZ'],        // первое открытие ссылки — фиксируем
    ['claimed_ip', 'TEXT'],
  ] as const) {
    await pool.query(`ALTER TABLE memory_heirs ADD COLUMN IF NOT EXISTS ${имя} ${тип}`);
  }
  схемаГотова = true;
}

/**
 * Приведение почты к виду, из которого считается ключ памяти.
 *
 * Копия `sanitizeEmail` из `chat-logger.ts`. Копия, а не импорт, потому что на
 * двух спутниках этого файла нет вовсе. Если оригинал когда-нибудь изменится —
 * менять здесь тоже, иначе память перестанет находиться: ключ памяти это
 * sha256 ИМЕННО от такой строки, и `lower(email)` — это НЕ то же самое.
 */
function почтаДляКлюча(email: string): string {
  return email.trim().toLowerCase().replace(/[^a-z0-9_.-]/g, '_');
}

/** Ключ, под которым реплики человека лежат в базе памяти. */
export function ключПамяти(email: string): string {
  return crypto.createHash('sha256').update(почтаДляКлюча(email)).digest('hex');
}

/** Простая проверка адреса. Строгую валидацию почты не делаем — она всегда врёт в обе стороны. */
export function похожеНаПочту(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 254;
}

/** Тариф человека. Сбой базы трактуем как бесплатный уровень — но НИКОГДА не как повод отобрать уже назначенного наследника. */
export async function тариф(pool: PoolLike, email: string): Promise<number> {
  try {
    const r = await pool.query<{ tier: unknown }>(
      `SELECT tier FROM user_tiers WHERE LOWER(email)=LOWER($1)`, [email]);
    return r.rows[0] ? Number(r.rows[0].tier) || 0 : 0;
  } catch { return 0; }
}

// ─────────────────────────── последняя активность ───────────────────────────

export type Активность = { at: Date | null; откуда: string };

/**
 * Когда человека видели в последний раз.
 *
 * ПОЧЕМУ ИСТОЧНИКОВ НЕСКОЛЬКО И БЕРЁТСЯ САМЫЙ ПОЗДНИЙ. Учётные записи и память
 * живут в РАЗНЫХ базах (это уже ловили в `aifa-outreach.ts`: в базе кабинета
 * есть люди, которых в базе памяти нет вовсе). Любой одиночный источник поэтому
 * врёт в опасную сторону — показывает молчание там, где его нет. Цена такой
 * ошибки здесь несравнимо выше обычной: чужому человеку уйдёт письмо с ключом к
 * памяти живого и активного владельца. Поэтому берём ВСЁ, что доступно, и
 * считаем активностью самое позднее.
 *
 * Что именно считается активностью:
 *   chat_memory.msg_ts     — реплика человека в разговоре с AIfa (база памяти);
 *   chat_quota.updated_at  — любая попытка написать, даже отклонённая лимитом;
 *   known_ips.created_at   — вход с нового устройства;
 *   memory_heirs.owner_seen_at — владелец открывал кабинет;
 *   users_auth.created_at  — пол: только что зарегистрировавшийся человек не
 *                            должен считаться молчащим с самого рождения.
 *
 * ЧЕСТНО О СЛАБОМ МЕСТЕ. `known_ips` пишется ТОЛЬКО при входе с нового адреса:
 * человек, который годами заходит с одного и того же домашнего компьютера, по
 * этому источнику виден один раз — в первый. Поэтому он здесь и не один.
 * Отдельной отметки «последний вход» в базе кабинета сегодня нет; когда она
 * появится, её надо добавить сюда первым источником.
 */
export async function последняяАктивность(pool: PoolLike, email: string): Promise<Активность> {
  const карта = await активностьПачкой(pool, [email]);
  return карта.get(email.toLowerCase()) || { at: null, откуда: 'нет данных' };
}

/**
 * То же самое, но сразу для многих: задача по расписанию идёт по всем, у кого
 * назначен наследник, и по запросу на человека выродилась бы в сотни запросов.
 */
export async function активностьПачкой(pool: PoolLike, почты: string[]): Promise<Map<string, Активность>> {
  const итог = new Map<string, Активность>();
  const низ = почты.map((e) => e.trim().toLowerCase()).filter(Boolean);
  if (!низ.length) return итог;

  /** Кладём отметку, только если она ПОЗЖЕ уже найденной. */
  const учесть = (почта: string, когда: unknown, откуда: string) => {
    if (!когда) return;
    const d = new Date(когда as string | number | Date);
    if (Number.isNaN(d.getTime())) return;
    const было = итог.get(почта);
    if (!было || !было.at || d.getTime() > было.at.getTime()) итог.set(почта, { at: d, откуда });
  };

  // Каждый источник — в своём try: отсутствие одной таблицы не должно обнулять
  // остальные. Пустой результат здесь опаснее ошибки, поэтому молчать нельзя —
  // сбой источника пишем в журнал.
  const источники: Array<[string, string]> = [
    ['users_auth', `SELECT LOWER(email) AS e, created_at AS t FROM users_auth WHERE LOWER(email) = ANY($1)`],
    ['known_ips', `SELECT LOWER(email) AS e, MAX(created_at) AS t FROM known_ips WHERE LOWER(email) = ANY($1) GROUP BY 1`],
    ['memory_heirs', `SELECT LOWER(email) AS e, owner_seen_at AS t FROM memory_heirs WHERE LOWER(email) = ANY($1)`],
  ];
  for (const [имя, запрос] of источники) {
    try {
      const r = await pool.query<{ e: string; t: unknown }>(запрос, [низ]);
      for (const с of r.rows) учесть(String(с.e), с.t, имя);
    } catch (e) {
      console.warn('[наследник] источник активности', имя, 'недоступен:', String(e).slice(0, 120));
    }
  }

  // chat_quota опознаёт человека строкой 'u:<почта>' — см. ктоЭто() в chat-quota.ts.
  try {
    const ключи = низ.map((e) => `u:${e}`);
    const r = await pool.query<{ ident: string; t: unknown }>(
      `SELECT ident, updated_at AS t FROM chat_quota WHERE ident = ANY($1)`, [ключи]);
    for (const с of r.rows) учесть(String(с.ident).slice(2), с.t, 'chat_quota');
  } catch (e) {
    console.warn('[наследник] источник активности chat_quota недоступен:', String(e).slice(0, 120));
  }

  // База памяти — ОТДЕЛЬНАЯ база (DATABASE_URL_VECTOR), не та, где кабинет.
  const урлПамяти = process.env.DATABASE_URL_VECTOR || process.env.VECTOR_DATABASE_URL;
  if (урлПамяти) {
    try {
      const { neon } = await import('@neondatabase/serverless');
      const sql = neon(урлПамяти) as unknown as { query: (t: string, p?: unknown[]) => Promise<unknown> };
      const поКлючу = new Map(низ.map((e) => [ключПамяти(e), e]));
      const сырое = await sql.query(
        `SELECT user_key, MAX(msg_ts) AS t FROM chat_memory
          WHERE role = 'user' AND user_key = ANY($1) GROUP BY user_key`,
        [[...поКлючу.keys()]]);
      const строки = (Array.isArray(сырое) ? сырое : ((сырое as { rows?: unknown[] })?.rows ?? [])) as Array<Record<string, unknown>>;
      for (const с of строки) {
        const почта = поКлючу.get(String(с.user_key));
        if (почта) учесть(почта, с.t, 'chat_memory');
      }
    } catch (e) {
      console.warn('[наследник] база памяти недоступна:', String(e).slice(0, 120));
    }
  }

  return итог;
}

/** Момент, в который истекает молчание. */
export function срокМолчания(активность: Date, месяцев: number): Date {
  const d = new Date(активность.getTime());
  d.setUTCMonth(d.getUTCMonth() + месяцев);
  return d;
}

/** Сколько дней осталось до срока (отрицательное — срок уже прошёл). */
export function днейДоСрока(активность: Date, месяцев: number, сейчас = new Date()): number {
  return (срокМолчания(активность, месяцев).getTime() - сейчас.getTime()) / 86_400_000;
}

/**
 * Считается ли отметка о письме относящейся к ТЕКУЩЕМУ молчанию.
 *
 * ПОЧЕМУ ТАК, А НЕ ОТДЕЛЬНЫМ ПОЛЕМ «начало молчания». Любой вход владельца
 * обязан обнулить отсчёт. Если хранить «когда предупредили» и сверять с датой
 * активности, обнуление получается само: человек зашёл — активность стала
 * позже всех отметок — все прежние письма перестали считаться отправленными, и
 * следующий круг начнётся с чистого листа. Отдельное поле пришлось бы чистить
 * руками при каждом входе, а вход происходит не в этом коде.
 */
export function отметкаАктуальна(отметка: unknown, активность: Date | null): boolean {
  if (!отметка) return false;
  if (!активность) return true;
  const t = new Date(отметка as string | number | Date).getTime();
  return !Number.isNaN(t) && t > активность.getTime();
}

// ──────────────────────────────── ссылка ────────────────────────────────

/** Новая одноразовая ссылка: наружу — секрет, в базу — только его отпечаток. */
export function новыйТокен(): { секрет: string; отпечаток: string; годенДо: Date } {
  const секрет = crypto.randomBytes(32).toString('base64url');
  return {
    секрет,
    отпечаток: отпечатокТокена(секрет),
    годенДо: new Date(Date.now() + СРОК_ССЫЛКИ_ДНЕЙ * 86_400_000),
  };
}

/**
 * Отпечаток ссылки. В базе лежит ТОЛЬКО он: утёкшая база не должна давать
 * возможности открыть чужой архив, а хеша для проверки достаточно.
 */
export function отпечатокТокена(секрет: string): string {
  return crypto.createHash('sha256').update(секрет).digest('hex');
}

/** Сверка отпечатков за постоянное время — как в соседних задачах по расписанию. */
export function отпечаткиСовпали(a: string, b: string): boolean {
  const x = Buffer.from(a || '', 'utf8');
  const y = Buffer.from(b || '', 'utf8');
  if (x.length !== y.length || !x.length) return false;
  return crypto.timingSafeEqual(x, y);
}

// ──────────────────────────────── письма ────────────────────────────────

export type Язык = 'ru' | 'en' | 'es' | 'zh';

/** Язык письма по стране из учётной записи — тем же правилом, что в aifa-outreach.ts. */
export function языкПоСтране(country: unknown): Язык {
  const с = String(country || '').toUpperCase();
  if (с === 'US' || с === 'GB' || с === 'CA' || с === 'AU') return 'en';
  if (с === 'ES' || с === 'MX' || с === 'AR' || с === 'CO' || с === 'CL') return 'es';
  if (с === 'CN' || с === 'TW' || с === 'HK' || с === 'SG') return 'zh';
  return 'ru';
}

/**
 * Отправка письма.
 *
 * ПОЧЕМУ ЗДЕСЬ СВОЙ ОТПРАВИТЕЛЬ, А НЕ `lib/mail.ts`. Файл обязан собираться на
 * всех четырёх сайтах, а `lib/mail.ts` есть только на двух из них. Импорт
 * несуществующего модуля — это не ошибка во время работы, которую можно поймать
 * в try, а ошибка СБОРКИ: спутник просто перестанет собираться. Поэтому здесь
 * тот же способ, что в `account-security.ts` каждого сайта, — Resend по HTTP.
 *
 * Возвращает id со стороны Resend, а не `true`. Голый `true` в журнале выглядит
 * одинаково и когда письмо ушло, и когда оно молча не ушло, — а именно эти
 * письма пропустить нельзя.
 */
export async function отправитьПисьмо(
  кому: string, тема: string, html: string
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const ключ = process.env.RESEND_API_KEY;
  const от = process.env.RESEND_FROM || process.env.SMTP_FROM || 'CODE Eternal <noreply@codeofdigitaleternity.com>';
  if (!ключ) return { ok: false, error: 'no_resend_key' };
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${ключ}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: от, to: [кому], subject: тема, html }),
    });
    const д = await r.json().catch(() => ({} as Record<string, unknown>));
    if (!r.ok) return { ok: false, error: `resend_${r.status}:${String((д as any)?.message || '').slice(0, 120)}` };
    return { ok: true, id: String((д as any)?.id || '') };
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 160) };
  }
}

/** Общая рамка письма — тёмная, как весь кабинет. */
export function рамка(заголовок: string, тело: string): string {
  return `<div style="background:#030712;color:#e5e7eb;font-family:-apple-system,Segoe UI,sans-serif;padding:28px;border-radius:14px;border:1px solid rgba(6,182,212,0.25);max-width:600px;margin:0 auto;line-height:1.6">
  <h2 style="color:#22D3EE;margin:0 0 16px;font-size:20px">${заголовок}</h2>
  ${тело}
  <p style="margin-top:24px;color:#6b7280;font-size:13px">CODE Eternal — codeofdigitaleternity.com</p>
</div>`;
}

function экран(v: string): string {
  return String(v).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
export { экран };

/**
 * Письмо-предупреждение владельцу.
 *
 * ТОН ВЫБРАН НАМЕРЕННО СПОКОЙНЫЙ. Это письмо приходит живому человеку, который
 * просто был занят. Пугать его словом «смерть» или требовать действий нельзя —
 * достаточно сказать, что мы давно не виделись, и что один заход всё отменяет.
 */
export function письмоПредупреждение(
  язык: Язык, наследник: string, дней: number, ссылкаНаКабинет: string
): { тема: string; html: string } {
  const н = экран(наследник);
  const тексты: Record<Язык, { тема: string; заг: string; т: string }> = {
    ru: {
      тема: `Мы давно тебя не видели — ${дней} дн. до передачи архива`,
      заг: 'Мы давно тебя не видели',
      т: `<p>Ты когда-то назначил наследником своей памяти <b>${н}</b> и попросил передать ему архив, если долго не будешь заходить.</p>
          <p>Этот срок истекает через <b>${дней} дн.</b></p>
          <p><b>Если всё в порядке — просто зайди в кабинет.</b> Один заход обнуляет отсчёт, и это письмо больше не придёт.</p>
          <p><a href="${ссылкаНаКабинет}" style="color:#22D3EE">Открыть кабинет</a></p>
          <p style="color:#9ca3af;font-size:14px">Наследник получит только копию архива и ключ для его чтения. Ни пароля, ни входа в твою учётную запись он не получит — этого мы не передаём никому.</p>`,
    },
    en: {
      тема: `We haven't seen you in a while — ${дней} days until the archive is passed on`,
      заг: "We haven't seen you in a while",
      т: `<p>You once named <b>${н}</b> as the heir to your memory and asked us to pass on the archive if you stopped signing in for a long time.</p>
          <p>That period ends in <b>${дней} days</b>.</p>
          <p><b>If everything is fine, just sign in.</b> A single visit resets the countdown and this email will not come again.</p>
          <p><a href="${ссылкаНаКабинет}" style="color:#22D3EE">Open your cabinet</a></p>
          <p style="color:#9ca3af;font-size:14px">Your heir receives only a copy of the archive and the key to read it. No password, no access to your account — that we never hand over.</p>`,
    },
    es: {
      тема: `Hace tiempo que no te vemos — ${дней} días para la entrega del archivo`,
      заг: 'Hace tiempo que no te vemos',
      т: `<p>En su momento designaste a <b>${н}</b> como heredero de tu memoria y pediste que le entregáramos el archivo si dejabas de entrar durante mucho tiempo.</p>
          <p>Ese plazo termina en <b>${дней} días</b>.</p>
          <p><b>Si todo está bien, simplemente entra.</b> Una sola visita reinicia la cuenta y este correo no volverá.</p>
          <p><a href="${ссылкаНаКабинет}" style="color:#22D3EE">Abrir el panel</a></p>
          <p style="color:#9ca3af;font-size:14px">Tu heredero recibe solo una copia del archivo y la clave para leerlo. Ni contraseña ni acceso a tu cuenta: eso no se entrega nunca.</p>`,
    },
    zh: {
      тема: `我们很久没见到你了 —— 距离归档移交还有 ${дней} 天`,
      заг: '我们很久没见到你了',
      т: `<p>你曾指定 <b>${н}</b> 为你记忆的继承人，并要求在你长时间不登录时把归档交给他。</p>
          <p>这一期限将在 <b>${дней} 天</b>后到期。</p>
          <p><b>如果一切都好，只需登录一次即可。</b>一次登录就会重置倒计时，这封邮件也不会再来。</p>
          <p><a href="${ссылкаНаКабинет}" style="color:#22D3EE">打开个人中心</a></p>
          <p style="color:#9ca3af;font-size:14px">继承人只会收到归档副本和读取它的密钥。密码和账户登录权限不会移交给任何人。</p>`,
    },
  };
  const т = тексты[язык];
  return { тема: т.тема, html: рамка(т.заг, т.т) };
}

/** Письмо наследнику: ссылка на архив. */
export function письмоНаследнику(
  язык: Язык, владелец: string, ссылка: string
): { тема: string; html: string } {
  const в = экран(владелец);
  const тексты: Record<Язык, { тема: string; заг: string; т: string }> = {
    ru: {
      тема: 'Тебе передан архив памяти',
      заг: 'Тебе передан архив памяти',
      т: `<p><b>${в}</b> когда-то указал тебя наследником своей памяти в CODE Eternal и попросил передать тебе архив, если долго не будет заходить.</p>
          <p>Этот срок истёк. Мы дважды писали ему и ответа не получили.</p>
          <p><a href="${ссылка}" style="display:inline-block;background:linear-gradient(135deg,#06b6d4,#7c3aed);color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700">Получить архив и ключ</a></p>
          <p style="color:#9ca3af;font-size:14px">Ссылка одноразовая и действует ${СРОК_ССЫЛКИ_ДНЕЙ} дн. Открой её тогда, когда сможешь сразу сохранить ключ: второй раз она не откроется.</p>
          <p style="color:#9ca3af;font-size:14px">Мы не знаем и не проверяем, что случилось с человеком: механизм работает только по молчанию. Доступа к его учётной записи здесь нет — только копия архива и ключ для чтения.</p>`,
    },
    en: {
      тема: 'A memory archive has been passed to you',
      заг: 'A memory archive has been passed to you',
      т: `<p><b>${в}</b> once named you as the heir to their memory on CODE Eternal and asked us to pass the archive to you if they stopped signing in for a long time.</p>
          <p>That period has now elapsed. We wrote to them twice and received no reply.</p>
          <p><a href="${ссылка}" style="display:inline-block;background:linear-gradient(135deg,#06b6d4,#7c3aed);color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700">Get the archive and key</a></p>
          <p style="color:#9ca3af;font-size:14px">The link is single-use and valid for ${СРОК_ССЫЛКИ_ДНЕЙ} days. Open it when you can save the key straight away — it will not open a second time.</p>
          <p style="color:#9ca3af;font-size:14px">We do not know and do not verify what happened to the person: the mechanism runs on silence alone. There is no access to their account here — only a copy of the archive and the key to read it.</p>`,
    },
    es: {
      тема: 'Se te ha entregado un archivo de memoria',
      заг: 'Se te ha entregado un archivo de memoria',
      т: `<p><b>${в}</b> te designó en su momento como heredero de su memoria en CODE Eternal y pidió entregarte el archivo si dejaba de entrar durante mucho tiempo.</p>
          <p>Ese plazo ya se cumplió. Le escribimos dos veces y no hubo respuesta.</p>
          <p><a href="${ссылка}" style="display:inline-block;background:linear-gradient(135deg,#06b6d4,#7c3aed);color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700">Obtener el archivo y la clave</a></p>
          <p style="color:#9ca3af;font-size:14px">El enlace es de un solo uso y dura ${СРОК_ССЫЛКИ_ДНЕЙ} días. Ábrelo cuando puedas guardar la clave de inmediato: no se abrirá una segunda vez.</p>
          <p style="color:#9ca3af;font-size:14px">No sabemos ni verificamos qué le ocurrió a la persona: el mecanismo se basa solo en el silencio. Aquí no hay acceso a su cuenta, solo una copia del archivo y la clave para leerlo.</p>`,
    },
    zh: {
      тема: '一份记忆归档已移交给你',
      заг: '一份记忆归档已移交给你',
      т: `<p><b>${в}</b> 曾在 CODE Eternal 指定你为其记忆的继承人，并要求在其长时间不登录时把归档交给你。</p>
          <p>该期限现已届满。我们两次写信给他，均未收到回复。</p>
          <p><a href="${ссылка}" style="display:inline-block;background:linear-gradient(135deg,#06b6d4,#7c3aed);color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700">获取归档与密钥</a></p>
          <p style="color:#9ca3af;font-size:14px">该链接仅可使用一次，有效期 ${СРОК_ССЫЛКИ_ДНЕЙ} 天。请在能够立即保存密钥时再打开，它不会第二次打开。</p>
          <p style="color:#9ca3af;font-size:14px">我们不知道也不核实这个人发生了什么：该机制仅以沉默为依据。这里没有其账户的登录权限，只有归档副本和读取密钥。</p>`,
    },
  };
  const т = тексты[язык];
  return { тема: т.тема, html: рамка(т.заг, т.т) };
}

/**
 * Письмо владельцу о том, что назначение изменилось.
 *
 * ЗАЧЕМ ОНО ОБЯЗАТЕЛЬНО. Подмена наследника — это тихий способ увести чужую
 * память: тот, кто на минуту получил доступ к открытому кабинету, вписывает
 * свой адрес, и владелец об этом никогда не узнаёт. Письмо превращает тихую
 * подмену в заметную. Поэтому оно уходит на КАЖДОЕ изменение, включая отмену.
 */
export function письмоОбИзменении(
  язык: Язык, что: 'назначен' | 'изменён' | 'отменён', наследник: string, месяцев: number
): { тема: string; html: string } {
  const н = экран(наследник);
  const тексты: Record<Язык, { тема: string; заг: string; т: string }> = {
    ru: {
      тема: 'Наследник памяти изменён',
      заг: что === 'отменён' ? 'Наследник памяти отменён' : что === 'назначен' ? 'Наследник памяти назначен' : 'Наследник памяти изменён',
      т: что === 'отменён'
        ? `<p>В твоём кабинете <b>убран наследник памяти</b>. Отсчёт молчания остановлен, никому ничего не передаётся.</p>
           <p style="color:#9ca3af;font-size:14px">Если это сделал не ты — сразу смени пароль и проверь, кто имел доступ к кабинету.</p>`
        : `<p>В твоём кабинете назначен наследник памяти: <b>${н}</b>.</p>
           <p>Срок молчания — <b>${месяцев} мес.</b> Если ты не будешь заходить дольше этого срока, мы напишем тебе дважды, и только потом передадим архив.</p>
           <p style="color:#9ca3af;font-size:14px">Если это сделал не ты — зайди в кабинет и убери наследника, затем смени пароль.</p>`,
    },
    en: {
      тема: 'Memory heir changed',
      заг: что === 'отменён' ? 'Memory heir removed' : что === 'назначен' ? 'Memory heir set' : 'Memory heir changed',
      т: что === 'отменён'
        ? `<p>The <b>memory heir was removed</b> from your cabinet. The silence countdown is stopped and nothing will be passed to anyone.</p>
           <p style="color:#9ca3af;font-size:14px">If this was not you, change your password now and check who had access to your cabinet.</p>`
        : `<p>A memory heir was set in your cabinet: <b>${н}</b>.</p>
           <p>Silence period — <b>${месяцев} months</b>. If you do not sign in for longer than that, we will write to you twice before anything is passed on.</p>
           <p style="color:#9ca3af;font-size:14px">If this was not you, sign in, remove the heir and change your password.</p>`,
    },
    es: {
      тема: 'Heredero de la memoria modificado',
      заг: что === 'отменён' ? 'Heredero de la memoria eliminado' : что === 'назначен' ? 'Heredero de la memoria asignado' : 'Heredero de la memoria modificado',
      т: что === 'отменён'
        ? `<p>Se <b>eliminó el heredero de la memoria</b> en tu panel. La cuenta atrás está detenida y no se entregará nada a nadie.</p>
           <p style="color:#9ca3af;font-size:14px">Si no fuiste tú, cambia la contraseña ahora y revisa quién tuvo acceso a tu panel.</p>`
        : `<p>Se asignó un heredero de la memoria en tu panel: <b>${н}</b>.</p>
           <p>Plazo de silencio: <b>${месяцев} meses</b>. Si no entras durante más tiempo, te escribiremos dos veces antes de entregar nada.</p>
           <p style="color:#9ca3af;font-size:14px">Si no fuiste tú, entra, elimina al heredero y cambia la contraseña.</p>`,
    },
    zh: {
      тема: '记忆继承人已变更',
      заг: что === 'отменён' ? '记忆继承人已移除' : что === 'назначен' ? '已设置记忆继承人' : '记忆继承人已变更',
      т: что === 'отменён'
        ? `<p>你的个人中心已<b>移除记忆继承人</b>。沉默倒计时已停止，不会向任何人移交任何内容。</p>
           <p style="color:#9ca3af;font-size:14px">如果这不是你本人操作，请立即修改密码，并检查谁能访问你的个人中心。</p>`
        : `<p>你的个人中心已设置记忆继承人：<b>${н}</b>。</p>
           <p>沉默期为 <b>${месяцев} 个月</b>。如果你超过这个时间没有登录，我们会先给你写两封信，然后才会移交归档。</p>
           <p style="color:#9ca3af;font-size:14px">如果这不是你本人操作，请登录、移除继承人，并修改密码。</p>`,
    },
  };
  const т = тексты[язык];
  return { тема: т.тема, html: рамка(т.заг, т.т) };
}
