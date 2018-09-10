window.onload = function () {
  const cvs = document.getElementById('canvas');
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;

  const ctx = cvs.getContext('2d');






  



  const environment = new Environment(cvs, ctx);
  const bird = new Bird(250, 300, ctx);
  const pipes = [];
  let pipeSet = generateRandomPipes(ctx, cvs.width, cvs.height - fg.height);
  pipes.push(pipeSet.top, pipeSet.bottom);
  setInterval(function () {
    let pipeSet = generateRandomPipes(ctx, cvs.width, cvs.height - fg.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
  }, 2600);
  gameLoop();


  /*
   MAIN GAME LOOP
  */
  function gameLoop() {
    //ctx.fillRect(0,0,cvs.width,cvs.height);
    bird.update(pipes);
    if (!bird.dead) {
      environment.update();

      pipes.forEach(function (pipe1) {
        pipe1.update();
      });

      // bird.score(pipes)
      // drawScore(ctx, cvs);

    }

    environment.render();
    pipes.forEach(function (pipe1) {
      pipe1.render();
    });
    bird.render();
    if (bird.dead) {
      drawGameOver(ctx, cvs);
    }
    window.requestAnimationFrame(gameLoop);
  }
};

const gap = 200;

// score = 0;
// if (bird == gap){
//   score++
//   console.log(score)
// }


function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
  let lengthTop = Math.round(Math.random() * 200 + 50);
  let lengthBottom = canvasHeight - gap - lengthTop;
  let returnVal = {};
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
  returnVal.bottom = new Pipe(canvasWidth, canvasHeight + 5 - lengthBottom, lengthBottom, 4, ctx);
  return returnVal;
}


function drawGameOver(ctx, cvs) {
  ctx.fillStyle = "#21371F";
  ctx.font = "100px Barrio";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER!!", cvs.width / 2, cvs.height / 2);
}


// function drawScore(ctx, cvs) {
//   ctx.fillStyle = "#21371F";
//   ctx.font = "100px Barrio";
//   ctx.fillText("Score : " + this.src, 20, 30);
// }
