<template>
        <div ref="visualizerContainerWave" class="visualizer" :style="{ display: useInitPlayerStore.isPlaying ? 'block' : 'none' }"></div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useVisualizerData } from '@/stores/VisualizerStore';
import { initPlayerStore } from '@/stores//initPlayer';
import { useEffectsStore } from '@/stores/effects';
const effectsStore = useEffectsStore();
const useInitPlayerStore = initPlayerStore(); 
const visualizerContainerWave = ref(null);
const initVisualizerStore = useVisualizerData();
const props = defineProps({
  colorSchemeWave: null,
  customDarkSchemeWave: null,
});
watch(effectsStore, () => {updateVisualizerSession();});
function updateVisualizerSession() {
  if (effectsStore.visualizer) {
    if (initVisualizerStore.animationFrameIdWave) { 
    cancelAnimationFrame(initVisualizerStore.animationFrameIdWave);
    initVisualizerStore.animationFrameIdWave = null;
      if(initVisualizerStore.canvasWave) {
        initVisualizerStore.canvasWave.remove();
      }
    }
    if (!initVisualizerStore.animationFrameIdWave) { 
      initVisualizerStore.initVisualizerWave(visualizerContainerWave.value, props.colorSchemeWave, props.customDarkSchemeWave);
    }
  } else {
    cancelAnimationFrame(initVisualizerStore.animationFrameIdWave);
    initVisualizerStore.animationFrameIdWave = null;
    if (initVisualizerStore.canvasWave) initVisualizerStore.canvasWave.remove();
  }
};
onMounted(async () => {
  await nextTick();
  effectsStore.loadOverlayLocalStorage('visualizer');
  if (effectsStore.visualizer){
  if (initVisualizerStore.animationFrameIdWave) {  
    await nextTick();
    cancelAnimationFrame(initVisualizerStore.animationFrameIdWave);
    initVisualizerStore.animationFrameIdWave = null;    
    if(initVisualizerStore.canvasWave) {
      initVisualizerStore.canvasWave.remove();
    }
  }
  if (!initVisualizerStore.animationFrameIdWave) { // Check if already initialized
    await nextTick(); // Ensure DOM is ready
    initVisualizerStore.initVisualizerWave(visualizerContainerWave.value, props.colorSchemeWave, props.customDarkSchemeWave);
  }
} 
});
onUnmounted(() => {
  cancelAnimationFrame(initVisualizerStore.animationFrameIdWave);
  initVisualizerStore.animationFrameIdWave = null;
  if (initVisualizerStore.canvasWave) initVisualizerStore.canvasWave.remove();
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

<script>
// this.visualizerContainer = document.querySelector(".visualizer");
// this.hasVisualizer = false;
// // Function to initialize the canvas (canvas)
//   initCanvas(container) {
//     const canvas = document.createElement("canvas");
//     canvas.setAttribute("id", "visualizerCanvas");
//     canvas.setAttribute("class", "visualizer-item");
//     container.appendChild(canvas);
//     canvas.width = container.clientWidth;
//     canvas.height = container.clientHeight;
//     return canvas;
//   }

//   // Feature to change canvas based on container size
//   resizeCanvas(canvas, container) {
//     canvas.width = container.clientWidth;
//     canvas.height = container.clientHeight;
//   }

//   // Visualizer
//   visualizer = (audio, container) => {
//     if (!audio || !container) {
//       return;
//     }
//     const options = {
//       fftSize: container.dataset.fftSize || 2048,
//       numBars: container.dataset.bars || 40,
//       maxHeight: container.dataset.maxHeight || 255,
//     };
//     const ctx = new AudioContext();
//     const audioSource = ctx.createMediaElementSource(audio);
//     const analyzer = ctx.createAnalyser();
//     audioSource.connect(analyzer);
//     audioSource.connect(ctx.destination);
//     const frequencyData = new Uint8Array(analyzer.frequencyBinCount);
//     const canvas = this.initCanvas(container);
//     const canvasCtx = canvas.getContext("2d");

//     // Create bars
//    const renderBars = () => {
//       this.resizeCanvas(canvas, container);
//       analyzer.getByteFrequencyData(frequencyData);
//       if (options.fftSize) {
//         analyzer.fftSize = options.fftSize;
//       }
//       canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
//       for (let i = 0; i < options.numBars; i++) {
//         const index = Math.floor((i + 10) * (i < options.numBars / 2 ? 2 : 1));
//         const fd = frequencyData[index];
//         const barHeight = Math.max(4, fd || 0) + options.maxHeight / 255;
//         const barWidth = canvas.width / options.numBars;
//         const x = i * barWidth;
//         const y = canvas.height - barHeight;
//         canvasCtx.fillStyle = "white";
//         canvasCtx.fillRect(x, y, barWidth - 2, barHeight);
//       }
//       requestAnimationFrame(renderBars);
//     };
//     renderBars();

//     // Window space change listener
//     window.addEventListener("resize", () => {
//       this.resizeCanvas(canvas, container);
//     });
//   };

// initVisualizer1() {
    //     if (!this.hasVisualizer) {
    //         this.visualizer(this.audio_object, this.visualizerContainer);
    //         this.hasVisualizer = true;
    //       }
    // }
</script>
