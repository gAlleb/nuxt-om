<template>
    

    <div  ref="icecast_player" class="icecast_player" id="ice-player" style="z-index:999; display: flex;"></div>
    

</template>

<script setup>


onMounted(() => {

    "use strict";

class IcePlayer {
    constructor(el, init_params) {
        if (el.length === 0) throw new Error('Player element not found!'); 

        // Player Params
        this.server_address = 'https://omfm.ru:8443/' // Default address:port
        this.stream_mount = 'stream' // Default mount
        this.style = 'fixed' // Player style (fixed or inline)
        this.template = '<div class="ice-player-el ms-1" id="ice-player-el"><div id="song_progress_elapsed" style="opacity:0" class="np-radio-song-elapsed song_progress_elapsed"></div><div style="opacity:0" id="song_duration" class="song_duration np-radio-song-duration"></div><div class="progress_bar_div_wrapper">  <div id="progress_bar_div" style="opacity:0" class="progressbar np-radio-song-progressbar" role="progressbar"></div></div><div><i class="ice-play btn btn-warning  me-2 sm:me-2"></i><i class="ice-pause btn btn-warning me-2 sm:me-3"></i><i class="ice-stop btn btn-danger me-1 sm:me-3"></i><button id="show_volume_xs" class=" align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-orange-400 text-black hover:bg-orange-500 inline-flex sm:hidden ms-1 me-3 sm:me-3   "><i class="fa fa-volume-up" style="color: black;text-shadow: 0 0 10px #fff;"></i></button></div><a class="mute speaker " title="mute/unmute"><span></span></a><input id="ice_volume" class="ice-volume hidden sm:block" type="range" min="0" max="100" value="70" step="1"><div class="vol_value hidden sm:block ms-2" style="color:#333;font-family: monospace;position: fixed;left: 130px;pointer-events: none;">70%</div><div class="vol_value2 hidden ">70%</div><input id="ice_volume_vertical" class="volume-vertical block sm:hidden" type="range" min="0" max="100" value="70" step="1"><img id="live" src="assets/img/live.gif" style=" opacity:0;display:none;" class="mx-3 hidden sm:block"><div style="flex-grow: 1;flex-shrink: 1;flex-basis: 0%;min-width: 0;"><span class="ice-track ellipsify np-radio-song-text" id="trackname" style="opacity:1;border-radius: 10px;"></span></div><div id="IceCover" class="ms-1 hidden" style="border: 0.5px solid rgb(68, 68, 68); border-radius: 0.5rem; opacity: 1; margin-right: 5px; min-height: 70px; min-width: 70px; background-size: cover; background-image: url(&quot;/assets/img/bg-capa-trans.png&quot;); opacity:0;transition: opacity 2000ms ease 0s;"></div>'

        // Informer Params
        this.mounts_list = ['stream', 'xintranaturex'] // Mount point list
        // this.info_link = 'current_track.xsl' // Info file
        this.info_link = 'status-json.xsl' // Info file
        this.time_update = 10 // Time to update information (in seconds)

        // System Params
        this.audio_object = new Audio()
        this.audio_object.volume = (localStorage.getItem("vol") !== null) ? localStorage.getItem("vol") : 0.7
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
        // Set cached volume if exists
        if (localStorage.getItem("vol") !== null) {
        const volValue = this.audio_object.volume * 100;
        this.get_element(".ice-volume").value = volValue;
        this.get_element(".volume-vertical").value = volValue;
        this.get_element(".ice-volume").style.background = `linear-gradient(to right, #ff9d41 ${volValue}%,  rgba(75, 75, 75, 1) ${volValue}%)`;
        this.get_element(".volume-vertical").style.background = `linear-gradient(to right, #ff9d41 ${volValue}%,  rgba(75, 75, 75, 1) ${volValue}%)`;
        this.get_element(".vol_value").textContent = Math.round(volValue) + "%";
        this.get_element(".vol_value2").textContent = Math.round(volValue) + "%";
            if (this.audio_object.volume === 0) {
                this.get_element('.speaker').classList.add("muted");
            }
        }
  
        // Events
        this.get_element('.ice-play').addEventListener('click', () => {this.play()});
        this.get_element('.ice-pause').addEventListener('click', () => {this.pause()});
        this.get_element('.ice-stop').addEventListener('click', () => {this.stop()});
      
        this.get_element('.ice-volume').addEventListener('mousemove', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('touchmove', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('touchstart', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('touchend', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('touchcancel', () => {this.change_volume()});
        this.get_element('.ice-volume').addEventListener('click', () => {this.change_volume()});
       
        this.get_element('.volume-vertical').addEventListener('click', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('mousemove', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('touchmove', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('touchstart', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('touchend', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('touchcancel', () => {this.change_volume2()});

        // this.get_element('.ice-volume').addEventListener('mousemove', () => {this.change_volume_bar()});
        // this.get_element('.ice-volume').addEventListener('touchmove', () => {this.change_volume_bar()});
        // this.get_element('.ice-volume').addEventListener('touchstart', () => {this.change_volume_bar()});
        // this.get_element('.ice-volume').addEventListener('touchend', () => {this.change_volume_bar()});
        // this.get_element('.ice-volume').addEventListener('touchcancel', () => {this.change_volume_bar()});
        // this.get_element('.ice-volume').addEventListener('click', () => {this.change_volume_bar()});

        this.get_element('.ice-volume').addEventListener('input', (event) => {this.change_volume_text()});
        this.get_element('.volume-vertical').addEventListener('input', (event) => {this.change_volume_text()});

        // this.get_element('.volume-vertical').addEventListener('mousemove', () => {this.change_volume_bar2()});
        // this.get_element('.volume-vertical').addEventListener('touchmove', () => {this.change_volume_bar2()});
        // this.get_element('.volume-vertical').addEventListener('touchstart', () => {this.change_volume_bar2()});
        // this.get_element('.volume-vertical').addEventListener('touchend', () => {this.change_volume_bar()});
        // this.get_element('.volume-vertical').addEventListener('touchcancel', () => {this.change_volume_bar2()});
        // this.get_element('.volume-vertical').addEventListener('click', () => {this.change_volume_bar2()});

        this.get_element('.mute').addEventListener('click', () => {this.mute()});
        this.get_element('#show_volume_xs').addEventListener('click', () => {this.vol_btn_main()});
        //this.get_element('#show_volume_xs').addEventListener('mouseenter', () => {this.vol_btn_main_hover()});


        this.get_element('.ice-volume').addEventListener('click', () => {this.unmute_onclick()});
        this.get_element('.volume-vertical').addEventListener('click', () => {this.unmute_onclick2()});

        this.get_element('.volume-vertical').addEventListener('touchstart', () => {this.unmute_onclick2()});
        this.get_element('.ice-volume').addEventListener('touchstart', () => {this.unmute_onclick()});


        window.addEventListener('load', () => {this.change_volume_bar()});
        window.addEventListener('load', () => {this.change_volume_bar2()});

        document.addEventListener('click', e => {
        if (!this.get_element("#ice_volume_vertical").contains(e.target) && !this.get_element(".speaker").contains(e.target) && ! this.get_element('#show_volume_xs').contains(e.target) ) {
             this.get_element("#ice_volume_vertical").classList.remove('open_volume');
        this.get_element(".speaker").classList.remove('open_volume');
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

        // show current playable track
       
    }

    // Functions
    play() {
        if (this.current_state === this.STOPPED)
            this.audio_object.setAttribute('src', this.server_address + this.stream_mount + '?cache-ignore=' + Date.now());
        this.audio_object.play();
        
        this.showinfo();
    }
    pause() {
        this.audio_object.pause();
    }
    stop() {
        this.audio_object.pause();
        this.audio_object.setAttribute('src', '');
        this.current_state = this.STOPPED;
        this.play_pause_toggle();
        document.title = "omFM.ru — Радио ОМ FM — Музыка для медитации, йоги, сна | om fm" ;

    }
    change_volume() {
         if (this.audio_object.muted === false)  {
        this.audio_object.volume = this.get_element('.ice-volume').value / 100;
        this.get_element('.volume-vertical').value  = this.get_element('.ice-volume').value;

    }
      
        if (this.audio_object.volume === 0. || this.audio_object.muted === true) {
       
         this.get_element('.speaker').classList.add("muted");
         } else if (this.audio_object.volume > 0.0 && this.audio_object.muted === false)   {
         
         this.get_element('.speaker').classList.remove("muted");
         }   
        localStorage.setItem("vol", this.audio_object.volume);
        this.change_volume_bar();
        this.change_volume_bar2();
        this.change_volume_text();
       
    }
        unmute_onclick(){
        if (this.audio_object.volume > 0. && this.audio_object.muted === true) {
        this.audio_object.volume = this.get_element('.ice-volume').value / 100;
        localStorage.setItem("vol", this.audio_object.volume);
        this.mute();
        }
    }
         unmute_onclick2(){
        if (this.audio_object.volume >= 0. && this.audio_object.muted === true) {
        this.audio_object.volume = this.get_element('.volume-vertical').value / 100;
    
        localStorage.setItem("vol", this.audio_object.volume);
        this.mute();
        }
    }
    change_volume2() {
         if (this.audio_object.muted === false)  {
        this.audio_object.volume = this.get_element('.volume-vertical').value / 100;
        this.get_element('.ice-volume').value = this.get_element('.volume-vertical').value;

    }
        if (this.audio_object.volume === 0. || this.audio_object.muted === true) {
         this.get_element('.speaker').classList.add("muted");
         } else if (this.audio_object.volume > 0.0 && this.audio_object.muted === false)   {
         this.get_element('.speaker').classList.remove("muted");
         }  
         localStorage.setItem("vol", this.audio_object.volume);
        this.change_volume_bar();
        this.change_volume_text();
        this.change_volume_bar2();
    }
        mute() {
        
         this.audio_object.muted = !this.audio_object.muted;
        


        if (this.audio_object.muted === true)  {
        const sliderEl = document.querySelector(".ice-volume");
        const sliderEl_2 = document.querySelector(".volume-vertical");
        const volValue = document.querySelector(".vol_value");
        const volValue2 = document.querySelector(".vol_value2");
        const tempSliderValue = document.querySelector(".ice-volume").value;
        volValue.textContent = "";
        volValue2.textContent = "";

        const progress = (tempSliderValue / sliderEl.max) * 100;
        sliderEl.value = 0;
        sliderEl_2.value = 0;
        sliderEl.style.background = `linear-gradient(to right, rgba(75, 75, 75, 1) 0%,  rgba(75, 75, 75, 1) 100%)`;
        sliderEl_2.style.background = `linear-gradient(to right, rgba(75, 75, 75, 1) 0%, rgba(75, 75, 75, 1) 100%)`;

        this.get_element('.speaker').classList.add("muted");
         } else  {
         
        this.get_element('.speaker').classList.remove("muted");
        const sliderEl = document.querySelector(".ice-volume");
        const sliderEl_2 = document.querySelector(".volume-vertical");
        const volValue = document.querySelector(".vol_value");
        const volValue2 = document.querySelector(".vol_value2");
        sliderEl.value = this.audio_object.volume * 100;
        sliderEl_2.value = this.audio_object.volume * 100;


        const tempSliderValue = document.querySelector(".ice-volume").value;
        volValue.textContent = tempSliderValue + "%";
        volValue2.textContent = tempSliderValue + "%";

        const progress = (tempSliderValue / sliderEl.max) * 100;

 
        sliderEl.style.background = `linear-gradient(to right, #ff9d41 ${progress}%,  rgba(75, 75, 75, 1) ${progress}%)`;
        sliderEl_2.style.background = `linear-gradient(to right, #ff9d41 ${progress}%, rgba(75, 75, 75, 1) ${progress}%)`;

         }
    
    }

    showinfo() {
        // this.request(this.server_address + this.info_link, (data) => {
        //     for (let mount_name of this.mounts_list) {
        //         if (data[mount_name]) {
        //             this.set_content('.ice-track', data[mount_name].title);
        //             document.title = data[mount_name].title + " | omFM.ru — Радио ОМ FM — Музыка для медитации, йоги, сна | om fm" ;
        //             break;
        //         }
        //     }
        // });

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            var data = JSON.parse(this.responseText);

            let title = data.icestats.source.title;

    document.querySelector(".ice-track").innerHTML =  title;
    document.title = title + " | omFM.ru — Радио ОМ FM — Музыка для медитации, йоги, сна | om fm" ;

        }
    }
    var d = new Date();
    xhttp.open('GET', 'https://omfm.ru:8443/status-json.xsl?mount=/stream&' + d.getTime(), true);
    xhttp.send();
    this.timer = setTimeout(() => {this.showinfo()}, this.time_update*1000);
    }

    play_pause_toggle() {
        if (this.current_state === this.PLAYING) {
            this.hide('.ice-play');
            this.show('.ice-pause');
        } else {
            this.hide('.ice-pause');
            this.show('.ice-play');
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
     change_volume_bar() {
        if (this.audio_object.muted === false)  {
         const sliderValue = document.querySelector(".ice-volume").value;
         document.querySelector(".ice-volume").style.background = `linear-gradient(to right, #ff9d41 ${sliderValue}%,  rgba(75, 75, 75, 1) ${sliderValue}%)`;
         document.querySelector(".volume-vertical").style.background = `linear-gradient(to right, #ff9d41 ${sliderValue}%, rgba(75, 75, 75, 1) ${sliderValue}%)`;

        }
    }
    change_volume_bar2() {
        if (this.audio_object.muted === false)  {
        const sliderValue = document.querySelector(".volume-vertical").value;
        document.querySelector(".volume-vertical").style.background = `linear-gradient(to right,#ff9d41 ${sliderValue}%, rgba(75, 75, 75, 1) ${sliderValue}%)`;
        document.querySelector(".ice-volume").style.background = `linear-gradient(to right, #ff9d41 ${sliderValue}%,  rgba(75, 75, 75, 1) ${sliderValue}%)`;

        }
    }
    change_volume_text() {

        const sliderEl = document.querySelector(".ice-volume");
        const sliderEl_2 = document.querySelector(".volume-vertical");
        const volValue = document.querySelector(".vol_value");
        const volValue2 = document.querySelector(".vol_value2");


        const tempSliderValue = event.target.value;
        if (this.audio_object.muted === false)  {
        volValue.textContent = tempSliderValue + "%";
        volValue2.textContent = tempSliderValue + "%";
    }

        const progress = (tempSliderValue / sliderEl.max) * 100;
        sliderEl.style.setProperty("--thumb-rotate", `${(tempSliderValue/100) * 2160}deg`)
 if (this.audio_object.muted === false)  {
        sliderEl.style.background = `linear-gradient(to right, #ff9d41 ${progress}%,  rgba(75, 75, 75, 1) ${progress}%)`;
        sliderEl_2.style.background = `linear-gradient(to right, #ff9d41 ${progress}%, rgba(75, 75, 75, 1) ${progress}%)`;

}
}
    vol_btn_main() {
        this.get_element("#ice_volume_vertical").classList.toggle("open_volume");
        this.get_element(".speaker").classList.toggle('open_volume');
    }
    vol_btn_main_hover() {
       
        this.get_element("#ice_volume_vertical").classList.toggle('open_volume');
        this.get_element(".speaker").classList.add('open_volume');
    }
    
};
    new IcePlayer('#ice-player'); 
})

</script>
