function preload() {
  cakeEaterImg = loadImage("https://i.imgur.com/Ls1UU8w.png");
  cakeTileImg = loadImage("https://i.imgur.com/orux0a1.png");
  eatenCakeTile = loadImage("https://i.imgur.com/wKSJqGl.png");
  candleTileImg = loadImage("https://i.imgur.com/rYEDd1C.png");
  eatenCandleImg = loadImage("https://i.imgur.com/fZw8BHT.png");
  crumbsImg = loadImage("https://i.imgur.com/2cQDxz4.png");
}

class Sprite {
  constructor(img, frames, framespeed, w, h) {
    this.img = img;
    this.frames = frames || 0;
    this.framespeed = framespeed || 30;
    this.w = w || 32;
    this.h = h || 32;
    this.frame = 0;
    this.row = 0;
  }

  animate() {
    if (this.framespeed <= 0) {return;}
    if (frameCount % this.framespeed === 0) {
      this.frame++;
    }
    if (this.frame > this.frames - 1) {
      this.frame = 0;
    }
  }

  draw(x, y) {
    image(this.img, x, y, tilesize, tilesize, this.frame * this.w, this.row * this.h, this.w, this.h)
  }
}
