var grid = [];
var tilesize = 50;

class Tile {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.index = Tile.getIndex(col, row);

    this.color = color(120, 120, 170);
    this.traversible = true;
  }

  clean() {
    this.traversible = false;
    this.color = color(120, 150, 200);
  }

  draw() {
    stroke(200);
    fill(this.color);
    let x = this.col * tilesize;
    let y = this.row * tilesize;
    rect(x, y, tilesize, tilesize);
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
