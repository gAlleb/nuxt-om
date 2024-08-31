import { ref } from 'vue';
import IcePlayer from './IcePlayer.js'; 
export const usePlayer = () => {
  const player = ref(null);
  const isPlaying = ref(false);

  onMounted(() => {
    // Create the IcePlayer instance
    player.value = new IcePlayer('#ice-player',  isPlaying); 
    player.value.hide_stop_button();
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
  const showVol3Open = ref(false);
  const showVol3 = () => {
    player.value.vol_btn_main();
   
 };
 

  return {
    player,
    isPlaying,
    togglePlay,
    playPlayer1,
    stopPlayer1,
    changeVol3,
    showVol3
  };
};