import { initPlayerStore } from '../stores/initPlayer';

export const usePlayer = () => {
  const playerStoreInit = initPlayerStore();

  onMounted(() => {
    // Initialize the player in the store
    playerStoreInit.initPlayer();

    if (playerStoreInit.ctx.state === 'suspended') {
      playerStoreInit.unlockAudioContext(playerStoreInit.ctx)
    }
  });

  return {
    // Access player properties and methods directly from the store
    player: playerStoreInit.player,
    isPlaying: playerStoreInit.isPlaying,
    togglePlay: playerStoreInit.togglePlay,
    togglePlayAll: playerStoreInit.togglePlayAll,
    playPlayer: playerStoreInit.playPlayer,
    stopPlayer: playerStoreInit.stopPlayer,
    pausePlayer: playerStoreInit.pausePlayer,
    changeVol3: playerStoreInit.changeVol3,
    showVol3: playerStoreInit.showVol3,
    muteVol: playerStoreInit.muteVol,
    setStream: playerStoreInit.setStream,
    playStatus: playerStoreInit.playStatus,
  };
};
