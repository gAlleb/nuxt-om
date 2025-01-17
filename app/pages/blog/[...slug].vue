<template>

  <section class="">
  <div class="relative mx-auto pt-8 pb-5 bg-sxvx-light dark:bg-sxvx-dark" style="margin-top:-40px;">
      <div class="text-center">
        <NuxtLink :to="localePath('/blog')"><h2 class="text-h text-3xl font-extrabold tracking-tight sm:text-4xl">{{ $t('blog') }}</h2></NuxtLink>
        <h3 class="text-h text-xl font-extrabold tracking-tight sm:text-2xl">

        <NuxtLink :to="localePath('/blog/articles')">{{ $t('articles') }}</NuxtLink> /

        </h3>
        <!-- <p class="text-p mx-auto mt-3 max-w-2xl text-xl font-semibold sm:mt-4">Latest guides and how to do's for Developers.</p> -->
    </div>
    </div>
  <!-- <div class="footercurves_sxvx_style hidden dark:block"></div>
  <div class="footercurves_sxvx_style_light block dark:hidden"></div> -->
    <!-- Article content -->
    <article v-if="data" class="prose mt-5 pt-5 px-0 md:px-28 lg:px-20 mx-auto max-sm:mx-5 max-md:mx-10 max-lg:mx-10 max-w-4xl dark:prose-invert">
      <ContentDoc :path="$route.path">
        <template #not-found>
          <NotFound />
        </template>
      </ContentDoc>
    </article>
    <div class="flex center justify-center mx-auto mt-10">
    <NuxtLink :to="localePath('/blog')" class="flex bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 hover:from-primary-600 hover:via-primary-500 hover:to-primary-400 py-2 px-6 rounded-full">
      <p>Back to Blog</p>
    </NuxtLink>
  </div>
  </section>
</template>
<script setup>
const localePath = useLocalePath()
const { path } = useRoute()
const { data } = await useAsyncData(`content-${path}`, () => queryContent().where({ _path: path }).only(['title', 'meta', 'img', 'date']).findOne())
useHead({
  title: data.title,
  meta: [
    { name: 'description', content: data.meta },
    { property: 'og:description', content: data.meta },
    { property: 'og:title', content: data.title },
    { property: 'og:image', content: data.img },
  ],
})
</script>
