window.addEventListener("load", function() {

    // file prompt

    var promptDiv = document.getElementById("fileprompt"),
        browseButton = document.getElementById("browse"),
        okButton = document.getElementById("ok"),
        filenameSpan = document.getElementById("filename"),
        fileinput = document.createElement("input"),
        fileSelected = false,
        callback = null;

    fileinput.type = "file";

    okButton.addEventListener("click", function() {
        if (fileSelected) {
            promptDiv.hidden = true;
            (typeof callback) == "function" && callback(fileinput.files[0]);
        } else {
            browseButton.style.backgroundColor = "yellow";
            setTimeout(function(){ browseButton.style.backgroundColor = ""; }, 500);
        }
    });

    browseButton.addEventListener("click", function() {
        fileinput.click();
    });

    fileinput.addEventListener("change", function() {
        filenameSpan.innerHTML = fileinput.value.replace(/^.*\\/,"");
        fileSelected = true;
    });

    window.filePrompt = function(lcallback) {
        filenameSpan.innerHTML = "";
        fileSelected = false;
        promptDiv.hidden = false;
        callback = lcallback;
    };

});

// settings menu

function setupMenu(camera) {
    var orbitbutton = document.getElementById("orbitmode");
    var freebutton = document.getElementById("freemode");

    orbitbutton.addEventListener("click", function() {
        camera.mode = ORBIT;
        camera.mat.mat = [1,0,0,0,0,1,0,0,0,0,1,2,0,0,0,1];
        orbitbutton.className = "ui selected";
        freebutton.className = "ui";
    });

    freebutton.addEventListener("click", function() {
        camera.mode = FREE;
        orbitbutton.className = "ui";
        freebutton.className = "ui selected";
    });
}
