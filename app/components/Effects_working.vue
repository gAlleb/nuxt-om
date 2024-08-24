<template>
  <Menu as="div" class="relative ml-4">
    <div>
      <MenuButton @click="toggle_effects_block" class="flex rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2" :class="{ 'bg-red-400 dark:bg-red-400': !allEffectsOn }">
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:sparkles" class="h-7 w-7 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div id="Effects_block" v-show="showEffectsBlock"  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay0')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay0') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Effect 1</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay1')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay1') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Effect 2</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay2')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay2') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Effect 3</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleEffect('overlay3_5')" :class="{ 'bg-red-400 dark:bg-red-400': !effectOn('overlay3_5') }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">Effect 4-6</span>
          </button>
        </MenuItem>
        <MenuItem as="div" class="">
          <button type="button" @click="toggleAllEffects" :class="{ 'bg-red-400 dark:bg-red-400': allEffectsOn }" class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
            <Icon name="heroicons:sparkles" class="h-6 w-6" aria-hidden="true" />
            <span class="text-zinc-700 dark:text-zinc-300">All Effects</span>
          </button>
        </MenuItem>
      </div>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref, onMounted } from 'vue';

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

// Состояние для показа/скрытия Effects_block
const showEffectsBlock = ref(false);
function toggle_effects_block() {
  showEffectsBlock.value = !showEffectsBlock.value;
}

// Функции для работы с эффектами
const allEffectsOn = ref(false); // Initial state should be false to ensure no overlays initially visible
const effectStates = ref({
  "overlay0": false,
  "overlay1": false,
  "overlay2": false,
  "overlay3_5": false // Use a single key to control overlays 3, 4, and 5
});

function toggleEffect(overlayId) {
  if (overlayId === 'overlay3_5') {
    // Toggle overlays 3, 4, and 5
    effectStates.value[overlayId] = !effectStates.value[overlayId];
    for (let i = 3; i <= 5; i++) {
      const overlay = document.getElementById(`overlay${i}`);
      if (overlay) {
        if (effectStates.value[overlayId]) {
          overlay.style.display = 'flex';
          setItem(`overlay${i}`, 'true'); // Store individual overlay states in localStorage
        } else {
          overlay.style.display = 'none';
          setItem(`overlay${i}`, 'false');
        }
      }
    }
  } else {
    // Toggle individual overlays 0, 1, and 2
    const overlay = document.getElementById(overlayId);
    if (overlay) {
      effectStates.value[overlayId] = !effectStates.value[overlayId];
      if (effectStates.value[overlayId]) {
        overlay.style.display = 'flex';
        setItem(overlayId, 'true');
      } else {
        overlay.style.display = 'none';
        setItem(overlayId, 'false');
      }
    }
  }
}

function effectOn(overlayId) {
  return effectStates.value[overlayId];
}

function toggleAllEffects() {
  allEffectsOn.value = !allEffectsOn.value;
  
  // Turn off all effects if allEffectsOn is false
  if (!allEffectsOn.value) {
    Object.keys(effectStates.value).forEach(overlayId => {
      effectStates.value[overlayId] = false;
      toggleEffect(overlayId);
    });
    setItem('effects', 'false');
    // Turn on all effects if allEffectsOn is true
  } else {
    Object.keys(effectStates.value).forEach(overlayId => {
      effectStates.value[overlayId] = true;
      toggleEffect(overlayId);
    });
    setItem('effects', 'true');
  }
  console.log(allEffectsOn.value)
}

// Изменение состояния элементов при загрузке страницы
onMounted(() => {
  // Restore the state of each individual overlay
  for (let i = 0; i <= 5; i++) {
    const overlayId = `overlay${i}`;
    const overlay = document.getElementById(overlayId);
    if (overlay) {
      const overlayState = getItem(overlayId);
      if (overlayState === 'true') {
        overlay.style.display = 'flex';
        effectStates.value[overlayId] = true;
      } else {
        overlay.style.display = 'none';
        effectStates.value[overlayId] = false;
      }
    }
  }

  // Restore the combined state for overlays 3, 4, and 5
  if (getItem('overlay3') === 'true' || getItem('overlay4') === 'true' || getItem('overlay5') === 'true') {
    effectStates.value['overlay3_5'] = true;
  }

  // Restore the "all effects" state
  const effectsToggle = getItem("effects");
  if (effectsToggle === "true" || effectsToggle === null) {
    allEffectsOn.value = true;
  } else {
    allEffectsOn.value = false;
  }
});

</script>