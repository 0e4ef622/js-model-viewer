/**
 * 3x3 Matrix
 * @constructor
 * @struct
 * @param {(Array<number>|number)=} a
 */
function Mat3(a) {
    if (typeof a === "undefined")
        this.mat = [1, 0, 0,
                    0, 1, 0,
                    0, 0, 1];
    else if (typeof a === "number")
        this.mat = [a, 0, 0,
                    0, a, 0,
                    0, 0, a];
    else if (a.constructor === Mat4)
        this.mat = [a.mat[0], a.mat[1], a.mat[2],
                    a.mat[4], a.mat[5], a.mat[6],
                    a.mat[8], a.mat[9], a.mat[10]];
    else if (a.constructor === Array) {
        if (a.length === 9) this.mat = a;
    } else console.error("Mat3 called with invalid arguments");
}
/**
 * Multiplication
 * @param {(number|Mat3|Vec3)} v
 * @return {?(Vec3|Mat3)}
 */
Mat3.prototype.mult = function (v) {
    var m = this.mat;
    if (typeof v === "number") return new Mat3(m.map(function(a){return a*v}));
    switch (v.constructor) {
        case Vec3:
            return new Vec3(m[0]*v.x + m[1]*v.y + m[2]*v.z,
                            m[3]*v.x + m[4]*v.y + m[5]*v.z,
                            m[6]*v.x + m[7]*v.y + m[8]*v.z);
            break;
        case Mat3:
            var x = v.mat;
            return new Mat3([m[0]*x[0]+m[1]*x[3]+m[2]*x[6],m[0]*x[1]+m[1]*x[4]+m[2]*x[7],m[0]*x[2]+m[1]*x[5]+m[2]*x[8],m[3]*x[0]+m[4]*x[3]+m[5]*x[6],m[3]*x[1]+m[4]*x[4]+m[5]*x[7],m[3]*x[2]+m[4]*x[5]+m[5]*x[8],m[6]*x[0]+m[7]*x[3]+m[8]*x[6],m[6]*x[1]+m[7]*x[4]+m[8]*x[7],m[6]*x[2]+m[7]*x[5]+m[8]*x[8]]);
            break;
        default:
            console.error("Mat3.prototype.mult called with invalid arguments");
            break;
    }
}

/**
 * Addition
 * @param {(number|Mat3)} v
 * @return {?Mat3}
 */
Mat3.prototype.add = function (v) {
    var m = this.mat;
    if (typeof v === "number") return new Mat3([m[0]+v,m[1]+v,m[2]+v,m[3]+v,m[4]+v,m[5]+v,m[6]+v,m[7]+v,m[8]+v]);
    else if (v.constructor === Mat3) {
        var x = v.mat;
        return new Mat3([m[0]+x[0],m[1]+x[1],m[2]+x[2],m[3]+x[3],m[4]+x[4],m[5]+x[5],m[6]+x[6],m[7]+x[7],m[8]+x[8]]);
    }
}

/**
 * Subtraction
 * @param {(number|Mat3)} v
 * @return {?Mat3}
 */
Mat3.prototype.subtract = function (v) {
    var m = this.mat;
    if (typeof v === "number") return new Mat3([m[0]-v,m[1]-v,m[2]-v,m[3]-v,m[4]-v,m[5]-v,m[6]-v,m[7]-v,m[8]-v]);
    else if (v.constructor === Mat3) {
        var x = v.mat;
        return new Mat3([m[0]-x[0],m[1]-x[1],m[2]-x[2],m[3]-x[3],m[4]-x[4],m[5]-x[5],m[6]-x[6],m[7]-x[7],m[8]-x[8]]);
    }
}

/**
 * Negation
 * @return {Mat3}
 */
Mat3.prototype.neg = function () { // negate
    var m = this.mat;
    return new Mat3([-m[0],-m[1],-m[2],-m[3],-m[4],-m[5],-m[6],-m[7],-m[8]]);
}

/**
 * Transpose; swap the rows and columns
 * @return {Mat3}
 */
Mat3.prototype.transpose = function () {
    var m = this.mat;
    return new Mat3([m[0],m[3],m[6],m[1],m[4],m[7],m[2],m[5],m[8]]);
}

