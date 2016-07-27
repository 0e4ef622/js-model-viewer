var vtxSrc = "attribute vec3 pos;"+
             "attribute vec3 normal;"+

             "uniform mat4 worldViewMatrix;"+
             "uniform mat4 modelMatrix;"+
             "uniform vec3 lightDir;"+
             "uniform vec4 ambient;"+

             "varying lowp vec4 lighting;"+

             "void main() {"+
                 "gl_Position = worldViewMatrix * modelMatrix * vec4(pos, 1);"+
                 "vec3 norm = normalize(mat3(modelMatrix) * normal);"+
                 "vec4 diffuse = vec4(vec3(max(dot(norm, -lightDir), 0.0)), 1.0);"+
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
        model = new ThreeDObj(0, 0, 0);
        camera = new Camera(0, 0, 2, 60);
        vertexArray = {vertices: null, indices: null};


    glSetup(gl);
    setupInteract(camera, model);

    var prgm = shaderSetup(gl, vtxSrc, fragSrc);
    gl.useProgram(prgm);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    vertexAttribSetup(gl, prgm);

    filePrompt(function(file) {
        loadModel(file, model, function(vtxAry) {
            vertexArray = vtxAry;
            gl.bufferData(gl.ARRAY_BUFFER, vtxAry.vertices, gl.STATIC_DRAW);
            vtxAry.indices && gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vtxAry.indices, gl.STATIC_DRAW);
        });
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
        gl.uniformMatrix4fv(modelMatrixLoc, false, new Float32Array(model.mat.transpose().mat));
        gl.uniform3f(lightDirLoc, 0, 0, -1);
        gl.uniform4f(ambientLoc, .2, .2, .2, 1);
        gl.uniform4f(colorLoc, 1, 0, 0, 1);

        if (vertexArray.indices) gl.drawElements(gl.TRIANGLES, vertexArray.indices.length, gl.UNSIGNED_SHORT, 0);
        else if (vertexArray.vertices) gl.drawArrays(gl.TRIANGLES, 0, vertexArray.vertices.length / 6);

        requestAnimationFrame(renderLoop);
    }
    requestAnimationFrame(renderLoop);

});

document.oncontextmenu = function() { return false; };
