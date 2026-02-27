document.getElementById("loadBtn").addEventListener("click", () => {
    document.getElementById("musicInput").click();
});

document.getElementById("musicInput").addEventListener("change", async function(e) {
    if (!e.target.files[0]) return;

    await loadAudioFile(e.target.files[0]);
    generateTestBeatmap();
    startSong();
    requestAnimationFrame(gameLoop);
});
