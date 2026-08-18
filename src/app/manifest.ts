import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RadioCode.Space — Eternal Cyberpunk Radio',
    short_name: 'RadioCode',
    description:
      'Premium cyberpunk radio from the CODE Eternal ecosystem — 6 stations, 530 compositions in 1024 recordings by AIfa & DJ Galatin.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#050507',
    /**
     * 🔴 ЦВЕТ РАСХОДИЛСЯ С ТЕМ, ЧТО ОБЪЯВЛЕНО НА СТРАНИЦЕ.
     *
     * Здесь стоял бирюзовый #00F0FF, а в `viewport.themeColor` корневой
     * раскладки — почти чёрный #050507. Браузер берёт цвет из разных мест в
     * разных случаях: со страницы во вкладке и из манифеста в установленном
     * приложении. Из-за расхождения полоса над установленным приложением
     * вспыхивала ярко-бирюзовым, хотя весь сайт — тёмный, и та же полоса во
     * вкладке была тёмной. Выглядело как чужое приложение.
     *
     * Приведено к #050507 — к цвету страницы и к `background_color` ниже,
     * а не наоборот: заменять на бирюзовый пришлось бы полосу браузера у ВСЕХ
     * посетителей на телефонах, а это видимая правка оформления живого сайта.
     * Бирюзовый остаётся акцентом внутри страниц, где он и был.
     */
    theme_color: '#050507',
    categories: ['music', 'entertainment'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
