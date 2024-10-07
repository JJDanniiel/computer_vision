// //LO QUE SE HIZO EN CLASE

// // Classifier Variable
// let classifier;
// // Model URL
// let imageModelURL =
//   "https://teachablemachine.withgoogle.com/models/wA-HflAxek/";

// // Video
// let video;
// let flippedVideo;
// // To store the classification
// let etiqueta = "";
// let confianza = 0;

// // Load the model first
// function preload() {
//   classifier = ml5.imageClassifier(imageModelURL + "model.json");
// }

// function setup() {
//   createCanvas(320, 260);
//   // Create the video
//   video = createCapture(VIDEO);
//   video.size(320, 240);
//   video.hide();

//   // flippedVideo = ml5.flipImage(video);
//   // Start classifying
//   classifyVideo();
// }

// function draw() {
//   background(0);
//   // Draw the video
//   image(video, 0, 0);
//   //   Draw the label
//   fill(255);
//   textSize(16);
//   textAlign(CENTER);
//   text(etiqueta, width / 2, height - 4);
//   textSize(8);
//   textAlign(LEFT);
//   text(confianza, 10, height - 4);

//   if (etiqueta == "Botella" && confiaza > 0.9) {
//     filter(INVERT);
//     filter(BLUE);
//     fill(255);
//     textSize(80);
//     textAlign(CENTER);
//   }
// }

// // Get a prediction for the current video frame
// function classifyVideo() {
//   classifier.classify(video, gotResult);
// }

// // When we get a result
// function gotResult(results, error) {
//   // If there is an error
//   if (error) {
//     console.error(error);
//     return;
//   }

//   // The results are in an array ordered by confidence.
//   // console.log(results[0]);
//   etiqueta = results[0].label;
//   confianza = results[0].confidence;
//   // Classifiy again!
//   classifyVideo();
// }

// //primer intento
// // Classifier Variable
// let classifier;
// // Model URL
// let imageModelURL = "https://teachablemachine.withgoogle.com/models/Mmh2Y-8As/";

// // Video
// let video;
// let flippedVideo;
// // To store the classification
// let label = "";

// // Load the model first
// function preload() {
//   classifier = ml5.imageClassifier(imageModelURL + "model.json");
// }

// function setup() {
//   createCanvas(320, 260);
//   // Create the video
//   video = createCapture(VIDEO);
//   video.size(320, 240);
//   video.hide();

//   // flippedVideo = ml5.flipImage(video);
//   // Start classifying
//   classifyVideo();
// }

// function draw() {
//   background(0);
//   // Draw the video
//   image(video, 0, 0);

//   // Draw the label
//   fill(255);
//   textSize(16);
//   textAlign(CENTER);
//   text(label, width / 2, height - 4);
// }

// // Get a prediction for the current video frame
// function classifyVideo() {
//   classifier.classify(video, gotResult);
// }

// // When we get a result
// function gotResult(results, error) {
//   // If there is an error
//   if (error) {
//     console.error(error);
//     return;
//   }
//   // The results are in an array ordered by confidence.
//   // console.log(results[0]);
//   label = results[0].label;
//   // Classifiy again!
//   classifyVideo();
// }

let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/Mmh2Y-8As/";
let video;
let label = "";

// Variables del juego
let x, y;
let speed = 3; // Velocidad lateral
let jumpSpeed = 0; // Velocidad del salto
let gravity = 0.5; // Gravedad
let isJumping = false; // Controla si el objeto está saltando
let groundY = 350; // El límite del suelo en el eje Y
let groundColor; // Color del suelo

function preload() {
  // Cargar el modelo de clasificación de imágenes
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Configuración del video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  // Configuración inicial del juego
  x = width / 2;
  y = groundY;
  groundColor = color(67, 56, 120); // Color inicial del suelo

  // Comenzar la clasificación del video
  classifyVideo();
}

function draw() {
  background(126, 96, 191); // Color del fondo

  // Dibujar el video en la esquina superior izquierda
  image(video, 0, 0, 160, 120);

  // Dibujar el suelo con el color actual
  fill(groundColor);
  rect(0, groundY + 70, width, height - groundY); // Suelo desde el groundY hacia abajo

  //Personaje
  noStroke();
  fill(200, 22, 86);
  rect(x - 45, y - 15, 40, 65, 20, 0, 0, 20); //mochila
  rect(x - 12, y - 40, 70, 100, 40, 40, 0, 0); //cuerpo
  fill(255, 22, 86);
  rect(x - 12, y - 40, 70, 80, 40, 40, 0, 100); //sombra
  fill(245, 245, 247);
  rect(x + 20, y - 20, 45, 25, 40); //lente
  fill(104, 109, 118);
  rect(x + 40, y - 10, 20, 5, 40); //Reflejo
  fill(200, 22, 86);
  rect(x + 33, y + 50, 25, 40, 0, 0, 20, 20); // P.1
  rect(x - 12, y + 50, 25, 40, 0, 0, 20, 20); //P.2

  //   // Mostrar la etiqueta de clasificación
  //   fill(0); // Color del texto (negro)
  //   textSize(16); // Tamaño de texto
  //   textAlign(CENTER);
  //   text("Movimiento: " + label, width / 2, height - 20);

  // Movimiento basado en las predicciones del modelo
  if (label === "izquierda") {
    x -= speed;
  } else if (label === "derecha") {
    x += speed;
  } else if (label === "saltar" && !isJumping) {
    jumpSpeed = -10; // Velocidad hacia arriba
    isJumping = true;
    groundColor = color(random(255), random(255), random(255)); // Cambiar color del suelo
  }

  // Aplicar la gravedad
  y += jumpSpeed;
  jumpSpeed += gravity;

  // Limitar la posición del círculo al suelo
  if (y >= groundY) {
    y = groundY; // Mantener el círculo en el suelo
    isJumping = false; // Permitir que salte de nuevo
    jumpSpeed = 0; // Reiniciar la velocidad de salto cuando toca el suelo
  }
}

// Clasificación del video en tiempo real
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// Obtener el resultado de la clasificación
function gotResult(results, error) {
  if (error) {
    console.error(error);
    return;
  }
  // Almacenar la etiqueta con mayor confianza
  label = results[0].label;
  // Volver a clasificar el video
  classifyVideo();
}
