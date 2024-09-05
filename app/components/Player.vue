<template>
    

    <div  class="icecast_player " id="ice-player" style="z-index:999; display: flex; transform: translateY(100%); ">
        <div class="ice-player-el ">
            <div>
                <i class="ice-play" @click="playStatus" style="display: inline-block;font-size:1.6rem !important" ></i>
                <i class="ice-pause"  @click="pausePlayer1" ></i>
                <i class="ice-stop"  @click="stopPlayer1"></i>
                <a id="show_volume_xs" class=" sm:hidden speaker_as_icon"><span></span></a>
            </div>
            <a class="mute speaker ml-1" title="mute/unmute"><span></span></a>
            <input class="ice-volume hidden sm:inline-flex " type="range" min="0" max="100" value="70" step="1">
            <div class="vol_value hidden sm:inline-flex ms-2" style="font-family: monospace;position: fixed;left: 107px;pointer-events: none;color:grey;font-decoration:bold; text-shadow:none">70%</div>
            <div class="vol_value2 hidden ">70%</div>
            <input id="ice_volume_vertical" class="volume-vertical inline-flex  sm:hidden" type="range" min="0" max="100" value="70" step="1">
            <img class="ms-3 ml-3 hidden sm:inline-flex" id="live" src="/live.gif">
            <div id="vl" class="me-2 ms-3 sm:ms-5" style="border-left: 0.5px solid white;height:40px;box-shadow:0 0 10px #ff9d41; "></div>
            <div style="flex-grow: 1;flex-shrink: 1;flex-basis: 0%;min-width: 0;">
                <span class="ms-3 ice-track ellipsify" id="trackname" style="opacity:1;"></span>
            </div>
        </div>
        
    </div>
    

</template>

<script setup>
import { usePlayer } from '../composables/player'; // Create this composable
const { player, togglePlay, playStatus, playPlayer1, stopPlayer1, pausePlayer1, changeVol3, showVol3, muteVol3, setStream1, setStream2, setStream3 } = usePlayer(); // Get player instance and state

//import IcePlayer from '../composables/IcePlayer.js'; // Import the class
// onMounted(() => {
// /*
//  IcePlayer v.3.0.0 - Player for Site (Icecast2 Online Radio)
//  Copyright (c) 2016-2020 Andrew Molchanov
//  https://github.com/JoCat/IcePlayer
// */

// new IcePlayer('#ice-player'); 
// })



</script>
