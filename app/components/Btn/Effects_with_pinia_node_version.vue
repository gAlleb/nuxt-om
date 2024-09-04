<template>
  <!-- <Menu as="div" class="relative ml-1 sm:ml-4">
    <div>
      <UTooltip text="Special Effects" :popper="{ offsetDistance: 5 }"  class="">
      <MenuButton @click.stop="toggle_effects_block" 
      :class="[ 
          areAllFalse() ? 'bg-red-400 dark:bg-red-400' : 
          anyEffectOff() ? 'bg-red-200 dark:bg-pink-400' :
          'bg-sxvx-light-bg dark:bg-sxvx-dark-bg' 
        ]"
      class="flex rounded-xl  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2" 
                 > 
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:sparkles" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      </MenuButton>
      </UTooltip>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div id="Effects_block"   @click.stop    v-show="showEffectsBlock"  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 py-1 shadow-xl outline ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay0')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay0') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Radial</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay1')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay1') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Flicker</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay2')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay2') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Noise</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay3')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay3') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Scanlines</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay4')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay4') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Scanline Black</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay5')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay5') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Scanline Green</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" id="allEffectsBtn" @click="toggleAllEffects" 
          :class="[areAllFalse() ? 'bg-red-400 dark:bg-red-400' : 
          anyEffectOff() ? 'bg-red-200 dark:bg-pink-400' :
          'bg-slate-50 dark:bg-zinc-800' ]" 
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Toggle Effects</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" id="clearCacheBtn" @click="clearCache" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:trash" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Clear Cache</span>
          </button>
        </MenuItem>
      </div>
    </transition>
  </Menu> -->
<div class="relative ml-1 sm:ml-4" ref="dropdownContainer">

<UTooltip text="Special Effects" :popper="{ offsetDistance: 5 }"  class="">
<!-- npm build variant-->
<div
:class="[ 
    (areAllFalse() ||  (!effectsStore.overlay0 && !effectsStore.overlay1 && !effectsStore.overlay2 && !effectsStore.overlay3 && !effectsStore.overlay4 && !effectsStore.overlay5)) ? 'bg-red-400 dark:bg-red-400' : 
    (anyEffectOff() || !(effectsStore.overlay0 && effectsStore.overlay1 && effectsStore.overlay2 && 
    effectsStore.overlay3 && effectsStore.overlay4 && effectsStore.overlay5)) ? 'bg-red-200 dark:bg-pink-400' :
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg' 
  ]"
class="hover:cursor-pointer flex rounded-xl  text-sm  active:ring-2 active:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2" 
@click="isOpen = !isOpen">  


<!-- <div
:class="[ 
    areAllFalse() ? 'bg-red-400 dark:bg-red-400' : 
    anyEffectOff() ? 'bg-red-200 dark:bg-pink-400' :
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg' 
  ]"
class="hover:cursor-pointer flex rounded-xl  text-sm  active:ring-2 active:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2" 
@click="isOpen = !isOpen">  -->
  <span class="sr-only">Effects On/Off</span>
  <Icon name="heroicons:cog-6-tooth" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />


</div>
</UTooltip>
<transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95"  v-if="isOpen">
<div id="Effects_block"   @click.stop.prevent class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 py-1 shadow-xl outline ring-1 ring-black ring-opacity-5 focus:outline-none">

    <button type="button" @click="toggleEffect('overlay0')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay0') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
      <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
      <span class="text-zinc-700 dark:text-zinc-300">Radial</span>
    </button>

    <button type="button" @click="toggleEffect('overlay1')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay1') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
      <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
      <span class="text-zinc-700 dark:text-zinc-300">Flicker</span>
    </button>


    <button type="button" @click="toggleEffect('overlay2')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay2') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
      <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
      <span class="text-zinc-700 dark:text-zinc-300">Noise</span>
    </button>


    <button type="button" @click="toggleEffect('overlay3')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay3') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
      <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
      <span class="text-zinc-700 dark:text-zinc-300">Scanlines</span>
    </button>


    <button type="button" @click="toggleEffect('overlay4')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay4') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
      <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
      <span class="text-zinc-700 dark:text-zinc-300">Scanline Black</span>
    </button>


    <button type="button" @click="toggleEffect('overlay5')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay5') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
      <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
      <span class="text-zinc-700 dark:text-zinc-300">Scanline Green</span>
    </button>


    <button type="button" id="allEffectsBtn" @click="toggleAllEffects" 
    :class="[areAllFalse() ? 'bg-red-400 dark:bg-red-400' : 
    anyEffectOff() ? 'bg-red-200 dark:bg-pink-400' :
    'bg-slate-50 dark:bg-zinc-800' ]" 
    class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
      <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
      <span class="text-zinc-700 dark:text-zinc-300">Toggle Effects</span>
    </button>

    <button type="button" id="clearCacheBtn" @click="clearCache" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
      <Icon name="heroicons:trash" class="h-6 w-6" aria-hidden="true" />
      <span class="text-zinc-700 dark:text-zinc-300">Clear Cache</span>
    </button>

</div>
</transition>
</div>
</template>

<script setup>
//import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref, onMounted } from 'vue';
import { useEffectsStore } from '../../stores/effects';
const effectsStore = useEffectsStore();
const isOpen = ref(false)
const dropdownContainer = ref(null);
const handleOutsideClick = (event) => {if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) { isOpen.value = false; }};
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});
// Функции для работы с localStorage
function getItem(item) {
  if (import.meta.client) {
    return localStorage.getItem(item);
  } else {
    return undefined;
  }
}

