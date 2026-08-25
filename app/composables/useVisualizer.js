import { useEventListener } from '@vueuse/core'
import { initPlayerStore } from '~/stores/initPlayer'
import { useEffectsStore } from '~/stores/effects'

/**
 * Отрисовка спектра на canvas.
 *
 * Раньше это жило в pinia-сторе, который хранил DOM-узел и id кадра анимации;
 * из-за этого два визуализатора одного вида на странице отменяли кадры друг
 * другу, а слушатель resize никогда не снимался. Теперь у каждого компонента
 * свой кадр и свой буфер, а уборка привязана к его жизненному циклу.
 */

const BARS = {
  dark: { color1: '#b017a8', color2: 'cyan', color3: 'green', capStyle: 'white' },
  light: { color1: '#0f0', color2: '#ff0', color3: '#f00', capStyle: 'black' },
}
const WAVES3 = {
  dark: { color1: '#f5ee73', color2: '#69fffc', color3: '#f549e9' },
  light: { color1: '#111111', color2: '#222222', color3: '#333333' },
}

export function useVisualizer(canvasRef, options = {}) {
  const { mode = 'bars' } = options

  const player = initPlayerStore()
  const effects = useEffectsStore()
  const colorMode = useColorMode()

  /**
   * Приоритет тот же, что был в сторе: отдельная тёмная схема, затем общий
   * override из пропсов, затем встроенные цвета по текущей теме.
   */
  const scheme = computed(() => {
    const isDark = colorMode.value === 'dark'
    const defaults = mode === 'bars' ? BARS : WAVES3
    const custom = unref(options.customDarkScheme)
    const override = unref(options.colorScheme)
    if (custom && isDark) return custom
    if (override) return override
    return isDark ? defaults.dark : defaults.light
  })

  const barCount = computed(() => Number(unref(options.barsNumber)) || 65)
  const maxHeight = computed(() => Number(unref(options.maxHeight)) || 255)

  let frameId = null
  let buffer = null

  /**
   * Присваивание canvas.width очищает холст, даже если значение не изменилось,
   * поэтому трогаем размер только при реальном изменении.
   */
  function fitToParent() {
    const canvas = canvasRef.value
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    if (canvas.width !== parent.clientWidth) canvas.width = parent.clientWidth
    if (canvas.height !== parent.clientHeight) canvas.height = parent.clientHeight
  }

  function drawBars(ctx, canvas, caps) {
    player.analyzer.getByteFrequencyData(buffer)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const bars = barCount.value
    const barWidth = canvas.width / bars
    const gradient = ctx.createLinearGradient(0, 200, 0, 0)
    gradient.addColorStop(0, scheme.value.color1)
    gradient.addColorStop(0.5, scheme.value.color2)
    gradient.addColorStop(1, scheme.value.color3)

    for (let i = 0; i < bars; i++) {
      // Нижние частоты растянуты вдвое — так спектр выглядит равномернее.
      const index = Math.floor((i + 10) * (i < bars / 2 ? 2 : 1))
      const value = buffer[index] || 0
      const barHeight = Math.max(4, value) + maxHeight.value / 255
      const x = i * barWidth

      if (effects.visualizerCaps) {
        const capBase = canvas.height - 2
        if (caps.length < Math.round(bars)) caps.push(value)
        ctx.fillStyle = scheme.value.capStyle
        if (value < caps[i]) {
          ctx.fillRect(x, capBase - --caps[i], barWidth - 2, 2)
        } else {
          ctx.fillRect(x, capBase - value, barWidth - 2, 2)
          caps[i] = value
        }
      }

      ctx.fillStyle = gradient
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight)
    }
  }

  function drawWaves3(ctx, canvas) {
    player.analyzer.getByteTimeDomainData(buffer)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineWidth = 2

    const third = buffer.length / 3
    const bands = [
      [buffer.slice(0, third), scheme.value.color1],
      [buffer.slice(third, 2 * third), scheme.value.color2],
      [buffer.slice(2 * third), scheme.value.color3],
    ]

    for (const [band, color] of bands) {
      ctx.strokeStyle = color
      ctx.beginPath()
      const sliceWidth = canvas.width / band.length
      let x = 0
      for (let i = 0; i < band.length; i++) {
        const y = canvas.height / 2 + (band[i] / 255) * (canvas.height / 2)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
        x += sliceWidth
      }
      ctx.stroke()
    }
  }

  function start() {
    if (frameId !== null) return
    const canvas = canvasRef.value
    if (!canvas || !player.analyzer) return

    player.analyzer.fftSize = 2048
    buffer = new Uint8Array(player.analyzer.frequencyBinCount)
    const ctx = canvas.getContext('2d')
    const caps = []

    const render = () => {
      frameId = requestAnimationFrame(render)
      fitToParent()
      if (mode === 'bars') drawBars(ctx, canvas, caps)
      else drawWaves3(ctx, canvas)
    }
    render()
  }

  function stop() {
    if (frameId !== null) {
      cancelAnimationFrame(frameId)
      frameId = null
    }
    const canvas = canvasRef.value
    if (canvas) canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
  }

  // Включение/выключение из настроек и появление анализатора после инициализации плеера.
  watch(
    [() => effects.visualizer, () => player.analyzer],
    ([enabled, analyzer]) => {
      if (enabled && analyzer) start()
      else stop()
    },
    { immediate: true },
  )

  onMounted(async () => {
    await nextTick()
    fitToParent()
    if (effects.visualizer && player.analyzer) start()
  })

  // Слушатель снимается сам при размонтировании — раньше он копился.
  useEventListener('resize', fitToParent)
  onBeforeUnmount(stop)

  return { start, stop }
}
