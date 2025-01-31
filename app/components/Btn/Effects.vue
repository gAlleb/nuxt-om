<template>
  <div class="relative ml-1 sm:ml-4" ref="dropdownContainer">
    <UTooltip text="UI Settings" :popper="{ offsetDistance: 5 }" class="">
      <div :class="[
        (!effectsStore.overlay0 && !effectsStore.overlay1 && !effectsStore.overlay2 && !effectsStore.overlay3 && !effectsStore.overlay4 && !effectsStore.overlay5 && !effectsStore.artBackground && !effectsStore.visualizer) ? 'bg-red-400 dark:bg-red-400' :
        (!(effectsStore.overlay0 && effectsStore.overlay1 && effectsStore.overlay2 && effectsStore.overlay3 && effectsStore.overlay4 && effectsStore.overlay5 && effectsStore.artBackground && effectsStore.visualizer)) ? 'bg-red-200 dark:bg-pink-400' :
        'bg-sxvx-light-bg dark:bg-sxvx-dark-bg'
        ]"
        class="hover:cursor-pointer flex rounded-xl  text-sm  active:ring-2 active:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="isOpen = !isOpen">
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:cog-6-tooth" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      </div>
    </UTooltip>
    <transition enter-active-class="transition ease-out duration-1000" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-1000"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95" v-if="isOpen">
      <div id="Effects_block" @click.stop.prevent
        class="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-xl py-3 px-3  backdrop-blur-[1rem] bg-muddy-waters-100/90 dark:bg-zinc-800/90 shadow-xl  ">
        <button type="button" @click="useInitPlayerStore.toggleHLS"
          :class="{ 'bg-red-400 dark:bg-red-400': !useInitPlayerStore.player.isHLS,
                    'bg-green-400': useInitPlayerStore.player.isHLS
          }"
          class="flex mb-2 gap-2 justify-center
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="bxl:apple" class="h-10 w-10" aria-hidden="true" />
          <span class="flex text-zinc-900 text-xl mt-2">HLS</span>
        </button>
        <hr class="mb-2"/>
        <div class=" grid grid-cols-2 gap-3  ">
        <button type="button" @click="toggleEffect('overlay0')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay0,
                    'bg-white': effectsStore.overlay0
          }"
          class="flex flex-col gap-2 
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:sparkles" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Radial</span>
        </button>
        <button type="button" @click="toggleEffect('overlay1')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay1,
                    'bg-white': effectsStore.overlay1
          }"
          class="flex flex-col  gap-2 
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:sparkles" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Flicker</span>
        </button>
        <button type="button" @click="toggleEffect('overlay2')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay2,
                    'bg-white': effectsStore.overlay2
          }"
          class="flex flex-col  gap-2 
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:sparkles" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Noise</span>
        </button>
        <button type="button" @click="toggleScanlineEffect()"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.overlay3 && !effectsStore.overlay4 && !effectsStore.overlay5,
                    'bg-white': effectsStore.overlay3 && effectsStore.overlay4 && effectsStore.overlay5
          }"
          class="flex flex-col  gap-2 
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:sparkles" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Scanlines</span>
        </button>
        <button type="button" @click="toggleEffect('artBackground')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.artBackground,
                    'bg-white': effectsStore.artBackground
          }"
          class="flex flex-col  gap-2 
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:sparkles" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Strokes</span>
        </button>
        <div class="flex flex-col gap-2 ">
        <button type="button" @click="toggleEffect('visualizer')"
          :class="{ 'bg-red-400 dark:bg-red-400': !effectsStore.visualizer,
                    'bg-white': effectsStore.visualizer
          }"
          class="grid px-4 pt-2 pb-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:sparkles" class="h-4 w-4 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Visualizer</span>
        </button>
        <button type="button" @click="toggleEffect('visualizerCaps')"
          :class="{ 'bg-red-400 dark:bg-red-400': (!effectsStore.visualizerCaps || !effectsStore.visualizer),
                    'bg-white': (effectsStore.visualizerCaps && effectsStore.visualizer)
          }"
          class="flex px-4 pt-0 pb-0 text-sm text-zinc-900 w-full rounded-2xl">
          <span class="grid w-full text-zinc-900 text-xs">Caps</span>
        </button>
        </div>
        <hr />
        <hr />
        <button type="button" @click="toggleAllEffects"
          :class="[
          (!effectsStore.overlay0 && !effectsStore.overlay1 && !effectsStore.overlay2 && !effectsStore.overlay3 && !effectsStore.overlay4 && !effectsStore.overlay5 && !effectsStore.artBackground && !effectsStore.visualizer) ? 'bg-red-400 dark:bg-red-400' :
            (!(effectsStore.overlay0 && effectsStore.overlay1 && effectsStore.overlay2 && effectsStore.overlay3 && effectsStore.overlay4 && effectsStore.overlay5 && effectsStore.artBackground && effectsStore.visualizer)) ? 'bg-red-200 dark:bg-pink-400' :
              'bg-white']"
          class="flex flex-col  gap-2 
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:sparkles" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Toggle</span>
        </button>
        <button type="button" id="clearCacheBtn" @click="clearCache"
          class="flex flex-col  gap-2 bg-white
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:trash" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Cache</span>
        </button>
        <hr />
        <hr />
        <button @click="colorMode.preference = 'light'" type="button"
          class="flex flex-col  gap-2 bg-white
          px-4 py-2 text-sm text-zinc-900 w-full rounded-2xl">
          <Icon name="heroicons:sun" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-900 text-xs">Light</span>
        </button>
        <button @click="colorMode.preference = 'dark'" type="button"
          class="flex flex-col  gap-2 bg-zinc-900
          px-4 py-2 text-sm text-zinc-100 w-full rounded-2xl">
          <Icon name="heroicons:moon" class="h-6 w-6 w-full" aria-hidden="true" />
          <span class="grid w-full text-zinc-100 text-xs">Dark</span>
        </button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { initPlayerStore } from '@/stores/initPlayer';
