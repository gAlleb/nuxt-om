<template>

  <section>
   <!-- <div class="mx-auto flex max-w-8xl flex-col justify-center rounded-full py-2">
    <h1 class="bg-primary-600 text-7xl font-extrabold text-zinc-900 dark:text-zinc-50">{{ $t('about') }}</h1>
  <UCard>
      <div>
        <p>Count: {{ counter.count }}</p>
        <p>Computed Count: {{ counter.computedCount }}</p>
        <UButton variant="solid" label="add" @click="counter.increment" />
      </div>
    </UCard> 
  </div> -->
    <div class="flex relative overflow-hidden dark:hidden font-tenor" style="background: url('/omfm4-light.jpg') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <div class="indexSliderImg-light"></div>
    <div class="absolute z-10 w-full"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
  
    <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
      {{ $t('contact') }}
    </h1>
  
    </div>
  
  
    </div>
    <div class="hidden relative overflow-hidden dark:flex font-tenor" style="background: url('/omfm4.jpg') center 40% no-repeat; background-size: cover; height: 45vh;  ">
    <div class="indexSliderImg"></div>
    <div class="absolute z-10"  style="top: 50%; left: 50%; transform: translate(-50%, -50%);">
  
  <h1 class="text-5xl sm:text-7xl text-sxvx-light text-center" style="text-shadow: 1px 2px 5px rgba(0,0,0,0.3);">
   {{ $t('contact') }}
  </h1>
  
  </div>
    </div>
  <div class="text-2xl sm:text-xl mx-5 lg:mx-20 md:mx-10 sm:mx-3 xs:mx-3 mt-5">

Let's connect!  Whether you have a question, a collaboration proposal, or just want to say hello, I'd love to hear from you.
<br/><br/>
Here's how you can reach me:
<br/><br/>
1. Email: radio@omfm.ru
<br/><br/>
2. IRC:
    <br/><a class="ml-5" href="https://libera.chat" target="_blank">     #omFM at ircs://irc.libera.chat:6697</a>
    <br/><a class="ml-5" href="https://ircnet.ru" target="_blank">      #omFM at ircs://ircnet.ru:6689</a>
</div>

  </section>
 
</template>
<script setup></script>
