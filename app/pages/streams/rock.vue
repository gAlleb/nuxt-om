<template>
  <div>
  <div id="VisualizerWrapper" class="relative overflow-hidden">
  <Visualizer :custom-dark-scheme="{ color1: 'red', color2: 'darkred', color3: 'red', capStyle: 'red' }" :color-scheme="{ color1: '#000000', color2: '#000000', color3: '#000000', capStyle: 'black' }" />
  <div class="flex relative overflow-hidden dark:hidden font-metal" style="background: url('/metal.webp') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <!-- <div class="flex relative overflow-hidden dark:hidden font-metal" :style="{ background: `url(${np_ac.coverArtUrls['station:radio']})`, backgroundPosition: 'center 70%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',  height: '45vh' }"> -->

    <div class="indexSliderImg-light"></div>
  <button 
      class="flex z-10 right-7 top-7 sm:top-10 sm:right-20 absolute bg-zinc-400 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
      @click="useInitPlayerStore.togglePlay('rock')"
      :class="{
              'glowing-text': currentStream === 'rock',
          }" 
    >
      <Icon
        name="heroicons-solid:play"
        class="h-12 w-12 bg-white"            :class="{
              '': !useInitPlayerStore.isPlayingRock,
              'hidden': useInitPlayerStore.isPlayingRock,
          }" 
        aria-hidden="true"
      />
      <Icon
        name="heroicons-solid:stop"
        class="h-12 w-12 bg-red-500"            :class="{
              'hidden': !useInitPlayerStore.isPlayingRock,
              '': useInitPlayerStore.isPlayingRock,
          }" 
        aria-hidden="true"
      />
       
    </button>
  <div class="absolute z-10 w-full"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">

  <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
    RockFM
  </h1>
  <h1 class="text-2xl sm:text-3xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
    heavy stuff and more
  </h1>

  </div>


  </div>
  <div class="hidden relative overflow-hidden dark:flex font-metal" style="background: url('/rock.webp') center 70% no-repeat; background-size: cover; height: 45vh;  ">
  <div class="indexSliderImg"></div>
  <button 
      class="flex z-10 right-7 top-7 sm:top-10 sm:right-20 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
      @click="useInitPlayerStore.togglePlay('rock')"
      :class="{
              'glowing-text': currentStream === 'rock',
          }" 
    >
      <Icon
        name="heroicons-solid:play"
        class="h-12 w-12 bg-white"            :class="{
              '': !useInitPlayerStore.isPlayingRock,
              'hidden': useInitPlayerStore.isPlayingRock,
          }" 
        aria-hidden="true"
      />
      <Icon
        name="heroicons-solid:stop"
        class="h-12 w-12 bg-red-500"            :class="{
              'hidden': !useInitPlayerStore.isPlayingRock,
              '': useInitPlayerStore.isPlayingRock,
          }" 
        aria-hidden="true"
      />
     </button>
  <div class="absolute z-10"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">

<h1 class="text-5xl sm:text-7xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
 RockFM
</h1>
<h1 class="text-2xl sm:text-3xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
heavy stuff and more
</h1>
</div>
</div>
</div>


<StreamsRock/>


</div>
</template>
  
<script setup>
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
import { useAzuracastData } from '../../stores/stationData'
  const np_omfm = useOmfmData();
  const np_ac = useAzuracastData();
</script>
<style scoped>
.visualizer {
	position: absolute;
	inset: auto 0 0;
	z-index: 1;
	pointer-events: none;
	display: flex;
	align-items: flex-end;
	justify-content: space-around;
	height: 100%;
	opacity: 0.6;
  bottom: 0;
}
</style>