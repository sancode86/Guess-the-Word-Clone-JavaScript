
var jugador = {
    "numeroNivel": 0,   
    "dineroJugador": 50,
    "fondo": 0,
    "sonido": 1
    };
if(localStorage.getItem("juegoPalabras") == undefined){
    localStorage.setItem("juegoPalabras", JSON.stringify(jugador));
    var nivel = 0;
    var guita = 50;
    var fondoImg = 0;
    var sonido = 1
}else{
    var datos = JSON.parse(localStorage.getItem("juegoPalabras"));
    var nivel = datos.numeroNivel;
    var guita = datos.dineroJugador;
    var fondoImg = datos.fondo;
    var sonido = datos.sonido
}
var opciones = document.getElementById("opcionesContenedor");
var estadoSonido = document.getElementById("estadoSonido");
if(sonido == 1){
    estadoSonido.innerHTML = "Activado"
}else{
    estadoSonido.innerHTML = "Desactivado"
}
for(let i=0; i<22; i++){ 
    var imagenes = document.createElement("button");
    imagenes.style.backgroundImage = "url('imagenes/fondos/" + i +".jpg')";  
    imagenes.setAttribute("onclick", "elegirImagen(" + i + ");"); 
    imagenes.setAttribute("class", "imagenesElegir sombrita");  
    imagenes.setAttribute("id", "imagen" + i);       
    opciones.appendChild(imagenes); 
}
document.getElementById("imagen" + fondoImg).setAttribute("class", "sombrita imagenesElegir elegida");

function elegirImagen(i){
    var actualizar = {
        "numeroNivel": nivel, 
        "dineroJugador": guita,
        "fondo": i,
        "sonido": sonido
        };     
    localStorage.setItem("juegoPalabras", JSON.stringify(actualizar)); 
    window.location.href = 'opciones.html'; 
}
function modoSonido(){  
    if(sonido == 1){
        var a = 0;
    }else{
        var a = 1;
    }  
    var actualizar = {
        "numeroNivel": nivel, 
        "dineroJugador": guita,
        "fondo": fondoImg,
        "sonido": a
        };     
    localStorage.setItem("juegoPalabras", JSON.stringify(actualizar)); 
    window.location.href = 'opciones.html'; 
}
function volver(){
    window.location.href = 'juego.html'; 
}

function resetearJuego(){    
var jugador = {
    "numeroNivel": 0,   
    "dineroJugador": 50,
    "fondo": 0,
    "sonido": 1
    };
    localStorage.setItem("juegoPalabras", JSON.stringify(jugador));
    window.location.href = 'index.html'; 
}