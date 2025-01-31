<template>
  <Menu as="div" class="relative ml-1 sm:ml-4">
    <div>
      <UTooltip text="Show/Hide Player" :popper="{ offsetDistance: 5 }"  class="">
      <MenuButton @click="useInitPlayerStore.togglePlayerVisibility();" 
      id="menu_button" class="flex rounded-xl transitio-all duration-500 ease-in-out   text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
      :class="[useInitPlayerStore.playerVisible ? 'scale-100' : 'scale-75'], [useInitPlayerStore.isPlaying ? 'bg-green-600 dark:bg-green-bg' : 'bg-sxvx-light-bg dark:bg-sxvx-dark-bg']" 
      >
        <span class="sr-only">Show/Hide Player</span>
        <Icon name="heroicons:radio" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" /> 
      </MenuButton>
      </UTooltip>
      <!-- <div class="transition  duration-300 ease-in-out ml-1 sm:ml-4 inline-flex" :class="[isPlayerVisible ? 'scale-100 relative' : 'scale-0 absolute']">  -->
      <div class="transition  duration-300 ease-in-out ml-1 sm:ml-4 inline-flex"> 
      <button class="flex rounded-xl transitio-all duration-500 ease-in-out   text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2" @click="useInitPlayerStore.togglePlayAll()"  >     
       <Icon name="heroicons-solid:play" class="h-6 w-6 bg-green-500" aria-hidden="true" :class="[useInitPlayerStore.isPlaying ? 'hidden' : '']" />
       <Icon name="heroicons-solid:stop" class="h-6 w-6 bg-red-500" aria-hidden="true" :class="[useInitPlayerStore.isPlaying ? '' : 'hidden']" />
      </button>
      <button id="ice-volume3_Btn" style="padding: 5px;"  class="ml-1 sm:ml-4 flex rounded-xl transitio-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800"   >     
       <!-- <Icon name="heroicons-solid:volume-up" class="h-6 w-6 bg-yellow-500" aria-hidden="true" /> -->
       <a  id="ice-volume3_Mute" class="mute speaker3" title="mute/unmute"  @click="useInitPlayerStore.muteVol()"><span></span></a>
      </button>
      <!-- <button id="ice-volume3_Mute" class="ice-volume3_Mute flex transition-all duration-500 ease-in-out rounded-full shadow-lg bg-slate-50 focus:outline-none  focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800" @click="muteVol3"  >     
       <Icon id="ice-volume3_Unmuted"  name="heroicons-outline:speaker-x-mark" class="h-6 w-6 bg-gray-700" aria-hidden="true" />
       <Icon id="ice-volume3_Muted" name="heroicons-outline:speaker-wave" class="h-6 w-6 bg-gray-700" aria-hidden="true" />
      </button> -->
      <!-- <a  id="ice-volume3_Mute" class="mute speaker3" title="mute/unmute"  @click="muteVol3"><span></span></a> -->
      <input id="ice-volume3" type="range" min="0" max="100" value="100" class="ice-volume3 hidden sm:block -rotate-90 absolute " @input="useInitPlayerStore.changeVol3()">
      </div>
      </div>
  </Menu>
</template>
<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref } from 'vue';
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
const isOpen = ref(false)
const dropdownContainer = ref(null);
const handleOutsideClick = (event) => {if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) { isOpen.value = false; }};
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
  const playerVisibilityState = JSON.parse(localStorage.getItem('playerVisible'));
  useInitPlayerStore.playerVisible = playerVisibilityState === true || playerVisibilityState === null;
});
</script>

