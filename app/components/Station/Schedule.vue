<template>
  <section v-if="schedule" class="mx-3 sm:mx-5 lg:mx-20" :style="{ fontFamily: station.look.font }">
    <div class="justify-center flex mx-auto lg:mx-20">
      <div class="container">
        <!-- Полоса суток: беглый взгляд. Кликается целиком и открывает шторку. -->
        <button
          type="button"
          class="w-full my-5 p-3 sm:p-4 text-left rounded-xl shadow-np dark:shadow-np-dark transition-all duration-500 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          :style="{ ...dominantBackground, color: dominantText.color }"
          aria-haspopup="dialog"
          :aria-expanded="open"
          @click="openDrawer">
          <span class="flex items-baseline justify-between gap-3">
            <span class="flex items-center gap-2">
              <Icon name="heroicons:calendar-days" class="h-5 w-5 shrink-0" aria-hidden="true" />
              <span class="text-lg sm:text-xl">Schedule</span>
            </span>
            <span v-if="currentSlot" class="flex items-center gap-2 min-w-0">
              <span class="relative flex h-2 w-2 shrink-0">
                <span class="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 motion-safe:animate-ping"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              <span class="text-sm sm:text-base truncate">
                {{ currentSlot.title }}
                <span class="opacity-60 font-mono tabular-nums">{{ currentSlot.from }}–{{ currentSlot.to }}</span>
              </span>
            </span>
          </span>

          <span class="relative mt-3 flex h-6 sm:h-8 w-full overflow-hidden rounded-md">
            <span
              v-for="(slot, index) in slotsForDay"
              :key="index"
              class="h-full transition-all duration-300"
              :style="{ width: widthOf(slot), ...segmentStyle(slot) }"
              :title="`${slot.from}–${slot.to} ${slot.title}`"></span>

            <!-- Метка «сейчас»: только после монтирования и только для сегодняшнего дня. -->
            <span
              v-if="nowOffset !== null"
              class="absolute top-0 bottom-0 w-0.5 bg-red-500 pointer-events-none"
              :style="{ left: nowOffset }"
              aria-hidden="true"></span>
          </span>

          <span class="mt-1 flex justify-between text-[10px] sm:text-xs font-mono opacity-50 tabular-nums">
            <span v-for="tick in ticks" :key="tick">{{ tick }}</span>
          </span>
        </button>

        <!-- Шторка: подробности. Тот же приём, что у мобильного меню плеера. -->
        <div
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          :class="open ? 'opacity-100' : 'opacity-0 pointer-events-none'"
          aria-hidden="true"
          @click="close"></div>

        <aside
          ref="drawer"
          class="fixed top-0 bottom-0 right-0 z-50 w-11/12 max-w-md flex flex-col bg-sxvx-light dark:bg-sxvx-dark text-muddy-waters-800 dark:text-muddy-waters-200 shadow-2xl transition-transform duration-300 ease-in-out"
          :class="open ? 'translate-x-0' : 'translate-x-full'"
          role="dialog"
          aria-modal="true"
          :aria-label="`${station.text.hero} schedule`"
          :aria-hidden="!open"
          :inert="open ? undefined : true">
          <header class="flex items-center justify-between gap-3 p-4 border-b border-current/10">
            <h2 class="text-2xl">Schedule</h2>
            <button
              ref="closeButton"
              type="button"
              class="p-2 rounded-xl transition-all duration-200 hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close schedule"
              @click="close">
              <Icon name="heroicons:x-mark" class="h-6 w-6" aria-hidden="true" />
            </button>
          </header>

          <div class="flex-1 overflow-y-auto p-4">
            <p class="text-sm opacity-70">
              All times {{ zoneLabel }}.<template v-if="schedule.note"> {{ schedule.note }}</template>
            </p>

            <div class="mt-4 flex flex-wrap gap-1 sm:gap-2">
              <button
                v-for="day in days"
                :key="day.iso"
                type="button"
                class="px-3 py-1 rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                :class="day.iso === selectedDay
                  ? 'bg-muddy-waters-800 text-sxvx-light dark:bg-muddy-waters-200 dark:text-sxvx-dark'
                  : 'opacity-60 hover:opacity-100'"
                @click="selectedDay = day.iso">
                {{ day.label }}
              </button>
            </div>

            <ul class="mt-4 flex flex-col gap-2">
              <li
                v-for="(slot, index) in slotsForDay"
                :key="index"
                class="flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300"
                :class="isOnAir(slot) ? 'ring-1 ring-red-500/50' : ''">
                <span
                  class="h-8 w-1.5 shrink-0 rounded-full"
                  :style="segmentStyle(slot)"
                  aria-hidden="true"></span>
                <span class="font-mono text-sm whitespace-nowrap tabular-nums opacity-80">
                  {{ slot.from }}<br />{{ slot.to }}
                </span>
                <span class="min-w-0 flex-1">
                  <span class="text-lg">{{ slot.title }}</span>
                  <span v-if="slot.description" class="block text-sm opacity-70">{{ slot.description }}</span>
                </span>
                <span v-if="isOnAir(slot)" class="flex items-center gap-1.5 text-xs uppercase tracking-wider whitespace-nowrap">
                  <span class="relative flex h-2 w-2">
                    <span class="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 motion-safe:animate-ping"></span>
                    <span class="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                  On air
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import chroma from 'chroma-js'
import { useEventListener, useIntervalFn } from '@vueuse/core'
import { useDominantTheme } from '~/composables/useDominantTheme'

const props = defineProps({
  station: { type: Object, required: true },
})

const schedule = computed(() => props.station.schedule)

