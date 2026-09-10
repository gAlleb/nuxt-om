/**
 * Реестр радиостанций — единственный источник правды.
 *
 * Чтобы добавить станцию, добавьте объект в массив `stations` ниже.
 * Ничего больше править не нужно: страницы, меню, карточки, свипер плеера
 * и подписки SSE строятся из этого массива.
 *
 * ВАЖНО: классы Tailwind (accent) должны быть записаны здесь целиком, а не
 * собираться из кусков — JIT сканирует этот файл как обычный исходник
 * (см. `content` в tailwind.config.cjs) и видит только литералы.
 */

/** Откуда станция получает now-playing по SSE. */
export interface Provider {
  /** Базовый URL SSE (без `?cf_connect=`). */
  sseUrl: string
  /** По какому полю определяем, что трек сменился. */
  dedupeBy: 'sh_id' | 'songText'
  /**
   * С какого элемента начинается «предыдущий» трек в song_history.
   * У centrifugo первый элемент — текущий трек, поэтому его пропускаем.
   */
  historyOffset: number
  /** Что подставить, если iTunes ничего не нашёл: обложку станции или заглушку. */
  coverFallback: 'stationArt' | 'placeholder'
}

export const providers = {
  azuracast: {
    sseUrl: 'https://radio.omfm.ru/api/live/nowplaying/sse',
    dedupeBy: 'sh_id',
    historyOffset: 0,
    coverFallback: 'stationArt',
  },
  centrifugo: {
    sseUrl: 'https://centrifugo.omfm.ru/connection/sse',
    dedupeBy: 'songText',
    historyOffset: 1,
    coverFallback: 'placeholder',
  },
  centrifugo386: {
    sseUrl: 'https://r.386.su/connection/sse',
    dedupeBy: 'songText',
    historyOffset: 1,
    coverFallback: 'placeholder',
  },
} as const satisfies Record<string, Provider>

/** Заглушка обложки, когда ничего не нашлось. */
export const placeholderCover = '/static/img/defaultCoverart.jpg'

export type ProviderId = keyof typeof providers

/** Цвета полосного визуализатора. `undefined` — взять встроенные по текущей теме. */
export interface VisualizerScheme {
  color1: string
  color2: string
  color3: string
  capStyle?: string
}

/**
 * Слот расписания. Часы заданы в зоне станции (`StationSchedule.timezone`),
 * а не в зоне посетителя: эфир живёт по времени радио.
 */
export interface ScheduleSlot {
  /** Начало, `HH:MM`. */
  from: string
  /** Конец, `HH:MM`. Меньше начала — слот переходит через полночь. */
  to: string
  /** Название блока: «Night», «Organ». */
  title: string
  /** Что в нём играет, одной строкой. */
  description?: string
  /** Дни недели по ISO: 1 — понедельник, 7 — воскресенье. Не задано — каждый день. */
  days?: number[]
  /**
   * Цвет блока на полосе суток — любое CSS-значение. Не задан: блоки получают
   * ступени прозрачности по порядку появления, одинаковые для одного названия.
   */
  color?: string
}

/** Необязательное расписание станции. Нет его в реестре — нет и кнопки на странице. */
export interface StationSchedule {
  /** IANA-зона, в которой заданы часы, например `Europe/Moscow`. */
  timezone: string
  /** Приписка под заголовком. */
  note?: string
  slots: ScheduleSlot[]
}

export interface Station {
  /** Ключ станции: `stream_mount` плеера и ключ во всех сторах. */
  id: string
  /**
   * Сегмент URL: `/streams/<slug>`. Обычно совпадает с id, но у главной станции
   * id — `stream` (так её зовёт плеер), а страница исторически живёт на `/streams/omfm`.
   */
  slug: string
  provider: ProviderId
  /** Имя канала у провайдера. Внимание: `station:radio` есть у обоих и означает РАЗНЫЕ станции. */
  channel: string

  /** Прямые ссылки на потоки. */
  hls: string
  icecast: string

  /** Тексты — исторически в каждом месте свой вариант названия. */
  text: {
    /** Кнопка в меню выбора стрима и подпись на карточке: «Rock @ omFM». */
    menu: string
    /** Название под карточкой на главной: «Rock». */
    card: string
    /** Заголовок на странице стрима: «RockFM». */
    hero: string
    /** Вторая строка под заголовком. */
    tagline: string
    /**
     * Строки под заголовком и слоганом. Одна строка — просто строка,
     * несколько — массив: каждая отрисуется отдельной строкой.
     */
    heroExtra?: string | string[]
    /** `<sup>` рядом с логотипом в шапке. */
    logo: string
    /** Заголовок выезжающей панели плеера: «RockFM». */
    panel: string
    /** Подпись на кружке в свипере плеера: «Rock». */
    thumb: string
    /** Подпись над треком в мини-плеере. По умолчанию — как в меню. */
    nowPlayingLabel?: string
    /** Подпись таба на `/streams`: «Rock». */
    tab: string
    /** Чем заменить пустое имя плейлиста в строке «Show:». Пусто — показывать как есть. */
    playlistFallback?: string
  }

