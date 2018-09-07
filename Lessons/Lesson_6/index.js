var cakeEater;
var level = 0;

function setup() {
  let canvas = createCanvas();
  canvas.parent('mycanvas');
  loadLevel()
}

function draw() {
  if (waitForResize) {return;}

  for (let g of grid) {
    g.draw();
  }

  if (cakeEater) {
    cakeEater.update();
    checkWin();
    if (register['R'.charCodeAt(0)]) {
      loadLevel();
    }
  } else {
    placeCakeEater();
  }
}

function placeCakeEater() {
  let colrow = getMouseColRow();
  let index = Tile.getIndex(colrow.col, colrow.row);
  let x = colrow.col * tilesize;
  let y = colrow.row * tilesize;

  if (grid[index].traversible) {
    if (register['mouseleft']) {
      cakeEater = new CakeEater(x, y, tilesize);
    }
    strokeWeight(2);
    stroke(255, 255, 255);
    noFill();
    rect(x, y, tilesize, tilesize);
    strokeWeight(1);
  }
}

function checkWin() {
  let untraversed = grid.filter(tile => tile.traversible);
  if (untraversed.length === 0) {
    level++;
    loadLevel();
  }
}

function loadLevel() {
  if (levels.length <= level) {return;}
  grid = [];
  cakeEater = null;
  Tile.createGrid(levels[level]);
}
