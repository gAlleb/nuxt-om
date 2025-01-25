<template>
  <div class="relative ml-1 sm:ml-4" ref="dropdownContainer">
    <UTooltip text="UI Settings" :popper="{ offsetDistance: 5 }" class="">
      <div :class="[
        (!effectsStore.overlay0 && !effectsStore.overlay1 && !effectsStore.overlay2 && !effectsStore.overlay3 && !effectsStore.overlay4 && !effectsStore.overlay5 && !effectsStore.artBackground) ? 'bg-red-400 dark:bg-red-400' :
          (!(effectsStore.overlay0 && effectsStore.overlay1 && effectsStore.overlay2 && effectsStore.overlay3 && effectsStore.overlay4 && effectsStore.overlay5 && effectsStore.artBackground)) ? 'bg-red-200 dark:bg-pink-400' :
            'bg-sxvx-light-bg dark:bg-sxvx-dark-bg'
         ]"
        class="hover:cursor-pointer flex rounded-xl  text-sm  active:ring-2 active:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="isOpen = !isOpen">
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:cog-6-tooth" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      </div>
    </UTooltip>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95" v-if="isOpen">
      <div id="Effects_block" @click.stop.prevent
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-zinc-800 py-1 shadow-xl outline ring-1 ring-black ring-opacity-5 focus:outline-none">
        <button type="button" @click="toggleEffect('overlay0')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay0 }"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sparkles" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Radial</span>
        </button>
        <button type="button" @click="toggleEffect('overlay1')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay1 }"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sparkles" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Flicker</span>
        </button>
        <button type="button" @click="toggleEffect('overlay2')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay2 }"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sparkles" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Noise</span>
        </button>
        <button type="button" @click="toggleEffect('overlay3')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay3 }"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sparkles" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Scanlines</span>
        </button>
        <button type="button" @click="toggleEffect('overlay4')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay4 }"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sparkles" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Scanline Black</span>
        </button>
        <button type="button" @click="toggleEffect('overlay5')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay5 }"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sparkles" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Scanline Green</span>
        </button>
        <button type="button" @click="toggleEffect('artBackground')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.artBackground }"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sparkles" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100  text-xs">Strokes Art</span>
        </button>
        <hr />
        <hr />
        <button type="button" id="allEffectsBtn" @click="toggleAllEffects" :class="[
          (!effectsStore.overlay0 && !effectsStore.overlay1 && !effectsStore.overlay2 && !effectsStore.overlay3 && !effectsStore.overlay4 && !effectsStore.overlay5 && !effectsStore.artBackground) ? 'bg-red-400 dark:bg-red-400' :
            (!(effectsStore.overlay0 && effectsStore.overlay1 && effectsStore.overlay2 && effectsStore.overlay3 && effectsStore.overlay4 && effectsStore.overlay5 && effectsStore.artBackground)) ? 'bg-red-200 dark:bg-pink-400' :
              'bg-slate-50 dark:bg-zinc-800']"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sparkles" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Toggle Effects</span>
        </button>
        <button type="button" id="clearCacheBtn" @click="clearCache"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:trash" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Clear Cache</span>
        </button>
        <hr />
        <hr />
        <button @click="colorMode.preference = 'light'" type="button"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:sun" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Light Mode</span>
        </button>
        <button @click="colorMode.preference = 'dark'" type="button"
          class="hover:bg-gray-200 dark:hover:bg-primary-700 flex gap-2 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 w-full">
          <Icon name="heroicons:moon" class="h-4 w-4" aria-hidden="true" />
          <span class="text-zinc-700 dark:text-zinc-100 text-xs">Dark Mode</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
import { ref, onMounted } from 'vue';
import { useEffectsStore } from '@/stores/effects';
const effectsStore = useEffectsStore();
const isOpen = ref(false)
const dropdownContainer = ref(null);
const handleOutsideClick = (event) => { if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) { isOpen.value = false; } };
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
  document.addEventListener('click', closeEffectsBlockOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', closeEffectsBlockOutside);
});
const showEffectsBlock = ref(false);
const closeEffectsBlockOutside = (event) => {
  if (showEffectsBlock.value && !document.getElementById('Effects_block').contains(event.target)) {
    showEffectsBlock.value = false;
  }
};
function toggleEffect(overlayId) {
  effectsStore[overlayId] = !effectsStore[overlayId];
  if (effectsStore[overlayId]) {
    setItem(overlayId, true);
  } else {
    setItem(overlayId, false);
  }
}
function toggleAllEffects() {
  if (!effectsStore.overlay0 && !effectsStore.overlay1 && !effectsStore.overlay2 && !effectsStore.overlay3 && !effectsStore.overlay4 && !effectsStore.overlay5 && !effectsStore.artBackground) {
    effectsStore.setToTrue();
    for (let i = 0; i <= 5; i++) {
      setItem(`overlay${i}`, true);
    }
    setItem('artBackground', true);
  } else {
    effectsStore.setToFalse();
    for (let i = 0; i <= 5; i++) {
      setItem(`overlay${i}`, false);
    }
    setItem('artBackground', false);
  }
}
// Not clear but set to true
function clearCache() {
  for (let i = 0; i <= 5; i++) {
    setItem(`overlay${i}`, true);
  }
  setItem('artBackground', true);
  effectsStore.setToTrue();
}
</script>