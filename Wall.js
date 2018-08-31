class Wall extends Tile {
  constructor(col, row) {
    super(col, row);
    this.color = color(100, 100, 100);
    this.traversible = false;
  }

  update() {
    super.update();
  }
}
