<template>
  <ClientOnly>
    <button
      type="button"
      :aria-label="`Switch to ${nextTheme} mode`"
      :title="`Switch to ${nextTheme} mode`"
      class="ml-1 sm:ml-4 flex rounded-xl bg-sxvx-light-bg dark:bg-sxvx-dark-bg text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset focus:ring-offset-gray-800 p-2"
      @click="toggleWithTransition">
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
const colorMode = useColorMode()

const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'))

function switchTheme() {
  colorMode.preference = nextTheme.value
}

/**
 * Переключение темы кругом, расходящимся из точки клика.
 *
 * Опирается на View Transitions API. Там, где его нет (или пользователь
 * просил меньше движения), тема просто переключается мгновенно.
 */
function toggleWithTransition(event) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!document.startViewTransition || reduceMotion) {
    switchTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  // Радиус до самого дальнего угла экрана — чтобы круг накрыл страницу целиком.
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

  const transition = document.startViewTransition(() => switchTheme())

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 600,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)',
      },
    )
  })
}
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
