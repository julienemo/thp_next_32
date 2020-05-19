class Morpion {
  constructor(level = EASY, { board, turn, winner, finish } = {}) {
    this.board = new Board(this, board);
    this.view = new View(this, winner, finish, this.undo, this.redo);
    this.ai = new Ai(level, this);
    this.turn = turn || 0;
    this.winner = winner || null;
    this.finish = finish || false;
    if (this.ai.level === HARD && board === undefined) {
      this.iaTurn();
    }
  }

  saveGame = () => {
    localStorage.setItem(
      GameStatusKey,
      JSON.stringify({
        board: this.board.remember(),
        winner: this.winner,
        finish: this.finish,
        turn: this.turn,
        level: this.ai.level,
      })
    );
  };

  reset = () => {
    console.log("reset triggered");
    localStorage.removeItem(GameStatusKey);
    location.reload();
  };

  fillCheckDisplay = (x, y, player) => {
    if (this.board.fillGrid(x, y, player) === false) {
      alert("Cell occupied");
      return;
    }

    this.turn += player === EMPTY ? -1 : 1;
    this.winner = this.board.checkWinner();
    this.winner && (this.finish = true);
    this.view.showGraphic(this.board.map, this.finish, this.winner);
    this.saveGame();
    return true;
  };

  playerTurn = (x, y) => {
    if (this.finish) return;
    this.fillCheckDisplay(x, y, YOU) && this.iaTurn();
  };

  iaTurn = () => {
    if (this.finish) return;

    let availabilities = this.board.getEmptyCases();
    let possibleCuttingMove = this.board.getPossibleCuttingMoves();
    const move = this.ai.play(availabilities, possibleCuttingMove);

    move && this.fillCheckDisplay(move.i, move.j, AI);
  };
}
