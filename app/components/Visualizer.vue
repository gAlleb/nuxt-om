<template>
        <div ref="visualizerContainer" class="visualizer"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useVisualizerData } from '@/stores/VisualizerStore';

const visualizerContainer = ref(null);
const initVisualizerStore = useVisualizerData();
const props = defineProps({
  colorScheme: { type: Object, default: null },
  customDarkScheme: { type: Object, default: null },
  barsNumber: null,
  maxHeight: null,
});
onMounted(async () => {
  if (initVisualizerStore.animationFrameId) { // Only cancel if an animation exists
    await nextTick();
    cancelAnimationFrame(initVisualizerStore.animationFrameId);
    initVisualizerStore.animationFrameId = null;
    //Crucially, remove the canvas element from the DOM.
    const canvas = document.getElementById('visualizerCanvas');
    if(canvas) {
        canvas.remove();
    }
  }
  if (!initVisualizerStore.animationFrameId) { // Check if already initialized
    await nextTick(); // Ensure DOM is ready
        initVisualizerStore.initVisualizer(visualizerContainer.value, props.colorScheme, props.customDarkScheme, props.barsNumber, props.maxHeight);
  }
});
onUnmounted(() => {
  cancelAnimationFrame(initVisualizerStore.animationFrameId);
  // cancelAnimationFrame(initVisualizerStore.animationFrameIdWave);
  // cancelAnimationFrame(initVisualizerStore.animationFrameId3Waves);
  initVisualizerStore.animationFrameId = null;
  // initVisualizerStore.animationFrameIdWave = null;
  // initVisualizerStore.animationFrameId3Waves = null;
  //Remove canvas elements
  const canvas = document.getElementById('visualizerCanvas');
  if (canvas) canvas.remove();
  // const canvasWave = document.getElementById('visualizerCanvasWave');
  // if (canvasWave) canvasWave.remove();
  // const canvas3Waves = document.getElementById('visualizerCanvas3Waves');
  // if (canvas3Waves) canvas3Waves.remove();
});
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
	opacity: 0.2;
    bottom: 0;
}

.visualizer-filter {
	display: none;
}
</style>