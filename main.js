var vtxSrc = "attribute vec3 pos;"+
             "attribute vec3 normal;"+

             "uniform mat4 worldViewMatrix;"+
             "uniform mat4 modelMatrix;"+
             "uniform vec3 lightDir;"+
             "uniform vec4 ambient;"+

             "varying lowp vec4 lighting;"+

             "void main() {"+
                 "gl_Position = worldViewMatrix * modelMatrix * vec4(pos, 1);"+
                 "vec4 diffuse = vec4(vec3(max(dot(normal, -lightDir), 0.0)), 1.0);"+
                 "lighting = ambient + diffuse;"+
             "}";

var fragSrc = "uniform lowp vec4 color;"+

              "varying lowp vec4 lighting;"+

              "void main() {"+
                  "gl_FragColor = color * lighting;"+
              "}";

window.addEventListener("load", function() {

    var requestAnimationFrame = (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(f){setTimeout(f,10);});
    var c = document.getElementById("c"),
        gl = createContext(c),
        matrices = {},
        camera = {fov: 60, mat: new Mat4()};


    glSetup(gl);
    var prgm = shaderSetup(gl, vtxSrc, fragSrc);
    gl.useProgram(prgm);
    var posLoc = gl.getAttribLocation(prgm, "pos"),
        normalLoc = gl.getAttribLocation(prgm, "normal");
    gl.enableVertexAttribArray(posLoc);
    gl.enableVertexAttribArray(normalLoc);

    filePrompt(function(file) {
        var vtxAry = loadModel(file),
            vtxAryBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vtxAryBuf);
        gl.bufferData(gl.ARRAY_BUFFER, vtxAry, gl.STATIC_DRAW);
        vertexAttribSetup(gl, prgm);
    });

    var worldViewMatrixLoc = gl.getUniformLocation(prgm, "worldViewMatrix"),
        modelMatrixLoc = gl.getUniformLocation(prgm, "modelMatrix"),
        lightDirLoc = gl.getUniformLocation(prgm, "lightDir"),
        ambientLoc = gl.getUniformLocation(prgm, "ambient"),
        colorLoc = gl.getUniformLocation(prgm, "color");

    function renderLoop() {
        resizeCanvas(c, gl);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        updateMatrices(c.width/c.height, camera, matrices);

        gl.uniformMatrix4fv(worldViewMatrixLoc, false, matrices.worldView);
        gl.uniformMatrix4fv(modelMatrixLoc, false, new Float32Array([.5, 0, 0, 0, 0, .5, 0, 0, 0, 0, .5, 0, 0, 0, -2, 1]));
        gl.uniform3f(lightDirLoc, 0, 0, -1);
        gl.uniform4f(ambientLoc, .2, .2, .2, 1);
        gl.uniform4f(colorLoc, 1, 0, 0, 1);

        gl.drawArrays(gl.TRIANGLES, 0, 36);

        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);

});
