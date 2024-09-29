<template>
  <header style="z-index:31" class="dark:text-zinc-200 text-zinc-700 ">
    <div
    ref="header"
    class="header dark:text-zinc-200 text-zinc-600 
     container-fluid 
     mx-auto lg:mx-0 fixed  top-0 left-0 right-0  flex justify-between p-5  bg-sxvx-light dark:bg-sxvx-dark lg:px-20"
    >
      <NuxtLink :to="localePath('/')" class="flex font-medium items-center dark:text-zinc-200 text-zinc-700">
        <img   src="~/assets/img/om2.svg" alt="logo" class="dark:block hidden w-7 h-7  " />
        <img   src="~/assets/img/om1.svg" alt="logo" class="dark:hidden w-7 h-7  " />
        <span class="ml-1 text-xl hidden sm:block">omFM<sup>{{ logoText }}</sup></span>
      </NuxtLink>
      


      <!-- Desktop nav -->
      <nav class="hidden md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 lg:flex flex-wrap items-center text-base justify-center">
        <NuxtLink :to="localePath('/')" class="mr-5 group transition-all duration-300 ease-in-out">
        <span class="bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          {{ $t('home') }}
        </span>
        </NuxtLink>
        <NuxtLink :to="localePath('/about')" class="mr-5 group transition-all duration-300 ease-in-out">
        <span class="bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          {{ $t('about') }}
        </span>
        </NuxtLink>
        <div class="relative" ref="dropdownContainer" @mouseleave="isOpen = false">
        <div  @click="isOpen = !isOpen"  @mouseover="isOpen = true" class="mr-5 group transition-all duration-300 ease-in-out cursor-pointer">
        <span 
        class="bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
        Streams
        <sub>
        <Icon
        name="heroicons:chevron-down"
        class="h-4 w-4"         
        aria-hidden="true"
        /></sub>
        </span>
        </div>
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95" v-if="isOpen">
        <div 
          class="absolute  z-10 mt-0 w-48 origin-top-right outline rounded-md bg-white dark:bg-zinc-800 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline" 
           @click="isOpen = !isOpen"  
          style="left: 50%; transform: translate(-50%);"
        >
        <NuxtLink :to="localePath('/streams/omfm')" class="text-zinc-600 dark:text-zinc-100">
        <button 
        class="my-3 hover:bg-gray-200 dark:hover:bg-primary-700 w-full p-2" >
        <span class="text-zinc-600 dark:text-zinc-100">
          omFM Main
        </span>
        </button>
        </NuxtLink>
        <hr/>
        <NuxtLink :to="localePath('/streams/rock')" class="text-zinc-600 dark:text-zinc-100">
          <button 
            class="my-3 hover:bg-gray-200 dark:hover:bg-primary-700 w-full p-2" >
              <span class="text-zinc-600 dark:text-zinc-100">Rock @ omFM</span>
          </button>
        </NuxtLink>
          <hr/>
          <NuxtLink :to="localePath('/streams/coma')" class="text-zinc-600 dark:text-zinc-100">
          <button
            class="my-3 hover:bg-gray-200 dark:hover:bg-primary-700 w-full p-2">
              <span class="text-zinc-600 dark:text-zinc-100">Coma @ omFM</span>
          </button>
        </NuxtLink>
        <hr/>
        <NuxtLink :to="localePath('/streams')" class="text-zinc-600 dark:text-zinc-100">
        <button 
        class="my-3 hover:bg-gray-200 dark:hover:bg-primary-700 w-full p-2" >
        <span class="text-zinc-600 dark:text-zinc-100">
          All Streams NP
        </span>
        </button>
        </NuxtLink>
        </div>
      </transition>
    </div> 
        <NuxtLink :to="localePath('/blog')" class="mr-5 group transition-all duration-300 ease-in-out">
        <span class="bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out">
          {{ $t('blog') }}
        </span>
        </NuxtLink>
        <NuxtLink :to="localePath('/contact')" class="mr-5 group transition-all duration-300 ease-in-out">
        <span class="bg-left-bottom bg-gradient-to-r from-red-500 to-red-500 bg-[length:0%_5px] bg-no-repeat group-hover:bg-[length:100%_5px] transition-all duration-500 ease-out"> 
          {{ $t('contact') }}
        </span>
        </NuxtLink>
      </nav>
      <div class="hidden md:flex">
     
        
        

       <!--  <ClientOnly> Without this block apps show Hydration error but works ok. TODO </ClientOnly>  -->
      </div>

    <!-- Mobile nav -->
    <div class="flex">
     <div class="flex">
      <BtnShowHidePlayer />
      <BtnSetStream /> 
      <BtnEffects_with_pinia />
      <!-- <BtnEffects_with_pinia_node_version /> -->
      <ClientOnly> 
        <!-- <BtnLocaleSwitch />
        <BtnToggleColorMode /> -->
      </ClientOnly> 
     
     </div>
     <div class="flex">
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
          <div  id="myMobileMenu" 
          :class="{ 'translate-x-0': mobileMenuOpen, 'translate-x-full': !mobileMenuOpen }"  
          class="flex-col transition-transform duration-300 ease-in-out fixed drop-shadow-2xl flex bottom-0 top-0 right-0 z-10 w-11/12 sm:w-full dark:text-zinc-200 text-zinc-600 bg-sxvx-light dark:bg-sxvx-dark px-6 py-6 max-w-sm sm:ring-1 sm:ring-gray-900/10">
          
            <div class="flex items-center justify-between">
              <h1 class="text-xl">Menu</h1>
              <button type="button" @click="mobileMenuToggle()" class="-m-2.5 rounded-md p-2.5">
                <span class="sr-only">Close menu</span>
                <Icon name="heroicons:x-mark" class="w-7 h-7" />
              </button>
             
            </div>
          
            <hr/>
            <div id="content" class="grow-1 overflow-y-auto">
            <div class="flex my-3 justify-center">
                   
                  <BtnLocaleSwitch />
                  <BtnToggleColorMode />
                  <!-- <BtnEffects /> -->
                </div>
            <hr/>
            <div class="mt-0 flow-root" >
              <div class="-my-6 divide-y divide-zinc-500/10">
                <div class="space-y-2 py-6" >
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/')" class="block rounded-lg py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('home') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/about')" class=" block rounded-lg py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('about') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/streams')" class=" block rounded-lg py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('streams') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/streams/omfm')" class="text-zinc-600 dark:text-zinc-100">
                     <button 
                     class="my-3 ps-2 flex hover:bg-gray-200 dark:hover:bg-primary-700 w-full p-2">
                     <span class="text-zinc-600 dark:text-zinc-100">
                     omFM Main
                     </span>
                     </button>
                  </NuxtLink>
                  <hr/>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/streams/rock')" class="text-zinc-600 dark:text-zinc-100">
                     <button 
                     class="my-3 ps-2 flex hover:bg-gray-200 dark:hover:bg-primary-700 w-full p-2">
                     <span class=" text-zinc-600 dark:text-zinc-100">
                     Rock @ omFM
                     </span>
                     </button>
                  </NuxtLink>
                  <hr/>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/streams/coma')" class="text-zinc-600 dark:text-zinc-100">
                     <button 
                     class="my-3 ps-2 flex hover:bg-gray-200 dark:hover:bg-primary-700 w-full p-2" >
                     <span class=" text-zinc-600 dark:text-zinc-100">
                     Coma @ omFM
                     </span>
                     </button>
                  </NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/blog')" class="block rounded-lg py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('blog') }}</NuxtLink>
                  <NuxtLink @click="mobileMenuToggle()" :to="localePath('/contact')" class="block rounded-lg py-2 text-base font-semibold leading-7 hover:dark:text-zinc-50 hover:text-zinc-800">{{ $t('contact') }}</NuxtLink>
                
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
    </div>
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { currentStreamStore } from '../stores/currentStream'; // Import the store

const isOpen = ref(false)
const dropdownContainer = ref(null);
const handleOutsideClick = (event) => {if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) { isOpen.value = false; }};
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});

const useCurrentStreamStore = currentStreamStore(); // Get the store instance
const currentStream = computed(() => useCurrentStreamStore.currentStream); // Reactive stream
const logoText = computed(() => {
  switch (currentStream.value) {
    case 'stream':
      return '';
    case 'rock':
      return 'Rock';
    case 'coma':
      return 'Coma';
    default:
      return ''; // Default text
  }
});


const localePath = useLocalePath()
const mobileMenuOpen = ref(false)

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