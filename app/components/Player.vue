<template>
    
<section>
    <div  class="icecast_player bg-sxvx-dark-bg dark:bg-sxvx-dark " id="ice-player" style="z-index:30; transform: translateY(100%); ">
        <div class="ice-player-el mb-5">
            <div>
                <!-- <i class="ice-play hidden" @click="playStatus" style="display: inline-block;font-size:1.6rem !important" ></i> -->
                <i class="ice-play hidden" @click="playStatus" style="font-size:1.6rem !important" ></i>
                <i class="ice-pause hidden"  @click="pausePlayer" ></i>
                <i class="ice-stop hidden"  @click="stopPlayer"></i>

                <button style="padding: 8px;" class="flex rounded-xl transitio-all duration-500 ease-in-out   text-sm focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 " @click="togglePlayAll"  >     
                    <Icon id="playBtnPlayer" name="heroicons-solid:play" class="h-6 w-6 bg-green-500" aria-hidden="true" :class="[useInitPlayerStore.isPlaying ? 'hidden' : '']" />
                    <Icon id="stopBtnPlayer" name="heroicons-solid:stop" class="h-6 w-6 bg-red-500" aria-hidden="true" :class="[useInitPlayerStore.isPlaying ? '' : 'hidden']" />
                </button>
                <!-- <a id="show_volume_xs" class=" sm:hidden speaker_as_icon"><span></span></a> -->
              
            </div>
            <div class="relative">
            <button id="mainVolumeBtn" style="padding: 5px;top: -20px;" class="absolute z-10 ml-2 inline-flex  items-center  rounded-xl transitio-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800"  >     
                    <a id="show_volume_xs" class=" mute  speaker  " title="mute/unmute"  ><span></span></a>
                     </button>
            </div>
            <input class="ice-volume hidden sm:inline-flex -rotate-90" type="range" min="0" max="100" value="100" step="1">
            <div id="vol_value" class="vol_value hidden  ms-2" style="font-family: monospace;position: fixed;pointer-events: none;color:grey;font-decoration:bold; text-shadow:none">70%</div>
           
            <div class="vol_value2 hidden ">70%</div>
            <input id="ice_volume_vertical" class="volume-vertical inline-flex  hidden" type="range" min="0" max="100" value="100" step="1">

            <!-- streams -->
             
            <div style="width:114px;" class="ms-14 hidden sm:block"> 
            <swiper
            id="playerSwiper"
            class="bg-sxvx-dark-bg"
            style="padding-top:2px;
                   padding-bottom:2px;
                   border-radius:30px;
                   border: gray 1px solid;"
            :modules="[  SwiperPagination, SwiperScrollbar, SwiperMousewheel]"
            :slides-per-view="2.3"
            :mousewheel="true"
            :space-between="1"
            >
            <swiper-slide class="ms-1">
            <div class="relative cursor-pointer bg-sxvx-dark rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.setStream('stream');">
            <img :class="{
                  'grayscale opacity-75': currentStream !== 'stream',
                  }" 
                   class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-70-thumb.jpg">
            <img v-if="useInitPlayerStore.isPlayingStream" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif">
            <span :class="{
                  'glowing-text': currentStream === 'stream',
                  'opacity-75': currentStream !== 'stream',
                  }" 
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">omFM</span>
            </div>
            </swiper-slide>
            <swiper-slide>
            <div class="relative cursor-pointer bg-sxvx-dark rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.setStream('rock');">
              <img :class="{
                  'grayscale opacity-50': currentStream !== 'rock',
                  }" 
                   class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-90-thumb.jpg">
              <img v-if="useInitPlayerStore.isPlayingRock" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif">
              <span :class="{
                  'glowing-text': currentStream === 'rock',
                  'opacity-75': currentStream !== 'rock',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Rock</span>
            </div>
            </swiper-slide>
            <swiper-slide class="me-2">
            <div class="relative  cursor-pointer bg-sxvx-dark rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.setStream('coma');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'coma',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-80-thumb.jpg">
            <img v-if="useInitPlayerStore.isPlayingComa" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif">
                  
              <span :class="{
                  'glowing-text': currentStream === 'coma',
                  'opacity-75': currentStream !== 'coma',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Coma</span>
            </div>
            </swiper-slide>

          </swiper>
        </div>
 
            <img class=" sm:hidden ms-14 sm:ms-2 ml-0" id="live" src="/equalizer.gif">            

            <div id="vl" class="me-2  ms-2" style="border-left: 0.5px solid white;height:40px;box-shadow:0 0 10px #ff9d41; "></div>


            <div style="flex-grow: 1;flex-shrink: 1;flex-basis: 0%;min-width: 0; opacity:0;" class="ice-track ellipsify" id="trackname">

                <div v-if="currentStream === 'rock'" class="ellipsify">
                <span class="text-xs text-zinc-500">Rock @ omFM</span> 
                <br/>
                <span style="border-bottom: whitesmoke 1px solid;">{{ np_ac.isLoading ? 'loading' : radioData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_ac.isLoading ? 'loading' : radioData.np.now_playing.song.artist }}</span>
                </div>
                <div v-else-if="currentStream === 'coma'" class="ellipsify">
                <span class="text-xs text-zinc-500">Coma @ omFM</span> 
                <br/>
                <span style="border-bottom: whitesmoke 1px solid;">{{ np_ac.isLoading ? 'loading' : comaData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_ac.isLoading ? 'loading' : comaData.np.now_playing.song.artist }}</span>
                </div>
                <div v-else-if="currentStream === 'stream'" class="ellipsify">
                <span class="text-xs text-zinc-500">omFM</span>
                <br/>
                <span style="border-bottom: whitesmoke 1px solid;">{{ np_omfm.isLoading ? 'loading' : omfmData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_omfm.isLoading ? 'loading' : omfmData.np.now_playing.song.artist }}</span>
                </div>
            </div>
            

           
            <div class="ms-3 cursor-pointer shadow-lg" v-if="currentStream === 'rock'">
                <div v-if="radioData" >  
                <img class="rounded-lg" height="60" width="60" :src="np_ac.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_ac.coverArtUrls['station:radio'], 0)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg" alt="Album Cover"  @click="openLightbox('https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg', 0)" >
                </div> 
            </div>
            <div class="ms-3 cursor-pointer shadow-lg" v-else-if="currentStream === 'coma'">
                <div v-if="comaData" >  
                <img class="rounded-lg" height="60" width="60" :src="comaData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(comaData.np.now_playing.song.art)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg" alt="Album Cover"  @click="openLightbox('https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg', 0)" >
                </div> 
            </div>
            <div class="ms-2 cursor-pointer  shadow-lg" v-else-if="currentStream === 'stream'">
                <div v-if="omfmData" >  
                <img class="rounded-lg" height="60" width="60" :src="np_omfm.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_omfm.coverArtUrls['station:radio'], 0)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg" alt="Album Cover"  @click="openLightbox('https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg', 0)" >
                </div> 
            </div>
            <div class="flex">
            <button @click="playerMenuToggle()"
            type="button" class="ml-1 sm:ml-4 flex rounded-xl bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2" >
            <span class="sr-only">Now Playing</span>
            <Icon name="heroicons:musical-note" class="w-6 h-6" />
            </button>
            </div>
      



            <div v-if="useInitPlayerStore.isPlaying">
                
            <div id="song_progress_elapsed" style="opacity:1" class="np-radio-song-elapsed song_progress_elapsed"
            v-if="currentStream === 'rock' && radioData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].elapsed) }}</div>
            <div id="song_progress_elapsed" style="opacity:1" class="np-radio-song-elapsed song_progress_elapsed"
            v-if="currentStream === 'coma' && comaData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:coma'].elapsed) }}</div>
            <div id="song_progress_elapsed" style="opacity:1" class="np-radio-song-elapsed song_progress_elapsed"
            v-if="currentStream === 'stream' && omfmData"
            >{{ np_ac.isLoading ? '' : minSec(np_omfm.progress['station:radio'].elapsed) }}</div>
   
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'rock' && radioData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].duration) }}</div>
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'coma' && comaData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:coma'].duration) }}</div>
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'stream' && omfmData"
            >{{ np_ac.isLoading ? '' : minSec(np_omfm.progress['station:radio'].duration) }}</div>

            </div>       

            <div class="progress_bar_div_wrapper"> 

            <div v-if="useInitPlayerStore.isPlaying">
            <div id="progress_bar_div" style="opacity:1" class="progressbar np-radio-song-progressbar" role="progressbar"
            v-if="currentStream === 'rock' && radioData"
            :style="{ width: `${( np_ac.progress['station:radio'].width)}%` }"></div>
            <div id="progress_bar_div" style="opacity:1" class="progressbar np-radio-song-progressbar" role="progressbar"
            v-if="currentStream === 'coma' && comaData"
            :style="{ width: `${( np_ac.progress['station:coma'].width)}%` }"></div>
            <div id="progress_bar_div" style="opacity:1" class="progressbar np-radio-song-progressbar" role="progressbar"
            v-if="currentStream === 'stream' && omfmData"
            :style="{ width: `${( np_omfm.progress['station:radio'].elapsed /  np_omfm.progress['station:radio'].duration * 100).toFixed(2)}%` }"></div>
            </div>

            </div>
          
        </div>

    </div>

    <div class="fixed inset-0 z-40 " v-if="playerMenuOpen"  @click="playerMenuToggle()" />
          <div  id="myMobileMenu"   :class="{ 'translate-x-0': playerMenuOpen, 'translate-x-full': !playerMenuOpen }"  class="transition-transform duration-300 ease-in-out fixed drop-shadow-2xl inset-y-0 right-0 z-40 w-11/12 sm:w-full overflow-y-auto dark:text-zinc-200 text-zinc-600 bg-sxvx-light dark:bg-sxvx-dark px-3 py-6 max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <h1 class="text-xl">{{nowPlayingStation}}</h1>
              <button type="button" @click="playerMenuToggle()" class="-m-2.5 rounded-md p-2.5">
                <span class="sr-only">Close</span>
                <Icon name="heroicons:x-mark" class="w-7 h-7" />
              </button>
             
            </div>
            <div class="mt-2" >
              <div class="divide-y divide-zinc-500/10">
                <div v-if="currentStream === 'stream'">
                <StreamsOmfmOffcanvas/>
                </div>
              <div v-if="currentStream === 'rock'">
                <StreamsRockOffcanvas/>
              </div>
              <div v-if="currentStream === 'coma'">
              <StreamsComaOffcanvas/>
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
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
 

