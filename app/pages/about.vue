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
  <div class="mx-5 lg:mx-20 md:mx-10 sm:mx-3 xs:mx-3 mt-8 space-y-4">
    <div
      v-for="s in stations"
      :key="s.id"
      :class="s.look.accent"
      class="border-l-4 rounded-xl p-4">

      <!-- Название своим шрифтом станции + что звучит прямо сейчас -->
      <div class="flex items-baseline justify-between gap-3 flex-wrap">
        <div>
          <NuxtLink :to="localePath(`/streams/${s.slug}`)" class="hover:underline">
            <span :style="{ fontFamily: s.look.font }" class="text-2xl sm:text-3xl">{{ s.text.hero }}</span>
          </NuxtLink>
          <span class="ms-2 text-sm opacity-60">{{ s.text.tagline }}</span>
        </div>
        <span class="text-sm opacity-70 ellipsify">{{ onAir(s) }}</span>
      </div>

      <div class="mt-3 space-y-1">
        <StationAddress label="Icecast" :url="s.icecast" :playlist="playlistPath(s, 'icecast')" />
        <StationAddress label="HLS" :url="s.hls" :playlist="playlistPath(s, 'hls')" />
      </div>
    </div>

    <p class="pt-2 text-sm opacity-70">
      Все станции одним файлом:
      <a href="/playlists/omfm-all.m3u" download class="underline">Icecast</a> ·
      <a href="/playlists/omfm-all-hls.m3u" download class="underline">HLS</a>
    </p>
  </div>

  </section>
 
</template>

<script setup lang="ts">
import { stations, type Station } from '~/config/stations'
import { playlistPath } from '~/config/playlists'
import { useNowPlaying } from '~/stores/nowPlaying'

const localePath = useLocalePath()
const np = useNowPlaying()

/** Что звучит на станции прямо сейчас — данные уже приходят по SSE. */
function onAir(station: Station) {
  const song = np.byId[station.id]?.data?.np?.now_playing?.song
  return song ? `${song.artist} — ${song.title}` : ''
}
</script>
