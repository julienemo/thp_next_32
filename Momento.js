class Momento {
  constructor(history) {
    this.history = history || [];
  }

  add = (turn, x, y, player, winner, finish) => {
    this.history[turn - 1] = {
      x,
      y,
      player,
      winner,
      finish,
    };
  };
}
