/**
 * МОДУЛЬ АВТОРИЗАЦИИ СЕРВИСНЫХ ЗАКАЗОВ (service_orders)
 *
 * Реализует требования A1 и A2 по заданию AIfa от 28.09.2026:
 * 1. Право на глубокую проверку (> 3 страниц, до 25):
 *    - isCron (CRON_SECRET)
 *    - уровеньТарифа >= 99 (владелец)
 *    - оплаченный заказ из `service_orders` (slug: lite-audit, fix-pack, quick-audit, starter-fix и выше, monitoring, monitoring-premium):
 *      * хост из `website` совпадает с хостом проверяемого адреса
 *      * paid_at не старше 30 дней (для monitoring — пока a11y_monitoring.paid_until > now())
 *      * не больше 3 глубоких проверок на заказ за 30 дней (учёт в `service_order_usage`)
 * 2. Право на полный пакет исправлений ($99):
 *    - isCron
 *    - уровеньТарифа >= 99
 *    - оплаченный заказ из `service_orders` (slug: fix-pack, quick-audit, starter-fix и выше) с тем же хостом сайта.
 *    - без оплаты отдаётся превью (2 карточки + N заголовков + кнопка $99).
 */

let tablesInitialized = false;

export function extractHost(raw: string): string {
  if (!raw) return '';
  const trimmed = raw.trim().toLowerCase();
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const u = new URL(withProto);
    return u.hostname.replace(/^www\./, '');
  } catch {
    return trimmed
      .replace(/^(https?:\/\/)?(www\.)?/, '')
      .split('/')[0]
      .split(':')[0]
      .trim();
  }
}

/**
 * Точное сопоставление хоста для подписок мониторинга (C3)
 * example.com НЕ активирует e.com
 * e.com активирует e.com и www.e.com
 */
export function isMonitoringHostMatch(registeredWebsiteOrHost: string, targetHostOrUrl: string): boolean {
  const regHost = extractHost(registeredWebsiteOrHost);
  const targetHost = extractHost(targetHostOrUrl);
  return Boolean(regHost && targetHost && regHost === targetHost);
}

async function getSql() {
  const url = process.env.SUBMISSIONS_DB_URL || process.env.DATABASE_URL || process.env.DATABASE_URL_VECTOR;
  if (!url) return null;
  const { neon } = await import('@neondatabase/serverless');
  return neon(url);
}

/**
 * ЕДИНАЯ СХЕМА таблицы `a11y_monitoring` — 02.10.2026.
 *
 * До этого таблицу создавали ДВА места с разной схемой: уведомление об оплате (aifa.digital) — с первичным
 * ключом (email, website), без `id` и языка; задача мониторинга (aifa.works) — с `id` и языком, без уникального
 * ключа. Кто создал бы таблицу первым, у того вторая сторона падала бы: задача не нашла бы `id`, или запись
 * оплаты не нашла бы ключ для ON CONFLICT — и оплативший мониторинг не получил бы ни одного отчёта. Ещё одна
 * проверка ниже читала столбец `host`, которого не было ни в одной схеме. Замер 02.10.2026: таблицы ещё нет,
 * оплаченных подписок 0 — денег не потеряли.
 *
 * Теперь обе стороны зовут ЭТУ функцию. Каждая строка — «если нет, добавить»: повторный вызов безопасен,
 * существующие строки не трогаются (раздел 19 — только добавлять).
 */
