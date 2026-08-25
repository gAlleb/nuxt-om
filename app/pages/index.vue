<template>
<section>
<SwiperTopStations class="" />
<TextGreeting />
<div class="mt-5 pt-5 ms-5 sm:ms-3 ps-0 sm:px-2 md:ms-10 text-xl bold">
<h2>All stations</h2>
</div>

  <div  class="mx-5 md:grid lg:mx-10 md:mx-10 sm:mx-3 sm:px-2 mt-5 grid max-w-none gap-x-10 gap-y-5 lg:max-w-none sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
  <div
    v-for="s in stations"
    :key="s.id"
    :class="currentStream === s.id ? s.look.accent : ''"
    class="flex relative flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
    <div class="flex-shrink-0 overflow-hidden">
      <img
        :src="s.images.card"
        :alt="s.text.menu"
        :class="s.look.dimmed ? 'brightness-50 hover:brightness-75' : 'brightness-75 hover:brightness-100'"
        class="h-full w-full object-cover" />
    </div>
    <button
      class="flex absolute right-4 top-4 bg-zinc-500 bg-opacity-50 rounded-full transitio-all duration-500 ease-in-out ring-2 ring-white text-sm focus:outline-none focus:ring-white focus:ring-2 focus:ring-offset focus:ring-offset-gray-800 p-2"
      :class="{ 'glowing-text': currentStream === s.id }"
      @click="useInitPlayerStore.togglePlay(s.id)">
      <Icon
        name="heroicons-solid:play"
        class="h-7 w-7 bg-white"
        :class="{ hidden: useInitPlayerStore.isPlayingId(s.id) }"
        aria-hidden="true" />
      <Icon
        name="heroicons-solid:stop"
        class="h-7 w-7 bg-red-500"
        :class="{ hidden: !useInitPlayerStore.isPlayingId(s.id) }"
        aria-hidden="true" />
      <span class="content-center text-zinc-100">&nbsp;{{ s.text.menu }}</span>
    </button>
    <NuxtLink
      :to="localePath(`/streams/${s.slug}`)"
      class="absolute bottom-3 left-5 text-2xl text-zinc-600 dark:text-zinc-100 group transition-all duration-300 ease-in-out">
      <span class="text-zinc-300 bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
        {{ s.text.card }}
      </span>
      <br/>
      <span class="text-sm text-zinc-300 drop-shadow-lg">{{ s.text.tagline }}</span>
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
import { stations } from '~/config/stations';
const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream


</script>
<style scoped>
.header {
  background: black!important;
}
</style>