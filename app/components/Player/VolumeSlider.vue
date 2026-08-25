<template>
  <input
    :id="inputId"
    type="range"
    min="0"
    max="100"
    step="1"
    :value="player.displayVolume"
    :class="klass"
    :style="{ background: gradient }"
    @input="onInput"
    @click="onInput" />
</template>

<script setup>
import { initPlayerStore } from '@/stores/initPlayer'

/**
 * Ползунок громкости. Их на странице три (в плеере горизонтальный и
 * вертикальный, ещё один в шапке) — все показывают одно и то же значение
 * из стора, поэтому синхронизировать их вручную больше не нужно.
 */
defineProps({
  /** id нужен старым CSS-правилам и обработчикам открытия/закрытия. */
  inputId: { type: String, default: undefined },
  klass: { type: String, default: '' },
})

const player = initPlayerStore()

const FILLED = 'rgba(230, 230, 230, 1)'
const EMPTY = 'rgba(75, 75, 75, 1)'

const gradient = computed(() => {
  const pct = player.displayVolume
  return `linear-gradient(to right, ${FILLED} ${pct}%, ${EMPTY} ${pct}%)`
})

function onInput(event) {
  player.setVolume(Number(event.target.value) / 100)
}
</script>
