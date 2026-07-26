# CDN для аудио CODE Radio — бесплатно, на Cloudflare Workers

## Статус: развёрнут и подключён (25.07.2026)

Адрес: **https://radiocode-audio.codeeternal.workers.dev**
Подключён через `NEXT_PUBLIC_AUDIO_CDN` на всех четырёх сайтах
(radiocode.space, aifa.digital, codeofdigitaleternity.com, aifa.works).

## Зачем

Треки лежат в Cloudflare R2 и раньше раздавались с публичного адреса
`pub-93eb5afce8254a5eae164a3377e7709e.r2.dev`. Это уже сеть Cloudflare, но у
неё нет двух вещей:

1. **заголовков кэширования** — каждое прослушивание качало файл заново;
2. **CORS** — из-за его отсутствия плеер работает в «прямом» режиме, без
   аудио-реактивного визуализатора и авто-нормализации громкости.

Воркер закрывает обе задачи и остаётся в бесплатном тарифе (100 000 запросов
в сутки; исходящий трафик R2 не тарифицируется).

## Что он делает

* `Cache-Control: public, max-age=31536000, immutable` — повторное
  прослушивание берётся из кэша браузера и кэша края сети (проверено:
  второй запрос отдаётся с `X-CODE-Cache: HIT` и `cf-cache-status: HIT`);
* корректный CORS для наших доменов (чужой Origin заголовок не получает);
* Range-запросы (перемотка) идут напрямую в R2 и не кэшируются — 206 нельзя
  положить в Cache API;
* полный GET отдаётся как 200 (а не 206) — иначе ответ некэшируем;
* версия в ключе кэша (`CACHE_VERSION`) — при смене логики достаточно поднять
  константу, старые записи осиротеют сами.

## Развёртывание

Токен лежит в `ТОКЕНЫ и API…/CLOUDFLARE_API_TOKEN.txt` (имя `radiocode-audio-cdn`,
права: Workers Scripts:Edit, Account Settings:Read, Workers R2 Storage:Read,
User Details:Read).

```bash
cd D:/CODE/radiocode-space/infra/cdn-worker
CLOUDFLARE_API_TOKEN=<токен> npx wrangler deploy
```

## Проверка

```bash
node -e "fetch('https://radiocode-audio.codeeternal.workers.dev/code-music/2-padam-wake-me-at-dawn-v1.mp3',{headers:{Origin:'https://radiocode.space'}}).then(r=>console.log(r.status,[...r.headers]))"
```
Ожидаем: `200`, `access-control-allow-origin: https://radiocode.space`,
`Cache-Control: public, max-age=31536000, immutable`, `Accept-Ranges: bytes`.
При повторном запросе — `X-CODE-Cache: HIT`.

## Что осталось (не блокирует)

* Свой домен `cdn.radiocode.space` вместо `*.workers.dev` — потребует перевода
  зоны на Cloudflare, это решение Архитектора.
* Вернуть Web Audio (визуализатор по реальному спектру + авто-нормализация):
  CORS теперь есть, но движок сознательно играет «напрямую», чтобы не поймать
  подвисший AudioContext. Включать только с проверкой на живых устройствах.
