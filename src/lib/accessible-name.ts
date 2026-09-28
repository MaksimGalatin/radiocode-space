/**
 * Есть ли у элемента доступное имя — упрощённый алгоритм W3C accname 1.2 для
 * статического HTML (без расчёта CSS).
 *
 * ПОЧЕМУ ОТДЕЛЬНЫЙ ФАЙЛ (28.09.2026). Сканер считал кнопку безымянной, если у неё
 * нет aria-label и видимого текста, и не видел aria-labelledby, title, alt картинки
 * и aria-label у вложенного <svg>. Замер Antigravity на w3.org/WAI: 2 срабатывания
 * из 2 ложные — в обоих иконка <svg aria-label="…"> внутри ссылки и кнопки. У ссылок
 * была и обратная ошибка: картинка с alt="" засчитывалась именем, хотя пустой alt
 * имени не даёт. Функция одна на все проверки, чтобы правило не расходилось между
 * сканером на четырёх сайтах, двенадцатью правилами v2 и патчем.
 *
 * Порядок источников — как в accname: aria-labelledby → aria-label → содержимое
 * (текст, alt картинок, имя вложенных svg) → title. Помеченное aria-hidden="true"
 * имени не даёт. Файл одинаковый на всех четырёх сайтах — правится везде сразу.
 */
import type { CheerioAPI } from 'cheerio';
import type { AnyNode } from 'domhandler';

const непусто = (s: string | undefined | null): boolean => !!s && s.replace(/\s+/g, ' ').trim().length > 0;

export function имеетДоступноеИмя($: CheerioAPI, el: AnyNode): boolean {
  const $el = $(el);

  // 1. aria-labelledby: имя берётся у элементов, на которые указывают id
  const labelledby = ($el.attr('aria-labelledby') || '').trim();
  if (labelledby) {
    for (const id of labelledby.split(/\s+/)) {
      const цель = $(`[id="${id.replace(/["\\]/g, '')}"]`);
      if (цель.length && (непусто(цель.text()) || непусто(цель.attr('aria-label')))) return true;
    }
  }

  // 2. aria-label на самом элементе
  if (непусто($el.attr('aria-label'))) return true;

  // 3. Содержимое, без скрытого от вспомогательных технологий
  const копия = $el.clone();
  копия.find('[aria-hidden="true"], script, style, template').remove();
  if (непусто(копия.text())) return true; // сюда входит и <title> внутри <svg>
  if (копия.find('img[alt], area[alt], input[type="image"][alt]').toArray().some((i) => непусто($(i).attr('alt')))) return true;
  if (копия.find('svg[aria-label], [role="img"][aria-label]').toArray().some((s) => непусто($(s).attr('aria-label')))) return true;

  // 4. Поля-кнопки: картинка-кнопка и кнопка с value
  if ($el.is('input[type="image"]') && непусто($el.attr('alt'))) return true;
  if ($el.is('input[type="submit"], input[type="reset"], input[type="button"]') && непусто($el.attr('value'))) return true;

  // 5. title — последний источник имени
  if (непусто($el.attr('title'))) return true;

  return false;
}
