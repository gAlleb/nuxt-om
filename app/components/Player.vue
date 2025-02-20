<template>
    
<section>
    <div class="icecast_player ice-player fixed transition duration-300 ease-in-linear" id="ice-player" style="z-index:30;"
    :style="{ transform:`translateY(${useInitPlayerStore.playerVisible ? '0%' : '165%'})`}">
    <div class="icecast_player ice-player fixed backdrop-blur-[1rem] transition-all duration-[1500ms]" style="z-index:30;"
    :style="dynamicBackgroundColor">
        <div class="ice-player-el mb-5">
            <div>
                <!-- <i class="ice-play hidden" style="display: inline-block;font-size:1.6rem !important" ></i> -->
                <i class="ice-play hidden"style="font-size:1.6rem !important" ></i>
                <i class="ice-pause hidden"></i>
                <i class="ice-stop hidden"></i>

                <button style="padding: 8px;" class="flex rounded-xl transitio-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 " @click="useInitPlayerStore.togglePlayAll()"  >     
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

            <!-- Mobile Streams menu> -->

            <div class="relative me-2 ms-14 sm:hidden transition-all duration-500" ref="dropUpContainer">
            <div :class="{
              'scale-0 translate-y-32': !streamsSmallMenu,
              'scale-100 translate-y-0': streamsSmallMenu,
            }"
            class="absolute bottom-12 transition-all duration-500 bg-sxvx-dark pt-2 rounded-xl px-2 flex-col flex" style="border: 1px white solid; z-index: 35; left: -9px">

            <div class="relative transition-all duration-500 flex flex-col" >

             <div class="relative flex mb-2 cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('stream');">
            <img :class="{
                  'grayscale opacity-75': currentStream !== 'stream',
                  }" 
                   class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-70-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingStream" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
            <span :class="{
                  'glowing-text': currentStream === 'stream',
                  'opacity-75': currentStream !== 'stream',
                  }" 
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">omFM</span>
            </div>

            <div class="relative flex mb-2 cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('rock');">
              <img :class="{
                  'grayscale opacity-50': currentStream !== 'rock',
                  }" 
                   class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-90-thumb.jpg">
              <!-- <img v-if="useInitPlayerStore.isPlayingRock" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
              <span :class="{
                  'glowing-text': currentStream === 'rock',
                  'opacity-75': currentStream !== 'rock',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Rock</span>
            </div>

            <div class="relative flex mb-2 cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('coma');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'coma',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-80-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingComa" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'coma',
                  'opacity-75': currentStream !== 'coma',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Coma</span>
            </div> 

            <div class="relative flex mb-2 cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('core');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'core',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-70-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingCore" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'core',
                  'opacity-75': currentStream !== 'core',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">CORE</span>
            </div>

            <div class="relative  cursor-pointer flex mb-2 rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('terra');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'terra',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-00-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingTerra" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
              <span :class="{
                  'glowing-text': currentStream === 'terra',
                  'opacity-75': currentStream !== 'terra',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Terra</span>
            </div>
            <div class="relative flex cursor-pointer rounded-full mb-2" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('chill');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'chill',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/pink-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingTerra" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'chill',
                  'opacity-75': currentStream !== 'chill',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Chill</span>
            </div>
            <div class="relative flex cursor-pointer rounded-full mb-2" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('cdp');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'cdp',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-00-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingTerra" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'cdp',
                  'opacity-75': currentStream !== 'cdp',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Cafe</span>
            </div>
          </div>
            </div>
          <button class="rounded-xl px-2 focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 " style="height:40px; margin-top: 2px;" @click="streamsSmallMenu = !streamsSmallMenu">
               <Icon name="heroicons-solid:radio" class="h-6 w-6 bg-red-500 mt-2" aria-hidden="true" />
          </button>
        </div>

            <!-- streams -->
            <div   style="
                   border-radius:30px;
                   border: gray 1px solid;
                   width:170px;
                   "
                   class="ms-14 hidden sm:block overflow-hidden bg-sxvx-dark-bg"> 
            <swiper-container
            id="playerSwiper"
            ref="playerSwiper"
            style="padding-top:3px;
                   padding-bottom:3px;
                   " 
            class="relative"
            :freeMode="false"  
            :mouseWheel="true"  
            :spaceBetween="5" 
            :init="false"
            :style="dynamicBackgroundColor"
            >
            <swiper-slide class="ms-1" style="height: 40px; width: 40px!important;">
            <div class="relative cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('stream');">
            <img :class="{
                  'grayscale opacity-75': currentStream !== 'stream',
                  }" 
                   class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-70-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingStream" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
            <span :class="{
                  'glowing-text': currentStream === 'stream',
                  'opacity-75': currentStream !== 'stream',
                  }" 
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">omFM</span>
            </div>
            </swiper-slide>
            <swiper-slide class="me-2 ms-2" style="height: 40px; width: 40px!important;">
            <div class="relative cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('rock');">
              <img :class="{
                  'grayscale opacity-50': currentStream !== 'rock',
                  }" 
                   class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-90-thumb.jpg">
              <!-- <img v-if="useInitPlayerStore.isPlayingRock" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
              <span :class="{
                  'glowing-text': currentStream === 'rock',
                  'opacity-75': currentStream !== 'rock',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Rock</span>
            </div>
            </swiper-slide>
            <swiper-slide class="me-2" style="height: 40px; width: 40px!important;">
            <div class="relative  cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('coma');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'coma',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-80-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingComa" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'coma',
                  'opacity-75': currentStream !== 'coma',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Coma</span>
            </div>
            </swiper-slide>
            <swiper-slide class="me-2" style="height: 40px; width: 40px!important;">
            <div class="relative  cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('core');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'core',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-70-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingCore" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'core',
                  'opacity-75': currentStream !== 'core',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">CORE</span>
            </div>
            </swiper-slide>
            <swiper-slide class="me-2" style="height: 40px; width: 40px!important;">
            <div class="relative  cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('terra');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'terra',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-00-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingTerra" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'terra',
                  'opacity-75': currentStream !== 'terra',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Terra</span>
            </div>
            </swiper-slide>
            <swiper-slide class="me-2" style="height: 40px; width: 40px!important;">
            <div class="relative  cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('chill');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'chill',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/pink-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingTerra" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'chill',
                  'opacity-75': currentStream !== 'chill',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Chill</span>
            </div>
            </swiper-slide>
            <swiper-slide class="me-0" style="height: 40px; width: 40px!important;">
            <div class="relative  cursor-pointer rounded-full" style="height: 40px; width: 40px;" @click="useInitPlayerStore.toggleInstantPlay('cdp');">
            <img :class="{
                  'grayscale opacity-50': currentStream !== 'cdp',
                  }"  class="rounded-full absolute" height="40" width="40" src="~/assets/img/rock-00-thumb.jpg">
            <!-- <img v-if="useInitPlayerStore.isPlayingTerra" class="rounded-full absolute bottom-0 opacity-75" height="40" width="40" src="/equalizer.gif"> -->
                  
              <span :class="{
                  'glowing-text': currentStream === 'cdp',
                  'opacity-75': currentStream !== 'cdp',
                  }"
            class="text-xs z-1 text-white absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%);">Cafe</span>
            </div>
            </swiper-slide>
            <swiper-slide class="ms-2" style="height: 40px; width: 0px!important;">
            </swiper-slide>
          </swiper-container>
        </div>
            <!-- <img class=" sm:hidden ms-14 sm:ms-2 ml-0" id="live" src="/equalizer.gif">             -->

            <div id="vl" class="me-2 ms-0 sm:ms-2" style="border-left: 0.5px solid white;height:40px;"
            :style="{opacity: useInitPlayerStore.isPlaying ? '1' : '0' }"></div>

            <div style="flex-grow: 1;flex-shrink: 1;flex-basis: 0%;min-width: 0; opacity:0;" class="ice-track ellipsify" id="trackname"
            :style="{opacity: useInitPlayerStore.isPlaying ? '1' : '0' }">
              <div :style="{color: dynamicTextColor.color}">
                <div v-if="currentStream === 'rock'" class="ellipsify">
                <span class="text-xs opacity-75">Rock @ omFM</span> 
                <br/>
                <span :style="{borderBottom: `1px solid ${dynamicTextColor.color}`}">{{ np_ac.isLoading ? 'loading' : radioData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_ac.isLoading ? 'loading' : radioData.np.now_playing.song.artist }}</span>
                </div>
                <div v-else-if="currentStream === 'coma'" class="ellipsify">
                <span class="text-xs opacity-75">Coma @ omFM</span> 
                <br/>
                <span :style="{borderBottom: `1px solid ${dynamicTextColor.color}`}">{{ np_ac.isLoading ? 'loading' : comaData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_ac.isLoading ? 'loading' : comaData.np.now_playing.song.artist }}</span>
                </div>
                <div v-else-if="currentStream === 'core'" class="ellipsify">
                <span class="text-xs opacity-75">CORE @ omFM</span> 
                <br/>
                <span :style="{borderBottom: `1px solid ${dynamicTextColor.color}`}">{{ np_ac.isLoading ? 'loading' : coreData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_ac.isLoading ? 'loading' : coreData.np.now_playing.song.artist }}</span>
                </div>
                <div v-else-if="currentStream === 'terra'" class="ellipsify">
                <span class="text-xs opacity-75">Terra @ omFM</span> 
                <br/>
                <span :style="{borderBottom: `1px solid ${dynamicTextColor.color}`}">{{ np_ac.isLoading ? 'loading' : terraData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_ac.isLoading ? 'loading' : terraData.np.now_playing.song.artist }}</span>
                </div>
                <div v-else-if="currentStream === 'chill'" class="ellipsify">
                <span class="text-xs opacity-75">Chill @ omFM</span> 
                <br/>
                <span :style="{borderBottom: `1px solid ${dynamicTextColor.color}`}">{{ np_ac.isLoading ? 'loading' : chillData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_ac.isLoading ? 'loading' : chillData.np.now_playing.song.artist }}</span>
                </div>
                <div v-else-if="currentStream === 'stream'" class="ellipsify">
                <span class="text-xs opacity-75">omFM</span>
                <br/>
                <span :style="{borderBottom: `1px solid ${dynamicTextColor.color}`}">{{ np_omfm.isLoading ? 'loading' : omfmData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_omfm.isLoading ? 'loading' : omfmData.np.now_playing.song.artist }}</span>
                </div>
                <div v-else-if="currentStream === 'cdp'" class="ellipsify">
                <span class="text-xs opacity-75">Café de Paris</span>
                <br/>
                <span :style="{borderBottom: `1px solid ${dynamicTextColor.color}`}">{{ np_omfm.isLoading ? 'loading' : cdpData.np.now_playing.song.title }}</span>
                <br/>
                <span class="text-xs">{{ np_omfm.isLoading ? 'loading' : cdpData.np.now_playing.song.artist }}</span>
                </div>
            </div>
            </div>
            

           
            <div class="ms-3 cursor-pointer rounded-lg shadow-lg border-solid border-1 border-zinc-500" v-if="currentStream === 'rock'">
                <div v-if="radioData" >  
                <img class="rounded-lg" height="60" width="60" :src="np_ac.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_ac.coverArtUrls['station:radio'], 0)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="/static/img/defaultCoverart.jpg" alt="Album Cover"  @click="openLightbox('/static/img/defaultCoverart.jpg', 0)" >
                </div> 
            </div>
            <div class="ms-3 cursor-pointer rounded-lg shadow-lg border-solid border-1 border-zinc-500" v-else-if="currentStream === 'coma'">
                <div v-if="comaData" >  
                <img class="rounded-lg" height="60" width="60" :src="comaData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(comaData.np.now_playing.song.art)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="/static/img/defaultCoverart.jpg" alt="Album Cover"  @click="openLightbox('/static/img/defaultCoverart.jpg', 0)" >
                </div> 
            </div>
            <div class="ms-3 cursor-pointerrounded-lg shadow-lg border-solid border-1 border-zinc-500" v-else-if="currentStream === 'core'">
                <div v-if="coreData" >  
                <img class="rounded-lg" height="60" width="60" :src="coreData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(coreData.np.now_playing.song.art)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="/static/img/defaultCoverart.jpg" alt="Album Cover"  @click="openLightbox('/static/img/defaultCoverart.jpg', 0)" >
                </div> 
            </div>
            <div class="ms-3 cursor-pointer rounded-lg shadow-lg border-solid border-1 border-zinc-500" v-else-if="currentStream === 'terra'">
                <div v-if="terraData" >  
                <img class="rounded-lg" height="60" width="60" :src="terraData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(terraData.np.now_playing.song.art)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="/static/img/defaultCoverart.jpg" alt="Album Cover"  @click="openLightbox('/static/img/defaultCoverart.jpg', 0)" >
                </div> 
            </div>
            <div class="ms-3 cursor-pointer rounded-lg shadow-lg border-solid border-1 border-zinc-500" v-else-if="currentStream === 'chill'">
                <div v-if="chillData" >  
                <img class="rounded-lg" height="60" width="60" :src="chillData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(chillData.np.now_playing.song.art)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="/static/img/defaultCoverart.jpg" alt="Album Cover"  @click="openLightbox('/static/img/defaultCoverart.jpg', 0)" >
                </div> 
            </div>
            <div class="ms-2 cursor-pointer rounded-lg shadow-lg border-solid border-1 border-zinc-500" v-else-if="currentStream === 'stream'">
                <div v-if="omfmData" >  
                <img class="rounded-lg" height="60" width="60" :src="np_omfm.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_omfm.coverArtUrls['station:radio'], 0)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="/static/img/defaultCoverart.jpg" alt="Album Cover"  @click="openLightbox('/static/img/defaultCoverart.jpg', 0)" >
                </div> 
            </div>
            <div class="ms-2 cursor-pointer rounded-lg shadow-lg border-solid border-1 border-zinc-500" v-else-if="currentStream === 'cdp'">
                <div v-if="cdpData" >  
                <img class="rounded-lg" height="60" width="60" :src="np_omfm.coverArtUrls['station:cdp']" alt="Album Cover"  @click="openLightbox(np_omfm.coverArtUrls['station:cdp'], 0)" >
                </div>
                <div v-else>
                <img class="rounded-lg" height="60" width="60" src="/static/img/defaultCoverart.jpg" alt="Album Cover"  @click="openLightbox('/static/img/defaultCoverart.jpg', 0)" >
                </div> 
            </div>
            <div class="flex">
            <button @click="playerMenuToggle()"
            type="button" class="ml-1 sm:ml-4 flex rounded-xl bg-red-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2" >
            <span class="sr-only">Now Playing</span>
            <Icon name="heroicons:information-circle" class="w-6 h-6" />
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
            v-if="currentStream === 'core' && coreData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:core'].elapsed) }}</div>
            <div id="song_progress_elapsed" style="opacity:1" class="np-radio-song-elapsed song_progress_elapsed"
            v-if="currentStream === 'terra' && terraData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:terra'].elapsed) }}</div>
            <div id="song_progress_elapsed" style="opacity:1" class="np-radio-song-elapsed song_progress_elapsed"
            v-if="currentStream === 'chill' && terraData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:chill'].elapsed) }}</div>
            <div id="song_progress_elapsed" style="opacity:1" class="np-radio-song-elapsed song_progress_elapsed"
            v-if="currentStream === 'stream' && omfmData"
            >{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:radio'].elapsed) }}</div>
            <div id="song_progress_elapsed" style="opacity:1" class="np-radio-song-elapsed song_progress_elapsed"
            v-if="currentStream === 'cdp' && cdpData"
            >{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:cdp'].elapsed) }}</div>
   
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'rock' && radioData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].duration) }}</div>
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'coma' && comaData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:coma'].duration) }}</div>
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'core' && coreData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:core'].duration) }}</div>
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'terra' && terraData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:terra'].duration) }}</div>
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'chill' && chillData"
            >{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:chill'].duration) }}</div>
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'stream' && omfmData"
            >{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:radio'].duration) }}</div>
            <div style="opacity:1" id="song_duration" class="song_duration np-radio-song-duration"
            v-if="currentStream === 'cdp' && cdpData"
            >{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:cdp'].duration) }}</div>

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
            v-if="currentStream === 'core' && coreData"
            :style="{ width: `${( np_ac.progress['station:core'].width)}%` }"></div>
            <div id="progress_bar_div" style="opacity:1" class="progressbar np-radio-song-progressbar" role="progressbar"
            v-if="currentStream === 'terra' && terraData"
            :style="{ width: `${( np_ac.progress['station:terra'].width)}%` }"></div>
            <div id="progress_bar_div" style="opacity:1" class="progressbar np-radio-song-progressbar" role="progressbar"
            v-if="currentStream === 'chill' && chillData"
            :style="{ width: `${( np_ac.progress['station:chill'].width)}%` }"></div>
            <div id="progress_bar_div" style="opacity:1" class="progressbar np-radio-song-progressbar" role="progressbar"
            v-if="currentStream === 'stream' && omfmData"
            :style="{ width: `${( np_omfm.progress['station:radio'].elapsed /  np_omfm.progress['station:radio'].duration * 100).toFixed(2)}%` }"></div>
            <div id="progress_bar_div" style="opacity:1" class="progressbar np-radio-song-progressbar" role="progressbar"
            v-if="currentStream === 'cdp' && cdpData"
            :style="{ width: `${( np_omfm.progress['station:cdp'].elapsed /  np_omfm.progress['station:cdp'].duration * 100).toFixed(2)}%` }"></div>
          </div>
         </div>
        </div>
      </div>
    </div>

<!--OffCanvas Now Playing-->

    <div class="fixed inset-0 z-40 " v-if="playerMenuOpen"  @click="playerMenuToggle()" />
          <div  id="myMobileMenu"   :class="{ 'translate-x-0': playerMenuOpen, 'translate-x-full': !playerMenuOpen }"
          class="transition-transform duration-300 ease-in-out flex-col fixed flex bottom-0  top-0 right-0 z-40 w-11/12 sm:w-full dark:text-zinc-200 text-zinc-600 bg-sxvx-light dark:bg-sxvx-dark max-w-sm  ">
            <div class="absolute" style=" height: 100vh; width:100%; z-index: -1;">
            <div class="h-full absolute w-full" :style="{ backgroundImage: backgroundImage, backgroundPosition: 'center', backgroundSize: 'cover' }"/>
            <div style="min-width: 100%; min-height: 100%; position: absolute;background: radial-gradient(rgba(0, 0, 0, .5) 20%, #000 85%);z-index: 2;"/>
            </div>
            <div class="flex items-center justify-between p-3">
              <h1 class="text-xl text-white">{{nowPlayingStation}}</h1>
              <button type="button" @click="playerMenuToggle()" class="-m-2.5 rounded-md p-2.5">
                <span class="sr-only text-white">Close</span>
                <Icon name="heroicons:x-mark" class="w-7 h-7" />
              </button>
             
            </div>
            <ClientOnly>
              <UtilsTime />
              </ClientOnly>
           <div class="px-3 pb-6 grow-1 overflow-y-auto"> 
            
            <div class="mt-2" >
              <div class="divide-y divide-zinc-500/10">
                <div v-if="currentStream === 'stream'">
                  <div class="justify-center flex mx-auto mb-2 font-tenor">
        <div v-if="omfmData" class="container">  
          <h2 class="text-lg mb-3 text-white">Show: {{ omfmData.np.now_playing.playlist }}</h2>      
              <div class="content-center">
                <div class="mx-3">
                 <div class="relative w-full">
                   <img class="rounded-xl h-auto w-full shadow-2xl cursor-pointer" :src="np_omfm.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_omfm.coverArtUrls['station:radio'], 0)" >
                   <div class="absolute bg-sxvx-dark-bg bottom-0 rounded-b-xl  w-full h-5 overflow-hidden">
                   <div class="absolute bg-muddy-waters-400 " style="height:20px;  transition: width 1s linear" :style="{ width: `${( np_omfm.progress['station:radio'].elapsed /  np_omfm.progress['station:radio'].duration * 100).toFixed(2)}%` }"></div>
                   </div>
                   <span class="text-white ms-2  absolute bottom-0 left-0" style="font-family: monospace">{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:radio'].elapsed) }}</span> 
                   <span class="text-white absolute me-2 bottom-0 right-0" style="font-family: monospace">{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:radio'].duration) }}</span> 
                   <div class="absolute text-muddy-waters-100  text-8xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                    {{ getTimeFromTimestamp(omfmData.np.now_playing.played_at) }}
                  </div>
                 </div>
                </div>
                 <div class="ms-2" >
                  <div class="px-3  text-center mb-0 py-3  rounded-xl w-full text-muddy-waters-200  bg-opacity-50  "> 
                    <span class="text-lg">{{ omfmData.np.now_playing.song.title }}</span><br/>
                    <span class="text-md">{{ omfmData.np.now_playing.song.artist }}</span><br/>
                    <span class="text-md">Album: {{ omfmData.np.now_playing.song.album }}</span>
                  </div>
                 </div>
              </div>
            <hr/>
            <h2 class="text-lg mt-3 text-white">Recent Songs:</h2>      
            <ul>
            <li v-for="(historyItem, index) in omfmData.np.song_history.slice(1, 6)" :key="index">
  
              <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el text-muddy-waters-200" >
                <div class=" relative">
                  <img 
                v-if="np_omfm.songHistoryCoverArt['station:radio'] && np_omfm.songHistoryCoverArt['station:radio'][index]" 
                :src="np_omfm.songHistoryCoverArt['station:radio'][index]" 
                alt="History Cover"
                class="history-cover cursor-pointer rounded-xl h-auto w-24"
                @click="openLightbox(np_omfm.songHistoryCoverArt['station:radio'][index], index)" 
              >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                    {{ getTimeFromTimestamp(historyItem.played_at) }}
                   </div>
                  </div>
                 <div class="" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                  <div class="px-3 py-0 sm:py-2 rounded-xl w-full ellipsify "> 
                    <span class="text-lg">{{ historyItem.song.title  }}</span><br/>
                    <span class="text-md">{{ historyItem.song.artist  }}</span>
                  </div>
                </div>
               </div>
            </li>
          </ul>
        </div>
        </div>
                </div>
                <div v-if="currentStream === 'cdp'">
                  <div class="justify-center flex mx-auto mb-2 font-tenor">
        <div v-if="cdpData" class="container">  
          <h2 class="text-lg mb-3 text-white">Show: {{ cdpData.np.now_playing.playlist }}</h2>      
              <div class="content-center">
                <div class="mx-3">
                 <div class="relative w-full">
                   <img class="rounded-xl h-auto w-full shadow-2xl cursor-pointer" :src="np_omfm.coverArtUrls['station:cdp']" alt="Album Cover"  @click="openLightbox(np_omfm.coverArtUrls['station:cdp'], 0)" >
                   <div class="absolute bg-sxvx-dark-bg bottom-0 rounded-b-xl  w-full h-5 overflow-hidden">
                   <div class="absolute bg-muddy-waters-400 " style="height:20px;  transition: width 1s linear" :style="{ width: `${( np_omfm.progress['station:cdp'].elapsed /  np_omfm.progress['station:cdp'].duration * 100).toFixed(2)}%` }"></div>
                   </div>
                   <span class="text-white ms-2  absolute bottom-0 left-0" style="font-family: monospace">{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:cdp'].elapsed) }}</span> 
                   <span class="text-white absolute me-2 bottom-0 right-0" style="font-family: monospace">{{ np_omfm.isLoading ? '' : minSec(np_omfm.progress['station:cdp'].duration) }}</span> 
                   <div class="absolute text-muddy-waters-100  text-8xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                    {{ getTimeFromTimestamp(cdpData.np.now_playing.played_at) }}
                  </div>
                 </div>
                </div>
                 <div class="ms-2" >
                  <div class="px-3  text-center mb-0 py-3  rounded-xl w-full text-muddy-waters-200  bg-opacity-50  "> 
                    <span class="text-lg">{{ cdpData.np.now_playing.song.title }}</span><br/>
                    <span class="text-md">{{ cdpData.np.now_playing.song.artist }}</span><br/>
                    <span class="text-md">Album: {{ cdpData.np.now_playing.song.album }}</span>
                  </div>
                 </div>
              </div>
            <hr/>
            <h2 v-if="cdpData.np.now_playing.playlist !== ''" class="my-3 text-lg text-white">Next Song:</h2>

<div v-if="cdpData.np.now_playing.playlist !== ''" class="mt-3 mb-5 rounded-xl  ice-player-el text-muddy-waters-300" >
    <div class=" relative">
      <img 
    v-if="np_omfm.nextCoverArtUrls['station:cdp']" 
    :src="np_omfm.nextCoverArtUrls['station:cdp']" 
    alt="History Cover"
    class="history-cover cursor-pointer rounded-xl h-auto w-24"
    @click="openLightbox(np_omfm.nextCoverArtUrls['station:cdp'], 0)" 
  >  
  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
        {{ getTimeFromTimestamp(cdpData.np.playing_next.played_at_source_value) }}
       </div>
      </div>
     <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
      <div class="px-3 rounded-xl w-full text-muddy-waters-200 ellipsify "> 
        <span class="text-sm">Show: {{ cdpData.np.playing_next.playlist }}</span><hr/>
        <span class="text-lg">{{ cdpData.np.playing_next.song.title  }}</span><br/>
        <span class="text-md">{{ cdpData.np.playing_next.song.artist  }}</span>
      </div>
    </div>
   </div>
   <hr/>
            <h2 class="text-lg mt-3 text-white">Recent Songs:</h2>      
            <ul>
            <li v-for="(historyItem, index) in cdpData.np.song_history.slice(1, 6)" :key="index">
  
              <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el text-muddy-waters-200" >
                <div class=" relative">
                  <img 
                v-if="np_omfm.songHistoryCoverArt['station:cdp'] && np_omfm.songHistoryCoverArt['station:cdp'][index]" 
                :src="np_omfm.songHistoryCoverArt['station:cdp'][index]" 
                alt="History Cover"
                class="history-cover cursor-pointer rounded-xl h-auto w-24"
                @click="openLightbox(np_omfm.songHistoryCoverArt['station:cdp'][index], index)" 
              >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                    {{ getTimeFromTimestamp(historyItem.played_at) }}
                   </div>
                  </div>
                 <div class="" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                  <div class="px-3 py-0 sm:py-2 rounded-xl w-full ellipsify "> 
                    <span class="text-lg">{{ historyItem.song.title  }}</span><br/>
                    <span class="text-md">{{ historyItem.song.artist  }}</span>
                  </div>
                </div>
               </div>
            </li>
          </ul>
        </div>
        </div>
                </div>
              <div v-if="currentStream === 'rock'">
                <div class="justify-center flex mx-auto mb-2 font-metal">
      <div v-if="radioData" class="container">  
        <h2 class="text-lg mb-3 text-white">Show: {{ (radioData.np.now_playing.playlist !== '') ? radioData.np.now_playing.playlist : 'Relaying UltraFM' }}</h2>      
            <div class="content-center">
              <div class="mx-3">
               <div class="relative w-full">
                 <img class="rounded-xl h-auto w-full shadow-2xl cursor-pointer" :src="np_ac.coverArtUrls['station:radio']" alt="Album Cover"  @click="openLightbox(np_ac.coverArtUrls['station:radio'], 0)" >
                 <div class="absolute bg-sxvx-dark-bg bottom-0 rounded-b-xl  w-full h-5 overflow-hidden">
                 <div class="absolute bg-muddy-waters-400 " style="height:20px;  transition: width 1s linear" :style="{ width: `${np_ac.progress['station:radio'].width}%` }"></div>
                 </div>
                 <span class="text-white ms-2  absolute bottom-0 left-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].elapsed) }}</span> 
                 <span class="text-white absolute me-2 bottom-0 right-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:radio'].duration) }}</span> 
                 <div class="absolute text-muddy-waters-100 text-8xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(radioData.np.now_playing.played_at) }}
                </div>
               </div>

              </div>
               <div class="ms-2" >
                <div class="px-3  text-center mb-0 py-3  rounded-xl w-full text-muddy-waters-200  bg-opacity-50  "> 
                  <span class="text-lg">{{ radioData.np.now_playing.song.title }}</span><br/>
                  <span class="text-md">{{ radioData.np.now_playing.song.artist }}</span><br/>
                  <span class="text-md">Album: {{ radioData.np.now_playing.song.album }}</span>
                </div>
               </div>
            </div>
          <hr/>
          <h2 v-if="radioData.np.now_playing.playlist !== ''" class="my-3 text-lg text-white">Next Song:</h2>

<div v-if="radioData.np.now_playing.playlist !== ''" class="mt-3 mb-5 rounded-xl  ice-player-el text-muddy-waters-300" >
    <div class=" relative">
      <img 
    v-if="np_ac.nextCoverArtUrls['station:radio']" 
    :src="np_ac.nextCoverArtUrls['station:radio']" 
    alt="History Cover"
    class="history-cover cursor-pointer rounded-xl h-auto w-24"
    @click="openLightbox(np_ac.nextCoverArtUrls['station:radio'], 0)" 
  >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
        {{ getTimeFromTimestamp(radioData.np.playing_next.played_at) }}
       </div>
      </div>
     <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
      <div class="px-3 rounded-xl w-full text-muddy-waters-200 ellipsify "> 
        <span class="text-sm">Show: {{ radioData.np.playing_next.playlist }}</span><hr/>
        <span class="text-lg">{{ radioData.np.playing_next.song.title  }}</span><br/>
        <span class="text-md">{{ radioData.np.playing_next.song.artist  }}</span>
      </div>
    </div>
   </div>
   <hr/>
          <h2 class="text-lg mt-3 text-white">Recent Songs:</h2>      
          <ul>
          <li v-for="(historyItem, index) in radioData.np.song_history.slice(0, 5)" :key="index">
            <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el text-muddy-waters-200" >
              <div class=" relative">
                <img 
              v-if="np_ac.songHistoryCoverArt['station:radio'] && np_ac.songHistoryCoverArt['station:radio'][index]" 
              :src="np_ac.songHistoryCoverArt['station:radio'][index]" 
              alt="History Cover"
              class="history-cover cursor-pointer rounded-xl h-auto w-24"
              @click="openLightbox(np_ac.songHistoryCoverArt['station:radio'][index], index)" 
            >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(historyItem.played_at) }}
                 </div>
                </div>
               <div class="" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                  <span class="text-lg">{{ historyItem.song.title  }}</span><br/>
                  <span class="text-md">{{ historyItem.song.artist  }}</span>
                </div>
              </div>
             </div>
          </li>
        </ul>
      </div>
      </div>
              </div>

      <div v-if="currentStream === 'coma'">
                <div class="justify-center flex mx-auto mx-2 font-UNSCII">
      <div v-if="comaData" class="container">  
        <h2 class="text-lg mb-3 text-white">Show: {{ comaData.np.now_playing.playlist }}</h2>      
            <div class="content-center">
              <div class="mx-3">
               <div class="relative w-full">
                 <img class="rounded-xl h-auto w-full shadow-2xl cursor-pointer" :src="comaData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(comaData.np.now_playing.song.art, 0)" >
                 <div class="absolute bg-sxvx-dark-bg bottom-0 rounded-b-xl  w-full h-5 overflow-hidden">
                 <div class="absolute bg-muddy-waters-400 " style="height:20px;  transition: width 1s linear" :style="{ width: `${np_ac.progress['station:coma'].width}%` }"></div>
                 </div>
                 <span class="text-white ms-2  absolute bottom-0 left-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:coma'].elapsed) }}</span> 
                 <span class="text-white absolute me-2 bottom-0 right-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:coma'].duration) }}</span> 
                 <div class="absolute text-muddy-waters-100 text-8xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(comaData.np.now_playing.played_at) }}
                </div>
               </div>
              </div>
               <div class="ms-2" >
                <div class="px-3  text-center mb-0 py-3  rounded-xl w-full text-muddy-waters-200  bg-opacity-50  "> 
                  <span class="text-lg">{{ comaData.np.now_playing.song.title }}</span><br/>
                  <span class="text-md">{{ comaData.np.now_playing.song.artist }}</span><br/>
                  <span class="text-md">Album: {{ comaData.np.now_playing.song.album }}</span>
                </div>
               </div>
            </div>
             <hr/>
          <h2 v-if="comaData.np.now_playing.playlist !== ''" class="my-3 text-lg text-white">Next Song:</h2>

<div v-if="comaData.np.now_playing.playlist !== ''" class="mt-3 mb-5 rounded-xl  ice-player-el text-muddy-waters-300" >
    <div class=" relative">
      <img 
    :src="comaData.np.playing_next.song.art" 
    alt="History Cover"
    class="history-cover cursor-pointer rounded-xl h-auto w-24"
    @click="openLightbox(comaData.np.playing_next.song.art, 0)" 
  >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
        {{ getTimeFromTimestamp(comaData.np.playing_next.played_at) }}
       </div>
      </div>
     <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
      <div class="px-3 rounded-xl w-full text-muddy-waters-200 ellipsify "> 
        <span class="text-sm">Show: {{ comaData.np.playing_next.playlist }}</span><hr/>
        <span class="text-lg">{{ comaData.np.playing_next.song.title  }}</span><br/>
        <span class="text-md">{{ comaData.np.playing_next.song.artist  }}</span>
      </div>
    </div>
   </div>
          <hr/>
          <h2 class="text-lg mt-3 text-white">Recent Songs:</h2>      
          <ul>
          <li v-for="(historyItem, index) in comaData.np.song_history.slice(0, 5)" :key="index">
            <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el text-muddy-waters-200" >
              <div class=" relative">
                <img 
              v-if="comaData.np.song_history[index].song.art" 
              :src="comaData.np.song_history[index].song.art" 
              alt="History Cover"
              class="history-cover cursor-pointer rounded-xl h-auto w-24"
              @click="openLightbox(comaData.np.song_history[index].song.art, index)" 
            >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(historyItem.played_at) }}
                 </div>
                </div>
               <div class="" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                  <span class="text-lg">{{ historyItem.song.title  }}</span><br/>
                  <span class="text-md">{{ historyItem.song.artist  }}</span>
                </div>
              </div>
             </div>
          </li>
        </ul>       
      </div> 
      </div>
              </div>

              <div v-if="currentStream === 'core'">
                <div class="justify-center flex mx-auto mx-2 font-UNSCII">
      <div v-if="coreData" class="container">  
        <h2 class="text-lg mb-3 text-white">Show: {{ coreData.np.now_playing.playlist }}</h2>      
            <div class="content-center">
              <div class="mx-3">
               <div class="relative w-full">
                 <img class="rounded-xl h-auto w-full shadow-2xl cursor-pointer" :src="coreData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(coreData.np.now_playing.song.art, 0)" >
                 <div class="absolute bg-sxvx-dark-bg bottom-0 rounded-b-xl  w-full h-5 overflow-hidden">
                 <div class="absolute bg-muddy-waters-400 " style="height:20px;  transition: width 1s linear" :style="{ width: `${np_ac.progress['station:core'].width}%` }"></div>
                 </div>
                 <span class="text-white ms-2  absolute bottom-0 left-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:core'].elapsed) }}</span> 
                 <span class="text-white absolute me-2 bottom-0 right-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:core'].duration) }}</span> 
                 <div class="absolute text-muddy-waters-100 text-8xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(coreData.np.now_playing.played_at) }}
                </div>
               </div>
              </div>
               <div class="ms-2" >
                <div class="px-3  text-center mb-0 py-3  rounded-xl w-full text-muddy-waters-200  bg-opacity-50  "> 
                  <span class="text-lg">{{ coreData.np.now_playing.song.title }}</span><br/>
                  <span class="text-md">{{ coreData.np.now_playing.song.artist }}</span><br/>
                  <span class="text-md">Album: {{ coreData.np.now_playing.song.album }}</span>
                </div>
               </div>
            </div>
             <hr/>
          <h2 v-if="coreData.np.now_playing.playlist !== ''" class="my-3 text-lg text-white">Next Song:</h2>

<div v-if="coreData.np.now_playing.playlist !== ''" class="mt-3 mb-5 rounded-xl  ice-player-el text-muddy-waters-300" >
    <div class=" relative">
      <img 
    :src="coreData.np.playing_next.song.art" 
    alt="History Cover"
    class="history-cover cursor-pointer rounded-xl h-auto w-24"
    @click="openLightbox(coreData.np.playing_next.song.art, 0)" 
  >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
        {{ getTimeFromTimestamp(coreData.np.playing_next.played_at) }}
       </div>
      </div>
     <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
      <div class="px-3 rounded-xl w-full text-muddy-waters-200 ellipsify "> 
        <span class="text-sm">Show: {{ coreData.np.playing_next.playlist }}</span><hr/>
        <span class="text-lg">{{ coreData.np.playing_next.song.title  }}</span><br/>
        <span class="text-md">{{ coreData.np.playing_next.song.artist  }}</span>
      </div>
    </div>
   </div>
          <hr/>
          <h2 class="text-lg mt-3 text-white">Recent Songs:</h2>      
          <ul>
          <li v-for="(historyItem, index) in coreData.np.song_history.slice(0, 5)" :key="index">
            <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el text-muddy-waters-200" >
              <div class=" relative">
                <img 
              v-if="coreData.np.song_history[index].song.art" 
              :src="coreData.np.song_history[index].song.art" 
              alt="History Cover"
              class="history-cover cursor-pointer rounded-xl h-auto w-24"
              @click="openLightbox(coreData.np.song_history[index].song.art, index)" 
            >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(historyItem.played_at) }}
                 </div>
                </div>
               <div class="" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                  <span class="text-lg">{{ historyItem.song.title  }}</span><br/>
                  <span class="text-md">{{ historyItem.song.artist  }}</span>
                </div>
              </div>
             </div>
          </li>
        </ul>       
      </div> 
      </div>
      </div>

     <div v-if="currentStream === 'terra'">
                <div class="justify-center flex mx-auto mx-2 font-tenor">
      <div v-if="terraData" class="container">  
        <h2 class="text-lg mb-3 text-white">Show: {{ terraData.np.now_playing.playlist }}</h2>      
            <div class="content-center">
              <div class="mx-3">
               <div class="relative w-full">
                 <img class="rounded-xl h-auto w-full shadow-2xl cursor-pointer" :src="terraData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(terraData.np.now_playing.song.art, 0)" >
                 <div class="absolute bg-sxvx-dark-bg bottom-0 rounded-b-xl  w-full h-5 overflow-hidden">
                 <div class="absolute bg-muddy-waters-400 " style="height:20px;  transition: width 1s linear" :style="{ width: `${np_ac.progress['station:terra'].width}%` }"></div>
                 </div>
                 <span class="text-white ms-2  absolute bottom-0 left-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:terra'].elapsed) }}</span> 
                 <span class="text-white absolute me-2 bottom-0 right-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:terra'].duration) }}</span> 
                 <div class="absolute text-muddy-waters-100 text-8xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(terraData.np.now_playing.played_at) }}
                </div>
               </div>
              </div>
               <div class="ms-2" >
                <div class="px-3  text-center mb-0 py-3  rounded-xl w-full text-muddy-waters-200  bg-opacity-50  "> 
                  <span class="text-lg">{{ terraData.np.now_playing.song.title }}</span><br/>
                  <span class="text-md">{{ terraData.np.now_playing.song.artist }}</span><br/>
                  <span class="text-md">Album: {{ terraData.np.now_playing.song.album }}</span>
                </div>
               </div>
            </div>
             <hr/>
          <h2 v-if="terraData.np.now_playing.playlist !== ''" class="my-3 text-lg text-white">Next Song:</h2>

