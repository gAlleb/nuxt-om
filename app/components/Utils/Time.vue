<script setup lang="ts">
import { computed} from 'vue'
import { useNow } from '@vueuse/core'

const now = useNow({ interval: 1000 })

const formattedTime = computed(() => {
  return now.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
})
</script>

<template>
  <div class="mx-auto max-w-3xl flex items-center justify-end op-70">
    <span
      class="inline-flex items-center text-lg bg-sxvx-dark opacity-70 px-2 py-1 mb-3 -mt-2 font-mono">
      {{ formattedTime }}
    </span>
   
  </div>
</template>

<style scoped>
</style>