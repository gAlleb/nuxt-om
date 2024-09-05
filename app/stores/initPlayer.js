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
        this.player.hide_stop_and_mute_button();

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
      } else {
        this.player.play();
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
         
          this.isPlayingStream = false;
          this.isPlayingRock = false;
          this.isPlayingComa = false;
        } else {
         
          this.player.play();

          
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
        
        if (name === 'stream') {
          this.player.stop();
          this.player.change_stream_omfm();
          const useCurrentStreamStore = currentStreamStore(); // Get the store instance
          useCurrentStreamStore.setStream1(); // Update the store
          this.isPlayingStream = false;
          this.isPlayingRock = false;
          this.isPlayingComa = false;
          if (this.player.current_state === this.player.PLAYING) {
            this.player.stop();
           
            this.isPlayingStream = false;
            this.isPlayingRock = false;
            this.isPlayingComa = false;
          } else {
            this.player.play();
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
  
        } else if  (name === 'rock') {
          this.player.stop();
          this.player.change_stream_rock();
          const useCurrentStreamStore = currentStreamStore(); // Get the store instance
          useCurrentStreamStore.setStream2(); // Update the store
          this.isPlayingStream = false;
          this.isPlayingRock = false;
          this.isPlayingComa = false;
          if (this.player.current_state === this.player.PLAYING) {
            this.player.stop();
           
            this.isPlayingStream = false;
            this.isPlayingRock = false;
            this.isPlayingComa = false;
          } else {
            this.player.play();
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
  
        } else if  (name === 'coma') {
          this.player.stop();
          this.player.change_stream_coma();
          const useCurrentStreamStore = currentStreamStore(); // Get the store instance
          useCurrentStreamStore.setStream3(); // Update the store
          this.isPlayingStream = false;
          this.isPlayingRock = false;
          this.isPlayingComa = false;
          if (this.player.current_state === this.player.PLAYING) {
            this.player.stop();
           
            this.isPlayingStream = false;
            this.isPlayingRock = false;
            this.isPlayingComa = false;
          } else {
            this.player.play();
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
        
      } 
     
    },
    playPlayer1() {
      if (this.player.current_state !== this.player.PLAYING) {
        this.player.play();
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
    stopPlayer1() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
      } 
      this.isPlayingStream = false;
      this.isPlayingRock = false;
      this.isPlayingComa = false;
    },
    pausePlayer1() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.pause();
      } 
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
    muteVol3() {
    this.player.mute();
    },
    setStream1() {
    if (this.player.current_state === this.player.PLAYING) {
        this.isPlayingStream = true;
    } 
    this.player.change_stream_omfm();
    const useCurrentStreamStore = currentStreamStore(); // Get the store instance
    useCurrentStreamStore.setStream1(); // Update the store
    this.isPlayingRock = false;
    this.isPlayingComa = false;
    },
    setStream2() {
    if (this.player.current_state === this.player.PLAYING) {
        this.isPlayingRock = true;
      }
    this.player.change_stream_rock();
    const useCurrentStreamStore = currentStreamStore(); // Get the store instance
    useCurrentStreamStore.setStream2(); // Update the store
    this.isPlayingStream = false;
    this.isPlayingComa = false;
    },
    setStream3() {
    if (this.player.current_state === this.player.PLAYING) {
        this.isPlayingComa = true;
      }
    this.player.change_stream_coma();
    const useCurrentStreamStore = currentStreamStore(); // Get the store instance
    useCurrentStreamStore.setStream3(); // Update the store
    this.isPlayingStream = false;
    this.isPlayingRock = false;
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