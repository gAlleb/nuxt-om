"use strict";

class IcePlayer {
    constructor(el, init_params) {
        if (el.length === 0) throw new Error('Player element not found!');

        // Player Params
        this.server_address = 'https://omfm.ru:8443/' // Default address:port
        this.stream_mount = 'stream' // Default mount
        this.style = 'fixed' // Player style (fixed or inline)
        this.template = '<div class="ice-player-el "><div><i class="ice-play"  ></i><i class="ice-pause"  ></i><i class="ice-stop"  ></i></div><input class="ice-volume" type="range" min="0" max="100" value="50" step="1"><img class="ms-2" id="live" src="/live.gif" style=" opacity:1;display:inline-flex;"><div style="flex-grow: 1;flex-shrink: 1;flex-basis: 0%;min-width: 0;"><span class="ms-3 ice-track ellipsify" id="trackname" style="opacity:1;"></span></div></div>'
        
        // Informer Params
        this.mounts_list = ['stream', 'nonstop'] // Mount point list
        this.info_link = 'current_track.xsl' // Info file
        this.time_update = 10 // Time to update information (in seconds)

        // System Params
        this.audio_object = new Audio()
        //this.audio_object.volume = 0.5
        this.localStorage = window.localStorage;
        this.audio_object.volume = (this.localStorage.getItem("vol") !== null) ? parseFloat(this.localStorage.getItem("vol")) : 0.7       
        this.current_state = 0

        //State const
        this.STOPPED = 0
        this.PLAYING = 1
        this.PAUSED  = 2

        // Setting transmitted parameters
        if (typeof init_params === 'object') {
            const init_params_list = Object.keys(init_params).filter(param => ['server_address', 'stream_mount', 'style', 'template', 'mounts_list', 'info_link', 'time_update'].includes(param));
            for (let parameter of init_params_list) {
                this[parameter] = init_params[parameter];
            }
        }

        this.player_el = document.querySelector(el);
        this.player_el.classList.add('ice-player', this.style);
        this.set_content(this.player_el, this.template);

        // Events
        this.get_element('.ice-play').addEventListener('click', () => {this.play()});
        this.get_element('.ice-pause').addEventListener('click', () => {this.pause()});
        this.get_element('.ice-stop').addEventListener('click', () => {this.stop()});

        this.get_element('.ice-volume').addEventListener('mousemove', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('click', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('touchmove', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('touchstart', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('touchend', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('touchcancel', () => {this.change_volume()});
       
        
        // Hide Header Vertical Vol if cliked outside
        document.addEventListener('click', e => {
            const vertical_player_header = document.getElementById("ice-volume3");
            const vertical_player_header_Btn = document.getElementById("ice-volume3_Btn");
            if (!vertical_player_header.contains(e.target) && !vertical_player_header_Btn.contains(e.target) ) {
                vertical_player_header.classList.remove('open_volume');
           
            }
             });
        this.audio_object.addEventListener('play', () => {
            this.current_state = this.PLAYING;
            this.play_pause_toggle();
        });
        this.audio_object.addEventListener('pause', () => {
            this.current_state = this.PAUSED;
            this.play_pause_toggle();
        });

      // Set the volume when the player is initialized
      this.get_element('.ice-volume').value = this.audio_object.volume * 100; // Update the volume slider
      document.getElementById("ice-volume3").value = this.audio_object.volume * 100;
      this.hide('#live')
    }
     
    // Functions
    
    play() {
        if (this.current_state === this.STOPPED)
            this.audio_object.setAttribute('src', this.server_address + this.stream_mount + '?cache-ignore=' + Date.now());
        this.audio_object.play();
          // show current playable track
        this.showinfo();
        const player_button = document.getElementById("menu_button");
        player_button.style.backgroundColor = "#18a310";
        const playBtnPlayer1 = document.getElementById("playBtnPlayer1");
        playBtnPlayer1.style.display = "none";
        const stopBtnPlayer1 = document.getElementById("stopBtnPlayer1");
        stopBtnPlayer1.style.display = "inline-flex";

        
    }
    pause() {
        this.audio_object.pause();
        clearTimeout(this.timer);
        document.title = "omFM.ru — Радио ОМ FM — Музыка для медитации, йоги, сна | om fm" ;
        const player_button = document.getElementById("menu_button");
        player_button.style.backgroundColor = "";
        const playBtnPlayer1 = document.getElementById("playBtnPlayer1");
        playBtnPlayer1.style.display = "inline-flex";
        const stopBtnPlayer1 = document.getElementById("stopBtnPlayer1");
        stopBtnPlayer1.style.display = "none";
    }
    stop() {
        this.audio_object.pause();
        this.audio_object.setAttribute('src', '');
        this.current_state = this.STOPPED;
        clearTimeout(this.timer);
        document.title = "omFM.ru — Радио ОМ FM — Музыка для медитации, йоги, сна | om fm" ;
        document.querySelector(".ice-track").innerHTML =  "";
        this.play_pause_toggle();
        const player_button = document.getElementById("menu_button");
        player_button.style.backgroundColor = "";
        const playBtnPlayer1 = document.getElementById("playBtnPlayer1");
        playBtnPlayer1.style.display = "inline-flex";
        const stopBtnPlayer1 = document.getElementById("stopBtnPlayer1");
        stopBtnPlayer1.style.display = "none";
    }
    hide_stop_button() {
        const playBtnPlayer1 = document.getElementById("playBtnPlayer1");
        playBtnPlayer1.style.display = "inline-flex";
        const stopBtnPlayer1 = document.getElementById("stopBtnPlayer1");
        stopBtnPlayer1.style.display = "none"; 
    }
    change_volume() {
        this.audio_object.volume = this.get_element('.ice-volume').value / 100;
        this.localStorage.setItem("vol", this.audio_object.volume);
        document.getElementById("ice-volume3").value = this.audio_object.volume * 100;
    }
    change_volume3() {
        this.audio_object.volume = document.getElementById("ice-volume3").value / 100;
        this.localStorage.setItem("vol", this.audio_object.volume);
        this.get_element('.ice-volume').value = this.audio_object.volume * 100;
    }
    vol_btn_main() {
        document.getElementById("ice-volume3").classList.toggle("open_volume");
        //this.get_element(".speaker").classList.toggle('open_volume');
    }
    vol_btn_main_just_hide() {
        document.getElementById("ice-volume3").classList.remove("open_volume");
        //this.get_element(".speaker").classList.toggle('open_volume');
    }
    showinfo() {
        // this.request(this.server_address + this.info_link, (data) => {
        //     for (let mount_name of this.mounts_list) {
        //         if (data[mount_name]) {
        //             this.set_content('.ice-track', data[mount_name].title);
        //             break;
        //         }
        //     }
        // });
        // this.timer = setTimeout(() => {this.showinfo()}, this.time_update*1000);
            var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            var data = JSON.parse(this.responseText);

            let title = data.icestats.source.title;
    document.title = title + "omFM.ru — Радио ОМ FM — Музыка для медитации, йоги, сна | om fm" ;
    document.querySelector(".ice-track").innerHTML =  title;

    
        }
    }
    var d = new Date();
    xhttp.open('GET', 'https://omfm.ru:8443/status-json.xsl?mount=/stream&' + d.getTime(), true);
    xhttp.send();
    if (this.audio_object.paused === false) { // Check if playing
        this.timer = setTimeout(() => {
            this.showinfo()
        }, this.time_update * 1000);
    }
    //this.timer = setTimeout(() => {this.showinfo()}, this.time_update*1000);
    }

    play_pause_toggle() {
        if (this.current_state === this.PLAYING) {
            this.hide('.ice-play');
            this.show('.ice-pause');
            this.show('#live')
            document.querySelector(".ice-track").style.visibility = "visible"
        } else {
            this.hide('.ice-pause');
            this.show('.ice-play');
            this.hide('#live')
            document.querySelector(".ice-track").style.visibility = "hidden"
        }
    }

    // Utils
    get_element(el) {
        return (typeof el == 'object') ? el : this.player_el.querySelector(el);
    }
    set_content(el, content) {
        this.get_element(el).innerHTML = content;
    }
    request(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            callback(data);
            }
        };
        request.send();
    }
    hide(el) {
        this.get_element(el).style.display = 'none';
    }
    show(el) {
        this.get_element(el).style.display = 'inline-flex';
    }

    
};

export default IcePlayer;