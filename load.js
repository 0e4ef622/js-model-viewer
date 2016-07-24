(function() {
    var UNKNOWN = 0,
        STL_ASCII = 1,
        STL = 2,
        OBJ = 3;

    window.loadModel = function(file, callback) {
        var fr = new FileReader();
        fr.onload = function(e) {
            var buf = fr.result;
            var type = detectType(buf);
            var result;
            switch (type) {
                case STL_ASCII:
                    alert("ASCII STL is currently not supported");
                    break;
                case STL:
                    result = loadSTL(buf);
                    break;
                case OBJ:
                    alert("OBJ is currently not supported");
                    break;
                case UNKNOWN:
                    alert("Unrecognized file type");
                    break;
                default:
                    alert("Something has gone terribly wrong");
                    break;
            }
            callback && callback(result);
        };
        fr.onerror = function(e) {
            alert("an error occurred while trying to read the file");
            console.error("FileReader error", e);
        };
        fr.readAsArrayBuffer(file);
    };

    function detectType(buf) {
        if (String.fromCharCode.apply(null, new Uint8Array(buf, 0, 5)) == "solid") {
            return STL_ASCII;
        } else return STL;
        // TODO recognize moar
    }

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

})();
