import { defineStore } from 'pinia'

/**
 * Полноэкранная визуализация MilkDrop.
 *
 * Здесь только признак «включено» — сама отрисовка живёт в компоненте
 * Milkdrop.vue. Выбор намеренно не запоминается между загрузками: режим
 * тяжёлый для видеокарты, и поднимать его на каждом заходе без спроса
 * не стоит.
 */
export const useMilkdropStore = defineStore('milkdrop', {
  state: () => ({ enabled: false }),

  actions: {
    toggle() {
      this.enabled = !this.enabled
    },
    off() {
      this.enabled = false
    },
  },
})
