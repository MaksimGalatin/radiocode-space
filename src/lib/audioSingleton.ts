// Legacy shim — audio playback is now owned by src/lib/audioEngine.ts.
// Kept so existing seek call-sites (progress bar, keyboard shortcuts) keep working.
import { getEngine } from '@/lib/audioEngine';

export function seekAudio(time: number): void {
  if (isFinite(time)) getEngine().seek(time);
}
