<template>

  <section>
   <!-- <div class="mx-auto flex max-w-8xl flex-col justify-center rounded-full py-2">
    <h1 class="bg-primary-600 text-7xl font-extrabold text-zinc-900 dark:text-zinc-50">{{ $t('about') }}</h1>
  <UCard>
      <div>
        <p>Count: {{ counter.count }}</p>
        <p>Computed Count: {{ counter.computedCount }}</p>
        <UButton variant="solid" label="add" @click="counter.increment" />
      </div>
    </UCard> 
  </div> -->
    <div class="flex relative overflow-hidden dark:hidden font-tenor" style="background: url('/omfm4-light.jpg') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <div class="indexSliderImg-light"></div>
    <div class="absolute z-10 w-full"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
  
    <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
      About
    </h1>
    <h1 class="text-xl sm:text-xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.6);">
      Here you will find all our streaming URL addresses and playlist files for your media player.<br/>
      Icecast & HLS
    </h1>
  
    </div>
  
  
    </div>
    <div class="hidden relative overflow-hidden dark:flex font-tenor" style="background: url('/omfm4.jpg') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <div class="indexSliderImg"></div>
    <div class="absolute z-10"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
  
  <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
   About
  </h1>
  <h1 class="text-xl sm:text-xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.6);">
    Here you will find all our streaming URL addresses and playlist files for download for your media player.<br/>
    Icecast & HLS
  </h1>
  
  </div>
    </div>
  <div class="mx-5 lg:mx-20 md:mx-10 sm:mx-3 xs:mx-3 mt-5">
  <p class="mb-5">
  omFM:<br/>
  –
  <a href="https://stream.omfm.ru:8443/stream" target="blank">omFM Stream Icecast</a><br/>
  – <a href="https://hls.omfm.ru/stream.m3u8" target="blank">omFM Stream HLS</a><br/>
  </p>
  <hr/>
  <p class="mb-5 mt-5">
  Rock @ omFM:<br/>
  – <a href="https://stream.omfm.ru:8443/rock" target="blank">Rock @ omFM Stream Icecast</a><br/>
  – <a href="https://radio.omfm.ru/hls/radio/live.m3u8" target="blank">Rock @ omFM Stream HLS</a><br/>
  </p>
  <hr/>
  <p class="mb-5 mt-5">
  Coma @ omFM:<br/>
  – <a href="https://stream.omfm.ru:8443/coma" target="blank">Coma @ omFM Stream Icecast</a><br/>
  – <a href="https://radio.omfm.ru/hls/coma/live.m3u8" target="blank">Coma @ omFM Stream HLS</a><br/>
  </p>
  <hr/>
  <p class="mb-5 mt-5">
  CORE @ omFM:<br/>
  – <a href="https://stream.omfm.ru:8443/core" target="blank">CORE @ omFM Stream Icecast</a><br/>
  – <a href="https://radio.omfm.ru/hls/core/live.m3u8" target="blank">CORE @ omFM Stream HLS</a><br/>
  </p>
  <hr/>
  <p class="mb-5 mt-5">
  Terra @ omFM:<br/>
  – <a href="https://stream.omfm.ru:8443/terra" target="blank">Terra @ omFM Stream Icecast</a><br/>
  – <a href="https://radio.omfm.ru/hls/terra/live.m3u8" target="blank">Terra @ omFM Stream HLS</a><br/>
  </p>
  <hr/>
  <p class="mb-5 mt-5">
  Chill @ omFM:<br/>
  – <a href="https://stream.omfm.ru:8443/chill" target="blank">Chill @ omFM Stream Icecast</a><br/>
  – <a href="https://radio.omfm.ru/hls/chill/live.m3u8" target="blank">Chill @ omFM Stream HLS</a><br/>
  </p>
  <p class="mb-5 mt-5">
  Café de Paris @ omFM:<br/>
  – <a href="https://stream.omfm.ru:8443/cdp" target="blank">Café de Paris @ omFM Stream Icecast</a><br/>
  – <a href="https://hls.omfm.ru/cdp.m3u8" target="blank">Café de Paris @ omFM Stream HLS</a><br/>
  </p>
</div>

  </section>
 
</template>

<script setup lang="ts">
const counter = useCounterStore()

</script>