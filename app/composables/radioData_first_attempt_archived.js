import { ref, onMounted, onUnmounted, nextTick } from 'vue';

export default function useStationData() {
  // Your base URI and subs configuration
  const baseUri = "https://radio.omfm.ru";
  const subs = {
    "station:radio": { "recover": true },
    "station:coma": { "recover": true },
  };

  // Reactive variables for station data
  const radioData = ref(null);
  const comaData = ref(null);
  const otherData = ref(null);

  // EventSource instance
  let eventSource = null;

  const connectToSSE = () => {
    // Construct the SSE URL
    const sseUri = baseUri + "/api/live/nowplaying/sse?cf_connect=" + JSON.stringify({
      "subs": subs
    });

    // Create the EventSource
    eventSource = new EventSource(sseUri);

    // Handle subsequent 'message' events
    eventSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);

      nextTick(() => {
        // Handle both 'connect.subs' and 'pub' events
        if (data.connect && data.connect.subs) {
            console.log(data);
          // Update based on 'connect.subs'
          for (const station in data.connect.subs) {
            const publications = data.connect.subs[station].publications;
            if (publications && publications.length > 0) {
              const npData = publications[0].data.np;
              updateStationData(station, npData);
            }
          }
        } else if (data.pub) {
            console.log(data);
          // Update based on 'pub'
          updateStationData(data.channel, data.pub.data.np);
        } else {
          console.warn('SSE data missing "pub" property:', data);
        }
      });
    });

    // Handle connection errors
    eventSource.onerror = () => {
      console.error("SSE connection error. Reconnecting in 5 seconds...");
      eventSource.close(); // Close the current connection
      setTimeout(connectToSSE, 5000); // Try to reconnect
    };
  };

  // Helper function to update station data
  const updateStationData = (station, npData) => {
    switch (station) {
      case "station:radio":
        radioData.value = npData;
        break;
      case "station:coma":
        comaData.value = npData;
        break;
      default:
        otherData.value = npData;
        break;
    }
  };

  onMounted(() => {
    connectToSSE(); // Initial connection
  });

  onUnmounted(() => {
    if (eventSource) {
      eventSource.close();
    }
  });

  // Return the reactive data for use in other components
  return {
    radioData,
    comaData,
    otherData,
  };
}