<div v-if="terraData.np.now_playing.playlist !== ''" class="mt-3 mb-5 rounded-xl  ice-player-el text-muddy-waters-300" >
    <div class=" relative">
      <img 
    :src="terraData.np.playing_next.song.art" 
    alt="History Cover"
    class="history-cover cursor-pointer rounded-xl h-auto w-24"
    @click="openLightbox(terraData.np.playing_next.song.art, 0)" 
  >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
        {{ getTimeFromTimestamp(terraData.np.playing_next.played_at) }}
       </div>
      </div>
     <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
      <div class="px-3 rounded-xl w-full text-muddy-waters-200 ellipsify "> 
        <span class="text-sm">Show: {{ terraData.np.playing_next.playlist }}</span><hr/>
        <span class="text-lg">{{ terraData.np.playing_next.song.title  }}</span><br/>
        <span class="text-md">{{ terraData.np.playing_next.song.artist  }}</span>
      </div>
    </div>
   </div>
          <hr/>
          <h2 class="text-lg mt-3 text-white">Recent Songs:</h2>      
          <ul>
          <li v-for="(historyItem, index) in terraData.np.song_history.slice(0, 5)" :key="index">
            <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el text-muddy-waters-200" >
              <div class=" relative">
                <img 
              v-if="terraData.np.song_history[index].song.art" 
              :src="terraData.np.song_history[index].song.art" 
              alt="History Cover"
              class="history-cover cursor-pointer rounded-xl h-auto w-24"
              @click="openLightbox(terraData.np.song_history[index].song.art, index)" 
            >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(historyItem.played_at) }}
                 </div>
                </div>
               <div class="" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                  <span class="text-lg">{{ historyItem.song.title  }}</span><br/>
                  <span class="text-md">{{ historyItem.song.artist  }}</span>
                </div>
              </div>
             </div>
          </li>
        </ul>       
      </div> 
      </div>
    </div>

    <div v-if="currentStream === 'chill'">
                <div class="justify-center flex mx-auto mx-2 font-tenor">
      <div v-if="chillData" class="container">  
        <h2 class="text-lg mb-3 text-white">Show: {{ chillData.np.now_playing.playlist }}</h2>      
            <div class="content-center">
              <div class="mx-3">
               <div class="relative w-full">
                 <img class="rounded-xl h-auto w-full shadow-2xl cursor-pointer" :src="chillData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(chillData.np.now_playing.song.art, 0)" >
                 <div class="absolute bg-sxvx-dark-bg bottom-0 rounded-b-xl  w-full h-5 overflow-hidden">
                 <div class="absolute bg-muddy-waters-400 " style="height:20px;  transition: width 1s linear" :style="{ width: `${np_ac.progress['station:chill'].width}%` }"></div>
                 </div>
                 <span class="text-white ms-2  absolute bottom-0 left-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:chill'].elapsed) }}</span> 
                 <span class="text-white absolute me-2 bottom-0 right-0" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:chill'].duration) }}</span> 
                 <div class="absolute text-muddy-waters-100 text-8xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(chillData.np.now_playing.played_at) }}
                </div>
               </div>
              </div>
               <div class="ms-2" >
                <div class="px-3  text-center mb-0 py-3  rounded-xl w-full text-muddy-waters-200  bg-opacity-50  "> 
                  <span class="text-lg">{{ chillData.np.now_playing.song.title }}</span><br/>
                  <span class="text-md">{{ chillData.np.now_playing.song.artist }}</span><br/>
                  <span class="text-md">Album: {{ chillData.np.now_playing.song.album }}</span>
                </div>
               </div>
            </div>
             <hr/>
          <h2 v-if="chillData.np.now_playing.playlist !== ''" class="my-3 text-lg text-white">Next Song:</h2>

