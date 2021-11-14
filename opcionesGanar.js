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