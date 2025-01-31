<template>
        <div ref="visualizerContainer" class="visualizer"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useVisualizerData } from '@/stores/VisualizerStore';
import { useEffectsStore } from '@/stores/effects';
const effectsStore = useEffectsStore();
const visualizerContainer = ref(null);
const initVisualizerStore = useVisualizerData();
const props = defineProps({
  colorScheme: { type: Object, default: null },
  customDarkScheme: { type: Object, default: null },
  barsNumber: null,
  maxHeight: null,
});
watch(effectsStore, () => {updateVisualizerSession();});
function updateVisualizerSession() {
  if (effectsStore.visualizer) {
    if (initVisualizerStore.animationFrameId) { 
    cancelAnimationFrame(initVisualizerStore.animationFrameId);
    initVisualizerStore.animationFrameId = null;
      if(initVisualizerStore.canvas) {
        initVisualizerStore.canvas.remove();
      }
    }
    if (!initVisualizerStore.animationFrameId) { 
    initVisualizerStore.initVisualizer(visualizerContainer.value, props.colorScheme, props.customDarkScheme, props.barsNumber, props.maxHeight);
    }
  } else {
    cancelAnimationFrame(initVisualizerStore.animationFrameId);
    initVisualizerStore.animationFrameId = null;
    if (initVisualizerStore.canvas) initVisualizerStore.canvas.remove();
  }
};
onMounted(async () => {
  await nextTick();
  effectsStore.loadOverlayLocalStorage('visualizer');
  effectsStore.loadOverlayLocalStorage('visualizerCaps');
  if (effectsStore.visualizer){
  if (initVisualizerStore.animationFrameId) {  
    await nextTick();
    cancelAnimationFrame(initVisualizerStore.animationFrameId);
    initVisualizerStore.animationFrameId = null;    
    if(initVisualizerStore.canvas) {
      initVisualizerStore.canvas.remove();
    }
  }
  if (!initVisualizerStore.animationFrameId) { // Check if already initialized
    await nextTick(); // Ensure DOM is ready
    initVisualizerStore.initVisualizer(visualizerContainer.value, props.colorScheme, props.customDarkScheme, props.barsNumber, props.maxHeight);
  }
} 
});
onUnmounted(() => {
  cancelAnimationFrame(initVisualizerStore.animationFrameId);
  initVisualizerStore.animationFrameId = null;
  if (initVisualizerStore.canvas) initVisualizerStore.canvas.remove();
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
	opacity: 0.3;
    bottom: 0;
}

.visualizer-filter {
	display: none;
}
</style>
