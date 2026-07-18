export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
  cover?: string;
}

export interface Station {
  id: string;
  name: string;
  description: string;
  genre: string;
  color: string;
  glowColor: string;
  icon: string;
  tracks: Track[];
  bitrate?: string;
}

export const stations: Station[] = [
  {
    id: 'code-freq',
    name: 'CODE FREQ',
    description: 'Dark synthetic pulses from the digital void. Raw cybernetic beats for the terminal age.',
    genre: 'CYBERPUNK / SYNTHWAVE',
    color: '#00F0FF',
    glowColor: 'rgba(0, 240, 255, 0.3)',
    icon: 'Radio',
    bitrate: '320 kbps',
    tracks: [
      {
        id: 'cf-1',
        title: 'Neon Overflow',
        artist: 'DARKSynth',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 372,
      },
      {
        id: 'cf-2',
        title: 'Data Stream',
        artist: 'VOIDwalker',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 298,
      },
      {
        id: 'cf-3',
        title: 'Binary Sunset',
        artist: 'NEON Collective',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: 445,
      },
      {
        id: 'cf-4',
        title: 'Phantom Protocol',
        artist: 'GLITCH.ME',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        duration: 318,
      },
      {
        id: 'cf-5',
        title: 'Chrome Heart',
        artist: 'SYNTH Lord',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        duration: 391,
      },
    ],
  },
  {
    id: 'boa-506',
    name: 'BoA 506',
    description: 'Atmospheric deep space frequencies. Ethereal soundscapes from beyond the observable universe.',
    genre: 'AMBIENT / SPACE',
    color: '#B000FF',
    glowColor: 'rgba(176, 0, 255, 0.3)',
    icon: 'Waves',
    bitrate: '256 kbps',
    tracks: [
      {
        id: 'boa-1',
        title: 'Orbital Drift',
        artist: 'COSMOS',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        duration: 520,
      },
      {
        id: 'boa-2',
        title: 'Zero Gravity',
        artist: 'AETHER',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        duration: 480,
      },
      {
        id: 'boa-3',
        title: 'Nebula Core',
        artist: 'DEEP Space',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        duration: 395,
      },
      {
        id: 'boa-4',
        title: 'Astral Projection',
        artist: 'VOID Signal',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        duration: 440,
      },
    ],
  },
  {
    id: 'code-music-202',
    name: 'CODE Music 202',
    description: 'High-energy digital waveforms. Electrifying beats forged in the heart of the machine.',
    genre: 'ELECTRONIC / TECH',
    color: '#FF003C',
    glowColor: 'rgba(255, 0, 60, 0.3)',
    icon: 'Zap',
    bitrate: '320 kbps',
    tracks: [
      {
        id: 'cm-1',
        title: 'Voltage Rush',
        artist: 'CIRCUIT',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        duration: 310,
      },
      {
        id: 'cm-2',
        title: 'Pulse Engine',
        artist: 'FLUX',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        duration: 275,
      },
      {
        id: 'cm-3',
        title: 'Digital Storm',
        artist: 'MASS Effect',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        duration: 350,
      },
      {
        id: 'cm-4',
        title: 'Override',
        artist: 'TECH NOIR',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        duration: 290,
      },
      {
        id: 'cm-5',
        title: 'Mainframe',
        artist: 'GRID Runner',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        duration: 335,
      },
      {
        id: 'cm-6',
        title: 'Cyberlink',
        artist: 'NEON Forge',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
        duration: 365,
      },
    ],
  },
  {
    id: 'void-fm',
    name: 'VOID FM',
    description: 'The abyss speaks in frequencies unheard. Industrial noise meets melodic darkness.',
    genre: 'DARK AMBIENT / INDUSTRIAL',
    color: '#39FF14',
    glowColor: 'rgba(57, 255, 20, 0.3)',
    icon: 'Skull',
    bitrate: '320 kbps',
    tracks: [
      {
        id: 'vf-1',
        title: 'Descent',
        artist: 'ABYSS Walker',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        duration: 420,
      },
      {
        id: 'vf-2',
        title: 'Machine God',
        artist: 'INDUSTRIA',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: 380,
      },
      {
        id: 'vf-3',
        title: 'Signal Lost',
        artist: 'VOID Echo',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: 455,
      },
    ],
  },
];