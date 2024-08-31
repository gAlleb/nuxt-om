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
      <div class="transition  duration-300 ease-in-out ml-1 sm:ml-4 inline-flex" :class="[isPlayerVisible ? 'scale-100 relative' : 'scale-0 absolute']"> 
      <button class="flex rounded-xl transitio-all duration-500 ease-in-out   text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2" @click="togglePlay"  >     
       <Icon id="playBtnPlayer1" name="heroicons:play" class="h-6 w-6 bg-green-500" aria-hidden="true" />
       <Icon id="stopBtnPlayer1" name="heroicons:stop" class="h-6 w-6 bg-red-500" aria-hidden="true" />
      </button>
      <button id="ice-volume3_Btn" class="ml-1 flex rounded-xl transitio-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2" @click="showVol3"  >     
       <Icon name="heroicons-solid:volume-up" class="h-6 w-6 bg-yellow-500" aria-hidden="true" />
      </button>
      <button id="ice-volume3_Mute" class="ice-volume3_Mute flex transition-all duration-500 ease-in-out rounded-full shadow-lg bg-slate-50 focus:outline-none  focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800" @click="muteVol3"  >     
       <Icon id="ice-volume3_Unmuted"  name="heroicons-outline:speaker-x-mark" class="h-6 w-6 bg-gray-700" aria-hidden="true" />
       <Icon id="ice-volume3_Muted" name="heroicons-outline:speaker-wave" class="h-6 w-6 bg-gray-700" aria-hidden="true" />
      </button>
      <input id="ice-volume3" type="range" min="0" max="100" value="70" class="ice-volume3 -rotate-90 absolute " @input="changeVol3">
      </div>
      </div>
  </Menu>


  <div class="relative ml-1 sm:ml-4" ref="dropdownContainer">
    <div 
      class="flex hover:cursor-pointer rounded-xl bg-sxvx-light-bg dark:bg-sxvx-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2" 
      @click="isOpen = !isOpen"
    >
      <span class="sr-only">Select streams</span>
      <Icon name="heroicons:signal" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95" v-if="isOpen">
      <div 
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right outline rounded-md bg-white dark:bg-zinc-800 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline" 
        @click.stop.prevent
      >
        <button class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full" @click="setStream1">
          <NuxtLink class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100">
            <span class="text-zinc-600 dark:text-zinc-100">omFM Main</span>
          </NuxtLink>
        </button>
        <button class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full"  @click="setStream2">
          <NuxtLink class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100">
            <span class="text-zinc-600 dark:text-zinc-100">Rock @ omFM</span>
          </NuxtLink>
        </button>
        <button class="hover:bg-gray-200 dark:hover:bg-primary-700 w-full"  @click="setStream3">
          <NuxtLink  class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100">
            <span class="text-zinc-600 dark:text-zinc-100">Coma @ omFM</span>
          </NuxtLink>
        </button>
      </div>
    </transition>
  </div>
 </template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref } from 'vue';
import { usePlayer } from '../../composables/player'; // Create this composable

const isOpen = ref(false)
const dropdownContainer = ref(null);
const handleOutsideClick = (event) => {if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) { isOpen.value = false; }};
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});


const { player, isPlaying, togglePlay, playPlayer1, stopPlayer1, changeVol3, showVol3, muteVol3, setStream1, setStream2, setStream3 } = usePlayer(); // Get player instance and state

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

