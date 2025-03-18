<template>
    <div>
      <div class="flex items-center mb-2">
        <h3 class="text-2xl font-medium dark:text-gray-200 text-gray-800 mr-2">{{ streamName }}</h3>
        <span class="text-lg dark:text-gray-400 text-gray-600">({{ listeners.length }} listeners)</span>
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
            <tr v-if="!listeners || listeners.length === 0" class="dark:hover:bg-gray-700 hover:bg-gray-300">
              <td class="px-4 py-2 border-b text-center" colspan="5">No active listeners</td>
            </tr>
            <tr v-for="(listener, index) in listeners" :key="index" class="dark:hover:bg-gray-700 hover:bg-gray-300">
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
  </template>
  
  <script setup>
  import { minSec } from '@/composables/time';
  
  const props = defineProps({
    streamName: String,
    listeners: Array,
  });
  </script>