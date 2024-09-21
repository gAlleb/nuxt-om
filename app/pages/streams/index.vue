<template>
  <div>
    <div class="flex bg-sxvx-light dark:bg-sxvx-dark">
    <button @click="showDiv(1)" class="w-full rounded-t-lg inline-flex justify-center py-3 font-tenor text-xl" 
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 1,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 1,
    }"
    >omFM</button>
    <button @click="showDiv(2)" class="w-full rounded-t-lg inline-flex justify-center py-3 font-metal text-xl"
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 2,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 2,
    }"
    >RockFM</button>
    <button @click="showDiv(3)" class="w-full rounded-t-lg inline-flex justify-center py-3 font-UNSCII text-xl"
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 3,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 3,
    }"
    >ComaFM</button>
    </div>
    <div v-if="activeDiv === 1">
      <StreamsOmfm/>
    </div>
    <div v-if="activeDiv === 2">
      <StreamsRock/>
    </div>
    <div v-if="activeDiv === 3">
      <StreamsComa/>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
const activeDiv = ref(1) // Default to showing div 1
const showDiv = (divNumber) => {
  activeDiv.value = divNumber
}
import { initPlayerStore } from '../../stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance

import { usePlayer } from '../../composables/player'; // Create this composable
const { player, togglePlay, playPlayer1, stopPlayer1, changeVol3, showVol3, muteVol3, setStream } = usePlayer(); // Get player instance and state

import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream

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
  