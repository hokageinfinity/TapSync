import { loadSong, playSong, audioBuffer } from "./audioEngine.js";
import { generateAutoMap } from "./beatmapEngine.js";
import { startTiming } from "./timingEngine.js";

const loadBtn = document.getElementById("loadBtn");
const musicInput = document.getElementById("musicInput");

loadBtn.onclick = () => musicInput.click();

musicInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await loadSong(file);
    generateAutoMap(audioBuffer);
    playSong();
    startTiming();
});
