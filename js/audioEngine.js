window.AudioContext = window.AudioContext || window.webkitAudioContext;

let audioCtx = null;
let audioBuffer = null;
let currentSource = null;
let songStartTime = 0;

async function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }
}

async function loadAudioFile(file) {
    await initAudio();
    const arrayBuffer = await file.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
}

function startSong() {
    if (!audioBuffer) return;

    currentSource = audioCtx.createBufferSource();
    currentSource.buffer = audioBuffer;
    currentSource.connect(audioCtx.destination);

    songStartTime = audioCtx.currentTime;
    currentSource.start(0);
}

function getCurrentSongTime() {
    if (!audioCtx) return 0;
    return (audioCtx.currentTime - songStartTime) * 1000;
}
