<template>
  <Menu as="div" class="relative ml-1 sm:ml-4">
    <div>
      <UTooltip text="Show/Hide Player" :popper="{ offsetDistance: 5 }"  class="">


      <MenuButton @click="radioshow();" 
      id="menu_button" class="flex rounded-xl transitio-all duration-500 ease-in-out   text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
       >
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:radio" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      
      </MenuButton>
     
    
      </UTooltip>
      <div class="transition-all  duration-500 ease-in-out ml-1 sm:ml-4" :class="[isPlayerVisible ? 'inline-flex' : 'hidden']">
      <button class="flex rounded-xl transitio-all duration-500 ease-in-out   text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2" @click="togglePlay"  >     
       <Icon id="playBtnPlayer1" name="heroicons:play" class="h-6 w-6 bg-green-500" aria-hidden="true" />
       <Icon id="stopBtnPlayer1" name="heroicons:stop" class="h-6 w-6 bg-red-500" aria-hidden="true" />
      </button>
      </div>
      </div>
  </Menu>
 
 
 </template>

<script setup>
import { Menu, MenuButton } from '@headlessui/vue'
import { ref } from 'vue';
import { usePlayer } from '../../composables/player'; // Create this composable

const { player, isPlaying, togglePlay, playPlayer1, stopPlayer1 } = usePlayer(); // Get player instance and state

const isPlayerVisible = ref(false); // Assuming player is initially visible

function radioshow() {
  const player = document.getElementById("ice-player");
  if (player) { // Check if the player element exists
    if (player.style.transform === "translateY(100%)") {
      player.style.transform = "translateY(0%)";
      player.style.transition = "transform 300ms linear ";
      isPlayerVisible.value = true;
    } else {
      player.style.transform = "translateY(100%)";
      player.style.transition = "transform 300ms linear";
      isPlayerVisible.value = false;
    }
  }
}
</script>

