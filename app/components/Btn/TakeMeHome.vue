<template>
  <div v-if="currentPage !== '/' && !isSubPathOfHome" class="flex mx-auto">
    <NuxtLink 
      :to="localePath('/')"
      class="flex bg-gradient-to-r 
            hover:from-primary-600 hover:via-primary-500 hover:to-primary-400 
            py-2 px-6 rounded-full"            :class="{
                'from-orange-800 via-orange-600 to-orange-500': currentStream === 'stream',
                'from-red-800 via-red-600 to-red-500': currentStream === 'rock',
                'from-blue-800 via-blue-600 to-blue-500': currentStream === 'coma',
                'from-green-800 via-green-600 to-green-500': currentStream === 'terra',
                'from-zinc-800 via-zinc-600 to-zinc-500': currentStream === 'core',
                'from-pink-800 via-pink-600 to-pink-500': currentStream === 'chill',
            }">
      <span class="text-zinc-200">Home</span>
    </NuxtLink>
  </div>
</template>

<script setup>
import { currentStreamStore } from '../../stores/currentStream'; // Import the store
const localePath = useLocalePath()
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
const route = useRoute();
const currentPage = computed(() => route.path);
//Handle subpaths of the home page
const isSubPathOfHome = computed(() => {
  return route.path.startsWith('/es') || route.path.startsWith('/ru') 
});
</script>