/**
 * Сторож CODE Eternal — независимая проверка живости всех наших сервисов.
 *
 * Зачем отдельно от того, что уже есть:
 *   • Внутренние оповещения (lib/alert.ts) живут внутри самих сайтов. Если
 *     сайт лёг целиком или Vercel недоступен, письмо отправлять уже некому —
 *     сторож должен стоять СНАРУЖИ.
 *   • Внешний UptimeRobot следит за тремя сайтами и не покрывает radiocode и
 *     телеграм-бота; на бесплатном тарифе новые проверки заводятся только
 *     руками в их интерфейсе.
 *
 * Этот сторож крутится в сети Cloudflare, запускается по расписанию раз в пять
 * минут и ничего не стоит. Он проверяет не «отвечает ли страница» (сайт может
 * отдавать 200 с мёртвой базой), а содержимое пробы здоровья: db=true и kms=true.
 *
 * Чтобы одна авария не превратилась в поток писем, отправка гасится на час:
 * отметка о последнем письме кладётся в кэш края сети — своего хранилища
 * сторожу не нужно.
 */

const TARGETS = [
  { name: 'codeofdigitaleternity.com', url: 'https://www.codeofdigitaleternity.com/api/health', expect: '"db":true' },
  { name: 'aifa.digital',              url: 'https://www.aifa.digital/api/health',              expect: '"db":true' },
  { name: 'aifa.works',                url: 'https://aifa.works/api/health',                    expect: '"db":true' },
  { name: 'radiocode.space',           url: 'https://radiocode.space/api/health',               expect: '"db":true' },
  // У бота берём именно /readyz: путь /healthz перехватывает сам Cloud Run и
  // отдаёт свою страницу 404, до приложения запрос не доходит.
  { name: 'Телеграм-бот (Cloud Run)',  url: 'https://aifa-creativity-43000852909.us-central1.run.app/readyz', expect: '"ready":true' },
];

const TIMEOUT_MS = 12_000;
const ALERT_GAP_MS = 3600_000;          // не чаще одного письма в час на одну и ту же беду
const OWNER = 'codeofdigitaleternity@gmail.com';

/** Проверка одной цели: сеть, код ответа и ожидаемая подстрока в теле. */
async function probe(t) {
  const started = Date.now();
  try {
    const res = await fetch(t.url, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'User-Agent': 'CODE-Eternal-Watchdog/1.0', 'Cache-Control': 'no-cache' },
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    const ms = Date.now() - started;
    if (!res.ok) return { ...t, ok: false, ms, why: `код ответа ${res.status}` };
    const body = await res.text();
    if (t.expect && !body.includes(t.expect)) {
      return { ...t, ok: false, ms, why: `отвечает, но нет признака «${t.expect}» — вероятно, отвалилась база` };
    }
    return { ...t, ok: true, ms };
  } catch (e) {
    return { ...t, ok: false, ms: Date.now() - started, why: `нет ответа: ${e && e.name ? e.name : 'ошибка сети'}` };
  }
}

/**
 * Гашение повторов без своего хранилища: отметка лежит в кэше края сети под
 * ключом, собранным из имён упавших целей. Пока отметка жива — письмо не идёт.
 */
async function shouldSend(key) {
  const cacheKey = new Request(`https://watchdog.invalid/alert/${encodeURIComponent(key)}`);
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) {
    const at = Number(await hit.text());
    if (Number.isFinite(at) && Date.now() - at < ALERT_GAP_MS) return false;
  }
  await cache.put(cacheKey, new Response(String(Date.now()), {
    headers: { 'Cache-Control': `max-age=${Math.floor(ALERT_GAP_MS / 1000)}` },
  }));
  return true;
}

async function sendAlert(env, down, all) {
  const key = down.map((d) => d.name).sort().join('|');
  if (!(await shouldSend(key))) return 'придержано';
  if (!env.RESEND_API_KEY) return 'нет ключа почты';

  const rows = all.map((r) =>
    `<tr><td style="padding:6px 10px">${r.ok ? '🟢' : '🔴'} ${r.name}</td>` +
    `<td style="padding:6px 10px;color:#9ca3af">${r.ms} мс</td>` +
    `<td style="padding:6px 10px;color:${r.ok ? '#4ade80' : '#f87171'}">${r.ok ? 'в порядке' : r.why}</td></tr>`
  ).join('');

  const html = `<div style="background:#030712;color:#e5e7eb;font-family:system-ui,sans-serif;padding:24px;border-radius:12px;border:1px solid #7f1d1d">
    <h2 style="color:#ef4444;margin:0 0 4px">🔴 Сторож CODE Eternal: не отвечает — ${down.length}</h2>
    <p style="color:#9ca3af;margin:0 0 16px">Проверка снаружи, из сети Cloudflare. Значит дело не в одном сайте, а в самом сервисе.</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px">${rows}</table>
    <p style="color:#6b7280;font-size:12px;margin-top:16px">${new Date().toISOString()} · повтор не раньше чем через час</p></div>`;

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.RESEND_FROM || 'CODE Eternal <noreply@codeofdigitaleternity.com>',
      to: OWNER,
      subject: `🔴 Не отвечает: ${down.map((d) => d.name).join(', ')}`,
      html,
    }),
  });
  return r.ok ? 'письмо отправлено' : `почта отказала: ${r.status}`;
}

async function runChecks(env) {
  const all = await Promise.all(TARGETS.map(probe));
  const down = all.filter((r) => !r.ok);
  let mail = 'всё в порядке';
  if (down.length) mail = await sendAlert(env, down, all);
  return { at: new Date().toISOString(), down: down.length, mail, results: all };
}

export default {
  // По расписанию — раз в пять минут.
  async scheduled(_event, env, ctx) {
    ctx.waitUntil(runChecks(env));
  },

  // Ручная проверка: открыть адрес воркера и увидеть текущую картину.
  // Письмо при этом не шлётся — чтобы проверка не будила почтой.
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/check') {
      const all = await Promise.all(TARGETS.map(probe));
      return Response.json({ at: new Date().toISOString(), results: all }, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }
    return new Response('CODE Eternal watchdog. Проверка вручную: /check', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  },
};
