<template>
        <div ref="visualizerContainer3Waves" class="visualizer3waves" data-bars="65"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useVisualizerData } from '@/stores/VisualizerStore';

const visualizerContainer3Waves = ref(null);
const initVisualizerStore = useVisualizerData();
const props = defineProps({
  colorScheme: { type: Object, default: null },
  customDarkScheme: { type: Object, default: null },
});
onMounted(async () => {
  if (initVisualizerStore.animationFrameId3Waves) { // Only cancel if an animation exists
    cancelAnimationFrame(initVisualizerStore.animationFrameId3Waves);
    initVisualizerStore.animationFrameId3Waves = null;
    //Crucially, remove the canvas element from the DOM.
    const canvas = document.getElementById('visualizerCanvas3Waves');
    if(canvas) {
        canvas.remove();
    }
  }
  if (!initVisualizerStore.animationFrameId3Waves) { // Check if already initialized
    await nextTick(); // Ensure DOM is ready
        initVisualizerStore.initVisualizer3Waves(visualizerContainer3Waves.value, props.colorScheme, props.customDarkScheme);
  }
});
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

.visualizer-filter {
	display: none;
}
</style>