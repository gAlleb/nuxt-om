<template>
  <div class="flex items-center gap-2 flex-wrap text-sm">
    <span class="w-16 shrink-0 opacity-60">{{ label }}</span>

    <a
      ref="addressEl"
      :href="url"
      target="_blank"
      rel="noopener noreferrer"
      class="font-mono break-all hover:underline"
      :title="`Открыть поток ${label}`">
      {{ url }}
    </a>

    <button
      type="button"
      class="shrink-0 rounded-lg px-2 py-1 text-xs bg-sxvx-light dark:bg-sxvx-dark hover:opacity-80 transition-opacity"
      :title="`Скопировать адрес ${label}`"
      @click="copy">
      {{ state === 'done' ? 'скопировано' : state === 'failed' ? 'выделено' : 'копировать' }}
    </button>

    <a
      :href="playlist"
      download
      class="shrink-0 rounded-lg px-2 py-1 text-xs bg-sxvx-light dark:bg-sxvx-dark hover:opacity-80 transition-opacity"
      :title="`Плейлист ${label} для медиаплеера`">
      .m3u
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  url: { type: String, required: true },
  playlist: { type: String, required: true },
})

const addressEl = ref(null)
/** idle | done | failed — надпись на кнопке. */
const state = ref('idle')
let resetTimer = null

function flash(next) {
  state.value = next
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (state.value = 'idle'), 1500)
}

/** Запасной путь для окружений, где Clipboard API недоступен. */
function copyViaTextarea(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  area.remove()
  return ok
}

/** Совсем крайний случай: выделяем адрес, чтобы его скопировали вручную. */
function selectAddress() {
  const el = addressEl.value
  if (!el) return
  const range = document.createRange()
  range.selectNodeContents(el)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

async function copy() {
  try {
    await navigator.clipboard.writeText(props.url)
    flash('done')
    return
  } catch {
    // Clipboard API может отказать без фокуса или вне https — идём дальше.
  }

  if (copyViaTextarea(props.url)) {
    flash('done')
    return
  }

  selectAddress()
  flash('failed')
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>
