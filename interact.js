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
        ox = 0, // obj
        oy = 0;
    window.addEventListener("mousemove", function(e) {
        if (mousedown) {
            if (e.shiftKey) {
                oy -= e.movementY/300;
                ox -= e.movementX/300;
                model.rotate(-e.movementY/300, -e.movementX/300, 0);
            } else {
                cy -= e.movementY/300;
                cx -= e.movementX/300;
                camera.resetRotation().rotate(cy, cx, 0);
            }
        }
    });

}
