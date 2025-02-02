<template>
    <div>
    <div id="VisualizerWrapper" class="relative overflow-hidden">
    <Visualizer />
    <div class="flex relative overflow-hidden dark:hidden font-UNSCII" style="background: url('/static/img/station/chill/chill_background.jpg') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <div class="indexSliderImg-light"></div>
    <button 
        class="flex z-10 right-7 top-7 sm:top-10 sm:right-20 absolute bg-zinc-400 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('chill')"
        :class="{
                'glowing-text': currentStream === 'chill',
            }" 
      >
        <Icon
          name="heroicons-solid:play"
          class="h-12 w-12 bg-white"            :class="{
                '': !useInitPlayerStore.isPlayingChill,
                'hidden': useInitPlayerStore.isPlayingChill,
            }" 
          aria-hidden="true"
        />
        <Icon
          name="heroicons-solid:stop"
          class="h-12 w-12 bg-red-500"            :class="{
                'hidden': !useInitPlayerStore.isPlayingChill,
                '': useInitPlayerStore.isPlayingChill,
            }" 
          aria-hidden="true"
        />
         
      </button>
    <div class="absolute z-10 w-full"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
 
    <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center neon-pink-text-shadow">
      Chill
    </h1>
    <h1 class="text-2xl sm:text-3xl text-sxvx-light text-center neon-pink-text-shadow-sm">
      future garage, chillstep, ambient
    </h1>

    </div>


    </div>
    <div class="hidden relative overflow-hidden dark:flex font-UNSCII" style="background: url('/static/img/station/chill/chill_background.jpg') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <div class="indexSliderImg"></div>
    <button 
        class="flex z-10 right-7 top-7 sm:top-10 sm:right-20 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('chill')"
        :class="{
                'glowing-text': currentStream === 'chill',
            }" 
      >
        <Icon
          name="heroicons-solid:play"
          class="h-12 w-12 bg-white"            :class="{
                '': !useInitPlayerStore.isPlayingChill,
                'hidden': useInitPlayerStore.isPlayingChill,
            }" 
          aria-hidden="true"
        />
        <Icon
          name="heroicons-solid:stop"
          class="h-12 w-12 bg-red-500"            :class="{
                'hidden': !useInitPlayerStore.isPlayingChill,
                '': useInitPlayerStore.isPlayingChill,
            }" 
          aria-hidden="true"
        />
       </button>
    <div class="absolute z-10"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
 
 <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center neon-pink-text-shadow">
   Chill
 </h1>
 <h1 class="text-2xl sm:text-3xl text-sxvx-light text-center neon-pink-text-shadow-sm">
  future garage, chillstep, ambient
 </h1>

 </div>
</div>
</div>

<StreamsChill/>

</div>
</template>   
<script setup>
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
import Visualizer from '~/components/Visualizer.vue';
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive strea
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
	opacity: 0.4;
  bottom: 0;
}
</style>