/** @return {Mat3} */
Mat3.prototype.inverse = function () {
    var m = this.mat,
        a = m[0],
        b = m[1],
        c = m[2],
        d = m[3],
        e = m[4],
        f = m[5],
        g = m[6],
        h = m[7],
        i = m[8],
        A = e*i-f*h,
        B = f*g-d*i,
        C = d*h-e*g,
        D = c*h-b*i,
        E = a*i-c*g,
        F = b*g-a*h,
        G = b*f-c*e,
        H = c*d-a*f,
        I = a*e-b*d,
        s = 1/(a*A+b*B+c*C);
    return (new Mat3([A, D, G, B, E, H, C, F, I])).mult(s);
}

/**
 * Determinant
 * @return {number}
 */
Mat3.prototype.det = function () {
    var m = this.mat,
        a = m[0],
        b = m[1],
        c = m[2],
        d = m[3],
        e = m[4],
        f = m[5],
        g = m[6],
        h = m[7],
        i = m[8],
        A = e*i-f*h,
        B = f*g-d*i,
        C = d*h-e*g,
        D = c*h-b*i,
        E = a*i-c*g,
        F = b*g-a*h,
        G = b*f-c*e,
        H = c*d-a*f,
        I = a*e-b*d;
    return a*A+b*B+c*C;
}

/**
 * Check for equality
 * @return {boolean}
 */
Mat3.prototype.equals = function (m) {
    var a = this.mat;
    return a[0] == m[0] && a[1] == m[1] && a[2] == m[2] &&
           a[3] == m[3] && a[4] == m[4] && a[5] == m[5] &&
           a[6] == m[6] && a[7] == m[7] && a[8] == m[8];
}

/**
 * 4x4 Matrix
 * @constructor
 * @struct
 * @param {(Array<number>|number)=} a
 */
function Mat4(a) {
    if (typeof a === "undefined")
        this.mat = [1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1];
    else if (typeof a === "number")
        this.mat = [a, 0, 0, 0,
                    0, a, 0, 0,
                    0, 0, a, 0,
                    0, 0, 0, a];
    else if (a.constructor === Mat3)
        this.mat = [a.mat[0], a.mat[1], a.mat[2], 0,
                    a.mat[3], a.mat[4], a.mat[5], 0,
                    a.mat[6], a.mat[7], a.mat[8], 0,
                           0,        0,        0, 1];
    else if (a.constructor === Array) {
        if (a.length === 16) this.mat = a;
    } else console.error("Mat3 called with invalid arguments");
}

/**
 * Multiplication
 * @param {(number|Mat4|Vec4)} v
 * @return {?(Mat4|Vec4)}
 */
Mat4.prototype.mult = function (v) {
    var m = this.mat;
    if (typeof v === "number") return new Mat4([m[0]*v,m[1]*v,m[2]*v,m[3]*v,m[4]*v,m[5]*v,m[6]*v,m[7]*v,m[8]*v,m[9]*v,m[10]*v,m[11]*v,m[12]*v,m[13]*v,m[14]*v,m[15]*v]);
    else {
        switch (v.constructor) {
            case Vec4:
                return new Vec4(m[0]*v.x + m[1]*v.y + m[2]*v.z + m[3]*v.w,
                                m[4]*v.x + m[5]*v.y + m[6]*v.z + m[7]*v.w,
                                m[8]*v.x + m[9]*v.y + m[10]*v.z + m[11]*v.w,
                                m[12]*v.x + m[13]*v.y + m[14]*v.z + m[15]*v.w);
            case Mat4:
                var x = v.mat;
                return new Mat4([m[0]*x[0]+m[1]*x[4]+m[2]*x[8]+m[3]*x[12],m[0]*x[1]+m[1]*x[5]+m[2]*x[9]+m[3]*x[13],m[0]*x[2]+m[1]*x[6]+m[2]*x[10]+m[3]*x[14],m[0]*x[3]+m[1]*x[7]+m[2]*x[11]+m[3]*x[15],m[4]*x[0]+m[5]*x[4]+m[6]*x[8]+m[7]*x[12],m[4]*x[1]+m[5]*x[5]+m[6]*x[9]+m[7]*x[13],m[4]*x[2]+m[5]*x[6]+m[6]*x[10]+m[7]*x[14],m[4]*x[3]+m[5]*x[7]+m[6]*x[11]+m[7]*x[15],m[8]*x[0]+m[9]*x[4]+m[10]*x[8]+m[11]*x[12],m[8]*x[1]+m[9]*x[5]+m[10]*x[9]+m[11]*x[13],m[8]*x[2]+m[9]*x[6]+m[10]*x[10]+m[11]*x[14],m[8]*x[3]+m[9]*x[7]+m[10]*x[11]+m[11]*x[15],m[12]*x[0]+m[13]*x[4]+m[14]*x[8]+m[15]*x[12],m[12]*x[1]+m[13]*x[5]+m[14]*x[9]+m[15]*x[13],m[12]*x[2]+m[13]*x[6]+m[14]*x[10]+m[15]*x[14],m[12]*x[3]+m[13]*x[7]+m[14]*x[11]+m[15]*x[15]]);
                break;
            default:
                console.error("Mat4.prototype.mult called with invalid arguments");
                break;
        }
    }
}

