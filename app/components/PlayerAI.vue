<template>
  <div class="bg-gray-800 p-2 rounded-md shadow-md flex items-center">
    <div class="flex items-center space-x-2">
      <h2 class="text-white text-sm font-bold me-2">omFM Stream</h2>
      <audio ref="audioRef" :src="audioUrl" class="w-24" @play="isPlaying = true" @pause="isPlaying = false" @ended="isPlaying = false"></audio> 
    </div>
    <div class="flex items-center space-x-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded focus:outline-none focus:shadow-outline"
        @click="toggleAudio"
      >
        {{ isPlaying ? 'Stop' : 'Play' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const audioUrl = 'https://stream.omfm.ru/stream';
const audioRef = ref(null);
const isPlaying = ref(false);

const toggleAudio = () => {
  if (audioRef.value) {
    if (isPlaying.value) {
      audioRef.value.pause();
    } else {
      audioRef.value.play();
    }
  }
};
</script>

<style scoped>
/* Hide default audio controls */
audio::-webkit-media-controls-panel {
  display: none;
}

/* For compatibility across browsers */
audio {
  width: 100%;
}
</style>