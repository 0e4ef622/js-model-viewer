function createContext(canvas) {
    return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
}

function resizeCanvas(canvas, gl) {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (canvas.width != w || canvas.height != h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
    }
}

function glSetup(gl) {
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function vertexAttribSetup(gl, prgm) {
    var posLoc = gl.getAttribLocation(prgm, "pos"),
        normalLoc = gl.getAttribLocation(prgm, "normal");
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 24 ,0);
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 24, 12);
}

function updateMatrices(aspect, camera, matrices) {
    // TODO
    var minDepth = n = .1;
    var maxDepth = f = 200;
    var r = Math.tan(camera.fov/180*Math.PI/2)*n;
    var t = r/aspect;

    var projection = new Mat4([
            n/r, 0, 0, 0,
            0,n/t, 0, 0,
            0, 0,-(f+n)/(f-n), -2*f*n/(f-n),
            0, 0, -1, 0]);
    matrices.worldView = new Float32Array(projection.mult(camera.mat).transpose().mat);
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
