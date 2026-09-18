<template>
<!-- self-center: без него обёртка растягивается на всю высоту строки шапки,
     а высота строки зависит от соседних кнопок. Тогда подсказка, отмеренная
     от низа обёртки, съезжает, стоит убрать или добавить соседа. -->
<div class="relative flex self-center">
  <UTooltip text="MilkDrop" :popper="{ offsetDistance: 5 }" class="">
  <button
  class="flex items-center self-center ml-1 sm:ml-4 hover:cursor-pointer rounded-xl text-sm
  active:ring-2 active:ring-gray-300 focus:ring-offset focus:ring-offset-gray-800 p-2"
  :class="{'bg-sxvx-light-bg dark:bg-sxvx-dark-bg': !milkdrop.enabled,
           'bg-green-600': milkdrop.enabled}"
  @click="milkdrop.toggle()"
  >
  <span class="sr-only">MilkDrop</span>
  <Icon name="bx:atom" class="h-6 w-6 text-zinc-600 dark:text-zinc-100" aria-hidden="true" />
  </button>
  </UTooltip>

  <!-- Подсказка о новой возможности. Живёт внутри компонента кнопки, поэтому
       остаётся приклеенной к ней на любой ширине экрана. -->
  <Transition
    enter-active-class="transition duration-500 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    leave-active-class="transition duration-300 ease-in"
    leave-to-class="opacity-0 scale-95">
    <div v-if="hintVisible" class="milkdrop-hint">
      <!-- Стрелка рисуется отдельно, чтобы загибалась к кнопке, а не была
           обычным треугольным носиком. -->
      <svg class="milkdrop-hint__arrow" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M36 37 C 27 33, 20 25, 20 10" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" />
        <path d="M14 17 L 20 7 L 26 17" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" stroke-linejoin="round" />
      </svg>

      <div class="milkdrop-hint__pill">
        <span>Now with MilkDrop!</span>
        <button type="button" class="milkdrop-hint__close" @click="dismiss" aria-label="Закрыть">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </Transition>
</div>
</template>

<script setup>
import { useMilkdropStore } from '@/stores/milkdrop'
import { SETTINGS_KEYS, readSetting, writeSetting } from '~/utils/settings'

const milkdrop = useMilkdropStore()

// Показ решается только на клиенте: в статической сборке HTML печётся один раз,
// и попади подсказка в разметку — серверный и клиентский варианты разошлись бы.
const dismissed = ref(true)

const hintVisible = computed(() => !dismissed.value && !milkdrop.enabled)

function dismiss() {
  dismissed.value = true
  writeSetting(SETTINGS_KEYS.milkdropHintSeen, true)
}

onMounted(() => {
  dismissed.value = readSetting(SETTINGS_KEYS.milkdropHintSeen) !== null
})

// Нажал на саму кнопку — значит нашёл; больше не напоминаем.
watch(() => milkdrop.enabled, (on) => {
  if (on && !dismissed.value) dismiss()
})
</script>

<style scoped>
.milkdrop-hint {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 1.1rem;
  /* Выше шапки (31) и плеера (30), иначе подсказка уедет под них. */
  z-index: 60;
  pointer-events: none;
}

/* Рамка стрелки шириной ровно с кнопку, а наконечник нарисован по центру
   рамки. Поэтому достаточно повторить отступ кнопки (ml-1, на sm — ml-4),
   и остриё само встаёт на середину кнопки. */
.milkdrop-hint__arrow {
  position: absolute;
  top: -1.75rem;
  left: 0.25rem;
  width: 2.5rem;
  height: 2.5rem;
  color: rgb(34 197 94);
}

@media (min-width: 640px) {
  .milkdrop-hint__arrow {
    left: 1rem;
  }
}

.milkdrop-hint__pill {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-left: 2.4rem;
  padding: 0.5rem 0.5rem 0.5rem 1.1rem;
  white-space: nowrap;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #fff;
  background: linear-gradient(135deg, rgb(22 163 74), rgb(13 148 136));
  box-shadow: 0 10px 25px -8px rgb(0 0 0 / 0.55), 0 0 0 1px rgb(255 255 255 / 0.12) inset;
}

.milkdrop-hint__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  flex: none;
  border-radius: 9999px;
  background: #000;
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.milkdrop-hint__close:hover {
  transform: scale(1.12);
  opacity: 0.85;
}
</style>
