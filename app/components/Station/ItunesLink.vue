<template>
  <!-- Станция отдаёт свои обложки — ссылки на iTunes нет, просто значок -->
  <Icon
    v-if="!linked"
    name="heroicons-solid:musical-note"
    class="h-7 w-7 bg-muddy-waters-800 dark:bg-muddy-waters-200"
    aria-hidden="true" />

  <!-- Трек нашёлся в iTunes — значок ведёт на страницу альбома -->
  <a v-else-if="url && url !== '#'" :href="url" target="_blank" rel="noopener noreferrer">
    <Icon
      name="heroicons-solid:musical-note"
      :class="color ? 'h-4 w-4 sm:h-7 sm:w-7' : 'h-7 w-7 bg-muddy-waters-800 dark:bg-muddy-waters-200'"
      :style="color ? { background: color, marginTop: '5px', marginBottom: '-5px' } : undefined"
      aria-hidden="true" />
  </a>

  <!-- Не нашёлся — значок приглушён -->
  <Icon
    v-else
    name="heroicons-solid:musical-note"
    :class="color ? 'h-4 w-4 sm:h-7 sm:w-7 opacity-30' : 'h-7 w-7 bg-muddy-waters-800 dark:bg-muddy-waters-200 opacity-30'"
    :style="color ? { background: color, marginTop: '5px', marginBottom: '-5px' } : undefined"
    aria-hidden="true" />
</template>

<script setup>
defineProps({
  /** Ссылка на альбом в iTunes, либо '#', если не нашлось. */
  url: { type: String, default: '#' },
  /** false — у станции свои обложки, ссылка не нужна. */
  linked: { type: Boolean, default: false },
  /** Цвет значка в блоке «Show:», подстраивается под обложку. */
  color: { type: String, default: '' },
})
</script>
