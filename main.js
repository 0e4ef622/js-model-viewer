var vtxSrc = "attribute vec4 pos;"+
             "attribute vec3 normal;"+

             "uniform mat4 worldViewMatrix;"+
             "uniform mat4 modelMatrix;"+
             "uniform mat3 normalMatrix;"+
             "uniform vec3 lightDir;"+
             "uniform vec4 ambient;"+

             "varying lowp vec4 lighting;"+

             "void main() {"+
                 "gl_Position = worldViewMatrix * modelMatrix * pos;"+
                 "vec3 norm = normalMatrix * normal;"+
                 "vec4 diffuse = vec4(vec3(max(dot(norm, -lightDir), 0.0)), 1.0);"+
                 "lighting = ambient + diffuse;"+
             "}";

var fragSrc = "uniform lowp vec4 color;"+

              "varying lowp vec4 lighting;"+

              "void main() {"+
                  "gl_FragColor = color * lighting;"+
              "}";


window.addEventListener("load", function() {

    var loop = (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(f){setTimeout(f,10);});
    var c = document.getElementById("c");
    var gl = createContext(c);

    resizeCanvas(c);
    glSetup(gl);
    var prgm = shaderSetup(gl, vtxSrc, fragSrc);

});
