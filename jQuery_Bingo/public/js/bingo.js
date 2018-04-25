let Bingo = function(player) {
  let p = $(player);
  let numbers;

  this.init = () => {
    numbers = [];
    for (let i = 1; i <= 25; i++) {
      numbers.push(i);
    }
    numbers = getRandomSet(numbers);

    this.render();
  };

  this.render = () => {
    p.find("td").each(function(i) {
      $(this).text(numbers[i]);
    });
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

$(() => {
  let player1 = new Bingo("#player1");
  player1.init();

  let player2 = new Bingo("#player2");
  player2.init();
});