<div v-if="chillData.np.now_playing.playlist !== ''" class="mt-3 mb-5 rounded-xl  ice-player-el text-muddy-waters-300" >
    <div class=" relative">
      <img 
    :src="chillData.np.playing_next.song.art" 
    alt="History Cover"
    class="history-cover cursor-pointer rounded-xl h-auto w-24"
    @click="openLightbox(chillData.np.playing_next.song.art, 0)" 
  >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
        {{ getTimeFromTimestamp(chillData.np.playing_next.played_at) }}
       </div>
      </div>
     <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
      <div class="px-3 rounded-xl w-full text-muddy-waters-200 ellipsify "> 
        <span class="text-sm">Show: {{ chillData.np.playing_next.playlist }}</span><hr/>
        <span class="text-lg">{{ chillData.np.playing_next.song.title  }}</span><br/>
        <span class="text-md">{{ chillData.np.playing_next.song.artist  }}</span>
      </div>
    </div>
   </div>
          <hr/>
          <h2 class="text-lg mt-3 text-white">Recent Songs:</h2>      
          <ul>
          <li v-for="(historyItem, index) in chillData.np.song_history.slice(0, 5)" :key="index">
            <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el text-muddy-waters-200" >
              <div class=" relative">
                <img 
              v-if="chillData.np.song_history[index].song.art" 
              :src="chillData.np.song_history[index].song.art" 
              alt="History Cover"
              class="history-cover cursor-pointer rounded-xl h-auto w-24"
              @click="openLightbox(chillData.np.song_history[index].song.art, index)" 
            >  <div class="absolute text-muddy-waters-100 text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(historyItem.played_at) }}
                 </div>
                </div>
               <div class="" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                  <span class="text-lg">{{ historyItem.song.title  }}</span><br/>
                  <span class="text-md">{{ historyItem.song.artist  }}</span>
                </div>
              </div>
             </div>
          </li>
        </ul>       
      </div> 
      </div>
    </div>

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
import { getTimeFromTimestamp, minSec } from '@/composables/time';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { initPlayerStore } from '@/stores/initPlayer';
import { useAzuracastData } from '@/stores/stationData';
import { useOmfmData } from '@/stores/stationData_omfm';
const useInitPlayerStore = initPlayerStore();
const np_ac = useAzuracastData();
const np_omfm = useOmfmData();
const playerSwiper = ref(null)
const swiper1 = useSwiper(playerSwiper, {
loop: false,
slidesPerView: 'auto',
navigation: false,
})
const streamsSmallMenu = ref(false);
const dropUpContainer = ref(null);
const handleOutsideClick = (event) => {if (dropUpContainer.value && !dropUpContainer.value.contains(event.target)) { streamsSmallMenu.value = false; }};
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
  
});

