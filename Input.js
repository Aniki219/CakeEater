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
    return {col: col, row: row};
  }
}
