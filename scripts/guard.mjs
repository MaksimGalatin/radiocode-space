/**
 * Страж перед выкладкой. Две проверки, обе про безопасность под трафиком:
 *
 *  1. Секреты в коде. Ищем строки подключения к базе, ключи и токены,
 *     которые случайно попали в репозиторий. Один такой коммит — и ключ
 *     считается утёкшим навсегда.
 *
 *  2. Публичные роуты без ограничения частоты. Каждый новый маршрут в
 *     app/api, доступный без пароля админа и без секрета cron, обязан иметь
 *     лимит — иначе он становится дверью для флуда и перебора. Проверка не
 *     даёт забыть про это в спешке.
 *
 * Запуск: node scripts/guard.mjs      (код возврата 1 = есть находки)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'dist', 'build', 'coverage']);
const SKIP_PATH = /ignored_during_vercel_build|\.d\.ts$/;

// Роуты, которым лимит не нужен: админка закрыта паролем, cron — секретом,
// health обязан отвечать всегда, а вебхук оплаты проверяет подпись.
const EXEMPT = [/\/api\/admin\//, /\/api\/cron\//, /\/api\/health\//, /\/api\/pay\/ipn\//, /\/api\/auth\/logout\//,
  // Статические ответы без базы и без внешних вызовов: флуд по ним — обычная
  // раздача статики, её берёт на себя сеть Vercel.
  /\/api\/manifesto\//, /\/api\/status\//, /\/api\/honeypot-env\//, /\/api\/koan\//];

const SECRETS = [
  [/postgres(ql)?:\/\/[^\s'"`]{12,}/i, 'строка подключения к базе'],
  [/\bnpg_[A-Za-z0-9]{16,}/, 'пароль Neon'],
  [/\bsk-[A-Za-z0-9]{20,}/, 'ключ OpenAI'],
  [/\bghp_[A-Za-z0-9]{20,}/, 'токен GitHub'],
  [/\bgithub_pat_[A-Za-z0-9_]{20,}/, 'токен GitHub'],
  [/\bAIzaSy[A-Za-z0-9_\-]{20,}/, 'ключ Google'],
  [/\bxai-[A-Za-z0-9]{20,}/, 'ключ xAI'],
  [/-----BEGIN (RSA |EC )?PRIVATE KEY-----/, 'приватный ключ'],
];

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|js|mjs|cjs|json|md|yml|yaml)$/.test(p) && !SKIP_PATH.test(p)) out.push(p);
  }
  return out;
}

// Каталоги, которые не деплоятся (старые приложения, черновики), перечисляются
// в .guardignore — по одному пути на строку. Так исключения видны в репозитории,
// а не спрятаны в коде проверки.
let IGNORE = [];
try {
  IGNORE = readFileSync(join(ROOT, '.guardignore'), 'utf8')
    .split(String.fromCharCode(10))
    .map((x) => x.trim())
    .filter((x) => x && !x.startsWith('#'));
} catch { /* файла нет — исключений нет */ }

const files = walk(ROOT).filter((f) => {
  const rel = relative(ROOT, f).split(String.fromCharCode(92)).join('/');
  return !IGNORE.some((p) => {
    const base = p.endsWith('/') ? p.slice(0, -1) : p;
    return rel === base || rel.startsWith(base + '/');
  });
});

const problems = [];

// ── 1. секреты
for (const f of files) {
  const rel = relative(ROOT, f);
  if (rel.startsWith('scripts' + (process.platform === 'win32' ? '\\' : '/'))) continue; // сам страж содержит образцы
  let text;
  try { text = readFileSync(f, 'utf8'); } catch { continue; }
  for (const [re, label] of SECRETS) {
    const m = re.exec(text);
    // Маски в конфигах и подстановки CI (${{ … }}) секретами не являются.
    if (m && !/[*<>%]|\$\{/.test(m[0])) {
      problems.push(`СЕКРЕТ · ${label} · ${rel} · «${m[0].slice(0, 24)}…»`);
    }
  }
}

// ── 2. публичные роуты без лимита
const routes = files.filter((f) => /[\\/]api[\\/].*route\.ts$/.test(f));
for (const f of routes) {
  const rel = relative(ROOT, f).replace(/\\/g, '/');
  if (EXEMPT.some((re) => re.test('/' + rel))) continue;
  const text = readFileSync(f, 'utf8');
  // relayAuth/proxy — запрос уходит на центр, где лимит и применяется,
  // поэтому такой роут считается защищённым.
  const guarded = /dbRateLimit|limitAuth|rateLimit|allowRequest|status:\s*429|relayAuth|proxyChatToCentral/.test(text);
  if (!guarded) problems.push(`БЕЗ ЛИМИТА · ${rel} — публичный роут без ограничения частоты`);
}

if (problems.length) {
  console.error('\n❌ Страж нашёл проблемы:\n');
  for (const p of problems) console.error('  · ' + p);
  console.error('\nЛибо исправьте, либо (для служебных роутов) добавьте путь в EXEMPT в scripts/guard.mjs\n');
  process.exit(1);
}
console.log('✅ Страж: секретов в коде нет, все публичные роуты с ограничением частоты');
