class Scrubber {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xvel = 0;
    this.yvel = 0;

    this.speed = 2;
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
    fill(0);
    rect(this.x, this.y, tilesize, tilesize);
  }

  scrubTile() {
    let index = Tile.getIndex(this.col, this.row);
    grid[index].clean();
  }

  move() {
    if (this.x % tilesize != 0 || this.y % tilesize != 0) {
      this.x += this.xvel;
      this.y += this.yvel;
      return;
    } else {
      this.scrubTile();
      this.xvel = 0;
      this.yvel = 0;
    }
    if (register[LEFT_ARROW]) {
      if (Tile.placeFree(this.col - 1, this.row)) {
        this.xvel = -this.speed;
        this.yvel = 0;
      }
    }
    if (register[RIGHT_ARROW]) {
      if (Tile.placeFree(this.col + 1, this.row)) {
        this.xvel = this.speed;
        this.yvel = 0;
      }
    }
    if (register[UP_ARROW]) {
      if (Tile.placeFree(this.col, this.row - 1)) {
        this.xvel = 0;
        this.yvel = -this.speed;
      }
    }
    if (register[DOWN_ARROW]) {
      if (Tile.placeFree(this.col, this.row + 1)) {
        this.xvel = 0;
        this.yvel = this.speed;
      }
    }
    this.x += this.xvel;
    this.y += this.yvel;
  }
}