  /**
   * Оформление станции.
   *
   * `font` и `radial` — готовые CSS-значения (не имена классов): из них
   * генерируются переменные `--station-font` и `--station-radial`, см.
   * stationThemeCss(). Поэтому свой шрифт станции достаточно объявить
   * через @font-face и указать здесь — правки в CSS не нужны.
   *
   * `accent` остаётся классом Tailwind и должен быть литералом: JIT сканирует
   * этот файл и видит только целые строки.
   */
  look: {
    /** CSS font-family, например `'Metal Mania', sans-serif`. */
    font: string
    /** CSS-градиент радиальной подсветки интерфейса. */
    radial: string
    /** Рамка активной карточки на главной. */
    accent: string
    /**
     * Градиент кнопки «Home» на странице станции — классы Tailwind
     * (from-/via-/to-). Не задан — возьмётся фирменный primary.
     */
    homeButton?: string
    /** Доп. класс заголовка героя (неоновая тень у Chill). */
    heroTitleClass?: string
    /** Картинка карточки слишком светлая — притушить сильнее (сейчас только Café de Paris). */
    dimmed?: boolean
  }

  images: {
    /** Фон героя на странице стрима. */
    heroLight: string
    heroDark: string
    /** Картинка карточки на главной и в «Top stations». */
    card: string
    /** Кружок в свипере плеера. Лежит в app/assets/img/. */
    thumb: string
  }

  visualizer: {
    colorScheme?: VisualizerScheme
    customDarkScheme?: VisualizerScheme
  }

  /** Показывать блок «Next Song». У omFM Main следующего трека нет. */
  showNext: boolean
  /** Откуда брать обложку: искать в iTunes или брать `song.art` со станции. */
  artSource: 'itunes' | 'station'
  /** Сколько треков показывать в истории. */
  historyCount: number
  /** Сетка эфира. Задана — на странице станции появляется кнопка «Schedule». */
  schedule?: StationSchedule
}

