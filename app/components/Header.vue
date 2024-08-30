<template>
  <header style="z-index:2" class="dark:text-zinc-200 text-zinc-700 ">
    <div
      ref="header"
      class="header dark:text-zinc-200 text-zinc-600 
     container-fluid 
     mx-auto lg:mx-0 fixed  top-0 left-0 right-0  flex  bg-sxvx-light dark:bg-sxvx-dark justify-between p-4  lg:px-20"
    >
      <NuxtLink :to="localePath('/')" class="flex font-medium items-center dark:text-zinc-200 text-zinc-700">
        <img   src="~/assets/img/om2.svg" alt="logo" class="dark:block hidden w-10 h-10  " />
        <img   src="~/assets/img/om1.svg" alt="logo" class="dark:hidden w-10 h-10  " />
        <span class="ml-1 text-2xl">omFM</span>
      </NuxtLink>
      


      <!-- Desktop nav -->
      <nav class="hidden md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 lg:flex flex-wrap items-center text-base justify-center">
        <NuxtLink :to="localePath('/')" class="mr-5 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('home') }}</NuxtLink>
        <NuxtLink :to="localePath('/about')" class="mr-5 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('about') }}</NuxtLink>
        <NuxtLink :to="localePath('/services')" class="mr-5 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('services') }}</NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="mr-5 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('contact') }}</NuxtLink>
        <NuxtLink :to="localePath('/blog')" class="mr-5 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('blog') }}</NuxtLink>
        <NuxtLink :to="localePath('/blog/articles')" class="mr-5 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('articles') }}</NuxtLink>

      </nav>
      <div class="hidden md:flex">
     
        
        

       <!--  <ClientOnly> Without this block apps show Hydration error but works ok. TODO </ClientOnly>  -->
      </div>

    <!-- Mobile nav -->
    <div class="flex">
     <div class="flex">
      <BtnShowHidePlayer />
      
      <ClientOnly> 
        <BtnLocaleSwitch />
        <BtnToggleColorMode />
        <BtnEffects />
      </ClientOnly> 
     
     </div>
     <div class="flex lg:hidden">
      <!-- <button type="button" class="ml-4 flex rounded-full bg-slate-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2" @click="mobileMenuOpen = true"> -->
     <button type="button" class="ml-1 sm:ml-4 flex rounded-xl bg-slate-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2" @click="mobileMenuToggle()" >
     <span class="sr-only">Open main menu</span>
     <Icon name="heroicons:bars-3" class="w-6 h-6" />
     </button>
     </div>
    </div>

  </div> 
    <ClientOnly>
          <div class="fixed inset-0 z-10 backdrop-filter backdrop-blur-sm bg-black bg-opacity-20" v-if="mobileMenuOpen"  @click="mobileMenuToggle()" />
          <div  id="myMobileMenu"   :class="{ 'translate-x-0': mobileMenuOpen, 'translate-x-full': !mobileMenuOpen }"  class="transition-transform duration-300 ease-in-out fixed lg:hidden drop-shadow-2xl inset-y-0 right-0 z-10  w-2/3 sm:w-full overflow-visible dark:text-zinc-200 text-zinc-600 bg-sxvx-light dark:bg-sxvx-dark px-6 py-6 max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              
              <button type="button" @click="mobileMenuToggle()" class="-m-2.5 rounded-md p-2.5">
                <span class="sr-only">Close menu</span>
                <Icon name="heroicons:x-mark" class="w-7 h-7" />
              </button>
              <h1 class="text-xl">Menu</h1>
            </div>
          <hr class="mt-5"/>
            <div class="flex my-2 justify-center">
                   
                  <BtnLocaleSwitch />
                  <BtnToggleColorMode />
                  <!-- <BtnEffects /> -->
                </div>
            <hr/>
            <div class="mt-6 flow-root" >
              <div class="-my-6 divide-y divide-zinc-500/10">
                <div class="space-y-2 py-6" >
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('home') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/about')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('about') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/services')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('services') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/contact')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('contact') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/blog')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('blog') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/blog/articles')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('articles') }}</NuxtLink>

                </div>
              </div>
            </div>
            <hr />
            <span class="flex   my-4 justify-center">
        <a class="text-gray-500">
          <Icon name="bxl:discord" class="h-6 w-6 text-zinc-500" aria-hidden="true" />
        </a>
        <a class="ml-3 text-gray-500">
          <Icon name="bxl:telegram" class="h-6 w-6 text-zinc-500" aria-hidden="true" />
        </a>
        <a class="ml-3 text-gray-500">
          <Icon name="bxl:vk" class="h-6 w-6 text-zinc-500" aria-hidden="true" />
        </a>
        <a class="ml-3 text-gray-500">
          <Icon name="bxl:apple" class="h-6 w-6 text-zinc-500" aria-hidden="true" />
        </a>
      </span>
      <hr/>
    </div>
      </ClientOnly>

      <!-- Old menu compatible with at thhe top
      <button type="button" class="ml-4 flex rounded-full bg-slate-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2" @click="mobileMenuOpen = true"> -->

      <!-- <ClientOnly>
        <Dialog as="div" class="md:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
          <div class="fixed inset-0 z-10"  @click="mobileMenuOpen = false" />
          <DialogPanel class="fixed drop-shadow-2xl inset-y-0 right-0 z-10 w-full overflow-visible dark:text-zinc-200 text-zinc-600 bg-zinc-50 dark:bg-zinc-800 px-6 py-6 max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-beetween">
              
              <button type="button" class="-m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false">
                <span class="sr-only">Close menu</span>
                <Icon name="heroicons:x-mark" class="w-7 h-7" />
              </button>
            </div>
          <hr class="mt-5"/>
            <div class="flex my-2 justify-center">
                  <ShowHidePlayerBtn />
                  <LocaleSwitch />
                  <ToggleColorMode />
                  <Effects />
                </div>
            <hr/>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-zinc-500/10">
                <div class="space-y-2 py-6">
                  <NuxtLink :to="localePath('/')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('home') }}</NuxtLink>
                  <NuxtLink :to="localePath('/about')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('about') }}</NuxtLink>
                  <NuxtLink :to="localePath('/services')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('services') }}</NuxtLink>
                  <NuxtLink :to="localePath('/contact')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('contact') }}</NuxtLink>
                  <NuxtLink :to="localePath('/blog')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('blog') }}</NuxtLink>
                  <NuxtLink :to="localePath('/blog/articles')" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('articles') }}</NuxtLink>

                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </ClientOnly> -->

  </header>
