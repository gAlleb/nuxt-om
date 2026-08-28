import { stations, type Station } from './stations'

/**
 * Плейлисты .m3u для внешних медиаплееров.
 *
 * Собираются из того же реестра, что и всё остальное, поэтому адреса в них
 * не могут разойтись с теми, что показаны на сайте. Файлы пишутся при сборке —
 * см. хук `nitro:build:public-assets` в nuxt.config.ts.
 */

/** Расширенный M3U: строка #EXTINF даёт плееру название станции. */
function m3u(entries: { title: string; url: string }[]) {
  const lines = ['#EXTM3U']
  for (const { title, url } of entries) {
    lines.push(`#EXTINF:-1,${title}`, url)
  }
  return lines.join('\n') + '\n'
}

/** Путь плейлиста станции: `/playlists/rock.m3u` и `/playlists/rock-hls.m3u`. */
export function playlistPath(station: Station, kind: 'icecast' | 'hls') {
  return `/playlists/${station.slug}${kind === 'hls' ? '-hls' : ''}.m3u`
}

/** Все файлы плейлистов: по два на станцию плюс два сводных. */
export function buildPlaylists() {
  const files: { path: string; content: string }[] = []

  for (const station of stations) {
    files.push({
      path: playlistPath(station, 'icecast'),
      content: m3u([{ title: station.text.menu, url: station.icecast }]),
    })
    files.push({
      path: playlistPath(station, 'hls'),
      content: m3u([{ title: station.text.menu, url: station.hls }]),
    })
  }

  // Сводные: все станции одним файлом.
  files.push({
    path: '/playlists/omfm-all.m3u',
    content: m3u(stations.map((s) => ({ title: s.text.menu, url: s.icecast }))),
  })
  files.push({
    path: '/playlists/omfm-all-hls.m3u',
    content: m3u(stations.map((s) => ({ title: s.text.menu, url: s.hls }))),
  })

  return files
}
