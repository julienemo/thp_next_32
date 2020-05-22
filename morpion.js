class Morpion {
  constructor({ level, history }) {
    let lastEntry =
      history == null
        ? {
            winner: null,
            finish: false,
            length: 0,
          }
        : history[history.length - 1];
    this.board = new Board(this, history);
    this.ai = new Ai(level, this);
    this.momento = new Momento(history);
    this.turn = history === undefined ? 0 : history.length;
    this.winner = lastEntry.winner;
    this.finish = lastEntry.finish;
    this.view = new View(this);

    if (history && history[history.length - 1].player === YOU) {
      this.iaTurn();
    } else if (!history && level === HARD) {
      this.iaTurn();
    }
  }

  saveGame = () => {
    localStorage.setItem(
      GameStatusKey,
      JSON.stringify({
        level: this.ai.level,
        history: this.momento.history.slice(0, this.turn),
      })
    );
  };

  reset = () => {
    localStorage.removeItem(GameStatusKey);
    location.reload();
  };

  changeLevel = (level) => {
    this.ai.level = level.toLowerCase();
  };

  afterMove = () => {
    this.view.showTurn(this.turn);
    this.view.showGraphic(this.turn);
    this.saveGame();
  };

  undoStep = () => {
    if (this.turn <= 1) return;
    let last = this.momento.history[this.turn - 1];
    let secLast = this.momento.history[this.turn - 2];
    this.board.fillGrid(last.x, last.y, EMPTY);
    this.board.fillGrid(secLast.x, secLast.y, EMPTY);
    this.turn -= 2;
    this.winner = this.board.checkWinner();
    this.winner && (this.finish = true);
    this.afterMove();
  };

  redoStep = () => {
    if (this.turn >= this.momento.history.length) return;
    let next = this.momento.history[this.turn];
    let secNext = this.momento.history[this.turn + 1];
    this.board.fillGrid(next.x, next.y, next.player);
    this.board.fillGrid(secNext.x, secNext.y, secNext.player);
    this.turn += 2;
    this.winner = this.board.checkWinner();
    this.winner && (this.finish = true);
    this.afterMove();
  };

  doStep = (x, y, player) => {
    if (this.board.fillGrid(x, y, player) === false) {
      alert("Cell occupied");
      return;
    }
    this.turn += 1;
    this.winner = this.board.checkWinner();
    this.winner && (this.finish = true);
    this.momento.add(this.turn, x, y, player, this.winner, this.finish);
    this.afterMove();
    return true;
  };

  playerTurn = (x, y) => {
    if (this.finish) return;
    this.doStep(x, y, YOU) && this.iaTurn();
  };

  iaTurn = () => {
    if (this.finish) return;

    let availabilities = this.board.getEmptyCases();
    let possibleCuttingMove = this.board.getPossibleCuttingMoves();
    const move = this.ai.play(availabilities, possibleCuttingMove);
    move && this.doStep(move.i, move.j, AI);
  };
}
