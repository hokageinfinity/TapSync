export let beatmap = [];

export function generateAutoMap(audioBuffer) {

    beatmap.length = 0;

    const duration = audioBuffer.duration;
    const bpm = 140;
    const beatInterval = 60 / bpm;

    for (let time = 2; time < duration; time += beatInterval) {
        beatmap.push({
            time,
            x: Math.random() * window.innerWidth * 0.8 + 100,
            y: Math.random() * window.innerHeight * 0.8 + 100,
            spawned: false,
            hit: false
        });
    }
}
