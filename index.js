var path = [];
var scrubber;
var level = 1

var waitForLoadLevel = true;
var canWin = true;
var confetti = [];
var makeConfetti = false;

var cakeEaterImg;

function preload() {
  cakeEaterImg = loadImage("https://i.imgur.com/WdCn1YJ.png");
  cakeTileImg = loadImage("https://i.imgur.com/orux0a1.png");
  eatenCakeTile = loadImage("https://i.imgur.com/wKSJqGl.png");
}

function setup() {
  let canvas = createCanvas(0, 0);
  canvas.class("pan")
  canvas.parent('mycanvas');
  loadLevel();
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

function loadLevel() {
  if (levels.length <= level) {return;}
  grid = [];
  scrubber = null;
  makeConfetti = false;
  canWin = true;
  waitForLoadLevel = true;
  Tile.createGrid(levels[level]);
  waitForLoadLevel = false;
}

function draw() {
  if (waitForLoadLevel) {return;}

  for (let g of grid) {
    g.draw();
  }

  if (scrubber) {
    scrubber.update();
    checkWin();
    if (Input.getKey('R')) {
      loadLevel();
    }
  } else {
    placeScrubber();
  }

  if (makeConfetti) {
    doConfetti();
  }
}

function placeScrubber() {
  let colrow = Input.getMouseColRow();
  let index = Tile.getIndex(colrow.col, colrow.row);
  let x = colrow.col * tilesize;
  let y = colrow.row * tilesize;

  if (grid[index].traversible) {
    if (register['mouseleft']) {
      scrubber = new Scrubber(x, y, tilesize);
    }
    strokeWeight(2);
    stroke(255, 255, 255);
    noFill();
    rect(x, y, tilesize, tilesize);
    strokeWeight(1);
  }
}

function doConfetti() {
  if (random(10) < 5) {
    confetti.push({x: random(width), y: 0, clr: getRandomColor()});
  }
  for(let c of confetti) {
    noStroke();
    fill(c.clr);
    ellipse(c.x, c.y, 5, 5);
    c.y += 5;
  }
  confetti = confetti.filter(c => c.y < height);
}

function getRandomColor() {
  return color(random(100, 255), random(100, 255), random(100, 255))
}
