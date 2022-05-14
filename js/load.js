(function() {
    var UNKNOWN = 0,
        STL_ASCII = 1,
        STL = 2,
        OBJ = 3;

    window.loadModel = function(file, model, callback) {
        var fr = new FileReader();
        fr.onload = function(e) {
            var buf = fr.result;
            var type = detectType(buf);
            var result;
            switch (type) {

                case STL_ASCII:
                    result = loadASCIISTL(buf);
                    break;

                case STL:
                    result = loadSTL(buf);
                    break;

                case OBJ:
                    result = loadOBJ(buf);
                    break;

                case UNKNOWN:
                    alert("Unrecognized file type");
                    break;

                default:
                    alert("Something has gone terribly wrong");
                    break;
            }
            adjust(result, model);
            callback && callback(result);
        };
        fr.onerror = function(e) {
            alert("an error occurred while trying to read the file");
            console.error("FileReader error", e);
        };
        fr.readAsArrayBuffer(file);
    };

    function detectType(buf) {
        if (String.fromCharCode.apply(null, new Uint8Array(buf, 0, 200)).match(/solid .*\s*facet normal/)) {
            return STL_ASCII;
        } else return STL;
        // TODO recognize moar
    }

    function adjust(vtx, model) { // center the model in front of the camera and set an decent starting scale
        var bb = boundingBox(vtx.vertices);
        var center = {x: (bb.x.m+bb.x.n)/2, y: (bb.y.m+bb.y.n)/2, z: (bb.z.m+bb.z.n)/2};
        var size = {x: bb.x.m-bb.x.n, y: bb.y.m-bb.y.n, z: bb.z.m-bb.z.n};
        var largest = Math.max(size.x, size.y, size.z);
        var s = .5/largest;
        model.mat.mat = [s, 0, 0, -center.x*s,
                         0, s, 0, -center.y*s,
                         0, 0, s, -center.z*s,
                         0, 0, 0, 1];
    }

    function boundingBox(vtx) {
        var bb = {x: {m: -Infinity, n: Infinity}, y: {m: -Infinity, n: Infinity}, z: {m: -Infinity, n: Infinity}}; // m is for max, n is for min
        for (var i = 0; i < vtx.length; i += 6) {
            if (vtx[i] > bb.x.m) bb.x.m = vtx[i];
            if (vtx[i] < bb.x.n) bb.x.n = vtx[i];
            if (vtx[i+1] > bb.y.m) bb.y.m = vtx[i+1];
            if (vtx[i+1] < bb.y.n) bb.y.n = vtx[i+1];
            if (vtx[i+2] > bb.z.m) bb.z.m = vtx[i+2];
            if (vtx[i+2] < bb.z.n) bb.z.n = vtx[i+2];
        }
        return bb;
    }

    // loading functions should return an {vertices: <Float32Array>, indices: <Uint16Array>};
    // each vertex is 3 numbers for position and 3 numbers for normal

    function loadSTL(buf) {
        var facets = (new Uint32Array(buf, 80, 1))[0];
        var v = new Float32Array(18*facets);
        var view = new DataView(buf, 84);
        for (var i = 0; i < facets; i++) {
            var j = 50*i;
            var k = 18*i;
            var nx = view.getFloat32(j, true);
            var ny = view.getFloat32(j+=4, true);
            var nz = view.getFloat32(j+=4, true);
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = nx;
            v[k++] = ny;
            v[k++] = nz;
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = nx;
            v[k++] = ny;
            v[k++] = nz;
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = view.getFloat32(j+=4, true);
            v[k++] = nx;
            v[k++] = ny;
            v[k++] = nz;
        }
        return {vertices: v, indices: null};
    }

    function loadASCIISTL(buf) {
        // *sigh* guess i shud get this done
        var str = buf2str(buf);
        var v = [];
        var regex = /\s*facet\s+normal\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s*outer\s+loop\s*vertex\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s*vertex\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s*vertex\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s*endloop\s*endfacet/g; // this is absolutely insane -_-
        var r;
        while (r=regex.exec(str)) {
            v.push(r[4], r[5], r[6], r[1], r[2], r[3], r[7], r[8], r[9], r[1], r[2], r[3], r[10], r[11], r[12], r[1], r[2], r[3]);
        }
        return {vertices: Float32Array.from(v, parseFloat), indices: null};
    }

    function loadOBJ(buf) {
        alert("OBJ is currently not supported");
    }

    function buf2str(buf) {
        var str = "";
        for (var i = 0; i < buf.byteLength; i += 5000) {
            if (buf.byteLength - i > 5000)
                str += String.fromCharCode.apply(null, new Uint8Array(buf, i, 5000));
            else
                str += String.fromCharCode.apply(null, new Uint8Array(buf, i, buf.byteLength - i));
        }
        return str;
    }

})();
