<template>
  <div>
  <div class="justify-center flex-column h-64 md:h-80" style="margin-top: -30px;">
     <div class="pre_wrapper justify-center scale-50 md:scale-75">
    <div v-for="i in 10" :key="i">
      <div class="wrapper">
   
      <input type="range" min="-15" max="15" step="0.1" v-model="sliderValues[i - 1]" @input="updateEQ(i - 1)">
   
      </div>
      <!-- {{ sliderValues[i-1] }}   -->
    </div>
  </div>
  </div>
  <button class="w-full text-center" @click="resetEQ"><span class="">Reset</span></button>

</div>
</template>

<script setup>
import { ref } from 'vue';
import { initPlayerStore } from '@/stores/initPlayer';

const playerStore = initPlayerStore();
const eqBands = computed(() => playerStore.eqBands); // Reactive stream
const sliderValues = ref(eqBands);

const updateEQ = (bandIndex) => {
  playerStore.setEQGain(bandIndex, sliderValues.value[bandIndex]);
  playerStore.saveEQBandsToStorage(sliderValues.value);
};

const resetEQ = () => {
  sliderValues.value = Array(10).fill(0); // Reset slider values
  // Optionally, you could also call playerStore.setEQGain for each band to 0 to ensure a complete reset:
  for (let i = 0; i < 10; i++) {
    playerStore.setEQGain(i, 0); //If you need to explicitly call the store method for each band
  }
  playerStore.saveEQBandsToStorage(sliderValues.value);
};
</script>
<style scoped>
.wrapper {
  position: relative;
  height: 20rem;
  width: 3.5rem;
  margin: 0.5rem;
  
}
.pre_wrapper {

  display: flex;
 
}
.wrapper::before, .wrapper::after {
  display: block;
  position: absolute;
  z-index: 99;
  color: #fff;
  width: 100%;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  background-color: #333;
}
.wrapper::before {
  content: "+";
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.wrapper::after {
  content: "−";
  bottom: 0;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
}
 
input[type=range] {
  -webkit-appearance: none;
  background-color: rgba(87, 13, 13, 0.497);
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  padding: 20px;
  width: 20rem;
  height: 3.5rem;
  transform: translate(-50%, -50%) rotate(-90deg);
  border-radius: 1rem;
  overflow: hidden;
  cursor: row-resize;
}
input[type=range][step] {
  background-color: transparent;
  background-image: repeating-linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2) calc(12.5% - 1px), #05051a 12.5%);
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0;
  box-shadow: -20rem 0 0 20rem rgba(255, 255, 255, 0.2);
}
input[type=range]::-moz-range-thumb {
  border: none;
  width: 0;
  box-shadow: -20rem 0 0 20rem rgba(255, 255, 255, 0.2);
}
</style>