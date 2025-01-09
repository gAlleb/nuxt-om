<template>
<ClientOnly v-if="ArtComponent">
<component :is="ArtComponent" />
</ClientOnly>
</template>

<script setup>
const ArtComponent = computed(() => {
    let art = Math.random() > 0.5 ? 'plum' : 'dots'
    if (typeof window !== 'undefined') {
      if (art === 'plum')
        return defineAsyncComponent(() => import('./BackgroundArt2.vue'))
      else if (art === 'dots')
        return defineAsyncComponent(() => import('./BackgroundArt.vue'))
    }
    return undefined
  })
</script>