// store/player.js
import { defineStore } from 'pinia';
import persistedstate from 'pinia-plugin-persistedstate';

export const usePlayerStore = defineStore('player', {
    state: () => ({
       
        currentStream: 'omFM Main', // Default stream
    }),
    actions: {
        setStream1() {
            this.currentStream = 'omFM Main';
        },
        setStream2() {
            this.currentStream = 'Rock @ omFM';
        },
        setStream3() {
            this.currentStream = 'Coma @ omFM';
        },
    },
    // persist: {
    //   enabled: true,
    //   strategies: [
    //     {
    //       key: 'currentStreamName',
    //     },
    //   ],
    // },
    // persist: {
    //   storage: persistedState.cookiesWithOptions({
    //     // sameSite: 'strict',
    //     sameSite: 'lax',
    //   }),
    // },
    // persist: {
    //     storage: persistedState.localStorage,
    //   },
   
 
}); 