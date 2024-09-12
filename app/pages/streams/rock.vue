<template>
    <div>
        <div v-if="radioData">  
          <img height="200" width="200" :src="np_ac.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_ac.coverArtUrls['station:radio'], 0)" >
          {{ radioData.np.now_playing.song.artist }} - {{ radioData.np.now_playing.song.title }}
          <h4>Next Song:</h4> 
          <img height="200" width="200" :src="np_ac.nextCoverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_ac.nextCoverArtUrls['station:radio'], 0)" >
          {{ radioData.np.playing_next.song.artist }} - {{ radioData.np.playing_next.song.title }}
          <h4>Recent Songs:</h4>      
          <ul>
          <li v-for="(historyItem, index) in radioData.np.song_history.slice(0, 5)" :key="index">
            <img 
              v-if="np_ac.songHistoryCoverArt['station:radio'] && np_ac.songHistoryCoverArt['station:radio'][index]" 
              :src="np_ac.songHistoryCoverArt['station:radio'][index]" 
              alt="History Cover"
              class="history-cover"
                     width="60"
              height="60"
              @click="openLightbox(np_ac.songHistoryCoverArt['station:radio'][index], index)" 
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

  import { useOmfmData } from '../../stores/stationData_omfm';
  import { useAzuracastData } from '../../stores/stationData';
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
    