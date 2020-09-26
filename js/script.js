/*Скрипт форми*/
let isPassVisible = false;

$('.password-status').on('click', function(){
    if(!isPassVisible){
        $('input[name="password"]').attr('type', 'text');
        isPassVisible = true;
    }else if(isPassVisible){
        $('input[name="password"]').attr('type', 'password');
        isPassVisible = false;
    }
});

/*Скріпт анімованої загрузки*/

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
}
function textMovement(){
    $('h1').animate({
        top: '19%',
        fontSize: '3em'
    },1500);
}
setTimeout(function () {
    document.querySelector('.start-page').style.zIndex = 0;
},4500);
setTimeout(textMovement,3000);
setTimeout(fadeOut, 3000);

/*Авторизація*/
$.getJSON("db/users.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});