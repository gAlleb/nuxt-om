import { defineStore } from 'pinia';

export const useChristmasStore = defineStore('christmasEffects', {
  state: () => ({
    christmas: 'true',
  }),
  actions: {
    loadChristmasState() {
      if (import.meta.client) {
        const storedName = localStorage.getItem('christmas_pinia');
        if (storedName) {
          this.christmas = storedName;
        }
      }
    },
    toggle() {
      if (this.christmas === 'true') {
        this.christmas = 'false';
        if (import.meta.client) {
        localStorage.setItem('christmas_pinia', 'false');
        }
      } else {
        this.christmas = 'true';
        if (import.meta.client) {
        localStorage.setItem('christmas_pinia', 'true');
        }
      }
    },
  },
  // persist: {
  //   storage: piniaPluginPersistedstate.cookies({
  //     // sameSite: 'strict',
  //     sameSite: 'lax',
  //     maxAge: 798131659,
  //   }),
  // },
}); 