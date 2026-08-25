import { defineStore } from 'pinia';
import IcePlayer from '../composables/IcePlayer.js';
import { currentStreamStore } from './currentStream';
import { useVisualizerData } from './VisualizerStore.js';
import { isStationId } from '~/config/stations';

export const initPlayerStore = defineStore('player', {
  state: () => ({
    player: null,
    playerVisible: true,
    isUsingHLS: true,
    isPlaying: false,
    /**
     * Id станции, которая играет прямо сейчас, или null.
     * Заменил семь булевых isPlayingX — они остались геттерами ниже,
     * чтобы шаблоны продолжали работать без правок.
     */
    activeId: null,
    ctx: null,
    audioSource: null,
    analyzer: null,
    frequencyData: null,
    eqFilters: [], // Array to hold BiquadFilterNodes
    eqBands: Array(10).fill(0),
  }),
  getters: {
    isPlayingStream: (s) => s.isPlaying && s.activeId === 'stream',
    isPlayingRock:   (s) => s.isPlaying && s.activeId === 'rock',
    isPlayingComa:   (s) => s.isPlaying && s.activeId === 'coma',
    isPlayingCore:   (s) => s.isPlaying && s.activeId === 'core',
    isPlayingTerra:  (s) => s.isPlaying && s.activeId === 'terra',
    isPlayingChill:  (s) => s.isPlaying && s.activeId === 'chill',
    isPlayingCDP:    (s) => s.isPlaying && s.activeId === 'cdp',
    /** Играет ли конкретная станция — то, чем со временем заменятся геттеры выше. */
    isPlayingId: (s) => (id) => s.isPlaying && s.activeId === id,
  },
  actions: {
    /** Единственное место, где отмечается «сейчас играет вот это». */
    markPlaying() {
      this.isPlaying = true;
      this.activeId = this.player.stream_mount;
    },
    /** Единственное место, где отмечается «ничего не играет». */
    markStopped() {
      this.isPlaying = false;
      this.activeId = null;
    },
    /** Переключить поток и синхронизировать currentStreamStore. */
    switchStream(name) {
      this.player.stop();
      this.player.change_stream(name);
      currentStreamStore().setStream(name);
    },
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
    /** Play/stop текущей станции. Кнопка в плеере и в шапке. */
    togglePlayAll() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
        this.markStopped();
      } else {
        this.player.play();
        this.markPlaying();
      }
    },
    /**
     * Клик по станции в списке/на карточке.
     * По той же станции — переключает play/stop, по другой — переходит на неё и играет.
     */
    togglePlay(name) {
      if (!isStationId(name)) {
        console.warn(`togglePlay: неизвестная станция "${name}"`);
        return;
      }
      if (name === this.player.stream_mount) {
        if (this.player.current_state === this.player.PLAYING) {
          this.player.stop();
          this.markStopped();
        } else {
          this.player.play();
          this.markPlaying();
        }
        return;
      }
      // player.stop() внутри switchStream гарантированно переводит в STOPPED,
      // поэтому здесь всегда играем заново.
      this.switchStream(name);
      this.player.play();
      this.markPlaying();
    },
    /**
     * То же, но по уже играющей станции НЕ останавливает — «просто включи это».
     * Используется в свипере плеера и в меню выбора стрима.
     */
    toggleInstantPlay(name) {
      if (!isStationId(name)) {
        console.warn(`toggleInstantPlay: неизвестная станция "${name}"`);
        return;
      }
      if (name === this.player.stream_mount) {
        if (this.player.current_state !== this.player.PLAYING) {
          this.player.play();
        }
        this.markPlaying();
        return;
      }
      this.switchStream(name);
      this.player.play();
      this.markPlaying();
    },
    stopPlayer() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
      }
      this.markStopped();
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
    /**
     * Сменить станцию, не трогая play/stop: если играло — продолжит играть новую.
     * Сейчас ниоткуда не вызывается, оставлено как публичное API стора.
     */
    setStream(name) {
      if (!isStationId(name)) {
        console.warn(`setStream: неизвестная станция "${name}"`);
        return;
      }
      const wasPlaying = this.player.current_state === this.player.PLAYING;
      this.player.change_stream(name);
      currentStreamStore().setStream(name);
      if (wasPlaying) {
        this.markPlaying();
      } else {
        this.markStopped();
      }
    },
  },

});