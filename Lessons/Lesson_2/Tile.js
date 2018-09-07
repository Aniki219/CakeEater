var grid = [];
var tilesize = 50;
var waitForResize = true;

class Tile {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.index = Tile.getIndex(col, row);
    this.color = color(160, 160, 180);
    this.traversible = true;
  }

  draw() {
    let x = this.col * tilesize;
    let y = this.row * tilesize;

    fill(this.color);
    rect(x, y, tilesize, tilesize);
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
