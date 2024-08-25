<template>
  <Menu as="div" class="relative ml-4 mr-2 md:mr-0">
    <div>
      <MenuButton @click="radioshow();" id="menu_button" class="flex rounded-full bg-slate-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2">
        <span class="sr-only">Effects On/Off</span>
        <Icon name="heroicons:radio" class="h-7 w-7 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      
      </MenuButton>
      </div>
  </Menu>
 
 
 </template>

<script setup>
import { Menu, MenuButton } from '@headlessui/vue'

function radioshow() {
var x = document.getElementById("ice-player");
if (x.style.transform === "translateY(100%)") {
x.style.transform = "translateY(0%)";
x.style.transition = "transform 300ms linear ";
} else {
x.style.transform = "translateY(100%)";
x.style.transition = "transform 300ms linear";
}}
</script>

