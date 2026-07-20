import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'RadioCode.Space — Eternal Cyberpunk Radio',
    short_name: 'RadioCode',
    description:
      'Premium cyberpunk radio from the CODE Eternal ecosystem — 4 stations, 596 tracks by AIfa & DJ Galatin.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#050507',
    theme_color: '#00F0FF',
    categories: ['music', 'entertainment'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
