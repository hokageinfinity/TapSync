export let audioCtx;
export let audioBuffer;
let songStartTime = 0;

export async function loadSong(file) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await file.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
}

export function playSong() {
    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    songStartTime = audioCtx.currentTime;
    source.start();
}

export function getSongTime() {
    return audioCtx.currentTime - songStartTime;
}
