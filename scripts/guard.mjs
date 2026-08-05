/**
 * Страж перед выкладкой. Три проверки, все про безопасность под трафиком:
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
 *  3. Замок зависимостей: один менеджер и контрольная сумма у каждого пакета.
 *     Без сумм установка ставит что дадут, не сверяя ничего.
 *
 * Запуск: node scripts/guard.mjs      (код возврата 1 = есть находки)
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
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

// ── 3. замок зависимостей
//
// 🔴 ЧТО СЛУЧИЛОСЬ ОДИН РАЗ И НЕ ДОЛЖНО ПОВТОРИТЬСЯ. Проектом управляли два
// менеджера пакетов сразу: `bun.lock` остался от первоначального переноса, а
// `package-lock.json` вёлся дальше. Замок при этом сняли с уже разложенного
// bun-деревом `node_modules`, и в 1311 записях из 1470 не оказалось ни адреса
// скачивания, ни контрольной суммы.
//
// Контрольная сумма — единственное, что отличает «мы поставили тот самый
// пакет» от «мы поставили то, что нам отдали». Без неё подменённый на зеркале
// или перехваченный архив проходит как родной, и заметить это нечем.
//
// Проверка держит два правила:
//   • замок ровно один. Два менеджера неизбежно разъезжаются, и собирается
//     сайт по одному из них — обычно не по тому, который правили;
//   • у каждого пакета есть сумма и адрес. Исключение — пакеты, вшитые внутрь
//     архива родителя (`inBundle`): у них нет отдельного архива, и целостность
//     покрывает сумма родителя.
{
  const ЧУЖИЕ = ['bun.lock', 'bun.lockb', 'yarn.lock', 'pnpm-lock.yaml'];
  for (const имя of ЧУЖИЕ) {
    if (existsSync(join(ROOT, имя))) {
      problems.push(`ДВА МЕНЕДЖЕРА · ${имя} рядом с package-lock.json — замки разъедутся, `
        + 'и собираться будет не тот, который правили');
    }
  }
  const путьЗамка = join(ROOT, 'package-lock.json');
  if (!existsSync(путьЗамка)) {
    problems.push('НЕТ ЗАМКА · package-lock.json отсутствует — установка ничем не закреплена');
  } else {
    let замок;
    try { замок = JSON.parse(readFileSync(путьЗамка, 'utf8')); } catch (e) {
      problems.push(`ЗАМОК НЕ ЧИТАЕТСЯ · package-lock.json · ${String(e).slice(0, 60)}`);
    }
    if (замок) {
      const пакеты = замок.packages || {};
      const безСуммы = [];
      for (const [путь, зап] of Object.entries(пакеты)) {
        if (!путь) continue;                     // сам проект
        if (зап.link || зап.inBundle) continue;  // рабочая область / вшит в родителя
        if (!зап.integrity || !зап.resolved) безСуммы.push(путь);
      }
      if (безСуммы.length) {
        problems.push(`ЗАМОК БЕЗ СУММ · ${безСуммы.length} пакетов без контрольной суммы `
          + `(например ${безСуммы.slice(0, 3).join(', ')}) — установка ничего не сверяет. `
          + 'Пересоберите замок: удалите package-lock.json и выполните '
          + 'npm install --package-lock-only');
      }
    }
  }
}

if (problems.length) {
  console.error('\n❌ Страж нашёл проблемы:\n');
  for (const p of problems) console.error('  · ' + p);
  console.error('\nЛибо исправьте, либо (для служебных роутов) добавьте путь в EXEMPT в scripts/guard.mjs\n');
  process.exit(1);
}
console.log('✅ Страж: секретов в коде нет, все публичные роуты с ограничением частоты, '
  + 'замок один и у каждого пакета есть контрольная сумма');
