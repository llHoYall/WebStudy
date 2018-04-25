let handle = {
  type: "none",
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  rotation: 0,
  speed: 1000,
  init: function() {
    this.top = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.rotation = 0;
    this.setType("type" + (Math.floor(Math.random() * 10) % 7 + 1));
    this.setTop();
    this.rotate(0);

    this.move();
  },
  setType: function(typeName) {
    this.type = types[typeName];
    let width = (this.width = this.type.width);
    let height = (this.height = this.type.height);

    $("#handle")
      .empty()
      .width(width * 25)
      .height(height * 25);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (this.type.shape[i][j]) {
          $("<div>")
            .addClass("block")
            .addClass(typeName)
            .appendTo("#handle");
        } else {
          $("<div>")
            .addClass("block")
            .addClass("whiteLine")
            .appendTo("#handle");
        }
      }
    }
  },
  move: function() {
    $("#handle").animate({ top: this.top * 25, left: this.left * 25 }, 50);

    this.clearLine();
  },
  setTop: function() {
    this.left = 4;
    this.top = 0;
    this.rotation = 0;
    $("#handle").css({ top: this.top * 25, left: this.left * 25 });

    if (this.checkCollision()) {
      clearInterval(interval);
      alert("Game Over");
    }
  },
  setRight: function() {
    this.left += 1;
    if (this.checkCollision()) {
      this.left -= 1;
    }
    this.move();
  },
  setLeft: function() {
    this.left -= 1;
    if (this.checkCollision()) {
      this.left += 1;
    }
    this.move();
  },
  setDown: function() {
    this.top += 1;
    if (this.checkCollision()) {
      this.top -= 1;
      this.fillBlock();
      this.init();
    }

    this.move();
  },
  rotate: function(rotation) {
    if (rotation != 0) {
      this.rotation++;
      rotation = this.rotation %= this.type.maxRotation;
    }
    if (this.checkCollision()) {
      this.rotation--;
      this.rotation %= this.type.maxRotation;
    } else {
      $("#handle").css("transform", "rotate(" + rotation * 90 + "deg)");
    }
    this.move();
  },
  clearLine: function() {
    let blocks = $("#stage > .block");
    let count = 0;
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 10; j++) {
        if (blocks.eq(i * 10 + j).hasClass("none")) {
          break;
        }
        count++;
      }
      if (count == 10) {
        for (let k = 0; k < 10; k++) {
          blocks.eq(i * 10 + k).remove();
          $("<div>")
            .addClass("block none")
            .prependTo("#stage");
        }
      }
      count = 0;
    }
  },
  rotateCoord: function(i, j) {
    let x, y;
    switch (this.rotation % 4) {
      case 0:
        x = i;
        y = j;
        break;
      case 1:
        x = j;
        y = this.width - i - 1;
        break;
      case 2:
        x = this.height - i - 1;
        y = this.width - j - 1;
        break;
      case 3:
        x = this.width - j - 1;
        y = i;
        break;
      default:
        x = i;
        y = j;
    }
    return { x: x, y: y };
  },
  checkCollision: function() {
    let left = this.left;
    let top = this.top;

    let width = this.width;
    let height = this.height;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let x, y;
        let coord = this.rotateCoord(i, j);
        x = coord.x;
        y = coord.y;

        if (this.type.shape[i][j] == 1) {
          if (top + x > 19) {
            return true;
          } else if (left + y < 0) {
            return true;
          } else if (left + y > 9) {
            return true;
          }

          if (
            !$("#stage > .block")
              .eq((this.top + x) * 10 + this.left + y)
              .hasClass("none")
          ) {
            return true;
          }
        }
      }
    }
    return false;
  },
  fillBlock: function() {
    let width = this.width;
    let height = this.height;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        let x, y;
        let coord = this.rotateCoord(i, j);
        x = coord.x;
        y = coord.y;

        if (this.type.shape[i][j] == 1) {
          $("#stage > .block")
            .eq((this.top + x) * 10 + this.left + y)
            .removeClass("none")
            .addClass(this.type.name);
        }
      }
    }
  },
  drop: function() {
    while (!this.checkCollision()) {
      this.top++;
    }
    this.top--;
    this.fillBlock();
    this.init();
    this.move();
  }
};

$(document).ready(() => {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      $("<div>")
        .addClass("block none")
        .appendTo("#stage");
    }
  }

  handle.init();
  interval = setInterval(() => {
    handle.setDown();
  }, handle.speed);
});

const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

$(document).keydown(e => {
  switch (e.which) {
    case KEY_RIGHT:
      handle.setRight();
      break;
    case KEY_LEFT:
      handle.setLeft();
      break;
    case KEY_DOWN:
      handle.setDown();
      break;
    case KEY_UP:
      handle.rotate();
      break;
    case KEY_SPACE:
      handle.drop();
      break;
  }
});
