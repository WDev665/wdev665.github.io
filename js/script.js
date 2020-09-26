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