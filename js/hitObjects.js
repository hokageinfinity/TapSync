const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function update() {
    const currentTime = getCurrentSongTime();

    currentBeatmap.hitObjects.forEach(note => {
        if (!note.hit && currentTime > note.time + 150) {
            note.hit = true;
            register("miss");
        }
    });
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const currentTime = getCurrentSongTime();

    currentBeatmap.hitObjects.forEach(note => {
        if (note.hit) return;

        const diff = note.time - currentTime;
        if (diff > 1000) return;

        ctx.beginPath();
        ctx.arc(note.x, note.y, 50, 0, Math.PI * 2);
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 4;
        ctx.stroke();
    });
}

canvas.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    currentBeatmap.hitObjects.forEach(note => {
        if (note.hit) return;

        const dx = x - note.x;
        const dy = y - note.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 50) {
            judge(note.time);
            note.hit = true;
        }
    });
});