/**
 * Addition
 * @param {(number|Mat4)} v
 * @return {?Mat4}
 */
Mat4.prototype.add = function (v) {
    var m = this.mat;
    if (typeof v === "number") return new Mat4([m[0]+v,m[1]+v,m[2]+v,m[3]+v,m[4]+v,m[5]+v,m[6]+v,m[7]+v,m[8]+v,m[9]+v,m[10]+v,m[11]+v,m[12]+v,m[13]+v,m[14]+v,m[15]+v]);
    else if (v.constructor === Mat4) {
        var x = v.mat;
        return new Mat4([m[0]+x[0],m[1]+x[1],m[2]+x[2],m[3]+x[3],m[4]+x[4],m[5]+x[5],m[6]+x[6],m[7]+x[7],m[8]+x[8],m[9]+x[9],m[10]+x[10],m[11]+x[11],m[12]+x[12],m[13]+x[13],m[14]+x[14],m[15]+x[15]]);
    } else console.error("Mat4.prototype.add called with invalid arguments");
};

/**
 * Subtraction
 * @param {(number|Mat4)} v
 * @return {?Mat4}
 */
Mat4.prototype.subtract = function (v) {
    var m = this.mat;
    if (typeof v === "number") return new Mat4([m[0]-v,m[1]-v,m[2]-v,m[3]-v,m[4]-v,m[5]-v,m[6]-v,m[7]-v,m[8]-v,m[9]-v,m[10]-v,m[11]-v,m[12]-v,m[13]-v,m[14]-v,m[15]-v]);
    else if (v.constructor === Mat4) {
        var x = v.mat;
        return new Mat4([m[0]-x[0],m[1]-x[1],m[2]-x[2],m[3]-x[3],m[4]-x[4],m[5]-x[5],m[6]-x[6],m[7]-x[7],m[8]-x[8],m[9]-x[9],m[10]-x[10],m[11]-x[11],m[12]-x[12],m[13]-x[13],m[14]-x[14],m[15]-x[15]]);
    } else console.error("Mat4.prototype.add called with invalid arguments");
};

/**
 * Negation
 * @return {Mat4}
 */
Mat4.prototype.neg = function () {
    var m = this.mat;
    return new Mat4([-m[0],-m[1],-m[2],-m[3],-m[4],-m[5],-m[6],-m[7],-m[8],-m[9],-m[10],-m[11],-m[12],-m[13],-m[14],-m[15]]);
};

/**
 * Transpose; swap rows and columns
 * @return {Mat4}
 */
Mat4.prototype.transpose = function () {
    var m = this.mat;
    return new Mat4([m[0],m[4],m[8],m[12],
                     m[1],m[5],m[9],m[13],
                     m[2],m[6],m[10],m[14],
                     m[3],m[7],m[11],m[15]]);
};