const omfmData = computed(() => np_omfm.stations['station:radio']);
const cdpData = computed(() => np_omfm.stations['station:cdp']);
const radioData = computed(() => np_ac.stations['station:radio']);
const comaData = computed(() => np_ac.stations['station:coma']);
const terraData = computed(() => np_ac.stations['station:terra']);
const coreData = computed(() => np_ac.stations['station:core']);
const chillData = computed(() => np_ac.stations['station:chill']);

const backgroundImage = computed(() => {
    if (currentStream.value === 'stream' && np_omfm.coverArtUrls['station:radio']) {
      return `url(${np_omfm.coverArtUrls['station:radio']})`;
    } else if (currentStream.value === 'cdp' && np_omfm.coverArtUrls['station:cdp']) {
      return `url(${np_omfm.coverArtUrls['station:cdp']})`;
    } else if (currentStream.value === 'rock' && np_ac.coverArtUrls['station:radio']) {
      return `url(${np_ac.coverArtUrls['station:radio']})`;
    } else if (currentStream.value === 'coma' && np_ac.stations['station:coma']?.np?.now_playing?.song?.art) {
      return `url(${np_ac.stations['station:coma'].np.now_playing.song.art})`;
    } else if (currentStream.value === 'terra' && np_ac.stations['station:terra']?.np?.now_playing?.song?.art) {
      return `url(${np_ac.stations['station:terra'].np.now_playing.song.art})`;
    } else if (currentStream.value === 'core' && np_ac.stations['station:core']?.np?.now_playing?.song?.art) {
      return `url(${np_ac.stations['station:core'].np.now_playing.song.art})`;
    } else if (currentStream.value === 'chill' && np_ac.stations['station:chill']?.np?.now_playing?.song?.art) {
      return `url(${np_ac.stations['station:chill'].np.now_playing.song.art})`;
    }
    return 'url(/static/img/defaultCoverart.jpg)';
});
const playerMenuOpen = ref(false)

