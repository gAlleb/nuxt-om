import { ref } from 'vue';
import IcePlayer from './IcePlayer.js'; 
import { usePlayerStore } from '../stores/player'; // Import the store

export const usePlayer = () => {
  const player = ref(null);
  const isPlaying = ref(false);

  const playerStore = usePlayerStore(); // Get the store instance
  
  onMounted(() => {
    // Create the IcePlayer instance
    player.value = new IcePlayer('#ice-player',  isPlaying); 
    player.value.hide_stop_and_mute_button();
    // Handle play/pause events from IcePlayer
    player.value.audio_object.addEventListener('play', () => {
      isPlaying.value = true;
    });
    player.value.audio_object.addEventListener('stop', () => {
      isPlaying.value = false;
      
    });
  });

  const togglePlay = () => {
    if (player.value.current_state === player.value.PLAYING) {
      player.value.stop();
      
    } else {
      player.value.play();
       
    }
  };
  const playPlayer1 = () => {
    if (player.value.current_state !== player.value.PLAYING) {
      player.value.play();
    }
  };
  const stopPlayer1 = () => {
    if (player.value.current_state === player.value.PLAYING) {
      player.value.stop();
    } 
  };
  const changeVol3 = () => {
     
     player.value.change_volume3();
    
  };
  const showVol3 = () => {
    player.value.vol_btn_main_3();
   
 };
 const muteVol3 = () => {
  player.value.mute();
 
};
const setStream1 = () => {
  player.value.change_stream_omfm();
  playerStore.setStream1(); // Update the store
 
};
const setStream2 = () => {
  player.value.change_stream_rock();
  playerStore.setStream2(); // Update the store
 
};
const setStream3 = () => {
  player.value.change_stream_coma();
  playerStore.setStream3(); // Update the store
 
};
 

  return {
    player,
    isPlaying,
    togglePlay,
    playPlayer1,
    stopPlayer1,
    changeVol3,
    showVol3,
    muteVol3,
    setStream1,
    setStream2,
    setStream3
  };
};
