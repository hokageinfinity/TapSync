export function saveSong(name, arrayBuffer) {
    localStorage.setItem("song_" + name, btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer))
    ));
}

export function getSongs() {
    return Object.keys(localStorage)
        .filter(k => k.startsWith("song_"))
        .map(k => k.replace("song_", ""));
}

export function loadSongData(name) {
    const base64 = localStorage.getItem("song_" + name);
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return bytes.buffer;
}
