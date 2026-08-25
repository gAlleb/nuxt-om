<template>
  <section class="">
    <!-- Article content -->
    <article v-if="doc" data-aos="flip-right" data-aos-easing="ease-out-cubic" data-aos-duration="1000"
      class="prose mx-auto max-sm:mx-5 max-md:mx-10 max-lg:mx-10 max-w-4xl dark:prose-invert">
      <ContentRenderer :value="doc" />
    </article>
    <NotFound v-else />
  </section>
</template>

<script setup>
const route = useRoute()
const { data: doc } = await useAsyncData(`content-${route.path}`, () =>
  queryCollection('content').path(route.path).first(),
)

// useSeoMeta умеет разворачивать функции; в useHead они попадали в разметку как [object Object].
useSeoMeta({
  title: () => doc.value?.title,
  description: () => doc.value?.description,
  ogTitle: () => doc.value?.title,
  ogDescription: () => doc.value?.description,
  ogImage: () => doc.value?.img,
})
</script>