/** @return {Mat4} */
Mat4.prototype.inverse = function () {
    var m = this.mat;
    var a = new Mat4(0);
    var inv = a.mat;

    inv[0] = m[5]  * m[10] * m[15] -
             m[5]  * m[11] * m[14] -
             m[9]  * m[6]  * m[15] +
             m[9]  * m[7]  * m[14] +
             m[13] * m[6]  * m[11] -
             m[13] * m[7]  * m[10];

    inv[4] = -m[4]  * m[10] * m[15] +
              m[4]  * m[11] * m[14] +
              m[8]  * m[6]  * m[15] -
              m[8]  * m[7]  * m[14] -
              m[12] * m[6]  * m[11] +
              m[12] * m[7]  * m[10];

    inv[8] = m[4]  * m[9] * m[15] -
             m[4]  * m[11] * m[13] -
             m[8]  * m[5] * m[15] +
             m[8]  * m[7] * m[13] +
             m[12] * m[5] * m[11] -
             m[12] * m[7] * m[9];

    inv[12] = -m[4]  * m[9] * m[14] +
               m[4]  * m[10] * m[13] +
               m[8]  * m[5] * m[14] -
               m[8]  * m[6] * m[13] -
               m[12] * m[5] * m[10] +
               m[12] * m[6] * m[9];

    inv[1] = -m[1]  * m[10] * m[15] +
              m[1]  * m[11] * m[14] +
              m[9]  * m[2] * m[15] -
              m[9]  * m[3] * m[14] -
              m[13] * m[2] * m[11] +
              m[13] * m[3] * m[10];

    inv[5] = m[0]  * m[10] * m[15] -
             m[0]  * m[11] * m[14] -
             m[8]  * m[2] * m[15] +
             m[8]  * m[3] * m[14] +
             m[12] * m[2] * m[11] -
             m[12] * m[3] * m[10];

    inv[9] = -m[0]  * m[9] * m[15] +
              m[0]  * m[11] * m[13] +
              m[8]  * m[1] * m[15] -
              m[8]  * m[3] * m[13] -
              m[12] * m[1] * m[11] +
              m[12] * m[3] * m[9];

    inv[13] = m[0]  * m[9] * m[14] -
              m[0]  * m[10] * m[13] -
              m[8]  * m[1] * m[14] +
              m[8]  * m[2] * m[13] +
              m[12] * m[1] * m[10] -
              m[12] * m[2] * m[9];

    inv[2] = m[1]  * m[6] * m[15] -
             m[1]  * m[7] * m[14] -
             m[5]  * m[2] * m[15] +
             m[5]  * m[3] * m[14] +
             m[13] * m[2] * m[7] -
             m[13] * m[3] * m[6];

    inv[6] = -m[0]  * m[6] * m[15] +
              m[0]  * m[7] * m[14] +
              m[4]  * m[2] * m[15] -
              m[4]  * m[3] * m[14] -
              m[12] * m[2] * m[7] +
              m[12] * m[3] * m[6];

    inv[10] = m[0]  * m[5] * m[15] -
              m[0]  * m[7] * m[13] -
              m[4]  * m[1] * m[15] +
              m[4]  * m[3] * m[13] +
              m[12] * m[1] * m[7] -
              m[12] * m[3] * m[5];

    inv[14] = -m[0]  * m[5] * m[14] +
               m[0]  * m[6] * m[13] +
               m[4]  * m[1] * m[14] -
               m[4]  * m[2] * m[13] -
               m[12] * m[1] * m[6] +
               m[12] * m[2] * m[5];

    inv[3] = -m[1] * m[6] * m[11] +
              m[1] * m[7] * m[10] +
              m[5] * m[2] * m[11] -
              m[5] * m[3] * m[10] -
              m[9] * m[2] * m[7] +
              m[9] * m[3] * m[6];

    inv[7] = m[0] * m[6] * m[11] -
             m[0] * m[7] * m[10] -
             m[4] * m[2] * m[11] +
             m[4] * m[3] * m[10] +
             m[8] * m[2] * m[7] -
             m[8] * m[3] * m[6];

    inv[11] = -m[0] * m[5] * m[11] +
               m[0] * m[7] * m[9] +
               m[4] * m[1] * m[11] -
               m[4] * m[3] * m[9] -
               m[8] * m[1] * m[7] +
               m[8] * m[3] * m[5];

    inv[15] = m[0] * m[5] * m[10] -
              m[0] * m[6] * m[9] -
              m[4] * m[1] * m[10] +
              m[4] * m[2] * m[9] +
              m[8] * m[1] * m[6] -
              m[8] * m[2] * m[5];

    var det = m[0] * inv[0] + m[1] * inv[4] + m[2] * inv[8] + m[3] * inv[12];

    if (det === 0) console.error("Mat4.prototype.inverse called with non invertible matrix");

    det = 1 / det;
    a = a.mult(det);

    return a;
};

/**
 * Determinant
 * @return {number}
 */
Mat4.prototype.det = function () {
    var m = this.mat;
    var a =  m[5]  * m[10] * m[15] -
             m[5]  * m[11] * m[14] -
             m[9]  * m[6]  * m[15] +
             m[9]  * m[7]  * m[14] +
             m[13] * m[6]  * m[11] -
             m[13] * m[7]  * m[10];

    var b =  -m[4]  * m[10] * m[15] +
              m[4]  * m[11] * m[14] +
              m[8]  * m[6]  * m[15] -
              m[8]  * m[7]  * m[14] -
              m[12] * m[6]  * m[11] +
              m[12] * m[7]  * m[10];

    var c =  m[4]  * m[9]  * m[15] -
             m[4]  * m[11] * m[13] -
             m[8]  * m[5]  * m[15] +
             m[8]  * m[7]  * m[13] +
             m[12] * m[5]  * m[11] -
             m[12] * m[7]  * m[9];

    var d =   -m[4]  * m[9]  * m[14] +
               m[4]  * m[10] * m[13] +
               m[8]  * m[5]  * m[14] -
               m[8]  * m[6]  * m[13] -
               m[12] * m[5]  * m[10] +
               m[12] * m[6]  * m[9];
    return m[0] * a + m[1] * b + m[2] * c + m[3] * d;
};

