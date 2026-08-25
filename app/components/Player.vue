<template>
<section>
    <div class="icecast_player ice-player fixed transition duration-300 ease-in-linear" id="ice-player" style="z-index:30;">
    <div class="icecast_player ice-player fixed backdrop-blur-[1rem] transition-all duration-[1500ms]" style="z-index:30;"
    :style="bg">
        <div class="ice-player-el mb-5">
            <div>
                <button style="padding: 8px;" class="flex rounded-xl transitio-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 " @click="useInitPlayerStore.togglePlayAll()"  >
                    <Icon id="playBtnPlayer" name="heroicons-solid:play" class="h-6 w-6 bg-green-500" aria-hidden="true" :class="[useInitPlayerStore.isPlaying ? 'hidden' : '']" />
                    <Icon id="stopBtnPlayer" name="heroicons-solid:stop" class="h-6 w-6 bg-red-500" aria-hidden="true" :class="[useInitPlayerStore.isPlaying ? '' : 'hidden']" />
                </button>
            </div>
            <div class="relative">
            <button id="mainVolumeBtn" style="padding: 5px;top: -20px;" class="absolute z-10 ml-2 inline-flex  items-center  rounded-xl transitio-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800"
              @mouseenter="openMainVolume"
              @mouseleave="scheduleCloseMainVolume">
                    <a id="show_volume_xs" class="mute speaker" title="mute/unmute"
                       :class="{ muted: useInitPlayerStore.muted, open_volume: verticalVolumeOpen }"
                       @click="onSpeakerClick"
                       @mouseenter="verticalVolumeOpen = true"><span></span></a>
                     </button>
            </div>
            <PlayerVolumeSlider
              klass="ice-volume hidden sm:inline-flex -rotate-90"
              :class="{ open_volume: mainVolumeOpen }"
              @mouseenter="openMainVolume"
              @mouseleave="scheduleCloseMainVolume" />
            <div id="vol_value" class="vol_value hidden  ms-2" :class="{ open_volume: mainVolumeOpen }" style="font-family: monospace;position: fixed;pointer-events: none;color:grey;font-decoration:bold; text-shadow:none">{{ volumeLabel }}</div>

            <div class="vol_value2 hidden ">{{ volumeLabel }}</div>
            <PlayerVolumeSlider
              input-id="ice_volume_vertical"
              klass="volume-vertical inline-flex hidden"
              :class="{ open_volume: verticalVolumeOpen }" />

            <!-- Выпадающий список станций на узких экранах -->
            <div class="relative me-2 ms-14 sm:hidden transition-all duration-500" ref="dropUpContainer">
              <div :class="{
                  'scale-0 translate-y-32': !streamsSmallMenu,
                  'scale-100 translate-y-0': streamsSmallMenu,
                }"
                class="absolute bottom-12 transition-all duration-500 bg-sxvx-dark pt-2 rounded-xl px-2 flex-col flex" style="border: 1px white solid; z-index: 35; left: -9px">
                <div class="relative transition-all duration-500 flex flex-col">
                  <StationThumb v-for="s in stations" :key="s.id" :station="s" class="mb-2" @click="streamsSmallMenu = false" />
                </div>
              </div>
              <button class="rounded-xl px-2 focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 " style="height:40px; margin-top: 2px;" @click="streamsSmallMenu = !streamsSmallMenu">
                <Icon name="heroicons-solid:radio" class="h-6 w-6 bg-red-500 mt-2" aria-hidden="true" />
              </button>
            </div>

            <!-- Свипер станций на широких экранах -->
            <div style="border-radius:30px; border: gray 1px solid; width:170px;"
                 class="ms-14 hidden sm:block overflow-hidden bg-sxvx-dark-bg">
              <swiper-container
                id="playerSwiper"
                ref="playerSwiper"
                style="padding-top:3px; padding-bottom:3px;"
                class="relative"
                :freeMode="false"
                :mouseWheel="true"
                :spaceBetween="5"
                :init="false"
                :style="bg">
                <swiper-slide
                  v-for="(s, i) in stations"
                  :key="s.id"
                  :class="i === 0 ? 'ms-1' : (i === stations.length - 1 ? 'me-0' : 'me-2')"
                  style="height: 40px; width: 40px!important;">
                  <StationThumb :station="s" />
                </swiper-slide>
                <swiper-slide class="ms-2" style="height: 40px; width: 0px!important;"></swiper-slide>
              </swiper-container>
            </div>

            <div id="vl" class="me-2 ms-0 sm:ms-2" style="border-left: 0.5px solid white;height:40px;"
            :style="{opacity: useInitPlayerStore.isPlaying ? '1' : '0' }"></div>

            <div style="flex-grow: 1;flex-shrink: 1;flex-basis: 0%;min-width: 0; opacity:0;" class="ice-track ellipsify" id="trackname"
            :style="{opacity: useInitPlayerStore.isPlaying ? '1' : '0' }">
              <div :style="{color: fg.color}">
                <div v-if="current && currentNowPlaying" class="ellipsify">
                  <span class="text-xs opacity-75">{{ current.text.nowPlayingLabel ?? current.text.menu }}</span>
                  <br/>
                  <span :style="{borderBottom: `1px solid ${fg.color}`}">{{ currentLoading ? 'loading' : currentNowPlaying.song.title }}</span>
                  <br/>
                  <span class="text-xs">{{ currentLoading ? 'loading' : currentNowPlaying.song.artist }}</span>
                </div>
              </div>
            </div>

            <div v-if="current" class="ms-3 cursor-pointer rounded-lg shadow-lg border-solid border-1 border-zinc-500">
              <img class="rounded-lg" height="60" width="60" :src="currentCover" alt="Album Cover" @click="openLightbox(currentCover, 0)" >
            </div>

            <div class="flex">
              <button @click="playerMenuToggle()"
              type="button" class="ml-1 sm:ml-4 flex rounded-xl bg-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2" >
                <span class="sr-only">Now Playing</span>
                <Icon name="heroicons:information-circle" class="w-6 h-6" />
              </button>
            </div>

            <div v-if="useInitPlayerStore.isPlaying && current">
              <div id="song_progress_elapsed" style="opacity:1" class="np-radio-song-elapsed song_progress_elapsed">
                {{ currentLoading ? '' : minSec(currentProgress.elapsed) }}
              </div>
              <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration">
                {{ currentLoading ? '' : minSec(currentProgress.duration) }}
              </div>
            </div>

            <div class="progress_bar_div_wrapper">
              <div v-if="useInitPlayerStore.isPlaying && current">
                <div id="progress_bar_div" style="opacity:1" class="progressbar np-radio-song-progressbar" role="progressbar"
                :style="{ width: `${currentProgress.width}%` }"></div>
              </div>
            </div>
        </div>
      </div>
    </div>

