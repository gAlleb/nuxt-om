<template>
<ClientOnly v-if="ArtComponent">
<component :is="ArtComponent" v-if="effectsStore.artBackground"/>
</ClientOnly>
</template>

<script setup>
import { useEffectsStore } from '@/stores/effects';
const effectsStore = useEffectsStore();

const ArtComponent = computed(() => {
    let art = Math.random() > 0.5 ? 'plum' : 'dots'
    if (typeof window !== 'undefined') {
      if (art === 'plum')
        return defineAsyncComponent(() => import('./BackgroundArt.vue'))
      else if (art === 'dots')
        return defineAsyncComponent(() => import('./BackgroundArt.vue'))
    }
    return undefined
  })
</script>