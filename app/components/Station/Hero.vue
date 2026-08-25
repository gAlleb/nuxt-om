<template>
  <div id="VisualizerWrapper" class="relative overflow-hidden">
    <Visualizer
      :color-scheme="station.visualizer.colorScheme ?? null"
      :custom-dark-scheme="station.visualizer.customDarkScheme ?? null" />

    <!-- Светлая и тёмная версии героя: у части станций это разные картинки -->
    <div
      v-for="variant in ['light', 'dark']"
      :key="variant"
      class="relative overflow-hidden"
      :class="[station.look.font, variant === 'light' ? 'flex dark:hidden' : 'hidden dark:flex']"
      :style="{
        background: `url('${variant === 'light' ? station.images.heroLight : station.images.heroDark}') center 40% no-repeat`,
        backgroundSize: 'cover',
        height: '45vh',
      }">
      <div :class="variant === 'light' ? 'indexSliderImg-light' : 'indexSliderImg'"></div>

      <button
        class="flex z-10 right-7 top-7 sm:top-10 sm:right-20 absolute bg-opacity-50 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset focus:ring-offset-gray-800 p-2"
        :class="[variant === 'light' ? 'bg-zinc-400' : 'bg-zinc-500', { 'glowing-text': currentStream === station.id }]"
        @click="player.togglePlay(station.id)">
        <Icon
          name="heroicons-solid:play"
          class="h-12 w-12 bg-white"
          :class="{ hidden: player.isPlayingId(station.id) }"
          aria-hidden="true" />
        <Icon
          name="heroicons-solid:stop"
          class="h-12 w-12 bg-red-500"
          :class="{ hidden: !player.isPlayingId(station.id) }"
          aria-hidden="true" />
      </button>

      <div class="absolute z-10 w-full" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
        <h1
          class="text-5xl sm:text-7xl text-sxvx-light text-center"
          :class="station.look.heroTitleClass"
          :style="station.look.heroTitleClass ? undefined : titleShadow">
          {{ station.text.hero }}
        </h1>
        <h1
          class="text-2xl sm:text-3xl text-sxvx-light text-center"
          :class="station.look.heroTitleClass ? `${station.look.heroTitleClass}-sm` : ''"
          :style="station.look.heroTitleClass ? undefined : titleShadow">
          {{ station.text.tagline }}
        </h1>
        <h1
          v-if="station.text.heroExtra"
          class="text-lg md:text-xl text-center"
          :class="variant === 'light' ? 'text-muddy-waters-800' : 'text-sxvx-light'"
          :style="titleShadow">
          {{ station.text.heroExtra }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { initPlayerStore } from '@/stores/initPlayer'
import { currentStreamStore } from '@/stores/currentStream'

defineProps({
  station: { type: Object, required: true },
})

const player = initPlayerStore()
const streamStore = currentStreamStore()
const currentStream = computed(() => streamStore.currentStream)

const titleShadow = { textShadow: '1px 2px 5px rgba(0,0,0,0.3)' }
</script>

<style scoped>
.visualizer {
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  opacity: 0.6;
  bottom: 0;
}
</style>
