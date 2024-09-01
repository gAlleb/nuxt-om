<template>
  <div class="flex mx-auto">
    <NuxtLink 
      to="https://" 
      target="_blank" 
      class="flex bg-gradient-to-r 

            hover:from-primary-600 hover:via-primary-500 hover:to-primary-400 
            py-2 px-6 rounded-full"            :class="{
                'from-orange-800 via-orange-600 to-orange-500': currentStream === 'omFM Main',
                'from-red-800 via-red-600 to-red-500': currentStream === 'Rock @ omFM',
                'from-blue-800 via-blue-600 to-blue-500': currentStream === 'Coma @ omFM',
            }">
      <Icon name="heroicons:link" class="h-6 w-6" aria-hidden="true" /> &nbsp; {{ linkText }} 
    </NuxtLink>
  </div>
</template>

<script setup>
import { usePlayerStore } from '../stores/player'; // Import the store

const playerStore = usePlayerStore(); // Get the store instance
const currentStream = computed(() => playerStore.currentStream); // Reactive stream

// Computed property for the link text
const linkText = computed(() => {
  switch (currentStream.value) {
    case 'omFM Main':
      return 'Magic Link Main';
    case 'Rock @ omFM':
      return 'Magic Link Rock';
    case 'Coma @ omFM':
      return 'Magic Link Coma';
    default:
      return 'Magic Link'; // Default text
  }
});
</script>