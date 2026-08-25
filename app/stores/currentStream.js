import { defineStore } from 'pinia';
import { SETTINGS_KEYS, DEFAULT_STREAM, readSetting, writeSetting, applyStreamAttribute } from '~/utils/settings';

/**
 * Какая станция выбрана. Это же значение попадает в атрибут data-stream на
 * <html> — от него зависят шрифт интерфейса и радиальная подсветка.
 */
export const currentStreamStore = defineStore('playerCurrentStream', {
  state: () => ({
    currentStream: DEFAULT_STREAM,
  }),
  actions: {
    setStream(streamName) {
      this.currentStream = streamName;
      writeSetting(SETTINGS_KEYS.stream, streamName);
      applyStreamAttribute(streamName);
    },
    loadStreamName() {
      const stored = readSetting(SETTINGS_KEYS.stream);
      if (stored) this.currentStream = stored;
      applyStreamAttribute(this.currentStream);
    },
  },
});
