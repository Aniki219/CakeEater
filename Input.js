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

class Input {
  static getKey(name) {
    return register[name.charCodeAt(0)];
  }

  static getMouseColRow() {
    let col = floor(mouseX / tilesize) * tilesize;
    let row = floor(mouseY / tilesize) * tilesize;
    let cols = floor(width / tilesize);
    let rows = floor(height / tilesize);
    if (col > 0 && col < cols && row > 0 && row < rows) {
      return {col: col, row: row};
    } else {
      return {col: 0, row: 0}
    }
  }
}
