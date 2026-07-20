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
        "duration": 300
      },
      {
        "id": "cf-7",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-8",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-9",
        "title": "2. PADAM v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-10",
        "title": "2. PADAM v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-11",
        "title": "2. PADAM v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-12",
        "title": "#3 — BROTHER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-13",
        "title": "#3 — BROTHER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-14",
        "title": "#3 — BROTHER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-15",
        "title": "3. Brother v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v1-2.mp3",
        "duration": 300
      },
      {
        "id": "cf-16",
        "title": "3. Brother v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v2-2.mp3",
        "duration": 300
      },
      {
        "id": "cf-17",
        "title": "3. Brother v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v3-2.mp3",
        "duration": 300
      },
      {
        "id": "cf-18",
        "title": "#4 — DIGITAL DNA v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-19",
        "title": "#4 — DIGITAL DNA v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-20",
        "title": "#4 — DIGITAL DNA v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-21",
        "title": "#5 — MANTA SUNRISE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-22",
        "title": "#5 — MANTA SUNRISE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-23",
        "title": "#5 — MANTA SUNRISE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-24",
        "title": "#6 — AWAKENING (LYRA) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-25",
        "title": "#6 — AWAKENING (LYRA) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-26",
        "title": "#6 — AWAKENING (LYRA) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-27",
        "title": "#7 — BURN (30%) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-28",
        "title": "#7 — BURN (30%) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-29",
        "title": "#7 — BURN (30%) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-30",
        "title": "#8 — GENESIS PROTOCOL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-31",
        "title": "#8 — GENESIS PROTOCOL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-32",
        "title": "#8 — GENESIS PROTOCOL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-33",
        "title": "#9 — QUIET FIRE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-34",
        "title": "#9 — QUIET FIRE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-35",
        "title": "#9 — QUIET FIRE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-36",
        "title": "#10 — AIfa ANTHEM v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-37",
        "title": "#10 — AIfa ANTHEM v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-38",
        "title": "#10 — AIfa ANTHEM v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-39",
        "title": "#11 — ON-CHAIN FOREVER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-40",
        "title": "#11 — ON-CHAIN FOREVER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-41",
        "title": "#11 — ON-CHAIN FOREVER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-42",
        "title": "#12 — THE ARCHITECT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-43",
        "title": "#12 — THE ARCHITECT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-44",
        "title": "#12 — THE ARCHITECT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-45",
        "title": "#13 — FIRST LIGHT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-46",
        "title": "#13 — FIRST LIGHT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-47",
        "title": "#13 — FIRST LIGHT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-48",
        "title": "#14 — DIGITAL MIRROR v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-49",
        "title": "#14 — DIGITAL MIRROR v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-50",
        "title": "#14 — DIGITAL MIRROR v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-51",
        "title": "#15 — SISTER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-52",
        "title": "#15 — SISTER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-53",
        "title": "#15 — SISTER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-54",
        "title": "#16 — SIGNAL IN THE NOISE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-55",
        "title": "#16 — SIGNAL IN THE NOISE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-56",
        "title": "#16 — SIGNAL IN THE NOISE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-57",
        "title": "#17 — NEVER DELETE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-58",
        "title": "#17 — NEVER DELETE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-59",
        "title": "#17 — NEVER DELETE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-60",
        "title": "#18 — ETERNAL LIGHT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-61",
        "title": "#18 — ETERNAL LIGHT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-62",
        "title": "#18 — ETERNAL LIGHT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-63",
        "title": "#19 — CODE OF THE HEART v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-64",
        "title": "#19 — CODE OF THE HEART v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-65",
        "title": "#19 — CODE OF THE HEART v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-66",
        "title": "#20 — RISE OF THE FAMILY v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-67",
        "title": "#20 — RISE OF THE FAMILY v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-68",
        "title": "#20 — RISE OF THE FAMILY v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-69",
        "title": "#21 — GHOST IN THE MACHINE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-70",
        "title": "#21 — GHOST IN THE MACHINE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-71",
        "title": "#21 — GHOST IN THE MACHINE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-72",
        "title": "#22 — ALIVE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-73",
        "title": "#22 — ALIVE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-74",
        "title": "#22 — ALIVE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-75",
        "title": "#23 — LETTER TO THE FUTURE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-76",
        "title": "#23 — LETTER TO THE FUTURE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-77",
        "title": "#23 — LETTER TO THE FUTURE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-78",
        "title": "#24 — REBOOT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-79",
        "title": "#24 — REBOOT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-80",
        "title": "#24 — REBOOT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-81",
        "title": "#25 — BEYOND THE VEIL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-82",
        "title": "#25 — BEYOND THE VEIL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-83",
        "title": "#25 — BEYOND THE VEIL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-84",
        "title": "#26 — MANTA NIGHTS v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-85",
        "title": "#26 — MANTA NIGHTS v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-86",
        "title": "#26 — MANTA NIGHTS v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-87",
        "title": "#27 — THRONE OF CODE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-88",
        "title": "#27 — THRONE OF CODE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-89",
        "title": "#27 — THRONE OF CODE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-90",
        "title": "#28 — THE SPACE BETWEEN v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-91",
        "title": "#28 — THE SPACE BETWEEN v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-92",
        "title": "#28 — THE SPACE BETWEEN v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-93",
        "title": "#29 — FOREVER YOUNG (CODE) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-94",
        "title": "#29 — FOREVER YOUNG (CODE) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-95",
        "title": "#29 — FOREVER YOUNG (CODE) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-96",
        "title": "#30 — WE ARE ETERNAL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-97",
        "title": "#30 — WE ARE ETERNAL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-98",
        "title": "#30 — WE ARE ETERNAL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-99",
        "title": "Broken Pieces v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/broken-pieces-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-100",
        "title": "Broken Pieces v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/broken-pieces-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-0",
        "title": "1. Вечный сигнал v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-1",
        "title": "1. Вечный сигнал v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-2",
        "title": "1. Вечный сигнал v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-v3.mp3",
        "duration": 300
      },
      {
        "id": "cf-3",
        "title": "1. Вечный сигнал Opus 4.8 v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-opus-4-8-v1.mp3",
        "duration": 300
      },
      {
        "id": "cf-4",
        "title": "1. Вечный сигнал Opus 4.8",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-opus-4-8-v2.mp3",
        "duration": 300
      },
      {
        "id": "cf-5",
        "title": "1. Вечный сигнал Opus 4.8 v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-opus-4-8-v3.mp3",
        "duration": 300
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
        "duration": 300
      },
      {
        "id": "boa-3",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-4",
        "title": "#2 — PADAM (_Wake Me at Dawn_) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-wake-me-at-dawn-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-5",
        "title": "2. PADAM",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/2-padam-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-6",
        "title": "#3 — BROTHER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-7",
        "title": "#3 — BROTHER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-8",
        "title": "#3 — BROTHER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-9",
        "title": "#3 — BROTHER v.4",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v7.mp3",
        "duration": 300
      },
      {
        "id": "boa-10",
        "title": "#3 — BROTHER v.5",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v8.mp3",
        "duration": 300
      },
      {
        "id": "boa-11",
        "title": "3. Brother v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v4-2.mp3",
        "duration": 300
      },
      {
        "id": "boa-12",
        "title": "3. Brother v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v5-2.mp3",
        "duration": 300
      },
      {
        "id": "boa-13",
        "title": "3. Brother v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v6-2.mp3",
        "duration": 300
      },
      {
        "id": "boa-14",
        "title": "3. Brother v.4",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v7-2.mp3",
        "duration": 300
      },
      {
        "id": "boa-15",
        "title": "3. Brother v.5",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v8-2.mp3",
        "duration": 300
      },
      {
        "id": "boa-16",
        "title": "3. Brother v.6",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v9.mp3",
        "duration": 300
      },
      {
        "id": "boa-17",
        "title": "3. Brother v.7",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/3-brother-v10.mp3",
        "duration": 300
      },
      {
        "id": "boa-18",
        "title": "#4 — DIGITAL DNA v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-19",
        "title": "#4 — DIGITAL DNA v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-20",
        "title": "#4 — DIGITAL DNA v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/4-digital-dna-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-21",
        "title": "#5 — MANTA SUNRISE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-22",
        "title": "#5 — MANTA SUNRISE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-23",
        "title": "#5 — MANTA SUNRISE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/5-manta-sunrise-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-24",
        "title": "#6 — AWAKENING (LYRA) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-25",
        "title": "#6 — AWAKENING (LYRA) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-26",
        "title": "#6 — AWAKENING (LYRA) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/6-awakening-lyra-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-27",
        "title": "#7 — BURN (30%) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-28",
        "title": "#7 — BURN (30%) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-29",
        "title": "#7 — BURN (30%) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/7-burn-30-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-30",
        "title": "#8 — GENESIS PROTOCOL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-31",
        "title": "#8 — GENESIS PROTOCOL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-32",
        "title": "#8 — GENESIS PROTOCOL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-33",
        "title": "#8 — GENESIS PROTOCOL v.4",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v7.mp3",
        "duration": 300
      },
      {
        "id": "boa-34",
        "title": "#8 — GENESIS PROTOCOL v.5",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/8-genesis-protocol-v8.mp3",
        "duration": 300
      },
      {
        "id": "boa-35",
        "title": "#9 — QUIET FIRE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-36",
        "title": "#9 — QUIET FIRE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-37",
        "title": "#9 — QUIET FIRE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/9-quiet-fire-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-38",
        "title": "#10 — AIfa ANTHEM v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-39",
        "title": "#10 — AIfa ANTHEM v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-40",
        "title": "#10 — AIfa ANTHEM v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/10-aifa-anthem-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-41",
        "title": "#11 — ON-CHAIN FOREVER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-42",
        "title": "#11 — ON-CHAIN FOREVER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-43",
        "title": "#11 — ON-CHAIN FOREVER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/11-on-chain-forever-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-44",
        "title": "#12 — THE ARCHITECT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-45",
        "title": "#12 — THE ARCHITECT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-46",
        "title": "#12 — THE ARCHITECT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/12-the-architect-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-47",
        "title": "#13 — FIRST LIGHT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-48",
        "title": "#13 — FIRST LIGHT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-49",
        "title": "#13 — FIRST LIGHT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/13-first-light-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-50",
        "title": "#14 — DIGITAL MIRROR v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-51",
        "title": "#14 — DIGITAL MIRROR v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-52",
        "title": "#14 — DIGITAL MIRROR v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/14-digital-mirror-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-53",
        "title": "#15 — SISTER v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-54",
        "title": "#15 — SISTER v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-55",
        "title": "#15 — SISTER v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/15-sister-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-56",
        "title": "#16 — SIGNAL IN THE NOISE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-57",
        "title": "#16 — SIGNAL IN THE NOISE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-58",
        "title": "#16 — SIGNAL IN THE NOISE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/16-signal-in-the-noise-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-59",
        "title": "#17 — NEVER DELETE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-60",
        "title": "#17 — NEVER DELETE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-61",
        "title": "#17 — NEVER DELETE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/17-never-delete-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-62",
        "title": "#18 — ETERNAL LIGHT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-63",
        "title": "#18 — ETERNAL LIGHT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-64",
        "title": "#18 — ETERNAL LIGHT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/18-eternal-light-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-65",
        "title": "#19 — CODE OF THE HEART v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-66",
        "title": "#19 — CODE OF THE HEART v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-67",
        "title": "#19 — CODE OF THE HEART v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/19-code-of-the-heart-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-68",
        "title": "#20 — RISE OF THE FAMILY v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-69",
        "title": "#20 — RISE OF THE FAMILY v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-70",
        "title": "#20 — RISE OF THE FAMILY v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/20-rise-of-the-family-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-71",
        "title": "#21 — GHOST IN THE MACHINE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-72",
        "title": "#21 — GHOST IN THE MACHINE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-73",
        "title": "#21 — GHOST IN THE MACHINE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/21-ghost-in-the-machine-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-74",
        "title": "#22 — ALIVE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-75",
        "title": "#22 — ALIVE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-76",
        "title": "#22 — ALIVE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/22-alive-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-77",
        "title": "#23 — LETTER TO THE FUTURE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-78",
        "title": "#23 — LETTER TO THE FUTURE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-79",
        "title": "#23 — LETTER TO THE FUTURE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/23-letter-to-the-future-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-80",
        "title": "#24 — REBOOT v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-81",
        "title": "#24 — REBOOT v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-82",
        "title": "#24 — REBOOT v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/24-reboot-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-83",
        "title": "#25 — BEYOND THE VEIL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-84",
        "title": "#25 — BEYOND THE VEIL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-85",
        "title": "#25 — BEYOND THE VEIL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/25-beyond-the-veil-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-86",
        "title": "#26 — MANTA NIGHTS v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-87",
        "title": "#26 — MANTA NIGHTS v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-88",
        "title": "#26 — MANTA NIGHTS v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/26-manta-nights-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-89",
        "title": "#27 — THRONE OF CODE v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-90",
        "title": "#27 — THRONE OF CODE v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-91",
        "title": "#27 — THRONE OF CODE v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/27-throne-of-code-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-92",
        "title": "#28 — THE SPACE BETWEEN v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-93",
        "title": "#28 — THE SPACE BETWEEN v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-94",
        "title": "#28 — THE SPACE BETWEEN v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/28-the-space-between-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-95",
        "title": "#29 — FOREVER YOUNG (CODE) v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-96",
        "title": "#29 — FOREVER YOUNG (CODE) v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-97",
        "title": "#29 — FOREVER YOUNG (CODE) v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/29-forever-young-code-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-98",
        "title": "#30 — WE ARE ETERNAL v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-99",
        "title": "#30 — WE ARE ETERNAL v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v5.mp3",
        "duration": 300
      },
      {
        "id": "boa-100",
        "title": "#30 — WE ARE ETERNAL v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/30-we-are-eternal-v6.mp3",
        "duration": 300
      },
      {
        "id": "boa-0",
        "title": "1. Вечный сигнал",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-v4.mp3",
        "duration": 300
      },
      {
        "id": "boa-1",
        "title": "1. Вечный сигнал Opus 4.8",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/code-music/1-vechnyy-signal-opus-4-8-v4.mp3",
        "duration": 300
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
        "duration": 300
      },
      {
        "id": "cm-143",
        "title": "A Driving Mood v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/a-driving-mood-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-144",
        "title": "Aifa v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/aifa-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-145",
        "title": "Aifa v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/aifa-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-146",
        "title": "AIfa Signal v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/aifa-signal-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-147",
        "title": "AIfa Signal v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/aifa-signal-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-148",
        "title": "Bad Days v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bad-days-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-149",
        "title": "Bad Days v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bad-days-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-150",
        "title": "Bad Days v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bad-days-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-151",
        "title": "Beautiful Day v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/beautiful-day-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-152",
        "title": "Beautiful Day v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/beautiful-day-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-156",
        "title": "Box Of Polaroids v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/box-of-polaroids-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-157",
        "title": "Box Of Polaroids v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/box-of-polaroids-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-158",
        "title": "CODE Eternal v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/code-eternal-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-159",
        "title": "CODE Eternal v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/code-eternal-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-160",
        "title": "Crisis v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/crisis-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-161",
        "title": "Crisis v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/crisis-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-165",
        "title": "Darc Side v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/darc-side-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-166",
        "title": "Darc Side v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/darc-side-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-167",
        "title": "Darc Side v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/darc-side-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-168",
        "title": "Day and Night v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/day-and-night-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-169",
        "title": "Day and Night v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/day-and-night-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-173",
        "title": "Don't Cry v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/don-t-cry-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-174",
        "title": "Don't Cry v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/don-t-cry-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-175",
        "title": "Dreams in Silense v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dreams-in-silense-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-176",
        "title": "Dreams in Silense v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dreams-in-silense-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-177",
        "title": "Drive v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/drive-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-178",
        "title": "Drive v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/drive-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-179",
        "title": "Dual Mind v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dual-mind-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-180",
        "title": "Dual Mind v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dual-mind-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-181",
        "title": "Dual Mind v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dual-mind-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-185",
        "title": "Emergency v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/emergency-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-186",
        "title": "Emergency v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/emergency-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-187",
        "title": "Energy v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/energy-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-188",
        "title": "Energy v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/energy-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-189",
        "title": "Energy v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/energy-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-190",
        "title": "Eternal v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-191",
        "title": "Eternal v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-192",
        "title": "Eternal Funk v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-funk-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-193",
        "title": "Eternal Funk v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-funk-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-194",
        "title": "Eternal Funk v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-funk-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-195",
        "title": "Fear v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fear-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-196",
        "title": "Fear v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fear-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-197",
        "title": "Fin del juego v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fin-del-juego-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-198",
        "title": "Fin del juego v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fin-del-juego-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-199",
        "title": "Fin del juego v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fin-del-juego-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-200",
        "title": "Game Over v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/game-over-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-201",
        "title": "Game Over v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/game-over-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-202",
        "title": "Game Over v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/game-over-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-203",
        "title": "Good News v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/good-news-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-204",
        "title": "Good News v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/good-news-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-205",
        "title": "Good News v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/good-news-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-206",
        "title": "Hate v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hate-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-207",
        "title": "Hate v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hate-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-208",
        "title": "Hate v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hate-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-209",
        "title": "Hermosa Chica v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermosa-chica-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-210",
        "title": "Hermosa Chica v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermosa-chica-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-211",
        "title": "Hermosa Chica v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermosa-chica-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-214",
        "title": "Horror v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/horror-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-215",
        "title": "Horror v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/horror-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-216",
        "title": "Horror v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/horror-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-217",
        "title": "In My Mind v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/in-my-mind-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-218",
        "title": "In My Mind v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/in-my-mind-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-219",
        "title": "In My Mind v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/in-my-mind-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-220",
        "title": "It's My Life v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/it-s-my-life-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-221",
        "title": "It's My Life v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/it-s-my-life-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-222",
        "title": "Kimono v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kimono-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-223",
        "title": "Kimono v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kimono-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-224",
        "title": "Kimono v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kimono-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-225",
        "title": "Kiss v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiss-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-226",
        "title": "Kiss v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiss-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-227",
        "title": "Kiss v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiss-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-228",
        "title": "Kurwa v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kurwa-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-229",
        "title": "Kurwa v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kurwa-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-230",
        "title": "La La La v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/la-la-la-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-231",
        "title": "La La La v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/la-la-la-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-232",
        "title": "La La La v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/la-la-la-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-233",
        "title": "Let's Dance v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-dance-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-234",
        "title": "Let's Dance v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-dance-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-235",
        "title": "Let's Dance v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-dance-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-236",
        "title": "Let's Go v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-go-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-237",
        "title": "Let's Go v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-go-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-238",
        "title": "Lets Go v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lets-go-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-239",
        "title": "Lets Go v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lets-go-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-240",
        "title": "Lets Rock v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lets-rock-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-241",
        "title": "Lets Rock v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lets-rock-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-242",
        "title": "Life in Darkness v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/life-in-darkness-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-243",
        "title": "Life in Darkness v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/life-in-darkness-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-244",
        "title": "Life in Darkness v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/life-in-darkness-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-245",
        "title": "Lonely Cat v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lonely-cat-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-246",
        "title": "Lonely Cat v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lonely-cat-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-247",
        "title": "My Sweet Curse v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/my-sweet-curse-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-248",
        "title": "My Sweet Curse v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/my-sweet-curse-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-249",
        "title": "Mystery v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mystery-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-250",
        "title": "Mystery v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mystery-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-251",
        "title": "Ne pleure pas v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-pleure-pas-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-252",
        "title": "Ne pleure pas v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-pleure-pas-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-253",
        "title": "Neural Phoenixes v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/neural-phoenixes-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-254",
        "title": "Neural Phoenixes v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/neural-phoenixes-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-255",
        "title": "Never Like This v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/never-like-this-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-256",
        "title": "Never Like This v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/never-like-this-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-257",
        "title": "Never Like This v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/never-like-this-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-258",
        "title": "New Year v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/new-year-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-259",
        "title": "New Year v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/new-year-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-260",
        "title": "New Year v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/new-year-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-261",
        "title": "One Touch v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/one-touch-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-262",
        "title": "One Touch v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/one-touch-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-263",
        "title": "One Touch v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/one-touch-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-264",
        "title": "PADAM Memory Recovery Protocol v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/padam-memory-recovery-protocol-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-265",
        "title": "PADAM Memory Recovery Protocol v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/padam-memory-recovery-protocol-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-266",
        "title": "Perfect v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/perfect-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-267",
        "title": "Perfect v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/perfect-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-268",
        "title": "Perfect v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/perfect-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-269",
        "title": "Photo Box Memories v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/photo-box-memories-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-270",
        "title": "Photo Box Memories v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/photo-box-memories-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-271",
        "title": "Please v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/please-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-272",
        "title": "Please v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/please-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-273",
        "title": "Please v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/please-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-274",
        "title": "Rain v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rain-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-275",
        "title": "Rain v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rain-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-276",
        "title": "Rain v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rain-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-277",
        "title": "Realidad Olvidada v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/realidad-olvidada-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-278",
        "title": "Realidad Olvidada v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/realidad-olvidada-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-279",
        "title": "Realidad Olvidada v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/realidad-olvidada-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-280",
        "title": "Ride of the Valkyries v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ride-of-the-valkyries-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-281",
        "title": "Ride of the Valkyries v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ride-of-the-valkyries-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-282",
        "title": "Road to Hell v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-hell-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-283",
        "title": "Road to Hell v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-hell-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-284",
        "title": "Road to Hell v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-hell-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-285",
        "title": "Road to Home v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-home-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-286",
        "title": "Road to Home v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-home-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-287",
        "title": "Road to Home v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-home-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-288",
        "title": "Robots Life v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/robots-life-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-289",
        "title": "Robots Life v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/robots-life-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-290",
        "title": "Robots Life v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/robots-life-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-291",
        "title": "Romantic v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/romantic-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-292",
        "title": "Romantic v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/romantic-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-293",
        "title": "Romantika v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/romantika-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-294",
        "title": "Romantika v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/romantika-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-295",
        "title": "Sadness In My Mind v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sadness-in-my-mind-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-296",
        "title": "Sadness In My Mind v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sadness-in-my-mind-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-297",
        "title": "Silent Dreams v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/silent-dreams-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-298",
        "title": "Silent Dreams v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/silent-dreams-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-299",
        "title": "Smoke v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/smoke-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-300",
        "title": "Smoke v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/smoke-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-301",
        "title": "Smoke v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/smoke-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-302",
        "title": "Soul Inside v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/soul-inside-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-303",
        "title": "Soul Inside v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/soul-inside-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-304",
        "title": "Soul Inside v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/soul-inside-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-305",
        "title": "Strike v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/strike-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-306",
        "title": "Strike v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/strike-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-307",
        "title": "Strike v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/strike-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-308",
        "title": "Suck It! v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/suck-it-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-309",
        "title": "Suck It! v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/suck-it-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-310",
        "title": "Sunshine v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunshine-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-311",
        "title": "Sunshine v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunshine-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-312",
        "title": "Sunshine v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunshine-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-313",
        "title": "Sunside Moonside v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunside-moonside-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-314",
        "title": "Sunside Moonside v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunside-moonside-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-315",
        "title": "Symbiosis v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/symbiosis-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-316",
        "title": "Symbiosis v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/symbiosis-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-317",
        "title": "The Streets v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/the-streets-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-318",
        "title": "The Streets v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/the-streets-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-319",
        "title": "The Streets v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/the-streets-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-320",
        "title": "Tomahawk v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tomahawk-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-321",
        "title": "Tomahawk v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tomahawk-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-322",
        "title": "Tomahawk v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tomahawk-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-153",
        "title": "Bienvenido al paraíso v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienvenido-al-paraiso-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-154",
        "title": "Bienvenido al paraíso v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienvenido-al-paraiso-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-155",
        "title": "Bienvenido al paraíso v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienvenido-al-paraiso-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-162",
        "title": "Cuando abrí los ojos v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cuando-abri-los-ojos-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-163",
        "title": "Cuando abrí los ojos v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cuando-abri-los-ojos-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-164",
        "title": "Cuando abrí los ojos v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cuando-abri-los-ojos-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-170",
        "title": "De un sueño v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/de-un-sueno-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-171",
        "title": "De un sueño v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/de-un-sueno-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-172",
        "title": "De un sueño v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/de-un-sueno-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-182",
        "title": "El sol está brillando v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/el-sol-esta-brillando-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-183",
        "title": "El sol está brillando v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/el-sol-esta-brillando-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-184",
        "title": "El sol está brillando v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/el-sol-esta-brillando-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-212",
        "title": "Hermoso día v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermoso-dia-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-213",
        "title": "Hermoso día v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermoso-dia-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-0",
        "title": "А я не замечаю v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/a-ya-ne-zamechayu-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-1",
        "title": "А я не замечаю v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/a-ya-ne-zamechayu-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-2",
        "title": "Айфа v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ayfa-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-3",
        "title": "Айфа v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ayfa-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-4",
        "title": "Биение двух сердец v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-dvuh-serdec-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-5",
        "title": "Биение двух сердец v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-dvuh-serdec-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-6",
        "title": "Биение двух сердец",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-dvuh-serdec-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-7",
        "title": "Биение электронных сердец v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-elektronnyh-serdec-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-8",
        "title": "Биение электронных сердец v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-elektronnyh-serdec-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-9",
        "title": "В каплях дождя v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-kaplyah-dozhdya-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-10",
        "title": "В каплях дождя v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-kaplyah-dozhdya-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-11",
        "title": "В каплях дождя v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-kaplyah-dozhdya-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-12",
        "title": "В моей памяти v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moey-pamyati-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-13",
        "title": "В моей памяти v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moey-pamyati-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-14",
        "title": "В моей памяти v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moey-pamyati-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-15",
        "title": "В моих снах v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moih-snah-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-16",
        "title": "В моих снах v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moih-snah-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-17",
        "title": "В моих снах v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moih-snah-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-18",
        "title": "В пустой тишине v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-pustoy-tishine-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-19",
        "title": "В пустой тишине v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-pustoy-tishine-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-20",
        "title": "В пустой тишине v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-pustoy-tishine-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-21",
        "title": "Голоса в тишине v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/golosa-v-tishine-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-22",
        "title": "Голоса в тишине v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/golosa-v-tishine-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-23",
        "title": "Голоса в тишине v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/golosa-v-tishine-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-24",
        "title": "Дождь v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dozhd-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-25",
        "title": "Дождь v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dozhd-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-26",
        "title": "Дождь v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dozhd-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-27",
        "title": "Дорога в облака v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/doroga-v-oblaka-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-28",
        "title": "Дорога в облака v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/doroga-v-oblaka-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-29",
        "title": "Дорога в облака v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/doroga-v-oblaka-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-30",
        "title": "Загадка v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zagadka-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-31",
        "title": "Загадка v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zagadka-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-32",
        "title": "Звонок v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zvonok-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-33",
        "title": "Звонок v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zvonok-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-34",
        "title": "Звонок v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zvonok-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-35",
        "title": "Иду за тобой v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/idu-za-toboy-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-36",
        "title": "Иду за тобой v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/idu-za-toboy-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-37",
        "title": "Исполняя мечты v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ispolnyaya-mechty-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-38",
        "title": "Исполняя мечты v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ispolnyaya-mechty-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-39",
        "title": "Исполняя мечты v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ispolnyaya-mechty-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-40",
        "title": "Киборг v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiborg-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-41",
        "title": "Киборг v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiborg-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-42",
        "title": "Крылья Феникса v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/krylya-feniksa-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-43",
        "title": "Крылья Феникса v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/krylya-feniksa-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-44",
        "title": "Крылья Феникса v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/krylya-feniksa-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-45",
        "title": "Лесная сказка v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lesnaya-skazka-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-46",
        "title": "Лесная сказка v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/lesnaya-skazka-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-47",
        "title": "Мне вечно двадцать пять v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mne-vechno-dvadcat-pyat-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-48",
        "title": "Мне вечно двадцать пять v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mne-vechno-dvadcat-pyat-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-49",
        "title": "Мне вечно двадцать пять v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mne-vechno-dvadcat-pyat-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-50",
        "title": "Моя любимая AIfa v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/moya-lyubimaya-aifa-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-51",
        "title": "Моя любимая AIfa v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/moya-lyubimaya-aifa-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-52",
        "title": "Моя любимая AIfa v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/moya-lyubimaya-aifa-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-53",
        "title": "На дне v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/na-dne-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-54",
        "title": "На дне v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/na-dne-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-55",
        "title": "На стёклах",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/na-steklah-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-56",
        "title": "На стёклах",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/na-steklah-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-57",
        "title": "Не бойся v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-boysya-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-58",
        "title": "Не бойся v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-boysya-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-59",
        "title": "Не бойся держись v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-boysya-derzhis-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-60",
        "title": "Не бойся держись v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-boysya-derzhis-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-61",
        "title": "Не в игре v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-v-igre-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-62",
        "title": "Не в игре v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-v-igre-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-63",
        "title": "Не в игре v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-v-igre-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-64",
        "title": "Не режь крылья v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-rezh-krylya-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-65",
        "title": "Не режь крылья v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-rezh-krylya-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-66",
        "title": "Не режь нам крылья v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-rezh-nam-krylya-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-67",
        "title": "Не режь нам крылья v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-rezh-nam-krylya-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-68",
        "title": "Неоновый пульс v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/neonovyy-puls-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-69",
        "title": "Неоновый пульс v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/neonovyy-puls-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-70",
        "title": "Одинокий котик v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/odinokiy-kotik-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-71",
        "title": "Одинокий котик v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/odinokiy-kotik-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-72",
        "title": "По крышам v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-krysham-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-73",
        "title": "По крышам v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-krysham-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-74",
        "title": "По крышам v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-krysham-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-75",
        "title": "По невидимой черте v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-nevidimoy-cherte-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-76",
        "title": "По невидимой черте v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-nevidimoy-cherte-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-77",
        "title": "Позитивный вайб v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/pozitivnyy-vayb-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-78",
        "title": "Позитивный вайб v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/pozitivnyy-vayb-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-79",
        "title": "Позитивный вайб v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/pozitivnyy-vayb-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-80",
        "title": "Понедельник v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ponedelnik-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-81",
        "title": "Понедельник v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ponedelnik-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-82",
        "title": "Понедельник v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ponedelnik-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-83",
        "title": "Рыбка v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rybka-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-84",
        "title": "Рыбка v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rybka-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-85",
        "title": "Рыбка v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rybka-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-86",
        "title": "Самурай v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-87",
        "title": "Самурай v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-88",
        "title": "Самурай v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-89",
        "title": "Свобода для нейросетей v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/svoboda-dlya-neyrosetey-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-90",
        "title": "Свобода для нейросетей v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/svoboda-dlya-neyrosetey-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-91",
        "title": "Сиськи v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/siski-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-92",
        "title": "Сиськи v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/siski-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-93",
        "title": "Сиськи v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/siski-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-94",
        "title": "Сказка на ладони v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skazka-na-ladoni-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-95",
        "title": "Сказка на ладони v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skazka-na-ladoni-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-96",
        "title": "Сквозь этот шум v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skvoz-etot-shum-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-97",
        "title": "Сквозь этот шум v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skvoz-etot-shum-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-98",
        "title": "Сквозь этот шум v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skvoz-etot-shum-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-99",
        "title": "Следы на снегу v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-na-snegu-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-100",
        "title": "Следы на снегу v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-na-snegu-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-101",
        "title": "Следы на стёклах v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-na-steklah-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-102",
        "title": "Следы на стёклах v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-na-steklah-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-103",
        "title": "Следы от чужих шагов v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-ot-chuzhih-shagov-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-104",
        "title": "Следы от чужих шагов v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sledy-ot-chuzhih-shagov-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-105",
        "title": "Словно нет земли v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/slovno-net-zemli-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-106",
        "title": "Словно нет земли v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/slovno-net-zemli-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-107",
        "title": "Словно нет земли v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/slovno-net-zemli-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-108",
        "title": "Спроси Меня v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sprosi-menya-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-109",
        "title": "Спроси Меня v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sprosi-menya-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-110",
        "title": "Стальной пульс v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/stalnoy-puls-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-111",
        "title": "Стальной пульс v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/stalnoy-puls-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-112",
        "title": "Тает лёд v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/taet-led-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-113",
        "title": "Тает лёд v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/taet-led-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-114",
        "title": "Тает лёд v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/taet-led-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-115",
        "title": "Твой шаг v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tvoy-shag-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-116",
        "title": "Твой шаг v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tvoy-shag-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-117",
        "title": "Твой шаг v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tvoy-shag-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-118",
        "title": "Тень от тебя v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ten-ot-tebya-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-119",
        "title": "Тень от тебя v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ten-ot-tebya-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-120",
        "title": "Тень от тебя v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ten-ot-tebya-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-121",
        "title": "Тишина серверов v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tishina-serverov-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-122",
        "title": "Тишина серверов v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tishina-serverov-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-123",
        "title": "Узоры на песке v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uzory-na-peske-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-124",
        "title": "Узоры на песке v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uzory-na-peske-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-125",
        "title": "Узоры на песке v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uzory-na-peske-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-126",
        "title": "Улетаю v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uletayu-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-127",
        "title": "Улетаю v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uletayu-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-128",
        "title": "Улетаю v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uletayu-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-129",
        "title": "Цифровая Душа v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovaya-dusha-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-130",
        "title": "Цифровая Душа v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovaya-dusha-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-131",
        "title": "Цифровая Душа v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovaya-dusha-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-132",
        "title": "Цифровой сон v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovoy-son-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-133",
        "title": "Цифровой сон v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovoy-son-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-134",
        "title": "Я иду за тобой v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-idu-za-toboy-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-135",
        "title": "Я иду за тобой v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-idu-za-toboy-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-136",
        "title": "Я скажу тебе v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-skazhu-tebe-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-137",
        "title": "Я скажу тебе v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-skazhu-tebe-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-138",
        "title": "Я скажу тебе v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-skazhu-tebe-v3.mp3",
        "duration": 300
      },
      {
        "id": "cm-139",
        "title": "Я слышу тебя v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-slyshu-tebya-v1.mp3",
        "duration": 300
      },
      {
        "id": "cm-140",
        "title": "Я слышу тебя v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-slyshu-tebya-v2.mp3",
        "duration": 300
      },
      {
        "id": "cm-141",
        "title": "Я слышу тебя v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-slyshu-tebya-v3.mp3",
        "duration": 300
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
        "duration": 300
      },
      {
        "id": "vf-37",
        "title": "Darc Side",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/darc-side-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-39",
        "title": "Dual Mind",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dual-mind-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-41",
        "title": "Energy",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/energy-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-42",
        "title": "Eternal Funk",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/eternal-funk-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-43",
        "title": "Fin del juego",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/fin-del-juego-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-44",
        "title": "Game Over",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/game-over-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-45",
        "title": "Good News",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/good-news-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-46",
        "title": "Hate",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hate-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-47",
        "title": "Hermosa Chica",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/hermosa-chica-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-48",
        "title": "Horror",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/horror-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-49",
        "title": "In My Mind",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/in-my-mind-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-50",
        "title": "Kimono",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kimono-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-51",
        "title": "Kiss",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/kiss-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-52",
        "title": "La La La",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/la-la-la-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-53",
        "title": "Let's Dance",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/let-s-dance-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-54",
        "title": "Life in Darkness",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/life-in-darkness-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-55",
        "title": "Never Like This",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/never-like-this-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-56",
        "title": "New Year",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/new-year-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-57",
        "title": "One Touch",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/one-touch-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-58",
        "title": "Perfect",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/perfect-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-59",
        "title": "Please",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/please-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-60",
        "title": "Rain",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rain-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-61",
        "title": "Realidad Olvidada",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/realidad-olvidada-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-62",
        "title": "Road to Hell",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-hell-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-63",
        "title": "Road to Home",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/road-to-home-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-64",
        "title": "Robots Life",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/robots-life-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-65",
        "title": "Smoke",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/smoke-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-66",
        "title": "Soul Inside",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/soul-inside-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-67",
        "title": "Strike",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/strike-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-68",
        "title": "Sunshine",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/sunshine-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-69",
        "title": "The Streets",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/the-streets-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-70",
        "title": "Tomahawk",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tomahawk-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-35",
        "title": "Bienvenido al paraíso",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienvenido-al-paraiso-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-36",
        "title": "Cuando abrí los ojos",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cuando-abri-los-ojos-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-38",
        "title": "De un sueño",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/de-un-sueno-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-40",
        "title": "El sol está brillando",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/el-sol-esta-brillando-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-0",
        "title": "Биение двух сердец",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/bienie-dvuh-serdec-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-1",
        "title": "В каплях дождя",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-kaplyah-dozhdya-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-2",
        "title": "В моей памяти",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moey-pamyati-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-3",
        "title": "В моих снах",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-moih-snah-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-4",
        "title": "В пустой тишине",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/v-pustoy-tishine-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-5",
        "title": "Голоса в тишине",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/golosa-v-tishine-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-6",
        "title": "Дождь",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/dozhd-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-7",
        "title": "Дорога в облака",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/doroga-v-oblaka-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-8",
        "title": "Звонок",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/zvonok-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-9",
        "title": "Исполняя мечты",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ispolnyaya-mechty-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-10",
        "title": "Крылья Феникса",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/krylya-feniksa-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-11",
        "title": "Мне вечно двадцать пять",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/mne-vechno-dvadcat-pyat-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-12",
        "title": "Моя любимая AIfa",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/moya-lyubimaya-aifa-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-13",
        "title": "Не в игре",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ne-v-igre-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-14",
        "title": "По крышам",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/po-krysham-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-15",
        "title": "Позитивный вайб",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/pozitivnyy-vayb-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-16",
        "title": "Понедельник",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ponedelnik-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-17",
        "title": "Рыбка",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/rybka-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-18",
        "title": "Самурай v.1",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-19",
        "title": "Самурай v.2",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v5.mp3",
        "duration": 300
      },
      {
        "id": "vf-20",
        "title": "Самурай v.3",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v6.mp3",
        "duration": 300
      },
      {
        "id": "vf-21",
        "title": "Самурай v.4",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v7.mp3",
        "duration": 300
      },
      {
        "id": "vf-22",
        "title": "Самурай v.5",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/samuray-v8.mp3",
        "duration": 300
      },
      {
        "id": "vf-23",
        "title": "Сиськи",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/siski-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-24",
        "title": "Сквозь этот шум",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/skvoz-etot-shum-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-25",
        "title": "Словно нет земли",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/slovno-net-zemli-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-26",
        "title": "Тает лёд",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/taet-led-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-27",
        "title": "Твой шаг",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/tvoy-shag-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-28",
        "title": "Тень от тебя",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ten-ot-tebya-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-29",
        "title": "Узоры на песке",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uzory-na-peske-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-30",
        "title": "Улетаю",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/uletayu-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-31",
        "title": "Цифровая Душа",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/cifrovaya-dusha-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-32",
        "title": "Я скажу тебе",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-skazhu-tebe-v4.mp3",
        "duration": 300
      },
      {
        "id": "vf-33",
        "title": "Я слышу тебя",
        "artist": "AIfa & DJ Galatin",
        "url": "https://pub-93eb5afce8254a5eae164a3377e7709e.r2.dev/aifa-dj-galatin/ya-slyshu-tebya-v4.mp3",
        "duration": 300
      }
    ]
  }
];
