import { initAudio, loadFromBuffer, play, stop } from "./audioEngine.js";
import { saveSong, getSongs, loadSongData } from "./storage.js";
import { generateAutoMap } from "./beatmapEngine.js";
import { startTiming } from "./timingEngine.js";

/* =========================================
   MENU MUSIC SYSTEM
========================================= */

let menuMusicBuffer = null;
let menuMusicSource = null;

async function playMenuMusic() {
    await initAudio(); // iPhone unlock safeguard

    if (!menuMusicBuffer) {
        const response = await fetch("menu.mp3");
        const arrayBuffer = await response.arrayBuffer();
        menuMusicBuffer = await loadFromBuffer(arrayBuffer);
    }

    stop(); // stop any playing track
    menuMusicSource = play(menuMusicBuffer, true); // loop = true
}

/* =========================================
   SCREEN MANAGEMENT
========================================= */

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen =>
        screen.classList.remove("active")
    );
    document.getElementById(id).classList.add("active");
}

window.goToMenu = async function () {
    showScreen("mainMenu");
    await playMenuMusic();
};

/* =========================================
   UI ELEMENTS
========================================= */

const playBtn = document.getElementById("playBtn");
const libraryBtn = document.getElementById("libraryBtn");
const uploadBtn = document.getElementById("uploadBtn");
const musicInput = document.getElementById("musicInput");
const songList = document.getElementById("songList");

/* =========================================
   MAIN MENU BUTTONS
========================================= */

playBtn.onclick = async () => {
    await initAudio();
    await playMenuMusic();
    showScreen("libraryScreen");
    renderSongs();
};

libraryBtn.onclick = async () => {
    await initAudio();
    await playMenuMusic();
    showScreen("libraryScreen");
    renderSongs();
};

/* =========================================
   SONG UPLOAD SYSTEM
========================================= */

uploadBtn.onclick = () => musicInput.click();

musicInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    saveSong(file.name, arrayBuffer);
    renderSongs();
});

/* =========================================
   RENDER SONG LIBRARY
========================================= */

function renderSongs() {
    songList.innerHTML = "";

    const songs = getSongs();

    if (songs.length === 0) {
        const empty = document.createElement("p");
        empty.innerText = "No songs uploaded yet.";
        songList.appendChild(empty);
        return;
    }

    songs.forEach(name => {
        const btn = document.createElement("button");
        btn.innerText = name;

        btn.onclick = async () => {
            await initAudio();
            stop(); // stop menu music

            const buffer = await loadFromBuffer(loadSongData(name));

            generateAutoMap(buffer);
            play(buffer);
            startTiming();

            showScreen("gameScreen");
        };

        songList.appendChild(btn);
    });
}

/* =========================================
   START MENU MUSIC ON FIRST INTERACTION
========================================= */

document.addEventListener("click", async () => {
    if (!menuMusicBuffer) {
        await playMenuMusic();
    }
}, { once: true });
