<template>
  <section>
  <div class="mx-auto flex max-w-8xl justify-center rounded-full bg-primary-600 py-2">
    <h1 class="text-7xl font-extrabold dark:text-zinc-200 text-zinc-700">{{ $t('home') }}</h1>
  </div>

  <div class="mx-auto lg:mx-20 md:mx-20 sm:mx-20 mt-12 grid max-w-none gap-10 lg:max-w-none md:grid-cols-3 lg:grid-cols-3">
  <div class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover transition-all brightness-75 hover:brightness-100  hover:scale-110" src="https://fakeimg.pl/600x400" />
    </div>
    <button 
        class="flex absolute right-10 rounded-full my-5 transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"

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
  </div>
  <div class="flex flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover transition-all brightness-75 hover:brightness-100  hover:scale-110" src="https://fakeimg.pl/600x400" />
    </div>
  </div>
  <div class="flex flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover transition-all brightness-75 hover:brightness-100  hover:scale-110" src="https://fakeimg.pl/600x400" />
    </div>
  </div>
</div>
</section>
</template>

<script setup>
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
 

import { usePlayer } from '../composables/player'; // Create this composable
const { player, togglePlay, playPlayer1, stopPlayer1, changeVol3, showVol3, muteVol3, setStream1, setStream2, setStream3 } = usePlayer(); // Get player instance and state

import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream

</script>
