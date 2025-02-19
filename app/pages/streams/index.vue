<template>
  <div>
    <div ref="streams_header" class="streams_header fixed w-full z-10 flex bg-sxvx-light dark:bg-sxvx-dark">
    <button @click="showDiv(1)" class="w-full rounded-t-lg inline-flex justify-center  font-tenor text-xl" 
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 1,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 1,
    }"
    >omFM</button>
    <button @click="showDiv(2)" class="w-full rounded-t-lg inline-flex justify-center  font-metal text-xl"
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 2,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 2,
    }"
    >Rock
    </button>
    <button @click="showDiv(3)" class="w-full rounded-t-lg inline-flex justify-center  font-UNSCII text-xl"
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 3,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 3,
    }"
    >Coma</button>
    <button @click="showDiv(4)" class="w-full rounded-t-lg inline-flex justify-center  font-UNSCII text-xl"
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 4,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 4,
    }"
    >CORe</button>
    <button @click="showDiv(5)" class="w-full rounded-t-lg inline-flex justify-center  font-tenor text-xl"
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 5,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 5,
    }"
    >Terra</button>
    <button @click="showDiv(6)" class="w-full rounded-t-lg inline-flex justify-center font-UNSCII text-xl"
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 6,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 6,
    }"
    >Chill</button>
    <button @click="showDiv(7)" class="w-full rounded-t-lg inline-flex justify-center font-tenor text-xl"
    :class="{
    'bg-sxvx-light-bg dark:bg-sxvx-dark-bg border-t-2 border-l-2 border-r-2  border-gray-700 dark:border-gray-200':activeDiv === 7,
    'bg-sxvx-light dark:bg-sxvx-dark':!activeDiv !== 7,
    }"
    >Cafe</button>
    </div>
    <div class="h-14"></div>
    <div v-if="activeDiv === 1">
      <StreamsOmfm/>
    </div>
    <div v-if="activeDiv === 2">
      <StreamsRock/>
    </div>
    <div v-if="activeDiv === 3">
      <StreamsComa/>
    </div>
    <div v-if="activeDiv === 4">
      <StreamsCore/>
    </div>
    <div v-if="activeDiv === 5">
      <StreamsTerra/>
    </div>
    <div v-if="activeDiv === 6">
      <StreamsChill/>
    </div>
    <div v-if="activeDiv === 7">
      <StreamsCDP/>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
const activeDiv = ref(1) // Default to showing div 1
const showDiv = (divNumber) => {
  activeDiv.value = divNumber
}
// Initialize refs and variables
const streams_header = ref(null);
const lastScrollTop = ref(0);
const threshold = 300;
const hidePoint = 30;

 
// Function to handle scroll
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const initial_scrollY = window.scrollY;
  
 if (lastScrollTop.value > scrollTop) {
    if (streams_header.value.classList.contains('hide')) {
      streams_header.value.classList.remove('hide');
      streams_header.value.classList.add('hide_a_little');

    }
  } else if (scrollTop > threshold) {
    if (!streams_header.value.classList.contains('hide')) {
      streams_header.value.classList.add('hide');
      streams_header.value.classList.remove('hide_a_little');
    } 
    
  }   
  lastScrollTop.value = scrollTop;

  if ( scrollTop > hidePoint && scrollTop < threshold) {
    streams_header.value.classList.add('hide_a_little_initial');
   } else {
    streams_header.value.classList.remove('hide_a_little_initial');
   }
  if (initial_scrollY < threshold) {
    streams_header.value.classList.remove('hide_a_little');
   }




  


};

// Function to handle reaching the end of the page
const handleEndScroll = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  // Check if we've reached the end of the page
  if (scrollTop + clientHeight >= scrollHeight) {
    if (streams_header.value.classList.contains('hide')) {
      streams_header.value.classList.remove('hide');
      streams_header.value.classList.add('hide_a_little');
    } 
  }
};

// Lifecycle hooks to add/remove the scroll event listener
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleEndScroll);
    lastScrollTop.value = window.scrollY; // Initialize scroll position
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', handleEndScroll);
  }
});
</script>
<style scoped>
/* Add styles here */
.streams_header {
  transition: all 0.5s;
  opacity: 1;
  transform: translateY(0%);
}
.streams_header.hide {
  transform: translateY(-250%);
}
.streams_header.hide_a_little_initial {
  transform: translateY(-94%);
  opacity: 0.96;
}
.streams_header.hide_a_little {
  transform: translateY(-94%);
  opacity: 0.96;
}
</style>