export const stations: Station[] = [
  {
    id: 'stream',
    slug: 'omfm',
    provider: 'centrifugo',
    channel: 'station:radio',
    hls: 'https://hls.omfm.ru/omfm/stream.m3u8',
    icecast: 'https://stream.omfm.ru:8443/stream',
    text: {
      menu: 'omFM Main',
      card: 'omFM',
      hero: 'omFM',
      tagline: 'meditative, mantras, instrumental',
      logo: '',
      panel: 'omFM',
      thumb: 'omFM',
      nowPlayingLabel: 'omFM',
      tab: 'omFM',
      playlistFallback: 'Relaying UltraFM',
    },
    look: { font: "'Tenor Sans', sans-serif", radial: 'radial-gradient(rgba(229, 23, 187, 0.25), rgba(52, 220, 173, 0.15) 100%)', accent: 'border border-indigo-500/50', homeButton: 'from-orange-800 via-orange-600 to-orange-500' },
    images: {
      heroLight: '/omfm4-light.jpg',
      heroDark: '/omfm4.jpg',
      card: '/omfm.jpg',
      thumb: 'rock-70-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: '#b017a8', color2: 'cyan', color3: 'green', capStyle: '#b017a8' },
    },
    showNext: false,
    artSource: 'itunes',
    historyCount: 5,
  },
  {
    id: 'rock',
    slug: 'rock',
    provider: 'azuracast',
    channel: 'station:radio',
    hls: 'https://radio.omfm.ru/hls/radio/live.m3u8',
    icecast: 'https://stream.omfm.ru:8443/rock',
    text: {
      menu: 'Rock @ omFM',
      card: 'Rock',
      hero: 'RockFM',
      tagline: 'heavy stuff and more',
      logo: 'Rock',
      panel: 'RockFM',
      thumb: 'Rock',
      tab: 'Rock',
      playlistFallback: 'Relaying UltraFM',
    },
    look: { font: "'Metal Mania', sans-serif", radial: 'radial-gradient(rgba(229, 23, 30, 0.25), rgba(220, 52, 189, 0.1) 100%)', accent: 'border border-red-500/50', homeButton: 'from-red-800 via-red-600 to-red-500' },
    images: {
      heroLight: '/metal.webp',
      heroDark: '/rock.webp',
      card: '/rock.webp',
      thumb: 'rock-90-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: '#000000', color2: '#000000', color3: '#000000', capStyle: 'black' },
      customDarkScheme: { color1: 'red', color2: 'darkred', color3: 'red', capStyle: 'red' },
    },
    showNext: true,
    artSource: 'itunes',
    historyCount: 5,
  },
  {
    id: 'ashes',
    slug: 'ashes',
    provider: 'azuracast',
    channel: 'station:ashes',
    hls: 'https://radio.omfm.ru/hls/ashes/live.m3u8',
    icecast: 'https://stream.omfm.ru:8443/ashes',
    text: {
      menu: 'Ashes @ omFM',
      card: 'Ashes',
      hero: 'ASHES',
      tagline: 'southern gothic, dark folk, western',
      heroExtra:
        'From forgotten churches to endless highways. Where the sun goes down and the ghosts come out.',
      logo: 'Ashes',
      panel: 'AshesFM',
      thumb: 'Ashes',
      tab: 'Ashes',
    },
    look: { font: "'Raznochin', sans-serif", radial: 'radial-gradient(rgba(255, 108, 0, 0.16), rgba(244, 228, 47, 0.13) 100%)', accent: 'border border-yellow-500/50', homeButton: 'from-amber-800 via-amber-600 to-amber-500',       heroTitleClass: 'ashes-color' },
    images: {
      heroLight: '/ashes_hero4.png',
      heroDark: '/ashes_hero4.png',
      card: '/ashes_card4.png',
      thumb: 'rock-00-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: 'wheat', color2: 'orange', color3: '#e7b45a', capStyle: 'black' },
    },
    showNext: true,
    artSource: 'station',
    historyCount: 5,
  },
  {
    id: 'coma',
    slug: 'coma',
    provider: 'azuracast',
    channel: 'station:coma',
    hls: 'https://radio.omfm.ru/hls/coma/live.m3u8',
    icecast: 'https://stream.omfm.ru:8443/coma',
    text: {
      menu: 'Coma @ omFM',
      card: 'Coma',
      hero: 'ComaFM',
      tagline: 'ambient, drone, field recordings',
      logo: 'Coma',
      panel: 'ComaFM',
      thumb: 'Coma',
      tab: 'Coma',
    },
    look: { font: "UNSCII, sans-serif", radial: 'radial-gradient(rgba(23, 229, 50, 0.25), rgba(13, 164, 122, 0.1) 100%)', accent: 'border border-green-500/50', homeButton: 'from-blue-800 via-blue-600 to-blue-500' },
    images: {
      heroLight: '/coma.jpg',
      heroDark: '/coma.jpg',
      card: '/coma.jpg',
      thumb: 'rock-80-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: 'green', color2: 'cyan', color3: 'lightgreen', capStyle: 'green' },
    },
    showNext: true,
    artSource: 'station',
    historyCount: 5,
  },
  {
    id: 'core',
    slug: 'core',
    provider: 'azuracast',
    channel: 'station:core',
    hls: 'https://radio.omfm.ru/hls/core/live.m3u8',
    icecast: 'https://stream.omfm.ru:8443/core',
    text: {
      menu: 'CORE @ omFM',
      card: 'CORE',
      hero: 'CoreFM',
      tagline: 'deathcore, metalcore, hardcore',
      logo: 'xCOREx',
      panel: 'CORE FM',
      thumb: 'CORE',
      tab: 'CORe',
    },
    look: { font: "UNSCII, sans-serif", radial: 'radial-gradient(rgba(14, 14, 14, 0.2), rgba(38, 37, 37, 0.31) 100%)', accent: 'border border-zinc-500/50', homeButton: 'from-zinc-800 via-zinc-600 to-zinc-500' },
    images: {
      heroLight: '/core_long.png',
      heroDark: '/core_long.png',
      card: '/core_sm.png',
      thumb: 'rock-70-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: '#ffffff', color2: '#ffffff', color3: '#ffffff', capStyle: 'white' },
    },
    showNext: true,
    artSource: 'station',
    historyCount: 5,
  },
  {
    id: 'terra',
    slug: 'terra',
    provider: 'azuracast',
    channel: 'station:terra',
    hls: 'https://radio.omfm.ru/hls/terra/live.m3u8',
    icecast: 'https://stream.omfm.ru:8443/terra',
    text: {
      menu: 'Terra @ omFM',
      card: 'Terra',
      hero: 'TerraFM',
      tagline: 'Nature, music of the Earth',
      heroExtra:
        'The amazing world of sound from leading field recording artists around the globe.',
      logo: 'Terra',
      panel: 'TerraFM',
      thumb: 'Terra',
      tab: 'Terra',
    },
    look: { font: "'Tenor Sans', sans-serif", radial: 'radial-gradient(rgba(255, 108, 0, 0.16), rgba(244, 228, 47, 0.13) 100%)', accent: 'border border-blue-500/50', homeButton: 'from-green-800 via-green-600 to-green-500' },
    images: {
      heroLight: '/terra.jpg',
      heroDark: '/terra.jpg',
      card: '/terra.jpg',
      thumb: 'rock-00-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: 'wheat', color2: 'orange', color3: 'brown', capStyle: 'black' },
    },
    showNext: true,
    artSource: 'station',
    historyCount: 5,
  },
  {
    id: 'chill',
    slug: 'chill',
    provider: 'azuracast',
    channel: 'station:chill',
    hls: 'https://radio.omfm.ru/hls/chill/live.m3u8',
    icecast: 'https://stream.omfm.ru:8443/chill',
    text: {
      menu: 'Chill @ omFM',
      card: 'Chill',
      hero: 'Chill',
      tagline: 'future garage, chillstep, ambient',
      logo: 'ChiLL',
      panel: 'Chill FM',
      thumb: 'Chill',
      tab: 'Chill',
    },
    look: {
      font: "UNSCII, sans-serif",
      radial: 'radial-gradient(#0056fb29, #ff00fb26)',
      accent: 'border border-pink-500/50', homeButton: 'from-pink-800 via-pink-600 to-pink-500',
      heroTitleClass: 'neon-pink-text-shadow',
    },
    images: {
      heroLight: '/static/img/station/chill/chill_background.jpg',
      heroDark: '/static/img/station/chill/chill_background.jpg',
      card: '/static/img/station/chill/chill.jpg',
      thumb: 'pink-thumb.jpg',
    },
    // Единственная станция без своей схемы — рисуется дефолтной.
    visualizer: {},
    showNext: true,
    artSource: 'station',
    historyCount: 5,
  },
  {
    id: 'cdp',
    slug: 'cdp',
    provider: 'centrifugo',
    channel: 'station:cdp',
    hls: 'https://hls.omfm.ru/cdp/cdp.m3u8',
    icecast: 'https://stream.omfm.ru:8443/cdp',
    text: {
      menu: 'Café de Paris',
      card: 'Café de Paris',
      hero: 'Café de Paris',
      tagline: 'jazz, chanson, Parisian spirit',
      logo: 'CaféDeParis',
      panel: 'Café de Paris',
      thumb: 'Cafe',
      tab: 'Cafe',
      playlistFallback: 'Request',
    },
    look: { font: "'Tenor Sans', sans-serif", radial: 'radial-gradient(rgba(255, 108, 0, 0.16), rgba(244, 228, 47, 0.13) 100%)', accent: 'border border-yellow-500/50', homeButton: 'from-yellow-800 via-red-600 to-yellow-500', dimmed: true },
    images: {
      heroLight: '/cdp_stream.jpg',
      heroDark: '/cdp_stream.jpg',
      card: '/cdp.png',
      thumb: 'rock-00-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: '#b017a8', color2: 'cyan', color3: 'green', capStyle: '#b017a8' },
    },
    showNext: true,
    artSource: 'station',
    historyCount: 5,
  },
  {
    id: 'noir',
    slug: 'noir',
    provider: 'azuracast',
    channel: 'station:noir',
    hls: 'https://radio.omfm.ru/hls/noir/live.m3u8',
    icecast: 'https://stream.omfm.ru:8443/noir',
    text: {
      menu: 'Noir @ omFM',
      card: 'Noir',
      hero: 'NoirFM',
      tagline: 'Jazz: Dark, Noir, Standard',
      logo: 'noir',
      panel: 'Noir',
      thumb: 'Noir',
      tab: 'Noir',
      heroExtra: 'The soundtrack to your endless night, blending heavy-hearted jazz ballads and slow-tempo classics with the abyssal depths of dark jazz, funeral jazz, and modern doom',
    },
    look: { font: "Omega, sans-serif", radial: 'radial-gradient(rgba(14, 14, 14, 0.2), rgba(38, 37, 37, 0.31) 100%)', accent: 'border border-zinc-500/50', homeButton: 'from-neutral-900 via-neutral-700 to-neutral-500' },
    images: {
      heroLight: '/noir_hero.webp',
      heroDark: '/noir_hero.webp',
      card: '/noir_card.webp',
      thumb: 'rock-70-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: '#ffffff', color2: '#ffffff', color3: '#ffffff', capStyle: 'white' },
    },
    showNext: true,
    artSource: 'station',
    historyCount: 5,
  },
  {
    id: '386',
    slug: '386',
    provider: 'centrifugo386',
    channel: 'station:386',
    hls: 'https://hls.386.su/386/386.m3u8',
    icecast: 'https://r.386.su/386.aac',
    text: {
      menu: '386 @ omFM',
      card: '386 by xff',
      hero: '386 Dark Radio by xff',
      tagline: 'EBM, Synthpop, Dark Ambient',
      logo: '386',
      panel: '386',
      thumb: '386',
      tab: '386',
      heroExtra: ['Pulse by day. Depth by night. EBM and synthpop by day. Dark ambient and drone by night. Special hours for the grandeur of the organ and quiet romance.','Curated by @xff.'],
    },
    look: { font: "UNSCII, sans-serif", radial: 'radial-gradient(rgba(14, 14, 14, 0.2), rgba(38, 37, 37, 0.31) 100%)', accent: 'border border-zinc-500/50', homeButton: 'from-neutral-900 via-neutral-700 to-neutral-500' },
    images: {
      heroLight: '/386_hero2.webp',
      heroDark: '/386_hero2.webp',
      card: '/386_card2.webp',
      thumb: 'rock-70-thumb.jpg',
    },
    visualizer: {
      colorScheme: { color1: '#ffffff', color2: '#ffffff', color3: '#ffffff', capStyle: 'white' },
    },
    showNext: true,
    artSource: 'station',
    historyCount: 5,
    schedule: {
      timezone: 'Europe/Moscow',
      note: 'Themed hours break the rotation. Station ident at 06:00.',
      slots: [
        { from: '00:00', to: '02:00', title: 'Night', description: 'Dark ambient and drone' },
        { from: '02:00', to: '03:00', title: 'Classical', description: 'An hour of classical' },
        { from: '03:00', to: '04:00', title: 'Night', description: 'Dark ambient and drone' },
        { from: '04:00', to: '05:00', title: 'Organ', description: 'The grandeur of the organ' },
        { from: '05:00', to: '07:00', title: 'Night', description: 'Dark ambient and drone' },
        { from: '07:00', to: '11:00', title: 'Day', description: 'EBM and synthpop' },
        { from: '11:00', to: '12:00', title: 'Classical', description: 'An hour of classical' },
        { from: '12:00', to: '17:00', title: 'Day', description: 'EBM and synthpop' },
        { from: '17:00', to: '18:00', title: 'Classical', description: 'An hour of classical' },
        { from: '18:00', to: '21:00', title: 'Day', description: 'EBM and synthpop' },
        // 21:00 расходится по дням недели: Romantic по средам, пятницам и субботам.
        { from: '21:00', to: '22:00', title: 'Romantic', description: 'Quiet romance', days: [3, 5, 6] },
        { from: '21:00', to: '22:00', title: 'Organ', description: 'The grandeur of the organ', days: [1, 2, 4, 7] },
        { from: '22:00', to: '00:00', title: 'Night', description: 'Dark ambient and drone' },
      ],
    },
  },
]

