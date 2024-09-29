<template>
    <section class="mx-3 sm:mx-5 lg:mx-20 font-tenor">
      <div class="justify-center flex mx-auto lg:mx-20">

        <div v-if="omfmData" class="container">  
          <h2 class="my-5 text-2xl">Now playing:</h2>      
  
              <div class="ice-player-el" >
                 <div class="relative">
                   <img class="rounded-xl h-auto w-32 shadow-2xl cursor-pointer sm:w-52" :src="np_omfm.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_omfm.coverArtUrls['station:radio'], 0)" >
                   <div class="absolute text-muddy-waters-100    text-4xl sm:text-6xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                    {{ getTimeFromTimestamp(omfmData.np.now_playing.played_at) }}
                   </div>
                  </div>
                 <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                  <div class="px-3 py-1 mb-0 sm:py-4 sm:mb-5 rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200  bg-opacity-50 ellipsify "> 
                    <span class="text-xl sm:text-2xl">{{ omfmData.np.now_playing.song.title }}</span><br/>
                    <span class="text-lg sm:text-xl">{{ omfmData.np.now_playing.song.artist }}</span><br/>
                    <span class="text-md sm:text-lg" style="font-family: monospace">{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:radio'].elapsed) }} / {{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:radio'].duration) }}</span> 
  
                  </div>
                  <div class="mt-2 sm:mt-5 text-md sm:text-xl px-3 py-1 sm:py-5 rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200 "
                 > 
                  <div class="text-sm sm:text-lg"> 
                   Show: {{ omfmData.np.now_playing.playlist }}
                  </div>
                  
                  </div>
                 </div>
  
  
              </div>
              <div class="bg-sxvx-light dark:bg-sxvx-dark  my-2 rounded-xl relative w-full h-5 overflow-hidden">
              <div class="absolute bg-muddy-waters-300 dark:bg-muddy-waters-400 " style="height:30px;  transition: width 1s linear" :style="{ width: `${( np_omfm.progress['station:radio'].elapsed /  np_omfm.progress['station:radio'].duration * 100).toFixed(2)}%` }"></div>
              </div>
           
            <h2 class="my-5 text-2xl">Recent Songs:</h2>      
            <ul>
            <li v-for="(historyItem, index) in omfmData.np.song_history.slice(1, 6)" :key="index">
  
              <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200" >
                <div class=" relative">
                  <img 
                v-if="np_omfm.songHistoryCoverArt['station:radio'] && np_omfm.songHistoryCoverArt['station:radio'][index]" 
                :src="np_omfm.songHistoryCoverArt['station:radio'][index]" 
                alt="History Cover"
                class="history-cover cursor-pointer rounded-l-xl h-auto w-16 sm:w-20"
                @click="openLightbox(np_omfm.songHistoryCoverArt['station:radio'][index], index)" 
              >  <div class="absolute text-muddy-waters-100 text-2xl sm:text-3xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                    {{ getTimeFromTimestamp(historyItem.played_at) }}
                   </div>
                  </div>
                 <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                  <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                    <span class="text-lg sm:text-2xl">{{ historyItem.song.title  }}</span><br/>
                    <span class="text-md sm:text-xl">{{ historyItem.song.artist  }}</span>
                  </div>
                </div>
                <div class="me-2">
                  <Icon
                  name="heroicons-solid:musical-note"
                  class="h-7 w-7  bg-muddy-waters-800 dark:bg-muddy-waters-200"   
                  aria-hidden="true"
                 />
                </div>
  
               </div>
  
            </li>
          </ul>
        </div>
        <div v-else class="container mx-1 sm:mx-auto lg:mx-20">
          <h2 class="my-5 text-2xl">Now playing:</h2>      
  
          <div class="ice-player-el" >
                 <div class="relative">
                   <img class="rounded-xl h-auto w-32 sm:w-52" src="https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg" alt="Album Cover">
                  </div>
                 <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                  <div class="px-3 py-2 mb-0 sm:py-6 sm:mb-5 rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200 ellipsify "> 
                    <span class="text-xl sm:text-2xl">loading...</span><br/>
                    <span class="text-lg sm:text-xl">loading...</span>
                  </div>
                  <div class="mt-4 text-md sm:text-xl px-3 py-2 sm:py-5 rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200" style="font-family: monospace"> 
                  <div class="relative flex"> 
                    00:00 / 00:00
                  </div>
                  </div>
                 </div>
  
  
              </div>
              <div class="bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200  bg-opacity-50 my-2 rounded-xl relative w-full h-5 overflow-hidden">
              </div>
           
            <h2 class="my-5 text-2xl">Recent Songs:</h2>      
       
            <ul>
            <li v-for="i in 5" :key="i">
  
              <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200" >
                <div class=" relative">
                  <img 
                src="https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg" 
                alt="History Cover"
                class="history-cover rounded-l-xl h-auto w-16 sm:w-20"
                >  
                  </div>
                 <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                  <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                    <span class="text-xl sm:text-2xl">loading...</span><br/>
                    <span class="text-lg sm:text-xl">loading...</span>
                  </div>
                </div>
               </div>
  
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
      </section>
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
                        <!-- <div id="soundwave sm:block">
                    <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    </ul>
                   </div> -->