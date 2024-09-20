<template>
<UtilsPreloader />
<NuxtLayout>
  <!-- <NuxtLoadingIndicator /> -->
  <div class="flex min-h-screen flex-col overflow-hidden bg-sxvx-light-bg text-zinc-700 dark:text-zinc-200 dark:bg-sxvx-dark-bg"
  :class="{
                'font-tenor': currentStream === 'stream',
                'font-metal': currentStream === 'rock',
                'font-UNSCII': currentStream === 'cooma',
            }"
    >
<div id="overlay0" class="overlay  "  :class="{
                'radial': currentStream === 'stream',
                'radial2': currentStream === 'rock',
                'radial3': currentStream === 'coma',
                 
            }"  :style="{ display: overlay0 ? 'flex' : 'none' }"
             ></div>
<div id="overlay1" class="overlay flicker" :style="{ display: overlay1 ? 'flex' : 'none' }"></div>
<div id="overlay2" class="overlay noise" :style="{ display: overlay2 ? 'flex' : 'none' }"></div>
<div id="overlay3" class="overlay scanlines" :style="{ display: overlay3 ? 'flex' : 'none' }"></div>
<div id="overlay4" class="overlay scanline" :style="{ display: overlay4 ? 'flex' : 'none' }"></div>
<div id="overlay5" class="overlay scanline2" :style="{ display: overlay5 ? 'flex' : 'none' }"></div>
<!-- without_pinia_effects_block -->
<!-- <div id="overlay0" class="overlay  "  :class="{
                'radial': currentStream === 'omFM Main',
                'radial2': currentStream === 'Rock @ omFM',
                'radial3': currentStream === 'Coma @ omFM',
            }"
             style="display: flex;"></div>
<div id="overlay1" class="overlay flicker" style="display: flex;"></div>
<div id="overlay2" class="overlay noise" style="display: flex;"></div>
<div id="overlay3" class="overlay scanlines" style="display: flex;"></div>
<div id="overlay4" class="overlay scanline" style="display: flex;"></div>
<div id="overlay5" class="overlay scanline2" style="display: flex;"></div> -->

    <!-- Site header --> 
    <Header />
        <NuxtLoadingIndicator />
    <!-- Page content -->
    <main class="my-20 grow">
      <NuxtPage />
    </main>
    <!-- Site footer -->
    <BtnBuyMeCoffee />
    <div>
   
  </div>
    <div class="footercurves_sxvx_style_ hidden dark:block"></div>
    <div class="footercurves_sxvx_style_light_ block dark:hidden"></div>
    <Footer />

    <div class="hidden playerContainer">
      <Player />
    </div>

  </div>
  <!-- <iframe
      src="https://coma.omfm.ru"
      width="100%"
      height="100%"
      style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:1;"
      frameborder="0"
      scrolling="no"
    ></iframe> -->
</NuxtLayout>
 
</template>

<script setup defer>
import { useAzuracastData } from '@/stores/stationData';
import { useOmfmData } from '@/stores/stationData_omfm';

const np_ac = useAzuracastData();
const np_omfm = useOmfmData();

onMounted(() => {
  np_ac.connectToSSE(); 
  np_omfm.connectToSSE();
});

import { useEffectsStore } from '@/stores/effects';
const effectsStore = useEffectsStore();
const overlay0 = computed(() => effectsStore.overlay0); 
const overlay1 = computed(() => effectsStore.overlay1); 
const overlay2 = computed(() => effectsStore.overlay2); 
const overlay3 = computed(() => effectsStore.overlay3); 
const overlay4 = computed(() => effectsStore.overlay4); 
const overlay5 = computed(() => effectsStore.overlay5); 

onMounted(() => {
  const playerContainer = document.querySelector('.playerContainer');
  playerContainer.classList.remove('hidden');
});

import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
// Uncomment if not using pinia Coockie storage
onMounted(() => {
useCurrentStreamStore.loadStreamName();
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2rem);
}  
</style>
