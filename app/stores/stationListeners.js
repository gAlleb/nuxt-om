import { defineStore } from 'pinia';

export const useListenersData = defineStore({
  id: 'stationListeners',
  state: () => ({
    channel: {}, // Object to store data
    eventSource: null,
  }),
  actions: {
    connectToSSE() {
      const baseUri = "https://centrifugo.omfm.ru"; 
      const sseUri =
        baseUri +
        "/connection/sse?cf_connect=" +
          JSON.stringify({
            "subs": {
              "station:listeners": {"recover": true}
            }
          });
      this.eventSource = new EventSource(sseUri)

      this.eventSource.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        // console.log(data);
        if (data.connect && data.connect.subs) {
          for (const sub in data.connect.subs) {
            const publications = data.connect.subs[sub].publications
            if (publications && publications.length > 0) {
              const data = publications[0].data
              this.updateStationData(sub, data)
            }
          }
        } else if (data.pub) {
          this.updateStationData(data.channel, data.pub.data)
        }
      })

      this.eventSource.onerror = () => {
        console.error('SSE connection error. Reconnecting in 5 seconds...')
        this.eventSource.close()
        setTimeout(() => {
          this.connectToSSE()
        }, 5000)
      }
    },
    updateStationData(sub, data) {
      this.channel[sub] = data // Update station data directly
    }
  }
})
