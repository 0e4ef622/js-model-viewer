window.addEventListener("load", function() {

    var loop = (window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(f){setTimeout(f,10);});
    var c = document.getElementById("c");
    var gl = createContext(c);

    resizeCanvas(c);
    glSetup(gl);

});
