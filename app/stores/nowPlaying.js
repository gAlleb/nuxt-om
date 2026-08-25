import { defineStore } from 'pinia'
import ColorThief from '~/../node_modules/colorthief/dist/color-thief.mjs'
import { stations, providers, placeholderCover } from '~/config/stations'

/**
 * Единый стор now-playing для всех станций, с любого числа SSE-серверов.
 *
 * Заменил два почти одинаковых стора (stationData / stationData_omfm). Ключ —
 * `station.id` из реестра, а не имя канала: канал `station:radio` есть у обоих
 * провайдеров и означает разные станции (Rock и omFM Main), поэтому по каналу
 * ключевать нельзя.
 *
 * Подписки группируются по провайдеру: сколько провайдеров у станций в реестре,
 * столько и откроется EventSource. Добавление станции соединений не добавляет.
 */

/**
 * Собрать объект со старыми ключами-каналами для фасадов совместимости.
 * `channels` — пары [канал, id станции].
 */
export function projectByChannel(channels, pick) {
  const np = useNowPlaying()
  const out = {}
  for (const [channel, id] of channels) out[channel] = pick(np.byId[id])
  return out
}

/** Пустое состояние одной станции. */
function emptyStation() {
  return {
    /** Сырые данные из SSE, как пришли: { np: { now_playing, playing_next, song_history } }. */
    data: null,
    coverArt: null,
    collectionUrl: '#',
    nextCoverArt: null,
    nextCollectionUrl: '#',
    /** Обложки истории по индексу (индекс уже с учётом historyOffset). */
    historyCoverArt: {},
    historyCollectionUrl: {},
    dominantColor: null,
    progress: { elapsed: 0, duration: 0, lastUpdate: 0, intervalId: 0, width: 0 },
    /** Ключи для дедупликации: чтобы не дёргать iTunes на каждое сообщение SSE. */
    lastTrackKey: null,
    lastNextKey: null,
  }
}

