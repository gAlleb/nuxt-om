<template>
 
  <footer class="text-gray-600 body-font bg-sxvx-light dark:bg-sxvx-dark dark:text-zinc-200 text-zinc-700">
    
    <div class="container px-5 pb-5 pt-0 mx-auto flex items-center md:flex-row flex-col">
      <NuxtLink :to="localePath('/')" class="flex font-medium items-center text-zinc-700 dark:text-zinc-200 mb-4 md:mb-0">
        <img   src="~/assets/img/om2.svg" alt="logo" class="dark:block hidden w-8 h-8  " />
        <img   src="~/assets/img/om1.svg" alt="logo" class="dark:hidden w-8 h-8  " />
        <span class="ml-1 text-lg">omFM</span>
      </NuxtLink>
      <p class="order-1 md:order-none text-sm dark:text-zinc-200 text-zinc-700 md:ml-4 md:pl-4 md:border-l-2 md:border-gray-200 md:py-2 md:mt-0 mt-4">
        © {{ currentYear }} omFM | To be continued... 
        <!-- <a href="https://twitter.com/KSalout" class="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@KSalout</a> -->
      </p>
      <span class="inline-flex md:ml-auto md:mt-0 mt-4 justify-center md:justify-start">
        <a class="text-gray-500">
          <Icon name="bxl:discord" class="h-6 w-6 text-zinc-500 hover:text-gray-900" aria-hidden="true" />
        </a>
        <a class="ml-3 text-gray-500">
          <Icon name="bxl:telegram" class="h-6 w-6 text-zinc-500  hover:text-gray-900" aria-hidden="true" />
        </a>
        <a class="ml-3 text-gray-500">
          <Icon name="bxl:vk" class="h-6 w-6 text-zinc-500 hover:text-gray-900" aria-hidden="true" />
        </a>
        <a class="ml-3 text-gray-500">
          <Icon name="bxl:apple" class="h-6 w-6 text-zinc-500 hover:text-gray-900" aria-hidden="true" />
        </a>
      </span>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