/**
 * Check for equality
 * @return {boolean}
 */
Mat4.prototype.equals = function (m) {
    var a = this.mat;
    return a[0] == m[0] && a[1] == m[1] && a[2] == m[2] && a[3] == m[3] &&
           a[4] == m[4] && a[5] == m[5] && a[6] == m[6] && a[7] == m[7] &&
           a[8] == m[8] && a[9] == m[9] && a[10] == m[10] && a[11] == m[11] &&
           a[12] == m[12] && a[13] == m[13] && a[14] == m[14] && a[15] == m[15];
}
/**
 * A 3D vector
 * @constructor
 * @struct
 * @param {number=} x
 * @param {number=} y
 * @param {number=} z
 */
function Vec3(x, y, z) {
    if (typeof x == "undefined") x = 0;
    if (typeof y == "undefined") y = 0;
    if (typeof z == "undefined") z = 0;
    if (x.constructor === Vec4) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
    } else {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

/**
 * Multiplication
 * @param {(number|Vec3)} v
 * @return {?Vec3}
 */
Vec3.prototype.mult = function (v) {
    var t = this;
    if (typeof v === "number") return new Vec3(t.x*v, t.y*v, t.z*v);
    else if (v.constructor === Vec3) return new Vec3(t.x*v.x, t.y*v.y, t.z*v.z);
    else console.error("Vec3.prototype.mult called with invalid arguments");
}

/**
 * Division
 * @param {(number|Vec3)} v
 * @return {?Vec3}
 */
Vec3.prototype.div = function (v) {
    var t = this;
    if (typeof v === "number") return new Vec3(t.x/v, t.y/v, t.z/v);
    else if (v.constructor === Vec3) return new Vec3(t.x/v.x, t.y/v.y, t.z/v.z);
    else console.error("Vec3.prototype.div called with invalid arguments");
}

/**
 * Addition
 * @param {(number|Vec3)} v
 * @return {?Vec3}
 */
Vec3.prototype.add = function (v) {
    var t = this;
    if (typeof v === "number") return new Vec3(t.x+v, t.y+v, t.z+v);
    else if (v.constructor === Vec3) return new Vec3(t.x+v.x, t.y+v.y, t.z+v.z);
    else console.error("Vec3.prototype.add called with invalid arguments");
}

/**
 * Subtraction
 * @param {(number|Vec3)} v
 * @return {?Vec3}
 */
Vec3.prototype.subtract = function (v) {
    var t = this;
    if (typeof v === "number") return new Vec3(t.x-v, t.y-v, t.z-v);
    else if (v.constructor === Vec3) return new Vec3(t.x-v.x, t.y-v.y, t.z-v.z);
    else console.error("Vec3.prototype.subtract called with invalid arguments");
}

/**
 * Negation
 * @return {Vec3}
 */
Vec3.prototype.neg = function () {
    var t = this;
    return new Vec3(-t.x, -t.y, -t.z);
}

/**
 * Dot product
 * @param {Vec3} v
 * @return {?number}
 */
Vec3.prototype.dot = function (v) {
    var t = this;
    if (v.constructor === Vec3) return t.x*v.x + t.y*v.y + t.z*v.z;
    else console.error("Vec3.prototype.dot called with invalid arguments");
}

/**
 * Cross product
 * @param {Vec3} v
 * @return {?Vec3}
 */
Vec3.prototype.cross = function (v) {
    var t = this;
    if (v.constructor === Vec3)
        return new Vec3(t.y*v.z - t.z*v.y,
                        t.z*v.x - t.x*v.z,
                        t.x*v.y - t.y*v.x);
    else console.error("Vec3.prototype.cross called with invalid arguments");
}

/**
 * Magnitude
 * @return {number}
 */
Vec3.prototype.mag = function () {
    var t = this;
    return Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z);
}

/**
 * Normalize
 * @return {Vec3}
 */
Vec3.prototype.norm = function () {
    return this.div(this.mag());
}
/**
 * Check for equality
 * @return {boolean}
 */
