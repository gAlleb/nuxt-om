import { defineStore } from 'pinia';
import ColorThief from '~/../node_modules/colorthief/dist/color-thief.mjs'

export const useOmfmData = defineStore('stationData_omfm',{
  state: () => ({
    stations: {}, // Object to store station data
    eventSource: null,
    isLoading: true,
    stationNames: ['radio','cdp'],
    progress: {},
    coverArtUrls: {}, 
    nextCoverArtUrls: {},
    nextCollectionViewUrls: {},
    lastFetchedShIds: {},
    lastFetchedShIds2: {},
    songHistoryCoverArt: {},
    collectionViewUrls: {},
    songHistoryCollectionViewUrls: {},
    defaultCoverart: '/static/img/defaultCoverart.jpg',
    cache: {},
    dominantColors: {},
  }),
  actions: {
    connectToSSE() {
      const baseUri = "https://centrifugo.omfm.ru"; 
      const subs = this.stationNames.reduce((acc, station) => {
        acc[`station:${station}`] = { "recover": true };
        return acc;
      }, {});

      const sseUri = baseUri + "/connection/sse?cf_connect=" + JSON.stringify({
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
              this.updateStationData(station, npData);
              
            }
          }
        } else if (data.pub) {
          this.updateStationData(data.channel, data.pub.data);
           
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
    updateStationData(station, npData) {
     
      this.stations[station] = npData; // Update station data directly
      //const np = this.stations[station].np || null;
      this.startProgressBar(station, npData.np.now_playing.elapsed, npData.np.now_playing.duration); // Start progress bar on data update
      // Check for sh_id change (using separate object)
      const currentShId = npData.np.now_playing.song.text;
      if (station === 'station:cdp') {
      const currentShId_next = npData.np.playing_next.song.title;
      if (this.lastFetchedShIds2[station] !== currentShId_next) {
        this.lastFetchedShIds2[station] = currentShId_next; // Update the last fetched sh_id
          this.fetchNextCoverArt(npData.np.playing_next.song.artist, npData.np.playing_next.song.title, station);
      } else {
      }
      }
      if (this.lastFetchedShIds[station] !== currentShId) {
        this.lastFetchedShIds[station] = currentShId; // Update the last fetched sh_id
        this.fetchCoverArt(npData.np.now_playing.song.artist, npData.np.now_playing.song.title, station)
        .then(coverArtData => {
          this.coverArtUrls[station] = coverArtData.artworkUrl;
          this.collectionViewUrls[station] = coverArtData.collectionViewUrl;
          this.getDominantColor(coverArtData.artworkUrl, npData.np.now_playing.song.text, station);
        });
        this.fetchCoverArtForSongHistory(npData.np.song_history, station);
    //     this.fetchCoverArtSpotify(npData.np.now_playing.song.album, npData.np.now_playing.song.artist, npData.spotifyToken, station)
    //     .then(coverArtUrl => {
    //       this.coverArtUrls[station] = coverArtUrl;
    //     });
        
    //     this.fetchCoverArtForSongHistorySpotify(npData.np.song_history, npData.spotifyToken, station);
    // 
     } else {
        
     }
      
    },
    async getDominantColor(imageUrl, key, station) {
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
    async fetchCoverArt(artist, title, station) {
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
          artworkUrl: this.defaultCoverart,
          collectionViewUrl: '#',
        }
        return results
      }

      const data = response.ok ? await response.json() : {}
      if (!data.results || data.results.length === 0) {
        const results = {
          title: title,
          artist: artist,
          artworkUrl: this.defaultCoverart,
          collectionViewUrl: '#',
        }
        return results
      }

      const itunes = data.results[0]
      const results = {
        title: itunes.trackName || title,
        artist: itunes.artistName || artist,
        artworkUrl: itunes.artworkUrl100 ? itunes.artworkUrl100.replace('100x100', '512x512') : this.defaultCoverart,
        collectionViewUrl: itunes.collectionViewUrl,
      }
      this.cache[cacheKey] = results;
      return results;
      // try {
      //   const response = await fetch(`https://itunes.apple.com/search?term=${artist} ${title}&media=music&limit=1`, {
      //     headers: {
      //       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15'
      //     }
      //   });

      //   const data = await response.json();
      //   if (data.resultCount) {
      //     const artworkUrl100 = data.results[0].artworkUrl100;
      //     const artworkUrl512 = artworkUrl100.replace('100x100bb', '512x512bb');
      //     const collectionViewUrl = data.results[0].collectionViewUrl;
      //     return {
      //       artworkUrl: artworkUrl512,
      //       collectionViewUrl: collectionViewUrl
      //     };
      //   }
      // } catch (error) {
      //   console.error('Error fetching data from iTunes:', error);
      // }
      // return {
      //   artworkUrl: 'https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg',
      //   collectionViewUrl: '#'
      // };
    },
    async fetchNextCoverArt(artist, title, station) {
      this.fetchCoverArt(artist, title, station).then((coverArtData) => {
        this.nextCoverArtUrls[station] = coverArtData.artworkUrl
        this.nextCollectionViewUrls[station] = coverArtData.collectionViewUrl
      })
    },
    async fetchCoverArtSpotify(album, artist, spotifyToken, station) {
      try {

 
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${artist} ${album}&type=album&limit=1`,
          {
          headers: {
            'Authorization': 'Bearer ' + spotifyToken
          }
        });

        const data = await response.json();
        if (data.albums.items.length !== 0) {
          const artworkUrl100 = data.albums.items[0].images[0].url;
          const artworkUrl512 = artworkUrl100.replace('100x100bb', '512x512bb');
          return artworkUrl512;
        }
        
      } catch (error) {
        console.error('Error fetching cover art:', error);
      }
      return 'https://radio.omfm.ru/static/uploads/album_art.1702973774.jpg'; // Return null if no cover art is found
    },
    async fetchCoverArtForSongHistory(songHistory, station) {
      const historyToFetch = songHistory.slice(1, 6); 
      historyToFetch.forEach((song, index) => {
        this.fetchCoverArt(song.song.artist, song.song.title, station)
        .then(coverArtData => {
          if (!this.songHistoryCoverArt[station]) {
            this.songHistoryCoverArt[station] = {};
          }
          if (!this.songHistoryCollectionViewUrls[station]) {
            this.songHistoryCollectionViewUrls[station] = {};
          }
          this.songHistoryCoverArt[station][index] = coverArtData.artworkUrl;
          this.songHistoryCollectionViewUrls[station][index] = coverArtData.collectionViewUrl;
        });
      });
    },
    async fetchCoverArtForSongHistorySpotify(songHistory, spotifyToken, station) {
      const historyToFetch = songHistory.slice(1, 6); 
      historyToFetch.forEach((song, index) => {
        this.fetchCoverArtSpotify(song.song.album, song.song.artist, spotifyToken, station)
          .then(coverArtUrl => {
            if (!this.songHistoryCoverArt[station]) {
              this.songHistoryCoverArt[station] = {};
            }
            this.songHistoryCoverArt[station][index] = coverArtUrl;
          });
      });
    },
  },
    // Initialize stations dynamically
    created() {
      // for (const station in subs) {
      //   this.stations[station] = { lastShId: null }; 
      // }
      this.stationNames.forEach((stationName) => {
        this.stations[`station:${stationName}`] = { lastShId: null }; 
        this.lastFetchedShIds[`station:${stationName}`] = null; // Initialize lastFetchedShIds
      });
    },
});
