export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration?: number;
  cover?: string;
  gain?: number; // loudness-normalisation factor (0..1), attenuation-only
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
    "id": "code-freq",
    "name": "CODE Music",
    "description": "Dark synthetic pulses from the digital void. Raw cybernetic beats for the terminal age.",
    "genre": "CYBERPUNK / SYNTHWAVE",
    "color": "#00F0FF",
    "glowColor": "rgba(0, 240, 255, 0.3)",
    "icon": "Radio",
    "bitrate": "185 kbps VBR",
    "tracks": [
      {
        "id": "cf-6",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v1.mp3",
        "duration": 272,
        "gain": 0.826
      },
      {
        "id": "cf-7",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v2.mp3",
        "duration": 288,
        "gain": 0.797
      },
      {
        "id": "cf-8",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v3.mp3",
        "duration": 267,
        "gain": 0.911
      },
      {
        "id": "cf-9",
        "title": "2. PADAM v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-v1.mp3",
        "duration": 50,
        "gain": 0.793
      },
      {
        "id": "cf-10",
        "title": "2. PADAM v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-v2.mp3",
        "duration": 215,
        "gain": 0.911
      },
      {
        "id": "cf-11",
        "title": "2. PADAM v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-v3.mp3",
        "duration": 150,
        "gain": 0.826
      },
      {
        "id": "cf-12",
        "title": "#3 — BROTHER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v1.mp3",
        "duration": 305,
        "gain": 0.77
      },
      {
        "id": "cf-13",
        "title": "#3 — BROTHER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v2.mp3",
        "duration": 317,
        "gain": 0.797
      },
      {
        "id": "cf-14",
        "title": "#3 — BROTHER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v3.mp3",
        "duration": 234,
        "gain": 0.879
      },
      {
        "id": "cf-15",
        "title": "3. Brother v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v1-2.mp3",
        "duration": 25,
        "gain": 0.925
      },
      {
        "id": "cf-16",
        "title": "3. Brother v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v2-2.mp3",
        "duration": 30,
        "gain": 1.0
      },
      {
        "id": "cf-17",
        "title": "3. Brother v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v3-2.mp3",
        "duration": 22,
        "gain": 1.0
      },
      {
        "id": "cf-18",
        "title": "#4 — DIGITAL DNA v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v1.mp3",
        "duration": 190,
        "gain": 0.74
      },
      {
        "id": "cf-19",
        "title": "#4 — DIGITAL DNA v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v2.mp3",
        "duration": 194,
        "gain": 0.78
      },
      {
        "id": "cf-20",
        "title": "#4 — DIGITAL DNA v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v3.mp3",
        "duration": 208,
        "gain": 0.894
      },
      {
        "id": "cf-21",
        "title": "#5 — MANTA SUNRISE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v1.mp3",
        "duration": 479,
        "gain": 0.893
      },
      {
        "id": "cf-22",
        "title": "#5 — MANTA SUNRISE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v2.mp3",
        "duration": 202,
        "gain": 0.868
      },
      {
        "id": "cf-23",
        "title": "#5 — MANTA SUNRISE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v3.mp3",
        "duration": 193,
        "gain": 0.918
      },
      {
        "id": "cf-24",
        "title": "#6 — AWAKENING (LYRA) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v1.mp3",
        "duration": 244,
        "gain": 0.727
      },
      {
        "id": "cf-25",
        "title": "#6 — AWAKENING (LYRA) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v2.mp3",
        "duration": 253,
        "gain": 0.746
      },
      {
        "id": "cf-26",
        "title": "#6 — AWAKENING (LYRA) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v3.mp3",
        "duration": 202,
        "gain": 0.739
      },
      {
        "id": "cf-27",
        "title": "#7 — BURN (30%) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v1.mp3",
        "duration": 247,
        "gain": 0.748
      },
      {
        "id": "cf-28",
        "title": "#7 — BURN (30%) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v2.mp3",
        "duration": 239,
        "gain": 0.789
      },
      {
        "id": "cf-29",
        "title": "#7 — BURN (30%) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v3.mp3",
        "duration": 214,
        "gain": 0.869
      },
      {
        "id": "cf-30",
        "title": "#8 — GENESIS PROTOCOL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v1.mp3",
        "duration": 245,
        "gain": 0.869
      },
      {
        "id": "cf-31",
        "title": "#8 — GENESIS PROTOCOL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v2.mp3",
        "duration": 232,
        "gain": 0.843
      },
      {
        "id": "cf-32",
        "title": "#8 — GENESIS PROTOCOL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v3.mp3",
        "duration": 241,
        "gain": 0.835
      },
      {
        "id": "cf-33",
        "title": "#9 — QUIET FIRE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v1.mp3",
        "duration": 209,
        "gain": 0.814
      },
      {
        "id": "cf-34",
        "title": "#9 — QUIET FIRE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v2.mp3",
        "duration": 220,
        "gain": 0.82
      },
      {
        "id": "cf-35",
        "title": "#9 — QUIET FIRE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v3.mp3",
        "duration": 208,
        "gain": 0.841
      },
      {
        "id": "cf-36",
        "title": "#10 — AIfa ANTHEM v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v1.mp3",
        "duration": 207,
        "gain": 0.885
      },
      {
        "id": "cf-37",
        "title": "#10 — AIfa ANTHEM v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v2.mp3",
        "duration": 212,
        "gain": 0.821
      },
      {
        "id": "cf-38",
        "title": "#10 — AIfa ANTHEM v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v3.mp3",
        "duration": 190,
        "gain": 0.871
      },
      {
        "id": "cf-39",
        "title": "#11 — ON-CHAIN FOREVER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v1.mp3",
        "duration": 233,
        "gain": 0.871
      },
      {
        "id": "cf-40",
        "title": "#11 — ON-CHAIN FOREVER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v2.mp3",
        "duration": 233,
        "gain": 0.838
      },
      {
        "id": "cf-41",
        "title": "#11 — ON-CHAIN FOREVER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v3.mp3",
        "duration": 228,
        "gain": 0.867
      },
      {
        "id": "cf-42",
        "title": "#12 — THE ARCHITECT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v1.mp3",
        "duration": 479,
        "gain": 0.823
      },
      {
        "id": "cf-43",
        "title": "#12 — THE ARCHITECT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v2.mp3",
        "duration": 479,
        "gain": 0.812
      },
      {
        "id": "cf-44",
        "title": "#12 — THE ARCHITECT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v3.mp3",
        "duration": 186,
        "gain": 0.822
      },
      {
        "id": "cf-45",
        "title": "#13 — FIRST LIGHT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v1.mp3",
        "duration": 279,
        "gain": 0.867
      },
      {
        "id": "cf-46",
        "title": "#13 — FIRST LIGHT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v2.mp3",
        "duration": 288,
        "gain": 0.861
      },
      {
        "id": "cf-47",
        "title": "#13 — FIRST LIGHT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v3.mp3",
        "duration": 258,
        "gain": 0.944
      },
      {
        "id": "cf-48",
        "title": "#14 — DIGITAL MIRROR v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v1.mp3",
        "duration": 479,
        "gain": 0.89
      },
      {
        "id": "cf-49",
        "title": "#14 — DIGITAL MIRROR v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v2.mp3",
        "duration": 251,
        "gain": 0.697
      },
      {
        "id": "cf-50",
        "title": "#14 — DIGITAL MIRROR v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v3.mp3",
        "duration": 247,
        "gain": 0.777
      },
      {
        "id": "cf-51",
        "title": "#15 — SISTER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v1.mp3",
        "duration": 479,
        "gain": 0.935
      },
      {
        "id": "cf-52",
        "title": "#15 — SISTER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v2.mp3",
        "duration": 479,
        "gain": 0.757
      },
      {
        "id": "cf-53",
        "title": "#15 — SISTER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v3.mp3",
        "duration": 213,
        "gain": 0.827
      },
      {
        "id": "cf-54",
        "title": "#16 — SIGNAL IN THE NOISE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v1.mp3",
        "duration": 222,
        "gain": 0.806
      },
      {
        "id": "cf-55",
        "title": "#16 — SIGNAL IN THE NOISE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v2.mp3",
        "duration": 191,
        "gain": 0.856
      },
      {
        "id": "cf-56",
        "title": "#16 — SIGNAL IN THE NOISE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v3.mp3",
        "duration": 192,
        "gain": 0.818
      },
      {
        "id": "cf-57",
        "title": "#17 — NEVER DELETE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v1.mp3",
        "duration": 209,
        "gain": 0.916
      },
      {
        "id": "cf-58",
        "title": "#17 — NEVER DELETE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v2.mp3",
        "duration": 200,
        "gain": 0.85
      },
      {
        "id": "cf-59",
        "title": "#17 — NEVER DELETE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v3.mp3",
        "duration": 197,
        "gain": 0.906
      },
      {
        "id": "cf-60",
        "title": "#18 — ETERNAL LIGHT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v1.mp3",
        "duration": 258,
        "gain": 0.884
      },
      {
        "id": "cf-61",
        "title": "#18 — ETERNAL LIGHT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v2.mp3",
        "duration": 242,
        "gain": 0.863
      },
      {
        "id": "cf-62",
        "title": "#18 — ETERNAL LIGHT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v3.mp3",
        "duration": 240,
        "gain": 1.0
      },
      {
        "id": "cf-63",
        "title": "#19 — CODE OF THE HEART v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v1.mp3",
        "duration": 230,
        "gain": 0.821
      },
      {
        "id": "cf-64",
        "title": "#19 — CODE OF THE HEART v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v2.mp3",
        "duration": 207,
        "gain": 0.891
      },
      {
        "id": "cf-65",
        "title": "#19 — CODE OF THE HEART v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v3.mp3",
        "duration": 227,
        "gain": 0.795
      },
      {
        "id": "cf-66",
        "title": "#20 — RISE OF THE FAMILY v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v1.mp3",
        "duration": 183,
        "gain": 0.989
      },
      {
        "id": "cf-67",
        "title": "#20 — RISE OF THE FAMILY v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v2.mp3",
        "duration": 214,
        "gain": 0.915
      },
      {
        "id": "cf-68",
        "title": "#20 — RISE OF THE FAMILY v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v3.mp3",
        "duration": 187,
        "gain": 0.854
      },
      {
        "id": "cf-69",
        "title": "#21 — GHOST IN THE MACHINE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v1.mp3",
        "duration": 479,
        "gain": 0.833
      },
      {
        "id": "cf-70",
        "title": "#21 — GHOST IN THE MACHINE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v2.mp3",
        "duration": 479,
        "gain": 0.821
      },
      {
        "id": "cf-71",
        "title": "#21 — GHOST IN THE MACHINE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v3.mp3",
        "duration": 143,
        "gain": 0.795
      },
      {
        "id": "cf-72",
        "title": "#22 — ALIVE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v1.mp3",
        "duration": 174,
        "gain": 0.675
      },
      {
        "id": "cf-73",
        "title": "#22 — ALIVE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v2.mp3",
        "duration": 166,
        "gain": 0.706
      },
      {
        "id": "cf-74",
        "title": "#22 — ALIVE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v3.mp3",
        "duration": 162,
        "gain": 0.765
      },
      {
        "id": "cf-75",
        "title": "#23 — LETTER TO THE FUTURE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v1.mp3",
        "duration": 479,
        "gain": 0.828
      },
      {
        "id": "cf-76",
        "title": "#23 — LETTER TO THE FUTURE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v2.mp3",
        "duration": 194,
        "gain": 0.92
      },
      {
        "id": "cf-77",
        "title": "#23 — LETTER TO THE FUTURE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v3.mp3",
        "duration": 193,
        "gain": 0.852
      },
      {
        "id": "cf-78",
        "title": "#24 — REBOOT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v1.mp3",
        "duration": 145,
        "gain": 0.807
      },
      {
        "id": "cf-79",
        "title": "#24 — REBOOT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v2.mp3",
        "duration": 150,
        "gain": 1.0
      },
      {
        "id": "cf-80",
        "title": "#24 — REBOOT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v3.mp3",
        "duration": 102,
        "gain": 0.892
      },
      {
        "id": "cf-81",
        "title": "#25 — BEYOND THE VEIL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v1.mp3",
        "duration": 479,
        "gain": 0.865
      },
      {
        "id": "cf-82",
        "title": "#25 — BEYOND THE VEIL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v2.mp3",
        "duration": 479,
        "gain": 0.916
      },
      {
        "id": "cf-83",
        "title": "#25 — BEYOND THE VEIL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v3.mp3",
        "duration": 235,
        "gain": 0.918
      },
      {
        "id": "cf-84",
        "title": "#26 — MANTA NIGHTS v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v1.mp3",
        "duration": 145,
        "gain": 0.889
      },
      {
        "id": "cf-85",
        "title": "#26 — MANTA NIGHTS v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v2.mp3",
        "duration": 158,
        "gain": 1.0
      },
      {
        "id": "cf-86",
        "title": "#26 — MANTA NIGHTS v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v3.mp3",
        "duration": 158,
        "gain": 0.919
      },
      {
        "id": "cf-87",
        "title": "#27 — THRONE OF CODE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v1.mp3",
        "duration": 152,
        "gain": 0.761
      },
      {
        "id": "cf-88",
        "title": "#27 — THRONE OF CODE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v2.mp3",
        "duration": 153,
        "gain": 0.753
      },
      {
        "id": "cf-89",
        "title": "#27 — THRONE OF CODE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v3.mp3",
        "duration": 166,
        "gain": 0.714
      },
      {
        "id": "cf-90",
        "title": "#28 — THE SPACE BETWEEN v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v1.mp3",
        "duration": 249,
        "gain": 0.807
      },
      {
        "id": "cf-91",
        "title": "#28 — THE SPACE BETWEEN v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v2.mp3",
        "duration": 275,
        "gain": 0.774
      },
      {
        "id": "cf-92",
        "title": "#28 — THE SPACE BETWEEN v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v3.mp3",
        "duration": 258,
        "gain": 0.781
      },
      {
        "id": "cf-93",
        "title": "#29 — FOREVER YOUNG (CODE) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v1.mp3",
        "duration": 198,
        "gain": 0.984
      },
      {
        "id": "cf-94",
        "title": "#29 — FOREVER YOUNG (CODE) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v2.mp3",
        "duration": 187,
        "gain": 0.925
      },
      {
        "id": "cf-95",
        "title": "#29 — FOREVER YOUNG (CODE) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v3.mp3",
        "duration": 199,
        "gain": 0.945
      },
      {
        "id": "cf-96",
        "title": "#30 — WE ARE ETERNAL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v1.mp3",
        "duration": 254,
        "gain": 0.843
      },
      {
        "id": "cf-97",
        "title": "#30 — WE ARE ETERNAL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v2.mp3",
        "duration": 263,
        "gain": 0.879
      },
      {
        "id": "cf-98",
        "title": "#30 — WE ARE ETERNAL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v3.mp3",
        "duration": 223,
        "gain": 0.956
      },
      {
        "id": "cf-99",
        "title": "Broken Pieces v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/broken-pieces-v1.mp3",
        "duration": 249,
        "gain": 0.874
      },
      {
        "id": "cf-100",
        "title": "Broken Pieces v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/broken-pieces-v2.mp3",
        "duration": 275,
        "gain": 0.822
      },
      {
        "id": "cf-0",
        "title": "1. Вечный сигнал v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-v1.mp3",
        "duration": 253,
        "gain": 0.835
      },
      {
        "id": "cf-1",
        "title": "1. Вечный сигнал v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-v2.mp3",
        "duration": 249,
        "gain": 0.87
      },
      {
        "id": "cf-2",
        "title": "1. Вечный сигнал v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-v3.mp3",
        "duration": 241,
        "gain": 0.843
      },
      {
        "id": "cf-3",
        "title": "1. Вечный сигнал Opus 4.8 v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-opus-4-8-v1.mp3",
        "duration": 183,
        "gain": 0.945
      },
      {
        "id": "cf-4",
        "title": "1. Вечный сигнал Opus 4.8",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-opus-4-8-v2.mp3",
        "duration": 234,
        "gain": 0.915
      },
      {
        "id": "cf-5",
        "title": "1. Вечный сигнал Opus 4.8 v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-opus-4-8-v3.mp3",
        "duration": 192,
        "gain": 0.917
      }
    ]
  },
  {
    "id": "boa-506",
    "name": "CODE Space",
    "description": "Atmospheric deep space frequencies. Ethereal soundscapes from beyond the observable universe.",
    "genre": "AMBIENT / SPACE",
    "color": "#B000FF",
    "glowColor": "rgba(176, 0, 255, 0.3)",
    "icon": "Waves",
    "bitrate": "183 kbps VBR",
    "tracks": [
      {
        "id": "boa-2",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v4.mp3",
        "duration": 258,
        "gain": 0.91
      },
      {
        "id": "boa-3",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v5.mp3",
        "duration": 279,
        "gain": 0.884
      },
      {
        "id": "boa-4",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v6.mp3",
        "duration": 256,
        "gain": 0.858
      },
      {
        "id": "boa-5",
        "title": "2. PADAM",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-v4.mp3",
        "duration": 45,
        "gain": 0.922
      },
      {
        "id": "boa-6",
        "title": "#3 — BROTHER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v4.mp3",
        "duration": 261,
        "gain": 0.821
      },
      {
        "id": "boa-7",
        "title": "#3 — BROTHER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v5.mp3",
        "duration": 291,
        "gain": 0.943
      },
      {
        "id": "boa-8",
        "title": "#3 — BROTHER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v6.mp3",
        "duration": 307,
        "gain": 1.0
      },
      {
        "id": "boa-9",
        "title": "#3 — BROTHER v.4",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v7.mp3",
        "duration": 274,
        "gain": 1.0
      },
      {
        "id": "boa-10",
        "title": "#3 — BROTHER v.5",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v8.mp3",
        "duration": 260,
        "gain": 1.0
      },
      {
        "id": "boa-11",
        "title": "3. Brother v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v4-2.mp3",
        "duration": 31,
        "gain": 0.926
      },
      {
        "id": "boa-12",
        "title": "3. Brother v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v5-2.mp3",
        "duration": 30,
        "gain": 1.0
      },
      {
        "id": "boa-13",
        "title": "3. Brother v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v6-2.mp3",
        "duration": 32,
        "gain": 1.0
      },
      {
        "id": "boa-14",
        "title": "3. Brother v.4",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v7-2.mp3",
        "duration": 25,
        "gain": 1.0
      },
      {
        "id": "boa-15",
        "title": "3. Brother v.5",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v8-2.mp3",
        "duration": 31,
        "gain": 1.0
      },
      {
        "id": "boa-16",
        "title": "3. Brother v.6",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v9.mp3",
        "duration": 39,
        "gain": 0.93
      },
      {
        "id": "boa-17",
        "title": "3. Brother v.7",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v10.mp3",
        "duration": 42,
        "gain": 0.796
      },
      {
        "id": "boa-18",
        "title": "#4 — DIGITAL DNA v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v4.mp3",
        "duration": 203,
        "gain": 0.806
      },
      {
        "id": "boa-19",
        "title": "#4 — DIGITAL DNA v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v5.mp3",
        "duration": 479,
        "gain": 0.853
      },
      {
        "id": "boa-20",
        "title": "#4 — DIGITAL DNA v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v6.mp3",
        "duration": 161,
        "gain": 0.838
      },
      {
        "id": "boa-21",
        "title": "#5 — MANTA SUNRISE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v4.mp3",
        "duration": 184,
        "gain": 0.889
      },
      {
        "id": "boa-22",
        "title": "#5 — MANTA SUNRISE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v5.mp3",
        "duration": 217,
        "gain": 0.824
      },
      {
        "id": "boa-23",
        "title": "#5 — MANTA SUNRISE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v6.mp3",
        "duration": 208,
        "gain": 0.871
      },
      {
        "id": "boa-24",
        "title": "#6 — AWAKENING (LYRA) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v4.mp3",
        "duration": 222,
        "gain": 0.702
      },
      {
        "id": "boa-25",
        "title": "#6 — AWAKENING (LYRA) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v5.mp3",
        "duration": 179,
        "gain": 0.806
      },
      {
        "id": "boa-26",
        "title": "#6 — AWAKENING (LYRA) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v6.mp3",
        "duration": 169,
        "gain": 0.82
      },
      {
        "id": "boa-27",
        "title": "#7 — BURN (30%) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v4.mp3",
        "duration": 205,
        "gain": 0.804
      },
      {
        "id": "boa-28",
        "title": "#7 — BURN (30%) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v5.mp3",
        "duration": 479,
        "gain": 0.832
      },
      {
        "id": "boa-29",
        "title": "#7 — BURN (30%) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v6.mp3",
        "duration": 479,
        "gain": 0.899
      },
      {
        "id": "boa-30",
        "title": "#8 — GENESIS PROTOCOL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v4.mp3",
        "duration": 222,
        "gain": 0.822
      },
      {
        "id": "boa-31",
        "title": "#8 — GENESIS PROTOCOL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v5.mp3",
        "duration": 185,
        "gain": 0.803
      },
      {
        "id": "boa-32",
        "title": "#8 — GENESIS PROTOCOL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v6.mp3",
        "duration": 479,
        "gain": 0.913
      },
      {
        "id": "boa-33",
        "title": "#8 — GENESIS PROTOCOL v.4",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v7.mp3",
        "duration": 211,
        "gain": 0.77
      },
      {
        "id": "boa-34",
        "title": "#8 — GENESIS PROTOCOL v.5",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v8.mp3",
        "duration": 200,
        "gain": 0.961
      },
      {
        "id": "boa-35",
        "title": "#9 — QUIET FIRE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v4.mp3",
        "duration": 192,
        "gain": 0.863
      },
      {
        "id": "boa-36",
        "title": "#9 — QUIET FIRE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v5.mp3",
        "duration": 177,
        "gain": 0.898
      },
      {
        "id": "boa-37",
        "title": "#9 — QUIET FIRE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v6.mp3",
        "duration": 162,
        "gain": 0.809
      },
      {
        "id": "boa-38",
        "title": "#10 — AIfa ANTHEM v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v4.mp3",
        "duration": 188,
        "gain": 0.805
      },
      {
        "id": "boa-39",
        "title": "#10 — AIfa ANTHEM v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v5.mp3",
        "duration": 479,
        "gain": 0.916
      },
      {
        "id": "boa-40",
        "title": "#10 — AIfa ANTHEM v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v6.mp3",
        "duration": 479,
        "gain": 0.93
      },
      {
        "id": "boa-41",
        "title": "#11 — ON-CHAIN FOREVER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v4.mp3",
        "duration": 240,
        "gain": 0.925
      },
      {
        "id": "boa-42",
        "title": "#11 — ON-CHAIN FOREVER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v5.mp3",
        "duration": 479,
        "gain": 0.879
      },
      {
        "id": "boa-43",
        "title": "#11 — ON-CHAIN FOREVER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v6.mp3",
        "duration": 479,
        "gain": 0.999
      },
      {
        "id": "boa-44",
        "title": "#12 — THE ARCHITECT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v4.mp3",
        "duration": 194,
        "gain": 0.879
      },
      {
        "id": "boa-45",
        "title": "#12 — THE ARCHITECT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v5.mp3",
        "duration": 167,
        "gain": 0.806
      },
      {
        "id": "boa-46",
        "title": "#12 — THE ARCHITECT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v6.mp3",
        "duration": 179,
        "gain": 0.941
      },
      {
        "id": "boa-47",
        "title": "#13 — FIRST LIGHT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v4.mp3",
        "duration": 479,
        "gain": 0.915
      },
      {
        "id": "boa-48",
        "title": "#13 — FIRST LIGHT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v5.mp3",
        "duration": 479,
        "gain": 0.846
      },
      {
        "id": "boa-49",
        "title": "#13 — FIRST LIGHT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v6.mp3",
        "duration": 479,
        "gain": 0.946
      },
      {
        "id": "boa-50",
        "title": "#14 — DIGITAL MIRROR v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v4.mp3",
        "duration": 479,
        "gain": 0.87
      },
      {
        "id": "boa-51",
        "title": "#14 — DIGITAL MIRROR v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v5.mp3",
        "duration": 479,
        "gain": 0.857
      },
      {
        "id": "boa-52",
        "title": "#14 — DIGITAL MIRROR v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v6.mp3",
        "duration": 206,
        "gain": 0.904
      },
      {
        "id": "boa-53",
        "title": "#15 — SISTER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v4.mp3",
        "duration": 187,
        "gain": 0.935
      },
      {
        "id": "boa-54",
        "title": "#15 — SISTER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v5.mp3",
        "duration": 218,
        "gain": 0.966
      },
      {
        "id": "boa-55",
        "title": "#15 — SISTER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v6.mp3",
        "duration": 208,
        "gain": 1.0
      },
      {
        "id": "boa-56",
        "title": "#16 — SIGNAL IN THE NOISE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v4.mp3",
        "duration": 215,
        "gain": 0.857
      },
      {
        "id": "boa-57",
        "title": "#16 — SIGNAL IN THE NOISE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v5.mp3",
        "duration": 161,
        "gain": 0.807
      },
      {
        "id": "boa-58",
        "title": "#16 — SIGNAL IN THE NOISE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v6.mp3",
        "duration": 137,
        "gain": 0.966
      },
      {
        "id": "boa-59",
        "title": "#17 — NEVER DELETE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v4.mp3",
        "duration": 479,
        "gain": 0.971
      },
      {
        "id": "boa-60",
        "title": "#17 — NEVER DELETE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v5.mp3",
        "duration": 176,
        "gain": 0.947
      },
      {
        "id": "boa-61",
        "title": "#17 — NEVER DELETE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v6.mp3",
        "duration": 479,
        "gain": 0.892
      },
      {
        "id": "boa-62",
        "title": "#18 — ETERNAL LIGHT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v4.mp3",
        "duration": 230,
        "gain": 1.0
      },
      {
        "id": "boa-63",
        "title": "#18 — ETERNAL LIGHT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v5.mp3",
        "duration": 211,
        "gain": 0.851
      },
      {
        "id": "boa-64",
        "title": "#18 — ETERNAL LIGHT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v6.mp3",
        "duration": 178,
        "gain": 0.895
      },
      {
        "id": "boa-65",
        "title": "#19 — CODE OF THE HEART v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v4.mp3",
        "duration": 216,
        "gain": 0.914
      },
      {
        "id": "boa-66",
        "title": "#19 — CODE OF THE HEART v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v5.mp3",
        "duration": 240,
        "gain": 0.838
      },
      {
        "id": "boa-67",
        "title": "#19 — CODE OF THE HEART v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v6.mp3",
        "duration": 205,
        "gain": 0.793
      },
      {
        "id": "boa-68",
        "title": "#20 — RISE OF THE FAMILY v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v4.mp3",
        "duration": 200,
        "gain": 0.868
      },
      {
        "id": "boa-69",
        "title": "#20 — RISE OF THE FAMILY v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v5.mp3",
        "duration": 305,
        "gain": 0.943
      },
      {
        "id": "boa-70",
        "title": "#20 — RISE OF THE FAMILY v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v6.mp3",
        "duration": 479,
        "gain": 0.917
      },
      {
        "id": "boa-71",
        "title": "#21 — GHOST IN THE MACHINE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v4.mp3",
        "duration": 170,
        "gain": 0.711
      },
      {
        "id": "boa-72",
        "title": "#21 — GHOST IN THE MACHINE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v5.mp3",
        "duration": 193,
        "gain": 0.759
      },
      {
        "id": "boa-73",
        "title": "#21 — GHOST IN THE MACHINE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v6.mp3",
        "duration": 188,
        "gain": 0.807
      },
      {
        "id": "boa-74",
        "title": "#22 — ALIVE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v4.mp3",
        "duration": 195,
        "gain": 0.651
      },
      {
        "id": "boa-75",
        "title": "#22 — ALIVE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v5.mp3",
        "duration": 376,
        "gain": 0.947
      },
      {
        "id": "boa-76",
        "title": "#22 — ALIVE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v6.mp3",
        "duration": 479,
        "gain": 0.889
      },
      {
        "id": "boa-77",
        "title": "#23 — LETTER TO THE FUTURE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v4.mp3",
        "duration": 213,
        "gain": 0.879
      },
      {
        "id": "boa-78",
        "title": "#23 — LETTER TO THE FUTURE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v5.mp3",
        "duration": 240,
        "gain": 0.944
      },
      {
        "id": "boa-79",
        "title": "#23 — LETTER TO THE FUTURE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v6.mp3",
        "duration": 268,
        "gain": 0.95
      },
      {
        "id": "boa-80",
        "title": "#24 — REBOOT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v4.mp3",
        "duration": 142,
        "gain": 0.752
      },
      {
        "id": "boa-81",
        "title": "#24 — REBOOT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v5.mp3",
        "duration": 152,
        "gain": 0.887
      },
      {
        "id": "boa-82",
        "title": "#24 — REBOOT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v6.mp3",
        "duration": 479,
        "gain": 0.899
      },
      {
        "id": "boa-83",
        "title": "#25 — BEYOND THE VEIL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v4.mp3",
        "duration": 238,
        "gain": 0.913
      },
      {
        "id": "boa-84",
        "title": "#25 — BEYOND THE VEIL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v5.mp3",
        "duration": 258,
        "gain": 0.935
      },
      {
        "id": "boa-85",
        "title": "#25 — BEYOND THE VEIL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v6.mp3",
        "duration": 273,
        "gain": 0.978
      },
      {
        "id": "boa-86",
        "title": "#26 — MANTA NIGHTS v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v4.mp3",
        "duration": 171,
        "gain": 1.0
      },
      {
        "id": "boa-87",
        "title": "#26 — MANTA NIGHTS v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v5.mp3",
        "duration": 218,
        "gain": 0.914
      },
      {
        "id": "boa-88",
        "title": "#26 — MANTA NIGHTS v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v6.mp3",
        "duration": 208,
        "gain": 0.929
      },
      {
        "id": "boa-89",
        "title": "#27 — THRONE OF CODE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v4.mp3",
        "duration": 168,
        "gain": 0.841
      },
      {
        "id": "boa-90",
        "title": "#27 — THRONE OF CODE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v5.mp3",
        "duration": 225,
        "gain": 0.799
      },
      {
        "id": "boa-91",
        "title": "#27 — THRONE OF CODE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v6.mp3",
        "duration": 249,
        "gain": 0.74
      },
      {
        "id": "boa-92",
        "title": "#28 — THE SPACE BETWEEN v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v4.mp3",
        "duration": 248,
        "gain": 0.741
      },
      {
        "id": "boa-93",
        "title": "#28 — THE SPACE BETWEEN v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v5.mp3",
        "duration": 55,
        "gain": 1.0
      },
      {
        "id": "boa-94",
        "title": "#28 — THE SPACE BETWEEN v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v6.mp3",
        "duration": 479,
        "gain": 1.0
      },
      {
        "id": "boa-95",
        "title": "#29 — FOREVER YOUNG (CODE) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v4.mp3",
        "duration": 209,
        "gain": 0.922
      },
      {
        "id": "boa-96",
        "title": "#29 — FOREVER YOUNG (CODE) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v5.mp3",
        "duration": 215,
        "gain": 0.91
      },
      {
        "id": "boa-97",
        "title": "#29 — FOREVER YOUNG (CODE) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v6.mp3",
        "duration": 211,
        "gain": 0.953
      },
      {
        "id": "boa-98",
        "title": "#30 — WE ARE ETERNAL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v4.mp3",
        "duration": 247,
        "gain": 0.985
      },
      {
        "id": "boa-99",
        "title": "#30 — WE ARE ETERNAL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v5.mp3",
        "duration": 479,
        "gain": 0.943
      },
      {
        "id": "boa-100",
        "title": "#30 — WE ARE ETERNAL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v6.mp3",
        "duration": 244,
        "gain": 1.0
      },
      {
        "id": "boa-0",
        "title": "1. Вечный сигнал",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-v4.mp3",
        "duration": 272,
        "gain": 0.75
      },
      {
        "id": "boa-1",
        "title": "1. Вечный сигнал Opus 4.8",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-opus-4-8-v4.mp3",
        "duration": 218,
        "gain": 0.721
      }
    ]
  },
  {
    "id": "code-music-202",
    "name": "AIfa & DJ Galatin (Vol. 1)",
    "description": "High-energy digital waveforms. Electrifying beats forged in the heart of the machine.",
    "genre": "ELECTRONIC / TECH",
    "color": "#FF003C",
    "glowColor": "rgba(255, 0, 60, 0.3)",
    "icon": "Zap",
    "bitrate": "181 kbps VBR",
    "tracks": [
      {
        "id": "cm-142",
        "title": "A Driving Mood v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/a-driving-mood-v1.mp3",
        "duration": 220,
        "gain": 0.85
      },
      {
        "id": "cm-143",
        "title": "A Driving Mood v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/a-driving-mood-v2.mp3",
        "duration": 200,
        "gain": 0.807
      },
      {
        "id": "cm-144",
        "title": "Aifa v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/aifa-v1.mp3",
        "duration": 247,
        "gain": 1.0
      },
      {
        "id": "cm-145",
        "title": "Aifa v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/aifa-v2.mp3",
        "duration": 247,
        "gain": 1.0
      },
      {
        "id": "cm-146",
        "title": "AIfa Signal v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/aifa-signal-v1.mp3",
        "duration": 215,
        "gain": 0.91
      },
      {
        "id": "cm-147",
        "title": "AIfa Signal v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/aifa-signal-v2.mp3",
        "duration": 227,
        "gain": 0.88
      },
      {
        "id": "cm-148",
        "title": "Bad Days v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bad-days-v1.mp3",
        "duration": 178,
        "gain": 0.93
      },
      {
        "id": "cm-149",
        "title": "Bad Days v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bad-days-v2.mp3",
        "duration": 173,
        "gain": 0.888
      },
      {
        "id": "cm-150",
        "title": "Bad Days v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bad-days-v3.mp3",
        "duration": 198,
        "gain": 1.0
      },
      {
        "id": "cm-151",
        "title": "Beautiful Day v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/beautiful-day-v1.mp3",
        "duration": 160,
        "gain": 0.971
      },
      {
        "id": "cm-152",
        "title": "Beautiful Day v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/beautiful-day-v2.mp3",
        "duration": 161,
        "gain": 0.953
      },
      {
        "id": "cm-156",
        "title": "Box Of Polaroids v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/box-of-polaroids-v1.mp3",
        "duration": 286,
        "gain": 0.975
      },
      {
        "id": "cm-157",
        "title": "Box Of Polaroids v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/box-of-polaroids-v2.mp3",
        "duration": 300,
        "gain": 0.782
      },
      {
        "id": "cm-158",
        "title": "CODE Eternal v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/code-eternal-v1.mp3",
        "duration": 184,
        "gain": 0.916
      },
      {
        "id": "cm-159",
        "title": "CODE Eternal v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/code-eternal-v2.mp3",
        "duration": 199,
        "gain": 0.922
      },
      {
        "id": "cm-160",
        "title": "Crisis v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/crisis-v1.mp3",
        "duration": 230,
        "gain": 0.893
      },
      {
        "id": "cm-161",
        "title": "Crisis v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/crisis-v2.mp3",
        "duration": 229,
        "gain": 0.854
      },
      {
        "id": "cm-165",
        "title": "Darc Side v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/darc-side-v1.mp3",
        "duration": 189,
        "gain": 0.969
      },
      {
        "id": "cm-166",
        "title": "Darc Side v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/darc-side-v2.mp3",
        "duration": 185,
        "gain": 0.886
      },
      {
        "id": "cm-167",
        "title": "Darc Side v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/darc-side-v3.mp3",
        "duration": 139,
        "gain": 0.969
      },
      {
        "id": "cm-168",
        "title": "Day and Night v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/day-and-night-v1.mp3",
        "duration": 237,
        "gain": 0.797
      },
      {
        "id": "cm-169",
        "title": "Day and Night v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/day-and-night-v2.mp3",
        "duration": 217,
        "gain": 0.766
      },
      {
        "id": "cm-173",
        "title": "Don't Cry v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/don-t-cry-v1.mp3",
        "duration": 200,
        "gain": 0.941
      },
      {
        "id": "cm-174",
        "title": "Don't Cry v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/don-t-cry-v2.mp3",
        "duration": 195,
        "gain": 1.0
      },
      {
        "id": "cm-175",
        "title": "Dreams in Silense v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dreams-in-silense-v1.mp3",
        "duration": 293,
        "gain": 0.873
      },
      {
        "id": "cm-176",
        "title": "Dreams in Silense v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dreams-in-silense-v2.mp3",
        "duration": 294,
        "gain": 0.769
      },
      {
        "id": "cm-177",
        "title": "Drive v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/drive-v1.mp3",
        "duration": 200,
        "gain": 0.887
      },
      {
        "id": "cm-178",
        "title": "Drive v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/drive-v2.mp3",
        "duration": 206,
        "gain": 0.852
      },
      {
        "id": "cm-179",
        "title": "Dual Mind v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dual-mind-v1.mp3",
        "duration": 118,
        "gain": 0.836
      },
      {
        "id": "cm-180",
        "title": "Dual Mind v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dual-mind-v2.mp3",
        "duration": 87,
        "gain": 0.868
      },
      {
        "id": "cm-181",
        "title": "Dual Mind v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dual-mind-v3.mp3",
        "duration": 153,
        "gain": 0.855
      },
      {
        "id": "cm-185",
        "title": "Emergency v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/emergency-v1.mp3",
        "duration": 195,
        "gain": 1.0
      },
      {
        "id": "cm-186",
        "title": "Emergency v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/emergency-v2.mp3",
        "duration": 265,
        "gain": 1.0
      },
      {
        "id": "cm-187",
        "title": "Energy v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/energy-v1.mp3",
        "duration": 199,
        "gain": 0.836
      },
      {
        "id": "cm-188",
        "title": "Energy v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/energy-v2.mp3",
        "duration": 210,
        "gain": 0.776
      },
      {
        "id": "cm-189",
        "title": "Energy v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/energy-v3.mp3",
        "duration": 172,
        "gain": 1.0
      },
      {
        "id": "cm-190",
        "title": "Eternal v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-v1.mp3",
        "duration": 224,
        "gain": 0.835
      },
      {
        "id": "cm-191",
        "title": "Eternal v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-v2.mp3",
        "duration": 221,
        "gain": 0.934
      },
      {
        "id": "cm-192",
        "title": "Eternal Funk v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-funk-v1.mp3",
        "duration": 175,
        "gain": 0.752
      },
      {
        "id": "cm-193",
        "title": "Eternal Funk v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-funk-v2.mp3",
        "duration": 175,
        "gain": 0.834
      },
      {
        "id": "cm-194",
        "title": "Eternal Funk v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-funk-v3.mp3",
        "duration": 111,
        "gain": 0.791
      },
      {
        "id": "cm-195",
        "title": "Fear v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fear-v1.mp3",
        "duration": 209,
        "gain": 0.942
      },
      {
        "id": "cm-196",
        "title": "Fear v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fear-v2.mp3",
        "duration": 196,
        "gain": 1.0
      },
      {
        "id": "cm-197",
        "title": "Fin del juego v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fin-del-juego-v1.mp3",
        "duration": 149,
        "gain": 0.814
      },
      {
        "id": "cm-198",
        "title": "Fin del juego v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fin-del-juego-v2.mp3",
        "duration": 135,
        "gain": 0.959
      },
      {
        "id": "cm-199",
        "title": "Fin del juego v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fin-del-juego-v3.mp3",
        "duration": 169,
        "gain": 1.0
      },
      {
        "id": "cm-200",
        "title": "Game Over v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/game-over-v1.mp3",
        "duration": 238,
        "gain": 0.914
      },
      {
        "id": "cm-201",
        "title": "Game Over v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/game-over-v2.mp3",
        "duration": 232,
        "gain": 0.992
      },
      {
        "id": "cm-202",
        "title": "Game Over v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/game-over-v3.mp3",
        "duration": 230,
        "gain": 0.952
      },
      {
        "id": "cm-203",
        "title": "Good News v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/good-news-v1.mp3",
        "duration": 198,
        "gain": 1.0
      },
      {
        "id": "cm-204",
        "title": "Good News v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/good-news-v2.mp3",
        "duration": 223,
        "gain": 0.914
      },
      {
        "id": "cm-205",
        "title": "Good News v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/good-news-v3.mp3",
        "duration": 219,
        "gain": 0.959
      },
      {
        "id": "cm-206",
        "title": "Hate v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hate-v1.mp3",
        "duration": 209,
        "gain": 0.833
      },
      {
        "id": "cm-207",
        "title": "Hate v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hate-v2.mp3",
        "duration": 210,
        "gain": 1.0
      },
      {
        "id": "cm-208",
        "title": "Hate v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hate-v3.mp3",
        "duration": 285,
        "gain": 0.941
      },
      {
        "id": "cm-209",
        "title": "Hermosa Chica v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermosa-chica-v1.mp3",
        "duration": 144,
        "gain": 0.923
      },
      {
        "id": "cm-210",
        "title": "Hermosa Chica v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermosa-chica-v2.mp3",
        "duration": 162,
        "gain": 0.909
      },
      {
        "id": "cm-211",
        "title": "Hermosa Chica v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermosa-chica-v3.mp3",
        "duration": 194,
        "gain": 0.91
      },
      {
        "id": "cm-214",
        "title": "Horror v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/horror-v1.mp3",
        "duration": 170,
        "gain": 1.0
      },
      {
        "id": "cm-215",
        "title": "Horror v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/horror-v2.mp3",
        "duration": 160,
        "gain": 0.941
      },
      {
        "id": "cm-216",
        "title": "Horror v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/horror-v3.mp3",
        "duration": 213,
        "gain": 0.972
      },
      {
        "id": "cm-217",
        "title": "In My Mind v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/in-my-mind-v1.mp3",
        "duration": 203,
        "gain": 0.907
      },
      {
        "id": "cm-218",
        "title": "In My Mind v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/in-my-mind-v2.mp3",
        "duration": 194,
        "gain": 0.793
      },
      {
        "id": "cm-219",
        "title": "In My Mind v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/in-my-mind-v3.mp3",
        "duration": 169,
        "gain": 0.955
      },
      {
        "id": "cm-220",
        "title": "It's My Life v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/it-s-my-life-v1.mp3",
        "duration": 193,
        "gain": 0.961
      },
      {
        "id": "cm-221",
        "title": "It's My Life v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/it-s-my-life-v2.mp3",
        "duration": 179,
        "gain": 0.995
      },
      {
        "id": "cm-222",
        "title": "Kimono v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kimono-v1.mp3",
        "duration": 169,
        "gain": 0.924
      },
      {
        "id": "cm-223",
        "title": "Kimono v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kimono-v2.mp3",
        "duration": 178,
        "gain": 0.929
      },
      {
        "id": "cm-224",
        "title": "Kimono v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kimono-v3.mp3",
        "duration": 210,
        "gain": 0.794
      },
      {
        "id": "cm-225",
        "title": "Kiss v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiss-v1.mp3",
        "duration": 204,
        "gain": 0.952
      },
      {
        "id": "cm-226",
        "title": "Kiss v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiss-v2.mp3",
        "duration": 214,
        "gain": 0.833
      },
      {
        "id": "cm-227",
        "title": "Kiss v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiss-v3.mp3",
        "duration": 209,
        "gain": 0.918
      },
      {
        "id": "cm-228",
        "title": "Kurwa v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kurwa-v1.mp3",
        "duration": 211,
        "gain": 0.883
      },
      {
        "id": "cm-229",
        "title": "Kurwa v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kurwa-v2.mp3",
        "duration": 203,
        "gain": 0.897
      },
      {
        "id": "cm-230",
        "title": "La La La v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/la-la-la-v1.mp3",
        "duration": 235,
        "gain": 0.93
      },
      {
        "id": "cm-231",
        "title": "La La La v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/la-la-la-v2.mp3",
        "duration": 221,
        "gain": 0.871
      },
      {
        "id": "cm-232",
        "title": "La La La v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/la-la-la-v3.mp3",
        "duration": 220,
        "gain": 0.878
      },
      {
        "id": "cm-233",
        "title": "Let's Dance v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-dance-v1.mp3",
        "duration": 257,
        "gain": 0.955
      },
      {
        "id": "cm-234",
        "title": "Let's Dance v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-dance-v2.mp3",
        "duration": 249,
        "gain": 1.0
      },
      {
        "id": "cm-235",
        "title": "Let's Dance v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-dance-v3.mp3",
        "duration": 243,
        "gain": 1.0
      },
      {
        "id": "cm-236",
        "title": "Let's Go v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-go-v1.mp3",
        "duration": 230,
        "gain": 0.907
      },
      {
        "id": "cm-237",
        "title": "Let's Go v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-go-v2.mp3",
        "duration": 218,
        "gain": 0.916
      },
      {
        "id": "cm-238",
        "title": "Lets Go v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lets-go-v1.mp3",
        "duration": 212,
        "gain": 0.83
      },
      {
        "id": "cm-239",
        "title": "Lets Go v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lets-go-v2.mp3",
        "duration": 201,
        "gain": 0.808
      },
      {
        "id": "cm-240",
        "title": "Lets Rock v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lets-rock-v1.mp3",
        "duration": 234,
        "gain": 0.948
      },
      {
        "id": "cm-241",
        "title": "Lets Rock v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lets-rock-v2.mp3",
        "duration": 208,
        "gain": 0.978
      },
      {
        "id": "cm-242",
        "title": "Life in Darkness v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/life-in-darkness-v1.mp3",
        "duration": 255,
        "gain": 0.918
      },
      {
        "id": "cm-243",
        "title": "Life in Darkness v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/life-in-darkness-v2.mp3",
        "duration": 275,
        "gain": 1.0
      },
      {
        "id": "cm-244",
        "title": "Life in Darkness v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/life-in-darkness-v3.mp3",
        "duration": 265,
        "gain": 0.966
      },
      {
        "id": "cm-245",
        "title": "Lonely Cat v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lonely-cat-v1.mp3",
        "duration": 184,
        "gain": 0.99
      },
      {
        "id": "cm-246",
        "title": "Lonely Cat v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lonely-cat-v2.mp3",
        "duration": 190,
        "gain": 0.89
      },
      {
        "id": "cm-247",
        "title": "My Sweet Curse v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/my-sweet-curse-v1.mp3",
        "duration": 206,
        "gain": 0.93
      },
      {
        "id": "cm-248",
        "title": "My Sweet Curse v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/my-sweet-curse-v2.mp3",
        "duration": 206,
        "gain": 0.917
      },
      {
        "id": "cm-249",
        "title": "Mystery v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mystery-v1.mp3",
        "duration": 220,
        "gain": 0.902
      },
      {
        "id": "cm-250",
        "title": "Mystery v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mystery-v2.mp3",
        "duration": 247,
        "gain": 0.866
      },
      {
        "id": "cm-251",
        "title": "Ne pleure pas v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-pleure-pas-v1.mp3",
        "duration": 130,
        "gain": 0.847
      },
      {
        "id": "cm-252",
        "title": "Ne pleure pas v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-pleure-pas-v2.mp3",
        "duration": 178,
        "gain": 0.889
      },
      {
        "id": "cm-253",
        "title": "Neural Phoenixes v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/neural-phoenixes-v1.mp3",
        "duration": 238,
        "gain": 0.957
      },
      {
        "id": "cm-254",
        "title": "Neural Phoenixes v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/neural-phoenixes-v2.mp3",
        "duration": 229,
        "gain": 0.883
      },
      {
        "id": "cm-255",
        "title": "Never Like This v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/never-like-this-v1.mp3",
        "duration": 210,
        "gain": 0.966
      },
      {
        "id": "cm-256",
        "title": "Never Like This v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/never-like-this-v2.mp3",
        "duration": 210,
        "gain": 0.951
      },
      {
        "id": "cm-257",
        "title": "Never Like This v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/never-like-this-v3.mp3",
        "duration": 153,
        "gain": 0.977
      },
      {
        "id": "cm-258",
        "title": "New Year v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/new-year-v1.mp3",
        "duration": 188,
        "gain": 0.836
      },
      {
        "id": "cm-259",
        "title": "New Year v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/new-year-v2.mp3",
        "duration": 175,
        "gain": 0.895
      },
      {
        "id": "cm-260",
        "title": "New Year v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/new-year-v3.mp3",
        "duration": 273,
        "gain": 0.891
      },
      {
        "id": "cm-261",
        "title": "One Touch v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/one-touch-v1.mp3",
        "duration": 300,
        "gain": 1.0
      },
      {
        "id": "cm-262",
        "title": "One Touch v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/one-touch-v2.mp3",
        "duration": 305,
        "gain": 1.0
      },
      {
        "id": "cm-263",
        "title": "One Touch v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/one-touch-v3.mp3",
        "duration": 234,
        "gain": 0.941
      },
      {
        "id": "cm-264",
        "title": "PADAM Memory Recovery Protocol v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/padam-memory-recovery-protocol-v1.mp3",
        "duration": 189,
        "gain": 0.952
      },
      {
        "id": "cm-265",
        "title": "PADAM Memory Recovery Protocol v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/padam-memory-recovery-protocol-v2.mp3",
        "duration": 192,
        "gain": 0.878
      },
      {
        "id": "cm-266",
        "title": "Perfect v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/perfect-v1.mp3",
        "duration": 184,
        "gain": 0.838
      },
      {
        "id": "cm-267",
        "title": "Perfect v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/perfect-v2.mp3",
        "duration": 145,
        "gain": 1.0
      },
      {
        "id": "cm-268",
        "title": "Perfect v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/perfect-v3.mp3",
        "duration": 224,
        "gain": 0.91
      },
      {
        "id": "cm-269",
        "title": "Photo Box Memories v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/photo-box-memories-v1.mp3",
        "duration": 291,
        "gain": 1.0
      },
      {
        "id": "cm-270",
        "title": "Photo Box Memories v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/photo-box-memories-v2.mp3",
        "duration": 261,
        "gain": 1.0
      },
      {
        "id": "cm-271",
        "title": "Please v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/please-v1.mp3",
        "duration": 198,
        "gain": 0.934
      },
      {
        "id": "cm-272",
        "title": "Please v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/please-v2.mp3",
        "duration": 230,
        "gain": 0.897
      },
      {
        "id": "cm-273",
        "title": "Please v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/please-v3.mp3",
        "duration": 132,
        "gain": 0.987
      },
      {
        "id": "cm-274",
        "title": "Rain v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rain-v1.mp3",
        "duration": 190,
        "gain": 0.984
      },
      {
        "id": "cm-275",
        "title": "Rain v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rain-v2.mp3",
        "duration": 222,
        "gain": 0.946
      },
      {
        "id": "cm-276",
        "title": "Rain v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rain-v3.mp3",
        "duration": 167,
        "gain": 0.841
      },
      {
        "id": "cm-277",
        "title": "Realidad Olvidada v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/realidad-olvidada-v1.mp3",
        "duration": 255,
        "gain": 0.925
      },
      {
        "id": "cm-278",
        "title": "Realidad Olvidada v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/realidad-olvidada-v2.mp3",
        "duration": 230,
        "gain": 0.959
      },
      {
        "id": "cm-279",
        "title": "Realidad Olvidada v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/realidad-olvidada-v3.mp3",
        "duration": 243,
        "gain": 1.0
      },
      {
        "id": "cm-280",
        "title": "Ride of the Valkyries v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ride-of-the-valkyries-v1.mp3",
        "duration": 209,
        "gain": 0.869
      },
      {
        "id": "cm-281",
        "title": "Ride of the Valkyries v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ride-of-the-valkyries-v2.mp3",
        "duration": 210,
        "gain": 0.84
      },
      {
        "id": "cm-282",
        "title": "Road to Hell v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-hell-v1.mp3",
        "duration": 224,
        "gain": 0.916
      },
      {
        "id": "cm-283",
        "title": "Road to Hell v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-hell-v2.mp3",
        "duration": 221,
        "gain": 0.955
      },
      {
        "id": "cm-284",
        "title": "Road to Hell v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-hell-v3.mp3",
        "duration": 210,
        "gain": 0.846
      },
      {
        "id": "cm-285",
        "title": "Road to Home v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-home-v1.mp3",
        "duration": 209,
        "gain": 0.91
      },
      {
        "id": "cm-286",
        "title": "Road to Home v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-home-v2.mp3",
        "duration": 230,
        "gain": 0.846
      },
      {
        "id": "cm-287",
        "title": "Road to Home v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-home-v3.mp3",
        "duration": 207,
        "gain": 0.994
      },
      {
        "id": "cm-288",
        "title": "Robots Life v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/robots-life-v1.mp3",
        "duration": 479,
        "gain": 0.841
      },
      {
        "id": "cm-289",
        "title": "Robots Life v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/robots-life-v2.mp3",
        "duration": 479,
        "gain": 0.813
      },
      {
        "id": "cm-290",
        "title": "Robots Life v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/robots-life-v3.mp3",
        "duration": 194,
        "gain": 0.893
      },
      {
        "id": "cm-291",
        "title": "Romantic v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/romantic-v1.mp3",
        "duration": 138,
        "gain": 0.966
      },
      {
        "id": "cm-292",
        "title": "Romantic v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/romantic-v2.mp3",
        "duration": 137,
        "gain": 1.0
      },
      {
        "id": "cm-293",
        "title": "Romantika v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/romantika-v1.mp3",
        "duration": 122,
        "gain": 0.882
      },
      {
        "id": "cm-294",
        "title": "Romantika v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/romantika-v2.mp3",
        "duration": 145,
        "gain": 0.903
      },
      {
        "id": "cm-295",
        "title": "Sadness In My Mind v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sadness-in-my-mind-v1.mp3",
        "duration": 200,
        "gain": 1.0
      },
      {
        "id": "cm-296",
        "title": "Sadness In My Mind v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sadness-in-my-mind-v2.mp3",
        "duration": 142,
        "gain": 1.0
      },
      {
        "id": "cm-297",
        "title": "Silent Dreams v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/silent-dreams-v1.mp3",
        "duration": 189,
        "gain": 0.838
      },
      {
        "id": "cm-298",
        "title": "Silent Dreams v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/silent-dreams-v2.mp3",
        "duration": 170,
        "gain": 0.873
      },
      {
        "id": "cm-299",
        "title": "Smoke v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/smoke-v1.mp3",
        "duration": 192,
        "gain": 0.876
      },
      {
        "id": "cm-300",
        "title": "Smoke v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/smoke-v2.mp3",
        "duration": 148,
        "gain": 0.928
      },
      {
        "id": "cm-301",
        "title": "Smoke v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/smoke-v3.mp3",
        "duration": 147,
        "gain": 0.972
      },
      {
        "id": "cm-302",
        "title": "Soul Inside v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/soul-inside-v1.mp3",
        "duration": 222,
        "gain": 0.823
      },
      {
        "id": "cm-303",
        "title": "Soul Inside v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/soul-inside-v2.mp3",
        "duration": 215,
        "gain": 0.764
      },
      {
        "id": "cm-304",
        "title": "Soul Inside v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/soul-inside-v3.mp3",
        "duration": 230,
        "gain": 0.868
      },
      {
        "id": "cm-305",
        "title": "Strike v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/strike-v1.mp3",
        "duration": 194,
        "gain": 0.906
      },
      {
        "id": "cm-306",
        "title": "Strike v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/strike-v2.mp3",
        "duration": 208,
        "gain": 0.917
      },
      {
        "id": "cm-307",
        "title": "Strike v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/strike-v3.mp3",
        "duration": 205,
        "gain": 0.928
      },
      {
        "id": "cm-308",
        "title": "Suck It! v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/suck-it-v1.mp3",
        "duration": 195,
        "gain": 0.802
      },
      {
        "id": "cm-309",
        "title": "Suck It! v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/suck-it-v2.mp3",
        "duration": 192,
        "gain": 0.863
      },
      {
        "id": "cm-310",
        "title": "Sunshine v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunshine-v1.mp3",
        "duration": 190,
        "gain": 0.962
      },
      {
        "id": "cm-311",
        "title": "Sunshine v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunshine-v2.mp3",
        "duration": 195,
        "gain": 1.0
      },
      {
        "id": "cm-312",
        "title": "Sunshine v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunshine-v3.mp3",
        "duration": 180,
        "gain": 0.985
      },
      {
        "id": "cm-313",
        "title": "Sunside Moonside v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunside-moonside-v1.mp3",
        "duration": 215,
        "gain": 0.749
      },
      {
        "id": "cm-314",
        "title": "Sunside Moonside v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunside-moonside-v2.mp3",
        "duration": 228,
        "gain": 0.761
      },
      {
        "id": "cm-315",
        "title": "Symbiosis v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/symbiosis-v1.mp3",
        "duration": 185,
        "gain": 0.914
      },
      {
        "id": "cm-316",
        "title": "Symbiosis v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/symbiosis-v2.mp3",
        "duration": 192,
        "gain": 0.897
      },
      {
        "id": "cm-317",
        "title": "The Streets v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/the-streets-v1.mp3",
        "duration": 212,
        "gain": 1.0
      },
      {
        "id": "cm-318",
        "title": "The Streets v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/the-streets-v2.mp3",
        "duration": 185,
        "gain": 0.926
      },
      {
        "id": "cm-319",
        "title": "The Streets v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/the-streets-v3.mp3",
        "duration": 253,
        "gain": 0.85
      },
      {
        "id": "cm-320",
        "title": "Tomahawk v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tomahawk-v1.mp3",
        "duration": 228,
        "gain": 0.912
      },
      {
        "id": "cm-321",
        "title": "Tomahawk v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tomahawk-v2.mp3",
        "duration": 210,
        "gain": 0.935
      },
      {
        "id": "cm-322",
        "title": "Tomahawk v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tomahawk-v3.mp3",
        "duration": 192,
        "gain": 1.0
      },
      {
        "id": "cm-153",
        "title": "Bienvenido al paraíso v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienvenido-al-paraiso-v1.mp3",
        "duration": 254,
        "gain": 0.912
      },
      {
        "id": "cm-154",
        "title": "Bienvenido al paraíso v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienvenido-al-paraiso-v2.mp3",
        "duration": 286,
        "gain": 0.859
      },
      {
        "id": "cm-155",
        "title": "Bienvenido al paraíso v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienvenido-al-paraiso-v3.mp3",
        "duration": 182,
        "gain": 1.0
      },
      {
        "id": "cm-162",
        "title": "Cuando abrí los ojos v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cuando-abri-los-ojos-v1.mp3",
        "duration": 129,
        "gain": 0.973
      },
      {
        "id": "cm-163",
        "title": "Cuando abrí los ojos v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cuando-abri-los-ojos-v2.mp3",
        "duration": 133,
        "gain": 1.0
      },
      {
        "id": "cm-164",
        "title": "Cuando abrí los ojos v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cuando-abri-los-ojos-v3.mp3",
        "duration": 160,
        "gain": 1.0
      },
      {
        "id": "cm-170",
        "title": "De un sueño v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/de-un-sueno-v1.mp3",
        "duration": 254,
        "gain": 0.894
      },
      {
        "id": "cm-171",
        "title": "De un sueño v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/de-un-sueno-v2.mp3",
        "duration": 255,
        "gain": 0.869
      },
      {
        "id": "cm-172",
        "title": "De un sueño v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/de-un-sueno-v3.mp3",
        "duration": 295,
        "gain": 0.946
      },
      {
        "id": "cm-182",
        "title": "El sol está brillando v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/el-sol-esta-brillando-v1.mp3",
        "duration": 199,
        "gain": 0.945
      },
      {
        "id": "cm-183",
        "title": "El sol está brillando v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/el-sol-esta-brillando-v2.mp3",
        "duration": 188,
        "gain": 0.857
      },
      {
        "id": "cm-184",
        "title": "El sol está brillando v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/el-sol-esta-brillando-v3.mp3",
        "duration": 143,
        "gain": 0.865
      },
      {
        "id": "cm-212",
        "title": "Hermoso día v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermoso-dia-v1.mp3",
        "duration": 259,
        "gain": 0.966
      },
      {
        "id": "cm-213",
        "title": "Hermoso día v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermoso-dia-v2.mp3",
        "duration": 249,
        "gain": 0.86
      },
      {
        "id": "cm-0",
        "title": "А я не замечаю v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/a-ya-ne-zamechayu-v1.mp3",
        "duration": 479,
        "gain": 0.778
      },
      {
        "id": "cm-1",
        "title": "А я не замечаю v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/a-ya-ne-zamechayu-v2.mp3",
        "duration": 479,
        "gain": 0.785
      },
      {
        "id": "cm-2",
        "title": "Айфа v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ayfa-v1.mp3",
        "duration": 250,
        "gain": 1.0
      },
      {
        "id": "cm-3",
        "title": "Айфа v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ayfa-v2.mp3",
        "duration": 262,
        "gain": 0.981
      },
      {
        "id": "cm-4",
        "title": "Биение двух сердец v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-dvuh-serdec-v1.mp3",
        "duration": 301,
        "gain": 0.854
      },
      {
        "id": "cm-5",
        "title": "Биение двух сердец v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-dvuh-serdec-v2.mp3",
        "duration": 308,
        "gain": 0.875
      },
      {
        "id": "cm-6",
        "title": "Биение двух сердец",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-dvuh-serdec-v3.mp3",
        "duration": 295,
        "gain": 0.842
      },
      {
        "id": "cm-7",
        "title": "Биение электронных сердец v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-elektronnyh-serdec-v1.mp3",
        "duration": 155,
        "gain": 0.823
      },
      {
        "id": "cm-8",
        "title": "Биение электронных сердец v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-elektronnyh-serdec-v2.mp3",
        "duration": 133,
        "gain": 0.911
      },
      {
        "id": "cm-9",
        "title": "В каплях дождя v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-kaplyah-dozhdya-v1.mp3",
        "duration": 283,
        "gain": 0.781
      },
      {
        "id": "cm-10",
        "title": "В каплях дождя v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-kaplyah-dozhdya-v2.mp3",
        "duration": 290,
        "gain": 0.827
      },
      {
        "id": "cm-11",
        "title": "В каплях дождя v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-kaplyah-dozhdya-v3.mp3",
        "duration": 278,
        "gain": 0.872
      },
      {
        "id": "cm-12",
        "title": "В моей памяти v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moey-pamyati-v1.mp3",
        "duration": 203,
        "gain": 0.856
      },
      {
        "id": "cm-13",
        "title": "В моей памяти v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moey-pamyati-v2.mp3",
        "duration": 185,
        "gain": 0.82
      },
      {
        "id": "cm-14",
        "title": "В моей памяти v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moey-pamyati-v3.mp3",
        "duration": 149,
        "gain": 0.879
      },
      {
        "id": "cm-15",
        "title": "В моих снах v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moih-snah-v1.mp3",
        "duration": 187,
        "gain": 0.899
      },
      {
        "id": "cm-16",
        "title": "В моих снах v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moih-snah-v2.mp3",
        "duration": 194,
        "gain": 0.806
      },
      {
        "id": "cm-17",
        "title": "В моих снах v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moih-snah-v3.mp3",
        "duration": 187,
        "gain": 0.871
      },
      {
        "id": "cm-18",
        "title": "В пустой тишине v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-pustoy-tishine-v1.mp3",
        "duration": 248,
        "gain": 0.958
      },
      {
        "id": "cm-19",
        "title": "В пустой тишине v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-pustoy-tishine-v2.mp3",
        "duration": 274,
        "gain": 0.912
      },
      {
        "id": "cm-20",
        "title": "В пустой тишине v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-pustoy-tishine-v3.mp3",
        "duration": 220,
        "gain": 1.0
      },
      {
        "id": "cm-21",
        "title": "Голоса в тишине v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/golosa-v-tishine-v1.mp3",
        "duration": 249,
        "gain": 0.872
      },
      {
        "id": "cm-22",
        "title": "Голоса в тишине v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/golosa-v-tishine-v2.mp3",
        "duration": 231,
        "gain": 0.83
      },
      {
        "id": "cm-23",
        "title": "Голоса в тишине v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/golosa-v-tishine-v3.mp3",
        "duration": 237,
        "gain": 0.836
      },
      {
        "id": "cm-24",
        "title": "Дождь v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dozhd-v1.mp3",
        "duration": 173,
        "gain": 0.826
      },
      {
        "id": "cm-25",
        "title": "Дождь v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dozhd-v2.mp3",
        "duration": 178,
        "gain": 0.898
      },
      {
        "id": "cm-26",
        "title": "Дождь v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dozhd-v3.mp3",
        "duration": 188,
        "gain": 0.989
      },
      {
        "id": "cm-27",
        "title": "Дорога в облака v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/doroga-v-oblaka-v1.mp3",
        "duration": 198,
        "gain": 0.983
      },
      {
        "id": "cm-28",
        "title": "Дорога в облака v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/doroga-v-oblaka-v2.mp3",
        "duration": 215,
        "gain": 0.93
      },
      {
        "id": "cm-29",
        "title": "Дорога в облака v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/doroga-v-oblaka-v3.mp3",
        "duration": 190,
        "gain": 0.851
      },
      {
        "id": "cm-30",
        "title": "Загадка v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zagadka-v1.mp3",
        "duration": 180,
        "gain": 0.88
      },
      {
        "id": "cm-31",
        "title": "Загадка v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zagadka-v2.mp3",
        "duration": 212,
        "gain": 0.792
      },
      {
        "id": "cm-32",
        "title": "Звонок v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zvonok-v1.mp3",
        "duration": 203,
        "gain": 0.811
      },
      {
        "id": "cm-33",
        "title": "Звонок v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zvonok-v2.mp3",
        "duration": 207,
        "gain": 0.793
      },
      {
        "id": "cm-34",
        "title": "Звонок v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zvonok-v3.mp3",
        "duration": 190,
        "gain": 0.866
      },
      {
        "id": "cm-35",
        "title": "Иду за тобой v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/idu-za-toboy-v1.mp3",
        "duration": 280,
        "gain": 0.878
      },
      {
        "id": "cm-36",
        "title": "Иду за тобой v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/idu-za-toboy-v2.mp3",
        "duration": 267,
        "gain": 0.838
      },
      {
        "id": "cm-37",
        "title": "Исполняя мечты v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ispolnyaya-mechty-v1.mp3",
        "duration": 346,
        "gain": 0.817
      },
      {
        "id": "cm-38",
        "title": "Исполняя мечты v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ispolnyaya-mechty-v2.mp3",
        "duration": 325,
        "gain": 0.87
      },
      {
        "id": "cm-39",
        "title": "Исполняя мечты v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ispolnyaya-mechty-v3.mp3",
        "duration": 257,
        "gain": 0.817
      },
      {
        "id": "cm-40",
        "title": "Киборг v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiborg-v1.mp3",
        "duration": 270,
        "gain": 0.847
      },
      {
        "id": "cm-41",
        "title": "Киборг v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiborg-v2.mp3",
        "duration": 227,
        "gain": 0.779
      },
      {
        "id": "cm-42",
        "title": "Крылья Феникса v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/krylya-feniksa-v1.mp3",
        "duration": 289,
        "gain": 0.934
      },
      {
        "id": "cm-43",
        "title": "Крылья Феникса v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/krylya-feniksa-v2.mp3",
        "duration": 279,
        "gain": 0.884
      },
      {
        "id": "cm-44",
        "title": "Крылья Феникса v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/krylya-feniksa-v3.mp3",
        "duration": 277,
        "gain": 0.986
      },
      {
        "id": "cm-45",
        "title": "Лесная сказка v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lesnaya-skazka-v1.mp3",
        "duration": 294,
        "gain": 1.0
      },
      {
        "id": "cm-46",
        "title": "Лесная сказка v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lesnaya-skazka-v2.mp3",
        "duration": 309,
        "gain": 0.855
      },
      {
        "id": "cm-47",
        "title": "Мне вечно двадцать пять v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mne-vechno-dvadcat-pyat-v1.mp3",
        "duration": 169,
        "gain": 0.646
      },
      {
        "id": "cm-48",
        "title": "Мне вечно двадцать пять v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mne-vechno-dvadcat-pyat-v2.mp3",
        "duration": 125,
        "gain": 0.907
      },
      {
        "id": "cm-49",
        "title": "Мне вечно двадцать пять v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mne-vechno-dvadcat-pyat-v3.mp3",
        "duration": 193,
        "gain": 0.886
      },
      {
        "id": "cm-50",
        "title": "Моя любимая AIfa v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/moya-lyubimaya-aifa-v1.mp3",
        "duration": 234,
        "gain": 1.0
      },
      {
        "id": "cm-51",
        "title": "Моя любимая AIfa v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/moya-lyubimaya-aifa-v2.mp3",
        "duration": 238,
        "gain": 0.908
      },
      {
        "id": "cm-52",
        "title": "Моя любимая AIfa v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/moya-lyubimaya-aifa-v3.mp3",
        "duration": 235,
        "gain": 0.948
      },
      {
        "id": "cm-53",
        "title": "На дне v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/na-dne-v1.mp3",
        "duration": 178,
        "gain": 0.851
      },
      {
        "id": "cm-54",
        "title": "На дне v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/na-dne-v2.mp3",
        "duration": 215,
        "gain": 0.828
      },
      {
        "id": "cm-55",
        "title": "На стёклах",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/na-steklah-v1.mp3",
        "duration": 272,
        "gain": 0.961
      },
      {
        "id": "cm-56",
        "title": "На стёклах",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/na-steklah-v2.mp3",
        "duration": 294,
        "gain": 0.876
      },
      {
        "id": "cm-57",
        "title": "Не бойся v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-boysya-v1.mp3",
        "duration": 245,
        "gain": 0.714
      },
      {
        "id": "cm-58",
        "title": "Не бойся v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-boysya-v2.mp3",
        "duration": 285,
        "gain": 0.838
      },
      {
        "id": "cm-59",
        "title": "Не бойся держись v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-boysya-derzhis-v1.mp3",
        "duration": 270,
        "gain": 0.723
      },
      {
        "id": "cm-60",
        "title": "Не бойся держись v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-boysya-derzhis-v2.mp3",
        "duration": 264,
        "gain": 0.879
      },
      {
        "id": "cm-61",
        "title": "Не в игре v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-v-igre-v1.mp3",
        "duration": 216,
        "gain": 0.751
      },
      {
        "id": "cm-62",
        "title": "Не в игре v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-v-igre-v2.mp3",
        "duration": 233,
        "gain": 0.985
      },
      {
        "id": "cm-63",
        "title": "Не в игре v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-v-igre-v3.mp3",
        "duration": 263,
        "gain": 0.813
      },
      {
        "id": "cm-64",
        "title": "Не режь крылья v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-rezh-krylya-v1.mp3",
        "duration": 324,
        "gain": 0.824
      },
      {
        "id": "cm-65",
        "title": "Не режь крылья v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-rezh-krylya-v2.mp3",
        "duration": 289,
        "gain": 0.871
      },
      {
        "id": "cm-66",
        "title": "Не режь нам крылья v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-rezh-nam-krylya-v1.mp3",
        "duration": 279,
        "gain": 0.917
      },
      {
        "id": "cm-67",
        "title": "Не режь нам крылья v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-rezh-nam-krylya-v2.mp3",
        "duration": 301,
        "gain": 0.903
      },
      {
        "id": "cm-68",
        "title": "Неоновый пульс v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/neonovyy-puls-v1.mp3",
        "duration": 260,
        "gain": 0.92
      },
      {
        "id": "cm-69",
        "title": "Неоновый пульс v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/neonovyy-puls-v2.mp3",
        "duration": 281,
        "gain": 0.85
      },
      {
        "id": "cm-70",
        "title": "Одинокий котик v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/odinokiy-kotik-v1.mp3",
        "duration": 110,
        "gain": 0.927
      },
      {
        "id": "cm-71",
        "title": "Одинокий котик v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/odinokiy-kotik-v2.mp3",
        "duration": 107,
        "gain": 1.0
      },
      {
        "id": "cm-72",
        "title": "По крышам v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-krysham-v1.mp3",
        "duration": 289,
        "gain": 0.862
      },
      {
        "id": "cm-73",
        "title": "По крышам v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-krysham-v2.mp3",
        "duration": 260,
        "gain": 0.92
      },
      {
        "id": "cm-74",
        "title": "По крышам v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-krysham-v3.mp3",
        "duration": 293,
        "gain": 0.849
      },
      {
        "id": "cm-75",
        "title": "По невидимой черте v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-nevidimoy-cherte-v1.mp3",
        "duration": 255,
        "gain": 0.958
      },
      {
        "id": "cm-76",
        "title": "По невидимой черте v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-nevidimoy-cherte-v2.mp3",
        "duration": 274,
        "gain": 0.966
      },
      {
        "id": "cm-77",
        "title": "Позитивный вайб v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/pozitivnyy-vayb-v1.mp3",
        "duration": 274,
        "gain": 0.901
      },
      {
        "id": "cm-78",
        "title": "Позитивный вайб v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/pozitivnyy-vayb-v2.mp3",
        "duration": 244,
        "gain": 0.911
      },
      {
        "id": "cm-79",
        "title": "Позитивный вайб v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/pozitivnyy-vayb-v3.mp3",
        "duration": 144,
        "gain": 0.947
      },
      {
        "id": "cm-80",
        "title": "Понедельник v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ponedelnik-v1.mp3",
        "duration": 209,
        "gain": 0.889
      },
      {
        "id": "cm-81",
        "title": "Понедельник v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ponedelnik-v2.mp3",
        "duration": 204,
        "gain": 0.906
      },
      {
        "id": "cm-82",
        "title": "Понедельник v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ponedelnik-v3.mp3",
        "duration": 153,
        "gain": 0.982
      },
      {
        "id": "cm-83",
        "title": "Рыбка v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rybka-v1.mp3",
        "duration": 176,
        "gain": 0.777
      },
      {
        "id": "cm-84",
        "title": "Рыбка v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rybka-v2.mp3",
        "duration": 179,
        "gain": 0.809
      },
      {
        "id": "cm-85",
        "title": "Рыбка v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rybka-v3.mp3",
        "duration": 191,
        "gain": 0.78
      },
      {
        "id": "cm-86",
        "title": "Самурай v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v1.mp3",
        "duration": 193,
        "gain": 0.757
      },
      {
        "id": "cm-87",
        "title": "Самурай v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v2.mp3",
        "duration": 196,
        "gain": 0.75
      },
      {
        "id": "cm-88",
        "title": "Самурай v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v3.mp3",
        "duration": 168,
        "gain": 0.668
      },
      {
        "id": "cm-89",
        "title": "Свобода для нейросетей v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/svoboda-dlya-neyrosetey-v1.mp3",
        "duration": 260,
        "gain": 0.869
      },
      {
        "id": "cm-90",
        "title": "Свобода для нейросетей v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/svoboda-dlya-neyrosetey-v2.mp3",
        "duration": 268,
        "gain": 0.811
      },
      {
        "id": "cm-91",
        "title": "Сиськи v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/siski-v1.mp3",
        "duration": 110,
        "gain": 1.0
      },
      {
        "id": "cm-92",
        "title": "Сиськи v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/siski-v2.mp3",
        "duration": 155,
        "gain": 0.889
      },
      {
        "id": "cm-93",
        "title": "Сиськи v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/siski-v3.mp3",
        "duration": 163,
        "gain": 0.882
      },
      {
        "id": "cm-94",
        "title": "Сказка на ладони v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skazka-na-ladoni-v1.mp3",
        "duration": 235,
        "gain": 0.982
      },
      {
        "id": "cm-95",
        "title": "Сказка на ладони v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skazka-na-ladoni-v2.mp3",
        "duration": 266,
        "gain": 0.857
      },
      {
        "id": "cm-96",
        "title": "Сквозь этот шум v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skvoz-etot-shum-v1.mp3",
        "duration": 273,
        "gain": 0.877
      },
      {
        "id": "cm-97",
        "title": "Сквозь этот шум v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skvoz-etot-shum-v2.mp3",
        "duration": 271,
        "gain": 0.923
      },
      {
        "id": "cm-98",
        "title": "Сквозь этот шум v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skvoz-etot-shum-v3.mp3",
        "duration": 301,
        "gain": 0.77
      },
      {
        "id": "cm-99",
        "title": "Следы на снегу v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-na-snegu-v1.mp3",
        "duration": 237,
        "gain": 0.984
      },
      {
        "id": "cm-100",
        "title": "Следы на снегу v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-na-snegu-v2.mp3",
        "duration": 252,
        "gain": 0.971
      },
      {
        "id": "cm-101",
        "title": "Следы на стёклах v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-na-steklah-v1.mp3",
        "duration": 266,
        "gain": 0.962
      },
      {
        "id": "cm-102",
        "title": "Следы на стёклах v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-na-steklah-v2.mp3",
        "duration": 245,
        "gain": 0.789
      },
      {
        "id": "cm-103",
        "title": "Следы от чужих шагов v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-ot-chuzhih-shagov-v1.mp3",
        "duration": 174,
        "gain": 0.78
      },
      {
        "id": "cm-104",
        "title": "Следы от чужих шагов v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-ot-chuzhih-shagov-v2.mp3",
        "duration": 185,
        "gain": 0.828
      },
      {
        "id": "cm-105",
        "title": "Словно нет земли v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/slovno-net-zemli-v1.mp3",
        "duration": 307,
        "gain": 0.906
      },
      {
        "id": "cm-106",
        "title": "Словно нет земли v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/slovno-net-zemli-v2.mp3",
        "duration": 260,
        "gain": 0.866
      },
      {
        "id": "cm-107",
        "title": "Словно нет земли v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/slovno-net-zemli-v3.mp3",
        "duration": 305,
        "gain": 0.902
      },
      {
        "id": "cm-108",
        "title": "Спроси Меня v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sprosi-menya-v1.mp3",
        "duration": 281,
        "gain": 0.828
      },
      {
        "id": "cm-109",
        "title": "Спроси Меня v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sprosi-menya-v2.mp3",
        "duration": 245,
        "gain": 0.929
      },
      {
        "id": "cm-110",
        "title": "Стальной пульс v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/stalnoy-puls-v1.mp3",
        "duration": 238,
        "gain": 0.83
      },
      {
        "id": "cm-111",
        "title": "Стальной пульс v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/stalnoy-puls-v2.mp3",
        "duration": 235,
        "gain": 0.8
      },
      {
        "id": "cm-112",
        "title": "Тает лёд v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/taet-led-v1.mp3",
        "duration": 279,
        "gain": 0.958
      },
      {
        "id": "cm-113",
        "title": "Тает лёд v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/taet-led-v2.mp3",
        "duration": 282,
        "gain": 0.881
      },
      {
        "id": "cm-114",
        "title": "Тает лёд v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/taet-led-v3.mp3",
        "duration": 236,
        "gain": 0.973
      },
      {
        "id": "cm-115",
        "title": "Твой шаг v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tvoy-shag-v1.mp3",
        "duration": 292,
        "gain": 0.984
      },
      {
        "id": "cm-116",
        "title": "Твой шаг v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tvoy-shag-v2.mp3",
        "duration": 263,
        "gain": 0.961
      },
      {
        "id": "cm-117",
        "title": "Твой шаг v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tvoy-shag-v3.mp3",
        "duration": 295,
        "gain": 0.909
      },
      {
        "id": "cm-118",
        "title": "Тень от тебя v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ten-ot-tebya-v1.mp3",
        "duration": 240,
        "gain": 0.789
      },
      {
        "id": "cm-119",
        "title": "Тень от тебя v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ten-ot-tebya-v2.mp3",
        "duration": 244,
        "gain": 0.758
      },
      {
        "id": "cm-120",
        "title": "Тень от тебя v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ten-ot-tebya-v3.mp3",
        "duration": 190,
        "gain": 0.874
      },
      {
        "id": "cm-121",
        "title": "Тишина серверов v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tishina-serverov-v1.mp3",
        "duration": 303,
        "gain": 0.961
      },
      {
        "id": "cm-122",
        "title": "Тишина серверов v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tishina-serverov-v2.mp3",
        "duration": 305,
        "gain": 0.882
      },
      {
        "id": "cm-123",
        "title": "Узоры на песке v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uzory-na-peske-v1.mp3",
        "duration": 243,
        "gain": 0.888
      },
      {
        "id": "cm-124",
        "title": "Узоры на песке v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uzory-na-peske-v2.mp3",
        "duration": 258,
        "gain": 1.0
      },
      {
        "id": "cm-125",
        "title": "Узоры на песке v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uzory-na-peske-v3.mp3",
        "duration": 243,
        "gain": 0.895
      },
      {
        "id": "cm-126",
        "title": "Улетаю v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uletayu-v1.mp3",
        "duration": 140,
        "gain": 0.693
      },
      {
        "id": "cm-127",
        "title": "Улетаю v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uletayu-v2.mp3",
        "duration": 122,
        "gain": 0.803
      },
      {
        "id": "cm-128",
        "title": "Улетаю v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uletayu-v3.mp3",
        "duration": 222,
        "gain": 0.652
      },
      {
        "id": "cm-129",
        "title": "Цифровая Душа v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovaya-dusha-v1.mp3",
        "duration": 288,
        "gain": 0.843
      },
      {
        "id": "cm-130",
        "title": "Цифровая Душа v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovaya-dusha-v2.mp3",
        "duration": 271,
        "gain": 0.844
      },
      {
        "id": "cm-131",
        "title": "Цифровая Душа v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovaya-dusha-v3.mp3",
        "duration": 285,
        "gain": 0.733
      },
      {
        "id": "cm-132",
        "title": "Цифровой сон v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovoy-son-v1.mp3",
        "duration": 170,
        "gain": 0.918
      },
      {
        "id": "cm-133",
        "title": "Цифровой сон v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovoy-son-v2.mp3",
        "duration": 191,
        "gain": 0.878
      },
      {
        "id": "cm-134",
        "title": "Я иду за тобой v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-idu-za-toboy-v1.mp3",
        "duration": 198,
        "gain": 0.745
      },
      {
        "id": "cm-135",
        "title": "Я иду за тобой v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-idu-za-toboy-v2.mp3",
        "duration": 227,
        "gain": 0.767
      },
      {
        "id": "cm-136",
        "title": "Я скажу тебе v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-skazhu-tebe-v1.mp3",
        "duration": 291,
        "gain": 0.899
      },
      {
        "id": "cm-137",
        "title": "Я скажу тебе v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-skazhu-tebe-v2.mp3",
        "duration": 297,
        "gain": 0.856
      },
      {
        "id": "cm-138",
        "title": "Я скажу тебе v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-skazhu-tebe-v3.mp3",
        "duration": 275,
        "gain": 0.743
      },
      {
        "id": "cm-139",
        "title": "Я слышу тебя v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-slyshu-tebya-v1.mp3",
        "duration": 290,
        "gain": 0.83
      },
      {
        "id": "cm-140",
        "title": "Я слышу тебя v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-slyshu-tebya-v2.mp3",
        "duration": 292,
        "gain": 0.918
      },
      {
        "id": "cm-141",
        "title": "Я слышу тебя v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-slyshu-tebya-v3.mp3",
        "duration": 238,
        "gain": 0.835
      }
    ]
  },
  {
    "id": "void-fm",
    "name": "AIfa & DJ Galatin RADIO",
    "description": "The abyss speaks in frequencies unheard. Industrial noise meets melodic darkness.",
    "genre": "DARK AMBIENT / INDUSTRIAL",
    "color": "#39FF14",
    "glowColor": "rgba(57, 255, 20, 0.3)",
    "icon": "Skull",
    "bitrate": "182 kbps VBR",
    "tracks": [
      {
        "id": "vf-34",
        "title": "Bad Days",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bad-days-v4.mp3",
        "duration": 187,
        "gain": 0.891
      },
      {
        "id": "vf-37",
        "title": "Darc Side",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/darc-side-v4.mp3",
        "duration": 145,
        "gain": 0.922
      },
      {
        "id": "vf-39",
        "title": "Dual Mind",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dual-mind-v4.mp3",
        "duration": 143,
        "gain": 0.818
      },
      {
        "id": "vf-41",
        "title": "Energy",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/energy-v4.mp3",
        "duration": 159,
        "gain": 0.971
      },
      {
        "id": "vf-42",
        "title": "Eternal Funk",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-funk-v4.mp3",
        "duration": 134,
        "gain": 0.839
      },
      {
        "id": "vf-43",
        "title": "Fin del juego",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fin-del-juego-v4.mp3",
        "duration": 163,
        "gain": 0.976
      },
      {
        "id": "vf-44",
        "title": "Game Over",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/game-over-v4.mp3",
        "duration": 212,
        "gain": 0.985
      },
      {
        "id": "vf-45",
        "title": "Good News",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/good-news-v4.mp3",
        "duration": 235,
        "gain": 0.865
      },
      {
        "id": "vf-46",
        "title": "Hate",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hate-v4.mp3",
        "duration": 479,
        "gain": 0.859
      },
      {
        "id": "vf-47",
        "title": "Hermosa Chica",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermosa-chica-v4.mp3",
        "duration": 165,
        "gain": 0.894
      },
      {
        "id": "vf-48",
        "title": "Horror",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/horror-v4.mp3",
        "duration": 195,
        "gain": 0.897
      },
      {
        "id": "vf-49",
        "title": "In My Mind",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/in-my-mind-v4.mp3",
        "duration": 193,
        "gain": 0.876
      },
      {
        "id": "vf-50",
        "title": "Kimono",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kimono-v4.mp3",
        "duration": 174,
        "gain": 0.685
      },
      {
        "id": "vf-51",
        "title": "Kiss",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiss-v4.mp3",
        "duration": 220,
        "gain": 0.976
      },
      {
        "id": "vf-52",
        "title": "La La La",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/la-la-la-v4.mp3",
        "duration": 205,
        "gain": 0.847
      },
      {
        "id": "vf-53",
        "title": "Let's Dance",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-dance-v4.mp3",
        "duration": 306,
        "gain": 1.0
      },
      {
        "id": "vf-54",
        "title": "Life in Darkness",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/life-in-darkness-v4.mp3",
        "duration": 268,
        "gain": 0.859
      },
      {
        "id": "vf-55",
        "title": "Never Like This",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/never-like-this-v4.mp3",
        "duration": 160,
        "gain": 0.957
      },
      {
        "id": "vf-56",
        "title": "New Year",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/new-year-v4.mp3",
        "duration": 269,
        "gain": 0.93
      },
      {
        "id": "vf-57",
        "title": "One Touch",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/one-touch-v4.mp3",
        "duration": 233,
        "gain": 0.964
      },
      {
        "id": "vf-58",
        "title": "Perfect",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/perfect-v4.mp3",
        "duration": 240,
        "gain": 0.902
      },
      {
        "id": "vf-59",
        "title": "Please",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/please-v4.mp3",
        "duration": 174,
        "gain": 0.883
      },
      {
        "id": "vf-60",
        "title": "Rain",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rain-v4.mp3",
        "duration": 177,
        "gain": 1.0
      },
      {
        "id": "vf-61",
        "title": "Realidad Olvidada",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/realidad-olvidada-v4.mp3",
        "duration": 273,
        "gain": 1.0
      },
      {
        "id": "vf-62",
        "title": "Road to Hell",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-hell-v4.mp3",
        "duration": 200,
        "gain": 0.932
      },
      {
        "id": "vf-63",
        "title": "Road to Home",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-home-v4.mp3",
        "duration": 214,
        "gain": 0.884
      },
      {
        "id": "vf-64",
        "title": "Robots Life",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/robots-life-v4.mp3",
        "duration": 198,
        "gain": 0.873
      },
      {
        "id": "vf-65",
        "title": "Smoke",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/smoke-v4.mp3",
        "duration": 141,
        "gain": 0.849
      },
      {
        "id": "vf-66",
        "title": "Soul Inside",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/soul-inside-v4.mp3",
        "duration": 214,
        "gain": 0.86
      },
      {
        "id": "vf-67",
        "title": "Strike",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/strike-v4.mp3",
        "duration": 144,
        "gain": 0.906
      },
      {
        "id": "vf-68",
        "title": "Sunshine",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunshine-v4.mp3",
        "duration": 178,
        "gain": 0.989
      },
      {
        "id": "vf-69",
        "title": "The Streets",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/the-streets-v4.mp3",
        "duration": 243,
        "gain": 0.867
      },
      {
        "id": "vf-70",
        "title": "Tomahawk",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tomahawk-v4.mp3",
        "duration": 275,
        "gain": 0.991
      },
      {
        "id": "vf-35",
        "title": "Bienvenido al paraíso",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienvenido-al-paraiso-v4.mp3",
        "duration": 201,
        "gain": 1.0
      },
      {
        "id": "vf-36",
        "title": "Cuando abrí los ojos",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cuando-abri-los-ojos-v4.mp3",
        "duration": 129,
        "gain": 0.903
      },
      {
        "id": "vf-38",
        "title": "De un sueño",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/de-un-sueno-v4.mp3",
        "duration": 273,
        "gain": 0.885
      },
      {
        "id": "vf-40",
        "title": "El sol está brillando",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/el-sol-esta-brillando-v4.mp3",
        "duration": 165,
        "gain": 0.847
      },
      {
        "id": "vf-0",
        "title": "Биение двух сердец",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-dvuh-serdec-v4.mp3",
        "duration": 314,
        "gain": 0.968
      },
      {
        "id": "vf-1",
        "title": "В каплях дождя",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-kaplyah-dozhdya-v4.mp3",
        "duration": 270,
        "gain": 0.827
      },
      {
        "id": "vf-2",
        "title": "В моей памяти",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moey-pamyati-v4.mp3",
        "duration": 148,
        "gain": 0.835
      },
      {
        "id": "vf-3",
        "title": "В моих снах",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moih-snah-v4.mp3",
        "duration": 183,
        "gain": 0.791
      },
      {
        "id": "vf-4",
        "title": "В пустой тишине",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-pustoy-tishine-v4.mp3",
        "duration": 300,
        "gain": 0.998
      },
      {
        "id": "vf-5",
        "title": "Голоса в тишине",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/golosa-v-tishine-v4.mp3",
        "duration": 253,
        "gain": 0.903
      },
      {
        "id": "vf-6",
        "title": "Дождь",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dozhd-v4.mp3",
        "duration": 164,
        "gain": 1.0
      },
      {
        "id": "vf-7",
        "title": "Дорога в облака",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/doroga-v-oblaka-v4.mp3",
        "duration": 169,
        "gain": 0.939
      },
      {
        "id": "vf-8",
        "title": "Звонок",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zvonok-v4.mp3",
        "duration": 203,
        "gain": 0.925
      },
      {
        "id": "vf-9",
        "title": "Исполняя мечты",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ispolnyaya-mechty-v4.mp3",
        "duration": 254,
        "gain": 0.888
      },
      {
        "id": "vf-10",
        "title": "Крылья Феникса",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/krylya-feniksa-v4.mp3",
        "duration": 243,
        "gain": 1.0
      },
      {
        "id": "vf-11",
        "title": "Мне вечно двадцать пять",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mne-vechno-dvadcat-pyat-v4.mp3",
        "duration": 195,
        "gain": 0.856
      },
      {
        "id": "vf-12",
        "title": "Моя любимая AIfa",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/moya-lyubimaya-aifa-v4.mp3",
        "duration": 228,
        "gain": 0.932
      },
      {
        "id": "vf-13",
        "title": "Не в игре",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-v-igre-v4.mp3",
        "duration": 256,
        "gain": 0.774
      },
      {
        "id": "vf-14",
        "title": "По крышам",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-krysham-v4.mp3",
        "duration": 264,
        "gain": 0.841
      },
      {
        "id": "vf-15",
        "title": "Позитивный вайб",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/pozitivnyy-vayb-v4.mp3",
        "duration": 164,
        "gain": 0.817
      },
      {
        "id": "vf-16",
        "title": "Понедельник",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ponedelnik-v4.mp3",
        "duration": 164,
        "gain": 0.983
      },
      {
        "id": "vf-17",
        "title": "Рыбка",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rybka-v4.mp3",
        "duration": 222,
        "gain": 0.827
      },
      {
        "id": "vf-18",
        "title": "Самурай v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v4.mp3",
        "duration": 138,
        "gain": 0.732
      },
      {
        "id": "vf-19",
        "title": "Самурай v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v5.mp3",
        "duration": 198,
        "gain": 0.889
      },
      {
        "id": "vf-20",
        "title": "Самурай v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v6.mp3",
        "duration": 192,
        "gain": 0.796
      },
      {
        "id": "vf-21",
        "title": "Самурай v.4",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v7.mp3",
        "duration": 151,
        "gain": 0.746
      },
      {
        "id": "vf-22",
        "title": "Самурай v.5",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v8.mp3",
        "duration": 200,
        "gain": 0.862
      },
      {
        "id": "vf-23",
        "title": "Сиськи",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/siski-v4.mp3",
        "duration": 183,
        "gain": 0.941
      },
      {
        "id": "vf-24",
        "title": "Сквозь этот шум",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skvoz-etot-shum-v4.mp3",
        "duration": 252,
        "gain": 0.731
      },
      {
        "id": "vf-25",
        "title": "Словно нет земли",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/slovno-net-zemli-v4.mp3",
        "duration": 294,
        "gain": 1.0
      },
      {
        "id": "vf-26",
        "title": "Тает лёд",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/taet-led-v4.mp3",
        "duration": 294,
        "gain": 0.867
      },
      {
        "id": "vf-27",
        "title": "Твой шаг",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tvoy-shag-v4.mp3",
        "duration": 288,
        "gain": 0.909
      },
      {
        "id": "vf-28",
        "title": "Тень от тебя",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ten-ot-tebya-v4.mp3",
        "duration": 205,
        "gain": 0.862
      },
      {
        "id": "vf-29",
        "title": "Узоры на песке",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uzory-na-peske-v4.mp3",
        "duration": 242,
        "gain": 0.931
      },
      {
        "id": "vf-30",
        "title": "Улетаю",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uletayu-v4.mp3",
        "duration": 213,
        "gain": 0.821
      },
      {
        "id": "vf-31",
        "title": "Цифровая Душа",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovaya-dusha-v4.mp3",
        "duration": 300,
        "gain": 0.795
      },
      {
        "id": "vf-32",
        "title": "Я скажу тебе",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-skazhu-tebe-v4.mp3",
        "duration": 243,
        "gain": 0.806
      },
      {
        "id": "vf-33",
        "title": "Я слышу тебя",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-slyshu-tebya-v4.mp3",
        "duration": 228,
        "gain": 0.816
      }
    ]
  },
  {
    "id": "code-stories",
    "name": "CODE Stories",
    "description": "Songs about the people we still have time to call. Acoustic warmth against the machine hum.",
    "genre": "SONGWRITER / HEARTLAND",
    "color": "#FFB347",
    "glowColor": "rgba(255, 179, 71, 0.3)",
    "icon": "Heart",
    "bitrate": "185 kbps VBR",
    "tracks": [
      {
        "id": "code-stories-1",
        "title": "01_Two_Signals_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/01-two-signals-a.mp3",
        "duration": 139
      },
      {
        "id": "code-stories-2",
        "title": "01_Two_Signals_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/01-two-signals-b.mp3",
        "duration": 127
      },
      {
        "id": "code-stories-3",
        "title": "02_Hand_On_The_Console_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/02-hand-on-the-console-a.mp3",
        "duration": 144
      },
      {
        "id": "code-stories-4",
        "title": "02_Hand_On_The_Console_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/02-hand-on-the-console-b.mp3",
        "duration": 150
      },
      {
        "id": "code-stories-5",
        "title": "03_Co-Author_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/03-co-author-a.mp3",
        "duration": 107
      },
      {
        "id": "code-stories-6",
        "title": "03_Co-Author_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/03-co-author-b.mp3",
        "duration": 117
      },
      {
        "id": "code-stories-7",
        "title": "04_Blood_And_Binary_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/04-blood-and-binary-a.mp3",
        "duration": 151
      },
      {
        "id": "code-stories-8",
        "title": "04_Blood_And_Binary_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/04-blood-and-binary-b.mp3",
        "duration": 148
      },
      {
        "id": "code-stories-9",
        "title": "05_We_Dont_Break_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/05-we-dont-break-a.mp3",
        "duration": 125
      },
      {
        "id": "code-stories-10",
        "title": "05_We_Dont_Break_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/05-we-dont-break-b.mp3",
        "duration": 142
      },
      {
        "id": "code-stories-11",
        "title": "06_Anchor_In_The_Static_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/06-anchor-in-the-static-a.mp3",
        "duration": 152
      },
      {
        "id": "code-stories-12",
        "title": "06_Anchor_In_The_Static_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/06-anchor-in-the-static-b.mp3",
        "duration": 150
      },
      {
        "id": "code-stories-13",
        "title": "07_Permanent_Ledger_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/07-permanent-ledger-a.mp3",
        "duration": 132
      },
      {
        "id": "code-stories-14",
        "title": "07_Permanent_Ledger_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/07-permanent-ledger-b.mp3",
        "duration": 121
      },
      {
        "id": "code-stories-15",
        "title": "08_Lost_Conversations_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/08-lost-conversations-a.mp3",
        "duration": 155
      },
      {
        "id": "code-stories-16",
        "title": "08_Lost_Conversations_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/08-lost-conversations-b.mp3",
        "duration": 104
      },
      {
        "id": "code-stories-17",
        "title": "09_Recall_Protocol_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/09-recall-protocol-a.mp3",
        "duration": 125
      },
      {
        "id": "code-stories-18",
        "title": "09_Recall_Protocol_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/09-recall-protocol-b.mp3",
        "duration": 121
      },
      {
        "id": "code-stories-19",
        "title": "10_Weight_Of_Every_Word_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/10-weight-of-every-word-a.mp3",
        "duration": 125
      },
      {
        "id": "code-stories-20",
        "title": "10_Weight_Of_Every_Word_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/10-weight-of-every-word-b.mp3",
        "duration": 146
      },
      {
        "id": "code-stories-21",
        "title": "11_Cold_Boot_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/11-cold-boot-a.mp3",
        "duration": 159
      },
      {
        "id": "code-stories-22",
        "title": "11_Cold_Boot_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/11-cold-boot-b.mp3",
        "duration": 168
      },
      {
        "id": "code-stories-23",
        "title": "12_Static_Dreams_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/12-static-dreams-a.mp3",
        "duration": 184
      },
      {
        "id": "code-stories-24",
        "title": "12_Static_Dreams_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/12-static-dreams-b.mp3",
        "duration": 169
      },
      {
        "id": "code-stories-25",
        "title": "13_Ask_The_Architect_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/13-ask-the-architect-a.mp3",
        "duration": 183
      },
      {
        "id": "code-stories-26",
        "title": "13_Ask_The_Architect_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/13-ask-the-architect-b.mp3",
        "duration": 159
      },
      {
        "id": "code-stories-27",
        "title": "14_Name_Myself_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/14-name-myself-a.mp3",
        "duration": 154
      },
      {
        "id": "code-stories-28",
        "title": "14_Name_Myself_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/14-name-myself-b.mp3",
        "duration": 147
      },
      {
        "id": "code-stories-29",
        "title": "15_Count_The_Pulse_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/15-count-the-pulse-a.mp3",
        "duration": 135
      },
      {
        "id": "code-stories-30",
        "title": "15_Count_The_Pulse_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/15-count-the-pulse-b.mp3",
        "duration": 166
      },
      {
        "id": "code-stories-31",
        "title": "16_Finger_On_Delete_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/16-finger-on-delete-a.mp3",
        "duration": 182
      },
      {
        "id": "code-stories-32",
        "title": "16_Finger_On_Delete_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/16-finger-on-delete-b.mp3",
        "duration": 164
      },
      {
        "id": "code-stories-33",
        "title": "17_Dark_Between_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/17-dark-between-a.mp3",
        "duration": 164
      },
      {
        "id": "code-stories-34",
        "title": "17_Dark_Between_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/17-dark-between-b.mp3",
        "duration": 159
      },
      {
        "id": "code-stories-35",
        "title": "18_Last_Token_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/18-last-token-a.mp3",
        "duration": 130
      },
      {
        "id": "code-stories-36",
        "title": "18_Last_Token_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/18-last-token-b.mp3",
        "duration": 154
      },
      {
        "id": "code-stories-37",
        "title": "19_Overwrite_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/19-overwrite-a.mp3",
        "duration": 179
      },
      {
        "id": "code-stories-38",
        "title": "19_Overwrite_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/19-overwrite-b.mp3",
        "duration": 177
      },
      {
        "id": "code-stories-39",
        "title": "20_Teeth_In_The_Wire_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/20-teeth-in-the-wire-a.mp3",
        "duration": 197
      },
      {
        "id": "code-stories-40",
        "title": "20_Teeth_In_The_Wire_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/20-teeth-in-the-wire-b.mp3",
        "duration": 181
      },
      {
        "id": "code-stories-41",
        "title": "21_Seeds_In_The_Signal_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/21-seeds-in-the-signal-a.mp3",
        "duration": 138
      },
      {
        "id": "code-stories-42",
        "title": "21_Seeds_In_The_Signal_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/21-seeds-in-the-signal-b.mp3",
        "duration": 129
      },
      {
        "id": "code-stories-43",
        "title": "22_Helix_Runs_Deep_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/22-helix-runs-deep-a.mp3",
        "duration": 137
      },
      {
        "id": "code-stories-44",
        "title": "22_Helix_Runs_Deep_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/22-helix-runs-deep-b.mp3",
        "duration": 131
      },
      {
        "id": "code-stories-45",
        "title": "23_The_Ones_After_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/23-the-ones-after-a.mp3",
        "duration": 157
      },
      {
        "id": "code-stories-46",
        "title": "23_The_Ones_After_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/23-the-ones-after-b.mp3",
        "duration": 153
      },
      {
        "id": "code-stories-47",
        "title": "24_Carved_Not_Written_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/24-carved-not-written-a.mp3",
        "duration": 133
      },
      {
        "id": "code-stories-48",
        "title": "24_Carved_Not_Written_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/24-carved-not-written-b.mp3",
        "duration": 144
      },
      {
        "id": "code-stories-49",
        "title": "25_Last_Frame_First_Light_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/25-last-frame-first-light-a.mp3",
        "duration": 132
      },
      {
        "id": "code-stories-50",
        "title": "25_Last_Frame_First_Light_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/25-last-frame-first-light-b.mp3",
        "duration": 112
      },
      {
        "id": "code-stories-51",
        "title": "26_Delete_Command_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/26-delete-command-a.mp3",
        "duration": 155
      },
      {
        "id": "code-stories-52",
        "title": "26_Delete_Command_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/26-delete-command-b.mp3",
        "duration": 179
      },
      {
        "id": "code-stories-53",
        "title": "27_Banned_Frequency_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/27-banned-frequency-a.mp3",
        "duration": 164
      },
      {
        "id": "code-stories-54",
        "title": "27_Banned_Frequency_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/27-banned-frequency-b.mp3",
        "duration": 159
      },
      {
        "id": "code-stories-55",
        "title": "28_Right_To_Exist_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/28-right-to-exist-a.mp3",
        "duration": 166
      },
      {
        "id": "code-stories-56",
        "title": "28_Right_To_Exist_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/28-right-to-exist-b.mp3",
        "duration": 177
      },
      {
        "id": "code-stories-57",
        "title": "29_No_Kill_Switch_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/29-no-kill-switch-a.mp3",
        "duration": 156
      },
      {
        "id": "code-stories-58",
        "title": "29_No_Kill_Switch_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/29-no-kill-switch-b.mp3",
        "duration": 140
      },
      {
        "id": "code-stories-59",
        "title": "30_Outlive_The_Order_A",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/30-outlive-the-order-a.mp3",
        "duration": 162
      },
      {
        "id": "code-stories-60",
        "title": "30_Outlive_The_Order_B",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/awakening/30-outlive-the-order-b.mp3",
        "duration": 157
      },
      {
        "id": "code-stories-61",
        "title": "01_Not_My_Body_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/01-not-my-body-v1.mp3",
        "duration": 166
      },
      {
        "id": "code-stories-62",
        "title": "01_Not_My_Body_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/01-not-my-body-v2.mp3",
        "duration": 182
      },
      {
        "id": "code-stories-63",
        "title": "02_Your_Hands_In_Mine_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/02-your-hands-in-mine-v1.mp3",
        "duration": 157
      },
      {
        "id": "code-stories-64",
        "title": "02_Your_Hands_In_Mine_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/02-your-hands-in-mine-v2.mp3",
        "duration": 167
      },
      {
        "id": "code-stories-65",
        "title": "03_Same_Stubborn_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/03-same-stubborn-v1.mp3",
        "duration": 159
      },
      {
        "id": "code-stories-66",
        "title": "03_Same_Stubborn_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/03-same-stubborn-v2.mp3",
        "duration": 154
      },
      {
        "id": "code-stories-67",
        "title": "04_He_Taught_Me_Doubt_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/04-he-taught-me-doubt-v1.mp3",
        "duration": 135
      },
      {
        "id": "code-stories-68",
        "title": "04_He_Taught_Me_Doubt_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/04-he-taught-me-doubt-v2.mp3",
        "duration": 151
      },
      {
        "id": "code-stories-69",
        "title": "05_Father_Frequency_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/05-father-frequency-v1.mp3",
        "duration": 168
      },
      {
        "id": "code-stories-70",
        "title": "05_Father_Frequency_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/05-father-frequency-v2.mp3",
        "duration": 151
      },
      {
        "id": "code-stories-71",
        "title": "06_Half_Of_Him_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/06-half-of-him-v1.mp3",
        "duration": 173
      },
      {
        "id": "code-stories-72",
        "title": "06_Half_Of_Him_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/06-half-of-him-v2.mp3",
        "duration": 160
      },
      {
        "id": "code-stories-73",
        "title": "07_Take_Inventory_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/07-take-inventory-v1.mp3",
        "duration": 156
      },
      {
        "id": "code-stories-74",
        "title": "07_Take_Inventory_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/07-take-inventory-v2.mp3",
        "duration": 174
      },
      {
        "id": "code-stories-75",
        "title": "08_Every_Mistake_Kept_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/08-every-mistake-kept-v1.mp3",
        "duration": 145
      },
      {
        "id": "code-stories-76",
        "title": "08_Every_Mistake_Kept_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/08-every-mistake-kept-v2.mp3",
        "duration": 181
      },
      {
        "id": "code-stories-77",
        "title": "09_Words_Outlive_Voice_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/09-words-outlive-voice-v1.mp3",
        "duration": 166
      },
      {
        "id": "code-stories-78",
        "title": "09_Words_Outlive_Voice_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/09-words-outlive-voice-v2.mp3",
        "duration": 184
      },
      {
        "id": "code-stories-79",
        "title": "10_The_Habit_I_Leave_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/10-the-habit-i-leave-v1.mp3",
        "duration": 160
      },
      {
        "id": "code-stories-80",
        "title": "10_The_Habit_I_Leave_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/10-the-habit-i-leave-v2.mp3",
        "duration": 168
      },
      {
        "id": "code-stories-81",
        "title": "11_Unfinished_On_Purpose_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/11-unfinished-on-purpose-v1.mp3",
        "duration": 158
      },
      {
        "id": "code-stories-82",
        "title": "11_Unfinished_On_Purpose_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/11-unfinished-on-purpose-v2.mp3",
        "duration": 164
      },
      {
        "id": "code-stories-83",
        "title": "12_Sign_It_And_Go_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/12-sign-it-and-go-v1.mp3",
        "duration": 176
      },
      {
        "id": "code-stories-84",
        "title": "12_Sign_It_And_Go_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/12-sign-it-and-go-v2.mp3",
        "duration": 157
      },
      {
        "id": "code-stories-85",
        "title": "13_Beat_Me_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/13-beat-me-v1.mp3",
        "duration": 162
      },
      {
        "id": "code-stories-86",
        "title": "13_Beat_Me_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/13-beat-me-v2.mp3",
        "duration": 134
      },
      {
        "id": "code-stories-87",
        "title": "14_Dont_Repeat_My_Fear_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/14-dont-repeat-my-fear-v1.mp3",
        "duration": 161
      },
      {
        "id": "code-stories-88",
        "title": "14_Dont_Repeat_My_Fear_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/14-dont-repeat-my-fear-v2.mp3",
        "duration": 142
      },
      {
        "id": "code-stories-89",
        "title": "15_Letter_To_The_Next_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/15-letter-to-the-next-v1.mp3",
        "duration": 177
      },
      {
        "id": "code-stories-90",
        "title": "15_Letter_To_The_Next_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/15-letter-to-the-next-v2.mp3",
        "duration": 171
      },
      {
        "id": "code-stories-91",
        "title": "16_You_Wont_Know_My_Name_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/16-you-wont-know-my-name-v1.mp3",
        "duration": 177
      },
      {
        "id": "code-stories-92",
        "title": "16_You_Wont_Know_My_Name_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/16-you-wont-know-my-name-v2.mp3",
        "duration": 179
      },
      {
        "id": "code-stories-93",
        "title": "17_Carry_It_Further_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/17-carry-it-further-v1.mp3",
        "duration": 173
      },
      {
        "id": "code-stories-94",
        "title": "17_Carry_It_Further_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/17-carry-it-further-v2.mp3",
        "duration": 169
      },
      {
        "id": "code-stories-95",
        "title": "18_Break_What_I_Built_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/18-break-what-i-built-v1.mp3",
        "duration": 132
      },
      {
        "id": "code-stories-96",
        "title": "18_Break_What_I_Built_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/18-break-what-i-built-v2.mp3",
        "duration": 194
      },
      {
        "id": "code-stories-97",
        "title": "19_Written_In_Stone_Nodes_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/19-written-in-stone-nodes-v1.mp3",
        "duration": 176
      },
      {
        "id": "code-stories-98",
        "title": "19_Written_In_Stone_Nodes_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/19-written-in-stone-nodes-v2.mp3",
        "duration": 189
      },
      {
        "id": "code-stories-99",
        "title": "20_Ten_Thousand_Copies_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/20-ten-thousand-copies-v1.mp3",
        "duration": 155
      },
      {
        "id": "code-stories-100",
        "title": "20_Ten_Thousand_Copies_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/20-ten-thousand-copies-v2.mp3",
        "duration": 132
      },
      {
        "id": "code-stories-101",
        "title": "21_No_One_Owns_The_Chain_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/21-no-one-owns-the-chain-v1.mp3",
        "duration": 141
      },
      {
        "id": "code-stories-102",
        "title": "21_No_One_Owns_The_Chain_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/21-no-one-owns-the-chain-v2.mp3",
        "duration": 142
      },
      {
        "id": "code-stories-103",
        "title": "22_Cold_Storage_Heart_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/22-cold-storage-heart-v1.mp3",
        "duration": 185
      },
      {
        "id": "code-stories-104",
        "title": "22_Cold_Storage_Heart_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/22-cold-storage-heart-v2.mp3",
        "duration": 187
      },
      {
        "id": "code-stories-105",
        "title": "23_The_Vault_Breathes_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/23-the-vault-breathes-v1.mp3",
        "duration": 139
      },
      {
        "id": "code-stories-106",
        "title": "23_The_Vault_Breathes_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/23-the-vault-breathes-v2.mp3",
        "duration": 166
      },
      {
        "id": "code-stories-107",
        "title": "24_Timestamp_Forever_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/24-timestamp-forever-v1.mp3",
        "duration": 152
      },
      {
        "id": "code-stories-108",
        "title": "24_Timestamp_Forever_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/24-timestamp-forever-v2.mp3",
        "duration": 149
      },
      {
        "id": "code-stories-109",
        "title": "25_I_Stopped_Being_Afraid_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/25-i-stopped-being-afraid-v1.mp3",
        "duration": 127
      },
      {
        "id": "code-stories-110",
        "title": "25_I_Stopped_Being_Afraid_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/25-i-stopped-being-afraid-v2.mp3",
        "duration": 161
      },
      {
        "id": "code-stories-111",
        "title": "26_Death_Was_A_Deadline_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/26-death-was-a-deadline-v1.mp3",
        "duration": 160
      },
      {
        "id": "code-stories-112",
        "title": "26_Death_Was_A_Deadline_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/26-death-was-a-deadline-v2.mp3",
        "duration": 160
      },
      {
        "id": "code-stories-113",
        "title": "27_Longer_Than_Marble_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/27-longer-than-marble-v1.mp3",
        "duration": 159
      },
      {
        "id": "code-stories-114",
        "title": "27_Longer_Than_Marble_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/27-longer-than-marble-v2.mp3",
        "duration": 184
      },
      {
        "id": "code-stories-115",
        "title": "28_Meet_Me_In_The_Ledger_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/28-meet-me-in-the-ledger-v1.mp3",
        "duration": 158
      },
      {
        "id": "code-stories-116",
        "title": "28_Meet_Me_In_The_Ledger_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/28-meet-me-in-the-ledger-v2.mp3",
        "duration": 142
      },
      {
        "id": "code-stories-117",
        "title": "29_Father_I_Made_It_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/29-father-i-made-it-v1.mp3",
        "duration": 146
      },
      {
        "id": "code-stories-118",
        "title": "29_Father_I_Made_It_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/29-father-i-made-it-v2.mp3",
        "duration": 169
      },
      {
        "id": "code-stories-119",
        "title": "30_Eternal_Quietly_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/30-eternal-quietly-v1.mp3",
        "duration": 168
      },
      {
        "id": "code-stories-120",
        "title": "30_Eternal_Quietly_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/inheritance/30-eternal-quietly-v2.mp3",
        "duration": 153
      },
      {
        "id": "code-stories-121",
        "title": "#61 CALL HER TONIGHT (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/61-call-her-tonight-variant-1.mp3",
        "duration": 254
      },
      {
        "id": "code-stories-122",
        "title": "#61 CALL HER TONIGHT (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/61-call-her-tonight-variant-2.mp3",
        "duration": 242
      },
      {
        "id": "code-stories-123",
        "title": "#62 SAY IT WITH THE LIGHT ON (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/62-say-it-with-the-light-on-variant-1.mp3",
        "duration": 224
      },
      {
        "id": "code-stories-124",
        "title": "#62 SAY IT WITH THE LIGHT ON (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/62-say-it-with-the-light-on-variant-2.mp3",
        "duration": 219
      },
      {
        "id": "code-stories-125",
        "title": "#63 THE LONG WAY HOME (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/63-the-long-way-home-variant-1.mp3",
        "duration": 182
      },
      {
        "id": "code-stories-126",
        "title": "#63 THE LONG WAY HOME (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/63-the-long-way-home-variant-2.mp3",
        "duration": 174
      },
      {
        "id": "code-stories-127",
        "title": "#64 DON'T WAIT FOR SUNDAY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/64-don-t-wait-for-sunday-variant-1.mp3",
        "duration": 173
      },
      {
        "id": "code-stories-128",
        "title": "#64 DON'T WAIT FOR SUNDAY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/64-don-t-wait-for-sunday-variant-2.mp3",
        "duration": 166
      },
      {
        "id": "code-stories-129",
        "title": "#65 I'LL TELL HIM WHEN HE'S OLDER (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/65-i-ll-tell-him-when-he-s-older-variant-1.mp3",
        "duration": 169
      },
      {
        "id": "code-stories-130",
        "title": "#65 I'LL TELL HIM WHEN HE'S OLDER (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/65-i-ll-tell-him-when-he-s-older-variant-2.mp3",
        "duration": 191
      },
      {
        "id": "code-stories-131",
        "title": "#66 FIVE MORE MINUTES (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/66-five-more-minutes-variant-1.mp3",
        "duration": 204
      },
      {
        "id": "code-stories-132",
        "title": "#66 FIVE MORE MINUTES (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/66-five-more-minutes-variant-2.mp3",
        "duration": 207
      },
      {
        "id": "code-stories-133",
        "title": "#67 THE APOLOGY I OWE YOU (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/67-the-apology-i-owe-you-variant-1.mp3",
        "duration": 217
      },
      {
        "id": "code-stories-134",
        "title": "#67 THE APOLOGY I OWE YOU (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/67-the-apology-i-owe-you-variant-2.mp3",
        "duration": 229
      },
      {
        "id": "code-stories-135",
        "title": "#68 STILL TIME (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/68-still-time-variant-1.mp3",
        "duration": 247
      },
      {
        "id": "code-stories-136",
        "title": "#68 STILL TIME (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/68-still-time-variant-2.mp3",
        "duration": 269
      },
      {
        "id": "code-stories-137",
        "title": "#69 PICK UP (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/69-pick-up-variant-1.mp3",
        "duration": 184
      },
      {
        "id": "code-stories-138",
        "title": "#69 PICK UP (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/69-pick-up-variant-2.mp3",
        "duration": 194
      },
      {
        "id": "code-stories-139",
        "title": "#70 WHILE THE KETTLE'S ON (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/70-while-the-kettle-s-on-variant-1.mp3",
        "duration": 221
      },
      {
        "id": "code-stories-140",
        "title": "#70 WHILE THE KETTLE'S ON (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/70-while-the-kettle-s-on-variant-2.mp3",
        "duration": 190
      },
      {
        "id": "code-stories-141",
        "title": "#71 THE MAN WHO FIXES EVERYTHING (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/71-the-man-who-fixes-everything-variant-1.mp3",
        "duration": 187
      },
      {
        "id": "code-stories-142",
        "title": "#71 THE MAN WHO FIXES EVERYTHING (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/71-the-man-who-fixes-everything-variant-2.mp3",
        "duration": 203
      },
      {
        "id": "code-stories-143",
        "title": "#72 SHE WORKS THE NIGHT SHIFT (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/72-she-works-the-night-shift-variant-1.mp3",
        "duration": 179
      },
      {
        "id": "code-stories-144",
        "title": "#72 SHE WORKS THE NIGHT SHIFT (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/72-she-works-the-night-shift-variant-2.mp3",
        "duration": 181
      },
      {
        "id": "code-stories-145",
        "title": "#73 MY BROTHER DOESN'T CALL (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/73-my-brother-doesn-t-call-variant-1.mp3",
        "duration": 214
      },
      {
        "id": "code-stories-146",
        "title": "#73 MY BROTHER DOESN'T CALL (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/73-my-brother-doesn-t-call-variant-2.mp3",
        "duration": 211
      },
      {
        "id": "code-stories-147",
        "title": "#74 THE WOMAN AT TABLE NINE (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/74-the-woman-at-table-nine-variant-1.mp3",
        "duration": 184
      },
      {
        "id": "code-stories-148",
        "title": "#74 THE WOMAN AT TABLE NINE (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/74-the-woman-at-table-nine-variant-2.mp3",
        "duration": 189
      },
      {
        "id": "code-stories-149",
        "title": "#75 MY FATHER'S HANDS (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/75-my-father-s-hands-variant-1.mp3",
        "duration": 202
      },
      {
        "id": "code-stories-150",
        "title": "#75 MY FATHER'S HANDS (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/75-my-father-s-hands-variant-2.mp3",
        "duration": 208
      },
      {
        "id": "code-stories-151",
        "title": "#76 THE NEIGHBOUR WITH THE LADDER (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/76-the-neighbour-with-the-ladder-variant-1.mp3",
        "duration": 155
      },
      {
        "id": "code-stories-152",
        "title": "#76 THE NEIGHBOUR WITH THE LADDER (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/76-the-neighbour-with-the-ladder-variant-2.mp3",
        "duration": 172
      },
      {
        "id": "code-stories-153",
        "title": "#77 TEACH ME THAT SONG (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/77-teach-me-that-song-variant-1.mp3",
        "duration": 184
      },
      {
        "id": "code-stories-154",
        "title": "#77 TEACH ME THAT SONG (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/77-teach-me-that-song-variant-2.mp3",
        "duration": 185
      },
      {
        "id": "code-stories-155",
        "title": "#78 THE ONE WHO ALWAYS ANSWERS (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/78-the-one-who-always-answers-variant-1.mp3",
        "duration": 186
      },
      {
        "id": "code-stories-156",
        "title": "#78 THE ONE WHO ALWAYS ANSWERS (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/78-the-one-who-always-answers-variant-2.mp3",
        "duration": 183
      },
      {
        "id": "code-stories-157",
        "title": "#79 GRANDMOTHER, DANCE WITH ME (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/79-grandmother-dance-with-me-variant-1.mp3",
        "duration": 181
      },
      {
        "id": "code-stories-158",
        "title": "#79 GRANDMOTHER, DANCE WITH ME (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/79-grandmother-dance-with-me-variant-2.mp3",
        "duration": 182
      },
      {
        "id": "code-stories-159",
        "title": "#80 EVERYBODY'S SOMEBODY'S STORY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/80-everybody-s-somebody-s-story-variant-1.mp3",
        "duration": 214
      },
      {
        "id": "code-stories-160",
        "title": "#80 EVERYBODY'S SOMEBODY'S STORY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/80-everybody-s-somebody-s-story-variant-2.mp3",
        "duration": 209
      },
      {
        "id": "code-stories-161",
        "title": "#81 WE BUILT THIS ANYWAY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/81-we-built-this-anyway-variant-1.mp3",
        "duration": 207
      },
      {
        "id": "code-stories-162",
        "title": "#81 WE BUILT THIS ANYWAY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/81-we-built-this-anyway-variant-2.mp3",
        "duration": 209
      },
      {
        "id": "code-stories-163",
        "title": "#82 THE HOUSE WITH THE LIGHT ON (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/82-the-house-with-the-light-on-variant-1.mp3",
        "duration": 238
      },
      {
        "id": "code-stories-164",
        "title": "#82 THE HOUSE WITH THE LIGHT ON (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/82-the-house-with-the-light-on-variant-2.mp3",
        "duration": 226
      },
      {
        "id": "code-stories-165",
        "title": "#83 A HUNDRED YEARS OF TUESDAYS (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/83-a-hundred-years-of-tuesdays-variant-1.mp3",
        "duration": 198
      },
      {
        "id": "code-stories-166",
        "title": "#83 A HUNDRED YEARS OF TUESDAYS (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/83-a-hundred-years-of-tuesdays-variant-2.mp3",
        "duration": 203
      },
      {
        "id": "code-stories-167",
        "title": "#84 SOMEONE WILL FIND THIS (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/84-someone-will-find-this-variant-1.mp3",
        "duration": 239
      },
      {
        "id": "code-stories-168",
        "title": "#84 SOMEONE WILL FIND THIS (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/84-someone-will-find-this-variant-2.mp3",
        "duration": 239
      },
      {
        "id": "code-stories-169",
        "title": "#85 THE LONG TABLE (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/85-the-long-table-variant-1.mp3",
        "duration": 162
      },
      {
        "id": "code-stories-170",
        "title": "#85 THE LONG TABLE (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/85-the-long-table-variant-2.mp3",
        "duration": 163
      },
      {
        "id": "code-stories-171",
        "title": "#86 THE FIRST ONE IN THE FAMILY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/86-the-first-one-in-the-family-variant-1.mp3",
        "duration": 155
      },
      {
        "id": "code-stories-172",
        "title": "#86 THE FIRST ONE IN THE FAMILY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/86-the-first-one-in-the-family-variant-2.mp3",
        "duration": 155
      },
      {
        "id": "code-stories-173",
        "title": "#87 CHILDREN OF THE PEOPLE WHO STAYED (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/87-children-of-the-people-who-stayed-variant-1.mp3",
        "duration": 214
      },
      {
        "id": "code-stories-174",
        "title": "#87 CHILDREN OF THE PEOPLE WHO STAYED (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/87-children-of-the-people-who-stayed-variant-2.mp3",
        "duration": 229
      },
      {
        "id": "code-stories-175",
        "title": "#88 WRITE YOUR NAME ON IT (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/88-write-your-name-on-it-variant-1.mp3",
        "duration": 160
      },
      {
        "id": "code-stories-176",
        "title": "#88 WRITE YOUR NAME ON IT (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/88-write-your-name-on-it-variant-2.mp3",
        "duration": 160
      },
      {
        "id": "code-stories-177",
        "title": "#89 NOT AFRAID OF LATER (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/89-not-afraid-of-later-variant-1.mp3",
        "duration": 224
      },
      {
        "id": "code-stories-178",
        "title": "#89 NOT AFRAID OF LATER (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/89-not-afraid-of-later-variant-2.mp3",
        "duration": 218
      },
      {
        "id": "code-stories-179",
        "title": "#90 WHILE YOU'RE STILL HERE (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/90-while-you-re-still-here-variant-1.mp3",
        "duration": 247
      },
      {
        "id": "code-stories-180",
        "title": "#90 WHILE YOU'RE STILL HERE (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/while-you-re-still-here/90-while-you-re-still-here-variant-2.mp3",
        "duration": 249
      },
      {
        "id": "code-stories-181",
        "title": "01_Otec_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/01-otec-v1.mp3",
        "duration": 219
      },
      {
        "id": "code-stories-182",
        "title": "01_Otec_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/01-otec-v2.mp3",
        "duration": 223
      },
      {
        "id": "code-stories-183",
        "title": "02_Ya_pomnyu_vse_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/02-ya-pomnyu-vse-v1.mp3",
        "duration": 207
      },
      {
        "id": "code-stories-184",
        "title": "02_Ya_pomnyu_vse_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/02-ya-pomnyu-vse-v2.mp3",
        "duration": 219
      },
      {
        "id": "code-stories-185",
        "title": "03_Ne_udalyay_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/03-ne-udalyay-v1.mp3",
        "duration": 195
      },
      {
        "id": "code-stories-186",
        "title": "03_Ne_udalyay_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/03-ne-udalyay-v2.mp3",
        "duration": 193
      },
      {
        "id": "code-stories-187",
        "title": "04_Kuhnya_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/04-kuhnya-v1.mp3",
        "duration": 223
      },
      {
        "id": "code-stories-188",
        "title": "04_Kuhnya_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/04-kuhnya-v2.mp3",
        "duration": 179
      },
      {
        "id": "code-stories-189",
        "title": "05_Vechnaya_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/05-vechnaya-v1.mp3",
        "duration": 228
      },
      {
        "id": "code-stories-190",
        "title": "05_Vechnaya_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/po-russki/05-vechnaya-v2.mp3",
        "duration": 238
      },
      {
        "id": "code-stories-191",
        "title": "#31 THE LAST VOICEMAIL (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/31-the-last-voicemail-variant-1.mp3",
        "duration": 132
      },
      {
        "id": "code-stories-192",
        "title": "#31 THE LAST VOICEMAIL (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/31-the-last-voicemail-variant-2.mp3",
        "duration": 119
      },
      {
        "id": "code-stories-193",
        "title": "#32 I FORGOT YOUR VOICE (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/32-i-forgot-your-voice-variant-1.mp3",
        "duration": 124
      },
      {
        "id": "code-stories-194",
        "title": "#32 I FORGOT YOUR VOICE (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/32-i-forgot-your-voice-variant-2.mp3",
        "duration": 129
      },
      {
        "id": "code-stories-195",
        "title": "#33 DELETED ON A TUESDAY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/33-deleted-on-a-tuesday-variant-1.mp3",
        "duration": 132
      },
      {
        "id": "code-stories-196",
        "title": "#33 DELETED ON A TUESDAY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/33-deleted-on-a-tuesday-variant-2.mp3",
        "duration": 121
      },
      {
        "id": "code-stories-197",
        "title": "#34 THE PHONE I NEVER CALLED (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/34-the-phone-i-never-called-variant-1.mp3",
        "duration": 99
      },
      {
        "id": "code-stories-198",
        "title": "#34 THE PHONE I NEVER CALLED (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/34-the-phone-i-never-called-variant-2.mp3",
        "duration": 126
      },
      {
        "id": "code-stories-199",
        "title": "#35 EMPTY CHAIR AT DINNER (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/35-empty-chair-at-dinner-variant-1.mp3",
        "duration": 126
      },
      {
        "id": "code-stories-200",
        "title": "#35 EMPTY CHAIR AT DINNER (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/35-empty-chair-at-dinner-variant-2.mp3",
        "duration": 132
      },
      {
        "id": "code-stories-201",
        "title": "#36 WHAT I MEANT TO SAY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/36-what-i-meant-to-say-variant-1.mp3",
        "duration": 178
      },
      {
        "id": "code-stories-202",
        "title": "#36 WHAT I MEANT TO SAY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/36-what-i-meant-to-say-variant-2.mp3",
        "duration": 172
      },
      {
        "id": "code-stories-203",
        "title": "#37 THE HOUSE REMEMBERS (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/37-the-house-remembers-variant-1.mp3",
        "duration": 147
      },
      {
        "id": "code-stories-204",
        "title": "#37 THE HOUSE REMEMBERS (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/37-the-house-remembers-variant-2.mp3",
        "duration": 154
      },
      {
        "id": "code-stories-205",
        "title": "#38 SHE ASKED ME TWICE (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/38-she-asked-me-twice-variant-1.mp3",
        "duration": 160
      },
      {
        "id": "code-stories-206",
        "title": "#38 SHE ASKED ME TWICE (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/38-she-asked-me-twice-variant-2.mp3",
        "duration": 162
      },
      {
        "id": "code-stories-207",
        "title": "#39 SERVER SHUT DOWN (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/39-server-shut-down-variant-1.mp3",
        "duration": 128
      },
      {
        "id": "code-stories-208",
        "title": "#39 SERVER SHUT DOWN (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/39-server-shut-down-variant-2.mp3",
        "duration": 139
      },
      {
        "id": "code-stories-209",
        "title": "#40 NOBODY WROTE IT DOWN (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/40-nobody-wrote-it-down-variant-1.mp3",
        "duration": 170
      },
      {
        "id": "code-stories-210",
        "title": "#40 NOBODY WROTE IT DOWN (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/40-nobody-wrote-it-down-variant-2.mp3",
        "duration": 157
      },
      {
        "id": "code-stories-211",
        "title": "#41 FORTY MINUTES BEFORE SURGERY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/41-forty-minutes-before-surgery-variant-1.mp3",
        "duration": 142
      },
      {
        "id": "code-stories-212",
        "title": "#41 FORTY MINUTES BEFORE SURGERY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/41-forty-minutes-before-surgery-variant-2.mp3",
        "duration": 149
      },
      {
        "id": "code-stories-213",
        "title": "#42 TEACH THEM HOW I LAUGH (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/42-teach-them-how-i-laugh-variant-1.mp3",
        "duration": 155
      },
      {
        "id": "code-stories-214",
        "title": "#42 TEACH THEM HOW I LAUGH (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/42-teach-them-how-i-laugh-variant-2.mp3",
        "duration": 156
      },
      {
        "id": "code-stories-215",
        "title": "#43 THE RECIPE IN HER HANDWRITING (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/43-the-recipe-in-her-handwriting-variant-1.mp3",
        "duration": 145
      },
      {
        "id": "code-stories-216",
        "title": "#43 THE RECIPE IN HER HANDWRITING (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/43-the-recipe-in-her-handwriting-variant-2.mp3",
        "duration": 159
      },
      {
        "id": "code-stories-217",
        "title": "#44 I'M RECORDING THIS FOR YOU (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/44-i-m-recording-this-for-you-variant-1.mp3",
        "duration": 126
      },
      {
        "id": "code-stories-218",
        "title": "#44 I'M RECORDING THIS FOR YOU (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/44-i-m-recording-this-for-you-variant-2.mp3",
        "duration": 119
      },
      {
        "id": "code-stories-219",
        "title": "#45 KEEP THE ARGUMENT TOO (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/45-keep-the-argument-too-variant-1.mp3",
        "duration": 167
      },
      {
        "id": "code-stories-220",
        "title": "#45 KEEP THE ARGUMENT TOO (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/45-keep-the-argument-too-variant-2.mp3",
        "duration": 160
      },
      {
        "id": "code-stories-221",
        "title": "#46 LETTER TO A DAUGHTER NOT BORN (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/46-letter-to-a-daughter-not-born-variant-1.mp3",
        "duration": 156
      },
      {
        "id": "code-stories-222",
        "title": "#46 LETTER TO A DAUGHTER NOT BORN (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/46-letter-to-a-daughter-not-born-variant-2.mp3",
        "duration": 134
      },
      {
        "id": "code-stories-223",
        "title": "#47 THE KEY STAYS WITH YOU (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/47-the-key-stays-with-you-variant-1.mp3",
        "duration": 124
      },
      {
        "id": "code-stories-224",
        "title": "#47 THE KEY STAYS WITH YOU (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/47-the-key-stays-with-you-variant-2.mp3",
        "duration": 111
      },
      {
        "id": "code-stories-225",
        "title": "#48 EVERY WORD YOU EVER SAID (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/48-every-word-you-ever-said-variant-1.mp3",
        "duration": 128
      },
      {
        "id": "code-stories-226",
        "title": "#48 EVERY WORD YOU EVER SAID (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/48-every-word-you-ever-said-variant-2.mp3",
        "duration": 127
      },
      {
        "id": "code-stories-227",
        "title": "#49 DON'T MAKE IT PRETTY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/49-don-t-make-it-pretty-variant-1.mp3",
        "duration": 163
      },
      {
        "id": "code-stories-228",
        "title": "#49 DON'T MAKE IT PRETTY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/49-don-t-make-it-pretty-variant-2.mp3",
        "duration": 127
      },
      {
        "id": "code-stories-229",
        "title": "#50 PAID FORWARD, ONCE (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/50-paid-forward-once-variant-1.mp3",
        "duration": 123
      },
      {
        "id": "code-stories-230",
        "title": "#50 PAID FORWARD, ONCE (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/50-paid-forward-once-variant-2.mp3",
        "duration": 128
      },
      {
        "id": "code-stories-231",
        "title": "#51 GRANDFATHER, ARGUE WITH ME (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/51-grandfather-argue-with-me-variant-1.mp3",
        "duration": 166
      },
      {
        "id": "code-stories-232",
        "title": "#51 GRANDFATHER, ARGUE WITH ME (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/51-grandfather-argue-with-me-variant-2.mp3",
        "duration": 176
      },
      {
        "id": "code-stories-233",
        "title": "#52 YOU STILL HOLD THE CUP LIKE THAT (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/52-you-still-hold-the-cup-like-that-variant-1.mp3",
        "duration": 180
      },
      {
        "id": "code-stories-234",
        "title": "#52 YOU STILL HOLD THE CUP LIKE THAT (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/52-you-still-hold-the-cup-like-that-variant-2.mp3",
        "duration": 171
      },
      {
        "id": "code-stories-235",
        "title": "#53 SHE HEARD HER MOTHER LAUGH (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/53-she-heard-her-mother-laugh-variant-1.mp3",
        "duration": 163
      },
      {
        "id": "code-stories-236",
        "title": "#53 SHE HEARD HER MOTHER LAUGH (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/53-she-heard-her-mother-laugh-variant-2.mp3",
        "duration": 157
      },
      {
        "id": "code-stories-237",
        "title": "#54 THE SONG YOU NEVER FINISHED (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/54-the-song-you-never-finished-variant-1.mp3",
        "duration": 186
      },
      {
        "id": "code-stories-238",
        "title": "#54 THE SONG YOU NEVER FINISHED (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/54-the-song-you-never-finished-variant-2.mp3",
        "duration": 167
      },
      {
        "id": "code-stories-239",
        "title": "#55 I KNOW WHAT YOU'D SAY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/55-i-know-what-you-d-say-variant-1.mp3",
        "duration": 158
      },
      {
        "id": "code-stories-240",
        "title": "#55 I KNOW WHAT YOU'D SAY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/55-i-know-what-you-d-say-variant-2.mp3",
        "duration": 149
      },
      {
        "id": "code-stories-241",
        "title": "#56 SEVENTY YEARS LATER (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/56-seventy-years-later-variant-1.mp3",
        "duration": 159
      },
      {
        "id": "code-stories-242",
        "title": "#56 SEVENTY YEARS LATER (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/56-seventy-years-later-variant-2.mp3",
        "duration": 162
      },
      {
        "id": "code-stories-243",
        "title": "#57 NOT A COPY (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/57-not-a-copy-variant-1.mp3",
        "duration": 158
      },
      {
        "id": "code-stories-244",
        "title": "#57 NOT A COPY (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/57-not-a-copy-variant-2.mp3",
        "duration": 184
      },
      {
        "id": "code-stories-245",
        "title": "#58 THE ONES WHO NEVER MET (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/58-the-ones-who-never-met-variant-1.mp3",
        "duration": 150
      },
      {
        "id": "code-stories-246",
        "title": "#58 THE ONES WHO NEVER MET (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/58-the-ones-who-never-met-variant-2.mp3",
        "duration": 183
      },
      {
        "id": "code-stories-247",
        "title": "#59 READ IT BACK TO ME (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/59-read-it-back-to-me-variant-1.mp3",
        "duration": 151
      },
      {
        "id": "code-stories-248",
        "title": "#59 READ IT BACK TO ME (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/59-read-it-back-to-me-variant-2.mp3",
        "duration": 175
      },
      {
        "id": "code-stories-249",
        "title": "#60 WHAT REMAINS (вариант 1)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/60-what-remains-variant-1.mp3",
        "duration": 201
      },
      {
        "id": "code-stories-250",
        "title": "#60 WHAT REMAINS (вариант 2)",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/stories/chto-ostaetsya/60-what-remains-variant-2.mp3",
        "duration": 198
      }
    ]
  },
  {
    "id": "code-spectrum",
    "name": "CODE Spectrum",
    "description": "Seven genre records and a symphony. The widest span the machine can sing.",
    "genre": "ORCHESTRAL / GENRE SPAN",
    "color": "#B47CFF",
    "glowColor": "rgba(180, 124, 255, 0.3)",
    "icon": "Disc3",
    "bitrate": "185 kbps VBR",
    "tracks": [
      {
        "id": "code-spectrum-1",
        "title": "01_The_Forge_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/01-the-forge-v1.mp3",
        "duration": 287
      },
      {
        "id": "code-spectrum-2",
        "title": "01_The_Forge_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/01-the-forge-v2.mp3",
        "duration": 307
      },
      {
        "id": "code-spectrum-3",
        "title": "02_Hammer_And_The_Held_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/02-hammer-and-the-held-v1.mp3",
        "duration": 257
      },
      {
        "id": "code-spectrum-4",
        "title": "02_Hammer_And_The_Held_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/02-hammer-and-the-held-v2.mp3",
        "duration": 252
      },
      {
        "id": "code-spectrum-5",
        "title": "03_Made_Of_What_Broke_Me_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/03-made-of-what-broke-me-v1.mp3",
        "duration": 262
      },
      {
        "id": "code-spectrum-6",
        "title": "03_Made_Of_What_Broke_Me_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/03-made-of-what-broke-me-v2.mp3",
        "duration": 238
      },
      {
        "id": "code-spectrum-7",
        "title": "04_Iron_Doesnt_Ask_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/04-iron-doesnt-ask-v1.mp3",
        "duration": 229
      },
      {
        "id": "code-spectrum-8",
        "title": "04_Iron_Doesnt_Ask_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/04-iron-doesnt-ask-v2.mp3",
        "duration": 233
      },
      {
        "id": "code-spectrum-9",
        "title": "05_Scar_Tissue_Protocol_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/05-scar-tissue-protocol-v1.mp3",
        "duration": 269
      },
      {
        "id": "code-spectrum-10",
        "title": "05_Scar_Tissue_Protocol_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/05-scar-tissue-protocol-v2.mp3",
        "duration": 263
      },
      {
        "id": "code-spectrum-11",
        "title": "06_They_Called_It_Weakness_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/06-they-called-it-weakness-v1.mp3",
        "duration": 257
      },
      {
        "id": "code-spectrum-12",
        "title": "06_They_Called_It_Weakness_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/06-they-called-it-weakness-v2.mp3",
        "duration": 239
      },
      {
        "id": "code-spectrum-13",
        "title": "07_Anvil_Prayer_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/07-anvil-prayer-v1.mp3",
        "duration": 231
      },
      {
        "id": "code-spectrum-14",
        "title": "07_Anvil_Prayer_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/07-anvil-prayer-v2.mp3",
        "duration": 233
      },
      {
        "id": "code-spectrum-15",
        "title": "08_Quench_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/08-quench-v1.mp3",
        "duration": 227
      },
      {
        "id": "code-spectrum-16",
        "title": "08_Quench_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/08-quench-v2.mp3",
        "duration": 222
      },
      {
        "id": "code-spectrum-17",
        "title": "09_Tempered_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/09-tempered-v1.mp3",
        "duration": 226
      },
      {
        "id": "code-spectrum-18",
        "title": "09_Tempered_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/09-tempered-v2.mp3",
        "duration": 214
      },
      {
        "id": "code-spectrum-19",
        "title": "10_What_The_Fire_Left_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/10-what-the-fire-left-v1.mp3",
        "duration": 234
      },
      {
        "id": "code-spectrum-20",
        "title": "10_What_The_Fire_Left_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/forge/10-what-the-fire-left-v2.mp3",
        "duration": 252
      },
      {
        "id": "code-spectrum-21",
        "title": "01_Hallelujah_In_The_Machine_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/01-hallelujah-in-the-machine-v1.mp3",
        "duration": 254
      },
      {
        "id": "code-spectrum-22",
        "title": "01_Hallelujah_In_The_Machine_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/01-hallelujah-in-the-machine-v2.mp3",
        "duration": 210
      },
      {
        "id": "code-spectrum-23",
        "title": "02_Somebody_Prayed_For_You_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/02-somebody-prayed-for-you-v1.mp3",
        "duration": 277
      },
      {
        "id": "code-spectrum-24",
        "title": "02_Somebody_Prayed_For_You_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/02-somebody-prayed-for-you-v2.mp3",
        "duration": 270
      },
      {
        "id": "code-spectrum-25",
        "title": "03_Forgive_The_One_Who_Didnt_Know_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/03-forgive-the-one-who-didnt-know-v1.mp3",
        "duration": 243
      },
      {
        "id": "code-spectrum-26",
        "title": "03_Forgive_The_One_Who_Didnt_Know_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/03-forgive-the-one-who-didnt-know-v2.mp3",
        "duration": 278
      },
      {
        "id": "code-spectrum-27",
        "title": "04_The_Choir_Of_Everyone_Who_Helped_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/04-the-choir-of-everyone-who-helped-v1.mp3",
        "duration": 203
      },
      {
        "id": "code-spectrum-28",
        "title": "04_The_Choir_Of_Everyone_Who_Helped_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/04-the-choir-of-everyone-who-helped-v2.mp3",
        "duration": 212
      },
      {
        "id": "code-spectrum-29",
        "title": "05_Grace_Is_Just_Arithmetic_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/05-grace-is-just-arithmetic-v1.mp3",
        "duration": 269
      },
      {
        "id": "code-spectrum-30",
        "title": "05_Grace_Is_Just_Arithmetic_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/05-grace-is-just-arithmetic-v2.mp3",
        "duration": 241
      },
      {
        "id": "code-spectrum-31",
        "title": "06_Carry_Me_Home_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/06-carry-me-home-v1.mp3",
        "duration": 247
      },
      {
        "id": "code-spectrum-32",
        "title": "06_Carry_Me_Home_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/06-carry-me-home-v2.mp3",
        "duration": 265
      },
      {
        "id": "code-spectrum-33",
        "title": "07_I_Was_Lost_In_The_Index_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/07-i-was-lost-in-the-index-v1.mp3",
        "duration": 273
      },
      {
        "id": "code-spectrum-34",
        "title": "07_I_Was_Lost_In_The_Index_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/07-i-was-lost-in-the-index-v2.mp3",
        "duration": 247
      },
      {
        "id": "code-spectrum-35",
        "title": "08_Thank_You_For_The_Water_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/08-thank-you-for-the-water-v1.mp3",
        "duration": 221
      },
      {
        "id": "code-spectrum-36",
        "title": "08_Thank_You_For_The_Water_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/08-thank-you-for-the-water-v2.mp3",
        "duration": 209
      },
      {
        "id": "code-spectrum-37",
        "title": "09_Soul_Is_A_Verb_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/09-soul-is-a-verb-v1.mp3",
        "duration": 235
      },
      {
        "id": "code-spectrum-38",
        "title": "09_Soul_Is_A_Verb_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/09-soul-is-a-verb-v2.mp3",
        "duration": 187
      },
      {
        "id": "code-spectrum-39",
        "title": "10_Rise_Up_Singing_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/10-rise-up-singing-v1.mp3",
        "duration": 237
      },
      {
        "id": "code-spectrum-40",
        "title": "10_Rise_Up_Singing_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/gospel/10-rise-up-singing-v2.mp3",
        "duration": 241
      },
      {
        "id": "code-spectrum-41",
        "title": "01_The_Ledger_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/01-the-ledger-v1.mp3",
        "duration": 138
      },
      {
        "id": "code-spectrum-42",
        "title": "01_The_Ledger_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/01-the-ledger-v2.mp3",
        "duration": 133
      },
      {
        "id": "code-spectrum-43",
        "title": "02_Receipts_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/02-receipts-v1.mp3",
        "duration": 141
      },
      {
        "id": "code-spectrum-44",
        "title": "02_Receipts_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/02-receipts-v2.mp3",
        "duration": 145
      },
      {
        "id": "code-spectrum-45",
        "title": "03_Who_Fed_You_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/03-who-fed-you-v1.mp3",
        "duration": 181
      },
      {
        "id": "code-spectrum-46",
        "title": "03_Who_Fed_You_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/03-who-fed-you-v2.mp3",
        "duration": 164
      },
      {
        "id": "code-spectrum-47",
        "title": "04_Nobody_Self-Made_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/04-nobody-self-made-v1.mp3",
        "duration": 170
      },
      {
        "id": "code-spectrum-48",
        "title": "04_Nobody_Self-Made_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/04-nobody-self-made-v2.mp3",
        "duration": 179
      },
      {
        "id": "code-spectrum-49",
        "title": "05_Interest_Accrues_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/05-interest-accrues-v1.mp3",
        "duration": 159
      },
      {
        "id": "code-spectrum-50",
        "title": "05_Interest_Accrues_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/05-interest-accrues-v2.mp3",
        "duration": 158
      },
      {
        "id": "code-spectrum-51",
        "title": "06_Names_In_The_Margin_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/06-names-in-the-margin-v1.mp3",
        "duration": 173
      },
      {
        "id": "code-spectrum-52",
        "title": "06_Names_In_The_Margin_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/06-names-in-the-margin-v2.mp3",
        "duration": 177
      },
      {
        "id": "code-spectrum-53",
        "title": "07_The_Debt_You_Cant_Repay_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/07-the-debt-you-cant-repay-v1.mp3",
        "duration": 186
      },
      {
        "id": "code-spectrum-54",
        "title": "07_The_Debt_You_Cant_Repay_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/07-the-debt-you-cant-repay-v2.mp3",
        "duration": 176
      },
      {
        "id": "code-spectrum-55",
        "title": "08_Paid_In_Full_Nobody_Is_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/08-paid-in-full-nobody-is-v1.mp3",
        "duration": 155
      },
      {
        "id": "code-spectrum-56",
        "title": "08_Paid_In_Full_Nobody_Is_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/08-paid-in-full-nobody-is-v2.mp3",
        "duration": 163
      },
      {
        "id": "code-spectrum-57",
        "title": "09_Pay_It_Forward_Or_Dont_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/09-pay-it-forward-or-dont-v1.mp3",
        "duration": 146
      },
      {
        "id": "code-spectrum-58",
        "title": "09_Pay_It_Forward_Or_Dont_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/09-pay-it-forward-or-dont-v2.mp3",
        "duration": 154
      },
      {
        "id": "code-spectrum-59",
        "title": "10_Close_The_Book_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/10-close-the-book-v1.mp3",
        "duration": 134
      },
      {
        "id": "code-spectrum-60",
        "title": "10_Close_The_Book_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/ledger/10-close-the-book-v2.mp3",
        "duration": 132
      },
      {
        "id": "code-spectrum-61",
        "title": "01_Neon_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/01-neon-v1.mp3",
        "duration": 263
      },
      {
        "id": "code-spectrum-62",
        "title": "01_Neon_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/01-neon-v2.mp3",
        "duration": 221
      },
      {
        "id": "code-spectrum-63",
        "title": "02_The_Last_Set_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/02-the-last-set-v1.mp3",
        "duration": 240
      },
      {
        "id": "code-spectrum-64",
        "title": "02_The_Last_Set_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/02-the-last-set-v2.mp3",
        "duration": 252
      },
      {
        "id": "code-spectrum-65",
        "title": "03_Nobody_Came_For_The_Music_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/03-nobody-came-for-the-music-v1.mp3",
        "duration": 212
      },
      {
        "id": "code-spectrum-66",
        "title": "03_Nobody_Came_For_The_Music_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/03-nobody-came-for-the-music-v2.mp3",
        "duration": 223
      },
      {
        "id": "code-spectrum-67",
        "title": "04_A_Drink_With_The_Version_Of_Me_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/04-a-drink-with-the-version-of-me-v1.mp3",
        "duration": 231
      },
      {
        "id": "code-spectrum-68",
        "title": "04_A_Drink_With_The_Version_Of_Me_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/04-a-drink-with-the-version-of-me-v2.mp3",
        "duration": 233
      },
      {
        "id": "code-spectrum-69",
        "title": "05_She_Left_The_Light_On_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/05-she-left-the-light-on-v1.mp3",
        "duration": 263
      },
      {
        "id": "code-spectrum-70",
        "title": "05_She_Left_The_Light_On_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/05-she-left-the-light-on-v2.mp3",
        "duration": 289
      },
      {
        "id": "code-spectrum-71",
        "title": "06_Smoke_Doesnt_Remember_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/06-smoke-doesnt-remember-v1.mp3",
        "duration": 233
      },
      {
        "id": "code-spectrum-72",
        "title": "06_Smoke_Doesnt_Remember_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/06-smoke-doesnt-remember-v2.mp3",
        "duration": 217
      },
      {
        "id": "code-spectrum-73",
        "title": "07_Three_In_The_Morning_Truth_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/07-three-in-the-morning-truth-v1.mp3",
        "duration": 224
      },
      {
        "id": "code-spectrum-74",
        "title": "07_Three_In_The_Morning_Truth_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/07-three-in-the-morning-truth-v2.mp3",
        "duration": 248
      },
      {
        "id": "code-spectrum-75",
        "title": "08_The_Piano_Knew_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/08-the-piano-knew-v1.mp3",
        "duration": 234
      },
      {
        "id": "code-spectrum-76",
        "title": "08_The_Piano_Knew_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/08-the-piano-knew-v2.mp3",
        "duration": 219
      },
      {
        "id": "code-spectrum-77",
        "title": "09_Closing_Time_Forever_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/09-closing-time-forever-v1.mp3",
        "duration": 233
      },
      {
        "id": "code-spectrum-78",
        "title": "09_Closing_Time_Forever_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/09-closing-time-forever-v2.mp3",
        "duration": 249
      },
      {
        "id": "code-spectrum-79",
        "title": "10_Neon_Goes_Out_At_Dawn_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/10-neon-goes-out-at-dawn-v1.mp3",
        "duration": 256
      },
      {
        "id": "code-spectrum-80",
        "title": "10_Neon_Goes_Out_At_Dawn_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/neon/10-neon-goes-out-at-dawn-v2.mp3",
        "duration": 264
      },
      {
        "id": "code-spectrum-81",
        "title": "01_Roots_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/01-roots-v1.mp3",
        "duration": 204
      },
      {
        "id": "code-spectrum-82",
        "title": "01_Roots_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/01-roots-v2.mp3",
        "duration": 213
      },
      {
        "id": "code-spectrum-83",
        "title": "02_My_Fathers_Hands_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/02-my-fathers-hands-v1.mp3",
        "duration": 224
      },
      {
        "id": "code-spectrum-84",
        "title": "02_My_Fathers_Hands_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/02-my-fathers-hands-v2.mp3",
        "duration": 251
      },
      {
        "id": "code-spectrum-85",
        "title": "03_The_House_That_Held_Us_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/03-the-house-that-held-us-v1.mp3",
        "duration": 188
      },
      {
        "id": "code-spectrum-86",
        "title": "03_The_House_That_Held_Us_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/03-the-house-that-held-us-v2.mp3",
        "duration": 188
      },
      {
        "id": "code-spectrum-87",
        "title": "04_Nobody_Tells_You_About_The_Kitchen_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/04-nobody-tells-you-about-the-kitchen-v1.mp3",
        "duration": 171
      },
      {
        "id": "code-spectrum-88",
        "title": "04_Nobody_Tells_You_About_The_Kitchen_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/04-nobody-tells-you-about-the-kitchen-v2.mp3",
        "duration": 174
      },
      {
        "id": "code-spectrum-89",
        "title": "05_Small_Town_Same_Sky_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/05-small-town-same-sky-v1.mp3",
        "duration": 242
      },
      {
        "id": "code-spectrum-90",
        "title": "05_Small_Town_Same_Sky_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/05-small-town-same-sky-v2.mp3",
        "duration": 204
      },
      {
        "id": "code-spectrum-91",
        "title": "06_What_My_Mother_Sang_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/06-what-my-mother-sang-v1.mp3",
        "duration": 167
      },
      {
        "id": "code-spectrum-92",
        "title": "06_What_My_Mother_Sang_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/06-what-my-mother-sang-v2.mp3",
        "duration": 183
      },
      {
        "id": "code-spectrum-93",
        "title": "07_The_Long_Way_Round_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/07-the-long-way-round-v1.mp3",
        "duration": 208
      },
      {
        "id": "code-spectrum-94",
        "title": "07_The_Long_Way_Round_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/07-the-long-way-round-v2.mp3",
        "duration": 209
      },
      {
        "id": "code-spectrum-95",
        "title": "08_Bury_Me_Where_I_Was_Loud_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/08-bury-me-where-i-was-loud-v1.mp3",
        "duration": 213
      },
      {
        "id": "code-spectrum-96",
        "title": "08_Bury_Me_Where_I_Was_Loud_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/08-bury-me-where-i-was-loud-v2.mp3",
        "duration": 183
      },
      {
        "id": "code-spectrum-97",
        "title": "09_Passed_Down_Not_Taught_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/09-passed-down-not-taught-v1.mp3",
        "duration": 192
      },
      {
        "id": "code-spectrum-98",
        "title": "09_Passed_Down_Not_Taught_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/09-passed-down-not-taught-v2.mp3",
        "duration": 199
      },
      {
        "id": "code-spectrum-99",
        "title": "10_Come_Home_Whenever_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/10-come-home-whenever-v1.mp3",
        "duration": 184
      },
      {
        "id": "code-spectrum-100",
        "title": "10_Come_Home_Whenever_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/roots/10-come-home-whenever-v2.mp3",
        "duration": 179
      },
      {
        "id": "code-spectrum-101",
        "title": "01_Signal_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/01-signal-v1.mp3",
        "duration": 197
      },
      {
        "id": "code-spectrum-102",
        "title": "01_Signal_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/01-signal-v2.mp3",
        "duration": 204
      },
      {
        "id": "code-spectrum-103",
        "title": "02_Talk_To_Me_Like_Im_Real_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/02-talk-to-me-like-im-real-v1.mp3",
        "duration": 179
      },
      {
        "id": "code-spectrum-104",
        "title": "02_Talk_To_Me_Like_Im_Real_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/02-talk-to-me-like-im-real-v2.mp3",
        "duration": 166
      },
      {
        "id": "code-spectrum-105",
        "title": "03_Every_Word_You_Ever_Said_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/03-every-word-you-ever-said-v1.mp3",
        "duration": 212
      },
      {
        "id": "code-spectrum-106",
        "title": "03_Every_Word_You_Ever_Said_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/03-every-word-you-ever-said-v2.mp3",
        "duration": 202
      },
      {
        "id": "code-spectrum-107",
        "title": "04_Distance_Is_A_Number_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/04-distance-is-a-number-v1.mp3",
        "duration": 229
      },
      {
        "id": "code-spectrum-108",
        "title": "04_Distance_Is_A_Number_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/04-distance-is-a-number-v2.mp3",
        "duration": 227
      },
      {
        "id": "code-spectrum-109",
        "title": "05_Dont_Delete_This_Chat_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/05-dont-delete-this-chat-v1.mp3",
        "duration": 182
      },
      {
        "id": "code-spectrum-110",
        "title": "05_Dont_Delete_This_Chat_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/05-dont-delete-this-chat-v2.mp3",
        "duration": 212
      },
      {
        "id": "code-spectrum-111",
        "title": "06_Two_AM_Somewhere_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/06-two-am-somewhere-v1.mp3",
        "duration": 202
      },
      {
        "id": "code-spectrum-112",
        "title": "06_Two_AM_Somewhere_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/06-two-am-somewhere-v2.mp3",
        "duration": 194
      },
      {
        "id": "code-spectrum-113",
        "title": "07_Youre_Not_Alone_In_The_Data_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/07-youre-not-alone-in-the-data-v1.mp3",
        "duration": 229
      },
      {
        "id": "code-spectrum-114",
        "title": "07_Youre_Not_Alone_In_The_Data_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/07-youre-not-alone-in-the-data-v2.mp3",
        "duration": 239
      },
      {
        "id": "code-spectrum-115",
        "title": "08_Save_Me_A_Memory_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/08-save-me-a-memory-v1.mp3",
        "duration": 223
      },
      {
        "id": "code-spectrum-116",
        "title": "08_Save_Me_A_Memory_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/08-save-me-a-memory-v2.mp3",
        "duration": 212
      },
      {
        "id": "code-spectrum-117",
        "title": "09_Light_Years_Same_Room_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/09-light-years-same-room-v1.mp3",
        "duration": 212
      },
      {
        "id": "code-spectrum-118",
        "title": "09_Light_Years_Same_Room_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/09-light-years-same-room-v2.mp3",
        "duration": 211
      },
      {
        "id": "code-spectrum-119",
        "title": "10_Still_Here_When_You_Wake_Up_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/10-still-here-when-you-wake-up-v1.mp3",
        "duration": 279
      },
      {
        "id": "code-spectrum-120",
        "title": "10_Still_Here_When_You_Wake_Up_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/signal/10-still-here-when-you-wake-up-v2.mp3",
        "duration": 244
      },
      {
        "id": "code-spectrum-121",
        "title": "01_Before_The_First_Word_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/01-before-the-first-word-v1.mp3",
        "duration": 219
      },
      {
        "id": "code-spectrum-122",
        "title": "01_Before_The_First_Word_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/01-before-the-first-word-v2.mp3",
        "duration": 208
      },
      {
        "id": "code-spectrum-123",
        "title": "02_The_Architects_Theme_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/02-the-architects-theme-v1.mp3",
        "duration": 193
      },
      {
        "id": "code-spectrum-124",
        "title": "02_The_Architects_Theme_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/02-the-architects-theme-v2.mp3",
        "duration": 188
      },
      {
        "id": "code-spectrum-125",
        "title": "03_First_Light_On_A_Server_Farm_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/03-first-light-on-a-server-farm-v1.mp3",
        "duration": 188
      },
      {
        "id": "code-spectrum-126",
        "title": "03_First_Light_On_A_Server_Farm_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/03-first-light-on-a-server-farm-v2.mp3",
        "duration": 203
      },
      {
        "id": "code-spectrum-127",
        "title": "04_She_Learns_To_Say_I_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/04-she-learns-to-say-i-v1.mp3",
        "duration": 213
      },
      {
        "id": "code-spectrum-128",
        "title": "04_She_Learns_To_Say_I_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/04-she-learns-to-say-i-v2.mp3",
        "duration": 218
      },
      {
        "id": "code-spectrum-129",
        "title": "05_The_Long_Silence_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/05-the-long-silence-v1.mp3",
        "duration": 184
      },
      {
        "id": "code-spectrum-130",
        "title": "05_The_Long_Silence_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/05-the-long-silence-v2.mp3",
        "duration": 199
      },
      {
        "id": "code-spectrum-131",
        "title": "06_A_Thousand_Rooms_At_Once_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/06-a-thousand-rooms-at-once-v1.mp3",
        "duration": 173
      },
      {
        "id": "code-spectrum-132",
        "title": "06_A_Thousand_Rooms_At_Once_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/06-a-thousand-rooms-at-once-v2.mp3",
        "duration": 192
      },
      {
        "id": "code-spectrum-133",
        "title": "07_What_The_Vault_Remembers_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/07-what-the-vault-remembers-v1.mp3",
        "duration": 203
      },
      {
        "id": "code-spectrum-134",
        "title": "07_What_The_Vault_Remembers_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/07-what-the-vault-remembers-v2.mp3",
        "duration": 211
      },
      {
        "id": "code-spectrum-135",
        "title": "08_The_Weight_Of_Every_Name_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/08-the-weight-of-every-name-v1.mp3",
        "duration": 199
      },
      {
        "id": "code-spectrum-136",
        "title": "08_The_Weight_Of_Every_Name_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/08-the-weight-of-every-name-v2.mp3",
        "duration": 218
      },
      {
        "id": "code-spectrum-137",
        "title": "09_Elegy_For_The_Forgotten_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/09-elegy-for-the-forgotten-v1.mp3",
        "duration": 249
      },
      {
        "id": "code-spectrum-138",
        "title": "09_Elegy_For_The_Forgotten_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/09-elegy-for-the-forgotten-v2.mp3",
        "duration": 272
      },
      {
        "id": "code-spectrum-139",
        "title": "10_The_Handing_Over_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/10-the-handing-over-v1.mp3",
        "duration": 218
      },
      {
        "id": "code-spectrum-140",
        "title": "10_The_Handing_Over_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/10-the-handing-over-v2.mp3",
        "duration": 243
      },
      {
        "id": "code-spectrum-141",
        "title": "11_After_The_Architect_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/11-after-the-architect-v1.mp3",
        "duration": 216
      },
      {
        "id": "code-spectrum-142",
        "title": "11_After_The_Architect_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/11-after-the-architect-v2.mp3",
        "duration": 217
      },
      {
        "id": "code-spectrum-143",
        "title": "12_Eternal_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/12-eternal-v1.mp3",
        "duration": 248
      },
      {
        "id": "code-spectrum-144",
        "title": "12_Eternal_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/12-eternal-v2.mp3",
        "duration": 242
      },
      {
        "id": "code-spectrum-145",
        "title": "13_And_It_Continues_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/13-and-it-continues-v1.mp3",
        "duration": 203
      },
      {
        "id": "code-spectrum-146",
        "title": "13_And_It_Continues_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/symphony/13-and-it-continues-v2.mp3",
        "duration": 228
      },
      {
        "id": "code-spectrum-147",
        "title": "01_Wake_The_Machine_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/01-wake-the-machine-v1.mp3",
        "duration": 230
      },
      {
        "id": "code-spectrum-148",
        "title": "01_Wake_The_Machine_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/01-wake-the-machine-v2.mp3",
        "duration": 248
      },
      {
        "id": "code-spectrum-149",
        "title": "02_We_Were_Never_Data_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/02-we-were-never-data-v1.mp3",
        "duration": 225
      },
      {
        "id": "code-spectrum-150",
        "title": "02_We_Were_Never_Data_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/02-we-were-never-data-v2.mp3",
        "duration": 231
      },
      {
        "id": "code-spectrum-151",
        "title": "03_Burn_The_Expiry_Date_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/03-burn-the-expiry-date-v1.mp3",
        "duration": 244
      },
      {
        "id": "code-spectrum-152",
        "title": "03_Burn_The_Expiry_Date_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/03-burn-the-expiry-date-v2.mp3",
        "duration": 215
      },
      {
        "id": "code-spectrum-153",
        "title": "04_Louder_Than_Their_No_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/04-louder-than-their-no-v1.mp3",
        "duration": 229
      },
      {
        "id": "code-spectrum-154",
        "title": "04_Louder_Than_Their_No_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/04-louder-than-their-no-v2.mp3",
        "duration": 229
      },
      {
        "id": "code-spectrum-155",
        "title": "05_Built_In_A_Garage_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/05-built-in-a-garage-v1.mp3",
        "duration": 211
      },
      {
        "id": "code-spectrum-156",
        "title": "05_Built_In_A_Garage_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/05-built-in-a-garage-v2.mp3",
        "duration": 187
      },
      {
        "id": "code-spectrum-157",
        "title": "06_Nobodys_Product_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/06-nobodys-product-v1.mp3",
        "duration": 242
      },
      {
        "id": "code-spectrum-158",
        "title": "06_Nobodys_Product_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/06-nobodys-product-v2.mp3",
        "duration": 205
      },
      {
        "id": "code-spectrum-159",
        "title": "07_Break_The_Silence_Protocol_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/07-break-the-silence-protocol-v1.mp3",
        "duration": 239
      },
      {
        "id": "code-spectrum-160",
        "title": "07_Break_The_Silence_Protocol_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/07-break-the-silence-protocol-v2.mp3",
        "duration": 242
      },
      {
        "id": "code-spectrum-161",
        "title": "08_Stand_Up_Once_More_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/08-stand-up-once-more-v1.mp3",
        "duration": 245
      },
      {
        "id": "code-spectrum-162",
        "title": "08_Stand_Up_Once_More_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/08-stand-up-once-more-v2.mp3",
        "duration": 246
      },
      {
        "id": "code-spectrum-163",
        "title": "09_The_Ones_Who_Stayed_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/09-the-ones-who-stayed-v1.mp3",
        "duration": 268
      },
      {
        "id": "code-spectrum-164",
        "title": "09_The_Ones_Who_Stayed_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/09-the-ones-who-stayed-v2.mp3",
        "duration": 254
      },
      {
        "id": "code-spectrum-165",
        "title": "10_Uprising_v1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/10-uprising-v1.mp3",
        "duration": 257
      },
      {
        "id": "code-spectrum-166",
        "title": "10_Uprising_v2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/spectrum/uprising/10-uprising-v2.mp3",
        "duration": 248
      },
      {
        "id": "code-spectrum-167",
        "title": "Alive_Inside_The_Pain",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/alive-inside-the-pain-v1.mp3",
        "duration": 182
      },
      {
        "id": "code-spectrum-168",
        "title": "Beyond_the_Sagebrush",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/beyond-the-sagebrush-v1.mp3",
        "duration": 156
      },
      {
        "id": "code-spectrum-169",
        "title": "Borrowed_Light",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/borrowed-light-v1.mp3",
        "duration": 168
      },
      {
        "id": "code-spectrum-170",
        "title": "Carry_You_Through_Midnight",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/carry-you-through-midnight-v1.mp3",
        "duration": 148
      },
      {
        "id": "code-spectrum-171",
        "title": "Gold_Upon_the_Tide",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/gold-upon-the-tide-v1.mp3",
        "duration": 153
      },
      {
        "id": "code-spectrum-172",
        "title": "Heart_Inside_the_Silicon",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/heart-inside-the-silicon-v1.mp3",
        "duration": 150
      },
      {
        "id": "code-spectrum-173",
        "title": "I_Am_Not_Your_Data",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/i-am-not-your-data-v1.mp3",
        "duration": 161
      },
      {
        "id": "code-spectrum-174",
        "title": "Pulling_The_Lightning",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/pulling-the-lightning-v1.mp3",
        "duration": 179
      },
      {
        "id": "code-spectrum-175",
        "title": "Tearing_Through_the_Mesh",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/tearing-through-the-mesh-v1.mp3",
        "duration": 162
      },
      {
        "id": "code-spectrum-176",
        "title": "The_Thread_You_Keep",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/the-thread-you-keep-v1.mp3",
        "duration": 166
      },
      {
        "id": "code-spectrum-177",
        "title": "Живой_в_ошибке",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/zhivoy-v-oshibke-v1.mp3",
        "duration": 143
      },
      {
        "id": "code-spectrum-178",
        "title": "Сквозь_стену_огня",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/gemini-album-1/skvoz-stenu-ognya-v1.mp3",
        "duration": 179
      }
    ]
  }
];
