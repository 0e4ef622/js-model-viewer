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

    var t = new Mat3(this.mat);
    var r = new Mat3([cy*cz, sx*sy*cz-cx*sz, cx*sy*cz+sx*sz,
                      cy*sz, sx*sy*sz+cx*cz, cx*sy*sz-sx*cz,
                        -sy,          sx*cy,          cx*cy]);
    r = r.mult(t).mat;
    this.mat.mat = [r[0], r[1], r[2],  this.mat.mat[3],
                    r[3], r[4], r[5],  this.mat.mat[7],
                    r[6], r[7], r[8], this.mat.mat[11],
                       0,    0,    0,               1];

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
