<template>
  <div class="visualizer3waves">
    <canvas ref="canvas" class="visualizer-item-3waves"></canvas>
  </div>
</template>

<script setup>
import { useVisualizer } from '~/composables/useVisualizer'

const props = defineProps({
  colorScheme: { type: Object, default: null },
  customDarkScheme: { type: Object, default: null },
})

const canvas = ref(null)

useVisualizer(canvas, {
  mode: 'waves3',
  colorScheme: computed(() => props.colorScheme),
  customDarkScheme: computed(() => props.customDarkScheme),
})
</script>

<style scoped>
.visualizer3waves {
  position: absolute;
  inset: auto 0 0;
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  opacity: 0.3;
  bottom: 0;
}
</style>
