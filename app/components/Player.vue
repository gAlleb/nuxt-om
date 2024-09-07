<template>
    

    <div  class="icecast_player bg-sxvx-dark-bg dark:bg-sxvx-dark " id="ice-player" style="z-index:30; display: flex; transform: translateY(100%); ">
        <div class="ice-player-el ">
            <div>
                <!-- <i class="ice-play hidden" @click="playStatus" style="display: inline-block;font-size:1.6rem !important" ></i> -->
                <i class="ice-play hidden" @click="playStatus" style="font-size:1.6rem !important" ></i>
                <i class="ice-pause hidden"  @click="pausePlayer1" ></i>
                <i class="ice-stop hidden"  @click="stopPlayer1"></i>

                <button style="padding: 8px;" class="flex rounded-xl transitio-all duration-500 ease-in-out   text-sm focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800 " @click="togglePlayAll"  >     
                    <Icon id="playBtnPlayer" name="heroicons-solid:play" class="h-6 w-6 bg-green-500" aria-hidden="true" />
                    <Icon id="stopBtnPlayer" name="heroicons-solid:stop" class="h-6 w-6 bg-red-500" aria-hidden="true" />
                </button>
                <!-- <a id="show_volume_xs" class=" sm:hidden speaker_as_icon"><span></span></a> -->
            </div>
            <div class="relative">
            <button id="mainVolumeBtn" style="padding: 5px;top: -20px;" class="absolute ml-2 inline-flex  items-center  rounded-xl transitio-all duration-500 ease-in-out text-sm focus:outline-none bg-sxvx-dark dark:bg-sxvx-dark-bg focus:ring-white focus:ring-2  focus:ring-offset focus:ring-offset-gray-800"  >     
                    <a id="show_volume_xs" class=" mute  speaker  " title="mute/unmute"  ><span></span></a>
                    <input class="ice-volume hidden sm:inline-flex " type="range" min="0" max="100" value="70" step="1">
                    <div id="vol_value" class="vol_value hidden sm:inline-flex ms-2" style="font-family: monospace;position: fixed;left: 92px;pointer-events: none;color:grey;font-decoration:bold; text-shadow:none">70%</div>
            </button>
            </div>

            <div class="vol_value2 hidden ">70%</div>
            <input id="ice_volume_vertical" class="volume-vertical inline-flex  hidden" type="range" min="0" max="100" value="70" step="1">
            
            <img class="ms-14 ml-3 hidden sm:inline-flex" id="live" src="/live.gif">
            <div id="vl" class="me-3 ms-14 sm:ms-3" style="border-left: 0.5px solid white;height:40px;box-shadow:0 0 10px #ff9d41; "></div>
            <div style="flex-grow: 1;flex-shrink: 1;flex-basis: 0%;min-width: 0;">
                <span class="ice-track ellipsify" id="trackname" style="opacity:1;"></span>
            </div>
        </div>
        
    </div>
    

</template>

<script setup>
import { initPlayerStore } from '@/stores/initPlayer'; // Import the store
const useInitPlayerStore = initPlayerStore(); // Get the store instance
 

import { usePlayer } from '../composables/player'; // Create this composable
const { player, isPlaying, togglePlayAll, playStatus, playPlayer1, stopPlayer1, pausePlayer1, changeVol3, showVol3, muteVol3, setStream1, setStream2, setStream3 } = usePlayer(); // Get player instance and state


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
