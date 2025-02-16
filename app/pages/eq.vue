<template>
<section>
<div class="fixed h-screen -mt-20 w-full" style="background-color: #0d0f17; z-index: 30;">
 

 <div  class="absolute h-screen w-full" style="background: rgba(0, 0, 0, .7); z-index: 1;"/>
 <div 
      class="blur-sm h-screen absolute w-full" 
      style="transition: background-image 2s ease-in"
      :style="{ 
        backgroundImage: backgroundImage,
        backgroundPosition: 'center', 
        backgroundSize: 'cover' 
      }"
    />
 
  <div class="relative overflow-hidden h-48 sm:h-40" style="z-index: 2;"> 
    <Visualizer3Waves :color-scheme="{ color1: 'grey', color2: 'red', color3: 'orange' }" :custom-dark-scheme="{ color1: 'wheat', color2: 'yellow', color3: 'orange' }"/>
  </div>
  <Equalizer style="height: 320px;z-index: 3;position: relative;"/>
  <div class="absolute bottom-0 w-full" style="height: 250px;z-index: 2;">
  <div class="relative overflow-hidden" style="height: 250px;"> 
    <Visualizer :color-scheme="{ color1: 'purple', color2: 'cyan', color3: 'green', capStyle: 'purple' }" :bars-number="20" :max-height="200"/>
  </div>
  </div>
</div>
</section>
</template>

<script setup>
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
import { currentStreamStore } from '@/stores/currentStream';
const useCurrentStreamStore = currentStreamStore();
const currentStream = computed(() => useCurrentStreamStore.currentStream);
import { useAzuracastData } from '@/stores/stationData';
const np_ac = useAzuracastData();
import { useOmfmData } from '@/stores/stationData_omfm';
const np_omfm = useOmfmData();
const backgroundImage = computed(() => {
  if (useInitPlayerStore.isPlaying) {
    if (currentStream.value === 'stream' && np_omfm.coverArtUrls['station:radio']) {
      return `url(${np_omfm.coverArtUrls['station:radio']})`;
    } else if (currentStream.value === 'cdp' && np_ofm.coverArtUrls['station:cdp']) {
      return `url(${np_omfm.coverArtUrls['station:cdp']})`;
    } else if (currentStream.value === 'rock' && np_ac.coverArtUrls['station:radio']) {
      return `url(${np_ac.coverArtUrls['station:radio']})`;
    } else if (currentStream.value === 'coma' && np_ac.stations['station:coma']?.np?.now_playing?.song?.art) {
      return `url(${np_ac.stations['station:coma'].np.now_playing.song.art})`;
    } else if (currentStream.value === 'terra' && np_ac.stations['station:terra']?.np?.now_playing?.song?.art) {
      return `url(${np_ac.stations['station:terra'].np.now_playing.song.art})`;
    } else if (currentStream.value === 'core' && np_ac.stations['station:core']?.np?.now_playing?.song?.art) {
      return `url(${np_ac.stations['station:core'].np.now_playing.song.art})`;
    } else if (currentStream.value === 'chill' && np_ac.stations['station:chill']?.np?.now_playing?.song?.art) {
      return `url(${np_ac.stations['station:chill'].np.now_playing.song.art})`;
    }
  }
  return 'url(/static/img/defaultCoverart.jpg)';
});

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