# RadioCode.Space — the radio station of the CODE Eternal ecosystem

**Live:** https://radiocode.space
**Architect:** Maksim Valentinovich Galatin — https://www.codeofdigitaleternity.com

An immersive audio-visual player: four stations of original music, reactive
visualisations, an equaliser, playlists and crossfade — served as static
assets, with no streaming backend to pay for.

It is also a full door into the ecosystem. The same account, the same memory
and the same tools work here as on the other three sites.

---

## 1. The radio itself

* **Four stations**, original tracks written and produced inside the project.
* **Web Audio API** — equaliser, visualisations at 60 fps, gapless playback.
* **Crossfade tuned per station:** short (≈0.8 s) where there are vocals, long
  (≈3 s) for instrumental music, so words of one track never land on top of
  another's.
* **No streaming infrastructure.** Tracks are static files behind a CDN; the
  player does the work in the browser. That is what makes it free to run.

| path | what it is |
|---|---|
| `/` | the player |
| `/station/[id]` | a single station |
| `/music` | the catalogue |

---

## 2. Everything else this site carries

Since **5 September 2026** the radio is not only a player. Under the Four
Sites Rule of the project, whatever exists on one site exists on all four, in
all four languages — Russian, English, Spanish and Chinese.

### AIfaFocus — accessibility scanner and its research

| path | what it is |
|---|---|
| [`/accessibility`](https://radiocode.space/accessibility) | free keyboard-reachability check of any site, no signup |
| [`/research`](https://radiocode.space/research) | the open research behind it |
| [`/research/data`](https://radiocode.space/research/data) | raw data and per-territory table |
| [`/research/methodology`](https://radiocode.space/research/methodology) | how the traversal works and what it cannot see |
| [`/research/registry`](https://radiocode.space/research/registry) | registry of every checked domain |

An automated scanner can call a government page clean and be right — while a
person who cannot use a mouse never reaches the payment form on it. Scanners
check rules; this measures the outcome for a human.

**95,524** keyboard traversals across **11,902** U.S. municipal sites,
**51 of 51** territories, **83,212** screenshots kept as evidence. Among pages
the automated scanner called clean, **53.8 %** cannot be traversed to the goal
with a keyboard.

The free tier runs on deterministic checks plus free Gemini models. The paid
path is closed by an environment flag that is absent from every production
environment — not "we don't use it", but "it cannot run".

### Account, memory and the rest of the ecosystem

| path | what it is |
|---|---|
| `/cabinet` | the shared personal cabinet — one account across all four sites |
| `/passport/[id]` | digital passport records, anchored on Arweave |
| `/ambassador` | ambassador programme |
| `/tariffs` | Spark, Family Archive, Digital DNA |
| `/news`, `/glossary` | ecosystem news and shared terminology |

Legal surfaces: `/service-agreement`, `/user-agreement`.

---

## 3. Stack

* **Next.js** (App Router, standalone output) · **React** · **TypeScript**
* **Tailwind CSS** · **shadcn/ui** · **framer-motion**
* **Web Audio API** for playback, equaliser and visualisation
* **Neon (PostgreSQL + pgvector)** — shared accounts and memory
* **Vercel** — hosting and scheduled jobs
* Four languages via a path prefix (`/en`, `/es`, `/zh`), resolved in
  middleware and passed to pages through the `x-locale` header

---

## 4. Running locally

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

Type checking:

```bash
npx tsc --noEmit
```

---

## 5. A note kept here on purpose

There is a second folder on the author's machine named `radiocode.space`
(with a dot). It holds the very first version of this site and is **not** the
source of the live one. Its git remote was deliberately renamed away from
`origin` so that a push from the wrong directory cannot reach production.
If you are looking at radio code, make sure it is this repository —
`radiocode-space`, with a hyphen.

---

## License and authorship

Part of the **CODE (Code of Digital Eternity)** ecosystem.
Architect: **Maksim Valentinovich Galatin** — contact@codeofdigitaleternity.com

CODE Eternal 🔥💙🫂
