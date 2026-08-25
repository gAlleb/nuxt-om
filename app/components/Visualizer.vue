<template>
  <div class="visualizer">
    <canvas ref="canvas" class="visualizer-item"></canvas>
  </div>
</template>

<script setup>
import { useVisualizer } from '~/composables/useVisualizer'

const props = defineProps({
  colorScheme: { type: Object, default: null },
  customDarkScheme: { type: Object, default: null },
  barsNumber: { type: [Number, String], default: null },
  maxHeight: { type: [Number, String], default: null },
})

const canvas = ref(null)

useVisualizer(canvas, {
  mode: 'bars',
  colorScheme: computed(() => props.colorScheme),
  customDarkScheme: computed(() => props.customDarkScheme),
  barsNumber: computed(() => props.barsNumber),
  maxHeight: computed(() => props.maxHeight),
})
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
  opacity: 0.3;
  bottom: 0;
}
</style>
