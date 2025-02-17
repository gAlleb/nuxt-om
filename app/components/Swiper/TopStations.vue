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
             
     
    <swiper-slide class=" ms-5 sm:ms-3  ps-0 sm:ps-2 md:ms-10" style="height:150px; width: 266px!important" >
      <div  :class="{
                  'border border-indigo-500/50': currentStream === 'stream',
              }" 
    class=" relative overflow-hidden rounded-3xl shadow-lg" style="height:150px; width: 266px">
      <div class="flex-shrink-0 overflow-hidden">
       <img class="h-full w-full object-cover brightness-75" src="/omfm.jpg" />
      </div>
      <button 
          class="flex absolute right-4 top-4 bg-zinc-500 bg-opacity-50 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
          @click="useInitPlayerStore.togglePlay('stream')"
          :class="{
                  'glowing-text': currentStream === 'stream',
              }" 
        >
          <Icon
            name="heroicons-solid:play"
            class="h-7 w-7 bg-white"            :class="{
                  '': !useInitPlayerStore.isPlayingStream,
                  'hidden': useInitPlayerStore.isPlayingStream,
              }" 
            aria-hidden="true"
          />
          <Icon
            name="heroicons-solid:stop"
            class="h-7 w-7 bg-red-500"            :class="{
                  'hidden': !useInitPlayerStore.isPlayingStream,
                  '': useInitPlayerStore.isPlayingStream,
              }" 
            aria-hidden="true"
          />
          <span class="content-center text-zinc-100">&nbsp;omFM Main</span>
        </button>
        <NuxtLink  :to="localePath('/streams/omfm')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
          <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          omFM
          </span>
          <br/>
          <span class="text-sm text-zinc-300 drop-shadow-lg">meditative, mantras, instrumental</span>
        </NuxtLink>
    </div>
  </swiper-slide>
  <swiper-slide class="rounded-3xl overflow-hidden ms-1.5 ps-0 sm:ps-0" style="height:150px; width: 266px!important">
      <div 
      :class="{
                  'border border-red-500/50': currentStream === 'rock',
              }" style="height:150px; width: 266px!important"
      class="  relative  overflow-hidden rounded-3xl">
      <div class="flex-shrink-0 overflow-hidden">
       <img class="h-full w-full object-cover brightness-75" src="/rock.webp" />
      </div>
      <button 
          class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
          @click="useInitPlayerStore.togglePlay('rock')"
          :class="{
                  'glowing-text': currentStream === 'rock',
              }" 
        >
          <Icon
            name="heroicons-solid:play"
            class="h-7 w-7 bg-white"            :class="{
                  '': !useInitPlayerStore.isPlayingRock,
                  'hidden': useInitPlayerStore.isPlayingRock,
              }" 
            aria-hidden="true"
          />
          <Icon
            name="heroicons-solid:stop"
            class="h-7 w-7 bg-red-500"            :class="{
                  'hidden': !useInitPlayerStore.isPlayingRock,
                  '': useInitPlayerStore.isPlayingRock,
              }" 
            aria-hidden="true"
          />
          <span class="content-center text-zinc-100">&nbsp;Rock @ omFM</span>
        </button>
        <NuxtLink  :to="localePath('/streams/rock')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
          <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          Rock
          </span>
          <br/>
          <span class="text-sm text-zinc-300">heavy stuff and more</span>
        </NuxtLink>
    </div>
  </swiper-slide>
    <swiper-slide class="rounded-3xl overflow-hidden ps-0 sm:ps-0" style="height:150px; width: 266px!important">
    <div :class="{
                  'border border-green-500/50': currentStream === 'coma',
                 } "style="height:150px; width: 266px!important"
    class="  relative   overflow-hidden rounded-3xl">
      <div class="flex-shrink-0 overflow-hidden">
       <img class="h-full w-full object-cover brightness-75" src="/coma.jpg" />
      </div>
      <button 
          class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
          @click="useInitPlayerStore.togglePlay('coma')"
          :class="{
                  'glowing-text': currentStream === 'coma',
              }" 
        >
          <Icon
            name="heroicons-solid:play"
            class="h-7 w-7 bg-white"            :class="{
                  '': !useInitPlayerStore.isPlayingComa,
                  'hidden': useInitPlayerStore.isPlayingComa,
              }" 
            aria-hidden="true"
          />
          <Icon
            name="heroicons-solid:stop"
            class="h-7 w-7 bg-red-500"            :class="{
                  'hidden': !useInitPlayerStore.isPlayingComa,
                  '': useInitPlayerStore.isPlayingComa,
              }" 
            aria-hidden="true"
          />
          <span class="content-center text-zinc-100">&nbsp;Coma @ omFM</span>
        </button>
        <NuxtLink  :to="localePath('/streams/coma')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
          <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          Coma
          </span>
          <br/>
          <span class="text-sm text-zinc-300">ambient, drone, field recordings</span>
        </NuxtLink>
    </div>
  </swiper-slide>
  <swiper-slide class="rounded-3xl overflow-hidden ps-0 sm:ps-0" style="height:150px; width: 266px!important">
    <div :class="{
                  'border border-zinc-500/50': currentStream === 'core',
                 }" style="height:150px; width: 266px!important"
    class="  relative   overflow-hidden rounded-3xl">
      <div class="flex-shrink-0 overflow-hidden">
       <img class="h-full w-full object-cover brightness-75" src="/core_sm.png" />
      </div>
      <button 
          class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
          @click="useInitPlayerStore.togglePlay('core')"
          :class="{
                  'glowing-text': currentStream === 'core',
              }" 
        >
          <Icon
            name="heroicons-solid:play"
            class="h-7 w-7 bg-white"            :class="{
                  '': !useInitPlayerStore.isPlayingCore,
                  'hidden': useInitPlayerStore.isPlayingCore,
              }" 
            aria-hidden="true"
          />
          <Icon
            name="heroicons-solid:stop"
            class="h-7 w-7 bg-red-500"            :class="{
                  'hidden': !useInitPlayerStore.isPlayingCore,
                  '': useInitPlayerStore.isPlayingCore,
              }" 
            aria-hidden="true"
          />
          <span class="content-center text-zinc-100">&nbsp;CORE @ omFM</span>
        </button>
        <NuxtLink  :to="localePath('/streams/core')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
          <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          CORE
          </span>
          <br/>
          <span class="text-sm text-zinc-300">deathcore, metalcore, hardcore</span>
        </NuxtLink>
    </div>
  </swiper-slide>
  <swiper-slide class="rounded-3xl overflow-hidden ps-0 sm:ps-0" style="height:150px; width: 266px!important" >
    <div :class="{
                  'border border-blue-500/50': currentStream === 'terra',
                 }" style="height:150px; width: 266px!important"
    class="  relative lg:col-start-2  overflow-hidden rounded-3xl">
      <div class="flex-shrink-0 overflow-hidden">
       <img class="h-full w-full object-cover brightness-75" src="/terra.jpg" />
      </div>
      <button 
          class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
          @click="useInitPlayerStore.togglePlay('terra')"
          :class="{
                  'glowing-text': currentStream === 'terra',
              }" 
        >
          <Icon
            name="heroicons-solid:play"
            class="h-7 w-7 bg-white"            :class="{
                  '': !useInitPlayerStore.isPlayingTerra,
                  'hidden': useInitPlayerStore.isPlayingTerra,
              }" 
            aria-hidden="true"
          />
          <Icon
            name="heroicons-solid:stop"
            class="h-7 w-7 bg-red-500"            :class="{
                  'hidden': !useInitPlayerStore.isPlayingTerra,
                  '': useInitPlayerStore.isPlayingTerra,
              }" 
            aria-hidden="true"
          />
          <span class="content-center text-zinc-100">&nbsp;Terra @ omFM</span>
        </button>
        <NuxtLink  :to="localePath('/streams/terra')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
          <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          Terra
          </span>
          <br/>
          <span class="text-sm text-zinc-300">nature, music of the Earth</span>
        </NuxtLink>
    </div>
    </swiper-slide>
    <swiper-slide class="rounded-3xl overflow-hidden ps-0 sm:ps-0" style="height:150px; width: 266px!important" >
    <div :class="{
                  'border border-pink-500/50': currentStream === 'chill',
                 }" style="height:150px; width: 266px!important"
    class="  relative lg:col-start-2  overflow-hidden rounded-3xl">
      <div class="flex-shrink-0 overflow-hidden">
       <img class="h-full w-full object-cover brightness-75" src="/static/img/station/chill/chill.jpg" />
      </div>
      <button 
          class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
          @click="useInitPlayerStore.togglePlay('chill')"
          :class="{
                  'glowing-text': currentStream === 'chill',
              }" 
        >
          <Icon
            name="heroicons-solid:play"
            class="h-7 w-7 bg-white"            :class="{
                  '': !useInitPlayerStore.isPlayingChill,
                  'hidden': useInitPlayerStore.isPlayingChill,
              }" 
            aria-hidden="true"
          />
          <Icon
            name="heroicons-solid:stop"
            class="h-7 w-7 bg-red-500"            :class="{
                  'hidden': !useInitPlayerStore.isPlayingChill,
                  '': useInitPlayerStore.isPlayingChill,
              }" 
            aria-hidden="true"
          />
          <span class="content-center text-zinc-100">&nbsp;Chill @ omFM</span>
        </button>
        <NuxtLink  :to="localePath('/streams/chill')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
          <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          Chill
          </span>
          <br/>
          <span class="text-sm text-zinc-300">future garage, chillstep, ambient</span>
        </NuxtLink>
    </div>
    </swiper-slide>
    <swiper-slide class="rounded-3xl overflow-hidden me-2" style="height:150px; width: 266px!important" >
      <div  :class="{
                  'border border-yellow-500/50': currentStream === 'cdp',
              }" 
    class=" relative overflow-hidden rounded-3xl shadow-lg" style="height:150px; width: 266px">
      <div class="flex-shrink-0 overflow-hidden">
       <img class="h-full w-full object-cover brightness-50" src="/cdp.png" />
      </div>
      <button 
          class="flex absolute right-4 top-4 bg-zinc-500 bg-opacity-50 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
          @click="useInitPlayerStore.togglePlay('cdp')"
          :class="{
                  'glowing-text': currentStream === 'cdp',
              }" 
        >
          <Icon
            name="heroicons-solid:play"
            class="h-7 w-7 bg-white"            :class="{
                  '': !useInitPlayerStore.isPlayingCDP,
                  'hidden': useInitPlayerStore.isPlayingCDP,
              }" 
            aria-hidden="true"
          />
          <Icon
            name="heroicons-solid:stop"
            class="h-7 w-7 bg-red-500"            :class="{
                  'hidden': !useInitPlayerStore.isPlayingCDP,
                  '': useInitPlayerStore.isPlayingCDP,
              }" 
            aria-hidden="true"
          />
          <span class="content-center text-zinc-100">&nbsp;Café de Paris</span>
        </button>
        <NuxtLink  :to="localePath('/streams/cdp')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
          <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          Café de Paris
          </span>
          <br/>
          <span class="text-sm text-zinc-300 drop-shadow-lg">jazz, chanson, Parisian spirit</span>
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