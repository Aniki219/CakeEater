var level = {
  size: [5, 4],
  tiles: [
    0, 0, 0, 0, 0,
    0, 1, 0, 1, 0,
    0, 1, 0, 1, 0,
    0, 0, 0, 0, 0
  ]
}

function setup() {
  let canvas = createCanvas();
  canvas.parent('mycanvas');
  Tile.createGrid(level);
}

function draw() {
  if (waitForResize) {return;}

  for (let g of grid) {
    g.draw();
  }
}
