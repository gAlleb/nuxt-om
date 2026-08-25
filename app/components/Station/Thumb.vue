<template>
  <div
    class="relative flex cursor-pointer rounded-full"
    style="height: 40px; width: 40px;"
    @click="player.toggleInstantPlay(station.id)">
    <img
      class="rounded-full absolute"
      height="40"
      width="40"
      :src="thumbUrl"
      :alt="station.text.menu"
      :class="{ 'grayscale opacity-50': !isCurrent }" />
    <span
      class="text-xs z-1 text-white absolute"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
      :class="{ 'glowing-text': isCurrent, 'opacity-75': !isCurrent }">
      {{ station.text.thumb }}
    </span>
  </div>
</template>

<script setup>
import { initPlayerStore } from '@/stores/initPlayer'
import { currentStreamStore } from '@/stores/currentStream'

const props = defineProps({
  station: { type: Object, required: true },
})

const player = initPlayerStore()
const streamStore = currentStreamStore()
const isCurrent = computed(() => streamStore.currentStream === props.station.id)

/**
 * Кружки лежат в app/assets/img и проходят через сборщик, поэтому путь
 * нельзя собрать строкой — берём готовые URL через glob.
 */
const thumbFiles = import.meta.glob('~/assets/img/*-thumb.jpg', { eager: true, import: 'default' })
const thumbUrl = computed(() => {
  const key = Object.keys(thumbFiles).find((k) => k.endsWith(`/${props.station.images.thumb}`))
  return key ? thumbFiles[key] : ''
})
</script>
