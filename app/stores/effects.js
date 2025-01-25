
import { defineStore } from 'pinia';

export const useEffectsStore = defineStore('effectsOverlay', {
    state: () => ({
        effects: true,
        overlay0: true,
        overlay1: false,
        overlay2: true,
        overlay3: false,
        overlay4: false,
        overlay5: false,
        artBackground: true,
    }),
    actions: {
      setOverlayState(overlayIndex, isOverlayActive) {
        this[overlayIndex] = isOverlayActive; // Dynamically access overlay properties
      }
    },
   
       
 //     // // this below works great with run build
    persist: {
      storage: piniaPluginPersistedstate.cookies({
        // sameSite: 'strict',
        sameSite: 'lax',
        maxAge: 798131659,
      }),
    },

}); 