<template>
  <div class="flex min-h-screen flex-col overflow-hidden bg-sxvx-light-bg text-zinc-700 dark:text-zinc-200 dark:bg-sxvx-dark-bg"
  :class="{
                'font-tenor': currentStream === 'omFM Main',
                'font-metal': currentStream === 'Rock @ omFM',
                'font-UNSCII': currentStream === 'Coma @ omFM',
            }"
    >
<div id="overlay0" class="overlay  "  :class="{
                'radial': currentStream === 'omFM Main',
                'radial2': currentStream === 'Rock @ omFM',
                'radial3': currentStream === 'Coma @ omFM',
            }"
             style="display: flex;"></div>
<div id="overlay1" class="overlay flicker" style="display: flex;"></div>
<div id="overlay2" class="overlay noise" style="display: flex;"></div>
<div id="overlay3" class="overlay scanlines" style="display: flex;"></div>
<div id="overlay4" class="overlay scanline" style="display: flex;"></div>
<div id="overlay5" class="overlay scanline2" style="display: flex;"></div>

    <!-- Site header --> 
    <Header />
    
    <!-- Page content -->
    <main class="my-24 grow">
      <NuxtPage />
    </main>
    <!-- Site footer -->
    <BuyMeCoffee />
    
    <div class="footercurves_sxvx_style_ hidden dark:block"></div>
    <div class="footercurves_sxvx_style_light_ block dark:hidden"></div>
    <Footer />
    <Player />

    

  </div>
  <!-- <iframe
      src="https://coma.omfm.ru"
      width="100%"
      height="100%"
      style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:1;"
      frameborder="0"
      scrolling="no"
    ></iframe> -->
</template>

<script setup defer>
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream

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
