window.AudioContext = window.AudioContext || window.webkitAudioContext;

let audioCtx;
let audioBuffer;
let songStartTime = 0;
let offset = 0;
let currentSource = null;

async function loadSong(file) {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }

    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }

    const arrayBuffer = await file.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
}

async function playSong() {
    if (!audioBuffer) return;

    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }

    currentSource = audioCtx.createBufferSource();
    currentSource.buffer = audioBuffer;
    currentSource.connect(audioCtx.destination);

    songStartTime = audioCtx.currentTime;
    currentSource.start(0);
}

function getSongTime() {
    if (!audioCtx) return 0;
    return audioCtx.currentTime - songStartTime - offset;
}
