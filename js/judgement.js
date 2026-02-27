import { getSongTime } from "./audioEngine.js";

let score = 0;
let combo = 0;
let totalHits = 0;
let successfulHits = 0;

export function judge(note, element) {

    const currentTime = getSongTime();
    const delta = Math.abs(currentTime - note.time);

    let result;

    if (delta < 0.08) {
        score += 300;
        combo++;
        successfulHits++;
        result = "Perfect";
    }
    else if (delta < 0.15) {
        score += 100;
        combo++;
        successfulHits++;
        result = "Great";
    }
    else {
        combo = 0;
        result = "Bad";
    }

    totalHits++;
    updateHUD();
    showJudgement(result, note.x, note.y);

    element.remove();
}

function updateHUD() {
    document.getElementById("score").innerText = score;
    document.getElementById("combo").innerText = combo;
    const acc = totalHits === 0 ? 100 : (successfulHits / totalHits) * 100;
    document.getElementById("accuracy").innerText = acc.toFixed(2) + "%";
}

function showJudgement(text, x, y) {
    const popup = document.createElement("div");
    popup.classList.add("judgement");
    popup.innerText = text;
    popup.style.left = x + "px";
    popup.style.top = y + "px";

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 800);
}
