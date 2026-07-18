// Shared audio element singleton
// This allows both useAudioEngine and PlayerBar to access the same audio element

let audioElement: HTMLAudioElement | null = null;

export function getAudioElement(): HTMLAudioElement {
  if (!audioElement) {
    audioElement = new Audio();
    audioElement.crossOrigin = 'anonymous';
    audioElement.preload = 'auto';
  }
  return audioElement;
}

export function seekAudio(time: number): void {
  const audio = getAudioElement();
  if (isFinite(time)) {
    audio.currentTime = time;
  }
}