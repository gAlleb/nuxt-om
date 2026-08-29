<template>
  <div class="justify-center flex mx-auto mb-2" :style="{ fontFamily: station.look.font }">
    <div v-if="data" class="container">
      <h2 class="text-lg mb-3 text-white">Show: {{ playlistName }}</h2>

      <div class="content-center">
        <div class="mx-3">
          <div class="relative w-full">
            <img
              class="rounded-xl h-auto w-full shadow-2xl cursor-pointer"
              :src="cover"
              alt="Album Cover"
              @click="emit('lightbox', cover, 0)" />
            <div class="absolute bg-sxvx-dark-bg bottom-0 rounded-b-xl w-full h-5 overflow-hidden">
              <div
                class="absolute bg-muddy-waters-400"
                style="height:20px; transition: width 1s linear"
                :style="{ width: `${progress.width}%` }"></div>
            </div>
            <span class="text-white ms-2 absolute bottom-0 left-0" style="font-family: monospace">
              {{ loading ? '' : minSec(progress.elapsed) }}
            </span>
            <span class="text-white absolute me-2 bottom-0 right-0" style="font-family: monospace">
              {{ loading ? '' : minSec(progress.duration) }}
            </span>
            <div
              class="absolute text-muddy-waters-100 text-8xl pointer-events-none"
              style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
              {{ getTimeFromTimestamp(nowPlaying.played_at) }}
            </div>
          </div>
        </div>
        <div class="ms-2">
          <div class="px-3 text-center mb-0 py-3 rounded-xl w-full text-muddy-waters-200 bg-opacity-50">
            <span class="text-lg">{{ nowPlaying.song.title }}</span><br/>
            <span class="text-md">{{ nowPlaying.song.artist }}</span><br/>
            <span class="text-md">Album: {{ nowPlaying.song.album }}</span>
          </div>
        </div>
      </div>

      <hr/>

      <template v-if="station.showNext && hasPlaylist && playingNext">
        <h2 class="my-3 text-lg text-white">Next Song:</h2>
        <div class="mt-3 mb-5 rounded-xl ice-player-el text-muddy-waters-300">
          <div class="relative">
            <img
              v-if="nextCover"
              :src="nextCover"
              alt="History Cover"
              class="history-cover cursor-pointer rounded-xl h-auto w-24"
              @click="emit('lightbox', nextCover, 0)" />
            <div
              class="absolute text-muddy-waters-100 text-4xl pointer-events-none"
              style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
              {{ getTimeFromTimestamp(playingNext.played_at_source_value ?? playingNext.played_at) }}
            </div>
          </div>
          <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
            <div class="px-3 rounded-xl w-full text-muddy-waters-200 ellipsify">
              <span class="text-sm">Show: {{ playingNext.playlist }}</span><hr/>
              <span class="text-lg">{{ playingNext.song.title }}</span><br/>
              <span class="text-md">{{ playingNext.song.artist }}</span>
            </div>
          </div>
        </div>
        <hr/>
      </template>

      <h2 class="text-lg mt-3 text-white">Recent Songs:</h2>
      <ul>
        <li v-for="(item, index) in history" :key="index">
          <div class="mt-3 sm:mt-5 rounded-xl ice-player-el text-muddy-waters-200">
            <div class="relative">
              <img
                v-if="historyCover(index, item)"
                :src="historyCover(index, item)"
                alt="History Cover"
                class="history-cover cursor-pointer rounded-xl h-auto w-24"
                @click="emit('lightbox', historyCover(index, item), index)" />
              <div
                class="absolute text-muddy-waters-100 text-4xl pointer-events-none"
                style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                {{ getTimeFromTimestamp(item.played_at) }}
              </div>
            </div>
            <div style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
              <div class="px-3 py-0 sm:py-2 rounded-xl w-full ellipsify">
                <span class="text-lg">{{ item.song.title }}</span><br/>
                <span class="text-md">{{ item.song.artist }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { getTimeFromTimestamp, minSec } from '@/composables/time'
import { useNowPlaying } from '~/stores/nowPlaying'
import { providers, placeholderCover } from '~/config/stations'

const props = defineProps({
  station: { type: Object, required: true },
})
const emit = defineEmits(['lightbox'])

const np = useNowPlaying()
const entry = computed(() => np.byId[props.station.id])

const data = computed(() => entry.value?.data)
const nowPlaying = computed(() => data.value?.np?.now_playing)
const playingNext = computed(() => data.value?.np?.playing_next)
const progress = computed(() => entry.value?.progress ?? { elapsed: 0, duration: 0, width: 0 })
const loading = computed(() => np.loadingByProvider[props.station.provider])

const isItunes = computed(() => props.station.artSource === 'itunes')
const hasPlaylist = computed(() => nowPlaying.value?.playlist !== '')
const playlistName = computed(() => {
  const name = nowPlaying.value?.playlist
  return name !== '' ? name : (props.station.text.playlistFallback ?? name)
})

const cover = computed(() => entry.value?.coverArt ?? placeholderCover)
const nextCover = computed(() =>
  isItunes.value ? entry.value?.nextCoverArt : playingNext.value?.song?.art,
)

const history = computed(() => {
  const from = providers[props.station.provider].historyOffset
  return (data.value?.np?.song_history ?? []).slice(from, from + props.station.historyCount)
})

function historyCover(index, item) {
  return isItunes.value ? entry.value?.historyCoverArt?.[index] : item.song.art
}
</script>
