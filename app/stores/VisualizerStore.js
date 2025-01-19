import { defineStore } from 'pinia';
import { initPlayerStore } from './initPlayer';

export const useVisualizerData = defineStore({
    id: 'VisualizerData',
  state: () => ({
    animationFrameId: null,
    animationFrameIdWave: null, 
    overrideColorScheme: null,
    customDarkScheme: null,
  //   colorScheme: { 
  //     color1: '#b017a8',
  //     color2: 'cyan',
  //     color3: 'green',
  // },
  }),
  getters: {
    colorScheme: (state) => {
      const colorMode = useColorMode()
      const isDark = (colorMode.value === 'dark')
     if (state.customDarkScheme && isDark) {
        return state.customDarkScheme;
       } else if (state.overrideColorScheme){
        return state.overrideColorScheme;
      } else if (isDark) {
        return {
          color1: '#b017a8',
          color2: 'cyan',
          color3: 'green',
        };
      } else {
        return {
          color1: '#ff0000',
          color2: '#ffff00',
          color3: '#00ff00',
        };
      }
    }
  },
  actions: {
    initVisualizer(container, overrideColorScheme = null, customDarkScheme = null) {
        this.overrideColorScheme = overrideColorScheme; 
        this.customDarkScheme = customDarkScheme;
        const useInitPlayerStore = initPlayerStore(); 
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
          let frameCounter = 0;
          const framesToSkip = 1;
          const renderBars = () => {
             if (this.animationFrameId) {
               cancelAnimationFrame(this.animationFrameId);
             }
             this.animationFrameId = requestAnimationFrame(renderBars);
             frameCounter++;
             if (frameCounter >= framesToSkip) {
             frameCounter = 0; // Reset the counter
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
               const gradient = canvasCtx.createLinearGradient(0, 200, 0, 0);
               gradient.addColorStop(0, this.colorScheme.color1);
               gradient.addColorStop(0.5, this.colorScheme.color2);
               gradient.addColorStop(1, this.colorScheme.color3);
               canvasCtx.fillStyle = gradient;
              //  canvasCtx.fillStyle = "white";
               canvasCtx.fillRect(x, y, barWidth - 2, barHeight);
             }
            }
           };
    
           renderBars();
       
           // Window space change listener
           window.addEventListener("resize", () => {
             resizeCanvas(canvas, container);
           });
         };
 
         visualizer(container)
    },
    initVisualizerWave(container, overrideColorScheme = null, customDarkScheme = null) {
      this.overrideColorScheme = overrideColorScheme; 
      this.customDarkScheme = customDarkScheme;
      const useInitPlayerStore = initPlayerStore(); 
      // Functions
           // Function to initialize the canvas (canvas)
        function   initCanvas(container) {
         const canvas = document.createElement("canvas");
         canvas.setAttribute("id", "visualizerCanvasWave");
         canvas.setAttribute("class", "visualizer-item-wave");
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
          waveformColor: container.dataset.waveformColor || "white", // Add color customization
          waveformThickness: container.dataset.waveformThickness || 2, // Customize thickness
         };
         const canvas = initCanvas(container);
         const canvasCtx = canvas.getContext("2d");

         // Create bars
        let frameCounter = 0;
        const framesToSkip = 1;
      const renderWaveform = () => {
      if (this.animationFrameIdWave) {
          cancelAnimationFrame(this.animationFrameIdWave);
      }
      this.animationFrameIdWave = requestAnimationFrame(renderWaveform);
      frameCounter++;
      if (frameCounter >= framesToSkip) {
          frameCounter = 0;
          resizeCanvas(canvas, container);

          useInitPlayerStore.analyzer.getByteFrequencyData(useInitPlayerStore.frequencyData);
          if (options.fftSize) {
              useInitPlayerStore.analyzer.fftSize = options.fftSize;
          }

          canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
          canvasCtx.lineWidth = options.waveformThickness;
          canvasCtx.strokeStyle = options.waveformColor;
          canvasCtx.beginPath();

          const waveformData = useInitPlayerStore.frequencyData; // Create array
          useInitPlayerStore.analyzer.getByteTimeDomainData(waveformData); // Get time domain data
          const sliceWidth = canvas.width / waveformData.length;

          let x = 0;
          for (let i = 0; i < waveformData.length; i++) {
              const v = waveformData[i] / 255.0; // Normalize to 0-1 range
              const y = canvas.height / 2 + v * canvas.height / 2; // Center the waveform
              if (i === 0) {
                  canvasCtx.moveTo(x, y);
              } else {
                  canvasCtx.lineTo(x, y);
              }
              x += sliceWidth;
          }
          canvasCtx.stroke();
                  }
  };
  
        renderWaveform();
     
         // Window space change listener
         window.addEventListener("resize", () => {
           resizeCanvas(canvas, container);
         });
       };

       visualizer(container)
  },
  }
});