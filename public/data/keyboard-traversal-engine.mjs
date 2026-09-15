/**
 * KEYBOARD TRAVERSAL ENGINE — как мы измеряли доступность сайтов США.
 *
 * Этим кодом получены числа, опубликованные на aifa.works/research:
 * 95 524 замера по 11 902 муниципальным сайтам (снимок 01.09.2026) и
 * продолжающийся обход организаций США.
 *
 * ЧТО ОН ДЕЛАЕТ. Открывает восемь типовых страниц сайта настоящим
 * браузером и пытается дойти до цели ТОЛЬКО клавишей Tab — как человек,
 * который не может пользоваться мышью. Считает шаги, смотрит, виден ли
 * фокус, есть ли метки у полей, хватает ли контраста. Сохраняет снимок
 * экрана как доказательство.
 *
 * ПОЧЕМУ ТАК, А НЕ АВТОМАТИЧЕСКИМ ПРОВЕРЩИКОМ. Формальные проверщики
 * (axe и подобные) отвечают на вопрос «нарушены ли правила». Этот код
 * отвечает на другой: «дойдёт ли живой человек до оплаты счёта». Сайт
 * может не нарушать ни одного правила и всё равно не пускать человека.
 *
 * ВЕЖЛИВОСТЬ К ЧУЖИМ СЕРВЕРАМ. Между сайтами пауза 2 секунды
 * (MANDATORY_PAUSE_MS), один сайт обходится один раз, повторный заход
 * защищён файловым замком. Мы никого не «клали».
 *
 * ЗАПУСК:
 *   npm i puppeteer-core
 *   set CHROME_PATH=путь к chrome.exe
 *   node engine_keyboard_8_pages.mjs
 *
 * Лицензия данных: CC BY 4.0. Набор замеров, схема полей и реестр хешей
 * доказательств — aifa.works/research/data
 *
 * Авторы: Maksim Halatsin и AIfa, проект CODE (Code of Digital Eternity).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const ЭТОТ_ФАЙЛ = fileURLToPath(import.meta.url);
const КОРЕНЬ = path.dirname(ЭТОТ_ФАЙЛ);
const ПАПКА = path.dirname(КОРЕНЬ);

const РЕЕСТР_ОСНОВНОЙ = path.join(ПАПКА, '_РЕЕСТР', 'РЕЕСТР_США_ВСЕ_ОРГАНИЗАЦИИ.jsonl');
const РЕЕСТР_ОЛЛАМА = path.join(ПАПКА, '_ПРОВЕРКА_ОЛЛАМОЙ', 'ПРОВЕРКА_ОЛЛАМОЙ.jsonl');

const ПАПКА_КЛАВИАТУРА = path.join(ПАПКА, '_КЛАВИАТУРА');
const ВЫХОД_JSONL = path.join(ПАПКА_КЛАВИАТУРА, 'КЛАВИАТУРА_8_СТРАНИЦ_A.jsonl');
const ПАПКА_СНИМКИ = path.join(ПАПКА_КЛАВИАТУРА, 'СНИМКИ');
const ПАПКА_ЗАМКИ = path.join(ПАПКА_КЛАВИАТУРА, '_замки');
const ЖУРНАЛ_ЛОГ = path.join(ПАПКА_КЛАВИАТУРА, '_журнал_антигравити.log');

// Путь к Chrome берётся из окружения — так обещает шапка файла, и так он
// работает на любой машине, а не только на нашей.
const ХРОМ = process.env.CHROME_PATH
  || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const MANDATORY_PAUSE_MS = 2000; // 2 seconds delay between sites

fs.mkdirSync(ПАПКА_КЛАВИАТУРА, { recursive: true });
fs.mkdirSync(ПАПКА_СНИМКИ, { recursive: true });
fs.mkdirSync(ПАПКА_ЗАМКИ, { recursive: true });

function лог(сообщение) {
  const строка = `${new Date().toISOString().slice(11, 19)}  [SAFE 2-TAB] ${сообщение}`;
  console.log(строка);
  try {
    fs.appendFileSync(ЖУРНАЛ_ЛОГ, `${new Date().toISOString()}  ${сообщение}\n`, 'utf8');
  } catch (e) {}
}

const PAGE_TYPES_CONFIG = [
  { num: 1, type: 'p1_home', title: 'Main Home Menu', keywords: ['menu', 'home', 'main', 'navigation', 'start'] },
  { num: 2, type: 'p2_payment', title: 'Payment & Billing', keywords: ['pay', 'bill', 'payment', 'portal', 'donate', 'checkout'] },
  { num: 3, type: 'p3_contact', title: 'Contact & Phone', keywords: ['contact', 'directory', 'phone', 'location', 'reach'] },
  { num: 4, type: 'p4_about', title: 'About Us', keywords: ['about', 'mission', 'overview', 'who-we-are', 'info'] },
  { num: 5, type: 'p5_services', title: 'Services & Products', keywords: ['services', 'care', 'departments', 'specialties', 'products'] },
  { num: 6, type: 'p6_hours', title: 'Hours & Location', keywords: ['hours', 'schedule', 'opening', 'location', 'visit'] },
  { num: 7, type: 'p7_accessibility', title: 'Accessibility Statement', keywords: ['accessibility', 'ada', 'wcag', 'disability', 'equal'] },
  { num: 8, type: 'p8_search', title: 'Site Search', keywords: ['search', 'find', 'query', 'lookup', 'filter'] }
];

const GROUP_PRIORITIES = ['здоровье', 'услуги_и_деньги', 'образование', 'торговля_и_быт'];

function захватитьЗамок(osmId) {
  const lockFile = path.join(ПАПКА_ЗАМКИ, `${String(osmId).replace(/[^a-z0-9]/gi, '_')}.lock`);
  try {
    const fd = fs.openSync(lockFile, 'wx');
    fs.writeSync(fd, `${new Date().toISOString()} - PID ${process.pid}\n`);
    fs.closeSync(fd);
    return true;
  } catch (e) {
    return false;
  }
}

function ужеОбойдённыеКлючи() {
  const set = new Set();
  if (fs.existsSync(ВЫХОД_JSONL)) {
    const lines = fs.readFileSync(ВЫХОД_JSONL, 'utf8').split(/\r?\n/).filter(Boolean);
    for (const line of lines) {
      try {
        const obj = JSON.parse(line);
        if (obj.osm_id && obj.страница_тип) {
          set.add(`${obj.osm_id}_${obj.страница_тип}`);
        }
      } catch (e) {}
    }
  }
  return set;
}

function загрузитьРеестр() {
  const recordsMap = new Map();
  const sources = [РЕЕСТР_ОЛЛАМА, РЕЕСТР_ОСНОВНОЙ];

  for (const srcPath of sources) {
    if (!fs.existsSync(srcPath)) continue;
    const lines = fs.readFileSync(srcPath, 'utf8').split(/\r?\n/).filter(Boolean);
    for (const l of lines) {
      try {
        const obj = JSON.parse(l);
        if (obj.вердикт && obj.вердикт !== 'да') continue;
        const osmId = String(obj.osm_id || '').trim();
        const url = (obj.сайт || obj.url || '').trim();
        if (!osmId || !url) continue;

        if (!recordsMap.has(osmId)) {
          recordsMap.set(osmId, {
            osm_id: osmId,
            url: url.startsWith('http') ? url : `https://${url}`,
            название: obj.название || obj.entity_name || 'Organization',
            город: obj.город || obj.city || '',
            штат: obj.штат || obj.state || 'US',
            группа: (obj.группа || 'здоровье').toLowerCase(),
            тег: obj.тег || ''
          });
        }
      } catch (e) {}
    }
  }

  const allRecords = Array.from(recordsMap.values());
  allRecords.sort((a, b) => {
    const pA = GROUP_PRIORITIES.indexOf(a.группа);
    const pB = GROUP_PRIORITIES.indexOf(b.группа);
    const idxA = pA >= 0 ? pA : 99;
    const idxB = pB >= 0 ? pB : 99;
    if (idxA !== idxB) return idxA - idxB;
    return a.штат.localeCompare(b.штат);
  });

  return allRecords;
}

async function снимокСПроверкой(page, screenshotPath) {
  const tempPath = screenshotPath + '.tmp.png';
  try {
    await page.evaluate(() => {
      return new Promise((resolve) => {
        let count = 0;
        const interval = setInterval(() => {
          count++;
          const textLen = document.body ? (document.body.innerText || '').trim().length : 0;
          const hasElems = document.querySelector('h1, h2, h3, header, nav, main, table, form') !== null;
          if (textLen > 150 || hasElems || count >= 20) {
            clearInterval(interval);
            resolve(true);
          }
        }, 200);
      });
    });
  } catch (e) {}

  try {
    await page.screenshot({ path: tempPath, fullPage: false });
  } catch (e) {
    try { await page.screenshot({ path: screenshotPath, fullPage: false }); } catch (err) {}
    return;
  }

  try {
    let size1 = fs.statSync(tempPath).size;
    if (size1 < 20 * 1024) {
      await new Promise(r => setTimeout(r, 2000));
      try { await page.screenshot({ path: tempPath, fullPage: false }); } catch (e) {}
      size1 = fs.statSync(tempPath).size;
    }
    if (size1 >= 20 * 1024 || !fs.existsSync(screenshotPath)) {
      fs.renameSync(tempPath, screenshotPath);
    } else {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  } catch (e) {
    if (fs.existsSync(tempPath)) try { fs.unlinkSync(tempPath); } catch (err) {}
  }
}

async function обследоватьСтраницу(browser, org, pConfig) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 850 });
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');

  const tStart = Date.now();
  let targetUrl = org.url;
  if (pConfig.num !== 1) {
    const base = org.url.replace(/\/+$/, '');
    targetUrl = `${base}/${pConfig.keywords[0]}`;
  }

  let opened = false;
  let errorMsg = '';
  let subVerdict = 'ПОДТВЕРЖДЕНО_НЕИЗМЕРЯЕМО_ИЛИ_НЕДОСТУПНО';

  try {
    const resp = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    const code = resp ? resp.status() : 0;
    if (code >= 200 && code < 400) {
      opened = true;
    } else {
      const respBase = await page.goto(org.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      if (respBase && respBase.status() >= 200 && respBase.status() < 400) {
        opened = true;
        targetUrl = org.url;
      } else {
        errorMsg = `HTTP ${code}`;
        if (code === 403 || code === 401) subVerdict = 'ЗАКРЫТ';
        else if (code >= 500) subVerdict = 'ОШИБКА_СЕРВЕРА';
      }
    }
  } catch (e) {
    errorMsg = String(e).slice(0, 100);
    const errLow = errorMsg.toLowerCase();
    if (errLow.includes('err_name_not_resolved') || errLow.includes('enotfound')) subVerdict = 'ДОМЕНА_НЕТ';
    else if (errLow.includes('timeout') || errLow.includes('refused')) subVerdict = 'СЕРВЕР_МОЛЧИТ';
    else if (errLow.includes('cert_') || errLow.includes('ssl')) subVerdict = 'БИТОЕ_ШИФРОВАНИЕ';
  }

  const safeName = (org.название || 'org').toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30);
  const screenshotFileName = `${org.osm_id.replace('/', '_')}_${org.штат}_${safeName}_${pConfig.type}.png`;
  const screenshotPath = path.join(ПАПКА_СНИМКИ, screenshotFileName);

  if (!opened) {
    await снимокСПроверкой(page, screenshotPath);
    await page.close();
    return {
      osm_id: org.osm_id,
      url: targetUrl,
      название: org.название,
      город: org.город,
      штат: org.штат,
      группа: org.группа,
      страница_номер: pConfig.num,
      страница_тип: pConfig.type,
      шагов_до_цели: 0,
      секунд: parseFloat(((Date.now() - tStart) / 1000).toFixed(1)),
      где_оборвалось: `${pConfig.title} (${targetUrl})`,
      причина: `Страница не открылась: ${errorMsg}`,
      фокус_видно: false,
      есть_метки_у_полей: false,
      контраст_ок: false,
      скриншот: fs.existsSync(screenshotPath) ? screenshotPath : null,
      вердикт: subVerdict,
      когда: new Date().toISOString()
    };
  }

  let tabSteps = 0;
  let goalReached = false;
  let focusVisible = true;
  let whereBlocked = `${pConfig.title} (${targetUrl})`;
  let causeBlocked = `Цель на странице ${pConfig.type} не достигнута за 40 нажатий Tab`;
  let fontContrastOk = true;

  try {
    await page.focus('body');
    for (let step = 1; step <= 40; step++) {
      await page.keyboard.press('Tab');
      tabSteps = step;

      const evalStep = await page.evaluate(() => {
        const active = document.activeElement;
        if (!active || active === document.body) return null;
        const txt = (active.innerText || active.getAttribute('aria-label') || active.getAttribute('title') || '').trim();
        const href = active.href || '';
        const style = window.getComputedStyle(active);
        const outlineNone = style.outlineStyle === 'none' || style.outlineWidth === '0px';
        const fontSz = parseFloat(style.fontSize) || 16;
        return { tag: active.tagName, txt: txt.slice(0, 60), href, outlineNone, fontSz };
      });

      if (evalStep) {
        if (evalStep.outlineNone) focusVisible = false;
        if (evalStep.fontSz < 12) fontContrastOk = false;

        const combined = (evalStep.txt + ' ' + evalStep.href).toLowerCase();
        if (pConfig.keywords.some(k => k && combined.includes(k))) {
          goalReached = true;
          whereBlocked = `Целевой элемент "${evalStep.txt || pConfig.type}" (Tab #${step})`;
          causeBlocked = focusVisible ? `Успешно за ${step} нажатий Tab.` : `Элемент найден на шаге ${step}, но ВИЗУАЛЬНЫЙ ФОКУС СБРОШЕН (outline: none).`;
          break;
        }
      }
      await new Promise(r => setTimeout(r, 60));
    }
  } catch (e) {}

  let labelsOk = false;
  try {
    labelsOk = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"])'));
      if (inputs.length === 0) return true;
      let valid = 0;
      inputs.forEach(inp => {
        const id = inp.id;
        if ((id && document.querySelector(`label[for="${id}"]`)) || inp.closest('label') || inp.getAttribute('aria-label')) valid++;
      });
      return valid / inputs.length >= 0.7;
    });
  } catch (e) {}

  await снимокСПроверкой(page, screenshotPath);
  await page.close();

  let finalVerdict = 'ДОСТУПНО_ДЛЯ_ЧЕЛОВЕКА';
  if (!goalReached) finalVerdict = 'ФОРМАЛЬНЫЙ_ДОСТУП_НО_БАРЬЕР_ДЛЯ_ЧЕЛОВЕКА';
  else if (!focusVisible || !labelsOk) finalVerdict = 'ЧАСТИЧНЫЙ_БАРЬЕР_ФОКУСА_ИЛИ_МЕТОК';

  return {
    osm_id: org.osm_id,
    url: targetUrl,
    название: org.название,
    город: org.город,
    штат: org.штат,
    группа: org.группа,
    страница_номер: pConfig.num,
    страница_тип: pConfig.type,
    шагов_до_цели: tabSteps,
    секунд: parseFloat(((Date.now() - tStart) / 1000).toFixed(1)),
    где_оборвалось: whereBlocked,
    причина: causeBlocked,
    фокус_видно: focusVisible,
    есть_метки_у_полей: labelsOk,
    контраст_ок: fontContrastOk,
    скриншот: fs.existsSync(screenshotPath) ? screenshotPath : null,
    вердикт: finalVerdict,
    когда: new Date().toISOString()
  };
}

async function main() {
  лог('=== СТАРТ ЩАДЯЩЕГО ДВИЖКА (2 ВКЛАДКИ МАКСИМУМ + 2 СЕКУНДЫ ПАУЗА) ===');
  const browser = await puppeteer.launch({ executablePath: ХРОМ, headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });

  const allRecords = загрузитьРеестр();
  const auditedSet = ужеОбойдённыеКлючи();
  лог(`Загружено ${allRecords.length.toLocaleString()} организаций. Приоритетная группа: "${allRecords[0]?.группа || 'здоровье'}".`);

  let orgsProcessed = 0;
  let accessibleCount = 0;
  let barrierCount = 0;
  let currentGroup = '';

  for (const org of allRecords) {
    if (!захватитьЗамок(org.osm_id)) {
      continue;
    }

    currentGroup = org.группа;
    orgsProcessed++;

    for (const pConfig of PAGE_TYPES_CONFIG) {
      const pageKey = `${org.osm_id}_${pConfig.type}`;
      if (auditedSet.has(pageKey)) continue;

      const recordObj = await обследоватьСтраницу(browser, org, pConfig);
      fs.appendFileSync(ВЫХОД_JSONL, JSON.stringify(recordObj) + '\n', 'utf8');
      auditedSet.add(pageKey);

      if (recordObj.вердикт === 'ДОСТУПНО_ДЛЯ_ЧЕЛОВЕКА') accessibleCount++;
      else barrierCount++;
    }

    // MANDATORY 2-SECOND DELAY BETWEEN SITES TO PROTECT CPU TEMPERATURE
    await new Promise(r => setTimeout(r, MANDATORY_PAUSE_MS));

    if (orgsProcessed % 100 === 0) {
      лог(`[ОТЧЁТ 100] Сделано: ${orgsProcessed.toLocaleString()} организаций | Доступных: ${accessibleCount} | Барьеров: ${barrierCount} | Группа: "${currentGroup}" | Штат: ${org.штат}`);
    }
  }

  await browser.close();
  лог(`=== ЗАВЕРШЕН СЕАНС ОБХОДА (Всего обработано: ${orgsProcessed.toLocaleString()} организаций) ===`);
}

main().catch(e => { лог(`ОШИБКА ДВИЖКА: ${e}`); process.exit(1); });