import { usePlayer } from '../composables/player'; // Create this composable
const { player, isPlaying, togglePlayAll, playStatus, changeVol3, showVol3, muteVol, setStream} = usePlayer(); // Get player instance and state

import { useAzuracastData } from '../stores/stationData';
const np_ac = useAzuracastData();
import { useOmfmData } from '../stores/stationData_omfm';
const np_omfm = useOmfmData();
const omfmData = computed(() => np_omfm.stations['station:radio']);


const radioData = computed(() => np_ac.stations['station:radio']);
const comaData = computed(() => np_ac.stations['station:coma']);

const playerMenuOpen = ref(false)

function playerMenuToggle() {
  playerMenuOpen.value = !playerMenuOpen.value;
}

function minSec(duration) {
      const minutes = Math.trunc(duration / 60);
      const seconds = Math.trunc(duration % 60);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}



import { currentStreamStore } from '../stores/currentStream'; // Import the store

const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
const nowPlayingStation = computed(() => {
  switch (currentStream.value) {
    case 'stream':
      return 'omFM';
    case 'rock':
      return 'RockFM';
    case 'coma':
      return 'ComaFM';
    default:
      return ''; // Default text
  }
});


const lightboxVisible = ref(false);
const lightboxIndex = ref(0);
const lightboxImages = ref([]);

