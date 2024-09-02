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

    <!-- <Menu as="div" class="relative ml-1 sm:ml-4">
    <div>
    <UTooltip text="Pick your Stream" :popper="{ offsetDistance: 5 }"  class="">
      <MenuButton @click.stop="toggleStreamBlock" 
      class="flex rounded-xl bg-sxvx-light-bg dark:bg-sxvx-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2">
        <span class="sr-only">Pick your Stream</span>
        <Icon name="heroicons:language" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      </MenuButton>
    </UTooltip>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div id="StreamBlock" @click.stop v-show="showStreamBlock"  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 py-1 shadow-xl outline ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem as="div" class="hover:bg-gray-200 dark:hover:bg-primary-700">
          <button @click="setStream1" type="button" class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100 w-full">
            <span class="text-zinc-600 dark:text-zinc-100">omFM Main</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="hover:bg-gray-200 dark:hover:bg-primary-700">
          <button @click="setStream2" type="button" class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100 w-full">
            <span class="text-zinc-600 dark:text-zinc-100">Rock @ omFM</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="hover:bg-gray-200 dark:hover:bg-primary-700">
          <button @click="setStream3" type="button" class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100 w-full">
            <span class="text-zinc-600 dark:text-zinc-100">Coma @ omFM</span>
          </button>
        </MenuItem>
      </div>
    </transition>
  </Menu> -->
   </template>
  
<script setup>
//  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  import { ref } from 'vue';
  import { usePlayer } from '../../composables/player'; // Create this composable

  const { setStream1, setStream2, setStream3 } = usePlayer(); // Get player instance and state

// const showStreamBlock = ref(false);

// const toggleStreamBlock = () => {
//     showStreamBlock.value = !showStreamBlock.value;
// };

// const closeStreamBlockOutside = (event) => {
//   if (showStreamBlock.value && !document.getElementById('StreamBlock').contains(event.target)) {
//     showStreamBlock.value = false;
//   }
// };

// onMounted(() => {
//   document.addEventListener('click', closeStreamBlockOutside);
// });

// onBeforeUnmount(() => {
//   document.removeEventListener('click', closeStreamBlockOutside);
// }); 
const isOpen = ref(false)
const dropdownContainer = ref(null);
const handleOutsideClick = (event) => {if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) { isOpen.value = false; }};
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});
</script>
  
  