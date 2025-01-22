import { defineStore } from 'pinia';
import { initPlayerStore } from './initPlayer';

export const useEqualizerStore = defineStore('equalizer',{
  state: () => ({
    filters: [],
    bands: [
        { label: '60Hz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '170Hz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '400Hz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '1kHz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '2.5kHz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '6.25kHz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '16kHz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '32kHz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '64kHz', min: -20, max: 20, gain: 0, color: '#2962ff' },
        { label: '128kHz', min: -20, max: 20, gain: 0, color: '#2962ff' },
    ],
  }),
  getters: {



  },
  actions: {
    initEqualizer() {
      const usePlayerStore = initPlayerStore(); // Access the player store
      this.audioCtx = usePlayerStore.ctx;
      this.source = usePlayerStore.audioSource;
      this.analyzer = usePlayerStore.analyzer; // Access existing analyzer
      this.createFilters(this.audioCtx);
      this.connectAudio();
    },
    createFilters(audioCtx) {
      this.bands.forEach(band => {
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.value = band.frequency;
        filter.Q.value = 1;
        filter.gain.value = band.gain;
        this.filters.push(filter);
      });
    },
    connectAudio() {
      //Disconnect the source from the destination, before connecting filters
      

      this.source.connect(this.filters[0]);
      for (let i = 1; i < this.filters.length; i++) {
          this.filters[i - 1].connect(this.filters[i]);
      }
      this.filters[this.filters.length - 1].connect(this.analyzer);
      this.analyzer.connect(this.audioCtx.destination);
  },
    setGain(bandIndex, newGain) {
      if (bandIndex >= 0 && bandIndex < this.bands.length) {
          this.bands[bandIndex].gain = Math.min(Math.max(newGain, this.bands[bandIndex].min), this.bands[bandIndex].max);
          this.filters[bandIndex].gain.value = this.bands[bandIndex].gain;
      }
    },
    reset() {
      this.bands.forEach((band, index) => {
          band.gain = 0;
          this.filters[index].gain.value = 0;
      });
    },
  }

});
