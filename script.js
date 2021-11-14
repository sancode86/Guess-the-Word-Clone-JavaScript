initTime();
var bodyId = document.getElementById("bodyId");
var secondsMostrar = 0;
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
bodyId.style.backgroundImage = "url('imagenes/fondos/" + fondoImg +".jpg')";
if(nivel >= adivinanzas.length){
    console.log("ganaste");
    window.location.href = 'ganaste.html'; 
}
console.log("cantidad de acertijos", adivinanzas.length);
document.getElementById("mostrarDineroTexto").innerHTML = guita;
var contenedorPreguntaId = document.getElementById("contenedorPregunta")
var puedoMeterAntes = 0;
var costoPista = 0;
var indicadorParaPoderSacar = 0;
var ganadoTotalPorPasarDeNivel= 0;
var lugaresEnBlanco = [];
var cantidadDePistasMostradas = 0;
var ponerEnLibres = 0;
var noAgregar = 0;
var listoChequeoBlancoPos = 0;
var hayLetraEnElUltimoPuesta = 0;
var casilleroSeleccionado = "no";
var casilleroSeleccionadoNumero = "no"
let preguntaTexto = document.getElementById("preguntaId");
var textoGanarFraseId = document.getElementById("textoGanarFrase");

var botonPistaId = document.getElementById("botonPista");
let respuestaTexto = document.getElementById("respuestaId");
let letrasRespuesta = document.getElementById("letrasRespuestaId");
var segundosId = document.getElementById("segundos");
let casillerosRespuesta = document.getElementById("casillerosRespuestaId");
let nivelId = document.getElementById("nivelId");
nivelId.innerHTML = "Nivel " + (nivel + 1);
let mezclaRespuesta = [];
var espaciosEnBlanco = 0;
let respuestaDelJugador = [];
var respuestaSinEspacios=[]
let pregunta = adivinanzas[nivel].pregunta;
let respuesta = adivinanzas[nivel].respuesta;
let detectarEspacios = [...respuesta];
var letrasDeMentira = [];
var varLetraCont;
var letraAgregar;
var varLetraVacia;
var varPistaMostr;
if (pregunta.length > 100){ 
    contenedorPreguntaId.style.fontSize = "14px"
}
if (pregunta.length > 150){
    contenedorPreguntaId.style.fontSize = "11px"
}
for(let i=0; i<detectarEspacios.length; i++){
    if(detectarEspacios[i] == " "){
        detectarEspacios[i] = "ESPACIO";
        espaciosEnBlanco ++
    }
}
startTimer();
sondioNewLevel();
nuevaAdivinanza(nivel);  
function nuevaAdivinanza(nivel){    
    for(let i=0; i<respuesta.length; i++){
        mezclaRespuesta.push(respuesta[i]);
    } 
    //sacar los espacios
    for(let i=0; i<mezclaRespuesta.length; i++){
        if(mezclaRespuesta[i] == " "){        
            mezclaRespuesta.splice(i,1);
        }
    }    
    respuestaSinEspacios = [...mezclaRespuesta]
    for (let i = mezclaRespuesta.length - 1; i > 0; i--) {
        
        const j = Math.floor(Math.random() * (i + 1));
        [mezclaRespuesta[i], mezclaRespuesta[j]] = [mezclaRespuesta[j], mezclaRespuesta[i]];
    }
    //Agregar letras de mentira   
    var letrasSueltas = 'abcdefghijklmnoñpqrstuvwxyz'
    var letrasRandom = []; 
    for(let i=0; i<letrasSueltas.length; i++){
        letrasRandom.push(letrasSueltas[i]);
    }
    letrasRandom = letrasRandom.filter(val => !mezclaRespuesta.includes(val));
    var numCant = Math.floor(Math.random() * 3) + 1;
    for ( var i = 0; i < numCant; i++ ) {          
        var num = Math.floor(Math.random() * letrasRandom.length) + 0;
        mezclaRespuesta.push(letrasRandom[num]);
        letrasDeMentira.push(letrasRandom[num]);
   } 
   if(respuestaSinEspacios.length >= 10 && espaciosEnBlanco >= 1){
     
    varLetraCont  = "botonLetraEnContenedorLarga";
    varLetraVacia = "botonLetraVaciaLarga";
    varPistaMostr = "botonPistaMostrandoLarga"
    letraAgregar = "botonLetraLarga"
   }else{
 
    varLetraCont  = "botonLetraEnContenedor";
    varLetraVacia = "botonLetraVacia";
    varPistaMostr = "botonPistaMostrando"
    letraAgregar = "botonLetra"
   }
   if(respuestaSinEspacios.length > 9 && espaciosEnBlanco == 0){
    letraAgregar = "botonLetraLarga"
    varLetraCont  = "botonLetraEnContenedorLarga";
    varLetraVacia = "botonLetraVaciaLarga";
    varPistaMostr = "botonPistaMostrandoLarga"
   }else{
            if(espaciosEnBlanco == 0){
                varLetraCont  = "botonLetraEnContenedor";
                varLetraVacia = "botonLetraVacia";
                varPistaMostr = "botonPistaMostrando"
                letraAgregar = "botonLetra"
            }
   }
    crearCasillerosRespuesta(respuesta);
    crearLetrasRespuesta(mezclaRespuesta);   
    preguntaTexto.innerHTML = pregunta;
}
function crearCasillerosRespuesta(respuesta){
    chequearTamaños()
if(noAgregar == 0){
    let indicadorLugar = 0
    var array = [...respuesta];
    let pos = 0;
    //preparar el array con 1 o espacios para completar
    for(let i=0; i<respuesta.length; i++){
        if(array[i] != " "){
        array[i] = 1;
        }else{
            array[i] = "ESPACIO";  
            if(listoChequeoBlancoPos == 0){
                lugaresEnBlanco.push(i);               
            }
        }
    }
    listoChequeoBlancoPos = 1;
    let arrayACheckear = [...respuestaDelJugador]
    //meter las letras que tiene el jugador
    do{
        if(array[pos] != "ESPACIO"){
            array[pos] = arrayACheckear.shift();
        }
    pos++
    }while (arrayACheckear.length > 0)
    //limpiar undefinedes por las dudas
    for(let i=0; i<array.length; i++){
        if(array[i] == undefined || array[i] == "" ){
            array[i] = 1;
        }
    }
    casillerosRespuesta.innerHTML = "";  
     for(let i=0; i<array.length; i++){
        if(espaciosEnBlanco != 0){
            indicadorLugar = i;       
            }
        if(array[i] != 1 && array[i] != "ESPACIO"){  
            var buttonLetras = document.createElement("button");
            buttonLetras.innerHTML = array[i];               
            var letra = JSON.stringify(array[i]);
            buttonLetras.setAttribute("onclick", "sacarLetra(" + indicadorLugar + "," + letra + ");"); 
            buttonLetras.setAttribute("class", varLetraCont);   
            buttonLetras.setAttribute("id", "casilleroLlenoId" + i + "");         
            casillerosRespuesta.appendChild(buttonLetras); 
            indicadorLugar ++        
        }     
        if(array[i] == 1){  
            var buttonLetras = document.createElement("button");
            buttonLetras.innerHTML = "&nbsp;";   
            buttonLetras.setAttribute("class", varLetraVacia);  
            buttonLetras.setAttribute("onclick", "seleccionarCasillero(" + i + ");");    
            buttonLetras.setAttribute("id", "casilleroVacioId" + i + "");     
            casillerosRespuesta.appendChild(buttonLetras);        
            indicadorLugar ++  
        }
        if(array[i] == "ESPACIO"){  
            var espacio = document.createElement("p");    
            espacio.innerHTML = " ";   
            casillerosRespuesta.appendChild(espacio);         
        }     
    } 
}
}
function crearLetrasRespuesta(mezclaRespuesta){
    letrasRespuesta.innerHTML = "";
    for(let i=0; i<mezclaRespuesta.length; i++){
        var buttonLetras = document.createElement("button");
        buttonLetras.innerHTML = mezclaRespuesta[i];   
        var letra = JSON.stringify(mezclaRespuesta[i]);
        buttonLetras.setAttribute("onclick", "agregarLetra(" + i + "," + letra + ");"); 
        buttonLetras.setAttribute("class", letraAgregar); 
        letrasRespuesta.appendChild(buttonLetras); 
    }
}
function agregarLetra(i, letra){      

    var lugar = i;
    chequearTamañosAlAgre();
    chequearSiPuedoMeterlaAntes(lugar, letra);
    if(puedoMeterAntes == 0){

        var restaPorEspBlanco = 0;
        if(espaciosEnBlanco != 0){
            for(let i=0; i<lugaresEnBlanco.length; i++){
                if(lugaresEnBlanco[i] < casilleroSeleccionadoNumero){
                restaPorEspBlanco += 1;
                }
            } 
        }
        if(noAgregar == 0 && ponerEnLibres != 1){
     
            if(hayLetraEnElUltimoPuesta == 1 && casilleroSeleccionado == "no"){     
            }else{        
            if (casilleroSeleccionado == "si"){
                respuestaDelJugador[casilleroSeleccionadoNumero - restaPorEspBlanco] = letra;
                mezclaRespuesta.splice(i,1);
            }else{             
                respuestaDelJugador.push(letra);
                mezclaRespuesta.splice(i,1);
            }        
            casilleroSeleccionado = "no"
            casilleroSeleccionadoNumero = "no"
            crearLetrasRespuesta(mezclaRespuesta);
            crearCasillerosRespuesta(respuesta);
            chequearVictoria();
            chequearError();
            chequearSiHayLetraAlFinal();
            }
        }    
        if(ponerEnLibres == 1  && casilleroSeleccionado == "no"){
    
            var detener = 0; 
            for(var f=0; f<respuestaDelJugador.length; f++){  
                if((respuestaDelJugador[f] == null || respuestaDelJugador[f] == 1 || respuestaDelJugador[f] == undefined) && detener == 0){   
                    respuestaDelJugador[f] = letra; 
                    mezclaRespuesta.splice(lugar,1);            
                    detener = 1;
                }
            }
            ponerEnLibres = 0; 
            dibujarIgual(respuesta);
            crearLetrasRespuesta(mezclaRespuesta);
            chequearVictoria();
            chequearError();
        }else{
    
            if(casilleroSeleccionado == "si"){
        
                respuestaDelJugador[casilleroSeleccionadoNumero] = letra; 
                mezclaRespuesta.splice(lugar,1);  
                casilleroSeleccionado = "no"
                dibujarIgual(respuesta);
                crearLetrasRespuesta(mezclaRespuesta);
                chequearVictoria();
                chequearError();
             }
        }   
    }
    puedoMeterAntes = 0;
    sondioLetra();


    
}
function sacarLetra(i, letra){ 
   var asdasd = i;
    var restaPorEspBlanco = 0;
    if(espaciosEnBlanco != 0){
        for(let i=0; i<lugaresEnBlanco.length; i++){
            if(lugaresEnBlanco[i] < asdasd){
            restaPorEspBlanco += 1;
            }
        } 
    }  
    mezclaRespuesta.push(letra) 
    respuestaDelJugador[i - restaPorEspBlanco] = 1;
    crearCasillerosRespuesta(respuesta);
    crearLetrasRespuesta(mezclaRespuesta);
    if(noAgregar == 1){
        dibujarIgual(respuesta);
    }    
    sondioLetra();    
    //nuevo cambio
    ponerEnLibres = 1
}
function chequearVictoria(){  
    let respReal = respuestaSinEspacios.toString();
    let respJug = respuestaDelJugador.toString();
    var ganaste = document.getElementById("ganasteId");
    var contenido = document.getElementById("contenidoId");    
    if(respReal == respJug){
        sondioGanar();
        endTimer();
        mostrarMonedasVictoria();    
        
        var randomFrase = Math.floor(Math.random() * frasesFelicitar.length) + 0;

        textoGanarFraseId.innerHTML = frasesFelicitar[randomFrase];

        var jugador = {
            "numeroNivel": nivel += 1,  
            "dineroJugador": guita += ganadoTotalPorPasarDeNivel,
            "fondo": fondoImg,
            "sonido": sonido 
            };     
        localStorage.setItem("juegoPalabras", JSON.stringify(jugador)); 
       for(let z=0; z<respuestaDelJugador.length + espaciosEnBlanco; z++){ 
            var colorError = document.getElementById("casilleroLlenoId" + z)             
            if(colorError != null || colorError != undefined){
                colorError.style.borderColor = "green";
                colorError.setAttribute("class", varLetraCont + " colorCorrecto animate__animated animate__flash");          
                colorError.disabled = "true";
            }
        } 
        setTimeout(function() {   
            contenido.style.display = "none"         
            ganaste.style.display = "block"    
            siguienteNivelGanar();
         }, 2000);        
    }
}
function siguienteNivelGanar(){  
    setTimeout(function() {   
        window.location.href = 'juego.html';
     }, 30000);   
}
function botonSiguienteNivelGanar(){  
    sondioLetra();
    setTimeout(function() {           
        window.location.href = 'juego.html';
     }, 1000);   
}
function seleccionarCasillero(i){
    sondioSelec();
    casilleroSeleccionado = "si";
    casilleroSeleccionadoNumero = i;
    for(let z=0; z<mezclaRespuesta.length; z++){   
        var limpiar = document.getElementById("casilleroVacioId" + z);       
        if(limpiar != null || limpiar != undefined){
            limpiar.style.borderColor = "transparent";
        }
    }
    document.getElementById("casilleroVacioId" + i).style.borderColor = "green"; 
    document.getElementById("casilleroVacioId" + i).setAttribute("class", varLetraVacia + " animate__animated animate__pulse");   
}
function chequearError(){  
    noPonerEnRojo = 0;
    let respReal = respuestaSinEspacios.toString();
    let respJug = respuestaDelJugador.toString();  
    for(let z=0; z<respuestaDelJugador.length; z++){                   
        if(respuestaDelJugador[z] == 1){
           noPonerEnRojo = 1;
        }
    }    
    if(respReal != respJug && respReal.length == respJug.length && noPonerEnRojo == 0){

        for(let z=0; z<respuestaDelJugador.length + espaciosEnBlanco; z++){ 
            var colorError = document.getElementById("casilleroLlenoId" + z)             
            if(colorError != null || colorError != undefined){
                colorError.style.borderColor = "red";
                colorError.setAttribute("class", varLetraCont + " colorError animate__animated animate__flash");          
            }
        } 
        sondioError();   
    }
}
function chequearSiHayLetraAlFinal(){
    if(espaciosEnBlanco == 0){
        var contarLlenos = document.getElementById("casilleroLlenoId" + ((respuestaSinEspacios.length - 1) + espaciosEnBlanco))   
        if(contarLlenos != null || contarLlenos != undefined){
            hayLetraEnElUltimoPuesta = 1
        }else{
            hayLetraEnElUltimoPuesta = 0     
        }    
    } 
}
function chequearTamaños(){ 
        if(respuestaDelJugador.length  > respuestaSinEspacios.length){                            
            noAgregar = 1;
        }else{  
        }
}
function chequearTamañosAlAgre(){
        if(((respuestaDelJugador.length + 1)  > respuestaSinEspacios.length) && casilleroSeleccionado == "no"){      
            noAgregar = 1;
            ponerEnLibres = 1;
        }else{
            noAgregar = 0;
        }    
}
function dibujarIgual(respuesta){
    chequearTamaños()
    let indicadorLugar = 0
    var array = [...respuesta];
    let pos = 0;
    //preparar el array con 1 o espacios para completar
    for(let i=0; i<respuesta.length; i++){
        if(array[i] != " "){
        array[i] = 1;
        }else{
            array[i] = "ESPACIO";  
            if(listoChequeoBlancoPos == 0){
                lugaresEnBlanco.push(i);               
            }
        }
    }
    listoChequeoBlancoPos = 1;
    let arrayACheckear = [...respuestaDelJugador]
    //meter las letras que tiene el jugador
    do{
        if(array[pos] != "ESPACIO"){
            array[pos] = arrayACheckear.shift();
        }
    pos++
    }while (arrayACheckear.length > 0)
    //limpiar undefinedes por las dudas
    for(let i=0; i<array.length; i++){
        if(array[i] == undefined || array[i] == "" ){
            array[i] = 1;
        }
    }
    casillerosRespuesta.innerHTML = "";  
     for(let i=0; i<array.length; i++){
        if(espaciosEnBlanco != 0){
            indicadorLugar = i;       
            }
        if(array[i] != 1 && array[i] != "ESPACIO"){  
            var buttonLetras = document.createElement("button");
            buttonLetras.innerHTML = array[i];               
            var letra = JSON.stringify(array[i]);
            buttonLetras.setAttribute("onclick", "sacarLetra(" + indicadorLugar + "," + letra + ");"); 
            buttonLetras.setAttribute("class", varLetraCont);   
            buttonLetras.setAttribute("id", "casilleroLlenoId" + i + "");         
            casillerosRespuesta.appendChild(buttonLetras); 
            indicadorLugar ++        
        }     
        if(array[i] == 1){  
            var buttonLetras = document.createElement("button");
            buttonLetras.innerHTML = "&nbsp;";   
            buttonLetras.setAttribute("class", varLetraVacia);  
            buttonLetras.setAttribute("onclick", "seleccionarCasillero(" + i + ");");    
            buttonLetras.setAttribute("id", "casilleroVacioId" + i + "");     
            casillerosRespuesta.appendChild(buttonLetras);        
            indicadorLugar ++  
        }
        if(array[i] == "ESPACIO"){  
            var espacio = document.createElement("p");    
            espacio.innerHTML = " ";   
            casillerosRespuesta.appendChild(espacio);         
        }     
    } 
}
function mostrarPista(){
    if(guita < costoPista){
        console.log("no hay suficiente dinero")
        var efectoNoPlata = document.getElementById("mostrarDineroTexto");
        efectoNoPlata.style.color = "red"
        efectoNoPlata.setAttribute("class", "dinero animate__animated animate__heartBeat");    
        sondioerrorPlata();     
    }
    var random = Math.floor(Math.random() * (respuestaSinEspacios.length + 1));
    var restaPorEspBlanco = 0;
        if(espaciosEnBlanco != 0){
            for(let i=0; i<lugaresEnBlanco.length; i++){
                if(lugaresEnBlanco[i] < random){
                restaPorEspBlanco += 1;
                }
            } 
        }
    if(cantidadDePistasMostradas > 0 && guita >= costoPista){      
        var mostrarPista = document.getElementById("casilleroVacioId" + random)   
        if(mostrarPista != null || mostrarPista != undefined){
            mostrarPista.innerHTML = respuestaSinEspacios[random - restaPorEspBlanco]
            mostrarPista.setAttribute("class", varPistaMostr + " animate__animated animate__bounce");  
            botonPistaId.setAttribute("class", "botonSticker animate__animated animate__pulse");         
            sondioReveal();
            botonPistaId.disabled = true;
            setTimeout(function() {   
                botonPistaId.setAttribute("class", "botonSticker");  
                botonPistaId.disabled = false;
                mostrarPista.innerHTML = "";
                dibujarIgual(respuesta);
             }, 1500);  
             cantidadDePistasMostradas += 1;          
             actualizarCostoPista();    
        }else{           
            var mostrarPista = document.getElementById("casilleroLlenoId" + random)   
            if(mostrarPista != null || mostrarPista != undefined){
                mostrarPista.innerHTML = respuestaSinEspacios[random - restaPorEspBlanco]
                mostrarPista.setAttribute("class", varPistaMostr + " animate__animated animate__bounce");    
                botonPistaId.setAttribute("class", "botonSticker animate__animated animate__pulse");      
                sondioReveal();
                botonPistaId.disabled = true;
                setTimeout(function() {   
                    botonPistaId.setAttribute("class", "botonSticker");  
                    botonPistaId.disabled = false;
                    mostrarPista.innerHTML = "";
                    dibujarIgual(respuesta);
                 }, 1500);  
                 cantidadDePistasMostradas += 1;                   
                 actualizarCostoPista();    
            }else{
                test()
            }
        }  
    }
    if(cantidadDePistasMostradas == 0 && guita >= costoPista){
        var mostrarPista = document.getElementById("casilleroLlenoId0")   
        if(mostrarPista != null || mostrarPista != undefined){
            mostrarPista.innerHTML = respuestaSinEspacios[0]
            mostrarPista.setAttribute("class", varPistaMostr + " animate__animated animate__bounce");  
            botonPistaId.setAttribute("class", "botonSticker animate__animated animate__pulse");        
            sondioReveal();
            botonPistaId.disabled = true;
            setTimeout(function() { 
                botonPistaId.setAttribute("class", "botonSticker");  
                botonPistaId.disabled = false;
                mostrarPista.innerHTML = "";
                dibujarIgual(respuesta);
             }, 1500);             
             cantidadDePistasMostradas += 1;   
             actualizarCostoPista(); 
        }else{
            var mostrarPista = document.getElementById("casilleroVacioId0")   
            mostrarPista.innerHTML = respuestaSinEspacios[0]   
            mostrarPista.setAttribute("class", varPistaMostr + " animate__animated animate__bounce"); 
            botonPistaId.setAttribute("class", "botonSticker animate__animated animate__pulse"); 
            sondioReveal();
            botonPistaId.disabled = true;
            setTimeout(function() {  
                botonPistaId.setAttribute("class", "botonSticker");  
                botonPistaId.disabled = false;
                mostrarPista.innerHTML = "";
                dibujarIgual(respuesta);
             }, 1500);              
             cantidadDePistasMostradas += 1;  
             actualizarCostoPista(); 
        }  
    }
}
function actualizarCostoPista(){
    guita -= costoPista;
    var mostrar = guita;   
        var actualizar = {
            "numeroNivel": nivel, 
            "dineroJugador": mostrar,
            "fondo": fondoImg,
            "sonido": sonido
            };  
    localStorage.setItem("juegoPalabras", JSON.stringify(actualizar));   
    document.getElementById("mostrarDineroTexto").innerHTML = mostrar;
    costoPista += 2;
        if(costoPista > 0){
            document.getElementById("precioPista").innerHTML = "&nbsp;$ " + costoPista + "&nbsp;";
            document.getElementById("precioPistaContenedor").style.backgroundColor = "#fdfd80b5";            
        }
}
function test(){ 
    mostrarPista();
}
function chequearSiPuedoMeterlaAntes(lugar, letra){
    var indicador; 
    var stop = 0;
    for(let z=0; z<respuestaDelJugador.length; z++){ 
        if(respuestaDelJugador[z] == undefined && casilleroSeleccionado == "no" && stop == 0){
            puedoMeterAntes = 1 
            indicador = z;       
            stop = 1;
        }
    }
    stop = 0;
    if(puedoMeterAntes == 1){ 
        respuestaDelJugador[indicador] = letra; 
        mezclaRespuesta.splice(lugar,1);  
        crearLetrasRespuesta(mezclaRespuesta);
        crearCasillerosRespuesta(respuesta);
        dibujarIgual(respuesta);
        chequearVictoria();
        chequearError();      
    }
}
function mostrarMonedasVictoria(){
var bonus = 0;
var dineroPasarNivel = 5;
var texto = "velocidad";
if(secondsTotal <= 10){
    bonus = 10;
    var texto = "< 10 seg";
}
if(secondsTotal < 60 && secondsTotal > 10){
    bonus = 5;
    var texto = "< 1 min";
}
 var totalDinero = dineroPasarNivel + bonus;
    document.getElementById("tiempoTotal").innerHTML = "Tiempo total " + secondsTotal + " Seg";  
    document.getElementById("bonusTexto").innerHTML = "Bonus por " + texto +" $ " + bonus ;     
    document.getElementById("dineroGanado").innerHTML = "Monedas ganadas $ " + totalDinero ; 
    ganadoTotalPorPasarDeNivel = totalDinero;
}
function sacarFalsas(){
    if(guita < 50){
        console.log("no hay suficiente dinero")
        var efectoNoPlata = document.getElementById("mostrarDineroTexto");
        efectoNoPlata.style.color = "red"
        efectoNoPlata.setAttribute("class", "dinero animate__animated animate__heartBeat");    
        sondioerrorPlata();     
    }
    if(indicadorParaPoderSacar == 0 && guita >= 50){
        guita -= 50;
        var mostrar = guita;       
            var actualizar = {
                "numeroNivel": nivel, 
                "dineroJugador": mostrar,
                "fondo": fondoImg,
                "sonido": sonido
                };      
        localStorage.setItem("juegoPalabras", JSON.stringify(actualizar));   
        document.getElementById("mostrarDineroTexto").innerHTML = mostrar;
        sondioRevealSacarLetrasExtra();
        mezclaRespuesta = mezclaRespuesta.filter(val => !letrasDeMentira.includes(val));
        respuestaDelJugador = respuestaDelJugador.filter(val => !letrasDeMentira.includes(val)); 
        crearLetrasRespuesta(mezclaRespuesta);
        crearCasillerosRespuesta(respuesta);
        dibujarIgual(respuesta);
        document.getElementById("precioSacarLetras").style.display = "none";
        document.getElementById("botonPistaLetras").style.backgroundColor = "rgb(130 130 130 / 42%)";
        document.getElementById("botonPistaLetras").setAttribute("class", "botonsacarFalsas animate__animated animate__rubberBand");   
        document.getElementById("letrasRespuestaId").setAttribute("class", "letrasRespuestaContenedor sombrita animate__animated animate__flash");
        indicadorParaPoderSacar=1;
    }
}
function truco(){
    console.log(respuesta)
    var cheat = document.getElementById("trucoId");
    cheat.innerHTML = respuesta;
    cheat.setAttribute("class", "nivel animate__animated animate__rubberBand");   
    setTimeout(function() {  
        cheat.innerHTML = "";
     }, 2000); 
}
function opciones(){
    sondioSelec();
    window.location.href = 'opciones.html'; 
}