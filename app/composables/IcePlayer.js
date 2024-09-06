"use strict";

class IcePlayer {
    constructor(el, init_params) {
        if (el.length === 0) throw new Error('Player element not found!');

        this.localStorage = window.localStorage;

        // Player Params
        this.server_address = 'https://omfm.ru:8443/' // Default address:port
        this.stream_mount = (this.localStorage.getItem("stream_name") !== null) ? this.localStorage.getItem("stream_name") : 'stream'
        this.style = 'fixed' // Player style (fixed or inline)
        this.template = '<div class="ice-player-el "><div><i class="ice-play" style="display: inline-block;font-size:1.6rem !important" ></i><i class="ice-pause"  ></i><i class="ice-stop"  ></i><a id="show_volume_xs" class=" sm:hidden speaker_as_icon"><span></span></a></div><a class="mute speaker ml-1" title="mute/unmute"><span></span></a><input class="ice-volume hidden sm:inline-flex " type="range" min="0" max="100" value="70" step="1"><div class="vol_value hidden sm:inline-flex ms-2" style="font-family: monospace;position: fixed;left: 107px;pointer-events: none;color:grey;font-decoration:bold; text-shadow:none">70%</div><div class="vol_value2 hidden ">70%</div><input id="ice_volume_vertical" class="volume-vertical inline-flex  sm:hidden" type="range" min="0" max="100" value="70" step="1"><img class="ms-3 ml-3" id="live" src="/live.gif" style=" opacity:1;display:inline-flex;"><div style="flex-grow: 1;flex-shrink: 1;flex-basis: 0%;min-width: 0;"><span class="ms-3 ice-track ellipsify" id="trackname" style="opacity:1;"></span></div></div>'
        
        // Informer Params
        // this.mounts_list = ['stream', 'nonstop'] // Mount point list
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
        // if (typeof init_params === 'object') {
        //     const init_params_list = Object.keys(init_params).filter(param => ['server_address', 'stream_mount', 'style', 'template', 'mounts_list', 'info_link', 'time_update'].includes(param));
        //     for (let parameter of init_params_list) {
        //         this[parameter] = init_params[parameter];
        //     }
        // }

        this.player_el = document.querySelector(el);
        this.player_el.classList.add('ice-player', this.style);
        // this.set_content(this.player_el, this.template);

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

        this.get_element('.volume-vertical').addEventListener('click', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('mousemove', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('touchmove', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('touchstart', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('touchend', () => {this.change_volume2()});
        this.get_element('.volume-vertical').addEventListener('touchcancel', () => {this.change_volume2()});
       
        this.get_element('.ice-volume').addEventListener('input', (event) => {this.change_volume_text()});
        this.get_element('.volume-vertical').addEventListener('input', (event) => {this.change_volume_text()});

       
        this.get_element('.mute').addEventListener('click', () => {this.mute()});
        //this.get_element('#show_volume_xs').addEventListener('click', () => {this.vol_btn_main()});
        this.get_element('#show_volume_xs').addEventListener('click', () => {this.vol_btn_main()});
        this.get_element('#show_volume_xs').addEventListener('mouseenter', () => {this.vol_btn_main_hover()});

        //document.getElementById('ice-volume3_Btn').addEventListener('hover', () => { this.vol_btn_main_3()});
        //document.getElementById('ice-volume3_Btn').addEventListener('mouseenter', () => { this.vol_btn_main_3()});
        const vertical_player_header = document.getElementById("ice-volume3");
        const vol_3_button = document.getElementById("ice-volume3_Btn");
        let timeoutId;

        // Feature detection for touch
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) {
        // Show header on touchstart
        vol_3_button.addEventListener('touchstart', () => {
        vertical_player_header.classList.add('open_volume');
        clearTimeout(timeoutId);
        });
        vertical_player_header.addEventListener('touchstart', () => {
            clearTimeout(timeoutId);
        });
        // Handle touchend for hiding (with delay)
        vol_3_button.addEventListener('touchend', () => {
        timeoutId = setTimeout(() => {
        vertical_player_header.classList.remove('open_volume'); 
        }, 2000); 
        }); 
        vertical_player_header.addEventListener('touchend', () => {
            timeoutId = setTimeout(() => {
            vertical_player_header.classList.remove('open_volume'); 
            }, 2000);
        }); // Add once: true to prevent multiple listeners
        

        } else {
        vol_3_button.addEventListener('mouseenter', () => {
            vertical_player_header.classList.add("open_volume");
            clearTimeout(timeoutId);
          });
        //document.getElementById("ice-volume3_Mute").classList.toggle("open_volume");
        vertical_player_header.addEventListener('mouseleave', e => {
            timeoutId = setTimeout(() => {
                    vertical_player_header.classList.remove('open_volume');
                }, 1200); 
         });
        vertical_player_header.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
        });
        // Mouseleave on button
        vol_3_button.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
            vertical_player_header.classList.remove('open_volume');
            }, 1200); // 2000 milliseconds = 2 seconds
        });
        }

        this.get_element('.ice-volume').addEventListener('click', () => {this.unmute_onclick()});
        this.get_element('.volume-vertical').addEventListener('click', () => {this.unmute_onclick2()});

        this.get_element('.volume-vertical').addEventListener('touchstart', () => {this.unmute_onclick2()});
        this.get_element('.ice-volume').addEventListener('touchstart', () => {this.unmute_onclick()});

        document.getElementById("ice-volume3").addEventListener('click', () => {this.unmute_onclick3()});
        document.getElementById("ice-volume3").addEventListener('touchstart', () => {this.unmute_onclick3()});



        window.addEventListener('load', () => {this.change_volume_bar()});
        window.addEventListener('load', () => {this.change_volume_bar2()});

        document.addEventListener('click', e => {
        if (!this.get_element("#ice_volume_vertical").contains(e.target) && !this.get_element(".speaker").contains(e.target) && ! this.get_element('#show_volume_xs').contains(e.target) ) {
             this.get_element("#ice_volume_vertical").classList.remove('open_volume');
        this.get_element(".speaker").classList.remove('open_volume');
        }

         });
        // Hide Header Vertical Vol if cliked outside
        // document.addEventListener('click', e => {
        //     const vertical_player_header = document.getElementById("ice-volume3")
        //     const vertical_player_header_Btn = document.getElementById("ice-volume3_Btn");
        //     const vertical_player_header_Btn_Mute = document.getElementById("ice-volume3_Mute");
        //     if (!vertical_player_header.contains(e.target) && !vertical_player_header_Btn.contains(e.target) && !vertical_player_header_Btn_Mute.contains(e.target) ) {
        //         vertical_player_header.classList.remove('open_volume');
        //         //vertical_player_header_Btn_Mute.classList.remove('open_volume');
        //     }
        //      });

        this.audio_object.addEventListener('play', () => {
            this.current_state = this.PLAYING;
            this.play_pause_toggle();
        });
        this.audio_object.addEventListener('pause', () => {
            this.current_state = this.PAUSED;
            this.play_pause_toggle();
        });

      // Set the volume when the player is initialized
      const volValue = this.audio_object.volume * 100;
      this.get_element(".ice-volume").value = volValue;
      this.get_element(".volume-vertical").value = volValue;
      document.getElementById("ice-volume3").value = this.audio_object.volume * 100;

      this.get_element(".ice-volume").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${volValue}%,  rgba(75, 75, 75, 1) ${volValue}%)`;
      this.get_element(".volume-vertical").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${volValue}%,  rgba(75, 75, 75, 1) ${volValue}%)`;
      document.getElementById("ice-volume3").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${volValue}%,  rgba(75, 75, 75, 1) ${volValue}%)`;

      this.get_element(".vol_value").textContent = Math.round(volValue) + "%";
      this.get_element(".vol_value2").textContent = Math.round(volValue) + "%";
      if (this.audio_object.volume === 0) {
         this.get_element('.speaker').classList.add("muted");
         document.getElementById("ice-volume3_Mute").classList.add("muted");
      }
      this.hide_opacity('#live')
      this.hide_opacity('#vl')
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
        const playBtnPlayer = document.getElementById("playBtnPlayer");
        playBtnPlayer.style.display = "none";
        const stopBtnPlayer = document.getElementById("stopBtnPlayer");
        stopBtnPlayer.style.display = "inline-flex";

        
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
        const playBtnPlayer = document.getElementById("playBtnPlayer");
        playBtnPlayer.style.display = "inline-flex";
        const stopBtnPlayer = document.getElementById("stopBtnPlayer");
        stopBtnPlayer.style.display = "none";
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
        const playBtnPlayer = document.getElementById("playBtnPlayer");
        playBtnPlayer.style.display = "inline-flex";
        const stopBtnPlayer = document.getElementById("stopBtnPlayer");
        stopBtnPlayer.style.display = "none";
    }
    change_stream_rock() {

    if (this.stream_mount !== 'rock') {
        if (this.current_state === this.PLAYING) {
        this.stream_mount = 'rock';
        this.stop();
        this.play();
        this.localStorage.setItem("stream_name", this.stream_mount);
        } else {
        this.stream_mount = 'rock';
        this.stop();
        this.localStorage.setItem("stream_name", this.stream_mount);
        }
    }

    }
    change_stream_coma() {
    if (this.stream_mount !== 'coma') {
        if (this.current_state === this.PLAYING) {
        this.stream_mount = 'coma';
        this.stop();
        this.play();
        this.localStorage.setItem("stream_name", this.stream_mount);
        } else {
        this.stream_mount = 'coma';
        this.stop();
        this.localStorage.setItem("stream_name", this.stream_mount);
        }
    }
    }
    change_stream_omfm() {
        if (this.stream_mount !== 'stream') {
            if (this.current_state === this.PLAYING) {
            this.stream_mount = 'stream';
            this.stop();
            this.play();
            this.localStorage.setItem("stream_name", this.stream_mount);
            } else {
            this.stream_mount = 'stream';
            this.stop();
            this.localStorage.setItem("stream_name", this.stream_mount);
            }
        }
    }
    hide_stop_and_mute_button() {
        // const playBtnPlayer1 = document.getElementById("playBtnPlayer1");
        // playBtnPlayer1.style.display = "inline-flex";
        const stopBtnPlayer1 = document.getElementById("stopBtnPlayer1");
        stopBtnPlayer1.style.display = "none"; 
        const stopBtnPlayer = document.getElementById("stopBtnPlayer");
        stopBtnPlayer.style.display = "none";
        // const mute_btn_header_Muted = document.getElementById("ice-volume3_Muted");
        // mute_btn_header_Muted.style.display = "none";
    }

    change_volume() {
        if (this.audio_object.muted === false)  {
        this.audio_object.volume = this.get_element('.ice-volume').value / 100;
        this.get_element('.volume-vertical').value  = this.get_element('.ice-volume').value;
        document.getElementById("ice-volume3").value = this.audio_object.volume * 100;

      }
        if (this.audio_object.volume === 0. || this.audio_object.muted === true) {
       
         this.get_element('.speaker').classList.add("muted");
         document.getElementById("ice-volume3_Mute").classList.add("muted");
         } else if (this.audio_object.volume > 0.0 && this.audio_object.muted === false)   {
         
         this.get_element('.speaker').classList.remove("muted");
         document.getElementById("ice-volume3_Mute").classList.remove("muted");
         }   
         
        
        this.localStorage.setItem("vol", this.audio_object.volume);
        this.change_volume_bar();
        this.change_volume_bar2();
        this.change_volume_bar3();
        this.change_volume_text();     
    }
    change_volume2() {
        if (this.audio_object.muted === false)  {
        this.audio_object.volume = this.get_element('.volume-vertical').value / 100;
        this.get_element('.ice-volume').value = this.get_element('.volume-vertical').value;
        document.getElementById("ice-volume3").value = this.audio_object.volume * 100;


    }
        if (this.audio_object.volume === 0. || this.audio_object.muted === true) {
         this.get_element('.speaker').classList.add("muted");
         document.getElementById("ice-volume3_Mute").classList.add("muted");
         } else if (this.audio_object.volume > 0.0 && this.audio_object.muted === false)   {
         this.get_element('.speaker').classList.remove("muted");
         document.getElementById("ice-volume3_Mute").classList.remove("muted");
         }  

        this.localStorage.setItem("vol", this.audio_object.volume);
        this.change_volume_bar();
        this.change_volume_text();
        this.change_volume_bar2();
        this.change_volume_bar3();
        
    }
    change_volume3() {
        this.audio_object.volume = document.getElementById("ice-volume3").value / 100;
        this.localStorage.setItem("vol", this.audio_object.volume);
        this.get_element('.ice-volume').value = this.audio_object.volume * 100;
        this.get_element('.volume-vertical').value  = this.get_element('.ice-volume').value;

        if (this.audio_object.muted === false)  {
            this.audio_object.volume = document.getElementById("ice-volume3").value / 100;
            this.get_element('.ice-volume').value = this.audio_object.volume * 100;
            this.get_element('.volume-vertical').value  = this.get_element('.ice-volume').value;
    
    
        }
            if (this.audio_object.volume === 0. || this.audio_object.muted === true) {
             this.get_element('.speaker').classList.add("muted");
             document.getElementById("ice-volume3_Mute").classList.add("muted");
             } else if (this.audio_object.volume > 0.0 && this.audio_object.muted === false)   {
             this.get_element('.speaker').classList.remove("muted");
             document.getElementById("ice-volume3_Mute").classList.remove("muted");
             }  
    
            this.localStorage.setItem("vol", this.audio_object.volume);
            this.change_volume_bar();
            this.change_volume_text();
            this.change_volume_bar2();
            this.change_volume_bar3();
    }
    vol_btn_main_3() {
        document.getElementById("ice-volume3").classList.add("open_volume");
        const button = document.getElementById("ice-volume3_Btn");
        let timeoutId;

        // Feature detection for touch
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        
        //document.getElementById("ice-volume3_Mute").classList.toggle("open_volume");
        const vertical_player_header = document.getElementById("ice-volume3")
        vertical_player_header.addEventListener('mouseleave', e => {
            timeoutId = setTimeout(() => {
                    vertical_player_header.classList.remove('open_volume');
                }, 1200); 
         });
        vertical_player_header.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
           });
           // Mouseenter on button
        button.addEventListener('mouseenter', () => {
         clearTimeout(timeoutId);
        });

         // Mouseleave on button
         button.addEventListener('mouseleave', () => {
         timeoutId = setTimeout(() => {
        vertical_player_header.classList.remove('open_volume');
        }, 1200); // 2000 milliseconds = 2 seconds
         });
    }
    unmute_onclick(){
        if (this.audio_object.volume >= 0. && this.audio_object.muted === true) {
        this.audio_object.volume = this.get_element('.ice-volume').value / 100;
    
        this.localStorage.setItem("vol", this.audio_object.volume);

        this.mute();
        }
    }
     unmute_onclick2(){
        if (this.audio_object.volume >= 0. && this.audio_object.muted === true) {
        this.audio_object.volume = this.get_element('.volume-vertical').value / 100;
    
        this.localStorage.setItem("vol", this.audio_object.volume);

        this.mute();
        }
    }
    unmute_onclick3(){
        if (this.audio_object.volume >= 0. && this.audio_object.muted === true) {
        this.audio_object.volume = document.getElementById("ice-volume3").value / 100;

    
        this.localStorage.setItem("vol", this.audio_object.volume);

        this.mute();
        }
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
    xhttp.open('GET', 'https://stream.omfm.ru/status-json.xsl?mount=/' + this.stream_mount + '&' + d.getTime(), true);
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
            // this.hide('.ice-play');
            // this.show('.ice-pause');
            this.show_opacity('#live')
            this.show_opacity('#vl')
            document.querySelector(".ice-track").style.visibility = "visible"
        } else {
            // this.hide('.ice-pause');
            // this.show('.ice-play');
            this.hide_opacity('#live')
            this.hide_opacity('#vl')
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
    hide_opacity(el) {
        this.get_element(el).style.opacity = '0';
    }
    show_opacity(el) {
        this.get_element(el).style.opacity = '1';
    }
    show(el) {
        this.get_element(el).style.display = 'inline-block';
    }

    change_volume_bar() {
        if (this.audio_object.muted === false)  {
        const sliderValue = document.querySelector(".ice-volume").value;
        document.querySelector(".ice-volume").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${sliderValue}%,  rgba(75, 75, 75, 1) ${sliderValue}%)`;
        document.querySelector(".volume-vertical").style.background = `linear-gradient(to right,rgba(230, 230, 230, 1) ${sliderValue}%, rgba(75, 75, 75, 1) ${sliderValue}%)`;
        document.getElementById("ice-volume3").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${sliderValue}%,  rgba(75, 75, 75, 1) ${sliderValue}%)`;
        }
         // this.change_volume_text();
   }
   change_volume_bar2() {
       if (this.audio_object.muted === false)  {
       const sliderValue = document.querySelector(".volume-vertical").value;
       document.querySelector(".volume-vertical").style.background = `linear-gradient(to right,rgba(230, 230, 230, 1) ${sliderValue}%, rgba(75, 75, 75, 1) ${sliderValue}%)`;
       document.querySelector(".ice-volume").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${sliderValue}%,  rgba(75, 75, 75, 1) ${sliderValue}%)`;
       document.getElementById("ice-volume3").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${sliderValue}%,  rgba(75, 75, 75, 1) ${sliderValue}%)`;

    }
   }
   change_volume_bar3() {
    if (this.audio_object.muted === false)  {
    const sliderValue = document.getElementById("ice-volume3");
    document.querySelector(".volume-vertical").style.background = `linear-gradient(to right,rgba(230, 230, 230, 1) ${sliderValue}%, rgba(75, 75, 75, 1) ${sliderValue}%)`;
    document.querySelector(".ice-volume").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${sliderValue}%,  rgba(75, 75, 75, 1) ${sliderValue}%)`;
    document.getElementById("ice-volume3").style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${sliderValue}%,  rgba(75, 75, 75, 1) ${sliderValue}%)`;

 }
}
   change_volume_text() {

       const sliderEl = document.querySelector(".ice-volume");
       const sliderEl_2 = document.querySelector(".volume-vertical");
       const sliderEl_3 = document.getElementById("ice-volume3")
       const volValue = document.querySelector(".vol_value");
       const volValue2 = document.querySelector(".vol_value2");


       const tempSliderValue = event.target.value;
       if (this.audio_object.muted === false)  {
       volValue.textContent = tempSliderValue + "%";
       volValue2.textContent = tempSliderValue + "%";
   }

       const progress = (tempSliderValue / sliderEl.max) * 100;

if (this.audio_object.muted === false)  {
       sliderEl.style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${progress}%,  rgba(75, 75, 75, 1) ${progress}%)`;
       sliderEl_2.style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${progress}%, rgba(75, 75, 75, 1) ${progress}%)`;
       sliderEl_3.style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${progress}%, rgba(75, 75, 75, 1) ${progress}%)`;


}

    }

    mute() {
        
        this.audio_object.muted = !this.audio_object.muted;
        


         if (this.audio_object.muted === true)  {
        const sliderEl = document.querySelector(".ice-volume");
        const sliderEl_2 = document.querySelector(".volume-vertical");
        const sliderEl_3 = document.getElementById("ice-volume3")
        const volValue = document.querySelector(".vol_value");
        const volValue2 = document.querySelector(".vol_value2");
        const tempSliderValue = document.querySelector(".ice-volume").value;
        volValue.textContent = "";
        volValue2.textContent = "";

        const progress = (tempSliderValue / sliderEl.max) * 100;
        sliderEl.value = 0;
        sliderEl_2.value = 0;
        sliderEl_3.value = 0;
        sliderEl.style.background = `linear-gradient(to right, rgba(75, 75, 75, 1) 0%,  rgba(75, 75, 75, 1) 100%)`;
        sliderEl_2.style.background = `linear-gradient(to right, rgba(75, 75, 75, 1) 0%, rgba(75, 75, 75, 1) 100%)`;
        sliderEl_3.style.background = `linear-gradient(to right, rgba(75, 75, 75, 1) 0%, rgba(75, 75, 75, 1) 100%)`;

         this.get_element('.speaker').classList.add("muted");
         document.getElementById("ice-volume3_Mute").classList.add("muted");

        //  const mute_btn_header_Unmuted = document.getElementById("ice-volume3_Unmuted");
        //  mute_btn_header_Unmuted.style.display = "none";
        //  const mute_btn_header_Muted = document.getElementById("ice-volume3_Muted");
        //  mute_btn_header_Muted.style.display = "inline-flex";

         } else  {
         this.get_element('.speaker').classList.remove("muted");
         document.getElementById("ice-volume3_Mute").classList.remove("muted");
        const sliderEl = document.querySelector(".ice-volume");
        const sliderEl_2 = document.querySelector(".volume-vertical");
        const sliderEl_3 = document.getElementById("ice-volume3")
        const volValue = document.querySelector(".vol_value");
        const volValue2 = document.querySelector(".vol_value2");
        sliderEl.value = this.audio_object.volume * 100;
        sliderEl_2.value = this.audio_object.volume * 100;
        sliderEl_3.value = this.audio_object.volume * 100;


        const tempSliderValue = document.querySelector(".ice-volume").value;
        volValue.textContent = tempSliderValue + "%";
        volValue2.textContent = tempSliderValue + "%";

        const progress = (tempSliderValue / sliderEl.max) * 100;

        sliderEl.style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${progress}%,  rgba(75, 75, 75, 1) ${progress}%)`;
        sliderEl_2.style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${progress}%, rgba(75, 75, 75, 1) ${progress}%)`;
        sliderEl_3.style.background = `linear-gradient(to right, rgba(230, 230, 230, 1) ${progress}%, rgba(75, 75, 75, 1) ${progress}%)`;
        
        // const mute_btn_header_Unmuted = document.getElementById("ice-volume3_Unmuted");
        // mute_btn_header_Unmuted.style.display = "inline-flex";
        // const mute_btn_header_Muted = document.getElementById("ice-volume3_Muted");
        // mute_btn_header_Muted.style.display = "none";

        }

    }

   vol_btn_main() {
       this.get_element("#ice_volume_vertical").classList.toggle("open_volume");
       this.get_element(".speaker").classList.toggle('open_volume');
   }
   vol_btn_main_hover() {
      
       this.get_element("#ice_volume_vertical").classList.add('open_volume');
       this.get_element(".speaker").classList.add('open_volume');
   }
};

export default IcePlayer;