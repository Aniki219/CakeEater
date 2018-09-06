class Wall extends Tile {
  constructor(col, row) {
    super(col, row);
    this.image = new Sprite(candleTileImg, 2);
    this.sideView = new Sprite(eatenCandleImg, 2);
    this.traversible = false;
  }

  update() {
    super.update();
  }
}
