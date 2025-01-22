<template>
<section>
<div class="fixed h-screen w-full" style="margin-top: -50px; background-color: #0d0f17; z-index: 30;">
 

 <div  class="absolute h-screen w-full" style="background: rgba(0, 0, 0, .7); z-index: 1;"/>
 <div v-if="currentStream === 'stream' && np_omfm.coverArtUrls['station:radio'] && useInitPlayerStore.isPlaying" class="blur-sm h-screen absolute w-full transition-all duration-500" :style="{ background: `url(${np_omfm.coverArtUrls['station:radio']})`, backgroundPosition: 'center', backgroundSize: 'cover' }"/>
 <div v-if="currentStream === 'rock' && np_ac.coverArtUrls['station:radio'] && useInitPlayerStore.isPlaying" class="blur-sm h-screen absolute w-full transition-all duration-500" :style="{ background: `url(${np_ac.coverArtUrls['station:radio']})`,   backgroundPosition: 'center', backgroundSize: 'cover' }"/>
 <div v-if="currentStream === 'coma' && comaData && useInitPlayerStore.isPlaying" class="blur-sm h-screen absolute w-full transition-all duration-500" :style="{ background: `url(${comaData.np.now_playing.song.art})`, backgroundPosition: 'center', backgroundSize: 'cover' }"/>
 <div v-if="currentStream === 'terra' && terraData && useInitPlayerStore.isPlaying" class="blur-sm h-screen absolute w-full transition-all duration-500" :style="{ background: `url(${terraData.np.now_playing.song.art})`, backgroundPosition: 'center', backgroundSize: 'cover' }"/>
 <div v-if="currentStream === 'core' && coreData && useInitPlayerStore.isPlaying" class="blur-sm h-screen absolute w-full transition-all duration-500" :style="{ background: `url(${coreData.np.now_playing.song.art})`, backgroundPosition: 'center', backgroundSize: 'cover' }"/>


 
  <div class="relative overflow-hidden h-48 sm:h-40" style="z-index: 2;"> 
    <Visualizer3Waves :color-scheme="{ color1: 'grey', color2: 'red', color3: 'orange' }" :custom-dark-scheme="{ color1: 'wheat', color2: 'yellow', color3: 'orange' }"/>
  </div>
  <Equalizer style="height: 320px;z-index: 3;position: relative;"/>
  <div class="absolute bottom-0 w-full" style="height: 250px;z-index: 2;">
  <div class="relative overflow-hidden" style="height: 250px;"> 
    <Visualizer :color-scheme="{ color1: 'purple', color2: 'cyan', color3: 'green' }" :bars-number="20" :max-height="200"/>
  </div>
  </div>
 


</div>
</section>
</template>

<script setup>
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
import { currentStreamStore } from '../stores/currentStream';
const useCurrentStreamStore = currentStreamStore();
const currentStream = computed(() => useCurrentStreamStore.currentStream);
import { useAzuracastData } from '../stores/stationData';
const np_ac = useAzuracastData();
import { useOmfmData } from '../stores/stationData_omfm';
const np_omfm = useOmfmData();
const omfmData = computed(() => np_omfm.stations['station:radio']);
const radioData = computed(() => np_ac.stations['station:radio']);
const comaData = computed(() => np_ac.stations['station:coma']);
const terraData = computed(() => np_ac.stations['station:terra']);
const coreData = computed(() => np_ac.stations['station:core']);


</script>
<style scoped>
.visualizer3waves {
	position: absolute;
	inset: auto 0 0;
	z-index: 1;
	pointer-events: none;
	display: flex;
	align-items: flex-end;
	justify-content: space-around;
	height: 100%;
	opacity: 0.6;
    top: 0;
}
.virtualizer {
    opacity: 0.75;
}
</style>