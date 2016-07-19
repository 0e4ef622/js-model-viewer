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
        camera = {fov: 60, mat: new Mat4()}
        vertexArray = {data: null, gl: gl.createBuffer()};


    glSetup(gl);

    var prgm = shaderSetup(gl, vtxSrc, fragSrc);
    gl.useProgram(prgm);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexArray.gl);
    vertexAttribSetup(gl, prgm);

    filePrompt(function(file) {
        vertexArray.data = loadModel(file),
        gl.bufferData(gl.ARRAY_BUFFER, vertexArray.data, gl.STATIC_DRAW);
    });

    var worldViewMatrixLoc = gl.getUniformLocation(prgm, "worldViewMatrix"),
        modelMatrixLoc = gl.getUniformLocation(prgm, "modelMatrix"),
        lightDirLoc = gl.getUniformLocation(prgm, "lightDir"),
        ambientLoc = gl.getUniformLocation(prgm, "ambient"),
        colorLoc = gl.getUniformLocation(prgm, "color");

    function renderLoop() {
        resizeCanvas(c, gl);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniformMatrix4fv(worldViewMatrixLoc, false, worldViewMatrix(c.width/c.height, camera));
        gl.uniformMatrix4fv(modelMatrixLoc, false, new Float32Array([.5, 0, 0, 0, 0, .5, 0, 0, 0, 0, .5, 0, 0, 0, -2, 1]));
        gl.uniform3f(lightDirLoc, 0, 0, -1);
        gl.uniform4f(ambientLoc, .2, .2, .2, 1);
        gl.uniform4f(colorLoc, 1, 0, 0, 1);

        if (vertexArray.data) gl.drawArrays(gl.TRIANGLES, 0, vertexArray.data.length / 6);

        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);

});
