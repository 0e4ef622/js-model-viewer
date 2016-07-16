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

function shaderSetup(gl, vtxSrc, fragSrc) {
    var prgm = gl.createProgram();

    var vtx = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vtx, vtxSrc);
    gl.compileShader(vtx);

    var success = gl.getShaderParameter(vtx, gl.COMPILE_STATUS);
    if (!success)
        alert("error compiling vertex shader\n" + gl.getShaderInfoLog(vtx));

    var frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, fragSrc);
    gl.compileShader(frag);

    success = gl.getShaderParameter(frag, gl.COMPILE_STATUS);
    if (!success)
        alert("error compiling fragment shader\n" + gl.getShaderInfoLog(frag));

    gl.attachShader(prgm, vtx);
    gl.attachShader(prgm, frag);
    gl.linkProgram(prgm);
    success = gl.getProgramParameter(prgm, gl.LINK_STATUS);
    if (!success)
        alert("error linking shader program\n" + gl.getProgramInfoLog(prgm));

    gl.deleteShader(vtx);
    gl.deleteShader(frag);

    return prgm;
}
