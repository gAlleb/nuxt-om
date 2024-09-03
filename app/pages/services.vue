<template>
  <div>
    <div class="mx-auto flex max-w-8xl justify-center rounded-full bg-primary-600 py-2">
      <h1 class="text-7xl font-extrabold dark:text-zinc-200 text-zinc-700">{{ $t('services') }}</h1>
    </div>
    <div class="flex flex-col gap-2  max-w-md mx-auto">
    <div class="flex flex-col gap-2">
      <button  :class="{
                'bg-gray-150 dark:bg-primary-500 glowing-text': currentStream === 'omFM Main',
            }" 
        class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full"
        @click="setStream1"
      >
        <NuxtLink
          class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100"
        >
          <span class="text-zinc-600 dark:text-zinc-100">omFM Main</span>
        </NuxtLink>
      </button>
      <button :class="{
            'bg-gray-150 dark:bg-primary-500 glowing-text': currentStream === 'Rock @ omFM', 
            }"
        class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full"
        @click="setStream2"
      >
        <NuxtLink
          class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100"
        >
          <span class="text-zinc-600 dark:text-zinc-100">Rock @ omFM</span>
        </NuxtLink>
      </button>
      <button :class="{
                'bg-gray-150 dark:bg-primary-500 glowing-text': currentStream === 'Coma @ omFM',
            }" 
        class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full"
        @click="setStream3"
      >
        <NuxtLink
          class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100"
        >
          <span class="text-zinc-600 dark:text-zinc-100">Coma @ omFM</span>
        </NuxtLink>
      </button>
    </div>
    <div class="flex justify-between">
      <button 
        class="flex rounded-xl transition-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2 focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="playPlayer1"
      >
        <Icon
          name="heroicons:play"
          class="h-6 w-6 bg-green-500"
          aria-hidden="true"
        />
      </button>
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
  </div>
  </div>
  </template>
  
  <script setup>
import { usePlayer } from '../composables/player'; // Create this composable

const { player, isPlaying, togglePlay, playPlayer1, stopPlayer1, changeVol3, showVol3, muteVol3, setStream1, setStream2, setStream3 } = usePlayer(); // Get player instance and state

import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream

</script>
  