# CDN для аудио CODE Radio — бесплатно, на Cloudflare Workers

## Коротко

Треки уже лежат в Cloudflare R2 и раздаются с публичного адреса `*.r2.dev`.
Замер (26.07.2026): `206 Partial Content`, ~0.3 с, ~700 КБ/с — **это уже сеть
Cloudflare**, отдельный CDN покупать не нужно. Не хватает двух вещей:

1. **заголовков кэширования** — каждое прослушивание идёт в R2 заново;
2. **CORS** — из-за его отсутствия плеер работает в «прямом» режиме, а
   аудио-реактивный визуализатор и авто-нормализация громкости отключены.

Этот воркер закрывает обе задачи и остаётся в бесплатном тарифе
(100 000 запросов в сутки; исходящий трафик R2 не тарифицируется).

## Что нужно один раз от Архитектора

В своём **уже существующем** аккаунте Cloudflare создать API-токен:
`Мой профиль → API Tokens → Create Token → Custom token`

| Разрешение | Уровень |
|---|---|
| Account · Workers Scripts | **Edit** |
| Account · Workers R2 Storage | **Read** |
| Account · Account Settings | **Read** |

Новый сервис регистрировать не нужно — это тот же аккаунт, где лежит бакет
`radiocode-music`. Токен положить в `ТОКЕНЫ и API` рядом с остальными.

## Развёртывание (одна команда)

```bash
cd D:/CODE/radiocode-space/infra/cdn-worker
CLOUDFLARE_API_TOKEN=<токен> npx wrangler deploy
```

Wrangler напечатает адрес вида `https://radiocode-audio.<аккаунт>.workers.dev`.

## Подключение к плееру

```bash
cd D:/CODE/radiocode-space
printf 'https://radiocode-audio.<аккаунт>.workers.dev' | npx vercel env add NEXT_PUBLIC_AUDIO_CDN production
npx vercel --prod --yes
```

Код плеера уже готов: `src/lib/audioCdn.ts` подменяет адрес `*.r2.dev` на
значение `NEXT_PUBLIC_AUDIO_CDN`. Если переменная не задана — всё работает
как раньше, поэтому подключение безопасно и обратимо.

## Проверка после включения

```bash
curl -sI -H "Origin: https://radiocode.space" -r 0-100 https://radiocode-audio.<аккаунт>.workers.dev/code-music/2-padam-wake-me-at-dawn-v1.mp3
```
Ожидаем: `206`, `Access-Control-Allow-Origin: https://radiocode.space`,
`Cache-Control: public, max-age=31536000, immutable`, `Accept-Ranges: bytes`.
При повторном запросе полного файла — `X-CODE-Cache: HIT`.
