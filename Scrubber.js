class Scrubber {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.getColRow();

    this.xvel = 0;
    this.yvel = 0;

    this.speed = 2;
  }

  getIndex() {
    let col = floor(this.x / this.size);
    let row = floor(this.y / this.size);
    let columns = floor(width / this.size);
    return col + row * columns;
  }

  getColRow() {
    this.col = floor(this.x / this.size);
    this.row = floor(this.y / this.size);
  }

  update() {
    this.move();
    this.draw();
  }

  draw() {
    fill(0);
    rect(this.x, this.y, this.size, this.size);
  }

  scrubTile() {
    let index = this.getIndex();
    grid[index].clean();
  }

  move() {
    this.getColRow();
    if (this.x % this.size != 0 || this.y % this.size != 0) {
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
