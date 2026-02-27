let score = 0;
let combo = 0;
let hits = [];
let totalNotes = 0;

const hitWindows = {
perfect: 30,
great: 70,
good: 120
};

function judgeHit(noteTime, currentTime) {
let diff = Math.abs(currentTime - noteTime);

if (diff <= hitWindows.perfect) {
registerHit("perfect");
} else if (diff <= hitWindows.great) {
registerHit("great");
} else if (diff <= hitWindows.good) {
registerHit("good");
} else {
registerMiss();
}
}

function registerHit(type) {
combo++;
totalNotes++;
hits.push(type);

if (type === "perfect") score += 300;
if (type === "great") score += 200;
if (type === "good") score += 100;

updateHUD();
}

function registerMiss() {
combo = 0;
totalNotes++;
hits.push("miss");
updateHUD();
}

function calculateAccuracy() {
let total = hits.length;
let value = 0;

hits.forEach(hit => {
if (hit === "perfect") value += 300;
if (hit === "great") value += 200;
if (hit === "good") value += 100;
});

return total ? ((value / (total * 300)) * 100).toFixed(2) : 100;
}

function updateHUD() {
document.getElementById("score").innerText = "Score: " + score;
document.getElementById("combo").innerText = "Combo: " + combo;
document.getElementById("accuracy").innerText = "Accuracy: " + calculateAccuracy() + "%";
}