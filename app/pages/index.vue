<template>
<section>
<SwiperTopStations class="" />
<TextGreeting />
<div class="mt-5 pt-5 ms-5 sm:ms-3 ps-0 sm:px-2 md:ms-10 text-xl bold">
<h2>All stations</h2>
</div>

  <div  class="mx-5 md:grid lg:mx-10 md:mx-10 sm:mx-3 sm:px-2 mt-5 grid max-w-none gap-x-10 gap-y-5 lg:max-w-none sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
  <div  :class="{
                'border border-indigo-500/50': currentStream === 'stream',
            }" 
  class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover brightness-75 hover:brightness-100 " src="/omfm.jpg" />
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
    <div 
    :class="{
                'border border-red-500/50': currentStream === 'rock',
            }" 
    class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover brightness-75 hover:brightness-100" src="/rock.webp" />
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
  <div :class="{
                'border border-green-500/50': currentStream === 'coma',
               }" 
  class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover brightness-75 hover:brightness-100" src="/coma.jpg" />
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
  <div :class="{
                'border border-zinc-500/50': currentStream === 'core',
               }" 
  class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover brightness-75 hover:brightness-100" src="/core_sm.png" />
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
  <div :class="{
                'border border-blue-500/50': currentStream === 'terra',
               }" 
  class="flex relative flex-col   overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover brightness-75 hover:brightness-100" src="/terra.jpg" />
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
  <div :class="{
                'border border-pink-500/50': currentStream === 'chill',
               }" 
  class="flex relative flex-col   overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover brightness-75 hover:brightness-100" src="/static/img/station/chill/chill.jpg" />
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
  <div  :class="{
                'border border-yellow-500/50': currentStream === 'cdp',
            }" 
  class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
     <img class="h-full w-full object-cover brightness-50 hover:brightness-75 " src="/cdp.png" />
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
</div>

</section>
</template>

<script setup>
const localePath = useLocalePath()

import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
 
import { currentStreamStore } from '@/stores/currentStream'; // Import the store
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream


</script>
<style scoped>
.header {
  background: black!important;
}
</style>