<!-- Выезжающая панель «сейчас играет» -->

    <div class="fixed inset-0 z-40 " v-if="playerMenuOpen"  @click="playerMenuToggle()" />
          <div  id="myMobileMenu"   :class="{ 'translate-x-0': playerMenuOpen, 'translate-x-full': !playerMenuOpen }"
          class="transition-transform duration-300 ease-in-out flex-col fixed flex bottom-0  top-0 right-0 z-40 w-11/12 sm:w-full dark:text-zinc-200 text-zinc-600 bg-sxvx-light dark:bg-sxvx-dark max-w-sm  ">
            <div class="absolute" style=" height: 100vh; width:100%; z-index: -1;">
              <div class="h-full absolute w-full" :style="{ backgroundImage: `url(${currentCover})`, backgroundPosition: 'center', backgroundSize: 'cover' }"/>
              <div style="min-width: 100%; min-height: 100%; position: absolute;background: radial-gradient(rgba(0, 0, 0, .5) 20%, #000 85%);z-index: 2;"/>
            </div>
            <div class="flex items-center justify-between p-3">
              <h1 class="text-xl text-white">{{ current?.text.panel ?? '' }}</h1>
              <button type="button" @click="playerMenuToggle()" class="-m-2.5 rounded-md p-2.5">
                <span class="sr-only text-white">Close</span>
                <Icon name="heroicons:x-mark" class="w-7 h-7" />
              </button>
            </div>
            <ClientOnly>
              <UtilsTime />
            </ClientOnly>
            <div class="px-3 pb-6 grow-1 overflow-y-auto">
              <div class="mt-2">
                <div class="divide-y divide-zinc-500/10">
                  <StationPanelEntry v-if="current" :station="current" @lightbox="openLightbox" />
                </div>
              </div>
            </div>
          </div>
</section>
    <VueEasyLightbox
    ref="lightbox"
    :visible="lightboxVisible"
    :imgs="lightboxImages"
    :index="lightboxIndex"
    @hide="lightboxVisible = false"
    />
</template>

<script setup>
import { minSec } from '@/composables/time';
import { ref, onMounted } from 'vue';
import { initPlayerStore } from '@/stores/initPlayer';
import { currentStreamStore } from '@/stores/currentStream';
import { useNowPlaying } from '~/stores/nowPlaying';
import { stations, getStation, placeholderCover } from '~/config/stations';
import { useDominantTheme } from '~/composables/useDominantTheme';

