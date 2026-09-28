// Проверка accessible-name.ts на примерах (28.09.2026). Запуск из корня сайта:
//   node src/lib/accessible-name.проверка.mjs
// Переводит .ts в JS средствами typescript из node_modules, без сборки проекта.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import * as cheerio from 'cheerio';

const здесь = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const ts = require('typescript');
const исходник = fs.readFileSync(path.join(здесь, 'accessible-name.ts'), 'utf8');
const js = ts.transpileModule(исходник, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const врем = path.join(здесь, '.accessible-name.проверка.tmp.mjs');
fs.writeFileSync(врем, js);
const { имеетДоступноеИмя } = await import(pathToFileURL(врем).href);
fs.unlinkSync(врем);

const случаи = [
  ['ссылка с <svg role=img aria-label> (w3.org, было ложное)', '<a href="/"><svg role="img" aria-label="W3C"></svg></a>', 'a', true],
  ['кнопка с <svg aria-label> в <span> (w3.org, было ложное)', '<button><span><svg focusable="false" aria-label="Submit Search"><use></use></svg></span></button>', 'button', true],
  ['пустая кнопка', '<button></button>', 'button', false],
  ['кнопка с иконкой aria-hidden и aria-label', '<button><svg aria-hidden="true" aria-label="x"></svg></button>', 'button', false],
  ['ссылка с картинкой alt="" (было ложно «есть имя»)', '<a href="/"><img src="x.png" alt=""></a>', 'a', false],
  ['ссылка с картинкой alt="Home"', '<a href="/"><img src="x.png" alt="Home"></a>', 'a', true],
  ['кнопка с aria-labelledby на текст', '<div><button aria-labelledby="l1"></button><span id="l1">Close</span></div>', 'button', true],
  ['кнопка с aria-labelledby на пустой id', '<div><button aria-labelledby="nope"></button></div>', 'button', false],
  ['кнопка с title', '<button title="Close"></button>', 'button', true],
  ['ссылка с <svg><title>', '<a href="/"><svg><title>Search</title></svg></a>', 'a', true],
  ['кнопка с пробельным aria-label', '<button aria-label="   "></button>', 'button', false],
  ['кнопка только со скрытым текстом', '<button><span aria-hidden="true">×</span></button>', 'button', false],
  ['обычная ссылка с текстом', '<a href="/">Read</a>', 'a', true],
  ['role=button с aria-label', '<div role="button" aria-label="Menu"></div>', '[role="button"]', true],
];

let ок = 0;
for (const [имя, html, sel, ждём] of случаи) {
  const $ = cheerio.load(html);
  const получено = имеетДоступноеИмя($, $(sel).get(0));
  const верно = получено === ждём;
  if (верно) ок++;
  console.log(`${верно ? '✅' : '❌'} ${имя}: ждали ${ждём}, получено ${получено}`);
}
console.log(`\nИТОГ: ${ок} из ${случаи.length}`);
process.exit(ок === случаи.length ? 0 : 1);
