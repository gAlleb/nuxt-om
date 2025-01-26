// store/currentStream.js
import { defineStore } from 'pinia';
//import persistedstate from 'pinia-plugin-persistedstate';

// export const currentStreamStore = defineStore('playerCurrentStream', {
//     state: () => ({
       
//         currentStream: 'omFM Main', // Default stream
//     }),
//     actions: {
//         setStream1() {
//             this.currentStream = 'omFM Main';
//         },
//         setStream2() {
//             this.currentStream = 'Rock @ omFM';
//         },
//         setStream3() {
//             this.currentStream = 'Coma @ omFM';
//         },
//     },
//     // persist: {
//     //   enabled: true,
//     //   strategies: [
//     //     {
//     //       key: 'currentStreamName',
//     //     },
//     //   ],
//     // },
//     // // this below works great with run build
//     // persist: {
//     //   storage: persistedState.cookiesWithOptions({
//     //     // sameSite: 'strict',
//     //     sameSite: 'lax',
//     //   }),
//     // },
//     // // this below works greate with run generate and ssr:false but Content becomes unavailable
//     // persist: {
//     //     storage: persistedState.localStorage,
//     //   },
   
 
// }); 


// option to use  localStorage here instead of function in ShoHidePlayerBtn.vue
// 
// function getItem(item) {
//   if (import.meta.client) {
//     if (!getItem.cache) {
//       getItem.cache = {};
//     }
//     if (!(item in getItem.cache)) {
//       getItem.cache[item] = localStorage.getItem(item);
//     }
//     return getItem.cache[item];
//   } else {
//     return undefined;
//   }
// }
// onMounted(() => {
// const currentStreamState = getItem("stream_name");

//       if (currentStreamState === 'stream' || currentStreamState === null) {
//         setStream1();
//       } else if (currentStreamState === 'rock') {
//         setStream2();
//       }else if (currentStreamState === 'coma') {
//         setStream3();
//      }
// });



// then we should add this somewhere to load from LocalStorage
// onMounted(() => {
//     playerStore.loadStreamName();
//     });

export const currentStreamStore = defineStore('playerCurrentStream', {
    state: () => ({
       
        currentStream: 'stream', // Default stream
    }),
    actions: {
        setStream(streamName) {
          this.currentStream = streamName;
          if (import.meta.client) {
              localStorage.setItem('stream_name', streamName);
            }
        },
        loadStreamName() {
            if (import.meta.client) {
              const storedName = localStorage.getItem('stream_name');
              if (storedName) {
                this.currentStream = storedName;
              }
            }
          },
    },
    // this below works great with run build
    persist: {
      storage: piniaPluginPersistedstate.cookies({
        // sameSite: 'strict',
        sameSite: 'lax',
        maxAge: 798131659,
      }),
    },

}); 