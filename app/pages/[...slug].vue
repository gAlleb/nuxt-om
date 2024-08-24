<template>
  <section class="">
    <!-- Article content -->
    <article v-if="data" class="prose mx-auto max-sm:mx-5 max-md:mx-10 max-lg:mx-10 max-w-4xl dark:prose-invert">
      <ContentDoc :path="$route.path">
        <template #not-found>
          <NotFound />
        </template>
      </ContentDoc>
    </article>
    <div class="flex center justify-center mx-auto">
    <NuxtLink :to="localePath('/blog')" class="flex bg-gradient-to-r from-primary-800 via-primary-600 to-primary-500 hover:from-primary-600 hover:via-primary-500 hover:to-primary-400 py-2 px-6 rounded-full">
      <p>Main SLUG</p>
    </NuxtLink>
  </div>
  </section>
</template>
<script setup>
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
