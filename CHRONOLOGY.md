# CHRONOLOGY — RadioCode.Space

Журнал изменений экосистемы CODE. Автор: Maksim Galatin <codeofdigitaleternity@gmail.com>.

## 2026-07-19 — v1 доводка до продакшена (наряд-задание Архитектора)

### Фаза 0 — Подготовка
- Создана бэкап-ветка `backup/pre-v1-hardening-20260719`.
- Baseline продакшена: TTFB ~0.54 с, HTML ~53 КБ, x-vercel-cache HIT; JS-чанки `/_next/static/chunks/*` (7) + 2 CSS.
- Созданы `CHRONOLOGY.md` и `walkthrough.md` (отсутствовали).
- Инструментарий замера битрейта: `ffprobe` в системе недоступен и запрещён к скачиванию бинарём → используется Python `mutagen` (Xing/VBR-заголовок из первых 256 КБ файла).

### Фаза 1.1 — Композиционно-осознанная ротация плейлиста (P0, главная задача)
- Новый модуль `src/lib/rotation.ts`:
  - `compositionIdFromPath()` — нормализует имя файла к id композиции (снимает числовой префикс, маркер `-opus-4-8`, суффикс версии `-vN`/`-vN-2`).
  - `StationRotation` — ротация по эпохам: в пределах эпохи каждая композиция ровно один раз; на стыке эпох гарантированный зазор ≥ ⌊N/2⌋ (последние H композиций прошлой эпохи не попадают в первые H новой); версии композиции идут round-robin (порядок версий перемешан один раз); история для «назад»; персист в `localStorage` (`radiocode:rotation:v1:<stationId>`) с версией и миграцией.
- Все 596 файлов сохранены. Версии НЕ удаляются/не объединяются — затронута только очерёдность.
- Подключено в `src/stores/playerStore.ts`: `setStation`/`playTrack`/`nextTrack`/`prevTrack`/`togglePlay`/`toggleShuffle` используют движок (один экземпляр на станцию). Поведение repeat: `one` — повтор трека; `off`/`all` — непрерывное радио через ротацию.
- Автотест `scripts/test-rotation.ts` (5000 итераций × станция) — ПРОЙДЕН:
  - CODE Music N=32 minGap=16; CODE Space N=31 minGap=15; Vol.1 N=128 minGap=65; RADIO N=67 minGap=33.
  - Проверки: нет повтора композиции в эпохе; зазор ≥ ⌊N/2⌋; все версии проигрываются; старт эпохи недетерминирован; состояние переживает reload.
- Отчёт группировки `reports/compositions.json`: 160 уникальных композиций (глобально), топ-группа `brother` (18 версий). `reports/suspicious_merges.json`: 3 флага — все ложные (одна композиция; расхождение из-за битых символов в названиях, а не ошибки склейки).
- Побочно исправлены 4 испорченных (mojibake) названия в `stations.ts`: «Вечный сигнал Opus 4.8», «Биение двух сердец», «На стёклах», «В каплях дождя».

### Фаза 1.2 — Приведение битрейта к фактическому (P0)
- Замер всех 596 файлов через `mutagen` → `reports/bitrate.csv` (kbps, длительность, sample rate, каналы, размер).
- Замер (mutagen, 596/596, 0 ошибок): CODE Music avg 185, CODE Space 183, Vol.1 181, RADIO 182 kbps VBR; глобально ~182 kbps, все 48 kHz stereo. Заявления 320/256 заменены на фактические: бейджи станций (`stations.ts`), бегущая строка и счётчик Bitrate (`page.tsx`), HQ-бейдж шапки (`RadioHeader.tsx`).

### Фаза 2 — Соцкарточки, MediaSession, PWA, Аналитика (P1)
- **2.1 OG/Twitter:** сгенерированы `public/og-image.png` и `twitter-image.png` (1200×630, киберпанк, бренд CODE). `layout.tsx`: og:image(+width/height/alt), twitter:image.
- **2.2 MediaSession API** (`useAudioEngine.ts`): metadata (title/artist/album=станция/artwork), обработчики play/pause/next/prev/stop/seekto, setPositionState на timeupdate, playbackState.
- **2.3 PWA:** `app/manifest.ts` (standalone, theme/bg, иконки 192/512+maskable), `apple-touch-icon.png`, theme-color через `viewport`, service worker `public/sw.js` (только оболочка; аудио НЕ кэшируется) + `ServiceWorkerRegister.tsx`.
- **2.4 Аналитика:** `@vercel/analytics` (`<Analytics/>`) + кастомные события `station_selected`/`play_started`/`listen_minute` (минуты прослушивания — ключевая метрика). ⚠️ Web Analytics включить в дашборде Vercel; Search Console verification — нужен код от Архитектора.

### Фаза 3 — SEO-инфраструктура, доступность, SSR (P2)
- **3.1** `app/sitemap.ts` (/sitemap.xml) + строка `Sitemap:` в `public/robots.txt`; JSON-LD в `layout.tsx` (WebSite + MusicGroup «AIfa & DJ Galatin» + 4× RadioBroadcastService).
- **3.2** aria-label на кнопки плеера (shuffle/prev/play/next/repeat/mute/playlist) + role=slider на громкость; aria-live+aria-label на «сейчас играет» (иначе скринридер читает скремблированный ScrambleText).
- **3.3** SSR-счётчики: `AnimatedCounter` инициализируется реальным значением (было 0 в разметке).
- **1.3 (код готов):** `src/lib/audioCdn.ts` — `audioUrl()` подменяет r2.dev на `NEXT_PUBLIC_AUDIO_CDN` (не задан → без изменений). Инфра Cloudflare (cdn.radiocode.space) — отдельно.
- Проверено вживую: sitemap/manifest/sw/og/apple-touch/icon → 200; og:image, JSON-LD, theme-color, manifest-link присутствуют.

### НЕ сделано (осознанно)
- **3.4 вынос плейлиста из бандла** — рискованный рефактор (ротация зависит от синхронного импорта `stations`); отложено как оптимизация.
- **3.5 i18n** — по решению Архитектора отдельно (SEO-эффект на радио ниже).