function playerMenuToggle() {
  playerMenuOpen.value = !playerMenuOpen.value;
}

import { currentStreamStore } from '@/stores/currentStream'; // Import the store

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
    case 'terra':
      return 'TerraFM';
    case 'core':
      return 'CORE FM';
    case 'chill':
      return 'Chill FM';
    case 'cdp':
      return 'Café de Paris';
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
// onMounted(() => {

// useInitPlayerStore.loadLocalStorageHLS('hls', () => {
//     useInitPlayerStore.initPlayer();
//     if (useInitPlayerStore.ctx.state === 'suspended') {
//     useInitPlayerStore.unlockAudioContext(useInitPlayerStore.ctx, () => {
//       if ('mediaSession' in navigator) {
//     if (useInitPlayerStore.isPlaying) {
//       navigator.mediaSession.playbackState = 'playing';
//       updateMediaSession();
//     } else {
//       navigator.mediaSession.playbackState = 'paused';
//     }
//   }
//       updateTitle();
//     });  
//     }
// });
// });
onMounted(() => {
  updateMediaSession();
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler("play", () => {
    useInitPlayerStore.togglePlayAll();
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    useInitPlayerStore.togglePlayAll();
  });
  navigator.mediaSession.setActionHandler("stop", () => {
    useInitPlayerStore.togglePlayAll();
  });
  }
})
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
 watch(terraData, () => {updateTitleAndMediaSession()});
 watch(coreData, () => {updateTitleAndMediaSession()});
 watch(chillData, () => {updateTitleAndMediaSession()});
 watch(cdpData, () => {updateTitleAndMediaSession()});

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
  let artwork = '/static/img/defaultCoverart.jpg'; 

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
    case 'core':
      if (comaData.value) {
        title = coreData.value.np.now_playing.song.title;
        artist = coreData.value.np.now_playing.song.artist;
        album = coreData.value.np.now_playing.song.album;
        artwork = coreData.value.np.now_playing.song.art;
      }
      break;
    case 'terra':
      if (terraData.value) {
        title = terraData.value.np.now_playing.song.title;
        artist = terraData.value.np.now_playing.song.artist;
        album = terraData.value.np.now_playing.song.album;
        artwork = terraData.value.np.now_playing.song.art;
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
    case 'cdp':
      if (omfmData.value && np_omfm.coverArtUrls['station:cdp']) {
        title = cdpData.value.np.now_playing.song.title;
        artist = cdpData.value.np.now_playing.song.artist;
        album = cdpData.value.np.now_playing.song.album;
        artwork = np_omfm.coverArtUrls['station:cdp'];
      }
      break;
    case 'chill':
      if (chillData.value) {
        title = chillData.value.np.now_playing.song.title;
        artist = chillData.value.np.now_playing.song.artist;
        album = chillData.value.np.now_playing.song.album;
        artwork = chillData.value.np.now_playing.song.art;
      }
      break;
  }

  return { title, artist, album, artwork };
}
const colorMode = useColorMode()
const dynamicBackgroundColor = computed(() => {
  let stationKey;
  let colorSource;
  if (currentStream.value === 'stream') {
    stationKey = 'station:radio'; 
    colorSource = np_omfm;
  } else if (currentStream.value === 'cdp') {
    stationKey = 'station:cdp'; 
    colorSource = np_omfm;
  } else if (currentStream.value === 'rock') {
    stationKey = 'station:radio';
    colorSource = np_ac;
  } else {
    stationKey = `station:${currentStream.value}`;
    colorSource = np_ac;
  }
  const color = colorSource.dominantColors[stationKey];
  const isDark = (colorMode.value === 'dark');
  let opacity;
  if (isDark) {
    opacity = 0.6;
  } else {
    opacity = 0.85;
  }
  const backgroundColor = color ? `rgba(${color.join(',')},${opacity})` : 'rgb(43, 48, 53)'; 
  return { background: backgroundColor };
});

