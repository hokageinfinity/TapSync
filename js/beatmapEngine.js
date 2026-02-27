let currentBeatmap = {
    metadata: {
        bpm: 120
    },
    hitObjects: []
};

function generateTestBeatmap() {
    currentBeatmap.hitObjects = [];
    for (let i = 1; i <= 20; i++) {
        currentBeatmap.hitObjects.push({
            time: i * 1000,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            type: "tap",
            hit: false
        });
    }
}
