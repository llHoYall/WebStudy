// Model
let BingoModel = function(number) {
  let attributes = {
    number,
    selected: false
  };

  this.get = attr => {
    if (attributes[attr]) {
      return attributes[attr];
    } else {
      return null;
    }
  };

  this.set = (attr, value) => {
    attributes[attr] = value;
    $(this).trigger("change");
  };

  this.select = () => {
    this.set("selected", true);
  };
};

// Collection
let BingoCollection = function() {
  this.models = [];

  this.init = () => {
    let self = this;

    let numbers = [];
    for (let i = 1; i <= 25; i++) {
      numbers.push(i);
    }
    numbers = getRandomSet(numbers);

    for (let i = 0, length = numbers.length; i < length; i++) {
      this.models.push(new BingoModel(numbers[i]));
      $(this.models[i]).on("change", function() {
        $(self).trigger("update");
      });
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

  this.init = () => {
    collection = new BingoCollection(p);
    collection.init();

    this.render();

    p.find("td").on("click", onClick);
    $(collection).on("update", this.render);
  };

  let onClick = function(event) {
    let model_id = $(this).attr("model");
    collection.models[model_id].select();
  };

  this.render = () => {
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
  };
};

$(() => {
  let player1 = new BingoView("#player1");
  player1.init();

  let player2 = new BingoView("#player2");
  player2.init();
});
