import { defineStore } from 'pinia';
import ColorThief from 'colorthief'

export const useAzuracastData = defineStore({
  id: 'stationData',
  state: () => ({
    stations: {}, // Object to store station data
    eventSource: null,
    isLoading: true,
    stationNames: ['radio', 'coma', 'terra', 'core', 'chill'],
    progress: {},
    coverArtUrls: {},
    nextCoverArtUrls: {},
    lastFetchedShIds: {},
    songHistoryCoverArt: {},
    collectionViewUrls: {},
    nextCollectionViewUrls: {},
    songHistoryCollectionViewUrls: {},
    spotifyToken: '',
    documentTitle: {},
    cache: {},
    dominantColors: {},
  }),
  actions: {
    connectToSSE() {
      const baseUri = 'https://radio.omfm.ru'
      const subs = this.stationNames.reduce((acc, stationName) => {
        acc[`station:${stationName}`] = { recover: true }
        return acc
      }, {})

      const sseUri =
        baseUri +
        '/api/live/nowplaying/sse?cf_connect=' +
        JSON.stringify({
          subs: subs,
        })

      this.eventSource = new EventSource(sseUri)

      this.eventSource.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        this.isLoading = false // Set loading to false when connected
        if (data.connect && data.connect.subs) {
          for (const station in data.connect.subs) {
            const publications = data.connect.subs[station].publications
            if (publications && publications.length > 0) {
              const npData = publications[0].data
              this.updateStationData(station, npData)
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
    updateStationData(station, npData) {
      this.stations[station] = npData // Update station data directly
      let ch = station.split(':')[1] || null
      // sanitize station shortcode for use in a CSS class name
      ch = toKebabCase(ch)
      //const np = this.stations[station].np || null;
      this.startProgressBar(station, npData.np.now_playing.elapsed, npData.np.now_playing.duration) // Start progress bar on data update
      this.documentTitle[station] = npData.np.now_playing.song.text
      if (station !== 'station:radio') {
      this.getDominantColor(npData.np.now_playing.song.art, npData.np.now_playing.sh_id, station);
      }
      // Check for sh_id change (using separate object)
      const currentShId = npData.np.now_playing.sh_id
      if (this.lastFetchedShIds[station] !== currentShId) {
        this.lastFetchedShIds[station] = currentShId // Update the last fetched sh_id

        setElement('np-' + ch + '-song-text', npData.np.now_playing.song.text)
        setElement('np-' + ch + '-song-art', '', {
          style: {
            'background-image': 'url(' + npData.np.now_playing.song.art + ')',
          },
          addClasses: ['animated', 'bounceInLeft'],
        })
        setTimeout(function () {
          setElement('np-' + ch + '-song-art', '', {
            removeClasses: ['animated', 'bounceInLeft'],
          })
        }, 2000)
        if (station === 'station:radio') {
          this.fetchCoverArt(npData.np.now_playing.song.artist, npData.np.now_playing.song.title, npData.np.now_playing.song.art).then((coverArtData) => {
            this.coverArtUrls[station] = coverArtData.artworkUrl
            this.collectionViewUrls[station] = coverArtData.collectionViewUrl
            this.getDominantColor(coverArtData.artworkUrl, npData.np.now_playing.sh_id, station);
          })
          this.fetchCoverArtForSongHistory(npData.np.song_history, station)
          this.fetchNextCoverArt(npData.np.playing_next.song.artist, npData.np.playing_next.song.title, npData.np.playing_next.song.art, station)
        }

        // this.fetchSpotifyToken();

        //     if (this.spotifyToken === '') {
        //       this.fetchSpotifyToken()
        //       .then(() => {
        //           if (station === "station:radio") {
        //             this.fetchCoverArtSpotify(npData.np.now_playing.song.album, npData.np.now_playing.song.artist, station)
        //             .then(coverArtUrl => {
        //             this.coverArtUrls[station] = coverArtUrl;

        //             });

        //             this.fetchCoverArtForSongHistorySpotify(npData.np.song_history, station);
        //             this.fetchNextCoverArtSpotify(npData.np.playing_next.song.album, npData.np.playing_next.song.artist, station);
        //           }
        //       })
        //     } else {
        //           if (station === "station:radio") {
        //             this.fetchCoverArtSpotify(npData.np.now_playing.song.album, npData.np.now_playing.song.artist, station)
        //             .then(coverArtUrl => {
        //             this.coverArtUrls[station] = coverArtUrl;
        //             });

        //             this.fetchCoverArtForSongHistorySpotify(npData.np.song_history, station);
        //             this.fetchNextCoverArtSpotify(npData.np.playing_next.song.album, npData.np.playing_next.song.artist,  station);
        //           }
        //     }
      } else {
      }
    },
    async getDominantColor(imageUrl, key, station) {
      //  return new Promise(async (resolve) => {
      const cacheKey = key;
      if (this.cache[cacheKey]) {
        this.dominantColors[station] = this.cache[cacheKey]; 
      } else {
          try {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = imageUrl;
            await new Promise((resolve) => img.onload = resolve); // Wait for image to load
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img); // Get dominant color
            this.dominantColors[station] = color; // Store the color
            this.cache[cacheKey] = color;
          } catch (error) {
            console.error('Error getting dominant color:', error);
            this.dominantColors[station] = [0, 0, 0]; // Default to black if error
         }
      }
      // });
    },
    startProgressBar(station, elapsed, duration) {
      // Dynamically initialize progress data for each station
      if (!this.progress[station]) {
        this.progress[station] = { elapsed: 0, duration: 0, lastUpdate: Date.now(), intervalId: 0, width: 0 }
      }

      this.progress[station].elapsed = elapsed
      this.progress[station].duration = duration
      this.progress[station].lastUpdate = Date.now()

      if (this.progress[station].intervalId === 0) {
        this.progress[station].intervalId = setInterval(() => this.updateProgressBar(station), 1000)
      }
      this.updateProgressBar(station)
    },
    stopProgressBar(station) {
      if (this.progress[station].intervalId !== 0) {
        clearInterval(this.progress[station].intervalId)
      }
      this.progress[station].intervalId = 0
    },
    updateProgressBar(station) {
      let now = Date.now()
      this.progress[station].elapsed += (now - this.progress[station].lastUpdate) / 1000
      this.progress[station].lastUpdate = now
      this.progress[station].width = (this.progress[station].elapsed / this.progress[station].duration) * 100.0
      this.progress[station].width = this.progress[station].width > 100 ? 100 : this.progress[station].width

      if (this.progress[station].duration > 0 && this.progress[station].elapsed > this.progress[station].duration) {
        this.progress[station].elapsed = this.progress[station].duration
        this.stopProgressBar(station)
      }
    },
    async fetchCoverArt(artist, title, coverArt) {
      const track = artist + ' ' + title
      const cacheKey = track; //Remove toLowerCase cause it messes up with non-latin which has no lowercase, e.g. devanagari (दारिद्र्य दहन शिवस्तोत्रं) or use track.normalize('NFC'); 
      if (this.cache[cacheKey]) {
        return this.cache[cacheKey];
      }
      //const response = await fetch(`https://itunes.apple.com/search?limit=1&media=music&term=${encodeURIComponent(track)}`)
      const response = await fetch(`https://itunes.apple.com/search?limit=1&media=music&term=${encodeURIComponent(track)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15'
        }
      });
      if (response.status === 403) {
        const results = {
          title: title,
          artist: artist,
          artworkUrl: coverArt,
          collectionViewUrl: '#',
        }
        return results
      }

      const data = response.ok ? await response.json() : {}
      if (!data.results || data.results.length === 0) {
        const results = {
          title: title,
          artist: artist,
          artworkUrl: coverArt,
          collectionViewUrl: '#',
        }
        return results
      }

      const itunes = data.results[0]
      const results = {
        title: itunes.trackName || title,
        artist: itunes.artistName || artist,
        artworkUrl: itunes.artworkUrl100 ? itunes.artworkUrl100.replace('100x100', '512x512') : coverArt,
        collectionViewUrl: itunes.collectionViewUrl,
      }
      this.cache[cacheKey] = results;
      return results;
    },
    async fetchSpotifyToken() {
      try {
        const response0 = await fetch(`https://rock.omfm.ru/api/spotifyToken`)
        const spotifyToken = await response0.text()
        if (spotifyToken.length !== 0) {
          this.spotifyToken = spotifyToken
        }
      } catch (error) {
        console.error('Error fetching cover art:', error)
      }
      return ''
    },
    // Helper function to ensure spotifyToken is populated
    async ensureSpotifyToken() {
      if (this.spotifyToken === '') {
        await this.fetchSpotifyToken()
      }
    },
    async fetchCoverArtSpotify(album, artist, station) {
      try {
        // if (!this.spotifyToken) {
        //   await this.fetchSpotifyToken(); // Fetch token if it's not available
        // }
        const response = await fetch(`https://api.spotify.com/v1/search?q=${artist} ${album}&type=album&limit=1`, {
          headers: {
            Authorization: 'Bearer ' + this.spotifyToken,
          },
        })

        const data = await response.json()
        if (data.albums && data.albums.items.length !== 0) {
          const artworkUrl100 = data.albums.items[0].images[0].url
          const artworkUrl512 = artworkUrl100.replace('100x100bb', '512x512bb')
          return artworkUrl512
        } else {
          return 'https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg'
        }
      } catch (error) {
        console.error('Error fetching cover art:', error)
      }
      return 'https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg' // Return null if no cover art is found
    },
    async fetchCoverArtForSongHistory(songHistory, station) {
      const historyToFetch = songHistory.slice(0, 5)
      historyToFetch.forEach((song, index) => {
        this.fetchCoverArt(song.song.artist, song.song.title, song.song.art).then((coverArtData) => {
          if (!this.songHistoryCoverArt[station]) {
            this.songHistoryCoverArt[station] = {}
          }
          if (!this.songHistoryCollectionViewUrls[station]) {
            this.songHistoryCollectionViewUrls[station] = {}
          }
          this.songHistoryCoverArt[station][index] = coverArtData.artworkUrl
          this.songHistoryCollectionViewUrls[station][index] = coverArtData.collectionViewUrl
        })
      })
    },
    async fetchCoverArtForSongHistorySpotify(songHistory, station) {
      const historyToFetch = songHistory.slice(0, 5)
      historyToFetch.forEach((song, index) => {
        this.fetchCoverArtSpotify(song.song.album, song.song.artist, station).then((coverArtUrl) => {
          if (!this.songHistoryCoverArt[station]) {
            this.songHistoryCoverArt[station] = {}
          }
          this.songHistoryCoverArt[station][index] = coverArtUrl
        })
      })
    },
    async fetchNextCoverArt(artist, title, coverArt, station) {
      this.fetchCoverArt(artist, title, coverArt).then((coverArtData) => {
        this.nextCoverArtUrls[station] = coverArtData.artworkUrl
        this.nextCollectionViewUrls[station] = coverArtData.collectionViewUrl
      })
    },
    async fetchNextCoverArtSpotify(album, artist, station) {
      this.fetchCoverArtSpotify(album, artist, station).then((coverArtUrl) => {
        this.nextCoverArtUrls[station] = coverArtUrl
      })
    },
  },
  // Initialize stations dynamically
  created() {
    // for (const station in subs) {
    //   this.stations[station] = { lastShId: null };
    // }
    this.stationNames.forEach((stationName) => {
      //this.stations[`station:${stationName}`] = { lastShId: null };
      this.lastFetchedShIds[`station:${stationName}`] = null // Initialize lastFetchedShIds
    })
  },
})

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

