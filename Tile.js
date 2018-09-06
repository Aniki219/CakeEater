var grid = [];
var tilesize = 50;

class Tile {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.index = Tile.getIndex(col, row);
    this.image = new Sprite(cakeTileImg);
    this.sideView = new Sprite(eatenCakeTile);
    this.traversible = true;
  }

  clean() {
    this.traversible = false;
    this.image = new Sprite(crumbsImg);
    this.sideView = new Sprite(crumbsImg);
    this.image.row = floor(random(0, 3));
    this.sideView.row = floor(random(0,3));
  }

  draw() {
    let x = this.col * tilesize;
    let y = this.row * tilesize;
    let index = Tile.getIndex(this.col, this.row + 1);
    if (grid[index] && !(grid[index] instanceof Wall) && !Tile.placeFree(this.col, this.row + 1)) {
      this.sideView.draw(x, y);
    } else {
      this.image.draw(x, y);
    }
    this.image.animate();
    this.sideView.animate();
  }

  static getIndex(col, row) {
    let columns = floor(width / tilesize);
    return row * columns + col;
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

  static createGrid(level) {
    let cols = level.size[0];
    let rows = level.size[1];

    resizeCanvas(cols * tilesize, rows * tilesize);

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
