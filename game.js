const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let activeNotes = [];

function spawnNotes() {
let currentTime = getSongTime() * 1000;

beatmap.forEach(note => {
if (!note.spawned && currentTime >= note.time - 1000) {
activeNotes.push(note);
note.spawned = true;
}
});
}

function render() {
ctx.clearRect(0, 0, canvas.width, canvas.height);

let currentTime = getSongTime() * 1000;

activeNotes.forEach(note => {
let timeDiff = note.time - currentTime;
let approach = timeDiff / 1000;

ctx.beginPath();
ctx.arc(note.x, note.y, 50, 0, Math.PI * 2);
ctx.strokeStyle = "cyan";
ctx.lineWidth = 4;
ctx.stroke();

ctx.beginPath();
ctx.arc(note.x, note.y, 50 + (approach * 100), 0, Math.PI * 2);
ctx.strokeStyle = "white";
ctx.stroke();
});

requestAnimationFrame(render);
}

canvas.addEventListener("touchstart", e => {
let touch = e.touches[0];
let rect = canvas.getBoundingClientRect();
let x = touch.clientX - rect.left;
let y = touch.clientY - rect.top;

let currentTime = getSongTime() * 1000;

activeNotes.forEach((note, index) => {
let dx = x - note.x;
let dy = y - note.y;
let dist = Math.sqrt(dx * dx + dy * dy);

if (dist < 50) {
judgeHit(note.time, currentTime);
activeNotes.splice(index, 1);
}
});
});

function gameLoop() {
spawnNotes();
requestAnimationFrame(gameLoop);
}

gameLoop();
render();

document.getElementById("loadBtn").addEventListener("click", () => {
    document.getElementById("musicInput").addEventListener("change", async function(e) {
    if (!e.target.files[0]) return;

    // Force AudioContext inside user gesture
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    await audioCtx.resume();

    const arrayBuffer = await e.target.files[0].arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    currentSource = audioCtx.createBufferSource();
    currentSource.buffer = audioBuffer;
    currentSource.connect(audioCtx.destination);

    songStartTime = audioCtx.currentTime;
    currentSource.start(0);
});
