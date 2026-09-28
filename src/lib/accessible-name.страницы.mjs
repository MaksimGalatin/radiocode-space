// Вторая проверка accessible-name.ts (28.09.2026) — на НАСТОЯЩИХ страницах, а не на примерах:
// считает «кнопки без имени» и «ссылки без имени» старым условием сканера и новым.
// Запуск из корня сайта: node src/lib/accessible-name.страницы.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import * as cheerio from 'cheerio';

const здесь = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const ts = require('typescript');
const js = ts.transpileModule(fs.readFileSync(path.join(здесь, 'accessible-name.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const врем = path.join(здесь, '.accessible-name.страницы.tmp.mjs');
fs.writeFileSync(врем, js);
const { имеетДоступноеИмя } = await import(pathToFileURL(врем).href);
fs.unlinkSync(врем);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';
const СТРАНИЦЫ = [
  'https://www.gov.uk/',
  'https://www.a11yproject.com/',
  'https://web.archive.org/web/20230601000000id_/https://www.w3.org/WAI/',
  'https://web.archive.org/web/20230601000000id_/https://www.w3.org/WAI/demos/bad/before/home.html',
  'https://web.archive.org/web/20230601000000id_/https://www.w3.org/WAI/demos/bad/after/home.html',
  'https://github.com/',
];

for (const адрес of СТРАНИЦЫ) {
  let html;
  try {
    const r = await fetch(адрес, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
    if (!r.ok) { console.log(`— ${адрес}: HTTP ${r.status}`); continue; }
    html = await r.text();
  } catch (e) { console.log(`— ${адрес}: ${e.message}`); continue; }
  const $ = cheerio.load(html);
  let кнСтар = 0, кнНов = 0, ссСтар = 0, ссНов = 0;
  const примеры = [];
  $('button, [role="button"]').each((_, el) => {
    const стар = !$(el).attr('aria-label') && !$(el).text().trim();
    const нов = !имеетДоступноеИмя($, el);
    if (стар) кнСтар++; if (нов) кнНов++;
    if (стар !== нов && примеры.length < 3) примеры.push(`кнопка ${стар ? 'была' : 'стала'} «без имени»: ${$.html(el).slice(0, 140).replace(/\s+/g, ' ')}`);
  });
  $('a').each((_, el) => {
    const text = $(el).text().trim();
    const стар = !$(el).attr('aria-label') && !text && !$(el).find('img[alt]').length;
    const нов = $(el).attr('href') !== undefined && !имеетДоступноеИмя($, el);
    if (стар) ссСтар++; if (нов) ссНов++;
    if (стар !== нов && примеры.length < 6) примеры.push(`ссылка ${стар ? 'была' : 'стала'} «без имени»: ${$.html(el).slice(0, 140).replace(/\s+/g, ' ')}`);
  });
  console.log(`■ ${адрес.replace('https://web.archive.org/web/20230601000000id_/', 'архив:')}\n  кнопок без имени: было ${кнСтар} → стало ${кнНов};  ссылок без имени: было ${ссСтар} → стало ${ссНов}`);
  for (const п of примеры) console.log('    · ' + п);
}
