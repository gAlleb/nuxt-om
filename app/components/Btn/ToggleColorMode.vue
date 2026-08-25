<template>
  <ClientOnly>
    <button
      type="button"
      :aria-label="`Switch to ${nextTheme} mode`"
      :title="`Switch to ${nextTheme} mode`"
      class="ml-1 sm:ml-4 flex rounded-xl bg-sxvx-light-bg dark:bg-sxvx-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2"
      @click="switchTheme($event)">
      <span class="sr-only">Theme Mode</span>
      <Icon
        :name="nextTheme === 'dark' ? 'heroicons:moon' : 'heroicons:sun'"
        class="h-6 w-6 text-zinc-600 dark:text-zinc-100"
        aria-hidden="true" />
    </button>

    <!-- До гидратации тема неизвестна — держим место, чтобы шапка не дёргалась -->
    <template #fallback>
      <div class="ml-1 sm:ml-4 p-2">
        <div class="h-6 w-6" />
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
const { nextTheme, switchTheme } = useThemeTransition()
</script>

<style>
/* Гасим кросс-фейд по умолчанию: анимируем только раскрытие круга. */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-new(root) {
  z-index: 9999;
}
::view-transition-old(root) {
  z-index: 1;
}
</style>
