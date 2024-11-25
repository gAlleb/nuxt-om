<template>
    <div>
      <UTooltip text="Christmas Time!" :popper="{ offsetDistance: 5 }"  class="">


      <button @click="changeChristmasState.toggle()"
      class="flex ml-1 sm:ml-4 rounded-xl transitio-all duration-500 ease-in-out   text-sm focus:outline-none bg-sxvx-light-bg dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 p-2"
      :class="{ 'scale-100' : changeChristmasState.christmas === 'true',
       'scale-75' : changeChristmasState.christmas === 'false' }" >     
       <img src="/santa1.png" class="h-6 w-6" aria-hidden="true"
       />
      </button>
    </UTooltip>
      </div>

</template>

<script setup>
import { useChristmasStore } from '@/stores/christmasStore';
const changeChristmasState = useChristmasStore();
</script>