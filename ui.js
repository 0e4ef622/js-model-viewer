window.addEventListener("load", function() {

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
