<template>
<UTooltip text="Equalizer" :popper="{ offsetDistance: 5 }"  class="">
<NuxtLink :to="targetRoute" class="text-zinc-600 dark:text-zinc-100">
<button
class="flex ml-1 sm:ml-4 hover:cursor-pointer rounded-xl text-sm   
active:ring-2 active:ring-gray-300 focus:ring-offset focus:ring-offset-gray-800 p-2" 
:class="{'bg-sxvx-light-bg dark:bg-sxvx-dark-bg': !isEqPage,
         'bg-green-600': isEqPage}"
>
<span class="sr-only">Equalizer</span>
<Icon name="bx:equalizer" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
 </button>
 </NuxtLink>
</UTooltip>
</template>

<script setup>
import { useRoute } from '#imports'
import { ref, computed } from 'vue'
const localePath = useLocalePath();
const route = useRoute()
const previousRoute = ref(null) 
const isEqPage = ref(false)

onMounted(()=>{
if (route.path === '/eq') {
  previousRoute.value = '/'
  isEqPage.value = true;
} else {
  previousRoute.value = route.path
  isEqPage.value = false;
}
})
const targetRoute = computed(() => {
  if (route.path === '/eq') {
    isEqPage.value = true;
    return previousRoute.value || '/'
  } else {
    previousRoute.value = route.path;
    isEqPage.value = false;
    return localePath('/eq')
  }
})
</script>