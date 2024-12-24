<template>
  <div class="flex mx-auto">
    <NuxtLink 
      to="https://" 
      target="_blank" 
      class="flex bg-gradient-to-r 

            hover:from-primary-600 hover:via-primary-500 hover:to-primary-400 
            py-2 px-6 rounded-full"            :class="{
                'from-orange-800 via-orange-600 to-orange-500': currentStream === 'stream',
                'from-red-800 via-red-600 to-red-500': currentStream === 'rock',
                'from-blue-800 via-blue-600 to-blue-500': currentStream === 'coma',
                'from-green-800 via-green-600 to-green-500': currentStream === 'terra',
                'from-zinc-800 via-zinc-600 to-zinc-500': currentStream === 'core',
            }">
      <Icon name="heroicons:link" class="h-6 w-6" aria-hidden="true" /><span class="text-zinc-200"> &nbsp; {{ linkText }} </span>
    </NuxtLink>
  </div>
</template>

<script setup>
import { currentStreamStore } from '../../stores/currentStream'; // Import the store

const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream

// Computed property for the link text
const linkText = computed(() => {
  switch (currentStream.value) {
    case 'stream':
      return 'Magic Link Main';
    case 'rock':
      return 'Magic Link Rock';
    case 'coma':
      return 'Magic Link Coma';
    case 'terra':
      return 'Magic Link Terra';
    case 'core':
      return 'Magic Link CORE';
    default:
      return 'Magic Link'; // Default text
  }
});
</script>