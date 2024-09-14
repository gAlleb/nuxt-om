<template>
<section>
  <div  data-aos="fade-down"  class="md:hidden">
  <swiper


    :modules="[SwiperNavigation,SwiperEffectCoverflow,SwiperPagination]"
    :slides-per-view="1"
    :navigation="true"
    :loop="true"
    :space-between="80"
    :effect="'coverflow'"
  
    id="indexSlider"
    

    

  >
    <swiper-slide>
      <div class="flex  relative flex-col overflow-hidden  shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full  object-cover transition-all duration-1000 brightness-75 hover:brightness-100  hover:scale-110" src="/omfm.jpg" />
    </div>
    <button 
        class="flex absolute right-4 top-4 bg-zinc-500 bg-opacity-50 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('stream')"
        :class="{
                'glowing-text': currentStream === 'omFM Main',
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
      <NuxtLink  :to="localePath('/omfm')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
        <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
        omFM
        </span>
        <br/>
        <span class="text-sm text-zinc-300 drop-shadow-lg">meditative, mantras, instrumental</span>
      </NuxtLink>
  </div>
    </swiper-slide>
    <swiper-slide> <div class="flex relative flex-col overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full  object-cover transition-all duration-1000 brightness-75 hover:brightness-100  hover:scale-110" src="/rock.webp" />
    </div>
    <button 
        class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('rock')"
        :class="{
                'glowing-text': currentStream === 'Rock @ omFM',
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
      <NuxtLink  :to="localePath('/rock')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
        <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
        Rock
        </span>
        <br/>
        <span class="text-sm text-zinc-300">heavy stuff and more</span>
      </NuxtLink>
  </div>
</swiper-slide>
    <swiper-slide> <div class="flex relative flex-col overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover transition-all duration-1000 brightness-75 hover:brightness-100  hover:scale-110" src="/coma.jpg" />
    </div>
    <button 
        class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('coma')"
        :class="{
                'glowing-text': currentStream === 'Coma @ omFM',
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
      <NuxtLink  :to="localePath('/coma')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
        <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
        Coma
        </span>
        <br/>
        <span class="text-sm text-zinc-300">ambient, drone, field recordings</span>
      </NuxtLink>
  </div>
</swiper-slide>

  </swiper>
</div>
  <div  data-aos="fade-down" class="hidden md:flex mx-auto lg:mx-10 md:mx-5 sm:mx-3 mt-5 grid max-w-none gap-5 lg:max-w-none sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
  <div class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover transition-all duration-1000 brightness-75 hover:brightness-100  hover:scale-110" src="/omfm.jpg" />
    </div>
    <button 
        class="flex absolute right-4 top-4 bg-zinc-500 bg-opacity-50 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('stream')"
        :class="{
                'glowing-text': currentStream === 'omFM Main',
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
      <NuxtLink  :to="localePath('/omfm')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
        <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
        omFM
        </span>
        <br/>
        <span class="text-sm text-zinc-300 drop-shadow-lg">meditative, mantras, instrumental</span>
      </NuxtLink>
  </div>
  <div class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover transition-all duration-1000 brightness-75 hover:brightness-100  hover:scale-110" src="/rock.webp" />
    </div>
    <button 
        class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('rock')"
        :class="{
                'glowing-text': currentStream === 'Rock @ omFM',
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
      <NuxtLink  :to="localePath('/rock')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
        <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
        Rock
        </span>
        <br/>
        <span class="text-sm text-zinc-300">heavy stuff and more</span>
      </NuxtLink>
  </div>
  <div class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover transition-all duration-1000 brightness-75 hover:brightness-100  hover:scale-110" src="/coma.jpg" />
    </div>
    <button 
        class="flex right-4 top-4 absolute bg-zinc-500 bg-opacity-50 right-5 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
        @click="useInitPlayerStore.togglePlay('coma')"
        :class="{
                'glowing-text': currentStream === 'Coma @ omFM',
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
      <NuxtLink  :to="localePath('/coma')" class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">        
        <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
        Coma
        </span>
        <br/>
        <span class="text-sm text-zinc-300">ambient, drone, field recordings</span>
      </NuxtLink>
  </div>
</div>

</section>
</template>

<script setup>
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
 
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream

</script>
<style scoped>

</style>