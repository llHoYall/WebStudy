// Model
let BingoModel = function(number) {
  let attributes = {
    number,
    selected: false
  };

  this.set = (attr, value) => {
    attributes[attr] = value;
    $(this).trigger("change", { number: this.get("number") });
  };

  this.get = attr => {
    if (attributes[attr]) {
      return attributes[attr];
    } else {
      return null;
    }
  };

  this.select = () => {
    if (!this.get("selected")) {
      this.set("selected", true);
    }
  };
};

// Collection
let BingoCollection = function() {
  this.models = [];
  let bingo_lines;

  this.init = () => {
    let self = this;
    bingo_lines = 0;

    let numbers = [];
    for (let i = 1; i <= 25; i++) {
      numbers.push(i);
    }
    numbers = getRandomSet(numbers);

    for (let i = 0, length = numbers.length; i < length; i++) {
      this.models.push(new BingoModel(numbers[i]));
      $(this.models[i]).on("change", (e, data) => {
        let bingo = checkBingo.call(self);
        if (bingo_lines != bingo) {
          bingo_lines = bingo;
          $(self).trigger("bingo", { bingo_lines: bingo });
        }
        $(self).trigger("update", data);
      });
    }
  };

  let checkBingo = () => {
    let bingo = 0;
    for (let i = 0; i < 5; i++) {
      if (
        this.models[i * 5 + 0].get("selected") &&
        this.models[i * 5 + 1].get("selected") &&
        this.models[i * 5 + 2].get("selected") &&
        this.models[i * 5 + 3].get("selected") &&
        this.models[i * 5 + 4].get("selected")
      ) {
        bingo++;
      }

      if (
        this.models[0 * 5 + i].get("selected") &&
        this.models[1 * 5 + i].get("selected") &&
        this.models[2 * 5 + i].get("selected") &&
        this.models[3 * 5 + i].get("selected") &&
        this.models[4 * 5 + i].get("selected")
      ) {
        bingo++;
      }
    }

    if (
      this.models[0].get("selected") &&
      this.models[6].get("selected") &&
      this.models[12].get("selected") &&
      this.models[18].get("selected") &&
      this.models[24].get("selected")
    ) {
      bingo++;
    }

    if (
      this.models[4].get("selected") &&
      this.models[8].get("selected") &&
      this.models[12].get("selected") &&
      this.models[16].get("selected") &&
      this.models[20].get("selected")
    ) {
      bingo++;
    }
    return bingo;
  };

  this.sync = number => {
    for (let i = 0, length = this.models.length; i < length; i++) {
      if (this.models[i].get("number") == number) {
        this.models[i].select();
        return;
      }
    }
  };

  let getRandomSet = numberSet => {
    numberSet.sort((a, b) => {
      let temp = parseInt(Math.random() * 10);
      let isOddOrEven = temp % 2;
      let isPosOrNeg = temp > 5 ? 1 : -1;
      return isOddOrEven * isPosOrNeg;
    });
    return numberSet;
  };
};

// View
let BingoView = function(player) {
  let p = $(player);
  let collection = null;
  let myturn = false;

  this.init = () => {
    collection = new BingoCollection(p);
    collection.init();

    this.render();

    p.find("td").on("click", onClick);
    $(collection).on("update bingo", this.render);
  };

  let onClick = function(event) {
    if (myturn) {
      let model_id = $(this).attr("model");
      collection.models[model_id].select();
    }
  };

  this.render = (e, data) => {
    p.find("td").each(function(i) {
      $(this)
        .attr("model", i)
        .text(collection.models[i].get("number"));
      if (collection.models[i].get("selected")) {
        $(this).addClass("selected");
      } else {
        $(this).removeClass("selected");
      }
    });

    if (e && e.type == "bingo") {
      if (data.bingo_lines >= 3) {
        p.find(".bingo_lines").text("Win !!!");
        p.find("caption").css("color", "red");
      } else {
        p.find(".bingo_lines").text("(" + data.bingo_lines + " bingo)");
      }
    } else if (e && e.type == "update") {
      $(document).trigger("checked", data);
      myturn = false;
      p.css("border-color", "black");
    }
  };

  this.setTurn = () => {
    p.css("border-color", "red");
    myturn = true;
  };

  this.sync = number => {
    collection.sync(number);
  };
};

$(() => {
  let player1 = new BingoView("#player1");
  player1.init();

  let player2 = new BingoView("#player2");
  player2.init();

  let turn = "player1";
  player1.setTurn();

  $(document).on("checked", (e, data) => {
    if (turn == "player1") {
      player2.sync(data.number);
      turn = "player2";
      player2.setTurn();
    } else if (turn == "player2") {
      player1.sync(data.number);
      turn = "player1";
      player1.setTurn();
    }
  });
});
