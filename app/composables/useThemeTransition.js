/**
 * Переключение темы кругом, расходящимся из точки клика.
 *
 * Опирается на View Transitions API. Если его нет или пользователь просил
 * меньше движения — тема просто меняется мгновенно.
 */
export function useThemeTransition() {
  const colorMode = useColorMode()

  /** Тема, в которую переключит следующий клик. */
  const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

  /**
   * @param event клик — из него берутся координаты центра круга
   * @param theme в какую тему переключить; по умолчанию — противоположная текущей
   */
  function switchTheme(event, theme) {
    const target = theme || nextTheme.value
    const apply = () => {
      colorMode.preference = target
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduceMotion || !event) {
      apply()
      return
    }

    const x = event.clientX
    const y = event.clientY
    // Радиус до самого дальнего угла экрана — чтобы круг накрыл страницу целиком.
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 600,
          easing: 'cubic-bezier(.76,.32,.29,.99)',
          pseudoElement: '::view-transition-new(root)',
        },
      )
    })
  }

  return { nextTheme, switchTheme }
}
