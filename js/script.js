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
let user;
let userID;
let userFounded = false;
let userAllowed = false;
let isButtonPressed = false;
const config = {
    apiKey: "AIzaSyCTkZMzqP_CwwqY3Y0A0DzFGhL6UuopXPY",
    authDomain: "logbook-aa07a.firebaseapp.com",
    databaseURL: "https://logbook-aa07a.firebaseio.com",
    projectId: "logbook-aa07a",
    storageBucket: "logbook-aa07a.appspot.com",
    messagingSenderId: "958268494693",
    appId: "1:958268494693:web:9b6549f068f1b233ac878c"
};
firebase.initializeApp(config);
const database = firebase.database();

async function getUserID(userName) {
    return await new Promise((resolve, reject) => firebase.database().ref('ids/').on('value', function (snapshot) {
        let ids = snapshot.val();
        setTimeout(resolve(ids), 1000);
    })).then((result) => {
        ids = result;
        console.log('User founded and his id ==> ' + ids[userName]);
        return ids[userName];
    });
}

async function getUser(userID) {
    return await new Promise((resolve, reject) => firebase.database().ref('users/' + userID).on('value', function (snapshot) {
        let user = snapshot.val();
        setTimeout(resolve(user), 1000);
    })).then((result) => {
        user = result;
        console.log('Success get method!User info: ==>\n' + user);
        console.log('Users current status ==>' + user['userCurrentStatus']);
        return user;
    });
}

function checkMe(){
    if(getCookie('id') !== null || sessionStorage.getItem('id') !== null){
        signIn();
    }
}

checkMe();

async function authorizing(){
    if(isButtonPressed){
        return false;
    }else{
        isButtonPressed = true;
        $('#sign-in').attr('class','innactive');
    }

    let login = $('input[name="login"]').val();
    let pass = $('input[name="password"]').val();

    userID = await getUserID(login);

    userFounded = userID !== undefined;
    if(userFounded){
        user = await getUser(userID);
        checkPass(user, pass);
    }

    function checkPass(user, pass){
        console.log(user);
        console.log(pass);
        console.log(user['userPassword']);
        if(userFounded){
            $('.login-status').css('background-image', 'url(img/login-icon-allowed.png)');
            if(!Boolean(pass)){
                if(isPassVisible){
                    $('.password-status').css('background-image', 'url(img/pass-icon-h-denied.png)');
                }else{
                    $('.password-status').css('background-image', 'url(img/pass-icon-denied.png)');
                }

            }
        }
        if(!Boolean(pass)){
            return false;
        }

        if(user['userPassword'] === pass){
            userAllowed = true;
            if($('input[name="remember_me"]').is(':checked')){
                rememberMe(userID);
            }else{
                rememberMeTemporarily(userID);
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
    }
    $('#sign-in').attr('class','');
    isButtonPressed = false;
}

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

function rememberMeTemporarily(userID){
    sessionStorage.setItem('id', userID);
}

function rememberMe(log, pass){
    setCookie('id', userID, 999);
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

 