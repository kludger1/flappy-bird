const Environment = function(cvs, ctx) {
  this.cvs = cvs;
  this.ctx = ctx;
  this.bgPos = 0;
  this.fgPos = 0;
  this.bgSpeed = 2;
  this.bgWidth = 1239;
  this.fgWidth = 1239;
  this.bgImg = document.getElementById('bg');
  this.fgImg = document.getElementById('fg');
  this.gameOver = document.getElementById('gameOver');
};

Environment.prototype.update = function() {
  this.bgPos -= this.bgSpeed;
  if (this.bgPos < -this.bgWidth) {
    this.bgPos = 0;
  }
};
Environment.prototype.render = function() {
  for (let i = 0; i <= this.cvs.width / this.bgWidth + 1; i++) {
    this.ctx.drawImage(this.bgImg, this.bgPos + i * this.bgWidth, 0);
  }
  for (let f = 0; f <= this.cvs.width / this.fgWidth + 1; f++) {
    this.ctx.drawImage(
      this.fgImg,
      this.fgPos + f * this.fgWidth,
      this.cvs.height - fg.height
    );
  }
};
