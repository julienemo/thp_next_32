class Morpion {
  constructor(level = EASY, { board } = {}) {
    this.board = new Board(this, board);
    this.view = new View(this);
    this.ai = new Ai(level, this);
    this.turn = 0;
    this.winner = null;

    this.view.showGraphic(this.board.map);
    this.view.addEvents(this.playerTurn);

    if (this.ai.level === HARD && board === undefined) {
      this.iaTurn();
    }
  }

  fillCheckDisplay = (x, y, player) => {
    if (this.board.fillGrid(x, y, player) === false) {
      alert("Cell occupied");
      return;
    }

    this.turn += player === EMPTY ? -1 : 1;
    this.winner = this.board.checkWinner();
    this.winner && (this.finish = true);
    this.finish && this.view.endGame(this.winner);
    this.view.showGraphic(this.board.map);
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

const morpion = new Morpion(HARD);
