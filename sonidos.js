function sondioLetra(){
    if(sonido == 1){
        var random = Math.floor(Math.random() * 4) + 1;
        var audio = new Audio('sonidos/' + random + '.mp3');
        audio.play(); 
    }
}
function sondioGanar(){    
    if(sonido == 1){
    var audio = new Audio('sonidos/win.mp3');
    audio.play(); 
    }
}
function sondioError(){
    if(sonido == 1){
    var audio = new Audio('sonidos/wrong3.mp3');
    audio.play(); 
    }
}
function sondioReveal(){
    if(sonido == 1){
    var audio = new Audio('sonidos/reveal.mp3');
    audio.play(); 
    }
}
function sondioSelec(){
    if(sonido == 1){
    var random = Math.floor(Math.random() * 3) + 1;
    var audio = new Audio('sonidos/selec' + random + '.mp3');
    audio.play(); 
    }
}
function sondioRevealSacarLetrasExtra(){
    if(sonido == 1){
    var audio = new Audio('sonidos/revealextra.mp3');
    audio.play(); 
    }
}
function sondioNewLevel(){
    if(sonido == 1){
    var audio = new Audio('sonidos/newlevel.mp3');
    audio.play(); 
    }
}
function sondioerrorPlata(){
    if(sonido == 1){
    var audio = new Audio('sonidos/errorPlata.mp3');
    audio.play(); 
    }
}