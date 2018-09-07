var register = {};

function keyPressed() {
  register[keyCode] = true;
}

function keyReleased() {
  register[keyCode] = false;
}

function mousePressed() {
  register['mouse' + mouseButton] = true;
}

function mouseReleased() {
  register['mouse' + mouseButton] = false;
}

function getMouseColRow() {
  let col = floor(mouseX / tilesize);
  let row = floor(mouseY / tilesize);
  let cols = floor(width / tilesize);
  let rows = floor(height / tilesize);

  col = max(min(col, cols-1), 0);
  row = max(min(row, rows-1), 0);

  return {col: col, row: row};
}