import chroma from 'chroma-js';
// const dynamicTextColor = computed(() => {
//   const backgroundColor = dynamicBackgroundColor.value.background;
//   let rgb = [0, 0, 0]; // Default to black if parsing fails

//   try {
//     // More robust RGB extraction handling various formats, including rgba
//     const match = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d*\.?\d+))?\)/i);
//     if (match) {
//       rgb = match.slice(1, 4).map(Number);
//     } else if (backgroundColor.startsWith('#')) { //Handle hex colors
//       rgb = chroma(backgroundColor).rgb();
//     }
//   } catch (error) {
//     console.error("Error parsing background color:", error, backgroundColor);
//   }

//   const color = chroma(rgb);
//   const luminance = color.luminance();

//   const contrastRatioThreshold = 4.5; // WCAG AA requires at least 4.5
//   let textColor;

//   if (luminance > 0.5) {
//     textColor = color.darken(getContrastLevel(luminance)).hex();
//   } else {
//     textColor = color.brighten(getContrastLevel(1-luminance)).hex();
//   }

//   return { 
//     color: textColor,
//     borderColor: `1px ${textColor} solid` 
//    };
// });
// function getContrastLevel(luminance) {
//     if (luminance > 0.8) { // If background is very light
//         return 3; // use a strong darkening
//     } else {
//         // Otherwise, use the previous non-linear approach
//         return 1 + 2 * Math.pow(Math.abs(luminance - 0.5), 2.2);
//     }
// }
const dynamicTextColor = computed(() => {
  const backgroundColor = dynamicBackgroundColor.value.background;
  let rgb = [0, 0, 0]; // Default to black if parsing fails
  try {
    const color = chroma(backgroundColor);
    rgb = color.rgb();
  } catch (error) {
    console.error("Error parsing background color:", error, backgroundColor);
    return { color: '#000', borderColor: '1px #000 solid' }; // Fallback to black
  }
  const luminance = chroma(rgb).luminance();
  let textColor;
  // More aggressive contrast adjustment:
  if (luminance > 0.8) { // Very light background
    textColor = chroma(rgb).darken(4).hex(); // Stronger darkening
  } else if (luminance < 0.2) { // Very dark background
    textColor = chroma(rgb).brighten(3).hex(); // Stronger brightening
  } else {
      // Calculate contrast ratio.  Aim for WCAG AAA (7:1) if possible, otherwise AA (4.5:1)
      const targetRatio = 7; // Try for AAA contrast first
      let attempt = 1; // initial attempt
      let calculatedTextColor = chroma(rgb).darken(attempt);
      let ratio = chroma.contrast(calculatedTextColor, chroma(rgb));
      while (ratio < targetRatio && attempt < 5) {
          attempt++;
          calculatedTextColor = chroma(rgb).darken(attempt);
          ratio = chroma.contrast(calculatedTextColor, chroma(rgb));
      }
      if (ratio < 4.5) {
        // fallback to AA
        console.warn(`Could not achieve AAA contrast for ${backgroundColor}, using AA`)
      }
      textColor = calculatedTextColor.hex();
  }
  return { color: textColor, borderColor: `1px ${textColor} solid` };
});
</script>