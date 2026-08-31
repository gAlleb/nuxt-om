<template>
  <div v-if="showButton" class="flex mx-auto">
    <NuxtLink
      :to="localePath('/')"
      class="flex bg-gradient-to-r hover:from-primary-600 hover:via-primary-500 hover:to-primary-400 py-2 px-6 rounded-full"
      :class="gradient">
      <span class="text-zinc-200">Home</span>
    </NuxtLink>
  </div>
</template>

<script setup>
import { currentStreamStore } from '~/stores/currentStream'
import { getStation } from '~/config/stations'

const localePath = useLocalePath()
const streamStore = currentStreamStore()
const route = useRoute()

/** Градиент берётся у выбранной станции; без него — фирменный primary. */
const gradient = computed(
  () =>
    getStation(streamStore.currentStream)?.look.homeButton ??
    'from-primary-800 via-primary-600 to-primary-500',
)

/** На самой главной кнопка не нужна — с учётом языковых версий. */
const showButton = computed(() => !['/', '/es', '/ru'].includes(route.path))
</script>
