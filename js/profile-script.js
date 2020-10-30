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
    for ID ===> user['userID'];
    for login ===> user['userName'];
    for password ===> user['userPassword'];
    for status ===> ...
    ...

   Meets usage

   for topic ===> user['userMeets']['meetTopic'];
   for hour ===> ...

  Usage*/
async function updateWebData(){
    let user = await setUser();

    $('#user_status').text(user['userCurrentStatus']);
    $('#user_group').text(user['userDepartment']);
    /*User status*/
    if($('#user_status').text() === 'Не в роботі'){
        $('#user_status').css('color','red');
    }else if($('#user_status').text() === 'В роботі'){
        $('#user_status').css('color','green');
    }else{
        $('#user_status').text('No data');
        $('#user_status').css('color','lightgray');
    }

    if($('#user_status').text() === 'Не в роботі'){
        $('#switch-work').text('Розпочати роботу');
        $('#switch-work').removeClass('at-work-but')
    }else if($('#user_status').text() === 'В роботі'){
        $('#switch-work').text('Завершити роботу');
        $('#switch-work').addClass('at-work-but')
    }
    /*Meet*/
    if(user['userMeets']['meetData'] === ''){
        $('#last-meet').text('Немає активної зустрічі');
        $('#last-meet').css({
            color: 'gray',
            textAlign: 'center',
            paddingLeft: '30px'
        });
        $('.meetings-list').css({
            borderColor: 'gray'
        });
        $('.meetings-logo').css({
            backgroundImage: "url('img/speaker-n.png')"
        })
        isCreatedMeet = false;
    }else{
        $('#last-meet').text('');
        $('#last-meet').append('<span id="date"></span><span id="time"><b id="meet-h"></b>:<b id="meet-m"></b></span><span id="place"></span><span id="topic"></span><span id="for"></span>');
        $('#last-meet').css({
            color: '#0071c5',
            textAlign: 'auto',
            paddingLeft: '0'
        });
        $('.meetings-list').css({
            borderColor: '#0071c5'
        });
        $('.meetings-logo').css({
            backgroundImage: "url('img/speaker.png')"
        })
    }
    $('#date').text(user['userMeets']['meetData']);
    $('#meet-h').text(user['userMeets']['meetHour']);
    $('#meet-m').text(user['userMeets']['meetMinute']);
    $('#place').text(user['userMeets']['meetPlace']);
    $('#topic').text(user['userMeets']['meetTopic']);
    $('#for').text(user['userMeets']['meetGroup'] + "'s");

    setTimeout(updateWebData, 60000);
}

updateWebData();
/****************************/

let startPageBackground = document.querySelector('.start-page-background');
function fadeOut(){
    startPageBackground.style.opacity = 1;
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

/* Функціонал */
$('#switch-work').on('click', async function(){
    let value;
    if(user['userCurrentStatus'] === 'Не в роботі'){
        value = 'В роботі';
    }else{
        value = 'Не в роботі';
    }
    let fetch = await new Promise((resolve, reject) => firebase.database().ref('users/' + user['userID']).update({
        userCurrentStatus: value
    }, resolve)).then(r => updateWebData());

});

function updateTime(){
    let currentTime = moment().format('HH:mm:ss');
    $('#current-time').text(currentTime);
    setTimeout(updateTime, 1000);
}
updateTime();

function notification(){
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'audio/notification.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
    console.log('done!');
}
