import { defineStore } from 'pinia';
import IcePlayer from '../composables/IcePlayer.js';
import { currentStreamStore } from './currentStream';

export const initPlayerStore = defineStore('player', {
  state: () => ({
    player: null,
    isPlaying: false,
  }),
  actions: {
    initPlayer() {
      if (!this.player) {
        this.player = new IcePlayer('#ice-player', this.isPlaying);
        this.player.hide_stop_and_mute_button();

        this.player.audio_object.addEventListener('play', () => {
          this.isPlaying = true;
        });
        this.player.audio_object.addEventListener('stop', () => {
          this.isPlaying = false;
        });
      }
    },
    togglePlay() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
      } else {
        this.player.play();
      }
    },
    playPlayer1() {
      if (this.player.current_state !== this.player.PLAYING) {
        this.player.play();
      }
    },
    stopPlayer1() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
      } 
    },
    changeVol3() { 
    this.player.change_volume3();
    },
    showVol3() {
      this.player.vol_btn_main_3();
    },
    muteVol3() {
    this.player.mute();
    },
    setStream1() {
    this.player.change_stream_omfm();
    const useCurrentStreamStore = currentStreamStore(); // Get the store instance
    useCurrentStreamStore.setStream1(); // Update the store
    },
    setStream2() {
    this.player.change_stream_rock();
    const useCurrentStreamStore = currentStreamStore(); // Get the store instance
    useCurrentStreamStore.setStream2(); // Update the store
    },
    setStream3() {
    this.player.change_stream_coma();
    const useCurrentStreamStore = currentStreamStore(); // Get the store instance
    useCurrentStreamStore.setStream3(); // Update the store
    }
  }
});