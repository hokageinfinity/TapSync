export let audioCtx;
let source;
let startTime = 0;

export async function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    await audioCtx.resume();
}

export async function loadFromBuffer(arrayBuffer) {
    return await audioCtx.decodeAudioData(arrayBuffer);
}

export function play(buffer) {
    source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    startTime = audioCtx.currentTime;
    source.start();
}

export function getTime() {
    return audioCtx.currentTime - startTime;
}
