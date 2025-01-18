import { defineStore } from 'pinia';
import { initPlayerStore } from './initPlayer';

export const useVisualizerData = defineStore({
    id: 'VisualizerData',
  state: () => ({
  }),
  actions: {
    initVisualizer() {
        const useInitPlayerStore = initPlayerStore(); 
        const visualizerContainer = document.querySelector(".visualizer");
        // Functions
             // Function to initialize the canvas (canvas)
          function   initCanvas(container) {
           const canvas = document.createElement("canvas");
           canvas.setAttribute("id", "visualizerCanvas");
           canvas.setAttribute("class", "visualizer-item");
           container.appendChild(canvas);
           canvas.width = container.clientWidth;
           canvas.height = "255";
           return canvas;
         }
       
         // Feature to change canvas based on container size
         function resizeCanvas(canvas, container) {
           canvas.width = container.clientWidth;
           canvas.height = container.clientHeight;
         }
       
         // Visualizer
        const visualizer = (container) => {
           if (!container) {
             return;
           }
           const options = {
             fftSize: container.dataset.fftSize || 2048,
             numBars: container.dataset.bars || 40,
             maxHeight: container.dataset.maxHeight || 255,
           };
           const canvas = initCanvas(container);
           const canvasCtx = canvas.getContext("2d");
       
           // Create bars
          const renderBars = () => {
             resizeCanvas(canvas, container);
             useInitPlayerStore.analyzer.getByteFrequencyData(useInitPlayerStore.frequencyData);
             if (options.fftSize) {
                useInitPlayerStore.analyzer.fftSize = options.fftSize;
             }
             canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
             for (let i = 0; i < options.numBars; i++) {
               const index = Math.floor((i + 10) * (i < options.numBars / 2 ? 2 : 1));
               const fd = useInitPlayerStore.frequencyData[index];
               const barHeight = Math.max(4, fd || 0) + options.maxHeight / 255;
               const barWidth = canvas.width / options.numBars;
               const x = i * barWidth;
               const y = canvas.height - barHeight;
               canvasCtx.fillStyle = "white";
               canvasCtx.fillRect(x, y, barWidth - 2, barHeight);
             }
             requestAnimationFrame(renderBars);
           };
           renderBars();
       
           // Window space change listener
           window.addEventListener("resize", () => {
             resizeCanvas(canvas, container);
           });
         };
 
         visualizer(visualizerContainer);
    },
  }
});