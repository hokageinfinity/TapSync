let lastFrameTime = 0;

function gameLoop(timestamp) {
    if (!lastFrameTime) lastFrameTime = timestamp;
    const delta = timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    update(delta);
    render();

    requestAnimationFrame(gameLoop);
}
