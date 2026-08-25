import Hls from 'hls.js'
import { getStation } from '~/config/stations'

/**
 * Воспроизведение потока: HLS через hls.js или прямой Icecast.
 *
 * Заменил класс IcePlayer. Отличие принципиальное: движок больше не трогает
 * DOM и ничего не знает про кнопки и слайдеры — только звук. Всё видимое
 * (громкость, mute, подсветка) живёт в сторе и рисуется Vue.
 *
 * Адреса потоков берутся из реестра станций, отдельной таблицы URL больше нет.
 */
export function createAudioEngine() {
  const audio = new Audio()
  audio.crossOrigin = 'anonymous'

  let hls = null

  function destroyHls() {
    if (hls) {
      hls.destroy()
      hls = null
    }
  }

  function playHls(url) {
    if (Hls.isSupported()) {
      if (hls) hls.detachMedia()
      hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(audio)
      hls.on(Hls.Events.MEDIA_ATTACHED, () => audio.play())
      hls.on(Hls.Events.ERROR, (event, data) => console.log(data))
      return
    }
    // Safari умеет HLS сам.
    if (audio.canPlayType('application/vnd.apple.mpegurl')) {
      audio.src = url
      audio.play().catch((error) => console.log(error))
      return
    }
    console.log('Your browser does not support HLS.')
  }

  function playIcecast(url) {
    // Метка времени, чтобы не подхватить закэшированный ответ.
    audio.src = `${url}?cache-ignore=${Date.now()}`
    audio.play()
    destroyHls()
  }

  return {
    audio,

    /** Запустить станцию по её id. */
    play(stationId, useHls) {
      const station = getStation(stationId)
      if (!station) {
        console.warn(`audioEngine: неизвестная станция "${stationId}"`)
        return
      }
      if (useHls) playHls(station.hls)
      else playIcecast(station.icecast)
    },

    stop() {
      audio.pause()
      if (hls) hls.detachMedia()
      audio.removeAttribute('src')
      destroyHls()
    },

    setVolume(value) {
      audio.volume = value
    },

    setMuted(value) {
      audio.muted = value
    },
  }
}
