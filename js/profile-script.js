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

function checkData(){

    if(getCookie('login') === null){
        console.log('noCookieData');
        if(sessionStorage.getItem('login') !== null){
            let userData = updateUserData(sessionStorage.getItem('login'));
            console.log('someSessionStorageData');
            return userData;
        }else{
            window.location.replace('index.html');
            console.log('noSessionStorageData');
        }
    }else{
        let userData = updateUserData(getCookie('login'));
        console.log('someCookieData');
        return userData;
    }
    return userData;
}

function getData() {
    let users;
    $.ajax({
        url: "db/users.json",
        dataType: 'json',
        async: false,
        success: function (data) {
            $.getJSON("db/users.json", async function (json) {
                return json.users;
            });
            users = data.users;
            return users;
        }
    });
    return users;
}
let user;
function updateUserData(userLogin){
    let users = getData();
    let userData = users.find(x => x.userName === userLogin)
    user = updateData(userData);
    return user;
}



function updateData(data){
    let userData = data;
    return userData;
}

let userData = checkData();

console.log(userData);
/*Usage
    for ID ===> userData.userID;
    for login ===> userData.userName;
    for password ===> userData.userPassword;
    for status ===> ...
    ...
  Usage*/

function updateWebData(){
    $('#user_status').text(userData.userStatus);
    if($('#user_status').text() === 'Out of service'){
        $('#user_status').css('color','red');
    }else if($('#user_status').text() === 'In work'){
        $('#user_status').css('color','lightgreen');
    }else{
        $('#user_status').text('No data');
        $('#user_status').css('color','lightgray');
    }
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

    if(getCookie('login') !== null){
        setCookie('login', getCookie('login'), -1);
    }
    if(sessionStorage.getItem('login') !== null){
        sessionStorage.removeItem('login')
    }

    window.location.replace('index.html');
}
