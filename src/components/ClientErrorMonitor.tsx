'use client';

import { useEffect } from 'react';
import { reportClientError } from '@/lib/client-error-report';

/**
 * Наблюдатель за клиентскими ошибками.
 *
 * У этого сайта его не было вовсе: поломка в браузере (упавший плеер, сбой
 * кабинета на конкретной версии Safari) не оставляла никакого следа — сервер
 * отвечал 200, а человек видел неработающую страницу.
 *
 * Строго наблюдательный: не вызывает preventDefault(), поэтому обычная
 * обработка ошибок браузером и вывод в консоль не меняются. Ограничения и
 * защита от лавины — внутри reportClientError.
 */
export default function ClientErrorMonitor() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      const msg = e.message || (e.error != null ? String(e.error) : '') || 'error';
      const src = e.filename ? `${e.filename}:${e.lineno ?? 0}:${e.colno ?? 0}` : '';
      reportClientError(msg, src, e.error instanceof Error ? e.error.stack : undefined);
    };

    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason;
      const msg = reason instanceof Error
        ? (reason.message || reason.name)
        : typeof reason === 'string' ? reason : 'unhandledrejection';
      reportClientError(`unhandled rejection: ${msg}`, 'unhandledrejection',
        reason instanceof Error ? reason.stack : undefined);
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, []);

  return null;
}
