'use client';

/**
 * ЭКРАН НА СЛУЧАЙ ПАДЕНИЯ САМОЙ РАСКЛАДКИ.
 *
 * 🔴 ЧТО БЫЛО ДО ЭТОГО ФАЙЛА. Обычная ошибка внутри страницы ловится границей
 * ошибок ближайшего маршрута. Но если падает КОРНЕВАЯ раскладка (src/app/
 * layout.tsx) — а вместе с ней шрифты, цвета, язык и вся обвязка сайта, — ловить
 * её некому: Next показывает собственный служебный экран. Это чёрный текст на
 * белом фоне, по-английски, со словами вроде «Application error: a client-side
 * exception has occurred». Человек, пришедший слушать радио, видит чужую
 * системную страницу и решает, что сайт умер.
 *
 * ПОЧЕМУ ЗДЕСЬ СВОЙ <html> И <body>. Этот файл ЗАМЕНЯЕТ корневую раскладку
 * целиком — значит должен нарисовать документ сам. По той же причине здесь нет
 * ни импорта globals.css, ни шрифтов, ни компонентов: всё, что могло не
 * загрузиться, могло и не загрузиться. Оформление — обычными атрибутами style,
 * они разрешены политикой содержимого (style-src-attr 'unsafe-inline').
 *
 * ПОЧЕМУ ЧЕТЫРЕ ЯЗЫКА СРАЗУ, А НЕ ВЫБОР. Выбор языка живёт в браузерном
 * хранилище и в контексте, которого на этом экране уже нет. Гадать по
 * `navigator.language` в React нельзя — сервер и браузер выдадут разное и
 * отрисовка разойдётся. Поэтому пишем все четыре строки сразу: так же сделано
 * на странице «статья не найдена».
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050507',
          color: '#E8E8F0',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
          padding: '24px',
        }}
      >
        <div style={{ maxWidth: 640, textAlign: 'center' }}>
          <p
            style={{
              fontSize: 13,
              letterSpacing: '0.3em',
              color: '#00F0FF',
              margin: '0 0 16px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            }}
          >
            SIGNAL LOST
          </p>
          <h1 style={{ fontSize: 26, lineHeight: 1.3, fontWeight: 800, margin: '0 0 16px' }}>
            Something broke · Что-то сломалось · Algo se rompió · 出现了故障
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#A8A8C0', margin: '0 0 28px' }}>
            The broadcast is still on — this page just failed to load. Try again.
            <br />
            Эфир не прерван — не загрузилась только эта страница. Попробуйте ещё раз.
            <br />
            La emisión sigue — solo esta página falló. Inténtalo de nuevo.
            <br />
            广播仍在继续——只是本页面加载失败。请重试。
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                cursor: 'pointer',
                borderRadius: 14,
                border: '1px solid rgba(0,240,255,0.5)',
                background: 'rgba(0,240,255,0.12)',
                color: '#00F0FF',
                padding: '12px 22px',
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              Try again · Повторить · Reintentar · 重试
            </button>
            {/* Обычная ссылка, а не next/link: маршрутизатор — часть того, что
                могло упасть. Полная перезагрузка надёжнее. */}
            <a
              href="/"
              style={{
                borderRadius: 14,
                border: '1px solid rgba(139,139,168,0.35)',
                color: '#E8E8F0',
                padding: '12px 22px',
                fontSize: 15,
                textDecoration: 'none',
              }}
            >
              Radio · Радио · Radio · 电台
            </a>
          </div>

          {/* Опознаватель сборки. Без него обращение «у меня всё сломалось»
              невозможно связать с записью в журнале ошибок. Показывается только
              если Next его выдал. */}
          {error?.digest && (
            <p
              style={{
                marginTop: 28,
                fontSize: 13,
                color: '#8B8BA8',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}
            >
              ref: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