const useInitPlayerStore = initPlayerStore();
const useCurrentStreamStore = currentStreamStore();
const np = useNowPlaying();

const playerSwiper = ref(null)
const swiper1 = useSwiper(playerSwiper, {
  loop: false,
  slidesPerView: 'auto',
  navigation: false,
})

// Всплывающие панели громкости. Тайминги те же, что были в IcePlayer:
// 1200 мс после ухода курсора.
const CLOSE_DELAY = 1200;
const mainVolumeOpen = ref(false);
const verticalVolumeOpen = ref(false);
let closeTimer = null;

function openMainVolume() {
  clearTimeout(closeTimer);
  mainVolumeOpen.value = true;
}
function scheduleCloseMainVolume() {
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => { mainVolumeOpen.value = false; }, CLOSE_DELAY);
}
/** Иконка динамика одновременно мьютит и раскрывает вертикальный ползунок — так было и раньше. */
function onSpeakerClick() {
  useInitPlayerStore.toggleMute();
  verticalVolumeOpen.value = !verticalVolumeOpen.value;
}

const volumeLabel = computed(() =>
  useInitPlayerStore.muted ? '' : `${useInitPlayerStore.displayVolume}%`,
);

const streamsSmallMenu = ref(false);
const dropUpContainer = ref(null);
const handleOutsideClick = (event) => {
  if (dropUpContainer.value && !dropUpContainer.value.contains(event.target)) streamsSmallMenu.value = false;
  const speaker = document.querySelector('#show_volume_xs');
  const vertical = document.querySelector('#ice_volume_vertical');
  if (speaker && vertical && !speaker.contains(event.target) && !vertical.contains(event.target)) {
    verticalVolumeOpen.value = false;
  }
};
onMounted(() => window.addEventListener('click', handleOutsideClick));

/** Станция, выбранная в плеере. Всё ниже — про неё. */
const currentStream = computed(() => useCurrentStreamStore.currentStream);
const current = computed(() => getStation(currentStream.value));
const currentEntry = computed(() => (current.value ? np.byId[current.value.id] : null));
const currentNowPlaying = computed(() => currentEntry.value?.data?.np?.now_playing);
const currentCover = computed(() => currentEntry.value?.coverArt ?? placeholderCover);
const currentProgress = computed(() => currentEntry.value?.progress ?? { elapsed: 0, duration: 0, width: 0 });
const currentLoading = computed(() => (current.value ? np.loadingByProvider[current.value.provider] : true));

const { background: bg, text: fg } = useDominantTheme(computed(() => current.value?.id));

const playerMenuOpen = ref(false)
function playerMenuToggle() {
  playerMenuOpen.value = !playerMenuOpen.value;
}

const lightboxVisible = ref(false);
const lightboxIndex = ref(0);
const lightboxImages = ref([]);
const openLightbox = (imageUrl, index) => {
  lightboxImages.value = imageUrl;
  lightboxIndex.value = index;
  lightboxVisible.value = true;
};

// --- Заголовок вкладки и системный медиа-виджет ---

onMounted(() => {
  updateMediaSession();
  if ('mediaSession' in navigator) {
    for (const action of ['play', 'pause', 'stop']) {
      navigator.mediaSession.setActionHandler(action, () => useInitPlayerStore.togglePlayAll());
    }
  }
})

watch(() => useInitPlayerStore.isPlaying, (isPlaying) => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    if (isPlaying) updateMediaSession();
  }
  updateTitle();
});

watch([current, currentNowPlaying], () => {
  updateTitle();
  updateMediaSession();
});

function trackInfo() {
  const song = currentNowPlaying.value?.song;
  if (!song) return { title: 'Unknown', artist: 'Unknown', album: 'Unknown', artwork: placeholderCover };
  return {
    title: song.title,
    artist: song.artist,
    album: song.album,
    artwork: currentCover.value,
  };
}

function updateTitle() {
  if (!useInitPlayerStore.isPlaying) {
    document.title = 'omFM.ru Radio';
    return;
  }
  const { artist, title } = trackInfo();
  document.title = `${artist} - ${title} | omFM.ru Radio`;
}

function updateMediaSession() {
  if (!('mediaSession' in navigator)) return;
  const t = trackInfo();
  navigator.mediaSession.metadata = new MediaMetadata({
    title: t.title,
    artist: t.artist,
    album: t.album,
    artwork: [{ src: t.artwork, sizes: '96x96', type: 'image/jpg' }],
  });
}
</script>
