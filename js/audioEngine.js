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

export function play(buffer, loop = false) {
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
    source.connect(audioCtx.destination);
    source.start(0);
    return source;
}

export function getTime() {
    return audioCtx.currentTime - startTime;
}

export function stop() {
    if (audioCtx) {
        audioCtx.close();
        audioCtx = null;
    }
}
