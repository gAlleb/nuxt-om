import { defineStore } from 'pinia';

export const useEffectsStore = defineStore('effectsOverlay', {
    state: () => ({
        overlay0: true,
        overlay1: false,
        overlay2: true,
        overlay3: false,
        overlay4: false,
        overlay5: false,
        artBackground: true,
        visualizer: true,
        visualizerCaps: true,
    }),
    actions: {
      setOverlayState(overlayIndex, isOverlayActive) {
        this[overlayIndex] = isOverlayActive; // Dynamically access overlay properties
      },
      setOverlayLocalStorage(overlayId, effectState) {
        this[overlayId] = effectState;
        if (import.meta.client) {
            localStorage.setItem(overlayId, JSON.stringify(effectState));
        }
      },
      loadOverlayLocalStorage(overlayId) {
        if (import.meta.client) {
          const storedData = localStorage.getItem(overlayId);
          if (storedData) {
            this[overlayId] = JSON.parse(storedData);
          }
        }
       },
      setToTrue() {
        this.overlay0 = true;
        this.overlay1 = true;
        this.overlay2 = true;
        this.overlay3 = true;
        this.overlay4 = true;
        this.overlay5 = true;
        this.artBackground = true;
        this.visualizer = true;
        this.visualizerCaps = true;
      },
      setToFalse() {
        this.overlay0 = false;
        this.overlay1 = false;
        this.overlay2 = false;
        this.overlay3 = false;
        this.overlay4 = false;
        this.overlay5 = false;
        this.artBackground = false;
        this.visualizer = false;
        this.visualizerCaps = false;
      }
    },
    persist: {
      storage: piniaPluginPersistedstate.cookies({
        // sameSite: 'strict',
        sameSite: 'lax',
        maxAge: 798131659,
      }),
    },
}); 