import { beatmap } from "./beatmapEngine.js";
import { getSongTime } from "./audioEngine.js";
import { createNote } from "./hitObjects.js";

export function startTiming() {
    requestAnimationFrame(update);
}

function update() {
    const currentTime = getSongTime();

    for (let note of beatmap) {
        if (!note.spawned && note.time - currentTime <= 1) {
            note.spawned = true;
            createNote(note);
        }
    }

    requestAnimationFrame(update);
}
