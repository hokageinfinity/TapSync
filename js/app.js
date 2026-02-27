import { initAudio, loadFromBuffer, play } from "./audioEngine.js";
import { saveSong, getSongs, loadSongData } from "./storage.js";
import { generateAutoMap } from "./beatmapEngine.js";
import { startTiming } from "./timingEngine.js";

const playBtn = document.getElementById("playBtn");
const libraryBtn = document.getElementById("libraryBtn");
const uploadBtn = document.getElementById("uploadBtn");
const musicInput = document.getElementById("musicInput");

playBtn.onclick = async () => {
    await initAudio();
    showScreen("libraryScreen");
    renderSongs();
};

libraryBtn.onclick = () => {
    showScreen("libraryScreen");
    renderSongs();
};

uploadBtn.onclick = () => musicInput.click();

musicInput.addEventListener("change", async e => {
    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    saveSong(file.name, buffer);
    renderSongs();
});

function renderSongs() {
    const list = document.getElementById("songList");
    list.innerHTML = "";

    getSongs().forEach(name => {
        const btn = document.createElement("button");
        btn.innerText = name;
        btn.onclick = async () => {
            await initAudio();
            const buffer = await loadFromBuffer(loadSongData(name));
            generateAutoMap(buffer);
            play(buffer);
            startTiming();
            showScreen("gameScreen");
        };
        list.appendChild(btn);
    });
}

function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

window.goToMenu = () => showScreen("mainMenu");
