var path = [];
var scrubber;

function setup() {
  let canvas = createCanvas(250, 200);
  canvas.parent('mycanvas');
  Tile.createGrid(level2);
}

function draw() {
  for (let g of grid) {
    g.draw();
  }
  if (scrubber) {
    scrubber.update();
  } else {
    if (register['mouseleft']) {
      let colrow = Input.getMouseColRow();
      scrubber = new Scrubber(colrow.col, colrow.row, tilesize);
    }
  }
}
