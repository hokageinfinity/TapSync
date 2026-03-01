import { initAudio, loadFromBuffer, play, stop } from "./audioEngine.js";
import { saveSong, getSongs, loadSongData } from "./storage.js";
import { generateAutoMap } from "./beatmapEngine.js";
import { startTiming } from "./timingEngine.js";

window.addEventListener("DOMContentLoaded", () => {

    const mainMenu = document.getElementById("mainMenu");
    const libraryScreen = document.getElementById("libraryScreen");
    const gameScreen = document.getElementById("gameScreen");

    const playBtn = document.getElementById("playBtn");
    const libraryBtn = document.getElementById("libraryBtn");
    const uploadBtn = document.getElementById("uploadBtn");
    const backBtn = document.getElementById("backToMenuBtn");
    const musicInput = document.getElementById("musicInput");
    const songList = document.getElementById("songList");

    function show(screen) {
        mainMenu.classList.remove("active");
        libraryScreen.classList.remove("active");
        gameScreen.classList.remove("active");
        screen.classList.add("active");
    }

    /* =====================
       NAVIGATION
    ===================== */

    playBtn.addEventListener("click", async () => {
        await initAudio();
        show(libraryScreen);
        renderSongs();
    });

    libraryBtn.addEventListener("click", async () => {
        await initAudio();
        show(libraryScreen);
        renderSongs();
    });

    backBtn.addEventListener("click", () => {
        show(mainMenu);
    });

    /* =====================
       UPLOAD SONG
    ===================== */

    uploadBtn.addEventListener("click", () => {
        musicInput.click();
    });

    musicInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const buffer = await file.arrayBuffer();
        saveSong(file.name, buffer);
        renderSongs();
    });

    /* =====================
       SONG LIBRARY
    ===================== */

    function renderSongs() {
        songList.innerHTML = "";

        const songs = getSongs();

        if (songs.length === 0) {
            const p = document.createElement("p");
            p.innerText = "No songs uploaded yet.";
            songList.appendChild(p);
            return;
        }

        songs.forEach(name => {
            const btn = document.createElement("button");
            btn.innerText = name;

            btn.addEventListener("click", async () => {
                await initAudio();
                stop();

                const buffer = await loadFromBuffer(loadSongData(name));

                generateAutoMap(buffer);
                play(buffer);
                startTiming();

                show(gameScreen);
            });

            songList.appendChild(btn);
        });
    }

});
