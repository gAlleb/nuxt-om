import { defineStore } from 'pinia';

export const useAzuracastData_another = defineStore('stationData',{
  state: () => ({
    stations: {}, // Object to store station data
    eventSource: null,
    isLoading: true,
    stationNames: ['radio', 'coma','terra'],
    progress: {
      
    },
  }),
  actions: {
    connectToSSE() {
      const baseUri = "https://radio.omfm.ru";
      const subs = this.stationNames.reduce((acc, station) => {
        acc[`station:${station}`] = { "recover": true };
        return acc;
      }, {});

      const sseUri = baseUri + "/api/live/nowplaying/sse?cf_connect=" + JSON.stringify({
        "subs": subs
      });

      this.eventSource = new EventSource(sseUri);
      this.eventSource.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        this.isLoading = false; // Set loading to false when connected
        if (data.connect && data.connect.subs) {
          for (const station in data.connect.subs) {
            const publications = data.connect.subs[station].publications;
            if (publications && publications.length > 0) {
              const npData = publications[0].data;
              this.handleData(npData,subs);
              
            }
          }
        } else if (data.pub) {
          this.handleData(data.pub.data,subs);
           
        }
      });

      this.eventSource.onerror = () => {
        console.error("SSE connection error. Reconnecting in 5 seconds...");
        this.eventSource.close();
        setTimeout(() => {
          this.connectToSSE();
        }, 5000);
      };
    },
    handleData(payload,subs) {
      //Centrufugo 5.4 cache mode
      const jsonData = payload;

      // This is a now-playing event from a station.
      // Update your now-playing data accordingly.
      const station = "station:" + jsonData.np?.station?.shortcode || null;
      if (station in subs) {
        this.stations[station] = jsonData;
        this.updateStationData(station);
      }
   },
    updateStationData(station) {
     
      
      let ch = station.split(":")[1] || null;
      // sanitize station shortcode for use in a CSS class name
      ch = toKebabCase(ch);
      const npData = this.stations[station] || null;
      // This below doesn't work because of Pinia reactivity. Working scheme is in stationData.js
      // Where we define this.lastFetchedShIds[station] first as null and coompare to const currentShId = npData.np.now_playing.sh_id;
      if (npData.np.now_playing.sh_id !== this.stations[station].lastShId) {

        this.stations[station].lastShId = npData.np.now_playing.sh_id; 
        this.startProgressBar(station, npData.np.now_playing.elapsed, npData.np.now_playing.duration); // Start progress bar on data update
        setElement("np-" + ch + "-song-text",npData.np.now_playing.song.text);
      } else {

      }
      
    },
    startProgressBar(station, elapsed, duration) {
    // Dynamically initialize progress data for each station
      if (!this.progress[station]) {
        this.progress[station] = { elapsed: 0, duration: 0, lastUpdate: Date.now(), intervalId: 0 };
      }

      this.progress[station].elapsed = elapsed;
      this.progress[station].duration = duration;
      this.progress[station].lastUpdate = Date.now();

      if (this.progress[station].intervalId === 0) {
        this.progress[station].intervalId = setInterval(() => this.updateProgressBar(station), 1000);
      }
      this.updateProgressBar(station);
    },
    stopProgressBar(station) {
      if (this.progress[station].intervalId !== 0) {
        clearInterval(this.progress[station].intervalId);
      }
      this.progress[station].intervalId = 0;
    },
    updateProgressBar(station) {
      let now = Date.now();
      this.progress[station].elapsed += (now - this.progress[station].lastUpdate) / 1000;
      this.progress[station].lastUpdate = now;
      if (this.progress[station].duration > 0 && this.progress[station].elapsed > this.progress[station].duration) {
        this.progress[station].elapsed = this.progress[station].duration;
        this.stopProgressBar(station);
      }

    },
  },
    // Initialize stations dynamically
    created() {
      // for (const station in subs) {
      //   this.stations[station] = { lastShId: null }; 
      // }
      this.stationNames.forEach((stationName) => {
        this.stations[`station:${stationName}`] = { lastShId: null }; 
      });
    },
});

function minSec(duration) {
  const minutes = Math.trunc(duration / 60);
  const seconds = Math.trunc(duration % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
function getTimezoneName(type) {
  const today = new Date();
  const short = today.toLocaleDateString(undefined);
  const full = today.toLocaleDateString(undefined, { timeZoneName: type });
  // Trying to remove date from the string in a locale-agnostic way
  const shortIndex = full.indexOf(short);
  if (shortIndex >= 0) {
    const trimmed = full.substring(0, shortIndex) + full.substring(shortIndex + short.length);
    // by this time `trimmed` should be the timezone's name with some punctuation -
    // trim it from both sides
    return trimmed.replace(/^[\s,.\-:;]+|[\s,.\-:;]+$/g, '');

  } else {
    // in some magic case when short representation of date is not present in the long one, just return the long one as a fallback, since it should contain the timezone's name
    return full;
  }
}
// Sanitize a station shortcode, so it can be used in a CSS class name
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");

function setElement(target, content,
  {addClasses=null, attrib=null, style=null, removeClasses=null, timeconvert=false} = {}) {
  // set elements with class="target" to content & modify/set attributes
  // we use classes instead of ids because elements can occur multiple times
  // will safely ignore any elements that are not used in the page
  // (i.e. you don't have to have containers for all ids)
  // content = "" or undefined means: set to empty
  // content = null means: don’t touch content, just modify attribs
  // this is used for user-named indicators ("is..." and "station-player")
  let targets = Array.from(document.getElementsByClassName(target));

  targets.forEach((targ) => {
    if (targ && content) {
      // this target id is used on the page, load it
      // normal node with content, i.e. <tag>content</tag>
      if (timeconvert) {
        targ.textContent = getTimeFromTimestamp(content);
      } else {
        targ.textContent = content;
      }
    } else if (targ && content !== null) {
      // null = don’t modify (user can set in page)
      // empty or undefined = set to empty
      targ.textContent = "";
    }
    // set attributes, if any
    if (targ && attrib) {
      Object.entries(attrib).forEach(([k,v]) => {
        targ.setAttribute(k, v);
      });
    }
    // set styles, if any
    if (targ && style) {
      Object.entries(style).forEach(([k,v]) => {
        targ.style[k] = v;
      });
    }    
    // remove Classes, if any
    if (targ && removeClasses) {
      targ.classList.remove(...removeClasses);
    }
    // add Classes, if any
    if (targ && addClasses) {
      targ.classList.add(...addClasses);
    }
  });
}


