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

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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

async function checkData(){
    if(getCookie('id') === null){
        console.log('noCookieData');
        if(sessionStorage.getItem('id') !== null){
            let user = await getUser(sessionStorage.getItem('id'));
            console.log('someSessionStorageData');
            return user;
        }else{
            window.location.replace('index.html');
            console.log('noSessionStorageData');
        }
    }else{
        let user = await getUser(getCookie('id'));
        console.log('someCookieData');
        return user;
    }
    return user;
}

async function getUser(userID) {
    return await new Promise((resolve, reject) => firebase.database().ref('users/' + userID).on('value', function (snapshot) {
        let user = snapshot.val();
        setTimeout(resolve(user), 1000);
    })).then((result) => {
        user = result;
        return user;
    });
}

async function setUser(){
    let user = await checkData();
    return user;
}
/*Usage
    for ID ===> userData['userID'];
    for login ===> userData['userName'];
    for password ===> userData['userPassword'];
    for status ===> ...
    ...
  Usage*/

async function updateWebData(){
    let user = await setUser();
    $('#user_status').text(user['userStatus']);
    $('#user_group').text(user['userDepartment']);
    /*User status*/
    if($('#user_status').text() === 'Out of service'){
        $('#user_status').css('color','red');
    }else if($('#user_status').text() === 'In work'){
        $('#user_status').css('color','lightgreen');
    }else{
        $('#user_status').text('No data');
        $('#user_status').css('color','lightgray');
    }
    /*User department*/
}

updateWebData();
/****************************/

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

    if(getCookie('id') !== null){
        setCookie('id', getCookie('login'), -1);
    }
    if(sessionStorage.getItem('id') !== null){
        sessionStorage.removeItem('id')
    }

    window.location.replace('index.html');
}


// Work Info

let dropdownTaskbar = document.querySelector('.taskbar');
$('.dropdown').on('click', function () {
    $('.taskbar').toggleClass('closed opened');
    $('.dropdown-arrow').toggleClass('closed-arrow opened-arrow')
});
let seconds = 0;
let minutes = 0;
let hours = 0;
function timer(){
    if(seconds<9){
        seconds += 1;
        document.querySelector('.seconds').innerHTML = '0' + seconds;
    }
    else if(seconds>=9&&seconds<59){
        seconds += 1;
        document.querySelector('.seconds').innerHTML = seconds;
    }
    else if(seconds === 59&&minutes<9){
        seconds = 0;
        minutes += 1;
        document.querySelector('.minutes').innerHTML = '0' + minutes;
    }
    else if(seconds === 59&&minutes>=9&&minutes<59){
        seconds = 0;
        minutes += 1;
        document.querySelector('.minutes').innerHTML = minutes;
    }
    else if(seconds === 59&&minutes === 59&&hours<9){
        seconds = 0;
        minutes = 0;
        hours += 1;
        document.querySelector('.hours').innerHTML = '0' + hours;
    }
    else if(seconds === 59&&minutes === 59&&hours>=9){
        seconds = 0;
        minutes = 0;
        hours += 1;
        document.querySelector('.hours').innerHTML = hours;
    }
}
$('.work-start').on('click',function () {
    setInterval(timer,1000);
});

/* Функціонал */
