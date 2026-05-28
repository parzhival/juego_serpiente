
// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

const TAMANIO_CELDA = 25;
let SERPIENTE = [
  { x: 14, y: 13 },
  { x: 14, y: 14 },
  { x: 14, y: 15 },
  { x: 14, y: 16 }
]

let intervaloSerpiente;
let direccionActual = "derecha"
let comida = { x: 5, y: 5 }
let puntaje = 0;
let juegoTerminado = false;
let velocidadSerpiente = 300;
let velocidad = 700


// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================


function dibujarTablero() {
  ctx.strokeStyle = "rgba(17, 186, 70, 0.73)"
  ctx.beginPath();// empieza a dibujar en el canva 
  ctx.moveTo(0, 0); //donde empieza a dibujar
  ctx.lineTo(100, 100); //hasta donde se dibuja en el canva     
  ctx.stroke(); //pinta contorno de la figura 
}

function dibujarTablero2() {
  for (let i = 0; i < canvas.width; i += TAMANIO_CELDA) {
    ctx.strokeStyle = "rgba(17, 186, 70, 0.73)"
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let i = 0; i < canvas.height; i += TAMANIO_CELDA) {
    ctx.strokeStyle = "rgba(17, 186, 70, 0.73)"
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
}

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero2();
  dibujarNumerosEnY();
  dibujarNumerosEnX();
  dibujarComida();
  dibujarSerpiente();
}

function dibujarNumerosEnY() {
  ctx.fillStyle = "white"
  ctx.font = "12px Arial"
  let contador = 0
  for (let i = 0; i < canvas.height; i += TAMANIO_CELDA) {
    ctx.fillText(contador, 5, i + 12)
    contador++
  }
}

function dibujarNumerosEnX() {
  ctx.fillStyle = "white"
  ctx.font = "12px Arial"
  let contador = 0
  for (let i = 0; i < canvas.width; i += TAMANIO_CELDA) {
    ctx.fillText(contador, i + 2, 12)
    contador++
  }
}

function pintarCoordenada(lineaX, lineaY, color) {
  let posicionX = lineaX * TAMANIO_CELDA
  let posicionY = lineaY * TAMANIO_CELDA
  if (posicionX < canvas.width && posicionY < canvas.height) {
    ctx.fillStyle = color
    ctx.fillRect(posicionX, posicionY, TAMANIO_CELDA, TAMANIO_CELDA)

    ctx.strokeStyle = "red"
    ctx.strokeRect(posicionX, posicionY, TAMANIO_CELDA, TAMANIO_CELDA)

  }
}

function dibujarSerpiente() {
  let colorCabeza = "red"
  for (let i = 0; i < SERPIENTE.length; i++) {
    let serp = SERPIENTE[i]
    if (i == 0) {
      pintarCoordenada(serp.x, serp.y, colorCabeza)
    } else {
      pintarCoordenada(serp.x, serp.y, "yellow")
    }
  }
}

function moverDerecha() {
  let nuevoElemento = { x: 0, y: 0 }
  if ((SERPIENTE[0].x + 2) * TAMANIO_CELDA > canvas.width) {
    gameOver()
    return
  }
  nuevoElemento.x = SERPIENTE[0].x + 1
  nuevoElemento.y = SERPIENTE[0].y

  SERPIENTE.unshift(nuevoElemento)
  SERPIENTE.pop()

}

function moverIzquierda() {
  let nuevoElemento = { x: 0, y: 0 }
  if ((SERPIENTE[0].x - 1) * TAMANIO_CELDA < 0) {
    gameOver()
    return
  }
  nuevoElemento.x = SERPIENTE[0].x - 1
  nuevoElemento.y = SERPIENTE[0].y

  SERPIENTE.unshift(nuevoElemento)
  SERPIENTE.pop()

}

function moverAbajo() {
  let nuevoElemento = { x: 0, y: 0 }
  if ((SERPIENTE[0].y + 2) * TAMANIO_CELDA > canvas.height) {
    gameOver()
    return
  }
  nuevoElemento.x = SERPIENTE[0].x
  nuevoElemento.y = SERPIENTE[0].y + 1

  SERPIENTE.unshift(nuevoElemento)
  SERPIENTE.pop()

}

function moverArriba() {
  let nuevoElemento = { x: 0, y: 0 }
  if ((SERPIENTE[0].y - 1) * TAMANIO_CELDA < 0) {
    gameOver()
    return
  }
  nuevoElemento.x = SERPIENTE[0].x
  nuevoElemento.y = SERPIENTE[0].y - 1

  SERPIENTE.unshift(nuevoElemento)
  SERPIENTE.pop()

}

function iniciarJuego() {
  intervaloSerpiente = setInterval(moverSerpiente, velocidad - velocidadSerpiente)
  cambiarEstado("Jugando")
}

function pausarJuego() {
  clearInterval(intervaloSerpiente)
  cambiarEstado("Descanzando")
}

function moverSerpiente() {
  let atrapado = comidaAtrapada()
  if (juegoTerminado) {
    return
  }

  switch (direccionActual) {
    case "derecha":
      moverDerecha();

      break;

    case "izquierda":
      moverIzquierda();

      break;

    case "abajo":
      moverAbajo();

      break;

    case "arriba":
      moverArriba();

      break;
  }
  if (atrapado) {
    SERPIENTE.push(comida)
    aumentarPuntaje()
    generarNuevaPosicionComida()
  }
  dibujarTodo()
  
}

function cambiarDireccion(direccion){

    if(direccionActual=="derecha" && direccion=="izquierda"){
    return;
  }

  if(direccionActual=="izquierda" && direccion=="derecha"){
    return;
  }

  if(direccionActual=="arriba" && direccion=="abajo"){
    return;
  }

  if(direccionActual=="abajo" && direccion=="arriba"){
    return;
  }

  direccionActual=direccion;
}


function dibujarComida() {
  pintarCoordenada(comida.x, comida.y, "green");
}
 
function generarNuevaPosicionComida() {
  comida.x = Math.floor(Math.random() * (canvas.width / TAMANIO_CELDA));
  comida.y = Math.floor(Math.random() * (canvas.height / TAMANIO_CELDA));
}
 
function comidaAtrapada(){
  if(comida.x==SERPIENTE[0].x && SERPIENTE[0].y==comida.y)
    return true
  else
    return false
}

function aumentarPuntaje(){
  puntaje++
  if(puntaje%2==0 && velocidadSerpiente<=600){
    velocidadSerpiente+=50;
    clearInterval(intervaloSerpiente)
    intervaloSerpiente=setInterval(moverSerpiente,velocidad-velocidadSerpiente)
  }
  document.getElementById("puntaje").innerText=puntaje
}

function cambiarEstado(estado){
document.getElementById("estado").innerText=estado
}

function gameOver(){
  juegoTerminado=true
  cambiarEstado("Game Over")
}

function reiniciarJuego(){
  limpiarCanvas()
  dibujarTablero2()
  SERPIENTE=[
      {x:14, y:13},
      {x:14, y:14},
      {x:14, y:15},
      {x:14, y:16}
    ]
  dibujarSerpiente()
  puntaje=0
  direccionActual="derecha"
  cambiarEstado("Listo")
  juegoTerminado=false
  dibujarNumerosEnX()
  dibujarNumerosEnY()
  comida={x:5,y:5}
  dibujarComida()
  clearInterval(intervaloSerpiente)
  velocidadSerpiente=300;
  document.getElementById("puntaje").innerText=0
  puntaje=0
}


