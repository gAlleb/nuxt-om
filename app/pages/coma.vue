<template>
    <div>
   
    <div class="flex relative overflow-hidden dark:hidden " style="background: url('/omfm4-light.jpg') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <div class="indexSliderImg-light"></div>
    <button 
        class="flex z-10 right-7 top-7 absolute bg-zinc-400 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('coma')"
        :class="{
                'glowing-text': currentStream === 'coma',
            }" 
      >
        <Icon
          name="heroicons-solid:play"
          class="h-12 w-12 bg-white"            :class="{
                '': !useInitPlayerStore.isPlayingComa,
                'hidden': useInitPlayerStore.isPlayingComa,
            }" 
          aria-hidden="true"
        />
        <Icon
          name="heroicons-solid:stop"
          class="h-12 w-12 bg-red-500"            :class="{
                'hidden': !useInitPlayerStore.isPlayingComa,
                '': useInitPlayerStore.isPlayingComa,
            }" 
          aria-hidden="true"
        />
         
      </button>
    <div class="absolute z-10 w-full"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
 
    <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
      ComaFM
    </h1>
    <h1 class="text-2xl sm:text-3xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
      ambient, drone, field recordings
    </h1>

    </div>


    </div>
    <div class="hidden relative overflow-hidden dark:flex" style="background: url('/omfm4.jpg') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <div class="indexSliderImg"></div>
    <button 
        class="flex z-10 right-7 top-7 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('coma')"
        :class="{
                'glowing-text': currentStream === 'coma',
            }" 
      >
        <Icon
          name="heroicons-solid:play"
          class="h-12 w-12 bg-white"            :class="{
                '': !useInitPlayerStore.isPlayingComa,
                'hidden': useInitPlayerStore.isPlayingComa,
            }" 
          aria-hidden="true"
        />
        <Icon
          name="heroicons-solid:stop"
          class="h-12 w-12 bg-red-500"            :class="{
                'hidden': !useInitPlayerStore.isPlayingComa,
                '': useInitPlayerStore.isPlayingComa,
            }" 
          aria-hidden="true"
        />
       </button>
    <div class="absolute z-10"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
 
 <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
   ComaFM
 </h1>
 <h1 class="text-2xl sm:text-3xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
   ambient, drone, field recordings
 </h1>

 </div>
    </div>


<StreamsComa/>

<div>
    <button @click="showDiv(1)">Div 1</button>
    <button @click="showDiv(2)">Div 2</button>
    <button @click="showDiv(3)">Div 3</button>

    <div v-if="activeDiv === 1">
      <h1>Div 1 Content</h1>
    </div>

    <div v-if="activeDiv === 2">
      <h1>Div 2 Content</h1>
    </div>

    <div v-if="activeDiv === 3">
      <h1>Div 3 Content</h1>
    </div>
  </div>
</div>
</template>
    
 <script setup>
 import { ref } from 'vue'

const activeDiv = ref(1) // Default to showing div 1

const showDiv = (divNumber) => {
  activeDiv.value = divNumber
}
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
 
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream

 </script>