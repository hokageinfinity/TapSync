window.AudioContext = window.AudioContext || window.webkitAudioContext;

let audioCtx;
let audioBuffer;
let songStartTime = 0;
let offset = 0; // player calibration

async function loadSong(file) {
audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const arrayBuffer = await file.arrayBuffer();
audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
}

function playSong() {
if (!audioCtx) return;

const source = audioCtx.createBufferSource();
source.buffer = audioBuffer;
source.connect(audioCtx.destination);

songStartTime = audioCtx.currentTime;
source.start(0);
}

function getSongTime() {
return audioCtx.currentTime - songStartTime - offset;
}