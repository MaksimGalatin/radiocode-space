// Resolve an audio URL through the project CDN when configured.
// Set NEXT_PUBLIC_AUDIO_CDN (e.g. https://cdn.radiocode.space) to serve audio from
// a custom-domain Cloudflare R2 endpoint instead of the public *.r2.dev host.
// Falls back to the original URL when the env var is unset — non-breaking.

const R2_PUBLIC = 'https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev';
const CDN = (process.env.NEXT_PUBLIC_AUDIO_CDN || '').replace(/\/$/, '');

export function audioUrl(url: string): string {
  if (CDN && url.startsWith(R2_PUBLIC)) {
    return CDN + url.slice(R2_PUBLIC.length);
  }
  return url;
}
