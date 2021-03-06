var grid = [];
var tilesize = 50;
var waitForResize = true;

class Tile {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.index = Tile.getIndex(col, row);
    this.sprite = new Sprite(cakeTileImg);
    this.sideSprite = new Sprite(eatenCakeTile);
    this.traversible = true;
  }

  draw() {
    let x = this.col * tilesize;
    let y = this.row * tilesize;

    let index = Tile.getIndex(this.col, this.row + 1);
    if (grid[index] && !(grid[index] instanceof Wall) && !Tile.placeFree(this.col, this.row + 1)) {
      this.sideSprite.draw(x, y);
    } else {
      this.sprite.draw(x, y);
    }

    this.sprite.animate();
    this.sideSprite.animate();
  }

  eat() {
    this.sprite = new Sprite(crumbsImg);
    this.sideSprite = new Sprite(crumbsImg);
    let rnum = floor(random(3));
    this.sprite.anim = rnum;
    this.sideSprite.anim = rnum;
    this.traversible = false;
  }

  static placeFree(col, row) {
    let columns = floor(width / tilesize);
    let rows = floor(height / tilesize);
    let index = Tile.getIndex(col, row);

    if (col < 0 || row < 0) {return false;}
    if (col >= columns || row >= rows) {return false;}
    if (!grid[index].traversible) {return false;}

    return true;
  }

  static getIndex(col, row) {
    let columns = floor(width / tilesize);
    return row * columns + col;
  }

  static createGrid(level) {
    let cols = level.size[0];
    let rows = level.size[1];

    waitForResize = true;
    resizeCanvas(cols * tilesize, rows * tilesize);
    waitForResize = false;

    for(let r = 0; r < rows; r++) {
      for(let c = 0; c < cols; c++) {
        let index = Tile.getIndex(c, r);
        if (level.tiles[index] === 1) {
          grid[index] = new Wall(c, r);
        } else {
          grid[index] = new Tile(c, r);
        }
      }
    }

  }
}
