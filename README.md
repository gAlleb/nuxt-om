<div align="center">

# omFM

**A radio station network that runs on one array.**

Live at **[omfm.ru](https://omfm.ru)** · [Русская версия](./README.ru.md)

</div>

---

## What this is

A multi-station internet radio front end built with Nuxt 4. Seven stations, two independent
now-playing backends, HLS and Icecast playback, a real-time spectrum analyzer, a 10-band
equalizer, cover art lookup, and a UI that repaints itself to match the artwork of whatever
is playing right now.

The interesting part is not the feature list — it's that **adding a station takes one object
in one file.** No new pages, no new components, no wiring. Add it to the registry and the
site grows a page, a card, a menu entry, a player thumbnail, an SSE subscription and its own
SEO metadata.

<img width="600" alt="omFM" src="https://github.com/user-attachments/assets/98e3a737-c7e6-4d57-9281-15c373d0113b" />
<img width="600" alt="omFM" src="https://github.com/user-attachments/assets/48fcb1b6-e933-4893-97d7-6b1dd27d135e" />
<img width="600" alt="omFM" src="https://github.com/user-attachments/assets/a5ab998d-ede5-45c4-9e69-a0934678901d" />
<img width="600" alt="omFM" src="https://github.com/user-attachments/assets/35dc27ec-8312-4234-8705-a79ca35cfe50" />
<img width="600" alt="omFM" src="https://github.com/user-attachments/assets/b457baee-cf39-4901-8cbe-667014926944" />

---

## Adding a station

Everything lives in [`app/config/stations.ts`](./app/config/stations.ts). Append one object:

```ts
{
  id: 'jazz',                 // player mount + key in every store
  slug: 'jazz',               // /streams/jazz
  provider: 'azuracast',      // where now-playing comes from
  channel: 'station:jazz',    // channel name on that provider

  hls: 'https://radio.example.com/hls/jazz/live.m3u8',
  icecast: 'https://stream.example.com:8443/jazz',

  text: {
    menu: 'Jazz @ omFM',      // stream picker + card button
    card: 'Jazz',             // caption under the card
    hero: 'JazzFM',           // station page heading
    tagline: 'smoky rooms and brushed drums',
    logo: 'Jazz',             // <sup> next to the header logo
    panel: 'JazzFM',          // player slide-out title
    thumb: 'Jazz',            // player swiper bubble
    tab: 'Jazz',              // tab on /streams
  },

  look: {
    font: "'Tenor Sans', sans-serif",           // any CSS font-family
    radial: 'radial-gradient(#0056fb29, #ff00fb26)',   // interface tint
    accent: 'border border-amber-500/50',       // active card border
  },

  images: {
    heroLight: '/jazz.jpg',
    heroDark: '/jazz.jpg',
    card: '/jazz.jpg',
    thumb: 'rock-00-thumb.jpg',                 // from app/assets/img/
  },

  visualizer: {},               // omit for the built-in colours
  showNext: true,
  artSource: 'station',         // 'itunes' to look covers up instead
  historyCount: 5,
}
```

Run `npm run generate`. That's the whole procedure.

Using a font of your own? Declare it with `@font-face` and put the family in `look.font` —
no CSS edits needed, the theme variables are generated from the registry.

### If your station is on AzuraCast, it's even easier

AzuraCast already publishes now-playing over SSE in exactly the shape this project expects,
so **you only fill in the station's own details** — the provider handles the rest:

```ts
provider: 'azuracast',
channel: 'station:<shortcode>',    // the AzuraCast station shortcode
```

Point the `azuracast` provider at your installation once, in the same file:

```ts
export const providers = {
  azuracast: {
    sseUrl: 'https://your-azuracast.example.com/api/live/nowplaying/sse',
    dedupeBy: 'sh_id',
    historyOffset: 0,
    coverFallback: 'stationArt',
  },
}
```

Every station on that server now shares one SSE connection. Ten stations, one socket.

### Another backend?

Add a provider next to `azuracast`. This project ships with two: AzuraCast and a plain
[Centrifugo](https://centrifugo.dev/) bridge. A provider describes the four things that
actually differ between backends:

| field | what it answers |
|---|---|
| `sseUrl` | where to subscribe |
| `dedupeBy` | how to tell that the track changed (`sh_id` or the track text) |
| `historyOffset` | does the history list start with the current track or the previous one |
| `coverFallback` | when a cover lookup fails — use the station's art or a placeholder |

Stations then simply say which provider they belong to. Mixed setups work: right now five
stations come from AzuraCast and two from Centrifugo, each with its own quirks, and no
component knows the difference.

---

## What you get per station, for free

- **Its own page** at `/streams/<slug>` — hero, play button, spectrum analyzer, now playing,
  next track, history — plus prerendered SEO title and description, in all three locales.
- **A card** on the home page and a slide in the "Top stations" carousel.
- **Entries** in the header menu, the mobile menu, the stream picker and the `/streams` tabs.
- **A bubble** in the player's swiper and in the mobile drop-up.
- **An SSE subscription**, grouped with the other stations of the same provider.
- **Themed UI**: the interface font, the radial glow and the accent colour follow the selected
  station.

---

## Features

**Playback** — HLS via hls.js with an Icecast fallback, switchable at runtime. Volume, mute and
the 10-band equalizer run through the Web Audio graph and persist between visits. Media keys and
the OS now-playing widget are wired through the Media Session API.

**Live data** — one SSE connection per backend, automatic reconnect, per-track progress bars that
keep ticking between updates.

**Cover art** — looked up on iTunes with caching and a graceful fallback to the station's own
artwork. The dominant colour of the current cover is extracted and used to tint the player and
the now-playing cards, with the text colour picked for contrast.

**Visuals** — canvas spectrum bars and a three-band waveform, plus optional film-grain effects
(radial tint, noise, scanlines, flicker), all toggleable and remembered.

**Theme** — dark and light, switched with a circular View Transition that expands from the click,
and respecting `prefers-reduced-motion`.

**Content** — a blog and static pages on Nuxt Content v3, in English, Russian and Spanish.

Settings are applied through attributes on `<html>` before hydration, so a static build and a
server-rendered one behave identically — no flash of default state.

---

## Stack

Nuxt 4 · Vue 3 · Pinia · Tailwind CSS · Nuxt UI · Nuxt Content v3 · Nuxt i18n · hls.js ·
chroma-js · colorthief · Swiper

---

## Setup

```bash
npm install
```

Development server on `http://localhost:3000`:

```bash
npm run dev
```

> Requires Node 22.19+ (Nuxt 4). Nuxt Content v3 uses `better-sqlite3`, which is a native
> module — on a slim Linux image you'll need `python3`, `make` and `g++` to build it.

## Deployment

**Static hosting** (Plesk, cPanel, any web server):

```bash
npm run generate
```

Copy the contents of `.output/public` into your web root.

**Node server:**

```bash
npm run build
node .output/server/index.mjs
```

**Docker:**

```bash
docker compose up -d
```
