<template>
    <!-- <div class="h-screen absolute"> -->
        <!-- <div v-if="loading" class="fixed left-0 top-0 transition duration-500 h-screen w-full z-50 bg-green-500" /> -->
    <div v-if="loading" class='pre-loader fixed top-0 left-0 bg-zinc-900 flex items-center h-full w-full content-center'>
        <img class='loading-gif absolute h-32 h-32' alt='Establishing connection to transcendental realms...' src="~/assets/img/preloader/p.svg"/>
    </div>
    <!-- </div> -->
</template>
<script setup>
const nuxtApp = useNuxtApp();
const loading = ref(true);
nuxtApp.hook("page:start", () => {
  // loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  // loading.value = false;
  document.querySelector('.pre-loader').className += ' hidden';
});
</script>

<style scoped>
.loading-gif {
top: 50%; left: 50%; transform: translate(-50%, -50%);
}
.pre-loader {
    z-index: 9999999;
    display: flex; 
}
.pre-loader.hidden {
    animation: fadeOut 2s; /** change to 1s */
    animation-fill-mode: forwards;
}
@keyframes fadeOut {
    100% {
    opacity: 0;
    visibility: hidden;
          }
}
</style>