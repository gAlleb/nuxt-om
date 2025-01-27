<template>
        <div ref="visualizerContainer3Waves" class="visualizer3waves" data-bars="65"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useVisualizerData } from '@/stores/VisualizerStore';
import { useEffectsStore } from '@/stores/effects';
const effectsStore = useEffectsStore();
const visualizerContainer3Waves = ref(null);
const initVisualizerStore = useVisualizerData();
const props = defineProps({
  colorScheme: { type: Object, default: null },
  customDarkScheme: { type: Object, default: null },
});
watch(effectsStore, () => {updateVisualizerSession();});
function updateVisualizerSession() {
  if (effectsStore.visualizer) {
    if (initVisualizerStore.animationFrameId3Waves) { 
    cancelAnimationFrame(initVisualizerStore.animationFrameId3Waves);
    initVisualizerStore.animationFrameId3Waves = null;
      if(initVisualizerStore.canvas3Waves) {
        initVisualizerStore.canvas3Waves.remove();
      }
    }
    if (!initVisualizerStore.animationFrameId3Waves) { 
      initVisualizerStore.initVisualizer3Waves(visualizerContainer3Waves.value, props.colorScheme, props.customDarkScheme);
    }
  } else {
    cancelAnimationFrame(initVisualizerStore.animationFrameId3Waves);
    initVisualizerStore.animationFrameId3Waves = null;
    if (initVisualizerStore.canvas3Waves) initVisualizerStore.canvas3Waves.remove();
  }
};
onMounted(async () => {
  await nextTick();
  effectsStore.loadOverlayLocalStorage('visualizer');
  if (effectsStore.visualizer){
  if (initVisualizerStore.animationFrameId3Waves) {  
    await nextTick();
    cancelAnimationFrame(initVisualizerStore.animationFrameId3Waves);
    initVisualizerStore.animationFrameId3Waves = null;    
    if(initVisualizerStore.canvas3Waves) {
      initVisualizerStore.canvas3Waves.remove();
    }
  }
  if (!initVisualizerStore.animationFrameId3Waves) { // Check if already initialized
    await nextTick(); // Ensure DOM is ready
    initVisualizerStore.initVisualizer3Waves(visualizerContainer3Waves.value, props.colorScheme, props.customDarkScheme);
  }
} 
});
onUnmounted(() => {
  cancelAnimationFrame(initVisualizerStore.animationFrameId3Waves);
  initVisualizerStore.animationFrameId3Waves = null;
  if (initVisualizerStore.canvas3Waves) initVisualizerStore.canvas3Waves.remove();
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