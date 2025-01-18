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
    isPlayingCore: false,
    isPlayingTerra: false,
    ctx: null,
    audioSource: null,
    analyzer: null,
    frequencyData: null,
  }),
  actions: {
    initPlayer() {
      if (!this.player) {
        this.player = new IcePlayer('#ice-player');
        this.player.audio_object.crossOrigin = "anonymous";
        this.ctx = new AudioContext();
        this.audioSource = this.ctx.createMediaElementSource(this.player.audio_object);
        this.analyzer = this.ctx.createAnalyser();
        this.audioSource.connect(this.analyzer);
        this.audioSource.connect(this.ctx.destination);
        this.frequencyData = new Uint8Array(this.analyzer.frequencyBinCount);
        // this.player.hide_stop_and_mute_button();

        //  this.player.audio_object.addEventListener('play', () => {
        //    this.isPlaying = true;
        //  });
        //  this.player.audio_object.addEventListener('stop', () => {
        //    this.isPlaying = false;
        //  });
      }
    },
    // initVisualizer1() {
    //   this.player.initVisualizer1();
    // },
    togglePlayAll() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.stop();
        this.isPlayingStream = false;
        this.isPlayingRock = false;
        this.isPlayingComa = false;
        this.isPlayingTerra = false;
        this.isPlayingCore = false,
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
          this.isPlaying = false;
          if (this.player.current_state === this.player.PLAYING) {
            this.player.stop();
            this.isPlaying = false;
            this.isPlayingStream = false;
            this.isPlayingRock = false;
            this.isPlayingComa = false;
            this.isPlayingTerra = false;
            this.isPlayingCore = false;
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
      if (this.player.stream_mount === 'core') {
        this.isPlayingCore = true;
      }
      if (this.player.stream_mount === 'terra') {
        this.isPlayingTerra = true;
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
    },
    pausePlayer1() {
      if (this.player.current_state === this.player.PLAYING) {
        this.player.pause();
      } 
      this.isPlaying = false;
      this.isPlayingStream = false;
      this.isPlayingRock = false;
      this.isPlayingComa = false;
      this.isPlayingTerra = false;
      this.isPlayingCore = false;
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