function setItem(item, value) {
  if (import.meta.client) {
    localStorage.setItem(item, value);
    return true;
  } else {
    return false;
  }
}

function removeItem(item) {
  if (import.meta.client) {
    localStorage.removeItem(item);
    return true;
  } else {
    return false;
  }
}

const showEffectsBlock = ref(false);

const toggle_effects_block = () => {
  showEffectsBlock.value = !showEffectsBlock.value;
};

const closeEffectsBlockOutside = (event) => {
  if (showEffectsBlock.value && !document.getElementById('Effects_block').contains(event.target)) {
    showEffectsBlock.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeEffectsBlockOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeEffectsBlockOutside);
});

// Функции для работы с эффектами
const allEffectsOn = ref(true); // Initial state - overlays initially visible
const effectStates = ref({
  "overlay0": true,
  "overlay1": true,
  "overlay2": true,
  "overlay3": true,
  "overlay4": true,
  "overlay5": true
  // "overlay3_5": true // Use a single key to control overlays 3, 4, and 5
});
// Function to check if all values are true
function areAllTrue() {
  for (const value of Object.values(effectStates.value)) {
    if (!value) {
      return false; // If any value is false, return false immediately
    }
  }
  return true; // If all values are true, return true
}

// Function to check if all values are false
// This with @click="toggleAllEffects" :class="{ 'bg-red-400 dark:bg-red-400': areAllFalse() }"
// Make toggle button red only if all effects are true!
// If you want to make it red if any effect is true then change to 
// @click="toggleAllEffects" :class="{ 'bg-red-400 dark:bg-red-400': !areAllTrue() }"
// and throw away this funcction
function areAllFalse() {
  for (const value of Object.values(effectStates.value)) {
    if (value) {
      return false; // If any value is true, return false immediately
    }  
  }
  return true; // If all values aren't true, return true
}
// function areAllFalse() {
//      if (areAllTrue()) {
//       return false; // If any value is true, return false immediately
//     }  
  
//   return true; // If all values aren't true, return true
// }
function toggleEffect(overlayId) {

    // Toggle individual overlays 0, 1, and 2
    const overlay = document.getElementById(overlayId);
    if (overlay) {
      effectStates.value[overlayId] = !effectStates.value[overlayId];
      if (effectStates.value[overlayId]) {
        overlay.style.display = 'flex';
        setItem(overlayId, 'true');
        effectsStore[overlayId] = true; 
      } else {
        overlay.style.display = 'none';
        setItem(overlayId, 'false');
        effectsStore[overlayId] = false; 
      }
    }
  
}

function effectOn(overlayId) {
  return effectStates.value[overlayId];
}

function anyEffectOn() {
  return Object.values(effectStates.value).some(state => state);
}
// New function to check if any effect is off
function anyEffectOff() {
  return Object.values(effectStates.value).some(state => !state);
}


function toggleAllEffects() {
  allEffectsOn.value = !allEffectsOn.value;

  // Turn off all effects if allEffectsOn is false
  if (!areAllTrue()) {
    Object.keys(effectStates.value).forEach(overlayId => {
      effectStates.value[overlayId] = false;
      toggleEffect(overlayId);
    });
    setItem('effects', 'false');
    effectsStore.effects = false; 
  } else {
    // Turn on all effects if allEffectsOn is true
    Object.keys(effectStates.value).forEach(overlayId => {
      effectStates.value[overlayId] = true;
      toggleEffect(overlayId);
    });
    setItem('effects', 'true');
    effectsStore.effects = true; 
  }
}

// Function to clear localStorage and reset overlays
function clearCache() {
  // Clear localStorage
  for (let i = 0; i <= 5; i++) {
    removeItem(`overlay${i}`);
  }
  removeItem('effects');

  // Reset overlay states
  effectStates.value = {
    "overlay0": true,
    "overlay1": true,
    "overlay2": true,
    "overlay3": true,
    "overlay4": true,
    "overlay5": true
  };
  allEffectsOn.value = true;

  effectsStore.effects = true; 
  effectsStore.overlay0 = true; 
  effectsStore.overlay1 = true; 
  effectsStore.overlay2 = true; 
  effectsStore.overlay3 = true; 
  effectsStore.overlay4 = true; 
  effectsStore.overlay5 = true; 



  // Update overlay display
  for (let i = 0; i <= 5; i++) {
    const overlay = document.getElementById(`overlay${i}`);
    if (overlay) {
      overlay.style.display = 'flex';
    }
  }
}

// Изменение состояния элементов при загрузке страницы
onMounted(() => {
  // Restore the state of each individual overlay
  for (let i = 0; i <= 5; i++) {
    const overlayId = `overlay${i}`;
    const overlay = document.getElementById(overlayId);
    if (overlay) {
      const overlayState = getItem(overlayId);
      if (overlayState === 'true' || overlayState === null) {
        overlay.style.display = 'flex';
        effectStates.value[overlayId] = true;
       // effectsStore.setOverlayState(overlayId, true);
      } else {
        overlay.style.display = 'none';
        effectStates.value[overlayId] = false;
       // effectsStore.setOverlayState(overlayId, false);
      }
    }
  }

  // Restore the combined state for overlays 3, 4, and 5
  // if (getItem('overlay3') === 'false' || getItem('overlay4') === 'false' || getItem('overlay5') === 'false') {
  //   effectStates.value['overlay3_5'] = false;
  // }

  // Restore the "all effects" state
  const effectsToggle = getItem("effects");
  if (effectsToggle === "true" || effectsToggle === null) {
    allEffectsOn.value = true;
  } else {
    allEffectsOn.value = false;
  }
});

</script>