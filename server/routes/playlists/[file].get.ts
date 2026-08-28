import { buildPlaylists } from '~/config/playlists'

/**
 * Отдаёт плейлисты .m3u.
 *
 * Маршрут, а не файлы в public: так адреса берутся из реестра станций и в
 * режиме разработки, и в SSR, и в статике (пути перечислены в
 * nitro.prerender.routes, поэтому при `nuxt generate` они запекаются в файлы).
 */
export default defineEventHandler((event) => {
  const file = getRouterParam(event, 'file')
  const playlist = buildPlaylists().find((p) => p.path === `/playlists/${file}`)

  if (!playlist) {
    throw createError({ statusCode: 404, statusMessage: 'Playlist not found' })
  }

  setHeader(event, 'content-type', 'audio/x-mpegurl; charset=utf-8')
  setHeader(event, 'content-disposition', `attachment; filename="${file}"`)
  return playlist.content
})
