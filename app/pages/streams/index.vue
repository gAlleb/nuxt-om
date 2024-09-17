<template>
  <div>
    <div class="mx-auto z-10 flex max-w-8xl justify-center rounded-full bg-primary-600 py-2">
      <h1 class="text-7xl font-extrabold dark:text-zinc-200 text-zinc-700">Streams</h1>
    </div>
    <div data-aos="fade-down" data-aos-duration="1000" class="justify-center flex-col gap-2  max-w-md mx-auto">
     


      <button 
        class="flex rounded-full my-5 transitio-all duration-500 ease-in-out   text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
       :class="{
                'bg-green-500 dark:bg-green-500 ': !useInitPlayerStore.isPlayingStream,
                'bg-red-500 dark:bg-red-500 ': useInitPlayerStore.isPlayingStream,
            }" 
        @click="togglePlay('stream')"
      >
        <Icon
          name="heroicons-solid:play"
          class="h-6 w-6 bg-white"            :class="{
                '': !useInitPlayerStore.isPlayingStream,
                'hidden': useInitPlayerStore.isPlayingStream,
            }" 
          aria-hidden="true"
        />
        <Icon
          name="heroicons-solid:stop"
          class="h-6 w-6 bg-white"            :class="{
                'hidden': !useInitPlayerStore.isPlayingStream,
                '': useInitPlayerStore.isPlayingStream,
            }" 
          aria-hidden="true"
        />
      </button>
       <button  :class="{
                'bg-gray-150 dark:bg-primary-500 glowing-text': currentStream === 'stream',
            }" 
        class=" flex hover:bg-gray-200 dark:hover:bg-primary-700 w-full"
        @click="setStream('stream')"
      >
        <NuxtLink
          class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100"
        >
          <span class="text-zinc-600 dark:text-zinc-100">omFM Main</span>
        </NuxtLink>
      </button>
      <div v-if="omfmData">
    <progress :value=" np_omfm.progress['station:radio'].elapsed" :max=" np_omfm.progress['station:radio'].duration"></progress>
    <div style="height:30px;background-color:black; transition: width 1s linear" :style="{ width: `${( np_omfm.progress['station:radio'].elapsed /  np_omfm.progress['station:radio'].duration * 100).toFixed(2)}%` }"></div>
    <p> {{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:radio'].elapsed) }}/ {{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:radio'].duration) }}</p>
  </div>
      <hr/>
      <button 
        class=" my-5  flex rounded-xl transition-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2 focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="togglePlay('rock')"
      >
        <Icon
          name="heroicons:play"
          class="h-6 w-6 bg-green-500"            :class="{
                '': !useInitPlayerStore.isPlayingRock,
                'hidden': useInitPlayerStore.isPlayingRock,
            }" 
          aria-hidden="true"
        />
        <Icon
          name="heroicons:stop"
          class="h-6 w-6 bg-green-500"            :class="{
                'hidden': !useInitPlayerStore.isPlayingRock,
                '': useInitPlayerStore.isPlayingRock,
            }" 
          aria-hidden="true"
        />
      </button>
      <button :class="{
            'bg-gray-150 dark:bg-primary-500 glowing-text': currentStream === 'rock', 
            }"
        class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full"
        @click="setStream('rock')"
      >
        <NuxtLink
          class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100"
        >
          <span class="text-zinc-600 dark:text-zinc-100">Rock @ omFM</span>
        </NuxtLink>
      </button>
      <div v-if="radioData">
    <progress :value=" np_ac.progress['station:radio'].elapsed" :max=" np_ac.progress['station:radio'].duration"></progress>
    <div style="height:30px;background-color:black; transition: width 1s linear" :style="{ width: `${( np_ac.progress['station:radio'].elapsed /  np_ac.progress['station:radio'].duration * 100).toFixed(2)}%` }"></div>
    <p> {{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].elapsed) }}/ {{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].duration) }}</p>
  </div>
    <hr/>


    <button 
        class=" my-5 flex rounded-xl transition-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2 focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="togglePlay('coma')"
      >
        <Icon
          name="heroicons:play"
          class="h-6 w-6 bg-green-500"            :class="{
                '': !useInitPlayerStore.isPlayingComa,
                'hidden': useInitPlayerStore.isPlayingComa,
            }" 
          aria-hidden="true"
        />
        <Icon
          name="heroicons:stop"
          class="h-6 w-6 bg-green-500"            :class="{
                'hidden': !useInitPlayerStore.isPlayingComa,
                '': useInitPlayerStore.isPlayingComa,
            }" 
          aria-hidden="true"
        />
      </button>
      <button :class="{
                'bg-gray-150 dark:bg-primary-500 glowing-text': currentStream === 'coma',
            }" 
        class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full"
        @click="setStream('coma')"
      >
        <NuxtLink
          class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100"
        >
          <span class="text-zinc-600 dark:text-zinc-100">Coma @ omFM</span>
        </NuxtLink>
      </button>
      <div v-if="comaData">
    <progress :value=" np_ac.progress['station:coma'].elapsed" :max=" np_ac.progress['station:coma'].duration"></progress>
    <div style="height:30px;background-color:black; transition: width 1s linear" :style="{ width: `${( np_ac.progress['station:coma'].elapsed /  np_ac.progress['station:coma'].duration * 100).toFixed(2)}%` }"></div>
    <p> {{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:coma'].elapsed) }}/ {{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:coma'].duration) }}</p>
  </div>
    </div>
    <div class="flex justify-between">

      <button 
        class="flex rounded-xl transition-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2 focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="stopPlayer1"
      >
        <Icon
          name="heroicons:stop"
          class="h-6 w-6 bg-red-500"
          aria-hidden="true"
        />
      </button>
     
      
  </div>
  
<p class="np-coma-song-text"></p>
<p class="np-radio-song-text"></p>
<hr/>
<div>
                {{ np_omfm.isLoading ? 'loading' : omfmData.np.now_playing.song.text }}
                </div>
                <p>
                {{ np_ac.isLoading ? 'loading' : comaData.np.now_playing.song.text }}
                </p>
        <div v-if="omfmData">  
        <img height="200" width="200" :src="np_omfm.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_omfm.coverArtUrls['station:radio'], 0)" >
        {{ omfmData.np.now_playing.song.artist }} - {{ omfmData.np.now_playing.song.title }}
        <h4>Recent Songs:</h4>      
        <ul>
        <li v-for="(historyItem, index) in omfmData.np.song_history.slice(1, 6)" :key="index">
          <img 
            v-if="np_omfm.songHistoryCoverArt['station:radio'] && np_omfm.songHistoryCoverArt['station:radio'][index]" 
            :src="np_omfm.songHistoryCoverArt['station:radio'][index]" 
            alt="History Cover"
            class="history-cover"
                   width="60"
            height="60"
            @click="openLightbox(np_omfm.songHistoryCoverArt['station:radio'][index], index)" 
          >
          <div v-else class="placeholder-cover"></div> <!-- Placeholder if no cover art -->
          {{ historyItem.song.title }} - {{ historyItem.song.artist }} - {{ getTimeFromTimestamp(historyItem.played_at) }} 
        </li>
      </ul>
    </div>
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
  