<template>
    <div>

      <div v-if="comaData">  
          <img height="200" width="200" :src="comaData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(comaData.np.now_playing.song.art, 0)" >
          {{ comaData.np.now_playing.song.artist }} - {{ comaData.np.now_playing.song.title }}
          <h4>Next Songs</h4>
          <img height="200" width="200" :src="comaData.np.playing_next.song.art" alt="Album Cover"  @click="openLightbox(comaData.np.playing_next.song.art, 0)" >
          {{ comaData.np.playing_next.song.artist }} - {{ comaData.np.playing_next.song.title }}
          <h4>Recent Songs:</h4>      
          <ul>
          <li v-for="(historyItem, index) in comaData.np.song_history.slice(0, 5)" :key="index">
            <img 
              v-if="comaData.np.song_history[index].song.art" 
              :src="comaData.np.song_history[index].song.art" 
              alt="History Cover"
              class="history-cover"
                     width="60"
              height="60"
              @click="openLightbox(comaData.np.song_history[index].song.art, index)" 
            >
            <div v-else class="placeholder-cover"></div> <!-- Placeholder if no cover art -->
            {{ historyItem.song.title }} - {{ historyItem.song.artist }} - {{ getTimeFromTimestamp(historyItem.played_at) }} 
          </li>
        </ul>
      </div>
      <VueEasyLightbox
      ref="lightbox"
      :visible="lightboxVisible"
      :imgs="lightboxImages"
      :index="lightboxIndex"
      @hide="lightboxVisible = false"
    />


 
      </div>
  
    </template>
    
    <script setup>
  import { initPlayerStore } from '../../stores/initPlayer'; // Import the store
  const useInitPlayerStore = initPlayerStore(); // Get the store instance
   
  
  import { usePlayer } from '../../composables/player'; // Create this composable
  const { player, togglePlay, playPlayer1, stopPlayer1, changeVol3, showVol3, muteVol3, setStream1, setStream2, setStream3 } = usePlayer(); // Get player instance and state
  
  import { currentStreamStore } from '../../stores/currentStream'; // Import the store
  const useCurrentStreamStore = currentStreamStore(); // Get the store instance
  const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
  
  import { useOmfmData } from '../../stores/stationData_omfm'
  import { useAzuracastData } from '../../stores/stationData'
  const np_omfm = useOmfmData();
  const np_ac = useAzuracastData();
  
  // Example access for "station:radio"
  const omfmData = computed(() => np_omfm.stations['station:radio']);
  const radioData = computed(() => np_ac.stations['station:radio']);
  const comaData = computed(() => np_ac.stations['station:coma']);
  
  
  const lightboxVisible = ref(false);
  const lightboxIndex = ref(0);
  const lightboxImages = ref([]);
  
  const openLightboxMainCover = (imageUrl) => {
    lightboxImages.value = imageUrl;
    lightboxVisible.value = true;
  };
  const openLightbox = (imageUrl,   index) => {
    lightboxImages.value =  imageUrl; 
    lightboxIndex.value = index;
    lightboxVisible.value = true;
  };
  
   
  
  
  function getTimeFromTimestamp(timestamp) {
    if (timestamp == "") {
      return ""
    }  else {
    let tmp = new Date(timestamp * 1000);
    return tmp.getHours().toString().padStart(2,'0') + ":"
      + tmp.getMinutes().toString().padStart(2,'0');
    }
  }  
  function minSec(duration) {
        const minutes = Math.trunc(duration / 60);
        const seconds = Math.trunc(duration % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
  </script>
    