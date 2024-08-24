<template>
  <Menu as="div" class="relative ml-4">
    <div>
      <MenuButton @click="show_hide_player();" id="menu_button" class="flex rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2">
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:radio" class="h-7 w-7 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      
      </MenuButton>
      </div>
  </Menu>
 
 
 </template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { onMounted } from 'vue';

onMounted(() => {
const icecast_player = document.getElementById("overlay1");
function show_hide_player() {
icecast_player.value.classList.toggle('hide_player');
}

})

</script>
<style scoped>
.icecast_player {
  transition: all 0.5s; 
}
.icecast_player.hide_player {
  transform: translateY(-100%);
}
</style>
