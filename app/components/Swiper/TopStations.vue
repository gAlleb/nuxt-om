<template>
<section>
<div class="mt-2 ms-5 pt-3 sm:ms-3 ps-0 sm:ps-2 md:ms-10 text-xl bold">
<h2>Top stations
<div class="hidden dark:inline-flex"><sup><svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 -5 24 24" style="fill: rgba(255, 255, 255, 0.8);transform: ;msFilter:;"><path d="M17 11H7V7l-5 5 5 5v-4h10v4l5-5-5-5z"></path></svg>
</sup></div>
<div class="inline-flex dark:hidden"><sup><svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 -5 24 24" style="fill: rgba(100, 100, 100, 0.8);transform: ;msFilter:;"><path d="M17 11H7V7l-5 5 5 5v-4h10v4l5-5-5-5z"></path></svg>
</sup></div>
</h2>  
</div>
<div class="my-5" style="mask-image: linear-gradient(90deg,transparent 1%,#000 4%,#000 96%,transparent 99%);">
  <div v-if="!swiperInitialized" class="swiper-placeholder">
      <div class="loading-indicator-container">
        <div class="loading-indicator"></div>
      </div>
    </div>
  <ClientOnly>
  <swiper-container class="mt-5 topStations" ref="containerRef" 
            :freeMode="true"  
            :mouseWheel="true"  
            :spaceBetween="20" 
            :init="false"
            >
             
     
    <swiper-slide
      v-for="(s, i) in stations"
      :key="s.id"
      :class="[
        i === 0 ? 'ms-5 sm:ms-3 ps-0 sm:ps-2 md:ms-10' : 'rounded-3xl overflow-hidden ps-0 sm:ps-0',
        i === 1 ? 'ms-1.5' : '',
        i === stations.length - 1 ? 'me-2' : '',
      ]"
      style="height:150px; width: 266px!important">
      <div
        :class="currentStream === s.id ? s.look.accent : ''"
        class="relative overflow-hidden rounded-3xl shadow-lg" style="height:150px; width: 266px">
        <div class="flex-shrink-0 overflow-hidden">
          <img :src="s.images.card" :alt="s.text.menu" :class="s.look.dimmed ? 'brightness-50' : 'brightness-75'" class="h-full w-full object-cover" />
        </div>
        <button
          class="flex absolute right-4 top-4 bg-zinc-500 bg-opacity-50 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset focus:ring-offset-gray-800 p-2"
          :class="{ 'glowing-text': currentStream === s.id }"
          @click="useInitPlayerStore.togglePlay(s.id)">
          <Icon name="heroicons-solid:play" class="h-7 w-7 bg-white" :class="{ hidden: useInitPlayerStore.isPlayingId(s.id) }" aria-hidden="true" />
          <Icon name="heroicons-solid:stop" class="h-7 w-7 bg-red-500" :class="{ hidden: !useInitPlayerStore.isPlayingId(s.id) }" aria-hidden="true" />
          <span class="content-center text-zinc-100">&nbsp;{{ s.text.menu }}</span>
        </button>
        <NuxtLink :to="localePath(`/streams/${s.slug}`)" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">
          <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
            {{ s.text.card }}
          </span>
          <br/>
          <span class="text-sm text-zinc-300 drop-shadow-lg">{{ s.text.tagline }}</span>
        </NuxtLink>
      </div>
    </swiper-slide>
    <swiper-slide  style="height:150px; width: 20px!important">
    </swiper-slide>
 
  </swiper-container>
   
  </ClientOnly>
  </div>
</section>
</template>
<script setup>
const localePath = useLocalePath()
const colorMode = useColorMode()
const isDarkMode = (colorMode.value === 'dark')
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
import { stations } from '~/config/stations';
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
const containerRef = ref(null)
const swiper1 = useSwiper(containerRef, {
loop: false,
slidesPerView: 'auto',
navigation: false,
scrollbar: false,
})
const swiperInitialized = computed(() => containerRef.value); //Efficiently check if swiper is initialized
</script>
<style scoped>
.swiper-scrollbar  {opacity:0!important;}
.swiper-scrollbar .swiper-scrollbar-horizontal:hover {opacity:1;}
.topStations .swiper-button-prev {color:white!important}
.swiper-placeholder {
  height: 150px; 
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-indicator-container {
  width: 100%;  
  height: 100%; 
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-indicator {
  width: 80%; 
  height: 20px;
  border-radius: 10px;
  animation: loading-animation 1.5s ease-in-out infinite;
  background-color: #f2eee6; 
  transition: background-color 0.3s ease;
}
@keyframes loading-animation {
  0% { width: 0%; }
  50% { width: 100%; }
  100% { width: 0%; }
}
.dark .loading-indicator {
  background-color: #2B3035; /* Dark mode color */
}
.swiper-placeholder{
    background-color: rgba(242, 238, 230, 0.2);  
}
.dark .swiper-placeholder {
  background-color: rgba(43, 48, 53, 0.2); 
}
</style>