Vec3.prototype.equals = function (v, eps) {
    var t = this;
    if (eps)
        return (t.x <= v.x+eps && t.x >= v.x-eps) &&
               (t.y <= v.y+eps && t.y >= v.y-eps) &&
               (t.z <= v.z+eps && t.z >= v.z-eps);

    return t.x == v.x && t.y == v.y && t.z == v.z;
}

/**
 * A 4D vector
 * @constructor
 * @struct
 * @param {number=} x
 * @param {number=} y
 * @param {number=} z
 * @param {number=} w
 */
function Vec4(x, y, z, w) {
    if (typeof x == "undefined") x = 0;
    if (typeof y == "undefined") y = 0;
    if (typeof z == "undefined") z = 0;
    if (typeof w == "undefined") w = 0;
    if (x.constructor === Vec3) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        this.w = y;
    } else {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

/**
 * Multiplication
 * @param {(number|Vec4)} v
 * @return {?Vec4}
 */
Vec4.prototype.mult = function (v) {
    var t = this;
    if (typeof v === "number") return new Vec4(t.x*v, t.y*v, t.z*v, t.w*v);
    else if (v.constructor === Vec4) return new Vec4(t.x*v.x, t.y*v.y, t.z*v.z, t.w*v.w);
    else console.error("Vec4.prototype.mult called with invalid arguments");
}

/**
 * Division
 * @param {(number|Vec4)} v
 * @return {?Vec4}
 */
Vec4.prototype.div = function (v) {
    var t = this;
    if (typeof v === "number") return new Vec4(t.x/v, t.y/v, t.z/v, t.w/v);
    else if (v.constructor === Vec4) return new Vec4(t.x/v.x, t.y/v.y, t.z/v.z, t.w/v.w);
    else console.error("Vec4.prototype.div called with invalid arguments");
}

/**
 * Addition
 * @param {(number|Vec4)} v
 * @return {?Vec4}
 */
Vec4.prototype.add = function (v) {
    var t = this;
    if (typeof v === "number") return new Vec4(t.x+v, t.y+v, t.z+v, t.w+v);
    else if (v.constructor === Vec4) return new Vec4(t.x+v.x, t.y+v.y, t.z+v.z, t.w+v.w);
    else console.error("Vec4.prototype.add called with invalid arguments");
}

/**
 * Subtraction
 * @param {(number|Vec4)} v
 * @return {?Vec4}
 */
Vec4.prototype.subtract = function (v) {
    var t = this;
    if (typeof v === "number") return new Vec4(t.x-v, t.y-v, t.z-v, t.w-v);
    else if (v.constructor === Vec4) return new Vec4(t.x-v.x, t.y-v.y, t.z-v.z, t.w-v.w);
    else console.error("Vec4.prototype.subtract called with invalid arguments");
}

/**
 * Negation
 * @return {?Vec4}
 */
Vec4.prototype.neg = function () {
    var t = this;
    return new Vec4(-t.x, -t.y, -t.z, -t.w);
}

/**
 * Dot product
 * @param {Vec4} v
 * @return {?number}
 */
Vec4.prototype.dot = function (v) {
    var t = this;
    if (v.constructor === Vec4) return t.x*v.x + t.y*v.y + t.z*v.z + t.w*v.w;
    else console.error("Vec4.prototype.dot called with invalid arguments");
}

/**
 * Magnitude
 * @return {number}
 */
Vec4.prototype.mag = function () { // magnitude
    var t = this;
    return Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z+t.w*t.w);
}

/**
 * Check for equality
 * @return {boolean}
 */
Vec4.prototype.equals = function (v, eps) {
    var t = this;
    if (eps)
        return (t.x <= v.x+eps && t.x >= v.x-eps) &&
               (t.y <= v.y+eps && t.y >= v.y-eps) &&
               (t.z <= v.z+eps && t.z >= v.z-eps) &&
               (t.w <= v.w+eps && t.w >= v.w-eps);

    return t.x == v.x && t.y == v.y && t.z == v.z && t.w == v.w;
}

/**
 * @param {Vec3} rp
 * @param {Vec3} rd
 * @param {Vec3} pp
 * @param {Vec3} pn
 * @return {Vec3}
 */
function rayPlaneIntersect(rp, rd, pp, pn) { // ray position, ray direction, plane position, plane normal
    var d = pn.dot(rd);
    if (Math.abs(d) > .0001) {
        var t = pp.subtract(rp).dot(pn) / d;
        return rp.add(rd.mult(t));
    }
    return null;
}
