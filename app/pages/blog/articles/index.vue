<template>
  <section class="relative px-4 mt-5 dark:text-zinc-200 text-zinc-700"  >
    <div class="relative mx-auto max-w-7xl">
      <div class="text-center">
        <h2 class="text-h text-3xl font-extrabold tracking-tight sm:text-4xl"><NuxtLink :to="localePath('/blog')">{{ $t('blog') }}</NuxtLink> / <NuxtLink :to="localePath('/blog/articles')">{{ $t('articles') }}</NuxtLink></h2>
        <h3 class="text-h text-xl font-extrabold tracking-tight sm:text-2xl">

        <NuxtLink :to="localePath('/blog/articles')">{{ $t('articles') }}</NuxtLink> /

        </h3>
              </div>
      <ContentList :path="localePath('/blog/articles')" v-slot="{ list }">
        <div data-aos="flip-right"  data-aos-easing="ease-out-cubic" data-aos-duration="1000" 
        class="mx-auto lg:mx-20 md:mx-20 sm:mx-20 mt-12 grid max-w-none gap-10 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
          <div v-for="articles in list" :key="articles.title" class="flex flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
            <NuxtLink :to="articles._path">
            <div class="flex-shrink-0 overflow-hidden">
              <div class="relative">
              <img class="h-full w-full object-cover" :src="articles.img" :alt="articles.title" />
              <div class="flex flex-row gap-2 absolute bottom-0 left-0 mb-3 ms-5">
              <p v-for="tag in articles.tags" class="bg-sxvx-light dark:bg-sxvx-dark text-p rounded-full px-4 py-1 text-xs font-semibold tracking-wide">
                    {{ tag }}
                  </p>
              </div>
              </div>           
             </div>
            </NuxtLink>
            <div class="bg-accent dark:bg-gradient-to-r from-gray-800 flex flex-1 flex-col justify-between p-6">
              <div class="flex-1">
                <NuxtLink :to="articles._path" class="block">
                  <p class="text-h text-lg font-semibold">
                    {{ articles.title }}
                  </p>
                  <p class="text-p mt-3 text-sm">
                    {{ articles.meta }}
                  </p>
                </NuxtLink>
              </div>
              <div class="mt-3 flex items-center">
                <!-- <div class="flex-shrink-0">
                  <NuxtLink to="/about">
                    <span class="sr-only">{{ articles.author }}</span>
                    <img class="h-10 w-10 rounded-full" :src="articles.authorAvatar" :alt="articles.author" />
                  </NuxtLink>
                </div> -->
                <div class="ml-0">
                  <div class="text-p flex space-x-1 text-sm">
                    <!-- <p class="text-p text-xs font-medium">
                      <NuxtLink to="/about" class="hover:underline"> {{ articles.author }} </NuxtLink>
                    </p> -->
                    <!-- <span aria-hidden="true"> &middot; </span> -->
                    <time :datetime="articles.date">
                      {{ articles.date }}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentList>
    </div>
  </section>
</template>

<script setup>
const localePath = useLocalePath()
useServerSeoMeta({
  title: '',
  ogTitle: '',
  description: '',
  ogDescription: '',
  ogImage: '',
  twitterCard: 'summary_large_image',
})
</script>
