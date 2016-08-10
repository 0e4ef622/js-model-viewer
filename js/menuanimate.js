/* because css wont transition to an auto value, i have to do it myself -_- */

window.addEventListener("load", function() {
    var height = window.getComputedStyle(document.getElementById("menu")).height;
    var style = document.createElement("style");
    style.innerHTML = "#menutoggle:hover + #animatedmenu, #animatedmenu:hover { max-height: " + height + "; }";
    document.head.appendChild(style);
});
