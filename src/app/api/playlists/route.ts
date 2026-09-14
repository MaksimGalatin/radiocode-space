import { NextRequest, NextResponse } from 'next/server';
import { сессияДействительна } from '@/lib/user-auth';
import { dbRateLimit, clientIp } from '@/lib/rate-limit-db';

export const dynamic = 'force-dynamic';

/**
 * МОИ ПЛЕЙЛИСТЫ — собственные подборки слушателя.
 *
 * Поручение Архитектора 14.09.2026: «на сайте radiocode.space нужно у треков
 * добавить кнопку Сохранить в плейлист и сделать у зарегистрированных
 * пользователей опцию Мои Плейлисты».
 *
 * ПОЧЕМУ ТОЛЬКО ДЛЯ ВОШЕДШИХ, в отличие от лайков. Лайк живёт и у гостя —
 * он привязывается к устройству (`dev:<id>`), и потеря такого лайка ничего
 * не стоит: это голос в общем счёте. Плейлист — личная вещь человека, он
 * собирает его руками и рассчитывает найти на любом устройстве. Привязка к
 * устройству здесь была бы обманом: человек соберёт подборку на телефоне и
 * не увидит её на компьютере. Поэтому нужен вход — как и просил Архитектор.
 *
 * ДВЕ ТАБЛИЦЫ, А НЕ ОДНА. Отдельно сам плейлист (имя, владелец) и отдельно
 * его треки. Иначе переименование подборки означало бы правку всех строк, а
 * пустой плейлист нельзя было бы создать вовсе.
 *
 * Порядок треков хранится явным числом `позиция`, а не порядком вставки:
 * человек вправе переставлять их, и «как легло в базу» тут не годится.
 */

async function pool() {
  const url = process.env.SUBMISSIONS_DB_URL;
  if (!url) return null;
  const { Pool } = await import('@neondatabase/serverless');
  return new Pool({ connectionString: url });
}

async function создатьТаблицы(p: { query: (s: string, v?: unknown[]) => Promise<unknown> }) {
  await p.query(`CREATE TABLE IF NOT EXISTS playlists (
    id         SERIAL PRIMARY KEY,
    owner      TEXT NOT NULL,
    name       TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  )`);
  await p.query(`CREATE INDEX IF NOT EXISTS playlists_owner_idx ON playlists(owner)`);
  await p.query(`CREATE TABLE IF NOT EXISTS playlist_tracks (
    id          SERIAL PRIMARY KEY,
    playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    track_id    TEXT NOT NULL,
    позиция     INTEGER NOT NULL DEFAULT 0,
    added_at    TIMESTAMPTZ DEFAULT now(),
    UNIQUE(playlist_id, track_id)
  )`);
  await p.query(`CREATE INDEX IF NOT EXISTS playlist_tracks_pl_idx ON playlist_tracks(playlist_id)`);
}

/** Имя по умолчанию для первой подборки — на языке страницы. */
function имяПоУмолчанию(язык: string): string {
  const имена: Record<string, string> = {
    ru: 'Моя подборка',
    en: 'My playlist',
    es: 'Mi lista',
    zh: '我的歌单',
  };
  return имена[язык] || имена.en;
}

/**
 * КТО ПЕРЕД НАМИ: своя сессия ИЛИ опознанный человек от сестринского сайта.
 *
 * ЗАЧЕМ. Кабинет у нас ЕДИНЫЙ на четыре сайта (раздел 34), а подборки живут
 * только здесь — музыка есть только на радио. Значит кабинет на центральном,
 * aifa.works или aifa.digital обязан уметь показать человеку его же
 * подборки, а для этого сайт-сестра должен передать сюда, кто именно пришёл.
 *
 * Тот же механизм и та же защита, что в чате: почта из тела или запроса
 * принимается ТОЛЬКО вместе с верным `x-aifa-internal`, сравнение постоянное
 * по времени. Без секрета поведение прежнее — только своя cookie, чужую
 * почту подставить нельзя.
 *
 * ЧЕМ ОПЛАЧЕНО. 14.09.2026 проверка плейлистов с боевого вернула 401 на
 * каждый запрос: ручка знала только cookie, и убедиться, что подборки вообще
 * работают, было нечем. Ровно та же слепота, из-за которой три сайта не
 * могли сказать центру, кто пришёл, и человек упирался в чужой лимит.
 */
