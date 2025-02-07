<template>
  <section class="mx-3 sm:mx-5 lg:mx-20 font-UNSCII">
    <div class="  justify-center flex mx-auto lg:mx-20 ">

      <div v-if="coreData" class="container">  
        <h2 class="my-5 text-2xl">Now playing:</h2>      

            <div class="ice-player-el" >
               <div class="relative">
                 <img class="rounded-xl h-auto w-32 shadow-2xl cursor-pointer sm:w-52 shadow-np dark:shadow-np-dark" :src="coreData.np.now_playing.song.art" alt="Album Cover"  @click="openLightbox(coreData.np.now_playing.song.art, 0)" >
                 <div class="absolute text-muddy-waters-100 text-4xl sm:text-6xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(coreData.np.now_playing.played_at) }}
                 </div>
                </div>
               <div class="ms-2 np-main">
                <div class="px-3 py-1 mb-0 sm:py-4 sm:mb-2 rounded-xl w-full ellipsify shadow-np dark:shadow-np-dark"
                :style="dynamicBackgroundColor"> 
                  <span class="text-xl sm:text-2xl" :style="{color: dynamicTextColor.color}">{{ coreData.np.now_playing.song.title }}</span><br/>
                  <span class="text-lg sm:text-xl" :style="{color: dynamicTextColor.color}">{{ coreData.np.now_playing.song.artist }}</span><br/>
                  <span class="text-md sm:text-lg" :style="{color: dynamicTextColor.color}" style="font-family: monospace">{{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:core'].elapsed) }} / {{ np_ac.isLoading ? '' : minSec(np_ac.progress['station:core'].duration) }}</span> 
                </div>
                <div class="mt-2 sm:mt-2 text-md sm:text-xl px-3 py-1 sm:py-5 rounded-xl w-full ellipsify shadow-np dark:shadow-np-dark"
                 :style="dynamicBackgroundColor"> 
                <span class="text-sm sm:text-lg" :style="{color: dynamicTextColor.color}"> 
                 Show: {{ coreData.np.now_playing.playlist }}
                </span>
                </div>
               </div>
            </div>
            <div class="my-2 rounded-xl relative w-full h-5 overflow-hidden shadow-np dark:shadow-np-dark" :style="dynamicBackgroundColor">
            <div class="absolute" style="height: 30px; transition: width 1s linear; opacity: 0.5" :style="{background: dynamicTextColor.color, width: `${( np_ac.progress['station:core'].elapsed /  np_ac.progress['station:core'].duration * 100).toFixed(2)}%` }"></div>
            </div>
          <h2 class="my-5 text-2xl">Next Song:</h2>
          <div class="mt-2 rounded-xl  ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-300" >
              <div class=" relative">
                <img 
              v-if="coreData.np.playing_next.song.art" 
              :src="coreData.np.playing_next.song.art" 
              alt="History Cover"
              class="history-cover cursor-pointer rounded-l-xl h-auto w-24 sm:w-28"
              @click="openLightbox(coreData.np.playing_next.song.art, 0)" 
            >  <div class="absolute text-muddy-waters-100 text-3xl sm:text-4xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(coreData.np.playing_next.played_at) }}
                 </div>
                </div>
               <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-2 sm:py-2 rounded-xl w-full  text-muddy-waters-800 dark:text-muddy-waters-200 ellipsify "> 
                  <span class="text-sm sm:text-md">Show: {{ coreData.np.playing_next.playlist }}</span><hr/>
                  <span class="text-xl sm:text-2xl">{{ coreData.np.playing_next.song.title  }}</span><br/>
                  <span class="text-lg sm:text-xl">{{ coreData.np.playing_next.song.artist  }}</span>
                </div>
              </div>
              <div class="me-2">
                <Icon
                name="heroicons-solid:musical-note"
                class="h-7 w-7  bg-muddy-waters-800 dark:bg-muddy-waters-200"   
                aria-hidden="true"
               />
              </div>
             </div>
         
          <h2 class="my-5 text-2xl">Recent Songs:</h2>      
          <ul>
          <li v-for="(historyItem, index) in coreData.np.song_history.slice(0, 5)" :key="index">

            <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200" >
              <div class=" relative">
                <img 
              v-if="coreData.np.song_history[index].song.art" 
              :src="coreData.np.song_history[index].song.art" 
              alt="History Cover"
              class="history-cover cursor-pointer rounded-l-xl h-auto w-16 sm:w-20"
              @click="openLightbox(coreData.np.song_history[index].song.art, index)" 
            >  <div class="absolute text-muddy-waters-100 text-2xl sm:text-3xl pointer-events-none" style="top:50%;left:50%;transform:translate(-50%, -50%);text-shadow: 1px 2px 5px black;">
                  {{ getTimeFromTimestamp(historyItem.played_at) }}
                 </div>
                </div>
               <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                  <span class="text-lg sm:text-2xl">{{ historyItem.song.title  }}</span><br/>
                  <span class="text-md sm:text-xl">{{ historyItem.song.artist  }}</span>
                </div>
              </div>
              <div class="me-2">
                <Icon
                name="heroicons-solid:musical-note"
                class="h-7 w-7  bg-muddy-waters-800 dark:bg-muddy-waters-200"   
                aria-hidden="true"
               />
              </div>
             </div>
          </li>
        </ul>
      </div>
      <div v-else class="container">
        <h2 class="my-5 text-2xl">Now playing:</h2>      
        <div class="ice-player-el" >
               <div class="relative">
                 <img class="rounded-xl h-auto w-32 sm:w-52" src="/static/img/defaultCoverart.jpg" alt="Album Cover">
                </div>
               <div class="ms-2 np-main">
                <div class="px-3 py-2 mb-0 sm:py-6 sm:mb-5 rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200 ellipsify "> 
                  <span class="text-xl sm:text-2xl">loading...</span><br/>
                  <span class="text-lg sm:text-xl">loading...</span>
                </div>
                <div class="mt-2 sm:mt-2 text-md sm:text-xl px-3 py-1 sm:py-5 rounded-xl w-full bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200 ellipsify"
               > 
                <span class="text-sm sm:text-lg"> 
                  00:00 / 00:00
                </span>
                </div>
               </div>
            </div>
            <div class="bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200  bg-opacity-50 my-2 rounded-xl relative w-full h-5 overflow-hidden">
            </div>
          <h2 class="my-5 text-2xl">Next Song:</h2>      
          <div class="mt-2 rounded-l-xl ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200" >
              <div class=" relative">
              <img 
              src="/static/img/defaultCoverart.jpg" 
              alt="History Cover"
              class="history-cover rounded-l-xl h-auto w-24 sm:w-28"
              > 
                </div>
               <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-4 sm:py-4 rounded-xl w-full  ellipsify "> 
                  <span class="text-xl sm:text-2xl">loading...</span><br/>
                  <span class="text-lg sm:text-xl">loading...</span>
                </div>
              </div>
                <div class="me-2">
                <Icon
                name="heroicons-solid:musical-note"
                class="h-7 w-7  bg-muddy-waters-800 dark:bg-muddy-waters-200"   
                aria-hidden="true"
               />
              </div>
             </div>
          <h2 class="my-5 text-2xl">Recent Songs:</h2>      
          <ul>
          <li v-for="i in 5" :key="i">
            <div class="mt-3 sm:mt-5 rounded-xl  ice-player-el bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200" >
              <div class=" relative">
                <img 
              src="/static/img/defaultCoverart.jpg" 
              alt="History Cover"
              class="history-cover rounded-l-xl h-auto w-16 sm:w-20"
              >  
                </div>
               <div class="ms-2" style="flex-grow:1;flex-shrink:1;flex-basis:0%;min-width:0;">
                <div class="px-3 py-0 sm:py-2 rounded-xl w-full  ellipsify "> 
                  <span class="text-xl sm:text-2xl">loading...</span><br/>
                  <span class="text-lg sm:text-xl">loading...</span>
                </div>
              </div>
             </div>
          </li>
        </ul>
      </div> 
      <VueEasyLightbox
      ref="lightbox"
      :visible="lightboxVisible"
      :imgs="lightboxImages"
      :index="lightboxIndex"
      @hide="lightboxVisible = false"
      />
      </div>
    </section>
    </template>
    
  <script setup>
  import chroma from 'chroma-js';
  import { getTimeFromTimestamp, minSec } from '@/composables/time';
  import { useAzuracastData } from '@/stores/stationData'
  const np_ac = useAzuracastData();
  const coreData = computed(() => np_ac.stations['station:core']);
  const lightboxVisible = ref(false);
  const lightboxIndex = ref(0);
  const lightboxImages = ref([]);
  const openLightbox = (imageUrl,   index) => {
    lightboxImages.value =  imageUrl; 
    lightboxIndex.value = index;
    lightboxVisible.value = true;
  };
const colorMode = useColorMode();
const dynamicBackgroundColor = computed(() => {
  const color = np_ac.dominantColors['station:core'];
  const isDark = (colorMode.value === 'dark');
  let opacity;
  let backgroundColor;
  if (isDark) {
    opacity = color ? 0.6 : 0.5;
    backgroundColor = color ? `rgba(${color.join(',')},${opacity})` : '#2b3035'; 
  } else {
    opacity = color ? 0.85 : 0.5;
    backgroundColor = color ? `rgba(${color.join(',')},${opacity})` : '#f2eee6'; 
  }
  return { background: backgroundColor };
});
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