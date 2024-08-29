<template>
  <Menu as="div" class="relative ml-1 sm:ml-4">
    <div>
      <UTooltip text="Show/Hide Player" :popper="{ offsetDistance: 5 }"  class="">


      <MenuButton @click="radioshow();" 
      id="menu_button" class="flex rounded-xl   text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset-1 focus:ring-offset-gray-800 p-2"
     :class="[isPlayerVisible ? 'scale-110' : 'scale-100']"  >
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:radio" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      
      </MenuButton>
     
    
      </UTooltip>
      </div>
  </Menu>
 
 
 </template>

<script setup>
import { Menu, MenuButton } from '@headlessui/vue'
import { ref } from 'vue'

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

