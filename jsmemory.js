//DECLARACIÓN DE VARIABLES PARA EL FUNCIONAMIENTO DEL JUEGO
let tarjetasDestapadas = 0;
let tarjetaUno = null;
let tarjetaDos = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let correctos = 0;
let temporizador = false;
let timer = 200;
let timerInicial = 200;
let tiempoRegresivo = null;

//CREACIÓN DE EVENTOS CON AUDIO
let winAudio = new Audio('./aud/win.wav');
let correctAudio = new Audio('./aud/correct.wav');
let loseAudio = new Audio('./aud/lose.wav');
let incorrectAudio = new Audio('./aud/incorrect.wav');
let clickAudio = new Audio('./aud/click.wav');

//LLAMADO DE ELEMENTOS SITUADOS EN HTML PARA DAR FUNCIONAMIENTO
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarCorrectos = document.getElementById('correctos');
let mostrarTiempo = document.getElementById('tiempo');

//DECLARACIÓN DE ARREGLO CON VALORES NUMÉRICOS
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15]

// FUNCIÓN DE ALEATORIZAR LAS CARTAS DEL JUEGO
numeros = numeros.sort(() => {return Math.random()-0.5});
console.log(numeros);

//FUNCIÓN CONTEO DE TIEMPO
function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        //FUNCIÓN A EJECUTAR CUANDO NO SE LOGRA COMPLETAR EL JUEGO
        if(timer == 0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas(numeros);
            loseAudio.play();
        }
    }, 1000);
}

//FUNCIÓN BLOQUEO DE TARJETAS PARA QUE QUEDEN FIJAS AL SER SELECCIONADAS
function bloquearTarjetas(){
    for (let i = 0; i<=29; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

//FUNCIÓN DESTAPAR TARJETA
function destapar(id){

if(temporizador == false){
    contarTiempo();
    temporizador=true;
}

tarjetasDestapadas++;
console.log(tarjetasDestapadas);

if(tarjetasDestapadas == 1){

    //MUESTRA DE LA PRIMERA CARTA SELECCIONADA
    tarjetaUno = document.getElementById(id);
    primerResultado = numeros[id];
    tarjetaUno.innerHTML = primerResultado;
    clickAudio.play();

    //ACCIÓN FIJAR PRIMERA CARTA SELECCIONADA
    tarjetaUno.disabled = true;

} else if(tarjetasDestapadas == 2){
    //MUESTRA DE LA SEGUNDA CARTA SELECCIONADA
    tarjetaDos = document.getElementById(id);
    segundoResultado = numeros[id];
    tarjetaDos.innerHTML = segundoResultado;

    //ACCIÓN FIJAR SEGUNDA CARTA SELECCIONADA
    tarjetaDos.disabled = true;

    //FUNCIÓN PARA INCREMENTAR EL CONTADOR DE MOVIMIENTOS
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primerResultado == segundoResultado){
        //FIJAR CONTADOR DE CARTAS DESTAPADAS
        tarjetasDestapadas = 0;

        //FUNCIÓN PARA INCREMENTAR EL CONTADOR DE LOS PARES ACERTADOS
        correctos++;
        mostrarCorrectos.innerHTML = `Correctos: ${correctos}`;
        correctAudio.play();

        //LAS TARJETAS SE PONEN EN VERDE CUANDO SE ACIERTAN LOS PARES
        tarjetaUno.classList.add("verde");
        tarjetaDos.classList.add("verde");

        //FUNCIÓN A EJECUTAR CUANDO SE COMPLETA EL JUEGO
        if(correctos == 15){
            winAudio.play();
            clearInterval(tiempoRegresivo);

            //MUESTRA PARES CORRECTOS
            mostrarCorrectos.innerHTML = `Correctos: ${correctos}🙌🏻🎉`;

            //MUESTRA EN CUANTO TIEMPO SE LOGRÓ COMPLETAR EL JUEGO
            mostrarTiempo.innerHTML = `¡Logrado en ${timerInicial - timer} segundos!`;

            //MUESTRA LA CANTIDAD DE MOVIMIENTOS REALIZADA
            mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}👏🏻👏🏻`;
        }
    } else {

        //LAS TARJETAS SE PONEN EN ROJO CUANDO NO SE ACIERTAN LOS PARES
        incorrectAudio.play();
        tarjetaUno.classList.add("rojo");
        tarjetaDos.classList.add("rojo");

        //MUESTRA DE CARTAS Y VOLVER A TAPAR PORQUE NO ES CORRECTO EL PAR SELECCIONADO
        setTimeout(()=>{
            tarjetaUno.classList.remove("rojo");
            tarjetaDos.classList.remove("rojo");
            tarjetaUno.innerHTML = ' ';
            tarjetaDos.innerHTML = ' ';
            tarjetaUno.disabled = false;
            tarjetaDos.disabled = false;
            tarjetasDestapadas = 0;
        },800);
    }
}
}
