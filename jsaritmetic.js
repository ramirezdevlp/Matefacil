// DECLARACIÓN DE OPERACIONES CON SUS OPERADORES ARITMÉTICOS Y RESPUESTAS CORRECTAS DEFINIDAS
const exercises = [
    { objeto1: 1, objeto2: 2, operation: '+', correctAnswer: 3 },
    { objeto1: 1, objeto2: 5, operation: '+', correctAnswer: 6 },
    { objeto1: 2, objeto2: 2, operation: '+', correctAnswer: 4 },
    { objeto1: 2, objeto2: 6, operation: '+', correctAnswer: 8 },
    { objeto1: 4, objeto2: 6, operation: '+', correctAnswer: 10 },
    { objeto1: 3, objeto2: 1, operation: '-', correctAnswer: 2 },
    { objeto1: 5, objeto2: 1, operation: '-', correctAnswer: 4 },
    { objeto1: 2, objeto2: 2, operation: '-', correctAnswer: 0 },
    { objeto1: 4, objeto2: 3, operation: '-', correctAnswer: 1 },
    { objeto1: 6, objeto2: 3, operation: '-', correctAnswer: 3 }
];

// CREACIÓN Y DECLARACIÓN DE TODOS LOS ELEMENTOS QUE FORMAN PARTE DEL POP-UP
function showPopup(message,buttonmsg = "Entendido",home = null) {
    const fondomodal = document.createElement("DIV")
    const cuadromodal = document.createElement("DIV")
    const mensaje = document.createElement("P")
    const cerrarModal = document.createElement("BUTTON")
    cerrarModal.classList.add("close")
    mensaje.textContent = message
    mensaje.classList.add("modal-texto")
    fondomodal.classList.add("popup")
    cuadromodal.classList.add("popup-content")

    // CONFIGURACIÓN DE CADA ELEMENTO DEL POP-UP
    fondomodal.appendChild(cuadromodal)
    cuadromodal.appendChild(mensaje)
    cuadromodal.appendChild(cerrarModal)
    cerrarModal.textContent = buttonmsg

    document.body.appendChild(fondomodal)

    // FUNCIÓN CERRAR VENTANA POP-UP
    cerrarModal.onclick = e=>{
        if (home) {
            window.location.href = "modules.html"
        }else{


            objeto1.src = `img/objects/${exercises[exerciseSelected].objeto1}.jpg`
            operator.textContent = exercises[exerciseSelected].operation
            objeto2.src = `img/objects/${exercises[exerciseSelected].objeto2}.jpg`
            respuesta.value=""
            fondomodal.remove()
        }
    }
}

// CREACIÓN DE LA FUNCIÓN PARA LLAMAR LOS EJERCICIOS DE FORMA ALEATORIA
let currentExcercise = 0
let selectedExercises = []
let exerciseSelected = Math.floor(Math.random() * exercises.length)
const objeto1 = document.querySelector(".object-one")
const operator = document.querySelector(".operator")
const objeto2 = document.querySelector(".object-two")
const respuesta = document.querySelector(".answer")
respuesta.value = ""
const boton = document.querySelector(".boton")

// SELECCIÓN DE CADA IMÁGEN PARA CADA OPERANDO DE LOS EJERCICIOS
objeto1.src = `img/objects/${exercises[exerciseSelected].objeto1}.jpg`
operator.textContent = exercises[exerciseSelected].operation
objeto2.src = `img/objects/${exercises[exerciseSelected].objeto2}.jpg`


const modal = document.querySelector(".popup-content")

// FUNCIONES DE COMPROBACIÓN
boton.addEventListener("click",e=>{

    // MUESTRA DE LA VENTANA POP-UP CUANDO LA RESPUESTA ES CORRECTA
    if (respuesta.value == exercises[exerciseSelected].correctAnswer) {          
        showPopup('¡Felicidades, la respuesta es correcta!😄👏🏼',"Siguiente")       
        selectedExercises.push(exerciseSelected)
        
        // BUCLE DE SELECCIÓN ALEATORIA DE LOS EJERCICIOS
        while(selectedExercises.includes(exerciseSelected)){
            if(selectedExercises.length !=10){
                exerciseSelected = Math.floor(Math.random() * exercises.length)
            }else{
                break;
            }
        }

        // MUESTRA DE LA VENTANA POP-UP CUANDO SE COMPLETAN TODOS LOS EJERCICIOS
        if (selectedExercises.length == 10) {
        showPopup('¡Has completado todos los ejercicios!👏🏼',"Salir",true)
        }
        
    }else {
        
        // MUESTRA DE LA VENTANA POP-UP CUANDO NO SE INGRESA NINGÚN DATO EN EL CAMPO DE TEXTO
        if (respuesta.value === "") {
        showPopup('Debes escribir un número para poder continuar⚠️')
        }

        // MUESTRA DE LA VENTANA POP-UP CUANDO LA RESPUESTA ES INCORRECTA
        else{
            showPopup('Que mal, la respuesta es incorrecta❌', "Volver a Intentar")
        }
    }
})