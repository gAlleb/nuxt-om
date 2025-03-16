<template>
  <section class="mx-3 sm:mx-5 lg:mx-20">
  <div
    :class="[
      'min-h-screen',
      'py-6',
      'mx-auto',
      'lg:mx-20',
      'transition-colors',
      'duration-300',
      'dark:bg-sxvx-dark-bg', // Dark mode background
      'dark:text-gray-100', // Dark mode text
      'bg-sxvx-light-bg', // Light mode background
      'text-gray-900'  // Light mode text
    ]"
    v-if="l"
  >
    <div class="mb-8">
      <h2 class="text-3xl font-semibold dark:text-white text-gray-800 mb-4">Station Listeners</h2>
      <p class="dark:text-gray-300 text-gray-600">Real-time listener data for our stations.</p>
      <p class="text-xl font-medium dark:text-gray-200 text-gray-800">
        Overall Listeners: <span class="font-bold">{{ overallTotalListeners }}</span>
      </p>
    </div>
    <!-- omFM Stream -->
    <div class="mb-8">
      <div class="flex items-center mb-2">
        <h3 class="text-2xl font-medium dark:text-gray-200 text-gray-800 mr-2">omFM</h3>
        <span class="text-lg dark:text-gray-400 text-gray-600">({{ l.total_listeners.omfm }} listeners)</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto dark:bg-gray-800 bg-white shadow-md rounded-lg">
          <thead class="dark:bg-gray-700 bg-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">IP</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                User Agent
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Stream</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="l.omfm && l.omfm.length === 0" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b text-center" colspan="5">No active listeners</td>
            </tr>
            <tr v-for="(listener, index) in l.omfm" :key="index" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.ip_address || listener.ip || 'Unknown' }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ minSec(listener.connected_time) }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.user_agent }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.mount_name }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">
                {{ listener.location?.country || 'Unknown' }},
                {{ listener.location?.subdivisions?.[0]?.name || listener.location?.region || 'Unknown Region' }},
                {{ listener.location?.city || 'Unknown' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- CDP Stream -->
    <div class="mb-8">
      <div class="flex items-center mb-2">
        <h3 class="text-2xl font-medium dark:text-gray-200 text-gray-800 mr-2">CDP</h3>
        <span class="text-lg dark:text-gray-400 text-gray-600">({{ l.total_listeners.cdp }} listeners)</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto dark:bg-gray-800 bg-white shadow-md rounded-lg">
          <thead class="dark:bg-gray-700 bg-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">IP</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                User Agent
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Stream</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="l.cdp && l.cdp.length === 0" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b text-center" colspan="5">No active listeners</td>
            </tr>
            <tr v-for="(listener, index) in l.cdp" :key="index" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.ip_address || listener.ip || 'Unknown' }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ minSec(listener.connected_time) }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.user_agent }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.mount_name }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">
                {{ listener.location?.country || 'Unknown' }},
                {{ listener.location?.subdivisions?.[0]?.name || listener.location?.region || 'Unknown Region' }},
                {{ listener.location?.city || 'Unknown' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Rock Stream -->
    <div class="mb-8">
      <div class="flex items-center mb-2">
        <h3 class="text-2xl font-medium dark:text-gray-200 text-gray-800 mr-2">Rock</h3>
        <span class="text-lg dark:text-gray-400 text-gray-600">({{ l.total_listeners.rock }} listeners)</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto dark:bg-gray-800 bg-white shadow-md rounded-lg">
          <thead class="dark:bg-gray-700 bg-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">IP</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                User Agent
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Stream</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="l.rock && l.rock.length === 0" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b text-center" colspan="5">No active listeners</td>
            </tr>
            <tr v-for="(listener, index) in l.rock" :key="index" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.ip_address || listener.ip || 'Unknown' }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ minSec(listener.connected_time) }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.user_agent }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.mount_name }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">
                {{ listener.location?.country || 'Unknown' }},
                {{ listener.location?.subdivisions?.[0]?.name || listener.location?.region || 'Unknown Region' }},
                {{ listener.location?.city || 'Unknown' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Terra Stream -->
    <div class="mb-8">
      <div class="flex items-center mb-2">
        <h3 class="text-2xl font-medium dark:text-gray-200 text-gray-800 mr-2">Terra</h3>
        <span class="text-lg dark:text-gray-400 text-gray-600">({{ l.total_listeners.terra }} listeners)</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto dark:bg-gray-800 bg-white shadow-md rounded-lg">
          <thead class="dark:bg-gray-700 bg-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">IP</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                User Agent
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Stream</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="l.terra && l.terra.length === 0" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b text-center" colspan="5">No active listeners</td>
            </tr>
            <tr v-for="(listener, index) in l.terra" :key="index" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.ip_address || listener.ip || 'Unknown' }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ minSec(listener.connected_time) }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.user_agent }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.mount_name }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">
                {{ listener.location?.country || 'Unknown' }},
                {{ listener.location?.subdivisions?.[0]?.name || listener.location?.region || 'Unknown Region' }},
                {{ listener.location?.city || 'Unknown' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Core Stream -->
    <div class="mb-8">
      <div class="flex items-center mb-2">
        <h3 class="text-2xl font-medium dark:text-gray-200 text-gray-800 mr-2">CORE</h3>
        <span class="text-lg dark:text-gray-400 text-gray-600">({{ l.total_listeners.core }} listeners)</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto dark:bg-gray-800 bg-white shadow-md rounded-lg">
          <thead class="dark:bg-gray-700 bg-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">IP</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                User Agent
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Stream</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="l.core && l.core.length === 0" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b text-center" colspan="5">No active listeners</td>
            </tr>
            <tr v-for="(listener, index) in l.core" :key="index" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.ip_address || listener.ip || 'Unknown' }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ minSec(listener.connected_time) }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.user_agent }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.mount_name }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">
                {{ listener.location?.country || 'Unknown' }},
                {{ listener.location?.subdivisions?.[0]?.name || listener.location?.region || 'Unknown Region' }},
                {{ listener.location?.city || 'Unknown' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Coma Stream -->
    <div class="mb-8">
      <div class="flex items-center mb-2">
        <h3 class="text-2xl font-medium dark:text-gray-200 text-gray-800 mr-2">Coma</h3>
        <span class="text-lg dark:text-gray-400 text-gray-600">({{ l.total_listeners.coma }} listeners)</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto dark:bg-gray-800 bg-white shadow-md rounded-lg">
          <thead class="dark:bg-gray-700 bg-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">IP</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                User Agent
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Stream</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="l.coma && l.coma.length === 0" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b text-center" colspan="5">No active listeners</td>
            </tr>
            <tr v-for="(listener, index) in l.coma" :key="index" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.ip_address || listener.ip || 'Unknown' }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ minSec(listener.connected_time) }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.user_agent }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.mount_name }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">
                {{ listener.location?.country || 'Unknown' }},
                {{ listener.location?.subdivisions?.[0]?.name || listener.location?.region || 'Unknown Region' }},
                {{ listener.location?.city || 'Unknown' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Chill Stream -->
    <div class="mb-8">
      <div class="flex items-center mb-2">
        <h3 class="text-2xl font-medium dark:text-gray-200 text-gray-800 mr-2">Chill</h3>
        <span class="text-lg dark:text-gray-400 text-gray-600">({{ l.total_listeners.chill }} listeners)</span>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto dark:bg-gray-800 bg-white shadow-md rounded-lg">
          <thead class="dark:bg-gray-700 bg-gray-200">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">IP</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                User Agent
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">Stream</th>
              <th class="px-4 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-700 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="l.chill && l.chill.length === 0" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b text-center" colspan="5">No active listeners</td>
            </tr>
            <tr v-for="(listener, index) in l.chill" :key="index" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.ip_address || listener.ip || 'Unknown' }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ minSec(listener.connected_time) }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.user_agent }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">{{ listener.mount_name }}</td>
              <td class="px-4 py-2 border-b dark:text-gray-100 text-gray-900">
                {{ listener.location?.country || 'Unknown' }},
                {{ listener.location?.subdivisions?.[0]?.name || listener.location?.region || 'Unknown Region' }},
                {{ listener.location?.city || 'Unknown' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div
    :class="[
      'min-h-screen',
      'py-6',
      'lg:mx-20',
      'mx-auto',
      'transition-colors',
      'duration-300',
      'dark:bg-gray-900',
      'dark:text-gray-100',
      'bg-gray-100',
      'text-gray-900'
    ]"
    v-else
  >
    Loading...
  </div>
</section>
</template>
<script setup>
import { getTimeFromTimestamp, minSec } from '@/composables/time';
import { useListenersData } from '@/stores/stationListeners';
const listenersData = useListenersData();
const l = computed(() => listenersData.channel['station:listeners']);
let isConnected = ref(false)
onMounted(() => {
  listenersData.connectToSSE();
  isConnected.value = true;
});
onUnmounted(() => {
  // Close the event source if it's connected
  if (listenersData.eventSource && isConnected.value) {
    listenersData.eventSource.close();
    listenersData.eventSource = null; // Clear the reference
    isConnected.value = false;
    console.log('SSE connection closed and component unmounted.');
  }
});
const overallTotalListeners = computed(() => {
  if (!l.value || !l.value.total_listeners) {
    return 0;
  }
  return (
    l.value.total_listeners.omfm +
    l.value.total_listeners.cdp +
    l.value.total_listeners.rock +
    l.value.total_listeners.terra +
    l.value.total_listeners.core +
    l.value.total_listeners.coma +
    l.value.total_listeners.chill
  );
});
</script>