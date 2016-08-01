function setupInteract(camera, model, canvas) {

    var mousedown = false;
    var mouseButton = 0;

    canvas.addEventListener("mousedown", function(e) {
        mousedown = true;
        mouseButton = e.button;
        prevPos = {x: e.pageX, y: e.pageY};
        e.preventDefault();
    });

    canvas.addEventListener("mouseup", function() {
        mousedown = false;
    });

    canvas.addEventListener("mousemove", function(e) {
        if (mousedown) {
            if (e.ctrlKey) {
                if (mouseButton == 0) {
                    var x = (new Mat3(camera.mat)).mult(new Vec3(1, 0, 0)).mult(e.movementY/300);
                    var y = (new Mat3(camera.mat)).mult(new Vec3(0, 1, 0)).mult(e.movementX/300);
                    model.rotate(x.x, x.y, x.z).rotate(y.x, y.y, y.z);
                } else if (mouseButton == 2) {
                    var z = (new Mat3(camera.mat)).mult(new Vec3(0, 0, 1)).mult(-e.movementX/300);
                    model.rotate(z.x, z.y, z.z);
                }
            } else {
                if (mouseButton == 0) {
                    camera.rotate(-e.movementY/300, -e.movementX/300, 0);
                } else if (mouseButton == 2) {
                    camera.rotate(0, 0, e.movementX/300);
                }
            }
        }
    });

    canvas.addEventListener("wheel", function(e) {
        model.mat = model.mat.mult((new Mat4(Math.pow(1.001, -e.deltaY))));
        model.mat.mat[15] = 1;
    });

}
