var level = {
  size: [5, 4],
  tiles: [
    0, 0, 0, 0, 0,
    0, 1, 0, 1, 0,
    0, 1, 0, 1, 0,
    0, 0, 0, 0, 0
  ]
}

var cakeEater;

function setup() {
  let canvas = createCanvas();
  canvas.parent('mycanvas');
  Tile.createGrid(level);
  cakeEater = new CakeEater(100, 50);
}

function draw() {
  if (waitForResize) {return;}

  for (let g of grid) {
    g.draw();
  }

  cakeEater.update();
}
