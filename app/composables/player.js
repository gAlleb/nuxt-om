import { initPlayerStore } from '../stores/initPlayer';

export const usePlayer = () => {
  const playerStoreInit = initPlayerStore();

  onMounted(() => {
    // Initialize the player in the store
    playerStoreInit.initPlayer(); 
  });

  return {
    // Access player properties and methods directly from the store
    player: playerStoreInit.player,
    isPlaying: playerStoreInit.isPlaying,
    togglePlay: playerStoreInit.togglePlay,
    togglePlayAll: playerStoreInit.togglePlayAll,
    playPlayer1: playerStoreInit.playPlayer1,
    stopPlayer1: playerStoreInit.stopPlayer1,
    pausePlayer1: playerStoreInit.pausePlayer1,
    changeVol3: playerStoreInit.changeVol3,
    showVol3: playerStoreInit.showVol3,
    muteVol3: playerStoreInit.muteVol3,
    setStream1: playerStoreInit.setStream1,
    setStream2: playerStoreInit.setStream2,
    setStream3: playerStoreInit.setStream3,
    playStatus: playerStoreInit.playStatus,
  };
};
