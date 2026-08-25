/**
 * Пользовательские настройки: единственное место, где они читаются и пишутся.
 *
 * Главное правило: всё, что влияет на первый кадр (шрифт, радиальный оверлей,
 * плёночные эффекты, видимость плеера), применяется НЕ через разметку Vue,
 * а через атрибуты на <html> и CSS. Атрибуты выставляет крошечный скрипт в
 * <head> ещё до отрисовки — см. nuxt.config.ts.
 *
 * Зачем так: при `nuxt generate` HTML печётся один раз на сборке, когда
 * никаких настроек нет. Если бы состояние восстанавливалось до гидратации и
 * попадало в разметку, серверный HTML и клиентский рендер расходились бы, а
 * Vue в проде молча оставлял бы серверный вариант — ломались именно классы:
 * подсветка кнопок, шрифт, эффекты. Держим настройки вне разметки — и
 * расхождение становится невозможным, а `build` и `generate` ведут себя
 * одинаково.
 */

export const SETTINGS_KEYS = {
  stream: 'stream_name',
  volume: 'vol',
  hls: 'hls',
  playerVisible: 'playerVisible',
  eqBands: 'eqBands',
}

/** Эффекты и их значения по умолчанию. Порядок важен только для читаемости. */
export const EFFECT_DEFAULTS = {
  overlay0: true,
  overlay1: false,
  overlay2: true,
  overlay3: false,
  overlay4: false,
  overlay5: false,
  artBackground: true,
  visualizer: true,
  visualizerCaps: true,
}

export const DEFAULT_STREAM = 'stream'

function isClient() {
  return typeof window !== 'undefined'
}

export function readSetting(key, fallback = null) {
  if (!isClient()) return fallback
  const raw = localStorage.getItem(key)
  return raw === null ? fallback : raw
}

export function writeSetting(key, value) {
  if (!isClient()) return
  localStorage.setItem(key, String(value))
}

export function readBool(key, fallback) {
  const raw = readSetting(key)
  if (raw === null) return fallback
  return raw === 'true' || raw === '"true"' || raw === '1'
}

/** Прочитать все эффекты разом. */
export function readEffects() {
  const result = {}
  for (const [name, def] of Object.entries(EFFECT_DEFAULTS)) {
    result[name] = readBool(name, def)
  }
  return result
}

/**
 * Отразить состояние в атрибутах <html>, чтобы CSS применил его без участия Vue.
 * Ту же разметку атрибутов ставит инлайн-скрипт до гидратации.
 */
export function applyStreamAttribute(streamId) {
  if (!isClient()) return
  document.documentElement.dataset.stream = streamId || DEFAULT_STREAM
}

export function applyEffectsAttribute(effects) {
  if (!isClient()) return
  const enabled = Object.keys(EFFECT_DEFAULTS).filter((name) => effects[name])
  document.documentElement.setAttribute('data-fx', enabled.join(' '))
}

export function applyPlayerVisibility(visible) {
  if (!isClient()) return
  document.documentElement.toggleAttribute('data-player-hidden', !visible)
}
