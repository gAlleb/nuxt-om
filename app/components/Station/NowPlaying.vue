<template>
  <section class="mx-3 sm:mx-5 lg:mx-20" :style="{ fontFamily: station.look.font }">
    <div class="justify-center flex mx-auto lg:mx-20">
      <div v-if="data" class="container">
        <h2 class="my-5 text-2xl">Now playing:</h2>

        <div class="ice-player-el">
          <div class="relative">
            <img
              class="rounded-xl w-32 h-32 sm:w-52 sm:h-52 object-cover shadow-2xl cursor-pointer shadow-np dark:shadow-np-dark"
              :src="cover"
              alt="Album Cover"
              @click="openLightbox(cover, 0)" />
            <div
              class="absolute text-muddy-waters-100 text-4xl sm:text-6xl pointer-events-none"
              style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
              {{ getTimeFromTimestamp(nowPlaying.played_at) }}
            </div>
          </div>
          <div class="ms-2 np-main">
            <div
              :style="bg"
              class="px-3 py-1 mb-0 sm:py-4 sm:mb-2 rounded-xl w-full bg-opacity-50 ellipsify shadow-np dark:shadow-np-dark">
              <span class="text-xl sm:text-2xl" :style="{ color: fg.color }">{{ nowPlaying.song.title }}</span><br/>
              <span class="text-lg sm:text-xl" :style="{ color: fg.color }">{{ nowPlaying.song.artist }}</span><br/>
              <span class="text-md sm:text-lg" :style="{ color: fg.color }" style="font-family: monospace">
                {{ loading ? '' : minSec(progress.elapsed) }} / {{ loading ? '' : minSec(progress.duration) }}
              </span>
            </div>
            <div
              class="mt-2 sm:mt-2 text-md sm:text-xl px-2 py-1 sm:py-4 justify-between flex rounded-xl w-full ellipsify shadow-np dark:shadow-np-dark"
              :style="bg">
              <span class="text-sm sm:text-lg inline-flex" :style="{ color: fg.color }">
                Show: {{ playlistName }}
              </span>
              <StationItunesLink :url="collectionUrl" :linked="isItunes" :color="fg.color" />
            </div>
          </div>
        </div>

        <div class="my-2 rounded-xl relative w-full h-5 overflow-hidden shadow-np dark:shadow-np-dark" :style="bg">
          <div
            class="absolute"
            style="height:30px; transition: width 1s linear"
            :style="{ background: fg.color, width: `${progress.width}%` }"></div>
        </div>

        <template v-if="station.showNext && hasPlaylist && playingNext">
          <h2 class="my-5 text-2xl">Next Song:</h2>
          <div class="mt-2 rounded-xl ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-300">
            <div class="relative">
              <img
                v-if="nextCover"
                :src="nextCover"
                alt="History Cover"
                class="history-cover cursor-pointer rounded-l-xl w-24 h-24 sm:w-28 sm:h-28 object-cover"
                @click="openLightbox(nextCover, 0)" />
              <div
                class="absolute text-muddy-waters-100 text-3xl sm:text-4xl pointer-events-none"
                style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                {{ getTimeFromTimestamp(playingNext.played_at_source_value ?? playingNext.played_at) }}
              </div>
            </div>
            <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
              <div class="px-3 py-2 sm:py-2 rounded-xl w-full text-muddy-waters-800 dark:text-muddy-waters-200 ellipsify">
                <span class="text-sm sm:text-md">Show: {{ playingNext.playlist }}</span><hr/>
                <span class="text-xl sm:text-2xl">{{ playingNext.song.title }}</span><br/>
                <span class="text-lg sm:text-xl">{{ playingNext.song.artist }}</span>
              </div>
            </div>
            <div class="me-2">
              <StationItunesLink :url="nextCollectionUrl" :linked="isItunes" />
            </div>
          </div>
        </template>

        <h2 class="my-5 text-2xl">Recent Songs:</h2>
        <ul>
          <li v-for="(item, index) in history" :key="index">
            <div class="mt-3 sm:mt-5 rounded-xl ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200">
              <div class="relative">
                <img
                  v-if="historyCover(index, item)"
                  :src="historyCover(index, item)"
                  alt="History Cover"
                  class="history-cover cursor-pointer rounded-l-xl w-16 h-16 sm:w-20 sm:h-20 object-cover"
                  @click="openLightbox(historyCover(index, item), index)" />
                <div
                  class="absolute text-muddy-waters-100 text-2xl sm:text-3xl pointer-events-none"
                  style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(item.played_at) }}
                </div>
              </div>
              <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full ellipsify">
                  <span class="text-lg sm:text-2xl">{{ item.song.title }}</span><br/>
                  <span class="text-md sm:text-xl">{{ item.song.artist }}</span>
                </div>
              </div>
              <div class="me-2">
                <StationItunesLink :url="historyCollectionUrl(index)" :linked="isItunes" />
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Данных ещё нет: заглушка той же формы, чтобы не прыгала вёрстка -->
      <div v-else class="container">
        <h2 class="my-5 text-2xl">Now playing:</h2>
        <div class="ice-player-el">
          <div class="relative">
            <img class="rounded-xl w-32 h-32 sm:w-52 sm:h-52 object-cover" :src="placeholderCover" alt="Album Cover" />
          </div>
          <div class="ms-2 np-main">
            <div class="px-3 py-2 mb-0 sm:py-6 sm:mb-5 rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200 ellipsify">
              <span class="text-xl sm:text-2xl">loading...</span><br/>
              <span class="text-lg sm:text-xl">loading...</span>
            </div>
            <div class="mt-2 sm:mt-2 text-md sm:text-xl px-3 py-1 sm:py-5 rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200 ellipsify">
              <span class="text-sm sm:text-lg">00:00 / 00:00</span>
            </div>
          </div>
        </div>
        <div class="bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200 bg-opacity-50 my-2 rounded-xl relative w-full h-5 overflow-hidden"></div>
        <h2 class="my-5 text-2xl">Recent Songs:</h2>
        <ul>
          <li v-for="i in station.historyCount" :key="i">
            <div class="mt-3 sm:mt-5 rounded-xl ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200">
              <div class="relative">
                <img :src="placeholderCover" alt="History Cover" class="history-cover rounded-l-xl w-16 h-16 sm:w-20 sm:h-20 object-cover" />
              </div>
              <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full ellipsify">
                  <span class="text-xl sm:text-2xl">loading...</span><br/>
                  <span class="text-lg sm:text-xl">loading...</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <VueEasyLightbox
        :visible="lightboxVisible"
        :imgs="lightboxImages"
        :index="lightboxIndex"
        @hide="lightboxVisible = false" />
    </div>
  </section>
