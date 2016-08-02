// 兼容Android 4.4的webview
var root = document.getElementsByTagName('html')[0],
    resetW = document.getElementById('js-reset').width,
    NATIVE_W = 640;
function updateSize() {
    var w = window.innerWidth;
    var cw = w / (NATIVE_W / 100);
    root.style.fontSize = cw + 'px';
    var remWidth = resetW;
    if(remWidth !== w){
        cw = cw * w / remWidth;
        root.style.fontSize = cw + 'px';
    }
};
updateSize();
window.onload = updateSize;
window.onresize = updateSize;