<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <Menu as="div" class="relative ml-1 sm:ml-4">
    <div>
      <MenuButton class="flex rounded-xl bg-sxvx-light-bg dark:bg-sxvx-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2">
        <span class="sr-only">Language</span>
        <Icon name="heroicons:language" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-2 w-40 origin-top-right outline rounded-md bg-white dark:bg-zinc-800 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline">
        <MenuItem as="div" class="hover:bg-gray-200 dark:hover:bg-primary-700">
          <NuxtLink :to="switchLocalePath('en')" class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100 w-full">
            <img src="/us.svg" class="h-6 w-8" aria-hidden="true" />
            <span class="text-zinc-600 dark:text-zinc-100">English</span>
          </NuxtLink>
        </MenuItem>
        <MenuItem as="div" class="hover:bg-gray-200 dark:hover:bg-primary-700">
          <NuxtLink :to="switchLocalePath('ru')" class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100 w-full">
            <img src="/ru.svg" class="h-8 w-8" aria-hidden="true" />
            <span class="text-zinc-600 dark:text-zinc-100">Русский</span>
          </NuxtLink>
        </MenuItem>
        <MenuItem as="div" class="hover:bg-gray-200 dark:hover:bg-primary-700">
          <NuxtLink :to="switchLocalePath('es')" class="flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-100 w-full">
            <img src="/es.svg" class="h-6 w-8" aria-hidden="true" />
            <span class="text-zinc-600 dark:text-zinc-100">Español</span>
          </NuxtLink>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