// Тот же источник цвета, что красит карточку now-playing.
const { background: dominantBackground, text: dominantText } = useDominantTheme(
  computed(() => props.station.id),
)

const days = [
  { iso: 1, label: 'Mon' },
  { iso: 2, label: 'Tue' },
  { iso: 3, label: 'Wed' },
  { iso: 4, label: 'Thu' },
  { iso: 5, label: 'Fri' },
  { iso: 6, label: 'Sat' },
  { iso: 7, label: 'Sun' },
]
const ticks = ['00', '06', '12', '18', '24']
const DAY_MINUTES = 24 * 60

const open = ref(false)
const drawer = ref(null)
const closeButton = ref(null)

// На сервере дня недели не знаем — рендерим понедельник и там, и там, иначе
// разметка разъедется при гидратации. Настоящий день ставится после монтирования.
const selectedDay = ref(1)
const now = ref(null)

const ISO_BY_NAME = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 }

/** Текущий момент в зоне станции: ISO-день недели и минуты от полуночи. */
function nowInZone(timezone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const value = (type) => parts.find((part) => part.type === type)?.value ?? ''
  return {
    day: ISO_BY_NAME[value('weekday')] ?? 1,
    minutes: Number(value('hour')) * 60 + Number(value('minute')),
  }
}

function refreshNow() {
  if (!schedule.value) return
  now.value = nowInZone(schedule.value.timezone)
}

onMounted(() => {
  refreshNow()
  if (now.value) selectedDay.value = now.value.day
})

// Граница блока не должна ждать перезагрузки страницы.
useIntervalFn(refreshNow, 30000)

const toMinutes = (time) => {
  const [hours, minutes] = String(time).split(':').map(Number)
  return hours * 60 + minutes
}
/** '00:00' в конце слота — полночь следующих суток, а не начало текущих. */
const endMinutes = (slot) => toMinutes(slot.to) || DAY_MINUTES

const slotsForDay = computed(() => {
  if (!schedule.value) return []
  return schedule.value.slots
    .filter((slot) => !slot.days || slot.days.includes(selectedDay.value))
    .slice()
    .sort((a, b) => toMinutes(a.from) - toMinutes(b.from))
})

/** Названия блоков в порядке появления — по всему расписанию, а не по дню:
 *  иначе цвет блока прыгал бы при переключении дней недели. */
const titlesInOrder = computed(() => {
  const titles = []
  for (const slot of schedule.value?.slots ?? []) {
    if (!titles.includes(slot.title)) titles.push(slot.title)
  }
  return titles
})

/**
 * Палитра блоков раскладывается от доминирующего цвета текущей обложки:
 * берём её тон и насыщенность, а различаем блоки светлотой. Из-за этого
 * ступени остаются различимыми даже на тёмной или блёклой обложке, а
 * полоса перекрашивается вместе с треком, как и карточка now-playing.
 */
const LIGHTNESS_FROM = 28
const LIGHTNESS_TO = 82

const paletteByTitle = computed(() => {
  let base
  try {
    base = chroma(dominantBackground.value.background)
  } catch {
    base = chroma('#808080')
  }
  const [hue, saturation] = base.hcl()
  const safeHue = Number.isNaN(hue) ? 0 : hue
  const safeSaturation = Number.isNaN(saturation) ? 0 : saturation

  const titles = titlesInOrder.value
  const palette = {}
  titles.forEach((title, index) => {
    const lightness = titles.length < 2
      ? (LIGHTNESS_FROM + LIGHTNESS_TO) / 2
      : LIGHTNESS_FROM + ((LIGHTNESS_TO - LIGHTNESS_FROM) * index) / (titles.length - 1)
    palette[title] = chroma.hcl(safeHue, safeSaturation, lightness).hex()
  })
  return palette
})

/** Свой цвет из реестра перебивает раскладку от обложки. */
function segmentStyle(slot) {
  if (slot.color) return { background: slot.color }
  return { background: paletteByTitle.value[slot.title] }
}

function widthOf(slot) {
  const span = endMinutes(slot) - toMinutes(slot.from)
  return `${(span / DAY_MINUTES) * 100}%`
}

/** Смещение метки «сейчас». null — не сегодня или ещё не смонтировались. */
const nowOffset = computed(() => {
  if (!now.value || selectedDay.value !== now.value.day) return null
  return `${(now.value.minutes / DAY_MINUTES) * 100}%`
})

function isOnAir(slot) {
  if (!now.value || selectedDay.value !== now.value.day) return false
  const from = toMinutes(slot.from)
  const to = endMinutes(slot)
  const minutes = now.value.minutes
  return from <= to ? minutes >= from && minutes < to : minutes >= from || minutes < to
}

const currentSlot = computed(() => slotsForDay.value.find((slot) => isOnAir(slot)) ?? null)

const zoneLabel = computed(() => (schedule.value?.timezone ?? '').replace(/_/g, ' '))

function openDrawer() {
  // Открываем всегда на сегодняшнем дне, даже если в прошлый раз листали другой.
  if (now.value) selectedDay.value = now.value.day
  open.value = true
  nextTick(() => closeButton.value?.focus())
}

function close() {
  open.value = false
}

// Escape ловим на документе: фокус мог уйти из шторки на страницу.
useEventListener(document, 'keydown', (event) => {
  if (open.value && event.key === 'Escape') close()
})

// Фон под шторкой не должен прокручиваться.
watch(open, (value) => {
  if (import.meta.server) return
  document.documentElement.classList.toggle('overflow-hidden', value)
})
onBeforeUnmount(() => {
  if (import.meta.client) document.documentElement.classList.remove('overflow-hidden')
})
</script>
