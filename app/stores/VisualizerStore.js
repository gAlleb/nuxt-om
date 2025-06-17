import { defineStore } from 'pinia';
import { initPlayerStore } from './initPlayer';
import { useEffectsStore } from '@/stores/effects';

export const useVisualizerData = defineStore('VisualizerData', {
  state: () => ({
    animationFrameId: null,
    animationFrameIdWave: null,
    animationFrameId3Waves: null,
    overrideColorScheme: null,
    customDarkScheme: null,
    overrideColorSchemeWave: null,
    customDarkSchemeWave: null,
    overrideColorScheme3Waves: null,
    customDarkScheme3Waves: null,
    customBarsNumber: null,
    customMaxHeight: null,
    analyzer: null,
    frequencyData: null,
    canvas: null,
    canvasWave: null,
    canvas3Waves: null,
  }),
  getters: {
    maxHeight: (state) => {
      if (state.customMaxHeight) {
        return state.customMaxHeight;
       } else {
        return 255;
      }
    },
    barsNumber: (state) => {
      if (state.customBarsNumber) {
        return state.customBarsNumber;
       } else {
        return 65;
      }
    },
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
          capStyle: 'white',
        };
      } else {
        return {
          color1: '#0f0',
          color2: '#ff0',
          color3: '#f00',
          capStyle: 'black',
        };
      }
    },
    colorSchemeWave: (state) => {
      const colorMode = useColorMode()
      const isDark = (colorMode.value === 'dark')
      if (state.customDarkSchemeWave && isDark) {
        return state.customDarkSchemeWave;
       } else if (state.overrideColorSchemeWave){
        return state.overrideColorSchemeWave;
      } else if (isDark) {
        return 'white'
      } else {
        return 'black'
      };
    },
    colorScheme3Waves: (state) => {
      const colorMode = useColorMode()
      const isDark = (colorMode.value === 'dark')
     if (state.customDarkScheme3Waves && isDark) {
        return state.customDarkScheme3Waves;
       } else if (state.overrideColorScheme3Waves){
        return state.overrideColorScheme3Waves;
      } else if (isDark) {
        return {
          color1: '#f5ee73',
          color2: '#69fffc',
          color3: '#f549e9',
        };
      } else {
        return {
          color1: '#111111',
          color2: '#222222',
          color3: '#333333',
        };
      }
    },
  },
  actions: {
    initStore() {
      const useInitPlayerStore = initPlayerStore();
      this.analyzer = useInitPlayerStore.analyzer;
      this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
      this.analyzer.fftSize = 2048;
    },
    initVisualizer(container, overrideColorScheme = null, customDarkScheme = null, customBarsNumber = null, customMaxHeight = null) {
        this.overrideColorScheme = overrideColorScheme;
        this.customDarkScheme = customDarkScheme;
        this.customBarsNumber = customBarsNumber;
        this.customMaxHeight = customMaxHeight;
        const effectsStore = useEffectsStore();
        // Functions
             // Function to initialize the canvas (canvas)
         function initCanvas(container) {
           const canvasmaker = document.createElement("canvas");
           canvasmaker.setAttribute("id", "visualizerCanvas");
           canvasmaker.setAttribute("class", "visualizer-item");
           container.appendChild(canvasmaker);
           canvasmaker.width = container.clientWidth;
           canvasmaker.height = "255";
           return canvasmaker;
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
             numBars: this.barsNumber || 65,
             maxHeight: this.maxHeight || 255,
           };
           this.canvas = initCanvas(container);
           const canvasCtx = this.canvas.getContext("2d");

           const capYPositionArray = []
           const capHeight = 2
           // Create bars
          // let frameCounter = 0;
          // const framesToSkip = 1;
          const renderBars = () => {
            if(this.animationFrameId){
              cancelAnimationFrame(this.animationFrameId);
            }
             this.animationFrameId = null;
             this.animationFrameId = requestAnimationFrame(renderBars);
            //  frameCounter++;
            //  if (frameCounter >= framesToSkip) {
            //  frameCounter = 0; // Reset the counter
             resizeCanvas(this.canvas, container);
             this.analyzer.getByteFrequencyData(this.frequencyData);
             canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
             for (let i = 0; i < options.numBars; i++) {
               const index = Math.floor((i + 10) * (i < options.numBars / 2 ? 2 : 1));
               const fd = this.frequencyData[index];
               const barHeight = Math.max(4, fd || 0) + options.maxHeight / 255;
               const barWidth = this.canvas.width / options.numBars;
               const x = i * barWidth;
               const y = this.canvas.height - barHeight;


               if (effectsStore.visualizerCaps) {
                  const cheight = this.canvas.height - 2
                  if (capYPositionArray.length < Math.round(options.numBars)) {
                   capYPositionArray.push(fd)
                  }
                  canvasCtx.fillStyle = this.colorScheme.capStyle
                  if (fd < capYPositionArray[i]) {
                   canvasCtx.fillRect(x, cheight - --capYPositionArray[i], barWidth - 2, capHeight)
                  } else {
                   canvasCtx.fillRect(x, cheight - fd, barWidth - 2, capHeight)
                   capYPositionArray[i] = fd
                  }
               }

               const gradient = canvasCtx.createLinearGradient(0, 200, 0, 0);
               gradient.addColorStop(0, this.colorScheme.color1);
               gradient.addColorStop(0.5, this.colorScheme.color2);
               gradient.addColorStop(1, this.colorScheme.color3);
               canvasCtx.fillStyle = gradient;
               canvasCtx.fillRect(x, y, barWidth - 2, barHeight);
            //  }
            }
           };

           renderBars();

           // Window space change listener
           window.addEventListener("resize", () => {
             resizeCanvas(this.canvas, container);
           });
         };

         visualizer(container)
    },
    initVisualizerWave(container, overrideColorSchemeWave = null, customDarkSchemeWave = null) {
      this.overrideColorSchemeWave = overrideColorSchemeWave;
      this.customDarkSchemeWave = customDarkSchemeWave;
      const useInitPlayerStore = initPlayerStore();
      // Functions
           // Function to initialize the canvas (canvas)
        function   initCanvas(container) {
         const canvasmaker = document.createElement("canvas");
         canvasmaker.setAttribute("id", "visualizerCanvasWave");
         canvasmaker.setAttribute("class", "visualizer-item-wave");
         container.appendChild(canvasmaker);
         canvasmaker.width = container.clientWidth;
         canvasmaker.height = "255";
         return canvasmaker;
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
          waveformThickness: container.dataset.waveformThickness || 2.5, // Customize thickness
         };
        this.canvasWave = initCanvas(container);
         const canvasCtx = this.canvasWave.getContext("2d");
         // Create bars
        // let frameCounter = 0;
        // const framesToSkip = 1;
      const renderWaveform = () => {
      if (this.animationFrameIdWave) {
          cancelAnimationFrame(this.animationFrameIdWave);
      }
      this.animationFrameIdWave = null;
      this.animationFrameIdWave = requestAnimationFrame(renderWaveform);
      // frameCounter++;
      // if (frameCounter >= framesToSkip) {
      //     frameCounter = 0;
          resizeCanvas(this.canvasWave, container);
          this.analyzer.getByteTimeDomainData(this.frequencyData);
          canvasCtx.clearRect(0, 0, this.canvasWave.width, this.canvasWave.height);
          canvasCtx.lineWidth = options.waveformThickness;
          canvasCtx.strokeStyle = this.colorSchemeWave;
          canvasCtx.beginPath();
          const waveformData = this.frequencyData; // Create array
          const sliceWidth = this.canvasWave.width / waveformData.length;
          let x = 0;
          for (let i = 0; i < waveformData.length; i++) {
              const v = waveformData[i] / 255.0; // Normalize to 0-1 range
              const y = this.canvasWave.height / 2 + v * this.canvasWave.height / 2; // Center the waveform
              if (i === 0) {
                  canvasCtx.moveTo(x, y);
              } else {
                  canvasCtx.lineTo(x, y);
              }
              x += sliceWidth;
          }
          canvasCtx.stroke();
                  // }
    };
        renderWaveform();
         // Window space change listener
         window.addEventListener("resize", () => {
           resizeCanvas(this.canvasWave, container);
         });
       };

       visualizer(container)
  },
  initVisualizer3Waves(container, overrideColorScheme3Waves = null, customDarkScheme3Waves = null) {
    this.overrideColorScheme3Waves = overrideColorScheme3Waves;
    this.customDarkScheme3Waves = customDarkScheme3Waves;
    const useInitPlayerStore = initPlayerStore();
    // Functions
         // Function to initialize the canvas (canvas)
      function   initCanvas(container) {
       const canvasmaker = document.createElement("canvas");
       canvasmaker.setAttribute("id", "visualizerCanvas3Waves");
       canvasmaker.setAttribute("class", "visualizer-item-3waves");
       container.appendChild(canvasmaker);
       canvasmaker.width = container.clientWidth;
       canvasmaker.height = "255";
       return canvasmaker;
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
        maxHeight: container.dataset.maxHeight || 130,
        waveformThickness: container.dataset.waveformThickness || 1.7, // Customize thickness
       };
       this.canvas3Waves = initCanvas(container);
       const canvasCtx = this.canvas3Waves.getContext("2d");

    // let frameCounter = 0;
    // const framesToSkip = 1;
    const renderWaveform = () => {
    if (this.animationFrameId3Waves) {
        cancelAnimationFrame(this.animationFrameId3Waves);
    }
    this.animationFrameId3Waves = null;
    this.animationFrameId3Waves = requestAnimationFrame(renderWaveform);
    // frameCounter++;
    // if (frameCounter >= framesToSkip) {
    //     frameCounter = 0;
        resizeCanvas(this.canvas3Waves, container);
        this.analyzer.getByteTimeDomainData(this.frequencyData);
        canvasCtx.clearRect(0, 0, this.canvas3Waves.width, this.canvas3Waves.height);
        const numBins = this.frequencyData.length;
        const lowBand = this.frequencyData.slice(0, numBins / 3);
        const midBand = this.frequencyData.slice(numBins / 3, 2 * numBins / 3);
        const highBand = this.frequencyData.slice(2 * numBins / 3);
        // Draw lines - plotting multiple points
        const lineWidth = 2;
        canvasCtx.lineWidth = lineWidth;
        drawFrequencyLine(canvasCtx, lowBand, this.colorScheme3Waves.color1, this.canvas3Waves.width, this.canvas3Waves.height);
        drawFrequencyLine(canvasCtx, midBand, this.colorScheme3Waves.color2, this.canvas3Waves.width, this.canvas3Waves.height);
        drawFrequencyLine(canvasCtx, highBand, this.colorScheme3Waves.color3, this.canvas3Waves.width, this.canvas3Waves.height);
   // };
    };

    const drawFrequencyLine = (ctx, bandData, color, canvasWidth, canvasHeight) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      const sliceWidth = canvasWidth / bandData.length;
      let x = 0;
      for (let i = 0; i < bandData.length; i++) {
          const v = bandData[i] / 255; // Normalize to 0-1
          const y = canvasHeight / 2 + v * canvasHeight / 2; // Corrected: Position below center
          if (i === 0) {
              ctx.moveTo(x, y);
          } else {
              ctx.lineTo(x, y);
          }
          x += sliceWidth;
      }
      ctx.stroke();
     };
      renderWaveform();
       window.addEventListener("resize", () => {
         resizeCanvas(this.canvas3Waves, container);
       });
     };

     visualizer(container)
   },
  }
});