</template>

<script setup>
const localePath = useLocalePath()
const mobileMenuOpen = ref(false)


import { ref, onMounted, onBeforeUnmount } from 'vue';
 

function mobileMenuToggle() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}
// Initialize refs and variables
const header = ref(null);
const lastScrollTop = ref(0);
const threshold = 300;
const hidePoint = 30;
 
// Function to handle scroll
const handleScroll = () => {
  const scrollTop = window.scrollY;
  
  if (lastScrollTop.value > scrollTop) {
    if (header.value.classList.contains('hide')) {
      header.value.classList.remove('hide');
    }
    if (header.value.classList.contains('logo_resize')) {
      header.value.classList.remove('logo_resize');
    }
  } else if (scrollTop > threshold) {
    if (!header.value.classList.contains('hide')) {
      header.value.classList.add('hide');
    } 
  }  
  lastScrollTop.value = scrollTop;

  if (scrollTop > hidePoint) {
    header.value.classList.add('is-scroll');
    header.value.classList.add('logo_resize');
  } else {
    header.value.classList.remove('is-scroll');
    header.value.classList.remove('logo_resize');
  }
};

// Function to handle reaching the end of the page
const handleEndScroll = () => {
  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  // Check if we've reached the end of the page
  if (scrollTop + clientHeight >= scrollHeight) {
    if (header.value.classList.contains('hide')) {
      header.value.classList.remove('hide');
    } 
  }
};

// Lifecycle hooks to add/remove the scroll event listener
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleEndScroll);
    lastScrollTop.value = window.scrollY; // Initialize scroll position
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', handleEndScroll);
  }
});
</script>


 

<style scoped>

 
/* Add styles here */
.header {
  transition: all 0.5s;
  opacity: 1;
 
  
}

.header img {
  transition: all 0.5s;
}

.header.hide {
  transform: translateY(-100%);
}
.header.logo_resize img {
  transform: scale(0.8);
  
}

.header.is-scroll {
  padding-top: 5px!important;
  padding-bottom: 5px!important;
  opacity: 0.96;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
}
</style>