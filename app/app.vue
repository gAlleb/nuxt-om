<template>
<!-- <UtilsPreloader /> -->
<NuxtLayout>
<NuxtLoadingIndicator color="#ef4444"/>
<div class="station-font flex min-h-screen flex-col overflow-hidden bg-sxvx-light-bg text-zinc-700 dark:text-zinc-200 dark:bg-sxvx-dark-bg">
<div id="overlay0" class="overlay"></div>
<div id="overlay1" class="overlay flicker"></div>
<div id="overlay2" class="overlay noise"></div>
<div id="overlay3" class="overlay scanlines"></div>
<div id="overlay4" class="overlay scanline"></div>
<div id="overlay5" class="overlay scanline2"></div>
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

<!-- 
<div class="snowflakes-container" :style="{ display: christmas === 'true' ? 'block' : 'none' }"><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div><div class="snowflake"></div></div>
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
</ul>
-->
<Analytics/>
</template>
<script setup defer>
import { Analytics } from '@vercel/analytics/nuxt'
import { initPlayerStore } from '@/stores/initPlayer';
import { useNowPlaying } from '~/stores/nowPlaying';
import { applyStreamAttribute, applyEffectsAttribute, applyPlayerVisibility } from '~/utils/settings';
const useInitPlayerStore = initPlayerStore();
const np = useNowPlaying();
import { useEffectsStore } from '@/stores/effects';
const effectsStore = useEffectsStore();
onMounted(() => {
useInitPlayerStore.loadLocalStorageHLS('hls', () => {
    useInitPlayerStore.initPlayer();
  });
np.connectAll();
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
//   changeChristmasState.loadChristmasState();
// });
// Настройки поднимаются в сторы после гидратации; на вид страницы они уже
// применены атрибутами <html>, поэтому мигания дефолтом нет.
onMounted(() => {
  useCurrentStreamStore.loadStreamName();
  effectsStore.loadFromStorage();
});

// Держим атрибуты <html> в согласии со сторами.
watch(() => useCurrentStreamStore.currentStream, (id) => applyStreamAttribute(id));
watch(() => effectsStore.$state, (fx) => applyEffectsAttribute(fx), { deep: true });
watch(() => useInitPlayerStore.playerVisible, (v) => applyPlayerVisibility(v));
// Define the details for the card
const title = 'omFM.ru - The only radio out there, that sucks less'
const description = 'Discover the best streams and New Year Special on ROCK stream.'
// IMPORTANT: This must be your actual live domain
const siteUrl = 'https://omfm.ru' 
const image = `${siteUrl}/seo.jpg`

useSeoMeta({
  // Basic SEO
  title: title,
  description: description,

  // Open Graph (Facebook, WhatsApp, Discord)
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogUrl: siteUrl,
  ogType: 'website',

  // Twitter / X (Twitter Cards)
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  twitterCard: 'summary_large_image', // Makes the image large
})
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
