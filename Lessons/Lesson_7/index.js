var cakeEater;
var level = 0;
var canWin = true;
var confetti = [];
var makeConfetti = false;

function setup() {
  let canvas = createCanvas();
  canvas.parent('mycanvas');
  Tile.createGrid(levels[level]);
  cakeEater = new CakeEater(100, 50);
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

  if (makeConfetti) {
    doConfetti();
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
  if (!canWin) {return;}

  let untraversed = grid.filter(tile => tile.traversible);
  if (untraversed.length === 0) {
    canWin = false;
    makeConfetti = true;
    level++;
    setTimeout(loadLevel, 2000);
  }
}

function doConfetti() {
  if (random(10) < 5) {
    confetti.push({x: random(width), y: 0, clr: getRandomColor()});
  }
  for(let c of confetti) {
    noStroke();
    fill(c.clr);
    ellipse(c.x, c.y, 8, 8);
    c.y += 5;
  }
  confetti = confetti.filter(c => c.y < height);
}

function getRandomColor() {
  return color(random(100, 255), random(100, 255), random(100, 255))
}

function loadLevel() {
  if (levels.length <= level) {return;}
  grid = [];
  cakeEater = null;
  makeConfetti = false;
  canWin = true;
  Tile.createGrid(levels[level]);
}
