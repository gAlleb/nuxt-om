import chroma from 'chroma-js'
import { useNowPlaying } from '~/stores/nowPlaying'

/**
 * Подкраска блоков под доминирующий цвет текущей обложки.
 *
 * Была скопирована в семи компонентах Streams/* и в Player.vue — теперь одна.
 * `stationId` может быть строкой или ref/computed (у плеера станция меняется).
 */
export function useDominantTheme(stationId) {
  const np = useNowPlaying()
  const colorMode = useColorMode()

  const background = computed(() => {
    const id = unref(stationId)
    const color = id ? np.byId[id]?.dominantColor : null
    const isDark = colorMode.value === 'dark'

    if (!color) return { background: isDark ? '#2b3035' : '#f2eee6' }
    return { background: `rgba(${color.join(',')},${isDark ? 0.6 : 0.85})` }
  })

  const text = computed(() => {
    let rgb
    try {
      rgb = chroma(background.value.background).rgb()
    } catch {
      return { color: '#000', borderColor: '1px #000 solid' }
    }

    const luminance = chroma(rgb).luminance()
    let textColor

    if (luminance > 0.8) {
      // Очень светлый фон — затемняем сильно.
      textColor = chroma(rgb).darken(4).hex()
    } else if (luminance < 0.2) {
      // Очень тёмный фон — осветляем сильно.
      textColor = chroma(rgb).brighten(3).hex()
    } else {
      // Середина: подбираем затемнение до контраста WCAG AAA (7:1), иначе останавливаемся на достигнутом.
      let attempt = 1
      let candidate = chroma(rgb).darken(attempt)
      while (chroma.contrast(candidate, chroma(rgb)) < 7 && attempt < 5) {
        attempt++
        candidate = chroma(rgb).darken(attempt)
      }
      textColor = candidate.hex()
    }

    return { color: textColor, borderColor: `1px ${textColor} solid` }
  })

  return { background, text }
}
