<template>
  <div class="flex min-h-screen flex-col overflow-hidden bg-sxvx-light-bg font-UNSCII text-zinc-700 dark:text-zinc-200 dark:bg-sxvx-dark-bg">
<div id="overlay0" class="overlay radial" 
             style="display: flex;"></div>
<div id="overlay1" class="overlay flicker" style="display: flex;"></div>
<div id="overlay2" class="overlay noise" style="display: flex;"></div>
<div id="overlay3" class="overlay scanlines" style="display: flex;"></div>
<div id="overlay4" class="overlay scanline" style="display: flex;"></div>
<div id="overlay5" class="overlay scanline2" style="display: flex;"></div>

    <!-- Site header -->
    <Header />
    
    <!-- Page content -->
    <main class="my-24 grow">
      <NuxtPage />
    </main>
    <!-- Site footer -->
    <BuyMeCoffee />
    
    <div class="footercurves_sxvx_style_ hidden dark:block"></div>
    <div class="footercurves_sxvx_style_light_ block dark:hidden"></div>
    <Footer />
    <Player />

    

  </div>
  <!-- <iframe
      src="https://coma.omfm.ru"
      width="100%"
      height="100%"
      style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:1;"
      frameborder="0"
      scrolling="no"
    ></iframe> -->
</template>

<script setup defer>
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2rem);
}
</style>
