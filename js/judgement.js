let score = 0;
let combo = 0;
let hits = [];

const hitWindows = {
    perfect: 30,
    great: 70,
    good: 120
};

function judge(noteTime) {
    const currentTime = getCurrentSongTime();
    const diff = Math.abs(currentTime - noteTime);

    if (diff <= hitWindows.perfect) return register("perfect");
    if (diff <= hitWindows.great) return register("great");
    if (diff <= hitWindows.good) return register("good");

    return register("miss");
}

function register(type) {
    if (type === "miss") {
        combo = 0;
    } else {
        combo++;
    }

    hits.push(type);

    if (type === "perfect") score += 300;
    if (type === "great") score += 200;
    if (type === "good") score += 100;

    updateHUD();
}

function updateHUD() {
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("combo").innerText = "Combo: " + combo;
    document.getElementById("accuracy").innerText = "Accuracy: " + calculateAccuracy() + "%";
}

function calculateAccuracy() {
    let total = hits.length;
    if (!total) return "100.00";

    let value = 0;
    hits.forEach(h => {
        if (h === "perfect") value += 300;
        if (h === "great") value += 200;
        if (h === "good") value += 100;
    });

    return ((value / (total * 300)) * 100).toFixed(2);
}
