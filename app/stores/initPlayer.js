import { defineStore } from 'pinia';
import IcePlayer from '../composables/IcePlayer.js';
import { currentStreamStore } from './currentStream';

export const initPlayerStore = defineStore('player', {
  state: () => ({
    player: null,
    isPlaying: false,
    isPlayingStream: false, 
    isPlayingRock: false,
    isPlayingComa: false,
  }),
  actions: {
    initPlayer() {
      if (!this.player) {
        this.player = new IcePlayer('#ice-player');
        // this.player.hide_stop_and_mute_button();

        //  this.player.audio_object.addEventListener('play', () => {
        //    this.isPlaying = true;
        //  });
        //  this.player.audio_object.addEventListener('stop', () => {
        //    this.isPlaying = false;
        //  });
      }
    },
    togglePlayAll() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
        this.isPlayingStream = false;
        this.isPlayingRock = false;
        this.isPlayingComa = false;
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
        }
        
      } else if (name !== this.player.stream_mount) {
        
          this.player.stop();
          this.player.change_stream(name);
          const useCurrentStreamStore = currentStreamStore(); // Get the store instance
          useCurrentStreamStore.setStream(name); // Update the store
          this.isPlayingStream = false;
          this.isPlayingRock = false;
          this.isPlayingComa = false;
          this.isPlaying = false;
          if (this.player.current_state === this.player.PLAYING) {
            this.player.stop();
            this.isPlaying = false;
            this.isPlayingStream = false;
            this.isPlayingRock = false;
            this.isPlayingComa = false;
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
          }
      } 
     
    },
    playPlayer() {
      if (this.player.current_state !== this.player.PLAYING) {
        this.player.play();
        this.isPlaying = true;

      }
    },
    playStatus() {
      if (this.player.stream_mount === 'stream') {
        this.isPlayingStream = true;
      }  
      if (this.player.stream_mount === 'rock') {
        this.isPlayingRock = true;
      } 
      if (this.player.stream_mount === 'coma') {
        this.isPlayingComa = true;
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
    },
    pausePlayer1() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.pause();
      } 
      this.isPlaying = false;

      this.isPlayingStream = false;
      this.isPlayingRock = false;
      this.isPlayingComa = false;
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
    } 
    this.player.change_stream(name);
    const useCurrentStreamStore = currentStreamStore(); // Get the store instance
    useCurrentStreamStore.setStream(name); // Update the store
    },
    playState() {
      if (this.player.current_state === this.player.PLAYING) {
        return true;
    } else {
      return false;
    }
  }
  }
});