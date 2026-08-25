import { defineStore } from 'pinia';
import { EFFECT_DEFAULTS, readEffects, writeSetting, applyEffectsAttribute } from '~/utils/settings';

/**
 * Плёночные эффекты и визуализатор.
 *
 * Состояние живёт здесь, но на вид страницы влияет через атрибут data-fx на
 * <html> — см. app/utils/settings.js. Поэтому переключатели работают
 * одинаково и в SSR, и в статической сборке.
 */
export const useEffectsStore = defineStore('effectsOverlay', {
  state: () => ({ ...EFFECT_DEFAULTS }),
  getters: {
    /** Ни одного включённого эффекта. */
    allDisabled: (s) => Object.keys(EFFECT_DEFAULTS).every((name) => !s[name]),
    /** Включено всё, кроме отдельной галки «шапки» визуализатора. */
    allEnabled: (s) =>
      Object.keys(EFFECT_DEFAULTS)
        .filter((name) => name !== 'visualizerCaps')
        .every((name) => s[name]),
    scanlinesOn: (s) => s.overlay3 && s.overlay4 && s.overlay5,
  },
  actions: {
    /** Переключить один эффект и запомнить выбор. */
    toggle(name) {
      this.set(name, !this[name]);
    },
    set(name, value) {
      this[name] = value;
      writeSetting(name, value);
      applyEffectsAttribute(this.$state);
    },
    /** Три полосы прокрутки включаются и выключаются вместе. */
    toggleScanlines() {
      const next = !(this.overlay3 && this.overlay4 && this.overlay5);
      for (const name of ['overlay3', 'overlay4', 'overlay5']) this.set(name, next);
    },
    setAll(value) {
      for (const name of Object.keys(EFFECT_DEFAULTS)) this.set(name, value);
    },
    /** Всё выключено — включить всё, иначе выключить всё. */
    toggleAll() {
      const allOff = Object.keys(EFFECT_DEFAULTS).every((name) => !this[name]);
      this.setAll(allOff);
    },
    /** Вернуть настройки по умолчанию. */
    reset() {
      for (const [name, value] of Object.entries(EFFECT_DEFAULTS)) this.set(name, value);
    },
    loadFromStorage() {
      Object.assign(this, readEffects());
      applyEffectsAttribute(this.$state);
    },
  },
});
