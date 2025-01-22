<template>
<UTooltip text="Equalizer" :popper="{ offsetDistance: 5 }"  class="">
<NuxtLink :to="localePath('/eq')" class="text-zinc-600 dark:text-zinc-100">
<button
class="flex ml-1 sm:ml-4 hover:cursor-pointer rounded-xl bg-sxvx-light-bg dark:bg-sxvx-dark-bg text-sm   
active:ring-2 active:ring-gray-300 focus:ring-offset focus:ring-offset-gray-800 p-2" 
>
<span class="sr-only">Equalizer</span>
<Icon name="bx:equalizer" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
 </button>
 </NuxtLink>
</UTooltip>
</template>

<script setup>
const localePath = useLocalePath()
</script>