/** Станция, играющая по умолчанию при первом заходе. */
export const defaultStationId = 'stream'

export const stationIds = stations.map((s) => s.id)

const byId = new Map(stations.map((s) => [s.id, s]))
const bySlug = new Map(stations.map((s) => [s.slug, s]))

export const stationSlugs = stations.map((s) => s.slug)

export function getStationBySlug(slug: string | null | undefined): Station | undefined {
  return slug ? bySlug.get(slug) : undefined
}

export function getStation(id: string | null | undefined): Station | undefined {
  return id ? byId.get(id) : undefined
}

export function isStationId(id: string | null | undefined): boolean {
  return !!id && byId.has(id)
}

/**
 * CSS с оформлением станций: шрифт интерфейса и радиальная подсветка.
 *
 * Вставляется в <head> (см. nuxt.config.ts) и применяется по атрибуту
 * data-stream, который ставится ещё до первой отрисовки. Благодаря этому
 * добавление станции не требует правок в CSS — достаточно объекта в реестре.
 */
export function stationThemeCss() {
  const first = stations.find((s) => s.id === defaultStationId) ?? stations[0]
  const rules = [`html{--station-font:${first.look.font};--station-radial:${first.look.radial}}`]
  for (const s of stations) {
    rules.push(
      `html[data-stream="${s.id}"]{--station-font:${s.look.font};--station-radial:${s.look.radial}}`,
    )
  }
  return rules.join('')
}