async function ктоПришёл(req: NextRequest, изТела?: string): Promise<string> {
  const своя = await сессияДействительна(req);
  if (своя) return своя;
  try {
    const crypto = await import('crypto');
    const секрет = process.env.AIFA_INTERNAL_SECRET || '';
    const пришло = req.headers.get('x-aifa-internal') || '';
    if (!секрет || !пришло) return '';
    const a = Buffer.from(пришло, 'utf8'), b = Buffer.from(секрет, 'utf8');
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return '';
    const почта = (изТела || req.nextUrl.searchParams.get('userEmail') || '').trim();
    if (почта) {
      console.warn('[playlists] личность принята по внутреннему релею сестринского сайта');
      return почта.toLowerCase();
    }
  } catch (e) {
    console.error('[playlists] релей не сработал:', String(e).slice(0, 160));
  }
  return '';
}

// ── GET: список плейлистов вошедшего, с треками ─────────────────────────────
export async function GET(req: NextRequest) {
  const почта = await ктоПришёл(req);
  if (!почта) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const p = await pool();
  if (!p) return NextResponse.json({ error: 'no_db' }, { status: 500 });
  try {
    await создатьТаблицы(p as never);
    const списки = await p.query(
      `SELECT id, name, created_at FROM playlists WHERE owner=$1 ORDER BY created_at`,
      [почта],
    );
    // Тип задан явно: пустой массив без него выводится как `never[]`, и
    // первая же вставка ломает сборку.
    const итог: Array<{ id: number; name: string; created_at: string; tracks: string[] }> = [];
    for (const с of списки.rows) {
      const треки = await p.query(
        `SELECT track_id, позиция FROM playlist_tracks WHERE playlist_id=$1
          ORDER BY позиция, added_at`,
        [с.id],
      );
      итог.push({
        id: с.id,
        name: с.name,
        created_at: с.created_at,
        tracks: треки.rows.map((т: { track_id: string }) => т.track_id),
      });
    }
    await p.end();
    return NextResponse.json({ ok: true, playlists: итог });
  } catch (e) {
    try { await p.end(); } catch { /* соединение уже закрыто */ }
    console.error('[playlists] GET:', String(e).slice(0, 200));
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}

// ── POST: добавить трек, создать/переименовать/удалить подборку ─────────────
export async function POST(req: NextRequest) {
  // Ограничение частоты — как у лайков: без него подборками можно засыпать
  // базу. Счёт в базе, а не в памяти: у каждого экземпляра сайта своя память.
  const адрес = clientIp(req as never);
  if (адрес !== 'unknown' && !(await dbRateLimit(`playlists:${адрес}`, 60, 60000))) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  // Тело читается ДО опознания: при внутреннем релее почта приходит именно
  // в нём, а раньше объявления переменную не взять.
  let тело: Record<string, unknown> = {};
  try { тело = await req.json(); } catch { /* пустое тело — ниже отказ */ }

  const почта = await ктоПришёл(req, (тело as { userEmail?: string })?.userEmail);
  if (!почта) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const действие = String(тело.action || 'add').trim();
  const p = await pool();
  if (!p) return NextResponse.json({ error: 'no_db' }, { status: 500 });

  try {
    await создатьТаблицы(p as never);

    // ── добавить трек в подборку ────────────────────────────────────────────
    if (действие === 'add') {
      const трек = String(тело.trackId || '').trim().slice(0, 120);
      if (!трек) return NextResponse.json({ error: 'bad_request' }, { status: 400 });

      let списокId = Number(тело.playlistId || 0);
      if (!списокId) {
        // Первая подборка заводится сама — человек нажал «в плейлист», а не
        // «создать плейлист». Заставлять его сперва придумывать имя значит
        // терять то самое движение, ради которого кнопка и ставилась.
        const свои = await p.query(
          `SELECT id FROM playlists WHERE owner=$1 ORDER BY created_at LIMIT 1`, [почта]);
        if (свои.rows.length) {
          списокId = свои.rows[0].id;
        } else {
          const язык = String(тело.locale || 'ru');
          const новый = await p.query(
            `INSERT INTO playlists(owner, name) VALUES($1,$2) RETURNING id`,
            [почта, имяПоУмолчанию(язык)]);
          списокId = новый.rows[0].id;
        }
      } else {
        // Чужую подборку тронуть нельзя: проверяем владельца, а не доверяем
        // присланному номеру.
        const свой = await p.query(
          `SELECT id FROM playlists WHERE id=$1 AND owner=$2`, [списокId, почта]);
        if (!свой.rows.length) {
          await p.end();
          return NextResponse.json({ error: 'not_found' }, { status: 404 });
        }
      }

      const хвост = await p.query(
        `SELECT COALESCE(MAX(позиция), 0) + 1 AS n FROM playlist_tracks WHERE playlist_id=$1`,
        [списокId]);
      await p.query(
        `INSERT INTO playlist_tracks(playlist_id, track_id, позиция) VALUES($1,$2,$3)
           ON CONFLICT (playlist_id, track_id) DO NOTHING`,
        [списокId, трек, хвост.rows[0]?.n || 1]);
      await p.query(`UPDATE playlists SET updated_at=now() WHERE id=$1`, [списокId]);
      const сколько = await p.query(
        `SELECT COUNT(*)::int AS n FROM playlist_tracks WHERE playlist_id=$1`, [списокId]);
      await p.end();
      return NextResponse.json({ ok: true, playlistId: списокId, count: сколько.rows[0]?.n || 0 });
    }

    // ── убрать трек из подборки ─────────────────────────────────────────────
    if (действие === 'remove') {
      const трек = String(тело.trackId || '').trim().slice(0, 120);
      const списокId = Number(тело.playlistId || 0);
      if (!трек || !списокId) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
      const свой = await p.query(
        `SELECT id FROM playlists WHERE id=$1 AND owner=$2`, [списокId, почта]);
      if (!свой.rows.length) { await p.end(); return NextResponse.json({ error: 'not_found' }, { status: 404 }); }
      await p.query(`DELETE FROM playlist_tracks WHERE playlist_id=$1 AND track_id=$2`, [списокId, трек]);
      await p.end();
      return NextResponse.json({ ok: true });
    }

    // ── создать подборку с именем ───────────────────────────────────────────
    if (действие === 'create') {
      const имя = String(тело.name || '').trim().slice(0, 80) || имяПоУмолчанию(String(тело.locale || 'ru'));
      const новый = await p.query(
        `INSERT INTO playlists(owner, name) VALUES($1,$2) RETURNING id, name`, [почта, имя]);
      await p.end();
      return NextResponse.json({ ok: true, playlist: новый.rows[0] });
    }

    // ── переименовать ───────────────────────────────────────────────────────
    if (действие === 'rename') {
      const списокId = Number(тело.playlistId || 0);
      const имя = String(тело.name || '').trim().slice(0, 80);
      if (!списокId || !имя) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
      const r = await p.query(
        `UPDATE playlists SET name=$1, updated_at=now() WHERE id=$2 AND owner=$3 RETURNING id`,
        [имя, списокId, почта]);
      await p.end();
      if (!r.rows.length) return NextResponse.json({ error: 'not_found' }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    // ── удалить подборку целиком ────────────────────────────────────────────
    if (действие === 'delete') {
      const списокId = Number(тело.playlistId || 0);
      if (!списокId) return NextResponse.json({ error: 'bad_request' }, { status: 400 });
      const r = await p.query(
        `DELETE FROM playlists WHERE id=$1 AND owner=$2 RETURNING id`, [списокId, почта]);
      await p.end();
      if (!r.rows.length) return NextResponse.json({ error: 'not_found' }, { status: 404 });
      return NextResponse.json({ ok: true });
    }

    await p.end();
    return NextResponse.json({ error: 'unknown_action' }, { status: 400 });
  } catch (e) {
    try { await p.end(); } catch { /* соединение уже закрыто */ }
    console.error('[playlists] POST:', String(e).slice(0, 200));
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }
}
