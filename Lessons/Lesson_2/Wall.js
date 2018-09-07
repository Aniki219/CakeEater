class Wall extends Tile {
  constructor(col, row) {
    super(col, row);
    this.color = color(120, 120, 140);
    this.traversible = false;
  }
}