export const ЕДИНАЯ_СХЕМА_МОНИТОРИНГА: string[] = [
  `CREATE TABLE IF NOT EXISTS a11y_monitoring (
     id SERIAL PRIMARY KEY,
     email TEXT NOT NULL,
     website TEXT NOT NULL,
     host TEXT,
     paid_until TIMESTAMPTZ NOT NULL,
     last_scan TEXT,
     last_run TIMESTAMPTZ,
     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
     locale VARCHAR(10) DEFAULT 'en',
     tier TEXT NOT NULL DEFAULT 'standard',
     order_id TEXT
   )`,
  `ALTER TABLE a11y_monitoring ADD COLUMN IF NOT EXISTS id SERIAL`,
  `ALTER TABLE a11y_monitoring ADD COLUMN IF NOT EXISTS host TEXT`,
  `ALTER TABLE a11y_monitoring ADD COLUMN IF NOT EXISTS locale VARCHAR(10) DEFAULT 'en'`,
  `ALTER TABLE a11y_monitoring ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'standard'`,
  `ALTER TABLE a11y_monitoring ADD COLUMN IF NOT EXISTS order_id TEXT`,
  `CREATE UNIQUE INDEX IF NOT EXISTS a11y_monitoring_email_website ON a11y_monitoring (email, website)`,
  `CREATE INDEX IF NOT EXISTS idx_a11y_monitoring_schedule ON a11y_monitoring (paid_until, last_run, created_at)`,
];

export async function обеспечитьСхемуМониторинга(query: (text: string) => Promise<unknown>): Promise<void> {
  for (const q of ЕДИНАЯ_СХЕМА_МОНИТОРИНГА) {
    try {
      await query(q);
    } catch (e) {
      console.warn('[a11y_monitoring] схема:', String(e).slice(0, 160));
    }
  }
}

/** Подписки мониторинга: обычная ($25, раз в неделю) и премиум ($99, раз в три дня, полный пакет исправлений). */
export const СЛАГИ_МОНИТОРИНГА = ['monitoring', 'monitoring-premium'];

/** Активна ли ПРЕМИУМ-подписка мониторинга для этого хоста — даёт полный пакет исправлений к каждой проверке. */
async function премиумМониторингАктивен(sql: NonNullable<Awaited<ReturnType<typeof getSql>>>, targetHost: string): Promise<boolean> {
  try {
    await обеспечитьСхемуМониторинга((q) => sql.query(q));
    const rows = (await sql.query(
      `SELECT website, host FROM a11y_monitoring WHERE tier = 'premium' AND paid_until > now()`
    )) as Array<{ website?: string; host?: string | null }>;
    return rows.some((r) => isMonitoringHostMatch(String(r.host || r.website || ''), targetHost));
  } catch {
    return false;
  }
}

