<template>
<!-- <UtilsPreloader /> -->
<NuxtLayout>
<NuxtLoadingIndicator color="#ef4444"/>
<div class="flex min-h-screen flex-col overflow-hidden bg-sxvx-light-bg text-zinc-700 dark:text-zinc-200 dark:bg-sxvx-dark-bg"
  :class="{
                'font-tenor': currentStream === 'stream' || currentStream === 'terra' || currentStream === 'cdp',
                'font-metal': currentStream === 'rock',
                'font-UNSCII': currentStream === 'coma' || currentStream ===  'core' || currentStream === 'chill',
            }">
<div id="overlay0" class="overlay  "  :class="{
                'radial': currentStream === 'stream',
                'radial2': currentStream === 'rock',
                'radial3': currentStream === 'coma',
                'radial4-terra': currentStream === 'terra',
                'radial-core': currentStream === 'core',
                'radial-chill': currentStream === 'chill',
                'radial-cdp': currentStream === 'cdp',
                 
            }"  :style="{ display: overlay0 ? 'flex' : 'none' }"
             ></div>
<div id="overlay1" class="overlay flicker" :style="{ display: overlay1 ? 'flex' : 'none' }"></div>
<div id="overlay2" class="overlay noise" :style="{ display: overlay2 ? 'flex' : 'none' }"></div>
<div id="overlay3" class="overlay scanlines" :style="{ display: overlay3 ? 'flex' : 'none' }"></div>
<div id="overlay4" class="overlay scanline" :style="{ display: overlay4 ? 'flex' : 'none' }"></div>
<div id="overlay5" class="overlay scanline2" :style="{ display: overlay5 ? 'flex' : 'none' }"></div>
    <!-- Site header --> 
    <Header />
    <!-- Page content -->
    <main class="my-20 grow">
      <NuxtPage />
    </main>
    <!-- Site footer -->
    <BtnTakeMeHome/>
    <div>
  </div>
    <div class="footercurves_sxvx_style_ hidden dark:block"></div>
    <div class="footercurves_sxvx_style_light_ block dark:hidden"></div>
    <Footer />
    <div class="hidden playerContainer">
      <Player />
    </div>
    <ClientOnly>
      <Art />
    </ClientOnly>
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

<!-- <div class="snowflakes-container" :style="{ display: christmas === 'true' ? 'block' : 'none' }"><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div></div>
<ul class="lightrope" :style="{ display: christmas === 'true' ? 'block' : 'none' }">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul> -->
<Analytics/>
</template>
<script setup defer>
import { Analytics } from '@vercel/analytics/nuxt'
import { initPlayerStore } from '@/stores/initPlayer';
import { useAzuracastData } from '@/stores/stationData';
import { useOmfmData } from '@/stores/stationData_omfm';
const useInitPlayerStore = initPlayerStore();
const np_ac = useAzuracastData();
const np_omfm = useOmfmData();
import { useEffectsStore } from '@/stores/effects';
const effectsStore = useEffectsStore();
const overlay0 = computed(() => effectsStore.overlay0); 
const overlay1 = computed(() => effectsStore.overlay1); 
const overlay2 = computed(() => effectsStore.overlay2); 
const overlay3 = computed(() => effectsStore.overlay3); 
const overlay4 = computed(() => effectsStore.overlay4); 
const overlay5 = computed(() => effectsStore.overlay5); 
onMounted(() => {
useInitPlayerStore.loadLocalStorageHLS('hls', () => {
    useInitPlayerStore.initPlayer();
  });
np_ac.connectToSSE(); 
np_omfm.connectToSSE();
const playerContainer = document.querySelector('.playerContainer');
playerContainer.classList.remove('hidden');
});
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
// import { useChristmasStore } from '@/stores/christmasStore';
// const changeChristmasState = useChristmasStore();
// const christmas = computed(() => changeChristmasState.christmas); 
// onMounted(() => {
// changeChristmasState.loadChristmasState();
// });
// Uncomment if not using pinia Coockie storage
onMounted(() => {
useCurrentStreamStore.loadStreamName();
effectsStore.loadOverlayLocalStorage('overlay0');
effectsStore.loadOverlayLocalStorage('overlay1');
effectsStore.loadOverlayLocalStorage('overlay2');
effectsStore.loadOverlayLocalStorage('overlay3');
effectsStore.loadOverlayLocalStorage('overlay4');
effectsStore.loadOverlayLocalStorage('overlay5');
effectsStore.loadOverlayLocalStorage('artBackground');
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
