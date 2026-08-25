<template>
    <div class="relative ml-1 sm:ml-4" ref="dropdownContainer">
      <UTooltip text="Pick your Stream" :popper="{ offsetDistance: 5 }"  class="">
      <div 
        class="flex hover:cursor-pointer rounded-xl bg-sxvx-light-bg dark:bg-sxvx-dark-bg text-sm   active:ring-2 active:ring-gray-300 focus:ring-offset focus:ring-offset-gray-800 p-2" 
        @click="isOpen = !isOpen"
      >
        <span class="sr-only">Select streams</span>
        <Icon name="heroicons:signal" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      </div>
    </UTooltip>
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95" v-if="isOpen">
        <div 
          class="absolute right-0 z-10 mt-2 w-48 origin-top-right outline rounded-md bg-white dark:bg-zinc-800 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline" 
          @click.stop.prevent
        >
          <button
            v-for="s in stations"
            :key="s.id"
            :class="{ 'bg-gray-150 dark:bg-primary-500 glowing-text': currentStream === s.id }"
            class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full"
            @click="useInitPlayerStore.toggleInstantPlay(s.id)">
            <NuxtLink class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100">
              <span class="text-zinc-600 dark:text-zinc-100">{{ s.text.menu }}</span>
            </NuxtLink>
          </button>
        </div>
      </transition>
    </div> 


   </template>
<script setup>
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
import { ref } from 'vue';
const useInitPlayerStore = initPlayerStore(); // Get the store instance
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
import { stations } from '~/config/stations';
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
const isOpen = ref(false)
const dropdownContainer = ref(null);
const handleOutsideClick = (event) => {if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) { isOpen.value = false; }};
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});
</script>
  
  