</template>

<script setup>
import { getTimeFromTimestamp, minSec } from '@/composables/time'
import { useNowPlaying } from '~/stores/nowPlaying'
import { providers, placeholderCover } from '~/config/stations'
import { useDominantTheme } from '~/composables/useDominantTheme'

const props = defineProps({
  station: { type: Object, required: true },
})

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
const collectionUrl = computed(() => entry.value?.collectionUrl ?? '#')
// Обложки берём только из стора: он решает, чья картинка победит —
// станции, iTunes или заглушки. Компоненту это знать незачем.
const nextCover = computed(() => entry.value?.nextCoverArt || placeholderCover)
const nextCollectionUrl = computed(() => entry.value?.nextCollectionUrl ?? '#')

const history = computed(() => {
  const from = providers[props.station.provider].historyOffset
  return (data.value?.np?.song_history ?? []).slice(from, from + props.station.historyCount)
})

/** У iTunes-станций обложки истории лежат в сторе, у остальных берутся прямо из данных станции. */
function historyCover(index, item) {
  return entry.value?.historyCoverArt?.[index] || placeholderCover
}
function historyCollectionUrl(index) {
  return entry.value?.historyCollectionUrl?.[index] ?? '#'
}

const { background: bg, text: fg } = useDominantTheme(computed(() => props.station.id))

const lightboxVisible = ref(false)
const lightboxIndex = ref(0)
const lightboxImages = ref([])
const openLightbox = (imageUrl, index) => {
  lightboxImages.value = imageUrl
  lightboxIndex.value = index
  lightboxVisible.value = true
}
</script>
