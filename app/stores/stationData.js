import { defineStore } from 'pinia'
import { stations as allStations } from '~/config/stations'
import { useNowPlaying, projectByChannel } from './nowPlaying'

/**
 * Совместимость: тонкий фасад над useNowPlaying.
 *
 * Раньше это был самостоятельный стор с собственным SSE-соединением; вся логика
 * переехала в nowPlaying.js. Фасад оставлен, чтобы шаблоны продолжали обращаться
 * по старым ключам вида `station:radio`. Уйдёт вместе с ними на этапе 3.
 *
 * Осторожно: здесь `station:radio` — это Rock, а в stationData_omfm.js под тем же
 * ключом лежит omFM Main.
 */

const PROVIDER = 'azuracast'
const channels = allStations.filter((s) => s.provider === PROVIDER).map((s) => [s.channel, s.id])

/**
 * Пока обложки не загрузились, отдаём undefined, а не пустой объект:
 * шаблоны проверяют сам объект на существование, и `{}` включил бы
 * ссылку «послушать в iTunes» раньше времени, с пустым href.
 */
function emptyAsUndefined(obj) {
  return Object.keys(obj).length ? obj : undefined
}

export const useAzuracastData = defineStore('stationData', {
  getters: {
    isLoading: () => useNowPlaying().loadingByProvider[PROVIDER],
    stations: () => projectByChannel(channels, (e) => e.data),
    progress: () => projectByChannel(channels, (e) => e.progress),
    coverArtUrls: () => projectByChannel(channels, (e) => e.coverArt),
    collectionViewUrls: () => projectByChannel(channels, (e) => e.collectionUrl),
    nextCoverArtUrls: () => projectByChannel(channels, (e) => e.nextCoverArt),
    nextCollectionViewUrls: () => projectByChannel(channels, (e) => e.nextCollectionUrl),
    dominantColors: () => projectByChannel(channels, (e) => e.dominantColor),
    songHistoryCoverArt: () =>
      projectByChannel(channels, (e) => emptyAsUndefined(e.historyCoverArt)),
    songHistoryCollectionViewUrls: () =>
      projectByChannel(channels, (e) => emptyAsUndefined(e.historyCollectionUrl)),
  },
  actions: {
    connectToSSE() {
      useNowPlaying().connect(PROVIDER)
    },
  },
})
