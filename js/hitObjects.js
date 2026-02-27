import { judge } from "./judgement.js";

export function createNote(note) {

    const gameArea = document.getElementById("gameArea");

    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.style.left = note.x + "px";
    noteDiv.style.top = note.y + "px";

    const approach = document.createElement("div");
    approach.classList.add("approach");
    approach.style.left = note.x + "px";
    approach.style.top = note.y + "px";

    noteDiv.onclick = () => {
        judge(note, noteDiv);
        approach.remove();
    };

    gameArea.appendChild(approach);
    gameArea.appendChild(noteDiv);

    setTimeout(() => {
        if (!note.hit) {
            noteDiv.remove();
            approach.remove();
        }
    }, 1200);
}
