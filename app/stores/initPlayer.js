import { defineStore } from 'pinia';
import IcePlayer from '../composables/IcePlayer.js';
import { currentStreamStore } from './currentStream';
import { useVisualizerData } from './VisualizerStore.js';

export const initPlayerStore = defineStore('player', {
  state: () => ({
    player: null,
    playerVisible: true,
    isUsingHLS: true,
    isPlaying: false,
    isPlayingStream: false,
    isPlayingRock: false,
    isPlayingComa: false,
    isPlayingCore: false,
    isPlayingTerra: false,
    isPlayingChill: false,
    isPlayingCDP: false,
    ctx: null,
    audioSource: null,
    analyzer: null,
    frequencyData: null,
    eqFilters: [], // Array to hold BiquadFilterNodes
    eqBands: Array(10).fill(0),
  }),
  actions: {
    initPlayer() {
      if (!this.player) {
        this.player = new IcePlayer('#ice-player', this.isUsingHLS);
        this.player.audio_object.crossOrigin = "anonymous";
        this.ctx = new AudioContext();
        this.unlockAudioContext(this.ctx);
        this.audioSource = this.ctx.createMediaElementSource(this.player.audio_object);
        this.analyzer = this.ctx.createAnalyser();
        // this.analyzer.minDecibels = -90;
        // this.analyzer.maxDecibels = -16;
        this.analyzer.smoothingTimeConstant = 0.85;
        // this.audioSource.connect(this.analyzer);
        // this.audioSource.connect(this.ctx.destination);
        //this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
        const visualizerData = useVisualizerData();
        visualizerData.initStore();
        this.eqFilters = this.createEQFilters(this.ctx);
        this.connectEQFilters();
        this.getEQBandsFromStorage();
        // this.player.hide_stop_and_mute_button();

        //  this.player.audio_object.addEventListener('play', () => {
        //    this.isPlaying = true;
        //  });
        //  this.player.audio_object.addEventListener('stop', () => {
        //    this.isPlaying = false;
        //  });
      }
    },
    togglePlayerVisibility() {
      this.playerVisible = !this.playerVisible;
      if (import.meta.client) {
      localStorage.setItem('playerVisible', JSON.stringify(this.playerVisible));
      }
    },
    toggleHLS() {
      this.player.isHLS = !this.player.isHLS;
      if (this.player.isHLS) {
      this.isUsingHLS = true;
        if (import.meta.client) {
          localStorage.setItem("hls", JSON.stringify(this.isUsingHLS));
        }
      } else {
        this.isUsingHLS = false;
          if (import.meta.client) {
            localStorage.setItem("hls", JSON.stringify(this.isUsingHLS));
          }
      }
      this.player.stop();
      if (this.isPlaying) {
        this.player.play();
      }
    },
    loadLocalStorageHLS(key, callback) {
      if (import.meta.client) {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          this.isUsingHLS = JSON.parse(storedData);
        }
      }
      callback();
    },
    unlockAudioContext(audioCtx) {
      return new Promise(function (resolve, reject) {
      if ((audioCtx.state === 'suspended' && 'ontouchstart' in window) || (audioCtx.state === 'suspended')) {
        var events = ['click', 'touchstart', 'touchend', 'mousedown', 'keydown'];
        var unlock = function unlock() {
          console.log('audioContext state: ' + audioCtx.state);
          if (audioCtx.resume)
            audioCtx.resume().then(() => {
              console.log('audioContext resume state: ' + audioCtx.state);
              if (audioCtx.state !== 'suspended') {
                events.forEach(function (event) {
                  document.body.removeEventListener(event, unlock);
                });
              }
              resolve(true);
            });
        };
        events.forEach(function (event) {
          document.body.addEventListener(event, unlock, false);
        });
      
     } else {
        resolve(false);
     }
     });
    },
    createEQFilters(ctx) {
      const bands = [60, 170, 350, 1000, 3000, 6000, 12000, 14000, 16000, 18000]; // Corrected center frequencies
      const filters = [];

      for (let i = 0; i < 10; i++) {
        const filter = ctx.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.value = bands[i];
        filter.Q.value = 1;
        filter.gain.value = 0;
        filters.push(filter);
      }
      return filters;
    },
    connectEQFilters() {
      if (!this.player || !this.eqFilters) return;
      this.audioSource.disconnect(); // Disconnect previous connection
      this.audioSource.connect(this.eqFilters[0]); // Connect to the first filter
      for (let i = 0; i < this.eqFilters.length - 1; i++) {
        this.eqFilters[i].connect(this.eqFilters[i + 1]);
      }
      this.eqFilters[this.eqFilters.length - 1].connect(this.analyzer); // Last filter to analyzer
      this.analyzer.connect(this.ctx.destination);
    },

    setEQGain(bandIndex, gain) {
      if (bandIndex >= 0 && bandIndex < 10) {
        const numericGain = parseFloat(gain);
        if (!isNaN(numericGain) && isFinite(numericGain)) {
          this.eqBands[bandIndex] = numericGain;
          this.eqFilters[bandIndex].gain.value = numericGain;
        } else {
          console.error(`Invalid gain value for band ${bandIndex}: ${gain}`);
        }
      }
    },
    setEQBands(newBands) {
      this.eqBands = newBands.map(Number); //Convert to Number for consistency
      this.eqFilters.forEach((filter, index) => {
        filter.gain.value = this.eqBands[index];
      });
    },
    saveEQBandsToStorage(values) {
      if (import.meta.client) {
      localStorage.setItem('eqBands', JSON.stringify(values.map(String)));
      }
    },
    getEQBandsFromStorage() {
      if (import.meta.client) {
      const storedValues = localStorage.getItem('eqBands');
      this.eqBands = storedValues ? JSON.parse(storedValues).map(Number) : Array(10).fill(0);
      this.setEQBands(this.eqBands);
      }
    },
    togglePlayAll() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
        this.isPlayingStream = false;
        this.isPlayingRock = false;
        this.isPlayingComa = false;
        this.isPlayingTerra = false;
        this.isPlayingCore = false,
        this.isPlayingChill = false;
        this.isPlayingCDP = false;
        this.isPlaying = false;
      } else {
        this.player.play();
        this.isPlaying = true;
        if (this.player.stream_mount === 'stream') {
          this.isPlayingStream = true;
        }
        if (this.player.stream_mount === 'rock') {
          this.isPlayingRock = true;
        }
        if (this.player.stream_mount === 'coma') {
          this.isPlayingComa = true;
        }
        if (this.player.stream_mount === 'terra') {
          this.isPlayingTerra = true;
        }
        if (this.player.stream_mount === 'core') {
          this.isPlayingCore = true;
        }
        if (this.player.stream_mount === 'chill') {
          this.isPlayingChill = true;
        }
        if (this.player.stream_mount === 'cdp') {
          this.isPlayingCDP = true;
        }
      }
    },
    togglePlay(name) {
      if (name === this.player.stream_mount) {

        if (this.player.current_state === this.player.PLAYING) {
          this.player.stop();
          this.isPlaying = false;
          this.isPlayingStream = false;
          this.isPlayingRock = false;
          this.isPlayingComa = false;
          this.isPlayingTerra = false;
          this.isPlayingCore = false;
          this.isPlayingChill = false;
          this.isPlayingCDP = false;
        } else {

          this.player.play();
          this.isPlaying = true;

          if (this.player.stream_mount === 'stream') {
            this.isPlayingStream = true;
          }
          if (this.player.stream_mount === 'rock') {
            this.isPlayingRock = true;
          }
          if (this.player.stream_mount === 'coma') {
            this.isPlayingComa = true;
          }
          if (this.player.stream_mount === 'core') {
            this.isPlayingCore = true;
          }
          if (this.player.stream_mount === 'terra') {
            this.isPlayingTerra = true;
          }
          if (this.player.stream_mount === 'chill') {
            this.isPlayingChill = true;
          }
          if (this.player.stream_mount === 'cdp') {
            this.isPlayingCDP = true;
          }
        }

      } else if (name !== this.player.stream_mount) {

          this.player.stop();
          this.player.change_stream(name);
          const useCurrentStreamStore = currentStreamStore(); // Get the store instance
          useCurrentStreamStore.setStream(name); // Update the store
          this.isPlayingStream = false;
          this.isPlayingRock = false;
          this.isPlayingComa = false;
          this.isPlayingTerra = false;
          this.isPlayingCore = false;
          this.isPlayingChill = false;
          this.isPlayingCDP = false;
          this.isPlaying = false;
          if (this.player.current_state === this.player.PLAYING) {
            this.player.stop();
            this.isPlaying = false;
            this.isPlayingStream = false;
            this.isPlayingRock = false;
            this.isPlayingComa = false;
            this.isPlayingTerra = false;
            this.isPlayingCore = false;
            this.isPlayingChill = false;
            this.isPlayingCDP = false;
          } else {
            this.player.play();
            this.isPlaying = true;

            if (this.player.stream_mount === 'stream') {
              this.isPlayingStream = true;
            }
            if (this.player.stream_mount === 'rock') {
              this.isPlayingRock = true;
            }
            if (this.player.stream_mount === 'coma') {
              this.isPlayingComa = true;
            }
            if (this.player.stream_mount === 'core') {
              this.isPlayingCore = true;
            }
            if (this.player.stream_mount === 'terra') {
              this.isPlayingTerra = true;
            }
            if (this.player.stream_mount === 'chill') {
              this.isPlayingChill = true;
            }
            if (this.player.stream_mount === 'cdp') {
              this.isPlayingCDP = true;
            }
          }
      }

    },
    toggleInstantPlay(name) {
      if (name === this.player.stream_mount) {

        if (this.player.current_state === this.player.PLAYING) {

          this.isPlaying = true;

        } else {

          this.player.play();
          this.isPlaying = true;

          if (this.player.stream_mount === 'stream') {
            this.isPlayingStream = true;
          }
          if (this.player.stream_mount === 'rock') {
            this.isPlayingRock = true;
          }
          if (this.player.stream_mount === 'coma') {
            this.isPlayingComa = true;
          }
          if (this.player.stream_mount === 'core') {
            this.isPlayingCore = true;
          }
          if (this.player.stream_mount === 'terra') {
            this.isPlayingTerra = true;
          }
          if (this.player.stream_mount === 'chill') {
            this.isPlayingChill = true;
          }
          if (this.player.stream_mount === 'cdp') {
            this.isPlayingCDP = true;
          }
        }

      } else if (name !== this.player.stream_mount) {

          this.player.stop();
          this.player.change_stream(name);
          const useCurrentStreamStore = currentStreamStore(); // Get the store instance
          useCurrentStreamStore.setStream(name); // Update the store
          this.isPlayingStream = false;
          this.isPlayingRock = false;
          this.isPlayingComa = false;
          this.isPlayingTerra = false;
          this.isPlayingCore = false;
          this.isPlayingChill = false;
          this.isPlayingCDP = false;
          this.isPlaying = false;
          if (this.player.current_state === this.player.PLAYING) {

            this.isPlaying = true;

          } else {
            this.player.play();
            this.isPlaying = true;

            if (this.player.stream_mount === 'stream') {
              this.isPlayingStream = true;
            }
            if (this.player.stream_mount === 'rock') {
              this.isPlayingRock = true;
            }
            if (this.player.stream_mount === 'coma') {
              this.isPlayingComa = true;
            }
            if (this.player.stream_mount === 'core') {
              this.isPlayingCore = true;
            }
            if (this.player.stream_mount === 'terra') {
              this.isPlayingTerra = true;
            }
            if (this.player.stream_mount === 'chill') {
              this.isPlayingChill = true;
            }
            if (this.player.stream_mount === 'cdp') {
              this.isPlayingCDP = true;
            }
          }
      }

    },
    stopPlayer() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
      }
      this.isPlaying = false;
      this.isPlayingStream = false;
      this.isPlayingRock = false;
      this.isPlayingComa = false;
      this.isPlayingTerra = false;
      this.isPlayingCore = false;
      this.isPlayingChill = false;
      this.isPlayingCDP = false;
    },
    changeVol3() {
    this.player.change_volume3();
    },
    showVol3() {
      this.player.vol_btn_main_3();
    },
    muteVol() {
    this.player.mute();
    },
    setStream(name) {
      this.isPlayingRock = false;
      this.isPlayingComa = false;
      this.isPlayingStream = false;
      this.isPlayingTerra = false;
      this.isPlayingCore = false;
      this.isPlayingChill = false;
      this.isPlayingCDP = false;
    if (this.player.current_state === this.player.PLAYING) {
        if (name === 'stream') {
          this.isPlayingStream = true;
        }
        if (name === 'rock') {
          this.isPlayingRock = true;
        }
        if (name === 'coma') {
          this.isPlayingComa = true;
        }
        if (name === 'core') {
          this.isPlayingCore = true;
        }
        if (name === 'terra') {
          this.isPlayingTerra = true;
        }   
        if (name === 'chill') {
          this.isPlayingChill = true;
        }
        if (name === 'cdp') {
          this.isPlayingCDP = true;
        }
    }
    this.player.change_stream(name);
    const useCurrentStreamStore = currentStreamStore(); // Get the store instance
    useCurrentStreamStore.setStream(name); // Update the store
    },
  },

});