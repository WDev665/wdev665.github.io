let startPageBackground = document.querySelector('.start-page-background');
function fadeOut(){
    startPageBackground.style.opacity = 1;
    /*
    (function fade() {
        if ((startPageBackground.style.opacity -= .05) < 0) {
            startPageBackground.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
    */
    $('.start-page-background').fadeOut(2000);
    $('.fade').fadeOut(2000);
    $('.start-page').fadeOut(2000);
}
function textMovement() {
    $('.start-page-logo').fadeOut(2000);
}
setTimeout(function () {
    document.querySelector('.start-page').style.zIndex = 0;
},4500);
setTimeout(textMovement,3000);
setTimeout(fadeOut, 3000);
document.querySelector('.exit').addEventListener('click',function () {
    document.querySelector('.start-page').style.zIndex = 10;
    setTimeout(pageFadeIn,10);
});
function pageFadeIn() {
    $('.start-page-background').fadeIn(2000);
    $('.fade').fadeIn(2000);
    $('.start-page').fadeIn(2000);
    $('.start-page-logo').fadeIn(2000);
    setTimeout(redirect,2200);
}
function redirect() {
    window.location.replace('index.html');
}
