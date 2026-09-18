<template>
  <canvas
    v-show="milkdrop.enabled"
    ref="canvas"
    class="milkdrop-canvas"
    aria-hidden="true"></canvas>
</template>

<script setup>
import { useMilkdropStore } from '@/stores/milkdrop'
import { initPlayerStore } from '@/stores/initPlayer'

const milkdrop = useMilkdropStore()
const player = initPlayerStore()

const canvas = ref(null)

// Визуализатор держит контекст WebGL и пересоздавать его дорого, а метода
// уничтожения в butterchurn нет. Поэтому при выключении просто прекращаем
// отрисовку, а сам объект остаётся для следующего включения.
let visualizer = null
let presets = null
let frame = null
let cycle = null

/** Размер холста в пикселях устройства, с потолком для телефонов. */
function sizeOf() {
  const w = window.innerWidth
  const h = window.innerHeight
  // На телефоне полный devicePixelRatio означает вчетверо больше работы на
  // кадр при вчетверо более слабой видеокарте. Ограничиваем.
  const cap = w < 768 ? 1 : 2
  const ratio = Math.min(window.devicePixelRatio || 1, cap)
  return { w, h, ratio }
}

function applySize() {
  if (!visualizer || !canvas.value) return
  const { w, h, ratio } = sizeOf()
  canvas.value.width = Math.floor(w * ratio)
  canvas.value.height = Math.floor(h * ratio)
  visualizer.setRendererSize(canvas.value.width, canvas.value.height)
}

/** Случайный пресет; blend — секунды перетекания из текущего. */
function loadRandomPreset(blend = 2.7) {
  if (!visualizer || !presets) return
  const names = Object.keys(presets)
  if (names.length === 0) return
  const name = names[Math.floor(Math.random() * names.length)]
  visualizer.loadPreset(presets[name], blend)
}

async function start() {
  if (!canvas.value) return

  // Звук нужен сам по себе: без него MilkDrop рисует неподвижную картинку.
  // Нажатие на кнопку — это жест пользователя, поэтому создавать AudioContext
  // здесь можно, он не окажется заблокированным.
  if (!player.ctx) player.initPlayer()
  if (!player.ctx || !player.analyzer) return

  if (!visualizer) {
    // butterchurn собран как UMD и требует window, поэтому грузится только
    // здесь, в браузере. Статический сборке он так не попадается на глаза.
    const [{ default: butterchurn }, { default: butterchurnPresets }] = await Promise.all([
      import('butterchurn'),
      import('butterchurn-presets'),
    ])

    const { w, h, ratio } = sizeOf()
    visualizer = butterchurn.createVisualizer(player.ctx, canvas.value, {
      width: Math.floor(w * ratio),
      height: Math.floor(h * ratio),
      pixelRatio: ratio,
      textureRatio: 1,
    })

    // Берём звук после эквалайзера, чтобы картинка соответствовала тому, что
    // слышно. Анализатор пропускает сигнал дальше, эфир от этого не меняется.
    visualizer.connectAudio(player.analyzer)

    presets = butterchurnPresets.getPresets()
    loadRandomPreset(0)
  }

  applySize()
  window.addEventListener('resize', applySize)

  const draw = () => {
    visualizer.render()
    frame = requestAnimationFrame(draw)
  }
  frame = requestAnimationFrame(draw)

  // Одна картинка надоедает — меняем пресет, как это делает сам MilkDrop.
  cycle = setInterval(() => loadRandomPreset(), 20000)
}

function stop() {
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null
  if (cycle !== null) clearInterval(cycle)
  cycle = null
  window.removeEventListener('resize', applySize)
}

watch(() => milkdrop.enabled, (on) => {
  // Признак режима вешаем на <html> — так же, как сделаны плёночные эффекты.
  // Через него шапка снимает подложку: фон ей задаёт не один класс, а
  // несколько правил вперемешку, и перебить их надёжнее атрибутом.
  if (on) document.documentElement.setAttribute('data-milkdrop', '')
  else document.documentElement.removeAttribute('data-milkdrop')

  if (on) start()
  else stop()
})

onBeforeUnmount(() => {
  stop()
  document.documentElement.removeAttribute('data-milkdrop')
})
</script>

<style scoped>
.milkdrop-canvas {
  position: fixed;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  /* Ниже плеера (30) и шапки (31): они должны оставаться видимыми поверх. */
  z-index: 20;
  background: #000;
}
</style>

<style>
/* Шапка во время MilkDrop: без подложки и без тени, чтобы не закрывать
   картинку. Кнопки управления при этом остаются на месте и видны. */
/* Полоса прокрутки во весь экран лишняя: под картинкой всё равно ничего
   не видно. Заодно фиксируем страницу, чтобы случайный свайп не уводил
   её вбок. Позиция прокрутки сохраняется и возвращается при выключении. */
[data-milkdrop],
[data-milkdrop] body {
  overflow: hidden !important;
}

[data-milkdrop] .header {
  background: transparent !important;
  box-shadow: none !important;
  opacity: 1 !important;
}
</style>
