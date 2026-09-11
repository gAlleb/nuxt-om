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

  // destroy() внутри сам отцепляется от медиаэлемента, поэтому отдельный
  // detachMedia перед ним не нужен — он только добавляет второй media.load().
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
    // Сначала отпускаем hls.js и только потом трогаем src. Порядок важен:
    // detachMedia внутри себя зовёт media.load(), а тот отменяет незавершённые
    // операции — включая наш play(), если он уже был запущен. Именно поэтому
    // первое переключение с HLS на Icecast раньше «не срабатывало», а после
    // stop/play начинало работать.
    destroyHls()

    // Метка времени, чтобы не подхватить закэшированный ответ.
    audio.src = `${url}?cache-ignore=${Date.now()}`
    audio.load()
    audio.play().catch((error) => console.log('icecast:', error))
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
      destroyHls()
      audio.removeAttribute('src')
      audio.load()
    },

    setVolume(value) {
      audio.volume = value
    },

    setMuted(value) {
      audio.muted = value
    },
  }
}
