var grid = [];
var tilesize = 50;

class Tile {
  constructor(col, row) {
    this.col = col;
    this.row = row;

    this.coords = Tile.getTileCoords(col, row);
    this.index = Tile.getIndex(col, row);

    this.color = color(120, 120, 170);
    this.traversible = true;
  }

  static getIndex(col, row) {
    let columns = floor(width / tilesize);
    return row * columns + col;
  }

  static getTileCoords(col, row) {
    return {x: col * tilesize, y: row * tilesize};
  }

  clean() {
    this.traversible = false;
    this.color = color(120, 150, 200);
  }

  draw() {
    stroke(200);
    fill(this.color);
    rect(this.coords.x, this.coords.y, tilesize, tilesize);
  }

  update() {
    draw();
  }

  static placeFree(col, row) {
    let columns = floor(width / tilesize);
    let rows = floor(height / tilesize);
    if (col < 0 || row < 0) {return false;}
    if (col >= columns || row >= rows) {return false;}
    let index = Tile.getIndex(col, row);
    if (grid[index] instanceof Wall) {return false;}
    if (!grid[index].traversible) {return false;}
    return true;
  }

  static createGrid(level) {
    let cols = level.size[0];
    let rows = level.size[1];

    for(let r = 0; r < rows; r++) {
      for(let c = 0; c < cols; c++) {
        let index = c + r * cols;
        if (level.map[index] === 1) {
          grid[index] = new Wall(c, r);
        } else {
          grid[index] = new Tile(c, r);
        }
      }
    }
    resizeCanvas(cols * tilesize, rows * tilesize);
  }
}