const useInitPlayerStore = initPlayerStore();
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
    effectsStore.setOverlayLocalStorage(overlayId, true);
  } else {
    effectsStore.setOverlayLocalStorage(overlayId, false);
  }
}
function toggleScanlineEffect() {
  effectsStore.overlay3 = !effectsStore.overlay3;
  effectsStore.overlay4 = !effectsStore.overlay4;
  effectsStore.overlay5 = !effectsStore.overlay5;
  if (effectsStore.overlay3 && effectsStore.overlay4 && effectsStore.overlay5) {
    for (let i = 3; i <= 5; i++) {
    effectsStore.setOverlayLocalStorage(`overlay${i}`, true);
    }
  } else {
    for (let i = 3; i <= 5; i++) {
    effectsStore.setOverlayLocalStorage(`overlay${i}`, false);
    }
  }
}
function toggleAllEffects() {
  if (!effectsStore.overlay0 && !effectsStore.overlay1 && !effectsStore.overlay2 && !effectsStore.overlay3 && !effectsStore.overlay4 && !effectsStore.overlay5 && !effectsStore.artBackground && !effectsStore.visualizer) {
    effectsStore.setToTrue();
    for (let i = 0; i <= 5; i++) {
    effectsStore.setOverlayLocalStorage(`overlay${i}`, true);
    }
    effectsStore.setOverlayLocalStorage('artBackground', true);
    effectsStore.setOverlayLocalStorage('visualizer', true);
    effectsStore.setOverlayLocalStorage('visualizerCaps', true);
  } else {
    effectsStore.setToFalse();
    for (let i = 0; i <= 5; i++) {
    effectsStore.setOverlayLocalStorage(`overlay${i}`, false);
    }
    effectsStore.setOverlayLocalStorage('artBackground', false);
    effectsStore.setOverlayLocalStorage('visualizer', false);
    effectsStore.setOverlayLocalStorage('visualizerCaps', false);
  }
}
// Not clear but set to true
function clearCache() {
  for (let i = 0; i <= 5; i++) {
    effectsStore.setOverlayLocalStorage(`overlay${i}`, true);
  }
  effectsStore.setOverlayLocalStorage('artBackground', true);
  effectsStore.setOverlayLocalStorage('visualizer', true);
  effectsStore.setOverlayLocalStorage('visualizerCaps', true);
  effectsStore.setToTrue();
}
</script>