export async function ensureServiceOrdersTables(): Promise<void> {
  if (tablesInitialized) return;
  const sql = await getSql();
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS service_orders (
        order_id TEXT PRIMARY KEY,
        status TEXT NOT NULL,
        slug TEXT NOT NULL,
        website TEXT NOT NULL,
        email TEXT,
        paid_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS service_order_usage (
        id BIGSERIAL PRIMARY KEY,
        order_id TEXT NOT NULL,
        host TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS service_order_usage_idx
        ON service_order_usage (order_id, created_at DESC)
    `;
    tablesInitialized = true;
  } catch (e) {
    console.error('[service-orders] ensureTables error:', e);
  }
}

export interface DeepScanPermissionResult {
  canDeepScan: boolean;
  reason: 'cron' | 'owner' | 'paid_order' | 'no_order' | 'not_paid' | 'host_mismatch' | 'expired' | 'limit_reached' | 'no_db';
  order?: {
    orderId: string;
    slug: string;
    website: string;
    paidAt: string | null;
  };
  usageCount?: number;
}

/**
 * Проверка права на глубокое сканирование (до 25 страниц)
 */
export async function checkDeepScanPermission(params: {
  orderId?: string | null;
  targetHost: string;
  isCron?: boolean;
  userTier?: number;
}): Promise<DeepScanPermissionResult> {
  if (params.isCron) {
    return { canDeepScan: true, reason: 'cron' };
  }
  if (params.userTier !== undefined && params.userTier >= 99) {
    return { canDeepScan: true, reason: 'owner' };
  }

  const orderId = (params.orderId || '').trim();
  if (!orderId) {
    return { canDeepScan: false, reason: 'no_order' };
  }

  const sql = await getSql();
  if (!sql) {
    return { canDeepScan: false, reason: 'no_db' };
  }

  await ensureServiceOrdersTables();

  try {
    const orders = await sql`
      SELECT order_id, status, slug, website, email, paid_at
      FROM service_orders
      WHERE order_id = ${orderId}
      LIMIT 1
    `;

    if (!orders || orders.length === 0) {
      return { canDeepScan: false, reason: 'not_paid' };
    }

    const order = orders[0] as {
      order_id: string;
      status: string;
      slug: string;
      website: string;
      email?: string;
      paid_at?: string | null;
    };

    if (order.status !== 'paid') {
      return { canDeepScan: false, reason: 'not_paid' };
    }

    // Проверка хоста
    const orderHost = extractHost(order.website);
    const targetHost = extractHost(params.targetHost);
    if (!orderHost || !targetHost || orderHost !== targetHost) {
      return { canDeepScan: false, reason: 'host_mismatch' };
    }

    // Проверка срока
    // 02.10.2026: премиум-мониторинг — те же права на глубокую проверку, что у обычного.
    const isMonitoring = СЛАГИ_МОНИТОРИНГА.includes(order.slug);
    if (isMonitoring) {
      // Для мониторинга — пока a11y_monitoring.paid_until > now()
      let monitoringActive = false;
      try {
        const monRows = await sql`
          SELECT 1 FROM a11y_monitoring
          WHERE (
            LOWER(host) = LOWER(${targetHost})
            OR (host IS NULL AND LOWER(website) IN (
              ${targetHost},
              ${'www.' + targetHost},
              ${'https://' + targetHost},
              ${'https://www.' + targetHost},
              ${'http://' + targetHost},
              ${'http://' + targetHost + '/'},
              ${'https://' + targetHost + '/'},
              ${'https://www.' + targetHost + '/'}
            ))
          )
          AND paid_until > now()
          LIMIT 1
        `;
        if (monRows && monRows.length > 0) monitoringActive = true;
      } catch {}

      if (!monitoringActive && order.paid_at) {
        // Fallback если ещё не создана запись в a11y_monitoring — смотрим 30 дней
        const paidDate = new Date(order.paid_at);
        const days = (Date.now() - paidDate.getTime()) / (1000 * 60 * 60 * 24);
        if (days > 30) {
          return { canDeepScan: false, reason: 'expired' };
        }
      } else if (!monitoringActive) {
        return { canDeepScan: false, reason: 'expired' };
      }
    } else {
      if (!order.paid_at) {
        return { canDeepScan: false, reason: 'expired' };
      }
      const paidDate = new Date(order.paid_at);
      const days = (Date.now() - paidDate.getTime()) / (1000 * 60 * 60 * 24);
      if (days > 30) {
        return { canDeepScan: false, reason: 'expired' };
      }
    }

    // Проверка лимита: не больше 3 глубоких проверок на заказ за 30 дней
    const usageRows = await sql`
      SELECT count(*)::int AS cnt
      FROM service_order_usage
      WHERE order_id = ${orderId}
        AND created_at > now() - interval '30 days'
    `;
    const count = Number((usageRows?.[0] as { cnt?: number })?.cnt ?? 0);
    if (count >= 3) {
      return { canDeepScan: false, reason: 'limit_reached', usageCount: count };
    }

    return {
      canDeepScan: true,
      reason: 'paid_order',
      order: {
        orderId: order.order_id,
        slug: order.slug,
        website: order.website,
        paidAt: order.paid_at ? String(order.paid_at) : null,
      },
      usageCount: count,
    };
  } catch (err) {
    console.error('[service-orders] checkDeepScanPermission error:', err);
    return { canDeepScan: false, reason: 'no_db' };
  }
}

/**
 * Фиксация выполнения глубокого сканирования по оплаченному заказу
 */
export async function recordDeepScanUsage(orderId: string, host: string): Promise<void> {
  if (!orderId) return;
  const sql = await getSql();
  if (!sql) return;
  try {
    await ensureServiceOrdersTables();
    await sql`
      INSERT INTO service_order_usage (order_id, host)
      VALUES (${orderId.trim()}, ${extractHost(host)})
    `;
  } catch (e) {
    console.error('[service-orders] recordDeepScanUsage error:', e);
  }
}

export interface FixpackPermissionResult {
  hasFullAccess: boolean;
  reason: 'cron' | 'owner' | 'paid_order' | 'no_order' | 'not_paid' | 'host_mismatch' | 'slug_not_eligible' | 'expired' | 'no_db';
}

/**
 * Проверка права на получение ПОЛНОГО пакета исправлений ($99)
 * Полный пакет: только владельцу (99), по cron-секрету или по оплаченному заказу
 * service_orders (slug fix-pack, quick-audit, starter-fix и выше) с тем же хостом сайта.
 */
export async function checkFixpackPermission(params: {
  orderId?: string | null;
  targetHost: string;
  isCron?: boolean;
  userTier?: number;
}): Promise<FixpackPermissionResult> {
  if (params.isCron) {
    return { hasFullAccess: true, reason: 'cron' };
  }
  if (params.userTier !== undefined && params.userTier >= 99) {
    return { hasFullAccess: true, reason: 'owner' };
  }

  const orderId = (params.orderId || '').trim();
  if (!orderId) {
    return { hasFullAccess: false, reason: 'no_order' };
  }

  const sql = await getSql();
  if (!sql) {
    return { hasFullAccess: false, reason: 'no_db' };
  }

  await ensureServiceOrdersTables();

  try {
    const orders = await sql`
      SELECT order_id, status, slug, website
      FROM service_orders
      WHERE order_id = ${orderId}
      LIMIT 1
    `;

    if (!orders || orders.length === 0) {
      return { hasFullAccess: false, reason: 'not_paid' };
    }

    const order = orders[0] as {
      order_id: string;
      status: string;
      slug: string;
      website: string;
    };

    if (order.status !== 'paid') {
      return { hasFullAccess: false, reason: 'not_paid' };
    }

    // Разрешённые тарифы, включающие пакет исправлений:
    // slug fix-pack, quick-audit, starter-fix и выше
    //
    // 02.10.2026, ОЧЕВИДНАЯ ОШИБКА (раздел 47): «и выше» было записано именами, которых нет в прайсе
    // (deep-audit, standard-audit, full-audit, custom-fix, enterprise-audit). Клиент тарифов professional ($750),
    // ai-enhanced ($1 200), ecosystem ($1 800), enterprise-lite ($2 500), enterprise-pro ($3 500) получил бы
    // только превью пакета. Прежние имена оставлены (ничего не удаляем), настоящие добавлены.
    const ELIGIBLE_SLUGS = [
      'fix-pack',
      'quick-audit',
      'starter-fix',
      'deep-audit',
      'standard-audit',
      'full-audit',
      'custom-fix',
      'enterprise-audit',
      'professional',
      'ai-enhanced',
      'ecosystem',
      'enterprise-lite',
      'enterprise-pro',
      'full-remediation',
      'monitoring-premium',
    ];
    if (!ELIGIBLE_SLUGS.includes(order.slug.toLowerCase())) {
      return { hasFullAccess: false, reason: 'slug_not_eligible' };
    }

    // Совпадение хоста
    const orderHost = extractHost(order.website);
    const targetHost = extractHost(params.targetHost);
    if (!orderHost || !targetHost || orderHost !== targetHost) {
      return { hasFullAccess: false, reason: 'host_mismatch' };
    }

    // 02.10.2026: премиум-мониторинг даёт полный пакет, ПОКА подписка оплачена (a11y_monitoring.paid_until).
    // Иначе один месяц открывал бы полный пакет для этого сайта навсегда.
    if (order.slug.toLowerCase() === 'monitoring-premium' && !(await премиумМониторингАктивен(sql, targetHost))) {
      return { hasFullAccess: false, reason: 'expired' };
    }

    return { hasFullAccess: true, reason: 'paid_order' };
  } catch (err) {
    console.error('[service-orders] checkFixpackPermission error:', err);
    return { hasFullAccess: false, reason: 'no_db' };
  }
}