const openLightbox = (imageUrl,   index) => {
  lightboxImages.value =  imageUrl; 
  lightboxIndex.value = index;
  lightboxVisible.value = true;
};

const isPlayingComputed = computed(() => useInitPlayerStore.isPlaying);

// Watch the computed property
watch(isPlayingComputed, (isPlaying) => {
  if ('mediaSession' in navigator) {
    if (isPlaying) {
      navigator.mediaSession.playbackState = 'playing';
      updateMediaSession();
    } else {
      navigator.mediaSession.playbackState = 'paused';
    }
  }
      updateTitle();
});

 watch(currentStream, () => {updateTitleAndMediaSession()});
 watch(radioData, () => {updateTitleAndMediaSession()});
 watch(comaData, () => {updateTitleAndMediaSession()});
 watch(omfmData, () => {updateTitleAndMediaSession()});

function updateTitleAndMediaSession() {
  updateTitle();
  updateMediaSession();
}
function updateTitle() {
  if (useInitPlayerStore.isPlaying === true) {
  const trackData = getTrackData(currentStream.value);
  document.title = trackData.artist + ' - ' + trackData.title + ' | omFM.ru Radio';
  } else {
  document.title = 'omFM.ru Radio';
  }
}
// Helper Function to Update Media Session Data
function updateMediaSession() {
  if ('mediaSession' in navigator) {
    const trackData = getTrackData(currentStream.value);
    navigator.mediaSession.metadata = new MediaMetadata({
      title: trackData.title,
      artist: trackData.artist,
      album: trackData.album,
      artwork: [{
        src: trackData.artwork,
        sizes: '96x96',
        type: 'image/jpg'
      }],
    });
  }
}
// Helper Function to Get Track Data
function getTrackData(stream) {
  let title = 'Unknown';
  let artist = 'Unknown';
  let album = 'Unknown';
  let artwork = 'https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg'; 

  switch (stream) {
    case 'rock':
      if (radioData.value && np_ac.coverArtUrls['station:radio']) {
        title = radioData.value.np.now_playing.song.title;
        artist = radioData.value.np.now_playing.song.artist;
        album = radioData.value.np.now_playing.song.album;
        artwork = np_ac.coverArtUrls['station:radio'];
      }
      break;
    case 'coma':
      if (comaData.value) {
        title = comaData.value.np.now_playing.song.title;
        artist = comaData.value.np.now_playing.song.artist;
        album = comaData.value.np.now_playing.song.album;
        artwork = comaData.value.np.now_playing.song.art;
      }
      break;
    case 'stream':
      if (omfmData.value && np_omfm.coverArtUrls['station:radio']) {
        title = omfmData.value.np.now_playing.song.title;
        artist = omfmData.value.np.now_playing.song.artist;
        album = omfmData.value.np.now_playing.song.album;
        artwork = np_omfm.coverArtUrls['station:radio'];
      }
      break;
  }

  return { title, artist, album, artwork };
}
</script>
