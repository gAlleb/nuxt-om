import { defineStore } from 'pinia';
import { createAudioEngine } from '../composables/audioEngine.js';
import { currentStreamStore } from './currentStream';
import { isStationId } from '~/config/stations';
import { SETTINGS_KEYS, readSetting, writeSetting, applyPlayerVisibility } from '~/utils/settings';

export const initPlayerStore = defineStore('player', {
  state: () => ({
    /** Движок воспроизведения. Создаётся один раз в initPlayer(). */
    engine: null,
    playerVisible: true,
    isUsingHLS: true,
    isPlaying: false,
    /** Id станции, которая играет прямо сейчас, или null. */
    activeId: null,
    /** Громкость 0..1. Реактивная — слайдеры рисуются от неё, а не наоборот. */
    volume: 1,
    muted: false,
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
    /** Играет ли конкретная станция. */
    isPlayingId: (s) => (id) => s.isPlaying && s.activeId === id,
    /** Что показывать на слайдерах: при mute — ноль, само значение при этом не теряется. */
    displayVolume: (s) => (s.muted ? 0 : Math.round(s.volume * 100)),
  },
  actions: {
    /** Станция, выбранная сейчас (не обязательно играющая). */
    selectedId() {
      return currentStreamStore().currentStream;
    },
    /** Единственное место, где отмечается «сейчас играет вот это». */
    markPlaying() {
      this.isPlaying = true;
      this.activeId = this.selectedId();
    },
    /** Единственное место, где отмечается «ничего не играет». */
    markStopped() {
      this.isPlaying = false;
      this.activeId = null;
    },
    /** Начать воспроизведение выбранной станции. */
    startPlayback() {
      this.engine.play(this.selectedId(), this.isUsingHLS);
      this.markPlaying();
    },
    initPlayer() {
      if (this.engine) return;

      this.engine = createAudioEngine();
      this.loadVolumeFromStorage();

      this.ctx = new AudioContext();
      this.unlockAudioContext(this.ctx);
      this.audioSource = this.ctx.createMediaElementSource(this.engine.audio);
      this.analyzer = this.ctx.createAnalyser();
      this.analyzer.smoothingTimeConstant = 0.85;

      this.eqFilters = this.createEQFilters(this.ctx);
      this.connectEQFilters();
      this.getEQBandsFromStorage();
    },

    // --- громкость ---

    /** Выставить громкость (0..1). Снимает mute, если он был. */
    setVolume(value) {
      const v = Math.min(1, Math.max(0, Number(value)));
      this.volume = v;
      if (this.muted) {
        this.muted = false;
        this.engine?.setMuted(false);
      }
      this.engine?.setVolume(v);
      writeSetting(SETTINGS_KEYS.volume, v);
    },

    toggleMute() {
      this.muted = !this.muted;
      this.engine?.setMuted(this.muted);
    },

    loadVolumeFromStorage() {
      const stored = readSetting(SETTINGS_KEYS.volume);
      if (stored !== null) this.volume = parseFloat(stored);
      this.engine?.setVolume(this.volume);
      this.engine?.setMuted(this.muted);
    },

    togglePlayerVisibility() {
      this.playerVisible = !this.playerVisible;
      writeSetting(SETTINGS_KEYS.playerVisible, this.playerVisible);
      applyPlayerVisibility(this.playerVisible);
    },
    toggleHLS() {
      this.isUsingHLS = !this.isUsingHLS;
      writeSetting(SETTINGS_KEYS.hls, this.isUsingHLS);
      this.engine.stop();
      if (this.isPlaying) {
        this.engine.play(this.selectedId(), this.isUsingHLS);
      }
    },
    loadLocalStorageHLS(key, callback) {
      const stored = readSetting(SETTINGS_KEYS.hls);
      if (stored !== null) this.isUsingHLS = stored === 'true';
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
      if (!this.engine || !this.eqFilters) return;
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
      writeSetting(SETTINGS_KEYS.eqBands, JSON.stringify(values.map(String)));
    },
    getEQBandsFromStorage() {
      const stored = readSetting(SETTINGS_KEYS.eqBands);
      this.eqBands = stored ? JSON.parse(stored).map(Number) : Array(10).fill(0);
      this.setEQBands(this.eqBands);
    },
    /** Play/stop текущей станции. Кнопка в плеере и в шапке. */
    togglePlayAll() {
      if (this.isPlaying) {
        this.engine.stop();
        this.markStopped();
      } else {
        this.startPlayback();
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
      if (name === this.selectedId()) {
        if (this.isPlaying) {
          this.engine.stop();
          this.markStopped();
        } else {
          this.startPlayback();
        }
        return;
      }
      this.switchStream(name);
      this.startPlayback();
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
      if (name === this.selectedId()) {
        if (!this.isPlaying) this.startPlayback();
        else this.markPlaying();
        return;
      }
      this.switchStream(name);
      this.startPlayback();
    },
    /** Переключить выбранную станцию, остановив текущее воспроизведение. */
    switchStream(name) {
      this.engine.stop();
      currentStreamStore().setStream(name);
    },
    stopPlayer() {
      this.engine.stop();
      this.markStopped();
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
      const wasPlaying = this.isPlaying;
      this.switchStream(name);
      if (wasPlaying) this.startPlayback();
      else this.markStopped();
    },
  },
});
