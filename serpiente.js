
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    
    const TAMANIO_CELDA = 25;

    

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero2();
    }

    function dibujarTablero(){
      ctx.strokeStyle = "rgba(17, 186, 70, 0.73)"
      ctx.beginPath();// empieza a dibujar en el canva 
      ctx.moveTo(0,0); //donde empieza a dibujar
      ctx.lineTo(100,100); //hasta donde se dibuja en el canva     
      ctx.stroke(); //pinta contorno de la figura 
    }

    function dibujarTablero2(){
      for (let i = 0; i<canvas.width; i+=TAMANIO_CELDA){
        ctx.strokeStyle = "rgba(17, 186, 70, 0.73)"
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,canvas.height);
        ctx.stroke();
      }
      for( let i = 0 ; i<canvas.height; i +=TAMANIO_CELDA){
        ctx.strokeStyle = "rgba(17, 186, 70, 0.73)"
        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(canvas.width,i);
        ctx.stroke();
      }
    }


