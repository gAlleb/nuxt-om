<template>
    

    <div  class="icecast_player " id="ice-player" style="z-index:999; display: flex; transform: translateY(100%); "></div>
    

</template>

<script setup>


onMounted(() => {
/*
 IcePlayer v.3.0.0 - Player for Site (Icecast2 Online Radio)
 Copyright (c) 2016-2020 Andrew Molchanov
 https://github.com/JoCat/IcePlayer
*/

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
        this.audio_object.volume = (localStorage.getItem("vol") !== null) ? parseFloat(localStorage.getItem("vol")) : 0.7       
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
        
    }
    pause() {
        this.audio_object.pause();
        clearTimeout(this.timer);
        document.title = "omFM.ru — Радио ОМ FM — Музыка для медитации, йоги, сна | om fm" ;
        const player_button = document.getElementById("menu_button");
        player_button.style.backgroundColor = "";

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
    }
    change_volume() {
        this.audio_object.volume = this.get_element('.ice-volume').value / 100;
        localStorage.setItem("vol", this.audio_object.volume);
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
        } else {
            this.hide('.ice-pause');
            this.show('.ice-play');
            this.hide('#live')
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




    new IcePlayer('#ice-player'); 
})

</script>
