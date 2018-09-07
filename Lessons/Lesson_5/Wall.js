class Wall extends Tile {
  constructor(col, row) {
    super(col, row);
    this.sprite = new Sprite(candleTileImg, 2);
    this.sideSprite = new Sprite(eatenCandleImg, 2);
    this.traversible = false;
  }
}
