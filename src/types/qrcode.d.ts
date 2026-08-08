/**
 * Своё объявление типов для `qrcode`.
 *
 * У пакета нет типов, а отдельный `@types/qrcode` тянуть ради одной функции
 * незачем. Описываем ровно то, чем пользуемся на странице паспорта: построение
 * QR в виде строки данных изображения.
 */
declare module 'qrcode' {
  export function toDataURL(
    text: string,
    options?: {
      width?: number;
      margin?: number;
      errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
      color?: { dark?: string; light?: string };
    },
  ): Promise<string>;
}
