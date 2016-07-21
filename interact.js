function setupInteract(camera, model) {

    var mousedown = false;

    window.addEventListener("mousedown", function(e) {
        mousedown = true;
        prevPos = {x: e.pageX, y: e.pageY};
        e.preventDefault();
    });

    window.addEventListener("mouseup", function() {
        mousedown = false;
    });

    var cx = 0, // camera
        cy = 0,
        cz = 0;
    window.addEventListener("mousemove", function(e) {
        if (mousedown) {
            if (e.shiftKey) {
                model.rotate(-e.movementY/300, -e.movementX/300, 0);
            } else {
                if (e.button == 0) {
                    cy -= e.movementY/300;
                    cx -= e.movementX/300;
                    camera.rotate(-e.movementY/300, -e.movementX/300, 0);
                } else if (e.button == 2) {
                    cz += e.movementX/300;
                    camera.rotate(0, 0, e.movementX/300);
                }
                //camera.resetRotation().rotate(cy, cx, cz);
            }
        }
    });

    window.addEventListener("wheel", function(e) {
        model.mat = model.mat.mult((new Mat4()).mult(Math.pow(1.001, e.deltaY)));
        model.mat.mat[15] = 1;
    });

}
