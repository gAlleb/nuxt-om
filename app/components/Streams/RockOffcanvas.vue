<template>
  <section class="mb-2 font-tenor">
    <div class="justify-center flex mx-auto">

      <div v-if="radioData" class="container">  
        <h2 class="text-lg mb-3">Show: {{ radioData.np.now_playing.playlist }}</h2>      

            <div class="content-center">


              <div class="mx-3">
               <div class="relative w-full">
                 <img class="rounded-xl h-auto w-auto shadow-2xl cursor-pointer" :src="np_ac.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_ac.coverArtUrls['station:radio'], 0)" >
                 <div class="bg-sxvx-light-bg absolute dark:bg-sxvx-dark-bg bottom-0 rounded-b-xl  w-full h-5 overflow-hidden">
                 <div class="absolute bg-muddy-waters-300 dark:bg-muddy-waters-400 " style="height:20px;  transition: width 1s linear" :style="{ width: `${np_ac.progress['station:radio'].width}%` }"></div>
                 </div>
                 <span class="text ms-2  absolute bottom-0 left-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].elapsed) }}</span> 
                 <span class=" absolute me-2 bottom-0 right-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].duration) }}</span> 
                 <div class="absolute text-muddy-waters-100    text-4xl sm:text-6xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(radioData.np.now_playing.played_at) }}
                </div>
               </div>

              </div>
               <div class="ms-2" >
                <div class="px-3  text-center mb-0 py-3  rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200  bg-opacity-50  "> 
                  <span class="text-lg">{{ radioData.np.now_playing.song.title }}</span><br/>
                  <span class="text-md">{{ radioData.np.now_playing.song.artist }}</span><br/>
                  <span class="text-md">Album: {{ radioData.np.now_playing.song.album }}</span>

                </div>
               </div>


            </div>

          <hr/>
          <h2 class="text-lg mt-3">Recent Songs:</h2>      
          <ul>
          <li v-for="(historyItem, index) in radioData.np.song_history.slice(0, 5)" :key="index">

            <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200" >
              <div class=" relative">
                <img 
              v-if="np_ac.songHistoryCoverArt['station:radio'] && np_ac.songHistoryCoverArt['station:radio'][index]" 
              :src="np_ac.songHistoryCoverArt['station:radio'][index]" 
              alt="History Cover"
              class="history-cover cursor-pointer rounded-xl h-auto w-24"
              @click="openLightbox(np_ac.songHistoryCoverArt['station:radio'][index], index)" 
            >  <div class="absolute text-muddy-waters-100 text-3xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(historyItem.played_at) }}
                 </div>
                </div>
               <div class="" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                  <span class="text-lg">{{ historyItem.song.title  }}</span><br/>
                  <span class="text-md">{{ historyItem.song.artist  }}</span>
                </div>
              </div>

             </div>

          </li>
        </ul>
       
      </div>



 
      </div>
    </section>
    <VueEasyLightbox
      ref="lightbox"
      :visible="lightboxVisible"
      :imgs="lightboxImages"
      :index="lightboxIndex"
      @hide="lightboxVisible = false"
    />

    </template>
    
    <script setup>
  import { initPlayerStore } from '../../stores/initPlayer'; // Import the store
  const useInitPlayerStore = initPlayerStore(); // Get the store instance
   

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
  
//   onMounted(() => {
//     var coverArt = document.getElementsByClassName('cover-album')[0];
//     coverArt.style.height = coverArt.offsetWidth + 'px';

// });

  
  
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
