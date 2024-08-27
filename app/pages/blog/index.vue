<template>
  <section class="relative px-4"  >
    <div class="relative mx-auto max-w-7xl">
      <div class="text-center">
        <NuxtLink :to="localePath('/blog')"><h2 class="text-h text-3xl font-extrabold tracking-tight sm:text-4xl">{{ $t('blog') }}</h2></NuxtLink>
        <h3 class="text-h text-xl font-extrabold tracking-tight sm:text-2xl">

        <NuxtLink :to="localePath('/blog/articles')">{{ $t('articles') }}</NuxtLink> /

        </h3>
        <!-- <p class="text-p mx-auto mt-3 max-w-2xl text-xl font-semibold sm:mt-4">Latest guides and how to do's for Developers.</p> -->
      </div>
      <ContentList :path="localePath('/blog')" v-slot="{ list }">
        <div data-aos="flip-right"  data-aos-easing="ease-out-cubic" data-aos-duration="1000" 
        class="mx-auto lg:mx-20 md:mx-20 sm:mx-20 mt-12 grid max-w-none gap-10 lg:max-w-none md:grid-cols-2 lg:grid-cols-3">
          <div v-for="blog in list" :key="blog.title" class="flex flex-col overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-[2px_5px_20px_0.5px_rgba(255,255,255,0.1)]">
            <NuxtLink :to="blog._path">
            <div class="flex-shrink-0">
              <img class="h-full w-full object-cover" :src="blog.img" :alt="blog.title" />
            </div>
            </NuxtLink>
            <div class="bg-accent dark:bg-gradient-to-r from-gray-800 flex flex-1 flex-col justify-between p-6">
              <div class="flex-1">
                <div class="flex flex-row gap-2">
                  <p v-for="tag in blog.tags" class="bg-gray-200 dark:bg-gray-500 text-p rounded-full px-4 py-1 text-xs font-semibold tracking-wide">
                    {{ tag }}
                  </p>
                </div>
                <NuxtLink :to="blog._path" class="mt-6 block">
                  <p class="text-h text-lg font-semibold">
                    {{ blog.title }}
                  </p>
                  <p class="text-p mt-3 text-sm">
                    {{ blog.meta }}
                  </p>
                </NuxtLink>
              </div>
              <div class="mt-3 flex items-center">
                <!-- <div class="flex-shrink-0">
                  <NuxtLink to="/about">
                    <span class="sr-only">{{ blog.author }}</span>
                    <img class="h-10 w-10 rounded-full" :src="blog.authorAvatar" :alt="blog.author" />
                  </NuxtLink>
                </div> -->
                <div class="ml-0">
                  <div class="text-p flex space-x-1 text-sm">
                    <!-- <p class="text-p text-xs font-medium">
                      <NuxtLink to="/about" class="hover:underline"> {{ blog.author }} </NuxtLink>
                    </p> -->
                    <!-- <span aria-hidden="true"> &middot; </span> -->
                    <time :datetime="blog.date">
                      {{ blog.date }}
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
