<template>
  <section class="mx-3 sm:mx-5 lg:mx-20">
    <div  v-if="l" class="min-h-screen py-6 mx-auto lg:mx-20 transition-colors duration-300 dark:bg-sxvx-dark-bg dark:text-gray-100 bg-sxvx-light-bg text-gray-900">
      <div class="mb-8">
        <h2 class="text-3xl font-semibold dark:text-white text-gray-800 mb-4">Station Listeners</h2>
        <p class="dark:text-gray-300 text-gray-600">Real-time listener data for our stations.</p>
        <p class="text-xl font-medium dark:text-gray-200 text-gray-800">
          Overall Listeners: <span class="font-bold">{{ overallTotalListeners }}</span>
        </p>
      </div>
      <div v-for="(streamListeners, streamName) in streams" :key="streamName" class="mb-8">
        <StreamListeners :stream-name="streamName" :listeners="streamListeners" />
      </div>
    </div>
    <div v-else class="min-h-screen py-6 mx-auto lg:mx-20 transition-colors duration-300 dark:bg-sxvx-dark-bg dark:text-gray-100 bg-sxvx-light-bg text-gray-900">
      Loading...
    </div>
  </section>
</template>
<script setup>
import { useListenersData } from '@/stores/stationListeners';
const listenersData = useListenersData();
const l = computed(() => listenersData.channel['station:listeners']);
let isConnected = ref(false);
const streams = computed(() => {
  if (!l.value) return {};
  const { total_listeners, ...streamsData } = l.value;  // Extract total_listeners
  return streamsData; // Return the rest as streams
});
onMounted(() => {
  listenersData.connectToSSE();
  isConnected.value = true;
});
onUnmounted(() => {
  if (listenersData.eventSource && isConnected.value) {
    listenersData.eventSource.close();
    listenersData.eventSource = null;
    isConnected.value = false;
  }
});
const overallTotalListeners = computed(() => {
  if (!l.value || !l.value.total_listeners) {
    return 0;
  }
  return Object.values(l.value.total_listeners).reduce((sum, count) => sum + count, 0);
});
</script>