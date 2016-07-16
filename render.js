function createContext(canvas) {
    return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
}

function resizeCanvas(canvas) {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (canvas.width != w || canvas.height != h) {
        canvas.width = w;
        canvas.height = h;
    }
}

function glSetup(gl) {

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

}

function updateMatrices(canvas, camera, matrices) {
    // TODO
    matrices.worldView;
}
