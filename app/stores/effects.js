
import { defineStore } from 'pinia';

export const useEffectsStore = defineStore('effectsOverlay', {
    state: () => ({
        effects: true,
        overlay0: true,
        overlay1: true,
        overlay2: true,
        overlay3: true,
        overlay4: true,
        overlay5: true,
    }),
   
       
 //     // // this below works great with run build
    // persist: {
    //   storage: persistedState.cookiesWithOptions({
    //     // sameSite: 'strict',
    //     sameSite: 'lax',
    //   }),
    // },

}); 