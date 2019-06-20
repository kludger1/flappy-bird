window.onload = function() {
  const cvs = document.getElementById('canvas');
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;

  const ctx = cvs.getContext('2d');

  let gameOver = true;
  if (gameOver === true) {
    drawInstruction(ctx, cvs, 'type "S" to start & "Space" to fly');
    document.addEventListener('keyup', e => {
      if (e.keyCode === 83 && gameOver === true) {
        gameLoop();
      }
    });
  }

  const environment = new Environment(cvs, ctx);
  const bird = new Bird(250, 300, ctx);
  const pipes = [];
  let pipeSet = generateRandomPipes(ctx, cvs.width, cvs.height - fg.height);
  // pipes.push(pipeSet.top, pipeSet.bottom);
  setInterval(function() {
    let pipeSet = generateRandomPipes(ctx, cvs.width, cvs.height - fg.height);
    pipes.push(pipeSet.top, pipeSet.bottom);
  }, 2600);

  // gameLoop();

  /*
   MAIN GAME LOOP
  */
  function gameLoop() {
    gameOver = false;
    bird.update(pipes);
    if (!bird.dead) {
      environment.update();

      pipes.forEach(function(pipe1) {
        pipe1.update();
      });
    }

    environment.render();
    pipes.forEach(function(pipe1) {
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

function generateRandomPipes(ctx, canvasWidth, canvasHeight) {
  let lengthTop = Math.round(Math.random() * 200 + 50);
  let lengthBottom = canvasHeight - gap - lengthTop;
  let returnVal = {};
  returnVal.top = new Pipe(canvasWidth, -5, lengthTop, 4, ctx);
  returnVal.bottom = new Pipe(
    canvasWidth,
    canvasHeight + 5 - lengthBottom,
    lengthBottom,
    4,
    ctx
  );
  return returnVal;
}

function drawInstruction(ctx, cvs, msg, x = 0, y = 0) {
  ctx.fillStyle = '#21371F';
  ctx.font = '40px Barrio';
  ctx.textAlign = 'center';
  ctx.fillText(msg, cvs.width / 2 + x, cvs.height / 2 + y);
  // ctx.drawImage(btn, cvs.width / 2, cvs.height / 2);
}

function drawGameOver(ctx, cvs) {
  // gameOver = true;
  // console.log(gameOver);
  ctx.fillStyle = '#21371F';
  ctx.font = '100px Barrio';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER!!', cvs.width / 2, cvs.height / 2);
  drawInstruction(
    ctx,
    cvs,
    'Press "ctrl + f5" or "command + R" to play again...',
    0,
    70
  );
}
