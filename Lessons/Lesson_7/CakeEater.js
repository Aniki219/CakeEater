class CakeEater {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xvel = 0;
    this.yvel = 0;

    this.speed = 2;
    this.sprite = new Sprite(cakeEaterImg, 2, 30, 17, 17);
  }

  setColRow() {
    this.col = floor(this.x / tilesize);
    this.row = floor(this.y / tilesize);
  }

  update() {
    this.setColRow();
    this.move();
    this.draw();
  }

  draw() {
    this.sprite.draw(this.x, this.y);
    this.sprite.animate();

    if (this.xvel != 0 || this.yvel != 0) {
      this.sprite.framespeed = 10;
    } else {
      this.sprite.framespeed = 30;
    }
  }

  eatTile() {
    let index = Tile.getIndex(this.col, this.row);
    grid[index].eat();
  }

  move() {
    if (this.x % tilesize == 0 && this.y % tilesize == 0) {
      this.xvel = 0;
      this.yvel = 0;

      this.eatTile();
      this.setVelocity();
    }
    this.x += this.xvel;
    this.y += this.yvel;
  }

  setVelocity() {
    if (register[LEFT_ARROW]) {
      if (Tile.placeFree(this.col - 1, this.row)) {
        this.xvel = -this.speed;
        this.yvel = 0;
        this.sprite.anim = 0;
      }
    }
    if (register[RIGHT_ARROW]) {
      if (Tile.placeFree(this.col + 1, this.row)) {
        this.xvel = this.speed;
        this.yvel = 0;
        this.sprite.anim = 3;
      }
    }
    if (register[UP_ARROW]) {
      if (Tile.placeFree(this.col, this.row - 1)) {
        this.xvel = 0;
        this.yvel = -this.speed;
        this.sprite.anim = 2;
      }
    }
    if (register[DOWN_ARROW]) {
      if (Tile.placeFree(this.col, this.row + 1)) {
        this.xvel = 0;
        this.yvel = this.speed;
        this.sprite.anim = 1;
      }
    }
  }
}
