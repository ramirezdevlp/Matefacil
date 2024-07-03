//DECLARACIÓN DE VARIABLES CONSTANTES PARA LOS BOTONES Y CONTENEDOR POP-UP

const numberButtons = document.querySelectorAll('.number-button');
const popupContainer = document.querySelector('.popup-container');
const popupMessage = document.getElementById('popup-message');
const popupButton = document.getElementById('popup-button');

//DECLARACIÓN DE VARIABLES PARA LA PARTE LÓGICA DEL EJERCICIO

let completedExercises = [];
let currentExercise = 0;

//DECLARACIÓN DE VARIABLE EXCERCISE CON LA CANTIDAD DE EJERCICIOS Y SU RESPUESTA CORRECTA

const exercises = [
    { fruit: 'manzana', correctNumber: 5 },
    { fruit: 'pera', correctNumber: 2 },
    { fruit: 'mandarina', correctNumber: 3 },
    { fruit: 'banana', correctNumber: 6 },
    { fruit: 'mango', correctNumber: 10 },
    { fruit: 'fresas', correctNumber: 8 },
    { fruit: 'limon', correctNumber: 9 },
    { fruit: 'guayaba', correctNumber: 7 },
    { fruit: 'piña', correctNumber: 4 },
    { fruit: 'sandia', correctNumber: 1 },
  ];

//CREACIÓN DE LA FUNCIÓN ALEATORIA PARA LOS EJERCICIOS
  
  function getRandomExercise() {
    let randomIndex = Math.floor(Math.random() * exercises.length);
    while (completedExercises.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * exercises.length);
    }
    return randomIndex;
  }

  currentExercise = getRandomExercise();

  //CREACIÓN DE LA FUNCIÓN EJERCICIO SIGUIENTE

  function nextExercise() {
    currentExercise = getRandomExercise();
    updateExercise();
  }
  
  nextExercise();

  //CREACIÓN DE LA PARTE LÓGICA DEL FUNCIONAMIENTO PARA LOS BOTONES DE CADA EJERCICIO

  numberButtons.forEach((button, recognize) => {
    button.addEventListener('click', () => {
        const currentExerciseData = exercises[currentExercise];
        const correctNumber = currentExerciseData.correctNumber;
        const selectedNumber = parseInt(button.textContent);

        if (selectedNumber === correctNumber) {

            //MUESTRA POP-UP CON LA RESPUESTA CORRECTA
            showPopup('¡Felicidades, la respuesta es correcta!😄👏🏼', 'Siguiente', () => {
              completedExercises.push(currentExercise);
              currentExercise = (currentExercise + 1) % exercises.length;
              if (completedExercises.length === exercises.length) {

                //MUESTRA POP-UP FINAL CUANDO SE COMPLETEN TODOS LOS EJERCICIOS
                showPopup('¡Has completado todos los ejercicios!👏🏼', 'Salir', () => {
                  window.location.href = 'modules.html';
                  });
              } else {
                nextExercise();
              }
            });
          } else {

            //MUESTRA POP-UP CON EL MENSAJE DE RESPUESTA INCORRECTA
            showPopup('Ups, la respuesta es incorrecta❌', 'Volver a intentar', null );
        }
    });
});

//CREACIÓN DE LA FUNCIÓN DE ACTUALIZAR EJERCICIO
function updateExercise() {
    const exercises = document.querySelectorAll('.exercise');
    exercises.forEach((exercise, index) => {
        exercise.style.display = index === currentExercise ? 'block' : 'none';
    });
}

//CREACIÓN DE LA FUNCIÓN QUE MOSTRARÁ EL POP-UP
function showPopup(message, buttonText, callback) {
    popupMessage.textContent = message;
    popupButton.textContent = buttonText;
    popupButton.onclick = () => {
      popupContainer.style.display = 'none';
      if (callback) {
        callback();
      }
    };
    popupContainer.style.display = 'flex';
  }
  
  updateExercise();