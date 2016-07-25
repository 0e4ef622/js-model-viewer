function ThreeDObj(x, y, z) {
    this.mat = new Mat4([1, 0, 0, x,
                         0, 1, 0, y,
                         0, 0, 1, z,
                         0, 0, 0, 1]);
}

ThreeDObj.prototype.rotate = function(x, y, z) { // radians
    var c = Math.cos,
        s = Math.sin,
        cx = c(x),
        sx = s(x),
        cy = c(y),
        sy = s(y),
        cz = c(z),
        sz = s(z);

    var r = new Mat4([cy*cz, sx*sy*cz-cx*sz, cx*sy*cz+sx*sz, 0,
                      cy*sz, sx*sy*sz+cx*cz, cx*sy*sz-sx*cz, 0,
                        -sy,          sx*cy,          cx*cy, 0,
                          0,              0,              0, 1]);
    this.mat = this.mat.mult(r);
    return this;
};

ThreeDObj.prototype.resetRotation = function() {
    this.mat.mat = [1, 0, 0, this.mat.mat[3],
                    0, 1, 0, this.mat.mat[7],
                    0, 0, 1, this.mat.mat[11],
                    0, 0, 0, 1];
    return this;
};


function Camera(x, y, z, fov) {
    this.fov = fov;
    ThreeDObj.call(this, x, y, z);
}

Camera.prototype = Object.create(ThreeDObj.prototype);
