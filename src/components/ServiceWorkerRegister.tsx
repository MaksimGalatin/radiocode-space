'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((рег) => {
          // 🔴 ОТКРЫТАЯ ВКЛАДКА ОСТАВАЛАСЬ НА СТАРОЙ СБОРКЕ.
          //
          // Воркер устанавливался и вставал в очередь, а страница продолжала
          // жить со старым набором файлов до тех пор, пока человек сам не
          // закроет ВСЕ вкладки сайта. Радио держат открытым часами: выложили
          // правку — её не видно, и понять это со стороны невозможно.
          //
          // Проверять сразу и раз в час: сайт работает фоном, и обновление,
          // выложенное в середине прослушивания, должно доехать без действий
          // человека.
          const проверить = () => { рег.update().catch(() => {}); };
          проверить();
          const таймер = setInterval(проверить, 60 * 60 * 1000);
          window.addEventListener('online', проверить);
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') проверить();
          });

          // Новый воркер встал и ждёт — просим его начать работать немедленно.
          рег.addEventListener('updatefound', () => {
            const новый = рег.installing;
            if (!новый) return;
            новый.addEventListener('statechange', () => {
              if (новый.state === 'installed' && navigator.serviceWorker.controller) {
                новый.postMessage({ тип: 'ВЗЯТЬ_УПРАВЛЕНИЕ' });
              }
            });
          });

          // Перезагружаем страницу РОВНО ОДИН РАЗ после смены воркера.
          // Без защёлки это бесконечный круг: каждая перезагрузка снова меняет
          // управляющего, и вкладка перезагружается вечно.
          let ужеПерезагрузили = false;
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (ужеПерезагрузили) return;
            ужеПерезагрузили = true;
            window.location.reload();
          });

          return () => clearInterval(таймер);
        })
        .catch(() => {
          /* registration is best-effort */
        });
    };
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  return null;
}
