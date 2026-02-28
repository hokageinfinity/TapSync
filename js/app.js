import { initAudio, loadFromBuffer, play, stop } from "./audioEngine.js";
import { saveSong, getSongs, loadSongData } from "./storage.js";
import { generateAutoMap } from "./beatmapEngine.js";
import { startTiming } from "./timingEngine.js";

/* ==============================
   SCREEN MANAGEMENT
============================== */

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(id);
    if (target) target.classList.add("active");
}

/* ==============================
   WAIT FOR DOM TO LOAD
============================== */

window.addEventListener("DOMContentLoaded", () => {

    const playBtn = document.getElementById("playBtn");
    const libraryBtn = document.getElementById("libraryBtn");
    const uploadBtn = document.getElementById("uploadBtn");
    const musicInput = document.getElementById("musicInput");
    const songList = document.getElementById("songList");

    /* ==============================
       NAVIGATION BUTTONS
    ============================== */

    playBtn.onclick = async () => {
        await initAudio();
        showScreen("libraryScreen");
        renderSongs();
    };

    libraryBtn.onclick = async () => {
        await initAudio();
        showScreen("libraryScreen");
        renderSongs();
    };

    /* ==============================
       UPLOAD SONG
    ============================== */

    uploadBtn.onclick = () => {
        musicInput.click();
    };

    musicInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const buffer = await file.arrayBuffer();
        saveSong(file.name, buffer);
        renderSongs();
    });

    /* ==============================
       RENDER SONG LIBRARY
    ============================== */

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
                stop();

                const buffer = await loadFromBuffer(loadSongData(name));

                generateAutoMap(buffer);
                play(buffer);
                startTiming();

                showScreen("gameScreen");
            };

            songList.appendChild(btn);
        });
    }

});
