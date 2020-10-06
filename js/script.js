/*Скрипт форми*/
let isPassVisible = false;

$('.password-status').on('click', function(){
    if(!isPassVisible){
        $('input[name="password"]').attr('type', 'text');
        $('.password-status').css('background-image','url(img/pass-icon-h.png)');
        isPassVisible = true;
    }else if(isPassVisible){
        $('input[name="password"]').attr('type', 'password');
        $('.password-status').css('background-image','url(img/pass-icon.png)');
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
let users;
let userId;
let userFounded = false;
let userAllowed = false;
let isButtonPressed = false;

checkMe();

$.getJSON("db/users.json", function(json) {
    console.log(json);
    users = json.users;
});



function authorizing(){
    if(isButtonPressed){
        console.log('false');
    }else{
        isButtonPressed = true;
        $('#sign-in').attr('class','innactive');
    }

    let login = $('input[name="login"]').val();
    let pass = $('input[name="password"]').val();

    for(let i = 0; i < users.length; i++) {
        if (users[i]['userName'] === login) {
            userFounded = true;
            userId = i;

            checkPass(userId, pass);
            return false;
        }
    }

    function checkPass(id, pass){
        if(users[id]['userPassword'] === pass){
            userAllowed = true;
            if($('input[name="remember_me"]').is(':checked')){
                rememberMe(login, pass);
            }else{
                rememberMeTemporarily(login, pass);
            }
            setTimeout(exit, 500);
            setTimeout(signIn, 2200);
            console.log('userAllowed');

            $('.login-status').css('background-image', 'url(img/login-icon-allowed.png)');
            if(isPassVisible){
                $('.password-status').css('background-image', 'url(img/pass-icon-h-allowed.png)');
            }else{
                $('.password-status').css('background-image', 'url(img/pass-icon-allowed.png)');
            }
        }else{
            console.log('wrongPassword');
            $('.login-status').css('background-image', 'url(img/login-icon-allowed.png)');

            if(isPassVisible){
                $('.password-status').css('background-image', 'url(img/pass-icon-h-denied.png)');
            }else{
                $('.password-status').css('background-image', 'url(img/pass-icon-denied.png)');
            }
        }
    }

    if(!userFounded){
        console.log('unavailableUser!');
        $('.login-status').css('background-image', 'url(img/login-icon-denied.png)');
        isButtonPressed = false;
        $('#sign-in').attr('class','');
    }
}

/*Cookies functions*/
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}

function rememberMeTemporarily(log, pass){
    let login = log;
    let password = pass;

    sessionStorage.setItem('login', login);
}

function checkMe(){
    if(getCookie('login') !== null || sessionStorage.getItem('login') !== null){
        signIn();
    }
}

function rememberMe(log, pass){
    let login = log;
    let password = pass;

    setCookie('login', login, 999);
    console.log('yes2')
}

function signIn(){
    window.location.replace('profile.html');
}


/*Функція зворотньої анімації*/
function reverseTextMovement(){
    $('h1').animate({
        top: '30%',
        fontSize: '6em'
    },1500);
}

function exit(){
    document.querySelector('.start-page').style.zIndex = 5;
    $('.start-page-background').fadeIn(2000);
    reverseTextMovement();
}

// кінець функції зворотньої анімації
 