export const useNowPlaying = defineStore('nowPlaying', {
  state: () => ({
    byId: Object.fromEntries(stations.map((s) => [s.id, emptyStation()])),
    /** Флаг загрузки на каждого провайдера: до первого сообщения — true. */
    loadingByProvider: Object.fromEntries(Object.keys(providers).map((p) => [p, true])),
    sources: {},
    /** Кэш ответов iTunes по «артист + название». */
    coverCache: {},
    /** Кэш доминирующих цветов по URL картинки. */
    colorCache: {},
  }),

  getters: {
    /** Список станций провайдера — используется и при подписке, и при разборе сообщений. */
    stationsOf: () => (providerId) => stations.filter((s) => s.provider === providerId),
  },

  actions: {
    /** Открыть SSE ко всем провайдерам, которые встречаются в реестре. */
    connectAll() {
      for (const providerId of Object.keys(providers)) {
        this.connect(providerId)
      }
    },

    /** Идемпотентно: повторный вызов при живом соединении ничего не делает. */
    connect(providerId) {
      if (!import.meta.client) return
      if (this.sources[providerId]) return

      const provider = providers[providerId]
      const own = this.stationsOf(providerId)
      if (!own.length) return

      const subs = {}
      for (const s of own) subs[s.channel] = { recover: true }
      const url = `${provider.sseUrl}?cf_connect=${JSON.stringify({ subs })}`

      const source = new EventSource(url)
      this.sources[providerId] = source

      source.addEventListener('message', (event) => {
        let payload
        try {
          payload = JSON.parse(event.data)
        } catch {
          // Centrifugo шлёт пустые heartbeat-кадры — на них JSON.parse падает.
          return
        }
        this.loadingByProvider[providerId] = false

        if (payload.connect?.subs) {
          for (const channel in payload.connect.subs) {
            const publications = payload.connect.subs[channel].publications
            if (publications?.length) this.apply(providerId, channel, publications[0].data)
          }
        } else if (payload.pub) {
          this.apply(providerId, payload.channel, payload.pub.data)
        }
      })

      source.onerror = () => {
        console.error(`SSE (${providerId}): соединение потеряно, переподключение через 5 секунд`)
        source.close()
        this.sources[providerId] = null
        setTimeout(() => this.connect(providerId), 5000)
      }
    },

    disconnectAll() {
      for (const [id, source] of Object.entries(this.sources)) {
        if (source) source.close()
        this.sources[id] = null
      }
      for (const s of stations) this.stopProgress(s.id)
    },

    /** Разобрать одно сообщение: найти станцию по паре провайдер+канал и обновить её. */
    apply(providerId, channel, npData) {
      const station = this.stationsOf(providerId).find((s) => s.channel === channel)
      if (!station || !npData?.np) return

      const provider = providers[providerId]
      const entry = this.byId[station.id]
      const np = npData.np

      entry.data = npData
      this.startProgress(station.id, np.now_playing.elapsed, np.now_playing.duration)

      // Трек сменился? У провайдеров разные признаки: sh_id против текста трека.
      const trackKey = provider.dedupeBy === 'sh_id' ? np.now_playing.sh_id : np.now_playing.song.text
      if (entry.lastTrackKey !== trackKey) {
        entry.lastTrackKey = trackKey
        this.refreshCovers(station, np)
      }

      // Следующий трек живёт своим циклом — у него отдельный ключ.
      if (station.showNext && station.artSource === 'itunes' && np.playing_next?.song) {
        const nextKey = np.playing_next.song.title
        if (entry.lastNextKey !== nextKey) {
          entry.lastNextKey = nextKey
          this.refreshNextCover(station, np)
        }
      }
    },

    /** Обложка текущего трека, доминирующий цвет и обложки истории. */
    async refreshCovers(station, np) {
      const entry = this.byId[station.id]
      const song = np.now_playing.song

      if (station.artSource === 'station') {
        // Станция отдаёт свою обложку — в iTunes не ходим.
        entry.coverArt = song.art
        entry.collectionUrl = '#'
        this.resolveDominantColor(station.id, song.art)
        return
      }

      const found = await this.lookupCover(station, song.artist, song.title, song.art)
      entry.coverArt = found.artworkUrl
      entry.collectionUrl = found.collectionViewUrl
      this.resolveDominantColor(station.id, found.artworkUrl)

      const from = providers[station.provider].historyOffset
      const history = (np.song_history || []).slice(from, from + station.historyCount)
      history.forEach((item, index) => {
        this.lookupCover(station, item.song.artist, item.song.title, item.song.art).then((cover) => {
          entry.historyCoverArt[index] = cover.artworkUrl
          entry.historyCollectionUrl[index] = cover.collectionViewUrl
        })
      })
    },

    async refreshNextCover(station, np) {
      const entry = this.byId[station.id]
      const song = np.playing_next.song
      const found = await this.lookupCover(station, song.artist, song.title, song.art)
      entry.nextCoverArt = found.artworkUrl
      entry.nextCollectionUrl = found.collectionViewUrl
    },

    /**
     * Поиск обложки в iTunes с кэшем.
     * Ключ кэша не приводится к нижнему регистру: у деванагари и подобных
     * письменностей регистра нет, toLowerCase() их ломает.
     */
    async lookupCover(station, artist, title, stationArt) {
      const key = `${artist} ${title}`
      if (this.coverCache[key]) return this.coverCache[key]

      const fallbackArt =
        providers[station.provider].coverFallback === 'stationArt'
          ? stationArt || placeholderCover
          : placeholderCover
      const fallback = { title, artist, artworkUrl: fallbackArt, collectionViewUrl: '#' }

      let data
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?limit=1&media=music&term=${encodeURIComponent(key)}`,
        )
        if (!response.ok) return fallback
        data = await response.json()
      } catch {
        return fallback
      }

      if (!data.results?.length) return fallback

      const itunes = data.results[0]
      const result = {
        title: itunes.trackName || title,
        artist: itunes.artistName || artist,
        artworkUrl: itunes.artworkUrl100
          ? itunes.artworkUrl100.replace('100x100', '512x512')
          : fallbackArt,
        collectionViewUrl: itunes.collectionViewUrl || '#',
      }
      this.coverCache[key] = result
      return result
    },

    /** Доминирующий цвет обложки — им подкрашивается плеер и карточки. */
    async resolveDominantColor(stationId, imageUrl) {
      if (!imageUrl) return
      const entry = this.byId[stationId]

      if (this.colorCache[imageUrl]) {
        entry.dominantColor = this.colorCache[imageUrl]
        return
      }
      try {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.src = imageUrl
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
        })
        const color = new ColorThief().getColor(img)
        entry.dominantColor = color
        this.colorCache[imageUrl] = color
      } catch {
        entry.dominantColor = [0, 0, 0]
      }
    },

    startProgress(stationId, elapsed, duration) {
      const p = this.byId[stationId].progress
      p.elapsed = elapsed
      p.duration = duration
      p.lastUpdate = Date.now()
      if (p.intervalId === 0) {
        p.intervalId = setInterval(() => this.tickProgress(stationId), 1000)
      }
      this.tickProgress(stationId)
    },

    stopProgress(stationId) {
      const p = this.byId[stationId].progress
      if (p.intervalId !== 0) clearInterval(p.intervalId)
      p.intervalId = 0
    },

    tickProgress(stationId) {
      const p = this.byId[stationId].progress
      const now = Date.now()
      p.elapsed += (now - p.lastUpdate) / 1000
      p.lastUpdate = now
      p.width = p.duration > 0 ? Math.min((p.elapsed / p.duration) * 100, 100) : 0
      if (p.duration > 0 && p.elapsed > p.duration) {
        p.elapsed = p.duration
        this.stopProgress(stationId)
      }
    },
  },
})
